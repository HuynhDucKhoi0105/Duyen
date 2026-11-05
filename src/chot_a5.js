/* ================= Ý tưởng A.5: Khe chéo xuyên nhà gọn (từ A, theo góp ý đi lại 05/11) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // một thanh sự kiện một tầng ở Bắc, sân gió 10 m, một khối thư viện gọn 35 × 32 m hai tầng.
  // khe chéo của A (dốc 2/3) cắt góc Đông Bắc tầng 1 khối thư viện thành hiên vào có mái (sàn đọc tầng 2 phủ trên),
  // mở ra sân gió và ra phía sông Bạch Đằng; cửa vào duy nhất nằm trong khe.
  const EV = [[6, 14], [41, 14], [41, 30], [6, 30]];                 // thanh sự kiện, một tầng mái cỏ
  const LK = [[21, 30], [24, 30], [24, 40], [21, 40]];               // hành lang kính qua sân: đón tiếp → sảnh sự kiện
  const PT = [[6, 40], [26, 40], [41, 50], [41, 72], [6, 72]];       // tầng 1 khối thư viện (đã trừ khe chéo)
  const LB = [[6, 40], [41, 40], [41, 72], [6, 72]];                 // tầng 2 khối thư viện, phủ cả khe
  const KHE = [[26, 40], [41, 40], [41, 50]];                         // khe chéo: hiên vào có mái
  const GARDEN = [[20, 72], [41, 72], [41, 79], [20, 79]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const ZE = 6.45, Z2 = 9.45, RISE = 1.6, TOOTH = 4;

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, LK, PT],
    rooms: [
      // thanh sự kiện (mở ngoài giờ): chỉ vào từ sảnh đón tiếp qua hành lang kính; cửa ra ngoài chỉ là cửa thoát nạn
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 14, 3, 9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"], ["W", 1.2, "tn"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6, 23, 3, 7], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [9, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.3]] },
      { id: "WCE", c: "E5", n: "Vệ sinh khu sự kiện", r: [20.25, 14, 3, 5.5], ctl: "sk", nz: 1, wc: KT, d: [["FOY", 1.2, "p"]] },
      { id: "AV", c: "circ", n: "Điều phối, âm thanh", r: [23.25, 14, 3, 5.5], ctl: "sk", nz: 1, d: [["FOY", 0.9, "p"]] },
      { id: "FOY", c: "circ", n: "Sảnh sự kiện", r: [20.25, 19.5, 6, 10.5], ctl: "sk", nz: 2, occ: 60, d: [["D1", 1.8, "p", 0.3], ["D1", 1.8, "p", 0.8], ["A2", 2.4, "o", 0.5], ["D4", 1.2, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26.25, 14, 10.5, 7.5], ctl: "sk", nz: 2, seat: 24 },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Nam, có mái hắt)", r: [26.25, 21.5, 10.5, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["A3", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách nhìn sông", r: [36.75, 14, 4.25, 16], ctl: "sk", nz: 3, seat: 32, bar: [[37.15, 14.4], [37.15, 29.6], 8], d: [["E", 1.6, "tn", 0.5]] },
      { id: "LK", c: "circ", n: "Hành lang kính qua sân gió", r: [21, 30, 3, 10], ctl: "sk", nz: 2, d: [["FOY", 2.4, "o"], ["A1", 2.4, "o"]] },
      // khối thư viện, dải Bắc: bảo vệ, quầy giữ đồ – mượn trả, đón tiếp, sảnh vào trong khe
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 40, 4, 3.75], ctl: "nv", nz: 1, d: [["SC", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [10, 40, 4, 8], ctl: "tv", ctrl: 1, nz: 2, d: [["LH", 2.4, "o"], ["SC", 0.9, "nv"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [14, 40, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["A4", 1.8, "k", 0.5]] },
      { id: "VES", c: "circ", n: "Sảnh vào trong khe", p: [[24, 40], [26, 40], [38, 48], [24, 48]], ctl: "sk", nz: 2, occ: 30, d: [["X", 2.4, "chinh", 0.45], ["A1", 3, "o"], ["WCP", 1.2, "p"]] },
      // dải giữa (không cần cửa sổ): lõi sách, kho, vệ sinh, kỹ thuật
      { id: "SC", c: "circ", n: "Hành lang nhân viên, cửa nhân viên", r: [6, 43.75, 4, 12.25], ctl: "nv", nz: 1, d: [["W", 1.2, "nv", 0.3], ["CS", 1.0, "nv"], ["C4", 1.2, "nv"]] },
      { id: "LH", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [10, 48, 18, 4], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["C1", 1.2, "nv", 0.3], ["LC", 2.4, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: [28, 48, 4, 4], ctl: "sk", nz: 1, wc: KT, d: [["E6", 0.9, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [32, 48, 5, 4], ctl: "nv", nz: 1 },
      { id: "GEN", c: "circ", n: "Hộp gen kỹ thuật", p: [[37, 48], [38, 48], [41, 50], [41, 52], [37, 52]], ctl: "kt", nz: 1, d: [["E4", 0.9, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, 52, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HN", 1.0, "nv"]] },
      { id: "HN", c: "circ", n: "Sảnh nghiệp vụ dưới lõi sách", r: [10, 59, 4, 5], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"], ["C1", 1.2, "nv"], ["C2", 1.2, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 56, 4, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5]] },
      { id: "C1", c: "C1", n: "Kho đóng (dưới sàn kệ tầng 2)", r: [14, 52, 10, 12], ctl: "kho", nz: 1 },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [24, 52, 4, 12], ctl: "tv", nz: 1, d: [["C3", 1.0, "nv"], ["WCL1", 1.2, "p"], ["B3", 1.8, "o"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [28, 52, 5, 8], ctl: "kho", nz: 1 },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [28, 60, 5, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [33, 52, 8, 6.25], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "SB", c: "circ", n: "Chỗ để xe đẩy, sảnh thang Đông", r: [33, 58.25, 4, 5.75], ctl: "tv", nz: 1, d: [["B3", 1.6, "o"], ["CS2", 1.2, "thang"]] },
      { id: "CS2", n: "Thang bộ Đông (thoát nạn thư viện)", r: [37, 58.25, 4, 5.75], ctl: "tv", nz: 1, core: { st: "u", link: "CS2" }, d: [["E", 1.2, "tnbd"]] },
      // dải Nam: nghiệp vụ, nhân viên, thiếu nhi
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [11, 64, 9, 8], ctl: "nv", nz: 1, d: [["E2", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên (góc Tây Nam, xa thiếu nhi)", r: [6, 64, 5, 8], ctl: "nv", nz: 1 },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [20, 64, 21, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.6]] }
    ],
    staff: [
      { x: 19, y: 44, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 12, y: 44, t: "Thủ thư giữ đồ, mượn trả", sc: ["1", "3", "4"] },
      { x: 8, y: 41.8, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 38.7, y: 22, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 68, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 15, y: 68, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 60, t: "Nhận sách", sc: ["4"] },
      { x: 23, y: 25, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 24.7, y: 16.7, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: một sàn đọc dưới mái răng cưa đón sáng Bắc ---------- */
  const N = { top: "N" };
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [LB],
    rooms: [
      // dải Bắc tầng 2: đọc yên tĩnh ở góc Đông Bắc, cách cụm học nhóm (góc Nam) 12 m, nằm trên sảnh vào chứ không trên phòng ồn
      { id: "B1a", c: "B1", n: "Góc đọc Tây Bắc", r: [6, 40, 4, 12], ctl: "tv", nz: 1, ...N, d: [["B6", 2.0, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [10, 40, 13, 8], ctl: "tv", nz: 1, seat: 16, ...N, d: [["B6", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu (đầu thang)", r: [10, 48, 13, 4], ctl: "tv", nz: 1, steps: 4, ...N, d: [["B1m", 2.4, "o"], ["B1k", 3, "o"]] },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (sảnh đọc)", r: [23, 40, 5, 12], ctl: "tv", nz: 1, ...N, d: [["B2", 1.2, "p"], ["B1k", 2.4, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Đông Bắc, xa học nhóm, thiếu nhi)", r: [28, 40, 13, 12], ctl: "tv", nz: 0, seat: 40, ...N, d: [["B1e", 1.2, "p"]] },
      // dải giữa: lõi sách, kệ mở ngay trên kho đóng, vệ sinh chồng lên vệ sinh tầng 1
      { id: "E1", c: "E1", n: "Văn phòng (ngay trên nghiệp vụ)", r: [6, 52, 4, 20], ctl: "nv", nz: 0, ...N, d: [["CS", 1.0, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, 52, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B6", 1.4, "thang"], ["SST", 1.2, "o"]] },
      { id: "SST", c: "circ", n: "Sảnh xe sách", r: [10, 59, 4, 5], ctl: "tv", nz: 1, d: [["B1k", 1.6, "o"], ["CO4", 1.6, "o"]] },
      { id: "B1k", c: "B1", n: "Kệ mở (ngay trên kho đóng)", r: [14, 52, 14, 12], ctl: "tv", nz: 1, ...N, d: [["WCL2", 1.0, "p"], ["B1q", 2.4, "o"]] },
      { id: "B1q", c: "B1", n: "Đọc tài liệu địa phương", r: [28, 52, 5, 8], ctl: "tv", nz: 0, ...N, d: [["B1e", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [28, 60, 5, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "B1e", c: "B1", n: "Đọc mở góc Đông", r: [33, 52, 8, 6.25], ctl: "tv", nz: 1, ...N, d: [["SSE", 1.6, "o"]] },
      { id: "SSE", c: "circ", n: "Sảnh thang Đông", r: [33, 58.25, 4, 5.75], ctl: "tv", nz: 1, d: [["CS2", 1.2, "thang"], ["B1s", 2.4, "o"]] },
      { id: "CS2", n: "Thang bộ Đông (thoát nạn thư viện)", r: [37, 58.25, 4, 5.75], ctl: "tv", nz: 1, core: { st: "u", link: "CS2" } },
      // dải Nam: cụm học nhóm có hành lang riêng, hai đầu là kho đệm, nằm trên thiếu nhi (ồn chồng ồn)
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [10, 64, 20, 1.4], ctl: "tv", nz: 2, d: [["B1c", 1.2, "o"], ["KD1", 0.8, "nv"], ["WCL2", 1.0, "p", 0.9], ["B1s", 1.2, "o"]] },
      { id: "B1c", c: "B1", n: "Bàn đọc cá nhân", r: [10, 65.4, 4, 6.6], ctl: "tv", nz: 1, ...N },
      { id: "KD1", c: "circ", n: "Kho đệm cách âm", r: [14, 65.4, 1, 6.6], ctl: "tv", nz: 1 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [15 + 3.5 * i, 65.4, 3.5, 6.6], ctl: "tv", nz: 2, ...N, d: [["CO4", 0.9, "p"]] })),
      { id: "KD2", c: "circ", n: "Kho đệm cách âm", r: [29, 65.4, 1, 6.6], ctl: "tv", nz: 1, d: [["B1s", 0.8, "nv"]] },
      { id: "B1s", c: "B1", n: "Đọc mở nhìn sông", r: [30, 64, 11, 8], ctl: "tv", nz: 1, ...N }
    ],
    staff: [
      { x: 36, y: 55, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 8, y: 62, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotA5", code: "A.5", name: "Khe chéo xuyên nhà gọn", from: "A",
    EV, LK, PT, LB, KHE, GARDEN,
    yN: x => 40 + (x - 26) * 2 / 3, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 24, 28, 33, 41], y: [14, 22, 30, 40, 48, 52, 64, 72] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 60], [5.2, 60]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43.5, 96], [43.5, 46], [36, 45.5]]],
        event: [[[44, 6], [43.5, 35], [36, 35], [34, 44]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe theo vỉa hè Bạch Đằng, rẽ vào khe chéo", event: "Khách sự kiện: từ quảng trường, Bạch Đằng vào sân gió, qua khe vào sảnh đón tiếp" },
      hatch: [KHE, GARDEN],
      labels: [[36, 43, "Khe chéo (hiên vào)"], [30, 35, "Sân gió"], [30, 76, "Vườn thiếu nhi"], [22, 22, "Thanh sự kiện"]]
    }
  };
  plan.intro = `<p class="lede">Giữ khe chéo của A (cùng độ dốc 2/3, mở về phía sông và gió Đông Nam) nhưng gom cả thư viện vào một khối gọn 35 × 32 m. Khe cắt góc Đông Bắc tầng 1 thành hiên vào có mái, sàn đọc tầng 2 phủ lên trên. Cửa vào duy nhất nằm trong khe, vào sảnh đón tiếp; bên trái là quầy giữ đồ, mượn trả có cổng từ dẫn vào thư viện, phía trước là hành lang kính qua sân gió sang thanh sự kiện một tầng. Kho, nghiệp vụ, tiếp nhận sách gom quanh một lõi sách duy nhất (thang bộ, thang máy, tời sách) ngay sau quầy; tầng 2 là một sàn đọc dưới mái răng cưa đón sáng Bắc, kệ mở đặt thẳng trên kho đóng.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: cửa vào duy nhất trong khe chéo → sảnh vào → đón tiếp. Từ đón tiếp: rẽ trái qua quầy giữ đồ, mượn trả (cổng từ) vào thư viện; đi thẳng qua hành lang kính sang thanh sự kiện. Phòng đa năng, chuyên đề, cà phê chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: lõi sách (thang bộ, thang máy, tời sách) mở vào sảnh thư viện, tức là chỉ tới được sau đón tiếp và quầy giữ đồ. Thang Đông chỉ mở vào khu thiếu nhi (đã qua cổng từ) và cửa thoát hiểm có chuông. Thanh sự kiện một tầng nên không có thang nào đưa khách sự kiện lên khu đọc. Nhân viên lên văn phòng bằng cùng lõi sách qua cửa thẻ từ ở sảnh nghiệp vụ.",
    "Đường sách ngắn: xe giao sách đỗ ở lối Tây → cửa cuốn tiếp nhận → xử lý (liền vách) → sảnh nghiệp vụ → kho đóng (liền vách). Lõi sách nằm giữa ba phòng này; tời sách đưa sách thẳng lên kệ mở tầng 2 đặt ngay trên kho đóng. Sách trả ở quầy đi qua hành lang nhân viên (cửa thẻ từ) về tiếp nhận, xử lý, không đi qua khu công cộng.",
    "Vệ sinh: một cụm sảnh mở ngoài giờ ngay cạnh đón tiếp, một cụm khu sự kiện cạnh sảnh sự kiện, một cụm thư viện có chỗ thay tã cửa mở thẳng vào phòng thiếu nhi, và cụm tầng 2 xếp chồng đúng trên cụm thư viện tầng 1.",
    "Ánh sáng Bắc – Nam: tầng 1 chỉ đặt phòng có người dọc mặt Bắc (bảo vệ, quầy, đón tiếp) và mặt Nam (xử lý, nhân viên, thiếu nhi), sâu 8 m; dải giữa là lõi, kho, vệ sinh, kỹ thuật. Tầng 2 lấy sáng bằng mái răng cưa kính quay Bắc, sáng dịu đều cả sàn. Thanh sự kiện sâu 16 m, sáng hai mặt. Đầu hồi Đông, Tây đặc.",
    "Không che sáng: sân gió rộng 10 m; từ cửa sổ thanh sự kiện nhìn sang đỉnh răng cưa +11,05 góc che 43°; thanh sự kiện một tầng +6,45 nên dải Bắc khối thư viện chỉ bị che 26°.",
    "Ngoài giờ: đón tiếp, sảnh vào, vệ sinh sảnh, hành lang kính và cả thanh sự kiện chạy riêng. Chỉ khóa cửa từ đón tiếp vào quầy giữ đồ; cửa này không nằm trên đường thoát nạn nào.",
    "Yên tĩnh: đọc yên tĩnh ở góc Đông Bắc tầng 2, nằm trên sảnh vào chứ không trên phòng ồn, cách cụm học nhóm 12 m. Học nhóm gom ở mép Nam tầng 2, có hành lang riêng, hai đầu là kho đệm, nằm chồng lên phòng thiếu nhi (ồn chồng lên ồn). Phòng kỹ thuật ở góc Đông tầng 1.",
    "Sửa ngày 05/11 (tiếng ồn): đọc yên tĩnh chuyển từ mép Nam (nằm trên phòng thiếu nhi) lên góc Đông Bắc tầng 2; học nhóm chuyển từ mép Bắc (sát vách tra cứu số, sảnh đọc) xuống mép Nam, có hành lang và hai kho đệm 1 m, không chung vách phòng đọc nào; phòng nhân viên chuyển sang góc Tây Nam tầng 1, không sát vách thiếu nhi, không nằm dưới học nhóm (xử lý nghiệp vụ dời sang chỗ cũ, vẫn liền sảnh nghiệp vụ và kho đóng).",
    "Kết cấu: lưới cột 4–10 m; kệ mở tầng 2 đặt thẳng trên kho đóng tầng 1 để tải nặng đi thẳng xuống móng. Sàn tầng 2 phủ khe chéo, đỡ bằng hàng cột thép mảnh trong khe. Phòng đa năng 11,25 × 16 m dầm ứng lực trước."
  ];
  /* ---------- khối 3D ---------- */
  const { B, PO, SH, col } = G.K;
  const coreBox = (id, c) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, Z2 + RISE + 1.6, c, "X", { top: c, lv: 0 }); };
  const teeth = (x, y0, w, n, d) => {
    const o = [];
    for (let k = 0; k < n; k++) {
      const y = y0 + k * d;
      o.push(SH(x, y, w, d, Z2, Z2, Z2 + RISE, "-y", "sheet", "X", { top: "grass" }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, Z2, Z2 + RISE - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotA5", fam: "chot", code: "A.5", from: "A", name: "Khe chéo xuyên nhà gọn", rule: "Một khối gọn, khe chéo cắt góc làm hiên vào",
    tag: "Khe chéo của A cắt góc tầng 1 thành hiên vào dưới sàn đọc; kho, nghiệp vụ, lõi sách gom một chỗ sau quầy",
    story: "Đi dọc Bạch Đằng, khe chéo mở ra như một vết cắt trên khối nhà, đúng hướng gió Đông Nam. Bước vào khe là tới sảnh đón tiếp; trên đầu là sàn đọc tầng 2 phủ qua khe. Thanh sự kiện thấp nằm riêng bên kia sân gió, nối bằng một hành lang kính.",
    why: [["Quy luật hình khối", "Một khối chữ nhật bị khe chéo cắt góc, cộng một thanh thấp song song. Mái răng cưa đều đặn làm nền cho vết cắt chéo."], ["Khối chính – khối phụ", "Khối thư viện hai tầng mái răng cưa là khối chính; thanh sự kiện một tầng và hành lang kính là khối phụ."], ["Nắng và chói", "Tầng 1 lấy sáng Bắc – Nam sâu 8 m; tầng 2 sáng mái quay Bắc, không nắng trực tiếp lên bàn đọc và màn hình."], ["Gió và mưa", "Khe chéo mở về phía sông đón gió Đông Nam, có mái là sàn tầng 2 nên che mưa cho lối vào."], ["Công năng", "Một cửa vào, đón tiếp là bản lề; kho, nghiệp vụ, quầy, lõi sách ở cùng một góc nên đường sách ngắn."]],
    kc: { he: "Khung bê tông, lưới cột 4–10 m; dầm sàn tầng 2 đỡ mái răng cưa thép nhịp 4 m. Kệ mở tầng 2 đặt trên kho đóng tầng 1. Sàn tầng 2 phủ khe chéo đỡ bằng cột thép trong khe.", nhip: "11,25 m (phòng đa năng), 10 m (kho đóng)", cx: "Cột thép mảnh trong khe chéo" },
    qa: [["Tầng 2 sâu 32 m có tối không?", "Không: mái răng cưa kính quay Bắc cách nhau 4 m, sáng mái phủ đều cả sàn, không có nắng trực tiếp."], ["Thủ thư lấy sách ở kho có xa không?", "Không: kho đóng nằm ngay dưới kệ mở tầng 2, cạnh lõi sách; từ kho tới kệ xa nhất khoảng 40 m kể cả đi thang máy."]],
    cut: "Khối thư viện foam trắng, cắt góc chéo 15 × 10 m ở tầng 1, tầng 2 phủ trọn; mái răng cưa bằng giấy cứng gấp, mặt kính quay Bắc bằng mica. Thanh sự kiện foam vàng đất mái cỏ. Lõi thang foam tím, cam cao hơn mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 56, Z2 + RISE + 0.3, "Khối chính · Thư viện mái răng cưa", 1], [22, 22, ZE + 0.3, "Khối phụ · Thanh sự kiện", 2], [36, 43, 2.5, "Khe chéo · cửa vào", 2], [22.5, 35, 4.8, "Hành lang kính", 2], [30, 76, 0.6, "Vườn thiếu nhi", 2]],
    build() {
      const v = [
        coreBox("CS", "violet"), coreBox("CS2", "warn"),
        B(6, 40, 35, 32, 4.95, Z2, "sheet", "B", { fl: 1, role: "m" }),
        ...teeth(6, 40, 35, 8, TOOTH),
        PO(PT, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(6, 14, 35, 16, 0.45, ZE, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(21, 30, 3, 10, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(20, 79, 21, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const [x, y] of [[30, 40], [34, 40], [38, 40], [41, 40], [41, 45], [34, 44], [38, 46]]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 10, 14, 24, 28, 33, 41]) for (const y of [52, 64, 72]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 9, 20.25, 26.25, 36.75, 41]) for (const y of [14, 30]) st.push(col(x, y, 0.45, ZE));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
