/* ================= Ý tưởng X.3: Trục hành lang Bắc – Nam (từ bản xếp khối của bạn, 07/11/2026) · khối + mặt bằng đầy đủ ================= */
(function (G) {
  const KT = "Nam · Nữ · KT (người khuyết tật)", N = "N";
  const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

  /* ---------- Tầng 1 ---------- */
  const t1rooms = [
    // khối sự kiện phía Bắc (một tầng, mở ngoài giờ)
    { id: "D2", c: "D2", n: "Bục trình bày", r: [6, 16, 4, 6.25], ctl: "sk", nz: 3, d: [["D1", 2.4, "o"]] },
    { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6, 22.25, 4, 5], ctl: "sk", nz: 1, d: [["D1", 1.4, "p"], ["COR", 1.2, "p"]] },
    { id: "D1", c: "D1", n: "Phòng đa năng", r: [10, 16, 16, 11.25], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", top: N, d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.75], ["COR", 1.8, "p", 0.4], ["FOYE", 1.8, "p"]] },
    { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [26, 16, 8.5, 8.5], ctl: "sk", nz: 2, seat: 24, top: N, d: [["FOYE", 1.2, "p"]] },
    { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [34.5, 16, 5, 11], ctl: "kt", nz: 3, d: [["E", 1.4, "nv"]] },
    { id: "FOYE", c: "circ", n: "Sảnh sự kiện", r: [26, 24.5, 8.5, 5.5], ctl: "sk", nz: 2, occ: 40, d: [["S", 1.8, "tn", 0.5], ["KCF", 1.0, "p"]] },
    { id: "KCF", c: "circ", n: "Kho chung sự kiện, cà phê", r: [34.5, 27, 5, 3], ctl: "sk", nz: 1 },
    { id: "COR", c: "circ", n: "Hành lang sự kiện", r: [6, 27.25, 20, 2.75], ctl: "sk", nz: 2, d: [["FOYE", 2.4, "o"], ["SPN", 3.0, "o"]] },
    // đầu Bắc trục: hành lang kính qua sân, vệ sinh công cộng
    { id: "SPN", c: "circ", n: "Trục Bắc – Nam: đoạn công cộng (kính, qua sân)", r: [14.5, 30, 3, 8.5], ctl: "sk", nz: 2, d: [["A1", 3.0, "o"], ["WCP", 1.2, "p", 0.5]] },
    { id: "WCP", c: "E5", n: "Vệ sinh công cộng (mở ngoài giờ)", r: [17.5, 30, 4, 4.5], ctl: "sk", nz: 1, wc: KT },
    // dải đón tiếp: sảnh A1 là bản lề trên trục
    { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [14.5, 38.5, 10, 8], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.6], ["A2", 2.4, "o"], ["A4", 2.0, "k", 0.6]] },
    { id: "A2", c: "A2", n: "Trưng bày", r: [24.5, 38.5, 7.5, 12], ctl: "sk", nz: 2, occ: 30, d: [["A3", 2.4, "o", 0.3]] },
    { id: "A3", c: "A3", n: "Cà phê sách", r: [32, 38.5, 7.5, 10], ctl: "sk", nz: 3, seat: 32, top: N, d: [["E", 1.2, "tn", 0.5]] },
    { id: "E3", c: "E3", n: "Trực bảo vệ (nhìn sân vào)", r: [35.5, 34.75, 4, 3.75], ctl: "nv", nz: 1, d: [["A3", 0.9, "nv"], ["E", 0.9, "nv"]] },
    // quầy gửi đồ, mượn trả, cổng từ: chốt duy nhất vào khu thư viện
    { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [17.5, 46.5, 4, 7.5], ctl: "tv", ctrl: 1, nz: 2, top: N, d: [["SPS", 2.4, "o", 0.4], ["S1", 1.2, "thang"], ["KDT", 1.0, "nv"]] },
    { id: "S1", n: "Thang bộ thư viện Bắc", r: [21.5, 46.5, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "S1" }, d: [["S", 1.2, "tnbd"]] },
    // cột kho, nghiệp vụ phía Tây (áp lối Tây cho xe sách)
    { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6, 38.75, 8.5, 8.25], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"]] },
    { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6, 47, 8.5, 3.6], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.5], ["SPS", 1.0, "nv"], ["C1", 1.2, "nv"]] },
    { id: "C1", c: "C1", n: "Kho đóng", r: [6, 50.6, 8.5, 14], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv", 0.75], ["E6", 0.9, "nv"]] },
    { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6, 64.6, 4.5, 4.5], ctl: "nv", nz: 1, d: [["KX", 0.9, "nv"], ["W", 0.9, "tn"]] },
    { id: "KX", c: "circ", n: "Kho xe đẩy sách", r: [6, 69.1, 4.5, 2.5], ctl: "nv", nz: 1, d: [["CS", 1.0, "nv"]] },
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10.5, 64.6, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["SPS", 1.4, "thang"]] },
    { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6, 71.6, 4.5, 8.9], ctl: "kho", nz: 1, d: [["HW1", 1.0, "nv"]] },
    { id: "WCL1", c: "E5", n: "Vệ sinh thư viện tầng 1", r: [10.5, 71.6, 4, 4.6], ctl: "tv", nz: 1, wc: KT, d: [["SPS", 1.0, "p"]] },
    { id: "HW1", c: "circ", n: "Hành lang kho lưu trữ", r: [10.5, 76.2, 4, 4.3], ctl: "nv", nz: 1, d: [["SPS", 1.0, "nv"]] },
    // trục Bắc – Nam đoạn thư viện: từ quầy A4 chạy thẳng tới bãi xe
    { id: "SPS", c: "circ", n: "Trục Bắc – Nam: đoạn thư viện (sau cổng từ)", r: [14.5, 46.5, 3, 42.5], ctl: "tv", nz: 1, d: [["S", 1.8, "tnbd"], ["KDT", 1.0, "nv"], ["WCK", 0.9, "p"], ["B3", 1.8, "p", 0.3], ["HS", 2.0, "o"], ["E1", 1.0, "nv", 0.3], ["E2", 0.9, "nv", 0.5]] },
    { id: "KDT", c: "circ", n: "Kho đồ chơi, xe đẩy (đỡ khối đọc tầng 2)", r: [17.5, 54, 2.5, 10.5], ctl: "tv", nz: 1 },
    { id: "WCK", c: "E5", n: "Vệ sinh thiếu nhi, thay tã", r: [17.5, 64.5, 4, 3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã", d: [["B3", 0.9, "p"]] },
    { id: "B3", c: "B3", n: "Thiếu nhi và gia đình (nhìn vườn)", r: [17.5, 67.5, 22, 8.2], ctl: "tv", nz: 3, seat: 32, d: [["N", 1.8, "tnbd", 0.6]] },
    { id: "S3", n: "Thang bộ thư viện Đông Nam", r: [36.5, 75.7, 3, 4.8], ctl: "tv", nz: 1, core: { st: "u", link: "S3" }, d: [["E", 1.2, "tnbd"], ["HS", 1.2, "thang"]] },
    { id: "HS", c: "circ", n: "Hành lang Nam, chỗ chờ, tủ sách trả", r: [17.5, 75.7, 19, 4.8], ctl: "tv", nz: 1, d: [["B1s", 1.8, "o"]] },
    // dải Nam: văn phòng, phòng nhân viên, đọc tầng 1
    { id: "S2", n: "Thang bộ thư viện Tây Nam", r: [6, 80.5, 3, 8.5], ctl: "tv", nz: 1, core: { st: "u", link: "S2" }, d: [["W", 1.2, "tnbd"]] },
    { id: "E2", c: "E2", n: "Phòng nhân viên", r: [9, 80.5, 5.5, 7.3], ctl: "nv", nz: 1 },
    { id: "E1", c: "E1", n: "Văn phòng", r: [17.5, 80.5, 9.4, 8.5], ctl: "nv", nz: 0 },
    { id: "B1s", c: "B1", n: "Đọc mở, sách mới (nhìn bãi cây phía Nam)", r: [26.9, 80.5, 12.1, 8.5], ctl: "tv", nz: 1 }
  ];
  const t1 = { k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: t1rooms.map(q => R4(...q.r)), rooms: t1rooms,
    staff: [
      { x: 20, y: 42, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
      { x: 19.5, y: 49, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
      { x: 37.5, y: 36.5, t: "Bảo vệ", sc: ["1", "2", "3", "4"] },
      { x: 35.5, y: 42, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
      { x: 30, y: 71.5, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
      { x: 10, y: 42.5, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
      { x: 9, y: 48.8, t: "Nhận sách", sc: ["4"] },
      { x: 22, y: 84.5, t: "Văn phòng", sc: ["1", "3", "4"] },
      { x: 30, y: 27, t: "Đón khách sự kiện", sc: ["2", "3"] },
      { x: 13, y: 18.5, t: "Điều phối, âm thanh", sc: ["2", "3"] }
    ] };

  /* ---------- Tầng 2: khu đọc, chỉ tới được sau quầy A4 ---------- */
  const t2rooms = [
    { id: "B2", c: "B2", n: "Đọc yên tĩnh (cánh Tây, xa học nhóm)", r: [6, 38.75, 8.5, 18.8], ctl: "tv", nz: 0, seat: 40, top: N, d: [["SP2", 1.2, "p", 0.2], ["SP2", 1.2, "p", 0.8]] },
    { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [10.5, 57.55, 4, 4.6], ctl: "tv", nz: 1, wc: KT, d: [["SP2", 1.0, "p"]] },
    { id: "KT2", c: "circ", n: "Kho xe sách tầng 2", r: [10.5, 62.15, 4, 2.45], ctl: "tv", nz: 1, d: [["SP2", 1.0, "nv"]] },
    { id: "B5", c: "B5", n: "Tra cứu số", r: [6, 57.55, 4.5, 22.95], ctl: "tv", nz: 1, seat: 16, top: N, d: [["HW2", 1.2, "p"], ["B1w", 1.2, "o"]] },
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [10.5, 64.6, 4, 7], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["SP2", 1.4, "thang"]] },
    { id: "B1w", c: "B1", n: "Bàn đọc cá nhân", r: [10.5, 71.6, 4, 4.6], ctl: "tv", nz: 0, top: N, d: [["SP2", 1.2, "o"]] },
    { id: "HW2", c: "circ", n: "Sảnh nối tra cứu số", r: [10.5, 76.2, 4, 4.3], ctl: "tv", nz: 1, d: [["SP2", 1.8, "o"], ["B1S", 1.8, "o"]] },
    { id: "SP2", c: "circ", n: "Trục Bắc – Nam tầng 2", r: [14.5, 38.75, 2.4, 41.75], ctl: "tv", nz: 1, d: [["B1e", 1.8, "o"], ["B6", 1.8, "o"], ["B1f", 1.8, "o"], ["HB", 2.0, "o"], ["B1S", 2.4, "o"]] },
    { id: "B1e", c: "B1", n: "Đọc mở và kệ (trên sảnh đón tiếp)", r: [16.9, 38.75, 9.6, 7.75], ctl: "tv", nz: 1, top: N, d: [["S1", 1.2, "thang"]] },
    { id: "S1", n: "Thang bộ thư viện Bắc", r: [21.5, 46.5, 3, 6], ctl: "tv", nz: 1, core: { st: "u", link: "S1" } },
    { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [16.9, 54, 6.6, 7.6], ctl: "tv", nz: 1, top: N },
    { id: "B1f", c: "B1", n: "Đọc mở và kệ (giữa)", r: [16.9, 61.6, 6.6, 5.9], ctl: "tv", nz: 1, top: N },
    { id: "HB", c: "circ", n: "Hành lang học nhóm", r: [16.9, 67.5, 22.6, 2], ctl: "tv", nz: 2, d: [["KD", 1.0, "nv"]] },
    ...[0, 1, 2, 3].map(i => ({ id: "B4" + "abcd"[i], c: "B4", n: `Học nhóm ${i + 1}`, r: [16.9 + 4.2 * i, 69.5, 4.2, 6.2], ctl: "tv", nz: 3, top: N, d: [["HB", 0.9, "p"]] })),
    { id: "KD", c: "circ", n: "Kho đệm, máy in", r: [33.7, 69.5, 5.8, 6.2], ctl: "tv", nz: 1, d: [["S3", 1.0, "thang"]] },
    { id: "S3", n: "Thang bộ thư viện Đông Nam", r: [36.5, 75.7, 3, 4.8], ctl: "tv", nz: 1, core: { st: "u", link: "S3" }, d: [["B1S", 1.2, "thang"]] },
    { id: "S2", n: "Thang bộ thư viện Tây Nam", r: [6, 80.5, 3, 8.5], ctl: "tv", nz: 1, core: { st: "u", link: "S2" }, d: [["B1S", 1.2, "thang"]] },
    { id: "B1S", c: "B1", n: "Sảnh đọc lớn phía Nam", r: [9, 80.5, 30.5, 8.5], ctl: "tv", nz: 1, top: N }
  ];
  const t2 = { k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: t2rooms.map(q => R4(...q.r)), rooms: t2rooms,
    staff: [{ x: 20, y: 57.5, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }] };

  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 18.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const plan = {
    id: "chotX3", code: "X.3", name: "Trục hành lang Bắc – Nam", from: "bản xếp của bạn",
    yN: () => -999, yS: () => -999,
    levels: [t1, t2],
    grid: { x: [6, 10, 14.5, 17.5, 21.5, 24.5, 26, 32, 34.5, 39.5], y: [16, 27.25, 30, 38.5, 46.5, 50.6, 54, 64.6, 67.5, 75.7, 80.5, 89] },
    site: {
      staff: [{ x: 9, y: 97, t: "Giữ xe", sc: ["1", "2", "3", "4"] }, { x: 40, y: 22, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes, nBike: bikes.length, cars: [[6, 89.5, 3.5, 5.5, 1], [9.5, 89.5, 3.5, 5.5, 1], [13, 89.5, 2.8, 5.5, 0]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4] },
      routes: {
        delivery: [[[3, 112], [3, 104], [3, 48.8], [5.2, 48.8]]],
        fire: [[[-3, -12], [3, -4], [3, 102]], [[3, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]],
        lib: [[[30, 103], [41, 96], [41, 33], [21.5, 33], [21.5, 38]]],
        event: [[[24, -9], [30, 6], [41, 10], [41, 33], [21.5, 33], [21.5, 38]]]
      },
      routeNames: { lib: "Người đọc: từ bãi xe dọc bờ sông, vào sân giữa tới sảnh đón tiếp", event: "Khách sự kiện: quảng trường Bắc, dọc bờ sông vào sân giữa tới sảnh đón tiếp" },
      hatch: [R4(21.5, 30, 18, 4.75), R4(6, 30, 8.5, 8.75), R4(24.5, 54, 15, 13.5)],
      labels: [[30, 32.4, "Sân vào"], [10.2, 34, "Sân Tây"], [31, 60, "Vườn thiếu nhi"], [16, 60.5, "Trục Bắc – Nam"]]
    }
  };
  plan.intro = `<p class="lede">X.3 giữ đúng các khối bạn xếp (khối sự kiện phía Bắc, dải đón tiếp ở giữa, cột kho phía Tây, khối thiếu nhi và dải văn phòng phía Nam, tầng 2 là khung khu đọc), rồi gom mọi lối đi thành <b>một trục hành lang thẳng Bắc – Nam</b> rộng 3 m, đúng cột x 14,5 – 17,5 m nơi bạn đã đặt quầy A4, thang máy và hành lang. Đi từ khối sự kiện, qua hành lang kính băng qua sân, tới sảnh đón tiếp A1, qua quầy gửi đồ, mượn trả có cổng từ A4, rồi chạy thẳng tới bãi xe. Tầng 2 có trục thứ hai đặt đúng trên trục tầng 1. Một cửa khóa giữa A1 và A4 tách khu sự kiện (mở ngoài giờ) với khu thư viện; cửa này không nằm trên đường thoát nạn của khu sự kiện.</p>`;
  plan.notes = [
    "Đi qua khối A: một cửa vào chính ở mặt Bắc của sảnh đón tiếp A1, nhìn ra sân vào. Từ A1 rẽ Bắc theo trục kính tới hành lang sự kiện, phòng đa năng, chuyên đề; rẽ Đông qua trưng bày tới cà phê; đi thẳng Nam qua cửa khóa vào quầy gửi đồ, mượn trả có cổng từ A4 (sảnh → quầy khoảng 7 m). Mọi phòng đọc, kể cả thiếu nhi và cả tầng 2, đều nằm sau A4. Phòng đa năng, chuyên đề không có lối vào riêng từ ngoài, chỉ có cửa thoát nạn.",
    "Thang có hệ quả: bốn thang lên khu đọc (thang Bắc cạnh quầy, lõi sách, thang Tây Nam, thang Đông Nam) đều nằm sau A4. Thang Bắc mở thẳng từ quầy A4; lõi sách mở ra trục thư viện; hai thang phía Nam ở tầng 1 chỉ có cửa thoát hiểm có chuông báo. Khu sự kiện chỉ ở tầng 1 nên không cần thang riêng.",
    "Đường sách mới: xe giao sách vào lối Tây, dỡ qua cửa cuốn vào tiếp nhận C4 → xử lý C2 (liền vách, phía Bắc) và kho đóng C1 (liền vách, phía Nam). Kho đóng mở vào lõi sách: tời sách đưa lên trục tầng 2, ra sảnh đọc lớn phía Nam. Sách trả: thủ thư từ A4 đi vài bước trên trục, vào cửa nhân viên của C4 rồi tới C2.",
    "Vệ sinh: cụm công cộng (mở ngoài giờ) ngay đầu trục kính, gần sảnh A1 và phòng đa năng. Khu đọc mỗi tầng có một cụm mở thẳng ra trục: tầng 1 cạnh lõi sách, tầng 2 ở đầu cánh Tây để đọc yên tĩnh không phải đi xa (hai cụm lệch nhau 10 m, ống nước đi ngang trong trần kho). Thiếu nhi có vệ sinh trẻ em, thay tã mở thẳng vào phòng.",
    "Ánh sáng Bắc – Nam: khối sự kiện, cà phê, quầy A4 là phòng một tầng lấy sáng cửa mái hướng Bắc. Sảnh A1, trưng bày, xử lý nghiệp vụ lấy sáng mặt Bắc nhìn sân; thiếu nhi lấy sáng mặt Bắc nhìn vườn; văn phòng, phòng nhân viên, đọc tầng 1 lấy sáng mặt Nam. Tầng 2 là tầng trên cùng, mọi phòng đọc lấy sáng mái răng cưa kính quay Bắc. Mặt Đông, Tây là tường đặc (kho, thang, kỹ thuật, vệ sinh).",
    "Tiếng ồn: đọc yên tĩnh ở cánh Tây tầng 2, cách học nhóm hơn 12 m, giữa là lõi sách và trục. Học nhóm tầng 2 đặt đúng trên phòng thiếu nhi (ồn chồng ồn), không phòng đọc nào nằm trên phòng ồn. Văn phòng, phòng nhân viên ở dải Nam, xa thiếu nhi và kỹ thuật.",
    "Ngoài giờ: khu sự kiện, sảnh A1, trưng bày, cà phê, vệ sinh công cộng chạy riêng. Chỉ khóa một cửa giữa A1 và A4; khách sự kiện thoát qua các cửa của phòng đa năng, sảnh sự kiện, cà phê và lối vào chính.",
    "Đã sửa so với bản xếp: (1) Cột kho, nghiệp vụ và hai khối D2, D3 đẩy vào x ≥ 6 m, trả lại lối Tây 6 m cho xe cứu hỏa, xe sách. (2) Dồn các mẩu hành lang rời (CO2, CO3, FOYA, LK, LC) và hai thang máy lệch nhau thành một trục 3 m thẳng hàng hai tầng. (3) Đổi chỗ: tầng 2 trên thiếu nhi là học nhóm (bản xếp để đọc mở B1a, B1w ở đó, bị đè lên phòng ồn); đọc mở chuyển xuống dải Nam tầng 2 (B1S) và tầng 1 (B1s). (4) Đọc yên tĩnh B2 chuyển sang cánh Tây tầng 2, chỗ bản xếp đặt B1b, B5, học nhóm. (5) Kỹ thuật E4 chuyển lên góc Đông Bắc cạnh khối sự kiện, không còn chung vách phòng nhân viên. (6) Cà phê, trưng bày, đón tiếp giữ dải giữa; cà phê A3 đổi chỗ với hành lang FOYA thành phòng có cửa mái. (7) Vệ sinh tăng lên 67 m², đọc yên tĩnh 160 m² (bản xếp lệch −11%, −10%).",
    "Kết cấu: khung bê tông; tầng 2 đặt trên cột kho, trục và khối thiếu nhi; cánh đọc giữa đua 2 m ra phía vườn; phòng đa năng 16 m dùng dầm ứng lực trước; kho đóng sát lõi sách nên tải nặng xuống thẳng móng."
  ];
  /* ---------- khối 3D: dựng thẳng từ các phòng của mặt bằng ---------- */
  const { B, col } = G.K;
  const L1 = { sk: "stone", tv: "sheet", nv: "sheet", kho: "sheet", kt: "stone" };
  plan.idea = {
    id: "chotX3", fam: "chot", code: "X.3", from: "bản xếp của bạn", name: "Trục hành lang Bắc – Nam", rule: "Một trục hành lang thẳng hai tầng xuyên qua các khối",
    tag: "Giữ các khối bạn xếp; mọi lối đi gom về một trục 3 m thẳng từ khối sự kiện, qua sảnh đón tiếp, quầy gửi đồ, tới bãi xe",
    story: "Bản xếp có nhiều hành lang rời và hai thang máy lệch nhau. X.3 nối chúng thành một sống lưng: trục kính băng qua sân, sảnh đón tiếp là bản lề, quầy gửi đồ là cổng vào thư viện, rồi trục chạy thẳng về phía Nam. Tầng 2 có trục thứ hai nằm đúng trên trục dưới.",
    why: [["Quy luật hình khối", "Giữ các hộp chữ nhật bạn xếp; chỉ dời tối đa khoảng 2 m để thẳng trục và trả lại lối Tây."], ["Khối chính – khối phụ", "Khung khu đọc hai tầng (kho, trục, thiếu nhi, dải Nam) là khối chính; khối sự kiện và dải đón tiếp một tầng là khối phụ."], ["Nắng và chói", "Phòng có người lấy sáng mặt Bắc, Nam hoặc cửa mái hướng Bắc; mặt Đông, Tây đặc."], ["Gió và mưa", "Sân vào và vườn thiếu nhi mở ra sông, đón gió Đông Nam; trục kính có mái che."], ["Công năng", "Một trục duy nhất: đi tới đâu cũng biết mình đang ở khu nào; cửa khóa ngoài giờ nằm đúng giữa trục."]],
    kc: { he: "Khung bê tông lưới theo trục 3 m và các cột kho; phòng đa năng 16 m dùng dầm ứng lực trước; tầng 2 mái răng cưa thép nhẹ.", nhip: "16 m (phòng đa năng)", cx: "Cánh đọc giữa đua 2 m" },
    qa: [["Thiếu nhi có lối riêng không?", "Không: thiếu nhi nằm trên trục thư viện, sau quầy A4; cửa ra vườn là cửa có chuông báo."], ["Trục dài 60 m có chán không?", "Trục đi qua sân, sảnh, quầy, cạnh vườn thiếu nhi và kết thúc ở bãi xe; tầng 2 trục mở vào các phòng đọc lấy sáng mái."]],
    cut: "Khối sự kiện và dải đón tiếp foam xám một tầng; khung khu đọc trắng hai tầng có răng cưa; trục kính mica xuyên dọc; lõi sách tím, thang cam nhô khỏi mái.",
    roleOf: v => v.role || "p", floors: 2,
    planBrief() {
      const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null;
      if (!P6 || !Dd) return null;
      plan.__R = plan.__R || P6.analyse(plan, Dd);
      const z = plan.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN");
      return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng, từng phòng trong ±10% đề` };
    },
    lab: [[15.5, 60, 12, "Trục Bắc – Nam", 1], [28, 84, 11.4, "Khối chính · Khung khu đọc hai tầng", 1], [18, 21, 6.2, "Khối phụ · Khối sự kiện", 2], [28, 43, 6.2, "Dải đón tiếp", 2]],
    build() {
      const v = [];
      const top1 = 4.95, top2 = 9.45;
      for (const z of t1rooms) {
        if (z.core) continue;
        const [x, y, w, h] = z.r, up = t2rooms.some(o => !o.core && Math.min(x + w, o.r[0] + o.r[2]) - Math.max(x, o.r[0]) > 0.5 && Math.min(y + h, o.r[1] + o.r[3]) - Math.max(y, o.r[1]) > 0.5);
        const glass = z.id === "SPN";
        v.push(B(x, y, w, h, 0.45, top1, glass ? "glass" : (L1[z.ctl] || "sheet"), z.ctl === "sk" ? "D" : "B", { fl: 1, role: z.ctl === "sk" ? "p" : "m", top: up ? undefined : "grass" }));
      }
      for (const z of t2rooms) {
        if (z.core) continue;
        const [x, y, w, h] = z.r;
        v.push(B(x, y, w, h, top1, top2, "sheet", "B", { fl: 1, role: "m" }));
      }
      // lõi thang nhô khỏi mái
      for (const id of ["CS", "S1", "S2", "S3"]) { const z = t1rooms.find(q => q.id === id), [x, y, w, h] = z.r; v.push(B(x, y, w, h, 0.45, top2 + 1.6, id === "CS" ? "violet" : "warn", "X", { top: id === "CS" ? "violet" : "warn", lv: 0, fl: 2, role: "m" })); }
      // cửa mái răng cưa tầng 2, cửa mái khối một tầng
      for (const y of [41, 45, 57, 61, 65, 83, 87]) v.push(B(6.5, y, 7.5, 0.4, top2, top2 + 0.5, "glass", "X", { op: 0.75 }));
      for (const y of [19, 23]) v.push(B(10.5, y, 23.5, 0.4, top1, top1 + 0.5, "glass", "X", { op: 0.75 }));
      // tường thấp vườn thiếu nhi
      v.push(B(24.5, 54, 0.3, 13.5, 0, 1.2, "stone", "X", { role: "p" }), B(39.2, 52, 0.3, 15.5, 0, 1.2, "stone", "X", { role: "p" }));
      const st = [];
      for (const x of [6, 14.5, 17.5, 26.9]) for (const y of [38.75, 50.6, 64.6, 80.5, 89]) st.push(col(x, y, 0.45, top2));
      return { v, st };
    }
  };
  G.CHOT = G.CHOT || [];
  G.CHOT.push(plan);
})(window.G3);
