/* ================= Đợt 6 · nhóm 19: 5 ý tưởng tự sáng tạo (19.1–19.5), 2–3 tầng, theo file ghi chú đề bài ================= */
(function (G) {
  const { B, col, wall } = G.K;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I8 = G.ideas8 = G.ideas8 || [];
  const Z = k => 0.45 + 4.5 * k;
  const FD = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khối đọc
  const FS = { N: "dac", E: "lam", S: "dua", W: "dac" }; // khối kín, kho, sự kiện
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // cột quanh chu vi, bước ≤ step, thẳng từ móng lên đỉnh
  function perim(x, y, w, d, z2, step = 8, z1 = 0) {
    const o = [], nx = Math.max(1, Math.ceil(w / step)), ny = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= nx; i++) for (const yy of [y, y + d]) o.push(col(x + w * i / nx, yy, z1, z2));
    for (let j = 1; j < ny; j++) for (const xx of [x, x + w]) o.push(col(xx, y + d * j / ny, z1, z2));
    return o;
  }
  // hàng cột nhìn thấy được: cột thật trong mô hình và trong kết cấu
  function pilotis(v, st, xs, ys, zTop, z0 = 0) {
    for (const x of xs) for (const y of ys) { st.push(col(x, y, z0, zTop)); v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, z0, zTop, "sheet", "X")); }
  }
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);

  /* ---------- 19.1 · Hộp đọc hai tầng trên thềm đá bậc ---------- */
  I8.push({
    id: "tu1", fam: "tu", code: "19.1", from: "tự sáng tạo", name: "Hộp đọc sáng trên thềm đá bậc xuống sông", rule: "Nặng dưới, nhẹ trên; thềm bậc nối bờ sông",
    tag: "Một thềm đá một tầng chứa kho, nghiệp vụ, sảnh và cà phê; trên thềm là hộp đọc hai tầng sáng màu; mép thềm phía sông cắt thành bậc ngồi đọc ngoài trời",
    story: "Khu đất cao hơn đường Bạch Đằng 5,5 m, sẵn là một cái thềm. Ý tưởng kéo cái thềm đó vào trong nhà: một đế đá một tầng, dày và kín, đựng kho sách, nghiệp vụ, kỹ thuật ở phía Tây và sảnh, trưng bày, cà phê ở phía sông. Trên đế đặt một hộp đọc hai tầng sáng màu, lùi vào mỗi bên vài mét để mái đế thành hiên đọc. Mép đế phía sông không làm tường mà cắt thành bốn bậc lớn đi xuống bậc thang Bạch Đằng, ai ngang qua cũng ngồi đọc được. Nhà sự kiện là một khối tối, thấp, đứng riêng ở quảng trường Bắc.",
    why: [W("Quy luật hình khối", "Tương phản nặng – nhẹ theo chiều đứng: đế đá tối, nằm dài; hộp đọc sáng, gọn, đặt lệch về phía Bắc trên đế. Bậc thềm phía sông biến mép đế thành hình bậc thang, là động tác nghệ thuật đọc được ngay trên mô hình trắng."),
      W("Khối chính – khối phụ", "Khối chính là đế đá cùng hộp đọc, chiếm khoảng 86% sàn, cao +13,95. Khối phụ là nhà sự kiện +7,45 và khối chuyên đề một tầng, cả hai tối màu, đứng tách ở đầu Bắc."),
      W("Nắng và chói", "Mặt Trần Phú của đế là tường đá kín, kho và kỹ thuật nằm sau tường đó. Hộp đọc lùi vào 7 m so với mép đế phía sông nên nắng sáng mùa hè từ hướng Đông Đông Bắc bị hiên đế và bậc thềm cắt bớt trước khi tới chỗ đọc."),
      W("Gió và mưa", "Hộp đọc đặt lệch về Bắc, để lại sân thiếu nhi trên đế ở phía Nam mở về hướng gió Đông Nam mùa hè. Mưa mùa đông từ phía sông đập vào bậc thềm và hiên đế, lối vào sảnh nằm lùi dưới hộp đọc."),
      W("Công năng", "Đế: phía Tây là kỹ thuật, văn phòng, kho, nghiệp vụ, sát lối Tây và chỗ giao nhận; phía sông là sảnh, trưng bày, cà phê, đọc mở. Hộp đọc: tầng 2 đọc mở và học nhóm, tầng 3 đọc yên tĩnh và tra cứu số. Thiếu nhi ở mép Nam của đế, có sân riêng.")],
    kc: { he: "Đế: tường bê tông chịu lực và cột lưới 6 m. Hộp đọc: khung bê tông lưới 6 m đứng thẳng trên cột của đế. Nhà sự kiện: tường chịu lực bốn phía, dàn mái thép nhịp 18 m.", nhip: "18 m (nhà sự kiện)", cx: "Không: hộp đọc nằm trọn trên đế" },
    qa: [["Hộp đọc đặt lệch trên đế thì tải có dồn một bên không?", "Cột của hộp đọc đi thẳng xuống cột của đế theo cùng lưới 6 m, nên không có dầm chuyển; đế rộng hơn hộp mỗi bên, phần dư chỉ là mái hiên nhẹ."],
      ["Bậc thềm ngoài trời có chắn lối thoát của tầng 1 không?", "Bậc thềm là bốn bậc rộng 1,4 m, cao 1,1 m, có thang nhỏ cắt ngang ở ba chỗ; đó chính là lối thoát thứ hai của sảnh ra bậc thang Bạch Đằng."]],
    cut: "Đế: foam đen 15 × 28 cm, cao 2,25 cm, khoét góc Đông Nam. Hộp đọc: foam trắng 10 × 15 cm, 2 lớp cao 2,25 cm. Bậc thềm: 4 dải foam đen 0,7 cm rộng, cao giảm dần. Nhà sự kiện: foam đen 9 × 7 × 3,5 cm.",
    roleOf: () => "p",
    lab: [[23, 47, 13.95, "Khối chính · Hộp đọc hai tầng trên thềm đá", 1], [27, 19, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [12, 20, 4.95, "Khối phụ · Chuyên đề, kho sự kiện", 2], [38.5, 48, 3, "Bậc thềm đọc xuống sông"], [27, 71, 4.95, "Sân thiếu nhi trên đế"]],
    ngoaigio: "Nhà sự kiện và khối chuyên đề đứng riêng ở quảng trường Bắc, có cửa riêng từ quảng trường; cà phê và trưng bày nằm ở đầu Bắc của đế, mở ra cùng quảng trường và có vệ sinh riêng cạnh đó. Đường khóa ngoài giờ là cửa giữa cà phê và sảnh thư viện trên đế (y = 44). Khách sự kiện thoát thẳng ra quảng trường và ra bậc thềm phía sông, không qua cửa khóa.",
    ref: { name: "University College Library (A library in the garden)", by: "Make Architects", year: "nguồn không ghi năm hoàn thành", place: "Oxford, Anh", award: "", url: "https://www.makearchitects.com/projects/university-college-library/", what: "Thư viện hai tầng hình chữ nhật gọn, đặt trong vườn của trường, mái như tán cây lưới lấy sáng; các góc đọc xếp quanh những \"thân cây\" cột.", take: "Mượn ý hộp đọc hai tầng gọn, sáng, đứng giữa cảnh quan. Ở đây hộp không đứng trên cỏ mà trên một đế đá chứa kho, và đế cắt bậc xuống bờ sông." },
    build() {
      const v = [], st = [];
      // đế đá một tầng
      v.push(fl(6, 26, 12, 28, 0, "stone", "E", FS, M), fl(6, 54, 12, 25, 0, "stone", "C", FS, M), fl(18, 26, 18, 18, 0, "stone", "A", FS, M), fl(18, 44, 18, 20, 0, "stone", "B", FS, M));
      // hộp đọc hai tầng trên đế
      v.push(fl(13, 32, 20, 30, 1, "sheet", "B", FD, M), fl(13, 32, 20, 30, 2, "sheet", "B", FD, M));
      // bậc thềm phía sông (không tính sàn)
      for (let i = 0; i < 4; i++) v.push(B(36 + i * 1.375, 32, 1.375, 30, 0.45, 4.95 - i * 1.125, "stone", "X", { top: "stoneTop", ...M }));
      // cụm ngoài giờ ở quảng trường Bắc
      v.push(B(18, 12, 18, 14, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }), fl(6, 14, 12, 12, 0, "blk", "D", FS));
      st.push(...perim(6, 26, 12, 53, Z(1), 6), ...perim(18, 26, 18, 38, Z(1), 6), ...perim(13, 32, 20, 30, Z(3), 6), ...perim(18, 12, 18, 14, 7.45, 9), ...perim(6, 14, 12, 12, Z(1), 6));
      st.push(wall(6, 26, 0.3, 53, 0.45, 4.95));
      return { v, st };
    }
  });

  /* ---------- 19.2 · Một mái phẳng, ba sân dưới cột ---------- */
  I8.push({
    id: "tu2", fam: "tu", code: "19.2", from: "tự sáng tạo", name: "Một mái phẳng phủ ba sân, nhà đẩy vào dưới mái", rule: "Một mái lớn, nhà và sân xen kẽ dưới mái",
    tag: "Một tấm mái phẳng trên lưới cột phủ gần hết khu đất; dưới mái xen kẽ nhà sự kiện, sảnh, nhà đọc và ba sân: sân đón, vườn đọc, sân thiếu nhi",
    story: "Thay vì nhiều khối rời, cả công trình là một tấm mái mỏng trên lưới cột 8 m, như mái chợ. Dưới mái, các khối đặc được đẩy vào từng ô: dãy hai tầng dọc Trần Phú chứa kho, nghiệp vụ, văn phòng và phòng đọc tầng 2; nhà sự kiện cao ở đầu Bắc; nhà sảnh hai tầng ở giữa; nhà thiếu nhi một tầng ở phía Nam. Những ô còn lại là ba sân có mái che: sân đón sau nhà sự kiện, vườn đọc giữa nhà, sân thiếu nhi phía Nam. Nhìn từ sông chỉ thấy một đường mái phẳng dài và hàng cột, nhà đặc thấp thoáng phía sau.",
    why: [W("Quy luật hình khối", "Một mái, nhiều khối: mái phẳng là yếu tố thống nhất, các khối dưới mái cao thấp khác nhau và để hở ba sân. Nhịp cột 8 m lặp đều, các khối đặc phá nhịp một cách có kiểm soát. Trên mô hình trắng, tấm mái mỏng nổi trên rừng cột là hình ảnh chính."),
      W("Khối chính – khối phụ", "Khối chính là dãy Tây hai tầng, nhà sảnh hai tầng và nhà sự kiện cao 7 m, chiếm khoảng 93% sàn, đỉnh +9,45 dưới mái +9,95. Khối phụ là nhà thiếu nhi và khối vệ sinh ngoài giờ, một tầng, tối màu."),
      W("Nắng và chói", "Dãy Tây đặc ở mặt Trần Phú. Mái phẳng đua ra 2 m ngoài mép các sân nên chỗ đọc ngoài trời luôn có bóng; nhà sảnh và nhà đọc có mặt dài quay về Bắc lệch Tây và Nam lệch Đông."),
      W("Gió và mưa", "Ba sân nối thông dưới mái thành một hành lang gió chạy từ đầu Nam lên Bắc, đón gió Đông Nam mùa hè. Mưa mùa đông từ sông bị mái che, sân đón và vườn đọc vẫn dùng được khi mưa."),
      W("Công năng", "Dãy Tây tầng 1: kỹ thuật, văn phòng, kho, nghiệp vụ sát lối Tây; tầng 2: đọc yên tĩnh và tra cứu số. Nhà sảnh: tầng 1 đón tiếp, trưng bày, cà phê; tầng 2 đọc mở. Nhà sự kiện ở đầu Bắc. Thiếu nhi ở phía Nam, mở ra sân thiếu nhi.")],
    kc: { he: "Lưới cột bê tông 8 × 8 m đỡ tấm mái phẳng dày 0,5 m; cột chạy thẳng qua các khối dưới mái. Nhà sự kiện nằm trọn trong ba ô lưới, bỏ cột giữa, dùng dầm bê tông nhịp 18 m.", nhip: "18 m (nhà sự kiện)", cx: "2 m (mép mái đua ngoài hàng cột)" },
    qa: [["Mái phẳng rộng 34 × 72 m có võng không?", "Mái tựa trên lưới cột 8 m, mỗi ô chỉ nhịp 8 m, là nhịp bản dầm bê tông bình thường; mép mái chỉ đua 2 m."],
      ["Sân dưới mái có tối không?", "Mỗi sân rộng từ 12 m và thông với sân bên cạnh, hai mép sân mở ra ngoài; mái có thể khoét ô lấy sáng ở giữa mỗi sân, khoét không ảnh hưởng kết cấu vì ô mái nằm trong lưới cột."]],
    cut: "Mái: bìa trắng 17 × 36 cm. Cột: que tre 3 mm cao 4,5 cm, lưới 4 cm. Dãy Tây: foam 6 × 35 cm, 2 lớp 2,25 cm. Nhà sảnh: foam 10 × 7 cm, 2 lớp. Nhà sự kiện: foam đen 10 × 8 × 3,5 cm. Nhà thiếu nhi: foam đen 10 × 6 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[12, 48, 9.45, "Khối chính · Dãy Tây hai tầng dưới mái", 1], [30, 49, 9.45, "Khối chính · Nhà sảnh hai tầng", 1], [30, 23, 7.45, "Khối chính · Nhà sự kiện", 1], [30, 72, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [36, 36, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [26, 37, 10, "Sân đón dưới mái"], [30, 62, 10, "Vườn đọc dưới mái"], [30, 82, 10, "Sân thiếu nhi"]],
    ngoaigio: "Nhà sự kiện mở thẳng ra quảng trường Bắc; sân đón dưới mái, khối vệ sinh ngoài giờ cạnh sân, cà phê và trưng bày ở tầng 1 nhà sảnh đều ở phía Bắc. Đường khóa là hai cửa: cửa vào dãy Tây tại sân đón và cửa thang lên tầng 2 nhà sảnh. Khách thoát ra quảng trường và ra vườn đọc rồi ra sông, không qua hai cửa khóa.",
    ref: { name: "BES Pavilion", by: "H&P Architects (Đoàn Thanh Hà, Trần Ngọc Phương)", year: "2013", place: "Hà Tĩnh, Việt Nam", award: "", url: "https://divisare.com/projects/281489-h-p-architects-bes-pavilion", what: "Không gian sinh hoạt cộng đồng bằng tre, đất và đá: nhiều nhà nhỏ xếp quanh một sân giữa, lối vào qua hẻm hẹp giữa hai nhà.", take: "Mượn cách xếp nhà nhỏ quanh sân và lối vào qua khe giữa hai nhà. Ở đây các nhà được gom dưới một mái phẳng chung để che mưa mùa đông, sân thành sân có mái." },
    build() {
      const v = [], st = [];
      // dãy Tây hai tầng
      v.push(fl(6, 14, 12, 28, 0, "stone", "E", FS, M), fl(6, 42, 12, 25, 0, "stone", "C", FS, M), fl(6, 67, 12, 17, 0, "sheet", "B", FD, M), fl(6, 14, 12, 70, 1, "sheet", "B", FD, M));
      // nhà sự kiện, nhà sảnh hai tầng, nhà thiếu nhi, vệ sinh ngoài giờ
      v.push(B(20, 14, 20, 18, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1, ...M }), fl(20, 42, 20, 16, 0, "sheet", "A", FD, M), fl(20, 42, 20, 16, 1, "sheet", "B", FD, M), fl(20, 66, 20, 12, 0, "blk", "B", FS), fl(32, 32, 8, 8, 0, "blk", "E", FS));
      // tấm mái phẳng chung
      v.push(B(6, 12, 34, 72, 9.45, 9.95, "sheet", "X", M));
      // cột dưới mái ở các sân và mép sân
      pilotis(v, st, [20, 26, 32], [37], 9.45); pilotis(v, st, [40], [37, 42, 50, 58], 9.45);
      pilotis(v, st, [20, 28, 36, 40], [62], 9.45);
      pilotis(v, st, [20, 28, 36, 40], [78, 84], 9.45); pilotis(v, st, [40], [66, 72], 9.45); pilotis(v, st, [12], [84], 9.45);
      st.push(...perim(6, 14, 12, 70, Z(2), 6), ...perim(20, 14, 20, 18, 9.45, 10), ...perim(20, 42, 20, 16, Z(2), 7), ...perim(20, 66, 20, 12, Z(1), 7), ...perim(32, 30, 8, 8, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 19.3 · Hai nửa so le, hẻm xuyên từ phố ra sông ---------- */
  I8.push({
    id: "tu3", fam: "tu", code: "19.3", from: "tự sáng tạo", name: "Hai nửa so le, hẻm xuyên và cầu có bậc", rule: "Chia đôi rồi trượt lệch, cả mặt bằng lẫn mặt cắt",
    tag: "Một hẻm 6 m xuyên từ Trần Phú ra bậc thang Bạch Đằng chia nhà làm hai nửa; nửa Nam trượt một bước lưới về phía sông và nâng nửa tầng trên thềm đá; cầu có bậc nối hai nửa qua hẻm",
    story: "Người đi từ Trần Phú muốn xuống sông phải vòng qua khu đất. Ý tưởng mở một hẻm có mái 6 m xuyên qua giữa nhà, nối phố với bậc thang Bạch Đằng. Hẻm chia nhà thành nửa Bắc và nửa Nam. Hai nửa không thẳng hàng: nửa Nam trượt 8 m về phía sông, và đứng trên một thềm đá cao 2,25 m nên sàn của nó lệch nửa tầng so với nửa Bắc. Một cầu qua hẻm nối hai nửa, trong cầu có nửa cầu thang để bù độ lệch. Từ bậc thang Bạch Đằng nhìn lên, hai nửa chồng so le như hai cuốn sách đặt lệch.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: hai nửa cùng tiết diện, trượt đúng một bước lưới 8 m trên mặt bằng và đúng nửa tầng theo mặt cắt. Hẻm xuyên là khoảng rỗng rõ ràng, cầu có bậc là nét nối duy nhất. Thềm đá dưới nửa Nam cắt bậc về phía hẻm và phía sông."),
      W("Khối chính – khối phụ", "Khối chính là hai nửa hai tầng và cầu, chiếm khoảng 83% sàn, đỉnh +11,7 ở nửa Nam. Khối phụ là dãy văn phòng một tầng phía Tây của nửa Bắc, khối chuyên đề và khối vệ sinh trên thềm Nam, đỉnh +7,2, đều tối màu."),
      W("Nắng và chói", "Cả hai nửa đặc ở mặt Trần Phú. Nửa Nam trượt ra sông nên che bớt nắng sáng cho mặt sông của nửa Bắc. Hẻm xuyên nằm dưới cầu nên có bóng cả ngày."),
      W("Gió và mưa", "Hẻm xuyên chạy ngang nhà, gió Đông Nam mùa hè vào hẻm rồi lên hai sân trong. Mưa mùa đông từ sông bị cầu che một đoạn hẻm; lối vào thư viện ở trong hẻm, kín gió."),
      W("Công năng", "Nửa Bắc: nhà sự kiện cao hai tầng ở đầu Bắc, sảnh, cà phê, trưng bày ở tầng 1, đọc mở tầng 2. Nửa Nam trên thềm: kho và nghiệp vụ phía Tây sát sân giao nhận, thiếu nhi phía sông, đọc yên tĩnh tầng trên. Hẻm là nơi mượn trả nhanh và xe sách đi qua.")],
    kc: { he: "Khung bê tông lưới 6 m cho cả hai nửa; nửa Nam đứng trên thềm bê tông đặc cao 2,25 m. Cầu qua hẻm là hộp dầm bê tông nhịp 6 m tựa hai đầu lên hai nửa. Nhà sự kiện là ô hai tầng bỏ cột giữa, dầm nhịp 18 m.", nhip: "18 m (nhà sự kiện)", cx: "Không: cầu tựa hai đầu, hai nửa đứng trên nền và thềm" },
    qa: [["Sàn hai nửa lệch nửa tầng thì người xe lăn đi thế nào?", "Mỗi nửa có thang máy riêng; cầu nối ở cao độ sàn nửa Bắc, bên trong cầu có nửa thang và một dốc ngắn 1:12 tới sàn nửa Nam; tầng 1 nửa Nam vào bằng dốc từ hẻm."],
      ["Cầu bắc qua hẻm có cần cột không?", "Cầu chỉ nhịp 6 m, là hộp dầm bê tông cao 4,5 m tựa hai đầu lên khung của hai nửa; nhịp này nhỏ hơn cả bước lưới 6 m của nhà."]],
    cut: "Nửa Bắc: foam 13 × 19 cm, 2 lớp 2,25 cm. Thềm Nam: foam đen 13 × 16 × 1,1 cm. Nửa Nam: foam 13 × 15 cm, 2 lớp, đặt lệch 4 cm về phía sông. Cầu: foam 6 × 3 × 2,25 cm. Nhà sự kiện: khối đen 9 × 9 × 4,5 cm.",
    roleOf: () => "p",
    lab: [[19, 40, 9.45, "Khối chính · Nửa Bắc", 1], [27, 67, 11.7, "Khối chính · Nửa Nam trên thềm, lệch 8 m", 1], [24, 53, 9.45, "Cầu có bậc qua hẻm"], [10, 30, 4.95, "Khối phụ · Văn phòng, kỹ thuật", 2], [33, 78, 7.2, "Khối phụ · Chuyên đề, kho sự kiện", 2], [20, 84.5, 7.2, "Khối phụ · Vệ sinh", 2], [23, 21, 9.45, "Nhà sự kiện hai tầng trong nửa Bắc"]],
    ngoaigio: "Cụm ngoài giờ nằm trọn ở nửa Bắc tầng 1: nhà sự kiện, cà phê, trưng bày và vệ sinh, cửa riêng mở ra quảng trường Bắc và ra hẻm. Đường khóa là cửa thang lên tầng 2 nửa Bắc và cửa cầu sang nửa Nam. Khách sự kiện thoát ra quảng trường hoặc ra hẻm rồi ra sông, không qua hai cửa đó.",
    ref: { name: "Library and school for adults", by: "Estudi GRV Arquitectes", year: "nguồn không ghi năm", place: "Tây Ban Nha", award: "", url: "https://www.archdaily.com/454600/library-and-school-for-adults-estudi-grv-arquitectes", what: "Nhà chia làm hai tầng ở hai cao độ khác nhau, vào được từ phố và từ công viên; một sàn trung gian nối hai mức và cho người đi xuyên từ thư viện ra công viên.", take: "Mượn ý hai mức sàn lệch nhau và lối đi xuyên nhà nối hai phía. Ở đây lối xuyên là hẻm có mái từ Trần Phú ra sông, hai mức sàn thành hai nửa nhà lệch nửa tầng." },
    build() {
      const v = [], st = [];
      // nửa Bắc x 6..32, y 12..50: tầng 1 sự kiện (cao hai tầng), sảnh; dãy Tây một tầng; tầng 2 đọc
      v.push(B(14, 12, 18, 18, 0.45, 9.45, "sheet", "D", { fa: FS, fl: 1, ...M }), fl(14, 30, 18, 20, 0, "sheet", "A", FD, M), fl(6, 12, 8, 38, 0, "stone", "E", FS), fl(10, 30, 22, 20, 1, "sheet", "B", FD, M));
      // thềm đá nửa Nam và nửa Nam x 14..40, y 56..88, sàn lệch nửa tầng (+2,7 / +7,2)
      v.push(B(14, 56, 26, 32, 0.45, 2.7, "stone", "X", { top: "stoneTop", ...M }));
      v.push(B(14, 56, 12, 25, 2.7, 7.2, "stone", "C", { fa: FS, fl: 1, ...M }), B(26, 56, 14, 18, 2.7, 7.2, "sheet", "B", { fa: FD, fl: 1, ...M }), B(26, 74, 14, 8, 2.7, 7.2, "blk", "D", { fa: FS, fl: 1 }), B(14, 81, 12, 7, 2.7, 7.2, "blk", "E", { fa: FS, fl: 1 }), B(14, 56, 26, 22, 7.2, 11.7, "sheet", "B", { fa: FD, fl: 1, ...M }));
      // cầu có bậc qua hẻm
      v.push(B(18, 50, 12, 6, 4.95, 9.45, "sheet", "B", { fa: FD, fl: 1, ...M }));
      st.push(...perim(14, 12, 18, 18, 9.45, 9), ...perim(14, 30, 18, 20, Z(2), 6), ...perim(6, 12, 8, 38, Z(1), 6), ...perim(10, 30, 4, 20, Z(2), 6), ...perim(14, 56, 26, 32, 11.7, 6.5, 0));
      st.push(wall(14, 56, 26, 0.3, 0, 2.7), wall(14, 87.7, 26, 0.3, 0, 2.7), wall(14, 56, 0.3, 32, 0, 2.7), wall(39.7, 56, 0.3, 32, 0, 2.7));
      return { v, st };
    }
  });

  /* ---------- 19.4 · Hai bức tường sách dày kẹp nhà đọc dài ---------- */
  I8.push({
    id: "tu4", fam: "tu", code: "19.4", from: "tự sáng tạo", name: "Hai tường sách dày kẹp nhà đọc dài, nhà nhỏ cài hai bên", rule: "Hai đường song song, các khối nhỏ cài vào",
    tag: "Nhà đọc hai tầng dài 64 m kẹp giữa hai bức tường sách dày 1,2 m vươn quá hai đầu nhà; kho, văn phòng, thiếu nhi là những nhà một tầng cài vào mặt ngoài hai tường",
    story: "Ý tưởng lấy cái kệ sách làm kết cấu: hai bức tường dày 1,2 m, mặt trong là kệ sách hai tầng, mặt ngoài là tường đá kín, chạy dọc khu đất và dài hơn nhà, vươn quá hai đầu như hai thanh chắn sách. Giữa hai tường là nhà đọc hai tầng, đầu Bắc cao thông hai tầng làm phòng đa năng, mái phẳng gác lên hai tường. Những nhà nhỏ một tầng cài vào mặt ngoài hai tường: dãy kho và văn phòng phía Trần Phú, nhà thiếu nhi và vệ sinh phía sông. Nhìn từ sông thấy hai đường tường dài, thẳng, mái mỏng ở giữa và vài hộp nhỏ bám bên.",
    why: [W("Quy luật hình khối", "Chủ – phụ theo đường: hai tường song song là nét chủ đạo, dài hơn và cao hơn mọi thứ; các nhà nhỏ cài vào tường là phụ, nhịp cài không đều tạo bất đối xứng. Phần tường vươn quá đầu nhà là động tác hình khối rõ nhất."),
      W("Khối chính – khối phụ", "Khối chính là nhà đọc dài giữa hai tường, gồm phòng đa năng cao hai tầng ở đầu Bắc, chiếm khoảng 70% sàn, đỉnh +9,45; hai tường cao +10,45. Khối phụ là bốn nhà một tầng tối màu cài bên ngoài tường, đỉnh +4,95."),
      W("Nắng và chói", "Tường phía Trần Phú là tường đá kín, dày 1,2 m, không cửa sổ: chặn hẳn nắng chiều. Tường phía sông chỉ mở cửa sổ hẹp giữa các kệ. Ánh sáng chính vào từ hai đầu hồi nhìn Bắc và Nam, đầu Nam có mái đua."),
      W("Gió và mưa", "Nhà dài một nhịp, cửa ở hai đầu hồi nên gió Đông Nam mùa hè đi dọc nhà từ Nam lên Bắc. Tường dày phía sông chắn mưa mùa đông, cửa vào nằm ở khe giữa tường và nhà thiếu nhi."),
      W("Công năng", "Trong nhà dài: đầu Bắc là phòng đa năng và bục, giữa là sảnh, trưng bày, cà phê, đầu Nam là đọc mở; tầng 2 là đọc yên tĩnh, học nhóm, tra cứu. Ngoài tường Tây: kho, nghiệp vụ, kỹ thuật, văn phòng, sát lối Tây. Ngoài tường Đông: thiếu nhi có sân riêng và vệ sinh.")],
    kc: { he: "Hai tường bê tông chịu lực dày 1,2 m, kệ sách gắn vào mặt trong. Sàn và mái là bản dầm bê tông nhịp 17,6 m gác lên hai tường, không có cột giữa. Nhà nhỏ bên ngoài có khung riêng, tựa một cạnh vào tường.", nhip: "17,6 m (gác tường tới tường)", cx: "4 m (tường vươn quá đầu nhà, tường tự đứng)" },
    qa: [["Sách gắn vào tường chịu lực có làm tường yếu không?", "Kệ chỉ là khung thép bắt vào mặt tường, sách nặng khoảng 7 kN/m² tính vào tải sàn tầng 2 chứ không khoét vào tường; tường dày 1,2 m thừa sức."],
      ["Nhịp 17,6 m không cột có hợp lý với nhà hai tầng?", "Dùng dầm bê tông cao 1,1 m cách 6 m, gác lên hai tường, là nhịp thường gặp ở nhà thể thao nhỏ; nhờ vậy phòng đa năng ở đầu Bắc không có cột."]],
    cut: "Hai tường: bìa xám dày 0,6 cm, 37 × 5 cm. Nhà dài: foam trắng 8,8 × 32 cm, 2 lớp 2,25 cm, kẹp giữa hai tường. Mái: bìa 10 × 34 cm. Nhà nhỏ: foam đen cao 2,25 cm, 3 × 25 cm, 3 × 8 cm, 4,75 × 10 cm, 4,75 × 12 cm.",
    roleOf: () => "p",
    lab: [[22, 52, 9.45, "Khối chính · Nhà đọc dài giữa hai tường sách", 1], [22, 28, 9.45, "Phòng đa năng cao hai tầng ở đầu Bắc"], [9, 63, 4.95, "Khối phụ · Kho, nghiệp vụ, kỹ thuật", 2], [9, 22, 4.95, "Khối phụ · Văn phòng", 2], [36.8, 74, 4.95, "Khối phụ · Thiếu nhi", 2], [36.8, 52, 4.95, "Khối phụ · Vệ sinh, phòng nhân viên", 2], [12.6, 16, 10.45, "Tường sách vươn quá đầu nhà"]],
    ngoaigio: "Phòng đa năng, bục và kho sự kiện chiếm đầu Bắc của nhà dài, mở cửa riêng ra quảng trường; cà phê, trưng bày và vệ sinh ngoài giờ ở ngay sau đó. Đường khóa là một vách kéo ngang nhà dài tại y = 58 và cửa thang lên tầng 2. Khách thoát ra quảng trường ở đầu Bắc và ra khe giữa tường Đông và nhà thiếu nhi, không qua vách khóa.",
    ref: { name: "Shiba Ryotaro Memorial Museum", by: "Tadao Ando", year: "2001", place: "Osaka, Nhật Bản", award: "", url: "https://arquitecturaviva.com/works/museo-memorial-shiba-ryotaro-osaka", what: "Một khoảng trống cao ba tầng, tường bốn phía lót kín kệ sách cao 11 m với khoảng 20.000 cuốn; ánh sáng rót xuống từ một khe trên mái dốc. Nhà bằng bê tông, kệ là lớp lót tường.", take: "Mượn hình ảnh tường sách cao chạy suốt. Ở đây tường sách đồng thời là tường bê tông chịu lực đỡ sàn và mái, và vươn quá hai đầu nhà để đọc được ý trên mô hình." },
    build() {
      const v = [], st = [];
      // hai tường sách dày 1,2 m, dài hơn nhà
      v.push(B(12, 14, 1.2, 74, 0.45, 10.45, "stone", "X", { top: "stoneTop", ...M }), B(30.8, 14, 1.2, 74, 0.45, 10.45, "stone", "X", { top: "stoneTop", ...M }));
      // nhà dài giữa hai tường: phòng đa năng cao hai tầng, sảnh, đọc; tầng 2 đọc
      v.push(B(13.2, 20, 17.6, 20, 0.45, 9.45, "sheet", "D", { fa: FD, fl: 1, ...M }), fl(13.2, 40, 17.6, 18, 0, "sheet", "A", FD, M), fl(13.2, 58, 17.6, 26, 0, "sheet", "B", FD, M), fl(13.2, 40, 17.6, 44, 1, "sheet", "B", FD, M));
      // mái phẳng gác lên hai tường
      v.push(B(12, 18, 20, 68, 9.45, 9.95, "sheet", "X", M));
      // nhà nhỏ cài ngoài tường: Tây kho, văn phòng; Đông thiếu nhi, vệ sinh
      v.push(fl(6, 38, 6, 50, 0, "blk", "C", FS), fl(6, 14, 6, 16, 0, "blk", "E", FS), fl(32, 64, 9.5, 20, 0, "blk", "B", FS), fl(32, 40, 9.5, 24, 0, "blk", "E", FS));
      st.push(wall(12, 14, 1.2, 74, 0, 10.45), wall(30.8, 14, 1.2, 74, 0, 10.45));
      st.push(...perim(6, 38, 6, 50, Z(1), 6), ...perim(6, 14, 6, 16, Z(1)), ...perim(32, 64, 9.5, 20, Z(1), 7), ...perim(32, 40, 9.5, 24, Z(1), 8));
      return { v, st };
    }
  });

  /* ---------- 19.5 · Hai tầng lùi bậc về Nam, mái cỏ làm sân đọc ---------- */
  I8.push({
    id: "tu5", fam: "tu", code: "19.5", from: "tự sáng tạo", name: "Tầng trên lùi bậc về Nam, mái cỏ làm vườn đọc", rule: "Lùi bậc một hướng, mỗi mép lùi là vườn",
    tag: "Tầng 1 trải rộng, tầng 2 lùi dần về phía Nam hai bậc; mỗi mép lùi là một vườn đọc trên mái cỏ; nhà sự kiện cao ở quảng trường Bắc nối liền với thân nhà",
    story: "Nắng và gió mùa hè đều tới từ đầu Nam, nên nhà mở về Nam bằng cách lùi tầng. Tầng 1 là một tấm sàn rộng gần hết khu đất, chứa kho, kỹ thuật, văn phòng phía Tây, sảnh, cà phê, đọc mở, thiếu nhi phía sông. Tầng 2 chỉ phủ nửa Bắc rồi lùi hai bậc về Nam, để lại hai vườn cỏ trên mái tầng 1: vườn đọc lớn ở giữa và vườn thiếu nhi ở cuối. Ở đầu Bắc, phòng đa năng cao hai tầng liền với thân nhà, mở ra quảng trường. Nhìn từ sông, nhà như ba bậc thềm cỏ đi lên phía Bắc.",
    why: [W("Quy luật hình khối", "Tiến dần theo một hướng: từ Nam lên Bắc, khối cao dần qua ba bậc đều nhau. Mỗi mép bậc là một vườn, nên bậc không chỉ là hình mà là chỗ dùng. Phòng đa năng ở đầu Bắc là bậc cao nhất, kết thúc dãy."),
      W("Khối chính – khối phụ", "Khối chính là phòng đa năng, sảnh và các sàn đọc hai tầng, chiếm khoảng 80% sàn, đỉnh +9,45. Khối phụ là dãy kỹ thuật, văn phòng và dãy kho một tầng phía Tây, tối màu, đỉnh +4,95."),
      W("Nắng và chói", "Dãy Tây đặc chắn nắng chiều cho cả nhà. Tầng 2 lùi về Nam nên mép lùi che nắng trưa cho mặt Nam tầng 1; vườn cỏ trên mái giảm nóng cho phòng đọc bên dưới."),
      W("Gió và mưa", "Hai vườn mái mở hẳn về hướng Đông Nam, gió hè đi từ vườn vào phòng đọc tầng 2 qua cửa mặt Nam. Mưa mùa đông từ sông: mái cỏ giữ nước, lối vào sảnh ở mặt sông nằm dưới mép lùi của tầng 2."),
      W("Công năng", "Tầng 1: kỹ thuật, văn phòng ở dãy Tây phía Bắc, kho và nghiệp vụ ở dãy Tây phía Nam sát sân giao nhận; sảnh, trưng bày, cà phê sau phòng đa năng; đọc mở và thiếu nhi phía Nam mở ra vườn. Tầng 2: đọc yên tĩnh, học nhóm, tra cứu, mở ra vườn đọc trên mái.")],
    kc: { he: "Khung bê tông lưới 6 m, cột thẳng từ móng lên mái; tầng 2 nằm trọn trên tầng 1 nên không có đua. Mái cỏ trên sàn tầng 1 dày 0,4 m, tính thêm tải. Phòng đa năng là ô bỏ cột giữa, dầm nhịp 20 m.", nhip: "20 m (phòng đa năng)", cx: "Không" },
    qa: [["Mái cỏ trên phòng đọc có thấm nước xuống không?", "Mái cỏ nằm trên sàn bê tông có hai lớp chống thấm và lớp thoát nước; dốc 2% về mép Nam có máng; đây là cấu tạo mái vườn thông thường."],
      ["Tầng 2 lùi hai bậc thì cột có lệch không?", "Mép lùi trùng với trục cột của lưới 6 m, nên cột tầng 2 đứng đúng trên cột tầng 1; chỉ bỏ bớt cột ở phần vườn."]],
    cut: "Tầng 1: foam 17 × 26 cm cao 2,25 cm, phủ giấy cỏ ở phần vườn. Tầng 2: foam 15 × 14 cm và 7 × 4 cm. Phòng đa năng: foam 10 × 9 × 4,5 cm. Dãy Tây: foam đen 6 × 26 cm cao 2,25 cm.",
    roleOf: () => "p",
    lab: [[25, 44, 9.45, "Khối chính · Hai tầng lùi bậc về Nam", 1], [24, 21, 9.45, "Phòng đa năng cao hai tầng"], [12, 43, 4.95, "Khối phụ · Kỹ thuật, văn phòng", 2], [12, 70, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [29, 70, 5, "Vườn đọc trên mái cỏ"], [22, 62, 5, "Vườn thiếu nhi trên mái"]],
    ngoaigio: "Phòng đa năng mở cửa riêng ra quảng trường Bắc; sảnh, trưng bày, cà phê và vệ sinh ngoài giờ nằm ngay sau nó ở tầng 1. Đường khóa là vách kéo tại y = 46 trước khu đọc mở và cửa thang lên tầng 2. Khách thoát ra quảng trường và ra mặt sông qua sảnh, cả hai đều trước vách khóa.",
    ref: { name: "Yogananda Library", by: "Sourabh Gupta, Studio Archohm", year: "2013", place: "Solan, Himachal Pradesh, Ấn Độ", award: "", url: "https://archdaily.com/770435/yogananda-library-sourabh-gupta", what: "Các tầng trên lùi dần tạo một sân giữa lớn rót ánh sáng tán xạ xuống các tầng; mái cỏ là phần kéo dài của sân, người đọc mang sách ra cỏ.", take: "Mượn ý tầng lùi dần và mái cỏ làm nơi đọc. Ở đây lùi về một hướng Nam để đón gió hè và tránh nắng, thay vì lùi quanh sân giữa." },
    build() {
      const v = [], st = [];
      // dãy Tây một tầng: kỹ thuật, văn phòng / kho, nghiệp vụ
      v.push(fl(6, 30, 12, 27, 0, "stone", "E", FS), fl(6, 57, 12, 25, 0, "stone", "C", FS));
      // phòng đa năng cao hai tầng ở đầu Bắc; sảnh; đọc mở và thiếu nhi tầng 1 (mái cỏ)
      v.push(B(14, 12, 20, 18, 0.45, 9.45, "sheet", "D", { fa: FS, fl: 1, ...M }), fl(18, 30, 22, 16, 0, "sheet", "A", FD, M), fl(18, 46, 22, 30, 0, "sheet", "B", FD, { top: "grass", ...M }));
      // tầng 2 lùi hai bậc về Nam
      v.push(fl(10, 30, 30, 28, 1, "sheet", "B", FD, M), fl(26, 58, 14, 8, 1, "sheet", "B", FD, { top: "grass", ...M }));
      st.push(...perim(6, 30, 12, 52, Z(1), 6), ...perim(14, 12, 20, 18, 9.45, 10), ...perim(18, 30, 22, 46, Z(1), 6), ...perim(10, 30, 30, 28, Z(2), 6), ...perim(26, 58, 14, 8, Z(2), 7));
      return { v, st };
    }
  });
})(window.G3);
