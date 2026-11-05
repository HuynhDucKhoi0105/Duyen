
/* ================= Đợt 5 · nhóm 15 · Khoét, cài, xoay: 8 ý tưởng học từ công trình có thật ================= */
/* Hướng thật: đầu Bắc khu đất nhìn 340°, mặt sông 70°, đầu Nam 160°, mặt Trần Phú 250°. */
(function (G) {
  const { B, PO, col, wall, grid, range, zig } = G.K;
  const { F1, cutX, colsIn } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const fR = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khu đọc
  const fP = { N: "lam", E: "lam", S: "dua", W: "dac" }; // sảnh, cà phê
  const fK = { N: "dac", E: "lam", S: "dac", W: "dac" }; // kho, kỹ thuật, phòng sự kiện
  const fD = { N: "dac", E: "dac", S: "dac", W: "dac" };
  // khối phụ: nhà sự kiện cao 7 m (dàn mái, không cột giữa) và nhà thấp một tầng mái cỏ
  const hall = (x, y, w, d, c, o = {}) => B(x, y, w, d, 0.45, 7.45, c, "D", { fa: fK, fl: 1, top: "grass", ...o });
  const low = (x, y, w, d, c, zone, fa, o = {}) => B(x, y, w, d, 0.45, 4.95, c, zone, { fa, fl: 1, top: "grass", ...o });
  const hallSt = (x, y, w, d) => { const ys = range(y, y + d, d / 2); return [...grid([x, x + w], ys, 0.45, 7.45), ...ys.flatMap(t => zig(x, t, x + w, t, 6.45, 7.45, 4))]; };
  const lowSt = (x, y, w, d, nx = 2, ny = 2) => grid(range(x, x + w, w / nx), range(y, y + d, d / ny), 0.45, 4.95);
  // bát giác có cạnh phẳng quay đúng Bắc, Nam, Đông, Tây; r là bán kính đỉnh
  const oct = (cx, cy, r) => Array.from({ length: 8 }, (_, k) => { const a = Math.PI / 8 + k * Math.PI / 4; return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)]; });
  const ring = (cx, cy, r, z1, z2) => Array.from({ length: 8 }, (_, k) => { const a = Math.PI / 8 + k * Math.PI / 4; return col(+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2), z1, z2); });
  const I = G.ideas7;

  /* ---------- 15.1 · theo Casa da Música ---------- */
  I.push({
    id: "kh1", fam: "khoet", code: "15.1", name: "Khối đá gọt cạnh, hầm đọc xuyên giữa", rule: "Khối trừ: khoét xuyên một khối gọt cạnh",
    tag: "Một khối trắng gọt nhiều mặt, bị khoét xuyên một đường hầm đọc sách từ đầu Bắc sang đầu Nam",
    ref: { name: "Casa da Música", by: "OMA (Rem Koolhaas, Ellen van Loon)", year: "2005", place: "Porto, Bồ Đào Nha", award: "",
      url: "https://arch2o.com/casa-da-musica-oma",
      what: "Một khối bê tông trắng đứng riêng, mặt ngoài gọt thành nhiều mặt nghiêng. Phòng hòa nhạc là một khối hộp dài khoét xuyên qua khối đặc, hai đầu lắp kính nhìn ra phố.",
      take: "Mượn ý một khối đặc gọt cạnh bị khoét xuyên. Phần khoét là phòng đọc lớn cao hai tầng chạy Bắc – Nam, hai đầu thụt vào 3,5 m thành hai hiên kính. Mái ba phần nghiêng ba hướng khác nhau nên khối thô nhìn như một hòn đá được đẽo." },
    story: "Khối chính là một hòn đá trắng có sáu cạnh, không cạnh nào song song với ranh đất. Ở giữa bị khoét một đường hầm rộng 8 m, cao hai tầng: đó là phòng đọc lớn, nhìn thẳng ra quảng trường Bắc và vườn Nam. Hai bên hầm là hai phần đặc chứa kho, văn phòng, sảnh và các phòng đọc nhỏ; phía trên hầm là tầng đọc yên tĩnh. Mái ba phần dốc ba hướng nên hòn đá có nhiều mặt gọt, đứng ở đâu cũng thấy một dáng khác.",
    why: [W("Quy luật hình khối", "Khối trừ: lấy một khối đặc rồi khoét bỏ một đường hầm thẳng. Cái hay nằm ở sự tương phản giữa vỏ đặc gọt cạnh và lỗ hầm vuông vức, sáng đèn ở hai đầu."),
      W("Khối chính – khối phụ", "Khối chính là hòn đá trắng cao tới +17 m, chiếm gần 90% sàn. Ba khối phụ chỉ một tầng, màu tối, mái cỏ: nhà sự kiện, phòng chuyên đề ở đầu Bắc và nhà thiếu nhi ở đầu Nam. Chúng nằm thấp như mấy viên sỏi cạnh hòn đá."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc (70°), nắng sáng mùa hè chiếu gần vuông góc nên có lam đứng. Mặt Trần Phú nhìn Tây Tây Nam (250°) đón nắng chiều mùa đông nên đặc. Hai đầu hầm thụt sâu 3,5 m: đầu Bắc (340°) là kính lấy sáng tán xạ, đầu Nam (160°) có mái đua che nắng trưa."),
      W("Gió và mưa", "Gió mùa hè Đông Nam vào từ đầu Nam khu đất, lùa thẳng vào hầm đọc khi mở cửa kính. Gió mưa Đông Bắc mùa đông đập vào mặt sông, nơi đã có lam dày; lối vào chính nằm trong hiên hầm nên khách không bị mưa tạt."),
      W("Công năng", "Phần Tây là kho, nghiệp vụ, văn phòng sát lối Tây; phần Đông là sảnh, cà phê nhìn sông và phòng đọc. Hầm là phòng đọc lớn hai tầng, trên hầm là đọc yên tĩnh. Nhà sự kiện có lối riêng từ quảng trường Bắc, chạy ngoài giờ.")],
    kc: { he: "Khung bê tông lưới 7–8 m, cột thẳng từ móng lên mái. Hai vách dọc của hầm là tường bê tông chịu lực, đỡ sàn tầng 3 nhịp 8 m bắc qua hầm. Mái nghiêng là sàn bê tông dốc trên dầm có chiều cao thay đổi.", nhip: "14 m (mái nhà sự kiện); 8 m (sàn trên hầm)", cx: "3,5 m (tầng trên hầm đua ra hai đầu hiên)" },
    qa: [["Tầng trên hầm đua ra 3,5 m ở hai đầu có an toàn không?", "Sàn tầng 3 gối lên hai vách bê tông dọc hầm suốt 34 m, phần đua 3,5 m ở hai đầu chỉ là dầm công xôn ngắn, giống một ban công lớn."],
      ["Mái nghiêng có khó thoát nước không?", "Ba mặt mái đều dốc ra ngoài về ba hướng, nước chảy xuống máng ở mép thấp. Không có chỗ mái trũng giữa nhà nên không đọng nước."]],
    cut: "Hòn đá: cắt từ khối foam trắng dày 7–8,5 cm, gọt ba mặt mái nghiêng bằng dao rọc giấy. Hầm: khoét rãnh 4 × 17 cm, cao 4,5 cm, dán mica hai đầu thụt vào 1,75 cm. Khối phụ: foam đen cao 2,25 cm (nhà sự kiện 3,5 cm), phủ bột cỏ.",
    roleOf: () => "p",
    lab: [[28, 50, 16.5, "Khối chính · Hòn đá gọt cạnh khoét hầm", 1], [21, 36, 9.45, "Hầm đọc xuyên Bắc – Nam"], [17, 19, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [30.5, 19, 4.95, "Khối phụ · Phòng chuyên đề", 2], [22, 83, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2]],
    build() {
      const P0 = [[10, 32], [30, 29], [34, 38], [33, 70], [16, 74], [9, 60]];
      const Wp = cutX(P0, 0, 17), Mp = cutX(P0, 17, 25), Ep = cutX(P0, 25, 50);
      const zW = (x, y) => 14.3 + 0.22 * (17 - x) + 0.02 * (y - 30), zM = (x, y) => 15.2 + 0.04 * (y - 30), zE = (x, y) => 14.4 + 0.16 * (x - 25) + 0.03 * (72 - y);
      const fW = { N: "lam", E: "dac", S: "dua", W: "dac" }, fE = { N: "lam", E: "lam", S: "dua", W: "dac" };
      const v = [
        PO(Wp, 0.45, 4.95, "sheet", "C", { fa: fW, fl: 1, ...M }), PO(Wp, 4.95, 9.45, "sheet", "E", { fa: fW, fl: 1, ...M }), PO(Wp, 9.45, zW, "sheet", "B", { fa: fW, fl: 1, ...M }),
        PO(Ep, 0.45, 4.95, "sheet", "A", { fa: fE, fl: 1, ...M }), PO(Ep, 4.95, 9.45, "sheet", "B", { fa: fE, fl: 1, ...M }), PO(Ep, 9.45, zE, "sheet", "B", { fa: fE, fl: 1, ...M }),
        B(17, 34.5, 8, 34, 0.45, 9.45, "gold", "B", { fa: { N: "kinh", E: "dac", S: "dua", W: "dac" }, fl: 1, ...M }),
        PO(Mp, 9.45, zM, "sheet", "B", { fa: fE, fl: 1, ...M }),
        hall(10, 12, 14, 14, "blk"), low(26, 14, 9, 10, "stone", "D", fK), low(14, 78, 16, 10, "stone", "B", fR)];
      const st = [...colsIn([P0], [10, 17, 25, 31], [34, 41, 48, 55, 62, 69], 0.45, 13.95), wall(16.85, 34.5, 0.3, 34, 0.45, 9.45), wall(24.85, 34.5, 0.3, 34, 0.45, 9.45),
        ...hallSt(10, 12, 14, 14), ...lowSt(26, 14, 9, 10, 1, 1), ...lowSt(14, 78, 16, 10)];
      return { v, st };
    }
  });

  /* ---------- 15.2 · theo V&A Dundee ---------- */
  I.push({
    id: "kh2", fam: "khoet", code: "15.2", name: "Hai khối loe ngược chạm đầu", rule: "Hai khối loe ngược, tách ở chân, liền ở đỉnh",
    tag: "Hai khối hẹp ở chân, loe dần lên trên rồi chạm nhau ở tầng 3, chừa cổng đi bộ từ phố ra sông",
    ref: { name: "V&A Dundee", by: "Kengo Kuma & Associates", year: "2018", place: "Dundee, Scotland", award: "",
      url: "https://www.azuremagazine.com/article/kengo-kuma-va-museum-dundee/",
      what: "Hai khối hình chóp ngược đứng tách nhau ở mặt đất rồi nhập lại ở các tầng trên, chừa một lối đi xuyên qua nhà. Mặt ngoài phủ các thanh bê tông nằm ngang như vách đá ven biển.",
      take: "Mượn ý hai khối loe ngược nhập nhau ở đỉnh. Hai khối thư viện hẹp ở tầng 1, loe ra 2–2,5 m mỗi tầng, đến tầng 3 thì liền thành một sàn đọc lớn. Khe giữa ở mặt đất rộng 16 m thành cổng đi bộ từ Trần Phú ra bậc thang bờ sông." },
    story: "Từ đường Trần Phú nhìn vào, thư viện như hai mỏm đá nghiêng vào nhau. Ở chân, hai khối cách nhau 16 m, chừa một con đường đi bộ có mái che chạy thẳng ra bờ sông. Càng lên cao hai khối càng loe rộng, khe giữa hẹp dần còn 9,5 m, đến tầng 3 thì nhập làm một sàn đọc dài 53 m. Đứng dưới cổng nhìn lên thấy hai vách loe chụm vào trần.",
    why: [W("Quy luật hình khối", "Hai khối loe ngược đối nhau qua cổng giữa, nhập lại ở đỉnh. Hình thắt ở chân, nở ở đầu tạo cảm giác căng và chuyển động, khác hẳn một hộp đứng thẳng."),
      W("Khối chính – khối phụ", "Khối chính là cặp khối loe cùng sàn tầng 3, chiếm hơn 80% sàn, cao +13,95 m. Bốn khối phụ đều một tầng, màu tối: nhà sự kiện và phòng chuyên đề ở đầu Bắc, cà phê bên sông, nhà thiếu nhi ở đầu Nam."),
      W("Nắng và chói", "Phần loe ra tự che nắng cho tầng dưới. Mặt sông (70°) có lam đứng; mặt Trần Phú (250°) đặc vì hứng nắng chiều mùa đông. Đầu Bắc (340°) kính lấy sáng tán xạ cho sàn đọc tầng 3; đầu Nam (160°) có mái đua."),
      W("Gió và mưa", "Cổng giữa chạy Tây – Đông, đúng hướng gió mùa đông Đông Bắc thổi từ sông vào nên cần cửa kính trượt đóng lại khi mưa bão. Mùa hè gió Đông Nam vào từ đầu Nam, lùa qua sân giữa nhà thiếu nhi và khối Nam."),
      W("Công năng", "Khối Bắc: sảnh ở tầng 1, đọc ở tầng 2. Khối Nam: kho, nghiệp vụ sát lối Tây ở tầng 1, văn phòng ở tầng 2. Tầng 3 là sàn đọc lớn nối hai khối, nhìn xuống cổng. Cổng là quảng trường có mái, dùng cho chợ sách, triển lãm ngoài trời.")],
    kc: { he: "Khung bê tông lưới 6–7 m trong mỗi khối, cột thẳng từ móng lên mái. Mỗi tầng loe ra 2–2,5 m bằng dầm công xôn. Sàn tầng 3 bắc qua khe 9,5 m bằng hai dàn thép cao một tầng nằm trong hai vách Tây và Đông.", nhip: "14 m (mái nhà sự kiện); 9,5 m (dàn tầng 3 qua cổng)", cx: "2,5 m mỗi tầng, cộng dồn 4 m so với chân" },
    qa: [["Khối loe ngược có bị lật không?", "Không. Mỗi tầng chỉ đua thêm 2–2,5 m so với tầng ngay dưới, và cột vẫn thẳng một mạch. Phần loe ra cân đều hai phía của mỗi khối, nên trọng tâm vẫn nằm trong chân cột."],
      ["Cổng giữa có bị gió lùa không?", "Có, vì cổng nằm đúng hướng gió Đông Bắc mùa đông. Hai đầu cổng có vách kính trượt; mùa hè mở ra cho thoáng, mùa mưa bão đóng lại thành sảnh kín."]],
    cut: "Mỗi khối: 2 lớp foam trắng dày 2,25 cm, lớp trên lớn hơn lớp dưới 1–1,25 cm mỗi cạnh. Sàn tầng 3: foam 11,5 × 26,5 cm dày 2,25 cm, đặt lên hai khối. Khối phụ: foam đen cao 2,25 cm (nhà sự kiện 3,5 cm).",
    roleOf: () => "p",
    lab: [[22, 50, 13.95, "Khối chính · Hai khối loe ngược chạm đầu", 1], [22, 53, 1.5, "Cổng đi bộ ra sông"], [15, 20, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [28.5, 19, 4.95, "Khối phụ · Phòng chuyên đề", 2], [34, 39, 4.95, "Khối phụ · Cà phê bên sông", 2], [20, 85.5, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const v = [
        F1(15, 33, 12, 12, 0, "sheet", "A", fP, M), F1(13, 30, 17, 18.5, 1, "sheet", "B", fR, M),
        F1(17, 61, 12, 13, 0, "sheet", "C", fK, M), F1(14, 58, 18, 19, 1, "sheet", "E", fK, M),
        F1(11, 27, 23, 53, 2, "sheet", "B", fR, M),
        hall(8, 13, 14, 14, "blk"), low(24, 14, 9, 10, "stone", "D", fK), low(30, 34, 8, 10, "stone", "A", fP), low(12, 82, 16, 7, "stone", "B", fR)];
      const st = [...grid([15, 21, 27], [33, 39, 45], 0.45, 13.95), ...grid([17, 23, 29], [61, 67.5, 74], 0.45, 13.95),
        ...zig(11, 46, 11, 60, 9.45, 13.95, 4), ...zig(34, 46, 34, 60, 9.45, 13.95, 4),
        ...hallSt(8, 13, 14, 14), ...lowSt(24, 14, 9, 10, 1, 1), ...lowSt(30, 34, 8, 10, 1, 1), ...lowSt(12, 82, 16, 7)];
      return { v, st };
    }
  });

  /* ---------- 15.3 · theo The Hive, NTU ---------- */
  const TW = [[13.5, 38, ["A", "E", "B", "B"], fP], [30, 37, ["A", "B", "B"], fP], [32.5, 56, ["B", "B", "B", "B"], fR], [30.5, 75, ["B", "B", "B"], fR], [13.5, 64, ["C", "C", "E"], fK]];
  const rr = k => 6 + 0.8 * k;
  I.push({
    id: "kh3", fam: "khoet", code: "15.3", name: "Năm tháp loe quanh sân giữa", rule: "Lặp lại quanh tâm, mỗi tầng loe ra",
    tag: "Năm tháp đọc bát giác, tầng trên rộng hơn tầng dưới, đứng vòng quanh một sân mở về đầu Nam",
    ref: { name: "Learning Hub (The Hive), Đại học Công nghệ Nanyang", by: "Heatherwick Studio cùng CPG Consultants", year: "2015", place: "Singapore", award: "Chứng nhận công trình xanh Green Mark Platinum của Singapore",
      url: "https://heatherwick.com/project/learning-hub-the-hive/",
      what: "Một cụm tháp thon, chân nhỏ đầu to, đứng quanh một giếng trời chung. Mỗi tháp chứa các phòng học tròn, nối nhau bằng hành lang và cầu quanh giếng trời.",
      take: "Mượn cụm tháp loe quanh sân chung. Năm tháp bát giác, mỗi tầng rộng thêm 0,8 m, hai tháp cao 4 tầng, ba tháp 3 tầng cho lệch nhịp. Sân giữa để trống, mở về đầu Nam đón gió hè; hai cặp tháp nối bằng cầu kính." },
    story: "Thay một khối thư viện lớn là năm tháp đọc nhỏ, mỗi tháp như một cuốn sách cuộn tròn dựng đứng. Tháp hẹp ở chân, rộng dần lên trên, nên dưới chân tháp là hiên có bóng mát. Năm tháp đứng vòng quanh một sân giữa trồng cây; đi trong sân thấy các tháp nghiêng nhẹ vào nhau. Hai tháp phía sông nối với tháp bên cạnh bằng cầu kính ở tầng 2 và tầng 3.",
    why: [W("Quy luật hình khối", "Lặp lại một khối tháp loe năm lần, xoay quanh một tâm. Chiều cao 4 – 3 – 4 – 3 – 3 tầng làm vòng tháp lên xuống không đều, như một nhóm người đứng quây quần."),
      W("Khối chính – khối phụ", "Khối chính là cụm năm tháp cùng hai cầu kính, khoảng 90% sàn, cao +18,45 m. Hai khối phụ chỉ một tầng, màu tối, mái cỏ: nhà sự kiện và phòng chuyên đề ở đầu Bắc."),
      W("Nắng và chói", "Tầng trên loe ra 0,8 m tự che nắng cho tầng dưới. Mặt tháp nhìn ra sông (70°) có lam đứng; mặt nhìn Trần Phú (250°) đặc. Mặt quay về đầu Bắc (340°) kính lấy sáng tán xạ; mặt quay về đầu Nam (160°) có mái đua."),
      W("Gió và mưa", "Khe giữa các tháp và sân giữa mở về đầu Nam, gió Đông Nam mùa hè thổi qua sân rồi lùa vào các tầng. Mùa đông gió mưa Đông Bắc đập vào hai tháp ven sông, sân giữa nằm khuất sau lưng chúng."),
      W("Công năng", "Tháp Tây Bắc là sảnh và văn phòng; tháp Đông Bắc là cà phê và đọc; tháp phía Tây là kho, nghiệp vụ sát lối Tây; hai tháp phía Nam là đọc và thiếu nhi. Mỗi tháp có một thang bộ và thang máy ở giữa.")],
    kc: { he: "Mỗi tháp có 8 cột bê tông xếp vòng tròn bán kính 4,5 m, thẳng từ móng lên mái, và một lõi thang ở giữa. Sàn mỗi tầng đua ra khỏi vòng cột 1,5–3,9 m bằng dầm công xôn tỏa tròn. Cầu kính là dầm thép gối lên hai tháp.", nhip: "14 m (mái nhà sự kiện); 6,4 m (cầu kính)", cx: "3,9 m (sàn tầng 4 so với vòng cột)" },
    qa: [["Tháp chân nhỏ đầu to có đứng vững không?", "Sàn mỗi tầng chỉ rộng hơn tầng dưới 0,8 m. Tầng trên cùng đua ra khỏi vòng cột 3,9 m, vẫn dưới mức 4,5 m của dầm công xôn thường. Phần đua đều quanh tháp nên tải cân, không lệch về một phía."],
      ["Năm tháp rời nhau có bất tiện khi phục vụ không?", "Tầng 1 các tháp nối nhau bằng hiên có mái quanh sân. Hai cầu kính nối tháp sông với tháp bên cạnh ở tầng 2 và 3. Sách đi bằng thang máy trong lõi tháp kho phía Tây."]],
    cut: "Mỗi tháp: 3–4 tấm foam trắng bát giác dày 2,25 cm, cạnh lớn dần (bán kính 3; 3,4; 3,8; 4,2 cm), dán chồng. Cầu kính: mica 1,5 × 3 cm. Khối phụ: foam đen cao 2,25 cm (nhà sự kiện 3,5 cm).",
    roleOf: () => "p",
    lab: [[32.5, 56, 18.45, "Khối chính · Năm tháp loe quanh sân", 1], [22, 55, 0.5, "Sân giữa mở về Nam"], [21.5, 37.5, 9.45, "Cầu kính"], [15, 19, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [28, 19, 4.95, "Khối phụ · Phòng chuyên đề", 2]],
    build() {
      const v = [], st = [];
      for (const [cx, cy, zs, fa] of TW) {
        zs.forEach((z, k) => v.push(PO(oct(cx, cy, rr(k)), 0.45 + 4.5 * k, 4.95 + 4.5 * k, z === "C" || z === "E" ? "stone" : "sheet", z, { fa, fl: 1, ...M })));
        st.push(...ring(cx, cy, 4.5, 0.45, 0.45 + 4.5 * zs.length));
      }
      // cầu kính: tháp Tây Bắc – tháp Đông Bắc, tháp Đông – tháp Nam (đặt trên cạnh phẳng của bát giác)
      const ce = k => 0.924 * rr(k);
      const fb = { N: "lam", E: "lam", S: "lam", W: "lam" };
      for (const k of [1, 2]) {
        const xa = 13.5 + ce(k), xb = 30 - ce(k), ya = 56 + ce(k), yb = 75 - ce(k);
        v.push(B(+xa.toFixed(2), 36.5, +(xb - xa).toFixed(2), 3, 0.45 + 4.5 * k, 4.95 + 4.5 * k, "glass", "L", { fa: fb, op: 0.6, ...M }));
        v.push(B(30, +ya.toFixed(2), 3, +(yb - ya).toFixed(2), 0.45 + 4.5 * k, 4.95 + 4.5 * k, "glass", "L", { fa: fb, op: 0.6, ...M }));
      }
      v.push(hall(8, 12, 14, 14, "blk"), low(24, 14, 8, 10, "stone", "D", fK));
      st.push(...hallSt(8, 12, 14, 14), ...lowSt(24, 14, 8, 10, 1, 1));
      return { v, st };
    }
  });

  /* ---------- 15.4 · theo UTEC Lima ---------- */
  I.push({
    id: "kh4", fam: "khoet", code: "15.4", name: "Vách bậc thang ngược", rule: "Hai bậc thang ngược chiều trong một mặt cắt",
    tag: "Phía sông các tầng lùi dần thành bậc vườn, phía phố các tầng vươn dần ra, đỡ bằng cột xiên",
    ref: { name: "UTEC, Đại học Kỹ thuật và Công nghệ", by: "Grafton Architects cùng Shell Arquitectos", year: "2015", place: "Lima, Peru", award: "Giải RIBA International Prize 2016 (lần đầu trao)",
      url: "https://www.archpaper.com/2016/11/grafton-utec-riba-international-prize/",
      what: "Một khuôn viên đại học xếp theo chiều đứng như vách núi: một phía các tầng lùi thành bậc vườn mở ra thung lũng, phía kia các tầng nhô dần ra trên đường cao tốc, đỡ bằng kết cấu bê tông lớn.",
      take: "Mượn mặt cắt hai bậc thang ngược chiều. Phía sông các tầng lùi 3–4 m mỗi tầng thành ba bậc vườn nhìn sông; phía Trần Phú các tầng vươn ra 2 m mỗi tầng, đỡ bằng hàng cột xiên lộ ra như sống lưng." },
    story: "Nhìn từ bờ sông, thư viện như một sườn đồi bậc thang có vườn trên mỗi bậc, người đọc ngồi ngoài trời nhìn ra sông Hàn. Nhìn từ Trần Phú, nhà lại như một vách đá nhô dần ra trên đầu, chừa bên dưới một hiên rộng che mưa nắng cho lối Tây. Hàng cột xiên chạy chéo trong mặt Tây cho thấy nhà đứng được bằng cách nào.",
    why: [W("Quy luật hình khối", "Bậc thang hai chiều ngược nhau trong cùng một mặt cắt: phía Đông lùi dần, phía Tây vươn dần. Khối thô vì vậy có dáng chữ Z nghiêng, nhìn từ mỗi phía một khác."),
      W("Khối chính – khối phụ", "Khối chính là vách bậc thang bốn tầng, cao +18,45 m, khoảng 85% sàn. Hai khối phụ một tầng, màu tối, mái cỏ: nhà sự kiện ở đầu Bắc và nhà thiếu nhi ở đầu Nam."),
      W("Nắng và chói", "Mặt sông (70°) lùi bậc, mỗi bậc có lam đứng và tầng trên che bớt nắng sáng. Mặt Trần Phú (250°) vươn ra, mỗi tầng tự che cho tầng dưới, tường đặc chỉ chừa khe hẹp. Đầu Bắc (340°) kính lấy sáng tán xạ, đầu Nam (160°) mái đua."),
      W("Gió và mưa", "Gió Đông Nam mùa hè vào từ đầu Nam, thổi dọc các bậc vườn. Mùa đông gió mưa Đông Bắc đập vào mặt sông: các bậc vườn có máng và lam dày; lối vào chính đặt dưới hiên phía Tây và ở đầu Bắc."),
      W("Công năng", "Tầng 1 là sảnh, cà phê và kho, nghiệp vụ sát lối Tây. Tầng 2 văn phòng và đọc. Tầng 3–4 là đọc, mỗi tầng có một bậc vườn đọc ngoài trời nhìn sông. Tầng 4 có phòng chuyên đề.")],
    kc: { he: "Khung bê tông, cột thẳng theo các trục x = 10, 17, 20, 24, 27, 30; cột phía Đông dừng ở bậc tương ứng. Mặt Tây có hàng cột xiên bê tông từ chân trục x = 10 lên mép tầng 4, gánh phần vươn ra 6 m tổng cộng.", nhip: "14 m (mái nhà sự kiện); 7 m (sàn)", cx: "2 m mỗi tầng, đỡ bằng cột xiên" },
    qa: [["Tầng 4 vươn ra 6 m so với chân nhà, có đổ không?", "Mỗi tầng chỉ vươn 2 m so với tầng ngay dưới. Hàng cột xiên trong mặt Tây đỡ trực tiếp mép tầng 4 và truyền lực xuống móng ở trục x = 10, nên phần vươn không phải đua tự do."],
      ["Bậc vườn có thấm xuống phòng bên dưới không?", "Bậc vườn là sàn mái có lớp chống thấm, đất trồng dày 40 cm và máng thoát nước ở mép mỗi bậc. Đây là chi tiết mái xanh thông thường."]],
    cut: "Bốn tấm foam trắng dày 2,25 cm, rộng 10; 9,5; 9; 8 cm, dài 17 cm, xếp lệch: mép Tây mỗi tầng lùi ra 1 cm, mép Đông lùi vào 1,5–2 cm. Cột xiên: que tre 2 mm cắm chéo. Phủ bột cỏ lên các bậc. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[12, 47, 18.45, "Khối chính · Vách bậc thang ngược", 1], [25.5, 50, 9.45, "Bậc vườn đọc nhìn sông"], [6, 47, 9.45, "Mặt Tây vươn ra, cột xiên"], [17, 19, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [20, 77, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2]],
    build() {
      const fW = { N: "kinh", E: "lam", S: "dua", W: "dac" }, gr = { top: "grass" };
      const v = [
        F1(10, 30, 20, 16, 0, "sheet", "A", fP, { ...M, ...gr }), F1(10, 46, 20, 18, 0, "sheet", "C", fK, { ...M, ...gr }),
        F1(8, 30, 19, 14, 1, "sheet", "E", fW, { ...M, ...gr }), F1(8, 44, 19, 20, 1, "sheet", "B", fW, { ...M, ...gr }),
        F1(6, 30, 18, 34, 2, "sheet", "B", fW, { ...M, ...gr }),
        F1(4, 30, 16, 26, 3, "sheet", "B", fW, M), F1(4, 56, 16, 8, 3, "sheet", "D", fW, M),
        hall(10, 12, 14, 14, "blk"), low(12, 70, 16, 14, "stone", "B", fR)];
      const ys = [30, 38.5, 47, 55.5, 64];
      const st = [...grid([10, 17, 20], ys, 0.45, 18.45), ...grid([24], ys, 0.45, 13.95), ...grid([27], ys, 0.45, 9.45), ...grid([30], ys, 0.45, 4.95),
        ...ys.map(y => ({ t: "seg", a: [10, y, 0.45], b: [4.5, y, 13.95] })),
        ...hallSt(10, 12, 14, 14), ...lowSt(12, 70, 16, 14)];
      return { v, st };
    }
  });

  /* ---------- 15.5 · theo Taipei Performing Arts Center ---------- */
  I.push({
    id: "kh5", fam: "khoet", code: "15.5", name: "Khối vuông cắm hộp", rule: "Khối cài: cắm khối phụ vào một khối chủ",
    tag: "Một khối vuông đọc sách nhấc khỏi mặt đất, hai hộp màu cắm xuyên ra hai mặt, nhà sự kiện bát giác áp vào mặt Bắc",
    ref: { name: "Taipei Performing Arts Center", by: "OMA cùng Kris Yao Artech", year: "2022", place: "Đài Bắc, Đài Loan", award: "",
      url: "https://www.dezeen.com/2022/08/08/oma-opens-taipei-performing-arts-center-in-taiwan/",
      what: "Một khối lập phương ở giữa chứa sân khấu và hậu đài, nhấc khỏi mặt đất để chừa quảng trường. Ba nhà hát có hình khác nhau, trong đó có một khối cầu, cắm vào các mặt của khối lập phương.",
      take: "Mượn ý một khối chủ ở giữa và các khối khác hình cắm vào nó. Khối vuông đọc sách nhấc lên trên cột, chừa sảnh kính và quảng trường có mái ở tầng 1. Hai hộp đọc màu cắm xuyên qua khối vuông và nhô ra 4,5 m: hộp vàng nhô ra sông ở tầng 3, hộp tím nhô ra phố ở tầng 4. Nhà sự kiện bát giác áp vào mặt Bắc như nhà hát cầu của Đài Bắc." },
    story: "Từ cầu Rồng nhìn sang, thư viện là một khối vuông trắng lơ lửng trên hàng cột, có một hộp vàng thò ra phía sông như ngăn kéo kéo dở. Mặt sau có một hộp tím thò ra phía phố, cao hơn một tầng. Áp vào mặt Bắc là nhà sự kiện bát giác thấp, mái cỏ. Dưới khối vuông là sảnh kính và quảng trường có mái, nơi người đi bộ từ phố cắt qua ra bờ sông.",
    why: [W("Quy luật hình khối", "Khối cài: một khối chủ vuông vắn, ba khối khác hình cài vào ba mặt. Khối chủ tĩnh, các khối cài lệch tầng, lệch hướng, lệch màu nên tổng thể vừa trật tự vừa sinh động."),
      W("Khối chính – khối phụ", "Khối chính là khối vuông cùng hai hộp cắm, khoảng 80% sàn, cao +18,45 m. Khối phụ là nhà sự kiện bát giác cao +7,45 m, nhà thiếu nhi và quầy cà phê bên sông, đều thấp, màu tối."),
      W("Nắng và chói", "Mặt sông (70°) và đầu hộp vàng có lam đứng chặn nắng sáng thấp. Mặt Trần Phú (250°) đặc, hộp tím nhô ra phía phố cũng đặc, chỉ chừa cửa ở hai bên. Đầu Bắc (340°) kính lấy sáng tán xạ; đầu Nam (160°) mái đua."),
      W("Gió và mưa", "Tầng 1 để trống quanh sảnh kính, gió Đông Nam mùa hè vào từ đầu Nam thổi xuyên dưới khối vuông. Khối vuông che mưa cho cả quảng trường bên dưới khi gió mưa Đông Bắc thổi từ sông vào."),
      W("Công năng", "Tầng 1: sảnh kính và lõi vệ sinh. Tầng 2: kho, nghiệp vụ và văn phòng. Tầng 3–4: đọc; hộp vàng là phòng đọc nhìn sông, hộp tím là phòng đọc yên tĩnh nhìn phố. Nhà sự kiện bát giác có lối riêng từ quảng trường Bắc.")],
    kc: { he: "Khung bê tông lưới 8 × 8 m, 16 cột thẳng từ móng lên mái đỡ khối vuông. Hai hộp cắm là hộp khung thép chạy xuyên khối vuông 8 m, gối lên hai hàng cột, phần nhô ra 4,5 m là dầm công xôn. Nhà sự kiện bát giác dùng vì kèo thép hướng tâm.", nhip: "16 m (mái nhà sự kiện bát giác)", cx: "4,5 m (hai hộp cắm)" },
    qa: [["Hộp vàng nhô 4,5 m ra sông có cần dây treo không?", "Không. Hộp chạy xuyên vào khối vuông 8 m, gối lên hai hàng cột; phần nhô 4,5 m ngắn hơn phần nằm trong nhà, nên dầm công xôn thép đủ đỡ."],
      ["Khối vuông nhấc lên, tầng 1 trống có phí đất không?", "Tầng 1 vẫn có sảnh kính 256 m² và lõi vệ sinh. Phần còn lại là quảng trường có mái, dùng cho triển lãm, chợ sách và che mưa cho người đi bộ, rất cần ở bờ sông Đà Nẵng."]],
    cut: "Khối vuông: 3 tấm foam trắng 12 × 12 cm dày 2,25 cm, khoét rãnh 4 × 6 cm và 4 × 4 cm cho hai hộp cắm. Hộp cắm: foam vàng 6,25 × 6 cm và foam tím 6,25 × 4 cm. Cột: que tre 3 mm cao 2,25 cm. Nhà sự kiện: foam đen bát giác cao 3,5 cm.",
    roleOf: () => "p",
    lab: [[22, 48, 18.45, "Khối chính · Khối vuông cắm hộp", 1], [36, 48, 13.95, "Hộp vàng nhô ra sông"], [8, 48, 18.45, "Hộp tím nhô ra phố"], [22, 29, 7.45, "Khối phụ · Nhà sự kiện bát giác", 2], [21, 71, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [37, 46, 4.95, "Khối phụ · Cà phê bên sông", 2]],
    build() {
      const v = [
        B(14, 40, 16, 16, 0.45, 4.95, "glass", "A", { fa: fP, fl: 1, ...M }), B(10, 50, 4, 10, 0.45, 4.95, "stone", "E", { fa: fD, fl: 1, ...M }),
        F1(10, 36, 12, 24, 1, "sheet", "C", fK, M), F1(22, 36, 12, 24, 1, "sheet", "E", fR, M),
        F1(10, 36, 24, 6, 2, "sheet", "B", fR, M), F1(10, 42, 16, 12, 2, "sheet", "B", fR, M), F1(10, 54, 24, 6, 2, "sheet", "B", fR, M),
        F1(26, 42, 12.5, 12, 2, "gold", "B", fR, M),
        F1(10, 36, 24, 8, 3, "sheet", "B", fR, M), F1(18, 44, 16, 8, 3, "sheet", "B", fR, M), F1(10, 52, 24, 8, 3, "sheet", "B", fR, M),
        F1(5.5, 44, 12.5, 8, 3, "violet", "B", { N: "kinh", E: "lam", S: "dua", W: "dac" }, M),
        PO(oct(22, 28.6, 8), 0.45, 7.45, "blk", "D", { fa: fK, fl: 1, top: "grass" }),
        low(12, 64, 18, 14, "stone", "B", fR), low(34, 40, 6, 12, "stone", "A", fP)];
      const st = [...grid([10, 18, 26, 34], [36, 44, 52, 60], 0.45, 18.45), ...ring(22, 28.6, 8, 0.45, 7.45),
        ...zig(14.6, 28.6, 29.4, 28.6, 6.45, 7.45, 4), ...zig(22, 21.2, 22, 36, 6.45, 7.45, 4), ...lowSt(12, 64, 18, 14), ...lowSt(34, 40, 6, 12, 1, 1)];
      return { v, st };
    }
  });

  /* ---------- 15.6 · theo Thư viện Đại học Mỹ thuật Musashino ---------- */
  I.push({
    id: "kh6", fam: "khoet", code: "15.6", name: "Xoắn ốc tường sách", rule: "Xoắn ốc tiến dần, cao dần vào tâm",
    tag: "Một dải nhà rộng 6 m cuộn xoắn ốc từ ngoài vào trong, thấp ở vòng ngoài, cao dần lên tháp đọc ở tâm",
    ref: { name: "Thư viện và Bảo tàng Đại học Mỹ thuật Musashino", by: "Sou Fujimoto Architects", year: "2010", place: "Kodaira, Tokyo, Nhật Bản", award: "",
      url: "https://www.e-architect.com/tokyo/musashino-art-university-museum-library",
      what: "Toàn bộ thư viện là một bức tường kệ sách cuộn xoắn ốc, đi từ trong ra ngoài thành luôn mặt ngoài của nhà. Lối đi chạy theo vòng xoắn, xuyên qua các ô khoét trên tường kệ.",
      take: "Mượn vòng xoắn ốc. Ở đây vòng xoắn là một dải nhà rộng 6 m, mặt ngoài là tường kệ sách có nét đố dày. Vòng ngoài một tầng, vòng giữa hai tầng, vòng trong ba tầng, tâm là tháp đọc bốn tầng; khe giữa các vòng là những hẻm sách ngoài trời." },
    story: "Người đọc bắt đầu từ góc Tây Nam, đi dọc vòng ngoài thấp một tầng, rẽ sang dải phía Bắc hai tầng, men theo dải ven sông, rồi vòng vào dải phía Nam ba tầng và lên tháp đọc ở tâm. Càng vào trong nhà càng cao, càng yên tĩnh. Giữa các vòng là ba con hẻm rộng 5–6 m có cây, giống các con kiệt của Đà Nẵng, lúc nào cũng có bóng mát.",
    why: [W("Quy luật hình khối", "Xoắn ốc tiến dần: một dải nhà cuộn vào tâm, mỗi vòng cao thêm một tầng. Khối thô nhìn từ trên xuống thấy rõ vòng xoắn; nhìn ngang thấy các bức tường kệ sách xếp lớp cao dần."),
      W("Khối chính – khối phụ", "Khối chính là cả vòng xoắn và tháp ở tâm, khoảng 90% sàn, đỉnh +18,45 m. Hai khối phụ một tầng, màu tối, mái cỏ: nhà sự kiện và phòng chuyên đề ở đầu Bắc, nằm ngoài vòng xoắn."),
      W("Nắng và chói", "Vòng ngoài phía Trần Phú (250°) đặc, là kho và nghiệp vụ, che nắng chiều cho cả vòng trong. Dải ven sông (70°) có lam đứng. Các hẻm hẹp và tường cao che nắng cho nhau; đầu Bắc (340°) lấy sáng tán xạ, đầu Nam (160°) có mái đua."),
      W("Gió và mưa", "Ba con hẻm thông về đầu Nam, gió Đông Nam mùa hè đi theo vòng xoắn vào sâu bên trong. Mùa đông dải ven sông chắn gió mưa Đông Bắc cho các hẻm phía sau."),
      W("Công năng", "Vòng ngoài là kho, nghiệp vụ, văn phòng sát lối Tây. Dải phía Bắc là sảnh và đọc mở. Dải ven sông là đọc nhìn sông. Dải phía Nam có thiếu nhi ở tầng 1. Tháp ở tâm là đọc yên tĩnh, càng lên cao càng yên.")],
    kc: { he: "Khung bê tông lưới 6 × 7–9 m chạy theo từng dải, cột thẳng từ móng lên mái. Tường kệ sách mặt ngoài là tường bê tông mỏng có ô khoét, làm luôn tường chịu lực ngang. Tháp ở tâm có lõi thang bê tông.", nhip: "15 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Đi theo vòng xoắn có bị xa, lạc đường không?", "Mỗi dải đều có lối tắt qua hẻm sang dải bên cạnh, và tháp ở tâm có thang máy. Vòng xoắn là đường dạo, không phải đường bắt buộc."],
      ["Các dải cao thấp khác nhau thì chỗ nối có bị lún lệch không?", "Mỗi dải là một khung riêng, nối nhau bằng khe lún ở chỗ đổi số tầng. Móng tính theo tải từng dải nên lún đều."]],
    cut: "Dải nhà: foam trắng rộng 3 cm, cao 2,25 / 4,5 / 6,75 cm, cắt theo vòng xoắn. Tháp tâm: foam 3,5 × 17,5 cm cao 9 cm. Kẻ nét đố tường kệ bằng bút kim 0,3 mm cách 6 mm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[20.5, 52, 18.45, "Khối chính · Xoắn ốc tường sách", 1], [33, 52, 9.45, "Dải đọc ven sông"], [14.5, 50, 0.5, "Hẻm sách"], [21.5, 18, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [34, 19, 4.95, "Khối phụ · Phòng chuyên đề", 2]],
    build() {
      const rb = { ribs: 1.2 };
      const v = [
        F1(6, 24, 6, 30, 0, "stone", "C", fD, { ...M, ...rb }), F1(6, 54, 6, 28, 0, "stone", "E", fK, { ...M, ...rb }),
        F1(12, 24, 24, 6, 0, "sheet", "A", fP, { ...M, ...rb }), F1(12, 24, 24, 6, 1, "sheet", "B", fR, { ...M, ...rb }),
        F1(30, 30, 6, 46, 0, "sheet", "B", fR, { ...M, ...rb }), F1(30, 30, 6, 46, 1, "sheet", "B", fR, { ...M, ...rb }),
        F1(17, 70, 13, 6, 0, "sheet", "B", fR, { ...M, ...rb }), F1(17, 70, 13, 6, 1, "sheet", "E", fK, { ...M, ...rb }), F1(17, 70, 13, 6, 2, "sheet", "B", fR, { ...M, ...rb }),
        F1(17, 35, 7, 17.5, 0, "sheet", "A", fP, { ...M, ...rb }), F1(17, 52.5, 7, 17.5, 0, "sheet", "C", fK, { ...M, ...rb }),
        F1(17, 35, 7, 35, 1, "sheet", "B", fR, { ...M, ...rb }), F1(17, 35, 7, 35, 2, "sheet", "B", fR, { ...M, ...rb }), F1(17, 35, 7, 35, 3, "sheet", "B", fR, { ...M, ...rb }),
        hall(14, 12, 15, 12, "blk"), low(30, 14, 8, 10, "stone", "D", fK)];
      const st = [...grid([6, 12], range(24, 82, 7.25), 0.45, 4.95), ...grid(range(12, 36, 8), [24, 30], 0.45, 9.45), ...grid([30, 36], range(30, 76, 7.67), 0.45, 9.45),
        ...grid([17, 23.5, 30], [70, 76], 0.45, 13.95), ...grid([17, 24], range(35, 70, 8.75), 0.45, 18.45),
        ...hallSt(14, 12, 15, 12), ...lowSt(30, 14, 8, 10, 1, 1)];
      return { v, st };
    }
  });

  /* ---------- 15.7 · theo The Interlace ---------- */
  // thanh trên cùng xoay 30°: tâm (22, 52), dài 30 m, rộng 8 m
  const rot30 = (() => { const c = [22, 52], u = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], n = [-u[1], u[0]], P = (a, b) => [+(c[0] + u[0] * a + n[0] * b).toFixed(2), +(c[1] + u[1] * a + n[1] * b).toFixed(2)]; return [P(-15, -4), P(15, -4), P(15, 4), P(-15, 4)]; })();
  I.push({
    id: "kh7", fam: "khoet", code: "15.7", name: "Thanh đọc xếp giếng, thanh đỉnh xoay chéo", rule: "Xếp chồng đan nhau, tầng trên cùng xoay lệch",
    tag: "Bốn lớp thanh nhà xếp chồng vuông góc nhau như xếp que, lớp trên cùng xoay chéo 30°",
    ref: { name: "The Interlace", by: "OMA / Büro Ole Scheeren", year: "2013", place: "Singapore", award: "World Building of the Year, World Architecture Festival 2015",
      url: "https://en.wikipedia.org/wiki/The_Interlace",
      what: "Ba mươi mốt khối nhà dài sáu tầng xếp chồng lên nhau theo các góc lệch, tạo thành mạng lục giác quanh nhiều sân trong. Mái của khối dưới thành vườn cho khối trên.",
      take: "Mượn cách xếp chồng các thanh nhà dài lên nhau. Thu nhỏ còn bốn lớp, mỗi lớp một tầng: hai thanh dọc dưới cùng, ba thanh ngang ở tầng 2, một thanh dọc ở tầng 3, và thanh trên cùng xoay 30°. Mỗi thanh là một dàn thép cao đúng một tầng, gối lên thanh dưới ở chỗ giao." },
    story: "Thư viện như một chồng que xếp giếng: hai thanh dọc nằm dưới đất, ba thanh ngang gác lên, rồi một thanh dọc nữa, trên cùng một thanh xoay chéo hướng về phía cầu Rồng. Mỗi chỗ giao là một ô cửa nhìn xuyên qua, mỗi mái thanh dưới là một sân thượng cho thanh trên. Giữa hai thanh dưới cùng là sân trong có sảnh kính, gió lùa từ đầu Nam vào.",
    why: [W("Quy luật hình khối", "Xếp chồng đan nhau: các thanh cùng tiết diện 8 m nằm vuông góc qua từng lớp, tạo các khoảng rỗng và sân thượng xen kẽ. Thanh trên cùng xoay 30° phá thế vuông vức, làm điểm nhấn nhìn từ xa."),
      W("Khối chính – khối phụ", "Khối chính là cả chồng thanh, khoảng 93% sàn, đỉnh +18,45 m. Khối phụ duy nhất là nhà sự kiện một tầng màu tối, mái cỏ, đặt riêng ở đầu Bắc."),
      W("Nắng và chói", "Mặt sông (70°) của mọi thanh có lam đứng; mặt Trần Phú (250°) đặc. Các thanh lớp trên che nắng cho sân thượng lớp dưới. Đầu thanh quay về Bắc (340°) là kính lấy sáng tán xạ; đầu quay về Nam (160°) có mái đua."),
      W("Gió và mưa", "Sân trong giữa hai thanh dưới cùng mở về đầu Nam, đón gió Đông Nam mùa hè. Các khe giữa ba thanh ngang thông gió theo hướng Đông – Tây. Mùa mưa, các thanh trên che cho sân và sảnh bên dưới."),
      W("Công năng", "Thanh dọc phía Tây là kho, nghiệp vụ, văn phòng sát lối Tây; thanh dọc phía sông là sảnh, cà phê và đọc báo. Ba thanh ngang tầng 2 là đọc và phòng chuyên đề. Thanh tầng 3 và thanh xoay trên cùng là đọc yên tĩnh có sân thượng.")],
    kc: { he: "Mỗi thanh là một dàn thép cao đúng một tầng chạy theo hai mặt dài, gối lên thanh bên dưới tại chỗ giao bằng cột trong mặt dàn. Thanh dưới cùng đứng trên cột bê tông lưới 8 m. Thanh xoay trên cùng là dàn thép đua 11 m mỗi phía khỏi thanh tầng 3.", nhip: "14 m (mái nhà sự kiện); 12 m (thanh ngang qua sân trong)", cx: "4 m (thanh tầng 2 và 3); 11 m bằng dàn cao 1 tầng (thanh trên cùng)" },
    qa: [["Thanh trên cùng đua 11 m mỗi bên, có đứng nổi không?", "Thanh này là dàn thép cao đúng một tầng, hai mặt dài là hai dàn tam giác. Dàn cao 4,5 m đua 11 m là tỉ lệ bình thường của cầu dàn; nó gối lên thanh tầng 3 ở giữa nên hai đầu cân nhau."],
      ["Xếp chồng như vậy cột tầng trên có thẳng với cột tầng dưới không?", "Không cần thẳng hết: mỗi thanh tự là một dầm cao một tầng, chỉ cần gối lên thanh dưới ở chỗ giao. The Interlace ở Singapore làm đúng như vậy với khối dài 70 m."]],
    cut: "Các thanh: foam trắng tiết diện 4 × 2,25 cm, dài 28, 18, 28 và 15 cm. Xếp chồng vuông góc, dán ở chỗ giao. Thanh trên cùng xoay 30°. Vẽ dàn chéo lên mặt dài bằng bút kim. Nhà sự kiện: foam đen cao 3,5 cm.",
    roleOf: () => "p",
    lab: [[22, 52, 18.45, "Khối chính · Thanh đọc xếp giếng", 1], [22, 30, 13.95, "Thanh tầng 3 có sân thượng"], [22, 46, 4.95, "Sảnh kính trong sân"], [23.5, 18, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2]],
    build() {
      const fT = { N: "kinh", E: "lam", S: "dua", W: "dac" }, gr = { top: "grass" };
      const v = [
        F1(8, 24, 8, 28, 0, "stone", "C", fD, M), F1(8, 52, 8, 28, 0, "stone", "E", fK, M),
        F1(28, 24, 8, 22, 0, "sheet", "A", fP, M), F1(28, 46, 8, 34, 0, "sheet", "B", fR, M),
        B(16, 40, 12, 12, 0.45, 4.95, "glass", "A", { fa: fP, fl: 1, ...M }),
        F1(4, 28, 10, 8, 1, "sheet", "D", fT, { ...M, ...gr }), F1(14, 28, 26, 8, 1, "sheet", "B", fT, { ...M, ...gr }),
        F1(4, 48, 36, 8, 1, "sheet", "B", fT, { ...M, ...gr }), F1(4, 68, 36, 8, 1, "sheet", "B", fT, { ...M, ...gr }),
        F1(18, 24, 8, 56, 2, "sheet", "B", fT, { ...M, ...gr }),
        PO(rot30, 13.95, 18.45, "sheet", "B", { fa: fT, fl: 1, ...M }),
        hall(16, 12, 15, 12, "blk")];
      const R = rot30;
      const st = [...grid([8, 16, 28, 36], range(24, 80, 8), 0.45, 4.95), ...grid([8, 16, 28, 36], [28, 36, 48, 56, 68, 76], 0.45, 9.45), ...grid([18, 26], [28, 36, 48, 56, 68, 76], 4.95, 13.95),
        ...[28, 36, 48, 56, 68, 76].flatMap(y => zig(4, y, 40, y, 4.95, 9.45, 9)), ...zig(18, 24, 18, 80, 9.45, 13.95, 14), ...zig(26, 24, 26, 80, 9.45, 13.95, 14),
        ...zig(R[0][0], R[0][1], R[1][0], R[1][1], 13.95, 18.45, 8), ...zig(R[3][0], R[3][1], R[2][0], R[2][1], 13.95, 18.45, 8),
        ...hallSt(16, 12, 15, 12)];
      return { v, st };
    }
  });

  /* ---------- 15.8 · theo Thư viện Quốc gia Pháp ---------- */
  const LS = [
    { arms: [[6, 24, 13, 7], [6, 31, 7, 10]], zs: ["C", "E", "B"], c: "stone" },
    { arms: [[25, 24, 13, 7], [31, 31, 7, 10]], zs: ["A", "B", "B", "B"], c: "sheet" },
    { arms: [[6, 73, 13, 7], [6, 63, 7, 10]], zs: ["E", "B", "B"], c: "sheet" },
    { arms: [[25, 73, 13, 7], [31, 63, 7, 10]], zs: ["B", "B", "B"], c: "sheet" }];
  I.push({
    id: "kh8", fam: "khoet", code: "15.8", name: "Bốn góc sách mở quanh vườn", rule: "Bốn góc lặp lại, mỗi góc cao một khác",
    tag: "Bốn khối chữ L như bốn cuốn sách mở đứng ở bốn góc, quay vào một khu vườn giữa có nhà sự kiện mái cỏ",
    ref: { name: "Thư viện Quốc gia Pháp (Bibliothèque nationale de France, François-Mitterrand)", by: "Dominique Perrault", year: "1995–1996", place: "Paris, Pháp", award: "Giải Mies van der Rohe 1997",
      url: "https://perraultarchitecture.com/en/projects/2465-french_national_library.html",
      what: "Bốn tòa tháp chữ L đứng ở bốn góc một quảng trường, mỗi tháp như một cuốn sách mở dựng đứng, quay vào nhau. Giữa là một khu vườn rừng trũng xuống, các phòng đọc bao quanh vườn.",
      take: "Mượn bốn cuốn sách mở ở bốn góc quanh vườn. Thu nhỏ còn bốn khối chữ L 3–4 tầng, cao thấp khác nhau như bốn cuốn sách dày mỏng khác nhau. Hai cạnh dài nối bằng hành lang một tầng. Giữa hai cuốn sách phía Bắc và phía Nam chừa khe 6 m làm cổng vào vườn và đường gió." },
    story: "Đứng ở quảng trường Bắc nhìn vào, thấy hai cuốn sách mở đứng hai bên một khe hẹp, qua khe là khu vườn cây xanh. Bốn cuốn sách cao thấp khác nhau: cuốn bên sông cao nhất, bốn tầng, làm điểm nhìn từ cầu Rồng. Trong vườn là nhà sự kiện thấp mái cỏ, như một cái hộp nằm giữa bốn cuốn sách. Phòng đọc nào cũng nhìn vào vườn.",
    why: [W("Quy luật hình khối", "Lặp lại bốn khối chữ L giống nhau ở bốn góc, quay vào một tâm, nhưng mỗi khối cao một khác (4 – 3 – 3 – 3 tầng) nên không đối xứng cứng. Khe hở ở giữa hai cạnh ngắn làm bốn cuốn sách đọc được rõ ràng, không dính thành một vòng."),
      W("Khối chính – khối phụ", "Khối chính là bốn cuốn sách cùng hai hành lang, khoảng 90% sàn, đỉnh +18,45 m. Khối phụ là nhà sự kiện mái cỏ nằm trong vườn và phòng chuyên đề thấp ở quảng trường Bắc, đều một tầng, màu tối."),
      W("Nắng và chói", "Các mặt quay ra sông (70°) có lam đứng; mặt quay ra Trần Phú (250°) đặc. Mặt quay vào vườn có lam và mái đua, vườn cây che nắng trưa. Cạnh quay về Bắc (340°) kính lấy sáng tán xạ; cạnh quay về Nam (160°) có mái đua."),
      W("Gió và mưa", "Khe 6 m ở đầu Nam đón gió Đông Nam mùa hè vào vườn, thoát ra khe đầu Bắc. Mùa đông gió mưa Đông Bắc đập vào hai cuốn sách và hành lang phía sông; vườn nằm khuất bên trong."),
      W("Công năng", "Cuốn Tây Bắc: kho, văn phòng. Cuốn Đông Bắc: sảnh ở tầng 1, đọc ở trên. Cuốn Tây Nam: vệ sinh, đọc. Cuốn Đông Nam: thiếu nhi ở tầng 1 mở ra vườn. Hành lang phía Tây là kho sách, phía Đông là cà phê nhìn sông.")],
    kc: { he: "Mỗi cuốn sách là một khung bê tông riêng, lưới 6,5–7 m, cột thẳng từ móng lên mái. Hai hành lang là khung nhẹ một tầng. Nhà sự kiện trong vườn dùng dàn thép mái nhịp 13 m.", nhip: "13 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Bốn khối rời nhau có tốn thang và vệ sinh không?", "Mỗi cuốn sách có một thang bộ ở góc chữ L, hai cuốn phía Đông có thang máy. Bốn thang nằm ở bốn góc nên lối thoát nạn rất ngắn. Vệ sinh tập trung ở cuốn Tây Nam và cuốn Đông Bắc."],
      ["Vườn ở giữa có bị tối không?", "Vườn rộng 18 m, khe hai đầu mở về Bắc và Nam. Ba cuốn sách chỉ cao 3 tầng (13,5 m), nên buổi trưa nắng vẫn vào tới mặt đất."]],
    cut: "Mỗi cuốn sách: 3–4 tấm foam trắng chữ L, cạnh 6,5 × 8,5 cm, dày 3,5 cm, dày 2,25 cm mỗi tầng. Hai hành lang: foam 3,5 × 11 cm cao 2,25 cm. Nhà sự kiện: foam đen 7 × 6,5 cm cao 3,5 cm, phủ bột cỏ. Vườn: rắc bột cỏ và cây xốp.",
    roleOf: () => "p",
    lab: [[34.5, 28, 18.45, "Khối chính · Bốn góc sách mở quanh vườn", 1], [22, 48, 0.5, "Vườn giữa bốn cuốn sách"], [9.5, 52, 4.95, "Hành lang kho sách"], [22, 40, 7.45, "Khối phụ · Nhà sự kiện mái cỏ trong vườn", 2], [30, 19, 4.95, "Khối phụ · Phòng chuyên đề", 2]],
    build() {
      const v = [], st = [];
      for (const L of LS) {
        L.zs.forEach((z, k) => { for (const [x, y, w, d] of L.arms) v.push(F1(x, y, w, d, k, z === "C" ? "stone" : L.c, z, z === "A" ? fP : z === "C" || z === "E" ? fK : fR, M)); });
        const zt = 0.45 + 4.5 * L.zs.length;
        for (const [x, y, w, d] of L.arms) st.push(...grid([x, x + w], [y, y + d], 0.45, zt));
      }
      v.push(F1(6, 41, 7, 22, 0, "stone", "C", fD, M), B(31, 41, 7, 22, 0.45, 4.95, "glass", "A", { fa: fP, fl: 1, ...M }));
      st.push(...grid([6, 13, 31, 38], range(41, 63, 7.33), 0.45, 4.95));
      v.push(hall(15, 34, 14, 13, "blk"), low(26, 14, 8, 10, "stone", "D", fK));
      st.push(...hallSt(15, 34, 14, 13), ...lowSt(26, 14, 8, 10, 1, 1));
      return { v, st };
    }
  });
})(window.G3);
