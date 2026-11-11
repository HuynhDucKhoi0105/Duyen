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
  const DRAFT = { x0: 50, x1: 88, y0: 8, y1: 92 };
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
    stair: { n: "Thang bộ", w: 3, h: 6.2, col: "var(--x10Stair)" },
    lift: { n: "Thang bộ + thang máy", w: 5.5, h: 6.2, col: "var(--x10Lift)" },
    book: { n: "Lõi sách: thang + máy + tời sách", w: 6, h: 6.2, col: "var(--x10Lift)" },
    circ: { n: "Sảnh, hành lang", w: 2.4, h: 12, col: "var(--zCirc)" },
    court: { n: "Sân trong (ngoài trời)", w: 10, h: 10, col: "var(--zOut)" },
    park: { n: "Bãi đỗ xe", w: 12, h: 9, col: "var(--x10Park)" }
  };
  // bãi đỗ xe: không tính sàn; xe máy 3 m²/xe (gồm lối đi), ô tô 25 m²/xe, xe đạp 1,5 m²/xe; ở tầng 1 dưới tầng trên thì có cột đỡ
  const PK = { moto: ["xe máy", 3], car: ["ô tô", 25], bike: ["xe đạp", 1.5] };
  const pkN = b => Math.floor(b.w * b.h / PK[b.pk || "moto"][1]);
  // mô hình tỉ lệ 1:200 (bạn yêu cầu 11/11/2026): 1 m thật = 0,5 cm mô hình
  const cmT = (v, d = 2) => nf(v / 2, d);
  const zOf = b => G.MOHINH ? G.MOHINH.zOf(b, S.blocks.filter(o => onSite(o) && !o.draft)) : { z0: TOP[b.f - 1], z1: TOP[b.f], h: TOP[b.f] - TOP[b.f - 1], up: false };
  let MEAS = null; // đường đo đang hiện {x0, y0, x1, y1}

  /* ---------- trạng thái ---------- */
  let S = load() || { blocks: defaults(), note: "" };
  let sel = null, hover = null, mode = "1", seq = 1, ISS = [], BAD = new Set(), FLASH = new Set(), flashT = 0;
  const msel = new Set(); // các khối đang chọn cùng lúc (bôi đen hoặc Shift + bấm)
  const isSel = b => sel === b.id || msel.has(b.id);
  const grp = () => S.blocks.filter(b => msel.has(b.id));
  const clearSel = () => { sel = null; msel.clear(); };
  function load() { try { const t = localStorage.getItem(KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  // cách hiển thị (không phải bản xếp): lưu riêng
  const UI = Object.assign({ under: 0.7, layout: "split", planH2: Math.round(Math.max(620, Math.min(1100, (window.innerHeight || 900) - 70))), explode: 0, cut: true, shadow: true, people: true, navLock: true, dvLock: false, tdView: "3d", keepDim: "h", dims: true, ruler: true, meas: false }, (() => { try { return JSON.parse(localStorage.getItem(UIKEY) || "{}") || {}; } catch (e) { return {}; } })());
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
  const outdoor = b => b.kind === "court" || b.kind === "park";
  const isFloor = b => !outdoor(b);
  const holds = b => b.kind !== "court"; // đỡ được tầng trên (bãi xe ở gầm có cột)
  const col = b => b.kind === "room" ? `var(--z${b.c[0]})` : HELP[b.kind].col;
  const ovl = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const gap = (a, b) => Math.hypot(Math.max(0, Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w)), Math.max(0, Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h)));
  const inside = (o, x, y) => x >= o.x && x <= o.x + o.w && y >= o.y && y <= o.y + o.h;
  const dpt = (o, x, y) => Math.hypot(Math.max(0, o.x - x, x - o.x - o.w), Math.max(0, o.y - y, y - o.y - o.h));
  const label = b => b.kind === "zone" ? "mép vùng xây dựng" : b.kind === "room" ? b.c : HELP[b.kind].n.split(":")[0];
  // vùng xây dựng: khối tầng 1 không ra lối xe cứu hỏa (Tây), quảng trường (Bắc), bãi xe (Nam), bờ sông (Đông)
  const ZW = [[-200, -200, 200 + 6, 500], [41.5, -200, 200, 500], [-200, -200, 500, 200 + 12], [-200, 89, 500, 200]].map(([x, y, w, h]) => ({ x, y, w, h, kind: "zone", c: "", f: 1, id: "__zone" }));
  const zoned = (b, f = b.f) => f === 1 && !outdoor(b);
  const inZone = b => b.x >= SITE.x0 - 0.01 && b.y >= SITE.y0 - 0.01 && b.x + b.w <= SITE.x1 + 0.01 && b.y + b.h <= SITE.y1 + 0.01;
  const zClamp = b => { if (b.w <= SITE.x1 - SITE.x0) b.x = Math.max(SITE.x0, Math.min(SITE.x1 - b.w, b.x)); if (b.h <= SITE.y1 - SITE.y0) b.y = Math.max(SITE.y0, Math.min(SITE.y1 - b.h, b.y)); };
  // diện tích theo đề: mỗi phòng được chỉnh ±10% (đề mục 4), tổng sàn không quá 3.000 m²
  const briefA = c => { const k = KH.find(q => q.c === c); return k ? k.m2 : null; };
  const codeSum = c => S.blocks.filter(o => o.kind === "room" && o.c === c).reduce((t, o) => t + (+o.a || 0), 0);
  const floorTot = () => S.blocks.filter(o => onSite(o) && isFloor(o)).reduce((t, o) => t + o.w * o.h, 0);
  const MAXF = 3000, TOL = 0.10;
  // giới hạn giao thông: đề dự trù 780 m² cho giao thông chung (hành lang, sảnh, thang), tường và cấu kiện
  const CIRC_MAX = 780;
  const isCirc = b => b && b.kind !== "room" && b.kind !== "court" && b.kind !== "park";
  const circSum = ex => S.blocks.filter(o => o !== ex && onSite(o) && !o.draft && isCirc(o)).reduce((t, o) => t + o.w * o.h, 0);
  const circRoom = ex => CIRC_MAX - circSum(ex); // còn bao nhiêu m² cho khối giao thông ex
  let cwT = 0;
  function circMsg(t) { const e = host.querySelector("#x10-cw"); if (!e) return; e.dataset.flash = "1"; e.innerHTML = `<b>${t}</b>`; e.className = "ptl cw bad"; clearTimeout(cwT); cwT = setTimeout(() => { delete e.dataset.flash; circLine(); }, 4500); }
  function circLine() {
    const e = host.querySelector("#x10-cw"); if (!e || e.dataset.flash) return;
    const v = circSum(), left = CIRC_MAX - v;
    e.className = "ptl cw" + (left < 0 ? " bad" : left < 40 ? " mid" : "");
    e.textContent = `Giao thông (hành lang, sảnh, thang) ${nf(v)}/${nf(CIRC_MAX)} m² · ` + (left < 0 ? `vượt ${nf(-left)} m²: không thêm, không nới hành lang được nữa, chỉ thu nhỏ hoặc bỏ bớt` : left < 40 ? `còn ${nf(left)} m², sắp chạm giới hạn` : `còn ${nf(left)} m²`);
  }
  const curF = () => mode === "all" ? null : +mode;
  const CSS_ESC = s => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/"/g, '\\"');
  const raf = (() => { const q = new Map(); return (k, f) => { if (q.has(k)) { q.set(k, f); return; } q.set(k, f); requestAnimationFrame(() => { const g = q.get(k); q.delete(k); g(); }); }; })();

  /* ---------- khung trang ---------- */
  const CSS = `
#x10-host { width: min(1560px, calc(100vw - 40px)); margin-left: calc((100% - min(1560px, calc(100vw - 40px))) / 2); justify-self: start; }
.x10 [hidden] { display: none !important; }
.x10 { display: grid; gap: 12px; --x10Stair: #e08a3c; --x10Lift: #8a6cc7; --x10Guide: #d6338a; --x10Red: #c2412a; --x10Green: #3f8f4f; --xdimC: #0e7490; --x10Park: #c9d3d8; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .x10 { --xdimC: #5fd0e6; --x10Park: #4a5559; } }
:root[data-theme="dark"] .x10 { --xdimC: #5fd0e6; --x10Park: #4a5559; }
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
.x10 #x10-sel { grid-area: sel; overflow: auto; padding: 8px 12px; }
.x10 #x10-sel h4 { font-size: 14.5px; margin-bottom: 4px; }
.x10 #x10-sel p { font-size: 12.5px; margin: 2px 0 4px; line-height: 1.45; }
.x10 #x10-sel .k { font-size: 12px; }
.x10 #x10-sel .btn, .x10 #x10-sel .seg button { font-size: 12.5px; padding: 4px 8px; }
.x10 #x10-sel input[type=range] { margin: 2px 0 4px; }
.x10 .scg { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 2px 16px; }
.x10 .info { grid-area: info; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); align-items: start; }
.x10 .cv { position: relative; }
.x10 .ptl { margin: 0; font: 700 13.5px var(--body); color: var(--ink-2); min-height: 1.3em; }
.x10 .ptl.cw { font-weight: 600; color: var(--accent); }
.x10 .ptl.cw.mid { color: #c98a00; }
.x10 .ptl.cw.bad { color: var(--warn); }
.x10calc { position: fixed; right: 16px; bottom: 16px; z-index: 60; width: 300px; max-width: calc(100vw - 32px); background: var(--sheet); color: var(--ink); border: 1px solid var(--ink); border-radius: 10px; box-shadow: 0 8px 28px rgba(0,0,0,.25); padding: 10px; display: grid; gap: 8px; font: 14px var(--body); }
.x10calc[hidden] { display: none; }
.x10calc .ch { display: flex; align-items: center; gap: 8px; cursor: move; touch-action: none; user-select: none; }
.x10calc .ch .k { font: 600 11px var(--mono); color: var(--ink-2); flex: 1; }
.x10calc .cx { border: 0; background: transparent; color: var(--ink); font: 700 20px var(--body); cursor: pointer; line-height: 1; padding: 0 4px; }
.x10calc input { font: 600 17px var(--mono); padding: 7px 9px; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); color: var(--ink); width: 100%; box-sizing: border-box; }
.x10calc input:focus-visible, .x10calc button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.x10calc .cr { font: 600 18px var(--mono); text-align: right; min-height: 1.3em; }
.x10calc .ckp { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.x10calc .ckp button, .x10calc .cins button, .x10calc .chist button { font: 600 15px var(--body); padding: 7px 0; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); color: var(--ink); cursor: pointer; }
.x10calc .ckp button:hover { border-color: var(--ink); }
.x10calc .ckp .eq { background: var(--ink); color: var(--sheet); border-color: var(--ink); }
.x10calc .cins { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; font-size: 12.5px; }
.x10calc .cins button { font-size: 12.5px; padding: 3px 7px; }
.x10calc .cins .k, .x10calc .ch .k { font-size: 11.5px; color: var(--ink-2); }
.x10calc .chist { list-style: none; margin: 0; padding: 0; display: grid; gap: 3px; max-height: 150px; overflow: auto; }
.x10calc .chist button { width: 100%; text-align: right; font: 500 12.5px var(--mono); padding: 3px 7px; }
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
.x10 svg.plan rect.hd { fill: var(--accent); fill-opacity: 0; }
.x10 svg.plan rect.hd.ew { cursor: ew-resize; } .x10 svg.plan rect.hd.ns { cursor: ns-resize; }
.x10 svg.plan g.blk rect.hd:hover { fill-opacity: 0.45; }
.x10 svg.plan.dragging rect.hd { display: none; }
.x10 svg.plan.rs-ew, .x10 svg.plan.rs-ew * { cursor: ew-resize !important; } .x10 svg.plan.rs-ns, .x10 svg.plan.rs-ns * { cursor: ns-resize !important; }
.x10 .dims { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin: 4px 0 2px; }
.x10 .dims label { display: grid; gap: 2px; font-size: 12px; color: var(--ink-2); }
.x10 .dims label > span { display: flex; align-items: center; gap: 4px; font-size: 12px; }
.x10 .dims input { width: 100%; min-width: 0; box-sizing: border-box; font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; padding: 4px 6px; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); color: var(--ink); }
.x10 #x10-sel .btn.sm { font-size: 12px; padding: 3px 7px; }
.x10 #x10-sel .spl { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; }
.x10 #x10-sel .spl input { width: 64px; font: inherit; padding: 4px 5px; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); color: var(--ink); }
.x10 .cv.measuring svg.plan, .x10 .cv.measuring svg.plan * { cursor: crosshair !important; }
.x10 .mcm { color: var(--xdimC); }
.x10 .info .mdl { grid-column: 1 / -1; }
.x10 .mdl details { margin: 6px 0; } .x10 .mdl summary { cursor: pointer; font-weight: 700; font-size: 13px; }
.x10 .mdl table td.n, .x10 .mdl table th.n { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.x10 .mdl tr.cl td { font-weight: 700; background: color-mix(in srgb, var(--xdimC) 9%, transparent); }
.x10 .mdl .lnk { font: inherit; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; text-decoration: underline dotted; text-underline-offset: 3px; text-align: left; }
.x10 .mdl .tw { overflow-x: auto; }
.x10 .snap { color: var(--accent) !important; font-weight: 700; min-height: 1.2em; margin: 0 0 4px; }
.x10 #x10-sel .seg button { font-size: 12px; padding: 1px 7px; }
.x10 svg.plan.dragging, .x10 svg.plan.dragging g.blk { cursor: grabbing; }
.x10 svg.plan g.hv > rect.body { stroke: var(--accent); stroke-width: 5px; }
.x10 .ov .btn.lk { font-size: 12.5px; }
.x10 .ov .btn.lk[aria-pressed="true"] { background: var(--ink); color: var(--sheet); border-color: var(--ink); }
.x10 .cv.navlock .zm { display: none; }
.x10 .cv.navlock svg.plan { cursor: default; }
.x10 .dv { position: relative; }
.x10 .dv .dvl { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 26px; height: 26px; padding: 0; border: 1px solid var(--line); border-radius: 50%; background: var(--paper); font-size: 12px; line-height: 1; cursor: pointer; z-index: 2; }
.x10 .dv .dvl[aria-pressed="true"] { border-color: var(--ink); }
.x10 .dv.locked { cursor: default; }
.x10 .dv.locked::before { background: repeating-linear-gradient(var(--line) 0 6px, transparent 6px 10px); }
.x10 .dv.locked:hover::before { background: repeating-linear-gradient(var(--line) 0 6px, transparent 6px 10px); }
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
.x10 .tdsw { position: absolute; right: 8px; bottom: 26px; z-index: 3; }
.x10 .tdsw .seg button { font-size: 12px; padding: 4px 9px; }
.x10 .td.mbv .tdsw { position: static; padding: 8px 8px 0; }
.x10 .x10mb { display: none; }
.x10 .td.mbv .x10mb { display: block; padding: 4px 8px 8px; }
.x10 .td.mbv #x10-3d, .x10 .td.mbv #x10-iso, .x10 .td.mbv .ov, .x10 .td.mbv .hint { display: none !important; }
.x10 .x10mb .plan { border: 0; overflow: hidden; }
.x10 .x10mb svg { display: block; width: 100%; height: calc(var(--planH, 860px) - 90px); }
.x10 .x10mb .mbt { font-size: 12.5px; margin: 0 0 4px; color: var(--ink-2); }
.x10 .x10mb .mbe { font-size: 12px; } .x10 .x10mb .mbe ul { margin: 4px 0 0; padding-left: 18px; max-height: 180px; overflow: auto; }
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
.x10 .chk li.soft::before { content: "?"; color: #c98a00; }
.x10 .chk .lnk { font: inherit; text-align: left; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; text-decoration: underline dotted; text-underline-offset: 3px; }
.x10 .chk .lnk:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
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
    <button type="button" class="btn" id="x10-undo" title="Ctrl+Z">↶ Hoàn tác</button><button type="button" class="btn" id="x10-redo" title="Ctrl+Y">↷ Làm lại</button><button type="button" class="btn" id="x10-calcb" aria-pressed="${!!UI.calc}">🧮 Máy tính</button><button type="button" class="btn" id="x10-rlb" aria-pressed="${!!UI.ruler}" title="Thước chia sẵn tỉ lệ 1:200 trên mặt bằng; kích thước khối, nhóm khối ghi thêm cm mô hình">📏 Thước 1:200</button><button type="button" class="btn" id="x10-msb" aria-pressed="${!!UI.meas}" ${UI.ruler ? "" : "hidden"} title="Bật rồi kéo trên mặt bằng để đo (tự bắt mép, góc khối; giữ Alt để đo xiên tự do). Esc xoá đường đo">📐 Kéo để đo</button><span class="k" id="x10-msv" aria-live="polite"></span>
    <span class="k" style="margin-left:8px">Thêm</span>${Object.entries(HELP).map(([k, v]) => `<button type="button" class="btn" data-add="${k}">+ ${v.n.split(":")[0]}</button>`).join("")}
  </div>
  <div class="bar">
    <span class="k">Hiển thị</span><span class="seg" id="x10-lay">${[["split", "Mặt bằng + 3D"], ["plan", "Chỉ mặt bằng"], ["3d", "Chỉ 3D"]].map(([k, t]) => `<button type="button" data-l="${k}" aria-pressed="${k === UI.layout}">${t}</button>`).join("")}</span>
    <label class="opt" for="x10-under">Độ đậm tầng dưới <input type="range" id="x10-under" min="0.15" max="1" step="0.05" value="${UI.under}"></label>
    <label class="opt" for="x10-exp">Tách tầng <input type="range" id="x10-exp" min="0" max="8" step="0.5" value="${UI.explode}"><b id="x10-expv">${nf(UI.explode, 1)} m</b></label>
    <label class="opt"><input type="checkbox" id="x10-cut" ${UI.cut ? "checked" : ""}> Cắt 3D theo tầng đang xếp</label>
    <label class="opt"><input type="checkbox" id="x10-sh" ${UI.shadow ? "checked" : ""}> Bóng đổ</label>
    <label class="opt"><input type="checkbox" id="x10-pp" ${UI.people ? "checked" : ""}> Người 1,7 m</label>
    <label class="opt"><input type="checkbox" id="x10-dm" ${UI.dims ? "checked" : ""}> Kích thước tổng</label>
  </div>
  <div class="lg"><span><i style="border:2px dashed var(--ink-2)"></i>tầng dưới</span><span><i style="border:2px dotted var(--ink)"></i>tầng trên</span><span><i style="background:repeating-linear-gradient(45deg,var(--x10Red) 0 2px,transparent 2px 6px);border:1px solid var(--x10Red)"></i>đua quá 4 m, cần cột</span><span><i style="background:repeating-linear-gradient(45deg,var(--x10Green) 0 2px,transparent 2px 6px);border:1px solid var(--x10Green)"></i>mái lộ: lấy sáng mái, sân thượng</span><span><i style="background:#2f8fd6;height:4px"></i>mặt Bắc/Nam hở lấy sáng</span><span><i style="border-top:2px dashed var(--x10Guide)"></i>đường dóng khi kéo</span></div>
  <p class="ptl" id="x10-pt"></p>
  <p class="ptl cw" id="x10-cw" aria-live="polite"></p>
  <div class="main l-${UI.layout}" id="x10-main" style="--planH:${UI.planH2}px">
    <div class="stk" id="x10-stk" aria-label="Chọn tầng đang xếp"></div>
    <div class="kho"><div class="bar"><b style="font-size:13.5px">Kho khối</b><span class="k">kéo vào khu đất, vào 3D, hoặc ra bàn nháp bên phải mặt bằng (bấm đúp một khối để đưa ra bàn nháp)</span></div><div id="x10-kho" class="row"></div></div>
    <div class="cv"><svg class="plan" id="x10-svg" aria-label="Mặt bằng khu đất và các khối"></svg><div class="ov tr"><button type="button" class="btn lk" id="x10-nl" aria-pressed="${UI.navLock}" title="Khoá thì cuộn chuột, kéo chỗ trống không làm phóng to, thu nhỏ hay dời hình; mở khoá để phóng thu, kéo hình">${UI.navLock ? "🔒 Đã khoá khung" : "🔓 Đang mở khung"}</button><span class="zm"><button type="button" class="btn" id="x10-zi" title="Phóng to (hoặc cuộn chuột)">＋</button><button type="button" class="btn" id="x10-zo" title="Thu nhỏ">−</button><button type="button" class="btn" id="x10-zf" title="Vừa khung" style="font-size:12.5px">Vừa khung</button></span></div></div>
    <div class="dv${UI.dvLock ? " locked" : ""}" id="x10-dv" role="separator" aria-label="Kéo để đổi cỡ mặt bằng và 3D" tabindex="0"><button type="button" class="dvl" id="x10-dvl" aria-pressed="${UI.dvLock}" title="${UI.dvLock ? "Vạch chia đang khoá: bấm để mở, rồi kéo đổi cỡ khung" : "Bấm để khoá vạch chia, giữ cỡ khung mặt bằng và 3D"}">${UI.dvLock ? "🔒" : "🔓"}</button></div>
    <div class="td${UI.tdView === "mb" ? " mbv" : ""}" id="x10-td">
      <div class="tdsw"><span class="seg" role="group" aria-label="Khung bên phải">${[["3d", "Khối 3D"], ["mb", "Mặt bằng chi tiết"]].map(([k, t]) => `<button type="button" data-td="${k}" aria-pressed="${(UI.tdView || "3d") === k}">${t}</button>`).join("")}</span></div>
      <div class="p6 x10mb" id="x10-mbw"><p class="mbt" id="x10-mbt"></p><div class="plan"><svg id="x10-mb" role="img" aria-label="Mặt bằng chi tiết của bản đang sửa"></svg></div><details class="mbe"><summary id="x10-mbs"></summary><ul id="x10-mbl"></ul></details></div>
      <div id="x10-3d" aria-label="Khối 3D: kéo khối để di chuyển, kéo chỗ trống để xoay"></div><svg class="iso" id="x10-iso" hidden></svg>
      <div class="ov tl"><button type="button" class="btn" data-v="l">⟲</button><button type="button" class="btn" data-v="r">⟳</button><button type="button" class="btn" data-v="top">Nhìn từ trên</button><button type="button" class="btn" data-v="0">Góc mặc định</button><button type="button" class="btn" id="x10-pan" aria-pressed="false" title="Bật: kéo chuột trái hoặc một ngón tay để di chuyển góc nhìn">✥ Di chuyển</button></div>
      <div class="ov tr"><button type="button" class="btn" id="x10-up" title="Lên tầng trên">▲</button><span class="flv" id="x10-flv"></span><button type="button" class="btn" id="x10-dn" title="Xuống tầng dưới">▼</button></div>
      <p class="hint">Kéo khối để di chuyển khối · kéo chỗ trống để xoay · chuột phải, Ctrl/Alt + kéo hoặc nút ✥ để di chuyển góc nhìn · cuộn để phóng to · PageUp/PageDown đưa khối lên, xuống tầng</p>
    </div>
    <div class="card" id="x10-sel"></div>
    <div class="info">
      <div class="card"><h4>Kiểm tra nhanh</h4><p class="k" style="margin:0 0 6px">! lỗi thật, viền đỏ trên khối · ? gợi ý, bấm dòng để tô các khối liên quan</p><ul class="chk" id="x10-chk"></ul></div>
      <div class="card"><h4>Diện tích</h4><div id="x10-area"></div></div>
      <div class="card mdl"><h4>Cắt mô hình 1:200</h4><div id="x10-mdl"></div></div>
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
    $("#x10-dm").addEventListener("change", e => { UI.dims = e.target.checked; saveUI(); renderPlan(); iso(); });
    host.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => { const v = b.dataset.v; if (v === "l") VIEW.yaw -= 45; else if (v === "r") VIEW.yaw += 45; else if (v === "top") VIEW.pitch = 88; else { VIEW.yaw = 35; VIEW.pitch = 32; VIEW.zoom = 1; VIEW.tx = 24; VIEW.tz = 52; } T3 ? draw3() : isoSvg(); }));
    $("#x10-pan").addEventListener("click", e => { VIEW.pan = !VIEW.pan; e.currentTarget.setAttribute("aria-pressed", String(VIEW.pan)); });
    $("#x10-up").addEventListener("click", () => setMode(String(mode === "all" ? 1 : Math.min(NF, +mode + 1))));
    $("#x10-dn").addEventListener("click", () => setMode(String(mode === "all" ? 1 : Math.max(1, +mode - 1))));
    $("#x10-save").addEventListener("click", saveForClaude);
    $("#x10-dl").addEventListener("click", download);
    $("#x10-open").addEventListener("change", openFile);
    $("#x10-reset").addEventListener("click", () => { if (!confirm("Xếp lại từ đầu? (Bấm Hoàn tác nếu muốn lấy lại bản đang xếp.)")) return; S = { blocks: defaults(), note: S.note }; sel = null; keep(); render(); });
    $("#x10-from").addEventListener("change", e => { if (e.target.value === "") return; if (confirm("Thay bản đang xếp bằng các khối của ý tưởng này?")) fromPlan(+e.target.value); e.target.value = ""; });
    $("#x10-undo").addEventListener("click", undo);
    $("#x10-rlb").addEventListener("click", e => { UI.ruler = !UI.ruler; if (!UI.ruler) { UI.meas = false; MEAS = null; } saveUI(); e.currentTarget.setAttribute("aria-pressed", String(UI.ruler)); const m = $("#x10-msb"); m.hidden = !UI.ruler; m.setAttribute("aria-pressed", String(!!UI.meas)); measMode(); renderPlan(); sideCard(); });
    $("#x10-msb").addEventListener("click", e => { UI.meas = !UI.meas; saveUI(); e.currentTarget.setAttribute("aria-pressed", String(UI.meas)); measMode(); });
    calcInit();
    $("#x10-redo").addEventListener("click", redo);
    host.querySelectorAll("[data-td]").forEach(q => q.addEventListener("click", () => { UI.tdView = q.dataset.td; saveUI(); host.querySelectorAll("[data-td]").forEach(p => p.setAttribute("aria-pressed", String(p === q))); $("#x10-td").classList.toggle("mbv", UI.tdView === "mb"); if (UI.tdView === "mb") mbDraw(true); else { T3 = null; iso(); } }));
    divider($("#x10-dv"));
    planNav(); measMode();
    if (!window.__x10key) { window.__x10key = 1; document.addEventListener("keydown", onKey); }
    undoBtns();
    render();
  }
  // phóng to, thu nhỏ, kéo chỗ trống để di chuyển mặt bằng
  function planNav() {
    const sv = host.querySelector("#x10-svg");
    host.querySelector("#x10-zi").addEventListener("click", () => zoomAt(0.8));
    host.querySelector("#x10-zo").addEventListener("click", () => zoomAt(1.25));
    host.querySelector("#x10-zf").addEventListener("click", () => { VB = { ...VB0 }; setVB(); if (UI.ruler) { rulerNow(); measNow(); } });
    const cv = sv.closest(".cv"), nl = host.querySelector("#x10-nl");
    const showLock = () => { cv.classList.toggle("navlock", !!UI.navLock); nl.setAttribute("aria-pressed", String(!!UI.navLock)); nl.textContent = UI.navLock ? "🔒 Đã khoá khung" : "🔓 Đang mở khung"; };
    showLock();
    nl.addEventListener("click", () => { UI.navLock = !UI.navLock; saveUI(); showLock(); });
    sv.addEventListener("wheel", e => { if (UI.navLock) return; e.preventDefault(); svg = sv; const [x, y] = pt(e); zoomAt(e.deltaY < 0 ? 0.88 : 1.14, x, y); }, { passive: false });
    let pan = null;
    sv.addEventListener("pointerdown", e => { if (e.button > 1 || drag) return; svg = sv; if (e.button === 0 && UI.ruler && UI.meas) { measure(e); return; } if (e.button === 0 && (UI.navLock || e.shiftKey)) { marquee(e); return; } pan = { x: e.clientX, y: e.clientY, vx: VB.x, vy: VB.y, k: VB.w * PX / sv.getBoundingClientRect().width / PX }; sv.setPointerCapture(e.pointerId); sv.classList.add("panning"); if (sel || msel.size) { clearSel(); renderPlan(); sideCard(); hi3d(); } });
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
    const lb = dv.querySelector("#x10-dvl");
    const showLock = () => { dv.classList.toggle("locked", !!UI.dvLock); lb.setAttribute("aria-pressed", String(!!UI.dvLock)); lb.textContent = UI.dvLock ? "🔒" : "🔓"; lb.title = UI.dvLock ? "Vạch chia đang khoá: bấm để mở, rồi kéo đổi cỡ khung" : "Bấm để khoá vạch chia, giữ cỡ khung mặt bằng và 3D"; dv.setAttribute("aria-label", UI.dvLock ? "Vạch chia mặt bằng và 3D (đang khoá)" : "Kéo để đổi cỡ mặt bằng và 3D"); };
    showLock();
    lb.addEventListener("pointerdown", e => e.stopPropagation());
    lb.addEventListener("click", e => { e.stopPropagation(); UI.dvLock = !UI.dvLock; saveUI(); showLock(); });
    dv.addEventListener("pointerdown", e => { if (UI.dvLock || e.target.closest(".dvl")) return; st = { x: e.clientX, h: UI.planH2 }; dv.setPointerCapture(e.pointerId); e.preventDefault(); });
    dv.addEventListener("pointermove", e => { if (st) set(st.h + (e.clientX - st.x) * VB0.h / VB0.w); });
    const end = () => { if (st) { st = null; saveUI(); } };
    dv.addEventListener("pointerup", end); dv.addEventListener("pointercancel", end);
    dv.addEventListener("keydown", e => { if (UI.dvLock) return; if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); set(UI.planH2 + (e.key === "ArrowRight" ? 60 : -60)); saveUI(); } });
  }

  /* ---------- vẽ mặt bằng khu đất ---------- */
  const VB0 = { x: -1, y: 6.5, w: 90, h: 86 }, PX = 10;
  let VB = { ...VB0 };
  const setVB = () => { if (svg) svg.setAttribute("viewBox", `${VB.x * PX} ${VB.y * PX} ${VB.w * PX} ${VB.h * PX}`); };
  // phóng to quanh điểm (px, py) theo hệ mét; giữ tỉ lệ khung để mặt bằng không méo
  function zoomAt(k, px, py) {
    const nw = Math.max(12, Math.min(VB0.w * 1.6, VB.w * k)), r = nw / VB.w;
    if (px == null) { px = VB.x + VB.w / 2; py = VB.y + VB.h / 2; }
    VB = { x: px - (px - VB.x) * r, y: py - (py - VB.y) * r, w: nw, h: VB.h * r }; setVB();
    if (UI.ruler) raf("rl", () => { rulerNow(); measNow(); });
  }
  let svg, HT = 0.5; // HT: bề dày vùng bấm mép khối (m)
  function render() {
    renderPlan(); renderStack(); renderKho(); sideCard(); checksList(ISS); areaTable(); modelCard(); iso(); mbDraw();
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
    R(0, 0, 6, 104, { fill: "var(--road)" }); T("Lối Tây · xe cứu hỏa, xe giao sách", 4.6, 52, { transform: `rotate(-90 ${4.6 * PX} ${52 * PX})`, "font-size": 15 });
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


    // viền đỏ chỉ cho lỗi thật (chồng khối, lấn vùng xây dựng, đua quá 4 m); gợi ý mềm bấm trong danh sách mới tô
    ISS = check(); BAD = new Set(ISS.filter(i => !i.ok && i.hard).flatMap(i => i.ids || []));
    { let ppm = 0; try { ppm = svg.getScreenCTM().a * PX; } catch (e) { /* chưa gắn vào trang */ } HT = ppm > 0 ? Math.max(0.2, Math.min(1.2, 9 / ppm)) : 0.5; }
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
    for (const b of cur.sort((a, b) => outdoor(b) - outdoor(a) || a.f - b.f)) drawBlock(b);
    seams(cur);
    // khối tầng trên: viền chấm
    if (f) for (const b of P.filter(b => b.f > f)) { const g = el("g", { "pointer-events": "none", opacity: 0.6 }, svg); R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--ink)", "stroke-width": 1.6, "stroke-dasharray": "2 5" }, g); if (b.w * b.h >= 30) T(`T${b.f} · ${label(b)}`, b.x + b.w / 2, b.y + 2, { "font-size": 12 }, g); }
    // kích thước tổng: cả tầng (phía Bắc, Tây) và từng cụm khối liền nhau (phía Nam, Đông)
    el("g", { id: "x10-rl", "pointer-events": "none" }, svg); rulerNow();
    el("g", { id: "x10-dims", "pointer-events": "none" }, svg); dimsNow();
    // bàn nháp
    R(DRAFT.x0 - 0.5, DRAFT.y0, DRAFT.x1 - DRAFT.x0 + 1, DRAFT.y1 - DRAFT.y0, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5, "stroke-dasharray": "10 6", rx: 12 });
    T("Bàn nháp", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 2.2, { "font-size": 24, "font-weight": 800, fill: "var(--ink)" });
    T("đặt vài khối ra đây để xoay, đổi tỉ lệ, tách đôi", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 4.4, { "font-size": 16 });
    T("rồi kéo sang khu đất", (DRAFT.x0 + DRAFT.x1) / 2, DRAFT.y0 + 6.2, { "font-size": 16 });
    for (const b of S.blocks.filter(b => b.draft)) drawBlock(b);
    if (drag && drag.b && !onSite(drag.b) && !drag.b.draft) drawBlock(drag.b); // khối đang kéo từ kho
    el("g", { id: "x10-guides", "pointer-events": "none" }, svg);
    el("g", { id: "x10-ms", "pointer-events": "none" }, svg); measNow();
    // đưa khối đang chọn lên trên cùng
    for (const id of new Set([...msel, sel].filter(Boolean))) { const n = svg.querySelector(`g.blk[data-id="${CSS_ESC(id)}"]`); if (n) svg.insertBefore(n, svg.querySelector("#x10-seam")); }
  }
  // hành lang đã dán: xoá nét ở chỗ các phần áp vào nhau để thấy một hình liền
  function seams(L) {
    const old = svg.querySelector("#x10-seam"); if (old) old.remove();
    const g = el("g", { id: "x10-seam", "pointer-events": "none" }, svg), by = new Map();
    for (const b of L) if (b.link) { if (!by.has(b.link)) by.set(b.link, []); by.get(b.link).push(b); }
    for (const P of by.values()) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const a = P[i], c = P[j];
      for (const [p, q] of [[a.x + a.w, c.x], [c.x + c.w, a.x]]) if (Math.abs(p - q) < 0.06) { const y0 = Math.max(a.y, c.y), y1 = Math.min(a.y + a.h, c.y + c.h); if (y1 - y0 > 0.1) el("line", { x1: p * PX, x2: p * PX, y1: y0 * PX + 2, y2: y1 * PX - 2, stroke: col(a), "stroke-width": 4 }, g); }
      for (const [p, q] of [[a.y + a.h, c.y], [c.y + c.h, a.y]]) if (Math.abs(p - q) < 0.06) { const x0 = Math.max(a.x, c.x), x1 = Math.min(a.x + a.w, c.x + c.w); if (x1 - x0 > 0.1) el("line", { y1: p * PX, y2: p * PX, x1: x0 * PX + 2, x2: x1 * PX - 2, stroke: col(a), "stroke-width": 4 }, g); }
    }
  }
  // kích thước tổng và dòng chữ trên khung: vẽ lại riêng, nhanh khi đang kéo
  function dimsNow() {
    circLine();
    const f = curF(), cur = S.blocks.filter(b => onSite(b) && (!f || b.f === f));
    const pt = host.querySelector("#x10-pt"); if (pt) pt.textContent = (f ? `Đang xếp tầng ${f}` : "Đang xem cả các tầng") + (UI.dims && G.XDIM ? " · " + G.XDIM.text(cur, { cm: UI.ruler }) : "") + (msel.size > 1 ? ` · đang chọn ${msel.size} khối` : "");
    const g = svg && svg.querySelector("#x10-dims"); if (!g) return;
    g.innerHTML = ""; if (UI.dims && G.XDIM) G.XDIM.svg(g, cur, PX, { fs: 16, cm: UI.ruler });
  }
  // vẽ lại đúng một khối (khi đổi cỡ), giữ chỗ của nó trong thứ tự vẽ
  function redrawBlock(b) {
    if (!svg) return; const old = svg.querySelector(`g.blk[data-id="${CSS_ESC(b.id)}"]`); if (!old) return;
    const nx = old.nextSibling; old.remove(); drawBlock(b); const n = svg.lastChild; if (nx) svg.insertBefore(n, nx);
  }
  // việc nặng (kiểm tra, bảng, 3D dựng lại, mặt bằng chi tiết) làm sau khi tay dừng
  let heavyT = 0;
  function heavy(b, ms = 220) { clearTimeout(heavyT); heavyT = setTimeout(() => { if (drag && !drag.rs) return; renderPlan(); renderStack(); renderKho(); checksList(ISS); areaTable(); modelCard(); if (b) cardVals(b); iso(); mbDraw(); }, ms); }
  // 3D: đổi cỡ, dời khối có sẵn mà không dựng lại cả cảnh
  function update3d(b) {
    if (!T3) return; const o = T3.objs[b.id]; if (!o || !o.w0) return;
    o.grp.position.x = b.x; o.grp.position.z = b.y;
    const sx = b.w / o.w0, sz = b.h / o.h0;
    for (const m of [o.mesh, o.edges]) if (m) { m.scale.set(sx, 1, sz); m.position.x = b.w / 2; m.position.z = b.h / 2; }
    raf("d3", draw3);
  }
  function ghost(b, op) {
    const g = el("g", { "pointer-events": "none", opacity: op }, svg), x = b.x * PX, y = b.y * PX, w = b.w * PX, h = b.h * PX;
    el("rect", { x, y, width: w, height: h, fill: "var(--ink-2)", "fill-opacity": 0.06, stroke: "var(--ink-2)", "stroke-width": 2, "stroke-dasharray": "9 6" }, g);
    if (b.w * b.h >= 20) { const t = el("text", { x: x + 8, y: y + 18, "font-size": 14, fill: "var(--ink-2)", "font-family": "var(--mono, monospace)" }, g); t.textContent = `T${b.f} · ${label(b)}`; }
  }
  function drawBlock(b) {
    const g = el("g", { "data-id": b.id, class: "blk" + (hover === b.id ? " hv" : "") }, svg);
    const x = b.x * PX, y = b.y * PX, w = b.w * PX, h = b.h * PX, bad = BAD.has(b.id);
    el("rect", { class: "body", x, y, width: w, height: h, fill: col(b), opacity: outdoor(b) ? 0.7 : 0.96, stroke: isSel(b) ? "var(--accent)" : bad ? "var(--warn)" : "var(--ink)", "stroke-width": isSel(b) ? 5 : bad ? 3 : 1.3, "stroke-dasharray": outdoor(b) ? "6 4" : null }, g);
    if (b.kind === "park") { const pg = el("g", { "pointer-events": "none", opacity: 0.55 }, g), sw = b.pk === "car" ? 2.5 : 0.8; for (let xx = b.x + sw; xx < b.x + b.w - 0.1; xx += sw) el("line", { x1: xx * PX, y1: (b.y + 0.3) * PX, x2: xx * PX, y2: (b.y + Math.min(b.h, b.pk === "car" ? 5 : 2) - 0.1) * PX, stroke: "var(--ink)", "stroke-width": 1 }, pg); if (b.f === 1 && S.blocks.some(o => onSite(o) && o.f === 2 && isFloor(o) && ovl(o, b) > 1)) for (let xx = b.x + 4; xx < b.x + b.w - 1; xx += 8) for (let yy = b.y + 4; yy < b.y + b.h - 1; yy += 8) el("rect", { x: xx * PX - 3, y: yy * PX - 3, width: 6, height: 6, fill: "var(--ink)" }, pg); }
    if (msel.has(b.id)) el("rect", { x, y, width: w, height: h, fill: "var(--accent)", opacity: 0.16, "pointer-events": "none" }, g);
    if (FLASH.has(b.id)) el("rect", { x: x + 2, y: y + 2, width: Math.max(0, w - 4), height: Math.max(0, h - 4), fill: "none", stroke: "#c98a00", "stroke-width": 5, "stroke-dasharray": "10 6", "pointer-events": "none" }, g);
    if (mode === "all" && b.f >= 2) el("rect", { x, y, width: w, height: h, fill: "url(#x10h)", "pointer-events": "none" }, g);
    if (onSite(b) && b.kind === "room" && LIT.test(b.c)) { const lt = litOf(b); for (const [side, ok] of [["N", lt.N], ["S", lt.S]]) if (ok >= 1.2) el("line", { x1: x + 3, y1: side === "N" ? y + 2 : y + h - 2, x2: x + w - 3, y2: side === "N" ? y + 2 : y + h - 2, stroke: "#2f8fd6", "stroke-width": 4, opacity: 0.8, "pointer-events": "none" }, g); }
    // phần đua quá 4 m so với tầng ngay dưới (đề xuất 1)
    if (onSite(b) && b.f >= 2 && isFloor(b)) {
      const low = S.blocks.filter(o => onSite(o) && o.f === b.f - 1 && holds(o));
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
      if (b.kind === "park") t1.textContent = `Bãi ${PK[b.pk || "moto"][0]} · ~${pkN(b)} chỗ`;
      if (b.link) { const L = linkOf(b); if (L.length > 1) { const big = L.reduce((p, q) => q.w * q.h > p.w * p.h ? q : p); if (big !== b) t1.remove(); else t1.textContent = `Hành lang · ${nf(L.reduce((t, o) => t + o.w * o.h, 0), 0)} m²`; } }
      if (big) { const t2 = el("text", { x: x + w / 2, y: y + h / 2 + 13, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 14, fill: "var(--ink-2)", "pointer-events": "none" }, g); t2.textContent = `${nf(area(b), 0)} m² · ${nf(b.w, 1)} × ${nf(b.h, 1)}`; }
      if (UI.ruler && b.kind !== "park") {
        // cỡ mô hình 1:200: chữ ngang khi khối đủ rộng, chữ dọc khi khối hẹp mà dài
        const tx = `${cmT(b.w)} × ${cmT(b.h)} cm`, A = fs => ({ "text-anchor": "middle", "dominant-baseline": "middle", "font-size": fs, "font-weight": 700, fill: "var(--xdimC)", stroke: col(b), "stroke-width": 3, "paint-order": "stroke", "pointer-events": "none" });
        const fit = len => [14, 13, 12, 11, 10].find(fs => tx.length * 0.56 * fs <= len * PX - 6); // cỡ chữ lớn nhất còn nằm trong khối
        const fh = b.h >= 2.6 ? fit(b.w) : null, fv = !fh && b.w >= 1.4 ? fit(b.h * 0.55) : null;
        if (fh) { const t3 = el("text", { x: x + w / 2, y: y + h / 2 + (big ? 30 : 14), ...A(fh) }, g); t3.textContent = tx; }
        else if (fv) { const cy = y + h * 0.72, t3 = el("text", { x: x + w / 2, y: cy, transform: `rotate(-90 ${x + w / 2} ${cy})`, ...A(fv) }, g); t3.textContent = tx; }
      }
    }
    // mép khối: bấm giữ rồi kéo để đổi cỡ (phòng giữ diện tích; giữ Shift thì đổi cả diện tích trong ±10%)
    if (onSite(b) || b.draft) {
      const hw = Math.min(HT, b.w / 4), hh = Math.min(HT, b.h / 4);
      for (const [sd, rx, ry, rw, rh] of [["n", b.x + hw, b.y, b.w - 2 * hw, hh], ["s", b.x + hw, b.y + b.h - hh, b.w - 2 * hw, hh], ["w", b.x, b.y + hh, hw, b.h - 2 * hh], ["e", b.x + b.w - hw, b.y + hh, hw, b.h - 2 * hh]]) {
        const r = el("rect", { class: "hd " + (sd === "n" || sd === "s" ? "ns" : "ew"), x: rx * PX, y: ry * PX, width: Math.max(0, rw) * PX, height: Math.max(0, rh) * PX }, g);
        r.addEventListener("pointerdown", e => { e.stopPropagation(); startResize(e, b, sd); });
      }
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
  function snap(b, nx, ny, M, ex) {
    const others = S.blocks.filter(o => o !== b && !(ex && ex.has(o.id)) && (onSite(o) || (b.draft && o.draft)));
    // bắt góc kiểu AutoCAD: góc khối đang kéo trùng góc khối cùng tầng hoặc tầng ngay dưới, trên
    { let bc = null; const MC = M * 1.5, mine = [[0, 0], [b.w, 0], [0, b.h], [b.w, b.h]];
      for (const o of others) {
        if (!b.draft && Math.abs(o.f - b.f) > 1) continue;
        const w = o.f === b.f ? 0 : o.f === b.f - 1 ? 0.03 : 0.08;
        for (const [ox, oy] of [[o.x, o.y], [o.x + o.w, o.y], [o.x, o.y + o.h], [o.x + o.w, o.y + o.h]]) for (const [mx, my] of mine) {
          const dd = Math.hypot(ox - (nx + mx), oy - (ny + my)); if (dd <= MC && (!bc || dd + w < bc.s)) bc = { dx: ox - (nx + mx), dy: oy - (ny + my), s: dd + w, o, p: [ox, oy] };
        }
      }
      if (bc) {
        const x = nx + bc.dx, y = ny + bc.dy, o = bc.o, [px, py] = bc.p;
        return { x: +x.toFixed(3), y: +y.toFixed(3), c: bc, g: [{ x1: px, x2: px, y1: Math.min(y, o.y) - 1.5, y2: Math.max(y + b.h, o.y + o.h) + 1.5 }, { y1: py, y2: py, x1: Math.min(x, o.x) - 1.5, x2: Math.max(x + b.w, o.x + o.w) + 1.5 }, { mk: [px, py], t: `Góc ${label(o)}${o.f !== b.f ? " · tầng " + o.f : ""}` }] };
      }
    }
    let bx = null, by = null;
    const tryX = (d, t, o, w) => { const s = Math.abs(d) + w; if (Math.abs(d) <= M && (!bx || s < bx.s)) bx = { d, t, o, s }; };
    const tryY = (d, t, o, w) => { const s = Math.abs(d) + w; if (Math.abs(d) <= M && (!by || s < by.s)) by = { d, t, o, s }; };
    for (const o of others) {
      const w = o.f === b.f ? 0 : o.f === b.f - 1 ? 0.02 : 0.04; // ưu tiên khối cùng tầng, rồi tầng ngay dưới, rồi tầng trên
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
    for (const q of gs) {
      if (q.mq) { el("rect", { x: q.mq[0] * PX, y: q.mq[1] * PX, width: q.mq[2] * PX, height: q.mq[3] * PX, fill: "var(--accent)", "fill-opacity": 0.1, stroke: "var(--accent)", "stroke-width": 2, "stroke-dasharray": q.cross ? "8 5" : null }, g); continue; }
      if (q.mk) { const [x, y] = q.mk; el("rect", { x: x * PX - 9, y: y * PX - 9, width: 18, height: 18, fill: "none", stroke: "var(--x10Guide)", "stroke-width": 3 }, g); if (q.t) { const t = el("text", { x: x * PX + 14, y: y * PX - 14, "font-size": 15, "font-weight": 800, fill: "var(--x10Guide)", stroke: "var(--sheet)", "stroke-width": 4, "paint-order": "stroke" }, g); t.textContent = q.t; } continue; }
      el("line", { x1: q.x1 * PX, y1: q.y1 * PX, x2: q.x2 * PX, y2: q.y2 * PX, stroke: "var(--x10Guide)", "stroke-width": 2.5, "stroke-dasharray": "8 5" }, g);
    }
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
    for (let y = DRAFT.y0 + 7; y + b.h <= DRAFT.y1; y += 0.5) for (let x = DRAFT.x0; x + Math.min(b.w, DRAFT.x1 - DRAFT.x0) <= DRAFT.x1 + 0.01; x += 0.5) {
      const t = { x, y, w: b.w, h: b.h };
      if (!on.some(o => ovl(t, { x: o.x - 1, y: o.y - 1, w: o.w + 2, h: o.h + 2 }) > 0)) { b.x = x; b.y = y; b.draft = true; return; }
    }
    b.x = DRAFT.x0; b.y = DRAFT.y0 + 7; b.draft = true;
  }
  // thả khối: ra ngoài khu đất thì cất vào kho, còn lại giữ trong khu đất và đẩy khít
  function drop(b, wasStage) {
    const fromDraft = !!b.draft;
    dropIn(b, wasStage);
    if (isCirc(b) && onSite(b) && !b.draft && (wasStage || fromDraft) && circSum() > CIRC_MAX + 0.01) {
      if (fromDraft) toDraft(b); else toStage(b);
      circMsg(`Không đưa được khối này lên khu đất: giao thông sẽ thành ${nf(circSum() + b.w * b.h)}/${nf(CIRC_MAX)} m². Đã trả khối về ${fromDraft ? "bàn nháp" : "kho"}.`);
    }
  }
  function dropIn(b, wasStage) {
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    if (cx > DRAFT.x0 - 2 && cx < DRAFT.x1 + 4 && cy > -6 && cy < 110) {
      b.draft = true; b.x = b.w > DRAFT.x1 - DRAFT.x0 ? DRAFT.x0 : Math.max(DRAFT.x0, Math.min(DRAFT.x1 - b.w, b.x)); b.y = Math.max(DRAFT.y0 + 7, Math.min(DRAFT.y1 - b.h, b.y));
      b.x = +b.x.toFixed(2); b.y = +b.y.toFixed(2); return;
    }
    if (b.draft) { delete b.draft; b.f = mode === "all" ? 1 : +mode; }
    if (b.x > 46 || b.x + b.w > 53 || b.y > 106 || b.y + b.h < -4 || b.x + b.w < -6) { toStage(b); return; }
    b.x = Math.max(0, Math.min(41.5 - b.w, b.x)); b.y = Math.max(0, Math.min(104 - b.h, b.y));
    if (zoned(b)) zClamp(b);
    settle(b);
    if (zoned(b)) zClamp(b);
    b.x = +b.x.toFixed(2); b.y = +b.y.toFixed(2);
  }

  /* ---------- kéo thả trên mặt bằng ---------- */
  let drag = null;
  function pt(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [q.x / PX, q.y / PX]; }
  function startDrag(e, b) {
    if (e.button > 0) return;
    if (UI.ruler && UI.meas && svg && e.currentTarget && e.currentTarget.ownerSVGElement) return measure(e);
    e.preventDefault(); e.stopPropagation();
    if (!svg) return;
    const onPlan = onSite(b) || b.draft;
    if (onPlan && (e.shiftKey || e.ctrlKey || e.metaKey)) return pickToggle(e, b);
    if (onPlan && b.link && linkOf(b).length > 1 && !(msel.size > 1 && msel.has(b.id))) { msel.clear(); for (const o of linkOf(b)) msel.add(o.id); sel = b.id; renderPlan(); sideCard(); hi3d(); return startGroup(e, b, true); }
    if (onPlan && msel.size > 1 && msel.has(b.id)) return startGroup(e, b);
    msel.clear();
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
      d.ev = ev; raf("mv", () => {
        if (drag !== d || !d.ev) return;
        const [x, y] = pt(d.ev), s = snap(b, x - d.dx, y - d.dy, Math.max(0.3, Math.min(1.6, 10 / ppm())));
        b.x = s.x; b.y = s.y;
        // tầng 1: không ra lối xe cứu hỏa, quảng trường, bãi xe (kéo hẳn sang bờ sông thì mới ra bàn nháp, kho)
        const tf = b.draft || wasStage ? (mode === "all" ? 1 : +mode) : b.f;
        if (zoned(b, tf) && x < SITE.x1 + 3) { const x0 = b.x, y0 = b.y; zClamp(b); if (Math.abs(b.x - x0) > 1e-6 || Math.abs(b.y - y0) > 1e-6) s.g = [{ x1: b.x < x0 ? SITE.x1 : SITE.x0, x2: b.x < x0 ? SITE.x1 : SITE.x0, y1: SITE.y0, y2: SITE.y1 }].filter(() => Math.abs(b.x - x0) > 1e-6).concat(Math.abs(b.y - y0) > 1e-6 ? [{ y1: b.y < y0 ? SITE.y1 : SITE.y0, y2: b.y < y0 ? SITE.y1 : SITE.y0, x1: SITE.x0, x2: SITE.x1 }] : []); }
        if (d.node) d.node.setAttribute("transform", `translate(${(b.x - d.bx) * PX} ${(b.y - d.by) * PX})`);
        drawGuides(s.g); move3d(b);
      });
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

  // kéo mép khối để đổi cỡ
  function startResize(e, b, sd) {
    if (e.button > 0 || !svg) return;
    if (UI.ruler && UI.meas) return measure(e);
    e.preventDefault();
    sel = b.id;
    const o0 = { x: b.x, y: b.y, w: b.w, h: b.h, a: b.a }, room = b.kind === "room" && b.a > 0, hor = sd === "e" || sd === "w";
    const AL = room && briefA(b.c) ? aLim(b) : null;
    drag = { b, rs: sd };
    const cls = hor ? "rs-ew" : "rs-ns";
    renderPlan(); sideCard(); hi3d(); svg.classList.add(cls);
    const ppm = () => svg.getScreenCTM().a * PX;
    const others = S.blocks.filter(o => o !== b && (b.draft ? o.draft : onSite(o)));
    const lines = ax => {
      const L = [];
      for (const o of others) { const w = o.f === b.f ? 0 : 0.04; if (ax === "x") L.push([o.x, w, o], [o.x + o.w, w, o]); else L.push([o.y, w, o], [o.y + o.h, w, o]); }
      if (!b.draft) { if (ax === "x") { L.push([SITE.x0, 0.02, null], [SITE.x1, 0.02, null]); for (let v = 6; v <= 41.5; v += 8) L.push([v, 0.12, null]); } else { L.push([SITE.y0, 0.02, null], [SITE.y1, 0.02, null]); for (let v = 12; v <= 89; v += 8) L.push([v, 0.12, null]); } }
      return L;
    };
    const LX = lines("x"), LY = lines("y"), LB = blockers(b);
    const best = (L, v, M) => { let r = null; for (const [t, w, o] of L) { const dd = Math.abs(t - v); if (dd <= M && (!r || dd + w < r.s)) r = { t, s: dd + w, o }; } return r; };
    const guide = (ax, t, o) => { const box = o || (ax === "x" ? { x: SITE.x0, y: SITE.y0, w: 0, h: SITE.y1 - SITE.y0 } : { x: SITE.x0, y: SITE.y0, w: SITE.x1 - SITE.x0, h: 0 }); return ax === "x" ? { x1: t, x2: t, y1: Math.min(b.y, box.y) - 1.5, y2: Math.max(b.y + b.h, box.y + box.h) + 1.5 } : { y1: t, y2: t, x1: Math.min(b.x, box.x) - 1.5, x2: Math.max(b.x + b.w, box.x + box.w) + 1.5 }; };
    let moved = false;
    let lastEv = null;
    const move = ev => { if (!drag) return; moved = true; lastEv = ev; raf("rsm", () => { if (drag && lastEv) step(lastEv); }); };
    const step = ev => {
      const [px, py] = pt(ev), M = Math.max(0.2, Math.min(1.2, 10 / ppm())), free = !room || ev.shiftKey;
      const lo = hor ? o0.x : o0.y, hi = hor ? o0.x + o0.w : o0.y + o0.h, far = sd === "e" || sd === "s", L = hor ? LX : LY;
      const raw = hor ? px : py, base = hor ? o0.w : o0.h, other0 = hor ? o0.h : o0.w;
      let mn = 1.5, mx = 60;
      const capMx = isCirc(b) && onSite(b) && !b.draft ? Math.max(Math.min(base, 60), circRoom(b) / other0) : Infinity; if (capMx < mx) mx = capMx;
      if (room && !free) [mn, mx] = hor ? wRange(b) : hRange(b);
      else if (room && free && AL) { mn = Math.max(mn, AL.lo / other0); mx = Math.min(mx, AL.hi / other0); }
      const lenOf = edge => far ? edge - lo : hi - edge;
      let s = best(L, raw, M), len = clamp(lenOf(s ? s.t : raw), mn, mx);
      const atCap = capMx < 1e9 && lenOf(raw) > capMx + 0.05 && len >= capMx - 1e-6;
      if (s && Math.abs(lenOf(s.t) - len) > 1e-6) s = null;
      let perp = other0, s2 = null;
      if (room && !free) {
        perp = o0.a / len;
        if (!s) { // thử hút mép vuông góc (mép Nam khi kéo Đông/Tây, mép Đông khi kéo Bắc/Nam)
          const pb = hor ? o0.y : o0.x, c = best(hor ? LY : LX, pb + perp, M);
          if (c && c.t - pb > 0.5) { const l2 = o0.a / (c.t - pb); if (l2 >= mn && l2 <= mx) { perp = c.t - pb; len = l2; s2 = c; } }
        }
      }
      const fixP = s2 ? perp : null;
      const ap = t => { const pp = room && !free ? (fixP && Math.abs(t - len) < 1e-9 ? fixP : o0.a / t) : other0;
        if (hor) { b.w = R3(t); b.x = R3(far ? lo : hi - t); b.h = R3(pp); b.y = o0.y; } else { b.h = R3(t); b.y = R3(far ? lo : hi - t); b.w = R3(pp); b.x = o0.x; } };
      const fr = fitTo(b, LB, ap, base, len); // không đâm xuyên khối khác: dừng ở mép khối chặn
      if (fr.o) { s = null; s2 = null; }
      if (room && free) b.a = +(b.w * b.h).toFixed(2); else if (room) b.a = o0.a;
      const gs = [];
      if (s) gs.push(guide(hor ? "x" : "y", s.t, s.o));
      if (s2) gs.push(guide(hor ? "y" : "x", s2.t, s2.o));
      raf("rs", () => { redrawBlock(b); dimsNow(); drawGuides(gs); cardVals(b); update3d(b); const m = host.querySelector("#x10-snap"); if (m) m.innerHTML = fr.o ? cutTxt({ ...fr, b }) : atCap ? `<span style="color:var(--warn)">Chạm giới hạn giao thông ${nf(CIRC_MAX)} m²: không nới hành lang này thêm được.</span>` : ""; if (atCap) circMsg(`Giao thông đang ${nf(circSum())}/${nf(CIRC_MAX)} m²: không nới hành lang, thang thêm được.`); mbDraw(); });
    };
    const up = () => {
      if (!drag) return; drag = null;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      svg.classList.remove(cls); drawGuides([]);
      if (moved) keep();
      render();
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
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
    if (e.key === "Escape" && MEAS) { MEAS = null; measNow(); if (!sel && !msel.size) return; }
    if (e.key === "Escape" && (sel || msel.size)) { clearSel(); render(); return; }
    if (msel.size > 1) {
      const st = e.shiftKey ? 4 : 0.5, mv = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
      if (mv) { e.preventDefault(); const [dx, dy] = groupDelta(grp(), mv[0], mv[1]); for (const o of grp()) { o.x = +(o.x + dx).toFixed(3); o.y = +(o.y + dy).toFixed(3); } keep(); render(); }
      return;
    }
    if (!sel) return;
    const b = S.blocks.find(q => q.id === sel); if (!b) return;
    if ((e.key === "PageUp" || e.key === "PageDown") && onSite(b) && !outdoor(b)) {
      e.preventDefault(); const nfl = Math.max(1, Math.min(NF, b.f + (e.key === "PageUp" ? 1 : -1))); if (nfl === b.f) return;
      b.f = nfl; keep(); if (mode !== "all") { mode = String(nfl); host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === mode))); } render(); return;
    }
    const st = e.shiftKey ? 4 : 0.5, mv = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
    if (mv && !(document.activeElement && document.activeElement.id === "x10-dv")) { e.preventDefault(); const was = inZone(b); b.x += mv[0]; b.y += mv[1]; if (onSite(b) && zoned(b) && was) zClamp(b); keep(); render(); }
    else if (e.key === "r" || e.key === "R") { rotate(b); }
  }

  /* ---------- chọn nhiều khối ---------- */
  const editable = b => b.kind !== undefined && (b.draft || (onSite(b) && (curF() == null || b.f === curF())));
  function pickToggle(e, b) {
    if (sel && !msel.size) msel.add(sel);
    if (msel.has(b.id)) msel.delete(b.id); else msel.add(b.id);
    sel = msel.has(b.id) ? b.id : [...msel].pop() || null;
    if (msel.size === 1) { sel = [...msel][0]; msel.clear(); }
    renderPlan(); sideCard(); hi3d();
  }
  // bôi đen: kéo sang phải chỉ lấy khối nằm trọn trong khung, kéo sang trái lấy cả khối chạm khung (như AutoCAD)
  function marquee(e) {
    const [x0, y0] = pt(e), add = e.shiftKey, sv = svg; let r = null;
    sv.setPointerCapture && sv.setPointerCapture(e.pointerId);
    const move = ev => { const [x, y] = pt(ev); r = { x: Math.min(x0, x), y: Math.min(y0, y), w: Math.abs(x - x0), h: Math.abs(y - y0), cross: x < x0 }; raf("mq", () => drawGuides(r ? [{ mq: [r.x, r.y, r.w, r.h], cross: r.cross }] : [])); };
    const up = () => {
      sv.removeEventListener("pointermove", move); sv.removeEventListener("pointerup", up); sv.removeEventListener("pointercancel", up);
      drawGuides([]);
      if (!r || r.w * r.h < 0.3) { if (!add && (sel || msel.size)) { clearSel(); renderPlan(); sideCard(); hi3d(); } return; }
      const got = S.blocks.filter(b => editable(b) && (r.cross ? ovl(b, r) > 0 : b.x >= r.x && b.y >= r.y && b.x + b.w <= r.x + r.w && b.y + b.h <= r.y + r.h));
      if (!add) msel.clear(); else if (sel) msel.add(sel);
      for (const b of got) msel.add(b.id);
      sel = got.length ? got[got.length - 1].id : (msel.size ? [...msel].pop() : null);
      if (msel.size === 1) { sel = [...msel][0]; msel.clear(); }
      renderPlan(); sideCard(); hi3d();
    };
    sv.addEventListener("pointermove", move); sv.addEventListener("pointerup", up); sv.addEventListener("pointercancel", up);
  }
  const bbOf = L => { const x = Math.min(...L.map(o => o.x)), y = Math.min(...L.map(o => o.y)); return { x, y, w: Math.max(...L.map(o => o.x + o.w)) - x, h: Math.max(...L.map(o => o.y + o.h)) - y }; };
  // giới hạn độ dời của nhóm: khối tầng 1 không ra khỏi vùng xây dựng
  function groupDelta(L, dx, dy) {
    let lx = -1e9, hx = 1e9, ly = -1e9, hy = 1e9;
    for (const o of L) if (onSite(o) && zoned(o) && inZone(o)) { lx = Math.max(lx, SITE.x0 - o.x); hx = Math.min(hx, SITE.x1 - o.x - o.w); ly = Math.max(ly, SITE.y0 - o.y); hy = Math.min(hy, SITE.y1 - o.y - o.h); }
    return [clamp(dx, Math.min(lx, 0), Math.max(hx, 0)), clamp(dy, Math.min(ly, 0), Math.max(hy, 0))];
  }
  function startGroup(e, b, fresh) {
    const L = grp(), P0 = L.map(o => [o, o.x, o.y]), L0 = L.map(o => ({ ...o })), bb = bbOf(L), ex = new Set(L.map(o => o.id));
    const V = { ...bb, f: b.f, id: "__grp", kind: "circ", draft: L.every(o => o.draft) };
    const [mx, my] = pt(e), sx = e.clientX, sy = e.clientY, ppm = () => svg.getScreenCTM().a * PX;
    const nodes = L.map(o => [o, svg.querySelector(`g.blk[data-id="${CSS_ESC(o.id)}"]`)]);
    const d = drag = { b, group: true }; let moved = false, last = null, DX = 0, DY = 0;
    const step = ev => {
      const [x, y] = pt(ev), s = snap(V, bb.x + x - mx, bb.y + y - my, Math.max(0.3, Math.min(1.6, 10 / ppm())), ex);
      [DX, DY] = groupDelta(L0, s.x - bb.x, s.y - bb.y);
      for (const [o, x0, y0] of P0) { o.x = +(x0 + DX).toFixed(3); o.y = +(y0 + DY).toFixed(3); }
      for (const [o, n] of nodes) if (n) n.setAttribute("transform", `translate(${(o.x - (P0.find(p => p[0] === o)[1])) * PX} ${(o.y - (P0.find(p => p[0] === o)[2])) * PX})`);
      drawGuides(s.g); for (const o of L) move3d(o);
    };
    const move = ev => { if (drag !== d) return; if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 3) return; if (!moved) { moved = true; svg.classList.add("dragging"); } last = ev; raf("gm", () => { if (drag === d && last) step(last); }); };
    const up = () => {
      if (drag !== d) return; drag = null;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      svg.classList.remove("dragging"); drawGuides([]);
      if (!moved) { if (!fresh) { msel.clear(); sel = b.id; } render(); return; }
      keep(); render();
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  }
  function groupCard(box) {
    const L = grp(), bb = bbOf(L), a = L.reduce((t, o) => t + o.w * o.h, 0);
    box.innerHTML = `<h4>Đang chọn ${L.length} khối</h4>
<p>${L.map(o => `<b>${esc(label(o))}</b>${o.f ? " T" + o.f : ""}`).join(", ")}</p>
<p>Cộng ${nf(a, 1)} m² · khung bao rộng Đông – Tây <b>${nf(bb.w, 2)} m</b> × sâu Bắc – Nam <b>${nf(bb.h, 2)} m</b></p>
${UI.ruler ? (() => { const Z = L.filter(o => onSite(o) && !outdoor(o)).map(zOf), z0 = Z.length ? Math.min(...Z.map(z => z.z0)) : 0, z1 = Z.length ? Math.max(...Z.map(z => z.z1)) : 0; return `<p class="mcm">Mô hình 1:200: khung bao <b>${cmT(bb.w)} × ${cmT(bb.h)} cm</b>${Z.length ? `, cao <b>${cmT(z1 - z0, 3)} cm</b> (từ ${cmT(z0, 3)} tới ${cmT(z1, 3)} cm)` : ""} · góc Tây Bắc cách mép Tây khu đất ${cmT(bb.x)} cm, mép Bắc ${cmT(bb.y)} cm</p>`; })() : ""}
<p class="k">Kéo một khối trong nhóm để dời cả nhóm (tự bắt góc, bắt cạnh khối khác). Phím mũi tên dời 0,5 m, giữ Shift 4 m. Esc bỏ chọn. Shift + bấm để thêm, bớt khối.</p>
${(() => { const lk = L[0].link && L.every(o => o.link === L[0].link); const allC = L.every(o => o.kind === "circ"), sameR = L.every(o => o.kind === "room" && o.c === L[0].c && place(o) === place(L[0]));
  return `<div class="bar">${lk ? `<b>Hành lang dán ${L.length} phần</b><button type="button" class="btn" id="x10-gun">Tách ra từng khối</button>` : ""}${allC && !lk ? `<button type="button" class="btn pri" id="x10-gjoin">Dán thành 1 hành lang</button>` : ""}${sameR ? `<button type="button" class="btn pri" id="x10-gmerge">Gộp ${L.length} phần ${esc(L[0].c)} thành 1 khối</button>` : ""}</div>`; })()}
<div class="bar"><span class="k">Canh thẳng</span>${[["w", "Mép Tây"], ["e", "Mép Đông"], ["n", "Mép Bắc"], ["s", "Mép Nam"]].map(([k, t]) => `<button type="button" class="btn sm" data-al="${k}">${t}</button>`).join("")}<button type="button" class="btn" id="x10-desel">Bỏ chọn</button></div>`;
    box.querySelectorAll("[data-al]").forEach(q => q.addEventListener("click", () => {
      const k = q.dataset.al;
      for (const o of L) { if (k === "w") o.x = bb.x; if (k === "e") o.x = +(bb.x + bb.w - o.w).toFixed(3); if (k === "n") o.y = bb.y; if (k === "s") o.y = +(bb.y + bb.h - o.h).toFixed(3); }
      keep(); render();
    }));
    box.querySelector("#x10-desel").addEventListener("click", () => { clearSel(); render(); });
    const gj = box.querySelector("#x10-gjoin"); if (gj) gj.addEventListener("click", () => { const ok = L.every(o => circChain(o, L).length === L.length); if (!ok) { say("Các khối hành lang đang chọn chưa chạm nhau thành một dải liền; kéo cho chạm rồi dán."); return; } joinCirc(L); });
    const gu = box.querySelector("#x10-gun"); if (gu) gu.addEventListener("click", () => unjoin(L[0]));
    const gm = box.querySelector("#x10-gmerge"); if (gm) gm.addEventListener("click", () => merge(S.blocks.find(o => o.id === sel) || L[0], L));
  }

  /* ---------- máy tính ---------- */
  function calcEval(src) {
    const s = String(src).replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/√/g, "sqrt").replace(/(\d),(\d)/g, "$1.$2").replace(/\s+/g, "");
    let i = 0;
    const peek = () => s[i], eat = c => { if (s[i] === c) { i++; return true; } return false; };
    const num = () => { const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i)); if (!m) throw 0; i += m[0].length; return +m[0]; };
    const FN = { sqrt: Math.sqrt, can: Math.sqrt, sin: x => Math.sin(x * Math.PI / 180), cos: x => Math.cos(x * Math.PI / 180), tan: x => Math.tan(x * Math.PI / 180), abs: Math.abs, round: Math.round };
    const prim = () => {
      if (eat("(")) { const v = expr(); if (!eat(")")) throw 0; return v; }
      const m = /^[a-z]+/i.exec(s.slice(i));
      if (m) { const k = m[0].toLowerCase(); i += m[0].length; if (k === "pi") return Math.PI; if (!FN[k]) throw 0; if (eat("(")) { const v = expr(); if (!eat(")")) throw 0; return FN[k](v); } return FN[k](unary()); }
      return num();
    };
    const post = () => { let v = prim(); while (eat("%")) v /= 100; return v; };
    const unary = () => eat("-") ? -unary() : eat("+") ? unary() : post();
    const pow = () => { const b = unary(); return eat("^") ? Math.pow(b, pow()) : b; };
    const term = () => { let v = pow(); for (;;) { if (eat("*")) v *= pow(); else if (eat("/")) v /= pow(); else if (peek() === "(" || /[a-z]/i.test(peek() || "")) v *= pow(); else return v; } };
    const expr = () => { let v = term(); for (;;) { if (eat("+")) v += term(); else if (eat("-")) v -= term(); else return v; } };
    if (!s) return null;
    const v = expr(); if (i < s.length || !isFinite(v)) throw 0; return v;
  }
  const cf = v => (Math.round(v * 10000) / 10000).toLocaleString("vi-VN", { maximumFractionDigits: 4 });
  function calcInit() {
    let pn = document.getElementById("x10-calc");
    if (!pn) {
      pn = document.createElement("div"); pn.id = "x10-calc"; pn.className = "x10calc"; pn.setAttribute("role", "dialog"); pn.setAttribute("aria-label", "Máy tính");
      pn.innerHTML = `<div class="ch"><b>🧮 Máy tính</b><span class="k">kéo thanh này để dời</span><button type="button" class="cx" aria-label="Đóng máy tính">×</button></div>
<input id="x10-ce" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="vd 190,5 / 12,3 hoặc 8,5 * 13,65" aria-label="Phép tính">
<div class="cr" id="x10-cr" aria-live="polite">&nbsp;</div>
<div class="cins" id="x10-cins"></div>
<div class="ckp">${["7", "8", "9", "÷", "(", "4", "5", "6", "×", ")", "1", "2", "3", "−", "√", "0", ",", "%", "+", "^", "C", "⌫", "Ans", "=", "π"].map(k => `<button type="button" data-ck="${k}"${k === "=" ? ' class="eq"' : ""}>${k}</button>`).join("")}</div>
<ul class="chist" id="x10-ch"></ul>`;
      document.body.appendChild(pn);
      const inp = pn.querySelector("#x10-ce"), out = pn.querySelector("#x10-cr"), hist = pn.querySelector("#x10-ch");
      let ans = 0;
      const show = () => { try { const v = calcEval(inp.value.replace(/Ans/g, "(" + ans + ")").replace(/π/g, "pi")); out.innerHTML = v == null ? "&nbsp;" : "= <b>" + cf(v) + "</b>"; return v; } catch (e) { out.innerHTML = inp.value.trim() ? '<span style="color:var(--warn)">Phép tính chưa đúng</span>' : "&nbsp;"; return null; } };
      const done = () => { const v = show(); if (v == null) return; ans = v; const li = document.createElement("li"); li.innerHTML = `<button type="button">${esc(inp.value)} = <b>${cf(v)}</b></button>`; li.querySelector("button").addEventListener("click", () => { inp.value = cf(v); show(); inp.focus(); }); hist.prepend(li); while (hist.children.length > 8) hist.lastChild.remove(); inp.value = cf(v); show(); };
      const ins = t => { const a = inp.selectionStart ?? inp.value.length, z = inp.selectionEnd ?? a; inp.value = inp.value.slice(0, a) + t + inp.value.slice(z); inp.focus(); inp.setSelectionRange(a + t.length, a + t.length); show(); };
      inp.addEventListener("input", show);
      inp.addEventListener("keydown", e => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); done(); } if (e.key === "Escape") { inp.value = ""; show(); } });
      pn.querySelectorAll("[data-ck]").forEach(q => q.addEventListener("click", () => { const k = q.dataset.ck; if (k === "=") done(); else if (k === "C") { inp.value = ""; show(); inp.focus(); } else if (k === "⌫") { inp.value = inp.value.slice(0, -1); show(); inp.focus(); } else if (k === "√") ins("√("); else ins(k); }));
      pn.querySelector(".cx").addEventListener("click", () => { UI.calc = false; saveUI(); calcShow(); });
      pn.addEventListener("click", e => { const q = e.target.closest("[data-cv]"); if (q) ins(q.dataset.cv); });
      // kéo thanh tiêu đề để dời máy tính
      const hd = pn.querySelector(".ch");
      hd.addEventListener("pointerdown", e => { if (e.target.closest("button")) return; const r = pn.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top; hd.setPointerCapture(e.pointerId);
        const mv = ev => { pn.style.left = Math.max(0, Math.min(innerWidth - r.width, ev.clientX - ox)) + "px"; pn.style.top = Math.max(0, Math.min(innerHeight - 40, ev.clientY - oy)) + "px"; pn.style.right = "auto"; pn.style.bottom = "auto"; };
        const en = () => { hd.removeEventListener("pointermove", mv); hd.removeEventListener("pointerup", en); }; hd.addEventListener("pointermove", mv); hd.addEventListener("pointerup", en); });
    }
    if (!window.__x10calcTabs) { window.__x10calcTabs = 1; document.querySelectorAll(".tabs [data-tab]").forEach(t => t.addEventListener("click", () => setTimeout(calcShow, 80))); }
    const btn = host.querySelector("#x10-calcb"); if (btn) btn.addEventListener("click", () => { UI.calc = !UI.calc; saveUI(); calcShow(); if (UI.calc) document.getElementById("x10-ce").focus(); });
    calcShow();
  }
  function calcShow() {
    const pn = document.getElementById("x10-calc"); if (!pn) return;
    const vis = !!UI.calc && !!host.offsetParent; pn.hidden = !vis;
    const btn = host.querySelector("#x10-calcb"); if (btn) btn.setAttribute("aria-pressed", String(!!UI.calc));
    calcIns();
  }
  // chèn nhanh số của khối đang chọn
  function calcIns() {
    const c = document.getElementById("x10-cins"); if (!c) return;
    const b = S.blocks.find(q => q.id === sel);
    const v = x => cf(x);
    c.innerHTML = b ? `<span class="k">${esc(label(b))}:</span> <button type="button" data-cv="${v(b.w)}">rộng ${v(b.w)}</button><button type="button" data-cv="${v(b.h)}">sâu ${v(b.h)}</button><button type="button" data-cv="${v(b.w * b.h)}">diện tích ${v(b.w * b.h)}</button>${b.kind === "room" && briefA(b.c) ? `<button type="button" data-cv="${v(briefA(b.c))}">đề ${v(briefA(b.c))}</button>` : ""}` : `<span class="k">Chọn một khối để chèn nhanh rộng, sâu, diện tích.</span>`;
  }

  /* ---------- thao tác trên khối đang chọn ---------- */
  function rotate(b) { const cx = b.x + b.w / 2, cy = b.y + b.h / 2; [b.w, b.h] = [b.h, b.w]; b.x = Math.round((cx - b.w / 2) / SNAP) * SNAP; b.y = Math.round((cy - b.h / 2) / SNAP) * SNAP; keep(); render(); }
  // cỡ khối: phòng giữ diện tích (đổi rộng thì sâu tự đổi và ngược lại); khối phụ đổi tự do
  const R3 = v => Math.round(v * 1000) / 1000;
  function wRange(b) { if (b.kind !== "room") return [1.5, 42]; const lo = Math.max(2, b.a / 40), hi = Math.max(lo + 0.5, Math.min(42, b.a / 2)); return [lo, hi]; }
  function hRange(b) { if (b.kind !== "room") return [1.5, 60]; const [lo, hi] = wRange(b); return [b.a / hi, b.a / lo]; }
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  // khối cùng tầng mà khối b chưa chạm: đổi cỡ không được đâm xuyên qua chúng
  function blockers(b) { return S.blocks.filter(o => o !== b && o.f === b.f && (b.draft ? o.draft : onSite(o) && !o.draft)).concat(onSite(b) && !b.draft && zoned(b) ? ZW : []).filter(o => ovl(o, b) < 0.05); }
  const hit = (b, L) => L.find(o => ovl(o, b) > 0.05) || null;
  // đi từ t0 tới t1, dừng ở chỗ xa nhất mà khối chưa đâm vào khối khác; apply(t) đặt cỡ khối theo t
  function fitTo(b, L, apply, t0, t1) {
    apply(t1); const o = hit(b, L); if (!o) return { t: t1 };
    apply(t0); if (hit(b, L)) { apply(t1); return { t: t1 }; }
    let lo = t0, hi = t1; for (let i = 0; i < 32; i++) { const m = (lo + hi) / 2; apply(m); if (hit(b, L)) hi = m; else lo = m; }
    apply(lo); return { t: lo, o };
  }
  const cutTxt = r => r && r.o ? (r.o.kind === "zone" ? `<span style="color:var(--warn)">Chạm mép vùng xây dựng (lối xe cứu hỏa, quảng trường, bãi xe): khối tầng 1 dừng ở mép này (rộng ${nf(r.b.w, 2)} × sâu ${nf(r.b.h, 2)} m).</span>` : `<span style="color:var(--warn)">Chạm ${esc(label(r.o))}: đã dừng ở mép khối này (rộng ${nf(r.b.w, 2)} × sâu ${nf(r.b.h, 2)} m).</span>`) : "";
  const capW = (b, v, other) => isCirc(b) && onSite(b) && !b.draft ? Math.min(v, Math.max(b.w * b.h, circRoom(b)) / other) : v;
  function setW(b, w) { w = b.kind === "room" ? w : capW(b, +w, b.h); const [lo, hi] = wRange(b), ap = v => { b.w = R3(v); if (b.kind === "room") b.h = R3(b.a / b.w); }; return { ...fitTo(b, blockers(b), ap, b.w, clamp(+w, lo, hi)), b }; }
  function setH(b, h) { h = b.kind === "room" ? h : capW(b, +h, b.w); const [lo, hi] = hRange(b), ap = v => { b.h = R3(v); if (b.kind === "room") b.w = R3(b.a / b.h); }; return { ...fitTo(b, blockers(b), ap, b.h, clamp(+h, lo, hi)), b }; }
  // cỡ của các khối khác (cùng tầng, tầng trên, dưới) để hút theo khi kéo thanh tỉ lệ
  function dimTargets(b) {
    const out = [];
    for (const o of S.blocks) {
      if (o === b || outdoor(o) || !(onSite(o) || (b.draft && o.draft))) continue;
      if (!b.draft && Math.abs(o.f - b.f) > 1) continue;
      const pr = (o.f === b.f && gap(o, b) < 3 ? 0 : o.f === b.f ? 0.002 : 0.004);
      out.push({ ax: "w", v: o.w, o, pr }, { ax: "h", v: o.h, o, pr });
    }
    return out;
  }
  // tìm cỡ gần nhất trong tầm hút (tính theo phần trăm); trả về {w, h, t}
  function snapDim(b, ax, v, tol = 0.014) {
    const room = b.kind === "room", a = b.a;
    let best = null;
    for (const t of dimTargets(b)) {
      let w, h;
      if (ax === "w") { if (t.ax === "w") { w = t.v; h = room ? a / w : b.h; } else if (room) { h = t.v; w = a / h; } else continue; if (Math.abs(w - v) / v > tol) continue; }
      else { if (t.ax === "h") { h = t.v; w = room ? a / h : b.w; } else if (room) { w = t.v; h = a / w; } else continue; if (Math.abs(h - v) / v > tol) continue; }
      const d = Math.abs((ax === "w" ? w : h) - v) / v + t.pr;
      if (!best || d < best.d) best = { d, w, h, t };
    }
    return best;
  }
  const snapTxt = s => s ? `Khớp ${s.t.ax === "w" ? "rộng Đông – Tây" : "sâu Bắc – Nam"} với ${esc(label(s.t.o))}${s.t.o.f !== undefined ? " tầng " + s.t.o.f : ""}: ${nf(s.t.v, 2)} m` : "";
  // vẽ lại khi đang chỉnh cỡ: không dựng lại thẻ bên phải để thanh trượt, ô nhập không mất tay kéo
  function live(b) { raf("live", () => { if (onSite(b) || b.draft) { redrawBlock(b); dimsNow(); update3d(b); } cardVals(b); mbDraw(); }); heavy(b); }
  // mặt bằng chi tiết: dựng lại phương án nguồn (vd X.7) theo cỡ, vị trí khối đang sửa; cửa, nội thất, tuyến đi lấy theo phương án nguồn
  let mbT = 0;
  function mbDraw(now) {
    if (UI.tdView !== "mb" || !G.P6 || !G.P6.fromBlocks || !G.P6V) return;
    clearTimeout(mbT); mbT = setTimeout(mbNow, now ? 0 : 160);
  }
  function mbNow() {
    const svgM = host.querySelector("#x10-mb"); if (!svgM || !svgM.closest(".td").offsetParent) return;
    G.P6V.css();
    const src = (G.CHOT || []).find(p => p.code === S.from) || null;
    const bl = S.blocks.filter(b => onSite(b) && !b.draft && !outdoor(b));
    let plan, R;
    try { plan = G.P6.fromBlocks(src, bl); const lv = Math.min(plan.levels.length - 1, (curF() || 1) - 1); R = G.P6V.draw(svgM, plan, lv, { route: false, staff: false, dim: false }); svgM.style.minWidth = "0";
      const errs = R.err || [], t = host.querySelector("#x10-mbt");
      t.innerHTML = `<b>Tầng ${lv + 1}</b> · ${src ? `dựng lại <b>${esc(src.code)}</b> theo các khối đang sửa` : "dựng từ các khối đang xếp (chưa chọn ý tưởng nguồn nên chưa có cửa)"} · tổng sàn ${nf(R.total)} m² · giao thông ${nf(R.circ)} m²`;
      host.querySelector("#x10-mbs").innerHTML = errs.length ? `<b style="color:var(--warn)">${errs.length} lỗi</b> theo kiểm tra mặt bằng đầy đủ${src && src.__R ? ` (bản gốc ${src.code}: ${src.__R.err.length})` : ""} · bấm để xem` : `<b style="color:var(--accent)">Qua mọi kiểm tra mặt bằng</b>`;
      host.querySelector("#x10-mbl").innerHTML = errs.map(e => `<li>${esc(e)}</li>`).join("");
    } catch (e) { const t = host.querySelector("#x10-mbt"); if (t) t.textContent = "Chưa dựng được mặt bằng chi tiết: " + (e && e.message || e); }
  }
  // giới hạn diện tích cho một khối: cả nhóm phần cùng mã trong ±10% đề; khối đang ở khu đất thì không cho tổng sàn vượt 3.000 m²
  function aLim(b) {
    const T = briefA(b.c), sum = codeSum(b.c), room3000 = onSite(b) ? MAXF - floorTot() : Infinity;
    const lo = Math.max(1, b.a - (sum - (1 - TOL) * T)), hi = Math.max(b.a, b.a + Math.min((1 + TOL) * T - sum, room3000));
    return { T, sum, lo: Math.min(lo, b.a), hi, cap: room3000 };
  }
  function aSum(b) {
    const L = aLim(b), dev = (L.sum - L.T) / L.T * 100, n = S.blocks.filter(o => o.kind === "room" && o.c === b.c).length;
    return `${esc(b.c)}: ${n > 1 ? `tổng ${n} phần ${nf(L.sum, 1)}` : nf(L.sum, 1)} m² · đề ${nf(L.T)} m² (<b style="color:${Math.abs(dev) > 10.05 ? "var(--warn)" : "var(--accent)"}">${dev >= 0 ? "+" : ""}${nf(dev, 1)}%</b>) · khối này nhập được ${nf(L.lo, 1)}–${nf(L.hi, 1)} m²${L.cap < 1 ? `<br><b style="color:var(--warn)">Tổng sàn đã chạm 3.000 m²: không tăng thêm được, muốn tăng phải giảm phòng khác.</b>` : L.cap < 40 ? `<br>Tổng sàn còn ${nf(L.cap, 1)} m² tới mức 3.000 m².` : ""}`;
  }
  function setA(b, v) {
    const L = aLim(b), a = clamp(+v, L.lo, L.hi), kw = UI.keepDim === "w";
    const ap = t => { b.a = +t.toFixed(2); if (kw) b.h = R3(b.a / b.w); else b.w = R3(b.a / b.h); };
    return { ...fitTo(b, blockers(b), ap, b.a, a), b };
  }
  // tách một phòng thành hai phần cùng mã: phần mới có diện tích pa (mặc định một nửa), cắt theo cạnh dài, đặt sát phần cũ
  function split(b, pa) {
    const A = +b.a || b.w * b.h; pa = clamp(+pa || A / 2, 3, A - 3); const f = pa / A;
    const part = { ...b, id: root(b) + "·" + Date.now().toString(36).slice(-3) + (seq++), a: +pa.toFixed(2) };
    b.a = +(A - pa).toFixed(2);
    if (b.w >= b.h) { const w0 = b.w; b.w = R3(w0 * (1 - f)); part.w = R3(w0 * f); part.x = R3(b.x + b.w); }
    else { const h0 = b.h; b.h = R3(h0 * (1 - f)); part.h = R3(h0 * f); part.y = R3(b.y + b.h); }
    S.blocks.push(part); msel.clear(); sel = part.id; keep(); render();
    const t = `Đã tách ${label(b)}: phần cũ ${nf(b.a, 1)} m², phần mới ${nf(part.a, 1)} m² (đang chọn, kéo đi chỗ khác hoặc lên tầng khác bằng PageUp). Diện tích đề tính theo tổng các phần cùng mã; bấm "Gộp lại" để nhập lại.`;
    say(t); const m = host.querySelector("#x10-snap"); if (m) m.textContent = t;
  }
  const root = b => String(b.id).split("·")[0];
  const place = b => onSite(b) ? "s" + b.f : b.draft ? "d" : "k";
  const parts = b => b.kind === "room" ? S.blocks.filter(o => o.kind === "room" && o.c === b.c && place(o) === place(b)) : [b];
  // gộp: các phần ghép khít thành đúng một hình chữ nhật thì lấy đúng hình đó; còn không thì giữ chỗ, giữ chiều sâu khối đang chọn
  function merge(b, list) {
    const ps = list || parts(b); if (ps.length < 2) return;
    const a = ps.reduce((t, o) => t + (+o.a || o.w * o.h), 0), bb = bbOf(ps), sum = ps.reduce((t, o) => t + o.w * o.h, 0);
    // khít thành hình chữ nhật (cho phép lệch nhỏ khi xếp, ≤ 3% diện tích): lấy đúng khung bao, chỉnh sâu cho đủ diện tích
    const exact = bb.w * bb.h - sum <= Math.max(0.05 * ps.length, 0.03 * sum);
    if (exact) { b.x = +bb.x.toFixed(3); b.y = +bb.y.toFixed(3); b.w = +bb.w.toFixed(3); b.h = +(b.kind === "room" ? a / bb.w : bb.h).toFixed(3); b.a = +a.toFixed(2); }
    else { const h = b.h <= 8.01 ? b.h : Math.min(16, b.h); b.a = +a.toFixed(2); b.h = h; b.w = +(a / h).toFixed(2); b.x = bb.x; b.y = bb.y; }
    if (onSite(b) && zoned(b)) zClamp(b);
    if (onSite(b)) b.x = Math.max(0, Math.min(41.5 - Math.min(b.w, 41.5), b.x));
    if (b.kind !== "room") b.a = null;
    if (ps.some(o => o.top)) b.top = true;
    S.blocks = S.blocks.filter(o => o === b || !ps.includes(o));
    clearSel(); sel = b.id; keep(); render();
    say(exact ? `Đã gộp ${ps.length} phần thành một khối ${nf(b.w, 2)} × ${nf(b.h, 2)} m.` : `Đã gộp ${ps.length} phần (${nf(a, 1)} m²); các phần không khít thành hình chữ nhật nên khối giữ chỗ cũ, chỉnh lại tỉ lệ nếu cần.`);
  }
  /* ---------- hành lang dán nhiều khối thành một hình (chữ L, T, U, bậc thang…) ---------- */
  const touch = (a, b) => { const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y); return (ox >= -0.06 && oy >= 0.5) || (oy >= -0.06 && ox >= 0.5); };
  const linkOf = b => b.link ? S.blocks.filter(o => o.link === b.link) : [b];
  // các khối hành lang cùng tầng chạm nhau (nối tiếp) với khối b
  function circChain(b, pool) {
    const P = pool || S.blocks.filter(o => o.kind === "circ" && place(o) === place(b)), out = [b];
    for (let i = 0; i < out.length; i++) for (const o of P) if (!out.includes(o) && touch(out[i], o)) out.push(o);
    return out;
  }
  function joinCirc(list) {
    const L = list.filter(o => o.kind === "circ"); if (L.length < 2) return;
    const id = "L" + Date.now().toString(36).slice(-5) + (seq++);
    for (const o of S.blocks) if (o.link && L.some(q => q.link === o.link)) o.link = id;
    for (const o of L) o.link = id;
    msel.clear(); for (const o of linkOf(L[0])) msel.add(o.id); sel = L[0].id; keep(); render();
    say(`Đã dán ${linkOf(L[0]).length} khối thành một hành lang. Bấm vào hành lang để chọn cả hình, kéo để dời cả hình; kéo mép từng phần để đổi cỡ phần đó.`);
  }
  function unjoin(b) { const L = linkOf(b); for (const o of L) delete o.link; clearSel(); sel = b.id; keep(); render(); }
  function addHelper(k) {
    const h = HELP[k], id = k + "·" + Date.now().toString(36).slice(-4) + (seq++);
    if (isCirc({ kind: k }) && circRoom() < h.w * h.h) { circMsg(`Không thêm được ${h.n.split(":")[0].toLowerCase()}: giao thông đã ${nf(circSum())}/${nf(CIRC_MAX)} m², khối mới ${nf(h.w * h.h)} m² sẽ vượt giới hạn. Thu nhỏ hoặc bỏ bớt hành lang khác trước.`); return; }
    S.blocks.push({ id, c: k === "court" ? "SAN" : k === "park" ? "XE" : k === "circ" ? "circ" : "core", n: h.n, kind: k, w: h.w, h: h.h, x: 8, y: 14, f: k === "park" || mode === "all" ? 1 : +mode, a: null, ...(k === "park" ? { pk: "moto" } : {}) });
    sel = id; keep(); render();
  }
  // thanh trượt thang log: t 0–1000
  const t2w = (b, t) => { const [lo, hi] = wRange(b); return lo * Math.pow(hi / lo, t / 1000); };
  const w2t = (b, w) => { const [lo, hi] = wRange(b); return Math.round(1000 * Math.log(clamp(w, lo, hi) / lo) / Math.log(hi / lo)); };
  const t2h = (b, t) => { const [lo, hi] = hRange(b); return lo * Math.pow(hi / lo, t / 1000); };
  const h2t = (b, h) => { const [lo, hi] = hRange(b); return Math.round(1000 * Math.log(clamp(h, lo, hi) / lo) / Math.log(hi / lo)); };
  function infoHTML(b) {
    const room = b.kind === "room";
    const z = onSite(b) && !outdoor(b) ? zOf(b) : null;
    return `<p>${nf(area(b), 1)} m² · rộng Đông – Tây <b>${nf(b.w, 2)} m</b> × sâu Bắc – Nam <b>${nf(b.h, 2)} m</b>${onSite(b) ? ` · tầng ${b.f}` : b.draft ? " · đang ở bàn nháp" : " · đang ở kho"}</p>
${UI.ruler ? `<p class="mcm">Mô hình 1:200: <b>${cmT(b.w)} × ${cmT(b.h)} cm</b>${z ? `, cao <b>${cmT(z.h, 3)} cm</b> (đặt từ ${cmT(z.z0, 3)} cm)${z.up ? ", gồm 0,8 cm lõi nhô lên mái" : ""} · cách mép Tây khu đất ${cmT(b.x)} cm, mép Bắc ${cmT(b.y)} cm` : ""}</p>` : ""}
${room && LIT.test(b.c) ? `<p>${b.h <= 8 ? "Sâu ≤ 8 m: một mặt Bắc hoặc Nam là đủ sáng." : b.h <= 16 ? "Sâu 8–16 m: cần hở cả mặt Bắc và mặt Nam." : "Sâu quá 16 m: giữa phòng sẽ tối, nên đổi tỉ lệ hoặc tách đôi."}</p>` : ""}`;
  }
  // cập nhật số trên thẻ mà không dựng lại thẻ (giữ tay kéo, giữ ô đang gõ)
  function cardVals(b, force) {
    const box = host.querySelector("#x10-sel"); if (!box || sel !== b.id) return;
    const ae = document.activeElement, put = (id, v) => { const n = box.querySelector(id); if (n && (force || n !== ae)) n.value = v; };
    const inf = box.querySelector("#x10-inf"); if (inf) inf.innerHTML = infoHTML(b);
    const as = box.querySelector("#x10-asum"); if (as) as.innerHTML = aSum(b);
    put("#x10-nw", +b.w.toFixed(2)); put("#x10-nh", +b.h.toFixed(2)); put("#x10-na", +area(b).toFixed(1));
    const sw = box.querySelector("#x10-w"); if (sw && sw !== ae) sw.value = w2t(b, b.w);
    const sh = box.querySelector("#x10-h"); if (sh && sh !== ae) sh.value = h2t(b, b.h);
  }
  function sideCard() {
    const box = host.querySelector("#x10-sel"), b = S.blocks.find(q => q.id === sel);
    if (!box) return;
    calcIns();
    if (msel.size > 1) { groupCard(box); return; }
    if (!b) { box.innerHTML = `<h4>Chọn một khối</h4><p>Bấm vào khối trên mặt bằng hoặc trên 3D để xem và chỉnh. Phím mũi tên dịch 0,5 m (giữ Shift: 4 m), R xoay, PageUp/PageDown lên, xuống tầng.</p><p>Chọn nhiều khối: bôi đen bằng cách kéo chuột trên chỗ trống (kéo sang phải: chỉ lấy khối nằm trọn trong khung; kéo sang trái: lấy cả khối chạm khung), hoặc giữ Shift rồi bấm từng khối. Kéo một khối trong nhóm để dời cả nhóm.</p>`; return; }
    const k = (G.KHOI || []).find(q => q.c === b.c), room = b.kind === "room", hasA = room && briefA(b.c);
    const near = S.blocks.filter(o => o !== b && !outdoor(o) && (onSite(o) || (b.draft && o.draft)) && o.f === b.f && gap(o, b) < 3).sort((p, q) => gap(p, b) - gap(q, b)).slice(0, 4);
    const [wl, wh] = wRange(b), [hl, hh0] = hRange(b), chips = [];
    for (const o of near) { if (o.w >= wl - 0.01 && o.w <= wh + 0.01 && Math.abs(o.w - b.w) > 0.01) chips.push(`<button type="button" class="btn sm" data-sw="${o.w}">Rộng = ${esc(label(o))} (${nf(o.w, 2)})</button>`); if (o.h >= hl - 0.01 && o.h <= hh0 + 0.01 && Math.abs(o.h - b.h) > 0.01) chips.push(`<button type="button" class="btn sm" data-sh="${o.h}">Sâu = ${esc(label(o))} (${nf(o.h, 2)})</button>`); }
    box.innerHTML = `<h4>${esc(label(b))} · ${esc(b.n)}</h4>
<div class="scg"><div class="sci">
<div id="x10-inf">${infoHTML(b)}</div>
${k ? `<p style="color:var(--ink-2)">Nối với: ${esc(k.noi)}<br>Tránh: ${esc(k.tranh)}</p>` : ""}
</div><div class="scc">
<div class="dims">
  <label>Rộng Đông – Tây<span><input type="number" id="x10-nw" step="0.1" min="${wl.toFixed(2)}" max="${wh.toFixed(2)}" value="${+b.w.toFixed(2)}"> m</span></label>
  <label>Sâu Bắc – Nam<span><input type="number" id="x10-nh" step="0.1" min="${hl.toFixed(2)}" max="${hh0.toFixed(2)}" value="${+b.h.toFixed(2)}"> m</span></label>
  <label>Diện tích<span><input type="number" id="x10-na" step="0.5" ${hasA ? `min="${aLim(b).lo.toFixed(1)}" max="${aLim(b).hi.toFixed(1)}"` : ""} value="${+area(b).toFixed(1)}"> m²</span></label>
</div>
<p class="k">${room ? "Gõ số rồi bấm Enter. Đổi rộng thì sâu tự đổi (và ngược lại) để diện tích giữ đúng." : "Gõ số rồi bấm Enter. Khối phụ đổi rộng, sâu độc lập."}${hasA ? ` Đổi diện tích thì giữ <span class="seg" style="vertical-align:middle"><button type="button" data-kd="h" aria-pressed="${UI.keepDim !== "w"}">sâu</button><button type="button" data-kd="w" aria-pressed="${UI.keepDim === "w"}">rộng</button></span>.` : ""}</p>
${hasA ? `<p class="k" id="x10-asum">${aSum(b)}</p>` : ""}
<label class="k" for="x10-w">${room ? "Đổi tỉ lệ (diện tích giữ nguyên; tự hút khi trùng cỡ khối khác)" : "Rộng Đông – Tây (tự hút theo cỡ khối khác)"}</label><input type="range" id="x10-w" min="0" max="1000" step="1" value="${w2t(b, b.w)}">
${room ? "" : `<label class="k" for="x10-h">Sâu Bắc – Nam</label><input type="range" id="x10-h" min="0" max="1000" step="1" value="${h2t(b, b.h)}">`}
<p class="k snap" id="x10-snap"></p>
${chips.length ? `<div class="bar">${chips.join("")}</div>` : ""}
<div class="bar" style="margin-top:6px">
  <button type="button" class="btn" id="x10-rot">Xoay 90°</button>
  ${room ? `<button type="button" class="btn" id="x10-d8">Sâu 8 m</button>` : ""}
  ${b.kind === "park" ? `<span class="seg" aria-label="Loại xe">${Object.entries(PK).map(([k, [t, m]]) => `<button type="button" data-pk="${k}" aria-pressed="${(b.pk || "moto") === k}" title="${m} m² mỗi chỗ, gồm lối đi">${t}</button>`).join("")}</span><span class="k">~${pkN(b)} chỗ · ${nf(b.w * b.h)} m² (không tính vào tổng sàn)</span>` : ""}
  ${!outdoor(b) ? `<span class="seg">${[1, 2, 3].map(f => `<button type="button" data-f="${f}" aria-pressed="${b.f === f}">Tầng ${f}</button>`).join("")}</span>` : ""}
  ${room && (+b.a || b.w * b.h) >= 6 ? `<span class="spl"><button type="button" class="btn" id="x10-split" title="Tách thành hai phần cùng mã ${esc(b.c)}">Tách ra</button> phần mới <input type="number" id="x10-spa" step="0.5" min="3" max="${nf(Math.max(3, (+b.a || b.w * b.h) - 3), 1).replace(",", ".")}" value="${+((+b.a || b.w * b.h) / 2).toFixed(1)}" aria-label="Diện tích phần mới khi tách"> m²</span>` : ""}
  ${room && parts(b).length > 1 ? `<button type="button" class="btn" id="x10-merge" title="Gộp mọi phần ${esc(b.c)} cùng tầng thành một khối">Gộp lại (${parts(b).length} phần ${esc(b.c)})</button>` : ""}
  ${b.kind === "circ" && !b.link && circChain(b).length > 1 ? `<button type="button" class="btn" id="x10-join" title="Dán các khối hành lang đang chạm nhau thành một hình">Dán ${circChain(b).length} khối hành lang chạm nhau thành 1</button>` : ""}
  ${b.link && linkOf(b).length > 1 ? `<button type="button" class="btn" id="x10-unjoin">Tách hành lang ra từng khối</button>` : ""}
  ${room && LIT.test(b.c) ? `<button type="button" class="btn" id="x10-top" aria-pressed="${!!b.top}">${b.top ? "✓ " : ""}Lấy sáng mái hướng Bắc</button>` : ""}
  ${room ? (onSite(b) || b.draft ? `<button type="button" class="btn" id="x10-back">Cất vào kho</button>` : `<button type="button" class="btn" id="x10-todraft">Đưa ra bàn nháp</button>`) : `<button type="button" class="btn" id="x10-del">Xóa</button>`}
</div></div></div>`;
    const sn = box.querySelector("#x10-snap"), done = () => { keep(); render(); };
    // thanh trượt: thang log để đoạn giữa (gần vuông) mịn hơn; hút khi trùng cỡ khối khác
    const slide = (ax, t) => {
      const v = ax === "w" ? t2w(b, t) : t2h(b, t), s = snapDim(b, ax, v);
      const r = s ? (s.t.ax === "w" || b.kind !== "room" ? (ax === "w" ? setW(b, s.w) : setH(b, s.h)) : setH(b, s.h)) : ax === "w" ? setW(b, v) : setH(b, v);
      sn.innerHTML = r.o ? cutTxt(r) : snapTxt(s); live(b);
    };
    box.querySelector("#x10-w").addEventListener("input", e => slide("w", +e.target.value));
    box.querySelector("#x10-w").addEventListener("change", done);
    const hs = box.querySelector("#x10-h"); if (hs) { hs.addEventListener("input", e => slide("h", +e.target.value)); hs.addEventListener("change", done); }
    const num = (id, f) => { const n = box.querySelector(id); n.addEventListener("change", () => { const v = parseFloat(String(n.value).replace(",", ".")); if (!isFinite(v) || v <= 0) { cardVals(b, true); return; } const r = f(v); sn.innerHTML = cutTxt(r); keep(); live(b); cardVals(b, true); }); n.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); n.dispatchEvent(new Event("change")); n.select(); } }); };
    num("#x10-nw", v => setW(b, v));
    num("#x10-nh", v => setH(b, v));
    num("#x10-na", v => hasA ? setA(b, v) : setW(b, v / b.h));
    box.querySelectorAll("[data-kd]").forEach(q => q.addEventListener("click", () => { UI.keepDim = q.dataset.kd; saveUI(); box.querySelectorAll("[data-kd]").forEach(p => p.setAttribute("aria-pressed", String(p === q))); }));
    box.querySelectorAll("[data-sw]").forEach(q => q.addEventListener("click", () => { const r = setW(b, +q.dataset.sw); done(); const m = host.querySelector("#x10-snap"); if (m) m.innerHTML = cutTxt(r); }));
    box.querySelectorAll("[data-sh]").forEach(q => q.addEventListener("click", () => { const r = setH(b, +q.dataset.sh); done(); const m = host.querySelector("#x10-snap"); if (m) m.innerHTML = cutTxt(r); }));
    box.querySelector("#x10-rot").addEventListener("click", () => rotate(b));
    const d8 = box.querySelector("#x10-d8"); if (d8) d8.addEventListener("click", () => { const r = setH(b, 8); done(); const m = host.querySelector("#x10-snap"); if (m) m.innerHTML = cutTxt(r); });
    box.querySelectorAll("[data-f]").forEach(q => q.addEventListener("click", () => { b.f = +q.dataset.f; keep(); if (mode !== "all" && onSite(b)) { mode = String(b.f); host.querySelectorAll("[data-m]").forEach(p => p.setAttribute("aria-pressed", String(p.dataset.m === mode))); } render(); }));
    box.querySelectorAll("[data-pk]").forEach(q => q.addEventListener("click", () => { b.pk = q.dataset.pk; keep(); render(); }));
    const tp = box.querySelector("#x10-top"); if (tp) tp.addEventListener("click", () => { b.top = !b.top; keep(); render(); });
    const mg = box.querySelector("#x10-merge"); if (mg) mg.addEventListener("click", () => merge(b));
    const jn = box.querySelector("#x10-join"); if (jn) jn.addEventListener("click", () => joinCirc(circChain(b)));
    const uj = box.querySelector("#x10-unjoin"); if (uj) uj.addEventListener("click", () => unjoin(b));
    const sp = box.querySelector("#x10-split"); if (sp) sp.addEventListener("click", () => split(b, parseFloat(String((box.querySelector("#x10-spa") || {}).value || "").replace(",", "."))));
    const bk = box.querySelector("#x10-back"); if (bk) bk.addEventListener("click", () => { toStage(b); keep(); render(); });
    const td = box.querySelector("#x10-todraft"); if (td) td.addEventListener("click", () => { toDraft(b); keep(); render(); });
    const dl = box.querySelector("#x10-del"); if (dl) dl.addEventListener("click", () => { S.blocks = S.blocks.filter(q => q !== b); sel = null; keep(); render(); });
  }

  /* ---------- kiểm tra nhanh (gợi ý; kiểm tra đầy đủ làm khi Claude dựng mặt bằng) ---------- */
  function check() {
    const P = S.blocks.filter(onSite), out = [], rooms = P.filter(b => b.kind === "room");
    const add = (ok, t, ids, hard) => out.push({ ok, t, ids, hard: !!hard });
    const placed = new Set(rooms.map(b => b.c)), all = new Set(S.blocks.filter(b => b.kind === "room").map(b => b.c));
    add(placed.size === all.size, `Đã đặt ${placed.size}/${all.size} loại khối lên khu đất`);
    { const offA = [...new Set(S.blocks.filter(b => b.kind === "room" && briefA(b.c)).map(b => b.c))].filter(c => Math.abs(codeSum(c) / briefA(c) - 1) > TOL + 0.005);
      add(!offA.length, offA.length ? `Diện tích lệch quá ±10% so với đề: ${offA.map(c => `${c} ${nf(codeSum(c))}/${nf(briefA(c))} m²`).join(", ")}` : "Diện tích từng phòng trong ±10% đề", S.blocks.filter(b => offA.includes(b.c)).map(b => b.id));
      const tf = floorTot(); add(tf <= MAXF + 0.5, `Tổng sàn ${nf(tf)} m² ${tf <= MAXF + 0.5 ? "≤" : ">"} 3.000 m²`);
      const cs = circSum(); add(cs <= CIRC_MAX + 0.5, cs <= CIRC_MAX + 0.5 ? `Giao thông (hành lang, sảnh, thang) ${nf(cs)}/${nf(CIRC_MAX)} m², còn ${nf(CIRC_MAX - cs)} m²` : `Giao thông (hành lang, sảnh, thang) ${nf(cs)} m², vượt dự trù ${nf(CIRC_MAX)} m² của đề ${nf(cs - CIRC_MAX)} m²: đang khóa thêm và nới hành lang, cần thu nhỏ hoặc bỏ bớt`, [], true); }
    const fl = P.filter(isFloor), ov = [];
    for (let i = 0; i < fl.length; i++) for (let j = i + 1; j < fl.length; j++) if (fl[i].f === fl[j].f && ovl(fl[i], fl[j]) > 0.3) ov.push([fl[i], fl[j]]);
    add(!ov.length, ov.length ? `Khối chồng lên nhau: ${ov.slice(0, 4).map(([a, b]) => `${label(a)} – ${label(b)}`).join(", ")}` : "Không có khối chồng lên nhau", ov.flat().map(b => b.id), true);
    // lấn dưới 0,15 m (sai số khi xếp) không tính là lỗi
    const outB = P.filter(b => !outdoor(b) && (b.x < SITE.x0 - 0.15 || b.y < SITE.y0 - 0.15 || b.x + b.w > SITE.x1 + 0.15 || b.y + b.h > SITE.y1 + 0.15));
    add(!outB.length, outB.length ? `Khối lấn ra lối Tây, quảng trường, bãi xe hoặc bờ sông: ${outB.map(b => label(b) + " T" + b.f).join(", ")}` : "Mọi khối nằm trong vùng xây dựng", outB.map(b => b.id), true);
    // tầng trên phải có chỗ đỡ: phần cách mép khối tầng dưới quá 4 m là đua cần cột
    for (const b of fl.filter(b => b.f >= 2)) {
      const low = P.filter(o => o.f === b.f - 1 && holds(o)), rs = runs(b, (x, y) => !low.some(o => inside(o, x, y)) && (low.length ? Math.min(...low.map(o => dpt(o, x, y))) : 99) > OH), bad = rs.reduce((t, r) => t + r[2] * r[3], 0);
      const hang = b.w * b.h - low.reduce((s, o) => s + ovl(b, o), 0);
      if (hang > 0.5) add(bad < 0.5, bad < 0.5 ? `${label(b)} tầng ${b.f} đua ra ngoài tầng ${b.f - 1} không quá 4 m` : `${label(b)} tầng ${b.f} có ${nf(bad)} m² đua quá 4 m: cần cột chống (sọc đỏ)`, bad >= 0.5 ? [b.id] : [], true);
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
  function checksList(issues) {
    const u = host.querySelector("#x10-chk"); if (!u) return;
    u.innerHTML = issues.map((i, k) => `<li class="${i.ok ? "ok" : i.hard ? "no" : "soft"}">${!i.ok && (i.ids || []).length ? `<button type="button" class="lnk" data-ik="${k}" title="Bấm để tô các khối liên quan">${esc(i.t)}</button>` : esc(i.t)}</li>`).join("");
    u.querySelectorAll("[data-ik]").forEach(q => q.addEventListener("click", () => { FLASH = new Set(issues[+q.dataset.ik].ids || []); clearTimeout(flashT); renderPlan(); flashT = setTimeout(() => { FLASH = new Set(); renderPlan(); }, 3500); }));
  }
  function areaTable() {
    const box = host.querySelector("#x10-area"); if (!box) return;
    const P = S.blocks.filter(onSite).filter(isFloor), f = n => P.filter(b => b.f === n).reduce((s, b) => s + b.w * b.h, 0);
    const z = c => P.filter(b => b.kind === "room" && b.c[0] === c).reduce((s, b) => s + area(b), 0), brief = { A: 270, B: 1110, C: 260, D: 300, E: 280 };
    const tot = [1, 2, 3].reduce((t, n) => t + f(n), 0);
    const rm = P.filter(b => b.kind === "room").reduce((s, b) => s + b.w * b.h, 0), gt = tot - rm;
    box.innerHTML = `<table><tr><th>Nhóm</th><th class="n">Đã đặt</th><th class="n">Đề</th></tr>${Object.keys(brief).map(c => `<tr><td>${c}</td><td class="n">${nf(z(c))}</td><td class="n">${nf(brief[c])}</td></tr>`).join("")}
<tr><td><b>Cộng các phòng</b></td><td class="n"><b>${nf(rm)}</b></td><td class="n">2.220</td></tr>
<tr><td>Thang, sảnh, hành lang đã vẽ</td><td class="n"><b style="color:${gt > CIRC_MAX ? "var(--warn)" : "inherit"}">${nf(gt)}</b></td><td class="n">≤ ${nf(CIRC_MAX)}</td></tr>
${[1, 2, 3].filter(n => n === 1 || f(n) > 0).map(n => `<tr><td>Tầng ${n} (sàn)</td><td class="n">${nf(f(n))}</td><td></td></tr>`).join("")}
<tr><td><b>Tổng sàn</b></td><td class="n"><b style="color:${tot > 3000 ? "var(--warn)" : "inherit"}">${nf(tot)}</b></td><td class="n">≤ 3.000</td></tr>
${(() => { const pk = S.blocks.filter(b => onSite(b) && b.kind === "park"); return pk.length ? Object.keys(PK).filter(k => pk.some(b => (b.pk || "moto") === k)).map(k => `<tr><td>Bãi ${PK[k][0]} (không tính sàn)</td><td class="n">~${pk.filter(b => (b.pk || "moto") === k).reduce((t, b) => t + pkN(b), 0)} chỗ</td><td></td></tr>`).join("") : ""; })()}</table>
<p class="st">Đề bài: 2.220 m² cho 24 phòng cộng 780 m² dự trù cho giao thông chung, tường và cấu kiện, tổng tối đa 3.000 m². Tổng sàn ở đây tính các khối đã đặt (phòng, thang, sảnh, hành lang). Giao thông đã vẽ ${gt > CIRC_MAX ? `vượt ${nf(gt - CIRC_MAX)} m² so với 780 m²: trang đang khóa không cho thêm hay nới hành lang, thang` : `còn ${nf(CIRC_MAX - gt)} m² trong 780 m²`}; lưu ý 780 m² của đề còn gồm cả tường, cấu kiện. Còn khoảng ${nf(Math.max(0, 3000 - tot))} m² tới giới hạn 3.000 m²${rm < 2220 * 0.97 ? `; các phòng đang nhỏ hơn đề ${nf(2220 - rm)} m²` : ""}.</p>`;
  }

  /* ---------- khối 3D dự phòng bằng SVG (khi trình duyệt không chạy được WebGL) ---------- */
  const VIEW = { yaw: 35, pitch: 32, zoom: 1, tx: 24, tz: 52, pan: false };
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
    for (const b of S.blocks.filter(onSite)) { if (outdoor(b)) continue; const off = (b.f - 1) * UI.explode, z0 = TOP[b.f - 1] + off, z1 = TOP[b.f] + off; vols.push({ b, z0, z1, d: depth(b.x + b.w / 2, b.y + b.h / 2, (z0 + z1) / 2) }); }
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
      const panIt = e.button === 1 || e.button === 2 || e.ctrlKey || e.metaKey || e.altKey || VIEW.pan;
      if (panIt) { st = { k: "pan", x: e.clientX, y: e.clientY, tx: VIEW.tx, tz: VIEW.tz }; cv.style.cursor = "move"; e.preventDefault(); return; }
      const id = e.button === 0 && !e.shiftKey ? hit(e) : null, b = id && S.blocks.find(q => q.id === id);
      if (b) {
        sel = b.id; let rebuilt = false;
        if (mode !== "all" && String(b.f) !== mode && !outdoor(b)) { mode = String(b.f); host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === mode))); render(); rebuilt = true; }
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
      if (st.k === "pan") {
        // kéo cảnh theo tay: sang phải thì cảnh sang phải, kéo xuống thì tiến về phía trước
        const yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, d = 118 / VIEW.zoom, Hc = cv.clientHeight || 500;
        const k = 2 * d * Math.tan(16 * Math.PI / 180) / Hc, dx = e.clientX - st.x, dy = e.clientY - st.y, f = 1 / Math.max(0.35, Math.sin(pr));
        VIEW.tx = Math.max(-40, Math.min(110, st.tx - Math.cos(yr) * dx * k - Math.sin(yr) * dy * k * f));
        VIEW.tz = Math.max(-30, Math.min(140, st.tz + Math.sin(yr) * dx * k - Math.cos(yr) * dy * k * f));
        raf("d3", draw3); return;
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
      const o = T3.objs[id], on = id === sel || msel.has(id), hv = id === hover;
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
      if (outdoor(b)) {
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
      T3.objs[b.id] = { grp, mesh, edges, edgeCol: ec, b, w0: b.w, h0: b.h };
    }
    // kích thước tổng trong 3D: tầng đang xếp (ở cao độ sàn tầng đó) hoặc cả nhà (trên mặt đất)
    if (UI.dims && G.XDIM) { const fl = f || null, bl = S.blocks.filter(b => onSite(b) && (!fl || b.f === fl)); G.XDIM.three(THREE, g, bl, fl ? FH[fl] + (fl - 1) * UI.explode + 0.12 : 0.3, { ink: inkHex, cl: cssCol("var(--xdimC, #0e7490)", scope) || "#0e7490", halo: cssCol("var(--sheet)", scope) }); }
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
    { const sc = host.querySelector("#x10-sel"); if (sc) sc.style.maxHeight = planH && UI.layout === "split" && window.innerWidth > 900 ? Math.max(200, planH - H - 14) + "px" : ""; }
    T3.r.setSize(W, H, false); T3.r.domElement.style.height = H + "px"; T3.cam.aspect = W / H; T3.cam.updateProjectionMatrix();
    const yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, d = 118 / VIEW.zoom, tx = VIEW.tx, tz = VIEW.tz, ty = 3 + UI.explode;
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

  /* ---------- thước 1:200, kéo để đo, bảng cắt mô hình (bạn yêu cầu 11/11/2026) ---------- */
  const ppmNow = () => { try { return svg.getScreenCTM().a * PX || 10; } catch (e) { return 10; } };
  function measMode() { const s = host.querySelector("#x10-svg"); if (s) s.closest(".cv").classList.toggle("measuring", !!(UI.ruler && UI.meas)); measNow(); }
  // thước chia sẵn: mép Bắc và mép Tây vùng xây dựng; số 0 ở góc Tây Bắc khu đất; số ghi cm mô hình
  function rulerNow() {
    const g = svg && svg.querySelector("#x10-rl"); if (!g) return; g.innerHTML = ""; if (!UI.ruler) return;
    const ppm = ppmNow(), u = PX / ppm, fs = 11.5 * u, sw = u, bw = 30 * u;
    const minor = ppm * 0.2 >= 4 ? 0.2 : 1, lab = ppm * 2 >= 30 ? 2 : ppm * 4 >= 30 ? 4 : 10, isM = (v, k) => Math.abs(v / k - Math.round(v / k)) < 1e-6;
    const T = (t, a) => { const e = el("text", { "font-size": fs, "font-family": "var(--mono, monospace)", fill: "var(--ink)", ...a }, g); e.textContent = t; return e; };
    // thước ngang (Đông – Tây) dọc mép Bắc vùng xây dựng
    const yE = SITE.y0 * PX;
    el("rect", { x: 0, y: yE - bw, width: 41.5 * PX, height: bw, fill: "var(--sheet)", "fill-opacity": 0.93, stroke: "var(--ink-2)", "stroke-width": sw }, g);
    for (let i = 0; i * minor <= 41.5 + 1e-6; i++) { const m = +(i * minor).toFixed(3), X = m * PX, L = (isM(m, 2) ? 12 : isM(m, 1) ? 8 : 4) * u; el("line", { x1: X, y1: yE, x2: X, y2: yE - L, stroke: "var(--ink)", "stroke-width": isM(m, 2) ? sw * 1.3 : sw * 0.8 }, g); if (isM(m, lab)) T(nf(m / 2, 0), { x: X, y: yE - 15 * u, "text-anchor": "middle" }); }
    // thước dọc (Bắc – Nam) dọc mép Tây vùng xây dựng
    const xE = SITE.x0 * PX;
    el("rect", { x: xE - bw, y: yE, width: bw, height: (104 - SITE.y0) * PX, fill: "var(--sheet)", "fill-opacity": 0.93, stroke: "var(--ink-2)", "stroke-width": sw }, g);
    for (let i = Math.round(SITE.y0 / minor); i * minor <= 104 + 1e-6; i++) { const m = +(i * minor).toFixed(3), Y = m * PX, L = (isM(m, 2) ? 12 : isM(m, 1) ? 8 : 4) * u; el("line", { x1: xE, y1: Y, x2: xE - L, y2: Y, stroke: "var(--ink)", "stroke-width": isM(m, 2) ? sw * 1.3 : sw * 0.8 }, g); if (isM(m, lab) && m > SITE.y0) T(nf(m / 2, 0), { x: xE - 14 * u, y: Y, "text-anchor": "end", "dominant-baseline": "middle" }); }
    // khung bao nhóm khối đang chọn, ghi m và cm
    const L = grp().filter(o => onSite(o) || o.draft);
    if (L.length > 1) {
      const bb = bbOf(L), c = "var(--accent)", off = 1.3, tk = 5 * u, gg = el("g", {}, g);
      const dim = (x1, y1, x2, y2, t, vert) => {
        el("line", { x1: x1 * PX, y1: y1 * PX, x2: x2 * PX, y2: y2 * PX, stroke: c, "stroke-width": 2 * u }, gg);
        for (const [x, y] of [[x1, y1], [x2, y2]]) el("line", { x1: x * PX - tk, y1: y * PX + tk, x2: x * PX + tk, y2: y * PX - tk, stroke: c, "stroke-width": 2.5 * u }, gg);
        const mx = (x1 + x2) / 2 * PX, my = (y1 + y2) / 2 * PX, e = el("text", { x: vert ? mx - 8 * u : mx, y: vert ? my : my - 8 * u, "text-anchor": "middle", "font-size": 14 * u, "font-weight": 800, fill: c, stroke: "var(--sheet)", "stroke-width": 4 * u, "paint-order": "stroke", transform: vert ? `rotate(-90 ${mx - 8 * u} ${my})` : null }, gg);
        e.textContent = t;
      };
      dim(bb.x, bb.y - off, bb.x + bb.w, bb.y - off, `nhóm ${nf(bb.w, 2)} m = ${cmT(bb.w)} cm`);
      dim(bb.x - off, bb.y, bb.x - off, bb.y + bb.h, `nhóm ${nf(bb.h, 2)} m = ${cmT(bb.h)} cm`, true);
      el("rect", { x: bb.x * PX, y: bb.y * PX, width: bb.w * PX, height: bb.h * PX, fill: "none", stroke: c, "stroke-width": 1.5 * u, "stroke-dasharray": `${6 * u} ${4 * u}` }, gg);
    }
  }
  // kéo để đo: bắt mép, góc khối (tầng đang xếp và tầng ngay dưới), mép vùng xây dựng; gần ngang, gần dọc thì tự thẳng (giữ Alt để đo xiên)
  function measSnap(x, y, tol) {
    const f = curF(), L = S.blocks.filter(b => b.draft || (onSite(b) && (!f || b.f === f || b.f === f - 1)));
    let bx = null, by = null, ex = tol, ey = tol;
    for (const b of L) {
      if (y > b.y - tol && y < b.y + b.h + tol) for (const v of [b.x, b.x + b.w]) { const k = Math.abs(v - x); if (k < ex) { ex = k; bx = v; } }
      if (x > b.x - tol && x < b.x + b.w + tol) for (const v of [b.y, b.y + b.h]) { const k = Math.abs(v - y); if (k < ey) { ey = k; by = v; } }
    }
    for (const v of [0, SITE.x0, SITE.x1]) { const k = Math.abs(v - x); if (k < ex) { ex = k; bx = v; } }
    for (const v of [0, SITE.y0, SITE.y1, 104]) { const k = Math.abs(v - y); if (k < ey) { ey = k; by = v; } }
    return [bx == null ? x : bx, by == null ? y : by];
  }
  function measure(e) {
    e.preventDefault(); e.stopPropagation();
    const tol = () => Math.max(0.12, Math.min(1.2, 9 / ppmNow()));
    const [sx, sy] = measSnap(...pt(e), tol()), M = MEAS = { x0: sx, y0: sy, x1: sx, y1: sy }; measNow();
    const move = ev => { let [x, y] = measSnap(...pt(ev), tol()); if (!ev.altKey) { const ax = Math.abs(x - M.x0), ay = Math.abs(y - M.y0); if (ay < ax * 0.15) y = M.y0; else if (ax < ay * 0.15) x = M.x0; } M.x1 = x; M.y1 = y; raf("ms", measNow); };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); if (MEAS === M && Math.hypot(M.x1 - M.x0, M.y1 - M.y0) < 0.05) MEAS = null; measNow(); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  }
  function measNow() {
    const g = svg && svg.querySelector("#x10-ms"), out = host.querySelector("#x10-msv");
    if (g) g.innerHTML = "";
    if (!MEAS || !UI.ruler) { if (out) out.textContent = !UI.ruler ? "" : UI.meas ? "Kéo trên mặt bằng để đo (tự bắt mép khối); Esc xoá đường đo" : "Số trên thước là cm mô hình 1:200 (1 m = 0,5 cm), số 0 ở góc Tây Bắc khu đất"; return; }
    const { x0, y0, x1, y1 } = MEAS, dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), d = Math.hypot(dx, dy);
    const t = `${nf(d, 2)} m = ${cmT(d)} cm`, t2 = dx > 0.05 && dy > 0.05 ? ` (ngang ${cmT(dx)} cm, dọc ${cmT(dy)} cm)` : "";
    if (out) out.innerHTML = `Đo được <b>${t}</b>${t2} trên mô hình 1:200`;
    if (!g) return;
    const u = PX / ppmNow(), c = "var(--x10Guide)", a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a), ny = Math.cos(a), tk = 9 * u;
    el("line", { x1: x0 * PX, y1: y0 * PX, x2: x1 * PX, y2: y1 * PX, stroke: c, "stroke-width": 2.5 * u }, g);
    for (const [x, y] of [[x0, y0], [x1, y1]]) { el("line", { x1: x * PX - nx * tk, y1: y * PX - ny * tk, x2: x * PX + nx * tk, y2: y * PX + ny * tk, stroke: c, "stroke-width": 2.5 * u }, g); el("circle", { cx: x * PX, cy: y * PX, r: 3 * u, fill: c }, g); }
    if (d < 0.05) return;
    const mx = (x0 + x1) / 2 * PX + nx * 16 * u * (ny > 0 ? -1 : 1), my = (y0 + y1) / 2 * PX + ny * 16 * u * (ny > 0 ? -1 : 1);
    const e = el("text", { x: mx, y: my, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 16 * u, "font-weight": 800, fill: c, stroke: "var(--sheet)", "stroke-width": 5 * u, "paint-order": "stroke" }, g);
    e.textContent = `${cmT(d)} cm  (${nf(d, 2)} m)`;
  }
  // chọn khối hoặc cả cụm từ bảng cắt mô hình
  function pickIds(ids, f) {
    clearSel(); for (const id of ids) msel.add(id);
    sel = ids[ids.length - 1] || null; if (msel.size === 1) msel.clear();
    mode = String(f); host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q.dataset.m === mode)));
    render(); const cv = host.querySelector(".cv"); if (cv && cv.scrollIntoView) cv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function modelCard() {
    const box = host.querySelector("#x10-mdl"), M = G.MOHINH; if (!box) return; if (!M) { box.innerHTML = ""; return; }
    const P = S.blocks.filter(b => onSite(b) && !b.draft), T = M.table(P), op = UI.mdlOpen || {};
    if (!T.length) { box.innerHTML = `<p class="k">Chưa có khối nào trên khu đất.</p>`; return; }
    const sh = n => { n = String(n || ""); return n.length > 38 ? n.slice(0, 36) + "…" : n; };
    box.innerHTML = `<p>Tỉ lệ 1:200: <b>1 m thật = 0,5 cm</b> (5 mm) trên mô hình. Tầng cao 4,5 m = <b>2,25 cm</b>. Khối tầng 1 tính từ mặt đất cao 4,95 m = <b>2,475 cm</b> (gồm 0,225 cm nền tôn +0,45; nếu làm đế nền riêng thì cắt 2,25 cm). Lõi thang trên cùng nhô lên mái 1,6 m = <b>0,8 cm</b> (dấu ↑). Đế khu đất 41,5 × 104 m = <b>20,75 × 52 cm</b>. Vị trí đo từ mép Tây và mép Bắc khu đất, đúng số 0 của thước trên mặt bằng.</p>
<p class="k">Cụm: các khối cùng tầng chạm nhau, cắt liền một miếng theo khung bao rồi rạch ranh phòng; khối lẻ cắt riêng. Bấm tên cụm để chọn cả cụm, mặt bằng hiện khung bao ghi cm; bấm tên khối để chọn khối đó.</p>
<div class="bar"><button type="button" class="btn pri" id="x10-mprint">Tải khuôn in 1:200 (mỗi tầng một tờ)</button><button type="button" class="btn" id="x10-msvg">Tải file cắt laser (SVG, đúng mm)</button><button type="button" class="btn" id="x10-mcsv">Tải bảng kích thước (Excel)</button><span class="st" id="x10-mst"></span></div>
${T.map(t => `<details data-mf="${t.f}" ${op[t.f] === false ? "" : "open"}><summary>Tầng ${t.f} · cắt dày ${cmT(t.h, 3)} cm · đặt từ ${cmT(t.z0, 3)} cm · ${t.n} khối, ${t.cl.length} cụm</summary><div class="tw"><table><tr><th>Khối (cm mô hình)</th><th class="n">Rộng Đông–Tây</th><th class="n">Sâu Bắc–Nam</th><th class="n">Cao</th><th class="n">Cách mép Tây</th><th class="n">Cách mép Bắc</th></tr>
${t.cl.map(c => `<tr class="cl"><td><button type="button" class="lnk" data-mc="${t.f}:${c.k}">Cụm ${c.k}</button> <span class="k">khung bao ${c.blocks.length} khối</span></td><td class="n">${cmT(c.w)}</td><td class="n">${cmT(c.h)}</td><td class="n">${cmT(t.h, 3)}</td><td class="n">${cmT(c.x0)}</td><td class="n">${cmT(c.y0)}</td></tr>` + c.rows.map(r => `<tr><td><button type="button" class="lnk" data-mb="${esc(r.b.id)}">${esc(M.label(r.b))}</button> <span class="k">${esc(sh(r.b.n))}</span></td><td class="n">${cmT(r.b.w)}</td><td class="n">${cmT(r.b.h)}</td><td class="n">${cmT(r.h, 3)}${r.up ? " ↑" : ""}</td><td class="n">${cmT(r.b.x)}</td><td class="n">${cmT(r.b.y)}</td></tr>`).join("")).join("")}</table></div></details>`).join("")}`;
    box.querySelectorAll("details[data-mf]").forEach(d => d.addEventListener("toggle", () => { UI.mdlOpen = { ...(UI.mdlOpen || {}), [d.dataset.mf]: d.open }; saveUI(); }));
    box.querySelectorAll("[data-mc]").forEach(q => q.addEventListener("click", () => { const [f, k] = q.dataset.mc.split(":").map(Number), t = M.table(S.blocks.filter(b => onSite(b) && !b.draft)).find(z => z.f === f), c = t && t.cl.find(z => z.k === k); if (c) pickIds(c.blocks.map(b => b.id), f); }));
    box.querySelectorAll("[data-mb]").forEach(q => q.addEventListener("click", () => { const b = S.blocks.find(o => o.id === q.dataset.mb); if (b) pickIds([b.id], b.f); }));
    const ms = t => { const e = box.querySelector("#x10-mst"); if (e) e.textContent = t; };
    const title = `ARC 329 · ${S.from ? S.from + " · " : ""}khuôn cắt mô hình 1:200 · ${new Date().toLocaleDateString("vi-VN")}`;
    box.querySelector("#x10-mprint").addEventListener("click", async () => ms(await saveFile("khuon-mo-hinh-1-200.html", M.printHTML(P, { title }), "text/html") + " Mở file bằng trình duyệt, bấm In, chọn tỉ lệ 100%."));
    box.querySelector("#x10-msvg").addEventListener("click", async () => ms(await saveFile("cat-laser-mo-hinh-1-200.svg", M.svgFile(P, { title }), "image/svg+xml")));
    box.querySelector("#x10-mcsv").addEventListener("click", async () => ms(await saveFile("kich-thuoc-mo-hinh-1-200.csv", M.csv(P), "text/csv")));
  }
  async function saveFile(filename, data, type) {
    let dl = null; try { dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
    if (dl) { try { await dl.save({ filename, data }); return "Đã đưa file để bạn lưu."; } catch (e) { if (e && e.code !== "unavailable") return "Chưa tải được file."; } }
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], { type: type + ";charset=utf-8" })); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); return "Đã tải file."; } catch (e) { return "Trình duyệt chặn tải file."; }
  }

  /* ---------- lưu cho Claude, tải và mở file ---------- */
  const payload = () => ({ kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: S.note || "", from: S.from || null, blocks: S.blocks.map(b => ({ id: b.id, c: b.c, n: b.n, kind: b.kind, a: b.a, x: b.x, y: b.y, w: b.w, h: b.h, f: b.f, top: !!b.top, onSite: onSite(b), draft: !!b.draft || undefined, link: b.link || undefined, pk: b.pk || undefined })) });
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
