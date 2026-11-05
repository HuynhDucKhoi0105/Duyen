
/* ================= Đợt 6 · 18. Từ 6 phương án bạn đã ghim: làm lại thấp tầng (2 tầng, tối đa 3), đủ đề từng nhóm, có cột dưới chỗ đua ================= */
/* Hướng thật lệch 20°: mặt sông (x = 41,5) nhìn Đông Đông Bắc 70°, mặt Trần Phú nhìn Tây Tây Nam 250°, đầu Nam nhìn Nam Đông Nam 160°, đầu Bắc nhìn Bắc Tây Bắc 340°. */
(function (G) {
  const { B, S3, LN, col, wall, seg, grid, range } = G.K;
  const { pylon, stays, cables } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I8 = G.ideas8 = G.ideas8 || [];
  const Z = k => 0.45 + 4.5 * k;
  // mặt đứng (chỉ dùng cho bảng nắng): sông lam, Trần Phú đặc, đầu Nam mái đua, đầu Bắc kính
  const fR = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khu đọc
  const fK = { N: "dac", E: "lam", S: "dac", W: "dac" }; // kho, kỹ thuật, phòng sự kiện
  const fG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // khối kính
  // một tầng (k = 0 tầng 1, k = 1 tầng 2, k = 2 tầng 3)
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // phòng đa năng cao hai tầng (không cột giữa), nằm trong khối chính
  const hall2 = (x, y, w, d, c, o = {}) => B(x, y, w, d, 0.45, 9.45, c, "D", { fa: fK, fl: 1, ...M, ...o });
  // nhà sự kiện riêng, cao 7 m (thông thủy trên 6 m), khối phụ
  const hall1 = (x, y, w, d, c, o = {}) => B(x, y, w, d, 0.45, 6.95, c, "D", { fa: fK, fl: 1, top: "grass", ...o });
  const shell = (x, y, w, d, z1, z2) => [wall(x, y, w, 0.3, z1, z2), wall(x, y + d - 0.3, w, 0.3, z1, z2), wall(x, y, 0.3, d, z1, z2), wall(x + w - 0.3, y, 0.3, d, z1, z2)];
  const inR = (x, y, r) => x > r[0] + 0.05 && x < r[0] + r[2] - 0.05 && y > r[1] + 0.05 && y < r[1] + r[3] - 0.05;
  // lưới cột thẳng từ móng lên mái, bỏ cột nằm trong phòng không cột
  const cols = (xs, ys, z2, skip = []) => { const o = []; for (const x of xs) for (const y of ys) if (!skip.some(r => inR(x, y, r))) o.push(col(x, y, 0.45, z2)); return o; };
  // cột chống nhìn thấy được (0,6 × 0,6 m) dưới phần nhô ra
  const pier = (v, st, x, y, z2) => { v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, z2, "sheet", "X")); st.push(col(x, y, 0, z2)); };

  /* ---------- 18.1 · từ 14.2 Mái võng giữa hai chân neo ---------- */
  I8.push({
    id: "gh1", fam: "ghim", code: "18.1", from: "14.2", name: "Sân mái võng giữa nhà quán và nhà đọc", rule: "Căng và võng, hai đầu neo nặng",
    tag: "Nhà quán một tầng ở đầu Bắc và nhà đọc hai tầng ở phía Nam là hai chân neo; giữa hai nhà là sân có tấm mái bê tông mỏng võng xuống",
    story: "Giữ từ 14.2: tấm mái mỏng võng xuống giữa hai đầu neo nặng, che một sân mở ra sông. Đổi: nhà đọc 3 tầng hạ còn 2 tầng và rộng ra, phòng đa năng chuyển vào nhà đọc thành một phòng cao hai tầng, nên đầu Bắc chỉ còn nhà quán một tầng (cà phê, trưng bày). Mái võng nghiêng từ mái nhà quán lên mép nhà đọc, thấp nhất khoảng +6 m, nhịp 18 m.",
    why: [W("Quy luật hình khối", "Căng và võng: hai khối đặc ở hai đầu, ở giữa là một tấm mỏng cong xuống. Tấm mái nối hai chiều cao khác nhau (+5 m và +9,5 m) nên đường võng lệch, nhìn từ bậc thang Bạch Đằng thấy như một dải lụa căng."),
      W("Khối chính – khối phụ", "Khối chính là nhà đọc hai tầng, chứa luôn phòng đa năng cao hai tầng, chiếm gần 90% sàn. Khối phụ là nhà quán một tầng bằng đá ở đầu Bắc, thấp bằng một nửa nhà đọc."),
      W("Nắng và chói", "Mặt Trần Phú (250°) của nhà đọc đặc. Mặt sông (70°) có lam. Sân dưới mái võng có bóng che cả buổi trưa; mặt Bắc nhà đọc (340°) nhìn ra sân lấy sáng tán xạ cho phòng đọc tầng 2."),
      W("Gió và mưa", "Sân thông hai đầu Đông – Tây; gió Đông Nam mùa hè đi vòng qua mép sông vào sân. Mùa đông mưa tạt từ sông bị mái võng và nhà quán chắn, khách sự kiện đi dưới mái từ quảng trường Bắc vào."),
      W("Công năng", "Nhà quán: cà phê, trưng bày. Nhà đọc tầng 1: phòng đa năng, phòng chuyên đề, vệ sinh mở ra sân; kho và nghiệp vụ dọc lối Tây; thiếu nhi góc Đông Nam. Tầng 2 toàn bộ là khu đọc.")],
    kc: { he: "Nhà đọc khung bê tông lưới 8 m, cột thẳng hai tầng; phòng đa năng 16 × 14 m tường bao chịu lực, dàn mái thép nhịp 14 m. Mái võng bê tông 20 cm có cáp căng, đầu Bắc neo vào dầm đầu trên tường nhà quán, đầu Nam neo vào dầm biên tầng 2 nhà đọc.", nhip: "18 m (mái võng), 14 m (phòng đa năng)", cx: "Không" },
    qa: [["Mái võng kéo hai nhà vào giữa, nhà có bị nghiêng?", "Lực kéo của cáp đi vào dầm đầu nhà quán và dầm biên nhà đọc, rồi xuống tường và cột. Hai nhà nặng hơn lực kéo nhiều lần, như hai tảng đá giữ hai đầu sợi dây phơi."],
      ["Đặt phòng đa năng trong nhà đọc có ồn khu đọc?", "Phòng đa năng ở góc Bắc tầng 1, cách khu đọc tầng 2 bằng sàn và tường bê tông; giữa nó và khu đọc tầng 1 là dải phòng chuyên đề, vệ sinh làm vùng đệm."]],
    cut: "Nhà đọc: foam trắng 16 × 20 × 4,5 cm, khoét góc phòng đa năng. Nhà quán: foam xám 10 × 8 × 2,25 cm. Mái võng: bìa trắng 1 mm 10 × 9,5 cm uốn cong, dán đầu thấp vào mép nhà quán, đầu cao vào mép tầng 2 nhà đọc.",
    ngoaigio: "Ngoài giờ, khách vào sân mái võng từ quảng trường Bắc hoặc bậc thang Bạch Đằng; nhà quán (cà phê, trưng bày), phòng đa năng, phòng chuyên đề và cụm vệ sinh đều mở cửa thẳng ra sân. Đường khóa đặt ở cửa giữa dải phòng sự kiện với cầu thang lên khu đọc và khu thiếu nhi. Sân là không gian ngoài trời nên tuyến thoát nạn luôn thông; cửa khóa chỉ đóng chiều đi vào khu đọc.",
    roleOf: () => "p",
    lab: [[22, 72, 9.45, "Khối chính · Nhà đọc hai tầng, chân neo phía Nam", 1], [24, 39, 7.8, "Mái võng bê tông nhịp 18 m"], [24, 22, 4.95, "Khối phụ · Nhà quán: cà phê, trưng bày", 2], [30, 55, 9.45, "Phòng đa năng cao hai tầng"]],
    build() {
      const v = [], st = [];
      // nhà đọc: tầng 1
      v.push(hall2(22, 48, 16, 14, "sheet"), fl(22, 62, 16, 8, 0, "sheet", "D", fK, M), fl(6, 48, 16, 15, 0, "sheet", "E", fK, M), fl(18, 63, 4, 25, 0, "sheet", "E", fK, M),
        fl(6, 63, 12, 25, 0, "sheet", "C", fK, M), fl(22, 70, 16, 18, 0, "sheet", "B", fR, M));
      // nhà đọc: tầng 2
      v.push(fl(6, 48, 16, 40, 1, "sheet", "B", fR, M), fl(22, 62, 16, 26, 1, "sheet", "B", fR, M));
      // nhà quán và dầm đầu neo mái
      v.push(fl(14, 14, 20, 16, 0, "stone", "A", fG, { top: "stoneTop" }), B(14, 28.6, 20, 1.4, 4.95, 6.2, "stone", "X", { top: "stoneTop" }));
      // mái võng: 10 dải bê tông mỏng, cao dần từ +6,0 lên +8,6, võng giữa 1,6 m
      const y0 = 30, y1 = 48, n = 10, zc = y => { const t = (y - y0) / (y1 - y0); return 6.0 + 2.6 * t - 1.6 * 4 * t * (1 - t); };
      for (let i = 0; i < n; i++) { const a = y0 + (y1 - y0) * i / n, b = y0 + (y1 - y0) * (i + 1) / n; v.push(S3([[14.5, a, zc(a)], [33.5, a, zc(a)], [33.5, b, zc(b)], [14.5, b, zc(b)]], 0.2, "sheet", "X", M)); }
      for (const x of [15.5, 20, 24, 28, 32.5]) for (let i = 0; i < n; i++) { const a = y0 + (y1 - y0) * i / n, b = y0 + (y1 - y0) * (i + 1) / n; st.push(seg([x, a, zc(a) - 0.1], [x, b, zc(b) - 0.1])); }
      st.push(...cols([6, 14, 22, 30, 38], [48, 56, 64, 72, 80, 88], 9.45, [[22, 48, 16, 14]]), ...shell(22, 48, 16, 14, 0.45, 9.45), ...grid([14, 24, 34], [14, 30], 0.45, 4.95), wall(14, 28.6, 20, 1.4, 0.45, 6.2));
      return { v, st };
    }
  });

  /* ---------- 18.2 · từ 14.4 Hai tầng cầu trên rừng cột cây ---------- */
  I8.push({
    id: "gh2", fam: "ghim", code: "18.2", from: "14.4", name: "Cầu đọc trên vườn cột cây", rule: "Phân nhánh, hai tầng so le",
    tag: "Một dải đọc dài 60 m nằm trên rừng cột cây ở tầng 2, một dải ngắn hơn lệch về phía sông ở tầng 3; mặt đất là vườn với vài nhà đá thấp",
    story: "Giữ từ 14.4: hai sàn đọc so le như hai tầng cầu, đứng trên những cột tỏa nhánh như cây, mặt đất thành vườn. Đổi: dải dưới nằm thấp ở tầng 2, dải trên là tầng 3 duy nhất và ngắn hơn; cột cây dày hơn (cách nhau 5 m) nên không còn phần chìa xa; chỗ dải trên vươn ra phía sông có hàng cột thẳng đỡ. Nhà sự kiện, kho, vệ sinh là các nhà đá một tầng dưới cầu.",
    why: [W("Quy luật hình khối", "Phân nhánh và so le: hai dải dài trắng lệch nhau 8 m theo chiều ngang và một tầng theo chiều cao, nằm trên một rừng cột mảnh. Mặt đất phía dưới thoáng, các nhà đá thấp đứng lẻ trong vườn."),
      W("Khối chính – khối phụ", "Khối chính là hai dải cầu đọc, chiếm khoảng 63% sàn và cao +13,95. Khối phụ là nhà sự kiện (+6,95) và các nhà đá một tầng, đều thấp và tối màu."),
      W("Nắng và chói", "Hai dải chạy dọc khu đất: mặt Trần Phú (250°) đặc, mặt sông (70°) có lam. Vườn dưới cầu nằm trong bóng của dải đọc cả buổi chiều. Đầu Nam (160°) của hai dải có mái đua."),
      W("Gió và mưa", "Vườn dưới cầu thông suốt từ đầu Nam lên đầu Bắc nên gió Đông Nam mùa hè lùa dưới sàn đọc, làm mát cả nhà. Mùa mưa người đi dưới cầu như đi dưới mái hiên dài."),
      W("Công năng", "Đầu Bắc: nhà sự kiện, phòng chuyên đề, vệ sinh, sảnh kính có cà phê và trưng bày. Kho, nghiệp vụ trong nhà đá sát lối Tây. Tầng 2: văn phòng ở đầu Bắc, khu đọc mở, thiếu nhi. Tầng 3: đọc yên tĩnh, học nhóm, xa nhà sự kiện.")],
    kc: { he: "Dải tầng 2 đứng trên lưới cột cây 5 × 5,5 m: thân thép ống cao 3,3 m, đỉnh tỏa 4 nhánh ngắn đỡ dầm sàn; chỗ có nhà đá bên dưới thì tựa lên tường nhà đá. Dải tầng 3 tựa lên dải tầng 2 và một hàng cột thẳng ở mép sông. Nhà sự kiện tường bao chịu lực, dàn mái nhịp 14 m.", nhip: "14 m (nhà sự kiện); sàn cầu chỉ nhịp 3–5 m giữa các đầu nhánh", cx: "Không quá 2 m" },
    qa: [["Cột cây mảnh như vậy có đủ cứng khi gió bão?", "Mỗi cây có 4 nhánh tỏa bốn hướng nên đứng như cái kiềng; cả rừng cây cùng các nhà đá và lõi thang giằng sàn theo hai phương. Mỗi đầu nhánh chỉ đỡ một ô sàn nhỏ."],
      ["Dải tầng 3 nhô về phía sông có cần dầm lớn?", "Không. Phần nhô 6 m có hàng cột thẳng từ móng lên ở mép sông, cách nhau 5,5 m, nên dầm sàn chỉ nhịp ngắn như phần còn lại."]],
    cut: "Dải tầng 2: foam trắng 9 × 30 × 2,25 cm. Dải tầng 3: foam trắng 8 × 25 × 2,25 cm dán lệch về phía sông. Cột cây: que tre 3 mm cao 1,65 cm, nhánh dây đồng 1 mm. Nhà sự kiện: foam đen 8 × 7 × 3,25 cm. Nhà đá: foam xám.",
    ngoaigio: "Nhà sự kiện, phòng chuyên đề, cụm vệ sinh và sảnh kính (cà phê, trưng bày) tụ ở đầu Bắc, cửa riêng mở ra quảng trường Bắc. Đường khóa đặt ở chân cầu thang và thang máy lên dải đọc trong sảnh kính, cùng cửa sảnh nhìn vào vườn phía Nam. Cửa khóa chỉ đóng chiều đi vào khu đọc; thang thoát nạn của dải đọc xuống thẳng vườn nên không bị khu sự kiện chắn.",
    roleOf: () => "p",
    lab: [[23, 70, 9.45, "Khối chính · Dải cầu đọc tầng 2", 1], [30, 60, 13.95, "Dải đọc tầng 3 lệch về sông"], [30, 20, 6.95, "Khối phụ · Nhà sự kiện", 2], [12, 70, 4.95, "Khối phụ · Nhà đá: kho, nghiệp vụ", 2], [12, 32, 4.95, "Khối phụ · Nhà đá: vệ sinh, kỹ thuật", 2], [10, 20, 4.95, "Khối phụ · Phòng chuyên đề", 2], [28, 40, 4.95, "Khối phụ · Sảnh kính, cà phê", 2], [26, 80, 3.3, "Vườn cột cây"]],
    build() {
      const v = [], st = [];
      const ground = [[22, 13, 16, 14], [6, 13, 9, 14], [6, 27, 12, 10.5], [22, 27, 13, 24], [6, 58, 12, 25]];
      v.push(hall1(22, 13, 16, 14, "blk"), fl(6, 13, 9, 14, 0, "stone", "D", fK, { top: "grass" }), fl(6, 27, 12, 10.5, 0, "stone", "E", fK, { top: "grass" }),
        fl(22, 27, 13, 24, 0, "glass", "A", fG), fl(6, 58, 12, 25, 0, "stone", "C", fK, { top: "grass" }));
      // dải tầng 2 và dải tầng 3
      v.push(fl(14, 28, 18, 11, 1, "sheet", "E", fR, M), fl(14, 39, 18, 49, 1, "sheet", "B", fR, M), fl(22, 36, 16, 50, 2, "sheet", "B", fR, M));
      // rừng cột cây dưới dải tầng 2, chỉ ở chỗ không có nhà đá
      const br = [];
      for (const x of [15.5, 20.5, 25.5, 30.5]) for (let y = 30.5; y <= 86; y += 5.5) {
        if (ground.some(r => x > r[0] - 0.8 && x < r[0] + r[2] + 0.8 && y > r[1] - 0.8 && y < r[1] + r[3] + 0.8)) continue;
        v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, 3.3, "sheet", "X"));
        st.push(col(x, y, 0, 3.3));
        for (const [dx, dy] of [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]]) br.push(seg([x, y, 3.3], [x + dx, y + dy, Z(1)]));
      }
      st.push(...br); v.push(LN(br.map(s => [s.a, s.b]), "ink"));
      // hàng cột thẳng đỡ phần dải tầng 3 nhô về phía sông
      for (const y of [36.6, 42, 47.5, 53, 58.5, 64, 69.5, 75, 80.5, 85.4]) pier(v, st, 37.4, y, Z(2));
      st.push(...shell(22, 13, 16, 14, 0.45, 6.95), ...grid([6, 15], [13, 27], 0.45, 4.95), ...grid([6, 18], [27, 37.5], 0.45, 4.95), ...grid([22, 35], [27, 39, 51], 0.45, 4.95), ...grid([6, 12, 18], [58, 70.5, 83], 0.45, 4.95),
        ...range(28, 88, 6).map(y => seg([14, y, Z(1)], [32, y, Z(1)])), ...range(36, 86, 6.25).map(y => seg([22, y, Z(2)], [38, y, Z(2)])));
      return { v, st };
    }
  });

  /* ---------- 18.3 · từ 8.4 Trụ ngả về phố, dây xòe qua mái ---------- */
  I8.push({
    id: "gh3", fam: "ghim", code: "18.3", from: "8.4", name: "Hộp đọc nằm thấp, trụ ngả về phố", rule: "Tương phản trước – sau",
    tag: "Một trụ thon mọc từ dãy đá phía Tây, ngả về Trần Phú; dây xòe qua mái giữ mép sông của hộp đọc một tầng, nên gầm phía sông rộng 12 m không cột",
    story: "Giữ từ 8.4: trụ mọc từ dãy tường đá phía Tây, ngả về phố, dây xòe như nan quạt qua mái giữ mép sông của hộp đọc, gầm phía sông không có cột. Đổi: hộp đọc chỉ còn một tầng nằm ở tầng 2 (+4,95 đến +9,45), trụ thấp xuống còn 24 m; nửa phía phố của hộp đứng trên chân kính tầng 1, nửa phía sông treo bằng dây. Phòng đa năng thành một khối cao hai tầng ở đầu Bắc, cùng cao với hộp đọc.",
    why: [W("Quy luật hình khối", "Tương phản trước – sau: nhìn từ Trần Phú thấy trụ ngả và quạt dây trước, hộp trắng phía sau; nhìn từ bậc thang Bạch Đằng thấy hộp nằm ngang trên một gầm sâu không cột."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc cùng chân kính và khối phòng đa năng, chiếm khoảng 75% sàn. Khối phụ là dãy đá phía Tây và nhà chuyên đề, một tầng (+4,95)."),
      W("Nắng và chói", "Dãy đá che toàn bộ mặt Trần Phú (250°). Mặt sông (70°) của hộp có lam; gầm sâu 12 m làm mái hiên cho sảnh nên nắng sáng không vào tới chỗ ngồi tầng 1."),
      W("Gió và mưa", "Gầm hộp mở về đầu Nam đón gió Đông Nam mùa hè. Mưa tạt từ sông mùa đông rơi ngoài mép gầm, sảnh kính lùi vào trong 12 m."),
      W("Công năng", "Đầu Bắc: phòng đa năng cao hai tầng, phòng chuyên đề, vệ sinh trong dãy đá, cà phê ở đầu sảnh kính. Dãy đá: vệ sinh, văn phòng phía Bắc; kho, nghiệp vụ phía Nam sát chỗ giao nhận. Hộp đọc tầng 2: khu đọc chính.")],
    kc: { he: "Trụ bê tông thon cao 24 m, ngả 12° về phía Tây, chân đúc liền với tường dày dãy đá (dãy đá vừa là móng vừa là đối trọng). 14 dây văng nửa quạt giữ hai đường neo trên mái hộp; nửa phía phố của hộp tựa lên khung chân kính và dãy đá. Hai mặt dọc hộp là dàn thép cao 4,5 m.", nhip: "12 m (gầm phía sông, giữ bằng dây)", cx: "Không; mép sông treo bằng dây văng" },
    qa: [["Trụ ngả về phía phố có đổ ra đường?", "Không. Dây kéo đỉnh trụ về phía sông, còn trụ ngả về phía phố, hai lực cân nhau như người kéo co ngả người ra sau. Chân trụ đúc liền với tường dày của dãy đá nên không bị lật."],
      ["Hộp chỉ một tầng có cần dây văng?", "Nhờ dây mà gầm phía sông rộng 12 m không cần cột, sảnh mở hết về bậc thang Bạch Đằng. Dây ngắn hơn trước vì trụ thấp, mỗi dây chỉ giữ một đoạn mép hộp khoảng 6 m."]],
    cut: "Hộp đọc: foam trắng 12 × 26 × 2,25 cm, kê trên chân kính mica 6 × 26 × 2,25 cm (nửa phía phố). Dãy đá: foam xám 4 × 35 × 2,25 cm. Trụ: thanh gỗ vát 0,8 × 1,2 cm cao 12 cm, nghiêng 12°. Dây: chỉ trắng. Phòng đa năng: foam trắng 8 × 7 × 4,5 cm.",
    ngoaigio: "Phòng đa năng, phòng chuyên đề và cà phê ở đầu Bắc có cửa riêng ra quảng trường Bắc; vệ sinh ngoài giờ là cụm phía Bắc của dãy đá, mở thẳng vào sảnh đầu Bắc. Đường khóa đặt ở giữa sảnh kính, trước cầu thang lên hộp đọc và khu thiếu nhi. Gầm phía sông là không gian ngoài trời, mọi phòng sự kiện đều có cửa thoát ra quảng trường hoặc gầm, không đi qua đường khóa.",
    roleOf: () => "p",
    lab: [[27, 55, 9.45, "Khối chính · Hộp đọc treo mép sông", 1], [5, 50, 24, "Trụ ngả về phố 12°, cao 24 m"], [22, 20, 9.45, "Phòng đa năng cao hai tầng"], [34, 20, 4.95, "Khối phụ · Phòng chuyên đề", 2], [10, 70, 4.95, "Khối phụ · Dãy đá phía Tây: kho, nghiệp vụ", 2], [32, 55, 2.5, "Gầm 12 m không cột"]],
    build() {
      const P = pylon(10, 50, 0, 5, 50, 24, [1.4, 2.4], [0.7, 1.2], M);
      const v = [P,
        hall2(14, 13, 16, 14, "sheet"), fl(30, 13, 8, 15.5, 0, "stone", "D", fK, { top: "grass" }),
        fl(6, 20, 8, 31.5, 0, "stone", "E", fK, { top: "stoneTop" }), fl(6, 51.5, 8, 37.5, 0, "stone", "C", fK, { top: "stoneTop" }),
        fl(14, 28, 6, 12, 0, "glass", "E", fG, M), fl(14, 40, 6, 24, 0, "glass", "A", fG, M), fl(20, 28, 6, 28, 0, "glass", "A", fG, M), fl(20, 56, 6, 8, 0, "glass", "B", fG, M), fl(14, 64, 12, 16, 0, "glass", "B", fG, M),
        fl(14, 28, 24, 52, 1, "sheet", "B", fR, M)];
      const along = (x, ys) => ys.map(y => [x, y, Z(2)]);
      const cb = [...stays(P, 16, 23, along(38, [30, 36.8, 43.6, 50.4, 57.2, 64, 70.8, 77.6])), ...stays(P, 16, 23, along(31, [32, 41, 50, 59, 68, 77]), [0.3, 0])];
      v.push(cables(cb));
      const st = [seg([10, 50, 0], [5, 50, 24]), ...cb, wall(6, 20, 0.6, 69, 0.45, 4.95), wall(13.4, 20, 0.6, 69, 0.45, 4.95),
        ...cols([14, 20, 26], [28, 36, 44, 52, 60, 68, 76, 80], Z(1)), ...shell(14, 13, 16, 14, 0.45, 9.45), ...grid([30, 38], [13, 28.5], 0.45, 4.95),
        ...range(28, 80, 6.5).map(y => seg([14, y, Z(1)], [38, y, Z(1)])), seg([14, 28, Z(2)], [14, 80, Z(2)]), seg([38, 28, Z(2)], [38, 80, Z(2)])];
      return { v, st };
    }
  });

  /* ---------- 18.4 · từ 10.3 Ba tầng đọc kéo lệch ---------- */
  I8.push({
    id: "gh4", fam: "ghim", code: "18.4", from: "10.3", name: "Hai tầng đọc trượt như ngăn kéo", rule: "Lệch có kiểm soát trên lưới",
    tag: "Tầng 2 trượt 4 m ra phía sông và 4 m về phía Nam so với tầng 1; phần nhô thành hiên có hàng cột, phần lõm thành sân thượng",
    story: "Giữ từ 10.3: các sàn đọc là các hộp chồng lên nhau, tầng trên trượt lệch như ngăn tủ đang kéo ra. Đổi: chỉ còn hai tầng; phòng đa năng thành một khối cao hai tầng nối vào đầu Bắc của hộp, cùng cao với tầng 2; dưới mép tầng 2 nhô ra phía sông có hàng cột tạo hiên đón khách từ bậc thang Bạch Đằng.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: hai hộp giống nhau, hộp trên trượt đúng một bước 4 m theo hai phương. Phía nhô ra thành hiên có cột, phía lõm vào thành sân thượng đọc sách trên mái tầng 1."),
      W("Khối chính – khối phụ", "Khối chính là hai hộp đọc cùng khối phòng đa năng cao hai tầng, chiếm hơn 90% sàn. Khối phụ là nhà chuyên đề một tầng bằng đá ở góc Đông Bắc."),
      W("Nắng và chói", "Tầng 2 nhô 4 m che nắng sáng cho mặt sông (70°) của tầng 1. Mặt Trần Phú (250°) đặc; sân thượng phía Tây có lan can đặc cao. Mặt Bắc (340°) lấy sáng tán xạ."),
      W("Gió và mưa", "Hiên có cột dọc mặt sông che mưa mùa đông cho lối vào. Sân thượng phía Bắc và phía Tây đón gió; đầu Nam tầng 2 nhô 3,5 m làm mái đua đón gió Đông Nam vào khu thiếu nhi."),
      W("Công năng", "Đầu Bắc: phòng đa năng, phòng chuyên đề, sảnh có cà phê và trưng bày. Dọc lối Tây: vệ sinh, văn phòng, rồi kho, nghiệp vụ. Góc Đông Nam: thiếu nhi. Tầng 2: khu đọc, học nhóm, văn phòng nhỏ.")],
    kc: { he: "Khung bê tông lưới 6 × 8 m, cột thẳng. Tầng 2 nhô 4 m về phía sông, đỡ bằng hàng cột mảnh ở mép hiên cách nhau khoảng 6 m; phía Nam nhô 3,5 m bằng dầm công xôn. Phòng đa năng tường bao chịu lực, dàn mái nhịp 14 m.", nhip: "14 m (phòng đa năng)", cx: "3,5 m (đầu Nam); mép sông có hàng cột" },
    qa: [["Tầng trên lệch tầng dưới thì cột có thẳng không?", "Có. Lưới cột giữ nguyên cho cả hai tầng; tầng 2 trượt đúng một bước lưới, nên ở mép nhô ra có thêm một hàng cột từ móng lên, ở mép lõm vào thì cột tầng 1 dừng ở sân thượng."],
      ["Sân thượng trên mái tầng 1 có dột?", "Sân thượng là mái bằng có lớp chống thấm, sàn gỗ kê trên chân, dốc 1–2% thoát ra mép Bắc và mép Tây, có máng ẩn dưới lan can."]],
    cut: "Tầng 1: foam trắng 12 × 23 × 2,25 cm. Tầng 2: foam trắng 12 × 23 × 2,25 cm dán lệch 2 cm về phía sông và 2 cm về phía Nam. Hàng cột hiên: que tre 2 mm cao 2,25 cm. Phòng đa năng: foam trắng 8 × 7 × 4,5 cm. Nhà chuyên đề: foam xám 5,5 × 7 × 2,25 cm.",
    ngoaigio: "Phòng đa năng, phòng chuyên đề và sảnh có cà phê, trưng bày nằm ở đầu Bắc, cửa riêng ra quảng trường Bắc; cụm vệ sinh ở góc Tây Bắc của tầng 1 mở vào sảnh. Đường khóa đặt ở cửa giữa sảnh với khu thiếu nhi, kho và cầu thang lên tầng 2. Hiên có cột dọc mặt sông là lối thoát ra ngoài trời cho cả sảnh và phòng đa năng, không qua đường khóa.",
    roleOf: () => "p",
    lab: [[26, 56, 9.45, "Khối chính · Hai tầng đọc trượt lệch 4 m", 1], [37.7, 50, 3, "Hiên có hàng cột"], [18, 21, 9.45, "Phòng đa năng cao hai tầng"], [31.5, 21, 4.95, "Khối phụ · Nhà chuyên đề", 2], [12, 30, 4.95, "Sân thượng lõm"]],
    build() {
      const v = [], st = [];
      v.push(hall2(10, 14, 16, 14, "sheet"), fl(26, 14, 11, 14, 0, "stone", "D", fK, { top: "grass" }),
        fl(10, 28, 12, 21, 0, "sheet", "E", fK, M), fl(10, 49, 12, 25.5, 0, "sheet", "C", fK, M), fl(22, 28, 12, 26, 0, "sheet", "A", fG, M), fl(22, 54, 12, 20.5, 0, "sheet", "B", fR, M),
        fl(14, 32, 8, 9, 1, "sheet", "E", fR, M), fl(22, 32, 16, 9, 1, "sheet", "B", fR, M), fl(14, 41, 24, 37, 1, "sheet", "B", fR, M));
      for (const y of [33, 39.5, 46, 52.5, 59, 65.5, 72, 77.4]) pier(v, st, 37.7, y, Z(1));
      st.push(...cols([10, 16, 22, 28, 34], [28, 36, 44, 52, 60, 68, 74.5], Z(1)), ...shell(10, 14, 16, 14, 0.45, 9.45), ...grid([26, 37], [14, 28], 0.45, 4.95));
      return { v, st };
    }
  });

  /* ---------- 18.5 · từ 10.5 Hộp lớn ven sông, hộp nhỏ ven phố ---------- */
  I8.push({
    id: "gh5", fam: "ghim", code: "18.5", from: "10.5", name: "Hộp đọc lớn phía Nam, hộp đỏ nhỏ góc phố", rule: "Bất đối xứng cân bằng",
    tag: "Hộp đọc trắng hai tầng chiếm nửa Nam khu đất, hộp đỏ một tầng đứng ở góc phố – Bắc; giữa hai hộp là hiên kính thấp",
    story: "Giữ từ 10.5: một hộp lớn và một hộp nhỏ màu đỏ đặt lệch hai góc chéo, nối nhau bằng một hiên kính thấp. Đổi: hộp lớn hạ còn hai tầng; phòng đa năng chuyển vào góc Tây Bắc của hộp lớn thành phòng cao hai tầng, nhìn thẳng ra hiên; hộp đỏ nhỏ lại thành phòng chuyên đề và cà phê một tầng sát phố.",
    why: [W("Quy luật hình khối", "Bất đối xứng cân bằng: hộp lớn nặng nằm lệch về phía Nam, hộp đỏ nhỏ và đậm màu nằm lệch về góc Tây Bắc; hiên kính thấp ở giữa như cán cân nối hai đầu."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc trắng hai tầng (có phòng đa năng bên trong), chiếm hơn 80% sàn. Khối phụ là hộp đỏ và hiên kính, đều một tầng (+4,95)."),
      W("Nắng và chói", "Mặt Trần Phú (250°) của hộp lớn đặc; mặt sông (70°) có lam. Hiên kính nằm giữa hai hộp, mặt Đông và Tây có lam, mặt Bắc (340°) kính lấy sáng tán xạ."),
      W("Gió và mưa", "Khoảng sân giữa hộp đỏ và bờ sông mở về phía Đông Nam đón gió hè. Hộp đỏ đặc phía Bắc che hiên khỏi gió mùa đông."),
      W("Công năng", "Hộp đỏ: phòng chuyên đề, cà phê. Hiên kính: trưng bày, lối vào chung. Hộp lớn tầng 1: phòng đa năng góc Tây Bắc, vệ sinh và văn phòng góc Đông Bắc, sảnh thư viện, kho và nghiệp vụ phía Tây, thiếu nhi phía Đông. Tầng 2: khu đọc.")],
    kc: { he: "Hộp lớn khung bê tông lưới 6 × 8 m, cột thẳng hai tầng; phòng đa năng 16 × 14 m tường bao chịu lực, dàn mái thép nhịp 14 m. Hộp đỏ tường bê tông chịu lực. Hiên kính khung thép nhẹ một tầng.", nhip: "14 m (phòng đa năng)", cx: "Không" },
    qa: [["Phòng đa năng nằm trong hộp đọc, tầng 2 đè lên có được không?", "Không có gì đè lên phòng đa năng: phần tầng 2 phía trên nó được khoét bỏ, phòng cao trọn hai tầng với dàn mái riêng gác lên tường bao."],
      ["Hộp đỏ có cần màu đỏ?", "Màu đỏ đất (gạch nung hoặc sơn khoáng) để người đi đường Trần Phú nhận ra ngay lối vào khu sự kiện, kể cả ngoài giờ khi thư viện đã đóng."]],
    cut: "Hộp lớn: foam trắng 12,5 × 26 × 4,5 cm, khoét góc phòng đa năng sâu 2,25 cm ở tầng 2. Hộp đỏ: foam đỏ 8 × 7 × 2,25 cm. Hiên kính: mica 11 × 4,5 × 2,25 cm.",
    ngoaigio: "Ngoài giờ, khách vào hiên kính từ quảng trường Bắc hoặc góc phố; hộp đỏ (phòng chuyên đề, cà phê), phòng đa năng và cụm vệ sinh góc Đông Bắc hộp lớn đều mở cửa vào hiên. Đường khóa đặt ở cửa từ hiên vào sảnh thư viện và ở hành lang sau phòng đa năng. Hiên kính có cửa ra cả quảng trường Bắc lẫn sân phía sông nên tuyến thoát nạn không đi qua khu khóa.",
    roleOf: () => "p",
    lab: [[28, 70, 9.45, "Khối chính · Hộp đọc lớn hai tầng", 1], [20, 43, 9.45, "Phòng đa năng cao hai tầng"], [14, 20, 4.95, "Khối phụ · Hộp đỏ: chuyên đề, cà phê", 2], [24, 31.5, 4.95, "Khối phụ · Hiên kính trưng bày", 2]],
    build() {
      const v = [], st = [];
      v.push(fl(6, 13, 9, 14, 0, "warn", "D", fK, { top: "warn" }), fl(15, 13, 7, 14, 0, "warn", "A", fK, { top: "warn" }), fl(10, 27, 22, 9, 0, "glass", "A", fG),
        hall2(12, 36, 16, 14, "sheet"), fl(28, 36, 9, 14, 0, "sheet", "E", fK, M), fl(12, 50, 12, 13, 0, "sheet", "A", fG, M), fl(12, 63, 12, 25, 0, "sheet", "C", fK, M), fl(24, 50, 13, 38, 0, "sheet", "B", fR, M),
        fl(12, 50, 12, 16.5, 1, "sheet", "E", fK, M), fl(28, 36, 9, 14, 1, "sheet", "B", fR, M), fl(24, 50, 13, 38, 1, "sheet", "B", fR, M), fl(12, 66.5, 12, 21.5, 1, "sheet", "B", fR, M));
      st.push(...cols([12, 18, 24, 30.5, 37], [36, 44, 50, 58, 66, 74, 81, 88], Z(2), [[12, 36, 16, 14]]), ...shell(12, 36, 16, 14, 0.45, 9.45), ...shell(6, 13, 16, 14, 0.45, 4.95), ...grid([10, 21, 32], [27, 36], 0.45, 4.95));
      return { v, st };
    }
  });

  /* ---------- 18.6 · từ 10.7 Hộp đá khoét ô lộ hộp màu ---------- */
  I8.push({
    id: "gh6", fam: "ghim", code: "18.6", from: "10.7", name: "Hộp đá hai tầng khoét ô, lộ hộp vàng và hộp xanh", rule: "Khối trừ, khoét nhiều ô nhỏ",
    tag: "Khối đá hai tầng khoét ba ô: hiên vào phía sông lộ hộp vàng, hộp xanh trượt ra khỏi mặt Bắc, góc Đông Nam tầng 2 khoét thành sân thượng",
    story: "Giữ từ 10.7: khối đá đặc bị khoét ô để lộ các hộp màu bên trong. Đổi: khối đá chỉ còn hai tầng và dài hơn; phòng đa năng là một khoang cao hai tầng trong góc Tây Bắc khối đá; hộp xanh khu đọc không nằm trong ô khoét nữa mà trượt ra khỏi mặt Bắc 2 m như ngăn kéo; nhà chuyên đề ốp gỗ đứng riêng ở đầu Bắc.",
    why: [W("Quy luật hình khối", "Khối trừ: một khối đá đơn giản bị khoét ba chỗ, mỗi chỗ có một lý do (lối vào, ánh sáng, sân thượng). Trong ô khoét lộ ra hộp vàng và hộp xanh, tương phản giữa đá xám đặc và màu sáng."),
      W("Khối chính – khối phụ", "Khối chính là khối đá hai tầng cùng các hộp màu, chiếm hơn 90% sàn. Khối phụ là nhà chuyên đề ốp gỗ một tầng ở đầu Bắc."),
      W("Nắng và chói", "Tường đá dày che mặt Trần Phú (250°). Ô hiên phía sông sâu 4 m nên nắng sáng (70°) không chiếu vào hộp vàng. Hộp xanh nhìn Bắc (340°) lấy sáng tán xạ cho phòng đọc."),
      W("Gió và mưa", "Sân thượng khoét ở góc Đông Nam tầng 2 đón gió Đông Nam mùa hè. Ô hiên phía sông che mưa tạt mùa đông cho lối vào."),
      W("Công năng", "Tầng 1: phòng đa năng góc Tây Bắc, sảnh và cà phê phía sông quanh hộp vàng, vệ sinh và văn phòng rồi kho, nghiệp vụ dọc lối Tây, thiếu nhi phía Nam. Tầng 2: hộp xanh đọc yên tĩnh, khu đọc mở, học nhóm, sân thượng đọc ngoài trời.")],
    kc: { he: "Khung bê tông lưới 6 × 8 m, cột thẳng hai tầng, tường bao ốp đá. Ô hiên phía sông: sàn tầng 2 nhô tối đa 4 m qua hộp vàng bằng dầm thường. Hộp xanh nhô 2 m khỏi mặt Bắc. Phòng đa năng tường bao chịu lực, dàn mái nhịp 14 m.", nhip: "16 m (phòng đa năng)", cx: "4 m (ô hiên), 2 m (hộp xanh)" },
    qa: [["Khoét ô hiên ở tầng 1 có làm yếu khối nhà?", "Không. Ô hiên chỉ sâu 4 m, sàn tầng 2 phía trên vươn ra 4 m từ mép hộp vàng và từ hai tường hai bên ô, là dầm công xôn thường; cột trong nhà vẫn thẳng một mạch."],
      ["Khối đá có nặng nề, tối?", "Ánh sáng vào từ ba ô khoét và sân thượng; tường đá có khe cửa hẹp ở mặt Trần Phú và lam ở mặt sông, bên trong sáng đều mà không chói."]],
    cut: "Khối đá: foam xám đậm 13 × 29 × 4,5 cm, khoét ô hiên 2 × 7 × 2,25 cm và góc sân thượng 4 × 7 × 2,25 cm. Hộp vàng: foam vàng 3 × 7 × 2,25 cm. Hộp xanh: foam xanh 5 × 8 × 2,25 cm, dán nhô 1 cm khỏi mặt Bắc. Nhà chuyên đề: foam ốp giấy vân gỗ 5 × 6,5 × 2,25 cm.",
    ngoaigio: "Phòng đa năng góc Tây Bắc và nhà chuyên đề ốp gỗ ở đầu Bắc có cửa riêng ra quảng trường Bắc; cà phê, trưng bày và sảnh quanh hộp vàng mở ra ô hiên phía sông; cụm vệ sinh nằm ngay sau phòng đa năng. Đường khóa đặt ở cửa giữa sảnh với khu thiếu nhi, kho và cầu thang lên tầng 2. Phòng đa năng và sảnh đều có cửa thoát ra quảng trường hoặc ô hiên ngoài trời.",
    roleOf: () => "p",
    lab: [[18, 64, 9.45, "Khối chính · Hộp đá hai tầng khoét ô", 1], [31, 34, 9.45, "Hộp xanh trượt ra mặt Bắc"], [29, 49, 4.95, "Ô hiên lộ hộp vàng"], [32, 73, 4.95, "Sân thượng khoét góc"], [18, 35, 9.45, "Phòng đa năng cao hai tầng"], [15, 20, 4.95, "Khối phụ · Nhà chuyên đề ốp gỗ", 2]],
    build() {
      const S = (x, y, w, d, k, zone, fa) => fl(x, y, w, d, k, "stone", zone, fa, { top: "stoneTop", ...M });
      const v = [], st = [];
      // tầng 1
      v.push(hall2(10, 28, 16, 14, "stone", { top: "stoneTop" }), S(26, 28, 10, 14, 0, "A", fG), fl(26, 42, 6, 14, 0, "gold", "A", fG, M), S(10, 42, 12, 13, 0, "E", fK), S(10, 55, 12, 25, 0, "C", fK),
        S(22, 42, 4, 38, 0, "B", fR), S(26, 56, 10, 10, 0, "A", fG), S(26, 66, 10, 14, 0, "B", fR), S(10, 80, 26, 6, 0, "B", fR));
      // tầng 2: hộp xanh nhô ra mặt Bắc, khoét sân thượng góc Đông Nam
      v.push(fl(26, 26, 10, 16, 1, "accent", "B", fR, M), S(22, 42, 14, 24, 1, "B", fR), S(10, 42, 12, 14, 1, "E", fK), S(10, 56, 12, 30, 1, "B", fR), S(22, 66, 6, 20, 1, "B", fR), S(28, 80, 8, 6, 1, "B", fR));
      // nhà chuyên đề ốp gỗ
      v.push(fl(10, 14, 10, 13, 0, "deck", "D", fK, { top: "grass" }));
      st.push(...cols([10, 16, 22, 28, 36], [28, 34, 42, 50, 56, 64, 72, 80, 86], Z(2), [[10, 28, 16, 14], [31.9, 42, 4.2, 14]]), ...shell(10, 28, 16, 14, 0.45, 9.45), ...grid([10, 20], [14, 27], 0.45, 4.95));
      return { v, st };
    }
  });
})(window.G3);
