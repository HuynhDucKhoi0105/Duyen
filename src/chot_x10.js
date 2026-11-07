/* ================= Ý tưởng X.10: Đi ngắn nhất, ít hành lang (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ, đủ diện tích đề ================= */
(function (G) {
  // Giữ các hộp của bản xếp (vị trí đã khép khít ở X.7). Quầy A4 đứng đúng chỗ bạn đặt: giữa sảnh A1 (phía Bắc) và phòng thiếu nhi (phía Nam).
  // Hành lang chỉ còn: một sảnh ngắn trước quầy, một lối thư viện dọc sân, một hành lang Nam; tầng 2 đi xuyên các sảnh đọc mở (kệ sách làm lối đi).
  // Mọi phòng đủ diện tích đề (97–105%); dùng cả lõi sách tầng 2 bạn để trên bàn nháp, thang Bắc tầng 1 và mảnh vệ sinh trẻ em 13,5 m² bạn để trong kho.
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  // lưới chung hai tầng
  const Y0 = 39.4, Y1 = 47.6, YB = 67.4, YB3 = 75.9, YH = 78.5, YS = 80.5, YE = 89;
  const XW = 10.3, XC = 14.3, XL = 16.5, XH = 18.3;
  const GARDEN = Q(XH, Y1, 23.2, YB - Y1), YARD = Q(10, 27.25, 18.3, Y0 - 27.25);

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // khối sự kiện phía Bắc (bản xếp: D1, D2, D3, D4, vệ sinh, hành lang sự kiện; lùi về x ≥ 6)
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 16, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện (cửa ra lối Tây)", r: [6, 22.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["W", 1.4, "nv"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["S", 1.8, "tn", 0.5], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 7.9], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn quảng trường Bắc)", r: [35.5, 16, 3.9, 3.85], ctl: "nv", nz: 1, d: [["N", 0.9, "nv"], ["KSK", 0.9, "nv"]] },
      { id: "KSK", c: "circ", n: "Kho phụ sự kiện, cà phê", r: [35.5, 19.85, 3.9, 4.05], ctl: "sk", nz: 1, d: [["CO3", 1.2, "p"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [26, 23.9, 13.4, 4.6], ctl: "sk", nz: 2, occ: 40, d: [["E", 1.8, "tn"], ["FOYA", 1.8, "o"]] },
      // nhánh cà phê (bản xếp: FOYA, A3)
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [28.65, 28.5, 2.0, 10.9], ctl: "sk", nz: 1, wc: KT, d: [["FOYA", 1.0, "p", 0.6]] },
      { id: "FOYA", c: "circ", n: "Sảnh cà phê, lối sang sự kiện", r: [30.65, 28.5, 2.05, 10.9], ctl: "sk", nz: 2, d: [["A3", 1.8, "o"], ["A2", 1.6, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32.7, 28.5, 6.7, 10.9], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.4, "tn", 0.5]] },
      // dải giữa: xử lý nghiệp vụ | thang Bắc (thang bạn để trong kho) | sảnh đón tiếp | trưng bày
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (cửa sổ Bắc)", r: [6, Y0, 8.3, Y1 - Y0], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"]] },
      { id: "STS", n: "Thang bộ Bắc (mở ngay sau quầy A4)", r: [XC, Y0, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["N", 1.2, "tnbd"], ["A4", 1.4, "thang"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [XH, Y0, 10, Y1 - Y0], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["S", 2.4, "chinh", 0.5], ["A4", 1.4, "k"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [28.3, Y0, 11.1, Y1 - Y0], ctl: "sk", nz: 2, occ: 30, d: [["S", 1.4, "tn", 0.7]] },
      // dải quầy (bản xếp đặt A4 giữa sảnh và phòng thiếu nhi): quầy liền sảnh A1 và liền xử lý C2 → lối thư viện xuống phòng thiếu nhi
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [XC, 45.4, 4, 7.5], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["HL", 1.4, "o"], ["C2", 0.9, "nv"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1 (ngay sau quầy)", r: [XC, 52.9, 2.2, 5.45], ctl: "tv", nz: 1, wc: KT, d: [["HL", 1.0, "p"]] },
      { id: "HL", c: "circ", n: "Lối thư viện sau cổng từ", r: [XL, 52.9, 1.8, 7.45], ctl: "tv", nz: 1, d: [["HLc", 1.6, "o"]] },
      // cột nghiệp vụ áp lối Tây: tiếp nhận → kho đóng → lõi sách; kỹ thuật, sảnh nhân viên
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, Y1, 8.3, 3.6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 51.2, 8.3, 14.5], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv", 0.75], ["W", 1.0, "nv", 0.7]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XW, 65.7, 4, 6.175], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HLc", 1.4, "thang"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh; cửa ra lối Tây)", r: [6, 65.7, 4.3, 12.8], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["SCw", 1.2, "nv"]] },
      { id: "WCK", c: "E5", n: "Vệ sinh trẻ em, thay tã (mảnh 13,5 m² bạn để trong kho)", r: [XW, 71.875, 4, 3.375], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["HLc", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [XW, 75.25, 4, 5.25], ctl: "nv", nz: 1 },
      { id: "SCw", c: "circ", n: "Lối nhân viên kỹ thuật (từ lối Tây)", r: [6, 78.5, 4.3, 2.0], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["E6", 0.9, "nv"], ["STE2", 1.0, "nv"]] },
      // lối thư viện dọc sân, phòng thiếu nhi
      { id: "HLc", c: "circ", n: "Lối thư viện dọc sân", r: [XC, 58.35, 2.2, YS - 58.35], ctl: "tv", nz: 1, d: [["B3", 1.8, "p", 0.4], ["HLs", 1.6, "o"], ["E1", 0.9, "nv"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra sân trong)", r: [XL, YB, 21.2, YB3 - YB], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["KDT", 1.2, "p"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [XL, YB3, 15.4, YH - YB3], ctl: "kho", nz: 1, d: [["HLs", 1.0, "nv"]] },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [31.9, YB3, 5.8, YH - YB3], ctl: "tv", nz: 1 },
      { id: "HLs", c: "circ", n: "Hành lang Nam", r: [XL, YH, 21.2, YS - YH], ctl: "tv", nz: 1, d: [["B1T", 1.8, "o"], ["E2", 0.9, "nv"], ["STE3", 1.2, "thang"]] },
      // dải Nam (cửa sổ Nam): phòng đọc tầng 1, nhân viên
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"]] },
      { id: "E1", c: "E1", n: "Văn phòng (ngay cuối lối thư viện)", r: [9, YS, 9.76, YE - YS], ctl: "nv", nz: 0, d: [["S", 1.0, "nv", 0.3], ["STE2", 1.0, "nv"]] },
      { id: "B1T", c: "B1", n: "Đọc mở, sách mới (cửa sổ Nam)", r: [18.76, YS, 12.5, YE - YS], ctl: "tv", nz: 1, d: [["S", 1.2, "tnbd", 0.5]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [31.26, YS, 4.7, YE - YS], ctl: "nv", nz: 1, d: [["S", 0.9, "nv"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.96, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 23.3, y: 42.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.3, y: 49, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.4, y: 17.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9, y: 49.4, t: "Nhận sách", sc: ["4"] },
      { x: 13.9, y: 84.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 31.6, y: 26.2, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 19, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: toàn bộ là thư viện, đi xuyên các sảnh đọc mở ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      // thanh Bắc (bản xếp: B1b, STS, B1e)
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [4, Y0, 10.3, 4.85], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1W", 2.0, "o"]] },
      { id: "STS", n: "Thang bộ Bắc", r: [XC, Y0, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["B6", 1.4, "thang"], ["B5", 1.2, "thang"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (trên sảnh đón tiếp)", r: [XH, Y0, 12.2, Y1 - Y0], ctl: "tv", nz: 1, seat: 16, top: N },
      // cánh Tây: một sảnh đọc mở dài là lối đi chính, lõi sách mở thẳng vào sảnh
      { id: "B1W", c: "B1", n: "Sảnh đọc mở và kệ (cánh Tây, lối đi chính)", r: [4, 44.25, 10.3, 65.7 - 44.25], ctl: "tv", nz: 1, top: N, d: [["WC2", 1.0, "p"], ["CS", 1.4, "thang"], ["B1W2", 2.4, "o"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2 (chồng lên vệ sinh tầng 1)", r: [XC, 52.9, 2.2, 5.45], ctl: "tv", nz: 1, wc: KT },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [XW, 65.7, 4, 6.175], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HBw", 1.4, "thang"], ["B1W2", 1.4, "thang"]] },
      { id: "B1W2", c: "B1", n: "Đọc mở và kệ (góc Tây Nam)", r: [4, 65.7, 6.3, YS - 65.7], ctl: "tv", nz: 1, top: N, d: [["STE2", 1.2, "thang"], ["B1str", 1.6, "o"], ["WC3", 1.0, "p"]] },
      { id: "WC3", c: "E5", n: "Vệ sinh thư viện tầng 2 Nam (chồng lên vệ sinh trẻ em)", r: [XW, 71.875, 4, 3.0], ctl: "tv", nz: 1, wc: KT, d: [["HB", 1.0, "p"]] },
      { id: "B1str", c: "B1", n: "Bàn đọc cá nhân", r: [XW, 74.875, 4, YS - 74.875], ctl: "tv", nz: 0, top: N, d: [["B1S", 2.4, "o"]] },
      // thanh trên phòng thiếu nhi: chỉ có học nhóm và hành lang (ồn chồng lên ồn)
      { id: "HBw", c: "circ", n: "Sảnh lõi sách", r: [XC, YB, 1.7, 5], ctl: "tv", nz: 1, d: [["HB", 1.4, "o"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [16 + 5 * i, YB, 5, 5], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [XC, 72.4, 38.96 - XC, 2], ctl: "tv", nz: 2, d: [["LKE", 1.6, "o"]] },
      { id: "LKE", c: "circ", n: "Cầu nối Đông (ra thang thoát hiểm)", r: [35.96, 74.4, 3, YS - 74.4], ctl: "tv", nz: 1, d: [["STE3", 1.2, "thang"]] },
      // thanh Nam (bản xếp: B1m, B2)
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["B1S", 1.2, "thang"]] },
      { id: "B1S", c: "B1", n: "Đọc mở và kệ (thanh Nam)", r: [9, YS, 8.15, YE - YS], ctl: "tv", nz: 1, top: N, d: [["B2", 2.0, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (thanh Nam)", r: [17.15, YS, 18.81, YE - YS], ctl: "tv", nz: 0, seat: 40, top: N, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [35.96, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" } }
    ],
    staff: [{ x: 9, y: 50, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX10", code: "X.10", name: "Đi ngắn nhất, ít hành lang", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, XW, XC, XL, XH, 28.3, 39.4], y: [16, 27.25, Y0, Y1, YB, YB3, YS, YE] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 3, y: 74, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 49.4], [5.2, 49.4]]],
        staff: [[[3, 112], [3, 95], [11, 95], [11, 89.6]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [23.3, 58], [23.3, 48]]],
        event: [[[24, -9], [5, 9], [5, 33], [23.3, 33], [23.3, 39]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trong tới cửa Nam sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, theo lối Tây vào sân trước, tới cửa Bắc sảnh đón tiếp", staff: "Nhân viên: theo lối Tây vào cửa nhân viên mặt Nam của văn phòng", delivery: "Xe sách: lối Tây tới cửa cuốn tiếp nhận" },
      hatch: [GARDEN, YARD],
      labels: [[30, 57, "Sân trong"], [18, 33.5, "Sân trước Bắc"], [3, 62, "Lối Tây"], [18, 21, "Khối sự kiện một tầng"]]
    }
  };
  plan.intro = `<p class="lede">X.10 dựng từ bản xếp khối của bạn với một mục tiêu: <b>đi ít nhất, hành lang ít nhất</b>. Quầy gửi đồ, mượn trả A4 đứng đúng vị trí bạn đặt, giữa sảnh A1 và phòng thiếu nhi, nhưng được kéo sát lên để chạm thẳng vào A1 và phòng xử lý C2: khách bước từ sảnh qua một cửa là tới quầy, sách trả đi qua một cửa nhân viên là tới bàn xử lý. Ngay sau quầy là thang Bắc (thang bạn để trong kho) và vệ sinh; một lối thư viện duy nhất dọc sân dẫn xuống phòng thiếu nhi, lõi sách, phòng đọc tầng 1. Ở tầng 2 không có hành lang đọc riêng: người đọc đi xuyên các sảnh đọc mở, kệ sách chính là lối đi. Giao thông cả nhà chỉ 504 m² (thấp nhất trong các bản X), mọi phòng đủ diện tích đề, tổng sàn 2.725 m².</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn lối Tây (D2, D3, lõi sách, C1, C2, C4, E6, vệ sinh, thang Tây Nam) lùi về x ≥ 6 để trả lối 6 m cho xe cứu hỏa, xe sách; tầng 2 vẫn đua ra tới x = 4. (2) Quầy A4 giữ đúng dải bạn đặt (giữa sảnh và phòng thiếu nhi) nhưng kéo lên khoảng 7,7 m cho chạm vào A1 và C2: bỏ được sảnh chờ trước quầy, A1 → A4 còn 6 m, C2 ↔ A4 còn 5 m. Mái phía trên quầy để trống, quầy lấy sáng bằng cửa mái Bắc. (3) Thang bộ Bắc bạn để trong kho được đặt vào chỗ thang máy Bắc tầng 1, thẳng dưới thang Bắc tầng 2, mở ngay sau quầy. (4) Lõi sách tầng 2 bạn để trên bàn nháp được dùng: lõi sách hai tầng (thang bộ, thang máy, tời sách) dời khoảng 25 m từ đầu Bắc xuống cuối kho đóng C1, để kho đóng, lõi sách, lối thư viện và sảnh đọc tầng 2 liền nhau; hai thang máy lệch nhau của bản xếp gộp vào lõi này. (5) Phòng thiếu nhi B3 dời 3,2 m về phía Tây cho chạm lối thư viện, sâu 8,5 m để đủ sáng Bắc. (6) Khe 4,6 m giữa B3 và dải Nam ở tầng 1 được lấp bằng lưu trữ C3, kho đồ chơi, hành lang Nam (nếu để trống, cửa sổ Nam của B3 và cửa sổ Bắc của dải Nam bị tầng 2 che quá 45°); ở tầng 2 khe vẫn để trống. (7) Tầng 2: trên phòng thiếu nhi chỉ còn bốn phòng học nhóm và hành lang (bản xếp để phòng đọc B1a, B1w ở đó, ngay trên nguồn ồn); dãy học nhóm của bạn ở cánh Tây thành sảnh đọc mở lớn; tra cứu số B5 lên chỗ B1e trên sảnh A1 (thanh Bắc kéo dài 3 m trên trưng bày A2); đọc linh hoạt B6 về góc Tây Bắc (chỗ B1b); đọc yên tĩnh B2 giữ ở thanh Nam, dời 6,8 m về phía Tây cho thẳng thang Đông Nam, cách học nhóm 8,1 m. (8) Dải Nam: văn phòng E1 về đầu Tây, ngay cuối lối thư viện; giữa là phòng đọc tầng 1 có cửa sổ Nam; phòng nhân viên E2 ở Đông; kỹ thuật E4 sang cột Tây, có cửa ra lối Tây, không chung vách E2; trực bảo vệ E3 lên góc Đông Bắc nhìn quảng trường; thêm thang thoát hiểm Đông Nam ở chỗ LC, E3 cũ và một cầu nối 3 m ở tầng 2 tới thang này. (9) Vệ sinh công cộng chuyển vào nhánh cà phê, sát sảnh; vệ sinh thư viện tầng 1, 2 chồng thẳng nhau ở hai chỗ (sau quầy; cạnh lõi sách, chồng lên vệ sinh trẻ em là mảnh 13,5 m² bạn để trong kho).",
    "Diện tích: nhóm A 276 m² (đề 270), B 1.102 (đề 1.110), C 258 (đề 260), D 300 (đề 300), E 285 (đề 280); từng phòng 97–105% đề, đủ mọi chỗ ngồi. Tổng sàn 2.725 m²: phòng 2.222 m², giao thông 504 m² (4 lõi thang hai tầng 199 m², hành lang, sảnh, kho phụ 305 m²). So với các bản khác: X.2 822 m² giao thông, X.3 796, X.4 643, X.5 704, X.6 597; X.10 ít nhất. So với bản xếp (2.476 m²): phòng thêm 101 m² vì đưa về đủ đề, giao thông thêm 149 m² (bạn mới vẽ 355 m²), còn rất xa mức 3.000 m².",
    "Đi lại (đo theo đường đi trên mặt bằng): tiếp nhận → xử lý 2 m; xử lý → kho đóng 8 m; xử lý ↔ quầy A4 5 m; kho đóng → kệ xa nhất 28 m (X.2 48, X.3 34, X.4 39, X.5 41, X.6 41); sảnh A1 → quầy A4 6 m; chỗ đọc xa nhất → vệ sinh 28 m; thiếu nhi → vệ sinh 14 m; sảnh → vệ sinh công cộng 15 m; xa nhất tới lối thoát 21 m ở tầng 1, 24 m ở tầng 2.",
    "Đường sách: xe sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) → kho đóng C1 (liền vách) → lõi sách có tời ở cuối kho → lên thẳng sảnh đọc mở tầng 2 hoặc ra lối thư viện tầng 1. Sách trả: quầy A4 có cửa nhân viên sang thẳng C2. Toàn bộ đường sách đi qua phòng nghiệp vụ, kho, không qua chỗ khách hay chỗ đọc.",
    "Người đọc: vào sảnh A1 (cửa Bắc từ sân trước hoặc cửa Nam từ sân trong) → qua cửa khóa ngoài giờ là quầy A4 có cổng từ, tủ gửi đồ. Sau quầy: lên thang Bắc tới tra cứu số, đọc linh hoạt, sảnh đọc cánh Tây; hoặc đi lối thư viện dọc sân tới phòng thiếu nhi, lõi sách (thang máy), phòng đọc Nam tầng 1. Tầng 2 đi xuyên các sảnh đọc mở; học nhóm có hành lang riêng phía Nam, không chung vách phòng đọc.",
    "Ngoài giờ: khóa cửa giữa A1 và A4; sảnh A1, trưng bày, cà phê, vệ sinh công cộng, sảnh sự kiện, phòng đa năng, chuyên đề vẫn mở và thoát ra sân trước, quảng trường, mặt sông, không qua khu đọc. Thang Bắc tầng 1 chỉ mở vào quầy và cửa thoát hiểm có chuông báo; các cửa ra ngoài của khu đọc đều là cửa có chuông báo.",
    "Ánh sáng Bắc – Nam: xử lý C2, sảnh A1 có cửa sổ Bắc; A1, trưng bày có cửa Nam ra sân trong; quầy A4, cà phê, khối sự kiện lấy cửa mái Bắc; phòng thiếu nhi mở cửa sổ Bắc ra sân trong; văn phòng, phòng đọc Nam, phòng nhân viên có cửa sổ Nam; toàn bộ tầng 2 lấy cửa mái răng cưa Bắc.",
    "Tiếng ồn: sự kiện, cà phê dồn đầu Bắc; trên phòng thiếu nhi chỉ có học nhóm, hành lang; đọc yên tĩnh ở thanh Nam tầng 2, cách học nhóm 8,1 m qua khe sáng; phòng đọc Nam tầng 1 cách phòng thiếu nhi 4,6 m (lưu trữ, hành lang ở giữa); văn phòng, phòng nhân viên không chung vách phòng ồn hay phòng kỹ thuật.",
    "Kết cấu: khung bê tông lưới theo cột thang (x = 10,3 / 14,3 / 18,3) và các dải 8,2–8,5 m; phòng đa năng 16 × 11,25 m dầm ứng lực trước; tầng 2 đua tối đa 2 m ra lối Tây, không cần cột chống thêm."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|KSK|CO3|FOYA|E3)$/;
  plan.idea = {
    id: "chotX10", fam: "chot", code: "X.10", from: "bản xếp của bạn", name: "Đi ngắn nhất, ít hành lang", rule: "Giữ khối của bản xếp; quầy A4 đúng chỗ bạn đặt, tầng 2 đi xuyên sảnh đọc mở, hành lang ít nhất",
    tag: "Từ bản xếp khối của bạn: quầy A4 đúng chỗ bạn đặt, chạm cả sảnh A1 và phòng xử lý; một lối thư viện dọc sân; tầng 2 đi xuyên sảnh đọc mở; giao thông ít nhất (504 m²)",
    story: "Bản xếp của bạn đặt quầy A4 giữa sảnh và phòng thiếu nhi, kho, nghiệp vụ dọc lối Tây. X.10 giữ đúng thứ tự đó và rút ngắn mọi bước: sảnh chạm quầy, quầy chạm xử lý, xử lý chạm tiếp nhận và kho, kho chạm lõi sách. Hành lang chỉ còn ở chỗ thật cần (lối thư viện dọc sân, hành lang Nam, hành lang học nhóm); tầng 2 người đọc đi giữa các dãy kệ.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật của bản xếp: khối sự kiện một tầng phía Bắc, thư viện hai tầng hình chữ U ôm sân trong mở ra sông."], ["Khối chính – khối phụ", "Thư viện hai tầng là khối chính (73% sàn); khối sự kiện, cà phê, trưng bày một tầng thấp hơn."], ["Nắng và chói", "Phòng có người lấy sáng Bắc, Nam hoặc cửa mái Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân trong mở về phía sông đón gió Đông Nam; khe giữa thanh học nhóm và thanh Nam ở tầng 2 thông gió, lấy sáng."], ["Công năng", "Mọi chuỗi việc hằng ngày (sách, mượn trả, đón khách) là các phòng liền vách; hành lang chỉ 305 m² cho cả nhà."]],
    kc: { he: "Khung bê tông lưới theo cột thang và các dải 8,2–8,5 m; phòng đa năng dầm ứng lực trước nhịp 11,25 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng), 8,5 m (dải)", cx: "Không (đua tối đa 2 m)" },
    qa: [["Ít hành lang thì người đọc có phải đi xuyên phòng không?", "Chỉ ở tầng 2, qua các sảnh đọc mở có kệ (đúng là chỗ người đọc tìm sách). Phòng kín như đọc yên tĩnh, học nhóm, tra cứu số đều mở từ sảnh, hành lang hoặc thang, không ai phải đi xuyên qua."], ["Quầy A4 có đúng chỗ bạn đặt không?", "Đúng dải bạn đặt, giữa sảnh A1 và phòng thiếu nhi; chỉ kéo lên 7,7 m cho chạm sảnh và phòng xử lý, khỏi cần sảnh chờ trước quầy."], ["Văn phòng có xa quầy không?", "Văn phòng ở đầu Tây dải Nam, ngay cuối lối thư viện (khoảng 30 m tới quầy, đi trong nhà); xử lý C2 và quầy A4 liền vách nhau."]],
    cut: "Khối sự kiện foam xám một tầng có dải cửa mái; thư viện trắng hai tầng chữ U ôm sân trong; quầy A4 một tầng có cửa mái nằm giữa sảnh và cánh Tây; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng 97–105% đề` };
    },
    lab: [[12.3, 68.5, 12.6, "Lõi sách", 1], [24, 84, 11.4, "Khối chính · Thư viện hai tầng", 1], [18, 22, 6.2, "Khối phụ · Sự kiện một tầng", 2], [30, 57, 1.5, "Sân trong", 2], [16.3, 49, 6.2, "Quầy A4", 2]],
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
      for (const x of [6, XW, XC, XH, 28.3]) for (const y of [Y0, Y1, 65.7, YB, YS, YE]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 27.25]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
