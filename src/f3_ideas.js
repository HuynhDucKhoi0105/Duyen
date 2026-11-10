/* ================= Final 3: bản xếp 10/11 của bạn và 5 ý tưởng giữ nguyên lý xếp =================
   Mọi ý tưởng giữ cách xếp của bạn: cụm sự kiện ở đầu Bắc, dải kho nghiệp vụ dọc lối Tây, sân giữa, dải thiếu nhi
   và văn phòng phía Nam, khu đọc chồng lên dải Tây và dải Nam. Chỉ dời, đổi cỡ vài khối; giao thông ≤ 780 m². */
(function () {
  const G = (typeof window !== "undefined") ? (window.G3 = window.G3 || {}) : {};
  const cp = o => JSON.parse(JSON.stringify(o));
  function edit(base) {
    const L = cp(base);
    const get = id => { const b = L.find(q => q.id === id); if (!b) throw new Error("không có khối " + id); return b; };
    const api = {
      L, get,
      set: (id, o) => Object.assign(get(id), o),
      del: id => { const i = L.findIndex(q => q.id === id); if (i >= 0) L.splice(i, 1); },
      add: b => L.push({ onSite: true, top: false, a: b.kind === "room" ? +(b.w * b.h).toFixed(2) : null, ...b })
    };
    return api;
  }
  // bộ sửa chung cho cả 5 ý tưởng
  function common(e) {
    // 1. Quầy A4 lên sát sảnh A1: khách đi xuyên qua A4 (cổng từ), thang Bắc mở từ trong quầy, không còn lối lên khu đọc trước quầy
    e.set("F.2d:1:A4", { x: 14.59, y: 41.98, w: 5.5, h: 5.454, top: false });
    e.set("F.2d:1:LC", { x: 14.59, y: 47.434, w: 5.5, h: 6.006, n: "Sảnh thư viện sau cổng từ" });
    e.add({ id: "F3:1:gieng", c: "SAN", n: "Giếng trời (chỗ quầy A4 cũ)", kind: "court", x: 14.59, y: 53.44, w: 3.25, h: 9.231, f: 1 });
    // 2. Tầng 3: lõi thang thẳng lõi tầng 2
    e.set("F.2d:3:CS3", { x: 6.087, y: 35.78, w: 8.5, h: 4 });
    e.set("F.2d:3:STE3", { y: 35.78 });
    e.set("F.2d:3:B1n6", { y: 35.78 });
    e.set("F.2d:3:B1f", { y: 39.78 });
    e.set("circ·lcv81", { x: 14.59, y: 41.98, w: 2.4, h: 20.36, n: "Hành lang đọc tầng 3" });
    // 3. Bớt hành lang: bỏ hành lang học nhóm đôi ở tầng 2 (dãy học nhóm dời sát hành lang đọc), vệ sinh tầng 2 lên đầu dãy làm vùng đệm, thu sảnh thang Tây Nam
    e.del("F.2d:2:HQ");
    e.set("F.2d:2:WCL2", { x: 8.11, y: 50.71 });
    [["F.2d:2:B4b", 53.741], ["F.2d:2:B4c", 57.551], ["F.2d:2:B4a", 61.361], ["F.2d:2:B4d", 65.171]].forEach(([id, y]) => e.set(id, { x: 8.11, y }));
    e.set("F.2d:2:HQt", { h: 2.74 });
    e.del("F.2d:2:H9r"); e.del("F.2d:2:WCL1");
    // 4. Nối B2, vệ sinh tầng 3, thang thoát hiểm Đông Nam 3 tầng
    e.add({ id: "F3:3:link", c: "circ", n: "Hành lang nối đọc yên tĩnh", kind: "circ", x: 14.59, y: 62.34, w: 2.25, h: 13.71, f: 3 });
    e.add({ id: "F3:3:WC3", c: "E5", n: "Vệ sinh tầng 3 (có KT)", kind: "room", x: 10.59, y: 61.165, w: 4, h: 3, f: 3 });
    for (const f of [1, 2, 3]) e.add({ id: `F3:${f}:STE`, c: "core", n: "Thang thoát hiểm Đông Nam (chỉ khi khẩn cấp)", kind: "stair", x: 34.5, y: 76.05, w: 3.6, h: 4.21, f });
    return e;
  }
  const IDEAS = [
    { key: "base", code: "F.3", name: "Bản của bạn (10/11), giữ 100%", tag: "Đúng từng khối trong file", mods: null,
      text: "Giữ nguyên mọi khối. Cửa do mình tự đặt theo luật (chỗ các khối chạm nhau; hành lang trước cổng từ chỉ mở sang A1 và A4). Lỗi liệt kê bên dưới là của cách xếp, không phải do thiếu cửa." },
    { key: "y1", code: "F.3-1", name: "Nối dải Tây: chữ L ba tầng", tag: "Giữ khối tầng 3 như bạn, chỉ nối B2 và sửa chung",
      text: "Tầng 3 giữ đúng hai cụm của bạn (cụm Bắc trên lõi thang, đọc yên tĩnh B2 ở Nam). Hành lang đọc tầng 3 kéo xuống tới B2 dọc mép trong dải Tây, nên tầng 3 thành chữ L ôm sân giữa giống tầng 2. Thang Đông Nam cho B2 lối thoát thứ hai; vệ sinh tầng 3 đặt chồng lên vệ sinh tầng 2.",
      mods: e => common(e) },
    { key: "y2", code: "F.3-2", name: "Hai đầu cao, giữa thấp", tag: "Tra cứu số B5 lên mặt Bắc tầng 2; tầng 3 có hộp đọc trước và B2 sau",
      text: "Tra cứu số B5 (đang là dải 3,85 × 23 m, chỉ xếp được 9/16 chỗ) dời lên mặt Bắc tầng 2, ngay trên A1, A2, nhìn ra quảng trường. Bàn đọc dải giữa tầng 3 dời lên trên B5 thành hộp đọc mặt trước. Mặt Bắc cao 3 tầng (A1, A2 → B6, B5 → hộp đọc), mặt Nam cao 3 tầng (B3 → B1w → B2); giữa sân là phần thấp. Hai đầu nối bằng hành lang đọc tầng 3 dọc dải Tây.",
      mods: e => { common(e); e.set("F.2d:2:B5", { x: 26.24, y: 35.78, w: 10.6, h: 8.5, a: 90.1 }); e.set("F.2d:3:B1f", { x: 6.07, y: 39.78, w: 8.52, h: 6.9, a: 58.8, n: "Bàn đọc cá nhân (Tây Bắc)" }); e.add({ id: "F3:3:B1front", c: "B1", n: "Hộp đọc mặt trước (nhìn quảng trường)", kind: "room", x: 26.41, y: 35.78, w: 10.43, h: 8.5, f: 3, top: true }); } },
    { key: "y3", code: "F.3-3", name: "Khung lam nối tầng 3, sân thượng đọc", tag: "Giữ khối như F.3-1, thêm khung lam và sân thượng đọc thay cho khối đặc",
      text: "Đề giới hạn 3.000 m² nên tầng 3 không thể đầy khối. Thay vào đó, các mái tầng 2 còn trống (trên tra cứu số, trên đọc linh hoạt B6, đầu Đông của đọc mở B1w) làm sân thượng đọc ngoài trời có khung lam bê tông cao bằng tầng 3. Nhìn từ ngoài, tầng 3 là một khối liền chữ U (phần đặc là phòng, phần rỗng là khung lam), không tính vào diện tích sàn.",
      mods: e => { common(e); e.add({ id: "F3:3:frameA", c: "LAM", n: "Khung lam, sân thượng đọc (trên tra cứu số)", kind: "frame", x: 16.99, y: 43.93, w: 3.13, h: 23.62, f: 3 }); e.add({ id: "F3:3:frameB", c: "LAM", n: "Khung lam, sân thượng đọc (mặt Bắc)", kind: "frame", x: 26.41, y: 35.78, w: 10.43, h: 8.5, f: 3 }); e.add({ id: "F3:3:frameC", c: "LAM", n: "Khung lam trên vệ sinh, học nhóm", kind: "frame", x: 8.11, y: 50.71, w: 2.48, h: 18.27, f: 3 }); } },
    { key: "y4", code: "F.3-4", name: "So le chong chóng, hộp đua ra sông", tag: "Hộp đọc tầng 3 dời về góc Đông Bắc, đua 4 m ra phía sông",
      text: "Như F.3-2 nhưng hộp đọc tầng 3 không nằm trên lõi thang mà dời hẳn về góc Đông Bắc, đua 4 m ra phía sông. Ba khối tầng 3 (dải Tây, hộp Đông Bắc, B2 phía Nam) xoay quanh sân giữa như cánh chong chóng: lệch, không đối xứng, mỗi mặt nhà một chiều cao khác nhau. Đua đúng 4 m nên không cần cột thêm.",
      mods: e => { common(e); e.set("F.2d:2:B5", { x: 26.24, y: 35.78, w: 10.6, h: 8.5, a: 90.1 }); e.del("F.2d:3:B1n6"); e.set("F.2d:3:B1f", { x: 6.07, y: 39.78, w: 8.52, h: 12.9, a: 109.9 }); e.add({ id: "F3:3:B1ne", c: "B1", n: "Hộp đọc Đông Bắc (đua ra phía sông)", kind: "room", x: 30.24, y: 35.78, w: 10.6, h: 8.5, f: 3, top: true }); e.add({ id: "F3:3:bridge", c: "circ", n: "Cầu đọc tới hộp Đông Bắc", kind: "circ", x: 20.09, y: 35.78, w: 10.15, h: 2.4, f: 3 }); } },
    { key: "y5", code: "F.3-5", name: "Lưng cao, mặt tiền thấp", tag: "Dồn tầng 3 về phía Nam (trên văn phòng), mặt Bắc chỉ còn lõi thang nhô cao",
      text: "Mặt Bắc nhìn ra quảng trường giữ 2 tầng (mái tầng 2 làm vườn), chỉ hai lõi thang nhô lên như hai cột mốc. Khối đọc tầng 3 dồn về phía Nam thành một khối lớn (B2 + đọc mở trên dải văn phòng), quay mặt về bãi xe và đón nắng Nam có ô văng. Dải Tây tầng 3 chỉ còn hành lang nối lõi thang với khối Nam.",
      mods: e => { common(e); e.del("F.2d:3:B1n6"); e.del("F.2d:3:B1f"); e.add({ id: "F3:3:B1back", c: "B1", n: "Đọc mở và kệ (khối Nam, trên văn phòng)", kind: "room", x: 14.59, y: 76.05, w: 19.91, h: 9.93, f: 3, top: true }); e.set("F3:3:WC3", { x: 12.59, y: 61.165, w: 2, h: 6 }); } }
  ];
  function build(base) {
    return IDEAS.map(I => {
      let blocks = cp(base);
      if (I.mods) { const e = edit(base); I.mods(e); blocks = e.L; }
      return { ...I, blocks };
    });
  }
  const api = { IDEAS, build, edit, common };
  G.F3IDEAS = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
