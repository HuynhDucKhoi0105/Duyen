/* ================= Ý tưởng S.12: Hộp có sân trong (một khối chữ nhật khoét sân giữa) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // một hộp chữ nhật 35,5 × 46 m hai tầng, khoét một sân trong 19,5 × 12 m ở giữa.
  // Cạnh Bắc, cạnh Nam (sâu 17 m) chứa phòng có người, lấy sáng mặt ngoài và mặt sân; cạnh Đông, cạnh Tây (quay Đông – Tây) chỉ có kho, thang, kỹ thuật, hành lang
  const NL = [[6, 15], [41.5, 15], [41.5, 32], [6, 32]];      // cạnh Bắc
  const WL = [[6, 32], [14, 32], [14, 47], [6, 47]];          // cạnh Tây
  const EL = [[33.5, 32], [41.5, 32], [41.5, 44], [33.5, 44]];// cạnh Đông
  const SLW = [[6, 47], [14, 47], [14, 61], [6, 61]];         // góc Tây Nam
  const SLM = [[14, 44], [41.5, 44], [41.5, 61], [14, 61]];   // cạnh Nam
  const COURT = [[14, 32], [33.5, 32], [33.5, 44], [14, 44]];
  const GARDEN = [[14, 61], [24.6, 61], [24.6, 72], [14, 72]];   // vườn thiếu nhi có tường bao
  const GARDEN2 = [[24.6, 61], [41.5, 61], [41.5, 84], [24.6, 84]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const ENV = [NL, WL, EL, SLW, SLM];

  /* ---------- Tầng 1: công cộng, sự kiện, nghiệp vụ, văn phòng ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: ENV,
    rooms: [
      // cạnh Bắc, dải ngoài (nhìn quảng trường): bảo vệ, quầy, sảnh, cà phê, chuyên đề
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 15, 3, 5], ctl: "nv", nz: 1, d: [["N", 0.9, "nv"], ["A4", 0.9, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 20, 3, 10], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["CS", 1.2, "nv"], ["KX", 0.9, "nv"]] },
      { id: "KX", c: "circ", n: "Tủ điện, camera", r: [6, 30, 3, 2], ctl: "nv", nz: 1 },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [9, 15, 5, 6], ctl: "tv", ctrl: 1, nz: 2, d: [["CS", 2.0, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [9, 21, 5, 11], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["C2", 1.2, "nv"], ["C1", 1.2, "nv"], ["HLW", 1.8, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [14, 15, 9.5, 8.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["A4", 2.0, "k"], ["A3", 2.4, "o"], ["A2", 1.3, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [23.5, 15, 8.5, 8.5], ctl: "sk", nz: 3, seat: 32, d: [["N", 1.2, "tn"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [32, 15, 9.5, 8.5], ctl: "sk", nz: 2, seat: 24, d: [["FOY2", 1.4, "p"], ["N", 1.2, "tn"]] },
      // cạnh Bắc, dải trong (nhìn sân): xử lý nghiệp vụ, trưng bày
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (nhìn sân)", r: [14, 23.5, 8, 8.5], ctl: "nv", nz: 1 },
      { id: "A2", c: "A2", n: "Trưng bày (nhìn sân)", r: [22, 23.5, 11.5, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["A3", 2.4, "o"], ["FOY2", 2.4, "o"], ["S", 1.2, "tn"]] },
      { id: "FOY2", c: "circ", n: "Sảnh sự kiện", r: [33.5, 23.5, 4, 8.5], ctl: "sk", nz: 2, occ: 40, d: [["WCP", 1.0, "p"], ["COR2", 2.3, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [37.5, 23.5, 4, 3], ctl: "sk", nz: 1, wc: KT },
      { id: "STN", n: "Thang bộ thư viện Đông Bắc", r: [37.5, 26.5, 4, 5.5], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["E", 1.2, "tnbd"]] },
      // cạnh Tây: kho đóng dọc tường Tây đặc, hành lang thư viện dẫn xuống phòng thiếu nhi
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 32, 6, 19], noclip: 1, ctl: "kho", nz: 1, d: [["SC", 1.0, "nv"], ["W", 1.0, "nv"]] },
      { id: "HLW", c: "circ", n: "Hành lang thư viện sau cổng từ", r: [12, 32, 2, 15], ctl: "tv", nz: 1, d: [["B3", 1.8, "p", 0.5], ["WCB", 0.9, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [12, 47, 2, 4], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      // góc Tây Nam: hành lang nhân viên, phòng nhân viên, thang
      { id: "SC", c: "circ", n: "Hành lang nhân viên", r: [6, 51, 8, 2], ctl: "nv", nz: 1, d: [["E2", 1.0, "nv"], ["STSW", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 53, 5, 8], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"]] },
      { id: "STSW", n: "Thang bộ thư viện Tây Nam", r: [11, 53, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STSW" }, d: [["S", 1.2, "tnbd"]] },
      // cạnh Đông: hành lang sự kiện, kỹ thuật
      { id: "COR2", c: "circ", n: "Hành lang sự kiện (nhìn sân)", r: [33.5, 32, 2.5, 12], ctl: "sk", nz: 2, d: [["D1", 1.4, "p"], ["K1", 0.9, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [36, 32, 5.5, 10], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "K1", c: "circ", n: "Sảnh phụ sự kiện", r: [36, 42, 5.5, 2], ctl: "sk", nz: 1, d: [["WCD", 0.9, "p"]] },
      // cạnh Nam: thiếu nhi (sân tường bao phía Nam), phòng đa năng, kho sự kiện
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (nhìn sân trong và vườn)", r: [14, 44, 10.6, 17], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5], ["WCB", 1.0, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng (nhìn sân và vườn)", r: [24.6, 44, 10.75, 17], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.4], ["S", 1.8, "tn", 0.6]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [35.35, 44, 3.15, 8], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"], ["K6", 0.9, "p"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [35.35, 52, 3.15, 6.35], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "K4", c: "circ", n: "Kho đạo cụ", r: [35.35, 58.35, 3.15, 2.65], ctl: "sk", nz: 1, d: [["D3", 0.9, "p"]] },
      { id: "WCD", c: "E5", n: "Vệ sinh khu sự kiện", r: [38.5, 44, 3, 3.5], ctl: "sk", nz: 1, wc: "Nam · Nữ" },
      { id: "K6", c: "circ", n: "Kho âm thanh, ánh sáng", r: [38.5, 47.5, 3, 8], ctl: "sk", nz: 1 },
      { id: "STSE", n: "Thang bộ thư viện Đông Nam", r: [38.5, 55.5, 3, 5.5], ctl: "tv", nz: 1, core: { st: "u", link: "STSE" }, d: [["E", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 18.75, y: 19, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 11.5, y: 18, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.5, y: 17.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 27.5, y: 19, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 18, y: 28, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.5, y: 25, t: "Nhận sách", sc: ["4"] },
      { x: 19.3, y: 52, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 34.7, y: 38, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 36.9, y: 48, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: toàn bộ là thư viện, lấy sáng mái răng cưa quay Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: ENV,
    rooms: [
      // cạnh Bắc
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (góc Tây Bắc)", r: [6, 15, 8, 6], ctl: "tv", nz: 1, top: N },
      { id: "H2w", c: "circ", n: "Sảnh vệ sinh tầng 2", r: [6, 21, 3, 5], ctl: "tv", nz: 1, d: [["WC2", 1.0, "p"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2 (Tây)", r: [6, 26, 3, 6], ctl: "tv", nz: 1, wc: KT },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [9, 21, 5, 11], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1w", 1.4, "thang"], ["H2w", 1.2, "thang"], ["B2", 1.2, "thang"], ["H2n", 1.2, "thang"], ["H4", 1.4, "thang"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (cạnh Bắc)", r: [14, 15, 9.5, 15.5], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "H2n", c: "circ", n: "Hành lang nhìn sân", r: [14, 30.5, 9.5, 1.5], ctl: "tv", nz: 1, d: [["B1n", 1.3, "o"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (sảnh đọc lớn)", r: [23.5, 15, 10, 17], ctl: "tv", nz: 1, top: N, d: [["B1e", 2.4, "o"], ["B1e2", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (góc Đông Bắc)", r: [33.5, 15, 8, 11.5], ctl: "tv", nz: 1, top: N, d: [["STN", 1.2, "thang"]] },
      { id: "B1e2", c: "B1", n: "Bàn đọc cạnh thang", r: [33.5, 26.5, 4, 5.5], ctl: "tv", nz: 1, top: N, d: [["H2e", 1.8, "o"], ["STN", 1.2, "thang"]] },
      { id: "STN", n: "Thang bộ thư viện Đông Bắc", r: [37.5, 26.5, 4, 5.5], ctl: "tv", nz: 1, core: { st: "u", link: "STN" } },
      // cạnh Tây
      { id: "B1wl", c: "B1", n: "Đọc mở và kệ (cạnh Tây)", r: [6, 32, 6, 15], ctl: "tv", nz: 1, top: N },
      { id: "H4", c: "circ", n: "Hành lang cạnh Tây", r: [12, 32, 2, 15], ctl: "tv", nz: 1, d: [["B1wl", 2.4, "o"], ["B6", 2.0, "o"], ["E1a", 0.9, "nv"]] },
      // góc Tây Nam: văn phòng (trên phòng nhân viên, kho đóng)
      { id: "E1a", c: "E1", n: "Văn phòng (giám đốc, kế toán)", r: [6, 47, 8, 5.75], ctl: "nv", nz: 0, top: N, d: [["E1b", 0.9, "nv"]] },
      { id: "E1b", c: "E1", n: "Văn phòng (hành chính)", r: [6, 52.75, 5, 8.25], ctl: "nv", nz: 0, top: N, d: [["STSW", 0.9, "nv"]] },
      { id: "STSW", n: "Thang bộ thư viện Tây Nam", r: [11, 52.75, 3, 8.25], ctl: "tv", nz: 1, core: { st: "u", link: "STSW" }, d: [["B5", 1.2, "thang"]] },
      // cạnh Đông
      { id: "H2e", c: "circ", n: "Hành lang cạnh Đông", r: [33.5, 32, 2, 12], ctl: "tv", nz: 1, d: [["B1el", 2.4, "o"], ["WCE", 1.0, "p"], ["CO4", 1.6, "o"]] },
      { id: "B1el", c: "B1", n: "Đọc mở và kệ (cạnh Đông)", r: [35.5, 32, 6, 9.5], ctl: "tv", nz: 1, top: N, d: [["STN", 1.2, "thang"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh thư viện tầng 2 (Đông)", r: [35.5, 41.5, 6, 2.5], ctl: "tv", nz: 1, wc: "Nam · Nữ" },
      // cạnh Nam, phía trên phòng thiếu nhi: đọc linh hoạt, tra cứu số
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [14, 44, 7, 7.5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B5", 2.4, "o"]] },
      { id: "H3", c: "circ", n: "Sảnh vệ sinh phía Nam", r: [21, 44, 3.6, 4.5], ctl: "tv", nz: 1, d: [["B6", 2.0, "o"], ["WCS", 1.0, "p"], ["C3", 0.9, "nv"]] },
      { id: "WCS", c: "E5", n: "Vệ sinh thư viện tầng 2 (Nam)", r: [21, 48.5, 3.6, 3], ctl: "tv", nz: 1, wc: "Nam · Nữ" },
      { id: "B5", c: "B5", n: "Tra cứu số (góc Tây Nam)", r: [14, 51.5, 10.6, 9.5], ctl: "tv", nz: 1, seat: 16, top: N },
      // phía trên phòng đa năng: kho lưu trữ (vách đệm), học nhóm, hành lang
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương (vách đệm)", r: [24.6, 44, 2.5, 17], ctl: "kho", nz: 1, d: [["K13", 0.9, "nv"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [27.1, 44 + 3.75 * i, 6.25, 3.75], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] })),
      { id: "K13", c: "circ", n: "Tủ đồ học nhóm", r: [27.1, 59, 6.25, 2], ctl: "tv", nz: 1, d: [["CO4", 0.9, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [33.35, 44, 2, 17], ctl: "tv", nz: 2, d: [["E6", 0.9, "nv"], ["K12", 1.6, "o", 0.1], ["K12", 1.2, "o", 0.85]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [35.35, 44, 3.15, 6.35], ctl: "nv", nz: 1 },
      { id: "K12", c: "circ", n: "Sảnh thang Đông Nam", r: [35.35, 50.35, 3.15, 10.65], ctl: "tv", nz: 1, d: [["STSE", 1.2, "thang"], ["K15", 1.0, "p"]] },
      { id: "K15", c: "circ", n: "Kho sách, giá lưu động", r: [38.5, 44, 3, 11.5], ctl: "tv", nz: 1 },
      { id: "STSE", n: "Thang bộ thư viện Đông Nam", r: [38.5, 55.5, 3, 5.5], ctl: "tv", nz: 1, core: { st: "u", link: "STSE" } }
    ],
    staff: [
      { x: 17.5, y: 48, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 10, y: 50, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS12", code: "S.12", name: "Hộp có sân trong", from: "khối vuông",
    NL, WL, EL, SLW, SLM,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 9, 14, 24.6, 35.35, 41.5], y: [15, 23.5, 32, 44, 53, 61] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 24, y: 38, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 22], [5.2, 22]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 13], [18.75, 13], [18.75, 14.6]]],
        event: [[[20, -9], [20, 8], [18.75, 13], [18.75, 14.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vòng lên sân trước phía Bắc tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc thẳng vào sảnh đón tiếp" },
      hatch: [COURT, GARDEN, GARDEN2],
      labels: [[23.75, 38, "Sân trong 19,5 × 12 m"], [19.3, 67, "Vườn thiếu nhi (tường bao)"], [33, 74, "Vườn phía Nam"], [24, 13.2, "Sân trước, cửa vào"]]
    }
  };
  plan.intro = `<p class="lede">Chỉ một hộp chữ nhật 35,5 × 46 m, cao hai tầng, khoét một sân trong 19,5 × 12 m ở giữa. Cạnh Bắc và cạnh Nam sâu 17 m là nơi có người: mỗi phòng lấy sáng từ mặt ngoài hoặc từ sân, đều là hướng Bắc hoặc Nam. Cạnh Đông, cạnh Tây quay Đông – Tây nên chỉ đặt kho, thang, kỹ thuật, hành lang, tường ngoài đặc. Tầng 1 là công cộng, sự kiện, nghiệp vụ và <b>phòng thiếu nhi có vườn tường bao riêng</b>; tầng 2 là các phòng đọc và văn phòng, lấy sáng mái răng cưa quay Bắc. Cửa vào duy nhất ở giữa mặt Bắc, nhìn ra quảng trường; muốn vào bất kỳ phòng đọc nào, kể cả phòng thiếu nhi, đều phải qua quầy gửi đồ, mượn trả có cổng từ ngay cạnh sảnh.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: vào sảnh đón tiếp ở giữa mặt Bắc. Rẽ phải là cà phê, trưng bày nhìn sân, đi tiếp theo hành lang cạnh Đông tới phòng đa năng; rẽ trái qua cửa khóa là quầy gửi đồ, mượn trả có cổng từ (sảnh → quầy khoảng 6 m). Sau quầy là sảnh lõi sách: lên tầng 2 bằng thang bộ, thang máy; hoặc đi thẳng theo hành lang cạnh Tây xuống phòng thiếu nhi ở tầng 1.",
    "Thiếu nhi ở tầng 1, góc Tây Nam: phòng chạy suốt chiều sâu cạnh Nam, nhìn sân trong và mở ra vườn thiếu nhi có tường bao phía Nam (cửa ra vườn là cửa có chuông, chỉ để trẻ chơi trong vườn kín và thoát nạn). Vệ sinh trẻ em, thay tã ngay cạnh cửa phòng.",
    "Thang có hệ quả: bốn thang của tầng 2 (lõi sách Tây Bắc, thang Đông Bắc, Tây Nam, Đông Nam) chia đều bốn góc, chỗ đọc nào cũng không quá 30 m tới thang. Ba thang góc ở tầng 1 chỉ có cửa thoát hiểm có chuông ra ngoài (thang Tây Nam có thêm cửa thẻ từ cho nhân viên); không thang nào mở vào khu sự kiện. Chỉ lõi sách có cửa vào từ quầy mượn trả.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → lõi sách (tời sách) → xử lý nghiệp vụ nhìn sân, kho đóng chạy dọc tường Tây; ba phòng này ôm quanh lõi sách nên mỗi bước chỉ vài mét. Sách trả: quầy mượn trả mở thẳng vào sảnh lõi sách, cạnh cửa nhân viên vào xử lý. Lưu trữ tài liệu địa phương ở tầng 2, cạnh hành lang phía Nam.",
    "Vệ sinh: cụm công cộng ở sảnh sự kiện cạnh Đông Bắc (cách sảnh đón tiếp khoảng 22 m), cụm nhỏ cạnh phòng đa năng, vệ sinh trẻ em cạnh phòng thiếu nhi. Tầng 2 có ba cụm: cạnh lõi sách (có chỗ cho người khuyết tật), cạnh Đông, và phía Nam cạnh tra cứu số.",
    "Ánh sáng Bắc – Nam: cạnh Bắc chia hai dải sâu 8,5 m, dải ngoài nhìn quảng trường, dải trong nhìn sân; phòng thiếu nhi và phòng đa năng chạy suốt chiều sâu cạnh Nam, lấy sáng cả mặt sân lẫn mặt vườn. Sân trong rộng 12 m theo phương Bắc – Nam, hộp cao +9,45 nên góc che từ cửa sổ tầng 1 chỉ khoảng 33°. Tầng 2 là tầng trên cùng, mọi phòng lấy sáng mái răng cưa kính quay Bắc.",
    "Tiếng ồn: ở tầng 1, thiếu nhi nằm cạnh phòng đa năng (cả hai đều là khu ồn), xa khu đọc. Ở tầng 2, học nhóm nằm đúng trên phòng đa năng, ngăn với tra cứu số bằng kho lưu trữ; đọc yên tĩnh ở cạnh Bắc, cách học nhóm 14 m qua sân. Phòng nhân viên ở góc Tây Nam tầng 1, văn phòng ngay phía trên ở tầng 2: không chung vách và không chồng tầng với phòng ồn nào.",
    "Ngoài giờ: sảnh đón tiếp, cà phê, trưng bày, chuyên đề, phòng đa năng và hai cụm vệ sinh nối liền nhau theo cạnh Bắc và cạnh Đông, chạy riêng; chỉ khóa cửa giữa sảnh và quầy mượn trả.",
    "Kết cấu: một khung bê tông lưới khoảng 8,5 m chạy vòng quanh sân, không đua; phòng đa năng 10,75 × 17 m dùng dầm ứng lực trước đỡ sàn học nhóm phía trên; kho đóng ở tầng 1 dọc tường Tây."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const zR = 9.45;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS12", fam: "chot", code: "S.12", from: "khối vuông", name: "Hộp có sân trong", rule: "Một hộp chữ nhật hai tầng khoét sân giữa",
    tag: "Một hộp 35,5 × 46 m hai tầng, sân trong 19,5 × 12 m; tầng 1 công cộng và thiếu nhi có vườn, tầng 2 là các phòng đọc",
    story: "Một chiếc hộp duy nhất, khoét rỗng ở giữa. Bên ngoài là tường đặc phía Đông, Tây và dải kính phía Bắc, Nam; bên trong là một sân yên tĩnh mà mọi hành lang đều nhìn vào. Tầng dưới là nơi gặp gỡ và chỗ chơi của trẻ, tầng trên là một vòng đọc sách liền mạch quanh sân.",
    why: [["Quy luật hình khối", "Một hộp chữ nhật trọn vẹn, chỉ có một khoảng rỗng ở giữa; bốn lõi thang nhô nhẹ khỏi mái ở bốn góc."], ["Khối chính – khối phụ", "Không chia khối: chính là chiếc hộp; thư viện chiếm cả tầng 2 và góc Tây Nam tầng 1."], ["Nắng và chói", "Phòng có người chỉ quay Bắc, Nam (ra ngoài hoặc vào sân); hai cạnh Đông, Tây là kho, thang, kỹ thuật, tường đặc."], ["Gió và mưa", "Sân trong là giếng gió: gió Đông Nam vào qua cửa sổ mặt Nam, thoát lên qua sân; hành lang quanh sân có mái."], ["Công năng", "Một cửa vào ở giữa mặt Bắc, quầy mượn trả ngay cạnh sảnh, lõi sách nằm giữa tiếp nhận, xử lý và kho đóng."]],
    kc: { he: "Khung bê tông lưới khoảng 8,5 m chạy vòng quanh sân, sàn tầng 2 đặt thẳng trên tầng 1; mái răng cưa thép nhẹ kính quay Bắc; phòng đa năng, phòng thiếu nhi dầm ứng lực trước nhịp 10,6 – 10,75 m.", nhip: "10,75 m (phòng đa năng), 8,5 m (lưới)", cx: "Không" },
    qa: [["Phòng thiếu nhi có lối riêng ra vườn?", "Chỉ là cửa ra vườn kín có tường bao (cửa có chuông); trẻ và phụ huynh vào qua sảnh đón tiếp, quầy mượn trả, rồi theo hành lang cạnh Tây như mọi người đọc."], ["Phòng đa năng ồn có làm ảnh hưởng tầng trên?", "Phía trên chỉ là học nhóm (cũng là khu ồn), kho lưu trữ và hành lang; sàn dày có lớp cách âm."]],
    cut: "Một hộp foam trắng cắt rỗng giữa; dải mica phía Bắc, Nam, tường đặc Đông, Tây; bốn lõi thang foam tím, cam ở bốn góc nhô 1 cm khỏi mái; vườn thiếu nhi có tường bao thấp phía Nam.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[23.75, 23.5, 11.5, "Khối chính · Hộp có sân trong", 1], [11.5, 26.5, 12, "Lõi sách", 1], [23.75, 38, 1, "Sân trong", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "STN", "warn", 11.05), coreBox(t1, "STSW", "warn", 11.05), coreBox(t1, "STSE", "warn", 11.05),
        B(6, 15, 35.5, 17, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        B(6, 32, 8, 15, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        B(33.5, 32, 8, 12, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        B(6, 47, 8, 14, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        B(14, 44, 27.5, 17, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        // dải mái răng cưa kính quay Bắc
        ...[18, 23, 28].map(y => B(7, y, 33.5, 0.5, zR, zR + 0.6, "glass", "X", { op: 0.75 })),
        ...[47, 52, 57].map(y => B(15, y, 25.5, 0.5, zR, zR + 0.6, "glass", "X", { op: 0.75 })),
        ...[35, 40].map(y => B(7, y, 6, 0.5, zR, zR + 0.6, "glass", "X", { op: 0.75 })),
        // tường thấp vườn phía Nam
        B(14, 61, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(24.3, 61, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(14, 71.7, 10.6, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22.75, 33.5, 41.5]) for (const y of [15, 23.5, 32]) st.push(col(x, y, 0.45, zR));
      for (const x of [6, 14, 22.75, 33.5, 41.5]) for (const y of [44, 53, 61]) st.push(col(x, y, 0.45, zR));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
