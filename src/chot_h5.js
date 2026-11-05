/* ================= Ý tưởng H.5: Bậc thang hộp xuống sông (hộp xếp chồng, không hộp bọc ngoài) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // ba dải hộp nằm ngang Đông – Tây, mặt dài quay Bắc – Nam. Ở hai dải đầu, hộp hai tầng đứng phía lối Tây,
  // hộp một tầng bước xuống phía sông; hộp thiếu nhi lệch 2 m về phía Bắc so với hộp đọc, thành bậc so le
  const RA = [[6, 14], [38, 14], [38, 30], [6, 30]];        // dải Bắc tầng 1: đón tiếp, cà phê, phòng đa năng
  const RA2 = [[6, 14], [24, 14], [24, 30], [6, 30]];       // hộp gỗ tầng 2 trên dải Bắc: trưng bày, chuyên đề
  const LK1 = [[10, 30], [12.5, 30], [12.5, 38], [10, 38]]; // hành lang kính một tầng: bản lề từ đón tiếp sang quầy thư viện
  const RB = [[6, 38], [28, 38], [28, 54], [6, 54]];        // hộp đọc hai tầng
  const B3X = [[28, 36], [38.5, 36], [38.5, 52], [28, 52]]; // hộp thiếu nhi một tầng, bước xuống sông, lệch 2 m về Bắc
  const RC = [[6, 62], [41, 62], [41, 78], [6, 78]];        // hộp Nam hai tầng: nghiệp vụ (tầng 1), đọc yên tĩnh (tầng 2)
  const BR = [[6, 54], [9, 54], [9, 62], [6, 62]];          // cầu kính tầng 2 nối hai hộp đọc
  const LT = [[6, 54], [11.5, 54], [11.5, 62], [6, 62]];        // hành lang sách tầng 1 (nhân viên): quầy mượn trả ↔ lõi sách Nam ↔ xử lý
  const GARDEN = [[28, 52], [38.5, 52], [38.5, 62], [28, 62]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const Z2 = 9.45, Z1 = 5.25, ZD = 6.45; // mái hộp hai tầng, hộp một tầng thường, hộp phòng đa năng

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [RA, LK1, RB, B3X, LT, RC],
    rooms: [
      // dải Bắc: một cửa vào duy nhất vào sảnh đón tiếp; từ đây rẽ sang cà phê, sảnh sự kiện, hoặc hành lang kính sang thư viện
      { id: "ST2", n: "Thang bộ Tây Bắc (sự kiện)", r: [6, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["A1", 1.2, "thang"], ["N", 1.2, "tn"]] },
      { id: "WCE", c: "E5", n: "Vệ sinh sảnh, sự kiện", r: [6, 20, 4, 4], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.2, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [6, 24, 4, 6], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["A1b", 1.4, "thang"], ["W", 1.2, "tn"]] },
      { id: "A1", c: "A1", n: "Đón tiếp: sảnh vào", r: [10, 14, 5, 8.5], ctl: "sk", nz: 2, seat: 10, occ: 20, d: [["N", 2.4, "chinh", 0.5], ["A3", 3, "o", 0.5], ["A1b", 3, "o"]] },
      { id: "A1b", c: "A1", n: "Đón tiếp: quầy hướng dẫn, chỗ chờ", r: [10, 22.5, 5, 7.5], ctl: "sk", nz: 2, seat: 10, occ: 20, d: [["FOYb", 2.4, "o"], ["LK1", 1.8, "k"], ["S", 1.8, "tudong", 0.75]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [15, 14, 9, 7.8], ctl: "sk", nz: 3, seat: 32, bar: [[15.4, 14], [23.6, 14], 6], d: [["FOYb", 2.4, "o"]] },
      { id: "FOYb", c: "circ", n: "Sảnh nối cà phê", r: [15, 21.8, 4.5, 4.9], ctl: "sk", nz: 2, d: [["FOYa", 3, "o"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [15, 26.7, 4.5, 3.3], ctl: "nv", nz: 1, d: [["A1b", 1.0, "nv"], ["FOYb", 0.9, "nv"]] },
      { id: "FOYa", c: "circ", n: "Sảnh sự kiện", r: [19.5, 21.8, 4.5, 8.2], ctl: "sk", nz: 2, occ: 60, d: [["D1", 2, "p", 0.25], ["D1", 1.6, "p", 0.8], ["S", 1.6, "tn", 0.5]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [24, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "E", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.5]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [35.25, 14, 2.75, 9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [35.25, 23, 2.75, 7], ctl: "sk", nz: 1, d: [["D1", 1.2, "p"]] },
      // hành lang kính qua sân Bắc: khóa ngoài giờ ở cửa sảnh đón tiếp
      { id: "LK1", c: "circ", n: "Hành lang kính vào thư viện", r: [10, 30, 2.5, 8], ctl: "tv", nz: 1, d: [["A4", 1.8, "p"]] },
      // hộp đọc tầng 1: quầy gửi đồ, mượn trả ở đầu hành lang kính; sau quầy là lõi sách Bắc và khu đọc
      { id: "CS", n: "Lõi sách Bắc: thang bộ + thang máy + tời sách", r: [6, 38, 4, 6.4], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["W", 1.2, "tnbd"]] },
      { id: "LS", c: "circ", n: "Hành lang sách (nhân viên)", r: [6, 44.4, 4, 9.6], ctl: "nv", nz: 1, d: [["A4", 0.9, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [10, 38, 4.3, 7.6], ctl: "tv", ctrl: 1, nz: 2, d: [["CS", 1.6, "o"], ["HB", 1.6, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [14.3, 38, 5.95, 7.6], ctl: "tv", nz: 1, steps: 5, d: [["HB", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Sách mới, báo, tạp chí", r: [20.25, 38, 5.75, 7.6], ctl: "tv", nz: 1, d: [["HB", 2.4, "o"]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [26, 38, 2, 7.6], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["HB", 1.0, "p"]] },
      { id: "HB", c: "circ", n: "Sảnh đọc tầng 1", r: [10, 45.6, 18, 2], ctl: "tv", nz: 1, d: [["B3", 1.8, "p"], ["B5", 2.4, "o"], ["XE", 1.2, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [10, 47.6, 16, 6.4], ctl: "tv", nz: 1, seat: 16 },
      { id: "XE", c: "circ", n: "Chỗ để xe đẩy sách (đệm với thiếu nhi)", r: [26, 47.6, 2, 6.4], ctl: "tv", nz: 1 },
      // hộp thiếu nhi một tầng, mở ra vườn có tường bao
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [28, 36, 10.5, 16], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] },
      // hành lang sách tầng 1: chỉ nhân viên, nối quầy mượn trả với lõi sách Nam và xử lý
      { id: "LT", c: "circ", n: "Hành lang sách qua sân Nam", r: [6, 54, 5.5, 8], ctl: "nv", nz: 1, d: [["LS", 1.2, "nv"], ["STS", 1.2, "nv"], ["C2", 1.0, "nv"]] },
      // hộp Nam tầng 1: lõi sách Nam, tiếp nhận, xử lý, kho đóng liền nhau (khu nhân viên, thẻ từ)
      { id: "STS", n: "Lõi sách Nam: thang bộ + thang máy + tời sách", r: [6, 62, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["HCw", 1.2, "nv"], ["W", 1.2, "tnbd"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [10, 62, 9.3, 7], ctl: "nv", nz: 1, d: [["HCw", 1.2, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [19.3, 62, 5.4, 7], ctl: "nv", nz: 1, d: [["HCw", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [24.7, 62, 10.6, 7], ctl: "nv", nz: 0, d: [["HCe", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [35.3, 62, 2.7, 7], ctl: "nv", nz: 1, d: [["HCe", 0.9, "nv"]] },
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [38, 62, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["HCe", 1.0, "nv"], ["E", 1.2, "tnbd"]] },
      // hành lang nghiệp vụ chia hai đoạn, mỗi đoạn một cửa ra ngoài ở đầu hồi
      { id: "HCw", c: "circ", n: "Hành lang nghiệp vụ (Tây)", r: [6, 69, 17.5, 2], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["HCe", 1.6, "nv"]] },
      { id: "HCe", c: "circ", n: "Hành lang nghiệp vụ (Đông)", r: [23.5, 69, 17.5, 2], ctl: "nv", nz: 1, d: [["E", 1.2, "tn"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 71, 3.9, 7], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["HCw", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [9.9, 71, 17.5, 7], ctl: "kho", nz: 1, d: [["HCw", 1.2, "nv", 0.3]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [27.4, 71, 5.6, 7], ctl: "kho", nz: 1, d: [["HCe", 1.0, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [33, 71, 8, 7], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"], ["HCe", 1.0, "nv"]] }
    ],
    staff: [
      { x: 12.5, y: 26, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 12.2, y: 42, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 17.2, y: 28.3, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 20, y: 17, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 33, y: 44, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 17.5, y: 41.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] },
      { x: 14.5, y: 65.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 74.5, t: "Nhận sách", sc: ["4"] },
      { x: 30, y: 65.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 36.6, y: 18.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [RA2, RB, BR, RC],
    rooms: [
      // hộp gỗ trên dải Bắc: trưng bày, chuyên đề (chạy ngoài giờ, chỉ có thang sự kiện, không cửa sang thư viện)
      { id: "ST2", n: "Thang bộ Tây Bắc (sự kiện)", r: [6, 14, 4, 6], ctl: "sk", nz: 1, core: { st: "u", link: "ST2" }, d: [["A2", 1.2, "thang"]] },
      { id: "WCE2", c: "E5", n: "Vệ sinh tầng 2 sự kiện", r: [6, 20, 4, 4], ctl: "sk", nz: 1, wc: KT, d: [["A2", 1.2, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy sự kiện", r: [6, 24, 4, 6], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["A2", 1.4, "thang"]] },
      { id: "A2", c: "A2", n: "Trưng bày (sáng Bắc – Nam)", r: [10, 14, 5.6, 16], ctl: "sk", nz: 2, occ: 30, d: [["FOY2", 2.4, "o"], ["D4", 1.2, "p"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [15.6, 14, 8.4, 8.5], ctl: "sk", nz: 2, seat: 24, d: [["FOY2", 1.2, "p"]] },
      { id: "FOY2", c: "circ", n: "Sảnh chờ tầng 2", r: [15.6, 22.5, 8.4, 7.5], ctl: "sk", nz: 2, occ: 30 },
      // hộp đọc tầng 2: học nhóm quay Bắc có hành lang riêng; đọc mở quay Nam, cách học nhóm bằng hành lang
      { id: "CS", n: "Lõi sách Bắc: thang bộ + thang máy + tời sách", r: [6, 38, 4, 6.4], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HB2", 1.4, "thang"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [10 + 3.55 * i, 38, 3.55, 6.4], ctl: "tv", nz: 2, d: [["HB2", 0.9, "p"]] })),
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2 (Bắc)", r: [24.2, 38, 3.8, 3.6], ctl: "tv", nz: 1, wc: KT, d: [["KS", 0.9, "p"]] },
      { id: "KS", c: "circ", n: "Kho xe sách (đệm)", r: [24.2, 41.6, 3.8, 2.8], ctl: "tv", nz: 1, d: [["HB2", 1.2, "o"]] },
      { id: "HB2", c: "circ", n: "Hành lang học nhóm, sảnh đọc", r: [6, 44.4, 22, 2], ctl: "tv", nz: 1, d: [["B1d", 2.4, "o", 0.9]] },
      { id: "B1d", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [6, 46.4, 22, 7.6], ctl: "tv", nz: 1 },
      { id: "BR", c: "circ", n: "Cầu kính", r: [6, 54, 3, 8], ctl: "tv", nz: 1, d: [["B1d", 2.4, "o"], ["STS", 2.4, "o"]] },
      // hộp Nam tầng 2: đọc yên tĩnh quay Bắc, đọc mở quay Nam; lõi sách Nam ngay đầu cầu kính
      { id: "STS", n: "Lõi sách Nam: thang bộ + thang máy + tời sách", r: [6, 62, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "STS" }, d: [["HC2", 1.4, "thang"]] },
      { id: "B1f", c: "B1", n: "Bàn đọc cá nhân (sáng Bắc)", r: [10, 62, 7.4, 7], ctl: "tv", nz: 1, d: [["HC2", 1.6, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (giữa, sáng Bắc)", r: [17.4, 62, 10.3, 7], ctl: "tv", nz: 0, seat: 20, d: [["HC2", 1.2, "p", 0.85]] },
      { id: "B2b", c: "B2", n: "Đọc yên tĩnh (Đông, sáng Bắc)", r: [27.7, 62, 10.3, 7], ctl: "tv", nz: 0, seat: 20, d: [["HC2", 1.2, "p", 0.9]] },
      { id: "STE", n: "Thang thoát nạn Đông (thư viện)", r: [38, 62, 3, 7], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["HC2", 1.2, "thang"]] },
      { id: "HC2", c: "circ", n: "Sảnh đọc tầng 2 hộp Nam", r: [6, 69, 35, 2], ctl: "tv", nz: 1 },
      { id: "B1g", c: "B1", n: "Đọc tài liệu địa phương", r: [6, 71, 12.25, 7], ctl: "tv", nz: 1, d: [["HC2", 2.4, "o"]] },
      { id: "WCL3", c: "E5", n: "Vệ sinh thư viện tầng 2 (Nam)", r: [18.25, 71, 1.8, 7], ctl: "tv", nz: 1, wc: KT, d: [["HC2", 0.9, "p"]] },
      { id: "B1h", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [20.05, 71, 20.95, 7], ctl: "tv", nz: 1, d: [["HC2", 3, "o", 0.15], ["HC2", 1.6, "o", 0.85]] }
    ],
    staff: [
      { x: 13, y: 22, t: "Đón khách trưng bày, chuyên đề", sc: ["2", "3"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotH5", code: "H.5", name: "Bậc thang hộp xuống sông", from: "hộp xếp",
    RA, RA2, RB, RC, B3X, LK1, BR, LT, GARDEN,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 15, 24, 28, 38], y: [14, 22, 30, 38, 46, 54, 62, 70, 78] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 65.5], [5.2, 65.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40, 98], [40, 34], [14.3, 34], [14.3, 30.8]]],
        event: [[[20, -9], [12.5, 3], [12.5, 13]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, rẽ vào sân Bắc, vào cửa sau sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc vào sảnh đón tiếp" },
      hatch: [GARDEN],
      labels: [[33.2, 57, "Vườn thiếu nhi"], [31, 22, "Hộp đa năng 1 tầng"], [15, 22, "Hộp gỗ 2 tầng"], [17, 46, "Hộp đọc"], [33.2, 44, "Hộp thiếu nhi"], [22, 70, "Hộp Nam"], [24, 34, "Sân Bắc"], [18, 58, "Sân Nam"]]
    }
  };
  plan.intro = `<p class="lede">Phát triển từ các ý tưởng hộp 10.3 (ba tầng đọc kéo lệch) và 10.5 (hộp lớn ven sông, hộp nhỏ ven phố) bạn đã ghim, bỏ hẳn hộp bọc ngoài. Mỗi dải là một hộp hai tầng đứng sát lối Tây, rồi một hộp một tầng bước xuống phía sông, mái là sân cỏ. Hộp thiếu nhi lệch 2 m về phía Bắc so với hộp đọc, nên nhìn từ sông các hộp so le như bậc thang. Mọi hộp nằm ngang Đông – Tây, mặt dài quay Bắc – Nam, cách nhau hai sân rộng 8 m. Khách chỉ vào được sảnh đón tiếp (cửa quảng trường Bắc hoặc cửa sân Bắc); từ đó rẽ sang khu sự kiện, hoặc qua hành lang kính tới quầy gửi đồ, mượn trả có cổng từ rồi mới tới lõi sách và khu đọc. Bản sửa 05/11: hai lõi sách có tời nối với kho, xử lý bằng hành lang sách riêng cho nhân viên, nên sách đi ngắn.</p>`;
  plan.notes = [
    "Đón tiếp là bản lề: sảnh đón tiếp có hai cửa, đều vào thẳng sảnh: cửa chính từ quảng trường Bắc (sảnh vào) và cửa kính tự động từ sân Bắc phía sông (sảnh chờ, quầy hướng dẫn) cho người đọc đi từ bãi xe dọc bờ sông. Bên phải sảnh là cà phê và sảnh sự kiện dẫn vào phòng đa năng; thang tím, thang cam đầu Tây đưa khách lên trưng bày, chuyên đề ở tầng 2. Sau sảnh chờ là hành lang kính qua sân Bắc, cuối hành lang là quầy gửi đồ, mượn trả có cổng từ (cách sảnh 12 m). Không có lối nào từ ngoài vào thẳng phòng đa năng, chuyên đề hay khu đọc; cửa ra ngoài của phòng đa năng chỉ là cửa thoát nạn.",
    "Ánh sáng Bắc – Nam: mọi hộp sâu 16 m. Phòng đọc, phòng đa năng, trưng bày, thiếu nhi chạy suốt chiều sâu nên lấy sáng cả hai mặt; các phòng còn lại sâu 7 m quay một mặt. Không chỗ nào cách cửa sổ quá 8 m. Đầu Đông, đầu Tây mọi hộp là tường đặc; thang, vệ sinh, kho, kỹ thuật lấp ở đó.",
    "Không che sáng nhau: sân Bắc và sân Nam rộng 8 m, hộp hai tầng cao +9,45, góc che từ cửa sổ tầng 1 là 44°, dưới mốc 45°. Lõi thang nhô lên đặt ở đầu Tây, đối diện lõi thang hoặc vệ sinh, không đứng trước cửa sổ phòng nào. Hộp một tầng (thiếu nhi +5,25, đa năng +6,45) thấp nên không che hộp sau.",
    "Bảo mật sách: quầy mượn trả là cửa duy nhất vào khu đọc. Thang sự kiện chỉ nối sảnh với trưng bày, chuyên đề, không có cửa sang thư viện. Hai lõi sách (thang bộ, thang máy, tời sách) chỉ mở vào khu đã qua cổng: lõi Bắc mở ngay cạnh quầy; lõi Nam ở tầng 1 chỉ mở vào hành lang nghiệp vụ và hành lang sách bằng cửa thẻ từ, nên không ai từ phía Nam lên thẳng khu đọc. Cửa ra ngoài ở chân hai lõi và cửa ra vườn thiếu nhi là cửa thoát hiểm có chuông báo.",
    "Ngoài giờ: cả dải Bắc (đón tiếp, cà phê, phòng đa năng, trưng bày, chuyên đề, vệ sinh hai tầng, hai thang) chạy riêng. Chỉ khóa một cửa: cửa từ sảnh đón tiếp sang hành lang kính. Cửa này không nằm trên đường thoát nạn nào của khu sự kiện.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận → hành lang nghiệp vụ → xử lý (10 m) → kho đóng (6 m), lưu trữ địa phương; sách lên kệ tầng 2 bằng tời sách trong lõi sách Nam ngay đầu cầu kính (kệ xa nhất 48 m kể cả lên tầng). Sách trả ở quầy đi hành lang sách tầng 1 (chỉ nhân viên, dọc lối Tây rồi qua sân Nam dưới cầu kính) vào thẳng phòng xử lý, khoảng 23 m, không qua khu công cộng hay khu đọc.",
    "Yên tĩnh: đọc yên tĩnh ở mặt Bắc tầng 2 hộp Nam, lấy sáng Bắc dịu, cách học nhóm hơn 17 m. Học nhóm ở mặt Bắc tầng 2 hộp đọc, có hành lang riêng ngăn với phòng đọc mở; vệ sinh và kho xe sách làm vách đệm ở đầu Đông. Thiếu nhi ở hộp một tầng riêng, ngăn với phòng đọc bằng vệ sinh có chỗ thay tã và chỗ để xe đẩy, mở ra vườn tường bao. Kỹ thuật ở góc Đông Nam hộp Nam, cách văn phòng và phòng nhân viên bằng hành lang.",
    "Vệ sinh và thang: vệ sinh sảnh, sự kiện ở đầu Tây dải Bắc, ngay cạnh sảnh (4 m) và cách phòng đa năng 21 m; vệ sinh thư viện tầng 1 sát thiếu nhi; mỗi hộp đọc tầng 2 có một cụm vệ sinh trong khu đọc (chỗ đọc xa nhất đi 30 m). Mỗi tầng 2 có hai thang máy trong khu thư viện (hai lõi sách) và một thang máy trong khu sự kiện.",
    "Sửa ngày 05/11 (đi lại gọn): tách sảnh đón tiếp thành sảnh vào và sảnh chờ, thêm cửa từ sân Bắc, nên quầy mượn trả chỉ cách sảnh 12 m (trước 16 m) và người đọc tới chỗ đọc xa nhất 70 m (trước 100 m); lõi thang hộp đọc thành lõi sách có tời; thêm hành lang sách tầng 1 nối quầy với lõi sách Nam và xử lý (sách trả 23 m, trước 77 m); lõi sách Nam dời về đầu cầu kính, kho đóng sát xử lý (kho tới kệ xa nhất 48 m, trước 95 m); thêm vệ sinh trong hộp Nam tầng 2 (chỗ đọc xa nhất tới vệ sinh 30 m, trước 55 m); học nhóm có hành lang riêng; thiếu nhi ngăn với phòng đọc bằng vệ sinh và chỗ để xe đẩy. Hộp Nam dài thêm 3 m về phía sông để đặt thang thoát nạn Đông (lõi cam, cửa ra ngoài ở tầng 1 có chuông báo); phòng đọc mở tầng 2 có thêm cửa ở đầu Đông; hành lang nghiệp vụ chia hai đoạn có cửa ra hai đầu hồi. Đường thoát xa nhất còn 25,3 m tầng 1 và 28,2 m tầng 2 (trước 32,0 và 35,8 m). Tổng sàn 2.880 m².",
    "Kết cấu: lưới cột 8 m theo phương Đông – Tây, nhịp 16 m qua chiều sâu hộp dùng dầm bê tông ứng lực trước (hoặc thêm hàng cột trong hành lang giữa). Không hộp nào đua ra, nên không cần cột chống thêm; cầu kính nhịp 8 m tựa hai đầu lên hai hộp.",
    "Diện tích: tổng sàn khoảng 2.880 m², mọi phòng trong ±10% đề. Bãi xe giữ như A ở đầu Nam; người đọc đi dọc bờ sông rồi rẽ vào sân Bắc tới cửa sau sảnh đón tiếp."
  ];
  /* ---------- khối 3D: mỗi hộp một vật liệu, hộp một tầng có mái cỏ ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top + 1.6, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotH5", fam: "chot", code: "H.5", from: "hộp xếp", name: "Bậc thang hộp xuống sông", rule: "Hộp hai tầng phía phố, hộp một tầng bước xuống sông, so le",
    tag: "Ba dải hộp Đông – Tây; hộp hai tầng sát lối Tây, hộp một tầng mái cỏ bước xuống sông; hộp thiếu nhi lệch 2 m thành bậc so le",
    story: "Không có hộp bọc ngoài. Các hộp nhỏ dần và thấp dần từ lối Tây xuống bờ sông như những bậc cầu thang: hộp gỗ hai tầng, hộp đọc gạch hai tầng, hộp Nam trắng hai tầng ở phía phố; hộp phòng đa năng, hộp thiếu nhi một tầng mái cỏ ở phía sông. Một sảnh đón tiếp duy nhất ở mặt quảng trường Bắc chia khách sang khu sự kiện hoặc qua hành lang kính tới quầy thư viện.",
    why: [["Quy luật hình khối", "Hộp xếp theo bậc: cao ở phía phố, thấp ở phía sông, và so le Bắc – Nam (hộp thiếu nhi lệch 2 m về phía Bắc so với hộp đọc). Mỗi hộp một vật liệu: gỗ, gạch, trắng, đá, xanh."], ["Khối chính – khối phụ", "Hộp đọc và hộp Nam (thư viện, nghiệp vụ) chiếm gần 70% sàn là khối chính; dải Bắc (sự kiện) và hộp thiếu nhi là khối phụ."], ["Nắng và chói", "Mọi phòng có người lấy sáng Bắc – Nam qua sân 8 m; đầu hồi Đông, Tây đặc. Mái cỏ hộp một tầng giảm nóng cho phòng tầng 2 nhìn xuống."], ["Gió và mưa", "Hai sân mở ra sông, gió Đông Nam lùa qua sân vào hai mặt dài. Mưa mùa đông từ phía sông đập vào đầu hồi đặc."], ["Công năng", "Một cửa vào, sảnh đón tiếp là bản lề; khu sự kiện chạy riêng ngoài giờ; khu đọc chỉ vào qua quầy có cổng từ; nghiệp vụ gom ở tầng 1 hộp Nam cạnh lối Tây."]],
    kc: { he: "Khung bê tông lưới 8 m theo phương dọc hộp, dầm ngang nhịp 16 m bê tông ứng lực trước; phòng đa năng 11 × 16 m không cột giữa. Hộp một tầng mái bê tông phủ đất trồng cỏ. Cầu kính dầm thép nhịp 8 m.", nhip: "16 m (chiều sâu hộp)", cx: "Không có phần đua" },
    qa: [["Khách sự kiện có phải đi qua thư viện?", "Không. Khách vào sảnh đón tiếp rồi rẽ phải sang sảnh sự kiện, hoặc đi thang đầu Tây lên trưng bày, chuyên đề. Cửa sang thư viện là cửa khóa ngoài giờ ở cuối sảnh."], ["Sân 8 m có đủ sáng?", "Đủ theo mốc tự đặt: góc che từ cửa sổ tầng 1 tới đỉnh hộp hai tầng đối diện là 44°. Mặt Bắc tầng 1 hộp Nam là xử lý, văn phòng, có cửa sổ nhìn sân; tầng 2 thì thoáng hẳn."], ["Người đọc từ bãi xe có phải đi xa?", "Khoảng 60 m dọc bờ sông rồi rẽ vào sân Bắc, tới cửa kính sau sảnh đón tiếp. Cả hai cửa đều vào sảnh, quầy lễ tân và bảo vệ nhìn được cả hai."]],
    cut: "Năm hộp foam bọc giấy theo vật liệu: gỗ (hộp tầng 2 dải Bắc), trắng (tầng 1 dải Bắc), gạch (hộp đọc), trắng (hộp Nam), xanh (hộp thiếu nhi), mái cỏ dán giấy cỏ trên hộp một tầng. Hành lang kính, cầu kính: mica. Lõi thang foam cam, tím cao hơn mái 0,8 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[15, 22, Z2 + 0.3, "Khối phụ · Hộp gỗ: trưng bày, chuyên đề", 2], [31, 22, ZD + 0.3, "Khối phụ · Hộp đa năng mái cỏ", 2], [17, 46, Z2 + 0.3, "Khối chính · Hộp đọc", 1], [22, 70, Z2 + 0.3, "Khối chính · Hộp Nam: nghiệp vụ, đọc yên tĩnh", 1], [33.2, 44, Z1 + 0.3, "Hộp thiếu nhi mái cỏ", 2], [33.2, 57, 0.6, "Vườn thiếu nhi", 2], [11.2, 34, 4.8, "Hành lang kính", 2], [7.5, 58, 9.3, "Cầu kính", 2]],
    build() {
      // lõi và tầng 2 đặt trước để phép kiểm góc che gặp khối cao nhất trước
      const v = [
        coreBox(t1, "ST2", "warn", Z2), coreBox(t1, "CN", "violet", Z2), coreBox(t1, "CS", "violet", Z2), coreBox(t1, "STS", "violet", Z2), coreBox(t1, "STE", "warn", Z2),
        B(6, 14, 18, 16, 4.95, Z2, "deck", "D", { fl: 1, role: "p" }),
        B(6, 38, 22, 16, 4.95, Z2, "ribbon", "B", { fl: 1, role: "m" }),
        B(6, 62, 35, 16, 4.95, Z2, "sheet", "B", { fl: 1, role: "m" }),
        B(6, 54, 3, 8, 4.95, 8.95, "glass", "L", { fl: 1, role: "p" }),
        B(6, 54, 5.5, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 14, 18, 16, 0.45, 4.95, "sheet", "A", { fl: 1, role: "p" }),
        B(24, 14, 14, 16, 0.45, ZD, "stone", "D", { fl: 1, top: "grass", role: "p" }),
        B(10, 30, 2.5, 8, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 38, 22, 16, 0.45, 4.95, "ribbon", "B", { fl: 1, role: "m" }),
        B(28, 36, 10.5, 16, 0.45, Z1, "accent", "B", { fl: 1, top: "grass", role: "p" }),
        B(6, 62, 35, 16, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }),
        // tường thấp bao vườn thiếu nhi
        B(28, 52, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(38.2, 52, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 28]) for (const y of [38, 46, 54]) st.push(col(x, y, 0.45, Z2));
      for (const x of [6, 14, 22, 30, 38, 41]) for (const y of [62, 70, 78]) st.push(col(x, y, 0.45, Z2));
      for (const x of [6, 14, 24]) for (const y of [14, 22, 30]) st.push(col(x, y, 0.45, x < 24 ? Z2 : ZD));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
