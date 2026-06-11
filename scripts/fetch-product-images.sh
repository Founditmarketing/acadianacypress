#!/bin/bash
# Downloads product images listed in product-images.txt from the old
# WooCommerce site and optimizes them into public/products/<slug>/NN.jpg
# (max 1600px, JPEG q82). Order within each product follows the manifest.
set -u
BASE="https://acadiana-cypress.com/wp-content/uploads"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="/tmp/acadiana-product-images"
OUT="$ROOT/public/products"
MANIFEST="$ROOT/scripts/product-images.txt"
FAILED="$TMP/failed.txt"

mkdir -p "$TMP" "$OUT"
: > "$FAILED"

# manifest is grouped by slug, so a simple running counter works (bash 3.2 safe)
current=""
count=0

while IFS='|' read -r slug path; do
  [ -z "$slug" ] && continue
  if [ "$slug" != "$current" ]; then current="$slug"; count=0; fi
  count=$((count + 1))
  n=$(printf "%02d" "$count")
  mkdir -p "$OUT/$slug"
  raw="$TMP/$slug-$n-orig"
  dest="$OUT/$slug/$n.jpg"
  if [ -s "$dest" ]; then continue; fi
  url="$BASE/$path"
  if ! curl -sfL --retry 2 --max-time 60 -o "$raw" "$url"; then
    echo "$slug|$path|download-failed" >> "$FAILED"
    continue
  fi
  if ! sips -s format jpeg -s formatOptions 82 --resampleHeightWidthMax 1600 "$raw" --out "$dest" >/dev/null 2>&1; then
    echo "$slug|$path|convert-failed" >> "$FAILED"
    rm -f "$dest"
  fi
done < "$MANIFEST"

echo "=== done ==="
echo "downloaded products:"
for d in "$OUT"/*/; do
  echo "$(basename "$d"): $(ls "$d" | wc -l | tr -d ' ') images"
done
echo "failures: $(wc -l < "$FAILED" | tr -d ' ')"
cat "$FAILED"
