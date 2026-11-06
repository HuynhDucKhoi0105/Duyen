/* ================= Ý tưởng S.11: Chữ U mở ra sông (khối chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba hộp chữ nhật quây một sân mở về phía sông (Đông): thanh Bắc một tầng (công cộng, sự kiện),
  // thanh Tây một tầng (đón tiếp, quầy mượn trả: bản lề của chữ U), thanh Nam hai tầng (thư viện, khối chính)
  const NB = [[6, 12], [41.5, 12], [41.5, 30], [6, 30]];   // thanh Bắc, một tầng, lấy sáng mái
  const WB = [[6, 30], [16, 30], [16, 41], [6, 41]];       // thanh Tây, một tầng: đón tiếp + quầy
  const SB = [[6, 41], [41.5, 41], [41.5, 69], [6, 69]];   // thanh Nam, hai tầng: thư viện
  const COURT = [[16, 30], [41.5, 30], [41.5, 41], [16, 41]];
  const GARDEN = [[16, 69], [41.5, 69], [41.5, 86], [16, 86]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NB, WB, SB],
    rooms: [
      // thanh Bắc một tầng: mọi phòng lấy sáng cửa mái hướng Bắc, cộng cửa sổ mặt Bắc nhìn quảng trường
      { id: "KCF", c: "circ", n: "Kho, chuẩn bị cà phê", r: [6, 12, 3, 5], ctl: "sk", nz: 1, d: [["N", 1.0, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 17, 3, 5], ctl: "nv", nz: 1, top: N, d: [["FOY", 0.9, "nv"], ["W", 0.9, "nv"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [9, 12, 7, 10], ctl: "sk", nz: 3, seat: 32, top: N, d: [["FOY", 2.4, "o"], ["N", 1.2, "tn"], ["KCF", 0.9, "p"]] },
      { id: "FOY", c: "circ", n: "Sảnh chia luồng (sang sự kiện)", r: [6, 22, 10, 8], ctl: "sk", nz: 2, occ: 40, d: [["COR", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [16, 12, 6, 15], ctl: "sk", nz: 2, occ: 30, top: N, d: [["COR", 2.4, "o"], ["N", 1.2, "tn"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [22, 12, 5, 15], ctl: "sk", nz: 2, seat: 24, top: N, d: [["COR", 1.4, "p"], ["N", 1.2, "tn"]] },
      { id: "COR", c: "circ", n: "Hành lang sự kiện (nhìn sân)", r: [16, 27, 11, 3], ctl: "sk", nz: 2, d: [["FOY2", 2.4, "o"], ["S", 1.2, "tn"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [27, 12, 4.5, 5.6], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [27, 17.6, 4.5, 4.4], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [27, 22, 4.5, 5], ctl: "sk", nz: 1, wc: KT, d: [["FOY2", 1.0, "p"]] },
      { id: "FOY2", c: "circ", n: "Sảnh chờ phòng đa năng", r: [27, 27, 4.5, 3], ctl: "sk", nz: 2, d: [["D1", 2.0, "p"], ["S", 1.2, "tn"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [31.5, 12, 10, 18], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.5], ["E", 1.6, "tn", 0.5], ["S", 1.8, "tn", 0.5]] },
      // thanh Tây một tầng (đáy chữ U): sảnh đón tiếp nhìn ra sân và sông, quầy gửi đồ, mượn trả ngay sau sảnh
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 30, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["E", 2.4, "chinh", 0.5], ["FOY", 2.4, "o"], ["A4", 2.0, "k"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [6, 38, 10, 3], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["HL", 2.3, "o"]] },
      // thanh Nam tầng 1: dải Tây là kho, nghiệp vụ; dải Bắc nhìn sân là thiếu nhi; dải giữa kỹ thuật, vệ sinh, lõi sách; dải Nam văn phòng, đọc
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 41, 7.5, 16], ctl: "kho", nz: 1, d: [["A4", 1.0, "nv"], ["HL", 1.0, "nv"], ["C4", 1.2, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 57, 7.5, 4], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 61, 9, 8], ctl: "nv", nz: 1, d: [["E1", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Hành lang thư viện sau cổng từ", r: [13.5, 41, 2.5, 20], ctl: "tv", nz: 1, d: [["B3", 1.8, "p", 0.4], ["CS", 1.4, "thang"], ["LC", 2.3, "o"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (nhìn sân)", r: [16, 41, 22.5, 8], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6], ["WCB", 1.0, "p"], ["KDT", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.5, 41, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["E", 1.2, "tnbd"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [16, 49, 4, 9.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [20, 49, 3.5, 4], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "WCL", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [20, 53, 3.5, 5.5], ctl: "tv", nz: 1, wc: KT, d: [["LC", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [23.5, 49, 5.8, 9.5], ctl: "kt", nz: 3, d: [["LC", 1.4, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [29.3, 49, 4.2, 9.5], ctl: "kho", nz: 1, d: [["LC", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [33.5, 49, 2.1, 9.5], ctl: "nv", nz: 1, d: [["LC", 0.9, "nv"]] },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, giá sách lưu động", r: [35.6, 49, 5.9, 9.5], ctl: "tv", nz: 1, d: [["LC", 1.0, "p"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện tầng 1", r: [16, 58.5, 25.5, 2.5], ctl: "tv", nz: 1, d: [["E", 1.4, "tnbd"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [15, 61, 10, 8], ctl: "nv", nz: 0, d: [["E2", 0.9, "nv"], ["S", 1.0, "nv"], ["LC", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [25, 61, 5, 8], ctl: "nv", nz: 1, d: [["LC", 0.9, "nv"]] },
      { id: "B1s", c: "B1", n: "Đọc mở, sách mới (nhìn vườn)", r: [30, 61, 11.5, 8], ctl: "tv", nz: 1, d: [["LC", 2.4, "o"], ["S", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 11, y: 34, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 11, y: 39.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.5, y: 19.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 12.5, y: 15, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 27, y: 45, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10.5, y: 65, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9.5, y: 59, t: "Nhận sách", sc: ["4"] },
      { x: 20, y: 65, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 11, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 29, y: 14.8, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: chỉ thanh Nam (thư viện), toàn bộ lấy sáng mái răng cưa quay Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [SB],
    rooms: [
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (dải Bắc, nhìn sân)", r: [6, 41, 32.5, 8], ctl: "tv", nz: 1, top: N, d: [["B6", 2.4, "o"], ["B1c", 2.4, "o"], ["H2a", 2.4, "o"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.5, 41, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1a", 1.2, "thang"], ["B1c", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 49, 10, 5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B2", 1.2, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Tây Nam)", r: [6, 54, 10, 15], ctl: "tv", nz: 0, seat: 40, top: N },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [16, 49, 4, 9.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1a", 1.4, "thang"], ["B2", 1.2, "thang"], ["B5", 1.2, "thang"]] },
      { id: "H2a", c: "circ", n: "Sảnh vệ sinh tầng 2", r: [20, 49, 3.5, 4], ctl: "tv", nz: 1, d: [["WC2", 1.0, "p"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [20, 53, 3.5, 5.5], ctl: "tv", nz: 1, wc: KT },
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (dải giữa)", r: [23.5, 49, 18, 9.5], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"], ["CO4", 2.4, "o", 0.7], ["CO4", 1.6, "o", 0.15]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [16, 58.5, 9.5, 10.5], ctl: "tv", nz: 1, seat: 16, top: N, d: [["H2", 1.6, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh đệm tầng 2", r: [25.5, 58.5, 4.5, 10.5], ctl: "tv", nz: 1, d: [["CO4", 2.0, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [30, 58.5, 11.5, 2.5], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [30 + 2.875 * i, 61, 2.875, 8], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [
      { x: 11, y: 51.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS11", code: "S.11", name: "Chữ U mở ra sông", from: "khối vuông",
    NB, WB, SB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 13.5, 16, 20, 23.5, 29.3, 31.5, 35.6, 41.5], y: [12, 22, 30, 41, 49, 58.5, 61, 69] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 35, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 59], [5.2, 59]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 35.5], [16.6, 34]]],
        event: [[[20, -9], [26, 6], [44, 8], [44, 35.5], [16.6, 34]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân chữ U tới sảnh đón tiếp ở đáy chữ U", event: "Khách sự kiện: từ quảng trường Bắc men bờ sông vào sân chữ U tới sảnh đón tiếp" },
      hatch: [COURT, GARDEN],
      labels: [[30, 35.5, "Sân chữ U mở ra sông"], [29, 79, "Vườn đọc phía Nam"], [20, 20, "Thanh Bắc một tầng"], [11, 33, "Đáy chữ U"], [30, 64, "Thanh Nam hai tầng"]]
    }
  };
  plan.intro = `<p class="lede">Ba hộp chữ nhật quây thành chữ U, miệng chữ U mở về phía sông. <b>Thanh Bắc</b> một tầng là khu công cộng: cà phê, trưng bày, chuyên đề, phòng đa năng. <b>Đáy chữ U</b> (thanh Tây) một tầng là sảnh đón tiếp và quầy gửi đồ, mượn trả: đứng ở sảnh nhìn thẳng qua sân ra sông. <b>Thanh Nam</b> hai tầng, dài 35,5 m, là thư viện và là khối chính. Mặt Tây của chữ U là tường đặc chắn nắng chiều; hai thanh có người ở đều quay mặt Bắc, Nam. Mọi người vào nhà qua một cửa ở sảnh đón tiếp; muốn vào phòng đọc nào, kể cả phòng thiếu nhi, đều phải qua quầy có cổng từ ngay sau sảnh.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: cửa vào duy nhất mở từ sân chữ U vào sảnh đón tiếp ở đáy chữ U. Rẽ trái lên thanh Bắc là sảnh chia luồng sang cà phê, trưng bày, chuyên đề, phòng đa năng; đi thẳng qua quầy gửi đồ, mượn trả có cổng từ (sảnh → quầy khoảng 4 m) mới vào hành lang thư viện. Phòng thiếu nhi ở ngay đầu hành lang, nhìn ra sân; mọi phòng đọc tầng 1, tầng 2 đều nằm sau quầy. Phòng đa năng, chuyên đề, trưng bày chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: hai thang lên khu đọc (lõi sách cạnh hành lang thư viện, thang Đông ở đầu thanh Nam) chỉ tới được sau quầy có cổng từ. Ở tầng 1, thang Đông chỉ có cửa thoát hiểm có chuông ra sân; lõi sách chỉ mở vào hành lang thư viện. Thanh Bắc, đáy chữ U một tầng nên không có thang nào khác.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) và kho đóng (liền vách). Kho đóng chạy dọc mặt Tây, mở ra hành lang thư viện, cạnh lõi sách có tời đưa sách lên tầng 2. Sách trả: thủ thư mang từ quầy qua cửa nhân viên vào kho đóng, rồi về xử lý, không đi qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ở sảnh chờ phòng đa năng, cách sảnh đón tiếp khoảng 23 m; khu đọc mỗi tầng có một cụm cạnh lõi sách, xếp chồng thẳng hàng; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: thanh Bắc và đáy chữ U chỉ một tầng, mọi phòng lấy sáng cửa mái hướng Bắc. Thanh Nam tầng 1 chia ba dải: dải Bắc (thiếu nhi, nhìn sân) và dải Nam (văn phòng, nghiệp vụ, đọc, nhìn vườn) sâu 8 m; dải giữa chỉ có kho, lõi thang, vệ sinh, kỹ thuật. Tầng 2 là tầng trên cùng nên toàn bộ sàn đọc lấy sáng mái răng cưa kính quay Bắc. Đầu Đông, đầu Tây các thanh là tường đặc.",
    "Không che sáng nhau: sân chữ U sâu 11 m, thanh Bắc chỉ cao +5,45 nên phòng thiếu nhi nhìn qua sân bị che khoảng 19°; thanh Bắc lấy sáng mái nên không bị thanh Nam che.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề nằm riêng ở thanh Bắc, cách khu đọc cả sân 11 m. Đọc yên tĩnh ở góc Tây Nam tầng 2, cách học nhóm (góc Đông Nam) 14 m, giữa là tra cứu số và sảnh đệm. Văn phòng, phòng nhân viên ở dải Nam, không chung vách phòng thiếu nhi hay phòng kỹ thuật; phía trên là tra cứu số, không phải học nhóm.",
    "Ngoài giờ: thanh Bắc và sảnh đón tiếp chạy riêng (cà phê, trưng bày, chuyên đề, phòng đa năng, vệ sinh công cộng). Chỉ khóa một cửa giữa sảnh đón tiếp và quầy mượn trả, không nằm trên đường thoát nạn.",
    "Kết cấu: ba hộp khung bê tông lưới khoảng 8 m, không đua; phòng đa năng 10 × 18 m dùng dầm bê tông ứng lực trước; kho đóng ở tầng 1 nên tải nặng xuống thẳng móng."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const zR = 9.45;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS11", fam: "chot", code: "S.11", from: "khối vuông", name: "Chữ U mở ra sông", rule: "Ba hộp chữ nhật quây chữ U, miệng mở về sông",
    tag: "Thanh Bắc một tầng (công cộng), đáy chữ U một tầng (đón tiếp, quầy), thanh Nam hai tầng (thư viện); sân giữa mở về sông",
    story: "Ba hộp đơn giản quây một cái sân mở về phía sông. Người đến đi vào sân, gặp ngay sảnh đón tiếp ở đáy chữ U; quay trái là khu công cộng, đi thẳng qua quầy là thư viện. Thanh thư viện cao hai tầng ôm lấy sân từ phía Nam, thanh công cộng thấp một tầng nên không che nắng.",
    why: [["Quy luật hình khối", "Ba hộp chữ nhật nối nhau thành chữ U, hai thấp một cao; không có phần đua, không chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Thanh Nam hai tầng chiếm khoảng 70% sàn; thanh Bắc và đáy chữ U thấp một tầng."], ["Nắng và chói", "Phòng có người chỉ lấy sáng mặt Bắc, mặt Nam và cửa mái hướng Bắc; mặt Tây (nắng chiều) là tường đặc, mặt Đông chỉ có cửa vào."], ["Gió và mưa", "Sân chữ U mở về sông đón gió Đông Nam mát; sảnh đón tiếp có mái đua che mưa trước cửa."], ["Công năng", "Một cửa vào, sảnh đón tiếp nằm ở đáy chữ U làm bản lề giữa khu công cộng và thư viện; kho, xử lý, lõi sách nằm cùng một góc Tây."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; thanh Bắc, đáy chữ U mái bê tông phẳng phủ cỏ có dải cửa mái; thanh Nam mái dải kính quay Bắc; phòng đa năng dầm ứng lực trước nhịp 10 m.", nhip: "10 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Đáy chữ U quay mặt Đông, có bị nắng sáng?", "Sảnh đón tiếp lấy sáng cửa mái hướng Bắc; mặt Đông chỉ có cửa vào lùi sâu dưới mái đua, nhìn qua sân 25 m mới tới sông."], ["Phòng thiếu nhi có lối riêng ra sân?", "Không: cửa ra sân là cửa thoát hiểm có chuông; trẻ và phụ huynh vào qua sảnh đón tiếp và quầy mượn trả như mọi người đọc."]],
    cut: "Thanh Bắc foam vàng thấp có dải cửa mái; đáy chữ U mica trong; thanh Nam foam trắng cao gấp đôi; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 55, 11.5, "Khối chính · Thanh Nam hai tầng", 1], [24, 20, 6.2, "Thanh Bắc một tầng", 2], [11, 35, 6.2, "Đáy chữ U · đón tiếp", 2], [18, 53, 12, "Lõi sách", 1]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05),
        B(6, 41, 35.5, 28, 0.45, zR, "stone", "B", { fl: 2, role: "m" }),
        B(6, 12, 35.5, 18, 0.45, 5.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(6, 30, 10, 11, 0.45, 5.45, "glass", "A", { fl: 1, top: "grass", role: "p" }),
        // dải cửa mái hướng Bắc trên thanh Bắc, đáy chữ U, thanh Nam
        ...[15, 21, 26].map(y => B(7, y, 33.5, 0.5, 5.45, 5.95, "glass", "X", { op: 0.75 })),
        B(7, 34, 8, 0.5, 5.45, 5.95, "glass", "X", { op: 0.75 }),
        ...[44, 50, 56, 62].map(y => B(7, y, 33.5, 0.5, zR, zR + 0.6, "glass", "X", { op: 0.75 })),
        // tường thấp vườn phía Nam
        B(16, 69, 0.3, 17, 0, 1.2, "stone", "X", { role: "p" }), B(41.2, 69, 0.3, 17, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 13.5, 20, 28, 35, 41.5]) for (const y of [41, 49, 58.5, 69]) st.push(col(x, y, 0.45, zR));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
