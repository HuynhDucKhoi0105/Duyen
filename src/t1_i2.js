const { mk, IDEAS } = require("./t1_gen.js");
// Ý 2 · Sảnh trong gầm: cả nhà dời lên 18 m, tầng 2 phủ lên bãi xe thành gầm để xe có mái, cửa A1 mở thẳng vào gầm
{
  const { L, r, cc, st } = mk("N2"), S = -18;
  // tầng 1: như Ý 1, dời lên phía Bắc 18 m
  r(1, "C2", 6, 80.8 + S, 8.5, 8.2);
  r(1, "E3", 14.5, 84.6 + S, 3.5, 4.4, "Trực bảo vệ, giữ xe (nhìn gầm để xe và cửa A1)");
  cc(1, 14.5, 76 + S, 3.5, 8.6, "Lối nhân viên, sảnh giao nhận");
  r(1, "A1", 18, 81 + S, 10, 8);
  r(1, "A3", 28, 81 + S, 8.75, 8);
  r(1, "E5", 36.75, 81 + S, 3.75, 8, "Vệ sinh công cộng, sự kiện (mở ngoài giờ)");
  r(1, "C4", 6, 77.2 + S, 8.5, 3.6);
  r(1, "C3", 6, 72.5 + S, 8.5, 4.7);
  r(1, "C1", 6, 58.4 + S, 8.5, 14.1);
  st(1, "book", 6, 54.4 + S, 8.5, 4);
  r(1, "E4", 6, 47.9 + S, 8.5, 6.5);
  r(1, "E6", 6, 45.5 + S, 8.5, 2.4);
  r(1, "A4", 18, 76 + S, 6, 5);
  st(1, "lift", 14.5, 69 + S, 5.5, 7, "Thang bộ + thang máy thư viện (sau cổng từ)");
  cc(1, 14.5, 53 + S, 5.5, 16, "Sảnh thư viện sau cổng từ", "N2lh");
  cc(1, 20, 73 + S, 4, 3, "Sảnh thư viện sau cổng từ", "N2lh");
  r(1, "A2", 24, 73 + S, 11.25, 8);
  cc(1, 35.25, 73 + S, 6.25, 8, "Sảnh sự kiện");
  r(1, "D1", 24, 61 + S, 15, 12);
  r(1, "D2", 20, 66.75 + S, 4, 6.25);
  r(1, "D3", 20, 61.75 + S, 4, 5);
  cc(1, 39, 53 + S, 2.5, 20, "Hành lang sự kiện");
  r(1, "D4", 29.6, 53 + S, 9.4, 8);
  st(1, "lift", 20, 53 + S, 4, 7, "Thang bộ + thang máy Bắc");
  r(1, "E5", 24, 53 + S, 4, 4.3, "Vệ sinh thiếu nhi, thay tã");
  r(1, "B3", 14.5, 44.5 + S, 21.2, 8.5);
  L.push({ id: "N2:1:gam", c: "SAN", n: "Gầm để xe dưới tầng 2 (cột đỡ, cao thông thủy 4,5 m)", kind: "court", a: null, x: 6, y: 71, w: 35.5, h: 10, f: 1, top: false, onSite: true, support: true });
  // tầng 2
  st(2, "book", 6, 54.4 + S, 8.5, 4); st(2, "lift", 20, 53 + S, 4, 7, "Thang bộ + thang máy Bắc"); st(2, "lift", 14.5, 69 + S, 5.5, 7, "Thang bộ + thang máy thư viện");
  r(2, "B5", 4, 45.8 + S, 10.5, 8.6);
  r(2, "B6", 14.5, 52.4 + S, 5.5, 8.6);
  r(2, "B1", 24, 52.4 + S, 5.6, 8.6, "Đọc mở và kệ (nhìn vườn)");
  r(2, "B1", 4, 58.4 + S, 10.5, 19.6, "Đọc mở và kệ (cửa mái)");
  cc(2, 14.5, 61 + S, 5.5, 8, "Hành lang đọc"); cc(2, 14.5, 58, 5.5, 10, "Hành lang đọc");
  cc(2, 4, 68.6, 37.5, 2.4, "Hành lang Nam");
  r(2, "E1", 4, 71, 10.5, 8); r(2, "E2", 14.5, 71, 5, 8);
  r(2, "B1", 19.5, 71, 6.25, 8, "Đọc mở và kệ (trên gầm)");
  r(2, "E5", 25.75, 71, 3.25, 5, "Vệ sinh tầng 2");
  r(2, "B4", 29, 71, 12.5, 8);
  // tầng 3
  st(3, "book", 6, 54.4 + S, 8.5, 4); st(3, "lift", 14.5, 69 + S, 5.5, 7, "Thang bộ + thang máy thư viện");
  r(3, "B1", 4, 45.8 + S, 14, 8.6, "Đọc mở và kệ (cửa mái)");
  cc(3, 14.5, 58, 5, 11.5, "Hành lang tầng 3"); cc(3, 19.5, 66, 9.5, 3.5, "Hành lang tầng 3");
  r(3, "B2", 4, 69.5, 15.5, 10.3);
  r(3, "B1", 19.5, 69.5, 9.5, 9.5, "Đọc mở và kệ (cửa mái)");
  IDEAS.push({ id: "N2", code: "Ý 2", name: "Cửa A1 mở vào gầm để xe", blocks: L, door: [23, 71],
    routes: { park: [[23, 76], [23, 71]], plaza: [[23.75, 8], [3, 12], [3, 76], [23, 76], [23, 71]] } });
}
