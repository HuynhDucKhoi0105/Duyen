/* ================= Ý tưởng H.8: Hai tầng hộp chồng lệch, một lõi (hộp xếp chồng, không hộp bọc ngoài) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // tầng dưới: hộp đế đá (đón tiếp, quầy, kho, nghiệp vụ, thiếu nhi) và hộp sự kiện vàng một tầng bên kia sân.
  // tầng trên: hai hộp đọc đặt lệch trên hộp đế: hộp gỗ trượt 4 m về phía sông, hộp trắng trượt 4 m về phía Nam che nắng cho dải Nam.
  // một lõi tím duy nhất (thang bộ, thang máy, tời sách) xuyên cả ba hộp, nhô lên khỏi mái; kho, nghiệp vụ, quầy bám quanh lõi.
  const EV = [[6, 14], [41, 14], [41, 30], [6, 30]];                  // hộp sự kiện vàng, một tầng
  const LK = [[11, 30], [14, 30], [14, 40], [11, 40]];                // hành lang kính qua sân: đón tiếp → sảnh sự kiện
  const BASE = [[6, 40], [37.5, 40], [37.5, 72], [6, 72]];            // hộp đế đá, tầng 1
  const U1 = [[10, 40], [41.5, 40], [41.5, 59], [10, 59]];            // hộp đọc gỗ, tầng 2, trượt 4 m về phía sông
  const U2 = [[6, 59], [37.5, 59], [37.5, 76], [6, 76]];              // hộp đọc trắng, tầng 2, trượt 4 m về phía Nam
  const GARDEN = [[15, 76], [37.5, 76], [37.5, 82], [15, 82]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const ZE = 6.45, Z2 = 9.45, RISE = 1.6, TOOTH = 4;

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [EV, LK, BASE],
    rooms: [
      // hộp sự kiện vàng (mở ngoài giờ): chỉ vào từ đón tiếp qua hành lang kính; ra ngoài chỉ có cửa thoát nạn
      { id: "A3", c: "A3", n: "Cà phê sách", r: [6, 14, 4.25, 16], ctl: "sk", nz: 3, seat: 32, bar: [[6.4, 14.4], [6.4, 29.6], 8], d: [["W", 1.6, "tn", 0.5]] },
      { id: "WCE", c: "E5", n: "Vệ sinh khu sự kiện", r: [10.25, 14, 3, 5.5], ctl: "sk", nz: 1, wc: KT, d: [["FOY", 1.2, "p"]] },
      { id: "AV", c: "circ", n: "Điều phối, âm thanh", r: [13.25, 14, 3, 5.5], ctl: "sk", nz: 1, d: [["FOY", 0.9, "p"]] },
      { id: "FOY", c: "circ", n: "Sảnh sự kiện", r: [10.25, 19.5, 6, 10.5], ctl: "sk", nz: 2, occ: 60, d: [["A3", 2.4, "o"], ["A2", 2.4, "o", 0.5], ["D4", 1.2, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [16.25, 14, 10.5, 7.5], ctl: "sk", nz: 2, seat: 24 },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Nam, mái hắt)", r: [16.25, 21.5, 10.5, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["D1", 1.8, "p", 0.25], ["D1", 1.8, "p", 0.8]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [26.75, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5], ["D3", 1.4, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [38, 14, 3, 9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"], ["E", 1.2, "tn"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [38, 23, 3, 7], ctl: "sk", nz: 1 },
      { id: "LK", c: "circ", n: "Hành lang kính qua sân", r: [11, 30, 3, 10], ctl: "sk", nz: 2, d: [["FOY", 2.4, "o"], ["A1", 2.4, "o"]] },
      // hộp đế đá, dải Bắc: đón tiếp, quầy giữ đồ – mượn trả, đọc báo, nhân viên, bảo vệ
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 40, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 1.8, "chinh", 0.9], ["A4", 1.8, "k", 0.5], ["WCP", 1.2, "p"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16, 40, 4, 8], ctl: "tv", ctrl: 1, nz: 2, d: [["LH", 2.4, "o"]] },
      { id: "B1n", c: "B1", n: "Đọc báo, sách mới", r: [20, 40, 8, 8], ctl: "tv", nz: 1, d: [["LH", 1.6, "o"], ["LC", 1.6, "o"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [28, 40, 5, 8], ctl: "nv", nz: 1, d: [["E6", 0.9, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn ra sân, Bạch Đằng)", r: [33, 40, 4.5, 3.3], ctl: "nv", nz: 1, d: [["N", 1.0, "nv"], ["E6", 0.9, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [33, 43.3, 4.5, 4.7], ctl: "nv", nz: 1 },
      // dải giữa (không cần cửa sổ): lõi sách, kho, vệ sinh, kỹ thuật
      { id: "WCP", c: "E5", n: "Vệ sinh sảnh (mở ngoài giờ)", r: [6, 48, 4, 4], ctl: "sk", nz: 1, wc: KT },
      { id: "SC", c: "circ", n: "Cửa nhân viên", r: [6, 52, 4, 4], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["CS", 1.0, "nv"], ["C4", 1.2, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 56, 4, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["C2", 1.2, "nv"]] },
      { id: "LH", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [10, 48, 14, 4], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["C1", 1.2, "nv", 0.7], ["LC", 2.4, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, 52, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HN", 1.0, "nv"]] },
      { id: "HN", c: "circ", n: "Sảnh nghiệp vụ dưới lõi", r: [10, 59, 4, 5], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"], ["C1", 1.2, "nv"], ["C2", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng (cạnh lõi sách)", r: [14, 52, 10, 12], ctl: "kho", nz: 1 },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [24, 48, 4, 16], ctl: "tv", nz: 1, d: [["C3", 1.0, "nv"], ["XD", 1.2, "o"], ["WCL1", 1.2, "p"], ["B3", 1.8, "o"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [28, 48, 5, 8], ctl: "kho", nz: 1 },
      { id: "XD", c: "circ", n: "Chỗ để xe đẩy", r: [28, 56, 5, 4], ctl: "tv", nz: 1 },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [28, 60, 5, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [33, 48, 4.5, 12], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "CS2", n: "Thang bộ Đông (thoát nạn thư viện)", r: [33, 60, 4.5, 4], ctl: "tv", nz: 1, core: { st: "u", link: "CS2" }, d: [["B3", 1.2, "thang"], ["E", 1.2, "tnbd"]] },
      // dải Nam (dưới hộp trắng đua 4 m che nắng): nghiệp vụ, thiếu nhi
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 64, 9, 8], ctl: "nv", nz: 1 },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [15, 64, 22.5, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.6]] }
    ],
    staff: [
      { x: 10, y: 45, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 18, y: 44, t: "Thủ thư giữ đồ, mượn trả", sc: ["1", "3", "4"] },
      { x: 35, y: 41.6, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 8, y: 22, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 26, y: 68, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 68, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 60, t: "Nhận sách", sc: ["4"] },
      { x: 13, y: 25, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 14.75, y: 16.7, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hai hộp đọc lệch nhau dưới mái răng cưa đón sáng Bắc ---------- */
  const N = { top: "N" };
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [U1, U2],
    rooms: [
      // hộp gỗ (trượt về phía sông)
      { id: "B5", c: "B5", n: "Tra cứu số", r: [10, 40, 12.5, 8], ctl: "tv", nz: 1, seat: 16, ...N, d: [["B1h", 2.4, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (quay Bắc, xa sự kiện và học nhóm)", r: [22.5, 40, 19, 8], ctl: "tv", nz: 0, seat: 40, ...N, d: [["B1k", 1.2, "p"]] },
      { id: "B1h", c: "B1", n: "Sảnh đọc đầu thang", r: [10, 48, 15.5, 4], ctl: "tv", nz: 1, ...N, d: [["CS", 1.4, "thang"], ["B1k", 2.4, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10, 52, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1w", 1.4, "thang"]] },
      { id: "E1", c: "E1", n: "Văn phòng (cạnh lõi sách)", r: [14, 52, 11.5, 7], ctl: "nv", nz: 0, ...N, d: [["CS", 1.0, "nv"]] },
      { id: "B1k", c: "B1", n: "Kệ mở hộp gỗ, nhìn sông", r: [25.5, 48, 16, 11], ctl: "tv", nz: 1, ...N, d: [["B6", 1.6, "o"], ["WCL2", 1.0, "p"], ["CS2", 1.2, "thang"]] },
      // hộp trắng (trượt về phía Nam)
      { id: "B1w", c: "B1", n: "Đọc mở và kệ (hộp trắng)", r: [6, 59, 16, 9], ctl: "tv", nz: 1, ...N, d: [["B6", 1.6, "o"], ["B1s", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [22, 59, 6, 9], ctl: "tv", nz: 1, steps: 4, ...N, d: [["SS2", 1.6, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [28, 59, 5, 4], ctl: "tv", nz: 1, wc: KT, d: [["SS2", 1.0, "p"]] },
      { id: "CS2", n: "Thang bộ Đông (thoát nạn thư viện)", r: [33, 59, 4.5, 4], ctl: "tv", nz: 1, core: { st: "u", link: "CS2" }, d: [["SS2", 1.2, "thang"]] },
      { id: "SS2", c: "circ", n: "Sảnh thang Đông", r: [28, 63, 9.5, 5], ctl: "tv", nz: 1, d: [["HB", 2.4, "o"]] },
      { id: "B1s", c: "B1", n: "Đọc mở góc Tây Nam", r: [6, 68, 11.5, 8], ctl: "tv", nz: 1, ...N },
      // cụm học nhóm ở đầu Nam hộp trắng, có hành lang riêng và ô kho đệm, không chung vách với phòng đọc
      { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [17.5, 68, 20, 2.25], ctl: "tv", nz: 2, d: [["KD", 1.0, "p"]] },
      { id: "KD", c: "circ", n: "Kho đệm (tủ, xe sách)", r: [17.5, 70.25, 1.5, 5.75], ctl: "tv", nz: 1 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [19 + 4.625 * i, 70.25, 4.625, 5.75], ctl: "tv", nz: 2, ...N, d: [["HB", 0.9, "p"]] }))
    ],
    staff: [
      { x: 24, y: 63, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 20, y: 55.5, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH8", code: "H.8", name: "Hai tầng hộp chồng lệch, một lõi", from: "hộp xếp",
    EV, LK, BASE, U1, U2, GARDEN,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 24, 28, 33, 37.5, 41.5], y: [14, 22, 30, 40, 48, 52, 59, 64, 72, 76] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 60], [5.2, 60]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43.5, 96], [43.5, 35], [15, 35], [15, 39.5]]],
        event: [[[44, 6], [43.5, 35], [15, 35], [15, 39.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe theo vỉa hè Bạch Đằng, vào sân giữa tới cửa đón tiếp", event: "Khách sự kiện: từ quảng trường, Bạch Đằng vào sân giữa, qua đón tiếp" },
      hatch: [GARDEN],
      labels: [[27, 35, "Sân giữa"], [26, 79, "Vườn thiếu nhi"], [24, 22, "Hộp sự kiện"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ 10.3 (ba tầng đọc kéo lệch) và 10.5 bạn đã ghim, bỏ hộp bọc ngoài. Hộp đế đá một tầng đỡ hai hộp đọc đặt lệch: hộp gỗ trượt 4 m về phía sông, hộp trắng trượt 4 m về phía Nam làm mái che nắng cho dải Nam. Một lõi tím duy nhất (thang bộ, thang máy, tời sách) xuyên qua hộp đế và hộp gỗ, nhô lên khỏi mái; kho đóng, xử lý, tiếp nhận, quầy mượn trả bám quanh lõi này nên đường sách ngắn. Hộp sự kiện vàng một tầng nằm bên kia sân, chỉ vào từ đón tiếp qua hành lang kính. Tầng 2 lấy sáng mái răng cưa quay Bắc.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: một cửa vào từ sân giữa vào đón tiếp. Từ đón tiếp: rẽ phải qua quầy giữ đồ, mượn trả (cổng từ) vào thư viện; đi thẳng qua hành lang kính sang hộp sự kiện. Phòng đa năng, chuyên đề, cà phê chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: lõi sách mở vào sảnh thư viện ngay sau quầy giữ đồ, nên người đọc chỉ lên tầng 2 sau khi đã qua đón tiếp và quầy. Thang Đông chỉ mở vào phòng thiếu nhi (đã qua cổng từ) và cửa thoát hiểm có chuông. Hộp sự kiện một tầng, không có thang. Nhân viên vào lõi qua cửa thẻ từ ở sảnh nghiệp vụ.",
    "Đường sách ngắn: lối Tây → cửa cuốn tiếp nhận → xử lý (liền vách) → sảnh nghiệp vụ dưới lõi → kho đóng (liền vách). Tời sách trong lõi đưa sách lên tầng 2, ra thẳng sảnh đọc đầu thang. Sách trả ở quầy đi qua sảnh thư viện, cửa thẻ từ vào kho rồi sảnh nghiệp vụ về xử lý, không qua khu công cộng.",
    "Vệ sinh: cụm sảnh mở ngoài giờ ngay sau đón tiếp; cụm khu sự kiện cạnh sảnh sự kiện; cụm thư viện có chỗ thay tã mở thẳng vào phòng thiếu nhi; cụm tầng 2 chồng đúng lên cụm thư viện tầng 1.",
    "Ánh sáng Bắc – Nam: tầng 1 chỉ đặt phòng có người dọc mặt Bắc (đón tiếp, quầy, đọc báo, nhân viên, bảo vệ) và mặt Nam (xử lý, thiếu nhi), sâu 8 m; dải giữa là lõi, kho, vệ sinh, kỹ thuật. Hộp trắng đua 4 m về phía Nam làm ô văng cho dải Nam. Tầng 2 sáng mái răng cưa quay Bắc. Đầu hồi Đông, Tây đặc.",
    "Không che sáng: sân giữa rộng 10 m; từ cửa sổ hộp sự kiện nhìn sang đỉnh răng cưa +11,05 góc che 43°; hộp sự kiện cao +6,45 nên dải Bắc hộp đế chỉ bị che 26°.",
    "Ngoài giờ: đón tiếp, vệ sinh sảnh, hành lang kính và cả hộp sự kiện chạy riêng; chỉ khóa cửa từ đón tiếp vào quầy giữ đồ, không nằm trên đường thoát nạn nào.",
    "Yên tĩnh: đọc yên tĩnh ở mép Bắc hộp gỗ tầng 2, nằm trên dải đón tiếp, mượn trả, đọc báo (không trên phòng ồn), cách học nhóm 20 m. Học nhóm gom ở mép Nam hộp trắng, có hành lang riêng và ô kho đệm, nằm trên phòng thiếu nhi (hai chỗ ồn chồng nhau). Văn phòng ở tầng 2 cạnh lõi, xuống một tầng là tới nghiệp vụ.",
    "Sửa ngày 05/11 (tiếng ồn): đổi chỗ đọc yên tĩnh và học nhóm. Trước đây đọc yên tĩnh nằm ngay trên phòng thiếu nhi và học nhóm chung vách với tra cứu số; nay đọc yên tĩnh lên mép Bắc hộp gỗ, học nhóm xuống mép Nam hộp trắng, ngăn với phòng đọc bằng hành lang và kho đệm.",
    "Kết cấu: hai hộp đọc là dầm hộp bê tông cao một tầng gối lên tường và cột của hộp đế, đua 4 m (hộp gỗ về phía sông, hộp trắng về phía Nam), không cần cột chống thêm. Lõi tím là lõi cứng bê tông chịu gió cho cả khối."
  ];
  /* ---------- khối 3D: hộp đế, hai hộp đọc lệch, một lõi ---------- */
  const { B, SH, col } = G.K;
  const teeth = (x, y0, w, n, d) => {
    const o = [];
    for (let k = 0; k < n; k++) {
      const y = y0 + k * d;
      o.push(SH(x, y, w, d, Z2, Z2, Z2 + RISE, "-y", "sheet", "X", { top: "grass" }));
      o.push(B(x + 0.3, y - 0.08, w - 0.6, 0.16, Z2, Z2 + RISE - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  plan.idea = {
    id: "chotH8", fam: "chot", code: "H.8", from: "hộp xếp", name: "Hai tầng hộp chồng lệch, một lõi", rule: "Hai hộp đọc lệch trên một hộp đế, một lõi xuyên suốt",
    tag: "Hộp đế đá đỡ hộp gỗ trượt về sông và hộp trắng trượt về Nam; một lõi tím xuyên ba hộp, kho và quầy bám quanh lõi",
    story: "Hộp chồng lên hộp, không có hộp bọc. Từ Bạch Đằng nhìn vào thấy hộp gỗ thò ra 4 m về phía sông trên hộp đế đá; từ bãi xe thấy hộp trắng thò 4 m về phía Nam che bóng cho phòng thiếu nhi. Một lõi tím đứng giữa, như cái trục ghim các hộp lại với nhau.",
    why: [["Quy luật hình khối", "Hai lớp hộp: lớp dưới là hộp đế và hộp sự kiện, lớp trên là hai hộp đọc lệch hai hướng khác nhau (bất đối xứng). Một lõi màu xuyên qua làm điểm nhấn. Mỗi hộp một vật liệu: đá, gỗ, trắng, vàng đất."], ["Khối chính – khối phụ", "Hộp đế và hai hộp đọc (thư viện) là khối chính, cao tới đỉnh răng cưa +11,05; hộp sự kiện một tầng là khối phụ."], ["Nắng và chói", "Tầng 1 sáng Bắc – Nam sâu 8 m, dải Nam có hộp trắng đua 4 m làm ô văng. Tầng 2 sáng mái quay Bắc, không chói màn hình tra cứu."], ["Gió và mưa", "Sân giữa mở về phía sông đón gió Đông Nam; hành lang kính có mái nối đón tiếp với sự kiện."], ["Công năng", "Một lõi sách duy nhất, kho và nghiệp vụ bám quanh lõi; người đọc lên lõi chỉ sau quầy giữ đồ."]],
    kc: { he: "Khung bê tông lưới 4–10 m; lõi thang bê tông cứng. Hai hộp đọc là dầm hộp cao một tầng gối trên hộp đế, đua 4 m. Mái răng cưa thép nhịp 4 m.", nhip: "11,25 m (phòng đa năng), 10 m (kho đóng)", cx: "Không cần cột chống: phần đua 4 m" },
    qa: [["Hộp trắng đua 4 m về phía Nam có làm tối phòng thiếu nhi?", "Không: phần đua là ô văng sâu 4 m (dưới mốc 4,5 m), che nắng trưa mà vẫn để sáng trời vào; cửa sổ phòng thiếu nhi cao từ sàn."], ["Kho có xa kệ không?", "Không: kho đóng sát lõi sách; từ kho tới kệ xa nhất khoảng 35 m kể cả đi thang máy."]],
    cut: "Hộp đế foam xám đá; hộp gỗ dán ván, đặt lệch 2 cm về phía sông; hộp trắng foam trắng đặt lệch 2 cm về phía Nam; mái răng cưa giấy cứng gấp, kính quay Bắc mica. Lõi foam tím cao hơn mái 1 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[26, 50, Z2 + RISE + 0.3, "Khối chính · Hộp gỗ (trượt về sông)", 1], [20, 70, Z2 + RISE + 0.3, "Khối chính · Hộp trắng (trượt về Nam)", 1], [22, 22, ZE + 0.3, "Khối phụ · Hộp sự kiện", 2], [12, 55.5, Z2 + 3.4, "Lõi sách", 1], [12.5, 35, 4.8, "Hành lang kính", 2], [26, 79, 0.6, "Vườn thiếu nhi", 2]],
    build() {
      const v = [
        B(10, 52, 4, 7, 0.45, Z2 + RISE + 2, "violet", "X", { top: "violet", lv: 0 }),
        B(33, 59, 4.5, 4, 0.45, Z2 + RISE + 1.2, "warn", "X", { top: "warn", lv: 0 }),
        B(10, 40, 31.5, 19, 4.95, Z2, "deck", "B", { fl: 1, role: "m" }),
        B(6, 59, 31.5, 17, 4.95, Z2, "sheet", "B", { fl: 1, role: "m" }),
        ...teeth(10, 40, 31.5, 4, 4.75), ...teeth(6, 59, 31.5, 4, 4.25),
        B(6, 40, 31.5, 32, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(6, 14, 35, 16, 0.45, ZE, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(11, 30, 3, 10, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(15, 82, 22.5, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 10, 14, 24, 28, 33, 37.5]) for (const y of [40, 52, 64, 72]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 10.25, 16.25, 26.75, 38, 41]) for (const y of [14, 30]) st.push(col(x, y, 0.45, ZE));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
