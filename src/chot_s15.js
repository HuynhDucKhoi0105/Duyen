/* ================= Ý tưởng S.15: Tháp đọc ba tầng và hộp thấp (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hộp công cộng một tầng dài hết bề ngang phía Bắc (sát quảng trường); sân giữa 8 m;
  // tháp đọc ba tầng gọn 28 × 24 m ở nửa Nam; vườn thiếu nhi phía Nam tháp
  const PB = [[6, 12], [41.5, 12], [41.5, 34], [6, 34]];       // hộp công cộng một tầng, mái cỏ có cửa mái hướng Bắc
  const LK = [[19.75, 34], [22.75, 34], [22.75, 42], [19.75, 42]]; // cầu kính qua sân: sảnh đón tiếp → quầy mượn trả
  const TB = [[6, 42], [34, 42], [34, 66], [6, 66]];          // tháp đọc ba tầng
  const COURT = [[6, 34], [19.75, 34], [19.75, 42], [6, 42]], COURT2 = [[22.75, 34], [41.5, 34], [41.5, 42], [22.75, 42]];
  const GARDEN = [[11.25, 66], [34, 66], [34, 80], [11.25, 80]], WALK = [[34, 42], [41.5, 42], [41.5, 86], [34, 86]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [PB, LK, TB],
    rooms: [
      // hộp công cộng một tầng: mọi phòng lấy sáng cửa mái hướng Bắc (không có tầng nào ở trên)
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [6, 12, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "S", top: N, d: [["N", 1.8, "tn", 0.5], ["W", 1.6, "tn", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 28, 4.25, 6], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [10.25, 28, 3.5, 6], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh chờ phòng đa năng", r: [13.75, 28, 3.5, 6], ctl: "sk", nz: 2, occ: 40, d: [["D1", 1.8, "p", 0.5], ["A1", 2.4, "o"]] },
      { id: "NH", c: "circ", n: "Sảnh Bắc (cửa quảng trường)", r: [17.25, 12, 4, 14], ctl: "sk", nz: 2, top: N, d: [["N", 2.4, "chinh", 0.5], ["A1", 3.0, "o"], ["A3", 2.4, "o", 0.4], ["CO", 2.0, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [17.25, 26, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["S", 2.4, "chinh", 0.5], ["LK", 2.4, "o"], ["D4", 1.4, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn quảng trường)", r: [21.25, 12, 8.75, 8], ctl: "sk", nz: 3, seat: 32, top: N, d: [["CO", 1.6, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [30, 12, 11.5, 8], ctl: "sk", nz: 2, occ: 30, top: N, d: [["CO", 2.4, "o"]] },
      { id: "CO", c: "circ", n: "Hành lang trưng bày", r: [21.25, 20, 20.25, 2], ctl: "sk", nz: 2 },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [21.25, 22, 6.5, 4], ctl: "sk", nz: 1, wc: KT, d: [["CO", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [27.75, 22, 13.75, 4], ctl: "kt", nz: 3, d: [["CO", 1.2, "nv"], ["E", 1.4, "nv"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [27.25, 26, 9.8, 8], ctl: "sk", nz: 2, seat: 24, top: N, d: [["S", 1.2, "tn", 0.6]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn sân và lối ven sông)", r: [37.05, 26, 4.45, 3.5], ctl: "nv", nz: 1, top: N, d: [["E", 1.0, "nv"], ["D4", 0.9, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [37.05, 29.5, 4.45, 4.5], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"], ["E3", 0.9, "nv"]] },
      // cầu kính qua sân: cuối cầu là quầy mượn trả (khóa ngoài giờ)
      { id: "LK", c: "circ", n: "Cầu kính qua sân", r: [19.75, 34, 3, 8], ctl: "sk", nz: 2, d: [["A4", 2.0, "k"]] },
      // tháp đọc tầng 1, dải Bắc: tiếp nhận, xử lý, quầy, đọc sách mới
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 42, 3.5, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.5, 42, 8.75, 8], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["HL", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [18.25, 42, 6.5, 4.6], ctl: "tv", ctrl: 1, nz: 2, d: [["HL", 2.4, "o"], ["C2", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [18.25, 46.6, 6.5, 3.4], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["P", 1.8, "o"], ["CS", 1.4, "thang"]] },
      { id: "B1a", c: "B1", n: "Đọc mở, sách mới (quay Bắc)", r: [24.75, 42, 9.25, 8], ctl: "tv", nz: 1, d: [["E", 1.2, "tnbd", 0.5]] },
      // dải giữa: kho đóng, lõi sách, thang Đông, vệ sinh (không cần cửa sổ)
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 50, 14.25, 8], ctl: "kho", nz: 1, d: [["P", 1.2, "nv"]] },
      { id: "P", c: "circ", n: "Hành lang sang thiếu nhi", r: [20.25, 50, 2, 8], ctl: "tv", nz: 1, d: [["B3", 1.8, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [22.25, 50, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["P", 1.2, "nv"]] },
      { id: "KX", c: "circ", n: "Kho xe sách, đồ nghiệp vụ", r: [26.75, 50, 4.25, 4.25], ctl: "nv", nz: 1, d: [["CS", 0.9, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện tầng 1, trẻ em, thay tã", r: [26.75, 54.25, 4.25, 3.75], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [31, 50, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["E", 1.2, "tnbd"], ["B3", 1.2, "thang"]] },
      // dải Nam: lưu trữ địa phương (sát kho đóng), thiếu nhi mở ra vườn
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 58, 5.25, 8], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra vườn)", r: [11.25, 58, 22.75, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] }
    ],
    staff: [
      { x: 22, y: 30, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 21.5, y: 44.3, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 39, y: 27.7, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 25.5, y: 16, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 26, y: 62, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 13.8, y: 46, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 46, t: "Nhận sách", sc: ["4"] },
      { x: 15.5, y: 31, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 31, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: tháp đọc, hai dải có cửa sổ Bắc và Nam ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [TB],
    rooms: [
      { id: "E2", c: "E2", n: "Phòng nhân viên (quay Bắc)", r: [6, 42, 5, 8], ctl: "nv", nz: 1, d: [["H2", 1.0, "nv"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (quay Bắc)", r: [11, 42, 23, 8], ctl: "tv", nz: 1, d: [["H2", 2.4, "o"], ["KD2", 1.8, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh đọc tầng 2, kệ giới thiệu sách", r: [6, 50, 16.25, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["KD", 0.9, "nv"], ["B5", 1.4, "o", 0.9]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [22.25, 50, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "KD2", c: "circ", n: "Sảnh vệ sinh", r: [26.75, 50, 4.25, 4.25], ctl: "tv", nz: 1 },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [26.75, 54.25, 4.25, 3.75], ctl: "tv", nz: 1, wc: KT, d: [["KD2", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [31, 50, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1n", 1.2, "thang"]] },
      // dải Nam: học nhóm đầu Tây, kho đệm, tra cứu số đầu Đông
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [6 + 3.125 * i, 58, 3.125, 8], ctl: "tv", nz: 2, d: [["H2", 0.9, "p"]] })),
      { id: "KD", c: "circ", n: "Kho đệm cách âm", r: [18.5, 58, 2, 8], ctl: "tv", nz: 1 },
      { id: "B5", c: "B5", n: "Tra cứu số (quay Nam)", r: [20.5, 58, 13.5, 8], ctl: "tv", nz: 1, seat: 16 }
    ],
    staff: [
      { x: 9, y: 46, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 3: tầng trên cùng, mái răng cưa kính quay Bắc, yên tĩnh nhất ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [TB],
    rooms: [
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (góc Tây Bắc)", r: [6, 42, 16.25, 10], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1t", 1.4, "p"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ tầng 3 (sảnh đọc lớn)", r: [6, 52, 16.25, 14], ctl: "tv", nz: 1, top: N, d: [["CS", 1.4, "thang"], ["B1e", 2.4, "o"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [22.25, 42, 10, 8], ctl: "nv", nz: 0, top: N, d: [["KE", 0.9, "nv"], ["KD3", 1.0, "nv"]] },
      { id: "KE", c: "circ", n: "Kho hồ sơ", r: [32.25, 42, 1.75, 8], ctl: "nv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [22.25, 50, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1e", 1.4, "thang"]] },
      { id: "KD3", c: "circ", n: "Sảnh nhân viên", r: [26.75, 50, 4.25, 4.25], ctl: "nv", nz: 1, d: [["CS", 1.0, "nv"], ["STE", 1.0, "nv"]] },
      { id: "WC3", c: "E5", n: "Vệ sinh tầng 3", r: [26.75, 54.25, 4.25, 3.75], ctl: "tv", nz: 1, wc: KT, d: [["B1e", 1.0, "p", 0.3]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [31, 50, 3, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B6", 1.2, "thang"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (góc Đông Nam)", r: [22.25, 58, 5.75, 8], ctl: "tv", nz: 1, top: N, d: [["B6", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [28, 58, 6, 8], ctl: "tv", nz: 1, steps: 4, top: N }
    ],
    staff: [
      { x: 27, y: 46, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS15", code: "S.15", name: "Tháp đọc ba tầng và hộp thấp", from: "khối vuông",
    PB, LK, TB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2, t3],
    grid: { x: [6, 9.5, 17.25, 22.25, 26.75, 31, 34, 41.5], y: [12, 20, 26, 34, 42, 50, 58, 66] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 70, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 45.5], [5.2, 45.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [38, 96], [38, 38], [25, 38], [25, 34.6]]],
        event: [[[20, -9], [19.25, 6], [19.25, 11.4]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe theo lối ven sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc vào sảnh Bắc, đi thẳng tới sảnh đón tiếp" },
      hatch: [COURT, COURT2, GARDEN, WALK],
      labels: [[12, 38, "Sân giữa"], [22, 73, "Vườn thiếu nhi"], [37.7, 60, "Lối ven sông"], [30, 30, "Hộp công cộng một tầng"], [16, 54, "Tháp đọc ba tầng"]]
    }
  };
  plan.intro = `<p class="lede">Chỉ hai hộp. <b>Hộp công cộng</b> một tầng dài hết bề ngang khu đất, nằm sát quảng trường phía Bắc: sự kiện, cà phê, trưng bày, sảnh đón tiếp. <b>Tháp đọc</b> ba tầng gọn 28 × 24 m nằm ở nửa Nam, cao gấp ba, là khối chính. Giữa hai hộp là sân rộng 8 m và một cầu kính ngắn. Sảnh đón tiếp có hai cửa: cửa Bắc nhận khách từ quảng trường (qua sảnh Bắc), cửa Nam nhận người đọc đi từ bãi xe theo lối ven sông vào sân. Từ sảnh đón tiếp, cầu kính dẫn thẳng tới quầy gửi đồ, mượn trả có cổng từ; mọi phòng đọc trong tháp, kể cả phòng thiếu nhi, đều nằm sau quầy này.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: hai cửa vào (sảnh Bắc phía quảng trường, cửa Nam phía sân) đều dẫn vào sảnh đón tiếp. Từ đây cầu kính 8 m tới quầy gửi đồ, mượn trả có cổng từ ở đầu tháp đọc. Phòng thiếu nhi ở tầng 1 tháp, đi từ sảnh thư viện qua hành lang ngắn; cửa ra vườn thiếu nhi là cửa thoát hiểm có chuông.",
    "Khu sự kiện cũng qua sảnh đón tiếp: phòng đa năng vào qua sảnh chờ mở từ sảnh đón tiếp, phòng chuyên đề mở thẳng từ sảnh đón tiếp. Sảnh Bắc chỉ dẫn tới cà phê, trưng bày, vệ sinh công cộng và sảnh đón tiếp; cửa ra ngoài của phòng đa năng, phòng chuyên đề chỉ là cửa thoát nạn.",
    "Thang có hệ quả: tháp có hai thang (lõi sách ở giữa, thang Đông), cả hai chỉ mở trong vùng đã qua cổng từ; cửa ra ngoài của thang Đông ở tầng 1 là cửa thoát hiểm có chuông. Hộp công cộng một tầng nên không có thang. Lõi sách có thang máy phục vụ cả ba tầng.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → lưu trữ địa phương (liền vách). Kho đóng mở ra hành lang ngay cạnh lõi sách có tời: lên kệ tầng 2, tầng 3. Sách trả: quầy mượn trả mở cửa nhân viên thẳng vào xử lý nghiệp vụ (liền vách), không qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ở hộp công cộng, cạnh sảnh Bắc và sảnh đón tiếp. Trong tháp, ba cụm vệ sinh chồng thẳng nhau ở dải giữa, cạnh lõi sách; cụm tầng 1 mở thẳng vào phòng thiếu nhi, có chỗ thay tã.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở riêng hộp công cộng, cách tháp cả sân. Trong tháp càng lên càng yên: tầng 1 thiếu nhi và nghiệp vụ, tầng 2 học nhóm ở góc Tây Nam (có kho đệm, cửa mở ra sảnh, không chung vách phòng đọc), tầng 3 đọc yên tĩnh, văn phòng, phòng nhân viên. Đọc yên tĩnh, văn phòng không nằm trên học nhóm.",
    "Ánh sáng Bắc – Nam: tháp sâu 24 m chia ba dải 8 m: dải Bắc và dải Nam là phòng có người, dải giữa chỉ có kho, thang, vệ sinh. Tầng 3 là tầng trên cùng, toàn bộ sàn lấy sáng mái răng cưa kính quay Bắc. Hộp công cộng lấy sáng cửa mái hướng Bắc. Đầu Đông, Tây làm tường đặc.",
    "Không che sáng nhau: tháp nằm phía Nam hộp công cộng nên không che cửa mái của hộp này; hộp công cộng chỉ cao +5,45, nhìn từ cửa sổ tầng 1 tháp qua sân 8 m góc che chỉ khoảng 25°.",
    "Ngoài giờ: hộp công cộng chạy riêng (sảnh, cà phê, trưng bày, sự kiện, vệ sinh công cộng); chỉ khóa một cửa cuối cầu kính vào quầy mượn trả.",
    "Kết cấu: hai hộp khung bê tông lưới khoảng 8 m; tháp ba tầng chồng thẳng, không có phần đua; kho đóng ở tầng 1 sát lõi sách; phòng đa năng dầm ứng lực trước nhịp 11,25 m."
  ];
  /* ---------- khối 3D ---------- */
  const { B, SH, col } = G.K;
  const zR = 13.95, RISE = 1.6;
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
    id: "chotS15", fam: "chot", code: "S.15", from: "khối vuông", name: "Tháp đọc ba tầng và hộp thấp", rule: "Một hộp cao ba tầng đứng sau một hộp thấp một tầng",
    tag: "Hộp công cộng một tầng dài sát quảng trường; tháp đọc ba tầng 28 × 24 m ở nửa Nam; cầu kính qua sân nối sảnh với quầy mượn trả",
    story: "Từ quảng trường nhìn vào là một hộp thấp mái cỏ, phía sau là tháp sách ba tầng đứng gọn. Hộp thấp là phòng khách của thành phố, mở cả buổi tối. Tháp là thư viện: tầng 1 thiếu nhi mở ra vườn, tầng 2 đọc mở và học nhóm, tầng 3 đọc yên tĩnh dưới mái răng cưa.",
    why: [["Quy luật hình khối", "Hai hộp chữ nhật, một nằm một đứng, xếp trước sau theo phương Bắc – Nam; không đua, không chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Tháp đọc cao gấp ba hộp công cộng và chiếm khoảng 70% sàn."], ["Nắng và chói", "Phòng có người chỉ lấy sáng mặt Bắc, mặt Nam và mái răng cưa quay Bắc; đầu Đông, Tây đặc."], ["Gió và mưa", "Sân giữa và lối ven sông mở về phía sông, đón gió Đông Nam; cầu kính có mái."], ["Công năng", "Sảnh đón tiếp là bản lề: khách sự kiện vào từ Bắc, người đọc vào từ Nam, đều gặp lễ tân trước."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; tháp ba tầng chồng thẳng, lõi sách bê tông làm lõi cứng; hộp công cộng mái bê tông phủ cỏ có cửa mái; phòng đa năng dầm ứng lực trước nhịp 11,25 m; cầu kính dầm thép nhịp 8 m.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Tháp sâu 24 m có bí ở giữa không?", "Không: dải giữa chỉ có kho đóng, lõi thang, vệ sinh, kho; phòng có người nằm ở hai dải 8 m quay Bắc và Nam. Tầng 3 lấy sáng mái nên dùng cả chiều sâu."], ["Thiếu nhi có lối riêng ra vườn?", "Cửa ra vườn là cửa thoát hiểm có chuông; trẻ và phụ huynh vào qua sảnh đón tiếp, cầu kính và quầy mượn trả như mọi người đọc."]],
    cut: "Hộp công cộng foam vàng thấp, mái giấy cỏ có dải mica cửa mái; tháp ba tầng foam trắng, tầng 3 dán giấy đá, mái răng cưa giấy cỏ và mica quay Bắc; lõi sách tím, thang cam nhô khỏi mái; cầu kính mica.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24.5, 54, 16.5, "Lõi sách", 1], [16, 60, 15.2, "Khối chính · Tháp đọc ba tầng", 1], [30, 22, 6.2, "Khối phụ · Hộp công cộng một tầng", 2], [21.2, 38, 4.8, "Cầu kính", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 15.55), coreBox(t1, "STE", "warn", 15.55),
        B(6, 12, 35.5, 22, 0.45, 5.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(19.75, 34, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 42, 28, 24, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 42, 28, 24, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 42, 28, 24, 9.45, 13.95, "stone", "B", { fl: 1, role: "m" }),
        ...teeth(6, 44, 28, 5, 4),
        // cửa mái hướng Bắc trên hộp công cộng: dải kính thấp
        ...[16, 23, 30].map(y => B(7, y, 33.5, 0.5, 5.45, 5.95, "glass", "X", { op: 0.75 })),
        // tường thấp bao vườn thiếu nhi
        B(11.25, 66, 0.3, 14, 0, 1.2, "stone", "X", { role: "p" }), B(11.25, 79.7, 22.75, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(33.7, 66, 0.3, 14, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 13, 20.25, 26.75, 34]) for (const y of [42, 50, 58, 66]) st.push(col(x, y, 0.45, 13.95));
      for (const x of [6, 17.25, 27.25, 34, 41.5]) for (const y of [12, 20, 34]) st.push(col(x, y, 0.45, 5.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
