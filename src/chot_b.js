/* ================= Phương án chốt B: Thanh mái dốc, hộp vắt ngang, sân đọc tường thấp (theo ảnh mô hình trắng) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp vắt ngang đầu Bắc (sự kiện, công cộng); thanh dài mái một dốc (thư viện, kho, nhân viên); nhà thấp thiếu nhi + sân tường thấp phía sông
  const BOX1 = [[6, 14], [35, 14], [35, 28], [6, 28]];          // hộp tầng 1
  const BOX2 = [[6, 14], [38.5, 14], [38.5, 28], [6, 28]];      // hộp tầng 2, đua 3,5 m về phía sông
  const BAR = [[6, 28], [22, 28], [22, 84], [6, 84]];           // thanh dài, 2 tầng
  const PAV = [[22, 60], [34, 60], [34, 76], [22, 76]];         // nhà thiếu nhi 1 tầng
  const COURT = [[22, 76], [34, 76], [34, 86], [22, 86]];       // sân đọc ngoài trời, tường thấp 1,2 m
  const zBar = (x, y) => 12.45 - 3 * (y - 28) / 56;             // mái một dốc: +12,45 đầu Bắc → +9,45 đầu Nam
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [BOX1, BAR, PAV],
    rooms: [
      // hộp: khu công cộng, mở được ngoài giờ
      { id: "A2", c: "A2", n: "Trưng bày", r: [6, 14, 8, 11.5], ctl: "sk", nz: 2, occ: 30, d: [["FOYB", 2.4, "o", 0.6]] },
      { id: "WC1", c: "E5", n: "Vệ sinh sảnh (cà phê, trưng bày)", r: [6, 25.5, 8, 2.5], ctl: "sk", nz: 1, wc: KT, d: [["FOYB", 1.0, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy Bắc", r: [14, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOYB", 1.4, "thang"]] },
      { id: "ST2", n: "Thang bộ hộp", r: [18, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["N", 1.2, "tn"], ["FOYB", 1.2, "thang"]] },
      { id: "FOYB", c: "circ", n: "Sảnh chung", r: [14, 20, 8, 8], ctl: "sk", nz: 2, occ: 40, d: [["A1", 4, "o"]] },
      { id: "FOYE", c: "circ", n: "Sảnh vào từ quảng trường", r: [22, 14, 8, 4], ctl: "sk", nz: 2, occ: 30, d: [["N", 2.4, "chinh", 0.5], ["A1", 4, "o"], ["A3", 2, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [22, 18, 8, 10], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["A3", 3, "o"], ["S", 1.6, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [30, 14, 5, 14], ctl: "sk", nz: 3, seat: 32, bar: [[35, 14], [35, 28], 8], d: [["E", 1.8, "tudong", 0.5]] },
      // thanh: thư viện, kho, nhân viên
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 28, 8, 7], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 35, 4, 7.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.6], ["W", 1.0, "nv", 0.12]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [10, 35, 4, 3.75], ctl: "nv", nz: 1, d: [["C4", 1.0, "nv"], ["LOBB", 1.0, "nv"]] },
      { id: "NV1", c: "circ", n: "Hành lang nghiệp vụ", r: [10, 38.75, 4, 3.75], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"], ["E3", 1.0, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 42.5, 8, 8.75], ctl: "nv", nz: 1, d: [["NV1", 1.2, "nv"], ["CS", 1.2, "nv"], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 51.25, 8, 15], ctl: "kho", nz: 0, d: [["C3", 1.0, "nv"], ["W", 1.0, "tn", 0.5]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 66.25, 8, 5], ctl: "kho", nz: 1 },
      { id: "LOBB", c: "circ", n: "Sảnh thư viện", r: [14, 28, 8, 9], ctl: "tv", nz: 2, occ: 40, d: [["FOYB", 1.8, "k"], ["E", 2.0, "tudong", 0.5], ["A4", 3, "o"], ["COR", 2.6, "o"]] },
      { id: "A4", c: "A4", n: "Gửi đồ và mượn trả (thủ thư)", r: [14, 37, 5, 6], ctl: "tv", nz: 2 },
      { id: "COR", c: "circ", n: "Hành lang đọc", r: [19, 37, 3, 13], ctl: "tv", nz: 2, d: [["CS", 1.2, "thang"], ["B6", 2.6, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách Nam", r: [14, 43, 5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["A4", 1.0, "nv"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, bậc ngồi", r: [14, 50, 8, 6.25], ctl: "tv", nz: 1, steps: 6, d: [["B1g", 6, "o"]] },
      { id: "B1g", c: "B1", n: "Đọc mở và kệ", r: [14, 56.25, 8, 14.25], ctl: "tv", nz: 1, d: [["B3", 1.8, "p", 0.5], ["WCL", 1.2, "p"], ["B1p", 2.6, "o"]] },
      { id: "WCL", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [14, 70.5, 5, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "B1p", c: "B1", n: "Góc đọc", r: [19, 70.5, 3, 4], ctl: "tv", nz: 1, d: [["B1h", 2.6, "o"]] },
      { id: "B1h", c: "B1", n: "Bàn đọc", r: [14, 74.5, 8, 3.5], ctl: "tv", nz: 1, d: [["B1w", 3, "o"], ["B1i", 6, "o"]] },
      { id: "B1w", c: "B1", n: "Kệ và bàn đọc (Tây)", r: [6, 71.25, 8, 6.75], ctl: "tv", nz: 1, d: [["STS", 1.2, "thang"]] },
      { id: "STS", n: "Thang bộ Nam", r: [6, 78, 5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["S", 1.2, "tn"]] },
      { id: "B1i", c: "B1", n: "Đọc mở đầu Nam", r: [11, 78, 11, 6], ctl: "tv", nz: 1, d: [["E", 1.6, "tn", 0.5]] },
      // nhà thấp thiếu nhi
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [22, 60, 12, 16], ctl: "tv", nz: 3, seat: 32, d: [["E", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5]] }
    ],
    staff: [
      { x: 25.5, y: 22.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.5, y: 40, t: "Thủ thư mượn trả", sc: ["1", "3", "4"] },
      { x: 28, y: 67, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 9, y: 47, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 39, t: "Nhận sách", sc: ["4"] },
      { x: 12, y: 36.9, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 32.5, y: 16.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [BOX2, BAR],
    rooms: [
      // hộp: phòng đa năng và chuyên đề
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 14, 8, 10], ctl: "sk", nz: 2, seat: 24, d: [["FOYM", 1.2, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh khu sự kiện", r: [6, 24, 8, 4], ctl: "sk", nz: 1, wc: KT, d: [["FOYM", 1.2, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy Bắc", r: [14, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOYM", 1.4, "thang"]] },
      { id: "ST2", n: "Thang bộ hộp", r: [18, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["FOYM", 1.2, "thang"]] },
      { id: "FOYM", c: "circ", n: "Sảnh chờ sự kiện", r: [14, 20, 8, 8], ctl: "sk", nz: 2, occ: 60 },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [22, 14, 12.5, 14], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["FOYM", 2.4, "p", 0.3], ["FOYM", 1.6, "p", 0.85]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [34.5, 14, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [34.5, 20.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      { id: "AV", c: "circ", n: "Phòng điều khiển âm thanh", r: [34.5, 25.25, 4, 2.75], ctl: "sk", nz: 2, d: [["D1", 0.9, "p"]] },
      // thanh: thư viện, nhân viên
      { id: "LOB2", c: "circ", n: "Sảnh tầng 2", r: [14, 28, 8, 4], ctl: "tv", nz: 1, d: [["FOYM", 1.6, "k"], ["B1t2", 4, "o"], ["B5", 1.2, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [6, 28, 8, 12.5], ctl: "tv", nz: 1, seat: 16 },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 40.5, 8, 5], ctl: "nv", nz: 1, d: [["CS", 1.0, "nv"], ["E1", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 45.5, 8, 10], ctl: "nv", nz: 0, d: [["CS", 1.0, "nv"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 58, 8, 20], ctl: "tv", nz: 0, seat: 40, d: [["COR4", 1.2, "p", 0.15], ["STS", 1.2, "thang"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 55.5, 8, 2.5], ctl: "nv", nz: 1, d: [["B1m", 0.9, "nv"]] },
      { id: "STS", n: "Thang bộ Nam", r: [6, 78, 5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["B1s", 1.2, "thang"]] },
      { id: "B1t2", c: "B1", n: "Đọc mở và kệ (Bắc)", r: [14, 32, 8, 11], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B1k", 2.6, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách Nam", r: [14, 43, 5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "B1k", c: "B1", n: "Bàn đọc cạnh thang", r: [19, 43, 3, 7], ctl: "tv", nz: 1, d: [["B1m", 2.6, "o"], ["CS", 1.2, "thang", 0.7]] },
      { id: "B1m", c: "B1", n: "Đọc mở (giữa)", r: [14, 50, 8, 8], ctl: "tv", nz: 1, d: [["COR4", 2.6, "o"]] },
      { id: "COR4", c: "circ", n: "Hành lang học nhóm (đệm cách âm)", r: [14, 58, 3, 20], ctl: "tv", nz: 2, d: [["B1s", 2.6, "o"]] },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [17, 58, 5, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [17, 63, 5, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [17, 68, 5, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [17, 73, 5, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B1s", c: "B1", n: "Đọc mở đầu Nam", r: [11, 78, 11, 6], ctl: "tv", nz: 1 }
    ],
    staff: [
      { x: 9, y: 31.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 10, y: 50, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 18, y: 24, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 36.5, y: 26.6, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotB", code: "B", name: "Thanh mái dốc, hộp vắt ngang, sân đọc tường thấp", from: "ảnh mô hình trắng",
    BOX1, BOX2, BAR, PAV, COURT, zBar,
    // khung vẽ tổng mặt bằng dùng chung với A có vẽ khe; B không có khe nên đẩy ra ngoài khung
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 14, 22, 30, 35], y: [14, 28, 36, 44, 52, 60, 68, 76, 84] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 41], [5.2, 38.8]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [37, 99], [37, 33], [23, 32.5]], [[52, 40], [37, 40], [23.2, 33.2]]],
        event: [[[20, -9], [26, 3], [26, 13]], [[52, 20], [36, 20]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe, dọc bờ sông vào sảnh thư viện" },
      hatch: [COURT],
      labels: [[28, 81, "Sân đọc tường thấp"], [28, 68, "Thiếu nhi"], [22, 21, "Hộp sự kiện"], [14, 60, "Thanh thư viện"]]
    }
  };
  plan.intro = `<p class="lede">Dựng theo ảnh mô hình trắng bạn gửi: một thanh dài hai tầng mái một dốc (thấp +9,45 ở đầu Nam, cao +12,45 ở đầu Bắc), một hộp hai tầng vắt ngang đầu Bắc cao +13,45 có tầng trên đua 3,5 m về phía sông, và một nhà thấp một tầng gắn mặt sông của thanh, bên cạnh là sân đọc ngoài trời có tường thấp 1,2 m. Hộp là khu sự kiện và công cộng chạy được ngoài giờ; thanh là thư viện, kho, nhân viên; nhà thấp là khu thiếu nhi. Thang bộ là khối cam, thang có thang máy là khối tím nhô cao hơn mái.</p>`;
  plan.notes = [
    "Phân khu: hộp đầu Bắc là khu sự kiện và công cộng (sảnh chung, đón tiếp, trưng bày, cà phê, vệ sinh sảnh ở tầng 1; phòng đa năng, bục, kho ghế, chuyên đề, vệ sinh sự kiện ở tầng 2) chạy được ngoài giờ; thanh dài là thư viện, kho và nhân viên; nhà thấp phía sông là thiếu nhi. Ngoài giờ chỉ khóa hai cửa: sảnh chung → sảnh thư viện ở tầng 1 và sảnh chờ sự kiện → sảnh tầng 2 của thanh.",
    "Lối vào: khách sự kiện và khách cà phê vào sảnh từ quảng trường Bắc; người đọc vào thẳng sảnh thư viện từ sân phía sông (cửa kính tự động), hoặc từ sảnh chung qua cửa khóa ngoài giờ; nhân viên và xe giao sách vào từ lối Tây qua phòng tiếp nhận.",
    "Đón tiếp nằm giữa sảnh vào từ quảng trường, sảnh chung và cà phê, nhìn được cả lối lên phòng đa năng và cửa sang thư viện; quầy mượn trả ở đầu thanh, ngay sau cửa sảnh thư viện.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → xử lý → kho đóng → lưu trữ địa phương; sách lên kệ tầng 2 bằng tời sách trong lõi thang Nam sát phòng xử lý. Sách trả từ quầy mượn trả vào lõi thang Nam qua cửa nhân viên rồi xuống phòng xử lý.",
    "Yên tĩnh: phòng đa năng ở tầng 2 của hộp, tách khỏi khu đọc bằng sảnh chờ và hai lõi thang; văn phòng và phòng nhân viên ở tầng 2 phía Tây sát lõi thang Nam; đọc yên tĩnh ở tầng 2 phía Tây xa hộp; bốn phòng học nhóm gom ở góc Đông Nam tầng 2, ngăn với đọc yên tĩnh bằng hành lang đệm.",
    "Thiếu nhi ở nhà thấp tầng 1, mở cửa ra vườn phía sông và ra sân đọc tường thấp; thủ thư thiếu nhi quan sát được cả phòng và sân.",
    "Thoát nạn: tầng 2 có bốn thang bộ (hai ở hộp, hai ở thanh); phòng đa năng có hai cửa ra sảnh chờ, từ đó hai thang xuống tầng 1 và ra quảng trường; cửa khóa ngoài giờ không nằm trên đường thoát của khu sự kiện.",
    "Hộp tầng 2 đua 3,5 m về phía sông (dưới 4 m), dầm công xôn từ hàng cột trục 5, không cần cột chống thêm.",
    "Bãi xe ở đầu Nam: 4 hàng xe máy, 2 chỗ ô tô cho người khuyết tật, 1 chỗ ô tô, giá xe đạp, bốt giữ xe ở cổng. Số chỗ là giả định cần hỏi lại thầy. Xe giao sách vào cổng Tây Nam, chạy theo lối Tây tới cửa cuốn rồi lùi ra; lối Tây đồng thời là đường xe cứu hỏa."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, SH, col } = G.K;
  const coreBox = (id, c, roof) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, roof(x + w / 2, y + h / 2) + 1.6, c, "X", { top: c, lv: 0 }); };
  const boxRoof = () => 13.45;
  plan.idea = {
    id: "chotB", fam: "chot", code: "B", from: "ảnh mô hình trắng", name: "Thanh mái dốc, hộp vắt ngang · bản chốt", rule: "Chủ – phụ, khối cài vuông góc",
    tag: "Thanh dài mái một dốc, hộp sự kiện vắt ngang đầu Bắc đua về phía sông, nhà thiếu nhi thấp và sân đọc tường thấp",
    story: "Dựng theo ảnh mô hình trắng: thanh thư viện dài hai tầng có mái dốc một chiều hạ dần về phía Nam, hộp sự kiện hai tầng cài vuông góc ở đầu Bắc, tầng trên vươn ra phía sông. Bên mặt sông của thanh là nhà thiếu nhi một tầng và sân đọc ngoài trời có tường thấp.",
    why: [["Quy luật hình khối", "Hai khối chính cài vuông góc: thanh dài nằm và hộp vắt ngang cao hơn; mái một dốc hạ về phía Nam làm thanh thấp dần ra phía bãi xe."], ["Khối chính – khối phụ", "Thanh và hộp là khối chính hai tầng; nhà thiếu nhi và sân tường thấp là khối phụ một tầng, thấp hẳn."], ["Nắng và chói", "Mặt Trần Phú của thanh đặc (kho, kỹ thuật, nhân viên); trưng bày nằm phía Tây trong hộp, không nhận nắng trực tiếp; tầng đua của hộp che nắng cho mặt sông của cà phê."], ["Gió và mưa", "Gió hè từ đầu Nam đi dọc mặt sông của thanh và qua sân thiếu nhi; mưa mùa đông từ phía sông được tầng đua của hộp che cho lối vào sảnh và cà phê."], ["Công năng", "Hộp chạy riêng ngoài giờ với lối vào, vệ sinh, thang riêng; chỉ hai cửa khóa ngoài giờ ngăn với thanh thư viện."]],
    kc: { he: "Khung bê tông: thanh lưới 8 × 8 m; hộp có phòng đa năng nhịp 14 m dùng dầm bê tông ứng lực trước; tầng đua 3,5 m là dầm công xôn từ hàng cột trục 5.", nhip: "14 m (phòng đa năng)", cx: "3,5 m (hộp tầng 2 về phía sông)" },
    qa: [["Tầng trên của hộp đua ra có cần cột?", "Đua 3,5 m, dưới mốc 4 m, nên dầm công xôn bê tông từ hàng cột trục 5 đỡ được, không cần cột chống."], ["Phòng đa năng ở tầng 2 có thoát nạn được không?", "Phòng có hai cửa ra sảnh chờ, sảnh chờ có hai thang bộ (một thang có thang máy) xuống thẳng sảnh tầng 1 và ra quảng trường Bắc."]],
    cut: "Thanh: foam cắt vát mái một dốc. Hộp: foam đặt vắt ngang, phần đua 1,75 cm. Nhà thiếu nhi: foam thấp, mái cỏ. Sân: bìa cao 0,6 cm làm tường thấp. Lõi thang: foam cam và tím cao hơn mái 0,8 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[14, 60, 13, "Khối chính · Thanh thư viện mái một dốc", 1], [22, 21, 14.2, "Khối chính · Hộp sự kiện vắt ngang", 1], [28, 68, 5.5, "Khối phụ · Nhà thiếu nhi", 2], [28, 81, 1.4, "Khối phụ · Sân đọc tường thấp", 2], [16, 17, 15.5, "Thang bộ + thang máy"]],
    build() {
      const v = [
        B(6, 14, 29, 14, 0.45, 4.95, "sheet", "A", { fl: 1, role: "m" }),
        B(6, 14, 32.5, 14, 4.95, 13.45, "sheet", "D", { fl: 1, role: "m" }),
        B(6, 28, 16, 56, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        SH(6, 28, 16, 56, 4.95, 9.45, 12.45, "-y", "sheet", "B", { fl: 1, role: "m" }),
        B(22, 60, 12, 16, 0.45, 4.95, "stone", "B", { fl: 1, top: "grass", role: "p" }),
        // tường thấp quanh sân đọc
        B(22, 85.7, 12, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(33.7, 76, 0.3, 9.7, 0, 1.2, "stone", "X", { role: "p" }), B(22, 84, 0.3, 1.7, 0, 1.2, "stone", "X", { role: "p" }),
        coreBox("CN", "violet", boxRoof), coreBox("ST2", "warn", boxRoof), coreBox("CS", "violet", zBar), coreBox("STS", "warn", zBar)
      ];
      const st = [];
      for (const x of plan.grid.x) for (const y of plan.grid.y) {
        const inBox = x <= 35 && y <= 28, inBar = x <= 22 && y >= 28 && y <= 84, inPav = x >= 22 && x <= 34 && y >= 60 && y <= 76;
        if (inBox) st.push(col(x, y, 0.45, 13.45)); else if (inBar) st.push(col(x, y, 0.45, zBar(x, y))); else if (inPav) st.push(col(x, y, 0.45, 4.95));
      }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
