
/* ================= Đợt 5 · 14. Treo, cầu, nhịp lớn: 8 ý tưởng học từ công trình có thật ================= */
/* Hướng thật lệch 20°: mặt sông (x = 41,5) nhìn Đông Đông Bắc, mặt phố Trần Phú nhìn Tây Tây Nam, đầu Nam nhìn Nam Đông Nam, đầu Bắc nhìn Bắc Tây Bắc. */
(function (G) {
  const { B, PO, LO, S3, LN, col, wall, seg, grid, range, zig } = G.K;
  const { cutX, cutY, colsIn, cables, pylon, stays, rectC } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I = G.ideas7;
  // mặt đứng: sông lam đứng, Trần Phú đặc, đầu Nam mái đua, đầu Bắc kính
  const fDoc = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fLob = { N: "lam", E: "lam", S: "dua", W: "lam" }, fHall = { N: "dac", E: "lam", S: "dac", W: "dac" }, fLow = { N: "dac", E: "lam", S: "dua", W: "dac" };
  // một tầng khối chính (trắng, có lam), đáy ở cao độ z1
  const up = (x, y, w, d, z1, zone, o = {}) => B(x, y, w, d, z1, z1 + 4.5, "sheet", zone, { fa: fDoc, fl: 1, ...M, ...o });
  const upP = (pts, z1, zone, o = {}) => PO(pts, z1, z1 + 4.5, "sheet", zone, { fa: fDoc, fl: 1, ...M, ...o });
  // khối phụ: thấp, nặng, tối
  const low = (x, y, w, d, zone, o = {}) => B(x, y, w, d, 0.45, 4.95, "stone", zone, { fa: fLow, fl: 1, top: "grass", ...o });
  const hall = (x, y, w, d, o = {}) => B(x, y, w, d, 0.45, 6.95, "blk", "D", { fa: fHall, fl: 1, top: "grass", ...o });
  const lobby = (x, y, w, d, o = {}) => B(x, y, w, d, 0.45, 4.95, "glass", "A", { fa: fLob, fl: 1, ...o });
  const core = (x, y, w, d, z2) => B(x, y, w, d, 0.45, z2, "stone", "X", { top: "stoneTop", ...M });
  // nhà sự kiện: tường bao chịu lực, không cột giữa
  const shell = (x, y, w, d, z2) => [wall(x, y, w, 0.3, 0.45, z2), wall(x, y + d - 0.3, w, 0.3, 0.45, z2), wall(x, y, 0.3, d, 0.45, z2), wall(x + w - 0.3, y, 0.3, d, 0.45, z2)];
  const corners = (x, y, w, d, z1, z2) => grid([x, x + w], [y, y + d], z1, z2);
  // đa giác lồi lùi vào trong d mét
  const inset = (pts, d) => {
    const n = pts.length, A = pts.reduce((s, p, i) => { const q = pts[(i + 1) % n]; return s + p[0] * q[1] - q[0] * p[1]; }, 0), sg = A > 0 ? 1 : -1;
    const L = pts.map((p, i) => { const q = pts[(i + 1) % n], dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); return [[p[0] - dy / l * sg * d, p[1] + dx / l * sg * d], [dx, dy]]; });
    return L.map((l, i) => { const [p1, d1] = L[(i + n - 1) % n], [p2, d2] = l, den = d1[0] * d2[1] - d1[1] * d2[0], t = ((p2[0] - p1[0]) * d2[1] - (p2[1] - p1[1]) * d2[0]) / den; return [+(p1[0] + d1[0] * t).toFixed(2), +(p1[1] + d1[1] * t).toFixed(2)]; });
  };

  /* ---------- 14.1 · theo MASP ---------- */
  I.push({
    id: "tr1", fam: "treo", code: "14.1", name: "Hộp đọc treo dưới hai khung đỏ", rule: "Treo dưới khung: dưới rỗng, trên đặc",
    tag: "Hai khung bê tông đỏ nhịp 48 m vắt trên hai mép dọc, hộp đọc 2 tầng treo bên dưới, gầm cao 5 m thành quảng trường",
    story: "Học từ MASP ở São Paulo: thay vì đặt hộp lên cột, ta treo hộp dưới khung. Hai khung bê tông dự ứng lực sơn đỏ chạy dọc hai mép hộp, mỗi khung có hai chân ở hai đầu, nhịp 48 m. Hộp đọc 2 tầng treo dưới dầm khung bằng các thanh treo thép. Mặt đất bên dưới gần như trống: một quảng trường có mái che nhìn ra sông, chỉ có sảnh kính nhỏ ở giữa.",
    why: [W("Quy luật hình khối", "Tương phản dưới rỗng, trên đặc. Bốn chân và hai dầm đỏ là khung, hộp trắng nằm trong khung như bức tranh treo trên giá. Nhìn từ bờ sông thấy rõ ba lớp: khung đỏ, hộp trắng, gầm tối."),
      W("Khối chính – khối phụ", "Hộp đọc chiếm khoảng 73% sàn và 70% thể tích, đỉnh khung +17,95 m. Ba khối phụ chỉ một tầng, đá tối mái cỏ, cao nhất là nhà sự kiện +6,95 m; hộp cao gấp khoảng 2 lần."),
      W("Nắng và chói", "Mặt sông của hộp nhìn Đông Đông Bắc, nắng sớm mùa hè chiếu gần vuông góc nên dùng lam đứng dày. Mặt Trần Phú nhìn Tây Tây Nam, nắng chiều mùa đông chiếu thẳng nên làm đặc. Đầu Bắc kính trong lấy sáng tán xạ; đầu Nam có mái đua."),
      W("Gió và mưa", "Gió Đông Nam mùa hè vào từ đầu Nam, lùa thẳng qua gầm cao 5 m dài 48 m. Gió mùa Đông Bắc và mưa đập vào mặt sông; sảnh kính lùi sâu dưới gầm nên cửa không bị mưa tạt."),
      W("Công năng", "Sàn +5,45: văn phòng nghiệp vụ ở đầu Bắc, đọc mở và thiếu nhi. Sàn +9,95: phòng chuyên đề ở đầu Bắc, đọc yên tĩnh và học nhóm. Nhà sự kiện riêng ở đầu Bắc, chạy ngoài giờ. Kho, giao sách ở dãy thấp phía Tây.")],
    kc: { he: "Hai khung cổng bê tông dự ứng lực: mỗi khung có hai chân 2 × 3 m và một dầm trên cao 3,5 m. Hộp đọc treo dưới dầm trên bằng thanh treo thép đặt mỗi 6 m trong hai mặt dọc; sàn dưới tựa thêm lên dầm dưới cao 1,5 m giữa hai chân. Dầm mái ngang hộp nhịp 20 m.", nhip: "48 m giữa hai chân khung (dầm bê tông dự ứng lực cao 3,5 m)", cx: "Không; hộp nằm gọn giữa bốn chân" },
    qa: [["Dầm bê tông nhịp 48 m có võng không?", "Dầm được căng cáp dự ứng lực, cao 3,5 m, tức khoảng 1/14 nhịp. MASP thật có nhịp khoảng 74 m với cùng cách làm. Sàn hộp treo vào dầm, nên dầm chỉ chịu kéo của thanh treo truyền lên."],
      ["Quảng trường dưới gầm có bị tối?", "Gầm cao 5 m và rộng 20 m, hai đầu Bắc và Nam mở hoàn toàn, mặt sông mở ra bậc thang. Sàn quảng trường lát sáng màu phản sáng lên trần."]],
    cut: "Hộp đọc: 2 lớp foam trắng 10 × 24 × 2,25 cm. Khung đỏ: 4 chân foam 1 × 1,5 × 7,25 cm, 2 dầm 1 × 27 × 1,75 cm, sơn đỏ. Thanh treo: que tre 1 mm. Nhà sự kiện: foam đen 10 × 5,25 × 3,25 cm. Sảnh: mica 7 × 9 × 2,25 cm. Dãy Tây: foam xám 3 × 22 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "Bảo tàng Nghệ thuật São Paulo (MASP)", by: "Lina Bo Bardi", year: "1968", place: "Đại lộ Paulista, São Paulo, Brazil", award: "",
      url: "https://www.architecturelab.net/sao-paulo-museum-of-art-masp-lina-bo-bardi/",
      what: "Khối trưng bày hai tầng được treo dưới hai cặp khung bê tông dự ứng lực sơn đỏ, nhịp khoảng 74 m, để lại một quảng trường trống bên dưới cho người đi bộ.",
      take: "Mượn cách treo hộp dưới khung và trả mặt đất cho quảng trường: hai khung đỏ nhịp 48 m chạy trên hai mép dọc, hộp đọc 2 tầng treo bên dưới, gầm cao 5 m nhìn ra sông Hàn." },
    lab: [[23, 50, 14.45, "Khối chính · Hộp đọc treo dưới hai khung đỏ", 1], [13, 24.5, 17.95, "Khung bê tông nhịp 48 m"], [24, 17, 6.95, "Khối phụ · Nhà sự kiện", 2], [23, 51, 4.95, "Khối phụ · Sảnh kính dưới gầm", 2], [9, 50, 4.95, "Khối phụ · Kho, nghiệp vụ phía Tây", 2], [30, 68, 0.5, "Quảng trường dưới gầm cao 5 m"]],
    build() {
      const red = (x, y, w, d, z1, z2) => B(x, y, w, d, z1, z2, "warn", "X", { top: "warn", ...M });
      const v = [up(13, 26, 20, 12, 5.45, "E"), up(13, 38, 20, 36, 5.45, "B"), up(13, 26, 20, 10, 9.95, "D"), up(13, 36, 20, 38, 9.95, "B"),
        red(12, 23, 2, 3, 0, 14.45), red(12, 74, 2, 3, 0, 14.45), red(32, 23, 2, 3, 0, 14.45), red(32, 74, 2, 3, 0, 14.45),
        red(12, 23, 2, 54, 14.45, 17.95), red(32, 23, 2, 54, 14.45, 17.95), red(12, 26, 2, 48, 3.95, 5.45), red(32, 26, 2, 48, 3.95, 5.45),
        hall(14, 12, 20, 10.5), lobby(16, 42, 14, 18), low(6, 28, 6, 28, "C"), low(6, 56, 6, 16, "E")];
      const hang = [];
      for (const y of range(29, 71, 6)) for (const x of [13, 33]) hang.push(seg([x, y, 14.45], [x, y, 5.45]));
      v.push(cables(hang));
      const st = [...hang, wall(12, 23, 2, 3, 0, 14.45), wall(12, 74, 2, 3, 0, 14.45), wall(32, 23, 2, 3, 0, 14.45), wall(32, 74, 2, 3, 0, 14.45),
        wall(12, 23, 2, 54, 14.45, 17.95), wall(32, 23, 2, 54, 14.45, 17.95), wall(12, 26, 2, 48, 3.95, 5.45), wall(32, 26, 2, 48, 3.95, 5.45),
        ...range(26, 74, 6).map(y => seg([13, y, 14.45], [33, y, 14.45])), ...range(26, 74, 6).map(y => seg([13, y, 5.45], [33, y, 5.45])),
        ...shell(14, 12, 20, 10.5, 6.95), ...corners(16, 42, 14, 18, 0.45, 4.95), ...grid([6, 12], range(28, 72, 8), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.2 · theo Nhà triển lãm Bồ Đào Nha, Expo '98 ---------- */
  I.push({
    id: "tr2", fam: "treo", code: "14.2", name: "Mái võng giữa hai chân neo", rule: "Căng và võng, hai đầu neo nặng",
    tag: "Một tấm mái bê tông mỏng võng xuống giữa hai cổng nặng, che sân giữa nhà sự kiện phía Bắc và nhà đọc 3 tầng phía Nam",
    story: "Học từ nhà triển lãm Bồ Đào Nha ở Expo '98 của Álvaro Siza: một tấm bê tông mỏng như tờ giấy võng xuống giữa hai cổng nặng. Ở đây, cổng phía Bắc tựa vào khối sảnh và nhà sự kiện, cổng phía Nam tựa vào nhà đọc 3 tầng. Giữa hai cổng là sân sông Hàn có mái võng, rộng 19 m, dài 23 m, mở về phía sông. Hai khối nhà hai đầu vừa là công năng vừa là cục neo giữ dây cáp trong mái.",
    why: [W("Quy luật hình khối", "Căng và võng: hai khối nặng đứng hai đầu, ở giữa là một mặt cong mỏng treo trên cáp. Mắt nhìn thấy ngay đường cong của mái, chỗ duy nhất trong cả nhà không phải đường thẳng."),
      W("Khối chính – khối phụ", "Nhà đọc 3 tầng ở đầu Nam chiếm khoảng 72% sàn và 68% thể tích, cao +13,95 m, gấp 2 lần nhà sự kiện. Nhà sự kiện, sảnh và dãy kho đều một tầng, đá tối, nằm thấp."),
      W("Nắng và chói", "Mặt sông của nhà đọc nhìn Đông Đông Bắc: lam đứng dày. Mặt Trần Phú nhìn Tây Tây Nam: đặc. Đầu Nam có mái đua; mặt Bắc của nhà đọc nhìn vào sân có mái võng, lấy sáng tán xạ dịu."),
      W("Gió và mưa", "Sân dưới mái võng mở về phía sông và hở hai mép dưới mái, gió lùa qua. Mưa mùa đông từ phía sông được mái che; nước chảy về giữa mái võng rồi xuống một ống thoát trong cột giữa sân."),
      W("Công năng", "Đầu Bắc: nhà sự kiện có lối riêng từ quảng trường, sảnh và cà phê nhìn ra sân. Sân mái võng dùng cho triển lãm ngoài trời, chợ sách, chiếu phim. Nhà đọc phía Nam: tầng 1 văn phòng và thiếu nhi mở ra vườn Nam, tầng 2 đọc mở, tầng 3 đọc yên tĩnh và phòng chuyên đề.")],
    kc: { he: "Mái võng bê tông dày 25 cm, bên trong có cáp thép căng giữa hai cổng. Mỗi cổng là hai trụ bê tông 3 × 1,6 m và một dầm đầu cao 2 m, giằng ngược vào khối nhà phía sau bằng tường bê tông. Nhà đọc khung bê tông lưới 8 m. Nhà sự kiện tường bao chịu lực.", nhip: "23 m (mái võng giữa hai cổng)", cx: "Không" },
    qa: [["Mái võng kéo hai cổng vào trong, cổng có đổ?", "Không. Lực kéo của cáp truyền vào dầm đầu cổng, rồi qua tường giằng vào khối sảnh phía Bắc và nhà đọc 3 tầng phía Nam. Hai khối này nặng hơn nhiều so với lực kéo, như hai cục đá giữ hai đầu sợi dây phơi."],
      ["Mái mỏng như vậy có rung khi gió bão?", "Mái bê tông 25 cm nặng khoảng 600 kg mỗi mét vuông, cáp được căng trước, nên không rung như mái vải. Nhịp chỉ 23 m, ngắn hơn nhiều so với mái thật ở Lisbon (khoảng 65–70 m)."]],
    cut: "Nhà đọc: 3 lớp foam trắng 12 × 13 × 2,25 cm. Mái võng: bìa trắng 1 mm 9,5 × 11,5 cm, uốn cong, dán hai đầu vào hai cổng. Cổng: 4 trụ foam xám 1,5 × 0,8 × 4,5 cm, 2 dầm 10 × 0,8 × 1 cm. Nhà sự kiện: foam đen 10 × 7 × 3,25 cm. Sảnh: mica 10 × 5 × 2,25 cm. Dãy kho: foam xám 3 × 22 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "Nhà triển lãm Bồ Đào Nha, Expo '98", by: "Álvaro Siza, cùng kỹ sư Cecil Balmond", year: "1998", place: "Lisbon, Bồ Đào Nha", award: "",
      url: "https://www.dezeen.com/2019/08/02/expo98-portuguese-national-pavilion-alvaro-siza-movie-interview/",
      what: "Một tấm mái bê tông mỏng khoảng 20 cm võng xuống ở giữa, giữ bằng cáp thép căng giữa hai cổng bê tông nặng, che một quảng trường dài khoảng 70 m bên sông Tagus.",
      take: "Mượn mái võng căng giữa hai đầu nặng: hai đầu là hai khối nhà có công năng (sảnh, nhà sự kiện và nhà đọc 3 tầng), ở giữa là sân có mái võng nhịp 23 m mở ra sông Hàn." },
    lab: [[22, 75, 13.95, "Khối chính · Nhà đọc 3 tầng, chân neo phía Nam", 1], [24, 49, 7.2, "Mái võng bê tông nhịp 23 m"], [24, 19, 6.95, "Khối phụ · Nhà sự kiện, chân neo phía Bắc", 2], [24, 31, 4.95, "Khối phụ · Sảnh, cà phê", 2], [9, 36, 4.95, "Khối phụ · Kho, nghiệp vụ", 2]],
    build() {
      const y0 = 37.6, y1 = 60.4, L = y1 - y0, yc = (y0 + y1) / 2, zE = 8.2, f = 1.5, zc = y => zE - f * (1 - Math.pow((y - yc) / (L / 2), 2));
      const v = [B(10, 62, 24, 12, 0.45, 4.95, "sheet", "E", { fa: fDoc, fl: 1, ...M }), B(10, 74, 24, 14, 0.45, 4.95, "sheet", "B", { fa: fDoc, fl: 1, ...M }),
        B(10, 62, 24, 26, 4.95, 9.45, "sheet", "B", { fa: fDoc, fl: 1, ...M }), B(10, 62, 24, 18, 9.45, 13.95, "sheet", "B", { fa: fDoc, fl: 1, ...M }), B(10, 80, 24, 8, 9.45, 13.95, "sheet", "D", { fa: fDoc, fl: 1, ...M }),
        hall(14, 12, 20, 14), lobby(14, 26, 20, 10), low(6, 14, 6, 44, "C")];
      // hai cổng neo: hai trụ và một dầm đầu
      for (const [ya, yb] of [[36, 37.6], [60.4, 62]]) v.push(B(14, ya, 3, yb - ya, 0.45, 9.45, "stone", "X", { top: "stoneTop", ...M }), B(31, ya, 3, yb - ya, 0.45, 9.45, "stone", "X", { top: "stoneTop", ...M }), B(17, ya, 14, yb - ya, 7.45, 9.45, "stone", "X", { top: "stoneTop", ...M }));
      // mái võng: 12 dải bê tông mỏng
      const n = 12;
      for (let i = 0; i < n; i++) { const a = y0 + L * i / n, b = y0 + L * (i + 1) / n; v.push(S3([[14.5, a, zc(a)], [33.5, a, zc(a)], [33.5, b, zc(b)], [14.5, b, zc(b)]], 0.25, "sheet", "X", M)); }
      const cab = [];
      for (const x of [15.5, 19.5, 24, 28.5, 32.5]) for (let i = 0; i < n; i++) { const a = y0 + L * i / n, b = y0 + L * (i + 1) / n; cab.push(seg([x, a, zc(a) - 0.12], [x, b, zc(b) - 0.12])); }
      const st = [...cab, wall(14, 36, 3, 1.6, 0.45, 9.45), wall(31, 36, 3, 1.6, 0.45, 9.45), wall(14, 60.4, 3, 1.6, 0.45, 9.45), wall(31, 60.4, 3, 1.6, 0.45, 9.45),
        wall(17, 36, 14, 1.6, 7.45, 9.45), wall(17, 60.4, 14, 1.6, 7.45, 9.45), wall(14, 26, 0.3, 11.6, 0.45, 9.45), wall(33.7, 26, 0.3, 11.6, 0.45, 9.45), wall(14, 60.4, 0.3, 27.6, 0.45, 13.95), wall(33.7, 60.4, 0.3, 27.6, 0.45, 13.95),
        ...grid([10, 18, 26, 34], [62, 70, 78, 88], 0.45, 13.95), ...shell(14, 12, 20, 14, 6.95), ...corners(14, 26, 20, 10, 0.45, 4.95), ...grid([6, 12], range(14, 58, 8.8), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.3 · theo The Twist ---------- */
  I.push({
    id: "tr3", fam: "treo", code: "14.3", name: "Dầm đọc xoắn bắc qua sân sông", rule: "Xoắn dần theo chiều dài",
    tag: "Hộp đọc 2 tầng bắc 32 m qua sân giữa nhà, mái xoắn dần từ dốc về phố ở đầu Bắc sang dốc về sông ở đầu Nam",
    story: "Học từ The Twist của BIG ở Na Uy: một dầm trưng bày bắc qua sông, mặt cắt xoay dần từ đầu này sang đầu kia. Ở đây hộp đọc 2 tầng bắc qua một sân trống dài 32 m giữa hai chân nhà thấp. Sàn vẫn phẳng để đọc sách, nhưng mái xoắn: đầu Bắc mái cao phía Trần Phú, đầu Nam mái cao phía sông. Nhìn từ bờ sông, mép mái chạy chéo lên như dải lụa vặn.",
    why: [W("Quy luật hình khối", "Biến đổi liên tục: mặt cắt mái xoay dần theo chiều dài, tạo một mặt cong yên ngựa ghép từ các dải phẳng. Phần dưới vẫn là hộp đều đặn, nên khối vừa lạ vừa dễ làm."),
      W("Khối chính – khối phụ", "Dầm đọc chiếm khoảng 70% sàn và 66% thể tích, đỉnh mái lên tới +17,95 m. Bốn khối phụ thấp: nhà sự kiện +6,95 m, hai chân nhà +5,45 m, dãy Tây +4,95 m; dầm cao gấp hơn 2 lần."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc: lam đứng. Mặt Trần Phú nhìn Tây Tây Nam: đặc. Ở đầu Nam, mái nhấc cao phía sông thành một dải cửa mái đứng nhìn về Bắc Tây Bắc, lấy sáng tán xạ sâu vào phòng đọc tầng 2."),
      W("Gió và mưa", "Sân dưới dầm mở về phía sông và phía Nam, đón gió Đông Nam mùa hè lùa dưới gầm cao 5 m. Mái xoắn dốc về hai phía khác nhau, nước mưa chảy về hai máng ở hai đầu, không đọng giữa mái."),
      W("Công năng", "Chân Bắc là sảnh và cà phê, nối nhà sự kiện ở đầu Bắc. Chân Nam là kho và giao sách, gần bãi xe. Trên dầm: sàn +5,45 văn phòng và đọc mở, sàn +9,95 đọc yên tĩnh, học nhóm và phòng chuyên đề dưới phần mái cao.")],
    kc: { he: "Hai mặt dọc của dầm là hai dàn thép cao 9 m (2 tầng), gối lên hai chân nhà bê tông ở hai đầu. Mái là các dầm thẳng đặt nghiêng dần, mỗi dầm một góc, ghép thành mặt xoắn; không cần dầm cong.", nhip: "32 m (dàn thép cao 9 m qua sân)", cx: "Không" },
    qa: [["Mái xoắn có khó thi công không?", "Mái là các dầm thép thẳng, mỗi dầm nghiêng một góc hơi khác dầm trước. Tấm lợp là các tấm phẳng nhỏ, mỗi tấm vặn rất ít, như The Twist làm bằng các thanh nhôm thẳng."],
      ["Dầm 32 m có võng giữa sân?", "Dàn thép cao 9 m so với nhịp 32 m là khoảng 1/3,5, rất cứng. Hai đầu gối trên chân nhà bê tông, độ võng giữa nhịp chỉ vài cm."]],
    cut: "Dầm: 2 lớp foam trắng 9 × 26 × 2,25 cm. Mái xoắn: 8 dải bìa trắng 9 × 3,25 cm, mỗi dải cắt vát một góc khác nhau rồi dán nối. Hai chân nhà: foam xám 9 × 5 × 2,5 cm. Nhà sự kiện: foam đen 9 × 6 × 3,25 cm. Dãy Tây: foam xám 3 × 20 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "The Twist, công viên điêu khắc Kistefos", by: "BIG (Bjarke Ingels Group)", year: "2019", place: "Jevnaker, Na Uy", award: "Giải Kiến trúc đẹp nhất, Leading Culture Destinations, Berlin 2020; đứng đầu 10 bảo tàng năm 2019 của Designboom",
      url: "https://big.dk/projects/the-twist-1337",
      what: "Một dầm trưng bày bắc qua sông, mặt cắt xoay dần 90° từ bờ này sang bờ kia, nên tường và mái thành một mặt xoắn ghép từ các thanh thẳng.",
      take: "Mượn ý dầm bắc qua và mặt xoắn: hộp đọc 2 tầng bắc qua sân giữa nhà, sàn giữ phẳng cho dễ dùng, chỉ mái xoay dần từ dốc về phố sang dốc về sông." },
    lab: [[27, 50, 16, "Khối chính · Dầm đọc xoắn bắc qua sân", 1], [27, 19, 6.95, "Khối phụ · Nhà sự kiện", 2], [27, 29, 5.45, "Khối phụ · Chân Bắc: sảnh, cà phê", 2], [27, 71, 5.45, "Khối phụ · Chân Nam: kho, giao sách", 2], [9, 50, 4.95, "Khối phụ · Dãy văn phòng phía Tây", 2], [30, 50, 0.5, "Sân sông dưới gầm"]],
    build() {
      const x1 = 18, x2 = 36, ya = 24, yb = 76, h = (x, y) => { const t = (y - ya) / (yb - ya); return 14.45 + 0.3 + 3.2 * ((1 - t) * (x2 - x) / (x2 - x1) + t * (x - x1) / (x2 - x1)); };
      const v = [up(18, 24, 18, 10, 5.45, "E"), up(18, 34, 18, 42, 5.45, "B"), up(18, 24, 18, 42, 9.95, "B"), up(18, 66, 18, 10, 9.95, "D"),
        hall(18, 12, 18, 12), B(18, 24, 18, 10, 0.45, 5.45, "stone", "A", { fa: fLob, fl: 1, top: "stoneTop" }), B(18, 66, 18, 10, 0.45, 5.45, "stone", "C", { fa: fLow, fl: 1, top: "stoneTop" }), low(6, 30, 6, 40, "E")];
      const n = 8;
      for (let i = 0; i < n; i++) { const a = ya + (yb - ya) * i / n, b = ya + (yb - ya) * (i + 1) / n; v.push(PO([[x1, a], [x2, a], [x2, b], [x1, b]], 14.45, h, "sheet", "X", { top: "sheet", ...M })); }
      const st = [...zig(18, 24, 18, 76, 5.45, 14.45, 8), ...zig(36, 24, 36, 76, 5.45, 14.45, 8),
        ...range(24, 76, 6.5).map(y => seg([x1, y, h(x1, y)], [x2, y, h(x2, y)])),
        wall(18, 24, 18, 0.3, 0.45, 5.45), wall(18, 33.7, 18, 0.3, 0.45, 5.45), wall(18, 66, 18, 0.3, 0.45, 5.45), wall(18, 75.7, 18, 0.3, 0.45, 5.45),
        ...grid([18, 27, 36], [24, 34, 66, 76], 0.45, 5.45), ...shell(18, 12, 18, 12, 6.95), ...grid([6, 12], range(30, 70, 8), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.4 · theo Cầu Tabiat ---------- */
  I.push({
    id: "tr4", fam: "treo", code: "14.4", name: "Hai tầng cầu trên rừng cột cây", rule: "Phân nhánh, hai tầng so le",
    tag: "Hai tầng sàn đọc như hai tầng cầu, lệch nhau 8 m, đứng trên năm cột thép phân nhánh như cây; mặt đất là vườn",
    story: "Học từ cầu đi bộ Tabiat ở Tehran: hai tầng sàn so le đứng trên những cột thép tỏa nhánh như thân cây. Ở đây sàn dưới chạy dọc phía phố, sàn trên lệch về phía sông 8 m và ngắn hơn, chìa ra như ban công dài nhìn sông Hàn. Năm cột cây đỡ hai sàn, mặt đất bên dưới là vườn với vài khối thấp, người đi bộ đi xuyên qua.",
    why: [W("Quy luật hình khối", "Hai lớp ngang so le và một rừng cột phân nhánh. Hai tầng cầu đẩy lệch nhau tạo thế bất đối xứng; nhánh cây thép là chi tiết duy nhất không vuông góc, đọc rõ ngay trên mô hình trắng."),
      W("Khối chính – khối phụ", "Hai tầng cầu chiếm khoảng 70% sàn và 67% thể tích, đỉnh +14,45 m. Bốn khối phụ đều thấp: nhà sự kiện +6,95 m, sảnh, dãy văn phòng, kho +4,95 m; cầu cao gấp hơn 2 lần."),
      W("Nắng và chói", "Mặt sông của tầng trên nhìn Đông Đông Bắc: lam đứng dày. Phần tầng trên chìa ra làm mái che nắng sớm cho mép sông của tầng dưới. Mặt Trần Phú đặc. Đầu Bắc kính trong, đầu Nam mái đua."),
      W("Gió và mưa", "Vườn dưới cầu thông suốt từ đầu Nam đến đầu Bắc, gió Đông Nam mùa hè đi xuyên. Tầng trên chìa về phía sông che mưa tạt mùa đông cho lối đi dưới gầm."),
      W("Công năng", "Sàn dưới +5,45: văn phòng ở đầu Bắc, đọc mở và thiếu nhi dọc phía phố. Sàn trên +9,95: đọc yên tĩnh, học nhóm và phòng trưng bày ở đầu Nam, nhìn sông. Mặt đất: sảnh, nhà sự kiện, kho gần bãi xe, vườn đọc ngoài trời.")],
    kc: { he: "Năm cột cây thép: thân ống cao 3,5 m, trên tỏa 4 nhánh đỡ sàn ở 4 điểm cách nhau khoảng 12 m. Ba cây dưới sàn dưới, hai cây đỡ phần tầng trên chìa ra phía sông. Phần tầng trên còn lại tựa lên sàn dưới. Sàn là dầm thép nhịp ngắn giữa các đầu nhánh.", nhip: "12 m giữa các đầu nhánh", cx: "Tầng trên chìa 10 m qua mép tầng dưới, đỡ bằng hai cây riêng" },
    qa: [["Cột cây có bị đổ ngang?", "Mỗi cây có 4 nhánh tỏa ra bốn hướng nên tự đứng vững như cái kiềng. Năm cây cùng hai lõi thang giữ sàn cả theo chiều dọc lẫn chiều ngang."],
      ["Tầng trên chìa 10 m có cần dây treo?", "Không. Phần chìa ra không treo mà đứng trên hai cây riêng ở phía sông, nhánh của chúng vươn tới mép sàn. Như vậy mỗi nhánh chỉ đỡ một ô sàn khoảng 8 × 8 m."]],
    cut: "Tầng dưới: foam trắng 8 × 32 × 2,25 cm. Tầng trên: foam trắng 9 × 24 × 2,25 cm, dán lệch về phía sông 4 cm. Cột cây: thân que gỗ 3 mm cao 1,75 cm, nhánh dây đồng 1 mm uốn tỏa. Nhà sự kiện: foam đen 7 × 9 × 3,25 cm. Sảnh: mica 6 × 6 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "Cầu đi bộ Tabiat", by: "Leila Araghian, Alireza Behzadi (Diba Tensile Architecture)", year: "2014", place: "Tehran, Iran", award: "Giải Aga Khan về Kiến trúc 2016",
      url: "https://en.wikipedia.org/wiki/Tabiat_Bridge",
      what: "Cầu đi bộ dài khoảng 270 m có hai tầng sàn đặt lệch nhau, đứng trên các cột thép tỏa nhánh như thân cây, nối hai công viên qua đường cao tốc và có nhiều chỗ dừng chân.",
      take: "Mượn hai tầng sàn so le và cột cây phân nhánh: hai sàn đọc như hai tầng cầu, tầng trên chìa về phía sông, cột cây đỡ để mặt đất thành vườn và lối đi xuyên." },
    lab: [[18, 56, 9.95, "Khối chính · Hai tầng cầu đọc so le", 1], [32, 40, 4, "Cột cây thép"], [33, 21, 6.95, "Khối phụ · Nhà sự kiện", 2], [18, 38, 4.95, "Khối phụ · Sảnh kính", 2], [33, 75, 4.95, "Khối phụ · Kho, giao sách", 2], [8.5, 68, 4.95, "Khối phụ · Văn phòng", 2]],
    build() {
      const v = [up(10, 18, 16, 12, 5.45, "E"), up(10, 30, 16, 52, 5.45, "B"), up(18, 26, 18, 36, 9.95, "B"), up(18, 62, 18, 12, 9.95, "D"),
        hall(26, 12, 14, 18), lobby(10, 32, 16, 12), low(28, 66, 10, 18, "C"), low(6, 56, 5, 24, "E"),
        core(10, 50, 5, 5, 15.45), core(10, 82, 5, 5, 10.45)];
      const br = [], trunk = (x, y) => v.push(B(x - 0.5, y - 0.5, 1, 1, 0, 3.5, "sheet", "X", M));
      for (const y of [26, 50, 74]) { trunk(18, y); for (const [dx, dy] of [[-6, -6], [6, -6], [-6, 6], [6, 6]]) br.push(seg([18, y, 3.5], [18 + dx, y + dy, 5.45])); }
      for (const y of [40, 60]) { trunk(32, y); for (const [x, dy] of [[28, -8], [36, -8], [28, 8], [36, 8]]) br.push(seg([32, y, 3.5], [x, y + dy, 9.95])); }
      v.push(LN(br.map(s => [s.a, s.b]), "ink"));
      const st = [...br, ...[26, 50, 74].map(y => col(18, y, 0, 3.5)), ...[40, 60].map(y => col(32, y, 0, 3.5)), wall(10, 50, 5, 5, 0.45, 15.45), wall(10, 82, 5, 5, 0.45, 10.45),
        ...range(18, 82, 8).map(y => seg([10, y, 5.45], [26, y, 5.45])), ...range(26, 74, 8).map(y => seg([18, y, 9.95], [36, y, 9.95])),
        ...shell(26, 12, 14, 18, 6.95), ...corners(10, 32, 16, 12, 0.45, 4.95), ...corners(28, 66, 10, 18, 0.45, 4.95), ...corners(6, 56, 5, 24, 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.5 · theo Trung tâm Vanke ---------- */
  I.push({
    id: "tr5", fam: "treo", code: "14.5", name: "Nhà nằm ngang trên bốn lõi", rule: "Nằm ngang, gãy khúc, treo dây",
    tag: "Một thanh đọc 2 tầng gãy khúc nằm ngang ở độ cao 10 m, đứng trên bốn lõi thang, các nhịp giữ bằng dây văng; mặt đất là vườn",
    story: "Học từ Trung tâm Vanke của Steven Holl ở Thâm Quyến, tòa nhà chọc trời nằm ngang. Thanh đọc 2 tầng gãy một khúc, nâng lên độ cao 10 m trên bốn lõi thang bê tông. Đỉnh lõi nhô lên 3,5 m làm trụ neo dây văng, dây xếp nửa quạt giữ hai đầu thanh và đoạn giữa hai lõi. Mặt đất bên dưới gần như trả lại cho vườn, chỉ có vài khối thấp.",
    why: [W("Quy luật hình khối", "Một nét ngang dài gãy khúc nổi trên vườn, đối lập với bốn lõi đứng. Chỗ gãy khúc tạo hai hướng nhìn: khúc Bắc nhìn quảng trường, khúc Nam nhìn sông."),
      W("Khối chính – khối phụ", "Thanh đọc chiếm khoảng 75% sàn và 72% thể tích, đỉnh +18,95 m, cao gấp 2,7 lần nhà sự kiện. Ba khối phụ một tầng, đá tối, nằm thấp dưới bóng thanh."),
      W("Nắng và chói", "Thanh cao 10 m che bóng cho vườn và các khối thấp. Mặt sông nhìn Đông Đông Bắc: lam đứng. Mặt Trần Phú nhìn Tây Tây Nam: đặc. Hai đầu Bắc kính trong, hai đầu Nam có mái đua."),
      W("Gió và mưa", "Gầm cao 9,5 m gần như thông suốt, gió Đông Nam mùa hè vào từ đầu Nam đi khắp vườn. Gió mùa Đông Bắc và mưa đập vào mặt sông của khúc Nam; khúc này có lam dày và ô văng."),
      W("Công năng", "Lên thanh đọc bằng 4 lõi thang. Khúc Bắc: văn phòng, đọc mở, phòng chuyên đề. Khúc Nam: đọc yên tĩnh, học nhóm, tra cứu số nhìn sông. Mặt đất: nhà sự kiện ở góc Bắc, sảnh kính giữa vườn, kho sát lối Tây.")],
    kc: { he: "Thanh đọc: hai mặt dọc là dàn thép cao 9 m (2 tầng), gối lên 4 lõi thang bê tông 5 × 5 m. Đỉnh lõi nhô 3,5 m neo 4 bó dây văng nửa quạt, đỡ hai đầu đua và đoạn giữa các lõi. Chỗ gãy khúc nối hai dàn bằng nút thép cứng.", nhip: "22–24 m giữa hai lõi, có dây văng đỡ thêm", cx: "6 m ở hai đầu thanh, có dây văng" },
    qa: [["Thanh nặng như vậy đứng trên 4 lõi có lật không?", "Mỗi lõi là ống bê tông 5 × 5 m, móng cọc sâu. Bốn lõi đặt so le theo hai khúc nên chống lật theo mọi hướng. Dây văng neo ngay đỉnh lõi nên lực đi thẳng xuống lõi, không kéo lõi nghiêng."],
      ["Người khuyết tật lên thế nào?", "Cả 4 lõi đều có thang máy. Hai lõi gần sảnh có thang máy lớn chở được xe đẩy sách."]],
    cut: "Thanh đọc: 2 khúc foam trắng 7 × 19 cm và 6,5 × 20 cm, dày 4,5 cm, kê cao 4,75 cm. Lõi: 4 khối foam xám 2,5 × 2,5 × 11 cm. Dây: chỉ trắng. Nhà sự kiện: foam đen 7 × 10 × 3,25 cm. Sảnh: mica 5 × 10 × 2,25 cm. Kho: foam xám 3 × 17 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "Trung tâm Vanke, tòa nhà chọc trời nằm ngang", by: "Steven Holl Architects", year: "2009", place: "Thâm Quyến, Trung Quốc", award: "Giải Danh dự AIA (Institute Honor Award) 2011",
      url: "https://www.stevenholl.com/press-release/steven-holl-architects-horizontal-skyscraper-wins-2011-aia-institute-honor-award/",
      what: "Một khối nhà dài gãy khúc nằm ngang, nâng cao khỏi mặt đất trên một số lõi bê tông; các nhịp giữa lõi được giữ thêm bằng hệ cáp căng, mặt đất bên dưới thành vườn công cộng.",
      take: "Mượn khối nằm ngang nổi trên vườn và lõi kiêm trụ neo cáp: thanh đọc 2 tầng gãy một khúc, bốn lõi thang nhô lên làm trụ dây văng nửa quạt." },
    lab: [[17, 30, 18.95, "Khối chính · Thanh đọc nằm ngang gãy khúc", 1], [30.5, 58.5, 22.45, "Lõi thang kiêm trụ dây"], [31, 24, 6.95, "Khối phụ · Nhà sự kiện", 2], [17, 68, 4.95, "Khối phụ · Sảnh kính giữa vườn", 2], [9, 40, 4.95, "Khối phụ · Kho, nghiệp vụ", 2]],
    build() {
      const zb = 9.95;
      const v = [up(10, 16, 14, 14, zb, "E"), up(10, 30, 14, 24, zb, "B"), up(24, 46, 13, 40, zb, "B"), up(10, 16, 14, 24, zb + 4.5, "B"), up(10, 40, 14, 14, zb + 4.5, "D"), up(24, 46, 13, 40, zb + 4.5, "B"),
        hall(24, 14, 14, 20), lobby(12, 58, 10, 20), low(6, 22, 6, 36, "C")];
      const cores = [[17, 22.5], [17, 46.5], [30.5, 58.5], [30.5, 80.5]].map(([x, y]) => pylon(x, y, 0.45, x, y, 22.45, [5, 5], [5, 5], { c: "stone", top: "stoneTop" }));
      v.push(...cores);
      const ed = (x, ys) => ys.map(y => [x, y, 18.95]);
      const cb = [
        ...stays(cores[0], 19.95, 22.45, ed(10, [16, 28, 33]), [-2.5, 0]), ...stays(cores[0], 19.95, 22.45, ed(24, [16, 28, 33]), [2.5, 0]),
        ...stays(cores[1], 19.95, 22.45, ed(10, [36, 41, 53]), [-2.5, 0]), ...stays(cores[1], 19.95, 22.45, ed(24, [36, 41]), [2.5, 0]),
        ...stays(cores[2], 19.95, 22.45, ed(24, [50, 65, 70]), [-2.5, 0]), ...stays(cores[2], 19.95, 22.45, ed(37, [47, 65, 70]), [2.5, 0]),
        ...stays(cores[3], 19.95, 22.45, ed(24, [73, 77, 86]), [-2.5, 0]), ...stays(cores[3], 19.95, 22.45, ed(37, [73, 77, 86]), [2.5, 0])];
      v.push(cables(cb));
      const st = [...cb, ...[[14.5, 20], [14.5, 44], [28, 56], [28, 78]].map(([x, y]) => wall(x, y, 5, 5, 0, 22.45)),
        ...zig(10, 16, 10, 54, zb, 18.95, 6), ...zig(24, 16, 24, 46, zb, 18.95, 4), ...zig(24, 46, 24, 86, zb, 18.95, 6), ...zig(37, 46, 37, 86, zb, 18.95, 6),
        ...shell(24, 14, 14, 20, 6.95), ...corners(12, 58, 10, 20, 0.45, 4.95), ...grid([6, 12], range(22, 58, 9), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.6 · theo Bảo tàng Hàng hải Đan Mạch ---------- */
  I.push({
    id: "tr6", fam: "treo", code: "14.6", name: "Ba cầu chữ chi qua sân lòng âu", rule: "Chữ chi, lệch tầng",
    tag: "Sân trũng giữa nhà như lòng âu tàu, ba cầu đọc chạy chéo chữ chi qua sân ở ba cao độ khác nhau",
    story: "Học từ Bảo tàng Hàng hải Quốc gia Đan Mạch của BIG: bảo tàng bọc quanh một lòng âu cũ, ba cây cầu hai tầng chạy chéo qua lòng âu. Ở đây giữa nhà là một sân dài lát nước, gợi lòng âu bến cảng sông Hàn. Hai dãy thấp chạy hai bên sân. Ba cầu đọc vắt chéo qua sân theo hình chữ chi; cầu giữa cao 3 tầng, cầu cuối nâng lên một tầng, nên đi từ cầu này sang cầu kia là leo dần lên.",
    why: [W("Quy luật hình khối", "Chữ chi lệch tầng: ba cầu xiên ngược chiều nhau trên mặt bằng và đặt ở ba cao độ khác nhau. Nhìn từ trên cao thấy một đường gấp khúc; nhìn từ sông thấy ba thanh so le chồng lên nhau."),
      W("Khối chính – khối phụ", "Ba cầu đọc chiếm khoảng 70% sàn và 68% thể tích, đỉnh +18,95 m. Hai dãy bên sân và nhà sự kiện đều thấp, đá tối mái cỏ, cao nhất +6,95 m."),
      W("Nắng và chói", "Cầu xiên nên mặt dài nhìn gần Bắc và gần Nam: mặt Bắc kính lấy sáng tán xạ, mặt Nam có mái đua. Đầu cầu phía sông có lam đứng; đầu phía Trần Phú đặc. Sân nước dưới cầu phản ánh sáng dịu lên trần."),
      W("Gió và mưa", "Sân dài mở về đầu Nam và về phía sông giữa hai khối bên, gió Đông Nam mùa hè lùa qua mặt nước làm mát. Ba cầu che mưa cho các lối đi chéo dưới gầm."),
      W("Công năng", "Dãy Tây: kho, nghiệp vụ, văn phòng. Dãy Đông Bắc: sảnh, cà phê. Nhà sự kiện ở góc Đông Nam. Cầu 1: văn phòng và đọc mở. Cầu 2: đọc mở, đọc yên tĩnh, phòng trưng bày tầng trên. Cầu 3: đọc yên tĩnh, học nhóm, cao và xa ồn nhất.")],
    kc: { he: "Mỗi cầu là hai dàn thép cao 2–3 tầng ở hai mặt dài, nhịp 20 m giữa dãy Tây và đầu cột phía Đông. Đầu Tây gối lên cột trong dãy Tây; đầu Đông gối lên cột trong khối sảnh, cột giữa sân và tường nhà sự kiện.", nhip: "20 m (mỗi cầu)", cx: "Không" },
    qa: [["Cầu xiên có làm cột lệch lưới?", "Hai đầu cầu nằm đúng trên hai trục dọc x = 12 m và x = 32 m. Cột chỉ đứng trên hai trục này nên vẫn thẳng hàng; chỉ có thân cầu là xiên."],
      ["Sân nước có làm ẩm khu đọc?", "Nước chỉ sâu 20 cm, chạy tuần hoàn, nằm ngoài trời. Các cầu đọc cách mặt nước 5 m trở lên và kín gió, có điều hòa khi cần."]],
    cut: "Ba cầu: foam trắng cắt hình bình hành 10 × 7 cm (cạnh xiên lệch 5 cm), dày 4,5 cm và 6,75 cm. Dãy Tây: foam xám 3 × 38 × 2,25 cm. Sảnh: mica 4 × 12 × 2,25 cm. Nhà sự kiện: foam đen 4 × 13 × 3,25 cm. Sân nước: giấy xanh.",
    roleOf: () => "p",
    ref: { name: "Bảo tàng Hàng hải Quốc gia Đan Mạch", by: "BIG (Bjarke Ingels Group)", year: "2013", place: "Helsingør, Đan Mạch", award: "Giải Danh dự Kiến trúc AIA 2015; vào chung khảo Giải Mies van der Rohe 2015",
      url: "https://big.dk/projects/danish-maritime-museum-1699",
      what: "Bảo tàng bọc quanh một lòng âu khô cũ; ba cây cầu hai tầng chạy chéo chữ chi qua lòng âu, vừa là lối tắt vừa nối các phòng trưng bày.",
      take: "Mượn sân trũng ở giữa và các cầu chữ chi: sân nước gợi lòng âu bến sông Hàn, ba cầu đọc vắt chéo qua sân ở ba cao độ khác nhau." },
    lab: [[22, 46, 18.95, "Khối chính · Ba cầu đọc chữ chi", 1], [9, 30, 4.95, "Khối phụ · Kho, nghiệp vụ, văn phòng", 2], [36, 24, 4.95, "Khối phụ · Sảnh, cà phê", 2], [36, 75, 6.95, "Khối phụ · Nhà sự kiện", 2], [22, 66, 0.5, "Sân nước lòng âu"]],
    build() {
      const pg = (yw, ye, w) => [[12, yw], [32, ye], [32, ye + w], [12, yw + w]];
      const b1 = pg(16, 26, 14), b2 = pg(52, 42, 14), b3 = pg(70, 80, 14);
      const v = [upP(b1, 5.45, "E"), upP(b1, 9.95, "B"), upP(b2, 5.45, "B"), upP(b2, 9.95, "B"), upP(b2, 14.45, "D"), upP(b3, 9.95, "B"), upP(b3, 14.45, "B"),
        low(6, 12, 6, 48, "C"), low(6, 60, 6, 28, "E"), lobby(32, 12, 8, 24), hall(32, 62, 8, 26), B(13, 13, 18, 76, 0, 0.25, "water", "X")];
      const ends = (p, zt) => [col(p[0][0], p[0][1], 0.45, zt), col(p[3][0], p[3][1], 0.45, zt), col(12, (p[0][1] + p[3][1]) / 2, 0.45, zt), col(p[1][0], p[1][1], 0.45, zt), col(p[2][0], p[2][1], 0.45, zt), col(32, (p[1][1] + p[2][1]) / 2, 0.45, zt)];
      const tr = (p, z1, z2) => [...zig(p[0][0], p[0][1], p[1][0], p[1][1], z1, z2, 6), ...zig(p[3][0], p[3][1], p[2][0], p[2][1], z1, z2, 6)];
      const st = [...ends(b1, 5.45), ...ends(b2, 5.45), ...ends(b3, 9.95), ...tr(b1, 5.45, 14.45), ...tr(b2, 5.45, 18.95), ...tr(b3, 9.95, 18.95),
        ...grid([6, 12], range(12, 88, 8), 0.45, 4.95), ...corners(32, 12, 8, 24, 0.45, 4.95), ...shell(32, 62, 8, 26, 6.95)];
      return { v, st };
    }
  });

  /* ---------- 14.7 · theo Sharp Centre for Design ---------- */
  I.push({
    id: "tr7", fam: "treo", code: "14.7", name: "Mặt bàn đọc trên chân xiên màu", rule: "Nâng bổng trên chân xiên",
    tag: "Một hộp đọc phẳng như mặt bàn, nâng cao 10 m trên sáu cặp chân thép xiên nhiều màu và một lõi thang",
    story: "Học từ Sharp Centre for Design của Will Alsop ở Toronto: một hộp phẳng như mặt bàn, sơn ô, đứng trên những cặp chân xiên nhiều màu. Ở đây hộp đọc 2 tầng nâng lên độ cao 10 m trên sáu cặp chân thép, mỗi cặp tỏa từ một điểm dưới đất ra hai điểm dưới đáy hộp. Một lõi thang bê tông giữa nhà giữ hộp không lắc. Dưới hộp là sân chơi, sảnh kính và nhà sự kiện thấp.",
    why: [W("Quy luật hình khối", "Nặng ở trên, nhẹ ở dưới, và một chút nghịch ngợm: hộp lớn trắng đứng trên những chân mảnh màu sắc nghiêng nhiều hướng. Trên mô hình trắng chỉ cần sơn màu chân là thầy thấy ngay ý."),
      W("Khối chính – khối phụ", "Mặt bàn đọc chiếm khoảng 71% sàn và 68% thể tích, đỉnh +18,95 m, gấp 2,7 lần nhà sự kiện. Bốn khối phụ một tầng, nằm thấp dưới bóng hộp."),
      W("Nắng và chói", "Hộp đọc nằm cao, đón gió và tầm nhìn sông. Mặt sông nhìn Đông Đông Bắc: lam đứng. Mặt Trần Phú nhìn Tây Tây Nam: đặc. Đầu Bắc kính lấy sáng tán xạ; đầu Nam có mái đua. Đáy hộp làm mái che nắng cho sân dưới."),
      W("Gió và mưa", "Sân dưới hộp cao 9,5 m, mở cả bốn phía, gió Đông Nam mùa hè từ đầu Nam thổi suốt. Sảnh kính đặt sâu dưới đáy hộp, tránh mưa tạt từ phía sông."),
      W("Công năng", "Sàn +9,95: văn phòng ở đầu Bắc, đọc mở, thiếu nhi. Sàn +14,45: đọc yên tĩnh, học nhóm, phòng chuyên đề ở đầu Nam. Mặt đất: nhà sự kiện ở đầu Bắc, sảnh kính, dãy kho phía Tây và kho giao sách ở đầu Nam.")],
    kc: { he: "Hộp đọc: hai mặt dọc là dàn thép cao 9 m. Sáu cặp chân ống thép xiên, mỗi cặp chung một móng, tỏa hình chữ V đỡ dàn ở hai điểm cách nhau 10 m. Lõi thang bê tông 5 × 6 m giữ ổn định ngang. Chân xiên theo cả hai phương nên tự chống lắc như cái kiềng.", nhip: "8 m giữa hai cặp chân liền nhau (dàn cao 9 m)", cx: "3–5 m ở hai đầu hộp, nằm trong dàn" },
    qa: [["Chân xiên có bị oằn khi chịu nén?", "Mỗi chân dài khoảng 11 m, ống thép đường kính 80 cm. Chân xiên chia lực theo hai hướng nên mỗi chân chịu ít hơn cột đứng. Sharp Centre thật có chân dài khoảng 30 m vẫn đứng vững từ năm 2004."],
      ["Đi lên hộp bằng gì?", "Lõi thang giữa nhà có thang bộ và hai thang máy, nối thẳng từ sảnh lên hai tầng đọc. Thêm một thang thoát hiểm ngoài trời dọc chân phía Tây khi phát triển mặt bằng."]],
    cut: "Hộp đọc: 2 lớp foam trắng 11 × 24 × 2,25 cm, vẽ ô đen trắng. Chân: 12 que tre 2 mm dài 5,7 cm, sơn đỏ, vàng, xanh, tím, cắm xiên từng cặp vào một chấm keo. Lõi: foam xám 2,5 × 3 × 10 cm. Nhà sự kiện: foam đen 11 × 6 × 3,25 cm. Sảnh: mica 5 × 10 × 2,25 cm.",
    roleOf: () => "p",
    ref: { name: "Sharp Centre for Design, OCAD", by: "Alsop Architects (Will Alsop) cùng Robbie/Young + Wright Architects", year: "2004", place: "Toronto, Canada", award: "Giải RIBA Worldwide Award, đợt trao đầu tiên (2004)",
      url: "https://www.canadianarchitect.com/ocad-building-honoured-by-the-riba/",
      what: "Một hộp phẳng như mặt bàn, sơn ô đen trắng, nâng cao khoảng 26 m trên các cặp chân thép xiên nhiều màu, nối với tòa nhà cũ bằng một lõi thang.",
      take: "Mượn hộp mặt bàn trên chân xiên màu: hộp đọc 2 tầng nâng 10 m trên sáu cặp chân chữ V và một lõi thang, mặt đất bên dưới thành sân chơi có mái." },
    lab: [[23, 50, 18.95, "Khối chính · Mặt bàn đọc trên chân xiên", 1], [21, 18, 6.95, "Khối phụ · Nhà sự kiện", 2], [23, 46, 4.95, "Khối phụ · Sảnh kính", 2], [8.5, 50, 4.95, "Khối phụ · Kho, văn phòng", 2], [22, 83, 4.95, "Khối phụ · Kho giao sách", 2]],
    build() {
      const zb = 9.95, CL = ["warn", "gold", "accent", "violet", "accessC", "ribbon"];
      const v = [up(12, 26, 22, 10, zb, "E", { ribs: 2 }), up(12, 36, 22, 38, zb, "B", { ribs: 2 }), up(12, 26, 22, 38, zb + 4.5, "B", { ribs: 2 }), up(12, 64, 22, 10, zb + 4.5, "D", { ribs: 2 }),
        hall(10, 12, 22, 12), lobby(18, 36, 10, 20), low(6, 28, 5, 28, "C"), low(6, 56, 5, 20, "E"), low(14, 78, 16, 10, "C"), core(20, 56, 5, 6, 20.45)];
      const legs = [];
      let k = 0;
      for (const y of [32, 50, 68]) for (const [gx, ex] of [[16, 12.6], [30, 33.4]]) {
        const c = CL[k++ % CL.length];
        v.push(B(gx - 1, y - 1, 2, 2, 0, 0.45, "stone", "X", { top: "stoneTop", ...M }));
        for (const dy of [-5, 5]) { v.push(LO(rectC(gx, y, 0.8, 0.8), rectC(ex, y + dy, 0.8, 0.8), 0.45, zb, c, "X", { top: c, ...M })); legs.push(seg([gx, y, 0.45], [ex, y + dy, zb])); }
      }
      const st = [...legs, wall(20, 56, 5, 6, 0.45, 20.45), ...zig(12, 26, 12, 74, zb, 18.95, 6), ...zig(34, 26, 34, 74, zb, 18.95, 6),
        ...range(26, 74, 8).map(y => seg([12, y, zb], [34, y, zb])),
        ...shell(10, 12, 22, 12, 6.95), ...corners(18, 36, 10, 20, 0.45, 4.95), ...grid([6, 11], range(28, 76, 8), 0.45, 4.95), ...corners(14, 78, 16, 10, 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 14.8 · theo Dokk1 ---------- */
  const DK = [[13, 34], [28, 31], [35, 42], [34, 64], [27, 80], [13, 78], [10, 56]], DKg = inset(DK, 4);
  I.push({
    id: "tr8", fam: "treo", code: "14.8", name: "Đĩa đa giác nổi trên sảnh kính", rule: "Đa giác tự do, đua đều bốn phía",
    tag: "Khối đọc 2 tầng hình đa giác 7 cạnh, đua 4 m quanh một tầng sảnh kính lùi vào trong; mái mỏng chìa thêm ra",
    story: "Học từ Dokk1, thư viện ở Aarhus đoạt giải Thư viện công cộng của năm 2016: tầng dưới bằng kính lùi vào, tầng trên lớn hơn chìa ra bốn phía, như một chiếc đĩa đặt trên cái cốc. Ở đây khối đọc 2 tầng có mặt bằng 7 cạnh, không cạnh nào song song với ranh đất, chìa 4 m quanh tầng sảnh. Mái là tấm mỏng chìa thêm 1,5 m, viền sáng như vành đĩa. Nhà sự kiện là khối đen thấp riêng ở đầu Bắc.",
    why: [W("Quy luật hình khối", "Một hình đa giác tự do nổi trên một chân lùi vào trong. Các cạnh xiên làm khối đổi dáng khi đi vòng quanh, nhưng cột bên trong vẫn theo lưới 8 m thẳng từ móng lên mái."),
      W("Khối chính – khối phụ", "Khối đa giác 2 tầng chiếm khoảng 73% sàn và 68% thể tích, đỉnh +14,45 m, cao gấp 2 lần nhà sự kiện. Tầng sảnh kính và nhà sự kiện là khối phụ, thấp và lùi vào bóng của đĩa."),
      W("Nắng và chói", "Phần đua 4 m làm ô văng cho cả tầng sảnh kính. Cạnh nhìn sông (Đông Đông Bắc) có lam đứng; cạnh nhìn Trần Phú (Tây Tây Nam) đặc; cạnh Bắc kính; cạnh Nam mái đua. Mái chìa 1,5 m che thêm nắng trưa."),
      W("Gió và mưa", "Quanh chân sảnh là hiên rộng 4 m có mái, gió Đông Nam mùa hè từ đầu Nam lùa quanh hiên. Mưa mùa đông từ phía sông không tạt tới cửa kính vì cửa lùi sâu 4 m."),
      W("Công năng", "Tầng sảnh: sảnh, cà phê, mượn trả ở phía sông; kho và nghiệp vụ ở phía Trần Phú. Tầng +5,45: văn phòng ở đầu Bắc, đọc mở, thiếu nhi. Tầng +9,95: đọc yên tĩnh, học nhóm, phòng chuyên đề ở đầu Nam. Nhà sự kiện riêng ở đầu Bắc.")],
    kc: { he: "Khung bê tông lưới 8 m, cột thẳng từ móng lên mái, đứng trong phạm vi tầng sảnh. Hai tầng trên đua 4 m quanh chu vi bằng dầm công xôn và sàn bê tông dự ứng lực. Hai lõi thang bê tông giữ ổn định. Mái chìa 1,5 m là tấm thép mỏng.", nhip: "8 m (lưới cột)", cx: "4 m quanh chu vi, thêm 1,5 m tấm mái" },
    qa: [["Đua 4 m đều bốn phía có cần dây treo?", "Không. 4 m nằm trong khả năng của dầm công xôn bê tông dự ứng lực cao 0,9 m. Đua đều bốn phía còn giúp cân bằng: phần chìa bên này cân với bên kia qua cột."],
      ["Mặt bằng 7 cạnh có khó bố trí phòng?", "Lưới cột bên trong vẫn vuông 8 × 8 m. Các góc xiên chỉ nằm ở dải sát chu vi, dùng làm chỗ ngồi đọc bên cửa sổ, góc kệ sách, góc học nhóm."]],
    cut: "Khối đa giác: 2 lớp foam trắng cắt theo mẫu 7 cạnh, mỗi lớp dày 2,25 cm. Tầng sảnh: mica cắt theo mẫu lùi vào 2 cm, cao 2,5 cm. Tấm mái: bìa trắng 1 mm, lớn hơn mẫu 0,75 cm. Nhà sự kiện: foam đen 11 × 7 × 3,25 cm.",
    roleOf: () => "p",
    ref: { name: "Dokk1", by: "Schmidt Hammer Lassen Architects", year: "2015", place: "Aarhus, Đan Mạch", award: "Thư viện công cộng của năm IFLA 2016",
      url: "https://www.gooood.cn/en/dokk1-by-shl.htm",
      what: "Thư viện trên bến cảng: tầng dưới bằng kính lùi vào, phía trên là một khối nhiều cạnh lớn hơn chìa ra xung quanh, đặt trên một nền nối thành phố với mặt nước.",
      take: "Mượn khối nhiều cạnh nổi trên tầng kính lùi vào: khối đọc 7 cạnh đua đều 4 m, tầng sảnh kính thành hiên có mái bao quanh, viền mái mỏng chìa thêm như vành đĩa." },
    lab: [[23, 56, 14.45, "Khối chính · Đĩa đọc đa giác 7 cạnh", 1], [21, 19, 6.95, "Khối phụ · Nhà sự kiện", 2], [27, 60, 5.45, "Khối phụ · Tầng sảnh kính lùi vào", 2], [15, 60, 5.45, "Khối phụ · Kho, nghiệp vụ", 2]],
    build() {
      const gA = cutX(DKg, 20, 40), gC = cutX(DKg, 0, 20);
      const v = [upP(cutY(DK, 0, 44), 5.45, "E"), upP(cutY(DK, 44, 100), 5.45, "B"), upP(cutY(DK, 0, 72), 9.95, "B"), upP(cutY(DK, 72, 100), 9.95, "D"),
        PO(inset(DK, -1.5), 14.45, 14.85, "sheet", "X", { top: "sheet", ...M }),
        PO(gA, 0.45, 5.45, "glass", "A", { fa: fLob, fl: 1 }), PO(gC, 0.45, 5.45, "stone", "C", { fa: fLow, fl: 1, top: "stoneTop" }),
        hall(10, 12, 22, 14), core(19, 46, 5, 5, 15.45), core(21, 64, 5, 5, 15.45)];
      const st = [...colsIn([DKg], range(14, 38, 8), range(36, 84, 8), 0.45, 14.45), wall(19, 46, 5, 5, 0.45, 15.45), wall(21, 64, 5, 5, 0.45, 15.45), ...shell(10, 12, 22, 14, 6.95)];
      return { v, st };
    }
  });
})(window.G3);
