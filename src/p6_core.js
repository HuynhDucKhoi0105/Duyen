/* ================= Mặt bằng phương án chốt: phòng đa giác, cửa nhiều loại, đường đi tự tìm qua cửa, kiểm tra 4 tình huống ================= */
(function () {
  // bộ nội thất của mặt bằng cũ, lấy lúc dùng (trong trang, p5_core nạp sau tệp này)
  const getP5 = () => (typeof window !== "undefined" && window.G3 && window.G3.P5) || (typeof require !== "undefined" ? require("./p5_core.js") : null);
  const E = 0.03;
  /* ---------- hình học ---------- */
  const rectP = ([x, y, w, h]) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const area = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  const sarea = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0) / 2;
  const cen = p => { const A = sarea(p) || 1e-9; let cx = 0, cy = 0; p.forEach((a, i) => { const b = p[(i + 1) % p.length], f = a[0] * b[1] - b[0] * a[1]; cx += (a[0] + b[0]) * f; cy += (a[1] + b[1]) * f; }); return [cx / (6 * A), cy / (6 * A)]; };
  const bbox = p => { const xs = p.map(q => q[0]), ys = p.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)]; };
  function inPoly(p, x, y, tol = 0) {
    let c = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const [xi, yi] = p[i], [xj, yj] = p[j];
      if (tol && segD([x, y], p[j], p[i]) <= tol) return true;
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function segD(q, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, t = L ? Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / L)) : 0; return Math.hypot(q[0] - a[0] - t * dx, q[1] - a[1] - t * dy); }
  // cắt đa giác bởi một đa giác lồi (Sutherland–Hodgman)
  function clip(subj, conv) {
    const s = sarea(conv) > 0 ? 1 : -1;
    let out = subj;
    for (let i = 0; i < conv.length && out.length; i++) {
      const a = conv[i], b = conv[(i + 1) % conv.length], inp = out; out = [];
      const side = q => s * ((b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0]));
      for (let k = 0; k < inp.length; k++) {
        const P = inp[k], Q = inp[(k + 1) % inp.length], fp = side(P), fq = side(Q);
        if (fp >= -1e-9) out.push(P);
        if ((fp >= -1e-9) !== (fq >= -1e-9)) { const t = fp / (fp - fq); out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]); }
      }
    }
    // bỏ đỉnh trùng
    return out.filter((q, i) => { const r = out[(i + 1) % out.length]; return Math.hypot(q[0] - r[0], q[1] - r[1]) > 1e-6; });
  }
  const convex = p => { let sg = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], c = p[(i + 2) % p.length], z = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]); if (Math.abs(z) < 1e-6) continue; const s = Math.sign(z); if (sg && s !== sg) return false; sg = s; } return true; };
  // cạnh chung của hai đa giác: đoạn thẳng trùng nhau, dài > 0,2 m
  function sharedSegs(P, Q) {
    const out = [];
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      if (L < E) continue;
      const ux = dx / L, uy = dy / L;
      for (let j = 0; j < Q.length; j++) {
        const c = Q[j], d = Q[(j + 1) % Q.length];
        const off = q => Math.abs((q[0] - a[0]) * uy - (q[1] - a[1]) * ux);
        if (off(c) > E || off(d) > E) continue;
        const t = q => (q[0] - a[0]) * ux + (q[1] - a[1]) * uy;
        const t1 = Math.max(0, Math.min(t(c), t(d))), t2 = Math.min(L, Math.max(t(c), t(d)));
        if (t2 - t1 > 0.2) out.push({ a: [a[0] + ux * t1, a[1] + uy * t1], b: [a[0] + ux * t2, a[1] + uy * t2], len: t2 - t1, u: [ux, uy] });
      }
    }
    return out;
  }
  // cạnh ngoài của phòng: đoạn nằm trên biên vỏ tầng, trừ phần áp vào phòng khác
  function extSegs(z, L) {
    const out = [];
    for (const env of L.env) for (const s of sharedSegs(z.p, env)) {
      // trừ đoạn áp vào phòng khác (cầu nối nằm ngoài vỏ)
      let parts = [[0, s.len]];
      for (const o of L.rooms) if (o !== z) for (const t of sharedSegs(z.p, o.p)) {
        const proj = q => (q[0] - s.a[0]) * s.u[0] + (q[1] - s.a[1]) * s.u[1], off = q => Math.abs((q[0] - s.a[0]) * s.u[1] - (q[1] - s.a[1]) * s.u[0]);
        if (off(t.a) > E || off(t.b) > E) continue;
        const u1 = Math.min(proj(t.a), proj(t.b)), u2 = Math.max(proj(t.a), proj(t.b));
        parts = parts.flatMap(([p1, p2]) => [[p1, Math.min(p2, u1)], [Math.max(p1, u2), p2]]).filter(([p1, p2]) => p2 - p1 > 0.2);
      }
      for (const [p1, p2] of parts) out.push({ a: [s.a[0] + s.u[0] * p1, s.a[1] + s.u[1] * p1], b: [s.a[0] + s.u[0] * p2, s.a[1] + s.u[1] * p2], len: p2 - p1, u: s.u });
    }
    return out;
  }
  // hướng pháp tuyến ra ngoài của một đoạn (so với tâm phòng)
  const outward = (s, c) => { let nx = s.u[1], ny = -s.u[0]; const mx = (s.a[0] + s.b[0]) / 2, my = (s.a[1] + s.b[1]) / 2; if ((mx - c[0]) * nx + (my - c[1]) * ny < 0) { nx = -nx; ny = -ny; } return [nx, ny]; };
  const DIRV = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };

  /* ---------- chuẩn hoá dữ liệu ---------- */
  const DOORK = {
    chinh: { t: "Lối vào chính", c: "dChinh" }, tudong: { t: "Cửa kính tự động", c: "dTudong" }, p: { t: "Cửa phòng", c: "dP" }, o: { t: "Lối mở, không cánh", c: "dO" },
    k: { t: "Cửa khóa ngoài giờ thư viện", c: "dK" }, nv: { t: "Cửa nhân viên, thẻ từ", c: "dNv" }, tn: { t: "Cửa thoát nạn, đẩy ra ngoài", c: "dTn" }, tnbd: { t: "Cửa thoát hiểm có chuông báo, chỉ mở khi khẩn cấp", c: "dTnbd" }, cuon: { t: "Cửa cuốn giao nhận", c: "dCuon" }, thang: { t: "Cửa thang chống cháy", c: "dThang" }
  };
  function prepare(plan) {
    for (const L of plan.levels) {
      L.env = L.env || [];
      for (const z of L.rooms) {
        // cắt khung chữ nhật theo vỏ nào cho phần giao lớn nhất
        if (!z.p) { const base = rectP(z.r); let best = null, ba = 0; for (const e of L.env) { const c = clip(base, e), a = c.length >= 3 ? area(c) : 0; if (a > ba) { ba = a; best = c; } } z.p = best && !z.noclip ? best : base; }
        z.a = area(z.p); z.cn = cen(z.p); z.bb = bbox(z.p);
      }
    }
    return plan;
  }
  // tìm đoạn đặt cửa: tới phòng khác, hoặc ra ngoài theo hướng N/E/S/W/"slot"
  function doorsOf(L, plan) {
    const byId = Object.fromEntries(L.rooms.map(z => [z.id, z])), out = [], err = [];
    for (const z of L.rooms) for (const spec of z.d || []) {
      const [to, w = 1.0, k = "p", pos = 0.5] = spec;
      let segs, ext = false;
      if (byId[to]) segs = sharedSegs(z.p, byId[to].p);
      else if (/^(N|S|E|W|X)$/.test(to)) {
        ext = true;
        segs = extSegs(z, L).filter(s => { if (to === "X") return Math.abs(s.u[0]) > 0.05 && Math.abs(s.u[1]) > 0.05; const [nx, ny] = outward(s, z.cn), v = DIRV[to]; return nx * v[0] + ny * v[1] > 0.7; });
      } else { err.push(`${z.id}: cửa tới "${to}" không có phòng này`); continue; }
      if (!segs.length) { err.push(`${z.id} → ${to}: không có cạnh chung để đặt cửa`); continue; }
      const s = segs.slice().sort((p, q) => q.len - p.len)[0];
      const ww = k === "o" ? Math.min(s.len - 0.2, typeof w === "number" ? w : s.len) : w;
      if (s.len < ww + 0.2) err.push(`${z.id} → ${to}: cạnh chung ${s.len.toFixed(1)} m nhỏ hơn cửa ${ww} m`);
      const c = Math.max(ww / 2 + 0.1, Math.min(s.len - ww / 2 - 0.1, s.len * pos));
      const a = [s.a[0] + s.u[0] * (c - ww / 2), s.a[1] + s.u[1] * (c - ww / 2)], b = [s.a[0] + s.u[0] * (c + ww / 2), s.a[1] + s.u[1] * (c + ww / 2)];
      out.push({ from: z.id, to: ext ? "ext" : to, dir: ext ? to : null, k, w: ww, a, b, m: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], u: s.u, n: outward(s, z.cn) });
    }
    return { doors: out, err };
  }

  /* ---------- nội thất: dùng bộ nội thất của mặt bằng cũ trên khung chữ nhật, bỏ món nằm ngoài đa giác ---------- */
  function furnish(z, L) {
    const P5 = getP5();
    if (!P5 || z.nofurn) return { S: [], seats: 0, tags: [] };
    const r = z.fr || z.r || z.bb;
    const f = P5.furn({ ...z, r, g: z.g || (z.core ? "core" : z.c && z.c[0]), st: z.core ? z.core.st : z.st }, L);
    const inside = s => s.t === "r" ? [[s.x, s.y], [s.x + s.w, s.y], [s.x + s.w, s.y + s.h], [s.x, s.y + s.h]].every(q => inPoly(z.p, q[0], q[1], 0.05)) : s.t === "c" ? inPoly(z.p, s.x, s.y, 0.05) : inPoly(z.p, s.x1, s.y1, 0.05) && inPoly(z.p, s.x2, s.y2, 0.05);
    const S = f.S.filter(inside);
    // quầy bar dọc mặt kính xiên (cạnh khe): bàn dài sâu 0,45 m, ghế cao cách 0,6 m
    if (z.bar) {
      const [p1, p2, n] = z.bar, L0 = dist(p1, p2), ux = (p2[0] - p1[0]) / L0, uy = (p2[1] - p1[1]) / L0;
      let nx = -uy, ny = ux; if (!inPoly(z.p, (p1[0] + p2[0]) / 2 + nx, (p1[1] + p2[1]) / 2 + ny)) { nx = -nx; ny = -ny; }
      const P = (t, o) => [p1[0] + ux * t + nx * o, p1[1] + uy * t + ny * o];
      S.push({ t: "l", x1: P(0.4, 0.5)[0], y1: P(0.4, 0.5)[1], x2: P(L0 - 0.4, 0.5)[0], y2: P(L0 - 0.4, 0.5)[1], k: "w" });
      let k = 0;
      for (let t = 0.8; t < L0 - 0.6 && k < n; t += 0.6) { const q = P(t, 0.95); if (inPoly(z.p, q[0], q[1], 0) ) { S.push({ t: "r", x: q[0] - 0.22, y: q[1] - 0.22, w: 0.44, h: 0.44, k: "f" }); k++; } }
    }
    const seats = z.c === "A2" || z.c === "A1" ? Math.round(z.a / 3) + (z.c === "A1" ? 0 : 0) : z.c === "B6" ? f.seats : S.filter(s => s.t === "r" && Math.abs(s.w - 0.44) < 1e-6 && Math.abs(s.h - 0.44) < 1e-6).length + (z.c === "B3" ? S.filter(s => s.t === "c" && Math.abs(s.r - 0.3) < 1e-6).length : 0);
    return { S, seats, tags: f.tags };
  }

  /* ---------- đồ thị đi lại: phòng là nút, cửa là cạnh; thang cùng mã nối các tầng ---------- */
  function graph(plan) {
    const nodes = new Map(), edges = [];
    plan.levels.forEach((L, li) => {
      for (const z of L.rooms) nodes.set(`${li}:${z.id}`, { li, z });
      const { doors } = doorsOf(L, plan);
      for (const d of doors) edges.push({ a: `${li}:${d.from}`, b: d.to === "ext" ? "ext" : `${li}:${d.to}`, d, li });
    });
    // thang bộ / thang máy cùng mã giữa các tầng
    const cores = [...nodes.entries()].filter(([, n]) => n.z.core && n.z.core.link);
    for (const [ka, na] of cores) for (const [kb, nb] of cores) if (ka < kb && na.z.core.link === nb.z.core.link && Math.abs(na.li - nb.li) === 1) edges.push({ a: ka, b: kb, d: { k: "len", m: na.z.cn, w: 1.2 }, v: 1 });
    return { nodes, edges };
  }
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  // đường ngắn nhất giữa hai phòng, chỉ đi qua cửa được phép; trả về chuỗi điểm theo tầng
  function route(G, from, to, ok = () => true, roomOk = () => true) {
    const start = typeof from === "string" ? from : null;
    const pts = n => n === "ext" ? null : G.nodes.get(n).z.cn;
    const Q = [[0, start, null, null]], best = new Map([[start, 0]]), prev = new Map();
    while (Q.length) {
      Q.sort((a, b) => a[0] - b[0]);
      const [c, n, , at] = Q.shift();
      if (n === to) break;
      for (const e of G.edges) {
        let m = null; if (e.a === n) m = e.b; else if (e.b === n) m = e.a; else continue;
        if (!ok(e.d, n, m)) continue;
        if (m !== "ext" && m !== to && !roomOk(m)) continue;
        if (m === "ext" && to !== "ext") continue;
        const here = at || pts(n) || e.d.m, cost = c + dist(here, e.d.m) + (e.v ? 6 : 0);
        if (cost < (best.has(m) ? best.get(m) : 1e9)) { best.set(m, cost); prev.set(m, [n, e]); Q.push([cost, m, e, e.d.m]); }
      }
    }
    if (!prev.has(to)) return null;
    const chain = []; let n = to;
    while (n !== start) { const [p, e] = prev.get(n); chain.unshift({ n, e }); n = p; }
    return { cost: best.get(to), chain };
  }

  /* ---------- hiệu quả: quãng đường (m, tính theo tâm phòng và cửa, mỗi lần đổi tầng cộng 6 m) ---------- */
  const EF = { c4c2: 15, c2c1: 15, c2a4: 25, c1b1: 50, a1a4: 15, wcB: 35, wcD: 30, wcB3: 15, wcA1: 25, read: 80 };
  function efficiency(plan, R, G, all, code, isZ, pubOk) {
    const nm = n => { const z = G.nodes.get(n).z; return `${z.id} (${z.n})`; };
    const best = (from, tos, ok, roomOk) => { let b = null; for (const t of tos) { if (t === from) return { cost: 0, to: t }; const r = route(G, from, t, ok, roomOk); if (r && (!b || r.cost < b.cost)) b = { cost: r.cost, to: t }; } return b; };
    const staff = d => true, rdr = m => !/^(nv|kho)/.test(G.nodes.get(m).z.ctl || "");
    const of = c => all.filter(n => code(n) === c);
    const E = R.eff = { rows: [] };
    const chk = (t, v, lim, msg) => { E.rows.push([t, v, lim]); if (v == null) R.err.push(`Hiệu quả: ${msg}: không có đường đi`); else if (v > lim) R.err.push(`Hiệu quả: ${msg} ${v.toFixed(0)} m (nên ≤ ${lim} m)`); };
    // đường sách: tiếp nhận → xử lý → kho → kệ; sách trả từ quầy về xử lý
    const C4 = of("C4"), C2 = of("C2"), C1 = of("C1"), A4 = all.filter(n => G.nodes.get(n).z.ctrl), A1 = of("A1");
    if (C4[0] && C2.length) { const b = best(C4[0], C2, staff); chk("Tiếp nhận → xử lý", b && b.cost, EF.c4c2, "sách mới từ tiếp nhận C4 tới xử lý C2 đi"); }
    if (C2[0] && C1.length) { const b = best(C2[0], C1, staff); chk("Xử lý → kho đóng", b && b.cost, EF.c2c1, "từ xử lý C2 tới kho đóng C1 đi"); }
    if (C2[0] && A4.length) { const b = best(C2[0], A4, staff); chk("Xử lý ↔ quầy mượn trả", b && b.cost, EF.c2a4, "sách trả từ quầy A4 về xử lý C2 đi"); }
    if (C1.length) { let w = 0, wn = null; for (const n of of("B1")) { const b = best(n, C1, staff); const v = b ? b.cost : 1e9; if (v > w) { w = v; wn = n; } } if (wn) chk("Kho đóng → kệ xa nhất", w >= 1e9 ? null : w, EF.c1b1, `kho đóng C1 tới kệ xa nhất ${nm(wn)} đi`); }
    // đón tiếp ngay trước quầy giữ đồ, mượn trả
    if (A1.length && A4.length) { let v = 1e9; for (const a of A1) { const b = best(a, A4, pubOk); if (b && b.cost < v) v = b.cost; } chk("Đón tiếp → quầy giữ đồ", v >= 1e9 ? null : v, EF.a1a4, "từ sảnh đón tiếp A1 tới quầy giữ đồ, mượn trả A4 đi"); }
    // vệ sinh: khu đọc có vệ sinh bên trong khu đọc; sự kiện, thiếu nhi, sảnh có vệ sinh gần
    const wcTv = of("E5").filter(n => isZ(n, /^tv/)), wcSk = of("E5").filter(n => isZ(n, /^sk/));
    { let w = 0, wn = null; for (const n of all.filter(k => /^B/.test(code(k)))) { const b = best(n, wcTv, pubOk, m => rdr(m) && !isZ(m, /^sk/)); const v = b ? b.cost : 1e9; if (v > w) { w = v; wn = n; } } if (wn) chk("Chỗ đọc → vệ sinh khu đọc", w >= 1e9 ? null : w, EF.wcB, `từ ${nm(wn)} tới vệ sinh trong khu đọc (không ra khỏi cổng từ) đi`); }
    for (const n of of("D1")) { const b = best(n, wcSk, pubOk, m => isZ(m, /^sk/)); chk("Phòng đa năng → vệ sinh sự kiện", b && b.cost, EF.wcD, "từ phòng đa năng D1 tới vệ sinh khu sự kiện đi"); }
    for (const n of of("B3")) { const b = best(n, wcTv, pubOk, rdr); chk("Thiếu nhi → vệ sinh", b && b.cost, EF.wcB3, "từ phòng thiếu nhi B3 tới vệ sinh đi"); }
    if (A1[0]) { const b = best(A1[0], wcSk, pubOk, m => isZ(m, /^sk/)); chk("Sảnh → vệ sinh công cộng", b && b.cost, EF.wcA1, "từ sảnh A1 tới vệ sinh công cộng đi"); }
    // người đọc: từ cửa vào tới chỗ đọc xa nhất
    { let w = 0, wn = null; for (const n of all.filter(k => /^B/.test(code(k)))) { const r = route(G, "ext", n, (d, a, b) => d.k !== "nv" && d.k !== "cuon" && d.k !== "tn" && d.k !== "tnbd", rdr); const v = r ? r.cost : 1e9; if (v > w) { w = v; wn = n; } } if (wn) chk("Cửa vào → chỗ đọc xa nhất", w >= 1e9 ? null : w, EF.read, `người đọc từ cửa vào tới ${nm(wn)} đi`); }
    // thang máy: mỗi tầng trên, khu sự kiện và khu thư viện đều có thang máy nằm trong chính khu đó (người khuyết tật, xe sách)
    plan.levels.forEach((L, li) => { if (!li) return; for (const [Z, t] of [[/^sk/, "khu sự kiện"], [/^tv/, "khu thư viện"]]) {
      const rooms = all.filter(n => G.nodes.get(n).li === li && isZ(n, Z) && !G.nodes.get(n).z.core && /^[A-E]/.test(code(n)));
      if (!rooms.length) continue;
      const lifts = all.filter(n => G.nodes.get(n).li === li && G.nodes.get(n).z.core && /l/.test(G.nodes.get(n).z.core.st));
      if (!lifts.some(c => rooms.some(r => route(G, r, c, pubOk, m => isZ(m, Z))))) R.err.push(`Hiệu quả: tầng ${li + 1} ${t} không có thang máy nằm trong khu (người khuyết tật, xe sách không lên được)`);
    } });
    // vệ sinh các tầng xếp chồng thẳng hàng (đường ống)
    plan.levels.forEach((L, li) => { if (!li) return; for (const z of L.rooms.filter(q => q.c === "E5")) if (!plan.levels[li - 1].rooms.some(o => o.c === "E5" && clip(o.p, z.p).length >= 3 && area(clip(o.p, z.p)) > 2)) R.warn.push(`Vệ sinh ${z.id} tầng ${li + 1} không chồng lên vệ sinh tầng dưới (ống nước phải đi ngang)`); });
  }

  /* ---------- tiếng ồn theo khối (góp ý 05/11): sự kiện, thiếu nhi, học nhóm, cà phê là nguồn ồn ---------- */
  const NOISY = /^(D1|D2|D4|A3|B3|B4)$/, QUIET = /^B2$/, READ = /^(B1|B5|B6)$/, GAPQ = 8;
  function segDist(p, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy; let t = L ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L : 0; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); }
  function polyGap(P, Q) { let m = 1e9; for (const [A, B] of [[P, Q], [Q, P]]) for (const v of A) B.forEach((b, i) => { m = Math.min(m, segDist(v, b, B[(i + 1) % B.length])); }); return m; }
  function noiseZones(plan, R) {
    const lv = plan.levels, nm = (L, z) => `${L.k === "t1" ? "T1" : "T" + (lv.indexOf(L) + 1)} ${z.id} (${z.n})`;
    lv.forEach((L, li) => {
      const rs = L.rooms.filter(z => !z.void);
      for (const q of rs.filter(z => QUIET.test(z.c || ""))) for (const o of rs.filter(z => NOISY.test(z.c || ""))) {
        const g = polyGap(q.p, o.p); if (g < GAPQ) R.err.push(`Tiếng ồn: ${nm(L, q)} cách ${o.id} (${o.n}) chỉ ${g.toFixed(1)} m, đọc yên tĩnh phải cách nguồn ồn ≥ ${GAPQ} m (đệm bằng kho, kệ, thang, hành lang)`); }
      for (const q of rs.filter(z => READ.test(z.c || ""))) for (const o of rs.filter(z => NOISY.test(z.c || ""))) {
        const sh = sharedSegs(q.p, o.p).reduce((t, s) => t + (s.len || 0), 0); if (sh > 1) R.err.push(`Tiếng ồn: ${nm(L, q)} chung vách ${sh.toFixed(0)} m với ${o.id} (${o.n}); khu đọc không sát vách phòng ồn, phải có vùng đệm`); }
      // văn phòng, phòng nhân viên cần yên (góp ý 05/11): không chung vách phòng ồn hay phòng kỹ thuật
      for (const q of rs.filter(z => /^E[12]$/.test(z.c || ""))) for (const o of rs.filter(z => NOISY.test(z.c || "") || z.c === "E4")) {
        const sh = sharedSegs(q.p, o.p).reduce((t, s) => t + (s.len || 0), 0); if (sh > 1) R.err.push(`Tiếng ồn: ${nm(L, q)} chung vách ${sh.toFixed(0)} m với ${o.id} (${o.n}); văn phòng, phòng nhân viên phải tránh phòng ồn`); }
      const up2 = lv[li + 1]; if (up2) for (const a of rs) for (const b of up2.rooms.filter(z => !z.void)) {
        if (!((/^E[12]$/.test(a.c || "") && /^(D1|D2|B3|B4|A3)$/.test(b.c || "")) || (/^E[12]$/.test(b.c || "") && /^(D1|D2|B3|B4|A3)$/.test(a.c || "")))) continue;
        const c = clip(a.p, b.p); if (c.length >= 3 && area(c) > 4) R.err.push(`Tiếng ồn: ${nm(up2, b)} nằm chồng lên ${nm(L, a)} (${area(c).toFixed(0)} m²); văn phòng, phòng nhân viên không chồng tầng với phòng ồn`); }
      // chồng tầng: phòng đọc không nằm ngay trên hoặc dưới phòng sự kiện, thiếu nhi, học nhóm
      const up = lv[li + 1]; if (up) for (const a of rs) for (const b of up.rooms.filter(z => !z.void)) {
        const pair = (NOISY.test(a.c || "") && (QUIET.test(b.c || "") || READ.test(b.c || ""))) || (NOISY.test(b.c || "") && (QUIET.test(a.c || "") || READ.test(a.c || "")));
        if (!pair) continue; if (!/^(D1|D2|B2)$/.test(a.c) && !/^(D1|D2|B2)$/.test(b.c)) continue;
        const c = clip(a.p, b.p); if (c.length >= 3 && area(c) > 4) R.err.push(`Tiếng ồn: ${nm(up, b)} nằm chồng lên ${nm(L, a)} (${area(c).toFixed(0)} m²); phòng đa năng và đọc yên tĩnh không chồng tầng với phòng ồn hay phòng đọc`); }
    });
  }

  /* ---------- phân tích ---------- */
  function analyse(plan, D) {
    prepare(plan);
    const R = { levels: [], byCode: {}, byZone: {}, seats: {}, err: [], warn: [], ok: [], total: 0, use: 0, circ: 0, scen: {} };
    plan.levels.forEach((L, li) => {
      const M = { k: L.k, z: L.z, env: L.env.reduce((s, p) => s + area(p), 0), rooms: 0, err: [], warn: [], doors: doorsOf(L, plan) };
      M.err.push(...M.doors.err);
      // phủ kín vỏ, không chồng
      const st = 0.25; let gap = 0, over = 0;
      const bb = bbox(L.env.flat());
      for (let x = bb[0] + st / 2; x < bb[0] + bb[2]; x += st) for (let y = bb[1] + st / 2; y < bb[1] + bb[3]; y += st) {
        if (!L.env.some(e => inPoly(e, x, y))) continue;
        const n = L.rooms.filter(z => !z.outOk && inPoly(z.p, x, y)).length;
        if (!n) gap += st * st; else if (n > 1) over += st * st;
      }
      if (gap > 1) M.err.push(`còn ${gap.toFixed(1)} m² trong vỏ chưa có phòng`);
      if (over > 0.5) M.err.push(`các phòng chồng lên nhau ${over.toFixed(1)} m²`);
      for (const z of L.rooms) {
        if (!convex(z.p)) M.err.push(`${z.id}: phòng không lồi, đường đi có thể xuyên tường`);
        if (z.a < 1) M.err.push(`${z.id}: phòng nằm ngoài vỏ`);
        if (!(z.d || []).length && !L.rooms.some(o => (o.d || []).some(d => d[0] === z.id))) M.err.push(`${z.id} (${z.n}): không có cửa`);
        M.rooms += z.a;
        if (z.void) continue;
        if (D.target[z.c]) { R.byCode[z.c] = (R.byCode[z.c] || 0) + z.a; R.byZone[z.c[0]] = (R.byZone[z.c[0]] || 0) + z.a; R.use += z.a; }
        else R.circ += z.a;
        const f = furnish(z, L); z.furn = f;
        if (D.seats[z.c]) R.seats[z.c] = (R.seats[z.c] || 0) + f.seats;
      }
      R.total += M.env - L.rooms.filter(z => z.void).reduce((s, z) => s + z.a, 0);
      // tầng trên: ≥ 2 thang bộ thẳng tầng dưới
      const stairs = L.rooms.filter(z => z.core && /u/.test(z.core.st));
      M.stairs = stairs.length;
      if (li > 0 && stairs.length < 2) M.err.push(`chỉ có ${stairs.length} thang bộ, cần ít nhất 2`);
      if (li > 0) for (const s of stairs) if (!plan.levels[li - 1].rooms.some(q => q.core && q.core.link === s.core.link)) M.err.push(`thang ${s.id} không có thang tầng dưới cùng mã`);
      // thang máy, vệ sinh người khuyết tật mỗi tầng
      if (!L.rooms.some(z => z.core && /l/.test(z.core.st))) M.err.push("tầng này không có thang máy");
      if (!L.rooms.some(z => z.c === "E5" && /khuyết tật|KT/.test(z.wc || ""))) M.err.push("tầng này không có vệ sinh người khuyết tật");
      R.levels.push(M);
    });
    // diện tích, số chỗ theo đề
    for (const c of Object.keys(D.target)) {
      const v = R.byCode[c] || 0, t = D.target[c], p = (v - t) / t * 100;
      if (Math.abs(p) > 10) R.err.push(`${c} ${D.names ? D.names[c] || "" : ""}: ${v.toFixed(0)} m² so với đề ${t} (${p >= 0 ? "+" : ""}${p.toFixed(0)}%)`);
      if (D.seats[c] && (R.seats[c] || 0) < D.seats[c]) R.err.push(`${c}: vẽ được ${R.seats[c] || 0} chỗ, đề cần ${D.seats[c]}`);
    }
    if (R.total > 3000) R.err.push(`tổng sàn ${R.total.toFixed(0)} m² vượt 3.000`);
    const G = graph(plan), all = [...G.nodes.keys()];
    R.G = G;
    const isZ = (n, re) => re.test(G.nodes.get(n).z.ctl || "");
    const code = n => G.nodes.get(n).z.c || "";
    // mọi phòng tới được từ một lối vào (ngày thường, nhân viên được qua mọi cửa)
    for (const n of all) if (!route(G, n, "ext")) R.err.push(`${n}: không có đường ra ngoài`);
    /* --- tình huống 2: sự kiện ngoài giờ --- */
    const evOpen = n => isZ(n, /^sk/);
    const evOk = (d, a, b) => d.k !== "k" && d.k !== "nv" && d.k !== "cuon" && (b === "ext" || evOpen(b)) && (a === "ext" || evOpen(a));
    const evNeed = ["D1", "D4", "A2", "A3"];
    const fromExt = n => route(G, n, "ext", evOk, evOpen);
    for (const c of evNeed) { const n = all.find(k => code(k) === c); if (!n) continue; if (!fromExt(n)) R.err.push(`Ngoài giờ: khách không tới được ${c} mà không qua khu đóng`); }
    if (!all.some(n => code(n) === "E5" && evOpen(n) && fromExt(n))) R.err.push("Ngoài giờ: khách sự kiện không có vệ sinh mở");
    // rò rỉ: cửa không khóa nối khu sự kiện với khu đóng
    for (const e of G.edges) { if (e.b === "ext" || e.v) continue; const sa = evOpen(e.a), sb = evOpen(e.b); if (sa !== sb && !/^(k|nv|cuon|tn|tnbd)$/.test(e.d.k)) R.err.push(`Ngoài giờ: cửa ${e.a} ↔ ${e.b} (${e.d.k}) không khóa được, khách sẽ đi lọt vào khu đóng`); }
    // thang nối khu mở với tầng khu đóng: thang phải có cửa khóa ở đầu tầng đóng
    // thoát nạn khu mở không qua cửa khóa
    for (const n of all.filter(evOpen)) if (!route(G, n, "ext", (d, a, b) => d.k !== "k" && d.k !== "cuon" && (b === "ext" || evOpen(b)))) R.err.push(`Ngoài giờ: ${n} không thoát ra ngoài được khi khóa cửa`);
    /* --- tình huống 1: ngày thường, phòng sự kiện đóng; người đọc đi tới mọi phòng đọc không qua cửa nhân viên --- */
    const pubOk = (d) => d.k !== "nv" && d.k !== "cuon";
    for (const n of all) { const c = code(n); if (/^B/.test(c) && !route(G, n, "ext", pubOk, m => !/^(nv|kho)/.test(G.nodes.get(m).z.ctl || ""))) R.err.push(`Ngày thường: người đọc không tới được ${n} (${c}) mà không qua cửa nhân viên`); }
    /* --- tình huống 4: giao nhận sách --- */
    const C4 = all.find(n => code(n) === "C4"), C2 = all.find(n => code(n) === "C2"), C1 = all.find(n => code(n) === "C1"), A4 = all.find(n => code(n) === "A4");
    if (C4 && !G.edges.some(e => (e.a === C4 || e.b === C4) && e.b === "ext" && e.d.k === "cuon")) R.err.push("C4 tiếp nhận sách chưa có cửa cuốn ra ngoài");
    for (const [a, b] of [[C4, C2], [C2, C1], [C2, A4]]) if (a && b && !route(G, a, b, () => true, m => /^(nv|kho)/.test(G.nodes.get(m).z.ctl || "") || m === b)) R.warn.push(`Giao nhận: ${a} → ${b} phải đi qua khu công cộng`);
    /* --- hiệu quả đi lại (góp ý 05/11): kho gần kệ, đón tiếp ngay trước quầy giữ đồ, vệ sinh gần, thang máy đúng khu --- */
    efficiency(plan, R, G, all, code, isZ, pubOk);
    noiseZones(plan, R);
    /* --- yên tĩnh: phòng cần yên (nz 0) không sát vách phòng ồn (nz 3) --- */
    plan.levels.forEach((L, li) => { for (const z of L.rooms) for (const o of L.rooms) if (z.id < o.id && Math.abs((z.nz ?? 1) - (o.nz ?? 1)) >= 3 && sharedSegs(z.p, o.p).length) R.err.push(`Tiếng ồn: ${z.id} (${z.n}) sát vách ${o.id} (${o.n})`); });
    // tầng trên đặt phòng yên trên phòng ồn
    /* --- thoát nạn: khoảng cách xa nhất tới lối ra (tầng 1) hoặc thang bộ (tầng trên), mốc tự đặt 30 m --- */
    plan.levels.forEach((L, li) => {
      const M = R.levels[li]; M.far = 0; M.farRoom = "";
      const exits = li === 0 ? M.doors.doors.filter(d => d.to === "ext" && d.k !== "cuon").map(d => ({ m: d.m, n: d.from })) : L.rooms.filter(z => z.core && /u/.test(z.core.st)).map(z => ({ m: z.cn, n: z.id }));
      for (const z of L.rooms) {
        if (z.core || z.void) continue;
        // mỗi điểm trong phòng đi tới lối thoát gần nó nhất (phòng có cửa ở hai đầu thì mỗi nửa ra một đầu); lấy điểm xa nhất
        const paths = [];
        for (const x of exits) {
          const r = x.n === z.id ? { cost: 0, chain: [] } : route(G, `${li}:${z.id}`, `${li}:${x.n}`, d => d.k !== "cuon");
          if (!r) continue;
          const first = r.chain.length ? r.chain[0].e.d.m : x.m;
          const rest = r.chain.reduce((s, c, i) => s + (i ? dist(r.chain[i - 1].e.d.m, c.e.d.m) : 0), 0) + (r.chain.length ? dist(r.chain[r.chain.length - 1].e.d.m, x.m) : 0);
          paths.push({ first, rest });
        }
        const pts = [...z.p]; { const [bx, by, bw, bh] = z.bb; for (let x = bx + 0.5; x < bx + bw; x += 1) for (let y = by + 0.5; y < by + bh; y += 1) if (inPoly(z.p, x, y)) pts.push([x, y]); }
        const bestD = paths.length ? Math.max(...pts.map(q => Math.min(...paths.map(P => dist(q, P.first) + P.rest)))) : 1e9;
        if (bestD > M.far) { M.far = bestD; M.farRoom = z.id; }
      }
      if (M.far > 30) M.warn.push(`xa nhất tới lối thoát ${M.far.toFixed(1)} m ở ${M.farRoom} (mốc tự đặt 30 m, đối chiếu QCVN 06:2022)`);
      // phòng đông người cần 2 lối ra
      for (const z of L.rooms) {
        const occ = z.occ || z.seat || 0;
        if (occ >= 50) { const n = M.doors.doors.filter(d => (d.from === z.id || d.to === z.id) && d.k !== "o").length + M.doors.doors.filter(d => (d.from === z.id || d.to === z.id) && d.k === "o").length; if (n < 2) R.err.push(`${z.id}: ${occ} người nhưng chỉ có ${n} lối ra`); }
      }
    });
    /* --- người trực theo tình huống --- */
    const sc = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const L of plan.levels) for (const s of L.staff || []) for (const k of s.sc) sc[k]++;
    for (const s of plan.site && plan.site.staff || []) for (const k of s.sc) sc[k]++;
    R.staff = sc;
    lightAndSecurity(plan, R, G);
    for (const k in sc) if (sc[k] > 12) R.err.push(`Tình huống ${k}: cần ${sc[k]} người trực, vượt 12 nhân viên của đề`);
    return R;
  }

  /* ---------- ánh sáng tự nhiên và bảo mật sách (góp ý của thầy, 04/11/2026) ---------- */
  // phòng có người làm việc, đọc, sinh hoạt phải lấy sáng từ mặt Bắc hoặc Nam của khu đất (mặt Đông, Tây làm đặc)
  const LIT = /^(A[1-4]|B[1-6]|C2|D1|D4|E[123])$/, DL = 8, OBS = 45, OH = 4.5;
  const isNS = s => Math.abs(s.u[1]) < 0.05, isEW = s => Math.abs(s.u[0]) < 0.05;
  function blocksOf(plan) {
    const W = typeof window !== "undefined" ? window.G3 : null;
    if (!plan.idea || !W || !W.footPts) return [];
    // lấy thẳng các khối từ build(), không qua prep (prep lại gọi phân tích mặt bằng, sẽ lặp vô hạn)
    try { if (!plan.__blocks) plan.__blocks = plan.idea.build().v.filter(v => v.k !== "lines" && v.k !== "disc" && W.vTop(v) - W.vBot(v) > 2).map(v => ({ p: W.footPts(v), top: W.vTop(v), bot: W.vBot(v) })); return plan.__blocks; } catch (e) { plan.__blockErr = e.message; return []; }
  }
  function lightAndSecurity(plan, R, G) {
    const blocks = blocksOf(plan);
    if (plan.__blockErr) R.err.push(`Ánh sáng: không dựng được khối 3D để kiểm tra che sáng (${plan.__blockErr})`);
    R.light = [];
    plan.levels.forEach((L, li) => {
      const above = plan.levels[li + 1];
      for (const z of L.rooms) {
        if (!LIT.test(z.c || "")) continue;
        const ext = extSegs(z, L), win = ext.filter(s => isNS(s) && s.len >= 1.2).map(s => ({ ...s, n: outward(s, z.cn) })), ew = ext.filter(s => isEW(s) && s.len >= 1.2).length;
        const covered = above && above.rooms.some(o => !o.void && clip(o.p, z.p).length >= 3 && area(clip(o.p, z.p)) > 1);
        const topOk = !!z.top && !covered;
        // vùng tối: điểm cách cửa sổ Bắc/Nam gần nhất quá 8 m (đo vuông góc, cộng phần lệch ngang)
        let n = 0, dark = 0; const darkPts = [];
        const [bx, by, bw, bh] = z.bb;
        for (let x = bx + 0.5; x < bx + bw; x += 1) for (let y = by + 0.5; y < by + bh; y += 1) {
          if (!inPoly(z.p, x, y)) continue;
          n++;
          if (topOk) continue;
          const d = Math.min(1e9, ...win.map(w => { const x1 = Math.min(w.a[0], w.b[0]), x2 = Math.max(w.a[0], w.b[0]); return Math.abs(y - w.a[1]) + Math.max(0, x1 - x, x - x2); }));
          if (d > DL) { dark++; darkPts.push([x, y]); }
        }
        // khối khác che trước cửa sổ: góc che từ cửa sổ (cao sàn + 1,2 m) tới đỉnh khối chắn
        let worst = null, ohWorst = null;
        const zw = L.z + 1.2;
        for (const w of win) for (const t of [0.25, 0.5, 0.75]) {
          const px = w.a[0] + (w.b[0] - w.a[0]) * t, py = w.a[1] + (w.b[1] - w.a[1]) * t;
          // khối đứng trước cửa sổ (chân thấp hơn đầu cửa sổ) tính góc che; sàn tầng trên đua ra phía trên cửa sổ là ô văng che nắng, chỉ báo lỗi khi đua quá 4,5 m
          let oh = 0, inOh = true;
          for (let dd = 0.4; dd < 40; dd += 0.4) {
            const qx = px + w.n[0] * dd, qy = py + w.n[1] * dd;
            let b = blocks.find(B => B.top > zw + 0.5 && B.bot < zw + 1.6 && inPoly(B.p, qx, qy));
            // khối chồng lên nhau (tầng 2 dựng thành khối riêng): lấy đỉnh cao nhất tại điểm chạm
            if (b) { b = { top: Math.max(...blocks.filter(B => inPoly(B.p, qx, qy)).map(B => B.top)) }; const ang = Math.atan2(b.top - zw, dd) * 180 / Math.PI; if (!worst || ang > worst.ang) worst = { ang, d: dd, top: b.top, face: w.n[1] < 0 ? "Bắc" : "Nam" }; break; }
            if (inOh) { if (blocks.some(B => B.bot >= zw + 1.6 && B.bot < zw + 6 && inPoly(B.p, qx, qy))) oh = dd; else inOh = false; }
          }
          if (oh > OH && (!ohWorst || oh > ohWorst.d)) ohWorst = { d: oh, face: w.n[1] < 0 ? "Bắc" : "Nam" };
        }
        const pct = n ? 1 - dark / n : 1;
        R.light.push({ li, id: z.id, n: z.n, c: z.c, wins: win.map(w => [w.a, w.b]), win: win.length, faces: [...new Set(win.map(w => w.n[1] < 0 ? "Bắc" : "Nam"))], ew, pct, top: topOk, worst, darkPts });
        const where = `T${li + 1} ${z.id} (${z.n})`;
        if (!win.length && !topOk) R.err.push(`Ánh sáng: ${where} không có cửa sổ hướng Bắc hoặc Nam${ew ? ", chỉ giáp mặt Đông/Tây" : ", nằm kẹt giữa nhà"}`);
        else if (pct < 0.9) R.err.push(`Ánh sáng: ${where} có ${Math.round((1 - pct) * 100)}% diện tích cách cửa sổ Bắc/Nam quá ${DL} m (bí ở giữa)`);
        if (ohWorst && !topOk) R.err.push(`Ánh sáng: cửa sổ ${ohWorst.face} của ${where} nằm dưới phần sàn trên đua ra ${ohWorst.d.toFixed(1)} m (quá ${OH} m, phòng bị tối)`);
        if (worst && worst.ang > OBS && !topOk) R.err.push(`Ánh sáng: cửa sổ ${worst.face} của ${where} bị khối cao +${worst.top.toFixed(1)} cách ${worst.d.toFixed(1)} m che, góc che ${worst.ang.toFixed(0)}° (> ${OBS}°)`);
      }
    });
    /* --- bảo mật sách: từ ngoài vào khu đọc, và từ khu đọc ra ngoài, đều phải qua phòng kiểm soát (quầy thủ thư, cổng từ) --- */
    const Gr = R.G, all = [...Gr.nodes.keys()];
    const isCtrl = n => n !== "ext" && !!Gr.nodes.get(n).z.ctrl;
    const isB = n => n !== "ext" && /^B/.test(Gr.nodes.get(n).z.c || "");
    const entryOk = d => /^(chinh|tudong|p|o|k|thang|len)$/.test(d.k);
    const exitOk = d => /^(chinh|tudong|p|o|k|thang|len|tn)$/.test(d.k);
    const bfs = (starts, pass) => { const seen = new Set(starts), q = [...starts], via = new Map(); while (q.length) { const n = q.shift(); for (const e of Gr.edges) { let m = null; if (e.a === n) m = e.b; else if (e.b === n) m = e.a; else continue; if (seen.has(m) || !pass(e.d, n, m)) continue; seen.add(m); via.set(m, { from: n, d: e.d }); if (m !== "ext") q.push(m); } } return { seen, via }; };
    /* --- đón tiếp là bản lề (Hình 1 của đề: A–B hỗ trợ người đọc, A–D tiếp cận hoạt động văn hóa):
           khách vào khu sự kiện D và vào quầy kiểm soát thư viện đều phải đi qua sảnh đón tiếp A1 --- */
    const isA1 = n => n !== "ext" && Gr.nodes.get(n).z.c === "A1";
    if (!all.some(isA1)) R.err.push("Đón tiếp: chưa có sảnh đón tiếp A1");
    else {
      const viaA1 = bfs(["ext"], (d, a, b) => entryOk(d) && !isA1(b));
      const skip = [...new Set(all.filter(n => viaA1.seen.has(n) && (/^D[14]$/.test(Gr.nodes.get(n).z.c || "") || isCtrl(n))).map(n => Gr.nodes.get(n).z))];
      R.sec0 = skip.map(z => z.id);
      for (const z of skip) R.err.push(`Đón tiếp: khách từ ngoài tới ${z.id} (${z.n}) mà không qua sảnh đón tiếp A1`);
    }
    R.sec = { ctrl: all.filter(isCtrl), inLeak: [], outLeak: [] };
    if (!R.sec.ctrl.length) { R.err.push("Bảo mật sách: chưa có phòng kiểm soát (quầy thủ thư có cổng từ) trên lối vào khu đọc"); return; }
    const inR = bfs(["ext"], (d, a, b) => entryOk(d) && !isCtrl(b));
    for (const n of all.filter(isB)) if (inR.seen.has(n)) { R.sec.inLeak.push(n); const z = Gr.nodes.get(n).z; R.err.push(`Bảo mật sách: người ngoài vào được ${z.id} (${z.n}) mà không qua quầy kiểm soát`); }
    const outR = bfs(all.filter(isB), (d, a, b) => exitOk(d) && !isCtrl(b) && !(b === "ext" && d.k === "tnbd"));
    if (outR.seen.has("ext")) {
      const doors = Gr.edges.filter(e => e.b === "ext" && outR.seen.has(e.a) && exitOk(e.d) && e.d.k !== "tnbd").map(e => `${e.a.split(":")[1]} (${P6K(e.d.k)})`);
      R.sec.outLeak = doors;
      R.err.push(`Bảo mật sách: từ khu đọc ra được ngoài mà không qua quầy, qua cửa ${[...new Set(doors)].join(", ")}; cửa thoát nạn của khu đọc phải là cửa có chuông báo (tnbd)`);
    }
  }
  const P6K = k => (DOORK[k] ? DOORK[k].t : k).toLowerCase();

  const api = { LIT, DL, EF, rectP, area, cen, bbox, inPoly, clip, convex, sharedSegs, extSegs, doorsOf, furnish, graph, route, analyse, prepare, DOORK, dist };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") { window.G3 = window.G3 || {}; window.G3.P6 = api; }
})();
