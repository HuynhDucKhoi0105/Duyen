const { IDEAS } = require("./t1_gen.js");
const J = require("./in_t1/u.json");
// Ý 3 · Giữ bản của bạn, sửa ít: hai cửa A1, bảo vệ ở cửa Nam, hiên có mái từ bãi xe, bãi xe máy phụ cạnh sảnh
{
  const L = J.blocks.filter(b => b.onSite && !b.draft).map(b => ({ ...b, id: "N3:" + b.id }));
  const e3 = L.find(b => b.c === "E3"); Object.assign(e3, { x: 25.09, y: 42.47, w: 3.5, h: 4.3, n: "Trực bảo vệ (ở cửa Nam A1, nhìn sân giữa và hiên từ bãi xe)" });
  const court = (id, n, x, y, w, h) => L.push({ id: "N3:1:" + id, c: "SAN", n, kind: "court", a: null, x, y, w, h, f: 1, top: false, onSite: true });
  court("xe", "Bãi xe máy phụ cạnh sảnh (~40 xe, vào từ lối Tây)", 6.1, 24.4, 8.5, 9.8);
  court("hien1", "Hiên có mái dọc bờ sông, từ bãi xe tới sân giữa", 38.6, 42.5, 2.9, 46.5);
  court("hien2", "Hiên có mái qua sân giữa tới cửa Nam A1", 28.6, 42.5, 10, 2.6);
  // bản hiện tại của bạn, để so
  const L0 = J.blocks.filter(b => b.onSite && !b.draft).map(b => ({ ...b, id: "N0:" + b.id }));
  IDEAS.push({ id: "N0", code: "Bản của bạn", name: "Tầng 1 hiện tại (file 09/11)", blocks: L0, door: [22, 34.25], onlyF: 1, base: true,
    routes: { park: [[23.75, 96], [4, 92], [4, 29], [20, 29], [22, 34.25]], parkNote: "đi dọc lối xe cứu hỏa, không có mái", plaza: [[23.75, 8], [4, 12], [4, 29], [20, 29], [22, 34.25]] } });
  IDEAS.push({ id: "N3", code: "Ý 3", name: "Giữ bản của bạn, sửa ít", blocks: L, door: [23.3, 42.45], door2: [22, 34.25], keep: true, onlyF: 1,
    routes: { park: [[40, 92], [40, 44], [23.3, 44], [23.3, 42.45]], parkNote: "có mái che suốt đường", plaza: [[23.75, 8], [4, 12], [4, 29], [20, 29], [22, 34.25]], bike: [[10.3, 29.3], [20, 30], [22, 34.25]] } });
}
