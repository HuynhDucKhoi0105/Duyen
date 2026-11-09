/* ================= Kích thước tổng của bản xếp khối (bạn yêu cầu 08/11/2026) =================
   Tổng dài Bắc – Nam, tổng rộng Đông – Tây của cả tầng, và của từng cụm khối liền nhau.
   Dùng chung cho tab Tự xếp khối (mặt bằng + 3D) và tab Final 1. Khối: {x, y, w, h, kind}, đơn vị mét. */
(function () {
  const G = window.G3 = window.G3 || {};
  const NS = "http://www.w3.org/2000/svg";
  const nf = (v, d = 2) => (+v).toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const solid = b => b && b.kind !== "court" && b.kind !== "park";
  const box = L => L.length ? { x0: Math.min(...L.map(b => b.x)), y0: Math.min(...L.map(b => b.y)), x1: Math.max(...L.map(b => b.x + b.w)), y1: Math.max(...L.map(b => b.y + b.h)) } : null;
  // cụm liền: hai khối chạm hoặc chồng nhau dọc một cạnh chung ≥ 0,5 m (chạm góc không tính)
  function clusters(blocks, tol = 0.1) {
    const L = blocks.filter(solid), n = L.length, p = L.map((_, i) => i), f = i => p[i] === i ? i : (p[i] = f(p[i]));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = L[i], b = L[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if ((ox >= -tol && oy >= 0.5) || (oy >= -tol && ox >= 0.5)) p[f(i)] = f(j);
    }
    const m = new Map(); L.forEach((b, i) => { const r = f(i); if (!m.has(r)) m.set(r, []); m.get(r).push(b); });
    return [...m.values()].map(bs => ({ ...box(bs), n: bs.length, blocks: bs })).sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
  }
  // các đường cần vẽ: tổng (phía Bắc, phía Tây) và từng cụm từ 2 khối (phía Nam, phía Đông)
  function dims(blocks) {
    const L = blocks.filter(solid); if (!L.length) return { all: null, cl: [], sh: [], lines: [] };
    const all = box(L), cl = clusters(L), lines = [];
    const W = all.x1 - all.x0, H = all.y1 - all.y0;
    lines.push({ ax: "x", a: all.x0, b: all.x1, at: all.y0 - 4.2, from: all.y0, t: `Tổng Đông – Tây ${nf(W)} m`, tot: 1 });
    lines.push({ ax: "y", a: all.y0, b: all.y1, at: all.x0 - 4.2, from: all.x0, t: `Tổng Bắc – Nam ${nf(H)} m`, tot: 1 });
    const same = c => Math.abs(c.x0 - all.x0) < 0.02 && Math.abs(c.x1 - all.x1) < 0.02 && Math.abs(c.y0 - all.y0) < 0.02 && Math.abs(c.y1 - all.y1) < 0.02;
    const sh = cl.filter(c => c.n >= 2 && !same(c));
    sh.forEach((c, i) => {
      lines.push({ ax: "x", a: c.x0, b: c.x1, at: c.y1 + 1.4, from: c.y1, t: `Cụm ${i + 1}: ${nf(c.x1 - c.x0)} m`, ci: i + 1 });
      lines.push({ ax: "y", a: c.y0, b: c.y1, at: c.x1 + 1.4, from: c.x1, t: `Cụm ${i + 1}: ${nf(c.y1 - c.y0)} m`, ci: i + 1 });
    });
    return { all, cl, sh, lines, W, H };
  }
  // vẽ lên mặt bằng SVG (PX đơn vị SVG cho 1 m)
  function svg(parent, blocks, PX, o = {}) {
    const D = dims(blocks); if (!D.all) return D;
    const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
    const g = el("g", { class: "xdim", "pointer-events": "none" }, parent), fs = o.fs || 15, tk = 0.45;
    for (const l of D.lines) {
      const c = l.tot ? "var(--ink)" : "var(--xdimC, #0e7490)", sw = l.tot ? 1.6 : 1.3, gg = el("g", {}, g);
      const P = (u, v) => l.ax === "x" ? [u * PX, v * PX] : [v * PX, u * PX];
      const [x1, y1] = P(l.a, l.at), [x2, y2] = P(l.b, l.at);
      el("line", { x1, y1, x2, y2, stroke: c, "stroke-width": sw }, gg);
      for (const u of [l.a, l.b]) {
        const [ex1, ey1] = P(u, l.from + (l.at > l.from ? 0.3 : -0.3)), [ex2, ey2] = P(u, l.at + (l.at > l.from ? 0.6 : -0.6));
        el("line", { x1: ex1, y1: ey1, x2: ex2, y2: ey2, stroke: c, "stroke-width": 0.9, opacity: 0.8 }, gg);
        const [tx1, ty1] = P(u - tk, l.at + tk), [tx2, ty2] = P(u + tk, l.at - tk);
        el("line", { x1: tx1, y1: ty1, x2: tx2, y2: ty2, stroke: c, "stroke-width": 2.2 }, gg);
      }
      const mid = (l.a + l.b) / 2, off = l.at > l.from ? 0.95 : -0.95, [tx, ty] = P(mid, l.at + off);
      const t = el("text", { x: tx, y: ty, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": l.tot ? fs + 1 : fs - 1, "font-weight": l.tot ? 800 : 700, fill: c, stroke: "var(--sheet)", "stroke-width": 4, "paint-order": "stroke", "font-family": "var(--body)", transform: l.ax === "y" ? `rotate(-90 ${tx} ${ty})` : null }, gg);
      t.textContent = l.t;
    }
    return D;
  }
  // vẽ trong 3D (three.js): đường kích thước nằm ở cao độ z, nhãn là sprite
  function three(THREE, group, blocks, z, o = {}) {
    const D = dims(blocks); if (!D.all) return D;
    const ink = new THREE.Color(o.ink || "#222"), tc = new THREE.Color(o.cl || "#0e7490");
    const tex = (t, col) => { const cv = document.createElement("canvas"); cv.width = 1024; cv.height = 128; const x = cv.getContext("2d"); x.font = `bold 64px "Be Vietnam Pro", system-ui, sans-serif`; x.textAlign = "center"; x.textBaseline = "middle"; x.lineWidth = 14; x.strokeStyle = o.halo || "rgba(255,255,255,0.92)"; x.strokeText(t, 512, 66); x.fillStyle = col; x.fillText(t, 512, 66); return new THREE.CanvasTexture(cv); };
    for (const l of D.lines) {
      const col = l.tot ? ink : tc, m = new THREE.LineBasicMaterial({ color: col, depthTest: false, transparent: true });
      const P = (u, v) => l.ax === "x" ? new THREE.Vector3(u, z, v) : new THREE.Vector3(v, z, u);
      const L = pts => { const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m); ln.renderOrder = 5; group.add(ln); };
      L([P(l.a, l.at), P(l.b, l.at)]);
      for (const u of [l.a, l.b]) { L([P(u, l.from), P(u, l.at + (l.at > l.from ? 0.6 : -0.6))]); L([P(u - 0.5, l.at + 0.5), P(u + 0.5, l.at - 0.5)]); }
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(l.t, "#" + col.getHexString()), depthTest: false, transparent: true }));
      const k = o.scale || 1, q = P((l.a + l.b) / 2, l.at + (l.at > l.from ? 1.8 : -1.8) * k); sp.position.set(q.x, z + 0.9 * k, q.z); const s = (l.tot ? 1.2 : 1) * k; sp.scale.set(20 * s, 2.5 * s, 1); sp.renderOrder = 6; group.add(sp);
    }
    return D;
  }
  // một dòng chữ tóm tắt
  function text(blocks) {
    const D = dims(blocks); if (!D.all) return "";
    const cl = D.sh;
    return `Tổng Đông – Tây ${nf(D.W)} m × Bắc – Nam ${nf(D.H)} m` + (D.cl.length > 1 ? ` · ${D.cl.length} cụm rời${cl.length ? ": " + cl.map((c, i) => `cụm ${i + 1} ${nf(c.x1 - c.x0, 1)} × ${nf(c.y1 - c.y0, 1)} m`).join(", ") : ""}` : " · liền một khối");
  }
  G.XDIM = { clusters, dims, svg, three, text };
})();
