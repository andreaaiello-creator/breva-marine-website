#!/usr/bin/env python3
"""Transfer approved BREVA marketing photos from Google Drive into optimized WebP assets."""
import argparse, io, json, os, pathlib, re, sys
import google.auth
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from PIL import Image, ImageOps, UnidentifiedImageError

ROOT = pathlib.Path("public/assets/breva")
# Explicit mappings: no private/non-marketing Drive folder is crawled.
FOLDERS = {
 "b630-navigation": ("1WvSrAhZuJpndZhRM1Zq4bUWW5wCHsM6E", "b630/navigation"),
 "b630-details": ("1wdCdqB3wFljv55JkwW2ttILSppgGw4Bw", "b630/details"),
 "b800-navigation": ("1mzEiFfpeGE0xl4iSGrTM7ROba_cVQegX", "b800/navigation"),
 "b800-details": ("1zkftOjU5n5-WWLZIiH7kpNBrUqoxg2uQ", "b800/details"),
 "b1300-navigation": ("1NH2ccDKWzZnusENPILRY6UQ4nQ5dFXZV", "b1300/navigation"),
 "b1300-details": ("1ekuE-w3UqjveNTuT6t7iB2Bm-HrN7rKq", "b1300/details"),
 "shipyard": ("12Z4yno5tap1Bjo9d4Yy-I5wHGrA9CX9J", "shipyard/production"),
}
SUPPORTED = {"image/jpeg", "image/png", "image/webp", "image/tiff"}
def files_in_folder(drive, folder):
    token = None
    while True:
        result = drive.files().list(
          q=f"'{folder}' in parents and trashed = false",
          fields="nextPageToken,files(id,name,mimeType,size,md5Checksum)",
          page_size=1000, page_token=token, supportsAllDrives=True,
          includeItemsFromAllDrives=True).execute()
        for entry in result.get("files", []):
            if entry["mimeType"] in SUPPORTED:
                yield entry
        token = result.get("nextPageToken")
        if not token: break

def optimize(drive, item, dest, max_px, quality):
    output = io.BytesIO()
    request = drive.files().get_media(fileId=item["id"], supportsAllDrives=True)
    downloader = MediaIoBaseDownload(output, request, chunksize=1024*1024)
    done = False
    while not done: _, done = downloader.next_chunk()
    output.seek(0)
    with Image.open(output) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"): image = image.convert("RGB")
        if image.mode == "RGBA":
            canvas = Image.new("RGB", image.size, "white")
            canvas.paste(image, mask=image.getchannel("A"))
            image = canvas
        image.save(dest, "WEBP", quality=quality, method=6)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--scope", choices=["all", *FOLDERS], default="all")
    parser.add_argument("--mode", choices=["plan", "apply"], default="plan")
    parser.add_argument("--max-images", type=int, default=50)
    parser.add_argument("--max-px", type=int, default=2200)
    parser.add_argument("--quality", type=int, default=82)
    args = parser.parse_args()
    if not (1 <= args.max_images <= 250): parser.error("max-images must be 1..250")
    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/drive.readonly"])
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    selected = FOLDERS if args.scope == "all" else {args.scope: FOLDERS[args.scope]}
    count, log = 0, []
    for group,(folder,directory) in selected.items():
        for item in files_in_folder(drive, folder):
            if count >= args.max_images: break
            slug = re.sub(r"[^a-z0-9]+", "-", pathlib.Path(item["name"]).stem.lower()).strip("-")[:64]
            filename = f"{slug}-{item['id'][-8:]}.webp"
            dest = ROOT / directory / filename
            if dest.exists(): continue
            log.append({"scope":group,"source_name":item["name"],"output":str(dest),"status":args.mode})
            if args.mode == "apply":
                dest.parent.mkdir(parents=True, exist_ok=True)
                try: optimize(drive, item, dest, args.max_px, args.quality)
                except (UnidentifiedImageError, OSError) as exc:
                    log[-1]["status"] = "failed: " + str(exc)[:100]
                    continue
            count += 1
        if count >= args.max_images: break
    pathlib.Path("asset-import-report.json").write_text(json.dumps(log,indent=2,ensure_ascii=False))
    print(json.dumps({"mode":args.mode,"selected":count,"scope":args.scope},indent=2))
    if args.mode == "plan":
        print("PLAN ONLY — no photos downloaded or committed.")
if __name__ == "__main__": main()
