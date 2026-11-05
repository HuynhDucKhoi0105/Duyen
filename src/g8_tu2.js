
/* ================= Đợt 6 · nhóm 19: 5 ý tưởng tự sáng tạo (19.6–19.10), 2–3 tầng, theo file ghi chú đề bài ================= */
(function (G) {
  const { B, SH, PO, FR, col, zig, range } = G.K;
  const { colsIn } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I8 = G.ideas8 = G.ideas8 || [];
  const Z = k => 0.45 + 4.5 * k;
  const FD = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khối đọc
  const FS = { N: "dac", E: "lam", S: "dua", W: "dac" }; // khối kín: kho, sự kiện, kỹ thuật
  const FG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // khối kính, cầu nối
  // một tầng của khối chữ nhật ở tầng k
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // cột quanh chu vi, cách nhau ≤ step, thẳng từ móng lên đỉnh
  function perim(x, y, w, d, z2, step = 8) {
    const o = [], nx = Math.max(1, Math.ceil(w / step)), ny = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= nx; i++) for (const yy of [y, y + d]) o.push(col(x + w * i / nx, yy, 0, z2));
    for (let j = 1; j < ny; j++) for (const xx of [x, x + w]) o.push(col(xx, y + d * j / ny, 0, z2));
    return o;
  }
  // hàng cột mảnh nhìn thấy được: vừa là khối trong mô hình, vừa là cột trong kết cấu
  function pilotis(v, st, xs, ys, zTop, z0 = 0) {
    for (const x of xs) for (const y of ys) { st.push(col(x, y, z0, zTop)); v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, z0, zTop, "sheet", "X")); }
  }
  // đa giác cung tròn: vành khuyên từ góc a1 đến a2 (độ; 0 = về phía sông, 90 = về đầu Nam), bán kính trong r1, ngoài r2
  function arc(cx, cy, r1, r2, a1, a2, n = 12) {
    const P = (r, a) => [+(cx + r * Math.cos(a * Math.PI / 180)).toFixed(2), +(cy + r * Math.sin(a * Math.PI / 180)).toFixed(2)];
    const o = [];
    for (let i = 0; i <= n; i++) o.push(P(r2, a1 + (a2 - a1) * i / n));
    for (let i = n; i >= 0; i--) o.push(P(r1, a1 + (a2 - a1) * i / n));
    return o;
  }
  const octagon = (cx, cy, r) => Array.from({ length: 8 }, (_, i) => { const a = (22.5 + 45 * i) * Math.PI / 180; return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)]; });

  /* ---------- 19.6 · Chợ sách một tầng cao, mái răng cưa ---------- */
  I8.push({
    id: "tu6", fam: "tu", code: "19.6", from: "tự sáng tạo", name: "Chợ sách cao 9 m, gác lửng dưới mái răng cưa", rule: "Một mái lớn lặp nhịp, ba dãy thấp bám bên",
    tag: "Một nhà đọc cao 9 m như nhà chợ, bên trong có gác lửng, mái răng cưa sáu nhịp lấy sáng hướng Bắc; phòng đa năng nằm trong cùng mái; dãy kho, văn phòng một tầng bám dọc lối Tây",
    story: "Chợ Hàn và chợ Cồn ở Đà Nẵng đều là một mái lớn che một sàn chợ thông suốt, bên trong tự chia quầy. Ý tưởng mượn cách đó cho thư viện: một nhà đọc dài 48 m, rộng 24 m, cao 9 m không cột giữa, mái răng cưa sáu nhịp 8 m. Bên trong, gác lửng chạy dọc hai bên như tầng lửng của chợ, chính giữa để trống nhìn lên mái. Đầu Nam của cùng mái đó là phòng đa năng 120 chỗ, cao 9 m. Dãy một tầng phía Tây chứa văn phòng, kho, nghiệp vụ; khối cà phê, trưng bày một tầng khép đầu Nam, mở ra bãi xe và bậc sông. Sau khi xem thư viện Pierre Veillet ở Bordeaux (mái răng cưa gỗ trên một sàn đọc), tôi giữ ý mái răng cưa nhưng kéo cao lên 9 m để đủ chỗ cho gác lửng.",
    why: [W("Quy luật hình khối", "Lặp lại một nhịp: sáu răng mái cùng cỡ chạy dọc, nhìn từ sông đọc ngay là một mái chợ. Ba dãy thấp bám bên và đầu Nam làm nền; khối cao duy nhất là nhà chợ nên hình khối có một chủ rõ."),
      W("Khối chính – khối phụ", "Khối chính là nhà chợ sách và phòng đa năng trong cùng mái, chiếm 65% sàn, cao +9,45 (đỉnh răng +12,45). Khối phụ là dãy Tây, khối vệ sinh góc Tây Nam và khối cà phê đầu Nam, đều một tầng +4,95, tối màu."),
      W("Nắng và chói", "Mỗi răng mái có mặt đứng quay về đầu Bắc (340°), lấy sáng tán xạ đều cho cả sàn đọc; mặt dốc quay về Nam đặc. Mặt Trần Phú đặc nhờ dãy kho che kín. Mặt sông chỉ là đầu hồi hẹp của các răng mái."),
      W("Gió và mưa", "Khối cà phê đầu Nam thấp hơn nhà chợ nên gió Đông Nam mùa hè vượt qua, vào các cửa cao dưới răng mái và thoát ra đầu Bắc. Mưa mùa đông từ phía sông đập vào mặt dài có hiên gác lửng che."),
      W("Công năng", "Sàn chợ: đọc mở, kệ sách, thiếu nhi ở đầu Bắc có sân; gác lửng: đọc yên tĩnh, học nhóm, tra cứu số. Phòng đa năng nối thẳng với cà phê, trưng bày ở đầu Nam. Kho, nghiệp vụ ở dãy Tây giữa, giao nhận từ lối Tây.")],
    kc: { he: "Nhà chợ: khung bê tông hai hàng cột biên cách 8 m, vì kèo thép răng cưa nhịp 24 m; gác lửng là sàn thép treo vào cột biên, rộng 6 m mỗi bên. Phòng đa năng dùng hai nhịp răng mái cuối, không cột giữa. Các dãy một tầng khung bê tông 6 m.", nhip: "24 m (vì kèo răng cưa)", cx: "Không" },
    qa: [["Mái răng cưa nhịp 24 m đứng bằng gì?", "Mỗi răng là một vì kèo thép tam giác cao 3 m đặt cách 8 m, gối lên hai hàng cột biên; đây là kết cấu nhà xưởng thông thường, không có phần đua."],
      ["Gác lửng trong nhà chợ có ồn không?", "Gác lửng chỉ rộng 6 m mỗi bên, lùi về hai mép; khu đọc yên tĩnh và học nhóm đặt trên gác lửng đầu Bắc, xa phòng đa năng ở đầu Nam. Giữa hai bên là khoảng trống cao 9 m làm vùng đệm."]],
    cut: "Nhà chợ: foam 12 × 24 × 4,5 cm, trên gắn 6 răng mái bìa cắt chéo 12 × 4 cm cao 1,5 cm. Dãy Tây: foam xám 4,5 × 14,5 và 4,5 × 17 cm cao 2,25 cm, khối vệ sinh 4,5 × 3,5 cm. Khối Nam: foam 12 × 7 × 2,25 cm. Gác lửng: bìa mỏng 3 × 24 cm dán hai bên trong.",
    ref: { name: "Thư viện Pierre Veillet, Bordeaux Caudéran", by: "Atelier d'Architecture King Kong", year: "không ghi năm trong nguồn", place: "Bordeaux, Pháp", award: "", url: "https://divisare.com/projects/428882-atelier-d-architecture-king-kong-arthur-pequin-pierre-veillet-library-bordeaux-cauderan", what: "Một sàn đọc dưới mái răng cưa hình chóp bằng gỗ; vùng biên là bê tông chịu lực, giữa là cột và dầm gỗ.", take: "Giữ ý một mái răng cưa che một sàn đọc, nhưng kéo cao lên 9 m, thêm gác lửng hai bên và cho phòng đa năng chui vào hai nhịp cuối của cùng mái." },
    roleOf: () => "p",
    lab: [[27, 40, 12.45, "Khối chính · Chợ sách cao 9 m, gác lửng dưới mái răng cưa", 1], [27, 64, 9.45, "Khối chính · Phòng đa năng trong cùng mái", 1], [27, 79, 4.95, "Khối phụ · Cà phê, trưng bày mở ra bãi Nam", 2], [10.5, 27, 4.95, "Khối phụ · Văn phòng, kỹ thuật phía Tây", 2], [10.5, 58, 4.95, "Khối phụ · Kho, nghiệp vụ sát lối Tây", 2], [10.5, 85.5, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2]],
    ngoaigio: "Cụm ngoài giờ gồm phòng đa năng (hai nhịp mái cuối), cà phê và trưng bày ở khối Nam, cụm vệ sinh góc Tây Nam; khách vào từ bãi xe đầu Nam và từ bậc sông qua sân Nam. Đường khóa là vách ngăn cách âm giữa phòng đa năng và sàn chợ tại y = 56, cùng cửa giữa kho và khối vệ sinh. Khối Nam có ba cửa ra sân và bãi xe nên khóa hai cửa đó không chạm tuyến thoát nạn.",
    build() {
      const v = [], st = [];
      // nhà chợ: 9 m, gác lửng tính là tầng 2; phòng đa năng cùng chiều cao ở đầu Nam
      v.push(B(15, 24, 24, 32, 0.45, 9.45, "sheet", "B", { fa: FD, fl: 2, bands: [4.95], ...M }), B(15, 56, 24, 16, 0.45, 9.45, "sheet", "D", { fa: FS, fl: 1, ...M }));
      for (let k = 0; k < 6; k++) v.push(SH(15, 24 + 8 * k, 24, 8, 9.45, 9.75, 12.45, "-y", "sheet", "X", M));
      // ba dãy thấp
      v.push(fl(15, 72, 24, 14, 0, "stone", "A", FS), fl(6, 12, 9, 29, 0, "stone", "E", FS), fl(6, 41, 9, 34, 0, "stone", "C", FS), fl(6, 82, 9, 7, 0, "stone", "E", FS));
      st.push(...perim(15, 24, 24, 48, 9.45, 8), ...perim(15, 72, 24, 14, Z(1)), ...perim(6, 12, 9, 29, Z(1)), ...perim(6, 41, 9, 34, Z(1)), ...perim(6, 82, 9, 7, Z(1)));
      for (let k = 0; k <= 6; k++) st.push(...zig(15, 24 + 8 * k, 39, 24 + 8 * k, 9.45, 12.45, 8));
      return { v, st };
    }
  });

  /* ---------- 19.7 · Hai cung quanh cây đa ---------- */
  I8.push({
    id: "tu7", fam: "tu", code: "19.7", from: "tự sáng tạo", name: "Hai cung đọc ôm cây đa, trống bát giác đầu Bắc", rule: "Xoay quanh một tâm, hai cung không bằng nhau",
    tag: "Một cây đa giữ lại giữa sân tròn; hai cung hai tầng dài ngắn khác nhau ôm quanh, chừa hai khe vào; phòng đa năng là một khối bát giác tách riêng ở đầu Bắc",
    story: "Khu đất bờ sông có cây lớn; thay vì chặt, công trình quay quanh nó. Sân tròn đường kính 15 m giữ cây đa làm tâm. Cung dài hai tầng ôm phía sông và phía Nam, cung ngắn hai tầng ôm phía Bắc, hai cung không bằng nhau nên nhìn từ trên là một vòng bị bẻ lệch. Hai khe hở giữa hai cung là lối vào: khe Đông Bắc cho người đọc từ bậc sông, khe Tây cho sách từ lối Tây. Đầu Bắc là trống bát giác chứa phòng đa năng, đứng riêng trên quảng trường. Kho, nghiệp vụ và văn phòng nằm thành dải một tầng ở đầu Nam, sát bãi xe. Tôi xem thư viện Luanda của Typsa, nơi mái bê tông uốn quanh các cây hiện có và sân tròn ôm một cây cọ, rồi làm gọn lại thành hai cung và một trống.",
    why: [W("Quy luật hình khối", "Xoay quanh một tâm: mọi tường cong đều cùng tâm là gốc cây. Hai cung dài ngắn khác nhau và hai khe hở lệch nhau nên không đối xứng. Trống bát giác tách riêng làm đối trọng cho cung dài."),
      W("Khối chính – khối phụ", "Khối chính là hai cung hai tầng và trống bát giác, chiếm 75% sàn, cao +9,45. Khối phụ là dải kho, nghiệp vụ và dải văn phòng một tầng ở đầu Nam, tối màu, thấp +4,95."),
      W("Nắng và chói", "Cung dài quay lưng ra sông: mặt cong phía sông đặc có lam, mặt cong phía sân mở về Tây Bắc và Tây Nam nhưng được chính tán cây che. Cung ngắn mở về sân phía Nam, có mái đua. Mặt Trần Phú là đầu hồi hẹp của hai cung."),
      W("Gió và mưa", "Khe Tây giữa hai cung và sân tròn tạo đường gió từ Nam lên Bắc, tán cây làm mát không khí trước khi vào phòng đọc. Trống bát giác ở đầu Bắc chắn gió mùa Đông Bắc cho sân. Lối vào Đông Bắc có hiên của cung ngắn che mưa tạt."),
      W("Công năng", "Cung ngắn tầng 1: đón tiếp, cà phê, trưng bày nhìn ra quảng trường và trống sự kiện; tầng 2: tra cứu số, học nhóm. Cung dài tầng 1: đọc mở, thiếu nhi mở ra sân cây; tầng 2: đọc yên tĩnh phía sông. Dải Nam: kho, nghiệp vụ, văn phòng, giao nhận từ góc Tây Nam.")],
    kc: { he: "Hai cung: khung bê tông cột lưới 6 m theo tia, sàn bê tông, tường cong ngoài chịu lực một phần. Trống bát giác: tám cột ở đỉnh, dàn mái thép nhịp 20 m, không cột giữa, cao 7 m. Dải Nam: khung 6 m.", nhip: "20 m (trống bát giác)", cx: "Không" },
    qa: [["Tường cong có khó thi công không?", "Tường ngoài cong theo một tâm duy nhất, bán kính 17,75 m, nên chỉ cần một bộ ván khuôn cong lặp lại; cột vẫn đứng trên lưới tia 6 m thẳng từ móng lên mái."],
      ["Cây đa trong sân có hại móng không?", "Sân tròn bán kính 7,5 m để trống hoàn toàn, rễ nằm trong vành đất không có móng; các cung lùi xa gốc 7,5 m và móng băng cong nằm ngoài tán rễ chính."]],
    cut: "Hai cung: cắt từ tấm foam 2,25 cm theo mẫu vành khuyên bán kính 4,25–8,9 cm, mỗi cung 2 lớp. Trống: foam bát giác cạnh 4,3 cm cao 3,5 cm. Dải Nam: foam xám 2 thanh 8–9,5 × 9 cm cao 2,25 cm. Cây: que gỗ và bông cỏ.",
    ref: { name: "Thư viện Luanda", by: "Typsa Arquitectura", year: "không ghi năm trong nguồn", place: "Luanda, Angola", award: "", url: "https://archup.net/luanda-library-architecture/", what: "Thư viện hai tầng công cộng được vẽ quanh các cây lớn có sẵn; mái bê tông cong phình và thắt theo vị trí cây, mở ra các sân tròn ôm lấy cây.", take: "Mượn ý giữ cây làm tâm và sân tròn ôm cây; đơn giản hóa thành hai cung hai tầng cùng tâm và một trống bát giác tách riêng cho sự kiện." },
    roleOf: () => "p",
    lab: [[36, 60, 9.45, "Khối chính · Cung dài hai tầng ôm sông và Nam", 1], [16, 40, 9.45, "Khối chính · Cung ngắn phía Bắc", 1], [29.5, 22.5, 7.45, "Khối chính · Trống bát giác sự kiện", 1], [14, 80, 4.95, "Khối phụ · Kho, nghiệp vụ, giao nhận Tây Nam", 2], [32, 80, 4.95, "Khối phụ · Văn phòng, vệ sinh", 2], [23.75, 54, 10.5, "Cây đa giữa sân tròn"]],
    ngoaigio: "Trống bát giác đứng riêng trên quảng trường Bắc, có cửa thẳng ra quảng trường; cà phê và trưng bày ở tầng 1 cung ngắn nối với trống bằng hiên, cụm vệ sinh ngoài giờ đặt ở đầu Đông cung ngắn cạnh khe vào. Đường khóa là cửa ở chân thang trong cung ngắn (lên tầng 2) và cửa ở khe Đông Bắc sang cung dài. Trống và cung ngắn đều có cửa ra quảng trường và sân, nên hai cửa khóa không nằm trên tuyến thoát nạn.",
    build() {
      const v = [], st = [], cx = 23.75, cy = 52, r1 = 7.5, r2 = 17.75;
      const longA = arc(cx, cy, r1, r2, -28, 192, 16), shortA = arc(cx, cy, r1, r2, 198, 342, 12);
      v.push(PO(longA, Z(0), Z(1), "sheet", "B", { fa: FD, fl: 1, ...M }), PO(longA, Z(1), Z(2), "sheet", "B", { fa: FD, fl: 1, ...M }));
      v.push(PO(shortA, Z(0), Z(1), "sheet", "A", { fa: FD, fl: 1, ...M }), PO(shortA, Z(1), Z(2), "sheet", "B", { fa: FD, fl: 1, ...M }));
      const drum = octagon(29.5, 22.5, 11.3);
      v.push(PO(drum, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1, ...M }));
      // dải một tầng đầu Nam
      v.push(fl(6, 71, 17, 18, 0, "stone", "C", FS), fl(23, 71, 18.5, 18, 0, "stone", "E", FS));
      // cây đa: thân và tán
      v.push(B(cx - 0.6, cy - 0.6, 1.2, 1.2, 0, 6.5, "ink", "X"), FR(cx - 3, cy - 3, 6, 6, 6.5, 10.5, 1.9, "grass", { top: "grassTop" }));
      st.push(...colsIn([longA, shortA], range(8, 41, 6), range(12, 70, 6), 0, Z(2)));
      for (const [x, y] of drum) st.push(col(x, y, 0, 7.45));
      st.push(...perim(6, 71, 17, 18, Z(1)), ...perim(23, 71, 18.5, 18, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 19.8 · Tầng hai bay qua hẻm ---------- */
  I8.push({
    id: "tu8", fam: "tu", code: "19.8", from: "tự sáng tạo", name: "Bốn nhà phố nhỏ, một sàn đọc dài bay qua ba hẻm", rule: "Dưới rời, trên liền; cột mảnh trong hẻm",
    tag: "Tầng 1 là bốn nhà nhỏ tách nhau bằng ba hẻm như một dãy phố; tầng 2 là một sàn đọc dài liền một khối, bay qua ba hẻm trên những hàng cột mảnh",
    story: "Phố cổ bên sông Hàn là những nhà hẹp với hẻm xen kẽ. Ý tưởng đặt tầng 1 thành bốn nhà nhỏ: nhà hội 7 m ở đầu Bắc, nhà cà phê và trưng bày, nhà văn phòng, nhà kho ở đầu Nam, giữa là ba hẻm có mái che rộng 7–8 m. Tầng 2 ngược lại: một sàn đọc dài 56,5 m liền một khối, bay qua ba hẻm. Chỗ bay qua hẻm có hàng cột mảnh đứng giữa hẻm nên không đua. Sàn tầng 2 lệch 1 m về phía sông so với dãy nhà dưới để đọc rõ hai lớp trên dưới. Tôi xem Bridge Gallery của Atelier Lai, một tiệm sách hai tầng bắc qua hẻm làng theo kiểu cầu có mái Huy Châu, rồi nhân lên thành ba hẻm.",
    why: [W("Quy luật hình khối", "Tương phản dưới rời, trên liền: bốn khối nhỏ rời nhau ở tầng 1, một thanh dài duy nhất ở tầng 2. Ba hẻm ba bề rộng khác nhau (8, 7, 7 m) và bốn nhà bốn chiều dài khác nhau nên dãy dưới không đều nhịp, đúng gu hơi lộn xộn trên lưới."),
      W("Khối chính – khối phụ", "Khối chính là sàn đọc tầng 2 và nhà hội 7 m, chiếm 65% sàn, cao +9,45. Khối phụ là ba nhà một tầng và khối vệ sinh đầu hẻm, +4,95, tối màu."),
      W("Nắng và chói", "Mặt Trần Phú của cả hai tầng đặc. Mặt sông của sàn đọc là dải dài có lam; đầu hồi Bắc kính lấy sáng tán xạ; đầu Nam mái đua. Ba hẻm có mái tầng 2 che nên bóng mát cả ngày."),
      W("Gió và mưa", "Ba hẻm mở hai đầu Đông và Tây, gió Đông Nam mùa hè luồn qua hẻm, lên khe thông tầng vào sàn đọc. Mưa mùa đông từ sông: khách vào từ bậc sông đi dưới hẻm có mái, không ướt."),
      W("Công năng", "Nhà Bắc: phòng đa năng và chuyên đề. Nhà thứ hai: đón tiếp, cà phê, trưng bày, gửi đồ. Nhà thứ ba: văn phòng, nhân viên, vệ sinh. Nhà Nam: kho, nghiệp vụ, tiếp nhận sách từ lối Tây. Tầng 2: đọc mở, thiếu nhi trên nhà thứ hai, học nhóm và tra cứu số trên nhà thứ ba, đọc yên tĩnh trên nhà kho ở đầu Nam, xa nhà hội.")],
    kc: { he: "Bốn nhà tầng 1 khung bê tông lưới 6,75 m. Sàn tầng 2 là dầm bê tông liên tục gối lên tường biên các nhà và lên hàng cột thép mảnh giữa mỗi hẻm, nên nhịp lớn nhất chỉ 4 m. Nhà hội: dàn mái thép nhịp 27 m, không cột giữa.", nhip: "27 m (nhà hội)", cx: "1 m về phía sông" },
    qa: [["Sàn tầng 2 bay qua hẻm 8 m mà không võng?", "Giữa mỗi hẻm có một hàng cột thép mảnh, nên dầm sàn chỉ gối nhịp 4 m và 3,5 m; không có phần nào cách cột quá 4 m. Cột thẳng từ móng lên sàn tầng 2."],
      ["Hẻm có mái tầng 2 có bị tối không?", "Mỗi hẻm chỉ sâu 27 m, mở cả hai đầu và có khe thông tầng 2 m ở giữa lên sàn đọc, nên sáng như một hành lang có mái; ban đêm là lối vào sự kiện có chiếu sáng."]],
    cut: "Nhà hội: foam đen 13,5 × 6,5 × 3,5 cm. Ba nhà một tầng: foam xám 13,5 × 6 (×2) và 13,5 × 5,75 cm cao 2,25 cm. Sàn tầng 2: foam trắng 13,5 × 28 × 2,25 cm kê lên các nhà, dời 0,5 cm về phía sông. Cột hẻm: que tre 2 mm.",
    ref: { name: "Bridge Gallery (tiệm sách bắc qua hẻm làng Taoyuan)", by: "Atelier Lai", year: "không ghi năm trong nguồn", place: "làng Taoyuan, An Huy, Trung Quốc", award: "", url: "https://www.arch2o.com/?p=528919", what: "Tiệm sách hai tầng trong làng hẻm hẹp; tầng trên bắc ngang qua hẻm, hình mẫu lấy từ cầu có mái Huy Châu (lang kiều).", take: "Mượn ý tầng trên bắc qua hẻm; nhân thành ba hẻm giữa bốn nhà nhỏ và một sàn đọc dài liền, thêm hàng cột mảnh trong hẻm để không có phần đua." },
    roleOf: () => "p",
    lab: [[24.5, 56, 9.45, "Khối chính · Sàn đọc dài bay qua ba hẻm", 1], [23.5, 20.5, 7.45, "Khối chính · Nhà hội 7 m, đầu Bắc", 1], [23.5, 40, 4.95, "Khối phụ · Nhà cà phê, trưng bày, đón tiếp", 2], [23.5, 59, 4.95, "Khối phụ · Nhà văn phòng", 2], [23.5, 78, 4.95, "Khối phụ · Nhà kho, nghiệp vụ", 2], [13, 30.5, 4.95, "Khối phụ · Vệ sinh ngoài giờ ở đầu hẻm", 2], [37.5, 49.5, 3, "Hẻm có mái, cột mảnh"]],
    ngoaigio: "Khách sự kiện vào hẻm thứ nhất từ bậc sông hoặc quảng trường Bắc: một bên là nhà hội, bên kia là cà phê và trưng bày, đầu Tây hẻm là khối vệ sinh. Đường khóa là hai cửa thang lên tầng 2 (đặt ở hẻm thứ hai và thứ ba) và cửa giữa nhà cà phê với hẻm thứ hai. Hẻm thứ nhất thông hai đầu ra sông và ra lối Tây nên khách sự kiện luôn có hai hướng thoát không qua cửa khóa.",
    build() {
      const v = [], st = [];
      // bốn nhà tầng 1 (x 10–37) và ba hẻm
      v.push(B(10, 14, 27, 13, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1, ...M }));
      v.push(fl(10, 34, 27, 12, 0, "stone", "A", FS), fl(10, 53, 27, 12, 0, "stone", "E", FS), fl(10, 72, 27, 11.5, 0, "stone", "C", FS), fl(10, 27, 6, 7, 0, "stone", "E", FS));
      // sàn đọc tầng 2, lệch 1 m về phía sông, bay qua ba hẻm
      v.push(fl(11, 27, 27, 56.5, 1, "sheet", "B", FD, M));
      // hàng cột mảnh giữa mỗi hẻm
      pilotis(v, st, [17.5, 24, 30.5, 37], [30.5], Z(1));
      pilotis(v, st, [11.5, 18, 24.5, 31, 37.5], [49.5, 68.5], Z(1));
      st.push(...perim(10, 14, 27, 13, 7.45, 9), ...perim(10, 34, 27, 12, Z(2), 6.75), ...perim(10, 53, 27, 12, Z(2), 6.75), ...perim(10, 72, 27, 11.5, Z(2), 6.75), ...perim(10, 27, 6, 7, Z(1)));
      st.push(...zig(10, 14, 37, 14, 5.45, 7.45, 6), ...zig(10, 27, 37, 27, 5.45, 7.45, 6));
      return { v, st };
    }
  });

  /* ---------- 19.9 · Thềm đọc hướng sông ---------- */
  I8.push({
    id: "tu9", fam: "tu", code: "19.9", from: "tự sáng tạo", name: "Thềm đọc ba bậc xuống sông, lưng thẳng phía phố", rule: "Bậc thang về một phía, lưng thẳng phía sau",
    tag: "Nửa Đông là ba bậc đọc hạ dần về bậc thang Bạch Đằng: tầng 2 lùi, mái tầng 1 làm thềm, bậc rộng xuống sân; nửa Tây là một thanh thẳng hai tầng chứa kho, văn phòng, đón tiếp",
    story: "Bậc thang cao 5,5 m xuống đường Bạch Đằng là đặc điểm lớn nhất của khu đất. Công trình kéo dài bậc thang đó lên thành nhà: tầng 2 lùi vào phía phố, mái tầng 1 là thềm đọc ngoài trời, mép sông là ba bậc rộng 1,2 m hạ dần xuống sân, rồi nối tiếp bậc thang có sẵn xuống sông. Nhìn từ bờ Đông, công trình là một thềm bậc lớn quay ra sông. Phía sau, nửa Tây là một thanh thẳng hai tầng, lưng đặc ra Trần Phú, chứa đón tiếp, văn phòng, kho. Phòng đa năng 7 m ở góc Đông Bắc, mở ra quảng trường. Tôi xem thư viện Vũ Hán của MVRDV, nơi các thềm sách bậc thang gợi hình bờ sông, nhưng chỉ giữ hai tầng và cho bậc đi ra ngoài trời.",
    why: [W("Quy luật hình khối", "Bậc thang về một phía: tầng 2, thềm mái, ba bậc rộng rồi bậc thang Bạch Đằng tạo một chuỗi hạ dần về sông. Lưng thẳng phía Tây làm nền tĩnh. Phòng đa năng vuông ở góc Bắc phá nhịp bậc đúng một chỗ."),
      W("Khối chính – khối phụ", "Khối chính là thềm đọc hai bậc phía sông, tầng 2 thanh Tây và phòng đa năng, chiếm 70% sàn, cao +9,45. Khối phụ là ba đoạn một tầng của thanh Tây (đón tiếp, văn phòng, kho), tối màu, +4,95."),
      W("Nắng và chói", "Tầng 2 lùi 7 m khỏi mép sông nên thềm mái che nắng sáng cho sàn đọc tầng 1; mặt sông tầng 2 có lam. Mặt Trần Phú là lưng đặc của thanh Tây. Phòng đọc yên tĩnh nằm ở tầng 2 thanh Tây, lấy sáng từ sân trong giữa hai nửa."),
      W("Gió và mưa", "Ba bậc và thềm mái mở hết về sông và Nam, gió Đông Nam leo bậc vào phòng đọc qua cửa dài phía Đông. Mưa mùa đông đập vào bậc ngoài trời chứ không vào phòng: mép tầng 2 đua tạo hiên 2 m che cửa tầng 1."),
      W("Công năng", "Thanh Tây tầng 1: đón tiếp, cà phê, trưng bày ở đầu Bắc cạnh phòng đa năng; văn phòng, vệ sinh ở giữa; kho, nghiệp vụ ở đầu Nam gần giao nhận. Thềm Đông tầng 1: đọc mở, thiếu nhi mở ra bậc; tầng 2 Đông: đọc mở, học nhóm; tầng 2 Tây: đọc yên tĩnh, tra cứu số.")],
    kc: { he: "Khung bê tông lưới 6 × 6 m, cột thẳng từ móng lên mái. Tầng 2 phía Đông lùi vào đúng một bước cột nên không đua. Ba bậc ngoài trời là bê tông đổ trên nền đắp. Phòng đa năng: dàn mái thép nhịp 16 m, không cột giữa, cao 7 m.", nhip: "16 m (phòng đa năng)", cx: "Không" },
    qa: [["Thềm mái đọc ngoài trời có chịu được tải người đông?", "Mái tầng 1 là sàn bê tông thường có cột lưới 6 m bên dưới, tính như sàn sử dụng; lan can là tường thấp 1,1 m bằng bê tông."],
      ["Ba bậc rộng có phải là đường dốc cho xe lăn?", "Không; bậc là chỗ ngồi đọc ngoài trời. Người xe lăn lên thềm mái và tầng 2 bằng thang máy trong thanh Tây, đi ra thềm qua cầu nối tầng 2."]],
    cut: "Thanh Tây: foam xám 6,5 × 37 × 2,25 cm, trên đặt foam trắng 6,5 × 15 × 2,25 cm ở đầu Bắc. Thềm Đông: foam trắng 9,5 × 18 × 2,25 cm, trên đặt 6 × 18 × 2,25 cm lùi về Tây. Ba bậc: ba thanh bìa 0,6 × 18 cm cao 1,75 / 1,25 / 0,75 cm. Phòng đa năng: foam đen 11 × 8 × 3,5 cm.",
    ref: { name: "Thư viện Vũ Hán (phương án)", by: "MVRDV", year: "2023 (công bố phương án)", place: "Vũ Hán, Trung Quốc", award: "", url: "https://www.dezeen.com/2023/01/10/mvrdv-wuhan-library-china-news/", what: "Các thềm sách và thềm hoạt động xếp bậc hai bên không gian trong, phía dưới là các lối công cộng; hình bậc gợi bờ sông của Vũ Hán.", take: "Mượn ý thềm bậc gợi bờ sông, nhưng hạ xuống hai tầng, đưa bậc ra ngoài trời và nối thẳng vào bậc thang Bạch Đằng có sẵn." },
    roleOf: () => "p",
    lab: [[25, 46, 9.45, "Khối chính · Thềm đọc hai bậc quay ra sông", 1], [12.5, 28, 9.45, "Khối chính · Tầng 2 thanh Tây, đọc yên tĩnh", 1], [30, 20, 7.45, "Khối chính · Phòng đa năng góc Đông Bắc", 1], [12.5, 26, 4.95, "Khối phụ · Đón tiếp, cà phê, trưng bày", 2], [12.5, 51, 4.95, "Khối phụ · Văn phòng, vệ sinh", 2], [12.5, 75, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [39.8, 46, 3.95, "Ba bậc đọc ngoài trời"]],
    ngoaigio: "Phòng đa năng ở góc Đông Bắc mở ra quảng trường; cà phê, trưng bày và đón tiếp ở đầu Bắc thanh Tây nối với nó qua sảnh, cụm vệ sinh ngoài giờ đặt ngay đầu Bắc đoạn văn phòng, mở vào sảnh này. Đường khóa là cửa sảnh sang thềm đọc Đông (tại x = 19) và cửa thang lên tầng 2. Phòng đa năng có hai cửa ra quảng trường và sân sông, sảnh có cửa ra lối Tây, nên tuyến thoát không đi qua cửa khóa.",
    build() {
      const v = [], st = [];
      // thanh Tây hai tầng: tầng 1 ba đoạn A, E, C; tầng 2 đọc yên tĩnh ở đầu Bắc
      v.push(fl(6, 13.5, 13, 25, 0, "stone", "A", FS), fl(6, 38.5, 13, 25, 0, "stone", "E", FS), fl(6, 63.5, 13, 23.5, 0, "stone", "C", FS), fl(6, 13.5, 13, 30.5, 1, "sheet", "B", FD, M));
      // phòng đa năng góc Đông Bắc
      v.push(B(19, 12, 22, 16, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1, ...M }));
      // thềm Đông: tầng 1 rộng, tầng 2 lùi về Tây; mái tầng 1 là thềm đọc
      v.push(fl(19, 28, 19, 36, 0, "sheet", "B", FD, { ...M, top: "deck" }), fl(19, 28, 12, 36, 1, "sheet", "B", FD, M));
      // ba bậc rộng xuống sân, zone X
      v.push(B(38, 28, 1.2, 36, 0.45, 3.95, "sheet", "X", M), B(39.2, 28, 1.2, 36, 0.45, 2.95, "sheet", "X", M), B(40.4, 28, 1.1, 36, 0.45, 1.95, "sheet", "X", M));
      st.push(...perim(6, 13.5, 13, 73.5, Z(1), 6), ...perim(6, 13.5, 13, 30.5, Z(2), 6), ...perim(19, 12, 22, 16, 7.45, 8), ...perim(19, 28, 19, 36, Z(1), 6), ...perim(19, 28, 12, 36, Z(2), 6));
      st.push(...zig(19, 12, 41, 12, 5.45, 7.45, 6), ...zig(19, 28, 41, 28, 5.45, 7.45, 6));
      return { v, st };
    }
  });

  /* ---------- 19.10 · Bốn hộp quanh giếng gió ---------- */
  I8.push({
    id: "tu10", fam: "tu", code: "19.10", from: "tự sáng tạo", name: "Bốn hộp so le hai bên giếng gió, hai cầu nối", rule: "So le qua một khe hẹp, nối bằng cầu",
    tag: "Một khe gió rộng 5 m chạy suốt Bắc – Nam, mở ở đầu Nam; bốn hộp hai tầng kích thước khác nhau xếp so le hai bên khe, chỉ nối nhau bằng hai cầu tầng 2; hộp lớn nhất chứa phòng đa năng cao hai tầng",
    story: "Thay vì một sân rộng, công trình chỉ chừa một khe gió hẹp 5 m chạy dọc khu đất, mở toang ở đầu Nam để hút gió Đông Nam mùa hè, và thắt lại ở đầu Bắc. Bốn hộp hai tầng đứng so le hai bên khe: hai hộp phía phố, hai hộp phía sông, không hộp nào ngang hàng với hộp đối diện, nên nhìn dọc khe thấy từng hộp nhô ra lùi vào. Hai cầu tầng 2 bắc qua khe tại hai chỗ. Hộp lớn nhất ở phía sông, gần quảng trường, là phòng đa năng cao hai tầng. Hai khối nhỏ một tầng ở hai đầu: quầy đón ở miệng khe phía Bắc và trạm bảo vệ, kỹ thuật ở góc Tây Nam. Tôi xem thư viện Tainan của Mecanoo, công trình nhiệt đới có bốn sân trũng để lấy gió và sáng, rồi thu lại thành một khe duy nhất.",
    why: [W("Quy luật hình khối", "So le qua một khe: bốn hộp bốn cỡ, hai bên khe lệch nhau nửa nhịp, hai cầu cũng lệch. Khe hẹp làm bốn hộp đọc như một khối bị xẻ đôi, đúng tinh thần hơi lộn xộn nhưng vẫn trên lưới 6 m."),
      W("Khối chính – khối phụ", "Khối chính là bốn hộp hai tầng cùng hai cầu, chiếm 97% sàn, cao +9,45. Khối phụ là hai khối một tầng nhỏ ở hai đầu khe: quầy đón phía Bắc và trạm bảo vệ, kỹ thuật góc Tây Nam, tối màu, +4,95."),
      W("Nắng và chói", "Hai hộp phía phố có lưng đặc ra Trần Phú. Hai hộp phía sông có mặt sông lam, mặt dài quay vào khe gió có bóng của hộp đối diện. Phòng đọc chính ở tầng 2 các hộp phía phố, lấy sáng từ khe và từ đầu Bắc."),
      W("Gió và mưa", "Khe mở rộng ở đầu Nam, thắt ở đầu Bắc: gió Đông Nam vào miệng Nam, tăng tốc qua khe hẹp và làm mát cửa các phòng đọc hai bên. Mưa mùa đông từ sông đập vào hộp phía sông, khe được hai cầu và các hộp che một phần."),
      W("Công năng", "Hộp Tây Bắc: tầng 1 đón tiếp, cà phê, trưng bày; tầng 2 đọc mở. Hộp Đông Bắc: phòng đa năng cao hai tầng, chuyên đề. Hộp Tây Nam: tầng 1 kho, nghiệp vụ, nhân viên; tầng 2 đọc yên tĩnh. Hộp Đông Nam: tầng 1 văn phòng, vệ sinh và thiếu nhi mở ra bãi Nam; tầng 2 học nhóm, tra cứu số.")],
    kc: { he: "Bốn hộp khung bê tông lưới 6 m, cột thẳng từ móng lên mái. Hai cầu tầng 2 là dầm thép nhịp 5 m gối lên hai hộp. Phòng đa năng: hai tầng cao trong một hộp, dàn mái thép nhịp 16,5 m, không cột giữa.", nhip: "16,5 m (phòng đa năng)", cx: "Không" },
    qa: [["Hai cầu bắc qua khe có lắc không?", "Cầu chỉ dài 5 m, rộng 4 m, là dầm thép gối lên sàn tầng 2 của hai hộp hai bên; mỗi cầu có vách bê tông mỏng một bên làm giằng nên không lắc."],
      ["Khe gió hẹp 5 m có bị tối và ẩm không?", "Khe mở hai đầu và không có mái, chỉ hai cầu che hai chỗ, nên sáng và thoáng; nền khe lát đá dốc 1% về đầu Nam để thoát nước mưa ra bãi."]],
    cut: "Bốn hộp foam trắng 2 lớp cao 2,25 cm: 6,5 × 13,75; 8,25 × 11 (hộp hội, một khối 4,5 cm); 6 × 16; 8 × 13 cm. Hai cầu: bìa 2,5 × 2 cm. Hai khối nhỏ: foam xám 3 × 3 và 3 × 4 cm cao 2,25 cm.",
    ref: { name: "Thư viện công cộng Tainan", by: "Mecanoo cùng MAYU Architects+", year: "khởi công 2017 (theo nguồn)", place: "Đài Nam, Đài Loan", award: "", url: "https://www.archdaily.com/873218/mecanoo-and-mayu-architects-plus-break-ground-on-tainan-public-library", what: "Thư viện cho khí hậu nhiệt đới của Đài Nam; dưới các phần đua là bốn sân trũng cho hoạt động ngoài trời, lấy gió và ánh sáng vào các tầng.", take: "Mượn ý sân lấy gió cho khí hậu nóng ẩm, nhưng thu bốn sân thành một khe hẹp chạy dọc, và xếp bốn hộp so le hai bên để khe vừa là lối đi vừa là ống gió." },
    roleOf: () => "p",
    lab: [[12.5, 26, 9.45, "Khối chính · Hộp Tây Bắc: đón tiếp dưới, đọc trên", 1], [33.25, 31, 9.45, "Khối chính · Hộp Đông Bắc: phòng đa năng cao hai tầng", 1], [12.5, 62, 9.45, "Khối chính · Hộp Tây Nam: kho dưới, đọc yên tĩnh trên", 1], [32, 67, 9.45, "Khối chính · Hộp Đông Nam: văn phòng, thiếu nhi, học nhóm", 1], [22, 17, 4.95, "Khối phụ · Quầy đón ở miệng khe Bắc", 2], [9, 84.5, 4.95, "Khối phụ · Bảo vệ, kỹ thuật góc Tây Nam", 2], [21.5, 32, 9.45, "Cầu nối 1"], [21.5, 62, 9.45, "Cầu nối 2"]],
    ngoaigio: "Cụm ngoài giờ là hộp Đông Bắc (phòng đa năng, chuyên đề) và tầng 1 hộp Tây Bắc (cà phê, trưng bày, vệ sinh) ở hai bên đầu Bắc của khe; khách vào từ quảng trường qua miệng khe phía Bắc. Đường khóa là cửa thang lên tầng 2 hộp Tây Bắc và một cổng ngang khe tại y = 44 chặn về phía hai hộp Nam. Cả hai hộp Bắc đều có cửa ra quảng trường và ra bậc sông, nên cổng khóa không nằm trên tuyến thoát nạn.",
    build() {
      const v = [], st = [];
      // hộp Tây Bắc: A dưới, B trên
      v.push(fl(6, 12.5, 13, 27.5, 0, "sheet", "A", FD, M), fl(6, 12.5, 13, 27.5, 1, "sheet", "B", FD, M));
      // hộp Đông Bắc: phòng đa năng cao hai tầng
      v.push(B(25, 20, 16.5, 22, 0.45, 9.45, "sheet", "D", { fa: FS, fl: 1, ...M }));
      // hộp Tây Nam: tầng 1 kho (Bắc) và nhân viên (Nam), tầng 2 đọc yên tĩnh
      v.push(fl(6, 44, 13, 23, 0, "stone", "C", FS, M), fl(6, 67, 13, 13, 0, "stone", "E", FS, M), fl(6, 44, 13, 36, 1, "sheet", "B", FD, M));
      // hộp Đông Nam: tầng 1 văn phòng (Bắc) và thiếu nhi (Nam), tầng 2 học nhóm
      v.push(fl(24, 54, 16, 10, 0, "stone", "E", FS, M), fl(24, 64, 16, 16, 0, "sheet", "B", FD, M), fl(24, 54, 16, 26, 1, "sheet", "B", FD, M));
      // hai cầu tầng 2 qua khe
      v.push(fl(19, 30, 6, 4, 1, "glass", "L", FG, M), fl(19, 60, 5, 4, 1, "glass", "L", FG, M));
      // hai khối phụ một tầng
      v.push(fl(19, 14, 6, 6, 0, "stone", "A", FS), fl(6, 81, 6, 8, 0, "stone", "E", FS));
      st.push(...perim(6, 12.5, 13, 27.5, Z(2), 6.5), ...perim(25, 20, 16.5, 22, Z(2), 8), ...perim(6, 44, 13, 36, Z(2), 6), ...perim(24, 54, 16, 26, Z(2), 6.5), ...perim(19, 14, 6, 6, Z(1)), ...perim(6, 81, 6, 8, Z(1)));
      st.push(...zig(25, 20, 25, 42, 7.45, 9.45, 4), ...zig(41.5, 20, 41.5, 42, 7.45, 9.45, 4));
      return { v, st };
    }
  });
})(window.G3);
