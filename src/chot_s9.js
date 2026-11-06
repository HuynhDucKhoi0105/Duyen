/* ================= Ý tưởng S.9: Chân đế và hộp trên (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // thư viện là khối chính: hộp tầng 2 ở nửa Bắc nối liền phần thư viện tầng 1 phía Tây, Nam; chân đế công cộng là dải thấp phía Đông;
  // hộp trên nằm ở nửa Bắc, ngay trên cửa vào; mái chân đế quanh hộp làm sân thượng cỏ, phần chân đế không bị che lấy sáng mái hướng Bắc
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const PD = R4(6, 14, 35, 53.3);        // chân đế, phần chính
  const PS = R4(6, 67.3, 23.5, 9);       // chân đế, phần thiếu nhi phía Nam
  const UB = R4(6, 15.5, 33, 24);        // hộp thư viện trên, mặt Tây thẳng với phần thư viện tầng 1
  const TERR = R4(29.5, 67.3, 11.5, 9), GARDEN = R4(6, 76.3, 23.5, 10.5);
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1: chân đế ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [PD, PS],
    rooms: [
      // dải Bắc (dưới hộp trên): cửa sổ Bắc nhìn ra quảng trường, sâu 8,5 m
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 14, 3.5, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"], ["C1", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.5, 14, 8.5, 8.5], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [18, 14, 3.5, 8.5], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [21.5, 14, 9, 8.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["A4", 2.4, "k"], ["PC", 2.4, "o"], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [30.5, 14, 10.5, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["N", 1.2, "tn", 0.75]] },
      // dải giữa (dưới hộp trên, không cần cửa sổ): kho, lõi thang, vệ sinh, kỹ thuật, kho sự kiện, hành lang
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 22.5, 12, 10.25], ctl: "kho", nz: 1, d: [["HL", 1.2, "nv"], ["C3", 1.0, "nv"]] },
      { id: "TNW", c: "circ", n: "Lối thoát Tây", r: [6, 32.75, 2.5, 6.75], ctl: "tv", nz: 1, d: [["W", 1.2, "tnbd"]] },
      { id: "STW", n: "Thang bộ Tây", r: [8.5, 32.75, 4, 6.75], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["TNW", 1.2, "thang"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [12.5, 32.75, 5.5, 6.75], ctl: "kho", nz: 1 },
      { id: "HL", c: "circ", n: "Hành lang thư viện (sau cổng từ)", r: [18, 22.5, 3.5, 17], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["WCL1", 1.0, "p"], ["LH", 1.6, "o"], ["LH1", 1.6, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [21.5, 22.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [21.5, 30.5, 4, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "LH", c: "circ", n: "Sảnh thư viện", r: [21.5, 34.5, 4, 5], ctl: "tv", nz: 1, d: [["LH1", 2.4, "o"]] },
      { id: "PC", c: "circ", n: "Hành lang công cộng", r: [25.5, 22.5, 4, 17], ctl: "sk", nz: 2, occ: 30, d: [["WCP", 1.2, "p"], ["FOYE", 2.4, "o"], ["PC2", 2.4, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [29.5, 22.5, 4, 8], ctl: "sk", nz: 1, wc: KT },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [29.5, 30.5, 4, 9], ctl: "sk", nz: 2, occ: 40, d: [["D1", 1.8, "p"], ["D3", 1.2, "p"], ["D2", 1.2, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [33.5, 22.5, 7.5, 7.9], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [33.5, 30.4, 7.5, 2.7], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [33.5, 33.1, 7.5, 2.75], ctl: "sk", nz: 1 },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [33.5, 35.85, 7.5, 3.65], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      // phần chân đế không bị che: mọi phòng lấy sáng mái hướng Bắc
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 39.5, 9, 8.9], ctl: "nv", nz: 0, top: N, d: [["W", 1.2, "tn", 0.5], ["C3", 0.9, "nv"], ["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [15, 39.5, 4.5, 8.9], ctl: "nv", nz: 1, top: N, d: [["HL", 0.9, "nv"]] },
      { id: "LH1", c: "circ", n: "Sảnh đọc tầng 1", r: [19.5, 39.5, 7.5, 8.9], ctl: "tv", nz: 1, top: N, d: [["B1a", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (sảnh đọc lớn)", r: [6, 48.4, 21, 8.5], ctl: "tv", nz: 1, top: N, d: [["W", 1.2, "tnbd", 0.5], ["LC", 2.4, "o"], ["B1b", 2.4, "o"]] },
      { id: "B1b", c: "B1", n: "Đọc mở, sách mới", r: [6, 56.9, 18, 9.3], ctl: "tv", nz: 1, top: N, d: [["W", 1.2, "tnbd", 0.5], ["LC", 1.6, "o"]] },
      { id: "LC", c: "circ", n: "Hành lang thiếu nhi", r: [24, 56.9, 3, 10.4], ctl: "tv", nz: 1, top: N, d: [["B3", 1.8, "p"], ["KB", 0.8, "nv"]] },
      { id: "KB", c: "circ", n: "Kho đệm (tủ sách, xe đẩy)", r: [6, 66.2, 18, 1.1], ctl: "tv", nz: 1, d: [["B1b", 0.9, "nv"]] },
      { id: "PC2", c: "circ", n: "Hành lang sự kiện", r: [27, 39.5, 2.5, 27.8], ctl: "sk", nz: 2, top: N, d: [["D1", 1.8, "p"], ["D4", 1.4, "p"], ["A3", 1.8, "o"], ["E3", 0.9, "nv"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [29.5, 39.5, 11.5, 15.8], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["E", 1.8, "tn", 0.3], ["E", 1.8, "tn", 0.8]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [29.5, 55.3, 11.5, 6], ctl: "sk", nz: 2, seat: 24, top: N, d: [["E", 1.2, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách, ra sân hiên", r: [29.5, 61.3, 11.5, 6], ctl: "sk", nz: 3, seat: 32, top: N, d: [["S", 1.6, "tn", 0.5]] },
      // phần thiếu nhi phía Nam: cửa sổ Nam và mái hướng Bắc, mở ra vườn có tường bao
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [6, 67.3, 2.5, 4], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 0.9, "p"]] },
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [6, 71.3, 2.5, 5], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [8.5, 67.3, 18.5, 9], ctl: "tv", nz: 3, seat: 32, top: N, d: [["S", 1.8, "tnbd", 0.4]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [27, 67.3, 2.5, 6.4], ctl: "nv", nz: 1, top: N, d: [["E", 0.9, "nv"]] },
      { id: "KDS", c: "circ", n: "Kho sân thiếu nhi", r: [27, 73.7, 2.5, 2.6], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] }
    ],
    staff: [
      { x: 26, y: 18, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19.7, y: 18.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 28.2, y: 70, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 64, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 18, y: 71.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13.7, y: 18.4, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.7, y: 18.4, t: "Nhận sách", sc: ["4"] },
      { x: 10.5, y: 44, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 31.5, y: 35, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 37, y: 41.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hộp thư viện đặt trên chân đế, mái răng cưa kính hướng Bắc ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [UB],
    rooms: [
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây)", r: [6, 15.5, 12, 13.4], ctl: "tv", nz: 0, seat: 40, top: N, d: [["H2", 1.6, "p"]] },
      { id: "B1w", c: "B1", n: "Bàn đọc cá nhân (dải Tây)", r: [6, 28.9, 12, 3.85], ctl: "tv", nz: 1, top: N, d: [["H2", 1.6, "o"]] },
      { id: "KW2", c: "circ", n: "Kho sách đọc yên tĩnh", r: [6, 32.75, 2.5, 6.75], ctl: "tv", nz: 1, d: [["B1w", 0.9, "nv"]] },
      { id: "STW", n: "Thang bộ Tây", r: [8.5, 32.75, 4, 6.75], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["B1w", 1.2, "thang"], ["B6", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [12.5, 32.75, 7, 6.75], ctl: "tv", nz: 1, steps: 4, top: N, d: [["LH2", 1.6, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [18, 22.5, 3.5, 10.25], ctl: "tv", nz: 1, d: [["B5", 2.4, "o"], ["CS", 1.4, "thang"], ["WCL2", 1.0, "p"], ["LH2", 1.6, "o"]] },
      { id: "LH2", c: "circ", n: "Lối đọc Tây", r: [19.5, 32.75, 2, 6.75], ctl: "tv", nz: 1, d: [["H4", 1.6, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [21.5, 22.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B5", 1.4, "thang"], ["B1m", 1.4, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [21.5, 30.5, 4, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "H4", c: "circ", n: "Lối đọc giữa", r: [21.5, 34.5, 4, 5], ctl: "tv", nz: 1, d: [["B1m", 1.6, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (dải Bắc, nhìn quảng trường)", r: [18, 15.5, 15.5, 7], seat: 16, ctl: "tv", nz: 1, top: N, d: [["CO4", 1.6, "o"]] },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (dải giữa)", r: [25.5, 22.5, 5.5, 17], ctl: "tv", nz: 1, top: N, d: [["CO4", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang Đông", r: [31, 22.5, 2.5, 17], ctl: "tv", nz: 2 },
      { id: "B1e", c: "B1", n: "Bàn đọc cá nhân (góc Đông Bắc)", r: [33.5, 15.5, 5.5, 6.5], ctl: "tv", nz: 1, top: N, d: [["B5", 1.6, "o"]] },
      { id: "KD2", c: "circ", n: "Kho đệm cách âm", r: [33.5, 22, 5.5, 1], ctl: "tv", nz: 1, d: [["B1e", 0.8, "nv"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [33.5, 23 + 4.125 * i, 5.5, 4.125], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [{ x: 28, y: 26, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS9", code: "S.9", name: "Chân đế và hộp trên", from: "khối vuông",
    levels: [t1, t2],
    grid: { x: [6, 9.5, 18, 21.5, 25.5, 29.5, 33.5, 41], y: [14, 22.5, 30.5, 39.5, 48.4, 56.9, 67.3, 76.3] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 36, y: 72, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 16.5], [5.2, 16.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 8], [26, 8], [26, 13.5]]],
        event: [[[20, -9], [24, 6], [26, 13.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông lên quảng trường, vào sảnh đón tiếp dưới hộp thư viện", event: "Khách sự kiện: từ quảng trường Bắc vào thẳng sảnh đón tiếp" },
      hatch: [TERR, GARDEN],
      labels: [[35, 72, "Sân hiên cà phê"], [17, 82, "Vườn thiếu nhi (tường bao)"], [22, 27, "Hộp thư viện ở trên"], [16, 60, "Thư viện tầng 1"], [34, 50, "Chân đế công cộng"]]
    }
  };
  plan.intro = `<p class="lede">Một chân đế thấp một tầng và một hộp thư viện đặt lên trên. Thư viện là khối chính, chiếm khoảng 3/4 sàn: hộp tầng 2 dài 33 m ở nửa Bắc (sàn đọc dưới mái răng cưa, cao tới +13), nối liền với phần thư viện ở tầng 1 phía Tây và phía Nam (quầy, nghiệp vụ, kho, sảnh đọc, thiếu nhi). Chân đế công cộng chỉ là dải thấp phía Đông: đón tiếp, trưng bày, vệ sinh công cộng, sự kiện, chuyên đề, cà phê. Hộp trên vắt qua đầu Bắc của chân đế, ngay trên cửa vào nhìn ra quảng trường; mái chân đế quanh hộp là sân thượng cỏ. Dưới hộp trên, các phòng có người xếp thành một dải dọc mặt Bắc, phần giữa chỉ có kho, lõi thang, vệ sinh, kỹ thuật. Phần tầng 1 không bị che lấy sáng mái hướng Bắc. Mọi người vào một cửa ở sảnh đón tiếp; khu đọc, kể cả phòng thiếu nhi, nằm sau quầy gửi đồ, mượn trả có cổng từ.</p>`;
  plan.notes = [
    "Đi qua khối A: một cửa vào duy nhất ở mặt Bắc, dưới hộp thư viện. Sảnh đón tiếp nằm giữa hai quầy: rẽ trái (Tây) là quầy gửi đồ, mượn trả có cổng từ, đi tiếp vào hành lang thư viện; đi thẳng (Nam) là hành lang công cộng tới vệ sinh, sảnh sự kiện, phòng đa năng, chuyên đề, cà phê; rẽ phải (Đông) là trưng bày. Sảnh → quầy chỉ vài bước. Phòng thiếu nhi ở cuối hành lang thư viện, sau quầy như mọi phòng đọc khác.",
    "Thang có hệ quả: hai thang của hộp trên (lõi sách giữa nhà và thang Tây) chỉ tới được sau cổng từ. Thang Tây ở tầng 1 chỉ có cửa thoát hiểm có chuông ra lối Tây; lõi sách mở vào hành lang thư viện. Khu sự kiện nằm trọn trong chân đế một tầng, không có thang nào.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → hành lang thư viện → lõi sách có tời đưa thẳng lên tầng 2. Sách trả: quầy mượn trả có cửa nhân viên mở thẳng vào xử lý, không qua khu công cộng.",
    "Vệ sinh: vệ sinh công cộng mở ngoài giờ ở đầu hành lang công cộng, gần sảnh và phòng đa năng; khu đọc có vệ sinh cạnh lõi sách ở cả hai tầng, xếp chồng thẳng hàng; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: dải phòng dưới hộp trên (nghiệp vụ, quầy, đón tiếp, trưng bày) sâu 8,5 m, cửa sổ mặt Bắc nhìn quảng trường. Phần chân đế không bị che lấy sáng mái răng cưa hướng Bắc. Hộp trên là tầng trên cùng, cả sàn đọc lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây là tường đặc, có kỹ thuật, kho, thang.",
    "Không che sáng nhau: hộp trên nằm ở nửa Bắc nên không đổ bóng lên phần chân đế lấy sáng mái; phía Bắc của nó là quảng trường trống.",
    "Tiếng ồn: phòng đa năng, chuyên đề, cà phê dồn về dải Đông của chân đế, ngăn với khu đọc bằng hành lang sự kiện. Phòng đa năng và bục trình bày không nằm dưới phòng đọc nào (trên bục trình bày là học nhóm). Đọc yên tĩnh ở đầu Tây tầng 2, cách học nhóm (đầu Đông) hơn 15 m; thiếu nhi ngăn với khu đọc bằng kho đệm; văn phòng, phòng nhân viên ở giữa kho và sảnh đọc.",
    "Ngoài giờ: hành lang công cộng, sự kiện, cà phê, trưng bày, vệ sinh công cộng chạy riêng; chỉ khóa cửa từ sảnh đón tiếp vào quầy gửi đồ.",
    "Kết cấu: lưới cột khoảng 8 m chạy suốt hai tầng ở nửa Bắc; hộp trên đứng thẳng trên cột tầng 1, không có phần đua (mặt Tây thẳng với tường tầng 1, lùi 1,5 m ở mặt Bắc và 2 m ở mặt Đông); phòng đa năng nhịp 11,5 m dầm thép."
  ];
  /* ---------- khối 3D ---------- */
  const { B, PO, col } = G.K;
  const teeth = (x, y0, w, y1, base, rise, role) => {
    const o = [];
    for (let y = y0; y < y1 - 0.5; y += 4) {
      const h = Math.min(4, y1 - y), yy = y;
      o.push(PO(R4(x, y, w, h), base, (xv, yv) => base + rise * (1 - (yv - yy) / 4), "sheet", "X", { top: "grass", role }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, base, base + rise - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotS9", fam: "chot", code: "S.9", from: "khối vuông", name: "Chân đế và hộp trên", rule: "Hộp thư viện đặt trên chân đế, thư viện chiếm phần lớn khối",
    tag: "Hộp thư viện dài 33 m đặt trên chân đế ở nửa Bắc, nối với phần thư viện tầng 1 phía Tây, Nam; chân đế công cộng thấp phía Đông; mái chân đế quanh hộp làm sân thượng cỏ",
    story: "Một hộp thư viện lớn nằm trên một bục thấp. Bục ở phía Đông là nơi mọi người gặp nhau: sảnh, sự kiện, cà phê, mở cả buổi tối. Thư viện chiếm phần còn lại: tầng 1 phía Tây và phía Nam, rồi cả tầng 2 trong hộp trên, nhìn ra quảng trường. Khách đi vào ngay dưới hộp, gặp sảnh đón tiếp và quầy mượn trả.",
    why: [["Quy luật hình khối", "Một hộp chữ nhật đặt trên một chân đế chữ nhật, hộp trên lùi vào mép Bắc, Đông của chân đế; không có phần đua, không chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Thư viện chiếm khoảng 73% sàn (hộp trên cộng phần thư viện tầng 1, cùng một vật liệu); hộp trên cao +11,45, răng cưa tới +13, gấp đôi chân đế công cộng (+4,95). Chân đế công cộng chỉ còn dải thấp phía Đông."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc hoặc mái răng cưa quay Bắc; mặt Đông, Tây làm đặc."], ["Gió và mưa", "Sân thượng cỏ trên mái chân đế giảm nóng mái; sân hiên cà phê mở về phía sông đón gió Đông Nam."], ["Công năng", "Một cửa vào, sảnh đón tiếp là bản lề; kho, xử lý, quầy, lõi sách đứng cạnh nhau ở góc Tây Bắc nên đường sách ngắn."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; hộp trên đứng trên các cột chạy suốt từ móng ở nửa Bắc; mái hộp trên răng cưa thép nhẹ; mái chân đế bê tông phẳng phủ cỏ có dải răng cưa kính quay Bắc; phòng đa năng dầm thép nhịp 11,5 m.", nhip: "11,5 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Phòng thiếu nhi có lối riêng không?", "Không: thiếu nhi ở cuối hành lang thư viện, sau quầy gửi đồ, mượn trả; cửa ra vườn là cửa có chuông báo, vườn có tường bao."], ["Phần chân đế dưới hộp trên có bí không?", "Không: chỉ dải sâu 8,5 m sát mặt Bắc có người làm việc, có cửa sổ Bắc; phần giữa là kho, thang, vệ sinh, kỹ thuật."], ["Khách sự kiện có lên được khu đọc?", "Không: chân đế phần sự kiện không có thang; hai thang lên hộp trên đều nằm sau cổng từ."]],
    cut: "Tỉ lệ 1:200. Khối thư viện foam trắng: hộp trên cao, mái răng cưa giấy cỏ và mica quay Bắc, phần tầng 1 phía Tây, Nam cùng màu, mái dán giấy cỏ có dải răng cưa mica; chân đế công cộng foam xám thấp ở phía Đông; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 27, 12.6, "Khối chính · Hộp thư viện trên chân đế", 1], [16, 60, 6.2, "Thư viện tầng 1", 1], [34, 55, 6.2, "Khối phụ · Chân đế công cộng", 2], [23.5, 27, 13.6, "Lõi sách", 2]],
    build() {
      const v = [
        B(21.5, 22.5, 4, 8, 0.45, 13.45, "violet", "X", { top: "violet", lv: 0 }),
        B(8.5, 32.75, 4, 6.75, 0.45, 12.95, "warn", "X", { top: "warn", lv: 0 }),
        // khối thư viện (trắng): phần tầng 1 phía Tây và phía Nam, hộp tầng 2 phía Bắc
        B(6, 14, 19.5, 25.5, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 39.5, 21, 27.8, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 67.3, 23.5, 9, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 15.5, 33, 24, 4.95, 11.45, "sheet", "B", { fl: 1, role: "m" }),
        // chân đế công cộng (đá): dải thấp phía Đông, phần dưới hộp trên là sảnh, trưng bày, sự kiện
        B(25.5, 14, 15.5, 25.5, 0.45, 4.95, "stone", "D", { fl: 1, role: "p" }),
        B(27, 39.5, 14, 27.8, 0.45, 4.95, "stone", "D", { fl: 1, role: "p" }),
        ...teeth(6, 15.5, 33, 39.5, 11.45, 1.6, "m"),
        ...teeth(6, 40, 21, 76, 4.95, 1.0, "m"),
        ...teeth(27, 40, 14, 67, 4.95, 1.0, "p"),
        // tường thấp bao vườn thiếu nhi
        B(6, 76.3, 0.3, 10.5, 0, 1.2, "stone", "X", { role: "p" }), B(29.2, 76.3, 0.3, 10.5, 0, 1.2, "stone", "X", { role: "p" }), B(6, 86.5, 23.5, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 39]) for (const y of [15.5, 22.5, 30.5, 39.5]) st.push(col(x, y, 0.45, 11.45));
      for (const x of [6, 14, 22, 29.5, 41]) for (const y of [48.4, 56.9, 67.3]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
