/* ================= Ý tưởng A.4: Khe chéo, lõi sách ở bản lề (từ A, gọn, kho sát kệ) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // khe Hải Vân của A giữ hướng Tây → sông, mép Bắc lùi bậc: hộp sự kiện một tầng (Tây) thấp hơn, hộp công cộng hai tầng (Đông) lùi xuống Nam 4 m.
  // khối thư viện là một hộp gọn 35 × 28 m, giữa hộp là lõi sách (thang bộ + thang máy + tời sách) đặt ngay sau quầy mượn trả
  const NA = [[6, 12], [22, 12], [22, 28], [6, 28]];     // hộp sự kiện một tầng: phòng đa năng
  const NB = [[22, 16], [40, 16], [40, 32], [22, 32]];   // hộp công cộng hai tầng: đón tiếp, cà phê / trưng bày, chuyên đề
  const LK = [[25.5, 32], [28.5, 32], [28.5, 40], [25.5, 40]]; // cầu kính một tầng qua khe: sảnh đón tiếp → quầy mượn trả
  const SB = [[6, 40], [41, 40], [41, 68], [6, 68]];     // hộp thư viện gọn, mái răng cưa đón sáng Bắc
  const SLOT = [[6, 28], [22, 28], [22, 32], [41, 32], [41, 40], [6, 40]];
  const GARDEN = [[20.2, 68], [32.5, 68], [32.5, 79], [20.2, 79]];
  const TW = [[32.5, 68], [35.5, 68], [35.5, 73], [32.5, 73]];   // tháp thang thoát hiểm Đông Nam, ra thẳng cuối hành lang học nhóm
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NA, NB, LK, SB, TW],
    rooms: [
      // hộp sự kiện một tầng (mở ngoài giờ), chỉ vào từ sảnh đón tiếp
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5], ["S", 1.8, "tn", 0.4]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [17.25, 12, 4.75, 5], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [17.25, 17, 4.75, 4], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [17.25, 21, 4.75, 7], ctl: "sk", nz: 2, occ: 40, d: [["D1", 2.0, "p", 0.3], ["D1", 1.6, "p", 0.8], ["A1", 2.4, "o", 0.6]] },
      // hộp công cộng: một cửa vào duy nhất từ khe vào sảnh đón tiếp
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [22, 16, 4, 7.8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["A1", 1.4, "thang"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [26, 16, 3, 7.8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ khu sự kiện", r: [29, 16, 3, 7.8], ctl: "sk", nz: 1, core: { st: "u", link: "STE" }, d: [["A1", 1.2, "thang"], ["N", 1.2, "tn"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [22, 23.8, 10, 8.2], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.2], ["LK", 2.4, "o"], ["FOYA", 2.4, "o"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [32, 16, 3.6, 4.2], ctl: "nv", nz: 1, d: [["FOYA", 0.9, "nv"]] },
      { id: "FOYA", c: "circ", n: "Sảnh cà phê", r: [32, 20.2, 3.6, 11.8], ctl: "sk", nz: 2, d: [["A3", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (miệng khe phía sông)", r: [35.6, 16, 4.4, 16], ctl: "sk", nz: 3, seat: 32, bar: [[35.9, 16], [39.7, 16], 4] },
      // cầu kính qua khe: thuộc khu công cộng, cuối cầu là quầy mượn trả (khóa ngoài giờ)
      { id: "LK", c: "circ", n: "Cầu kính qua khe", r: [25.5, 32, 3, 8], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // hộp thư viện tầng 1, dải Bắc: tiếp nhận, xử lý, quầy, đọc
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 40, 3.6, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.6, 40, 8.25, 8.5], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["C3", 1.0, "nv"]] },
      { id: "B1b", c: "B1", n: "Đọc mở, sách mới", r: [17.85, 40, 6.15, 8.5], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["C2", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [24, 40, 8.5, 3.53], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["B1b", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [24, 43.53, 8.5, 4.97], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn khe)", r: [32.5, 40, 8.5, 8.5], ctl: "tv", nz: 1, d: [["N", 1.2, "tnbd", 0.85]] },
      // dải giữa: kho, lõi sách, vệ sinh, kỹ thuật (không cần cửa sổ)
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 48.5, 6, 6.67], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 55.17, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["W", 1.2, "tnbd"], ["SC", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [12, 48.5, 12, 9.1], ctl: "kho", nz: 1, d: [["SC", 1.2, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang nhân viên", r: [12, 57.6, 12, 1.9], ctl: "nv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 48.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"], ["C1", 1.2, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [24, 56.5, 4, 3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"], ["LC", 0.9, "p"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [28, 48.5, 4.5, 11], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["B3", 1.8, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [32.5, 48.5, 8.5, 6.5], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [32.5, 55, 4.25, 4.5], ctl: "tv", nz: 1, wc: KT, d: [["LC", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [36.75, 55, 4.25, 4.5], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"]] },
      // dải Nam: văn phòng, phòng nhân viên, thiếu nhi
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 59.5, 9.5, 8.5], ctl: "nv", nz: 0, d: [["SC", 1.0, "nv"], ["S", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [15.5, 59.5, 4.7, 8.5], ctl: "nv", nz: 1, d: [["SC", 0.9, "nv"]] },
      // kho đồ chơi 1 m làm vách đệm: phòng nhân viên không chung vách với thiếu nhi
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy (vách đệm)", r: [20.2, 59.5, 1, 8.5], ctl: "tv", nz: 1, d: [["B3", 0.8, "p"]] },
      { id: "STE2", n: "Thang thoát hiểm Đông Nam", r: [32.5, 68, 3, 5], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["E", 1.2, "tnbd"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [21.2, 59.5, 19.8, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.3]] }
    ],
    staff: [
      { x: 25, y: 27, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 41.8, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 33.8, y: 18, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 37.8, y: 19, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 63.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13.7, y: 44.2, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 44, t: "Nhận sách", sc: ["4"] },
      { x: 10.7, y: 63.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 19.6, y: 24.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 19.6, y: 14.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NB, SB, TW],
    rooms: [
      // hộp công cộng tầng 2 (khu sự kiện): trưng bày, chuyên đề; chỉ lên bằng hai thang khu sự kiện
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [22, 16, 4, 7.8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["CO2", 1.4, "thang"]] },
      { id: "CO2", c: "circ", n: "Sảnh thang sự kiện", r: [26, 16, 3, 7.8], ctl: "sk", nz: 2, d: [["A2", 2.4, "o"]] },
      { id: "STE", n: "Thang bộ khu sự kiện", r: [29, 16, 3, 7.8], ctl: "sk", nz: 1, core: { st: "u", link: "STE" }, d: [["CO2", 1.2, "thang"]] },
      { id: "A2", c: "A2", n: "Trưng bày (nhìn xuống khe)", r: [22, 23.8, 10.9, 8.2], ctl: "sk", nz: 2, occ: 30, d: [["CO3b", 2.4, "o"]] },
      { id: "CO3", c: "circ", n: "Sảnh chuyên đề", r: [32, 16, 3.3, 7.8], ctl: "sk", nz: 2, d: [["D4", 1.6, "p"], ["STE", 1.2, "thang"]] },
      { id: "CO3b", c: "circ", n: "Sảnh chuyên đề (Nam)", r: [32.9, 23.8, 2.4, 8.2], ctl: "sk", nz: 2, d: [["D4", 1.6, "p"], ["CO3", 2.0, "o"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [35.3, 16, 4.7, 16], ctl: "sk", nz: 2, seat: 24 },
      // hộp thư viện tầng 2: sàn đọc dưới mái răng cưa đón sáng Bắc, quây quanh lõi sách
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây)", r: [6, 40, 10.5, 15.17], ctl: "tv", nz: 0, seat: 40, top: N, d: [["H3", 1.2, "p"]] },
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 55.17, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["H3", 1.2, "thang"]] },
      { id: "H3", c: "circ", n: "Sảnh thang Tây", r: [12, 55.17, 4.5, 4.33], ctl: "tv", nz: 1, d: [["B1m", 2.4, "o"], ["B1w", 2.0, "o"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (góc Tây Nam)", r: [6, 59.5, 10.5, 8.5], ctl: "tv", nz: 1, top: N },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (sảnh đọc lớn)", r: [16.5, 40, 7.5, 28], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [24, 40, 8.5, 6], ctl: "tv", nz: 1, steps: 4, top: N, d: [["H2", 2.4, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [24, 46, 8.5, 2.5], ctl: "tv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 48.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["H2", 1.4, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [24, 56.5, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["B1m", 1.0, "p"], ["B1e", 1.0, "p"]] },
      { id: "B1f", c: "B1", n: "Bàn đọc cá nhân", r: [24, 60.5, 4, 7.5], ctl: "tv", nz: 0, top: N, d: [["B1m", 1.6, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (dải giữa)", r: [28, 48.5, 4.5, 19.5], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [32.5, 40, 8.5, 11.76], ctl: "tv", nz: 1, seat: 16, top: N, d: [["H2", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [32.5, 51.76, 2, 16.24], ctl: "tv", nz: 2, d: [["B1e", 1.6, "o"], ["B5", 1.2, "o"]] },
      // dải kho đệm 1 m: tra cứu số không chung vách với phòng học nhóm
      { id: "STE2", n: "Thang thoát hiểm Đông Nam", r: [32.5, 68, 3, 5], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["CO4", 1.2, "thang"]] },
      { id: "KD2", c: "circ", n: "Kho đệm cách âm", r: [34.5, 51.76, 6.5, 1], ctl: "tv", nz: 1, d: [["CO4", 0.8, "nv"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [34.5, 52.76 + 3.81 * i, 6.5, 3.81], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [
      { x: 28, y: 43, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotA4", code: "A.4", name: "Khe chéo, lõi sách ở bản lề", from: "A",
    NA, NB, LK, SB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 12, 17.85, 22, 24, 28, 32.5, 41], y: [12, 16, 24, 28, 32, 40, 48.5, 59.5, 68] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 43.5], [5.2, 43.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 36], [24, 36], [24, 32.6]]],
        event: [[[20, -9], [3, 4], [3, 34], [23, 34], [24, 32.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào khe tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, vào khe tới sảnh đón tiếp" },
      hatch: [SLOT, GARDEN],
      labels: [[14, 34, "Khe Hải Vân (mép Bắc lùi bậc)"], [30.6, 75, "Vườn thiếu nhi có tường bao"], [12, 20, "Hộp sự kiện"], [31, 20, "Hộp công cộng"], [23, 52, "Lõi sách"]]
    }
  };
  plan.intro = `<p class="lede">Giữ phong cách khe Hải Vân của A: khe gió chạy từ lối Tây ra sông, mép Bắc lùi bậc (hộp sự kiện một tầng phía Tây, hộp công cộng hai tầng phía Đông lùi xuống Nam 4 m). Khác các ý tưởng trước, thư viện không trải dài thành nhiều thanh nữa mà gom lại thành một hộp gọn 35 × 28 m. Chính giữa hộp là <b>lõi sách</b> (thang bộ, thang máy, tời sách) đặt ngay sau quầy mượn trả: bên trái lõi là kho đóng và xử lý nghiệp vụ, bên phải là hành lang đọc, tầng trên là sàn đọc quây quanh đỉnh lõi dưới mái răng cưa đón sáng Bắc. Khách đi một đường duy nhất: vào khe → sảnh đón tiếp → cầu kính 8 m → quầy gửi đồ, mượn trả có cổng từ → lõi sách. Khách sự kiện từ sảnh đón tiếp rẽ trái sang hộp sự kiện, hoặc đi thang khu sự kiện lên trưng bày, chuyên đề.</p>`;
  plan.notes = [
    "Sửa ngày 05/11 (tiếng ồn): tầng 2 chèn một dải kho đệm 1 m giữa tra cứu số và cụm học nhóm, học nhóm thu còn 3,81 m mỗi phòng; tầng 1 chèn kho đồ chơi, xe đẩy 1 m làm vách đệm giữa phòng nhân viên và phòng thiếu nhi.",
    "Sửa ngày 05/11 (thoát nạn): thêm tháp thang thoát hiểm 3 × 5 m màu cam ở góc Đông Nam, mở thẳng vào cuối hành lang học nhóm tầng 2; tầng 1 chỉ có cửa thoát hiểm có chuông ra phía Đông, không thông vào khu đọc. Học nhóm xa nhất còn 23 m tới thang (trước 33 m). Vườn thiếu nhi thu lại phía Tây tháp, cửa vườn dời sang phía Tây.",
    "Đón tiếp là bản lề: khe có một cửa vào duy nhất, vào thẳng sảnh đón tiếp. Từ sảnh: rẽ trái sang sảnh sự kiện và phòng đa năng; đi thẳng qua cầu kính 8 m tới quầy gửi đồ, mượn trả (sảnh → quầy khoảng 12 m); lên trưng bày và chuyên đề bằng thang khu sự kiện ngay trong sảnh. Phòng đa năng, chuyên đề không có cửa vào từ ngoài, chỉ có cửa thoát nạn.",
    "Thang có hệ quả: hai thang lên khu đọc (lõi sách ở giữa, thang Tây sát lối Tây) chỉ tới được sau quầy có cổng từ. Thang Tây ở tầng 1 chỉ mở ra hành lang nhân viên bằng cửa thẻ từ và ra lối Tây bằng cửa thoát hiểm có chuông, nên không ai từ ngoài lên thẳng khu đọc. Hai thang khu sự kiện chỉ nối sảnh đón tiếp với trưng bày, chuyên đề, không có cửa nào sang khu đọc. Mỗi tầng trên có thang máy nằm trong đúng khu của nó.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách), lưu trữ tài liệu địa phương (liền vách). Kho đóng có cửa thẳng vào lõi sách: tời sách đưa sách lên sàn đọc tầng 2, xe đẩy sách tầng 1 đi qua sảnh sau cổng từ tới kệ. Từ kho đóng tới kệ xa nhất tầng 2 khoảng 33 m.",
    "Đường sách trả: người đọc trả sách ở quầy mượn trả; thủ thư đưa sách qua cửa nhân viên vào phòng đọc sách mới rồi sang xử lý (khoảng 17 m), không đi qua sảnh công cộng. Sách mới, sách trả và người đọc không đi chung đoạn nào ngoài phòng đọc sách mới (đặt ngay cạnh xử lý để thủ thư quan sát).",
    "Vệ sinh: cụm công cộng mở ngoài giờ ở ngay sảnh đón tiếp (cạnh thang khu sự kiện, gần phòng đa năng khoảng 18 m); trong khu đọc mỗi tầng có một cụm sát lõi sách, xếp chồng thẳng hàng; phòng thiếu nhi có vệ sinh trẻ em và chỗ thay tã mở thẳng vào phòng. Không ai phải ra khỏi cổng từ để đi vệ sinh.",
    "Ánh sáng Bắc – Nam: tầng 1 hộp thư viện chia ba dải: dải Bắc (nhìn khe) và dải Nam (nhìn vườn) là phòng có người, sâu 8,5 m; dải giữa 11 m chỉ có kho, lõi thang, vệ sinh, kỹ thuật, hành lang. Tầng 2 là tầng trên cùng nên toàn bộ sàn đọc lấy sáng mái răng cưa kính quay Bắc (sáng dịu, không nắng gắt). Đầu Đông, đầu Tây các hộp là tường đặc.",
    "Không che sáng nhau: khe phía Tây rộng 12 m (hộp sự kiện một tầng cao +6,45), khe phía Đông rộng 8 m giữa hai hộp hai tầng cao +9,45, góc che 44° (dưới 45°). Răng cưa lùi vào 2 m so với mép khe nên không làm tăng góc che.",
    "Yên tĩnh: đọc yên tĩnh ở đầu Tây tầng 2, cách học nhóm (đầu Đông) cả sảnh đọc lớn và dải đọc giữa; thiếu nhi ở tầng 1 dải Nam, mở ra vườn có tường bao; phòng đa năng nằm bên kia khe.",
    "Ngoài giờ: sảnh đón tiếp, cà phê, vệ sinh công cộng, hộp sự kiện và tầng 2 hộp công cộng chạy riêng. Chỉ khóa một cửa: cuối cầu kính vào quầy mượn trả, cửa này không nằm trên đường thoát nạn nào.",
    "Diện tích: tổng sàn khoảng 2.820 m², mọi phòng trong ±10% đề."
  ];
  /* ---------- khối 3D ---------- */
  const { B, SH, col } = G.K;
  const zR = 9.45, RISE = 1.6;
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
    id: "chotA4", fam: "chot", code: "A.4", from: "A", name: "Khe chéo, lõi sách ở bản lề", rule: "Bất đối xứng, khe lùi bậc, một lõi giữa",
    tag: "Khe Hải Vân lùi bậc; thư viện gom thành một hộp gọn quanh lõi sách ngay sau quầy mượn trả; mái răng cưa đón sáng Bắc",
    story: "Khe Hải Vân vẫn chạy từ lối Tây ra sông, nhưng bên kia khe thư viện không còn là những thanh dài phải đi bộ cả trăm mét. Nó là một hộp gọn có trái tim là lõi sách: kho đóng một bên, sàn đọc một bên, tầng trên là sảnh đọc lớn dưới những răng cưa kính hướng Bắc. Đi vào bằng một đường thẳng: khe → sảnh đón tiếp → cầu kính → quầy mượn trả → lõi sách.",
    why: [["Quy luật hình khối", "Ba hộp chữ nhật: hộp sự kiện thấp, hộp công cộng hai tầng lùi bậc tạo mép khe xiên, hộp thư viện gọn có mái răng cưa. Cầu kính mảnh bắc qua khe."], ["Khối chính – khối phụ", "Hộp thư viện chiếm khoảng 70% sàn, mái răng cưa cao nhất; hai hộp phía Bắc thấp và nhỏ hơn."], ["Nắng và chói", "Tầng 1: phòng có người chỉ ở dải Bắc và dải Nam. Tầng 2: sáng mái hướng Bắc, không nắng chiếu thẳng lên bàn đọc và màn hình."], ["Gió và mưa", "Khe mở về sông đón gió Đông Nam; cầu kính có mái che từ sảnh sang quầy mượn trả."], ["Công năng", "Một cửa vào, sảnh đón tiếp là bản lề; lõi sách nằm giữa kho và chỗ đọc nên đường sách ngắn; vệ sinh xếp chồng sát lõi."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; phòng đa năng 11,25 × 16 m dùng dầm bê tông ứng lực trước; mái răng cưa thép nhẹ trên dầm bê tông, khoảng răng 4 m; kho đóng đặt ở tầng 1 sát lõi sách (tải nặng xuống thẳng móng); cầu kính dầm thép nhịp 8 m.", nhip: "16 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Thư viện sâu 28 m có bị bí?", "Không: tầng 1 phòng có người chỉ ở hai dải sát mặt Bắc và mặt Nam, sâu 8,5 m; dải giữa là kho, thang, vệ sinh. Tầng 2 lấy sáng mái răng cưa hướng Bắc nên sàn đọc sâu vẫn sáng đều."], ["Đi từ cổng vào chỗ đọc có xa?", "Từ bãi xe đi dọc bờ sông vào khe; trong nhà, từ cửa vào tới quầy mượn trả chỉ khoảng 12 m, tới chỗ đọc xa nhất tầng 2 dưới 60 m."], ["Khách sự kiện có lạc vào thư viện?", "Không: quầy mượn trả nằm cuối cầu kính, khóa ngoài giờ; thang khu sự kiện không có cửa sang khu đọc."]],
    cut: "Hộp sự kiện foam xám thấp, hộp công cộng trắng, hộp thư viện trắng có 6 răng cưa giấy cỏ và mica kính quay Bắc. Lõi sách foam tím cao hơn răng cưa, thang khu sự kiện tím và cam. Cầu kính bằng mica.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[23.5, 54, 12.8, "Lõi sách: thang + thang máy + tời sách", 1], [33, 62, 11.4, "Khối chính · Hộp thư viện, mái răng cưa", 1], [12, 20, 6.8, "Khối phụ · Hộp sự kiện", 2], [31, 24, 9.8, "Khối phụ · Hộp công cộng", 2], [27, 36, 4.8, "Cầu kính qua khe", 2], [14, 34, 0.6, "Khe Hải Vân", 2]],
    build() {
      // lõi đặt trước, rồi hộp hai tầng, rồi hộp thấp: phép kiểm góc che gặp khối cao nhất trước
      const v = [
        coreBox(t1, "CS", "violet", 12.45), coreBox(t1, "STS", "warn", 12.45), coreBox(t1, "STE2", "warn", 12.45), coreBox(t1, "CN", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05),
        B(6, 40, 35, 28, 0.45, zR, "sheet", "B", { fl: 2, role: "m" }),
        B(22, 16, 18, 16, 0.45, zR, "sheet", "A", { fl: 2, top: "grass", role: "p" }),
        B(6, 12, 16, 16, 0.45, 6.45, "sheet", "D", { fl: 1, top: "grass", role: "p" }),
        B(25.5, 32, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        ...teeth(6, 42, 35, 6, 4),
        // tường thấp bao vườn thiếu nhi
        B(20.2, 68, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(40.7, 68, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(20.2, 78.7, 20.8, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38, 41]) for (const y of [40, 48.5, 59.5, 68]) st.push(col(x, y, 0.45, zR));
      for (const x of [22, 30, 40]) for (const y of [16, 24, 32]) st.push(col(x, y, 0.45, zR));
      for (const x of [6, 17.25, 22]) for (const y of [12, 28]) st.push(col(x, y, 0.45, 6.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
