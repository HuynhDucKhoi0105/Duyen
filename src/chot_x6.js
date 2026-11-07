/* ================= Ý tưởng X.6: Sảnh đọc thông tầng sau quầy A4 (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // Giữ vết các khối, số tầng của bản xếp; sau quầy A4 là một sảnh đọc cao hai tầng có thang chính hở, tầng 2 là hành lang đọc quanh ô thông tầng.
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  const Y0 = 38.5, YA = 41.7, YB = 47.5, YC2 = 47, YW = 50.4, YCS = 59, YB3 = 67.5, YB3s = 75.5, YSC = 78.8, YS = 80.4, YE = 88.8;
  const COURT = Q(16.5, 50.25, 25, 17.25), YARD = Q(6, 28.5, 22.5, 10);

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // khối sự kiện phía Bắc (giữ chỗ của bản xếp, lùi về x ≥ 6)
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6, 16, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 21, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 8], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [35.5, 16, 3.75, 8], ctl: "sk", nz: 1, wc: KT, d: [["CO3", 1.2, "p"]] },
      { id: "CO3", c: "circ", n: "Sảnh sự kiện", r: [26, 24, 13.25, 4.5], ctl: "sk", nz: 2, occ: 40, d: [["E", 1.6, "tn"], ["A2", 2.4, "o"]] },
      // nhánh cũ của cà phê: nay là trưng bày, nằm trên đường từ sảnh sang sự kiện
      { id: "A2", c: "A2", n: "Trưng bày (trên đường sang sự kiện)", r: [28.5, 28.5, 11, 8.15], ctl: "sk", nz: 2, occ: 30, top: N, d: [["SH", 2.4, "o"]] },
      { id: "SH", c: "circ", n: "Sảnh trưng bày, chia luồng", r: [28.5, 36.65, 11, 1.85], ctl: "sk", nz: 2, d: [["A1", 2.4, "o"], ["A3", 2.4, "o"]] },
      // dải giữa: nghiệp vụ | quầy A4 + sảnh đọc thông tầng | đón tiếp | cà phê
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (cửa sau quầy A4)", r: [6, Y0, 8, YC2 - Y0], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"], ["C4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (dải quầy dọc kính Bắc)", r: [14, Y0, 9.5, YA - Y0], ctl: "tv", ctrl: 1, nz: 2, d: [["SDT", 3.0, "o", 0.35]] },
      { id: "SDT", c: "B1", n: "Sảnh đọc thông tầng: báo, sách mới", r: [14, YA, 6.5, YB - YA], ctl: "tv", nz: 1, top: N, d: [["HLT", 2.0, "o"]] },
      { id: "STH", n: "Thang chính thư viện (thang hở trong sảnh đọc)", r: [20.5, YA, 3, YB - YA], ctl: "tv", nz: 1, core: { st: "u", link: "STH" }, d: [["SDT", 1.4, "thang"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [23.5, Y0, 8.9, YB - Y0], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["S", 2.4, "chinh", 0.4], ["A4", 2.0, "k"], ["A3", 2.4, "o", 0.7]] },
      { id: "A3", c: "A3", n: "Cà phê sách (mở ra vườn và bờ sông)", r: [32.4, Y0, 8.1, YB - Y0], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.2, "tn", 0.5]] },
      // cột nghiệp vụ phía Tây (áp lối Tây): tiếp nhận → xử lý → kho đóng → lưu trữ, lõi sách giữa cột
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [10, YC2, 4, YW - YC2], ctl: "tv", nz: 1, wc: KT },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, YC2, 4, 7.75], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.55], ["W", 1.0, "nv", 0.12], ["C1a", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, YW, 4, YCS - YW], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HLT", 1.4, "thang"], ["C4", 1.0, "nv"], ["C1b", 1.0, "nv"]] },
      { id: "C1a", c: "C1", n: "Kho đóng (cửa xe sách)", r: [6, YC2 + 7.75, 4, YCS - YC2 - 7.75], ctl: "kho", nz: 1, d: [["C1b", 1.6, "nv"]] },
      { id: "C1b", c: "C1", n: "Kho đóng", r: [6, YCS, 8, 13], ctl: "kho", nz: 1, d: [["HLT", 1.0, "nv"], ["HLS", 1.0, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 72, 8, 5], ctl: "kho", nz: 1, d: [["C1b", 1.0, "nv"], ["HLS", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 77, 5.9, YS - 77], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["C3", 0.9, "nv"]] },
      { id: "KC", c: "circ", n: "Kho xe sách tầng 1", r: [11.9, 77, 2.1, YS - 77], ctl: "nv", nz: 1, d: [["HLS", 0.9, "nv"], ["C3", 0.9, "nv"]] },
      // hành lang thư viện: dọc sân (chỗ bản xếp đặt A4), rồi vòng xuống phía Nam
      { id: "HLT", c: "circ", n: "Hành lang thư viện nhìn sân", r: [14, YB, 2.5, YB3 - YB], ctl: "tv", nz: 1, d: [["WCL1", 1.0, "p"], ["HLS", 2.0, "o"], ["E", 1.2, "tnbd", 0.5]] },
      { id: "HLS", c: "circ", n: "Hành lang thư viện Nam", r: [14, YB3, 3, YS - YB3], ctl: "tv", nz: 1, d: [["B3", 1.8, "p", 0.4], ["WCB", 1.0, "p"], ["B1s", 1.8, "o"]] },
      // phòng thiếu nhi (giữ chỗ của bản xếp), vệ sinh trẻ em, kho đồ chơi
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (nhìn vườn trong sân)", r: [17, YB3, 22.5, YB3s - YB3], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [17, YB3s, 4.1, YSC - YB3s], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [21.1, YB3s, 1.4, YSC - YB3s], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [22.5, YB3s, 17, YSC - YB3s], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"], ["SC", 1.2, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang nhân viên Nam", r: [17, YSC, 22.5, YS - YSC], ctl: "nv", nz: 1, d: [["E1", 0.9, "nv", 0.3], ["E2", 0.9, "nv"], ["SEH", 1.2, "o"], ["E", 1.0, "nv"]] },
      // dải Nam: thang Tây Nam, đọc tầng 1, văn phòng, phòng nhân viên, bảo vệ, thang Đông Nam
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["S", 1.2, "tnbd"], ["B1s", 1.2, "thang"]] },
      { id: "B1s", c: "B1", n: "Đọc mở, bàn đọc (nhìn vườn Nam)", r: [9, YS, 9.5, YE - YS], ctl: "tv", nz: 1, d: [["S", 1.2, "tnbd", 0.5]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [18.5, YS, 9.5, YE - YS], ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [28, YS, 4.75, YE - YS], ctl: "nv", nz: 1 },
      { id: "SEH", c: "circ", n: "Tủ đồ nhân viên, sảnh vào", r: [32.75, YS, 4.45, 5.03], ctl: "nv", nz: 1, d: [["E3", 0.9, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (cửa nhân viên)", r: [32.75, YS + 5.03, 4.45, YE - YS - 5.03], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [37.2, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" }, d: [["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 27, y: 42, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 18.5, y: 40, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 35, y: 87, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 37, y: 42, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 42.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 51, t: "Nhận sách", sc: ["4"] },
      { x: 23, y: 84.6, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 32, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 24, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hành lang đọc quanh ô thông tầng, giữ các khối tầng 2 của bản xếp ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      // thanh Bắc: ô thông tầng ngay trên sảnh đọc, bàn đọc dọc kính Bắc, thang chính
      { id: "B5", c: "B5", n: "Tra cứu số", r: [4, Y0, 6, 16.5], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1n", 1.6, "o"], ["CS", 1.2, "thang"], ["B1w", 1.6, "o"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (nhìn xuống thông tầng)", r: [10, Y0, 4, YW - Y0], ctl: "tv", nz: 1, top: N, d: [["B1g", 1.6, "o"], ["G2", 1.6, "o"]] },
      { id: "B1g", c: "B1", n: "Bàn đọc dọc kính Bắc (trên quầy A4)", r: [14, Y0, 9.5, YA - Y0], ctl: "tv", nz: 1, top: N, d: [["STH", 1.4, "thang"], ["B1e", 1.6, "o"]] },
      { id: "TT", c: "circ", n: "Thông tầng (nhìn xuống sảnh đọc)", r: [14, YA, 6.5, YB - YA], ctl: "tv", nz: 1, void: 1, nofurn: 1, d: [["B1g", 1.2, "o"]] },
      { id: "STH", n: "Thang chính thư viện (thang hở trong sảnh đọc)", r: [20.5, YA, 3, YB - YA], ctl: "tv", nz: 1, core: { st: "u", link: "STH" }, d: [["G2", 1.4, "thang"], ["B1e", 1.2, "thang"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh đón tiếp)", r: [23.5, Y0, 3.9, YB - Y0], ctl: "tv", nz: 1, top: N },
      { id: "G2", c: "B1", n: "Bàn đọc dọc lan can thông tầng", r: [14, YB, 9.5, 2.75], ctl: "tv", nz: 1, top: N, d: [["B6", 1.8, "o"]] },
      // cánh Tây: lõi sách, tra cứu, đọc cá nhân, đọc yên tĩnh
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, YW, 4, YCS - YW], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B6", 1.4, "thang"]] },
      { id: "B1w", c: "B1", n: "Bàn đọc cá nhân", r: [4, 55, 6, YCS - 55], ctl: "tv", nz: 1, top: N },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [14, YB + 2.75, 4, 12.5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["HL2", 1.6, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (cuối cánh Tây, xa thông tầng và học nhóm)", r: [4, YCS, 10, YB3s - YCS], ctl: "tv", nz: 0, seat: 40, top: N, d: [["HL2", 1.2, "p", 0.4], ["HB", 1.0, "p"]] },
      { id: "HL2", c: "circ", n: "Hành lang đọc Tây", r: [14, YB + 2.75 + 12.5, 4, 73.6 - (YB + 2.75 + 12.5)], ctl: "tv", nz: 1, d: [["HB", 2.0, "o"], ["KD", 0.9, "p"]] },
      // dải trên phòng thiếu nhi: chỉ học nhóm (ồn chồng lên ồn), kho đệm, hành lang
      { id: "KD", c: "circ", n: "Kho đệm, máy in, xe sách", r: [18, YB3, 4.5, 73.6 - YB3], ctl: "tv", nz: 1 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [22.5 + 4.25 * i, YB3, 4.25, 73.6 - YB3], ctl: "tv", nz: 2, top: N, d: [["HB", 0.9, "p"]] })),
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [14, 73.6, 25.5, YB3s - 73.6], ctl: "tv", nz: 2, d: [["LK", 2.0, "o"], ["BRE", 1.4, "o"]] },
      { id: "LK", c: "circ", n: "Cầu nối Tây", r: [14, YB3s, 4, YS - YB3s], ctl: "tv", nz: 1, d: [["B1m", 1.8, "o"], ["WC2", 1.0, "p"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2 (trên vệ sinh thiếu nhi)", r: [18, YB3s, 3.1, YS - YB3s], ctl: "tv", nz: 1, wc: KT },
      { id: "BRE", c: "circ", n: "Cầu nối Đông, tới thang Đông Nam", r: [36.2, YB3s, 3, YS - YB3s], ctl: "tv", nz: 1, d: [["STE3", 1.2, "thang"]] },
      // thanh Nam: sảnh đọc lớn giữa hai thang
      { id: "STE2", n: "Thang thoát hiểm Tây Nam", r: [6, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["B1m", 1.2, "thang"]] },
      { id: "B1m", c: "B1", n: "Sảnh đọc lớn phía Nam", r: [9, YS, 28.2, YE - YS], ctl: "tv", nz: 1, top: N, d: [["STE3", 1.2, "thang"]] },
      { id: "STE3", n: "Thang thoát hiểm Đông Nam", r: [37.2, YS, 3, YE - YS], ctl: "tv", nz: 1, core: { st: "u", link: "STE3" } }
    ],
    staff: [{ x: 16, y: 56, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX6", code: "X.6", name: "Sảnh đọc thông tầng sau quầy", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 17, 20.5, 23.5, 28.5, 32.4, 40.5], y: [16, 24, 28.5, Y0, YA, YB, YCS, YB3, YB3s, YS, YE] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 77, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 51.5], [5.2, 51.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 58], [27, 58], [27, 48]]],
        event: [[[20, -9], [20, 6], [3, 10], [3, 33], [26, 33], [26, 38.2]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào vườn giữa, cửa Nam sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, theo lối Tây vào sân trước, cửa Bắc sảnh đón tiếp" },
      hatch: [COURT, YARD],
      labels: [[17, 33, "Sân trước (cửa Bắc)"], [30, 58, "Vườn giữa (cửa Nam)"], [17.3, 44.6, "Thông tầng"]]
    }
  };
  plan.intro = `<p class="lede">X.6 dựng từ bản xếp khối của bạn, lấy một ý chính: <b>ngay sau quầy A4 là một sảnh đọc cao hai tầng</b>. Khách vào sảnh đón tiếp A1, qua dải quầy gửi đồ, mượn trả A4 có cổng từ chạy dọc kính Bắc, rồi bước xuống sảnh đọc thông tầng có thang chính hở. Đứng ở sảnh nhìn lên thấy cả tầng 2: bàn đọc dọc kính Bắc, bàn đọc dọc lan can, các kệ đọc mở bao quanh ô thông tầng. Từ sảnh đi thẳng hành lang dọc sân tới phòng thiếu nhi và đọc tầng 1 phía Nam, hoặc lên thang chính tới mọi phòng đọc tầng 2. Khối sự kiện, cà phê, trưng bày giữ ở nửa Bắc, mở ngoài giờ.</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn lối Tây 6 m (D2, D3, cột kho C, lõi sách, vệ sinh, thang Tây Nam) lùi về x ≥ 6, dời 1,2–1,8 m; tầng 2 vẫn nhô ra lối Tây tới x = 4. (2) Chỗ thang máy CN và nửa Tây khối A1 của bản xếp thành dải quầy A4 dọc kính Bắc, sảnh đọc thông tầng và thang chính; A1 vì thế dời sang Đông khoảng 4,5 m (quá 2 m) để thứ tự đi là A1 → A4 → sảnh đọc, cửa chính vẫn mở ra sân trước và vườn giữa. (3) A4 trong bản xếp đứng riêng giữa sân, không nối với A1: chuyển vào dải giữa; chỗ cũ của A4 thành hành lang thư viện dọc sân. (4) Cà phê A3 đổi chỗ với trưng bày A2: A2 lên nhánh cà phê cũ, nằm đúng trên đường từ sảnh sang khu sự kiện; A3 xuống đầu Đông dải giữa (chỗ A2 cũ), cửa mái Bắc, cửa ra vườn và bờ sông.",
    "Đã sửa (tiếp): (5) Lõi sách tầng 1 của bản xếp nằm ở đầu Bắc cột kho, còn lõi sách tầng 2 bạn để trên bàn nháp: gộp thành một lõi thẳng hai tầng ở giữa cột kho (dời xuống khoảng 12 m), sát tiếp nhận C4, kho đóng C1 và hành lang thư viện. (6) Cột kho xếp lại theo đường sách: xử lý C2 ở đầu Bắc (có cửa sổ Bắc, cửa nhân viên thẳng sang quầy A4), tiếp nhận C4 ngay dưới (cửa cuốn ra lối Tây), rồi kho đóng C1, lưu trữ C3 (C3 từ dải Nam chuyển về, liền kho đóng). (7) Thang bộ STS tầng 2 của bản xếp không có thang tầng 1 bên dưới: thay bằng thang chính hở đặt thẳng hai tầng trong sảnh đọc, dời sang Đông khoảng 6 m. Thang máy thứ hai giữa nhà bỏ (lõi sách có thang máy, bốn thang bộ đủ thoát nạn dưới 30 m); thêm thang Đông Nam ở chỗ hành lang LC và bảo vệ E3 của bản xếp.",
    "Đã sửa (tiếp): (8) Tầng 2 trên phòng thiếu nhi: bản xếp đặt đọc mở B1a, B1w ngay trên nguồn ồn; đổi thành bốn phòng học nhóm B4 (ồn chồng lên ồn, lấy từ chồng học nhóm ở cánh Tây của bản xếp), kho đệm và hành lang. (9) Đọc yên tĩnh B2 của bản xếp ở thanh Nam chỉ cách học nhóm 4,9 m: chuyển về cuối cánh Tây tầng 2, trên kho, cách học nhóm 8,5 m, cách ô thông tầng hơn 11 m; thanh Nam thành sảnh đọc lớn B1 giữa hai thang. (10) Phòng thiếu nhi B3 nới sang Tây 3,5 m (vào chỗ thang máy cũ) để đủ 180 m² và có cửa từ hành lang thư viện. (11) Dải Nam đổi chỗ: đầu Tây là đọc tầng 1 B1s (cạnh hành lang thư viện, chỗ văn phòng cũ), giữa là văn phòng E1, phòng nhân viên E2; kỹ thuật E4 chuyển vào dải giữa phòng thiếu nhi và hành lang nhân viên, có cửa riêng ra mặt Đông, không còn chung vách E2. (12) Vệ sinh thiếu nhi 13,5 m² bạn để trong kho nay đặt sát B3; vệ sinh thư viện tầng 2 đặt chồng thẳng lên nó; vệ sinh thư viện tầng 1 lên cạnh sảnh đọc. (13) Thêm cầu nối Tây (thay LK của bản xếp, dời từ x 9,3 sang x 14) và một cầu nối Đông nhỏ 3 × 4,9 m tới thang Đông Nam; dải bàn đọc dọc lan can nhô ra sân thêm khoảng 2,2 m.",
    "Diện tích: A 273 m² (đề 270, +1%), B 1.115 (đề 1.110, +0,5%), C 260 (đề 260), D 301 (đề 300), E 283 (đề 280, +1%); mỗi phòng 97–105% đề. Diện tích sử dụng 2.233 m², giao thông chung, thang, kho đệm, cầu nối 597 m². Ô thông tầng 37,7 m² ghi riêng, không tính vào sàn. Tổng sàn 2.829 m² (tầng 1: 1.741, tầng 2: 1.126 − 38 thông tầng), dưới 3.000. So với bản xếp (2.476 m²: phòng 2.121, giao thông và lõi 355): phần tăng thêm khoảng 350 m² là các phòng được đưa về đủ diện tích đề (+112 m², bản xếp có nhiều phòng −7 đến −10%: B1, B2, B3, A2, C1, D4, vệ sinh) và hành lang, thang, cầu nối được vẽ đủ (+242 m²). Đề dự trù 780 m² cho giao thông chung, tường và cấu kiện; phương án này dùng khoảng 600 m² cho phần đó.",
    "Đi qua khối A: cửa chính ở sảnh đón tiếp A1, mở cả ra sân trước phía Bắc (khách sự kiện) và vườn giữa phía Nam (người đọc từ bãi xe theo bờ sông). Từ A1 rẽ sang cà phê, sảnh trưng bày, trưng bày A2, sảnh sự kiện, phòng đa năng, chuyên đề, vệ sinh công cộng. Vào thư viện chỉ có một cửa: A1 → dải quầy gửi đồ, mượn trả A4 có cổng từ → sảnh đọc thông tầng. Phòng thiếu nhi, đọc tầng 1 phía Nam và toàn bộ tầng 2 đều ở sau A4.",
    "Sảnh đọc thông tầng: 6,5 × 5,8 m, cao hai tầng, lấy sáng mái qua ô thông tầng và kính Nam nhìn vườn giữa; bàn đọc báo, kệ sách mới. Thang chính hở đặt cạnh sảnh, lên tầng 2 ra thẳng hành lang quanh ô thông tầng: phía Bắc là dải bàn đọc dọc kính Bắc (trên quầy A4), phía Nam là dải bàn đọc dọc lan can, phía Tây là kệ đọc mở, phía Đông là đọc mở trên sảnh đón tiếp. Từ đây đi tiếp xuống cánh Tây và thanh Nam.",
    "Đường sách: xe giao sách theo lối Tây, cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) → kho đóng C1 → lõi sách có tời sách ngay cạnh, lên tầng 2 ra thẳng phòng đọc linh hoạt B6 và tra cứu số B5. Sách trả: quầy A4 → cửa nhân viên ở đầu Tây dải quầy → xử lý C2, vài bước, không qua khu công cộng. Hành lang thư viện có cửa nhân viên vào kho đóng để xếp sách lên kệ.",
    "Vệ sinh: cụm công cộng ở khối sự kiện (mở ngoài giờ); vệ sinh thư viện tầng 1 cạnh sảnh đọc; vệ sinh thiếu nhi, thay tã mở thẳng từ phòng thiếu nhi; vệ sinh thư viện tầng 2 ở cầu nối Tây, chồng thẳng lên vệ sinh thiếu nhi (đường ống thẳng). Người đọc ở thanh Bắc tầng 2 xuống thang chính là tới vệ sinh tầng 1, dưới 25 m.",
    "Ánh sáng Bắc – Nam: khối sự kiện, trưng bày, cà phê một tầng lấy sáng cửa mái hướng Bắc; xử lý C2, dải quầy A4, sảnh đón tiếp nhìn ra sân trước phía Bắc (sân sâu khoảng 11 m, khối sự kiện chỉ cao +4,95); sảnh đón tiếp, sảnh đọc, phòng thiếu nhi nhìn ra vườn giữa sâu 20 m; đọc tầng 1, văn phòng, phòng nhân viên, bảo vệ quay ra mặt Nam. Tầng 2 là tầng trên cùng, mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây đặc.",
    "Tiếng ồn: sự kiện, cà phê ở nửa Bắc và đầu Đông dải giữa, cách khu đọc bằng sảnh đón tiếp; phòng thiếu nhi ở đáy vườn, học nhóm ngay trên, kho đệm và hành lang ngăn với phòng đọc; đọc yên tĩnh B2 ở cuối cánh Tây, xa cả học nhóm lẫn ô thông tầng; văn phòng, phòng nhân viên tách khỏi kỹ thuật bằng hành lang nhân viên, bên trên là phòng đọc.",
    "Ngoài giờ: khóa một cửa giữa A1 và A4; sảnh, cà phê, sảnh trưng bày, trưng bày, sảnh sự kiện, phòng đa năng, chuyên đề, vệ sinh công cộng vẫn mở và thoát ra sân trước, mặt sông, không đi xuyên khu đọc. Thang chính, lõi sách, hai thang thoát hiểm đều nằm trong khu thư viện, ra ngoài bằng cửa có chuông báo.",
    "Kết cấu: khung bê tông lưới khoảng 4–8 m theo cột kho, lõi thang; ô thông tầng có dầm viền bốn phía; phòng đa năng 16 × 11,25 m dầm ứng lực trước; phần tầng 2 nhô ra nhiều nhất khoảng 2,75 m (dải bàn đọc dọc lan can) nên không cần cột chống thêm."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|CO3|SH)$/;
  plan.idea = {
    id: "chotX6", fam: "chot", code: "X.6", from: "bản xếp của bạn", name: "Sảnh đọc thông tầng sau quầy", rule: "Giữ khối của bản xếp, sau quầy A4 là sảnh đọc cao hai tầng",
    tag: "Từ bản xếp khối của bạn: qua A1 và quầy A4 là sảnh đọc thông tầng có thang chính hở; tầng 2 đọc quanh ô thông tầng",
    story: "Bản xếp có một chỗ bản lề: nơi cột kho phía Tây gặp dải đón tiếp và thanh đọc tầng 2. X.6 khoét chỗ đó thành sảnh đọc cao hai tầng. Người đọc qua quầy là thấy ngay cả thư viện, thang chính hở dẫn lên hành lang đọc quanh ô thông tầng.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật của bản xếp: khối sự kiện một tầng phía Bắc, thư viện hai tầng hình chữ U ôm vườn giữa, ô thông tầng nằm trong thanh Bắc tầng 2."], ["Khối chính – khối phụ", "Thư viện hai tầng là khối chính; khối sự kiện, cà phê, trưng bày một tầng thấp hơn."], ["Nắng và chói", "Sảnh đọc lấy sáng mái qua ô thông tầng và kính Nam; phòng có người lấy sáng Bắc, Nam hoặc cửa mái Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Ô thông tầng kéo khí nóng lên mái; vườn giữa mở về phía sông đón gió Đông Nam."], ["Công năng", "Một cửa vào thư viện qua A4; sảnh đọc là nơi chia luồng: thang chính lên tầng 2, hành lang dọc sân xuống thiếu nhi và đọc phía Nam."]],
    kc: { he: "Khung bê tông lưới khoảng 4–8 m; ô thông tầng 6,5 × 5,8 m có dầm viền; phòng đa năng dầm ứng lực trước nhịp 11,25 m; tầng 2 mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng)", cx: "Không (đua tối đa khoảng 2,75 m)" },
    qa: [["Ô thông tầng có làm ồn lên tầng 2 không?", "Sảnh đọc dưới chỉ đọc báo, sách mới, không phải chỗ chơi; phòng thiếu nhi, học nhóm ở cuối hành lang phía Nam. Đọc yên tĩnh B2 ở cuối cánh Tây, cách ô thông tầng hơn 11 m, có lõi sách và đọc cá nhân chắn giữa."], ["Thang chính hở có làm mất kiểm soát sách không?", "Không: thang nằm sau quầy A4, chỉ nối khu đọc tầng 1 với khu đọc tầng 2; các thang thoát hiểm ra ngoài bằng cửa có chuông báo."]],
    cut: "Khối sự kiện, cà phê, trưng bày foam xám một tầng; thư viện trắng hai tầng; ô thông tầng để trống nhìn xuống sảnh đọc; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng 97–105% đề` };
    },
    lab: [[12, 55, 12.6, "Lõi sách", 1], [26, 84, 11.4, "Khối chính · Thư viện hai tầng", 1], [18, 22, 6.2, "Khối phụ · Sự kiện một tầng", 2], [17.3, 44.6, 9.6, "Thông tầng", 2]],
    build() {
      const v = [];
      const coreTop = 9.45 + 1.6;
      for (const L of [t1, t2]) for (const z of L.rooms) {
        if (z.void) continue;
        const [x, y, w, h] = z.r;
        if (z.core) { if (L === t1) v.push(B(x, y, w, h, 0.45, coreTop, /l/.test(z.core.st) ? "violet" : "warn", "X", { top: /l/.test(z.core.st) ? "violet" : "warn", lv: 0, fl: 2 })); continue; }
        const z0 = L === t1 ? 0.45 : 4.95, z1 = L === t1 ? 4.95 : 9.45, pub = L === t1 && PUB.test(z.id);
        v.push(B(x, y, w, h, z0, z1, pub ? "stone" : "sheet", pub ? "D" : "B", { fl: 1, role: pub ? "p" : "m", top: pub ? "grass" : undefined }));
      }
      const st = [];
      for (const x of [6, 10, 14, 23.5, 32.4]) for (const y of [Y0, YB, YCS, YB3, YS, YE]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 28.5]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
