
/* ================= Đợt 4: bộ dụng cụ chung (trụ thon, dây văng nửa quạt, kiểm tra chủ – phụ) ================= */
(function (G) {
  const { LO, LN, seg } = G.K;
  G.ideas6 = G.ideas6 || [];
  G.ideas7 = G.ideas7 || []; // đợt 5: 40 ý tưởng từ công trình đạt giải
  G.ideas8 = G.ideas8 || []; // đợt 6: 2–3 tầng, theo ảnh mẫu và phương án đã ghim
  const rectC = (cx, cy, a, b) => [[cx - a / 2, cy - b / 2], [cx + a / 2, cy - b / 2], [cx + a / 2, cy + b / 2], [cx - a / 2, cy + b / 2]];
  const cen = q => q.reduce((s, p) => [s[0] + p[0] / q.length, s[1] + p[1] / q.length], [0, 0]);
  // trụ bê tông thon dần: chân tâm (x0, y0) cao độ z0, đỉnh tâm (x1, y1) cao độ z1; tiết diện [cạnh theo x, cạnh theo y] ở chân s0 và đỉnh s1
  const pylon = (x0, y0, z0, x1, y1, z1, s0, s1, o = {}) => LO(rectC(x0, y0, s0[0], s0[1]), rectC(x1, y1, s1[0], s1[1]), z0, z1, "sheet", "X", { top: "sheet", pyl: 1, ...o });
  // điểm trên trục trụ ở cao độ z
  const axisAt = (P, z) => { const t = (z - P.z1) / (P.z2 - P.z1), a = cen(P.bot), b = cen(P.topPts); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z]; };
  // dây văng nửa quạt: neo trên trụ rải đều từ cao độ zA lên zB, dây ngắn neo thấp, dây dài neo cao, nên không dồn vào một điểm.
  // deck: các điểm neo trên hộp (x, y, z). off: lệch điểm neo trên trụ [dx, dy] (hai mặt phẳng dây hai bên trụ)
  function stays(P, zA, zB, deck, off = [0, 0]) {
    const pc = axisAt(P, zA), dist = q => Math.hypot(q[0] - pc[0], q[1] - pc[1]);
    const ds = deck.slice().sort((p, q) => dist(p) - dist(q)), n = ds.length;
    return ds.map((q, i) => { const a = axisAt(P, n > 1 ? zA + (zB - zA) * i / (n - 1) : zB); return seg([a[0] + off[0], a[1] + off[1], a[2]], q); });
  }
  // dây vẽ mảnh, màu nhạt hơn nét khối
  const cables = st => LN(st.filter(s => s.t === "seg").map(s => [s.a, s.b]), "ink", { cab: 1 });

  // khối chính có rõ hơn khối phụ không: tỉ lệ sàn, tỉ lệ thể tích, cao độ đỉnh
  const shoe = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  function hier(P) {
    const o = { am: 0, ap: 0, vm: 0, vp: 0, hm: 0, hp: 0, np: 0 };
    for (const v of P.V) {
      if (v.zone === "X" || v.k === "lines" || !(v.area > 0)) continue;
      const top = G.vTop(v), vol = shoe(G.footPts(v)) * (top - G.vBot(v));
      if (v.role === "m") { o.am += v.area; o.vm += vol; o.hm = Math.max(o.hm, top); }
      else { o.ap += v.area; o.vp += vol; o.hp = Math.max(o.hp, top); o.np++; }
    }
    o.pa = o.am / (o.am + o.ap || 1); o.pv = o.vm / (o.vm + o.vp || 1); o.ratio = o.hp ? o.hm / o.hp : 9;
    o.ok = o.pa >= 0.55 && o.pv >= 0.6 && o.ratio >= 1.6;
    return o;
  }
  Object.assign(G.K4, { rectC, pylon, axisAt, stays, cables });
  G.hier = hier;
})(window.G3);
