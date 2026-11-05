
/* ================= Đợt 4: theo ảnh mẫu đợt 2 (chuỗi thanh gãy khúc, thanh mái dốc có hộp vắt ngang, thanh nâng bắc qua các thanh thấp) ================= */
(function (G) {
  const { B, SH, col } = G.K;
  const { FA } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I6 = G.ideas6 = G.ideas6 || [];
  const Z = k => 0.45 + 4.5 * k;
  const FD = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khối đọc
  const FS = { N: "dac", E: "lam", S: "dua", W: "dac" }; // khối kín
  const FG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // hộp kính
  // một tầng của một khối: [x, y, rộng, sâu] ở tầng k
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // cột quanh chu vi khối, khoảng cách ≤ step, chạy thẳng từ móng lên đỉnh
  function perim(x, y, w, d, z2, step = 8) {
    const o = [], nx = Math.max(1, Math.ceil(w / step)), ny = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= nx; i++) for (const yy of [y, y + d]) o.push(col(x + w * i / nx, yy, 0, z2));
    for (let j = 1; j < ny; j++) for (const xx of [x, x + w]) o.push(col(xx, y + d * j / ny, 0, z2));
    return o;
  }
  // hàng cột chống (pilotis) dưới phần khối nâng: hiện thành cột thật trong mô hình và có trong kết cấu
  function pilotis(v, st, xs, ys, zTop, zColTop, skip = () => false) {
    for (const x of xs) for (const y of ys) {
      st.push(col(x, y, 0, zColTop));
      if (!skip(x, y)) v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, zTop, "sheet", "X"));
    }
  }

  /* ---------- 11.7: chuỗi thanh gãy khúc ôm sân, hộp kính đặt giữa sân ---------- */
  I6.push({
    id: "mu7", fam: "mau", code: "11.7", from: "ảnh đợt 2", name: "Chuỗi thanh gãy khúc ôm sân kính", rule: "Gấp khúc liên tục, đặc – rỗng",
    tag: "Ba thanh nối nhau gãy hai lần ôm một sân, thanh cuối nâng trên hàng cột; giữa sân đặt một hộp kính thấp",
    story: "Lấy từ hai ảnh: mô hình nan gỗ có chuỗi thanh gãy khúc, đoạn cuối nâng lên trên hàng cột; và mô hình trắng có hộp kính đặt vào sân giữa hai thanh dài. Ở đây ba thanh nối thành chữ U gãy: thanh Bắc ba tầng làm mặt đón quảng trường, thanh Tây hai tầng làm lưng kho, thanh Nam hai tầng nâng trên hàng cột để sân mở về phía Nam. Hộp kính một tầng nằm giữa sân là nơi trưng bày.",
    why: [W("Quy luật hình khối", "Chuỗi gấp khúc: một dải khối đi liền, gãy hai lần, cao thấp khác nhau (3 tầng, 2 tầng, 2 tầng nâng). Tương phản đặc – rỗng giữa chuỗi khối đặc và hộp kính nhỏ ở giữa sân."),
      W("Khối chính – khối phụ", "Khối chính là cả chuỗi ba thanh, chiếm khoảng 3/4 sàn và cao +13,95. Khối phụ là hộp kính trưng bày, nhà sự kiện và khối hỗ trợ ở đầu Nam, đều thấp, tối màu hoặc trong suốt."),
      W("Nắng và chói", "Mặt Trần Phú nhìn Tây Tây Nam (250°) đặc hoàn toàn. Mặt sông nhìn Đông Đông Bắc (70°) có lam. Thanh Bắc quay mặt kính về hướng Bắc lệch Tây lấy sáng tán xạ cho phòng đọc."),
      W("Gió và mưa", "Gió Đông Nam mùa hè vào từ đầu Nam, lùa qua gầm thanh Nam nâng trên cột vào sân. Gió Đông Bắc mùa đông bị thanh Bắc chặn, sân kín gió."),
      W("Công năng", "Thanh Bắc tầng 1 là sảnh, cà phê; thanh Tây tầng 1 là kho và nghiệp vụ sát lối Tây; tầng 2, 3 là phòng đọc. Nhà sự kiện riêng ở đầu Nam, có lối riêng.")],
    kc: { he: "Khung bê tông lưới 4–8 m, cột thẳng từ móng lên mái. Thanh Nam nâng trên lưới cột 4 × 5,6 m, gầm cao 4,5 m. Nhà sự kiện khung riêng, dàn mái nhịp 18 m.", nhip: "18 m (nhà sự kiện)", cx: "Không: phần nâng đứng trên hàng cột" },
    qa: [["Thanh Nam nâng lên có cần dầm lớn không?", "Không. Bên dưới có lưới cột cách nhau 4 m và 5,6 m, mỗi điểm sàn cách cột gần nhất dưới 4 m nên chỉ cần dầm thường."],
      ["Hộp kính giữa sân có nóng không?", "Hộp chỉ cao một tầng, nằm trong bóng của thanh Bắc và thanh Tây vào buổi chiều; mặt Đông và Tây có lam, mặt Nam có mái đua."]],
    cut: "Thanh Bắc: 3 lớp foam 12 × 6 × 2,25 cm. Thanh Tây: 2 lớp foam 6 × 16 cm. Thanh Nam: 2 lớp foam 8 × 5,6 cm kê trên 15 que tre 3 mm cao 2,25 cm. Hộp kính: mica 5 × 7,5 × 2,25 cm. Nhà sự kiện: foam đen 9 × 9,75 × 3,5 cm.",
    roleOf: () => "p",
    lab: [[20, 20, 13.95, "Khối chính · Chuỗi ba thanh gãy khúc", 1], [29, 39, 4.95, "Khối phụ · Hộp kính trưng bày", 2], [17, 79, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [29, 78, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2], [28, 58, 2.2, "Gầm nâng trên cột"]],
    build() {
      const v = [], st = [];
      // thanh Bắc 3 tầng
      v.push(fl(8, 14, 14, 12, 0, "sheet", "A", FD, M), fl(22, 14, 10, 12, 0, "sheet", "E", FD, M), fl(8, 14, 24, 12, 1, "sheet", "B", FD, M), fl(8, 14, 24, 12, 2, "sheet", "B", FD, M));
      // thanh Tây 2 tầng
      v.push(fl(8, 26, 12, 25, 0, "stone", "C", FS, M), fl(8, 51, 12, 7, 0, "stone", "E", FS, M), fl(8, 26, 12, 32, 1, "sheet", "B", FD, M));
      // thanh Nam nâng trên cột, 2 tầng
      v.push(fl(20, 52, 16, 11.2, 1, "sheet", "B", FD, M), fl(20, 52, 16, 11.2, 2, "sheet", "B", FD, M));
      pilotis(v, st, [20, 24, 28, 32, 36], [52, 57.6, 63.2], Z(1), Z(3), (x, y) => x === 20 && y <= 58);
      // hộp kính giữa sân, nhà sự kiện, khối hỗ trợ
      v.push(B(24, 32, 10, 15, Z(0), Z(1), "glass", "A", { fa: FG, fl: 1 }));
      v.push(B(8, 69, 18, 19.5, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }), B(26, 68, 6, 21, 0.45, 4.95, "stone", "E", { fa: FS, fl: 1 }));
      st.push(...perim(8, 14, 24, 12, Z(3)), ...perim(8, 26, 12, 32, Z(2)), ...perim(24, 32, 10, 15, Z(1), 5), ...perim(8, 69, 18, 19.5, 7.45, 6), ...perim(26, 68, 6, 21, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 11.8: thanh dài mái dốc, hộp hai tầng vắt ngang ra phía sông ---------- */
  I6.push({
    id: "mu8", fam: "mau", code: "11.8", from: "ảnh đợt 2", name: "Thanh mái dốc, hộp vắt chữ thập", rule: "Hai trục vuông góc, chồng và vươn",
    tag: "Một thanh dài hai tầng mái dốc về hai đầu, một hộp hai tầng đặt vắt ngang, vươn ra phía sông trên hàng cột",
    story: "Lấy từ ba ảnh mô hình thư viện trắng: một thanh dài mái một dốc, bị một hộp vuông góc cắt ngang và nhô ra, cạnh đó là sân đọc có tường thấp. Ở đây thanh dài chạy dọc khu đất, mái dốc lên từ hai đầu về chỗ giao; hộp đọc hai tầng nằm vắt ngang ở giữa, vươn 14 m về phía sông, bên dưới là hàng cột tạo hiên lớn. Góc Đông Bắc là sân đọc ngoài trời có tường thấp bao quanh.",
    why: [W("Quy luật hình khối", "Hai trục vuông góc: thanh dài nằm thấp theo trục Bắc – Nam, hộp nằm cao theo trục Đông – Tây. Mái hai đoạn dốc lên về chỗ giao nên mắt nhìn dồn về hộp vắt ngang."),
      W("Khối chính – khối phụ", "Khối chính là thanh dài và hộp vắt ngang, chiếm gần 90% sàn, cao +13,95. Khối phụ duy nhất là nhà sự kiện thấp +7,45 ở góc Đông Nam."),
      W("Nắng và chói", "Mặt Trần Phú đặc. Mặt sông có lam. Đầu hộp vươn ra sông có mái đua sâu che nắng sáng cho hiên bên dưới."),
      W("Gió và mưa", "Hiên dưới hộp vươn ra mở về phía sông và phía Nam, gió hè lùa qua. Mái dốc thoát nước về hai đầu thanh."),
      W("Công năng", "Tầng 1 thanh dài: sảnh, đọc mở, hỗ trợ, kho ở đầu Nam gần bãi giao nhận. Tầng 2 dưới mái dốc là phòng đọc và văn phòng; hộp vắt ngang là phòng đọc yên tĩnh nhìn sông.")],
    kc: { he: "Thanh dài khung bê tông lưới 8 m. Hộp vắt ngang tựa lên thanh dài ở phía Tây và lên lưới 12 cột ở phía Đông (cách 5 m × 4,7 m). Nhà sự kiện có dàn mái nhịp 14 m.", nhip: "14 m (nhà sự kiện)", cx: "Không: phần hộp vươn ra đứng trên hàng cột" },
    qa: [["Hộp vươn 14 m có an toàn không?", "Phần vươn ra không treo hẫng mà đứng trên 12 cột cách nhau 5 m × 4,7 m, giống hàng hiên. Mỗi điểm sàn cách cột gần nhất dưới 4 m."],
      ["Mái dốc có làm phòng tầng 2 thấp không?", "Chỗ thấp nhất ở đầu thanh vẫn cao 4,5 m tính từ sàn, chỗ cao nhất 7 m sát hộp, nên vẫn đặt được kệ và bậc đọc."]],
    cut: "Thanh dài tầng 1: foam 8 × 30 × 2,25 cm. Tầng 2: hai khối foam cắt vát (cao 2,25 → 3,5 cm). Hộp vắt ngang: foam 15 × 7 × 4,5 cm. 12 que tre 3 mm cao 2,25 cm. Nhà sự kiện: foam đen 7 × 12,5 × 3,5 cm. Tường sân đọc: bìa 0,6 cm.",
    roleOf: () => "p",
    lab: [[24, 47, 13.95, "Khối chính · Thanh mái dốc và hộp vắt ngang", 1], [33, 72, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [33, 27, 1.2, "Sân đọc tường thấp"], [33, 47, 2.2, "Hiên dưới hộp vươn ra"]],
    build() {
      const v = [], st = [];
      // tầng 1 thanh dài
      v.push(fl(8, 20, 16, 20, 0, "sheet", "A", FD, M), fl(8, 40, 16, 12, 0, "sheet", "B", FD, M), fl(8, 52, 16, 9, 0, "stone", "E", FS, M), fl(8, 61, 16, 19, 0, "stone", "C", FS, M));
      // tầng 2 dưới mái dốc lên về chỗ giao
      v.push(SH(8, 20, 16, 20, Z(1), 9.45, 11.95, "+y", "sheet", "B", { fa: FD, fl: 1, ...M }));
      v.push(SH(8, 54, 16, 12, Z(1), 10.8, 11.95, "-y", "sheet", "E", { fa: FD, fl: 1, ...M }), SH(8, 66, 16, 14, Z(1), 9.45, 10.8, "-y", "sheet", "B", { fa: FD, fl: 1, ...M }));
      // hộp vắt ngang 2 tầng, vươn ra phía sông trên hàng cột
      v.push(fl(8, 40, 30, 14, 1, "sheet", "B", FD, M), fl(8, 40, 30, 14, 2, "sheet", "B", FD, M));
      pilotis(v, st, [28, 33, 38], [40, 44.67, 49.33, 54], Z(1), Z(3));
      // nhà sự kiện, tường sân đọc
      v.push(B(26, 60, 14, 25, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }));
      v.push(B(27, 20, 12, 0.3, 0, 1.2, "sheet", "X"), B(38.7, 20, 0.3, 14, 0, 1.2, "sheet", "X"), B(27, 33.7, 8, 0.3, 0, 1.2, "sheet", "X"));
      st.push(...perim(8, 20, 16, 60, Z(2)), ...perim(8, 40, 30, 14, Z(3), 7.5), ...perim(26, 60, 14, 25, 7.45, 6));
      return { v, st };
    }
  });

  /* ---------- 11.9: thanh đọc dài nằm vắt qua ba thanh thấp và hai sân ---------- */
  I6.push({
    id: "mu9", fam: "mau", code: "11.9", from: "ảnh đợt 2", name: "Thanh đọc dài vắt qua ba thanh thấp", rule: "Chồng vuông góc, nhịp thanh – sân",
    tag: "Ba thanh một tầng chạy ngang khu đất xen hai sân hẹp; một thanh đọc hai tầng chạy dọc nằm vắt qua cả ba, có hai lõi thang nhô cao",
    story: "Lấy từ hai ảnh: mô hình bìa nâu nhiều thanh dài xếp lớp quanh các sân, và mô hình trắng có thanh dài nằm trên cao vắt qua các thanh thấp, hai lõi thang đứng lên như hai cột mốc. Ở đây ba thanh thấp chạy theo hướng Đông – Tây, giữa là hai sân rộng 8 m; thanh đọc hai tầng chạy theo hướng Bắc – Nam nằm đè lên cả ba, bắc qua hai sân như hai nhịp cầu ngắn.",
    why: [W("Quy luật hình khối", "Nhịp lặp thanh – sân – thanh ở dưới, cắt bởi một thanh dài vuông góc ở trên. Hai lõi thang cao hơn mái làm điểm nhấn đứng, đặt lệch hai bên thanh để bố cục không đối xứng."),
      W("Khối chính – khối phụ", "Khối chính là thanh đọc trên cao cùng ba thanh nền nó tựa lên, chiếm gần 90% sàn, cao +13,95. Khối phụ là nhà sự kiện thấp ở đầu Nam."),
      W("Nắng và chói", "Mặt Trần Phú các thanh đều đặc. Đầu các thanh thấp nhìn ra sông có lam. Hai sân hẹp 8 m luôn có bóng của thanh trên cao vào giữa trưa."),
      W("Gió và mưa", "Hai sân mở thông ra phía sông, gió Đông Nam mùa hè lùa qua gầm thanh trên cao. Mưa tạt mặt sông được thanh trên cao che một phần."),
      W("Công năng", "Thanh Bắc là sảnh và đón tiếp, thanh giữa là vệ sinh, văn phòng, thanh Nam là kho và nghiệp vụ gần bãi giao nhận. Thanh trên cao là toàn bộ khu đọc, tách khỏi ồn ào bên dưới.")],
    kc: { he: "Khung bê tông lưới 8 m. Thanh trên cao tựa lên tường và cột của ba thanh dưới; qua mỗi sân 8 m dùng dầm thường. Hai lõi thang bê tông chạy suốt từ móng lên mái.", nhip: "8 m (qua sân); 19,5 m (nhà sự kiện)", cx: "2 m ở đầu Nam thanh trên cao" },
    qa: [["Thanh trên cao bắc qua sân có cần cột không?", "Không. Mỗi sân chỉ rộng 8 m, thanh trên cao tựa lên hai thanh hai bên sân, như một dầm sàn thường. Mỗi điểm sàn cách chỗ tựa không quá 4 m."],
      ["Sân hẹp 8 m có tối không?", "Sân hở hai đầu Đông và Tây, nắng sáng và ánh sáng tán xạ vào theo chiều dài sân; phần dưới thanh trên cao là hiên mát để ngồi."]],
    cut: "Ba thanh nền: foam 15,6 × 5 × 2,25 cm, 16,2 × 5 × 2,25 cm, 15 × 5 × 2,25 cm. Thanh đọc: 2 lớp foam 7 × 24 cm, mỗi lớp 2,25 cm. Hai lõi: foam đen 2 × 3 × 7,5 cm. Nhà sự kiện: foam đen 9,75 × 9 × 3,5 cm.",
    roleOf: () => "p",
    lab: [[22, 44, 13.95, "Khối chính · Thanh đọc vắt qua ba thanh thấp", 1], [17, 79, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [34, 34, 1.5, "Sân 8 m"], [31, 34, 15.45, "Lõi thang"]],
    build() {
      const v = [], st = [];
      // ba thanh nền một tầng
      v.push(fl(8, 20, 31.2, 10, 0, "sheet", "A", FD, M), fl(6, 38, 32.4, 10, 0, "stone", "E", FS, M), fl(6, 56, 30, 10, 0, "stone", "C", FS, M));
      // thanh đọc 2 tầng tựa lên ba thanh nền
      v.push(fl(15, 20, 14, 48, 1, "sheet", "B", FD, M), fl(15, 20, 14, 48, 2, "sheet", "B", FD, M));
      // hai lõi thang nhô cao (không tính sàn)
      v.push(B(29, 31, 4, 6, 0.45, 15.45, "blk", "X", { top: "blkTop", ...M }), B(11, 49, 4, 6, 0.45, 15.45, "blk", "X", { top: "blkTop", ...M }));
      // nhà sự kiện
      v.push(B(8, 70, 19.5, 18, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }));
      st.push(...perim(8, 20, 31.2, 10, Z(1)), ...perim(6, 38, 32.4, 10, Z(1)), ...perim(6, 56, 30, 10, Z(1)), ...perim(15, 20, 14, 48, Z(3), 8), ...perim(8, 70, 19.5, 18, 7.45, 6));
      return { v, st };
    }
  });
})(window.G3);
