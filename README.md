# ARC 329 · Trung tâm Văn hóa Thư viện · 46 Bạch Đằng, Đà Nẵng

Trang phương án đồ án (ĐH Duy Tân, học kỳ 2026F): các ý tưởng hình khối, mặt bằng đầy đủ công năng, kiểm tra theo đề và góp ý của thầy, và tab **Tự xếp khối** để tự kéo thả 20 khối A1–E6.

- `index.html`: trang đã dựng sẵn, Vercel đưa trang này lên mạng.
- `src/`: mã nguồn từng phần (ý tưởng `chot_*.js`, bộ kiểm tra mặt bằng `p6_core.js`, giao diện `p6_view.js`, tab tự xếp khối `x10_xep.js`).
- `GHI-CHU-DE-BAI-VA-NGUYEN-TAC.md`: số liệu đề bài và mọi nguyên tắc đã thống nhất.

Mỗi lần cập nhật: dựng lại trang (`python3 src/rebuild_g6.py`), chạy `src/xuat_web.sh "nội dung thay đổi"`; repo đẩy lên GitHub, Vercel tự triển khai lại.

Trên bản Vercel, nút "Lưu cho Claude" của tab Tự xếp khối không chạy (chỉ chạy trên trang claude.ai); dùng nút "Tải file" rồi gửi file `.json` cho Claude.
