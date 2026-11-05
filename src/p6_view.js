/* ================= Tab: phương án chốt · mặt bằng đầy đủ ================= */
(function (G) {
  if (!G || !G.P6 || !G.CHOT || !G.CHOT.length) return;
  const host = document.getElementById("g9p-host");
  if (!host) return;
  const P6 = G.P6, NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const tx = (p, s, x, y, a = {}) => { const e = el("text", { x, y, "text-anchor": "middle", "dominant-baseline": "middle", "font-family": "var(--body)", "font-size": 10, fill: "var(--ink)", ...a }, p); e.textContent = s; return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => v.toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const DT = window.D || (typeof D !== "undefined" ? D : null);
  const CSS = `
.p6-khoi { border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; margin-bottom: 18px; }
.p6-khoi summary { cursor: pointer; }
.p6-rel { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin: 12px 0; }
.p6-rel div { background: var(--panel, transparent); border-left: 3px solid var(--dTnbd); padding: 4px 10px; }
.p6-rel p { margin: 4px 0 0; font-size: 13px; }
.p6-tw { overflow-x: auto; }
.p6-tw table { min-width: 1100px; font-size: 12.5px; }
.p6-tw td { vertical-align: top; }

.p6 { display: grid; gap: 28px; --dChinh: #0b5394; --dTudong: #3d9be9; --dP: #4c5753; --dO: #9aa5a1; --dK: #d0342c; --dNv: #7b4fb0; --dTn: #12a150; --dTnbd: #0e7490; --dCuon: #c98a00; --dThang: #e06c00; --cStair: #f4b183; --cLift: #c9b5ef; --rLib: #1f6f5c; --rEv: #b4441f; --rBook: #c98a00; --rStaff: #7b4fb0; --rEsc: #12a150; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .p6 { --dChinh: #6aa9e9; --dTudong: #8cc6f5; --dP: #a9b4b0; --dO: #6c7773; --dK: #ff7a6e; --dNv: #c3a6f2; --dTn: #4fd18b; --dTnbd: #5fd0e6; --dCuon: #f0c04c; --dThang: #ffa45c; --cStair: #8a5a33; --cLift: #5b4a85; --rLib: #6cc7ac; --rEv: #f08a63; --rBook: #f0c04c; --rStaff: #c3a6f2; --rEsc: #4fd18b; } }
:root[data-theme="dark"] .p6 { --dChinh: #6aa9e9; --dTudong: #8cc6f5; --dP: #a9b4b0; --dO: #6c7773; --dK: #ff7a6e; --dNv: #c3a6f2; --dTn: #4fd18b; --dTnbd: #5fd0e6; --dCuon: #f0c04c; --dThang: #ffa45c; --cStair: #8a5a33; --cLift: #5b4a85; --rLib: #6cc7ac; --rEv: #f08a63; --rBook: #f0c04c; --rStaff: #c3a6f2; --rEsc: #4fd18b; }
.p6 .bar { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.p6 .bar .k { font: 600 12px var(--mono); color: var(--ink-2); }
.p6 .seg button { font: 600 13px var(--body); padding: 6px 10px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; margin-right: -1px; }
.p6 .seg button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.p6 .seg button:focus-visible, .p6 label:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
.p6 label.ck { font: 600 13px var(--body); display: inline-flex; gap: 5px; align-items: center; }
.p6 .plan { border: 1px solid var(--line); border-radius: 3px; background: var(--paper); overflow: auto; }
.p6 .plan svg { display: block; width: 100%; height: auto; }
.p6 .leg { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12.5px; }
.p6 .leg span { display: inline-flex; align-items: center; gap: 6px; }
.p6 .leg i { display: inline-block; width: 22px; height: 0; border-top: 4px solid; }
.p6 .leg i.f { width: 12px; height: 12px; border: 1px solid var(--ink); }
.p6 .two { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; align-items: start; }
.p6 table { width: 100%; border-collapse: collapse; font-size: 13px; }
.p6 th, .p6 td { padding: 4px 6px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.p6 td.num, .p6 th.num { text-align: right; font-variant-numeric: tabular-nums; }
.p6 .ok { color: var(--accent); font-weight: 700; } .p6 .bad { color: var(--warn); font-weight: 700; }
.p6 .note { font-size: 13px; color: var(--ink-2); }
.p6 ul.chk { margin: 0; padding-left: 18px; display: grid; gap: 4px; font-size: 14px; }
.p6 .scn { border-left: 3px solid var(--accent); padding: 4px 0 4px 10px; font-size: 14px; }
`;
  const KC = k => `var(--${P6.DOORK[k] ? P6.DOORK[k].c : "dP"})`;
  const GRP = z => z.core ? (/l/.test(z.core.st) ? "var(--cLift)" : "var(--cStair)") : z.c === "circ" || !z.c ? "var(--zCirc)" : `var(--z${z.c[0]})`;
  const SCN = [
    ["0", "Tất cả cửa", "Hiện mọi cửa, mọi người trực."],
    ["1", "1 · Ngày thường", "294 người: 200 đọc + 32 cà phê + 30 trưng bày + 20 sảnh + 12 nhân viên. Phòng đa năng, phòng chuyên đề đóng. Người đọc vào từ khe, qua sảnh thư viện tới các khu đọc; khách cà phê, trưng bày vào từ sảnh phía sông."],
    ["2", "2 · Sự kiện ngoài giờ", "238 người: 120 đa năng + 24 chuyên đề + 32 cà phê + 30 trưng bày + 20 sảnh + 12 nhân viên. Cả cánh Nam (thư viện, kho, nhân viên) và tầng 2 cánh Bắc khóa. Khách vào sảnh sự kiện, dùng vệ sinh cánh Bắc, ra về qua sảnh hoặc cửa thoát nạn, không đi qua khu đóng."],
    ["3", "3 · Cùng hoạt động", "438 người. Hai cánh tách nhau bằng khe, chỉ nối ở tầng 2 qua thang Bắc (cửa khóa ngoài giờ mở). Người đọc và khách sự kiện không giao nhau ở tầng 1; tiếng ồn sự kiện không sát vách khu đọc."],
    ["5", "5 · Bảo mật sách", "Theo góp ý của thầy: người đọc vào khu đọc bắt buộc qua quầy thủ thư có cổng từ (viền xanh đậm), mang sách ra cũng phải qua đó. Thang của khu đọc chỉ nối các phòng bên trong khu đã kiểm soát; cửa thoát nạn của khu đọc là cửa có chuông báo, chỉ mở khi khẩn cấp (chấm chữ !)."],
    ["4", "4 · Giao nhận sách", "Xe tải vào lối Tây, dỡ sách ở cửa cuốn phòng tiếp nhận, qua hành lang nghiệp vụ tới xử lý, vào kho đóng; sách lên kệ tầng 2 bằng tời sách trong thang Nam. Sách trả từ quầy mượn trả về xử lý qua sảnh thang Nam (đoạn dùng chung duy nhất, chỉ nhân viên có thẻ)."]
  ];
  // mở sẵn ý tưởng khe Hải Vân mới nhất (sửa theo góp ý của thầy), nếu có
  const pick = re => (G.CHOT || []).findIndex(p => re.test(p.code));
  let ci = [pick(/^S\./), pick(/^A\.[4-9]/), pick(/^K/), 0].find(i => i >= 0), li = 1, sc = "0";
  const st = { furn: true, dim: true, staff: true, route: true, lab: true, light: true, orient: window.matchMedia && window.matchMedia("(min-width: 900px)").matches ? "h" : "v" };

  function closedIn(z, s) {
    if (s === "2") return !/^sk/.test(z.ctl || "");
    if (s === "1") return /^D/.test(z.c || "");
    return false;
  }
  // các tuyến cho tình huống: [màu, nhãn, từ, tới, điều kiện cửa]
  function routesFor(plan, s) {
    const R = plan.__R, Gr = R.G, all = [...Gr.nodes.keys()], byC = c => all.filter(n => Gr.nodes.get(n).z.c === c);
    const id = n => all.find(k => k.endsWith(":" + n));
    const out = [];
    const pub = d => d.k !== "nv" && d.k !== "cuon";
    const ev = (d, a, b) => d.k !== "k" && d.k !== "nv" && d.k !== "cuon" && (b === "ext" || /^sk/.test(Gr.nodes.get(b).z.ctl || ""));
    const add = (col, t, from, to, ok, rok) => { const r = P6.route(Gr, from, to, ok, rok || (() => true)); if (r) out.push({ col, t, from, r }); };
    if (s === "1" || s === "3") {
      for (const c of ["B3", "B2", "B5", "B4"]) { const n = byC(c)[0]; if (n) add("rLib", "Người đọc", n, "ext", pub, m => !/^(nv|kho|kt)/.test(Gr.nodes.get(m).z.ctl || "")); }
      const a3 = byC("A3")[0]; if (a3) add("rLib", "Khách cà phê", a3, "ext", pub);
    }
    if (s === "2" || s === "3") {
      for (const c of ["D1", "D4", "A3"]) { const n = byC(c)[0]; if (n) add("rEv", "Khách sự kiện", n, "ext", ev, m => /^sk/.test(Gr.nodes.get(m).z.ctl || "")); }
      const wc = all.find(n => Gr.nodes.get(n).z.c === "E5" && /^sk/.test(Gr.nodes.get(n).z.ctl || "")), d1 = byC("D1")[0];
      if (wc && d1) add("rEv", "Đi vệ sinh", d1, wc, ev, m => /^sk/.test(Gr.nodes.get(m).z.ctl || "") || m === wc);
    }
    if (s === "5") {
      const pub = d => /^(chinh|tudong|p|o|k|thang|len)$/.test(d.k);
      for (const n of all.filter(k => /^B/.test(Gr.nodes.get(k).z.c || ""))) { const z = Gr.nodes.get(n).z; if (/^B[1-6]$/.test(z.c) && !out.some(o => o.c === z.c)) { const r = P6.route(Gr, "ext", n, pub, () => true); if (r) out.push({ col: "rLib", t: "Người đọc vào khu đọc", from: "ext", r, c: z.c }); } }
    }
    if (s === "4") {
      const C4 = byC("C4")[0], C2 = byC("C2")[0], C1 = byC("C1")[0], A4 = byC("A4")[0];
      if (C4) add("rBook", "Sách mới", C4, "ext", d => true);
      if (C4 && C2) add("rBook", "Tiếp nhận → xử lý", C4, C2, () => true, m => /^(nv|kho)/.test(Gr.nodes.get(m).z.ctl || "") || m === C2);
      if (C2 && C1) add("rBook", "Xử lý → kho", C2, C1, () => true);
      if (A4 && C2) add("rStaff", "Sách trả về xử lý", A4, C2, () => true);
      const b1s = id("B1s"); if (C2 && b1s) add("rBook", "Lên kệ tầng 2 (tời sách)", C2, b1s, () => true);
    }
    return out;
  }

  /* ---------- vẽ một tầng ---------- */
  function drawLevel(svg, plan, L, lvl) {
    svg.innerHTML = "";
    const site = lvl < 0;
    const xA = site ? -22 : 0, xB = site ? 62 : 42, yA = site ? -17 : 8, yB = site ? 108 : 92;
    const hz = st.orient === "h", PX = site ? 8.5 : 14;
    const pj = (x, y) => hz ? [(y - yA) * PX, (xB - x) * PX] : [(x - xA) * PX, (y - yA) * PX];
    const W = hz ? (yB - yA) * PX : (xB - xA) * PX, H = hz ? (xB - xA) * PX : (yB - yA) * PX;
    svg.setAttribute("viewBox", `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`);
    svg.style.minWidth = hz ? (site ? "1000px" : "1300px") : (site ? "640px" : "600px");
    const pts = p => p.map(q => pj(q[0], q[1]).map(v => v.toFixed(1)).join(",")).join(" ");
    const poly = (p, a, par = svg) => el("polygon", { points: pts(p), ...a }, par);
    const line = (a, b, at, par = svg) => { const [x1, y1] = pj(a[0], a[1]), [x2, y2] = pj(b[0], b[1]); return el("line", { x1, y1, x2, y2, ...at }, par); };
    const T = (s, x, y, a = {}, par = svg) => { const [px, py] = pj(x, y); return tx(par, s, px, py, a); };
    const defs = el("defs", {}, svg);
    const hat = el("pattern", { id: "p6hat" + lvl, width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "var(--ink-2)", "stroke-width": 1.4, opacity: 0.45 }, hat);
    const arr = (id, col) => { const m = el("marker", { id, viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse" }, defs); el("path", { d: "M0 0 L10 5 L0 10 z", fill: `var(--${col})` }, m); };
    ["rLib", "rEv", "rBook", "rStaff", "rEsc"].forEach(c => arr("p6a" + c + lvl, c));
    if (site) return drawSite(svg, plan, { pj, poly, line, T, PX, lvl });
    // khung khu đất mờ
    el("rect", { x: 0, y: 0, width: W, height: H, fill: "var(--paper)" }, svg);
    for (const e of plan.levels[0].env) poly(e, { fill: "none", stroke: "var(--line)", "stroke-width": 1, "stroke-dasharray": "4 3" });
    // phòng
    const gR = el("g", {}, svg), gF = el("g", {}, svg), gW = el("g", {}, svg), gD = el("g", {}, svg), gL = el("g", {}, svg);
    for (const z of L.rooms) {
      poly(z.p, { fill: GRP(z), stroke: "none", opacity: z.c === "circ" ? 0.55 : 0.9 }, gR);
      if (sc !== "0" && closedIn(z, sc)) poly(z.p, { fill: `url(#p6hat${lvl})`, stroke: "none" }, gR);
      if (st.furn && z.furn) for (const s of z.furn.S) {
        const fill = s.k === "s" ? "var(--ink-2)" : s.k === "zD" ? "var(--zD)" : s.k === "zC" ? "var(--zC)" : s.k === "ink" ? "var(--ink)" : s.k === "sheet" ? "var(--sheet)" : "var(--furn)";
        if (s.t === "r") { const p = [[s.x, s.y], [s.x + s.w, s.y], [s.x + s.w, s.y + s.h], [s.x, s.y + s.h]]; poly(p, { fill, stroke: "var(--ink)", "stroke-width": 0.5, opacity: s.k === "s" ? 0.55 : 1 }, gF); }
        else if (s.t === "c") { const [cx, cy] = pj(s.x, s.y); el("circle", { cx, cy, r: s.r * PX, fill, stroke: "var(--ink)", "stroke-width": 0.5 }, gF); }
        else line([s.x1, s.y1], [s.x2, s.y2], { stroke: s.k === "a" ? "var(--warn)" : "var(--ink)", "stroke-width": s.k === "w" ? 1.2 : 0.6, opacity: s.k === "t" ? 0.7 : 1, "stroke-dasharray": s.k === "v" ? "3 3" : null }, gF);
      }
      poly(z.p, { fill: "none", stroke: "var(--ink)", "stroke-width": 1.1 }, gW);
    }
    for (const e of L.env) poly(e, { fill: "none", stroke: "var(--ink)", "stroke-width": 3 }, gW);
    // cửa: cắt tường rồi vẽ cánh theo màu loại cửa
    const { doors } = P6.doorsOf(L, plan);
    for (const d of doors) {
      const col = KC(d.k);
      if (sc !== "0") { const zf = L.rooms.find(z => z.id === d.from), zt = L.rooms.find(z => z.id === d.to); if (sc === "2" && d.k === "k") { line(d.a, d.b, { stroke: "var(--paper)", "stroke-width": 4 }, gD); line(d.a, d.b, { stroke: col, "stroke-width": 4 }, gD); const [mx, my] = pj(d.m[0], d.m[1]); el("rect", { x: mx - 5, y: my - 5, width: 10, height: 10, rx: 2, fill: col }, gD); tx(gD, "K", mx, my + 0.5, { "font-size": 8, fill: "#fff", "font-weight": 800 }); continue; } }
      line(d.a, d.b, { stroke: "var(--paper)", "stroke-width": 4.5 }, gD);
      if (d.k === "o") { line(d.a, d.b, { stroke: col, "stroke-width": 1.4, "stroke-dasharray": "3 3" }, gD); continue; }
      if (d.k === "cuon") { line(d.a, d.b, { stroke: col, "stroke-width": 3, "stroke-dasharray": "2 1.5" }, gD); continue; }
      if (d.k === "tudong") { const o = [d.n[0] * 0.12, d.n[1] * 0.12]; line([d.a[0] + o[0], d.a[1] + o[1]], [d.m[0] + o[0], d.m[1] + o[1]], { stroke: col, "stroke-width": 2.4 }, gD); line([d.m[0] - o[0], d.m[1] - o[1]], [d.b[0] - o[0], d.b[1] - o[1]], { stroke: col, "stroke-width": 2.4 }, gD); }
      else {
        // cánh mở: thoát nạn và lối chính mở ra ngoài, cửa khác mở vào phòng có ghi cửa
        const out = /tn|tnbd|chinh/.test(d.k) || (d.to !== "ext" && false), s = out ? 1 : -1, nn = [d.n[0] * s, d.n[1] * s];
        const leaves = d.w > 1.5 ? [[d.a, d.m], [d.b, d.m]] : [[d.a, d.b]];
        for (const [h, e] of leaves) {
          const r = Math.hypot(e[0] - h[0], e[1] - h[1]), tip = [h[0] + nn[0] * r, h[1] + nn[1] * r];
          line(h, tip, { stroke: col, "stroke-width": 2 }, gD);
          const [x1, y1] = pj(e[0], e[1]), [x2, y2] = pj(tip[0], tip[1]);
          el("path", { d: `M${x1.toFixed(1)} ${y1.toFixed(1)} A${(r * PX).toFixed(1)} ${(r * PX).toFixed(1)} 0 0 ${0} ${x2.toFixed(1)} ${y2.toFixed(1)}`, fill: "none", stroke: col, "stroke-width": 0.9, opacity: 0.8 }, gD);
          el("path", { d: `M${x1.toFixed(1)} ${y1.toFixed(1)} A${(r * PX).toFixed(1)} ${(r * PX).toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`, fill: "none", stroke: col, "stroke-width": 0.9, opacity: 0 }, gD);
        }
      }
      if (d.k === "tnbd") { const [mx, my] = pj(d.m[0] + d.n[0] * 0.9, d.m[1] + d.n[1] * 0.9); el("circle", { cx: mx, cy: my, r: 5, fill: col }, gD); tx(gD, "!", mx, my + 0.5, { "font-size": 8, fill: "#fff", "font-weight": 800 }); }
      if (d.to === "ext" && /chinh|tudong/.test(d.k)) { const o = [d.n[0] * 2.4, d.n[1] * 2.4]; line([d.m[0] + o[0], d.m[1] + o[1]], [d.m[0] + d.n[0] * 0.5, d.m[1] + d.n[1] * 0.5], { stroke: col, "stroke-width": 2, "marker-end": `url(#p6arLib${lvl})` }, gD); }
    }
    // ánh sáng: cửa sổ hướng Bắc/Nam của phòng có người (xanh), điểm tối (đỏ); phòng kiểm soát viền xanh đậm
    if (st.light && plan.__R.light) for (const Lt of plan.__R.light.filter(q => q.li === lvl)) {
      for (const [a, b] of Lt.wins) line(a, b, { stroke: "var(--dTudong)", "stroke-width": 5, opacity: 0.85, "stroke-linecap": "butt" }, gD);
      for (const [x, y] of Lt.darkPts) { const [px, py] = pj(x, y); el("circle", { cx: px, cy: py, r: 2.2, fill: "var(--warn)", opacity: 0.8 }, gD); }
      // phòng lấy sáng mái hướng Bắc: vạch nét đứt Đông – Tây mỗi 3 m, đúng nhịp răng cưa
      const zr = Lt.top && L.rooms.find(q => q.id === Lt.id);
      if (zr) for (let y = zr.bb[1] + 1.5; y < zr.bb[1] + zr.bb[3]; y += 3) {
        const xs = [];
        zr.p.forEach((a, i) => { const b = zr.p[(i + 1) % zr.p.length]; if ((a[1] - y) * (b[1] - y) < 0 || (a[1] === y && b[1] !== y)) xs.push(a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1])); });
        if (xs.length >= 2) line([Math.min(...xs) + 0.6, y], [Math.max(...xs) - 0.6, y], { stroke: "var(--dTudong)", "stroke-width": 1.4, "stroke-dasharray": "5 4", opacity: 0.7 }, gD);
      }
    }
    for (const z of L.rooms.filter(q => q.ctrl)) poly(z.p, { fill: "none", stroke: "var(--dTnbd)", "stroke-width": 3.2, "stroke-dasharray": sc === "5" ? null : "6 3" }, gD);
    // trục lưới và kích thước
    if (st.dim) {
      const xs = plan.grid.x, ys = plan.grid.y, gA = el("g", {}, svg);
      xs.forEach((x, i) => { line([x, ys[0] - 3], [x, ys[ys.length - 1] + 3], { stroke: "var(--ink-2)", "stroke-width": 0.5, "stroke-dasharray": "8 3 2 3", opacity: 0.6 }, gA); const [px, py] = pj(x, ys[0] - 4.6); el("circle", { cx: px, cy: py, r: 8, fill: "var(--sheet)", stroke: "var(--ink)" }, gA); tx(gA, String(i + 1), px, py, { "font-size": 9, "font-weight": 700 }); });
      ys.forEach((y, i) => { line([xs[0] - 3, y], [xs[xs.length - 1] + 3, y], { stroke: "var(--ink-2)", "stroke-width": 0.5, "stroke-dasharray": "8 3 2 3", opacity: 0.6 }, gA); const [px, py] = pj(xs[0] - 4.6, y); el("circle", { cx: px, cy: py, r: 8, fill: "var(--sheet)", stroke: "var(--ink)" }, gA); tx(gA, String.fromCharCode(65 + i), px, py, { "font-size": 9, "font-weight": 700 }); });
      const dimL = (a, b, off, txt) => { const [x1, y1] = pj(a[0], a[1]), [x2, y2] = pj(b[0], b[1]); const g = el("g", {}, gA); el("line", { x1, y1, x2, y2, stroke: "var(--ink)", "stroke-width": 0.7 }, g); for (const [x, y] of [[x1, y1], [x2, y2]]) el("line", { x1: x - 3, y1: y + 3, x2: x + 3, y2: y - 3, stroke: "var(--ink)", "stroke-width": 1 }, g); tx(g, txt, (x1 + x2) / 2 + (hz ? 0 : -9), (y1 + y2) / 2 + (hz ? -6 : 0), { "font-size": 9, transform: hz ? null : `rotate(-90 ${(x1 + x2) / 2 - 9} ${(y1 + y2) / 2})` }); };
      for (let i = 0; i < xs.length - 1; i++) dimL([xs[i], ys[ys.length - 1] + 2.4], [xs[i + 1], ys[ys.length - 1] + 2.4], 0, `${nf((xs[i + 1] - xs[i]) * 1000)}`);
      for (let i = 0; i < ys.length - 1; i++) dimL([xs[xs.length - 1] + 2.4, ys[i]], [xs[xs.length - 1] + 2.4, ys[i + 1]], 0, `${nf((ys[i + 1] - ys[i]) * 1000)}`);
      dimL([xs[0], ys[ys.length - 1] + 5], [xs[xs.length - 1], ys[ys.length - 1] + 5], 0, `${nf((xs[xs.length - 1] - xs[0]) * 1000)}`);
      dimL([xs[xs.length - 1] + 5, ys[0]], [xs[xs.length - 1] + 5, ys[ys.length - 1]], 0, `${nf((ys[ys.length - 1] - ys[0]) * 1000)}`);
    }
    // nhãn phòng: tên, mã, diện tích, kích thước (phòng chữ nhật)
    const boxes = [], hit = b => boxes.some(q => b.x < q.x + q.w && q.x < b.x + b.w && b.y < q.y + q.h && q.y < b.y + b.h);
    const place = g => { try { let b = g.getBBox(), dy = 0; while (hit({ x: b.x, y: b.y + dy, w: b.width, h: b.height }) && dy < 60) dy += 7; if (dy) g.setAttribute("transform", `translate(0 ${dy})`); boxes.push({ x: b.x, y: b.y + dy, w: b.width, h: b.height }); } catch (e) { /* chưa hiển thị */ } };
    if (st.lab) for (const z of L.rooms) {
      const [cx, cy] = z.lc || z.cn, small = z.a < 22, rect = z.r && Math.abs(z.a - z.r[2] * z.r[3]) < 0.5;
      const name = z.core ? (/l/.test(z.core.st) ? "Thang bộ + máy" : "Thang bộ") : z.n;
      const sub = `${z.c && z.c !== "circ" && !z.core ? z.c + " · " : ""}${nf(z.a, 1)} m²${rect && !small ? ` · ${nf(z.r[2], 2)} × ${nf(z.r[3], 2)}` : ""}`;
      const [px, py] = pj(cx, cy), g = el("g", {}, gL);
      const t1 = tx(g, small ? (z.c && z.c !== "circ" ? z.c : name.split(" ")[0]) : name, px, py - 6, { "font-size": small ? 8.5 : 10.5, "font-weight": 700 });
      const t2 = tx(g, small ? `${nf(z.a, 0)} m²` : sub, px, py + 6, { "font-size": 8.5, fill: "var(--ink-2)" });
      if (sc !== "0" && closedIn(z, sc)) tx(g, "ĐÓNG", px, py + 17, { "font-size": 8.5, "font-weight": 800, fill: "var(--warn)" });
      try { const b1 = t1.getBBox(), b2 = t2.getBBox(), bx = Math.min(b1.x, b2.x) - 2, by = b1.y - 1, bw = Math.max(b1.width, b2.width) + 4, bh = b2.y + b2.height - b1.y + 2; g.insertBefore(el("rect", { x: bx, y: by, width: bw, height: bh, rx: 2, fill: "var(--sheet)", opacity: 0.85 }), g.firstChild); } catch (e) { /* chưa gắn vào trang */ }
      place(g);
    }
    // người trực
    if (st.staff) for (const s of (L.staff || []).filter(s => sc === "0" || s.sc.includes(sc))) {
      const [px, py] = pj(s.x, s.y), g = el("g", {}, svg);
      el("circle", { cx: px, cy: py, r: 6, fill: "var(--rStaff)", stroke: "var(--sheet)", "stroke-width": 1.5 }, g);
      tx(g, "NV", px, py + 0.5, { "font-size": 6.5, fill: "#fff", "font-weight": 800 });
      const lg = el("g", {}, g), lt = tx(lg, s.t, px, py - 12, { "font-size": 8.5, "font-weight": 700, fill: "var(--rStaff)" });
      try { const b = lt.getBBox(); lg.insertBefore(el("rect", { x: b.x - 2, y: b.y - 1, width: b.width + 4, height: b.height + 2, rx: 2, fill: "var(--sheet)", opacity: 0.85 }), lt); } catch (e) { /* chưa hiển thị */ }
      place(lg);
    }
    // tuyến đi của tình huống
    if (st.route && sc !== "0") {
      const Gr = plan.__R.G;
      for (const R of routesFor(plan, sc)) {
        const ptsL = [], start = Gr.nodes.get(R.from);
        let cur = start && start.li === lvl ? [start.z.cn] : (R.from === "ext" && R.r.chain[0] && R.r.chain[0].e.li === lvl ? [[R.r.chain[0].e.d.m[0] + R.r.chain[0].e.d.n[0] * 3, R.r.chain[0].e.d.m[1] + R.r.chain[0].e.d.n[1] * 3]] : []);
        const flush = () => { if (cur.length > 1) ptsL.push(cur); cur = []; };
        for (const c of R.r.chain) {
          const node = c.n === "ext" ? null : Gr.nodes.get(c.n);
          if (c.e.v) { flush(); if (node && node.li === lvl) cur = [node.z.cn]; continue; }
          if (c.e.li === lvl) cur.push(c.e.d.m);
          if (node && node.li === lvl && c.n !== "ext") cur.push(node.z.cn); else if (c.n === "ext") { cur.push([c.e.d.m[0] + c.e.d.n[0] * 3, c.e.d.m[1] + c.e.d.n[1] * 3]); }
        }
        flush();
        for (const p of ptsL) el("polyline", { points: p.map(q => pj(q[0], q[1]).map(v => v.toFixed(1)).join(",")).join(" "), fill: "none", stroke: `var(--${R.col})`, "stroke-width": 2.6, "stroke-linejoin": "round", "stroke-dasharray": R.col === "rStaff" ? "6 4" : null, "marker-end": `url(#p6a${R.col}${lvl})`, opacity: 0.9 }, svg);
      }
    }
    northArrow(svg, pj, W, H, hz);
  }
  function northArrow(svg, pj, W, H, hz) {
    const n = G.north ? G.north() : 0, ang = (hz ? -90 : 0) + n, x = W - 34, y = 40;
    const g = el("g", { transform: `translate(${x} ${y}) rotate(${ang})` }, svg);
    el("path", { d: "M0 -15 L8 8 L0 3 L-8 8 Z", fill: "var(--ink)" }, g);
    tx(svg, "Bắc", x, y + 24, { "font-size": 10, "font-weight": 800 });
  }

  /* ---------- tổng mặt bằng: đường, lối Tây, bãi xe, tuyến xe giao nhận, cứu hỏa, khách ---------- */
  function drawSite(svg, plan, h) {
    const { pj, poly, line, T, PX, lvl } = h, S = plan.site;
    const R4 = (x, y, w, d, a) => poly([[x, y], [x + w, y], [x + w, y + d], [x, y + d]], a);
    R4(-22, -17, 84, 125, { fill: "var(--paper)" });
    R4(-18, -17, 12, 125, { fill: "var(--road)" }); T("ĐƯỜNG TRẦN PHÚ", -12, 50, { "font-size": 10, "font-weight": 700, fill: "var(--ink-2)" });
    R4(-6, -17, 6, 125, { fill: "var(--pave)" });
    R4(-6, -14, 68, 10, { fill: "var(--road)" }); T("PHỐ PHÍA BẮC", 30, -9, { "font-size": 10, "font-weight": 700, fill: "var(--ink-2)" });
    R4(0, -4, 41.5, 4, { fill: "var(--pave)" });
    R4(0, 0, 41.5, 104, { fill: "var(--zOut)", stroke: "var(--ink)", "stroke-width": 1.5, "stroke-dasharray": "6 3" });
    R4(0, 0, 6, 104, { fill: "var(--road)" }); T("LỐI TÂY 6 m · xe cứu hỏa, xe giao sách", 3, 30, { "font-size": 8.5, "font-weight": 700, transform: null });
    for (let i = 0; i < 12; i++) line([41.5 + i * 1.45, 0], [41.5 + i * 1.45, 104], { stroke: "var(--ink-2)", "stroke-width": 0.6, opacity: 0.6 });
    T("BẬC THANG XUỐNG BẠCH ĐẰNG · cao 5,5 m", 50, 50, { "font-size": 9.5, "font-weight": 700 });
    R4(59, -17, 3, 125, { fill: "var(--road)" }); T("Bạch Đằng · sông Hàn →", 60.5, 96, { "font-size": 8, fill: "var(--ink-2)" });
    R4(6, 0, 35.5, 14, { fill: "var(--pave)" }); T("Quảng trường Bắc · lối khách sự kiện", 14, 7, { "font-size": 9.5, "font-weight": 700 });
    R4(30, 14, 11.5, 75, { fill: "var(--pave)" }); T("Sân ven sông · hiên cà phê", 36, 40, { "font-size": 9, "font-weight": 700 });
    // khối nhà (đường bao tầng 1) và khe
    for (const e of plan.levels[0].env) poly(e, { fill: "var(--sheet)", stroke: "var(--ink)", "stroke-width": 2.4 });
    for (const hp of S.hatch || []) poly(hp, { fill: `url(#p6hat${lvl})`, stroke: "var(--ink-2)", "stroke-width": 0.8 });
    for (const [x, y, t, c] of S.labels || []) T(t, x, y, { "font-size": 9.5, "font-weight": 700, fill: c ? `var(--${c})` : "var(--ink)" });
    // bãi xe
    const P = S.park;
    R4(6, 89, 35.5, 15, { fill: "var(--road)", opacity: 0.8 });
    for (const s of P.bikes) R4(s[0], s[1], s[2], s[3], { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 0.4 });
    for (const s of P.cars) { R4(s[0], s[1], s[2], s[3], { fill: s[4] ? "var(--dTudong)" : "var(--sheet)", stroke: "var(--ink)", "stroke-width": 0.8, opacity: s[4] ? 0.35 : 1 }); T(s[4] ? "KT" : "Ô tô", s[0] + s[2] / 2, s[1] + s[3] / 2, { "font-size": 8, "font-weight": 700 }); }
    for (const s of P.racks) R4(s[0], s[1], s[2], s[3], { fill: "var(--zCirc)", stroke: "var(--ink-2)", "stroke-width": 0.5 });
    R4(P.booth[0], P.booth[1], P.booth[2], P.booth[3], { fill: "var(--rStaff)", opacity: 0.8 });
    T(`Bãi xe · ${P.nBike} xe máy · ${P.cars.length} ô tô (${P.cars.filter(c => c[4]).length} người khuyết tật) · ${P.nRack} xe đạp`, 24, 92.2, { "font-size": 9, "font-weight": 700 });
    T("Bốt giữ xe", P.booth[0] + 4.5, P.booth[1] + 1.2, { "font-size": 8, "font-weight": 700, fill: "var(--rStaff)" });
    T("Cổng xe", 3, 105.5, { "font-size": 8.5, "font-weight": 700 });
    // tuyến
    const RT = [[S.routes.delivery, "rBook", "Xe giao sách → cửa cuốn tiếp nhận"], [S.routes.fire, "rEsc", "Xe cứu hỏa"], [S.routes.moto, "rStaff", "Xe máy khách → bãi xe"], [S.routes.lib, "rLib", (S.routeNames && S.routeNames.lib) || "Người đọc: từ bãi xe, bờ sông vào khe"], [S.routes.event, "rEv", (S.routeNames && S.routeNames.event) || "Khách sự kiện: phố Bắc, quảng trường"]];
    for (const [ps, col, t] of RT) for (const p of ps) el("polyline", { points: p.map(q => pj(q[0], q[1]).map(v => v.toFixed(1)).join(",")).join(" "), fill: "none", stroke: `var(--${col})`, "stroke-width": 2.6, "stroke-dasharray": col === "rEsc" ? "8 4" : null, "marker-end": `url(#p6a${col}${lvl})`, opacity: 0.85 }, svg);
    for (const s of S.staff) { const [px, py] = pj(s.x, s.y); el("circle", { cx: px, cy: py, r: 6, fill: "var(--rStaff)", stroke: "var(--sheet)", "stroke-width": 1.5 }, svg); tx(svg, "NV", px, py + 0.5, { "font-size": 6.5, fill: "#fff", "font-weight": 800 }); tx(svg, s.t, px, py - 11, { "font-size": 8.5, "font-weight": 700, fill: "var(--rStaff)" }); }
    const W = +svg.getAttribute("viewBox").split(" ")[2], H = +svg.getAttribute("viewBox").split(" ")[3];
    northArrow(svg, pj, W, H, st.orient === "h");
  }

  /* ---------- bảng, danh sách kiểm tra ---------- */
  function checks(plan) {
    const R = plan.__R, out = [];
    const areaBad = Object.keys(DT.target).filter(c => Math.abs(((R.byCode[c] || 0) - DT.target[c]) / DT.target[c]) > 0.1);
    out.push([!areaBad.length, `Diện tích từng phòng lệch không quá ±10% so với đề${areaBad.length ? ": chưa đạt " + areaBad.join(", ") : ""}. Tổng sàn ${nf(R.total)} m² (≤ 3.000).`]);
    const seatBad = Object.keys(DT.seats).filter(c => (R.seats[c] || 0) < DT.seats[c]);
    const seat200 = ["B1", "B2", "B3", "B4", "B5", "B6"].reduce((s, c) => s + Math.min(R.seats[c] || 0, 999), 0);
    out.push([!seatBad.length, `Số chỗ đếm trên nội thất đủ đề (khu đọc ${seat200} vị trí, cần 200; phòng đa năng ${R.seats.D1 || 0}/120)${seatBad.length ? ": thiếu " + seatBad.join(", ") : ""}.`]);
    const has = re => R.err.some(e => re.test(e)) || R.levels.some(M => M.err.some(e => re.test(e)));
    out.push([!has(/không có cửa|cạnh chung|xuyên tường|không lồi/), "Mọi phòng có cửa; cửa nằm trên cạnh chung thật của hai phòng; phòng đều lồi nên đường đi qua cửa không xuyên tường."]);
    out.push([!has(/^Ngoài giờ/), "Ngoài giờ: khách sự kiện tới phòng đa năng, chuyên đề, cà phê, trưng bày, vệ sinh và ra về mà không qua khu đọc, kho, khu nhân viên; mọi cửa giữa hai khu là cửa khóa ngoài giờ; khóa cửa không chặn đường thoát nạn."]);
    out.push([!has(/^Ngày thường/), "Ngày thường: người đọc tới mọi khu đọc mà không qua cửa nhân viên."]);
    out.push([!has(/Tiếng ồn/), "Không có phòng ồn (đa năng, cà phê, thiếu nhi, kỹ thuật) sát vách phòng cần yên tĩnh (đọc yên tĩnh, văn phòng, kho)."]);
    out.push([!has(/thang bộ, cần|thang máy|người khuyết tật/), "Mỗi tầng trên có 2 thang bộ thẳng tầng dưới; mỗi tầng có thang máy và vệ sinh người khuyết tật."]);
    out.push([!has(/lối ra/), "Phòng từ 50 người trở lên có ít nhất 2 lối ra (phòng đa năng có 3)."]);
    R.levels.forEach(M => out.push([M.far <= 30, `${M.k === "t1" ? "Tầng 1" : "Tầng 2"}: đường thoát xa nhất ${nf(M.far, 1)} m tới ${M.k === "t1" ? "cửa ra ngoài" : "thang bộ"} (${M.farRoom}). Mốc tự đặt 30 m, khi làm hồ sơ đối chiếu QCVN 06:2022/BXD.`]));
    if (R.light) { const bad = R.err.filter(e => /^Ánh sáng/.test(e)); out.push([!bad.length, `Ánh sáng tự nhiên: ${R.light.length - new Set(bad.map(e => e.split(" ")[3])).size}/${R.light.length} phòng có người lấy sáng từ cửa sổ hướng Bắc hoặc Nam (sâu tối đa 8 m tính từ cửa sổ) hoặc từ cửa mái răng cưa hướng Bắc ở tầng trên cùng, không bị khối khác che quá 45°; mặt Đông, Tây làm đặc${bad.length ? ". Chưa đạt: " + bad.slice(0, 4).map(e => e.replace(/^Ánh sáng: /, "")).join("; ") + (bad.length > 4 ? `; và ${bad.length - 4} chỗ khác` : "") : ""}.`]); }
    { const bad = R.err.filter(e => /^Tiếng ồn/.test(e)); out.push([!bad.length, `Tách ồn: đọc yên tĩnh cách sự kiện, cà phê, thiếu nhi, học nhóm ≥ 8 m; các phòng đọc khác, văn phòng, phòng nhân viên không chung vách phòng ồn; phòng đa năng, đọc yên tĩnh không chồng tầng với phòng ồn${bad.length ? ". Chưa đạt: " + bad.slice(0, 5).map(e => e.replace(/^Tiếng ồn: /, "")).join("; ") + (bad.length > 5 ? `; và ${bad.length - 5} chỗ khác` : "") : ""}.`]); }
    if (R.eff) { const bad = R.err.filter(e => /^Hiệu quả/.test(e)); out.push([!bad.length, `Đi lại hiệu quả: ${R.eff.rows.map(([t, v, l]) => `${t} ${v == null ? "—" : Math.round(v)}/${l} m`).join(" · ")}; mỗi tầng trên có thang máy nằm trong khu của nó${bad.length ? ". Chưa đạt: " + bad.map(e => e.replace(/^Hiệu quả: /, "")).join("; ") : ""}.`]); }
    { const bad = R.err.filter(e => /^Đón tiếp/.test(e)); out.push([!bad.length, `Đón tiếp là bản lề: khách vào khu sự kiện và vào quầy thư viện đều đi qua sảnh đón tiếp A1 (Hình 1 của đề)${bad.length ? ". Chưa đạt: " + bad.map(e => e.replace(/^Đón tiếp: /, "")).join("; ") : ""}.`]); }
    { const bad = R.err.filter(e => /^Bảo mật sách/.test(e)); out.push([!bad.length, `Bảo mật sách: vào và ra khu đọc đều phải qua quầy thủ thư có cổng từ; không thang nào đưa người từ khu sự kiện hay từ ngoài vào khu đọc; cửa thoát nạn khu đọc có chuông báo${bad.length ? ". Chưa đạt: " + bad.map(e => e.replace(/^Bảo mật sách: /, "")).join("; ") : ""}.`]); }
    out.push([Object.values(R.staff).every(v => v <= 12), `Người trực cùng lúc: ngày thường ${R.staff[1]}, sự kiện ngoài giờ ${R.staff[2]}, cùng hoạt động ${R.staff[3]}, giao nhận ${R.staff[4]} (đề: 12 nhân viên).`]);
    return out;
  }
  function roomTable(plan) {
    const R = plan.__R, rows = [];
    for (const c of Object.keys(DT.target)) {
      const v = R.byCode[c] || 0, t = DT.target[c], p = (v - t) / t * 100, where = plan.levels.flatMap((L, li) => L.rooms.filter(z => z.c === c).map(z => `T${li + 1} ${z.n}`));
      rows.push(`<tr><td><b>${c}</b> ${esc(DT.names[c] || "")}<br><span class="note">${esc(where.join(" · "))}</span></td><td class="num">${t}</td><td class="num">${nf(v, 1)}</td><td class="num ${Math.abs(p) > 10 ? "bad" : ""}">${p >= 0 ? "+" : ""}${nf(p, 0)}%</td><td class="num">${DT.seats[c] ? `${DT.seats[c]} / <b class="${(R.seats[c] || 0) >= DT.seats[c] ? "ok" : "bad"}">${R.seats[c] || 0}</b>` : "–"}</td></tr>`);
    }
    return `<table><thead><tr><th>Mã · không gian · vị trí</th><th class="num">Đề m²</th><th class="num">Vẽ m²</th><th class="num">Lệch</th><th class="num">Chỗ đề / vẽ</th></tr></thead><tbody>${rows.join("")}
      <tr><td>Giao thông chung, thang, sảnh, cầu kính</td><td class="num">780</td><td class="num">${nf(R.circ, 0)}</td><td></td><td></td></tr>
      <tr><td><b>Tổng sàn</b></td><td class="num">≤ 3.000</td><td class="num"><b>${nf(R.total, 0)}</b></td><td></td><td></td></tr></tbody></table>`;
  }
  function staffTable(plan) {
    const all = plan.levels.flatMap((L, i) => (L.staff || []).map(s => ({ ...s, f: "T" + (i + 1) }))).concat((plan.site.staff || []).map(s => ({ ...s, f: "Ngoài nhà" })));
    return `<table><thead><tr><th>Vị trí trực</th><th>Tầng</th>${["1", "2", "3", "4"].map(k => `<th class="num">TH${k}</th>`).join("")}</tr></thead><tbody>${all.map(s => `<tr><td>${esc(s.t)}</td><td>${s.f}</td>${["1", "2", "3", "4"].map(k => `<td class="num">${s.sc.includes(k) ? "●" : ""}</td>`).join("")}</tr>`).join("")}
      <tr><td><b>Tổng</b></td><td></td>${["1", "2", "3", "4"].map(k => `<td class="num"><b>${plan.__R.staff[k]}</b></td>`).join("")}</tr></tbody></table>`;
  }

  /* ---------- khung trang ---------- */
  function build() {
    if (!document.getElementById("p6-style")) { const s = document.createElement("style"); s.id = "p6-style"; s.textContent = CSS; document.head.appendChild(s); }
    host.classList.add("p6");
    // tab khối 3D có thể đã phân tích sớm (trước khi bộ nội thất p5 nạp xong, số chỗ = 0): phân tích lại một lần ở đây
    for (const p of G.CHOT) if (!p.__R || !p.__Rv) { p.__R = P6.analyse(p, DT); p.__Rv = 1; }
    const plan = G.CHOT[ci];
    const KH = G.KHOI || [];
    host.innerHTML = `
${KH.length ? `<details class="p6-khoi"><summary><b>Tìm hiểu 20 khối A1–E6 theo đề</b> · nhiệm vụ, nằm ở đâu, cần gì, nối với khối nào, tránh khối nào</summary>
  <div class="p6-rel">${(G.KHOI_REL || []).map(([h, t]) => `<div><b>${esc(h)}</b><p>${esc(t)}</p></div>`).join("")}</div>
  <div class="p6-tw"><table><thead><tr><th>Mã</th><th>Khối</th><th>Nhiệm vụ</th><th>Nằm ở đâu</th><th>Cần gì</th><th>Nối với</th><th>Tránh</th><th>Ngoài giờ</th></tr></thead><tbody>${KH.map(k => `<tr><td><b>${k.c}</b></td><td>${esc(k.n)}<br><small>${k.m2} m²${k.cho ? " · " + esc(k.cho) : ""}</small></td><td>${esc(k.lam)}</td><td>${esc(k.o)}</td><td>${esc(k.can)}</td><td>${esc(k.noi)}</td><td>${esc(k.tranh)}</td><td>${esc(k.ng)}</td></tr>`).join("")}</tbody></table></div>
</details>` : ""}
<section style="display:grid;gap:10px">
  <p class="eyebrow">Phương án ${plan.code} · phát triển từ ${plan.from} · mặt bằng đầy đủ</p>
  ${G.CHOT.length > 1 ? `<div class="bar"><span class="k">Phương án</span><span class="seg" role="group" aria-label="Phương án chốt">${G.CHOT.map((p, i) => `<button type="button" data-pa="${i}" aria-pressed="${i === ci}">${esc(p.code)} · ${esc(p.name)}</button>`).join("")}</span></div>` : ""}
  <h2>${esc(plan.name)}: mặt bằng, cửa, giao thông, người trực</h2>
  ${plan.intro || ""}
</section>
<section style="display:grid;gap:12px">
  <div class="bar"><span class="k">Bản vẽ</span><span class="seg" role="group" aria-label="Bản vẽ">${[[-1, "Tổng mặt bằng"], ...plan.levels.map((L, i) => [i, L.title.split(" · ")[0]])].map(([i, t]) => `<button type="button" data-lv="${i}" aria-pressed="${i === li}">${t}</button>`).join("")}</span>
    <span class="k" style="margin-left:8px">Hướng</span><span class="seg"><button type="button" data-or="v" aria-pressed="${st.orient === "v"}">Bắc lên trên</button><button type="button" data-or="h" aria-pressed="${st.orient === "h"}">Nằm ngang</button></span></div>
  <div class="bar"><span class="k">Tình huống</span><span class="seg" role="group" aria-label="Tình huống kiểm tra">${SCN.map(([k, t]) => `<button type="button" data-sc="${k}" aria-pressed="${k === sc}">${t}</button>`).join("")}</span></div>
  <div class="bar"><span class="k">Lớp</span>${[["furn", "Nội thất"], ["light", "Cửa sổ Bắc/Nam, vùng tối"], ["dim", "Trục, kích thước"], ["staff", "Người trực"], ["route", "Tuyến đi"], ["lab", "Tên phòng"]].map(([k, t]) => `<label class="ck"><input type="checkbox" data-ly="${k}" ${st[k] ? "checked" : ""}>${t}</label>`).join("")}</div>
  <p class="scn" id="p6-scn"></p>
  <div class="plan"><svg id="p6-svg" role="img" aria-label="Mặt bằng"></svg></div>
  <div class="leg" id="p6-leg"></div>
</section>
<section class="two">
  <div style="display:grid;gap:10px"><h3>Kiểm tra theo đề</h3><ul class="chk" id="p6-chk"></ul>
    <h3>Người trực theo tình huống</h3><div class="sheet scroll">${staffTable(plan)}</div>
    <p class="note">TH1 ngày thường · TH2 sự kiện ngoài giờ · TH3 cùng hoạt động · TH4 giao nhận sách. Đề cho 12 nhân viên toàn công trình, không tính lặp.</p></div>
  <div style="display:grid;gap:10px"><h3>Diện tích và số chỗ so với đề</h3><div class="sheet scroll">${roomTable(plan)}</div>
    <p class="note">Diện tích đo theo tim tường trên mặt bằng; số chỗ đếm từ ghế vẽ thật. Trưng bày và đón tiếp tính sức chứa theo 3 m²/người.</p></div>
</section>
${plan.notes ? `<section style="display:grid;gap:8px"><h3>Giải thích bố trí</h3><ul class="chk">${plan.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul></section>` : ""}`;
    host.querySelector("#p6-chk").innerHTML = checks(plan).map(([ok, t]) => `<li><span class="${ok ? "ok" : "bad"}">${ok ? "Đạt" : "Chưa đạt"}</span> · ${esc(t)}</li>`).join("");
    host.querySelectorAll("[data-pa]").forEach(b => b.addEventListener("click", () => { ci = +b.dataset.pa; li = Math.min(li, G.CHOT[ci].levels.length - 1); build(); }));
    host.querySelectorAll("[data-lv]").forEach(b => b.addEventListener("click", () => { li = +b.dataset.lv; host.querySelectorAll("[data-lv]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    host.querySelectorAll("[data-or]").forEach(b => b.addEventListener("click", () => { st.orient = b.dataset.or; host.querySelectorAll("[data-or]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    host.querySelectorAll("[data-sc]").forEach(b => b.addEventListener("click", () => { sc = b.dataset.sc; host.querySelectorAll("[data-sc]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    host.querySelectorAll("[data-ly]").forEach(c => c.addEventListener("change", () => { st[c.dataset.ly] = c.checked; draw(); }));
    draw();
  }
  function draw() {
    const plan = G.CHOT[ci], svg = host.querySelector("#p6-svg");
    drawLevel(svg, plan, li >= 0 ? plan.levels[li] : null, li);
    host.querySelector("#p6-scn").textContent = SCN.find(s => s[0] === sc)[2];
    const dk = Object.entries(P6.DOORK).map(([k, v]) => `<span><i style="border-color:var(--${v.c});${k === "o" ? "border-top-style:dashed" : ""}"></i>${v.t}</span>`).join("");
    const rt = sc === "0" ? "" : [["rLib", "Người đọc, khách cà phê"], ["rEv", "Khách sự kiện"], ["rBook", "Đường sách"], ["rStaff", "Nhân viên mang sách trả"]].map(([c, t]) => `<span><i style="border-color:var(--${c})"></i>${t}</span>`).join("");
    const fills = `<span><i style="border-color:var(--dTudong);border-top-width:6px"></i>Cửa sổ hướng Bắc/Nam</span><span><i style="border-color:var(--dTudong);border-top-style:dashed"></i>Cửa mái hướng Bắc (răng cưa)</span><span><i class="f" style="background:var(--warn);border-radius:50%;width:8px;height:8px"></i>Chỗ cách cửa sổ quá 8 m</span><span><i class="f" style="border:3px solid var(--dTnbd);background:transparent"></i>Quầy kiểm soát, cổng từ</span><span><i class="f" style="background:var(--cStair)"></i>Thang bộ</span><span><i class="f" style="background:var(--cLift)"></i>Thang bộ + thang máy</span>` + ["A", "B", "C", "D", "E"].map(z => `<span><i class="f" style="background:var(--z${z})"></i>${{ A: "A Đón tiếp", B: "B Đọc", C: "C Kho, nghiệp vụ", D: "D Văn hóa", E: "E Hỗ trợ" }[z]}</span>`).join("") + `<span><i class="f" style="background:var(--zCirc)"></i>Giao thông</span>${sc === "2" ? `<span><i class="f" style="background:repeating-linear-gradient(45deg,var(--ink-2) 0 2px,transparent 2px 5px)"></i>Khu đóng</span>` : ""}<span><i class="f" style="background:var(--rStaff);border-radius:50%"></i>Người trực</span>`;
    host.querySelector("#p6-leg").innerHTML = dk + rt + fills;
  }
  let started = false;
  const start = () => { if (started) return; started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="g9"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="g9"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) draw(); });
})(window.G3);
