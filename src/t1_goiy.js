/* ================= Tab Gợi ý tầng 1 (09/11/2026) =================
   Đánh giá tầng 1 trong file của bạn và 3 gợi ý; không sửa file của bạn. Dữ liệu: G3.T1IDEAS, kiểm tra: G3.T1CHK. */
(function (G) {
  if (!G || !G.T1IDEAS || !G.T1CHK) return;
  const host = document.getElementById("t1g-host");
  if (!host) return;
  const IDS = G.T1IDEAS, CHK = G.T1CHK, NS = "http://www.w3.org/2000/svg";
  const el = (t, a = {}, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const col = b => b.kind === "room" ? `var(--z${b.c[0]})` : b.kind === "stair" ? "var(--t1Stair)" : b.kind === "lift" || b.kind === "book" ? "var(--t1Lift)" : b.kind === "court" ? "var(--zOut)" : "var(--zCirc)";
  const label = b => b.kind === "room" ? b.c : b.kind === "book" ? "Lõi sách" : b.kind === "lift" ? "Thang + máy" : b.kind === "stair" ? "Thang" : b.kind === "court" ? "" : "Hành lang";
  const CSS = `
.t1g { display: grid; gap: 30px; --t1Stair: #e08a3c; --t1Lift: #8a6cc7; --t1Park: #0e7490; --t1Plaza: #b4441f; --t1Bike: #7b4fb0; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .t1g { --t1Park: #5fd0e6; --t1Plaza: #f08a63; --t1Bike: #c3a6f2; } }
:root[data-theme="dark"] .t1g { --t1Park: #5fd0e6; --t1Plaza: #f08a63; --t1Bike: #c3a6f2; }
.t1g .bar { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.t1g .seg button { font: 600 13px var(--body); padding: 7px 12px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; margin-right: -1px; }
.t1g .seg button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.t1g .seg button:focus-visible, .t1g .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.t1g .btn { font: 600 13px var(--body); padding: 6px 12px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; border-radius: 3px; }
.t1g .kp { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 400px)); gap: 12px; align-items: start; }
.t1g .kp figure { margin: 0; border: 1px solid var(--line); border-radius: 3px; background: var(--paper); }
.t1g .kp figcaption { font: 700 13px var(--body); padding: 8px 10px 0; }
.t1g .kp svg { display: block; width: 100%; height: auto; }
.t1g .leg { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12.5px; }
.t1g .leg span { display: inline-flex; align-items: center; gap: 6px; }
.t1g .leg i { display: inline-block; width: 12px; height: 12px; border: 1px solid var(--ink); }
.t1g .leg i.ln { width: 22px; height: 0; border: 0; border-top: 3px dashed; }
.t1g table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.t1g th, .t1g td { padding: 5px 7px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.t1g td.num, .t1g th.num { text-align: right; font-variant-numeric: tabular-nums; }
.t1g .tw { overflow-x: auto; }
.t1g .good { color: var(--accent); font-weight: 700; } .t1g .warn { color: var(--warn); font-weight: 700; }
.t1g .two { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; align-items: start; }
.t1g ul.chk { margin: 0; padding-left: 0; list-style: none; display: grid; gap: 5px; font-size: 14px; }
.t1g ul.chk li { padding-left: 20px; position: relative; }
.t1g ul.chk li::before { position: absolute; left: 0; font-weight: 800; }
.t1g ul.chk li.ok::before { content: "✓"; color: var(--accent); }
.t1g ul.chk li.no::before { content: "!"; color: var(--warn); }
.t1g ul.chk li.soft::before { content: "?"; color: #c98a00; }
.t1g ul.pl { margin: 0; padding-left: 18px; display: grid; gap: 5px; font-size: 14px; max-width: 80ch; }
.t1g .note { font-size: 13px; color: var(--ink-2); }
`;
  /* ---------- mặt bằng khối một tầng, có đường đi bộ ---------- */
  function plan(I, f) {
    const PX = 10, B = I.blocks.filter(b => b.onSite !== false && !b.draft), svg = el("svg", { viewBox: `-2 ${3 * PX} ${48.5 * PX} ${100 * PX}`, role: "img", "aria-label": `${I.code} tầng ${f}` });
    const R = (x, y, w, h, a) => el("rect", { x: x * PX, y: y * PX, width: w * PX, height: h * PX, ...a }, svg);
    const T = (s, x, y, a = {}) => { const e = el("text", { x: x * PX, y: y * PX, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 13, fill: "var(--ink-2)", "font-family": "var(--body)", ...a }, svg); e.textContent = s; return e; };
    R(0, 0, 41.5, 104, { fill: "var(--sheet)", stroke: "var(--ink-2)", "stroke-width": 1.5 });
    R(0, 0, 6, 104, { fill: "var(--road)" }); T("Lối Tây · xe cứu hỏa, giao sách", 3, 60, { transform: `rotate(-90 ${3 * PX} ${60 * PX})`, "font-size": 11 });
    R(6, 0, 35.5, 12, { fill: "var(--pave)" }); T("Quảng trường Bắc", 23.75, 7);
    R(6, 89, 35.5, 15, { fill: "var(--road)" }); T("Bãi xe", 23.75, 99);
    R(41.5, 0, 6, 104, { fill: "var(--water)" }); T("Bờ sông · Bạch Đằng", 44.5, 52, { transform: `rotate(90 ${44.5 * PX} ${52 * PX})` });
    R(6, 12, 35.5, 77, { fill: "none", stroke: "var(--accent)", "stroke-width": 1.2, "stroke-dasharray": "8 5" });
    for (const b of B.filter(b => b.f !== f && b.kind !== "court")) R(b.x, b.y, b.w, b.h, { fill: "none", stroke: "var(--ink-2)", "stroke-width": 1, "stroke-dasharray": b.f < f ? "5 4" : "2 3", opacity: 0.7 });
    for (const b of B.filter(b => b.f === f && b.kind === "court")) { R(b.x, b.y, b.w, b.h, { fill: "var(--zOut)", stroke: "var(--ink-2)", "stroke-width": 1, "stroke-dasharray": "6 4", opacity: 0.85 }); if (b.w * b.h > 20) { const t = T(b.n.split(" (")[0], b.x + b.w / 2, b.y + b.h / 2, { "font-size": 11, fill: "var(--ink)" }); if (b.h > b.w * 1.6) t.setAttribute("transform", `rotate(-90 ${(b.x + b.w / 2) * PX} ${(b.y + b.h / 2) * PX})`); } }
    for (const b of B.filter(b => b.f === f && b.kind !== "court")) {
      const hi = b.c === "E3" || b.c === "A1";
      R(b.x, b.y, b.w, b.h, { fill: col(b), stroke: hi ? "var(--accent)" : "var(--ink)", "stroke-width": hi ? 3 : 1.1 });
      if (b.w * b.h >= 6) {
        const big = b.w >= 6 && b.h >= 4, cx = b.x + b.w / 2, cy = b.y + b.h / 2, t = T(label(b), cx, cy - (big ? 0.8 : 0), { "font-size": big ? 17 : b.w < 4.5 ? 9.5 : 11.5, "font-weight": 800, fill: "var(--ink)" });
        if (b.h > b.w * 1.8 && b.w < 5) t.setAttribute("transform", `rotate(-90 ${cx * PX} ${cy * PX})`);
        if (big && b.kind === "room") T(`${nf(b.w * b.h)} m²`, cx, cy + 1.2, { "font-size": 10.5 });
      }
    }
    if (f === 1 && I.routes) {
      for (const [k, c] of [["plaza", "var(--t1Plaza)"], ["park", "var(--t1Park)"], ["bike", "var(--t1Bike)"]]) {
        const P = I.routes[k]; if (!P) continue;
        el("polyline", { points: P.map(([x, y]) => `${x * PX},${y * PX}`).join(" "), fill: "none", stroke: c, "stroke-width": 3.2, "stroke-dasharray": "9 6", "stroke-linecap": "round", "stroke-linejoin": "round" }, svg);
        const [x, y] = P[0]; el("circle", { cx: x * PX, cy: y * PX, r: 5, fill: c }, svg);
      }
      for (const d of [I.door, I.door2].filter(Boolean)) { el("circle", { cx: d[0] * PX, cy: d[1] * PX, r: 7, fill: "var(--sheet)", stroke: "var(--accent)", "stroke-width": 3 }, svg); }
    }
    const nAng = window.ARC_NORTH != null ? window.ARC_NORTH : 20, ng = el("g", { transform: `translate(${44.5 * PX} ${8 * PX}) rotate(${nAng}) scale(1.2)` }, svg);
    el("path", { d: "M0 -16 L8 8 L0 4 L-8 8 Z", fill: "var(--ink)" }, ng);
    return svg;
  }
  let cur = 0;
  const R0 = IDS.map(I => CHK.check(I));
  function build() {
    if (!document.getElementById("t1g-style")) { const s = document.createElement("style"); s.id = "t1g-style"; s.textContent = CSS; document.head.appendChild(s); }
    host.classList.add("t1g");
    const row = (t, f) => `<tr><td>${t}</td>${IDS.map((I, i) => `<td class="num">${f(R0[i].m, I, R0[i])}</td>`).join("")}</tr>`;
    const dist = (v, lim) => v == null ? "–" : `<span class="${v <= lim ? "good" : "warn"}">${nf(v)} m</span>`;
    host.innerHTML = `
<section style="display:grid;gap:10px">
  <p class="eyebrow">Gợi ý tầng 1 · ngày 09/11/2026</p>
  <h2>Tầng 1: bãi xe xa A1, bảo vệ E3 đặt ở đâu</h2>
  <p class="lede">Bạn thấy chỗ giữ xe xa A1 quá, khách đi mệt, và E3 nên trực ở mặt trước. Mình đo lại tầng 1 trong file bạn gửi, rồi đưa ra 3 hướng. File của bạn giữ nguyên; các gợi ý nằm riêng trong tab này. Ý 1 và Ý 2 có đủ tầng 2, tầng 3. Muốn thử trong tab Tự xếp khối thì bấm "Tải file" rồi mở bằng nút Mở file của tab đó (bấm Hoàn tác nếu muốn quay lại bản đang xếp).</p>
</section>
<section style="display:grid;gap:10px">
  <h3>So nhanh</h3>
  <div class="tw"><table><thead><tr><th></th>${IDS.map(I => `<th class="num">${esc(I.code)}</th>`).join("")}</tr></thead><tbody>
    ${row("Bãi xe → cửa A1", m => dist(m.park, 25))}
    ${row("Quảng trường → cửa A1", m => dist(m.plaza, 40))}
    ${row("Bảo vệ E3 → cửa A1", m => dist(m.e3door, 15))}
    ${row("Bảo vệ E3 → tiếp nhận C4", m => m.e3c4 == null ? "–" : nf(m.e3c4, 1) + " m")}
    ${row("Tổng sàn", (m, I) => I.onlyF ? `${nf(m.tot)} m²` : `${nf(m.tot)} m²`)}
    ${row("Thang, sảnh, hành lang", m => `${nf(m.circ)} m²`)}
    ${row("Lỗi thật (!) · gợi ý (?)", (m, I, R) => `${R.out.filter(o => !o.ok && o.hard).length} · ${R.out.filter(o => !o.ok && !o.hard).length}`)}
  </tbody></table></div>
  <p class="note">Quãng đi bộ đo theo đường vẽ nét đứt trên mặt bằng (đi ngoài nhà tới cửa A1). Bản của bạn và Ý 3 chỉ kiểm tra tầng 1; tầng 2–3 là của file bạn, chưa xếp xong nên không tính lỗi.</p>
</section>
<section style="display:grid;gap:12px">
  <div class="bar"><span class="seg" role="group" aria-label="Chọn gợi ý">${IDS.map((I, i) => `<button type="button" data-i="${i}" aria-pressed="${i === cur}">${esc(I.code)} · ${esc(I.name)}</button>`).join("")}</span></div>
  <div id="t1g-one"></div>
</section>
<section style="display:grid;gap:8px">
  <h3>Gợi ý chung cho mọi phương án</h3>
  <ul class="pl">
    <li>Dồn cửa chính, cửa nhân viên và cửa giao nhận về gần nhau (một góc nhà) để một bảo vệ trông được cả ba. Bảo vệ E3 đặt ngay cạnh cửa chính, có cửa sổ nhìn ra chỗ khách tới. Ban đêm E3 kiêm giữ xe, nên đặt E3 nhìn được cả bãi xe.</li>
    <li>Từ chỗ để xe tới cửa A1 nên có mái che: Đà Nẵng mưa lớn mùa Đông (gió Đông Bắc đập vào mặt sông). Tầng trên đua ra 3–4 m trên lối vào là cách che mưa rẻ nhất.</li>
    <li>Nếu muốn giữ cửa A1 quay ra quảng trường (đón người đi bộ, sự kiện), có thể làm thêm một bãi xe máy nhỏ cạnh sảnh, vào từ lối Tây, nhưng không lấn lối xe cứu hỏa 6 m.</li>
  </ul>
</section>`;
    host.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => { cur = +b.dataset.i; host.querySelectorAll("[data-i]").forEach(x => x.setAttribute("aria-pressed", String(x === b))); one(); }));
    one();
  }
  function one() {
    const I = IDS[cur], R = R0[cur], box = host.querySelector("#t1g-one");
    const floors = [...new Set(I.blocks.filter(b => b.onSite !== false && !b.draft).map(b => b.f))].sort().filter(f => !I.onlyF || f <= I.onlyF);
    box.innerHTML = `
<div style="display:grid;gap:12px">
  <h3>${esc(I.code)} · ${esc(I.name)}</h3>
  <p class="lede" style="margin:0">${esc(I.tag)}</p>
  ${I.idea ? `<p style="max-width:80ch;margin:0">${esc(I.idea)}</p>` : ""}
  <div class="kp">${floors.map(f => `<figure><figcaption>Tầng ${f}${f === 1 ? " · nét đứt: đường đi bộ tới cửa A1" : ""}</figcaption><div data-kp="${f}"></div></figure>`).join("")}</div>
  <div class="leg">${["A", "B", "C", "D", "E"].map(z => `<span><i style="background:var(--z${z})"></i>${{ A: "A Đón tiếp", B: "B Đọc", C: "C Kho, nghiệp vụ", D: "D Văn hóa", E: "E Hỗ trợ" }[z]}</span>`).join("")}<span><i style="background:var(--zCirc)"></i>Hành lang</span><span><i style="background:var(--t1Stair)"></i>Thang</span><span><i style="background:var(--t1Lift)"></i>Thang máy, lõi sách</span><span><i style="background:var(--zOut);border-style:dashed"></i>Sân, hiên, gầm</span><span><i class="ln" style="border-color:var(--t1Park)"></i>Từ bãi xe</span><span><i class="ln" style="border-color:var(--t1Plaza)"></i>Từ quảng trường</span>${I.routes && I.routes.bike ? `<span><i class="ln" style="border-color:var(--t1Bike)"></i>Từ bãi xe máy phụ</span>` : ""}<span><i style="border-radius:50%;border:3px solid var(--accent);background:var(--sheet)"></i>Cửa A1</span><span><i style="border:3px solid var(--accent)"></i>A1, E3</span></div>
  <div class="two">
    <div style="display:grid;gap:8px">${I.good ? `<h4 style="margin:0">${I.base ? "Đang ổn" : "Giải quyết được"}</h4><ul class="pl">${I.good.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      ${I.bad ? `<h4 style="margin:0">Chưa ổn</h4><ul class="pl">${I.bad.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      ${I.cost ? `<h4 style="margin:0">Đánh đổi</h4><ul class="pl">${I.cost.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</div>
    <div style="display:grid;gap:8px"><h4 style="margin:0">Kiểm tra trên khối${I.onlyF ? " (tầng 1)" : ""}</h4><ul class="chk">${R.out.map(o => `<li class="${o.ok ? "ok" : o.hard ? "no" : "soft"}">${esc(o.t)}</li>`).join("")}</ul>
      <p class="note">! lỗi thật · ? gợi ý nên xem lại. Đây là kiểm tra trên khối, chưa có cửa, nội thất; nếu bạn chọn một hướng, mình dựng mặt bằng chi tiết như các phương án X.</p>
      ${I.base ? "" : `<div class="bar"><button type="button" class="btn" id="t1g-dl">Tải file ${esc(I.code)} (mở được trong Tự xếp khối)</button></div>`}</div>
  </div>
</div>`;
    for (const f of floors) box.querySelector(`[data-kp="${f}"]`).appendChild(plan(I, f));
    const dl = box.querySelector("#t1g-dl");
    if (dl) dl.addEventListener("click", () => {
      const data = { kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: `${I.code} · ${I.name} (gợi ý tầng 1, 09/11/2026)`, from: null, blocks: I.blocks.map(b => ({ ...b, id: String(b.id) })) };
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" })); a.download = `goi-y-tang-1-${I.id}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
  }
  let started = false;
  const start = () => { if (started) return; started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="t1g"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="t1g"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) one(); });
})(window.G3);
