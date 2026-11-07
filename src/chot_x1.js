/* ================= Ý tưởng X.1: Đúng y bản xếp của bạn (file xep-khoi-arc329 (2).json, 07/11/2026) · khối + mặt bằng đầy đủ =================
   Giữ nguyên mọi khối đặt trên khu đất: vị trí, kích thước, tầng, mã phòng. Chỉ thêm hành lang lấp khe giữa các khối, cửa, nội thất, người trực.
   Chỉnh mép ≤ 0,3 m cho tường khít (ghi trong notes). Các lỗi do chính hình khối gây ra được giữ lại và liệt kê, xem X.2–X.4 để sửa. */
(function (G) {
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const box = r => { const [x, y, w, h] = r; return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; };

  /* ---------- Tầng 1: đúng các khối tầng 1 của bản xếp ---------- */
  const R1 = [
    // cụm sự kiện phía Bắc
    { id: "D2", c: "D2", n: "Bục trình bày", r: [4.80, 16.00, 4.05, 5.63], ctl: "sk", nz: 3 },
    { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [4.80, 21.63, 4.05, 5.43], ctl: "sk", nz: 1 },
    { id: "D1", c: "D1", n: "Phòng đa năng", r: [8.85, 16.00, 17.15, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.8], ["D2", 2.4, "o"], ["D3", 1.2, "p"]] },
    { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26.00, 16.00, 9.50, 7.22], ctl: "sk", nz: 2, seat: 24, d: [["N", 1.2, "tn", 0.5]] },
    { id: "WCP", c: "E5", n: "Vệ sinh công cộng, sự kiện (mở ngoài giờ)", r: [35.50, 16.00, 3.90, 7.22], ctl: "sk", nz: 1, wc: KT },
    { id: "CO3", c: "circ", n: "Hành lang sự kiện", r: [26.00, 23.22, 13.40, 5.39], ctl: "sk", nz: 2, occ: 30, d: [["D1", 2.4, "p", 0.6], ["D4", 1.8, "p"], ["WCP", 1.2, "p"], ["E", 1.6, "tn"]] },
    { id: "FOYA", c: "circ", n: "Sảnh sự kiện, cà phê", r: [28.65, 28.61, 4.00, 10.80], ctl: "sk", nz: 2, occ: 30, d: [["CO3", 2.4, "o"], ["A3", 1.8, "o"]] },
    { id: "A3", c: "A3", n: "Cà phê sách", r: [32.65, 28.61, 6.75, 10.80], ctl: "sk", nz: 3, seat: 32, d: [["E", 1.2, "tn", 0.5]] },
    // dải đón tiếp
    { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [18.65, 39.41, 10.00, 8.20], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.55], ["KE", 0.6, "o"], ["HA", 1.4, "k"]] },
    { id: "KE", c: "circ", n: "Khe nối sảnh – trưng bày", r: [28.65, 39.41, 0.87, 8.20], ctl: "sk", nz: 2, d: [["A2", 0.6, "o"], ["FOYA", 0.6, "o"]] },
    { id: "A2", c: "A2", n: "Trưng bày", r: [29.52, 39.41, 9.88, 8.20], ctl: "sk", nz: 2, occ: 30, d: [["FOYA", 2.4, "o", 0.5]] },
    // cột kho, nghiệp vụ phía Tây (áp lối Tây)
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách (chỉ tầng 1)", r: [5.05, 38.79, 8.00, 4.00], ctl: "kho", nz: 1, core: { st: "u+l+b", link: "CS1" } },
    { id: "CN", n: "Thang máy Bắc (chỉ tầng 1)", r: [14.00, 39.81, 4.00, 7.80], ctl: "tv", nz: 1, core: { st: "l", link: "CN1" } },
    { id: "C1", c: "C1", n: "Kho đóng", r: [4.45, 42.79, 8.17, 13.71], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
    { id: "HA", c: "circ", n: "Sảnh trước quầy (khóa ngoài giờ)", r: [12.62, 47.61, 7.88, 5.51], ctl: "tv", nz: 2, d: [["A4", 2.0, "o"], ["CN", 1.2, "thang"], ["C1", 1.0, "nv"]] },
    { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [12.75, 53.12, 3.83, 8.50], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.0, "o"], ["C2", 1.0, "nv"]] },
    { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [4.23, 56.50, 8.52, 7.87], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"]] },
    { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [4.45, 64.37, 8.30, 3.94], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
    // sảnh thư viện sau cổng từ
    { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [12.75, 61.62, 9.78, 5.86], ctl: "tv", nz: 2, d: [["B3", 1.8, "p", 0.5], ["HL2", 2.4, "o"], ["C4", 1.0, "nv"]] },
    { id: "HL2", c: "circ", n: "Hành lang thư viện", r: [12.75, 67.48, 3.53, 4.75], ctl: "tv", nz: 1, d: [["CN2", 1.4, "thang"], ["CO2", 2.4, "o"]] },
    { id: "CN2", n: "Thang máy Nam", r: [16.28, 67.48, 4.25, 7.70], ctl: "tv", nz: 1, core: { st: "l", link: "LS" } },
    { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [20.53, 67.48, 19.47, 8.50], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
    { id: "CO2", c: "circ", n: "Hành lang vệ sinh, khu văn phòng", r: [12.75, 72.23, 2.95, 8.03], ctl: "tv", nz: 1, d: [["WCL1", 1.2, "p"], ["E1", 1.0, "nv"]] },
    { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [8.23, 72.23, 4.52, 4.50], ctl: "tv", nz: 1, wc: KT, d: [["E6", 0.9, "nv"]] },
    { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [3.98, 72.23, 4.25, 4.50], ctl: "nv", nz: 1 },
    // dải văn phòng phía Nam
    { id: "E1", c: "E1", n: "Văn phòng", r: [9.45, 80.26, 9.50, 8.50], ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"], ["S", 1.0, "nv", 0.3]] },
    { id: "E2", c: "E2", n: "Phòng nhân viên", r: [18.95, 80.26, 4.70, 8.50], ctl: "nv", nz: 1 },
    { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [23.65, 80.26, 6.50, 8.50], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
    { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [30.15, 80.95, 5.25, 7.81], ctl: "kho", nz: 1, d: [["LC", 1.0, "nv"]] },
    { id: "LC", c: "circ", n: "Lối nhân viên", r: [35.40, 80.26, 4.00, 4.54], ctl: "nv", nz: 1, d: [["E", 1.2, "nv"], ["E3", 0.9, "nv"]] },
    { id: "E3", c: "E3", n: "Trực bảo vệ", r: [35.80, 84.80, 3.60, 4.20], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"]] },
    { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [4.45, 83.64, 3.00, 5.00], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["E", 1.2, "tnbd"]] }
  ];
  /* ---------- Tầng 2: đúng các khối tầng 2 của bản xếp ---------- */
  const R2 = [
    { id: "B1b", c: "B1", n: "Đọc mở và kệ (góc Tây Bắc)", r: [3.83, 39.33, 9.00, 6.11], ctl: "tv", nz: 1 },
    { id: "STS", n: "Thang bộ Bắc (tầng 1 chưa có thang tương ứng)", r: [14.00, 39.81, 4.33, 6.00], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["KN", 1.2, "thang"]] },
    { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh)", r: [18.60, 38.79, 8.80, 9.27], ctl: "tv", nz: 1, top: N },
    { id: "KN", c: "circ", n: "Hành lang Bắc", r: [13.95, 45.81, 4.65, 1.39], ctl: "tv", nz: 1, d: [["B1e", 1.2, "o"], ["B1f", 1.6, "o"], ["B5", 1.0, "o"]] },
    { id: "B5", c: "B5", n: "Tra cứu số", r: [3.00, 45.44, 10.95, 9.26], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1b", 2.4, "o"], ["SpA", 2.4, "o"], ["B1f", 1.6, "o"]] },
    { id: "B1f", c: "B1", n: "Bàn đọc cá nhân", r: [13.95, 47.20, 4.31, 7.50], ctl: "tv", nz: 0, top: N },
    { id: "SpA", c: "circ", n: "Hành lang giữa", r: [10.63, 54.70, 2.87, 12.78], ctl: "tv", nz: 2, d: [["B6", 1.6, "o"], ["B4a", 0.9, "p"], ["B4c", 0.9, "p"], ["B4d", 0.9, "p"], ["SpB", 2.4, "o"]] },
    { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [13.50, 55.59, 4.50, 11.89], ctl: "tv", nz: 1, steps: 4, top: N },
    ...[["B4a", 56.75], ["B4c", 60.56], ["B4d", 64.37], ["B4b", 68.18]].map(([id, y], i) => ({ id, c: "B4", n: `Học nhóm ${i + 1}`, r: [4.13, y, 6.50, 3.81], ctl: "tv", nz: 2, top: N })),
    { id: "SpB", c: "circ", n: "Sảnh thang máy", r: [10.63, 67.48, 3.75, 6.65], ctl: "tv", nz: 1, d: [["B4b", 0.9, "p"], ["LIFT2", 1.4, "thang"], ["LK", 1.4, "o"]] },
    { id: "LIFT2", n: "Thang máy Nam", r: [14.38, 67.84, 4.05, 8.00], ctl: "tv", nz: 1, core: { st: "l", link: "LS" }, d: [["B1a", 1.4, "thang"]] },
    { id: "B1a", c: "B1", n: "Đọc mở và kệ (trên thiếu nhi, Tây)", r: [18.43, 67.48, 8.97, 8.26], ctl: "tv", nz: 1, top: N, d: [["B1w", 2.4, "o"]] },
    { id: "B1w", c: "B1", n: "Đọc mở và kệ (trên thiếu nhi, Đông)", r: [27.40, 67.48, 12.00, 8.26], ctl: "tv", nz: 1, top: N },
    { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [4.13, 72.73, 4.00, 4.00], ctl: "tv", nz: 1, wc: KT },
    { id: "KW", c: "circ", n: "Lối vào vệ sinh", r: [8.13, 74.13, 1.15, 2.60], ctl: "tv", nz: 1, d: [["WCL2", 1.0, "p"]] },
    { id: "LK", c: "circ", n: "Hành lang xuống dải đọc Nam", r: [9.28, 74.13, 3.00, 6.25], ctl: "tv", nz: 1, d: [["B1m", 1.6, "o"], ["KW", 0.9, "o"]] },
    { id: "B1m", c: "B1", n: "Đọc mở và kệ (dải Nam)", r: [7.45, 80.38, 16.50, 8.41], ctl: "tv", nz: 1, top: N, d: [["B2", 2.0, "p"], ["STW2", 1.2, "thang"]] },
    { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [23.95, 80.38, 17.18, 8.41], ctl: "tv", nz: 0, seat: 40, top: N },
    { id: "STW2", n: "Thang thoát hiểm Tây Nam", r: [4.45, 82.64, 3.00, 6.00], ctl: "tv", nz: 1, core: { st: "u", link: "STW" } }
  ];
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: R1.map(z => box(z.r)), rooms: R1,
    staff: [
      { x: 23.6, y: 43.6, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 14.7, y: 57.4, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.6, y: 86.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30.3, y: 71.7, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 8.5, y: 60.4, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8.6, y: 66.3, t: "Nhận sách", sc: ["4"] },
      { x: 14.2, y: 84.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 30.6, y: 33, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 22, y: 20, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: R2.map(z => box(z.r)), rooms: R2,
    staff: [{ x: 8.5, y: 50, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX1", code: "X.1", name: "Đúng y bản xếp của bạn", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [4.45, 8.85, 12.75, 18.65, 26, 29.52, 32.65, 39.4], y: [16, 23.22, 28.61, 39.41, 47.61, 53.12, 61.62, 67.48, 75.98, 80.26, 88.76] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 50, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[8, 89.5, 3.5, 5.5, 1], [11.5, 89.5, 3.5, 5.5, 1]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[2.2, 112], [2.2, 104], [2.2, 66.3], [4.3, 66.3]]],
        fire: [[[-3, -12], [2.2, -4], [2.2, 102]], [[2.2, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 33], [24, 33], [23.6, 38.9]]],
        event: [[[20, -9], [20, 6], [20, 33], [23.6, 38.9]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trước sảnh, cửa chính A1", event: "Khách sự kiện: từ quảng trường Bắc vào sân trước sảnh, cửa chính A1" },
      hatch: [box([8.85, 27.25, 19.8, 12.16]), box([22.53, 47.61, 17.47, 19.87])],
      labels: [[18, 33, "Sân trước sảnh"], [31, 57, "Sân giữa"], [2.4, 52, "Lối Tây chỉ còn khoảng 4 m"], [17, 21, "Phòng đa năng"]]
    }
  };
  const ISSUES = [
    "Lối Tây: nhiều khối tầng 1 lấn vào lối Tây 6 m dành cho xe cứu hỏa, xe sách (bục D2, kho D3, lõi sách, kho C1, xử lý C2, tiếp nhận C4, kho E6, thang Tây Nam bắt đầu từ x 3,98–5,05); lối còn khoảng 4 m. Tầng 2 được nhô tới x ≥ 4 nhưng tra cứu số B5 bắt đầu ở x 3,0, B1b ở x 3,83. (Bộ kiểm tra mặt bằng không đo lỗi này, mình ghi thêm.)",
    "Thang: lõi sách tầng 2 (CS) và thang bộ Bắc tầng 1 (STS) đang để ở bàn nháp, trong kho. Vì vậy thang bộ Bắc tầng 2 không có thang tầng 1 bên dưới (bộ kiểm tra báo lỗi), lõi sách tầng 1 không lên được tầng 2, và từ kho đóng C1 tới kệ xa nhất B1e phải đi 66 m qua sảnh thư viện và thang máy Nam (nên ≤ 50 m).",
    "Thang lệch: thang máy Nam tầng 2 lệch khoảng 1,9 m so với tầng 1; thang thoát hiểm Tây Nam tầng 2 lệch 1 m. Mình vẫn coi là một lõi để tính đường đi, thực tế phải thẳng hàng.",
    "Thoát nạn tầng 2: không có thang ở đầu Đông, góc Đông của đọc mở B1w đi 44 m mới tới thang (mốc 30 m).",
    "Vệ sinh: chỉ có 3 cụm, tổng 64 m² (−8%); vệ sinh thiếu nhi còn trong kho. Từ thiếu nhi B3 tới vệ sinh 24 m (nên ≤ 15 m), từ đọc B1e ở đầu Bắc tầng 2 tới vệ sinh 42 m (nên ≤ 35 m), từ sảnh A1 tới vệ sinh công cộng 29 m (nên ≤ 25 m). Vệ sinh tầng 2 không chồng thẳng lên vệ sinh tầng 1.",
    "Ánh sáng: cà phê A3 (kẹp giữa hành lang sự kiện và trưng bày), quầy A4 (kẹp giữa hai sảnh), xử lý C2 (kẹp giữa kho đóng và tiếp nhận) không có cửa sổ Bắc hay Nam. Cửa sổ Nam của thiếu nhi B3 và cửa sổ Bắc của văn phòng E1, phòng nhân viên E2 bị các hộp tầng 2 phía trước che quá 45° (khoảng hở chỉ 3,6–5,2 m).",
    "Tiếng ồn: phòng nhân viên E2 chung vách 9 m với phòng kỹ thuật E4. Phòng đọc tầng 2 B1a, B1w nằm ngay trên phòng thiếu nhi B3 (bộ kiểm tra chưa tính lỗi này vì không phải đọc yên tĩnh, nhưng nên tránh).",
    "Diện tích, số chỗ: trưng bày A2 81 m² (−10%) chỉ đủ 27/30 khách; đọc yên tĩnh B2 144 m² (−10%) chỉ xếp được 39/40 chỗ.",
    "Hình khối: khu đọc (khối chính) chỉ chiếm khoảng 41% sàn, chưa thắng rõ khối phụ; vài hộp tầng 2 nhô ra ngoài khối tầng 1 nên trang tự thêm 4 cột chống. Các hộp tầng 2 rời nhau nên phải thêm nhiều hành lang ngắn, hẹp (KN 1,4 m, KE 0,9 m, KW 1,15 m)."
  ];
  plan.intro = `<p class="lede">X.1 dựng đúng bản xếp bạn gửi (file <b>xep-khoi-arc329 (2).json</b>): mọi khối giữ nguyên vị trí, kích thước, tầng và mã phòng. Mình chỉ thêm các hành lang lấp khe giữa các khối để nhà liền một khối, đặt cửa, nội thất, người trực, lối vào và chia khu ngoài giờ. Cửa chính vào sảnh đón tiếp A1 từ sân trước phía Bắc; từ A1 rẽ phải qua khe nối sang trưng bày, sảnh sự kiện, cà phê, phòng đa năng; đi thẳng xuống sảnh trước quầy (khóa ngoài giờ) tới quầy gửi đồ, mượn trả A4 có cổng từ, sau quầy mới tới phòng thiếu nhi, thang máy lên khu đọc tầng 2. Bộ kiểm tra vẫn báo một số lỗi đến từ chính hình khối; mình để nguyên theo yêu cầu và liệt kê ở dưới, các bản X.2–X.4 sửa những chỗ này.</p>
<p><b>Chỗ bản xếp chưa đạt (giữ nguyên theo yêu cầu, xem X.2–X.4 để sửa)</b></p><ul>${ISSUES.map(t => `<li>${t}</li>`).join("")}</ul>`;
  plan.notes = [
    "Đi qua khối A: một cửa vào chính ở mặt Bắc sảnh đón tiếp A1, nhìn ra sân trước. Khách sự kiện từ A1 qua khe nối 0,9 m sang trưng bày A2, sảnh sự kiện, hành lang sự kiện tới phòng đa năng D1, chuyên đề D4, cà phê A3. Người đọc từ A1 xuống sảnh trước quầy rồi qua quầy gửi đồ, mượn trả A4 có cổng từ (A1 → A4 khoảng 13 m). Phòng thiếu nhi B3, thang máy Nam và toàn bộ tầng 2 chỉ tới được sau quầy A4.",
    "Ngoài giờ: khu mở gồm sảnh A1, trưng bày, sảnh và hành lang sự kiện, phòng đa năng, chuyên đề, cà phê và vệ sinh công cộng WCP (có chỗ cho người khuyết tật). Chỉ khóa một cửa giữa A1 và sảnh trước quầy; cửa này không nằm trên đường thoát của khu sự kiện (khu sự kiện thoát ra mặt Bắc và mặt Đông).",
    "Thang: thang máy Bắc tầng 1 (CN) và lõi sách tầng 1 (CS) không có phần tầng 2 tương ứng trong bản xếp; người đọc lên tầng 2 bằng thang máy Nam (sau quầy) hoặc thang thoát hiểm Tây Nam (tầng 1 chỉ có cửa thoát hiểm có chuông báo). Thang bộ Bắc tầng 2 chưa có thang tầng 1 bên dưới.",
    "Đường sách: xe sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 → kho đóng C1 → lõi sách CS (liền nhau theo cột Tây). Sách trả: quầy A4 có cửa nhân viên thông thẳng vào xử lý C2. Sách lên kệ tầng 2 phải theo sảnh thư viện và thang máy Nam vì lõi sách chưa lên tầng 2.",
    "Vệ sinh: cụm công cộng WCP mở ngoài giờ cạnh hành lang sự kiện; khu đọc tầng 1 có WCL1 ngay sau sảnh thư viện, tầng 2 có WCL2 (xếp chồng lên kho dụng cụ E6, gần thẳng WCL1).",
    "Tiếng ồn: cụm sự kiện, cà phê ở đầu Bắc, cách khu đọc tầng 2 bằng sân trước. Đọc yên tĩnh B2 ở đầu Đông Nam tầng 2, cách học nhóm hơn 15 m. Học nhóm B4 có hành lang giữa riêng, ngăn với tra cứu số B5 và đọc linh hoạt B6.",
    "Chỉnh mép để tường khít (đều ≤ 0,3 m, trừ cà phê A3 hạ mép Nam 0,32 m): bục D2 mở mép Đông 0,05 m; phòng đa năng D1 mở mép Đông 0,22 m; chuyên đề D4, vệ sinh WCP nâng mép Bắc 0,11–0,18 m; WCP, hành lang sự kiện lùi mép Tây 0,15 m; quầy A4 lùi mép Tây 0,3 m; xử lý C2 nâng mép Bắc 0,05 m, mở mép Đông 0,27 m; tiếp nhận C4 mở mép Đông 0,05 m; hành lang CO2, vệ sinh WCL1 lệch 0,05 m; thang máy Nam tầng 1 hạ mép Bắc 0,1 m, mở mép Đông 0,25 m; lối nhân viên LC kéo dài 0,04 m; tầng 2: B1b mở mép Nam 0,3 m, B5 nâng mép Bắc 0,11 m và mở mép Đông 0,3 m, B1f lùi mép Tây 0,31 m, B1e lùi mép Tây 0,3 m, học nhóm 1 lùi 0,1 m, học nhóm 4 dời lên 0,24 m, thang máy tầng 2 mở mép Đông 0,3 m, B1a lùi mép Tây 0,22 m, B1w hạ mép Bắc 0,1 m, B2 nâng mép Bắc 0,03 m.",
    "Hành lang lấp khe (không phải khối mới): tầng 1 có khe nối KE giữa A1 và A2, sảnh trước quầy HA, sảnh thư viện HL, hành lang HL2; tầng 2 có hành lang Bắc KN, hành lang giữa SpA, sảnh thang máy SpB, lối vào vệ sinh KW. Các khoảng trống lớn (sân trước sảnh 20 × 12 m, sân giữa 17 × 20 m) giữ nguyên là sân."
  ];
  /* ---------- khối 3D: dựng thẳng từ các khối của bản xếp ---------- */
  const { B, col } = G.K;
  const MAT = { A: "ribbon", B: "sheet", C: "deck", D: "gold", E: "stone" };
  const roomBox = (z, z0, z1, fl) => { const [x, y, w, h] = z.r, k = (z.c || "")[0], m = MAT[k] || "glass"; return B(x, y, w, h, z0, z1, m, MAT[k] ? k : "L", { fl, role: k === "B" ? "m" : "p", ...(k === "D" || k === "A" ? {} : {}) }); };
  const core = (z, z0, z1, c) => { const [x, y, w, h] = z.r; return B(x, y, w, h, z0, z1, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotX1", fam: "chot", code: "X.1", from: "bản xếp của bạn", name: "Đúng y bản xếp của bạn", rule: "Giữ nguyên mọi khối của bản xếp, chỉ thêm hành lang nối",
    tag: "Bản xếp gửi ngày 07/11: cụm sự kiện phía Bắc, dải đón tiếp giữa, cột kho phía Tây, dải văn phòng phía Nam; tầng 2 là các hộp đọc rời trên cột kho và thiếu nhi",
    story: "Đây là chính hình khối bạn tự xếp. Tầng 1 trải dài từ phòng đa năng ở đầu Bắc xuống dải văn phòng ở đầu Nam, xen giữa là hai sân: sân trước sảnh và sân giữa. Tầng 2 là chuỗi hộp đọc đặt trên cột kho phía Tây và trên phòng thiếu nhi, gom lại thành một vòng đọc chữ U ôm sân giữa.",
    why: [["Quy luật hình khối", "Các hộp chữ nhật xếp theo ba dải Đông – Tây (sự kiện, đón tiếp, văn phòng) và một cột kho dọc lối Tây; tầng 2 vòng chữ U trên cột Tây và dải Nam."], ["Khối chính – khối phụ", "Khu đọc tầng 2 và phòng thiếu nhi là khối chính; cụm sự kiện một tầng phía Bắc là khối phụ."], ["Nắng và chói", "Phần lớn phòng lấy sáng mặt Bắc, Nam và mái tầng 2; vài phòng kẹt giữa nhà (xem danh sách chưa đạt)."], ["Gió và mưa", "Sân giữa mở ra sông và về phía Nam, đón gió Đông Nam."], ["Công năng", "Một cửa chính vào A1; A1 chia hai nhánh: sự kiện (phải) và thư viện qua quầy A4 (thẳng)."]],
    kc: { he: "Khung bê tông lưới cột theo các khối; phòng đa năng dầm ứng lực trước nhịp 11,25 m; các hộp tầng 2 tựa trên khối tầng 1 bên dưới.", nhip: "11,25 m (phòng đa năng)", cx: "Một số hộp tầng 2 nhô ngoài khối tầng 1 (học nhóm 4, thang máy, tra cứu số), đều dưới 4 m" },
    qa: [["Vì sao còn lỗi?", "X.1 giữ đúng bản xếp, không dời khối; các lỗi đến từ vị trí khối (lấn lối Tây, thiếu lõi sách tầng 2, phòng kẹt giữa nhà). X.2–X.4 sửa trên cùng hình khối."], ["Lên tầng 2 bằng gì?", "Thang máy Nam sau quầy A4 và thang thoát hiểm Tây Nam; thang bộ Bắc tầng 2 cần thêm thang tầng 1 bên dưới."]],
    cut: "Theo đúng các khối của bản xếp: khối sự kiện vàng, đón tiếp gạch, kho gỗ, văn phòng đá tối, khu đọc trắng; thang cam, thang máy tím nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng` };
    },
    lab: [[30, 72, 11.4, "Khối chính · Khu đọc tầng 2 và thiếu nhi", 1], [17, 21, 6.2, "Khối phụ · Cụm sự kiện", 2], [23.6, 43.5, 6.2, "Sảnh đón tiếp A1", 2], [8.5, 55, 6.2, "Cột kho Tây", 2], [20, 84, 6.2, "Dải văn phòng", 2]],
    build() {
      const v = [];
      const T2top = new Set(["STS", "LIFT2", "STW2"]);
      for (const z of R1) {
        if (z.core) { const covered = R2.some(o => !o.core && Math.max(0, Math.min(o.r[0] + o.r[2], z.r[0] + z.r[2]) - Math.max(o.r[0], z.r[0])) * Math.max(0, Math.min(o.r[1] + o.r[3], z.r[1] + z.r[3]) - Math.max(o.r[1], z.r[1])) > 1); v.push(core(z, 0.45, covered || z.id !== "CN" && z.id !== "CS" ? 4.95 : 6.55, /l|b/.test(z.core.st) ? "violet" : "warn")); continue; }
        v.push(roomBox(z, 0.45, 4.95, 1));
      }
      for (const z of R2) {
        if (z.core) { v.push(core(z, 4.95, T2top.has(z.id) ? 11.05 : 9.45, /l/.test(z.core.st) ? "violet" : "warn")); continue; }
        v.push(roomBox(z, 4.95, 9.45, 1));
      }
      const st = [];
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
