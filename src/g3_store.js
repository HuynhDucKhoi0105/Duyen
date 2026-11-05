
/* ================= Hướng thật của khu đất, ghim và phương án tự xếp ================= */
(function (G) {
  const LS = "arc329.";
  const rd = (k, d) => { try { const s = localStorage.getItem(LS + k); return s == null ? d : JSON.parse(s); } catch (e) { return d; } };
  const wr = (k, v) => { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) { /* trình duyệt chặn lưu: vẫn dùng được trong lần mở này */ } };

  // góc lệch: từ trục dọc khu đất (hướng về đầu Bắc, y = 0) tới hướng Bắc thật, theo chiều kim đồng hồ.
  // 20°: đường Bạch Đằng chạy Bắc lệch Tây, mặt sông nhìn về Đông Đông Bắc (70°)
  let north = rd("north", 20);
  window.ARC_NORTH = north;
  const rad = () => north * Math.PI / 180;
  G.north = () => north;
  G.setNorth = d => { north = Math.max(-45, Math.min(45, Math.round(d))); window.ARC_NORTH = north; wr("north", north); window.dispatchEvent(new CustomEvent("arc-north", { detail: north })); };
  // véc-tơ theo hướng thật (Đông, Bắc) → tọa độ khu đất (x về phía sông, y về đầu Nam)
  G.toSite = (E, N) => { const c = Math.cos(rad()), s = Math.sin(rad()); return [E * c + N * s, E * s - N * c]; };
  // hướng thật mà một hướng trên khu đất nhìn ra; a: 0 đầu Bắc, 90 mặt sông, 180 đầu Nam, 270 mặt Trần Phú
  G.bearing = a => ((a - north) % 360 + 360) % 360;
  const D16 = ["Bắc", "Bắc Đông Bắc", "Đông Bắc", "Đông Đông Bắc", "Đông", "Đông Đông Nam", "Đông Nam", "Nam Đông Nam", "Nam", "Nam Tây Nam", "Tây Nam", "Tây Tây Nam", "Tây", "Tây Tây Bắc", "Tây Bắc", "Bắc Tây Bắc"];
  G.dirName = b => D16[Math.round((((b % 360) + 360) % 360) / 22.5) % 16];
  G.faceDeg = k => G.bearing({ N: 0, E: 90, S: 180, W: 270 }[k]);

  // ghim và phương án tự xếp: lưu trên máy ngay, đồng bộ lên bảng dữ liệu của trang khi trang được mở trên claude.ai
  const mem = { pins: rd("pins", {}), mine: rd("mine", {}) };
  const subs = new Set(), emit = () => subs.forEach(f => { try { f(); } catch (e) { console.error(e); } });
  const key = k => String(k).replace(/[^A-Za-z0-9_\-~:@+]/g, "_");
  let db = null, live = false;
  const put = (path, v) => { if (db) db.doc(path).set(v).catch(() => {}); };
  const del = path => { if (db) db.doc(path).delete().catch(() => {}); };
  G.store = {
    on: f => { subs.add(f); return () => subs.delete(f); },
    live: () => live,
    pinned: k => !!mem.pins[k],
    pins: () => Object.keys(mem.pins),
    togglePin(k, name) {
      const on = !mem.pins[k];
      if (on) { mem.pins[k] = { k, name: name || "", at: Date.now() }; put("pins/" + key(k), mem.pins[k]); }
      else { delete mem.pins[k]; del("pins/" + key(k)); }
      wr("pins", mem.pins); emit(); return on;
    },
    mine: tab => Object.values(mem.mine).filter(r => !tab || r.tab === tab).sort((a, b) => a.at - b.at),
    get: id => mem.mine[id],
    saveMine(r) { mem.mine[r.id] = r; wr("mine", mem.mine); put("mine/" + key(r.id), r); emit(); },
    delMine(id) { delete mem.mine[id]; wr("mine", mem.mine); del("mine/" + key(id)); emit(); }
  };
  (async () => {
    if (!window.claude || typeof window.claude.use !== "function") return;
    let h = null;
    try { h = await window.claude.use("db"); } catch (e) { h = null; }
    if (!h) return;
    db = h;
    const sync = (name, toMem) => {
      let first = true;
      db.collection(name).onSnapshot(snap => {
        const got = {};
        for (const d of snap.docs) { const x = d.data(); if (x) got[d.id] = x; }
        if (first) { // lần đầu: đưa những gì đã lưu trên máy này lên
          first = false;
          for (const v of Object.values(mem[name])) { const id = key(name === "pins" ? v.k : v.id); if (!got[id]) { got[id] = v; put(name + "/" + id, v); } }
        }
        mem[name] = toMem(got); live = true; wr(name, mem[name]); emit();
      }, () => { /* không đọc được: giữ bản trên máy */ });
    };
    sync("pins", got => Object.fromEntries(Object.values(got).filter(v => v && v.k).map(v => [v.k, v])));
    sync("mine", got => Object.fromEntries(Object.values(got).filter(v => v && v.id).map(v => [v.id, v])));
  })();
})(window.G3);
