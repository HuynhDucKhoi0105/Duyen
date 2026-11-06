/* ================= Tự xếp khối: 20 khối A1–E6 đúng diện tích đề, kéo thả lên khu đất, 2–3 tầng =================
   Bạn tự xếp hình khối; bấm "Lưu cho Claude" để Claude đọc bản xếp (db: xepkhoi/ban-moi-nhat) rồi làm mặt bằng hoàn chỉnh.
   Toạ độ như các mặt bằng khác: x đi về phía Đông (sông), y đi về phía Nam, đơn vị mét.
   Bản 2 (06/11/2026): mặt bằng và 3D cạnh nhau, chọn một bên sáng cả hai; tầng dưới nét đứt; tô chỗ đua quá 4 m và mái lộ;
   tách tầng, cắt 3D theo tầng, bóng đổ, người so tỉ lệ; cột chồng tầng; kéo khối ngay trên 3D; hút mép, canh thẳng hàng có đường dóng.
   Dữ liệu bản xếp giữ nguyên dạng cũ (khóa arc329.xep.v1) nên bản đang xếp dở không mất. */
(function (G) {
  const host = document.getElementById("x10-host");
  if (!host) return;
  const NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const KEY = "arc329.xep.v1", UIKEY = "arc329.xep.ui", SNAP = 0.25, FH = [0, 0.45, 4.95, 9.45], TOP = [0, 4.95, 9.45, 13.95], NF = 3, OH = 4;
  const SITE = { x0: 6, x1: 41.5, y0: 12, y1: 89 }, STAGE_X = 50;
  // bàn nháp cạnh khu đất: đặt vài khối ra xoay, đổi tỉ lệ, tách đôi trước khi kéo vào xếp (không tính vào kiểm tra)
  const DRAFT = { x0: 50, x1: 75, y0: 8, y1: 92 };
  // phòng có người dùng cần cửa sổ Bắc/Nam (góp ý của thầy)
  const LIT = /^(A[1-4]|B[1-6]|C2|D1|D4|E[123])$/, NOISY = /^(D1|D2|D4|A3|B3|B4)$/;

  /* ---------- 20 khối theo đề, kích thước mặc định (phòng cần sáng sâu 8 m, hoặc 12–16 m nếu sáng hai mặt) ---------- */
  const DIM = { A1: [10, 8], A2: [11.25, 8], A3: [8.75, 8], A4: [6, 5], B1: [32.5, 16], B2: [20, 8], B3: [15, 12], B4: [12.5, 8], B5: [12.5, 8], B6: [6.25, 8],
    C1: [12, 10], C2: [8.75, 8], C3: [5, 8], C4: [5, 6], D1: [15, 12], D2: [2.1, 11.9], D3: [4, 5], D4: [9.375, 8], E1: [10, 8], E2: [5, 8], E3: [4, 3.75], E4: [7, 7.86], E6: [4, 5] };
  const KH = (G.KHOI || []).length ? G.KHOI : Object.keys(DIM).map(c => ({ c, n: c, m2: DIM[c][0] * DIM[c][1] }));
  function defaults() {
    const out = [];
    for (const k of KH) {
      if (k.c === "E5") { out.push({ id: "E5a", c: "E5", n: "Vệ sinh công cộng, sự kiện", a: 35, w: 7, h: 5, kind: "room" }, { id: "E5b", c: "E5", n: "Vệ sinh khu đọc", a: 35, w: 7, h: 5, kind: "room" }); continue; }
      const [w, h] = DIM[k.c] || [Math.sqrt(k.m2), Math.sqrt(k.m2)];
      out.push({ id: k.c, c: k.c, n: k.n, a: k.m2, w, h: +(k.m2 / w).toFixed(2), kind: "room" });
    }
    let y = 2;
    for (const z of "ABCDE") {
      let x = STAGE_X, rowH = 0;
      for (const b of out.filter(q => q.c[0] === z)) {
        if (x + b.w > STAGE_X + 64) { x = STAGE_X; y += rowH + 1.5; rowH = 0; }
        b.x = x; b.y = y; b.f = 1; x += b.w + 1.5; rowH = Math.max(rowH, b.h);
      }
      y += rowH + 4;
    }
    return out;
  }
  const HELP = {
    stair: { n: "Thang bộ", w: 3, h: 6, col: "var(--x10Stair)" },
    lift: { n: "Thang bộ + thang máy", w: 5, h: 7, col: "var(--x10Lift)" },
    book: { n: "Lõi sách: thang + máy + tời sách", w: 5, h: 7, col: "var(--x10Lift)" },
    circ: { n: "Sảnh, hành lang", w: 2.4, h: 12, col: "var(--zCirc)" },
    court: { n: "Sân trong (ngoài trời)", w: 10, h: 10, col: "var(--zOut)" }
  };

  /* ---------- trạng thái ---------- */
  let S = load() || { blocks: defaults(), note: "" };
  let sel = null, hover = null, mode = "1", seq = 1, ISS = [], BAD = new Set();
  function load() { try { const t = localStorage.getItem(KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  // cách hiển thị (không phải bản xếp): lưu riêng
  const UI = Object.assign({ under: 0.7, layout: "split", planH2: Math.round(Math.max(620, Math.min(1100, (window.innerHeight || 900) - 70))), explode: 0, cut: true, shadow: true, people: true }, (() => { try { return JSON.parse(localStorage.getItem(UIKEY) || "{}") || {}; } catch (e) { return {}; } })());
  const saveUI = () => { try { localStorage.setItem(UIKEY, JSON.stringify(UI)); } catch (e) { /* bỏ qua */ } };
  // hoàn tác / làm lại
  const UNDO = [], REDO = []; let lastSnap = JSON.stringify(S.blocks), lastPush = 0;
  function keep() {
    const now = JSON.stringify(S.blocks);
    if (now !== lastSnap) { if (Date.now() - lastPush > 600) { UNDO.push(lastSnap); if (UNDO.length > 80) UNDO.shift(); REDO.length = 0; } lastPush = Date.now(); lastSnap = now; }
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* trình duyệt chặn bộ nhớ */ }
    undoBtns();
  }
  function step(from, to) {
    if (!from.length) return;
    to.push(lastSnap); S.blocks = JSON.parse(from.pop()); lastSnap = JSON.stringify(S.blocks); lastPush = 0;
    if (!S.blocks.some(b => b.id === sel)) sel = null;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* như trên */ }
    render(); undoBtns();
  }
  const undo = () => step(UNDO, REDO), redo = () => step(REDO, UNDO);
  function undoBtns() { const u = host.querySelector("#x10-undo"), r = host.querySelector("#x10-redo"); if (u) { u.disabled = !UNDO.length; u.textContent = `↶ Hoàn tác${UNDO.length ? " (" + UNDO.length + ")" : ""}`; } if (r) r.disabled = !REDO.length; }
  const area = b => b.kind === "room" ? b.a : b.w * b.h;
  const onSite = b => b.x < STAGE_X - 2;
  const isFloor = b => b.kind !== "court";
  const col = b => b.kind === "room" ? `var(--z${b.c[0]})` : HELP[b.kind].col;
  const ovl = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const gap = (a, b) => Math.hypot(Math.max(0, Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w)), Math.max(0, Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h)));
  const inside = (o, x, y) => x >= o.x && x <= o.x + o.w && y >= o.y && y <= o.y + o.h;
  const dpt = (o, x, y) => Math.hypot(Math.max(0, o.x - x, x - o.x - o.w), Math.max(0, o.y - y, y - o.y - o.h));
  const label = b => b.kind === "room" ? b.c : HELP[b.kind].n.split(":")[0];
  // diện tích theo đề: mỗi phòng được chỉnh ±10% (đề mục 4), tổng sàn không quá 3.000 m²
  const briefA = c => { const k = KH.find(q => q.c === c); return k ? k.m2 : null; };
  const codeSum = c => S.blocks.filter(o => o.kind === "room" && o.c === c).reduce((t, o) => t + (+o.a || 0), 0);
  const floorTot = () => S.blocks.filter(o => onSite(o) && isFloor(o)).reduce((t, o) => t + o.w * o.h, 0);
  const MAXF = 3000, TOL = 0.10;
  const curF = () => mode === "all" ? null : +mode;
  const CSS_ESC = s => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/"/g, '\\"');
  const raf = (() => { const q = new Map(); return (k, f) => { if (q.has(k)) { q.set(k, f); return; } q.set(k, f); requestAnimationFrame(() => { const g = q.get(k); q.delete(k); g(); }); }; })();

  /* ---------- khung trang ---------- */
  const CSS = `
#x10-host { width: min(1560px, calc(100vw - 40px)); margin-left: calc((100% - min(1560px, calc(100vw - 40px))) / 2); justify-self: start; }
.x10 [hidden] { display: none !important; }
.x10 { display: grid; gap: 12px; --x10Stair: #e08a3c; --x10Lift: #8a6cc7; --x10Guide: #d6338a; --x10Red: #c2412a; --x10Green: #3f8f4f; }
.x10 .bar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.x10 .btn:disabled { opacity: .45; cursor: default; }
.x10 .seg { display: inline-flex; flex-wrap: wrap; gap: 0; }
.x10 .seg button, .x10 .btn { font: inherit; font-size: 13px; padding: 6px 10px; border: 1px solid var(--line); background: var(--sheet); color: var(--ink); border-radius: 8px; cursor: pointer; }
.x10 .seg button { border-radius: 0; margin-left: -1px; } .x10 .seg button:first-child { border-radius: 8px 0 0 8px; } .x10 .seg button:last-child { border-radius: 0 8px 8px 0; }
.x10 .seg button[aria-pressed="true"], .x10 .btn[aria-pressed="true"] { background: var(--accent); color: var(--sheet); border-color: var(--accent); }
.x10 .btn.pri { background: var(--accent); color: var(--sheet); border-color: var(--accent); font-weight: 700; }
.x10 .k { font-size: 12px; color: var(--ink-2); }
.x10 .opt { display: inline-flex; gap: 6px; align-items: center; font-size: 12.5px; color: var(--ink-2); padding: 2px 4px; }
.x10 .opt input[type=range] { width: 110px; }
.x10 .main { display: grid; gap: 12px; align-items: start; grid-template-columns: auto 12px minmax(0, 1fr); grid-template-areas: "stk stk stk" "kho kho kho" "plan dv td" "plan dv sel" "info info info"; grid-template-rows: auto auto auto 1fr auto; }
.x10 .main.l-plan { grid-template-areas: "stk stk stk" "kho kho kho" "plan dv sel" "plan dv sel" "info info info"; }
.x10 .main.l-3d { grid-template-columns: 0 0 minmax(0, 1fr); grid-template-areas: "stk stk stk" "kho kho kho" "td td td" "sel sel sel" "info info info"; }
.x10 .main.l-plan .td, .x10 .main.l-3d .cv, .x10 .main.l-3d .dv { display: none; }
.x10 #x10-sel { grid-area: sel; }
.x10 .info { grid-area: info; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); align-items: start; }
.x10 .cv { position: relative; }
.x10 .cv .ov { position: absolute; display: flex; gap: 4px; align-items: center; }
.x10 .cv .ov.tl { left: 8px; top: 8px; pointer-events: none; font: 800 14px var(--body); background: color-mix(in srgb, var(--sheet) 85%, transparent); border-radius: 8px; padding: 3px 9px; }
.x10 .cv .ov.tr { right: 8px; top: 8px; }
.x10 .cv .ov .btn { padding: 3px 10px; font-size: 15px; line-height: 1.2; }
.x10 svg.plan.panning { cursor: grabbing; }
@media (max-width: 900px) { .x10 .main, .x10 .main.l-plan, .x10 .main.l-3d { grid-template-columns: minmax(0, 1fr); grid-template-areas: "stk" "kho" "plan" "td" "sel" "info"; grid-template-rows: none; } .x10 .dv { display: none; } .x10 svg.plan { width: 100% !important; height: auto !important; } .x10 .main.l-plan .td, .x10 .main.l-3d .cv { display: block; } }
.x10 .cv { grid-area: plan; border: 1px solid var(--line); border-radius: 10px; background: var(--paper); overflow: hidden; min-width: 0; }
.x10 svg.plan { display: block; height: var(--planH, 860px); width: auto; max-width: none; touch-action: none; user-select: none; -webkit-user-select: none; }
.x10 svg.plan.dragging .ovh { display: none; }
.x10 svg.plan g.blk { cursor: grab; }
.x10 svg.plan.dragging, .x10 svg.plan.dragging g.blk { cursor: grabbing; }
.x10 svg.plan g.hv > rect.body { stroke: var(--accent); stroke-width: 5px; }
.x10 .dv { grid-area: dv; align-self: stretch; cursor: col-resize; touch-action: none; display: flex; justify-content: center; min-height: 240px; }
.x10 .dv::before { content: ""; width: 4px; border-radius: 2px; background: var(--line); }
.x10 .dv:hover::before, .x10 .dv:focus-visible::before { background: var(--accent); }
.x10 .td { grid-area: td; position: relative; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--paper); min-width: 0; }
.x10 .td canvas { display: block; width: 100%; touch-action: none; }
.x10 .td .ov { position: absolute; display: flex; gap: 4px; flex-wrap: wrap; }
.x10 .td .ov.tl { left: 8px; top: 8px; right: 70px; }
.x10 .td .ov.tr { right: 8px; top: 8px; flex-direction: column; align-items: stretch; }
.x10 .td .ov .btn { padding: 4px 9px; font-size: 12.5px; opacity: .94; }
.x10 .td .ov.tr .btn { font-size: 15px; line-height: 1; padding: 6px 10px; }
.x10 .td .flv { font: 700 12.5px var(--mono, monospace); text-align: center; background: var(--sheet); border: 1px solid var(--line); border-radius: 8px; padding: 4px 0; }
.x10 .td .hint { position: absolute; left: 8px; bottom: 6px; right: 8px; margin: 0; font-size: 11px; opacity: .8; color: var(--ink-2); pointer-events: none; text-shadow: 0 0 3px var(--paper); }
.x10 .stk { grid-area: stk; display: flex; flex-wrap: wrap; gap: 8px; }
.x10 .stk button { font: inherit; display: flex; gap: 10px; align-items: center; padding: 5px 12px 5px 6px; border: 1px solid var(--line); border-radius: 10px; background: var(--sheet); color: var(--ink); cursor: pointer; text-align: left; min-width: 190px; align-items: flex-end; }
.x10 .stk button[aria-pressed="true"] { border: 2px solid var(--accent); padding: 4px 11px 4px 5px; background: color-mix(in srgb, var(--accent) 8%, var(--sheet)); }
.x10 .stk button svg { height: 190px; width: auto; display: block; flex: none; }
.x10 .stk .cap { font-size: 13px; line-height: 1.35; color: var(--ink-2); }
.x10 .stk .cap b { color: var(--ink); font-size: 17px; }
.x10 .stk .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--x10Red); margin-left: 5px; vertical-align: 2px; }
.x10 .kho { grid-area: kho; border: 1px dashed var(--line); border-radius: 10px; padding: 8px 10px; min-height: 44px; background: color-mix(in srgb, var(--paper) 60%, var(--sheet)); display: grid; gap: 6px; min-width: 0; }
.x10 .kho .row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.x10 .chip { font: inherit; display: inline-flex; gap: 6px; align-items: center; border: 1px solid var(--line); border-radius: 7px; padding: 4px 8px; background: var(--sheet); color: var(--ink); cursor: grab; touch-action: none; font-size: 12.5px; user-select: none; }
.x10 .chip[aria-pressed="true"] { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.x10 .chip i { width: 12px; height: 12px; border: 1px solid var(--ink); display: inline-block; border-radius: 2px; }
.x10 .card { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: var(--sheet); min-width: 0; }
.x10 .card h4 { margin: 0 0 6px; font-size: 14px; }
.x10 .card p { margin: 4px 0; font-size: 13px; }
.x10 .chk { list-style: none; padding: 0; margin: 0; display: grid; gap: 5px; font-size: 12.5px; }
.x10 .chk li { padding-left: 18px; position: relative; }
.x10 .chk li::before { position: absolute; left: 0; font-weight: 800; }
.x10 .chk li.ok::before { content: "✓"; color: var(--accent); }
.x10 .chk li.no::before { content: "!"; color: var(--warn); }
.x10 table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.x10 td, .x10 th { padding: 3px 4px; border-bottom: 1px solid var(--line); text-align: left; }
.x10 td.n, .x10 th.n { text-align: right; font-variant-numeric: tabular-nums; }
.x10 .card input[type=range] { width: 100%; }
.x10 textarea { width: 100%; box-sizing: border-box; font: inherit; font-size: 13px; min-height: 54px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); color: var(--ink); padding: 6px; }
.x10 .st { font-size: 12.5px; color: var(--ink-2); min-height: 1em; }
.x10 .lg { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 12px; color: var(--ink-2); }
.x10 .lg i { display: inline-block; width: 18px; height: 10px; margin-right: 5px; vertical-align: -1px; }
.x10 svg.iso { display: block; width: 100%; height: auto; background: var(--paper); }
.x10 button:focus-visible, .x10 input:focus-visible, .x10 select:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
`;
  function build() {
    if (!document.getElementById("x10-style")) { const s = document.createElement("style"); s.id = "x10-style"; document.head.appendChild(s); }
    document.getElementById("x10-style").textContent = CSS;
    host.innerHTML = `
<section class="x10">
  <div><p class="eyebrow">Tự xếp khối · 20 khối A1–E6 đúng diện tích đề</p>
  <h2>Kéo các khối lên khu đất, xếp 2–3 tầng, rồi gửi cho Claude làm mặt bằng</h2>
  <p class="lede">Chọn tầng ở hàng trên, kéo khối từ kho vào mặt bằng hoặc vào 3D. Mặt bằng: cuộn chuột hoặc ＋/− để phóng to, kéo chỗ trống để di chuyển. Khối tự hút mép, canh thẳng hàng (đường dóng hồng). Sọc đỏ: đua quá 4 m cần cột; sọc xanh: mái tầng dưới còn lộ. Xếp xong bấm <b>Lưu cho Claude</b>.</p></div>
  <div class="bar">
    <button type="button" class="btn" id="x10-undo" title="Ctrl+Z">↶ Hoàn tác</button><button type="button" class="btn" id="x10-redo" title="Ctrl+Y">↷ Làm lại</button>
    <span class="k" style="margin-left:8px">Thêm</span>${Object.entries(HELP).map(([k, v]) => `<button type="button" class="btn" data-add="${k}">+ ${v.n.split(":")[0]}</button>`).join("")}
  </div>
  <div class="bar">
    <span class="k">Hiển thị</span><span class="seg" id="x10-lay">${[["split", "Mặt bằng + 3D"], ["plan", "Chỉ mặt bằng"], ["3d", "Chỉ 3D"]].map(([k, t]) => `<button type="button" data-l="${k}" aria-pressed="${k === UI.layout}">${t}</button>`).join("")}</span>
    <label class="opt" for="x10-under">Độ đậm tầng dưới <input type="range" id="x10-under" min="0.15" max="1" step="0.05" value="${UI.under}"></label>
    <label class="opt" for="x10-exp">Tách tầng <input type="range" id="x10-exp" min="0" max="8" step="0.5" value="${UI.explode}"><b id="x10-expv">${nf(UI.explode, 1)} m</b></label>
    <label class="opt"><input type="checkbox" id="x10-cut" ${UI.cut ? "checked" : ""}> Cắt 3D theo tầng đang xếp</label>
    <label class="opt"><input type="checkbox" id="x10-sh" ${UI.shadow ? "checked" : ""}> Bóng đổ</label>
    <label class="opt"><input type="checkbox" id="x10-pp" ${UI.people ? "checked" : ""}> Người 1,7 m</label>
  </div>
  <div class="lg"><span><i style="border:2px dashed var(--ink-2)"></i>tầng dưới</span><span><i style="border:2px dotted var(--ink)"></i>tầng trên</span><span><i style="background:repeating-linear-gradient(45deg,var(--x10Red) 0 2px,transparent 2px 6px);border:1px solid var(--x10Red)"></i>đua quá 4 m, cần cột</span><span><i style="background:repeating-linear-gradient(45deg,var(--x10Green) 0 2px,transparent 2px 6px);border:1px solid var(--x10Green)"></i>mái lộ: lấy sáng mái, sân thượng</span><span><i style="background:#2f8fd6;height:4px"></i>mặt Bắc/Nam hở lấy sáng</span><span><i style="border-top:2px dashed var(--x10Guide)"></i>đường dóng khi kéo</span></div>
  <div class="main l-${UI.layout}" id="x10-main" style="--planH:${UI.planH2}px">
    <div class="stk" id="x10-stk" aria-label="Chọn tầng đang xếp"></div>
    <div class="kho"><div class="bar"><b style="font-size:13.5px">Kho khối</b><span class="k">kéo vào khu đất, vào 3D, hoặc ra bàn nháp bên phải mặt bằng (bấm đúp một khối để đưa ra bàn nháp)</span></div><div id="x10-kho" class="row"></div></div>
    <div class="cv"><svg class="plan" id="x10-svg" aria-label="Mặt bằng khu đất và các khối"></svg><div class="ov tl" id="x10-pt"></div><div class="ov tr"><button type="button" class="btn" id="x10-zi" title="Phóng to (hoặc cuộn chuột)">＋</button><button type="button" class="btn" id="x10-zo" title="Thu nhỏ">−</button><button type="button" class="btn" id="x10-zf" title="Vừa khung" style="font-size:12.5px">Vừa khung</button></div></div>
    <div class="dv" id="x10-dv" role="separator" aria-label="Kéo để đổi cỡ mặt bằng và 3D" tabindex="0"></div>
    <div class="td">
      <div id="x10-3d" aria-label="Khối 3D: kéo khối để di chuyển, kéo chỗ trống để xoay"></div><svg class="iso" id="x10-iso" hidden></svg>
      <div class="ov tl"><button type="button" class="btn" data-v="l">⟲</button><button type="button" class="btn" data-v="r">⟳</button><button type="button" class="btn" data-v="top">Nhìn từ trên</button><button type="button" class="btn" data-v="0">Góc mặc định</button></div>
      <div class="ov tr"><button type="button" class="btn" id="x10-up" title="Lên tầng trên">▲</button><span class="flv" id="x10-flv"></span><button type="button" class="btn" id="x10-dn" title="Xuống tầng dưới">▼</button></div>
      <p class="hint">Kéo khối để di chuyển · kéo chỗ trống (hoặc giữ Shift) để xoay · cuộn để phóng to · PageUp/PageDown đưa khối lên, xuống tầng</p>
    </div>
    <div class="card" id="x10-sel"></div>
    <div class="info">
      <div class="card"><h4>Kiểm tra nhanh</h4><ul class="chk" id="x10-chk"></ul></div>
      <div class="card"><h4>Diện tích</h4><div id="x10-area"></div></div>
      <div class="card"><h4>Gửi cho Claude</h4>
        <textarea id="x10-note" placeholder="Ghi chú cho Claude (ý tưởng hình khối, chỗ nào bạn muốn giữ)…"></textarea>
        <div class="bar" style="margin-top:6px"><button type="button" class="btn pri" id="x10-save">Lưu cho Claude</button><button type="button" class="btn" id="x10-dl">Tải file</button><label class="btn">Mở file<input type="file" id="x10-open" accept=".json,application/json" hidden></label></div>
        <p class="st" id="x10-st"></p>
        <label class="k" for="x10-from">Bắt đầu từ một ý tưởng có sẵn</label>
        <select id="x10-from" class="btn" style="width:100%"><option value="">Chọn ý tưởng…</option>${(G.CHOT || []).map((p, i) => `<option value="${i}">${esc(p.code)} · ${esc(p.name)}</option>`).join("")}</select>
        <div class="bar" style="margin-top:6px"><button type="button" class="btn" id="x10-reset">Xếp lại từ đầu</button></div>
      </div>
    </div>
  </div>
</section>`;
    T3 = null;
    const $ = s => host.querySelector(s);
    $("#x10-note").value = S.note || "";
    $("#x10-note").addEventListener("input", e => { S.note = e.target.value; keep(); });
    host.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.m)));
    host.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => addHelper(b.dataset.add)));
    host.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => { UI.layout = b.dataset.l; saveUI(); host.querySelectorAll("[data-l]").forEach(q => q.setAttribute("aria-pressed", String(q === b))); $("#x10-main").className = "main l-" + UI.layout; if (UI.layout !== "plan") iso(); }));
    $("#x10-under").addEventListener("input", e => { UI.under = +e.target.value; saveUI(); raf("plan", renderPlan); });
    $("#x10-exp").addEventListener("input", e => { UI.explode = +e.target.value; $("#x10-expv").textContent = nf(UI.explode, 1) + " m"; saveUI(); raf("iso", iso); });
    $("#x10-cut").addEventListener("change", e => { UI.cut = e.target.checked; saveUI(); iso(); });
    $("#x10-sh").addEventListener("change", e => { UI.shadow = e.target.checked; saveUI(); iso(); });
    $("#x10-pp").addEventListener("change", e => { UI.people = e.target.checked; saveUI(); iso(); });
    host.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => { const v = b.dataset.v; if (v === "l") VIEW.yaw -= 45; else if (v === "r") VIEW.yaw += 45; else if (v === "top") VIEW.pitch = 88; else { VIEW.yaw = 35; VIEW.pitch = 32; VIEW.zoom = 1; } T3 ? draw3() : isoSvg(); }));
    $("#x10-up").addEventListener("click", () => setMode(String(mode === "all" ? 1 : Math.min(NF, +mode + 1))));
    $("#x10-dn").addEventListener("click", () => setMode(String(mode === "all" ? 1 : Math.max(1, +mode - 1))));
    $("#x10-save").addEventListener("click", saveForClaude);
    $("#x10-dl").addEventListener("click", download);
    $("#x10-open").addEventListener("change", openFile);
    $("#x10-reset").addEventListener("click", () => { if (!confirm("Xếp lại từ đầu? (Bấm Hoàn tác nếu muốn lấy lại bản đang xếp.)")) return; S = { blocks: defaults(), note: S.note }; sel = null; keep(); render(); });
    $("#x10-from").addEventListener("change", e => { if (e.target.value === "") return; if (confirm("Thay bản đang xếp bằng các khối của ý tưởng này?")) fromPlan(+e.target.value); e.target.value = ""; });
    $("#x10-undo").addEventListener("click", undo);
    $("#x10-redo").addEventListener("click", redo);
    divider($("#x10-dv"));
    planNav();
    if (!window.__x10key) { window.__x10key = 1; document.addEventListener("keydown", onKey); }
    undoBtns();
    render();
  }
  // phóng to, thu nhỏ, kéo chỗ trống để di chuyển mặt bằng
  function planNav() {
    const sv = host.querySelector("#x10-svg");
    host.querySelector("#x10-zi").addEventListener("click", () => zoomAt(0.8));
    host.querySelector("#x10-zo").addEventListener("click", () => zoomAt(1.25));
    host.querySelector("#x10-zf").addEventListener("click", () => { VB = { ...VB0 }; setVB(); });
    sv.addEventListener("wheel", e => { e.preventDefault(); svg = sv; const [x, y] = pt(e); zoomAt(e.deltaY < 0 ? 0.88 : 1.14, x, y); }, { passive: false });
    let pan = null;
    sv.addEventListener("pointerdown", e => { if (e.button > 1 || drag) return; svg = sv; pan = { x: e.clientX, y: e.clientY, vx: VB.x, vy: VB.y, k: VB.w * PX / sv.getBoundingClientRect().width / PX }; sv.setPointerCapture(e.pointerId); sv.classList.add("panning"); if (sel) { sel = null; renderPlan(); sideCard(); hi3d(); } });
    sv.addEventListener("pointermove", e => { if (!pan) return; VB.x = pan.vx - (e.clientX - pan.x) * pan.k; VB.y = pan.vy - (e.clientY - pan.y) * pan.k; setVB(); });
    const end = () => { pan = null; sv.classList.remove("panning"); };
    sv.addEventListener("pointerup", end); sv.addEventListener("pointercancel", end);
  }
  function setMode(m) {
    mode = m;
    host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === m)));
    render();
  }
  // vạch giữa mặt bằng và 3D: kéo sang phải thì mặt bằng to ra
  function divider(dv) {
    let st = null;
    const main = host.querySelector("#x10-main"), set = h => { UI.planH2 = Math.round(Math.max(380, Math.min(1600, h))); main.style.setProperty("--planH", UI.planH2 + "px"); raf("d3", draw3); };
    dv.addEventListener("pointerdown", e => { st = { x: e.clientX, h: UI.planH2 }; dv.setPointerCapture(e.pointerId); e.preventDefault(); });
    dv.addEventListener("pointermove", e => { if (st) set(st.h + (e.clientX - st.x) * VB0.h / VB0.w); });
    const end = () => { if (st) { st = null; saveUI(); } };
    dv.addEventListener("pointerup", end); dv.addEventListener("pointercancel", end);
    dv.addEventListener("keydown", e => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); set(UI.planH2 + (e.key === "ArrowRight" ? 60 : -60)); saveUI(); } });
  }

  /* ---------- vẽ mặt bằng khu đất ---------- */
  const VB0 = { x: -1, y: 6.5, w: 77, h: 86 }, PX = 10;
  let VB = { ...VB0 };
  const setVB = () => { if (svg) svg.setAttribute("viewBox", `${VB.x * PX} ${VB.y * PX} ${VB.w * PX} ${VB.h * PX}`); };
  // phóng to quanh điểm (px, py) theo hệ mét; giữ tỉ lệ khung để mặt bằng không méo
  function zoomAt(k, px, py) {
    const nw = Math.max(12, Math.min(VB0.w * 1.6, VB.w * k)), r = nw / VB.w;
    if (px == null) { px = VB.x + VB.w / 2; py = VB.y + VB.h / 2; }
    VB = { x: px - (px - VB.x) * r, y: py - (py - VB.y) * r, w: nw, h: VB.h * r }; setVB();
  }
  let svg;
  function render() {
    renderPlan(); renderStack(); renderKho(); sideCard(); checksList(ISS); areaTable(); iso();
    const fl = host.querySelector("#x10-flv"); if (fl) fl.textContent = mode === "all" ? "Cả" : "T" + mode;
  }
  // các dải ô 0,5 m thỏa điều kiện test, gộp thành hình chữ nhật
  function runs(b, test, st = 0.5) {
    const out = [], open = new Map();
    for (let y = b.y; y < b.y + b.h - 1e-6; y += st) {
      const yh = Math.min(st, b.y + b.h - y), cy = y + yh / 2, row = [];
      let x0 = null;
      for (let x = b.x; x < b.x + b.w - 1e-6; x += st) {
        const xw = Math.min(st, b.x + b.w - x), t = test(x + xw / 2, cy);
        if (t && x0 === null) x0 = x;
        if (!t && x0 !== null) { row.push([x0, x]); x0 = null; }
      }
      if (x0 !== null) row.push([x0, b.x + b.w]);
      const next = new Map();
      for (const [a, c] of row) { const k = a.toFixed(2) + "|" + c.toFixed(2), r = open.get(k); if (r) { r[3] += yh; next.set(k, r); } else { const n = [a, y, c - a, yh]; out.push(n); next.set(k, n); } }
      open.clear(); for (const [k, v] of next) open.set(k, v);
    }
    return out;
  }
  function renderPlan() {
    svg = host.querySelector("#x10-svg"); if (!svg) return;
    setVB();
    svg.innerHTML = "";
    const R = (x, y, w, h, a, p = svg) => el("rect", { x: x * PX, y: y * PX, width: w * PX, height: h * PX, ...a }, p);
    const T = (s, x, y, a = {}, p = svg) => { const e = el("text", { x: x * PX, y: y * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 17, fill: "var(--ink-2)", "font-family": "var(--body)", "pointer-events": "none", ...a }, p); e.textContent = s; return e; };
    const defs = el("defs", {}, svg);
    const pat = (id, c, w = 1.5, op = 0.35) => { const p = el("pattern", { id, width: 8, height: 8, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs); el("line", { x1: 0, y1: 0, x2: 0, y2: 8, stroke: c, "stroke-width": w, opacity: op }, p); };
    pat("x10h", "var(--ink-2)"); pat("x10r", "var(--x10Red)", 3.2, 0.85); pat("x10g", "var(--x10Green)", 3, 0.75);
    R(0, 0, 41.5, 104, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5 });
    R(0, 0, 6, 104, { fill: "var(--road)" }); T("Lối Tây · xe cứu hỏa, xe giao sách", 3, 52, { transform: `rotate(-90 ${3 * PX} ${52 * PX})` });
    R(6, 0, 35.5, 12, { fill: "var(--pave)" }); T("Quảng trường Bắc", 23.75, 6);
    R(6, 89, 35.5, 15, { fill: "var(--road)" }); T("Bãi xe", 23.75, 96.5);
    R(41.5, 0, 6, 104, { fill: "var(--water)" }); T("Bờ sông · Bạch Đằng", 44.5, 52, { transform: `rotate(90 ${44.5 * PX} ${52 * PX})` });
    for (let x = 6; x <= 41.5; x += 8) el("line", { x1: x * PX, y1: 12 * PX, x2: x * PX, y2: 89 * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    for (let y = 12; y <= 89; y += 8) el("line", { x1: 6 * PX, y1: y * PX, x2: 41.5 * PX, y2: y * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    R(6, 12, 35.5, 77, { fill: "none", stroke: "var(--accent)", "stroke-width": 1.5, "stroke-dasharray": "8 5" });
    T("Vùng xây dựng (lưới cột 8 m)", 23.75, 13.4, { "font-size": 15, fill: "var(--accent)" });
    const nAng = window.ARC_NORTH != null ? window.ARC_NORTH : 20, ng = el("g", { transform: `translate(${44.5 * PX} ${10 * PX}) rotate(${nAng}) scale(1.4)` }, svg);
    el("path", { d: "M0 -16 L8 8 L0 4 L-8 8 Z", fill: "var(--ink)" }, ng); const nt = el("text", { x: 0, y: -22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--ink)" }, ng); nt.textContent = "Bắc";
    const f = curF();
    { const pt = host.querySelector("#x10-pt"); if (pt) pt.textContent = f ? `Đang xếp tầng ${f}` : "Đang xem cả các tầng"; }

    ISS = check(); BAD = new Set(ISS.filter(i => !i.ok).flatMap(i => i.ids || []));
    const P = S.blocks.filter(onSite);
    if (f) {
      // tầng dưới: nét đứt xám (đề xuất 1)
      for (const b of P.filter(b => b.f < f).sort((a, b) => a.f - b.f)) ghost(b, b.f === f - 1 ? UI.under : UI.under * 0.45);
      // mái tầng dưới còn lộ (không có khối tầng này đè lên)
      if (f >= 2) {
        const up = P.filter(o => o.f === f && isFloor(o)), gg = el("g", { class: "ovh", "pointer-events": "none" }, svg);
        for (const L of P.filter(b => b.f === f - 1 && isFloor(b))) {
          const rs = runs(L, (x, y) => !up.some(o => inside(o, x, y)));
          for (const r of rs) R(...r, { fill: "url(#x10g)", stroke: "var(--x10Green)", "stroke-width": 1, opacity: 0.9 }, gg);
          const big = rs.sort((a, b) => b[2] * b[3] - a[2] * a[3])[0];
          if (big && big[2] * big[3] >= 60 && big[2] >= 8) T("mái lộ", big[0] + big[2] / 2, big[1] + big[3] / 2, { "font-size": 15, "font-weight": 700, fill: "var(--x10Green)", class: "halo", stroke: "var(--sheet)", "stroke-width": 4, "paint-order": "stroke" }, gg);
        }
      }
    }
    const cur = f ? P.filter(b => b.f === f) : [...P].sort((a, b) => a.f - b.f);
    for (const b of cur.sort((a, b) => (a.kind === "court") - (b.kind === "court") || a.f - b.f)) drawBlock(b);
    // khối tầng trên: viền chấm
    if (f) for (const b of P.filter(b => b.f > f)) { const g = el("g", { "pointer-events": "none", opacity: 0.6 }, svg); R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--ink)", "stroke-width": 1.6, "stroke-dasharray": "2 5" }, g); if (b.w * b.h >= 30) T(`T${b.f} · ${label(b)}`, b.x + b.w / 2, b.y + 2, { "font-size": 12 }, g); }
    // bàn nháp
    R(DRAFT.x0 - 0.5, DRAFT.y0, DRAFT.x1 - DRAFT.x0 + 1, DRAFT.y1 - DRAFT.y0, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5, "stroke-dasharray": "10 6", rx: 12 });
    T("Bàn nháp", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 2.2, { "font-size": 20, "font-weight": 800, fill: "var(--ink)" });
    T("đặt khối ra đây để chỉnh", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 4.4, { "font-size": 15 });
    T("rồi kéo sang khu đất", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 6.2, { "font-size": 15 });
    for (const b of S.blocks.filter(b => b.draft)) drawBlock(b);
    if (drag && drag.b && !onSite(drag.b) && !drag.b.draft) drawBlock(drag.b); // khối đang kéo từ kho
    el("g", { id: "x10-guides", "pointer-events": "none" }, svg);
    // đưa khối đang chọn lên trên cùng
    const n = sel && svg.querySelector(`[data-id="${CSS_ESC(sel)}"]`); if (n) svg.insertBefore(n, svg.querySelector("#x10-guides"));
  }
  function ghost(b, op) {
    const g = el("g", { "pointer-events": "none", opacity: op }, svg), x = b.x * PX, y = b.y * PX, w = b.w * PX, h = b.h * PX;
    el("rect", { x, y, width: w, height: h, fill: "var(--ink-2)", "fill-opacity": 0.06, stroke: "var(--ink-2)", "stroke-width": 2, "stroke-dasharray": "9 6" }, g);
    if (b.w * b.h >= 20) { const t = el("text", { x: x + 8, y: y + 18, "font-size": 14, fill: "var(--ink-2)", "font-family": "var(--mono, monospace)" }, g); t.textContent = `T${b.f} · ${label(b)}`; }
  }
  function drawBlock(b) {
    const g = el("g", { "data-id": b.id, class: "blk" + (hover === b.id ? " hv" : "") }, svg);
    const x = b.x * PX, y = b.y * PX, w = b.w * PX, h = b.h * PX, bad = BAD.has(b.id);
    el("rect", { class: "body", x, y, width: w, height: h, fill: col(b), opacity: b.kind === "court" ? 0.7 : 0.96, stroke: sel === b.id ? "var(--accent)" : bad ? "var(--warn)" : "var(--ink)", "stroke-width": sel === b.id ? 5 : bad ? 3 : 1.3, "stroke-dasharray": b.kind === "court" ? "6 4" : null }, g);
    if (mode === "all" && b.f >= 2) el("rect", { x, y, width: w, height: h, fill: "url(#x10h)", "pointer-events": "none" }, g);
    if (onSite(b) && b.kind === "room" && LIT.test(b.c)) { const lt = litOf(b); for (const [side, ok] of [["N", lt.N], ["S", lt.S]]) if (ok >= 1.2) el("line", { x1: x + 3, y1: side === "N" ? y + 2 : y + h - 2, x2: x + w - 3, y2: side === "N" ? y + 2 : y + h - 2, stroke: "#2f8fd6", "stroke-width": 4, opacity: 0.8, "pointer-events": "none" }, g); }
    // phần đua quá 4 m so với tầng ngay dưới (đề xuất 1)
    if (onSite(b) && b.f >= 2 && isFloor(b)) {
      const low = S.blocks.filter(o => onSite(o) && o.f === b.f - 1 && isFloor(o));
      const rs = runs(b, (px, py) => !low.some(o => inside(o, px, py)) && (low.length ? Math.min(...low.map(o => dpt(o, px, py))) : 99) > OH);
      if (rs.length) {
        const og = el("g", { class: "ovh", "pointer-events": "none" }, g);
        for (const r of rs) el("rect", { x: r[0] * PX, y: r[1] * PX, width: r[2] * PX, height: r[3] * PX, fill: "url(#x10r)", stroke: "var(--x10Red)", "stroke-width": 1.2 }, og);
        const big = rs.sort((a, c) => c[2] * c[3] - a[2] * a[3])[0];
        const t = el("text", { x: (big[0] + big[2] / 2) * PX, y: (big[1] + big[3] / 2) * PX + (big[3] > 3 ? 14 : 0), "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 15, "font-weight": 800, fill: "var(--x10Red)", stroke: "var(--sheet)", "stroke-width": 4, "paint-order": "stroke" }, og);
        t.textContent = "đua > 4 m: cần cột";
      }
    }
    if (b.w * b.h >= 6) {
      const big = b.w >= 6 && b.h >= 4, t1 = el("text", { x: x + w / 2, y: y + h / 2 - (big ? 9 : 0), "text-anchor": "middle", "dominant-baseline": "middle", "font-size": big ? 24 : 15, "font-weight": 800, fill: "var(--ink)", "pointer-events": "none" }, g);
      t1.textContent = label(b) + (b.f >= 2 && mode === "all" ? " · T" + b.f : "") + (b.top ? " ☀" : "");
      if (big) { const t2 = el("text", { x: x + w / 2, y: y + h / 2 + 13, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 14, fill: "var(--ink-2)", "pointer-events": "none" }, g); t2.textContent = `${nf(area(b), 0)} m² · ${nf(b.w, 1)} × ${nf(b.h, 1)}`; }
    }
    g.addEventListener("pointerdown", e => startDrag(e, b));
    g.addEventListener("pointerenter", () => { if (!drag) setHover(b.id); });
    g.addEventListener("pointerleave", () => { if (!drag) setHover(null); });
  }
  // phần mép Bắc / Nam còn hở (không bị khối cùng tầng áp vào)
  function litOf(b) {
    const same = S.blocks.filter(o => o !== b && onSite(o) && o.f === b.f && isFloor(o));
    const free = side => { const yy = side === "N" ? b.y : b.y + b.h; let cov = 0; for (const o of same) { const oy = side === "N" ? o.y + o.h : o.y; if (Math.abs(oy - yy) < 0.6) cov += Math.max(0, Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x)); } return Math.max(0, b.w - cov); };
    return { N: free("N"), S: free("S") };
  }
  function setHover(id) {
    if (hover === id) return; hover = id;
    if (svg) svg.querySelectorAll("g.blk").forEach(n => n.classList.toggle("hv", n.dataset.id === id));
    hi3d();
  }

  /* ---------- cột chồng tầng (đề xuất 5) ---------- */
  function renderStack() {
    const box = host.querySelector("#x10-stk"); if (!box) return;
    box.innerHTML = "";
    const P = S.blocks.filter(onSite);
    for (const f of [1, 2, 3]) {
      const on = P.filter(b => b.f === f), fl = on.filter(isFloor), a = fl.reduce((t, b) => t + b.w * b.h, 0), err = on.some(b => BAD.has(b.id));
      const bt = document.createElement("button"); bt.type = "button"; bt.setAttribute("aria-pressed", String(mode === String(f))); bt.title = `Xếp tầng ${f}`;
      const s = el("svg", { viewBox: `${4 * PX} ${10 * PX} ${39.5 * PX} ${81 * PX}`, "aria-hidden": "true" }, bt);
      el("rect", { x: 6 * PX, y: 12 * PX, width: 35.5 * PX, height: 77 * PX, fill: "var(--paper)", stroke: "var(--line)", "stroke-width": 6 }, s);
      for (const b of P.filter(b => b.f === f - 1 && isFloor(b))) el("rect", { x: b.x * PX, y: b.y * PX, width: b.w * PX, height: b.h * PX, fill: "none", stroke: "var(--ink-2)", "stroke-width": 5, "stroke-dasharray": "14 10", opacity: 0.6 }, s);
      for (const b of on) el("rect", { x: b.x * PX, y: b.y * PX, width: b.w * PX, height: b.h * PX, fill: col(b), stroke: BAD.has(b.id) ? "var(--x10Red)" : "var(--ink)", "stroke-width": BAD.has(b.id) ? 8 : 3 }, s);
      for (const b of on.filter(b => b.w >= 4.5 && b.h >= 3.5 && b.kind === "room")) { const t = el("text", { x: (b.x + b.w / 2) * PX, y: (b.y + b.h / 2) * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 30, "font-weight": 800, fill: "var(--ink)" }, s); t.textContent = b.c; }
      const c = document.createElement("span"); c.className = "cap";
      c.innerHTML = `<b>Tầng ${f}</b>${err ? '<span class="dot" title="Còn mục cần xem"></span>' : ""}<br>sàn +${nf(FH[f], 2)}<br>${on.length ? `${nf(a)} m² · ${on.length} khối` : "trống"}`;
      bt.appendChild(c);
      bt.addEventListener("click", () => setMode(String(f)));
      box.appendChild(bt);
    }
    const all = document.createElement("button"); all.type = "button"; all.setAttribute("aria-pressed", String(mode === "all"));
    all.innerHTML = `<span class="cap"><b>Cả các tầng</b><br>tổng ${nf(P.filter(isFloor).reduce((t, b) => t + b.w * b.h, 0))} m² sàn<br>tối đa 3.000 m²</span>`;
    all.addEventListener("click", () => setMode("all")); box.appendChild(all);
  }

  /* ---------- kho khối ---------- */
  function renderKho() {
    const box = host.querySelector("#x10-kho"); if (!box) return;
    const st = S.blocks.filter(b => !onSite(b) && !b.draft);
    box.innerHTML = st.length ? "" : `<span class="k">Đã đặt hết khối lên khu đất. Muốn cất khối nào thì kéo nó ra khỏi khu đất (sang bờ sông) hoặc bấm "Cất vào kho".</span>`;
    for (const z of "ABCDE") for (const b of st.filter(q => q.kind === "room" && q.c[0] === z)) {
      const c = document.createElement("button"); c.type = "button"; c.className = "chip"; c.dataset.id = b.id; c.setAttribute("aria-pressed", String(sel === b.id));
      c.title = `${b.n} · ${nf(area(b))} m² · kéo vào khu đất hoặc bàn nháp (bấm đúp: ra bàn nháp)`;
      c.innerHTML = `<i style="background:${col(b)}"></i><b>${esc(label(b))}</b> ${nf(area(b))} m²`;
      c.addEventListener("pointerdown", e => startDrag(e, b));
      c.addEventListener("dblclick", () => { toDraft(b); sel = b.id; keep(); render(); });
      box.appendChild(c);
    }
  }

  /* ---------- hút mép, canh thẳng hàng ---------- */
  // trả về vị trí đã hút và các đường dóng; M là tầm hút (m)
  function snap(b, nx, ny, M) {
    const others = S.blocks.filter(o => o !== b && (onSite(o) || (b.draft && o.draft)));
    let bx = null, by = null;
    const tryX = (d, t, o, w) => { const s = Math.abs(d) + w; if (Math.abs(d) <= M && (!bx || s < bx.s)) bx = { d, t, o, s }; };
    const tryY = (d, t, o, w) => { const s = Math.abs(d) + w; if (Math.abs(d) <= M && (!by || s < by.s)) by = { d, t, o, s }; };
    for (const o of others) {
      const w = o.f === b.f ? 0 : 0.04; // ưu tiên khối cùng tầng, rồi tới khối tầng trên, dưới
      for (const [mine, theirs] of [[nx, o.x], [nx, o.x + o.w], [nx + b.w, o.x], [nx + b.w, o.x + o.w]]) tryX(theirs - mine, theirs, o, w);
      tryX(o.x + o.w / 2 - (nx + b.w / 2), o.x + o.w / 2, o, w + 0.06);
      for (const [mine, theirs] of [[ny, o.y], [ny, o.y + o.h], [ny + b.h, o.y], [ny + b.h, o.y + o.h]]) tryY(theirs - mine, theirs, o, w);
      tryY(o.y + o.h / 2 - (ny + b.h / 2), o.y + o.h / 2, o, w + 0.06);
    }
    for (const v of [SITE.x0, SITE.x1]) { tryX(v - nx, v, null, 0.02); tryX(v - nx - b.w, v, null, 0.02); }
    for (const v of [SITE.y0, SITE.y1]) { tryY(v - ny, v, null, 0.02); tryY(v - ny - b.h, v, null, 0.02); }
    for (let v = 6; v <= 41.5; v += 8) { tryX(v - nx, v, null, 0.12); tryX(v - nx - b.w, v, null, 0.12); }
    for (let v = 12; v <= 89; v += 8) { tryY(v - ny, v, null, 0.12); tryY(v - ny - b.h, v, null, 0.12); }
    const x = bx ? nx + bx.d : Math.round(nx / SNAP) * SNAP, y = by ? ny + by.d : Math.round(ny / SNAP) * SNAP, gs = [];
    if (bx) { const o = bx.o || { y: SITE.y0, h: SITE.y1 - SITE.y0 }; gs.push({ x1: bx.t, x2: bx.t, y1: Math.min(y, o.y) - 1.5, y2: Math.max(y + b.h, o.y + o.h) + 1.5 }); }
    if (by) { const o = by.o || { x: SITE.x0, w: SITE.x1 - SITE.x0 }; gs.push({ y1: by.t, y2: by.t, x1: Math.min(x, o.x) - 1.5, x2: Math.max(x + b.w, o.x + o.w) + 1.5 }); }
    return { x: +x.toFixed(3), y: +y.toFixed(3), g: gs };
  }
  function drawGuides(gs) {
    const g = svg && svg.querySelector("#x10-guides"); if (!g) return;
    g.innerHTML = "";
    for (const q of gs) el("line", { x1: q.x1 * PX, y1: q.y1 * PX, x2: q.x2 * PX, y2: q.y2 * PX, stroke: "var(--x10Guide)", "stroke-width": 2.5, "stroke-dasharray": "8 5" }, g);
  }
  // thả xuống mà lấn khối cùng tầng ít (≤ 2,5 m): đẩy ra cho vừa khít
  function settle(b) {
    if (!isFloor(b)) return;
    for (let it = 0; it < 4; it++) {
      const o = S.blocks.find(o => o !== b && onSite(o) && isFloor(o) && o.f === b.f && ovl(o, b) > 0.05); if (!o) return;
      const c = [[o.x - (b.x + b.w), 0], [o.x + o.w - b.x, 0], [0, o.y - (b.y + b.h)], [0, o.y + o.h - b.y]].sort((p, q) => Math.abs(p[0] + p[1]) - Math.abs(q[0] + q[1]))[0];
      if (Math.abs(c[0] + c[1]) > 2.5) return;
      b.x = +(b.x + c[0]).toFixed(3); b.y = +(b.y + c[1]).toFixed(3);
    }
  }
  // đưa khối về kho
  function toStage(b) {
    b.f = 1; delete b.draft;
    const inStage = S.blocks.filter(o => o !== b && !onSite(o));
    for (let y = 1; y < 104; y += 0.5) for (let x = STAGE_X; x + b.w <= STAGE_X + 64; x += 0.5) {
      const t = { x, y, w: b.w, h: b.h };
      if (!inStage.some(o => ovl(t, { x: o.x - 0.6, y: o.y - 0.6, w: o.w + 1.2, h: o.h + 1.2 }) > 0)) { b.x = x; b.y = y; return; }
    }
    b.x = STAGE_X; b.y = 100;
  }
  // đưa khối ra bàn nháp vào chỗ trống
  function toDraft(b) {
    const on = S.blocks.filter(o => o !== b && o.draft);
    for (let y = DRAFT.y0 + 7; y + b.h <= DRAFT.y1; y += 0.5) for (let x = DRAFT.x0; x + Math.min(b.w, 25) <= DRAFT.x1 + 0.01; x += 0.5) {
      const t = { x, y, w: b.w, h: b.h };
      if (!on.some(o => ovl(t, { x: o.x - 1, y: o.y - 1, w: o.w + 2, h: o.h + 2 }) > 0)) { b.x = x; b.y = y; b.draft = true; return; }
    }
    b.x = DRAFT.x0; b.y = DRAFT.y0 + 7; b.draft = true;
  }
  // thả khối: ra ngoài khu đất thì cất vào kho, còn lại giữ trong khu đất và đẩy khít
  function drop(b, wasStage) {
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    if (cx > DRAFT.x0 - 2 && cx < DRAFT.x1 + 4 && cy > -6 && cy < 110) {
      b.draft = true; b.x = b.w > DRAFT.x1 - DRAFT.x0 ? DRAFT.x0 : Math.max(DRAFT.x0, Math.min(DRAFT.x1 - b.w, b.x)); b.y = Math.max(DRAFT.y0 + 7, Math.min(DRAFT.y1 - b.h, b.y));
      b.x = +b.x.toFixed(2); b.y = +b.y.toFixed(2); return;
    }
    if (b.draft) { delete b.draft; b.f = mode === "all" ? 1 : +mode; }
    if (b.x > 46 || b.x + b.w > 53 || b.y > 106 || b.y + b.h < -4 || b.x + b.w < -6) { toStage(b); return; }
    b.x = Math.max(0, Math.min(41.5 - b.w, b.x)); b.y = Math.max(0, Math.min(104 - b.h, b.y));
    settle(b);
    b.x = +b.x.toFixed(2); b.y = +b.y.toFixed(2);
  }

  /* ---------- kéo thả trên mặt bằng ---------- */
  let drag = null;
  function pt(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [q.x / PX, q.y / PX]; }
  function startDrag(e, b) {
    if (e.button > 0) return;
    e.preventDefault(); e.stopPropagation();
    if (!svg) return;
    const wasStage = !onSite(b) && !b.draft, o0 = { x: b.x, y: b.y, f: b.f };
    sel = b.id;
    let [mx, my] = pt(e);
    if (wasStage) { b.f = mode === "all" ? 1 : +mode; }
    const d = drag = { b, wasStage, o0, sx: e.clientX, sy: e.clientY, moved: false, dx: wasStage ? b.w / 2 : mx - b.x, dy: wasStage ? b.h / 2 : my - b.y, node: null, bx: 0, by: 0 };
    if (!wasStage) { renderPlan(); sideCard(); hi3d(); d.node = svg.querySelector(`[data-id="${CSS_ESC(b.id)}"]`); d.bx = b.x; d.by = b.y; svg.classList.add("dragging"); }
    else host.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.id === b.id)));
    const ppm = () => svg.getScreenCTM().a * PX;
    const move = ev => {
      if (!drag) return;
      if (!d.moved && Math.hypot(ev.clientX - d.sx, ev.clientY - d.sy) < 3) return;
      if (!d.moved) {
        d.moved = true;
        if (wasStage) { // khối từ kho: đặt vào mặt bằng ngay dưới con trỏ
          const [x, y] = pt(ev); b.x = x - d.dx; b.y = y - d.dy; renderPlan(); renderKho(); iso();
          d.node = svg.querySelector(`[data-id="${CSS_ESC(b.id)}"]`); d.bx = b.x; d.by = b.y; svg.classList.add("dragging");
        }
      }
      const [x, y] = pt(ev), s = snap(b, x - d.dx, y - d.dy, Math.max(0.3, Math.min(1.6, 10 / ppm())));
      b.x = s.x; b.y = s.y;
      if (d.node) d.node.setAttribute("transform", `translate(${(b.x - d.bx) * PX} ${(b.y - d.by) * PX})`);
      drawGuides(s.g); move3d(b);
    };
    const up = () => {
      if (!drag) return; drag = null;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      svg.classList.remove("dragging"); drawGuides([]);
      if (!d.moved) { if (wasStage) Object.assign(b, o0); render(); return; } // chỉ bấm chọn
      drop(b, wasStage); keep(); render();
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    if (wasStage) sideCard();
  }

  function onKey(e) {
    const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "");
    if (!host.offsetParent || typing) return;
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); redo(); return; }
      return;
    }
    if (!sel) return;
    const b = S.blocks.find(q => q.id === sel); if (!b) return;
    if ((e.key === "PageUp" || e.key === "PageDown") && onSite(b) && b.kind !== "court") {
      e.preventDefault(); const nfl = Math.max(1, Math.min(NF, b.f + (e.key === "PageUp" ? 1 : -1))); if (nfl === b.f) return;
      b.f = nfl; keep(); if (mode !== "all") { mode = String(nfl); host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === mode))); } render(); return;
    }
    const st = e.shiftKey ? 4 : 0.5, mv = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
    if (mv && !(document.activeElement && document.activeElement.id === "x10-dv")) { e.preventDefault(); b.x += mv[0]; b.y += mv[1]; keep(); render(); }
    else if (e.key === "r" || e.key === "R") { rotate(b); }
  }

  /* ---------- thao tác trên khối đang chọn ---------- */
  function rotate(b) { const cx = b.x + b.w / 2, cy = b.y + b.h / 2; [b.w, b.h] = [b.h, b.w]; b.x = Math.round((cx - b.w / 2) / SNAP) * SNAP; b.y = Math.round((cy - b.h / 2) / SNAP) * SNAP; keep(); render(); }
  function setW(b, w) { if (b.kind === "room") { b.w = +w; b.h = +(b.a / b.w).toFixed(2); } else b.w = +w; keep(); raf("all", render); }
  // giới hạn diện tích cho một khối: cả nhóm phần cùng mã trong ±10% đề; khối đang ở khu đất thì không cho tổng sàn vượt 3.000 m²
  function aLim(b) {
    const T = briefA(b.c), sum = codeSum(b.c), room3000 = onSite(b) ? MAXF - floorTot() : Infinity;
    const lo = Math.max(1, b.a - (sum - (1 - TOL) * T)), hi = Math.max(b.a, b.a + Math.min((1 + TOL) * T - sum, room3000));
    return { T, sum, lo: Math.min(lo, b.a), hi, cap: room3000 };
  }
  function areaCtl(b) {
    const L = aLim(b), dev = (L.sum - L.T) / L.T * 100, n = parts(b).length + (S.blocks.filter(o => o.kind === "room" && o.c === b.c).length - parts(b).length);
    return `<label class="k" for="x10-a">Diện tích phòng (đề cho chỉnh ±10%)</label><input type="range" id="x10-a" min="${L.lo.toFixed(1)}" max="${L.hi.toFixed(1)}" step="0.5" value="${b.a}">
<p class="k">${esc(b.c)}: ${n > 1 ? `tổng ${n} phần ${nf(L.sum, 1)}` : nf(L.sum, 1)} m² · đề ${nf(L.T)} m² (<b style="color:${Math.abs(dev) > 10.05 ? "var(--warn)" : "var(--accent)"}">${dev >= 0 ? "+" : ""}${nf(dev, 1)}%</b>) · cho phép ${nf((1 - TOL) * L.T, 1)}–${nf((1 + TOL) * L.T, 1)} m²${L.cap < 1 ? `<br><b style="color:var(--warn)">Tổng sàn đã chạm 3.000 m²: không tăng thêm được, muốn tăng phải giảm phòng khác.</b>` : L.cap < 40 ? `<br>Tổng sàn còn ${nf(L.cap, 1)} m² tới mức 3.000 m².` : ""}. Kéo thanh thì chiều sâu Bắc – Nam giữ nguyên, chiều rộng đổi theo.</p>`;
  }
  function setA(b, v) {
    const L = aLim(b), a = Math.max(L.lo, Math.min(L.hi, v));
    b.a = +a.toFixed(2); b.w = +(b.a / b.h).toFixed(2); keep(); raf("all", render);
  }
  function split(b) {
    const half = { ...b, id: root(b) + "·" + Date.now().toString(36).slice(-3) + (seq++), a: b.a / 2 };
    b.a = b.a / 2;
    if (b.w >= b.h) { b.w = +(b.w / 2).toFixed(2); half.w = b.w; half.x = b.x + b.w + 1; } else { b.h = +(b.h / 2).toFixed(2); half.h = b.h; half.y = b.y + b.h + 1; }
    S.blocks.push(half); sel = half.id; keep(); render();
  }
  const root = b => String(b.id).split("·")[0];
  const parts = b => b.kind === "room" ? S.blocks.filter(o => o.kind === "room" && o.c === b.c && root(o) === root(b)) : [b];
  function merge(b) {
    const ps = parts(b); if (ps.length < 2) return;
    const a = ps.reduce((t, o) => t + o.a, 0), h = b.h <= 8.01 ? b.h : Math.min(16, b.h);
    b.a = +a.toFixed(2); b.h = h; b.w = +(a / h).toFixed(2); b.id = root(b);
    S.blocks = S.blocks.filter(o => o === b || !ps.includes(o));
    sel = b.id; keep(); render();
  }
  function addHelper(k) {
    const h = HELP[k], id = k + "·" + Date.now().toString(36).slice(-4) + (seq++);
    S.blocks.push({ id, c: k === "court" ? "SAN" : k === "circ" ? "circ" : "core", n: h.n, kind: k, w: h.w, h: h.h, x: 8, y: 14, f: mode === "all" ? 1 : +mode, a: null });
    sel = id; keep(); render();
  }
  function sideCard() {
    const box = host.querySelector("#x10-sel"), b = S.blocks.find(q => q.id === sel);
    if (!box) return;
    if (!b) { box.innerHTML = `<h4>Chọn một khối</h4><p>Bấm vào khối trên mặt bằng hoặc trên 3D để xem và chỉnh. Phím mũi tên dịch 0,5 m (giữ Shift: 4 m), R xoay, PageUp/PageDown lên, xuống tầng.</p>`; return; }
    const k = (G.KHOI || []).find(q => q.c === b.c), room = b.kind === "room", a = area(b);
    const wMin = room ? Math.max(2, +(b.a / 40).toFixed(1)) : 1.5, wMax = room ? Math.min(42, +(b.a / 2).toFixed(1)) : 40;
    box.innerHTML = `<h4>${esc(label(b))} · ${esc(b.n)}</h4>
<p>${nf(a, 1)} m² · rộng Đông – Tây <b>${nf(b.w, 2)} m</b> × sâu Bắc – Nam <b>${nf(b.h, 2)} m</b>${onSite(b) ? ` · tầng ${b.f}` : b.draft ? " · đang ở bàn nháp" : " · đang ở kho"}</p>
${room && briefA(b.c) ? areaCtl(b) : ""}
${room && LIT.test(b.c) ? `<p>${b.h <= 8 ? "Sâu ≤ 8 m: một mặt Bắc hoặc Nam là đủ sáng." : b.h <= 16 ? "Sâu 8–16 m: cần hở cả mặt Bắc và mặt Nam." : "Sâu quá 16 m: giữa phòng sẽ tối, nên đổi tỉ lệ hoặc tách đôi."}</p>` : ""}
${k ? `<p style="color:var(--ink-2)">Nối với: ${esc(k.noi)}<br>Tránh: ${esc(k.tranh)}</p>` : ""}
<label class="k" for="x10-w">${room ? "Đổi tỉ lệ (diện tích giữ nguyên)" : "Rộng Đông – Tây"}</label><input type="range" id="x10-w" min="${wMin}" max="${wMax}" step="0.25" value="${b.w}">
${room ? "" : `<label class="k" for="x10-h">Sâu Bắc – Nam</label><input type="range" id="x10-h" min="1.5" max="40" step="0.25" value="${b.h}">`}
<div class="bar" style="margin-top:6px">
  <button type="button" class="btn" id="x10-rot">Xoay 90°</button>
  ${room ? `<button type="button" class="btn" id="x10-d8">Sâu 8 m</button>` : ""}
  ${b.kind !== "court" ? `<span class="seg">${[1, 2, 3].map(f => `<button type="button" data-f="${f}" aria-pressed="${b.f === f}">Tầng ${f}</button>`).join("")}</span>` : ""}
  ${room && b.a >= 30 ? `<button type="button" class="btn" id="x10-split">Tách đôi</button>` : ""}
  ${room && parts(b).length > 1 ? `<button type="button" class="btn" id="x10-merge">Gộp lại (${parts(b).length} phần)</button>` : ""}
  ${room && LIT.test(b.c) ? `<button type="button" class="btn" id="x10-top" aria-pressed="${!!b.top}">${b.top ? "✓ " : ""}Lấy sáng mái hướng Bắc</button>` : ""}
  ${room ? (onSite(b) || b.draft ? `<button type="button" class="btn" id="x10-back">Cất vào kho</button>` : `<button type="button" class="btn" id="x10-todraft">Đưa ra bàn nháp</button>`) : `<button type="button" class="btn" id="x10-del">Xóa</button>`}
</div>`;
    box.querySelector("#x10-w").addEventListener("input", e => setW(b, e.target.value));
    const ar = box.querySelector("#x10-a"); if (ar) ar.addEventListener("input", e => setA(b, +e.target.value));
    const hh = box.querySelector("#x10-h"); if (hh) hh.addEventListener("input", e => { b.h = +e.target.value; keep(); raf("all", render); });
    box.querySelector("#x10-rot").addEventListener("click", () => rotate(b));
    const d8 = box.querySelector("#x10-d8"); if (d8) d8.addEventListener("click", () => { b.h = 8; b.w = +(b.a / 8).toFixed(2); keep(); render(); });
    box.querySelectorAll("[data-f]").forEach(q => q.addEventListener("click", () => { b.f = +q.dataset.f; keep(); if (mode !== "all" && onSite(b)) { mode = String(b.f); host.querySelectorAll("[data-m]").forEach(p => p.setAttribute("aria-pressed", String(p.dataset.m === mode))); } render(); }));
    const tp = box.querySelector("#x10-top"); if (tp) tp.addEventListener("click", () => { b.top = !b.top; keep(); render(); });
    const mg = box.querySelector("#x10-merge"); if (mg) mg.addEventListener("click", () => merge(b));
    const sp = box.querySelector("#x10-split"); if (sp) sp.addEventListener("click", () => split(b));
    const bk = box.querySelector("#x10-back"); if (bk) bk.addEventListener("click", () => { toStage(b); keep(); render(); });
    const td = box.querySelector("#x10-todraft"); if (td) td.addEventListener("click", () => { toDraft(b); keep(); render(); });
    const dl = box.querySelector("#x10-del"); if (dl) dl.addEventListener("click", () => { S.blocks = S.blocks.filter(q => q !== b); sel = null; keep(); render(); });
  }

  /* ---------- kiểm tra nhanh (gợi ý; kiểm tra đầy đủ làm khi Claude dựng mặt bằng) ---------- */
  function check() {
    const P = S.blocks.filter(onSite), out = [], rooms = P.filter(b => b.kind === "room");
    const add = (ok, t, ids) => out.push({ ok, t, ids });
    const placed = new Set(rooms.map(b => b.c)), all = new Set(S.blocks.filter(b => b.kind === "room").map(b => b.c));
    add(placed.size === all.size, `Đã đặt ${placed.size}/${all.size} loại khối lên khu đất`);
    { const offA = [...new Set(S.blocks.filter(b => b.kind === "room" && briefA(b.c)).map(b => b.c))].filter(c => Math.abs(codeSum(c) / briefA(c) - 1) > TOL + 0.005);
      add(!offA.length, offA.length ? `Diện tích lệch quá ±10% so với đề: ${offA.map(c => `${c} ${nf(codeSum(c))}/${nf(briefA(c))} m²`).join(", ")}` : "Diện tích từng phòng trong ±10% đề", S.blocks.filter(b => offA.includes(b.c)).map(b => b.id));
      const tf = floorTot(); add(tf <= MAXF + 0.5, `Tổng sàn ${nf(tf)} m² ${tf <= MAXF + 0.5 ? "≤" : ">"} 3.000 m²`); }
    const fl = P.filter(isFloor), ov = [];
    for (let i = 0; i < fl.length; i++) for (let j = i + 1; j < fl.length; j++) if (fl[i].f === fl[j].f && ovl(fl[i], fl[j]) > 0.3) ov.push([fl[i], fl[j]]);
    add(!ov.length, ov.length ? `Khối chồng lên nhau: ${ov.slice(0, 4).map(([a, b]) => `${label(a)} – ${label(b)}`).join(", ")}` : "Không có khối chồng lên nhau", ov.flat().map(b => b.id));
    const outB = P.filter(b => b.kind !== "court" && (b.x < SITE.x0 - 0.01 || b.y < SITE.y0 - 0.01 || b.x + b.w > SITE.x1 + 0.01 || b.y + b.h > SITE.y1 + 0.01));
    add(!outB.length, outB.length ? `Khối lấn ra lối Tây, quảng trường, bãi xe hoặc bờ sông: ${outB.map(label).join(", ")}` : "Mọi khối nằm trong vùng xây dựng", outB.map(b => b.id));
    // tầng trên phải có chỗ đỡ: phần cách mép khối tầng dưới quá 4 m là đua cần cột
    for (const b of fl.filter(b => b.f >= 2)) {
      const low = fl.filter(o => o.f === b.f - 1), rs = runs(b, (x, y) => !low.some(o => inside(o, x, y)) && (low.length ? Math.min(...low.map(o => dpt(o, x, y))) : 99) > OH), bad = rs.reduce((t, r) => t + r[2] * r[3], 0);
      const hang = b.w * b.h - low.reduce((s, o) => s + ovl(b, o), 0);
      if (hang > 0.5) add(bad < 0.5, bad < 0.5 ? `${label(b)} tầng ${b.f} đua ra ngoài tầng ${b.f - 1} không quá 4 m` : `${label(b)} tầng ${b.f} có ${nf(bad)} m² đua quá 4 m: cần cột chống (sọc đỏ)`, bad >= 0.5 ? [b.id] : []);
    }
    const dark = [];
    const roofOk = b => b.top && !P.some(o => o !== b && isFloor(o) && o.f > b.f && ovl(o, b) > 2);
    for (const b of rooms.filter(b => LIT.test(b.c))) { const l = litOf(b); const ok = roofOk(b) || (b.h <= 8.6 && (l.N >= 1.2 || l.S >= 1.2)) || (b.h <= 16.6 && l.N >= 1.2 && l.S >= 1.2); if (!ok) dark.push(b); }
    add(!dark.length, dark.length ? `Phòng có thể bị bí (thiếu mặt Bắc/Nam hở hoặc quá sâu): ${dark.map(label).join(", ")}` : "Phòng có người dùng đều có mặt Bắc hoặc Nam hở, sâu hợp lý", dark.map(b => b.id));
    const covered = P.filter(b => b.top && P.some(o => o !== b && isFloor(o) && o.f > b.f && ovl(o, b) > 2));
    if (covered.length) add(false, `Lấy sáng mái nhưng tầng trên đè lên (mái không lộ): ${covered.map(label).join(", ")}`, covered.map(b => b.id));
    const shade = [];
    for (const b of rooms.filter(b => LIT.test(b.c) && !roofOk(b))) for (const side of ["N", "S"]) {
      if (litOf(b)[side] < 1.2) continue;
      const sill = FH[b.f] + 1.2;
      for (const o of P.filter(o => o !== b && isFloor(o) && o.kind !== "circ" && Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x) > 3)) {
        const d = side === "N" ? b.y - (o.y + o.h) : o.y - (b.y + b.h); if (d <= 0.6 || d > 30) continue;
        const top = TOP[Math.max(o.f, ...fl.filter(q => ovl(q, o) > 1).map(q => q.f))];
        if (top - sill > d) { shade.push(b); break; }
      }
    }
    add(!shade.length, shade.length ? `Cửa sổ bị khối đối diện che quá 45° (sân quá hẹp): ${[...new Set(shade)].map(label).join(", ")}` : "Không khối nào che sáng khối khác quá 45°", shade.map(b => b.id));
    const noise = [];
    for (const q of rooms.filter(b => b.c === "B2")) for (const o of rooms.filter(b => NOISY.test(b.c) && b.f === q.f)) if (gap(q, o) < 8) noise.push(`B2 cách ${o.c} chỉ ${nf(gap(q, o), 1)} m`);
    for (const q of rooms.filter(b => /^(B1|B5|B6|E1|E2)$/.test(b.c))) for (const o of rooms.filter(b => NOISY.test(b.c) && b.f === q.f)) if (gap(q, o) < 0.6) noise.push(`${q.c} sát vách ${o.c}`);
    const RD = /^(B1|B2|B5|B6)$/;
    for (const a of rooms) for (const o of rooms.filter(o => o.f === a.f + 1 && ovl(a, o) > 4)) {
      const pr = (NOISY.test(a.c) && RD.test(o.c)) || (NOISY.test(o.c) && RD.test(a.c));
      if (pr && (/^(D1|D2|B2)$/.test(a.c) || /^(D1|D2|B2)$/.test(o.c))) noise.push(`${o.c} tầng ${o.f} chồng lên ${a.c}`);
      if ((/^E[12]$/.test(a.c) && /^(D1|D2|B3|B4|A3)$/.test(o.c)) || (/^E[12]$/.test(o.c) && /^(D1|D2|B3|B4|A3)$/.test(a.c))) noise.push(`${o.c} tầng ${o.f} chồng lên ${a.c}`);
    }
    add(!noise.length, noise.length ? `Tiếng ồn: ${[...new Set(noise)].slice(0, 6).join("; ")}` : "Đọc yên tĩnh xa nguồn ồn; phòng đọc, văn phòng không sát vách phòng ồn");
    const by = c => rooms.filter(b => b.c === c), near = (c1, c2, d, t, anyFloor) => { const A = by(c1), B = by(c2); if (!A.length || !B.length) return; const m = Math.min(...A.flatMap(a => B.map(b => a.f === b.f || anyFloor ? gap(a, b) : 99))); add(m <= d, `${t}: ${m >= 99 ? "khác tầng" : nf(m, 1) + " m"} (nên ≤ ${d} m)`, m > d ? [...A, ...B].map(b => b.id) : []); };
    near("A1", "A4", 10, "Sảnh đón tiếp A1 gần quầy giữ đồ A4");
    near("A4", "C2", 10, "Quầy A4 gần xử lý C2 (sách trả)");
    near("C4", "C2", 6, "Tiếp nhận C4 sát xử lý C2");
    near("C2", "C1", 6, "Xử lý C2 sát kho đóng C1");
    near("A1", "D1", 12, "Sảnh A1 gần phòng đa năng D1 (đo trên mặt bằng, kể cả khác tầng)", true);
    near("D1", "D2", 0.6, "Bục D2 liền phòng đa năng D1");
    near("D1", "D3", 0.6, "Kho ghế D3 liền D1");
    { const c4 = by("C4")[0]; if (c4) add(c4.x <= SITE.x0 + 0.6 && c4.f === 1, "Tiếp nhận C4 ở tầng 1, áp lối Tây (cửa cuốn cho xe sách)", [c4.id]); }
    { const b3 = by("B3")[0]; if (b3) add(b3.f === 1, "Thiếu nhi B3 ở tầng 1 (xe đẩy, sân vườn)", [b3.id]); }
    const st = P.filter(b => /stair|lift|book/.test(b.kind)), top = Math.max(1, ...P.filter(isFloor).map(b => b.f)), up = top >= 2;
    for (let f = 2; f <= top; f++) { const pair = st.filter(a => a.f === f - 1 && st.some(o => o.f === f && ovl(a, o) > 0.6 * a.w * a.h)); add(pair.length >= 2 && pair.some(b => b.kind !== "stair"), `Thang thẳng hàng tầng ${f - 1} – tầng ${f}: ${pair.length} (cần ít nhất 2, trong đó có thang máy)`); }
    if (up) { const bk = st.filter(b => b.kind === "book"); add(bk.length > 0 && by("C1").some(c => bk.some(k => k.f === c.f && gap(k, c) < 1)), "Lõi sách (có tời) đặt sát kho đóng C1"); }
    return out;
  }
  function checksList(issues) { const u = host.querySelector("#x10-chk"); if (!u) return; u.innerHTML = issues.map(i => `<li class="${i.ok ? "ok" : "no"}">${esc(i.t)}</li>`).join(""); }
  function areaTable() {
    const box = host.querySelector("#x10-area"); if (!box) return;
    const P = S.blocks.filter(onSite).filter(isFloor), f = n => P.filter(b => b.f === n).reduce((s, b) => s + b.w * b.h, 0);
    const z = c => P.filter(b => b.kind === "room" && b.c[0] === c).reduce((s, b) => s + area(b), 0), brief = { A: 270, B: 1110, C: 260, D: 300, E: 280 };
    const tot = [1, 2, 3].reduce((t, n) => t + f(n), 0);
    box.innerHTML = `<table><tr><th>Nhóm</th><th class="n">Đã đặt</th><th class="n">Đề</th></tr>${Object.keys(brief).map(c => `<tr><td>${c}</td><td class="n">${nf(z(c))}</td><td class="n">${nf(brief[c])}</td></tr>`).join("")}
${[1, 2, 3].filter(n => n === 1 || f(n) > 0).map(n => `<tr><td>Tầng ${n} (sàn)</td><td class="n">${nf(f(n))}</td><td></td></tr>`).join("")}
<tr><td><b>Tổng sàn</b></td><td class="n"><b style="color:${tot > 3000 ? "var(--warn)" : "inherit"}">${nf(tot)}</b></td><td class="n">≤ 3.000</td></tr></table>
<p class="st">Tổng sàn tính cả thang, sảnh, hành lang đã thêm; còn khoảng ${nf(Math.max(0, 3000 - tot))} m² cho giao thông chung và tường.</p>`;
  }

  /* ---------- khối 3D dự phòng bằng SVG (khi trình duyệt không chạy được WebGL) ---------- */
  const VIEW = { yaw: 35, pitch: 32, zoom: 1 };
  function isoSvg() {
    const s = host.querySelector("#x10-iso"); if (!s) return; s.hidden = false; s.innerHTML = "";
    const cx = 24, cy = 52, yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, cs = Math.cos(yr), sn = Math.sin(yr), sp = Math.sin(pr), cp = Math.cos(pr), K = 9 * VIEW.zoom;
    const rot = (x, y) => { const dx = x - cx, dy = y - cy; return [dx * cs - dy * sn, dx * sn + dy * cs]; };
    const pj = (x, y, z) => { const [u, v] = rot(x, y); return [u * K, (v * sp - z * cp) * K]; };
    const depth = (x, y, z) => { const [, v] = rot(x, y); return v * cp + z * sp; };
    const R = 70 * K; s.setAttribute("viewBox", `${-R} ${-R * 0.62} ${2 * R} ${R * 1.24}`);
    const P = pts => pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
    const poly = (pts, a) => el("polygon", { points: P(pts), ...a }, s);
    const quad = (x0, y0, x1, y1, z) => [pj(x0, y0, z), pj(x1, y0, z), pj(x1, y1, z), pj(x0, y1, z)];
    poly(quad(0, 0, 41.5, 104, 0), { fill: "var(--sheet)", stroke: "var(--line)" });
    const vols = [];
    for (const b of S.blocks.filter(onSite)) { if (b.kind === "court") continue; const off = (b.f - 1) * UI.explode, z0 = TOP[b.f - 1] + off, z1 = TOP[b.f] + off; vols.push({ b, z0, z1, d: depth(b.x + b.w / 2, b.y + b.h / 2, (z0 + z1) / 2) }); }
    vols.sort((p, q) => p.d - q.d);
    for (const { b, z0, z1 } of vols) {
      const x = b.x, y = b.y, X = b.x + b.w, Y = b.y + b.h, c = col(b);
      for (const [nx, ny, k] of [[1, 0, "X"], [-1, 0, "x"], [0, 1, "Y"], [0, -1, "y"]]) {
        if (nx * sn + ny * cs <= 0.001) continue;
        const pts = k === "X" ? [[X, y], [X, Y]] : k === "x" ? [[x, Y], [x, y]] : k === "Y" ? [[X, Y], [x, Y]] : [[x, y], [X, y]];
        poly([pj(pts[0][0], pts[0][1], z0), pj(pts[1][0], pts[1][1], z0), pj(pts[1][0], pts[1][1], z1), pj(pts[0][0], pts[0][1], z1)], { fill: c, stroke: "var(--ink)", "stroke-width": 0.6 });
      }
      poly(quad(x, y, X, Y, z1), { fill: c, stroke: b.id === sel ? "var(--accent)" : "var(--ink)", "stroke-width": b.id === sel ? 2 : 0.6 });
    }
  }

  /* ---------- khối 3D thật (three.js) ---------- */
  let T3 = null;
  function cssCol(c, scope) { const m = /var\((--[\w-]+)\)/.exec(c); if (!m) return c; const v = getComputedStyle(scope || document.documentElement).getPropertyValue(m[1]).trim(); return v || "#999"; }
  function disposeAll(o) { o.traverse(q => { if (q.geometry) q.geometry.dispose(); if (q.material) { const ms = Array.isArray(q.material) ? q.material : [q.material]; for (const m of ms) { if (m.map) m.map.dispose(); m.dispose(); } } }); }
  function textCanvas(t, w = 512, h = 128, fs = 64, color = "#222") { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const x = cv.getContext("2d"); x.font = `bold ${fs}px "Be Vietnam Pro", system-ui, sans-serif`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = color; x.fillText(t, w / 2, h / 2 + 2); return cv; }
  function init3() {
    const box = host.querySelector("#x10-3d");
    let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return null; }
    box.innerHTML = ""; box.appendChild(r.domElement); host.querySelector("#x10-iso").hidden = true;
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    sc.add(new THREE.HemisphereLight(0xffffff, 0x8a8f8c, 0.5)); sc.add(new THREE.AmbientLight(0xffffff, 0.22));
    // nắng từ Đông Nam phía trên: bóng ngả về Tây Bắc
    const sun = new THREE.DirectionalLight(0xffffff, 0.62); sun.position.set(24 + 45, 85, 52 + 55); sun.target.position.set(24, 0, 52); sc.add(sun); sc.add(sun.target);
    sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -75, right: 75, top: 75, bottom: -75, near: 1, far: 320 }); sun.shadow.bias = -0.0006; sun.shadow.camera.updateProjectionMatrix();
    const grp = new THREE.Group(); sc.add(grp);
    const T = { r, sc, cam, grp, sun, objs: {}, pick: [], ray: new THREE.Raycaster(), proj: null };
    const cv = r.domElement; cv.style.cursor = "grab";
    const ndc = e => { const b = cv.getBoundingClientRect(); return new THREE.Vector2(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); };
    const hit = e => { T.ray.setFromCamera(ndc(e), cam); const h = T.ray.intersectObjects(T.pick, false)[0]; return h ? h.object.userData.id : null; };
    const onPlane = (e, h) => { T.ray.setFromCamera(ndc(e), cam); const p = new THREE.Vector3(); return T.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -h), p) ? p : null; };
    let st = null;
    cv.addEventListener("contextmenu", e => e.preventDefault());
    cv.addEventListener("pointerdown", e => {
      cv.setPointerCapture(e.pointerId);
      const id = e.button === 0 && !e.shiftKey ? hit(e) : null, b = id && S.blocks.find(q => q.id === id);
      if (b) {
        sel = b.id; let rebuilt = false;
        if (mode !== "all" && String(b.f) !== mode && b.kind !== "court") { mode = String(b.f); host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === mode))); render(); rebuilt = true; }
        if (!rebuilt) { renderPlan(); renderStack(); sideCard(); hi3d(); }
        const h = TOP[b.f - 1] + (b.f - 1) * UI.explode, p = onPlane(e, h);
        st = { k: "blk", b, h, ox: p ? p.x - b.x : b.w / 2, oz: p ? p.z - b.y : b.h / 2, sx: e.clientX, sy: e.clientY, moved: false, bx: b.x, by: b.y };
      } else st = { k: "orb", x: e.clientX, y: e.clientY, yaw: VIEW.yaw, pitch: VIEW.pitch };
      cv.style.cursor = "grabbing";
    });
    cv.addEventListener("pointermove", e => {
      if (!st) { // rê chuột: khối dưới con trỏ sáng lên ở cả mặt bằng
        if (e.pointerType === "mouse") raf("hv3", () => { const id = hit(e); setHover(id); cv.style.cursor = id ? "pointer" : "grab"; });
        return;
      }
      if (st.k === "orb") { VIEW.yaw = st.yaw + (e.clientX - st.x) * 0.5; VIEW.pitch = Math.max(8, Math.min(89, st.pitch + (e.clientY - st.y) * 0.3)); raf("d3", draw3); return; }
      if (!st.moved && Math.hypot(e.clientX - st.sx, e.clientY - st.sy) < 4) return;
      st.moved = true;
      const p = onPlane(e, st.h); if (!p) return;
      const b = st.b, s = snap(b, p.x - st.ox, p.z - st.oz, 0.9);
      b.x = s.x; b.y = s.y; move3d(b, true);
      if (svg) { const n = svg.querySelector(`[data-id="${CSS_ESC(b.id)}"]`); if (n) n.setAttribute("transform", `translate(${(b.x - st.bx) * PX} ${(b.y - st.by) * PX})`); drawGuides(s.g); }
    });
    const end = () => {
      if (st && st.k === "blk" && st.moved) { clearProj(); drop(st.b, false); keep(); render(); }
      st = null; cv.style.cursor = "grab";
    };
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
    cv.addEventListener("pointerleave", () => { if (!st) setHover(null); });
    cv.addEventListener("wheel", e => { e.preventDefault(); VIEW.zoom = Math.max(0.5, Math.min(3.5, VIEW.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); raf("d3", draw3); }, { passive: false });
    if (!window.__x10rs) { window.__x10rs = 1; window.addEventListener("resize", () => raf("d3", draw3)); }
    return T;
  }
  // hình chiếu khối đang kéo trên 3D: viền trên mặt đất và bốn đường dóng xuống (đề xuất 7)
  function clearProj() { if (T3 && T3.proj) { T3.sc.remove(T3.proj); disposeAll(T3.proj); T3.proj = null; } drawGuides([]); }
  function move3d(b, withProj) {
    if (!T3) return; const o = T3.objs[b.id]; if (!o) return;
    o.grp.position.x = b.x; o.grp.position.z = b.y;
    if (withProj) {
      if (!T3.proj) {
        const ac = new THREE.Color(cssCol("var(--accent)")), g = new THREE.Group();
        const sq = [[0, 0], [b.w, 0], [b.w, b.h], [0, b.h], [0, 0]].map(([x, z]) => new THREE.Vector3(x, 0.18, z));
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(sq), new THREE.LineDashedMaterial({ color: ac, dashSize: 0.9, gapSize: 0.6 })); l.computeLineDistances(); g.add(l);
        const fill = new THREE.Mesh(new THREE.PlaneGeometry(b.w, b.h), new THREE.MeshBasicMaterial({ color: ac, transparent: true, opacity: 0.22, depthWrite: false })); fill.rotation.x = -Math.PI / 2; fill.position.set(b.w / 2, 0.16, b.h / 2); g.add(fill);
        const h = o.grp.position.y;
        for (const [x, z] of [[0, 0], [b.w, 0], [b.w, b.h], [0, b.h]]) { const v = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0.18, z), new THREE.Vector3(x, h, z)]), new THREE.LineDashedMaterial({ color: ac, dashSize: 0.6, gapSize: 0.5 })); v.computeLineDistances(); g.add(v); }
        T3.proj = g; T3.sc.add(g);
      }
      T3.proj.position.set(b.x, 0, b.y);
    }
    raf("d3", draw3);
  }
  function hi3d() {
    if (!T3) { if (host.querySelector("#x10-iso") && !host.querySelector("#x10-iso").hidden) isoSvg(); return; }
    const ac = new THREE.Color(cssCol("var(--accent)"));
    for (const id in T3.objs) {
      const o = T3.objs[id], on = id === sel, hv = id === hover;
      o.edges.material.color.copy(on || hv ? ac : o.edgeCol);
      if (o.mesh && o.mesh.material.emissive) o.mesh.material.emissive.copy(ac).multiplyScalar(on ? 0.32 : hv ? 0.18 : 0);
    }
    raf("d3", draw3);
  }
  function iso() {
    const box = host.querySelector("#x10-3d"); if (!box) return;
    if (UI.layout === "plan" && window.innerWidth > 900) { return; }
    if (!window.THREE) return isoSvg();
    if (!T3 || !box.contains(T3.r.domElement)) { if (T3) { try { T3.r.dispose(); } catch (e) { /* bỏ qua */ } } T3 = init3(); if (!T3) return isoSvg(); }
    T3.proj = null;
    const g = T3.grp; for (const c of [...g.children]) { g.remove(c); disposeAll(c); }
    T3.objs = {}; T3.pick = [];
    T3.r.shadowMap.enabled = UI.shadow; T3.sun.castShadow = UI.shadow;
    const scope = host.querySelector(".x10"), C = c => new THREE.Color(cssCol(c, scope)), ink = C("var(--ink)"), ghostC = C("var(--ink-2)"), inkHex = cssCol("var(--ink)");
    const slab = (x0, y0, x1, y1, h, c, op) => { const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, h, y1 - y0), new THREE.MeshLambertMaterial({ color: C(c), transparent: op != null, opacity: op ?? 1 })); m.position.set((x0 + x1) / 2, h / 2 - 0.05, (y0 + y1) / 2); m.receiveShadow = true; g.add(m); return m; };
    slab(-20, -20, 70, 124, 0.04, "var(--paper)"); slab(0, 0, 41.5, 104, 0.1, "var(--sheet)"); slab(0, 0, 6, 104, 0.12, "var(--road)"); slab(6, 0, 41.5, 12, 0.12, "var(--pave)"); slab(6, 89, 41.5, 104, 0.12, "var(--road)"); slab(41.5, 0, 47.5, 104, 0.1, "var(--water)");
    { const pts = [[6, 12], [41.5, 12], [41.5, 89], [6, 89], [6, 12]].map(([x, y]) => new THREE.Vector3(x, 0.2, y)); const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: C("var(--accent)"), dashSize: 1.2, gapSize: 0.8 })); l.computeLineDistances(); g.add(l); }
    g.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(-4, 0.3, 8), 7, ink, 2, 1.4));
    // thước cao độ ở góc Tây Bắc (vạch mỗi tầng 4,5 m)
    { const x = -2.5, z = 12, add = (t, y) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(textCanvas(t, 256, 64, 40, inkHex)), depthTest: false, transparent: true })); sp.position.set(x - 3.2, y, z); sp.scale.set(5.2, 1.3, 1); g.add(sp); };
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, TOP[3] + 2 * UI.explode, z)]), new THREE.LineBasicMaterial({ color: ink })));
      for (let f = 0; f <= 3; f++) { const y = f === 0 ? 0.45 : TOP[f] + (f - 1) * UI.explode; g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x - 0.8, y, z), new THREE.Vector3(x + 0.8, y, z)]), new THREE.LineBasicMaterial({ color: ink }))); add((f === 0 ? "+0,45" : "+" + nf(TOP[f], 2)), y); } }
    // người cao 1,7 m để so tỉ lệ (đề xuất 6)
    if (UI.people) for (const [x, z] of [[14, 5], [15.3, 6.6], [28, 4.5], [33.5, 8], [24, 95], [3, 40], [9, 97]]) {
      const pm = new THREE.MeshLambertMaterial({ color: C("var(--ink-2)") }), bd = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 1.28, 10), pm), hd = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), pm.clone());
      bd.position.set(x, 0.12 + 0.64, z); hd.position.set(x, 0.12 + 1.5, z); bd.castShadow = hd.castShadow = true; g.add(bd, hd);
    }
    const f = curF();
    for (const b of S.blocks.filter(onSite)) {
      const c = C(col(b));
      if (b.kind === "court") {
        const grp = new THREE.Group(); grp.position.set(b.x, 0, b.y); g.add(grp);
        const geo = new THREE.BoxGeometry(b.w, 0.25, b.h), m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: c, transparent: true, opacity: 0.85 }));
        m.position.set(b.w / 2, 0.08, b.h / 2); m.receiveShadow = true; m.userData.id = b.id; grp.add(m); T3.pick.push(m);
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: ghostC.clone() })); e.position.copy(m.position); grp.add(e);
        T3.objs[b.id] = { grp, mesh: m, edges: e, edgeCol: ghostC.clone(), b }; continue;
      }
      const off = (b.f - 1) * UI.explode, z0 = TOP[b.f - 1];
      let z1 = TOP[b.f];
      if (/stair|lift|book/.test(b.kind) && !S.blocks.some(o => o !== b && onSite(o) && /stair|lift|book/.test(o.kind) && o.f > b.f && ovl(o, b) > 1)) z1 += 1.6;
      const state = f == null ? "solid" : b.f < f ? "below" : b.f === f ? "cur" : UI.cut ? "wire" : "glass";
      const hgt = z1 - z0 - 0.08, grp = new THREE.Group(); grp.position.set(b.x, z0 + off, b.y); g.add(grp);
      const geo = new THREE.BoxGeometry(b.w, hgt, b.h);
      let mesh = null;
      if (state !== "wire") {
        const glass = state === "glass";
        mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: c, transparent: glass, opacity: glass ? 0.2 : 1, depthWrite: !glass }));
        mesh.position.set(b.w / 2, hgt / 2, b.h / 2); mesh.castShadow = !glass; mesh.receiveShadow = !glass; mesh.userData.id = b.id; grp.add(mesh); if (!glass) T3.pick.push(mesh);
      }
      const ec = state === "wire" || state === "glass" ? ghostC.clone() : ink.clone();
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), state === "wire" ? new THREE.LineDashedMaterial({ color: ec, dashSize: 0.7, gapSize: 0.5, transparent: true, opacity: 0.8 }) : new THREE.LineBasicMaterial({ color: ec }));
      edges.position.set(b.w / 2, hgt / 2, b.h / 2); if (state === "wire") edges.computeLineDistances(); grp.add(edges);
      if (b.top && state !== "wire") for (let yy = 1.5; yy < b.h - 0.5; yy += 3) grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.6, hgt + 0.03, yy), new THREE.Vector3(b.w - 0.6, hgt + 0.03, yy)]), new THREE.LineBasicMaterial({ color: 0x2f8fd6 })));
      // tên phòng, diện tích viết trên mặt sàn khối của tầng đang xếp (đề xuất 4); tầng khác chỉ ghi mã
      if ((state === "cur" || state === "solid") && b.w * b.h >= 10) {
        const t = state === "cur" ? `${label(b)} · ${nf(area(b))} m²` : label(b);
        let pw = Math.min(b.w * 0.92, state === "cur" ? 15 : 7), ph = pw / 4; if (ph > b.h * 0.8) { ph = b.h * 0.8; pw = ph * 4; }
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(textCanvas(t, 512, 128, t.length > 9 ? 52 : 70, inkHex)), transparent: true, depthWrite: false }));
        pl.rotation.x = -Math.PI / 2; pl.position.set(b.w / 2, hgt + 0.06, b.h / 2); grp.add(pl);
      }
      // tách tầng: đường dóng từ góc khối xuống tầng dưới (đề xuất 3)
      if (UI.explode > 0 && b.f >= 2 && state !== "wire") for (const [x, z] of [[0, 0], [b.w, 0], [b.w, b.h], [0, b.h]]) { const v = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, -UI.explode, z)]), new THREE.LineDashedMaterial({ color: C("var(--accent)"), dashSize: 0.5, gapSize: 0.4 })); v.computeLineDistances(); grp.add(v); }
      T3.objs[b.id] = { grp, mesh, edges, edgeCol: ec, b };
    }
    // nhãn từng tầng khi tách tầng
    if (UI.explode > 0) for (let fl = 1; fl <= NF; fl++) {
      const on = S.blocks.filter(b => onSite(b) && isFloor(b) && b.f === fl); if (!on.length) continue;
      const a = on.reduce((t, b) => t + b.w * b.h, 0), sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(textCanvas(`T${fl} · ${nf(a)} m²`, 512, 96, 58, inkHex)), depthTest: false, transparent: true }));
      sp.position.set(-9, TOP[fl - 1] + (fl - 1) * UI.explode + 2.2, 30); sp.scale.set(12, 2.25, 1); g.add(sp);
    }
    hi3d(); draw3();
  }
  function draw3() {
    if (!T3) return;
    const box = host.querySelector("#x10-3d"), cv = host.querySelector(".x10 .cv"), W = box.clientWidth || 700;
    const planH = cv && cv.offsetParent && window.innerWidth > 900 ? cv.clientHeight : 0;
    const H = Math.round(UI.layout === "3d" || !planH ? Math.max(420, Math.min((window.innerHeight || 900) - 60, W * 0.62)) : Math.max(320, Math.min(W * 0.85, planH * 0.56)));
    T3.r.setSize(W, H, false); T3.r.domElement.style.height = H + "px"; T3.cam.aspect = W / H; T3.cam.updateProjectionMatrix();
    const yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, d = 118 / VIEW.zoom, tx = 24, tz = 52, ty = 3 + UI.explode;
    T3.cam.position.set(tx + d * Math.cos(pr) * Math.sin(yr), ty + d * Math.sin(pr), tz + d * Math.cos(pr) * Math.cos(yr)); T3.cam.lookAt(tx, ty, tz);
    T3.r.render(T3.sc, T3.cam);
  }

  /* ---------- bắt đầu từ một ý tưởng đã có ---------- */
  function fromPlan(i) {
    const p = G.CHOT[i], out = [];
    p.levels.forEach((L, li) => { for (const z of L.rooms) {
      if (z.void) continue; const r = z.r || (() => { const xs = (z.p || []).map(q => q[0]), ys = (z.p || []).map(q => q[1]); return xs.length ? [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)] : null; })();
      if (!r) continue;
      const kind = z.core ? (/b/.test(z.core.st) ? "book" : /l/.test(z.core.st) ? "lift" : "stair") : /^[A-E]\d$/.test(z.c || "") ? "room" : "circ";
      out.push({ id: `${p.code}:${li + 1}:${z.id}`, c: kind === "room" ? z.c : kind === "circ" ? "circ" : "core", n: z.n, kind, a: kind === "room" ? +(r[2] * r[3]).toFixed(1) : null, w: r[2], h: r[3], x: r[0], y: r[1], f: li + 1, top: !!z.top || undefined, approx: !z.r || undefined });
    } });
    S = { blocks: out, note: `Bắt đầu từ ${p.code} · ${p.name}. ` + (S.note || ""), from: p.code }; sel = null; keep(); build();
    if (out.some(b => b.approx)) say("Ý tưởng này có phòng cạnh xiên, đã quy về hình chữ nhật bao ngoài nên vài khối có thể chồng nhau; chỉnh lại cho khớp nếu cần.");
  }

  /* ---------- lưu cho Claude, tải và mở file ---------- */
  const payload = () => ({ kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: S.note || "", from: S.from || null, blocks: S.blocks.map(b => ({ id: b.id, c: b.c, n: b.n, kind: b.kind, a: b.a, x: b.x, y: b.y, w: b.w, h: b.h, f: b.f, top: !!b.top, onSite: onSite(b), draft: !!b.draft || undefined })) });
  const say = t => { const e = host.querySelector("#x10-st"); if (e) e.textContent = t; };
  async function saveForClaude() {
    const db = window.claude && window.claude.use ? await window.claude.use("db") : null;
    if (!db) { say("Trang này không lưu lên được ở chế độ xem hiện tại. Hãy bấm Tải file rồi gửi file cho Claude."); return; }
    const data = payload();
    try {
      await db.doc("xepkhoi/ban-moi-nhat").set(data);
      try { await db.collection("xepkhoi_lich_su").add(data); } catch (e) { /* lịch sử là phụ */ }
      say(`Đã lưu lúc ${new Date().toLocaleTimeString("vi-VN")}. Giờ nhắn Claude: "mình xếp xong rồi".`);
    } catch (e) { say(e && e.code === "invalid_argument" ? "Bạn không có quyền lưu trên trang này. Hãy bấm Tải file rồi gửi file cho Claude." : "Chưa lưu được (" + ((e && e.code) || "lỗi") + "). Thử lại sau giây lát, hoặc bấm Tải file."); }
  }
  async function download() {
    const data = JSON.stringify(payload(), null, 1), dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
    if (dl) { try { await dl.save({ filename: "xep-khoi-arc329.json", data }); say("Đã đưa file để bạn lưu."); return; } catch (e) { if (e && e.code !== "unavailable") { say("Chưa tải được file."); return; } } }
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], { type: "application/json" })); a.download = "xep-khoi-arc329.json"; document.body.appendChild(a); a.click(); a.remove(); say("Đã tải file."); } catch (e) { say("Trình duyệt chặn tải file; hãy dùng nút Lưu cho Claude."); }
  }
  function openFile(e) {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    f.text().then(t => { const d = JSON.parse(t); if (!d || !Array.isArray(d.blocks)) throw new Error("bad"); S = { blocks: d.blocks.map(b => ({ ...b, f: b.f || 1 })), note: d.note || "", from: d.from || null }; sel = null; keep(); build(); say("Đã mở file."); }).catch(() => say("File không đúng định dạng xếp khối."));
  }

  let started = false;
  const start = () => { if (started) return; started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="g10"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(() => { start(); raf("d3", draw3); }, 50));
  const panel = document.querySelector('[data-panel="g10"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) renderPlan(); });
})(window.G3);
