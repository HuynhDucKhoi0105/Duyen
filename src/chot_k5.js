/* ================= Ý tưởng K.5: Hai khe song song (khe Hải Vân, sửa đủ góp ý của thầy) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // Khe chéo của A nhân đôi thành hai khe song song cùng dốc (lệch 9 m qua mỗi 16–20 m). Ba dải nhà là các hộp chữ nhật nằm ngang
  // Đông – Tây, mép dọc khe được bẻ bậc thang nên mọi mặt kính đều quay Bắc hoặc Nam; mặt bậc (Đông, Tây) đặc.
  const NS = [[6, 13], [24, 13], [39, 13], [39, 36], [24, 36], [24, 27], [6, 27]];            // dải Bắc: sự kiện, 1 tầng
  const MS = [[6, 37], [20, 37], [20, 46], [39, 46], [39, 62], [20, 62], [20, 53], [6, 53]];   // dải giữa: đón tiếp, quầy, kho sách (tầng 1), đọc (tầng 2)
  const K1 = [[6, 27], [24, 27], [24, 36], [39, 36], [39, 46], [20, 46], [20, 37], [6, 37]];   // khe 1: lối vào
  const K2 = [[6, 53], [20, 53], [20, 62], [39, 62], [39, 72], [17, 72], [17, 63], [6, 63]];   // khe 2: khe gió, cuối khe là vườn thiếu nhi
  // vỏ tính toán chia thành các hộp chữ nhật (phép cắt phòng cần vỏ lồi)
  const R4 = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const NW = R4(6, 13, 24, 27), NE = R4(24, 13, 39, 36), L1 = R4(17.5, 27, 20, 37), WPB = R4(15, 27, 17.5, 32.6);
  const MW = R4(6, 37, 20, 53), ME = R4(20, 46, 39, 62), L2 = R4(14, 53, 17, 63);
  const SW1 = R4(6, 63, 17, 88), SE = R4(17, 72, 39, 88);
  const STWP = R4(6, 63, 10, 68.7), SW2 = R4(10, 63, 17, 79), SE2 = R4(17, 72, 35, 88);
  const GARDEN = [[28, 62], [39, 62], [39, 72], [28, 72]];
  const S1 = SW1, S2 = SW2, BRG = L2;
  // mái cỏ một dốc: dải Bắc dốc xuống khe 1; dải giữa và dải Nam thấp ở mép Bắc, cao dần về phía Nam
  const zN = (y0, y) => 6.45 - (y - y0) / 23, zU = (y0, y) => 9.45 + 1.5 * (y - y0) / 16;
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NW, NE, L1, WPB, MW, ME, L2, SW1, SE],
    rooms: [
      // dải Bắc (sự kiện, 1 tầng): khách chỉ vào từ sảnh đón tiếp qua hành lang kính; cửa ra ngoài là cửa thoát nạn
      { id: "A2", c: "A2", n: "Trưng bày (sáng Bắc, cửa mái)", r: [6, 13, 8, 11.3], ctl: "sk", nz: 2, occ: 30, top: "N", d: [["FOY", 2.4, "o"], ["N", 1.4, "tn", 0.5]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn lối Tây, khe 1)", r: [6, 24.3, 5.6, 2.7], ctl: "nv", nz: 1, top: "N", d: [["W", 1.0, "nv"]] },
      { id: "KA2", c: "circ", n: "Kho trưng bày", r: [11.6, 24.3, 2.4, 2.7], ctl: "sk", nz: 1, d: [["A2", 0.9, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [14, 13, 10, 7.5], ctl: "sk", nz: 2, seat: 24, top: "N", d: [["FOY", 1.4, "p"]] },
      { id: "FOY", c: "circ", n: "Sảnh sự kiện", r: [14, 20.5, 10, 6.5], ctl: "sk", nz: 2, occ: 40, d: [["L1", 2.4, "o"], ["D1", 1.8, "p"], ["FOYE", 1.2, "o"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh khu sự kiện", r: [24, 13, 7, 2.43], ctl: "sk", nz: 1, wc: KT, d: [["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh trước phòng đa năng", r: [24, 15.43, 7, 6.57], ctl: "sk", nz: 2, d: [["D1", 1.8, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (sáng Bắc)", r: [31, 13, 8, 9], ctl: "sk", nz: 3, seat: 32, top: "N", d: [["FOYE", 2.4, "o"], ["N", 1.4, "tn"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [24, 22, 12, 14], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: "N", d: [["S", 1.8, "tn", 0.3], ["S", 1.8, "tn", 0.8]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [36, 22, 3, 8], ctl: "sk", nz: 3, d: [["D1", 3, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [36, 30, 3, 6], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      // hành lang kính qua khe 1: đường duy nhất từ đón tiếp sang khu sự kiện; hộp vệ sinh sảnh nằm cạnh
      { id: "L1", c: "circ", n: "Hành lang kính qua khe 1", r: [17.5, 27, 2.5, 10], ctl: "sk", nz: 2, d: [["A1", 2.4, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: [15, 27, 2.5, 5.6], ctl: "sk", nz: 1, wc: KT, d: [["L1", 1.2, "p"]] },
      // dải giữa, nửa Tây: cửa vào duy nhất (khe 1) → đón tiếp → sảnh gửi đồ → quầy mượn trả; chuỗi kho sách ngay cạnh quầy
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 37, 4, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.6], ["W", 1.0, "nv", 0.12], ["C2", 1.2, "nv"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [10, 37, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.35], ["VES", 2.4, "o"]] },
      { id: "VES", c: "circ", n: "Sảnh gửi đồ", r: [14, 45, 6, 3.4], ctl: "sk", nz: 2, d: [["A4", 2.4, "k"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 45, 8, 8], ctl: "nv", nz: 1, d: [["A4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14, 48.4, 6, 4.6], ctl: "tv", ctrl: 1, nz: 2, d: [["L2", 2.4, "o"], ["C1", 1.2, "nv", 0.85]] },
      // dải giữa, nửa Đông: kho đóng sát quầy, khu văn phòng
      { id: "C1", c: "C1", n: "Kho đóng", r: [20, 46, 6.75, 16], ctl: "kho", nz: 1, d: [["NVC", 1.2, "nv"]] },
      { id: "NVC", c: "circ", n: "Hành lang nhân viên", r: [26.75, 46, 2.5, 9.5], ctl: "nv", nz: 1, d: [["E1", 1.0, "nv"], ["C3", 1.0, "nv"], ["N", 1.2, "nv"]] },
      { id: "STE", n: "Thang bộ giữa (thoát nạn thư viện)", r: [26.75, 55.5, 2.5, 6.5], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["NVC", 1.0, "nv"], ["S", 1.2, "tnbd"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [29.25, 46, 9.75, 8], ctl: "nv", nz: 0, d: [["E2", 1.0, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [29.25, 54, 4.5, 8], ctl: "kho", nz: 1 },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [33.75, 54, 5.25, 8], ctl: "nv", nz: 1 },
      // cầu kính qua khe 2 (hai tầng): lối đọc và lối sách nối quầy với dải Nam
      { id: "L2", c: "circ", n: "Cầu kính qua khe 2 (lối đọc)", r: [14, 53, 3, 3], ctl: "tv", nz: 1, d: [["STL", 2.4, "o"]] },
      { id: "STL", n: "Thang bộ trong cầu kính (thoát nạn)", r: [14, 56, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STL" }, d: [["LS", 2.4, "o"], ["W", 1.2, "tnbd"]] },
      // dải Nam tầng 1: lõi sách, thiếu nhi, đọc mở
      { id: "STW", n: "Thang bộ Tây (thoát nạn thư viện)", r: [6, 63, 4, 5.7], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["W", 1.2, "tnbd"], ["LS", 1.2, "thang"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 68.7, 4, 14.3], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 83, 4, 5], ctl: "nv", nz: 1, d: [["W", 0.9, "nv"]] },
      { id: "LS", c: "circ", n: "Sảnh thang thư viện", r: [10, 63, 7, 5], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang", 0.15], ["KS", 1.4, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [10, 68, 5.5, 5.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "KS", c: "circ", n: "Hành lang thư viện", r: [15.5, 68, 1.5, 20], ctl: "tv", nz: 1 },
      { id: "KDL", c: "circ", n: "Kho đệm, xe đẩy sách", r: [10, 73.5, 5.5, 6.1], ctl: "tv", nz: 1, d: [["KS", 1.2, "p"]] },
      { id: "B1t", c: "B1", n: "Bàn đọc cá nhân (Nam)", r: [10, 79.6, 5.5, 8.4], ctl: "tv", nz: 1, d: [["KS", 1.6, "o"], ["S", 1.2, "tnbd"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn khe)", r: [17, 72, 8.5, 7], ctl: "tv", nz: 1, d: [["KS", 1.6, "o"]] },
      { id: "COR1", c: "circ", n: "Hành lang đọc", r: [17, 79, 8.5, 2], ctl: "tv", nz: 1, d: [["KS", 1.2, "o"], ["LB3", 1.2, "o"]] },
      { id: "B1b", c: "B1", n: "Đọc mở và kệ (Nam)", r: [17, 81, 8.5, 7], ctl: "tv", nz: 1, d: [["COR1", 1.6, "o"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [25.5, 72, 2.5, 4.8], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"], ["LB3", 1.0, "p"]] },
      { id: "LB3", c: "circ", n: "Sảnh đệm thiếu nhi, xe đẩy", r: [25.5, 76.8, 2.5, 11.2], ctl: "tv", nz: 2, d: [["B3", 1.8, "o"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [28, 72, 11, 16], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.5]] }
    ],
    staff: [
      { x: 15, y: 41, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16.75, y: 50.7, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 8.8, y: 25.6, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 17.5, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 33.5, y: 80, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 9.75, y: 48.7, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 40.7, t: "Nhận sách", sc: ["4"] },
      { x: 34, y: 50, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 19, y: 23.75, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 37.5, y: 26, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 (dải giữa và dải Nam; toàn bộ là thư viện, nối bằng cầu kính qua khe 2) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [MW, ME, L2, STWP, SW2, SE2],
    rooms: [
      // dải giữa, nửa Tây: học nhóm quay Bắc có hành lang riêng, đọc mở quay Nam
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [6 + 3.5 * i, 37, 3.5, 7.2], ctl: "tv", nz: 2, d: [["COR2", 0.9, "p"]] })),
      { id: "COR2", c: "circ", n: "Hành lang học nhóm", r: [6, 44.2, 14, 2], ctl: "tv", nz: 2 },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (Tây)", r: [6, 46.2, 14, 6.8], ctl: "tv", nz: 1, d: [["COR2", 2.4, "o"], ["L2", 2.4, "o"]] },
      // dải giữa, nửa Đông: tra cứu số, vệ sinh, đọc yên tĩnh ở đầu Đông (trên văn phòng, kho)
      { id: "B5", c: "B5", n: "Tra cứu số", r: [20, 46, 6.75, 16], ctl: "tv", nz: 1, seat: 16, d: [["B1m", 2.4, "o"], ["HL2", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2 (giữa)", r: [26.75, 46, 2.5, 4.5], ctl: "tv", nz: 1, wc: KT, d: [["HL2", 1.0, "p"]] },
      { id: "HL2", c: "circ", n: "Sảnh đọc yên tĩnh", r: [26.75, 50.5, 2.5, 5], ctl: "tv", nz: 1, d: [["B2", 1.2, "p"], ["STE", 1.2, "thang"]] },
      { id: "STE", n: "Thang bộ giữa (thoát nạn thư viện)", r: [26.75, 55.5, 2.5, 6.5], ctl: "tv", nz: 1, core: { st: "u", link: "STE" } },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (sáng Bắc – Nam)", r: [29.25, 46, 9.75, 16], ctl: "tv", nz: 0, seat: 40 },
      { id: "L2", c: "circ", n: "Cầu kính qua khe 2", r: [14, 53, 3, 3], ctl: "tv", nz: 1, d: [["STL", 2.4, "o"]] },
      { id: "STL", n: "Thang bộ trong cầu kính (thoát nạn)", r: [14, 56, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STL" }, d: [["LS2", 2.4, "o"]] },
      // dải Nam
      { id: "STW", n: "Thang bộ Tây (thoát nạn thư viện)", r: [6, 63, 4, 5.7], ctl: "tv", nz: 1, core: { st: "u", link: "STW" }, d: [["LS2", 1.2, "thang"]] },
      { id: "LS2", c: "circ", n: "Sảnh thang tầng 2", r: [10, 63, 7, 5], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["KS2", 1.4, "o"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [10, 68, 5.5, 5.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["KS2", 1.2, "thang", 0.85]] },
      { id: "KS2", c: "circ", n: "Hành lang đọc tầng 2", r: [15.5, 68, 1.5, 11], ctl: "tv", nz: 1, d: [["HS", 1.2, "o"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện tầng 2 (Nam)", r: [10, 73.5, 5.5, 2.7], ctl: "tv", nz: 1, wc: KT, d: [["KS2", 1.0, "p"]] },
      { id: "B1x", c: "B1", n: "Bàn đọc cá nhân", r: [10, 76.2, 5.5, 2.8], ctl: "tv", nz: 1, d: [["KS2", 1.2, "o"]] },
      { id: "HS", c: "circ", n: "Hành lang đọc dải Nam", r: [17, 72, 2, 16], ctl: "tv", nz: 1 },
      { id: "B1s1", c: "B1", n: "Đọc mở và kệ (nhìn khe)", r: [19, 72, 16, 8], ctl: "tv", nz: 1, shelf: 0.4, d: [["HS", 1.6, "o"]] },
      { id: "B1s2", c: "B1", n: "Đọc mở và kệ (Nam), tài liệu địa phương", r: [19, 80, 10, 8], ctl: "tv", nz: 1, shelf: 0.4, d: [["HS", 1.6, "o", 0.9]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, bậc ngồi", r: [29, 80, 6, 8], ctl: "tv", nz: 1, steps: 4, d: [["B1s2", 2.4, "o"]] }
    ],
    staff: [
      { x: 23, y: 54, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotK5", code: "K.5", name: "Hai khe song song", from: "A",
    NS, MS, S1, S2, L1, BRG, K1, K2,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 17, 20, 24, 28, 35, 39], y: [13, 22, 27, 37, 45, 53, 62, 72, 79, 88] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 40.7], [5.2, 40.7]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 41], [22, 41], [22, 32], [13.5, 32], [13.5, 36.4]]],
        event: [[[20, -9], [3, 2], [3, 32], [13.5, 32], [13.5, 36.4]], [[52, 41], [40.5, 41]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, đi qua khe 1 tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, hoặc bờ sông, vào khe 1 tới sảnh đón tiếp" },
      hatch: [K1, K2],
      labels: [[30, 41, "Khe 1 · lối vào"], [9, 58, "Khe 2 · khe gió"], [33.5, 67, "Vườn thiếu nhi"], [15, 20, "Dải sự kiện 1 tầng"], [26, 54, "Dải giữa: đón tiếp, quầy, kho sách"], [24, 84, "Dải Nam: đọc, thiếu nhi"]]
    }
  };
  plan.intro = `<p class="lede">Giữ phong cách khe Hải Vân của A: nhà tách thành ba dải hộp chữ nhật bằng hai khe chéo song song đón gió Đông Nam, mái cỏ một dốc, đi vào nhà là đi qua khe như qua đèo. Mép khe bẻ bậc nên mọi mặt kính đều quay Bắc hoặc Nam. Bản sửa ngày 05/11 gom thư viện quanh một bản lề: cửa vào duy nhất ở khe 1 → sảnh đón tiếp → sảnh gửi đồ → quầy mượn trả có cổng từ. Ngay sau quầy là phòng xử lý nghiệp vụ, tiếp nhận, kho đóng; trước quầy là cầu kính hai tầng vắt qua khe 2 sang lõi thang có thang máy và tời sách. Dải sự kiện 1 tầng phía Bắc nối với sảnh đón tiếp bằng hành lang kính qua khe 1.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: (1) Tiếp nhận, xử lý nghiệp vụ, kho đóng chuyển từ dải Nam lên dải giữa, quây quanh quầy mượn trả: tiếp nhận → xử lý 4 m, xử lý → kho 11 m, sách trả từ quầy về xử lý 4 m (trước 74 m). (2) Cầu kính qua khe 2 chuyển về ngay trước quầy, làm thành cầu hai tầng; lõi tời sách đặt ở đầu cầu phía Nam; kho đóng tới kệ xa nhất 45 m (trước 76 m). (3) Thư viện gom lại: người đọc từ cửa vào tới chỗ đọc xa nhất 62 m (trước 94 m). (4) Vệ sinh: mỗi tầng thư viện có vệ sinh trong khu đọc (xa nhất 27 m, trước 65 m); thiếu nhi có vệ sinh, chỗ thay tã sát vách; sảnh có hộp vệ sinh cạnh hành lang kính; phòng đa năng có vệ sinh cạnh sảnh trước. (5) Chống ồn: đọc yên tĩnh dời lên đầu Đông tầng 2 dải giữa, cách học nhóm hơn 8 m, nằm trên văn phòng và kho; thiếu nhi ngăn với phòng đọc bằng sảnh đệm và vệ sinh. (6) Thêm hai thang thoát nạn cho tầng 2: thang giữa ở dải giữa, và một thang bộ nhỏ đặt ngay trong cầu kính hai tầng (lõi cam, cửa ra khe là cửa có chuông báo). Nhờ đó học nhóm ở đầu Tây và đọc linh hoạt ở đầu Đông đều cách thang không quá 30 m.",
    "Đón tiếp là bản lề (Hình 1 của đề): khách sự kiện và người đọc dùng chung một cửa vào ở giữa khe 1, vào sảnh đón tiếp có quầy lễ tân. Rẽ qua hành lang kính vắt qua khe 1 là khu sự kiện; đi thẳng qua sảnh gửi đồ là quầy mượn trả có cổng từ, sau quầy mới là cầu kính sang thư viện. Mọi thang lên khu đọc đều nằm sau quầy. Khu sự kiện không có cửa vào từ ngoài; các cửa ra quảng trường là cửa thoát nạn.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận → xử lý nghiệp vụ (sát vách) → quầy mượn trả hoặc kho đóng ngay sau quầy. Sách lên kệ: kho đóng → quầy → cầu kính → tời sách đầu cầu Nam → tầng 2. Lưu trữ tài liệu địa phương nằm trong khu nhân viên cạnh kho đóng. Đoạn dùng chung với người đọc chỉ là cầu kính và sảnh thang (sau cổng từ).",
    "Ánh sáng Bắc – Nam: ba dải là hộp nằm ngang, dải giữa và dải Nam sâu 16 m, phòng chạy suốt chiều sâu lấy sáng hai mặt, phòng một mặt sâu tối đa 8 m. Dải sự kiện 1 tầng lấy thêm sáng mái hướng Bắc cho các phòng sâu. Mặt bậc và đầu hồi quay Đông, Tây là tường đặc, chỗ đặt thang, kho, vệ sinh, kỹ thuật.",
    "Không che sáng nhau: dải sự kiện chỉ 1 tầng nên không che tầng 2 thư viện. Hai khe rộng 10 m; góc che từ cửa sổ tầng 1 tới mái đối diện dưới 45°. Đầu Đông dải Nam (trên phòng thiếu nhi) chỉ 1 tầng nên phòng nhân viên nhìn ra vườn thiếu nhi rất thoáng.",
    "Bảo mật sách: quầy mượn trả có cổng từ là cửa duy nhất vào và ra thư viện. Bốn thang của thư viện (lõi tời sách, thang Tây, thang giữa, thang trong cầu kính) chỉ mở vào khu đã qua cổng; ở tầng 1 thang giữa chỉ mở ra hành lang nhân viên bằng cửa thẻ từ, còn cửa ra ngoài của các thang, của thiếu nhi, bàn đọc Nam là cửa có chuông báo. Dải sự kiện không có thang nào.",
    "Ngoài giờ: mở sảnh đón tiếp, sảnh gửi đồ, vệ sinh sảnh, hành lang kính và cả dải sự kiện (trưng bày, chuyên đề, phòng đa năng, cà phê, vệ sinh sự kiện). Chỉ khóa một cửa: sảnh gửi đồ → quầy mượn trả. Cửa khóa không nằm trên đường thoát của khu mở.",
    "Yên tĩnh: đọc yên tĩnh ở đầu Đông tầng 2 dải giữa, lấy sáng Bắc – Nam, bên dưới là văn phòng, kho; học nhóm ở mặt Bắc đầu Tây có hành lang riêng. Thiếu nhi ở tầng 1 đầu Đông dải Nam, mở ra vườn tường thấp cuối khe 2. Văn phòng, phòng nhân viên ở dải giữa, cách kỹ thuật và phòng ồn.",
    "Kết cấu: lưới cột theo các mép bậc; dải giữa và dải Nam nhịp 8 m có hàng cột giữa; phòng đa năng 12 × 14 m dùng dầm nhịp 14 m, không cột giữa. Kho đóng nặng ở tầng 1. Cầu kính qua khe 2 hai tầng, dầm thép nhịp 10 m tựa hai đầu; nửa Nam của cầu là ô thang bộ thoát nạn có vách cứng, giằng cho cầu. Không có phần đua.",
    "Bãi xe giữ như A ở đầu Nam. Người đọc từ bãi xe đi dọc bờ sông vào miệng khe 1; khách sự kiện từ quảng trường Bắc đi theo lối Tây vào khe 1. Xe giao sách theo lối Tây tới cửa cuốn tiếp nhận ở đầu Tây dải giữa. Nhân viên vào hành lang nhân viên từ khe 1."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, SH, col } = G.K;
  const roofOf = (x, y) => y < 37 ? zN(13, y) : y < 63 ? (x < 20 ? zU(37, y) : zU(46, y)) : (x < 10 && y > 68.7) || (x < 17 && y > 79) || x > 35 ? 4.95 : (x < 17 ? zU(63, y) : zU(72, y));
  // lõi thang nhô 1,2 m trên mái tại chỗ nó đứng
  const coreBox = (id, c) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, Math.max(roofOf(x + 0.1, y + 0.1), roofOf(x + 0.1, y + h - 0.1)) + 1.2, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotK5", fam: "chot", code: "K.5", from: "A", name: "Hai khe song song · ba dải nhà bậc thang", rule: "Lặp khe chéo, mép khe bẻ bậc thang",
    tag: "Khe Hải Vân nhân đôi: hai khe chéo song song chia nhà thành ba dải hộp mái cỏ; quầy, kho sách, lõi tời sách gom ở bản lề, cầu kính hai tầng qua khe 2",
    story: "Đèo Hải Vân không phải một nhát cắt mà là những khúc quanh. K.5 lấy khe chéo của A, nhân đôi thành hai khe song song cùng hướng gió Đông Nam, và bẻ mép khe thành bậc thang theo lưới cột. Ba dải nhà dâng dần từ Bắc xuống Nam như ba sườn đèo: dải sự kiện thấp 1 tầng ở quảng trường, dải đón tiếp và thư viện ở giữa, dải đọc và thiếu nhi cao nhất ở phía Nam. Mọi người vào nhà đều đi qua khe 1 tới sảnh đón tiếp, rồi tách luồng: sang khu sự kiện bằng hành lang kính vắt qua khe 1, hoặc qua quầy có cổng từ rồi cầu kính vắt qua khe 2 vào thư viện. Kho sách nằm ngay sau quầy.",
    why: [["Quy luật hình khối", "Nhịp dải nhà – khe – dải nhà – khe – dải nhà. Mỗi dải gồm hai hộp chữ nhật lệch nhau 9 m tại một mép bậc, ba mép bậc lùi dần về phía Tây (trục 24, 20, 17), nên hai khe đọc thành hai đường chéo song song cùng dốc với khe của A."], ["Khối chính – khối phụ", "Dải giữa và dải Nam hai tầng là thư viện, chiếm khoảng 77% sàn, mái cao tới +10,95. Dải sự kiện 1 tầng mái +6,45 là khối phụ, hành lang kính và cầu kính là khối nối."], ["Nắng và chói", "Mặt kính chỉ quay Bắc và Nam; mặt Đông (sông) và mặt Tây (phố Trần Phú) đặc. Tra cứu số quay Bắc, không bị nắng chiếu màn hình; đọc yên tĩnh quay Nam có mái dốc cao che trưa."], ["Gió và mưa", "Hai khe mở ra sông, gió Đông Nam mùa hè lùa vào cả hai khe và qua vườn thiếu nhi. Cửa vào nằm sâu trong khe 1, lùi 26 m từ miệng khe, có hành lang kính che mưa bên cạnh."], ["Công năng", "Một cửa vào cho khách, đón tiếp là bản lề giữa thư viện và sự kiện. Sự kiện 1 tầng ra thẳng quảng trường khi thoát nạn, chạy riêng ngoài giờ chỉ cần khóa một cửa. Tiếp nhận, xử lý, kho đóng gom ngay sau quầy mượn trả ở dải giữa, cạnh lối Tây."]],
    kc: { he: "Khung bê tông theo lưới cột 8 m, lệch trục tại các mép bậc. Dải giữa và dải Nam sâu 16 m có hàng cột giữa. Phòng đa năng 11,8 × 14 m dùng dầm bê tông ứng lực trước nhịp 14 m. Mái bê tông nghiêng phủ đất trồng cỏ. Hành lang kính qua khe 1 và cầu kính hai tầng qua khe 2 dầm thép nhịp 10 m tựa hai đầu lên hai dải.", nhip: "14 m (phòng đa năng)", cx: "Không có phần đua" },
    qa: [["Khách sự kiện có phải đi vòng không?", "Có một đoạn: từ quảng trường đi theo lối Tây khoảng 25 m vào miệng khe 1, vào sảnh đón tiếp rồi qua hành lang kính 10 m. Đổi lại sự kiện và thư viện dùng chung một quầy lễ tân, đúng sơ đồ của đề (A – D qua đón tiếp)."], ["Dải sự kiện 1 tầng có đủ cao cho phòng đa năng?", "Mái dốc từ +6,45 xuống +5,45, trần thông thủy khoảng 4,5–5,5 m, đủ cho 120 người, máy chiếu và thông gió."], ["Hai khe 10 m có tối không?", "Không: khe 1 có dải sự kiện thấp 1 tầng ở phía Bắc nên rất thoáng; khe 2 có góc che 43°, vẫn dưới mức 45°. Chỗ mép bậc khe rộng tới 19 m."], ["Thủ thư thay sách có phải đi xa?", "Không. Tiếp nhận, xử lý, kho đóng nằm sát quầy mượn trả; từ kho tới kệ xa nhất trên tầng 2 khoảng 45 m, đi qua cầu kính và tời sách ở đầu cầu."]],
    cut: "Ba dải foam: dải Bắc cao 2,7–3,2 cm, dải giữa và dải Nam cao 4,5–5,3 cm, mặt mái cắt vát một dốc dán giấy cỏ. Mỗi dải là hai khối chữ nhật lệch nhau theo mép bậc. Hành lang kính qua khe 1 và cầu kính hai tầng qua khe 2: mica. Lõi thang: foam tím và cam cao hơn mái 0,6 cm. Tường thấp vườn thiếu nhi: bìa 0,6 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[15, 20, 6.8, "Khối phụ · Dải sự kiện 1 tầng", 2], [30, 54, 11.3, "Khối chính · Dải đón tiếp, kho sách, đọc yên tĩnh", 1], [26, 80, 11.3, "Khối chính · Dải đọc, thiếu nhi", 1], [30, 41, 0.6, "Khe 1 · lối vào", 2], [12, 58, 0.6, "Khe 2 · khe gió", 2], [33.5, 67, 0.6, "Vườn thiếu nhi", 2], [18.5, 32, 5, "Hành lang kính", 2], [15.5, 58, 9.4, "Cầu kính hai tầng", 2], [12.75, 70.75, 12.2, "Lõi thang + tời sách"]],
    build() {
      // lõi đặt trước các dải để phép kiểm góc che gặp khối cao nhất trước
      const v = [
        coreBox("CS", "violet"), coreBox("STW", "warn"), coreBox("STE", "warn"), coreBox("STL", "warn"),
        // dải Bắc 1 tầng, dốc xuống khe 1
        SH(6, 13, 18, 14, 0.45, 5.85, 6.45, "-y", "sheet", "D", { fl: 1, top: "grass", role: "p" }),
        SH(24, 13, 15, 23, 0.45, 5.45, 6.45, "-y", "sheet", "D", { fl: 1, top: "grass", role: "p" }),
        // dải giữa 2 tầng, thấp ở mép Bắc, cao dần về phía Nam
        SH(6, 37, 14, 16, 0.45, 9.45, 10.95, "+y", "sheet", "A", { fl: 2, top: "grass", role: "m" }),
        SH(20, 46, 19, 16, 0.45, 9.45, 10.95, "+y", "sheet", "B", { fl: 2, top: "grass", role: "m" }),
        // dải Nam: phần hai tầng (thư viện) và phần một tầng mái cỏ (kỹ thuật, kho, đọc linh hoạt, đầu thiếu nhi)
        SH(10, 63, 7, 16, 0.45, 9.45, 10.95, "+y", "sheet", "B", { fl: 2, top: "grass", role: "m" }),
        SH(17, 72, 18, 16, 0.45, 9.45, 10.95, "+y", "sheet", "B", { fl: 2, top: "grass", role: "m" }),
        B(6, 68.7, 4, 19.3, 0.45, 4.95, "sheet", "C", { fl: 1, top: "grass", role: "m" }),
        B(10, 79, 7, 9, 0.45, 4.95, "sheet", "B", { fl: 1, top: "grass", role: "m" }),
        B(35, 72, 4, 16, 0.45, 4.95, "sheet", "B", { fl: 1, top: "grass", role: "m" }),
        // hành lang kính qua khe 1 (tầng 1) và hộp vệ sinh sảnh; cầu kính hai tầng qua khe 2
        B(17.5, 27, 2.5, 10, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(15, 27, 2.5, 5.6, 0.45, 3.95, "sheet", "L", { fl: 1, role: "p" }),
        B(14, 53, 3, 10, 0.45, 8.95, "glass", "L", { fl: 2, role: "m" }),
        // tường thấp vườn thiếu nhi ở cuối khe 2
        B(28, 62, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(38.7, 62, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      const boxes = [[6, 13, 24, 27, [13, 27]], [24, 13, 39, 36, [13, 22, 36]], [6, 37, 20, 53, [37, 45, 53]], [20, 46, 39, 62, [46, 54, 62]], [6, 63, 17, 88, [63, 71, 79, 88]], [17, 72, 39, 88, [72, 80, 88]]];
      for (const [x0, y0, x1, y1, ys] of boxes) for (const x of plan.grid.x.filter(q => q >= x0 && q <= x1)) for (const y of ys) {
        if (x > 24 && x < 36 && y > 22 && y < 36) continue; // phòng đa năng không cột giữa
        st.push(col(x, y, 0.45, roofOf(x - (x === x1 ? 0.1 : -0.1), y - (y === y1 ? 0.1 : -0.1))));
      }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
