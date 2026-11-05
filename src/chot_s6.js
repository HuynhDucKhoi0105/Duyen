/* ================= Ý tưởng S.6: Bốn hộp vuông quanh sân (khối vuông, chữ nhật xếp với nhau) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // bốn hộp chữ nhật đơn giản: hộp đón tiếp (kính, 2 tầng) + hộp sự kiện (vàng, 1 tầng) ở hàng Bắc; sân giữa 10 m;
  // hộp thư viện (đá, 2 tầng) chứa kho, nghiệp vụ, lõi sách; sân thiếu nhi 10 m; hộp đọc (gỗ, 2 tầng) ở hàng Nam
  const AB = [[6, 14], [22, 14], [22, 30], [6, 30]];          // hộp đón tiếp
  const EV = [[22, 14], [41.5, 14], [41.5, 30], [22, 30]];    // hộp sự kiện một tầng
  const LK = [[19, 30], [22, 30], [22, 40], [19, 40]];        // cầu kính đón tiếp → khu đọc
  const LB = [[6, 40], [41.5, 40], [41.5, 56], [6, 56]];      // hộp thư viện
  const LS = [[26.75, 56], [29.25, 56], [29.25, 66], [26.75, 66]]; // cầu nối hai hộp thư viện (hai tầng)
  const RB = [[14, 66], [41.5, 66], [41.5, 82], [14, 82]];    // hộp đọc tầng 1
  const COURT = [[6, 30], [19, 30], [19, 40], [6, 40]], COURT2 = [[22, 30], [41.5, 30], [41.5, 40], [22, 40]];
  const GARDEN = [[29.25, 82], [41.5, 82], [41.5, 88], [29.25, 88]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [AB, EV, LK, LB, LS, RB],
    rooms: [
      // hộp đón tiếp: cửa vào duy nhất từ sân giữa vào sảnh đón tiếp
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn quảng trường)", r: [6, 14, 8.75, 8], ctl: "sk", nz: 3, seat: 32, d: [["A1", 3, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [14.75, 14, 2.5, 8], ctl: "sk", nz: 1, wc: KT, d: [["VES", 1.0, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.75, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["VES", 1.4, "thang"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 22, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.45], ["VES", 2.4, "o"], ["A4", 2.0, "k"]] },
      { id: "VES", c: "circ", n: "Sảnh chia luồng (sang sự kiện, lên tầng 2)", r: [16, 22, 6, 3], ctl: "sk", nz: 2, d: [["FOYE", 2.4, "o"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16, 25, 6, 5], ctl: "tv", ctrl: 1, nz: 2, d: [["LK", 2.4, "o"]] },
      // hộp sự kiện: chỉ vào từ sảnh đón tiếp, cửa ra ngoài chỉ là cửa thoát nạn
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [22, 14, 4, 3.75], ctl: "nv", nz: 1, d: [["FOYE", 0.9, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [22, 25, 4, 5], ctl: "nv", nz: 1, d: [["FOYE", 0.9, "nv"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [22, 17.75, 4, 7.25], ctl: "sk", nz: 2, occ: 40, d: [["FOY2", 2.4, "o"], ["D3", 1.2, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [26, 14, 4.25, 5.9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [26, 19.9, 4.25, 4.7], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "FOY2", c: "circ", n: "Sảnh chờ phòng đa năng", r: [26, 24.6, 4.25, 5.4], ctl: "sk", nz: 2, d: [["D1", 2.0, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [30.25, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.6], ["E", 1.6, "tn", 0.5]] },
      { id: "LK", c: "circ", n: "Cầu kính qua sân giữa (sau cổng từ)", r: [19, 30, 3, 10], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"]] },
      // hộp thư viện, dải Bắc: tiếp nhận, xử lý, sảnh thư viện, đọc mở
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 40, 3.75, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.75, 40, 9.25, 8], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["HL", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [19, 40, 3, 8], ctl: "tv", nz: 1, d: [["B1t", 2.4, "o"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (tầng 1)", r: [22, 40, 19.5, 8], ctl: "tv", nz: 1, seat: 30 },
      // dải Nam: kho đóng sát lõi sách, kho chung, kỹ thuật, thang thoát hiểm
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 48, 13.75, 8], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.75, 48, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"]] },
      { id: "WCL", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [24.25, 48, 2.5, 8], ctl: "tv", nz: 1, wc: KT, d: [["B1t", 1.0, "p", 0.85]] },
      { id: "LH", c: "circ", n: "Hành lang sang hộp đọc", r: [26.75, 48, 2.5, 8], ctl: "tv", nz: 1, d: [["B1t", 2.0, "o"], ["LS", 2.0, "o"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [29.25, 48, 7, 8], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
      { id: "B1s", c: "B1", n: "Bàn đọc cá nhân (quay Nam)", r: [36.25, 48, 2.5, 8], ctl: "tv", nz: 1, d: [["B1t", 1.0, "o"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.75, 48, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1t", 1.2, "thang", 0.25], ["S", 1.2, "tnbd", 0.3]] },
      { id: "LS", c: "circ", n: "Cầu nối sang hộp đọc", r: [26.75, 56, 2.5, 10], ctl: "tv", nz: 1, d: [["RH", 2.0, "o"]] },
      // hộp đọc tầng 1: văn phòng, phòng nhân viên, lưu trữ địa phương, thiếu nhi
      { id: "E1", c: "E1", n: "Văn phòng", r: [14, 66, 10, 8], ctl: "nv", nz: 0, d: [["W", 1.0, "nv", 0.5], ["STR", 1.0, "nv"], ["E2", 0.9, "nv"], ["C3", 1.0, "nv"]] },
      { id: "STR", n: "Thang bộ hộp đọc", r: [24, 66, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STR" }, d: [["RH", 1.2, "thang"], ["N", 1.2, "tnbd"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [14, 74, 5, 8], ctl: "nv", nz: 1 },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [19, 74, 5, 8], ctl: "kho", nz: 1 },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [24, 74, 2.75, 6], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["RH", 1.0, "p"]] },
      { id: "KX", c: "circ", n: "Kho xe đẩy", r: [24, 80, 2.75, 2], ctl: "tv", nz: 1, d: [["RH", 0.9, "p"]] },
      { id: "RH", c: "circ", n: "Sảnh hộp đọc", r: [26.75, 66, 2.5, 16], ctl: "tv", nz: 1, d: [["B3", 1.8, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [29.25, 66, 12.25, 16], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] }
    ],
    staff: [
      { x: 11, y: 26, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19, y: 27.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 24, y: 15.8, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 10, y: 16, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 72, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 14, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 44, t: "Nhận sách", sc: ["4"] },
      { x: 19, y: 70, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 24, y: 24, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 28, y: 17, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [AB, LB, LS, RB],
    rooms: [
      // hộp đón tiếp tầng 2 (khu sự kiện): trưng bày, chuyên đề; chỉ lên bằng thang khu sự kiện
      { id: "A2", c: "A2", n: "Trưng bày (quay Bắc)", r: [6, 14, 11.25, 8], ctl: "sk", nz: 2, occ: 30 },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.75, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["CO2", 1.4, "thang"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 22, 9.4, 8], ctl: "sk", nz: 2, seat: 24 },
      { id: "CO2", c: "circ", n: "Sảnh tầng 2 khu sự kiện", r: [15.4, 22, 6.6, 8], ctl: "sk", nz: 2, d: [["A2", 1.6, "o"], ["D4", 1.6, "p"]] },
      // hộp thư viện tầng 2
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (quay Bắc)", r: [6, 40, 13.75, 8], ctl: "tv", nz: 1, d: [["H2", 2.4, "o"], ["B1c", 2.4, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [19.75, 40, 4.5, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["CO4", 1.4, "o"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [24.25, 40, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [28.1, 40, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [31.95, 40, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [35.8, 40, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "KB", c: "circ", n: "Tủ đồ học nhóm", r: [39.65, 40, 1.85, 6.5], ctl: "tv", nz: 1, d: [["CO4", 0.8, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [24.25, 46.5, 17.25, 1.5], ctl: "tv", nz: 2, d: [["WC2", 1.0, "p"], ["LH2", 1.6, "o"], ["STE", 1.2, "thang"]] },
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [6, 48, 13.75, 8], ctl: "tv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.75, 48, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [24.25, 48, 2.5, 8], ctl: "tv", nz: 1, wc: KT },
      { id: "LH2", c: "circ", n: "Hành lang sang hộp đọc", r: [26.75, 48, 2.5, 8], ctl: "tv", nz: 1, d: [["B1d", 2.0, "o"], ["LS2", 2.0, "o"]] },
      { id: "B1d", c: "B1", n: "Đọc mở góc Đông Nam", r: [29.25, 48, 9.5, 8], ctl: "tv", nz: 1, d: [["STE", 1.2, "thang"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.75, 48, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" } },
      { id: "LS2", c: "circ", n: "Cầu nối sang hộp đọc", r: [26.75, 56, 2.5, 10], ctl: "tv", nz: 1, d: [["RH2", 2.0, "o"]] },
      // hộp đọc tầng 2: đọc yên tĩnh đầu Tây, tra cứu số, đọc linh hoạt đầu Đông
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [14, 66, 10, 16], ctl: "tv", nz: 0, seat: 40, d: [["H5", 1.2, "p"]] },
      { id: "STR", n: "Thang bộ hộp đọc", r: [24, 66, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STR" }, d: [["RH2", 1.2, "thang"]] },
      { id: "H5", c: "circ", n: "Sảnh đệm trước đọc yên tĩnh", r: [24, 74, 2.75, 8], ctl: "tv", nz: 1, d: [["RH2", 1.2, "o"]] },
      { id: "RH2", c: "circ", n: "Sảnh hộp đọc tầng 2", r: [26.75, 66, 2.5, 16], ctl: "tv", nz: 1, d: [["B5", 2.0, "o"], ["B6", 2.0, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (quay Bắc)", r: [29.25, 66, 12.25, 8], ctl: "tv", nz: 1, seat: 16 },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [29.25, 74, 6.75, 8], ctl: "tv", nz: 1, steps: 4, d: [["KS", 2.4, "o"]] },
      { id: "KS", c: "circ", n: "Góc giới thiệu sách mới (lối đi)", r: [36, 74, 5.5, 8], ctl: "tv", nz: 1 }
    ],
    staff: [
      { x: 32, y: 70, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS6", code: "S.6", name: "Bốn hộp vuông quanh sân", from: "khối vuông",
    AB, EV, LK, LB, LS, RB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 14, 19.75, 24.25, 29.25, 36.25, 41.5], y: [14, 22, 30, 40, 48, 56, 66, 74, 82] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 44], [5.2, 44]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 35], [12, 35], [10.5, 30.6]]],
        event: [[[20, -9], [3, 4], [3, 35], [9, 35], [10.5, 30.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, vào sân giữa tới sảnh đón tiếp" },
      hatch: [COURT, COURT2, GARDEN],
      labels: [[12, 35, "Sân giữa"], [35, 85, "Vườn thiếu nhi có tường bao"], [14, 18, "Hộp đón tiếp"], [35, 22, "Hộp sự kiện"], [16, 52, "Hộp thư viện"], [20, 78, "Hộp đọc"]]
    }
  };
  plan.intro = `<p class="lede">Theo đúng lời thầy: không cầu kỳ, chỉ là bốn hộp chữ nhật xếp với nhau quanh một sân giữa. Hàng Bắc là <b>hộp đón tiếp</b> hai tầng (kính) và <b>hộp sự kiện</b> một tầng (vàng); hàng giữa là <b>hộp thư viện</b> hai tầng (đá) chứa kho, nghiệp vụ và lõi sách; hàng Nam là <b>hộp đọc</b> hai tầng (gỗ) với thiếu nhi ở tầng 1 và đọc yên tĩnh ở tầng 2. Sân giữa và sân thiếu nhi đều rộng 10 m nên không hộp nào che sáng hộp nào. Mọi phòng lấy sáng Bắc hoặc Nam, đầu Đông và đầu Tây là tường đặc. Một cửa vào duy nhất: sân giữa → sảnh đón tiếp → quầy gửi đồ, mượn trả có cổng từ → cầu kính → khu đọc; thiếu nhi cũng đi đường này.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: cửa vào duy nhất mở từ sân giữa vào sảnh đón tiếp. Bên phải sảnh là quầy gửi đồ, mượn trả có cổng từ; đi qua quầy mới tới cầu kính sang hộp thư viện. Phòng thiếu nhi ở hộp đọc phía Nam, chỉ tới được sau quầy (cầu kính → sảnh thư viện → hành lang → cầu nối → sảnh hộp đọc). Cửa ra vườn thiếu nhi là cửa thoát hiểm có chuông.",
    "Khu sự kiện cũng qua sảnh đón tiếp: sảnh chia luồng ngay cạnh sảnh đón tiếp dẫn sang sảnh sự kiện, phòng đa năng, và lên trưng bày, chuyên đề ở tầng 2 hộp đón tiếp bằng thang khu sự kiện. Phòng đa năng chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: ba thang lên khu đọc (lõi sách, thang Đông hộp thư viện, thang hộp đọc) đều nằm sau quầy có cổng từ; ở tầng 1 cửa ra ngoài của chúng là cửa thoát hiểm có chuông. Thang khu sự kiện chỉ nối sảnh chia luồng với tầng 2 hộp đón tiếp, không có cửa sang khu đọc. Mỗi tầng trên có thang máy nằm trong đúng khu của nó.",
    "Đường sách mới: lối Tây → cửa cuốn → tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → lõi sách có tời ngay cạnh → kệ tầng 2. Sách trả: quầy mượn trả → cầu kính → sảnh thư viện → cửa nhân viên vào xử lý nghiệp vụ. Lưu trữ tài liệu địa phương ở cạnh văn phòng hộp đọc. Kho chung ở hộp sự kiện, cạnh sảnh sự kiện.",
    "Vệ sinh: cụm công cộng mở ngoài giờ cạnh sảnh chia luồng, phục vụ sảnh, cà phê, phòng đa năng; vệ sinh thư viện tầng 1 ngay cạnh lõi sách, mở thẳng vào phòng đọc mở; tầng 2 có vệ sinh xếp chồng thẳng phía trên; phòng thiếu nhi có vệ sinh trẻ em, chỗ thay tã ngay sảnh hộp đọc.",
    "Yên tĩnh: đọc yên tĩnh ở đầu Tây tầng 2 hộp đọc, cách học nhóm (hộp thư viện) gần 20 m và có sảnh đệm riêng; học nhóm có hành lang riêng, không chung vách phòng đọc; phòng đa năng ở hộp riêng bên kia sân giữa; văn phòng và phòng nhân viên ở tầng 1 hộp đọc, ngăn với thiếu nhi bằng thang và sảnh.",
    "Ánh sáng Bắc – Nam: mỗi hộp sâu 16 m, chia hai dải 8 m quay Bắc và Nam (hoặc phòng chạy suốt chiều sâu lấy sáng hai mặt). Sân giữa, sân thiếu nhi rộng 10 m, hộp đối diện cao +9,45: góc che 38°.",
    "Ngoài giờ: hộp đón tiếp (sảnh, cà phê, trưng bày, chuyên đề, vệ sinh công cộng) và hộp sự kiện chạy riêng. Chỉ khóa cửa sảnh đón tiếp vào quầy mượn trả, không nằm trên đường thoát nạn.",
    "Kết cấu: lưới cột khoảng 8 × 8 m, các hộp tầng 2 đặt thẳng trên tầng 1, không đua; phòng đa năng 11,25 × 16 m dùng dầm ứng lực trước; kho đóng ở tầng 1 sát lõi sách."
  ];
  /* ---------- khối 3D: bốn hộp, mỗi hộp một vật liệu ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS6", fam: "chot", code: "S.6", from: "khối vuông", name: "Bốn hộp vuông quanh sân", rule: "Hộp chữ nhật xếp quanh sân",
    tag: "Hộp đón tiếp kính, hộp sự kiện vàng, hộp thư viện đá, hộp đọc gỗ; sân giữa và sân thiếu nhi rộng 10 m",
    story: "Bốn hộp đơn giản, mỗi hộp một việc và một vật liệu: kính đón khách, vàng cho sự kiện, đá giữ sách, gỗ để đọc. Chúng đứng quanh hai sân 10 m nên hộp nào cũng có mặt Bắc và mặt Nam đón sáng dịu.",
    why: [["Quy luật hình khối", "Hộp chữ nhật đặt cạnh nhau, khác chiều cao và vật liệu; lõi thang màu nhô khỏi mái làm điểm nhấn."], ["Khối chính – khối phụ", "Hộp thư viện và hộp đọc chiếm khoảng hai phần ba sàn; hộp sự kiện một tầng là khối phụ."], ["Nắng và chói", "Phòng có người chỉ quay Bắc hoặc Nam, sâu 8 m hoặc sáng hai mặt; đầu Đông, Tây đặc."], ["Gió và mưa", "Hai sân mở về sông đón gió Đông Nam; cầu kính có mái."], ["Công năng", "Một cửa vào qua sảnh đón tiếp; lõi sách đặt giữa kho và chỗ đọc."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m, các hộp tầng 2 đặt thẳng trên tầng 1; phòng đa năng dầm ứng lực trước nhịp 11,25 m; lõi thang bê tông làm lõi cứng.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Thiếu nhi có vào thẳng từ vườn?", "Không: cửa ra vườn là cửa thoát hiểm có chuông; trẻ và phụ huynh vào qua sảnh đón tiếp và quầy mượn trả như mọi người đọc."], ["Khách sự kiện có lên được khu đọc?", "Không: thang khu sự kiện chỉ lên tầng 2 hộp đón tiếp; khu đọc chỉ vào qua quầy có cổng từ."]],
    cut: "Bốn hộp foam bọc giấy: kính (mica), vàng, đá xám, gỗ; lõi thang foam tím, cam cao hơn mái 1 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 52, 10, "Khối chính · Hộp thư viện", 1], [28, 74, 10, "Khối chính · Hộp đọc", 1], [14, 22, 10, "Hộp đón tiếp", 2], [35, 22, 7, "Hộp sự kiện", 2], [22, 52, 11.5, "Lõi sách", 1]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05), coreBox(t1, "STR", "warn", 11.05), coreBox(t1, "CN", "violet", 11.05),
        B(6, 14, 16, 16, 0.45, 9.45, "glass", "A", { fl: 2, role: "p" }),
        B(22, 14, 19.5, 16, 0.45, 6.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(19, 30, 3, 10, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 40, 35.5, 16, 0.45, 9.45, "stone", "B", { fl: 2, role: "m" }),
        B(26.75, 56, 2.5, 10, 0.45, 9.45, "glass", "L", { fl: 2, role: "m" }),
        B(14, 66, 27.5, 16, 0.45, 9.45, "deck", "B", { fl: 2, role: "m" }),
        // tường thấp bao vườn thiếu nhi
        B(29.25, 82, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(41.2, 82, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(29.25, 87.7, 12.25, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30.25, 41.5]) for (const y of [40, 48, 56]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [14, 22, 29.25, 35.5, 41.5]) for (const y of [66, 74, 82]) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
