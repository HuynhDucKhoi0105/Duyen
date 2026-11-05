
/* ================= 20 ý tưởng 3D: dữ liệu khối ================= */
/* Tọa độ khu đất: x Tây→Đông (0–41,5), y Bắc→Nam (0–104), z cao độ (nền ±0.000, sàn tầng 1 +0.45) */
window.G3 = (function () {
  const B = (x, y, w, d, z1, z2, c, zone, o = {}) => ({ k: "box", x, y, w, d, z1, z2, c, zone, ...o });
  const SH = (x, y, w, d, z1, zlo, zhi, dir, c, zone, o = {}) => ({ k: "shed", x, y, w, d, z1, zlo, zhi, dir, c, zone, ...o });
  const G = (x, y, w, d, z1, z2, c, ax, o = {}) => ({ k: "gable", x, y, w, d, z1, z2, c, ax, zone: "X", ...o });
  const H = (x, y, w, d, z1, z2, c, o = {}) => ({ k: "hip", x, y, w, d, z1, z2, c, zone: "X", ...o });
  const FR = (x, y, w, d, z1, z2, s, c, o = {}) => ({ k: "frustum", x, y, w, d, z1, z2, s, c, zone: "X", ...o });
  const V = (x, y, w, d, zs, rise, ax, c, o = {}) => ({ k: "vault", x, y, w, d, z1: zs, z2: zs + rise, rise, ax, c, zone: "X", ...o });
  const PO = (pts, z1, zt, c, zone, o = {}) => ({ k: "poly", pts, z1, zt, c, zone, ...o });
  const LO = (bot, top, z1, z2, c, zone, o = {}) => ({ k: "loft", bot, topPts: top, z1, z2, c, zone, ...o });
  const S3 = (pts3, t, c, zone = "X", o = {}) => ({ k: "slab", pts3, t, c, zone, ...o });
  const AR = (x0, y1, y2, z1, z2, depth, ops, c, o = {}) => ({ k: "arcade", x0, y1, y2, z1, z2, depth, ops, c, zone: "X", ...o });
  const LN = (segs, c = "ink", o = {}) => ({ k: "lines", segs, c, zone: "X", ...o });
  // kết cấu
  const col = (x, y, z1, z2) => ({ t: "col", x, y, z1, z2 });
  const wall = (x, y, w, d, z1, z2) => ({ t: "wall", x, y, w, d, z1, z2 });
  const seg = (a, b) => ({ t: "seg", a, b });
  const grid = (xs, ys, z1, z2, ok = () => true) => { const o = []; for (const x of xs) for (const y of ys) if (ok(x, y)) o.push(col(x, y, z1, typeof z2 === "function" ? z2(x, y) : z2)); return o; };
  const range = (a, b, s) => { const o = []; for (let v = a; v <= b + 1e-6; v += s) o.push(+v.toFixed(3)); return o; };
  const zig = (x1, y1, x2, y2, zb, zt, n) => { const o = [seg([x1, y1, zb], [x2, y2, zb]), seg([x1, y1, zt], [x2, y2, zt])]; for (let i = 0; i < n; i++) { const t0 = i / n, t1 = (i + 1) / n, P = (t, z) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, z]; o.push(seg(P(t0, i % 2 ? zt : zb), P(t1, i % 2 ? zb : zt))); } return o; };
  const inPoly = (pts, x, y) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const COV = ["warn", "gold", "accent", "violet", "ribbon", "accessC", "deck"];

  const I = [];

  /* ---------- 10 ý tưởng mới ---------- */
  I.push({
    id: "rangcua", name: "Kho sách mái răng cưa", nw: 1, tag: "Kho hàng bến cảng sông Hàn",
    story: "Bờ Bạch Đằng xưa là cảng sông Hàn, dọc bờ là những dãy kho hàng. Phương án mượn hình ảnh nhà kho công nghiệp mái răng cưa: tầng 1 là đế gạch, tầng 2 là một xưởng đọc sách dài 56 m không có cột, phủ 7 răng mái. Mỗi răng có một dải kính đứng quay về hướng Bắc, đón ánh sáng tán xạ đều, không có nắng chiếu thẳng lên bàn đọc. Trên quảng trường, hai khung cẩu thép đỏ làm cổng vào.",
    why: [["Ý nghĩa", "Gợi lịch sử bến cảng của chính con đường Bạch Đằng. Hình mái răng cưa là hình ảnh công nghiệp dễ nhận ra từ bờ sông bên kia."], ["Ánh sáng", "Cửa mái hướng Bắc là kiểu lấy sáng tốt nhất cho phòng đọc: sáng đều cả ngày, không chói, đúng yêu cầu chống chói ở đề mục 5.5."], ["Không gian", "Vì kèo thép nhịp 24 m nên tầng 2 là một phòng đọc liền khối 24 × 56 m không có cột, xếp kệ và bàn tự do."], ["Mô hình", "Đế là hộp, mỗi răng mái là một khối vát chéo một nhát dao. 7 răng giống hệt nhau."]],
    kc: { he: "Tầng 1: khung bê tông lưới 8 × 8 m. Tầng 2: cột thép ở hai mép dọc, vì kèo thép tam giác nhịp 24 m đặt cách nhau 8 m, mỗi vì kèo là một răng mái.", nhip: "24 m (vì kèo thép)", cx: "Không có phần đua lớn" },
    qa: [["Mái răng cưa có dột ở khe?", "Máng xối inox đặt ở chân mỗi răng, độ dốc 1–2% thoát về hai đầu nhà. Kính đứng nên nước không đọng trên kính."], ["Nhịp 24 m có tốn kém?", "Vì kèo thép tam giác cao 3 m nhịp 24 m là kết cấu nhà xưởng rất phổ biến, rẻ và thi công nhanh."]],
    cut: "Đế: 4 hộp foam. Tầng 2: hộp foam 12 × 28 × 2,25 cm. Răng mái: 7 khối 12 × 4 cm, cao 1,5 cm ở một mép và 0 ở mép kia (cắt chéo). Dán dải mica 1,5 cm ở mặt đứng của mỗi răng. Khung cẩu: que tre sơn đỏ.",
    build() {
      const v = [B(6, 14, 24, 16, 0.45, 4.95, "ribbon", "D", { ribs: 1 }), B(6, 30, 24, 16, 0.45, 4.95, "ribbon", "A", { ribs: 1 }), B(6, 46, 10, 17, 0.45, 4.95, "ribbon", "C", { ribs: 1 }), B(6, 63, 10, 17, 0.45, 4.95, "ribbon", "E", { ribs: 1 }), B(16, 46, 14, 34, 0.45, 4.95, "ribbon", "B", { ribs: 1 }), B(6, 22, 24, 56, 4.95, 9.45, "blkTop", "B", { ribs: 1.5 })];
      for (let k = 0; k < 7; k++) { const y = 22 + 8 * k; v.push(SH(6, y, 24, 8, 9.45, 9.75, 12.45, "-y", "zE", "X")); v.push(B(6.4, y - 0.12, 23.2, 0.16, 9.75, 12.3, "glass", "X", { op: 0.75 })); }
      for (const [x, y] of [[31.5, 33], [31.5, 41], [39.5, 33], [39.5, 41]]) v.push(B(x, y, 0.7, 0.7, 0, 11, "warn", "X"));
      v.push(B(31.5, 33, 8.7, 0.7, 10.2, 11, "warn", "X", { lv: 0 }), B(31.5, 41, 8.7, 0.7, 10.2, 11, "warn", "X", { lv: 0 }), B(35.4, 33, 0.8, 8.7, 10.2, 11, "warn", "X", { lv: 0 }));
      const st = [...grid([6, 14, 22, 30], [14, 22, 30, 38, 46, 54, 62, 70, 80], 0.45, 4.95), ...grid([6, 30], range(22, 78, 8), 4.95, 9.45)];
      for (const y of range(22, 78, 8)) st.push(...zig(6, y, 30, y, 9.45, 12.3, 8));
      return { v, st, labels: [[18, 50, 12.6, "Khối chính · Xưởng đọc mái răng cưa", 1], [18, 30, 12.2, "Kính mái hướng Bắc"], [35.5, 37, 11, "Cổng cẩu"], [30, 70, 2.5, "Đế gạch tầng 1"]] };
    }
  });

  I.push({
    id: "chop", name: "Làng mái chóp", nw: 1, tag: "Mái làng, nón lá, nhịp 12 m",
    story: "Công trình là 11 ngôi nhà vuông 12 × 12 m xếp thành hai hàng, mỗi nhà có một mái chóp bốn dốc, đỉnh có ô kính lấy sáng. Nhịp mái chóp lặp lại gợi những mái nhà làng và vành nón lá. Ô thứ 12 để trống làm sân giữa làng. Mỗi nhà một chức năng, một hoặc hai tầng.",
    why: [["Ý nghĩa", "Nhịp mái chóp lặp lại là hình ảnh làng quê quen thuộc, vừa gợi nón lá, vừa là ngôn ngữ hiện đại. Từ bờ sông nhìn vào thấy một \"ngôi làng sách\"."], ["Không gian", "Mỗi nhà là một phòng vuông 144 m² không cột, trần cao dần lên đỉnh chóp, ánh sáng rơi từ ô kính đỉnh xuống giữa phòng."], ["Khí hậu", "Mái dốc thoát mưa nhanh, khoảng trống dưới chóp là đệm nhiệt. Ô kính đỉnh có thể mở để thoát khí nóng (hiệu ứng ống khói)."], ["Mô hình", "Chỉ hai loại chi tiết: hộp vuông và chóp vuông. Cắt 11 chóp giống nhau."]],
    kc: { he: "Cột bê tông ở 4 góc mỗi nhà theo lưới 12 × 12 m. Dầm biên 12 m. Mái chóp bằng 4 vì kèo chéo gặp nhau ở đỉnh, đỡ vòng đỉnh có ô kính.", nhip: "12 m", cx: "Mái đua 0,6 m" },
    qa: [["Phòng đa năng 180 m² có vừa một nhà?", "Phòng đa năng chiếm hai nhà liền nhau ở hàng đầu, nối bằng một dầm thép 12 m, được khoảng 250 m² cho phòng đa năng và kho, phòng chuẩn bị. Phòng còn lại của nhóm D đặt ở nhà sảnh bên cạnh."], ["Nhiều mái chóp có tốn kém chống thấm?", "Khe giữa các nhà có máng chung. Mái lợp tôn sóng giả ngói hoặc ngói phẳng, chi tiết lặp lại nên thi công nhanh."]],
    cut: "11 hộp foam 5,6 × 5,6 cm (cao 2,25 hoặc 4,5 cm). 11 chóp: cắt 4 tam giác bìa đáy 6,3 cm, cao 2,4 cm, dán thành chóp. Ô kính đỉnh: khối mica 1 × 1 cm.",
    build() {
      const v = [], st = [];
      const spec = { "0,0": ["D", 1], "1,0": ["D", 1], "0,1": ["A", 1], "1,1": ["A", 2], "0,2": ["B", 2], "0,3": ["B", 2], "1,3": ["B", 2], "0,4": ["C", 2], "1,4": ["B", 2], "0,5": ["E", 2], "1,5": ["B", 2] };
      for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) {
        const s = spec[`${c},${r}`]; if (!s) continue;
        const x = 6 + c * 12, y = 14 + r * 12, top = 0.45 + 4.5 * s[1];
        v.push(B(x + 0.4, y + 0.4, 11.2, 11.2, 0.45, top, s[1] === 1 ? "glass" : "sheet", s[0], { ribs: 1.4, op: s[1] === 1 ? 0.85 : 1 }));
        v.push(FR(x - 0.3, y - 0.3, 12.6, 12.6, top, top + 4.8, 0.16, c + r & 1 ? "deck" : "warn"));
        v.push(B(x + 5, y + 5, 2, 2, top + 4.8, top + 5.8, "lamp", "X"));
        for (const [cx, cy] of [[x + 0.4, y + 0.4], [x + 11.6, y + 0.4], [x + 0.4, y + 11.6], [x + 11.6, y + 11.6]]) { st.push(col(cx, cy, 0.45, top)); st.push(seg([cx, cy, top], [x + 6, y + 6, top + 4.8])); }
      }
      return { v, st, labels: [[18, 50, 14.5, "Khối chính · 11 mái chóp", 1], [12, 56, 15.3, "Ô kính đỉnh chóp"], [24, 44, 0.5, "Sân giữa làng"], [18, 20, 6, "Nhà sự kiện (2 ô)"]] };
    }
  });

  I.push({
    id: "vom", name: "Vòm cuốn trang sách", nw: 1, tag: "Tám vòm như những trang sách cuộn",
    story: "Mái công trình là tám vòm cuốn bê tông chạy theo hướng Đông–Tây, mỗi vòm rộng 7,5 m. Đầu mỗi vòm hướng ra sông là một ô kính bán nguyệt. Nhìn từ bờ sông thấy một dãy tám vòm nối nhau như những trang sách đang cuộn lại, hoặc như những con sóng nhỏ. Bên dưới là hai tầng thư viện. Riêng phòng đa năng ở đầu Bắc cao hai tầng, trần chính là lòng vòm.",
    why: [["Ý nghĩa", "Trang sách cuộn, sóng sông Hàn. Vòm cuốn còn là ngôn ngữ của các công trình thời Pháp trên đường Bạch Đằng."], ["Ánh sáng", "Trần vòm phản xạ ánh sáng từ ô kính bán nguyệt vào sâu trong phòng, ánh sáng mềm và đều."], ["Kết cấu", "Vòm làm việc chịu nén, nhịp 7,5 m rất nhẹ nhàng, không cần dầm cao. Đây là kết cấu đẹp nhất khi để lộ."], ["Mô hình", "Mỗi vòm là một tấm bìa uốn cong dán lên hai mặt đầu bán nguyệt. Tám vòm giống hệt nhau."]],
    kc: { he: "Khung bê tông lưới 12 × 7,5 m (cột ở x = 6, 18, 30 m). Dầm chạy Đông–Tây theo mỗi chân vòm. Vòm vỏ mỏng bê tông nhịp 7,5 m tựa lên các dầm này.", nhip: "7,5 m (vòm), 12 m (sàn). Riêng phòng đa năng dùng dầm thép 24 m thay cột giữa", cx: "Không" },
    qa: [["Vòm có làm khó lắp kỹ thuật điều hòa?", "Ống kỹ thuật đi trong rãnh giữa hai vòm (khe dầm), không treo dưới vòm. Lòng vòm để trần trần."], ["Mưa đọng ở khe giữa các vòm?", "Khe giữa hai vòm là máng thu nước dốc về phía Tây, ống đứng đi trong cột."]],
    cut: "Đế: 4 hộp foam cao 4,5 cm. Vòm: 8 tấm bìa 1 mm 12 × 6 cm uốn bán nguyệt bán kính 1,9 cm, dán lên 16 hình bán nguyệt bìa cứng làm mặt đầu. Mặt đầu phía Đông dùng mica.",
    build() {
      const v = [B(6, 18, 24, 12, 0.45, 9.45, "sheet", "D", { fl: 1, ribs: 3 }), B(6, 30, 14, 12, 0.45, 9.45, "sheet", "A", { bands: [4.95], ribs: 3 }), B(20, 30, 10, 12, 0.45, 9.45, "sheet", "E", { bands: [4.95], ribs: 3 }), B(12, 42, 18, 36, 0.45, 9.45, "sheet", "B", { bands: [4.95], ribs: 3 }), B(6, 42, 6, 36, 0.45, 9.45, "sheet", "C", { bands: [4.95], ribs: 3 })];
      for (let k = 0; k < 8; k++) { const y = 18 + 7.5 * k; v.push(V(6, y, 23.6, 7.5, 9.45, 3.75, "x", "blkTop")); v.push(V(29.6, y, 0.4, 7.5, 9.45, 3.75, "x", "glass", { op: 0.8 })); }
      const st = grid([6, 18, 30], range(18, 78, 7.5), 0.45, 9.45, (x, y) => !(x === 18 && y > 18 && y < 30));
      st.push(seg([6, 25.5, 9.2], [30, 25.5, 9.2]));
      return { v, st, labels: [[18, 48, 13.3, "Khối chính · 8 vòm cuốn", 1], [30, 63, 11.5, "Ô kính bán nguyệt nhìn sông"], [18, 24, 6, "Phòng đa năng trần vòm"], [30, 70, 3, "Thân nhà 2 tầng"]] };
    }
  });

  I.push({
    id: "ruong", name: "Mái rường", nw: 1, tag: "Một mái lớn bốn dốc kiểu nhà rường Huế",
    story: "Kiến trúc truyền thống Việt Nam lấy mái làm chính: mái to, dốc, vươn xa, thân nhà lùi vào trong bóng mái. Phương án làm đúng như vậy ở quy mô lớn: một mái ngói bốn dốc 32 × 70 m cao gần 10 m phủ lên một thân nhà kính hai tầng, mái đua ra 5 m ở bốn phía thành một hiên lớn bao quanh. Dưới mái là gác đọc sách trên cùng, ánh sáng vào qua khe giữa mái và thân nhà.",
    why: [["Ý nghĩa", "Mái nhà rường Huế, mái đình làng là hình ảnh đặc trưng nhất của kiến trúc Việt. Nhìn từ xa là nhận ra ngay một công trình văn hóa Việt Nam."], ["Khí hậu", "Mái đua 5 m che toàn bộ mặt kính khỏi nắng và mưa tạt. Khoảng không dưới mái là đệm nhiệt, thông gió tự nhiên qua đỉnh hồi."], ["Đời sống", "Hiên rộng 5 m bao quanh nhà là nơi ngồi đọc, uống cà phê, chờ sự kiện, có bóng mát cả ngày."], ["Mô hình", "Chỉ hai chi tiết: một hộp thân nhà và một khối mái bốn dốc (cắt 2 hình thang + 2 tam giác)."]],
    kc: { he: "Thân nhà khung bê tông, cột ở mép x = 8 và 30 m cách nhau 7 m, thêm một hàng cột giữa ở tầng 1. Mái là các vì kèo thép hoặc gỗ ghép nhịp 22 m đặt cách 7 m, tựa trên hai hàng cột mép.", nhip: "22 m (vì kèo mái), 11 m (sàn tầng 2)", cx: "Mái đua 5 m bằng kèo công xôn" },
    qa: [["Mái to như vậy có đè nặng, bí bách?", "Khe 0,5 m giữa mái và tường kính cho ánh sáng và gió đi qua, mái như đang nổi. Gác mái có cửa trời ở đỉnh."], ["Có bị coi là giả cổ?", "Không dùng chi tiết cổ (đầu đao, hoa văn). Chỉ giữ tỷ lệ mái lớn, dốc 30° và hiên sâu, vật liệu là ngói phẳng và kính hiện đại."]],
    cut: "Thân nhà: hộp mica 11 × 28 × 4,5 cm. Mái: cắt 2 hình thang (đáy 35 cm) và 2 tam giác (đáy 16 cm) bìa 2 mm, dán thành mái bốn dốc cao 4,75 cm. Không dán chết mái để nhấc ra xem gác.",
    build() {
      const v = [B(8, 20, 22, 12, 0.45, 9.45, "glass", "D", { fl: 1, ribs: 2.4 }), B(8, 32, 22, 12, 0.45, 9.45, "glass", "A", { bands: [4.95], ribs: 2.4 }), B(14, 44, 16, 32, 0.45, 9.45, "glass", "B", { bands: [4.95], ribs: 2.4 }), B(8, 44, 6, 16, 0.45, 9.45, "sheet", "C", { bands: [4.95] }), B(8, 60, 6, 16, 0.45, 9.45, "sheet", "E", { bands: [4.95] }), B(12, 30, 14, 36, 9.95, 12.5, "deck", "B", { hideSolid: 1 }), H(3, 13, 32, 70, 9.95, 19.45, "warn")];
      const zr = y => 9.95 + 9.5 * Math.min(1, Math.min(y - 13, 83 - y) / 16);
      const st = [...grid([8, 30], range(20, 76, 7), 0.45, 9.95), ...grid([19], range(20, 76, 7), 0.45, 4.95)];
      for (const y of range(20, 76, 7)) { const zt = zr(y); st.push(seg([3, y, 9.95], [19, y, zt]), seg([19, y, zt], [35, y, 9.95]), seg([3, y, 9.95], [35, y, 9.95]), seg([19, y, 9.95], [19, y, zt])); }
      return { v, st, labels: [[19, 48, 17, "Khối chính · Mái rường 4 dốc", 1], [34, 60, 9.6, "Hiên sâu 5 m"], [30, 38, 4, "Thân kính 2 tầng"], [19, 48, 11.5, "Gác đọc dưới mái"]] };
    }
  });

  I.push({
    id: "guol", name: "Gươl và nhà sàn", nw: 1, tag: "Nhà sàn đọc sách và nhà Gươl của người Cơ Tu",
    story: "Người Cơ Tu ở vùng núi phía Tây Đà Nẵng có nhà Gươl, ngôi nhà chung mái cao vút nơi cả làng tụ họp. Phương án dùng hai hình ảnh: phòng đa năng là một nhà Gươl mái chóp cao 19 m ở đầu Bắc; khu đọc là một nhà sàn dài 54 m nâng trên hàng cột, gầm sàn là sân chơi, chỗ đọc ngoài trời có bóng mát. Một cầu thang lớn dẫn từ quảng trường lên sàn.",
    why: [["Ý nghĩa", "Gươl là trung tâm văn hóa của làng Cơ Tu, đúng vai trò của một trung tâm văn hóa – thư viện. Nhà sàn là kiến trúc bản địa của nhiều dân tộc miền Trung."], ["Khu đất", "Gầm sàn rộng 1.400 m² có mái che là quảng trường công cộng nối liền với bậc thang Bạch Đằng, người dân ghé vào mà chưa cần bước vào thư viện."], ["Khí hậu", "Sàn nâng cao thông gió dưới gầm, chống ẩm cho sách. Mái dốc và hiên che nắng mưa."], ["Kết cấu rõ ràng", "Hàng cột của nhà sàn chính là kết cấu, lộ ra ngoài một cách trung thực, không phải giấu."]],
    kc: { he: "Nhà sàn: lưới cột 8,7 × 9 m (4 hàng cột dọc), cột chạy từ đất lên mái. Gươl: 4 cột lớn giữa nhà đỡ mái chóp, tường bao nhẹ.", nhip: "8,7 × 9 m", cx: "Hiên 1 m" },
    qa: [["Gầm sàn bỏ trống có phí diện tích?", "Gầm sàn là không gian ngoài trời, không tính vào 3.000 m². Hai hộp kính ở gầm chứa sảnh, cà phê và khu thiếu nhi."], ["Người đi xe lăn lên sàn thế nào?", "Thang máy đặt trong hộp kính sảnh. Cầu thang lớn là lối đi bộ chính, có thêm dốc dọc mặt Tây."]],
    cut: "Cột: que gỗ vuông 3 mm, cao 4,5–7 cm, cắm theo lưới 4,35 × 4,5 cm. Sàn: tấm foam 13 × 27 cm. Mái: lăng trụ tam giác. Gươl: hộp 8 × 8 cm + chóp cao 7 cm.",
    build() {
      const v = [B(10, 6, 16, 16, 0.45, 5, "deck", "D", { ribs: 0.8 }), H(8.5, 4.5, 19, 19, 5, 19, "warn"),
        B(6, 30, 26, 18, 4.95, 9.45, "deck", "B", { ribs: 0.9 }), B(6, 48, 26, 18, 4.95, 9.45, "deck", "B", { ribs: 0.9 }), B(6, 66, 10, 18, 4.95, 9.45, "deck", "C", { ribs: 0.9 }), B(16, 66, 16, 18, 4.95, 9.45, "deck", "E", { ribs: 0.9 }),
        B(8, 38, 22, 38, 9.45, 13.95, "deck", "B", { ribs: 0.9 }), G(7, 37, 24, 40, 13.95, 18, "warn", "y"),
        B(10, 34, 16, 14, 0.45, 4.45, "glass", "A", { op: 0.8 }), B(12, 66, 14, 14, 0.45, 4.45, "glass", "B", { op: 0.8 }),
        S3([[32.2, 42, 0.45], [35.4, 42, 0.45], [35.4, 56, 4.95], [32.2, 56, 4.95]], 0.3, "zCirc")];
      const xs = [6, 14.67, 23.33, 32], ys = range(30, 84, 9);
      const v2 = grid(xs, ys, 0, (x, y) => (x >= 8 && x <= 30 && y >= 38 && y <= 76) ? 13.95 : 9.45);
      for (const c of v2) v.push(B(c.x - 0.25, c.y - 0.25, 0.5, 0.5, 0, 4.95, "deck", "X"));
      const st = [...v2, ...grid([14, 22], [10, 18], 0.45, 12)];
      return { v, st, labels: [[19, 57, 18.3, "Khối chính · Nhà sàn đọc sách", 1], [18, 14, 18, "Gươl · phòng đa năng"], [24, 60, 1, "Gầm sàn: sân đọc ngoài trời"], [34, 50, 3, "Cầu thang lên sàn"]] };
    }
  });

  I.push({
    id: "cau", name: "Cầu dây văng", nw: 1, tag: "Thành phố của những cây cầu",
    story: "Đà Nẵng được gọi là thành phố của những cây cầu: cầu Rồng, cầu quay sông Hàn, cầu Trần Thị Lý, cầu Thuận Phước. Phương án treo khối đọc sách hai tầng lên hai trụ tháp cao 30 m bằng các dây cáp, giống một cây cầu dây văng. Tầng trệt gần như trống hoàn toàn, chỉ có hai hộp kính: sảnh cà phê và phòng đa năng. Phần còn lại là quảng trường có mái che liền với bậc thang.",
    why: [["Ý nghĩa", "Cầu là biểu tượng của Đà Nẵng. Một thư viện \"cầu\" bên sông Hàn nói lên điều đó rõ ràng nhất."], ["Khu đất", "Tầng trệt gần như trống: quảng trường 1.000 m² có bóng mát nối thẳng bậc thang Bạch Đằng với đường Trần Phú."], ["Kết cấu là kiến trúc", "Trụ, cáp, dàn là những gì làm nên hình khối. Thầy hỏi \"đỡ thế nào\" thì câu trả lời nằm ngay trên mặt đứng."], ["Tầm nhìn", "Khối đọc nâng lên 5,5 m, vượt hẳn mép bậc thang, nhìn thẳng ra sông."]],
    kc: { he: "Khối đọc là một hộp dàn thép cao 2 tầng (9 m), hai mặt dọc là hai dàn chéo. Hộp tựa lên hai trụ tháp bê tông (bên trong là thang bộ, thang máy) và được treo thêm bằng cáp ở hai đầu.", nhip: "39 m giữa hai trụ (dàn cao 9 m)", cx: "6–8 m ở hai đầu, có cáp treo" },
    qa: [["Treo bằng cáp có rung, có an toàn?", "Cáp chỉ đỡ phần đầu đua, phần chính do dàn thép cao 9 m tựa lên hai trụ. Tỷ lệ nhịp/chiều cao dàn khoảng 4, rất cứng."], ["Có phải là hơi phô trương?", "Đây là ý tưởng đẩy kết cấu thành biểu tượng. Nếu thầy muốn giản dị hơn có thể bỏ cáp, giữ dàn và hai trụ (xem ý tưởng Bàn đọc thành phố)."]],
    cut: "Hộp đọc: foam 12 × 26 × 4,5 cm, kẻ đường chéo dàn lên hai mặt dọc. Trụ tháp: que gỗ 2 × 1,5 × 15 cm. Cáp: chỉ trắng căng từ đỉnh trụ xuống mép mái hộp.",
    build() {
      const v = [B(6, 24, 24, 18, 5.45, 14.45, "sheet", "B", { bands: [9.95] }), B(6, 42, 24, 16, 5.45, 14.45, "sheet", "B", { bands: [9.95] }), B(6, 58, 12, 18, 5.45, 14.45, "sheet", "C", { bands: [9.95] }), B(18, 58, 12, 18, 5.45, 14.45, "sheet", "E", { bands: [9.95] }),
        B(10, 28, 16, 10, 0.45, 4.95, "glass", "A", { op: 0.8 }), B(8, 44, 20, 14.4, 0.45, 4.95, "gold", "D"), B(16, 29, 4, 3, 0, 30, "blkTop", "X"), B(16, 69, 4, 3, 0, 30, "blkTop", "X")];
      const diag = [...zig(6, 24, 6, 76, 5.45, 14.45, 12), ...zig(30, 24, 30, 76, 5.45, 14.45, 12)].map(s => [s.a, s.b]);
      v.push(LN(diag, "ink"));
      const st = [];
      for (const [my, ts] of [[30.5, [24, 26.5, 34.5, 37, 39.5]], [70.5, [61, 63.5, 66, 74, 76]]]) for (const t of ts) for (const x of [6, 30]) st.push(seg([18, my, 29.5], [x, t, 14.45]));
      v.push(LN(st.map(s => [s.a, s.b]), "ink"));
      st.push(...zig(6, 24, 6, 76, 5.45, 14.45, 12), ...zig(30, 24, 30, 76, 5.45, 14.45, 12));
      st.push({ t: "wall", x: 16, y: 29, w: 4, d: 3, z1: 0, z2: 30 }, { t: "wall", x: 16, y: 69, w: 4, d: 3, z1: 0, z2: 30 });
      return { v, st, labels: [[18, 50, 14.6, "Khối chính · Hộp đọc treo", 1], [18, 30, 30, "Trụ tháp và cáp"], [24, 64, 0.5, "Quảng trường dưới gầm"], [18, 51, 5, "Phòng đa năng"]] };
    }
  });

  I.push({
    id: "ban", name: "Bàn đọc của thành phố", nw: 1, tag: "Mặt bàn khổng lồ, thành phố ngồi dưới gầm bàn",
    story: "Một chiếc bàn đọc khổng lồ 30 × 64 m đặt bên sông. Hai \"chân bàn\" là hai bức tường dày chạy ngang, bên trong là thang bộ, thang máy và WC. \"Mặt bàn\" là tầng đọc sách chính, nằm cao 5,5 m. Trên mặt bàn có hai \"cuốn sách\" là hai phòng đọc nhỏ màu sắc. Dưới gầm bàn là quảng trường có mái che với hai hộp kính: sảnh cà phê và phòng đa năng.",
    why: [["Ý nghĩa", "Bàn đọc là đồ vật gắn với thư viện. Cả thành phố được mời ngồi \"dưới gầm bàn\" để đọc, gặp gỡ, nói chuyện."], ["Hình khối", "Khối chính (mặt bàn) cực kỳ rõ ràng; khối phụ là hai chân bàn, hai cuốn sách và hai hộp kính dưới gầm."], ["Kết cấu", "Chỉ hai bức tường đỡ toàn bộ. Mặt bàn là dàn thép cao một tầng, đó chính là chiều cao của tầng đọc. Không có cột trong tầng đọc."], ["Khí hậu", "Mặt bàn đua 12 m hai đầu tạo bóng mát rất lớn cho quảng trường."]],
    kc: { he: "Hai tường chân bàn bê tông dày 4 m (rỗng bên trong làm lõi thang). Tầng đọc là hộp dàn thép cao 4,5 m, nhịp 36 m giữa hai chân, đua 12 m ở hai đầu.", nhip: "36 m (dàn cao 4,5 m)", cx: "12 m (dàn cao 4,5 m, tỷ lệ 1:2,7)" },
    qa: [["Đua 12 m có quá xa?", "Với dàn thép cao 4,5 m thì đua 12 m là hợp lý (nhiều công trình đua 15–20 m). Dàn nằm trong tường bao, bên trong là sàn đọc trống."], ["Kho sách nặng đặt ở đâu?", "Kho đóng đặt ở tầng trệt trong chân bàn phía Nam và hộp kính, không đặt trên phần đua."]],
    cut: "Mặt bàn: foam 15 × 32 × 2,25 cm, kẻ đường chéo dàn. Chân bàn: 2 khối foam xám 12 × 2 × 2,5 cm. Hai cuốn sách: hộp màu có kẻ mép giấy. Hộp kính: mica.",
    build() {
      const v = [B(4, 18, 30, 20, 5.45, 9.95, "sheet", "B"), B(4, 38, 30, 22, 5.45, 9.95, "sheet", "B"), B(4, 60, 14, 22, 5.45, 9.95, "sheet", "C"), B(18, 60, 16, 22, 5.45, 9.95, "sheet", "B"),
        B(6, 30, 24, 4, 0.45, 5.45, "stone", "E", { top: "stoneTop" }), B(6, 66, 24, 4, 0.45, 5.45, "stone", "E", { top: "stoneTop" }),
        B(10, 36, 18, 10, 0.45, 4.95, "glass", "A", { op: 0.8 }), B(8, 48, 22, 14, 0.45, 4.95, "gold", "D"),
        B(8, 24, 12, 16, 9.95, 13.45, "warn", "B", { bands: [11, 12, 12.8], top: "sheet" }), B(20, 48, 10, 14, 9.95, 12.95, "accessC", "B", { bands: [10.9, 11.8], top: "sheet" })];
      v.push(LN([...zig(4, 18, 4, 82, 5.45, 9.95, 14), ...zig(34, 18, 34, 82, 5.45, 9.95, 14)].map(s => [s.a, s.b])));
      const st = [{ t: "wall", x: 6, y: 30, w: 24, d: 4, z1: 0.45, z2: 5.45 }, { t: "wall", x: 6, y: 66, w: 24, d: 4, z1: 0.45, z2: 5.45 }, ...zig(4, 18, 4, 82, 5.45, 9.95, 14), ...zig(34, 18, 34, 82, 5.45, 9.95, 14)];
      return { v, st, labels: [[19, 72, 9.95, "Khối chính · Mặt bàn đọc", 1], [18, 32, 3, "Chân bàn = lõi thang"], [14, 32, 13.5, "Hai cuốn sách trên bàn"], [24, 56, 0.5, "Gầm bàn = quảng trường"]] };
    }
  });

  I.push({
    id: "haivan", name: "Khe Hải Vân", nw: 1, tag: "Hai sườn đồi tách bởi một khe đèo có bậc thang",
    story: "Đèo Hải Vân là cửa ngõ phía Bắc của Đà Nẵng. Phương án tách công trình thành hai \"sườn đồi\" bằng một khe chéo rộng 6 m, giống con đèo xẻ giữa hai triền núi. Trong khe là một cầu thang ngoài trời dẫn từ quảng trường lên tầng 2, nối tiếp bậc thang Bạch Đằng. Mái hai khối dốc dần về phía khe và phía sông, phủ cỏ như sườn đồi. Hai cầu kính bắc qua khe ở tầng 2.",
    why: [["Ý nghĩa", "Hình ảnh đèo, núi gắn với địa lý Đà Nẵng. Con đường đi lên qua khe là một trải nghiệm có tính câu chuyện."], ["Khu đất", "Khe chéo mở hướng nhìn từ đường Trần Phú ra thẳng sông Hàn. Cầu thang trong khe là lối công cộng mở cả ngày."], ["Công năng", "Khối Bắc ồn (sự kiện, sảnh, cà phê), khối Nam yên (đọc, kho). Khe 6 m là khoảng cách âm thanh tự nhiên."], ["Mô hình", "Mỗi khối là một khối đa giác cắt chéo một cạnh, mặt trên cắt vát. Chỉ 4 khối chính."]],
    kc: { he: "Mỗi khối là khung bê tông lưới 8 × 8 m. Cột dọc theo cạnh khe đặt cách nhau 8 m theo phương Đông–Tây. Cầu kính nhịp 7 m là dầm thép đơn giản.", nhip: "8 m", cx: "Không" },
    qa: [["Mái dốc làm tầng 2 thấp chỗ gần khe?", "Chỗ thấp nhất tầng 2 vẫn cao 3,4 m. Chỗ cao (phía Tây) có gác lửng đọc sách."], ["Khe chéo có làm phòng méo?", "Chỉ cạnh dọc khe là chéo. Phần lớn phòng vẫn vuông góc, cạnh chéo đặt bàn đọc dọc kính nhìn vào khe."]],
    cut: "Hai khối foam cắt hình thang (cạnh chéo theo khe), mặt trên vát dốc 1–1,5 cm, dán giấy cỏ. Cầu thang trong khe: các que bìa 3 × 0,5 mm xếp bậc.",
    build() {
      const yN = x => 36 + (x - 6) * 10 / 22, yS = x => yN(x) + 6;
      const zN = (x, y) => 14.45 - 0.12 * (x - 6) - 0.1 * (y - 12), zS = (x, y) => 14.45 - 0.12 * (x - 6) - 0.1 * (86 - y);
      const N1 = [[6, 14], [28, 14], [28, 26], [6, 26]], N2 = [[6, 26], [28, 26], [28, 46], [6, 36]], S1 = [[6, 42], [28, 52], [28, 62], [6, 62]], S2 = [[6, 62], [16, 62], [16, 74], [6, 74]], S2b = [[6, 74], [16, 74], [16, 86], [6, 86]], S3p = [[16, 62], [28, 62], [28, 86], [16, 86]];
      const v = [PO(N1, 0.45, zN, "blkTop", "D", { fl: 2, top: "grass" }), PO(N2, 0.45, zN, "blkTop", "A", { fl: 2, top: "grass" }), PO(S1, 0.45, zS, "blkTop", "B", { fl: 2, top: "grass" }), PO(S2, 0.45, zS, "blkTop", "C", { fl: 2, top: "grass" }), PO(S2b, 0.45, zS, "blkTop", "E", { fl: 2, top: "grass" }), PO(S3p, 0.45, zS, "blkTop", "B", { fl: 2, top: "grass" })];
      v.push(S3([[28, yN(28) + 0.4, 0.45], [28, yS(28) - 0.4, 0.45], [6, yS(6) - 0.4, 4.95], [6, yN(6) + 0.4, 4.95]], 0.3, "zCirc"));
      const steps = []; for (let i = 0; i <= 24; i++) { const x = 28 - i * 22 / 24, z = 0.47 + (28 - x) / 22 * 4.5; steps.push([[x, yN(x) + 0.4, z], [x, yS(x) - 0.4, z]]); }
      v.push(LN(steps, "ink"));
      for (const xb of [13, 21]) v.push(B(xb, yN(xb + 2) - 0.6, 4, 7.2, 4.95, 8.6, "glass", "L", { op: 0.75 }));
      const all = [N1, N2, S1, S2, S2b, S3p];
      const st = grid([6, 14, 22, 28], range(14, 86, 8).concat([52]), 0.45, 9.45, (x, y) => all.some(p => inPoly(p, x === 6 ? 6.1 : x === 28 ? 27.9 : x, y === 14 ? 14.1 : y === 86 ? 85.9 : y)));
      return { v, st, labels: [[17, 24, 13.5, "Khối chính · Hai sườn đồi", 1], [20, 44.5, 3.5, "Khe đèo · bậc lên tầng 2"], [15, 42.5, 8.6, "Cầu kính"], [17, 76, 13, "Mái cỏ dốc"]] };
    }
  });

  I.push({
    id: "amduong", name: "Âm dương", nw: 1, tag: "Hai chữ L đá và kính khóa vào nhau",
    story: "Hai khối chữ L khóa vào nhau như âm và dương. Chữ L \"âm\" bằng đá, đặc, nằm sát đất phía Trần Phú, chứa những gì cần yên và kín: phòng đa năng, kho, kỹ thuật, khu thiếu nhi. Chữ L \"dương\" bằng kính, nhẹ, nằm ở tầng 2–3 phía sông, chứa khu đọc mở sáng sủa. Hai chữ L chồng lên nhau ở hai đầu, ở giữa dương đè lên một hàng cột thoáng, bên dưới là hiên công cộng.",
    why: [["Ý nghĩa", "Âm dương là triết lý cân bằng trong văn hóa Á Đông: tĩnh – động, đặc – rỗng, nặng – nhẹ. Thư viện cũng cần cân bằng giữa đọc yên tĩnh và sinh hoạt sôi động."], ["Công năng", "Chia khối theo đúng mức ồn: đá cho khu kín và ồn có kiểm soát, kính cho khu đọc mở. Phân màu ABCDE trùng với phân khối."], ["Khu đất", "Khối đá chắn nắng chiều và tiếng ồn đường Trần Phú; khối kính quay ra sông Hàn."], ["Mô hình", "Hai chữ L, mỗi chữ là 3–4 hộp chữ nhật. Hai màu vật liệu tương phản."]],
    kc: { he: "Chữ L đá: tường và cột bê tông lưới 6 × 8 m. Chữ L kính: dầm 13,5 m tựa lên tường Đông của chữ L đá và một hàng cột thép tròn ở mép sông (x = 31,5 m) cách nhau 8 m.", nhip: "13,5 m (dầm thép cao 0,9 m)", cx: "Không" },
    qa: [["Hàng cột ở hiên có làm vướng?", "Hàng cột cách nhau 8 m ở mép hiên, giống một hàng hiên cột. Bên trong khu đọc kính không có cột."], ["Chữ L có phải là chữ U thầy không thích?", "Không có sân bao ba phía. Hai chữ L khóa chéo nhau theo chiều đứng, nhìn từ trên xuống là một hình chữ nhật kín, nhìn từ bên là hai lớp."]],
    cut: "Chữ L đá: 4 hộp foam xám đen. Chữ L kính: 4 hộp mica hoặc foam trắng dán giấy can. Hàng cột: que tre tròn 3 mm.",
    build() {
      const v = [B(6, 14, 12, 24, 0.45, 4.95, "stone", "D", { top: "stoneTop" }), B(6, 38, 12, 24, 0.45, 4.95, "stone", "C", { top: "stoneTop" }), B(6, 62, 12, 24, 0.45, 4.95, "stone", "E", { top: "stoneTop" }), B(18, 72, 12, 14, 0.45, 4.95, "stone", "B", { top: "stoneTop" }),
        B(18, 14, 14, 22, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 1.5 }), B(18, 36, 14, 28, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 1.5 }), B(18, 64, 14, 22, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 1.5 }), B(6, 14, 12, 14, 4.95, 9.45, "glass", "E", { op: 0.85, ribs: 1.5 }), B(18, 36, 14, 28, 9.45, 13.95, "glass", "B", { op: 0.85, ribs: 1.5 }),
        B(20, 34, 10, 20, 0.45, 4.45, "lamp", "A")];
      const piles = grid([31.5], range(14, 70, 8), 0.45, (x, y) => (y >= 36 && y <= 64) ? 13.95 : 9.45);
      for (const c of piles) v.push(B(31.3, c.y - 0.2, 0.4, 0.4, 0.45, 4.95, "ink", "X"));
      const st = [...piles, ...grid([6, 12, 18], range(14, 86, 8), 0.45, 4.95), ...grid([18], range(14, 70, 8), 4.95, (x, y) => (y >= 36 && y <= 64) ? 13.95 : 9.45)];
      return { v, st, labels: [[25, 50, 13.95, "Khối chính · Chữ L kính (dương)", 1], [12, 50, 4.95, "Chữ L đá (âm)"], [31, 46, 2.2, "Hiên cột thoáng"], [24, 79, 4.95, "Hai chữ L khóa vào nhau"]] };
    }
  });

  I.push({
    id: "phap", name: "Hành lang vòm bên sông", nw: 1, tag: "Hàng hiên vòm cuốn như các công trình thời Pháp trên Bạch Đằng",
    story: "Đường Bạch Đằng còn giữ một số công trình thời Pháp đầu thế kỷ 20 với hàng hiên vòm cuốn, tường vàng, mái ngói. Phương án là một khối hai tầng tường vàng, mái ngói bốn dốc thấp, mặt nhìn ra sông có một hành lang vòm 10 nhịp cao 6 m. Hành lang vòm là hiên che nắng mưa, nơi ngồi đọc, uống cà phê và chờ sự kiện, nối với bậc thang Bạch Đằng.",
    why: [["Ý nghĩa", "Tôn trọng bối cảnh lịch sử của con đường (đề mục 2 yêu cầu xét các yếu tố lịch sử, văn hóa). Công trình mới đứng cạnh công trình cũ một cách hài hòa."], ["Khí hậu", "Hành lang vòm sâu 3,4 m che nắng sáng cho cả tầng 1. Đây là giải pháp khí hậu đã được kiểm chứng cả trăm năm ở Đà Nẵng."], ["Đời sống", "Hành lang vòm dài 64 m là \"phòng khách\" bên sông, mở cả ngày, nhìn ra sông qua 10 khung vòm."], ["Mô hình", "Thân nhà là hộp, mái bốn dốc, mặt vòm cắt từ một tấm bìa (khoét 10 ô vòm)."]],
    kc: { he: "Khung bê tông lưới 11 × 6,4 m (cột ở x = 8, 19, 30 m). Hành lang vòm là dãy trụ gạch cách nhau 6,4 m, đỡ sàn mái hành lang.", nhip: "11 m", cx: "Không" },
    qa: [["Có phải giả cổ?", "Không làm phù điêu, gờ chỉ. Chỉ giữ nhịp vòm, tỷ lệ tường – mái và màu vàng đặc trưng, vật liệu và cửa kính hiện đại."], ["Hàng cột giữa nhà ở x = 19 m có vướng?", "Hàng cột này nằm giữa dãy kệ sách và khu bàn đọc, không cắt ngang phòng lớn. Phòng đa năng 22 × 14 m ở đầu Bắc dùng dầm 22 m không cột."]],
    cut: "Thân: hộp foam vàng 11 × 32 × 4,5 cm. Mái: khối bốn dốc cao 1,8 cm. Mặt vòm: bìa 2 mm 32 × 3 cm, khoét 10 ô vòm rộng 2,1 cm. Mái hành lang: dải bìa 1,7 cm.",
    build() {
      const ops = []; for (let k = 0; k < 10; k++) ops.push({ yc: 19.2 + 6.4 * k, w: 4.2, hr: 3.2 });
      const v = [B(8, 16, 22, 14, 0.45, 9.45, "lamp", "D", { fl: 1, ribs: 3.2 }), B(8, 30, 22, 14, 0.45, 9.45, "lamp", "A", { bands: [4.95], ribs: 3.2 }), B(14, 44, 16, 36, 0.45, 9.45, "lamp", "B", { bands: [4.95], ribs: 3.2 }), B(8, 44, 6, 18, 0.45, 9.45, "lamp", "C", { bands: [4.95] }), B(8, 62, 6, 18, 0.45, 9.45, "lamp", "E", { bands: [4.95] }),
        H(7.4, 15.4, 23.2, 65.2, 9.45, 13, "warn"), B(30, 16, 3.4, 64, 5.9, 6.45, "lamp", "X"), AR(33, 16, 80, 0.45, 6.45, 0.7, ops, "lamp")];
      const st = grid([8, 19, 30], range(16, 80, 6.4), 0.45, 9.45, (x, y) => !(x === 19 && y > 16 && y < 30));
      return { v, st, labels: [[19, 48, 12.5, "Khối chính · Nhà mái ngói", 1], [33.4, 40, 5.6, "Hành lang vòm 10 nhịp"], [19, 70, 12, "Mái ngói 4 dốc"], [19, 22, 5, "Phòng đa năng"]] };
    }
  });

  /* ---------- 10 ý tưởng làm lại cho đúng kết cấu ---------- */
  I.push({
    id: "phohoi", name: "Phố Hội bên sông", nw: 0, tag: "12 nhà ống, tường ngăn chịu lực",
    story: "Thư viện là một dãy phố 12 nhà ống rộng 6 m như phố cổ Hội An, mái ngói, đầu hồi quay ra sông, trước mỗi nhà có mái hiên. Mỗi nhà một chức năng, cao một hoặc hai tầng. Hai nhà đầu Bắc gộp lại thành phòng đa năng.",
    why: [["Ý nghĩa", "Hội An là di sản thế giới cách Đà Nẵng 30 km. Dãy nhà ống mái ngói là hình ảnh quen thuộc nhất của miền Trung."], ["Kết cấu sạch", "Tường ngăn giữa hai nhà là tường chịu lực cách nhau 6 m. Sàn và mái nhịp 6 m. Bên trong mỗi nhà không có cột nào."], ["Khí hậu", "Mái dốc thoát mưa nhanh; khe giếng trời giữa các nhà và cửa hai đầu tạo thông gió xuyên suốt như nhà ống truyền thống."], ["Mô hình", "Chỉ hai loại chi tiết: hộp tường và lăng trụ mái. Cắt hàng loạt rất nhanh."]],
    kc: { he: "Tường gạch – bê tông chịu lực dày 250 giữa các nhà, cách nhau 6 m. Sàn và mái tựa lên tường. Phòng đa năng 12 × 23 m: bỏ tường giữa hai nhà ở tầng 1, thay bằng dầm thép đỡ mái.", nhip: "6 m (12 m ở phòng đa năng)", cx: "Mái hiên 1,5 m" },
    qa: [["Nhà rộng 6 m có đủ cho khu đọc lớn?", "Khu đọc mở chiếm 4–5 nhà liền nhau, tường ngăn có các ô mở rộng 3–4 m nối các nhà như một chuỗi phòng."], ["Có phải chép phố cổ?", "Không dùng chi tiết cổ. Giữ nhịp 6 m, mái dốc, đầu hồi; vật liệu và cửa hiện đại."]],
    cut: "Tường: 12 hộp foam vàng/trắng rộng 3 cm, sâu 11–12,5 cm, cao 2,25 hoặc 4,5 cm. Mái: 12 lăng trụ tam giác cao 1,3–1,5 cm, dán giấy đỏ đất. Mái hiên: dải bìa 0,75 cm.",
    build() {
      const v = [], st = [], fls = [1, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1], x1s = [8, 8, 7, 8, 6, 7, 6, 8, 7, 6, 8, 7], x2s = [31, 31, 32, 30, 31, 32, 30, 31, 32, 30, 31, 30];
      const zones = ["D", "D", "A", "A", "A", "B", "B", "B", "C", "B", "E", "B"], walls = ["lamp", "sheet", "gold"];
      for (let i = 0; i < 12; i++) {
        const y = 14 + i * 6.1, top = 0.45 + fls[i] * 4.5;
        v.push(B(x1s[i], y, x2s[i] - x1s[i], 5.9, 0.45, top, walls[i % 3], zones[i], { ribs: 1.4, bands: fls[i] > 1 ? [4.95] : undefined }));
        v.push(G(x1s[i] - 0.4, y - 0.25, x2s[i] - x1s[i] + 0.8, 6.4, top, top + 2.6 + (i % 3) * 0.4, "warn", "x"));
        v.push(B(x2s[i], y + 0.5, 1.5, 4.9, 3.3, 3.55, "warn", "X"));
        if (i !== 1) st.push(wall(x1s[i], y - 0.12, x2s[i] - x1s[i], 0.25, 0.45, top));
        st.push(wall(x1s[i], y + 5.78, x2s[i] - x1s[i], 0.25, 0.45, top));
      }
      st.push(seg([8, 20.1, 4.6], [31, 20.1, 4.6]));
      return { v, st, labels: [[20, 46, 12, "Khối chính · Dãy 12 nhà ống", 1], [32, 41, 3.5, "Mái hiên"], [26, 74, 9.8, "Đầu hồi ra sông"], [19, 20, 3, "Phòng đa năng (2 nhà)"]] };
    }
  });

  I.push({
    id: "ke", name: "Kệ sách tường chịu lực", nw: 0, tag: "Vách kệ chính là tường chịu lực",
    story: "Mặt nhà nhìn ra sông là một khung kệ sách khổng lồ: 7 vách đứng chạy Đông–Tây, 2 tấm sàn kệ. Trong mỗi ngăn đặt 2 \"cuốn sách\" là các phòng kính màu cao thấp, thụt ra thụt vào khác nhau. Khoảng trống giữa các cuốn là hành lang và ban công.",
    why: [["Ý nghĩa", "Kệ sách là biểu tượng trực tiếp nhất của thư viện, nhìn từ bờ sông bên kia vẫn nhận ra."], ["Kết cấu là ý tưởng", "7 vách kệ chính là 7 tường chịu lực. Sàn nhịp 10 m tựa lên vách. Không có cột nào trong các ngăn."], ["Linh hoạt", "Khung vách cố định, các \"cuốn sách\" bên trong là vách nhẹ có thể thay đổi sau này (mục 5.2)."], ["Nắng", "Vách và sàn kệ đua ra 1–2 m so với phòng kính, che nắng sáng."]],
    kc: { he: "7 tường bê tông dày 600 chạy Đông–Tây, cách nhau 10,7 m. Sàn hộp (sàn ô cờ) nhịp 10,1 m tựa lên tường.", nhip: "10,1 m", cx: "Không" },
    qa: [["Tường Đông–Tây có chắn gió sông?", "Gió sông thổi từ Đông sang Tây, song song với tường nên đi thẳng vào các ngăn. Tường còn chắn nắng xiên buổi sáng."], ["Phòng đa năng 180 m² vừa một ngăn?", "Một ngăn tầng 1 rộng 10,1 m × 22 m = 222 m², đủ cho phòng đa năng không cột."]],
    cut: "Khung: 2 tấm foam 11 × 32,4 cm, 7 vách 11 × 0,3 × 4,8 cm. Cuốn sách: hộp foam màu theo bảng, đẩy ra thụt vào 0,5–1 cm.",
    build() {
      const v = [], y0 = 16, bay = 10.1, t = 0.6;
      const p1 = [[[3.2, 3.6, 19, "D"], [6, 3.9, 21, "D"]], [[4.5, 3.9, 20, "D"], [4.8, 3.2, 17, "A"]], [[5, 3.8, 21, "A"], [4.2, 3.3, 18, "A"]], [[3.4, 3.1, 17, "B"], [6, 3.9, 20, "B"]], [[6.5, 3.6, 21, "B"], [3, 3.2, 18, "C"]], [[4, 3.9, 19, "C"], [5.4, 3.4, 21, "E"]]];
      const p2 = [[[5, 3.9, 21, "B"], [4.2, 3.3, 18, "B"]], [[3, 3.5, 17, "B"], [6.4, 3.9, 21, "B"]], [[6, 3.7, 20, "B"], [3.4, 3.1, 19, "B"]], [[4.4, 3.9, 21, "B"], [5, 3.3, 18, "B"]], [[3.6, 3.8, 20, "E"], [5.8, 3.5, 21, "B"]], [[5.2, 3.9, 19, "C"], [4.2, 3.2, 21, "B"]]];
      let ci = 0;
      v.push(B(6, y0, 22, 64.8, 4.45, 4.95, "stone", "X", { top: "stoneTop" }), B(6, y0, 22, 64.8, 9.45, 9.95, "stone", "X", { top: "stoneTop" }));
      for (let i = 0; i < 6; i++) { const ys = y0 + t + i * (bay + t); for (const [lv, P] of [[0.45, p1[i]], [4.95, p2[i]]]) { let y = ys; for (const [len, h, dep, zone] of P) { v.push(B(6, y, dep, len, lv, lv + h, COV[ci++ % 7], zone, { top: "sheet", fl: 1 })); y += len + 0.4; } } }
      const st = [];
      for (let i = 0; i <= 6; i++) { v.push(B(6, y0 + i * (bay + t), 22, t, 0.45, 9.95, "stone", "X", { top: "stoneTop" })); st.push(wall(6, y0 + i * (bay + t), 22, t, 0.45, 9.95)); }
      return { v, st, area: 22 * 64.8 * 2, labels: [[28, 40, 9.95, "Khối chính · Khung kệ", 1], [26, 58, 2.5, "Cuốn sách = phòng"], [26, 74, 7, "Vách kệ = tường chịu lực"]] };
    }
  });

  I.push({
    id: "o", name: "Ô chữ lưới 8 m", nw: 0, tag: "Mỗi ô là một ô lưới cột",
    story: "Toàn bộ công trình ghép từ một loại khối duy nhất 8 × 8 × 4,5 m, trùng với lưới cột. Tầng 1 có 24 ô, tầng 2 có 17 ô, mái có 3 chòi đọc. Ô rút ra để lại sân và ban công; hai ô tầng 2 được kéo ra 2 m về phía sông như ngăn kéo. Mỗi ô một chức năng, ghép lại thành \"ô chữ tri thức\".",
    why: [["Logic rõ ràng", "Phân khu ABCDE hiện thành hình khối: mỗi ô một màu, nhìn mô hình là đọc được mặt bằng."], ["Kết cấu sạch", "Cột chỉ ở góc ô, 8 m một cột. Khu sự kiện 2 × 2 ô bỏ cột giữa, phía trên không xây gì, dùng vì kèo 16 m."], ["Linh hoạt", "Thêm bớt ô không ảnh hưởng kết cấu, đúng tinh thần điều chỉnh ±10% của đề."], ["Mô hình", "Cắt 44 khối giống hệt nhau 4 × 4 × 2,25 cm. Dễ nhất trong tất cả các ý tưởng."]],
    kc: { he: "Khung bê tông lưới 8 × 8 m, cột ở mọi góc ô. Ô kéo ra 2 m là dầm công xôn ngắn. Khu sự kiện 16 × 16 m dùng vì kèo thép 16 m.", nhip: "8 m (16 m ở khu sự kiện)", cx: "2 m" },
    qa: [["Toàn khối vuông có đơn điệu?", "Nhịp đầy – rỗng, ô kéo ra, chòi trên mái tạo chuyển động. Mỗi ô ốp vật liệu theo chức năng."], ["Cột 8 m có vướng khu đọc?", "Một cột cho 64 m² là mật độ bình thường của thư viện. Cột đặt trùng đầu kệ sách."]],
    cut: "44 khối foam 3,9 × 3,9 × 2,25 cm (dùng máy cắt foam nhiệt), 3 khối 2,4 × 2,4 × 1,5 cm. Sơn theo màu chức năng.",
    build() {
      const v = [], xs = [6, 14, 22], ys = range(14, 78, 8);
      const L1 = ["DDD", "DDD", "AAA", "A.A", "BBB", "CBB", "C.B", "EBB", "E.B"], L2 = ["...", "...", "BBE", "BBB", ".BB", "BB.", "BBB", "B.B", "BB."], L3 = { "1,3": 1, "1,5": 1, "0,6": 1 }, pull = { "2,3": 2, "2,6": 2 };
      const tone = ["sheet", "deck", "blkTop", "lamp", "glass"];
      const occ = new Set();
      ys.forEach((y, j) => xs.forEach((x, i) => {
        if (L1[j][i] !== ".") { v.push(B(x + 0.1, y + 0.1, 7.8, 7.8, 0.45, 4.95, tone[(i + j) % 5], L1[j][i])); occ.add(`1,${i},${j}`); }
        if (L2[j][i] !== ".") { v.push(B(x + 0.1 + (pull[`${i},${j}`] || 0), y + 0.1, 7.8, 7.8, 4.95, 9.45, tone[(i + j + 2) % 5], L2[j][i])); occ.add(`2,${i},${j}`); }
        if (L3[`${i},${j}`]) v.push(B(x + 1.6, y + 1.6, 4.8, 4.8, 9.45, 12.45, "lamp", "B", { fl: 1 }));
      }));
      const st = [];
      for (const gx of [6, 14, 22, 30]) for (const gy of range(14, 86, 8)) {
        const adj = (lv) => [[-1, -1], [0, -1], [-1, 0], [0, 0]].some(([di, dj]) => occ.has(`${lv},${(gx - 6) / 8 + di},${(gy - 14) / 8 + dj}`));
        if (gx === 14 && gy === 22) continue;
        if (adj(2)) st.push(col(gx, gy, 0.45, 9.45)); else if (adj(1)) st.push(col(gx, gy, 0.45, 4.95));
      }
      return { v, st, labels: [[26, 46, 9.45, "Khối chính · Lưới ô 8 × 8 m", 1], [32, 40, 7, "Ô kéo ra 2 m"], [18, 56, 12.45, "Chòi đọc trên mái"], [14, 22, 4.95, "Sự kiện 16 × 16 m không cột"]] };
    }
  });

  I.push({
    id: "hop", name: "Hộp đọc nhô", nw: 0, tag: "16 hộp đọc màu gắn trên mép sàn",
    story: "Khối chính là một hộp hai tầng đơn giản trên lưới cột 8 m. Trên mặt Đông gắn 16 hộp đọc kính màu 2,4 × 3 m, nhô ra 2,4 m, xếp so le ở hai tầng. Mỗi hộp là chỗ đọc riêng cho 1–2 người. Từ dưới đường nhìn lên thấy mặt tiền lấm tấm những ô màu có người ngồi đọc (học từ thư viện Bishan, Singapore).",
    why: [["Đúng yêu cầu của thầy", "Người ngoài nhìn vào thấy ngay người đang đọc trong các hộp màu."], ["Kết cấu đơn giản", "Hộp đọc là khung thép nhẹ gắn vào mép sàn, nhô 2,4 m. Khối chính là khung bê tông thông thường, không cần dầm chuyển."], ["Công năng", "Thêm một kiểu chỗ đọc riêng tư, đúng yêu cầu \"lựa chọn chỗ đọc khác nhau\" (mục 5.2)."], ["Mô hình", "Một hộp lớn và 16 hộp nhỏ cắm vào mặt Đông."]],
    kc: { he: "Khung bê tông lưới 8 × 8,7 m. Hộp đọc: khung thép hộp hàn vào đầu dầm sàn, công xôn 2,4 m.", nhip: "8,7 m", cx: "2,4 m (hộp đọc)" },
    qa: [["Hộp nhô ra có nóng?", "Kính Low-E có màu, phía trên có tấm che 0,6 m. Hướng Đông chỉ nhận nắng sáng."], ["16 hộp có phải chỉ để trang trí?", "Mỗi hộp là một chỗ ngồi được tính vào B6 \"đọc linh hoạt\"."]],
    cut: "Hộp chính: foam trắng 12 × 26 × 4,75 cm. Hộp đọc: 16 khối mica màu 1,2 × 1,5 × 1,2 cm cắm vào mặt Đông.",
    build() {
      const v = [B(6, 12, 24, 12, 0.45, 4.95, "zD", "D", { ribs: 0.6 }), B(6, 24, 24, 12, 0.45, 4.95, "sheet", "A", { ribs: 2.9 }), B(14, 36, 16, 40, 0.45, 4.95, "sheet", "B", { ribs: 2.9 }), B(6, 36, 8, 20, 0.45, 4.95, "sheet", "C", { ribs: 2.9 }), B(6, 56, 8, 20, 0.45, 4.95, "sheet", "E", { ribs: 2.9 }), B(6, 24, 24, 52, 4.95, 9.95, "sheet", "B", { top: "blkTop", ribs: 2.9 })];
      const ps = []; for (let i = 0; i < 9; i++) ps.push([26 + i * 5.6, i % 2 ? 6.2 : 5.5]); for (let i = 0; i < 7; i++) ps.push([28.5 + i * 6.6, i % 2 ? 1.6 : 2.1]);
      ps.forEach(([y, z], i) => v.push(B(30, y, 2.4, 3, z, z + 2.4, COV[i % 7], "B", { fl: 1, top: "sheet" })));
      const st = [...grid([6, 14, 22, 30], range(24, 76, 8.667), 0.45, 9.95), ...grid([6, 14, 22, 30], [12], 0.45, 4.95)];
      ps.forEach(([y, z]) => st.push(seg([30, y + 1.5, z], [32.4, y + 1.5, z])));
      return { v, st, labels: [[18, 50, 9.95, "Khối chính · Hộp sách", 1], [32.4, 46.5, 7.6, "Hộp đọc màu"], [18, 18, 4.95, "Hộp sự kiện"]] };
    }
  });

  I.push({
    id: "den", name: "Đèn lồng", nw: 0, tag: "Đèn lồng gỗ trên bệ đá, sườn đèn là kết cấu",
    story: "Khối đọc tầng 2 là một chiếc đèn lồng bát giác phình ra ở giữa, bọc lưới gỗ, đặt trên bệ đá tối màu ở tầng 1. Ban đêm cả khối phát sáng trên phố đi bộ Bạch Đằng. Các thanh sườn của đèn lồng chính là cột của tầng 2. Giữa đèn có một giếng trời với 4 cột.",
    why: [["Ý nghĩa", "Đèn lồng Hội An, ánh sáng tri thức. Ban đêm đèn sáng là biển hiệu: thư viện còn mở."], ["Kết cấu là ý tưởng", "Sườn đèn lồng (cách 3,5 m) là cột thép chạy theo mặt cong, tựa lên dầm vòng của bệ đá. Bên trong chỉ có 4 cột quanh giếng trời."], ["Khí hậu", "Lưới gỗ cách kính 0,8 m cản nắng sáng, giảm chói (mục 5.5)."], ["Mô hình", "3 tấm bát giác nối bằng que tre, bọc giấy can. Đặt đèn LED bên trong để chụp ảnh đêm."]],
    kc: { he: "Bệ đá: khung bê tông lưới 8 × 8 m, dầm vòng ở mép trên. Đèn lồng: sườn thép cong theo chu vi cách 3,5 m + 4 cột quanh giếng trời giữa nhà.", nhip: "10–11 m (từ sườn tới cột giữa)", cx: "Phình 2 m ở giữa" },
    qa: [["Mặt cong có khó thi công?", "Sàn bên trong vẫn là bát giác phẳng. Chỉ lớp sườn và lưới gỗ ngoài cong, sườn uốn bằng máy."], ["Lưới gỗ có làm tối?", "Lưới rỗng khoảng 40%, nhìn ra sông vẫn rõ, ánh sáng vào là ánh sáng tán xạ."]],
    cut: "Bệ: foam đen 12 × 33 × 2,25 cm. Đèn: 3 tấm bìa bát giác, nối bằng que tre làm sườn, bọc giấy can. Đèn con: hộp mica nhỏ.",
    build() {
      const oct = (x1, y1, x2, y2, c) => [[x1 + c, y1], [x2 - c, y1], [x2, y1 + c], [x2, y2 - c], [x2 - c, y2], [x1 + c, y2], [x1, y2 - c], [x1, y1 + c]];
      const b = oct(6, 24, 32, 76, 4), m = oct(4, 21.5, 34, 78.5, 5.5), t = oct(7, 25, 31, 75, 4.5);
      const v = [B(6, 14, 24, 16, 0.45, 4.95, "stone", "D", { top: "stoneTop" }), B(6, 30, 24, 14, 0.45, 4.95, "stone", "A", { top: "stoneTop" }), B(6, 44, 10, 36, 0.45, 4.95, "stone", "C", { top: "stoneTop" }), B(16, 44, 14, 18, 0.45, 4.95, "stone", "E", { top: "stoneTop" }), B(16, 62, 14, 18, 0.45, 4.95, "stone", "B", { top: "stoneTop" }), LO(b, m, 4.95, 9.6, "lamp", "B", { fl: 1, ribs: 1.2 }), LO(m, t, 9.6, 13.95, "lamp", "X", { ribs: 1.2 }), PO(oct(9, 28, 29, 72, 3.5), 13.95, 14.6, "stone", "X")];
      for (const [x, y] of [[36, 36], [36, 64], [18, 4]]) v.push(LO(oct(x - 2, y - 2, x + 2, y + 2, 0.7), oct(x - 2.4, y - 2.4, x + 2.4, y + 2.4, 0.8), 0, 2.5, "lamp", "X"), LO(oct(x - 2.4, y - 2.4, x + 2.4, y + 2.4, 0.8), oct(x - 1.8, y - 1.8, x + 1.8, y + 1.8, 0.6), 2.5, 4.6, "lamp", "X"));
      const st = [...grid([6, 14, 22, 30], range(14, 78, 8), 0.45, 4.95)];
      for (let i = 0; i < b.length; i++) { const a = b[i], c2 = b[(i + 1) % b.length], L = Math.hypot(c2[0] - a[0], c2[1] - a[1]), n = Math.round(L / 3.5); for (let j = 0; j < n; j++) { const s = j / n, bp = [a[0] + (c2[0] - a[0]) * s, a[1] + (c2[1] - a[1]) * s], mp = [m[i][0] + (m[(i + 1) % 8][0] - m[i][0]) * s, m[i][1] + (m[(i + 1) % 8][1] - m[i][1]) * s], tp = [t[i][0] + (t[(i + 1) % 8][0] - t[i][0]) * s, t[i][1] + (t[(i + 1) % 8][1] - t[i][1]) * s]; st.push(seg([bp[0], bp[1], 4.95], [mp[0], mp[1], 9.6]), seg([mp[0], mp[1], 9.6], [tp[0], tp[1], 13.95])); } }
      st.push(...grid([15, 23], [44, 56], 4.95, 13.95));
      return { v, st, labels: [[33, 50, 11, "Khối chính · Đèn lồng", 1], [30, 70, 2.4, "Bệ đá"], [36, 64, 4.6, "Đèn lồng con"], [19, 50, 14.6, "Nắp đèn · mái"]] };
    }
  });

  I.push({
    id: "bac", name: "Bậc thềm khán đài", nw: 0, tag: "Mái là khán đài, phòng đa năng nằm dưới bậc",
    story: "Công trình nối tiếp bậc thang Bạch Đằng thành hai khán đài ngoài trời đi lên mái. Khán đài thứ nhất từ quảng trường lên mái tầng 1; bên dưới nó là phòng đa năng có ghế dốc, dùng chung một kết cấu. Khán đài thứ hai từ mái tầng 1 lên mái tầng 2, bên dưới là khu đọc bậc. Trên cùng là vườn đọc và chòi ngắm sông.",
    why: [["Khu đất", "Gắn chặt nhất với bậc thang 5,5 m: từ mép nước có một con dốc người ngồi liên tục lên tới mái."], ["Đời sống", "Mái là khán đài xem cầu Rồng phun lửa và Lễ hội pháo hoa quốc tế Đà Nẵng trên sông Hàn."], ["Kết cấu thông minh", "Phòng đa năng cần sàn dốc, khán đài ngoài trời cũng là sàn dốc: một bản sàn bậc làm hai việc. Mọi cột theo lưới 8 m."], ["Khí hậu", "Mái phủ cỏ giảm nhiệt cho tầng dưới."]],
    kc: { he: "Khung bê tông lưới 8 × 8 m. Hai khán đài là bản sàn bậc bê tông tựa lên dầm xiên, nhịp 10 m và 8 m, phía dưới không cột.", nhip: "10 m (dầm xiên khán đài)", cx: "Không" },
    qa: [["Chống thấm mái khán đài?", "Bản sàn bậc có lớp chống thấm, mặt bậc lát gỗ ngoài trời hoặc đá. Nước chảy theo bậc về rãnh ở chân khán đài."], ["Khán đài có ồn khu đọc?", "Khán đài thứ hai nằm trên khu đọc bậc (cho phép nói chuyện nhỏ). Đọc yên tĩnh đặt ở đầu Bắc tầng 2, xa khán đài."]],
    cut: "Xếp lớp bìa 2 mm như mô hình địa hình: mỗi bậc khán đài 1 lớp cao 2,25 mm lùi 4,5 mm. Dán giấy cỏ lên mặt bậc.",
    build() {
      const v = [B(6, 14, 26, 20, 0.45, 4.95, "glass", "A", { op: 0.85, top: "grass", ribs: 3 }), B(6, 34, 16, 24, 0.45, 4.95, "glass", "C", { op: 0.85, top: "grass", ribs: 3 }), B(6, 58, 26, 26, 0.45, 4.95, "glass", "B", { op: 0.85, top: "grass", ribs: 3 })];
      for (let i = 0; i < 10; i++) { const x = 32 - (i + 1) * 1.0, z = 0.45 + (i + 1) * 0.45; v.push(B(x, 34, 1.0, 24, 0.45, z, "grass", i === 0 ? "D" : "X", { top: "grassTop", fl: i === 0 ? 1 : 0, footOverride: i === 0 ? 240 : 0 })); }
      v.push(B(6, 18, 16, 32, 4.95, 9.45, "zB", "B", { top: "grass", ribs: 0.9 }), B(6, 50, 8, 24, 4.95, 9.45, "zB", "E", { top: "grass", ribs: 0.9 }), B(6, 74, 16, 6, 4.95, 9.45, "zB", "B", { top: "grass", ribs: 0.9 }));
      for (let i = 0; i < 10; i++) { const x = 22 - (i + 1) * 0.8, z = 4.95 + (i + 1) * 0.45; v.push(B(x, 50, 0.8, 24, 4.95, z, "grass", i === 0 ? "B" : "X", { top: "grassTop", fl: i === 0 ? 1 : 0, footOverride: i === 0 ? 192 : 0 })); }
      v.push(B(8, 22, 6, 10, 9.45, 12.45, "glass", "X", { op: 0.8 }));
      const st = [...grid([6, 14, 22, 32], range(14, 84, 8), 0.45, 4.95, (x, y) => !(x === 32 && y > 34 && y < 58) && !(x === 22 && y > 34 && y < 58)), ...grid([6, 14, 22], range(18, 80, 8), 4.95, 9.45, (x, y) => !(x === 14 && y > 50 && y < 74))];
      st.push(seg([32, 34, 0.45], [22, 34, 4.95]), seg([32, 58, 0.45], [22, 58, 4.95]), seg([22, 50, 4.95], [14, 50, 9.45]), seg([22, 74, 4.95], [14, 74, 9.45]));
      return { v, st, labels: [[27, 46, 2.7, "Khối chính · Khán đài", 1], [17, 62, 7.2, "Khán đài thứ hai"], [11, 27, 12.45, "Chòi ngắm sông"], [27, 46, 0.6, "Phòng đa năng dưới bậc"]] };
    }
  });

  I.push({
    id: "ngu", name: "Ngũ Hành Sơn bậc", nw: 0, tag: "Năm ngọn núi lùi bậc đúng theo bước cột",
    story: "Năm ngọn núi Kim, Mộc, Thủy, Hỏa, Thổ dựng bằng các tầng bậc. Mỗi tầng phía trên lùi lại đúng một bước cột (8 m) về phía Tây và một nửa bước về phía Nam, nên mọi cột đều thẳng hàng từ đất lên đỉnh. Mặt các bậc lùi là vườn trồng cây. Núi Thủy ở giữa cao nhất là khu đọc chính.",
    why: [["Bản sắc", "Ngũ Hành Sơn là danh thắng biểu tượng của Đà Nẵng; năm núi ứng với năm nhóm chức năng."], ["Kết cấu sạch", "Bậc lùi theo đúng lưới cột nên không có cột nào phải đặt lên dầm (không cần dầm chuyển). Đây là lỗi của các phương án xếp khối lệch trước."], ["Đời sống", "Mỗi bậc là một sân đọc có cây, mở về phía sông."], ["Mô hình", "Mỗi núi là 2–4 tấm foam xếp chồng, lùi đều 4 cm."]],
    kc: { he: "Khung bê tông lưới 8 × 6 m. Mỗi tầng phía trên dùng lại đúng các cột của tầng dưới; phần lùi là mái của tầng dưới.", nhip: "8 m", cx: "Không" },
    qa: [["Tổng sàn có thấp?", "Khoảng 2.400 m², còn dư 600 m² để nâng thêm một tầng ở núi Thủy hoặc mở rộng núi Hỏa."], ["Vì sao núi lùi về phía Tây?", "Để các bậc vườn quay ra sông, dồn khối cao về phía Trần Phú che nắng chiều."]],
    cut: "Mỗi núi 2–4 tấm foam: tầng dưới rộng 12 cm, mỗi tầng trên hẹp hơn 4 cm. Dán giấy cỏ lên phần mặt lộ ra.",
    build() {
      const v = [], st = [];
      // [y1, y2, số bước theo B–N, nhóm tầng trệt, các tầng [rộng Đ–T, cao]]
      const M = [[12, 24, 2, "D", [[24, 4.5], [16, 3.5]]], [28, 40, 2, "A", [[24, 4.5], [16, 3.5]]], [44, 68, 4, "B", [[24, 4.5], [16, 4.5], [8, 4.5], [8, 3]]], [72, 80, 1, "B", [[24, 4.5], [16, 3]]], [84, 92, 1, "C", [[16, 4.5], [8, 4.5]]]];
      const tones = ["sheet", "blkTop", "sheet", "blk"];
      for (const [y1, y2, nb, zone, tiers] of M) {
        const bay = (y2 - y1) / nb; let z = 0.45;
        tiers.forEach(([w, h], i) => {
          const yy2 = y2 - Math.min(i, nb - 1) * bay;
          v.push(B(6, y1, w, yy2 - y1, z, z + h, tones[i % 4], i === 0 ? zone : (zone === "C" ? "E" : "B"), { top: "grass" }));
          for (const x of range(6, 6 + w, 8)) for (const y of range(y1, yy2, bay)) st.push(col(x, y, z, z + h));
          z += h;
        });
      }
      for (const [y1, y2] of [[24, 28], [40, 44], [68, 72], [80, 84]]) v.push(B(12, y1, 8, y2 - y1, 0.45, 4.2, "glass", "L", { op: 0.75 }));
      return { v, st, labels: [[10, 56, 17.5, "Khối chính · Núi Thủy", 1], [18, 18, 7.5, "Núi Kim · sự kiện"], [18, 76, 7.5, "Núi Hỏa · thiếu nhi"], [26, 60, 4.95, "Bậc vườn"]] };
    }
  });

  I.push({
    id: "cong", name: "Cổng sách", nw: 0, tag: "Cầu đọc bắc qua cổng, dàn thép lộ trên mặt đứng",
    story: "Tầng 1 là hai khối phụ: khối văn hóa ở Bắc, khối thiếu nhi và nghiệp vụ ở Nam. Giữa hai khối là một cổng có mái rộng 12 m, người đi bộ từ đường Trần Phú xuyên qua ra bậc thang Bạch Đằng. Khối chính là cầu đọc sách dài 54 m bắc qua cổng ở tầng 2. Đoạn qua cổng có dàn thép chéo lộ trên mặt đứng và một đèn lồng kính trên mái.",
    why: [["Đô thị", "Cổng mở 24/24 là không gian công cộng, kéo người đi đường vào. Đứng trong cổng nhìn thẳng ra sông."], ["Kết cấu là ý tưởng", "Đoạn qua cổng là dàn thép cao bằng tầng, nhịp 12 m. Đường chéo dàn lộ ra mặt đứng làm điểm nhấn."], ["Công năng", "Hai khối phụ tách rời nên ngoài giờ khóa rất gọn; cổng vẫn mở."], ["Mô hình", "3 hộp chính, que balsa làm thanh chéo dàn."]],
    kc: { he: "Hai khối phụ: khung bê tông lưới 8 × 8 m. Cầu đọc: sàn và mái tựa lên cột của hai khối phụ; đoạn qua cổng là hai dàn thép cao 4,8 m ở hai mặt dọc.", nhip: "12 m qua cổng (dàn thép)", cx: "4 m về phía sông" },
    qa: [["Đi từ sảnh sang khu thiếu nhi phải qua cổng ngoài trời?", "Đúng, nhưng cổng có mái. Ở tầng 2 hai đầu nối liền nhau qua cầu đọc."], ["Đọc yên tĩnh ở trên khu thiếu nhi?", "Sàn tầng 2 dày có lớp cách âm, trần thiếu nhi tiêu âm. Hoặc đổi B2 lên đầu Bắc của cầu đọc."]],
    cut: "Hai khối phụ: foam 12 × 14,5 và 12 × 15,25 cm, cao 2,25 cm. Cầu đọc: foam 14 × 27 × 2,4 cm gác lên. Thanh chéo: que balsa dán trên mặt dọc.",
    build() {
      const v = [B(6, 14, 24, 15, 0.45, 4.95, "zD", "D", { ribs: 0.6, top: "grass" }), B(6, 29, 24, 14, 0.45, 4.95, "zD", "A", { ribs: 0.6, top: "grass" }), B(6, 55, 14, 30.5, 0.45, 4.95, "zA", "B", { ribs: 0.9, top: "grass" }), B(20, 55, 10, 30.5, 0.45, 4.95, "zA", "C", { ribs: 0.9, top: "grass" }), B(6, 22, 28, 21, 4.95, 9.75, "zB", "B", { ribs: 0.7 }), B(6, 43, 28, 12, 4.95, 9.75, "zB", "B", { ribs: 0.7 }), B(6, 55, 10, 21, 4.95, 9.75, "zB", "E", { ribs: 0.7 }), B(16, 55, 18, 21, 4.95, 9.75, "zB", "B", { ribs: 0.7 }), B(10, 43, 20, 12, 9.75, 11.75, "glass", "X", { op: 0.8 })];
      const steps = []; for (let i = 0; i <= 10; i++) steps.push([[28 - i * 0.9, 48, 0.45 + i * 0.45], [28 - i * 0.9, 51, 0.45 + i * 0.45]]);
      v.push(LN(steps), LN([...zig(34, 43, 34, 55, 4.95, 9.75, 4), ...zig(6, 43, 6, 55, 4.95, 9.75, 4)].map(s => [s.a, s.b])));
      const st = [...grid([6, 14, 22, 30], [14, 22, 30, 43], 0.45, 9.75), ...grid([6, 14, 22, 30], [55, 63, 71, 79, 85.5], 0.45, (x, y) => y <= 76 ? 9.75 : 4.95), ...zig(34, 43, 34, 55, 4.95, 9.75, 4), ...zig(6, 43, 6, 55, 4.95, 9.75, 4)];
      return { v, st, labels: [[20, 40, 11.8, "Khối chính · Cầu đọc", 1], [34, 49, 7, "Dàn thép qua cổng"], [33, 49, 1.5, "Cổng sông Hàn"], [18, 80, 4.95, "Khối thiếu nhi"]] };
    }
  });

  I.push({
    id: "lang", name: "Làng sách dưới mái đình", nw: 0, tag: "Sáu nhà nhỏ dưới một tán mái lưới thép",
    story: "Thư viện là một ngôi làng gồm sáu ngôi nhà nhỏ cao thấp khác nhau, cách nhau bằng những con hẻm 4 m như phố cổ. Phủ lên tất cả là một tấm mái lớn mỏng 38 × 90 m như mái đình làng, có các ô lấy sáng đúng trên các hẻm. Mái đỡ bằng 11 cột thép đặt trong hẻm, không cột nào xuyên qua nhà.",
    why: [["Văn hóa", "Đình làng là nơi sinh hoạt cộng đồng của người Việt, đúng vai trò trung tâm văn hóa."], ["Khí hậu", "Mái chung che nắng mưa cho mọi hẻm; gió sông thổi xuyên các hẻm Đông–Tây."], ["Kết cấu tách bạch", "Mái lưới không gian tựa trên cột ở hẻm. Sáu nhà bên dưới là kết cấu riêng, đơn giản, không phải đỡ mái lớn."], ["Diện tích", "Đi lại giữa các nhà là hẻm ngoài trời, không tính sàn."]],
    kc: { he: "Mái: lưới không gian thép dày 1,6 m, tựa trên 11 cột ống thép đặt ở giao điểm các hẻm, nhịp lớn nhất 22 m. Nhà bên dưới: khung bê tông nhỏ lưới 6–8 m.", nhip: "22 m (mái lưới không gian)", cx: "4 m (mép mái)" },
    qa: [["Đi giữa các nhà khi mưa có ướt?", "Mái đua 4–6 m ra ngoài các nhà, ô lấy sáng có kính. Tầng 2 nối các nhà bằng cầu có mái."], ["Kiểm soát ra vào?", "Ban ngày hẻm là không gian công cộng. Ngoài giờ chỉ mở nhà sự kiện và nhà cà phê."]],
    cut: "Mái: tấm mica 19 × 46 cm khoét ô lấy sáng, đỡ bằng 11 que tre cao 6,5 cm. Sáu nhà: hộp foam các màu.",
    build() {
      const v = [B(6, 12, 24, 12, 0.45, 6.45, "zD", "D", { ribs: 0.6 }), B(6, 30, 8, 28, 0.45, 9.45, "zE", "C", { ribs: 2 }), B(6, 58, 8, 28, 0.45, 9.45, "zE", "E", { ribs: 2 }), B(18, 28, 14, 14, 0.45, 5.45, "zA", "A", { ribs: 1.4 }), B(18, 46, 18, 18, 0.45, 9.95, "zB", "B", { ribs: 0.9 }), B(18, 68, 16, 14, 0.45, 9.45, "zC", "B", { ribs: 0.9 }), B(18, 86, 14, 13, 0.45, 4.95, "zB", "B", { ribs: 0.9 })];
      const cols = [[16, 26], [16, 44], [16, 66], [16, 84], [38, 26], [38, 44], [38, 66], [38, 84], [4, 26], [4, 58], [4, 92]];
      for (const [x, y] of cols) v.push(B(x - 0.25, y - 0.25, 0.5, 0.5, 0, 13, "ink", "X"));
      for (const [y1, y2] of [[8, 24], [28, 42], [46, 64], [68, 82], [86, 100]]) v.push(B(2, y1, 38, y2 - y1, 13, 13.6, "canopy", "X", { op: 0.9 }));
      v.push(B(2, 24, 12, 4, 13, 13.6, "canopy", "X"), B(2, 42, 12, 4, 13, 13.6, "canopy", "X"), B(2, 64, 12, 4, 13, 13.6, "canopy", "X"), B(2, 82, 12, 4, 13, 13.6, "canopy", "X"));
      const st = cols.map(([x, y]) => col(x, y, 0, 13));
      for (const [y1, y2] of [[8, 24], [28, 42], [46, 64], [68, 82], [86, 100]]) st.push(...zig(2, (y1 + y2) / 2, 40, (y1 + y2) / 2, 11.4, 13, 10));
      return { v, st, labels: [[30, 54, 13.6, "Khối chính · Mái đình", 1], [34, 55, 6, "Nhà đọc lớn"], [26, 94, 4], [16, 55, 0.5, "Hẻm 4 m · cột mái"]].filter(l => l.length > 3) };
    }
  });

  I.push({
    id: "vong", name: "Vòng mái xanh", nw: 0, tag: "Mái cỏ một nét liền, đi bộ lên được",
    story: "Mái công trình là một dải cỏ liền mạch hình số 8 chạy quanh hai sân trong. Ở hai đầu Bắc và Nam mái dốc xuống sát mặt đất để người dân đi bộ lên; ở giữa mái cao bằng tầng 2. Người dân có thể đi dạo một vòng trên mái, qua đỉnh nhìn ra sông rồi xuống lại. Thư viện nằm dưới mái (học từ trường mầm non Farming Kindergarten của Võ Trọng Nghĩa).",
    why: [["Dẫn chứng Việt Nam", "Học từ công trình đoạt nhiều giải của kiến trúc sư Việt Nam, chứng minh hình khối xanh hợp khí hậu nhiệt đới."], ["Đời sống", "Mái là công viên đi dạo mở cả ngày, nối tiếp phố đi bộ Bạch Đằng."], ["Khí hậu", "Mái cỏ dày giảm nhiệt mạnh; hai sân trong tạo thông gió xuyên phòng."], ["Kết cấu", "Mái dốc là bản sàn nghiêng trên lưới cột 8 m, cột cao thấp theo độ dốc. Không có dầm chuyển."]],
    kc: { he: "Khung bê tông, cột cách nhau 8 m theo hướng Bắc–Nam và 6–8 m theo hướng Đông–Tây, không cột nào đặt trong sân. Mái là bản sàn bê tông nghiêng có lớp đất 40 cm.", nhip: "8 m", cx: "Không" },
    qa: [["Tổng sàn có thấp?", "Khoảng 2.300 m², còn dư 700 m². Có thể kéo dài mỗi đoạn dốc thêm 4 m, hoặc thêm gác lửng dưới đoạn mái cao."], ["Mái cho người đi có ồn khu đọc?", "Lớp đất 40 cm cách âm tốt. Đọc yên tĩnh đặt dưới đoạn mái trồng cây, không có lối đi."]],
    cut: "Dải bìa cứng rộng 4,5 cm theo hình số 8, uốn trên các que đỡ có chiều cao từ 0 (hai đầu) đến 4,75 cm (giữa). Dán bột cỏ. Thân nhà: mica uốn theo.",
    build() {
      const v = [], st = [];
      const h = y => { const d = Math.abs(y - 48); return d <= 18 ? 9.45 : Math.max(0.6, 9.45 - 8.85 * (d - 18) / 16); };
      const court = y => (y >= 22 && y < 38) || (y >= 58 && y < 74);
      for (let y = 14; y < 82; y += 4) {
        const segs = court(y) ? [[6, 14], [22, 34]] : [[6, 34]];
        for (const [x1, x2] of segs) {
          const zone = y < 26 ? "D" : y < 38 ? "A" : y < 62 ? "B" : y < 70 ? "C" : "E";
          const ztop = (x, yy) => h(yy);
          v.push(PO([[x1, y], [x2, y], [x2, y + 4], [x1, y + 4]], 0.45, ztop, "glass", h(y + 2) < 2.6 ? "X" : zone, { op: 0.85, top: "grass", fl: h(y + 2) >= 8.9 ? 2 : h(y + 2) >= 2.6 ? 1 : 0, tagCut: "Dải mái + thân" }));
        }
      }
      for (const x of [6, 14, 22, 28, 34]) for (const y of range(14, 82, 8)) st.push(col(x, y, 0.45, h(Math.min(y, 81.9)) - 0.2));
      for (const [x, y] of [[18, 30], [18, 66]]) v.push(B(x - 1, y - 1, 2, 2, 0, 0.3, "grass", "X"));
      return { v, st, labels: [[27, 48, 9.45, "Khối chính · Vòng mái xanh", 1], [18, 66, 0.5, "Sân trong"], [20, 16, 2, "Mái dốc xuống đất"], [32, 56, 4, "Thư viện dưới mái"]] };
    }
  });

  I.forEach(i => { i.batch = 1; });
  return { ideas: I, K: { B, SH, G, H, FR, V, PO, LO, S3, AR, LN, col, wall, seg, grid, range, zig, inPoly, COV } };
})();
