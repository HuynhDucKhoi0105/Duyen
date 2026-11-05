#!/bin/zsh
# Đưa trang mới lên GitHub (HuynhDucKhoi0105/Duyen) và Vercel (arc329-thu-vien.vercel.app).
# Chạy tay: src/xuat_web.sh "nội dung thay đổi". Hook của Claude Code gọi tự động sau mỗi lần đăng trang (đọc JSON của hook ở stdin).
R="/Users/khoihuynh/Documents/Duyên/arc329-thu-vien"
HTML="/Users/khoihuynh/Documents/Duyên/so-do-phuong-an-mat-tien.html"
MSG="${1:-Cập nhật trang phương án}"
# gọi từ hook: chỉ chạy khi vừa đăng đúng trang này
if [[ ! -t 0 && -z "$1" ]]; then
  IN="$(cat)"
  FP="$(print -r -- "$IN" | /usr/bin/jq -r '.tool_input.file_path // empty' 2>/dev/null)"
  ACT="$(print -r -- "$IN" | /usr/bin/jq -r '.tool_input.action // "publish"' 2>/dev/null)"
  [[ "$ACT" == "publish" && "$FP" == *so-do-phuong-an-mat-tien.html ]] || exit 0
  MSG="Cập nhật tự động sau khi đăng trang"
fi
cd "$R" || exit 0
cp "$HTML" index.html
cp "/Users/khoihuynh/Documents/Duyên/GHI-CHU-DE-BAI-VA-NGUYEN-TAC.md" .
git add -A
git diff --cached --quiet && exit 0   # không có gì mới thì không đẩy
git commit -q -m "$MSG"
GIT_TERMINAL_PROMPT=0 git push -q origin HEAD:main && echo "Đã đẩy lên GitHub"
vercel deploy --prod --yes >/dev/null 2>&1 && echo "Đã triển khai https://arc329-thu-vien.vercel.app"
exit 0
