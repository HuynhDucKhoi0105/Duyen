/* ================= Kiểm tra nhanh cho các gợi ý tầng 1 (tab Gợi ý tầng 1) =================
   Đo trên các khối: diện tích ±10% đề, tổng sàn, vùng xây dựng, chồng khối, đua ≤ 4 m, thang thẳng hàng,
   ánh sáng Bắc/Nam, tiếng ồn, và quãng đi bộ từ bãi xe, từ quảng trường tới cửa A1. Dùng chung cho trang và cho node. */
(function () {
  const BRIEF = { A1: 80, A2: 90, A3: 70, A4: 30, B1: 520, B2: 160, B3: 180, B4: 100, B5: 100, B6: 50, C1: 120, C2: 70, C3: 40, C4: 30, D1: 180, D2: 25, D3: 20, D4: 75, E1: 80, E2: 40, E3: 15, E4: 55, E5: 70, E6: 20 };
  const ZONE = { x0: 6, x1: 41.5, y0: 12, y1: 89 };
  const OCC = /^(A1|A2|A3|A4|B1|B2|B3|B4|B5|B6|C2|D1|D4|E1|E2|E3)$/, NOISY = /^(D1|D2|D4|A3|B3|B4)$/, READ = /^(B1|B2|B5|B6)$/;
  const core = b => /^(stair|lift|book)$/.test(b.kind);
  const ov = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const gap = (a, b) => Math.hypot(Math.max(0, Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w)), Math.max(0, Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h)));
  const shared = (a, b) => { const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y); return ox >= -0.06 && oy > 0 && ox < 0.06 ? oy : oy >= -0.06 && ox > 0 && oy < 0.06 ? ox : 0; };
  const len = P => P.reduce((t, p, i) => i ? t + Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) : 0, 0);
  const nf = (v, d = 0) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  // phần mép Bắc / Nam còn hở (không áp vào khối cùng tầng)
  function freeNS(b, L) {
    const f = side => { const yy = side === "N" ? b.y : b.y + b.h; let cov = 0; for (const o of L) { if (o === b) continue; const oy = side === "N" ? o.y + o.h : o.y; if (Math.abs(oy - yy) < 0.6) cov += Math.max(0, Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x)); } return Math.max(0, b.w - cov); };
    return { N: f("N"), S: f("S") };
  }
  function check(idea) {
    const B = idea.blocks.filter(b => b.onSite !== false && !b.draft), out = [], add = (ok, t, hard) => out.push({ ok: !!ok, t, hard: !!hard });
    const F = [...new Set(B.map(b => b.f))].sort().filter(f => !idea.onlyF || f <= idea.onlyF);
    const sum = {}; for (const b of B.filter(b => b.kind === "room")) sum[b.c] = (sum[b.c] || 0) + b.w * b.h;
    const off = Object.keys(BRIEF).filter(c => Math.abs((sum[c] || 0) / BRIEF[c] - 1) > 0.1005);
    const tot = B.filter(b => !/^(court|park)$/.test(b.kind)).reduce((t, b) => t + b.w * b.h, 0), rooms = Object.values(sum).reduce((t, v) => t + v, 0);
    add(!off.length, off.length ? `Diện tích lệch quá ±10% đề: ${off.map(c => `${c} ${nf(sum[c] || 0)}/${BRIEF[c]}`).join(", ")}` : "Đủ 24 loại phòng, mỗi loại trong ±10% đề", true);
    add(tot <= 3000, `Tổng sàn ${nf(tot)} m² (phòng ${nf(rooms)} + thang, sảnh, hành lang ${nf(tot - rooms)}) ${tot <= 3000 ? "≤" : ">"} 3.000 m²`, true);
    const T1 = B.filter(b => b.f === 1 && !/^(court|park)$/.test(b.kind));
    const outZ = T1.filter(b => b.x < ZONE.x0 - 0.05 || b.y < ZONE.y0 - 0.05 || b.x + b.w > ZONE.x1 + 0.05 || b.y + b.h > ZONE.y1 + 0.05);
    add(!outZ.length, outZ.length ? `Tầng 1 lấn ra ngoài vùng xây dựng: ${outZ.map(b => b.c).join(", ")}` : "Tầng 1 nằm trọn trong vùng xây dựng (không lấn lối xe cứu hỏa, quảng trường, bãi xe)", true);
    const ovs = []; for (const f of F) { const L = B.filter(b => b.f === f && !/^(court|park)$/.test(b.kind)); for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) if (ov(L[i], L[j]) > 0.3) ovs.push(`T${f} ${L[i].c}–${L[j].c}`); }
    add(!ovs.length, ovs.length ? `Khối chồng nhau: ${ovs.slice(0, 5).join(", ")}` : "Không có khối chồng nhau", true);
    // đua: điểm của khối tầng trên cách khối tầng dưới quá 4 m
    const hang = [];
    for (const f of F.filter(f => f > 1)) { const low = B.filter(b => b.f === f - 1 && (b.kind !== "court" || b.support)); for (const b of B.filter(b => b.f === f)) { let bad = 0; for (let x = b.x + 0.25; x < b.x + b.w; x += 0.5) for (let y = b.y + 0.25; y < b.y + b.h; y += 0.5) { let d = 99; for (const o of low) d = Math.min(d, Math.hypot(Math.max(0, o.x - x, x - o.x - o.w), Math.max(0, o.y - y, y - o.y - o.h))); if (d > 4) bad += 0.25; } if (bad > 0.5) hang.push(`T${f} ${b.c === "circ" ? "hành lang" : b.c}`); } }
    add(!hang.length, hang.length ? `Đua quá 4 m so với tầng dưới: ${hang.join(", ")}` : "Tầng trên không đua quá 4 m so với tầng dưới", true);
    const zx = B.filter(b => b.f > 1 && (b.x < 4 - 0.05 || b.x + b.w > ZONE.x1 + 0.05));
    if (zx.length) add(false, `Tầng trên nhô quá giới hạn (x ≥ 4 m phía Tây, không qua mép sông): ${zx.map(b => b.c).join(", ")}`, true);
    // thang thẳng hàng
    for (const f of F.filter(f => f > 1)) { const up = B.filter(b => b.f === f && core(b)), low = B.filter(b => b.f === f - 1 && core(b)); const al = up.filter(u => low.some(l => ov(u, l) > 0.6 * u.w * u.h)); add(al.length >= 2 && al.some(b => b.kind !== "stair"), `Tầng ${f}: ${al.length} lõi thang thẳng tầng dưới (cần ≥ 2, có thang máy)`, true); }
    { const c1 = B.filter(b => b.c === "C1"), bk = B.filter(b => b.kind === "book"); add(c1.some(c => bk.some(k => k.f === c.f && gap(k, c) < 0.1)), "Lõi sách (thang máy + tời) sát kho đóng C1"); }
    { const c4 = B.find(b => b.c === "C4"); add(c4 && c4.f === 1 && c4.x <= 6.05, "Tiếp nhận C4 ở tầng 1, áp lối Tây (cửa cuốn cho xe sách)"); }
    { const b3 = B.find(b => b.c === "B3"); add(b3 && b3.f === 1, "Thiếu nhi B3 ở tầng 1"); }
    // ánh sáng
    const dark = [];
    for (const f of F) { const L = B.filter(b => b.f === f && !/^(court|park)$/.test(b.kind)), topF = Math.max(...F); for (const b of L.filter(b => b.kind === "room" && OCC.test(b.c))) {
      const fr = freeNS(b, L), roof = b.top && !B.some(o => o.f > f && ov(o, b) > 2);
      const ok = roof || (b.h <= 8.6 && (fr.N >= 1.2 || fr.S >= 1.2)) || (b.h <= 16.6 && fr.N >= 1.2 && fr.S >= 1.2);
      if (!ok) dark.push(`T${f} ${b.c}${b.n && /\(/.test(b.n) ? "" : ""}`); } }
    add(!dark.length, dark.length ? `Phòng thiếu mặt Bắc/Nam hở hoặc quá sâu: ${dark.join(", ")}` : "Phòng có người đều lấy sáng Bắc/Nam (sâu ≤ 8 m) hoặc cửa mái tầng trên cùng");
    // tiếng ồn
    const noise = [];
    for (const f of F) { const L = B.filter(b => b.f === f && b.kind === "room");
      for (const q of L.filter(b => b.c === "B2")) for (const o of L.filter(b => NOISY.test(b.c))) if (gap(q, o) < 8) noise.push(`T${f} B2 cách ${o.c} ${nf(gap(q, o), 1)} m`);
      for (const q of L.filter(b => READ.test(b.c) || /^E[12]$/.test(b.c))) for (const o of L.filter(b => NOISY.test(b.c) || (/^E[12]$/.test(q.c) && b.c === "E4"))) if (shared(q, o) > 1) noise.push(`T${f} ${q.c} sát vách ${o.c}`);
      const up = B.filter(b => b.f === f + 1 && b.kind === "room");
      for (const a of L) for (const o of up) { if (ov(a, o) <= 4) continue; if ((NOISY.test(a.c) && READ.test(o.c)) || (READ.test(a.c) && NOISY.test(o.c))) noise.push(`${o.c} T${f + 1} chồng lên ${a.c}`); if ((/^E[12]$/.test(o.c) && /^(D1|D2|B3|B4|A3)$/.test(a.c)) || (/^E[12]$/.test(a.c) && /^(D1|D2|B3|B4|A3)$/.test(o.c))) noise.push(`${o.c} T${f + 1} chồng lên ${a.c}`); } }
    add(!noise.length, noise.length ? `Tiếng ồn: ${[...new Set(noise)].slice(0, 6).join("; ")}` : "Phòng đọc, văn phòng không sát vách, không chồng lên phòng ồn; đọc yên tĩnh cách nguồn ồn ≥ 8 m");
    // đón tiếp
    const A1 = B.find(b => b.c === "A1"), A4 = B.find(b => b.c === "A4"), E3 = B.find(b => b.c === "E3"), C4 = B.find(b => b.c === "C4");
    if (A1 && A4) add(gap(A1, A4) < 0.1 || (shared(A1, A4) > 0), `Quầy A4 ${gap(A1, A4) < 0.1 ? "liền" : "cách " + nf(gap(A1, A4), 1) + " m"} sảnh A1`);
    const m = { tot, rooms, circ: tot - rooms };
    if (idea.door && idea.routes) {
      const d = idea.door, pk = idea.routes.park, pz = idea.routes.plaza;
      if (pk) m.park = len(pk); if (pz) m.plaza = len(pz);
      if (E3) { const c = [E3.x + E3.w / 2, E3.y + E3.h / 2]; m.e3door = Math.hypot(c[0] - d[0], c[1] - d[1]); if (C4) m.e3c4 = gap(E3, C4); }
      add(m.park <= 25, `Đi bộ từ bãi xe chính tới cửa A1: ${nf(m.park)} m${m.park <= 25 ? "" : " (nên ≤ 25 m)"}${idea.routes.parkNote ? " · " + idea.routes.parkNote : ""}`);
      if (idea.routes.bike) { m.bike = len(idea.routes.bike); add(true, `Bãi xe máy phụ cạnh sảnh tới cửa A1: ${nf(m.bike)} m`); }
      if (m.plaza != null) add(m.plaza <= 40, `Đi bộ từ quảng trường Bắc tới cửa A1: ${nf(m.plaza)} m${m.plaza <= 40 ? "" : " (nên ≤ 40 m)"}`);
      if (m.e3door != null) add(m.e3door <= 15, `Bảo vệ E3 cách cửa A1 ${nf(m.e3door)} m${m.e3door <= 15 ? ", nhìn thấy cửa" : " (nên ≤ 15 m để trông cửa)"}; cách tiếp nhận C4 ${nf(m.e3c4 || 0, 1)} m`);
    }
    return { out, m, sum };
  }
  const api = { BRIEF, ZONE, check, len };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") { window.G3 = window.G3 || {}; window.G3.T1CHK = api; }
})();
