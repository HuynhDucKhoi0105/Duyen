/* ================= Ý tưởng K.2: Khe đèo, cầu đọc vắt qua (khe Hải Vân sửa theo góp ý của thầy) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // tầng 1: khe chéo của A thành lối đèo có mái, cắt chéo dải nhà giữa; tầng 2: hộp đọc chữ nhật vắt ngang qua khe như con đường qua đèo
  // mép khe: x = 12 + (y − 40)·1,25 (mép Tây) và x = 18 + (y − 40)·1,25 (mép Đông), từ sân Bắc xuống sân Nam
  const NR = [[6, 14], [38, 14], [38, 30], [6, 30]];              // dải sự kiện, 1 tầng mái cỏ
  const LK1 = [[8.5, 30], [12, 30], [12, 40], [8.5, 40]];         // cầu kính 1 tầng qua sân Bắc: sảnh → trưng bày, sự kiện
  const MW = [[6, 40], [12, 40], [32, 56], [6, 56]];              // chân đèo phía Tây: sảnh đón tiếp, quầy kiểm soát
  const ME = [[18, 40], [38, 40], [38, 56]];                      // chân đèo phía Đông: cà phê
  const MR = [[6, 40], [38, 40], [38, 56], [6, 56]];              // hộp đọc tầng 2 vắt qua khe
  const LK2 = [[9.5, 56], [13.7, 56], [13.7, 66], [9.5, 66]];     // cầu hai tầng qua sân Nam (trong vùng thư viện)
  const SR = [[6, 66], [38, 66], [38, 88], [6, 88]];              // dải thư viện, nghiệp vụ, 2 tầng
  const PASS = [[12, 40], [18, 40], [38, 56], [32, 56]];
  const zN = (x, y) => 6.45 + (30 - y) / 16, zM = (x, y) => 9.45 + (y - 40) / 16, zS = (x, y) => 9.45 + (y - 66) / 22;
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NR, LK1, MW, ME, LK2, SR],
    rooms: [
      // dải sự kiện (mở ngoài giờ), chỉ vào từ sảnh đón tiếp qua cầu kính
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 14, 3.5, 16], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [9.5, 14, 10.5, 7.5], ctl: "sk", nz: 2, seat: 24, d: [["FOYM", 1.2, "p"]] },
      { id: "A2", c: "A2", n: "Trưng bày (đầu cầu kính)", r: [9.5, 21.5, 10.5, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["FOYM", 2.4, "o"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh khu sự kiện", r: [20, 14, 4, 3], ctl: "sk", nz: 1, wc: KT, d: [["FOYM", 1.0, "p"]] },
      { id: "FOYM", c: "circ", n: "Sảnh sự kiện", r: [20, 17, 4, 13], ctl: "sk", nz: 2, occ: 40 },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [24, 14, 11, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["FOYM", 2.4, "p", 0.3], ["FOYM", 1.8, "p", 0.8], ["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5], ["D2", 3, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [35, 14, 3, 7], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [35, 21, 3, 9], ctl: "sk", nz: 3, d: [["D3", 1.0, "p"], ["E", 1.2, "tn"]] },
      { id: "LK1", c: "circ", n: "Cầu kính qua sân Bắc", r: [8.5, 30, 3.5, 10], ctl: "sk", nz: 2, d: [["A2", 2.0, "o"], ["FOYN", 2.4, "o"]] },
      // chân đèo phía Tây: sảnh đón tiếp là bản lề
      { id: "FOYN", c: "circ", n: "Sảnh nối sang sự kiện", r: [6, 40, 6, 6], ctl: "sk", nz: 2, d: [["COR", 2.4, "o"], ["W", 1.2, "tn"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [12, 40, 7.5, 6], ctl: "sk", nz: 1, wc: KT, d: [["COR", 1.0, "p"]] },
      { id: "COR", c: "circ", n: "Hành lang sảnh", r: [6, 46, 15.4, 1.5], ctl: "sk", nz: 2, d: [["A1", 2.4, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [6, 47.5, 3.5, 8.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LOB", 1.4, "thang"]] },
      { id: "LOB", c: "circ", n: "Sảnh sau quầy", r: [9.5, 47.5, 4.2, 8.5], ctl: "tv", nz: 1, d: [["A4", 2.4, "o"], ["LK2", 2.4, "o"]] },
      { id: "A4b", c: "A4", n: "Quầy trả sách, mượn trả thiếu nhi (cổng từ)", r: [6, 66, 3.5, 4.4], ctl: "tv", ctrl: 1, nz: 2, d: [["LOBS", 1.2, "o"], ["NVX", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Quầy mượn trả, cổng từ (kiểm soát sách)", r: [13.7, 47.5, 2, 8.5], ctl: "tv", ctrl: 1, nz: 2, d: [["FOYL", 1.2, "k"]] },
      { id: "FOYL", c: "circ", n: "Sảnh gửi đồ, tủ khóa", r: [15.7, 47.5, 1.6, 8.5], ctl: "sk", nz: 2, d: [["A1", 1.2, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [17.3, 47.5, 14.7, 8.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["X", 2.4, "chinh", 0.5], ["S", 2.4, "tudong", 0.6]] },
      // chân đèo phía Đông: cà phê mở ra khe và sân Bắc, chỉ thông với khe
      { id: "A3", c: "A3", n: "Cà phê sách", r: [18, 40, 13.5, 10.8], ctl: "sk", nz: 3, seat: 32, bar: [[18.5, 40.4], [31, 50.4], 26], d: [["X", 1.8, "tudong", 0.35], ["N", 1.6, "tn", 0.5]] },
      { id: "KC2", c: "circ", n: "Kho, tủ đồ cà phê", r: [31.5, 40, 3, 8], ctl: "sk", nz: 1, d: [["A3", 0.9, "p"]] },
      { id: "ST3", n: "Thang thoát nạn Đông (hộp đọc)", r: [34.5, 40, 3.5, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["E", 1.2, "tnbd"]] },
      { id: "KCP", c: "circ", n: "Chuẩn bị, rửa (cà phê)", r: [31.5, 48, 6.5, 8], ctl: "sk", nz: 1, d: [["A3", 1.2, "p"]] },
      // cầu qua sân Nam, sau quầy kiểm soát
      { id: "LK2", c: "circ", n: "Cầu kính qua sân Nam", r: [9.5, 56, 4.2, 10], ctl: "tv", nz: 1, d: [["LOBS", 2.4, "o"]] },
      // dải phía Nam: lõi sách ở đầu cầu (thang có tời sách, kho đóng hai gian, quầy trả sách, nghiệp vụ), thiếu nhi phía Bắc
      { id: "NVX", c: "circ", n: "Lối nhân viên, nhận sách trả", r: [6, 70.4, 3.5, 9.1], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["C4", 1.0, "nv"], ["STS", 0.9, "nv"]] },
      { id: "LOBS", c: "circ", n: "Sảnh thư viện phía Nam", r: [9.5, 66, 4.2, 8.5], ctl: "tv", nz: 1, d: [["B3", 2.4, "o"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [13.7, 66, 22.3, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.5], ["WCL1", 0.9, "p"], ["STRL", 0.9, "p"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [36, 66, 2, 5], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "STRL", c: "circ", n: "Chỗ để xe đẩy", r: [36, 71, 2, 3.5], ctl: "tv", nz: 1, d: [["E", 1.0, "tnbd"]] },
      { id: "STS", n: "Thang bộ + thang máy + tời sách Nam", r: [9.5, 74.5, 4.2, 5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["C1a", 1.2, "nv"], ["NVC", 1.0, "nv"]] },
      { id: "C1a", c: "C1", n: "Kho đóng (gian Tây, sát tời sách)", r: [13.7, 74.5, 12, 5], ctl: "kho", nz: 1, d: [["C1b", 1.2, "nv"], ["NVC", 1.2, "nv"]] },
      { id: "C1b", c: "C1", n: "Kho đóng (gian Đông)", r: [25.7, 74.5, 9.8, 5], ctl: "kho", nz: 1, d: [["NVC", 1.0, "nv", 0.8]] },
      { id: "ST4", n: "Thang thoát nạn Đông (dải phía Nam)", r: [35.5, 74.5, 2.5, 5], ctl: "tv", nz: 1, core: { st: "u", link: "ST4" }, d: [["E", 1.2, "tnbd"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 79.5, 3.5, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["C2", 1.2, "nv"]] },
      { id: "NVC", c: "circ", n: "Hành lang nghiệp vụ", r: [9.5, 79.5, 28.5, 1.5], ctl: "nv", nz: 1, d: [["C2", 1.2, "nv"], ["C3", 1.0, "nv"], ["E2", 0.9, "nv"], ["E6", 0.9, "nv"], ["E3", 0.9, "nv"], ["NVE", 1.0, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.5, 81, 9.5, 7], ctl: "nv", nz: 1 },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [19, 81, 6.1, 7], ctl: "kho", nz: 1 },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [25.1, 81, 5.7, 7], ctl: "nv", nz: 1 },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [30.8, 81, 2.9, 7], ctl: "nv", nz: 1 },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [33.7, 81, 2.3, 7], ctl: "nv", nz: 1 },
      { id: "NVE", c: "circ", n: "Lối ra nhân viên", r: [36, 81, 2, 7], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"]] }
    ],
    staff: [
      { x: 24, y: 52, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 14.7, y: 51, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.7, y: 68, t: "Thủ thư trả sách, thiếu nhi", sc: ["1", "3"] },
      { x: 34.8, y: 84, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 24, y: 42, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 14, y: 84.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.7, y: 83, t: "Nhận sách", sc: ["4"] },
      { x: 33, y: 26, t: "Điều phối sự kiện, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [MR, LK2, SR],
    rooms: [
      // hộp đọc vắt qua khe: kệ mở và đọc linh hoạt sát đầu cầu, học nhóm gom ở đầu Đông sau vệ sinh
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [6, 40, 3.5, 16], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LOBM", 1.2, "thang"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (nhìn sân Bắc)", r: [9.5, 40, 11.7, 8], ctl: "tv", nz: 1, shelf: 0.35 },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [21.2, 40, 13.3, 8], ctl: "tv", nz: 1, seat: 16 },
      { id: "ST3", n: "Thang thoát nạn Đông (hộp đọc)", r: [34.5, 40, 3.5, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" } },
      { id: "LOBM", c: "circ", n: "Đầu cầu đọc", r: [9.5, 48, 4.2, 8], ctl: "tv", nz: 1, d: [["LK2", 2.4, "o"], ["B1n", 2.4, "o"], ["COR3", 1.2, "o"]] },
      { id: "COR3", c: "circ", n: "Hành lang hộp đọc", r: [13.7, 48, 24.3, 1.5], ctl: "tv", nz: 1, d: [["B5", 1.4, "o"], ["B6", 2.4, "o"], ["WCB4", 0.9, "p"], ["B4a", 0.9, "p"], ["B4b", 0.9, "p"], ["B4c", 0.9, "p"], ["B4d", 0.9, "p"], ["ST3", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [13.7, 49.5, 7.8, 6.5], ctl: "tv", nz: 1, steps: 6 },
      { id: "WCB4", c: "E5", n: "Vệ sinh tầng 2 (hộp đọc)", r: [21.5, 49.5, 2, 6.5], ctl: "tv", nz: 1, wc: KT },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [23.5, 49.5, 3.625, 6.5], ctl: "tv", nz: 2 },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [27.125, 49.5, 3.625, 6.5], ctl: "tv", nz: 2 },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [30.75, 49.5, 3.625, 6.5], ctl: "tv", nz: 2 },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [34.375, 49.5, 3.625, 6.5], ctl: "tv", nz: 2 },
      { id: "LK2", c: "circ", n: "Cầu đọc qua sân Nam", r: [9.5, 56, 4.2, 10], ctl: "tv", nz: 1, d: [["LOBS2", 2.4, "o"]] },
      // dải phía Nam tầng 2: kệ mở quây quanh đầu thang có tời sách, đọc yên tĩnh ở góc Tây Nam
      { id: "B1w", c: "B1", n: "Góc đọc Tây", r: [6, 66, 3.5, 8.5], ctl: "tv", nz: 1 },
      { id: "LOBS2", c: "circ", n: "Sảnh đọc phía Nam", r: [9.5, 66, 4.2, 8.5], ctl: "tv", nz: 1, d: [["B1w", 1.2, "o"], ["B1s", 2.4, "o"], ["STS", 1.4, "thang"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (nhìn sân Nam)", r: [13.7, 66, 24.3, 8.5], ctl: "tv", nz: 1, shelf: 0.4 },
      { id: "WCS2", c: "E5", n: "Vệ sinh tầng 2 phía Nam", r: [6, 74.5, 3.5, 5], ctl: "tv", nz: 1, wc: KT },
      { id: "STS", n: "Thang bộ + thang máy + tời sách Nam", r: [9.5, 74.5, 4.2, 5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["COR5", 1.0, "o"], ["WCS2", 0.9, "p"]] },
      { id: "COR5", c: "circ", n: "Hành lang kệ", r: [13.7, 74.5, 21.8, 1.0], ctl: "tv", nz: 1, d: [["B1mid", 2.4, "o"]] },
      { id: "B1mid", c: "B1", n: "Kệ và bàn đọc dưới cửa mái Bắc", r: [13.7, 75.5, 21.8, 4], ctl: "tv", nz: 1, top: "N", d: [["B2", 2.4, "p"], ["B1e", 1.6, "o"]] },
      { id: "ST4", n: "Thang thoát nạn Đông (dải phía Nam)", r: [35.5, 74.5, 2.5, 5], ctl: "tv", nz: 1, core: { st: "u", link: "ST4" }, d: [["B1e", 1.2, "thang"], ["B1s", 1.2, "thang"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 79.5, 17.4, 8.5], ctl: "tv", nz: 0, seat: 40, d: [["STS", 1.2, "thang"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [23.4, 79.5, 8.5, 8.5], ctl: "nv", nz: 0, d: [["B1mid", 0.9, "nv", 0.8], ["B1e", 0.9, "nv"]] },
      { id: "B1e", c: "B1", n: "Góc đọc Đông Nam", r: [31.9, 79.5, 6.1, 8.5], ctl: "tv", nz: 1 }
    ],
    staff: [
      { x: 26, y: 44, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 27.5, y: 84, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotK2", code: "K.2", name: "Khe đèo, cầu đọc vắt qua", from: "A",
    NR, MW, ME, MR, SR, LK1, LK2, PASS,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 9.5, 14, 22, 30, 38], y: [14, 22, 30, 40, 48, 56, 66, 74.5, 79.5, 88] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 83.5], [5.2, 83.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40, 96], [40, 61], [36, 58], [29, 54], [26.5, 51.5]]],
        event: [[[20, -9], [40, 6], [40, 35], [16, 35], [15, 40], [22, 46], [26.5, 51.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc sông, vào miệng đèo tới sảnh đón tiếp", event: "Khách sự kiện: vào khe từ sân Bắc tới sảnh đón tiếp, rồi qua cầu kính" },
      hatch: [PASS],
      labels: [[26, 54, "Khe đèo (dưới hộp đọc)"], [22, 35, "Sân Bắc"], [24, 61, "Sân Nam"], [20, 22, "Dải sự kiện"], [22, 78, "Lõi sách phía Nam"]]
    }
  };
  plan.intro = `<p class="lede">Giữ phong cách khe Hải Vân của A: ở tầng 1, khe vẫn cắt chéo Tây Bắc – Đông Nam như con đường đèo, tầng 2 là hộp đọc chữ nhật vắt ngang qua. Ba dải nhà quay Bắc – Nam, cách nhau hai sân 10 m. Bản sửa ngày 05/11 gom thư viện quanh <b>hai đầu cầu kính</b>: phía Bắc là quầy mượn trả có cổng từ ngay sau sảnh gửi đồ (cách sảnh đón tiếp 7 m) và thang có tời sách; phía Nam là thang có tời sách thứ hai, kho đóng, xử lý nghiệp vụ, tiếp nhận và quầy trả sách nằm sát nhau. Kệ mở tầng 2 quây quanh hai đầu thang; sách từ kho tới kệ xa nhất 43 m. Học nhóm gom ở đầu Đông hộp đọc, sau vệ sinh; đọc yên tĩnh ở góc Tây Nam tầng 2.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: kho đóng chuyển thành hai gian nằm ngay cạnh thang có tời sách phía Nam; xử lý nghiệp vụ, tiếp nhận đứng ngay dưới. Thêm quầy trả sách, mượn trả thiếu nhi (có cổng từ) ở đầu cầu phía Nam, sát lối nhân viên. Quầy mượn trả chính thu hẹp, có sảnh gửi đồ, tủ khóa phía trước. Thêm vệ sinh sát phòng đa năng. Hộp đọc tầng 2 xếp lại: kệ mở và tra cứu số phía Bắc, đọc linh hoạt và vệ sinh ở giữa, học nhóm ở đầu Đông. Bỏ vệ sinh riêng của cà phê (dùng vệ sinh sảnh, cách 10 m); dải phía Nam dài thêm 2 m về phía sông.",
    "Đường sách: xe vào lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý nghiệp vụ → hành lang nghiệp vụ → kho đóng (9 m) → tời sách lên kệ tầng 2 ngay trên đầu. Sách trả: quầy trả sách → lối nhân viên → tiếp nhận → xử lý, toàn bộ qua cửa nhân viên (17 m). Quầy mượn trả chính phía Bắc dùng thang có tời sách thứ hai. Kho tới kệ xa nhất 43 m.",
    "Thang có hệ quả: hai thang có tời sách và tháp thang Đông của hộp đọc đều nằm sau quầy có cổng từ. Người đọc đi: cửa chính giữa đèo → sảnh đón tiếp → sảnh gửi đồ → quầy mượn trả → sảnh sau quầy → thang lên hộp đọc, hoặc cầu kính xuống dải phía Nam. Thang Nam ở tầng 1 chỉ mở vào kho và hành lang nhân viên. Dải sự kiện một tầng, không có thang.",
    "Vệ sinh: cụm sảnh mở ngoài giờ cạnh sảnh đón tiếp (cách 10 m), cụm sự kiện ngay sảnh phòng đa năng (9 m). Trong khu đọc: vệ sinh thay tã sát thiếu nhi (11 m), vệ sinh giữa hộp đọc tầng 2, vệ sinh cạnh thang Nam tầng 2. Chỗ đọc xa nhất tới vệ sinh 31 m, không phải ra khỏi cổng từ.",
    "Ánh sáng Bắc – Nam: dải sự kiện và hộp đọc sâu 16 m, chia hai hàng phòng quay Bắc và quay Nam với hành lang giữa; dải phía Nam sâu 22 m chia ba lớp: phòng quay Bắc 8,5 m, lớp giữa 5 m là kho, thang, vệ sinh, phòng quay Nam 7–8,5 m. Ở tầng 2, lớp giữa là kệ dưới cửa mái hướng Bắc. Hai bên khe đèo, các đầu Đông, Tây là tường đặc.",
    "Tiếng ồn: đọc yên tĩnh ở góc Tây Nam tầng 2, cách học nhóm hơn 23 m, bên dưới là xử lý nghiệp vụ và kho tài liệu, không nằm trên thiếu nhi. Học nhóm ở đầu Đông hộp đọc, có hành lang riêng, ngăn đọc linh hoạt bằng vệ sinh, ngăn tra cứu số bằng hành lang. Thiếu nhi ở tầng 1 dải phía Nam, ngăn sảnh bằng hai lớp cửa. Văn phòng, phòng nhân viên không sát phòng ồn.",
    "Đón tiếp là bản lề: cửa chính mở từ giữa đèo vào sảnh đón tiếp, cửa phụ từ sân Nam. Khách sự kiện đi sảnh → hành lang → cầu kính → trưng bày → sảnh sự kiện → phòng đa năng, chuyên đề; dải sự kiện không có cửa vào nào khác. Cà phê ở chân đèo phía Đông chỉ mở ra khe, không thông vào đâu khác.",
    "Ngoài giờ: sảnh, hành lang, vệ sinh sảnh, cầu kính, trưng bày, phòng đa năng, chuyên đề và cà phê chạy riêng. Chỉ khóa cửa sảnh gửi đồ → quầy mượn trả; cửa này không nằm trên đường thoát nạn.",
    "Thoát nạn: đọc yên tĩnh có cửa thẳng ra sảnh thang Nam; kho đóng gian Đông có cửa ra hành lang nghiệp vụ. Thêm thang thoát nạn nhỏ ở đầu Đông dải phía Nam (lõi cam, hai tầng thẳng hàng), tầng 2 mở từ góc đọc Đông Nam và kệ mở phía Nam, tầng 1 chỉ có cửa có chuông báo ra bờ sông; góc Đông Nam tầng 2 giờ cách thang dưới 30 m.",
    "Kết cấu: hộp đọc tầng 2 là dầm sàn nhịp 16 m gối lên hai chân đèo, cột đôi dọc hai mép khe. Kho đóng ở tầng 1 trên nền. Dải sự kiện một tầng, phòng đa năng 11 × 16 m mái nhẹ không cột. Không có phần đua.",
    "Tổng sàn 2.967 m², dưới mức 3.000 m²."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { PO, B, col } = G.K;
  const coreBox = (L, id, c, f) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r, top = Math.max(...[[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([a, b]) => f(a, b))); return B(x, y, w, h, 0.45, top + 1.0, c, "X", { top: c, lv: 0 }); };
  const fa = { N: "kinh", E: "dac", S: "kinh", W: "dac" };
  plan.idea = {
    id: "chotK2", fam: "chot", code: "K.2", from: "A", name: "Khe đèo · hộp đọc vắt qua khe", rule: "Đường chéo dưới, hộp ngang trên",
    tag: "Tầng 1 giữ khe chéo Hải Vân làm lối đèo có mái; tầng 2 là hộp đọc chữ nhật vắt qua; ba dải nhà quay Bắc – Nam",
    story: "Đường đèo Hải Vân luồn dưới những đoạn cầu. Ở K.2, khe chéo của A vẫn là lối đi bộ chéo từ sân Bắc xuống sân Nam, nhưng tầng trên là một hộp đọc chữ nhật nằm ngang vắt qua, che mưa cho lối đi. Giữa đèo là cửa sảnh đón tiếp; bên kia khe là cà phê. Phía Bắc là dải sự kiện một tầng mái cỏ, phía Nam là thư viện hai tầng.",
    why: [["Quy luật hình khối", "Tương phản hai lớp: dưới là khe chéo cắt qua đất, trên là ba hộp chữ nhật nằm ngang. Khe chỉ đọc được khi đi trong đèo, nhìn từ xa là các hộp đơn giản."], ["Khối chính – khối phụ", "Hộp đọc vắt qua khe và dải thư viện phía Nam (hai tầng) là khối chính; dải sự kiện một tầng là khối phụ phía Bắc; hai cầu kính là khối nối."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam; mặt sông và mặt Trần Phú đặc. Lớp giữa dải Nam ở tầng 2 lấy sáng bằng cửa mái hướng Bắc."], ["Gió và mưa", "Khe đèo và hai sân mở về phía sông, đón gió Đông Nam; mưa Đông Bắc không tạt vào cửa chính vì cửa nằm dưới hộp đọc."]],
    kc: { he: "Khung bê tông lưới 8 m; hộp đọc tầng 2 là sàn dầm nhịp 16 m gối lên tường, cột hai chân đèo, cột đôi dọc hai mép khe. Dải sự kiện một tầng, mái nhẹ nhịp 16 m. Dải phía Nam ba lớp, hàng cột ở hai mép lớp giữa.", nhip: "16 m", cx: "Không có phần đua" },
    qa: [["Khe có còn chéo như A không?", "Có, ở tầng 1: khe chạy chéo từ sân Bắc (đầu Tây) xuống sân Nam (đầu Đông), rộng 6 m theo phương ngang. Khác A ở chỗ tầng 2 có hộp đọc vắt qua và hai bên khe là tường đặc."], ["Khách sự kiện có phải đi qua thư viện?", "Không: từ sảnh đón tiếp đi hành lang và cầu kính sang dải sự kiện; thư viện nằm sau quầy mượn trả, khóa ngoài giờ."], ["Phòng đa năng một tầng có đủ cao không?", "Cao thông thủy khoảng 5,5–6,5 m theo mái dốc, đủ cho 120 người và máy chiếu."]],
    cut: "Ba dải foam: dải sự kiện cao 3,5 cm mái giấy cỏ, hộp đọc và dải Nam cao 5 cm. Chân đèo dưới hộp đọc cắt chéo bằng dao, để lộ lối đi. Cầu kính mica. Lõi thang foam tím, cam cao hơn mái 0,5 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 48, 11.2, "Khối chính · Hộp đọc vắt qua khe", 1], [22, 76, 11.2, "Khối chính · Thư viện phía Nam", 1], [22, 20, 8, "Khối phụ · Dải sự kiện", 2], [27, 50, 2, "Khe đèo"], [10, 35, 5.5, "Cầu kính"]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", zM), coreBox(t1, "STS", "violet", zS), coreBox(t1, "ST3", "warn", zM), coreBox(t1, "ST4", "warn", zS),
        PO(NR, 0.45, zN, "sheet", "D", { fa, fl: 1, top: "grass" }),
        PO(MW, 0.45, 4.95, "sheet", "A", { fl: 1 }), PO(ME, 0.45, 4.95, "sheet", "A", { fl: 1 }),
        PO(MR, 4.95, zM, "sheet", "B", { fa, fl: 1, top: "grass", role: "m" }),
        PO(SR, 0.45, 4.95, "sheet", "C", { fa, fl: 1, role: "m" }), PO(SR, 4.95, zS, "sheet", "B", { fa, fl: 1, top: "grass", role: "m" }),
        B(8.5, 30, 3.5, 10, 0.45, 4.95, "glass", "L", { fl: 1 }),
        B(9.5, 56, 4.2, 10, 0.45, 9.45, "glass", "L", { fl: 2 })
      ];
      const st = [];
      for (const [x, y] of [[6, 14], [38, 14], [6, 30], [38, 30], [6, 40], [38, 40], [6, 56], [38, 56], [6, 66], [38, 66], [6, 88], [38, 88], [12, 40], [18, 40], [32, 56], [22, 48], [27, 48]]) st.push(col(x, y, 0.45, y < 35 ? zN(x, y) : y < 60 ? zM(x, y) : zS(x, y)));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
