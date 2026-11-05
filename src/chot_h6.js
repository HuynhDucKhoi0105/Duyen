/* ================= Ý tưởng H.6: Hai hộp treo so le (hộp xếp chồng, không hộp bọc ngoài) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hai hộp đọc dài Đông – Tây đặt trên hai hộp thấp, đua ra 4 m về hai phía ngược nhau:
  // hộp đọc Bắc đua về phía Tây làm mái che cửa vào, hộp đọc Nam đua về phía sông che vườn.
  // hộp sự kiện một tầng đứng riêng ở đầu Bắc; một sảnh đón tiếp duy nhất nằm ở chân hộp đọc Bắc
  const LD = [[6, 14], [38, 14], [38, 30], [6, 30]];       // hộp sự kiện một tầng: đa năng, chuyên đề, cà phê
  const LK = [[12, 30], [15, 30], [15, 38], [12, 38]];     // hành lang kính từ sảnh đón tiếp sang sảnh sự kiện
  const L2 = [[10, 38], [41, 38], [41, 54], [10, 54]];     // hộp thấp Bắc: đón tiếp, trưng bày, quầy thư viện, lõi sách, thiếu nhi
  const U2 = [[6, 38], [38, 38], [38, 54], [6, 54]];       // hộp đọc Bắc (tầng 2), đua 4 m về phía Tây
  const LT = [[10, 54], [14, 54], [14, 62], [10, 62]];     // hành lang sách tầng 1 nối lõi sách Bắc với lõi sách Nam (nhân viên)
  const BR = [[10, 54], [14, 54], [14, 62], [10, 62]];     // cầu kính tầng 2, ngay trên hành lang sách
  const L3 = [[6, 62], [34, 62], [34, 81.6], [6, 81.6]];   // hộp thấp Nam: nghiệp vụ, kho, văn phòng
  const U3 = [[6, 62], [38, 62], [38, 78], [6, 78]];       // hộp đọc Nam (tầng 2), đua 4 m về phía sông
  const STEV = [[34, 62], [38, 62], [38, 69.6], [34, 69.6]]; // tháp thang thoát nạn Đông, đứng dưới góc Bắc phần hộp đọc Nam đua ra
  const GARDEN = [[30.5, 54], [41, 54], [41, 62], [30.5, 62]];
  const PORCH = [[6, 38], [10, 38], [10, 54], [6, 54]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const Z2 = 9.45, ZD = 6.45;

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [LD, LK, L2, LT, L3, STEV],
    rooms: [
      // hộp sự kiện: chỉ vào được từ sảnh đón tiếp qua hành lang kính; cửa ra ngoài chỉ là cửa thoát nạn
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 14, 4.7, 16], ctl: "sk", nz: 2, seat: 24, d: [["FOYw", 1.2, "p"], ["W", 1.2, "tn"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh khu sự kiện", r: [10.7, 14, 4.3, 8], ctl: "sk", nz: 1, wc: KT, d: [["FOYw", 1.2, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [15, 14, 9, 8], ctl: "sk", nz: 3, seat: 32, bar: [[15.4, 14], [23.6, 14], 6], d: [["FOYm", 2.4, "o"]] },
      { id: "FOYw", c: "circ", n: "Sảnh sự kiện (Tây)", r: [10.7, 22, 4.3, 8], ctl: "sk", nz: 2, occ: 40, d: [["FOYm", 2.4, "o"]] },
      { id: "FOYm", c: "circ", n: "Sảnh sự kiện (giữa)", r: [15, 22, 4.5, 4.7], ctl: "sk", nz: 2, d: [["FOYe", 2.4, "o"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [15, 26.7, 4.5, 3.3], ctl: "nv", nz: 1, d: [["FOYw", 0.9, "nv"], ["FOYe", 0.9, "nv"]] },
      { id: "FOYe", c: "circ", n: "Sảnh sự kiện (Đông)", r: [19.5, 22, 4.5, 8], ctl: "sk", nz: 2, occ: 40, d: [["D1", 2, "p", 0.25], ["D1", 1.6, "p", 0.8], ["S", 1.6, "tn", 0.5]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [24, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [35.25, 14, 2.75, 9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [35.25, 23, 2.75, 7], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      { id: "LK", c: "circ", n: "Hành lang kính sang sự kiện", r: [12, 30, 3, 8], ctl: "sk", nz: 2, d: [["FOYw", 2.4, "o"], ["A1", 2.4, "o"]] },
      // hộp thấp Bắc: cửa vào duy nhất dưới phần hộp đọc đua ra → sảnh đón tiếp → quầy gửi đồ, mượn trả → lõi sách
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [10, 38, 9.5, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["W", 2.4, "chinh", 0.5], ["A4", 1.8, "k", 0.5], ["A2", 3, "o", 0.5]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [19.5, 38, 11.25, 8], ctl: "sk", nz: 2, occ: 30 },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [30.75, 38, 10.25, 16], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
      { id: "CS", n: "Lõi sách Bắc: thang bộ + thang máy + tời sách", r: [10, 46, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LT", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14, 46, 4, 8], ctl: "tv", ctrl: 1, nz: 2, d: [["CS", 1.6, "o"], ["HB", 1.6, "o"]] },
      { id: "HB", c: "circ", n: "Sảnh thư viện tầng 1", r: [18, 46, 3, 8], ctl: "tv", nz: 1, d: [["B1n", 2.4, "o"]] },
      { id: "B1n", c: "B1", n: "Sách mới, báo, tạp chí", r: [21, 46, 5, 8], ctl: "tv", nz: 1, d: [["XV", 1.6, "o"]] },
      { id: "XV", c: "circ", n: "Sảnh đệm thiếu nhi, xe đẩy", r: [26, 46, 4.75, 5], ctl: "tv", nz: 2, d: [["B3", 1.6, "p"], ["WCL1", 1.2, "p"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [26, 51, 4.75, 3], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      // hành lang sách: nhân viên đẩy xe sách giữa hai lõi, không qua khu công cộng
      { id: "LT", c: "circ", n: "Hành lang sách (nhân viên)", r: [10, 54, 4, 8], ctl: "nv", nz: 1, d: [["STS", 1.2, "nv"]] },
      // hộp thấp Nam: chuỗi tiếp nhận → xử lý → kho nằm quanh lõi sách Nam (khu nhân viên, thẻ từ)
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 62, 4, 7.6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["STS", 1.2, "nv"], ["HC", 1.2, "nv"]] },
      { id: "STS", n: "Lõi sách Nam: thang bộ + thang máy + tời sách", r: [10, 62, 4, 7.6], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["C2", 1.2, "nv"], ["HC", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [14, 62, 9, 7.6], ctl: "nv", nz: 1, d: [["HC", 1.2, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [23, 62, 11, 7.6], ctl: "nv", nz: 0, d: [["HC", 1.0, "nv"]] },
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [34, 62, 4, 7.6], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["E", 1.2, "tnbd"]] },
      { id: "HC", c: "circ", n: "Hành lang nghiệp vụ", r: [6, 69.6, 28, 2], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["E", 1.2, "tn"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 71.6, 12, 10], ctl: "kho", nz: 1, d: [["HC", 1.2, "nv", 0.5]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [18, 71.6, 5.5, 10], ctl: "kt", nz: 3, d: [["HC", 1.0, "nv"], ["S", 1.4, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [23.5, 71.6, 4, 10], ctl: "kho", nz: 1, d: [["HC", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [27.5, 71.6, 2, 10], ctl: "nv", nz: 1, d: [["HC", 0.9, "nv"]] },
      { id: "HC2", c: "circ", n: "Sảnh phòng nhân viên", r: [29.5, 71.6, 4.5, 2], ctl: "nv", nz: 1, d: [["HC", 1.0, "nv"], ["E2", 1.0, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên (sáng Nam)", r: [29.5, 73.6, 4.5, 8], ctl: "nv", nz: 1 }
    ],
    staff: [
      { x: 13, y: 43, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 16, y: 51, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 17.2, y: 28.3, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 20, y: 17, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 47, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 18.5, y: 65.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 65.5, t: "Nhận sách", sc: ["4"] },
      { x: 28.5, y: 65.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 21.7, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 36.6, y: 18.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: hai hộp đọc treo, nối bằng cầu kính giữa hai lõi sách ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [U2, BR, U3],
    rooms: [
      // hộp đọc Bắc: học nhóm ở đầu Tây cạnh lõi, hành lang riêng mở thẳng vào lõi; vệ sinh làm vách đệm; tra cứu số quay Bắc ở đầu Đông
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [6 + 4.175 * i, 38, 4.175, 5.8], ctl: "tv", nz: 2, d: [["HB4", 0.9, "p"]] })),
      { id: "HB4", c: "circ", n: "Hành lang học nhóm", r: [6, 43.8, 16.7, 2.2], ctl: "tv", nz: 2, d: [["CS", 1.4, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2 (Bắc)", r: [22.7, 38, 1.8, 8], ctl: "tv", nz: 1, wc: KT, d: [["B1d", 0.9, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (sáng Bắc)", r: [24.5, 38, 13.5, 8], ctl: "tv", nz: 1, seat: 16, d: [["B1d", 2.4, "o", 0.9]] },
      { id: "B1w", c: "B1", n: "Góc đọc cửa vào (Tây)", r: [6, 46, 4, 8], ctl: "tv", nz: 1 },
      { id: "CS", n: "Lõi sách Bắc: thang bộ + thang máy + tời sách", r: [10, 46, 4, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1d", 1.6, "thang"], ["B1w", 1.4, "thang"], ["BR", 2.4, "o"]] },
      { id: "B1d", c: "B1", n: "Đọc mở và kệ (hộp Bắc, quay Nam)", r: [14, 46, 24, 8], ctl: "tv", nz: 1 },
      { id: "BR", c: "circ", n: "Cầu kính giữa hai lõi sách", r: [10, 54, 4, 8], ctl: "tv", nz: 1, d: [["STS", 2.4, "o"]] },
      // hộp đọc Nam: đọc yên tĩnh quay Bắc (sáng dịu), đọc mở quay Nam
      { id: "B1g", c: "B1", n: "Đọc tài liệu địa phương", r: [6, 62, 4, 7.6], ctl: "tv", nz: 1, d: [["B6", 1.6, "o"]] },
      { id: "STS", n: "Lõi sách Nam: thang bộ + thang máy + tời sách", r: [10, 62, 4, 7.6], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["SL", 1.6, "thang"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (Tây)", r: [14, 62, 10, 7.6], ctl: "tv", nz: 0, seat: 20, d: [["B1h", 1.2, "p"]] },
      { id: "B2b", c: "B2", n: "Đọc yên tĩnh (Đông)", r: [24, 62, 10, 7.6], ctl: "tv", nz: 0, seat: 20, d: [["B1h", 1.2, "p"]] },
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [34, 62, 4, 7.6], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1h", 1.4, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 69.6, 6, 8.4], ctl: "tv", nz: 1, steps: 4, d: [["SL", 1.6, "o"]] },
      { id: "SL", c: "circ", n: "Sảnh thang Nam", r: [12, 69.6, 2, 8.4], ctl: "tv", nz: 1, d: [["B1h", 1.6, "o"]] },
      { id: "B1h", c: "B1", n: "Đọc mở và kệ (hộp Nam, quay Nam)", r: [14, 69.6, 22.4, 8.4], ctl: "tv", nz: 1 },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện tầng 2 (Nam)", r: [36.4, 69.6, 1.6, 8.4], ctl: "tv", nz: 1, wc: KT, d: [["B1h", 0.9, "p"]] }
    ],
    staff: [
      { x: 9, y: 73.8, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH6", code: "H.6", name: "Hai hộp treo so le", from: "hộp xếp",
    LD, LK, L2, U2, LT, BR, L3, U3, GARDEN,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14, 18, 26, 30.5, 34, 38, 41], y: [14, 22, 30, 38, 46, 54, 62, 69.6, 78] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 65.8], [5.2, 65.8]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[20, 86], [5, 86], [5, 42], [9.2, 42]]],
        event: [[[20, -9], [5, 4], [5, 42], [9.2, 42]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe theo lối đi bộ phía Tây, vào cửa dưới hộp đọc đua ra", event: "Khách sự kiện: quảng trường Bắc theo lối phía Tây, vào sảnh đón tiếp" },
      hatch: [GARDEN, PORCH],
      labels: [[36, 58, "Vườn thiếu nhi"], [8, 42, "Cửa vào có mái"], [22, 22, "Hộp sự kiện"], [24, 34, "Sân Bắc"], [18, 58, "Sân Nam"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ ý tưởng "Hai hộp treo so le" và 10.3 (ba tầng đọc kéo lệch) bạn đã ghim, bỏ hộp bọc ngoài. Hai hộp đọc dài 32 m nằm ngang Đông – Tây, đặt trên hai hộp thấp ngắn hơn và đua ra 4 m về hai phía ngược nhau: hộp Bắc đua về phía Tây làm mái che cửa vào, hộp Nam đua về phía sông che lối thoát. Hộp sự kiện một tầng đứng riêng ở đầu Bắc. Cả nhà có một cửa vào, ngay dưới phần hộp đọc đua ra, vào thẳng sảnh đón tiếp: rẽ trái qua hành lang kính sang khu sự kiện, đi thẳng qua quầy gửi đồ, mượn trả có cổng từ mới tới lõi sách và thư viện. Bản sửa 05/11: hai lõi sách (thang bộ, thang máy, tời sách) nối thẳng với nhau bằng hành lang sách tầng 1 và cầu kính tầng 2, kho, xử lý, tiếp nhận nằm quanh lõi, nên sách đi ngắn và nhanh. Mọi hộp sâu 16 m, mặt dài quay Bắc – Nam, cách nhau hai sân 8 m.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: cửa vào duy nhất của khách ở mặt Tây sảnh đón tiếp, dưới phần hộp đọc Bắc đua ra 4 m nên có mái che mưa. Từ sảnh, khách sự kiện đi hành lang kính qua sân Bắc vào sảnh sự kiện; khách xem trưng bày đi thẳng; người đọc qua quầy gửi đồ, mượn trả có cổng từ. Phòng đa năng, chuyên đề không có cửa vào từ ngoài, cửa ra ngoài chỉ là cửa thoát nạn.",
    "Ánh sáng Bắc – Nam: mọi hộp sâu 16 m. Phòng đa năng, chuyên đề, đón tiếp, thiếu nhi chạy suốt chiều sâu nên lấy sáng hai mặt; các phòng khác sâu tối đa 8 m quay một mặt. Đầu Đông, đầu Tây các hộp là tường đặc. Phần hộp đọc đua ra nằm ở đầu hồi, không đè lên cửa sổ phòng nào bên dưới.",
    "Không che sáng nhau: hai sân rộng 8 m, hộp chồng hai tầng cao +9,45, góc che từ cửa sổ tầng 1 là 44°. Hộp sự kiện một tầng cao +6,45 nên phòng tầng 1 hộp Bắc nhìn sang chỉ bị che 31°. Hành lang sách tầng 1 và cầu kính tầng 2 nằm chồng nhau ở đầu Tây sân Nam, chỉ chạm hai lõi thang (không có cửa sổ).",
    "Bảo mật sách: quầy mượn trả là cửa duy nhất vào khu đọc. Hộp sự kiện một tầng, không có thang nào, nên không thể lên khu đọc từ đó. Thang thư viện Bắc chỉ mở vào sảnh sau quầy; thang thư viện Nam xuống tầng 1 chỉ mở vào hành lang nghiệp vụ bằng cửa thẻ từ, nên không ai từ phía Nam lên thẳng khu đọc. Cửa ra ngoài ở chân thang Bắc và cửa ra vườn thiếu nhi là cửa thoát hiểm có chuông báo.",
    "Ngoài giờ: đón tiếp, trưng bày, hành lang kính và cả hộp sự kiện (đa năng, chuyên đề, cà phê, vệ sinh) chạy riêng. Chỉ khóa một cửa: cửa từ sảnh đón tiếp vào quầy mượn trả, cửa này không nằm trên đường thoát nạn nào.",
    "Đường sách: xe giao sách đỗ dưới phần hộp đọc Nam đua ra (có mái che), dỡ hàng qua cửa cuốn vào tiếp nhận → lõi sách Nam → xử lý → hành lang nghiệp vụ → kho đóng, tất cả liền nhau (tiếp nhận tới xử lý 6 m, xử lý tới kho 11 m). Sách lên kệ bằng tời sách trong lõi sách Nam (kệ xa nhất 42 m kể cả lên tầng). Sách trả ở quầy đi qua lõi sách Bắc, hành lang sách tầng 1 (chỉ nhân viên) sang lõi sách Nam rồi vào xử lý, khoảng 21 m, không qua sảnh công cộng.",
    "Yên tĩnh: đọc yên tĩnh ở mặt Bắc hộp đọc Nam, xa hộp sự kiện hai sân và cách học nhóm hơn 15 m. Học nhóm gom ở đầu Tây hộp đọc Bắc sát lõi thang, có hành lang riêng mở thẳng vào lõi, ngăn với tra cứu số bằng khối vệ sinh và với đọc mở bằng hành lang. Thiếu nhi ở đầu Đông hộp thấp Bắc, ngăn với phòng báo bằng sảnh đệm có vệ sinh, thay tã; cửa ra vườn có tường bao ở sân Nam.",
    "Vệ sinh và thang: vệ sinh sự kiện cạnh sảnh sự kiện (cách phòng đa năng 18 m); vệ sinh thư viện tầng 1 cạnh thiếu nhi; mỗi hộp đọc tầng 2 có một cụm vệ sinh trong khu đọc (chỗ đọc xa nhất đi 24 m). Hai lõi sách (thang bộ, thang máy, tời sách) nằm sau quầy mượn trả: lõi Bắc mở ngay cạnh quầy, lõi Nam xuống tầng 1 chỉ mở vào khu nghiệp vụ bằng cửa thẻ từ. Cầu kính tầng 2 và hành lang sách tầng 1 nối thẳng hai lõi.",
    "Sửa ngày 05/11 (đi lại gọn): quầy mượn trả chuyển ra ngay sau sảnh đón tiếp (5 m); thêm hành lang sách tầng 1 nối hai lõi sách qua sân Nam, nên sách trả về xử lý còn 21 m (trước 75 m) và kho tới kệ xa nhất còn 42 m (trước 58 m); cầu kính dời về giữa hai lõi; thêm vệ sinh trong hộp đọc Nam (chỗ đọc xa nhất tới vệ sinh còn 24 m, trước 78 m); học nhóm có hành lang riêng; hộp thấp Bắc dài thêm 3 m về phía sông cho thiếu nhi; tiếp nhận, xử lý, kho đóng xếp quanh lõi sách Nam; phòng nhân viên sâu 8 m quay Nam, không sát phòng kỹ thuật. Thêm tháp thang thoát nạn Đông (lõi cam) đứng dưới góc Bắc phần hộp đọc Nam đua ra, cao bằng mái để không che cửa sổ thiếu nhi quá 45°, cửa ra ngoài có chuông báo; học nhóm dời sát lõi Bắc, hành lang học nhóm mở thẳng vào lõi; vệ sinh tầng 2 hộp Nam dời về đầu Đông. Đường thoát xa nhất còn 21,4 m tầng 1 và 29,1 m tầng 2 (trước 24,9 và 36,6 m). Tổng sàn 2.700 m².",
    "Kết cấu: hai hộp đọc là dầm hộp bê tông cao một tầng, đua 4 m qua hàng cột cuối của hộp thấp (dưới mốc 4 m nên không cần cột chống). Lưới cột 8 m theo phương dọc, dầm ngang nhịp 16 m bê tông ứng lực trước. Phòng đa năng 11 × 16 m không cột giữa.",
    "Diện tích: tổng sàn khoảng 2.700 m², mọi phòng trong ±10% đề. Người đọc từ bãi xe đi lối đi bộ phía Tây (sát lối xe cứu hỏa) tới cửa vào có mái."
  ];
  /* ---------- khối 3D: hộp thấp, hộp đọc treo, mỗi hộp một vật liệu ---------- */
  const { B, col } = G.K;
  const coreBox = (id, c) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, Z2 + 1.6, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH6", fam: "chot", code: "H.6", from: "hộp xếp", name: "Hai hộp treo so le", rule: "Hai hộp dài đặt lệch trên hai hộp thấp, đua ngược chiều",
    tag: "Hai hộp đọc gỗ và gạch dài 32 m đặt trên hai hộp thấp, đua 4 m ngược chiều nhau; hộp sự kiện một tầng đứng riêng; một cửa vào dưới phần đua",
    story: "Hộp đặt lên hộp, không có hộp bọc ngoài. Hộp đọc Bắc bằng gỗ trượt về phía phố, phần đua ra thành mái hiên cho cửa vào duy nhất. Hộp đọc Nam bằng gạch trượt về phía sông, phần đua ra che chỗ xe giao sách và lối thoát. Nhìn từ sông, hai hộp lệch nhau như hai ngăn kéo kéo ra hai phía.",
    why: [["Quy luật hình khối", "Hai cặp hộp chồng, hộp trên dài hơn hộp dưới và lệch ngược chiều nhau (bất đối xứng). Hộp sự kiện thấp đứng riêng làm nền. Mỗi hộp một vật liệu: vàng đất, trắng, gỗ, đá, gạch."], ["Khối chính – khối phụ", "Hai hộp đọc treo là khối chính, chiếm phần lớn sàn thư viện và đứng cao nhất +9,45. Hộp sự kiện một tầng, hành lang kính, cầu kính là khối phụ."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam qua sân 8 m; đầu hồi Đông, Tây đặc. Tra cứu số, học nhóm, đọc yên tĩnh đều quay Bắc nên không chói màn hình."], ["Gió và mưa", "Hai sân mở ra sông, gió Đông Nam lùa qua. Phần hộp đua ra che mưa cho cửa vào phía Tây và cho chỗ dỡ sách."], ["Công năng", "Một cửa vào, sảnh đón tiếp là bản lề; hộp sự kiện một tầng nên không có thang nào lên khu đọc; khu đọc chỉ vào qua quầy có cổng từ."]],
    kc: { he: "Khung bê tông lưới 8 m theo phương dọc; hai hộp đọc là dầm hộp (tường đầu hồi và sàn làm việc như dầm cao một tầng), đua 4 m qua hàng cột cuối của hộp thấp. Dầm ngang nhịp 16 m bê tông ứng lực trước. Cầu kính dầm thép nhịp 8 m.", nhip: "16 m (chiều sâu hộp), đua 4 m", cx: "Không cần cột chống: phần đua đúng 4 m" },
    qa: [["Phần hộp đua 4 m có cần cột không?", "Không: đua 4 m là mức tự đặt không cần cột; tường đầu hồi hộp đọc làm dầm cao một tầng gánh phần đua. Nếu thầy muốn chắc hơn có thể thêm hai cột thép mảnh ở mép đua."], ["Cửa vào phía Tây có gần lối xe cứu hỏa?", "Có, cửa vào nhìn ra lối Tây rộng 6 m; người đi bộ đi sát mép nhà dưới mái đua, lối xe vẫn trống. Đổi lại cửa vào có mái che và nằm giữa hai đầu khu đất."], ["Khách sự kiện có đi qua thư viện?", "Không. Từ sảnh đón tiếp, khách rẽ trái qua hành lang kính sang hộp sự kiện. Quầy thư viện ở bên phải, khóa ngoài giờ."]],
    cut: "Hộp sự kiện foam bọc giấy vàng đất; hộp thấp Bắc trắng, hộp thấp Nam đá xám; hai hộp đọc dán gỗ và giấy gạch, đặt lệch 2 cm (4 m) so với hộp dưới. Hành lang kính, cầu kính: mica. Lõi thang foam tím cao hơn mái 0,8 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 22, ZD + 0.3, "Khối phụ · Hộp sự kiện một tầng", 2], [22, 46, Z2 + 0.3, "Khối chính · Hộp đọc Bắc (đua về phía Tây)", 1], [22, 70, Z2 + 0.3, "Khối chính · Hộp đọc Nam (đua về phía sông)", 1], [8, 46, 3, "Cửa vào dưới phần đua", 2], [33, 58, 0.6, "Vườn thiếu nhi", 2], [13.5, 34, 4.8, "Hành lang kính", 2], [7.5, 58, 9.3, "Cầu kính", 2]],
    build() {
      // lõi và hộp tầng 2 đặt trước để phép kiểm góc che gặp khối cao nhất trước
      const v = [
        coreBox("CS", "violet"), coreBox("STS", "violet"),
        B(34, 62, 4, 7.6, 0.45, Z2, "warn", "X", { top: "warn", lv: 0 }),
        B(6, 38, 32, 16, 4.95, Z2, "deck", "B", { fl: 1, role: "m" }),
        B(6, 62, 32, 16, 4.95, Z2, "ribbon", "B", { fl: 1, role: "m" }),
        B(10, 54, 4, 8, 4.95, 8.95, "glass", "L", { fl: 1, role: "p" }),
        B(10, 54, 4, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 14, 32, 16, 0.45, ZD, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(12, 30, 3, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(10, 38, 31, 16, 0.45, 4.95, "sheet", "A", { fl: 1, role: "m" }),
        B(6, 62, 28, 19.6, 0.45, 4.95, "stone", "C", { fl: 1, top: "grass", role: "p" }),
        // tường thấp bao vườn thiếu nhi
        B(30.75, 54, 0.3, 8, 0, 1.2, "stone", "X", { role: "p" }), B(40.7, 54, 0.3, 8, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [10, 18, 26, 34, 41]) for (const y of [38, 46, 54]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 14, 22, 30, 34]) for (const y of [62, 70, 78]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 14, 24, 35.25]) for (const y of [14, 30]) st.push(col(x, y, 0.45, ZD));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
