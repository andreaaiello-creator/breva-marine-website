#!/usr/bin/env python3
"""Create a public-safe index of already imported BREVA website images."""
import json
from pathlib import Path
ROOT = Path("public/assets/breva")
OUTPUT = Path("src/content/asset-index.json")
EXT = {".webp", ".avif", ".png", ".jpg", ".jpeg", ".svg"}
def main():
    photos = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXT:
            continue
        parts = path.relative_to(ROOT).parts
        if len(parts) < 3:
            continue
        category = parts[1] if parts[0] in {"b630","b800","b1100","b1300"} else "/".join(parts[1:-1])
        photos.append({"model": parts[0], "category":category,
            "filename":path.name,"src":"/"+path.relative_to("public").as_posix()})
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    OUTPUT.write_text(json.dumps({"version":1,"assets":photos},indent=2)+"\n",encoding="utf-8")
    print(f"Indexed {len(photos)} website assets in {OUTPUT}")
if __name__ == "__main__":
    main()
