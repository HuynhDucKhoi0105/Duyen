/* ================= Ý tưởng S.3: Hộp vuông giữa, hai hộp phụ (khối vuông xếp đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // một hộp thư viện vuông 32 × 32 m, 2 tầng (tầng 2 lấy sáng răng cưa hướng Bắc, đua 4 m về phía Nam);
  // hai hộp phụ 1 tầng: hộp sự kiện phía Bắc và hộp kính đón tiếp ở góc Tây, nối hai hộp kia. Giữa là sân mở ra sông.
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const EV = R4(6, 14, 32, 19), AB = R4(6, 33, 10, 13), LB1 = R4(6, 46, 32, 28), LB2 = R4(6, 46, 32, 32);
  const COURT = R4(16, 33, 22, 7), GARDEN = R4(26, 40, 12, 6);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, AB, LB1],
    rooms: [
      // hộp sự kiện (1 tầng, mái răng cưa): chạy được ngoài giờ, chỉ vào được qua sảnh đón tiếp
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 14, 6.25, 12], ctl: "sk", nz: 2, seat: 24, top: N, d: [["FE", 1.2, "p"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [12.25, 14, 7.5, 12], ctl: "sk", nz: 2, occ: 30, top: N, d: [["FE", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [19.75, 14, 16.15, 12], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["FE", 1.8, "p"], ["N", 1.8, "tn", 0.25], ["N", 1.8, "tn", 0.75]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [35.9, 14, 2.1, 12], ctl: "sk", nz: 3, d: [["D1", 3, "o"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh, sự kiện", r: [6, 26, 4.3, 7], ctl: "sk", nz: 1, wc: KT, d: [["FE", 1.2, "p"]] },
      { id: "FE", c: "circ", n: "Sảnh sự kiện", r: [10.3, 26, 12.7, 7], ctl: "sk", nz: 2, occ: 60, d: [["A3", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách nhìn sân", r: [23, 26, 10, 7], ctl: "sk", nz: 3, seat: 32, top: N, bar: [[23.4, 33], [32.6, 33], 10], d: [["KCF", 1.2, "p"], ["S", 1.6, "tn", 0.5]] },
      { id: "KCF", c: "circ", n: "Quầy, chuẩn bị, rửa (cà phê)", r: [33, 26, 2, 7], ctl: "sk", nz: 2 },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [35, 26, 3, 7], ctl: "sk", nz: 1, d: [["D2", 1.2, "p"]] },
      // hộp kính đón tiếp ở góc Tây: cửa vào duy nhất, mở ra sân
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 33, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["E", 2.4, "chinh", 0.5], ["FE", 2.4, "o"], ["A4", 1.8, "k"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 41, 3, 5], ctl: "nv", nz: 1, top: N, d: [["W", 0.9, "nv"], ["A1", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [9, 41, 6, 5], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["TK", 0.9, "o"], ["LH", 2.4, "o"]] },
      { id: "TK", c: "circ", n: "Tủ khóa gửi đồ", r: [15, 41, 1, 5], ctl: "tv", nz: 1 },
      // hộp thư viện tầng 1 · dải Bắc (cửa sổ Bắc ra sân)
      { id: "STW", n: "Thang bộ Tây", r: [6, 46, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["W", 1.2, "tnbd"], ["LH", 1.2, "thang"]] },
      { id: "LH", c: "circ", n: "Sảnh khu đọc (sau cổng từ)", r: [9, 46, 7, 8], ctl: "tv", nz: 1, d: [["CL", 2.0, "o"], ["B3", 1.8, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [16, 46, 22, 8], ctl: "tv", nz: 3, seat: 32, d: [["WCB", 1.0, "p"], ["N", 1.4, "tnbd", 0.75]] },
      // dải giữa (không cần cửa sổ): lõi sách, kho, kỹ thuật
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 54, 5, 4], ctl: "nv", nz: 1, d: [["C4", 1.0, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 58, 5, 6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["KDW", 1.2, "nv"]] },
      { id: "KDW", c: "circ", n: "Lối nhân viên Tây", r: [6, 64, 5, 2], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["KD", 1.0, "nv"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [11, 54, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["KD", 1.0, "nv"], ["C1", 1.2, "nv"]] },
      { id: "KD", c: "circ", n: "Hành lang nghiệp vụ", r: [11, 61, 4, 5], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["C2", 1.2, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [15, 54, 4, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [19, 54, 10, 4], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [29, 54, 9, 6], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"], ["KDE", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [15, 58, 14, 8], ctl: "kho", nz: 1, d: [["KDE", 1.0, "nv"]] },
      { id: "KDE", c: "circ", n: "Hành lang nhân viên Đông", r: [29, 60, 9, 6], ctl: "nv", nz: 1 },
      // dải Nam (cửa sổ Nam, có ô văng tầng 2 đua 4 m)
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 66, 8.75, 8], ctl: "nv", nz: 1, d: [["KDW", 1.2, "nv"], ["E2", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [14.75, 66, 5, 8], ctl: "nv", nz: 1, d: [["E1", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [19.75, 66, 10, 8], ctl: "nv", nz: 0, d: [["KDS", 1.0, "nv"]] },
      { id: "KDS", c: "circ", n: "Sảnh nhân viên, cửa ra vườn", r: [29.75, 66, 5.25, 8], ctl: "nv", nz: 1, d: [["KDE", 1.6, "nv"], ["S", 1.0, "nv"]] },
      { id: "STE", n: "Thang bộ Đông Nam", r: [35, 66, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["KDE", 1.0, "nv"], ["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 11, y: 37, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 12, y: 43.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.5, y: 43.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 28, y: 28, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 27, y: 50, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 70, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8.5, y: 61, t: "Nhận sách", sc: ["4"] },
      { x: 24.5, y: 70, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 16.5, y: 29.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 33, y: 20, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 9, y: 20, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2: cả hộp thư viện, mái răng cưa kính hướng Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [LB2],
    rooms: [
      { id: "STW", n: "Thang bộ Tây", r: [6, 46, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["B1a", 1.2, "thang"]] },
      // học nhóm dải Bắc, hành lang riêng mở thẳng vào lõi thang
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [9 + 3.85 * i, 46, 3.85, 6.5], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [9, 52.5, 15.4, 1.5], ctl: "tv", nz: 2, d: [["CL", 1.2, "o"]] },
      { id: "KD2", c: "circ", n: "Kho đệm (tủ, xe sách)", r: [24.4, 46, 1.1, 8], ctl: "tv", nz: 1, d: [["HB", 0.9, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [25.5, 46, 12.5, 8], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1e", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Góc đọc Tây", r: [6, 54, 5, 7], ctl: "tv", nz: 1, top: N, d: [["CL", 1.6, "o"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách", r: [11, 54, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["B1s", 2.0, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [15, 54, 4, 7], ctl: "tv", nz: 1, wc: KT, d: [["B1s", 1.0, "p"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [19, 54, 7, 7], ctl: "tv", nz: 1, steps: 6, top: N, d: [["B1s", 2.4, "o"], ["B1e", 2.0, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở nhìn sông", r: [26, 54, 12, 7], ctl: "tv", nz: 1, top: N, d: [["B1k", 1.6, "o"], ["B2", 1.4, "p"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ sách", r: [6, 61, 19.7, 17], ctl: "tv", nz: 1, shelf: 0.4, top: N, d: [["B2", 1.4, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Đông Nam)", r: [25.7, 61, 9.3, 17], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "B1k", c: "B1", n: "Góc đọc cá nhân", r: [35, 61, 3, 5], ctl: "tv", nz: 1, top: N, d: [["STE", 1.2, "thang"]] },
      { id: "STE", n: "Thang bộ Đông Nam", r: [35, 66, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B2", 1.2, "thang"]] },
      { id: "KB2", c: "circ", n: "Kho sách đọc yên tĩnh", r: [35, 74, 3, 4], ctl: "tv", nz: 1, d: [["B2", 0.9, "p"]] }
    ],
    staff: [{ x: 22.5, y: 57.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS3", code: "S.3", name: "Hộp vuông giữa, hai hộp phụ", from: "khối vuông",
    levels: [t1, t2],
    grid: { x: [6, 11, 15, 19, 26, 29, 35, 38], y: [14, 26, 33, 46, 54, 61, 66, 74, 78] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 61], [5.2, 61]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 36.5], [17, 36.5]]],
        event: [[[20, -9], [40.4, 8], [40.4, 36.5], [17, 36.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân, tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, bờ sông, vào sân, tới sảnh đón tiếp" },
      hatch: [COURT, GARDEN],
      labels: [[27, 36.5, "Sân vào"], [32, 43, "Vườn thiếu nhi"], [22, 20, "Hộp sự kiện"], [22, 70, "Hộp thư viện"]]
    }
  };
  plan.intro = `<p class="lede">Đúng tinh thần thầy xác nhận: không cầu kỳ, chỉ ba hộp chữ nhật xếp cạnh nhau. Hộp chính là hộp thư viện vuông 32 × 32 m, hai tầng; tầng 2 lấy sáng mái răng cưa kính hướng Bắc nên sâu mà vẫn sáng, và đua 4 m về phía Nam làm ô văng cho dải phòng tầng 1. Phía Bắc là hộp sự kiện một tầng; ở góc Tây là hộp kính đón tiếp một tầng nối hai hộp. Giữa ba hộp là sân vào mở ra sông, sân sâu 13 m nên không hộp nào che sáng hộp nào.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: chỉ có một cửa vào, ở hộp kính đón tiếp, mở ra sân. Rẽ trái (lên phía Bắc) là sảnh sự kiện: phòng đa năng, chuyên đề, trưng bày, cà phê, vệ sinh. Đi thẳng là quầy gửi đồ, mượn trả có cổng từ, rồi mới vào sảnh khu đọc.",
    "Thư viện luôn đi qua A, kể cả thiếu nhi: phòng thiếu nhi chỉ có cửa từ sảnh khu đọc (sau cổng từ); cửa ra vườn là cửa có chuông báo, vườn có tường bao. Phòng thiếu nhi có vệ sinh thay tã ngay cạnh.",
    "Thang có hệ quả: cả ba thang của thư viện (thang Tây, lõi thang + thang máy + tời sách, thang Đông Nam) chỉ tới được sau cổng từ; ở tầng 1, thang Tây và thang Đông Nam chỉ có cửa chuông báo ra ngoài và cửa nhân viên. Khu sự kiện một tầng, không có thang lên khu đọc.",
    "Đường sách gọn: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → xử lý (cửa sổ Nam) và kho đóng → tời sách trong lõi → kệ tầng 2 ngay trên. Sách trả: quầy → sảnh khu đọc → lõi thang → hành lang nghiệp vụ → xử lý, khoảng 20 m, không qua khu công cộng.",
    "Vệ sinh: vệ sinh sảnh, sự kiện sát sảnh sự kiện (cạnh đón tiếp); trong khu đọc có vệ sinh thay tã ở tầng 1 và vệ sinh tầng 2 cạnh lõi thang.",
    "Ánh sáng: hộp sự kiện và hộp đón tiếp một tầng, lấy sáng mái răng cưa hướng Bắc; hộp thư viện tầng 1: dải Bắc (thiếu nhi) nhìn ra sân 13 m, dải Nam (xử lý, nhân viên, văn phòng) cửa sổ Nam dưới ô văng 4 m, dải giữa chỉ là kho, lõi, kỹ thuật; tầng 2 cả sàn lấy sáng mái. Mặt Đông, Tây đặc.",
    "Yên tĩnh: đọc yên tĩnh ở góc Đông Nam tầng 2, cách học nhóm hơn 8 m, bên dưới là văn phòng và hành lang nhân viên (không phải phòng ồn). Học nhóm có hành lang riêng mở vào lõi thang; tra cứu số ngăn với học nhóm bằng kho đệm. Văn phòng, phòng nhân viên ở dải Nam tầng 1, không sát phòng ồn hay phòng kỹ thuật.",
    "Ngoài giờ: mở hộp sự kiện và hộp đón tiếp; chỉ khóa cửa đón tiếp → quầy gửi đồ. Phòng đa năng có hai cửa thoát ra quảng trường Bắc; cà phê có cửa thoát ra sân.",
    "Kết cấu: lưới cột 8 m; hộp thư viện tầng 2 đua 4 m về phía Nam trên dầm công xôn, thêm hàng cột lộ ở mép đua; phòng đa năng nhịp 12 m dầm thép."
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
    id: "chotS3", fam: "chot", code: "S.3", from: "khối vuông", name: "Hộp vuông giữa, hai hộp phụ", rule: "Ba hộp chữ nhật xếp quanh một sân",
    tag: "Hộp thư viện vuông 32 × 32 m hai tầng, hộp sự kiện một tầng phía Bắc, hộp kính đón tiếp ở góc Tây; sân giữa mở ra sông",
    story: "Ba hộp đơn giản: một hộp vuông lớn cho thư viện, một hộp dài thấp cho sự kiện, một hộp kính nhỏ làm sảnh đón tiếp nối hai hộp ở góc Tây. Khách đi từ bờ sông vào sân, gặp sảnh đón tiếp trước tiên; từ đó rẽ sang sự kiện hoặc qua quầy vào thư viện.",
    why: [["Quy luật hình khối", "Xếp cạnh nhau, không trang trí: ba hộp chữ nhật khác cỡ, khác chiều cao, ôm một sân."], ["Khối chính – khối phụ", "Hộp thư viện cao +11,05 (cả răng cưa), chiếm hơn 2/3 sàn; hai hộp phụ chỉ một tầng."], ["Nắng và chói", "Kính mái răng cưa quay Bắc; cửa sổ tầng 1 chỉ ở mặt Bắc, Nam; mặt Đông, Tây đặc."], ["Đi lại", "Quầy, sảnh khu đọc, lõi sách, kho đóng, tiếp nhận, xử lý nằm sát nhau ở góc Tây Nam hộp thư viện."]],
    kc: { he: "Khung bê tông lưới 8 m; tầng 2 hộp thư viện đua 4 m về phía Nam bằng dầm công xôn, có hàng cột lộ ở mép đua. Răng cưa vì kèo thép nhẹ mỗi 4 m. Phòng đa năng dầm thép nhịp 12 m.", nhip: "12 m (phòng đa năng), 8 m (lưới)", cx: "Hàng cột lộ dưới phần đua 4 m" },
    qa: [["Thiếu nhi có lối riêng không?", "Không: thiếu nhi chỉ vào từ sảnh khu đọc sau cổng từ; cửa ra vườn có chuông báo, vườn có tường bao."], ["Khách sự kiện có lên được khu đọc?", "Không: khu sự kiện một tầng, không có thang; muốn vào khu đọc phải qua quầy gửi đồ có cổng từ, cửa này khóa ngoài giờ."]],
    cut: "Tỉ lệ 1:200. Hộp thư viện: foam trắng 2 tầng, mái răng cưa foam tam giác dán giấy cỏ. Hộp sự kiện foam đỏ gạch, hộp đón tiếp mica. Lõi thang foam tím và cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 62, 11.2, "Khối chính · Hộp thư viện vuông", 1], [22, 22, 6.4, "Khối phụ · Hộp sự kiện", 2], [11, 38, 6.2, "Hộp kính đón tiếp", 2], [13, 57, 12.6, "Lõi sách", 2]],
    build() {
      const v = [
        B(11, 54, 4, 7, 0.45, 12.45, "violet", "X", { top: "violet", lv: 0 }),
        B(6, 46, 3, 8, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(35, 66, 3, 8, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(6, 46, 32, 28, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(6, 46, 32, 32, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 14, 32, 19, 0.45, 4.95, "ribbon", "D", { fl: 1, role: "p" }),
        B(6, 33, 10, 13, 0.45, 4.95, "glass", "A", { fl: 1, role: "p" }),
        // tường thấp bao vườn thiếu nhi
        B(26, 39.85, 12, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(26, 40, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }),
        ...teeth(6, 46, 32, 78, 9.45, 1.6, "m"),
        ...teeth(6, 14, 32, 33, 4.95, 1.2, "p"),
        ...teeth(6, 33, 10, 46, 4.95, 1.0, "p")
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38]) for (const y of [14, 22, 33]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 14, 22, 30, 38]) for (const y of [46, 54, 62, 70, 74]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 14, 22, 30, 38]) st.push(col(x, 78, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
