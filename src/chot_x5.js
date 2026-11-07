/* ================= Ý tưởng X.5: Mặt trước – mặt sau (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ, đủ diện tích đề ================= */
(function (G) {
  // Giữ các khối, số tầng và vết nhà của bản xếp. Mặt sau (kho, nghiệp vụ, kỹ thuật, nhân viên) dồn thành dải chữ L áp lối Tây và mặt Nam;
  // mặt trước (sự kiện, đón tiếp, cà phê, thiếu nhi, phòng đọc) quay ra quảng trường, sân trong và sông. Mọi phòng đủ diện tích đề (97–105%).
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  // lưới chung hai tầng
  const Y0 = 39.4, Y1 = 47.6, YB = 67.4, YB3 = 75.9, YH = 78.2, YS = 80.5, YE = 89;
  const XC = 12.3, XS = 16.3, XH = 18.3;
  const GARDEN = Q(XH, Y1, 23.2, YB - Y1), YARD = Q(10, 27.25, 18.65, Y0 - 27.25);

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // MẶT TRƯỚC · khối sự kiện phía Bắc (giữ chỗ của bản xếp, lùi về x ≥ 6), mở ra quảng trường
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 16, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện (cửa ra lối Tây)", r: [6, 22.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["W", 1.4, "nv"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["S", 1.8, "tn", 0.5], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 7.9], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn quảng trường Bắc)", r: [35.5, 16, 3.9, 3.85], ctl: "nv", nz: 1, d: [["N", 0.9, "nv"], ["KSK", 0.9, "nv"]] },
      { id: "KSK", c: "circ", n: "Kho phụ sự kiện, cà phê", r: [35.5, 19.85, 3.9, 4.05], ctl: "sk", nz: 1, d: [["CO3", 1.2, "p"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [26, 23.9, 13.4, 4.6], ctl: "sk", nz: 2, occ: 40, d: [["E", 1.8, "tn"], ["FOYA", 1.8, "o"]] },
      // nhánh cà phê bên sông: vệ sinh công cộng ngay cạnh sảnh, cà phê mở ra mặt Đông
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [28.65, 28.5, 2.2, 10.9], ctl: "sk", nz: 1, wc: KT, d: [["FOYA", 1.0, "p", 0.6]] },
      { id: "FOYA", c: "circ", n: "Sảnh cà phê, lối sang sự kiện", r: [30.85, 28.5, 2.05, 10.9], ctl: "sk", nz: 2, d: [["A3", 1.8, "o"], ["A2", 1.6, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32.9, 28.5, 6.5, 10.9], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.4, "tn", 0.5]] },
      // dải giữa: xử lý nghiệp vụ (mặt sau) | quầy A4 | sảnh đón tiếp A1 | trưng bày A2 — mọi phòng có cửa sổ Bắc
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (cửa sổ Bắc, sau quầy)", r: [6, Y0, 8.3, Y1 - Y0], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"], ["C4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14.3, Y0, 3.65, Y1 - Y0], ctl: "tv", ctrl: 1, nz: 2, d: [["HT1", 1.4, "o"], ["STS", 1.2, "thang"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [17.95, Y0, 10, Y1 - Y0], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["S", 2.4, "chinh", 0.5], ["A4", 2.0, "k"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [27.95, Y0, 11.45, Y1 - Y0], ctl: "sk", nz: 2, occ: 30, top: N, d: [["S", 1.4, "tn", 0.7]] },
      // MẶT SAU · cột nghiệp vụ áp lối Tây: tiếp nhận → xử lý → kho đóng → lõi sách, kỹ thuật, sảnh nhân viên
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, Y1, 6.3, 4.8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 52.4, 6.3, 18.9], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv", 0.3], ["KXS", 1.2, "nv"], ["W", 1.0, "nv", 0.7]] },
      { id: "STS", n: "Thang bộ thư viện (ngay sau quầy)", r: [XC, Y1, 4, 6.5], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["HT1", 1.2, "thang"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XC, 54.1, 4, 5.55], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HT1", 1.4, "thang"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [XC, 59.65, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["HT1", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [XC, 63.65, 4, 5], ctl: "nv", nz: 1, d: [["HT1", 0.9, "nv"]] },
      { id: "KXS", c: "circ", n: "Kho xe đẩy sách", r: [XC, 68.65, 4, 2.65], ctl: "kho", nz: 1 },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh; cửa ra lối Tây)", r: [6, 71.3, 10.3, 5.3], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["SCw", 1.2, "nv"]] },
      { id: "SCw", c: "circ", n: "Sảnh nhân viên (cửa vào từ lối Tây)", r: [6, 76.6, 10.3, 3.9], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["E2", 0.9, "nv"], ["E1", 0.9, "nv"], ["STE2", 1.0, "nv"]] },
      // hành lang thư viện tầng 1: từ quầy A4 chạy xuống phòng thiếu nhi và phòng đọc phía Nam, mặt kính nhìn sân trong
      { id: "HT1", c: "circ", n: "Hành lang thư viện (sau cổng từ, nhìn sân trong)", r: [XS, Y1, 2, YS - Y1], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.4], ["LB", 1.8, "o"], ["HLs", 1.8, "o"]] },
      { id: "LB", c: "circ", n: "Sảnh thiếu nhi, chỗ để xe đẩy", r: [XH, YB, 2.02, YH - YB], ctl: "tv", nz: 2, d: [["B3", 1.8, "p", 0.35], ["HLs", 1.6, "o"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra sân trong)", r: [20.32, YB, 21.18, YB3 - YB], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["WCK", 1.0, "p"], ["KDT", 1.2, "p", 0.4]] },
      { id: "WCK", c: "E5", n: "Vệ sinh trẻ em, thay tã", r: [20.32, YB3, 5.87, YH - YB3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, sách thiếu nhi", r: [26.19, YB3, 15.31, YH - YB3], ctl: "tv", nz: 1 },
      { id: "HLs", c: "circ", n: "Hành lang thư viện Nam", r: [XH, YH, 23.2, YS - YH], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd"], ["B1T", 1.8, "o"], ["C3", 1.0, "nv"], ["STE3", 1.2, "thang"]] },
      // dải Nam: nhân viên (mặt sau, cửa sổ Nam) và phòng đọc tầng 1
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [9, YS, 4.7, YE - YS], ctl: "nv", nz: 1 },
      { id: "E1", c: "E1", n: "Văn phòng", r: [13.7, YS, 9.41, YE - YS], ctl: "nv", nz: 0 },
      { id: "B1T", c: "B1", n: "Đọc mở, sách mới (cửa sổ Nam)", r: [23.11, YS, 8, YE - YS], ctl: "tv", nz: 1 },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [31.11, YS, 4.7, YE - YS], ctl: "kho", nz: 1 },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.81, YS, 3.59, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 22.9, y: 42.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.1, y: 43, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.4, y: 17.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9, y: 50, t: "Nhận sách", sc: ["4"] },
      { x: 18.4, y: 84.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 31.9, y: 26.2, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 19, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: toàn bộ là thư viện (giữ các khối tầng 2 của bản xếp) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      // thanh Bắc: đọc yên tĩnh, xa học nhóm hơn 19 m
      { id: "B1N", c: "B1", n: "Góc đọc Tây Bắc", r: [4, Y0, 4, Y1 - Y0], ctl: "tv", nz: 1, top: N, d: [["B5", 1.6, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (thanh Bắc)", r: [8, Y0, 19.4, Y1 - Y0], ctl: "tv", nz: 0, seat: 40, top: N, d: [["HT2", 1.2, "p"], ["STS", 1.2, "thang", 0.3]] },
      // cánh Tây: lõi thang, lõi sách và vệ sinh xếp thành một cột, phòng đọc quay về phía Tây
      { id: "B5", c: "B5", n: "Tra cứu số", r: [4, Y1, 8.3, 12.05], ctl: "tv", nz: 1, seat: 16, top: N, d: [["STS", 1.2, "thang"], ["B6", 1.6, "o"]] },
      { id: "STS", n: "Thang bộ thư viện (ngay sau quầy)", r: [XC, Y1, 4, 6.5], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["HT2", 1.2, "thang"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XC, 54.1, 4, 5.55], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HT2", 1.4, "thang"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2 (chồng lên vệ sinh tầng 1)", r: [XC, 59.65, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["HT2", 1.0, "p"]] },
      { id: "KD2a", c: "circ", n: "Kho xe sách tầng 2", r: [XC, 63.65, 4, 2.02], ctl: "tv", nz: 1, d: [["HT2", 0.9, "nv"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [4, 59.65, 8.3, 6.02], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1W", 1.6, "o"]] },
      { id: "B1W", c: "B1", n: "Đọc mở và kệ (cánh Tây)", r: [4, 65.67, 12.3, YS - 65.67], ctl: "tv", nz: 1, top: N, d: [["HT2", 2.0, "o"], ["B1S", 2.4, "o"], ["STE2", 1.2, "thang"]] },
      { id: "HT2", c: "circ", n: "Hành lang đọc tầng 2 (nhìn sân trong)", r: [XS, Y1, 2, YS - Y1], ctl: "tv", nz: 1, d: [["B1S", 1.8, "o"], ["HB", 1.8, "o"]] },
      // trên phòng thiếu nhi: học nhóm (ồn chồng lên ồn), hành lang, kho đệm; không có chỗ đọc nào
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [XH + 4.075 * i, YB, 4.075, 6], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "KD2", c: "circ", n: "Kho đệm, máy in, đồ học nhóm", r: [34.6, YB, 4.8, 6], ctl: "tv", nz: 1, d: [["HB", 0.9, "nv"]] },
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [XH, 73.4, 21.1, 2.3], ctl: "tv", nz: 2, d: [["LKE", 1.8, "o"]] },
      { id: "LKE", c: "circ", n: "Cầu nối Đông (ra thang thoát hiểm)", r: [35.81, 75.7, 3.59, YS - 75.7], ctl: "tv", nz: 1, d: [["STE3", 1.2, "thang"]] },
      // thanh Nam: sảnh đọc lớn
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["B1S", 1.2, "thang"]] },
      { id: "B1S", c: "B1", n: "Sảnh đọc lớn phía Nam", r: [9, YS, 26.81, YE - YS], ctl: "tv", nz: 1, top: N, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.81, YS, 3.59, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" } }
    ],
    staff: [{ x: 8, y: 53.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX5", code: "X.5", name: "Mặt trước – mặt sau, đủ diện tích đề", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, XC, XS, XH, 27.95, 39.4], y: [16, 27.25, Y0, Y1, YB, YB3, YS, YE] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 3, y: 74, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 50], [5.2, 50]]],
        staff: [[[3, 112], [3, 78.5], [5.2, 78.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [22.95, 58], [22.95, 48]]],
        event: [[[24, -9], [5, 9], [5, 33], [22.95, 33], [22.95, 39]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trong tới cửa Nam sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, theo lối Tây vào sân trước, tới cửa Bắc sảnh đón tiếp", staff: "Nhân viên: lối Tây vào sảnh nhân viên ở góc Tây Nam", delivery: "Xe sách: lối Tây tới cửa cuốn tiếp nhận" },
      hatch: [GARDEN, YARD],
      labels: [[30, 57, "Sân trong (mặt trước)"], [18, 33.5, "Sân trước Bắc"], [3, 62, "Lối Tây · mặt sau"], [18, 21, "Khối sự kiện một tầng"]]
    }
  };
  plan.intro = `<p class="lede">X.5 dựng từ bản xếp khối của bạn và chia nhà thành <b>mặt trước</b> và <b>mặt sau</b>. Mặt sau là một dải chữ L áp lối Tây và mặt Nam: tiếp nhận sách, xử lý, kho đóng, lõi sách, kỹ thuật, sảnh nhân viên, văn phòng; xe sách, nhân viên, thợ kỹ thuật đều vào từ lối Tây, không đi qua chỗ khách. Mặt trước quay ra quảng trường, sân trong và sông: khối sự kiện, cà phê, sảnh đón tiếp, trưng bày, phòng thiếu nhi và các phòng đọc. Ranh giới giữa hai mặt là quầy A4: phía khách là cửa khóa ngoài giờ từ A1, phía sau là cửa nhân viên sang phòng xử lý. Lần này <b>mọi phòng đủ diện tích đề</b> (97–105%), tổng sàn 2.915 m².</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn lối Tây (D2, D3, lõi sách, C1, C2, C4, E6, vệ sinh, thang Tây Nam) lùi về x ≥ 6 để trả lối 6 m cho xe cứu hỏa, xe giao sách; tầng 2 vẫn đua ra lối Tây tới x = 4. (2) A4 đang đứng riêng giữa sân được đưa lên dải giữa, sát A1 và C2 (dời khoảng 13 m): ở chỗ cũ A4 nằm dưới khối đọc tầng 2, không có cửa sổ, không nối được A1. (3) Cột Tây sắp lại theo đường sách: xử lý C2 lên đầu cột lấy sáng Bắc (chỗ lõi sách cũ), tiếp nhận C4 ngay dưới, rồi kho đóng C1, lõi sách cạnh kho; khối thang máy sự kiện cũ ở dải giữa thành quầy A4. (4) Thang thư viện của bản xếp (STS) chỉ có ở tầng 2: thêm thang tầng 1 ngay sau quầy A4, cả hai tầng chung một cột thang với lõi sách và vệ sinh. Lõi sách tầng 2 đang để ở bàn nháp được đặt vào cột này. (5) Trên phòng thiếu nhi bản xếp đặt phòng đọc B1: đổi thành bốn phòng học nhóm, hành lang, kho đệm (ồn chồng lên ồn). Học nhóm của bản xếp ở cánh Tây đổi thành phòng đọc. (6) Đọc yên tĩnh B2 chuyển từ thanh Nam lên thanh Bắc tầng 2, cách học nhóm hơn 19 m; thanh Nam thành sảnh đọc lớn B1. (7) Kỹ thuật E4 chuyển sang cột Tây, cửa ra thẳng lối Tây cho thợ, không còn chung vách phòng nhân viên E2; chỗ cũ của E4 ở dải Nam thành phòng đọc sách mới tầng 1 (cửa sổ Nam); E1, E2 đổi chỗ cho nhau để cả hai mở ra sảnh nhân viên. (8) Hai khối thang máy giữa nhà (tầng 1 và tầng 2) bỏ: lõi sách đã có thang máy; chỗ đó thành sảnh thiếu nhi, hành lang đọc. Thêm thang thoát hiểm Đông Nam để thanh đọc Nam không phải đi quá 30 m. (9) Vệ sinh công cộng dời từ góc Đông Bắc vào nhánh cà phê, cạnh sảnh A1; góc Đông Bắc thành phòng bảo vệ nhìn quảng trường. (10) Lấp các khe giữa khối bằng hành lang: hành lang thư viện dọc sân, hành lang Nam giữa phòng thiếu nhi và dải nhân viên, sảnh nhân viên Tây Nam, khe giữa cánh Tây và thanh Nam tầng 2 (chỗ cầu kính của bản xếp), một cầu nối nhỏ 3,6 m ở góc Đông Nam tầng 2 ra thang thoát hiểm. (11) Thanh Nam tầng 2 thu lại x 6–39,4 (bản xếp x 4,45–41,13, lệch dưới 2 m) cho thẳng mép tầng 1.",
    "Diện tích: nhóm A 277 m² (đề 270), B 1.098 (đề 1.110), C 257 (đề 260), D 300 (đề 300), E 279 (đề 280); từng phòng nằm trong 97–105% đề, có đủ mảnh vệ sinh trẻ em 13,5 m² bạn để trong kho. Bản xếp có đủ 24 phòng của đề nhưng nhiều phòng vẽ nhỏ hơn 7–10% (tổng phòng 2.121 m² so với 2.220), và mới vẽ khoảng 355 m² hành lang, thang. Đề dành 780 m² cho giao thông chung, tường, cấu kiện; ở X.5 phần này là hành lang thư viện, hành lang học nhóm, sảnh nhân viên, sảnh sự kiện, năm thang và lõi sách, nên tổng sàn lên 2.915 m², vẫn dưới 3.000.",
    "Mặt sau (dải chữ L áp lối Tây và mặt Nam): xe sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) → kho đóng C1 (qua C4) → lõi sách có tời, liền kho. Sách trả: quầy A4 → cửa nhân viên sang thẳng C2, không bước ra khu công cộng hay khu đọc. Thợ kỹ thuật vào E4 từ lối Tây. Nhân viên vào sảnh nhân viên ở góc Tây Nam, tới văn phòng, phòng nhân viên, thang thoát hiểm; bảo vệ ở góc Đông Bắc nhìn quảng trường, có cửa riêng.",
    "Mặt trước: khách tới từ quảng trường Bắc (qua sân trước) hoặc từ bờ sông (qua sân trong), vào sảnh đón tiếp A1 bằng cửa Bắc hoặc cửa Nam. Rẽ phải là trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề. Rẽ trái qua cửa khóa ngoài giờ vào quầy gửi đồ, mượn trả A4 có cổng từ; sau quầy là thang thư viện và hành lang thư viện nhìn sân trong, dẫn tới phòng thiếu nhi, phòng đọc Nam tầng 1 và lên tầng 2. Không phòng đọc nào, kể cả thiếu nhi, có lối riêng.",
    "Thang có hệ quả: thang thư viện mở ngay sau quầy A4; lõi sách có thang máy mở vào hành lang thư viện cả hai tầng (người khuyết tật, xe sách); hai thang thoát hiểm Tây Nam, Đông Nam ở tầng 1 chỉ có cửa thoát hiểm có chuông báo. Khối sự kiện một tầng nên không có thang nào lên khu đọc mà không qua A4.",
    "Vệ sinh: cụm công cộng (mở ngoài giờ) ngay sau sảnh A1 trong nhánh cà phê, cách phòng đa năng khoảng 20 m; vệ sinh thư viện tầng 1 và tầng 2 chồng thẳng hàng trong cột thang (ống nước đi thẳng); phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng từ phòng.",
    "Ánh sáng Bắc – Nam: xử lý nghiệp vụ, quầy A4, sảnh A1 có cửa sổ Bắc nhìn sân trước; sảnh A1 còn mở cửa Nam ra sân trong; khối sự kiện, cà phê, trưng bày một tầng lấy sáng cửa mái Bắc; phòng thiếu nhi mở cửa sổ Bắc ra sân trong rộng gần 20 m; văn phòng, phòng nhân viên, phòng đọc Nam tầng 1 có cửa sổ Nam. Tầng 2 là tầng trên cùng, mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây đặc; hành lang thư viện có ô kính thấp nhìn sân.",
    "Tiếng ồn: sự kiện, cà phê dồn về đầu Bắc; phòng thiếu nhi ở đáy sân, phía trên chỉ có học nhóm, hành lang, kho đệm; đọc yên tĩnh ở thanh Bắc tầng 2, cách học nhóm hơn 19 m, bên dưới là xử lý, quầy, sảnh (sàn cách âm); phòng đọc Nam tầng 1 cách phòng thiếu nhi một hành lang và kho đồ chơi (hơn 4 m); văn phòng, phòng nhân viên không chung vách phòng ồn hay kỹ thuật.",
    "Ngoài giờ: khóa một cửa giữa A1 và A4; sảnh A1, trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề vẫn mở và thoát ra sân trước, quảng trường, mặt sông, không đi qua khu đọc hay mặt sau.",
    "Kết cấu: khung bê tông lưới theo cột thang (x = 12,3 / 16,3 / 18,3) và các dải 8,2–8,5 m; phòng đa năng 16 × 11,25 m dầm ứng lực trước; tầng 2 đua tối đa 2 m (qua lối Tây), không cần cột chống thêm."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|KSK|CO3|FOYA|E3)$/;
  plan.idea = {
    id: "chotX5", fam: "chot", code: "X.5", from: "bản xếp của bạn", name: "Mặt trước – mặt sau, đủ diện tích đề", rule: "Giữ khối của bản xếp; dải nghiệp vụ chữ L áp lối Tây và mặt Nam, mặt khách quay ra sân và sông",
    tag: "Từ bản xếp khối của bạn: mặt sau (kho, nghiệp vụ, kỹ thuật, nhân viên) là dải chữ L áp lối Tây và mặt Nam; mặt trước quay ra quảng trường, sân trong, sông; mọi phòng đủ diện tích đề",
    story: "Bản xếp của bạn đã đặt kho, nghiệp vụ dọc lối Tây và nhân viên ở đầu Nam. X.5 làm rõ ý đó: phía sau là một dải nghiệp vụ liền mạch, xe sách, nhân viên, thợ kỹ thuật vào từ lối Tây; phía trước là chỗ của khách, nhìn ra sân trong và sông. Quầy A4 đứng đúng chỗ hai mặt gặp nhau.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật của bản xếp: khối sự kiện một tầng phía Bắc, thư viện hai tầng hình chữ U ôm sân trong mở ra sông."], ["Khối chính – khối phụ", "Thư viện hai tầng là khối chính; khối sự kiện, cà phê, trưng bày một tầng thấp hơn."], ["Nắng và chói", "Phòng có người lấy sáng Bắc, Nam hoặc cửa mái Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân trong mở về phía sông đón gió Đông Nam; sân trước Bắc che bởi khối sự kiện."], ["Công năng", "Mặt sau liền mạch cho sách và nhân viên; mặt trước cho khách; quầy A4 là bản lề."]],
    kc: { he: "Khung bê tông lưới theo cột thang và các dải 8,2–8,5 m; phòng đa năng dầm ứng lực trước nhịp 11,25 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng), 8,5 m (dải)", cx: "Không (đua tối đa 2 m)" },
    qa: [["Mặt sau có làm nhân viên đi vòng xa không?", "Không: xử lý C2 sát quầy A4, kho đóng cách xử lý một phòng, lõi sách liền kho; văn phòng và sảnh nhân viên cùng ở góc Tây Nam, ra hành lang thư viện vài bước."], ["Sao đọc yên tĩnh lại ở trên sảnh đón tiếp?", "Thanh Bắc tầng 2 là chỗ xa học nhóm nhất (hơn 19 m); phía dưới là xử lý, quầy, sảnh, không có phòng ồn; sàn làm lớp cách âm."], ["Phòng thiếu nhi có lối riêng không?", "Không: chỉ vào từ hành lang thư viện sau quầy A4; cửa ra sân là cửa có chuông báo."]],
    cut: "Khối sự kiện foam xám một tầng có dải cửa mái; thư viện trắng hai tầng chữ U ôm sân trong; dải nghiệp vụ chữ L ở lối Tây, mặt Nam bằng giấy xám đậm; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng 97–105% đề` };
    },
    lab: [[14.3, 56, 12.6, "Lõi sách", 1], [24, 84, 11.4, "Khối chính · Thư viện hai tầng", 1], [18, 22, 6.2, "Khối phụ · Sự kiện một tầng", 2], [30, 57, 1.5, "Sân trong", 2], [3, 62, 6.2, "Mặt sau · lối Tây", 2]],
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
      for (const x of [6, XC, XS, XH, 27.95]) for (const y of [Y0, Y1, 59.65, YB, YS, YE]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 27.25]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
