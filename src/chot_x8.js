/* ================= Ý tưởng X.8: Tầng 2 trọn cho đọc (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ, đủ diện tích đề ================= */
(function (G) {
  // Giữ các khối, số tầng và vết nhà của bản xếp (bản đã làm khít X.7). Tầng 1 chỉ có công cộng, sự kiện, thiếu nhi, kho, nhân viên;
  // mọi phòng đọc (B1, B2, B4, B5, B6) lên tầng 2. Sau quầy A4 là một sảnh thư viện có thang chính và thang máy đưa người đọc lên.
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  // lưới chung hai tầng
  const Y0 = 39.4, Y1 = 47.6, YH = 53.6, YB = 67.4, YB3 = 75.9, YC = 78.5, YS = 80.5, YE = 89;
  const XC = 12.3, XS = 16.3, XH = 18.6;
  const GARDEN = Q(XH, Y1, 41.5 - XH, YB - Y1), YARD = Q(10, 27.25, 18, Y0 - 27.25);

  /* ---------- Tầng 1: công cộng, sự kiện, thiếu nhi, kho, nhân viên (không có phòng đọc người lớn) ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // khối sự kiện phía Bắc (chỗ của bản xếp, lùi về x ≥ 6), mở ra quảng trường
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 16, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện (cửa ra lối Tây)", r: [6, 22.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["W", 1.4, "nv"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["S", 1.8, "tn", 0.5], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 7.9], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "KSK", c: "circ", n: "Kho sự kiện, kho cà phê (cửa nhập hàng)", r: [35.5, 16, 3.9, 7.9], ctl: "sk", nz: 1, d: [["CO3", 1.2, "p"], ["N", 1.2, "nv"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [26, 23.9, 13.4, 4.6], ctl: "sk", nz: 2, occ: 40, d: [["E", 1.8, "tn"], ["FOYA", 1.8, "o"]] },
      // nhánh cà phê: vệ sinh công cộng ngay sau sảnh, cà phê mở ra sông
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [28.65, 28.5, 2.2, 10.9], ctl: "sk", nz: 1, wc: KT, d: [["FOYA", 1.0, "p", 0.6]] },
      { id: "FOYA", c: "circ", n: "Sảnh cà phê, lối sang sự kiện", r: [30.85, 28.5, 2.05, 10.9], ctl: "sk", nz: 2, d: [["A3", 1.8, "o"], ["A2", 1.6, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32.9, 28.5, 6.5, 10.9], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.4, "tn", 0.5]] },
      // dải giữa: xử lý | quầy A4 | sảnh đón tiếp A1 | trưng bày A2
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (cửa sổ Bắc, sau quầy)", r: [6, Y0, 8.3, Y1 - Y0], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"], ["C4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14.3, Y0, 3.7, Y1 - Y0], ctl: "tv", ctrl: 1, nz: 2, d: [["SLT", 1.6, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [18, Y0, 10, Y1 - Y0], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["S", 2.4, "chinh", 0.5], ["A4", 2.0, "k"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [28, Y0, 11.4, Y1 - Y0], ctl: "sk", nz: 2, occ: 30, top: N, d: [["S", 1.4, "tn", 0.7]] },
      // sảnh thư viện ngay sau cổng từ: thang chính + thang máy lên tầng đọc, lối xuống thiếu nhi
      { id: "SLT", c: "circ", n: "Sảnh thư viện sau cổng từ (lên tầng đọc)", r: [XC, Y1, XH - XC, YH - Y1], ctl: "tv", nz: 2, d: [["STL", 1.6, "thang"], ["HT1", 1.8, "o"]] },
      { id: "STL", n: "Thang chính + thang máy thư viện", r: [XC, YH, 4, 6], ctl: "tv", nz: 1, core: { st: "u+l", link: "STL" } },
      { id: "HT1", c: "circ", n: "Hành lang thư viện (nhìn sân trong) tới phòng thiếu nhi", r: [XS, YH, XH - XS, YC - YH], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.2], ["B3", 1.8, "p", 0.3], ["CS", 1.4, "thang"], ["WCL1", 1.0, "p"]] },
      // cột nghiệp vụ áp lối Tây: tiếp nhận → kho đóng → lõi sách
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, Y1, 6.3, 4.8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 52.4, 6.3, 19], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"], ["W", 1.0, "nv", 0.7]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XC, 59.6, 4, 5.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [XC, 65.1, 4, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [XC, 69.1, 4, 4.9], ctl: "nv", nz: 1, d: [["SCw", 0.9, "nv"]] },
      { id: "KXS", c: "circ", n: "Kho đồ nhân viên, xe đẩy", r: [XC, 74, 4, YC - 74], ctl: "nv", nz: 1, d: [["SCw", 1.0, "nv"]] },
      { id: "SCw", c: "circ", n: "Sảnh nhân viên Tây (cửa từ lối Tây)", r: [6, 71.4, 6.3, YC - 71.4], ctl: "nv", nz: 1, d: [["W", 1.2, "nv", 0.5], ["C1", 1.0, "nv"], ["SCS", 1.6, "o"]] },
      // thiếu nhi (giữ chỗ của bản xếp), vệ sinh trẻ em, kho đồ chơi
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra sân trong)", r: [XH, YB, 21.18, YB3 - YB], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["WCK", 1.0, "p"], ["KDT", 1.2, "p", 0.4]] },
      { id: "WCK", c: "E5", n: "Vệ sinh trẻ em, thay tã", r: [XH, YB3, 5.6, YC - YB3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy, sách thiếu nhi", r: [XH + 5.6, YB3, 35.8 - XH - 5.6, YC - YB3], ctl: "tv", nz: 1 },
      { id: "STE3", n: "Thang thoát hiểm Đông", r: [35.8, YB3, 3.6, YS - YB3], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["E", 1.2, "tnbd"]] },
      // hành lang nhân viên và dải nhân viên phía Nam
      { id: "SCS", c: "circ", n: "Hành lang nhân viên", r: [6, YC, 35.8 - 6, YS - YC], ctl: "nv", nz: 1, d: [["STE2", 1.0, "nv"], ["E2", 0.9, "nv"], ["E1", 0.9, "nv"], ["C3", 1.0, "nv"], ["E4", 1.2, "nv"], ["LC", 1.2, "o"]] },
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [9, YS, 4.65, YE - YS], ctl: "nv", nz: 1 },
      { id: "E1", c: "E1", n: "Văn phòng", r: [13.65, YS, 9.3, YE - YS], ctl: "nv", nz: 0 },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [22.95, YS, 4.65, YE - YS], ctl: "kho", nz: 1 },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [27.6, YS, 6.4, YE - YS], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
      { id: "LC", c: "circ", n: "Sảnh nhân viên Đông Nam (cửa ra bãi xe)", r: [34, YS, 5.4, 84.4 - YS], ctl: "nv", nz: 1, d: [["E", 1.2, "nv"], ["E3", 0.9, "nv"], ["KNV", 0.9, "nv"]] },
      { id: "KNV", c: "circ", n: "Tủ đồ nhân viên", r: [34, 84.4, 2, YE - 84.4], ctl: "nv", nz: 1 },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn bãi xe, bờ sông)", r: [36, 84.4, 3.4, YE - 84.4], ctl: "nv", nz: 1, d: [["S", 0.9, "nv"]] }
    ],
    staff: [
      { x: 23, y: 42.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.1, y: 43, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.7, y: 86.7, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9, y: 50, t: "Nhận sách", sc: ["4"] },
      { x: 18.3, y: 84.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 31.9, y: 26.2, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 19, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: trọn cho đọc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      // thanh Bắc (chỗ B1b, thang Bắc, B1e của bản xếp): đọc mở lớn trên sảnh đón tiếp
      { id: "B1N", c: "B1", n: "Đọc mở và kệ (thanh Bắc, trên sảnh)", r: [4, Y0, 24, Y1 - Y0], ctl: "tv", nz: 1, top: N, d: [["B1c", 2.4, "o"], ["B5", 1.6, "o"]] },
      // cánh Tây (chỗ B5, B4, B6 của bản xếp): tra cứu, đọc linh hoạt, đọc mở
      { id: "B5", c: "B5", n: "Tra cứu số", r: [4, Y1, 8.3, 11.7], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1c", 1.6, "o"], ["B6", 1.6, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [4, 59.3, 8.3, 5.85], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1W", 1.6, "o"]] },
      { id: "B1W", c: "B1", n: "Đọc mở và kệ (cánh Tây)", r: [4, 65.15, 8.3, YS - 65.15], ctl: "tv", nz: 1, top: N, d: [["B1Wb", 2.4, "o"], ["B1m", 2.4, "o"], ["STE2", 1.2, "thang"]] },
      // cột thang: sảnh đến của thang chính, lõi sách, vệ sinh chồng tầng 1
      { id: "B1c", c: "B1", n: "Sảnh đọc tầng 2 (đầu thang chính), bàn đọc cá nhân", r: [XC, Y1, XH - XC, YH - Y1], ctl: "tv", nz: 1, top: N, d: [["STL", 1.6, "thang"]] },
      { id: "STL", n: "Thang chính + thang máy thư viện", r: [XC, YH, 4, 6], ctl: "tv", nz: 1, core: { st: "u+l", link: "STL" }, d: [["HT2", 1.4, "thang"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XC, 59.6, 4, 5.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HT2", 1.4, "thang"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2 (chồng lên vệ sinh tầng 1)", r: [XC, 65.1, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["HT2", 1.0, "p"]] },
      { id: "KD2a", c: "circ", n: "Kho xe sách, sách chờ lên kệ", r: [XC, 69.1, 4, 4], ctl: "tv", nz: 1, d: [["HT2", 0.9, "nv"]] },
      { id: "B1Wb", c: "B1", n: "Kệ mở, bàn đọc (cạnh hành lang)", r: [XC, 73.1, 4, YS - 73.1], ctl: "tv", nz: 1, top: N, d: [["HT2", 1.4, "o"]] },
      { id: "HT2", c: "circ", n: "Hành lang đọc tầng 2 (nhìn sân trong)", r: [XS, YH, XH - XS, YS - YH], ctl: "tv", nz: 1, d: [["HB", 1.8, "o"], ["B1m", 1.8, "o"]] },
      // trên phòng thiếu nhi (chỗ B1a, B1w của bản xếp): học nhóm, ồn chồng lên ồn, không có chỗ đọc
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [XH + 5.2 * i, YB, 5.2, 5], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "HB", c: "circ", n: "Hành lang học nhóm (sảnh chờ, tủ đồ nhóm)", r: [XH, 72.4, 20.8, YB3 - 72.4], ctl: "tv", nz: 2, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông", r: [35.8, YB3, 3.6, YS - YB3], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["B2", 1.0, "tnbd"]] },
      // thanh Nam (giữ chỗ B1m, B2 của bản xếp)
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" } },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (thanh Nam)", r: [9, YS, 13.8, YE - YS], ctl: "tv", nz: 1, top: N, d: [["B2", 1.2, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (thanh Nam, chỗ cũ của bạn)", r: [22.8, YS, 18.3, YE - YS], ctl: "tv", nz: 0, seat: 40, top: N }
    ],
    staff: [{ x: 8, y: 53.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX8", code: "X.8", name: "Tầng 2 trọn cho đọc", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, XC, XS, XH, 28, 39.4], y: [16, 27.25, Y0, Y1, YH, YB, YB3, YS, YE] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 3, y: 74, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 49.3], [5.2, 49.3]]],
        staff: [[[3, 112], [3, 74.9], [5.2, 74.9]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [23, 58], [23, 48]]],
        event: [[[24, -9], [5, 9], [5, 33], [23, 33], [23, 39]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trong tới cửa Nam sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, sân trước, cửa Bắc sảnh đón tiếp", staff: "Nhân viên: lối Tây vào sảnh nhân viên Tây, hoặc cửa Đông Nam cạnh bảo vệ", delivery: "Xe sách: lối Tây tới cửa cuốn tiếp nhận" },
      hatch: [GARDEN, YARD],
      labels: [[30, 57, "Sân trong"], [18, 33.5, "Sân trước Bắc"], [3, 62, "Lối Tây"], [18, 21, "Khối sự kiện một tầng"]]
    }
  };
  plan.intro = `<p class="lede">X.8 dựng từ bản xếp khối của bạn (bản đã làm khít) và tách nhà theo tầng: <b>tầng 1</b> là chỗ của khách và nhân viên (sự kiện, đón tiếp, trưng bày, cà phê, phòng thiếu nhi, kho, văn phòng), <b>tầng 2 trọn cho đọc</b>: đọc mở, đọc yên tĩnh, tra cứu số, đọc linh hoạt, học nhóm. Qua A1 rồi quầy A4 là sảnh thư viện có thang chính và thang máy; người đọc lên thẳng tầng 2, gia đình có trẻ đi tiếp hành lang nhìn sân trong xuống phòng thiếu nhi. Đọc yên tĩnh B2 giữ đúng chỗ bạn đặt ở thanh Nam, cách học nhóm 8 m. Lõi sách tầng 2 (bạn để ở bàn nháp) và mảnh vệ sinh trong kho đã được đặt vào; mọi phòng đủ diện tích đề.</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn lối Tây (D2, D3, lõi sách, C1, C2, C4, E6, vệ sinh, thang Tây Nam) lùi về x ≥ 6 để trả lối 6 m cho xe cứu hỏa, xe giao sách; tầng 2 vẫn đua ra lối Tây tới x = 4. (2) Tầng 1 không còn phòng đọc người lớn: mọi phòng đọc lên tầng 2, đúng ý bạn đặt gần hết phòng đọc ở trên. (3) A4 đang đứng riêng giữa sân được đưa lên dải giữa, giữa xử lý C2 và sảnh A1 (dời khoảng 13 m), chỗ khối thang máy Bắc cũ; ngay sau A4 là sảnh thư viện có thang chính và thang máy, lên thẳng sảnh đọc tầng 2. (4) Thang Bắc tầng 2 của bản xếp (STS) không có thang tầng 1 bên dưới, còn thang tầng 1 bạn để trong kho: đặt chung thành một thang chính hai tầng, thẳng hàng với lõi sách. Lõi sách tầng 2 (bạn để ở bàn nháp) đặt chồng lõi sách tầng 1, cạnh kho đóng. (5) Trên phòng thiếu nhi bản xếp đặt đọc mở B1a, B1w: đổi thành bốn phòng học nhóm và hành lang học nhóm (ồn chồng lên ồn); học nhóm của bản xếp ở cánh Tây đổi thành đọc linh hoạt B6 và đọc mở. (6) Đọc yên tĩnh B2 và đọc mở B1m giữ đúng chỗ bạn đặt ở thanh Nam tầng 2; B2 cách học nhóm 8,1 m. Tra cứu số B5 giữ chỗ ở cánh Tây. (7) Kỹ thuật E4 không còn sát vách phòng nhân viên E2: dải Nam xếp thang thoát hiểm, E2, văn phòng E1, lưu trữ C3, kỹ thuật E4, sảnh nhân viên và bảo vệ E3 (giữ góc Đông Nam như bạn đặt). (8) Vệ sinh công cộng dời từ góc Đông Bắc vào nhánh cà phê, cạnh sảnh A1; góc Đông Bắc thành kho sự kiện, cà phê có cửa nhập hàng. (9) Thang máy Nam tầng 1, tầng 2 của bản xếp lệch nhau 1,4 m: bỏ, vì sảnh thang chính và lõi sách đều có thang máy; chỗ đó thành hành lang thư viện và kho. Thêm thang thoát hiểm Đông ở khe giữa khối học nhóm và thanh Nam (chỗ cầu kính LK của bản xếp dời sang). (10) Lấp khe bằng hành lang: hành lang thư viện tầng 1 dọc sân, hành lang nhân viên phía Nam, sảnh nhân viên Tây, hành lang đọc tầng 2. Thanh Bắc tầng 2 nới 0,5 m về Đông cho thẳng mép sảnh A1 bên dưới.",
    "Diện tích: nhóm A 277 m² (đề 270), B 1.094 (đề 1.110), C 258 (đề 260), D 300 (đề 300), E 279 (đề 280); từng phòng 97–105% đề: đọc mở B1 509 m², đọc yên tĩnh B2 156, thiếu nhi B3 180, học nhóm B4 104, tra cứu B5 97, đọc linh hoạt B6 49. Mảnh vệ sinh 13,5 m² bạn để trong kho thành vệ sinh trẻ em cạnh phòng thiếu nhi. Bản xếp có đủ 24 phòng của đề nhưng vẽ nhỏ hơn 7–10% (2.121 m² so với 2.220) và mới vẽ khoảng 355 m² hành lang, thang; đề dành 780 m² cho giao thông chung, tường, cấu kiện. Ở X.8 phần giao thông là 719 m² (sảnh thư viện, hành lang thư viện, hành lang đọc, hành lang học nhóm, hành lang và sảnh nhân viên, sảnh sự kiện, bốn thang, kho phụ), tổng sàn 2.927 m², dưới 3.000.",
    "Lối vào và kiểm soát: khách vào sảnh A1 bằng cửa Bắc (từ quảng trường, sân trước) hoặc cửa Nam (từ sân trong, bãi xe). Rẽ phải là trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng. Rẽ trái qua cửa khóa ngoài giờ vào quầy A4 (gửi đồ, mượn trả, cổng từ), rồi vào sảnh thư viện: thang chính và thang máy lên tầng đọc, hoặc hành lang nhìn sân trong xuống phòng thiếu nhi. Không phòng đọc nào có lối riêng; cửa ra sân, thang thoát hiểm ở tầng 1 đều là cửa thoát hiểm có chuông báo.",
    "Tầng 2 trọn cho đọc: lên thang là sảnh đọc có bàn đọc cá nhân; phía Bắc là phòng đọc mở lớn trên sảnh đón tiếp; cánh Tây là tra cứu số, đọc linh hoạt, đọc mở; hành lang đọc nhìn sân trong dẫn tới học nhóm (trên phòng thiếu nhi) và xuống thanh Nam (đọc mở, rồi đọc yên tĩnh ở cuối, chỗ yên nhất). Thoát nạn: thang chính, lõi sách, thang Tây Nam, thang Đông; xa nhất 24,1 m.",
    "Đường sách và nhân viên: xe sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) và kho đóng C1 → lõi sách có tời và thang máy cạnh kho → kho xe sách tầng 2 → kệ. Sách trả: quầy A4 → cửa nhân viên sang thẳng C2, không qua khu công cộng hay khu đọc. Nhân viên vào sảnh nhân viên Tây (lối Tây) hoặc sảnh Đông Nam cạnh bảo vệ, đi hành lang nhân viên phía Nam tới văn phòng, phòng nhân viên, lưu trữ, kỹ thuật, và qua kho đóng tới xử lý.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ngay sau sảnh A1 trong nhánh cà phê; vệ sinh thư viện tầng 1 và tầng 2 chồng thẳng hàng trong cột thang (ống nước đi thẳng); phòng thiếu nhi có vệ sinh trẻ em, thay tã mở từ phòng.",
    "Tiếng ồn: tầng 1 gom các nguồn ồn (sự kiện, cà phê, thiếu nhi), tầng 2 chỉ có học nhóm là ồn và nằm gọn trên phòng thiếu nhi, có hành lang riêng làm đệm; đọc yên tĩnh cách học nhóm 8,1 m, bên dưới là văn phòng, lưu trữ, kỹ thuật (không phải phòng ồn); đọc mở thanh Bắc nằm trên sảnh, quầy, xử lý. Văn phòng, phòng nhân viên không chung vách phòng ồn hay kỹ thuật.",
    "Ánh sáng Bắc – Nam: xử lý C2, quầy A4, sảnh A1 có cửa sổ Bắc nhìn sân trước, A1 còn cửa Nam ra sân trong; khối sự kiện, cà phê, trưng bày một tầng lấy sáng cửa mái Bắc; phòng thiếu nhi mở cửa sổ Bắc ra sân trong; dải nhân viên Nam sâu 8,5 m có cửa sổ Nam. Tầng 2 là tầng trên cùng: mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc.",
    "Ngoài giờ: khóa một cửa giữa A1 và A4; sảnh A1, trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề vẫn mở và thoát ra sân trước, quảng trường, mặt sông, không đi qua khu đọc hay khu nhân viên.",
    "Kết cấu: khung bê tông lưới theo cột thang (x = 12,3 / 16,3 / 18,6) và các dải 8,2–8,5 m; phòng đa năng 16 × 11,25 m dầm ứng lực trước; tầng 2 đua tối đa 2 m (qua lối Tây, mép Đông thanh Nam), không cần cột chống thêm."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|KSK|CO3|FOYA)$/;
  plan.idea = {
    id: "chotX8", fam: "chot", code: "X.8", from: "bản xếp của bạn", name: "Tầng 2 trọn cho đọc", rule: "Giữ khối của bản xếp; tầng 1 khách, thiếu nhi, nghiệp vụ; tầng 2 toàn phòng đọc",
    tag: "Từ bản xếp khối của bạn: tầng 1 cho khách, thiếu nhi, kho và nhân viên; tầng 2 trọn cho đọc; sau quầy A4 một sảnh thang đưa người đọc lên",
    story: "Bạn đã đặt gần hết phòng đọc ở tầng 2. X.8 đi hết ý đó: tầng 2 chỉ có đọc, tầng 1 không còn phòng đọc người lớn nào. Người đọc qua A1, quầy A4 rồi lên thang ngay; khách sự kiện, cà phê ở lại tầng 1, không ai đi ngang khu đọc.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật của bản xếp: khối sự kiện một tầng phía Bắc, thư viện hai tầng hình chữ U ôm sân trong mở ra sông."], ["Khối chính – khối phụ", "Tầng đọc là khối chính phủ trọn chữ U; khối sự kiện một tầng thấp hơn."], ["Nắng và chói", "Tầng 2 là tầng trên cùng nên mọi phòng đọc lấy sáng mái răng cưa quay Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân trong mở về phía sông đón gió Đông Nam."], ["Công năng", "Một sảnh thang sau quầy A4; tầng đọc tách hẳn khỏi tiếng ồn sự kiện, cà phê."]],
    kc: { he: "Khung bê tông lưới theo cột thang và các dải 8,2–8,6 m; phòng đa năng dầm ứng lực trước nhịp 11,25 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng), 8,6 m (dải)", cx: "Không (đua tối đa 2 m)" },
    qa: [["Người đọc có phải đi qua phòng thiếu nhi không?", "Không: lên thang ngay ở sảnh sau quầy A4; hành lang xuống phòng thiếu nhi rẽ riêng."], ["Học nhóm ở trên phòng thiếu nhi có ồn tầng đọc không?", "Học nhóm có hành lang riêng làm đệm; đọc yên tĩnh cách 8 m, đọc mở ở thanh Bắc và cánh Tây cách xa hơn."], ["Sách lên tầng 2 thế nào?", "Kho đóng C1 → lõi sách có tời và thang máy ngay cạnh kho → kho xe sách tầng 2 → kệ."]],
    cut: "Khối sự kiện foam xám một tầng; tầng 1 thư viện kính lùi vào; tầng đọc trắng phủ chữ U với mái răng cưa; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng 97–105% đề` };
    },
    lab: [[14.3, 56, 12.6, "Sảnh thang thư viện", 1], [24, 84, 11.4, "Tầng 2 trọn cho đọc", 1], [18, 22, 6.2, "Khối phụ · Sự kiện một tầng", 2], [30, 57, 1.5, "Sân trong", 2]],
    build() {
      const v = [];
      const coreTop = 9.45 + 1.6;
      for (const L of [t1, t2]) for (const z of L.rooms) {
        const [x, y, w, h] = z.r;
        if (z.core) { if (L === t1) v.push(B(x, y, w, h, 0.45, coreTop, /l/.test(z.core.st) ? "violet" : "warn", "X", { top: /l/.test(z.core.st) ? "violet" : "warn", lv: 0, fl: 2 })); continue; }
        const z0 = L === t1 ? 0.45 : 4.95, z1 = L === t1 ? 4.95 : 9.45, pub = L === t1 && PUB.test(z.id);
        v.push(B(x, y, w, h, z0, z1, pub ? "stone" : "sheet", pub ? "D" : "B", { fl: 1, role: pub ? "p" : "m", top: pub ? "grass" : undefined }));
      }
      const st = [];
      for (const x of [6, XC, XS, XH, 28]) for (const y of [Y0, Y1, YH, YB, YS, YE]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 27.25]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
