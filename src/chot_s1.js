/* ================= Ý tưởng S.1: Hai hộp chồng lệch (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp công cộng một tầng (Tây Bắc) và hộp thư viện hai tầng dài (Nam), lệch nhau Đông – Tây; sảnh đón tiếp ở chỗ hai hộp gặp nhau
  const PB = [[6, 12], [34, 12], [34, 40], [6, 40]];     // hộp công cộng, sự kiện: một tầng, mái cỏ có cửa mái hướng Bắc
  const LK = [[28.5, 40], [31.5, 40], [31.5, 48], [28.5, 48]]; // cầu kính một tầng qua sân: sảnh đón tiếp → quầy mượn trả
  const SB = [[6, 48], [41, 48], [41, 76], [6, 76]];     // hộp thư viện hai tầng
  const COURT = [[6, 40], [28.5, 40], [28.5, 48], [6, 48]], COURT2 = [[31.5, 40], [41, 40], [41, 48], [31.5, 48]];
  const GARDEN = [[20.2, 76], [32.5, 76], [32.5, 87], [20.2, 87]];
  const TW = [[32.5, 76], [35.5, 76], [35.5, 81], [32.5, 81]];   // tháp thang thoát hiểm Đông Nam
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [PB, LK, SB, TW],
    rooms: [
      // hộp công cộng một tầng: mọi phòng lấy sáng cửa mái hướng Bắc (không có gì ở trên) và cửa sổ mặt Bắc, Nam
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5], ["COR", 1.8, "p", 0.75]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [17.25, 12, 4.75, 5], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [17.25, 17, 4.75, 4], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [17.25, 21, 4.75, 7], ctl: "sk", nz: 2, occ: 40, d: [["D1", 1.8, "p", 0.4], ["COR", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [22, 12, 12, 7.5], ctl: "sk", nz: 2, occ: 30, top: N, d: [["N", 1.2, "tn", 0.7], ["CO", 2.4, "o"]] },
      { id: "CO", c: "circ", n: "Sảnh trưng bày", r: [22, 19.5, 12, 8.5], ctl: "sk", nz: 2, d: [["COR", 2.0, "o"], ["CO2", 2.4, "o"]] },
      { id: "COR", c: "circ", n: "Hành lang sự kiện", r: [6, 28, 18, 2], ctl: "sk", nz: 2, d: [["D4", 1.4, "p"], ["A3", 1.8, "o"], ["WCP", 1.2, "p"]] },
      { id: "CO2", c: "circ", n: "Sảnh chia luồng", r: [24, 28, 6, 4], ctl: "sk", nz: 2, d: [["A1", 3.0, "o"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [30, 28, 4, 4], ctl: "nv", nz: 1, top: N, d: [["E", 1.0, "nv"], ["CO2", 0.9, "nv"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 30, 7.5, 10], ctl: "sk", nz: 2, seat: 24, top: N, d: [["S", 1.2, "tn", 0.5]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [13.5, 30, 7, 10], ctl: "sk", nz: 3, seat: 32, top: N, d: [["KCF", 0.9, "p"], ["S", 1.2, "tn", 0.5]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [20.5, 30, 3.5, 8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "KCF", c: "circ", n: "Kho, chuẩn bị cà phê", r: [20.5, 38, 3.5, 2], ctl: "sk", nz: 1 },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [24, 32, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["E", 2.4, "chinh", 0.5], ["LK", 2.4, "o"]] },
      // cầu kính qua sân: cuối cầu là quầy mượn trả (khóa ngoài giờ)
      { id: "LK", c: "circ", n: "Cầu kính qua sân", r: [28.5, 40, 3, 8], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // hộp thư viện tầng 1: dải Bắc tiếp nhận, xử lý, quầy, đọc; dải giữa kho, lõi sách, vệ sinh; dải Nam văn phòng, thiếu nhi
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 48, 3.6, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.6, 48, 8.25, 8.5], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["C3", 1.0, "nv"]] },
      { id: "B1b", c: "B1", n: "Đọc mở, sách mới", r: [17.85, 48, 6.15, 8.5], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["C2", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [24, 48, 8.5, 3.53], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["B1b", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [24, 51.53, 8.5, 4.97], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn sân)", r: [32.5, 48, 8.5, 8.5], ctl: "tv", nz: 1, d: [["N", 1.2, "tnbd", 0.85]] },
      // dải giữa: kho, lõi sách, vệ sinh, kỹ thuật (không cần cửa sổ)
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 56.5, 6, 6.67], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 63.17, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["W", 1.2, "tnbd"], ["SC", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [12, 56.5, 12, 9.1], ctl: "kho", nz: 1, d: [["SC", 1.2, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang nhân viên", r: [12, 65.6, 12, 1.9], ctl: "nv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 56.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"], ["C1", 1.2, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [24, 64.5, 4, 3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"], ["LC", 0.9, "p"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [28, 56.5, 4.5, 11], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"], ["B3", 1.8, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [32.5, 56.5, 8.5, 6.5], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [32.5, 63, 4.25, 4.5], ctl: "tv", nz: 1, wc: KT, d: [["LC", 1.0, "p"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [36.75, 63, 4.25, 4.5], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"]] },
      // dải Nam: văn phòng, phòng nhân viên, thiếu nhi
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 67.5, 9.5, 8.5], ctl: "nv", nz: 0, d: [["SC", 1.0, "nv"], ["S", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [15.5, 67.5, 4.7, 8.5], ctl: "nv", nz: 1, d: [["SC", 0.9, "nv"]] },
      // kho đồ chơi 1 m làm vách đệm: phòng nhân viên không chung vách với thiếu nhi
      { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy (vách đệm)", r: [20.2, 67.5, 1, 8.5], ctl: "tv", nz: 1, d: [["B3", 0.8, "p"]] },
      { id: "STE2", n: "Thang thoát hiểm Đông Nam", r: [32.5, 76, 3, 5], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["E", 1.2, "tnbd"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [21.2, 67.5, 19.8, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.3]] }
    ],
    staff: [
      { x: 27, y: 35, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 49.8, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 32, y: 30, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 17, y: 32, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 71.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13.7, y: 52.2, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 52, t: "Nhận sách", sc: ["4"] },
      { x: 10.7, y: 71.7, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 19.6, y: 24.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 19.6, y: 14.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: chỉ hộp thư viện ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [SB, TW],
    rooms: [
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây)", r: [6, 48, 10.5, 15.17], ctl: "tv", nz: 0, seat: 40, top: N, d: [["H3", 1.2, "p"]] },
      { id: "STS", n: "Thang bộ thư viện Tây", r: [6, 63.17, 6, 4.33], ctl: "tv", nz: 1, core: { st: "u", link: "STS" }, d: [["H3", 1.2, "thang"]] },
      { id: "H3", c: "circ", n: "Sảnh thang Tây", r: [12, 63.17, 4.5, 4.33], ctl: "tv", nz: 1, d: [["B1m", 2.4, "o"], ["B1w", 2.0, "o"]] },
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (góc Tây Nam)", r: [6, 67.5, 10.5, 8.5], ctl: "tv", nz: 1, top: N },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (sảnh đọc lớn)", r: [16.5, 48, 7.5, 28], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [24, 48, 8.5, 6], ctl: "tv", nz: 1, steps: 4, top: N, d: [["H2", 2.4, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [24, 54, 8.5, 2.5], ctl: "tv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [24, 56.5, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["H2", 1.4, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [24, 64.5, 4, 4], ctl: "tv", nz: 1, wc: KT, d: [["B1m", 1.0, "p"], ["B1e", 1.0, "p"]] },
      { id: "B1f", c: "B1", n: "Bàn đọc cá nhân", r: [24, 68.5, 4, 7.5], ctl: "tv", nz: 0, top: N, d: [["B1m", 1.6, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (dải giữa)", r: [28, 56.5, 4.5, 19.5], ctl: "tv", nz: 1, top: N, d: [["H2", 2.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [32.5, 48, 8.5, 11.76], ctl: "tv", nz: 1, seat: 16, top: N, d: [["H2", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [32.5, 59.76, 2, 16.24], ctl: "tv", nz: 2, d: [["B1e", 1.6, "o"], ["B5", 1.2, "o"]] },
      // dải kho đệm 1 m: tra cứu số không chung vách với phòng học nhóm
      { id: "STE2", n: "Thang thoát hiểm Đông Nam", r: [32.5, 76, 3, 5], ctl: "tv", nz: 1, core: { st: "u", link: "STE2" }, d: [["CO4", 1.2, "thang"]] },
      { id: "KD2", c: "circ", n: "Kho đệm cách âm", r: [34.5, 59.76, 6.5, 1], ctl: "tv", nz: 1, d: [["CO4", 0.8, "nv"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [34.5, 60.76 + 3.81 * i, 6.5, 3.81], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [
      { x: 28, y: 51, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS1", code: "S.1", name: "Hai hộp chồng lệch", from: "khối vuông",
    PB, LK, SB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 13.5, 17.25, 22, 24, 28, 32.5, 34, 41], y: [12, 20, 28, 32, 40, 48, 56.5, 67.5, 76] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 30, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 51.5], [5.2, 51.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 36], [34.6, 36]]],
        event: [[[20, -9], [26, 6], [38, 9], [38, 36], [34.6, 36]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân trước tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, vòng sân trước tới sảnh đón tiếp" },
      hatch: [COURT, COURT2, GARDEN],
      labels: [[37.5, 30, "Sân trước, cửa vào"], [16, 44, "Sân giữa hai hộp"], [26.4, 82, "Vườn thiếu nhi"], [14, 20, "Hộp công cộng một tầng"], [23, 62, "Hộp thư viện hai tầng"]]
    }
  };
  plan.intro = `<p class="lede">Thầy xác nhận không cần cầu kỳ, chỉ cần xếp các hộp đơn giản lên nhau. S.1 chỉ có hai hộp chữ nhật lệch nhau. Hộp công cộng một tầng nằm phía Tây Bắc, gồm sự kiện, trưng bày, cà phê, sảnh đón tiếp. Hộp thư viện hai tầng dài 35 m nằm phía Nam, cao hơn, là khối chính. Hai hộp lệch Đông – Tây: hộp thấp chỉ dài 28 m, chừa sân trước phía sông làm lối vào. Sảnh đón tiếp nằm đúng chỗ hai hộp gặp nhau, nối với quầy mượn trả bằng một cầu kính 8 m qua sân giữa. Mọi người vào nhà qua một cửa duy nhất ở sảnh đón tiếp; muốn vào bất kỳ phòng đọc nào, kể cả phòng thiếu nhi, đều phải qua quầy gửi đồ, mượn trả có cổng từ.</p>`;
  plan.notes = [
    "Đi qua khối A: một cửa vào duy nhất (mặt Đông, nhìn ra sân trước) vào sảnh đón tiếp. Từ sảnh rẽ trái qua sảnh chia luồng tới trưng bày, cà phê, chuyên đề, phòng đa năng; đi thẳng qua cầu kính 8 m tới quầy gửi đồ, mượn trả có cổng từ (sảnh → quầy khoảng 14 m). Phòng thiếu nhi, mọi phòng đọc tầng 1, tầng 2 đều nằm sau quầy này. Phòng đa năng, chuyên đề, cà phê, trưng bày chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: ba thang lên khu đọc (lõi sách giữa hộp, thang Tây sát lối Tây, tháp thang Đông Nam) chỉ tới được sau quầy có cổng từ. Thang Tây ở tầng 1 chỉ có cửa thẻ từ ra hành lang nhân viên và cửa thoát hiểm có chuông; tháp Đông Nam ở tầng 1 chỉ có cửa thoát hiểm có chuông. Hộp công cộng một tầng nên không có thang nào khác.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng, lưu trữ tài liệu địa phương (liền vách). Kho đóng mở thẳng vào lõi sách: tời sách đưa lên sàn đọc tầng 2. Sách trả: thủ thư đưa từ quầy qua phòng đọc sách mới vào xử lý, không đi qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ngay cạnh sảnh đón tiếp và hành lang sự kiện; khu đọc mỗi tầng có một cụm sát lõi sách, xếp chồng thẳng hàng; phòng thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: hộp công cộng một tầng lấy sáng cửa mái hướng Bắc và cửa sổ mặt Bắc, mặt Nam. Hộp thư viện tầng 1 chia ba dải: dải Bắc (nhìn sân giữa) và dải Nam (nhìn vườn) là phòng có người, sâu 8,5 m; dải giữa chỉ có kho, thang, vệ sinh, kỹ thuật. Tầng 2 là tầng trên cùng, toàn bộ sàn đọc lấy sáng mái răng cưa kính quay Bắc. Đầu Đông, đầu Tây các hộp là tường đặc.",
    "Không che sáng nhau: sân giữa rộng 8 m, hộp công cộng chỉ cao +5,45 nên cửa sổ tầng 1 thư viện nhìn qua sân không bị che (khoảng 25°); hộp công cộng lấy sáng mái nên không bị hộp thư viện che.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở riêng hộp công cộng, cách khu đọc cả sân giữa; đọc yên tĩnh ở đầu Tây tầng 2, cách học nhóm (đầu Đông) cả sảnh đọc và dải đọc giữa, có kho đệm; văn phòng, phòng nhân viên tách khỏi thiếu nhi bằng kho đồ chơi.",
    "Ngoài giờ: hộp công cộng chạy riêng (sảnh, cà phê, trưng bày, sự kiện, vệ sinh công cộng). Chỉ khóa một cửa ở cuối cầu kính vào quầy mượn trả, không nằm trên đường thoát nạn.",
    "Kết cấu: hai hộp khung bê tông lưới khoảng 8 m, không có phần nào đua ra; phòng đa năng 11,25 × 16 m dùng dầm bê tông ứng lực trước; kho đóng ở tầng 1 sát lõi sách nên tải nặng xuống thẳng móng."
  ];
  /* ---------- khối 3D ---------- */
  const { B, SH, col } = G.K;
  const zR = 9.45, RISE = 1.6;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  const teeth = (x, y0, w, n, d) => {
    const o = [];
    for (let k = 0; k < n; k++) {
      const y = y0 + k * d;
      o.push(SH(x, y, w, d, zR, zR, zR + RISE, "-y", "sheet", "X", { top: "grass" }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, zR, zR + RISE - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotS1", fam: "chot", code: "S.1", from: "khối vuông", name: "Hai hộp chồng lệch", rule: "Hai hộp chữ nhật lệch Đông – Tây",
    tag: "Hộp công cộng một tầng lệch về Tây, hộp thư viện hai tầng dài phía Nam; sảnh đón tiếp ở chỗ hai hộp gặp nhau",
    story: "Hai hộp đơn giản, một thấp một cao, đặt lệch nhau. Hộp thấp là phòng khách của thành phố: sảnh, cà phê, trưng bày, phòng đa năng, mở cả buổi tối. Hộp cao là thư viện yên tĩnh, có một lõi sách ở giữa. Giữa hai hộp là một sân cây và cây cầu kính nối sảnh với quầy mượn trả.",
    why: [["Quy luật hình khối", "Hai hộp chữ nhật, khác chiều cao, lệch nhau theo phương Đông – Tây; không có phần đua, không có chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Hộp thư viện cao hai tầng, chiếm khoảng 70% sàn; hộp công cộng một tầng thấp hơn hẳn."], ["Nắng và chói", "Phòng có người chỉ lấy sáng mặt Bắc, mặt Nam và cửa mái hướng Bắc; đầu Đông, Tây là tường đặc."], ["Gió và mưa", "Sân giữa hai hộp mở ra sông, đón gió Đông Nam; cầu kính có mái che."], ["Công năng", "Một cửa vào, sảnh đón tiếp là bản lề; lõi sách nằm giữa kho và chỗ đọc nên đường sách ngắn."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; hộp công cộng mái bê tông phẳng phủ cỏ có cửa mái; hộp thư viện mái răng cưa thép nhẹ; phòng đa năng dầm ứng lực trước nhịp 11,25 m; cầu kính dầm thép nhịp 8 m.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Phòng thiếu nhi có lối riêng không?", "Không: thiếu nhi nằm trong hộp thư viện, sau quầy gửi đồ, mượn trả như mọi phòng đọc khác; cửa ra vườn thiếu nhi là cửa có chuông báo."], ["Hộp công cộng sâu 28 m có bí không?", "Không: hộp chỉ một tầng, mọi phòng lấy sáng cửa mái hướng Bắc cộng cửa sổ mặt Bắc hoặc Nam."]],
    cut: "Hộp công cộng foam xám thấp có dải cửa mái; hộp thư viện trắng cao hơn có răng cưa giấy cỏ và mica quay Bắc; lõi sách tím, thang cam nhô khỏi mái; cầu kính mica.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[23.5, 62, 12.8, "Lõi sách", 1], [33, 70, 11.4, "Khối chính · Hộp thư viện hai tầng", 1], [14, 22, 6.2, "Khối phụ · Hộp công cộng một tầng", 2], [30, 44, 4.8, "Cầu kính", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 12.45), coreBox(t1, "STS", "warn", 12.45), coreBox(t1, "STE2", "warn", 12.45),
        B(6, 48, 35, 28, 0.45, zR, "sheet", "B", { fl: 2, role: "m" }),
        B(6, 12, 28, 28, 0.45, 5.45, "stone", "D", { fl: 1, top: "grass", role: "p" }),
        B(28.5, 40, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        ...teeth(6, 50, 35, 6, 4),
        // cửa mái hướng Bắc trên hộp công cộng: dải kính thấp
        ...[16, 24, 32].map(y => B(7, y, 26, 0.5, 5.45, 5.95, "glass", "X", { op: 0.75 })),
        B(20.2, 76, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(40.7, 76, 0.3, 11, 0, 1.2, "stone", "X", { role: "p" }), B(20.2, 86.7, 20.8, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38, 41]) for (const y of [48, 56.5, 67.5, 76]) st.push(col(x, y, 0.45, zR));
      for (const x of [6, 17.25, 22, 34]) for (const y of [12, 28, 40]) st.push(col(x, y, 0.45, 5.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
