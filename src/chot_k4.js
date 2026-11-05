/* ================= Ý tưởng K.4: Khe Hải Vân, mái răng cưa đón sáng Bắc (sửa đủ góp ý của thầy) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // giữ đúng khe chéo của A (dốc 2/3, rộng 6 m, mở hai đầu: lối Tây và sông), kéo dài tới x = 38.
  // cánh Bắc 1 tầng, cánh Nam 2 tầng; mọi mái là răng cưa kính quay hướng Bắc, nên phòng sâu vẫn đủ sáng dịu
  const yN = x => 50 + (x - 6) * 2 / 3, yS = x => yN(x) + 6;
  const NWW = [[6, 14], [22, 14], [22, yN(22)], [6, yN(6)]];          // cánh Bắc, nửa Tây: thư viện tầng 1 + chuỗi kho sách (sau quầy kiểm soát)
  const NWE = [[22, 12], [38, 12], [38, yN(38)], [22, yN(22)]];       // cánh Bắc, nửa Đông: đón tiếp, sự kiện, cà phê, xử lý nghiệp vụ
  const SW = [[6, yS(6)], [38, yS(38)], [38, 88], [6, 88]];           // cánh Nam 2 tầng: nhân viên, kho đệm (tầng 1), sàn đọc dưới răng cưa (tầng 2)
  const BRP = [[16, yN(16)], [22, yN(22)], [22, yS(22)], [16, yS(16)]]; // cầu kính tầng 1 qua khe: lối đọc nối hai cánh thư viện
  const SLOT = [[6, yN(6)], [38, yN(38)], [38, yS(38)], [6, yS(6)]];
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";

  /* ---------- Tầng 1 ---------- */
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: [NWW, NWE, SW, BRP],
    rooms: [
      // cánh Bắc nửa Tây: thư viện tầng 1 (chỉ vào được qua quầy kiểm soát), mọi phòng lấy sáng mái răng cưa hướng Bắc
      { id: "WCL1", c: "E5", n: "Vệ sinh thư viện, thay tã", r: [6, 14, 8, 2.5], ctl: "tv", nz: 1, wc: KT + " · thay tã", d: [["LB3", 1.0, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [6, 16.5, 8, 21], ctl: "tv", nz: 3, seat: 32, top: N, d: [["LB3", 1.8, "p", 0.2], ["WCL1", 1.0, "p", 0.5], ["W", 1.4, "tnbd", 0.5]] },
      { id: "LB3", c: "circ", n: "Sảnh đệm thiếu nhi, xe đẩy", r: [14, 14, 1.2, 23.5], ctl: "tv", nz: 2, d: [["LHN", 1.6, "o", 0.5], ["B1n", 1.0, "p", 0.5]] },
      { id: "B1n", c: "B1", n: "Đọc mở góc Bắc", r: [15.2, 14, 6.8, 6.8], ctl: "tv", nz: 1, top: N, d: [["LHN", 2.4, "o"], ["N", 1.2, "tnbd", 0.5]] },
      { id: "LHN", c: "B1", n: "Sảnh đọc dọc, kệ mở (Bắc)", r: [15.2, 20.8, 6.8, 17.2], ctl: "tv", nz: 1, top: N, d: [["LH", 4, "o"]] },
      { id: "LH", c: "B1", n: "Sảnh đọc dọc, kệ mở (Nam)", r: [15.2, 38, 6.8, 30], ctl: "tv", nz: 1, top: N, d: [["L1", 2.4, "o"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 37.5, 9.2, 3.26], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["LH", 1.2, "nv"], ["C1", 1.2, "nv"]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, 40.76, 9.2, 16], ctl: "kho", nz: 1, d: [["LH", 1.2, "nv", 0.1], ["LH", 1.2, "nv", 0.9], ["W", 1.0, "tn", 0.6]] },
      // cánh Bắc nửa Đông: sự kiện chạy riêng ngoài giờ; xử lý nghiệp vụ và quầy kiểm soát ở bản lề
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [22, 12, 4, 5], ctl: "sk", nz: 1, d: [["HD", 1.2, "p"]] },
      { id: "HD", c: "circ", n: "Hậu đài", r: [22, 17, 4, 6.75], ctl: "sk", nz: 2, d: [["D1", 1.2, "p"]] },
      { id: "WCD", c: "E5", n: "Vệ sinh khu sự kiện", r: [22, 23.75, 4, 5.25], ctl: "sk", nz: 1, wc: KT, d: [["D1", 1.2, "p"], ["A2", 1.2, "p"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [26, 12, 12, 15], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "S", top: N, d: [["N", 1.8, "tn", 0.6], ["E", 1.6, "tn", 0.5], ["D2", 4, "o"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [26, 27, 12, 2], ctl: "sk", nz: 3, d: [["A2", 2.4, "p", 0.2], ["A2", 1.8, "p", 0.85]] },
      { id: "A2", c: "A2", n: "Trưng bày, sảnh sự kiện", r: [22, 29, 16, 6], ctl: "sk", nz: 2, occ: 30, top: N, d: [["EVC", 2, "o"], ["D4", 2, "p"]] },
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [22, 35, 7, 10.9], ctl: "nv", nz: 1, top: N, d: [["LH", 1.2, "nv"], ["A4", 1.2, "nv"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [22, 45.9, 7, 4.6], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["LH", 1.8, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin (cửa vào trong khe)", r: [22, 50.5, 7, 20], ctl: "sk", nz: 2, seat: 20, occ: 40, top: N, d: [["X", 2.4, "chinh", 0.5], ["A4", 1.8, "k"], ["EVC", 2.4, "o"]] },
      { id: "EVC", c: "circ", n: "Hành lang sự kiện", r: [29, 35, 2, 40], ctl: "sk", nz: 2 },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [31, 35, 7, 11.6], ctl: "sk", nz: 2, seat: 24, top: N, d: [["EVC", 1.4, "p", 0.5], ["E", 1.2, "tn", 0.5]] },
      { id: "WCA", c: "E5", n: "Vệ sinh sảnh", r: [31, 46.6, 7, 2], ctl: "sk", nz: 1, wc: KT, d: [["EVC", 1.2, "p"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [31, 48.6, 7, 2.15], ctl: "nv", nz: 1, top: N, d: [["EVC", 0.9, "nv"]] },
      { id: "KCF", c: "circ", n: "Chuẩn bị, rửa, kho cà phê", r: [31, 50.75, 7, 7.85], ctl: "sk", nz: 2, d: [["A3", 1.2, "p"]] },
      { id: "A3", c: "A3", n: "Cà phê sách (miệng khe phía sông)", r: [31, 58.6, 7, 20], ctl: "sk", nz: 3, seat: 32, top: N, d: [["EVC", 2.4, "o"], ["X", 1.6, "tn"]] },
      // cầu kính tầng 1 qua khe: lối đọc duy nhất nối hai cánh thư viện
      { id: "L1", c: "circ", n: "Cầu kính tầng 1 (lối đọc qua khe)", p: BRP, ctl: "tv", nz: 1, noclip: 1, d: [["SH", 2.4, "o"], ["W", 1.4, "tnbd"]] },
      // cánh Nam tầng 1: lõi sách, kho đệm ở dải sâu; dải Nam lấy sáng Nam
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 56, 10, 7.3], ctl: "kho", nz: 1, d: [["KDW", 1.0, "nv"]] },
      { id: "KDW", c: "circ", n: "Kho đệm, xe đẩy sách", r: [6, 63.3, 10, 2.7], ctl: "nv", nz: 1, d: [["SH", 1.2, "nv"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [6, 66, 10, 6], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 72, 3.33, 6], ctl: "nv", nz: 1, d: [["LC", 0.9, "nv"]] },
      { id: "KD", c: "circ", n: "Kho chung thư viện", r: [9.33, 72, 6.67, 6], ctl: "nv", nz: 1, d: [["LC", 1.2, "nv"]] },
      { id: "SH", c: "circ", n: "Sảnh thang thư viện (đầu cầu Nam)", r: [16, 60, 11, 11.8], ctl: "tv", nz: 1, d: [["CS", 1.4, "thang"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [16, 71.8, 6, 6.2], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LC", 1.4, "thang"]] },
      { id: "SC2", n: "Thang bộ thoát nạn (Đông)", r: [22, 71.8, 5, 6.2], ctl: "tv", nz: 1, core: { st: "u", link: "SC2" }, d: [["NVC", 1.2, "nv"]] },
      { id: "KD2", c: "circ", n: "Kho đệm Đông", r: [27, 70, 11, 8], ctl: "nv", nz: 1, d: [["NVC", 1.2, "nv"]] },
      { id: "LC", c: "circ", n: "Hành lang thư viện", r: [6, 78, 13.75, 2], ctl: "tv", nz: 1, d: [["W", 1.2, "tnbd"], ["NVC", 1.0, "nv"]] },
      { id: "NVC", c: "circ", n: "Hành lang nhân viên", r: [19.75, 78, 18.25, 2], ctl: "nv", nz: 1, d: [["E", 1.2, "tn"]] },
      { id: "B1s", c: "B1", n: "Đọc mở và kệ (Nam)", r: [6, 80, 13.75, 8], ctl: "tv", nz: 1, shelf: 0.35, d: [["LC", 1.6, "p"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [19.75, 80, 5.45, 8], ctl: "nv", nz: 1, d: [["NVC", 1.0, "nv"]] },
      { id: "E1", c: "E1", n: "Văn phòng", r: [25.2, 80, 9.6, 8], ctl: "nv", nz: 0, d: [["NVC", 1.0, "nv"]] },
      { id: "LN", c: "circ", n: "Sảnh nhân viên, tủ đồ", r: [34.8, 80, 3.2, 8], ctl: "nv", nz: 1, d: [["NVC", 1.2, "nv"], ["S", 1.2, "nv"]] }
    ],
    staff: [
      { x: 25.5, y: 56, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 25.5, y: 48.2, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 34.5, y: 49.7, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 34.5, y: 62, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 10, y: 27, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 25.5, y: 40, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 10.6, y: 39.1, t: "Nhận sách", sc: ["4"] },
      { x: 30, y: 84, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 30, y: 32, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 24, y: 20, t: "Điều phối, âm thanh", sc: ["2", "3"] },
      { x: 34.5, y: 40, t: "Hướng dẫn chuyên đề", sc: ["2"] }
    ]
  };
  /* ---------- Tầng 2: sàn đọc dưới mái răng cưa trên cánh Nam ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: [SW],
    rooms: [
      { id: "B4a", c: "B4", n: "Học nhóm 1", r: [6, 56, 8, 7], fr: [6.2, 60, 5.6, 2.9], ctl: "tv", nz: 2, top: N, d: [["HB4", 0.9, "p"]] },
      { id: "B4b", c: "B4", n: "Học nhóm 2", r: [6, 63, 8, 3], ctl: "tv", nz: 2, top: N, d: [["HB4", 0.9, "p"]] },
      { id: "B4c", c: "B4", n: "Học nhóm 3", r: [6, 66, 8, 3], ctl: "tv", nz: 2, top: N, d: [["HB4", 0.9, "p"]] },
      { id: "B4d", c: "B4", n: "Học nhóm 4", r: [6, 69, 8, 3], ctl: "tv", nz: 2, top: N, d: [["HB4", 0.9, "p"]] },
      { id: "HB4", c: "circ", n: "Hành lang học nhóm", r: [14, 60, 2, 14.5], ctl: "tv", nz: 2, d: [["H2", 1.2, "o"]] },
      { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [6, 72, 8, 2.5], ctl: "tv", nz: 1, wc: KT, d: [["HB4", 1.0, "p"], ["B1x", 1.0, "p"]] },
      { id: "B1x", c: "B1", n: "Bàn đọc cá nhân", r: [6, 74.5, 10, 3.5], ctl: "tv", nz: 1, top: N, d: [["CS", 1.2, "thang"], ["COR2", 1.6, "o", 0.5]] },
      { id: "H2", c: "B1", n: "Sảnh đọc, kệ sách mới", r: [16, 60, 11, 11.8], ctl: "tv", nz: 1, top: N, d: [["CS", 1.4, "thang"], ["SC2", 1.2, "thang"]] },
      { id: "CS", n: "Thang bộ + thang máy + tời sách", r: [16, 71.8, 6, 6.2], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["COR2", 1.2, "thang"]] },
      { id: "SC2", n: "Thang bộ thoát nạn (Đông)", r: [22, 71.8, 5, 6.2], ctl: "tv", nz: 1, core: { st: "u", link: "SC2" }, d: [["COR2", 1.2, "thang"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, bậc ngồi", r: [27, 70, 11, 8], ctl: "tv", nz: 1, steps: 4, top: N, d: [["COR2", 2.4, "o"]] },
      { id: "COR2", c: "circ", n: "Hành lang đọc", r: [6, 78, 32, 2], ctl: "tv", nz: 1 },
      { id: "B5", c: "B5", n: "Tra cứu số", r: [6, 80, 13.5, 8], ctl: "tv", nz: 1, seat: 16, top: N, d: [["COR2", 1.4, "p"]] },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [19.5, 80, 18.5, 8], ctl: "tv", nz: 0, seat: 40, top: N, d: [["COR2", 1.2, "p", 0.25], ["COR2", 1.2, "p", 0.75]] }
    ],
    staff: [{ x: 12.75, y: 84, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotK4", code: "K.4", name: "Khe Hải Vân, mái răng cưa đón sáng Bắc", from: "A",
    NWW, NWE, SW, BRP, yN, yS,
    levels: [t1, t2],
    grid: { x: [6, 16, 22, 29, 38], y: [14, 22, 30, 38, 46, 54, 62, 70, 78, 88] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 28, y: 9, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 84], [5.2, 84]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [40.4, 98], [40.4, 74.3], [26, 64.5]]],
        event: [[[20, -9], [40.4, 6], [40.4, 74.3], [26, 64.5]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào khe tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, bờ sông, vào khe tới sảnh đón tiếp" },
      hatch: [SLOT],
      labels: [[10, 56.5, "Khe Hải Vân 6 m"], [10, 27, "Thiếu nhi"], [18.6, 30, "Sảnh đọc"], [32, 20, "Sự kiện"], [19, 61.5, "Cầu kính"], [22, 83, "Cánh Nam 2 tầng"]]
    }
  };
  plan.intro = `<p class="lede">Giữ khe chéo Hải Vân của A (rộng 6 m, mở ra lối Tây và ra sông, đón gió Đông Nam), mái cỏ, và mọi mái là răng cưa kính quay hướng Bắc. Bản sửa ngày 05/11 gom thư viện thành một cụm liền: sảnh đón tiếp trong khe → quầy mượn trả có cổng từ → sảnh đọc dọc. Ngay cạnh quầy là phòng xử lý nghiệp vụ; tiếp nhận, kho đóng nằm sát sảnh đọc. Một cầu kính tầng 1 vắt qua khe đưa người đọc sang lõi thang có thang máy và tời sách ở đầu cầu phía Nam, lên sàn đọc tầng 2. Cánh Bắc 1 tầng nên cả cánh lấy sáng mái, không che ai; cánh Nam tầng 1 chỉ đặt phòng có người dọc mặt Nam.</p>`;
  plan.notes = [
    "Sửa ngày 05/11: (1) tiếp nhận C4, kho đóng C1 chuyển từ cánh Nam sang cánh Bắc, nằm sát sảnh đọc dọc; xử lý nghiệp vụ C2 chuyển vào ngay sau quầy mượn trả, có cửa nhân viên thẳng sang quầy (5 m, trước là 52 m). (2) Lõi thang + thang máy + tời sách dời về đầu cầu phía Nam, cầu kính tầng 2 đổi thành cầu kính tầng 1 làm lối đọc; kho đóng tới kệ xa nhất còn 36 m (trước 73 m). (3) Vệ sinh: thiếu nhi có vệ sinh, chỗ thay tã ngay cạnh (11 m); phòng đa năng có vệ sinh sát vách (8 m); sảnh có vệ sinh riêng; tầng 2 có vệ sinh cạnh học nhóm và bàn đọc cá nhân. (4) Chống ồn: thiếu nhi cách sảnh đọc bằng sảnh đệm xe đẩy; học nhóm có hành lang riêng ở góc Tây Bắc tầng 2, cách đọc yên tĩnh hơn 8 m; đọc yên tĩnh và văn phòng không chồng lên phòng ồn.",
    "Đón tiếp là bản lề: sảnh đón tiếp là phòng duy nhất có cửa vào từ ngoài, mở ra khe ở đoạn giữa. Rẽ phải theo hành lang sự kiện tới trưng bày (kiêm sảnh sự kiện), phòng đa năng, chuyên đề, cà phê. Đi thẳng qua quầy gửi đồ, mượn trả có cổng từ mới vào sảnh đọc của thư viện; mọi thang lên khu đọc đều nằm sau quầy này. Các cửa khác ra ngoài đều là cửa thoát nạn.",
    "Đường sách: lối Tây → cửa cuốn → tiếp nhận (cánh Bắc) → kho đóng ngay bên cạnh hoặc → sảnh đọc → xử lý nghiệp vụ (12 m). Sách lên kệ tầng 2: kho đóng → cầu kính → tời sách ở đầu cầu Nam. Sách trả: quầy mượn trả → cửa nhân viên → xử lý nghiệp vụ, không qua khu công cộng. Đoạn dùng chung với người đọc là sảnh đọc dọc (sau cổng từ), xe sách đi sát vách.",
    "Ánh sáng: cánh Bắc 1 tầng, mọi phòng nằm dưới răng cưa kính hướng Bắc nên phòng sâu vẫn sáng đều, không có nắng chiếu thẳng. Cánh Nam tầng 2 cũng dưới răng cưa. Cánh Nam tầng 1: đọc mở, phòng nhân viên, văn phòng dọc mặt Nam sâu 8 m; dải sâu sát khe chỉ có lõi thang, kho đệm, kỹ thuật, lưu trữ (không cần cửa sổ). Mép khe và đầu hồi Đông, Tây là tường đặc.",
    "Bảo mật sách: cửa sảnh → quầy mượn trả khóa ngoài giờ; quầy có cổng từ, thủ thư trực. Khu sự kiện không có cửa, không có thang nào sang thư viện. Hai thang của thư viện (lõi tời sách đầu cầu, thang thoát nạn Đông) chỉ mở vào khu đã qua cổng hoặc qua cửa nhân viên; cửa ra ngoài của cầu kính, hành lang thư viện, thiếu nhi, góc đọc Bắc là cửa có chuông báo.",
    "Ngoài giờ: mở sảnh đón tiếp, hành lang sự kiện, trưng bày, phòng đa năng, bục, chuyên đề, cà phê, hai cụm vệ sinh sự kiện. Chỉ khóa cửa sảnh → quầy mượn trả, không nằm trên đường thoát của khu sự kiện: phòng đa năng thoát ra quảng trường Bắc và phía sông, chuyên đề và cà phê có cửa thoát riêng.",
    "Yên tĩnh: đọc yên tĩnh ở dải Nam tầng 2, xa học nhóm (góc Tây Bắc tầng 2, hành lang riêng) và xa khu sự kiện (cách khe và cả cánh nhà). Bên dưới đọc yên tĩnh là văn phòng, phòng nhân viên, không phải phòng ồn. Văn phòng tách phòng kỹ thuật bằng kho đệm và hành lang.",
    "Kết cấu: lưới cột 8 m dọc khe; cánh Bắc 1 tầng, răng cưa là vì kèo thép nhẹ mỗi 4 m; phòng đa năng 12 × 15 m dùng dầm thép nhịp 15 m. Cánh Nam khung bê tông hai tầng; kho đóng nặng đặt ở tầng 1. Cầu kính tầng 1 là khung thép nhẹ, nhịp 6 m. Không có phần đua.",
    "Bãi xe, xe giao sách giữ như A. Người đọc và khách sự kiện đi dọc bờ sông vào khe (hoặc từ lối Tây); xe giao sách theo lối Tây tới cửa cuốn tiếp nhận ở cánh Bắc; nhân viên vào sảnh nhân viên ở mặt Nam, sát bãi xe."
  ];
  /* ---------- khối 3D sinh từ chính vỏ mặt bằng ---------- */
  const { B, PO, col } = G.K;
  // cắt đa giác lồi theo dải ngang y0..y1
  const clipY = (P, y0, y1) => {
    const cut = (pts, keep, yy) => { const o = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], ka = keep(a[1]), kb = keep(b[1]); if (ka) o.push(a); if (ka !== kb) { const t = (yy - a[1]) / (b[1] - a[1]); o.push([a[0] + (b[0] - a[0]) * t, yy]); } } return o; };
    return cut(cut(P, y => y >= y0, y0), y => y <= y1, y1);
  };
  // răng cưa: mỗi răng sâu 4 m, mặt kính đứng ở mép Bắc, lưng phủ cỏ dốc xuống phía Nam
  const teeth = (P, base, rise, y0, y1, zone, role) => {
    const o = [];
    for (let y = y0; y < y1 - 0.5; y += 4) {
      const q = clipY(P, y, Math.min(y + 4, y1));
      if (q.length < 3) continue;
      const yy = y;
      o.push(PO(q, base, (x, yv) => base + rise * (1 - (yv - yy) / 4), "sheet", zone, { top: "grass", role }));
      const xs = q.filter(p => Math.abs(p[1] - yy) < 1e-6).map(p => p[0]);
      if (xs.length >= 2) o.push(B(Math.min(...xs) + 0.3, yy - 0.08, Math.max(...xs) - Math.min(...xs) - 0.6, 0.16, base, base + rise - 0.1, "glass", "X", { op: 0.75 }));
    }
    return o;
  };
  const coreBox = (id, c, top) => { const z = t1.rooms.find(q => q.id === id), [x, y, w, h] = z.r; return B(x, y, w, h, 0.45, top, c, "X", { top: c, lv: 0 }); };
  plan.idea = {
    id: "chotK4", fam: "chot", code: "K.4", from: "A", name: "Khe Hải Vân, mái răng cưa đón sáng Bắc", rule: "Khe chéo giữ nguyên, mái răng cưa lặp",
    tag: "Giữ khe chéo 6 m của A; cánh Bắc 1 tầng, cánh Nam 2 tầng, mái răng cưa kính hướng Bắc; thư viện gom quanh quầy, kho sát sảnh đọc, cầu kính tầng 1 qua khe",
    story: "Giữ nguyên hình ảnh đèo Hải Vân của A: hai sườn đồi cỏ tách nhau bởi một khe chéo hẹp đón gió Đông Nam, một cầu kính thấp vắt qua khe làm lối đọc. Thay mái dốc trơn bằng những răng cưa cỏ, mỗi răng có dải kính đứng quay về hướng Bắc. Nhìn từ phía Nam là sườn đồi xanh; nhìn từ phía Bắc là những dải kính sáng. Bên trong, ánh sáng Bắc rơi đều xuống bàn đọc, không có nắng Đông, Tây.",
    why: [["Quy luật hình khối", "Lặp: một mặt đất cắt chéo thành hai khối, mái là dãy răng cưa đều nhau mỗi 4 m. Cánh Bắc thấp một tầng, cánh Nam cao hai tầng, tháp thang đầu cầu là điểm nhấn tím."], ["Khối chính – khối phụ", "Thư viện (cánh Nam hai tầng, nửa Tây cánh Bắc) chiếm phần lớn sàn và cao nhất (răng cưa tới +11,05); khu sự kiện một tầng ở nửa Đông cánh Bắc."], ["Nắng và chói", "Kính mái quay Bắc, không nhận nắng trực tiếp quanh năm ở Đà Nẵng; mép khe, đầu hồi Đông, Tây đặc. Màn hình tra cứu số đặt dưới răng cưa, không chói."], ["Gió và mưa", "Khe mở hai đầu, gió Đông Nam từ sông thổi xuyên qua; cửa sổ trên vách kính răng cưa mở lật để thoát khí nóng lên trên. Máng xối ở chân mỗi răng."]],
    kc: { he: "Khung bê tông lưới 8 m; cánh Bắc 1 tầng, cánh Nam 2 tầng. Răng cưa: vì kèo thép nhẹ mỗi 4 m, kính đứng hướng Bắc, lưng là tấm mái phủ cỏ. Phòng đa năng 12 × 15 m dùng dầm thép nhịp 15 m. Cầu kính tầng 1 khung thép nhẹ nhịp 6 m.", nhip: "15 m (phòng đa năng), 8 m (lưới)", cx: "Không" },
    qa: [["Cánh Bắc sâu tới 57 m, giữa nhà có tối không?", "Không, vì cánh Bắc chỉ một tầng và toàn bộ mái là răng cưa kính hướng Bắc; mọi chỗ ngồi cách dải kính mái không quá 4 m."], ["Khách sự kiện có đi lọt vào thư viện?", "Không. Sảnh đón tiếp dẫn sang hành lang sự kiện; muốn vào thư viện phải qua quầy mượn trả có cổng từ, cửa này khóa ngoài giờ."], ["Thủ thư thay sách có phải đi xa?", "Không. Tiếp nhận và kho đóng nằm sát sảnh đọc ở cánh Bắc; xử lý nghiệp vụ ở ngay sau quầy; từ kho tới kệ xa nhất trên tầng 2 khoảng 36 m, đi qua cầu kính và tời sách."]],
    cut: "Tỉ lệ 1:200. Hai khối foam trắng cắt chéo theo khe 3 cm: cánh Bắc cao 2,25 cm, cánh Nam cao 4,5 cm. Răng cưa: thanh foam tam giác cao 0,7 cm, sâu 2 cm, lưng dán giấy cỏ, mặt Bắc dán mica. Lõi thang đầu cầu Nam foam tím; cầu kính tầng 1 mica.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[22, 80, 11.4, "Khối chính · Cánh Nam: sàn đọc dưới răng cưa", 1], [12, 30, 6.6, "Khối chính · Thư viện (sau quầy)", 1], [31, 25, 6.6, "Khối phụ · Sự kiện 1 tầng", 2], [13, 54.5, 0.6, "Khe Hải Vân 6 m", 2], [19, 61.5, 4.6, "Cầu kính tầng 1 (lối đọc)", 2], [26, 64, 0.6, "Cửa vào: sảnh đón tiếp", 2]],
    build() {
      const v = [
        coreBox("CS", "violet", 12.45), coreBox("SC2", "warn", 12.45),
        PO(SW, 4.95, 9.45, "sheet", "B", { fl: 1, role: "m" }),
        PO(BRP, 0.45, 4.45, "glass", "L", { fl: 1, role: "p" }),
        PO(SW, 0.45, 4.95, "sheet", "C", { fl: 1, role: "m" }),
        PO(NWW, 0.45, 4.95, "sheet", "B", { fl: 1, role: "m" }),
        PO(NWE, 0.45, 4.95, "sheet", "D", { fl: 1, role: "p" }),
        ...teeth(SW, 9.45, 1.6, yS(6), 88, "X", "m"),
        ...teeth(NWW, 4.95, 1.4, 14, yN(22), "X", "m"),
        ...teeth(NWE, 4.95, 1.4, 12, yN(38), "X", "p")
      ];
      const st = [];
      for (const x of [6, 14, 22, 30, 38]) for (let y = 14; y <= 88; y += 8) {
        if (y <= yN(x) - 0.5) st.push(col(x, y, 0.45, 4.95));
        else if (y >= yS(x) + 0.5) st.push(col(x, y, 0.45, 9.45));
      }
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
