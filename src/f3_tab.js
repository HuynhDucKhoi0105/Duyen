/* ================= Tab Final 3: bản xếp 10/11 và 5 ý tưởng giữ nguyên lý xếp ================= */
(function (G) {
  if (!G || !G.F3BASE || !G.F3IDEAS || !G.P6AUTO || !G.P6) return;
  const IDS = G.F3IDEAS.build(G.F3BASE.blocks);
  const PL = IDS.map(I => { const p = G.P6AUTO.autoPlan(I.blocks, { id: "chotF3" + I.key, code: I.code, name: I.name, tag: I.tag }); p.tag = I.tag; p.intro = `<p class="lede">${I.text}</p>`; return p; });
  G.F3PLANS = PL; G.CHOT = G.CHOT || []; for (const p of PL) G.CHOT.push(p);
  const host = document.getElementById("f3-host");
  if (!host || !G.P6VIEWER) return;
  const P6 = G.P6, DT = window.D || (typeof D !== "undefined" ? D : null), NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const onS = b => b.onSite !== false && !b.draft;
  const col = b => b.kind === "room" ? `var(--z${b.c[0]})` : b.kind === "stair" ? "var(--f3Stair)" : b.kind === "lift" || b.kind === "book" ? "var(--f3Lift)" : b.kind === "court" ? "var(--zOut)" : b.kind === "park" ? "var(--f3Park)" : b.kind === "frame" ? "none" : "var(--zCirc)";
  const label = b => b.kind === "room" ? b.c : b.kind === "book" ? "Lõi sách" : b.kind === "lift" ? "Thang + máy" : b.kind === "stair" ? "Thang" : b.kind === "park" ? "Gầm xe" : b.kind === "frame" ? "Khung lam" : b.kind === "court" ? "" : "Hành lang";
  const CSS = `
.f3t { display: grid; gap: 30px; --f3Stair: #e08a3c; --f3Lift: #8a6cc7; --f3Park: #c9d3d8; --f3Frame: #0e7490; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .f3t { --f3Park: #4a5559; --f3Frame: #5fd0e6; } }
:root[data-theme="dark"] .f3t { --f3Park: #4a5559; --f3Frame: #5fd0e6; }
.f3t .tw { overflow-x: auto; }
.f3t table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.f3t th, .f3t td { padding: 5px 7px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.f3t td.num, .f3t th.num { text-align: right; font-variant-numeric: tabular-nums; }
.f3t .good { color: var(--accent); font-weight: 700; } .f3t .warn { color: var(--warn); font-weight: 700; } .f3t .mid { color: #c98a00; font-weight: 700; }
.f3t .seg { display: flex; flex-wrap: wrap; gap: 0; }
.f3t .seg button { font: 600 13px var(--body); padding: 7px 11px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; margin: 0 -1px -1px 0; text-align: left; }
.f3t .seg button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.f3t .seg button:focus-visible, .f3t .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.f3t .btn { font: 600 13px var(--body); padding: 6px 12px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; border-radius: 3px; }
.f3t .duo { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 14px; align-items: start; }
@media (max-width: 900px) { .f3t .duo { grid-template-columns: 1fr; } }
.f3t .v3 { position: relative; border: 1px solid var(--line); border-radius: 3px; background: var(--paper); height: min(60vh, 520px); touch-action: none; cursor: grab; }
.f3t .v3 canvas { display: block; width: 100%; height: 100%; }
.f3t .v3 .zm { position: absolute; right: 8px; top: 8px; display: flex; gap: 4px; }
.f3t .v3 .zm button { min-width: 30px; height: 30px; font: 700 14px var(--body); border: 1px solid var(--ink); background: var(--sheet); color: var(--ink); cursor: pointer; border-radius: 3px; padding: 0 6px; }
.f3t .kp { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.f3t .kp figure { margin: 0; border: 1px solid var(--line); border-radius: 3px; background: var(--paper); }
.f3t .kp figcaption { font: 700 12.5px var(--body); padding: 6px 8px 0; }
.f3t .kp svg { display: block; width: 100%; height: auto; }
.f3t ul.pl { margin: 0; padding-left: 18px; display: grid; gap: 6px; font-size: 14px; max-width: 86ch; }
.f3t ul.chk { margin: 0; padding-left: 0; list-style: none; display: grid; gap: 5px; font-size: 13.5px; }
.f3t ul.chk li { padding-left: 20px; position: relative; }
.f3t ul.chk li::before { position: absolute; left: 0; font-weight: 800; }
.f3t ul.chk li.ok::before { content: "✓"; color: var(--accent); } .f3t ul.chk li.no::before { content: "!"; color: var(--warn); } .f3t ul.chk li.soft::before { content: "?"; color: #c98a00; }
.f3t .leg { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; }
.f3t .leg span { display: inline-flex; align-items: center; gap: 6px; }
.f3t .leg i { display: inline-block; width: 12px; height: 12px; border: 1px solid var(--ink); }
.f3t .note { font-size: 13px; color: var(--ink-2); }
`;
  /* ---------- mặt bằng khối một tầng ---------- */
  function plan(blocks, f) {
    const PX = 10, B = blocks.filter(onS), svg = el("svg", { viewBox: `${4 * PX} ${14 * PX} ${38.5 * PX} ${76 * PX}`, role: "img", "aria-label": `Tầng ${f}` });
    const R = (x, y, w, h, a) => el("rect", { x: x * PX, y: y * PX, width: w * PX, height: h * PX, ...a }, svg);
    const T = (s, x, y, a = {}) => { const e = el("text", { x: x * PX, y: y * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 12, fill: "var(--ink)", "font-family": "var(--body)", "font-weight": 700, ...a }, svg); e.textContent = s; return e; };
    R(4, 14, 38.5, 76, { fill: "var(--sheet)" });
    R(6, 12, 35.5, 77, { fill: "none", stroke: "var(--accent)", "stroke-width": 1, "stroke-dasharray": "6 4" });
    for (const b of B.filter(b => b.f < f && !/^(court|frame)$/.test(b.kind))) R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--ink-2)", "stroke-width": 0.8, "stroke-dasharray": "4 3", opacity: 0.6 });
    for (const b of B.filter(b => b.f === f)) {
      if (b.kind === "frame") { R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--f3Frame)", "stroke-width": 2.2, "stroke-dasharray": "2 3" }); for (let x = b.x + 1; x < b.x + b.w; x += 1.2) el("line", { x1: x * PX, y1: b.y * PX, x2: x * PX, y2: (b.y + b.h) * PX, stroke: "var(--f3Frame)", "stroke-width": 0.6, opacity: 0.6 }, svg); continue; }
      R(b.x, b.y, b.w, b.h, { fill: col(b), stroke: "var(--ink)", "stroke-width": 1, opacity: /^(court|park)$/.test(b.kind) ? 0.7 : 0.95, "stroke-dasharray": /^(court|park)$/.test(b.kind) ? "5 3" : null });
      if (b.w * b.h >= 8) { const cx = b.x + b.w / 2, cy = b.y + b.h / 2, t = T(label(b), cx, cy, { "font-size": b.w >= 6 && b.h >= 4 ? 14 : 9.5 }); if (b.h > b.w * 2 && b.w < 4) t.setAttribute("transform", `rotate(-90 ${cx * PX} ${cy * PX})`); }
    }
    return svg;
  }
  /* ---------- khối 3D ---------- */
  let V = null;
  function view3d(box, blocks) {
    if (V && V.dispose) V.dispose(); V = null;
    const THREE = window.THREE; box.querySelectorAll("canvas").forEach(c => c.remove());
    if (!THREE) { box.insertAdjacentHTML("afterbegin", `<p class="note" style="padding:12px">Trình duyệt chưa nạp được 3D.</p>`); return; }
    let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); box.prepend(r.domElement);
    const cs = getComputedStyle(host), C = v => { const m = /var\((--[\w-]+)\)/.exec(v); return new THREE.Color((m ? cs.getPropertyValue(m[1]) : v).trim() || "#999"); };
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    sc.add(new THREE.HemisphereLight(0xffffff, 0x8a8f8c, 0.62)); sc.add(new THREE.AmbientLight(0xffffff, 0.25));
    const sun = new THREE.DirectionalLight(0xffffff, 0.6); sun.position.set(70, 90, 110); sc.add(sun);
    const g = new THREE.Group(); sc.add(g);
    const slab = (x0, y0, x1, y1, z0, z1, c, op) => { const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, z1 - z0, y1 - y0), new THREE.MeshLambertMaterial({ color: C(c), transparent: op != null, opacity: op ?? 1 })); m.position.set((x0 + x1) / 2, (z0 + z1) / 2, (y0 + y1) / 2); g.add(m); return m; };
    slab(-6, -6, 54, 110, -0.3, -0.05, "var(--road)"); slab(0, 0, 41.5, 104, -0.05, 0.02, "var(--sheet)"); slab(41.5, -6, 54, 110, -0.3, -0.02, "var(--water)");
    const edge = new THREE.LineBasicMaterial({ color: C("var(--ink)"), transparent: true, opacity: 0.55 }), fr = new THREE.LineBasicMaterial({ color: C("var(--f3Frame)") });
    const z0 = f => 0.45 + 4.5 * (f - 1), B = blocks.filter(onS);
    const isCore = b => /^(stair|lift|book)$/.test(b.kind);
    for (const b of B) {
      if (b.kind === "court") continue;
      if (b.kind === "park") { slab(b.x, b.y, b.x + b.w, b.y + b.h, 0.02, 0.12, "var(--f3Park)"); continue; }
      if (b.kind === "frame") { const geo = new THREE.BoxGeometry(b.w, 4.3, b.h), e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), fr); e.position.set(b.x + b.w / 2, z0(b.f) + 2.15, b.y + b.h / 2); g.add(e); for (let x = b.x + 1.2; x < b.x + b.w; x += 1.2) { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, z0(b.f) + 4.3, b.y), new THREE.Vector3(x, z0(b.f) + 4.3, b.y + b.h)]), fr); g.add(l); } continue; }
      const above = isCore(b) && B.some(o => o.f === b.f + 1 && isCore(o) && Math.min(o.x + o.w, b.x + b.w) - Math.max(o.x, b.x) > 1 && Math.min(o.y + o.h, b.y + b.h) - Math.max(o.y, b.y) > 1);
      const m = slab(b.x, b.y, b.x + b.w, b.y + b.h, z0(b.f), z0(b.f) + 4.5 + (isCore(b) && !above ? 1.6 : 0) - 0.05, col(b), b.kind === "circ" ? 0.8 : null);
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), edge); e.position.copy(m.position); g.add(e);
    }
    const tgt = new THREE.Vector3(23.75, 5, 52), S = { th: 2.35, ph: 0.55, d: 120 };
    const place = () => { cam.position.set(tgt.x + S.d * Math.cos(S.ph) * Math.sin(S.th), tgt.y + S.d * Math.sin(S.ph), tgt.z + S.d * Math.cos(S.ph) * Math.cos(S.th)); cam.lookAt(tgt); };
    const draw = () => { const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); place(); r.render(sc, cam); };
    let drag = null;
    const pd = e => { if (e.target.closest("button")) return; drag = { x: e.clientX, y: e.clientY, th: S.th, ph: S.ph }; box.setPointerCapture && box.setPointerCapture(e.pointerId); };
    const pm = e => { if (!drag) return; S.th = drag.th - (e.clientX - drag.x) * 0.008; S.ph = Math.max(0.1, Math.min(1.5, drag.ph + (e.clientY - drag.y) * 0.006)); draw(); };
    const pu = () => { drag = null; };
    box.addEventListener("pointerdown", pd); box.addEventListener("pointermove", pm); box.addEventListener("pointerup", pu);
    const zi = () => { S.d = Math.max(45, S.d / 1.2); draw(); }, zo = () => { S.d = Math.min(400, S.d * 1.2); draw(); };
    const vs = {
      NE: () => { S.th = 2.35; S.ph = 0.55; draw(); }, SE: () => { S.th = 0.8; S.ph = 0.5; draw(); }, SW: () => { S.th = -0.8; S.ph = 0.5; draw(); }, NW: () => { S.th = -2.35; S.ph = 0.5; draw(); }
    };
    const bz = box.querySelector(".zm");
    const on = (q, f) => { const b = bz.querySelector(q); if (b) b.onclick = f; };
    on("[data-z='+']", zi); on("[data-z='-']", zo); on("[data-v='NE']", vs.NE); on("[data-v='SE']", vs.SE); on("[data-v='SW']", vs.SW); on("[data-v='NW']", vs.NW);
    const ro = window.ResizeObserver ? new ResizeObserver(draw) : null; if (ro) ro.observe(box);
    V = { draw, dispose() { if (ro) ro.disconnect(); box.removeEventListener("pointerdown", pd); box.removeEventListener("pointermove", pm); box.removeEventListener("pointerup", pu); try { r.dispose(); } catch (e) { /* bỏ qua */ } } };
    draw();
  }
  /* ---------- số liệu ---------- */
  const circOf = bl => bl.filter(b => onS(b) && !/^(room|court|park|frame)$/.test(b.kind)).reduce((t, b) => t + b.w * b.h, 0);
  const t3Of = bl => bl.filter(b => onS(b) && b.f === 3 && !/^(court|park|frame)$/.test(b.kind)).reduce((t, b) => t + b.w * b.h, 0);
  function stats(i) { const p = PL[i]; if (!p.__R) p.__R = P6.analyse(p, DT); const R = p.__R; return { R, errs: R.err.length + R.levels.reduce((t, M) => t + M.err.length, 0), circ: circOf(IDS[i].blocks), t3: t3Of(IDS[i].blocks), far: R.levels.map(M => M.far), b5: R.seats.B5 || 0, chk: G.T1CHK ? G.T1CHK.check({ blocks: IDS[i].blocks }) : null }; }
  let cur = 1, VW = null;
  function build() {
    if (!document.getElementById("f3t-style")) { const s = document.createElement("style"); s.id = "f3t-style"; s.textContent = CSS; document.head.appendChild(s); }
    G.P6V.css(); host.classList.add("f3t");
    const S = IDS.map((_, i) => stats(i)), cell = (v, lim, u = " m") => `<span class="${v <= lim ? "good" : "warn"}">${v > 1e6 ? "kẹt" : nf(v) + u}</span>`;
    host.innerHTML = `
<section style="display:grid;gap:10px">
  <p class="eyebrow">Final 3 · bản xếp khối ngày 10/11/2026</p>
  <h2>Thiếu hành lang, tầng 3 trống: 5 cách giữ nguyên lý xếp của bạn</h2>
  <p class="lede">Bản của bạn đang dùng đúng 780 m² giao thông (mức tối đa của đề) nhưng tầng 3 vẫn rời rạc: đọc yên tĩnh B2 chưa có lối vào. Giao thông vẫn bớt được khoảng 110 m² ở chỗ thừa, đủ để nối tầng 3 và thêm thang thoát hiểm. Cả 5 ý tưởng giữ cách xếp của bạn: cụm sự kiện ở đầu Bắc, dải kho nghiệp vụ dọc lối Tây, sân giữa, thiếu nhi và văn phòng ở phía Nam, khu đọc chồng lên dải Tây và dải Nam. Cửa do mình tự đặt theo luật, A4 là chỗ khách đi xuyên qua cổng từ.</p>
</section>
<section style="display:grid;gap:10px">
  <h3>Bản của bạn (10/11): chỗ cần sửa, cả 5 ý tưởng đều sửa</h3>
  <ul class="pl">
    <li><b>Thang Bắc mở ra hành lang trước quầy A4</b> (hành lang này chạm sảnh A1): người đọc lên thẳng khu đọc mà không qua cổng từ. Sửa: dời A4 lên sát A1 (khách đi xuyên qua A4), thang Bắc mở từ trong A4, hành lang cũ thu lại thành sảnh sau cổng từ; chỗ A4 cũ thành giếng trời nhỏ. Hành lang tầng 1 bớt 30 m².</li>
    <li><b>Tầng 3 chưa vào được đọc yên tĩnh B2:</b> hành lang đọc tầng 3 dừng ở y 60,9, B2 bắt đầu ở y 67,6; B2 cũng chỉ có thang ở đầu Bắc, cách khoảng 40 m. Sửa: hành lang nối 2,25 m dọc mép B2 (31 m²) và thang thoát hiểm Đông Nam 3 tầng ở khe giữa B3 và kỹ thuật E4.</li>
    <li><b>Lõi thang tầng 3 lệch 1,5 m so với tầng 2:</b> dời cho thẳng (cả bàn đọc tầng 3 dời theo).</li>
    <li><b>Hành lang thừa:</b> tầng 2 có hai hành lang chạy song song (hành lang đọc 1,64 m và hành lang học nhóm 2,02 m): bỏ hành lang học nhóm, dãy học nhóm dời 2 m sát hành lang đọc (37 m²). Sảnh thang Tây Nam tầng 2 to 26 m², thu còn 12 m². Hành lang tầng 3 rộng 3,4 m, thu còn 2,4 m (20 m²).</li>
    <li><b>Tầng 3 không có vệ sinh:</b> thêm vệ sinh 12 m² chồng lên dãy vệ sinh, học nhóm tầng 2; bỏ vệ sinh nhân viên riêng ở tầng 2 để tổng vệ sinh vẫn trong +10% đề.</li>
    <li><b>Tiếng ồn:</b> vệ sinh tầng 2 dời lên đầu dãy học nhóm, làm vùng đệm giữa học nhóm và bàn đọc.</li>
  </ul>
</section>
<section style="display:grid;gap:10px">
  <h3>So 6 phương án</h3>
  <div class="tw"><table><thead><tr><th></th>${IDS.map(I => `<th class="num">${esc(I.code)}</th>`).join("")}</tr></thead><tbody>
    <tr><td>Ý chính</td>${IDS.map(I => `<td style="font-size:12.5px;min-width:120px">${esc(I.name)}</td>`).join("")}</tr>
    <tr><td>Giao thông (≤ 780 m²)</td>${S.map(s => `<td class="num">${cell(s.circ, 780.5, " m²")}</td>`).join("")}</tr>
    <tr><td>Tổng sàn (≤ 3.000 m²)</td>${S.map(s => `<td class="num">${cell(s.R.total, 3000, " m²")}</td>`).join("")}</tr>
    <tr><td>Sàn tầng 3</td>${S.map(s => `<td class="num">${nf(s.t3)} m²</td>`).join("")}</tr>
    <tr><td>Thoát nạn xa nhất T1 · T2 · T3 (mốc 30 m)</td>${S.map(s => `<td class="num">${s.far.map(v => cell(v, 30.5, "")).join(" · ")}</td>`).join("")}</tr>
    <tr><td>Tra cứu số B5: chỗ xếp được (cần 16)</td>${S.map(s => `<td class="num"><span class="${s.b5 >= 16 ? "good" : "warn"}">${s.b5} chỗ</span></td>`).join("")}</tr>
    <tr><td>Số lỗi kiểm tra mặt bằng</td>${S.map(s => `<td class="num"><b class="${s.errs <= 13 ? "good" : s.errs <= 18 ? "mid" : "warn"}">${s.errs}</b></td>`).join("")}</tr>
  </tbody></table></div>
  <p class="note">Lỗi còn lại ở các ý tưởng chủ yếu là của cách xếp gốc: trưng bày A2, kho D3, E6 sát mép ±10% đề; quầy A4, xử lý C2 và vài phòng tầng 2 chưa có cửa sổ Bắc/Nam; phòng đa năng bị lõi thang che nắng Nam. Thoát nạn tầng 2 khoảng 32–33 m, hơi quá mốc 30 m mình tự đặt.</p>
</section>
<section style="display:grid;gap:12px">
  <div class="seg" role="group" aria-label="Chọn phương án">${IDS.map((I, i) => `<button type="button" data-i="${i}" aria-pressed="${i === cur}"><b>${esc(I.code)}</b> · ${esc(I.name)}</button>`).join("")}</div>
  <div id="f3-one"></div>
</section>
<section style="display:grid;gap:10px"><h3>Mặt bằng chi tiết (cửa, nội thất, 7 tình huống, tổng mặt bằng)</h3><p class="note">Chọn phương án ở hàng nút bên dưới; nút ở trên cũng đổi theo.</p><div id="f3-view"></div></section>`;
    host.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => pick(+b.dataset.i)));
    VW = G.P6VIEWER(host.querySelector("#f3-view"), () => PL, "f3", { ci: cur, noKhoi: true, groups: [["Bản xếp 10/11", /^F\.3/]] });
    VW.build();
    host.querySelector("#f3-view").addEventListener("click", e => { const b = e.target.closest("[data-pa]"); if (b) setTimeout(() => { const i = VW.ci; if (i !== cur) { cur = i; host.querySelectorAll("[data-i]").forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.i === cur))); one(); } }, 0); });
    one();
  }
  function pick(i) { cur = i; host.querySelectorAll("[data-i]").forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.i === i))); one(); if (VW) { VW.ci = i; VW.build(); } }
  function one() {
    const I = IDS[cur], s = stats(cur), box = host.querySelector("#f3-one");
    const chk = s.chk ? s.chk.out.filter(o => !/Đi bộ|Bảo vệ E3|Quầy A4/.test(o.t)) : [];
    box.innerHTML = `
<div style="display:grid;gap:12px">
  <h3 style="margin:0">${esc(I.code)} · ${esc(I.name)}</h3>
  <p style="max-width:86ch;margin:0">${esc(I.text)}</p>
  <div class="duo">
    <div class="v3" id="f3-3d" aria-label="Khối 3D, kéo để xoay"><div class="zm"><button type="button" data-v="NE" title="Nhìn từ quảng trường và sông">Đông Bắc</button><button type="button" data-v="SE" title="Nhìn từ sông, phía Nam">Đông Nam</button><button type="button" data-v="SW" title="Nhìn từ bãi xe, Trần Phú">Tây Nam</button><button type="button" data-v="NW" title="Nhìn từ Trần Phú, quảng trường">Tây Bắc</button><button type="button" data-z="+" aria-label="Phóng to">+</button><button type="button" data-z="-" aria-label="Thu nhỏ">−</button></div></div>
    <div class="kp">${[1, 2, 3].map(f => `<figure><figcaption>Tầng ${f}</figcaption><div data-kp="${f}"></div></figure>`).join("")}</div>
  </div>
  <div class="leg">${["A", "B", "C", "D", "E"].map(z => `<span><i style="background:var(--z${z})"></i>${{ A: "A Đón tiếp", B: "B Đọc", C: "C Kho", D: "D Văn hóa", E: "E Hỗ trợ" }[z]}</span>`).join("")}<span><i style="background:var(--zCirc)"></i>Hành lang</span><span><i style="background:var(--f3Stair)"></i>Thang</span><span><i style="background:var(--f3Lift)"></i>Thang máy, lõi sách</span><span><i style="background:var(--f3Park)"></i>Gầm xe</span><span><i style="border:2px dashed var(--f3Frame);background:none"></i>Khung lam, sân thượng</span><span><i style="border-style:dashed;background:none"></i>Tầng dưới</span></div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px">
    <div><h4 style="margin:0 0 6px">Kiểm tra trên khối</h4><ul class="chk">${chk.map(o => `<li class="${o.ok ? "ok" : o.hard ? "no" : "soft"}">${esc(o.t)}</li>`).join("")}</ul></div>
    <div><h4 style="margin:0 0 6px">Số liệu</h4><ul class="pl"><li>Giao thông ${nf(s.circ)}/780 m², tổng sàn ${nf(s.R.total)} m², tầng 3 ${nf(s.t3)} m².</li><li>Thoát nạn xa nhất ${s.far.map(v => v > 1e6 ? "kẹt" : nf(v) + " m").join(" · ")}.</li><li>${s.errs} lỗi theo kiểm tra mặt bằng đầy đủ (xem bên dưới).</li></ul>
      <div style="margin-top:10px"><button type="button" class="btn" id="f3-dl">Tải khối ${esc(I.code)} (mở được trong Tự xếp khối)</button></div></div>
  </div>
</div>`;
    for (const f of [1, 2, 3]) box.querySelector(`[data-kp="${f}"]`).appendChild(plan(I.blocks, f));
    view3d(box.querySelector("#f3-3d"), I.blocks);
    box.querySelector("#f3-dl").addEventListener("click", () => {
      const d = { kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: `${I.code} · ${I.name}`, from: "F.2d", blocks: I.blocks.filter(b => b.kind !== "frame") };
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 1)], { type: "application/json" })); a.download = `final3-${I.code.replace(/\./g, "")}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
  }
  let started = false;
  const start = () => { if (started) { if (V) V.draw(); return; } started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="f3"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="f3"]');
  if (panel && !panel.hidden) start();
})(window.G3);
