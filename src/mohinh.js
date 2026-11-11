/* ================= Mô hình tỉ lệ 1:200 (bạn yêu cầu 11/11/2026) =================
   1 m thật = 0,5 cm = 5 mm trên mô hình. Mỗi tầng cao 4,5 m = 2,25 cm; khối tầng 1 tính từ mặt đất 4,95 m = 2,475 cm
   (gồm nền tôn +0,45); lõi thang trên cùng nhô 1,6 m = 0,8 cm trên mái.
   Bảng kích thước để cắt, khuôn cắt đúng mm (in A3 ở 100% hoặc đưa máy cắt laser).
   Khối: {id, c, n, kind, x, y, w, h, f}, đơn vị mét, gốc (0, 0) ở góc Tây Bắc khu đất. */
(function () {
  const G = (typeof window !== "undefined") ? (window.G3 = window.G3 || {}) : {};
  const SC = 200, MM = 1000 / SC; // 5 mm mô hình cho 1 m thật
  const TOP = [0, 4.95, 9.45, 13.95], CORE_UP = 1.6;
  const nf = (v, d = 2) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const cm = v => v * 100 / SC;
  const cmt = (v, d = 2) => nf(cm(v), d);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const solid = b => b && b.kind !== "court" && b.kind !== "park" && b.kind !== "frame";
  const isCore = b => /^(stair|lift|book)$/.test(b.kind);
  const ovl = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const KN = { stair: "Thang bộ", lift: "Thang bộ + máy", book: "Lõi sách", circ: "Hành lang", court: "Sân trong", park: "Bãi xe", frame: "Khung lam" };
  const label = b => b.kind === "room" ? b.c : (KN[b.kind] || b.kind);

  // cao độ đáy, đỉnh khối (m), giống khối 3D: tầng 1 từ mặt đất, lõi thang không có lõi chồng lên thì nhô 1,6 m
  function zOf(b, all) {
    const f = Math.max(1, Math.min(3, b.f || 1)), z0 = TOP[f - 1]; let z1 = TOP[f], up = false;
    if (isCore(b) && !(all || []).some(o => o !== b && isCore(o) && o.f > f && ovl(o, b) > 1)) { z1 += CORE_UP; up = true; }
    return { z0, z1, h: z1 - z0, up };
  }
  // cụm liền: chạm nhau dọc một cạnh chung ≥ 0,5 m (cùng luật với kích thước tổng)
  function clusters(blocks, tol = 0.1) {
    const L = blocks.filter(solid), n = L.length, p = L.map((_, i) => i), f = i => p[i] === i ? i : (p[i] = f(p[i]));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = L[i], b = L[j], ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if ((ox >= -tol && oy >= 0.5) || (oy >= -tol && ox >= 0.5)) p[f(i)] = f(j);
    }
    const m = new Map(); L.forEach((b, i) => { const r = f(i); if (!m.has(r)) m.set(r, []); m.get(r).push(b); });
    return [...m.values()].map(bs => {
      const x0 = Math.min(...bs.map(b => b.x)), y0 = Math.min(...bs.map(b => b.y)), x1 = Math.max(...bs.map(b => b.x + b.w)), y1 = Math.max(...bs.map(b => b.y + b.h));
      return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0, blocks: bs.sort((a, b) => a.y - b.y || a.x - b.x) };
    }).sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
  }
  // đường bao của nhiều hình chữ nhật: cut = mép ngoài (cắt rời), mark = ranh giữa các khối bên trong (rạch nhẹ)
  function outline(rs) {
    const merge = vs => { const s = [...new Set(vs)].sort((a, b) => a - b), m = new Map(); let g = []; const flush = () => { if (!g.length) return; const v = g.reduce((t, q) => t + q, 0) / g.length; g.forEach(q => m.set(q, v)); g = []; }; for (const v of s) { if (g.length && v - g[g.length - 1] > 0.06) flush(); g.push(v); } flush(); return m; };
    const mx = merge(rs.flatMap(r => [r.x, r.x + r.w])), my = merge(rs.flatMap(r => [r.y, r.y + r.h]));
    const R = rs.map(r => ({ x0: mx.get(r.x), x1: mx.get(r.x + r.w), y0: my.get(r.y), y1: my.get(r.y + r.h) })).filter(r => r.x1 - r.x0 > 0.01 && r.y1 - r.y0 > 0.01);
    const xs = [...new Set(R.flatMap(r => [r.x0, r.x1]))].sort((a, b) => a - b), ys = [...new Set(R.flatMap(r => [r.y0, r.y1]))].sort((a, b) => a - b);
    const e = 1e-9, F = xs.map((_, i) => ys.map((__, j) => i < xs.length - 1 && j < ys.length - 1 && R.some(r => r.x0 <= xs[i] + e && r.x1 >= xs[i + 1] - e && r.y0 <= ys[j] + e && r.y1 >= ys[j + 1] - e)));
    const fill = (i, j) => i >= 0 && j >= 0 && i < xs.length - 1 && j < ys.length - 1 && F[i][j];
    const onV = (x, a, b) => R.some(r => (Math.abs(r.x0 - x) < e || Math.abs(r.x1 - x) < e) && r.y0 <= a + e && r.y1 >= b - e);
    const onH = (y, a, b) => R.some(r => (Math.abs(r.y0 - y) < e || Math.abs(r.y1 - y) < e) && r.x0 <= a + e && r.x1 >= b - e);
    const cut = [], mark = [];
    for (let i = 0; i < xs.length; i++) for (let j = 0; j < ys.length - 1; j++) { const a = fill(i - 1, j), b = fill(i, j); if (a !== b) cut.push(["v", xs[i], ys[j], ys[j + 1]]); else if (a && onV(xs[i], ys[j], ys[j + 1])) mark.push(["v", xs[i], ys[j], ys[j + 1]]); }
    for (let j = 0; j < ys.length; j++) for (let i = 0; i < xs.length - 1; i++) { const a = fill(i, j - 1), b = fill(i, j); if (a !== b) cut.push(["h", ys[j], xs[i], xs[i + 1]]); else if (a && onH(ys[j], xs[i], xs[i + 1])) mark.push(["h", ys[j], xs[i], xs[i + 1]]); }
    // nối các đoạn thẳng hàng liền nhau
    const join = S => { const out = []; S.sort((p, q) => p[0] < q[0] ? -1 : p[0] > q[0] ? 1 : p[1] - q[1] || p[2] - q[2]); for (const s of S) { const l = out[out.length - 1]; if (l && l[0] === s[0] && Math.abs(l[1] - s[1]) < e && Math.abs(l[3] - s[2]) < e) l[3] = s[3]; else out.push([...s]); } return out.map(s => s[0] === "v" ? [s[1], s[2], s[1], s[3]] : [s[2], s[1], s[3], s[1]]); };
    return { cut: join(cut), mark: join(mark) };
  }
  // bảng kích thước: mỗi tầng, mỗi cụm, mỗi khối (cm mô hình)
  function table(blocks) {
    const P = blocks.filter(solid), out = [];
    for (const f of [1, 2, 3]) {
      const L = P.filter(b => b.f === f); if (!L.length) continue;
      const cl = clusters(L);
      out.push({ f, h: TOP[f] - TOP[f - 1], z0: TOP[f - 1], cl: cl.map((c, i) => ({ ...c, k: i + 1, rows: c.blocks.map(b => ({ b, ...zOf(b, P) })) })), n: L.length });
    }
    return out;
  }
  function csv(blocks) {
    const T = table(blocks), n2 = v => nf(cm(v), 2).replace(/\./g, ""), q = s => `"${String(s).replace(/"/g, '""')}"`;
    const L = [["Tầng", "Cụm", "Mã", "Tên khối", "Rộng Đông–Tây (m)", "Sâu Bắc–Nam (m)", "Rộng mô hình (cm)", "Sâu mô hình (cm)", "Cao mô hình (cm)", "Đặt cao từ (cm)", "Cách mép Tây khu đất (cm)", "Cách mép Bắc khu đất (cm)"].map(q).join(";")];
    for (const t of T) for (const c of t.cl) {
      L.push([t.f, c.k, "CỤM", q(`Cụm ${c.k} (khung bao, ${c.blocks.length} khối)`), nf(c.w), nf(c.h), n2(c.w), n2(c.h), n2(t.h), n2(t.z0), n2(c.x0), n2(c.y0)].join(";"));
      for (const r of c.rows) L.push([t.f, c.k, q(label(r.b)), q(r.b.n || ""), nf(r.b.w), nf(r.b.h), n2(r.b.w), n2(r.b.h), n2(r.h), n2(r.z0), n2(r.b.x), n2(r.b.y)].join(";"));
    }
    return "﻿" + L.join("\r\n");
  }
  // khung chung cho mọi tầng (m), để các tờ chồng khớp nhau
  function frameOf(blocks) {
    const L = blocks.filter(b => b.w > 0 && b.h > 0); if (!L.length) return null;
    const x0 = Math.floor(Math.min(...L.map(b => b.x)) - 2), y0 = Math.floor(Math.min(...L.map(b => b.y)) - 2), x1 = Math.ceil(Math.max(...L.map(b => b.x + b.w)) + 2), y1 = Math.ceil(Math.max(...L.map(b => b.y + b.h)) + 2);
    return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
  }
  // một tầng, đơn vị mm, gốc ở góc trên trái khung
  function panel(f, blocks, fr) {
    const P = blocks.filter(solid), L = P.filter(b => b.f === f), X = v => +((v - fr.x0) * MM).toFixed(3), Y = v => +((v - fr.y0) * MM).toFixed(3);
    const W = fr.w * MM, H = fr.h * MM, seg = s => s.map(([a, b, c, d]) => `M${X(a)} ${Y(b)}L${X(c)} ${Y(d)}`).join("");
    const T = (t, x, y, s, a = "") => `<text x="${(+x).toFixed(2)}" y="${(+y).toFixed(2)}" font-size="${(+s).toFixed(2)}" font-family="Arial, Helvetica, sans-serif" ${a}>${esc(t)}</text>`;
    let ref = `<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#9a9a9a" stroke-width="0.15" stroke-dasharray="2 1.5"/>`;
    for (const [cx, cy] of [[0, 0], [W, 0], [0, H], [W, H]]) ref += `<path d="M${cx - 4} ${cy}H${cx + 4}M${cx} ${cy - 4}V${cy + 4}" stroke="#9a9a9a" stroke-width="0.2"/>`;
    ref += T(`góc khung: cách mép Tây khu đất ${cmt(fr.x0)} cm, mép Bắc ${cmt(fr.y0)} cm`, 1.5, -1.5, 2.2, 'fill="#777"');
    const low = P.filter(b => b.f === f - 1);
    if (low.length) ref += `<path d="${seg(outline(low).cut)}" fill="none" stroke="#b0b0b0" stroke-width="0.2" stroke-dasharray="1.2 1"/>`;
    for (const b of blocks.filter(b => b.f === f && !solid(b))) ref += `<rect x="${X(b.x)}" y="${Y(b.y)}" width="${(b.w * MM).toFixed(2)}" height="${(b.h * MM).toFixed(2)}" fill="none" stroke="#9a9a9a" stroke-width="0.2" stroke-dasharray="0.8 0.8"/>` + T(`${label(b)} (không cắt)`, X(b.x + b.w / 2), Y(b.y + b.h / 2), 1.8, 'fill="#888" text-anchor="middle"');
    const cl = clusters(L);
    let cut = "", mark = "", txt = "";
    for (const [i, c] of cl.entries()) {
      const o = outline(c.blocks); cut += seg(o.cut); mark += seg(o.mark);
      txt += T(`Cụm ${i + 1} · ${cmt(c.w)} × ${cmt(c.h)} cm`, X(c.x0), Y(c.y0) - 1.2, 2, 'fill="#555"');
    }
    for (const b of L) {
      const w = b.w * MM, h = b.h * MM, z = zOf(b, P), cx = X(b.x + b.w / 2), cy = Y(b.y + b.h / 2), rot = h > w * 1.4 && w < 22;
      const big = Math.min(w, h) >= 6, s = Math.max(1.4, Math.min(3.2, Math.min(rot ? h : w, 60) / 7));
      if (Math.min(w, h) < 3.2) continue;
      const tr = rot ? ` transform="rotate(-90 ${cx.toFixed(2)} ${cy.toFixed(2)})"` : "";
      txt += `<g${tr}>` + T(label(b) + (z.up ? " ↑" : ""), cx, cy - (big ? s * 0.25 : -s * 0.35), s, 'text-anchor="middle" font-weight="700"');
      if (big) txt += T(`${cmt(b.w)}×${cmt(b.h)}${z.up ? ` · cao ${cmt(z.h)}` : ""}`, cx, cy + s * 0.95, Math.max(1.3, s * 0.62), 'text-anchor="middle" fill="#333"');
      txt += "</g>";
    }
    const hh = TOP[f] - TOP[f - 1];
    const title = T(`Tầng ${f} · cắt dày ${cmt(hh, 3)} cm${f === 1 ? " (gồm nền 0,225 cm)" : ""} · đặt từ ${cmt(TOP[f - 1], 3)} cm · ${L.length} khối, ${cl.length} cụm${L.some(b => zOf(b, P).up) ? " · ↑ lõi thang cao thêm 0,8 cm" : ""}`, 0, -6, 3.6, 'font-weight="700"');
    return `<g class="tham-khao" id="tham-khao-t${f}">${ref}</g><g id="cat-t${f}" fill="none" stroke="#ff0000" stroke-width="0.1"><path d="${cut}"/></g><g id="rach-t${f}" fill="none" stroke="#0000ff" stroke-width="0.1"><path d="${mark}"/></g><g id="chu-t${f}" font-family="Arial, Helvetica, sans-serif" fill="#000">${title}${txt}</g>`;
  }
  // vạch kiểm tra tỉ lệ khi in: 10 cm
  const scaleBar = (x, y) => { let s = `<g font-family="Arial, Helvetica, sans-serif"><path d="M${x} ${y}H${x + 100}" stroke="#000" stroke-width="0.4"/>`; for (let i = 0; i <= 20; i++) { const l = i % 2 ? 1.6 : i % 10 ? 2.6 : 3.6; s += `<path d="M${x + i * 5} ${y}V${y - l}" stroke="#000" stroke-width="${i % 2 ? 0.15 : 0.3}"/>`; if (!(i % 2)) s += `<text x="${x + i * 5}" y="${y - 4.4}" font-size="2.4" text-anchor="middle">${i / 2}</text>`; } s += `<text x="${x + 103}" y="${y - 0.5}" font-size="2.6">cm mô hình = ${i2m(10)} m thật</text><text x="${x}" y="${y + 4.6}" font-size="2.5">Kiểm tra in: vạch này phải dài đúng 10 cm. In 100% (kích thước thật), không chọn “vừa trang”.</text></g>`; return s; };
  const i2m = c => nf(c * SC / 100, 0);
  const legend = (x, y) => `<g font-family="Arial, Helvetica, sans-serif" font-size="2.6"><path d="M${x} ${y}h8" stroke="#ff0000" stroke-width="0.5"/><text x="${x + 10}" y="${y + 0.9}">đỏ: cắt rời (mép ngoài mỗi cụm)</text><path d="M${x + 62} ${y}h8" stroke="#0000ff" stroke-width="0.5"/><text x="${x + 72}" y="${y + 0.9}">xanh: rạch nhẹ, khắc ranh phòng</text><path d="M${x + 124} ${y}h8" stroke="#9a9a9a" stroke-width="0.5" stroke-dasharray="1.2 1"/><text x="${x + 134}" y="${y + 0.9}">xám: tham khảo, không cắt (nét đứt: tầng dưới)</text></g>`;
  // một file SVG đúng mm, các tầng đặt cạnh nhau (máy cắt laser, mở bằng Illustrator, AutoCAD, Inkscape)
  function svgFile(blocks, o = {}) {
    const B = blocks.filter(b => b.w > 0 && b.h > 0), fr = frameOf(B); if (!fr) return "";
    const fl = [1, 2, 3].filter(f => B.some(b => b.f === f && solid(b))), W = fr.w * MM, H = fr.h * MM, gap = 16, M = 12, TT = 30, FT = 26;
    const TW = Math.max(fl.length * W + (fl.length - 1) * gap + 2 * M, 200), TH = TT + H + FT + M;
    let s = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${TW.toFixed(2)}mm" height="${TH.toFixed(2)}mm" viewBox="0 0 ${TW.toFixed(2)} ${TH.toFixed(2)}">\n<title>${esc(o.title || "ARC 329 · khuôn cắt mô hình 1:200")}</title>\n`;
    s += `<text x="${M}" y="9" font-family="Arial, Helvetica, sans-serif" font-size="4.2" font-weight="700">${esc(o.title || "ARC 329 · Trung tâm Văn hóa Thư viện · khuôn cắt mô hình 1:200")}</text><text x="${M}" y="14" font-family="Arial, Helvetica, sans-serif" font-size="2.6" fill="#444">1 m thật = 5 mm. Đơn vị file: mm, đúng kích thước thật của mô hình. ${esc(o.note || "")}</text>`;
    fl.forEach((f, i) => { s += `<g transform="translate(${(M + i * (W + gap)).toFixed(2)} ${TT})">${panel(f, B, fr)}</g>\n`; });
    s += scaleBar(M, TT + H + 12) + legend(M + 160 > TW - 190 ? M : M + 160, TT + H + 12) + "</svg>";
    return s;
  }
  // khổ giấy in: chọn khổ nhỏ nhất vừa một tầng
  const PAPER = [["A4", 210, 297], ["A3", 297, 420], ["A2", 420, 594], ["A1", 594, 841]];
  function paperFor(W, H) {
    for (const [n, a, b] of PAPER) { if (W + 12 <= a && H + 42 <= b) return { n, o: "portrait", w: a, h: b }; if (W + 12 <= b && H + 42 <= a) return { n, o: "landscape", w: b, h: a }; }
    const [n, a, b] = PAPER[PAPER.length - 1]; return { n, o: "portrait", w: a, h: b };
  }
  // trang in: mỗi tầng một tờ đúng tỉ lệ, tờ cuối là bảng kích thước
  function printHTML(blocks, o = {}) {
    const B = blocks.filter(b => b.w > 0 && b.h > 0), fr = frameOf(B); if (!fr) return "";
    const fl = [1, 2, 3].filter(f => B.some(b => b.f === f && solid(b))), W = fr.w * MM, H = fr.h * MM, pp = paperFor(W, H);
    const T = table(B);
    const pages = fl.map(f => `<section class="pg"><svg xmlns="http://www.w3.org/2000/svg" width="${W.toFixed(2)}mm" height="${(H + 30).toFixed(2)}mm" viewBox="0 -10 ${W.toFixed(2)} ${(H + 30).toFixed(2)}"><g>${panel(f, B, fr)}</g>${scaleBar(0, H + 13)}</svg></section>`).join("");
    const rows = T.map(t => `<h3>Tầng ${t.f} · cắt dày ${cmt(t.h, 3)} cm · đặt từ ${cmt(t.z0, 3)} cm</h3><table><tr><th>Khối</th><th>Tên</th><th>Rộng Đ–T</th><th>Sâu B–N</th><th>Cao</th><th>Cách mép Tây</th><th>Cách mép Bắc</th></tr>${t.cl.map(c => `<tr class="cl"><td>Cụm ${c.k}</td><td>khung bao ${c.blocks.length} khối</td><td>${cmt(c.w)}</td><td>${cmt(c.h)}</td><td>${cmt(t.h, 3)}</td><td>${cmt(c.x0)}</td><td>${cmt(c.y0)}</td></tr>` + c.rows.map(r => `<tr><td>${esc(label(r.b))}</td><td>${esc(r.b.n || "")}</td><td>${cmt(r.b.w)}</td><td>${cmt(r.b.h)}</td><td>${cmt(r.h, 3)}${r.up ? " ↑" : ""}</td><td>${cmt(r.b.x)}</td><td>${cmt(r.b.y)}</td></tr>`).join("")).join("")}</table>`).join("");
    return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Khuôn cắt mô hình 1:200</title>
<style>@page { size: ${pp.n} ${pp.o}; margin: 6mm; } body { font: 12px Arial, Helvetica, sans-serif; color: #000; background: #fff; margin: 0; } .pg { page-break-after: always; break-after: page; } .pg svg { display: block; } .hd { padding: 8mm 10mm 0; } .hd h1 { font-size: 18px; margin: 0 0 4px; } .tb { padding: 0 0 8mm; } table { border-collapse: collapse; width: 100%; margin-bottom: 6mm; font-size: 11px; } td, th { border: 0.2mm solid #999; padding: 1.2mm 2mm; text-align: right; } td:nth-child(1), td:nth-child(2), th:nth-child(1), th:nth-child(2) { text-align: left; } tr.cl td { font-weight: 700; background: #eee; } h3 { font-size: 13px; margin: 4mm 0 2mm; } @media screen { body { background: #ddd; } .pg, .tb, .hd { background: #fff; width: ${pp.w - 12}mm; margin: 6mm auto; padding: 8mm 10mm; box-shadow: 0 2px 8px rgba(0,0,0,.2); } }</style></head><body>
<div class="hd"><h1>${esc(o.title || "ARC 329 · Khuôn cắt mô hình 1:200")}</h1><p>In khổ <b>${pp.n} ${pp.o === "portrait" ? "đứng" : "ngang"}</b>, tỉ lệ <b>100% (kích thước thật)</b>; đo vạch kiểm tra trên mỗi tờ phải đúng 10 cm. Mỗi tờ là một tầng, cùng một khung, nên chồng các tờ theo dấu góc là khớp vị trí. Đỏ: cắt rời; xanh: rạch nhẹ ranh phòng; xám: tham khảo. Đơn vị bảng: cm mô hình (1 m thật = 0,5 cm).</p></div>
${pages}<div class="tb"><h1 style="font-size:16px">Bảng kích thước cắt (cm mô hình)</h1><p>Cao tầng 4,5 m = 2,25 cm; khối tầng 1 tính từ mặt đất = 2,475 cm (gồm nền 0,225 cm, nếu làm đế nền riêng thì cắt 2,25 cm). ↑: lõi thang nhô lên mái thêm 0,8 cm. Vị trí đo từ mép Tây và mép Bắc khu đất (đế khu đất 20,75 × 52 cm).</p>${rows}</div>
</body></html>`;
  }
  const api = { SC, MM, TOP, cm, cmt, zOf, clusters, outline, table, csv, svgFile, printHTML, frameOf, paperFor, label };
  G.MOHINH = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
