/* ================= Ý tưởng S.10: Hai hộp lệch góc (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hai hộp chữ nhật hai tầng chạm nhau ở một góc: hộp công cộng ở góc Đông Bắc (ven sông), hộp thư viện (lớn hơn) ở góc Tây Nam,
  // sát lối Tây nên xe sách vào thẳng kho. Chỗ hai hộp chạm nhau là sảnh nối, cạnh sảnh đón tiếp và quầy gửi đồ.
  // Hai hộp chia khu đất thành hai sân: sân vào Tây Bắc nối với quảng trường, vườn thiếu nhi có tường bao phía Đông Nam
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const NW = R4(25.5, 12, 16, 26);          // hộp công cộng
  const SE = R4(6, 38, 29.5, 36.5);     // hộp thư viện
  const COURT = R4(6, 12, 19.5, 26), GARDEN = R4(35.5, 38, 6, 36.5), GARDEN2 = R4(6, 74.5, 35.5, 12);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NW, SE],
    rooms: [
      // hộp công cộng · dải Bắc (cửa sổ Bắc ra quảng trường)
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [32.3, 12, 9.2, 8.5], ctl: "sk", nz: 2, seat: 24, d: [["N", 1.2, "tn", 0.5], ["H1", 1.4, "p"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [30.42, 12, 1.88, 8.5], ctl: "nv", nz: 1, d: [["N", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [25.5, 12, 4.92, 8.5], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["E3", 0.9, "nv"], ["CSK", 0.9, "nv"]] },
      // dải giữa (không cần cửa sổ)
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [37.5, 20.5, 4, 5], ctl: "sk", nz: 1, d: [["H1", 1.2, "p"]] },
      { id: "KCF", c: "circ", n: "Quầy, chuẩn bị (cà phê)", r: [37.5, 25.5, 4, 4], ctl: "sk", nz: 2, d: [["A3", 1.2, "p"]] },
      { id: "H1", c: "circ", n: "Sảnh công cộng", r: [33.25, 20.5, 4.25, 9], ctl: "sk", nz: 2, occ: 30, d: [["A3", 2.4, "o"], ["HV", 1.6, "o"]] },
      { id: "HV", c: "circ", n: "Lối từ sảnh nối", r: [31.5, 20.5, 1.75, 17.5], ctl: "sk", nz: 2, d: [["CSK", 1.4, "thang"], ["WCP", 1.2, "p"], ["H3n", 1.6, "o"], ["H5n", 1.6, "o"], ["JH", 1.4, "o"]] },
      { id: "CSK", n: "Thang bộ + thang máy khu sự kiện", r: [25.5, 20.5, 6, 5], ctl: "sk", nz: 1, core: { st: "u+l", link: "CSK" } },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [25.5, 25.5, 6, 3.5], ctl: "sk", nz: 1, wc: KT },
      { id: "H3n", c: "circ", n: "Sảnh thang sự kiện", r: [25.5, 29, 6, 3.65], ctl: "sk", nz: 2, d: [["ST2n", 1.4, "thang"]] },
      { id: "H5n", c: "circ", n: "Lối nối", r: [29.5, 32.65, 2, 5.35], ctl: "sk", nz: 2, d: [["JH", 1.8, "o"]] },
      { id: "ST2n", n: "Thang bộ khu sự kiện", r: [25.5, 32.65, 4, 5.35], ctl: "sk", nz: 1, core: { st: "u", link: "ST2n" }, d: [["JH", 1.4, "thang"]] },
      // hộp công cộng · dải Nam (cửa sổ Nam ra vườn Đông)
      { id: "A3", c: "A3", n: "Cà phê sách", r: [33.25, 29.5, 8.25, 8.5], ctl: "sk", nz: 3, seat: 32, d: [["E", 1.6, "tn", 0.5]] },
      // hộp thư viện · dải Bắc (cửa sổ Bắc ra sân vào)
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [33.1, 38, 2.4, 8.5], ctl: "nv", nz: 1, d: [["JH", 0.9, "nv"]] },
      { id: "JH", c: "circ", n: "Sảnh nối hai hộp", r: [27, 38, 6.1, 8.5], ctl: "sk", nz: 2, occ: 40, d: [["A1", 3.0, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [17, 38, 10, 8.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["A4", 2.4, "k"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [13.5, 38, 3.5, 8.5], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["C2", 1.0, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 38, 7.5, 8.5], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"]] },
      // hộp thư viện · dải giữa (không cần cửa sổ): kho, lõi sách, kỹ thuật, sảnh
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 46.5, 7.5, 4], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 50.5, 7.5, 15.5], ctl: "kho", nz: 1, d: [["HL", 1.2, "nv"]] },
      { id: "HL", c: "circ", n: "Hành lang thư viện (sau cổng từ)", r: [13.5, 46.5, 3.5, 19.5], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["WCL1", 1.0, "p"], ["KS", 1.6, "o"], ["B3", 1.8, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [17, 46.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LHa", 1.4, "thang"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [17, 54.5, 4, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "KS", c: "circ", n: "Kho sách luân chuyển", r: [17, 58.5, 4, 7.5], ctl: "tv", nz: 1, d: [["LB", 1.6, "o"]] },
      { id: "ST2", n: "Thang bộ Đông", r: [32, 46.5, 3.5, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST2" }, d: [["E", 1.2, "tnbd"], ["LH", 1.2, "thang"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [25, 46.5, 7, 8], ctl: "kt", nz: 3, d: [["LH", 1.2, "nv"]] },
      { id: "LHa", c: "circ", n: "Sảnh lõi sách", r: [21, 46.5, 4, 8], ctl: "tv", nz: 1, d: [["LH", 2.4, "o"]] },
      { id: "LH", c: "circ", n: "Sảnh đọc tầng 1, kệ sách mới", r: [21, 54.5, 14.5, 4], ctl: "tv", nz: 1, d: [["C3", 1.0, "nv"], ["STS", 1.2, "thang"]] },
      { id: "STS", n: "Thang bộ Đông Nam", r: [32.5, 58.5, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["E", 1.2, "tnbd"], ["KS3", 1.0, "thang"]] },
      { id: "KS3", c: "circ", n: "Sảnh thang Đông Nam", r: [32.5, 64.5, 3, 1.5], ctl: "tv", nz: 1, d: [["LB", 1.2, "o"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [21, 58.5, 11.5, 3.5], ctl: "kho", nz: 1 },
            { id: "LB", c: "circ", n: "Hành lang đệm thiếu nhi", r: [21, 62, 11.5, 4], ctl: "tv", nz: 1, d: [["B1s", 1.6, "o"], ["WCB", 0.9, "p"]] },
      // hộp thư viện · dải Nam (cửa sổ Nam ra vườn thiếu nhi)
      { id: "B1s", c: "B1", n: "Đọc mở, góc sách mới", r: [28.5, 66, 7, 8.5], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.5]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [26.5, 66, 2, 4], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 0.9, "p"]] },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [26.5, 70, 2, 4.5], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [6, 66, 20.5, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.7], ["S", 1.8, "tnbd", 0.2]] }
    ],
    staff: [
      { x: 21.5, y: 42, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 15.3, y: 42.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 30.9, y: 16, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 39.5, y: 27.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 16.5, y: 70, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 9.8, y: 42, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9.8, y: 48.5, t: "Nhận sách", sc: ["4"] },
      { x: 29.5, y: 42, t: "Đón khách sự kiện", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hộp công cộng là khu sự kiện, hộp thư viện là sàn đọc; cả hai lấy sáng mái răng cưa hướng Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NW, SE],
    rooms: [
      // hộp công cộng
      { id: "A2", c: "A2", n: "Trưng bày (tầng trên)", r: [31.5, 12, 10, 8.9], ctl: "sk", nz: 2, occ: 30, top: N, d: [["FYe", 2.4, "o"]] },
      { id: "FYe", c: "circ", n: "Sảnh thang máy sự kiện", r: [25.5, 12, 6, 8.5], ctl: "sk", nz: 2, occ: 40, top: N, d: [["CSK", 1.4, "thang"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [31.5, 20.9, 10, 17.1], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "S", top: N, d: [["CSK", 1.8, "thang"], ["WC2", 1.0, "p"], ["D2", 2.4, "o"], ["BS", 1.4, "p"]] },
      { id: "CSK", n: "Thang bộ + thang máy khu sự kiện", r: [25.5, 20.5, 6, 5], ctl: "sk", nz: 1, core: { st: "u+l", link: "CSK" } },
      { id: "WC2", c: "E5", n: "Vệ sinh khu sự kiện tầng 2", r: [25.5, 25.5, 6, 2.6], ctl: "sk", nz: 1, wc: KT },
      { id: "D2", c: "D2", n: "Bục trình bày, phòng chờ", r: [25.5, 28.1, 6, 4.55], ctl: "sk", nz: 3, d: [["BS", 1.0, "p"]] },
      { id: "BS", c: "circ", n: "Lối sau sân khấu", r: [29.5, 32.65, 2, 5.35], ctl: "sk", nz: 2, d: [["ST2n", 1.2, "thang"]] },
      { id: "ST2n", n: "Thang bộ khu sự kiện", r: [25.5, 32.65, 4, 5.35], ctl: "sk", nz: 1, core: { st: "u", link: "ST2n" } },
      // hộp thư viện
      { id: "KE1", c: "circ", n: "Tủ hồ sơ (vách đệm)", r: [25.5, 38, 10, 0.8], ctl: "nv", nz: 1, d: [["E1", 0.9, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [25.5, 38.8, 10, 7.7], ctl: "nv", nz: 0, top: N, d: [["ST2", 1.0, "nv"], ["LW", 1.0, "nv"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [19.5, 38, 6, 8.5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1n", 1.6, "o"], ["LW", 1.6, "o"]] },
      { id: "B1n", c: "B1", n: "Góc đọc cạnh lõi sách", r: [17, 38, 2.5, 8.5], ctl: "tv", nz: 1, top: N, d: [["CS", 1.4, "thang"], ["B2", 1.4, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Tây Bắc)", r: [6, 38, 11, 14.5], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "ST2", n: "Thang bộ Đông", r: [32, 46.5, 3.5, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST2" }, d: [["LW", 1.2, "thang"], ["KW", 1.2, "thang"]] },
      { id: "LW", c: "circ", n: "Sảnh đọc tầng 2", r: [21, 46.5, 11, 2], ctl: "tv", nz: 1, top: N, d: [["CS", 1.4, "thang"], ["B5", 2.4, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [17, 46.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1e", 1.4, "thang"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [21, 48.5, 11, 8.5], ctl: "tv", nz: 1, seat: 16, top: N, d: [["WCL2", 1.0, "p"], ["CO", 2.4, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [17, 54.5, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["B1e", 1.0, "p"]] },
      { id: "KW", c: "circ", n: "Sảnh thang Đông", r: [32, 54.5, 3.5, 2.5], ctl: "tv", nz: 1, top: N, d: [["CO", 1.6, "o"], ["B5", 1.2, "o"]] },
      { id: "CO", c: "circ", n: "Hành lang Đông", r: [21, 57, 14.5, 1.5], ctl: "tv", nz: 1, top: N, d: [["B1c", 1.2, "o"]] },
      { id: "STS", n: "Thang bộ Đông Nam", r: [32.5, 58.5, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["CO", 1.2, "thang"], ["CO2", 1.0, "thang"]] },
      { id: "B1sw", c: "B1", n: "Bàn đọc cá nhân (góc Đông)", r: [24.7, 58.5, 7.8, 6], ctl: "tv", nz: 1, top: N, d: [["CO", 2.4, "o"]] },
      { id: "CV", c: "circ", n: "Hành lang học nhóm", r: [23.5, 58.5, 1.2, 16], ctl: "tv", nz: 2, top: N, d: [["CO", 1.2, "o"]] },
      { id: "CO2", c: "circ", n: "Lối vào phòng học nhóm", r: [24.7, 64.5, 10.8, 1], ctl: "tv", nz: 2, d: [["CV", 1.0, "o"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [32.8 - 2.7 * i, 65.5, 2.7, 9], ctl: "tv", nz: 2, top: N, d: [["CO2", 0.9, "p"]] })),
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (dải giữa)", r: [17, 58.5, 6.5, 16], ctl: "tv", nz: 1, top: N, d: [["B1e", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (sảnh đọc lớn)", r: [6, 52.5, 11, 22], ctl: "tv", nz: 1, top: N }
    ],
    staff: [{ x: 26.5, y: 52.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }, { x: 30.5, y: 42, t: "Văn phòng", sc: ["1", "3", "4"] }, { x: 28.5, y: 16, t: "Điều phối, âm thanh", sc: ["2", "3"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS10", code: "S.10", name: "Hai hộp lệch góc", from: "khối vuông",
    levels: [t1, t2],
    grid: { x: [6, 13.5, 17, 21, 25.5, 31.5, 35.5, 41.5], y: [12, 20.5, 29.5, 38, 46.5, 54.5, 66, 74.5] },
    site: {
      staff: [{ x: 38.5, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 9.5, y: 30, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 48.5], [5.2, 48.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 8], [22, 8], [22, 37.5]]],
        event: [[[20, -9], [20, 6], [22, 20], [22, 37.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông lên quảng trường, vào sân Tây Bắc, tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc vào sân Tây Bắc, tới sảnh đón tiếp" },
      hatch: [COURT, GARDEN, GARDEN2],
      labels: [[15.5, 25, "Sân vào (quảng trường nối dài)"], [38.5, 56, "Vườn thiếu nhi"], [24, 80, "Vườn thiếu nhi (tường bao)"], [33.5, 16, "Hộp công cộng"], [21.5, 60, "Hộp thư viện"]]
    }
  };
  plan.intro = `<p class="lede">Hai hộp chữ nhật hai tầng đặt lệch nhau, chỉ chạm nhau ở một góc. Hộp công cộng nhỏ ở góc Đông Bắc, ven sông (chuyên đề, cà phê ở tầng 1; phòng đa năng, trưng bày ở tầng 2). Hộp thư viện lớn hơn ở góc Tây Nam, sát lối Tây nên xe giao sách vào thẳng kho. Hai hộp chia khu đất thành hai sân: sân vào Tây Bắc nối với quảng trường, vườn thiếu nhi có tường bao phía Đông Nam. Sảnh đón tiếp nằm ở góc hộp thư viện, ngay chỗ hai hộp chạm nhau: bên trái là sảnh nối sang hộp công cộng, bên phải là quầy gửi đồ, mượn trả có cổng từ. Muốn vào khu đọc, kể cả phòng thiếu nhi, đều phải qua quầy này.</p>`;
  plan.notes = [
    "Đi qua khối A: một cửa vào duy nhất ở mặt Bắc hộp thư viện, nhìn ra sân Tây Bắc. Vào là sảnh đón tiếp; rẽ phải (Tây) là quầy gửi đồ, mượn trả có cổng từ (liền vách), rẽ trái (Đông) là sảnh nối sang hộp công cộng: vệ sinh công cộng, cà phê, chuyên đề, thang máy lên phòng đa năng và trưng bày. Phòng thiếu nhi ở cuối hành lang thư viện, sau quầy như mọi phòng đọc khác.",
    "Thang có hệ quả: hộp thư viện có ba thang (lõi sách giữa nhà, thang Đông, thang Đông Nam cạnh phòng học nhóm), cả ba chỉ tới được sau cổng từ; thang Đông và thang Đông Nam ở tầng 1 chỉ có cửa thoát hiểm có chuông ra vườn thiếu nhi. Hộp công cộng có hai thang riêng (một có thang máy) chỉ lên khu sự kiện; tầng 2 hai hộp không thông nhau.",
    "Đường sách mới: xe giao sách đi lối Tây, dỡ qua cửa cuốn ở mặt Tây vào tiếp nhận → xử lý nghiệp vụ (liền vách, cửa sổ Bắc) và kho đóng (liền vách). Kho đóng mở ra hành lang thư viện, đối diện lõi sách có tời lên tầng 2 (cách 3,5 m). Quầy mượn trả liền vách xử lý nghiệp vụ nên sách trả đi thẳng vào xử lý.",
    "Vệ sinh: vệ sinh công cộng ở hộp công cộng, ngay lối từ sảnh nối, bên trên là vệ sinh khu sự kiện tầng 2 cạnh thang máy; khu đọc có vệ sinh cạnh lõi sách ở cả hai tầng, xếp chồng thẳng hàng; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: tầng 1 mỗi hộp có một dải phòng sâu 8,5 m dọc mặt Bắc và mặt Nam; phần giữa chỉ có kho, lõi thang, vệ sinh, kỹ thuật, sảnh. Tầng 2 của cả hai hộp lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây làm đặc.",
    "Không che sáng nhau: hai hộp chỉ chạm nhau ở góc nên cửa sổ Bắc của hộp thư viện nhìn thẳng ra sân Tây Bắc, cửa sổ Nam của hộp công cộng nhìn thẳng ra vườn Đông Nam, không hộp nào đứng trước hộp kia.",
    "Tiếng ồn: phòng đa năng, chuyên đề, cà phê nằm riêng trong hộp công cộng. Trong hộp thư viện, đọc yên tĩnh ở góc Tây Bắc tầng 2, cách học nhóm (góc Đông Nam) hơn 8 m, bên dưới là nghiệp vụ, kho, quầy (không có phòng ồn). Học nhóm có hành lang riêng và kho đệm; văn phòng tầng 2 ngăn với phòng đa năng bằng dải tủ hồ sơ; thiếu nhi ngăn với khu đọc tầng 1 bằng hành lang đệm, vệ sinh và kho đồ chơi.",
    "Ngoài giờ: khóa cửa từ sảnh đón tiếp vào quầy gửi đồ; sảnh đón tiếp, sảnh nối và cả hộp công cộng chạy riêng.",
    "Kết cấu: hai hộp khung bê tông lưới khoảng 8 m, không có phần đua; phòng đa năng 10 × 17,1 m ở tầng 2 dùng dầm thép nhịp 10 m."
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
    id: "chotS10", fam: "chot", code: "S.10", from: "khối vuông", name: "Hai hộp lệch góc", rule: "Hai hộp chữ nhật chạm nhau ở một góc, chia khu đất thành hai sân",
    tag: "Hộp công cộng ở góc Đông Bắc ven sông, hộp thư viện lớn ở góc Tây Nam sát lối Tây; chỗ hai hộp chạm nhau là sảnh đón tiếp và quầy gửi đồ; sân vào Tây Bắc, vườn thiếu nhi Đông Nam",
    story: "Hai hộp đơn giản đặt chéo nhau như hai quân cờ trên bàn. Hộp nhỏ là nơi gặp gỡ: cà phê, chuyên đề, phòng đa năng. Hộp lớn là thư viện. Chỗ hai hộp chạm góc là cửa vào: khách đi từ quảng trường vào sân Tây Bắc, gặp quầy đón tiếp, rồi chọn đi sang hộp công cộng hay qua quầy gửi đồ vào thư viện. Phía bên kia, góc Đông Nam là vườn của thiếu nhi, có tường bao.",
    why: [["Quy luật hình khối", "Hai hộp chữ nhật cùng chiều cao, lệch nhau theo đường chéo, chỉ chạm nhau một đoạn 10 m ở góc; không có phần đua."], ["Khối chính – khối phụ", "Hộp thư viện lớn gần gấp ba hộp công cộng, mái răng cưa cao hơn; hộp công cộng nhỏ, đặt ở góc ven sông."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, mặt Nam hoặc mái răng cưa quay Bắc; mặt Đông, Tây làm đặc."], ["Gió và mưa", "Sân vào Tây Bắc nối với quảng trường; vườn Đông Nam đón gió Đông Nam từ sông, có tường bao cho thiếu nhi."], ["Công năng", "Một cửa vào ở đúng chỗ hai hộp chạm nhau; tiếp nhận, xử lý, kho đóng, quầy, lõi sách đứng cạnh nhau ở góc Tây Bắc hộp thư viện, sát lối giao sách."]],
    kc: { he: "Hai hộp khung bê tông lưới khoảng 8 m, tách khe lún ở chỗ chạm góc; mái tầng 2 răng cưa thép nhẹ; phòng đa năng dầm thép nhịp 10 m.", nhip: "10 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Khách sự kiện có vào được khu đọc?", "Không: khu sự kiện nằm trọn trong hộp công cộng, có thang riêng; tầng 2 hai hộp không thông nhau; vào thư viện chỉ qua quầy gửi đồ cạnh sảnh đón tiếp."], ["Phòng thiếu nhi có lối riêng không?", "Không: thiếu nhi ở cuối hành lang thư viện, sau cổng từ; cửa ra vườn là cửa có chuông báo, vườn có tường bao."], ["Phần giữa hộp thư viện tầng 1 có bí không?", "Chỉ có kho đóng, lưu trữ, lõi sách, kỹ thuật, vệ sinh và sảnh ở đó; mọi phòng có người đều nằm ở dải Bắc hoặc dải Nam, hoặc ở tầng 2 dưới mái răng cưa."]],
    cut: "Tỉ lệ 1:200. Hộp công cộng foam đỏ gạch, hộp thư viện foam trắng, cả hai cao hai tầng, mái răng cưa giấy cỏ và mica quay Bắc; lõi sách tím, thang cam nhô khỏi mái; tường vườn thiếu nhi bìa xám thấp.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[20.5, 60, 10.8, "Khối chính · Hộp thư viện", 1], [33.5, 25, 10.4, "Khối phụ · Hộp công cộng", 2], [19, 50.5, 12.6, "Lõi sách", 2], [22, 42, 6, "Đón tiếp", 2]],
    build() {
      const v = [
        B(17, 46.5, 4, 8, 0.45, 12.45, "violet", "X", { top: "violet", lv: 0 }),
        B(32, 46.5, 3.5, 8, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(32.5, 58.5, 3, 6, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(25.5, 20.5, 6, 5, 0.45, 11.45, "violet", "X", { top: "violet", lv: 0 }),
        B(25.5, 32.65, 4, 5.35, 0.45, 11.45, "warn", "X", { top: "warn", lv: 0 }),
        B(6, 38, 29.5, 36.5, 0.45, 9.45, "sheet", "B", { fl: 2, role: "m" }),
        B(25.5, 12, 16, 26, 0.45, 9.45, "ribbon", "D", { fl: 2, role: "p" }),
        ...teeth(6, 38.5, 29.5, 74.5, 9.45, 1.6, "m"),
        ...teeth(25.5, 12.5, 16, 38, 9.45, 1.2, "p"),
        // tường thấp bao vườn thiếu nhi
        B(41.2, 38, 0.3, 48.5, 0, 1.2, "stone", "X", { role: "p" }), B(6, 86.2, 35.5, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [35.5, 27.5, 19.5, 13.5, 6]) for (const y of [38, 46.5, 54.5, 66, 74.5]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [41.5, 33.5, 25.5]) for (const y of [12, 20.5, 29.5, 38]) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
