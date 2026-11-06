/* ================= Ý tưởng S.14: Hộp trượt ba tầng (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba hộp chữ nhật cùng bề ngang 35,5 m chồng lên nhau, tầng trên trượt về phía Nam:
  // tầng 1 (đế) sâu 36 m, tầng 2 và tầng 3 (thư viện) mỗi tầng sâu 24 m, tầng 2 đua 3 m, tầng 3 đua thêm 4 m về Nam.
  // Phía Bắc mái tầng 1 lộ ra 15 m: thiếu nhi và khu sự kiện lấy sáng cửa mái hướng Bắc; phía Nam thành mái đua che lối vào.
  const T1B = [[6, 25], [41.5, 25], [41.5, 61], [6, 61]];
  const T2B = [[6, 40], [41.5, 40], [41.5, 64], [6, 64]];
  const T3B = [[6, 44], [41.5, 44], [41.5, 62], [6, 62]], T3W = [[6, 62], [17.8, 62], [17.8, 68], [6, 68]], T3E = [[29, 62], [41.5, 62], [41.5, 68], [29, 68]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  // hai thang thẳng hàng cả ba tầng: lõi sách đầu Tây (ngay sau quầy), thang Đông
  const CS = { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6, 48, 4, 4.5], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } };
  const ST3 = { id: "ST3", n: "Thang bộ thư viện Đông", r: [36.9, 44.5, 4.6, 8], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" } };

  /* ---------- Tầng 1: đế. Dải Bắc lộ mái (thiếu nhi, sự kiện, cà phê, lấy sáng cửa mái), dải giữa kho và lõi, dải Nam dưới mái đua (đón tiếp, quầy) ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [T1B],
    rooms: [
      // dải Bắc: không có tầng trên, lấy sáng cửa mái hướng Bắc
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra sân thiếu nhi)", r: [6, 25, 11.3, 15], ctl: "tv", nz: 3, seat: 32, top: N, d: [["N", 1.8, "tnbd", 0.5], ["H1", 1.8, "p"], ["KX", 0.9, "p"]] },
      { id: "KCF", c: "circ", n: "Chuẩn bị cà phê", r: [17.3, 25, 5.9, 2.5], ctl: "sk", nz: 1, d: [["N", 1.2, "tn"], ["A3", 0.9, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [17.3, 27.5, 5.9, 12.5], ctl: "sk", nz: 3, seat: 32, top: N, d: [["COR", 1.6, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [23.2, 25, 4.8, 15], ctl: "sk", nz: 2, seat: 24, top: N, d: [["COR", 1.4, "p"], ["N", 1.2, "tn", 0.5]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [28, 25, 11.5, 15], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", top: N, d: [["N", 1.8, "tn", 0.5], ["COR", 1.8, "p", 0.1], ["COR", 1.8, "p", 0.5], ["D2", 2.4, "o"]] },
      { id: "KD2", c: "circ", n: "Kho sân khấu", r: [39.5, 25, 2, 2.5], ctl: "sk", nz: 1, d: [["D2", 0.9, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [39.5, 27.5, 2, 12.5], ctl: "sk", nz: 3, d: [["E", 1.2, "tn", 0.5]] },
      // dải giữa, phía Tây: sảnh thư viện sau cổng từ, lõi sách, vệ sinh thư viện
      { id: "KX", c: "circ", n: "Kho đồ chơi, xe đẩy", r: [6, 40, 4, 4], ctl: "tv", nz: 1 },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện (có thay tã)", r: [6, 44, 4, 4], ctl: "tv", nz: 1, wc: KT + " · thay tã" },
      { ...CS, d: [["H1", 1.4, "thang"], ["C4", 1.2, "nv"]] },
      { id: "H1", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [10, 40, 3, 12.5], ctl: "tv", nz: 1, d: [["A4", 2.4, "o"], ["WCL1", 1.0, "p"]] },
      { id: "SKH", c: "circ", n: "Sảnh sự kiện", r: [13, 40, 4.3, 12.5], ctl: "sk", nz: 2, occ: 40, d: [["A1", 3.0, "o"], ["COR", 2.3, "o"], ["KSK", 1.2, "p"], ["WCP", 1.2, "p"]] },
      // dải giữa, phía Đông: hành lang sự kiện, vệ sinh công cộng, kho, kỹ thuật, thang Đông
      { id: "COR", c: "circ", n: "Hành lang sự kiện", r: [17.3, 40, 24.2, 2.5], ctl: "sk", nz: 2, d: [["E", 1.6, "tn"], ["D3", 1.2, "p"], ["KSK", 1.6, "o"], ["KSK2", 1.2, "p"], ["E4", 1.0, "nv"]] },
      { id: "KSK", c: "circ", n: "Sảnh vệ sinh công cộng", r: [17.3, 42.5, 4.4, 5.4], ctl: "sk", nz: 1, d: [["WCP", 1.2, "p"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [17.3, 47.9, 4.4, 4.6], ctl: "sk", nz: 1, wc: KT },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [21.7, 42.5, 4, 5], ctl: "sk", nz: 1 },
      { id: "KTB", c: "circ", n: "Kho trưng bày", r: [21.7, 47.5, 4, 5], ctl: "sk", nz: 1, d: [["A2", 1.0, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [25.7, 42.5, 5.4, 10], ctl: "kt", nz: 3 },
      { id: "KSK2", c: "circ", n: "Kho chung sự kiện", r: [31.1, 42.5, 5.8, 10], ctl: "sk", nz: 1 },
      { id: "KTE1", c: "circ", n: "Tủ điện, đồng hồ", r: [36.9, 42.5, 4.6, 2], ctl: "kt", nz: 1, d: [["E", 0.9, "nv"]] },
      { ...ST3, d: [["E", 1.2, "tnbd"]] },
      // dải Nam: dưới mái đua 3 m của tầng 2, cửa sổ Nam nhìn sân vào
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 52.5, 3.6, 8.5], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [9.6, 52.5, 3.4, 8.5], ctl: "tv", ctrl: 1, nz: 2, d: [["A1", 2.0, "k"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [13, 52.5, 9, 8.5], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.5], ["A2", 2.4, "o"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [22, 52.5, 10.6, 8.5], ctl: "sk", nz: 2, occ: 30, d: [["S", 1.2, "tn", 0.5]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [32.6, 52.5, 4.7, 8.5], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"], ["E6b", 0.9, "nv"]] },
      { id: "E6a", c: "E6", n: "Kho chung", r: [37.3, 52.5, 4.2, 2.4], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"]] },
      { id: "E6b", c: "E6", n: "Dụng cụ vệ sinh", r: [37.3, 54.9, 4.2, 2.5], ctl: "nv", nz: 1, d: [["E", 0.9, "nv"], ["E3", 0.9, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [37.3, 57.4, 4.2, 3.6], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"], ["E", 1.0, "nv"]] }
    ],
    staff: [
      { x: 17.5, y: 56, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 11.3, y: 57, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 39.4, y: 59, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 20, y: 30, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 7.8, y: 56, t: "Nhận sách", sc: ["4"] },
      { x: 11.6, y: 33, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 15, y: 46, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 38, y: 33, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: thư viện và nghiệp vụ, đua 3 m về Nam so với tầng 1 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [T2B],
    rooms: [
      // dải Bắc: xử lý nghiệp vụ, kho đóng ngay cạnh lõi sách; đọc mở đầu Đông
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 40, 8, 8], ctl: "nv", nz: 1, d: [["CS", 1.2, "nv", 0.5], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [14, 40, 15, 8], ctl: "kho", nz: 1, d: [["C3", 1.2, "nv"]] },
      { id: "B1n", c: "B1", n: "Đọc mở và kệ (dải Bắc)", r: [29, 40, 7.9, 8], ctl: "tv", nz: 1, d: [["H4", 2.4, "o"], ["B1n2", 2.4, "o"]] },
      { id: "B1n2", c: "B1", n: "Góc đọc báo", r: [36.9, 40, 4.6, 4.5], ctl: "tv", nz: 1 },
      { ...ST3, d: [["HL2", 1.2, "thang"], ["H4", 1.2, "thang"]] },
      // dải giữa: lõi, vệ sinh (chồng đúng trên vệ sinh công cộng), lưu trữ, sảnh
      { ...CS, d: [["HL2", 1.4, "thang"]] },
      { id: "KHS", c: "circ", n: "Kho sách chờ xử lý", r: [10, 48, 7.3, 4.5], ctl: "nv", nz: 1, d: [["HL2", 0.9, "nv"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [17.3, 48, 4.4, 4.5], ctl: "tv", nz: 1, wc: KT, d: [["HL2", 1.0, "p"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [21.7, 48, 9, 4.5], ctl: "kho", nz: 1, d: [["HL2", 1.2, "nv"]] },
      { id: "H4", c: "circ", n: "Sảnh đọc Đông", r: [30.7, 48, 6.2, 4.5], ctl: "tv", nz: 1, d: [["HL2", 2.4, "o"]] },
      { id: "HL2", c: "circ", n: "Hành lang đọc tầng 2", r: [6, 52.5, 35.5, 3], ctl: "tv", nz: 1, d: [["E1", 1.0, "nv"]] },
      // dải Nam: văn phòng (đầu Tây), đọc mở lớn; cửa sổ Nam dưới mái đua 4 m của tầng 3
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 55.5, 9.4, 8.5], ctl: "nv", nz: 0 },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (dải Nam, phía Tây)", r: [15.4, 55.5, 13, 8.5], ctl: "tv", nz: 1, d: [["HL2", 2.4, "o"], ["B1t", 2.4, "o"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (dải Nam, phía Đông)", r: [28.4, 55.5, 13.1, 8.5], ctl: "tv", nz: 1, d: [["HL2", 2.4, "o"]] }
    ],
    staff: [
      { x: 10, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 10.7, y: 59.7, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 3: thư viện yên tĩnh, đua thêm 4 m; tầng trên cùng nên mọi phòng lấy sáng mái hướng Bắc ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [T3B, T3W, T3E],
    rooms: [
      { id: "KT3", c: "circ", n: "Hộp kỹ thuật", r: [6, 44, 4, 4], ctl: "kt", nz: 1, d: [["CS", 0.9, "nv"]] },
      { ...CS, d: [["HL3", 1.4, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [10, 44, 11.7, 4.2], ctl: "tv", nz: 1, steps: 4, top: N, d: [["B1z", 2.4, "o"]] },
      { id: "B1z", c: "B1", n: "Bàn đọc cá nhân", r: [10, 48.2, 7.3, 4.3], ctl: "tv", nz: 1, top: N, d: [["HL3", 2.4, "o"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh tầng 3", r: [17.3, 48.2, 4.4, 4.3], ctl: "tv", nz: 1, wc: KT, d: [["HL3", 1.0, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [21.7, 44, 11.8, 8.5], ctl: "tv", nz: 1, seat: 16, top: N, d: [["HL3", 2.4, "o"]] },
      { id: "B1y", c: "B1", n: "Kệ sách tra cứu", r: [33.5, 44, 3.4, 8.5], ctl: "tv", nz: 1, top: N, d: [["HL3", 1.6, "o"]] },
      { ...ST3, r: [36.9, 44, 4.6, 8.5], d: [["HL3", 1.2, "thang"]] },
      { id: "HL3", c: "circ", n: "Hành lang đọc tầng 3", r: [6, 52.5, 35.5, 2], ctl: "tv", nz: 1 },
      // dải Nam: đọc yên tĩnh (đầu Tây), đọc mở (giữa), học nhóm (đầu Đông), cách nhau ≥ 12 m
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [6, 54.5, 11.8, 13.5], noclip: 1, ctl: "tv", nz: 0, seat: 40, top: N, d: [["HL3", 1.6, "p", 0.15]] },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (nhìn ra lô gia)", r: [17.8, 54.5, 11.2, 7.5], ctl: "tv", nz: 1, top: N, d: [["HL3", 2.0, "o", 0.1], ["HL3", 2.0, "o", 0.9]] },
      { id: "B1x", c: "B1", n: "Bàn đọc dọc cửa mái (Tây)", r: [29, 54.5, 5.5, 3], ctl: "tv", nz: 1, top: N, d: [["HL3", 1.6, "o"]] },
      { id: "H5", c: "circ", n: "Lối vào học nhóm", r: [34.5, 54.5, 1.5, 3], ctl: "tv", nz: 2, d: [["HL3", 1.2, "o"], ["CO4", 1.2, "o"]] },
      { id: "B1x2", c: "B1", n: "Bàn đọc dọc cửa mái (Đông)", r: [36, 54.5, 5.5, 3], ctl: "tv", nz: 1, top: N, d: [["HL3", 1.6, "o"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [29, 57.5, 12.5, 2], ctl: "tv", nz: 2 },
      { id: "KD", c: "circ", n: "Kho đệm cách âm", r: [29, 59.5, 1, 8.5], noclip: 1, ctl: "tv", nz: 1, d: [["CO4", 0.8, "p"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [30 + 2.875 * i, 59.5, 2.875, 8.5], noclip: 1, ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [
      { x: 27, y: 48, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS14", code: "S.14", name: "Hộp trượt ba tầng", from: "khối vuông",
    T1B, T2B, T3B, T3W, T3E,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2, t3],
    grid: { x: [6, 10, 13, 17.3, 23.2, 28, 34, 41.5], y: [25, 40, 44, 48, 52.5, 55.5, 61, 64, 68] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 20, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 55.9], [5.2, 55.9]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [30, 86], [17.5, 72], [17.5, 61.4]]],
        event: [[[20, -9], [26, 6], [44, 14], [44, 72], [17.5, 72], [17.5, 61.4]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe qua vườn Nam, vào dưới mái đua tới sảnh đón tiếp", event: "Khách sự kiện: từ quảng trường Bắc men bờ sông, vào dưới mái đua tới sảnh đón tiếp" },
      hatch: [[[6, 15], [17.3, 15], [17.3, 25], [6, 25]], [[6, 61], [41.5, 61], [41.5, 68], [6, 68]]],
      labels: [[11.6, 20, "Sân thiếu nhi (tường rào)"], [30, 18, "Quảng trường trước"], [23.75, 64.5, "Sân vào dưới mái đua"], [23.75, 32, "Mái tầng 1 lộ ra: sân thượng cỏ"], [23.75, 80, "Vườn Nam"]]
    }
  };
  plan.intro = `<p class="lede">Thầy xác nhận không cần cầu kỳ, chỉ cần xếp các hộp đơn giản lên nhau. S.14 là ba hộp chữ nhật cùng bề ngang 35,5 m chồng lên nhau, tầng trên trượt dần về phía Nam: tầng 2 đua 3 m, tầng 3 đua thêm 4 m. Tầng 1 là đế sâu 36 m; tầng 2 và tầng 3 là thư viện, mỗi tầng sâu 24 m. Phía Bắc, mái tầng 1 lộ ra 15 m: phòng thiếu nhi, cà phê, chuyên đề, phòng đa năng nằm dưới phần mái này, lấy sáng cửa mái hướng Bắc. Phòng thiếu nhi có sân riêng rào tường ở góc Tây Bắc, nhìn ra quảng trường. Phía Nam, phần đua thành mái hiên che lối vào chính. Một cửa vào duy nhất dưới mái hiên vào sảnh đón tiếp; muốn vào bất kỳ phòng đọc nào, kể cả phòng thiếu nhi ở tầng 1, đều phải qua quầy gửi đồ, mượn trả có cổng từ liền vách sảnh.</p>`;
  plan.notes = [
    "Đi qua khối A: cửa chính mặt Nam (dưới mái đua) vào sảnh đón tiếp. Rẽ phải vào trưng bày; đi thẳng qua sảnh sự kiện tới hành lang sự kiện phía Bắc (phòng đa năng, chuyên đề, cà phê, vệ sinh công cộng); rẽ trái qua quầy gửi đồ, mượn trả có cổng từ vào sảnh thư viện. Từ sảnh thư viện: đi thẳng lên phía Bắc vào phòng thiếu nhi, hoặc vào lõi sách lên tầng 2, tầng 3. Phòng thiếu nhi và mọi phòng đọc đều nằm sau quầy.",
    "Thiếu nhi ở tầng 1, có sân riêng: phòng thiếu nhi ở góc Tây Bắc tầng 1, dưới phần mái lộ ra nên lấy sáng cửa mái hướng Bắc. Cửa ra sân thiếu nhi rào tường (góc Tây Bắc khu đất) là cửa có chuông, chỉ mở từ trong. Vệ sinh có chỗ thay tã ngay sảnh thư viện, cách phòng khoảng 14 m.",
    "Thang có hệ quả: chỉ có hai thang, đều thuộc thư viện. Lõi sách (thang bộ, thang máy, tời sách) mở ra sảnh thư viện sau quầy; thang Đông ở tầng 1 chỉ có cửa thoát hiểm có chuông ra ngoài. Khu sự kiện nằm trọn tầng 1 nên không có thang nào để khách sự kiện lên khu đọc mà không qua quầy.",
    "Đường sách mới: xe giao sách vào lối Tây → cửa cuốn tiếp nhận (tầng 1, liền vách lõi sách) → thang máy, tời sách lên tầng 2 → xử lý nghiệp vụ (liền vách lõi sách) → kho đóng (liền vách) → kệ tầng 2, tầng 3. Lưu trữ tài liệu địa phương ở tầng 2 ngay cạnh kho đóng. Sách trả: từ quầy mượn trả qua sảnh thư viện vào lõi sách lên xử lý, khoảng 18 m.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ở sảnh vệ sinh cạnh hành lang sự kiện; cụm thư viện tầng 2 và tầng 3 xếp chồng đúng trên cụm công cộng (một trục ống); tầng 1 khu đọc có cụm có chỗ thay tã ngay sảnh thư viện cho phòng thiếu nhi.",
    "Ánh sáng Bắc – Nam: dải Bắc tầng 1 không có tầng trên che nên lấy sáng cửa mái hướng Bắc; dải Nam tầng 1 có cửa sổ Nam dưới mái đua 3 m; dải giữa chỉ có kho, lõi, kỹ thuật, sảnh. Tầng 2 sâu 24 m: dải Bắc sâu 8 m (nghiệp vụ, đọc mở), dải Nam sâu 8,5 m (văn phòng, đọc mở), dải giữa là lõi, vệ sinh, lưu trữ, hành lang. Tầng 3 là tầng trên cùng, mọi phòng lấy sáng mái hướng Bắc; giữa mặt Nam tầng 3 lõm vào thành lô gia 11 × 6 m. Đầu Đông, đầu Tây là tường đặc.",
    "Không che sáng nhau: mái đua phía Nam chỉ 3 m (tầng 2) và 4 m (tầng 3), không quá 4,5 m nên là ô văng che nắng, phòng không tối; phía Bắc các tầng lùi vào nên không có khối nào chắn trước cửa sổ.",
    "Tiếng ồn: phòng thiếu nhi, cà phê, chuyên đề, phòng đa năng cùng ở dải Bắc tầng 1, phía trên là sân thượng, không có phòng đọc nào ngay trên. Văn phòng ở tầng 2 (đầu Tây dải Nam), phòng nhân viên ở dải Nam tầng 1, không sát phòng ồn. Tầng 3: đọc yên tĩnh ở góc Tây Nam, học nhóm ở góc Đông Nam, cách nhau hơn 12 m (đọc mở và kho đệm ở giữa).",
    "Ngoài giờ: khu công cộng tầng 1 chạy riêng (sảnh, trưng bày, cà phê, sự kiện, vệ sinh công cộng); chỉ khóa một cửa từ sảnh vào quầy mượn trả, cửa này không nằm trên đường thoát nạn.",
    "Kết cấu: khung bê tông, cột tầng trên đặt thẳng cột tầng dưới theo lưới khoảng 5–8 m; phần đua 3–4 m là công xôn dầm sàn, không cần cột chống; phòng đa năng 11,5 × 15 m dùng dầm ứng lực trước; kho đóng ở tầng 2 ngay cạnh lõi sách."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (r, c, top) => B(r[0], r[1], r[2], r[3], 0.45, top, c, "X", { top: c, lv: 0 });
  plan.idea = {
    id: "chotS14", fam: "chot", code: "S.14", from: "khối vuông", name: "Hộp trượt ba tầng", rule: "Ba hộp chữ nhật chồng, mỗi tầng trượt 3–4 m về Nam",
    tag: "Ba hộp chữ nhật cùng bề ngang chồng lên nhau, mỗi tầng trượt 3–4 m về phía Nam: phía Nam thành mái đua che lối vào, phía Bắc mái tầng 1 lộ ra cho thiếu nhi và sự kiện lấy sáng",
    story: "Ba hộp như ba quyển sách xếp chồng, quyển trên đẩy nhẹ ra một chút. Đế dưới cùng là khu công cộng và phòng thiếu nhi có sân riêng; hai hộp trên là thư viện, càng lên cao càng yên tĩnh. Chỗ trượt ra phía Nam thành mái hiên lớn cho người đến, chỗ lùi vào phía Bắc thành sân thượng cỏ nhìn ra quảng trường.",
    why: [["Quy luật hình khối", "Ba hộp chữ nhật chồng thẳng, chỉ trượt 3–4 m theo một phương Bắc – Nam; không xoay, không xiên, không chi tiết cầu kỳ."], ["Khối chính – khối phụ", "Hai hộp thư viện ở trên (tầng 2, tầng 3) là khối chính; đế công cộng một tầng là khối phụ, lộ mái thành sân thượng."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, mặt Nam hoặc cửa mái hướng Bắc; mặt Nam có mái đua 3–4 m che nắng; đầu Đông, Tây là tường đặc."], ["Gió và mưa", "Mái đua che mưa cho lối vào và cửa sổ Nam; sân thượng cỏ giảm nóng mái."], ["Công năng", "Một cửa vào, sảnh đón tiếp và quầy mượn trả liền vách; thiếu nhi ở tầng 1 có sân riêng; tiếp nhận, xử lý, kho đóng nối nhau qua lõi sách nên đường sách ngắn."]],
    kc: { he: "Khung bê tông lưới khoảng 5–8 m, cột tầng trên đặt thẳng cột tầng dưới; phần đua 3–4 m là công xôn dầm sàn; phòng đa năng dầm ứng lực trước nhịp 11,5 m; kho đóng ở tầng 2 cạnh lõi sách.", nhip: "11,5 m (phòng đa năng), 8 m (lưới)", cx: "3 m (tầng 2), 4 m (tầng 3)" },
    qa: [["Mái đua có làm tối phòng phía dưới không?", "Không: đua 3–4 m là độ sâu ô văng che nắng Nam thường dùng ở Đà Nẵng; phòng phía dưới vẫn có cửa sổ cao và sâu không quá 8,5 m."], ["Tầng 1 sâu 36 m có bí không?", "Dải Bắc tầng 1 (thiếu nhi, sự kiện) không có tầng trên nên lấy sáng cửa mái; dải Nam có cửa sổ; dải giữa chỉ có kho, lõi thang, kỹ thuật và sảnh."], ["Thiếu nhi ở tầng 1 có lối riêng không?", "Không: vào phòng thiếu nhi phải qua quầy gửi đồ, mượn trả như mọi phòng đọc; cửa ra sân thiếu nhi là cửa có chuông, chỉ mở từ trong."]],
    cut: "Ba tấm foam cùng bề ngang, tấm trên dán lệch 3–4 m về một phía, tấm trên cùng khoét lô gia giữa mặt Nam; mái tầng 1 dán giấy cỏ có dải mica làm cửa mái; tường thấp sân thiếu nhi; lõi sách tím, thang cam nhô khỏi mái tầng 3.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[8, 50.25, 15.6, "Lõi sách xuyên 3 tầng", 1], [35, 62, 13.95, "Khối chính · Hai hộp thư viện trượt", 1], [30, 32, 4.95, "Khối phụ · Đế công cộng", 2], [11.6, 32, 4.95, "Thiếu nhi", 2], [17.5, 62.5, 4.95, "Mái đua, lối vào", 2]],
    build() {
      const v = [
        coreBox(CS.r, "violet", 15.55), coreBox(ST3.r, "warn", 15.55),
        B(6, 25, 35.5, 36, 0.45, 4.95, "stone", "A", { fl: 1, top: "grass", role: "p" }),
        B(6, 40, 35.5, 24, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 44, 35.5, 18, 9.45, 13.95, "deck", "B", { fl: 1, top: "grass", role: "m" }), B(6, 62, 11.8, 6, 9.45, 13.95, "deck", "B", { fl: 1, top: "grass", role: "m" }), B(29, 62, 12.5, 6, 9.45, 13.95, "deck", "B", { fl: 1, top: "grass", role: "m" }),
        // cửa mái thấp trên dải mái tầng 1 lộ ra, và trên mái tầng 3
        ...[28, 32, 36].map(y => B(7, y, 33.5, 0.5, 4.95, 5.45, "glass", "X", { op: 0.75 })),
        ...[46, 51, 56, 61, 65].map(y => B(7, y, 33.5, 0.5, 13.95, 14.45, "glass", "X", { op: 0.75 })),
        // tường thấp sân thiếu nhi phía Bắc
        B(6, 15, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(17, 15, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(6, 15, 11.3, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 13, 17.3, 23.2, 28, 34, 41.5]) for (const y of [25, 32.5]) st.push(col(x, y, 0.45, 4.95));
      for (const x of [6, 13, 17.3, 23.2, 28, 34, 41.5]) for (const y of [40, 48, 55.5, 61]) st.push(col(x, y, 0.45, 13.95));
      for (const x of [6, 13, 17.3, 23.2, 28, 34, 41.5]) st.push(col(x, 64, 4.95, 13.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
