/* ================= Ý tưởng X.2: Giữ chỗ từng khối, sửa giao thông (từ bản xếp của bạn, 07/11/2026) ================= */
(function (G) {
  // giữ nguyên vị trí và tầng của các khối trong bản xếp; chỉ dời ≤ 2 m, thêm hành lang vào khe hở, gom thang, đổi chỗ vài phòng cho đúng logic
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const R = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  // vỏ tầng 1: khối sự kiện Bắc, nhánh cà phê, dải giữa (đón tiếp), cánh Tây thư viện, dải thiếu nhi, dải nhân viên Nam
  const E1a = R(6, 16, 19.5, 11.6), E1b = R(25.5, 16, 14, 10.5), E1c = R(28.5, 26.5, 11, 13);
  const E1d = R(6, 39.5, 15.5, 8.5), E1e = R(21.5, 39.5, 8.5, 9), E1f = R(30, 39.5, 11, 8.5);
  const E1g = R(6, 48, 14, 32.4), E1h = R(20, 67.5, 19.5, 12.9), E1i = R(6, 80.4, 33.5, 8.4);
  // vỏ tầng 2: cánh Tây đọc, lõi thang, khối đọc trên sảnh, hành lang trên sân, nhánh học nhóm, cầu nối, thanh đọc Nam
  const E2a = R(4, 39.5, 10, 31.5), E2b = R(6, 71, 8, 9.4), E2c = R(14, 39.5, 4, 19), E2c2 = R(14, 67.5, 4, 12.9), E2d = R(18, 39.5, 11.5, 8.5), E2e = R(18, 48, 2, 10.5), E2b6 = R(14, 58.5, 6, 9), E2f = R(18, 67.5, 21.5, 8.5), E2g = R(35.5, 76, 4, 4.4), E2h = R(6, 80.4, 33.5, 8.4);
  const COURT = R(20, 48.5, 21.5, 19), CN = R(6, 27.6, 22.5, 11.9), GARDEN = R(31, 60, 8.5, 7.5);

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [E1a, E1b, E1c, E1d, E1e, E1f, E1g, E1h, E1i],
    rooms: [
      // khối sự kiện phía Bắc (giữ đúng chỗ D1, D2, D3, D4 của bản xếp)
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6, 16, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 21, 4, 6.6], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 15.5, 11.6], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.8], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [25.5, 16, 9.5, 7.5], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn quảng trường)", r: [35, 16, 2, 7.5], ctl: "nv", nz: 1, top: N, d: [["CO3", 0.9, "nv"], ["N", 0.9, "nv"]] },
      { id: "KCF", c: "circ", n: "Kho, chuẩn bị cà phê", r: [37, 16, 2.5, 7.5], ctl: "sk", nz: 1, d: [["CO3", 0.9, "p"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [25.5, 23.5, 14, 3], ctl: "sk", nz: 2, occ: 40, d: [["FOYA", 2.4, "o"], ["E", 1.6, "tn"]] },
      // nhánh cà phê, vệ sinh công cộng (bản xếp: FOYA, A3)
      { id: "FOYA", c: "circ", n: "Hành lang trưng bày, sự kiện", r: [28.5, 26.5, 3.5, 13], ctl: "sk", nz: 2, d: [["A3", 1.8, "o"], ["WCP", 1.2, "p"], ["A1", 1.2, "o"], ["A2", 1.6, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32, 26.5, 7.5, 10], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.2, "tn", 0.5]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [32, 36.5, 7.5, 3], ctl: "sk", nz: 1, wc: KT },
      // dải giữa: xử lý nghiệp vụ, thang Bắc, quầy giữ đồ mượn trả, sảnh đón tiếp, trưng bày (giữ chỗ A1, A2 của bản xếp)
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 39.5, 8, 8.5], ctl: "nv", nz: 1, d: [["HLn", 0.9, "nv"], ["SCn", 0.9, "nv"], ["C4", 1.2, "nv"]] },
      { id: "STN", n: "Thang bộ thư viện Bắc", r: [14, 39.5, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["A4", 1.4, "thang"]] },
      { id: "HLn", c: "circ", n: "Lối nhân viên quầy ↔ xử lý", r: [14, 45.5, 4, 2.5], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [18, 39.5, 3.5, 8.5], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 1.6, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [21.5, 39.5, 8.5, 9], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.5], ["N", 2.0, "chinh", 0.4], ["A4", 2.0, "k"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [30, 39.5, 11, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["S", 1.4, "tn", 0.7]] },
      // cánh Tây: chuỗi kho nghiệp vụ áp lối Tây
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 48, 4, 7.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85]] },
      { id: "SCn", c: "circ", n: "Lối nhân viên kho", r: [10, 48, 4, 4], ctl: "nv", nz: 1, d: [["C1a", 0.9, "nv"]] },
      { id: "C1a", c: "C1", n: "Kho đóng (cửa lõi sách)", r: [10, 52, 4, 3.5], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"], ["C1b", 1.6, "nv"]] },
      { id: "C1b", c: "C1", n: "Kho đóng", r: [6, 55.5, 8, 13], ctl: "kho", nz: 1, d: [["KCh", 0.9, "nv"]] },
      { id: "KCh", c: "circ", n: "Kho chung, xe sách tầng 1", r: [6, 68.5, 8, 5], ctl: "kho", nz: 1, d: [["SCw", 0.9, "nv"]] },
      { id: "SCw", c: "circ", n: "Sảnh nhân viên Tây", r: [6, 73.5, 8, 6.9], ctl: "nv", nz: 1, d: [["W", 1.2, "tn", 0.5], ["STE2", 1.0, "nv"], ["E1", 0.9, "nv"], ["SCSa", 1.2, "o"]] },
      // lõi thang, vệ sinh và hành lang thư viện dọc sân
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [14, 48, 4, 3.5], ctl: "tv", nz: 1, wc: KT, d: [["HL", 1.0, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [14, 51.5, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"]] },
      { id: "KHL", c: "circ", n: "Kho xe sách, sách chờ lên kệ", r: [14, 58.5, 4, 9], ctl: "tv", nz: 1, d: [["HL", 0.9, "p"]] },
      { id: "LS", n: "Thang bộ + thang máy Nam", r: [14, 67.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "LS" }, d: [["HL", 1.4, "thang"]] },
      { id: "HL", c: "circ", n: "Hành lang thư viện dọc sân", r: [18, 48, 2, 27.5], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.3], ["B3", 1.8, "p"], ["HLs", 1.6, "o"]] },
      { id: "HLs", c: "circ", n: "Sảnh thư viện Nam", r: [14, 75.5, 6, 2.9], ctl: "tv", nz: 1, d: [["SCSa", 0.9, "nv"]] },
      { id: "SCSa", c: "circ", n: "Hành lang nhân viên", r: [14, 78.4, 6, 2], ctl: "nv", nz: 1, d: [["SCSb", 1.2, "o"]] },
      // dải thiếu nhi: giữ chỗ B3 của bản xếp, mở ra vườn trong sân
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra vườn trong sân)", r: [20, 67.5, 19.5, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["WCB", 1.0, "p"], ["KDT", 1.2, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [20, 76, 5.5, 2.4], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy, sách thiếu nhi", r: [25.5, 76, 14, 2.4], ctl: "tv", nz: 1 },
      { id: "SCSb", c: "circ", n: "Hành lang nhân viên Nam", r: [20, 78.4, 19.5, 2], ctl: "nv", nz: 1, d: [["E2", 0.9, "nv"], ["LC", 1.2, "o"], ["E4", 1.2, "nv"], ["E6", 0.9, "nv"], ["STE3", 1.0, "nv"]] },
      // dải nhân viên Nam (bản xếp: E1, E2, E4, C3, E3; đã đổi chỗ E4 để không sát vách E2)
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, 80.4, 3, 8.4], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [9, 80.4, 9.5, 8.4], ctl: "nv", nz: 0, d: [["SCSa", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [18.5, 80.4, 5, 8.4], ctl: "nv", nz: 1 },
      { id: "LC", c: "circ", n: "Sảnh nhân viên, lối từ bãi xe", r: [23.5, 80.4, 3, 8.4], ctl: "nv", nz: 1, d: [["S", 1.4, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [26.5, 80.4, 6.6, 8.4], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [33.1, 80.4, 2.4, 8.4], ctl: "nv", nz: 1 },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.5, 80.4, 4, 8.4], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 25.7, y: 42, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19.7, y: 42.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 36, y: 19, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35.5, y: 29, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 51.5, t: "Nhận sách", sc: ["4"] },
      { x: 13.7, y: 84.6, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 30, y: 25, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 24, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: toàn bộ là thư viện (giữ hình chữ U của bản xếp) ---------- */
  const B4 = [0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [18 + 3.4 * i, 69.3, 3.4, 6.7], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }));
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [E2a, E2b, E2c, E2c2, E2d, E2e, E2b6, E2f, E2g, E2h],
    rooms: [
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (cánh Tây, xa sự kiện và học nhóm)", r: [4, 39.5, 10, 15.5], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1s", 2.4, "o"]] },
      { id: "STN", n: "Thang bộ thư viện Bắc", r: [14, 39.5, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["B2", 1.4, "thang"], ["HLn2", 1.4, "thang"]] },
      { id: "HLn2", c: "circ", n: "Sảnh thang Bắc", r: [14, 45.5, 4, 2.5], ctl: "tv", nz: 1, d: [["B2", 1.2, "o"], ["B1e", 1.6, "o"], ["WCL2", 1.0, "p"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh đón tiếp)", r: [18, 39.5, 11.5, 8.5], ctl: "tv", nz: 1, top: N, d: [["H2", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [14, 48, 4, 3.5], ctl: "tv", nz: 1, wc: KT, d: [["H2", 1.0, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [14, 51.5, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["H2", 1.4, "thang"], ["B1s", 1.4, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [14, 58.5, 6, 9], ctl: "tv", nz: 1, steps: 4, top: N, d: [["H2", 1.6, "o"], ["B1s", 1.6, "o"], ["CO4", 1.6, "o"]] },
      { id: "LS", n: "Thang bộ + thang máy Nam", r: [14, 67.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "LS" }, d: [["CO4", 1.4, "thang"], ["B1t", 1.4, "thang"], ["B1s", 1.4, "thang"], ["B1x", 1.4, "thang"]] },
      { id: "H2", c: "circ", n: "Hành lang tầng 2 nhìn sân", r: [18, 48, 2, 10.5], ctl: "tv", nz: 1 },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (cánh Tây)", r: [4, 55, 10, 16], ctl: "tv", nz: 1, top: N, d: [["B1t", 2.4, "o"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (góc Tây Nam)", r: [6, 71, 8, 9.4], ctl: "tv", nz: 1, top: N, d: [["B5", 1.6, "o"], ["STE2", 1.2, "thang"], ["B1x", 1.6, "o"]] },
      { id: "B1x", c: "B1", n: "Bàn đọc cá nhân", r: [14, 75.5, 4, 4.9], ctl: "tv", nz: 1, top: N, d: [["B5", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [18, 67.5, 21.5, 1.8], ctl: "tv", nz: 2, d: [["KD2", 0.8, "nv"], ["C3", 0.9, "nv"]] },
      ...B4,
      { id: "KD2", c: "circ", n: "Kho sách học nhóm (đệm)", r: [31.6, 69.3, 1.9, 6.7], ctl: "tv", nz: 1 },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương (trên phòng thiếu nhi)", r: [33.5, 69.3, 6, 6.7], ctl: "kho", nz: 1, d: [["LKE", 0.9, "nv"]] },
      { id: "LKE", c: "circ", n: "Cầu nối Đông", r: [35.5, 76, 2, 4.4], ctl: "tv", nz: 1, d: [["STE3", 1.2, "thang"], ["WCL3", 0.9, "p"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện Đông", r: [37.5, 76, 2, 4.4], ctl: "tv", nz: 1, wc: "Nam · Nữ" },
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, 80.4, 3, 8.4], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" } },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [9, 80.4, 12, 8.4], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1m", 1.6, "o"]] },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (thanh Nam)", r: [21, 80.4, 14.5, 8.4], ctl: "tv", nz: 1, top: N, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.5, 80.4, 4, 8.4], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" } }
    ],
    staff: [{ x: 35, y: 72.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX2", code: "X.2", name: "Giữ chỗ từng khối, sửa giao thông", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 18, 21.5, 30, 41], y: [16, 27.6, 39.5, 48, 55.5, 67.5, 76, 80.4, 88.8] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 84, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 51.5], [5.2, 51.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [25.7, 58], [25.7, 49]]],
        event: [[[20, -9], [20, 6], [3, 10], [3, 33], [25, 33], [25, 39]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, theo lối Tây vào sân trước, tới sảnh đón tiếp (cửa Bắc)" },
      hatch: [COURT, CN],
      labels: [[31, 56, "Sân giữa, lối vào chính"], [17, 33, "Sân trước Bắc"], [35, 64, "Vườn thiếu nhi"]]
    }
  };
  plan.intro = `<p class="lede">X.2 lấy đúng bản xếp bạn gửi ngày 07/11: khối sự kiện ở đầu Bắc, nhánh cà phê bên sông, dải đón tiếp A1, A2 ở giữa, cột kho C sát lối Tây, phòng thiếu nhi B3 dọc sân, dải nhân viên ở đầu Nam, tầng 2 là thư viện hình chữ U ôm lấy sân giữa. Mỗi khối vẫn ở đúng chỗ, đúng tầng; chỉ dời tối đa khoảng 2 m, thêm hành lang vào các khe hở, gom thang cho thẳng hàng và đổi chỗ vài phòng để đi lại đúng logic. Người vào thư viện, kể cả phòng thiếu nhi, luôn qua sảnh đón tiếp A1 rồi quầy gửi đồ, mượn trả A4 có cổng từ.</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn vào lối Tây 6 m (C1, C2, C4, D2, D3, E6, lõi sách, thang Tây Nam) dời về x ≥ 6 m, tầng 2 vẫn đua ra lối Tây tới x = 4 m như bạn xếp; (2) A4 đang đứng riêng giữa sân được đưa vào sát A1, thành cánh cửa duy nhất vào thư viện; (3) tầng 2 đổi chỗ: trên phòng thiếu nhi không còn chỗ đọc nào, chỉ có học nhóm B4 (ồn chồng ồn), hành lang, kho đệm và phòng lưu trữ C3; đọc mở B1 về chỗ cũ của học nhóm ở cánh Tây, đọc linh hoạt B6 về giữa cánh Tây (trên kho xe sách), đọc yên tĩnh B2 về góc Tây Bắc xa mọi phòng ồn; (4) kỹ thuật E4 đổi chỗ để không sát vách phòng nhân viên E2, lưu trữ C3 lên tầng 2 trên phòng thiếu nhi; (5) gom thang: thang Bắc (STS cũ) đặt thẳng trên dưới, lõi sách có tời đặt sát kho đóng, thang máy Nam thẳng hàng; (6) vệ sinh tăng lên đủ diện tích, đọc yên tĩnh đủ 155 m²; (7) thêm hành lang thư viện dọc sân, hành lang nhân viên phía Nam và cầu nối Đông ở tầng 2.",
    "Đi qua khối A: khách vào sảnh đón tiếp A1 bằng cửa Nam (sân giữa, từ bờ sông) hoặc cửa Bắc (sân trước). Từ A1 sang trưng bày A2, hành lang trưng bày tới cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng và chuyên đề. Vào thư viện chỉ có một cửa: A1 → quầy gửi đồ, mượn trả A4 (cổng từ) → hành lang thư viện dọc sân. Phòng thiếu nhi B3 và mọi phòng đọc tầng 2 đều ở sau A4.",
    "Thang có hệ quả: thang Bắc mở thẳng từ quầy A4; lõi sách và thang máy Nam mở vào hành lang thư viện sau cổng từ; hai thang thoát hiểm Tây Nam, Đông Nam ở tầng 1 chỉ có cửa thoát nạn có chuông và cửa thẻ từ ra hành lang nhân viên. Khối sự kiện một tầng nên không có thang nào khác lên khu đọc.",
    "Đường sách: xe giao sách vào lối Tây, cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) → lối nhân viên → kho đóng C1 → lõi sách có tời lên tầng 2, ra thẳng kệ đọc mở cánh Tây. Sách trả: thủ thư đưa từ quầy A4 qua lối nhân viên ngắn sang xử lý C2, không đi qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ngay sau sảnh A1, cạnh cà phê; mỗi tầng thư viện có một cụm sát lõi sách, xếp chồng thẳng hàng, tầng 2 thêm một cụm nhỏ ở cầu nối Đông cho thanh đọc Nam; thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng từ phòng.",
    "Ánh sáng Bắc – Nam: khối sự kiện, cà phê một tầng lấy sáng cửa mái hướng Bắc và cửa sổ Bắc; dải giữa sâu 8,5–9 m mở cả sân trước Bắc lẫn sân giữa Nam; phòng thiếu nhi mở ra sân giữa rộng 19 m; dải nhân viên mở cửa sổ Nam ra bãi xe. Toàn bộ tầng 2 là tầng trên cùng, lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây đặc.",
    "Tiếng ồn: sự kiện, cà phê dồn về đầu Bắc; phía trên phòng thiếu nhi chỉ có học nhóm B4, hành lang, kho đệm và phòng lưu trữ, không có chỗ đọc nào; đọc linh hoạt B6, đọc mở B1 nằm ở cánh Tây, không chung vách với học nhóm; đọc yên tĩnh B2 ở góc Tây Bắc tầng 2, cách học nhóm hơn 15 m, bên dưới là kho và nghiệp vụ; văn phòng, phòng nhân viên tách khỏi kỹ thuật bằng sảnh nhân viên.",
    "Ngoài giờ: khóa một cửa A1 → A4; sảnh, trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề vẫn mở và thoát ra quảng trường, bờ sông không qua khu đọc.",
    "Kết cấu: khung bê tông lưới 4–8 m theo các cột kho và lõi thang; phòng đa năng 15,5 × 11,6 m dầm ứng lực trước; tầng 2 chỉ đua 2 m qua lối Tây, không có phần đua nào quá 4 m nên không cần cột chống thêm."
  ];
  /* ---------- khối 3D ---------- */
  const { B } = G.K;
  const box = (P, z0, z1, c, code, o) => { const xs = P.map(p => p[0]), ys = P.map(p => p[1]), x = Math.min(...xs), y = Math.min(...ys); return B(x, y, Math.max(...xs) - x, Math.max(...ys) - y, z0, z1, c, code, o); };
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotX2", fam: "chot", code: "X.2", from: "bản xếp của bạn", name: "Giữ chỗ từng khối, sửa giao thông", rule: "Bản xếp của bạn, sửa hành lang, thang, logic",
    tag: "Giữ đúng chỗ từng khối của bản xếp 07/11; thêm hành lang vào khe hở, gom thang thẳng hàng; trên phòng thiếu nhi chỉ có học nhóm và kho, không có chỗ đọc",
    story: "Bản xếp của bạn có sẵn một cái sân giữa rất đẹp: khối sự kiện chắn đầu Bắc, thư viện hai tầng ôm sân hình chữ U, mở về phía sông. X.2 giữ nguyên dáng đó, chỉ nối các khối bằng hành lang dọc sân và sắp lại thang cho người đọc luôn đi qua quầy.",
    why: [["Quy luật hình khối", "Các hộp chữ nhật của bản xếp giữ đúng chỗ; tầng 2 hình chữ U trên tầng 1, sân giữa 19 × 21 m mở ra sông."], ["Khối chính – khối phụ", "Thư viện hai tầng là khối chính; khối sự kiện, cà phê một tầng thấp hơn."], ["Nắng và chói", "Phòng có người lấy sáng Bắc, Nam hoặc cửa mái Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân giữa mở về phía sông đón gió Đông Nam; hành lang thư viện dọc sân có mái che."], ["Công năng", "Một cửa vào thư viện qua A4; kho, xử lý, lõi sách liền nhau sát lối Tây."]],
    kc: { he: "Khung bê tông lưới 4–8 m; phòng đa năng dầm ứng lực trước nhịp 11,6 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,6 m (phòng đa năng)", cx: "Không" },
    qa: [["Sao học nhóm lại nằm trên phòng thiếu nhi?", "Hai phòng đều ồn, chồng lên nhau thì tiếng ồn không lan sang chỗ đọc; phần còn lại phía trên phòng thiếu nhi là kho đệm và phòng lưu trữ C3, không đặt chỗ đọc nào. Đọc yên tĩnh dồn về góc Tây Bắc tầng 2, cách xa cả hai."], ["Phòng thiếu nhi có lối riêng không?", "Không: phải qua A1 rồi A4 như mọi phòng đọc; cửa ra vườn trong sân là cửa có chuông báo."]],
    cut: "Khối sự kiện, cà phê foam xám một tầng; thư viện hai tầng trắng hình chữ U; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[16, 60, 12.6, "Lõi sách", 1], [28, 72, 11.4, "Khối chính · Thư viện hai tầng chữ U", 1], [17, 20, 6.2, "Khối phụ · Sự kiện một tầng", 2], [35, 32, 6.2, "Cà phê", 2]],
    build() {
      const v = [
        coreBox(t1, "STN", "warn", 11.05), coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "LS", "violet", 11.05), coreBox(t1, "STE2", "warn", 11.05), coreBox(t1, "STE3", "warn", 11.05),
        box(E1a, 0.45, 4.95, "stone", "D", { fl: 1, top: "grass", role: "p" }), box(E1b, 0.45, 4.95, "stone", "D", { fl: 1, top: "grass", role: "p" }), box(E1c, 0.45, 4.95, "stone", "A", { fl: 1, top: "grass", role: "p" }),
        box(E1d, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }), box(E1e, 0.45, 4.95, "glass", "A", { fl: 1, role: "p" }), box(E1f, 0.45, 4.95, "stone", "A", { fl: 1, role: "p" }),
        box(E1g, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }), box(E1h, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }), box(E1i, 0.45, 4.95, "sheet", "E", { fl: 1, role: "m" }),
        ...[E2a, E2b, E2c, E2c2, E2d, E2e, E2b6, E2f, E2g, E2h].map(P => box(P, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }))
      ];
      return { v, st: [] };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
