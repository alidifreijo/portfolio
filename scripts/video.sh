#!/usr/bin/env bash
# Video · makes the web versions of ONE original video (not of a web copy:
# re-encoding a compressed file never makes it sharper).
#
#   scripts/video.sh path/to/original.mov public/images/projects/<case>/<name>
#
# Writes, next to each other:
#   <name>.mp4         H.264, up to 1920 px wide, for every browser
#   <name>.webm        AV1, smaller and sharper where the browser plays it
#   <name>-mobile.mp4  H.264, up to 960 px wide, lighter, for phones
#   <name>.poster.jpg  a frame with content (the most detailed of 12 samples)
# VideoBlock and the Play intro pick these up by name: nothing else to change.
# Keeps the original proportions (never crops). No sound.
set -euo pipefail
src="$1"; out="$2"
mkdir -p "$(dirname "$out")"
scale='scale=min(1920\,iw):-2'
ffmpeg -y -v error -i "$src" -an -vf "$scale" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart "$out.mp4"
ffmpeg -y -v error -i "$src" -an -vf "$scale" -c:v libsvtav1 -crf 32 -preset 6 -pix_fmt yuv420p10le "$out.webm"
ffmpeg -y -v error -i "$src" -an -vf 'scale=min(960\,iw):-2' -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$out-mobile.mp4"
# poster: the frame with the most detail among 12 samples
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out.mp4")
best=""; bestsd=0
tmp=$(mktemp -d)
for i in $(seq 1 12); do
  t=$(python3 -c "print($dur*$i/13)")
  ffmpeg -y -v error -ss "$t" -i "$out.mp4" -frames:v 1 "$tmp/$i.png"
  sd=$(python3 -c "from PIL import Image,ImageStat;print(int(ImageStat.Stat(Image.open('$tmp/$i.png').convert('L')).stddev[0]))")
  if [ "$sd" -gt "$bestsd" ]; then bestsd=$sd; best="$tmp/$i.png"; fi
done
python3 -c "from PIL import Image;Image.open('$best').convert('RGB').save('$out.poster.jpg',quality=82)"
rm -rf "$tmp"
ls -lh "$out".* "$out"-mobile.mp4
