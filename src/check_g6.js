// Kiểm tra đợt khối mới (G.ideas6) và các khối cầu đã sửa. Chạy: node check_g6.js [id ...]  (thêm "all4" để kiểm cả G.ideas4)
const fs = require("fs");
global.window = {};
const dir = __dirname;
const six = fs.readdirSync(dir).filter(f => /^g[678]_.*\.js$/.test(f) && f !== "g6_kit.js").sort();
for (const f of ["g3_ideas.js", "g3_roles.js", "g3_ideas2.js", "g4a.js", "g4b.js", "g6_kit.js", ...six, "g3_prep.js"]) eval(fs.readFileSync(dir + "/" + f, "utf8"));
const G = window.G3;
const args = process.argv.slice(2), want = args.filter(a => a !== "all4");
const list = [...(G.ideas6 || []), ...(G.ideas7 || []), ...(G.ideas8 || []), ...(args.includes("all4") ? G.ideas4 : G.ideas4.filter(I => want.includes(I.id)))];
const shoe = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
const bb = v => { const p = G.footPts(v), xs = p.map(q => q[0]), ys = p.map(q => q[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
const ov1 = (a1, a2, b1, b2) => Math.max(0, Math.min(a2, b2) - Math.max(a1, b1));
const bld = v => v.k !== "lines" && v.k !== "disc" && (v.zone !== "X" || v.env);
let bad = 0;
for (const I of list) {
  if (want.length && !want.includes(I.id)) continue;
  const P = G.prep(I), f = P.fac, err = [], warn = [];
  if (P.tot > 3000) err.push(`VUOT 3000 (${Math.round(P.tot)})`);
  if (P.tot < 2400) warn.push(`tong san thap ${Math.round(P.tot)}`);
  for (const k of ["A", "B", "C", "D", "E"]) if (!P.byZ[k]) err.push("thieu nhom " + k);
  for (const k of ["id", "fam", "code", "name", "rule", "tag", "story", "kc", "qa", "cut", "lab"]) if (!I[k]) err.push("thieu truong " + k);
  if (G.ideas7 && G.ideas7.includes(I)) { const r = I.ref || {}; for (const k of ["name", "by", "year", "place", "url", "what", "take"]) if (!r[k]) err.push("thieu ref." + k); if (r.url && !/^https:\/\//.test(r.url)) err.push("ref.url phai la https"); }
  if (!I.why || I.why.length < 4) err.push("why < 4 muc");
  const H = G.hier(P), BF = P.brief;
  if (BF.st === "thieu" || BF.st === "vuot") err.push(`de ABCDE: ${BF.st} ` + BF.short.map(([k, d]) => k + "-" + Math.round(d)).join(" "));
  else if (BF.st === "chia") warn.push("de ABCDE: du tong nhung " + BF.short.map(([k, d]) => k + " thieu " + Math.round(d)).join(", ") + " (can >= de x1.15 trong khoi cung nhom)");
  if (G.ideas8 && G.ideas8.includes(I)) {
    if (BF.st !== "du") err.push("dot 6: moi nhom A-E phai du ngay (>= de x1.15)");
    if (P.props) err.push(`dot 6: con ${P.props} cot chong tu them, hay tu dat cot duoi phan dua > 4 m`);
    const tall = P.V.filter(v => v.zone !== "X" && v.area > 0 && G.vTop(v) > 14.6);
    if (tall.length) err.push("dot 6: qua 3 tang (khoi co sang cao hon +14.45)");
    if (!I.ngoaigio || I.ngoaigio.length < 40) err.push("dot 6: thieu truong ngoaigio (cach tach khu su kien ngoai gio)");
  }
  if (P.props) warn.push(`prep tu them ${P.props} cot chong duoi phan dua > 4 m`);
  if (!H.ok) warn.push(`chu-phu chua ro: san ${Math.round(H.pa * 100)}% (>=55), the tich ${Math.round(H.pv * 100)}% (>=60), cao ${H.hm.toFixed(1)}/${H.hp.toFixed(1)} = ${H.ratio.toFixed(2)} (>=1.6)`);
  const ew = f.E.tran + f.W.tran; if (ew > 20) err.push("kinh tran Dong+Tay " + Math.round(ew));
  for (const v of P.V) for (const key of ["x", "y", "w", "d", "z1", "z2"]) if (key in v && typeof v[key] === "number" && !isFinite(v[key])) err.push("NaN " + v.k);
  const B = P.V.filter(bld);
  // nằm trong khu đất
  for (const v of B) { const [x1, y1, x2, y2] = bb(v); if (x1 < -0.3 || y1 < -0.3 || x2 > 41.8 || y2 > 104.3) warn.push(`ra ngoai khu dat: ${v.k} ${v.zone} [${x1},${y1},${x2},${y2}]`); }
  // chồng khối (hộp với hộp)
  const bx = B.filter(v => v.k === "box" && !v.env);
  for (let i = 0; i < bx.length; i++) for (let j = i + 1; j < bx.length; j++) {
    const a = bx[i], b = bx[j], o = ov1(a.x, a.x + a.w, b.x, b.x + b.w) * ov1(a.y, a.y + a.d, b.y, b.y + b.d) * ov1(a.z1, a.z2, b.z1, b.z2);
    if (o > 0.6) err.push(`chong khoi ${o.toFixed(1)} m3: [${a.x},${a.y},${a.w},${a.d},${a.z1}-${a.z2}] & [${b.x},${b.y},${b.w},${b.d},${b.z1}-${b.z2}]`);
  }
  // khối trên cao phải có chỗ tựa: khối bên dưới, cột/tường, hoặc dây/dàn; đua > 4,5 m mà không có dây/dàn thì cảnh báo
  const segs = P.st.filter(s => s.t === "seg"), posts = P.st.filter(s => s.t !== "seg");
  for (const v of B) {
    if (v.zone === "X" || G.vBot(v) < 0.7) continue;
    const z1 = G.vBot(v), z2 = G.vTop(v), fp = G.footPts(v), [x1, y1, x2, y2] = bb(v), A = shoe(fp);
    const inF = (x, y) => G.inPoly(fp, x, y, 0.35);
    const below = P.V.filter(o => o !== v && o.k !== "lines" && Math.abs(G.vTop(o) - z1) <= 0.25).map(o => { const q = bb(o); return [Math.max(q[0], x1), Math.max(q[1], y1), Math.min(q[2], x2), Math.min(q[3], y2)]; }).filter(r => r[2] - r[0] > 0.3 && r[3] - r[1] > 0.3);
    const ps = posts.filter(s => inF(s.t === "col" ? s.x : s.x + s.w / 2, s.t === "col" ? s.y : s.y + s.d / 2) && s.z1 <= z1 + 0.3 && s.z2 >= z1 - 0.6).map(s => s.t === "col" ? [s.x, s.y, s.x, s.y] : [s.x, s.y, s.x + s.w, s.y + s.d]);
    const hang = segs.filter(s => [s.a, s.b].some(p => inF(p[0], p[1]) && p[2] >= z1 - 0.3 && p[2] <= z2 + 0.3)).length;
    const sup = below.concat(ps);
    // cầu nối: tựa hai đầu vào hai khối hai bên (chạm cạnh, chồng nhau theo chiều cao ≥ 2 m)
    const side = P.V.filter(o => o !== v && bld(o) && ov1(G.vBot(o), G.vTop(o), z1, z2) >= 2).map(o => bb(o));
    const touch = (a, b) => Math.abs(a - b) <= 0.35;
    const bridgeX = side.some(q => touch(q[2], x1) && ov1(q[1], q[3], y1, y2) > 1) && side.some(q => touch(q[0], x2) && ov1(q[1], q[3], y1, y2) > 1);
    const bridgeY = side.some(q => touch(q[3], y1) && ov1(q[0], q[2], x1, x2) > 1) && side.some(q => touch(q[1], y2) && ov1(q[0], q[2], x1, x2) > 1);
    if (bridgeX || bridgeY) continue;
    if (!sup.length && hang < 4) { err.push(`khoi lo lung: ${v.k} ${v.zone} [${x1},${y1},${x2},${y2}] z ${z1}`); continue; }
    if (hang >= 4 || !sup.length) continue;
    const sx1 = Math.min(...sup.map(r => r[0])), sy1 = Math.min(...sup.map(r => r[1])), sx2 = Math.max(...sup.map(r => r[2])), sy2 = Math.max(...sup.map(r => r[3]));
    const over = Math.max(sx1 - x1, x2 - sx2, sy1 - y1, y2 - sy2);
    if (over > 4.5) warn.push(`dua ${over.toFixed(1)} m khong co day/dan: ${v.k} ${v.zone} [${x1},${y1},${x2},${y2}] z ${z1}`);
    if (A < 1) warn.push("khoi qua nho");
  }
  // trụ nghiêng: góc nghiêng và số dây hai phía
  const pyl = P.V.filter(v => v.pyl);
  const pinfo = pyl.map(p => {
    const a = G.K4.axisAt(p, p.z1), b = G.K4.axisAt(p, p.z2), lx = b[0] - a[0], ly = b[1] - a[1], L = Math.hypot(lx, ly), ang = Math.atan2(L, p.z2 - p.z1) * 180 / Math.PI;
    const near = segs.filter(s => [s.a, s.b].some(q => q[2] > p.z1 + (p.z2 - p.z1) * 0.4 && Math.hypot(q[0] - G.K4.axisAt(p, q[2])[0], q[1] - G.K4.axisAt(p, q[2])[1]) < 2.5));
    let fw = 0, bk = 0;
    for (const s of near) { const hd = s.a[2] > s.b[2] ? s.a : s.b, ft = hd === s.a ? s.b : s.a, dx = ft[0] - hd[0], dy = ft[1] - hd[1]; if (L > 0.3 && dx * lx + dy * ly > 0) bk++; else fw++; }
    if (ang > 3 && bk === 0 && fw > 0) { /* nghiêng ra xa phía dây: tự cân */ }
    if (ang > 3 && fw === 0) warn.push(`tru nghieng ${ang.toFixed(0)} do nhung khong co day phia truoc`);
    return `tru ${ang.toFixed(0)}° day ${fw}/${bk}`;
  });
  if (err.length) bad++;
  const z = ["A", "B", "C", "D", "E", "L"].map(k => `${k}${Math.round(P.byZ[k] || 0)}`).join(" ");
  console.log(`\n${I.code} ${I.id} · ${I.name} · ${Math.round(P.tot)} m² · cao +${P.H.toFixed(1)} · cot ${JSON.stringify(P.lev)} · ${z}`);
  console.log(`   chu-phu: san ${Math.round(H.pa * 100)}% · the tich ${Math.round(H.pv * 100)}% · cao chinh ${H.hm.toFixed(1)} / phu ${H.hp.toFixed(1)} (x${H.ratio.toFixed(2)}) · ${H.np} khoi phu · kinh tran D+T ${Math.round(ew)} m² ${pinfo.join(" · ")}`);
  for (const e of err) console.log("   ✗", e);
  for (const w of warn) console.log("   ·", w);
}
console.log(bad ? `\n${bad} phuong an co loi` : "\nTat ca on");
