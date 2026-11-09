// sinh dữ liệu các gợi ý tầng 1 (chạy bằng node, ghi ra t1_data.js)
const fs = require("fs"), CHK = require("./t1_chk.js");
const NAMES = { A1: "Đón tiếp và thông tin", A2: "Trưng bày", A3: "Cà phê sách", A4: "Gửi đồ, mượn trả, cổng từ", B1: "Đọc mở và kệ", B2: "Đọc yên tĩnh", B3: "Thiếu nhi và gia đình", B4: "Học nhóm", B5: "Tra cứu số", B6: "Đọc linh hoạt, hỗ trợ tra cứu", C1: "Kho đóng", C2: "Xử lý nghiệp vụ", C3: "Lưu trữ tài liệu địa phương", C4: "Tiếp nhận sách", D1: "Phòng đa năng", D2: "Bục trình bày", D3: "Kho bàn ghế sự kiện", D4: "Phòng sinh hoạt chuyên đề", E1: "Văn phòng", E2: "Phòng nhân viên", E3: "Trực bảo vệ", E4: "Kỹ thuật", E5: "Vệ sinh", E6: "Dụng cụ vệ sinh, kho chung" };
const TOP = { B1: 1, B2: 1, B4: 1, B5: 1, B6: 1 };
function mk(code) {
  const L = []; let k = 0;
  const id = (f, s) => `${code}:${f}:${s}${k++}`;
  return {
    L,
    r: (f, c, x, y, w, h, n) => L.push({ id: id(f, c), c, n: n || NAMES[c], kind: "room", a: +(w * h).toFixed(2), x, y, w, h, f, top: !!TOP[c] && f >= 2, onSite: true }),
    cc: (f, x, y, w, h, n, link) => L.push({ id: id(f, "H"), c: "circ", n: n || "Sảnh, hành lang", kind: "circ", a: null, x, y, w, h, f, top: false, onSite: true, link }),
    st: (f, kind, x, y, w, h, n) => L.push({ id: id(f, kind), c: "core", n: n || { stair: "Thang bộ", lift: "Thang bộ + thang máy", book: "Lõi sách: thang + máy + tời sách" }[kind], kind, a: null, x, y, w, h, f, top: false, onSite: true })
  };
}
const IDEAS = [];
module.exports = { mk, IDEAS, CHK, NAMES };
