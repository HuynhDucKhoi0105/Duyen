
/* ================= 20 ý tưởng 3D: diện tích, đếm cột, bảng cắt ================= */
(function (G) {
  const LV = [2.7, 7.2, 11.7, 16.2]; // cao độ kiểm tra giữa tầng 1, 2, 3, 4
  const num = (v, d = 0) => v.toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const rectPts = (x, y, w, d) => [[x, y], [x + w, y], [x + w, y + d], [x, y + d]];
  const zAt = (z, x, y) => typeof z === "function" ? z(x, y) : z;
  const shoe = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L)) : 0; return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
  // tol: khe hở nhỏ giữa hai khối (≤ 0,3 m) vẫn tính là liền phòng
  function inPoly(pts, x, y, tol = 1e-3) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if (segDist([x, y], pts[i], pts[j]) < tol) return true;
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  const footPts = v => v.k === "poly" ? v.pts : v.k === "loft" ? v.bot : v.k === "slab" ? v.pts3.map(p => [p[0], p[1]]) : v.k === "arcade" ? rectPts(v.x0, v.y1, v.depth, v.y2 - v.y1)
    : v.k === "wallh" ? (v.ax === "x" ? rectPts(v.at, v.u1, v.t, v.u2 - v.u1) : rectPts(v.u1, v.at, v.u2 - v.u1, v.t)) : rectPts(v.x, v.y, v.w, v.d);
  // hướng mặt ngoài của cạnh i (đa giác mặt bằng; y tăng về phía Nam)
  function faceDir(pts, i) {
    const a = pts[i], b = pts[(i + 1) % pts.length], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    let nx = dy / L, ny = -dx / L;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    if (inPoly(pts, mx + nx * 0.05, my + ny * 0.05)) { nx = -nx; ny = -ny; }
    return { dir: Math.abs(nx) >= Math.abs(ny) ? (nx > 0 ? "E" : "W") : (ny < 0 ? "N" : "S"), nx, ny, L, a, b };
  }
  const prismKind = v => v.k === "box" || v.k === "poly" || v.k === "shed";
  const prismPts = v => v.k === "poly" ? v.pts : rectPts(v.x, v.y, v.w, v.d);
  const prismTop = (v, x, y) => v.k === "poly" ? zAt(v.zt, x, y) : v.k === "shed" ? shedZ(v, x, y) : v.z2;
  const shedZ = (v, px, py) => v.dir === "-y" ? v.zhi + (v.zlo - v.zhi) * (py - v.y) / v.d : v.dir === "+y" ? v.zlo + (v.zhi - v.zlo) * (py - v.y) / v.d : v.dir === "-x" ? v.zhi + (v.zlo - v.zhi) * (px - v.x) / v.w : v.zlo + (v.zhi - v.zlo) * (px - v.x) / v.w;
  // loại mặt đứng: dac (đặc), kinh (kính trần), lam (kính + lam đứng), dua (kính + mái đua / lam ngang)
  const faType = (v, dir) => (v.fa && v.fa[dir]) || (v.c === "glass" ? "kinh" : "dac");
  function vTop(v) {
    if (v.k === "shed") return Math.max(v.zlo, v.zhi);
    switch (v.k) {
      case "poly": return Math.max(...v.pts.map(([x, y]) => zAt(v.zt, x, y)));
      case "shed": return Math.max(v.zlo, v.zhi);
      case "slab": return Math.max(...v.pts3.map(p => p[2]));
      case "lines": return Math.max(...v.segs.flat().map(p => p[2]));
      default: return v.z2;
    }
  }
  function vBot(v) {
    if (v.k === "slab") return Math.min(...v.pts3.map(p => p[2])) - v.t;
    if (v.k === "lines") return Math.min(...v.segs.flat().map(p => p[2]));
    return v.z1;
  }
  function floorsOf(v) {
    if (v.fl != null) return v.fl;
    if (v.zone === "X" || v.k === "lines" || v.k === "arcade") return 0;
    const h = v.k === "poly" ? v.pts.reduce((s, [x, y]) => s + zAt(v.zt, x, y), 0) / v.pts.length - v.z1 : vTop(v) - v.z1;
    return Math.max(1, Math.round(h / 4.4));
  }
  const lvOf = z => z >= 13.9 ? 3 : z >= 9.4 ? 2 : z >= 4.9 ? 1 : 0;
  const isRoom = v => v.zone !== "X" && (v.k === "box" || v.k === "poly" || v.k === "loft");
  const tallAt = (v, x, y, zL) => v.k !== "poly" || zAt(v.zt, x, y) > zL;
  // điểm nằm trong một khối, hoặc nằm trong khe nhỏ kẹp giữa hai khối
  const inside = (vs, x, y, zL) => vs.some(v => inPoly(footPts(v), x, y) && tallAt(v, x, y, zL)) || vs.filter(v => inPoly(footPts(v), x, y, 0.15) && tallAt(v, x, y, zL)).length >= 2;
  // cột "trong nhà": vòng tròn bán kính 0,6 m quanh cột nằm trọn trong các khối có người dùng ở tầng đó
  function interior(vs, x, y, zL) { const r = 0.6, q = r * Math.SQRT1_2; return [[r, 0], [-r, 0], [0, r], [0, -r], [q, q], [q, -q], [-q, q], [-q, -q]].every(([a, b]) => inside(vs, x + a, y + b, zL)); }

  const MATN = { glass: "Mica trong", stone: "Foam đen, xám", stoneTop: "Foam đen, xám", blk: "Foam xám", grass: "Foam + bột cỏ", grassTop: "Foam + bột cỏ", warn: "Bìa đỏ đất", lamp: "Foam vàng, giấy can", gold: "Foam vàng", deck: "Gỗ balsa, bìa nâu", ribbon: "Bìa màu gạch", zCirc: "Bìa xám nhạt", ink: "Que sơn đen" };
  const matOf = c => MATN[c] || (["accent", "violet", "accessC", "zA", "zB", "zC", "zD", "zE"].includes(c) ? "Foam màu" : "Foam trắng");
  const cm = m => num(m / 2, 1); // tỉ lệ 1/200: 1 m = 0,5 cm
  function cutList(V, st) {
    const m = new Map();
    const add = (name, dim, mat, n = 1) => { const k = name + "|" + dim + "|" + mat, o = m.get(k) || { name, dim, mat, n: 0 }; o.n += n; m.set(k, o); };
    for (const v of V) {
      const h = vTop(v) - vBot(v), ab = () => [v.w, v.d].sort((p, q) => p - q);
      const bbox = pts => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)].sort((p, q) => p - q); };
      switch (v.k) {
        case "box": { const [a, b] = ab(); add("Hộp", `${cm(a)} × ${cm(b)} × ${cm(h)}`, matOf(v.c)); break; }
        case "shed": { const [a, b] = ab(); add("Khối vát một mái", `${cm(a)} × ${cm(b)}, cao ${cm(Math.min(v.zlo, v.zhi) - v.z1)} → ${cm(Math.max(v.zlo, v.zhi) - v.z1)}`, matOf(v.c)); break; }
        case "gable": { const [a, b] = ab(); add("Mái hai dốc", `${cm(a)} × ${cm(b)} × ${cm(h)}`, matOf(v.c)); break; }
        case "hip": { const [a, b] = ab(); add(a === b ? "Mái chóp" : "Mái bốn dốc", `${cm(a)} × ${cm(b)} × ${cm(h)}`, matOf(v.c)); break; }
        case "frustum": { const [a, b] = ab(); add("Chóp cụt", `đáy ${cm(a)} × ${cm(b)}, cao ${cm(h)}`, matOf(v.c)); break; }
        case "vault": add("Vòm (bìa uốn)", `dài ${cm(v.ax === "x" ? v.w : v.d)}, nhịp ${cm(v.ax === "x" ? v.d : v.w)}, cao ${cm(v.rise)}`, matOf(v.c)); break;
        case "poly": { const [a, b] = bbox(v.pts); add("Khối cắt theo mẫu", `${cm(a)} × ${cm(b)}, cao ${cm(Math.min(...v.pts.map(([x, y]) => zAt(v.zt, x, y))) - v.z1)}–${cm(h)}`, matOf(v.c)); break; }
        case "loft": { const [a, b] = bbox(v.topPts.concat(v.bot)); add("Khối bát giác (bìa + que)", `${cm(a)} × ${cm(b)} × ${cm(h)}`, matOf(v.c)); break; }
        case "slab": { const [a, b] = bbox(v.pts3); add("Bản dốc, cầu thang", `${cm(a)} × ${cm(b)}`, matOf(v.c)); break; }
        case "disc": add("Đĩa tròn (cửa sổ)", `Ø ${cm(2 * v.r)}`, matOf(v.c)); break;
        case "wallh": add("Tấm tường khoét ô", `${cm(v.u2 - v.u1)} × ${cm(v.z2 - v.z1)}, ${v.holes.length} ô`, matOf(v.c)); break;
        case "arcade": add("Tấm mặt vòm", `${cm(v.y2 - v.y1)} × ${cm(v.z2 - v.z1)}, khoét ${v.ops.length} ô vòm`, matOf(v.c)); break;
      }
    }
    const colH = new Map(); let segN = 0, segL = 0;
    for (const s of st) {
      if (s.t === "col") { const k = cm(s.z2 - s.z1); colH.set(k, (colH.get(k) || 0) + 1); }
      else if (s.t === "wall") { const [a, b] = [s.w, s.d].sort((p, q) => p - q); add("Tường chịu lực", `${cm(a)} × ${cm(b)} × ${cm(s.z2 - s.z1)}`, "Foam, bìa xám"); }
      else { segN++; segL += Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1], s.b[2] - s.a[2]); }
    }
    for (const [k, n] of colH) add("Cột", `cao ${k}`, "Que tre, que gỗ 3 mm", n);
    if (segN) add("Thanh dàn, cáp", `tổng dài ${num(segL / 2)}`, "Que balsa 2 mm, chỉ", segN);
    return [...m.values()];
  }

  // khối chính (m) hay khối phụ (p): gán riêng, theo hàm của ý tưởng, hoặc theo vùng khối chính
  function roleOf(I, v) {
    if (v.k === "lines") return "x";
    if (v.role) return v.role;
    const f = I.roleOf && I.roleOf(v); if (f) return f;
    if (!I.main) return "m";
    const p = footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2, cz = (vBot(v) + vTop(v)) / 2;
    return I.main.some(([x1, y1, x2, y2, z1, z2]) => cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2 && cz >= z1 && cz <= z2) ? "m" : "p";
  }
  // diện tích mặt đứng theo hướng; bỏ các mặt áp vào khối khác
  // encl: vùng có vỏ bao (tường khoét ô) — mặt khối bên trong không tính là mặt ngoài
  function facade(V, encl) {
    const out = { N: { dac: 0, che: 0, tran: 0 }, E: { dac: 0, che: 0, tran: 0 }, S: { dac: 0, che: 0, tran: 0 }, W: { dac: 0, che: 0, tran: 0 } };
    const solids = V.filter(o => o.k !== "lines" && o.k !== "disc");
    for (const v of V) if (v.k === "wallh" && v.side) { const A = (v.u2 - v.u1) * (v.z2 - v.z1), hA = v.holes.reduce((s, o) => s + (o.u2 - o.u1) * (o.z2 - o.z1), 0); out[v.side].dac += A - hA; out[v.side].che += hA; }
    for (const v of V) {
      if (!prismKind(v) || (v.zone === "X" && !v.env)) continue;
      const pts = prismPts(v);
      pts.forEach((_, i) => {
        const f = faceDir(pts, i), mx = (f.a[0] + f.b[0]) / 2, my = (f.a[1] + f.b[1]) / 2;
        const h = (prismTop(v, f.a[0], f.a[1]) + prismTop(v, f.b[0], f.b[1])) / 2 - v.z1;
        if (h < 1.5) return;
        if (encl && encl.some(([x1, y1, x2, y2]) => mx > x1 && mx < x2 && my > y1 && my < y2)) return;
        const zm = v.z1 + h / 2, px = mx + f.nx * 0.35, py = my + f.ny * 0.35;
        if (solids.some(o => o !== v && vBot(o) < zm && zm < vTop(o) && inPoly(footPts(o), px, py))) return;
        const ty = faType(v, f.dir), A = f.L * h;
        out[f.dir][ty === "dac" ? "dac" : ty === "kinh" ? "tran" : "che"] += A;
      });
    }
    return out;
  }
  // cột chống thêm: phần khối trên cao cách chỗ tựa gần nhất (khối bên dưới, cột, tường) quá 4 m thì đặt cột,
  // lưới khoảng 6 m, đứng trên mái khối thấp bên dưới hoặc trên nền. Khối treo bằng dây văng thì bỏ qua.
  const PROP = 4, PSTEP = 6;
  const rdist = (r, x, y) => Math.hypot(Math.max(r[0] - x, 0, x - r[2]), Math.max(r[1] - y, 0, y - r[3]));
  const bbOf = v => { const p = footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
  function autoProps(V, st) {
    const outV = [], outS = [], cab = V.filter(v => v.k === "lines" && v.cab).flatMap(v => v.segs.flat());
    const posts = st.filter(s => s.t === "col" || s.t === "wall");
    // khối treo bằng dây, và các tầng chồng liền với khối đó (hộp treo nhiều tầng dựng bằng nhiều hộp một tầng)
    const hung = new Set(V.filter(v => v.zone !== "X" && prismKind(v) && cab.filter(p => inPoly(footPts(v), p[0], p[1], 0.4) && p[2] >= vBot(v) - 0.3 && p[2] <= vTop(v) + 0.3).length >= 4));
    const ov = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
    for (let grow = true; grow;) { grow = false; for (const v of V) if (!hung.has(v) && v.zone !== "X" && prismKind(v)) for (const h of hung) { const A = bbOf(v), Bh = bbOf(h); if ((Math.abs(vTop(v) - vBot(h)) <= 0.6 || Math.abs(vTop(h) - vBot(v)) <= 0.6) && ov(A, Bh) >= 0.3 * Math.min((A[2] - A[0]) * (A[3] - A[1]), (Bh[2] - Bh[0]) * (Bh[3] - Bh[1]))) { hung.add(v); grow = true; break; } } }
    // vùng tựa ở đỉnh một khối: trụ thon lấy tiết diện đỉnh, bản dốc lấy phần gần cao độ đáy khối
    const topBB = (o, z1) => { if (o.k === "loft") return bbOf({ k: "poly", pts: o.topPts }); if (o.k === "slab") { const q = o.pts3.filter(p => p[2] >= z1 - 1); return q.length ? bbOf({ k: "poly", pts: q.map(p => [p[0], p[1]]) }) : null; } return bbOf(o); };
    for (const v of V) {
      if (v.zone === "X" || !prismKind(v) || hung.has(v)) continue;
      const z1 = vBot(v), fp = footPts(v), B = bbOf(v);
      if (z1 < 2) continue;
      // cầu tựa hai đầu vào hai khối hai bên thì không cần cột
      const z2 = vTop(v), side = V.filter(o => o !== v && o.zone !== "X" && prismKind(o) && Math.min(vTop(o), z2) - Math.max(vBot(o), z1) >= 2).map(bbOf), tc = (a, b) => Math.abs(a - b) <= 0.35;
      const lap = (a1, a2, b1, b2) => Math.min(a2, b2) - Math.max(a1, b1) > 1;
      if ((side.some(q => tc(q[2], B[0]) && lap(q[1], q[3], B[1], B[3])) && side.some(q => tc(q[0], B[2]) && lap(q[1], q[3], B[1], B[3]))) || (side.some(q => tc(q[3], B[1]) && lap(q[0], q[2], B[0], B[2])) && side.some(q => tc(q[1], B[3]) && lap(q[0], q[2], B[0], B[2])))) continue;
      // thanh xiên, nhánh cây, chân xiên đi lên từ bên dưới tới đáy khối cũng là chỗ tựa (dàn trong khối thì không)
      const struts = st.filter(sg => sg.t === "seg").flatMap(sg => [[sg.a, sg.b], [sg.b, sg.a]]).filter(([p, q]) => p[2] >= z1 - 0.6 && p[2] <= z1 + 0.3 && q[2] < z1 - 1 && rdist(B, p[0], p[1]) < 0.5).map(([p]) => [p[0], p[1], p[0], p[1]]);
      const sup = struts.concat(V.filter(o => o !== v && o.k !== "lines" && o.k !== "disc" && vBot(o) < z1 - 0.3 && vTop(o) >= z1 - 0.6).map(o => topBB(o, z1)).filter(Boolean)
        .map(q => [Math.max(q[0], B[0]), Math.max(q[1], B[1]), Math.min(q[2], B[2]), Math.min(q[3], B[3])]).filter(q => q[2] - q[0] > 0.2 && q[3] - q[1] > 0.2)
        .concat(posts.filter(s => s.z2 >= z1 - 0.6 && s.z1 < z1 - 0.3).map(s => s.t === "col" ? [s.x, s.y, s.x, s.y] : [s.x, s.y, s.x + s.w, s.y + s.d]).filter(q => rdist(B, (q[0] + q[2]) / 2, (q[1] + q[3]) / 2) < 0.5)));
      const nx = Math.max(1, Math.ceil((B[2] - B[0] - 1.2) / PSTEP)), ny = Math.max(1, Math.ceil((B[3] - B[1] - 1.2) / PSTEP));
      for (let i = 0; i <= nx; i++) for (let j = 0; j <= ny; j++) {
        const x = B[0] + 0.6 + (B[2] - B[0] - 1.2) * i / nx, y = B[1] + 0.6 + (B[3] - B[1] - 1.2) * j / ny;
        if (!inPoly(fp, x, y)) continue;
        const d = sup.length ? Math.min(...sup.map(r => rdist(r, x, y))) : 99;
        if (d <= PROP) continue;
        const under = V.filter(o => o !== v && o.k !== "lines" && vTop(o) <= z1 + 0.05 && inPoly(footPts(o), x, y, 0.3));
        const z0 = under.length ? Math.max(...under.map(vTop)) : 0;
        if (z0 > z1 - 1) continue;
        outV.push({ k: "box", x: x - 0.3, y: y - 0.3, w: 0.6, d: 0.6, z1: z0, z2: z1, c: "stone", top: "stoneTop", zone: "X", fl: 0, area: 0, role: "p", prop: 1, lv: lvOf(z0 + 0.01) });
        outS.push({ t: "col", x, y, z1: z0, z2: z1, prop: 1 });
      }
    }
    return { v: outV, st: outS };
  }
  // đủ diện tích đề ABCDE chưa: mỗi nhóm cần sàn khối ≥ sàn sử dụng của đề × 1,15 (tường, hành lang trong nhóm)
  const BRIEF = { A: 270, B: 1110, C: 260, D: 300, E: 280 }, GROSS = 1.15;
  function brief(P) {
    const need = {}, have = {}, short = [], extra = [];
    let def = 0, sur = 0;
    for (const k in BRIEF) { need[k] = BRIEF[k] * GROSS; have[k] = P.byZ[k] || 0; const d = have[k] - need[k]; if (d < 0) { def -= d; short.push([k, -d]); } else { sur += d; extra.push([k, d]); } }
    const st = P.tot > 3000 ? "vuot" : !short.length ? "du" : def <= sur ? "chia" : "thieu";
    return { need, have, short, extra, def, sur, st, ok: st === "du" || st === "chia" };
  }
  const PREP = [];
  function prep(x) {
    const I = typeof x === "number" ? G.ideas[x] : x;
    if (I.__p) return I.__p;
    const r = I.build();
    const V = r.v.concat(I.extra || []).map(v => {
      const fl = floorsOf(v), foot = v.zone === "X" || v.k === "lines" || v.k === "arcade" || v.k === "disc" ? 0 : (v.footOverride || shoe(footPts(v)));
      return { ...v, fl, area: foot * fl, role: roleOf(I, v) };
    }).filter(v => !v.prop);
    const pr = autoProps(V, r.st), st = r.st.filter(s => !s.prop).concat(pr.st);
    V.push(...pr.v);
    const byZ = {}, byR = { m: 0, p: 0 }; let tot = 0;
    for (const v of V) if (v.area > 0) { byZ[v.zone] = (byZ[v.zone] || 0) + v.area; byR[v.role] += v.area; tot += v.area; }
    const rest = r.area ? Math.max(0, r.area - tot) : 0;
    if (r.area) tot = r.area;
    const cols = st.filter(s => s.t === "col");
    const lev = LV.map(zL => {
      const vs = V.filter(v => isRoom(v) && v.z1 < zL && zL < vTop(v));
      if (!vs.length) return null;
      return cols.filter(c => c.z1 < zL && zL < c.z2 && interior(vs, c.x, c.y, zL)).length;
    });
    const H = Math.max(...V.map(vTop), ...st.map(s => s.t === "seg" ? Math.max(s.a[2], s.b[2]) : s.z2));
    const P = { I, V, fac: facade(V, I.encl), st, labels: I.lab || r.labels || [], byR, byZ, tot, rest, lev, H, floors: lev.filter(x => x != null).length, cut: cutList(V, st), props: pr.v.length };
    P.brief = brief(P);
    // phương án đã có mặt bằng chi tiết: số tầng và đủ đề lấy theo mặt bằng
    if (I.floors) P.floors = I.floors;
    if (I.planBrief) { const b = I.planBrief(); if (b) P.brief = b; }
    return (I.__p = P);
  }
  Object.assign(G, { BRIEF, GROSS, LV, num, rectPts, zAt, inPoly, footPts, vTop, vBot, lvOf, prep, faceDir, faType });
})(window.G3);
