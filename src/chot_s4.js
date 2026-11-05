/* ================= Ý tưởng S.4: Chồng ba hộp xoay (khối vuông xếp đơn giản, 3 tầng) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp 1 (tầng 1): hộp dài Bắc – Nam 32 × 52 m, phần Bắc là đón tiếp + sự kiện, phần Nam là thiếu nhi + nghiệp vụ, cả hai lấy sáng mái;
  // giữa hộp 1 là dải kho, lõi thang (không cần cửa sổ), bị hộp 2 phủ lên.
  // hộp 2 (tầng 2): thanh Đông – Tây 32 × 16 m vắt ngang giữa hộp 1, cửa sổ hai mặt Bắc, Nam.
  // hộp 3 (tầng 3): hộp đọc 32 × 20 m đè lên hộp 2, đua 2 m hai phía, mái răng cưa kính hướng Bắc.
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const H1 = R4(6, 12, 32, 52), H2 = R4(6, 34, 32, 16), H3 = R4(6, 32, 32, 20), GARDEN = R4(26, 64, 12, 6);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1: hộp 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [H1],
    rooms: [
      // phần Bắc (lấy sáng mái răng cưa): sảnh đón tiếp là cửa vào duy nhất, từ đó sang sự kiện hoặc qua quầy vào thư viện
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 12, 6.25, 12], ctl: "sk", nz: 2, seat: 24, top: N, d: [["W", 1.2, "tn", 0.3]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [12.25, 12, 7, 12], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["N", 2.4, "chinh", 0.5], ["FE", 2.4, "o", 0.15]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [19.25, 12, 15.15, 12], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["N", 1.8, "tn", 0.25], ["N", 1.8, "tn", 0.75]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [34.4, 12, 2.1, 12], ctl: "sk", nz: 3, d: [["D1", 3, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [36.5, 12, 1.5, 12], ctl: "sk", nz: 1, d: [["D2", 1.0, "p"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh, sự kiện", r: [6, 24, 4, 6.25], ctl: "sk", nz: 1, wc: KT },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 30.25, 4, 3.75], ctl: "nv", nz: 1, top: N, d: [["W", 0.9, "nv"]] },
      { id: "FE", c: "circ", n: "Sảnh sự kiện", r: [10, 24, 19, 4], ctl: "sk", nz: 2, occ: 60, d: [["D4", 1.2, "p"], ["D1", 1.8, "p"], ["WCE", 1.2, "p"], ["A3", 2.4, "o"], ["A4", 1.8, "k", 0.8], ["A2", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [10, 28, 11.67, 6], ctl: "sk", nz: 3, seat: 32, top: N, bar: [[10.4, 34], [21.3, 34], 12], d: [["KCF", 1.2, "p"]] },
      { id: "KCF", c: "circ", n: "Quầy, chuẩn bị, rửa (cà phê)", r: [21.67, 28, 2.33, 6], ctl: "sk", nz: 2 },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [24, 28, 5, 6], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["LH", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [29, 24, 9, 10], ctl: "sk", nz: 2, occ: 30, top: N, d: [["E", 1.6, "tn", 0.5]] },
      // dải giữa dưới hộp 2 (không cần cửa sổ): thang, kho, lõi sách, sảnh khu đọc, kỹ thuật
      { id: "STW", n: "Thang bộ Tây", r: [6, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["W", 1.2, "tnbd"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 42, 4, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.45], ["W", 1.0, "nv", 0.88], ["KD", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [10, 34, 10, 12], ctl: "kho", nz: 1, d: [["CL", 1.2, "nv"], ["KD", 1.2, "nv"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [20, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["LH", 2.0, "o"], ["KCL", 1.6, "o"]] },
      { id: "KCL", c: "circ", n: "Sảnh thang máy", r: [20, 42, 4, 4], ctl: "tv", nz: 1, d: [["LH", 1.6, "o"]] },
      { id: "KD", c: "circ", n: "Hành lang nghiệp vụ", r: [10, 46, 14, 4], ctl: "nv", nz: 1, d: [["LH", 1.2, "nv"], ["C2", 1.6, "nv"]] },
      { id: "LH", c: "circ", n: "Sảnh khu đọc (sau cổng từ)", r: [24, 34, 5, 16], ctl: "tv", nz: 1, d: [["B3", 1.8, "p"], ["WCB", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [29, 34, 9, 6.11], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [29, 40.11, 9, 2.22], ctl: "nv", nz: 1, d: [["LH", 1.0, "nv"], ["E", 0.9, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [29, 42.33, 9, 4.44], ctl: "kho", nz: 1, d: [["LH", 1.0, "nv"]] },
      { id: "KE", c: "circ", n: "Lối kỹ thuật Đông", r: [29, 46.77, 9, 3.23], ctl: "nv", nz: 1, d: [["E", 1.2, "nv"]] },
      // phần Nam (lấy sáng mái): nghiệp vụ, nhân viên, thiếu nhi
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 50, 6, 7], ctl: "nv", nz: 1, top: N },
      { id: "KS", c: "circ", n: "Lối nhân viên", r: [12, 50, 2, 7], ctl: "nv", nz: 1, d: [["KD", 1.2, "nv"], ["E2", 1.0, "nv"], ["E1", 1.0, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [14, 50, 10, 7], ctl: "nv", nz: 1, top: N, d: [["KS2", 1.2, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [24, 50, 2, 8], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["B3", 0.9, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [26, 50, 12, 14], ctl: "tv", nz: 3, seat: 32, top: N, d: [["S", 1.4, "tnbd", 0.5]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 57, 12, 7], ctl: "nv", nz: 0, top: N },
      { id: "KS2", c: "circ", n: "Sảnh nhân viên, cửa ra vườn sau", r: [18, 57, 6, 7], ctl: "nv", nz: 1, d: [["E1", 1.0, "nv"], ["S", 1.0, "nv"]] },
      { id: "KB3", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [24, 58, 2, 6], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] }
    ],
    staff: [
      { x: 15.75, y: 18, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 26.5, y: 31, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 8, y: 32, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 15, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 32, y: 57, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 19, y: 53.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 46, t: "Nhận sách", sc: ["4"] },
      { x: 12, y: 60.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 20, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 31, y: 18, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 9, y: 18, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2: hộp 2, thanh Đông – Tây sâu 16 m, cửa sổ Bắc và Nam ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [H2],
    rooms: [
      { id: "STW", n: "Thang bộ Tây", r: [6, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["B1w", 1.2, "thang"], ["B6", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [10, 34, 6.25, 8], ctl: "tv", nz: 1, steps: 6, d: [["B1w", 2.4, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [16.25, 34, 3.75, 4.27], ctl: "tv", nz: 1, wc: KT, d: [["KW", 1.0, "p"]] },
      { id: "KW", c: "circ", n: "Sảnh vệ sinh", r: [16.25, 38.27, 3.75, 3.73], ctl: "tv", nz: 1, d: [["B1w", 1.6, "o"], ["CL", 1.2, "o"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [20, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["LC2", 1.6, "o"], ["LND", 1.6, "o"]] },
      { id: "LND", c: "circ", n: "Sảnh tra cứu", r: [24, 34, 1.5, 8], ctl: "tv", nz: 1, d: [["B5", 1.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [25.5, 34, 12.5, 8], ctl: "tv", nz: 1, seat: 16 },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (dải Nam)", r: [6, 42, 14, 8], ctl: "tv", nz: 1, shelf: 0.4, d: [["LC2", 1.6, "o"]] },
      { id: "LC2", c: "circ", n: "Sảnh dưới lõi", r: [20, 42, 2.6, 8], ctl: "tv", nz: 1, d: [["HB", 1.2, "p"]] },
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [22.6, 42, 15.4, 1.5], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [22.6 + 3.85 * i, 43.5, 3.85, 6.5], ctl: "tv", nz: 2, d: [["HB", 0.9, "p"]] }))
    ],
    staff: [{ x: 13, y: 38, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  /* ---------- Tầng 3: hộp 3, hộp đọc lấy sáng mái răng cưa hướng Bắc ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [H3],
    rooms: [
      { id: "WCL3", c: "E5", n: "Vệ sinh tầng 3", r: [6, 32, 4, 2], ctl: "tv", nz: 1, wc: KT, d: [["B1t", 0.9, "p"]] },
      { id: "STW", n: "Thang bộ Tây", r: [6, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["B1t", 1.2, "thang"], ["B2", 1.2, "thang"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (Tây Bắc)", r: [10, 32, 10, 10], ctl: "tv", nz: 1, shelf: 0.4, top: N, d: [["B2", 1.4, "p"]] },
      { id: "LND3", c: "circ", n: "Sảnh thang tầng 3", r: [20, 32, 4, 2], ctl: "tv", nz: 1, d: [["B1t", 1.4, "o"], ["B1u", 1.4, "o"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [20, 34, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["LND3", 1.6, "o"], ["B1t", 1.6, "o"], ["B1u", 1.6, "o"]] },
      { id: "B1u", c: "B1", n: "Đọc mở nhìn sông (Đông Bắc)", r: [24, 32, 14, 10], ctl: "tv", nz: 1, top: N, d: [["B1v", 2.4, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (Tây Nam)", r: [6, 42, 16.6, 10], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "B1v", c: "B1", n: "Đọc mở và bàn dài (Đông Nam)", r: [22.6, 42, 15.4, 10], ctl: "tv", nz: 1, shelf: 0.3, top: N }
    ],
    staff: []
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS4", code: "S.4", name: "Chồng ba hộp xoay", from: "khối vuông",
    levels: [t1, t2, t3],
    grid: { x: [6, 10, 14, 20, 24, 29, 38], y: [12, 24, 34, 42, 50, 57, 64] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 8, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 46], [5.2, 46]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 8], [15.75, 8], [15.75, 11.5]]],
        event: [[[20, -9], [15.75, 3], [15.75, 11.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông lên quảng trường Bắc, vào sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, vào sảnh đón tiếp" },
      hatch: [GARDEN],
      labels: [[32, 67, "Vườn thiếu nhi"], [22, 9, "Quảng trường Bắc"]]
    }
  };
  plan.intro = `<p class="lede">Ba hộp chữ nhật chồng lên nhau, mỗi hộp xoay một chiều, không trang trí. Hộp 1 (tầng 1) dài theo hướng Bắc – Nam: đầu Bắc là đón tiếp và sự kiện, đầu Nam là thiếu nhi và nghiệp vụ, cả hai lấy sáng mái răng cưa hướng Bắc; dải giữa là kho, lõi thang. Hộp 2 (tầng 2) là thanh Đông – Tây sâu 16 m vắt ngang giữa hộp 1, cửa sổ hai mặt Bắc, Nam. Hộp 3 (tầng 3) là hộp đọc 32 × 20 m đè lên hộp 2, đua 2 m mỗi phía làm ô văng, mái răng cưa kính hướng Bắc. Lõi thang tím và cam xuyên cả ba hộp, nhô lên khỏi mái.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: chỉ có một cửa vào, ở sảnh đón tiếp mở ra quảng trường Bắc. Từ sảnh vào sảnh sự kiện: phòng đa năng, chuyên đề, trưng bày, cà phê, vệ sinh. Quầy gửi đồ, mượn trả có cổng từ cũng mở từ sảnh sự kiện, ngay cạnh cà phê; qua quầy mới tới sảnh khu đọc.",
    "Thư viện luôn đi qua A, kể cả thiếu nhi: phòng thiếu nhi ở đầu Nam tầng 1 chỉ mở từ sảnh khu đọc (sau cổng từ), có vệ sinh thay tã liền kề; cửa ra vườn có tường bao là cửa có chuông báo.",
    "Thang có hệ quả: lõi tím (thang bộ + thang máy + tời sách) mở vào sảnh khu đọc sau cổng từ; thang cam phía Tây ở tầng 1 chỉ có cửa chuông báo ra lối Tây, không có cửa nào từ sảnh hay sự kiện. Khu sự kiện một tầng, không có thang lên khu đọc. Cả hai thang lên tới tầng 3.",
    "Đường sách gọn: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → kho đóng → tời sách (cửa thẳng từ kho vào lõi) → kệ tầng 2, tầng 3 ngay trên. Xử lý nghiệp vụ ở đầu Nam, mở ra hành lang nghiệp vụ. Sách trả: quầy → sảnh khu đọc → cửa nhân viên → hành lang nghiệp vụ → xử lý.",
    "Vệ sinh: vệ sinh sảnh, sự kiện ở góc sảnh sự kiện; trong khu đọc có vệ sinh thay tã cạnh thiếu nhi ở tầng 1, vệ sinh tầng 2 cạnh lõi, vệ sinh tầng 3 ở góc Tây Bắc.",
    "Ánh sáng: đầu Bắc và đầu Nam hộp 1 lấy sáng mái răng cưa (không bị hộp nào đè lên); dải giữa hộp 1 chỉ là kho, lõi, kỹ thuật. Hộp 2 sâu 16 m, mọi phòng chạm mặt Bắc hoặc Nam, có ô văng 2 m của hộp 3. Hộp 3 ở trên cùng, cả sàn lấy sáng mái. Mặt Đông, Tây đặc.",
    "Yên tĩnh: đọc yên tĩnh ở tầng 3, góc Tây Nam, nằm trên phòng đọc tầng 2 (không trên học nhóm), không có phòng ồn cùng tầng. Học nhóm ở dải Nam tầng 2 có hành lang riêng, ngăn với tra cứu số bằng hành lang. Văn phòng, phòng nhân viên ở đầu Nam tầng 1, ngăn với thiếu nhi bằng vệ sinh và kho.",
    "Ngoài giờ: mở phần Bắc hộp 1 (đón tiếp, sự kiện, cà phê, trưng bày, vệ sinh); chỉ khóa cửa sảnh sự kiện → quầy gửi đồ. Phòng đa năng có hai cửa thoát ra quảng trường Bắc.",
    "Kết cấu: lưới cột 8 m; hộp 2 tựa trên dải tường, cột của dải giữa hộp 1; hộp 3 đua 2 m hai phía trên dầm công xôn. Phòng đa năng dầm thép nhịp 12 m."
  ];
  /* ---------- khối 3D ---------- */
  const { B, PO, col } = G.K;
  const teeth = (x, y0, w, y1, base, rise, role) => {
    const o = [];
    for (let y = y0; y < y1 - 0.5; y += 4) {
      const h = Math.min(4, y1 - y), yy = y;
      o.push(PO(R4(x, y, w, h), base, (xv, yv) => base + rise * (1 - (yv - yy) / 4), "sheet", "X", { top: "grass", role }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, base, base + rise - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotS4", fam: "chot", code: "S.4", from: "khối vuông", name: "Chồng ba hộp xoay", rule: "Ba hộp chữ nhật chồng lên nhau, mỗi hộp xoay một chiều",
    tag: "Hộp 1 dài Bắc – Nam (đón tiếp, sự kiện, thiếu nhi, nghiệp vụ), hộp 2 thanh Đông – Tây vắt ngang, hộp 3 hộp đọc mái răng cưa trên cùng",
    story: "Ba hộp đơn giản chồng lên nhau như ba quyển sách đặt chéo: quyển dưới dài theo khu đất, quyển giữa nằm ngang, quyển trên cùng to bản nhất là sàn đọc lấy sáng mái. Khách vào từ quảng trường Bắc, gặp sảnh đón tiếp trước tiên; người đọc qua quầy gửi đồ rồi đi thang máy lên các tầng đọc.",
    why: [["Quy luật hình khối", "Chồng và xoay: ba hộp chữ nhật, mỗi hộp đổi chiều dài so với hộp dưới, lộ ra ở mép."], ["Khối chính – khối phụ", "Hộp 2 và hộp 3 (thư viện) cao tới +15,55 cả răng cưa; phần Bắc hộp 1 (sự kiện) chỉ một tầng."], ["Nắng và chói", "Kính mái răng cưa quay Bắc; hộp 2 có ô văng 2 m của hộp 3; mặt Đông, Tây đặc."], ["Đi lại", "Quầy, sảnh khu đọc, lõi sách, kho đóng, tiếp nhận nằm liền nhau ở giữa hộp 1."]],
    kc: { he: "Khung bê tông lưới 8 m. Hộp 2 tựa lên dải tường, cột của dải giữa hộp 1; hộp 3 đua 2 m hai phía trên dầm công xôn. Răng cưa vì kèo thép nhẹ mỗi 4 m. Phòng đa năng dầm thép nhịp 12 m.", nhip: "12 m (phòng đa năng), 8 m (lưới)", cx: "Không, phần đua chỉ 2 m" },
    qa: [["Ba tầng có làm khu đọc xa kho?", "Không: tời sách trong lõi tím đi thẳng từ kho đóng tầng 1 lên kệ tầng 2 và tầng 3, quãng đường dưới 35 m."], ["Thiếu nhi có lối riêng không?", "Không: chỉ vào từ sảnh khu đọc sau cổng từ; cửa ra vườn có chuông báo, vườn có tường bao."]],
    cut: "Tỉ lệ 1:200. Hộp 1 foam xám đá, hộp 2 foam đỏ gạch, hộp 3 ván gỗ balsa với mái răng cưa foam tam giác dán giấy cỏ; lõi thang foam tím và cam xuyên qua ba hộp.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 42, 15.6, "Khối chính · Hộp 3: sàn đọc mái răng cưa", 1], [30, 42, 9.5, "Hộp 2: thanh đọc Đông – Tây", 1], [22, 18, 6.4, "Khối phụ · Hộp 1: đón tiếp, sự kiện", 2], [22, 38, 17, "Lõi sách", 2]],
    build() {
      const v = [
        B(20, 34, 4, 8, 0.45, 16.55, "violet", "X", { top: "violet", lv: 0 }),
        B(6, 34, 4, 8, 0.45, 15.55, "warn", "X", { top: "warn", lv: 0 }),
        B(6, 12, 32, 22, 0.45, 4.95, "stone", "D", { fl: 1, role: "p" }),
        B(6, 34, 32, 30, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(6, 34, 32, 16, 4.95, 9.45, "ribbon", "B", { fl: 1, role: "m" }),
        B(6, 32, 32, 20, 9.45, 13.95, "deck", "B", { fl: 1, role: "m" }),
        // tường thấp bao vườn thiếu nhi
        B(26, 69.85, 12, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(26, 64, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(37.7, 64, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }),
        ...teeth(6, 32, 32, 52, 13.95, 1.6, "m"),
        ...teeth(6, 12, 32, 34, 4.95, 1.2, "p"),
        ...teeth(6, 50, 32, 64, 4.95, 1.2, "m")
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38]) for (const y of [12, 18, 24, 34, 42, 50, 57, 64]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
