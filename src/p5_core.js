/* ================= Mặt bằng phát triển: hình học dùng chung (trình duyệt + kiểm tra) ================= */
(function () {
  const EPS = 0.02;
  const A = r => r[2] * r[3];
  const X2 = r => r[0] + r[2], Y2 = r => r[1] + r[3];
  const inter = (a, b) => Math.max(0, Math.min(X2(a), X2(b)) - Math.max(a[0], b[0])) * Math.max(0, Math.min(Y2(a), Y2(b)) - Math.max(a[1], b[1]));
  const inR = (r, x, y, e = 0) => x >= r[0] - e && x <= X2(r) + e && y >= r[1] - e && y <= Y2(r) + e;

  // Vỏ của một tầng: các khối hộp có sàn nằm gần cao độ tầng, cộng/trừ phần chỉnh sửa
  function envOf(L, V) {
    const key = r => r.map(v => +v.toFixed(2)).join(",");
    const del = new Set((L.envDel || []).map(key));
    const o = [];
    for (const v of V) {
      if (v.k !== "box" || !v.fl || v.zone === "X") continue;
      if (Math.abs(v.z1 - L.z) > (L.tol ?? 0.55)) continue;
      const r = [v.x, v.y, v.w, v.d];
      if (!del.has(key(r)) && !o.some(q => key(q) === key(r))) o.push(r);
    }
    return o.concat(L.envAdd || []);
  }

  // Cạnh chung giữa hai hình chữ nhật: {o:"h"|"v", at, a, b}
  function shared(p, q) {
    const yo = [Math.max(p[1], q[1]), Math.min(Y2(p), Y2(q))], xo = [Math.max(p[0], q[0]), Math.min(X2(p), X2(q))];
    if (Math.abs(X2(p) - q[0]) < EPS && yo[1] - yo[0] > EPS) return { o: "v", at: q[0], a: yo[0], b: yo[1] };
    if (Math.abs(X2(q) - p[0]) < EPS && yo[1] - yo[0] > EPS) return { o: "v", at: p[0], a: yo[0], b: yo[1] };
    if (Math.abs(Y2(p) - q[1]) < EPS && xo[1] - xo[0] > EPS) return { o: "h", at: q[1], a: xo[0], b: xo[1] };
    if (Math.abs(Y2(q) - p[1]) < EPS && xo[1] - xo[0] > EPS) return { o: "h", at: p[1], a: xo[0], b: xo[1] };
    return null;
  }
  const rid = z => z.id || z.c;

  // Cửa: to = [[đích, rộng | "o", loại?, vị trí 0–1?]], ex = [[cạnh N|E|S|W, rộng, loại?, vị trí 0–1?]]
  function doorsOf(L) {
    const byId = {}; L.rooms.forEach(z => { byId[rid(z)] = z; });
    const out = [], err = [];
    for (const z of L.rooms) {
      for (const d of z.to || []) {
        const [tid, w = 1.2, k = "", pos = 0.5] = d, t = byId[tid];
        if (!t) { err.push(`${rid(z)}: cửa tới "${tid}" không có phòng này`); continue; }
        const s = shared(z.r, t.r);
        if (!s) { err.push(`${rid(z)} và ${tid} không chung cạnh`); continue; }
        if (w === "o") { out.push({ ...s, k: "o", from: rid(z), to: tid }); continue; }
        const len = s.b - s.a;
        if (len < w + 0.2) err.push(`${rid(z)}→${tid}: cạnh chung ${len.toFixed(1)} m < cửa ${w} m`);
        const c = s.a + Math.max(w / 2 + 0.1, Math.min(len - w / 2 - 0.1, len * pos));
        out.push({ o: s.o, at: s.at, a: c - w / 2, b: c + w / 2, k, from: rid(z), to: tid });
      }
      for (const d of z.ex || []) {
        const [side, w = 1.8, k = "x", pos = 0.5] = d, r = z.r;
        const hz = side === "N" || side === "S", len = hz ? r[2] : r[3];
        const at = side === "N" ? r[1] : side === "S" ? Y2(r) : side === "W" ? r[0] : X2(r);
        const base = hz ? r[0] : r[1], c = base + Math.max(w / 2 + 0.1, Math.min(len - w / 2 - 0.1, len * pos));
        out.push({ o: hz ? "h" : "v", at, a: c - w / 2, b: c + w / 2, k: k || "x", ext: side, from: rid(z) });
      }
    }
    return { doors: out, err };
  }

  /* ---------- Nội thất theo loại phòng, trả về hình vẽ và số chỗ ---------- */
  function furn(z, L) {
    const S = [], tags = []; let seats = 0;
    const [x, y, w, h] = z.r, x2 = x + w, y2 = y + h, cx = x + w / 2, cy = y + h / 2;
    const R = (a, b, c, d, k = "f") => S.push({ t: "r", x: a, y: b, w: c, h: d, k });
    const C = (a, b, r, k = "f") => S.push({ t: "c", x: a, y: b, r, k });
    const Ln = (a, b, c, d, k = "l") => S.push({ t: "l", x1: a, y1: b, x2: c, y2: d, k });
    const seat = (a, b) => { R(a - 0.22, b - 0.22, 0.44, 0.44); seats++; };
    const shelf = (a, b, c, d) => R(a, b, c, d, "s");
    const T = s => tags.push(s);
    const hz = w >= h, Lg = Math.max(w, h), Sh = Math.min(w, h);
    // toạ độ theo trục dài u, trục ngắn v
    const P = (u, v) => hz ? [x + u, y + v] : [x + v, y + u];
    const RR = (u, v, du, dv, k) => { const [a, b] = P(u, v); hz ? R(a, b, du, dv, k) : R(a, b, dv, du, k); };
    const SE = (u, v) => { const [a, b] = P(u, v); seat(a, b); };
    const t4 = (a, b, r) => { C(a, b, r); seat(a - r - 0.3, b); seat(a + r + 0.3, b); seat(a, b - r - 0.3); seat(a, b + r + 0.3); };
    const t6 = (a, b) => { R(a, b, 1.8, 0.9); for (let k = 0; k < 3; k++) { seat(a + 0.3 + k * 0.6, b - 0.35); seat(a + 0.3 + k * 0.6, b + 1.25); } };
    const cap = z.seat;
    const full = () => cap != null && seats >= cap;
    switch (z.c) {
      case "D1": {
        // ghế xếp quay về phía bục (face), lối giữa 1,6 m
        const f = z.face || "W", alongX = f === "W" || f === "E";
        const depth = alongX ? w : h, span = alongX ? h : w, start = 2.2;
        const rows = Math.floor((depth - start - 1.2) / 0.9), half = (span - 1.6 - 1.2) / 2, per = Math.floor(half / 0.55);
        for (let i = 0; i < rows; i++) for (let s = 0; s < 2; s++) for (let k = 0; k < per; k++) {
          if (full()) break;
          const d0 = start + i * 0.9, sp = 0.6 + (s ? half + 1.6 : 0) + 0.3 + k * 0.55;
          const px = alongX ? (f === "W" ? x + d0 : x2 - d0) : x + sp, py = alongX ? y + sp : (f === "N" ? y + d0 : y2 - d0);
          seat(px, py);
        }
        T(`${seats} ghế xếp · lối giữa 1,6 m`); break;
      }
      case "D2": R(x + 0.2, y + 0.2, w - 0.4, h - 0.4, "zD"); C(cx, cy, 0.3); T("Bục cao 0,6 m"); break;
      case "D3": { const n = Math.max(1, Math.floor((Lg - 0.6) / 1.6)); for (let k = 0; k < n; k++) RR(0.3 + k * 1.6, 0.3, 1.3, Math.min(1.0, Sh - 0.6)); T(`${n} xe đẩy ghế`); break; }
      case "D4": {
        for (let u = 1.0; u + 1.8 <= Lg - 0.4; u += 2.6) for (let v = 1.2; v + 1.5 <= Sh; v += 3.0) { if (full()) break; const [a, b] = P(u, v); hz ? t6(a, b) : (R(a, b, 0.9, 1.8), [0, 1, 2].forEach(q => { seat(a - 0.35, b + 0.3 + q * 0.6); seat(a + 1.25, b + 0.3 + q * 0.6); })); }
        T(`${seats} chỗ · bàn ghép 1800 × 900`); break;
      }
      case "A1": { RR(0.6, 0.6, 3.2, 0.8); const n = Math.max(1, Math.floor((Lg - 4.4) / 2.7)), m = Math.max(1, Math.floor((Sh - 1.2) / 2.8)); for (let k = 0; k < n; k++) for (let j = 0; j < m; j++) { if (full()) break; RR(4.4 + k * 2.7, Sh - 2.0 - j * 2.8, 2.4, 0.8); for (let q = 0; q < 5; q++) { const [a, b] = P(4.4 + k * 2.7 + 0.25 + q * 0.48, Sh - 2.0 - j * 2.8 - 0.35); seat(a, b); } } T(`Quầy thông tin · ${seats} chỗ chờ`); break; }
      case "A2": { const nu = Math.max(1, Math.floor((Lg - 1) / 3.2)), nv = Sh >= 7 ? 2 : 1; for (let k = 0; k < nu; k++) for (let j = 0; j < nv; j++) RR(1.0 + k * 3.2, nv === 2 ? 1.2 + j * (Sh - 3.8) : Sh / 2 - 0.7, 1.4, 1.4); seats = Math.round(A(z.r) / 3); T(`${nu * nv} bục trưng bày · ${seats} khách`); break; }
      case "A3": { RR(0.3, 0.3, Math.min(4.2, Lg - 1), 1.0); for (let u = 0.6; u < Math.min(4.2, Lg - 1); u += 0.7) { if (full()) break; SE(u, 1.65); } for (let u = 2.3; u + 0.7 < Lg; u += 2.3) for (let v = 2.6; v + 0.7 < Sh; v += 2.3) { const [a, b] = P(u, v); if (!full()) t4(a, b, 0.4); } T(`Quầy bar · ${seats} chỗ`); break; }
      case "A4": RR(0.3, 0.3, Lg - 0.6, 0.6, "s"); RR(0.8, Sh - 1.6, Math.min(5, Lg - 1.6), 0.7); T("Quầy mượn trả · tủ gửi đồ"); break;
      case "B1": {
        if (z.kind === "ke") { for (let u = 0.8; u + 0.5 < Lg - 0.6; u += 1.5) RR(u, 0.8, 0.5, Sh - 1.6, "s"); T("Kệ mở 2 mặt cao 2000"); break; }
        if (Sh <= 4.6) { RR(0.3, Sh - 0.9, Lg - 0.6, 0.6); for (let u = 0.6; u < Lg - 0.5; u += 0.6) { if (full()) break; SE(u, Sh - 1.45); } T(`Bàn bar dọc kính · ${seats} chỗ`); break; }
        const sh = z.shelf ?? 0.4, cut = Lg * sh;
        for (let u = 0.8; u + 0.5 < cut; u += 1.5) RR(u, 0.8, 0.5, Sh - 1.6, "s");
        for (let u = cut + 0.6; u + 1.8 < Lg - 0.4; u += 3.0) for (let v = 1.2; v + 1.6 < Sh; v += 3.4) { if (full()) break; const [a, b] = P(u, v); hz ? t6(a, b) : (R(a, b, 0.9, 1.8), [0, 1, 2].forEach(q => { seat(a - 0.35, b + 0.3 + q * 0.6); seat(a + 1.25, b + 0.3 + q * 0.6); })); }
        T(`Kệ mở + bàn 6 chỗ · ${seats} chỗ`); break;
      }
      case "B2": { for (let v = 0.6; v + 1.3 <= Sh; v += 2.4) for (let u = 0.6; u + 1.0 <= Lg - 0.2; u += 1.2) { if (full()) break; RR(u, v, 1.0, 0.6); const [a, b] = P(u + 0.5, v + 0.95); seat(a, b); } T(`${seats} bàn carrel có vách`); break; }
      case "B3": {
        RR(0.3, 0.3, Lg - 0.6, 0.4, "s"); const cu = Math.min(4.2, Lg * 0.35);
        RR(Lg - cu - 0.4, 1.2, cu, Math.min(cu, Sh - 1.6), "zD");
        for (let u = 1.8; u + 1.2 < Lg - cu - 0.6; u += 2.8) for (let v = 2.4; v + 1.2 < Sh; v += 2.8) { if (full()) break; const [a, b] = P(u, v); t4(a, b, 0.55); }
        for (let k = 0; k < 6; k++) { const [a, b] = P(Lg - cu + 0.2 + (k % 3) * (cu / 3), 1.8 + Math.floor(k / 3) * 1.6); C(a, b, 0.3); seats++; }
        T(`Bàn tròn Ø1100 · thảm kể chuyện · ${seats} chỗ`); break;
      }
      case "B4": { const [a, b] = [cx - 0.55, cy - 1.2]; R(a, b, 1.1, 2.0); seat(a - 0.45, b + 0.5); seat(a - 0.45, b + 1.5); seat(a + 1.55, b + 0.5); seat(a + 1.55, b + 1.5); seat(cx, b + 2.45); T("Bàn nhóm 5 chỗ · màn hình"); break; }
      case "B5": { for (let v = 0.8; v + 1.2 <= Sh; v += 2.0) for (let u = 0.6; u + 1.6 <= Lg - 0.2; u += 2.6) { if (full()) break; RR(u, v, 1.6, 0.7); const [a, b] = P(u + 0.8, v + 1.0); seat(a, b); } T(`${seats} bàn máy tính`); break; }
      case "B6": { const n = z.steps || Math.floor(Lg / 1.2); for (let i = 0; i <= n; i++) { const [a, b] = P(i * Lg / n, 0), [c, d] = P(i * Lg / n, Sh); Ln(a, b, c, d, "l2"); } for (let k = 0; k < Math.min(12, n * 2); k++) { const [a, b] = P((k % n + 0.5) * Lg / n, Sh * (k < n ? 0.3 : 0.7)); C(a, b, 0.22, "ink"); } seats = 12; T(`${n} bậc sâu 1200 cao 450 · nệm ngồi`); break; }
      case "C1": { for (let v = 0.6; v + 0.6 <= Sh - 0.5; v += 1.25) RR(0.5, v, Lg - 1.0, 0.6, "s"); T("Giá compact · hút ẩm 50–55%"); break; }
      case "C2": { const n = Math.max(1, Math.floor((Lg - 0.8) / 4.0)), m = Sh >= 6 ? 2 : 1; for (let k = 0; k < n; k++) for (let j = 0; j < m; j++) RR(0.8 + k * 4.0, 0.8 + j * 2.6, 2.8, 1.2); T(`${n * m} bàn phân loại`); break; }
      case "C3": RR(0.3, 0.3, Lg - 0.6, 0.5, "s"); RR(0.3, Sh - 0.8, Lg - 0.6, 0.5, "s"); RR(Lg / 2 - 1.2, Sh / 2 - 0.5, 2.4, 1.0); T("Kệ địa chí có khóa"); break;
      case "C4": RR(0.5, 0.6, 3.2, 1.1); RR(4.2, 0.6, 1.6, 1.6, "zC"); T("Bàn nhập · xe sách"); break;
      case "E1": {
        // văn phòng: z.e1 = "hop" (phòng họp), "lam" (chỗ làm việc), mặc định có cả hai (góc họp ở đầu dài)
        const mode = z.e1 || (Lg * Sh >= 60 ? "ca" : "lam");
        const meet = (u0, uL) => { // bàn họp dài 1,2 m, ghế hai bên và hai đầu; màn hình trên vách đầu
          const tl = Math.max(1.8, Math.min(uL - 2.0, 4.8)), u = u0 + (uL - tl) / 2, v = Sh / 2 - 0.6; RR(u, v, tl, 1.2);
          let n = 0; for (let t = u + 0.45; t <= u + tl - 0.3; t += 0.75) { SE(t, v - 0.4); SE(t, v + 1.6); n += 2; }
          if (uL - tl >= 2.2) { SE(u - 0.45, Sh / 2); SE(u + tl + 0.45, Sh / 2); n += 2; }
          { const [a, b] = P(u0 + 0.15, Sh / 2 - 0.9), [c, d] = P(u0 + 0.15, Sh / 2 + 0.9); Ln(a, b, c, d, "w"); }
          T(`Họp ${n} chỗ · màn hình`); return n; };
        const desks = (u0, uL) => { // bàn làm việc 1,4 × 0,7 quay mặt ra cửa sổ, tủ hồ sơ dọc vách
          let n = 0; for (let v = 0.9; v + 0.7 <= Sh - 1.6; v += 2.0) for (let u = u0 + 0.5; u + 1.4 <= u0 + uL - 0.3; u += 2.0) { RR(u, v, 1.4, 0.7); SE(u + 0.7, v + 0.95); n++; }
          RR(u0 + 0.3, Sh - 0.75, Math.min(uL - 0.6, 3.6), 0.45, "s"); T(`${n} chỗ làm việc · tủ hồ sơ`); return n; };
        if (mode === "hop") meet(0, Lg);
        else if (mode === "gd") { RR(0.8, 1.0, 1.8, 0.8); SE(1.7, 2.3); SE(1.3, 0.6); SE(2.1, 0.6); RR(Lg - 2.6, Sh - 1.6, 2.0, 0.9); SE(Lg - 3.0, Sh - 1.15); SE(Lg - 1.6, Sh - 2.1); RR(0.3, Sh - 0.6, Math.min(2.4, Lg - 0.6), 0.4, "s"); T("Giám đốc · tiếp khách"); }
        else if (mode === "ca") { const um = Math.min(6, Lg * 0.42); meet(Lg - um, um); { const [a, b] = P(Lg - um, 0.2), [c, d] = P(Lg - um, Sh - 0.2); Ln(a, b, c, d, "w"); } desks(0, Lg - um - 0.2); }
        else desks(0, Lg);
        break; }
      case "E2": {
        // phòng nghỉ nhân viên: bếp nhỏ dọc vách, bàn ăn, góc ngả lưng, tủ đồ 12 ngăn
        RR(0.3, 0.2, Math.min(3.2, Lg - 0.6), 0.6, "zC"); { const [a, b] = P(0.3 + Math.min(3.2, Lg - 0.6) + 0.15, 0.2); hz ? R(a, b, 0.7, 0.7, "sheet") : R(a, b, 0.7, 0.7, "sheet"); }
        const tl = Math.min(2.4, Lg - 2.4); RR(0.9, Sh / 2 - 0.5, tl, 1.0); let n = 0; for (let t = 1.25; t <= 0.9 + tl - 0.2; t += 0.7) { SE(t, Sh / 2 - 0.9); SE(t, Sh / 2 + 0.9); n += 2; }
        RR(Lg - 1.2, 1.2, 0.9, Math.min(2.2, Sh - 2.4)); // sofa
        RR(0.3, Sh - 0.65, Math.min(3.0, Lg - 0.6), 0.45, "s"); // tủ đồ
        T(`Bếp nhỏ · bàn ăn ${n} chỗ · ghế ngả lưng · tủ đồ 12 ngăn`); break; }
      case "E3": RR(0.4, 0.4, Math.min(2.6, Lg - 0.8), 0.7); { const [a, b] = P(1.6, 1.6); seat(a, b); } T("Màn hình camera"); break;
      case "E4": { const n = Math.max(1, Math.floor((Lg - 0.5) / 2.9)); for (let k = 0; k < n; k++) RR(0.5 + k * 2.9, 0.5, 2.4, Math.min(1.6, Sh - 1)); T("Tủ điện, bơm, máy lạnh"); break; }
      case "E5": { const n = 3; for (let i = 1; i < n; i++) { const [a, b] = P(i * Lg / n, 0), [c, d] = P(i * Lg / n, Sh); Ln(a, b, c, d, "w"); } for (let i = 0; i < n; i++) RR(i * Lg / n + 0.3, 0.2, Math.min(0.9, Lg / n - 0.6), Math.min(1.2, Sh - 0.4), "sheet"); T(z.wc || "Nam · Nữ · Người khuyết tật"); break; }
      case "E6": RR(0.3, 0.3, Lg - 0.6, 0.5, "s"); T("Kệ dụng cụ"); break;
    }
    if (z.g === "core") stairLift(z, S, tags);
    if (z.g === "void") { Ln(x, y, x2, y2, "v"); Ln(x2, y, x, y2, "v"); }
    return { S, seats, tags };
  }

  // Lõi thang: st = "u" thang bộ, "u+l" thêm thang máy, "u+b" thêm tời sách, "u+l+b", "l" chỉ thang máy, "s" thang thẳng (bậc ngoài)
  function stairLift(z, S, tags) {
    const [x, y, w, h] = z.r, hz = w >= h, Lg = hz ? w : h, Sh = hz ? h : w;
    const R = (u, v, du, dv, k) => S.push(hz ? { t: "r", x: x + u, y: y + v, w: du, h: dv, k } : { t: "r", x: x + v, y: y + u, w: dv, h: du, k });
    const Ln = (u1, v1, u2, v2, k = "l") => S.push(hz ? { t: "l", x1: x + u1, y1: y + v1, x2: x + u2, y2: y + v2, k } : { t: "l", x1: x + v1, y1: y + u1, x2: x + v2, y2: y + u2, k });
    const st = z.st || "u", lift = /l/.test(st), book = /b/.test(st);
    let sw = Sh, sl = Lg, lu = null;
    if (lift || book) { const need = (lift ? 2.5 : 0) + (book ? 1.5 : 0); if (Sh - 3.1 >= Math.min(2.5, need)) sw = Math.min(Sh, 3.2); else { sl = Lg - 2.6; lu = sl; } }
    if (/u/.test(st)) {
      const fw = (Math.min(sw, 3.2) - 0.2) / 2, run = Math.min(sl - 2.6, 4.2), u0 = 1.3;
      R(0.05, 0.05, sl - 0.1, Math.min(sw, 3.2) - 0.1, "sheet");
      for (let i = 0; i <= 14; i++) { const u = u0 + run * i / 14; Ln(u, 0.1, u, fw, "t"); Ln(u, fw + 0.2, u, 2 * fw + 0.2, "t"); }
      Ln(u0, fw + 0.1, u0 + run, fw + 0.1, "w");
      Ln(u0 + run - 0.2, fw / 2, u0 + 0.3, fw / 2, "a"); Ln(u0 + 0.3, fw * 1.5 + 0.2, u0 + run - 0.2, fw * 1.5 + 0.2, "a");
    }
    if (/s/.test(st)) { const n = z.n || 20; for (let i = 0; i <= n; i++) Ln(i * Lg / n, 0, i * Lg / n, Sh, "t"); Ln(0.3, Sh / 2, Lg - 0.3, Sh / 2, "a"); }
    const box = (u, v, s, k) => { R(u, v, s, s, k); Ln(u, v, u + s, v + s, "l"); Ln(u + s, v, u, v + s, "l"); };
    if (lift) { if (lu != null) box(lu + 0.2, 0.3, 2.3, "sheet"); else box(0.3, Math.min(sw, 3.2) + 0.2, 2.3, "sheet"); }
    if (book) { if (lu != null) box(lu + 0.2, lift ? Sh - 1.5 : 0.3, 1.3, "zC"); else box(lift ? 2.9 : 0.3, Math.min(sw, 3.2) + 0.3, 1.3, "zC"); }
    if (st === "l") box(0.3, 0.3, 2.3, "sheet");
    tags.push(lift ? "Thang bộ + thang máy 2300 × 2300" : book ? "Thang bộ + tời sách" : st === "l" ? "Thang máy" : "Thang bộ thoát nạn");
  }

  // Phân tích cả phương án
  function analyse(S, prep, D) {
    const out = { levels: [], byCode: {}, byZone: {}, seats: {}, err: [], warn: [], total: 0, circ: 0, use: 0 };
    const stairsAt = [];
    S.levels.forEach((L, li) => {
      const env = envOf(L, prep.V), M = { k: L.k, z: L.z, err: [], warn: [], env: 0, rooms: 0, gap: 0, stairs: 0, far: 0, farRoom: "" };
      // diện tích vỏ (hợp các hình chữ nhật) bằng lấy mẫu 0,25 m
      const st = 0.25; let ea = 0, gapPts = [];
      const xs = env.flatMap(r => [r[0], X2(r)]), ys = env.flatMap(r => [r[1], Y2(r)]);
      if (env.length) for (let px = Math.min(...xs) + st / 2; px < Math.max(...xs); px += st) for (let py = Math.min(...ys) + st / 2; py < Math.max(...ys); py += st) {
        if (!env.some(r => inR(r, px, py))) continue;
        ea += st * st;
        if (!L.rooms.some(z => inR(z.r, px, py))) gapPts.push([px, py]);
      }
      M.env = ea; M.gap = gapPts.length * st * st;
      for (const r of env) {
        const g = gapPts.filter(([px, py]) => inR(r, px, py));
        if (g.length * st * st < 1) continue;
        const bx = g.reduce((b, p) => [Math.min(b[0], p[0]), Math.min(b[1], p[1]), Math.max(b[2], p[0]), Math.max(b[3], p[1])], [1e9, 1e9, -1e9, -1e9]);
        M.warn.push(`khối ${JSON.stringify(r)}: còn ${(g.length * st * st).toFixed(1)} m² trống, x ${(bx[0] - st / 2).toFixed(2)}–${(bx[2] + st / 2).toFixed(2)}, y ${(bx[1] - st / 2).toFixed(2)}–${(bx[3] + st / 2).toFixed(2)}`);
      }
      const ids = new Set();
      L.rooms.forEach((z, i) => {
        if (ids.has(rid(z))) M.err.push(`trùng mã phòng "${rid(z)}" (đặt id riêng)`); ids.add(rid(z));
        if (!z.r || z.r.length !== 4 || z.r.some(v => !isFinite(v))) { M.err.push(`${rid(z)}: r sai`); return; }
        // trong vỏ
        let outPts = 0, n = 0;
        for (let px = z.r[0] + 0.1; px < X2(z.r); px += 0.5) for (let py = z.r[1] + 0.1; py < Y2(z.r); py += 0.5) { n++; if (!env.some(r => inR(r, px, py))) outPts++; }
        if (outPts && !z.outOk) M.err.push(`${rid(z)} ${JSON.stringify(z.r)} nằm ngoài vỏ khối 3D (${Math.round(outPts / n * 100)}%)`);
        for (let j = i + 1; j < L.rooms.length; j++) { const a = inter(z.r, L.rooms[j].r); if (a > 0.05) M.err.push(`${rid(z)} chồng lên ${rid(L.rooms[j])} ${a.toFixed(1)} m²`); }
        if (z.g === "void") return;
        const a = A(z.r); M.rooms += a;
        if (D.target[z.c]) { out.byCode[z.c] = (out.byCode[z.c] || 0) + a; out.byZone[z.c[0]] = (out.byZone[z.c[0]] || 0) + a; out.use += a; }
        else out.circ += a;
        const f = furn(z, L); if (D.seats[z.c]) out.seats[z.c] = (out.seats[z.c] || 0) + f.seats;
      });
      const voids = L.rooms.filter(z => z.g === "void").reduce((s, z) => s + A(z.r), 0);
      out.total += ea - voids;
      const { err } = doorsOf(L); M.err.push(...err);
      // thang thoát nạn ở tầng này
      const stairs = L.rooms.filter(z => z.g === "core" && /u/.test(z.st || "u"));
      M.stairs = stairs.length; stairsAt[li] = stairs;
      if (li > 0) {
        if (stairs.length < 2) M.err.push(`chỉ có ${stairs.length} thang bộ (cần ≥ 2)`);
        for (const s of stairs) if (!stairsAt[li - 1].some(q => inter(q.r, s.r) > 4)) M.err.push(`thang ${rid(s)} không thẳng với thang tầng dưới`);
      }
      // khoảng cách xa nhất từ góc phòng tới thang (tầng trên) hoặc cửa ra ngoài (tầng 1)
      const { doors } = doorsOf(L);
      const goals = li === 0 ? doors.filter(d => d.ext && /x|m/.test(d.k)).map(d => d.o === "h" ? [(d.a + d.b) / 2, d.at] : [d.at, (d.a + d.b) / 2]) : stairs.map(s => [s.r[0] + s.r[2] / 2, s.r[1] + s.r[3] / 2]);
      if (!goals.length) M.err.push(li === 0 ? "tầng 1 không có cửa ra ngoài (ex loại x)" : "không có thang");
      for (const z of L.rooms) {
        if (z.g === "void" || z.g === "core") continue;
        const cs = [[z.r[0], z.r[1]], [X2(z.r), z.r[1]], [z.r[0], Y2(z.r)], [X2(z.r), Y2(z.r)]];
        const d = Math.max(...cs.map(([a, b]) => Math.min(...goals.map(([p, q]) => Math.abs(a - p) + Math.abs(b - q)))));
        if (d > M.far) { M.far = d; M.farRoom = rid(z); }
      }
      out.levels.push(M);
    });
    return out;
  }

  const api = { envOf, shared, doorsOf, furn, analyse, rid, inter };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") { window.G3 = window.G3 || {}; window.G3.P5 = api; }
})();
