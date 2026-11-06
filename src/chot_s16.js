/* ================= Ý tưởng S.16: Ba hộp nối hàng cao dần (khối chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba hộp xếp hàng Bắc → Nam, cao dần 1 – 2 – 3 tầng; nối nhau bằng cầu kính (hộp 1 – hộp 2) và tháp lõi ba tầng (hộp 2 – hộp 3)
  const P1 = [[6, 12], [36.5, 12], [36.5, 33], [6, 33]];       // hộp công cộng một tầng
  const J1 = [[24.5, 33], [27.5, 33], [27.5, 41], [24.5, 41]]; // cầu kính: sảnh đón tiếp → quầy mượn trả
  const P2 = [[6, 41], [37, 41], [37, 53], [6, 53]];       // hộp nghiệp vụ hai tầng
  const J2 = [[22, 53], [28, 53], [28, 65.5], [22, 65.5]]; // tháp lõi ba tầng (thang, thang máy, tời sách, vệ sinh)
  const P3 = [[8.5, 65.5], [36, 65.5], [36, 81.5], [8.5, 81.5]]; // hộp đọc ba tầng
  const STW = [[6, 72], [8.5, 72], [8.5, 78], [6, 78]];    // thang thoát hiểm đầu Tây hộp 3
  const C1W = [[6, 33], [24.5, 33], [24.5, 41], [6, 41]], C1E = [[27.5, 33], [37, 33], [37, 41], [27.5, 41]];
  const C2 = [[6, 53], [22, 53], [22, 65.5], [6, 65.5]], C2E = [[28, 53], [37, 53], [37, 65.5], [28, 65.5]];
  const WALK = [[37, 33], [41.5, 33], [41.5, 88.6], [37, 88.6]], GARDEN = [[8.5, 81.5], [36, 81.5], [36, 88.6], [8.5, 88.6]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const J2rooms = (k, lc, wc) => [
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [22, 53, 4, 9], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [[lc, 1.4, "thang"]] },
    { id: wc, c: "E5", n: `Vệ sinh thư viện tầng ${k}`, r: [22, 62, 4, 3.5], ctl: "tv", nz: 1, wc: KT, d: [[lc, 1.0, "p"]] },
    { id: lc, c: "circ", n: `Hành lang trong tháp lõi, tầng ${k}`, r: [26, 53, 2, 12.5], ctl: "tv", nz: 1 }
  ];

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [P1, J1, P2, J2, P3, STW],
    rooms: [
      // hộp 1 (một tầng, mái cửa mái hướng Bắc): sự kiện, trưng bày, cà phê, sảnh đón tiếp
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 12, 15], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 27, 4, 6], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [10, 27, 3.3, 6], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh chờ phòng đa năng", r: [13.3, 27, 4.7, 6], ctl: "sk", nz: 2, occ: 40, d: [["D1", 1.8, "p", 0.6], ["A1", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sảnh Bắc, cửa quảng trường)", r: [18, 12, 10, 9], ctl: "sk", nz: 2, occ: 30, top: N, d: [["N", 2.4, "chinh", 0.5], ["CO", 2.4, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [18, 21, 4, 4], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "CO", c: "circ", n: "Sảnh chia luồng", r: [22, 21, 14.5, 4], ctl: "sk", nz: 2 },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [18, 25, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["S", 2.4, "chinh", 0.4], ["CO", 2.4, "o"], ["J1", 2.4, "o"], ["D4", 1.4, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn quảng trường và sông)", r: [28, 12, 8.5, 9], ctl: "sk", nz: 3, seat: 32, top: N, d: [["CO", 2.4, "o"], ["N", 1.2, "tn", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [28, 25, 8.5, 8], ctl: "sk", nz: 2, seat: 24, top: N, d: [["E", 1.2, "tn", 0.5], ["S", 1.2, "tn", 0.7]] },
      // cầu kính qua sân Bắc: cuối cầu là quầy mượn trả (khóa ngoài giờ)
      { id: "J1", c: "circ", n: "Cầu kính qua sân", r: [24.5, 33, 3, 8], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // hộp 2 tầng 1 (sâu 12 m, sáng hai mặt Bắc – Nam): tiếp nhận, xử lý, kho đóng, quầy, sảnh thư viện
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 41, 2.5, 12], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.8], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [8.5, 41, 6, 12], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [14.5, 41, 10, 12], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [24.5, 41, 6, 5], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["C1", 1.0, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn sân Bắc)", r: [30.5, 41, 3, 5], ctl: "nv", nz: 1, d: [["N", 1.0, "nv"], ["HL", 0.9, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ, kệ sách mới", r: [24.5, 46, 9, 7], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["LC", 1.8, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở, sách mới (sáng Bắc và Nam)", r: [33.5, 41, 3.5, 12], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.5]] },
      // tháp lõi nối hộp 2 với hộp 3
      ...J2rooms(1, "LC", "WCL1"),
      // hộp 3 tầng 1: dải Bắc kho, kỹ thuật, sảnh thiếu nhi; dải Nam phòng thiếu nhi mở ra vườn
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [8.5, 65.5, 5, 8], ctl: "kho", nz: 1, d: [["W", 1.0, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [13.5, 65.5, 7, 8], ctl: "kt", nz: 3, d: [["N", 1.4, "nv"], ["C3", 0.9, "nv"]] },
      { id: "SB", c: "circ", n: "Sảnh thiếu nhi, tủ giày, xe đẩy", r: [20.5, 65.5, 5.5, 8], ctl: "tv", nz: 2, d: [["LC3", 2.0, "o"], ["B3", 2.4, "o"]] },
      { id: "LC3", c: "circ", n: "Sảnh thang hộp đọc", r: [26, 65.5, 5, 8], ctl: "tv", nz: 1, d: [["LC", 1.8, "o"], ["CL", 1.4, "thang"]] },
      { id: "CL", n: "Thang bộ + thang máy hộp đọc", r: [31, 65.5, 5, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "CL" }, d: [["E", 1.2, "tnbd"]] },
      { id: "STW", n: "Thang thoát hiểm Tây", r: [6, 72, 2.5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["W", 1.2, "tnbd"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra vườn)", r: [8.5, 73.5, 23, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
      { id: "WCB", c: "E5", n: "Vệ sinh trẻ em, thay tã", r: [31.5, 73.5, 4.5, 3.5], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [31.5, 77, 4.5, 4.5], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"]] }
    ],
    staff: [
      { x: 23, y: 29, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 27.5, y: 43.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 32, y: 43.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 32, y: 16.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 20, y: 77.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 11.5, y: 47, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.2, y: 47, t: "Nhận sách", sc: ["4"] },
      { x: 15.6, y: 30, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 30, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hộp 2 (tầng trên cùng của hộp, lấy sáng mái), tháp lõi, hộp 3 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [P2, J2, P3, STW],
    rooms: [
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 41, 8, 10], ctl: "nv", nz: 0, top: N, d: [["KE", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [14, 41, 4, 10], ctl: "nv", nz: 1, top: N, d: [["KE", 0.9, "nv"]] },
      { id: "KE", c: "circ", n: "Hành lang nhân viên", r: [6, 51, 20, 2], ctl: "nv", nz: 1, d: [["CS", 1.0, "nv"]] },
      { id: "B1p", c: "B1", n: "Đọc mở và kệ (đầu Tây)", r: [18, 41, 8, 10], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "B1q", c: "B1", n: "Đọc mở và kệ (dải Bắc)", r: [26, 41, 11, 5], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh đọc tầng 2 hộp 2", r: [26, 46, 7.5, 7], ctl: "tv", nz: 1, d: [["LC2", 1.8, "o"], ["B1r", 2.4, "o"]] },
      { id: "B1r", c: "B1", n: "Bàn đọc cá nhân (góc Đông)", r: [33.5, 46, 3.5, 7], ctl: "tv", nz: 0, top: N },
      { id: "STW", n: "Thang thoát hiểm Tây", r: [6, 72, 2.5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["CO3", 1.2, "thang"]] },
      ...J2rooms(2, "LC2", "WC2"),
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [8.5, 65.5, 8.4, 6], ctl: "tv", nz: 1, steps: 4, d: [["CO3", 1.6, "o"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (quay Bắc)", r: [16.9, 65.5, 9.1, 6], ctl: "tv", nz: 1, d: [["CO3", 2.4, "o"]] },
      { id: "H3", c: "circ", n: "Sảnh thang hộp đọc tầng 2", r: [26, 65.5, 5, 8], ctl: "tv", nz: 1, d: [["LC2", 1.8, "o"], ["CL", 1.4, "thang"], ["CO3", 1.8, "o"], ["B5", 2.4, "o"]] },
      { id: "CL", n: "Thang bộ + thang máy hộp đọc", r: [31, 65.5, 5, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "CL" } },
      { id: "CO3", c: "circ", n: "Hành lang học nhóm", r: [8.5, 71.5, 17.5, 2], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [8.5 + 3.25 * i, 73.5, 3.25, 8], ctl: "tv", nz: 2, d: [["CO3", 0.9, "p"]] })),
      { id: "KB", c: "circ", n: "Kho đệm cách âm", r: [21.5, 73.5, 1, 8], ctl: "tv", nz: 1, d: [["CO3", 0.8, "nv"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (quay Nam)", r: [22.5, 73.5, 13.5, 8], ctl: "tv", nz: 1, seat: 16 }
    ],
    staff: [
      { x: 29, y: 77.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 10, y: 46, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 3: tháp lõi và hộp 3 (mái răng cưa kính quay Bắc) ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [J2, P3, STW],
    rooms: [
      ...J2rooms(3, "LC4", "WC3"),
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (xa sự kiện nhất)", r: [8.5, 65.5, 17.5, 8.25], ctl: "tv", nz: 0, seat: 40, top: N, d: [["H4", 1.4, "p"]] },
      { id: "H4", c: "circ", n: "Sảnh thang hộp đọc tầng 3", r: [26, 65.5, 5, 8], ctl: "tv", nz: 1, d: [["LC4", 1.8, "o"], ["CL", 1.4, "thang"], ["B1v", 2.4, "o"]] },
      { id: "CL", n: "Thang bộ + thang máy hộp đọc", r: [31, 65.5, 5, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "CL" } },
      { id: "B1u", c: "B1", n: "Đọc mở và kệ tầng 3 (đầu Tây)", r: [8.5, 73.75, 17.5, 7.75], ctl: "tv", nz: 1, top: N, d: [["B1v", 2.4, "o"]] },
      { id: "B1v", c: "B1", n: "Đọc mở và kệ tầng 3 (đầu Đông)", r: [26, 73.5, 10, 8], ctl: "tv", nz: 1, top: N },
      { id: "STW", n: "Thang thoát hiểm Tây", r: [6, 72, 2.5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["B1u", 1.2, "thang"]] }
    ],
    staff: []
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS16", code: "S.16", name: "Ba hộp nối hàng cao dần", from: "khối vuông",
    P1, J1, P2, J2, P3,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2, t3],
    grid: { x: [6, 8.5, 14.5, 18, 22, 26, 28, 31, 36, 37], y: [12, 21, 25, 33, 41, 46, 53, 65.5, 73.5, 81.5] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 39.7, y: 60, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 45.2], [5.2, 45.2]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [39.7, 96], [39.7, 37], [21, 37], [21, 33.6]]],
        event: [[[20, -9], [23, 6], [23, 11.4]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe theo lối ven sông vào sân Bắc, tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường vào sảnh trưng bày, tới sảnh đón tiếp" },
      hatch: [C1W, C1E, C2, C2E, WALK, GARDEN],
      labels: [[14, 37, "Sân Bắc"], [14, 59, "Sân giữa"], [22, 85, "Vườn thiếu nhi"], [39.7, 70, "Lối ven sông"], [12, 20, "Hộp 1 · một tầng"], [30, 49, "Hộp 2 · hai tầng"], [16, 77, "Hộp 3 · ba tầng"]]
    }
  };
  plan.intro = `<p class="lede">Ba hộp chữ nhật xếp thành hàng từ quảng trường vào trong, mỗi hộp cao hơn hộp trước một tầng. <b>Hộp 1</b> một tầng sát quảng trường: sự kiện, trưng bày, cà phê, sảnh đón tiếp. <b>Hộp 2</b> hai tầng: tầng 1 là quầy mượn trả và cụm nghiệp vụ sách, tầng 2 là văn phòng và chỗ đọc. <b>Hộp 3</b> ba tầng ở cuối khu đất: thiếu nhi, học nhóm, tra cứu số, trên cùng là đọc yên tĩnh. Hộp 1 nối hộp 2 bằng cầu kính qua sân Bắc; hộp 2 nối hộp 3 bằng một tháp lõi ba tầng (thang, thang máy, tời sách, vệ sinh). Sân giữa hai hộp sau rộng 12,5 m nên hộp ba tầng không che sáng hộp hai tầng quá 45°.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: khách vào từ quảng trường (qua sảnh trưng bày) hoặc từ sân Bắc (người đọc đi từ bãi xe theo lối ven sông) đều tới sảnh đón tiếp trước. Từ sảnh, cầu kính 8 m dẫn tới quầy gửi đồ, mượn trả có cổng từ. Mọi phòng đọc, kể cả phòng thiếu nhi ở hộp 3, chỉ tới được sau quầy: sảnh thư viện → tháp lõi → sảnh thang hộp đọc → sảnh thiếu nhi.",
    "Khu sự kiện cũng qua sảnh đón tiếp: phòng đa năng vào qua sảnh chờ mở từ sảnh đón tiếp, phòng chuyên đề mở thẳng từ sảnh đón tiếp. Sảnh trưng bày và sảnh chia luồng chỉ dẫn tới cà phê và sảnh đón tiếp; cửa ra ngoài của phòng đa năng, chuyên đề, cà phê chỉ là cửa thoát nạn.",
    "Thang có hệ quả: các thang lên khu đọc (lõi sách trong tháp lõi, thang hộp đọc ở góc Đông Bắc hộp 3, thang thoát hiểm đầu Tây hộp 3) đều nằm sau cổng từ; ở tầng 1 hai thang của hộp 3 chỉ ra ngoài bằng cửa thoát hiểm có chuông. Hộp 1 một tầng nên không có thang. Văn phòng, phòng nhân viên ở tầng 2 hộp 2 đi hành lang nhân viên tới lõi sách bằng cửa thẻ từ.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → lõi sách có tời ngay cạnh kho, lên cả ba tầng. Sách trả: quầy mượn trả mở cửa nhân viên thẳng vào kho đóng, sang xử lý nghiệp vụ, không qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ cạnh sảnh đón tiếp; trong tháp lõi ba cụm vệ sinh thư viện chồng thẳng nhau, mỗi tầng một cụm; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Tiếng ồn: sự kiện, cà phê ở riêng hộp 1. Hộp 3: học nhóm ở dải Nam tầng 2 có hành lang riêng và kho đệm, không chung vách phòng đọc; đọc yên tĩnh ở tầng 3, dải Bắc, không nằm trên học nhóm. Văn phòng, phòng nhân viên ở tầng 2 hộp 2, cách hộp 1 cả sân Bắc, không chồng lên phòng ồn.",
    "Ánh sáng Bắc – Nam: hộp 1 lấy sáng cửa mái hướng Bắc. Hộp 2 sâu 12 m, tầng 1 có cửa sổ cả mặt Bắc (nhìn sân Bắc) và mặt Nam (nhìn sân giữa), tầng 2 là tầng trên cùng của hộp nên lấy sáng mái. Hộp 3 tầng 1, tầng 2 lấy sáng mặt Bắc (nhìn sân giữa) và mặt Nam (nhìn vườn); tầng 3 lấy sáng mái răng cưa. Tháp lõi chỉ có thang, vệ sinh, hành lang. Đầu Đông, Tây làm đặc.",
    "Không che sáng nhau: sân Bắc 8 m, hộp 1 cao +5,45 (góc che khoảng 25°); sân giữa 12,5 m, hộp 3 cao +13,95 (góc che 44,5° từ cửa sổ tầng 1 hộp 2, dưới mốc 45°).",
    "Ngoài giờ: hộp 1 chạy riêng (sảnh, trưng bày, cà phê, sự kiện, vệ sinh công cộng); chỉ khóa một cửa cuối cầu kính vào quầy mượn trả.",
    "Kết cấu: ba hộp khung bê tông lưới 6 – 10 m, chồng thẳng, không đua; tháp lõi bê tông làm lõi cứng cho hộp 2 và hộp 3; phòng đa năng dầm bê tông nhịp 12 m."
  ];
  /* ---------- khối 3D ---------- */
  const { B, SH, col } = G.K;
  const zR = 13.95, RISE = 1.6;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  const teeth = (x, y0, w, n, d) => {
    const o = [];
    for (let k = 0; k < n; k++) {
      const y = y0 + k * d;
      o.push(SH(x, y, w, d, zR, zR, zR + RISE, "-y", "sheet", "X", { top: "grass" }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, zR, zR + RISE - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotS16", fam: "chot", code: "S.16", from: "khối vuông", name: "Ba hộp nối hàng cao dần", rule: "Ba hộp chữ nhật xếp hàng Bắc – Nam, cao 1 – 2 – 3 tầng",
    tag: "Hộp 1 tầng sát quảng trường, hộp 2 tầng ở giữa, hộp 3 tầng cuối khu đất; nối bằng cầu kính và tháp lõi",
    story: "Đi từ quảng trường vào, nhà cao dần như ba bậc: bậc thấp là phòng khách của thành phố, bậc giữa là quầy và kho sách, bậc cao nhất là chỗ đọc yên tĩnh nhìn ra vườn. Mỗi bậc là một hộp đơn giản, nối nhau bằng một cầu kính và một tháp lõi.",
    why: [["Quy luật hình khối", "Ba hộp chữ nhật cùng phương, chỉ khác chiều cao (1, 2, 3 tầng) và bề ngang; không đua, không chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Hộp 3 cao nhất và cùng hộp 2, tháp lõi chiếm khoảng 75% sàn; hộp 1 thấp làm nền phía quảng trường."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, mặt Nam và mái quay Bắc; hai sân đủ rộng để hộp cao không che hộp thấp."], ["Gió và mưa", "Hai sân và lối ven sông mở về phía sông, đón gió Đông Nam; cầu kính có mái."], ["Công năng", "Sảnh đón tiếp là bản lề; lõi sách nằm sát kho đóng và lên được cả ba tầng."]],
    kc: { he: "Khung bê tông lưới 6 – 10 m; hộp 1 mái bê tông phủ cỏ có cửa mái; hộp 3 mái răng cưa thép nhẹ; tháp lõi bê tông làm lõi cứng; cầu kính dầm thép nhịp 8 m.", nhip: "12 m (phòng đa năng), 10 m (lưới)", cx: "Không" },
    qa: [["Hộp ba tầng có che sáng hộp hai tầng?", "Sân giữa rộng 12,5 m; từ cửa sổ tầng 1 hộp 2 nhìn lên đỉnh hộp 3 chỉ 44,5°, dưới mốc 45°. Tầng 2 hộp 2 lấy sáng mái nên không bị ảnh hưởng."], ["Thiếu nhi có lối riêng?", "Không: thiếu nhi ở hộp 3, đi sau quầy mượn trả qua tháp lõi; cửa ra vườn là cửa thoát hiểm có chuông."]],
    cut: "Hộp 1 foam vàng thấp, mái giấy cỏ có dải mica; hộp 2 foam trắng hai tầng; hộp 3 foam xám ba tầng, mái răng cưa giấy cỏ và mica quay Bắc; tháp lõi tím; cầu kính mica.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 57, 15.6, "Tháp lõi", 1], [22, 75, 15.6, "Khối chính · Hộp 3 ba tầng", 1], [22, 47, 11, "Hộp 2 · hai tầng", 1], [14, 20, 6.2, "Hộp 1 · một tầng", 2], [26, 37, 4.8, "Cầu kính", 2]],
    build() {
      const v = [
        B(22, 53, 6, 12.5, 0.45, 15.55, "violet", "B", { fl: 3, top: "violet", role: "m" }),
        coreBox(t1, "CL", "warn", 13.95), coreBox(t1, "STW", "warn", 13.95),
        B(6, 12, 30.5, 21, 0.45, 5.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(24.5, 33, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 41, 31, 12, 0.45, 9.45, "sheet", "B", { fl: 2, top: "grass", role: "m" }),
        B(8.5, 65.5, 27.5, 16, 0.45, 13.95, "stone", "B", { fl: 3, role: "m" }),
        ...teeth(8.5, 67.5, 27.5, 4, 3.5),
        ...[16, 23, 29].map(y => B(7, y, 28.5, 0.5, 5.45, 5.95, "glass", "X", { op: 0.75 })),
        ...[44, 48.5].map(y => B(7, y, 29, 0.5, 9.45, 9.95, "glass", "X", { op: 0.75 })),
        B(8.5, 81.5, 0.3, 7.1, 0, 1.2, "stone", "X", { role: "p" }), B(8.5, 88.3, 27.5, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(35.7, 81.5, 0.3, 7.1, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14.5, 24.5, 33.5, 37]) for (const y of [41, 53]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [8.5, 17.5, 26, 36]) for (const y of [65.5, 73.5, 81.5]) st.push(col(x, y, 0.45, 13.95));
      for (const x of [6, 18, 28, 36.5]) for (const y of [12, 21, 33]) st.push(col(x, y, 0.45, 5.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
