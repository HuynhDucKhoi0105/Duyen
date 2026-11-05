/* ================= Ý tưởng H.2: Hộp lớn ven sông, hộp nhỏ ven phố, hộp màu cài vào (phát triển từ 10.5 và 10.7) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp đỏ sự kiện nhỏ ở góc phố – Bắc; hộp đá thư viện lớn ở phía sông – Nam, khoét một sân giữa; hiên kính một tầng nối hai hộp;
  // hai hộp màu cài vào: hộp xanh cà phê cạnh hiên, hộp vàng thiếu nhi cài vào sân khoét của hộp đá
  const R = (x0, y0, x1, y1) => [x0, y0, x1 - x0, y1 - y0];
  const P = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const EV = P(6, 14, 23, 30), TW = P(9, 30, 13, 37);           // hộp đỏ sự kiện 2 tầng, tháp thang cam
  const AB = P(23, 16, 34, 30), EB = P(34, 16, 36.5, 22);            // hiên kính đón tiếp + hộp xanh cà phê, phòng bảo vệ
  const LK = P(23, 30, 26, 40);                                      // hành lang kính tới quầy thư viện
  const NW = P(9, 40, 38, 54), SP = P(9, 54, 19.5, 71), SW = P(12, 71, 41, 85);   // hộp đá chữ U: cánh Bắc (cụm sách), sống Tây (kho đóng), cánh Nam
  const YB = P(19.5, 54, 39, 62.5);                                  // hộp vàng thiếu nhi cài vào sân khoét, tựa vào cánh Bắc, mở ra sân phía Nam
  const COURT = P(19.5, 62.5, 41, 71);
  const N = "N";
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, TW, AB, EB, LK, NW, SP, YB, SW],
    rooms: [
      // hộp đỏ tầng 1: phòng đa năng ở tầng trệt, chỉ vào từ sảnh đón tiếp
      { id: "D2", c: "D2", n: "Bục trình bày", r: R(6, 14, 9, 23), ctl: "sk", nz: 3, d: [["D1", 4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: R(6, 23, 9, 30), ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: R(9, 14, 19.5, 30), ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["FOY", 2.4, "p"], ["CN", 1.4, "thang"], ["ST2", 1.2, "thang"], ["N", 1.8, "tn", 0.5]] },
      { id: "WC1", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: R(19.5, 14, 23, 20), ctl: "sk", nz: 1, wc: KT, d: [["FOY", 1.0, "p"]] },
      { id: "FOY", c: "circ", n: "Sảnh vào phòng đa năng", r: R(19.5, 20, 23, 23), ctl: "sk", nz: 2, occ: 30, d: [["A1n", 2.4, "o"]] },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: R(19.5, 23, 23, 30), ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOY", 1.4, "thang"], ["A1", 1.4, "thang"]] },
      { id: "ST2", n: "Tháp thang cam (sự kiện)", r: R(9, 30, 13, 37), ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["W", 1.2, "tn"]] },
      // hiên kính: sảnh đón tiếp chung là bản lề, hộp xanh cà phê, phòng bảo vệ
      { id: "A1n", c: "A1", n: "Đón tiếp: quầy lễ tân, chỗ chờ", r: R(23, 16, 29, 23), ctl: "sk", nz: 2, seat: 20, occ: 20, d: [["N", 2.4, "chinh", 0.5], ["A1", 3, "o"], ["A3", 2.4, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp: sảnh chia luồng", r: R(23, 23, 29, 30), ctl: "sk", nz: 2, occ: 20, d: [["S", 1.6, "tudong", 0.8], ["LK", 2.4, "o"], ["A3", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (hộp xanh)", r: R(29, 16, 34, 30), ctl: "sk", nz: 3, seat: 32, bar: [[33.6, 17], [33.6, 29], 10], d: [["S", 1.8, "tudong", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: R(34, 16, 36.5, 22), ctl: "nv", nz: 1, d: [["A3", 0.9, "nv"]] },
      { id: "LK", c: "circ", n: "Hành lang kính sang thư viện", r: R(23, 30, 26, 40), ctl: "sk", nz: 2 },
      // hộp đá, cánh Bắc tầng 1 = cụm sách: tiếp nhận → xử lý → quầy gửi đồ, mượn trả liền nhau; lõi sách ngay sau
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: R(9, 40, 13.3, 47), ctl: "nv", nz: 1, d: [["W", 2.6, "cuon", 0.4], ["W", 1.0, "nv", 0.88], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: R(13.3, 40, 23, 47), ctl: "nv", nz: 1, d: [["HS", 1.2, "nv"], ["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: R(23, 40, 27.3, 47), ctl: "tv", ctrl: 1, nz: 2, d: [["LK", 2.4, "k"], ["COR", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: R(27.3, 40, 34.4, 47), ctl: "tv", nz: 1, steps: 5, d: [["COR", 2.6, "o"]] },
      { id: "B1m", c: "B1", n: "Góc đọc nhìn sông", r: R(34.4, 40, 38, 47), ctl: "tv", nz: 1, d: [["COR", 1.6, "o"], ["E", 1.2, "tnbd"]] },
      { id: "HS", c: "circ", n: "Hành lang nghiệp vụ", r: R(9, 47, 16.5, 54), ctl: "nv", nz: 1, d: [["C1", 1.4, "nv"], ["CS", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: R(16.5, 47, 21.5, 54), ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["COR", 1.4, "thang"], ["LC2", 1.4, "thang"]] },
      { id: "COR", c: "circ", n: "Sảnh thư viện sau cổng từ", r: R(21.5, 47, 38, 49), ctl: "tv", nz: 1, d: [["WCL1", 1.0, "p"], ["LC", 1.6, "o"], ["KX", 1.0, "p"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1, thay tã", r: R(21.5, 49, 24, 54), ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["B3", 0.9, "p"]] },
      { id: "LC", c: "circ", n: "Hành lang thiếu nhi", r: R(24, 49, 28, 54), ctl: "tv", nz: 1, d: [["B3", 1.8, "p"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: R(28, 49, 36, 54), ctl: "kho", nz: 1, d: [["COR", 1.0, "nv"]] },
      { id: "KX", c: "circ", n: "Kho xe đẩy sách", r: R(36, 49, 38, 54), ctl: "tv", nz: 1 },
      // sống Tây: kho đóng sát lõi sách; hành lang thư viện sang cánh Nam
      { id: "C1", c: "C1", n: "Kho đóng (sống Tây, sát lõi sách)", r: R(9, 54, 16.5, 71), ctl: "kho", nz: 1, d: [["LC2", 1.2, "nv"]] },
      { id: "LC2", c: "circ", n: "Hành lang thư viện sống Tây", r: R(16.5, 54, 19.5, 71), ctl: "tv", nz: 1, d: [["B3", 1.8, "p"], ["SL", 2.4, "o"]] },
      // hộp vàng thiếu nhi: tựa vào cánh Bắc, mở ra vườn có tường bao ở sân phía Nam
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (hộp vàng)", r: R(19.5, 54, 39, 62.5), ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.6]] },
      // cánh Nam tầng 1: dải Bắc là đọc mở quay ra sân, dải Nam là văn phòng, nhân viên, kỹ thuật
      { id: "SL", c: "circ", n: "Sảnh đọc cánh Nam", r: R(12, 71, 19.5, 78), ctl: "tv", nz: 1, d: [["B1s", 2.4, "o"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (quay ra sân)", r: R(19.5, 71, 33, 78), ctl: "tv", nz: 1, d: [["STS", 1.4, "thang"]] },
      { id: "STS", n: "Thang bộ + thang máy thư viện Nam", r: R(33, 71, 38, 78), ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" }, d: [["N", 1.2, "tnbd"], ["B1t", 1.2, "thang"]] },
      { id: "B1t", c: "B1", n: "Góc đọc nhìn sông (Nam)", r: R(38, 71, 41, 78), ctl: "tv", nz: 1 },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: R(12, 78, 19.9, 85), ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["S", 1.2, "nv"]] },
      { id: "KC", c: "circ", n: "Kho hồ sơ (đệm cách âm)", r: R(19.9, 78, 21.9, 85), ctl: "nv", nz: 1, d: [["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: R(21.9, 78, 27.6, 85), ctl: "nv", nz: 1, d: [["S", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: R(27.6, 78, 38, 85), ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"], ["S", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: R(38, 78, 41, 85), ctl: "nv", nz: 1, d: [["S", 0.9, "nv"]] }
    ],
    staff: [
      { x: 26, y: 22, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 25.2, y: 43.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 35.2, y: 19, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 31.5, y: 27, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 58, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 30.8, y: 43.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 18, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 11.2, y: 43.5, t: "Nhận sách", sc: ["4"] },
      { x: 33, y: 81.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 7.5, y: 18.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [EV, TW, NW, SP, SW],
    rooms: [
      // hộp đỏ tầng 2: chuyên đề, trưng bày, chỉ lên được bằng thang sự kiện từ sảnh đón tiếp
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: R(6, 14, 16.7, 21), ctl: "sk", nz: 2, seat: 24, d: [["FOYM", 1.6, "p"]] },
      { id: "KD4", c: "circ", n: "Kho đồ dùng chuyên đề", r: R(16.7, 14, 19.5, 21), ctl: "sk", nz: 1, d: [["D4", 0.9, "p"]] },
      { id: "FOYM", c: "circ", n: "Sảnh tầng 2 khu sự kiện", r: R(6, 21, 19.5, 23), ctl: "sk", nz: 2, d: [["FOYa", 1.8, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Nam qua lam)", r: R(6, 23, 19.5, 30), ctl: "sk", nz: 2, occ: 30, d: [["FOYM", 3, "o", 0.4], ["ST2", 1.2, "thang"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh khu sự kiện", r: R(19.5, 14, 23, 18.6), ctl: "sk", nz: 1, wc: KT, d: [["FOYa", 1.0, "p"]] },
      { id: "FOYa", c: "circ", n: "Sảnh thang sự kiện", r: R(19.5, 18.6, 23, 23), ctl: "sk", nz: 2 },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: R(19.5, 23, 23, 30), ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOYa", 1.4, "thang"]] },
      { id: "ST2", n: "Tháp thang cam (sự kiện)", r: R(9, 30, 13, 37), ctl: "sk", nz: 1, core: { st: "u", link: "ST2" } },
      // hộp đá tầng 2 (tầng trên cùng): mọi phòng đọc lấy sáng mái răng cưa hướng Bắc
      { id: "B1nw", c: "B1", n: "Đọc mở và kệ (góc Tây Bắc)", r: R(9, 40, 16.5, 54), ctl: "tv", nz: 1, top: N, d: [["H1", 2.0, "o"]] },
      { id: "H1", c: "circ", n: "Sảnh lõi sách tầng 2", r: R(16.5, 40, 21.5, 47), ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B1c", 2.0, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: R(16.5, 47, 21.5, 54), ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "B1c", c: "B1", n: "Kệ mở quanh lõi sách", r: R(21.5, 40, 24.5, 50), ctl: "tv", nz: 1, top: N, d: [["H2", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: R(21.5, 50, 24.5, 54), ctl: "tv", nz: 1, wc: KT, d: [["H2", 1.0, "p"]] },
      { id: "H2", c: "circ", n: "Sảnh học nhóm", r: R(24.5, 40, 28, 54), ctl: "tv", nz: 2, d: [["CO4", 1.6, "o"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: R(28, 40, 33, 45), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: R(33, 40, 38, 45), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: R(28, 45, 38, 48), ctl: "tv", nz: 2 },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: R(28, 48, 33, 54), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: R(33, 48, 38, 54), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: R(9, 54, 19.5, 64), ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1nw", 2.4, "o"], ["CS", 1.4, "thang"], ["B1sp", 2.4, "o"]] },
      { id: "B1sp", c: "B1", n: "Đọc mở và kệ (sống Tây)", r: R(9, 64, 19.5, 71), ctl: "tv", nz: 1, top: N, d: [["B1sw", 2.4, "o"]] },
      { id: "B1sw", c: "B1", n: "Đọc mở và kệ (cánh Nam, Tây)", r: R(12, 71, 21.5, 85), ctl: "tv", nz: 1, top: N, d: [["B2", 1.6, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: R(21.5, 71, 33, 85), ctl: "tv", nz: 0, seat: 40, top: N, d: [["H6", 1.6, "p"]] },
      { id: "STS", n: "Thang bộ + thang máy thư viện Nam", r: R(33, 71, 38, 78), ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" }, d: [["H6", 1.4, "thang"]] },
      { id: "H6", c: "circ", n: "Sảnh thang Nam", r: R(33, 78, 38, 81), ctl: "tv", nz: 1, d: [["B1e", 1.6, "o"], ["WCL3", 1.0, "p"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện cánh Nam", r: R(33, 81, 38, 83.4), ctl: "tv", nz: 1, wc: KT },
      { id: "KBS", c: "circ", n: "Tủ gửi sách khu yên tĩnh", r: R(33, 83.4, 38, 85), ctl: "tv", nz: 1, d: [["B2", 0.9, "p"]] },
      { id: "B1e", c: "B1", n: "Đọc mở nhìn sông", r: R(38, 71, 41, 85), ctl: "tv", nz: 1, top: N }
    ],
    staff: [
      { x: 21, y: 20.8, t: "Đón khách sự kiện", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH2", code: "H.2", name: "Hộp lớn ven sông, hộp nhỏ ven phố, hộp màu cài vào", from: "hộp xếp",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 9, 13.3, 16.5, 21.5, 27.3, 33, 38, 41], y: [14, 30, 40, 47, 54, 62.5, 71, 78, 85] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 43.5], [5.2, 43.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [41, 98], [41, 35], [27.5, 35], [27.5, 30.8]], [[26, -6], [26, 15.2]]],
        event: [[[20, -9], [26, 3], [26, 15.2]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông lên hiên kính, hoặc từ quảng trường Bắc, đều vào sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc vào sảnh đón tiếp, rẽ Tây vào phòng đa năng" },
      hatch: [COURT],
      labels: [[30, 67, "Vườn thiếu nhi (tường bao)"], [14.5, 22, "Hộp đỏ sự kiện"], [28.5, 23, "Hiên kính đón tiếp"], [24, 44, "Cánh Bắc: cụm sách"], [12.7, 62, "Sống Tây: kho đóng"], [26, 81, "Cánh Nam"], [20, 35, "Sân Bắc"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ 10.5 "Hộp lớn ven sông, hộp nhỏ ven phố" và 10.7 "Hộp đá khoét ô lộ hộp màu" mà bạn ghim, không có vỏ bọc, 2 tầng. Hộp đỏ sự kiện nhỏ ở góc phố – Bắc; hộp đá thư viện lớn chữ U ở phía sông – Nam; hiên kính một tầng nối giữa là sảnh đón tiếp chung; hộp xanh cà phê nối dài hiên kính; hộp vàng thiếu nhi cài vào sân khoét của hộp đá.</p>
<p><b>Sửa ngày 05/11 theo góp ý đi lại:</b> bản trước để tiếp nhận, xử lý, kho ở cánh Nam, cách quầy mượn trả gần 90 m. Nay cánh Bắc hộp đá là <b>cụm sách</b>: tiếp nhận → xử lý → quầy gửi đồ, mượn trả nằm liền một dải, lõi sách (thang bộ, thang máy, tời sách) ngay sau quầy, kho đóng chiếm sống Tây sát lõi. Hộp vàng thiếu nhi tựa vào cánh Bắc, mở vườn ra sân phía Nam. Tầng 2 hộp đá là một sàn đọc liền lấy sáng mái răng cưa hướng Bắc.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: chuyển tiếp nhận C4, xử lý C2 lên dải Bắc cánh Bắc, liền quầy gửi đồ A4 (cửa nhân viên thông thẳng); kho đóng C1 vào sống Tây, sát lõi sách có tời; lưu trữ C3 vào dải giữa cánh Bắc; hộp vàng thiếu nhi dời lên tựa vào cánh Bắc, vệ sinh có chỗ thay tã ngay cạnh; cánh Nam tầng 1 thành đọc mở (dải Bắc) và văn phòng, nhân viên, kỹ thuật (dải Nam); tầng 2 gom tra cứu số, học nhóm, đọc mở quanh đỉnh lõi sách, đọc yên tĩnh ở cánh Nam có vệ sinh riêng; tháp thang cam sự kiện dời sang góc Tây để không che cửa sổ phòng xử lý; tách sảnh đón tiếp thành quầy lễ tân và sảnh chia luồng.",
    "Đón tiếp là bản lề: khách vào quầy lễ tân trong hiên kính từ quảng trường Bắc, hoặc vào sảnh chia luồng từ sân. Rẽ Tây là phòng đa năng và thang lên chuyên đề, trưng bày (hộp đỏ); rẽ Đông là cà phê (hộp xanh); đi thẳng hành lang kính 10 m là quầy gửi đồ, mượn trả.",
    "Thang có hệ quả: lõi sách (tím, cánh Bắc) và thang Nam (tím, cánh Nam) chỉ mở vào khu đã qua cổng từ; ở tầng 1 lõi sách có cửa thẻ từ vào hành lang nghiệp vụ để chở sách. Thang sự kiện (tím trong hộp đỏ, tháp cam) chỉ phục vụ hộp đỏ, không có cửa nào sang thư viện. Cửa ra ngoài của khu đọc là cửa thoát hiểm có chuông báo.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý → hành lang nghiệp vụ → kho đóng (12 m) hoặc lõi sách → tời sách lên tầng 2. Sách trả từ quầy mượn trả qua cửa nhân viên vào thẳng phòng xử lý (5 m). Từ kho tới kệ xa nhất khoảng 43 m kể cả đổi tầng.",
    "Vệ sinh: cụm sảnh mở ngoài giờ trong hộp đỏ cạnh quầy lễ tân; vệ sinh sự kiện tầng 2 cạnh thang; trong khu đọc có vệ sinh tầng 1 (thay tã, cạnh thiếu nhi), vệ sinh tầng 2 xếp chồng thẳng lên trên, và vệ sinh cánh Nam cạnh thang Nam.",
    "Ánh sáng Bắc – Nam: tầng 1 cánh Bắc chia dải: dải Bắc có cửa sổ (xử lý, quầy, đọc), dải giữa là lõi, vệ sinh, kho. Hộp vàng sâu 8,5 m quay ra sân phía Nam. Cánh Nam tầng 1 có đọc mở quay Bắc, văn phòng quay Nam. Tầng 2 lấy sáng mái răng cưa hướng Bắc. Mặt Đông, Tây đặc; sân 8,5–10 m, không khối nào che quá 45°.",
    "Tiếng ồn: thiếu nhi tách khỏi phòng đọc bằng lõi, vệ sinh, kho; học nhóm có sảnh và hành lang riêng; đọc yên tĩnh ở tầng 2 cánh Nam, cách học nhóm hơn 17 m, bên dưới là đọc mở và văn phòng; văn phòng cách kỹ thuật bằng kho hồ sơ.",
    "Ngoài giờ: hiên kính, hộp đỏ, cà phê, vệ sinh sảnh mở. Chỉ khóa một cửa: hành lang kính vào quầy gửi đồ. Đường thoát của khu sự kiện không qua cửa khóa.",
    "Kết cấu: các hộp đứng thẳng trên lưới cột, không có phần đua. Phòng đa năng 10,5 × 16 m dùng dầm nhịp 16 m; hộp vàng nhịp 8,5 m.",
    "Bãi xe, đường cứu hỏa giữ như A; xe giao sách chạy lối Tây tới cửa cuốn ở đầu Tây cánh Bắc."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, col } = G.K;
  const box = (p, z1, z2, c, zone, role) => B(p[0][0], p[0][1], p[1][0] - p[0][0], p[2][1] - p[0][1], z1, z2, c, zone, { fl: z2 - z1 > 6 ? 2 : 1, role });
  const coreBox = (id, c, top) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH2", fam: "chot", code: "H.2", from: "hộp xếp", name: "Hộp lớn ven sông, hộp nhỏ ven phố, hộp màu cài vào", rule: "Bất đối xứng cân bằng, hộp màu cài vào hộp đá",
    tag: "Hộp đá thư viện chữ U ven sông, hộp đỏ sự kiện ven phố, hiên kính đón tiếp nối giữa; cánh Bắc hộp đá là cụm sách ngay sau quầy mượn trả",
    story: "Gộp 10.5 và 10.7: một hộp lớn, một hộp nhỏ đặt lệch hai góc, nối bằng hiên kính thấp; hộp lớn bằng đá được khoét một sân, và những hộp màu cài vào chỗ khoét. Không còn lớp vỏ bọc nào: mỗi hộp là một phần nhà thật.",
    why: [["Quy luật hình khối", "Bất đối xứng cân bằng: hộp đỏ nhỏ cao 2 tầng ở góc Tây Bắc đối trọng với hộp đá lớn ở phía Nam; hai hộp màu thấp một tầng cài vào giữa."], ["Khối chính – khối phụ", "Hộp đá thư viện chiếm khoảng 70% sàn; hộp đỏ, hiên kính, hộp xanh, hộp vàng đều nhỏ và thấp hơn."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam; mặt Đông, Tây của mọi hộp đặc. Hộp vàng quay ra sân phía Nam, mái hộp đá che bớt nắng trưa."], ["Gió và mưa", "Sân khoét mở ra sông, đón gió Đông Nam vào vườn thiếu nhi; hiên kính có mái che cho lối vào."], ["Công năng", "Một sảnh đón tiếp duy nhất trong hiên kính chia luồng sang hộp đỏ sự kiện và sang quầy thư viện có cổng từ; ngoài giờ chỉ khóa một cửa."]],
    kc: { he: "Khung bê tông lưới 7–8 m. Phòng đa năng 10,5 × 16 m dùng dầm nhịp 16 m. Hiên kính và hộp xanh là khung thép một tầng. Hộp vàng nhịp 8,5 m tựa vào cánh Bắc.", nhip: "16 m (phòng đa năng)", cx: "Không có phần đua" },
    qa: [["Thủ thư thay sách có phải đi xa?", "Không: tiếp nhận, xử lý, quầy mượn trả nằm liền một dải; kho đóng ở sống Tây sát lõi có tời sách; từ kho lên kệ xa nhất khoảng 43 m kể cả đổi tầng."], ["Hộp vàng thiếu nhi có bị tối?", "Không: hộp vàng quay ra sân phía Nam rộng 8,5 m, góc che tới mái cánh Nam 42°, nhận sáng tán xạ cả ngày."], ["Phòng đa năng có ồn sang thư viện?", "Hộp đỏ cách hộp đá 10 m sân, nối chỉ bằng hiên kính; phía đối diện là phòng xử lý và kho, không phải chỗ đọc."]],
    cut: "Hộp đá: foam xám, cắt chữ U. Hộp đỏ: foam đỏ đất. Hiên kính và hành lang: mica. Hộp xanh cà phê, hộp vàng thiếu nhi: foam màu cao 2,2 cm. Lõi thang tím, tháp cam cao hơn mái 0,8 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 44, 10, "Khối chính · Hộp đá: cụm sách + sàn đọc", 1], [14.5, 22, 10, "Khối phụ · Hộp đỏ sự kiện", 2], [28.5, 23, 5.3, "Hiên kính đón tiếp", 2], [31.5, 19, 5.3, "Hộp xanh cà phê", 2], [29, 58, 5.3, "Hộp vàng thiếu nhi", 2], [11, 33.5, 11.5, "Tháp thang", 2], [19, 50.5, 11.5, "Lõi sách: thang + tời sách"]],
    build() {
      // lõi đặt trước để phép kiểm góc che gặp khối cao trước
      const v = [
        coreBox("CN", "violet", 11.05), coreBox("ST2", "warn", 11.05), coreBox("CS", "violet", 11.05), coreBox("STS", "violet", 9.95),
        box(EV, 0.45, 9.45, "warn", "D", "p"),
        box(P(23, 16, 29, 30), 0.45, 4.95, "glass", "A", "p"), box(P(29, 16, 34, 30), 0.45, 4.95, "accent", "A", "p"), box(EB, 0.45, 4.95, "sheet", "E", "p"),
        box(LK, 0.45, 4.95, "glass", "L", "p"),
        box(NW, 0.45, 9.45, "stone", "B", "m"), box(SP, 0.45, 9.45, "stone", "B", "m"), box(SW, 0.45, 9.45, "stone", "B", "m"),
        box(YB, 0.45, 4.95, "gold", "B", "m"),
        // tường bao vườn thiếu nhi
        B(19.5, 70.7, 19.5, 0.3, 0, 1.4, "stone", "X", { role: "p" }), B(38.7, 62.5, 0.3, 8.2, 0, 1.4, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14.5, 23]) for (const y of [14, 22, 30]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [9, 16.5, 23, 30, 38]) for (const y of [40, 47, 54]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [12, 19.5, 27, 34, 41]) for (const y of [71, 78, 85]) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
