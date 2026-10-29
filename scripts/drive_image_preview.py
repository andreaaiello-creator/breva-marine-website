#!/usr/bin/env python3
"""Read-only, bounded Google Drive image export; no source writes and no Git commits."""
import io, json, os, pathlib, re, sys
from PIL import Image, ImageOps
import google.auth
from google.auth.transport.requests import AuthorizedSession

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
ROOT = os.environ["DRIVE_FOLDER_ID"]
MAX_FILES = min(int(os.getenv("MAX_FILES", "60")), 200)
OUT = pathlib.Path("drive-preview")
OUT.mkdir(exist_ok=True)
credentials, _ = google.auth.default(scopes=SCOPES)
session = AuthorizedSession(credentials)
BASE = "https://www.googleapis.com/drive/v3/files"
seen, queue, manifest = set(), [(ROOT, "")], []
while queue and len(manifest) < MAX_FILES:
    folder, prefix = queue.pop(0)
    if folder in seen: continue
    seen.add(folder)
    page = None
    while len(manifest) < MAX_FILES:
        args = {"q": f"'{folder}' in parents and trashed = false", "pageSize": 100,
                "fields": "nextPageToken,files(id,name,mimeType,size)",
                "supportsAllDrives": "true", "includeItemsFromAllDrives": "true"}
        if page: args["pageToken"] = page
        response = session.get(BASE, params=args, timeout=60)
        response.raise_for_status()
        data = response.json()
        for item in data.get("files", []):
            if item["mimeType"] == "application/vnd.google-apps.folder":
                queue.append((item["id"], prefix + item["name"] + "/"))
            elif item["mimeType"].startswith("image/") and len(manifest) < MAX_FILES:
                name = re.sub(r"[^A-Za-z0-9._-]+", "-", item["name"]).strip(".-")
                subdir = OUT / prefix
                subdir.mkdir(parents=True, exist_ok=True)
                dest = subdir / (pathlib.Path(name).stem + ".webp")
                raw = session.get(BASE + "/" + item["id"], params={"alt": "media", "supportsAllDrives": "true"}, timeout=120)
                raw.raise_for_status()
                try:
                    with Image.open(io.BytesIO(raw.content)) as img:
                        img = ImageOps.exif_transpose(img)
                        img.thumbnail((1200, 1200))
                        img.convert("RGB").save(dest, "WEBP", quality=80, method=5)
                except Exception as exc:
                    print(f"Skipping unsupported image {name}: {exc}", file=sys.stderr)
                    continue
                manifest.append({"source_id": item["id"], "original": prefix + item["name"], "preview": dest.relative_to(OUT).as_posix()})
        page = data.get("nextPageToken")
        if not page: break
(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
print(f"Generated {len(manifest)} preview assets from one authorized Drive folder")
