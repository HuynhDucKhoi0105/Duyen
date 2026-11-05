
/* ================= 20 ý tưởng 3D: trình xem xoay được ================= */
(function () {
  const G = window.G3;
  if (!G) return;
  function mount(cfg) {
  const host = document.getElementById(cfg.host);
  if (!host) return;
  host.classList.add("g3v");
  const IDEAS = cfg.ideas, K = cfg.key, { num, rectPts, zAt, inPoly, footPts, vTop, vBot, lvOf, faceDir, faType } = G;
  const ST = G.store, ED = G.edit;
  const prep = x => G.prep(typeof x === "number" ? IDEAS[x] : typeof x === "string" ? mineIdea(x) : x);
  const ZN = { A: "A Đón tiếp", B: "B Đọc", C: "C Kho, nghiệp vụ", D: "D Văn hóa", E: "E Hỗ trợ", L: "Sảnh, cầu nối" };
  const ZT = { A: 270, B: 1110, C: 260, D: 300, E: 280 };
  const ZTOK = { A: "zA", B: "zB", C: "zC", D: "zD", E: "zE", L: "zCirc" };
  const ROLE = { m: "ribbon", p: "glass" }, ROLEN = { m: "Khối chính", p: "Khối phụ" };
  const EXP = 7, NOCUT = 22, HINT = "Kéo: xoay · Cuộn hoặc chụm hai ngón: phóng to · Chuột phải hoặc Shift + kéo: dời";
  const MATS = [["sheet", "Trắng, bê tông sáng"], ["stone", "Đá tối"], ["blk", "Xám đậm"], ["glass", "Kính"], ["ribbon", "Gạch nung"], ["deck", "Gỗ"], ["accent", "Xanh"], ["gold", "Vàng đất"], ["warn", "Đỏ đất"], ["stone|grass", "Đá, mái cỏ"], ["sheet|grass", "Trắng, mái cỏ"]];
  const pkey = (I, i) => `${K}:${I.id || i}`;
  const north = () => (G.north ? G.north() : 0);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue("--" + n).trim() || "#999999";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = q => host.querySelector(q);

  /* ---------- Mặt khối (tọa độ khu đất, z hướng lên) ---------- */
  const lift = f => f.map(([x, y, z]) => [x, y, z > 0.3 ? z + 0.03 : z]); // mặt đáy khối nâng 3 cm, tránh trùng mặt mái khối bên dưới
  function prismF(pts, z1, zt) {
    const b = pts.map(([x, y]) => [x, y, z1]), t = pts.map(([x, y]) => [x, y, zAt(zt, x, y)]), s = [lift(b).reverse()];
    for (let i = 0; i < b.length; i++) { const j = (i + 1) % b.length; s.push([b[i], b[j], t[j], t[i]]); }
    return { s, t: [t] };
  }
  const boxF = (x, y, w, d, z1, z2) => prismF(rectPts(x, y, w, d), z1, z2);
  const mergeF = (...Fs) => ({ s: Fs.flatMap(F => F.s), t: Fs.flatMap(F => F.t) });
  function sideRing(b, t) { const o = []; for (let i = 0; i < b.length; i++) { const j = (i + 1) % b.length; o.push([b[i], b[j], t[j], t[i]]); } return o; }
  function withFa(F, pts, v) {
    if (!v.fa && v.c !== "glass") return F;
    const out = { s: [F.s[0]], t: F.t, g: [], fx: [] };
    F.s.slice(1).forEach((f, i) => {
      const fd = faceDir(pts, i), ty = faType(v, fd.dir);
      if (ty === "dac") out.s.push(f); else { out.g.push(f); if (ty === "lam" || ty === "dua") out.fx.push({ ty, f, fd }); }
    });
    return out;
  }
  // lam đứng (mỗi 1,5 m, sâu 0,6 m) và mái đua / lam ngang (mỗi tầng, sâu 1,4 m)
  function fxFaces(v, fx) {
    const o = [];
    for (const { ty, f, fd } of fx) {
      const [a, b, tb, ta] = f, nx = fd.nx, ny = fd.ny, L = fd.L, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
      const quad = (s0, s1, d0, d1) => [[a[0] + ux * s0 + nx * d0, a[1] + uy * s0 + ny * d0], [a[0] + ux * s1 + nx * d0, a[1] + uy * s1 + ny * d0], [a[0] + ux * s1 + nx * d1, a[1] + uy * s1 + ny * d1], [a[0] + ux * s0 + nx * d1, a[1] + uy * s0 + ny * d1]];
      const topAt = s => ta[2] + (tb[2] - ta[2]) * s / L, z0 = a[2];
      if (ty === "lam") { const n = Math.max(2, Math.round(L / 1.5)); for (let k = 0; k <= n; k++) { const sc = L * k / n, s0 = Math.max(0, sc - 0.08), s1 = Math.min(L, sc + 0.08); const F = prismF(quad(s0, s1, 0, 0.6), z0, topAt(sc)); o.push(...F.s, ...F.t); } }
      else { const hmin = Math.min(ta[2], tb[2]); for (let z = z0 + 4.5; z <= hmin + 0.05; z += 4.5) { const F = prismF(quad(-0.2, L + 0.2, 0, 1.4), z - 0.25, z - 0.05); o.push(...F.s, ...F.t); } if (hmin - z0 < 4.4) { const F = prismF(quad(-0.2, L + 0.2, 0, 1.4), hmin - 0.25, hmin - 0.05); o.push(...F.s, ...F.t); } }
    }
    return o;
  }
  function facesOf(v) {
    const { x, y, w, d, z1, z2 } = v, X = x + w, Y = y + d;
    switch (v.k) {
      case "box": return withFa(boxF(x, y, w, d, z1, z2), rectPts(x, y, w, d), v);
      case "poly": return withFa(prismF(v.pts, z1, v.zt), v.pts, v);
      case "shed": {
        const { zlo, zhi, dir } = v;
        const f = dir === "-y" ? (px, py) => zhi + (zlo - zhi) * (py - y) / d : dir === "+y" ? (px, py) => zlo + (zhi - zlo) * (py - y) / d : dir === "-x" ? px => zhi + (zlo - zhi) * (px - x) / w : px => zlo + (zhi - zlo) * (px - x) / w;
        return withFa(prismF(rectPts(x, y, w, d), z1, f), rectPts(x, y, w, d), v);
      }
      case "gable": {
        const bot = lift([[x, y, z1], [X, y, z1], [X, Y, z1], [x, Y, z1]]);
        if (v.ax === "x") { const m = y + d / 2; return { s: [bot, [[x, y, z1], [x, Y, z1], [x, m, z2]], [[X, y, z1], [X, Y, z1], [X, m, z2]]], t: [[[x, y, z1], [X, y, z1], [X, m, z2], [x, m, z2]], [[X, Y, z1], [x, Y, z1], [x, m, z2], [X, m, z2]]] }; }
        const m = x + w / 2; return { s: [bot, [[x, y, z1], [X, y, z1], [m, y, z2]], [[x, Y, z1], [X, Y, z1], [m, Y, z2]]], t: [[[x, Y, z1], [x, y, z1], [m, y, z2], [m, Y, z2]], [[X, y, z1], [X, Y, z1], [m, Y, z2], [m, y, z2]]] };
      }
      case "hip": {
        const bot = lift([[x, y, z1], [X, y, z1], [X, Y, z1], [x, Y, z1]]);
        if (w >= d) { const i = d / 2, m = y + d / 2, r1 = [x + i, m, z2], r2 = [X - i, m, z2]; return { s: [bot], t: [[[x, y, z1], [X, y, z1], r2, r1], [[X, Y, z1], [x, Y, z1], r1, r2], [[x, Y, z1], [x, y, z1], r1], [[X, y, z1], [X, Y, z1], r2]] }; }
        const i = w / 2, m = x + w / 2, r1 = [m, y + i, z2], r2 = [m, Y - i, z2];
        return { s: [bot], t: [[[x, Y, z1], [x, y, z1], r1, r2], [[X, y, z1], [X, Y, z1], r2, r1], [[x, y, z1], [X, y, z1], r1], [[X, Y, z1], [x, Y, z1], r2]] };
      }
      case "frustum": {
        const cx = x + w / 2, cy = y + d / 2, tw = w * v.s / 2, td = d * v.s / 2;
        const b = rectPts(x, y, w, d).map(([a, c]) => [a, c, z1]), t = [[cx - tw, cy - td, z2], [cx + tw, cy - td, z2], [cx + tw, cy + td, z2], [cx - tw, cy + td, z2]];
        return { s: [lift(b)], t: [...sideRing(b, t), t] };
      }
      case "vault": {
        const n = 12, span = v.ax === "x" ? d : w, r = v.rise, R = (span * span / 4 + r * r) / (2 * r), cz = z1 + r - R, al = Math.asin(Math.min(1, span / 2 / R));
        const prof = []; for (let i = 0; i <= n; i++) { const th = -al + 2 * al * i / n; prof.push([span / 2 + R * Math.sin(th), cz + R * Math.cos(th)]); }
        const P = v.ax === "x" ? (u, q) => [x + u, y + q[0], q[1]] : (u, q) => [x + q[0], y + u, q[1]], L = v.ax === "x" ? w : d;
        const t = []; for (let i = 0; i < n; i++) t.push([P(0, prof[i]), P(L, prof[i]), P(L, prof[i + 1]), P(0, prof[i + 1])]);
        return { s: [prof.map(q => P(0, q)), prof.map(q => P(L, q)), lift(rectPts(x, y, w, d).map(([a, c]) => [a, c, z1]))], t };
      }
      case "loft": { const b = v.bot.map(([a, c]) => [a, c, z1]), t = v.topPts.map(([a, c]) => [a, c, z2]); return { s: [lift(b), ...sideRing(b, t)], t: [t] }; }
      case "disc": {
        const n = 28, h = v.t / 2, P = (o, a) => v.ax === "x" ? [v.cx + o, v.cy + v.r * Math.cos(a), v.cz + v.r * Math.sin(a)] : [v.cx + v.r * Math.cos(a), v.cy + o, v.cz + v.r * Math.sin(a)];
        const A = Array.from({ length: n }, (_, i) => 2 * Math.PI * i / n), f0 = A.map(a => P(-h, a)), f1 = A.map(a => P(h, a));
        return { s: [f0, ...sideRing(f0, f1)], t: [f1] };
      }
      case "slab": { const t = v.pts3, b = t.map(([a, c, z]) => [a, c, z - v.t]); return { s: [b, ...sideRing(b, t)], t: [t] }; }
    }
    return { s: [], t: [] };
  }
  function beamF(a, b, r) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), dir = B.clone().sub(A).normalize();
    const ref = Math.abs(dir.z) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
    const u = new THREE.Vector3().crossVectors(dir, ref).normalize().multiplyScalar(r), w = new THREE.Vector3().crossVectors(dir, u).normalize().multiplyScalar(r);
    const c = (P, p, q) => [P.x + u.x * p + w.x * q, P.y + u.y * p + w.y * q, P.z + u.z * p + w.z * q], Q = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    const ba = Q.map(([p, q]) => c(A, p, q)), bb = Q.map(([p, q]) => c(B, p, q));
    return [ba, bb, ...sideRing(ba, bb)];
  }

  /* ---------- Chuyển sang hình học three.js (khu đất x, y, z → three x, z, y) ---------- */
  function triPush(o, a, b, c) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-10) return;
    o.push(a[0], a[2], a[1], c[0], c[2], c[1], b[0], b[2], b[1]);
  }
  function triFace(f, o) {
    if (f.length === 3) return triPush(o, f[0], f[1], f[2]);
    let nx = 0, ny = 0, nz = 0;
    for (let i = 0; i < f.length; i++) { const a = f[i], b = f[(i + 1) % f.length]; nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); nz += (a[0] - b[0]) * (a[1] + b[1]); }
    if (f.length > 4 && Math.abs(nz) > 0.5 * Math.hypot(nx, ny, nz)) { for (const t of THREE.ShapeUtils.triangulateShape(f.map(p => new THREE.Vector2(p[0], p[1])), [])) triPush(o, f[t[0]], f[t[1]], f[t[2]]); return; }
    for (let i = 1; i < f.length - 1; i++) triPush(o, f[0], f[i], f[i + 1]);
  }
  function geomFrom(F) {
    const pos = [], g = new THREE.BufferGeometry(); let start = 0;
    [F.s, F.t, F.g || []].forEach((list, gi) => { for (const f of list) triFace(f, pos); const n = pos.length / 3; g.addGroup(start, n - start, gi); start = n; });
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals(); return g;
  }
  function lineGeo(segs) { const p = []; for (const [a, b] of segs) p.push(a[0], a[2], a[1], b[0], b[2], b[1]); const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3)); return g; }
  function wallhGeo(v) {
    const sh = new THREE.Shape(); sh.moveTo(v.u1, v.z1); sh.lineTo(v.u2, v.z1); sh.lineTo(v.u2, v.z2); sh.lineTo(v.u1, v.z2); sh.closePath();
    for (const o of v.holes) { const p = new THREE.Path(); p.moveTo(o.u1, o.z1); p.lineTo(o.u2, o.z1); p.lineTo(o.u2, o.z2); p.lineTo(o.u1, o.z2); p.closePath(); sh.holes.push(p); }
    const g = new THREE.ExtrudeGeometry(sh, { depth: v.t, bevelEnabled: false });
    g.applyMatrix4(v.ax === "x" ? new THREE.Matrix4().set(0, 0, 1, v.at, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1) : new THREE.Matrix4().makeTranslation(0, 0, v.at));
    g.computeVertexNormals(); return g;
  }
  function arcadeGeo(v) {
    const sh = new THREE.Shape(); sh.moveTo(v.y1, v.z1);
    for (const o of v.ops.slice().sort((p, q) => p.yc - q.yc)) { const r = o.w / 2; sh.lineTo(o.yc - r, v.z1); sh.lineTo(o.yc - r, v.z1 + o.hr); sh.absarc(o.yc, v.z1 + o.hr, r, Math.PI, 0, true); sh.lineTo(o.yc + r, v.z1); }
    sh.lineTo(v.y2, v.z1); sh.lineTo(v.y2, v.z2); sh.lineTo(v.y1, v.z2); sh.closePath();
    for (const o of v.holes || []) { const p = new THREE.Path(); p.moveTo(o.y1, o.z1); p.lineTo(o.y2, o.z1); p.lineTo(o.y2, o.z2); p.lineTo(o.y1, o.z2); p.closePath(); sh.holes.push(p); }
    const g = new THREE.ExtrudeGeometry(sh, { depth: v.depth, bevelEnabled: false, curveSegments: 10 });
    g.applyMatrix4(new THREE.Matrix4().set(0, 0, 1, v.x0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)); g.computeVertexNormals(); return g;
  }
  // nét đố kính (ribs) và vạch sàn (bands) trên mặt đứng hộp
  function decoSegs(v) {
    const o = []; if (v.k !== "box") return o;
    const { x, y, w, d, z1, z2 } = v, X = x + w, Y = y + d;
    if (v.ribs) {
      const run = (a, b, put) => { const n = Math.max(1, Math.round((b - a) / v.ribs)); for (let i = 1; i < n; i++) put(a + (b - a) * i / n); };
      run(x, X, t => o.push([[t, y, z1], [t, y, z2]], [[t, Y, z1], [t, Y, z2]])); run(y, Y, t => o.push([[x, t, z1], [x, t, z2]], [[X, t, z1], [X, t, z2]]));
    }
    for (const z of v.bands || []) { const r = rectPts(x, y, w, d); for (let i = 0; i < 4; i++) o.push([[...r[i], z], [...r[(i + 1) % 4], z]]); }
    return o;
  }

  /* ---------- Giao diện ---------- */
  const STYLE = `
.g3v { display: grid; gap: 32px; }
.g3v .g3-rules { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px; }
.g3v .g3-rules > div { padding: 12px 14px; display: grid; gap: 4px; font-size: 14px; align-content: start; }
.g3v .g3-rules b.n { font: 700 12px var(--mono); color: var(--warn); }
.g3v .g3-pick { display: grid; grid-template-columns: repeat(auto-fill, minmax(176px, 1fr)); gap: 8px; }
.g3v .g3-pick button { display: grid; grid-template-columns: auto 1fr; gap: 0 8px; text-align: left; padding: 8px 10px; border: 1px solid var(--line); border-radius: 4px; background: var(--sheet); color: var(--ink); cursor: pointer; font: 600 13.5px/1.3 var(--body); }
.g3v .g3-pick button b { font: 700 12px/1.6 var(--mono); color: var(--ink-2); grid-row: span 2; }
.g3v .g3-pick button small { font: 500 11px var(--mono); color: var(--ink-2); }
.g3v .g3-pick button small.nw { color: var(--accent); }
.g3v .g3-pick button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); border-color: var(--ink); }
.g3v .g3-pick button[aria-pressed="true"] b, .g3v .g3-pick button[aria-pressed="true"] small { color: var(--sheet); opacity: 0.8; }
.g3v .g3-pick button:focus-visible, .g3v .g3-tg:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.g3v .g3-view { padding: 14px; display: grid; gap: 10px; scroll-margin-top: 12px; }
.g3v .g3-head { display: grid; gap: 2px; }
.g3v .g3-stage { position: relative; height: clamp(360px, 64vh, 640px); border: 1px solid var(--line); border-radius: 3px; overflow: hidden; background: var(--paper); }
@media (max-width: 600px) { .g3v .g3-stage { height: clamp(320px, 58vh, 480px); } .g3v .g3-view { padding: 10px; } }
.g3v .g3-stage canvas { display: block; width: 100%; height: 100%; touch-action: none; cursor: grab; }
.g3v .g3-stage canvas:active { cursor: grabbing; }
.g3v .g3-stage canvas:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.g3v .g3-labs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.g3v .g3-lab { position: absolute; left: 0; top: 0; font: 700 11.5px/1.3 var(--body); background: var(--sheet); color: var(--ink); border: 1px solid var(--ink); border-radius: 3px; padding: 2px 6px; white-space: nowrap; }
.g3v .g3-lab::after { content: ""; position: absolute; left: 50%; top: 100%; width: 1px; height: var(--s, 9px); background: var(--ink); }
.g3v .g3-lab.main { background: var(--tagBg); color: var(--tagFg); border-color: var(--tagBg); font-size: 13px; z-index: 2; }
.g3v .g3-lab.main::after { background: var(--tagBg); }
.g3v .g3-lab.phu { border: 1.5px solid var(--accent); color: var(--accent); }
.g3v .g3-lab.phu::after { background: var(--accent); }
.g3v .g3-pickh { font: 600 12px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-2); margin: 6px 0 -4px; }
.g3v .g3-lab.ctx { background: color-mix(in srgb, var(--sheet) 75%, transparent); border-color: transparent; color: var(--ink-2); font-weight: 600; }
.g3v .g3-lab.ctx::after { display: none; }
.g3v .g3-hint { position: absolute; left: 8px; bottom: 8px; right: 8px; width: fit-content; font: 500 11.5px/1.4 var(--body); color: var(--ink-2); background: color-mix(in srgb, var(--sheet) 85%, transparent); padding: 3px 8px; border-radius: 3px; pointer-events: none; }
.g3v .g3-bar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.g3v .g3-bar .k { font: 600 12px var(--mono); color: var(--ink-2); margin-right: 4px; }
.g3v .g3-tg { font: 600 13px var(--body); padding: 6px 11px; border: 1px solid var(--ink); border-radius: 3px; background: transparent; color: var(--ink); cursor: pointer; }
.g3v .g3-tg[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.g3v .g3-cut { display: flex; align-items: center; gap: 8px; flex: 1 1 280px; font-size: 13px; font-weight: 600; }
.g3v .g3-cut input { flex: 1; min-width: 120px; accent-color: var(--warn); }
.g3v .g3-cut output { font: 600 12.5px var(--mono); min-width: 10ch; color: var(--ink-2); }
.g3v .g3-stats { margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; }
.g3v .g3-stats div { border: 1px solid var(--line); border-radius: 3px; padding: 7px 10px; display: grid; gap: 1px; align-content: start; }
.g3v .g3-stats dt { font: 600 11.5px var(--mono); color: var(--ink-2); }
.g3v .g3-stats dd { margin: 0; font: 700 15px/1.35 var(--body); }
.g3v .g3-stats .ok { color: var(--accent); }
.g3v .g3-stats .bad { color: var(--warn); }
.g3v .g3-why { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.g3v .g3-why > div { border-left: 3px solid var(--accent); padding: 2px 0 2px 10px; font-size: 14px; display: grid; gap: 2px; align-content: start; }
.g3v .g3-qa { margin: 0; display: grid; gap: 4px; font-size: 14px; }
.g3v .g3-qa dt { font-weight: 700; }
.g3v .g3-qa dd { margin: 0 0 8px; color: var(--ink-2); }
.g3v .g3-col { display: grid; gap: 12px; align-content: start; min-width: 0; }
.g3v .g3-tbl { max-height: 380px; overflow: auto; }
.g3v i.sw { display: inline-block; width: 12px; height: 12px; border: 1px solid var(--ink); margin-right: 7px; vertical-align: -1px; }
.g3v .g3-cmp tr[data-i] { cursor: pointer; }
.g3v .g3-cmp tr[data-i]:hover td { background: color-mix(in srgb, var(--accent) 8%, transparent); }
.g3v .g3-cmp tr.on td { background: color-mix(in srgb, var(--accent) 16%, transparent); }
.g3v .g3-cmp tr[data-i]:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.g3v .g3-kc { padding: 12px 14px; }
.g3v .g3-pick button.pinned { border-color: var(--warn); box-shadow: inset 3px 0 0 var(--warn); }
.g3v .g3-pick button.pinned span::after { content: " · đã ghim"; font: 600 11px var(--mono); color: var(--warn); }
.g3v .g3-pick button[aria-pressed="true"].pinned span::after { color: var(--sheet); }
.g3v .g3-pick button.mine b { color: var(--accent); }
.g3v .g3-titlerow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.g3v .g3-pinbtn[aria-pressed="true"] { background: var(--warn); border-color: var(--warn); color: #fff; }
.g3v .g3-edrow { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.g3v .g3-edbtn { border-color: var(--accent); color: var(--accent); font-weight: 700; }
.g3v .g3-edbtn[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: #fff; }
.g3v .g3-ed { display: grid; gap: 8px; padding: 10px 12px; border: 1.5px solid var(--accent); border-radius: 4px; background: color-mix(in srgb, var(--accent) 6%, var(--sheet)); }
.g3v .g3-ed[hidden] { display: none; }
.g3v .g3-ed .g3-bar { gap: 5px; }
.g3v .g3-ed .g3-tg { padding: 5px 9px; font-size: 12.5px; }
.g3v .g3-ed .g3-tg:disabled { opacity: 0.35; cursor: default; }
.g3v .g3-ed select, .g3v .g3-ed input[type=text] { font: 500 13px var(--body); padding: 5px 6px; border: 1px solid var(--ink); border-radius: 3px; background: var(--sheet); color: var(--ink); }
.g3v .g3-ed input[type=text] { min-width: 0; flex: 1 1 200px; }
.g3v .g3-ed .sel { font: 600 13px var(--body); min-width: 12ch; }
.g3v .g3-ed .warnl { color: var(--warn); font-weight: 600; font-size: 13px; }
.g3v .g3-stage.editing canvas { cursor: crosshair; }
.g3v .g3-stage.editing canvas.ondrag { cursor: move; }
.g3v .g3-north output { min-width: 18ch; }
.g3v .g3-cmp td.pin { color: var(--warn); font-weight: 700; }
`;
  const VIEWS = [
    ["Phối cảnh", { th: 0.95, ph: 1.08, r: 150 }],
    ["Người đi bộ Bạch Đằng", { th: Math.PI / 2 - 0.45, ph: 1.68, r: 62, ty: 3 }],
    ["Từ bờ sông", { th: Math.PI / 2, ph: 1.5, r: 112 }],
    ["Trên xuống", { th: 0, ph: 0.02, r: 180 }],
    ["Từ Trần Phú", { th: -Math.PI / 2 - 0.4, ph: 1.15, r: 140 }],
    ["Từ phía Bắc", { th: Math.PI - 0.55, ph: 1.12, r: 145 }],
    ["Từ phía Nam", { th: 0.4, ph: 1.12, r: 145 }]
  ];
  const CTXL = [[100, 30, -6.4, "Sông Hàn"], [66, 16, -5.5, "Đường Bạch Đằng"], [50.5, 6, -2.75, "Bậc thang cao 5,5 m"], [-12, 36, 0, "Đường Trần Phú"], [-3.5, 99.5, 0, "Dốc"], [20, -22, 0, "Phía Bắc"]];

  function template() {
    const rules = [
      ["Cột thẳng một mạch từ móng lên mái", "Tầng trên chỉ lùi vào hoặc nhô ra đúng theo bước lưới cột. Không xoay khối tầng trên lệch với tầng dưới."],
      ["Đua ngắn, hoặc có dàn", "Đua ra 2–4 m thì dùng dầm thường. Đua xa hơn phải có dàn thép cao bằng một tầng, neo vào lõi thang."],
      ["Phòng lớn không có cột giữa", "Phòng đa năng và khu đọc lớn dùng vì kèo, dàn hoặc vòm. Ở chỗ cần chia phòng, tường ngăn làm luôn việc chịu lực thay cột."],
      ["Ý tưởng nằm ở mái, vỏ và nhịp lặp", "Cái đẹp đến từ hình mái, lớp vỏ và nhịp kết cấu lặp lại, không đến từ các khối xoay chéo chồng lên nhau. Nhờ vậy làm mô hình cũng dễ."]
    ];
    return `
${cfg.intro(rules)}
<section>
  <div id="${K}-pinned"></div>
  <div id="${K}-mineg"></div>
  ${cfg.groups.map(g => `<p class="g3-pickh">${g.t}</p><div class="g3-pick" role="group" aria-label="${esc(g.t)}">${IDEAS.map((I, i) => cfg.grpOf(I) !== g.k ? "" : `<button type="button" data-i="${i}" data-pk="${esc(pkey(I, i))}" aria-pressed="false"><b>${cfg.code(I, i)}</b><span>${esc(I.name)}</span><small class="${cfg.subNw(I) ? "nw" : ""}">${esc(cfg.sub(I))}</small></button>`).join("")}</div>`).join("")}
  <div class="g3-view sheet">
    <div class="g3-head"><p class="eyebrow" id="${K}-eb"></p><div class="g3-titlerow"><h3 id="${K}-title" style="font-size:20px"></h3><button type="button" class="g3-tg g3-pinbtn" id="${K}-pin" aria-pressed="false">Ghim phương án này</button></div><p class="note" id="${K}-tag"></p></div>
    <div class="g3-edrow"><button type="button" class="g3-tg g3-edbtn" id="${K}-edon" aria-pressed="false">Sắp lại khối (kéo thả)</button><span class="note" id="${K}-edhint">Dời, xoá, nhân đôi, thêm khối trên chính phương án này rồi lưu thành phương án của bạn.</span></div>
    <div class="g3-ed" id="${K}-ed" hidden>
      <div class="g3-bar"><span class="k">Khối chọn</span><span class="sel" id="${K}-sel">Chưa chọn · bấm vào một khối</span></div>
      <div class="g3-bar" role="group" aria-label="Sửa khối đang chọn">
        <button type="button" class="g3-tg" data-op="up">Lên 1 tầng</button><button type="button" class="g3-tg" data-op="down">Xuống 1 tầng</button>
        <button type="button" class="g3-tg" data-op="fl+">Thêm 1 tầng</button><button type="button" class="g3-tg" data-op="fl-">Bớt 1 tầng</button>
        <button type="button" class="g3-tg" data-op="rot">Xoay 90°</button>
        <button type="button" class="g3-tg" data-op="w-">Hẹp 1 m</button><button type="button" class="g3-tg" data-op="w+">Rộng 1 m</button>
        <button type="button" class="g3-tg" data-op="d-">Ngắn 1 m</button><button type="button" class="g3-tg" data-op="d+">Dài 1 m</button>
        <button type="button" class="g3-tg" data-op="dup">Nhân đôi</button><button type="button" class="g3-tg" data-op="role">Đổi chính / phụ</button>
        <button type="button" class="g3-tg" data-op="del" style="border-color:var(--warn);color:var(--warn)">Xoá khối</button>
      </div>
      <div class="g3-bar">
        <label class="k" for="${K}-mat">Vật liệu</label><select id="${K}-mat" data-sel="mat"><option value="">—</option>${MATS.map(([v, t]) => `<option value="${v}">${t}</option>`).join("")}</select>
        <label class="k" for="${K}-zone">Nhóm</label><select id="${K}-zone" data-sel="zone"><option value="">—</option>${["A", "B", "C", "D", "E", "L", "X"].map(z => `<option value="${z}">${z === "X" ? "X Không tính sàn" : ZN[z]}</option>`).join("")}</select>
        <span class="k" style="margin-left:8px">Kéo</span><span class="seg"><button type="button" data-stk="1" aria-pressed="true">Cả khối nhiều tầng</button><button type="button" data-stk="0" aria-pressed="false">Từng tầng</button></span>
        <span class="k" style="margin-left:8px">Bước kéo</span><span class="seg">${[0.5, 1, 2, 4].map(v => `<button type="button" data-snap="${v}" aria-pressed="${v === 1}">${String(v).replace(".", ",")} m</button>`).join("")}</span>
        <button type="button" class="g3-tg" data-op="add">+ Thêm hộp 12 × 12 m</button>
      </div>
      <div class="g3-bar">
        <button type="button" class="g3-tg" data-op="undo">Hoàn tác</button><button type="button" class="g3-tg" data-op="redo">Làm lại</button><button type="button" class="g3-tg" data-op="reset">Về như gốc</button>
        <input type="text" id="${K}-edname" maxlength="60" aria-label="Tên phương án của bạn">
        <button type="button" class="g3-tg" data-op="save" style="background:var(--accent);border-color:var(--accent);color:#fff">Lưu phương án của tôi</button>
        <button type="button" class="g3-tg" data-op="savenew">Lưu thành bản mới</button>
        <button type="button" class="g3-tg" data-op="delmine" style="border-color:var(--warn);color:var(--warn)">Xoá phương án này</button>
      </div>
      <p class="note" id="${K}-edmsg">Kéo một khối để dời trên mặt bằng (nên chọn góc nhìn Trên xuống). Kéo chỗ trống để xoay mô hình. Phím Delete xoá khối đang chọn, Ctrl + Z hoàn tác. Dây văng, cột và nhãn dính vào khối sẽ đi theo khối.</p>
    </div>
    <div class="g3-bar" role="group" aria-label="Góc nhìn"><span class="k">Góc nhìn</span>${VIEWS.map(([t], i) => `<button type="button" class="g3-tg" data-v="${i}">${t}</button>`).join("")}</div>
    <div class="g3-stage"><canvas id="${K}-cv" tabindex="0" aria-label="Mô hình 3D, kéo để xoay, phím mũi tên để xoay, cộng trừ để phóng to"></canvas><div class="g3-labs"></div><p class="g3-hint">${HINT}</p></div>
    <div class="g3-bar" role="group" aria-label="Hiển thị"><span class="k">Hiển thị</span>
      <button type="button" class="g3-tg" data-t="struct" aria-pressed="false">Kết cấu</button>
      <button type="button" class="g3-tg" data-t="exp" aria-pressed="false">Tách tầng</button>
      <button type="button" class="g3-tg" data-t="auto" aria-pressed="false">Tự xoay</button>
      <button type="button" class="g3-tg" data-t="ctx" aria-pressed="true">Bối cảnh</button>
      <button type="button" class="g3-tg" data-t="labels" aria-pressed="true">Nhãn</button>
      <button type="button" class="g3-tg" data-t="wind" aria-pressed="false">Gió</button>
      <button type="button" class="g3-tg" data-t="fig" aria-pressed="true">Người, xe</button>
      <span class="k" style="margin-left:10px">Màu</span>
      <span class="seg"><button type="button" data-c="idea" aria-pressed="true">Vật liệu</button><button type="button" data-c="zone" aria-pressed="false">Nhóm ABCDE</button><button type="button" data-c="role" aria-pressed="false">Chính / phụ</button></span>
    </div>
    <div class="g3-bar"><label class="g3-cut">Cắt ngang <input type="range" id="${K}-cut" min="0" max="${NOCUT}" step="0.1" value="${NOCUT}" aria-label="Cao độ mặt cắt ngang"><output id="${K}-cutv">Không cắt</output></label>
      <button type="button" class="g3-tg" data-cut="2.6">Tầng 1</button><button type="button" class="g3-tg" data-cut="7.1">Tầng 2</button><button type="button" class="g3-tg" data-cut="11.6">Tầng 3</button><button type="button" class="g3-tg" data-cut="${NOCUT}">Bỏ cắt</button>
    </div>
    <div class="g3-bar"><span class="k">Nắng</span><span class="seg">${SUND.map(([t], i) => `<button type="button" data-sd="${i}" aria-pressed="${i === 0}">${t}</button>`).join("")}</span>
      <label class="g3-cut">Giờ <input type="range" id="${K}-sun" min="6" max="18" step="0.25" value="9" aria-label="Giờ trong ngày"><output id="${K}-sunv"></output></label>
      <label class="g3-cut g3-north">Lệch Bắc <input type="range" id="${K}-north" min="-40" max="40" step="1" value="${G.north ? G.north() : 0}" aria-label="Góc lệch hướng Bắc thật so với trục dọc khu đất"><output id="${K}-northv"></output></label></div>
    <div class="legend" id="${K}-leg"></div>
    <dl class="g3-stats" id="${K}-stats"></dl>
  </div>
  <div id="${K}-detail"></div>
</section>
<section>
  <h2>${cfg.cmpTitle}</h2>
  <p class="note">Bấm vào một dòng để mở ý tưởng đó. "Cột trong nhà" là số cột đứng bên trong khối ở tầng 1 · 2 · 3 (không tính cột ở mép ngoài). Số càng nhỏ thì bên trong càng thoáng.</p>
  <div class="sheet scroll"><table class="g3-cmp"><thead><tr><th class="num">#</th><th>Ghim</th><th>Ý tưởng</th><th>Loại</th><th class="num">Tổng sàn (m²)</th><th class="num">Cao nhất (m)</th><th class="num">Số tầng</th><th class="num">Cột trong nhà T1 · T2 · T3</th><th class="num">Kính trần Đông + Tây (m²)</th><th>Nhịp lớn nhất</th></tr></thead><tbody>${IDEAS.map((I, i) => { const P = prep(i); return `<tr data-i="${i}" tabindex="0"><td class="num">${cfg.code(I, i)}</td><td class="pin" data-pk="${esc(pkey(I, i))}"></td><td><b>${esc(I.name)}</b><br><span class="note">${esc(I.tag)}</span></td><td>${esc(cfg.kind(I))}</td><td class="num">${num(P.tot)}</td><td class="num">+${num(P.H, 1)}</td><td class="num">${P.floors}</td><td class="num">${P.lev.slice(0, 3).map(n => n == null ? "–" : n).join(" · ")}</td><td class="num">${num(P.fac.E.tran + P.fac.W.tran)}</td><td>${esc(I.kc.nhip)}</td></tr>`; }).join("")}</tbody></table></div>
</section>`;
  }

  /* ---------- Trạng thái ---------- */
  const S = { th: 0.95, ph: 1.08, r: 150, tx: 20, ty: 4, tz: 50, auto: false, struct: false, exp: false, ctx: true, labels: true, wind: false, fig: true, edit: false, color: "idea", cut: NOCUT, sd: 0, sh: 9 };
  // mặt trời tại Đà Nẵng (vĩ độ 16,05° Bắc), giờ mặt trời; trục dọc khu đất lệch so với hướng Bắc thật một góc G.north() (mặc định 20°)
  const SUND = [["21/3 · xuân phân", 0], ["21/6 · hạ chí", 23.44], ["22/12 · đông chí", -23.44]], LAT = 16.05 * Math.PI / 180;
  const DIR8 = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"];
  const toSite = (E, N) => (G.toSite ? G.toSite(E, N) : [E, -N]);
  function sunVec() {
    const d = SUND[S.sd][1] * Math.PI / 180, H = (S.sh - 12) * 15 * Math.PI / 180;
    return { E: -Math.cos(d) * Math.sin(H), N: Math.sin(d) * Math.cos(LAT) - Math.cos(d) * Math.cos(H) * Math.sin(LAT), U: Math.sin(d) * Math.sin(LAT) + Math.cos(d) * Math.cos(H) * Math.cos(LAT) };
  }
  function applySun() {
    if (!R) return;
    const { E, N, U } = sunVec(), u = Math.max(U, 0.03), [sx, sy] = toSite(E, N);
    R.sun.position.set(20 + sx * 170, u * 170, 50 + sy * 170);
    R.sun.intensity = U > 0.04 ? 0.55 : 0.12;
    const alt = Math.asin(Math.max(-1, Math.min(1, U))) * 180 / Math.PI, az = (Math.atan2(E, N) * 180 / Math.PI + 360) % 360;
    const hh = Math.floor(S.sh), mm = Math.round((S.sh - hh) * 60);
    $("#" + K + "-sunv").textContent = `${hh}:${String(mm).padStart(2, "0")} · cao ${Math.round(alt)}°, phía ${DIR8[Math.round(az / 45) % 8]}`;
    const n = north(), ov = $("#" + K + "-northv");
    if (ov) ov.textContent = n === 0 ? "0° · trục dọc đúng Bắc" : `${n > 0 ? "+" : ""}${n}° · mặt sông nhìn ${G.dirName(G.bearing(90))}`;
    kick();
  }
  let R = null, cur = -1;
  const SHARED = new Set();

  function lam(tok, op = 1, clip = true) {
    return new THREE.MeshLambertMaterial({ color: css(tok), side: THREE.DoubleSide, transparent: op < 1, opacity: op, clippingPlanes: clip ? [R.clip] : null, clipShadows: clip, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  }
  function disposeGroup(g) {
    g.traverse(o => { if (o.geometry && !SHARED.has(o.geometry)) o.geometry.dispose(); const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []; for (const m of ms) if (!SHARED.has(m)) m.dispose(); });
    while (g.children.length) g.remove(g.children[0]);
  }

  function initGL() {
    const canvas = $("#" + K + "-cv"), stage = $(".g3-stage");
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch (e) { return false; }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1.6, 1, 2000);
    const hemi = new THREE.HemisphereLight(0xffffff, 0xa8a296, 0.58), sun = new THREE.DirectionalLight(0xffffff, 0.5);
    sun.position.set(20 + 70, 110, 50 + 45); sun.target.position.set(20, 0, 50); sun.castShadow = true;
    Object.assign(sun.shadow.camera, { left: -95, right: 95, top: 95, bottom: -95, near: 10, far: 420 });
    sun.shadow.camera.updateProjectionMatrix(); sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.05;
    scene.add(hemi, sun, sun.target);
    R = { renderer, scene, cam, sun, stage, canvas, labs: $(".g3-labs"), clip: new THREE.Plane(new THREE.Vector3(0, -1, 0), 1000), ex: 0, raf: 0, tw: null, vols: [], L: [], CL: [], v3: new THREE.Vector3() };
    R.mEdge = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55, clippingPlanes: [R.clip] });
    R.mDeco = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.2, clippingPlanes: [R.clip] });
    R.mLine = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.85, clippingPlanes: [R.clip] });
    R.mCtxEdge = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.28 });
    R.mCab = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55, clippingPlanes: [R.clip] });
    R.mSel = new THREE.LineBasicMaterial({ depthTest: false, transparent: true, opacity: 0.95 });
    R.mSt = new THREE.MeshLambertMaterial({ clippingPlanes: [R.clip], clipShadows: true });
    [R.mEdge, R.mDeco, R.mLine, R.mCtxEdge, R.mCab, R.mSel, R.mSt].forEach(m => SHARED.add(m));
    R.base = new THREE.Group(); R.ctx = new THREE.Group(); R.idea = new THREE.Group(); R.st = new THREE.Group(); R.wind = new THREE.Group(); R.wind.visible = false;
    R.fig = new THREE.Group(); R.figI = new THREE.Group(); R.guide = new THREE.Group(); R.guide.visible = false;
    scene.add(R.base, R.ctx, R.idea, R.st, R.wind, R.fig, R.figI, R.guide);
    retheme(true); applySun();
    new ResizeObserver(() => { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); kick(); }).observe(stage);
    bindControls();
    return true;
  }

  function retheme(first) {
    R.scene.background = new THREE.Color(css("paper"));
    R.mEdge.color.set(css("ink")); R.mDeco.color.set(css("ink")); R.mLine.color.set(css("ink")); R.mCtxEdge.color.set(css("ink")); R.mCab.color.set(css("ink")); R.mSel.color.set(css("accent")); R.mSt.color.set(css("warn"));
    buildContext();
    if (!first && cur >= 0) { buildIdea(prep(cur)); applyModes(); }
    kick();
  }

  function arrow(len, wid, head, tok, op) {
    const sh = new THREE.Shape(); sh.moveTo(0, -wid / 2); sh.lineTo(len - head, -wid / 2); sh.lineTo(len - head, -wid * 1.5); sh.lineTo(len, 0); sh.lineTo(len - head, wid * 1.5); sh.lineTo(len - head, wid / 2); sh.lineTo(0, wid / 2); sh.closePath();
    const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2);
    return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: css(tok), transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false }));
  }
  const place = (m, x, y, z, dx, dy) => { m.position.set(x, z, y); m.rotation.y = Math.atan2(-dy, dx); return m; };
  // gió: [hướng gió thổi đến (độ), màu, nhãn]
  const WINDS = [[135, "accent", "Gió mùa hè · từ hướng Đông Nam (tháng 5–9)"], [45, "accessC", "Gió mùa đông · từ hướng Đông Bắc, mưa (tháng 10–3)"]];
  function buildContext() {
    disposeGroup(R.base); disposeGroup(R.ctx); disposeGroup(R.wind); disposeGroup(R.fig);
    for (const L of R.CL) L.el.remove();
    const [nx, ny] = toSite(0, 1);
    R.base.add(place(arrow(10, 1.4, 4, "ink", 0.8), -28, -12, 0.12, nx, ny));
    const wl = [];
    for (const [from, tok, t] of WINDS) {
      const b = (from + 180) * Math.PI / 180, [dx, dy] = toSite(Math.sin(b), Math.cos(b)), px = -dy, py = dx;
      for (const o of [-14, 0, 14]) { const x = 20 - dx * 64 + px * o, y = 52 - dy * 64 + py * o; R.wind.add(place(arrow(14, 1.6, 5, tok, 0.75), x, y, 20, dx, dy)); }
      wl.push([20 - dx * 72, 52 - dy * 72, 22, t]);
    }
    R.CL = [...CTXL, [-28 + nx * 14, -12 + ny * 14, 0, "Bắc"]].map(([x, y, z, t]) => makeLab({ x, y, z, t, ctx: 1 }, "ctx")).concat(wl.map(([x, y, z, t]) => makeLab({ x, y, z, t, ctx: 1, wind: 1 }, "ctx")));
    buildFigures();
    const add = (grp, F, ts, tt, o = {}) => { const g = geomFrom(F), m = new THREE.Mesh(g, [lam(ts, 1, false), lam(tt || ts, 1, false)]); m.receiveShadow = true; m.castShadow = !!o.cast; if (o.edge) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g, 25), R.mCtxEdge)); grp.add(m); return m; };
    add(R.base, boxF(0, 0, 41.5, 104, -5.5, 0.02), "blk", "canopy", { edge: 1 });
    add(R.ctx, boxF(-80, -60, 159, 220, -6.6, -5.5), "pave");
    add(R.ctx, boxF(79, -60, 110, 220, -7, -6.4), "water");
    add(R.ctx, boxF(-80, -60, 121.5, 164, -5.5, 0), "blk", "pave", { edge: 1 });
    add(R.ctx, boxF(-18, -60, 12, 164, 0, 0.04), "road");
    add(R.ctx, boxF(-6, -14, 47.5, 10, 0, 0.04), "road");
    add(R.ctx, boxF(-7, 95, 7, 9, 0, 0.06), "zCirc", "zCirc", { edge: 1 });
    const n = 16, run = 17.5 / n, steps = [];
    for (let k = 0; k < n - 1; k++) steps.push(boxF(41.5 + k * run, 0, run, 104, -5.5, -5.5 * (k + 1) / n));
    add(R.ctx, mergeF(...steps), "blk", "zCirc", { edge: 1 });
    add(R.ctx, boxF(59, -60, 14, 220, -5.5, -5.46), "road");
    add(R.ctx, boxF(73, -60, 6, 220, -5.5, -5.35), "pave", "sheet", { edge: 1 });
    const hi = [[-44, -30, 22, 18, 18], [-44, -8, 22, 26, 12], [-44, 22, 22, 22, 24], [-44, 48, 22, 30, 15], [-44, 82, 22, 20, 20], [-12, -36, 22, 22, 14], [14, -36, 26, 20, 22]];
    const lo = [[-44, 108, 22, 22, 11], [44, -36, 14, 18, 9], [-12, 112, 24, 20, 9], [16, 114, 22, 18, 13], [42, 112, 14, 16, 7]];
    add(R.ctx, mergeF(...hi.map(([x, y, w, d, h]) => boxF(x, y, w, d, 0, h)), ...lo.map(([x, y, w, d, h]) => boxF(x, y, w, d, -5.5, h))), "blk", "blkTop", { edge: 1, cast: 1 });
    const tp = [];
    for (let y = -50; y <= 150; y += 12) tp.push([76, y, -5.35]);
    for (let y = 8; y <= 92; y += 14) tp.push([-3, y, 0]);
    for (let y = -50; y <= 100; y += 14) tp.push([-20, y, 0]);
    const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.3, 0), lam("tree", 1, false), tp.length), trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.22, 3.2, 6), lam("ink-2", 1, false), tp.length), M4 = new THREE.Matrix4();
    tp.forEach(([x, y, z], i) => { crown.setMatrixAt(i, M4.makeTranslation(x, z + 4.6, y)); trunk.setMatrixAt(i, M4.makeTranslation(x, z + 1.6, y)); });
    crown.castShadow = true; R.ctx.add(crown, trunk);
  }

  /* ---------- Người, xe máy, ô tô để so tỉ lệ (người cao 1,7 m, ô tô dài 4,4 m, xe buýt 11 m) ---------- */
  const rnd = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const FIGG = {};
  function figGeo() {
    if (FIGG.body) return FIGG;
    FIGG.body = new THREE.CylinderGeometry(0.19, 0.24, 1.2, 7).translate(0, 0.6, 0);
    FIGG.head = new THREE.SphereGeometry(0.14, 8, 6).translate(0, 1.52, 0);
    FIGG.car = new THREE.BoxGeometry(4.4, 0.72, 1.8).translate(0, 0.54, 0);
    FIGG.cab = new THREE.BoxGeometry(2.3, 0.6, 1.6).translate(-0.25, 1.2, 0);
    FIGG.moto = new THREE.BoxGeometry(1.85, 0.62, 0.5).translate(0, 0.5, 0);
    FIGG.rider = new THREE.CylinderGeometry(0.17, 0.2, 0.75, 6).translate(0.1, 1.15, 0);
    FIGG.rhead = new THREE.SphereGeometry(0.15, 8, 6).translate(0.1, 1.68, 0);
    FIGG.bus = new THREE.BoxGeometry(11, 2.9, 2.5).translate(0, 1.75, 0);
    Object.values(FIGG).forEach(g => SHARED.add(g));
    return FIGG;
  }
  // ds: [x, y, z, góc quay quanh trục đứng (rad)]
  function instanced(grp, geo, tok, ds) {
    if (!ds.length) return;
    const m = new THREE.InstancedMesh(geo, lam(tok, 1, false), ds.length), M4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3();
    ds.forEach(([x, y, z, a], i) => { e.set(0, a || 0, 0); q.setFromEuler(e); p.set(x, z, y); M4.compose(p, q, sc); m.setMatrixAt(i, M4); });
    m.castShadow = true; m.receiveShadow = true; grp.add(m);
  }
  function people(grp, pts) { const g = figGeo(); instanced(grp, g.body, "ink-2", pts); instanced(grp, g.head, "ink-2", pts); }
  function buildFigures() {
    const g = figGeo(), r = rnd(329), P = [], C = [], Mo = [], Bu = [];
    const along = (a, b, step, f) => { for (let t = a; t <= b; t += step * (0.6 + r() * 0.8)) f(t); };
    // vỉa hè bờ sông, bậc thang Bạch Đằng, vỉa hè Trần Phú, phố phía Bắc
    along(-40, 140, 9, y => P.push([74 + r() * 4.5, y, -5.35, 0]));
    along(-2, 104, 7, y => { const x = 43 + r() * 14; P.push([x, y, -5.5 * Math.min(1, (x - 41.5) / 17.5), 0]); });
    along(-30, 104, 11, y => P.push([-5 + r() * 3.5, y, 0.04, 0]));
    along(-6, 40, 9, x => P.push([x, -3 + r() * 1.5, 0.04, 0]));
    // ô tô, xe máy theo làn: Trần Phú (x -18..-6), Bạch Đằng (x 59..73, cao độ -5,5), phố Bắc (y -14..-4)
    const lane = (pts, z, ang, n, sp) => along(pts[0], pts[1], sp, t => { const k = r(); const [x, y] = pts[2](t, k); (k < 0.62 ? Mo : C).push([x, y, z, ang + (r() < 0.5 ? 0 : Math.PI)]); });
    lane([-55, 150, (t, k) => [k < 0.62 ? -17 + r() * 1.2 : -15, t]], 0.04, Math.PI / 2, 0, 9);
    lane([-55, 150, (t, k) => [k < 0.62 ? -7.4 - r() * 1.2 : -9, t]], 0.04, Math.PI / 2, 0, 9);
    lane([-55, 150, (t, k) => [k < 0.62 ? 60.4 + r() * 1.2 : 63, t]], -5.46, Math.PI / 2, 0, 8);
    lane([-55, 150, (t, k) => [k < 0.62 ? 71.4 - r() * 1.2 : 69, t]], -5.46, Math.PI / 2, 0, 8);
    lane([-6, 41, (t, k) => [t, k < 0.62 ? -12.8 + r() : -10.5]], 0.04, 0, 0, 8);
    Bu.push([-11.8, 70, 0.04, Math.PI / 2], [66, 18, -5.46, Math.PI / 2]);
    people(R.fig, P);
    instanced(R.fig, g.car, "nx", C); instanced(R.fig, g.cab, "glass", C);
    instanced(R.fig, g.moto, "ink-2", Mo); instanced(R.fig, g.rider, "ink-2", Mo); instanced(R.fig, g.rhead, "ink-2", Mo);
    instanced(R.fig, g.bus, "gold", Bu);
  }
  // khung nét đứt bao các tầng khi tách tầng, như sơ đồ tách tầng
  function explodeFrame(P) {
    disposeGroup(R.guide);
    const vs = P.V.filter(v => v.k !== "lines" && v.k !== "loft" && v.zone !== "X");
    if (!vs.length) return;
    const pts = vs.flatMap(footPts), m = 2.5;
    const x1 = Math.min(...pts.map(p => p[0])) - m, x2 = Math.max(...pts.map(p => p[0])) + m, y1 = Math.min(...pts.map(p => p[1])) - m, y2 = Math.max(...pts.map(p => p[1])) + m;
    const lvOfV = v => (v.lv != null ? v.lv : lvOf(vBot(v) + 0.01)), z2 = Math.max(...vs.map(v => vTop(v) + lvOfV(v) * EXP)) + m, z1 = 0.1;
    const C = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], segs = [];
    for (let i = 0; i < 4; i++) { const a = C[i], b = C[(i + 1) % 4]; segs.push([[...a, z1], [...b, z1]], [[...a, z2], [...b, z2]], [[...a, z1], [...a, z2]]); }
    const ls = new THREE.LineSegments(lineGeo(segs), new THREE.LineDashedMaterial({ color: css("gold"), dashSize: 1.1, gapSize: 0.9, transparent: true, opacity: 0.9 }));
    ls.computeLineDistances(); R.guide.add(ls);
  }
  // người trong khu đất: chỉ đứng ở chỗ trống hoặc dưới gầm khối treo
  function ideaFigures(P) {
    disposeGroup(R.figI);
    const r = rnd(17), low = P.V.filter(v => v.k !== "lines" && v.k !== "disc" && vBot(v) < 2.6), pts = [];
    for (let y = 1.5; y < 103; y += 3.2) for (let x = 7; x < 40.5; x += 3.4) {
      const px = x + (r() - 0.5) * 2, py = y + (r() - 0.5) * 2;
      if (low.some(v => inPoly(footPts(v), px, py, 0.9))) continue;
      pts.push([px, py, 0.05, 0]);
    }
    for (let i = pts.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pts[i], pts[j]] = [pts[j], pts[i]]; }
    people(R.figI, pts.slice(0, 22));
  }

  function buildIdea(P) {
    disposeGroup(R.idea); disposeGroup(R.st); R.vols = []; R.selM = [];
    P.V.forEach((v, vi) => {
      const lv = v.lv != null ? v.lv : lvOf(vBot(v) + 0.01);
      if (v.k === "lines") { const ls = new THREE.LineSegments(lineGeo(v.segs), v.cab ? R.mCab : R.mLine); ls.userData = { lv, lines: 1 }; R.idea.add(ls); R.vols.push(ls); return; }
      let geo, F = null;
      if (v.k === "arcade") geo = arcadeGeo(v);
      else if (v.k === "wallh") geo = wallhGeo(v);
      else {
        F = facesOf(v);
        if (v.k === "box" && v.zone !== "X") { // sàn trung gian, hiện ra khi cắt ngang
          const zs = v.bands || (v.fl >= 2 ? Array.from({ length: v.fl - 1 }, (_, k) => v.z1 + (v.z2 - v.z1) * (k + 1) / v.fl) : []);
          for (const z of zs) F.t.push(rectPts(v.x, v.y, v.w, v.d).map(([a, b]) => [a, b, z]));
        }
        geo = geomFrom(F);
      }
      const gl = v.c === "glass", gop = gl ? (v.op != null ? v.op : 0.8) : (v.gop != null ? v.gop : 0.75);
      const sop = gl ? 1 : (v.op != null ? v.op : 1), top = v.top ? sop : gl ? gop : sop;
      const cs = gl ? (v.c2 || "sheet") : v.c, ct = v.top || v.c, cg = "glass";
      // chỉ xem hình khối: mặt kính của khối không phải khối kính thì vẽ đặc như các mặt khác
      const gc = gl ? cg : cs, go = gl ? gop : sop;
      const mesh = new THREE.Mesh(geo, [lam(cs, sop), lam(ct, top), lam(gc, go)]);
      mesh.userData = { lv, op: sop, ops: [sop, top, go], cols: [cs, ct, gc], zone: v.zone, role: v.role, vi, oi: v.__i != null ? v.__i : vi };
      mesh.receiveShadow = true;
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), R.mEdge));
      // lam đứng, mái đua: bỏ, chỉ xem hình khối
      if (false && F && F.fx && F.fx.length) { const fg = geomFrom({ s: fxFaces(v, F.fx), t: [] }), fm = new THREE.Mesh(fg, [lam(v.fin || "sheet", 1), lam(v.fin || "sheet", 1)]); fm.castShadow = true; fm.receiveShadow = true; fm.userData.deco = 1; fm.add(new THREE.LineSegments(new THREE.EdgesGeometry(fg, 25), R.mDeco)); mesh.add(fm); }
      const ds = [];
      if (ds.length) { const d = new THREE.LineSegments(lineGeo(ds), R.mDeco); d.userData.deco = 1; mesh.add(d); }
      R.idea.add(mesh); R.vols.push(mesh);
    });
    ideaFigures(P);
    explodeFrame(P);
    if (E.on && E.sel != null) markSel();
    const F = { s: [], t: [] };
    for (const s of P.st) {
      if (s.t === "col") F.s.push(...[].concat(...Object.values(boxF(s.x - 0.25, s.y - 0.25, 0.5, 0.5, s.z1, s.z2))));
      else if (s.t === "wall") F.s.push(...[].concat(...Object.values(boxF(s.x, s.y, s.w, s.d, s.z1, s.z2))));
      else F.s.push(...beamF(s.a, s.b, 0.1));
    }
    const sm = new THREE.Mesh(geomFrom(F), [R.mSt, R.mSt]); sm.castShadow = true; R.st.add(sm);
    for (const L of R.L) L.el.remove();
    R.L = P.labels.map(([x, y, z, t, main]) => {
      // tầng của nhãn = tầng của khối chứa điểm đặt nhãn (để tách tầng vẫn bám đúng khối)
      const hit = P.V.filter(v => v.k !== "lines" && v.k !== "arcade" && inPoly(footPts(v), x, y, 0.3) && vBot(v) - 0.1 <= z && z <= vTop(v) + 0.3).sort((a, b) => vBot(b) - vBot(a))[0];
      return makeLab({ x, y, z, t, lv: hit ? lvOf(vBot(hit) + 0.01) : lvOf(z) }, main === 1 ? "main" : main === 2 ? "phu" : "");
    });
  }
  function makeLab(o, cls) { const e = document.createElement("span"); e.className = "g3-lab " + cls; e.textContent = o.t; R.labs.appendChild(e); o.el = e; return o; }

  function applyModes() {
    if (!R) return;
    const zm = S.color === "zone", rm = S.color === "role";
    for (const m of R.vols) {
      if (m.userData.lines) continue;
      const u = m.userData, cz = zm ? ZTOK[u.zone] || "nx" : rm ? ROLE[u.role] || "nx" : null;
      m.material.forEach((mm, k) => {
        const op = S.struct ? Math.min(u.ops[k], 0.13) : u.ops[k], tr = op < 1;
        mm.color.set(css(cz || u.cols[k])); if (mm.transparent !== tr) { mm.transparent = tr; mm.needsUpdate = true; } mm.opacity = op; mm.depthWrite = !S.struct && op > 0.5;
      });
      m.castShadow = !S.struct && u.op > 0.6;
      for (const ch of m.children) if (ch.userData.deco) ch.visible = !S.struct;
      m.position.y = u.lv * EXP * R.ex;
    }
    for (const m of R.vols) if (m.userData.lines) m.position.y = m.userData.lv * EXP * R.ex;
    R.mEdge.opacity = S.struct ? 0.3 : 0.55;
    R.clip.constant = S.cut >= NOCUT ? 1000 : S.cut;
    R.st.visible = (S.struct || S.cut < NOCUT) && R.ex < 0.01;
    R.ctx.visible = S.ctx; R.wind.visible = S.wind; R.fig.visible = S.fig && S.ctx; R.figI.visible = S.fig;
    const st = `<span><i style="background:var(--warn)"></i>Kết cấu chịu lực (nút Kết cấu)</span>`;
    $("#" + K + "-leg").innerHTML = zm ? ["A", "B", "C", "D", "E", "L"].map(z => `<span><i style="background:var(--${ZTOK[z]})"></i>${ZN[z]}</span>`).join("") + st
      : rm ? `<span><i style="background:var(--${ROLE.m})"></i>Khối chính</span><span><i style="background:var(--${ROLE.p})"></i>Khối phụ</span>` + st
      : `<span>Màu theo vật liệu. Chọn "Nhóm ABCDE" để xem phân khu, "Chính / phụ" để xem khối chính và khối phụ.</span>` + st;
    kick();
  }

  /* ---------- Vẽ theo yêu cầu ---------- */
  function camUpdate() { const r = S.r * Math.max(1, 1.35 / R.cam.aspect), s = Math.sin(S.ph); R.cam.position.set(S.tx + r * s * Math.sin(S.th), S.ty + r * Math.cos(S.ph), S.tz + r * s * Math.cos(S.th)); R.cam.lookAt(S.tx, S.ty, S.tz); } // màn hình dọc thì lùi máy ảnh ra cho đủ chiều ngang
  // nhãn chồng lên nhau thì đẩy nhãn sau lên trên (que nối dài ra); nhãn bối cảnh bị che thì ẩn
  function placeLabels() {
    const W = R.stage.clientWidth, H = R.stage.clientHeight, v = R.v3, placed = [];
    const hit = r => placed.some(q => r.x < q.x + q.w + 4 && q.x < r.x + r.w + 4 && r.y < q.y + q.h + 2 && q.y < r.y + r.h + 2);
    const has = c => l => l.el.classList.contains(c);
    for (const L of [...R.L.filter(has("main")), ...R.L.filter(has("phu")), ...R.L.filter(l => !has("main")(l) && !has("phu")(l)), ...R.CL]) {
      let show = S.labels && (L.wind ? S.wind : L.ctx ? S.ctx && S.ph < 1.4 : !(S.cut < NOCUT && L.z > S.cut + 0.3));
      if (show) { v.set(L.x, L.z + (L.ctx ? 0 : L.lv * EXP * R.ex), L.y).project(R.cam); show = v.z < 1 && Math.abs(v.x) < 1.02 && Math.abs(v.y) < 1.02; }
      L.el.style.display = show ? "" : "none";
      if (!show) continue;
      if (!L.w) { L.w = L.el.offsetWidth; L.h = L.el.offsetHeight; }
      const px = (v.x + 1) / 2 * W, py = (1 - v.y) / 2 * H, stem = L.ctx ? 0 : 9;
      let dy = 0, r = { x: px - L.w / 2, y: py - stem - L.h, w: L.w, h: L.h };
      while (hit(r) && dy < 90) { dy += L.h + 3; r.y = py - stem - dy - L.h; }
      if (L.ctx && !L.wind && dy) { L.el.style.display = "none"; continue; }
      placed.push(r);
      L.el.style.setProperty("--s", stem + dy + "px");
      L.el.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) translate(-50%, calc(-100% - ${stem + dy}px))`;
    }
  }
  function frame(now) {
    R.raf = 0; let more = false;
    if (R.tw) {
      const k = Math.min(1, (now - R.tw.t0) / R.tw.dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      for (const key in R.tw.to) S[key] = R.tw.from[key] + (R.tw.to[key] - R.tw.from[key]) * e;
      if (k >= 1) R.tw = null; else more = true;
    }
    if (S.auto) { S.th += 0.0035; more = true; }
    const exT = S.exp ? 1 : 0;
    if (R.ex !== exT) {
      R.ex += (exT - R.ex) * 0.2; if (Math.abs(R.ex - exT) < 0.01) R.ex = exT; else more = true;
      for (const m of R.vols) m.position.y = m.userData.lv * EXP * R.ex;
      R.st.visible = (S.struct || S.cut < NOCUT) && R.ex < 0.01;
      R.guide.visible = R.ex > 0.97;
    }
    camUpdate(); R.renderer.render(R.scene, R.cam); placeLabels();
    if (more && R.stage.offsetParent !== null) kick();
  }
  function kick() { if (R && !R.raf) R.raf = requestAnimationFrame(frame); }
  function goView(o) {
    if (!R) return;
    const from = { th: S.th, ph: S.ph, r: S.r, tx: S.tx, ty: S.ty, tz: S.tz }, to = { tx: 20, ty: 4, tz: 50, ...o };
    let d = (to.th - from.th) % (2 * Math.PI); if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; to.th = from.th + d;
    R.tw = { from, to, t0: performance.now(), dur: 650 }; kick();
  }

  /* ---------- Chuột, cảm ứng, bàn phím ---------- */
  function bindControls() {
    const cv = R.canvas, ptrs = new Map(); let mode = null, last = null, pinch = 0;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const stopAuto = () => { if (S.auto) { S.auto = false; syncToggles(); } R.tw = null; };
    const rotate = (dx, dy) => { S.th -= dx * 0.0075; S.ph = clamp(S.ph - dy * 0.0075, 0.02, 1.7); };
    const pan = (dx, dy) => { const k = S.r * 0.0016, c = Math.cos(S.th), s = Math.sin(S.th); S.tx = clamp(S.tx - (c * dx - s * dy) * k, -40, 90); S.tz = clamp(S.tz - (-s * dx - c * dy) * k, -30, 140); };
    const zoom = f => { S.r = clamp(S.r * f, 22, 380); };
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]), mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let drag = null, down = null;
    cv.addEventListener("pointerdown", e => {
      cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); stopAuto();
      down = [e.clientX, e.clientY];
      if (ptrs.size === 2) { if (drag) { for (const o of drag.ms) o.position.x = o.position.z = 0; drag = null; cv.classList.remove("ondrag"); } const [a, b] = [...ptrs.values()]; mode = "pinch"; pinch = dist(a, b); last = mid(a, b); return; }
      if (E.on && e.button === 0 && !e.shiftKey) {
        const m = pickVol(e);
        if (m) {
          setSel(m.userData.oi);
          const v = selVol(), z0 = v ? vBot(v) : 0, plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -z0), p0 = rayHit(e, plane);
          if (p0) { drag = { ms: markSel() || [m], plane, p0, dx: 0, dy: 0 }; mode = "drag"; cv.classList.add("ondrag"); return; }
        }
      }
      mode = e.button === 2 || e.shiftKey ? "pan" : "rot"; last = [e.clientX, e.clientY];
    });
    cv.addEventListener("pointermove", e => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if (mode === "drag" && drag) {
        const p = rayHit(e, drag.plane); if (!p) return;
        const q = E.snap, dx = Math.round((p.x - drag.p0.x) / q) * q, dy = Math.round((p.z - drag.p0.z) / q) * q;
        if (dx !== drag.dx || dy !== drag.dy) { drag.dx = dx; drag.dy = dy; for (const o of drag.ms) { o.position.x = dx; o.position.z = dy; } selInfo(dx, dy); kick(); }
        return;
      }
      if (mode === "pinch" && ptrs.size === 2) { const [a, b] = [...ptrs.values()], dd = dist(a, b), m = mid(a, b); if (dd > 0) zoom(pinch / dd); pinch = dd; pan(m[0] - last[0], m[1] - last[1]); last = m; }
      else if (mode === "rot") { rotate(e.clientX - last[0], e.clientY - last[1]); last = [e.clientX, e.clientY]; }
      else if (mode === "pan") { pan(e.clientX - last[0], e.clientY - last[1]); last = [e.clientX, e.clientY]; }
      kick();
    });
    const up = e => {
      ptrs.delete(e.pointerId);
      if (mode === "drag" && drag) { const d = drag; drag = null; cv.classList.remove("ondrag"); mode = null; if (d.dx || d.dy) pushOp({ o: "mv", i: E.sel, dx: d.dx, dy: d.dy, dz: 0, st: E.stack ? 1 : 0 }); return; }
      // bấm vào chỗ trống (không kéo) trong chế độ sắp lại: bỏ chọn
      if (E.on && mode === "rot" && down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 4 && e.type === "pointerup" && !pickVol(e)) setSel(null);
      if (ptrs.size === 1) { mode = "rot"; last = [...ptrs.values()][0]; } else if (!ptrs.size) mode = null;
    };
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("contextmenu", e => e.preventDefault());
    cv.addEventListener("wheel", e => { e.preventDefault(); stopAuto(); zoom(Math.exp(e.deltaY * (e.deltaMode ? 0.04 : 0.0012))); kick(); }, { passive: false });
    cv.addEventListener("keydown", e => {
      if (E.on && edKey(e)) return;
      const k = e.key, map = { ArrowLeft: () => rotate(-16, 0), ArrowRight: () => rotate(16, 0), ArrowUp: () => rotate(0, -12), ArrowDown: () => rotate(0, 12), "+": () => zoom(0.88), "=": () => zoom(0.88), "-": () => zoom(1.14) };
      if (map[k]) { e.preventDefault(); stopAuto(); map[k](); kick(); }
    });
  }

  /* ---------- Nút điều khiển ---------- */
  function syncToggles() { host.querySelectorAll("[data-t]").forEach(b => b.setAttribute("aria-pressed", String(!!S[b.dataset.t]))); }
  function setCut(v) {
    S.cut = +v; const out = $("#" + K + "-cutv"); $("#" + K + "-cut").value = S.cut;
    out.textContent = S.cut >= NOCUT ? "Không cắt" : `+${num(S.cut, 2)} m`;
    applyModes();
  }
  function bindUI() {
    host.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => { S.auto = false; syncToggles(); goView(VIEWS[+b.dataset.v][1]); }));
    host.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.t; S[k] = !S[k]; if (k === "exp" && E.on) S.exp = false; syncToggles(); applyModes(); }));
    host.querySelectorAll("[data-c]").forEach(b => b.addEventListener("click", () => { S.color = b.dataset.c; host.querySelectorAll("[data-c]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); applyModes(); }));
    $("#" + K + "-cut").addEventListener("input", e => setCut(e.target.value));
    $("#" + K + "-sun").addEventListener("input", e => { S.sh = +e.target.value; applySun(); });
    $("#" + K + "-north").addEventListener("input", e => G.setNorth && G.setNorth(+e.target.value));
    host.querySelectorAll("[data-sd]").forEach(b => b.addEventListener("click", () => { S.sd = +b.dataset.sd; host.querySelectorAll("[data-sd]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); applySun(); }));
    host.querySelectorAll("[data-cut]").forEach(b => b.addEventListener("click", () => { const v = +b.dataset.cut; setCut(v); if (v < NOCUT && S.ph > 1.0) goView({ th: S.th, ph: 0.72, r: Math.min(S.r, 150), tx: S.tx, ty: S.ty, tz: S.tz }); }));
    // nút chọn phương án (kể cả nhóm "Đã ghim" và "Của bạn" vẽ lại sau) bắt sự kiện chung
    host.addEventListener("click", e => {
      const b = e.target.closest(".g3-pick [data-i], .g3-pick [data-m]");
      if (b && host.contains(b)) select(b.dataset.m ? b.dataset.m : +b.dataset.i);
    });
    host.querySelectorAll(".g3-cmp tr[data-i]").forEach(r => {
      const go = () => select(+r.dataset.i, true);
      r.addEventListener("click", go); r.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    $("#" + K + "-pin").addEventListener("click", () => { if (ST) { const I = curIdea(); ST.togglePin(curKey(), I ? `${I.code || ""} ${I.name}`.trim() : ""); } });
    $("#" + K + "-edon").addEventListener("click", () => (E.on ? exitEdit() : enterEdit()));
    host.querySelectorAll("[data-op]").forEach(b => b.addEventListener("click", () => edOp(b.dataset.op)));
    host.querySelectorAll("[data-stk]").forEach(b => b.addEventListener("click", () => { E.stack = b.dataset.stk === "1"; host.querySelectorAll("[data-stk]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); markSel(); selInfo(); kick(); }));
    host.querySelectorAll("[data-snap]").forEach(b => b.addEventListener("click", () => { E.snap = +b.dataset.snap; host.querySelectorAll("[data-snap]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); }));
    host.querySelectorAll("[data-sel]").forEach(sl => sl.addEventListener("change", () => {
      const v = selVol(); if (!v || !sl.value) return;
      if (sl.dataset.sel === "mat") { const [c, top] = sl.value.split("|"); pushOp({ o: "mat", i: E.sel, c, top }); }
      else pushOp({ o: "zone", i: E.sel, z: sl.value });
    }));
    if (ST) ST.on(() => { renderMine(); renderPins(); });
    window.addEventListener("arc-north", () => { const n = $("#" + K + "-north"); if (n) n.value = north(); if (R) { buildContext(); applySun(); applyModes(); } const I = curIdea(); if (I) renderInfo(prep(I), I); });
  }

  /* ---------- Phương án tự xếp, ghim ---------- */
  const E = { on: false, base: null, ops: [], redo: [], rec: null, sel: null, snap: 1, stack: true, I: null, saved: 0 };
  const MC = new Map();
  const findBase = id => IDEAS.find(I => I.id === id);
  function mineIdea(id) {
    const rec = ST && ST.get(id), base = rec && findBase(rec.base);
    if (!base) return null;
    const sig = id + JSON.stringify(rec.ops) + rec.name;
    if (!MC.has(sig)) { const n = ST.mine(K).findIndex(r => r.id === id) + 1; MC.set(sig, ED.derive(base, { ...rec, code: "Của tôi " + n })); }
    return MC.get(sig);
  }
  const curIdea = () => E.on ? E.I : typeof cur === "string" ? mineIdea(cur) : IDEAS[cur];
  const curKey = () => !E.on && typeof cur === "number" && !IDEAS[cur] ? "" : typeof cur === "string" && !E.on ? `${K}:m:${cur}` : E.on && E.rec ? `${K}:m:${E.rec.id}` : E.on ? pkey(E.base, IDEAS.indexOf(E.base)) : pkey(IDEAS[cur], cur);
  function renderMine() {
    const box = $("#" + K + "-mineg"); if (!box || !ST || !ED) return;
    const L = ST.mine(K).filter(r => findBase(r.base));
    box.innerHTML = !L.length ? "" : `<p class="g3-pickh">Phương án bạn tự xếp · ${L.length}</p><div class="g3-pick" role="group" aria-label="Phương án bạn tự xếp">${L.map((r, n) => { const b = findBase(r.base); return `<button type="button" class="mine" data-m="${esc(r.id)}" data-pk="${esc(K + ":m:" + r.id)}" aria-pressed="${cur === r.id}"><b>Tôi ${n + 1}</b><span>${esc(r.name)}</span><small>từ ${esc((b.code ? b.code + " " : "") + b.name)} · ${r.ops.length} thao tác</small></button>`; }).join("")}</div>`;
    renderPins();
  }
  function renderPins() {
    if (!ST) return;
    host.querySelectorAll("[data-pk]").forEach(el => { const on = ST.pinned(el.dataset.pk); if (el.tagName === "TD") el.textContent = on ? "Đã ghim" : ""; else el.classList.toggle("pinned", on); });
    const box = $("#" + K + "-pinned"), items = [];
    IDEAS.forEach((I, i) => { if (ST.pinned(pkey(I, i))) items.push(`<button type="button" class="pinned" data-i="${i}" aria-pressed="${cur === i}"><b>${cfg.code(I, i)}</b><span>${esc(I.name)}</span><small>${esc(cfg.sub(I))}</small></button>`); });
    ST.mine(K).forEach((r, n) => { const b = findBase(r.base); if (b && ST.pinned(`${K}:m:${r.id}`)) items.push(`<button type="button" class="pinned mine" data-m="${esc(r.id)}" aria-pressed="${cur === r.id}"><b>Tôi ${n + 1}</b><span>${esc(r.name)}</span><small>từ ${esc(b.code || "")} ${esc(b.name)}</small></button>`); });
    if (box) box.innerHTML = items.length ? `<p class="g3-pickh" style="color:var(--warn)">Đã ghim · ${items.length}</p><div class="g3-pick" role="group" aria-label="Phương án đã ghim">${items.join("")}</div>` : "";
    const pb = $("#" + K + "-pin"), on = ST.pinned(curKey());
    if (pb) { pb.setAttribute("aria-pressed", String(on)); pb.textContent = on ? "Đã ghim · bấm để bỏ" : "Ghim phương án này"; }
  }
  const selVol = () => { if (E.sel == null || !E.I) return null; return prep(E.I).V.find(v => v.__i === E.sel) || null; };
  function pickVol(e) {
    const rc = R.cv3 || (R.cv3 = new THREE.Raycaster()), rect = R.canvas.getBoundingClientRect();
    rc.setFromCamera({ x: (e.clientX - rect.left) / rect.width * 2 - 1, y: -(e.clientY - rect.top) / rect.height * 2 + 1 }, R.cam);
    const hits = rc.intersectObjects(R.vols.filter(m => !m.userData.lines && m.isMesh), false);
    for (const h of hits) { if (S.cut < NOCUT && h.point.y > S.cut + 0.05) continue; return h.object; }
    return null;
  }
  function rayHit(e, plane) {
    const rc = R.cv3 || (R.cv3 = new THREE.Raycaster()), rect = R.canvas.getBoundingClientRect();
    rc.setFromCamera({ x: (e.clientX - rect.left) / rect.width * 2 - 1, y: -(e.clientY - rect.top) / rect.height * 2 + 1 }, R.cam);
    return rc.ray.intersectPlane(plane, new THREE.Vector3());
  }
  // các khối cùng đi theo khối đang chọn (cả khối nhiều tầng hoặc chỉ một tầng)
  const selGroup = () => { const v = selVol(); if (!v) return []; return E.stack ? ED.stackOf(prep(E.I).V, v) : [v]; };
  function markSel() {
    for (const e of R.selM || []) { e.parent && e.parent.remove(e); e.geometry.dispose(); }
    R.selM = [];
    const ids = selGroup().map(v => v.__i), ms = R.vols.filter(o => o.isMesh && ids.includes(o.userData.oi));
    for (const m of ms) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 25), R.mSel); e.renderOrder = 999; m.add(e); R.selM.push(e); }
    return ms.length ? ms : null;
  }
  const KN = { box: "Hộp", shed: "Khối mái dốc", gable: "Mái hai dốc", hip: "Mái chóp", frustum: "Chóp cụt", vault: "Vòm", poly: "Khối đa giác", loft: "Trụ, khối thon", slab: "Bản dốc", wallh: "Tường khoét ô", arcade: "Tường vòm", disc: "Đĩa" };
  function selInfo(dx = 0, dy = 0) {
    const v = selVol(), el = $("#" + K + "-sel");
    host.querySelectorAll("[data-op]").forEach(b => {
      const op = b.dataset.op, need = ["up", "down", "fl+", "fl-", "rot", "w-", "w+", "d-", "d+", "dup", "role", "del"].includes(op);
      b.disabled = (need && !v) || (v && ((op === "rot" && !ED.canRot(v)) || (/^[wd][+-]$/.test(op) && !ED.canSize(v)) || (/^fl/.test(op) && !ED.canFl(v)))) || (op === "undo" && !E.ops.length) || (op === "redo" && !E.redo.length) || (op === "reset" && !E.ops.length) || (op === "delmine" && !E.rec);
    });
    host.querySelectorAll("[data-sel]").forEach(sl => { sl.disabled = !v; sl.value = !v ? "" : sl.dataset.sel === "zone" ? v.zone : (MATS.find(([c]) => c === (v.top === "grass" ? v.c + "|grass" : v.c)) || [""])[0]; });
    if (!el) return;
    if (!v) { el.textContent = "Chưa chọn · bấm vào một khối"; return; }
    const p = footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]), w = Math.max(...xs) - Math.min(...xs), d = Math.max(...ys) - Math.min(...ys);
    const mv = dx || dy ? `Đang dời ${dx ? `${num(Math.abs(dx), 1)} m về ${dx > 0 ? "phía sông" : "phía Trần Phú"}` : ""}${dx && dy ? ", " : ""}${dy ? `${num(Math.abs(dy), 1)} m về ${dy > 0 ? "đầu Nam" : "đầu Bắc"}` : ""}` : "";
    const hint = $(".g3-hint"); if (hint) hint.textContent = mv || HINT; // hiện trên khung 3D để dòng chữ phía trên không đẩy khung xuống khi đang kéo
    const g = selGroup(), gs = g.length > 1 ? ` · cả khối ${g.length} phần, cao +${num(Math.min(...g.map(vBot)), 2)} → +${num(Math.max(...g.map(vTop)), 2)}` : "";
    el.textContent = `${KN[v.k] || v.k} ${num(w, 1)} × ${num(d, 1)} m${gs} · tầng chọn: đáy +${num(vBot(v), 2)} · đỉnh +${num(vTop(v), 2)} · ${v.zone === "X" ? "không tính sàn" : ZN[v.zone] || v.zone} · ${v.role === "m" ? "khối chính" : "khối phụ"}`;
  }
  function setSel(oi) { E.sel = oi; markSel(); selInfo(); kick(); }
  function edMsg(t) { const m = $("#" + K + "-edmsg"); if (m) m.textContent = t; }
  function refresh() {
    E.I = ED.derive(E.base, { id: E.rec ? E.rec.id : "draft", name: $("#" + K + "-edname").value.trim() || (E.rec ? E.rec.name : ""), ops: E.ops, code: E.rec ? "Của tôi" : "Bản nháp" });
    const P = prep(E.I);
    if (R) { buildIdea(P); applyModes(); }
    if (E.sel != null && !P.V.some(v => v.__i === E.sel)) E.sel = null;
    if (R) markSel();
    selInfo(); renderInfo(P, E.I);
  }
  function pushOp(op) { E.ops.push(op); E.redo = []; refresh(); }
  function edOp(k) {
    if (!E.on) return;
    const v = selVol(), i = E.sel, st = E.stack ? 1 : 0, grp = selGroup();
    const low = grp.length ? Math.min(...grp.map(vBot)) : 0, top = grp.length ? grp.reduce((a, b) => (vTop(b) > vTop(a) ? b : a)) : null;
    const map = {
      up: () => pushOp({ o: "mv", i, dz: 4.5, st }), down: () => v && low >= 4.4 && pushOp({ o: "mv", i, dz: -4.5, st }),
      "fl+": () => top && pushOp({ o: "fl", i: top.__i, dn: 1 }), "fl-": () => top && pushOp({ o: "fl", i: top.__i, dn: -1 }), rot: () => pushOp({ o: "rot", i, st }),
      "w-": () => pushOp({ o: "sz", i, dw: -1, st }), "w+": () => pushOp({ o: "sz", i, dw: 1, st }), "d-": () => pushOp({ o: "sz", i, dd: -1, st }), "d+": () => pushOp({ o: "sz", i, dd: 1, st }),
      dup: () => { const n = grp.length || 1; pushOp({ o: "dup", i, dx: 4, dy: 4, st }); const P = prep(E.I); setSel(P.V[P.V.length - n].__i); },
      role: () => pushOp({ o: "role", i }), del: () => { pushOp({ o: "del", i, st }); setSel(null); },
      add: () => { const x = Math.round(Math.max(0, Math.min(29.5, S.tx - 6))), y = Math.round(Math.max(0, Math.min(92, S.tz - 6))); pushOp({ o: "add", b: { x, y, w: 12, d: 12, z1: 0.45, z2: 4.95, zone: "B", c: "sheet", role: "p" } }); const P = prep(E.I); setSel(P.V[P.V.length - 1].__i); },
      undo: () => { if (E.ops.length) { E.redo.push(E.ops.pop()); refresh(); } }, redo: () => { if (E.redo.length) { E.ops.push(E.redo.pop()); refresh(); } },
      reset: () => { if (E.ops.length && confirm("Bỏ hết các thao tác, đưa về đúng phương án gốc?")) { E.ops = []; E.redo = []; E.sel = null; refresh(); } },
      save: () => save(false), savenew: () => save(true),
      delmine: () => { if (E.rec && confirm(`Xoá phương án "${E.rec.name}"? Không khôi phục được.`)) { const id = E.rec.id, b = IDEAS.indexOf(E.base); ST.delMine(id); E.on = false; E.rec = null; E.ops = []; showEd(); select(b); } }
    };
    if (map[k]) map[k]();
  }
  function save(asNew) {
    if (!ST) return;
    const name = $("#" + K + "-edname").value.trim() || `${E.base.name} · bản của tôi`;
    const rec = asNew || !E.rec ? { id: "m" + Date.now().toString(36), tab: K, base: E.base.id, name, ops: E.ops.slice(), at: Date.now() } : { ...E.rec, name, ops: E.ops.slice(), up: Date.now() };
    ST.saveMine(rec); E.rec = rec; E.saved = E.ops.length; cur = rec.id;
    $("#" + K + "-edname").value = name;
    edMsg(`Đã lưu "${name}" ${ST.live() ? "vào trang: mở trên máy khác vẫn thấy, và tôi đọc được để phát triển tiếp." : "trên trình duyệt này (trang chưa mở trên claude.ai nên chưa đồng bộ được)."}`);
    renderMine(); selInfo(); renderInfo(prep(E.I), E.I);
  }
  function edKey(e) {
    const k = e.key, mod = e.ctrlKey || e.metaKey;
    if (mod && (k === "z" || k === "Z")) { e.preventDefault(); edOp(e.shiftKey ? "redo" : "undo"); return true; }
    if (mod && (k === "y" || k === "Y")) { e.preventDefault(); edOp("redo"); return true; }
    if (E.sel == null) return false;
    if (k === "Delete" || k === "Backspace") { e.preventDefault(); edOp("del"); return true; }
    const q = E.snap, mv = { ArrowLeft: [-q, 0], ArrowRight: [q, 0], ArrowUp: [0, -q], ArrowDown: [0, q] }[k];
    if (mv) { e.preventDefault(); pushOp({ o: "mv", i: E.sel, dx: mv[0], dy: mv[1], dz: 0, st: E.stack ? 1 : 0 }); return true; }
    return false;
  }
  function showEd() {
    const p = $("#" + K + "-ed"), b = $("#" + K + "-edon");
    p.hidden = !E.on; b.setAttribute("aria-pressed", String(E.on)); b.textContent = E.on ? "Xong, thoát sắp lại" : "Sắp lại khối (kéo thả)";
    $(".g3-stage").classList.toggle("editing", E.on);
    $("#" + K + "-edhint").textContent = E.on ? "Đang sắp lại. Thay đổi chỉ được giữ khi bấm Lưu." : "Dời, xoá, nhân đôi, thêm khối trên chính phương án này rồi lưu thành phương án của bạn.";
  }
  function enterEdit() {
    if (!ED) return;
    const rec = typeof cur === "string" ? ST.get(cur) : null;
    E.base = rec ? findBase(rec.base) : IDEAS[cur]; if (!E.base) return;
    E.rec = rec; E.ops = rec ? rec.ops.slice() : []; E.saved = E.ops.length; E.redo = []; E.sel = null; E.on = true;
    $("#" + K + "-edname").value = rec ? rec.name : `${E.base.name} · bản của tôi`;
    if (S.exp) { S.exp = false; syncToggles(); }
    showEd(); refresh();
    edMsg("Kéo một khối để dời trên mặt bằng (nên chọn góc nhìn Trên xuống). Kéo chỗ trống để xoay mô hình. Phím Delete xoá khối đang chọn, Ctrl + Z hoàn tác, phím mũi tên dời từng bước. Dây văng, cột và nhãn dính vào khối sẽ đi theo khối.");
    if (S.ph > 0.5) goView({ th: 0, ph: 0.02, r: 150 });
  }
  function exitEdit(force) {
    if (!E.on) return true;
    const dirty = E.ops.length !== E.saved || (E.rec ? JSON.stringify(E.ops) !== JSON.stringify(E.rec.ops) : E.ops.length > 0);
    if (dirty && !force && !confirm("Có thay đổi chưa lưu. Thoát và bỏ các thay đổi này?")) return false;
    E.on = false; E.sel = null; showEd();
    const back = E.rec && ST.get(E.rec.id) ? E.rec.id : IDEAS.indexOf(E.base);
    select(back); return true;
  }

  /* ---------- Nội dung từng ý tưởng ---------- */
  function select(i, scroll) {
    if (E.on) { if (typeof i === "string" && E.rec && E.rec.id === i) return; if (!exitEdit()) return; }
    const I = typeof i === "string" ? mineIdea(i) : IDEAS[i];
    if (!I) return;
    cur = i; const P = prep(I);
    host.querySelectorAll(".g3-pick [data-i]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
    host.querySelectorAll(".g3-pick [data-m]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.m === i)));
    host.querySelectorAll(".g3-cmp tr[data-i]").forEach(r => r.classList.toggle("on", +r.dataset.i === i));
    if (R) { buildIdea(P); applyModes(); }
    renderInfo(P, I);
    renderPins();
    if (scroll) host.querySelector(".g3-view").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderInfo(P, I) {
    const mine = I.fam === "mine", i = IDEAS.indexOf(I);
    $("#" + K + "-eb").textContent = mine ? `Phương án của bạn · sắp lại từ ${I.base.code ? I.base.code + " " : ""}${I.base.name} · ${I.rec.ops ? I.rec.ops.length : 0} thao tác` : cfg.eyebrow(I, i, IDEAS.length);
    $("#" + K + "-title").textContent = mine && E.on ? `${I.name}${E.ops.length !== E.saved ? " · chưa lưu" : ""}` : I.name; $("#" + K + "-tag").textContent = I.tag;
    const lev = P.lev.map((n, k) => n == null ? null : `T${k + 1}: ${n}`).filter(Boolean).join(" · ");
    const part = f => P.labels.filter(l => l[4] === f).map(l => l[3].replace(/^Khối (chính|phụ) · /, ""));
    const mainL = part(1), subL = part(2), Hh = G.hier ? G.hier(P) : null;
    const hierS = Hh && Hh.am > 0 ? [`Chủ – phụ`, `chính ${Math.round(Hh.pa * 100)}% sàn, ${Math.round(Hh.pv * 100)}% thể tích, cao gấp ${num(Math.min(Hh.ratio, 9), 1)} lần khối phụ`, Hh.ok ? "ok" : "bad"] : ["Khối chính / khối phụ", `1 chính · ${subL.length} phụ`];
    const ew = P.fac.E.tran + P.fac.W.tran;
    const Bf = P.brief, NZ = { A: "A", B: "B", C: "C", D: "D", E: "E" };
    const briefS = !Bf ? null : ["Đủ đề ABCDE", Bf.st === "du" ? (Bf.txt || "Mỗi nhóm đủ sàn (đã tính thêm 15% tường, hành lang)") : Bf.st === "chia" ? `Đủ tổng; ${Bf.short.map(([k, d]) => `${NZ[k]} thiếu ${num(d)}`).join(", ")} m², lấy từ ${Bf.extra.filter(([, d]) => d > 30).map(([k, d]) => `${NZ[k]} dư ${num(d)}`).join(", ")}` : Bf.st === "vuot" ? "Vượt 3.000 m²" : `Thiếu ${num(Bf.def - Bf.sur)} m² so với đề`, Bf.st === "du" ? "ok" : Bf.st === "chia" ? "" : "bad"];
    const stats = [["Tổng diện tích sàn", `${num(P.tot)} m²`, P.tot <= 3000 ? "ok" : "bad"], ["Số tầng", `${P.floors} tầng`], ["Cao nhất so với nền", `+${num(P.H, 1)} m`], ["Cột đứng trong nhà", lev], hierS, briefS, P.props ? ["Cột chống thêm", `${P.props} cột dưới phần đua quá 4 m (màu đá)`] : null].filter(Boolean);
    const FN = { N: "Đầu Bắc", E: "Mặt sông", S: "Đầu Nam", W: "Mặt Trần Phú" };
    const DN = k => { const b = G.faceDeg ? G.faceDeg(k) : { N: 0, E: 90, S: 180, W: 270 }[k]; return `${FN[k]} · nhìn ${G.dirName ? G.dirName(b) : ""} ${Math.round(b)}°`; };
    const nn = north();
    const NOTE = { N: f => f.tran > 0 ? (Math.abs(nn) >= 10 ? "Chủ yếu ánh sáng tán xạ; chiều hè có nắng xiên thấp, nên có lam đứng mỏng." : "Kính trần hướng Bắc: ánh sáng tán xạ, hợp khu đọc.") : "—", E: f => f.tran > 20 ? "Kính trần đón nắng sáng thấp gần vuông góc, chói chỗ đọc: cần lam đứng." : "Có lam hoặc đặc: chặn nắng sáng thấp.", S: f => f.tran > 20 ? "Nên thêm mái đua hoặc lam ngang." : "Mái đua chặn nắng cao buổi trưa.", W: f => f.tran > 20 ? "Kính trần đón nắng chiều gắt nhất: nên đặc hoặc lam." : "Đặc hoặc có lam: chặn nắng chiều." };
    const facRows = ["N", "E", "S", "W"].map(k => { const f = P.fac[k], t = f.dac + f.che + f.tran; return `<tr><td>${DN(k)}</td><td class="num">${num(f.dac)}</td><td class="num">${num(f.che)}</td><td class="num">${num(f.tran)}</td><td class="num">${t ? Math.round(100 * (f.che + f.tran) / t) : 0}%</td><td>${NOTE[k](f)}</td></tr>`; }).join("");
    $("#" + K + "-stats").innerHTML = stats.map(([k, v, c]) => `<div><dt>${k}</dt><dd class="${c || ""}">${esc(v)}</dd></div>`).join("");
    const zs = ["A", "B", "C", "D", "E", "L"].filter(z => P.byZ[z] || ZT[z]);
    const areaRows = zs.map(z => `<tr><td><i class="sw" style="background:var(--${ZTOK[z]})"></i>${ZN[z]}</td><td class="num">${num(P.byZ[z] || 0)}</td><td class="num">${ZT[z] ? num(ZT[z]) : "–"}</td></tr>`).join("")
      + (P.rest ? `<tr><td>Hành lang, ban công trong khung</td><td class="num">${num(P.rest)}</td><td class="num">–</td></tr>` : "")
      + `<tr class="sub"><td>Tổng</td><td class="num">${num(P.tot)}</td><td class="num">≤ 3.000</td></tr>`;
    const cutRows = P.cut.map(c => `<tr><td>${esc(c.name)}</td><td class="num">${esc(c.dim)}</td><td class="num">${c.n}</td><td>${esc(c.mat)}</td></tr>`).join("");
    const out = P.V.filter(v => v.zone !== "X" && v.k !== "lines" && v.added !== 0 && footPts(v).some(([x, y]) => x < -0.3 || y < -0.3 || x > 41.8 || y > 104.3)).length;
    const mineNote = mine ? `<div class="sheet card g3-kc"><dl><dt>Phương án của bạn</dt><dd>Sắp lại từ ${esc(I.base.code || "")} ${esc(I.base.name)} với ${I.rec.ops ? I.rec.ops.length : 0} thao tác. Các phần chữ bên dưới (câu chuyện, kết cấu, hỏi đáp) là của phương án gốc. Diện tích, chiều cao, chủ – phụ, mặt đứng theo hướng nắng và bảng cắt đã tính lại theo cách bạn xếp.${out ? ` <b style="color:var(--warn)">${out} khối đang nằm ngoài ranh khu đất.</b>` : ""} Kết cấu hiển thị gần đúng sau khi dời khối.</dd></dl></div>` : "";
    $("#" + K + "-detail").innerHTML = `
<div class="split">
  <div class="g3-col">
    ${mineNote}
    ${I.ref ? `<div class="sheet card g3-kc g3-ref"><dl><dt>Công trình tham khảo</dt><dd><b>${esc(I.ref.name)}</b> · ${esc(I.ref.by)} · ${esc(I.ref.year)} · ${esc(I.ref.place)}${I.ref.award ? `<br><span style="color:var(--warn);font-weight:600">${esc(I.ref.award)}</span>` : ""}</dd><dt>Hình khối của công trình đó</dt><dd>${esc(I.ref.what)}</dd><dt>Mượn gì cho khu đất này</dt><dd>${esc(I.ref.take)}</dd>${/^https:\/\//.test(I.ref.url) ? `<dt>Nguồn</dt><dd><a href="${esc(I.ref.url)}" target="_blank" rel="noopener noreferrer">${esc(I.ref.url.replace(/^https:\/\/(www\.)?/, "").slice(0, 70))}</a></dd>` : ""}</dl></div>` : ""}
    <h3>Câu chuyện</h3><p>${esc(I.story)}</p>
    ${I.ngoaigio ? `<div class="sheet card g3-kc"><dl><dt>Ngoài giờ: khu sự kiện chạy riêng</dt><dd>${esc(I.ngoaigio)}</dd></dl></div>` : ""}
    <div class="sheet card g3-kc"><dl><dt>Khối chính</dt><dd>${mainL.map(esc).join("; ") || "—"}</dd><dt>Khối phụ</dt><dd>${subL.map(esc).join("; ") || "—"}</dd></dl></div>
    <div class="g3-why">${(I.why || []).map(([h, p]) => `<div><b>${esc(h)}</b><span>${esc(p)}</span></div>`).join("")}</div>
    <h3>Kết cấu</h3>
    <div class="sheet card g3-kc"><dl>
      <dt>Hệ chịu lực</dt><dd>${esc(I.kc.he)}</dd>
      <dt>Nhịp lớn nhất</dt><dd>${esc(I.kc.nhip)}</dd>
      <dt>Phần đua ra</dt><dd>${esc(I.kc.cx)}</dd>
      <dt>Cột trong nhà</dt><dd>${esc(lev)} <span class="note">(đếm tự động: cột nằm bên trong khối, cách mép ngoài từ 0,6 m trở lên)</span></dd>
    </dl></div>
    <h3>Thầy hỏi thì trả lời</h3>
    <dl class="g3-qa">${(I.qa || []).map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl>
  </div>
  <div class="g3-col">
    <h3>Diện tích theo nhóm chức năng</h3>
    <div class="sheet scroll"><table><thead><tr><th>Nhóm</th><th class="num">Sàn trong khối (m²)</th><th class="num">Đề bài, sàn sử dụng (m²)</th></tr></thead><tbody>${areaRows}</tbody></table></div>
    <p class="note">Mỗi khối được tính cho nhóm chính của nó, đã gồm hành lang và tường bên trong. Đề bài: 2.220 m² sàn sử dụng + 780 m² giao thông, tường, kết cấu = tối đa 3.000 m². Khi lên mặt bằng chi tiết sẽ chia lại phòng trong từng khối.</p>
    <h3>Mặt đứng theo hướng nắng</h3>
    <div class="sheet scroll"><table><thead><tr><th>Mặt (hướng thật)</th><th class="num">Đặc (m²)</th><th class="num">Kính có lam, mái đua (m²)</th><th class="num">Kính trần (m²)</th><th class="num">Tỷ lệ kính</th><th>Nhận xét</th></tr></thead><tbody>${facRows}</tbody></table></div>
    <p class="note">Tính tự động trên mặt ngoài các khối (bỏ phần áp vào khối khác). Hướng thật tính theo góc lệch ${nn > 0 ? "+" : ""}${nn}° đặt ở thanh Nắng. Dùng thanh Nắng phía trên mô hình để xem bóng đổ theo ngày và giờ.</p>
    <h3>Bảng cắt mô hình tỉ lệ 1/200</h3>
    <p class="note">${esc(I.cut)}</p>
    <div class="sheet scroll g3-tbl"><table><thead><tr><th>Chi tiết</th><th class="num">Kích thước (cm)</th><th class="num">Số lượng</th><th>Vật liệu gợi ý</th></tr></thead><tbody>${cutRows}</tbody></table></div>
    <p class="note">Kích thước hộp ghi theo cạnh ngắn × cạnh dài × chiều cao. Cột chỉ cần làm ở chỗ lộ ra ngoài (gầm nhà, hiên), hoặc khi làm mô hình cắt để thầy xem kết cấu.</p>
  </div>
</div>`;
  }

  /* ---------- Khởi động khi mở tab ---------- */
  let started = false;
  function start() {
    if (started) { kick(); return; }
    started = true;
    if (!document.getElementById("g3-style")) { const st = document.createElement("style"); st.id = "g3-style"; st.textContent = STYLE; document.head.appendChild(st); }
    if (!window.THREE) { host.innerHTML = `<p class="note">Không tải được thư viện 3D (three.js). Kiểm tra kết nối mạng rồi tải lại trang.</p>`; return; }
    host.innerHTML = template();
    if (!initGL()) { $(".g3-stage").innerHTML = `<p class="note" style="padding:16px">Trình duyệt này không mở được WebGL nên không xem được mô hình 3D. Phần chữ, bảng diện tích và bảng cắt bên dưới vẫn dùng được.</p>`; R = null; }
    // chọn sẵn ý tưởng đầu tiên của nhóm đầu tiên (nhóm vẽ theo thứ tự cfg.groups)
    bindUI(); renderMine(); select(Math.max(0, IDEAS.findIndex(I => cfg.grpOf(I) === cfg.groups[0].k)));
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const re = () => { if (R) retheme(false); };
    if (mq && mq.addEventListener) mq.addEventListener("change", re);
    new MutationObserver(re).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  const tabBtn = document.querySelector(`.tabs [data-tab="${cfg.tab}"]`);
  if (tabBtn) tabBtn.addEventListener("click", () => requestAnimationFrame(start));
  const panel = document.querySelector(`[data-panel="${cfg.tab}"]`);
  if (panel && !panel.hidden) start();
  }
  G.mount = mount;
})();
