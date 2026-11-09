/* ================= Final 2: bản xếp của bạn (file xep-khoi-arc329.json, 09/11/2026 16:36) =================
   F.2  giữ 100% vị trí, kích thước mọi khối; chỉ thêm cửa, người trực, bãi xe trong gầm, tuyến xe.
   F.2a–F.2e  năm biến thể: giữ bố cục, chỉ dời hoặc thêm vài khối nhỏ để sửa từng nhóm vấn đề. */
(function (G) {
  const KT = "Nam · Nữ · KT (người khuyết tật)", N = "N";
  const box = r => { const [x, y, w, h] = r; return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; };
  const cp = o => JSON.parse(JSON.stringify(o));
  /* ---------- tầng 1: đúng toạ độ trong file ---------- */
  const R1 = [
    { id: "D2", c: "D2", n: "Bục trình bày", r: [6.09, 12, 3.749, 6.423], ctl: "sk", nz: 3 },
    { id: "D3", c: "D3", n: "Kho bàn ghế sự kiện", r: [6.09, 18.41, 3.75, 5.867], ctl: "sk", nz: 1 },
    { id: "D1", c: "D1", n: "Phòng đa năng", r: [9.84, 11.99, 15.5, 12.29], ctl: "sk", nz: 3, seat: 120, occ: 120, face: "W", d: [["N", 1.8, "tn", 0.3], ["N", 1.8, "tn", 0.8], ["D2", 2.4, "o"], ["D3", 1.2, "p"]] },
    { id: "D4", c: "D4", n: "Phòng sinh hoạt chuyên đề", r: [25.34, 12, 9.5, 7.11], ctl: "sk", nz: 2, seat: 24, d: [["N", 1.2, "tn", 0.5]] },
    { id: "WCP", c: "E5", n: "Vệ sinh công cộng, sự kiện (mở ngoài giờ)", r: [34.84, 12, 3.75, 7.11], ctl: "sk", nz: 1, wc: KT },
    { id: "CO3", c: "circ", n: "Hành lang sự kiện", r: [25.34, 19.11, 13.25, 5.207], ctl: "sk", nz: 2, occ: 30, d: [["D1", 2.4, "p", 0.5], ["D4", 1.8, "p"], ["WCP", 1.2, "p"], ["A3", 2.0, "o"], ["E", 1.6, "tn"]] },
    { id: "FOYA", c: "circ", n: "Sảnh sự kiện, cà phê", r: [28.59, 24.309, 2.868, 9.949], ctl: "sk", nz: 2, occ: 20, d: [["CO3", 2.4, "o"], ["A2", 2.4, "o"]] },
    { id: "A3", c: "A3", n: "Cà phê sách", r: [31.55, 24.32, 7.037, 9.947], ctl: "sk", nz: 3, seat: 32, d: [["E", 1.2, "tn", 0.5]] },
    { id: "A1", c: "A1", n: "Đón tiếp và thông tin", r: [18.59, 34.25, 10, 8.2], ctl: "sk", nz: 2, seat: 20, occ: 40, d: [["N", 2.4, "chinh", 0.45], ["S", 2.0, "chinh", 0.2], ["A2", 2.4, "o"], ["HL2", 1.6, "k"]] },
    { id: "A2", c: "A2", n: "Trưng bày", r: [28.59, 34.27, 10, 8.2], ctl: "sk", nz: 2, occ: 30 },
    { id: "CS", n: "Lõi sách: thang bộ + thang máy + tời sách", r: [6.09, 34.29, 8.5, 4], ctl: "kho", nz: 1, core: { st: "u+l+b", link: "CS" } },
    { id: "STN", n: "Thang bộ Bắc (lên đọc tầng 2, 3)", r: [14.59, 34.29, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["N", 1.2, "tnbd"]] },
    { id: "C1", c: "C1", n: "Kho đóng", r: [6.09, 38.29, 8.5, 13.647], ctl: "kho", nz: 1, d: [["CS", 1.2, "nv"], ["C3", 1.2, "nv"], ["LC", 1.0, "nv"]] },
    { id: "LC", c: "circ", n: "Sảnh thang Bắc, sau cổng từ", r: [14.59, 40.29, 4, 8.282], ctl: "tv", nz: 1, d: [["STN", 1.2, "thang"]] },
    { id: "HL2", c: "circ", n: "Lối vào quầy (khóa ngoài giờ)", r: [18.584, 42.445, 3, 25.044], ctl: "tv", nz: 2, d: [["A4", 1.8, "o", 0.25]] },
    { id: "A4", c: "A4", n: "Gửi đồ, mượn trả, cổng từ (kiểm soát sách)", r: [14.59, 48.56, 4, 7.5], ctl: "tv", ctrl: 1, nz: 2, d: [["LC", 2.0, "o"], ["HA", 2.0, "o"], ["C3", 1.0, "nv"]] },
    { id: "C3", c: "C3", n: "Lưu trữ tài liệu địa phương", r: [6.09, 51.94, 8.5, 4.824], ctl: "kho", nz: 1, d: [["C2", 1.0, "nv"]] },
    { id: "HA", c: "circ", n: "Sảnh thư viện sau cổng từ", r: [14.578, 56.06, 4, 13.92], ctl: "tv", nz: 2, d: [["B3", 1.8, "p"], ["C2", 1.0, "nv"], ["C4", 1.0, "nv"], ["H7", 1.6, "o"], ["KW", 2.4, "o"]] },
    { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", r: [6.08, 56.76, 8.5, 7.765], ctl: "nv", nz: 1, d: [["C4", 1.2, "nv"]] },
    { id: "C4", c: "C4", n: "Tiếp nhận sách", r: [6.08, 64.53, 8.5, 3.882], ctl: "nv", nz: 1, d: [["W", 2.8, "cuon", 0.4], ["W", 1.0, "nv", 0.85]] },
    { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", r: [18.58, 67.48, 20, 8.5], ctl: "tv", nz: 3, seat: 32, d: [["S", 1.8, "tnbd", 0.7]] },
    { id: "H7", c: "circ", n: "Hành lang vệ sinh, kho chung", r: [6.09, 68.41, 8.5, 3.27], ctl: "tv", nz: 1, d: [["E6", 0.9, "nv"], ["W", 1.0, "nv"]] },
    { id: "KW", c: "circ", n: "Hành lang thiếu nhi, lối nhân viên từ gầm xe", r: [14.58, 69.968, 4, 10.292], ctl: "tv", nz: 2, d: [["B3", 1.8, "p"], ["WCB", 1.0, "p"], ["S", 1.2, "nv"]] },
    { id: "E6", c: "E6", n: "Dụng cụ vệ sinh, kho chung", r: [6.39, 71.68, 4.186, 4.3], ctl: "nv", nz: 1 },
    { id: "WCB", c: "E5", n: "Vệ sinh thiếu nhi, thay tã (có KT)", r: [10.58, 71.68, 4, 4.3], ctl: "tv", nz: 1, wc: "Trẻ em · thay tã · KT" },
    { id: "H9A", c: "circ", n: "Sảnh nhân viên Tây Nam", r: [6, 80.26, 3.98, 2.74], ctl: "nv", nz: 1, d: [["W", 1.2, "nv"], ["H9", 1.6, "o"], ["STW", 1.2, "thang"]] },
    { id: "H9", c: "circ", n: "Sảnh nhân viên Tây Nam", r: [9.982, 80.26, 4.607, 5.45], ctl: "nv", nz: 1, d: [["E3", 0.9, "nv"], ["N", 1.4, "nv"]] },
    { id: "E4", c: "E4", n: "Kỹ thuật (điện, bơm, máy lạnh)", r: [32.49, 80.26, 6.293, 8.74], ctl: "kt", nz: 3, d: [["W", 1.4, "nv"], ["S", 1.4, "nv"]] },
    { id: "STW", n: "Thang thoát hiểm Tây Nam (lên khu văn phòng)", r: [6, 83, 4, 6], ctl: "nv", nz: 1, core: { st: "u", link: "STW" }, d: [["S", 1.2, "tn"]] },
    { id: "E3", c: "E3", n: "Trực bảo vệ, giữ xe gầm", r: [10, 85.71, 4.591, 3.289], ctl: "nv", nz: 1, d: [["S", 0.9, "nv"]] }
  ];
  /* ---------- tầng 2 ---------- */
  const R2 = [
    { id: "CS2", n: "Lõi sách tầng 2", r: [6.09, 34.29, 8.5, 4], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B5", 1.2, "thang"]] },
    { id: "STS", n: "Thang bộ Bắc", r: [14.59, 34.29, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["B6", 1.2, "thang"], ["H8", 1.2, "thang"]] },
    { id: "B6", c: "B6", n: "Đọc linh hoạt, hỗ trợ tra cứu", r: [18.59, 34.29, 6.315, 8.155], ctl: "tv", nz: 1, top: N, d: [["H8", 1.6, "o"]] },
    { id: "B5", c: "B5", n: "Tra cứu số", r: [6.09, 38.29, 8.503, 10.927], ctl: "tv", nz: 1, seat: 16, top: N, d: [["H8", 1.6, "o"], ["HZ", 1.6, "o"]] },
    { id: "H8", c: "circ", n: "Sảnh thang Bắc tầng 2", r: [14.59, 40.29, 4.023, 2.155], ctl: "tv", nz: 1, d: [["HZ", 2.0, "o"]] },
    { id: "HZ", c: "circ", n: "Hành lang đọc tầng 2", r: [14.6, 42.423, 2.2, 43.287], ctl: "tv", nz: 1, d: [["HQ", 2.0, "o", 0.4], ["HN", 1.2, "nv"], ["WCL1", 0.9, "nv"]] },
    { id: "HQ", c: "circ", n: "Hành lang học nhóm", r: [12.58, 49.22, 2.022, 18.303], ctl: "tv", nz: 2, d: [["B4b", 0.9, "p"], ["B4c", 0.9, "p"], ["B4a", 0.9, "p"], ["B4d", 0.9, "p"], ["WCL2", 0.9, "p"]] },
    ...[["B4b", 49.21], ["B4c", 53.02], ["B4a", 56.83], ["B4d", 60.64]].map(([id, y], i) => ({ id, c: "B4", n: `Học nhóm ${i + 1}`, r: [6.08, y, 6.5, 3.81], ctl: "tv", nz: 2, top: N })),
    { id: "WCL2", c: "E5", n: "Vệ sinh thư viện tầng 2", r: [6.09, 64.45, 6.5, 3.031], ctl: "tv", nz: 1, wc: KT },
    { id: "B1w", c: "B1", n: "Đọc mở và kệ (trên thiếu nhi)", r: [18.59, 67.48, 19.835, 8.5], ctl: "tv", nz: 1, top: N },
    { id: "HQe", c: "circ", n: "Hành lang văn phòng Tây", r: [6.18, 80.26, 8.428, 2.74], ctl: "nv", nz: 1, d: [["STW2", 1.2, "thang"], ["HZ", 1.2, "nv"]] },
    { id: "HN", c: "circ", n: "Hành lang văn phòng", r: [16.8, 80.26, 21.98, 2.5], ctl: "nv", nz: 1, d: [["E2", 0.9, "p", 0.15], ["E1a", 0.9, "p"], ["E1b", 0.9, "p"]] },
    { id: "E2", c: "E2", n: "Phòng nhân viên (nghỉ, ăn, tủ đồ)", r: [18.75, 82.76, 6.452, 6.2], ctl: "nv", nz: 1, d: [["H9r", 0.9, "p"]] },
    { id: "E1a", c: "E1", n: "Văn phòng: chỗ làm việc", r: [25.2, 82.76, 7.117, 6.244], ctl: "nv", nz: 0, e1: "lam", d: [["E1b", 0.9, "p"]] },
    { id: "E1b", c: "E1", n: "Văn phòng: phòng họp", r: [32.31, 82.76, 6.47, 6.244], ctl: "nv", nz: 0, e1: "hop" },
    { id: "H9r", c: "circ", n: "Sảnh vệ sinh nhân viên", r: [16.8, 82.933, 1.968, 2.777], ctl: "nv", nz: 1 },
    { id: "STW2", n: "Thang thoát hiểm Tây Nam", r: [6.18, 83, 4, 6], ctl: "nv", nz: 1, core: { st: "u", link: "STW" } },
    { id: "HQt", c: "circ", n: "Sảnh thang Tây Nam", r: [10.18, 83, 4.413, 6.004], ctl: "nv", nz: 1, d: [["STW2", 1.2, "thang"], ["HQe", 1.6, "o"]] },
    { id: "WCL1", c: "E5", n: "Vệ sinh nhân viên (tầng 2)", r: [14.59, 85.71, 4.173, 3.22], ctl: "nv", nz: 1, wc: "Nam · Nữ nhân viên", d: [["H9r", 0.9, "p"]] }
  ];
  /* ---------- tầng 3 ---------- */
  const R3 = [
    { id: "CS3", n: "Lõi sách tầng 3", r: [6.2, 34.29, 8.39, 4], ctl: "tv", nz: 1, core: { st: "u+l+b", link: "CS" }, d: [["B1n", 1.2, "thang"]] },
    { id: "STE3", n: "Thang bộ Bắc tầng 3", r: [14.59, 34.29, 4, 6], ctl: "tv", nz: 1, core: { st: "u", link: "STN" }, d: [["B1n6", 1.2, "thang"], ["B1f", 1.2, "thang"]] },
    { id: "B1n6", c: "B1", n: "Đọc mở và kệ (Bắc)", r: [18.59, 34.29, 6.32, 8.149], ctl: "tv", nz: 1, top: N, d: [["B1f", 1.6, "o"]] },
    { id: "B1n", c: "B1", n: "Bàn đọc cá nhân (Tây Bắc)", r: [6.09, 38.29, 8.39, 9.442], ctl: "tv", nz: 0, top: N },
    { id: "B1f", c: "B1", n: "Bàn đọc cá nhân (dải giữa)", r: [14.6, 40.29, 3.991, 27.261], ctl: "tv", nz: 0, top: N, d: [["B1a", 1.6, "o"]] },
    { id: "B1a", c: "B1", n: "Đọc mở và kệ (Nam)", r: [14.6, 67.55, 7.146, 8.38], ctl: "tv", nz: 1, top: N, d: [["B2", 1.6, "p"]] },
    { id: "B2", c: "B2", n: "Đọc yên tĩnh", r: [21.74, 67.5, 17.18, 8.38], ctl: "tv", nz: 0, seat: 40, top: N }
  ];
  const STAFF1 = [
    { x: 21.5, y: 38.5, t: "Lễ tân", sc: ["1", "2", "3", "4"] },
    { x: 16.6, y: 53.5, t: "Thủ thư mượn trả, cổng từ", sc: ["1", "3", "4"] },
    { x: 12.3, y: 87.4, t: "Bảo vệ, giữ xe gầm", sc: ["1", "2", "3", "4"] },
    { x: 35, y: 29, t: "Quầy cà phê", sc: ["1", "2", "3", "4"] },
    { x: 28, y: 72, t: "Thủ thư thiếu nhi", sc: ["1", "3"] },
    { x: 10.3, y: 60.6, t: "Nghiệp vụ", sc: ["1", "3", "4"] },
    { x: 10.3, y: 66.4, t: "Nhận sách", sc: ["4"] },
    { x: 30, y: 29, t: "Đón khách sự kiện", sc: ["2", "3"] },
    { x: 17, y: 18, t: "Điều phối, âm thanh", sc: ["2", "3"] }
  ];
  const STAFF2 = [{ x: 10.3, y: 44, t: "Hỗ trợ tra cứu", sc: ["1", "3", "4"] }, { x: 28.7, y: 85.9, t: "Văn phòng", sc: ["1", "3", "4"] }];
  const bikes = [];
  for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
  const gamBikes = (x0, x1, y0, y1) => { const out = []; for (let y = y0 + 0.3; y + 2 <= y1; y += 4.4) for (let x = x0 + 0.3; x + 0.8 <= x1; x += 0.8) out.push([x, y, 0.8, 2]); return out; };
  function make(V) {
    const r1 = cp(R1), r2 = cp(R2), r3 = cp(R3);
    const s1 = cp(STAFF1), s2 = cp(STAFF2);
    const gam = V.gam || [14.59, 80.26, 17.9, 8.74];
    const P = { id: "chotF2" + (V.sfx || ""), code: V.code, name: V.name, from: "bản xếp của bạn (09/11)", yN: () => -999, yS: () => -999 };
    const ctx = { r1, r2, r3, s1, s2, plan: P, get: (L, id) => L.find(z => z.id === id), del: (L, id) => L.splice(L.findIndex(z => z.id === id), 1) };
    if (V.mod) V.mod(ctx);
    const gb = gamBikes(gam[0], gam[0] + gam[2], gam[1], gam[1] + gam[3]);
    P.levels = [
      { k: "t1", z: 0.45, title: "Tầng 1 · sàn +0.450", env: r1.map(z => box(z.r)), rooms: r1, staff: s1 },
      { k: "t2", z: 4.95, title: "Tầng 2 · sàn +4.950", env: r2.map(z => box(z.r)), rooms: r2, staff: s2 },
      { k: "t3", z: 9.45, title: "Tầng 3 · sàn +9.450", env: r3.map(z => box(z.r)), rooms: r3, staff: [] }
    ];
    P.grid = { x: [6.09, 9.84, 14.59, 18.59, 21.58, 25.34, 28.59, 31.55, 38.59], y: [12, 19.11, 24.31, 34.29, 42.45, 48.56, 56.06, 64.53, 67.48, 75.98, 80.26, 89] };
    P.gam = gam;
    P.site = {
      staff: [{ x: 9, y: 97, t: "Giữ xe (bãi Nam)", sc: ["1", "2", "3", "4"] }, { x: 40, y: 50, t: "Kỹ thuật, vệ sinh (đi tuần)", sc: ["1", "3", "4"] }],
      park: { bikes: bikes.concat(gb), nBike: bikes.length + gb.length, cars: [[8, 89.5, 3.5, 5.5, 1], [11.5, 89.5, 3.5, 5.5, 1]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4], gam: [[...gam, gb.length]] },
      routes: V.routes || {
        delivery: [[[2.2, 112], [2.2, 104], [2.2, 66.5], [6.1, 66.5]]],
        fire: [[[-3, -12], [2.2, -4], [2.2, 102]], [[2.2, -2], [34, 7]]],
        moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]], [[20, 95], [22, 86]]],
        lib: [[[24, 86], [40, 86], [40, 46], [23, 46], [21.8, 42.5]]],
        event: [[[15, 6], [3.5, 10], [3.5, 29], [20, 29], [21.5, 34.3]]]
      },
      extra: V.extra || [[[[13, 92], [12.3, 89]], "rStaff", "Nhân viên: gửi xe ở gầm, vào sảnh nhân viên Tây Nam"]],
      routeNames: V.routeNames || { lib: "Người đọc: từ bãi xe, gầm xe đi dọc bờ sông (ngoài trời), qua sân giữa vào cửa Nam A1 (khoảng 75 m)", event: "Khách sự kiện: từ quảng trường đi vòng lối Tây vào sân trước sảnh (khoảng 55 m)" },
      hatch: V.hatch || [box([6.09, 24.31, 22.5, 9.98]), box([21.6, 42.47, 17, 25])],
      labels: V.labels || [[15, 29.3, "Sân trước sảnh"], [30, 55, "Sân giữa"], [23.5, 85, "Gầm để xe dưới tầng 2"], [2.4, 52, "Lối Tây 6 m"]]
    };
    const li = a => (a || []).map(t => `<li>${t}</li>`).join("");
    P.intro = (V.intro || `<p class="lede">${P.code}: ${V.tag}. Bố cục và kích thước các phòng giữ như bản của bạn (F.2).</p>`) + (V.fix ? `<p><b>Sửa so với F.2</b></p><ul>${li(V.fix)}</ul>` : "") + (V.issues ? `<p><b>Chỗ chưa ổn (giữ nguyên vì là cách xếp của bạn; xem F.2a–F.2e)</b></p><ul>${li(V.issues)}</ul>` : "");
    P.notes = V.notes; P.issues = V.issues; P.fix = V.fix; P.tag = V.tag;
    /* khối 3D: dựng thẳng từ các phòng (để kiểm tra góc che nắng và xem 3D) */
    const { B } = G.K || {};
    const MAT = { A: "ribbon", B: "sheet", C: "deck", D: "gold", E: "stone" };
    if (B) P.idea = {
      id: P.id, fam: "chot", code: P.code, from: P.from, name: P.name, rule: "Theo đúng khối của bạn", tag: V.tag || "", story: V.tag || "", why: [], kc: { he: "Khung bê tông lưới cột theo các khối; gầm để xe có cột dưới dải văn phòng tầng 2.", nhip: "15,5 m (phòng đa năng)", cx: "Không" }, qa: [], cut: "", roleOf: v => v.role || "p", floors: 3, lab: [],
      planBrief() { const P6 = G.P6, Dd = typeof D !== "undefined" ? D : null; if (!P6 || !Dd) return null; P.__R = P.__R || P6.analyse(P, Dd); const z = P.__R.byZone, f = v => Math.round(v || 0).toLocaleString("vi-VN"); return { st: "du", plan: 1, short: [], extra: [], ok: true, txt: `Theo mặt bằng chi tiết: A ${f(z.A)} · B ${f(z.B)} · C ${f(z.C)} · D ${f(z.D)} · E ${f(z.E)} m² sử dụng` }; },
      build() {
        const v = [], lv = [[r1, 0.45, 4.95], [r2, 4.95, 9.45], [r3, 9.45, 13.95]];
        lv.forEach(([L, z0, z1], i) => { const up = lv[i + 1] ? new Set(lv[i + 1][0].filter(z => z.core).map(z => z.core.link)) : new Set();
          for (const z of L) { const [x, y, w, h] = z.r; if (z.core) { v.push(B(x, y, w, h, z0, up.has(z.core.link) ? z1 : z1 + 1.6, /l|b/.test(z.core.st) ? "violet" : "warn", "X", { top: "x", lv: 0 })); continue; }
            const k = (z.c || "")[0], m = MAT[k] || "glass"; v.push(B(x, y, w, h, z0, z1, m, MAT[k] ? k : "L", { fl: 1, role: k === "B" ? "m" : "p" })); } });
        return { v, st: [] };
      }
    };
    return P;
  }
  /* ---------- năm biến thể ---------- */
  const BASE_ISSUES = [
    "Đường tới cửa A1 còn dài: A1 có hai cửa (mình tự đặt). Cửa Bắc mở vào sân trước sảnh; sân này bị cụm sự kiện, sảnh FOYA, lõi sách bao ba phía, chỉ hở ra lối Tây, nên khách từ quảng trường đi vòng khoảng 55 m. Cửa Nam mở ra sân giữa; người đọc từ bãi xe, gầm xe đi dọc bờ sông ngoài trời khoảng 75 m.",
    "Đọc mở B1w tầng 2 (168 m²) chưa chạm hành lang nào: hành lang tầng 2 dừng ở x 16,8, B1w bắt đầu ở x 18,6, giữa là khoảng trống 1,8 m. Đây là khe giữa hai khối chứ không phải thiếu cửa, nên tự đặt cửa cũng không vào được.",
    "Tầng 3 không có vệ sinh. Chỗ xa nhất của đọc yên tĩnh B2 cách thang gần nhất (thang Bắc) khoảng 55 m, quá mốc thoát nạn 30 m; tầng 3 chỉ có thang ở đầu Bắc.",
    "Người đọc không có thang máy: thang Bắc chỉ là thang bộ, thang máy duy nhất là lõi sách (cửa vào từ kho đóng, chỉ nhân viên).",
    "Tầng 3: bàn đọc Tây Bắc B1n cách dải bàn đọc B1f 0,12 m nên không mở cửa thẳng được, phải đi vòng qua lõi sách.",
    "Không có cửa sổ Bắc/Nam: cà phê A3 (kẹp giữa hành lang sự kiện và trưng bày), quầy A4, xử lý C2 (tầng 1); tra cứu số B5 tầng 2 (kẹp giữa lõi sách và học nhóm).",
    "Tiếng ồn: tra cứu số B5 chung vách học nhóm B4b; đọc mở B1w tầng 2 nằm ngay trên thiếu nhi B3.",
    "Bảo vệ E3 ở góc Tây Nam: trông tốt gầm xe, lối nhân viên, thang Tây Nam, nhưng cách cửa chính A1 khoảng 50 m nên phải trông cửa chính bằng camera."
  ];
  const BASE_OK = [
    "Gầm để xe dưới dải văn phòng tầng 2 (khoảng 18 × 8,7 m, chứa khoảng 45 xe máy) ngay cạnh bảo vệ E3, lối nhân viên, thang Tây Nam: nhân viên gửi xe xong lên thẳng văn phòng. Gầm thông ra bãi xe Nam, có mái che.",
    "Cụm sự kiện D1–D4, vệ sinh sự kiện, hành lang sự kiện, cà phê, trưng bày liền một khối, ngoài giờ tách hẳn khỏi thư viện bằng một cửa khóa giữa A1 và lối vào quầy.",
    "Dải nghiệp vụ dọc lối Tây liền nhau: tiếp nhận C4 → xử lý C2 → lưu trữ C3 → kho đóng C1 → lõi sách lên thẳng tầng 2, 3.",
    "Văn phòng E1 tách hai phòng: chỗ làm việc và phòng họp (đúng ý thầy), cạnh phòng nhân viên E2 và vệ sinh nhân viên, cùng một hành lang, có cửa sổ Nam.",
    "Tổng sàn 2.978 m², đủ 24 loại phòng trong ±10% đề."
  ];
  const VARS = [
    { sfx: "", code: "F.2", name: "Bản của bạn (09/11), giữ 100%", tag: "Đúng từng khối trong file; thêm cửa, người trực, gầm để xe, tuyến xe",
      intro: `<p class="lede">F.2 là đúng file <b>xep-khoi-arc329.json</b> bạn gửi ngày 09/11: mọi khối giữ nguyên vị trí, kích thước, tầng. Mình chỉ thêm cửa, người trực, gầm để xe dưới dải văn phòng tầng 2 và tuyến xe trên tổng mặt bằng. File xếp khối chưa có cửa, nên cửa do mình tự đặt ở chỗ hợp lý: chỗ hai khối chạm nhau thì mở cửa theo đường đi thường gặp; A1 mở cả hai phía Bắc, Nam. Lỗi chỉ tính khi các khối không chạm nhau, không tính chuyện thiếu cửa. Những chỗ chưa ổn được liệt kê, không sửa ở đây (xem F.2a–F.2e).</p>`,
      notes: BASE_OK, issues: BASE_ISSUES },
    { sfx: "a", code: "F.2a", name: "Bảo vệ ở cửa Nam A1, hiên có mái từ gầm xe", tag: "Dời E3 ra cửa Nam A1; thêm hiên có mái dọc bờ sông",
      fix: ["Bảo vệ E3 dời từ góc Tây Nam ra sân giữa, sát cửa Nam A1 (cách khoảng 3 m), nhìn sân giữa và hiên từ gầm xe. Góc Tây Nam còn camera.", "Hiên có mái 2,9 m dọc bờ sông từ gầm xe tới sân giữa: vẫn khoảng 75 m tới cửa Nam A1 nhưng có mái che suốt đường (bản gốc đi ngoài trời)."],
      mod(c) { const a1 = c.get(c.r1, "A1"); const e3 = c.get(c.r1, "E3"); e3.r = [25.09, 42.47, 3.5, 4.3]; e3.n = "Trực bảo vệ (cửa Nam A1)"; e3.ctl = "sk"; e3.d = [["A1", 0.9, "nv"]];
        const h9 = c.get(c.r1, "H9"); h9.d = h9.d.filter(d => d[0] !== "E3"); c.s1.find(s => /Bảo vệ/.test(s.t)).x = 26.8; c.s1.find(s => /Bảo vệ/.test(s.t)).y = 44.6; c.s1.find(s => /Bảo vệ/.test(s.t)).t = "Bảo vệ"; },
      routes: { delivery: [[[2.2, 112], [2.2, 104], [2.2, 66.5], [6.1, 66.5]]], fire: [[[-3, -12], [2.2, -4], [2.2, 102]], [[2.2, -2], [34, 7]]], moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]], [[20, 95], [22, 86]]], lib: [[[24, 86], [40, 86], [40, 46], [23, 46], [21.8, 42.5]]], event: [[[15, 6], [3.5, 10], [3.5, 29], [20, 29], [21.5, 34.3]]] },
      routeNames: { lib: "Người đọc: gửi xe trong gầm, đi hiên có mái dọc bờ sông, vào cửa Nam A1 (khoảng 75 m)", event: "Khách sự kiện: từ quảng trường vào sân trước sảnh, cửa Bắc A1" },
      labels: [[15, 29.3, "Sân trước sảnh"], [30, 55, "Sân giữa"], [23.5, 85, "Gầm để xe"], [40.2, 66, "Hiên có mái"]] },
    { sfx: "b", code: "F.2b", name: "Bảo vệ ở cửa Bắc, bãi xe máy phụ trước sảnh", tag: "E3 ra sân trước sảnh, cạnh cửa Bắc A1; sân Tây làm bãi xe máy phụ",
      fix: ["Bảo vệ E3 dời ra mép Bắc sân trước sảnh, áp lưng vào phòng đa năng, nhìn thẳng cửa Bắc A1 (khoảng 9 m), nhìn bãi xe máy phụ và lối Tây.", "Phần phía Tây sân trước sảnh (x 6–13,5) làm bãi xe máy phụ khoảng 25 xe, vào từ lối Tây: tới cửa A1 khoảng 12 m.", "Gầm xe phía Nam để cho nhân viên; góc Tây Nam dùng camera."],
      mod(c) { const e3 = c.get(c.r1, "E3"); e3.r = [13.5, 24.3, 4.591, 3.289]; e3.n = "Trực bảo vệ (nhìn cửa Bắc A1)"; e3.ctl = "sk"; e3.d = [["S", 0.9, "nv"]];
        const h9 = c.get(c.r1, "H9"); h9.d = h9.d.filter(d => d[0] !== "E3"); const s = c.s1.find(s => /Bảo vệ/.test(s.t)); s.x = 15.8; s.y = 26; s.t = "Bảo vệ"; },
      extra: [[[[9, 26], [17, 32], [21, 34.3]], "rLib", "Xe máy phụ → cửa A1"]],
      labels: [[9.8, 30, "Bãi xe máy phụ ~25 xe"], [30, 55, "Sân giữa"], [23.5, 85, "Gầm để xe nhân viên"]] },
    { sfx: "c", code: "F.2c", name: "Thông tầng 2–3, thêm thang Đông Nam, vệ sinh tầng 3", tag: "Nối B1w, thêm thang thoát hiểm Đông Nam 3 tầng, vệ sinh tầng 3",
      fix: ["Tầng 2: hành lang đọc nới thêm 1,8 m ở đoạn trên thiếu nhi (x 16,8–18,6, y 67,5–76) để vào được đọc mở B1w.", "Thang thoát hiểm Đông Nam 3 tầng (3,6 × 4,3 m) ở khe giữa thiếu nhi B3 và kỹ thuật E4: tầng 3 có 2 thang, B2 cách thang khoảng 10 m. Đây là thang thoát hiểm, không phải thang đi lại hằng ngày: cửa tầng 2, 3 là cửa chống cháy tự đóng; cửa tầng 1 chỉ đẩy ra ngoài, có chuông báo, phía ngoài không có tay nắm. Khách không vào khu đọc bằng thang này được; ai mang sách ra lối này thì chuông kêu.", "Tầng 3 thêm vệ sinh 2,6 × 4 m sát thang mới; bàn đọc B1n dời 0,12 m cho khít dải B1f (giữ diện tích).", "Bỏ vệ sinh nhân viên riêng ở tầng 2 (nhân viên dùng vệ sinh thư viện tầng 2) để tổng vệ sinh vẫn trong +10% đề khi thêm vệ sinh tầng 3.", "Bù diện tích để tổng sàn không quá 3.000 m²: lối vào quầy HL2 tầng 1 chỉ dài tới quầy A4 (bỏ đoạn 11,4 m phía Nam, sân giữa rộng thêm); sảnh thang Tây Nam tầng 2 thu còn 4,4 × 2,6 m."],
      mod(c) { c.get(c.r1, "HL2").r = [18.584, 42.445, 3, 13.615]; c.get(c.r2, "HQt").r = [10.18, 83, 4.413, 2.6];
        c.r2.push({ id: "HZ2", c: "circ", n: "Hành lang tới đọc mở B1w", r: [16.8, 67.48, 1.79, 3], ctl: "tv", nz: 1, d: [["HZ", 1.6, "o"], ["B1w", 1.6, "o"]] });
        c.r1.push({ id: "STE", n: "Thang thoát hiểm Đông Nam (chỉ khi khẩn cấp)", r: [34.5, 75.98, 3.6, 4.28], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["W", 1.2, "tnbd"]] });
        c.r2.push({ id: "STE2", n: "Thang thoát hiểm Đông Nam", r: [34.5, 75.98, 3.6, 4.28], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B1w", 1.2, "thang"]] });
        c.r3.push({ id: "STE3b", n: "Thang thoát hiểm Đông Nam", r: [34.5, 75.88, 3.6, 4.28], ctl: "tv", nz: 1, core: { st: "u", link: "STE" }, d: [["B2", 1.2, "thang"], ["WC3", 0.9, "p"]] });
        c.r3.push({ id: "WC3", c: "E5", n: "Vệ sinh tầng 3", r: [31.9, 75.88, 2.6, 4], ctl: "tv", nz: 1, wc: KT, d: [["B2", 0.9, "p"]] });
        c.del(c.r2, "WCL1"); c.del(c.r2, "H9r"); c.get(c.r2, "E2").d = []; c.get(c.r2, "HZ").d = c.get(c.r2, "HZ").d.filter(d => d[0] !== "WCL1");
        c.get(c.r3, "B1n").r = [6.21, 38.29, 8.39, 9.442]; c.get(c.r3, "B1n").d = [["B1f", 1.6, "o"]];
        const w2 = c.get(c.r2, "WCL2"); w2.r = [6.09, 64.45, 6.5, 3.031]; }
    },
    { sfx: "d", code: "F.2d", name: "Thang máy cho người đọc, cửa mái, tách B5 khỏi học nhóm", tag: "Thang Bắc thành thang bộ + thang máy; cửa mái cho A3; vệ sinh tầng 2 làm đệm",
      fix: ["Thang Bắc (tầng 1–3) thành thang bộ + thang máy: người đọc, người khuyết tật lên tầng 2, 3 sau cổng từ.", "Cà phê A3 tầng 1 không có tầng trên che: mở cửa mái hướng Bắc (ô ☀). Quầy A4 nằm dưới hành lang tầng 2 nên vẫn chưa có sáng tự nhiên.", "Tầng 2: đổi chỗ vệ sinh WCL2 lên đầu dãy học nhóm, làm vùng đệm giữa tra cứu số B5 và học nhóm (dãy học nhóm dời xuống 3,03 m)."],
      mod(c) { for (const [L, id] of [[c.r1, "STN"], [c.r2, "STS"], [c.r3, "STE3"]]) { const z = c.get(L, id); z.core.st = "u+l"; z.n = z.n.replace("Thang bộ", "Thang bộ + thang máy"); }
        c.get(c.r1, "A3").top = N; c.get(c.r1, "A4").top = N;
        c.get(c.r2, "WCL2").r = [6.09, 49.21, 6.5, 3.031];
        [["B4b", 52.241], ["B4c", 56.051], ["B4a", 59.861], ["B4d", 63.671]].forEach(([id, y]) => { c.get(c.r2, id).r[1] = y; }); }
    },
    { sfx: "e", code: "F.2e", name: "Gộp F.2a + F.2c + F.2d: bản sửa ít đầy đủ", tag: "Bảo vệ cửa Nam, hiên từ gầm xe, thông tầng 2–3, thang máy người đọc",
      fix: ["Gộp các chỗ sửa của F.2a, F.2c, F.2d. Bố cục, kích thước mọi phòng giữ như bản của bạn; chỉ dời E3, WCL2, dãy học nhóm, B1n và thêm hành lang 15 m², thang Đông Nam, vệ sinh tầng 3."] }
  ];
  VARS[5].mod = c => { VARS[1].mod(c); VARS[3].mod(c); VARS[4].mod(c); };
  VARS[5].routes = VARS[1].routes; VARS[5].routeNames = VARS[1].routeNames; VARS[5].labels = VARS[1].labels;
  G.CHOT = G.CHOT || [];
  G.F2PLANS = VARS.map(v => make(v));
  for (const p of G.F2PLANS) G.CHOT.push(p);
})(window.G3);
