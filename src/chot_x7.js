/* ================= Ý tưởng X.7: Bản xếp của bạn, khít lại, sửa chỗ nhầm (file xep-khoi-arc329 (2).json, 07/11/2026) =================
   Giữ nguyên mọi khối của bản xếp: kích thước, tầng, mã phòng, không đổi chỗ phòng. Chỉ dời (tịnh tiến) các khối cho sát nhau,
   và sửa ba chỗ nhầm trong file: lõi sách tầng 2 còn nằm ở bàn nháp, thang bộ Bắc, mẩu vệ sinh thiếu nhi còn trong kho.
   Hành lang chỉ thêm ở chỗ thật cần để vào được phòng. Lỗi do chính cách xếp khối được giữ lại và liệt kê. */
(function (G) {
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const box = r => { const [x, y, w, h] = r; return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; };

  /* ---------- Tầng 1: các khối tầng 1 của bản xếp, đã dời cho khít ---------- */
  const R1 = [
    // cụm sự kiện phía Bắc (cả cụm dời xuống 0,44 m cho sát sảnh cà phê)
    { id: "D2", c: "D2", n: "Bục trình bày", r: [4.85, 16.44, 4.00, 5.63], ctl: "sk", nz: 3 },
    { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [4.80, 22.07, 4.05, 5.43], ctl: "sk", nz: 1 },
    { id: "D1", c: "D1", n: "Phòng đa năng", r: [8.85, 16.44, 16.93, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.8], ["D2", 2.4, "o"], ["D3", 1.2, "p"]] },
    { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [25.78, 16.55, 9.50, 7.11], ctl: "sk", nz: 2, seat: 24, d: [["N", 1.2, "tn", 0.5]] },
    { id: "WCP", c: "E5", n: "Vệ sinh công cộng, sự kiện (mở ngoài giờ)", r: [35.28, 16.62, 3.75, 7.04], ctl: "sk", nz: 1, wc: KT },
    { id: "CO3", c: "circ", n: "Hành lang sự kiện", r: [25.78, 23.66, 13.25, 5.25], ctl: "sk", nz: 2, occ: 30, d: [["D1", 2.4, "p", 0.6], ["D4", 1.8, "p"], ["WCP", 1.2, "p"], ["E", 1.6, "tn"]] },
    { id: "FOYA", c: "circ", n: "Sảnh sự kiện, cà phê", r: [28.65, 28.91, 4.00, 10.50], ctl: "sk", nz: 2, occ: 30, d: [["CO3", 2.4, "o"], ["A3", 1.8, "o"]] },
    { id: "A3", c: "A3", n: "Cà phê sách", r: [32.65, 29.04, 6.75, 10.37], ctl: "sk", nz: 3, seat: 32, d: [["E", 1.2, "tn", 0.5]] },
    // dải đón tiếp: A1 và A2 giờ sát nhau, không cần khe nối
    { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [18.65, 39.41, 10.00, 8.20], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.55], ["A2", 2.4, "o"], ["HA", 1.4, "k"]] },
    { id: "A2", c: "A2", n: "Trưng bày", r: [28.65, 39.41, 9.88, 8.20], ctl: "sk", nz: 2, occ: 30, d: [["FOYA", 2.4, "o", 0.5]] },
    // cột kho, nghiệp vụ phía Tây (dời sang Đông cho sát lõi thang Bắc)
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6.65, 38.79, 8.00, 4.00], ctl: "kho", nz: 1, core: { st: "u+l+b", link: "CS1" } },
    { id: "CN", n: "Thang bộ + thang máy Bắc (lên đọc tầng 2)", r: [14.65, 39.81, 4.00, 7.80], ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" } },
    { id: "C1", c: "C1", n: "Kho đóng", r: [6.48, 42.79, 8.17, 13.71], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"], ["C2", 1.2, "nv"]] },
    { id: "HA", c: "circ", n: "Lối vào quầy (khóa ngoài giờ)", r: [18.18, 47.61, 2.32, 14.01], ctl: "tv", nz: 2, d: [["A4", 1.8, "o", 0.85]] },
    { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14.65, 53.12, 3.53, 8.50], ctl: "tv", ctrl: 1, nz: 2, d: [["HB", 1.8, "o"], ["HL", 2.0, "o"], ["C2", 1.0, "nv"]] },
    { id: "HB", c: "circ", n: "Sảnh thang Bắc sau cổng từ", r: [14.65, 47.61, 3.53, 5.51], ctl: "tv", nz: 1, d: [["CN", 1.2, "thang"], ["C1", 1.0, "nv"]] },
    { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6.40, 56.50, 8.25, 7.82], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"]] },
    { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6.40, 64.32, 8.25, 3.94], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85]] },
    // sảnh thư viện sau cổng từ
    { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [14.65, 61.62, 8.00, 5.86], ctl: "tv", nz: 2, d: [["B3", 1.8, "p", 0.75], ["CN2", 1.4, "thang"], ["C4", 1.0, "nv"]] },
    { id: "CN2", n: "Thang máy Nam", r: [15.70, 67.48, 4.00, 7.80], ctl: "tv", nz: 1, core: { st: "l", link: "LS" } },
    { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [19.70, 67.48, 19.47, 8.50], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.6], ["WCB", 1.0, "p"]] },
    { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [34.92, 75.98, 4.25, 3.18], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
    { id: "CO2", c: "circ", n: "Hành lang nhân viên, vệ sinh", r: [12.70, 72.46, 3.00, 7.80], ctl: "nv", nz: 1, d: [["WCL1", 1.2, "p"], ["E1", 1.0, "nv"]] },
    { id: "WCL1", c: "E5", n: "Vệ sinh tầng 1 (nhân viên)", r: [8.23, 72.23, 4.47, 4.50], ctl: "nv", nz: 1, wc: KT, d: [["E6", 0.9, "nv"]] },
    { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [3.98, 72.23, 4.25, 4.50], ctl: "nv", nz: 1 },
    // dải văn phòng phía Nam
    { id: "E1", c: "E1", n: "Văn phòng", r: [9.45, 80.26, 9.50, 8.50], ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"], ["S", 1.0, "nv", 0.3]] },
    { id: "E2", c: "E2", n: "Phòng nhân viên", r: [18.95, 80.26, 4.70, 8.50], ctl: "nv", nz: 1 },
    { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [23.65, 80.26, 6.50, 8.50], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
    { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [30.15, 80.95, 5.25, 7.81], ctl: "kho", nz: 1, d: [["LC", 1.0, "nv"]] },
    { id: "LC", c: "circ", n: "Lối nhân viên", r: [35.40, 80.26, 4.00, 4.50], ctl: "nv", nz: 1, d: [["E", 1.2, "nv"], ["E3", 0.9, "nv"]] },
    { id: "E3", c: "E3", n: "Trực bảo vệ", r: [35.40, 84.76, 3.60, 4.20], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"]] },
    { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [4.45, 83.14, 3.00, 5.00], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["S", 1.2, "tnbd"]] }
  ];
  /* ---------- Tầng 2: các khối tầng 2 của bản xếp, đã dời cho khít, thêm lõi sách ---------- */
  const R2 = [
    { id: "CS2", n: "Lõi sách tầng 2 (thẳng lõi tầng 1)", r: [6.65, 38.79, 8.00, 4.00], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS1" }, d: [["B1b", 1.2, "thang"]] },
    { id: "STS", n: "Thang bộ Bắc", r: [14.65, 39.81, 4.33, 6.00], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["B1e", 1.4, "thang"], ["B1b", 1.2, "thang"], ["B1f", 1.4, "thang"]] },
    { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh)", r: [18.98, 38.79, 8.50, 9.27], ctl: "tv", nz: 1, top: N },
    { id: "B1b", c: "B1", n: "Đọc mở và kệ (góc Tây Bắc)", r: [5.65, 42.79, 9.00, 5.81], ctl: "tv", nz: 1, d: [["B5", 2.4, "o"]] },
    { id: "B1f", c: "B1", n: "Bàn đọc cá nhân", r: [14.65, 45.81, 4.00, 7.50], ctl: "tv", nz: 0, top: N, d: [["B5", 1.6, "o"], ["B6", 1.6, "o"]] },
    { id: "B5", c: "B5", n: "Tra cứu số", r: [4.00, 48.60, 10.65, 9.15], ctl: "tv", nz: 1, seat: 16, top: N, d: [["SpA", 2.4, "o"]] },
    { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [14.65, 53.31, 4.50, 11.89], ctl: "tv", nz: 1, steps: 4, top: N, d: [["SpA", 1.6, "o"]] },
    ...[["B4a", 59.80], ["B4c", 63.61], ["B4d", 67.42], ["B4b", 71.23]].map(([id, y], i) => ({ id, c: "B4", n: `Học nhóm ${i + 1}`, r: [4.13, y, 6.50, 3.81], ctl: "tv", nz: 2, top: N })),
    { id: "SpA0", c: "circ", n: "Hành lang đệm dưới tra cứu số", r: [4.13, 57.75, 6.50, 2.05], ctl: "tv", nz: 1, d: [["SpA", 2.0, "o"]] },
    { id: "SpA", c: "circ", n: "Hành lang học nhóm", r: [10.63, 57.75, 4.02, 10.09], ctl: "tv", nz: 2, d: [["B4a", 0.9, "p"], ["B4c", 0.9, "p"], ["SpB", 2.4, "o"]] },
    { id: "SpB", c: "circ", n: "Sảnh thang máy", r: [10.63, 67.84, 5.20, 6.29], ctl: "tv", nz: 1, d: [["B4d", 0.9, "p"], ["B4b", 0.9, "p"], ["LIFT2", 1.4, "thang"], ["LK", 1.4, "o"]] },
    { id: "LIFT2", n: "Thang máy Nam", r: [15.83, 67.38, 3.75, 8.00], ctl: "tv", nz: 1, core: { st: "l", link: "LS" }, d: [["B1a", 1.4, "thang"]] },
    { id: "B1a", c: "B1", n: "Đọc mở và kệ (trên thiếu nhi, Tây)", r: [19.58, 67.48, 8.75, 8.26], ctl: "tv", nz: 1, top: N, d: [["B1w", 2.4, "o"]] },
    { id: "B1w", c: "B1", n: "Đọc mở và kệ (trên thiếu nhi, Đông)", r: [28.33, 67.38, 12.00, 8.36], ctl: "tv", nz: 1, top: N },
    { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [4.13, 75.04, 4.00, 4.00], ctl: "tv", nz: 1, wc: KT },
    { id: "KW", c: "circ", n: "Lối vào vệ sinh", r: [8.13, 75.04, 2.50, 3.00], ctl: "tv", nz: 1, d: [["WCL2", 1.0, "p"], ["LK", 1.2, "o"]] },
    { id: "LK", c: "circ", n: "Hành lang xuống dải đọc Nam", r: [10.63, 74.13, 3.00, 6.25], ctl: "tv", nz: 1, d: [["B1m", 1.6, "o"]] },
    { id: "B1m", c: "B1", n: "Đọc mở và kệ (dải Nam)", r: [7.45, 80.38, 16.50, 8.41], ctl: "tv", nz: 1, top: N, d: [["B2", 2.0, "p"], ["STW2", 1.2, "thang"]] },
    { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [23.95, 80.41, 17.18, 8.38], ctl: "tv", nz: 0, seat: 40, top: N },
    { id: "STW2", n: "Thang thoát hiểm Tây Nam", r: [4.45, 82.64, 3.00, 6.00], ctl: "tv", nz: 1, core: { st: "u", link: "STW" } }
  ];
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: R1.map(z => box(z.r)), rooms: R1,
    staff: [
      { x: 23.6, y: 43.6, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.4, y: 57.4, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.2, y: 86.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36, y: 33, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30.3, y: 71.7, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10.5, y: 60.4, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 10.5, y: 66.3, t: "Nhận sách", sc: ["4"] },
      { x: 14.2, y: 84.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 30.6, y: 33, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 22, y: 21, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: R2.map(z => box(z.r)), rooms: R2,
    staff: [{ x: 9, y: 53, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX7", code: "X.7", name: "Bản xếp của bạn, khít lại, sửa chỗ nhầm", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [4.45, 8.85, 14.65, 18.65, 25.78, 28.65, 32.65, 39.4], y: [16.44, 23.66, 28.91, 39.41, 47.61, 53.12, 61.62, 67.48, 75.98, 80.26, 88.76] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 50, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[8, 89.5, 3.5, 5.5, 1], [11.5, 89.5, 3.5, 5.5, 1]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[2.2, 112], [2.2, 104], [2.2, 66.3], [6.2, 66.3]]],
        fire: [[[-3, -12], [2.2, -4], [2.2, 102]], [[2.2, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 33], [24, 33], [23.6, 38.9]]],
        event: [[[20, -9], [20, 6], [20, 33], [23.6, 38.9]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trước sảnh, cửa chính A1", event: "Khách sự kiện: từ quảng trường Bắc vào sân trước sảnh, cửa chính A1" },
      hatch: [box([8.85, 27.69, 19.8, 11.72]), box([22.65, 47.61, 16.5, 19.87])],
      labels: [[18, 33, "Sân trước sảnh"], [31, 57, "Sân giữa"], [2.4, 52, "Lối Tây 6 m (đầu Bắc, góc Tây Nam còn ~4–4,8 m)"], [17, 21, "Phòng đa năng"]]
    }
  };
  const ISSUES = [
    "Lối Tây: cột kho, nghiệp vụ đã dời ra x ≥ 6,4 m, nhưng bục D2, kho D3 (x 4,8), kho E6 (x 3,98) và thang Tây Nam (x 4,45) vẫn lấn lối Tây 6 m như bản xếp; ở hai đoạn đó lối còn khoảng 4–4,8 m.",
    "Tiếng ồn: phòng đọc tầng 2 B1a, B1w nằm ngay trên phòng thiếu nhi B3; phòng nhân viên E2 chung vách với phòng kỹ thuật E4 (đúng như bản xếp).",
    "Ánh sáng: quầy A4 kẹp giữa sảnh thang và lối vào quầy, xử lý C2 kẹp giữa kho đóng và tiếp nhận, đọc B1b tầng 2 kẹp giữa lõi sách và tra cứu số, nên không có cửa sổ Bắc hay Nam; cà phê A3 sát hành lang sự kiện nên cửa sổ Bắc bị che; dải đọc Nam tầng 2 che cửa sổ Nam của thiếu nhi B3 và cửa sổ Bắc của văn phòng E1.",
    "Vệ sinh: từ đọc B1e đầu Bắc tầng 2 tới vệ sinh tầng 2 đi 42 m (nên ≤ 35 m), từ sảnh A1 tới vệ sinh công cộng WCP đi 28 m (nên ≤ 25 m), vì bản xếp chỉ có một cụm vệ sinh mỗi đầu.",
    "Thoát nạn tầng 2: không có thang ở đầu Đông, góc Đông của đọc mở B1w còn xa thang.",
    "Diện tích, số chỗ: trưng bày A2 81 m² (−10%) chỉ đủ 27/30 khách, đọc yên tĩnh B2 144 m² (−10%) chỉ xếp được 39/40 chỗ, như bản xếp.",
    "Hình khối: khu đọc tầng 2 chưa chiếm phần lớn sàn; các hộp tầng 2 vẫn rời nhau ở vài chỗ (xem mục khe còn lại)."
  ];
  plan.intro = `<p class="lede">X.7 là bản xếp bạn gửi (file <b>xep-khoi-arc329 (2).json</b>), giữ nguyên mọi khối: kích thước, tầng, mã phòng, không đổi chỗ phòng nào. Mình chỉ dời các khối cho sát nhau (khe dưới 3 m giữa các khối giảm từ 38 chỗ còn vài chỗ không khép được), và sửa ba chỗ nhầm trong file: lõi sách tầng 2 bạn để trên bàn nháp nay đặt thẳng trên lõi sách tầng 1; thang tầng 1 dưới thang bộ Bắc tầng 2 dùng chính lõi thang CN (bạn đặt tên "Thang bộ + thang máy"); mẩu vệ sinh thiếu nhi trong kho nay đặt sát phòng thiếu nhi. Hành lang chỉ thêm ở vài chỗ thật cần để vào được phòng.</p>
<p><b>Chỗ bản xếp chưa đạt (giữ nguyên vì là cách xếp khối của bạn)</b></p><ul>${ISSUES.map(t => `<li>${t}</li>`).join("")}</ul>`;
  plan.notes = [
    "Đã dời cho khít (chỉ tịnh tiến, không đổi kích thước): cụm sự kiện (D1, D2, D3, D4, vệ sinh WCP, hành lang sự kiện) dời xuống 0,44 m cho sát sảnh cà phê; D4, WCP, hành lang sự kiện dời sang Tây 0,22–0,37 m cho sát phòng đa năng; cà phê A3 dời 0,32 m cho sát trưng bày; trưng bày A2 dời sang Tây 0,87 m cho sát sảnh A1; lõi thang Bắc CN và thang bộ Bắc tầng 2 dời sang Đông 0,65 m cho sát A1; cả cột Tây (lõi sách CS, kho C1, xử lý C2, tiếp nhận C4) và quầy A4 dời sang Đông 1,6–2,2 m cho sát lõi thang, đồng thời ra khỏi lối Tây; thang máy Nam tầng 1 dời 0,6 m cho sát hành lang, phòng thiếu nhi B3 dời sang Tây 0,83 m cho sát thang máy; dải văn phòng giữ nguyên, chỉ bảo vệ E3 dời 0,4 m sát lưu trữ C3. Tầng 2: đọc B1e, B1b, tra cứu B5, bàn đọc B1f, đọc linh hoạt B6, dãy học nhóm, vệ sinh tầng 2 dời 0,1–3,5 m cho sát nhau (so với bản xếp gốc), thang máy Nam tầng 2 dời 1,45 m cho thẳng thang tầng 1, đọc B1a, B1w dời theo 0,93 m.",
    "Sửa chỗ nhầm trong file: (1) lõi sách tầng 2 (thang bộ, thang máy, tời sách) bạn để trên bàn nháp: đặt thẳng trên lõi sách tầng 1 (xoay 8 × 4 m cho trùng khuôn), sách lên thẳng kho đóng C1 → lõi sách → đọc tầng 2. Để chừa chỗ, đọc B1b, tra cứu B5, bốn phòng học nhóm và vệ sinh tầng 2 dời xuống khoảng 3 m; giữa tra cứu số và học nhóm giữ lại khe 2 m như bản xếp gốc, làm hành lang đệm cho học nhóm không chung vách với tra cứu số. (2) Thang bộ Bắc tầng 2 trong bản xếp không có thang tầng 1 bên dưới; khối CN tầng 1 bạn đặt tên \"Thang bộ + thang máy\" nằm đúng dưới nó, nên mình coi CN là thang bộ + thang máy Bắc nối lên thang bộ tầng 2 (khối thang bộ thừa trong kho không cần đặt thêm). CN mở vào sảnh thang sau cổng từ, không mở ra sảnh A1, để người đọc không lên tầng 2 mà không qua quầy A4. (3) Mẩu vệ sinh 13,5 m² trong kho đặt sát mép Nam, đầu Đông phòng thiếu nhi B3 làm vệ sinh thiếu nhi, thay tã (đầu Đông để không che cửa sổ phòng nhân viên E2).",
    "Khe còn lại: (a) giữa thang thoát hiểm Tây Nam và văn phòng E1 tầng 1 còn 2 m, vì thang tầng 1 phải thẳng thang tầng 2, mà thang tầng 2 đã sát đọc B1m; dời cả dải văn phòng 2 m thì lệch mặt Đông. (b) Giữa cà phê A3 và hành lang sự kiện còn 0,13 m, vì A3 ngắn hơn sảnh cà phê bên cạnh 0,13 m; muốn khít phải kéo dài A3. (c) Tầng 2: giữa đọc linh hoạt B6 và thang máy Nam còn khoảng 2,2 m, giữa bàn đọc B1f và đọc B1e còn 0,33 m: cột giữa tầng 2 (thang bộ Bắc, B1f, B6, thang máy Nam) dài hơn tổng các khối 2,2 m, mà hai đầu là thang phải thẳng tầng 1. (d) Ô trống giữa tiếp nhận C4 và hành lang nhân viên ở tầng 1 (khoảng 3 × 4 m) để nguyên, vì không có khối nào cỡ đó.",
    "Hành lang thêm (ít nhất có thể): tầng 1 có lối vào quầy HA (từ A1, khóa ngoài giờ), sảnh thang Bắc HB và sảnh thư viện HL sau cổng từ; tầng 2 có hành lang đệm SpA0 dưới tra cứu số (chính là khe 2 m bạn chừa), hành lang học nhóm SpA, sảnh thang máy SpB và lối vào vệ sinh KW. Các hành lang có sẵn trong bản xếp (hành lang sự kiện, sảnh cà phê, hành lang vệ sinh, lối nhân viên, hành lang xuống dải đọc Nam) giữ nguyên. Khe nối giữa A1 và trưng bày ở X.1 không còn cần vì hai phòng đã sát nhau.",
    "Đi qua khối A: cửa chính ở mặt Bắc sảnh A1. Khách sự kiện từ A1 sang trưng bày A2, sảnh cà phê, hành lang sự kiện tới phòng đa năng, chuyên đề, cà phê. Người đọc từ A1 qua lối vào quầy tới quầy gửi đồ, mượn trả A4 có cổng từ; sau quầy, phía Bắc là sảnh thang Bắc lên tầng 2, phía Nam là sảnh thư viện tới phòng thiếu nhi và thang máy Nam.",
    "Ngoài giờ: mở sảnh A1, trưng bày, sảnh cà phê, hành lang sự kiện, phòng đa năng, chuyên đề, cà phê và vệ sinh công cộng WCP. Chỉ khóa cửa từ A1 vào lối vào quầy."
  ];

  /* ---------- khối 3D: dựng thẳng từ các khối ---------- */
  const { B, col } = G.K;
  const MAT = { A: "ribbon", B: "sheet", C: "deck", D: "gold", E: "stone" };
  const roomBox = (z, z0, z1, fl) => { const [x, y, w, h] = z.r, k = (z.c || "")[0], m = MAT[k] || "glass"; return B(x, y, w, h, z0, z1, m, MAT[k] ? k : "L", { fl, role: k === "B" ? "m" : "p" }); };
  const core = (z, z0, z1, c) => { const [x, y, w, h] = z.r; return B(x, y, w, h, z0, z1, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotX7", fam: "chot", code: "X.7", from: "bản xếp của bạn", name: "Bản xếp của bạn, khít lại, sửa chỗ nhầm", rule: "Giữ nguyên mọi khối, chỉ dời cho khít, sửa lõi sách và thang",
    tag: "Bản xếp gửi ngày 07/11, các khối dời cho sát nhau; lõi sách và thang bộ Bắc đi thẳng hai tầng",
    story: "Vẫn là hình khối bạn tự xếp: cụm sự kiện phía Bắc, dải đón tiếp giữa, cột kho phía Tây, dải văn phòng phía Nam; tầng 2 là vòng đọc chữ U trên cột Tây và dải Nam. Các khối được đẩy cho sát nhau, lõi sách và thang Bắc thành hai lõi đứng thẳng xuyên hai tầng.",
    why: [["Quy luật hình khối", "Các hộp chữ nhật xếp theo ba dải Đông – Tây (sự kiện, đón tiếp, văn phòng) và một cột kho dọc phía Tây; tầng 2 vòng chữ U."], ["Khối chính – khối phụ", "Khu đọc tầng 2 và phòng thiếu nhi là khối chính; cụm sự kiện một tầng phía Bắc là khối phụ."], ["Hai lõi", "Lõi sách và thang Bắc đứng sát nhau ở bản lề giữa cột kho và sảnh, đi thẳng hai tầng."]],
    kc: { he: "Khung bê tông lưới cột theo các khối; phòng đa năng dầm ứng lực trước nhịp 11,25 m; các hộp tầng 2 tựa trên khối tầng 1 bên dưới.", nhip: "11,25 m (phòng đa năng)", cx: "Một số hộp tầng 2 nhô ngoài khối tầng 1 (học nhóm, tra cứu số), đều dưới 4 m" },
    qa: [["Khác X.1 chỗ nào?", "X.1 giữ khối đúng chỗ và lấp khe bằng hành lang; X.7 dời khối cho sát nhau, không đổi kích thước, và sửa ba chỗ nhầm trong file (lõi sách tầng 2, thang Bắc, vệ sinh thiếu nhi)."], ["Lên tầng 2 bằng gì?", "Sau quầy A4: thang bộ + thang máy Bắc (CN) ngay sau quầy, hoặc thang máy Nam ở sảnh thư viện; sách lên bằng lõi sách cạnh kho đóng."]],
    cut: "Theo đúng các khối của bản xếp: khối sự kiện vàng, đón tiếp gạch, kho gỗ, văn phòng đá tối, khu đọc trắng; thang cam, thang máy tím nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng` };
    },
    lab: [[30, 72, 11.4, "Khối chính · Khu đọc tầng 2 và thiếu nhi", 1], [17, 21, 6.2, "Khối phụ · Cụm sự kiện", 2], [23.6, 43.5, 6.2, "Sảnh đón tiếp A1", 2], [10.5, 55, 6.2, "Cột kho Tây", 2], [20, 84, 6.2, "Dải văn phòng", 2]],
    build() {
      const v = [];
      const up = new Set(R2.filter(z => z.core).map(z => z.core.link));
      for (const z of R1) {
        if (z.core) { v.push(core(z, 0.45, up.has(z.core.link) ? 4.95 : 6.55, /l|b/.test(z.core.st) ? "violet" : "warn")); continue; }
        v.push(roomBox(z, 0.45, 4.95, 1));
      }
      for (const z of R2) {
        if (z.core) { v.push(core(z, 4.95, 11.05, /l/.test(z.core.st) ? "violet" : "warn")); continue; }
        v.push(roomBox(z, 4.95, 9.45, 1));
      }
      return { v, st: [] };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
