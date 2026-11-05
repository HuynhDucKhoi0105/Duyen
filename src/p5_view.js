/* ================= Tab: 3 khối chọn để phát triển mặt bằng ================= */
(function (G) {
  if (!G || !G.P5 || !G.plans5) return;
  const host = document.getElementById("g5-host");
  if (!host) return;
  const P5 = G.P5;
  const CSS = `
.p5v { display: grid; gap: 48px; }
.p5v .g3-rules { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px; }
.p5v .g3-rules > div { padding: 12px 14px; display: grid; gap: 4px; font-size: 14px; align-content: start; }
.p5v .g3-rules b.n { font: 700 12px var(--mono); color: var(--warn); }
.p5-picks { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.p5-pick { display: grid; gap: 2px; text-align: left; padding: 10px 12px; border: 1px solid var(--line); border-radius: 4px; background: var(--sheet); color: var(--ink); cursor: pointer; font: 600 15px/1.35 var(--body); }
.p5-pick small { font: 500 11.5px var(--mono); color: var(--ink-2); }
.p5-pick[aria-pressed="true"] { background: var(--ink); color: var(--sheet); border-color: var(--ink); }
.p5-pick[aria-pressed="true"] .eyebrow, .p5-pick[aria-pressed="true"] small { color: var(--sheet); opacity: 0.85; }
.p5-pin[aria-pressed="true"] { background: var(--warn); border-color: var(--warn); color: #fff; }
.p5-pick.pinned { border-color: var(--warn); box-shadow: inset 3px 0 0 var(--warn); }
.p5-pick:focus-visible, .p5-3d:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.p5-body { display: grid; gap: 18px; min-width: 0; }
.p5-head { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 20px; align-items: start; }
.p5-head p { font-size: 14.5px; }
@media (max-width: 820px) { .p5-head { grid-template-columns: minmax(0, 1fr); } }
.p5-iso { display: block; width: 100%; height: auto; max-height: 340px; }
.p5-3d { justify-self: start; font: 600 13px var(--body); padding: 7px 13px; border: 1px solid var(--ink); border-radius: 3px; background: transparent; color: var(--ink); cursor: pointer; }
.p5-check, .p5-adj { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; font-size: 14px; }
.p5-check li { display: grid; grid-template-columns: 64px 1fr; gap: 8px; }
.p5-check li > b { font: 700 12px var(--mono); }
.p5-check li.ok > b { color: var(--accent); }
.p5-check li.bad > b { color: var(--warn); }
.p5-check li > span { color: var(--ink); font-weight: 400; }
.p5-adj li { padding-left: 14px; border-left: 2px solid var(--line); }
.p5v .pplan.p5-plan { min-width: 460px; }
`;
  if (!document.getElementById("p5-style")) { const st0 = document.createElement("style"); st0.id = "p5-style"; st0.textContent = CSS; document.head.appendChild(st0); }
  host.classList.add("p5v");
  const ORDER = ["lang3", "khe3", "cau4"];
  const PLANS = ORDER.map(id => G.plans5.find(p => p.id === id)).filter(Boolean);
  if (!PLANS.length) return;
  const FAMN = { cau: "Cầu dây văng", khe: "Khe Hải Vân", lang: "Làng sách" };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PC = { ...PATHC, staff: "var(--ink-2)" };
  const LVN = { t1: "Tầng 1", t2: "Tầng 2", t3: "Tầng 3" };
  const PX = 10; // px trên 1 m trong toạ độ SVG

  // Dữ liệu tính sẵn cho mỗi phương án
  const DATA = PLANS.map(S => {
    const idx = G.ideas4.findIndex(i => i.id === S.id), I = G.ideas4[idx], prep = G.prep(I);
    const R = P5.analyse(S, prep, D);
    return { S, I, idx, prep, R };
  });

  /* ---------- Hình trục đo nhỏ: khối 3D, cắt ở tầng đang xem ---------- */
  function isoMass(svg, d, L) {
    svg.innerHTML = "";
    const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6), k = 5.2;
    const pr = (x, y, z) => [(x - y) * c * k, (x + y) * s * k - z * k];
    const cutZ = L.z + 1.4;
    const V = d.prep.V.filter(v => v.k === "box").slice().sort((a, b) => (a.x + a.w / 2 + a.y + a.d / 2) - (b.x + b.w / 2 + b.y + b.d / 2) || a.z1 - b.z1);
    const pts = [];
    V.forEach(v => [[v.x, v.y, v.z1], [v.x + v.w, v.y + v.d, v.z2], [v.x, v.y + v.d, v.z1], [v.x + v.w, v.y, v.z2]].forEach(p => pts.push(pr(...p))));
    pts.push(pr(0, 0, 0), pr(41.5, 104, 0), pr(41.5, 0, 0), pr(0, 104, 0));
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs) - 8, y0 = Math.min(...ys) - 8, W = Math.max(...xs) - x0 + 8, H = Math.max(...ys) - y0 + 8;
    svg.setAttribute("viewBox", `${x0} ${y0} ${W} ${H}`);
    const poly = (ps, a) => el("polygon", { points: ps.map(p => pr(...p).join(",")).join(" "), ...a }, svg);
    poly([[0, 0, 0], [41.5, 0, 0], [41.5, 104, 0], [0, 104, 0]], { fill: "var(--pave)", stroke: "var(--line)", "stroke-width": 0.8 });
    poly([[41.5, 0, 0], [47, 0, 0], [47, 104, 0], [41.5, 104, 0]], { fill: "var(--water)", opacity: 0.5 });
    for (const v of V) {
      const above = v.z1 > L.z + 0.1, cut = !above && v.z2 > cutZ;
      const z2 = cut ? cutZ : v.z2, x2 = v.x + v.w, y2 = v.y + v.d;
      const fill = v.zone === "X" ? "var(--zCore)" : (FILL[v.zone] || "var(--zE)");
      const a = above ? { fill: "none", stroke: "var(--ink-2)", "stroke-width": 0.6, "stroke-dasharray": "2 2", opacity: 0.55 } : { fill, stroke: "var(--ink)", "stroke-width": 0.7 };
      poly([[x2, v.y, v.z1], [x2, y2, v.z1], [x2, y2, z2], [x2, v.y, z2]], a);
      poly([[v.x, y2, v.z1], [x2, y2, v.z1], [x2, y2, z2], [v.x, y2, z2]], a);
      if (!above) poly([[v.x, y2, v.z1], [x2, y2, v.z1], [x2, y2, z2], [v.x, y2, z2]], { fill: "var(--ink)", "fill-opacity": 0.12 });
      poly([[v.x, v.y, z2], [x2, v.y, z2], [x2, y2, z2], [v.x, y2, z2]], cut ? { fill: "var(--accent)", "fill-opacity": 0.55, stroke: "var(--ink)", "stroke-width": 0.7 } : a);
    }
    const [nx, ny] = pr(-4, -6, 0);
    tx(svg, "B ↑", nx, ny, { "font-size": 9, "font-weight": 800 });
    const [sx, sy] = pr(47, 52, 0);
    tx(svg, "sông", sx + 10, sy + 4, { "font-size": 9, fill: "var(--ink-2)" });
  }

  /* ---------- Mặt bằng theo toạ độ khu đất ---------- */
  function drawPlan(svg, d, li, st) {
    const S = d.S, L = S.levels[li];
    svg.innerHTML = "";
    const env = P5.envOf(L, d.prep.V), env1 = P5.envOf(S.levels[0], d.prep.V);
    const all = S.levels.flatMap(q => P5.envOf(q, d.prep.V)).concat((S.levels[0].out || []).map(o => o.r));
    const yA = Math.max(-6, Math.min(...all.map(r => r[1])) - 7), yB = Math.min(110, Math.max(...all.map(r => r[1] + r[3])) + 7);
    const xA = -9, xB = 48;
    const hz = st.orient === "h";
    // chiếu: dọc = Bắc lên trên; ngang = Bắc bên trái, sông ở trên
    const pj = (x, y) => hz ? [(y - yA) * PX, (xB - x) * PX] : [(x - xA) * PX, (y - yA) * PX];
    const pr = r => { const [a, b] = pj(r[0], r[1]), [c, e] = pj(r[0] + r[2], r[1] + r[3]); return { x: Math.min(a, c), y: Math.min(b, e), width: Math.abs(c - a), height: Math.abs(e - b) }; };
    const W = hz ? (yB - yA) * PX : (xB - xA) * PX, H = hz ? (xB - xA) * PX : (yB - yA) * PX;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.style.minWidth = hz ? "760px" : "460px";
    svg.style.maxWidth = hz ? "1100px" : "620px";
    const uid = `p5${S.id}${li}`;
    const defs = el("defs", {}, svg);
    Object.entries(PC).forEach(([k, c]) => { const m = el("marker", { id: `a-${uid}-${k}`, viewBox: "0 0 10 10", refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto" }, defs); el("path", { d: "M0 0 L10 5 L0 10 z", fill: c }, m); });
    const R = (r, a, p = svg) => el("rect", { ...pr(r), ...a }, p);
    const T = (x, y, s, a = {}, p = svg) => { const [X, Y] = pj(x, y); return tx(p, s, X, Y, a); };
    // nền
    R([xA, yA, xB - xA, yB - yA], { fill: "var(--paper)" });
    R([0, yA, 41.5, yB - yA], { fill: "var(--pave)" });
    R([xA, yA, -xA, yB - yA], { fill: "var(--road)" });
    R([0, Math.max(yA, 14), 6, Math.min(yB, 93) - Math.max(yA, 14)], { fill: "var(--road)", opacity: 0.7 });
    R([41.5, yA, xB - 41.5, yB - yA], { fill: "var(--pave)" });
    for (let i = 1; i < (xB - 41.5) / 0.7; i++) { const [a, b] = pj(41.5 + i * 0.7, yA), [c, e] = pj(41.5 + i * 0.7, yB); el("line", { x1: a, y1: b, x2: c, y2: e, stroke: "var(--ink-2)", "stroke-width": 0.5, opacity: 0.6 }, svg); }
    if (yA < 12) R([0, yA, 41.5, 12 - yA], { fill: "var(--zOut)" });
    if (yB > 89) R([0, 89, 41.5, yB - 89], { fill: "var(--road)" });
    const rot = hz ? 0 : -90;
    const lab = (x, y, s, a = {}) => { const [X, Y] = pj(x, y); tx(svg, s, X, Y, { "font-size": 11, "font-weight": 700, "letter-spacing": 1.5, fill: "var(--ink-2)", class: "halo", transform: rot ? `rotate(${rot} ${X} ${Y})` : "", ...a }); };
    const ym = (yA + yB) / 2;
    lab(-4.5, ym, "ĐƯỜNG TRẦN PHÚ"); lab(3, ym + 12, "Lối Tây 6 m · xe cứu hỏa, giao nhận", { "font-size": 10, "letter-spacing": 0.5 });
    lab(45, ym, "BẬC THANG XUỐNG BẠCH ĐẰNG · SÔNG HÀN");
    const nsl = (x, y, s) => { const [X, Y] = pj(x, y); tx(svg, s, X, Y + 4, { "font-size": 10.5, fill: "var(--ink-2)", class: "halo", transform: hz ? `rotate(-90 ${X} ${Y})` : "" }); };
    if (yA < 8) nsl(20.75, yA + 2.5, "Quảng trường Bắc");
    if (yB > 92) nsl(hz ? 20.75 : 9, Math.min(yB - 2.5, 97), "Bãi xe · giao nhận");
    R([0, yA, 41.5, yB - yA], { fill: "none", stroke: "var(--ink)", "stroke-width": 1.2, "stroke-dasharray": "10 4 2 4" });
    // ngoài trời
    for (const o of L.out || []) {
      R(o.r, { fill: "var(--zOut)", stroke: "var(--ink-2)", "stroke-width": 0.8, "stroke-dasharray": "4 3" });
      if (o.t) { const q = pr(o.r), vert = (q.height > q.width * 1.4); const cx = q.x + q.width / 2, cy = q.y + q.height / 2; tx(svg, o.t, cx, cy + 4, { "font-size": 10, "font-weight": 700, fill: "var(--ink-2)", class: "halo", transform: vert ? `rotate(-90 ${cx} ${cy})` : "" }); }
    }
    if (li > 0) for (const e of env1) R(e, { fill: "none", stroke: "var(--ink-2)", "stroke-width": 0.8, "stroke-dasharray": "5 4" });
    // phòng
    const fillOf = z => st.mode === "noise" ? (z.g === "void" ? "var(--void)" : NZ[z.nz ?? 1]) : FILL[z.g] || "var(--zE)";
    const off = z => st.mode === "night" && !z.night;
    for (const z of L.rooms) {
      const r = R(z.r, { fill: fillOf(z), stroke: "var(--ink)", "stroke-width": z.g === "void" ? 0.6 : 1.1, "stroke-dasharray": z.g === "void" ? "4 3" : "none" });
      if (off(z)) r.setAttribute("opacity", 0.25);
    }
    // nội thất
    const fg = el("g", { class: "furn" }, svg); if (st.mode === "night") fg.setAttribute("opacity", 0.35);
    const tagList = [];
    const FK = { f: ["var(--furn)", "var(--ink)"], s: ["var(--ink-2)", "none"], sheet: ["var(--sheet)", "var(--ink)"], zD: ["var(--zD)", "var(--ink)"], zC: ["var(--zC)", "var(--ink)"], ink: ["var(--ink)", "none"] };
    const LK = { l: [0.5, 1], l2: [0.7, 1], t: [0.35, 0.9], w: [1.1, 1], a: [0.8, 1], v: [0.6, 0.6] };
    for (const z of L.rooms) {
      const f = P5.furn(z, L);
      for (const s of f.S) {
        if (s.t === "r") { const [fc, sc] = FK[s.k] || FK.f; R([s.x, s.y, s.w, s.h], { fill: fc, stroke: sc, "stroke-width": 0.45 }, fg); }
        else if (s.t === "c") { const [X, Y] = pj(s.x, s.y), [fc, sc] = FK[s.k] || FK.f; el("circle", { cx: X, cy: Y, r: s.r * PX, fill: fc, stroke: sc, "stroke-width": 0.45 }, fg); }
        else { const [a, b] = pj(s.x1, s.y1), [c, e] = pj(s.x2, s.y2), [w, o] = LK[s.k] || LK.l; el("line", { x1: a, y1: b, x2: c, y2: e, stroke: s.k === "v" ? "var(--line)" : "var(--ink)", "stroke-width": w, opacity: o }, fg); }
      }
      if (f.tags[0] && z.g !== "core") tagList.push([z, f.tags[0]]);
    }
    // vỏ khối 3D ở tầng này
    for (const e of env) R(e, { fill: "none", stroke: "var(--ink)", "stroke-width": 3 });
    // kết cấu: cột, vách
    const sg = el("g", { class: "struct" }, svg);
    for (const s of d.prep.st || []) {
      if (s.t === "col" && s.z1 <= L.z + 0.1 && s.z2 >= L.z + 1.5) R([s.x - 0.22, s.y - 0.22, 0.44, 0.44], { fill: "var(--ink)" }, sg);
      if (s.t === "wall" && s.z1 <= L.z + 0.1 && s.z2 >= L.z + 1.5) R([s.x, s.y, s.w, s.d], { fill: "var(--ink)", opacity: 0.85 }, sg);
    }
    // cửa
    const { doors } = P5.doorsOf(L);
    const DC = { x: "var(--accent)", m: "var(--accent)", k: "var(--warn)", s: "var(--ink-2)", f: "var(--ink-2)", "": "var(--sheet)" };
    for (const dr of doors) {
      const t = 0.32, w = dr.b - dr.a;
      const rr = dr.o === "h" ? [dr.a, dr.at - t / 2, w, t] : [dr.at - t / 2, dr.a, t, w];
      if (dr.k === "o") { R(rr, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 0.5, "stroke-dasharray": "3 2" }); continue; }
      R(rr, { fill: DC[dr.k] ?? "var(--sheet)", stroke: dr.k ? "none" : "var(--ink)", "stroke-width": 0.5 });
      if (dr.k === "f") continue;
      // cánh cửa: cung 1/4 quanh bản lề, vẽ bằng điểm để đúng khi xoay bản vẽ
      const sw = Math.min(w, 1.2), sgn = dr.ext === "S" || dr.ext === "E" ? -1 : 1;
      const p0 = dr.o === "h" ? [dr.a, dr.at] : [dr.at, dr.a];
      const u = dr.o === "h" ? [1, 0] : [0, 1], v = dr.o === "h" ? [0, sgn] : [sgn, 0];
      const arc = [];
      for (let i = 0; i <= 8; i++) { const t = i / 8 * Math.PI / 2; arc.push(pj(p0[0] + sw * (Math.cos(t) * u[0] + Math.sin(t) * v[0]), p0[1] + sw * (Math.cos(t) * u[1] + Math.sin(t) * v[1]))); }
      const [ox, oy] = pj(...p0);
      el("path", { d: `M${arc.map(q => q.join(" ")).join(" L")} L${ox} ${oy}`, fill: "none", stroke: "var(--ink-2)", "stroke-width": 0.5 }, svg);
    }
    // tầng trên (nét đứt)
    if (st.upper && S.levels[li + 1]) for (const e of P5.envOf(S.levels[li + 1], d.prep.V)) R(e, { fill: "none", stroke: "var(--accent)", "stroke-width": 1.4, "stroke-dasharray": "8 5" });
    // đường đi
    const pg = el("g", { class: "paths" }, svg);
    for (const p of L.paths || []) {
      const pts = p.pts.map(q => pj(...q).join(",")).join(" ");
      el("polyline", { points: pts, fill: "none", stroke: PC[p.k] || "var(--ink)", "stroke-width": 3.2, "stroke-dasharray": "7 4", "stroke-linejoin": "round", "marker-end": `url(#a-${uid}-${p.k})` }, pg);
      if (p.t) { const [X, Y] = pj(...p.pts[0]); tx(pg, p.t, X, Y - 7, { "font-size": 10, "font-weight": 700, fill: PC[p.k], class: "halo" }); }
    }
    // ghi chú nội thất
    const tg = el("g", { class: "tags" }, svg);
    for (const [z, s] of tagList) { const q = pr(z.r); if (q.width < 70 && q.height < 70) continue; tx(tg, s, q.x + q.width / 2, q.y + q.height - 6, { "font-size": 8.6, class: "halo" }); }
    // tên phòng
    const lg = el("g", { class: "labels" }, svg);
    for (const z of L.rooms) {
      if (!z.n) continue;
      const q = pr(z.r), vert = q.width < 52 && q.height > q.width * 1.5;
      const head = ["circ", "core", "void"].includes(z.g) ? z.n : `${z.c} ${z.n}`;
      const sub = z.g === "circ" || z.g === "void" ? `${nf(z.r[2])} × ${nf(z.r[3])} m` : z.g === "core" ? "" : `${nf(z.r[2] * z.r[3])} m²`;
      const ax = vert ? q.x + q.width - 4 : q.x + 4, ay = q.y + 4;
      const gg = el("g", { transform: vert ? `translate(${ax} ${ay}) rotate(90)` : `translate(${ax} ${ay})` }, lg);
      if (off(z)) gg.setAttribute("opacity", 0.35);
      const avail = (vert ? q.height : q.width) - 8;
      const t1 = tx(gg, head, 0, 10, { "font-size": 10.5, "font-weight": z.g === "circ" ? 600 : 800, "text-anchor": "start", "font-style": z.g === "circ" ? "italic" : "normal" });
      // tên dài hơn phòng: rút về mã phòng, rồi thu chữ
      if (t1.getComputedTextLength() > avail) t1.textContent = D.target[z.c] ? z.c : z.n.split(/[ ,]/)[0];
      if (t1.getComputedTextLength() > avail) t1.setAttribute("font-size", 8.5);
      const t2 = sub ? tx(gg, sub, 0, 21, { "font-size": 9, class: "m", fill: "var(--ink-2)", "text-anchor": "start" }) : null;
      if (t2 && t2.getComputedTextLength() > avail) t2.remove();
      const bb = gg.getBBox();
      gg.insertBefore(el("rect", { x: bb.x - 2, y: bb.y - 1, width: bb.width + 4, height: bb.height + 2, rx: 2, fill: "var(--sheet)", opacity: 0.88 }), gg.firstChild);
    }
    // mũi tên Bắc + thước
    const [nx, ny] = hz ? [24, H - 40] : [26, 30];
    const ang = (hz ? -90 : 0) + (G.north ? G.north() : 0); // trục dọc khu đất lệch so với Bắc thật
    const ng = el("g", { transform: `translate(${nx} ${ny}) rotate(${ang})` }, svg);
    el("path", { d: "M0 -15 L8 8 L0 3 L-8 8 Z", fill: "var(--ink)" }, ng);
    tx(svg, "Bắc", nx + (hz ? -2 : 0), ny + (hz ? 26 : 24), { "font-size": 10.5, "font-weight": 800 });
    const bx = W - 140, by = H - 18;
    el("rect", { x: bx, y: by - 5, width: 50, height: 5, fill: "var(--ink)" }, svg); el("rect", { x: bx + 50, y: by - 5, width: 50, height: 5, fill: "var(--sheet)", stroke: "var(--ink)", "stroke-width": 0.8 }, svg);
    tx(svg, "0", bx, by + 11, { "font-size": 9, class: "m" }); tx(svg, "10 m", bx + 100, by + 11, { "font-size": 9, class: "m" });
  }

  /* ---------- Bảng phòng so với đề ---------- */
  function roomsTable(d) {
    const parts = {};
    d.S.levels.forEach(L => L.rooms.forEach(z => { if (D.target[z.c]) (parts[z.c] = parts[z.c] || []).push({ k: L.k, z }); }));
    const grp = { A: "A Đón tiếp", B: "B Đọc và tra cứu", C: "C Kho và nghiệp vụ", D: "D Văn hóa", E: "E Quản trị và hỗ trợ" };
    let h = `<thead><tr><th>Mã</th><th>Không gian</th><th>Tầng</th><th>Kích thước (m)</th><th class="num">Đề (m²)</th><th class="num">Vẽ (m²)</th><th class="num">Lệch</th><th class="num">Chỗ đề</th><th class="num">Chỗ vẽ</th></tr></thead><tbody>`;
    let tt = 0, tg = 0;
    for (const g of Object.keys(grp)) {
      h += `<tr class="sub"><td colspan="9">${grp[g]}</td></tr>`;
      for (const c of Object.keys(D.target).filter(c => c[0] === g)) {
        const ps = parts[c] || [], t = D.target[c], v = ps.reduce((s, p) => s + p.z.r[2] * p.z.r[3], 0), pct = (v - t) / t * 100;
        tt += t; tg += v;
        const dims = ps.length > 3 ? [`${ps.length} phần`] : ps.map(p => `${nf(p.z.r[2])} × ${nf(p.z.r[3])}`);
        const want = D.seats[c] || 0, got = d.R.seats[c] || 0;
        h += `<tr><td class="mono">${c}</td><td>${D.names[c]}</td><td class="mono">${[...new Set(ps.map(p => p.k.slice(1)))].join(", ") || "—"}</td><td class="mono">${dims.join("<br>") || "—"}</td><td class="num">${nf(t)}</td><td class="num">${nf(v)}</td><td class="num ${Math.abs(pct) > 10 ? "bad" : "ok"}">${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%</td><td class="num">${want || "—"}</td><td class="num ${want && got < want ? "bad" : ""}">${want ? got : "—"}</td></tr>`;
      }
    }
    h += `<tr class="sub"><td></td><td>Tổng diện tích sử dụng</td><td></td><td></td><td class="num">${nf(tt, 0)}</td><td class="num">${nf(tg, 0)}</td><td></td><td></td><td></td></tr>`;
    h += `<tr><td></td><td>Giao thông, lõi thang (chưa trừ tường, cột)</td><td></td><td></td><td class="num">≤ 780</td><td class="num">${nf(d.R.total - tg, 0)}</td><td></td><td></td><td></td></tr>`;
    h += `<tr><td></td><td><b>Tổng sàn</b> · ${d.R.levels.map((L, i) => `T${i + 1} ${nf(L.env, 0)}`).join(" + ")}</td><td></td><td></td><td class="num">≤ 3.000</td><td class="num"><b>${nf(d.R.total, 0)}</b></td><td class="num ${d.R.total > 3000 ? "bad" : "ok"}">${d.R.total > 3000 ? "vượt" : "đạt"}</td><td></td><td></td></tr>`;
    return h + "</tbody>";
  }

  /* ---------- Kiểm tra nhanh ---------- */
  function checks(d) {
    const S = d.S, R = d.R, out = [];
    const ok = (b, t, n) => out.push(`<li class="${b ? "ok" : "bad"}"><b>${b ? "Đạt" : "Cần xem"}</b><span>${t}${n ? `<br><span class="note">${n}</span>` : ""}</span></li>`);
    ok(R.total <= 3000, `Tổng sàn ${nf(R.total, 0)} m² (đề ≤ 3.000 m²).`);
    const dev = Object.keys(D.target).filter(c => Math.abs(((R.byCode[c] || 0) - D.target[c]) / D.target[c]) > 0.1);
    ok(!dev.length, dev.length ? `Lệch quá 10%: ${dev.join(", ")}.` : "Mọi phòng trong đề đều có, diện tích lệch không quá 10%.");
    const seatBad = Object.keys(D.seats).filter(c => (R.seats[c] || 0) < D.seats[c]);
    ok(!seatBad.length, seatBad.length ? `Thiếu chỗ ngồi: ${seatBad.join(", ")}.` : "Đủ số chỗ ngồi theo đề, đếm trên mặt bằng nội thất.");
    const up = R.levels.slice(1);
    ok(up.every(L => L.stairs >= 2), `Thang bộ: ${R.levels.map((L, i) => `T${i + 1} có ${L.stairs}`).join(", ")}. Các thang thẳng từ dưới lên.`);
    ok(R.levels.every(L => L.far <= 30), `Đi xa nhất tới thang bộ hoặc cửa ra ngoài: ${R.levels.map((L, i) => `T${i + 1} ${nf(L.far, 0)} m`).join(", ")}.`, "Đo theo đường vuông góc từ góc phòng xa nhất. Mốc 30 m là mốc tự đặt để so sánh; khi làm hồ sơ cần đối chiếu QCVN 06:2022/BXD.");
    const lift = S.levels.every(L => L.rooms.some(z => /l/.test(z.st || "") && z.g === "core"));
    ok(lift, lift ? "Có thang máy tới mọi tầng." : "Chưa có thang máy tới mọi tầng.");
    const wc = S.levels.map(L => L.rooms.some(z => z.c === "E5"));
    ok(wc.every(Boolean) || wc.length > 2 && wc[0] && wc[1], `WC: ${wc.map((b, i) => `T${i + 1} ${b ? "có" : "không"}`).join(", ")}.`, wc.every(Boolean) ? "" : "Tầng không có WC đi xuống một tầng bằng thang chính.");
    const bk = S.levels.some(L => L.rooms.some(z => /b/.test(z.st || "")));
    ok(bk, bk ? "Có tời sách nối tiếp nhận, nghiệp vụ và kho." : "Chưa có tời sách.");
    return `<ul class="p5-check">${out.join("")}</ul>`;
  }

  /* ---------- Dựng tab ---------- */
  let cur = 0, li = 0;
  const st = { mode: "fn", orient: "v", upper: false };
  function build() {
    const cards = DATA.map((d, i) => `<button type="button" class="p5-pick" data-p="${i}" aria-pressed="${i === cur}">
      <span class="eyebrow">${d.I.code} · ${FAMN[d.I.fam] || ""}</span><b>${esc(d.I.name)}</b><small>${esc(d.I.rule)} · ${nf(d.R.total, 0)} m² · ${d.S.levels.length} tầng</small></button>`).join("");
    const cmp = `<table><thead><tr><th>Phương án</th><th class="num">Tổng sàn</th><th class="num">Số tầng</th><th class="num">Cao nhất</th><th class="num">Thang bộ</th><th class="num">Giao thông + lõi</th><th class="num">Đi xa nhất tới thang</th><th class="num">Phòng lệch &gt; 10%</th><th class="num">Kính trần Đông + Tây</th></tr></thead><tbody>${DATA.map(d => {
      const dev = Object.keys(D.target).filter(c => Math.abs(((d.R.byCode[c] || 0) - D.target[c]) / D.target[c]) > 0.1).length;
      const ns = new Set(d.S.levels.flatMap(L => L.rooms.filter(z => z.g === "core" && /u/.test(z.st || "u")).map(z => P5.rid(z)))).size;
      return `<tr><td><b>${d.I.code} ${esc(d.I.name)}</b><br><span class="note">${FAMN[d.I.fam] || ""}</span></td><td class="num">${nf(d.R.total, 0)} m²</td><td class="num">${d.S.levels.length}</td><td class="num">+${nf(d.prep.H, 1)} m</td><td class="num">${ns}</td><td class="num">${Math.round((d.R.total - d.R.use) / d.R.total * 100)}%</td><td class="num">${nf(Math.max(...d.R.levels.map(L => L.far)), 0)} m</td><td class="num ${dev ? "bad" : "ok"}">${dev}</td><td class="num">${nf(d.prep.fac.E.tran + d.prep.fac.W.tran, 0)} m²</td></tr>`;
    }).join("")}</tbody></table>`;
    host.innerHTML = `
<section>
  <p class="eyebrow">Bước tiếp theo · từ khối sang mặt bằng</p>
  <h1>3 khối được chọn để phát triển mặt bằng</h1>
  <p class="lede">Trong 29 khối ở tab trước, tôi chọn 3 khối thuộc 3 ý tưởng khác nhau. Cả 3 có mặt bằng vuông góc trên lưới nên chia phòng gọn, ít diện tích thừa. Mỗi khối dùng một quy luật bố cục riêng, có hai khối nhìn hơi lộn xộn đúng ý bạn. Phần kết cấu thì thầy có thể kiểm tra được: cột thẳng từ móng lên, nhịp không quá 18 m.</p>
  <div class="g3-rules">
    <div class="sheet"><b class="n">Tiêu chí 1</b><h3>Hợp ý bạn và hợp ý thầy</h3><p>Có độ lệch, độ "lộn xộn" nhìn thấy được, nhưng mọi khối nằm trên lưới, cột thẳng một mạch, không có dầm chuyển lớn.</p></div>
    <div class="sheet"><b class="n">Tiêu chí 2</b><h3>Chia phòng được</h3><p>Hình vuông góc, bề sâu 8–18 m nên phòng nào cũng có cửa sổ, ít góc chết. Các khối mái cong, đĩa tròn (Đầm sen, Cánh diều) đẹp ở bước khối nhưng chia phòng rất phí.</p></div>
    <div class="sheet"><b class="n">Tiêu chí 3</b><h3>Khí hậu</h3><p>Mặt Tây đặc chứa thang, kho, WC. Phòng đọc quay ra Bắc và Đông. Không có kính trần hướng Đông hoặc Tây. Sân hoặc khe mở về hướng Đông Nam đón gió.</p></div>
    <div class="sheet"><b class="n">Tiêu chí 4</b><h3>Ba hướng khác nhau</h3><p>Một làng nhà thấp (3.3), một khối cài có khe (2.3), một khối nặng – nhẹ có hộp treo (1.4). Bạn so sánh được ba cách làm trước khi chốt một.</p></div>
  </div>
  <div class="sheet scroll">${cmp}</div>
  <p class="note">Phương án 7.2 Cầu qua khe cũng rất hay nhưng hộp đọc nhịp 30 m bắc qua khe chéo, nên để làm phương án dự phòng nếu thầy muốn kết cấu táo bạo hơn.</p>
</section>
<section>
  <div class="p5-picks" role="group" aria-label="Chọn phương án">${cards}</div>
  <div class="p5-body"></div>
</section>`;
    host.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { cur = +b.dataset.p; li = 0; host.querySelectorAll("[data-p]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); body(); }));
    body();
  }

  function body() {
    const d = DATA[cur], S = d.S, box = host.querySelector(".p5-body");
    if (window.matchMedia && window.matchMedia("(min-width: 900px)").matches && st.orient0 == null) { st.orient = "h"; st.orient0 = 1; }
    box.innerHTML = `
  <div class="p5-head">
    <div style="display:grid;gap:10px">
      <p class="eyebrow">${d.I.code} · ${FAMN[d.I.fam] || ""} · quy luật: ${esc(d.I.rule.toLowerCase())}</p>
      <h2>${esc(d.I.name)}</h2>
      <p><b>Vì sao chọn.</b> ${esc(S.pick || "")}</p>
      <p><b>Ý tưởng mặt bằng.</b> ${esc(S.concept || "")}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px"><button type="button" class="p5-3d">Xem khối 3D xoay được, có nắng và gió</button><button type="button" class="p5-3d p5-pin" aria-pressed="false">Ghim phương án này</button></div>
    </div>
    <div class="sheet" style="padding:8px"><svg class="p5-iso" role="img" aria-label="Khối 3D, tầng đang xem tô màu"></svg><p class="note" style="text-align:center">Mặt cắt tô xanh là tầng đang xem.</p></div>
  </div>
  <div class="toolbar">
    <div class="seg" role="group" aria-label="Chọn tầng">${S.levels.map((L, i) => `<button type="button" data-l="${i}" aria-pressed="${i === li}">${LVN[L.k] || L.k}</button>`).join("")}</div>
    <div class="seg" role="group" aria-label="Tô màu theo"><button type="button" data-m="fn" aria-pressed="${st.mode === "fn"}">Màu chức năng</button><button type="button" data-m="noise" aria-pressed="${st.mode === "noise"}">Mức ồn</button><button type="button" data-m="night" aria-pressed="${st.mode === "night"}">Ngoài giờ</button></div>
    <div class="seg" role="group" aria-label="Hướng bản vẽ"><button type="button" data-o="v" aria-pressed="${st.orient === "v"}">Bắc lên trên</button><button type="button" data-o="h" aria-pressed="${st.orient === "h"}">Xoay ngang</button></div>
  </div>
  <div class="checks">
    <label class="check"><input type="checkbox" data-c="hide-labels" checked> Tên phòng</label>
    <label class="check"><input type="checkbox" data-c="hide-furn" checked> Nội thất</label>
    <label class="check"><input type="checkbox" data-c="hide-tags"> Ghi chú nội thất</label>
    <label class="check"><input type="checkbox" data-c="hide-paths" checked> Đường đi</label>
    <label class="check"><input type="checkbox" data-u="1" ${st.upper ? "checked" : ""}> Vỏ tầng trên</label>
  </div>
  <div class="plan sheet"><div class="cap"><b class="ttl"></b><span class="mono meta"></span></div><div class="scroll"><svg class="pplan p5-plan" role="img" aria-label="Mặt bằng"></svg></div><div class="note p5-note"></div></div>
  <div class="legend p5-legend"></div>
  <div class="split">
    <div style="display:grid;gap:10px"><h3>Kiểm tra nhanh</h3>${checks(d)}</div>
    <div style="display:grid;gap:10px"><h3>Chỉnh so với khối 3D</h3><ul class="p5-adj">${(S.adjust || []).map(a => `<li>${esc(a)}</li>`).join("") || "<li>Không chỉnh.</li>"}</ul></div>
  </div>
  <div style="display:grid;gap:10px"><h3>Diện tích và số chỗ so với đề</h3><p class="note">"Chỗ vẽ" là số ghế đếm được trên mặt bằng nội thất. Diện tích tính theo tim tường, chưa trừ tường và cột.</p><div class="sheet scroll"><table class="p5-rooms"></table></div></div>`;
    box.querySelector(".p5-rooms").innerHTML = roomsTable(d);
    box.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => { li = +b.dataset.l; box.querySelectorAll("[data-l]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    box.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => { st.mode = b.dataset.m; box.querySelectorAll("[data-m]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    box.querySelectorAll("[data-o]").forEach(b => b.addEventListener("click", () => { st.orient = b.dataset.o; box.querySelectorAll("[data-o]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    const planBox = box.querySelector(".plan");
    box.querySelectorAll("[data-c]").forEach(cb => { const ap = () => planBox.classList.toggle(cb.dataset.c, !cb.checked); cb.addEventListener("change", ap); ap(); });
    box.querySelector("[data-u]").addEventListener("change", e => { st.upper = e.target.checked; draw(); });
    box.querySelector(".p5-3d").addEventListener("click", () => open3D(d.idx));
    const pin = box.querySelector(".p5-pin"), pk = "g5:" + d.S.id;
    const syncPin = () => { const on = !!(G.store && G.store.pinned(pk)); pin.setAttribute("aria-pressed", String(on)); pin.textContent = on ? "Đã ghim · bấm để bỏ" : "Ghim phương án này"; host.querySelectorAll("[data-p]").forEach(b => b.classList.toggle("pinned", !!(G.store && G.store.pinned("g5:" + DATA[+b.dataset.p].S.id)))); };
    if (G.store) { pin.addEventListener("click", () => G.store.togglePin(pk, `Mặt bằng ${d.S.code} ${d.S.name}`)); syncPin(); if (!host.__pinsub) host.__pinsub = G.store.on(() => { const p2 = host.querySelector(".p5-pin"); if (p2) p2.dispatchEvent(new CustomEvent("sync")); }); pin.addEventListener("sync", syncPin); } else pin.hidden = true;
    draw();
  }

  function draw() {
    const d = DATA[cur], L = d.S.levels[li], box = host.querySelector(".p5-body"), M = d.R.levels[li];
    drawPlan(box.querySelector(".p5-plan"), d, li, st);
    isoMass(box.querySelector(".p5-iso"), d, L);
    box.querySelector(".ttl").textContent = L.title;
    box.querySelector(".meta").textContent = `sàn ${nf(M.env, 0)} m² · ${M.stairs} thang bộ`;
    box.querySelector(".p5-note").textContent = st.mode === "night" ? (L.locks || "") : st.mode === "noise" ? "Đỏ: ồn. Cam: vừa. Xanh nhạt: đọc. Xanh đậm: rất yên. Xám: kỹ thuật, thang." : "Viền đậm: vỏ khối 3D ở tầng này. Ô đen: cột. Cửa xanh: ra ngoài. Cửa đỏ: khóa ngoài giờ. Cửa nét đứt: lối mở không cánh. Nét đứt xám: vỏ tầng 1.";
    box.querySelector(".p5-legend").innerHTML = st.mode === "noise"
      ? `<span><i style="background:var(--n3)"></i>Ồn</span><span><i style="background:var(--n2)"></i>Vừa</span><span><i style="background:var(--n1)"></i>Đọc</span><span><i style="background:var(--n0)"></i>Rất yên</span><span><i style="background:var(--nx)"></i>Kỹ thuật, thang</span>`
      : `<span><i style="background:var(--zA)"></i>A Đón tiếp</span><span><i style="background:var(--zB)"></i>B Đọc</span><span><i style="background:var(--zC)"></i>C Kho, nghiệp vụ</span><span><i style="background:var(--zD)"></i>D Văn hóa</span><span><i style="background:var(--zE)"></i>E Hỗ trợ</span><span><i style="background:var(--zCore)"></i>Thang</span><span><i style="background:var(--zCirc)"></i>Hành lang</span><span><b style="background:var(--accent)"></b>Khách đọc</span><span><b style="background:var(--gold)"></b>Sự kiện</span><span><b style="background:var(--violet)"></b>Sách</span><span><b style="background:var(--ink-2)"></b>Nhân viên</span>`;
  }

  function open3D(idx) {
    const tabBtn = document.querySelector('.tabs [data-tab="g4"]');
    if (!tabBtn) return;
    tabBtn.click();
    let n = 0;
    const tryPick = () => {
      const b = document.querySelector(`#g4-host .g3-pick [data-i="${idx}"]`);
      if (b) { b.click(); b.scrollIntoView({ block: "center" }); return; }
      if (n++ < 40) setTimeout(tryPick, 50);
    };
    tryPick();
  }

  let started = false;
  const start = () => { if (started) return; started = true; build(); };
  window.addEventListener("arc-north", () => { if (started) draw(); });
  const tabBtn = document.querySelector('.tabs [data-tab="g5"]');
  if (tabBtn) tabBtn.addEventListener("click", () => requestAnimationFrame(start));
  const panel = document.querySelector('[data-panel="g5"]');
  if (panel && !panel.hidden) start();
})(window.G3);
