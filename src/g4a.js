
/* ================= Phát triển 6 ý tưởng đã chọn (phần 1: Cầu dây văng, Khe Hải Vân, Làng sách) ================= */
/* Hướng: mặt dài 104 m nhìn ra sông Hàn ở phía Đông (x tăng về Đông, y tăng về Nam). */
(function (G) {
  const { B, SH, PO, S3, LN, col, wall, seg, grid, range, zig, inPoly } = G.K;
  // mặt đứng: dac đặc, kinh kính trần, lam kính + lam đứng, dua kính + mái đua
  const FA = { doc: { N: "kinh", E: "lam", S: "dua", W: "dac" }, cong: { N: "lam", E: "dua", S: "dua", W: "dac" }, su: { N: "dac", E: "dua", S: "dac", W: "dac" }, nhi: { N: "kinh", E: "lam", S: "dua", W: "dac" }, dac: { N: "dac", E: "dac", S: "dac", W: "dac" } };
  const Z = k => 0.45 + 4.5 * k;
  const F1 = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  const stack = (x, y, w, d, zones, c, fa, o = {}) => zones.map((z, k) => z && F1(x, y, w, d, k, c, z, fa, o)).filter(Boolean);
  const mast = (x, y, w, d, h, o = {}) => B(x, y, w, d, 0, h, "blk", "X", { top: "blkTop", ...o });
  const segsOf = st => st.filter(s => s.t === "seg").map(s => [s.a, s.b]);
  function clip(pts, a, b, c) { const o = []; for (let i = 0; i < pts.length; i++) { const P = pts[i], Q = pts[(i + 1) % pts.length], fp = a * P[0] + b * P[1] + c, fq = a * Q[0] + b * Q[1] + c; if (fp >= 0) o.push(P); if ((fp >= 0) !== (fq >= 0)) { const t = fp / (fp - fq); o.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]); } } return o; }
  const cutY = (pts, y1, y2) => clip(clip(pts, 0, 1, -y1), 0, -1, y2);
  const cutX = (pts, x1, x2) => clip(clip(pts, 1, 0, -x1), -1, 0, x2);
  const stepsLN = (P0, P1, w0, w1, n) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n, p = [P0[0] + (P1[0] - P0[0]) * t, P0[1] + (P1[1] - P0[1]) * t, P0[2] + (P1[2] - P0[2]) * t + 0.02]; o.push([[p[0] + w0[0], p[1] + w0[1], p[2]], [p[0] + w1[0], p[1] + w1[1], p[2]]]); } return LN(o); };
  // cột theo lưới, chỉ giữ cột nằm trong các đa giác
  const colsIn = (polys, xs, ys, z1, z2) => { const o = []; for (const x of xs) for (const y of ys) { const p = polys.find(q => inPoly(q, x, y, 0.05)); if (p) o.push(col(x, y, z1, typeof z2 === "function" ? z2(x, y) : z2)); } return o; };
  // trụ thon và dây văng nửa quạt (giống g6_kit.js; viết lại ở đây để file tự chạy được)
  const rectC = (cx, cy, a, b) => [[cx - a / 2, cy - b / 2], [cx + a / 2, cy - b / 2], [cx + a / 2, cy + b / 2], [cx - a / 2, cy + b / 2]];
  const cen = q => q.reduce((s, p) => [s[0] + p[0] / q.length, s[1] + p[1] / q.length], [0, 0]);
  const pylon = (x0, y0, z0, x1, y1, z1, s0, s1, o = {}) => ({ k: "loft", bot: rectC(x0, y0, s0[0], s0[1]), topPts: rectC(x1, y1, s1[0], s1[1]), z1: z0, z2: z1, c: "sheet", zone: "X", top: "sheet", pyl: 1, ...o });
  const axisAt = (P, z) => { const t = (z - P.z1) / (P.z2 - P.z1), a = cen(P.bot), b = cen(P.topPts); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z]; };
  function stays(P, zA, zB, deck, off = [0, 0]) {
    const pc = axisAt(P, zA), dist = q => Math.hypot(q[0] - pc[0], q[1] - pc[1]);
    const ds = deck.slice().sort((p, q) => dist(p) - dist(q)), n = ds.length;
    return ds.map((q, i) => { const a = axisAt(P, n > 1 ? zA + (zB - zA) * i / (n - 1) : zB); return seg([a[0] + off[0], a[1] + off[1], a[2]], q); });
  }
  const cables = st => LN(st.filter(s => s.t === "seg").map(s => [s.a, s.b]), "ink", { cab: 1 });
  // dây cùng một phía trụ (theo trục k: 0 là x, 1 là y) gom một bó nửa quạt, mỗi dây một điểm neo riêng
  const fan = (P, zA, zB, pts, k) => { const a = axisAt(P, zA), lo = pts.filter(p => p[k] < a[k]), hi = pts.filter(p => p[k] >= a[k]), o = d => k ? [0, d] : [d, 0];
    return [...(lo.length ? stays(P, zA, zB, lo, o(-0.35)) : []), ...(hi.length ? stays(P, zA, zB, hi, o(0.35)) : [])]; };
  const pts = (xs, ys, z) => xs.flatMap(x => ys.map(y => [x, y, z]));
  const axisSeg = P => seg(axisAt(P, P.z1), axisAt(P, P.z2));
  G.K4 = { FA, Z, F1, stack, mast, segsOf, clip, cutY, cutX, stepsLN, colsIn, rectC, pylon, axisAt, stays, cables, fan, pts, axisSeg };
  const M = { role: "m" };
  const I = [];
  const W = (h, p) => [h, p];

  /* ---------------- 1. CẦU DÂY VĂNG ---------------- */
  I.push({
    id: "cau1", fam: "cau", code: "1.1", name: "Hai trụ đối xứng", rule: "Đối xứng gương", tag: "Hộp đọc treo giữa hai trụ, hai nhà thấp giống nhau ở hai đầu",
    story: "Hộp đọc hai tầng treo giữa hai trụ bê tông bằng dây văng; gầm hộp là sảnh và quảng trường có mái che nối thẳng bậc thang Bạch Đằng. Hai đầu là hai nhà thấp cùng kích thước: nhà sự kiện ở Bắc, nhà thiếu nhi ở Nam. Toàn bộ đối xứng qua trục ngang giữa nhà, trục này cũng là lối vào chính từ bậc thang.",
    why: [W("Quy luật hình khối", "Đối xứng gương qua trục Đông–Tây: hai trụ, hai bó dây, hai nhà đầu hồi giống nhau. Hình khối tĩnh, trang trọng; sự sinh động nằm ở dây văng và khoảng trống dưới gầm."), W("Nắng và chói", "Mặt Đông hộp đọc có lam đứng chặn nắng sáng thấp từ phía sông; mặt Tây tựa vào lưng dịch vụ đặc; mặt Bắc kính trần lấy sáng tán xạ cho khu đọc yên tĩnh; mặt Nam có mái đua."), W("Gió và mưa", "Gầm hộp cao 5 m cho gió Đông Nam mùa hè thổi xuyên quảng trường. Nhà sự kiện kín ở đầu Bắc chắn gió mùa Đông Bắc và mưa tạt."), W("Công năng", "Nhà sự kiện có lối riêng từ phố phía Bắc, dùng vệ sinh ở đầu Bắc lưng dịch vụ; ngoài giờ không đi qua khu đọc.")],
    kc: { he: "Hộp đọc là hai dàn thép cao 2 tầng (9 m) ở hai mặt dọc, tựa lên hai trụ bê tông thon (chân 1,4 × 2,4 m, đỉnh 0,7 × 1,2 m); hai đầu hộp đua 6 m được dây văng nửa quạt đỡ thêm, mỗi dây neo ở một cao độ riêng trên trụ. Hai nhà đầu và lưng dịch vụ là kết cấu riêng.", nhip: "26 m giữa hai trụ (dàn cao 9 m)", cx: "6 m ở hai đầu, có dây văng" },
    qa: [["Gầm hộp có bị gió lùa, bị tối?", "Gầm cao 5 m, sảnh kính nằm giữa, hai bên để mở cho gió và ánh sáng vào. Mùa đông đóng vách kính trượt phía Bắc của sảnh."]],
    cut: "Hộp đọc: foam 9 × 20 × 4,5 cm. Trụ: que gỗ vót thon 0,7 → 0,35 cm cao 13 cm. Dây: chỉ trắng, neo rải trên 3 cm đầu trụ. Hai nhà đầu: foam 9 × 8 × 3 cm. Lưng dịch vụ: foam xám 3 × 20 × 4,5 cm.",
    roleOf: () => "p",
    lab: [[21, 50, 14.45, "Khối chính · Hộp đọc treo giữa hai trụ", 1], [21, 16, 6.45, "Khối phụ · Nhà sự kiện", 2], [21, 84, 6.45, "Khối phụ · Nhà thiếu nhi", 2], [7, 50, 9.45, "Khối phụ · Lưng dịch vụ phía Tây", 2], [21, 46, 4.95, "Sảnh kính dưới gầm"]],
    build() {
      const P1 = pylon(21, 36.5, 0, 21, 36.5, 26, [1.4, 2.4], [0.7, 1.2], M), P2 = pylon(21, 63.5, 0, 21, 63.5, 26, [1.4, 2.4], [0.7, 1.2], M);
      const v = [B(12, 30, 18, 40, 5.45, 9.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(12, 30, 18, 40, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), P1, P2,
        B(12, 8, 18, 16, 0.45, 6.45, "blk", "D", { fa: FA.su, fl: 1 }), B(12, 76, 18, 16, 0.45, 6.45, "sheet", "B", { fa: FA.nhi, fl: 1 }),
        B(14, 41, 14, 18, 0.45, 4.95, "glass", "A", { fa: FA.cong }), B(31, 40, 4, 8, 0.45, 3.95, "glass", "A", { fa: FA.cong }), B(31, 52, 4, 8, 0.45, 3.95, "glass", "A", { fa: FA.cong }),
        ...stack(4, 30, 6, 20, ["C", "C"], "stone", FA.dac), ...stack(4, 50, 6, 20, ["E", "E"], "stone", FA.dac)];
      const cb = [...fan(P1, 17.5, 25.5, pts([12, 30], [30, 32, 34, 39, 41, 43], 14.45), 0), ...fan(P2, 17.5, 25.5, pts([12, 30], [57, 59, 61, 66, 68, 70], 14.45), 0)];
      v.push(cables(cb));
      const st = [wall(20.3, 35.3, 1.4, 2.4, 0, 26), wall(20.3, 62.3, 1.4, 2.4, 0, 26), ...cb, ...zig(12, 30, 12, 70, 5.45, 14.45, 8), ...zig(30, 30, 30, 70, 5.45, 14.45, 8), ...grid([12, 21, 30], [8, 24], 0.45, 6.45), ...grid([12, 21, 30], [76, 92], 0.45, 6.45), ...grid([14, 28], [41, 50, 59], 0.45, 4.95), wall(4, 30, 0.25, 40, 0.45, 9.45), wall(9.75, 30, 0.25, 40, 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "cau2", fam: "cau", code: "1.2", name: "Một trụ nghiêng", rule: "Bất đối xứng cân bằng", tag: "Một trụ nghiêng ở đầu Bắc, lõi đặc và nhà thấp ở đầu Nam",
    story: "Cầu Trần Thị Lý của Đà Nẵng chỉ có một trụ tháp nghiêng. Phương án dùng đúng ý đó: một trụ bê tông nghiêng về phía Bắc, bó dây văng đỡ nửa Bắc của hộp đọc; nửa Nam tựa lên một lõi thang đặc. Đầu Bắc cao và nhẹ, đầu Nam thấp và nặng, hai bên cân nhau như hai đầu đòn gánh.",
    why: [W("Quy luật hình khối", "Bất đối xứng cân bằng: trụ cao, mảnh ở đầu Bắc cân với lõi đặc và nhà thiếu nhi thấp, chắc ở đầu Nam. Hình khối có hướng chuyển động rõ từ Bắc xuống Nam."), W("Nắng và chói", "Mặt Đông hộp đọc dùng lam đứng; mặt Tây là lưng dịch vụ đặc che nắng chiều; mặt Bắc kính lấy sáng tán xạ; mặt Nam có mái đua."), W("Gió và mưa", "Gầm hộp mở về phía Nam và Đông để đón gió Đông Nam. Đầu Bắc có nhà sự kiện và cà phê kín, chắn gió mùa Đông Bắc."), W("Công năng", "Nhà sự kiện và cà phê ở góc Bắc, gần phố phía Bắc và bậc thang, hoạt động ngoài giờ độc lập với khu đọc.")],
    kc: { he: "Trụ nghiêng bê tông cao 30 m, dây văng đỡ nửa Bắc hộp đọc; nửa Nam tựa lên lõi thang bê tông 6 × 6 m và hai cột. Hộp là hai dàn thép cao 9 m ở hai mặt dọc.", nhip: "28 m (từ điểm treo cuối đến lõi Nam)", cx: "Không, đầu Bắc treo bằng dây" },
    qa: [["Trụ nghiêng có đổ không?", "Trụ nghiêng ra phía sau (về phía Bắc), ngược chiều với hộp đọc, nên trọng lượng của trụ cân với lực kéo của dây; thêm bốn dây néo xuống khối neo bê tông dưới quảng trường Bắc."]],
    cut: "Trụ nghiêng: que gỗ vót thon 0,7 → 0,4 cm, cắt vát hai đầu, nghiêng 13°; dây neo rải trên 3,5 cm đầu trụ. Hộp đọc: foam 9 × 20 × 4,5 cm. Lõi: khối foam đen 3 × 3 × 7 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[21, 44, 14.45, "Khối chính · Hộp đọc treo trên trụ nghiêng", 1], [21, 3, 30, "Trụ nghiêng"], [10, 19, 6.45, "Khối phụ · Nhà sự kiện", 2], [22, 78, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [7, 62, 9.45, "Khối phụ · Lưng dịch vụ", 2], [30, 15, 4.95, "Khối phụ · Cà phê", 2]],
    build() {
      const P = pylon(21, 11.5, 0, 21, 4.5, 30, [1.4, 2.4], [0.8, 1.2], M);
      const v = [P,
        B(12, 24, 18, 40, 5.45, 9.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(12, 24, 18, 40, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(18, 58, 6, 6, 0.45, 14.45, "stone", "X", { top: "stoneTop" }),
        B(4, 10, 13, 14, 0.45, 6.45, "blk", "D", { fa: FA.su, fl: 1 }), B(24, 8, 12, 14, 0.45, 4.95, "glass", "A", { fa: FA.cong }), B(14, 30, 14, 14, 0.45, 4.95, "glass", "A", { fa: FA.cong }),
        B(14, 70, 16, 16, 0.45, 4.95, "sheet", "B", { fa: FA.nhi, top: "grass" }),
        F1(4, 32, 6, 24, 0, "stone", "E", FA.dac), F1(4, 56, 6, 30, 0, "stone", "C", FA.dac), F1(4, 32, 6, 14, 1, "stone", "D", FA.dac), F1(4, 46, 6, 20, 1, "stone", "E", FA.dac), F1(4, 66, 6, 20, 1, "stone", "C", FA.dac)];
      const cb = [...fan(P, 22.5, 29.5, pts([12, 30], [26, 30, 34, 38, 42, 46], 14.45), 0), ...fan(P, 22.5, 29.5, pts([15, 18, 24, 27], [0.6], 0.45), 0)];
      v.push(cables(cb));
      const st = [axisSeg(P), wall(18, 58, 6, 6, 0.45, 14.45), col(12, 64, 0.45, 5.45), col(30, 64, 0.45, 5.45), ...cb, ...zig(12, 24, 12, 64, 5.45, 14.45, 8), ...zig(30, 24, 30, 64, 5.45, 14.45, 8),
        ...grid([4, 10.5, 17], [10, 24], 0.45, 6.45), ...grid([24, 36], [8, 22], 0.45, 4.95), ...grid([14, 28], [30, 44], 0.45, 4.95), ...grid([14, 22, 30], [70, 86], 0.45, 4.95), wall(4, 32, 0.25, 54, 0.45, 9.45), wall(9.75, 32, 0.25, 54, 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "cau3", fam: "cau", code: "1.3", name: "Hai hộp treo so le", rule: "Lệch có kiểm soát", tag: "Hai hộp đọc treo trên hai trụ, lệch nhau 6 m và 1 tầng",
    story: "Thay một hộp dài là hai hộp ngắn, mỗi hộp treo trên một trụ riêng bằng dây văng hai phía như một cây cầu một trụ. Hộp Bắc thấp hơn, lệch về phía Tây; hộp Nam cao hơn đúng một tầng, lệch về phía sông. Một cầu kính ở tầng 3 nối hai hộp. Dưới hộp Nam là nhà thiếu nhi có sân riêng.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: hai hộp giống nhau về tiết diện, lệch nhau đúng 6 m theo phương ngang và đúng 1 tầng theo chiều cao. Nhìn có vẻ tự do nhưng mọi cạnh vẫn nằm trên lưới, cột và trụ thẳng một mạch."), W("Nắng và chói", "Hai hộp có lam đứng mặt Đông, kính trần mặt Bắc, mái đua mặt Nam; lưng dịch vụ đặc phía Tây. Hộp Nam cao hơn che bớt nắng trưa cho sân thiếu nhi bên dưới."), W("Gió và mưa", "Khoảng hở giữa hai hộp mở theo hướng Đông Nam, đón gió mùa hè vào quảng trường giữa nhà."), W("Công năng", "Nhà sự kiện riêng ở đầu Bắc; khu đọc chia hai: hộp Bắc đọc mở, hộp Nam đọc yên tĩnh và học nhóm, xa nhà sự kiện.")],
    kc: { he: "Mỗi hộp là hai dàn thép cao 2 tầng, treo trên một trụ bê tông ở giữa bằng dây văng cân hai phía, bốn góc có cột mảnh giữ ổn định. Cầu kính nhịp 12 m giữa hai hộp.", nhip: "22–24 m (mỗi hộp)", cx: "11–12 m mỗi phía trụ, có dây văng" },
    qa: [["Vì sao không làm một hộp cho đơn giản?", "Hai hộp tách khu đọc mở và khu đọc yên tĩnh, đồng thời tạo khoảng trống giữa nhà cho gió và ánh sáng. Kết cấu mỗi hộp vẫn đơn giản vì giống hệt nhau."]],
    cut: "Hai hộp foam 9 × 11 × 4,5 cm, một hộp kê cao hơn 2,25 cm. Hai trụ que gỗ vót thon 0,7 → 0,35 cm cao 12 và 14 cm, dây neo rải trên 3 cm đầu trụ. Cầu kính: mica 3 × 7 cm.",
    roleOf: () => "p",
    lab: [[23, 69, 18.95, "Khối chính · Hai hộp đọc treo so le", 1], [17, 33, 14.45, "Hộp đọc mở"], [19, 11, 6.45, "Khối phụ · Nhà sự kiện", 2], [5, 70, 9.45, "Khối phụ · Lưng dịch vụ", 2], [23, 69, 4.95, "Khối phụ · Nhà thiếu nhi dưới gầm", 2]],
    build() {
      const P1 = pylon(17, 32.5, 0, 17, 32.5, 24, [1.4, 2.4], [0.7, 1.2], M), P2 = pylon(23, 68.5, 0, 23, 68.5, 28, [1.4, 2.4], [0.7, 1.2], M);
      const v = [B(8, 22, 18, 22, 5.45, 9.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(8, 22, 18, 22, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }),
        B(14, 58, 18, 22, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(14, 58, 18, 22, 14.45, 18.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }),
        B(20, 44, 6, 14, 9.95, 14.45, "glass", "L", { fa: { N: "kinh", E: "lam", S: "kinh", W: "lam" }, ...M }), P1, P2,
        B(10, 4, 18, 14, 0.45, 6.45, "blk", "D", { fa: FA.su, fl: 1 }), B(10, 26, 14, 14, 0.45, 4.95, "glass", "A", { fa: FA.cong }), B(28, 26, 8, 12, 0.45, 4.95, "glass", "A", { fa: FA.cong }),
        B(16, 62, 14, 14, 0.45, 4.95, "sheet", "B", { fa: FA.nhi }),
        F1(2, 48, 6, 22, 0, "stone", "C", FA.dac), F1(2, 70, 6, 22, 0, "stone", "E", FA.dac), F1(2, 48, 6, 12, 1, "stone", "D", FA.dac), F1(2, 60, 6, 16, 1, "stone", "C", FA.dac), F1(2, 76, 6, 16, 1, "stone", "E", FA.dac)];
      const cb = [...fan(P1, 16.5, 23.5, pts([8, 26], [23, 25.5, 28, 37, 39.5, 42], 14.45), 0), ...fan(P2, 21, 27.5, pts([14, 32], [59, 61.5, 64, 73, 75.5, 78], 18.95), 0)];
      v.push(cables(cb));
      const st = [wall(16.3, 31.3, 1.4, 2.4, 0, 24), wall(22.3, 67.3, 1.4, 2.4, 0, 28), ...cb, ...zig(8, 22, 8, 44, 5.45, 14.45, 4), ...zig(26, 22, 26, 44, 5.45, 14.45, 4), ...zig(14, 58, 14, 80, 9.95, 18.95, 4), ...zig(32, 58, 32, 80, 9.95, 18.95, 4),
        ...grid([8, 26], [22, 44], 0.45, 5.45), ...grid([14, 32], [58, 80], 0.45, 9.95), ...grid([10, 19, 28], [4, 18], 0.45, 6.45), ...grid([16, 30], [62, 76], 0.45, 4.95), wall(2, 48, 0.25, 44, 0.45, 9.45), wall(7.75, 48, 0.25, 44, 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "cau4", fam: "cau", code: "1.4", name: "Lưng đặc phía Tây", rule: "Tương phản nặng – nhẹ", tag: "Lưng đá đặc chắn nắng chiều, hộp đọc nhẹ treo nhô về phía sông",
    story: "Phía Tây là một lưng đá đặc hai tầng chạy dọc nhà, chứa kho, kỹ thuật, văn phòng và học nhóm; trên lưng có ba vây bê tông cao 24 m. Hộp đọc hai tầng một đầu gối lên lưng đá, đầu kia nhô ra phía sông và được dây văng từ ba vây kéo giữ. Bên dưới hộp là quảng trường không có cột.",
    why: [W("Quy luật hình khối", "Tương phản nặng – nhẹ, đặc – rỗng: lưng đá đặc, thấp, dài đối lập với hộp đọc nhẹ, sáng, treo nghiêng về phía sông. Ba vây lặp lại tạo nhịp cho lưng đá."), W("Nắng và chói", "Lưng đá đặc nhận toàn bộ nắng chiều gắt phía Trần Phú. Hộp đọc chỉ mở kính ra Bắc (kính trần) và Đông (lam đứng); mặt Nam có mái đua."), W("Gió và mưa", "Quảng trường dưới hộp không cột, gió Đông Nam từ sông thổi xuyên qua. Lưng đá chặn gió nóng phía Tây."), W("Công năng", "Toàn bộ phòng phục vụ nằm trong lưng đá, khu đọc và khu công cộng được giải phóng ra phía sông; nhà sự kiện riêng ở đầu Bắc.")],
    kc: { he: "Lưng đá là tường bê tông chịu lực hai lớp cách nhau 6 m, đỡ đầu Tây của hộp đọc. Đầu Đông hộp treo bằng dây văng nửa quạt từ ba vây bê tông mọc trên lưng: chân rộng 6 m, thon dần lên đỉnh cao 24 m và nghiêng về phía Tây, ngược phía hộp treo, nên tự cân với lực kéo của dây. Hộp là dầm hộp thép cao 2 tầng.", nhip: "18 m (từ lưng đá đến dây treo)", cx: "18 m về phía sông, treo bằng dây" },
    qa: [["Dây gần như nằm ngang có đỡ được không?", "Ba vây cao 24 m nên dây nghiêng khoảng 22°, đủ để đỡ. Ngoài ra hộp là dầm hộp cao 9 m nên chỉ cần dây đỡ thêm ở mép Đông."]],
    cut: "Lưng đá: foam đen 3 × 36 × 4,5 cm, 3 vây bìa cứng hình thang thon, chân 3 cm, đỉnh 0,5 cm, cao 7,3 cm. Hộp đọc: foam trắng 9 × 18 × 4,5 cm kê cao 2,5 cm. Dây: chỉ.",
    roleOf: () => "p",
    lab: [[21, 50, 14.45, "Khối chính · Hộp đọc treo về phía sông", 1], [7, 48, 24, "Khối phụ · Lưng đá và 3 vây neo dây", 2], [22, 13, 6.45, "Khối phụ · Nhà sự kiện", 2], [22, 81, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [22, 40, 4.95, "Quảng trường dưới hộp"]],
    build() {
      const FIN = [32, 50, 68].map(fy => pylon(7, fy, 9.45, 5, fy, 24, [6, 1.2], [1, 0.7], { c: "stone", top: "stoneTop" }));
      const v = [B(12, 32, 18, 36, 5.45, 9.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(12, 32, 18, 36, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }),
        F1(4, 14, 6, 30, 0, "stone", "E", FA.dac), F1(4, 44, 6, 42, 0, "stone", "C", FA.dac), F1(4, 14, 6, 14, 1, "stone", "D", FA.dac), F1(4, 28, 6, 30, 1, "stone", "E", FA.dac), F1(4, 58, 6, 28, 1, "stone", "B", FA.dac),
        ...FIN,
        B(12, 6, 20, 14, 0.45, 6.45, "blk", "D", { fa: FA.su, fl: 1 }), B(16, 36, 12, 14, 0.45, 4.95, "glass", "A", { fa: FA.cong }), B(16, 50, 12, 8, 0.45, 4.95, "glass", "A", { fa: FA.cong }),
        B(14, 74, 16, 14, 0.45, 4.95, "sheet", "B", { fa: FA.nhi, top: "grass" })];
      const cb = [[0, [33, 35.5, 38, 40.5]], [1, [45, 47.5, 52.5, 55]], [2, [59.5, 62, 64.5, 67]]].flatMap(([i, ys]) => stays(FIN[i], 17.5, 23.5, ys.map(y => [30, y, 14.45]), [0.6, 0]));
      v.push(cables(cb));
      const st = [wall(4, 14, 0.25, 72, 0.45, 9.45), wall(9.75, 14, 0.25, 72, 0.45, 9.45), ...[32, 50, 68].map(fy => wall(4, fy - 0.6, 6, 1.2, 9.45, 24)), ...cb,
        ...zig(12, 32, 12, 68, 5.45, 14.45, 6), ...zig(30, 32, 30, 68, 5.45, 14.45, 6), ...grid([12, 22, 32], [6, 20], 0.45, 6.45), ...grid([16, 28], [36, 58], 0.45, 4.95), ...grid([14, 22, 30], [74, 88], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------------- 2. KHE HẢI VÂN ---------------- */
  const roofT2 = (pts, zone, zt, fa, o = {}) => PO(pts, 4.95, zt, "blkTop", zone, { fa, fl: 1, top: "grass", ...o });
  const flatT1 = (pts, zone, c, fa, o = {}) => PO(pts, 0.45, 4.95, c, zone, { fa, fl: 1, ...o });

  I.push({
    id: "khe1", fam: "khe", code: "2.1", name: "Khe chéo đón gió Đông Nam", rule: "Bất đối xứng, trục chéo", tag: "Khe đèo chạy đúng hướng gió mùa hè, hai sườn đồi cao thấp khác nhau",
    story: "Hai sườn đồi mái cỏ tách nhau bởi một khe đèo rộng 6 m chạy chéo từ Đông Nam lên Tây Bắc, đúng hướng gió mát mùa hè từ sông thổi vào. Trong khe là bậc thang ngoài trời dẫn từ quảng trường lên tầng 2, hai cầu kính bắc qua khe. Sườn Nam cao hơn là khu đọc; sườn Bắc thấp hơn là sự kiện, sảnh, văn phòng.",
    why: [W("Quy luật hình khối", "Bất đối xứng theo trục chéo: hai khối không bằng nhau, mái dốc về phía sông và phía khe. Đường chéo tạo chuyển động, nhưng mọi tường ngoài vẫn vuông góc, chỉ cạnh dọc khe là xiên."), W("Nắng và chói", "Mặt Tây đặc. Mặt khe của sườn Nam quay về hướng Bắc nên dùng kính trần lấy sáng tán xạ cho khu đọc; mặt khe của sườn Bắc quay về Nam dùng lam. Mặt Đông dùng lam đứng."), W("Gió và mưa", "Khe chạy đúng hướng Đông Nam – Tây Bắc như một ống dẫn gió mùa hè xuyên qua giữa nhà; gió mùa Đông Bắc bị sườn Bắc chắn."), W("Công năng", "Sườn Bắc chứa khu ồn và khu hoạt động ngoài giờ, sườn Nam chứa khu đọc; khe 6 m là khoảng cách âm thanh tự nhiên giữa hai khu.")],
    kc: { he: "Khung bê tông lưới 7–8 × 8 m trong mỗi sườn; cột dọc theo cạnh khe. Mái là bản sàn nghiêng có lớp đất trồng cỏ. Hai cầu kính nhịp 7 m là dầm thép đơn giản.", nhip: "8 m", cx: "Không" },
    qa: [["Mái dốc làm tầng 2 thấp chỗ gần sông?", "Chỗ thấp nhất của tầng 2 vẫn cao khoảng 3,8 m. Chỗ cao phía Tây có gác lửng đọc sách."]],
    cut: "Hai khối foam cắt hình thang theo khe, mặt trên vát dốc về phía Đông, dán giấy cỏ. Bậc trong khe: các que bìa xếp bậc. Cầu kính: mica.",
    roleOf: () => "p",
    lab: [[12, 74, 15, "Khối chính · Sườn Nam (khu đọc)", 1], [12, 22, 12.6, "Khối phụ · Sườn Bắc (sự kiện, sảnh)", 2], [24, 54.5, 3, "Khối phụ · Khe đèo và bậc lên tầng 2", 2], [14, 45, 8.9, "Cầu kính"]],
    build() {
      const yN = x => 40 + (x - 6) * 16 / 24, yS = x => yN(x) + 6;
      const zN = (x, y) => 13.45 - 0.12 * (x - 8) - 0.05 * (y - 14), zS = (x, y) => 15.95 - 0.12 * (x - 8) - 0.05 * (86 - y);
      const NM = [[8, 14], [30, 14], [30, yN(30)], [8, yN(8)]], SM = [[8, yS(8)], [30, yS(30)], [30, 86], [8, 86]];
      const fN = { N: "dac", E: "lam", S: "lam", W: "dac" }, fS = { N: "kinh", E: "lam", S: "dua", W: "dac" };
      const nB = cutY(NM, 28, 70);
      const v = [PO(cutY(NM, 14, 28), 0.45, zN, "blk", "D", { fa: fN, fl: 1, top: "grass" }),
        flatT1(cutX(nB, 8, 16), "E", "blk", fN), flatT1(cutX(nB, 16, 30), "A", "glass", fN), roofT2(cutX(nB, 8, 16), "E", zN, fN), roofT2(cutX(nB, 16, 30), "B", zN, fN),
        flatT1(cutX(SM, 8, 18), "C", "blk", fS, M), flatT1(cutY(cutX(SM, 18, 30), 0, 70), "B", "glass", fS, M), flatT1(cutY(cutX(SM, 18, 30), 70, 86), "B", "sheet", fS, M), roofT2(SM, "B", zS, fS, M),
        S3([[30, yN(30) + 0.3, 0.45], [30, yS(30) - 0.3, 0.45], [8, yS(8) - 0.3, 4.95], [8, yN(8) + 0.3, 4.95]], 0.3, "zCirc")];
      v.push(stepsLN([30, yN(30) + 3, 0.45], [8, yN(8) + 3, 4.95], [0, -2.7], [0, 2.7], 24));
      for (const xb of [12, 20]) v.push(B(xb, yN(xb + 2) - 0.6, 4, 7.2, 4.95, 8.95, "glass", "L", { fa: { E: "lam", W: "lam" } }));
      const st = colsIn([NM, SM], [8, 16, 23, 30], range(14, 86, 8).concat([46, 52, 60]), 0.45, (x, y) => (y < yN(x) ? zN : zS)(x, y));
      return { v, st };
    }
  });

  I.push({
    id: "khe2", fam: "khe", code: "2.2", name: "Hai khe song song", rule: "Đối xứng, nhịp 3 khối", tag: "Ba khối, hai khe Đông–Tây, khối giữa cao nhất",
    story: "Ba khối nhà xếp dọc phố, cách nhau bởi hai khe Đông–Tây rộng 6 m. Khối giữa ba tầng là khu đọc chính, hai khối đầu thấp hơn giống nhau. Mỗi khe có bậc thang ngoài trời đi từ quảng trường lên tầng 2 và một cầu kính. Nhìn từ sông là một nhịp đối xứng: thấp – cao – thấp, giữa là hai khe sâu.",
    why: [W("Quy luật hình khối", "Đối xứng qua trục ngang và nhịp ba khối A – B – A: hai khối đầu giống nhau làm khung, khối giữa cao nhất là trọng tâm. Hai khe lặp lại tạo nhịp đặc – rỗng."), W("Nắng và chói", "Mặt Bắc của khối giữa nhìn vào khe dùng kính trần, ánh sáng tán xạ; mặt Nam nhìn vào khe có mái đua. Mặt Đông lam đứng, mặt Tây đặc."), W("Gió và mưa", "Hai khe Đông–Tây như hai ống thông gió đưa gió sông vào sâu trong nhà; mỗi khối đều được thông gió hai mặt."), W("Công năng", "Khối Bắc: sự kiện và cà phê, chạy được ngoài giờ. Khối giữa: sảnh, kho, đọc chính. Khối Nam: thiếu nhi, văn phòng, đọc yên tĩnh.")],
    kc: { he: "Ba khung bê tông độc lập lưới 7–10 × 6 m, mỗi khe là một khe lún tự nhiên. Cầu kính qua khe nhịp 6 m, dầm thép.", nhip: "10 m", cx: "Không" },
    qa: [["Khe hẹp 6 m có tối không?", "Khe chạy Đông–Tây nên buổi trưa nắng chiếu xuống đáy khe; hai mặt khe dùng kính và lam nên ánh sáng phản xạ vào các phòng hai bên."]],
    cut: "Ba khối foam rộng 10 cm: Bắc 9 × 4,75 cm, giữa 12 × 7 cm, Nam 9 × 4,75 cm (cao). Mặt trên vát nhẹ về phía Đông. Bậc trong khe: que bìa.",
    roleOf: () => "p",
    lab: [[12, 50, 14.7, "Khối chính · Khối giữa 3 tầng", 1], [18, 23, 10.2, "Khối phụ · Khối Bắc (sự kiện)", 2], [18, 77, 10.2, "Khối phụ · Khối Nam (thiếu nhi)", 2], [24, 35, 3, "Khe Đông–Tây"]],
    build() {
      const zl = (z0, x) => z0 - 0.04 * (x - 8);
      const SHx = (x, y, w, d, z1, top, c, zone, fa, o = {}) => SH(x, y, w, d, z1, zl(top, x + w), zl(top, x), "-x", c, zone, { fa, fl: 1, top: "grass", ...o });
      const fE = { N: "dac", E: "lam", S: "lam", W: "dac" }, fM = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fS = { N: "kinh", E: "lam", S: "dua", W: "dac" };
      const v = [SHx(8, 14, 14, 18, 0.45, 10.2, "blk", "D", fE), F1(22, 14, 6, 18, 0, "glass", "A", { ...fE, N: "lam" }), SHx(22, 14, 6, 18, 4.95, 10.2, "blk", "D", fE),
        F1(8, 38, 10, 24, 0, "blk", "C", fM, M), F1(18, 38, 10, 24, 0, "glass", "A", fM, M), F1(8, 38, 20, 24, 1, "sheet", "B", fM, M), SHx(8, 38, 20, 24, 9.45, 14.7, "sheet", "B", fM, M),
        F1(8, 68, 8, 18, 0, "blk", "E", fS), F1(16, 68, 12, 18, 0, "sheet", "B", fS), SHx(8, 68, 8, 18, 4.95, 10.2, "blk", "E", fS), SHx(16, 68, 12, 18, 4.95, 10.2, "sheet", "B", fS)];
      for (const [ya, yb] of [[32, 38], [62, 68]]) {
        v.push(S3([[28, ya + 0.3, 0.45], [28, yb - 0.3, 0.45], [14, yb - 0.3, 4.95], [14, ya + 0.3, 4.95]], 0.3, "zCirc"), stepsLN([28, (ya + yb) / 2, 0.45], [14, (ya + yb) / 2, 4.95], [0, -2.7], [0, 2.7], 16));
        v.push(B(9, ya - 0.3, 4, 6.6, 4.95, 8.95, "glass", "L", { fa: { E: "lam", W: "lam" } }));
      }
      const st = [...grid([8, 15, 22, 28], [14, 23, 32], 0.45, 10.2), ...grid([8, 18, 28], [38, 44, 50, 56, 62], 0.45, 14.7), ...grid([8, 16, 22, 28], [68, 77, 86], 0.45, 10.2)];
      return { v, st };
    }
  });

  I.push({
    id: "khe3", fam: "khe", code: "2.3", name: "Khe gãy khúc", rule: "Bất đối xứng, khối cài nhau", tag: "Khe đèo bẻ góc như đường đèo, hai khối chữ L cài vào nhau",
    story: "Khe đèo không đi thẳng mà bẻ góc ba lần như đường đèo Hải Vân: từ bậc thang Bạch Đằng đi lên, rẽ dọc giữa nhà, rồi rẽ ra phía Trần Phú. Hai khối chữ L cài vào nhau quanh khe; đoạn khe dọc ở tầng 2 là một sân đèo có mái trời, bên dưới là lối đi tầng 1. Góc cao nhất là khu đọc chính ba tầng nhìn ra sông.",
    why: [W("Quy luật hình khối", "Hai khối chữ L cài vào nhau (khối cài) quanh một khe gãy khúc: bất đối xứng, có chuyển động nhưng mọi cạnh vuông góc, mọi tường nằm trên lưới 2 m."), W("Nắng và chói", "Khối Nam có mặt Bắc nhìn vào khe dùng kính trần; mặt Đông lam đứng; mặt Tây đặc. Sân đèo ở tầng 2 được hai khối che nắng chiều."), W("Gió và mưa", "Đoạn khe Đông–Tây phía sông đón gió Đông Nam, đoạn khe dọc dẫn gió đi qua giữa nhà rồi thoát ra phía Trần Phú."), W("Công năng", "Khối chữ L phía Bắc: sự kiện, cà phê, kho; khối chữ L phía Nam: sảnh, đọc, thiếu nhi, văn phòng. Sân đèo tầng 2 là nơi đọc ngoài trời.")],
    kc: { he: "Hai khung bê tông lưới 8–10 × 7–8 m, mỗi khối chữ L có khe lún riêng. Sân đèo tầng 2 là bản sàn nhịp 6 m gối lên hai khối.", nhip: "10 m", cx: "Không" },
    qa: [["Khe gãy khúc có làm người đi bị lạc?", "Khe chỉ có ba đoạn thẳng, mỗi chỗ rẽ đều nhìn thấy đoạn tiếp theo. Sảnh chính nằm ngay ở chỗ rẽ thứ nhất."]],
    cut: "Hai khối chữ L cắt từ foam (ghép 2–3 hộp), khối Nam có một phần cao 3 tầng. Sân đèo: tấm bìa 3 × 14 cm.",
    roleOf: () => "p",
    lab: [[25, 47, 13.95, "Khối chính · Góc đọc 3 tầng (khối chữ L phía Nam)", 1], [14, 20, 9.45, "Khối phụ · Khối chữ L phía Bắc", 2], [17, 44, 5.2, "Khối phụ · Sân đèo tầng 2", 2], [25, 33, 2.5, "Bậc lên đèo"]],
    build() {
      const fN = { N: "dac", E: "lam", S: "lam", W: "dac" }, fS = { N: "kinh", E: "lam", S: "dua", W: "dac" };
      const v = [B(6, 12, 14, 18, 0.45, 9.45, "blk", "D", { fa: fN, fl: 1, top: "grass" }), F1(20, 12, 10, 18, 0, "glass", "A", { ...fN, N: "lam" }), F1(20, 12, 10, 18, 1, "blk", "B", { ...fN, N: "kinh" }, { top: "grass" }),
        F1(6, 30, 8, 22, 0, "blk", "C", fN), F1(6, 30, 8, 22, 1, "blk", "E", fN, { top: "grass" }),
        F1(20, 36, 10, 22, 0, "glass", "A", fS, M), F1(20, 36, 10, 22, 1, "sheet", "B", fS, M), F1(20, 36, 10, 22, 2, "sheet", "B", fS, { ...M, top: "grass" }),
        F1(6, 58, 10, 26, 0, "blk", "E", fS, M), F1(16, 58, 14, 26, 0, "sheet", "B", fS, M), F1(6, 58, 24, 26, 1, "sheet", "B", fS, { ...M, top: "grass" }),
        B(14, 30, 6, 28, 4.65, 4.95, "deck", "X", { role: "p" }), B(6, 52, 8, 6, 4.65, 4.95, "deck", "X", { role: "p" }),
        S3([[30, 30.3, 0.45], [30, 35.7, 0.45], [20, 35.7, 4.95], [20, 30.3, 4.95]], 0.3, "zCirc", "X", { role: "p" })];
      v.push(stepsLN([30, 33, 0.45], [20, 33, 4.95], [0, -2.7], [0, 2.7], 12));
      const st = [...grid([6, 13, 20, 30], [12, 21, 30], 0.45, 9.45), ...grid([6, 14], [38, 45, 52], 0.45, 9.45), ...grid([20, 25, 30], [36, 47, 58], 0.45, 13.95), ...grid([6, 16, 23, 30], [58, 66.7, 75.3, 84], 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "khe4", fam: "khe", code: "2.4", name: "Thung lũng ánh sáng", rule: "Đối xứng trục dọc", tag: "Hai cánh nhà mái nghiêng vào nhau, giữa là thung lũng Bắc–Nam",
    story: "Hai cánh nhà dài chạy dọc phố, mái nghiêng xuống về phía giữa như hai sườn núi, ở giữa là một thung lũng lộ thiên rộng 6 m chạy từ Bắc xuống Nam. Ba cầu kính bắc qua thung lũng ở tầng 2. Cánh Tây là lưng phục vụ và khu đọc yên tĩnh, cánh Đông là sự kiện, sảnh, thiếu nhi và khu đọc mở nhìn ra sông. Cuối thung lũng phía Nam là một quán cà phê nhỏ trong vườn.",
    why: [W("Quy luật hình khối", "Đối xứng qua trục dọc Bắc–Nam: hai cánh bằng nhau, mái nghiêng đối xứng thành hình chữ V. Ba cầu lặp đều tạo nhịp ngang cho thung lũng."), W("Nắng và chói", "Mặt Tây cánh Tây đặc. Hai mặt nhìn vào thung lũng dùng lam vì thung lũng hẹp và sâu, nắng chỉ xuống được buổi trưa. Mặt Đông cánh Đông lam đứng nhìn sông."), W("Gió và mưa", "Gió Đông thổi qua cánh Đông, xuống thung lũng rồi sang cánh Tây: mỗi phòng đọc đều có gió hai mặt. Mái chữ V gom nước về máng giữa."), W("Công năng", "Nhà sự kiện ở đầu Bắc cánh Đông có lối riêng từ phố phía Bắc; khu đọc yên tĩnh ở tầng 2 cánh Tây, cách khu sự kiện cả thung lũng.")],
    kc: { he: "Hai cánh là khung bê tông nhịp 10 m theo chiều ngang, cột cách 8 m theo chiều dọc. Mái nghiêng là bản sàn dốc. Ba cầu kính nhịp 6 m.", nhip: "10 m", cx: "Không" },
    qa: [["Thung lũng có bị mưa tạt vào phòng?", "Hai mặt thung lũng có lam và mái đua nhỏ; nước mưa chảy theo hai mái vào máng ở hai mép thung lũng, đáy thung lũng là sân lát có rãnh thoát."]],
    cut: "Hai khối foam 5 × 36 cm, mặt trên vát từ 7,25 cm (mép ngoài) xuống 5,25 cm (mép thung lũng). Ba cầu mica 3 × 2 cm.",
    roleOf: v => v.zone === "L" || v.y > 86.5 ? "p" : "m",
    lab: [[11, 50, 14.45, "Khối chính · Hai cánh nhà mái chữ V", 1], [19, 50, 6.9, "Khối phụ · Ba cầu kính", 2], [20, 92, 4.45, "Khối phụ · Cà phê cuối thung lũng", 2], [19, 30, 0.6, "Thung lũng Bắc–Nam"]],
    build() {
      const fW = { N: "dac", E: "lam", S: "dua", W: "dac" }, fE = { N: "kinh", E: "lam", S: "dua", W: "lam" };
      const v = [F1(6, 14, 10, 12, 0, "blk", "D", fW), F1(6, 26, 10, 30, 0, "blk", "E", fW), F1(6, 56, 10, 30, 0, "blk", "C", fW), SH(6, 14, 10, 72, 4.95, 10.45, 14.45, "-x", "blk", "B", { fa: fW, fl: 1, top: "grass" }),
        SH(22, 14, 10, 20, 0.45, 10.45, 14.45, "+x", "sheet", "D", { fa: { ...fE, N: "dac" }, fl: 1, top: "grass" }), F1(22, 34, 10, 24, 0, "glass", "A", fE), F1(22, 58, 10, 28, 0, "sheet", "B", fE), SH(22, 34, 10, 52, 4.95, 10.45, 14.45, "+x", "sheet", "B", { fa: fE, fl: 1, top: "grass" }),
        B(16, 88, 8, 8, 0.45, 4.45, "glass", "A", { fa: FA.cong, top: "grass" })];
      for (const y of [30, 50, 70]) v.push(B(16, y, 6, 4, 4.95, 8.95, "glass", "L", { fa: { N: "kinh", S: "kinh" } }));
      const st = [...grid([6, 16], range(14, 86, 8), 0.45, (x) => x === 6 ? 14.45 : 10.45), ...grid([22, 32], range(14, 86, 8), 0.45, x => x === 22 ? 10.45 : 14.45), ...grid([16, 24], [88, 96], 0.45, 4.45)];
      return { v, st };
    }
  });

  /* ---------------- 3. LÀNG SÁCH (bỏ mái chung) ---------------- */
  // nhà: danh sách nhóm theo tầng; mái "flat" hoặc "mono" (một dốc cao về phía Bắc, kính mái hướng Bắc)
  function house(x, y, w, d, zones, c, fa, roof = "flat", o = {}) {
    const v = [], h1 = o.h1 || 4.5;
    let z = 0.45;
    zones.forEach((zn, k) => {
      const h = k === 0 ? h1 : 4.5, last = k === zones.length - 1, extra = { ...(o.vo || {}), ...(last && o.top ? { top: o.top } : {}) };
      if (last && roof === "mono") v.push(SH(x, y, w, d, z, z + h, z + h + (o.rise || 3), "-y", c, zn, { fa: { ...fa, N: fa.N === "dac" ? "dac" : "kinh" }, fl: 1, ...extra }));
      else v.push(B(x, y, w, d, z, z + h, c, zn, { fa, fl: 1, ...extra }));
      z += h;
    });
    return v;
  }
  G.K4.house = house;
  const housesCols = (H, z2s) => H.flatMap(([x, y, w, d], i) => grid([x, x + w], [y, y + d], 0.45, z2s[i]));

  I.push({
    id: "lang1", fam: "lang", code: "3.1", name: "Lưới 4 m, mái bằng cao thấp", rule: "Lệch có kiểm soát", tag: "Tám nhà to nhỏ, cao 1–3 tầng, hẻm 4 m, mọi cạnh trên lưới 4 m",
    story: "Thư viện là một xóm tám ngôi nhà mái bằng, to nhỏ và cao thấp khác nhau, cách nhau bởi các con hẻm 4 m. Không nhà nào thẳng hàng hoàn toàn với nhà bên cạnh, nhưng mọi cạnh đều nằm trên lưới 4 m. Nhà đọc chính ba tầng đứng giữa xóm; các nhà một tầng có mái cỏ để đọc ngoài trời. Hai cầu kính tầng 2 nối các nhà.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát trên lưới 4 m: kích thước nhà và hẻm đều là bội số của 4 m nên nhìn tự do mà vẫn có trật tự; nhà chính cao nhất ở giữa, các nhà phụ thấp dần ra ngoài."), W("Nắng và chói", "Mỗi nhà: mặt Tây đặc, mặt Đông lam đứng, mặt Bắc kính, mặt Nam mái đua. Hẻm hẹp 4 m được nhà hai bên che nắng gần như cả ngày."), W("Gió và mưa", "Các hẻm chạy Đông–Tây dẫn gió sông vào sâu trong xóm; các nhà nhỏ đều thông gió được hai mặt."), W("Công năng", "Nhà sự kiện và cà phê ở đầu Bắc, gần phố phía Bắc; nhà kho và nghiệp vụ ở phía Tây gần đường Trần Phú; nhà thiếu nhi ở phía Nam có vườn.")],
    kc: { he: "Mỗi nhà là một khung bê tông nhỏ, nhịp tối đa 16 m (nhà đọc chính dùng dầm 16 m hoặc thêm một hàng cột). Cầu kính nhịp 4 m.", nhip: "16 m (nhà đọc chính)", cx: "Không" },
    qa: [["Đi giữa các nhà khi mưa có ướt?", "Tầng 2 nối bằng cầu kính; tầng 1 có mái đua 1,4 m dọc các hẻm chính. Đường đi chính từ sảnh vào nhà đọc là có mái che."]],
    cut: "8 hộp foam: 9 × 8, 4 × 6, 8 × 6, 4 × 12, 8 × 10, 4 × 10, 6 × 6, 6 × 6 cm; cao 3,25, 2,25, 2,25, 4,5, 6,75, 4,5, 2,25, 4,5 cm.",
    roleOf: () => "p",
    lab: [[24, 54, 13.95, "Khối chính · Nhà đọc 3 tầng", 1], [15, 14, 6.45, "Khối phụ · Nhà sự kiện", 2], [24, 34, 4.95, "Khối phụ · Nhà sảnh", 2], [8, 38, 9.45, "Khối phụ · Nhà kho, văn phòng", 2], [22, 74, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [14, 44, 0.5, "Hẻm 4 m"]],
    build() {
      const Hs = [[6, 6, 18, 16], [28, 10, 8, 12], [16, 28, 16, 12], [4, 26, 8, 24], [16, 44, 16, 20], [4, 56, 8, 20], [16, 68, 12, 12], [8, 84, 12, 12]];
      const v = [...house(6, 6, 18, 16, ["D"], "blk", FA.su, "flat", { h1: 6 }), ...house(28, 10, 8, 12, ["A"], "glass", FA.cong, "flat", { top: "grass" }), ...house(16, 28, 16, 12, ["A"], "glass", FA.cong, "flat", { top: "grass" }),
        ...house(4, 26, 8, 24, ["E", "E"], "blk", FA.dac), ...house(16, 44, 16, 20, ["B", "B", "B"], "sheet", FA.doc, "flat", { vo: M }), ...house(4, 56, 8, 20, ["C", "B"], "blk", FA.dac),
        ...house(16, 68, 12, 12, ["B"], "sheet", FA.nhi, "flat", { top: "grass" }), ...house(8, 84, 12, 12, ["C", "B"], "blk", FA.doc),
        B(12, 45, 4, 4, 4.95, 8.95, "glass", "L"), B(12, 58, 4, 4, 4.95, 8.95, "glass", "L")];
      return { v, st: housesCols(Hs, [6.45, 4.95, 4.95, 9.45, 13.95, 9.45, 4.95, 9.45]).concat(grid([24], [44, 64], 0.45, 13.95)) };
    }
  });

  I.push({
    id: "lang2", fam: "lang", code: "3.2", name: "Mái một dốc hướng Bắc", rule: "Lặp lại và biến tấu", tag: "Mọi nhà cùng một kiểu mái một dốc, cửa mái hướng Bắc",
    story: "Bảy ngôi nhà to nhỏ khác nhau nhưng cùng một kiểu mái: mái một dốc, thấp ở phía Nam và cao ở phía Bắc, mặt cao hướng Bắc là cửa kính lấy sáng tán xạ. Nhìn từ sông là một dãy răng cưa không đều, như mái nhà trong một xóm. Nhà đọc chính cao nhất có mái dốc dài nhất.",
    why: [W("Quy luật hình khối", "Lặp lại và biến tấu: chỉ một loại mái, lặp lại ở bảy kích thước khác nhau. Sự thống nhất đến từ mái giống nhau, sự phong phú đến từ kích thước và chiều cao khác nhau."), W("Nắng và chói", "Cửa mái hướng Bắc cho ánh sáng tán xạ quanh năm, không có nắng chiếu thẳng xuống bàn đọc. Mái thấp phía Nam che nắng trưa. Mặt Tây đặc, mặt Đông lam."), W("Gió và mưa", "Khí nóng dồn lên phía cao của mái và thoát qua cửa mái hướng Bắc; gió Đông Nam vào qua các hẻm."), W("Công năng", "Nhà sự kiện ở đầu Bắc, cà phê ở góc Đông Bắc; nhà kho và nghiệp vụ ở phía Tây gần đường Trần Phú; nhà thiếu nhi ở phía Nam có vườn.")],
    kc: { he: "Mỗi nhà là khung bê tông nhỏ, mái là vì kèo thép một dốc nhịp bằng chiều sâu nhà (12–20 m). Cột phía Bắc cao hơn cột phía Nam.", nhip: "16–20 m (vì kèo mái)", cx: "Mái đua 1 m" },
    qa: [["Mái một dốc thoát nước về đâu?", "Nước chảy về phía Nam (phía thấp), vào máng dọc và hẻm. Mái dốc khoảng 10–15°."]],
    cut: "7 hộp foam có mặt trên cắt vát: cạnh Bắc cao hơn cạnh Nam 1,5 cm. Dán mica ở mặt Bắc phần trên.",
    roleOf: () => "p",
    lab: [[24, 54, 18.9, "Khối chính · Nhà đọc mái dốc lớn", 1], [15, 14, 9.45, "Khối phụ · Nhà sự kiện", 2], [8, 40, 12.5, "Khối phụ · Nhà kho, văn phòng", 2], [22, 80, 7.5, "Khối phụ · Nhà thiếu nhi", 2], [31, 16, 7.5, "Khối phụ · Cà phê", 2]],
    build() {
      const Hs = [[6, 6, 18, 16], [28, 10, 8, 12], [4, 28, 10, 22], [18, 28, 14, 12], [16, 44, 16, 22], [4, 56, 10, 20], [16, 72, 14, 14], [4, 82, 10, 12]];
      const v = [...house(6, 6, 18, 16, ["D"], "blk", FA.su, "mono", { h1: 6 }), ...house(28, 10, 8, 12, ["A"], "glass", FA.cong, "mono", { rise: 2 }), ...house(4, 28, 10, 22, ["E", "B"], "blk", FA.dac, "mono"),
        ...house(18, 28, 14, 12, ["A"], "glass", FA.cong, "mono", { rise: 2 }), ...house(16, 44, 16, 22, ["B", "B", "B"], "sheet", FA.doc, "mono", { rise: 5, vo: M }), ...house(4, 56, 10, 20, ["C", "B"], "blk", FA.dac, "mono"),
        ...house(16, 72, 14, 14, ["B"], "sheet", FA.nhi, "mono", { rise: 2.5 }), ...house(4, 82, 10, 12, ["C"], "blk", FA.dac, "mono", { rise: 2 }),
        B(14, 46, 2, 4, 4.95, 8.95, "glass", "L"), B(14, 60, 2, 4, 4.95, 8.95, "glass", "L")];
      return { v, st: housesCols(Hs, [9.45, 6.95, 12.45, 6.95, 18.95, 12.45, 7.45, 6.95]) };
    }
  });

  I.push({
    id: "lang3", fam: "lang", code: "3.3", name: "Hai sân xếp chong chóng", rule: "Cân bằng xoay vòng", tag: "Bốn nhà xoay quanh mỗi sân như cánh chong chóng, nhà đọc chính nối hai sân",
    story: "Mỗi sân trong 12 × 12 m có bốn ngôi nhà xếp xoay vòng như bốn cánh chong chóng; bốn góc sân để hở nên gió đi chéo qua sân. Hai cụm chong chóng giống nhau đặt hai đầu, ở giữa là nhà đọc chính ba tầng nối hai cụm. Nhà sự kiện đứng riêng ở đầu Bắc.",
    why: [W("Quy luật hình khối", "Cân bằng xoay vòng: bốn nhà quanh sân không đối xứng gương nhưng cân bằng khi xoay 90°. Hai cụm giống nhau lặp lại, nhà chính cao nhất ở giữa làm trọng tâm."), W("Nắng và chói", "Sân nhỏ được bốn nhà che nắng; các mặt nhìn vào sân là kính có mái đua. Mặt ngoài phía Tây đặc, phía Đông lam."), W("Gió và mưa", "Góc Đông Nam và Tây Bắc của mỗi sân để hở đúng hướng gió mùa hè, gió đi chéo qua sân và vào các nhà."), W("Công năng", "Cụm Bắc: sảnh, cà phê, kho, đọc mở. Cụm Nam: đọc yên tĩnh, thiếu nhi, văn phòng. Nhà sự kiện riêng ở đầu Bắc, ngoài giờ không đi qua sân trong.")],
    kc: { he: "Mỗi nhà là khung bê tông nhịp 8 m, dài 16 m. Nhà đọc chính nhịp 12 m. Không có dầm chuyển.", nhip: "12 m", cx: "Không" },
    qa: [["Chong chóng có làm đường đi rối?", "Đi quanh sân luôn có hành lang hiên của các nhà; từ sảnh nhìn thấy cả sân và nhà đọc chính."]],
    cut: "16 hộp nhỏ 8 × 4 cm (cao 2,25 hoặc 4,5 cm), xếp xoay quanh 2 ô vuông 6 × 6 cm. Nhà chính: hộp 12 × 6 × 6,75 cm.",
    roleOf: () => "p",
    lab: [[20, 52, 13.95, "Khối chính · Nhà đọc nối hai sân", 1], [21, 9, 6.45, "Khối phụ · Nhà sự kiện", 2], [20, 32, 6, "Khối phụ · Cụm chong chóng Bắc", 2], [20, 72, 6, "Khối phụ · Cụm chong chóng Nam", 2], [20, 32, 0.5, "Sân trong"]],
    build() {
      const v = [...house(10, 2, 22, 14, ["D"], "blk", FA.su, "flat", { h1: 6 }), ...house(8, 46, 24, 12, ["B", "B", "B"], "sheet", FA.doc, "flat", { vo: M })];
      const st = [...grid([10, 21, 32], [2, 16], 0.45, 6.45), ...grid([8, 20, 32], [46, 58], 0.45, 13.95)];
      const pin = (cy, Z4) => {
        const cx = 20, P = [[cx - 10, cy - 14, 16, 8], [cx + 6, cy - 10, 8, 16], [cx - 6, cy + 6, 16, 8], [cx - 14, cy - 6, 8, 16]];
        P.forEach(([x, y, w, d], i) => { v.push(...house(x, y, w, d, Z4[i][0], Z4[i][1], Z4[i][2], "flat", { top: Z4[i][0].length === 1 ? "grass" : undefined })); st.push(...grid([x, x + w], [y, y + d], 0.45, Z(Z4[i][0].length))); });
      };
      pin(32, [[["A"], "glass", FA.cong], [["A"], "glass", FA.cong], [["B", "B"], "sheet", FA.doc], [["C", "C"], "blk", FA.dac]]);
      pin(72, [[["B", "B"], "sheet", FA.doc], [["B"], "sheet", FA.nhi], [["E", "E"], "blk", FA.doc], [["E", "B"], "blk", FA.dac]]);
      return { v, st };
    }
  });

  I.push({
    id: "lang4", fam: "lang", code: "3.4", name: "Hai dãy so le, cầu nối", rule: "Nhịp so le, chủ – phụ", tag: "Phố đi bộ dọc giữa hai dãy nhà so le, cầu tầng 2 bắc qua phố",
    story: "Hai dãy nhà chạy dọc phố, giữa là một con phố đi bộ rộng 8 m từ Bắc xuống Nam. Dãy Đông lệch nửa nhịp so với dãy Tây nên hai bên phố luôn so le. Dãy Tây tựa lưng ra Trần Phú, có nhà đọc chính ba tầng ở giữa; dãy Đông nhìn ra sông với cà phê, sảnh, thiếu nhi. Hai cầu kính tầng 2 bắc qua phố.",
    why: [W("Quy luật hình khối", "Nhịp so le và chủ – phụ: hai dãy nhà cùng chiều rộng, lệch nhau nửa nhịp; nhà chính ba tầng giữa dãy Tây là điểm nhấn, các nhà còn lại một hai tầng."), W("Nắng và chói", "Dãy Tây có mặt Tây đặc chắn nắng chiều; dãy Đông có lam đứng mặt Đông. Phố giữa hẹp 8 m được hai dãy che nắng sáng và chiều."), W("Gió và mưa", "Khe giữa các nhà dãy Đông mở ra sông, gió Đông Nam vào phố giữa rồi qua khe dãy Tây; phố giữa là đường gió dọc."), W("Công năng", "Nhà sự kiện ở đầu Bắc dãy Tây, cà phê ở đầu Bắc dãy Đông: cả hai mở ra phố phía Bắc, chạy ngoài giờ độc lập.")],
    kc: { he: "Mỗi nhà là khung bê tông nhịp 12 m. Cầu kính nhịp 8 m qua phố là dầm thép.", nhip: "12 m", cx: "Không" },
    qa: [["Phố giữa có thành hành lang tối?", "Phố rộng 8 m, lộ thiên, hai bên là mặt kính có mái đua; hai cầu chỉ che hai đoạn ngắn."]],
    cut: "8 hộp foam rộng 6 cm, dài 7–11 cm, cao 2,25–6,75 cm. Hai cầu mica 4 × 2 cm.",
    roleOf: () => "p",
    lab: [[10, 59, 13.95, "Khối chính · Nhà đọc 3 tầng", 1], [10, 14, 6.45, "Khối phụ · Nhà sự kiện", 2], [30, 21, 4.95, "Khối phụ · Cà phê", 2], [30, 87, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [20, 50, 0.5, "Phố đi bộ 8 m"]],
    build() {
      const fE = { N: "kinh", E: "lam", S: "dua", W: "dua" }, fW = { N: "kinh", E: "dua", S: "dua", W: "dac" };
      const Hs = [[4, 6, 12, 16], [4, 26, 12, 18], [4, 49, 12, 20], [4, 74, 12, 18], [24, 14, 12, 14], [24, 36, 12, 16], [24, 58, 12, 16], [24, 80, 12, 14]];
      const v = [...house(4, 6, 12, 16, ["D"], "blk", { ...fW, N: "dac" }, "flat", { h1: 6 }), ...house(4, 26, 12, 18, ["E", "D"], "blk", fW), ...house(4, 49, 12, 20, ["B", "B", "B"], "sheet", fW, "flat", { vo: M }), ...house(4, 74, 12, 18, ["C", "B"], "blk", fW),
        ...house(24, 14, 12, 14, ["A"], "glass", fE, "flat", { top: "grass" }), ...house(24, 36, 12, 16, ["A", "B"], "glass", fE), ...house(24, 58, 12, 16, ["B", "B"], "sheet", fE), ...house(24, 80, 12, 14, ["B"], "sheet", fE, "flat", { top: "grass" }),
        B(16, 40, 8, 4, 4.95, 8.95, "glass", "L", { fa: { N: "kinh", S: "kinh" } }), B(16, 62, 8, 4, 4.95, 8.95, "glass", "L", { fa: { N: "kinh", S: "kinh" } })];
      return { v, st: housesCols(Hs, [6.45, 9.45, 13.95, 9.45, 4.95, 9.45, 9.45, 4.95]) };
    }
  });

  G.ideas4 = I;
})(window.G3);
