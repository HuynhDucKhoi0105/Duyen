/* ================= Tab Final 1: bản xếp khối của bạn, giữ nguyên 100% =================
   Dữ liệu là file xep-khoi-arc329.json bạn gửi (G3.F1), không thêm, sửa, xoá khối nào.
   Mặt bằng chi tiết dựng y như khung "Mặt bằng chi tiết" trong tab Tự xếp khối:
   P6.fromBlocks(phương án nguồn trong file, các khối trên khu đất), không vá cửa hay hành lang. */
(function (G) {
  if (!G || !G.F1) return;
  const host = document.getElementById("f1-host");
  if (!host) return;
  const F = G.F1, NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const KIND = { room: "Phòng", circ: "Sảnh, hành lang", stair: "Thang bộ", lift: "Thang bộ + thang máy", book: "Lõi sách", court: "Sân trong" };
  const col = b => b.kind === "room" ? `var(--z${b.c[0]})` : b.kind === "stair" ? "var(--f1Stair)" : b.kind === "lift" || b.kind === "book" ? "var(--f1Lift)" : b.kind === "court" ? "var(--zOut)" : "var(--zCirc)";
  const label = b => b.kind === "room" ? b.c : b.kind === "book" ? "Lõi sách" : b.kind === "circ" ? "Sảnh, hành lang" : KIND[b.kind] || b.kind;
  const onSite = b => b.onSite && !b.draft;
  const SITEB = F.blocks.filter(onSite), DRAFT = F.blocks.filter(b => !onSite(b));
  const floors = [...new Set(SITEB.map(b => b.f))].sort();
  const saved = (() => { try { return new Date(F.savedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }); } catch (e) { return F.savedAt; } })();
  const CSS = `
.f1 { display: grid; gap: 28px; --f1Stair: #e08a3c; --f1Lift: #8a6cc7; --xdimC: #0e7490; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .f1 { --xdimC: #5fd0e6; } }
:root[data-theme="dark"] .f1 { --xdimC: #5fd0e6; }
.f1 .bar { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.f1 .bar .k { font: 600 12px var(--mono); color: var(--ink-2); }
.f1 .seg button { font: 600 13px var(--body); padding: 6px 10px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; margin-right: -1px; }
.f1 .seg button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.f1 .seg button:focus-visible, .f1 .btn:focus-visible, .f1 label:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
.f1 .btn { font: 600 13px var(--body); padding: 6px 12px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; border-radius: 3px; }
.f1 label.ck { font: 600 13px var(--body); display: inline-flex; gap: 5px; align-items: center; }
.f1 .stat { display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 14px; }
.f1 .stat b { font-variant-numeric: tabular-nums; }
.f1 .kp { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; align-items: start; }
.f1 .kp figure { margin: 0; border: 1px solid var(--line); border-radius: 3px; background: var(--paper); }
.f1 .kp figcaption { font: 700 13px var(--body); padding: 8px 10px 0; }
.f1 .kp svg { display: block; width: 100%; height: auto; }
.f1 .v3 { position: relative; border: 1px solid var(--line); border-radius: 3px; background: var(--paper); height: min(62vh, 560px); touch-action: none; cursor: grab; }
.f1 .v3 canvas { display: block; width: 100%; height: 100%; }
.f1 .v3 .zm { position: absolute; right: 8px; top: 8px; display: flex; gap: 4px; }
.f1 .v3 .zm button { width: 30px; height: 30px; font: 700 16px var(--body); border: 1px solid var(--ink); background: var(--sheet); color: var(--ink); cursor: pointer; border-radius: 3px; }
.f1 .leg { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12.5px; }
.f1 .leg span { display: inline-flex; align-items: center; gap: 6px; }
.f1 .leg i { display: inline-block; width: 12px; height: 12px; border: 1px solid var(--ink); }
.f1 .tw { overflow-x: auto; }
.f1 table { width: 100%; border-collapse: collapse; font-size: 13px; }
.f1 th, .f1 td { padding: 4px 6px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.f1 td.num, .f1 th.num { text-align: right; font-variant-numeric: tabular-nums; }
.f1 .note { font-size: 13px; color: var(--ink-2); }
.f1 details.er summary { cursor: pointer; font-weight: 700; }
.f1 details.er ul { font-size: 13px; columns: 2 360px; margin: 8px 0 0; padding-left: 18px; }
.f1 .p6 { gap: 12px; }
`;
  /* ---------- mặt bằng khối từng tầng (giống khung xếp khối) ---------- */
  function blockPlan(f) {
    const PX = 10, svg = el("svg", { viewBox: `-2 ${7 * PX} ${48.5 * PX} ${87 * PX}`, role: "img", "aria-label": `Bản xếp khối tầng ${f}` });
    const R = (x, y, w, h, a) => el("rect", { x: x * PX, y: y * PX, width: w * PX, height: h * PX, ...a }, svg);
    const T = (s, x, y, a = {}) => { const e = el("text", { x: x * PX, y: y * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 13, fill: "var(--ink-2)", "font-family": "var(--body)", ...a }, svg); e.textContent = s; return e; };
    R(0, 0, 41.5, 104, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5 });
    R(0, 0, 6, 104, { fill: "var(--road)" }); T("Lối Tây", 4.9, 30, { transform: `rotate(-90 ${4.9 * PX} ${30 * PX})`, "font-size": 11 });
    R(6, 0, 35.5, 12, { fill: "var(--pave)" }); T("Quảng trường Bắc", 23.75, 8.6);
    R(6, 89, 35.5, 15, { fill: "var(--road)" }); T("Bãi xe", 23.75, 91.5);
    R(41.5, 0, 6, 104, { fill: "var(--water)" }); T("Bờ sông · Bạch Đằng", 44.5, 52, { transform: `rotate(90 ${44.5 * PX} ${52 * PX})` });
    for (let x = 6; x <= 41.5; x += 8) el("line", { x1: x * PX, y1: 12 * PX, x2: x * PX, y2: 89 * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    for (let y = 12; y <= 89; y += 8) el("line", { x1: 6 * PX, y1: y * PX, x2: 41.5 * PX, y2: y * PX, stroke: "var(--line)", "stroke-dasharray": "4 6" }, svg);
    R(6, 12, 35.5, 77, { fill: "none", stroke: "var(--accent)", "stroke-width": 1.5, "stroke-dasharray": "8 5" });
    // tầng khác: chỉ viền nét đứt để so
    for (const b of SITEB.filter(b => b.f !== f)) R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--ink-2)", "stroke-width": 1, "stroke-dasharray": b.f < f ? "5 4" : "2 3", opacity: 0.8 });
    for (const b of SITEB.filter(b => b.f === f)) {
      R(b.x, b.y, b.w, b.h, { fill: col(b), stroke: "var(--ink)", "stroke-width": 1.2, opacity: 0.96 });
      if (b.w * b.h >= 6) {
        const big = b.w >= 6 && b.h >= 4, cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        const t1 = T(label(b) + (b.top ? " ☀" : ""), cx, cy - (big ? 0.9 : 0), { "font-size": big ? 19 : b.w < 4.5 ? 10 : 12, "font-weight": 800, fill: "var(--ink)" });
        if (!big && b.w < 2) t1.setAttribute("transform", `rotate(-90 ${cx * PX} ${cy * PX})`);
        if (big) T(`${nf(b.w * b.h, 0)} m² · ${nf(b.w, 1)} × ${nf(b.h, 1)}`, cx, cy + 1.3, { "font-size": 11.5 });
      }
    }
    if (G.XDIM) G.XDIM.svg(svg, SITEB.filter(b => b.f === f), PX, { fs: 13 });
    const nAng = window.ARC_NORTH != null ? window.ARC_NORTH : 20, ng = el("g", { transform: `translate(${44.5 * PX} ${15 * PX}) rotate(${nAng}) scale(1.2)` }, svg);
    el("path", { d: "M0 -16 L8 8 L0 4 L-8 8 Z", fill: "var(--ink)" }, ng); const nt = el("text", { x: 0, y: -22, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--ink)" }, ng); nt.textContent = "Bắc";
    return svg;
  }
  /* ---------- khối 3D ---------- */
  let V = null;
  function view3d(box) {
    const THREE = window.THREE; if (!THREE) { box.innerHTML = `<p class="note" style="padding:12px">Trình duyệt chưa nạp được 3D.</p>`; return; }
    let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { box.innerHTML = `<p class="note" style="padding:12px">Trình duyệt không mở được WebGL.</p>`; return; }
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); box.prepend(r.domElement);
    const cs = getComputedStyle(host), C = v => { const m = /var\((--[\w-]+)\)/.exec(v); return new THREE.Color((m ? cs.getPropertyValue(m[1]) : v).trim() || "#999"); };
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    sc.add(new THREE.HemisphereLight(0xffffff, 0x8a8f8c, 0.62)); sc.add(new THREE.AmbientLight(0xffffff, 0.25));
    const sun = new THREE.DirectionalLight(0xffffff, 0.6); sun.position.set(70, 90, 110); sc.add(sun);
    const g = new THREE.Group(); sc.add(g);
    const slab = (x0, y0, x1, y1, z0, z1, c, op) => { const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, z1 - z0, y1 - y0), new THREE.MeshLambertMaterial({ color: C(c), transparent: op != null, opacity: op ?? 1 })); m.position.set((x0 + x1) / 2, (z0 + z1) / 2, (y0 + y1) / 2); g.add(m); return m; };
    slab(-6, -6, 54, 110, -0.3, -0.05, "var(--road)");
    slab(0, 0, 41.5, 104, -0.05, 0.02, "var(--sheet)");
    slab(41.5, -6, 54, 110, -0.3, -0.02, "var(--water)");
    const edge = new THREE.LineBasicMaterial({ color: C("var(--ink)"), transparent: true, opacity: 0.55 });
    const z0 = f => 0.45 + 4.5 * (f - 1);
    for (const b of SITEB) {
      const core = /^(stair|lift|book)$/.test(b.kind);
      const above = core && SITEB.some(o => o.f === b.f + 1 && /^(stair|lift|book)$/.test(o.kind) && Math.min(o.x + o.w, b.x + b.w) - Math.max(o.x, b.x) > 1 && Math.min(o.y + o.h, b.y + b.h) - Math.max(o.y, b.y) > 1);
      const top = z0(b.f) + 4.5 + (core && !above ? 1.6 : 0);
      const m = slab(b.x, b.y, b.x + b.w, b.y + b.h, z0(b.f), top, col(b), b.kind === "circ" ? 0.75 : null);
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), edge); e.position.copy(m.position); g.add(e);
    }
    const dg = new THREE.Group(); g.add(dg);
    const dimsAt = k => { for (const c of [...dg.children]) { dg.remove(c); if (c.geometry) c.geometry.dispose(); if (c.material) { if (c.material.map) c.material.map.dispose(); c.material.dispose(); } }
      if (!G.XDIM || k === "off") return; const fl = k === "all" ? null : +k; G.XDIM.three(THREE, dg, SITEB.filter(b => !fl || b.f === fl), fl ? z0(fl) + 0.12 : 0.3, { ink: "#" + C("var(--ink)").getHexString(), cl: "#" + C("var(--xdimC)").getHexString(), halo: "#" + C("var(--sheet)").getHexString() }); };
    dimsAt(box.dataset.dk || "all");
    box.parentNode.querySelectorAll("[data-dk]").forEach(b => b.addEventListener("click", () => { box.parentNode.querySelectorAll("[data-dk]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); dimsAt(b.dataset.dk); draw(); }));
    const tgt = new THREE.Vector3(23.75, 4, 52);
    const S = { th: -0.75, ph: 0.62, d: 115 };
    const place = () => { cam.position.set(tgt.x + S.d * Math.cos(S.ph) * Math.sin(S.th), tgt.y + S.d * Math.sin(S.ph), tgt.z + S.d * Math.cos(S.ph) * Math.cos(S.th)); cam.lookAt(tgt); };
    const draw = () => { const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); place(); r.render(sc, cam); };
    let drag = null;
    box.addEventListener("pointerdown", e => { if (e.target.closest("button")) return; drag = { x: e.clientX, y: e.clientY, th: S.th, ph: S.ph }; box.setPointerCapture && box.setPointerCapture(e.pointerId); box.style.cursor = "grabbing"; });
    box.addEventListener("pointermove", e => { if (!drag) return; S.th = drag.th - (e.clientX - drag.x) * 0.008; S.ph = Math.max(0.12, Math.min(1.45, drag.ph + (e.clientY - drag.y) * 0.006)); draw(); });
    const up = () => { drag = null; box.style.cursor = ""; }; box.addEventListener("pointerup", up); box.addEventListener("pointercancel", up);
    box.querySelector("[data-z='+']").addEventListener("click", () => { S.d = Math.max(50, S.d / 1.2); draw(); });
    box.querySelector("[data-z='-']").addEventListener("click", () => { S.d = Math.min(400, S.d * 1.2); draw(); });
    if (window.ResizeObserver) new ResizeObserver(draw).observe(box);
    V = { draw }; draw();
  }
  /* ---------- mặt bằng chi tiết: y như khung "Mặt bằng chi tiết" lúc xếp ---------- */
  let plan = null, R = null, src = null, lv = 0, sc = "0";
  const ly = { furn: true, light: true, dim: false, staff: false, route: false, lab: true };
  function makePlan() {
    src = (G.CHOT || []).find(p => p.code === F.from) || null;
    plan = G.P6.fromBlocks(src, SITEB.filter(b => b.kind !== "court"));
    return plan;
  }
  function drawMB() {
    const svg = host.querySelector("#f1-mb"); if (!svg || !G.P6V) return;
    R = G.P6V.draw(svg, plan, lv, { ...ly, sc });
    svg.style.minWidth = "0";
    const S = G.P6V.SCN ? G.P6V.SCN.find(s => s[0] === sc) : null;
    host.querySelector("#f1-scn").textContent = S ? S[2] : "";
    host.querySelector("#f1-leg").innerHTML = G.P6V.legend ? G.P6V.legend(sc) : "";
  }
  /* ---------- khung trang ---------- */
  function build() {
    if (!document.getElementById("f1-style")) { const s = document.createElement("style"); s.id = "f1-style"; s.textContent = CSS; document.head.appendChild(s); }
    if (G.P6V) G.P6V.css();
    host.classList.add("f1");
    const cnt = f => SITEB.filter(b => b.f === f).length;
    const rooms = SITEB.filter(b => b.kind === "room"), sumR = rooms.reduce((t, b) => t + b.w * b.h, 0), sumC = SITEB.filter(b => b.kind !== "room" && b.kind !== "court").reduce((t, b) => t + b.w * b.h, 0);
    let mbOk = true; try { makePlan(); } catch (e) { mbOk = false; console.error(e); }
    host.innerHTML = `
<section style="display:grid;gap:10px">
  <p class="eyebrow">Final 1 · bản xếp khối của bạn</p>
  <h2>Final 1: khối và mặt bằng, giữ nguyên 100%</h2>
  <p class="lede">Đây là đúng file <b>xep-khoi-arc329.json</b> bạn xếp trong tab Tự xếp khối (lưu lúc ${esc(saved)}). Không khối nào bị thêm, sửa, xoá hay dời: vị trí, kích thước, tầng, mã phòng đều lấy thẳng từ file.</p>
  <div class="stat"><span><b>${F.blocks.length}</b> khối trong file</span><span><b>${SITEB.length}</b> khối trên khu đất (${floors.map(f => `tầng ${f}: ${cnt(f)}`).join(", ")})</span><span><b>${DRAFT.length}</b> khối còn trên bàn nháp</span><span>Phòng cộng <b>${nf(sumR)}</b> m²</span><span>Thang, sảnh, hành lang <b>${nf(sumC)}</b> m²</span><span>Bắt đầu từ <b>${esc(F.from || "–")}</b></span></div>
  ${F.note ? `<p class="note">Ghi chú trong file: ${esc(F.note)}</p>` : ""}
  <div class="bar"><button type="button" class="btn" id="f1-dl">Tải file JSON gốc</button><span class="note">Mở lại trong tab Tự xếp khối bằng nút Nhập file của tab đó.</span></div>
</section>
<section style="display:grid;gap:12px">
  <h3>Bản xếp khối từng tầng</h3>
  <div class="kp">${floors.map(f => `<figure><figcaption>Tầng ${f} · ${cnt(f)} khối${G.XDIM ? `<br><span class="note" style="font-weight:500">${esc(G.XDIM.text(SITEB.filter(b => b.f === f)))}</span>` : ""}</figcaption><div data-kp="${f}"></div></figure>`).join("")}</div>
  <div class="leg">${["A", "B", "C", "D", "E"].map(z => `<span><i style="background:var(--z${z})"></i>${{ A: "A Đón tiếp", B: "B Đọc", C: "C Kho, nghiệp vụ", D: "D Văn hóa", E: "E Hỗ trợ" }[z]}</span>`).join("")}<span><i style="background:var(--zCirc)"></i>Sảnh, hành lang</span><span><i style="background:var(--f1Stair)"></i>Thang bộ</span><span><i style="background:var(--f1Lift)"></i>Thang máy, lõi sách</span><span><i style="background:transparent;border-style:dashed"></i>Khối tầng khác</span><span>☀ lấy sáng mái</span></div>
</section>
<section style="display:grid;gap:10px">
  <h3>Khối 3D</h3>
  <div class="bar"><span class="k">Kích thước tổng</span><span class="seg" role="group" aria-label="Kích thước tổng trong 3D">${[["all", "Cả nhà"], ...floors.map(f => [String(f), "Tầng " + f]), ["off", "Ẩn"]].map(([k, t], i) => `<button type="button" data-dk="${k}" aria-pressed="${i === 0}">${t}</button>`).join("")}</span></div>
  <div class="v3" id="f1-3d" aria-label="Khối 3D, kéo để xoay"><div class="zm"><button type="button" data-z="+" aria-label="Phóng to">+</button><button type="button" data-z="-" aria-label="Thu nhỏ">−</button></div></div>
  <p class="note">Kéo để xoay. Tầng 1 cao từ +0,45 tới +4,95 m, tầng 2 tới +9,45 m; thang nhô khỏi mái 1,6 m.</p>
</section>
<section style="display:grid;gap:12px" class="p6">
  <h3>Mặt bằng chi tiết</h3>
  ${mbOk ? `<p class="note">Dựng y như khung "Mặt bằng chi tiết" lúc bạn xếp: lấy phương án ${esc(F.from)} rồi đặt lại từng phòng đúng theo khối của bạn. Cửa, nội thất theo ${esc(F.from)}; không vá thêm cửa hay hành lang, nên chỗ nào khối đã dời xa phòng nó có cửa tới thì cửa đó báo lỗi bên dưới. Khối trên bàn nháp không tính.</p>
  <div class="stat" id="f1-mst"></div>
  <div class="bar"><span class="k">Tầng</span><span class="seg" role="group" aria-label="Tầng">${plan.levels.map((L, i) => `<button type="button" data-lv="${i}" aria-pressed="${i === lv}">Tầng ${i + 1}</button>`).join("")}</span></div>
  <div class="bar"><span class="k">Tình huống</span><span class="seg" role="group" aria-label="Tình huống">${(G.P6V && G.P6V.SCN || []).map(([k, t]) => `<button type="button" data-sc="${k}" aria-pressed="${k === sc}">${esc(t)}</button>`).join("")}</span></div>
  <div class="bar"><span class="k">Lớp</span>${[["furn", "Nội thất"], ["light", "Cửa sổ Bắc/Nam, vùng tối"], ["dim", "Trục, kích thước"], ["staff", "Người trực"], ["route", "Tuyến đi"], ["lab", "Tên phòng"]].map(([k, t]) => `<label class="ck"><input type="checkbox" data-ly="${k}" ${ly[k] ? "checked" : ""}>${t}</label>`).join("")}</div>
  <p class="note" id="f1-scn"></p>
  <div class="plan"><svg id="f1-mb" role="img" aria-label="Mặt bằng chi tiết"></svg></div>
  <div class="leg" id="f1-leg"></div>
  <div class="two"><div style="display:grid;gap:10px"><h3>Kiểm tra theo đề</h3><ul class="chk" id="f1-chk"></ul></div>
    <div style="display:grid;gap:10px"><h3>Diện tích và số chỗ so với đề</h3><div class="sheet scroll" id="f1-area"></div></div></div>
  <details class="er" id="f1-er"><summary></summary><ul></ul></details>` : `<p class="note">Chưa dựng được mặt bằng chi tiết trên trình duyệt này.</p>`}
</section>
<section style="display:grid;gap:10px">
  <h3>Bảng ${F.blocks.length} khối trong file</h3>
  <p class="note">Toạ độ như các mặt bằng khác: x đi về phía Đông (sông), y đi về phía Nam, đơn vị mét. Số liệu lấy thẳng từ file, làm tròn khi hiển thị.</p>
  <div class="tw"><table><thead><tr><th>Tầng</th><th>Mã</th><th>Tên</th><th>Loại</th><th class="num">x</th><th class="num">y</th><th class="num">Rộng Đ–T</th><th class="num">Sâu B–N</th><th class="num">m²</th><th>Ở đâu</th></tr></thead><tbody>
  ${[...SITEB.slice().sort((a, b) => a.f - b.f || a.y - b.y || a.x - b.x), ...DRAFT].map(b => `<tr><td>${b.f}</td><td><b>${esc(b.kind === "room" ? b.c : "")}</b></td><td>${esc(b.n)}</td><td>${esc(KIND[b.kind] || b.kind)}</td><td class="num">${nf(b.x, 2)}</td><td class="num">${nf(b.y, 2)}</td><td class="num">${nf(b.w, 2)}</td><td class="num">${nf(b.h, 2)}</td><td class="num">${nf(b.w * b.h, 1)}</td><td>${onSite(b) ? "Khu đất" + (b.top ? " · lấy sáng mái" : "") : "Bàn nháp"}</td></tr>`).join("")}
  </tbody></table></div>
</section>`;
    for (const f of floors) host.querySelector(`[data-kp="${f}"]`).appendChild(blockPlan(f));
    host.querySelector("#f1-dl").addEventListener("click", () => {
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(F, null, 1)], { type: "application/json" })); a.download = "xep-khoi-arc329-final1.json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
    view3d(host.querySelector("#f1-3d"));
    if (!mbOk) return;
    drawMB();
    host.querySelector("#f1-mst").innerHTML = `<span>Tổng sàn <b>${nf(R.total)}</b> m²</span><span>Các phòng <b>${nf(R.use)}</b> m²</span><span>Giao thông <b>${nf(R.circ)}</b> m²</span><span><b style="color:${R.err.length ? "var(--warn)" : "var(--accent)"}">${R.err.length + R.levels.reduce((t, M) => t + M.err.length, 0)}</b> lỗi theo kiểm tra mặt bằng đầy đủ</span>`;
    host.querySelector("#f1-chk").innerHTML = G.P6V.checks(plan).map(([ok, t]) => `<li><span class="${ok ? "ok" : "bad"}">${ok ? "Đạt" : "Chưa đạt"}</span> · ${esc(t)}</li>`).join("");
    host.querySelector("#f1-area").innerHTML = G.P6V.roomTable(plan);
    const all = [...R.levels.flatMap((M, i) => M.err.map(e => `Tầng ${i + 1}: ${e}`)), ...R.err];
    host.querySelector("#f1-er summary").textContent = all.length ? `Xem đủ ${all.length} lỗi kiểm tra` : "Qua mọi kiểm tra";
    host.querySelector("#f1-er ul").innerHTML = all.map(e => `<li>${esc(e)}</li>`).join("");
    host.querySelectorAll("[data-lv]").forEach(b => b.addEventListener("click", () => { lv = +b.dataset.lv; host.querySelectorAll("[data-lv]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); drawMB(); }));
    host.querySelectorAll("[data-sc]").forEach(b => b.addEventListener("click", () => { sc = b.dataset.sc; host.querySelectorAll("[data-sc]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); drawMB(); }));
    host.querySelectorAll("[data-ly]").forEach(c => c.addEventListener("change", () => { ly[c.dataset.ly] = c.checked; drawMB(); }));
  }
  let started = false;
  const start = () => { if (started) { if (V) V.draw(); return; } started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="f1"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="f1"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) { host.querySelectorAll("[data-kp]").forEach(d => { d.innerHTML = ""; d.appendChild(blockPlan(+d.dataset.kp)); }); drawMB(); } });
})(window.G3);
