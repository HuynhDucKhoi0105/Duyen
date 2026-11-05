/* ================= Ý tưởng S.5: Thanh dài ba tầng, tầng trên cùng đọc yên tĩnh (khối chữ nhật xếp với nhau) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // hàng Bắc: hộp đón tiếp (kính, 2 tầng) + hộp sự kiện (vàng, 1 tầng); sân giữa 12,5 m;
  // thanh thư viện đá dài 35,5 m, sâu 16 m, 2 tầng, trên cùng là tầng 3 gỗ (đọc yên tĩnh, văn phòng); sân Nam 12,5 m; hộp thiếu nhi 1 tầng
  const AB = [[6, 14], [22, 14], [22, 30], [6, 30]];
  const EV = [[22, 14], [41.5, 14], [41.5, 30], [22, 30]];
  const LK = [[19, 30], [22, 30], [22, 42.5], [19, 42.5]];
  const LB = [[6, 42.5], [41.5, 42.5], [41.5, 58.5], [6, 58.5]];
  const LS = [[26.75, 58.5], [29.25, 58.5], [29.25, 71], [26.75, 71]];
  const RB = [[19, 71], [41.5, 71], [41.5, 86], [19, 86]];
  const COURT = [[6, 30], [19, 30], [19, 42.5], [6, 42.5]], COURT2 = [[22, 30], [41.5, 30], [41.5, 42.5], [22, 42.5]];
  const GARDEN = [[29.25, 86], [41.5, 86], [41.5, 88.6], [29.25, 88.6]], YARD = [[6, 58.5], [26.75, 58.5], [26.75, 71], [6, 71]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [AB, EV, LK, LB, LS, RB],
    rooms: [
      // hộp đón tiếp: cửa vào duy nhất từ sân giữa vào sảnh đón tiếp
      { id: "A3", c: "A3", n: "Cà phê sách (nhìn quảng trường)", r: [6, 14, 8.75, 8], ctl: "sk", nz: 3, seat: 32, d: [["A1", 3, "o"]] },
      { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [14.75, 14, 2.5, 8], ctl: "sk", nz: 1, wc: KT, d: [["VES", 1.0, "p"]] },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.75, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["VES", 1.4, "thang"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [6, 22, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["S", 2.4, "chinh", 0.45], ["VES", 2.4, "o"], ["A4", 2.0, "k"]] },
      { id: "VES", c: "circ", n: "Sảnh chia luồng (sang sự kiện, lên tầng 2)", r: [16, 22, 6, 3], ctl: "sk", nz: 2, d: [["FOYE", 2.4, "o"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16, 25, 6, 5], ctl: "tv", ctrl: 1, nz: 2, d: [["LK", 2.4, "o"]] },
      // hộp sự kiện: chỉ vào từ sảnh đón tiếp, cửa ra ngoài chỉ là cửa thoát nạn
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [22, 14, 4, 3.75], ctl: "nv", nz: 1, d: [["FOYE", 0.9, "nv"]] },
      { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [22, 17.75, 4, 12.25], ctl: "sk", nz: 2, occ: 40, d: [["FOY2", 2.4, "o"], ["D3", 1.2, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [26, 14, 4.25, 5.9], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [26, 19.9, 4.25, 4.7], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "FOY2", c: "circ", n: "Sảnh chờ phòng đa năng", r: [26, 24.6, 4.25, 5.4], ctl: "sk", nz: 2, d: [["D1", 2.0, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [30.25, 14, 11.25, 16], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.6], ["E", 1.6, "tn", 0.5]] },
      { id: "LK", c: "circ", n: "Cầu kính qua sân giữa (sau cổng từ)", r: [19, 30, 3, 12.5], ctl: "tv", nz: 1, d: [["HL", 2.4, "o"]] },
      // thanh thư viện tầng 1, dải Bắc: tiếp nhận, xử lý, sảnh thư viện, đọc mở
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 42.5, 3.75, 8], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85], ["C2", 1.2, "nv"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [9.75, 42.5, 9.25, 8], ctl: "nv", nz: 1, d: [["C1", 1.2, "nv"], ["HL", 1.0, "nv", 0.15]] },
      { id: "HL", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [19, 42.5, 3, 8], ctl: "tv", nz: 1, d: [["B1t", 2.4, "o"]] },
      { id: "B1t", c: "B1", n: "Đọc mở và kệ (tầng 1)", r: [22, 42.5, 19.5, 8], ctl: "tv", nz: 1, seat: 30 },
      // dải Nam: kho đóng sát lõi sách, kho chung, kỹ thuật, thang Đông
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 50.5, 13.75, 8], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.75, 50.5, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["HL", 1.4, "thang"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [24.25, 50.5, 2.5, 8], ctl: "nv", nz: 1, d: [["LH", 0.9, "nv"]] },
      { id: "LH", c: "circ", n: "Hành lang sang hộp thiếu nhi", r: [26.75, 50.5, 2.5, 8], ctl: "tv", nz: 1, d: [["B1t", 2.0, "o"], ["LS", 2.0, "o"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [29.25, 50.5, 7, 8], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
      { id: "B1s", c: "B1", n: "Bàn đọc cá nhân (quay Nam)", r: [36.25, 50.5, 2.5, 8], ctl: "tv", nz: 1, d: [["B1t", 1.0, "o"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.75, 50.5, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1t", 1.2, "thang", 0.25], ["S", 1.2, "tnbd", 0.3]] },
      { id: "LS", c: "circ", n: "Cầu nối sang hộp thiếu nhi", r: [26.75, 58.5, 2.5, 12.5], ctl: "tv", nz: 1, d: [["RH", 2.0, "o"]] },
      // hộp thiếu nhi một tầng: phòng nhân viên, lưu trữ địa phương, thiếu nhi
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [19, 71, 5.5, 7.5], ctl: "nv", nz: 1, d: [["W", 1.0, "nv", 0.5], ["C3", 0.9, "nv"]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [19, 78.5, 5.5, 7.5], ctl: "kho", nz: 1, d: [["KX", 1.0, "nv"]] },
      { id: "WCB", c: "E5", n: "Vệ sinh thư viện tầng 1, trẻ em, thay tã", r: [24.5, 71, 2.25, 7.5], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["RH", 1.0, "p"]] },
      { id: "KX", c: "circ", n: "Kho nhân viên, lối nhân viên", r: [24.5, 78.5, 2.25, 7.5], ctl: "nv", nz: 1, d: [["RH", 0.9, "nv"]] },
      { id: "RH", c: "circ", n: "Sảnh hộp thiếu nhi", r: [26.75, 71, 2.5, 15], ctl: "tv", nz: 1, d: [["B3", 1.8, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [29.25, 71, 12.25, 15], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.5]] }
    ],
    staff: [
      { x: 11, y: 26, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19, y: 27.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 24, y: 15.8, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 10, y: 16, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 35, y: 78, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 14, y: 46.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 7.8, y: 46.5, t: "Nhận sách", sc: ["4"] },
      { x: 24, y: 26, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 28, y: 17, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2 ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [AB, LB],
    rooms: [
      // hộp đón tiếp tầng 2 (khu sự kiện): trưng bày, chuyên đề; chỉ lên bằng thang khu sự kiện
      { id: "A2", c: "A2", n: "Trưng bày (quay Bắc)", r: [6, 14, 11.25, 8], ctl: "sk", nz: 2, occ: 30 },
      { id: "CN", n: "Thang bộ + thang máy khu sự kiện", r: [17.25, 14, 4.75, 8], ctl: "sk", nz: 1, core: { st: "u+l", link: "CN" }, d: [["CO2", 1.4, "thang"]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [6, 22, 9.4, 8], ctl: "sk", nz: 2, seat: 24 },
      { id: "CO2", c: "circ", n: "Sảnh tầng 2 khu sự kiện", r: [15.4, 22, 6.6, 8], ctl: "sk", nz: 2, d: [["A2", 1.6, "o"], ["D4", 1.6, "p"]] },
      // thanh thư viện tầng 2: học nhóm đầu Tây có hành lang riêng, đọc mở, tra cứu số
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [6, 42.5, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [9.85, 42.5, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [13.7, 42.5, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [17.55, 42.5, 3.85, 6.5], ctl: "tv", nz: 2, d: [["CO4", 0.9, "p"]] },
      { id: "CO4", c: "circ", n: "Hành lang học nhóm", r: [6, 49, 15.4, 1.5], ctl: "tv", nz: 2, d: [["H2", 1.4, "o"], ["B1c", 1.6, "o"]] },
      { id: "H2", c: "circ", n: "Sảnh lõi sách tầng 2", r: [21.4, 42.5, 2.85, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B1a", 2.4, "o"]] },
      { id: "B1a", c: "B1", n: "Đọc mở và kệ (quay Bắc)", r: [24.25, 42.5, 17.25, 8], ctl: "tv", nz: 1 },
      { id: "B1c", c: "B1", n: "Đọc mở và kệ (quay Nam)", r: [6, 50.5, 13.75, 8], ctl: "tv", nz: 1 },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.75, 50.5, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WC2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [24.25, 50.5, 2.5, 8], ctl: "tv", nz: 1, wc: KT, d: [["B1a", 1.0, "p"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (quay Nam)", r: [26.75, 50.5, 12, 8], ctl: "tv", nz: 1, seat: 16, d: [["B1a", 2.4, "o"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.75, 50.5, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1a", 1.2, "thang"], ["B5", 1.2, "thang"]] }
    ],
    staff: [
      { x: 32, y: 54.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }
    ]
  };
  /* ---------- Tầng 3: tầng trên cùng, yên tĩnh nhất ---------- */
  const t3 = {
    k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: [LB],
    rooms: [
      { id: "B1x", c: "B1", n: "Đọc mở và kệ tầng 3 (quay Bắc)", r: [6, 42.5, 13.75, 8], ctl: "tv", nz: 1, d: [["H3", 2.0, "o"], ["KS", 2.4, "o"]] },
      { id: "H3", c: "circ", n: "Sảnh lõi sách tầng 3", r: [19.75, 42.5, 2, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"], ["B2", 1.2, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (quay Bắc, xa mọi nguồn ồn)", r: [21.75, 42.5, 19.75, 8], ctl: "tv", nz: 0, seat: 40 },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [6, 50.5, 6.25, 8], ctl: "tv", nz: 1, steps: 4, d: [["KS", 2.4, "o"]] },
      { id: "KS", c: "circ", n: "Sảnh đọc tầng 3, kệ giới thiệu sách", r: [12.25, 50.5, 7.5, 8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [19.75, 50.5, 4.5, 8], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" } },
      { id: "WC3", c: "E5", n: "Vệ sinh tầng 3", r: [24.25, 50.5, 2.5, 8], ctl: "tv", nz: 1, wc: KT, d: [["B2", 1.0, "p"]] },
      { id: "E1", c: "E1", n: "Văn phòng (quay Nam)", r: [26.75, 50.5, 10, 8], ctl: "nv", nz: 0, d: [["KE", 1.0, "nv"]] },
      { id: "KE", c: "circ", n: "Kho hồ sơ, lối nhân viên", r: [36.75, 50.5, 2, 8], ctl: "nv", nz: 1, d: [["STE", 1.0, "nv"]] },
      { id: "STE", n: "Thang bộ thư viện Đông", r: [38.75, 50.5, 2.75, 8], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B2", 1.2, "thang"]] }
    ],
    staff: [
      { x: 33, y: 54.5, t: "Văn phòng", sc: ["1", "3", "4"] }
    ]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotS5", code: "S.5", name: "Thanh dài ba tầng, tầng trên cùng đọc yên tĩnh", from: "khối vuông",
    AB, EV, LK, LB, LS, RB,
    yN: () => -999, yS: () => -999,
    levels: [t1, t2, t3],
    grid: { x: [6, 9.75, 19.75, 24.25, 29.25, 38.75, 41.5], y: [14, 22, 30, 42.5, 50.5, 58.5, 71, 78.5, 86] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 30, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 46.5], [5.2, 46.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [43, 96], [43, 36], [12, 36], [10.5, 30.6]]],
        event: [[[20, -9], [3, 4], [3, 36], [9, 36], [10.5, 30.6]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc theo lối Tây, vào sân giữa tới sảnh đón tiếp" },
      hatch: [COURT, COURT2, GARDEN, YARD],
      labels: [[12, 36, "Sân giữa"], [35, 87.3, "Vườn thiếu nhi"], [14, 18, "Hộp đón tiếp"], [35, 22, "Hộp sự kiện"], [16, 54, "Thanh thư viện 3 tầng"], [13, 65, "Sân Nam"], [33, 78, "Hộp thiếu nhi"]]
    }
  };
  plan.intro = `<p class="lede">Không cầu kỳ: một <b>thanh thư viện</b> chữ nhật dài 35,5 m, sâu 16 m, ba tầng, đặt giữa khu đất; phía Bắc là <b>hộp đón tiếp</b> hai tầng và <b>hộp sự kiện</b> một tầng; phía Nam là <b>hộp thiếu nhi</b> một tầng. Tầng 3 của thanh là tầng yên tĩnh nhất: đọc yên tĩnh và văn phòng, cách xa phòng đa năng cả một sân và hai tầng nhà. Sân giữa và sân Nam rộng 12,5 m để tầng 3 không che sáng hộp nào quá 45°. Một cửa vào duy nhất: sân giữa → sảnh đón tiếp → quầy gửi đồ, mượn trả có cổng từ → cầu kính → thanh thư viện; thiếu nhi cũng đi đường này rồi qua cầu nối Nam.</p>`;
  plan.notes = [
    "Thư viện luôn qua khối A: cửa vào duy nhất mở từ sân giữa vào sảnh đón tiếp. Quầy gửi đồ, mượn trả có cổng từ nằm ngay cạnh sảnh; qua quầy mới tới cầu kính sang thanh thư viện. Hộp thiếu nhi chỉ tới được sau quầy: sảnh thư viện → phòng đọc mở → hành lang → cầu nối Nam → sảnh hộp thiếu nhi. Cửa ra vườn thiếu nhi là cửa thoát hiểm có chuông.",
    "Khu sự kiện cũng qua sảnh đón tiếp: sảnh chia luồng dẫn sang sảnh sự kiện và phòng đa năng, và lên trưng bày, chuyên đề ở tầng 2 hộp đón tiếp bằng thang khu sự kiện. Phòng đa năng chỉ có cửa thoát nạn ra ngoài.",
    "Thang có hệ quả: hai thang lên các tầng thư viện (lõi sách ở giữa thanh, thang Đông) chỉ mở trong vùng đã qua cổng từ; cửa ra ngoài của thang Đông ở tầng 1 là cửa thoát hiểm có chuông. Thang khu sự kiện chỉ nối sảnh với tầng 2 hộp đón tiếp. Lõi sách có thang máy phục vụ cả ba tầng thư viện.",
    "Đường sách mới: lối Tây → cửa cuốn → tiếp nhận → xử lý nghiệp vụ (liền vách) → kho đóng (liền vách) → lõi sách có tời ngay cạnh → kệ tầng 2, tầng 3. Sách trả: quầy mượn trả → cầu kính → sảnh thư viện → cửa nhân viên vào xử lý nghiệp vụ.",
    "Vệ sinh: cụm công cộng mở ngoài giờ cạnh sảnh chia luồng; vệ sinh thư viện tầng 1 kiêm vệ sinh trẻ em, thay tã ở sảnh hộp thiếu nhi; tầng 2 và tầng 3 có vệ sinh sát lõi sách.",
    "Yên tĩnh: học nhóm ở đầu Tây tầng 2 có hành lang riêng; đọc yên tĩnh ở tầng 3, phía trên đọc mở, không chồng lên phòng ồn; phòng đa năng ở hộp riêng bên kia sân giữa; văn phòng tầng 3 quay Nam, phòng nhân viên ở hộp thiếu nhi, ngăn với phòng thiếu nhi bằng vệ sinh, kho và sảnh.",
    "Ánh sáng Bắc – Nam: thanh sâu 16 m chia hai dải 8 m quay Bắc và Nam; hộp thiếu nhi sâu 15 m, phòng thiếu nhi sáng hai mặt. Sân rộng 12,5 m, thanh cao +13,95: góc che 44,5° (dưới 45°). Đầu Đông, Tây đặc.",
    "Ngoài giờ: hộp đón tiếp và hộp sự kiện chạy riêng; chỉ khóa cửa sảnh đón tiếp vào quầy mượn trả.",
    "Kết cấu: khung bê tông lưới khoảng 8 m; ba tầng thư viện chồng thẳng, không đua; kho đóng ở tầng 1 sát lõi sách, tải xuống thẳng móng."
  ];
  /* ---------- khối 3D ---------- */
  const { B, col } = G.K;
  const coreBox = (L, id, c, top) => { const z = L.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotS5", fam: "chot", code: "S.5", from: "khối vuông", name: "Thanh dài ba tầng, tầng trên cùng đọc yên tĩnh", rule: "Thanh chữ nhật chồng tầng, hộp thấp hai bên",
    tag: "Thanh thư viện đá ba tầng ở giữa, hộp đón tiếp kính và hộp sự kiện vàng phía Bắc, hộp thiếu nhi gỗ một tầng phía Nam",
    story: "Một thanh sách đứng giữa khu đất, càng lên cao càng yên tĩnh: tầng 1 nghiệp vụ và đọc mở, tầng 2 học nhóm và tra cứu, tầng 3 đọc yên tĩnh nhìn về phía Bắc. Hai bên là các hộp thấp: đón tiếp, sự kiện phía phố, thiếu nhi phía bãi xe.",
    why: [["Quy luật hình khối", "Một thanh cao ba tầng và ba hộp thấp xếp song song, chỉ khác chiều cao và vật liệu."], ["Khối chính – khối phụ", "Thanh thư viện cao nhất (+13,95) và chiếm phần lớn sàn; các hộp còn lại một hoặc hai tầng."], ["Nắng và chói", "Mọi phòng quay Bắc hoặc Nam; đầu Đông, Tây đặc."], ["Gió và mưa", "Hai sân mở về sông đón gió Đông Nam; cầu kính, cầu nối có mái."], ["Công năng", "Một cửa vào qua sảnh đón tiếp; lõi sách giữa thanh nối kho với ba tầng kệ."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; ba tầng chồng thẳng; phòng đa năng dầm ứng lực trước nhịp 11,25 m; lõi sách bê tông làm lõi cứng.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Tầng 3 có che sáng hai sân?", "Hai sân rộng 12,5 m, góc từ cửa sổ tầng 1 lên đỉnh thanh là 44,5°, dưới mốc 45°. Lõi thang không nhô khỏi mái để giữ góc này."], ["Thiếu nhi có vào thẳng từ vườn?", "Không: cửa ra vườn là cửa thoát hiểm có chuông; trẻ và phụ huynh vào qua sảnh đón tiếp và quầy mượn trả."]],
    cut: "Thanh foam ba tầng bọc giấy đá, tầng 3 dán gỗ; hộp đón tiếp mica, hộp sự kiện giấy vàng, hộp thiếu nhi giấy gỗ.",
    roleOf: v => v.role || "p", floors: 3,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[24, 54, 14.5, "Khối chính · Thanh thư viện ba tầng", 1], [14, 22, 10, "Hộp đón tiếp", 2], [35, 22, 7, "Hộp sự kiện", 2], [35, 78, 5.5, "Hộp thiếu nhi", 2]],
    build() {
      const v = [
        coreBox(t1, "CS", "violet", 13.95), coreBox(t1, "STE", "warn", 13.95), coreBox(t1, "CN", "violet", 11.05),
        B(6, 14, 16, 16, 0.45, 9.45, "glass", "A", { fl: 2, role: "p" }),
        B(22, 14, 19.5, 16, 0.45, 6.45, "gold", "D", { fl: 1, top: "grass", role: "p" }),
        B(19, 30, 3, 12.5, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        B(6, 42.5, 35.5, 16, 0.45, 9.45, "stone", "B", { fl: 2, role: "m" }),
        B(6, 42.5, 35.5, 16, 9.45, 13.95, "deck", "B", { fl: 1, role: "m" }),
        B(26.75, 58.5, 2.5, 12.5, 0.45, 4.45, "glass", "L", { fl: 1, role: "m" }),
        B(19, 71, 22.5, 15, 0.45, 4.95, "ribbon", "B", { fl: 1, top: "grass", role: "m" }),
        B(29.25, 86, 0.3, 2.6, 0, 1.2, "stone", "X", { role: "p" }), B(41.2, 86, 0.3, 2.6, 0, 1.2, "stone", "X", { role: "p" }), B(29.25, 88.3, 12.25, 0.3, 0, 1.2, "stone", "X", { role: "p" })
      ];
      const st = [];
      for (const x of [6, 14, 22, 30.25, 41.5]) for (const y of [42.5, 50.5, 58.5]) st.push(col(x, y, 0.45, 13.95));
      for (const x of [19, 29.25, 41.5]) for (const y of [71, 86]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
