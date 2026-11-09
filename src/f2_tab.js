/* ================= Tab Final 2: bản xếp 09/11 của bạn, mặt bằng chi tiết, các tình huống, nắng =================
   Dùng G3.F2PLANS (chot_f2.js) và bộ xem mặt bằng G3.P6VIEWER. */
(function (G) {
  if (!G || !G.F2PLANS || !G.P6VIEWER || !G.P6) return;
  const host = document.getElementById("f2-host");
  if (!host) return;
  const PL = G.F2PLANS, P6 = G.P6, DT = window.D || (typeof D !== "undefined" ? D : null);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const len = P => P.reduce((t, p, i) => i ? t + Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) : 0, 0);
  const CSS = `
.f2t { display: grid; gap: 34px; }
.f2t .tw { overflow-x: auto; }
.f2t table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.f2t th, .f2t td { padding: 5px 7px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.f2t td.num, .f2t th.num { text-align: right; font-variant-numeric: tabular-nums; }
.f2t .good { color: var(--accent); font-weight: 700; } .f2t .warn { color: var(--warn); font-weight: 700; } .f2t .mid { color: #c98a00; font-weight: 700; }
.f2t ul.pl { margin: 0; padding-left: 18px; display: grid; gap: 6px; font-size: 14px; max-width: 86ch; }
.f2t .cases { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; }
.f2t .case { border: 1px solid var(--line); border-radius: 4px; padding: 10px 12px; background: var(--paper); }
.f2t .case h4 { margin: 0 0 6px; font-size: 14.5px; }
.f2t .case p { margin: 0 0 4px; font-size: 13.5px; }
.f2t .case .k { font: 600 11.5px var(--mono); color: var(--ink-2); }
.f2t .seg button { font: 600 13px var(--body); padding: 6px 10px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; margin-right: -1px; }
.f2t .seg button[aria-pressed="true"] { background: var(--ink); color: var(--sheet); }
.f2t .seg button:focus-visible, .f2t .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.f2t .btn { font: 600 13px var(--body); padding: 6px 12px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; border-radius: 3px; }
.f2t .sun td { text-align: center; font-variant-numeric: tabular-nums; }
.f2t .sun td.lbl { text-align: left; }
.f2t .note { font-size: 13px; color: var(--ink-2); }
`;
  /* ---------- mặt trời ở Đà Nẵng (16,05° Bắc), giờ mặt trời ---------- */
  const LAT = 16.05 * Math.PI / 180;
  function sun(day, h) { // day: số ngày trong năm; h: giờ mặt trời
    const dec = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + day) / 365), H = (h - 12) * 15 * Math.PI / 180;
    const alt = Math.asin(Math.sin(LAT) * Math.sin(dec) + Math.cos(LAT) * Math.cos(dec) * Math.cos(H));
    const az = (Math.atan2(-Math.cos(dec) * Math.sin(H), Math.sin(dec) * Math.cos(LAT) - Math.cos(dec) * Math.sin(LAT) * Math.cos(H)) * 180 / Math.PI + 360) % 360;
    return { alt: alt * 180 / Math.PI, az };
  }
  const DAYS = [["21/6 · hạ chí (nắng cao, lệch Bắc)", 172], ["21/3, 23/9 · xuân, thu phân", 80], ["22/12 · đông chí (nắng thấp, lệch Nam)", 356]];
  const faces = () => { const n = window.ARC_NORTH != null ? +window.ARC_NORTH : 20, N = (360 - n) % 360; return [["Bắc (quảng trường)", N], ["Đông (sông)", (N + 90) % 360], ["Nam (bãi xe)", (N + 180) % 360], ["Tây (Trần Phú)", (N + 270) % 360]]; };
  // khoảng giờ nắng chiếu thẳng vào một mặt (mặt trời cao trên 5°, lệch pháp tuyến dưới 80°)
  function hits(day, faceAz) {
    const on = []; for (let h = 5.5; h <= 18.5; h += 0.25) { const s = sun(day, h), d = Math.abs(((s.az - faceAz + 540) % 360) - 180); on.push(s.alt > 5 && Math.cos(s.alt * Math.PI / 180) * Math.cos(d * Math.PI / 180) > 0.3); }
    const runs = []; let a = null; on.forEach((v, i) => { const h = 5.5 + i * 0.25; if (v && a == null) a = h; if (!v && a != null) { runs.push([a, h]); a = null; } }); if (a != null) runs.push([a, 18.5]);
    return runs.map(([p, q]) => `${fmt(p)}–${fmt(q)}`).join(", ") || "không";
  }
  const fmt = h => { const H = Math.floor(h), m = Math.round((h - H) * 60); return m ? `${H}h${String(m).padStart(2, "0")}` : `${H}h`; };
  /* ---------- quãng đi bộ, số liệu so sánh ---------- */
  function stats(p) {
    if (!p.__R) p.__R = P6.analyse(p, DT);
    const R = p.__R, errs = R.err.length + R.levels.reduce((t, M) => t + M.err.length, 0);
    const lib = p.site.routes.lib && p.site.routes.lib[0], ev = p.site.routes.event && p.site.routes.event[0];
    const g = id => p.levels[0].rooms.find(z => z.id === id), e3 = g("E3"), a1 = g("A1");
    const e3a1 = e3 && a1 ? Math.hypot(e3.r[0] + e3.r[2] / 2 - (a1.r[0] + a1.r[2] / 2), e3.r[1] + e3.r[3] / 2 - (a1.r[1] + a1.r[3] / 2)) : null;
    return { R, errs, lib: lib ? len(lib) : null, ev: ev ? len(ev) : null, far: R.levels.map(M => M.far), e3a1, light: (R.light || []).filter(l => !l.top && l.win === 0).length, gam: (p.site.park.gam || [[0, 0, 0, 0, 0]])[0][4] };
  }
  /* ---------- tải khối của một phương án (mở được trong Tự xếp khối) ---------- */
  function toBlocks(p) {
    const out = [];
    p.levels.forEach((L, li) => { for (const z of L.rooms) { const r = z.r; if (!r) continue; const kind = z.core ? (/b/.test(z.core.st) ? "book" : /l/.test(z.core.st) ? "lift" : "stair") : /^[A-E]\d$/.test(z.c || "") ? "room" : "circ"; out.push({ id: `${p.code}:${li + 1}:${z.id}`, c: kind === "room" ? z.c : kind === "circ" ? "circ" : "core", n: z.n, kind, a: kind === "room" ? +(r[2] * r[3]).toFixed(2) : null, x: r[0], y: r[1], w: r[2], h: r[3], f: li + 1, top: !!z.top, onSite: true }); } });
    const g = p.gam; if (g) out.push({ id: `${p.code}:1:gam`, c: "XE", n: "Bãi đỗ xe (gầm dưới tầng 2)", kind: "park", pk: "moto", a: null, x: g[0], y: g[1], w: g[2], h: g[3], f: 1, top: false, onSite: true });
    return { kind: "arc329-xep-khoi", v: 1, savedAt: new Date().toISOString(), note: `${p.code} · ${p.name}`, from: p.code, blocks: out };
  }
  let V = null, lp = 0;
  function build() {
    if (!document.getElementById("f2t-style")) { const s = document.createElement("style"); s.id = "f2t-style"; s.textContent = CSS; document.head.appendChild(s); }
    G.P6V.css(); host.classList.add("f2t");
    const S = PL.map(stats), b = PL[0];
    const cell = (v, lim, unit = " m") => v == null ? "–" : `<span class="${v <= lim ? "good" : "warn"}">${nf(v)}${unit}</span>`;
    host.innerHTML = `
<section style="display:grid;gap:10px">
  <p class="eyebrow">Final 2 · bản xếp khối ngày 09/11/2026</p>
  <h2>Bản xếp của bạn: mặt bằng chi tiết, đi lại, xe, nắng và 5 cách sửa nhẹ</h2>
  <p class="lede">F.2 giữ đúng 100% vị trí, kích thước các khối trong file bạn gửi. File chưa có cửa nên cửa do mình tự đoán ở chỗ hợp lý (chỗ các khối chạm nhau; A1 mở cả hai phía); chỉ báo lỗi khi các khối không chạm nhau. F.2a–F.2e giữ bố cục đó, chỉ dời hoặc thêm vài khối nhỏ. Mặt bằng chi tiết có cửa, nội thất (văn phòng E1 tách chỗ làm việc và phòng họp, phòng nhân viên E2 có bếp, bàn ăn, tủ đồ), người trực, 7 tình huống đi lại, tổng mặt bằng có bãi xe, gầm để xe, tuyến xe.</p>
</section>
<section style="display:grid;gap:10px">
  <h3>Bạn thấy ổn chưa? Nhận xét bản F.2</h3>
  <div class="cases">
    <div class="case"><h4 class="good">Đang ổn</h4><ul class="pl">${(b.notes || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
    <div class="case"><h4 class="warn">Chưa ổn</h4><ul class="pl">${(b.issues || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
  </div>
</section>
<section style="display:grid;gap:10px">
  <h3>So 6 phương án</h3>
  <div class="tw"><table><thead><tr><th></th>${PL.map(p => `<th class="num">${esc(p.code)}</th>`).join("")}</tr></thead><tbody>
    <tr><td>Đổi gì</td>${PL.map(p => `<td style="font-size:12.5px;min-width:130px">${esc(p.tag || "")}</td>`).join("")}</tr>
    <tr><td>Người đọc: bãi xe → cửa A1</td>${S.map(s => `<td class="num">${cell(s.lib, 40)}</td>`).join("")}</tr>
    <tr><td>Khách sự kiện: quảng trường → cửa A1</td>${S.map(s => `<td class="num">${cell(s.ev, 60)}</td>`).join("")}</tr>
    <tr><td>Bảo vệ E3 → giữa sảnh A1</td>${S.map(s => `<td class="num">${cell(s.e3a1, 15)}</td>`).join("")}</tr>
    <tr><td>Thoát nạn xa nhất T1 · T2 · T3</td>${S.map(s => `<td class="num">${s.far.map(v => v > 1e6 ? '<span class="warn">kẹt</span>' : `<span class="${v <= 30 ? "good" : "warn"}">${nf(v)}</span>`).join(" · ")} m</td>`).join("")}</tr>
    <tr><td>Phòng không có cửa sổ Bắc/Nam, không cửa mái</td>${S.map(s => `<td class="num">${s.light}</td>`).join("")}</tr>
    <tr><td>Tổng sàn · giao thông</td>${S.map(s => `<td class="num">${nf(s.R.total)} · ${nf(s.R.circ)} m²</td>`).join("")}</tr>
    <tr><td>Gầm để xe</td>${S.map(s => `<td class="num">~${s.gam} xe máy</td>`).join("")}</tr>
    <tr><td>Số lỗi kiểm tra mặt bằng</td>${S.map(s => `<td class="num"><b class="${s.errs <= 15 ? "mid" : "warn"}">${s.errs}</b></td>`).join("")}</tr>
  </tbody></table></div>
  <p class="note">Lỗi kiểm tra gồm cả những chỗ lệch ±10% diện tích có sẵn trong file (B1, B2, D3, E6 ở sát mép ±10%) và gợi ý đi lại. "Kẹt": có phòng không có lối ra (đọc mở B1w tầng 2 ở F.2, F.2a, F.2b, F.2d).</p>
  <div class="bar" style="display:flex;flex-wrap:wrap;gap:6px">${PL.map((p, i) => `<button type="button" class="btn" data-dl="${i}">Tải khối ${esc(p.code)}</button>`).join("")}</div>
  <p class="note">File tải về mở được trong tab Tự xếp khối (nút Mở file; bấm Hoàn tác để quay lại bản đang xếp). Gầm để xe đi kèm thành khối "Bãi đỗ xe".</p>
</section>
<section style="display:grid;gap:10px">
  <h3>Các tình huống đi lại (bản F.2, số trong ngoặc là F.2e)</h3>
  <div class="cases" id="f2-cases"></div>
</section>
<section id="f2-view"></section>
<section style="display:grid;gap:12px">
  <h3>Nắng và ánh sáng</h3>
  <p class="note">Hướng mặt nhà theo thanh "Lệch Bắc" (đang dùng ${nf(window.ARC_NORTH != null ? window.ARC_NORTH : 20)}°). Giờ là giờ mặt trời (giờ đồng hồ trễ hơn khoảng 10–25 phút). Ô bảng là khoảng giờ nắng chiếu thẳng đủ mạnh vào mặt nhà (góc tới dưới khoảng 72°; nắng xiên sát mặt tường không tính).</p>
  <div class="tw"><table class="sun" id="f2-sun"></table></div>
  <ul class="pl">
    <li><b>Mặt Nam (bãi xe):</b> khu đất lệch nên mặt Nam nhìn về Nam Đông Nam. Mùa Đông nắng vào từ sáng tới khoảng 15h, xuân thu chỉ buổi sáng, mùa Hè không có nắng chiếu thẳng. Ô văng 0,6–1 m trên cửa sổ Nam che nắng xuân thu, vẫn cho nắng Đông thấp vào: văn phòng E1, phòng họp, phòng nhân viên E2 ở tầng 2 hướng Nam là hợp lý.</li>
    <li><b>Mặt Bắc (quảng trường):</b> chỉ có nắng chiều mùa Hè (khoảng 14h–18h, xiên); còn lại là ánh sáng tán xạ đều, hợp phòng đọc và trưng bày. Lam đứng hướng Tây trên cửa sổ Bắc chặn được nắng chiều Hè. Các phòng đọc tầng 3 dùng cửa mái hướng Bắc.</li>
    <li><b>Mặt Đông (sông):</b> nắng buổi sáng quanh năm (Hè khoảng 6h–11h). Gió mùa Đông Bắc kèm mưa đập vào mặt này: cà phê A3, hành lang sự kiện, kỹ thuật E4 ở mặt Đông cần hiên sâu hoặc lam.</li>
    <li><b>Mặt Tây (Trần Phú):</b> nắng chiều gắt quanh năm (khoảng 13h–18h). Bản của bạn đặt dải kho, lõi sách, nghiệp vụ dọc mặt Tây là đúng (phòng ít cần cửa sổ); xử lý C2 nên dùng lam đứng, cửa sổ hẹp cao.</li>
  </ul>
  <div class="bar" style="display:flex;gap:8px;align-items:center"><span class="note">Từng phòng của</span><span class="seg" role="group" aria-label="Chọn phương án xem ánh sáng">${PL.map((p, i) => `<button type="button" data-lp="${i}" aria-pressed="${i === lp}">${esc(p.code)}</button>`).join("")}</span></div>
  <div class="tw"><table id="f2-light"></table></div>
</section>`;
    host.querySelectorAll("[data-dl]").forEach(q => q.addEventListener("click", () => { const p = PL[+q.dataset.dl], d = toBlocks(p), a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(d, null, 1)], { type: "application/json" })); a.download = `final2-${p.code.replace(/\./g, "")}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }));
    host.querySelectorAll("[data-lp]").forEach(q => q.addEventListener("click", () => { lp = +q.dataset.lp; host.querySelectorAll("[data-lp]").forEach(x => x.setAttribute("aria-pressed", String(x === q))); lightTable(); }));
    cases(S);
    sunTable(); lightTable();
    const box = host.querySelector("#f2-view");
    V = G.P6VIEWER(box, () => PL, "f2", { ci: 0, noKhoi: true, groups: [["Bản xếp 09/11", /^F\.2/]] });
    V.build();
  }
  function cases(S) {
    const s0 = S[0], s5 = S[5], m = (a, b) => `${nf(a)} m${b != null && Math.round(b) !== Math.round(a) ? ` (${nf(b)} m)` : ""}`;
    const C = [
      ["Người đọc đi xe máy", "Tổng mặt bằng; tình huống 1, 5", `Vào cổng xe ở góc Tây Nam (từ Trần Phú), gửi ở bãi Nam hoặc gầm dưới tầng 2. Đi dọc bờ sông, qua sân giữa vào cửa Nam A1: ${m(s0.lib, s5.lib)} (F.2 ngoài trời; F.2a, F.2e có hiên mái che suốt). Qua A1 → lối vào quầy → quầy A4 (cổng từ, gửi đồ) → đọc.`],
      ["Người đọc đi bộ từ quảng trường", "Tình huống 1", `Từ quảng trường Bắc đi vòng lối Tây vào sân trước sảnh: ${m(s0.ev)}. Sân trước sảnh bị cụm sự kiện và FOYA chắn nên không đi thẳng từ quảng trường được.`],
      ["Khách sự kiện ngoài giờ", "Tình huống 2", "Vào cửa Bắc A1, qua trưng bày A2 → sảnh FOYA → hành lang sự kiện tới phòng đa năng D1, chuyên đề D4, cà phê A3, vệ sinh sự kiện. Cửa từ A1 vào lối vào quầy khóa (đỏ); thư viện, kho đóng. Thoát nạn D1 ra quảng trường (2 cửa), hành lang sự kiện ra bờ sông."],
      ["Cùng hoạt động (ngày có sự kiện)", "Tình huống 3", "Người đọc rẽ trái ở A1 vào lối vào quầy, khách sự kiện rẽ phải sang A2; hai luồng chỉ chung sảnh A1. Phòng đa năng ở đầu Bắc, cách đọc yên tĩnh B2 (tầng 3, đầu Nam) hơn 40 m."],
      ["Trẻ em, gia đình", "Tình huống 1", "Qua quầy A4 → sảnh thư viện → thiếu nhi B3; vệ sinh thay tã WCB qua hành lang thiếu nhi. Cửa Nam B3 là cửa thoát nạn có chuông (không thành lối ra vào tự do)."],
      ["Người khuyết tật", "Tình huống 1 (F.2d, F.2e)", "Tầng 1 đi phẳng từ cửa A1 tới mọi phòng; vệ sinh KT ở vệ sinh sự kiện, vệ sinh thiếu nhi, tầng 2. Lên tầng 2, 3: F.2 chỉ có thang máy trong lõi sách (cửa từ kho, nhân viên phải mở hộ); F.2d, F.2e thêm thang máy vào thang Bắc sau cổng từ."],
      ["Nhân viên đến làm", "Tình huống 6", "Gửi xe trong gầm (cạnh bảo vệ E3) → sảnh nhân viên Tây Nam (thẻ từ) → thang Tây Nam lên hành lang văn phòng tầng 2: phòng nhân viên E2 (cất đồ), văn phòng E1 (chỗ làm việc, phòng họp). Thủ thư xuống tầng 1 qua hành lang đọc, thang Bắc tới quầy A4; nghiệp vụ vào C2 qua cửa nhân viên."],
      ["Sách: giao nhận, mượn trả", "Tình huống 4, 5", "Xe sách vào lối Tây, dừng ở cửa cuốn tiếp nhận C4 → xử lý C2 → lưu trữ C3 → kho đóng C1 → lõi sách (tời) lên kệ tầng 2, 3. Sách trả từ quầy A4 đi cửa nhân viên vào C3 rồi C2. Ra khu đọc phải qua cổng từ A4; cửa thoát nạn khu đọc có chuông."],
      ["Bảo vệ", "Tình huống 7", `F.2: trực ở góc Tây Nam, trông gầm xe, lối nhân viên, thang Tây Nam, cổng xe; cửa chính A1 trông bằng camera (cách ${m(s0.e3a1)}). Đầu giờ mở cửa A1, cuối giờ khóa cửa vào quầy (đỏ), đi tuần các cửa thoát nạn có chuông, cửa cuốn C4. F.2a, F.2e: trực ngay cửa Nam A1; F.2b: ở sân trước sảnh, nhìn cửa Bắc A1.`],
      ["Xe cứu hỏa", "Tổng mặt bằng", "Vào lối Tây 6 m từ phố Bắc, chạy suốt chiều dài nhà tới bãi xe Nam; tiếp cận mặt Bắc từ quảng trường. Lối Tây không đặt xe, không đặt khối tầng 1 (mọi khối tầng 1 nằm trong vùng xây dựng)."],
      ["Xe máy, ô tô của khách", "Tổng mặt bằng", `Bãi Nam khoảng 120 xe máy, 2 chỗ ô tô người khuyết tật, 10 xe đạp, bốt giữ xe ở cổng; gầm dưới tầng 2 thêm khoảng ${s0.gam} xe máy (dành cho nhân viên hoặc khách khi đông). Ô tô khách thường đỗ dọc phố, xe khách đoàn dừng ở quảng trường Bắc.`],
      ["Rác, kỹ thuật", "Tổng mặt bằng", "Kỹ thuật E4 ở góc Đông Nam, cửa ra gầm và bãi xe để xe bảo trì tới gần. Rác gom ở kho chung E6, ra lối Tây qua hành lang vệ sinh (cửa nhân viên)."]
    ];
    host.querySelector("#f2-cases").innerHTML = C.map(([t, k, x]) => `<div class="case"><h4>${esc(t)}</h4><p class="k">${esc(k)}</p><p>${esc(x)}</p></div>`).join("");
  }
  function sunTable() {
    const F = faces();
    host.querySelector("#f2-sun").innerHTML = `<thead><tr><th>Ngày</th>${F.map(([t, a]) => `<th>${t}<br><span class="note">nhìn về ${nf(a)}°</span></th>`).join("")}</tr></thead><tbody>${DAYS.map(([t, d]) => `<tr><td class="lbl">${t}</td>${F.map(([, a]) => `<td>${hits(d, a)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  }
  function lightTable() {
    const p = PL[lp]; if (!p.__R) p.__R = P6.analyse(p, DT);
    const L = (p.__R.light || []).slice().sort((a, b) => a.li - b.li || a.c.localeCompare(b.c));
    const sunTxt = l => l.top ? "Cửa mái Bắc: sáng tán xạ, không nắng gắt" : !l.win ? "Không có" : l.faces.map(f => f === "Nam" ? "Nam: mùa Đông tới ~15h, xuân thu buổi sáng, Hè không" : "Bắc: tán xạ; nắng xiên chiều Hè 14h–18h").join("; ");
    const verdict = l => { if (!l.top && !l.win) return '<span class="warn">Thiếu sáng (không cửa sổ Bắc/Nam)</span>'; const bad = []; if (l.worst && l.worst.ang > 45) bad.push(`cửa sổ ${l.worst.face} bị che ${nf(l.worst.ang)}°`); if (l.pct < 0.999) bad.push(`${nf((1 - l.pct) * 100)}% sàn cách cửa sổ quá 8 m`); return bad.length ? `<span class="mid">Đủ một phần: ${bad.join("; ")}</span>` : '<span class="good">Đủ sáng</span>'; };
    host.querySelector("#f2-light").innerHTML = `<thead><tr><th>Tầng</th><th>Phòng</th><th>Lấy sáng</th><th>Nắng chiếu thẳng</th><th>Mặt Đông/Tây lộ</th><th>Đánh giá</th></tr></thead><tbody>${L.map(l => `<tr><td>${l.li + 1}</td><td><b>${esc(l.c)}</b> ${esc(l.n)}</td><td>${l.top ? "Cửa mái hướng Bắc" : l.win ? "Cửa sổ " + l.faces.join(", ") : "–"}</td><td>${esc(sunTxt(l))}</td><td>${l.ew ? "Có: nên đặc hoặc lam đứng" : "–"}</td><td>${verdict(l)}</td></tr>`).join("")}</tbody>`;
  }
  let started = false;
  const start = () => { if (started) return; started = true; build(); };
  const tabBtn = document.querySelector('.tabs [data-tab="f2"]');
  if (tabBtn) tabBtn.addEventListener("click", () => setTimeout(start, 50));
  const panel = document.querySelector('[data-panel="f2"]');
  if (panel && !panel.hidden) start();
  window.addEventListener("arc-north", () => { if (started) { sunTable(); if (V) V.draw(); } });
})(window.G3);
