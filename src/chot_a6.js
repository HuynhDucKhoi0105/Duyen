/* ================= Ý tưởng A.6: Khe Hải Vân, sàn đọc răng cưa trên lõi sách (đi lại gọn, kho sát kệ) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // khe chéo dốc 2/3 như A, rộng 6 m. Sảnh đón tiếp là hộp kính một tầng bắc ngang đầu Tây của khe (bản lề);
  // phía Bắc khe: cánh sự kiện 1 tầng; phía Nam khe: dải 1 tầng sâu 10 m dọc khe (quầy, sảnh đọc, thiếu nhi, xử lý),
  // sau dải là thân thư viện 2 tầng: tầng 1 kho, nghiệp vụ; tầng 2 sàn đọc dưới mái răng cưa kính hướng Bắc.
  const yN = x => 30 + (x - 6) * 2 / 3, yS = x => yN(x) + 6, yB = x => yS(x) + 10;
  const NWG = [[6, 18], [38, 18], [38, yN(38)], [6, yN(6)]];                 // cánh sự kiện 1 tầng
  const HINGE = [[6, yN(6)], [19.333, yN(19.333)], [19.333, yS(19.333)], [6, yS(6)]]; // sảnh đón tiếp bắc qua khe
  const STRIP = [[6, yS(6)], [38, yS(38)], [38, yB(38)], [6, yB(6)]];          // dải 1 tầng dọc khe, lấy sáng mái
  const BODY = [[6, yB(6)], [38, yB(38)], [38, 81], [6, 81]];                  // thân thư viện tầng 1
  const TOP = [[6, yB(6)], [41.5, yB(41.5)], [41.5, 85], [6, 85]];             // sàn đọc tầng 2 (đua 4 m về phía Nam, 3,5 m về phía sông làm ô văng)
  const SLOT = [[19.333, yN(19.333)], [41.5, yN(41.5)], [41.5, yS(41.5)], [19.333, yS(19.333)]];
  const sl = (a, b) => [[a, yS(a)], [b, yS(b)], [b, yB(b)], [a, yB(a)]];      // lát cắt của dải dọc khe
  const bd = (a, b, y1) => [[a, yB(a)], [b, yB(b)], [b, y1], [a, y1]];         // phòng thân có cạnh trên chéo
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NWG, HINGE, STRIP, BODY],
    rooms: [
      // sảnh đón tiếp: phòng duy nhất có cửa vào; bên trái sang sự kiện, phía sau là quầy giữ đồ, mượn trả
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin (hộp kính bắc qua khe)", p: HINGE, noclip: 1, ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, fr: [7, 33, 11, 6], d: [["E", 2.4, "chinh", 0.5], ["FOY1", 2.4, "o"], ["A4", 1.8, "k"]] },
      // cánh sự kiện (chạy được ngoài giờ), cả cánh 1 tầng lấy sáng răng cưa
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 18, 3, 5], ctl: "nv", nz: 1, top: N, d: [["W", 0.9, "nv"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh", r: [9, 18, 5, 5], ctl: "sk", nz: 1, wc: KT, d: [["FOY1", 1.2, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 23, 8, 14], ctl: "sk", nz: 2, seat: 24, top: N, d: [["FOY1", 1.4, "p"]] },
      { id: "FOY1", c: "circ", n: "Sảnh sự kiện", r: [14, 18, 6, 22], ctl: "sk", nz: 2, occ: 60, d: [["D3", 1.2, "p"], ["FOY2", 2.4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [20, 18, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 3, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [20, 24.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      { id: "FOY2", c: "circ", n: "Sảnh trưng bày", r: [20, 29.25, 4, 14], ctl: "sk", nz: 2, d: [["D1", 1.8, "p"], ["A2", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [24, 18, 14, 14], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.6], ["E", 1.6, "tn", 0.5], ["KCF", 1.4, "p"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [24, 32, 7.4, 15], ctl: "sk", nz: 2, occ: 30, top: N, d: [["KCF", 1.6, "o"], ["A3", 2.4, "o"]] },
      { id: "KCF", c: "circ", n: "Sảnh nhỏ cạnh cà phê", r: [31.4, 32, 2.8, 6.5], ctl: "sk", nz: 2, d: [["A3", 1.6, "o"], ["WCE2", 1.2, "p"]] },
      { id: "WCE2", c: "E5", n: "Vệ sinh khu sự kiện", r: [34.2, 32, 3.8, 6.5], ctl: "sk", nz: 1, wc: KT },
      { id: "A3", c: "A3", n: "Cà phê sách (miệng khe phía sông)", r: [31.4, 38.5, 6.6, 15], ctl: "sk", nz: 3, seat: 32, top: N, fr: [31.4, 38.5, 6.6, 10.5], d: [["X", 1.6, "tn"]] },
      // dải dọc khe, 1 tầng lấy sáng mái: xử lý nghiệp vụ, quầy giữ đồ mượn trả, sảnh đọc, thiếu nhi
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", p: sl(6, 13), noclip: 1, ctl: "nv", nz: 1, top: N, fr: [6.3, 39, 6.4, 8], d: [["A4", 1.0, "nv"], ["C4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", p: sl(13, 16), noclip: 1, ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["LOB", 1.8, "o"], ["CL", 1.4, "thang"]] },
      { id: "LOB", c: "B1", n: "Sảnh đọc, kệ sách mới", p: sl(16, 19), noclip: 1, ctl: "tv", nz: 1, top: N, d: [["CL", 1.6, "o"], ["KB", 1.0, "o"]] },
      // sảnh đệm hai lớp cửa: tiếng trẻ em không lọt sang sảnh đọc
      { id: "KB", c: "circ", n: "Sảnh đệm thiếu nhi (cửa kép, chỗ để xe đẩy)", p: sl(19, 20), noclip: 1, ctl: "tv", nz: 2, top: N, d: [["B3", 1.4, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", p: sl(20, 38), noclip: 1, ctl: "tv", nz: 3, seat: 32, top: N, fr: [20, 51.33, 16.5, 8.8], d: [["E", 1.4, "tnbd"], ["WCL1", 1.0, "p"], ["LC", 1.6, "p"]] },
      // thân thư viện tầng 1: chuỗi sách liền nhau ở đầu Tây, lõi thang + thang máy + tời sách ngay sau quầy
      { id: "C4", c: "C4", n: "Tiếp nhận sách", p: bd(6, 13, 52.6), noclip: 1, ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 52.6, 7, 18.4], ctl: "kho", nz: 1, d: [["CL", 1.2, "nv"], ["C3", 1.0, "nv"], ["NVC", 1.2, "nv"]] },
      { id: "CL", n: "Thang bộ + thang máy + tời sách (sau quầy)", p: bd(13, 19, 59.667), noclip: 1, ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" } },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", p: bd(19, 22, 59.667), noclip: 1, ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [13, 59.667, 6, 7], ctl: "kho", nz: 1 },
      { id: "KD1", c: "circ", n: "Kho đệm, xe đẩy sách", r: [19, 59.667, 3, 7], ctl: "nv", nz: 1, d: [["C3", 1.0, "nv"], ["KD", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [13, 66.667, 4.6, 4.333], ctl: "nv", nz: 1, d: [["NVC", 0.9, "nv"]] },
      { id: "KD", c: "circ", n: "Kho đệm nghiệp vụ", r: [17.6, 66.667, 4.4, 4.333], ctl: "nv", nz: 1, d: [["NVC", 1.0, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", p: bd(22, 26.5, 71), noclip: 1, ctl: "kt", nz: 3, d: [["NVC", 1.4, "nv"], ["LC", 1.0, "nv"]] },
      { id: "LC", c: "circ", n: "Sảnh đọc báo, lối xuống tra cứu", p: bd(26.5, 33, 73), noclip: 1, ctl: "tv", nz: 1, d: [["B5", 1.6, "p"], ["CS", 1.2, "thang"]] },
      { id: "CS", n: "Thang bộ Đông", p: bd(33, 38, 73), noclip: 1, ctl: "tv", nz: 1, core: { st: "u", link: "CS" }, d: [["E", 1.2, "tnbd"]] },
      { id: "NVC", c: "circ", n: "Hành lang nghiệp vụ", r: [6, 71, 20.5, 2], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"]] },
      { id: "CW", n: "Thang bộ Tây Nam", r: [6, 73, 5, 8], ctl: "tv", nz: 1, core: { st: "u", link: "CW" }, d: [["W", 1.2, "tnbd"], ["NVC", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [11, 73, 5, 8], ctl: "nv", nz: 1, d: [["NVC", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [16, 73, 10, 8], ctl: "nv", nz: 0, d: [["NVC", 1.0, "nv"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [26, 73, 12, 8], ctl: "tv", nz: 1, seat: 16 }
    ],
    staff: [
      { x: 12.5, y: 36.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 14.5, y: 45, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.5, y: 20.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 44, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 28, y: 58, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 9.5, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9.5, y: 50, t: "Nhận sách", sc: ["4"] },
      { x: 21, y: 77, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 17, y: 30, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 22, y: 21, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 10, y: 30, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2: một sàn đọc gọn dưới mái răng cưa, đặt ngay trên kho và lõi sách ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [TOP],
    rooms: [
      { id: "CL", n: "Thang bộ + thang máy + tời sách (sau quầy)", p: bd(13, 19, 59.667), noclip: 1, ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CL" }, d: [["B1m", 2.4, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", p: bd(19, 22, 59.667), noclip: 1, ctl: "tv", nz: 1, wc: KT, d: [["B1m", 1.0, "p"]] },
      // cánh Tây tầng 2: cụm học nhóm có hành lang riêng mở thẳng vào lõi sách, nằm trên kho (không trên văn phòng), cách đọc yên tĩnh hơn 15 m
      { id: "KX", c: "circ", n: "Kho đệm, xe sách tầng 2", p: bd(6, 11.6, 55), noclip: 1, ctl: "tv", nz: 1, d: [["CO4", 1.0, "nv"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", p: bd(11.6, 13, 73), noclip: 1, ctl: "tv", nz: 2, d: [["CL", 1.4, "thang"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [6, 55 + 4.5 * i, 5.6, 4.5], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] })),
      { id: "B1m", c: "B1", n: "Kệ sách và bàn đọc (giữa)", r: [13, 59.667, 9, 13.333], ctl: "tv", nz: 1, top: N, shelf: 0.4, d: [["B1e", 2.4, "o"], ["B6", 2.4, "o"], ["B1s", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở nhìn khe", p: bd(22, 33, 73), noclip: 1, ctl: "tv", nz: 1, top: N, fr: [22.3, 63, 10.4, 9.7], d: [["CS", 1.2, "thang"], ["B2", 1.4, "p"], ["B1s", 2.4, "o"]] },
      { id: "CS", n: "Thang bộ Đông", p: bd(33, 38, 73), noclip: 1, ctl: "tv", nz: 1, core: { st: "u", link: "CS" }, d: [["B1r", 1.6, "o"]] },
      { id: "B1r", c: "B1", n: "Góc đọc nhìn sông (sau thang Đông)", p: bd(38, 41.5, 73), noclip: 1, ctl: "tv", nz: 1, top: N },
      // dải Nam tầng 2 (đua 4 m làm ô văng): đọc linh hoạt cạnh thang Tây, đọc mở, đọc yên tĩnh ở góc Đông Nam
      { id: "CW", n: "Thang bộ Tây Nam", r: [6, 73, 5, 12], ctl: "tv", nz: 1, core: { st: "u", link: "CW" }, d: [["B6", 1.2, "thang"], ["B4d", 0.9, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [11, 73, 4.3, 12], ctl: "tv", nz: 1, steps: 3, top: N, d: [["B1s", 2.4, "o"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (Nam)", r: [15.3, 73, 14.1, 12], ctl: "tv", nz: 1, top: N, shelf: 0.4 },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Đông Nam, xa học nhóm và thiếu nhi)", r: [29.4, 73, 12.1, 12], ctl: "tv", nz: 0, seat: 40, top: N, d: [["CS", 1.2, "thang"]] }
    ],
    staff: [{ x: 13, y: 78, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotA6", code: "A.6", name: "Khe Hải Vân, sàn đọc răng cưa trên lõi sách", from: "A",
    NWG, HINGE, STRIP, BODY, TOP, yN, yS,
    levels: [t1, t2],
    grid: { x: [6, 13, 19, 26, 33, 38], y: [18, 30, 46, 52.6, 59.7, 66.7, 73, 81] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 49.5], [5.2, 49.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 56.5], [20.4, 42]]],
        event: [[[20, -9], [40.4, 8], [40.4, 56.5], [20.4, 42]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào khe tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, bờ sông, vào khe tới sảnh đón tiếp" },
      hatch: [SLOT],
      labels: [[30, 52, "Khe Hải Vân 6 m"], [12.5, 37, "Sảnh kính bắc qua khe"], [31, 24, "Sự kiện 1 tầng"], [22, 77, "Thư viện 2 tầng"]]
    }
  };
  plan.intro = `<p class="lede">Giữ khe chéo Hải Vân của A (dốc 2/3, rộng 6 m, mở ra sông đón gió Đông Nam) và mái răng cưa kính hướng Bắc lưng phủ cỏ. Điểm mới là đi lại gọn: sảnh đón tiếp là hộp kính một tầng bắc ngang đầu Tây của khe, là cửa vào duy nhất. Bên trái sảnh là khu sự kiện, phía sau sảnh là quầy giữ đồ, mượn trả có cổng từ. Ngay sau quầy là lõi thang bộ, thang máy và tời sách; kề lõi là kho đóng, tiếp nhận, xử lý nghiệp vụ nối liền nhau. Tầng 2 là một sàn đọc gọn dưới răng cưa, đặt thẳng trên kho, nên sách từ kho lên kệ chỉ một chuyến thang máy.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: chỉ sảnh đón tiếp có cửa vào từ khe. Từ sảnh, rẽ trái vào sảnh sự kiện (phòng đa năng, chuyên đề, trưng bày, cà phê, vệ sinh sảnh); đi thẳng là quầy giữ đồ, mượn trả có cổng từ (thủ thư trực). Không có lối nào vào khu đọc mà không qua quầy.",
    "Thang có hệ quả: lõi thang bộ + thang máy + tời sách nằm ngay sau quầy, nên người đọc chỉ tới chân thang sau khi đã gửi đồ, qua cổng từ. Hai thang thoát nạn (Tây Nam, Đông) ở tầng 1 chỉ có cửa chuông báo ra ngoài và cửa thẻ từ sang hành lang nghiệp vụ; khu sự kiện một tầng nên không có thang nào lên khu đọc. Phòng kỹ thuật có thêm cửa thẻ từ ra sảnh đọc báo để thoát nạn nhanh qua thang Đông.",
    "Đường sách gọn: lối Tây → cửa cuốn → tiếp nhận → xử lý nghiệp vụ (cửa sát nhau) → kho đóng (liền tiếp nhận) → tời sách trong lõi sau quầy → kệ tầng 2. Kho đóng có cửa thẳng vào lõi thang. Sách trả: quầy mượn trả có cửa nhân viên sang thẳng xử lý nghiệp vụ, không đi qua khu công cộng.",
    "Vệ sinh: vệ sinh sảnh cạnh sảnh sự kiện (gần cửa vào), vệ sinh khu sự kiện cạnh phòng đa năng và cà phê; trong khu đọc có vệ sinh thay tã sát thiếu nhi ở tầng 1 và vệ sinh tầng 2 chồng đúng lên trên, cạnh lõi thang.",
    "Ánh sáng: cánh sự kiện, sảnh và dải dọc khe đều một tầng, lấy sáng răng cưa kính hướng Bắc. Tầng 2 cũng dưới răng cưa. Tầng 1 thân thư viện: văn phòng, phòng nhân viên, tra cứu số quay mặt Nam sâu 8 m, có sàn tầng 2 đua 3,5 m làm ô văng; phần sâu giữa nhà là kho đóng, lưu trữ, kỹ thuật, thang, kho đệm – không cần cửa sổ. Mép khe, đầu hồi Đông, Tây đặc.",
    "Ngoài giờ: mở sảnh đón tiếp và cả cánh sự kiện; chỉ khóa cửa sảnh → quầy mượn trả. Phòng đa năng có cửa thoát ra quảng trường Bắc và ra phía sông, cà phê có cửa thoát ra khe.",
    "Yên tĩnh: đọc yên tĩnh ở góc Đông Nam tầng 2, xa khu sự kiện (cách khe, dải một tầng và cả sàn đọc), cách cụm học nhóm hơn 15 m. Học nhóm gom ở cánh Tây tầng 2, có hành lang riêng mở thẳng vào lõi sách, nằm trên kho đóng chứ không trên văn phòng. Thiếu nhi ở tầng 1, cách sảnh đọc bằng sảnh đệm cửa kép, mở ra vườn ven sông bằng cửa có chuông.",
    "Sửa ngày 05/11 (tiếng ồn): học nhóm chuyển từ dải Nam tầng 2 (sát vách đọc linh hoạt, sát đọc yên tĩnh, nằm trên văn phòng và phòng nhân viên) sang cánh Tây tầng 2 trên kho; chỗ cũ thành đọc mở. Thêm sảnh đệm cửa kép 1 m giữa sảnh đọc và phòng thiếu nhi. Để bù diện tích đọc mở, sàn tầng 2 đua thêm 3,5 m về phía sông và 4 m về phía Nam, góc Đông Nam có hai cột thép lộ.",
    "Kết cấu: khung bê tông lưới theo trục 6 · 13 · 19 · 26 · 33 · 38; kho đóng ở tầng 1 đặt trực tiếp trên nền. Răng cưa là vì kèo thép nhẹ mỗi 4 m. Phòng đa năng 14 × 14 m dùng dầm thép. Sàn tầng 2 đua 4 m về phía Nam và 3,5 m về phía sông; góc Đông Nam có hai cột thép lộ đỡ góc đua."
  ];
  /* ---------- khối 3D ---------- */
  const { B, PO, col } = G.K;
  const clipY = (P, y0, y1) => {
    const cut = (pts, keep, yy) => { const o = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], ka = keep(a[1]), kb = keep(b[1]); if (ka) o.push(a); if (ka !== kb) { const t = (yy - a[1]) / (b[1] - a[1]); o.push([a[0] + (b[0] - a[0]) * t, yy]); } } return o; };
    return cut(cut(P, y => y >= y0, y0), y => y <= y1, y1);
  };
  const teeth = (P, base, rise, y0, y1, role) => {
    const o = [];
    for (let y = y0; y < y1 - 0.5; y += 4) {
      const q = clipY(P, y, Math.min(y + 4, y1));
      if (q.length < 3) continue;
      const yy = y;
      o.push(PO(q, base, (x, yv) => base + rise * (1 - (yv - yy) / 4), "sheet", "X", { top: "grass", role }));
      const xs = q.filter(p => Math.abs(p[1] - yy) < 1e-6).map(p => p[0]);
      if (xs.length >= 2) o.push(B(Math.min(...xs) + 0.3, yy - 0.08, Math.max(...xs) - Math.min(...xs) - 0.6, 0.16, base, base + rise - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  const core = (P, c, top) => PO(P, 0.45, top, c, "X", { top: c, lv: 0 });
  plan.idea = {
    id: "chotA6", fam: "chot", code: "A.6", from: "A", name: "Khe Hải Vân, sàn đọc răng cưa trên lõi sách", rule: "Khe chéo, sảnh bắc qua khe, mái răng cưa lặp",
    tag: "Sảnh kính bắc qua đầu khe là cửa vào duy nhất; quầy, lõi thang có tời sách, kho đóng, xử lý nằm liền nhau; sàn đọc tầng 2 dưới răng cưa đặt ngay trên kho",
    story: "Khe Hải Vân vẫn cắt chéo khu đất, mở ra sông đón gió. Ở đầu Tây, một hộp kính thấp bắc ngang qua khe như trạm dừng trên đèo: đó là sảnh đón tiếp. Phía Bắc khe là đồi thấp của khu sự kiện, phía Nam là đồi cao của thư viện, cả hai phủ răng cưa cỏ với dải kính quay về hướng Bắc. Mọi thứ của thư viện xoay quanh một lõi tím ngay sau quầy: thang, thang máy, tời sách, kho đóng, xử lý.",
    why: [["Quy luật hình khối", "Lặp: hai sườn đồi răng cưa đều nhau mỗi 4 m, cắt bởi khe chéo; hộp kính sảnh và lõi tím là hai điểm nhấn."], ["Khối chính – khối phụ", "Thư viện hai tầng phía Nam cao tới +11,05 và chiếm phần lớn sàn; khu sự kiện một tầng phía Bắc."], ["Nắng và chói", "Kính mái quay Bắc, không nhận nắng trực tiếp; mặt Nam tầng 1 có ô văng 3,5 m; mép khe, đầu hồi Đông, Tây đặc."], ["Đi lại", "Quầy, lõi thang, kho, xử lý nằm trong một ô lưới 13 × 14 m; kho đóng tới kệ tầng 2 chỉ một chuyến thang máy."]],
    kc: { he: "Khung bê tông; tầng 2 thư viện là sàn bê tông trên lưới cột 6–7 m, kho đóng đặt ở tầng 1 trên nền. Răng cưa: vì kèo thép nhẹ mỗi 4 m. Phòng đa năng 14 × 14 m dùng dầm thép.", nhip: "14 m (phòng đa năng), 6–7 m (lưới)", cx: "Không" },
    qa: [["Khe có bị sảnh chắn mất gió?", "Sảnh chỉ chắn đoạn đầu Tây 13 m, sát lối Tây vốn đã kín; đoạn khe 22 m còn lại vẫn mở ra sông, đón gió Đông Nam."], ["Kho đóng tới kệ xa nhất bao xa?", "Kho đóng có cửa thẳng vào lõi thang; từ lõi ở tầng 2 tới cửa các phòng kệ đều dưới 15 m."]],
    cut: "Tỉ lệ 1:200. Cánh sự kiện và dải dọc khe: foam trắng cao 2,25 cm; thân thư viện cao 4,5 cm. Răng cưa: thanh foam tam giác, lưng dán giấy cỏ, mặt Bắc dán mica. Sảnh: hộp mica. Lõi thang: foam tím, thang thoát nạn foam cam.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 76, 11.4, "Khối chính · Thư viện 2 tầng dưới răng cưa", 1], [26, 25, 6.4, "Khối phụ · Sự kiện 1 tầng", 2], [12.5, 37, 6.4, "Sảnh kính bắc qua khe", 2], [30, 52, 0.6, "Khe Hải Vân 6 m", 2], [16, 55, 12.5, "Lõi thang + tời sách", 2]],
    build() {
      const v = [
        PO(NWG, 0.45, 4.95, "sheet", "D", { fl: 1, role: "p" }),
        PO(HINGE, 0.45, 4.95, "glass", "A", { fl: 1, role: "p" }),
        PO(STRIP, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        PO(BODY, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }),
        PO(TOP, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        core(bd(13, 19, 59.667), "violet", 12.45), core(rectPts(6, 73, 5, 12), "warn", 11.85), core(bd(33, 38, 73), "warn", 11.85),
        ...teeth(NWG, 4.95, 1.4, 18, yN(38), "p"),
        ...teeth(STRIP, 4.95, 1.4, yS(6), yB(38), "m"),
        ...teeth(TOP, 9.45, 1.6, yB(6), 85, "m")
      ];
      const st = [];
      for (const x of [6, 13, 19, 26, 33, 38]) for (const y of [18, 26, 34, 42, 50, 58, 66, 73, 81]) {
        const inN = G.inPoly ? G.inPoly(NWG, x, y, 0.05) : false, inB = G.inPoly ? G.inPoly(BODY, x, y, 0.05) : false, inS = G.inPoly ? G.inPoly(STRIP, x, y, 0.05) : false;
        if (inB) st.push(col(x, y, 0.45, 9.45)); else if (inN || inS) st.push(col(x, y, 0.45, 4.95));
      }
      // cột thép lộ ở góc Đông Nam: sàn đọc đua 4 m về phía Nam và 3,5 m về phía sông
      st.push(col(41, 84.5, 0.45, 4.95), col(41, 77, 0.45, 4.95));
      return { v, st };
    }
  };
  function rectPts(x, y, w, h) { return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; }
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
