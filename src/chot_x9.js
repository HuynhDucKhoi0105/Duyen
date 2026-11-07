/* ================= Ý tưởng X.9: Ồn hai đầu, yên ở giữa (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ, đủ diện tích đề ================= */
(function (G) {
  // Giữ vết các khối của bản xếp (vị trí đã làm khít ở X.7). Bản xếp đã có khu sự kiện ồn ở đầu Bắc và phòng thiếu nhi ở đầu Nam:
  // X.9 lấy đó làm quy luật. Hai đầu ồn, giữa yên: đọc yên tĩnh và bàn đọc cá nhân nằm giữa cánh Tây tầng 2, trên kho đóng và kho lưu trữ.
  // Hai lõi thang trong khu thư viện: lõi Bắc ngay sau quầy A4 (thang bộ, thang máy, tời sách), lõi Nam cạnh phòng thiếu nhi (thang bộ, thang máy).
  // Mỗi đầu có cụm vệ sinh riêng, chồng thẳng hai tầng.
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  // lưới chung hai tầng
  const Y0 = 39.4, Y1 = 47.6, YC = 54.1, YB = 67.4, YB3 = 75.9, YH = 78.2, YS = 80.5, YE = 89;
  const XW = 12.3, XS = 16.3, XH = 18.3;
  const GARDEN = Q(XH, Y1, 23.1, YB - Y1), YARD = Q(10, 27.25, 16, Y0 - 27.25);

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // ĐẦU BẮC ỒN · khối sự kiện (giữ chỗ của bản xếp, lùi về x ≥ 6)
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 16, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện (cửa ra lối Tây)", r: [6, 22.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["W", 1.4, "nv"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["S", 1.8, "tn", 0.5], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 7.9], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn quảng trường Bắc)", r: [35.5, 16, 3.9, 3.85], ctl: "nv", nz: 1, d: [["N", 0.9, "nv"], ["KSK", 0.9, "nv"]] },
      { id: "KSK", c: "circ", n: "Kho phụ sự kiện", r: [35.5, 19.85, 3.9, 4.05], ctl: "sk", nz: 1, d: [["CO3", 1.2, "p"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [26, 23.9, 13.4, 4.6], ctl: "sk", nz: 2, occ: 40, d: [["E", 1.8, "tn"], ["FOYA", 1.8, "o"]] },
      // nhánh cà phê, vệ sinh công cộng: nối thẳng sảnh A1 với sảnh sự kiện
      { id: "FOYA", c: "circ", n: "Hành lang sự kiện (từ sảnh A1)", r: [26, 28.5, 2.4, 10.9], ctl: "sk", nz: 2, d: [["W", 1.6, "tn", 0.4], ["A3", 1.8, "o"], ["WCP", 1.2, "p"], ["A1", 1.8, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [28.4, 28.5, 11, 6.4], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.4, "tn", 0.5], ["KCF", 1.2, "p", 0.7]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [28.4, 34.9, 3.2, 4.5], ctl: "sk", nz: 1, wc: KT },
      { id: "KCF", c: "circ", n: "Sảnh giải lao (trưng bày – cà phê)", r: [31.6, 34.9, 7.8, 4.5], ctl: "sk", nz: 2, d: [["A2", 1.8, "o"]] },
      // dải giữa: xử lý nghiệp vụ | quầy A4 | sảnh đón tiếp A1 | trưng bày A2
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (cửa sổ Bắc, sau quầy)", r: [6, Y0, 8.3, Y1 - Y0], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"], ["C4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14.3, Y0, 3.65, Y1 - Y0], ctl: "tv", ctrl: 1, nz: 2, d: [["CN", 1.6, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [17.95, Y0, 10, Y1 - Y0], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["S", 2.4, "chinh", 0.5], ["A4", 2.0, "k"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [27.95, Y0, 11.45, Y1 - Y0], ctl: "sk", nz: 2, occ: 30, top: N, d: [["S", 1.4, "tn", 0.7]] },
      // cột Tây: tiếp nhận → kho đóng, kỹ thuật ở cuối (cửa ra lối Tây)
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, Y1, 6.3, 4.8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 52.4, 6.3, 19], ctl: "kho", nz: 1, d: [["CN", 1.2, "nv"], ["CS", 1.2, "nv"], ["C3", 1.2, "nv"], ["W", 1.0, "nv", 0.5]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh; cửa ra lối Tây)", r: [6, 71.4, 6.3, 9.1], ctl: "kt", nz: 3, d: [["W", 1.4, "nv", 0.5]] },
      // cột lõi: lõi Bắc sau quầy, vệ sinh Bắc, lưu trữ, lõi Nam, vệ sinh Nam, kho
      { id: "CN", n: "Lõi Bắc: thang bộ + thang máy + tời sách (ngay sau quầy)", r: [XW, Y1, 6, YC - Y1], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CN" }, d: [["HT1", 1.6, "thang"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện đầu Bắc", r: [XW, YC, 4, 2.75], ctl: "tv", nz: 1, wc: KT, d: [["HT1", 1.0, "p"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [XW, 56.85, 4, 10.3], ctl: "kho", nz: 1 },
      { id: "CS", n: "Lõi Nam: thang bộ + thang máy (cạnh thiếu nhi)", r: [XW, 67.15, 4, 6.5], ctl: "tv", nz: 1, core: { st: "u+l", link: "CS" }, d: [["HT1", 1.4, "thang"]] },
      { id: "WCS1", c: "E5", n: "Vệ sinh thư viện đầu Nam", r: [XW, 73.65, 4, 2.75], ctl: "tv", nz: 1, wc: KT, d: [["HT1", 1.0, "p"]] },
      { id: "KDS", c: "circ", n: "Kho xe đẩy, xe sách", r: [XW, 76.4, 4, YS - 76.4], ctl: "tv", nz: 1, d: [["HT1", 0.9, "p"]] },
      // hành lang thư viện tầng 1: từ lõi Bắc chạy dọc sân trong xuống đầu Nam
      { id: "HT1", c: "circ", n: "Hành lang thư viện (sau cổng từ, nhìn sân trong)", r: [XS, YC, 2, YS - YC], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.3], ["B3", 1.8, "p", 0.3], ["HLs", 1.8, "o"]] },
      // ĐẦU NAM ỒN · phòng thiếu nhi mở ra sân trong
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra sân trong)", r: [XH, YB, 21.1, YB3 - YB], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["WCK", 1.0, "p", 0.2], ["KDT", 1.2, "p", 0.4]] },
      { id: "WCK", c: "E5", n: "Vệ sinh trẻ em, thay tã", r: [XH, YB3, 5.87, YH - YB3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, sách thiếu nhi", r: [24.17, YB3, 15.23, YH - YB3], ctl: "tv", nz: 1 },
      { id: "HLs", c: "circ", n: "Hành lang thư viện Nam", r: [XH, YH, 21.1, YS - YH], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd"], ["B1T", 1.8, "o"], ["E1", 0.9, "nv", 0.2], ["STE3", 1.2, "thang"]] },
      // dải Nam: nhân viên và phòng đọc tầng 1
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [9, YS, 3.3, 6.1], ctl: "nv", nz: 1, d: [["SCs", 0.9, "nv"]] },
      { id: "SCs", c: "circ", n: "Lối nhân viên (cửa Nam)", r: [9, 86.6, 3.3, YE - 86.6], ctl: "nv", nz: 1, d: [["S", 1.2, "nv"], ["E2", 0.9, "nv"], ["STE2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [XW, YS, 4.7, YE - YS], ctl: "nv", nz: 1, d: [["E1", 0.9, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [17, YS, 9.41, YE - YS], ctl: "nv", nz: 0 },
      { id: "B1T", c: "B1", n: "Đọc mở, sách mới (cửa sổ Nam)", r: [26.41, YS, 9.4, YE - YS], ctl: "tv", nz: 1 },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.81, YS, 3.59, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 22.9, y: 42.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.1, y: 43, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.4, y: 17.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9, y: 50, t: "Nhận sách", sc: ["4"] },
      { x: 21.7, y: 84.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 32, y: 26.2, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 19, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: toàn bộ là thư viện ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      // thanh Bắc (đầu Bắc, gần phía sự kiện): đọc linh hoạt, tra cứu số, đọc mở; lõi Bắc mở thẳng vào tra cứu
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [4, Y0, 6.1, Y1 - Y0], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B5", 1.6, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [10.1, Y0, 12.2, Y1 - Y0], ctl: "tv", nz: 1, seat: 16, top: N, d: [["CN", 1.6, "thang", 0.6], ["B1N", 1.6, "o"]] },
      { id: "B1N", c: "B1", n: "Đọc mở và kệ (trên sảnh)", r: [22.3, Y0, 5.65, Y1 - Y0], ctl: "tv", nz: 1, top: N },
      // GIỮA YÊN · cánh Tây: bàn đọc cá nhân, đọc yên tĩnh, đọc mở; nằm trên kho đóng và lưu trữ
      { id: "B1c", c: "B1", n: "Bàn đọc cá nhân (đầu Bắc cánh Tây)", r: [4, Y1, 8.3, 4.3], ctl: "tv", nz: 0, top: N, d: [["CN", 1.4, "o"], ["B2", 1.4, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (giữa cánh Tây)", r: [4, 51.9, 8.3, 19.3], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1W", 1.4, "p"]] },
      { id: "B1W", c: "B1", n: "Đọc mở và kệ (cuối cánh Tây)", r: [4, 71.2, 8.3, YS - 71.2], ctl: "tv", nz: 1, top: N, d: [["CS", 1.2, "thang"], ["STE2", 1.2, "thang"]] },
      { id: "CN", n: "Lõi Bắc: thang bộ + thang máy + tời sách", r: [XW, Y1, 6, YC - Y1], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CN" }, d: [["HT2", 1.6, "thang"]] },
      { id: "WC2N", c: "E5", n: "Vệ sinh đầu Bắc tầng 2 (chồng lên tầng 1)", r: [XW, YC, 4, 2.75], ctl: "tv", nz: 1, wc: KT, d: [["HT2", 1.0, "p"]] },
      { id: "B1k", c: "B1", n: "Bàn đọc cá nhân dọc hành lang", r: [XW, 56.85, 4, 10.3], ctl: "tv", nz: 0, top: N, d: [["HT2", 1.2, "p"], ["B2", 1.2, "p"]] },
      { id: "CS", n: "Lõi Nam: thang bộ + thang máy", r: [XW, 67.15, 4, 6.5], ctl: "tv", nz: 1, core: { st: "u+l", link: "CS" }, d: [["HT2", 1.4, "thang"]] },
      { id: "WCS2", c: "E5", n: "Vệ sinh đầu Nam tầng 2 (chồng lên tầng 1)", r: [XW, 73.65, 4, 2.75], ctl: "tv", nz: 1, wc: KT, d: [["HT2", 1.0, "p"]] },
      { id: "KD2w", c: "circ", n: "Kho xe sách tầng 2", r: [XW, 76.4, 4, YS - 76.4], ctl: "tv", nz: 1, d: [["HT2", 0.9, "nv"]] },
      { id: "HT2", c: "circ", n: "Hành lang đọc tầng 2 (nhìn sân trong)", r: [XS, YC, 2, YS - YC], ctl: "tv", nz: 1, d: [["HB", 1.8, "o"], ["B1S", 1.8, "o"], ["KD2", 0.9, "nv"]] },
      // ĐẦU NAM ỒN · trên phòng thiếu nhi: học nhóm, kho đệm, hành lang; không có chỗ đọc nào
      { id: "KD2", c: "circ", n: "Kho đệm, máy in", r: [XH, YB, 2.2, 6], ctl: "tv", nz: 1 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [20.5 + 4.1 * i, YB, 4.1, 6], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "KD3", c: "circ", n: "Kho đồ học nhóm", r: [36.9, YB, 2.5, 6], ctl: "tv", nz: 1, d: [["HB", 0.9, "nv"]] },
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [XH, 73.4, 21.1, 2.3], ctl: "tv", nz: 2, d: [["LKE", 1.8, "o"]] },
      { id: "LKE", c: "circ", n: "Cầu nối Đông (ra thang thoát hiểm)", r: [35.81, 75.7, 3.59, YS - 75.7], ctl: "tv", nz: 1, d: [["STE3", 1.2, "thang"]] },
      // thanh Nam: sảnh đọc lớn
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["B1S", 1.2, "thang"]] },
      { id: "B1S", c: "B1", n: "Sảnh đọc lớn phía Nam", r: [9, YS, 26.81, YE - YS], ctl: "tv", nz: 1, top: N, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.81, YS, 3.59, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" } }
    ],
    staff: [{ x: 16, y: 43.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX9", code: "X.9", name: "Ồn hai đầu, yên ở giữa", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, XW, XS, XH, 27.95, 39.4], y: [16, 27.25, Y0, Y1, YC, YB, YB3, YS, YE] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 3, y: 74, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 49.3], [5.2, 49.3]]],
        staff: [[[3, 112], [3, 96], [10.6, 96], [10.6, 89.6]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [23.1, 58], [23.1, 48]]],
        event: [[[24, -9], [5, 9], [5, 33], [22, 33], [22, 39]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trong tới cửa Nam sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, theo lối Tây vào sân trước, tới cửa Bắc sảnh đón tiếp", staff: "Nhân viên: vào lối nhân viên ở mặt Nam", delivery: "Xe sách: lối Tây tới cửa cuốn tiếp nhận" },
      hatch: [GARDEN, YARD],
      labels: [[30, 57, "Sân trong"], [18, 33.5, "Sân trước Bắc"], [3, 62, "Lối Tây"], [18, 21, "Đầu Bắc ồn · sự kiện"]]
    }
  };
  plan.intro = `<p class="lede">X.9 dựng từ bản xếp khối của bạn (các khối ở vị trí đã làm khít) và lấy đúng điều bản xếp đã gợi ý: <b>khu sự kiện ồn ở đầu Bắc, phòng thiếu nhi ồn ở đầu Nam</b>. Vì thế nhà chia theo chiều dài: <b>hai đầu ồn, giữa yên</b>. Đọc yên tĩnh và bàn đọc cá nhân nằm giữa cánh Tây tầng 2, ngay trên kho đóng và kho lưu trữ (bên dưới không có ai nói chuyện). Học nhóm dồn về đầu Nam, trên phòng thiếu nhi; đọc linh hoạt, tra cứu số ở thanh Bắc. Có <b>hai lõi thang trong khu thư viện</b>: lõi Bắc ngay sau quầy A4 (thang bộ, thang máy, tời sách), lõi Nam cạnh phòng thiếu nhi (thang bộ, thang máy); mỗi đầu có cụm vệ sinh riêng chồng thẳng hai tầng. Mọi phòng đủ diện tích đề (97–105%).</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) dùng vị trí các khối đã làm khít (X.7); các khối tầng 1 lấn lối Tây (D2, D3, xử lý, tiếp nhận, kho đóng, kho chung, thang Tây Nam) lùi về x ≥ 6 để trả lối 6 m cho xe cứu hỏa, xe sách; tầng 2 vẫn đua ra lối Tây tới x = 4. (2) Ba thứ bạn để ở bàn nháp, trong kho được đặt vào nhà như bạn định: lõi sách tầng 2 (thành lõi Bắc, chạy suốt hai tầng), thang bộ tầng 1 dưới thang Bắc tầng 2 (cũng nằm trong lõi Bắc), mảnh vệ sinh 13,5 m² (thành vệ sinh trẻ em cạnh phòng thiếu nhi). (3) A4 đang đứng riêng giữa sân được đưa lên dải giữa, giữa xử lý C2 và sảnh A1 (dời khoảng 13 m): ở chỗ cũ A4 không nối được A1 và không có cửa sổ. Lõi Bắc nằm ngay sau A4 (chỗ thang máy Bắc và thang Bắc của bản xếp). (4) Thang máy Nam của bạn (tầng 1 và tầng 2 lệch nhau khoảng 1,4 m) gom thành lõi Nam thẳng hàng hai tầng, dời khoảng 3 m về phía Tây để đứng cạnh hành lang thư viện. (5) Đổi chỗ phòng tầng 2: bản xếp để đọc mở B1 ngay trên phòng thiếu nhi, nay chỗ đó là học nhóm, kho đệm, hành lang (ồn chồng lên ồn); đọc yên tĩnh B2 từ dải Nam chuyển vào giữa cánh Tây (chỗ học nhóm, đọc linh hoạt của bản xếp), cách học nhóm 8,2 m; học nhóm về đầu Nam, đọc linh hoạt, tra cứu số về thanh Bắc. (6) Kỹ thuật E4 từ dải Nam (chung vách phòng nhân viên E2) lên cuối cột Tây, cửa ra lối Tây; dải Nam tầng 1 thành lối nhân viên, kho chung, phòng nhân viên, văn phòng, phòng đọc sách mới. (7) Hành lang sự kiện nới 2,65 m về phía Tây (khối cà phê bắt đầu từ x = 26 thay vì 28,65) để sảnh A1 nối thẳng sảnh sự kiện và vệ sinh công cộng. (8) Vệ sinh 72 m² chia bốn cụm: công cộng, trẻ em, đầu Bắc và đầu Nam khu đọc (hai cụm sau chồng thẳng hai tầng).",
    "Diện tích: nhóm A 276 m² (đề 270), B 1.096 (đề 1.110), C 259 (đề 260), D 300 (đề 300), E 284 (đề 280); từng phòng 97–105% đề, có cả mảnh vệ sinh 13,5 m² bạn để trong kho. Bản xếp có đủ 24 phòng nhưng nhiều phòng vẽ nhỏ hơn 7–10% (tổng phòng 2.121 m² so với 2.220) và mới vẽ khoảng 355 m² hành lang, thang. Đề dành 780 m² cho giao thông chung, tường, cấu kiện; ở X.9 phần này là hai lõi thang, hai thang thoát hiểm, hành lang thư viện hai tầng, sảnh sự kiện, hành lang học nhóm, kho đệm.",
    "Hai đầu ồn, giữa yên: đầu Bắc là phòng đa năng, chuyên đề, cà phê, sảnh; đầu Nam là phòng thiếu nhi, bên trên là bốn phòng học nhóm. Giữa nhà (cánh Tây tầng 2) là đọc yên tĩnh B2 và hai dãy bàn đọc cá nhân, bên dưới là kho đóng, lưu trữ (không người qua lại). Đọc yên tĩnh cách học nhóm 8,2 m, cách phòng thiếu nhi một tầng và hơn 6 m theo mặt bằng; không phòng đọc nào nằm chồng trên phòng ồn.",
    "Lối vào và bảo mật sách: khách vào sảnh A1 (cửa Bắc từ sân trước hoặc cửa Nam từ sân trong). Rẽ phải là trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện. Rẽ trái qua cửa khóa ngoài giờ vào quầy gửi đồ, mượn trả A4 có cổng từ; sau quầy là sảnh lõi Bắc: lên tầng 2 hoặc đi hành lang thư viện dọc sân trong xuống phòng thiếu nhi, phòng đọc Nam. Mọi cửa ra ngoài khác của khu thư viện là cửa thoát hiểm có chuông báo.",
    "Hai lõi: lõi Bắc (thang bộ, thang máy, tời sách) ngay sau quầy, liền tiếp nhận và kho đóng; lõi Nam (thang bộ, thang máy) cạnh phòng thiếu nhi, liền kho đóng ở phía sau. Sách đi: xe sách vào lối Tây → tiếp nhận C4 → xử lý C2 → kho đóng C1 → tời sách lõi Bắc hoặc thang máy lõi Nam, không qua khu công cộng. Sách trả: quầy A4 → cửa nhân viên sang thẳng C2.",
    "Vệ sinh: công cộng (mở ngoài giờ) ở đầu hành lang sự kiện, cạnh sảnh A1; khu đọc có cụm đầu Bắc (cạnh lõi Bắc) và cụm đầu Nam (cạnh lõi Nam), mỗi cụm chồng thẳng hai tầng; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng từ phòng.",
    "Ánh sáng Bắc – Nam: xử lý, quầy, sảnh A1 có cửa sổ Bắc nhìn sân trước; trưng bày có cửa sổ Nam ra sân trong và cửa mái; khối sự kiện, cà phê một tầng lấy sáng cửa mái Bắc; phòng thiếu nhi mở cửa sổ Bắc ra sân trong; văn phòng, phòng nhân viên, phòng đọc sách mới có cửa sổ Nam. Tầng 2 là tầng trên cùng: mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc.",
    "Ngoài giờ: khóa một cửa giữa A1 và A4; sảnh A1, trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề vẫn mở và thoát ra sân trước, quảng trường, mặt sông, không đi qua khu đọc.",
    "Kết cấu: khung bê tông lưới theo cột lõi (x = 12,3 / 16,3 / 18,3) và các dải 8,2–8,5 m; phòng đa năng 16 × 11,25 m dầm ứng lực trước; tầng 2 đua tối đa 2 m (qua lối Tây), không cần cột chống thêm."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|KSK|CO3|FOYA|KCF|E3)$/;
  plan.idea = {
    id: "chotX9", fam: "chot", code: "X.9", from: "bản xếp của bạn", name: "Ồn hai đầu, yên ở giữa", rule: "Giữ khối của bản xếp; sự kiện ở đầu Bắc, thiếu nhi, học nhóm ở đầu Nam, đọc yên tĩnh ở giữa; hai lõi trong khu thư viện",
    tag: "Từ bản xếp khối của bạn: hai đầu ồn (sự kiện Bắc, thiếu nhi và học nhóm Nam), giữa yên (đọc yên tĩnh, bàn cá nhân trên kho); hai lõi thang, mỗi đầu một cụm vệ sinh",
    story: "Bản xếp của bạn đặt khu sự kiện ở đầu Bắc và phòng thiếu nhi ở đầu Nam. X.9 giữ đúng hai đầu ồn đó và kéo sự yên tĩnh vào giữa nhà: người đọc càng đi vào giữa cánh Tây càng yên. Hai lõi thang đứng ở hai đầu khu thư viện nên không ai phải đi xuyên phòng đọc yên tĩnh để lên xuống.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật của bản xếp: khối sự kiện một tầng phía Bắc, thư viện hai tầng hình chữ U ôm sân trong mở ra sông."], ["Khối chính – khối phụ", "Thư viện hai tầng là khối chính; khối sự kiện, cà phê, trưng bày một tầng thấp hơn."], ["Nắng và chói", "Phòng có người lấy sáng Bắc, Nam hoặc cửa mái Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân trong mở về phía sông đón gió Đông Nam; sân trước Bắc che bởi khối sự kiện."], ["Công năng", "Ồn ở hai đầu, yên ở giữa; hai lõi thang trong khu thư viện, mỗi đầu một cụm vệ sinh."]],
    kc: { he: "Khung bê tông lưới theo cột lõi và các dải 8,2–8,5 m; phòng đa năng dầm ứng lực trước nhịp 11,25 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng), 8,5 m (dải)", cx: "Không (đua tối đa 2 m)" },
    qa: [["Sao đọc yên tĩnh không ở thanh Bắc như X.5?", "Thanh Bắc tầng 2 nằm trên sảnh A1, gần đầu sự kiện; giữa cánh Tây nằm trên kho đóng, không ai qua lại, cách học nhóm 8,2 m và xa cả hai đầu ồn."], ["Hai lõi có tốn diện tích không?", "Lõi Nam chỉ có thang bộ, thang máy (26 m² mỗi tầng); đổi lại người đọc ở đầu Nam, phòng thiếu nhi, xe đẩy không phải đi ngược lên đầu Bắc, và thoát nạn tầng 2 ngắn hơn."], ["Phòng thiếu nhi có lối riêng không?", "Không: chỉ vào từ hành lang thư viện sau quầy A4; cửa ra sân trong là cửa có chuông báo."]],
    cut: "Khối sự kiện foam xám một tầng có dải cửa mái; thư viện trắng hai tầng chữ U ôm sân trong; hai lõi thang tím nhô khỏi mái ở hai đầu cột lõi.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng 97–105% đề` };
    },
    lab: [[15.3, 50.8, 12.6, "Lõi Bắc", 1], [14.3, 70.4, 12.6, "Lõi Nam", 1], [8, 61, 11.4, "Giữa yên · đọc yên tĩnh", 1], [28, 70, 11.4, "Đầu Nam ồn · học nhóm", 2], [18, 22, 6.2, "Đầu Bắc ồn · sự kiện", 2], [30, 57, 1.5, "Sân trong", 2]],
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
      for (const x of [6, XW, XS, XH, 27.95]) for (const y of [Y0, Y1, YC, YB, YS, YE]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 27.25]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
