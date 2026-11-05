/* ================= Ý tưởng H.9: Hộp đọc lớn đặt trên các hộp nhỏ (đi lại gọn, lõi sách ở giữa) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // tầng 2 là một hộp đọc gỗ lớn 32 × 32 m lấy sáng răng cưa hướng Bắc; bên dưới là các hộp nhỏ khác màu:
  // hộp gạch sự kiện và hộp kính đón tiếp ở phía Bắc (một tầng, lấy sáng mái), dải trắng phía Bắc và dải xanh phía Nam
  // dưới hộp đọc (sâu 8 m, lấy sáng mặt ngoài), hộp đá kho sách, hộp tím lõi sách ở giữa, hộp xám kỹ thuật, sân có mái.
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const EV = R4(6, 14, 32, 16), HUB = R4(6, 30, 32, 8), LK = R4(19.2, 38, 3.8, 4), NR = R4(6, 42, 32, 8);
  const CB = R4(6, 50, 13, 16), KB = R4(19, 50, 6, 16), SB = R4(31, 50, 7, 11), NCE = R4(25, 50, 6, 2), SCE = R4(25, 64, 13, 2), SR = R4(6, 66, 32, 8), TOP = R4(6, 42, 32, 32);
  const COURT = [[25, 52], [31, 52], [31, 61], [38, 61], [38, 64], [25, 64]], GARDEN = R4(17.5, 74, 20.5, 6), GAP = R4(6, 38, 32, 4);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, HUB, LK, NR, CB, KB, SB, NCE, SCE, SR],
    rooms: [
      // hộp gạch sự kiện (một tầng, răng cưa): chạy được ngoài giờ
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 14, 6.25, 12], ctl: "sk", nz: 2, seat: 24, top: N, d: [["FE", 1.4, "p"]] },
      { id: "WCE2", c: "E5", n: "Vệ sinh khu sự kiện", r: [6, 26, 6.25, 4], ctl: "sk", nz: 1, wc: KT, d: [["FE", 1.2, "p"]] },
      { id: "FE", c: "circ", n: "Sảnh sự kiện", r: [12.25, 14, 6.75, 16], ctl: "sk", nz: 2, occ: 60, d: [["D3", 1.2, "p"], ["A2", 2.4, "o"], ["A1", 2.4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [19, 14, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 3, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [19, 20.25, 4, 4.75], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [23, 14, 15, 11], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.6], ["E", 1.6, "tn", 0.5], ["A2", 1.8, "p", 0.3], ["A2", 1.8, "p", 0.8]] },
      { id: "A2", c: "A2", n: "Trưng bày (dải kính dọc hộp sự kiện)", r: [19, 25, 19, 5], ctl: "sk", nz: 2, occ: 30, top: N },
      // hộp kính đón tiếp (một tầng, răng cưa): cửa vào duy nhất
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh", r: [6, 30, 3.2, 8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.2, "p"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [9.2, 30, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["S", 2.4, "chinh", 0.45], ["A4", 1.8, "k"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [19.2, 30, 3.8, 8], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["LK", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [23, 30, 9, 8], ctl: "sk", nz: 3, seat: 32, top: N, d: [["A2", 2.4, "o"], ["KCF", 1.2, "p"], ["S", 1.6, "tn"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [32, 30, 6, 2.5], ctl: "nv", nz: 1, top: N, d: [["E", 0.9, "nv"]] },
      { id: "KCF", c: "circ", n: "Quầy, chuẩn bị, rửa (cà phê)", r: [32, 32.5, 6, 5.5], ctl: "sk", nz: 2 },
      // cầu kính qua khe gió, chỉ nối quầy kiểm soát với khu đọc
      { id: "LK", c: "circ", n: "Cầu kính vào khu đọc", p: LK, ctl: "tv", nz: 1, d: [["LH", 2.4, "o"]] },
      // dải trắng phía Bắc dưới hộp đọc (sâu 8 m, cửa sổ hướng Bắc)
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 42, 8.5, 8], ctl: "nv", nz: 1, d: [["E2", 1.0, "nv"], ["C4", 1.2, "nv"], ["C1", 1.2, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [14.5, 42, 4.7, 8], ctl: "nv", nz: 1, d: [["LH", 1.0, "nv"], ["C1", 1.0, "nv"]] },
      { id: "LH", c: "circ", n: "Sảnh khu đọc", r: [19.2, 42, 3.8, 8], ctl: "tv", nz: 1, d: [["CL", 2.0, "o"], ["B5", 1.6, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [23, 42, 12, 8], ctl: "tv", nz: 1, seat: 16, d: [["CS", 1.2, "thang"]] },
      { id: "CS", n: "Thang bộ Đông", r: [35, 42, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "CS" }, d: [["E", 1.2, "tnbd"]] },
      // hộp đá kho sách
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 50, 5, 6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["W", 1.0, "nv", 0.1], ["C1", 1.2, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 56, 5, 8], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "KD", c: "circ", n: "Lối nhân viên", r: [6, 64, 5, 2], ctl: "nv", nz: 1, d: [["C3", 1.0, "nv"], ["C1", 1.0, "nv"], ["E1", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [11, 50, 8, 16], ctl: "kho", nz: 1, d: [["CL", 1.2, "nv"]] },
      // hộp tím: lõi thang bộ + thang máy + tời sách, vệ sinh, xuyên qua hộp đọc
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [19, 50, 6, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["LC", 1.6, "o"]] },
      { id: "LC", c: "circ", n: "Sảnh dưới lõi", r: [19, 57, 6, 4.67], ctl: "tv", nz: 1, d: [["LCb", 1.6, "o"]] },
      { id: "LCb", c: "circ", n: "Lối xuống thiếu nhi", r: [19, 61.67, 3, 4.33], ctl: "tv", nz: 1, d: [["WCL1", 1.0, "p"], ["B3", 1.8, "p"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [22, 61.67, 3, 4.33], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      // hai hiên kín ngăn sân có mái với các phòng đọc (phòng đọc không mở cửa sổ ra sân dưới sàn tầng 2)
      { id: "NC", c: "circ", n: "Hiên tra cứu số (kín)", r: [25, 50, 6, 2], ctl: "tv", nz: 1, d: [["B5", 1.4, "p"], ["CL", 1.2, "o"]] },
      { id: "SC", c: "circ", n: "Hiên thiếu nhi (kín)", r: [25, 64, 13, 2], ctl: "tv", nz: 2, d: [["B3", 2.4, "o"]] },
      { id: "KHO", c: "circ", n: "Kho đồ chơi, xe đẩy (đệm với văn phòng)", r: [15.5, 66, 2, 8], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      // hộp xám kỹ thuật trong sân có mái
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [31, 50, 7, 8], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [31, 58, 7, 3], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"]] },
      // dải xanh phía Nam dưới hộp đọc (sâu 8 m, cửa sổ hướng Nam)
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 66, 9.5, 8], ctl: "nv", nz: 0, d: [["S", 1.0, "nv"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [17.5, 66, 20.5, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.4, "tnbd", 0.7]] }
    ],
    staff: [
      { x: 14, y: 35, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 21, y: 34, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 35, y: 31.2, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 35, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 26, y: 70, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 46, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8.5, y: 53, t: "Nhận sách", sc: ["4"] },
      { x: 10.5, y: 70, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 15.5, y: 25, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 21, y: 17, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 9, y: 20, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2: hộp đọc gỗ lớn, mái răng cưa kính hướng Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [TOP],
    rooms: [
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [19, 50, 6, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["B1h", 2.0, "o"], ["B1e2", 1.6, "o"], ["LC1", 2.0, "o"]] },
      { id: "CS", n: "Thang bộ Đông", r: [35, 42, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "CS" }, d: [["B1e", 1.2, "thang"]] },
      // góc Tây Bắc: đọc yên tĩnh, xa học nhóm và không nằm trên phòng thiếu nhi (bên dưới là xử lý, kho)
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Tây Bắc)", r: [6, 42, 13, 12.3], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1h", 1.4, "p"]] },
      { id: "B1h", c: "B1", n: "Sảnh đọc, sách mới", r: [19, 42, 6, 8], ctl: "tv", nz: 1, top: N, d: [["B1e", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở nhìn sông", r: [25, 42, 10, 8], ctl: "tv", nz: 1, top: N },
      { id: "B1e2", c: "B1", n: "Kệ sách và bàn đọc (Đông)", r: [25, 50, 13, 8], ctl: "tv", nz: 1, shelf: 0.4, top: N, d: [["B1s", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 54.3, 13, 4.2], ctl: "tv", nz: 1, steps: 3, top: N, d: [["LC1", 1.6, "o"], ["B1w", 2.4, "o"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (Tây Nam)", r: [6, 58.5, 13, 15.5], ctl: "tv", nz: 1, shelf: 0.4, top: N, d: [["LC2", 1.6, "o", 0.3]] },
      { id: "LC1", c: "circ", n: "Hành lang đọc", r: [19, 57, 6, 4.67], ctl: "tv", nz: 1, d: [["LC2", 1.6, "o"], ["B1s", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [22, 61.67, 3, 4.33], ctl: "tv", nz: 1, wc: KT, d: [["LC2", 1.0, "p"]] },
      { id: "LC2", c: "circ", n: "Hành lang Tây Nam", r: [19, 61.67, 3, 12.33], ctl: "tv", nz: 1, d: [["KD2", 0.9, "p"]] },
      { id: "KD2", c: "circ", n: "Kho đệm (tủ, xe sách) giữa đọc và học nhóm", r: [22, 66, 3, 8], ctl: "tv", nz: 1 },
      { id: "B1s", c: "B1", n: "Đọc mở (Đông Nam)", r: [25, 58, 13, 6.5], ctl: "tv", nz: 1, top: N, d: [["HB", 1.6, "o"]] },
      // cụm học nhóm góc Đông Nam, có hành lang riêng, nằm trên phòng thiếu nhi (hai khu ồn chồng lên nhau)
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [25, 64.5, 13, 1.5], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [25 + 3.25 * i, 66, 3.25, 8], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] }))
    ],
    staff: [{ x: 22, y: 46, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH9", code: "H.9", name: "Hộp đọc lớn đặt trên các hộp nhỏ", from: "hộp xếp",
    levels: [t1, t2],
    grid: { x: [6, 11, 19, 25, 31, 38], y: [14, 30, 38, 42, 50, 58, 66, 74] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 53], [5.2, 53]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 40], [14.5, 40], [14.5, 38.3]]],
        event: [[[20, -9], [40.4, 8], [40.4, 40], [14.5, 40], [14.5, 38.3]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, rẽ vào khe gió tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, bờ sông, rẽ vào khe gió tới sảnh đón tiếp" },
      hatch: [GAP, COURT, GARDEN],
      labels: [[22, 40, "Khe gió 4 m"], [28, 57, "Sân có mái"], [27, 77, "Vườn thiếu nhi"], [22, 22, "Hộp gạch sự kiện"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ các ý tưởng hộp xếp (10.3, 10.5, 10.7) theo cách ngược lại: thay vì nhiều hộp nhỏ chồng lên nhau, một hộp đọc gỗ lớn 32 × 32 m nằm trên các hộp nhỏ khác màu, không có hộp bọc ngoài. Hộp đọc lấy sáng răng cưa kính hướng Bắc nên sâu vẫn sáng. Phía Bắc là hộp gạch sự kiện và hộp kính đón tiếp, một tầng; giữa chúng và hộp đọc là khe gió 4 m. Dưới hộp đọc là dải trắng phía Bắc, dải xanh phía Nam (sâu 8 m, cửa sổ ra ngoài), hộp đá kho sách, hộp tím lõi sách xuyên lên mái, hộp xám kỹ thuật và một sân có mái.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: hộp kính đón tiếp là nơi duy nhất có cửa vào, mở ra khe gió. Rẽ trái lên hộp gạch là sảnh sự kiện (phòng đa năng, chuyên đề, trưng bày, cà phê, vệ sinh). Đi thẳng là quầy giữ đồ, mượn trả có cổng từ, rồi cầu kính qua khe vào khu đọc.",
    "Thang có hệ quả: lõi thang bộ + thang máy + tời sách nằm ngay sau cầu kính, nên người đọc chỉ tới chân thang sau khi qua quầy. Thang Đông ở tầng 1 chỉ mở vào phòng tra cứu số (trong khu đọc) và cửa chuông báo ra ngoài. Khu sự kiện một tầng, không có thang lên khu đọc.",
    "Đường sách gọn: lối Tây → cửa cuốn → tiếp nhận → kho đóng → tời sách (cửa thẳng vào lõi) → kệ tầng 2. Xử lý nghiệp vụ nằm ngay trên tiếp nhận và kho đóng, cửa liền nhau. Sách trả: quầy → cầu kính → sảnh khu đọc → phòng nhân viên → xử lý, khoảng 15 m.",
    "Vệ sinh: vệ sinh sảnh sát sảnh đón tiếp; vệ sinh sự kiện sát sảnh sự kiện; trong khu đọc có vệ sinh thay tã sát thiếu nhi ở tầng 1 và vệ sinh tầng 2 chồng đúng lên trên, trong hộp tím cạnh lõi thang.",
    "Ánh sáng: hộp sự kiện, hộp đón tiếp và cả hộp đọc tầng 2 lấy sáng mái răng cưa hướng Bắc. Dưới hộp đọc, dải trắng lấy sáng Bắc qua khe gió (hộp đón tiếp đối diện chỉ cao một tầng, góc che 40°), dải xanh lấy sáng Nam ra vườn. Phần giữa chỉ là kho, lõi, kỹ thuật, không cần cửa sổ. Mặt Đông, Tây đặc.",
    "Ngoài giờ: mở hộp sự kiện và hộp đón tiếp; chỉ khóa cửa sảnh đón tiếp → quầy giữ đồ. Phòng đa năng có cửa thoát ra quảng trường Bắc và phía sông; cà phê có cửa thoát ra khe gió.",
    "Yên tĩnh: đọc yên tĩnh ở góc Tây Bắc tầng 2, nằm trên xử lý và kho (không trên phòng ồn), cách học nhóm hơn 15 m. Học nhóm ở góc Đông Nam có hành lang riêng, nằm trên phòng thiếu nhi; ngăn với phòng đọc bằng hành lang và kho đệm. Thiếu nhi ở tầng 1 mở ra vườn có tường bao phía Nam.",
    "Sửa ngày 05/11 (tiếng ồn): đọc yên tĩnh chuyển từ góc Tây Nam (từng chồng một phần lên phòng thiếu nhi, cách học nhóm 6 m) lên góc Tây Bắc; góc đọc cá nhân sát học nhóm đổi thành kho đệm; học nhóm có hành lang riêng thay vì mở thẳng vào phòng đọc.",
    "Kết cấu: hộp đọc tầng 2 đặt trên tường và cột của các hộp nhỏ, lưới 6–8 m; phần trên sân có mái tựa lên hai hàng cột lộ ra trong sân. Hộp gạch sự kiện dùng dầm thép nhịp 15 m."
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
    id: "chotH9", fam: "chot", code: "H.9", from: "hộp xếp", name: "Hộp đọc lớn đặt trên các hộp nhỏ", rule: "Một hộp lớn đè lên nhiều hộp nhỏ khác màu",
    tag: "Hộp đọc gỗ 32 × 32 m mái răng cưa nằm trên hộp đá kho sách, hộp tím lõi sách, hai dải sáng; hộp gạch sự kiện và hộp kính đón tiếp đứng riêng phía Bắc",
    story: "Thay vì chồng nhiều hộp nhỏ, ở đây một hộp đọc gỗ lớn được đặt lên trên các hộp nhỏ khác màu như một chiếc hộp đặt trên những khối đồ chơi: hộp đá giữ sách, hộp tím chứa thang và tời sách nhô lên khỏi mái, dải trắng và dải xanh có cửa sổ, một sân có mái. Phía Bắc, tách ra bằng khe gió, là hộp gạch sự kiện và hộp kính đón tiếp, thấp một tầng.",
    why: [["Quy luật hình khối", "Đè chồng: một hộp lớn thuần khiết ở trên, các hộp nhỏ khác màu, khác cao độ ở dưới, lộ ra ở mép và trong sân."], ["Khối chính – khối phụ", "Hộp đọc gỗ cao +11,05 (cả răng cưa), lớn nhất; hộp gạch và hộp kính một tầng là khối phụ."], ["Nắng và chói", "Kính răng cưa quay Bắc, không nhận nắng trực tiếp; dải cửa sổ tầng 1 chỉ ở mặt Bắc, Nam."], ["Đi lại", "Quầy, cầu kính, lõi thang, kho đóng, tiếp nhận, xử lý nằm trong một ô 13 × 16 m; kho tới kệ tầng 2 một chuyến tời sách."]],
    kc: { he: "Hộp đọc tầng 2: sàn bê tông trên tường các hộp nhỏ và cột lưới 6–8 m; hai hàng cột lộ trong sân có mái. Răng cưa vì kèo thép nhẹ mỗi 4 m. Hộp sự kiện: dầm thép nhịp 15 m.", nhip: "15 m (phòng đa năng), 6–8 m (lưới)", cx: "Không, cột trong sân có mái là cột chính" },
    qa: [["Hộp đọc 32 m sâu có tối không?", "Không: cả hộp ở tầng trên cùng, mái là 8 răng cưa kính hướng Bắc, mọi chỗ ngồi cách dải kính mái dưới 4 m."], ["Khách sự kiện có lọt vào khu đọc?", "Không. Khu sự kiện tách khỏi hộp đọc bằng khe gió; chỉ có một cầu kính, nằm sau quầy giữ đồ có cổng từ, cửa khóa ngoài giờ."]],
    cut: "Tỉ lệ 1:200. Hộp đọc: ván gỗ balsa cao 2,25 cm đặt trên các hộp foam: đá xám, trắng, xanh, tím (lõi cao tới 6 cm). Hộp sự kiện foam đỏ gạch, hộp đón tiếp mica. Răng cưa: thanh foam tam giác lưng dán giấy cỏ.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 58, 11.2, "Khối chính · Hộp đọc gỗ trên các hộp nhỏ", 1], [22, 22, 6.4, "Khối phụ · Hộp gạch sự kiện", 2], [14, 34, 6.4, "Hộp kính đón tiếp", 2], [22, 53, 12.6, "Hộp tím: lõi sách", 2], [28, 57, 0.6, "Sân có mái", 2]],
    build() {
      const v = [
        B(19, 50, 6, 16, 0.45, 12.45, "violet", "X", { top: "violet", lv: 0 }),
        B(35, 42, 3, 8, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(6, 42, 32, 32, 4.95, 9.45, "deck", "B", { fl: 1, role: "m" }),
        B(6, 14, 32, 16, 0.45, 4.95, "ribbon", "D", { fl: 1, role: "p" }),
        B(6, 30, 32, 8, 0.45, 4.95, "glass", "A", { fl: 1, role: "p" }),
        B(19.2, 38, 3.8, 4, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 42, 32, 8, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 50, 13, 16, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(31, 50, 7, 11, 0.45, 4.95, "blk", "E", { fl: 1, role: "p" }),
        B(25, 50, 6, 2, 0.45, 4.95, "glass", "L", { fl: 1, role: "p" }), B(25, 64, 13, 2, 0.45, 4.95, "glass", "L", { fl: 1, role: "p" }),
        B(6, 66, 32, 8, 0.45, 4.95, "accent", "B", { fl: 1, role: "m" }),
        // tường thấp bao vườn thiếu nhi
        B(17.5, 79.85, 20.5, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(17.5, 74, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(37.7, 74, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }),
        ...teeth(6, 42, 32, 74, 9.45, 1.6, "m"),
        ...teeth(6, 14, 32, 30, 4.95, 1.2, "p"),
        ...teeth(6, 30, 32, 38, 4.95, 1.2, "p")
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38]) for (const y of [14, 22, 30, 38]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 11, 19, 25, 31, 38]) for (const y of [42, 50, 58, 66, 74]) st.push(col(x, y, 0.45, 4.95));
      st.push(col(28, 56, 0.45, 4.95), col(28, 60, 0.45, 4.95), col(34.5, 62.5, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
