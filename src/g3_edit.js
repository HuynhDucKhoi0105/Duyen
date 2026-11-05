
/* ================= Sắp lại khối: áp danh sách thao tác lên khối gốc ================= */
(function (G) {
  const { footPts, vTop, vBot, inPoly } = G;
  const cl = o => typeof o === "function" ? o : Array.isArray(o) ? o.map(cl) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, cl(v)])) : o;
  const pt = (p, dx, dy, dz) => p.length > 2 ? [p[0] + dx, p[1] + dy, p[2] + dz] : [p[0] + dx, p[1] + dy];
  const BOXY = ["box", "shed", "gable", "hip", "frustum", "vault"];
  function shift(v, dx, dy, dz) {
    const T = q => q.map(p => pt(p, dx, dy, dz)), H = o => ({ ...o, z1: o.z1 + dz, z2: o.z2 + dz });
    if (dz) delete v.lv;
    switch (v.k) {
      case "poly": { v.pts = T(v.pts); const z = v.zt; v.zt = typeof z === "function" ? (x, y) => z(x - dx, y - dy) + dz : z + dz; v.z1 += dz; break; }
      case "loft": v.bot = T(v.bot); v.topPts = T(v.topPts); v.z1 += dz; v.z2 += dz; break;
      case "slab": v.pts3 = T(v.pts3); break;
      case "lines": v.segs = v.segs.map(s => s.map(p => pt(p, dx, dy, dz))); break;
      case "disc": v.cx += dx; v.cy += dy; v.cz += dz; break;
      case "wallh": {
        const [da, du] = v.ax === "x" ? [dx, dy] : [dy, dx];
        v.at += da; v.u1 += du; v.u2 += du; v.z1 += dz; v.z2 += dz; v.holes = v.holes.map(o => H({ ...o, u1: o.u1 + du, u2: o.u2 + du })); break;
      }
      case "arcade": v.x0 += dx; v.y1 += dy; v.y2 += dy; v.z1 += dz; v.z2 += dz; v.ops = v.ops.map(o => ({ ...o, yc: o.yc + dy })); if (v.holes) v.holes = v.holes.map(o => H({ ...o, y1: o.y1 + dy, y2: o.y2 + dy })); break;
      default: v.x += dx; v.y += dy; v.z1 += dz; v.z2 += dz; if (v.k === "shed") { v.zlo += dz; v.zhi += dz; } if (v.bands) v.bands = v.bands.map(z => z + dz);
    }
  }
  // điểm p (x, y, z) có thuộc khối v không (trụ nghiêng: xét tiết diện ở đúng cao độ đó)
  function holds(v, p, tol = 0.35) {
    const z = p[2];
    if (z < vBot(v) - 0.25 || z > vTop(v) + 0.35) return false;
    if (v.k === "loft") { const t = Math.max(0, Math.min(1, (z - v.z1) / (v.z2 - v.z1 || 1))); return inPoly(v.bot.map((b, i) => [b[0] + (v.topPts[i][0] - b[0]) * t, b[1] + (v.topPts[i][1] - b[1]) * t]), p[0], p[1], tol + 0.4); }
    return inPoly(footPts(v), p[0], p[1], tol);
  }
  // cột, tường thuộc khối: đứng trong mặt bằng khối và dừng ở trong khối (gồm cả cột đỡ ngay dưới khối)
  const ownsPost = (v, s) => { const x = s.t === "col" ? s.x : s.x + s.w / 2, y = s.t === "col" ? s.y : s.y + s.d / 2; return inPoly(footPts(v), x, y, 0.3) && s.z2 >= vBot(v) - 0.6 && s.z2 <= vTop(v) + 0.35; };
  const cen = v => { const p = footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]); return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2]; };
  // xoay 90° theo chiều kim đồng hồ trên mặt bằng (y hướng về Nam)
  const RF = { N: "E", E: "S", S: "W", W: "N" }, RD = { "-y": "+x", "+x": "+y", "+y": "-x", "-x": "-y" };
  function rot(v, c) {
    const R = p => p.length > 2 ? [c[0] - (p[1] - c[1]), c[1] + (p[0] - c[0]), p[2]] : [c[0] - (p[1] - c[1]), c[1] + (p[0] - c[0])];
    if (v.fa) v.fa = Object.fromEntries(Object.entries(v.fa).map(([k, t]) => [RF[k] || k, t]));
    if (BOXY.includes(v.k)) { const cx = v.x + v.w / 2, cy = v.y + v.d / 2, [nx, ny] = R([cx, cy]); [v.w, v.d] = [v.d, v.w]; v.x = nx - v.w / 2; v.y = ny - v.d / 2; if (v.dir) v.dir = RD[v.dir]; if (v.ax) v.ax = v.ax === "x" ? "y" : "x"; return true; }
    if (v.k === "poly" && typeof v.zt !== "function") { v.pts = v.pts.map(R); return true; }
    if (v.k === "loft") { v.bot = v.bot.map(R); v.topPts = v.topPts.map(R); return true; }
    return false;
  }
  const canRot = v => BOXY.includes(v.k) || v.k === "loft" || (v.k === "poly" && typeof v.zt !== "function");
  const canSize = v => BOXY.includes(v.k);
  const canFl = v => v.k === "box" || v.k === "shed" || (v.k === "poly" && typeof v.zt !== "function");

  // cả khối nhiều tầng: các khối cùng vai trò (chính / phụ) chồng liền nhau theo chiều đứng, chồng lên nhau trên mặt bằng
  // (hộp treo nhiều tầng thường được dựng bằng nhiều hộp một tầng, mỗi tầng chia phòng khác nhau)
  const bbx = v => { const p = footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
  const ovA = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const arA = a => (a[2] - a[0]) * (a[3] - a[1]);
  function stackOf(list, v) {
    if (!v || v.k === "lines" || v.k === "loft") return v ? [v] : [];
    const cand = list.filter(o => o && o.k !== "lines" && o.k !== "loft" && o.k !== "slab" && o.role === v.role), g = [v];
    const near = (a, b) => { const A = bbx(a), B = bbx(b); return (Math.abs(vTop(a) - vBot(b)) <= 0.6 || Math.abs(vTop(b) - vBot(a)) <= 0.6) && ovA(A, B) >= 0.3 * Math.min(arA(A), arA(B)); };
    let grow = true;
    while (grow) { grow = false; for (const o of cand) if (!g.includes(o) && g.some(q => near(q, o))) { g.push(o); grow = true; } }
    return g;
  }
  function derive(base, rec) {
    const P = G.prep(base);
    const V = P.V.map((v, i) => { const o = cl(v); delete o.area; o.__i = i; return o; });
    let st = P.st.map(cl), lab = P.labels.map(cl);
    const lines = () => V.filter(o => o && o.k === "lines");
    // mọi điểm "dính" vào khối v: đầu dây, đầu thanh dàn, nhãn
    function eachPt(v, f) {
      for (const L of lines()) if (L !== v) L.segs = L.segs.map(s => s.map(p => holds(v, p) ? f(p) : p));
      for (const s of st) if (s.t === "seg") { if (holds(v, s.a)) s.a = f(s.a); if (holds(v, s.b)) s.b = f(s.b); }
      lab = lab.map(l => holds(v, [l[0], l[1], l[2]], 0.5) ? [...f([l[0], l[1], l[2]]), ...l.slice(3)] : l);
    }
    for (const op of rec.ops || []) {
      const v = V[op.i];
      if (op.o === "add") {
        const b = op.b, n = Math.max(1, Math.round((b.z2 - b.z1) / 4.5));
        V.push({ __i: V.length, k: "box", x: b.x, y: b.y, w: b.w, d: b.d, z1: b.z1, z2: b.z2, c: b.c || "sheet", zone: b.zone || "B", fl: n, role: b.role || "p", fa: { N: "kinh", E: "lam", S: "dua", W: "dac" }, added: 1 });
        for (const [x, y] of [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.d], [b.x, b.y + b.d]]) st.push({ t: "col", x, y, z1: 0, z2: b.z2 });
        continue;
      }
      if (!v) continue;
      const grp = op.st ? stackOf(V, v) : [v], inG = p => grp.some(o => holds(o, p)), ownG = s => grp.some(o => ownsPost(o, s));
      if (op.o === "mv") {
        const dx = op.dx || 0, dy = op.dy || 0, dz = op.dz || 0, f = p => pt(p, dx, dy, dz);
        const posts = st.filter(s => s.t !== "seg" && ownG(s));
        for (const L of lines()) if (!grp.includes(L)) L.segs = L.segs.map(s => s.map(p => inG(p) ? f(p) : p));
        for (const s of st) if (s.t === "seg") { const a = inG(s.a), b = inG(s.b); if (a) s.a = f(s.a); if (b) s.b = f(s.b); }
        lab = lab.map(l => grp.some(o => holds(o, [l[0], l[1], l[2]], 0.5)) ? [...f([l[0], l[1], l[2]]), ...l.slice(3)] : l);
        for (const s of posts) { s.x += dx; s.y += dy; s.z2 += dz; if (s.z1 > 0.6) s.z1 += dz; }
        for (const o of grp) shift(o, dx, dy, dz);
      } else if (op.o === "del") {
        st = st.filter(s => s.t === "seg" ? !(inG(s.a) || inG(s.b)) : !ownG(s));
        for (const L of lines()) if (!grp.includes(L)) L.segs = L.segs.filter(s => !(inG(s[0]) || inG(s[1])));
        lab = lab.filter(l => !grp.some(o => holds(o, [l[0], l[1], l[2]], 0.5)));
        for (const o of grp) V[o.__i] = null;
      } else if (op.o === "dup") {
        for (const o of grp) { const c = cl(o); c.dup = 1; c.__i = V.length; shift(c, op.dx || 0, op.dy || 0, op.dz || 0); V.push(c); }
        for (const s of st.filter(s => s.t !== "seg" && ownG(s))) st.push({ ...s, x: s.x + (op.dx || 0), y: s.y + (op.dy || 0) });
      } else if (op.o === "sz" && canSize(v)) {
        for (const o of grp) if (canSize(o)) { o.w = Math.max(2, o.w + (op.dw || 0)); o.d = Math.max(2, o.d + (op.dd || 0)); delete o.footOverride; }
      } else if (op.o === "fl" && canFl(v)) {
        const dz = 4.5 * op.dn, h = vTop(v) - vBot(v);
        if (h + dz < 2) continue;
        if (v.k === "box") { v.z2 += dz; delete v.bands; }
        else if (v.k === "shed") { v.zlo += dz; v.zhi += dz; }
        else v.zt += dz;
        if (v.zone !== "X") v.fl = Math.max(1, (v.fl || Math.round(h / 4.5)) + op.dn);
        delete v.footOverride;
      } else if (op.o === "rot" && canRot(v)) {
        const c = cen(v), R = p => [c[0] - (p[1] - c[1]), c[1] + (p[0] - c[0]), p[2]];
        const posts = st.filter(s => s.t !== "seg" && ownG(s));
        for (const L of lines()) if (!grp.includes(L)) L.segs = L.segs.map(s => s.map(p => inG(p) ? R(p) : p));
        for (const s of st) if (s.t === "seg") { const a = inG(s.a), b = inG(s.b); if (a) s.a = R(s.a); if (b) s.b = R(s.b); }
        lab = lab.map(l => grp.some(o => holds(o, [l[0], l[1], l[2]], 0.5)) ? [...R([l[0], l[1], l[2]]), ...l.slice(3)] : l);
        for (const s of posts) { if (s.t === "col") { [s.x, s.y] = R([s.x, s.y, 0]); } else { const q = R([s.x + s.w / 2, s.y + s.d / 2, 0]); [s.w, s.d] = [s.d, s.w]; s.x = q[0] - s.w / 2; s.y = q[1] - s.d / 2; } }
        for (const o of grp) if (canRot(o)) rot(o, c);
      } else if (op.o === "role") v.role = v.role === "m" ? "p" : "m";
      else if (op.o === "mat") { v.c = op.c; delete v.c2; if (op.c === "glass") v.op = 0.8; else delete v.op; v.top = op.top || undefined; }
      else if (op.o === "zone") { const h = vTop(v) - vBot(v); v.zone = op.z; v.fl = op.z === "X" ? 0 : Math.max(1, Math.round(h / 4.5)); }
    }
    const keep = V.filter(Boolean);
    return {
      id: rec.id || "draft", fam: "mine", code: rec.code || "Của tôi", name: rec.name || `${base.name} · bản sắp lại`, rule: `Tự sắp lại từ ${base.code || ""} ${base.name}`.replace(/\s+/g, " "),
      tag: `Bạn tự sắp lại từ phương án ${base.code ? base.code + " " : ""}${base.name}`, story: base.story, why: base.why || [], kc: base.kc, qa: base.qa || [], cut: base.cut || "",
      lab, base, rec, build: () => ({ v: keep, st })
    };
  }
  G.edit = { derive, holds, canRot, canSize, canFl, BOXY, stackOf };
})(window.G3);
