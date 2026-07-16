#!/usr/bin/env python3
"""Scan assets/gallery/ for images and write photos.json (a list of filenames).
Run automatically by .github/workflows/gallery.yml on every push that touches
the gallery folder. The website reads photos.json to build the Gallery tab."""
import os, json

GALLERY_DIR = "assets/gallery"
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

def main():
    files = sorted(
        f for f in os.listdir(GALLERY_DIR)
        if os.path.splitext(f)[1].lower() in IMAGE_EXTS
    )
    out_path = os.path.join(GALLERY_DIR, "photos.json")
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(files, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"Wrote {len(files)} image(s) to {out_path}")
    for f in files:
        print("  -", f)

if __name__ == "__main__":
    main()
