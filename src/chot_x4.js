/* ================= Ý tưởng X.4: Sân trong giữa, hành lang vòng (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  // Giữ các khối, số tầng và vết nhà của bản xếp; khoảng trống giữa tầng 1 thành sân trong có hành lang thư viện bao quanh.
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const N = "N";
  const Q = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const env = L => L.rooms.map(z => Q(...z.r));
  const COURT = Q(19.5, 57.5, 22, 12.24), COURT2 = Q(16.5, 50.75, 8, 18.99), YARD = Q(10, 27.25, 16, 11.75);
  

  /* ---------- Tầng 1 ---------- */
  const Y0 = 39, YC2 = 47.5, YCS = 54.17, YC1 = 57.92, YE6 = 72.92, YS = 77.92, YB3 = YS - 8.18;
  const t1 = {
    k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450",
    rooms: [
      // khối sự kiện phía Bắc (giữ vị trí của bản xếp, lùi về x ≥ 6)
      { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6, 16, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"]] },
      { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 21, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
      { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.5], ["S", 1.8, "tn", 0.4], ["CO3", 1.8, "p", 0.5]] },
      { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 9.5, 8], ctl: "sk", nz: 2, seat: 24, top: N, d: [["CO3", 1.2, "p", 0.5]] },
      { id: "KSK", c: "circ", n: "Kho phụ sự kiện (sân khấu, loa di động)", r: [35.5, 16, 5, 8], ctl: "sk", nz: 1, d: [["CO3", 1.4, "p"]] },
      { id: "CO3", c: "circ", n: "Hành lang sự kiện", r: [26, 24, 14.5, 4], ctl: "sk", nz: 2, d: [["E", 1.8, "tn"], ["FOYA", 2.4, "o"]] },
      { id: "WCA", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [27, 28, 3, 7.33], ctl: "sk", nz: 1, wc: KT, d: [["FOYA", 1.0, "p"]] },
      { id: "FOYA", c: "circ", n: "Sảnh sự kiện", r: [30, 28, 2.5, 11], ctl: "sk", nz: 2, d: [["SH", 2.4, "o"]] },
      { id: "A3", c: "A3", n: "Cà phê sách", r: [32.5, 28, 8.5, 8.25], ctl: "sk", nz: 3, seat: 32, top: N, d: [["FOYA", 1.8, "o"], ["E", 1.2, "tn"]] },
      { id: "A2", c: "A2", n: "Trưng bày", r: [32.5, 36.25, 8.5, 10.75], ctl: "sk", nz: 2, occ: 30, top: N, d: [["SH", 2.4, "o"], ["E", 1.2, "tn"]] },
      // bản lề: sảnh đón tiếp A1 nối sảnh sự kiện (ngoài giờ) và quầy A4 (vào thư viện)
      { id: "SH", c: "circ", n: "Sảnh chia luồng", r: [27, Y0, 5.5, 8], ctl: "sk", nz: 2, d: [["A1", 3.0, "o"]] },
      { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [16.5, Y0, 10.5, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.5], ["A4", 2.0, "k"]] },
      { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [16.5, 47, 8, 3.75], ctl: "tv", ctrl: 1, nz: 2, d: [["LW", 1.8, "o"], ["LN", 1.8, "o"]] },
      { id: "STN", n: "Thang bộ Bắc (sau quầy)", r: [14, Y0, 2.5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["N", 1.2, "tnbd"], ["LW", 1.2, "thang"]] },
      // hành lang thư viện quanh sân trong
      { id: "LW", c: "circ", n: "Hành lang thư viện Tây (nhìn sân)", r: [14, 45, 2.5, YS - 45], ctl: "tv", nz: 1 },
      { id: "LN", c: "circ", n: "Hành lang thư viện Bắc (nhìn sân)", r: [24.5, 47, 16, 2.5], ctl: "tv", nz: 1, d: [["B1t", 1.8, "o", 0.9], ["WCL1", 1.0, "p"]] },
      { id: "B1t", c: "B1", n: "Đọc mở, sách mới (nhìn sân)", r: [24.5, 49.5, 13, 8], ctl: "tv", nz: 1, top: N, d: [["S", 1.2, "tnbd", 0.5]] },
      { id: "WCL1", c: "E5", n: "Vệ sinh khu đọc tầng 1", r: [37.5, 49.5, 3, 4], ctl: "tv", nz: 1, wc: KT },
      { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [16.5, YB3, 3, 4.5], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 1.0, "p"], ["LW", 1.0, "p"]] },
      { id: "LB", c: "circ", n: "Sảnh vào phòng thiếu nhi", r: [16.5, YB3 + 4.5, 3, YS - YB3 - 4.5], ctl: "tv", nz: 2, d: [["LW", 1.8, "o"], ["B3", 1.8, "p"]] },
      { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (mở ra vườn trong sân)", r: [19.5, YB3, 22, 8.18], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.5]] },
      // dải nghiệp vụ phía Tây: tiếp nhận → xử lý → kho đóng, lõi sách sát kho
      { id: "C2", c: "C2", n: "Xử lý nghiệp vụ (nhìn sân đón)", r: [6, Y0, 8, YC2 - Y0], ctl: "nv", nz: 1, d: [["LW", 1.0, "nv"], ["SCn", 1.0, "nv", 0.9], ["C4", 1.2, "nv"]] },
      { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, YC2, 4.5, YCS - YC2], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.35], ["W", 1.0, "nv", 0.85]] },
      { id: "SCn", c: "circ", n: "Hành lang nghiệp vụ", r: [10.5, YC2, 3.5, YCS - YC2], ctl: "nv", nz: 1, d: [["CS", 1.0, "nv", 0.9]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6, YCS, 8, YC1 - YCS], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["LW", 1.4, "thang"], ["C1", 1.0, "nv", 0.36]] },
      { id: "C1", c: "C1", n: "Kho đóng", r: [6, YC1, 8, YE6 - YC1], ctl: "kho", nz: 1, d: [["W", 1.0, "nv", 0.8]] },
      { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương (sát kho đóng)", r: [6, YE6, 8, YS - YE6], ctl: "kho", nz: 1, d: [["C1", 1.0, "nv"], ["LW", 1.0, "nv"]] },
      // dải nhân viên phía Nam (lấy sáng mặt Nam); dưới phòng thiếu nhi chỉ đặt thang, kỹ thuật, kho
      { id: "E1", c: "E1", n: "Văn phòng", r: [6, YS, 9.5, 8.5], ctl: "nv", nz: 0, d: [["S", 1.0, "nv"], ["E2", 0.9, "nv"]] },
      { id: "E2", c: "E2", n: "Phòng nhân viên", r: [15.5, YS, 4.75, 8.42], ctl: "nv", nz: 1, d: [["S", 0.9, "nv"]] },
      { id: "ST3", n: "Thang thoát hiểm Nam", r: [20.25, YS, 4.25, 5], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["STL", 1.2, "thang"]] },
      { id: "STL", c: "circ", n: "Sảnh thoát nạn thang Nam", r: [20.25, YS + 5, 4.25, 3.5], ctl: "tv", nz: 1, d: [["S", 1.2, "tnbd"]] },
      { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [24.5, YS, 6.5, 8.5], ctl: "kt", nz: 3, d: [["S", 1.4, "nv"]] },
      { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [31, YS, 4, 5], ctl: "nv", nz: 1, d: [["E3", 0.9, "nv"]] },
      { id: "E3", c: "E3", n: "Trực bảo vệ", r: [31, YS + 5, 4, 3.75], ctl: "nv", nz: 1, d: [["S", 1.0, "nv"]] }
    ],
    staff: [
      { x: 21.7, y: 42.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 20.5, y: 49, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 33, y: YS + 6.8, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 36.5, y: 32, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: YB3 + 4, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 43, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 8, y: 51, t: "Nhận sách", sc: ["4"] },
      { x: 10.7, y: YS + 4.2, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 31.2, y: 33.5, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 8, y: 24, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ]
  };
  /* ---------- Tầng 2: thư viện (giữ các khối tầng 2 của bản xếp) ---------- */
  const t2 = {
    k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950",
    rooms: [
      { id: "STN", n: "Thang bộ Bắc (sau quầy)", r: [14, Y0, 2.5, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["H2", 1.2, "thang"]] },
      { id: "WCL2n", c: "E5", n: "Vệ sinh khu đọc Bắc", r: [16.5, Y0, 4, 3], ctl: "tv", nz: 1, wc: KT, d: [["H2", 1.0, "p"]] },
      { id: "H2", c: "circ", n: "Sảnh thang Bắc", r: [16.5, 42, 4, 5.5], ctl: "tv", nz: 1, d: [["CR2", 2.0, "o"], ["B1e", 2.0, "o"]] },
      { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh đón tiếp)", r: [20.5, Y0, 12, 8.5], ctl: "tv", nz: 1, top: N },
      { id: "B2", c: "B2", n: "Đọc yên tĩnh (đầu Tây Bắc)", r: [4, Y0, 10, YCS - Y0], ctl: "tv", nz: 0, seat: 40, top: N, d: [["CR2", 1.2, "p"]] },
      { id: "CR2", c: "circ", n: "Hành lang đọc Tây", r: [14, 45, 2.5, YS - 45], ctl: "tv", nz: 1, d: [["CB", 2.0, "o"], ["B1m", 2.0, "o"], ["WCL2s", 1.0, "p"]] },
      { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6, YCS, 8, YC1 - YCS], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["CR2", 1.4, "thang"]] },
      { id: "B1x", c: "B1", n: "Đọc mở và kệ (dải Tây)", r: [4, YC1, 10, 15], ctl: "tv", nz: 1, top: N, d: [["CR2", 1.6, "o"]] },
      { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [4, YE6, 10, 5], ctl: "tv", nz: 1, steps: 4, top: N, d: [["CR2", 1.6, "o"]] },
      // trên phòng thiếu nhi chỉ đặt học nhóm (ồn chồng lên ồn), vệ sinh, hành lang
      { id: "WCL2s", c: "E5", n: "Vệ sinh khu đọc Nam (trên vệ sinh thiếu nhi)", r: [16.5, YB3, 3, 4.5], ctl: "tv", nz: 1, wc: KT },
      { id: "KD", c: "circ", n: "Kho đệm", r: [16.5, YB3 + 4.5, 3, 1.5], ctl: "tv", nz: 1, d: [["CB", 0.8, "p"]] },
      ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [19.5 + 4.5 * i, YB3, 4.5, 6], ctl: "tv", nz: 2, top: N, d: [["CB", 0.9, "p"]] })),
      { id: "CB", c: "circ", n: "Hành lang học nhóm", r: [16.5, YB3 + 6, 21, YS - YB3 - 6], ctl: "tv", nz: 2, d: [["B5", 1.6, "o"]] },
      { id: "B1m", c: "B1", n: "Đọc mở và kệ (dải Nam)", r: [4, YS, 16.25, 8.5], ctl: "tv", nz: 1, top: N, d: [["H5", 1.6, "o"]] },
      { id: "ST3", n: "Thang thoát hiểm Nam", r: [20.25, YS, 4.25, 5], ctl: "tv", nz: 1, core: { st: "u", link: "ST3" }, d: [["H5", 1.2, "thang"]] },
      { id: "H5", c: "circ", n: "Sảnh thang Nam", r: [20.25, YS + 5, 4.25, 3.5], ctl: "tv", nz: 1, d: [["B5", 1.6, "o"]] },
      { id: "B5", c: "B5", n: "Tra cứu số (góc Đông Nam)", r: [24.5, YS, 11.5, 8.5], ctl: "tv", nz: 1, seat: 16, top: N }
    ],
    staff: [{ x: 30, y: YS + 4, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }]
  };
  t1.env = env(t1); t2.env = env(t2);
  const bikes = [];
  for (const y of [89, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX4", code: "X.4", name: "Sân trong giữa, hành lang vòng", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 14, 16.5, 19.5, 24.5, 32.5, 41.5], y: [16, 27.25, 39, 47, 57.5, 69.74, 77.92, 86.42] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 38, y: 92, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89, 3.5, 5.5, 1], [9.5, 89, 3.5, 5.5, 1], [13, 89, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 51.5], [5.2, 51.5]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[20, -9], [4, 8], [4, 33], [21.75, 33], [21.75, 38.6]]],
        event: [[[24, -9], [5, 9], [5, 34], [20, 34], [20, 38.6]]]
      },
      routeNames: { lib: "Người đọc: quảng trường Bắc, dọc lối Tây vào sân đón, cửa chính ở sảnh đón tiếp", event: "Khách sự kiện: cùng cửa chính, qua sảnh đón tiếp rồi rẽ sang sảnh sự kiện" },
      hatch: [COURT, COURT2, YARD],
      labels: [[18, 33, "Sân đón (cửa chính)"], [30, 61, "Sân trong"], [30, 67, "Vườn thiếu nhi (tường thấp)"], [18, 21, "Khối sự kiện một tầng"], [12, 66, "Thư viện hai tầng"]]
    }
  };
  plan.intro = `<p class="lede">X.4 dựng thẳng từ bản xếp khối của bạn: giữ khối sự kiện một tầng phía Bắc, dải đón tiếp, cà phê, trưng bày ở giữa, cột nghiệp vụ phía Tây, phòng thiếu nhi và dải nhân viên phía Nam, các khối đọc tầng 2 ở nửa Tây và Nam. Khoảng trống lớn giữa tầng 1 trong bản xếp trở thành <b>sân trong</b> khoảng 22 × 12 m. Hành lang thư viện chạy quanh sân (phía Tây, phía Bắc); quầy A4, phòng đọc sách mới, phòng thiếu nhi quay mặt kính ra sân. Sảnh đón tiếp A1 là bản lề: rẽ phải sang sảnh sự kiện, cà phê, trưng bày (mở ngoài giờ); đi thẳng qua quầy gửi đồ, mượn trả A4 có cổng từ mới vào được vòng thư viện, kể cả phòng thiếu nhi.</p>`;
  plan.notes = [
    "Đã sửa so với bản xếp: (1) các khối tầng 1 lấn lối Tây (C1, C2, C4, D2, D3, E6, lõi sách, thang Tây Nam) lùi về x ≥ 6 để giữ lối xe cứu hỏa, xe giao sách 6 m; tầng 2 vẫn được nhô ra tới x = 4. (2) Trên phòng thiếu nhi, bản xếp đặt phòng đọc B1 nên phòng đọc nằm ngay trên nguồn ồn: đổi thành bốn phòng học nhóm, vệ sinh, hành lang (ồn chồng lên ồn); phòng đọc chuyển sang dải Tây tầng 2 (chỗ bản xếp đặt học nhóm) và dải Nam. (3) Đọc yên tĩnh B2 ở góc Tây Bắc tầng 2, cách học nhóm hơn 14 m, nằm trên kho, nghiệp vụ. (4) Kỹ thuật E4 tách khỏi phòng nhân viên E2 bằng thang thoát hiểm Nam và sảnh thoát nạn của nó. (5) Vệ sinh 73 m² (bản xếp 62,5 m², −11%), đọc yên tĩnh 152 m² (bản xếp 144 m², −10%). (6) Thêm hành lang thư viện quanh sân, thang Bắc sau quầy.",
    "Đổi chỗ, dời khối: xử lý nghiệp vụ C2 lên đầu cột Tây (lấy sáng Bắc qua sân đón, gần quầy A4); lõi sách xuống giữa cột, sát kho đóng; lưu trữ tài liệu địa phương C3 về cuối cột, liền kho đóng; phòng thiếu nhi dời sang Đông 3 m và xuống Nam 2 m để văn phòng, phòng nhân viên không chung vách với nó; thang máy thứ hai giữa nhà và thang Tây Nam của bản xếp bỏ (lõi sách có thang máy, ba thang còn lại đủ thoát nạn dưới 30 m); tra cứu số B5 chuyển về góc Đông Nam tầng 2; phần tầng 2 phía Đông trên phòng thiếu nhi thu lại 4 m.",
    "Đi qua khối A: một cửa chính ở mặt Bắc sảnh đón tiếp, nhìn ra sân đón. Từ sảnh rẽ phải qua sảnh chia luồng tới sảnh sự kiện, vệ sinh công cộng, cà phê, trưng bày, hành lang sự kiện (phòng đa năng, chuyên đề); đi thẳng qua cửa khóa ngoài giờ vào quầy gửi đồ, mượn trả có cổng từ. Sau quầy là vòng thư viện: hành lang Tây dẫn tới thang Bắc, lõi sách, phòng thiếu nhi; hành lang Bắc dẫn tới phòng đọc sách mới. Không phòng đọc nào, kể cả thiếu nhi, có lối vào riêng.",
    "Thang có hệ quả: thang Bắc và lõi sách (có thang máy, tời sách) mở vào hành lang thư viện sau quầy; thang thoát hiểm Nam ở tầng 1 xuống một sảnh thoát nạn nhỏ, ra thẳng mặt Nam qua cửa thoát hiểm có chuông báo, không đi qua phòng nào. Khối sự kiện một tầng nên không có thang nào khác lên khu đọc.",
    "Đường sách: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách) → hành lang nghiệp vụ → lõi sách → kho đóng C1 (liền lõi), lưu trữ C3 liền kho đóng. Tời sách đưa sách lên hành lang đọc tầng 2 giữa nhà. Sách trả: quầy A4 → hành lang Tây → cửa nhân viên vào xử lý C2, vài bước.",
    "Vệ sinh: cụm công cộng (mở ngoài giờ) ngay sảnh sự kiện, cách sảnh đón tiếp khoảng 15 m; tầng 1 thư viện có vệ sinh cạnh phòng đọc sách mới và vệ sinh thiếu nhi, thay tã mở thẳng vào phòng thiếu nhi; tầng 2 có hai cụm (cạnh thang Bắc; ngay trên vệ sinh thiếu nhi) nên chỗ đọc xa nhất không phải đi quá 35 m.",
    "Ánh sáng Bắc – Nam: khối sự kiện, cà phê, trưng bày, phòng đọc sách mới là khối một tầng, lấy sáng cửa mái hướng Bắc; sảnh đón tiếp, xử lý nghiệp vụ nhìn ra sân đón phía Bắc; quầy A4, phòng thiếu nhi nhìn ra sân trong; văn phòng, phòng nhân viên, bảo vệ quay ra mặt Nam. Tầng 2 là tầng trên cùng, mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây là tường đặc.",
    "Không che sáng nhau: sân trong sâu khoảng 12 m, phía Bắc sân chỉ có khối một tầng nên cửa sổ phòng thiếu nhi nhìn qua sân không bị che; sân đón phía Bắc rộng gần 12 m, khối sự kiện chỉ cao +4,95.",
    "Tiếng ồn: phòng đa năng, cà phê, chuyên đề ở khối sự kiện, cách khu đọc cả sân đón; phòng thiếu nhi ở đáy sân, học nhóm nằm ngay trên, hành lang ngăn với phòng đọc, tra cứu số; đọc yên tĩnh ở góc Tây Bắc tầng 2; văn phòng, phòng nhân viên không chung vách với phòng ồn hay kỹ thuật, không nằm dưới phòng ồn.",
    "Ngoài giờ: khóa một cửa giữa sảnh đón tiếp và quầy A4; sảnh, sảnh sự kiện, cà phê, trưng bày, phòng đa năng, chuyên đề, vệ sinh công cộng vẫn mở và thoát ra sân đón hoặc mặt sông, không đi xuyên khu thư viện.",
    "Kết cấu: khung bê tông lưới khoảng 8 m; phòng đa năng 16 × 11,25 m dùng dầm bê tông ứng lực trước; tầng 2 nhô ra tối đa khoảng 2 m (lối Tây, góc Đông Nam) nên không cần cột chống thêm; kho đóng ở tầng 1 sát lõi sách, tải nặng xuống thẳng móng."
  ];
  /* ---------- khối 3D: sinh từ chính các phòng ---------- */
  const { B, col } = G.K;
  const PUB = /^(D\d|A[123]|WCP|SCO|CO3|FOYA|SH)$/;
  plan.idea = {
    id: "chotX4", fam: "chot", code: "X.4", from: "bản xếp của bạn", name: "Sân trong giữa, hành lang vòng", rule: "Giữ khối của bản xếp, khoảng trống giữa thành sân trong",
    tag: "Từ bản xếp khối của bạn: khối sự kiện một tầng phía Bắc, thư viện hai tầng ôm sân trong ở giữa, A1 + A4 là bản lề",
    story: "Bản xếp có một khoảng trống lớn giữa tầng 1. X.4 biến khoảng trống đó thành sân trong của thư viện: hành lang đọc chạy quanh sân, phòng thiếu nhi có vườn nhỏ trong sân, phòng đọc sách mới quay kính ra sân. Phía Bắc là khối sự kiện một tầng sống cả buổi tối.",
    why: [["Quy luật hình khối", "Giữ nguyên các hộp chữ nhật của bản xếp: khối sự kiện thấp phía Bắc, thư viện hai tầng ôm sân ở giữa và phía Nam."], ["Khối chính – khối phụ", "Thư viện hai tầng chiếm khoảng ba phần tư sàn; khối sự kiện, cà phê, trưng bày một tầng."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, mặt Nam, mặt sân và cửa mái hướng Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân trong và sân đón thông gió cho hai dải nhà; hành lang quanh sân có mái che."], ["Công năng", "Sảnh đón tiếp là bản lề; vòng thư viện sau quầy A4; kho, nghiệp vụ, lõi sách liền nhau ở cột Tây."]],
    kc: { he: "Khung bê tông lưới khoảng 8 m; khối sự kiện mái bê tông phẳng có cửa mái; tầng 2 mái răng cưa thép nhẹ; phòng đa năng dầm ứng lực trước nhịp 11,25 m.", nhip: "11,25 m (phòng đa năng), 8 m (lưới)", cx: "Không (đua tối đa khoảng 2 m)" },
    qa: [["Sân trong có làm khu đọc bị lộ không?", "Không: sân chỉ mở từ trong thư viện, bốn phía là hành lang, phòng đọc, thiếu nhi; vườn thiếu nhi có tường thấp riêng."], ["Phòng thiếu nhi có lối riêng không?", "Không: chỉ vào từ hành lang thư viện sau quầy A4; cửa ra vườn là cửa có chuông báo."]],
    cut: "Khối sự kiện foam xám một tầng có dải cửa mái; thư viện trắng hai tầng ôm sân trong, mái răng cưa giấy cỏ; lõi sách tím, thang cam nhô khỏi mái; sân trong để trống, vườn thiếu nhi có tường thấp.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[10, 56, 12.6, "Lõi sách", 1], [30, 82, 11.4, "Khối chính · Thư viện hai tầng", 1], [18, 22, 6.2, "Khối phụ · Sự kiện một tầng", 2], [30, 63, 1.5, "Sân trong", 2]],
    build() {
      const v = [];
      const coreTop = 9.45 + 1.6;
      for (const L of [t1, t2]) for (const z of L.rooms) {
        const [x, y, w, h] = z.r;
        if (z.core) { if (L === t1) v.push(B(x, y, w, h, 0.45, coreTop, /l/.test(z.core.st) ? "violet" : "warn", "X", { top: /l/.test(z.core.st) ? "violet" : "warn", lv: 0, fl: 2 })); continue; }
        const z0 = L === t1 ? 0.45 : 4.95, z1 = L === t1 ? 4.95 : 9.45, pub = L === t1 && PUB.test(z.id);
        v.push(B(x, y, w, h, z0, z1, pub ? "stone" : "sheet", pub ? "D" : "B", { fl: 1, role: pub ? "p" : "m", top: pub ? "grass" : undefined }));
      }
      // tường thấp vườn thiếu nhi trong sân
      v.push(B(22, 64, 19.5, 0.3, 0, 1.2, "stone", "X", { role: "p" }), B(22, 64, 0.3, YB3 - 64, 0, 1.2, "stone", "X", { role: "p" }));
      const st = [];
      for (const x of [6, 14, 24.5, 32.5]) for (const y of [39, 47, 57.92, 69.74, 77.92, 86.42]) st.push(col(x, y, 0.45, 9.45));
      for (const x of [10, 26, 35.5]) for (const y of [16, 28]) st.push(col(x, y, 0.45, 4.95));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
