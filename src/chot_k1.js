/* ================= Ý tưởng K.1: Khe bậc thang (khe Hải Vân sửa theo góp ý của thầy) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // khe chéo của A giữ hướng Tây → Đông Nam nhưng bậc theo lưới: mỗi dải nhà là hai hộp 16 m, hộp phía sông lùi xuống Nam 6 m
  // mép khe luôn nằm ngang (mặt Bắc, mặt Nam), các bậc Đông – Tây là tường đặc
  const NBW = [[6, 14], [22, 14], [22, 30], [6, 30]];   // hộp công cộng: đón tiếp, cà phê, trưng bày (tầng 2), 2 tầng
  const NBE = [[22, 20], [39, 20], [39, 36], [22, 36]]; // hộp sự kiện: phòng đa năng, 1 tầng cao ở miệng khe
  const LK1 = [[10.9, 30], [13.9, 30], [13.9, 40], [10.9, 40]]; // cầu kính một tầng: sảnh đón tiếp → quầy kiểm soát
  const MBW = [[6, 40], [22, 40], [22, 56], [6, 56]];   // hộp thư viện Tây
  const MBE = [[22, 46], [39, 46], [39, 62], [22, 62]]; // hộp thư viện Đông: thiếu nhi, tra cứu số
  const LK2 = [[18.5, 56], [22, 56], [22, 66], [18.5, 66]]; // cầu hai tầng qua sân thiếu nhi, cả hai tầng thuộc khu đọc, đáp ngay lõi sách
  const SBW = [[6, 66], [22, 66], [22, 82], [6, 82]];   // hộp nghiệp vụ, đọc yên tĩnh
  const SBE = [[22, 72], [33, 72], [33, 88], [22, 88]]; // hộp kho, văn phòng, đọc tài liệu địa phương
  const ST3E = [[36, 62], [39, 62], [39, 70], [36, 70]]; // tháp thang thoát nạn đầu Đông, khép sân thiếu nhi phía sông
  const SLOT = [[6, 30], [22, 30], [22, 36], [39, 36], [39, 46], [22, 46], [22, 40], [6, 40]];
  const COURT = [[9.5, 56], [22, 56], [22, 62], [36, 62], [36, 70], [39, 70], [39, 72], [22, 72], [22, 66], [9.5, 66]];
  // mái cỏ một dốc, thấp ở mép khe (+9,45), cao ở mặt ngoài (+10,45)
  const zNB = (x, y) => 9.45 + (30 - y) / 16, zNE = (x, y) => 6.45 + (36 - y) / 16;
  const zMW = (x, y) => 9.45 + (y - 40) / 16, zME = (x, y) => 9.45 + (y - 46) / 16;
  const zSW = (x, y) => 9.45 + (y - 66) / 16, zSE = (x, y) => 9.45 + (y - 72) / 16;
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NBW, NBE, LK1, MBW, MBE, LK2, SBW, SBE, ST3E],
    rooms: [
      // hộp công cộng (mở ngoài giờ): khách luôn vào sảnh đón tiếp trước
      { id: "A3", c: "A3", n: "Cà phê sách", r: [6, 14, 9.5, 8], ctl: "sk", nz: 3, seat: 32, bar: [[6.4, 14], [15.1, 14], 8], d: [["A1", 2.4, "o", 0.5], ["N", 1.8, "tudong", 0.4]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng và sự kiện (mở ngoài giờ)", r: [15.5, 14, 2.5, 8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "CE", n: "Thang bộ + thang máy khu sự kiện", r: [18, 14, 4, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CE" }, d: [["FOYE", 1.4, "thang"], ["N", 1.2, "tn"]] },
      { id: "FOYL", c: "circ", n: "Sảnh phụ, lối thoát Tây", r: [6, 22, 3.5, 8], ctl: "sk", nz: 2, d: [["A1", 2.4, "o"], ["W", 1.2, "tn"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [9.5, 22, 9.5, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.5], ["FOYE", 2.4, "o"], ["LK1", 2.4, "o"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [19, 22, 3, 8], ctl: "sk", nz: 2, occ: 40 },
      // hộp sự kiện ở miệng khe (1 tầng): phòng đa năng, bục, kho ghế, kỹ thuật có cửa riêng
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [22, 20, 11, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["FOYE", 2.4, "p", 0.4], ["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5], ["D2", 3, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [33, 20, 6, 4.2], ctl: "sk", nz: 3, d: [["D3", 1.2, "p"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [33, 24.2, 6, 3.1], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [33, 27.3, 6, 8.7], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      // cầu kính qua khe: thuộc khu công cộng, cuối cầu là quầy kiểm soát (khóa ngoài giờ)
      { id: "LK1", c: "circ", n: "Cầu kính qua khe", r: [10.9, 30, 3, 10], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // lõi sách: quầy mượn trả, nghiệp vụ, kho, thang có tời sách quây quanh một sảnh nhỏ
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [6, 40, 2.5, 6], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"], ["C4", 0.9, "nv"], ["N", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [8.5, 40, 5.45, 6], ctl: "tv", ctrl: 1, nz: 2, d: [["LOB", 2.4, "o"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [13.95, 40, 2, 6], ctl: "tv", nz: 1, wc: KT, d: [["LOB", 0.9, "p"]] },
      { id: "B1g", c: "B1", n: "Đọc báo, sách mới", r: [15.95, 40, 6.05, 6], ctl: "tv", nz: 1, d: [["LOB", 1.6, "o"]] },
      { id: "LOB", c: "circ", n: "Sảnh đọc, chân thang", r: [9.25, 46, 12.75, 2], ctl: "tv", nz: 1, d: [["COR1", 1.6, "o"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 46, 3.25, 10], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.55], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.25, 48, 8.25, 8], ctl: "nv", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [17.5, 48, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LOB", 1.4, "thang"], ["C1", 1.2, "nv"], ["LK2", 1.6, "o"]] },
      // hộp thư viện Đông
      { id: "COR1", c: "circ", n: "Hành lang sang thư viện Đông", r: [22, 46, 8, 2], ctl: "tv", nz: 1, d: [["B1c", 1.6, "o"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [22, 48, 8, 14], ctl: "kho", nz: 1, d: [["B1c", 1.0, "nv", 0.8]] },
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (nhìn sông)", r: [30, 46, 9, 16], ctl: "tv", nz: 1, shelf: 0.45 },
      { id: "ST3", n: "Thang thoát nạn đầu Đông", r: [36, 62, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["B1c", 1.2, "thang"], ["E", 1.2, "tnbd"]] },
      // cầu qua sân thiếu nhi (tầng 1 và tầng 2 đều thuộc khu đọc)
      { id: "LK2", c: "circ", n: "Cầu kính qua sân", r: [18.5, 56, 3.5, 10], ctl: "tv", nz: 1, d: [["SLB", 2.4, "o"]] },
      // hộp phía Nam: văn phòng, nghiệp vụ phụ ở phía Tây; sảnh thiếu nhi ở phía Đông
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 66, 12.5, 6.4], ctl: "nv", nz: 0, d: [["NVC", 1.0, "nv"]] },
      { id: "NVC", c: "circ", n: "Hành lang nhân viên", r: [6, 72.4, 12.5, 1.6], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["SLB", 0.9, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 74, 5.4, 8], ctl: "kho", nz: 1, d: [["NVC", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [11.4, 74, 2.6, 8], ctl: "nv", nz: 1, d: [["NVC", 0.9, "nv"]] },
      { id: "NVX", c: "circ", n: "Lối ra nhân viên phía Nam", r: [14, 74, 1.5, 8], ctl: "nv", nz: 1, d: [["NVC", 0.9, "nv"], ["S", 0.9, "nv"]] },
      { id: "STS", n: "Thang bộ + thang máy Nam", r: [15.5, 74, 3, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" }, d: [["NVC", 1.0, "nv"], ["S", 1.0, "tnbd"]] },
      { id: "SLB", c: "circ", n: "Sảnh thiếu nhi, chỗ để xe đẩy", r: [18.5, 66, 3.5, 12], ctl: "tv", nz: 2, d: [["B3", 1.8, "p"], ["WCB", 0.9, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [18.5, 78, 3.5, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [22, 72, 11, 16], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5], ["E", 1.2, "tnbd", 0.5], ["N", 1.4, "tnbd", 0.6]] }
    ],
    staff: [
      { x: 14, y: 26, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 11.2, y: 43, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 7.2, y: 43, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 9, y: 17, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 27, y: 78, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13, y: 52, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.6, y: 51, t: "Nhận sách", sc: ["4"] },
      { x: 12, y: 69, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 27, y: 24, t: "Điều phối sự kiện, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NBW, MBW, MBE, LK2, SBW, SBE, ST3E],
    rooms: [
      // hộp công cộng tầng 2: trưng bày, chuyên đề, phòng nhân viên; chỉ lên bằng thang khu sự kiện
      { id: "A2", c: "A2", n: "Trưng bày", r: [6, 14, 12, 8], ctl: "sk", nz: 2, occ: 30, d: [["D4", 1.4, "p"], ["FOY2", 1.4, "o"]] },
      { id: "CE", n: "Thang bộ + thang máy khu sự kiện", r: [18, 14, 4, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CE" }, d: [["A2", 1.4, "thang"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 22, 9, 8], ctl: "sk", nz: 2, seat: 24 },
      { id: "FOY2", c: "circ", n: "Hành lang đệm", r: [15, 22, 2.3, 8], ctl: "sk", nz: 1, d: [["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [17.3, 22, 4.7, 8], ctl: "nv", nz: 1 },
      // lõi sách tầng 2: kệ mở quây quanh đầu thang có tời sách
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 40, 7.5, 6.5], ctl: "tv", nz: 1, steps: 6, d: [["COR2", 2.4, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [13.5, 40, 2, 6.5], ctl: "tv", nz: 1, wc: KT, d: [["COR2", 0.9, "p"]] },
      { id: "B1h", c: "B1", n: "Kệ mở cạnh thang sách", r: [15.5, 40, 6.5, 6.5], ctl: "tv", nz: 1, d: [["COR2", 1.6, "o"]] },
      { id: "COR2", c: "circ", n: "Sảnh đọc tầng 2", r: [6, 46.5, 16, 1.5], ctl: "tv", nz: 1, d: [["B1i", 2.4, "o"], ["B5", 1.2, "o"]] },
      { id: "B1i", c: "B1", n: "Đọc mở và kệ (nhìn sân)", r: [6, 48, 11.5, 8], ctl: "tv", nz: 1, shelf: 0.45 },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [17.5, 48, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["COR2", 1.4, "thang"], ["LK2", 1.6, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [22, 46, 6, 16], ctl: "tv", nz: 1, seat: 16, d: [["B1e", 2.4, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (nhìn sông)", r: [28, 46, 11, 16], ctl: "tv", nz: 1, shelf: 0.35 },
      { id: "ST3", n: "Thang thoát nạn đầu Đông", r: [36, 62, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["B1e", 1.2, "thang"]] },
      // cầu qua sân
      { id: "LK2", c: "circ", n: "Cầu đọc qua sân", r: [18.5, 56, 3.5, 10], ctl: "tv", nz: 1, d: [["LOB3", 2.4, "o"]] },
      // hộp phía Nam tầng 2: đọc yên tĩnh ở phía Tây, học nhóm ở phía Đông, giữa là sảnh, thang, vệ sinh
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 66, 9.5, 16], ctl: "tv", nz: 0, seat: 40, d: [["LOB3", 1.6, "p"]] },
      { id: "LOB3", c: "circ", n: "Sảnh tầng 2 phía Nam", r: [15.5, 66, 6.5, 8], ctl: "tv", nz: 1, d: [["STS", 1.4, "thang"], ["LOB3b", 2.4, "o"], ["COR4a", 1.6, "o"]] },
      { id: "STS", n: "Thang bộ + thang máy Nam", r: [15.5, 74, 3, 8], ctl: "tv", nz: 1, core: { st: "u+l", link: "STS" } },
      { id: "LOB3b", c: "circ", n: "Lối vệ sinh", r: [18.5, 74, 3.5, 4], ctl: "tv", nz: 1, d: [["WCS2", 0.9, "p"]] },
      { id: "WCS2", c: "E5", n: "Vệ sinh tầng 2 phía Nam", r: [18.5, 78, 3.5, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "COR4a", c: "circ", n: "Hành lang học nhóm", r: [22, 72, 2, 16], ctl: "tv", nz: 2, d: [["B4a", 0.9, "p"], ["B4c", 0.9, "p"], ["COR4b", 2.4, "o"]] },
      { id: "COR4b", c: "circ", n: "Sảnh học nhóm", r: [24, 78, 9, 4], ctl: "tv", nz: 2, d: [["B4b", 0.9, "p"], ["B4d", 0.9, "p"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [24, 72, 4.5, 6], ctl: "tv", nz: 2 },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [28.5, 72, 4.5, 6], ctl: "tv", nz: 2 },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [24, 82, 4.5, 6], ctl: "tv", nz: 2 },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [28.5, 82, 4.5, 6], ctl: "tv", nz: 2 }
    ],
    staff: [
      { x: 25, y: 50, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 12, y: 18, t: "Đón khách tầng 2", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotK1", code: "K.1", name: "Khe bậc thang: hai dải hộp lùi bậc theo khe Hải Vân", from: "A",
    NBW, NBE, MBW, MBE, SBW, SBE, LK1, LK2, ST3E,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 9.5, 14, 22, 28, 33, 39], y: [14, 20, 30, 36, 40, 46, 56, 62, 66, 72, 82, 88] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 51], [5.2, 51]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.3, 96], [40.3, 41], [24, 41], [21, 38], [16.5, 34], [16.5, 30.5]]],
        event: [[[20, -9], [12, 5], [12, 13.5]], [[52, 41], [40, 41], [24, 41], [21, 38], [16.5, 34], [16.5, 30.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào khe tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc qua cà phê, hoặc vào khe tới sảnh đón tiếp" },
      hatch: [SLOT, COURT],
      labels: [[30, 41, "Khe Hải Vân bậc thang"], [28, 67, "Sân thiếu nhi khép kín"], [14, 18, "Hộp công cộng"], [28, 28, "Hộp sự kiện"], [14, 52, "Lõi sách"], [34, 54, "Thư viện Đông"], [11, 78, "Văn phòng, kho tài liệu"]]
    }
  };
  plan.intro = `<p class="lede">Giữ phong cách khe Hải Vân của A: hai dải nhà mái cỏ tách nhau bởi khe gió chạy chéo từ lối Tây ra sông. Khe không cắt xiên mà bậc theo lưới: mỗi dải là hai hộp chữ nhật 16 m, hộp phía sông lùi xuống Nam 6 m, nên khe vẫn đi chéo mà mọi mép khe đều quay Bắc hoặc Nam. Bản sửa ngày 05/11 gom thư viện thành một <b>lõi sách</b> ngay đầu cầu kính: quầy mượn trả có cổng từ, thang có tời sách, vệ sinh, xử lý nghiệp vụ, tiếp nhận và kho đóng nằm sát nhau, kệ mở hai tầng quây quanh. Khách vào sảnh đón tiếp, qua cầu kính 10 m là tới quầy giữ đồ; sách từ kho tới kệ xa nhất chỉ khoảng 29 m.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: cầu kính qua khe dời sang giữa sảnh đón tiếp (x 10,9–13,9), đáp thẳng vào quầy giữ đồ, mượn trả. Tiếp nhận, xử lý nghiệp vụ và kho đóng dời lên hộp thư viện Tây và Đông, sát thang có tời sách. Thiếu nhi dời xuống hộp phía Nam, cạnh sảnh thiếu nhi có vệ sinh thay tã. Đọc yên tĩnh dời sang hộp phía Nam bên Tây, học nhóm sang bên Đông, cách nhau 8,5 m. Văn phòng xuống tầng 1 phía Nam; phòng nhân viên lên tầng 2 hộp công cộng; kỹ thuật vào hộp sự kiện, có cửa riêng ra sông. Bỏ vệ sinh riêng của hộp sự kiện, dùng chung cụm vệ sinh sảnh (cách phòng đa năng 13 m).",
    "Đường sách: xe vào lối Tây → cửa cuốn → tiếp nhận (2 m) → xử lý nghiệp vụ → qua sảnh thang tới kho đóng (9 m) → tời sách lên kệ tầng 2. Sách trả: quầy mượn trả → phòng bảo vệ → tiếp nhận → xử lý, toàn bộ qua cửa nhân viên (14 m). Kho đóng có cửa nhân viên thông thẳng ra kệ mở nhìn sông. Kho tới kệ xa nhất 29 m.",
    "Thang có hệ quả: thang bộ và thang máy nào lên được khu đọc (lõi sách, thang Nam, tháp thang Đông) đều nằm sau quầy mượn trả có cổng từ. Người đọc đi: cửa chính trong khe → sảnh đón tiếp → cầu kính → quầy giữ đồ, mượn trả → sảnh chân thang. Thang khu sự kiện chỉ nối hai tầng hộp công cộng (trưng bày, chuyên đề, phòng nhân viên), không có cửa sang thư viện. Thang Nam ở tầng 1 chỉ mở vào hành lang nhân viên bằng cửa thẻ từ và ra ngoài bằng cửa có chuông báo.",
    "Vệ sinh: cụm sảnh mở ngoài giờ dùng cho sảnh, cà phê và phòng đa năng (cách sảnh 5 m, cách phòng đa năng 13 m). Trong khu đọc có ba chỗ: cạnh lõi sách ở hai tầng (xếp chồng), vệ sinh thay tã sát phòng thiếu nhi (11 m), và vệ sinh tầng 2 phía Nam xếp chồng lên vệ sinh thiếu nhi. Chỗ đọc xa nhất tới vệ sinh 23 m, không phải ra khỏi cổng từ.",
    "Ánh sáng Bắc – Nam: sáu hộp đều sâu 16 m, phòng chạy suốt chiều sâu lấy sáng hai mặt; phòng chỉ chạm một mặt sâu tối đa 8 m. Thang, vệ sinh, kho dồn vào giữa và về hai đầu Đông, Tây; các đầu hộp và bậc của khe là tường đặc. Khe và sân thiếu nhi rộng 10 m, mái cỏ thấp ở mép khe, góc che lớn nhất khoảng 41°. Cầu kính đặt giữa hai cửa sổ nên không che phòng nào.",
    "Tiếng ồn: đọc yên tĩnh ở góc Tây Nam tầng 2, cách học nhóm 8,5 m (giữa là sảnh, thang, vệ sinh), không nằm trên phòng ồn nào (bên dưới là văn phòng và kho tài liệu). Học nhóm có hành lang riêng. Thiếu nhi ở tầng 1 phía Nam, ngăn với các phòng đọc bằng sảnh thiếu nhi và cầu kính. Phòng đa năng một tầng, không có gì chồng lên. Văn phòng, phòng nhân viên không chung vách phòng ồn hay kỹ thuật.",
    "Đón tiếp là bản lề: hai cửa vào (cửa chính trong khe, cửa cà phê phía quảng trường) đều tới sảnh đón tiếp trước. Từ sảnh: rẽ sang sảnh sự kiện và phòng đa năng; thang sự kiện lên trưng bày, chuyên đề; đi thẳng qua cầu kính 14 m tới quầy giữ đồ.",
    "Ngoài giờ: hộp công cộng và hộp sự kiện chạy riêng. Chỉ khóa một cửa là cửa cầu kính → quầy mượn trả; cửa này không nằm trên đường thoát nạn của khu sự kiện.",
    "Thoát nạn: tầng 2 có lõi sách, thang Nam, tháp thang Đông và thang sự kiện; xa nhất tới thang 29,8 m.",
    "Kết cấu: lưới cột 8 m theo phương Đông – Tây, dầm 16 m qua chiều sâu hộp (ứng lực trước, hoặc thêm hàng cột giữa nằm trong vách kệ). Kho đóng nằm ở tầng 1 trên nền, tải kệ không đè lên sàn treo. Phòng đa năng 11 × 16 m mái nhẹ không cột. Không có phần đua, không cần cột chống thêm.",
    "Tổng sàn 2.852 m², dưới mức 3.000 m²."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { PO, B, col } = G.K;
  const zAt = (f, x, y) => f(x, y);
  const coreBox = (id, c, f) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r, top = Math.max(...[[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([a, b]) => zAt(f, a, b))); return B(x, y, w, h, 0.45, top + 1.0, c, "X", { top: c, lv: 0 }); };
  const fa = { N: "kinh", E: "dac", S: "kinh", W: "dac" };
  plan.idea = {
    id: "chotK1", fam: "chot", code: "K.1", from: "A", name: "Khe bậc thang · khe Hải Vân theo lưới", rule: "Lùi bậc theo đường chéo",
    tag: "Hai dải hộp mái cỏ lùi bậc theo khe Hải Vân; mọi mép khe nằm ngang, quay Bắc – Nam; sảnh đón tiếp là bản lề",
    story: "Khe Hải Vân của A vẫn chạy chéo từ lối Tây ra sông, nhưng được xếp lại bằng những hộp chữ nhật lùi bậc như ruộng bậc thang: hộp phía sông lùi xuống Nam 6 m so với hộp phía Tây. Đi trong khe là đi qua một con đèo: rộng 10 m, tới bậc thì thắt lại 4 m rồi mở ra sông. Bên Bắc khe là khu công cộng và sự kiện, bên Nam là thư viện; từ sảnh đón tiếp, một cầu kính bắc qua khe đáp thẳng vào lõi sách, nơi quầy mượn trả, thang có tời sách, nghiệp vụ và kho đóng đứng sát nhau.",
    why: [["Quy luật hình khối", "Sáu hộp chữ nhật đơn giản lùi bậc theo một đường chéo, khe và sân giữa các dải đều rộng 10 m. Đường chéo hiện ra từ cách xếp hộp, không từ mặt cắt xiên."], ["Khối chính – khối phụ", "Bốn hộp thư viện hai tầng là khối chính (hơn 60% sàn); hộp công cộng hai tầng và hộp sự kiện một tầng là khối phụ ở đầu Bắc; hai cầu kính là khối nối."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam; mặt Đông (sông) và mặt Tây (Trần Phú) đặc, thang và kho làm lớp đệm. Mái cỏ dốc về khe giữ cho góc che dưới 45°."], ["Gió và mưa", "Khe và sân thiếu nhi mở về phía sông, đón gió Đông Nam mùa hè; đầu Tây của khe khép bằng cầu kính nên mưa Đông Bắc không lùa dọc khe. Cửa chính lùi vào trong khe, có mái hiên."]],
    kc: { he: "Khung bê tông, lưới cột 8 m theo phương Đông – Tây; dầm 16 m qua chiều sâu hộp (ứng lực trước) hoặc thêm hàng cột giữa trong vách kệ. Phòng đa năng 11 × 16 m mái nhẹ không cột. Hai cầu kính nhịp 10 m tựa hai đầu lên hai hộp.", nhip: "16 m (hộp), 10 m (cầu)", cx: "Không có phần đua" },
    qa: [["Khe có còn chéo không?", "Có: đường nối hai bậc của khe chạy chéo từ Tây Bắc xuống Đông Nam như khe của A, nhưng mỗi đoạn khe là một hình chữ nhật, nên tường hai bên khe quay đúng Bắc – Nam."], ["Khách sự kiện có đi xuyên thư viện không?", "Không: phòng đa năng, trưng bày, chuyên đề, cà phê, vệ sinh đều ở dải phía Bắc khe, vào từ sảnh đón tiếp. Thư viện ở dải phía Nam khe, chỉ nối với sảnh bằng cầu kính có quầy cổng từ ở cuối."], ["Thiếu nhi chơi ngoài sân có mang sách ra được không?", "Sân thiếu nhi khép bởi hai hộp, cầu Tây và hàng rào phía sông, nằm trong vùng đã qua cổng từ; cửa ra vườn là cửa có chuông báo."]],
    cut: "Sáu hộp foam trắng, mái dán giấy cỏ vát dốc về khe (cao 5,0 cm ở mặt ngoài, 4,5 cm ở mép khe; hộp sự kiện 3,5 cm). Hai cầu kính mica. Lõi thang foam tím và cam cao hơn mái 0,5 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[14, 22, 11.2, "Khối phụ · Hộp công cộng", 2], [30, 28, 8, "Khối phụ · Hộp sự kiện", 2], [14, 48, 11.2, "Khối chính · Lõi sách", 1], [30, 54, 11.2, "Khối chính · Thư viện Đông", 1], [14, 74, 11.2, "Khối chính · Đọc yên tĩnh, học nhóm, thiếu nhi", 1], [28, 41, 1.5, "Khe Hải Vân bậc thang"], [12.4, 35, 5.5, "Cầu kính"]],
    build() {
      const v = [
        coreBox("CE", "violet", zNB), coreBox("CS", "violet", zMW), coreBox("STS", "violet", zSW),
        PO(NBW, 0.45, 4.95, "sheet", "A", { fa, fl: 1 }), PO(NBW, 4.95, zNB, "sheet", "A", { fa, fl: 1, top: "grass" }),
        PO(NBE, 0.45, zNE, "sheet", "D", { fa, fl: 1, top: "grass" }),
        PO(MBW, 0.45, 4.95, "sheet", "B", { fa, fl: 1, role: "m" }), PO(MBW, 4.95, zMW, "sheet", "B", { fa, fl: 1, top: "grass", role: "m" }),
        PO(MBE, 0.45, 4.95, "sheet", "B", { fa, fl: 1, role: "m" }), PO(MBE, 4.95, zME, "sheet", "B", { fa, fl: 1, top: "grass", role: "m" }),
        PO(SBW, 0.45, 4.95, "sheet", "C", { fa, fl: 1, role: "m" }), PO(SBW, 4.95, zSW, "sheet", "B", { fa, fl: 1, top: "grass", role: "m" }),
        PO(SBE, 0.45, 4.95, "sheet", "C", { fa, fl: 1, role: "m" }), PO(SBE, 4.95, zSE, "sheet", "E", { fa, fl: 1, top: "grass", role: "m" }),
        B(10.9, 30, 3, 10, 0.45, 4.95, "glass", "L", { fl: 1 }),
        B(18.5, 56, 3.5, 10, 0.45, 9.45, "glass", "L", { fl: 2 }),
        // hàng rào thấp khép sân thiếu nhi phía sông
        B(36, 62, 3, 8, 0.45, 10.45, "warn", "B", { top: "warn", lv: 0, fl: 2, role: "p" }),
        B(33, 71.85, 6, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      const box = [[NBW, zNB], [NBE, zNE], [MBW, zMW], [MBE, zME], [SBW, zSW], [SBE, zSE]];
      for (const [p, f] of box) { const xs = p.map(q => q[0]), ys = p.map(q => q[1]); for (const x of [Math.min(...xs), Math.max(...xs)]) for (const y of [Math.min(...ys), Math.max(...ys)]) st.push(col(x, y, 0.45, f(x, y))); }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
