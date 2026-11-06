/* ================= Ý tưởng S.13: Răng lược (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // một hộp công cộng một tầng ở đầu Bắc, một sống lưng hai tầng dọc mặt Tây (hành lang, thang, kho, kỹ thuật)
  // và ba thanh mỏng 8,5 m chìa về phía sông như răng lược; giữa các thanh là sân vườn rộng 8 m.
  // Tầng 2 của mỗi thanh ngắn hơn tầng 1, đầu thanh phía sông chỉ cao một tầng.
  const BN = [[6, 12], [41.5, 12], [41.5, 35], [6, 35]];          // hộp công cộng một tầng, lấy sáng mái
  const SP = [[6, 35], [16, 35], [16, 83.8], [6, 83.8]];           // sống lưng hai tầng
  const R2a = [[16, 41], [41.5, 41], [41.5, 49.5], [16, 49.5]], R2b = [[16, 41], [35, 41], [35, 49.5], [16, 49.5]];
  const R3a = [[16, 57.5], [39.8, 57.5], [39.8, 66], [16, 66]], R3b = [[16, 57.5], [31, 57.5], [31, 66], [16, 66]];
  const R4a = [[16, 74], [41.5, 74], [41.5, 82.5], [16, 82.5]], R4b = [[16, 74], [34.8, 74], [34.8, 82.5], [16, 82.5]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  // ba thang thẳng hàng hai tầng, mỗi thang ở chân một răng: lõi sách (Bắc), thang giữa, thang Nam
  const CS = { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6, 39, 7.6, 5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } };
  const ST2 = { id: "ST2", n: "Thang bộ giữa", r: [6, 59.8, 7.6, 4.5], ctl: "tv", nz: 1, core: { st: "u", link: "ST2" } };
  const ST3 = { id: "ST3", n: "Thang bộ Nam", r: [6, 74, 7.6, 4.5], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" } };
  const SPC = { id: "SPC", c: "circ", n: "Hành lang sống lưng", r: [13.6, 35, 2.4, 48.8], ctl: "tv", nz: 1 };

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [BN, SP, R2a, R3a, R4a],
    rooms: [
      // hộp công cộng một tầng: mọi phòng lấy sáng cửa mái hướng Bắc, dãy đầu có thêm cửa sổ Bắc ra quảng trường
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 12, 2, 7.5], ctl: "nv", nz: 1, top: N, d: [["N", 0.9, "nv"], ["A1", 0.9, "nv"]] },
      { id: "E6a", c: "E6", n: "Kho dụng cụ sảnh", r: [6, 19.5, 2, 2.5], ctl: "nv", nz: 1, d: [["A1", 0.9, "nv"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [8, 12, 8, 10], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["N", 2.4, "chinh", 0.5], ["FOY", 3.0, "o"], ["A4", 2.0, "k"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [6, 22, 10, 3], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["HL", 2.0, "o"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 25, 7.6, 10], ctl: "nv", nz: 1, top: N, d: [["A4", 1.0, "nv"], ["C4", 1.2, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [13.6, 25, 2.4, 10], ctl: "tv", nz: 1 },
      { id: "FOY", c: "circ", n: "Sảnh chia luồng", r: [16, 12, 3.5, 11], ctl: "sk", nz: 2, occ: 40, d: [["N", 1.6, "tn"], ["CORN", 2.3, "o"], ["WCP", 1.0, "p"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [19.5, 12, 2.5, 8.5], ctl: "sk", nz: 1, wc: KT },
      { id: "A2", c: "A2", n: "Trưng bày", r: [22, 12, 10.6, 8.5], ctl: "sk", nz: 2, occ: 30, top: N, d: [["CORN", 2.4, "o"], ["N", 1.2, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32.6, 12, 8.9, 8.5], ctl: "sk", nz: 3, seat: 32, top: N, d: [["CORN", 1.6, "p"], ["N", 1.2, "tn", 0.5]] },
      { id: "CORN", c: "circ", n: "Hành lang sự kiện", r: [19.5, 20.5, 22, 2.5], ctl: "sk", nz: 2, d: [["E", 1.6, "tn"], ["D4", 1.4, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [16, 23, 6.25, 12], ctl: "sk", nz: 2, seat: 24, top: N },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [22.25, 23, 15.5, 12], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["CORN", 1.8, "p", 0.25], ["CORN", 1.8, "p", 0.75], ["S", 1.8, "tn", 0.5], ["D2", 2.4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [37.75, 23, 3.75, 6.7], ctl: "sk", nz: 3, d: [["E", 1.2, "tn", 0.5]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [37.75, 29.7, 3.75, 5.3], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      // sống lưng: phòng không cần cửa sổ dọc mặt Tây đặc, hành lang dọc mặt trong
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 35, 7.6, 4], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85], ["CS", 1.2, "nv"]] },
      { ...CS, d: [["SPC", 1.4, "thang"], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 44, 7.6, 15.8], ctl: "kho", nz: 1, d: [["SPC", 1.2, "nv", 0.5]] },
      { ...ST2, d: [["W", 1.2, "tnbd"], ["SPC", 1.2, "thang"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [6, 64.3, 7.6, 2.5], ctl: "tv", nz: 1, wc: KT, d: [["SPC", 1.0, "p", 0.9]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 66.8, 7.6, 7.2], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["SPC", 0.9, "nv"]] },
      { ...ST3, d: [["W", 1.2, "tnbd"], ["SPC", 1.2, "thang"]] },
      { id: "E6b", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 78.5, 7.6, 2], ctl: "nv", nz: 1, d: [["SPC", 0.9, "nv"]] },
      { id: "KX", c: "circ", n: "Kho xe đẩy, xe sách", r: [6, 80.5, 7.6, 3.3], ctl: "tv", nz: 1, d: [["SPC", 1.0, "p"]] },
      { ...SPC, d: [["HL", 2.0, "o"], ["E", 1.4, "tnbd", 0.4], ["S", 1.2, "tnbd"]] },
      // răng Bắc: đọc mở, sách mới
      { id: "B1d", c: "B1", n: "Đọc mở và kệ (răng Bắc)", r: [16, 41, 25.5, 8.5], ctl: "tv", nz: 1, d: [["SPC", 2.4, "o", 0.2], ["E", 1.2, "tnbd"]] },
      // răng giữa: thiếu nhi, mở ra vườn thiếu nhi giữa răng giữa và răng Nam
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [16, 57.5, 21.2, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["SPC", 1.8, "p", 0.2], ["S", 1.8, "tnbd", 0.5], ["WCB", 1.0, "p"], ["KDT", 0.9, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [37.2, 57.5, 2.6, 6], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã" },
      { id: "KDT", c: "circ", n: "Kho đồ chơi", r: [37.2, 63.5, 2.6, 2.5], ctl: "tv", nz: 1 },
      // răng Nam: đọc mở lớn
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (răng Nam)", r: [16, 74, 25.5, 8.5], ctl: "tv", nz: 1, d: [["SPC", 2.4, "o", 0.3], ["E", 1.2, "tnbd"]] }
    ],
    staff: [
      { x: 12, y: 16, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 11, y: 23.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7, y: 15, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 37, y: 15, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 9.8, y: 29, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9.8, y: 37, t: "Nhận sách", sc: ["4"] },
      { x: 30, y: 61.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 17.7, y: 17, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 39.6, y: 26, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: sống lưng và ba răng ngắn hơn (đầu phía sông chỉ một tầng) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [SP, R2b, R3b, R4b],
    rooms: [
      // sống lưng tầng 2 là tầng trên cùng: văn phòng, phòng nhân viên, chỗ đọc lấy sáng mái kính hướng Bắc
      { id: "B1s", c: "B1", n: "Bàn đọc cá nhân", r: [6, 35, 7.6, 4], ctl: "tv", nz: 1, top: N, d: [["SPC", 1.6, "o"]] },
      { ...CS, d: [["SPC", 1.4, "thang"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 44, 7.6, 4.8], ctl: "kho", nz: 1, d: [["SPC", 1.2, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 48.8, 7.6, 11], ctl: "nv", nz: 0, top: N, d: [["SPC", 1.0, "nv"]] },
      { ...ST2, d: [["SPC", 1.2, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [6, 64.3, 7.6, 2.5], ctl: "tv", nz: 1, wc: KT, d: [["SPC", 1.0, "p"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 66.8, 7.6, 7.2], ctl: "tv", nz: 1, steps: 4, top: N, d: [["SPC", 2.0, "o"]] },
      { ...ST3, d: [["SPC", 1.2, "thang"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 78.5, 7.6, 5.3], ctl: "nv", nz: 1, top: N, d: [["SPC", 0.9, "nv"]] },
      { ...SPC, d: [["B1e", 2.4, "o"], ["CO4", 1.6, "o"], ["B2", 1.6, "p", 0.2]] },
      // răng Bắc: đọc mở và tra cứu số
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (răng Bắc)", r: [16, 41, 7, 8.5], ctl: "tv", nz: 1, top: N, d: [["B5", 2.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [23, 41, 12, 8.5], ctl: "tv", nz: 1, seat: 16, top: N },
      // răng giữa: học nhóm, ngay trên phòng thiếu nhi (hai phòng ồn chồng nhau)
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [16, 57.5, 15, 1.8], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [16 + 3.75 * i, 59.3, 3.75, 6.7], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] })),
      // răng Nam: đọc yên tĩnh, cách học nhóm cả sân vườn 8 m
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [16, 74, 18.8, 8.5], ctl: "tv", nz: 0, seat: 40, top: N }
    ],
    staff: [
      { x: 9.8, y: 54, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 28, y: 45, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS13", code: "S.13", name: "Răng lược", from: "khối vuông",
    BN, SP,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 13.6, 16, 22.25, 28.9, 35, 41.5], y: [12, 23, 35, 41, 49.5, 57.5, 66, 74, 82.5] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 53, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 36.6], [5.2, 36.6]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [44, 96], [44, 8], [12, 8], [12, 11.4]]],
        event: [[[20, -9], [12, 4], [12, 11.4]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe men bờ sông lên quảng trường, vào sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc vào thẳng sảnh đón tiếp" },
      hatch: [[[16, 49.5], [41.5, 49.5], [41.5, 57.5], [16, 57.5]], [[16, 66], [41.5, 66], [41.5, 74], [16, 74]], [[16, 82.5], [41.5, 82.5], [41.5, 89], [16, 89]]],
      labels: [[24, 6, "Quảng trường, cửa vào"], [29, 53.5, "Sân vườn 1"], [29, 70, "Vườn thiếu nhi"], [28, 86, "Vườn Nam"], [24, 17, "Hộp công cộng một tầng"], [10, 50, "Sống lưng"]]
    }
  };
  plan.intro = `<p class="lede">Thầy xác nhận không cần cầu kỳ, chỉ cần xếp các hộp đơn giản lên nhau. S.13 giống một chiếc lược: một hộp công cộng một tầng ở đầu Bắc nhìn ra quảng trường; một sống lưng hai tầng dọc mặt Tây (hành lang, thang, kho, kỹ thuật, vệ sinh); ba răng mỏng 8,5 m chìa về phía sông, giữa các răng là sân vườn rộng 8 m. Răng mỏng nên mọi phòng trong răng đều có cửa sổ cả mặt Bắc lẫn mặt Nam. Tầng 2 của mỗi răng ngắn hơn tầng 1, đầu răng phía sông chỉ cao một tầng, nên đường thoát nạn ở tầng 2 ngắn. Một cửa vào duy nhất từ quảng trường vào sảnh đón tiếp; muốn vào sống lưng (và mọi răng thư viện, kể cả phòng thiếu nhi) đều phải qua quầy gửi đồ, mượn trả có cổng từ ngay sau sảnh.</p>`;
  plan.notes = [
    "Đi qua khối A: cửa chính mặt Bắc vào sảnh đón tiếp. Rẽ phải qua sảnh chia luồng tới trưng bày, cà phê, hành lang sự kiện (phòng đa năng, chuyên đề, vệ sinh công cộng). Đi thẳng qua quầy gửi đồ, mượn trả có cổng từ (liền vách sảnh) vào sảnh thư viện rồi xuống hành lang sống lưng. Ba răng thư viện, kể cả phòng thiếu nhi ở răng giữa, chỉ mở ra hành lang sống lưng, tức là đều nằm sau quầy.",
    "Thang có hệ quả: ba thang đều nằm trong sống lưng, mỗi thang ở chân một răng (lõi sách ở răng Bắc, thang giữa, thang Nam), chỉ mở ra hành lang thư viện sau quầy và cửa thoát hiểm có chuông ra lối Tây. Hộp công cộng chỉ một tầng nên không có thang nào để khách sự kiện lên tầng 2 mà không qua quầy.",
    "Đường sách mới: xe giao sách vào lối Tây → cửa cuốn tiếp nhận ở đầu sống lưng → xử lý nghiệp vụ (liền vách, ngay phía Bắc) → qua sảnh lõi sách → kho đóng dọc sống lưng. Kho đóng liền vách lõi sách, tời sách đưa sách lên tầng 2; lưu trữ tài liệu địa phương ở tầng 2 ngay cạnh lõi sách. Sách trả: xử lý nghiệp vụ liền vách quầy mượn trả, có cửa nhân viên thông thẳng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ở sảnh chia luồng; khu đọc mỗi tầng có một cụm ở giữa sống lưng, xếp chồng thẳng hàng, cách chỗ đọc xa nhất không quá 35 m; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: hộp công cộng một tầng lấy sáng cửa mái hướng Bắc. Ba răng sâu 8,5 m, mỗi phòng có cửa sổ Bắc và Nam nhìn ra sân vườn. Sống lưng tầng 1 dọc mặt Tây chỉ có kho, thang, kỹ thuật, vệ sinh, không cần cửa sổ; sống lưng tầng 2 là tầng trên cùng, văn phòng, phòng nhân viên, chỗ đọc lấy sáng mái hướng Bắc. Mặt Tây và đầu Đông các răng là tường đặc.",
    "Không che sáng nhau: sân giữa hai răng hai tầng rộng 8 m, cửa sổ tầng 1 nhìn lên mép mái răng đối diện dưới 45°; sân giữa hộp công cộng một tầng và răng Bắc rộng 6 m là đủ vì hộp công cộng thấp. Đầu răng phía sông chỉ một tầng nên sân càng thoáng về phía sông.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở riêng hộp công cộng đầu Bắc, cách răng thư viện gần nhất cả sân 6 m. Học nhóm ở răng giữa tầng 2, nằm ngay trên phòng thiếu nhi (hai phòng ồn chồng nhau); đọc yên tĩnh ở răng Nam tầng 2, cách học nhóm cả sân vườn 8 m; văn phòng, phòng nhân viên ở sống lưng tầng 2, không sát vách phòng ồn.",
    "Ngoài giờ: hộp công cộng chạy riêng (sảnh, trưng bày, cà phê, sự kiện, vệ sinh công cộng); chỉ khóa một cửa từ sảnh vào quầy mượn trả.",
    "Kết cấu: khung bê tông; mỗi răng một nhịp 8,5 m, không cột giữa phòng; sống lưng lưới 7,6 + 2,4 m; phòng đa năng 15,5 × 12 m dùng dầm ứng lực trước; không có phần đua."
  ];

  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (r, c, top) => B(r[0], r[1], r[2], r[3], 0.45, top, c, "X", { top: c, lv: 0 });
  plan.idea = {
    id: "chotS13", fam: "chot", code: "S.13", from: "khối vuông", name: "Răng lược", rule: "Sống lưng dọc mặt Tây, ba thanh mỏng chìa về phía sông",
    tag: "Hộp công cộng một tầng ở đầu Bắc, sống lưng hai tầng dọc mặt Tây, ba răng mỏng 8,5 m chìa về phía sông, xen sân vườn 8 m",
    story: "Một chiếc lược nằm ngang khu đất: sống lưng dọc con đường phía Tây giữ mọi thứ nặng (kho, thang, kỹ thuật), ba răng mỏng chìa về phía sông là chỗ đọc, giữa các răng là vườn. Đầu lược phía Bắc là hộp công cộng thấp, mở ra quảng trường và mở cả buổi tối.",
    why: [["Quy luật hình khối", "Chỉ có hộp chữ nhật: một hộp thấp, một thanh dọc, ba thanh ngang cùng bề sâu 8,5 m, cách đều nhau 8 m."], ["Khối chính – khối phụ", "Sống lưng và ba răng thư viện hai tầng là khối chính; hộp công cộng một tầng là khối phụ."], ["Nắng và chói", "Răng mỏng nên mọi phòng có cửa sổ Bắc và Nam; mặt Tây là sống lưng đặc, đầu Đông các răng là tường đặc."], ["Gió và mưa", "Sân vườn giữa các răng mở về phía sông, đón gió Đông Nam vào cả hai mặt mỗi phòng."], ["Công năng", "Một cửa vào, sảnh đón tiếp và quầy mượn trả liền vách; tiếp nhận, xử lý, kho đóng, lõi sách nối liền nhau ở đầu sống lưng."]],
    kc: { he: "Khung bê tông; mỗi răng một nhịp 8,5 m, sống lưng lưới 7,6 + 2,4 m; hộp công cộng mái bê tông phủ cỏ có cửa mái, phòng đa năng dầm ứng lực trước nhịp 12 m.", nhip: "12 m (phòng đa năng), 8,5 m (răng)", cx: "Không" },
    qa: [["Phòng thiếu nhi có lối riêng ra vườn không?", "Có cửa ra vườn thiếu nhi, nhưng là cửa thoát hiểm có chuông; vào phòng phải qua quầy gửi đồ, mượn trả như mọi phòng đọc."], ["Sống lưng dài 49 m có xa không?", "Lõi sách và hai thang đặt ở chân ba răng nên chỗ đọc nào cũng cách thang không quá 30 m."]],
    cut: "Một tấm foam thấp cho hộp công cộng có dải mica làm cửa mái; một thanh foam dọc cho sống lưng; ba thanh foam mỏng cắt ngắn ở tầng 2; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[9.8, 41.5, 11.05, "Lõi sách", 1], [11, 50, 9.45, "Khối chính · Sống lưng", 1], [26, 61.75, 9.45, "Răng thư viện", 1], [24, 18, 4.95, "Khối phụ · Hộp công cộng", 2]],
    build() {
      const v = [
        coreBox(CS.r, "violet", 11.05), coreBox(ST2.r, "warn", 11.05), coreBox(ST3.r, "warn", 11.05),
        B(6, 12, 35.5, 23, 0.45, 4.95, "stone", "D", { fl: 1, top: "grass", role: "p" }),
        B(6, 35, 10, 48.8, 0.45, 9.45, "sheet", "C", { fl: 2, role: "m" }),
        B(16, 41, 19, 8.5, 0.45, 9.45, "deck", "B", { fl: 2, role: "m" }), B(35, 41, 6.5, 8.5, 0.45, 4.95, "deck", "B", { fl: 1, top: "grass", role: "m" }),
        B(16, 57.5, 15, 8.5, 0.45, 9.45, "deck", "B", { fl: 2, role: "m" }), B(31, 57.5, 8.8, 8.5, 0.45, 4.95, "deck", "B", { fl: 1, top: "grass", role: "m" }),
        B(16, 74, 18.8, 8.5, 0.45, 9.45, "deck", "B", { fl: 2, role: "m" }), B(34.8, 74, 6.7, 8.5, 0.45, 4.95, "deck", "B", { fl: 1, top: "grass", role: "m" }),
        // cửa mái thấp trên hộp công cộng và trên sống lưng
        ...[15, 20, 25, 30].map(y => B(7, y, 33.5, 0.5, 4.95, 5.45, "glass", "X", { op: 0.75 })),
        ...[36.5, 51, 56, 69, 81].map(y => B(6.5, y, 6.6, 0.5, 9.45, 9.95, "glass", "X", { op: 0.75 })),
        // tường thấp vườn thiếu nhi
        B(16, 82.5, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(39.5, 82.5, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 16, 22.25, 28.9, 35, 41.5]) for (const y of [12, 23, 35]) st.push(col(x, y, 0.45, 4.95));
      for (const y of [35, 44, 51.9, 59.8, 66.8, 74, 83.8]) for (const x of [6, 13.6, 16]) st.push(col(x, y, 0.45, 9.45));
      for (const [y1, y2, xe, xt] of [[41, 49.5, 35, 41.5], [57.5, 66, 31, 39.8], [74, 82.5, 34.8, 41.5]]) for (const y of [y1, y2]) { for (const x of [22, xe]) st.push(col(x, y, 0.45, 9.45)); st.push(col(xt, y, 0.45, 4.95)); }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
