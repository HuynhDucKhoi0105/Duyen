/* ================= Ý tưởng H.7: Hộp xếp quanh lõi sách (hộp xếp chồng, không hộp bọc ngoài) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp đá thấp (tầng 1) ôm lõi sách; trên đó hai hộp đọc gỗ và gạch đặt lệch nhau, nối bằng một khe kính quanh đỉnh lõi.
  // phía Bắc là hộp sự kiện vàng một tầng và hộp kính đón tiếp, đặt lệch nhau 4 m; sân giữa rộng 8–12 m
  const EV = [[6, 12], [23, 12], [23, 28], [6, 28]];      // hộp sự kiện một tầng (vàng)
  const HG = [[23, 16], [41, 16], [41, 32], [23, 32]];    // hộp kính đón tiếp hai tầng, lùi xuống Nam 4 m (tầng 2: trưng bày, chuyên đề)
  const LK = [[26.5, 32], [29.5, 32], [29.5, 40], [26.5, 40]]; // cầu kính qua sân: sảnh đón tiếp → quầy mượn trả
  const LB = [[6, 40], [41, 40], [41, 68], [6, 68]];      // hộp đá thấp: nghiệp vụ, kho, lõi sách, thiếu nhi
  const U1 = [[6, 40], [37, 40], [37, 56.5], [6, 56.5]];  // hộp đọc gỗ (tầng 2), lùi 4 m phía sông
  const U2 = [[10, 60], [41, 60], [41, 72], [10, 72]];    // hộp đọc gạch (tầng 2), lùi 4 m phía Tây, đua 4 m về Nam
  const CL = [[22, 56.5], [30, 56.5], [30, 60], [22, 60]]; // khe kính nối hai hộp đọc quanh đỉnh lõi sách
  const COURT = [[6, 28], [23, 28], [23, 32], [41, 32], [41, 40], [6, 40]];
  const GARDEN = [[20.2, 68], [41, 68], [41, 80], [20.2, 80]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, HG, LK, LB],
    rooms: [
      // hộp sự kiện (mở ngoài giờ), chỉ vào từ sảnh đón tiếp
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5], ["S", 1.8, "tn", 0.4]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [17.25, 12, 5.75, 4.35], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [17.25, 16.35, 5.75, 3.5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [17.25, 19.85, 5.75, 8.15], ctl: "sk", nz: 2, occ: 40, d: [["D1", 2.0, "p", 0.3], ["D1", 1.6, "p", 0.8], ["A1", 2.4, "o"]] },
      // hộp kính đón tiếp: một cửa vào duy nhất từ sân giữa
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [23, 16, 4, 7.8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["A1", 1.4, "thang"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [27, 16, 3, 7.8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ khu sự kiện", r: [30, 16, 3, 7.8], ctl: "sk", nz: 1, core: { st: "u", link: "STE" }, d: [["A1", 1.2, "thang"], ["N", 1.2, "tn"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [23, 23.8, 10, 8.2], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.15], ["LK", 2.4, "o"], ["FOYA", 2.4, "o"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [33, 16, 3.6, 4.2], ctl: "nv", nz: 1, d: [["FOYA", 0.9, "nv"]] },
      { id: "FOYA", c: "circ", n: "Sảnh cà phê", r: [33, 20.2, 3.6, 11.8], ctl: "sk", nz: 2, d: [["A3", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (góc sông)", r: [36.6, 16, 4.4, 16], ctl: "sk", nz: 3, seat: 32, bar: [[36.9, 16], [40.7, 16], 4] },
      { id: "LK", c: "circ", n: "Cầu kính qua sân", r: [26.5, 32, 3, 8], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // hộp đá thấp, dải Bắc: tiếp nhận, xử lý, quầy, đọc
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 40, 3.6, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.6, 40, 8.25, 8.5], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"]] },
      { id: "B1b", c: "B1", n: "Đọc mở, sách mới", r: [17.85, 40, 6.15, 8.5], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["C2", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [24, 40, 8.5, 3.53], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["B1b", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [24, 43.53, 8.5, 4.97], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn sân)", r: [32.5, 40, 8.5, 8.5], ctl: "tv", nz: 1, d: [["N", 1.2, "tnbd", 0.85]] },
      // dải giữa: kho, lõi sách, vệ sinh, kỹ thuật
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 48.5, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["W", 1.2, "tnbd"], ["C4", 1.0, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 52.83, 6, 6.67], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [12, 48.5, 12, 9.1], ctl: "kho", nz: 1, d: [["SC", 1.2, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang nhân viên", r: [12, 57.6, 12, 1.9], ctl: "nv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 48.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"], ["C1", 1.2, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [24, 56.5, 4, 3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"], ["LC", 0.9, "p"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [28, 48.5, 4.5, 11], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["B3", 1.8, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [32.5, 48.5, 8.5, 6.5], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [32.5, 55, 4.25, 4.5], ctl: "tv", nz: 1, wc: KT, d: [["LC", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [36.75, 55, 4.25, 4.5], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"]] },
      // dải Nam (dưới phần hộp gạch đua ra): văn phòng, phòng nhân viên, thiếu nhi
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 59.5, 8.5, 8.5], ctl: "nv", nz: 0, d: [["SC", 1.0, "nv"], ["S", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [14.5, 59.5, 4.7, 8.5], ctl: "nv", nz: 1, d: [["SC", 0.9, "nv"]] },
      { id: "KDN", c: "circ", n: "Kho đệm cách âm (giữa nhân viên và thiếu nhi)", r: [19.2, 59.5, 1, 8.5], ctl: "nv", nz: 1, d: [["SC", 0.8, "nv"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [20.2, 59.5, 20.8, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.6]] }
    ],
    staff: [
      { x: 28.7, y: 27.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 41.8, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 34.4, y: 19.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 28.7, y: 18.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 63.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13.7, y: 44.2, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 44, t: "Nhận sách", sc: ["4"] },
      { x: 10.7, y: 63.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 20.6, y: 25.2, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 20.6, y: 13.8, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hai hộp đọc đặt lệch trên hộp đá ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [HG, U1, CL, U2],
    rooms: [
      // hộp đón tiếp tầng 2 (khu sự kiện): trưng bày, chuyên đề; chỉ lên bằng hai thang khu sự kiện
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [23, 16, 4, 7.8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["CO2", 1.4, "thang"]] },
      { id: "CO2", c: "circ", n: "Sảnh thang sự kiện", r: [27, 16, 3, 7.8], ctl: "sk", nz: 2, d: [["A2", 2.4, "o"]] },
      { id: "STE", n: "Thang bộ khu sự kiện", r: [30, 16, 3, 7.8], ctl: "sk", nz: 1, core: { st: "u", link: "STE" }, d: [["CO2", 1.2, "thang"]] },
      { id: "A2", c: "A2", n: "Trưng bày (nhìn xuống sân)", r: [23, 23.8, 10.9, 8.2], ctl: "sk", nz: 2, occ: 30, d: [["CO3b", 2.4, "o"]] },
      { id: "CO3", c: "circ", n: "Sảnh chuyên đề", r: [33, 16, 3.3, 7.8], ctl: "sk", nz: 2, d: [["D4", 1.6, "p"], ["STE", 1.2, "thang"]] },
      { id: "CO3b", c: "circ", n: "Sảnh chuyên đề (Nam)", r: [33.9, 23.8, 2.4, 8.2], ctl: "sk", nz: 2, d: [["D4", 1.6, "p"], ["CO3", 2.0, "o"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [36.3, 16, 4.7, 16], ctl: "sk", nz: 2, seat: 24 },
      // hộp đọc gỗ (Bắc): đọc yên tĩnh đầu Tây, sảnh lõi sách ở giữa
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (quay Bắc)", r: [6, 40, 18, 8.5], ctl: "tv", nz: 0, seat: 40, d: [["H2", 1.2, "p"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [24, 40, 8.5, 6], ctl: "tv", nz: 1, steps: 4, d: [["H2", 2.4, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [24, 46, 8.5, 2.5], ctl: "tv", nz: 1, d: [["B1n", 1.6, "o"]] },
      { id: "B1n", c: "B1", n: "Đọc mở góc Đông Bắc", r: [32.5, 40, 4.5, 8.5], ctl: "tv", nz: 1 },
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 48.5, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["H3", 1.2, "thang"]] },
      { id: "H3", c: "circ", n: "Sảnh thang Tây", r: [6, 52.83, 6, 3.67], ctl: "tv", nz: 1, d: [["B1w", 2.0, "o"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [12, 48.5, 12, 8], ctl: "tv", nz: 1, d: [["WCL2", 1.0, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 48.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["H2", 1.4, "thang"], ["CL", 1.2, "thang"], ["B1w", 1.4, "thang"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (giữa, quay Nam)", r: [28, 48.5, 9, 8], ctl: "tv", nz: 1, d: [["H2", 2.4, "o"], ["CL", 1.6, "o"]] },
      // khe kính quanh đỉnh lõi
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [22, 56.5, 4, 3.5], ctl: "tv", nz: 1, wc: KT, d: [["CL", 1.0, "p"]] },
      { id: "CL", c: "circ", n: "Khe kính nối hai hộp đọc", r: [26, 56.5, 4, 3.5], ctl: "tv", nz: 1, d: [["B1s", 2.4, "o"]] },
      // hộp đọc gạch (Nam): tra cứu số, đọc mở, học nhóm
      { id: "B5", c: "B5", n: "Tra cứu số", r: [10, 60, 8.5, 12], ctl: "tv", nz: 1, seat: 16, d: [["B1s", 2.0, "o"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (hộp gạch)", r: [18.5, 60, 11.5, 12], ctl: "tv", nz: 1, d: [["WCL2", 1.0, "p"], ["H4", 1.6, "o"]] },
      { id: "H4", c: "circ", n: "Sảnh đệm trước học nhóm (cửa kính, tủ kệ hai bên)", r: [30, 60, 1.5, 12], ctl: "tv", nz: 1, d: [["CO4", 1.2, "o"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [31.5, 60, 4.75, 5.25], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [36.25, 60, 4.75, 5.25], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [31.5, 65.25, 9.5, 1.5], ctl: "tv", nz: 2 },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [31.5, 66.75, 4.75, 5.25], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [36.25, 66.75, 4.75, 5.25], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] }
    ],
    staff: [
      { x: 28, y: 43, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH7", code: "H.7", name: "Hộp xếp quanh lõi sách", from: "hộp xếp",
    EV, HG, LK, LB, U1, U2, CL,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 12, 17.85, 24, 28, 32.5, 37, 41], y: [12, 16, 24, 28, 32, 40, 48.5, 56.5, 60, 68, 72] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 43.5], [5.2, 43.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 36], [27, 36], [26, 32.6]]],
        event: [[[20, -9], [3, 4], [3, 34], [25, 34], [26, 32.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, vào sân giữa tới sảnh đón tiếp" },
      hatch: [COURT, GARDEN],
      labels: [[14, 34, "Sân giữa"], [30.6, 76, "Vườn thiếu nhi có tường bao"], [12, 20, "Hộp sự kiện"], [32, 20, "Hộp kính đón tiếp"], [26, 52, "Lõi sách"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ các ý tưởng hộp trong hộp bạn thích (10.3 ba tầng đọc kéo lệch, 10.5, 10.7), bỏ hộp bọc ngoài. Mọi hộp xếp quanh một <b>lõi sách</b> tím (thang bộ, thang máy, tời sách) nhô cao khỏi mái: tầng 1 là hộp đá thấp chứa nghiệp vụ, kho đóng, quầy mượn trả và thiếu nhi; trên đó hai hộp đọc đặt lệch nhau, hộp gỗ phía Bắc lùi 4 m khỏi phía sông, hộp gạch phía Nam lùi 4 m khỏi phía Tây và đua 4 m về phía vườn. Hai hộp đọc nối với nhau bằng một khe kính ôm đỉnh lõi. Phía Bắc là hộp sự kiện vàng một tầng và hộp kính đón tiếp hai tầng (tầng 2 là trưng bày, chuyên đề), đặt lệch nhau 4 m. Khách đi một đường: sân giữa → sảnh đón tiếp → cầu kính → quầy gửi đồ, mượn trả có cổng từ → lõi sách.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: cửa vào duy nhất ở mặt Nam hộp kính, nhìn ra sân giữa. Từ sảnh: rẽ trái là sảnh sự kiện và phòng đa năng; rẽ phải là cà phê; đi lên bằng thang khu sự kiện ngay trong sảnh là trưng bày và chuyên đề; đi thẳng qua cầu kính 8 m là quầy gửi đồ, mượn trả (sảnh → quầy khoảng 12 m). Phòng đa năng, chuyên đề không có cửa vào từ ngoài, chỉ có cửa thoát nạn.",
    "Thang có hệ quả: hai thang lên khu đọc (lõi sách ở giữa, thang Tây sát lối Tây) chỉ tới được sau quầy có cổng từ. Thang Tây ở tầng 1 chỉ mở vào phòng tiếp nhận bằng cửa thẻ từ và ra lối Tây bằng cửa thoát hiểm có chuông, nên không ai từ ngoài lên thẳng khu đọc. Thang máy trong lõi sách phục vụ cả người khuyết tật và xe sách. Hai thang khu sự kiện chỉ nối sảnh đón tiếp với trưng bày, chuyên đề ở tầng 2 hộp đón tiếp, không có cửa nào sang khu đọc; mỗi tầng trên có thang máy nằm trong đúng khu của nó.",
    "Đường sách mới: lối Tây → cửa cuốn → tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → cửa thẳng vào lõi sách → tời sách lên tầng 2. Lưu trữ tài liệu địa phương liền kho đóng. Từ kho đóng tới kệ xa nhất tầng 2 khoảng 23 m.",
    "Đường sách trả: quầy mượn trả → cửa nhân viên → phòng đọc sách mới → xử lý nghiệp vụ, khoảng 17 m, không qua sảnh công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ mở thẳng ra sảnh đón tiếp (cách phòng đa năng khoảng 19 m); trong khu đọc tầng 1 có vệ sinh sát hành lang lõi sách và vệ sinh trẻ em mở thẳng vào phòng thiếu nhi; tầng 2 có vệ sinh trong khe kính, ngay trên vệ sinh trẻ em (ống thẳng hàng).",
    "Ánh sáng Bắc – Nam: hộp đá tầng 1 chia ba dải, phòng có người chỉ ở dải Bắc (nhìn sân giữa) và dải Nam (dưới phần hộp gạch đua 4 m, như ô văng che nắng); dải giữa là kho, lõi, vệ sinh, kỹ thuật. Hai hộp đọc tầng 2 sâu 16,5 m và 12 m, phòng chạy suốt chiều sâu hoặc quay một mặt sâu 8,5 m. Đầu Đông, đầu Tây các hộp là tường đặc.",
    "Không che sáng nhau: sân giữa rộng 12 m (trước hộp sự kiện) và 8 m (trước hộp kính), góc che 44°; khe giữa hai hộp đọc rộng 3,5 m nhưng hai hộp chỉ cao hơn bậu cửa tầng 2 3,3 m, góc che 43°.",
    "Yên tĩnh: đọc yên tĩnh ở đầu Tây hộp gỗ, quay Bắc; học nhóm ở đầu Đông hộp gạch, cách đọc yên tĩnh cả một hộp và khe kính; thiếu nhi ở tầng 1 mở ra vườn có tường bao; phòng đa năng ở bên kia sân giữa.",
    "Sửa ngày 05/11 (tiếng ồn): văn phòng thu hẹp 1 m, phòng nhân viên dịch sang Tây, chen một kho đệm cách âm rộng 1 m giữa phòng nhân viên và phòng thiếu nhi ở tầng 1. Ở tầng 2, phòng đọc mở hộp gạch thu ngắn 1,5 m; chen vào đó một sảnh đệm có cửa kính và tủ kệ hai bên, nên bốn phòng học nhóm không còn chung vách với phòng đọc. Người đọc đi qua sảnh đệm rồi mới vào hành lang học nhóm.",
    "Ngoài giờ: hộp sự kiện, hộp đón tiếp (sảnh, cà phê, trưng bày, vệ sinh công cộng) chạy riêng. Chỉ khóa cửa cuối cầu kính vào quầy mượn trả, không nằm trên đường thoát nạn.",
    "Kết cấu: hộp gạch đua 4 m về phía vườn (đúng mốc 4 m, không cần cột chống), tường đầu hồi làm dầm cao một tầng. Lưới cột khoảng 8 m; kho đóng ở tầng 1 sát lõi, tải xuống thẳng móng."
  ];
  /* ---------- khối 3D: mỗi hộp một vật liệu ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH7", fam: "chot", code: "H.7", from: "hộp xếp", name: "Hộp xếp quanh lõi sách", rule: "Hộp đặt lệch lên hộp quanh một lõi",
    tag: "Hộp đá thấp, hai hộp đọc gỗ và gạch đặt lệch phía trên, nối bằng khe kính quanh lõi sách tím; hộp sự kiện vàng và hộp kính đón tiếp lệch nhau phía Bắc",
    story: "Một chồng hộp không có vỏ bọc. Hộp đá dưới cùng giữ sách và nghiệp vụ; hai hộp đọc gỗ và gạch đặt lệch lên trên như hai cuốn sách xếp không ngay hàng; ở giữa là lõi sách tím xuyên suốt, nơi sách đi lên và người đọc đi lên. Phía trước, hộp kính đón tiếp và hộp sự kiện vàng đứng lệch nhau quanh một sân giữa.",
    why: [["Quy luật hình khối", "Hộp đặt lên hộp, lệch nhau 4 m theo hai hướng khác nhau; lõi tím xuyên qua làm điểm nhấn. Mỗi hộp một vật liệu: vàng, kính, đá, gỗ, gạch."], ["Khối chính – khối phụ", "Chồng hộp thư viện chiếm khoảng 75% sàn và cao nhất; hai hộp phía Bắc một tầng là khối phụ."], ["Nắng và chói", "Phòng có người chỉ quay Bắc hoặc Nam; phần hộp gạch đua 4 m làm ô văng cho dải Nam tầng 1; tra cứu số, đọc yên tĩnh lấy sáng hai mặt hoặc quay Bắc."], ["Gió và mưa", "Sân giữa và khe kính mở về sông đón gió Đông Nam; cầu kính có mái từ sảnh sang quầy."], ["Công năng", "Một cửa vào; lõi sách nằm giữa kho và chỗ đọc nên đường sách ngắn; vệ sinh xếp chồng quanh lõi."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; hai hộp đọc tầng 2 đặt trên hộp đá, phần đua 4 m dùng tường đầu hồi làm dầm cao một tầng; phòng đa năng 11,25 × 16 m dầm ứng lực trước; lõi sách bê tông cốt thép làm lõi cứng.", nhip: "16 m (phòng đa năng), 8 m (lưới)", cx: "Không cần cột chống: phần đua đúng 4 m" },
    qa: [["Khe giữa hai hộp đọc chỉ 3,5 m có tối không?", "Hai hộp đọc chỉ cao hơn bậu cửa tầng 2 khoảng 3,3 m nên góc che 43°, dưới mốc 45°; phòng sát khe đều lấy thêm sáng ở mặt đối diện."], ["Đi từ cửa vào tới kệ có xa?", "Từ cửa vào tới quầy mượn trả khoảng 12 m; tới chỗ đọc xa nhất tầng 2 khoảng 53 m."], ["Khách sự kiện có lên được khu đọc?", "Không: thang khu sự kiện chỉ lên trưng bày, chuyên đề trong hộp đón tiếp; khu đọc chỉ vào qua quầy cuối cầu kính, khóa ngoài giờ."]],
    cut: "Hộp sự kiện foam bọc giấy vàng, hộp đón tiếp hai tầng mica; hộp đá xám; hộp đọc Bắc dán gỗ, hộp đọc Nam dán giấy gạch, đặt lệch 2 cm (4 m) so với hộp đá. Lõi sách foam tím cao hơn mái 1,5 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[26, 52.5, 12.8, "Lõi sách: thang + thang máy + tời sách", 1], [20, 46, 9.8, "Khối chính · Hộp đọc gỗ", 1], [25, 66, 9.8, "Khối chính · Hộp đọc gạch (đua 4 m)", 1], [37, 62, 5.3, "Hộp đá: nghiệp vụ, kho, thiếu nhi", 1], [12, 20, 6.8, "Khối phụ · Hộp sự kiện", 2], [32, 24, 9.8, "Khối phụ · Hộp kính đón tiếp hai tầng", 2], [29, 36, 4.8, "Cầu kính", 2]],
    build() {
      // lõi đặt trước, rồi hộp tầng 2, rồi hộp tầng 1
      const v = [
        coreBox(t1, "CS", "violet", 11.45), coreBox(t1, "STS", "warn", 11.05), coreBox(t1, "CN", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05),
        B(6, 40, 31, 16.5, 4.95, 9.45, "deck", "B", { fl: 1, role: "m" }),
        B(10, 60, 31, 12, 4.95, 9.45, "ribbon", "B", { fl: 1, role: "m" }),
        B(22, 56.5, 8, 3.5, 4.95, 8.95, "glass", "L", { fl: 1, role: "m" }),
        B(6, 40, 35, 28, 0.45, 4.95, "stone", "C", { fl: 1, top: "grass", role: "m" }),
        B(6, 12, 17, 16, 0.45, 6.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(23, 16, 18, 16, 0.45, 9.45, "glass", "A", { fl: 2, role: "p" }),
        B(26.5, 32, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        // tường thấp bao vườn thiếu nhi
        B(20.2, 72, 0.3, 8, 0, 1.2, "stone", "X", { role: "p" }), B(40.7, 68, 0.3, 12, 0, 1.2, "stone", "X", { role: "p" }), B(20.2, 79.7, 20.8, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 37, 41]) for (const y of [40, 48.5, 56.5, 68]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 14, 23]) for (const y of [12, 28]) st.push(col(x, y, 0.45, 6.45));
      for (const x of [23, 33, 41]) for (const y of [16, 24, 32]) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
