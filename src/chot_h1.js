/* ================= Ý tưởng H.1: Ba thanh kéo lệch (hộp xếp chồng, phát triển từ 10.3) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba chồng hộp nằm ngang Đông – Tây, mỗi chồng hai hộp; hộp trên kéo lệch 3 m như ngăn kéo mở hờ
  const R = (x0, y0, x1, y1) => [x0, y0, x1 - x0, y1 - y0];
  const P = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const LN = P(6, 14, 38, 30), UN = P(21.25, 14, 41, 30), TW = P(38, 14, 41, 23);   // chồng Bắc: sảnh, sự kiện; hộp trên ngắn, kéo ra phía sông
  const LK = [[18, 30], [21, 30], [21.5, 40], [18.5, 40]];                            // hành lang kính một tầng: đón tiếp → quầy gửi đồ, mượn trả
  const LM = P(6, 40, 38, 64), UM = P(9, 43, 41, 67);                                 // chồng giữa: hộp dưới là cụm sách (nghiệp vụ, kho, lõi sách, quầy); hộp trên trượt 3 m ra sông và 3 m về Nam
  const BR = P(13, 67, 16, 78);                                                     // cầu kính tầng 2 sang chồng Nam
  const LS = P(9, 80, 36, 88), US = P(7, 78, 36, 88);                                 // chồng Nam: hộp dưới là văn phòng, nhân viên; hộp trên đọc yên tĩnh, kéo lệch về phía phố
  const TE = P(38, 57, 41, 63);                                                      // tháp thang thoát hiểm Đông, đỡ góc hộp trên đua ra sông
  const GARDEN = P(18, 64, 38, 75);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [LN, TW, LK, LM, TE, LS],
    rooms: [
      // chồng Bắc tầng 1: sảnh đón tiếp là bản lề; phía Tây chuyên đề và vệ sinh, phía Đông trưng bày và cà phê
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: R(6, 14, 16, 21), ctl: "sk", nz: 2, seat: 24, d: [["FOY", 1.6, "p", 0.6], ["A1n", 1.2, "p", 0.5]] },
      { id: "FOY", c: "circ", n: "Sảnh phụ khu chuyên đề", r: R(6, 21, 16, 23), ctl: "sk", nz: 2, d: [["A1", 1.6, "o"], ["W", 1.2, "tn"]] },
      { id: "WC1", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: R(6, 23, 9, 30), ctl: "sk", nz: 1, wc: KT, d: [["FOY", 1.2, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: R(9, 23, 11.9, 30), ctl: "nv", nz: 1, d: [["FOY", 0.9, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: R(13.8, 23, 16, 30), ctl: "nv", nz: 1, d: [["A1", 0.9, "nv", 0.3]] },
      { id: "KD4", c: "circ", n: "Kho đồ dùng chuyên đề", r: R(11.9, 23, 13.8, 30), ctl: "sk", nz: 1, d: [["FOY", 0.9, "p"]] },
      { id: "A1", c: "A1", n: "Đón tiếp: sảnh chia luồng, tủ thông tin", r: R(16, 22, 21.25, 30), ctl: "sk", nz: 2, occ: 20, d: [["S", 1.6, "tudong", 0.2], ["LK", 2.4, "o"], ["COR1", 1.8, "o"], ["A1n", 3, "o"]] },
      { id: "A1n", c: "A1", n: "Đón tiếp: quầy lễ tân, chỗ chờ", r: R(16, 14, 21.25, 22), ctl: "sk", nz: 2, seat: 20, occ: 20, d: [["N", 2.4, "chinh", 0.5]] },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Bắc)", r: R(21.25, 14, 34.6, 21), ctl: "sk", nz: 2, occ: 30, d: [["COR1", 3, "o", 0.4]] },
      { id: "KA2", c: "circ", n: "Kho trưng bày", r: R(34.6, 14, 38, 21), ctl: "sk", nz: 1, d: [["A2", 0.9, "p"]] },
      { id: "COR1", c: "circ", n: "Hành lang trưng bày", r: R(21.25, 21, 38, 23), ctl: "sk", nz: 2 },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: R(21.25, 23, 25.15, 30), ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["A1", 1.4, "thang"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: R(25.15, 23, 35.15, 30), ctl: "sk", nz: 3, seat: 32, d: [["COR1", 2.4, "o"], ["S", 1.8, "tudong", 0.6]] },
      { id: "A3k", c: "circ", n: "Quầy pha chế, rửa", r: R(35.15, 23, 38, 30), ctl: "sk", nz: 2, d: [["A3", 1.2, "p"], ["COR1", 0.9, "p"]] },
      { id: "ST2", n: "Tháp thang Đông (sự kiện)", r: R(38, 14, 41, 23), ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["N", 1.2, "tn"]] },
      { id: "LK", c: "circ", n: "Hành lang kính sang quầy thư viện", p: LK, ctl: "sk", nz: 2 },
      // chồng giữa tầng 1, dải Bắc: tiếp nhận → xử lý → quầy gửi đồ, mượn trả nằm liền nhau
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: R(6, 40, 9.75, 48), ctl: "nv", nz: 1, d: [["W", 2.6, "cuon", 0.4], ["W", 1.0, "nv", 0.88], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: R(9.75, 40, 18.5, 48), ctl: "nv", nz: 1, d: [["C1", 1.4, "nv"], ["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: R(18.5, 40, 26.75, 43.64), ctl: "tv", ctrl: 1, nz: 2, d: [["LK", 2.2, "k"], ["HL", 2.4, "o"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: R(18.5, 43.64, 26.75, 48), ctl: "tv", nz: 1, d: [["B1b", 2.4, "o"], ["LC", 1.6, "o"]] },
      { id: "B1b", c: "B1", n: "Sách mới, báo (quay Bắc)", r: R(26.75, 40, 31.75, 48), ctl: "tv", nz: 1, d: [["B6", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: R(31.75, 40, 38, 48), ctl: "tv", nz: 1, steps: 4, d: [["E", 1.2, "tnbd", 0.7]] },
      // dải giữa (không cần cửa sổ): kho đóng sát lõi sách, vệ sinh, kho xe sách
      { id: "C1", c: "C1", n: "Kho đóng (sát lõi sách)", r: R(6, 48, 21, 56), ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: R(21, 48, 25, 56), ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: R(25, 48, 28.75, 56), ctl: "tv", nz: 1, d: [["B3", 1.8, "p"], ["KX", 1.2, "p"]] },
      { id: "KX", c: "circ", n: "Kho xe đẩy, sách chờ lên kệ", r: R(28.75, 48, 38, 52), ctl: "tv", nz: 1 },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện tầng 1, thiếu nhi, thay tã", r: R(28.75, 52, 31.75, 56), ctl: "tv", nz: 1, wc: KT + " · trẻ em · thay tã", d: [["LC", 1.0, "p"], ["B3", 0.9, "p"]] },
      { id: "KX2", c: "circ", n: "Kho đồ chơi, sách thiếu nhi", r: R(31.75, 52, 38, 56), ctl: "tv", nz: 1, d: [["B3", 1.2, "p"]] },
      // dải Nam (dưới phần hộp trên đua ra 3 m): lưu trữ, thang Tây, thiếu nhi
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: R(6, 56, 11, 64), ctl: "kho", nz: 1, d: [["HS2", 1.0, "nv"]] },
      { id: "HS2", c: "circ", n: "Hành lang kho", r: R(11, 56, 12.9, 64), ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["STS", 1.0, "nv"]] },
      { id: "STS", n: "Thang bộ + thang máy thư viện Tây", r: R(12.9, 56, 16, 64), ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" }, d: [["S", 1.2, "tnbd"]] },
      { id: "STE", n: "Tháp thang thoát hiểm Đông (thư viện)", r: R(38, 57, 41, 63), ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["E", 1.2, "tnbd"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (quay Nam, ra vườn)", r: R(16, 56, 38, 64), ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
      // chồng Nam tầng 1: văn phòng, phòng nhân viên, kỹ thuật (khu nhân viên, thẻ từ)
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: R(9, 80, 16, 88), ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["S", 1.2, "nv"]] },
      { id: "KC", c: "circ", n: "Kho hồ sơ (đệm cách âm, dưới cầu kính)", r: R(16, 80, 18, 88), ctl: "nv", nz: 1, d: [["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: R(18, 80, 23, 88), ctl: "nv", nz: 1, d: [["N", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: R(23, 80, 33, 88), ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"], ["S", 1.0, "nv"]] },
      { id: "STQ", n: "Thang thoát hiểm khu đọc yên tĩnh", r: R(33, 80, 36, 88), ctl: "tv", nz: 1, core: { st: "u", link: "STQ" }, d: [["E", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 18.6, y: 20, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 22.6, y: 41.8, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 13, y: 26.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36.6, y: 26.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 60, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 14, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.9, y: 44, t: "Nhận sách", sc: ["4"] },
      { x: 28, y: 84, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [UN, UM, BR, US],
    rooms: [
      // hộp sự kiện tầng 2: phòng đa năng lấy sáng hai mặt Bắc – Nam, không có cửa nào sang thư viện
      { id: "WC2", c: "E5", n: "Vệ sinh khu sự kiện", r: R(21.25, 14, 25.15, 18.1), ctl: "sk", nz: 1, wc: KT, d: [["FOYM", 1.0, "p"]] },
      { id: "FOYM", c: "circ", n: "Sảnh chờ sự kiện", r: R(21.25, 18.1, 25.15, 23), ctl: "sk", nz: 2, occ: 40 },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: R(21.25, 23, 25.15, 30), ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOYM", 1.4, "thang"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: R(25.15, 14, 35.4, 30), ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["FOYM", 2.4, "p"], ["CN", 1.4, "thang"], ["AV", 0.9, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: R(35.4, 14, 38, 23.6), ctl: "sk", nz: 3, d: [["D1", 4, "o"], ["ST2", 1.2, "thang"]] },
      { id: "AV", c: "circ", n: "Phòng điều khiển âm thanh", r: R(35.4, 23.6, 38, 30), ctl: "sk", nz: 2 },
      { id: "ST2", n: "Tháp thang Đông (sự kiện)", r: R(38, 14, 41, 23), ctl: "sk", nz: 1, core: { st: "u", link: "ST2" } },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: R(38, 23, 41, 30), ctl: "sk", nz: 1, d: [["AV", 1.2, "p"]] },
      // hộp đọc giữa tầng 2 (trượt 3 m), lấy sáng mái răng cưa hướng Bắc: mọi phòng quây quanh đỉnh lõi sách
      { id: "B5", c: "B5", n: "Tra cứu số", r: R(9, 43, 21, 51.3), ctl: "tv", nz: 1, seat: 16, top: N, d: [["H1", 2.0, "o"]] },
      { id: "H1", c: "circ", n: "Sảnh lõi sách tầng 2", r: R(21, 43, 31.75, 48), ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B1c", 2.4, "o"], ["H3", 1.6, "o"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: R(31.75, 43, 36.4, 48.4), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: R(36.4, 43, 41, 48.4), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: R(31.75, 48.4, 41, 50), ctl: "tv", nz: 2, d: [["H3", 1.2, "o"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: R(31.75, 50, 36.4, 55.4), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: R(36.4, 50, 41, 55.4), ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] },
      { id: "H4", c: "circ", n: "Dải tủ sách đệm (cách âm học nhóm)", r: R(31.75, 55.4, 41, 57), ctl: "tv", nz: 1, d: [["B1z", 1.6, "o", 0.85]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: R(21, 48, 25, 56), ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1x", 1.4, "thang"]] },
      { id: "B1c", c: "B1", n: "Đọc mở quanh lõi sách", r: R(25, 48, 28.75, 56), ctl: "tv", nz: 1, top: N, d: [["B1y", 2.4, "o"]] },
      { id: "H3", c: "circ", n: "Sảnh học nhóm", r: R(28.75, 48, 31.75, 52), ctl: "tv", nz: 1, d: [["WCL2", 1.0, "p"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: R(28.75, 52, 31.75, 56), ctl: "tv", nz: 1, wc: KT },
      { id: "H5", c: "circ", n: "Sảnh thang Tây", r: R(12.9, 51.3, 16, 56), ctl: "tv", nz: 1, d: [["B1w", 1.6, "o"], ["B1x", 1.6, "o"], ["B5", 1.6, "o"]] },
      { id: "B1w", c: "B1", n: "Kệ mở và bàn đọc dọc tường Tây", r: R(9, 51.3, 12.9, 67), ctl: "tv", nz: 1, top: N },
      { id: "STS", n: "Thang bộ + thang máy thư viện Tây", r: R(12.9, 56, 16, 64), ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" }, d: [["H5", 1.2, "thang"], ["BRL", 1.2, "thang"]] },
      { id: "B1x", c: "B1", n: "Đọc mở và kệ (Tây)", r: R(16, 51.3, 21, 67), ctl: "tv", nz: 1, top: N, d: [["B1y", 2.4, "o"], ["BRL", 1.6, "o"]] },
      { id: "B1y", c: "B1", n: "Đọc mở và kệ (giữa, nhìn Nam)", r: R(21, 56, 31.75, 67), ctl: "tv", nz: 1, top: N, d: [["B1z", 2.4, "o"]] },
      { id: "B1z", c: "B1", n: "Đọc mở và kệ (nhìn sông)", r: R(31.75, 57, 38, 67), ctl: "tv", nz: 1, top: N, d: [["B1z2", 1.6, "o"]] },
      { id: "STE", n: "Tháp thang thoát hiểm Đông (thư viện)", r: R(38, 57, 41, 63), ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["H4", 1.2, "thang"], ["B1z", 1.2, "thang"]] },
      { id: "B1z2", c: "B1", n: "Góc đọc nhìn sông", r: R(38, 63, 41, 67), ctl: "tv", nz: 1, top: N },
      { id: "BRL", c: "circ", n: "Sảnh cầu kính", r: R(12.9, 64, 16, 67), ctl: "tv", nz: 1, d: [["B1w", 1.4, "o"], ["BR", 2.4, "o"]] },
      { id: "BR", c: "circ", n: "Cầu kính sang hộp đọc yên tĩnh", p: BR, ctl: "tv", nz: 1, d: [["LB2", 2.4, "o"]] },
      // hộp đọc Nam tầng 2 (kéo lệch về phố): đọc yên tĩnh, đọc tài liệu địa phương, xa mọi chỗ ồn
      { id: "B1s", c: "B1", n: "Đọc tài liệu địa phương", r: R(7, 78, 13, 88), ctl: "tv", nz: 1, top: N, d: [["LB2", 1.6, "o", 0.85]] },
      { id: "LB2", c: "circ", n: "Sảnh đọc yên tĩnh", r: R(13, 78, 18, 84), ctl: "tv", nz: 1, d: [["B2", 1.6, "p", 0.8], ["WCS", 0.9, "p"], ["KBS", 0.9, "p"]] },
      { id: "WCS", c: "E5", n: "Vệ sinh khu đọc yên tĩnh", r: R(13, 84, 15.5, 88), ctl: "tv", nz: 1, wc: KT },
      { id: "KBS", c: "B1", n: "Góc đọc tra cứu nhanh", r: R(15.5, 84, 18, 88), ctl: "tv", nz: 1, top: N },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: R(18, 78, 33, 88), ctl: "tv", nz: 0, seat: 40, top: N, d: [["STQ", 1.2, "thang"]] },
      { id: "STQ", n: "Thang thoát hiểm khu đọc yên tĩnh", r: R(33, 78, 36, 88), ctl: "tv", nz: 1, core: { st: "u", link: "STQ" } }
    ],
    staff: [
      { x: 27, y: 45.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 23.2, y: 20.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 36.7, y: 27, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH1", code: "H.1", name: "Ba thanh kéo lệch", from: "hộp xếp",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 9.75, 18.5, 26.75, 31.75, 38, 41], y: [14, 30, 40, 48, 56, 64, 67, 78, 88] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 44], [5.2, 44]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [41, 98], [41, 35], [19.5, 35], [18.6, 30.8]], [[18.6, -6], [18.6, 13.2]]],
        event: [[[20, -9], [18.6, 3], [18.6, 13.2]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông vào sân Bắc, hoặc từ quảng trường Bắc, đều vào sảnh đón tiếp rồi qua hành lang kính tới quầy gửi đồ", event: "Khách sự kiện: quảng trường Bắc vào sảnh đón tiếp, lên thang tím" },
      hatch: [GARDEN],
      labels: [[28, 70, "Vườn thiếu nhi có tường bao"], [12, 35, "Sân Bắc"], [8, 72, "Sân Nam"], [27, 22, "Chồng Bắc: sảnh, sự kiện"], [22, 52, "Chồng giữa: cụm sách + đọc"], [22, 84, "Chồng Nam: nhân viên, đọc yên tĩnh"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ ý tưởng 10.3 "Ba tầng đọc kéo lệch" mà bạn ghim: ba chồng hộp chữ nhật nằm ngang Đông – Tây, mỗi chồng hai hộp, hộp trên kéo lệch so với hộp dưới như ngăn kéo mở hờ (chồng Bắc kéo ra sông, chồng giữa kéo 3 m ra sông và 3 m về Nam, chồng Nam kéo về phố). Không có hộp bọc ngoài, 2 tầng, mỗi hộp một vật liệu; thang là khối tím, cam nhô khỏi mái.</p>
<p><b>Sửa ngày 05/11 theo góp ý đi lại:</b> bản trước để kho, xử lý, tiếp nhận ở chồng Nam, cách quầy mượn trả gần 80 m. Nay hộp dưới chồng giữa là <b>cụm sách</b>: tiếp nhận → xử lý → kho đóng → lõi sách (thang bộ, thang máy, tời sách) nằm liền nhau, quầy gửi đồ, mượn trả có cửa nhân viên thông thẳng vào phòng xử lý. Sàn đọc tầng 2 quây quanh đỉnh lõi sách. Chồng Nam thành văn phòng, nhân viên, kỹ thuật ở tầng 1 và đọc yên tĩnh ở tầng 2.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: chuyển tiếp nhận C4, xử lý C2, kho đóng C1, lưu trữ C3 từ chồng Nam sang hộp dưới chồng giữa, ngay sau quầy gửi đồ, mượn trả; thêm tời sách vào lõi tím giữa; thiếu nhi chuyển xuống dải Nam chồng giữa, ra vườn có tường bao; học nhóm có hành lang và dải tủ đệm riêng; đọc yên tĩnh lên hộp trên chồng Nam, có thang thoát hiểm riêng; văn phòng, phòng nhân viên, kỹ thuật xuống hộp dưới chồng Nam; thêm tháp thang thoát hiểm Đông đỡ góc hộp trên chồng giữa; tách sảnh đón tiếp thành quầy lễ tân (phía quảng trường) và sảnh chia luồng (phía sân).",
    "Đón tiếp là bản lề: khách vào quầy lễ tân từ quảng trường Bắc hoặc vào sảnh chia luồng từ sân. Từ sảnh chia luồng: rẽ Tây vào chuyên đề và vệ sinh sảnh, rẽ Đông qua trưng bày tới cà phê, lên thang tím tới phòng đa năng, hoặc đi thẳng hành lang kính 10 m tới quầy gửi đồ, mượn trả.",
    "Thang có hệ quả: thang tím giữa (lõi sách) và thang tím Tây chỉ mở vào khu đã qua cổng từ; thang Tây ở tầng 1 chỉ có cửa thẻ từ vào hành lang kho và cửa thoát hiểm có chuông. Hai tháp thang cam (Đông và khu đọc yên tĩnh) chỉ có cửa thoát hiểm có chuông ra ngoài. Thang sự kiện chỉ phục vụ chồng Bắc, không có cửa nào sang thư viện.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý (4 m) → kho đóng → lõi sách → tời sách lên tầng 2, quầy mượn trả cách phòng xử lý 5 m qua cửa nhân viên. Từ kho tới kệ xa nhất khoảng 40 m, kể cả đổi tầng.",
    "Vệ sinh: cụm sảnh mở ngoài giờ cạnh quầy lễ tân; vệ sinh sự kiện cạnh phòng đa năng tầng 2; trong khu đọc có vệ sinh tầng 1 (cạnh thiếu nhi, có chỗ thay tã) và vệ sinh tầng 2 xếp chồng thẳng lên trên, cạnh lõi sách; khu đọc yên tĩnh có vệ sinh riêng ở đầu cầu kính.",
    "Ánh sáng Bắc – Nam: hộp dưới sâu 16 m hoặc chia ba dải (Bắc có cửa sổ, giữa là kho, lõi, vệ sinh, Nam có cửa sổ); hộp trên là tầng trên cùng, lấy sáng mái răng cưa hướng Bắc. Đầu Đông, đầu Tây đặc. Sân giữa các chồng 10–14 m, không hộp nào che hộp nào quá 45°; phần hộp trên đua ra 3 m làm ô văng.",
    "Tiếng ồn: thiếu nhi ở tầng 1 dải Nam, cách phòng đọc bằng kho, lõi, hành lang; học nhóm có hành lang riêng và dải tủ sách đệm; đọc yên tĩnh ở hộp Nam tầng 2, cách học nhóm, phòng đa năng hơn 20 m qua sân; không phòng ồn nào nằm trên hoặc dưới đọc yên tĩnh, phòng đa năng.",
    "Ngoài giờ: sảnh, chuyên đề, trưng bày, cà phê, vệ sinh sảnh và hộp sự kiện tầng 2 mở. Chỉ khóa một cửa: hành lang kính vào quầy gửi đồ. Cửa khóa không nằm trên đường thoát của khu sự kiện.",
    "Kết cấu: mọi phần hộp trên đua ra không quá 3 m; góc Đông Nam hộp trên chồng giữa tựa lên tháp thang cam; cầu kính nhịp 11 m tựa hai đầu lên hai hộp.",
    "Bãi xe, đường cứu hỏa giữ như A; xe giao sách chạy lối Tây tới cửa cuốn ở đầu Tây chồng giữa."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, PO, col } = G.K;
  const box = (p, z1, z2, c, zone, role) => B(p[0][0], p[0][1], p[1][0] - p[0][0], p[2][1] - p[0][1], z1, z2, c, zone, { fl: 1, role });
  const coreBox = (id, c, top) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH1", fam: "chot", code: "H.1", from: "hộp xếp", name: "Ba thanh kéo lệch", rule: "Hộp chồng hộp, hộp trên kéo lệch như ngăn kéo",
    tag: "Ba chồng hộp nằm ngang, hộp trên kéo lệch 3 m; hộp dưới chồng giữa là cụm sách: tiếp nhận, xử lý, kho, lõi sách ngay sau quầy mượn trả",
    story: "Lấy lại 10.3: các sàn đọc là những hộp chồng lên nhau, hộp trên trượt ra như ngăn kéo. Bỏ vỏ bọc, giữ 2 tầng, nhân thành ba chồng song song cách nhau bằng sân. Chồng Bắc là sảnh và sự kiện; chồng giữa là trái tim thư viện: dưới là cụm sách quanh lõi tời sách, trên là sàn đọc lớn; chồng Nam là nhân viên ở dưới, đọc yên tĩnh ở trên.",
    why: [["Quy luật hình khối", "Hộp chồng hộp, lệch theo nhịp: Bắc kéo ra sông, giữa kéo ra sông và về Nam, Nam kéo về phố. Mỗi hộp một vật liệu: trắng, đỏ đất, đá, gỗ, vàng đất."], ["Khối chính – khối phụ", "Chồng giữa và chồng Nam là thư viện, chiếm hơn 70% sàn; chồng Bắc có hộp trên ngắn hơn, nên nhỏ hơn hẳn."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam; phần đua 3 m của hộp trên là ô văng che nắng cho tầng dưới. Đầu hồi Đông, Tây đặc."], ["Gió và mưa", "Hai sân giữa ba chồng mở ra sông, đón gió Đông Nam. Phần đua che mưa cho lối đi dọc mặt hộp."], ["Công năng", "Một sảnh đón tiếp duy nhất chia luồng sang sự kiện và sang quầy thư viện có cổng từ; ngoài giờ chỉ khóa một cửa."]],
    kc: { he: "Khung bê tông lưới 8 m; mỗi hộp trên tựa lên hàng cột của hộp dưới, đua 3 m bằng dầm công xôn. Phòng đa năng 10 × 16 m dùng dầm nhịp 16 m. Cầu kính dầm thép nhịp 10 m.", nhip: "16 m (phòng đa năng)", cx: "Đua 3 m, không cần cột chống" },
    qa: [["Thủ thư thay sách có phải đi xa?", "Không: tiếp nhận, xử lý, kho đóng nằm liền nhau ngay sau quầy mượn trả, sát lõi có tời sách; từ kho lên kệ xa nhất khoảng 40 m kể cả đổi tầng."], ["Hộp trên đua 3 m có cần cột không?", "Không: 3 m nằm trong tầm dầm công xôn bê tông; góc Đông Nam hộp đọc còn tựa lên tháp thang cam."], ["Đọc yên tĩnh có bị ồn?", "Không: ở hộp trên chồng Nam, cách học nhóm và phòng đa năng hơn 20 m qua sân, bên dưới là văn phòng và kỹ thuật, không phải phòng ồn."]],
    cut: "Chín khối foam theo màu: chồng Bắc trắng dưới, đỏ đất trên; chồng giữa đá dưới, gỗ trên; chồng Nam trắng dưới, vàng đất trên. Hộp trên dán lệch 1,5 cm. Lõi thang tím, cam cao hơn mái 0,8 cm. Hành lang và cầu kính bằng mica.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[31, 22, 10, "Khối phụ · Hộp sự kiện kéo ra sông", 2], [25, 55, 10, "Khối chính · Sàn đọc trên cụm sách", 1], [22, 83, 10, "Khối chính · Hộp đọc yên tĩnh", 1], [20, 35, 4.5, "Hành lang kính", 2], [28, 70, 0.6, "Vườn thiếu nhi", 2], [16.5, 72, 9.4, "Cầu kính", 2], [23, 52, 11.5, "Lõi sách: thang + tời sách"]],
    build() {
      // lõi và hộp trên đặt trước hộp dưới để phép kiểm góc che gặp khối cao trước
      const v = [
        coreBox("CN", "violet", 11.05), coreBox("ST2", "warn", 11.05), coreBox("CS", "violet", 11.05), coreBox("STS", "violet", 11.05),
        coreBox("STE", "warn", 11.05), coreBox("STQ", "warn", 11.05),
        box(UN, 4.95, 9.45, "warn", "D", "p"), box(UM, 4.95, 9.45, "deck", "B", "m"), box(US, 4.95, 9.45, "gold", "B", "m"),
        box(BR, 4.95, 8.95, "glass", "L", "p"),
        box(LN, 0.45, 4.95, "sheet", "A", "p"), PO(LK, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        box(LM, 0.45, 4.95, "stone", "B", "m"), box(LS, 0.45, 4.95, "sheet", "E", "p"),
        // tường bao vườn thiếu nhi
        B(18, 74.7, 20, 0.3, 0, 1.4, "stone", "X", { role: "p" }), B(37.7, 64, 0.3, 10.7, 0, 1.4, "stone", "X", { role: "p" }), B(18, 64, 0.3, 10.7, 0, 1.4, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38]) for (const y of [14, 22, 30]) st.push(col(x, y, 0.45, x >= 22 ? 9.45 : 4.95));
      for (const x of [6, 14, 22, 30, 38]) for (const y of [40, 48, 56, 64]) st.push(col(x, y, 0.45, x >= 9 ? 9.45 : 4.95));
      for (const x of [9, 17, 25, 33]) for (const y of [80, 88]) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
