/* ================= Ý tưởng S.8: Chữ L hai tầng (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hai hộp chữ nhật ghép thành chữ L: cánh Tây một tầng (công cộng, sự kiện, đón tiếp, nghiệp vụ) chạy Bắc – Nam,
  // thanh thư viện hai tầng chạy Đông – Tây phía Nam; góc trống Đông Bắc là sân vào nhìn ra sông, sảnh đón tiếp ở góc trong chữ L
  const WL = [[6, 12], [25, 12], [25, 56], [6, 56]];       // cánh Tây một tầng, mọi phòng lấy sáng cửa mái hướng Bắc
  const SB = [[6, 56], [41.5, 56], [41.5, 82], [6, 82]];   // thanh thư viện hai tầng
  const COURT = [[25, 12], [41.5, 12], [41.5, 56], [25, 56]];
  const GARDEN = [[18.5, 82], [41.5, 82], [41.5, 88], [18.5, 88]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [WL, SB],
    rooms: [
      // cánh Tây, đầu Bắc (nhìn quảng trường): phòng đa năng và phần phụ trợ sự kiện
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "S", top: N, d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5], ["FOYE", 1.8, "p", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [17.25, 12, 7.75, 3.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [17.25, 15.25, 7.75, 2.6], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn sân vào)", r: [17.25, 17.85, 7.75, 2], ctl: "nv", nz: 1, top: N, d: [["E", 1.0, "nv"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [17.25, 19.85, 7.75, 2], ctl: "sk", nz: 1, wc: KT, d: [["FOYE", 1.0, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [17.25, 21.85, 7.75, 6.15], ctl: "sk", nz: 2, occ: 40, d: [["CO", 2.4, "o"], ["E", 1.8, "tn", 0.5]] },
      // cánh Tây, giữa: cà phê, chuyên đề, sảnh, trưng bày
      { id: "A3", c: "A3", n: "Cà phê sách", r: [6, 28, 9.4, 8], ctl: "sk", nz: 3, seat: 32, top: N, d: [["CO", 3.0, "o"], ["W", 1.2, "tn", 0.5]] },
      { id: "CO", c: "circ", n: "Sảnh chờ sự kiện", r: [15.4, 28, 9.6, 5.6], ctl: "sk", nz: 2, d: [["A2", 3.0, "o"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 36, 9.4, 7.45], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO2", 1.4, "p"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sảnh mở về sân vào)", r: [15.4, 33.6, 9.6, 9.85], ctl: "sk", nz: 2, occ: 30, top: N, d: [["A1", 3.0, "o"]] },
      // cánh Tây, đầu Nam (góc trong chữ L): đón tiếp, quầy mượn trả, nghiệp vụ
      { id: "WCA", c: "E5", n: "Vệ sinh sảnh đón tiếp", r: [6, 43.45, 3.75, 4.55], ctl: "sk", nz: 1, wc: KT, d: [["CO2", 1.0, "p"]] },
      { id: "CO2", c: "circ", n: "Sảnh chia luồng", r: [9.75, 43.45, 6.75, 2.15], ctl: "sk", nz: 2, d: [["A1", 2.0, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin (góc trong chữ L)", r: [16.5, 43.45, 8.5, 9.05], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["E", 2.4, "chinh", 0.5], ["A4", 2.0, "k"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 48, 3.75, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.75, 45.6, 6.75, 10.4], ctl: "nv", nz: 1, top: N, d: [["A4", 1.0, "nv"], ["C1", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16.5, 52.5, 8.5, 3.5], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["HL", 2.4, "o"]] },
      // thanh thư viện, phần dưới cánh Tây (không có mặt ngoài): kho, lõi sách, vệ sinh
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 56, 10.5, 11.5], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [16.5, 56, 8.5, 4], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["CS", 1.4, "thang"], ["LC", 2.4, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [16.5, 60, 4.5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WCL", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [16.5, 67, 4.5, 4], ctl: "tv", nz: 1, wc: KT, d: [["LC", 1.0, "p"]] },
      { id: "KXS", c: "circ", n: "Kho xe sách, xe đẩy", r: [16.5, 71, 4.5, 3], ctl: "nv", nz: 1, d: [["SC", 1.0, "nv"], ["E6", 0.9, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 67.5, 6.2, 6.5], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"], ["SC", 1.0, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang, tủ đồ nhân viên", r: [12.2, 67.5, 4.3, 6.5], ctl: "nv", nz: 1, d: [["C1", 1.0, "nv"], ["E1", 1.0, "nv"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [21, 60, 4, 14], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["B3", 1.8, "p"]] },
      // thanh thư viện, phần nhìn ra sân vào (Bắc) và vườn (Nam)
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn sân vào)", r: [25, 56, 16.5, 8], ctl: "tv", nz: 1, d: [["N", 1.2, "tnbd", 0.85], ["STE", 1.2, "thang"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [25, 64, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STE" } },
      { id: "KST", c: "circ", n: "Kho sách thiếu nhi", r: [25, 70, 3, 4], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "KS2", c: "circ", n: "Kho đồ chơi, thiết bị", r: [28, 64, 7, 10], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [35, 64, 6.5, 8.5], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "KE", c: "circ", n: "Kho phụ tùng kỹ thuật", r: [35, 72.5, 6.5, 1.5], ctl: "kt", nz: 1, d: [["E4", 0.9, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 74, 10, 8], ctl: "nv", nz: 0, d: [["S", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung (vách đệm)", r: [16, 74, 2.5, 8], ctl: "nv", nz: 1 },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [18.5, 74, 23, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] }
    ],
    staff: [
      { x: 20.75, y: 47, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 20.75, y: 54.2, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 21, y: 18.8, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 10, y: 31, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 78, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13, y: 50, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 52, t: "Nhận sách", sc: ["4"] },
      { x: 11, y: 78, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 21, y: 25, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 21, y: 13.6, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: chỉ thanh thư viện (tầng trên cùng, lấy sáng mái răng cưa quay Bắc) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [SB],
    rooms: [
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 56, 10.5, 4.8], ctl: "tv", nz: 1, steps: 4, top: N, d: [["HS2", 2.4, "o"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 60.8, 10.5, 3.8], ctl: "nv", nz: 1, top: N, d: [["CS", 0.9, "nv"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây)", r: [6, 64.6, 10.5, 15.24], ctl: "tv", nz: 0, seat: 40, top: N, d: [["CS", 1.2, "thang"], ["B1c", 1.2, "p"]] },
      { id: "B1w", c: "B1", n: "Bàn đọc cá nhân dọc cửa Nam", r: [6, 79.84, 10.5, 2.16], ctl: "tv", nz: 0, top: N, d: [["B2", 1.6, "p"]] },
      { id: "HS2", c: "B1", n: "Sảnh đọc cạnh lõi sách", r: [16.5, 56, 4.5, 4], ctl: "tv", nz: 1, top: N, d: [["CS", 1.4, "thang"], ["LC2", 2.4, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [16.5, 60, 4.5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LC2", 1.4, "thang"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [16.5, 67, 4.5, 4], ctl: "tv", nz: 1, wc: KT, d: [["LC2", 1.0, "p"]] },
      { id: "B1c", c: "B1", n: "Dải kệ cạnh lõi sách", r: [16.5, 71, 4.5, 11], ctl: "tv", nz: 1, top: N, d: [["LC2", 2.4, "o"]] },
      { id: "LC2", c: "B1", n: "Dải kệ giữa (lối đi chính)", r: [21, 56, 4, 18], ctl: "tv", nz: 1, top: N, d: [["B5", 2.4, "o"], ["CO4", 2.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [25, 56, 11.5, 8], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1e", 2.4, "o"], ["B1g", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở góc Đông Bắc", r: [36.5, 56, 5, 8], ctl: "tv", nz: 1, top: N, d: [["B1g", 2.4, "o"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [25, 64, 3, 5], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1g", 1.2, "thang"], ["B1k", 1.2, "thang"]] },
      { id: "B1k", c: "B1", n: "Bàn đọc cá nhân", r: [25, 69, 3, 5], ctl: "tv", nz: 1, top: N, d: [["B1g", 1.6, "o"]] },
      { id: "B1g", c: "B1", n: "Đọc mở và kệ (sảnh đọc Đông)", r: [28, 64, 13.5, 10], ctl: "tv", nz: 1, top: N },
      // học nhóm dọc mặt Nam phía Đông, có hành lang và tủ đồ riêng, cách đọc yên tĩnh hơn 8 m
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [21, 74, 20.5, 1.5], ctl: "tv", nz: 2, d: [["B1g", 1.2, "p", 0.7]] },
      { id: "KB", c: "circ", n: "Tủ đồ học nhóm", r: [21, 75.5, 4, 6.5], ctl: "tv", nz: 1, d: [["CO4", 0.9, "p"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [25 + 3.85 * i, 75.5, 3.85, 6.5], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] })),
      { id: "KBe", c: "circ", n: "Kho bảng, thiết bị học nhóm", r: [40.4, 75.5, 1.1, 6.5], ctl: "tv", nz: 1, d: [["B4d", 0.8, "p"]] }
    ],
    staff: [
      { x: 30, y: 60, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS8", code: "S.8", name: "Chữ L hai tầng", from: "khối vuông",
    WL, SB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 16.5, 25, 35, 41.5], y: [12, 28, 43.45, 56, 64, 74, 82] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 30, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 50.8], [5.2, 50.8]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 48], [25.6, 48]]],
        event: [[[20, -9], [30, 6], [33, 30], [25.6, 48]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân góc chữ L tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc đi thẳng vào sân góc chữ L tới sảnh đón tiếp" },
      hatch: [COURT, GARDEN],
      labels: [[33, 34, "Sân vào góc chữ L, mở ra sông"], [30, 85, "Vườn thiếu nhi có tường bao"], [15.5, 22, "Cánh Tây một tầng"], [24, 70, "Thanh thư viện hai tầng"]]
    }
  };
  plan.intro = `<p class="lede">Hai hộp chữ nhật ghép thành chữ L. <b>Thanh thư viện</b> hai tầng chạy suốt bề ngang khu đất ở phía Nam, là khối chính. <b>Cánh Tây</b> một tầng chạy từ quảng trường xuống, chứa sự kiện, cà phê, trưng bày, đón tiếp và nghiệp vụ; mọi phòng của cánh này lấy sáng cửa mái hướng Bắc nên không cần mở mặt Đông, Tây. Góc trống Đông Bắc thành sân vào lớn nhìn ra sông. Sảnh đón tiếp nằm đúng góc trong chữ L, ngay sau nó là quầy gửi đồ, mượn trả có cổng từ, rồi tới thanh thư viện.</p>`;
  plan.notes = [
    "Đi qua khối A: cửa vào duy nhất mở từ sân vào (góc trong chữ L) vào sảnh đón tiếp. Sát sảnh là quầy gửi đồ, mượn trả có cổng từ (khoảng 5 m); qua quầy mới vào sảnh thư viện. Phòng thiếu nhi, mọi phòng đọc tầng 1 và tầng 2 đều nằm sau quầy này. Khu sự kiện đi từ sảnh đón tiếp qua trưng bày, sảnh chờ tới phòng đa năng; phòng chuyên đề đi qua sảnh chia luồng. Phòng đa năng, cà phê chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: cánh Tây chỉ một tầng nên không có thang. Hai thang lên khu đọc (lõi sách cạnh kho, thang Đông cạnh phòng đọc mở) đều nằm trong thanh thư viện, chỉ tới được sau quầy có cổng từ, không có cửa ra ngoài ở tầng 1.",
    "Đường sách ngắn: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách, ngay phía Nam) → lõi sách có tời sát kho → kệ tầng 2. Sách trả đi thẳng từ quầy mượn trả qua cửa nhân viên vào xử lý nghiệp vụ (liền vách), không qua khu công cộng.",
    "Vệ sinh: một cụm cạnh sảnh sự kiện (phòng đa năng, cà phê), một cụm cạnh sảnh đón tiếp, đều mở ngoài giờ. Khu đọc mỗi tầng có một cụm cạnh lõi sách, tầng 2 chồng thẳng lên tầng 1; phòng thiếu nhi tới vệ sinh khoảng 13 m.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở cánh Tây một tầng, không nằm dưới hay trên phòng đọc nào. Trong thanh thư viện, đọc yên tĩnh ở đầu Tây tầng 2, học nhóm dọc mặt Nam phía Đông, cách nhau hơn 8 m. Văn phòng ở góc Tây Nam tầng 1, cách phòng thiếu nhi bằng kho chung; phòng nhân viên tầng 2 kẹp giữa đọc linh hoạt và đọc yên tĩnh, xa học nhóm.",
    "Ánh sáng Bắc – Nam: cánh Tây một tầng lấy sáng cửa mái hướng Bắc, cộng cửa sổ mặt Bắc của phòng đa năng. Thanh thư viện tầng 1: phía Đông nhìn sân vào (Bắc) và vườn (Nam), sâu 8 m; phần nằm dưới chỗ ghép với cánh Tây chỉ có kho, thang, vệ sinh. Tầng 2 là tầng trên cùng, mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc.",
    "Không che sáng nhau: cánh Tây nằm hẳn về phía Tây, không đứng trước cửa sổ Bắc nào của thanh thư viện; sân vào rộng 16,5 m mở thẳng ra quảng trường.",
    "Ngoài giờ: cả cánh Tây (sảnh, cà phê, trưng bày, chuyên đề, phòng đa năng, hai cụm vệ sinh) chạy riêng. Chỉ khóa một cửa từ sảnh đón tiếp vào quầy mượn trả.",
    "Kết cấu: cánh Tây khung bê tông, mái phẳng có dải cửa mái, phòng đa năng 11,25 × 16 m dầm ứng lực trước; thanh thư viện khung bê tông lưới khoảng 8 m, mái răng cưa thép nhẹ; không có phần đua."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS8", fam: "chot", code: "S.8", from: "khối vuông", name: "Chữ L hai tầng", rule: "Hai hộp chữ nhật ghép chữ L, góc trống là sân vào",
    tag: "Thanh thư viện hai tầng phía Nam, cánh Tây một tầng lấy sáng mái; sân vào ở góc Đông Bắc, sảnh đón tiếp ở góc trong chữ L",
    story: "Chữ L ôm lấy một sân vào nhìn ra sông. Đi từ quảng trường hay từ bờ sông vào đều gặp sân này trước, rồi tới cửa sảnh ở góc trong chữ L. Bên trái là cánh công cộng thấp, sáng từ mái; phía trước là thanh thư viện hai tầng, yên tĩnh.",
    why: [["Quy luật hình khối", "Hai hộp chữ nhật vuông góc: một thanh dài hai tầng, một cánh thấp một tầng; không đua, không xoay."], ["Khối chính – khối phụ", "Thanh thư viện hai tầng chiếm khoảng 70% sàn; cánh Tây một tầng là khối phụ."], ["Nắng và chói", "Cánh Tây không mở mặt Đông, Tây mà lấy sáng cửa mái hướng Bắc; thanh thư viện chỉ mở mặt Bắc và Nam."], ["Gió và mưa", "Sân vào mở về phía sông, đón gió Đông Nam; mái sảnh đón tiếp đưa ra che mưa cửa vào."], ["Công năng", "Đón tiếp ở chỗ hai hộp gặp nhau nên là bản lề thật: một bên là sự kiện, một bên là thư viện."]],
    kc: { he: "Khung bê tông; cánh Tây mái phẳng có dải cửa mái, phòng đa năng dầm ứng lực trước nhịp 11,25 m; thanh thư viện lưới khoảng 8 m, mái răng cưa thép nhẹ.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Cánh Tây sâu 19 m có bí không?", "Không: cánh chỉ một tầng, mọi phòng lấy sáng cửa mái hướng Bắc."], ["Khách sự kiện có vào được thư viện không?", "Không: chỉ có một cửa từ sảnh đón tiếp vào quầy mượn trả, khóa ngoài giờ."]],
    cut: "Cánh Tây foam vàng thấp có dải mica cửa mái; thanh thư viện trắng hai tầng có răng cưa mica quay Bắc; lõi thang tím, cam nhô khỏi mái 1 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 70, 11.5, "Khối chính · Thanh thư viện", 1], [15.5, 30, 7.5, "Cánh Tây một tầng", 2], [33, 34, 1, "Sân vào", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05),
        B(6, 56, 35.5, 26, 0.45, 9.45, "sheet", "B", { fl: 2, role: "m" }),
        B(6, 12, 19, 44, 0.45, 5.95, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        // dải cửa mái hướng Bắc trên cánh Tây, răng cưa kính trên thanh thư viện
        ...[16, 24, 32, 40, 48].map(y => B(7, y, 17, 0.5, 5.95, 6.45, "glass", "X", { op: 0.75 })),
        ...[60, 66, 72, 78].map(y => B(7, y, 33.5, 0.5, 9.45, 10.45, "glass", "X", { op: 0.75 })),
        // tường thấp bao vườn thiếu nhi
        B(18.5, 82, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(41.2, 82, 0.3, 6, 0, 1.2, "stone", "X", { role: "p" }), B(18.5, 87.7, 23, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 16.5, 25, 33, 41.5]) for (const y of [56, 64, 74, 82]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [6, 15.4, 25]) for (const y of [12, 28, 43.45]) st.push(col(x, y, 0.45, 5.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
