/* ================= Ý tưởng K.3: Khe chữ V mở ra sông (khe Hải Vân, sửa đủ góp ý của thầy) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // khe của A thành cái phễu chữ V: cổ khe hẹp 6 m ở phía lối Tây, miệng khe rộng 16 m mở ra sông đón gió Đông Nam.
  // hai cánh là các hộp chữ nhật nằm ngang Đông – Tây, mép khe lùi theo bậc nên mọi mặt kính đều quay Bắc hoặc Nam
  const NW = [[6, 16], [20, 16], [20, 32], [6, 32]];      // cánh Bắc, phần Tây: 1 tầng mái cỏ (chuyên đề, kho, vệ sinh sự kiện)
  const NE = [[20, 14], [38, 14], [38, 30], [20, 30]];    // cánh Bắc, phần Đông: 2 tầng (trưng bày, cà phê; phòng đa năng tầng 2)
  const LK = [[6, 32], [9, 32], [9, 38], [6, 38]];        // bản lề kính 1 tầng ở đầu hẹp của khe, nối hai cánh
  const SW = [[6, 38], [20, 38], [20, 54], [6, 54]];      // cánh Nam, phần Tây: đón tiếp ở góc khe, quầy mượn trả, tra cứu số
  const SE = [[20, 46], [40, 46], [40, 62], [20, 62]];    // cánh Nam, phần Đông: thiếu nhi, đọc mở nhìn sông
  const BR = [[20, 62], [24, 62], [24, 70], [20, 70]];    // cầu kính tầng 2 qua sân thiếu nhi
  const S2 = [[6, 70], [38, 70], [38, 86], [6, 86]];      // thanh Nam: nghiệp vụ, kho (tầng 1), đọc yên tĩnh (tầng 2)
  const THROAT = [[9, 32], [20, 32], [20, 38], [9, 38]];  // cổ khe 6 m
  const MOUTH = [[20, 30], [40, 30], [40, 46], [20, 46]]; // miệng khe 16 m, mở ra sông
  const GARDEN = [[24, 62], [38, 62], [38, 70], [24, 70]];// sân thiếu nhi khép kín
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NW, NE, LK, SW, SE, BR, S2],
    rooms: [
      // cánh Bắc phần Tây, 1 tầng: chuyên đề lấy sáng Bắc; dải sát cổ khe chỉ có kho, vệ sinh, sảnh (không cần cửa sổ)
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 16, 9.4, 8], ctl: "sk", nz: 2, seat: 24, d: [["SD", 1.6, "o"], ["N", 1.2, "tn", 0.3]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [15.4, 16, 4.6, 3.3], ctl: "nv", nz: 1, d: [["SD", 0.9, "nv"]] },
      { id: "SD", c: "circ", n: "Sảnh chờ chuyên đề", r: [15.4, 19.3, 4.6, 4.7], ctl: "sk", nz: 2, d: [["CORW", 2.4, "o"]] },
      { id: "CORW", c: "circ", n: "Hành lang sự kiện", r: [6, 24, 14, 2], ctl: "sk", nz: 2, d: [["D4", 1.2, "p", 0.4]] },
      { id: "HB", c: "circ", n: "Sảnh bản lề", r: [6, 26, 3, 6], ctl: "sk", nz: 2, d: [["CORW", 2.4, "o"]] },
      { id: "GR", c: "circ", n: "Phòng chờ người trình bày, gửi áo khách", r: [9, 26, 7.4, 6], ctl: "sk", nz: 1, d: [["CORW", 1.2, "p"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [16.4, 26, 3.6, 6], ctl: "sk", nz: 1, d: [["CORW", 1.4, "p"]] },
      { id: "LK", c: "circ", n: "Bản lề kính (đầu hẹp của khe)", r: [6, 32, 3, 6], ctl: "sk", nz: 2, d: [["HB", 2.4, "o"], ["W", 1.2, "tn"]] },
      // cánh Bắc phần Đông: trưng bày sáng Bắc, cà phê quay ra miệng khe
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [20, 14, 3.5, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOY", 1.4, "thang"], ["N", 1.2, "tn"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Bắc)", r: [23.5, 14, 11.1, 8], ctl: "sk", nz: 2, occ: 30, d: [["FOY", 3, "o"]] },
      { id: "ST2", n: "Thang bộ Đông (sự kiện)", r: [34.6, 14, 3.4, 8], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["N", 1.2, "tn"], ["A3", 1.2, "thang"]] },
      { id: "FOY", c: "circ", n: "Sảnh sự kiện", r: [20, 22, 9, 8], ctl: "sk", nz: 2, occ: 60, d: [["CORW", 2, "o"], ["A3", 3, "o"], ["S", 1.8, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn ra miệng khe)", r: [29, 22, 9, 8], ctl: "sk", nz: 3, seat: 32, bar: [[30, 29.4], [37, 29.4], 6], d: [["S", 1.6, "tn", 0.7]] },
      // cánh Nam: đón tiếp ở góc khe (cửa vào duy nhất), quầy mượn trả có cổng từ, rồi mới tới khu đọc
      { id: "LK0", c: "circ", n: "Sảnh nối bản lề", r: [6, 38, 3, 3.6], ctl: "sk", nz: 2, d: [["LK", 2.4, "o"], ["A1", 2.4, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: [6, 41.6, 3, 4], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin (góc khe)", r: [9, 38, 11, 7.6], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["E", 2.4, "chinh", 0.5], ["N", 2.0, "tudong", 0.6], ["A4", 1.8, "k"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách (Tây)", r: [6, 45.6, 4, 8.4], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1a", 1.4, "thang"], ["W", 1.2, "tnbd"]] },
      { id: "B1a", c: "B1", n: "Báo, sách mới", r: [10, 45.6, 8, 8.4], ctl: "tv", nz: 1, d: [["A4", 1.4, "o"]] },
      { id: "A4b", c: "A4", n: "Quầy trả sách (cổng từ)", r: [24, 70, 2, 7.9], ctl: "tv", ctrl: 1, nz: 2, d: [["NVC", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [18, 45.6, 2, 8.4], ctl: "tv", ctrl: 1, nz: 2, d: [["B6", 1.4, "o"], ["COR1", 1.4, "o", 0.5]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [20, 46, 8, 6.25], ctl: "tv", nz: 1, steps: 4, d: [["COR1", 2.4, "o"]] },
      { id: "COR1", c: "circ", n: "Sảnh đọc tầng 1", r: [20, 52.25, 8, 2], ctl: "tv", nz: 1, d: [["SB3", 1.4, "o"]] },
      { id: "ST3", n: "Thang bộ Nam (thư viện)", r: [20, 54.25, 4.5, 7.75], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["COR1", 1.2, "thang", 0.15], ["BR", 2.4, "o"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [24.5, 54.25, 3.5, 3], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["SB3", 0.9, "p"]] },
      { id: "STR", c: "circ", n: "Chỗ để xe đẩy", r: [24.5, 57.25, 3.5, 4.75], ctl: "tv", nz: 1, d: [["SB3", 0.9, "p"]] },
      { id: "SB3", c: "circ", n: "Sảnh thiếu nhi (lớp đệm)", r: [28, 46, 1.5, 16], ctl: "tv", nz: 2, d: [["B3", 1.2, "p", 0.6]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [29.5, 46, 10.5, 16], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
      // cầu kính tầng 1 qua sân thiếu nhi (trong khu đọc): tới quầy trả sách cạnh nghiệp vụ
      { id: "BR", c: "circ", n: "Cầu kính qua sân", r: [20, 62, 4, 8], ctl: "tv", nz: 1, d: [["S2C", 2.4, "o"]] },
      // thanh Nam tầng 1: khu nhân viên (thẻ từ), cửa nhân viên và cửa cuốn ra lối Tây
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 70, 4, 7.9], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["C2", 1.2, "nv"], ["NVC", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [10, 70, 9, 7.9], ctl: "nv", nz: 1, d: [["NVC", 1.2, "nv"]] },
      { id: "S2C", n: "Thang bộ + thang máy + tời sách (Nam)", r: [19, 70, 5, 7.9], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "S2C" }, d: [["NVC", 1.2, "nv"], ["A4b", 1.2, "o"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [26, 70, 9.4, 7.9], ctl: "nv", nz: 0, d: [["NVC", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [35.4, 70, 2.6, 7.9], ctl: "nv", nz: 1, d: [["NVC", 0.9, "nv"]] },
      { id: "NVC", c: "circ", n: "Hành lang nghiệp vụ", r: [6, 77.9, 32, 1.6], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["E", 1.2, "tn"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 79.5, 6, 6.5], ctl: "kho", nz: 1, d: [["NVC", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng (ngay dưới thang có tời sách)", r: [12, 79.5, 17.5, 6.5], ctl: "kho", nz: 1, d: [["NVC", 1.2, "nv", 0.55]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [29.5, 79.5, 8.5, 6.5], ctl: "kt", nz: 3, d: [["NVC", 1.2, "nv"], ["S", 1.4, "nv"]] }
    ],
    staff: [
      { x: 14.5, y: 41.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 18.1, y: 50, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 17.7, y: 17.6, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 33.5, y: 25, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 52, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 14.5, y: 73.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 73.5, t: "Nhận sách", sc: ["4"] },
      { x: 28.7, y: 73.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 24.5, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 11, y: 20, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NE, SW, SE, BR, S2],
    rooms: [
      // cánh Bắc phần Đông: phòng đa năng lấy sáng hai mặt Bắc – Nam (không có cửa sang thư viện)
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [20, 14, 3.5, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOY2", 1.4, "thang"]] },
      { id: "FOY2", c: "circ", n: "Sảnh chờ phòng đa năng", r: [20, 22, 3.5, 4], ctl: "sk", nz: 2, occ: 40, d: [["D1", 2.4, "p", 0.5], ["WC2E", 0.9, "p"]] },
      { id: "WC2E", c: "E5", n: "Vệ sinh khu sự kiện tầng 2", r: [20, 26, 3.5, 4], ctl: "sk", nz: 1, wc: KT },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [23.5, 14, 11.1, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["ST2", 1.4, "thang"], ["D2", 3.5, "o"]] },
      { id: "ST2", n: "Thang bộ Đông (sự kiện)", r: [34.6, 14, 3.4, 8], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["BSL", 1.2, "p"]] },
      { id: "BSL", c: "circ", n: "Lối hậu đài", r: [34.6, 22, 3.4, 1], ctl: "sk", nz: 2, d: [["D2", 1.0, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [34.6, 23, 3.4, 7], ctl: "sk", nz: 3 },
      // cánh Nam phần Tây: tra cứu số sáng Bắc, đọc mở sáng Nam
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [6, 38, 2.5, 4.4], ctl: "tv", nz: 1, wc: KT, d: [["B5", 1.0, "p"]] },
      { id: "KT2", c: "circ", n: "Tủ đồ tra cứu", r: [6, 42.4, 2.5, 3.6], ctl: "tv", nz: 1, d: [["B5", 0.9, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (sáng Bắc)", r: [8.5, 38, 11.5, 8], ctl: "tv", nz: 1, seat: 16, d: [["B1w", 2.4, "o", 0.7]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách (Tây)", r: [6, 46, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B5", 1.2, "thang"], ["B1w", 1.4, "thang"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (sáng Nam)", r: [10, 46, 10, 8], ctl: "tv", nz: 1, d: [["B1s", 2.4, "o"]] },
      // cánh Nam phần Đông: đọc mở nhìn sông, học nhóm
      { id: "B1s", c: "B1", n: "Đọc mở nhìn sông (sáng Bắc)", r: [20, 46, 20, 6.25], ctl: "tv", nz: 1, d: [["COR2", 3, "o", 0.3], ["COR2", 3, "o", 0.8]] },
      { id: "COR2", c: "circ", n: "Hành lang học nhóm", r: [20, 52.25, 20, 2], ctl: "tv", nz: 1 },
      { id: "ST3", n: "Thang bộ Nam (thư viện)", r: [20, 54.25, 4.5, 7.75], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["COR2", 1.2, "thang"], ["BR", 2.4, "o"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [24.5 + 3.3 * i, 54.25, 3.3, 7.75], ctl: "tv", nz: 2, d: [["COR2", 0.9, "p"]] })),
      { id: "WCSE", c: "E5", n: "Vệ sinh tầng 2 (đầu Đông)", r: [37.7, 54.25, 2.3, 7.75], ctl: "tv", nz: 1, wc: KT, d: [["COR2", 0.9, "p"]] },
      // cầu kính qua sân thiếu nhi
      { id: "BR", c: "circ", n: "Cầu kính", r: [20, 62, 4, 8], ctl: "tv", nz: 1, d: [["S2C", 2.4, "o"]] },
      // thanh Nam tầng 2: đọc mở, đọc yên tĩnh xa mọi nguồn ồn
      { id: "B1n2", c: "B1", n: "Đọc mở và kệ (Tây)", r: [6, 70, 13, 7.9], ctl: "tv", nz: 1, shelf: 0.35, d: [["COR3", 2.4, "o"]] },
      { id: "S2C", n: "Thang bộ + thang máy + tời sách (Nam)", r: [19, 70, 5, 7.9], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "S2C" }, d: [["COR3", 1.4, "thang"]] },
      { id: "B1n3", c: "B1", n: "Đọc mở và kệ (Đông)", r: [24, 70, 9.4, 7.9], ctl: "tv", nz: 1, shelf: 0.35, d: [["COR3", 2.4, "o"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [33.4, 70, 4.6, 7.9], ctl: "nv", nz: 1, d: [["COR3", 0.9, "nv"]] },
      { id: "COR3", c: "circ", n: "Sảnh đọc yên tĩnh", r: [6, 77.9, 32, 1.2], ctl: "tv", nz: 1 },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 79.1, 24, 6.9], ctl: "tv", nz: 0, seat: 40, d: [["COR3", 1.2, "p", 0.25], ["COR3", 1.2, "p", 0.75]] },
      { id: "WCS2", c: "E5", n: "Vệ sinh tầng 2 phía Nam", r: [30, 79.1, 2, 5], ctl: "tv", nz: 1, wc: KT, d: [["COR3", 0.9, "p"]] },
      { id: "KS2", c: "circ", n: "Tủ đồ", r: [30, 84.1, 2, 1.9], ctl: "tv", nz: 1, d: [["B1q", 0.9, "p"]] },
      { id: "B1q", c: "B1", n: "Đọc tài liệu địa phương", r: [32, 79.1, 6, 6.9], ctl: "tv", nz: 1, d: [["COR3", 1.2, "o"]] }
    ],
    staff: [
      { x: 13, y: 41.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 36.1, y: 26.6, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotK3", code: "K.3", name: "Khe chữ V mở ra sông", from: "A",
    NW, NE, LK, SW, SE, BR, S2,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 20, 24, 28, 38], y: [14, 22, 30, 38, 46, 54, 62, 70, 78, 86] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 72], [5.2, 72]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.6, 98], [40.6, 41.8], [20.8, 41.8]]],
        event: [[[20, -9], [40.6, 6], [40.6, 41.8], [20.8, 41.8]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào miệng khe tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, bờ sông, vào miệng khe tới sảnh đón tiếp" },
      hatch: [THROAT, MOUTH, GARDEN],
      labels: [[14.5, 35, "Cổ khe 6 m"], [31, 38, "Miệng khe 16 m, mở ra sông"], [31, 66, "Sân thiếu nhi"], [13, 62, "Sân trong"], [12, 20, "Cánh Bắc 1 tầng"], [29, 18, "Cánh Bắc 2 tầng"], [22, 82, "Thanh Nam"]]
    }
  };
  plan.intro = `<p class="lede">Giữ khe Hải Vân của A nhưng đổi cách làm khối cho đúng góp ý của thầy. Khe chéo thành cái phễu chữ V: cổ khe hẹp 6 m phía lối Tây, miệng khe rộng 16 m mở ra sông đón gió Đông Nam. Hai cánh là các hộp chữ nhật nằm ngang Đông – Tây, mép khe lùi theo bậc, nên mọi mặt kính đều quay Bắc hoặc Nam. Cửa vào duy nhất là sảnh đón tiếp ở góc gãy chữ V: rẽ trái qua bản lề kính sang khu sự kiện, hoặc đi thẳng qua quầy mượn trả có cổng từ vào thư viện. Bản sửa ngày 05/11 thêm cầu kính tầng 1 qua sân thiếu nhi, đặt quầy trả sách ngay cạnh thang có tời sách và phòng xử lý, dời kho đóng xuống ngay dưới thang đó, và chia lại vệ sinh cho gần từng khu.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: thêm cầu kính tầng 1 qua sân thiếu nhi (trước chỉ có cầu tầng 2); thêm quầy trả sách có cổng từ ở thanh Nam, giữa thang có tời sách và văn phòng, do nhân viên nghiệp vụ trực. Kho đóng đổi chỗ với lưu trữ tài liệu địa phương, nằm ngay dưới thang có tời sách. Vệ sinh sảnh dời sát sảnh đón tiếp; thêm vệ sinh cạnh phòng đa năng tầng 2 và vệ sinh ở đầu Đông dãy học nhóm. Giữa đọc linh hoạt và thiếu nhi có sảnh thiếu nhi làm lớp đệm. Bỏ góc đọc cá nhân sát học nhóm, dời phòng nhân viên lên tầng 2 thanh Nam.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý nghiệp vụ → hành lang nghiệp vụ → kho đóng (11 m) → tời sách lên kệ tầng 2, hoặc qua cầu kính tầng 1 sang cánh Nam. Sách trả: người đọc trả ở quầy trả sách cạnh thang Nam (hoặc quầy chính, rồi thủ thư mang qua cầu kính tầng 1); từ quầy trả theo hành lang nghiệp vụ về xử lý 14 m, không qua khu công cộng. Kho tới kệ xa nhất 48 m.",
    "Thang có hệ quả: thang Tây (có tời sách), thang Nam cánh Nam và thang thanh Nam (có tời sách) đều nằm sau quầy mượn trả có cổng từ. Người đọc đi: cửa chính ở góc chữ V → sảnh đón tiếp → quầy giữ đồ, mượn trả (6 m) → khu đọc và thang. Hai thang sự kiện chỉ nối khu sự kiện, không có cửa sang thư viện. Thang thanh Nam ở tầng 1 chỉ mở vào hành lang nghiệp vụ, quầy trả sách và cầu kính, không ra ngoài.",
    "Vệ sinh: cụm sảnh mở ngoài giờ ngay cạnh sảnh đón tiếp (6 m); cụm sự kiện ngay sảnh chờ phòng đa năng tầng 2 (9 m). Trong khu đọc: vệ sinh thay tã cạnh sảnh thiếu nhi (7 m), vệ sinh cạnh tra cứu số, vệ sinh đầu Đông dãy học nhóm, vệ sinh tầng 2 thanh Nam. Chỗ đọc xa nhất tới vệ sinh 22 m, không phải ra khỏi cổng từ.",
    "Ánh sáng Bắc – Nam: mọi hộp nằm ngang Đông – Tây, phòng có người dùng chạm mặt Bắc hoặc Nam và sâu tối đa 8 m tính từ cửa sổ (thiếu nhi và phòng đa năng chạy suốt chiều sâu 16 m, lấy sáng hai mặt). Đầu hồi Đông, Tây làm đặc. Cánh Bắc phần Tây chỉ 1 tầng nên sảnh đón tiếp nhìn qua cổ khe chỉ bị che 32°; sân thiếu nhi 8 m, góc che 44°.",
    "Tiếng ồn: đọc yên tĩnh ở dải Nam tầng 2 thanh Nam, cách học nhóm 17 m, bên dưới là kho, lưu trữ, không chồng lên phòng ồn. Học nhóm có hành lang riêng, hai đầu là thang và vệ sinh, không chung vách phòng đọc. Thiếu nhi ngăn với đọc linh hoạt bằng sảnh thiếu nhi. Văn phòng, phòng nhân viên không sát phòng ồn hay kỹ thuật.",
    "Đón tiếp là bản lề: sảnh đón tiếp ở góc gãy chữ V là phòng duy nhất có cửa vào từ ngoài. Khách sự kiện đi sảnh → bản lề kính → sảnh sự kiện → chuyên đề, trưng bày, cà phê, thang lên phòng đa năng.",
    "Ngoài giờ: mở sảnh đón tiếp, vệ sinh sảnh, bản lề kính, cánh Bắc. Chỉ khóa cửa sảnh đón tiếp → quầy mượn trả; cửa này không nằm trên đường thoát nạn.",
    "Kết cấu: các hộp lưới cột 8 m; phòng đa năng 11 × 16 m dầm ứng lực trước nhịp 16 m ở tầng 2. Kho đóng ở tầng 1 trên nền. Hai cầu kính nhịp 8 m (tầng 1 và tầng 2) tựa lên hai hộp. Không có phần đua. Tổng sàn 2.994 m², dưới mức 3.000 m².",
    "Bãi xe giữ như A. Người đọc và khách sự kiện cùng đi dọc bờ sông vào miệng khe; xe giao sách vào cổng Tây Nam, theo lối Tây tới cửa cuốn ở đầu Tây thanh Nam."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, SH, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotK3", fam: "chot", code: "K.3", from: "A", name: "Khe chữ V mở ra sông", rule: "Phễu bậc: cổ khe hẹp, miệng khe rộng",
    tag: "Khe Hải Vân thành phễu chữ V: cổ 6 m phía lối Tây, miệng 16 m mở ra sông; hai cánh là hộp chữ nhật lùi bậc theo mép khe",
    story: "Đèo Hải Vân hẹp ở cổ, mở rộng ra biển. K.3 lấy hình ảnh đó cho khe của A: phía lối Tây khe hẹp 6 m, càng ra sông càng mở rộng thành miệng khe 16 m đón gió Đông Nam. Hai cánh không còn mép chéo mà là những hộp chữ nhật lùi bậc theo khe, nên mọi cửa sổ quay Bắc hoặc Nam. Sảnh đón tiếp đặt ngay góc gãy của chữ V: bên trái là bản lề kính sang khu sự kiện, phía trước là quầy mượn trả dẫn vào thư viện.",
    why: [["Quy luật hình khối", "Bậc thang: mỗi cánh gồm hai hộp chữ nhật lệch nhau theo phương Bắc – Nam, tạo cổ khe và miệng khe. Thanh Nam là hộp thứ ba song song, ngăn với cánh Nam bởi sân thiếu nhi."], ["Khối chính – khối phụ", "Cánh Nam và thanh Nam (thư viện) chiếm khoảng 70% sàn, cao hai tầng; cánh Bắc phía Tây chỉ một tầng, phía Đông hai tầng."], ["Nắng và chói", "Mọi kính quay Bắc hoặc Nam; mặt Đông (sông) và mặt Tây (Trần Phú) là tường đặc. Cà phê và thiếu nhi nhìn nhau qua miệng khe, có ô văng chống nắng Nam."], ["Gió và mưa", "Miệng khe mở về Đông Nam, gió mùa hè thổi thẳng vào phễu rồi luồn qua cửa sổ Bắc – Nam của các hộp. Cửa chính lùi trong góc chữ V, mưa Đông Bắc bị cánh Bắc chắn."]],
    kc: { he: "Khung bê tông lưới 8 m theo phương Đông – Tây, 16 m sâu theo phương Bắc – Nam với một hàng cột giữa (trừ phòng đa năng và thiếu nhi dùng dầm nhịp 16 m). Mái bê tông phủ cỏ; cánh 1 tầng mái dốc về cổ khe. Cầu kính dầm thép nhịp 8 m.", nhip: "16 m (phòng đa năng, thiếu nhi), 8 m (lưới)", cx: "Không" },
    qa: [["Cổ khe 6 m có tối không?", "Cánh Bắc ở cổ khe chỉ một tầng, nên sảnh đón tiếp vẫn thấy trời với góc che 32°; dải nhà Bắc sát cổ khe là kho, vệ sinh, không cần cửa sổ."], ["Khách sự kiện có phải đi qua thư viện?", "Không. Từ sảnh đón tiếp rẽ sang bản lề kính là vào khu sự kiện; cửa vào thư viện là quầy mượn trả, khóa ngoài giờ."]],
    cut: "Tỉ lệ 1:200. Năm hộp foam trắng: cánh Bắc phía Tây cao 2,5 cm (mái cỏ dốc), cánh Bắc phía Đông, cánh Nam, thanh Nam cao 4,5 cm mái bằng dán giấy cỏ. Bản lề kính và cầu kính bằng mica. Lõi thang: foam tím và cam cao hơn mái 0,8 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[13, 46, 9.75, "Khối chính · Cánh Nam: đón tiếp, thư viện", 1], [22, 78, 9.75, "Khối chính · Thanh Nam: nghiệp vụ, đọc yên tĩnh", 1], [29, 22, 10.75, "Khối phụ · Cánh Bắc: sự kiện", 2], [12, 22, 5.8, "Khối phụ 1 tầng", 2], [14.5, 35, 0.6, "Cổ khe 6 m", 2], [31, 38, 0.6, "Miệng khe 16 m", 2], [31, 66, 0.6, "Sân thiếu nhi", 2], [22, 66, 9.3, "Cầu kính", 2], [7.5, 35, 4.8, "Bản lề kính", 2]],
    build() {
      const v = [
        coreBox(t1, "CN", "violet", 12.05), coreBox(t1, "ST2", "warn", 12.05), coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "ST3", "warn", 11.05), coreBox(t1, "S2C", "violet", 11.05),
        // tầng 2 (mái cỏ): cánh Bắc phía Đông dốc xuống miệng khe; cánh Nam phía Tây dốc xuống cổ khe; cánh Nam phía Đông và thanh Nam mái bằng
        SH(20, 14, 18, 16, 4.95, 9.45, 10.45, "-y", "sheet", "D", { fl: 1, top: "grass", role: "p" }),
        SH(6, 38, 14, 16, 4.95, 9.45, 10.45, "+y", "sheet", "B", { fl: 1, top: "grass", role: "m" }),
        B(20, 46, 20, 16, 4.95, 9.45, "sheet", "B", { fl: 1, top: "grass", role: "m" }),
        B(6, 70, 32, 16, 4.95, 9.45, "sheet", "B", { fl: 1, top: "grass", role: "m" }),
        B(20, 62, 4, 8, 0.45, 8.95, "glass", "L", { fl: 2, role: "p" }),
        // tầng 1
        SH(6, 16, 14, 16, 0.45, 4.95, 5.45, "-y", "sheet", "D", { fl: 1, top: "grass", role: "p" }),
        B(20, 14, 18, 16, 0.45, 4.95, "sheet", "A", { fl: 1, role: "p" }),
        B(6, 32, 3, 6, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 38, 14, 16, 0.45, 4.95, "sheet", "A", { fl: 1, role: "m" }),
        B(20, 46, 20, 16, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 70, 32, 16, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }),
        // tường rào sân thiếu nhi (đầu Đông) và sân trong (đầu Tây)
        B(37.7, 62, 0.3, 8, 0, 1.2, "stone", "X", { role: "p" }), B(6, 54, 0.3, 16, 0, 1.8, "stone", "X", { role: "p" })
      ];
      const st = [];
      const box = [[6, 16, 20, 32, 5.45], [20, 14, 38, 30, 10.45], [6, 38, 20, 54, 10.45], [20, 46, 40, 62, 9.45], [6, 70, 38, 86, 9.45]];
      for (const [x1, y1, x2, y2, top] of box) for (const x of [x1, (x1 + x2) / 2, x2]) for (const y of [y1, (y1 + y2) / 2, y2]) st.push(col(x, y, 0.45, top - 0.5));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
