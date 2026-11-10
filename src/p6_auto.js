/* ================= Dựng mặt bằng chi tiết thẳng từ file xếp khối, tự đặt cửa =================
   File xếp khối chưa có cửa (bạn dặn: cửa để làm sau, mình tự đoán chỗ có cửa). Luật đặt cửa:
   - Mỗi khối thuộc một khu: sk (đón tiếp, sự kiện, mở ngoài giờ), tv (thư viện, sau cổng từ), kho, nv (nhân viên), kt (kỹ thuật).
   - Hành lang lấy khu theo phòng nó chạm (chạm quầy A4 hay phòng đọc là tv; chạm sự kiện là sk; còn lại theo hành lang cạnh nó).
   - Chỗ hai khối chạm nhau đủ rộng thì mở cửa theo cặp khu (phòng–hành lang cùng khu: cửa phòng; khác khu: cửa khóa ngoài giờ hoặc cửa nhân viên; thang: cửa thang).
   - Tầng 1: A1 mở cửa chính ở các phía Bắc, Nam còn hở; phòng đông người có cửa thoát nạn ra ngoài; tiếp nhận C4 có cửa cuốn ra lối Tây. */
(function () {
  const G = (typeof window !== "undefined") ? (window.G3 = window.G3 || {}) : {};
  const E = 0.03;
  const KT = "Nam · Nữ · KT (người khuyết tật)";
  const zoneOf = c => /^(A1|A2|A3|D[1-4])$/.test(c) ? "sk" : /^(A4|B[1-6])$/.test(c) ? "tv" : /^(C1|C3)$/.test(c) ? "kho" : /^(C2|C4|E1|E2|E3|E6)$/.test(c) ? "nv" : c === "E4" ? "kt" : null;
  const ENCL = /^(B2|B3|B4|C\d|D\d|E\d)$/;
  // đoạn chạm giữa hai hình chữ nhật: {len, side của a ("N","S","E","W")}
  function touch(a, b) {
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (Math.abs(a.x + a.w - b.x) < E && oy > 0.2) return { len: oy, side: "E" };
    if (Math.abs(b.x + b.w - a.x) < E && oy > 0.2) return { len: oy, side: "W" };
    if (Math.abs(a.y + a.h - b.y) < E && ox > 0.2) return { len: ox, side: "S" };
    if (Math.abs(b.y + b.h - a.y) < E && ox > 0.2) return { len: ox, side: "N" };
    return null;
  }
  // phần cạnh còn hở ra ngoài (không áp khối nào cùng tầng)
  function freeLen(b, side, L) {
    const along = side === "N" || side === "S", a0 = along ? b.x : b.y, a1 = along ? b.x + b.w : b.y + b.h;
    let segs = [[a0, a1]];
    for (const o of L) { if (o === b) continue; const t = touch(b, o); if (!t || t.side !== side) continue; const p0 = along ? o.x : o.y, p1 = along ? o.x + o.w : o.y + o.h; segs = segs.flatMap(([s, e]) => [[s, Math.min(e, p0)], [Math.max(s, p1), e]]).filter(([s, e]) => e - s > 0.2); }
    return segs.reduce((m, [s, e]) => Math.max(m, e - s), 0);
  }
  function autoPlan(blocks, opt = {}) {
    const B = blocks.filter(b => b.onSite !== false && !b.draft && b.kind !== "court" && b.kind !== "frame");
    const parks = blocks.filter(b => b.kind === "park" && b.onSite !== false && !b.draft);
    const NF = Math.max(1, ...B.filter(b => b.kind !== "park").map(b => b.f || 1));
    const LV = [];
    for (let f = 1; f <= NF; f++) {
      const L = B.filter(b => (b.f || 1) === f && b.kind !== "park").map((b, i) => ({ b, id: "", x: b.x, y: b.y, w: b.w, h: b.h, kind: b.kind, c: b.kind === "room" ? b.c : b.kind === "circ" ? "circ" : null }));
      const used = new Set();
      for (const z of L) { let base = (z.c && z.c !== "circ" ? z.c : z.kind === "circ" ? "H" : z.kind === "stair" ? "ST" : z.kind === "lift" ? "TM" : "LS"), k = 1, id = base; while (used.has(id)) id = base + (++k); used.add(id); z.id = id; }
      LV.push(L);
    }
    // khu của phòng, rồi lan sang hành lang
    for (const L of LV) {
      for (const z of L) z.zone = z.kind === "room" ? zoneOf(z.c) : null;
      const nb = z => L.filter(o => o !== z && touch(z, o));
      for (let it = 0; it < 6; it++) for (const z of L.filter(z => z.kind === "circ")) {
        const zs = nb(z).map(o => o.kind === "room" ? zoneOf(o.c) : o.kind === "circ" ? o.zone : null).filter(Boolean);
        const has = q => zs.includes(q);
        const name = (z.b.n || "").toLowerCase();
        z.zone = /sự kiện|cà phê/.test(name) && has("sk") ? "sk" : has("tv") ? "tv" : has("sk") ? "sk" : /nhân viên|văn phòng|nghiệp vụ/.test(name) || has("nv") ? "nv" : has("kho") ? "nv" : z.zone || null;
      }
      for (const z of L.filter(z => z.kind === "circ" && !z.zone)) z.zone = "tv";
      for (const z of L.filter(z => z.c === "E5")) { const zs = nb(z).map(o => o.zone).filter(Boolean); z.zone = zs.includes("sk") ? "sk" : zs.includes("tv") ? "tv" : zs[0] || "tv"; }
      for (const z of L.filter(z => z.kind !== "room" && z.kind !== "circ")) z.zone = z.kind === "book" ? (LV.indexOf(L) === 0 ? "kho" : "tv") : (nb(z).some(o => o.zone === "tv") ? "tv" : nb(z).some(o => o.zone === "nv") ? "nv" : "tv");
    }
    // hành lang trước cổng từ: hành lang thư viện chạm sảnh A1 (người chưa qua quầy A4 đi trên đó)
    LV.forEach((L, li) => { if (li) return; const a1 = L.filter(z => z.c === "A1"); for (const z of L.filter(z => z.kind === "circ" && z.zone === "tv")) if (a1.some(a => touch(z, a))) z.pre = true; });
    // cửa
    const door = (z, to, w, k, pos) => { (z.d = z.d || []).push([to, w, k, pos == null ? 0.5 : pos]); };
    const linked = (a, b) => (a.d || []).some(d => d[0] === b.id) || (b.d || []).some(d => d[0] === a.id);
    LV.forEach((L, li) => {
      const isCore = z => z.kind === "stair" || z.kind === "lift" || z.kind === "book";
      for (let i = 0; i < L.length; i++) for (let j = 0; j < L.length; j++) {
        if (i === j) continue; const a = L[i], b = L[j]; if (linked(a, b)) continue;
        const t = touch(a, b); if (!t) continue; const s = t.len;
        const fit = w => s >= w + 0.2 ? w : s >= 1.0 ? +(s - 0.2).toFixed(2) : 0;
        let k = null, w = 0.9;
        const ca = a.c || "", cb = b.c || "";
        if (a.pre || b.pre) { // trước cổng từ chỉ mở sang A1, A4 và phòng nhân viên, kho
          const p = a.pre ? a : b, o = a.pre ? b : a; if (i > j && a.pre && b.pre) continue;
          if (o.c === "A1") { k = "k"; w = 1.6; } else if (o.c === "A4") { k = "o"; w = 2.0; } else if (o.zone === "nv" || o.zone === "kho") { k = "nv"; w = 1.0; } else if (o.pre) { k = "o"; w = 2.4; } else continue;
          const ww = s >= w + 0.2 ? w : s >= 1.0 ? +(s - 0.2).toFixed(2) : 0; if (ww && !linked(a, b)) door(a, b.id, ww, k); continue;
        }
        if (a.kind === "circ" && b.kind === "circ") { if (i > j) continue; k = a.zone === b.zone ? "o" : (a.zone === "tv" && b.zone === "sk") || (a.zone === "sk" && b.zone === "tv") ? "k" : "nv"; w = k === "o" ? 2.4 : 1.4; }
        else if (a.kind === "room" && b.kind === "circ") {
          if (ca === "A1" && b.zone === "tv") { k = "k"; w = 1.6; }
          else if (a.zone === b.zone || ca === "E5" || (a.zone === "sk" && b.zone === "sk")) { k = /^(A1|A2|A3|A4|B1|B5|B6)$/.test(ca) ? "o" : "p"; w = k === "o" ? (ca === "A4" ? 2.0 : 2.4) : /^(D1|B3|D4|B2)$/.test(ca) ? 1.8 : 0.9; }
          else if (a.zone === "nv" || a.zone === "kho" || a.zone === "kt") { k = "nv"; w = 1.0; }
          else continue;
        }
        else if (isCore(a) && (b.kind === "circ" || b.kind === "room")) {
          if (a.kind === "book" && li === 0) { if (!(b.zone === "kho" || b.zone === "nv")) continue; k = "nv"; w = 1.2; }
          else if (b.kind === "room" && a.kind === "stair" && li > 0 && (b.zone === "tv" || b.zone === "nv")) { k = "thang"; w = 1.2; } // thang bộ tầng trên: mở vào mọi phòng cạnh nó để thoát nạn
          else if (b.kind === "room" && (b.zone !== "tv" || b.c === "A1" || L.some(o => o.kind === "circ" && !o.pre && touch(b, o)))) continue;
          else { k = "thang"; w = 1.2; }
        }
        else if (a.kind === "room" && b.kind === "room") {
          if (i > j) continue;
          const pair = [ca, cb].sort().join("-");
          if (/^D1-D2$/.test(pair)) { k = "o"; w = 2.4; }
          else if (/^D1-D3$/.test(pair) || /^E1-E1$/.test(pair) || /^E1-E2$/.test(pair)) { k = "p"; w = 0.9; }
          else if (/^A1-A2$|^A2-A3$/.test(pair)) { k = "o"; w = 2.4; }
          else if (/^A1-A4$/.test(pair)) { k = "k"; w = 1.8; }
          else if (/^(A4-C[123]|C1-C2|C1-C3|C2-C3|C2-C4|C3-C4)$/.test(pair)) { k = "nv"; w = 1.0; }
          else if (a.zone === "tv" && b.zone === "tv" && /^B1|^B5|^B6/.test(ca) && /^B1|^B5|^B6/.test(cb)) { k = "o"; w = 2.4; }
          else continue;
        }
        else continue;
        const ww = fit(w); if (!ww) continue;
        door(a, b.id, ww, k);
      }
      // phòng chưa có cửa: nối với phòng cạnh cùng khu
      for (const z of L) {
        const has = L.some(o => linked(z, o)); if (has || isCore(z) && li > 0 && false) continue;
        if (has) continue;
        if (z.pre) continue;
        const o = L.filter(o => o !== z && !o.pre && touch(z, o) && !(o.c === "A1" && z.zone === "tv")).sort((p, q) => (q.zone === z.zone) - (p.zone === z.zone) || touch(z, q).len - touch(z, p).len)[0];
        if (o && !(li === 0 && (z.c === "A1" || o.c === "A1"))) { const t = touch(z, o); door(z, o.id, Math.min(0.9, t.len - 0.2), /stair|lift|book/.test(z.kind) ? "thang" : o.zone === z.zone ? "p" : "nv"); }
      }
      // cửa ra ngoài (tầng 1)
      if (li === 0) for (const z of L) {
        const fr = s => freeLen(z, s, L);
        const add = (k, w, sides) => { for (const s of sides) if (fr(s) >= w + 0.2) { door(z, s, w, k); return true; } return false; };
        if (z.c === "A1") { const n = add("chinh", 2.4, ["N"]), s = add("chinh", 2.4, ["S"]); if (!n && !s) add("chinh", 2.0, ["E", "W"]); }
        else if (z.c === "D1") { if (fr("N") >= 5) { door(z, "N", 1.8, "tn", 0.25); door(z, "N", 1.8, "tn", 0.8); } else add("tn", 1.8, ["N", "W", "E", "S"]) && add("tn", 1.2, ["W", "E", "S"]); }
        else if (/^(D4|A3)$/.test(z.c)) add("tn", 1.2, ["N", "E", "S", "W"]);
        else if (z.c === "B3") add("tnbd", 1.8, ["S", "N", "E"]);
        else if (z.c === "C4") { add("cuon", 2.8, ["W"]) || add("cuon", 2.8, ["S", "N"]); add("nv", 1.0, ["W", "S", "N"]); }
        else if (/^(E3|E4)$/.test(z.c)) add("nv", 1.0, ["S", "W", "E", "N"]);
        else if (z.kind === "circ" && !z.pre && fr("W") + fr("S") + fr("E") + fr("N") > 1.4) add(z.zone === "sk" ? "tn" : z.zone === "tv" ? "tnbd" : "nv", 1.2, ["E", "S", "W", "N"]);
        else if (z.kind === "stair" || z.kind === "lift") add(z.zone === "sk" ? "tn" : "tnbd", 1.2, ["W", "S", "N", "E"]);
      }
    });
    // lõi thang nối tầng: chồng nhau quá nửa thì cùng mã
    let ln = 0;
    LV.forEach((L, li) => { for (const z of L.filter(z => /stair|lift|book/.test(z.kind))) {
      const low = li ? LV[li - 1].filter(o => /stair|lift|book/.test(o.kind) && o.link && (Math.max(0, Math.min(o.x + o.w, z.x + z.w) - Math.max(o.x, z.x)) * Math.max(0, Math.min(o.y + o.h, z.y + z.h) - Math.max(o.y, z.y))) > 0.5 * z.w * z.h) : [];
      z.link = low[0] ? low[0].link : "L" + (++ln);
    } });
    // phòng cho bộ phân tích
    const E1s = [];
    const levels = LV.map((L, li) => ({
      k: "t" + (li + 1), z: 0.45 + 4.5 * li, title: `Tầng ${li + 1} · sàn +${(0.45 + 4.5 * li).toFixed(3)}`,
      env: L.map(z => [[z.x, z.y], [z.x + z.w, z.y], [z.x + z.w, z.y + z.h], [z.x, z.y + z.h]]),
      rooms: L.map(z => {
        const r = { id: z.id, n: z.b.n || z.c, r: [z.x, z.y, z.w, z.h], ctl: z.zone || "tv", nz: /^(D1|D2|A3|B3|E4)$/.test(z.c) ? 3 : /^(B4|D4)$/.test(z.c) ? 2 : /^(B2|E1)$/.test(z.c) ? 0 : 1, d: z.d || [] };
        if (z.kind === "room" || z.kind === "circ") r.c = z.c;
        if (/stair|lift|book/.test(z.kind)) r.core = { st: z.kind === "book" ? "u+l+b" : z.kind === "lift" ? "u+l" : "u", link: z.link };
        if (z.b.top) r.top = "N";
        if (z.c === "A4") r.ctrl = 1;
        if (z.c === "D1") { r.seat = 120; r.occ = 120; r.face = "W"; }
        if (z.c === "D4") r.seat = 24; if (z.c === "A3") r.seat = 32; if (z.c === "B2") r.seat = 40; if (z.c === "B5") r.seat = 16; if (z.c === "B3") r.seat = 32;
        if (z.c === "A1") { r.seat = 20; r.occ = 40; } if (z.c === "A2") r.occ = 30;
        if (z.c === "E5") r.wc = /thiếu nhi/i.test(z.b.n || "") ? "Trẻ em · thay tã · KT" : /nhân viên/i.test(z.b.n || "") ? "Nam · Nữ nhân viên" : KT;
        if (z.c === "E1") E1s.push(r);
        return r;
      }),
      staff: []
    }));
    if (E1s.length === 1) E1s[0].e1 = "ca"; else E1s.forEach((r, i) => { r.e1 = i === E1s.length - 1 ? "hop" : "lam"; });
    // người trực
    const at = (c, t, sc, f) => { for (const [li, L] of levels.entries()) { const z = L.rooms.find(q => q.c === c); if (z && (f == null || f === li)) { L.staff.push({ x: z.r[0] + z.r[2] / 2, y: z.r[1] + z.r[3] / 2 + 1.2, t, sc }); return; } } };
    at("A1", "Lễ tân", ["1", "2", "3", "4"]); at("A4", "Thủ thư mượn trả, cổng từ", ["1", "3", "4"]); at("E3", "Bảo vệ", ["1", "2", "3", "4"]); at("A3", "Quầy cà phê", ["1", "2", "3", "4"]);
    at("B3", "Thủ thư thiếu nhi", ["1", "3"]); at("C2", "Nghiệp vụ", ["1", "3", "4"]); at("C4", "Nhận sách", ["4"]); at("D1", "Điều phối, âm thanh", ["2", "3"]); at("B5", "Hỗ trợ tra cứu", ["1", "3", "4"]); at("E1", "Văn phòng", ["1", "3", "4"]);
    { const L = levels[0], sk = L.rooms.filter(z => z.c === "circ" && z.ctl === "sk").sort((a, b) => b.r[2] * b.r[3] - a.r[2] * a.r[3])[0]; if (sk) L.staff.push({ x: sk.r[0] + sk.r[2] / 2, y: sk.r[1] + sk.r[3] / 2, t: "Đón khách sự kiện", sc: ["2", "3"] }); }
    // tổng mặt bằng
    const bikes = []; for (const y of [89.5, 93.5, 95.5, 100]) for (let x = 16.2; x + 0.8 <= 41.3; x += 0.8) bikes.push([x, y, 0.8, 2]);
    const gam = parks.map(p => { const n = Math.floor(p.w * p.h / 3); for (let y = p.y + 0.3; y + 2 <= p.y + p.h; y += 4.4) for (let x = p.x + 0.3; x + 0.8 <= p.x + p.w; x += 0.8) bikes.push([x, y, 0.8, 2]); return [p.x, p.y, p.w, p.h, n]; });
    const A1 = levels[0].rooms.find(z => z.c === "A1"), C4 = levels[0].rooms.find(z => z.c === "C4");
    const ds = A1 ? A1.d.filter(d => d[2] === "chinh").map(d => d[0]) : [];
    const ax = A1 ? A1.r[0] + A1.r[2] / 2 : 23, ayN = A1 ? A1.r[1] : 35, ayS = A1 ? A1.r[1] + A1.r[3] : 44;
    const lib = ds.includes("S") ? [[24, 92], [40.5, 92], [40.5, ayS + 2], [ax, ayS + 2], [ax, ayS]] : [[23, 96], [3.5, 96], [3.5, ayN - 4], [ax, ayN - 4], [ax, ayN]];
    const ev = ds.includes("N") ? [[15, 6], [3.5, 10], [3.5, ayN - 4], [ax, ayN - 4], [ax, ayN]] : [[15, 6], [40.5, 10], [40.5, ayS + 2], [ax, ayS + 2], [ax, ayS]];
    const plan = {
      id: opt.id || "auto", code: opt.code || "Tự xếp", name: opt.name || "Bản xếp khối", from: opt.from || "bản xếp của bạn", yN: () => -999, yS: () => -999, levels, auto: true,
      grid: { x: [...new Set(B.filter(b => b.f === 1).map(b => +b.x.toFixed(2)))].sort((a, b) => a - b).slice(0, 12), y: [...new Set(B.filter(b => b.f === 1).map(b => +b.y.toFixed(2)))].sort((a, b) => a - b).slice(0, 14) },
      site: {
        staff: [{ x: 9, y: 97, t: "Giữ xe (bãi Nam)", sc: ["1", "2", "3", "4"] }],
        park: { bikes, nBike: bikes.length, cars: [[8, 89.5, 3.5, 5.5, 1], [11.5, 89.5, 3.5, 5.5, 1]], racks: [[10.5, 100.6, 5, 2.4]], nRack: 10, booth: [6.4, 100.6, 3.2, 2.4], gam },
        routes: { delivery: [[[2.2, 112], [2.2, 104], [2.2, C4 ? C4.r[1] + C4.r[3] / 2 : 66], [6.1, C4 ? C4.r[1] + C4.r[3] / 2 : 66]]], fire: [[[-3, -12], [2.2, -4], [2.2, 102]], [[2.2, -2], [34, 7]]], moto: [[[3, 112], [3, 97], [9, 97], [40, 98.8]]], lib: [lib], event: [ev] },
        routeNames: { lib: ds.includes("S") ? "Người đọc: từ bãi xe đi dọc bờ sông, vào cửa Nam A1" : "Người đọc: từ bãi xe đi dọc lối Tây, vào cửa Bắc A1", event: ds.includes("N") ? "Khách sự kiện: từ quảng trường vòng lối Tây vào cửa Bắc A1" : "Khách sự kiện: từ quảng trường đi dọc bờ sông vào cửa Nam A1" },
        hatch: [], labels: []
      }
    };
    plan.idea = makeIdea(plan, blocks, opt);
    return plan;
  }
  function makeIdea(plan, blocks, opt) {
    const K = G.K; if (!K || !K.B) return null;
    const { B } = K, MAT = { A: "ribbon", B: "sheet", C: "deck", D: "gold", E: "stone" };
    return {
      id: plan.id, fam: "chot", code: plan.code, from: plan.from, name: plan.name, rule: "Theo đúng khối", tag: opt.tag || "", story: opt.tag || "", why: [], kc: { he: "Khung bê tông theo các khối", nhip: "", cx: "" }, qa: [], cut: "", roleOf: v => v.role || "p", floors: plan.levels.length, lab: [],
      planBrief() { return null; },
      build() {
        const v = [];
        plan.levels.forEach((L, li) => { const z0 = 0.45 + 4.5 * li, z1 = z0 + 4.5, up = plan.levels[li + 1] ? new Set(plan.levels[li + 1].rooms.filter(z => z.core).map(z => z.core.link)) : new Set();
          for (const z of L.rooms) { const [x, y, w, h] = z.r; if (z.core) { v.push(B(x, y, w, h, z0, up.has(z.core.link) ? z1 : z1 + 1.6, /l|b/.test(z.core.st) ? "violet" : "warn", "X", { top: "x", lv: 0 })); continue; } const k = (z.c || "")[0], m = MAT[k] || "glass"; v.push(B(x, y, w, h, z0, z1, m, MAT[k] ? k : "L", { fl: 1, role: k === "B" ? "m" : "p" })); } });
        return { v, st: [] };
      }
    };
  }
  G.P6AUTO = { autoPlan, touch, zoneOf };
  if (typeof module !== "undefined" && module.exports) module.exports = G.P6AUTO;
})();
