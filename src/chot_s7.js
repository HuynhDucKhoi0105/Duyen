/* ================= Ý tưởng S.7: Hai thanh song song (khối vuông, chữ nhật đơn giản) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hai thanh chữ nhật chạy Đông – Tây, cách nhau sân 10 m: thanh Bắc công cộng (đầu Tây hai tầng, đầu Đông một tầng là phòng đa năng),
  // thanh Nam thư viện hai tầng; một cầu kính một tầng nối quầy mượn trả (thanh Bắc) với sảnh thư viện (thanh Nam)
  const NB = [[6, 14], [41.5, 14], [41.5, 30], [6, 30]];      // thanh Bắc tầng 1
  const NT = [[6, 14], [23.75, 14], [23.75, 30], [6, 30]];    // thanh Bắc tầng 2 (chỉ đầu Tây)
  const LK = [[18.5, 30], [21.5, 30], [21.5, 40], [18.5, 40]]; // cầu kính qua sân
  const SB = [[6, 40], [41.5, 40], [41.5, 68], [6, 68]];      // thanh Nam: thư viện hai tầng
  const COURT = [[6, 30], [18.5, 30], [18.5, 40], [6, 40]], COURT2 = [[21.5, 30], [41.5, 30], [41.5, 40], [21.5, 40]];
  const GARDEN = [[18.5, 68], [41.5, 68], [41.5, 78], [18.5, 78]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NB, LK, SB],
    rooms: [
      // thanh Bắc, dải Bắc: cà phê nhìn quảng trường, vệ sinh công cộng, thang khu sự kiện, bảo vệ, phòng đa năng ở đầu Đông
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn quảng trường)", r: [6, 14, 8.75, 8], ctl: "sk", nz: 3, seat: 32, d: [["A1", 3.0, "o"], ["N", 1.2, "tn", 0.5]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [14.75, 14, 2.5, 8], ctl: "sk", nz: 1, wc: KT, d: [["A1", 1.0, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.5, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["CO", 1.4, "thang"], ["N", 1.2, "tn"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [21.75, 14, 2, 8], ctl: "nv", nz: 1, d: [["N", 1.0, "nv"], ["CO", 0.9, "nv"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [23.75, 14, 6.5, 3.85], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [23.75, 17.85, 6.5, 3.1], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["FOYE", 1.2, "p"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [23.75, 20.95, 6.5, 9.05], ctl: "sk", nz: 2, occ: 40, d: [["D1", 1.8, "p", 0.4], ["CO", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [30.25, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["N", 1.8, "tn", 0.5], ["E", 1.6, "tn", 0.5], ["S", 1.8, "tn", 0.5]] },
      // thanh Bắc, dải Nam: sảnh đón tiếp (cửa vào duy nhất), sảnh chia luồng, quầy gửi đồ – mượn trả
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 22, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.5], ["CO", 2.4, "o"], ["A4", 2.0, "k"]] },
      { id: "CO", c: "circ", n: "Sảnh chia luồng (sang sự kiện, lên tầng 2)", r: [16, 22, 7.75, 3], ctl: "sk", nz: 2 },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16, 25, 6, 5], ctl: "tv", ctrl: 1, nz: 2, d: [["LK", 2.4, "o"]] },
      { id: "KXL", c: "circ", n: "Kho xe lăn, xe đẩy", r: [22, 25, 1.75, 5], ctl: "sk", nz: 1, d: [["CO", 0.9, "p"]] },
      // cầu kính qua sân (sau cổng từ)
      { id: "LK", c: "circ", n: "Cầu kính qua sân (sau cổng từ)", r: [18.5, 30, 3, 10], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"]] },
      // thanh Nam, dải Bắc (nhìn sân): tiếp nhận, xử lý, sảnh thư viện, đọc mở
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 40, 3.75, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.75, 40, 8.75, 8], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["HL", 1.0, "nv"]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện cuối cầu kính", r: [18.5, 40, 4.5, 8], ctl: "tv", nz: 1, d: [["B1a", 2.4, "o"], ["CS", 1.4, "thang"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (nhìn sân)", r: [23, 40, 18.5, 8], ctl: "tv", nz: 1, d: [["N", 1.2, "tnbd", 0.85], ["LC", 2.4, "o"], ["STE", 1.2, "thang"]] },
      // thanh Nam, dải giữa: kho, lõi sách, vệ sinh, kỹ thuật (không cần cửa sổ)
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 48, 12, 10], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"], ["SC", 1.0, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [18, 48, 4.5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "KXS", c: "circ", n: "Kho xe sách", r: [18, 55, 4.5, 3], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"]] },
      { id: "SC", c: "circ", n: "Hành lang nhân viên", r: [6, 58, 16.5, 2], ctl: "nv", nz: 1, d: [["E1", 1.0, "nv"], ["E6", 0.9, "nv"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [22.5, 48, 3, 12], ctl: "tv", nz: 1, d: [["WCL", 1.0, "p"], ["B3", 1.8, "p"]] },
      { id: "WCL", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [25.5, 48, 4, 4.5], ctl: "tv", nz: 1, wc: KT },
      { id: "KWC", c: "circ", n: "Kho dụng cụ vệ sinh khu đọc", r: [25.5, 52.5, 4, 4.5], ctl: "tv", nz: 1, d: [["LC", 0.9, "p"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [25.5, 57, 4, 3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [29.5, 48, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STE" } },
      { id: "KST", c: "circ", n: "Kho sách thiếu nhi", r: [29.5, 54, 3, 6], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "KS2", c: "circ", n: "Kho đồ chơi, thiết bị", r: [32.5, 48, 2.5, 12], ctl: "tv", nz: 1, d: [["B3", 0.9, "p"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [35, 48, 6.5, 8.5], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
      { id: "KE", c: "circ", n: "Kho phụ tùng kỹ thuật", r: [35, 56.5, 6.5, 3.5], ctl: "kt", nz: 1, d: [["E4", 0.9, "nv"]] },
      // thanh Nam, dải Nam (nhìn vườn): văn phòng, kho chung làm vách đệm, thiếu nhi
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, 60, 10, 8], ctl: "nv", nz: 0, d: [["S", 1.0, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung (vách đệm)", r: [16, 60, 2.5, 8], ctl: "nv", nz: 1 },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [18.5, 60, 23, 8], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.3]] }
    ],
    staff: [
      { x: 10, y: 26, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19, y: 27.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 22.7, y: 18, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 10, y: 17, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 34, y: 64, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 14, y: 44, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 44, t: "Nhận sách", sc: ["4"] },
      { x: 11, y: 64, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 27, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 27, y: 16, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [NT, SB],
    rooms: [
      // thanh Bắc tầng 2 (khu sự kiện): trưng bày, chuyên đề; phòng nhân viên tách khỏi chuyên đề bằng sảnh
      { id: "A2", c: "A2", n: "Trưng bày (quay Bắc)", r: [6, 14, 11.25, 8], ctl: "sk", nz: 2, occ: 30, d: [["H2", 1.4, "o"]] },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.5, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["H2", 1.4, "thang"]] },
      { id: "KX", c: "circ", n: "Kho trưng bày", r: [21.75, 14, 2, 8], ctl: "kho", nz: 1, d: [["E2", 0.9, "nv"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 22, 9.4, 8], ctl: "sk", nz: 2, seat: 24, d: [["H2", 1.4, "p"]] },
      { id: "H2", c: "circ", n: "Sảnh tầng 2 khu sự kiện", r: [15.4, 22, 3.6, 8], ctl: "sk", nz: 2, d: [["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [19, 22, 4.75, 8], ctl: "nv", nz: 1 },
      // thanh Nam tầng 2 (tầng trên cùng): mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 40, 5, 8], ctl: "kho", nz: 1, d: [["B6", 0.9, "nv"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [11, 40, 6.5, 8], ctl: "tv", nz: 1, steps: 4, top: N, d: [["HS2", 2.4, "o"]] },
      { id: "HS2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [17.5, 40, 5, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B5", 2.4, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [22.5, 40, 12.5, 8], ctl: "tv", nz: 1, seat: 16, top: N, d: [["B1e", 2.4, "o"], ["LC2", 2.4, "o"], ["B1g", 2.0, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở góc Đông Bắc", r: [35, 40, 6.5, 8], ctl: "tv", nz: 1, top: N, d: [["B1g", 2.4, "o"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây)", r: [6, 48, 12, 13.33], ctl: "tv", nz: 0, seat: 40, top: N, d: [["B1c", 1.2, "p"]] },
      { id: "B1w", c: "B1", n: "Bàn đọc cá nhân (góc Tây Nam)", r: [6, 61.33, 12, 6.67], ctl: "tv", nz: 1, top: N, d: [["B1c", 1.6, "o"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [18, 48, 4.5, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1c", 1.4, "thang"]] },
      { id: "B1c", c: "B1", n: "Dải kệ cạnh lõi sách", r: [18, 55, 4.5, 13], ctl: "tv", nz: 1, top: N, d: [["LC2", 2.4, "o"]] },
      { id: "LC2", c: "B1", n: "Dải kệ giữa (lối đi chính)", r: [22.5, 48, 4, 12], ctl: "tv", nz: 1, top: N, d: [["WC2", 1.0, "p"], ["B1k", 2.4, "o"], ["CO4", 2.4, "o"]] },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [26.5, 48, 3, 6], ctl: "tv", nz: 1, wc: KT },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [29.5, 48, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1k", 1.2, "thang"], ["B1g", 1.2, "thang"]] },
      { id: "B1k", c: "B1", n: "Bàn đọc cá nhân (giữa)", r: [26.5, 54, 6, 6], ctl: "tv", nz: 1, top: N, d: [["B1g", 2.4, "o"]] },
      { id: "B1g", c: "B1", n: "Đọc mở và kệ (sảnh đọc Đông)", r: [32.5, 48, 9, 12], ctl: "tv", nz: 1, top: N },
      // học nhóm ở góc Đông Nam, có hành lang riêng và tủ đồ, cách đọc yên tĩnh hơn 8 m
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [22.5, 60, 19, 1.5], ctl: "tv", nz: 2, d: [["B1g", 1.2, "p", 0.7]] },
      { id: "KB", c: "circ", n: "Tủ đồ học nhóm", r: [22.5, 61.5, 3.6, 6.5], ctl: "tv", nz: 1, d: [["CO4", 0.9, "p"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [26.1 + 3.85 * i, 61.5, 3.85, 6.5], ctl: "tv", nz: 2, top: N, d: [["CO4", 0.9, "p"]] }))
    ],
    staff: [
      { x: 28, y: 44, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS7", code: "S.7", name: "Hai thanh song song", from: "khối vuông",
    NB, NT, LK, SB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 14.75, 23.75, 30.25, 35, 41.5], y: [14, 22, 30, 40, 48, 58, 68] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 35, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 42.8], [5.2, 42.8]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 35], [12, 35], [11, 30.6]]],
        event: [[[20, -9], [3, 4], [3, 35], [9, 35], [11, 30.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa hai thanh tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, vào sân giữa tới sảnh đón tiếp" },
      hatch: [COURT, COURT2, GARDEN],
      labels: [[12, 35, "Sân giữa hai thanh"], [33, 35, "Sân giữa mở ra sông"], [30, 74, "Vườn thiếu nhi có tường bao"], [12, 18, "Thanh Bắc · công cộng"], [24, 56, "Thanh Nam · thư viện"]]
    }
  };
  plan.intro = `<p class="lede">Hai thanh chữ nhật chạy song song theo hướng Đông – Tây, cách nhau một sân rộng 10 m. <b>Thanh Bắc</b> là thanh công cộng, dài suốt khu đất: đầu Tây hai tầng (sảnh đón tiếp, cà phê ở tầng 1; trưng bày, chuyên đề, phòng nhân viên ở tầng 2), đầu Đông là phòng đa năng một tầng nhìn ra sông. <b>Thanh Nam</b> là thư viện hai tầng, khối chính. Hai thanh chỉ nối nhau bằng một cầu kính một tầng: đầu cầu phía Bắc là quầy gửi đồ, mượn trả có cổng từ, ngay cạnh sảnh đón tiếp. Mọi phòng có người đều quay mặt Bắc hoặc Nam; hai đầu Đông, Tây của mỗi thanh là tường đặc.</p>`;
  plan.notes = [
    "Đi qua khối A: cửa vào duy nhất mở từ sân giữa vào sảnh đón tiếp ở đầu Tây thanh Bắc. Sát sảnh là quầy gửi đồ, mượn trả có cổng từ (sảnh → quầy khoảng 6 m); qua quầy mới vào cầu kính sang thanh thư viện. Phòng thiếu nhi, mọi phòng đọc tầng 1 và tầng 2 đều nằm sau quầy này. Khu sự kiện cũng đi từ sảnh đón tiếp qua sảnh chia luồng; phòng đa năng chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: thang khu sự kiện (có thang máy) chỉ lên tầng 2 thanh Bắc, không có lối sang thư viện. Hai thang lên khu đọc (lõi sách và thang Đông) nằm trong thanh Nam, chỉ tới được sau cầu kính và cổng từ; tầng 1 của chúng mở vào sảnh thư viện và phòng đọc mở, không có cửa ra ngoài.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách, ngay phía Nam) → lõi sách có tời ngay cạnh kho → kệ tầng 2. Sách trả: thủ thư đi từ quầy qua cầu kính, vào xử lý bằng cửa nhân viên ở sảnh thư viện (khoảng 20 m), không qua khu công cộng.",
    "Vệ sinh: cụm công cộng mở ngoài giờ ngay cạnh sảnh đón tiếp, phục vụ cà phê và phòng đa năng (khoảng 20 m). Khu đọc mỗi tầng có một cụm cạnh hành lang thư viện, tầng 2 xếp chồng thẳng lên tầng 1. Phòng thiếu nhi có vệ sinh trẻ em, chỗ thay tã mở thẳng vào phòng.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề nằm ở thanh Bắc, cách thư viện cả sân 10 m. Trong thanh thư viện, đọc yên tĩnh ở đầu Tây tầng 2, học nhóm ở góc Đông Nam, cách nhau hơn 8 m và có dải kệ ở giữa. Văn phòng ở góc Tây Nam tầng 1, tách phòng thiếu nhi bằng kho chung. Phòng nhân viên ở tầng 2 thanh Bắc, cách phòng chuyên đề bằng sảnh, không chồng lên cà phê hay phòng đa năng.",
    "Ánh sáng Bắc – Nam: thanh Bắc sâu 16 m, chia hai dải 8 m quay Bắc (quảng trường) và Nam (sân); phòng đa năng chạy suốt chiều sâu, lấy sáng cả hai mặt. Thanh Nam tầng 1 chia ba dải: dải Bắc nhìn sân và dải Nam nhìn vườn là phòng có người, sâu 8 m; dải giữa chỉ có kho, thang, vệ sinh, kỹ thuật. Tầng 2 là tầng trên cùng, các phòng đọc lấy sáng mái răng cưa kính quay Bắc.",
    "Không che sáng nhau: sân giữa rộng 10 m, thanh đối diện cao +9,45 nên góc che từ cửa sổ tầng 1 khoảng 38°, dưới mốc 45°. Đầu Đông thanh Bắc chỉ một tầng nên phòng đọc mở tầng 1 nhìn sang càng thoáng.",
    "Ngoài giờ: thanh Bắc (sảnh, cà phê, trưng bày, chuyên đề, phòng đa năng, vệ sinh công cộng) chạy riêng. Chỉ khóa một cửa từ sảnh đón tiếp vào quầy mượn trả.",
    "Kết cấu: hai thanh khung bê tông lưới khoảng 8 m, tầng 2 đặt thẳng trên tầng 1, không có phần đua; phòng đa năng 11,25 × 16 m dùng dầm ứng lực trước; kho đóng ở tầng 1 sát lõi sách nên tải nặng xuống thẳng móng."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS7", fam: "chot", code: "S.7", from: "khối vuông", name: "Hai thanh song song", rule: "Hai thanh chữ nhật song song Đông – Tây, nối bằng một cầu kính",
    tag: "Thanh Bắc công cộng (đầu Tây hai tầng, đầu Đông phòng đa năng một tầng), thanh Nam thư viện hai tầng; sân giữa 10 m, cầu kính sau cổng từ",
    story: "Hai thanh dài song song như hai dãy nhà phố: thanh phía Bắc ồn ào, mở cả buổi tối, nhìn ra quảng trường; thanh phía Nam yên tĩnh, là thư viện. Giữa hai thanh là một sân cây mở ra sông, chỉ có một cây cầu kính bắc qua, và muốn qua cầu phải đi ngang quầy thủ thư.",
    why: [["Quy luật hình khối", "Hai thanh chữ nhật cùng chiều dài, song song; thanh Bắc thấp dần về phía sông (hai tầng rồi một tầng), thanh Nam cao đều hai tầng."], ["Khối chính – khối phụ", "Thanh thư viện sâu 28 m, hai tầng, chiếm khoảng 70% sàn; thanh công cộng mảnh hơn."], ["Nắng và chói", "Mỗi thanh chỉ mở mặt Bắc và mặt Nam; hai đầu Đông, Tây là tường đặc."], ["Gió và mưa", "Sân giữa mở về phía sông, đón gió Đông Nam; cầu kính có mái che."], ["Công năng", "Một cửa vào, sảnh đón tiếp đứng cạnh quầy mượn trả; lõi sách nằm giữa kho và chỗ đọc."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; thanh Bắc đầu Tây mái bê tông phẳng, phòng đa năng mái dầm ứng lực trước nhịp 11,25 m; thanh Nam mái răng cưa thép nhẹ; cầu kính dầm thép nhịp 10 m.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Khách sự kiện có sang được thư viện không?", "Không: thanh Bắc chỉ nối thanh Nam qua cầu kính, đầu cầu là quầy có cổng từ và cửa khóa ngoài giờ."], ["Phòng thiếu nhi có cửa riêng ra vườn?", "Chỉ là cửa thoát hiểm có chuông báo; trẻ và phụ huynh vào qua sảnh đón tiếp và quầy mượn trả như mọi người đọc."]],
    cut: "Thanh Bắc foam xám (đầu Tây cao hai tầng, đầu Đông vàng một tầng); thanh Nam trắng có dải mica răng cưa quay Bắc; cầu kính mica; lõi thang tím, cam nhô khỏi mái 1 cm.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 56, 11.5, "Khối chính · Thanh thư viện", 1], [12, 22, 11, "Thanh Bắc · công cộng", 2], [35, 22, 7.5, "Phòng đa năng", 2], [20, 35, 5, "Cầu kính", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 11.05), coreBox(t1, "STE", "warn", 11.05), coreBox(t1, "CN", "violet", 11.05),
        B(6, 40, 35.5, 28, 0.45, 9.45, "sheet", "B", { fl: 2, role: "m" }),
        B(6, 14, 17.75, 16, 0.45, 9.45, "stone", "A", { fl: 2, role: "p" }),
        B(23.75, 14, 17.75, 16, 0.45, 6.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(18.5, 30, 3, 10, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        // mái răng cưa kính quay Bắc trên thanh thư viện
        ...[44, 50, 56, 62].map(y => B(7, y, 33.5, 0.5, 9.45, 10.45, "glass", "X", { op: 0.75 })),
        // tường thấp bao vườn thiếu nhi
        B(18.5, 68, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(41.2, 68, 0.3, 10, 0, 1.2, "stone", "X", { role: "p" }), B(18.5, 77.7, 23, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38, 41.5]) for (const y of [40, 48, 58, 68]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [6, 14.75, 23.75, 30.25, 41.5]) for (const y of [14, 22, 30]) st.push(col(x, y, 0.45, x <= 23.75 ? 9.45 : 6.45));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
