/* ================= Ý tưởng H.3: Ba hộp so le quanh giếng gió (hộp xếp, không vỏ bọc) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba hộp hai tầng so le kiểu khóa kéo: hộp sự kiện lệch Tây, hộp thư viện lệch Đông, hộp nghiệp vụ lệch Tây;
  // giữa các hộp là hai khe gió rộng 10 m, nối bằng cầu kính một tầng (sảnh → quầy thư viện) và một tháp nối đặc (thư viện → nghiệp vụ)
  const H1 = [[6, 14], [32, 14], [32, 30], [6, 30]];      // hộp vàng: đón tiếp, trưng bày, cà phê, sự kiện
  const H2 = [[12, 40], [40.4, 40], [40.4, 56], [12, 56]];    // hộp trắng: tầng 1 cụm sách (nghiệp vụ, kho, lõi sách, quầy), tầng 2 đọc, học nhóm, tra cứu số
  const H3 = [[6, 66], [40, 66], [40, 82], [6, 82]];      // hộp gỗ: thiếu nhi, nhân viên (tầng 1), đọc mở, đọc yên tĩnh (tầng 2)
  const LK = [[26.2, 30], [29.2, 30], [29.2, 40], [26.2, 40]];  // cầu kính một tầng: sảnh đón tiếp → quầy gửi đồ, mượn trả
  const L23 = [[32, 56], [36, 56], [36, 66], [32, 66]];   // tháp nối hai tầng (trong khu đọc)
  const VUON = [[12, 58], [32, 58], [32, 66], [12, 66]];  // vườn thiếu nhi có tường bao, trước mặt hộp gỗ
  const SAN = [[6, 30], [12, 30], [12, 66], [6, 66]];      // sân giao nhận sách trước cửa cuốn
  const K1 = [[12, 30], [26.2, 30], [26.2, 40], [12, 40]], K1b = [[29.2, 30], [41.5, 30], [41.5, 40], [29.2, 40]];
  const N = "N";
  const z1 = 9.45, z2 = 10.45, z3 = 9.95;                 // mái ba hộp: thư viện chính cao nhất
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [H1, H2, H3, LK, L23],
    rooms: [
      // hộp vàng: sảnh đón tiếp ở góc Đông Nam là cửa vào duy nhất của khách, ngay đầu cầu kính sang quầy thư viện
      { id: "ST2", n: "Thang bộ sự kiện (Tây Bắc)", r: [6, 14, 4, 7.5], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["W", 1.2, "tn", 0.4], ["COR1", 1.2, "thang"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Bắc)", r: [10, 14, 12, 7.5], ctl: "sk", nz: 2, occ: 30, d: [["COR1", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (sáng Bắc)", r: [22, 14, 10, 7.5], ctl: "sk", nz: 3, seat: 32 },
      { id: "COR1", c: "circ", n: "Hành lang sảnh", r: [6, 21.5, 14, 2], ctl: "sk", nz: 2, occ: 40 },
      { id: "COR1b", c: "circ", n: "Hành lang cà phê", r: [20, 21.5, 12, 2], ctl: "sk", nz: 2, d: [["A1", 2.4, "o"], ["COR1", 2.0, "o"], ["A3", 2.0, "o"]] },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [6, 23.5, 4, 6.5], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["COR1", 1.4, "thang"], ["W", 1.2, "tn"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [10, 23.5, 2.3, 6.5], ctl: "nv", nz: 1, d: [["COR1", 0.9, "nv"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: [12.3, 23.5, 2.3, 6.5], ctl: "sk", nz: 1, wc: KT, d: [["COR1", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [14.6, 23.5, 2.8, 6.5], ctl: "nv", nz: 1, d: [["COR1", 0.9, "nv"]] },
      { id: "KCF", c: "circ", n: "Kho cà phê, chuẩn bị", r: [17.4, 23.5, 2.6, 6.5], ctl: "sk", nz: 1, d: [["COR1", 0.9, "p"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [20, 23.5, 12, 6.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["E", 2.4, "chinh", 0.5], ["S", 1.8, "tudong", 0.25], ["LK", 2.4, "o"]] },
      { id: "LK", c: "circ", n: "Cầu kính qua khe gió", r: [26.2, 30, 3, 10], ctl: "sk", nz: 1, d: [["A4", 2.4, "k"]] },
      // hộp trắng tầng 1 = cụm sách: tiếp nhận → xử lý → quầy gửi đồ, mượn trả liền nhau; kho đóng sát lõi sách
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [12, 40, 4.3, 7], ctl: "nv", nz: 1, d: [["W", 2.6, "cuon", 0.4], ["W", 1.0, "nv", 0.88], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [16.3, 40, 9.9, 7], ctl: "nv", nz: 1, d: [["HS", 1.2, "nv"], ["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [26.2, 40, 6, 5], ctl: "tv", ctrl: 1, nz: 2, d: [["LOBA", 2.4, "o"]] },
      { id: "LOBA", c: "circ", n: "Sau cổng từ", r: [26.2, 45, 6, 2], ctl: "tv", nz: 1, d: [["COR", 2.4, "o"]] },
      { id: "B1b", c: "B1", n: "Sách mới, báo (quay Bắc)", r: [32.2, 40, 8.2, 7], ctl: "tv", nz: 1, d: [["COR", 2.4, "o"], ["E", 1.2, "tnbd"]] },
      { id: "HS", c: "circ", n: "Hành lang nghiệp vụ", r: [12, 47, 14.2, 2], ctl: "nv", nz: 1, d: [["C1", 1.4, "nv"]] },
      { id: "COR", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [26.2, 47, 14.2, 2], ctl: "tv", nz: 1, d: [["PSS", 1.6, "o"], ["C3", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng (sát lõi sách)", r: [12, 49, 16, 7], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [28, 49, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["COR", 1.4, "thang"]] },
      { id: "PSS", c: "circ", n: "Sảnh sang tháp nối", r: [32, 49, 3, 7], ctl: "tv", nz: 1, d: [["PSL", 1.6, "o"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [35, 49, 5.4, 7], ctl: "kho", nz: 1 },
      { id: "PSL", c: "circ", n: "Tháp nối sang hộp gỗ", r: [32, 56, 4, 10], ctl: "tv", nz: 1, d: [["PS3", 1.6, "o"]] },
      // hộp gỗ tầng 1: dải Bắc thiếu nhi, góc đọc; dải Nam văn phòng, nhân viên, kỹ thuật (thẻ từ)
      { id: "ST6", n: "Thang bộ thư viện Tây (hộp gỗ)", r: [6, 66, 4.5, 8.5], ctl: "tv", nz: 1, core: { st: "u", link: "ST6" }, d: [["W", 1.2, "tnbd"], ["COR3", 1.0, "nv"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (ra vườn)", r: [10.5, 66, 21.5, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["PS3", 1.8, "p"], ["WCB", 0.9, "p"], ["N", 1.8, "tnbd", 0.5]] },
      { id: "PS3", c: "circ", n: "Sảnh tháp nối (hộp gỗ)", r: [32, 66, 4, 5.5], ctl: "tv", nz: 1, d: [["WCB", 1.0, "p"], ["B1n", 1.6, "o"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện tầng 1, thiếu nhi, thay tã", r: [32, 71.5, 4, 3], ctl: "tv", nz: 1, wc: KT + " · trẻ em · thay tã" },
      { id: "B1n", c: "B1", n: "Góc đọc nhìn sông", r: [36, 66, 4, 8.5], ctl: "tv", nz: 1 },
      { id: "COR3", c: "circ", n: "Hành lang nhân viên Tây (đệm cách âm)", r: [6, 74.5, 17.9, 1.5], ctl: "nv", nz: 1, d: [["W", 1.2, "tn"], ["COR3b", 1.2, "o"]] },
      { id: "COR3b", c: "circ", n: "Hành lang nhân viên Đông (đệm cách âm)", r: [23.9, 74.5, 16.1, 1.5], ctl: "nv", nz: 1, d: [["E", 1.2, "tn"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 76, 9.2, 6], ctl: "kt", nz: 3, d: [["COR3", 1.2, "nv"], ["S", 1.4, "nv"]] },
      { id: "KC", c: "circ", n: "Kho hồ sơ (đệm cách âm)", r: [15.2, 76, 2, 6], ctl: "nv", nz: 1, d: [["COR3", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [17.2, 76, 6.7, 6], ctl: "nv", nz: 1, d: [["COR3", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [23.9, 76, 12.7, 6], ctl: "nv", nz: 0, d: [["COR3b", 1.0, "nv"]] },
      { id: "STQ", n: "Thang thoát hiểm Đông (hộp gỗ)", r: [36.6, 76, 3.4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STQ" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 24, y: 27, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 29.2, y: 42.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 11.15, y: 26.75, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 27, y: 18, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 21, y: 70, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 21, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 14.1, y: 43.5, t: "Nhận sách", sc: ["4"] },
      { x: 30, y: 79, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [H1, H2, H3, L23],
    rooms: [
      // hộp vàng tầng 2: phòng đa năng, chuyên đề (chạy ngoài giờ, không có cửa sang thư viện)
      { id: "ST2", n: "Thang bộ sự kiện (Tây Bắc)", r: [6, 14, 4, 7.5], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["COR2", 1.2, "thang"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [10, 14, 10.75, 7.5], ctl: "sk", nz: 2, seat: 24, d: [["COR2", 1.2, "p"], ["D1", 1.6, "p"], ["ST2", 1.2, "thang"]] },
      { id: "COR2", c: "circ", n: "Sảnh chờ sự kiện", r: [6, 21.5, 14.75, 2], ctl: "sk", nz: 2, occ: 60 },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [6, 23.5, 4, 6.5], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["COR2", 1.4, "thang"]] },
      { id: "WCE2", c: "E5", n: "Vệ sinh khu sự kiện", r: [10, 23.5, 3.2, 6.5], ctl: "sk", nz: 1, wc: KT, d: [["COR2", 1.0, "p"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [13.2, 23.5, 3.35, 6.5], ctl: "sk", nz: 1, d: [["COR2", 1.2, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [16.55, 23.5, 4.2, 6.5], ctl: "sk", nz: 3, d: [["D1", 4, "o"], ["COR2", 1.0, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [20.75, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["COR2", 1.6, "p"]] },
      // hộp trắng tầng 2 (tầng trên cùng, mái răng cưa hướng Bắc): học nhóm có hành lang riêng, tra cứu số, đọc mở quanh đỉnh lõi sách
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [12 + 4.5 * i, 40, 4.5, 5.6], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] })),
      { id: "BUF", c: "circ", n: "Tủ sách đệm cách âm", r: [30, 40, 2, 7.6], ctl: "tv", nz: 1, d: [["H2c", 1.2, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [32, 40, 8.4, 11.9], ctl: "tv", nz: 1, seat: 16, top: N, d: [["PS2", 1.6, "o"], ["B1e", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [12, 45.6, 18, 2], ctl: "tv", nz: 2, d: [["H2c", 1.6, "o"]] },
      { id: "H2c", c: "circ", n: "Sảnh lõi sách tầng 2", r: [28, 47.6, 4, 1.4], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (Tây)", r: [12, 47.6, 16, 8.4], ctl: "tv", nz: 1, top: N, d: [["CO4", 2.4, "o"], ["CS", 1.4, "thang"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [28, 49, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["PS2", 1.4, "thang"]] },
      { id: "PS2", c: "circ", n: "Sảnh sang tháp nối", r: [32, 51.9, 3, 4.1], ctl: "tv", nz: 1, d: [["PSL2", 1.6, "o"], ["WCL2", 1.0, "p"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2 (hộp trắng)", r: [35, 51.9, 2.6, 4.1], ctl: "tv", nz: 1, wc: KT },
      { id: "B1e", c: "B1", n: "Góc đọc nhìn sông", r: [37.6, 51.9, 2.8, 4.1], ctl: "tv", nz: 1, top: N },
      { id: "PSL2", c: "circ", n: "Tháp nối sang hộp gỗ", r: [32, 56, 4, 10], ctl: "tv", nz: 1, d: [["PS3", 1.6, "o"]] },
      // hộp gỗ tầng 2: dải Bắc đọc linh hoạt, đọc mở; dải Nam đọc yên tĩnh, xa phòng đa năng và học nhóm
      { id: "ST6", n: "Thang bộ thư viện Tây (hộp gỗ)", r: [6, 66, 4.5, 8.5], ctl: "tv", nz: 1, core: { st: "u", link: "ST6" }, d: [["B6", 1.2, "thang"], ["B2", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [10.5, 66, 5.9, 8.5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1t", 2.4, "o"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (hộp gỗ)", r: [16.4, 66, 15.6, 8.5], ctl: "tv", nz: 1, top: N, d: [["PS3", 2.4, "o"], ["B2", 1.6, "p"]] },
      { id: "PS3", c: "circ", n: "Sảnh tháp nối (hộp gỗ)", r: [32, 66, 4, 5.5], ctl: "tv", nz: 1, d: [["WCL3", 1.0, "p"], ["B1n2", 1.6, "o"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện tầng 2 (hộp gỗ)", r: [32, 71.5, 4, 3], ctl: "tv", nz: 1, wc: KT },
      { id: "B1n2", c: "B1", n: "Đọc mở nhìn sông", r: [36, 66, 4, 8.5], ctl: "tv", nz: 1, top: N, d: [["B1s2", 1.6, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (quay Nam)", r: [6, 74.5, 22, 7.5], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "B1s2", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [28, 74.5, 8.6, 7.5], ctl: "tv", nz: 1, top: N, d: [["STQ", 1.2, "thang"]] },
      { id: "STQ", n: "Thang thoát hiểm Đông (hộp gỗ)", r: [36.6, 74.5, 3.4, 7.5], ctl: "tv", nz: 1, core: { st: "u", link: "STQ" } }
    ],
    staff: [
      { x: 36, y: 46, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 13, y: 22.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 18.6, y: 26.75, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH3", code: "H.3", name: "Ba hộp so le quanh giếng gió", from: "hộp xếp",
    H1, H2, H3, LK, L23,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 12, 16.3, 20, 26.2, 28, 32, 36, 40.4], y: [14, 21.5, 23.5, 30, 40, 47, 49, 56, 66, 74.5, 76, 82] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 43.5], [10.2, 43.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [41, 98], [41, 33], [34, 32], [32.8, 26.75]]],
        event: [[[20, -9], [36, 6], [36, 26.75], [32.8, 26.75]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông vào sân Bắc, vào sảnh đón tiếp ở góc Đông Nam hộp vàng, qua cầu kính tới quầy gửi đồ", event: "Khách sự kiện: từ quảng trường Bắc vòng ra sân phía sông, vào sảnh đón tiếp, lên thang tím" },
      hatch: [VUON, K1, K1b, SAN],
      labels: [[22, 62, "Vườn thiếu nhi (tường bao)"], [9, 48, "Sân giao nhận sách"], [19, 35, "Khe gió 10 m"], [19, 18, "Hộp vàng"], [30, 52, "Hộp trắng: cụm sách"], [23, 79, "Hộp gỗ"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ các ý tưởng hộp bạn đã ghim (10.3, 10.5), không có hộp bọc ngoài: ba hộp chữ nhật hai tầng xếp so le như khóa kéo. Hộp vàng (đón tiếp, sự kiện) lệch về phía Tây, hộp trắng (thư viện chính, cao nhất) lệch về phía sông, hộp gỗ (thiếu nhi, nhân viên, đọc yên tĩnh) lệch lại về phía Tây. Giữa các hộp là hai khe gió rộng 10 m mở ra sông; hộp nối hộp bằng cầu kính một tầng và tháp nối hai tầng.</p>
<p><b>Sửa ngày 05/11 theo góp ý đi lại:</b> bản trước để tiếp nhận, xử lý, kho ở hộp gỗ, sách trả phải đi hơn 60 m. Nay tầng 1 hộp trắng là <b>cụm sách</b>: tiếp nhận → xử lý → quầy gửi đồ, mượn trả liền nhau, kho đóng sát lõi sách (thang bộ, thang máy, tời sách). Sảnh đón tiếp dời xuống góc Đông Nam hộp vàng, ngay đầu cầu kính, nên từ sảnh tới quầy chỉ khoảng 14 m. Thiếu nhi chuyển sang hộp gỗ, mở ra vườn trong khe gió.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: chuyển tiếp nhận C4, xử lý C2, kho đóng C1, lưu trữ C3 từ hộp gỗ sang tầng 1 hộp trắng, ngay sau quầy gửi đồ, mượn trả; lõi tím hộp trắng thêm tời sách; sảnh đón tiếp dời xuống góc Đông Nam hộp vàng (đầu cầu kính), trưng bày và cà phê lên dãy Bắc; thiếu nhi chuyển sang dải Bắc hộp gỗ, vườn có tường bao chuyển vào khe gió phía Nam; dải đất sát lối Tây thành sân giao nhận sách; học nhóm có hành lang và tủ sách đệm riêng; thêm thang thoát hiểm Đông cho hộp gỗ; bỏ tháp thang Tây Nam cũ.",
    "Đón tiếp là bản lề: khách vào sảnh đón tiếp từ sân phía sông (cửa chính mặt Đông, cửa phụ mặt Nam). Từ sảnh: rẽ Tây theo hành lang tới cà phê, trưng bày, vệ sinh và thang lên phòng đa năng; đi thẳng cầu kính 10 m tới quầy gửi đồ, mượn trả có cổng từ.",
    "Thang có hệ quả: lõi sách (tím, hộp trắng), thang Tây và thang Đông hộp gỗ chỉ mở vào khu đã qua cổng từ; ở tầng 1 thang hộp gỗ chỉ có cửa thoát hiểm có chuông và cửa thẻ từ nhân viên. Thang sự kiện (cam, tím ở đầu Tây hộp vàng) không có cửa nào sang thư viện; hộp vàng và hộp trắng chỉ nối bằng cầu kính mà đầu cầu là quầy kiểm soát.",
    "Đường sách: sân giao nhận sát lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý → hành lang nghiệp vụ → kho đóng (6 m) → lõi sách → tời sách lên tầng 2. Sách trả từ quầy qua cửa nhân viên vào thẳng phòng xử lý (5 m). Từ kho tới kệ xa nhất khoảng 38 m kể cả đổi tầng.",
    "Vệ sinh: vệ sinh sảnh (mở ngoài giờ) cạnh hành lang sảnh; vệ sinh sự kiện tầng 2 cạnh thang; trong khu đọc có vệ sinh tầng 2 hộp trắng cạnh lõi sách, vệ sinh tầng 1 hộp gỗ cạnh thiếu nhi (thay tã) và vệ sinh tầng 2 hộp gỗ xếp chồng thẳng lên trên.",
    "Ánh sáng Bắc – Nam: ba hộp sâu 16 m nằm ngang Đông – Tây; tầng 1 chia dải Bắc có cửa sổ (xử lý, quầy, đọc, thiếu nhi), dải Nam là kho, lõi, vệ sinh (hộp trắng) hoặc văn phòng quay Nam (hộp gỗ). Tầng 2 là tầng trên cùng, lấy sáng mái răng cưa hướng Bắc. Khe gió 10 m: góc che lớn nhất khoảng 41–44°. Đầu Đông, Tây đặc.",
    "Tiếng ồn: học nhóm có hành lang và tủ sách đệm riêng, không chung vách phòng đọc; thiếu nhi cách phòng đọc bằng tháp nối, vệ sinh, thang; đọc yên tĩnh ở dải Nam tầng 2 hộp gỗ, cách học nhóm và phòng đa năng hơn 20 m, bên dưới là văn phòng, phòng nhân viên; văn phòng cách kỹ thuật bằng kho hồ sơ và cách thiếu nhi bằng hành lang.",
    "Ngoài giờ: hộp vàng chạy riêng (sảnh, trưng bày, cà phê, vệ sinh hai tầng, phòng đa năng, chuyên đề, hai thang ra lối Tây). Chỉ khóa một cửa: cầu kính vào quầy gửi đồ; cửa này không nằm trên đường thoát nạn của khu sự kiện.",
    "Kết cấu: ba hộp khung bê tông, không có phần đua; phòng đa năng 11,25 × 16 m dầm ứng lực trước nhịp 16 m; cầu kính dầm thép nhịp 10 m.",
    "Bãi xe giữ như A; xe giao sách vào lối Tây, đỗ ở sân giao nhận trước cửa cuốn đầu Tây hộp trắng."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, col } = G.K;
  const core = (L, id, c, roof, up) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, roof + up, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH3", fam: "chot", code: "H.3", from: "hộp xếp", name: "Ba hộp so le quanh giếng gió", rule: "Xếp so le kiểu khóa kéo, khe gió giữa các hộp",
    tag: "Ba hộp hai tầng ba màu lệch nhau như khóa kéo; hai khe gió 10 m; tầng 1 hộp trắng là cụm sách ngay sau quầy mượn trả; không hộp bọc ngoài",
    story: "Giữ cái bạn thích ở các ý tưởng hộp: nhiều hộp khác màu, khác cao, đặt lệch nhau, nhưng bỏ hộp bọc ngoài. Ba hộp chữ nhật hai tầng xếp so le Tây – Đông – Tây như răng khóa kéo. Hộp vàng là nơi khách vào và sự kiện; hộp trắng là trái tim thư viện, tầng 1 là cụm sách quanh lõi tời sách; hộp gỗ là thiếu nhi, nhân viên và đọc yên tĩnh. Hai khe giữa các hộp là hai giếng gió mở ra sông.",
    why: [["Quy luật hình khối", "Ba hộp cùng chiều sâu 16 m, dài khác nhau (26, 28, 34 m), cao khác nhau (+9,45, +10,45, +9,95) và khác vật liệu (vàng đất, trắng, gỗ), xếp lệch nhau 6 m một lần."], ["Khối chính – khối phụ", "Hộp trắng (thư viện) cao nhất, cùng hộp gỗ chiếm khoảng 70% sàn. Hộp vàng thấp hơn; cầu kính, tháp nối, lõi thang là khối phụ."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam; đầu hồi Đông, Tây đặc. Khe gió 10 m và mái các hộp che bớt nắng trưa cho mặt Nam."], ["Gió và mưa", "Hai khe mở về phía sông đón gió Đông Nam; khe phía Nam là vườn thiếu nhi. Cầu kính có mái nên người đọc đi từ sảnh sang thư viện không bị mưa."], ["Công năng", "Một cửa vào cho khách, sảnh đón tiếp chia hai ngả; khu sự kiện chạy riêng ngoài giờ; khu đọc chỉ vào qua quầy có cổng từ; nghiệp vụ, kho gom ở tầng 1 hộp trắng ngay sau quầy mượn trả."]],
    kc: { he: "Ba hộp khung bê tông, cột theo lưới hai dãy phòng và hành lang giữa. Phòng đa năng 11,25 × 16 m dầm ứng lực trước nhịp 16 m. Cầu kính dầm thép nhịp 10 m. Không có phần đua.", nhip: "16 m (phòng đa năng)", cx: "Không" },
    qa: [["Thủ thư thay sách có phải đi xa?", "Không: tiếp nhận, xử lý, quầy mượn trả liền một dãy ở tầng 1 hộp trắng; kho đóng ngay sau, sát lõi có tời sách; từ kho lên kệ xa nhất khoảng 38 m kể cả đổi tầng."], ["Khách sự kiện có phải đi vòng?", "Có, khoảng 30 m: từ quảng trường Bắc vòng ra sân phía sông vào sảnh đón tiếp. Đổi lại cả nhà chỉ có một sảnh, lễ tân nhìn thấy mọi người ra vào."], ["Khe 10 m có đủ sáng không?", "Góc che từ cửa sổ tầng 1 tới đỉnh hộp đối diện khoảng 41°, tới đỉnh lõi tím 44°, dưới mức 45°."]],
    cut: "Ba khối foam: vàng 26 × 16 × 4,5 cm, trắng 28 × 16 × 5 cm, gỗ (dán giấy vân gỗ) 34 × 16 × 4,8 cm theo tỷ lệ 1/200 tính bằng mét chia 2. Cầu kính bằng mica, tháp nối foam xám. Lõi thang foam tím và cam nhô 0,5–0,8 cm trên mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[19, 22, z1 + 0.3, "Khối phụ · Hộp vàng: đón tiếp, sự kiện", 2], [24, 48, z2 + 0.3, "Khối chính · Hộp trắng: cụm sách + đọc", 1], [20, 74, z3 + 0.3, "Khối chính · Hộp gỗ: thiếu nhi, đọc yên tĩnh", 1], [27.7, 35, 6, "Cầu kính", 2], [22, 62, 0.6, "Vườn thiếu nhi", 2], [34, 61, z1 + 0.3, "Tháp nối", 2], [30, 52.5, z2 + 1.3, "Lõi sách: thang + tời sách"]],
    build() {
      // lõi đặt trước hộp để phép kiểm góc che gặp khối cao nhất trước
      const v = [
        core(t1, "ST2", "warn", z1, 1.6), core(t1, "CN", "violet", z1, 1.6), core(t1, "CS", "violet", z2, 1.0), core(t1, "ST6", "warn", z3, 1.6), core(t1, "STQ", "warn", z3, 1.0),
        B(6, 14, 26, 16, 0.45, z1, "gold", "D", { fl: 2, role: "p" }),
        B(12, 40, 28.4, 16, 0.45, z2, "sheet", "B", { fl: 2, role: "m" }),
        B(6, 66, 34, 16, 0.45, z3, "deck", "B", { fl: 2, role: "m" }),
        B(26.2, 30, 3, 10, 0.45, 5.45, "glass", "L", { fl: 1, role: "p" }),
        B(32, 56, 4, 10, 0.45, z1, "stone", "L", { fl: 2, role: "p" }),
        // tường bao vườn thiếu nhi
        B(12, 58, 20, 0.3, 0, 1.4, "stone", "X", { role: "p" }), B(12, 58, 0.3, 8, 0, 1.4, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 23.25, 32]) for (const y of [14, 21.5, 23.5, 30]) st.push(col(x, y, 0.45, z1));
      for (const x of [12, 20, 28, 32, 40.4]) for (const y of [40, 47, 49, 56]) st.push(col(x, y, 0.45, z2));
      for (const x of [6, 14, 22, 30, 36, 40]) for (const y of [66, 74.5, 76, 82]) st.push(col(x, y, 0.45, z3));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
