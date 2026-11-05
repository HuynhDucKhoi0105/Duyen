#!/bin/zsh
# Đưa trang và mã nguồn vào repo arc329-thu-vien, rồi đẩy lên GitHub (Vercel tự triển khai lại khi repo có thay đổi).
set -e
SP="${0:A:h}"
R="/Users/khoihuynh/Documents/Duyên/arc329-thu-vien"
mkdir -p "$R/src"
cd "$SP"
setopt null_glob
for f in g3_ideas.js g3_roles.js g3_ideas2.js g4a.js g4b.js g6_kit.js g[678]_*.js g3_prep.js g3_store.js g3_edit.js g3_viewer.js \
         p5_core.js p5_lang3.js p5_khe3.js p5_cau4.js p5_view.js p6_core.js p6_khoi.js p6_view.js chot_*.js x10_xep.js \
         rebuild_g6.py check_p6.js check_g6.js syncheck.py xuat_web.sh; do
  [[ -f "$f" ]] && cp "$f" "$R/src/"
done
# bỏ các file chot_ đã cất đi trong repo (nếu có)
for f in "$R"/src/chot_*.js; do [[ -f "$SP/${f:t}" ]] || rm "$f"; done
cp "/Users/khoihuynh/Documents/Duyên/so-do-phuong-an-mat-tien.html" "$R/index.html"
cp "/Users/khoihuynh/Documents/Duyên/GHI-CHU-DE-BAI-VA-NGUYEN-TAC.md" "$R/GHI-CHU-DE-BAI-VA-NGUYEN-TAC.md"
cd "$R"
git add -A
if ! git diff --cached --quiet; then git commit -q -m "${1:-Cập nhật trang phương án}"; fi
if git remote get-url origin >/dev/null 2>&1; then git push -q origin HEAD:main; echo "Đã đẩy lên GitHub"; else echo "Chưa có repo GitHub (origin), mới commit trong máy"; fi
