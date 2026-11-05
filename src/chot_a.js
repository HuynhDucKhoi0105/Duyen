/* ================= Phương án chốt A: Khe chéo đón gió Đông Nam (từ 2.1) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // khe chéo: mép Bắc yN(x), mép Nam yS(x) = yN + 6; lưới cột 8 m: x 6 · 14 · 22 · 30
  const yN = x => 40 + (x - 6) * 2 / 3, yS = x => yN(x) + 6;
  const NW = [[6, 14], [30, 14], [30, 56], [6, 40]];            // cánh Bắc tầng 1 (khu sự kiện, công cộng)
  const NM = [[6, 28], [30, 28], [30, 56], [6, 40]];            // cánh Bắc tầng 2 (trên khối giữa)
  const SW = [[6, 46], [30, 62], [30, 86], [6, 86]];            // cánh Nam (thư viện, kho, nhân viên)
  const bridge = x => [[x, yN(x)], [x + 4, yN(x + 4)], [x + 4, yS(x + 4)], [x, yS(x)]];
  const BR1 = bridge(14), BR2 = bridge(24);
  const zN = (x, y) => 13.45 - 0.12 * (x - 8) - 0.05 * (y - 14), zS = (x, y) => 15.95 - 0.12 * (x - 8) - 0.05 * (86 - y);
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NW, SW],
    rooms: [
      // cánh Bắc: khu sự kiện chạy riêng ngoài giờ
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 14, 19, 9.6], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.35], ["W", 1.6, "tn", 0.5], ["FOY1", 2.4, "p", 0.45], ["D2", 4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [25, 14, 5, 5.4], ctl: "sk", nz: 3 },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [25, 19.4, 5, 4.2], ctl: "sk", nz: 1, d: [["D2", 1.2, "p"], ["FOY1", 1.6, "p"]] },
      { id: "FOY1", c: "circ", n: "Sảnh sự kiện", r: [6, 23.6, 24, 4.4], ctl: "sk", nz: 2, occ: 60, d: [["E", 2.4, "tudong", 0.5]] },
      { id: "STN", n: "Thang bộ Tây Bắc", r: [6, 28, 5, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["W", 1.2, "tn"]] },
      { id: "COR1", c: "circ", n: "Hành lang vệ sinh, lối ra khe", r: [11, 28, 3, 20], ctl: "sk", nz: 2, d: [["FOY1", 2.4, "o"], ["X", 1.4, "tn", 0.5]] },
      { id: "WCN", c: "E5", n: "Vệ sinh khu sự kiện", r: [6, 35, 5, 10], ctl: "sk", nz: 1, wc: KT, d: [["COR1", 1.2, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy Bắc", r: [14, 28, 5, 7], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["FOY1", 1.4, "thang"]] },
      { id: "FOY2", c: "circ", n: "Sảnh trưng bày", r: [19, 28, 3, 7], ctl: "sk", nz: 2, d: [["FOY1", 2.6, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [14, 35, 8, 11.34], ctl: "sk", nz: 2, occ: 30, fr: [14.4, 35.2, 7.4, 9.6], d: [["FOY2", 2.6, "o"], ["FOY3", 1.6, "o"], ["COR1", 1.4, "p", 0.3]] },
      { id: "FOY3", c: "circ", n: "Sảnh sự kiện phía sông", r: [22, 28, 8, 9], ctl: "sk", nz: 2, occ: 40, d: [["FOY1", 7, "o"], ["E", 2.4, "chinh", 0.5], ["D4", 1.2, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [22, 37, 8, 9.34], ctl: "sk", nz: 2, seat: 24, d: [["E", 1.2, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [15.5, 46.34, 14.5, 9.66], ctl: "sk", nz: 3, seat: 32, fr: [20, 46.34, 10, 7.4], bar: [[15.5, 46.34], [30, 56], 6], d: [["A2", 3, "o"], ["E", 1.6, "tudong", 0.4], ["X", 1.6, "tn", 0.7]] },
      // cánh Nam: thư viện, kho, nhân viên
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 46, 8, 9.5], ctl: "kt", nz: 3, fr: [6.2, 51.5, 7.6, 3.8], d: [["W", 1.4, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 55.5, 4, 7.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.6], ["W", 1.0, "nv", 0.12]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [10, 55.5, 4, 3.75], ctl: "nv", nz: 1, d: [["C4", 1.0, "nv"], ["A1", 1.0, "nv"]] },
      { id: "NV1", c: "circ", n: "Hành lang nghiệp vụ", r: [10, 59.25, 4, 3.75], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"], ["E3", 1.0, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 63, 8, 8.75], ctl: "nv", nz: 1, d: [["NV1", 1.2, "nv"], ["CS", 1.2, "nv"], ["C1", 1.2, "nv"], ["C3", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 71.75, 8, 14.25], ctl: "kho", nz: 0, d: [["S", 1.0, "tn", 0.3]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [14, 51.33, 16, 10.34], ctl: "tv", nz: 2, seat: 20, occ: 40, fr: [14.4, 56.4, 13.6, 5.1], d: [["X", 2.4, "tudong", 0.62], ["A4", 3, "o"], ["CORS", 2.4, "o"], ["CS", 1.4, "thang"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách Nam", r: [14, 61.67, 5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ và mượn trả (thủ thư)", r: [19, 61.67, 4.3, 7], ctl: "tv", nz: 2 },
      { id: "CORS", c: "circ", n: "Hành lang thiếu nhi", r: [23.3, 61.67, 2.7, 7], ctl: "tv", nz: 2, d: [["E5L", 1.2, "p"], ["B3", 1.8, "p"]] },
      { id: "E5L", c: "E5", n: "Vệ sinh thư viện, phòng thay tã", r: [26, 61.67, 4, 7], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [14, 68.67, 5, 7.6], ctl: "kho", nz: 1 },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [14, 76.27, 5, 4], ctl: "nv", nz: 1, d: [["STS", 0.9, "nv"]] },
      { id: "STS", n: "Thang bộ Nam", r: [14, 80.27, 5, 5.73], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["S", 1.2, "tn"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [19, 68.67, 11, 17.33], ctl: "tv", nz: 3, seat: 32, d: [["E", 1.8, "tn", 0.55]] }
    ],
    staff: [
      { x: 18.5, y: 57.3, t: "Lễ tân", sc: ["1", "3", "4"] },
      { x: 21, y: 66.6, t: "Thủ thư mượn trả", sc: ["1", "3", "4"] },
      { x: 26.5, y: 72, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 9, y: 66, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 58.6, t: "Nhận sách", sc: ["4"] },
      { x: 12, y: 57.4, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 27.5, y: 48.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 26, y: 31, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 27.5, y: 21.5, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 24, y: 41, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NM, SW, BR1, BR2],
    rooms: [
      { id: "STN", n: "Thang bộ Tây Bắc", r: [6, 28, 5, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["LOB2", 1.2, "thang"]] },
      { id: "LOB2", c: "circ", n: "Sảnh thang", r: [11, 28, 3, 7], ctl: "tv", nz: 1, d: [["B1n1", 2.6, "o"]] },
      { id: "CN", n: "Thang bộ + thang máy Bắc", r: [14, 28, 5, 7], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["LOB2", 1.2, "k"], ["B1n2", 1.4, "k"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [19, 28, 11, 9], ctl: "tv", nz: 1, seat: 16, d: [["B1n2", 1.2, "p", 0.5], ["B1n3", 1.4, "p", 0.5]] },
      { id: "B1n1", c: "B1", n: "Đọc mở và kệ (Tây)", r: [6, 35, 8, 10.33], ctl: "tv", nz: 1, seat: 18, shelf: 0.35, d: [["B1n2", 4, "o"]] },
      { id: "B1n2", c: "B1", n: "Đọc mở (giữa)", r: [14, 35, 5, 13.67], ctl: "tv", nz: 1, seat: 12, d: [["B6", 5, "o"], ["BR1", 3.6, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, bậc ngồi", r: [19, 37, 4, 14.33], ctl: "tv", nz: 1, steps: 6, d: [["B1n3", 5, "o"]] },
      { id: "B1n3", c: "B1", n: "Đọc mở nhìn sông", r: [23, 37, 7, 19], ctl: "tv", nz: 1, seat: 20, d: [["BR2", 3.6, "o"]] },
      { id: "BR1", c: "circ", n: "Cầu kính 1", p: BR1, ctl: "tv", nz: 1, noclip: 1, d: [["B1t", 3.6, "o"]] },
      { id: "BR2", c: "circ", n: "Cầu kính 2", p: BR2, ctl: "tv", nz: 1, noclip: 1, d: [["B1t", 3.6, "o"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 46, 8, 7.91], ctl: "nv", nz: 1, fr: [6.3, 51.4, 7.4, 2.3], d: [["E1", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 53.91, 8, 10.5], ctl: "nv", nz: 0, d: [["CS", 1.0, "nv"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 64.41, 8, 21.59], ctl: "tv", nz: 0, seat: 40 },
      { id: "B1t", c: "B1", n: "Đọc mở (cạnh khe)", r: [14, 51.33, 16, 10.34], ctl: "tv", nz: 1, seat: 14, fr: [14.4, 56.6, 13.6, 4.8], d: [["CS", 1.4, "thang"], ["B1s", 9, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách Nam", r: [14, 61.67, 5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WC2", c: "E5", n: "Vệ sinh tầng 2", r: [14, 68.67, 5, 3], ctl: "tv", nz: 1, wc: KT, d: [["B1s", 1.0, "p"]] },
      { id: "B1e", c: "B1", n: "Bàn đọc cá nhân", r: [14, 71.67, 5, 8.6], ctl: "tv", nz: 0, seat: 12, d: [["B1s", 3, "o"], ["B2", 1.2, "p"], ["STS", 1.2, "thang"]] },
      { id: "STS", n: "Thang bộ Nam", r: [14, 80.27, 5, 5.73], ctl: "tv", nz: 1, core: { st: "u", link: "STS" } },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (Nam)", r: [19, 61.67, 11, 14.33], ctl: "tv", nz: 1, seat: 24, shelf: 0.45, d: [["COR4", 1.5, "o"]] },
      { id: "COR4", c: "circ", n: "Hành lang học nhóm", r: [23.75, 76, 1.5, 10], ctl: "tv", nz: 2 },
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [19, 76, 4.75, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [19, 81, 4.75, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [25.25, 76, 4.75, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [25.25, 81, 4.75, 5], ctl: "tv", nz: 2, d: [["COR4", 0.9, "p"]] }
    ],
    staff: [
      { x: 22, y: 31.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 10, y: 58, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const plan = {
    id: "chotA", code: "A", name: "Khe chéo đón gió Đông Nam", from: "2.1", NW, NM, SW, BR1, BR2, yN, yS, zN, zS,
    levels: [t1, t2],
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 11, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }]
    }
  };
  plan.grid = { x: [6, 14, 22, 30], y: [14, 22, 30, 38, 46, 54, 62, 70, 78, 86] };
  /* ---------- bãi xe: 4 hàng xe máy (0,8 × 2,0 m) quay ra 2 lối đi 2,5 m, 3 chỗ ô tô (2 cho người khuyết tật), xe đạp ---------- */
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  plan.site = {
    ...plan.site,
    hatch: [[[6, yN(6)], [30, yN(30)], [30, yS(30)], [6, yS(6)]]],
    labels: [[20, yN(20) + 3, "KHE GIÓ · lối vào thư viện", "accent"], [18, 30, "Cánh Bắc · sự kiện, cà phê, trưng bày"], [18, 74, "Cánh Nam · thư viện, kho, nhân viên"]],
    park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
    routes: {
      delivery: [[[3, 112], [3, 104], [3, 63], [5.2, 60.5]]],
      fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [30, 7]]],
      moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
      lib: [[[30, 103], [36, 99], [36, 62], [26.5, 58.5]], [[52, 58], [34, 59.5]]],
      event: [[[20, -9], [20, 3], [31.5, 25.8]], [[52, 32], [31.5, 32.5]]]
    }
  };
  plan.intro = `<p class="lede">Giữ đúng khối 2.1 bạn chốt: hai cánh mái cỏ dốc, khe chéo rộng 6 m mở đúng hướng gió Đông Nam. Đã đổi bốn điểm: bỏ cầu thang ngoài trời giữa khe (khe để trống hoàn toàn cho gió và lối đi); cánh nhà mở rộng 2 m về phía lối Tây (từ x = 8 thành x = 6, lối Tây vẫn đủ 6 m) để lưới cột chẵn 8 × 8 m và đủ diện tích đề; trưng bày vào trong nhà, không nhận nắng trực tiếp; cà phê đặt ở miệng khe phía sông, bên phải khi nhìn từ khe. Thang bộ, thang máy là các khối riêng màu cam và tím nhô cao hơn mái để dễ nhìn trên mô hình.</p>`;
  plan.notes = [
    "Phân khu: cánh Bắc là khu sự kiện và công cộng (phòng đa năng, bục, kho ghế, chuyên đề, trưng bày, cà phê, vệ sinh riêng) chạy được ngoài giờ; cánh Nam là thư viện, kho và nhân viên. Khe gió ngăn hai khu ở tầng 1, nên ngoài giờ chỉ cần khóa hai cửa ở đầu thang Bắc tầng 2.",
    "Lối vào: khách sự kiện vào từ quảng trường Bắc và sân ven sông (cửa kính tự động sảnh sự kiện, lối chính phía sông); người đọc vào thư viện từ trong khe, dưới hai cầu kính (cửa kính tự động vào sảnh đón tiếp); nhân viên và xe giao sách vào từ lối Tây qua phòng tiếp nhận.",
    "Đón tiếp nằm ngay cửa khe, nhìn thẳng tới quầy mượn trả, thang Nam và hành lang thiếu nhi; quầy lễ tân quan sát được cửa vào và lối lên tầng 2.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → xử lý → kho đóng hoặc lưu trữ địa phương; sách lên kệ tầng 2 bằng tời sách trong lõi thang Nam. Sách trả từ quầy mượn trả về xử lý qua cửa nhân viên của sảnh thang Nam, đây là đoạn duy nhất dùng chung với người đọc.",
    "Yên tĩnh: đọc yên tĩnh và văn phòng ở tầng 2 phía Tây cánh Nam, xa cánh sự kiện và khe; học nhóm gom ở góc Đông Nam tầng 2 có hành lang riêng; thiếu nhi ở tầng 1 có cửa ra sân vườn phía sông; phòng kỹ thuật nằm dưới phòng nhân viên, không dưới văn phòng.",
    "Nhân viên: văn phòng sát lõi thang Nam, xuống một tầng là tới xử lý nghiệp vụ, quầy mượn trả và sảnh đón tiếp; phòng nhân viên liền văn phòng; bảo vệ trông cửa tiếp nhận, lối Tây và nhìn vào sảnh đón tiếp.",
    "Thoát nạn: mỗi tầng 2 có hai thang bộ ở hai đầu mỗi cánh; phòng đa năng có ba cửa (quảng trường Bắc, lối Tây, sảnh); cửa khóa ngoài giờ chỉ đặt ở đầu thang Bắc tầng 2, không nằm trên đường thoát của khu sự kiện.",
    "Bãi xe ở đầu Nam: 4 hàng xe máy quay ra 2 lối đi, 2 chỗ ô tô cho người khuyết tật sát cổng, 1 chỗ ô tô, giá xe đạp, bốt giữ xe ở cổng. Ô tô khách gửi theo quy định của phố; số chỗ là giả định cần hỏi lại thầy.",
    "Xe giao sách vào cổng Tây Nam, chạy theo lối Tây tới cửa cuốn phòng tiếp nhận rồi lùi ra; lối Tây đồng thời là đường xe cứu hỏa nên không được đỗ lâu."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { PO, B, col } = G.K;
  const fN = { N: "dac", E: "lam", S: "dua", W: "dac" }, fS = { N: "kinh", E: "lam", S: "dua", W: "dac" };
  const hall = [[6, 14], [30, 14], [30, 28], [6, 28]];
  const coreBox = (L, id, c) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r, top = Math.max(...[[x, y], [x + w, y + h]].map(([a, b]) => (y < 46 ? zN : zS)(a, b))); return B(x, y, w, h, 0.45, top + 1.6, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotA", fam: "chot", code: "A", from: "2.1", name: "Khe chéo đón gió Đông Nam · bản chốt", rule: "Bất đối xứng, trục chéo",
    tag: "Bỏ thang giữa khe, cà phê ở miệng khe phía sông, thang bộ và thang máy là khối nổi màu",
    story: "Hai sườn đồi mái cỏ tách nhau bởi khe gió rộng 6 m chạy chéo theo hướng gió Đông Nam. Cánh Bắc là khu sự kiện, cà phê, trưng bày, chạy được ngoài giờ; cánh Nam là thư viện, kho, nhân viên. Người đọc vào thư viện từ trong khe, dưới hai cầu kính tầng 2.",
    why: [["Quy luật hình khối", "Bất đối xứng theo trục chéo: hai sườn cao thấp khác nhau, khe cắt xiên. Các lõi thang nhô lên khỏi mái thành những điểm nhấn màu."], ["Khối chính – khối phụ", "Cánh Nam (thư viện) cao hơn, mái dốc lên tới +15,95; cánh Bắc thấp hơn, phần phòng đa năng là một khối cao một tầng."], ["Nắng và chói", "Mặt Trần Phú đặc; trưng bày nằm trong lõi cánh Bắc, không nhận nắng; khe hẹp 6 m được cánh Nam che bớt nắng."], ["Gió và mưa", "Khe mở theo hướng gió hè từ đầu Nam phía sông; hai cầu kính che mưa cho lối vào thư viện trong khe."], ["Công năng", "Khe tách hai khu nên ngoài giờ chỉ khóa hai cửa ở đầu thang Bắc tầng 2; khu sự kiện có vệ sinh, lối vào, lối thoát riêng."]],
    kc: { he: "Khung bê tông lưới 8 × 8 m, cột theo trục 1–4 và A–J; mái là bản sàn nghiêng phủ đất trồng cỏ; phòng đa năng 19 × 9,6 m dùng dầm bê tông ứng lực trước; cầu kính nhịp 6 m là dầm thép.", nhip: "9,6 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Khe có bị mưa tạt vào lối vào?", "Lối vào thư viện nằm dưới hai cầu kính tầng 2 và có mái hiên kính dọc mép khe; mưa mùa đông đến từ hướng Đông Bắc, phía sông, nên cửa vào đặt lùi vào trong khe."], ["Phòng đa năng 19 m có cần cột giữa?", "Không: nhịp ngắn 9,6 m theo phương Bắc–Nam, dầm bê tông ứng lực trước cao khoảng 0,6 m gác lên hai hàng cột trục A và giữa A–B."]],
    cut: "Hai khối foam cắt theo khe, mặt mái vát dốc dán giấy cỏ. Lõi thang: foam cam và tím cao hơn mái 0,8 cm. Cầu kính: mica.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[18, 74, 15.5, "Khối chính · Cánh Nam: thư viện", 1], [18, 20, 13.2, "Khối phụ · Cánh Bắc: sự kiện, cà phê, trưng bày", 2], [22, 52.5, 1.5, "Khe gió · lối vào thư viện"], [16.5, 31.5, 15, "Thang bộ + thang máy"]],
    build() {
      const v = [
        PO(hall, 0.45, zN, "blk", "D", { fa: fN, fl: 1, top: "grass" }),
        PO(NM, 0.45, 4.95, "sheet", "A", { fa: fN, fl: 1 }), PO(NM, 4.95, zN, "sheet", "B", { fa: fN, fl: 1, top: "grass" }),
        PO(SW, 0.45, 4.95, "sheet", "B", { fa: fS, fl: 1, role: "m" }), PO(SW, 4.95, zS, "sheet", "B", { fa: fS, fl: 1, top: "grass", role: "m" }),
        PO(BR1, 4.95, 8.95, "glass", "L", { fl: 1 }), PO(BR2, 4.95, 8.95, "glass", "L", { fl: 1 }),
        coreBox(t1, "STN", "warn"), coreBox(t1, "CN", "violet"), coreBox(t1, "CS", "violet"), coreBox(t1, "STS", "warn")
      ];
      const st = [];
      for (const x of plan.grid.x) for (const y of plan.grid.y) { const inN = G.inPoly ? G.inPoly(NW, x, y, 0.05) : true, inS = G.inPoly ? G.inPoly(SW, x, y, 0.05) : false; if (inN || inS) st.push(col(x, y, 0.45, (inN ? zN : zS)(x, y))); }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
