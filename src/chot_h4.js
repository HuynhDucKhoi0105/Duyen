/* ================= Ý tưởng H.4: Hộp nhỏ chồng lên hộp lớn (hộp xếp, không vỏ bọc) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // một nền thấp một tầng bằng đá (ba thanh nối nhau ở đầu Tây) đỡ hai hộp đọc nhỏ hơn đặt lệch nhau:
  // hộp trắng lệch về sông, hộp gỗ lệch về phố; giữa và cạnh chúng là sân thượng. Sảnh đón tiếp là hộp kính ở bản lề phía Tây.
  const W1 = [[6, 14], [40, 14], [40, 32], [6, 32]];      // thanh nền Bắc: sự kiện, trưng bày, cà phê (một tầng, lấy sáng mái)
  const SP1 = [[6, 32], [14, 32], [14, 42], [6, 42]];     // hộp kính bản lề: sảnh đón tiếp
  const W2 = [[6, 42], [40, 42], [40, 58], [6, 58]];      // thanh nền giữa: quầy mượn trả, thiếu nhi, tra cứu số
  const SP2 = [[6, 58], [8, 58], [8, 67], [6, 67]];       // lối nhân viên đưa sách trả về nghiệp vụ
  const W3 = [[6, 67], [39, 67], [39, 83], [6, 83]];      // thanh nền Nam: nghiệp vụ, kho, văn phòng
  const U2 = [[12, 42], [40, 42], [40, 58], [12, 58]];    // hộp trắng tầng 2 (lệch về sông)
  const U3 = [[6, 67], [34, 67], [34, 83], [6, 83]];      // hộp gỗ tầng 2 (lệch về phố)
  const BR = [[15, 58], [18, 58], [18, 67], [15, 67]];    // cầu kính tầng 2 nối hai hộp
  const SAN1 = [[14, 32], [41.5, 32], [41.5, 42], [14, 42]], VUON = [[8, 58], [40, 58], [40, 67], [8, 67]];
  const zB = 5.45, zU2 = 9.95, zU3 = 9.45;
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 (nền) ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [W1, SP1, W2, SP2, W3],
    rooms: [
      // thanh nền Bắc: khu sự kiện và công cộng, một tầng, lấy sáng cửa mái hướng Bắc
      { id: "A2", c: "A2", n: "Trưng bày", r: [6, 14, 11.25, 8], ctl: "sk", nz: 2, occ: 30, top: "N", d: [["FOY", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [17.25, 14, 8.75, 8], ctl: "sk", nz: 3, seat: 32, top: "N", d: [["FOY", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [26, 14, 2.75, 8], ctl: "sk", nz: 1, d: [["FOY", 1.2, "p"], ["D1", 1.2, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [28.75, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "S", top: "N", d: [["FOY", 1.6, "p"], ["N", 1.8, "tn", 0.5], ["E", 1.8, "tn", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [28.75, 30, 11.25, 2], ctl: "sk", nz: 3, d: [["D1", 4, "o"]] },
      { id: "FOY", c: "circ", n: "Hành lang sự kiện", r: [6, 22, 22.75, 2], ctl: "sk", nz: 2, occ: 60, d: [["W", 1.2, "tn"]] },
      { id: "FOYB", c: "circ", n: "Sảnh chờ sự kiện", r: [6, 24, 8, 8], ctl: "sk", nz: 2, occ: 60, d: [["FOY", 3, "o"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh, sự kiện (mở ngoài giờ)", r: [14, 24, 3, 8], ctl: "sk", nz: 1, wc: KT, d: [["FOYB", 1.2, "p"], ["FOY", 1.0, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [17, 24, 9.85, 8], ctl: "sk", nz: 2, seat: 24, top: "N", d: [["FOY", 1.2, "p"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [26.85, 24, 1.9, 8], ctl: "nv", nz: 1, top: "N", d: [["FOY", 0.9, "nv"]] },
      // hộp kính bản lề: cửa vào duy nhất của khách, rẽ Bắc sang sự kiện, rẽ Nam qua quầy mượn trả
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 32, 8, 10], ctl: "sk", nz: 2, seat: 20, occ: 40, top: "N", d: [["E", 2.4, "chinh", 0.5], ["FOYB", 3, "o"], ["A4", 2.4, "k"]] },
      // thanh nền giữa: quầy mượn trả có cổng từ, thiếu nhi, tra cứu số (hộp trắng chồng lên từ x = 12)
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [6, 42, 6, 5.5], ctl: "tv", ctrl: 1, nz: 2, top: "N", d: [["LOBA", 2.4, "o"], ["RET", 1.0, "nv"]] },
      { id: "RET", c: "circ", n: "Lối sách trả (nhân viên)", r: [6, 47.5, 2, 10.5], ctl: "nv", nz: 1, d: [["LINK", 1.2, "nv"]] },
      { id: "LOBA", c: "B1", n: "Sách mới ngay sau cổng từ", r: [8, 47.5, 4, 3.5], ctl: "tv", nz: 1, top: "N", d: [["COR2", 1.6, "o"]] },
      { id: "B1x", c: "B1", n: "Sách mới (sáng mái)", r: [8, 51, 4, 7], ctl: "tv", nz: 1, top: "N", d: [["LOBA", 2.4, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy thư viện", r: [12, 42, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l", link: "CS" }, d: [["COR2", 1.4, "thang"], ["N", 1.2, "tnbd"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [23, 42, 14, 7], ctl: "tv", nz: 1, seat: 16, bar: [[23.4, 42], [36.6, 42], 3], d: [["COR2", 2.4, "o"]] },
      { id: "B1b", c: "B1", n: "Đọc mở và kệ (nhìn sân)", r: [16, 42, 7, 7], ctl: "tv", nz: 1, d: [["COR2", 2.4, "o", 0.85]] },
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [37, 42, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["COR2", 1.2, "thang"], ["E", 1.2, "tnbd"]] },
      { id: "COR2", c: "circ", n: "Sảnh đọc tầng 1", r: [12, 49, 28, 2], ctl: "tv", nz: 1 },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [12, 51, 3, 7], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["COR2", 1.0, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [15, 51, 25, 7], ctl: "tv", nz: 3, seat: 32, d: [["COR2", 1.8, "p"], ["WCL1", 1.0, "p"], ["S", 1.8, "tnbd", 0.5]] },
      // lối nhân viên qua vườn: từ quầy mượn trả vào thẳng phòng xử lý
      { id: "LINK", c: "circ", n: "Lối nhân viên qua vườn", r: [6, 58, 2, 9], ctl: "nv", nz: 1, d: [["C2", 1.2, "nv"]] },
      // thanh nền Nam: xử lý ở đầu lối nhân viên; tiếp nhận, lõi sách, kho đóng liền nhau ở dãy sau (khu nhân viên, thẻ từ)
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 67, 9.3, 7], ctl: "nv", nz: 1, d: [["COR3", 1.2, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [15.3, 67, 5.2, 7], ctl: "kho", nz: 1, d: [["COR3", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [20.5, 67, 10.3, 7], ctl: "nv", nz: 0, d: [["COR3e", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [30.8, 67, 2.7, 7], ctl: "nv", nz: 1, d: [["COR3e", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [33.5, 67, 5.5, 7], ctl: "nv", nz: 1, d: [["COR3e", 1.0, "nv"]] },
      // hành lang nghiệp vụ chia hai đoạn, mỗi đoạn một cửa ra ngoài ở đầu hồi
      { id: "COR3", c: "circ", n: "Hành lang nghiệp vụ (Tây)", r: [6, 74, 16.5, 2], ctl: "nv", nz: 1, d: [["W", 1.2, "tn"], ["COR3e", 1.6, "nv"]] },
      { id: "COR3e", c: "circ", n: "Hành lang nghiệp vụ (Đông)", r: [22.5, 74, 16.5, 2], ctl: "nv", nz: 1, d: [["E", 1.2, "tn"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 76, 4.3, 7], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.55], ["W", 1.0, "nv", 0.12], ["COR3", 1.2, "nv"]] },
      { id: "ST4", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10.3, 76, 4, 7], ctl: "nv", nz: 1, core: { st: "u+l+b", link: "ST4" }, d: [["COR3", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [14.3, 76, 17, 7], ctl: "kho", nz: 1, d: [["COR3", 1.2, "nv", 0.1], ["ST4", 1.2, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [31.3, 76, 7.7, 7], ctl: "kt", nz: 3, d: [["COR3e", 1.2, "nv"], ["E", 1.4, "nv"]] }
    ],
    staff: [
      { x: 10, y: 37, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 9, y: 44.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 24.8, y: 28, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 21, y: 18, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 27, y: 54.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10.6, y: 70.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 79.5, t: "Nhận sách", sc: ["4"] },
      { x: 25.6, y: 70.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 17, y: 23, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 34, y: 31, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 (hai hộp đọc chồng lên nền) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [U2, BR, U3],
    rooms: [
      // hộp trắng: đọc mở gần lõi và cầu kính; học nhóm gom ở đầu sông, cách đọc mở bằng kho xe sách
      { id: "CS", n: "Thang bộ + thang máy thư viện", r: [12, 42, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l", link: "CS" }, d: [["COR4", 1.4, "thang"]] },
      { id: "B1d", c: "B1", n: "Đọc mở và kệ (Bắc)", r: [16, 42, 6.7, 7], ctl: "tv", nz: 1, d: [["COR4", 2.4, "o", 0.85]] },
      { id: "KS", c: "circ", n: "Kho xe sách (đệm)", r: [22.7, 42, 1.4, 7], ctl: "tv", nz: 1 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [24.1 + 3.225 * i, 42, 3.225, 7], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] })),
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [37, 42, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["COR4", 1.2, "thang"]] },
      { id: "COR4", c: "circ", n: "Sảnh đọc hộp trắng", r: [12, 49, 28, 2], ctl: "tv", nz: 1, d: [["KS", 1.0, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh tầng 2 (trên vệ sinh tầng 1)", r: [12, 51, 2.5, 7], ctl: "tv", nz: 1, wc: KT, d: [["COR4", 1.0, "p"]] },
      { id: "BRL2", c: "B1", n: "Góc đọc đầu cầu", r: [14.5, 51, 3.5, 7], ctl: "tv", nz: 1, top: "N", d: [["COR4", 1.6, "o"], ["BRG", 2.4, "o"]] },
      { id: "B1f", c: "B1", n: "Đọc mở và kệ (Nam)", r: [18, 51, 15.4, 7], ctl: "tv", nz: 1, d: [["COR4", 2.4, "o", 0.15]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, bậc ngồi", r: [33.4, 51, 6.6, 7], ctl: "tv", nz: 1, steps: 5, d: [["COR4", 2.4, "o"]] },
      // cầu kính
      { id: "BRG", c: "circ", n: "Cầu kính qua vườn", r: [15, 58, 3, 9], ctl: "tv", nz: 1, d: [["BRL3", 2.4, "o"]] },
      // hộp gỗ: đọc mở quay Bắc; đọc yên tĩnh quay Nam quanh lõi sách
      { id: "B1h", c: "B1", n: "Đọc mở (Tây Bắc)", r: [6, 67, 6, 7], ctl: "tv", nz: 1, d: [["COR5", 2.4, "o"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh hộp gỗ", r: [12, 67, 2, 7], ctl: "tv", nz: 1, wc: KT, d: [["COR5", 1.0, "p"]] },
      { id: "BRL3", c: "B1", n: "Góc đọc đầu cầu", r: [14, 67, 4, 7], ctl: "tv", nz: 1, top: "N", d: [["COR5", 1.6, "o"]] },
      { id: "B1i", c: "B1", n: "Đọc mở và kệ (Bắc)", r: [18, 67, 16, 7], ctl: "tv", nz: 1, d: [["COR5", 2.4, "o"]] },
      { id: "COR5", c: "circ", n: "Hành lang hộp gỗ", r: [6, 74, 28, 2], ctl: "tv", nz: 1 },
      { id: "B2a", c: "B2", n: "Đọc yên tĩnh (góc Tây)", r: [6, 76, 4.3, 7], ctl: "tv", nz: 0, seat: 8, d: [["COR5", 1.0, "p"]] },
      { id: "ST4", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10.3, 76, 4, 7], ctl: "nv", nz: 1, core: { st: "u+l+b", link: "ST4" }, d: [["COR5", 1.2, "nv"]] },
      { id: "B1k", c: "B1", n: "Bàn đọc cá nhân cạnh lõi sách", r: [14.3, 76, 2.4, 7], ctl: "tv", nz: 1, d: [["COR5", 1.0, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [16.7, 76, 17.3, 7], ctl: "tv", nz: 0, seat: 32, d: [["COR5", 1.2, "p", 0.3]] }
    ],
    staff: [
      { x: 21, y: 54.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH4", code: "H.4", name: "Hộp nhỏ chồng lên hộp lớn", from: "hộp xếp",
    W1, SP1, W2, W3, U2, U3, BR,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 12, 16, 28.75, 40], y: [14, 32, 42, 49, 58, 67, 74, 83] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 79.5], [5.2, 79.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [41, 98], [41, 37], [14.8, 37]]],
        event: [[[20, -9], [30, 4], [41, 8], [41, 37], [14.8, 37]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân đón, qua hộp kính đón tiếp tới quầy thư viện", event: "Khách sự kiện: quảng trường Bắc, theo sân sông vào hộp kính đón tiếp" },
      hatch: [SAN1, VUON],
      labels: [[27, 37, "Sân đón (mở ra sông)"], [26, 63, "Vườn thiếu nhi có tường"], [20, 20, "Nền sự kiện"], [9, 34, "Hộp kính đón tiếp"], [26, 50, "Hộp trắng trên nền"], [20, 76, "Hộp gỗ trên nền"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ các ý tưởng hộp bạn ghim (10.3 ba tầng kéo lệch, 10.7 hộp đá khoét lộ hộp màu), bỏ hộp bọc ngoài: một nền thấp một tầng bằng đá gồm ba thanh nằm ngang nối ở đầu Tây, trên nền đặt hai hộp đọc nhỏ hơn, lệch nhau, khác vật liệu (hộp trắng lệch về sông, hộp gỗ lệch về phố), chừa lại sân thượng ở hai đầu. Sảnh đón tiếp là hộp kính nhỏ ở bản lề phía Tây, là cửa vào duy nhất: rẽ Bắc là khu sự kiện, rẽ Nam qua quầy mượn trả có cổng từ là thư viện. Theo góp ý của thầy: thanh nền Bắc chỉ một tầng nên lấy sáng cửa mái hướng Bắc; các phòng dưới hai hộp lấy sáng mặt Bắc hoặc Nam, sâu tối đa 7 m; mặt Đông, Tây đặc; sân đón rộng 10 m, vườn giữa hai thanh dưới rộng 9 m. Bản sửa 05/11: kho, xử lý, lõi sách có tời gom ở đầu Tây thanh nền Nam, ngay cuối lối nhân viên từ quầy mượn trả, nên sách đi ngắn.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: hộp kính đón tiếp nằm giữa thanh sự kiện và thanh thư viện, cửa vào từ sân đón mở ra sông. Đi Bắc là sảnh chờ sự kiện; đi Nam là quầy gửi đồ, mượn trả có cổng từ. Không có cửa nào khác cho khách vào nhà.",
    "Ánh sáng Bắc – Nam: thanh nền Bắc không có gì chồng lên, nên trưng bày, cà phê, chuyên đề, phòng đa năng lấy sáng bằng dải cửa mái răng cưa hướng Bắc, ánh sáng dịu, không nắng gắt. Hai thanh dưới hai hộp đọc chia hai dãy phòng sâu 7 m hai bên hành lang 2 m, mỗi phòng quay một mặt Bắc hoặc Nam. Đầu Đông, Tây các thanh là tường đặc.",
    "Không che sáng nhau: sân đón phía Bắc rộng 10 m, vườn thiếu nhi giữa hai thanh dưới rộng 9 m. Nền chỉ cao +5,45, hộp trắng +9,95, hộp gỗ +9,45; góc che lớn nhất từ cửa sổ tầng 1 khoảng 43°, dưới mốc 45°. Lối nhân viên và cầu kính nằm trước phòng không cần cửa sổ (vệ sinh, kho lưu trữ, góc đọc lấy sáng mái).",
    "Bảo mật sách: thang thư viện (lõi tím đầu Tây hộp trắng) chỉ mở vào sảnh đọc sau cổng từ; cửa ra sân ở chân thang là cửa có chuông báo. Hộp gỗ chỉ đi tới bằng cầu kính từ hộp trắng; thang trong hộp gỗ là thang nhân viên, cửa thẻ từ cả hai tầng. Khu sự kiện một tầng, không có thang. Cửa thiếu nhi ra vườn có chuông.",
    "Ngoài giờ: thanh nền Bắc và hộp kính đón tiếp chạy riêng (sảnh, trưng bày, cà phê, vệ sinh, phòng đa năng, chuyên đề). Chỉ khóa cửa từ đón tiếp vào quầy mượn trả; phòng đa năng có hai cửa thoát thẳng ra ngoài.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → xử lý (7 m) → kho đóng (9 m), lưu trữ; kho đóng có cửa thẳng vào lõi sách (thang bộ, thang máy, tời sách) ngay bên cạnh, sách lên kệ hộp gỗ rồi qua cầu kính sang hộp trắng (kệ xa nhất 49 m kể cả lên tầng). Sách trả từ quầy mượn trả đi lối nhân viên dọc tường Tây, qua vườn, vào thẳng phòng xử lý (25 m), không qua khu công cộng hay khu đọc.",
    "Yên tĩnh: đọc yên tĩnh ở mặt Nam tầng 2 hộp gỗ, quanh lõi sách, xa khu sự kiện hai sân và một thanh. Học nhóm gom ở đầu phía sông của hộp trắng, ngăn với phòng đọc mở bằng kho xe sách và hành lang. Thiếu nhi ở tầng 1 thanh giữa, có cửa thẳng vào vệ sinh thay tã, ngăn với phòng đọc bằng hành lang, mở ra vườn có tường bao. Văn phòng, phòng nhân viên ở mặt Bắc thanh nền Nam, cách kỹ thuật bằng hành lang.",
    "Vệ sinh và thang: vệ sinh sảnh, sự kiện ngay cạnh sảnh chờ sự kiện (từ đón tiếp 11 m, từ phòng đa năng 19 m); vệ sinh thư viện tầng 1 cạnh thiếu nhi, vệ sinh hộp trắng chồng đúng lên trên; hộp gỗ có vệ sinh riêng. Thang thư viện (lõi tím đầu Tây hộp trắng) mở ngay sau quầy; lõi sách hộp gỗ là thang nhân viên, cửa thẻ từ.",
    "Sửa ngày 05/11 (đi lại gọn): phòng xử lý dời ra đầu lối nhân viên qua vườn, nên sách trả từ quầy về xử lý còn 25 m (trước 44 m); lõi sách có tời dời sát kho đóng, có cửa thẳng vào kho; tiếp nhận cạnh xử lý (7 m, trước 16 m); phòng đọc mở tầng 1 dời về cạnh lõi thư viện; cầu kính dời sang trục x = 15–18 để không đè lên cửa sổ phòng xử lý; vườn còn 9 m (góc che 43°) nên lối nhân viên ngắn hơn; học nhóm có kho đệm; vệ sinh sự kiện dời sát sảnh (từ đón tiếp 11 m, trước 30 m); thiếu nhi có cửa thẳng vào vệ sinh (12 m, trước 18 m); kho đóng tới kệ xa nhất 49 m (trước 78 m); phòng nhân viên không còn sát phòng kỹ thuật. Thêm thang thoát nạn Đông (lõi cam, đầu phía sông của hộp trắng, cửa ra ngoài ở tầng 1 có chuông báo) và chia hành lang nghiệp vụ thành hai đoạn có cửa ra hai đầu hồi, nên đường thoát xa nhất còn 26,8 m tầng 1 và 28,0 m tầng 2 (trước 33,0 và 35,1 m); diện tích lấy từ tra cứu số, phòng đọc tầng 1 và đọc yên tĩnh, sảnh sau cổng từ thành góc sách mới.",
    "Kết cấu: hai hộp đọc đặt đúng trên lưới cột của nền, không đua ra ngoài nên không cần cột chống thêm; phòng đa năng 11,25 × 16 m trong thanh một tầng, dầm nhịp 11,25 m đỡ mái răng cưa. Cầu kính dầm thép nhịp 10 m tựa hai hộp.",
    "Bãi xe giữ như A ở đầu Nam. Xe giao sách vào cổng Tây Nam, theo lối Tây tới cửa cuốn ở đầu Tây thanh nền Nam."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, col } = G.K;
  const core = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  // dải cửa mái răng cưa trên thanh nền Bắc: mặt kính quay về phía Bắc
  const saw = [];
  for (let y = 14; y < 32 - 0.1; y += 3) saw.push(B(6.5, y, 33, 0.25, zB, zB + 1.1, "glass", "X", { role: "p" }));
  plan.idea = {
    id: "chotH4", fam: "chot", code: "H.4", from: "hộp xếp", name: "Hộp nhỏ chồng lên hộp lớn", rule: "Nền thấp đỡ hai hộp lệch nhau",
    tag: "Nền đá một tầng ba thanh; hộp trắng và hộp gỗ chồng lên, lệch nhau; hộp kính đón tiếp ở bản lề; cầu kính tầng 2",
    story: "Giữ cái bạn thích ở các ý tưởng hộp chồng: hộp nhỏ đặt lên hộp lớn, lệch nhau, khác vật liệu, nhưng không có hộp bọc ngoài. Nền đá thấp một tầng ôm hai sân; trên nền đặt hai hộp đọc, một hộp trắng lệch về sông, một hộp gỗ lệch về phố, nối bằng cầu kính. Khách vào qua hộp kính đón tiếp ở bản lề phía Tây.",
    why: [["Quy luật hình khối", "Hai lớp: nền đá thấp (+5,45) và hộp đọc (+9,45 đến +9,95). Hai hộp trên lệch nhau 6 m theo phương Đông – Tây, chừa sân thượng ở hai đầu; hộp kính nhỏ ở bản lề."], ["Khối chính – khối phụ", "Hai hộp đọc là khối chính, nổi lên trên nền; nền, hộp kính, cầu kính, lõi thang là khối phụ."], ["Nắng và chói", "Mọi phòng có người lấy sáng mặt Bắc, mặt Nam hoặc cửa mái hướng Bắc; đầu hồi Đông, Tây đặc."], ["Gió và mưa", "Hai sân mở về phía sông đón gió Đông Nam; sân đón có mái hiên dọc hộp kính."], ["Công năng", "Một cửa vào, đón tiếp chia hai ngả; khu sự kiện một tầng chạy riêng ngoài giờ; khu đọc qua quầy có cổng từ; nghiệp vụ, kho ở thanh nền Nam cạnh lối Tây."]],
    kc: { he: "Nền khung bê tông lưới cột theo hành lang giữa từng thanh; hai hộp đọc đặt đúng trên lưới cột nền. Phòng đa năng trong thanh một tầng, dầm nhịp 11,25 m. Cầu kính dầm thép nhịp 10 m.", nhip: "11,25 m (phòng đa năng)", cx: "Không" },
    qa: [["Thanh sự kiện một tầng có đủ cao cho phòng đa năng?", "Sàn tới mái 5 m, cộng cửa mái răng cưa 1,1 m; đủ cho hội sách và nói chuyện, không cần sân khấu."], ["Sân thượng dùng để làm gì?", "Mái nền phía Tây hộp trắng và phía Đông hộp gỗ trồng cỏ, là mái xanh nhìn từ hai hộp đọc; mái thanh sự kiện là dải cửa mái răng cưa."]],
    cut: "Nền: foam xám đá cao 2,5 cm, ba thanh nối đầu Tây. Hộp trắng 28 × 16 × 2,5 cm và hộp gỗ 28 × 16 × 2,3 cm (tỷ lệ 1/200, mét chia 2) đặt lên nền, lệch nhau. Hộp kính đón tiếp và cầu kính bằng mica. Cửa mái răng cưa bằng dải mica nghiêng.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[20, 20, zB + 1.4, "Khối phụ · Nền sự kiện, cửa mái", 2], [26, 50, zU2 + 0.3, "Khối chính · Hộp trắng", 1], [20, 76, zU3 + 0.3, "Khối chính · Hộp gỗ", 1], [10, 37, zB + 0.3, "Hộp kính đón tiếp", 2], [16.5, 63, 9, "Cầu kính", 2], [27, 37, 0.6, "Sân đón", 2], [26, 63, 0.6, "Vườn thiếu nhi", 2]],
    build() {
      // lõi và hộp trên đặt trước nền để phép kiểm góc che gặp khối cao nhất trước
      const v = [
        core(t1, "CS", "violet", zU2 + 1.6), core(t1, "ST4", "violet", zU3 + 1.6), core(t1, "STE", "warn", zU2 + 1.6),
        B(12, 42, 28, 16, 4.95, zU2, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 67, 28, 16, 4.95, zU3, "deck", "B", { fl: 1, role: "m" }),
        B(15, 58, 3, 9, 4.95, 8.95, "glass", "L", { fl: 1, role: "p" }),
        B(6, 14, 34, 18, 0.45, zB, "stone", "D", { fl: 1, role: "p" }),
        B(6, 32, 8, 10, 0.45, zB, "glass", "A", { fl: 1, role: "p" }),
        B(6, 42, 34, 16, 0.45, 4.95, "stone", "B", { fl: 1, role: "m" }),
        B(6, 58, 2, 9, 0.45, 4.2, "stone", "L", { fl: 1, role: "p" }),
        B(6, 67, 33, 16, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        // mái nền phần không có hộp chồng
        B(6, 42, 6, 16, 4.95, zB, "stone", "X", { role: "p" }), B(34, 67, 5, 16, 4.95, zB, "stone", "X", { role: "p" }),
        // tường vườn thiếu nhi phía sông
        B(39.7, 58, 0.3, 9, 0, 1.8, "stone", "X", { role: "p" }),
        ...saw
      ];
      const st = [];
      for (const x of [6, 12, 20, 28.75, 40]) for (const y of [14, 22, 24, 32]) st.push(col(x, y, 0.45, zB));
      for (const x of [6, 12, 20, 28, 40]) for (const y of [42, 49, 51, 58]) st.push(col(x, y, 0.45, x >= 12 ? zU2 : zB));
      for (const x of [6, 14, 22, 30, 39]) for (const y of [67, 74, 76, 83]) st.push(col(x, y, 0.45, x <= 34 ? zU3 : zB));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
