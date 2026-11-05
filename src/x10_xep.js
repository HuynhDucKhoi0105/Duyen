/* ================= Tự xếp khối: 20 khối A1–E6 đúng diện tích đề, kéo thả lên khu đất, 2–3 tầng =================
   Bạn tự xếp hình khối; bấm "Lưu cho Claude" để Claude đọc bản xếp (db: xepkhoi/ban-moi-nhat) rồi làm mặt bằng hoàn chỉnh.
   Toạ độ như các mặt bằng khác: x đi về phía Đông (sông), y đi về phía Nam, đơn vị mét. */
(function (G) {
  const host = document.getElementById("x10-host");
  if (!host) return;
  const NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const KEY = "arc329.xep.v1", SNAP = 0.5, FH = [0, 0.45, 4.95, 9.45], TOP = [0, 4.95, 9.45, 13.95], NF = 3;
  const SITE = { x0: 6, x1: 41.5, y0: 12, y1: 89 }, STAGE_X = 50;
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
    // xếp sẵn trong "kho khối" bên phải khu đất, theo nhóm
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
  let sel = null, mode = "1", seq = 1;
  function load() { try { const t = localStorage.getItem(KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
  // hoàn tác / làm lại: chụp danh sách khối trước mỗi thay đổi; các thay đổi liên tiếp trong 0,6 s (kéo thanh trượt) gộp thành một bước
  const UNDO = [], REDO = []; let lastSnap = JSON.stringify(S.blocks), lastPush = 0;
  function keep() {
    const now = JSON.stringify(S.blocks);
    if (now !== lastSnap) { if (Date.now() - lastPush > 600) { UNDO.push(lastSnap); if (UNDO.length > 80) UNDO.shift(); REDO.length = 0; } lastPush = Date.now(); lastSnap = now; }
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* trình duyệt chặn bộ nhớ: vẫn dùng được, chỉ không tự lưu */ }
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
  const rect = b => ({ x0: b.x, y0: b.y, x1: b.x + b.w, y1: b.y + b.h });
  const ovl = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const gap = (a, b) => Math.hypot(Math.max(0, Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w)), Math.max(0, Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h)));
  const label = b => b.kind === "room" ? b.c : HELP[b.kind].n.split(":")[0];

  /* ---------- khung trang ---------- */
  const CSS = `
.x10 [hidden] { display: none !important; }
.x10 { display: grid; gap: 14px; --x10Stair: #e08a3c; --x10Lift: #8a6cc7; }
.x10 .bar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.x10 .btn:disabled { opacity: .45; cursor: default; }
.x10 .seg button, .x10 .btn { font: inherit; font-size: 13px; padding: 6px 10px; border: 1px solid var(--line); background: var(--sheet); color: var(--ink); border-radius: 8px; cursor: pointer; }
.x10 .seg button[aria-pressed="true"] { background: var(--accent); color: var(--sheet); border-color: var(--accent); }
.x10 .btn.pri { background: var(--accent); color: var(--sheet); border-color: var(--accent); font-weight: 700; }
.x10 .k { font-size: 12px; color: var(--ink-2); margin-right: 2px; }
.x10 .wrap { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 14px; align-items: start; }
@media (max-width: 900px) { .x10 .wrap { grid-template-columns: 1fr; } }
.x10 .cv { border: 1px solid var(--line); border-radius: 10px; background: var(--paper); overflow: auto; }
.x10 svg.plan { display: block; width: 100%; min-width: 760px; touch-action: none; user-select: none; }
.x10 .side { display: grid; gap: 12px; }
.x10 .card { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: var(--sheet); }
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
.x10 input[type=range] { width: 100%; }
.x10 textarea { width: 100%; box-sizing: border-box; font: inherit; font-size: 13px; min-height: 54px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); color: var(--ink); padding: 6px; }
.x10 .st { font-size: 12.5px; color: var(--ink-2); min-height: 1em; }
.x10 svg.iso { display: block; width: 100%; height: auto; background: var(--paper); border-radius: 10px; border: 1px solid var(--line); }
`;
  function build() {
    if (!document.getElementById("x10-style")) { const s = document.createElement("style"); s.id = "x10-style"; s.textContent = CSS; document.head.appendChild(s); }
    host.innerHTML = `
<section class="x10">
  <div><p class="eyebrow">Tự xếp khối · 20 khối A1–E6 đúng diện tích đề</p>
  <h2>Kéo các khối lên khu đất, xếp 2–3 tầng, rồi gửi cho Claude làm mặt bằng</h2>
  <p class="lede">Mỗi khối là một phòng theo bảng diện tích của đề, mặc định sâu 8 m theo hướng Bắc – Nam để lấy sáng. Kéo khối từ kho bên phải vào khu đất; chọn khối để xoay, đổi tỉ lệ (diện tích giữ nguyên), đưa lên tầng 2, tầng 3, tách đôi hoặc gộp lại; mép khối tự hít vào mép khối bên cạnh để xếp khít. Làm sai thì bấm Hoàn tác (Ctrl+Z). Thêm thang, lõi sách, hành lang, sân trong ở thanh bên dưới. Bên phải là các kiểm tra nhanh theo ghi chú (ánh sáng Bắc – Nam, tách ồn, kho sát thư viện, đón tiếp là bản lề); đây chỉ là gợi ý, kiểm tra đầy đủ làm khi Claude dựng mặt bằng. Xếp xong bấm <b>Lưu cho Claude</b> rồi nhắn Claude.</p></div>
  <div class="bar">
    <button type="button" class="btn" id="x10-undo" title="Ctrl+Z">↶ Hoàn tác</button><button type="button" class="btn" id="x10-redo" title="Ctrl+Y">↷ Làm lại</button>
    <span class="k" style="margin-left:10px">Đang xếp</span><span class="seg" id="x10-mode">${[["1", "Tầng 1"], ["2", "Tầng 2"], ["3", "Tầng 3"], ["all", "Cả các tầng"]].map(([k, t]) => `<button type="button" data-m="${k}" aria-pressed="${k === mode}">${t}</button>`).join("")}</span>
    <span class="k" style="margin-left:10px">Thêm</span>${Object.entries(HELP).map(([k, v]) => `<button type="button" class="btn" data-add="${k}">+ ${v.n.split(":")[0]}</button>`).join("")}
  </div>
  <div class="wrap">
    <div style="display:grid;gap:14px;min-width:0">
      <div class="cv"><svg class="plan" id="x10-svg" aria-label="Khu đất và các khối"></svg></div>
      <div><div class="bar" style="margin:0 0 4px"><span class="k">Khối 3D xem trước · kéo để xoay, cuộn để phóng to</span><button type="button" class="btn" data-v="l">⟲ Xoay trái</button><button type="button" class="btn" data-v="r">Xoay phải ⟳</button><button type="button" class="btn" data-v="top">Nhìn từ trên</button><button type="button" class="btn" data-v="0">Góc mặc định</button></div><div id="x10-3d" class="iso" hidden style="border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--paper)" aria-label="Khối 3D xem trước, kéo để xoay"></div><svg class="iso" id="x10-iso" aria-label="Khối 3D xem trước, kéo để xoay"></svg></div>
    </div>
    <div class="side">
      <div class="card" id="x10-sel"></div>
      <div class="card"><h4>Kiểm tra nhanh</h4><ul class="chk" id="x10-chk"></ul></div>
      <div class="card"><h4>Diện tích</h4><div id="x10-area"></div></div>
      <div class="card"><h4>Gửi cho Claude</h4>
        <textarea id="x10-note" placeholder="Ghi chú cho Claude (ý tưởng hình khối, chỗ nào bạn muốn giữ)…"></textarea>
        <div class="bar" style="margin-top:6px"><button type="button" class="btn pri" id="x10-save">Lưu cho Claude</button><button type="button" class="btn" id="x10-dl">Tải file</button><label class="btn">Mở file<input type="file" id="x10-open" accept=".json,application/json" hidden></label></div>
        <p class="st" id="x10-st"></p>
        <label class="k" for="x10-from">Bắt đầu từ một ý tưởng có sẵn</label>
        <select id="x10-from" class="btn" style="width:100%">${'<option value="">Chọn ý tưởng…</option>'}${(G.CHOT || []).map((p, i) => `<option value="${i}">${esc(p.code)} · ${esc(p.name)}</option>`).join("")}</select>
        <div class="bar" style="margin-top:6px"><button type="button" class="btn" id="x10-reset">Xếp lại từ đầu</button></div>
      </div>
    </div>
  </div>
</section>`;
    host.querySelector("#x10-note").value = S.note || "";
    host.querySelector("#x10-note").addEventListener("input", e => { S.note = e.target.value; keep(); });
    host.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => { mode = b.dataset.m; host.querySelectorAll("[data-m]").forEach(q => q.setAttribute("aria-pressed", String(q === b))); render(); }));
    host.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => addHelper(b.dataset.add)));
    host.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => { const v = b.dataset.v; if (v === "l") VIEW.yaw -= 45; else if (v === "r") VIEW.yaw += 45; else if (v === "top") VIEW.pitch = 88; else { VIEW.yaw = 35; VIEW.pitch = 32; VIEW.zoom = 1; } T3 ? draw3() : iso(); }));
    host.querySelector("#x10-save").addEventListener("click", saveForClaude);
    host.querySelector("#x10-dl").addEventListener("click", download);
    host.querySelector("#x10-open").addEventListener("change", openFile);
    host.querySelector("#x10-reset").addEventListener("click", () => { if (!confirm("Xếp lại từ đầu? (Bấm Hoàn tác nếu muốn lấy lại bản đang xếp.)")) return; S = { blocks: defaults(), note: S.note }; sel = null; keep(); render(); });
    host.querySelector("#x10-from").addEventListener("change", e => { if (e.target.value === "") return; if (confirm("Thay bản đang xếp bằng các khối của ý tưởng này?")) fromPlan(+e.target.value); e.target.value = ""; });
    host.querySelector("#x10-undo").addEventListener("click", undo);
    host.querySelector("#x10-redo").addEventListener("click", redo);
    if (!window.__x10key) { window.__x10key = 1; document.addEventListener("keydown", onKey); }
    undoBtns();
    render();
  }

  /* ---------- vẽ mặt bằng khu đất ---------- */
  const VB = { x: -9, y: -6, w: 128, h: 116 }, PX = 10;
  let svg;
  function render() {
    svg = host.querySelector("#x10-svg");
    svg.setAttribute("viewBox", `${VB.x * PX} ${VB.y * PX} ${VB.w * PX} ${VB.h * PX}`);
    svg.innerHTML = "";
    const R = (x, y, w, h, a, p = svg) => el("rect", { x: x * PX, y: y * PX, width: w * PX, height: h * PX, ...a }, p);
    const T = (s, x, y, a = {}, p = svg) => { const e = el("text", { x: x * PX, y: y * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 17, fill: "var(--ink-2)", "font-family": "var(--body)", ...a }, p); e.textContent = s; return e; };
    const defs = el("defs", {}, svg), hat = el("pattern", { id: "x10h", width: 8, height: 8, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 8, stroke: "var(--ink-2)", "stroke-width": 1.5, opacity: 0.35 }, hat);
    // khu đất
    R(0, 0, 41.5, 104, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5 });
    R(0, 0, 6, 104, { fill: "var(--road)" }); T("Lối Tây · xe cứu hỏa, xe giao sách", 3, 52, { transform: `rotate(-90 ${3 * PX} ${52 * PX})` });
    R(6, 0, 35.5, 12, { fill: "var(--pave)" }); T("Quảng trường Bắc", 23.75, 6);
    R(6, 89, 35.5, 15, { fill: "var(--road)" }); T("Bãi xe", 23.75, 96.5);
    R(41.5, 0, 6, 104, { fill: "var(--water)" }); T("Bờ sông · Bạch Đằng", 44.5, 52, { transform: `rotate(90 ${44.5 * PX} ${52 * PX})` });
    // lưới cột 8 m
    for (let x = 6; x <= 41.5; x += 8) el("line", { x1: x * PX, y1: 12 * PX, x2: x * PX, y2: 89 * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    for (let y = 12; y <= 89; y += 8) el("line", { x1: 6 * PX, y1: y * PX, x2: 41.5 * PX, y2: y * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    R(6, 12, 35.5, 77, { fill: "none", stroke: "var(--accent)", "stroke-width": 1.5, "stroke-dasharray": "8 5" });
    T("Vùng xây dựng (lưới cột 8 m)", 23.75, 13.4, { "font-size": 15, fill: "var(--accent)" });
    // kho khối
    R(STAGE_X - 1.5, 0, 67, 104, { fill: "none", stroke: "var(--line)", "stroke-dasharray": "6 5", rx: 8 });
    T("Kho khối · kéo vào khu đất", STAGE_X + 32, -2.5, { "font-size": 22, "font-weight": 700, fill: "var(--ink)" });
    // mũi tên Bắc lệch theo khu đất
    const nAng = window.ARC_NORTH != null ? window.ARC_NORTH : 20, ng = el("g", { transform: `translate(${-5 * PX} ${0 * PX}) rotate(${nAng}) scale(1.6)` }, svg);
    el("path", { d: "M0 -16 L8 8 L0 4 L-8 8 Z", fill: "var(--ink)" }, ng); const nt = el("text", { x: 0, y: -22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--ink)" }, ng); nt.textContent = "Bắc";
    // khối: tầng đang xem đậm, tầng kia mờ
    const issues = check();
    const bad = new Set(issues.filter(i => !i.ok).flatMap(i => i.ids || []));
    const order = [...S.blocks].sort((a, b) => (onSite(a) - onSite(b)) || (vis(a) - vis(b)) || (a.f - b.f));
    for (const b of order) drawBlock(b, bad);
    // ô kéo đổi tỉ lệ cho khối đang chọn
    sideCard(); checksList(issues); areaTable(); iso();
  }
  const vis = b => !onSite(b) ? 2 : mode === "all" ? (b.f >= 2 ? 2 : 1.5) : String(b.f) === mode ? 2 : 1;
  function drawBlock(b, bad) {
    const v = vis(b), g = el("g", { "data-id": b.id, style: v < 1.5 ? "pointer-events:none" : "cursor:grab" }, svg);
    const x = b.x * PX, y = b.y * PX, w = b.w * PX, h = b.h * PX;
    el("rect", { x, y, width: w, height: h, fill: col(b), opacity: v < 1.5 ? 0.28 : b.kind === "court" ? 0.7 : 0.95, stroke: sel === b.id ? "var(--accent)" : bad.has(b.id) ? "var(--warn)" : "var(--ink)", "stroke-width": sel === b.id ? 4 : bad.has(b.id) ? 3 : 1.2, "stroke-dasharray": b.kind === "court" ? "6 4" : null }, g);
    if (onSite(b) && b.f >= 2 && v >= 1.5) el("rect", { x, y, width: w, height: h, fill: "url(#x10h)", "pointer-events": "none" }, g);
    // cửa sổ Bắc/Nam cần có: vạch xanh trên mép Bắc và Nam của phòng cần sáng
    if (b.kind === "room" && LIT.test(b.c) && v >= 1.5) { const lt = litOf(b); for (const [side, ok] of [["N", lt.N], ["S", lt.S]]) if (ok >= 1.2) el("line", { x1: x + 3, y1: side === "N" ? y + 2 : y + h - 2, x2: x + w - 3, y2: side === "N" ? y + 2 : y + h - 2, stroke: "#2f8fd6", "stroke-width": 4, opacity: 0.8 }, g); }
    if (v < 1.5 && b.w * b.h < 30) return;
    const big = b.w >= 6 && b.h >= 4, t1 = el("text", { x: x + w / 2, y: y + h / 2 - (big ? 9 : 0), "text-anchor": "middle", "dominant-baseline": "middle", "font-size": big ? 24 : 16, "font-weight": 800, fill: "var(--ink)", "pointer-events": "none" }, g);
    t1.textContent = label(b) + (onSite(b) && b.f >= 2 ? " · T" + b.f : "") + (b.top ? " ☀" : "");
    if (big) { const t2 = el("text", { x: x + w / 2, y: y + h / 2 + 13, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 14, fill: "var(--ink-2)", "pointer-events": "none" }, g); t2.textContent = `${nf(area(b), 0)} m² · ${nf(b.w, 1)} × ${nf(b.h, 1)}`; }
    if (v >= 1.5) g.addEventListener("pointerdown", e => startDrag(e, b));
  }
  // phần mép Bắc / Nam còn hở (không bị khối cùng tầng áp vào)
  function litOf(b) {
    const same = S.blocks.filter(o => o !== b && onSite(o) && o.f === b.f && isFloor(o));
    const free = side => { const yy = side === "N" ? b.y : b.y + b.h; let cov = 0; for (const o of same) { const oy = side === "N" ? o.y + o.h : o.y; if (Math.abs(oy - yy) < 0.6) cov += Math.max(0, Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x)); } return Math.max(0, b.w - cov); };
    return { N: free("N"), S: free("S") };
  }

  /* ---------- kéo thả ---------- */
  let drag = null;
  function pt(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [q.x / PX, q.y / PX]; }
  // hít mép: mép khối đang kéo dính vào mép các khối cùng tầng (và tầng ngay dưới) khi cách dưới 0,8 m, để xếp khít không hở không chồng
  function magnet(b) {
    const others = S.blocks.filter(o => o !== b && onSite(o) && (o.f === b.f || o.f === b.f - 1)), M = 0.8;
    let bx = null, by = null;
    for (const o of others) {
      for (const [mine, theirs] of [[b.x, o.x], [b.x, o.x + o.w], [b.x + b.w, o.x], [b.x + b.w, o.x + o.w]]) { const d = theirs - mine; if (Math.abs(d) < M && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d; }
      for (const [mine, theirs] of [[b.y, o.y], [b.y, o.y + o.h], [b.y + b.h, o.y], [b.y + b.h, o.y + o.h]]) { const d = theirs - mine; if (Math.abs(d) < M && (by === null || Math.abs(d) < Math.abs(by))) by = d; }
    }
    for (const [v, lo] of [[SITE.x0, "x"], [SITE.x1, "X"]]) { const d = lo === "x" ? v - b.x : v - (b.x + b.w); if (Math.abs(d) < M && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d; }
    for (const [v, lo] of [[SITE.y0, "y"], [SITE.y1, "Y"]]) { const d = lo === "y" ? v - b.y : v - (b.y + b.h); if (Math.abs(d) < M && (by === null || Math.abs(d) < Math.abs(by))) by = d; }
    if (bx !== null) b.x = +(b.x + bx).toFixed(2);
    if (by !== null) b.y = +(b.y + by).toFixed(2);
  }
  // đưa khối về kho vào ô trống, không đè khối khác trong kho
  function toStage(b) {
    b.f = 1;
    const inStage = S.blocks.filter(o => o !== b && !onSite(o));
    for (let y = 1; y < 104; y += 0.5) for (let x = STAGE_X; x + b.w <= STAGE_X + 64; x += 0.5) {
      const t = { x, y, w: b.w, h: b.h };
      if (!inStage.some(o => ovl(t, { x: o.x - 0.6, y: o.y - 0.6, w: o.w + 1.2, h: o.h + 1.2 }) > 0)) { b.x = x; b.y = y; return; }
    }
    b.x = STAGE_X; b.y = 100;
  }
  function startDrag(e, b) {
    e.preventDefault(); sel = b.id;
    const [mx, my] = pt(e), wasStage = !onSite(b);
    drag = { b, dx: mx - b.x, dy: my - b.y, wasStage, x0: b.x, y0: b.y };
    try { svg.setPointerCapture(e.pointerId); } catch (er) { /* trình duyệt cũ */ }
    const move = ev => { if (!drag) return; const [x, y] = pt(ev); drag.b.x = Math.round((x - drag.dx) / SNAP) * SNAP; drag.b.y = Math.round((y - drag.dy) / SNAP) * SNAP; if (onSite(drag.b)) magnet(drag.b); const n = svg.querySelector(`[data-id="${CSS_ESC(drag.b.id)}"]`); if (n) n.setAttribute("transform", `translate(${(drag.b.x - drag.x0) * PX} ${(drag.b.y - drag.y0) * PX})`); };
    const up = () => {
      if (!drag) return; const d = drag, b2 = d.b; drag = null;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      // thả lấn sang bờ sông / kho: cất vào kho gọn gàng; thả lệch ra ngoài khu đất: kéo về mép khu đất
      if (b2.x + b2.w > 46 || b2.x > 43) {
        if (onSite(b2) || b2.x < STAGE_X || S.blocks.some(o => o !== b2 && !onSite(o) && ovl(o, b2) > 0)) toStage(b2);
        else { b2.x = Math.min(STAGE_X + 64 - b2.w, b2.x); b2.y = Math.max(0, Math.min(104 - b2.h, b2.y)); b2.f = 1; }
      }
      else {
        b2.x = Math.max(0, Math.min(41.5 - b2.w, b2.x)); b2.y = Math.max(0, Math.min(104 - b2.h, b2.y));
        if (d.wasStage) b2.f = mode === "all" ? 1 : +mode;
      }
      keep(); render();
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    render(); // làm nổi khối đang chọn, rồi tiếp tục kéo trên hình mới
    const n = svg.querySelector(`[data-id="${CSS_ESC(b.id)}"]`); if (n && n.parentNode) n.parentNode.appendChild(n);
  }

  const CSS_ESC = s => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/"/g, '\\"');
  function onKey(e) {
    if (host.offsetParent && (e.ctrlKey || e.metaKey) && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) {
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); redo(); return; }
    }
    if (!sel || !host.offsetParent || /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) return;
    const b = S.blocks.find(q => q.id === sel); if (!b) return;
    const st = e.shiftKey ? 4 : SNAP, mv = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
    if (mv) { e.preventDefault(); b.x += mv[0]; b.y += mv[1]; keep(); render(); }
    else if (e.key === "r" || e.key === "R") { rotate(b); }
  }

  /* ---------- thao tác trên khối đang chọn ---------- */
  function rotate(b) { const cx = b.x + b.w / 2, cy = b.y + b.h / 2; [b.w, b.h] = [b.h, b.w]; b.x = Math.round((cx - b.w / 2) / SNAP) * SNAP; b.y = Math.round((cy - b.h / 2) / SNAP) * SNAP; keep(); render(); }
  function setW(b, w) { if (b.kind === "room") { b.w = +w; b.h = +(b.a / b.w).toFixed(2); } else b.w = +w; keep(); render(); }
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
    if (!b) { box.innerHTML = `<h4>Chọn một khối</h4><p>Bấm vào khối để xem và chỉnh. Phím mũi tên dịch 0,5 m (giữ Shift: 4 m), phím R xoay.</p>`; return; }
    const k = (G.KHOI || []).find(q => q.c === b.c), room = b.kind === "room", a = area(b);
    const wMin = room ? Math.max(2, +(b.a / 40).toFixed(1)) : 1.5, wMax = room ? Math.min(42, +(b.a / 2).toFixed(1)) : 40;
    box.innerHTML = `<h4>${esc(label(b))} · ${esc(b.n)}</h4>
<p>${nf(a, 1)} m² · rộng Đông – Tây <b>${nf(b.w, 2)} m</b> × sâu Bắc – Nam <b>${nf(b.h, 2)} m</b>${onSite(b) ? ` · tầng ${b.f}` : " · đang ở kho"}</p>
${room && LIT.test(b.c) ? `<p>${b.h <= 8 ? "Sâu ≤ 8 m: một mặt Bắc hoặc Nam là đủ sáng." : b.h <= 16 ? "Sâu 8–16 m: cần hở cả mặt Bắc và mặt Nam." : "Sâu quá 16 m: giữa phòng sẽ tối, nên đổi tỉ lệ hoặc tách đôi."}</p>` : ""}
${k ? `<p style="color:var(--ink-2)">Nối với: ${esc(k.noi)}<br>Tránh: ${esc(k.tranh)}</p>` : ""}
<label class="k">${room ? "Đổi tỉ lệ (diện tích giữ nguyên)" : "Rộng Đông – Tây"}</label><input type="range" id="x10-w" min="${wMin}" max="${wMax}" step="0.25" value="${b.w}">
${room ? "" : `<label class="k">Sâu Bắc – Nam</label><input type="range" id="x10-h" min="1.5" max="40" step="0.25" value="${b.h}">`}
<div class="bar" style="margin-top:6px">
  <button type="button" class="btn" id="x10-rot">Xoay 90°</button>
  ${room ? `<button type="button" class="btn" id="x10-d8">Sâu 8 m</button>` : ""}
  ${b.kind !== "court" ? `<span class="seg">${[1, 2, 3].map(f => `<button type="button" data-f="${f}" aria-pressed="${b.f === f}">Tầng ${f}</button>`).join("")}</span>` : ""}
  ${room && b.a >= 30 ? `<button type="button" class="btn" id="x10-split">Tách đôi</button>` : ""}
  ${room && parts(b).length > 1 ? `<button type="button" class="btn" id="x10-merge">Gộp lại (${parts(b).length} phần)</button>` : ""}
  ${room && LIT.test(b.c) ? `<button type="button" class="btn" id="x10-top" aria-pressed="${!!b.top}">${b.top ? "✓ " : ""}Lấy sáng mái hướng Bắc</button>` : ""}
  ${room ? `<button type="button" class="btn" id="x10-back">Cất vào kho</button>` : `<button type="button" class="btn" id="x10-del">Xóa</button>`}
</div>`;
    box.querySelector("#x10-w").addEventListener("input", e => setW(b, e.target.value));
    const hh = box.querySelector("#x10-h"); if (hh) hh.addEventListener("input", e => { b.h = +e.target.value; keep(); render(); });
    box.querySelector("#x10-rot").addEventListener("click", () => rotate(b));
    const d8 = box.querySelector("#x10-d8"); if (d8) d8.addEventListener("click", () => { b.h = 8; b.w = +(b.a / 8).toFixed(2); keep(); render(); });
    box.querySelectorAll("[data-f]").forEach(q => q.addEventListener("click", () => { b.f = +q.dataset.f; keep(); render(); }));
    const tp = box.querySelector("#x10-top"); if (tp) tp.addEventListener("click", () => { b.top = !b.top; keep(); render(); });
    const mg = box.querySelector("#x10-merge"); if (mg) mg.addEventListener("click", () => merge(b));
    const sp = box.querySelector("#x10-split"); if (sp) sp.addEventListener("click", () => split(b));
    const bk = box.querySelector("#x10-back"); if (bk) bk.addEventListener("click", () => { b.x = STAGE_X + 50; b.y = 95; keep(); render(); });
    const dl = box.querySelector("#x10-del"); if (dl) dl.addEventListener("click", () => { S.blocks = S.blocks.filter(q => q !== b); sel = null; keep(); render(); });
  }

  /* ---------- kiểm tra nhanh (gợi ý; kiểm tra đầy đủ làm khi Claude dựng mặt bằng) ---------- */
  function check() {
    const P = S.blocks.filter(onSite), out = [], rooms = P.filter(b => b.kind === "room");
    const add = (ok, t, ids) => out.push({ ok, t, ids });
    const placed = new Set(rooms.map(b => b.c)), all = new Set(S.blocks.filter(b => b.kind === "room").map(b => b.c));
    add(placed.size === all.size, `Đã đặt ${placed.size}/${all.size} loại khối lên khu đất`);
    // chồng nhau cùng tầng
    const fl = P.filter(isFloor), ov = [];
    for (let i = 0; i < fl.length; i++) for (let j = i + 1; j < fl.length; j++) if (fl[i].f === fl[j].f && ovl(fl[i], fl[j]) > 0.3) ov.push([fl[i], fl[j]]);
    add(!ov.length, ov.length ? `Khối chồng lên nhau: ${ov.slice(0, 4).map(([a, b]) => `${label(a)} – ${label(b)}`).join(", ")}` : "Không có khối chồng lên nhau", ov.flat().map(b => b.id));
    // ngoài vùng xây dựng
    const outB = P.filter(b => b.kind !== "court" && (b.x < SITE.x0 - 0.01 || b.y < SITE.y0 - 0.01 || b.x + b.w > SITE.x1 + 0.01 || b.y + b.h > SITE.y1 + 0.01));
    add(!outB.length, outB.length ? `Khối lấn ra lối Tây, quảng trường, bãi xe hoặc bờ sông: ${outB.map(label).join(", ")}` : "Mọi khối nằm trong vùng xây dựng", outB.map(b => b.id));
    // tầng 2 phải có chỗ đỡ
    for (const b of fl.filter(b => b.f >= 2)) { const sup = fl.filter(o => o.f === b.f - 1).reduce((s, o) => s + ovl(b, o), 0), hang = b.w * b.h - sup; if (hang > 0.5) { const depth = hang / Math.max(b.w, b.h); add(depth <= 4, `${label(b)} tầng ${b.f} đua ra khoảng ${nf(depth, 1)} m ngoài tầng ${b.f - 1}${depth > 4 ? ": quá 4 m, cần cột chống" : ""}`, depth > 4 ? [b.id] : []); } }
    // ánh sáng Bắc – Nam
    const dark = [];
    const roofOk = b => b.top && !P.some(o => o !== b && isFloor(o) && o.f > b.f && ovl(o, b) > 2);
    for (const b of rooms.filter(b => LIT.test(b.c))) { const l = litOf(b); const ok = roofOk(b) || (b.h <= 8.6 && (l.N >= 1.2 || l.S >= 1.2)) || (b.h <= 16.6 && l.N >= 1.2 && l.S >= 1.2); if (!ok) dark.push(b); }
    add(!dark.length, dark.length ? `Phòng có thể bị bí (thiếu mặt Bắc/Nam hở hoặc quá sâu): ${dark.map(label).join(", ")}` : "Phòng có người dùng đều có mặt Bắc hoặc Nam hở, sâu hợp lý", dark.map(b => b.id));
    // góc che 45°: khối phía trước cửa sổ cao hơn khoảng cách
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
    // tách ồn
    const noise = [];
    for (const q of rooms.filter(b => b.c === "B2")) for (const o of rooms.filter(b => NOISY.test(b.c) && b.f === q.f)) if (gap(q, o) < 8) noise.push(`B2 cách ${o.c} chỉ ${nf(gap(q, o), 1)} m`);
    for (const q of rooms.filter(b => /^(B1|B5|B6|E1|E2)$/.test(b.c))) for (const o of rooms.filter(b => NOISY.test(b.c) && b.f === q.f)) if (gap(q, o) < 0.6) noise.push(`${q.c} sát vách ${o.c}`);
    const RD = /^(B1|B2|B5|B6)$/;
    for (const a of rooms) for (const o of rooms.filter(o => o.f === a.f + 1 && ovl(a, o) > 4)) {
      const pr = (NOISY.test(a.c) && RD.test(o.c)) || (NOISY.test(o.c) && RD.test(a.c));
      if (pr && (/^(D1|D2|B2)$/.test(a.c) || /^(D1|D2|B2)$/.test(o.c))) noise.push(`${o.c} tầng 2 chồng lên ${a.c}`);
      if ((/^E[12]$/.test(a.c) && /^(D1|D2|B3|B4|A3)$/.test(o.c)) || (/^E[12]$/.test(o.c) && /^(D1|D2|B3|B4|A3)$/.test(a.c))) noise.push(`${o.c} tầng 2 chồng lên ${a.c}`);
    }
    add(!noise.length, noise.length ? `Tiếng ồn: ${[...new Set(noise)].slice(0, 6).join("; ")}` : "Đọc yên tĩnh xa nguồn ồn; phòng đọc, văn phòng không sát vách phòng ồn");
    // quan hệ chính
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
    // thang
    const st = P.filter(b => /stair|lift|book/.test(b.kind)), top = Math.max(1, ...P.filter(isFloor).map(b => b.f)), up = top >= 2;
    for (let f = 2; f <= top; f++) { const pair = st.filter(a => a.f === f - 1 && st.some(o => o.f === f && ovl(a, o) > 0.6 * a.w * a.h)); add(pair.length >= 2 && pair.some(b => b.kind !== "stair"), `Thang thẳng hàng tầng ${f - 1} – tầng ${f}: ${pair.length} (cần ít nhất 2, trong đó có thang máy)`); }
    if (up) { const bk = st.filter(b => b.kind === "book"); add(bk.length > 0 && by("C1").some(c => bk.some(k => k.f === c.f && gap(k, c) < 1)), "Lõi sách (có tời) đặt sát kho đóng C1"); }
    return out;
  }
  function checksList(issues) { host.querySelector("#x10-chk").innerHTML = issues.map(i => `<li class="${i.ok ? "ok" : "no"}">${esc(i.t)}</li>`).join(""); }
  function areaTable() {
    const P = S.blocks.filter(onSite).filter(isFloor), f = n => P.filter(b => b.f === n).reduce((s, b) => s + b.w * b.h, 0);
    const z = c => P.filter(b => b.kind === "room" && b.c[0] === c).reduce((s, b) => s + area(b), 0), brief = { A: 270, B: 1110, C: 260, D: 300, E: 280 };
    const tot = [1, 2, 3].reduce((t, n) => t + f(n), 0);
    host.querySelector("#x10-area").innerHTML = `<table><tr><th>Nhóm</th><th class="n">Đã đặt</th><th class="n">Đề</th></tr>${Object.keys(brief).map(c => `<tr><td>${c}</td><td class="n">${nf(z(c))}</td><td class="n">${nf(brief[c])}</td></tr>`).join("")}
${[1, 2, 3].filter(n => n === 1 || f(n) > 0).map(n => `<tr><td>Tầng ${n} (sàn)</td><td class="n">${nf(f(n))}</td><td></td></tr>`).join("")}
<tr><td><b>Tổng sàn</b></td><td class="n"><b style="color:${tot > 3000 ? "var(--warn)" : "inherit"}">${nf(tot)}</b></td><td class="n">≤ 3.000</td></tr></table>
<p class="st">Tổng sàn tính cả thang, sảnh, hành lang đã thêm; còn khoảng ${nf(Math.max(0, 3000 - tot))} m² cho giao thông chung và tường.</p>`;
  }

  /* ---------- khối 3D xem trước (trục đo) ---------- */
  // góc nhìn khối 3D: xoay quanh tâm khu đất (yaw) và nghiêng (pitch); kéo chuột hoặc ngón tay trên hình để xoay
  const VIEW = { yaw: 35, pitch: 32, zoom: 1 };
  function isoSvg() {
    const s = host.querySelector("#x10-iso"); s.hidden = false; s.innerHTML = "";
    const cx = 24, cy = 52, yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, cs = Math.cos(yr), sn = Math.sin(yr), sp = Math.sin(pr), cp = Math.cos(pr), K = 9 * VIEW.zoom;
    const rot = (x, y) => { const dx = x - cx, dy = y - cy; return [dx * cs - dy * sn, dx * sn + dy * cs]; };
    const pj = (x, y, z) => { const [u, v] = rot(x, y); return [u * K, (v * sp - z * cp) * K]; };
    const depth = (x, y, z) => { const [, v] = rot(x, y); return v * cp + z * sp; };
    const R = 70 * K; s.setAttribute("viewBox", `${-R} ${-R * 0.62} ${2 * R} ${R * 1.24}`);
    const P = pts => pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
    const poly = (pts, a) => el("polygon", { points: P(pts), ...a }, s);
    const quad = (x0, y0, x1, y1, z) => [pj(x0, y0, z), pj(x1, y0, z), pj(x1, y1, z), pj(x0, y1, z)];
    poly(quad(0, 0, 41.5, 104, 0), { fill: "var(--sheet)", stroke: "var(--line)" });
    poly(quad(0, 0, 6, 104, 0), { fill: "var(--road)" });
    poly(quad(41.5, 0, 47.5, 104, 0), { fill: "var(--water)" });
    poly(quad(6, 12, 41.5, 89, 0.02), { fill: "none", stroke: "var(--accent)", "stroke-dasharray": "5 4" });
    // mũi tên Bắc trên mặt đất
    { const [a, b] = pj(cx, -6, 0), [c, d] = pj(cx, 2, 0); el("line", { x1: c, y1: d, x2: a, y2: b, stroke: "var(--ink)", "stroke-width": 2, "marker-end": "url(#x10arr)" }, s); const m = el("marker", { id: "x10arr", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: "auto" }, el("defs", {}, s)); el("path", { d: "M0 0 L10 5 L0 10 z", fill: "var(--ink)" }, m); const t = el("text", { x: a, y: b - 8, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "var(--ink)" }, s); t.textContent = "Bắc"; }
    const vols = [];
    for (const b of S.blocks.filter(onSite)) {
      if (b.kind === "court") { poly(quad(b.x, b.y, b.x + b.w, b.y + b.h, 0.05), { fill: "var(--zOut)", stroke: "var(--ink-2)", "stroke-dasharray": "3 3" }); continue; }
      let z0 = TOP[b.f - 1] || 0, z1 = TOP[b.f];
      if (/stair|lift|book/.test(b.kind) && !S.blocks.some(o => o !== b && onSite(o) && /stair|lift|book/.test(o.kind) && o.f > b.f && ovl(o, b) > 1)) z1 += 1.6;
      vols.push({ b, z0, z1, d: depth(b.x + b.w / 2, b.y + b.h / 2, (z0 + z1) / 2) });
    }
    vols.sort((p, q) => p.d - q.d);
    // bốn mặt bên: pháp tuyến (nx, ny) trên mặt bằng; mặt nào quay về phía người xem thì vẽ
    const sides = [[1, 0, "X"], [-1, 0, "x"], [0, 1, "Y"], [0, -1, "y"]];
    for (const { b, z0, z1 } of vols) {
      const x = b.x, y = b.y, X = b.x + b.w, Y = b.y + b.h, c = col(b);
      for (const [nx, ny, k] of sides) {
        const nv = nx * sn + ny * cs; if (nv <= 0.001) continue;
        const pts = k === "X" ? [[X, y], [X, Y]] : k === "x" ? [[x, Y], [x, y]] : k === "Y" ? [[X, Y], [x, Y]] : [[x, y], [X, y]];
        const f = [pj(pts[0][0], pts[0][1], z0), pj(pts[1][0], pts[1][1], z0), pj(pts[1][0], pts[1][1], z1), pj(pts[0][0], pts[0][1], z1)];
        poly(f, { fill: c, stroke: "var(--ink)", "stroke-width": 0.6 });
        poly(f, { fill: "#000", opacity: (0.06 + 0.22 * (1 - Math.abs(nx * cs - ny * sn))).toFixed(2), "pointer-events": "none" });
      }
      poly(quad(x, y, X, Y, z1), { fill: c, stroke: "var(--ink)", "stroke-width": 0.6 });
      if (b.top) for (let yy = y + 1.5; yy < Y - 0.5; yy += 3) { const [a1, a2] = pj(x + 0.6, yy, z1 + 0.02), [b1, b2] = pj(X - 0.6, yy, z1 + 0.02); el("line", { x1: a1, y1: a2, x2: b1, y2: b2, stroke: "#2f8fd6", "stroke-width": 1, opacity: 0.6 }, s); }
      if (b.w * b.h > 40) { const [tx, ty] = pj(x + b.w / 2, y + b.h / 2, z1); const t = el("text", { x: tx, y: ty, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 10, "font-weight": 700, fill: "var(--ink)", "pointer-events": "none" }, s); t.textContent = label(b); }
    }
    if (!s.__drag) {
      s.__drag = 1; s.style.touchAction = "none"; s.style.cursor = "grab";
      let st = null;
      s.addEventListener("pointerdown", e => { st = { x: e.clientX, y: e.clientY, yaw: VIEW.yaw, pitch: VIEW.pitch }; s.setPointerCapture(e.pointerId); s.style.cursor = "grabbing"; });
      s.addEventListener("pointermove", e => { if (!st) return; VIEW.yaw = st.yaw + (e.clientX - st.x) * 0.5; VIEW.pitch = Math.max(12, Math.min(88, st.pitch + (e.clientY - st.y) * 0.3)); isoSvg(); });
      const end = () => { st = null; s.style.cursor = "grab"; };
      s.addEventListener("pointerup", end); s.addEventListener("pointercancel", end);
      s.addEventListener("wheel", e => { e.preventDefault(); VIEW.zoom = Math.max(0.6, Math.min(2.5, VIEW.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); isoSvg(); }, { passive: false });
    }
  }



  /* ---------- khối 3D thật (three.js, có chiều sâu) — khối nào gần thì che khối xa, đúng như xếp trên mặt bằng ---------- */
  let T3 = null;
  function cssCol(c, scope) { const m = /var\((--[\w-]+)\)/.exec(c); if (!m) return c; const v = getComputedStyle(scope || document.documentElement).getPropertyValue(m[1]).trim(); return v || "#999"; }
  function iso() {
    const box = host.querySelector("#x10-3d"), svgEl = host.querySelector("#x10-iso");
    if (!window.THREE || !box) return isoSvg();
    if (!T3 || !box.contains(T3.r.domElement)) {
      if (T3) { try { T3.r.dispose(); T3.r.forceContextLoss && T3.r.forceContextLoss(); } catch (e) { /* bỏ qua */ } }
      let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return isoSvg(); }
      box.innerHTML = ""; box.appendChild(r.domElement); svgEl.hidden = true; box.hidden = false;
      r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, 1, 2000);
      sc.add(new THREE.AmbientLight(0xffffff, 0.62)); const sun = new THREE.DirectionalLight(0xffffff, 0.55); sun.position.set(-40, 80, 60); sc.add(sun);
      const grp = new THREE.Group(); sc.add(grp);
      T3 = { r, sc, cam, grp };
      const cv = r.domElement; cv.style.touchAction = "none"; cv.style.cursor = "grab"; cv.style.display = "block"; cv.style.width = "100%";
      let st = null;
      cv.addEventListener("pointerdown", e => { st = { x: e.clientX, y: e.clientY, yaw: VIEW.yaw, pitch: VIEW.pitch }; cv.setPointerCapture(e.pointerId); cv.style.cursor = "grabbing"; });
      cv.addEventListener("pointermove", e => { if (!st) return; VIEW.yaw = st.yaw + (e.clientX - st.x) * 0.5; VIEW.pitch = Math.max(8, Math.min(89, st.pitch + (e.clientY - st.y) * 0.3)); draw3(); });
      const end = () => { st = null; cv.style.cursor = "grab"; };
      cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
      cv.addEventListener("wheel", e => { e.preventDefault(); VIEW.zoom = Math.max(0.5, Math.min(3, VIEW.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); draw3(); }, { passive: false });
      if (!window.__x10rs) { window.__x10rs = 1; window.addEventListener("resize", () => draw3()); }
    }
    // dựng lại các khối
    const g = T3.grp; while (g.children.length) { const o = g.children.pop(); o.geometry && o.geometry.dispose(); o.material && (o.material.map && o.material.map.dispose(), o.material.dispose()); }
    const scope = host.querySelector(".x10"), edgeCol = cssCol("var(--ink)"), mat = c => new THREE.MeshLambertMaterial({ color: new THREE.Color(cssCol(c, scope)) });
    const slab = (x0, y0, x1, y1, h, c, op) => { const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, h, y1 - y0), new THREE.MeshLambertMaterial({ color: new THREE.Color(cssCol(c, scope)), transparent: op != null, opacity: op ?? 1 })); m.position.set((x0 + x1) / 2, h / 2 - 0.05, (y0 + y1) / 2); g.add(m); return m; };
    slab(0, 0, 41.5, 104, 0.1, "var(--sheet)"); slab(0, 0, 6, 104, 0.12, "var(--road)"); slab(6, 0, 41.5, 12, 0.12, "var(--pave)"); slab(6, 89, 41.5, 104, 0.12, "var(--road)"); slab(41.5, 0, 47.5, 104, 0.1, "var(--water)");
    { const pts = [[6, 12], [41.5, 12], [41.5, 89], [6, 89], [6, 12]].map(([x, y]) => new THREE.Vector3(x, 0.2, y)); g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: cssCol("var(--accent)"), dashSize: 1.2, gapSize: 0.8 })).computeLineDistances()); }
    // mũi tên Bắc
    { const a = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(-4, 0.3, 6), 7, edgeCol, 2, 1.4); g.add(a); }
    for (const b of S.blocks.filter(onSite)) {
      const c = col(b);
      if (b.kind === "court") { slab(b.x, b.y, b.x + b.w, b.y + b.h, 0.25, c, 0.85); continue; }
      let z0 = TOP[b.f - 1] || 0, z1 = TOP[b.f];
      if (/stair|lift|book/.test(b.kind) && !S.blocks.some(o => o !== b && onSite(o) && /stair|lift|book/.test(o.kind) && o.f > b.f && ovl(o, b) > 1)) z1 += 1.6;
      const geo = new THREE.BoxGeometry(b.w, z1 - z0, b.h), m = new THREE.Mesh(geo, mat(c));
      m.position.set(b.x + b.w / 2, (z0 + z1) / 2, b.y + b.h / 2); g.add(m);
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: edgeCol })); e.position.copy(m.position); g.add(e);
      if (b.top) for (let yy = b.y + 1.5; yy < b.y + b.h - 0.5; yy += 3) g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(b.x + 0.6, z1 + 0.03, yy), new THREE.Vector3(b.x + b.w - 0.6, z1 + 0.03, yy)]), new THREE.LineBasicMaterial({ color: 0x2f8fd6 })));
      if (b.w * b.h > 30) { const cv = document.createElement("canvas"); cv.width = 128; cv.height = 64; const x = cv.getContext("2d"); x.font = "bold 40px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = edgeCol; x.fillText(label(b).slice(0, 8), 64, 34); const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), depthTest: false, transparent: true })); sp.position.set(b.x + b.w / 2, z1 + 1.4, b.y + b.h / 2); sp.scale.set(5, 2.5, 1); g.add(sp); }
    }
    draw3();
  }
  function draw3() {
    if (!T3) return;
    const box = host.querySelector("#x10-3d"), W = box.clientWidth || 700, H = Math.round(Math.min(560, Math.max(320, W * 0.62)));
    T3.r.setSize(W, H, false); T3.r.domElement.style.height = H + "px"; T3.cam.aspect = W / H; T3.cam.updateProjectionMatrix();
    const yr = VIEW.yaw * Math.PI / 180, pr = VIEW.pitch * Math.PI / 180, d = 115 / VIEW.zoom, tx = 24, tz = 52;
    T3.cam.position.set(tx + d * Math.cos(pr) * Math.sin(yr), d * Math.sin(pr), tz + d * Math.cos(pr) * Math.cos(yr)); T3.cam.lookAt(tx, 3, tz);
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
  const payload = () => ({ kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: S.note || "", from: S.from || null, blocks: S.blocks.map(b => ({ id: b.id, c: b.c, n: b.n, kind: b.kind, a: b.a, x: b.x, y: b.y, w: b.w, h: b.h, f: b.f, top: !!b.top, onSite: onSite(b) })) });
  const say = t => { const e = host.querySelector("#x10-st"); if (e) e.textContent = t; };
  async function saveForClaude() {
    const db = window.claude && window.claude.use ? await window.claude.use("db") : null;
    if (!db) { say("Trang này không lưu lên được ở chế độ xem hiện tại. Hãy bấm Tải file rồi gửi file cho Claude."); return; }
    const data = payload();
    try {
      await db.doc("xepkhoi/ban-moi-nhat").set(data);
      try { await db.collection("xepkhoi_lich_su").add(data); } catch (e) { /* lịch sử là phụ; bản mới nhất đã lưu */ }
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
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="g10"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) render(); });
})(window.G3);
