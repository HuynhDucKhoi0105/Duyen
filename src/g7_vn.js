
/* ================= Đợt 5 · nhóm 16: Việt Nam, châu Á, bài thi đạt giải (8 ý tưởng) ================= */
(function (G) {
  const { B, SH, PO, S3, V, FR, LN, col, wall, seg, range, zig } = G.K;
  const GA = G.K.G; // mái hai dốc
  const { FA, Z, F1, stepsLN } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I7 = G.ideas7 = G.ideas7 || [];
  const corners = b => [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.d], [b.x, b.y + b.d]].map(([x, y]) => col(x, y, 0, b.z2));
  // cột lưới: ở mọi điểm lưới nằm dưới một hộp, cột thẳng từ móng lên tới hộp cao nhất ở điểm đó
  function gridCols(bx, xs, ys, z0 = 0) {
    const o = [];
    for (const x of xs) for (const y of ys) {
      const h = bx.filter(b => x >= b.x - 0.05 && x <= b.x + b.w + 0.05 && y >= b.y - 0.05 && y <= b.y + b.d + 0.05);
      if (h.length) o.push(col(x, y, z0, Math.max(...h.map(b => b.z2))));
    }
    return o;
  }
  const FU = { N: "dac", E: "dua", S: "dua", W: "dac" }; // tầng dưới nằm trong bóng tầng trên

  /* ---------- 16.1 · Bảo tàng Hà Nội: tháp ngược ---------- */
  I7.push({
    id: "vn1", fam: "vn", code: "16.1", name: "Ba bậc ngược tỏa bóng", rule: "Tiến dần ngược: tầng trên rộng hơn tầng dưới",
    tag: "Ba tầng xếp như kim tự tháp lộn ngược, mỗi tầng nhô ra 3 m che nắng cho tầng dưới, đứng giữa mặt nước",
    ref: {
      name: "Bảo tàng Hà Nội", by: "gmp – von Gerkan, Marg und Partner", year: "2010", place: "Hà Nội, Việt Nam",
      award: "Thắng cuộc thi thiết kế quốc tế năm 2005", url: "https://www.gmp.de/en/news/44/publications/5149/gmp-focus-the-hanoi-museum-in-vietnam",
      what: "Khối hình kim tự tháp lộn ngược: mỗi tầng phía trên nhô ra xa hơn tầng dưới, tầng trên cùng rộng nhất. Phần nhô ra che nắng cho các tầng bên dưới; công trình đứng giữa công viên có hồ nước.",
      take: "Giữ nguyên ý tầng trên che tầng dưới, nhưng chỉ ba tầng và mỗi bậc nhô đúng 3 m để dầm và dàn cao một tầng gánh được. Tầng 1 lùi sâu thành sảnh kính mát, có mặt nước dưới bóng tầng trên."
    },
    story: "Bảo tàng Hà Nội lật ngược kim tự tháp để tầng trên làm mái che cho tầng dưới. Ở bờ sông Hàn nắng gắt, ý này rất đúng chỗ: tầng 1 nhỏ nhất, lùi sâu vào bóng râm; tầng 2 nhô ra 3 m; tầng 3 là phòng đọc lớn nhất, nhô thêm 3 m nữa. Dưới mép nhô là một dải mặt nước phản chiếu, giữ mát cho sảnh. Ba khối phụ thấp, tối màu đứng tách ra ở quảng trường Bắc và đầu Nam.",
    why: [W("Quy luật hình khối", "Tiến dần ngược: ba bậc đều nhau 3 m theo cả bốn phía, nên khối vừa lạ vừa có trật tự. Nhìn mô hình trắng thấy ngay một khối nặng ở trên, chân thon ở dưới."),
      W("Khối chính – khối phụ", "Khối chính là tháp ngược ba tầng, cao +13,95 m, khoảng 83% sàn, màu sáng. Ba khối phụ thấp, ốp đá tối: nhà sự kiện +7,45 m ở đầu Nam, dãy kho một tầng sát lối Tây và quán cà phê nhỏ bên quảng trường Bắc."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc: tầng 3 có lam đứng, tầng 1 nằm trong bóng 6 m của hai bậc trên nên nắng sáng không chiếu tới chỗ ngồi. Mặt Trần Phú nhìn Tây Tây Nam đặc. Đầu Nam nhìn Nam Đông Nam có mép nhô làm mái đua."),
      W("Gió và mưa", "Gió Đông Nam mùa hè vào từ đầu Nam, lướt qua mặt nước dưới mép nhô rồi vào sảnh, mát hơn vài độ. Mưa gió mùa Đông Bắc tạt vào mặt sông thì sảnh tầng 1 đã lùi sâu 6 m dưới hai bậc, không ướt."),
      W("Công năng", "Tầng 1 nhỏ: sảnh, gửi đồ, kho, vệ sinh. Tầng 2: phòng chuyên đề D4 và đọc mở. Tầng 3 rộng nhất: phòng đọc lớn, nhìn ra sông qua lam. Nhà sự kiện có lối riêng ở đầu Nam, chạy được ngoài giờ.")],
    kc: { he: "Lõi cột bê tông lưới 8 m trong phạm vi tầng 1, cột thẳng từ móng lên mái. Mỗi bậc nhô 3 m do dàn thép cao một tầng nằm trong tường bao tầng 2 và tầng 3 gánh, neo vào hàng cột trong.", nhip: "8 m; nhà sự kiện 16 m", cx: "3 m mỗi bậc (6 m so với chân tầng 1), có dàn cao một tầng" },
    qa: [["Tầng trên nặng hơn tầng dưới, có lật không?", "Không, vì nhà nhô đều ra bốn phía nên trọng tâm vẫn nằm giữa lõi cột. Mỗi bậc chỉ nhô 3 m và có dàn cao một tầng trong tường bao, giống cách gánh hai đầu đòn gánh."], ["Tầng 1 nhỏ có đủ chỗ làm sảnh?", "Tầng 1 khoảng 450 m², đủ sảnh, gửi đồ, kho và vệ sinh. Phần dưới bóng mép nhô và mặt nước là hiên ngoài trời, dùng làm chỗ chờ và triển lãm ngoài giờ."]],
    cut: "Ba tấm foam trắng dày 2,25 cm: 8 × 14 cm, 11 × 17 cm, 14 × 19 cm, dán chồng lên nhau cho đều tâm. Mặt nước: mica xanh mỏng. Ba khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[22, 46, 13.95, "Khối chính · Ba bậc ngược tỏa bóng", 1], [30, 77, 7.45, "Khối phụ · Nhà sự kiện", 2], [10, 79, 4.95, "Khối phụ · Kho, kỹ thuật", 2], [31, 17, 4.95, "Khối phụ · Cà phê quảng trường", 2], [34, 46, 0.3, "Mặt nước dưới bóng"]],
    build() {
      const T1 = [F1(14, 32, 16, 10, 0, "glass", "A", FU, M), F1(14, 42, 16, 9, 0, "sheet", "E", FU, M), F1(14, 51, 16, 9, 0, "sheet", "C", FU, M)];
      const T2 = [F1(11, 29, 22, 5, 1, "sheet", "D", FA.doc, M), F1(11, 34, 22, 29, 1, "sheet", "B", FA.doc, M)];
      const T3 = [F1(8, 27, 28, 38, 2, "sheet", "B", FA.doc, M)];
      const hall = B(22, 70, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const kho = [F1(6, 70, 8, 10, 0, "stone", "C", FA.dac, { top: "stoneTop" }), F1(6, 80, 8, 8, 0, "stone", "E", FA.dac, { top: "stoneTop" })];
      const cafe = B(26, 13, 10, 9, 0.45, 4.95, "stone", "A", { fa: FA.cong, fl: 1, top: "grass" });
      const water = [B(8, 21.5, 28, 5, 0, 0.2, "water", "X", M), B(30.6, 32, 7.4, 28, 0, 0.2, "water", "X", M)];
      const st = [...gridCols(T1, [14, 22, 30], [32, 40, 48, 56, 60]).map(c => ({ ...c, z2: 13.95 })),
        ...zig(11, 29, 11, 63, 4.95, 9.45, 8), ...zig(33, 29, 33, 63, 4.95, 9.45, 8), ...zig(11, 29, 33, 29, 4.95, 9.45, 5), ...zig(11, 63, 33, 63, 4.95, 9.45, 5),
        ...zig(8, 27, 8, 65, 9.45, 13.95, 8), ...zig(36, 27, 36, 65, 9.45, 13.95, 8), ...zig(8, 27, 36, 27, 9.45, 13.95, 6), ...zig(8, 65, 36, 65, 9.45, 13.95, 6),
        ...corners(hall), ...kho.flatMap(corners), ...corners(cafe)];
      return { v: [...T1, ...T2, ...T3, hall, ...kho, cafe, ...water], st };
    }
  });

  /* ---------- 16.2 · Bảo tàng Lò gốm Cảnh Đức Trấn: cụm vòm gạch ---------- */
  I7.push({
    id: "vn2", fam: "vn", code: "16.2", name: "Cụm vòm gạch so le", rule: "Lặp lại có biến tấu: cùng bề rộng vòm, khác chiều dài và độ cao",
    tag: "Bốn nhà vòm gạch rộng 10 m dài ngắn, cao thấp khác nhau, xếp so le, giữa là các hẻm và sân nhỏ",
    ref: {
      name: "Bảo tàng Lò gốm Ngự Cảnh Đức Trấn (Jingdezhen Imperial Kiln Museum)", by: "Studio Zhu-Pei", year: "2020", place: "Cảnh Đức Trấn, Giang Tây, Trung Quốc",
      award: "Giải lớn Brick Award 2022 và giải hạng mục Sharing Public Spaces; AZ Awards 2021", url: "https://brickaward.com/Winners/2022/BA22-Category-Winner-Sharing-public-spaces-Jingdezhen-Imperial-Kiln-Museum.html",
      what: "Tám vòm gạch hình parabol dài ngắn, cao thấp khác nhau đặt cạnh nhau, có vòm trên mặt đất, có vòm âm xuống đất, xen giữa là sân nhỏ. Gạch lò cũ được dùng lại cùng gạch mới.",
      take: "Mượn cách lặp một tiết diện vòm rồi đổi chiều dài, độ cao và vị trí để cụm nhà vừa đồng bộ vừa so le. Vòm ở đây đặt trên hai tầng tường gạch để đủ sàn, trục vòm chạy theo hướng Bắc – Nam để gió hè từ đầu Nam thổi dọc lòng vòm."
    },
    story: "Lò gốm Cảnh Đức Trấn là những đường hầm gạch cong. Bảo tàng ở đó lấy chính hình lò làm nhà: nhiều vòm gạch cạnh nhau, mỗi vòm một độ dài. Ở 46 Bạch Đằng, bốn nhà vòm rộng 10 m, cao một đến ba tầng, chạy dọc khu đất, so le nhau về đầu Bắc và đầu Nam, cao thấp khác nhau. Giữa các vòm là hẻm 2 m và sân nhỏ, như những khe giữa các lò. Dãy kho và nhà sự kiện là khối phẳng, thấp, tối màu.",
    why: [W("Quy luật hình khối", "Lặp lại có biến tấu: bốn vòm cùng bề rộng 10 m và cùng vật liệu gạch, nhưng dài 14,5–44 m và đỉnh từ +8,95 đến +18,95 m. Mái vòm làm mô hình trắng không còn là hộp chữ nhật."),
      W("Khối chính – khối phụ", "Khối chính là cụm bốn vòm gạch, khoảng 83% sàn, vòm Tây ba tầng cao nhất +18,95 m. Hai khối phụ mái bằng, ốp đá tối: dãy kho, kỹ thuật một tầng sát lối Tây và nhà sự kiện +7,45 m ở đầu Nam."),
      W("Nắng và chói", "Mái vòm dày bằng gạch giữ mát. Mặt sông nhìn Đông Đông Bắc của các vòm có lam đứng; mặt Trần Phú đặc. Hai đầu vòm phía Bắc là kính lấy sáng tán xạ, đầu Nam có mái đua."),
      W("Gió và mưa", "Trục vòm chạy Bắc – Nam nên gió Đông Nam mùa hè vào từ đầu Nam đi dọc lòng vòm. Hẻm 2 m giữa các vòm cũng là kênh gió. Mưa gió mùa Đông Bắc trôi theo mái cong xuống máng ở chân vòm."),
      W("Công năng", "Vòm Tây cao nhất là phòng đọc ba tầng, như một lò gốm đứng. Vòm giữa dài nhất: tầng 1 sảnh, phòng chuyên đề, vệ sinh; tầng 2 đọc mở. Vòm nhỏ ở đầu Bắc là cà phê sát quảng trường. Vòm ngắn ở đầu Nam là khu thiếu nhi.")],
    kc: { he: "Mỗi nhà vòm có hai tường gạch chịu lực dọc hai bên, sàn tầng 2 bê tông gác lên tường. Mái là vòm gạch hoặc vòm bê tông ốp gạch, có thanh giằng thép ở chân vòm mỗi 8 m để triệt lực xô ngang.", nhip: "10 m (vòm); nhà sự kiện 15 m", cx: "Không" },
    qa: [["Vòm có đẩy tường ra ngoài không?", "Có lực xô ngang ở chân vòm. Mỗi 8 m có một thanh giằng thép nối hai chân vòm, giống thanh giằng của vì kèo, nên tường chỉ chịu lực đứng."], ["Hẻm 2 m giữa các vòm có tối, có ẩm không?", "Hẻm hở hai đầu Bắc – Nam nên gió hè thổi suốt. Đáy hẻm lát gạch thoáng và có rãnh thoát nước chung với máng chân vòm."]],
    cut: "Mỗi vòm: hai thanh foam làm tường cao 6,75 cm (vòm ba tầng), 4,5 cm (vòm hai tầng) hoặc 2,25 cm, mái là bìa uốn cong đường kính 5 cm. Dán giấy màu gạch. Hai khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[18, 38, 18.95, "Khối chính · Cụm vòm gạch so le", 1], [9, 40, 4.95, "Khối phụ · Dãy kho, kỹ thuật", 2], [33, 82, 7.45, "Khối phụ · Nhà sự kiện", 2], [30, 21, 8.95, "Vòm cà phê"], [18, 69, 8.95, "Vòm thiếu nhi"]],
    build() {
      const C = "ribbon", fa = FA.doc, R = { ...M, top: "ribbon" };
      const v1 = [0, 1, 2].map(k => F1(13, 22, 10, 32, k, C, "B", fa, M));
      const v2 = [F1(25, 30, 10, 18, 0, C, "A", fa, M), F1(25, 48, 10, 12, 0, C, "D", fa, M), F1(25, 60, 10, 14, 0, C, "E", fa, M), F1(25, 30, 10, 44, 1, C, "B", fa, M)];
      const v3 = [F1(25, 13.5, 10, 14.5, 0, C, "A", FA.cong, M)];
      const v4 = [F1(13, 58, 10, 22, 0, C, "B", fa, M)];
      const caps = [V(13, 22, 10, 32, 13.95, 5, "y", C, R), V(25, 30, 10, 44, 9.45, 4, "y", C, R), V(25, 13.5, 10, 14.5, 4.95, 4, "y", C, R), V(13, 58, 10, 22, 4.95, 4, "y", C, R)];
      const spine = [F1(6, 20, 6, 30, 0, "stone", "C", FA.dac, { top: "stoneTop" }), F1(6, 50, 6, 14, 0, "stone", "E", FA.dac, { top: "stoneTop" })];
      const hall = B(26, 76, 15, 12, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = [];
      for (const [x, y, d, zt] of [[13, 22, 32, 13.95], [25, 30, 44, 9.45], [25, 13.5, 14.5, 4.95], [13, 58, 22, 4.95]]) {
        st.push(wall(x, y, 0.4, d, 0.45, zt), wall(x + 9.6, y, 0.4, d, 0.45, zt));
        for (const yy of range(y + 4, y + d - 2, 8)) st.push(seg([x, yy, zt], [x + 10, yy, zt]));
      }
      st.push(...corners(hall), ...spine.flatMap(corners));
      return { v: [...v1, ...v2, ...v3, ...v4, ...caps, ...spine, hall], st };
    }
  });

  /* ---------- 16.3 · Gifu Media Cosmos: mái gỗ gợn sóng ---------- */
  const wave = y => 11.95 + 2 * Math.sin(2 * Math.PI * (y - 22) / 22);
  I7.push({
    id: "vn3", fam: "vn", code: "16.3", name: "Mái gỗ gợn sóng, đèn trời", rule: "Nhịp sóng liên tục trên một mặt bằng gọn",
    tag: "Một khối hai tầng gọn, tầng trên phủ mái gỗ lượn hai con sóng, năm phễu đèn trời nhô lên khỏi mái",
    ref: {
      name: "Minna no Mori – Gifu Media Cosmos", by: "Toyo Ito & Associates", year: "2015", place: "Gifu, Nhật Bản",
      award: "", url: "https://www.arup.com/projects/gifu-media-cosmos",
      what: "Thư viện nằm dưới một mái lưới gỗ uốn lượn liên tục. Mười một quả cầu lớn bằng vải treo dưới mái chia các khu đọc và dẫn ánh sáng, gió từ mái xuống; thiết kế thụ động giúp giảm khoảng 40% năng lượng.",
      take: "Mượn mái lượn sóng phủ trọn tầng đọc và các phễu lấy sáng, thông gió đặt ở giữa mỗi khu đọc. Mái lượn được chia thành 10 dải 4,4 m, dải nào cũng phẳng nên làm được bằng vì kèo gỗ thẳng."
    },
    story: "Gifu Media Cosmos chỉ là một khối hai tầng đơn giản, nhưng cả tầng trên nằm dưới một mái gỗ gợn sóng, nhìn từ xa như mặt hồ nổi gió. Ở 46 Bạch Đằng, mái sóng chạy dọc khu đất theo hướng Bắc – Nam, hai con sóng cao thấp từ +10 m đến +14 m. Ở đáy mỗi khu đọc có một phễu đèn trời nhô lên khỏi mái, ban ngày đón sáng, ban đêm thành đèn lồng nhìn từ bờ sông.",
    why: [W("Quy luật hình khối", "Nhịp sóng liên tục: một mặt bằng chữ nhật gọn nhưng đường mái lên xuống hai lần, cộng năm phễu đèn trời. Mô hình trắng đọc ngay được con sóng, thầy không thấy hộp chữ nhật."),
      W("Khối chính – khối phụ", "Khối chính là nhà hai tầng dưới mái sóng, khoảng 90% sàn, đỉnh sóng +13,85 m. Hai khối phụ nhỏ, mái bằng, ốp đá tối: nhà sự kiện +7,45 m ở đầu Nam và quán cà phê bên quảng trường Bắc."),
      W("Nắng và chói", "Phễu đèn trời lấy sáng từ trên xuống nên chỗ đọc không bị chói. Mặt sông nhìn Đông Đông Bắc có lam đứng; mặt Trần Phú đặc; đầu Nam nhìn Nam Đông Nam có mái đua; đầu Bắc kính lấy sáng tán xạ."),
      W("Gió và mưa", "Không khí nóng dâng lên chỗ cao của sóng và thoát qua phễu, gió Đông Nam từ đầu Nam được kéo vào thay thế. Mái sóng thoát nước về bốn máng ở đáy sóng, tránh nước tạt mặt sông khi có gió mùa Đông Bắc."),
      W("Công năng", "Tầng 1: sảnh ở đầu Bắc, kho và nghiệp vụ dọc phía Tây, đọc mở và thiếu nhi phía sông. Tầng 2 là một phòng đọc lớn liền khối dưới mái sóng, năm phễu chia năm khu đọc; dải đầu Bắc là phòng chuyên đề.")],
    kc: { he: "Tầng 1 khung bê tông lưới 7 × 7,3 m. Tầng 2 cột gỗ hoặc thép mảnh đỡ mái gỗ; mỗi dải mái 4,4 m là một mặt phẳng nghiêng gác lên hai dầm, nên mái sóng ghép từ các tấm phẳng, không cần uốn gỗ.", nhip: "7 m; nhà sự kiện 16 m", cx: "Không" },
    qa: [["Mái sóng có khó thi công không?", "Không, vì sóng được chia thành 10 dải phẳng, mỗi dải là một mái một dốc bình thường. Chỗ các dải gặp nhau là dầm gỗ ghép, nhìn từ xa vẫn thấy mềm như sóng."], ["Nước mưa đọng ở đáy sóng thì sao?", "Đáy sóng có máng inox chạy ngang hết bề rộng nhà, dốc về hai đầu, nối ống đứng trong cột. Máng đặt dưới các phễu đèn nên không chắn sáng."]],
    cut: "Tầng 1: foam trắng 14 × 22 × 2,25 cm. Tầng 2: 10 thanh foam 14 × 2,2 cm, mỗi thanh cắt vát theo chiều cao 2,5–4,5 cm cho liền thành sóng. Phễu: 5 nón giấy can. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[24, 28, 13.85, "Khối chính · Mái gỗ gợn sóng, đèn trời", 1], [30, 78, 7.45, "Khối phụ · Nhà sự kiện", 2], [31, 16.5, 4.95, "Khối phụ · Cà phê quảng trường", 2], [24, 44, 13.5, "Phễu đèn trời"]],
    build() {
      const T1 = [F1(10, 22, 28, 7, 0, "glass", "A", { N: "kinh", E: "lam", S: "dua", W: "dac" }, M), F1(10, 29, 10, 22, 0, "sheet", "C", FA.dac, M), F1(10, 51, 10, 15, 0, "sheet", "E", FA.doc, M), F1(20, 29, 18, 37, 0, "sheet", "B", FA.doc, M)];
      const T2 = [];
      for (let i = 0; i < 10; i++) {
        const y = 22 + 4.4 * i, h1 = wave(y), h2 = wave(y + 4.4), up = h2 >= h1;
        T2.push(SH(10, y, 28, 4.4, 4.95, Math.min(h1, h2), Math.max(h1, h2), up ? "+y" : "-y", "deck", i === 0 ? "D" : "B", { fa: FA.doc, fl: 1, top: "deck", ...M }));
      }
      const funnels = [[17, 27.5], [31, 33], [24, 44], [17, 52.8], [31, 60]].map(([x, y]) => FR(x - 2, y - 2, 4, 4, wave(y) - 0.4, wave(y) + 1.6, 0.45, "lamp", { top: "lampTop", ...M }));
      const hall = B(22, 72, 16, 12, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const cafe = B(26, 12, 10, 9, 0.45, 4.95, "stone", "A", { fa: FA.cong, fl: 1, top: "grass" });
      const st = [];
      for (const x of [10, 17, 24, 31, 38]) for (const y of range(22, 66, 44 / 6)) st.push(col(x, y, 0, wave(y) - 0.3));
      st.push(...corners(hall), ...corners(cafe));
      return { v: [...T1, ...T2, ...funnels, hall, cafe], st };
    }
  });

  /* ---------- 16.4 · Town House Kingston: hàng cột cao, sân vườn bậc ---------- */
  I7.push({
    id: "vn4", fam: "vn", code: "16.4", name: "Hàng cột cao, sân vườn bậc về sông", rule: "Khung trật tự bọc khối lùi bậc",
    tag: "Hàng cột cao ba tầng dọc mặt sông, phía sau là ba tầng lùi bậc thành ba sân vườn treo, có giàn dầm nối cột với nhà",
    ref: {
      name: "Town House, Đại học Kingston", by: "Grafton Architects", year: "2020", place: "Kingston upon Thames, London, Anh",
      award: "RIBA Stirling Prize 2021; Giải Mies van der Rohe (giải kiến trúc đương đại của EU) 2022", url: "https://www.archpaper.com/2022/04/grafton-architects-kingston-town-house-in-london-wins-mies-van-der-rohe-award-in-a-first-for-a-university-building/",
      what: "Một hàng cột sâu, cao sáu tầng chạy dọc mặt phố, cho bóng râm và chỗ trú; phía trên là ba bậc sân vườn đổ xuống như vườn treo. Mặt đứng mở ở các tầng dưới, kín và nhiều bóng hơn ở các tầng thư viện phía trên.",
      take: "Mượn hàng cột cao làm tấm lam khổng lồ cho mặt sông và các sân vườn lùi bậc phía sau. Ở đây chỉ ba tầng, hàng cột cách nhà 2,5 m, nối với nhà bằng giàn dầm ở mỗi cao độ sàn."
    },
    story: "Town House ở Kingston là một nhà học tập mở ra phố bằng một hàng cột rất sâu, sau hàng cột là sân vườn treo bậc lên. Ở 46 Bạch Đằng, hàng cột cao +13,95 m chạy 36 m dọc mặt sông, như một hàng hiên khổng lồ nhìn xuống bậc thang Bạch Đằng. Sau hàng cột, ba tầng đọc lùi dần về phía Trần Phú, mỗi tầng chừa một sân cỏ. Giàn dầm nối hàng cột với nhà ở ba cao độ, che nắng cho các sân.",
    why: [W("Quy luật hình khối", "Khung trật tự bọc khối lùi bậc: hàng cột thẳng đều, đỉnh bằng nhau, đứng trước một khối bậc thang. Mô hình trắng đọc được hai lớp: lớp cột mảnh phía trước và khối đặc lùi bậc phía sau."),
      W("Khối chính – khối phụ", "Khối chính là nhà đọc lùi bậc cùng hàng cột, khoảng 84% sàn, cao +13,95 m. Hai khối phụ thấp, ốp đá tối: dãy kho một tầng sát lối Tây và nhà sự kiện +7,45 m ở đầu Nam."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc: nắng sáng sớm bị hàng cột và giàn dầm cắt thành từng vệt, các mặt kính lùi sau 2,5–10,5 m nên không chói. Mặt Trần Phú đặc. Đầu Nam có mái đua."),
      W("Gió và mưa", "Ba sân vườn treo mở về phía sông và đầu Nam, đón gió Đông Nam mùa hè. Mưa gió mùa Đông Bắc tạt vào mặt sông thì hàng hiên dưới giàn dầm là chỗ trú dọc suốt mặt nhà."),
      W("Công năng", "Tầng 1: sảnh dọc đầu Bắc, vệ sinh, kỹ thuật phía Tây, đọc mở và thiếu nhi phía sông. Tầng 2: phòng chuyên đề và đọc mở, ra sân vườn thứ nhất. Tầng 3: đọc yên tĩnh, ra sân thứ hai; mái tầng 3 là sân thứ ba.")],
    kc: { he: "Nhà là khung bê tông lưới 8 m, tầng trên chỉ lùi vào so với tầng dưới. Hàng cột phía sông là cột bê tông 0,6 × 0,6 m cách nhau 4 m, nối với nhà bằng dầm ở ba cao độ sàn nên không bị đổ ngang.", nhip: "8 m; dầm giàn 2,2–12,2 m; nhà sự kiện 16 m", cx: "Không" },
    qa: [["Hàng cột cao 13,5 m đứng riêng có bị đổ?", "Không đứng riêng: ở mỗi cao độ sàn có dầm nối hàng cột với nhà, cột chỉ cao 4,5 m giữa hai dầm. Đỉnh cột có một dầm chạy suốt giằng cả hàng."], ["Hàng cột có che hết view sông không?", "Cột chỉ 0,6 m, cách nhau 4 m, nên nhìn từ trong ra vẫn thấy sông qua 85% bề rộng. Chính hàng cột làm khung cho cảnh sông."]],
    cut: "Ba tấm foam trắng dày 2,25 cm cắt 13 × 18 cm, 11 × 18 cm, 8 × 18 cm, dán lùi bậc về một mép. Hàng cột: 10 que vuông 3 mm cao 7 cm, dầm đỉnh que 3 mm. Giàn dầm: que tre 2 mm. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[20, 44, 13.95, "Khối chính · Hàng cột cao, sân vườn bậc", 1], [9, 44, 4.95, "Khối phụ · Dãy kho", 2], [22, 75, 7.45, "Khối phụ · Nhà sự kiện", 2], [40.5, 44, 13.95, "Hàng cột cao 13,5 m"], [31, 50, 9.45, "Sân vườn treo"]],
    build() {
      const g = { ...M, top: "grass" };
      const T1 = [F1(12, 26, 26, 9, 0, "glass", "A", FA.doc, M), F1(12, 35, 8, 27, 0, "sheet", "E", FA.doc, M), F1(20, 35, 18, 27, 0, "sheet", "B", FA.doc, g)];
      const T2 = [F1(12, 26, 22, 5, 1, "sheet", "D", FA.doc, g), F1(12, 31, 22, 31, 1, "sheet", "B", FA.doc, g)];
      const T3 = [F1(12, 26, 16, 36, 2, "sheet", "B", FA.doc, g)];
      const spine = F1(6, 26, 6, 36, 0, "stone", "C", FA.dac, { top: "stoneTop" });
      const hall = B(14, 68, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const ys = range(26, 62, 4), cols = [], beams = [];
      for (const y of ys) {
        cols.push(B(40.2, y - 0.3, 0.6, 0.6, 0, 13.95, "sheet", "X", M));
        for (const [x0, z] of [[38, 4.95], [34, 9.45], [28, 13.95]]) beams.push(B(x0, y - 0.15, 40.2 - x0, 0.3, z - 0.5, z, "sheet", "X", M));
      }
      beams.push(B(40.2, 25.7, 0.6, 36.6, 13.35, 13.95, "sheet", "X", M));
      const st = [...gridCols([...T1, ...T2, ...T3], [12, 20, 28, 36], range(26, 62, 9)), ...ys.map(y => col(40.5, y, 0, 13.95)), ...corners(spine), ...corners(hall)];
      return { v: [...T1, ...T2, ...T3, spine, hall, ...cols, ...beams], st };
    }
  });

  /* ---------- 16.5 · Magdalene New Library: lưới tháp gió, đèn mái bốn hồi ---------- */
  I7.push({
    id: "vn5", fam: "vn", code: "16.5", name: "Lưới tháp gió, đèn mái bốn hồi", rule: "Lặp lại theo lưới, điểm nhấn trên mái",
    tag: "24 tháp gió gạch đứng theo lưới 8 m nhô cao trên mái, giữa mỗi bốn tháp là một đèn mái kính bốn đầu hồi",
    ref: {
      name: "Thư viện mới, Magdalene College", by: "Niall McLaughlin Architects", year: "2022 (năm đoạt giải)", place: "Cambridge, Anh",
      award: "RIBA Stirling Prize 2022", url: "https://www.cibsejournal.com/case-studies/on-the-same-page-new-library-at-magdalene-college/",
      what: "Các ống khói gạch chịu lực đứng theo lưới; giữa mỗi bốn ống khói là một đèn mái gồm bốn đầu hồi kính, đưa ánh sáng vào sâu trong nhà. Ống khói hút khí nóng ra ngoài, gió tươi vào qua các cửa khe cạnh chỗ ngồi đọc.",
      take: "Mượn lưới tháp gió gạch vừa chịu lực vừa thông gió, rất hợp khí hậu nóng ẩm Đà Nẵng. Tháp nhô đều lên +17,95 m trên hai cao độ mái khác nhau, mái nào cũng có đèn bốn hồi."
    },
    story: "Thư viện Magdalene ở Cambridge không dùng máy lạnh: những ống khói gạch đứng theo lưới hút khí nóng lên, đèn mái kính giữa các ống khói đưa sáng xuống bàn đọc. Ở 46 Bạch Đằng, 24 tháp gió gạch đứng theo lưới 8 m, nhô lên khỏi mái như một rừng tháp. Khối đọc ba tầng ở phía Tây, hai tầng ở phía sông, nên đèn mái nằm ở hai cao độ. Từ bên kia sông nhìn sang thấy một hàng tháp đều nhau trên nền mái cao thấp.",
    why: [W("Quy luật hình khối", "Lặp lại theo lưới: tháp đều nhau, đỉnh bằng nhau +17,95 m, đứng trên hai bậc mái +9,45 và +13,95. Đèn mái kính bốn hồi lặp ở mỗi ô lưới. Khối thô vẫn đọc được nhịp tháp và mái răng kính, không phải hộp trơn."),
      W("Khối chính – khối phụ", "Khối chính là nhà đọc có tháp gió, khoảng 85% sàn, mái +13,95 m. Hai khối phụ thấp, mái bằng, ốp đá tối, không có tháp: dãy kho sát lối Tây và nhà sự kiện +7,45 m ở đầu Nam."),
      W("Nắng và chói", "Đèn mái kính bốn hồi lấy sáng từ trên, có cạnh quay về mọi hướng nên ánh sáng đều, không chói; ô kính hướng Tây có lam. Mặt sông nhìn Đông Đông Bắc có lam đứng; mặt Trần Phú đặc."),
      W("Gió và mưa", "Tháp gió gạch nóng lên dưới nắng, hút khí nóng trong nhà ra ở đỉnh +17,95 m; gió Đông Nam từ đầu Nam vào qua cửa khe thay thế. Đỉnh tháp có mũ che mưa nên mưa gió mùa Đông Bắc không lọt vào."),
      W("Công năng", "Tầng 1: sảnh dọc đầu Bắc, vệ sinh, phòng chuyên đề phía Tây, đọc mở phía sông. Tầng 2 và 3 là phòng đọc liền khối giữa các tháp; mỗi ô lưới dưới đèn mái là một cụm bàn đọc.")],
    kc: { he: "Tháp gió là trụ gạch chịu lực 1,4 × 1,4 m rỗng lõi, đứng theo lưới 8 × 8 m, đỡ sàn bê tông và đèn mái. Tầng trên chỉ lùi vào theo lưới.", nhip: "8 m; nhà sự kiện 16 m", cx: "Không" },
    qa: [["Tháp gió có thật sự làm mát được?", "Tháp cao hơn mái 4–8,5 m, khí nóng trong nhà nhẹ hơn nên bốc lên và thoát ở đỉnh tháp, kéo gió mát vào từ cửa khe sát sàn. Thư viện Magdalene dùng đúng cách này, không cần máy lạnh cho tầng đọc."], ["Trụ gạch có đủ chịu lực ba tầng?", "Trụ gạch rỗng 1,4 × 1,4 m dày 0,35 m đỡ được sàn bê tông nhịp 8 m ba tầng; bên trong lõi có thể đặt thêm cột thép nhỏ nếu cần."]],
    cut: "Khối đọc: foam trắng 12 × 20 × 4,5 cm, phần ba tầng dán thêm tấm 8 × 16 × 2,25 cm. Tháp: 24 thanh gỗ vuông 7 mm cao 8,75 cm. Đèn mái: 15 cặp mái hai dốc bằng mica trong cắt chéo nhau.",
    roleOf: () => "p",
    lab: [[20, 40, 13.95, "Khối chính · Lưới tháp gió, đèn mái bốn hồi", 1], [9, 44, 4.95, "Khối phụ · Dãy kho", 2], [22, 74, 7.45, "Khối phụ · Nhà sự kiện", 2], [36, 64, 17.95, "Tháp gió +17,95"]],
    build() {
      const T1 = [F1(12, 24, 24, 10, 0, "glass", "A", FA.doc, M), F1(12, 34, 8, 16, 0, "sheet", "E", FA.doc, M), F1(12, 50, 8, 14, 0, "sheet", "D", FA.doc, M), F1(20, 34, 16, 30, 0, "sheet", "B", FA.doc, M)];
      const T2 = [F1(12, 24, 8, 12, 1, "sheet", "E", FA.doc, M), F1(12, 36, 8, 28, 1, "sheet", "B", FA.doc, M), F1(20, 24, 16, 40, 1, "sheet", "B", FA.doc, M)];
      const T3 = [F1(12, 24, 16, 32, 2, "sheet", "B", FA.doc, M)];
      const spine = F1(6, 24, 6, 40, 0, "stone", "C", FA.dac, { top: "stoneTop" });
      const hall = B(14, 68, 16, 12, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const towers = [], lanterns = [], st = [];
      for (const x of [12, 20, 28, 36]) for (const y of [24, 32, 40, 48, 56, 64]) { towers.push(B(x - 0.7, y - 0.7, 1.4, 1.4, 0.45, 17.95, "ribbon", "X", { top: "ribbon", ...M })); st.push(wall(x - 0.7, y - 0.7, 1.4, 1.4, 0.45, 17.95)); }
      for (const x of [12, 20, 28]) for (const y of [24, 32, 40, 48, 56]) {
        const z = x < 28 && y < 56 ? 13.95 : 9.45;
        lanterns.push(GA(x + 1.2, y + 1.2, 5.6, 5.6, z, z + 2.4, "glass", "x", M), GA(x + 1.2, y + 1.2, 5.6, 5.6, z, z + 2.4, "glass", "y", M));
      }
      st.push(...corners(spine), ...corners(hall));
      return { v: [...T1, ...T2, ...T3, spine, hall, ...towers, ...lanterns], st };
    }
  });

  /* ---------- 16.6 · Guggenheim Helsinki (bài thi thắng giải): cụm nhà nhỏ quanh tháp ---------- */
  const shed = (x, y, w, d, k, zone, dir, o = {}) => SH(x, y, w, d, Z(k), Z(k + 1), Z(k + 1) + 2.5, dir, "deck", zone, { fa: FA.doc, fl: 1, top: "deck", ...M, ...o });
  const pav = (x, y, w, d, zones, dir) => zones.map((z, k) => k < zones.length - 1 ? F1(x, y, w, d, k, "deck", z, FA.doc, M) : shed(x, y, w, d, k, z, dir));
  I7.push({
    id: "vn6", fam: "vn", code: "16.6", name: "Làng nhà nhỏ quanh tháp ngắm sông", rule: "Cụm nhỏ quanh một điểm cao, bất đối xứng",
    tag: "Bảy nhà gỗ nhỏ mái một dốc nghiêng mỗi nhà một hướng, nối bằng hành lang kính, neo bởi một tháp ngắm năm tầng bên mép sông",
    ref: {
      name: "Art in the City – phương án thắng cuộc thi thiết kế Bảo tàng Guggenheim Helsinki", by: "Moreau Kusunoki Architectes", year: "2015", place: "Bờ cảng Helsinki, Phần Lan (phương án dự thi)",
      award: "Giải nhất cuộc thi thiết kế Guggenheim Helsinki 2015, chọn từ hơn 1.700 bài dự thi", url: "https://www.dezeen.com/2015/06/23/moreau-kusunoki-architectes-wins-guggenheim-helsinki-competition/",
      what: "Một cụm nhà triển lãm nhỏ cỡ nhà ở, mỗi nhà đặt theo lưới đường phố, nối với nhau, được neo bởi một tháp ngắm cao như ngọn hải đăng ở mép bến cảng.",
      take: "Mượn cách chia công trình lớn thành nhiều nhà nhỏ vừa tầm người, giữ một tháp cao làm điểm nhớ bên sông. Nhà nào cũng đặt thẳng theo lưới khu đất, chỉ mái một dốc nghiêng khác hướng để cụm nhà sinh động."
    },
    story: "Phương án thắng cuộc thi Guggenheim Helsinki không làm một bảo tàng to mà làm một làng nhà nhỏ bên bến cảng, có một tháp ngắm như ngọn hải đăng. Ở 46 Bạch Đằng, bảy nhà gỗ một đến ba tầng đứng so le giữa các sân nhỏ, mái một dốc mỗi nhà nghiêng một hướng. Hành lang kính một tầng nối các nhà. Ở mép sông phía Nam là tháp ngắm năm tầng cao +22,95 m, đứng trên tháp nhìn thấy cả cầu Rồng và cửa sông.",
    why: [W("Quy luật hình khối", "Cụm nhỏ quanh một điểm cao: nhiều nhà vừa tầm người, cao thấp và mái nghiêng khác nhau, tạo vẻ hơi lộn xộn; một tháp cao duy nhất giữ trật tự cho cả cụm. Nhà nào cũng thẳng lưới nên kết cấu đơn giản."),
      W("Khối chính – khối phụ", "Khối chính là làng nhà gỗ và tháp ngắm, cùng vật liệu gỗ sáng, khoảng 82% sàn, tháp cao +22,95 m. Hai khối phụ mái bằng, ốp đá tối: kho sách hai tầng ở giữa phía Tây và nhà sự kiện +7,45 m ở đầu Nam."),
      W("Nắng và chói", "Nhà nhỏ nên phòng nào cũng gần cửa sổ. Mặt sông nhìn Đông Đông Bắc của mỗi nhà có lam đứng; mặt Trần Phú đặc; đầu Bắc kính lấy sáng tán xạ; đầu Nam có mái đua. Các nhà che bóng cho nhau và cho sân giữa."),
      W("Gió và mưa", "Khe sân giữa các nhà mở về đầu Nam, gió Đông Nam mùa hè luồn qua cả cụm. Mái một dốc thoát nước nhanh khi mưa gió mùa Đông Bắc; hành lang kính cho đi lại không ướt."),
      W("Công năng", "Mỗi nhà một chức năng: hai nhà đón tiếp và cà phê ở đầu Bắc, nhà vệ sinh, kỹ thuật, ba nhà đọc, nhà thiếu nhi có phòng chuyên đề ở trên. Tháp là phòng đọc ngắm sông, tầng trên cùng là chòi ngắm.")],
    kc: { he: "Mỗi nhà khung gỗ hoặc thép nhẹ nhịp 10–12 m, cột ở góc và giữa cạnh. Tháp là lõi bê tông 8 × 8 m. Hành lang kính là khung thép nhẹ gác giữa các nhà.", nhip: "12 m; nhà sự kiện 16 m", cx: "Không" },
    qa: [["Nhiều nhà nhỏ có tốn diện tích đi lại không?", "Hành lang kính nối chỉ khoảng 50 m², vì các nhà đặt sát nhau 2–4 m. Đi giữa các nhà lại được nhìn sân và sông, không phải hành lang tối."], ["Tháp 5 tầng 8 × 8 m có đủ thang thoát hiểm?", "Tháp có thang bộ và thang máy trong lõi; mỗi tầng chỉ 64 m², ít người, nên một thang bộ kín đủ. Tầng 1 và 2 của tháp nối với nhà bên cạnh, có thêm lối thoát thứ hai."]],
    cut: "Mỗi nhà: foam trắng cao 2,25–6,75 cm, tầng trên cùng cắt vát làm mái một dốc. Tháp: foam 4 × 4 × 11,25 cm, đỉnh mica. Hành lang: mica trong. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[36, 68, 22.95, "Khối chính · Làng nhà nhỏ quanh tháp ngắm sông", 1], [16, 52, 9.45, "Khối phụ · Kho sách", 2], [22, 83, 7.45, "Khối phụ · Nhà sự kiện", 2], [30, 37, 16.45, "Mái một dốc mỗi nhà một hướng"]],
    build() {
      const v = [
        ...pav(8, 14, 10, 12, ["A", "B"], "+x"), ...pav(20, 16, 12, 10, ["A"], "-y"), ...pav(8, 30, 12, 12, ["E", "E"], "+y"),
        ...pav(24, 30, 12, 14, ["B", "B", "B"], "-x"), ...pav(26, 48, 12, 12, ["B", "B", "B"], "+y"), ...pav(12, 62, 12, 12, ["B", "D"], "+x")];
      const tower = [0, 1, 2, 3, 4].map(k => F1(32, 64, 8, 8, k, "deck", "B", FA.doc, M));
      const top = B(32.5, 64.5, 7, 7, 22.95, 25.45, "glass", "X", { ...M, op: 0.6 });
      const kho = [F1(10, 46, 12, 12, 0, "stone", "C", FA.dac, { top: "stoneTop" }), F1(10, 46, 12, 12, 1, "stone", "C", FA.dac, { top: "stoneTop" })];
      const hall = B(14, 77, 16, 12, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const FL = { N: "kinh", E: "lam", S: "dua", W: "lam" };
      const links = [B(10, 26, 3, 4, 0.45, 4.95, "glass", "L", { fa: FL, ...M }), B(20, 34, 4, 4, 0.45, 4.95, "glass", "L", { fa: FL, ...M }), B(30, 44, 3, 4, 0.45, 4.95, "glass", "L", { fa: FL, ...M }), B(34, 60, 3, 4, 0.45, 4.95, "glass", "L", { fa: FL, ...M })];
      const boxes = [[8, 14, 10, 12, 11.95], [20, 16, 12, 10, 7.45], [8, 30, 12, 12, 11.95], [24, 30, 12, 14, 16.45], [26, 48, 12, 12, 16.45], [12, 62, 12, 12, 11.95]];
      const st = [...boxes.flatMap(([x, y, w, d, z]) => [[x, y], [x + w, y], [x + w, y + d], [x, y + d], [x + w / 2, y], [x + w / 2, y + d]].map(([a, b]) => col(a, b, 0, z - 2.5))),
        wall(32, 64, 8, 0.3, 0, 22.95), wall(32, 71.7, 8, 0.3, 0, 22.95), wall(32, 64, 0.3, 8, 0, 22.95), wall(39.7, 64, 0.3, 8, 0, 22.95), ...kho.flatMap(corners), ...corners(hall)];
      return { v: [...v, ...tower, top, ...kho, hall, ...links], st };
    }
  });

  /* ---------- 16.7 · Loa Thành 2025: mặt đất thứ hai ---------- */
  I7.push({
    id: "vn7", fam: "vn", code: "16.7", name: "Mặt đất thứ hai, khối đọc nổi", rule: "Tương phản nằm – đứng: nền xanh nằm thấp, một khối nổi trên cột",
    tag: "Một nền nhà một tầng mái cỏ đi lên được nối liền bậc thang Bạch Đằng, trên đó một khối đọc hai tầng nổi trên hàng cột cao 4,5 m",
    ref: {
      name: "Bảo tàng Di sản Cố đô Huế (đồ án tốt nghiệp)", by: "Sinh viên Đặng Duy Khoa, Trường Đại học Kiến trúc TP.HCM", year: "2025", place: "Huế, Việt Nam (đồ án)",
      award: "Giải Nhất Giải thưởng Loa Thành 2025", url: "https://www.sggp.org.vn/2-sinh-vien-tphcm-gianh-giai-nhat-giai-thuong-loa-thanh-nam-2025-post824661.html",
      what: "Khu trưng bày được hạ xuống dưới mặt đất, phía trên đặt một khối kiến trúc; hệ mái xanh trở thành một mặt đất thứ hai nối công trình với các di tích chung quanh.",
      take: "Mượn ý mái xanh là mặt đất thứ hai cho người đi lên được, cùng một khối duy nhất đặt phía trên. Không hạ ngầm vì khu đất sát sông Hàn dễ ngập; thay vào đó nền nhà đặt ngang mặt đất và mái cỏ nối thẳng với bậc thang Bạch Đằng."
    },
    story: "Đồ án đoạt giải Nhất Loa Thành 2025 hạ khu trưng bày xuống đất và biến mái thành một mặt đất mới. Ở 46 Bạch Đằng, bậc thang Bạch Đằng đã cao 5,5 m; phương án cho bậc thang leo tiếp thêm 4,5 m lên một mái cỏ rộng phủ gần hết khu đất. Đó là mặt đất thứ hai, ai cũng lên ngồi ngắm sông được, kể cả ngoài giờ. Trên mặt đất ấy, khối đọc hai tầng đứng trên hàng cột cao 4,5 m, nên mái cỏ chạy luồn dưới khối. Hai sân trũng khoét vào nền đưa sáng xuống tầng dưới.",
    why: [W("Quy luật hình khối", "Tương phản nằm – đứng: một tấm nền xanh nằm rộng, thấp, liền với bậc thang; một khối trắng gọn nổi lên trên cột. Hai sân trũng khoét vào nền. Mô hình trắng đọc ra ba lớp: nền, khoảng rỗng dưới cột, khối nổi."),
      W("Khối chính – khối phụ", "Khối chính là nền mái cỏ cùng khối đọc nổi, khoảng 92% sàn, đỉnh +18,45 m. Hai khối phụ nhỏ, ốp đá tối: nhà sự kiện +7,45 m ở đầu Nam và quán trà nhỏ đứng trên mái cỏ."),
      W("Nắng và chói", "Mái cỏ dày giữ mát cho tầng dưới. Khối đọc nổi: mặt sông nhìn Đông Đông Bắc có lam đứng, mặt Trần Phú đặc, đầu Bắc kính lấy sáng tán xạ. Khoảng rỗng dưới khối là chỗ ngồi râm mát giữa trưa."),
      W("Gió và mưa", "Gió Đông Nam mùa hè thổi qua khoảng rỗng cao 4,5 m dưới khối đọc và qua mặt mái cỏ. Hai sân trũng giữ gió mát cho tầng dưới. Nền đặt ngang mặt đất, không hạ ngầm, nên mưa lớn mùa gió Đông Bắc thoát thẳng ra sông."),
      W("Công năng", "Tầng nền: sảnh dọc đầu Bắc, kho và nghiệp vụ phía Tây, đọc mở, thiếu nhi quanh hai sân trũng. Hai lõi thang đưa lên khối nổi: tầng dưới phòng chuyên đề và đọc mở, tầng trên đọc yên tĩnh nhìn sông.")],
    kc: { he: "Nền nhà khung bê tông lưới 8 m, mái là sàn bê tông dày đỡ lớp đất trồng cỏ. Khối đọc nổi gác trên 15 cột bê tông chạy thẳng từ móng, xuyên qua nền nhà, cộng hai lõi thang. Bậc cỏ phía sông là đất đắp có tường chắn.", nhip: "8–10 m; nhà sự kiện 18 m", cx: "Không" },
    qa: [["Vì sao không hạ ngầm như đồ án gốc?", "Khu đất sát sông Hàn, mực nước ngầm cao và mùa mưa dễ ngập. Giữ nền ngang mặt đất, cho bậc thang Bạch Đằng leo thêm 4,5 m lên mái cỏ, vẫn có mặt đất thứ hai mà không phải chống thấm tầng hầm."], ["Mái cỏ cho người lên có nặng quá?", "Đất trồng cỏ dày 0,3–0,4 m cộng người đứng khoảng 10 kN/m², sàn bê tông nhịp 8–10 m đỡ được. Có màng chống thấm, lớp thoát nước và lan can mép mái."]],
    cut: "Nền: foam trắng 13 × 28 × 2,25 cm, khoét hai lỗ 4 × 4 cm, phủ bột cỏ. Bậc cỏ: bìa gấp bậc dài 26 cm. Khối nổi: foam trắng 10 × 16 × 4,5 cm gác trên 15 que tre 3 mm cao 2,25 cm. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[20, 50, 18.45, "Khối chính · Mặt đất thứ hai, khối đọc nổi", 1], [19, 83, 7.45, "Khối phụ · Nhà sự kiện", 2], [29, 25, 9.45, "Khối phụ · Quán trà trên mái cỏ", 2], [38, 48, 2.5, "Bậc cỏ nối bậc thang Bạch Đằng"], [22, 62, 0.3, "Sân trũng"]],
    build() {
      const g = { ...M, top: "grass" };
      const base = [B(8, 20, 26, 10, 0.45, 4.95, "glass", "A", { fa: FA.doc, fl: 1, ...g }),
        B(8, 30, 10, 8, 0.45, 4.95, "sheet", "C", { fa: FA.dac, fl: 1, ...g }), B(26, 30, 8, 8, 0.45, 4.95, "sheet", "B", { fa: FA.doc, fl: 1, ...g }),
        B(8, 38, 10, 20, 0.45, 4.95, "sheet", "C", { fa: FA.dac, fl: 1, ...g }), B(18, 38, 16, 20, 0.45, 4.95, "sheet", "B", { fa: FA.doc, fl: 1, ...g }),
        B(8, 58, 10, 8, 0.45, 4.95, "sheet", "E", { fa: FA.doc, fl: 1, ...g }), B(26, 58, 8, 8, 0.45, 4.95, "sheet", "E", { fa: FA.doc, fl: 1, ...g }),
        B(8, 66, 10, 10, 0.45, 4.95, "sheet", "E", { fa: FA.doc, fl: 1, ...g }), B(18, 66, 16, 10, 0.45, 4.95, "sheet", "B", { fa: FA.doc, fl: 1, ...g })];
      const up = [B(10, 34, 20, 8, 9.45, 13.95, "sheet", "D", { fa: FA.doc, fl: 1, ...M }), B(10, 42, 20, 24, 9.45, 13.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(10, 34, 20, 32, 13.95, 18.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M })];
      const cores = [B(13, 46, 4, 6, 4.95, 9.45, "stone", "X", M), B(23, 54, 4, 6, 4.95, 9.45, "stone", "X", M)];
      const courts = [B(18, 30, 8, 8, 0, 0.2, "grass", "X", M), B(18, 58, 8, 8, 0, 0.2, "grass", "X", M)];
      const steps = S3([[34, 22, 4.95], [41.5, 22, 0.05], [41.5, 74, 0.05], [34, 74, 4.95]], 0.5, "grass", "X", { ...M, top: "grass" });
      const tea = B(26, 22, 6, 6, 4.95, 9.45, "stone", "A", { fa: FA.cong, fl: 1, top: "stoneTop" });
      const hall = B(10, 78, 18, 11, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = gridCols(base, [8, 18, 26, 34], [20, 30, 38, 48, 58, 66, 76]);
      for (const x of [10, 20, 30]) for (const y of [34, 42, 50, 58, 66]) st.push(col(x, y, 0, 18.45));
      st.push(...corners(tea).map(c => ({ ...c, z1: 4.95 })), ...corners(hall));
      return { v: [...base, ...up, ...cores, ...courts, steps, stepsLN([41.5, 48, 0.05], [34, 48, 4.95], [0, -26], [0, 26], 14), tea, hall], st };
    }
  });

  /* ---------- 16.8 · Bamboo Wing (VTN): cánh mái bán nguyệt ---------- */
  const wing = (() => { const o = []; for (let a = -90; a <= 90; a += 15) { const r = a * Math.PI / 180; o.push([+(12 + 27 * Math.cos(r)).toFixed(2), +(46 + 27 * Math.sin(r)).toFixed(2)]); } return o; })();
  I7.push({
    id: "vn8", fam: "vn", code: "16.8", name: "Cánh mái bán nguyệt trên bậc thềm", rule: "Tương phản nhẹ – nặng: mái mỏng đua xa, khối dưới lùi bậc",
    tag: "Một mái mỏng hình nửa vầng trăng đua về phía sông, bên dưới ba tầng đọc lùi bậc thành hiên râm mát",
    ref: {
      name: "Bamboo Wing (Cánh tre) trong cụm công trình tre Đại Lải", by: "Võ Trọng Nghĩa Architects (VTN)", year: "2009–2010", place: "Đại Lải, Vĩnh Phúc, Việt Nam",
      award: "Cụm tre Đại Lải (Bamboo Wing và Hội trường Đại Lải): Công trình của năm ARCASIA 2014", url: "https://vtnarchitects.net/bamboo-wing-pe222.html",
      what: "Một mái tre hình bán nguyệt như cánh chim, phần đua khoảng 12 m mà mép ngoài không có cột, che một không gian mở bên mặt nước.",
      take: "Mượn mái nửa vầng trăng đua xa không cột ở mép, che cả khối nhà và các hiên. Mái ở đây là khung thép, gỗ nhẹ với các sườn tỏa ra như nan quạt, gác trên mái tầng 3; các tầng dưới lùi bậc về phía Tây để mái che nắng cho từng hiên."
    },
    story: "Bamboo Wing của Võ Trọng Nghĩa là một mái tre bán nguyệt vươn ra mặt nước, mép mái không cột, như cánh chim đang xòe. Ở 46 Bạch Đằng, một mái mỏng nửa vầng trăng bán kính 27 m xòe về phía sông, phủ lên khối đọc ba tầng. Khối đọc lùi bậc về phía Trần Phú: tầng 1 ra sát mép, tầng 2 lùi 3 m, tầng 3 lùi thêm 3 m, nên dưới cánh mái có ba lớp hiên râm. Các sườn mái tỏa ra như nan quạt, nhìn từ bậc thang Bạch Đằng lên thấy rõ.",
    why: [W("Quy luật hình khối", "Tương phản nhẹ – nặng: một mái mỏng 1 m, đường cong tròn, đua xa đến 11 m; bên dưới là khối vuông vức lùi bậc. Mô hình trắng thấy ngay nửa vầng trăng trên một bậc thềm."),
      W("Khối chính – khối phụ", "Khối chính là nhà đọc ba tầng dưới cánh mái, khoảng 82% sàn, mái tầng 3 +13,95 m, cánh mái tới +14,95 m. Ba khối phụ thấp, ốp đá tối, nằm ngoài cánh mái: dãy kho sát lối Tây, nhà sự kiện +7,45 m ở đầu Nam và quán cà phê ở quảng trường Bắc."),
      W("Nắng và chói", "Cánh mái đua 3–11 m về phía sông nhìn Đông Đông Bắc, che nắng cao buổi sáng; các mặt kính lùi sau hiên còn có lam đứng chặn nắng sáng thấp. Mặt Trần Phú đặc. Đầu Nam dưới mép cánh có mái đua."),
      W("Gió và mưa", "Ba lớp hiên dưới cánh mái mở về phía sông và đầu Nam, đón gió Đông Nam mùa hè. Mưa gió mùa Đông Bắc tạt vào mặt sông thì cánh mái và hiên lùi bậc che kín lối đi dọc nhà."),
      W("Công năng", "Tầng 1: sảnh ở đầu Bắc, vệ sinh, kỹ thuật phía Tây, đọc mở và thiếu nhi phía sông. Tầng 2: phòng chuyên đề và đọc mở, hiên đọc ngoài trời. Tầng 3: đọc yên tĩnh, ra hiên trên cùng ngay dưới cánh mái.")],
    kc: { he: "Nhà là khung bê tông lưới 8 m, tầng trên lùi vào theo lưới. Cánh mái là 13 sườn thép hoặc gỗ ghép tỏa từ một dầm tâm, cao 1,2–1,8 m ở gốc, thon dần ra mép; phần sườn dài khoảng 14 m nằm trên mái tầng 3 làm đối trọng cho phần đua.", nhip: "8 m; nhà sự kiện 16 m", cx: "Cánh mái đua 3–11 m, có sườn dàn" },
    qa: [["Mái đua 11 m không cột có bị gãy?", "Mỗi sườn là một dàn cao 1,2–1,8 m ở gốc, phần gác trên mái tầng 3 dài khoảng 14 m làm đối trọng cho phần đua 11 m, giống cánh tre của Bamboo Wing đua 12 m. Mép mái có thanh viền nối các sườn để không rung khi gió bão."], ["Gió bão có lật cánh mái lên không?", "Cánh mái được neo xuống hàng cột tầng 3 bằng bu lông và thanh giằng; mái mỏng, có khe giữa các sườn để giảm lực hút khi bão từ biển vào."]],
    cut: "Khối đọc: ba tấm foam trắng dày 2,25 cm, 11 × 20, 9,5 × 20, 8 × 20 cm dán lùi bậc. Cánh mái: bìa cứng 1 mm cắt nửa hình tròn bán kính 13,5 cm, dán 13 que tre làm sườn. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[20, 46, 14.95, "Khối chính · Cánh mái bán nguyệt trên bậc thềm", 1], [9, 46, 4.95, "Khối phụ · Dãy kho", 2], [20, 80, 7.45, "Khối phụ · Nhà sự kiện", 2], [31, 16, 4.95, "Khối phụ · Cà phê", 2], [36, 46, 14.95, "Cánh mái đua 11 m"]],
    build() {
      const T1 = [F1(12, 26, 22, 8, 0, "glass", "A", FA.doc, M), F1(12, 34, 8, 32, 0, "sheet", "E", FA.doc, M), F1(20, 34, 14, 32, 0, "sheet", "B", FA.doc, { ...M, top: "deck" })];
      const T2 = [F1(12, 26, 19, 5, 1, "sheet", "D", FA.doc, { ...M, top: "deck" }), F1(12, 31, 19, 35, 1, "sheet", "B", FA.doc, { ...M, top: "deck" })];
      const T3 = [F1(12, 26, 16, 40, 2, "sheet", "B", FA.doc, M)];
      const roof = PO(wing, 13.95, 14.95, "sheet", "X", { top: "deck", ...M });
      const spine = F1(6, 26, 6, 40, 0, "stone", "C", FA.dac, { top: "stoneTop" });
      const hall = B(12, 74, 16, 12, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const cafe = B(26, 12, 10, 8, 0.45, 4.95, "stone", "A", { fa: FA.cong, fl: 1, top: "grass" });
      const ribs = wing.slice(1, -1).map(p => seg([14, 46, 13.95], [p[0], p[1], 14.95]));
      const st = [...gridCols([...T1, ...T2, ...T3], [12, 20, 28, 34], range(26, 66, 8)), ...ribs, seg(wing[0].concat(14.95), wing[wing.length - 1].concat(14.95)), ...corners(spine), ...corners(hall), ...corners(cafe)];
      return { v: [...T1, ...T2, ...T3, roof, LN(ribs.map(s => [s.a, s.b]), "ink", { cab: 1 }), spine, hall, cafe], st };
    }
  });
})(window.G3);
