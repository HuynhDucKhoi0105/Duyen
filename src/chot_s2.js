/* ================= Ý tưởng S.2: Ba tầng lùi bậc (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba hộp chữ nhật chồng lên nhau, mỗi tầng trên lùi về phía Nam: tầng 1 sâu 44 m (công cộng, sự kiện, kho),
  // tầng 2 sâu 22 m, tầng 3 sâu 18 m (thư viện). Phần mái tầng dưới lộ ra là sân thượng cỏ và cửa mái hướng Bắc.
  const T1B = [[6, 28], [41.5, 28], [41.5, 72], [6, 72]];
  const T2B = [[6, 50], [41.5, 50], [41.5, 72], [6, 72]];
  const T3B = [[6, 54], [41.5, 54], [41.5, 72], [6, 72]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  // lõi thẳng hàng cả ba tầng
  const CS = { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.6, 58, 4, 6], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } };
  const STS = { id: "STS", n: "Thang bộ thư viện Đông Nam", r: [36, 64, 4, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STS" } };

  /* ---------- Tầng 1: công cộng, sự kiện (phần phía Bắc lộ mái, lấy sáng cửa mái), kho và nghiệp vụ (phía Nam) ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [T1B],
    rooms: [
      // dãy Bắc: cà phê, sảnh đón tiếp, trưng bày, chuyên đề (cửa sổ Bắc ra quảng trường + cửa mái)
      { id: "A3", c: "A3", n: "Cà phê sách", r: [6, 28, 7, 10], ctl: "sk", nz: 3, seat: 32, top: N, d: [["N", 1.2, "tn", 0.3], ["COR", 1.8, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [13, 28, 8, 10], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["N", 2.4, "chinh", 0.5], ["COR", 3.0, "o"], ["A3", 1.6, "o"], ["A2", 1.6, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [21, 28, 9, 10], ctl: "sk", nz: 2, occ: 30, top: N, d: [["COR", 2.4, "o"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [30, 28, 11.5, 6.5], ctl: "sk", nz: 2, seat: 24, top: N, d: [["N", 1.2, "tn", 0.6], ["SD", 1.6, "p"]] },
      { id: "SD", c: "circ", n: "Sảnh chuyên đề", r: [30, 34.5, 11.5, 3.5], ctl: "sk", nz: 2, d: [["COR", 2.4, "o"]] },
      { id: "COR", c: "circ", n: "Hành lang công cộng", r: [6, 38, 35.5, 2], ctl: "sk", nz: 2, d: [["E", 1.4, "tn"], ["D1", 1.8, "p", 0.45], ["D1", 1.8, "p", 0.8], ["WCP", 1.2, "p"], ["A4", 2.0, "k"]] },
      // dãy giữa: nghiệp vụ và quầy kiểm soát sát sảnh, vệ sinh công cộng, phòng đa năng
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 40, 7, 10], ctl: "nv", nz: 1, top: N, d: [["A4", 1.0, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [13, 40, 4, 7.5], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["HL", 2.0, "o"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [13, 47.5, 8, 2.5], ctl: "tv", nz: 1, d: [["HL2", 1.2, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [17, 40, 4, 6], ctl: "sk", nz: 1, wc: KT, d: [["KP", 0.9, "p"]] },
      { id: "KP", c: "circ", n: "Kho dụng cụ sảnh", r: [17, 46, 4, 1.5], ctl: "sk", nz: 1 },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [21, 40, 17, 10], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["D2", 2.4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [38, 40, 3.5, 7.14], ctl: "sk", nz: 3, d: [["E", 1.4, "tn", 0.5]] },
      { id: "DK", c: "circ", n: "Kho bục, âm thanh", r: [38, 47.14, 3.5, 2.86], ctl: "sk", nz: 1, d: [["D2", 0.9, "p"]] },
      // phần dưới tầng 2: dải giữa kho, lõi, kỹ thuật (không cần cửa sổ)
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 50, 5, 6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"], ["C1", 1.2, "nv"], ["C3", 1.0, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 56, 5, 8], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [11, 50, 8.6, 14], ctl: "kho", nz: 1, d: [["C2", 1.2, "nv"], ["CS", 1.2, "nv"]] },
      { id: "HL2", c: "circ", n: "Sảnh lõi sách", r: [19.6, 50, 6, 8], ctl: "tv", nz: 1, d: [["LH", 2.4, "o"], ["WCL1", 0.9, "p"]] },
      { ...CS, d: [["HL2", 1.4, "thang"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [23.6, 58, 2, 6], ctl: "tv", nz: 1, wc: KT },
      { id: "LH", c: "circ", n: "Hành lang đọc tầng 1", r: [25.6, 50, 6.4, 14], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["KST", 1.6, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [32, 50, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "KST", c: "circ", n: "Kho xe sách, kệ trả sách", r: [32, 55, 4, 9], ctl: "tv", nz: 1 },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [36, 50, 5.5, 3.6], ctl: "nv", nz: 1, d: [["E", 1.0, "nv"], ["E4", 0.9, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [36, 53.6, 5.5, 10.4], ctl: "kt", nz: 3, d: [["E", 1.4, "nv", 0.5]] },
      // dải Nam: nhân viên, bảo vệ, đọc tầng 1
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [6, 64, 5, 8], ctl: "nv", nz: 1, d: [["W", 1.0, "nv"], ["E1", 0.9, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [11, 64, 10, 8], ctl: "nv", nz: 0, d: [["KE", 0.9, "nv"]] },
      { id: "KE", c: "circ", n: "Hành lang bảo vệ", r: [21, 64, 2.5, 2], ctl: "nv", nz: 1 },
      { id: "E3", c: "E3", n: "Trực bảo vệ (lối nhân viên Nam)", r: [21, 66, 2.5, 6], ctl: "nv", nz: 1, d: [["KE", 0.9, "nv"], ["S", 1.0, "nv"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ tầng 1 (nhìn vườn Nam)", r: [23.5, 64, 12.5, 8], ctl: "tv", nz: 1 },
      { ...STS, d: [["B1a", 1.2, "thang"], ["S", 1.2, "tnbd"]] },
      { id: "KTE", c: "circ", n: "Hộp kỹ thuật đứng", r: [40, 64, 1.5, 8], ctl: "kt", nz: 1, d: [["E", 0.9, "nv"]] }
    ],
    staff: [
      { x: 17, y: 31, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 15, y: 42.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 22.2, y: 69, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 9.5, y: 30, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 9.5, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8.5, y: 53, t: "Nhận sách", sc: ["4"] },
      { x: 16, y: 68, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 25, y: 33, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 39.7, y: 48.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: thư viện, lùi 22 m so với mép Bắc tầng 1 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [T2B],
    rooms: [
      // dải Bắc: thiếu nhi, tra cứu số (cửa sổ Bắc nhìn qua sân thượng cỏ)
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [6, 50, 21, 8], ctl: "tv", nz: 3, seat: 32, d: [["H3", 1.8, "p", 0.4], ["WCL2", 1.0, "p"]] },
      { id: "KD", c: "circ", n: "Kho đệm cách âm", r: [27, 50, 2, 8], ctl: "tv", nz: 1, d: [["H4", 0.9, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [29, 50, 12.5, 8], ctl: "tv", nz: 1, seat: 16, d: [["H4", 1.6, "o"]] },
      // dải giữa: lõi, vệ sinh, sảnh
      { id: "H3", c: "circ", n: "Sảnh đọc Tây", r: [6, 58, 13.6, 6], ctl: "tv", nz: 1, d: [["B1s", 2.4, "o"]] },
      { ...CS, d: [["H3", 1.4, "thang"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh tầng 2 (có thay tã)", r: [23.6, 58, 3.33, 6], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["H4", 1.0, "p"]] },
      { id: "H4", c: "circ", n: "Sảnh đọc Đông", r: [26.93, 58, 14.57, 6], ctl: "tv", nz: 1, d: [["B1s2", 2.4, "o"]] },
      // dải Nam: đọc mở, đọc linh hoạt (cửa sổ Nam)
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (Tây Nam)", r: [6, 64, 15, 8], ctl: "tv", nz: 1, d: [["B6", 2.4, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [21, 64, 6.25, 8], ctl: "tv", nz: 1, steps: 4, d: [["B1s2", 2.4, "o"]] },
      { id: "B1s2", c: "B1", n: "Đọc mở và kệ (Nam)", r: [27.25, 64, 8.75, 8], ctl: "tv", nz: 1 },
      { ...STS, d: [["H4", 1.2, "thang"]] },
      { id: "KTE", c: "circ", n: "Hộp kỹ thuật đứng", r: [40, 64, 1.5, 8], ctl: "kt", nz: 1, d: [["H4", 0.9, "nv"]] }
    ],
    staff: [
      { x: 16, y: 55, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 24, y: 68, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 3: thư viện yên tĩnh, lùi thêm 4 m; tầng trên cùng nên lấy sáng mái hướng Bắc ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [T3B],
    rooms: [
      { id: "B1w3", c: "B1", n: "Đọc mở và kệ (Tây)", r: [6, 54, 13.6, 7], ctl: "tv", nz: 1, top: N, d: [["H5", 2.4, "o"]] },
      { id: "H5", c: "circ", n: "Hành lang học nhóm", r: [6, 61, 13.6, 3], ctl: "tv", nz: 2 },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [6 + 3.4 * i, 64, 3.4, 8], ctl: "tv", nz: 2, top: N, d: [["H5", 0.9, "p"]] })),
      { id: "H6", c: "circ", n: "Sảnh lõi sách tầng 3", r: [19.6, 54, 4, 4], ctl: "tv", nz: 1, d: [["B1w3", 1.6, "o"], ["H9", 1.6, "o"]] },
      { ...CS, d: [["H6", 1.4, "thang"], ["H5", 1.2, "thang"], ["B1s3", 1.2, "thang"]] },
      { id: "KB", c: "circ", n: "Kho đệm cách âm", r: [19.6, 64, 1, 8], ctl: "tv", nz: 1, d: [["B1s3", 0.8, "p"]] },
      { id: "B1s3", c: "B1", n: "Đọc mở và kệ (giữa)", r: [20.6, 64, 7, 8], ctl: "tv", nz: 1, top: N, d: [["B2", 1.6, "p"]] },
      { id: "H9", c: "circ", n: "Sảnh đọc yên tĩnh", r: [23.6, 54, 4, 5], ctl: "tv", nz: 1, d: [["B2", 1.6, "p"], ["WCL3", 1.0, "p"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh tầng 3", r: [23.6, 59, 4, 5], ctl: "tv", nz: 1, wc: KT },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [27.6, 54, 8.4, 18], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1n3", 1.6, "p", 0.3]] },
      { id: "B1n3", c: "B1", n: "Bàn đọc cá nhân (góc Đông)", r: [36, 54, 5.5, 10], ctl: "tv", nz: 0, top: N },
      { ...STS, d: [["B1n3", 1.2, "thang"]] },
      { id: "KTE", c: "circ", n: "Hộp kỹ thuật đứng", r: [40, 64, 1.5, 8], ctl: "kt", nz: 1, d: [["B1n3", 0.9, "nv"]] }
    ],
    staff: []
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS2", code: "S.2", name: "Ba tầng lùi bậc", from: "khối vuông",
    T1B, T2B, T3B,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2, t3],
    grid: { x: [6, 13, 21, 30, 38, 41.5], y: [28, 38, 40, 50, 58, 64, 72] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 20, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 52.5], [5.2, 52.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [44, 96], [44, 22], [17, 22], [17, 27.4]]],
        event: [[[20, -9], [17, 10], [17, 27.4]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông lên sân trước, vào sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc vào thẳng sảnh đón tiếp" },
      hatch: [[[6, 12], [41.5, 12], [41.5, 28], [6, 28]]],
      labels: [[23.75, 20, "Sân trước, cửa vào phía Bắc"], [23.75, 45, "Mái tầng 1: sân thượng cỏ, cửa mái"], [23.75, 52, "Tầng 2 lùi bậc"], [23.75, 80, "Vườn Nam"]]
    }
  };
  plan.intro = `<p class="lede">Thầy xác nhận không cần cầu kỳ, chỉ cần xếp các hộp đơn giản lên nhau. S.2 là ba hộp chữ nhật cùng bề ngang 35,5 m chồng lên nhau, mỗi tầng trên lùi về phía Nam: tầng 1 sâu 44 m (khu công cộng, sự kiện, kho), tầng 2 sâu 22 m, tầng 3 sâu 18 m (thư viện). Phần mái tầng dưới lộ ra thành sân thượng cỏ có cửa mái hướng Bắc, nên phòng đa năng, sảnh, cà phê ở tầng 1 vẫn sáng dịu dù nhà sâu. Một cửa vào duy nhất từ quảng trường Bắc vào sảnh đón tiếp; muốn lên bất kỳ tầng đọc nào, kể cả phòng thiếu nhi ở tầng 2, đều phải qua quầy gửi đồ, mượn trả có cổng từ ngay cạnh sảnh, rồi đi lõi sách lên.</p>`;
  plan.notes = [
    "Đi qua khối A: cửa chính mặt Bắc vào sảnh đón tiếp. Từ sảnh: rẽ trái vào cà phê, rẽ phải vào trưng bày, đi thẳng ra hành lang công cộng tới phòng đa năng, chuyên đề, vệ sinh công cộng. Quầy gửi đồ, mượn trả có cổng từ mở ngay từ hành lang, cách sảnh khoảng 10 m; sau quầy mới tới sảnh lõi sách lên tầng 2, tầng 3. Phòng thiếu nhi ở tầng 2 cũng chỉ lên được bằng lõi sách hoặc thang Đông Nam, cả hai đều nằm sau quầy.",
    "Thang có hệ quả: chỉ có hai thang, cả hai thuộc thư viện: lõi sách (thang bộ, thang máy, tời sách) ngay sau quầy, và thang Đông Nam. Thang Đông Nam ở tầng 1 chỉ mở vào phòng đọc tầng 1 (sau quầy) và cửa thoát hiểm có chuông ra vườn Nam. Khu sự kiện ở trọn tầng 1 nên không có thang nào để khách sự kiện lên khu đọc.",
    "Đường sách mới: xe giao sách vào lối Tây → cửa cuốn tiếp nhận → xử lý nghiệp vụ (liền vách, phía trên) → kho đóng và lưu trữ địa phương (liền vách). Kho đóng mở thẳng vào lõi sách, tời sách đưa sách lên kệ tầng 2, tầng 3; kho đóng tới kệ xa nhất tầng 3 khoảng 40 m. Sách trả: xử lý nghiệp vụ có cửa nhân viên thông thẳng vào quầy mượn trả (liền vách), không đi qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ngay hành lang công cộng, cạnh sảnh và phòng đa năng; mỗi tầng thư viện có một cụm sát lõi sách, xếp chồng thẳng hàng; cụm tầng 2 có chỗ thay tã và mở thẳng vào phòng thiếu nhi.",
    "Ánh sáng Bắc – Nam: tầng 1 phần phía Bắc (cà phê, sảnh, trưng bày, chuyên đề, phòng đa năng, nghiệp vụ, quầy) không có tầng trên che nên lấy sáng cửa mái hướng Bắc, dãy đầu còn có cửa sổ Bắc ra quảng trường; phần phía Nam tầng 1 chỉ có kho, lõi, kỹ thuật ở giữa và phòng có người ở dải Nam. Tầng 2 sâu 22 m: dải Bắc và dải Nam là phòng có người, sâu 8 m; dải giữa là lõi, vệ sinh, sảnh. Tầng 3 là tầng trên cùng, lấy sáng mái hướng Bắc. Đầu Đông, đầu Tây là tường đặc.",
    "Không che sáng nhau: các tầng chỉ lùi chứ không đua, mái tầng dưới thấp hơn bậu cửa sổ tầng trên nên không có khối nào chắn trước cửa sổ.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở tầng 1, không có phòng đọc nào ngay trên; thiếu nhi ở dải Bắc tầng 2, cách tra cứu số bằng kho đệm; đọc yên tĩnh ở tầng 3 cách cụm học nhóm 8 m (lõi sách, sảnh và dải đọc giữa làm đệm); văn phòng, phòng nhân viên ở dải Nam tầng 1, không chung vách phòng ồn.",
    "Ngoài giờ: toàn bộ khu công cộng tầng 1 chạy riêng; chỉ khóa cửa từ hành lang công cộng vào quầy mượn trả, cửa này không nằm trên đường thoát nạn (hành lang có lối thoát riêng ra mặt Đông).",
    "Kết cấu: khung bê tông lưới khoảng 8 m, ba tầng chồng thẳng, tầng trên lùi nên không có công xôn; phòng đa năng 17 × 10 m nằm dưới sân thượng, dầm ứng lực trước; kho đóng ở tầng 1 ngay dưới lõi sách."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (r, c, top) => B(r[0], r[1], r[2], r[3], 0.45, top, c, "X", { top: c, lv: 0 });
  plan.idea = {
    id: "chotS2", fam: "chot", code: "S.2", from: "khối vuông", name: "Ba tầng lùi bậc", rule: "Ba hộp chồng, tầng trên lùi về Nam",
    tag: "Ba hộp chữ nhật cùng bề ngang chồng lên nhau, mỗi tầng lùi về phía Nam; mái tầng dưới thành sân thượng cỏ có cửa mái hướng Bắc",
    story: "Ba tầng như ba bậc thềm hạ dần về phía quảng trường: tầng 1 rộng là khu công cộng, sự kiện mở cả buổi tối; tầng 2, tầng 3 nhỏ dần là thư viện, càng lên cao càng yên tĩnh. Một lõi sách chạy suốt ba tầng, đặt ngay sau quầy mượn trả và ngay cạnh kho đóng.",
    why: [["Quy luật hình khối", "Ba hộp chữ nhật chồng thẳng, chỉ lùi bậc về một phía; không đua, không xiên."], ["Khối chính – khối phụ", "Phần thư viện (tầng 2, tầng 3 và dải kho phía Nam tầng 1) là khối chính, cao 3 tầng; phần công cộng phía Bắc tầng 1 là bệ thấp."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, mặt Nam hoặc cửa mái hướng Bắc; đầu Đông, Tây là tường đặc."], ["Gió và mưa", "Sân thượng cỏ giảm nóng mái tầng 1; các bậc lùi có mái hắt che mưa cho cửa sổ Bắc."], ["Công năng", "Một cửa vào, sảnh đón tiếp và quầy mượn trả liền nhau; lõi sách xuyên ba tầng nên đường sách ngắn."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m, cột tầng trên đặt thẳng cột tầng dưới; tầng trên lùi về Nam nên không có công xôn; phòng đa năng dầm ứng lực trước nhịp 10 m; kho đóng ở tầng 1 dưới lõi sách.", nhip: "10 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Tầng 1 sâu 44 m có bí không?", "Phần phía Bắc tầng 1 không có tầng trên nên lấy sáng cửa mái hướng Bắc; phần phía Nam chỉ có kho, lõi thang, kỹ thuật ở giữa, phòng có người nằm ở dải Nam sát cửa sổ."], ["Thiếu nhi ở tầng 2 có bất tiện?", "Có thang máy trong lõi sách ngay sau quầy, xe đẩy lên được; vệ sinh có chỗ thay tã mở thẳng vào phòng thiếu nhi."]],
    cut: "Ba tấm foam trắng chồng lệch, mỗi tấm lùi 4–22 m; mái tầng 1 dán giấy cỏ, dải mica làm cửa mái; lõi sách tím và thang cam nhô khỏi mái tầng 3.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[21.6, 61, 15.6, "Lõi sách xuyên 3 tầng", 1], [33, 66, 13.95, "Khối chính · Thư viện 3 tầng", 1], [20, 34, 4.95, "Khối phụ · Bệ công cộng 1 tầng", 2]],
    build() {
      const v = [
        coreBox(CS.r, "violet", 15.55), coreBox(STS.r, "warn", 15.55),
        B(6, 28, 35.5, 22, 0.45, 4.95, "stone", "A", { fl: 1, top: "grass", role: "p" }),
        B(6, 50, 35.5, 22, 0.45, 4.95, "stone", "C", { fl: 1, role: "m" }),
        B(6, 50, 35.5, 22, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 54, 35.5, 18, 9.45, 13.95, "deck", "B", { fl: 1, top: "grass", role: "m" }),
        // cửa mái thấp trên phần tầng 1 lộ mái, và trên mái tầng 3
        ...[31, 36, 41, 46].map(y => B(7, y, 33.5, 0.5, 4.95, 5.45, "glass", "X", { op: 0.75 })),
        ...[56, 61, 66].map(y => B(7, y, 33.5, 0.5, 13.95, 14.45, "glass", "X", { op: 0.75 }))
      ];
      const st = [];
      for (const x of [6, 13, 21, 30, 38, 41.5]) for (const y of [28, 40, 50]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 13, 21, 30, 38, 41.5]) for (const y of [50, 58, 64, 72]) st.push(col(x, y, 0.45, y >= 54 ? 13.95 : 9.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
