#!/usr/bin/env python3
"""Read-only searchable manifest for approved BREVA marketing Drive folders.

Private output: GitHub Actions artifact only. Never commit this manifest to a
public repository. No image downloads, no changes to Drive.
"""
import argparse
import json
import re
from pathlib import Path
import google.auth
from googleapiclient.discovery import build

FOLDERS = {
 "b630-navigation": "1WvSrAhZuJpndZhRM1Zq4bUWW5wCHsM6E",
 "b630-details": "1wdCdqB3wFljv55JkwW2ttILSppgGw4Bw",
 "b800-navigation": "1mzEiFfpeGE0xl4iSGrTM7ROba_cVQegX",
 "b800-details": "1zkftOjU5n5-WWLZIiH7kpNBrUqoxg2uQ",
 "b1300-navigation": "1NH2ccDKWzZnusENPILRY6UQ4nQ5dFXZV",
 "b1300-details": "1ekuE-w3UqjveNTuT6t7iB2Bm-HrN7rKq",
 "shipyard": "12Z4yno5tap1Bjo9d4Yy-I5wHGrA9CX9J",
}
ALLOWED = {"image/jpeg", "image/png", "image/webp", "image/tiff"}
def main():
    p = argparse.ArgumentParser()
    p.add_argument("--scope", choices=["all", *FOLDERS], default="all")
    p.add_argument("--query", default="", help="Optional filename keyword filter")
    p.add_argument("--max-files", type=int, default=500)
    args = p.parse_args()
    if not 1 <= args.max_files <= 5000:
        p.error("--max-files must be in range 1..5000")
    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/drive.readonly"])
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    selected = FOLDERS if args.scope == "all" else {args.scope: FOLDERS[args.scope]}
    results = []
    term = args.query.casefold().strip()
    for scope, folder in selected.items():
        token = None
        while len(results) < args.max_files:
            response = drive.files().list(
                q=f"'{folder}' in parents and trashed = false",
                fields="nextPageToken,files(id,name,mimeType,size,modifiedTime,imageMediaMetadata(width,height),webViewLink)",
                pageSize=1000, pageToken=token, supportsAllDrives=True,
                includeItemsFromAllDrives=True
            ).execute()
            for item in response.get("files", []):
                if item.get("mimeType") not in ALLOWED: continue
                if term and term not in item.get("name", "").casefold() and term not in scope: continue
                results.append({
                    "scope": scope, "name": item["name"], "drive_file_id": item["id"],
                    "mime_type": item["mimeType"], "size_bytes": int(item.get("size", 0)),
                    "modified": item.get("modifiedTime"),
                    "drive_url": item.get("webViewLink", "https://drive.google.com/file/d/" + item["id"] + "/view")
                })
                if len(results) >= args.max_files: break
            token = response.get("nextPageToken")
            if not token: break
        if len(results) >= args.max_files: break
    out = Path("drive-asset-catalog.json")
    out.write_text(json.dumps({"version": 1, "query": args.query, "scope": args.scope,
                              "count": len(results), "assets": results}, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"scope": args.scope, "query": args.query, "matches": len(results),
                      "report": str(out)}))
if __name__ == "__main__":
    main()
