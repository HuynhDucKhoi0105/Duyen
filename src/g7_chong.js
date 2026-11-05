
/* ================= Đợt 5 · Nhóm 12: Xếp chồng lệch, đua ra (8 ý tưởng học từ công trình có thật) ================= */
/* Hướng thật: đầu Bắc khu đất nhìn 340°, mặt sông 70°, đầu Nam 160°, mặt Trần Phú 250°. */
(function (G) {
  const { B, G: GA, LO, S3, col, grid, range, zig } = G.K;
  const { F1 } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I = G.ideas7;
  // mặt đứng theo hướng thật: mặt sông lam, mặt Trần Phú đặc, đầu Nam mái đua, đầu Bắc kính lấy sáng tán xạ
  const fR = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khu đọc
  const fP = { N: "lam", E: "lam", S: "dua", W: "dac" }; // sảnh, cà phê
  const fK = { N: "dac", E: "lam", S: "dac", W: "dac" }; // kho, kỹ thuật, nhà sự kiện
  const fD = { N: "dac", E: "dac", S: "dac", W: "dac" };
  // khối phụ: nhà sự kiện cao 7 m (dàn mái, không cột giữa) và nhà thấp một tầng
  const hall = (x, y, w, d, c = "stone", o = {}) => B(x, y, w, d, 0.45, 7.45, c, "D", { fa: fK, fl: 1, top: "stoneTop", ...o });
  const low = (x, y, w, d, c, zone, fa, o = {}) => B(x, y, w, d, 0.45, 4.95, c, zone, { fa, fl: 1, top: "grass", ...o });
  const hallSt = (x, y, w, d) => { const ys = range(y, y + d, d / 2); return [...grid([x, x + w], ys, 0.45, 7.45), ...ys.flatMap(t => zig(x, t, x + w, t, 6.45, 7.45, 4))]; };
  const lowSt = (x, y, w, d, nx = 2, ny = 2) => grid(range(x, x + w, w / nx), range(y, y + d, d / ny), 0.45, 4.95);
  // cột ở 4 góc và giữa cạnh của một khối, từ đáy tới đỉnh khối
  const posts = (x, y, w, d, z1, z2, s = 8) => grid(range(x, x + w, w / Math.max(1, Math.round(w / s))), range(y, y + d, d / Math.max(1, Math.round(d / s))), z1, z2);
  // dàn cao một tầng trên hai mặt dài của hộp (đỡ phần đua lớn)
  const truss2 = (x, y, w, d, z1, z2, ax = "y", n = 8) => ax === "y" ? [...zig(x, y, x, y + d, z1, z2, n), ...zig(x + w, y, x + w, y + d, z1, z2, n)] : [...zig(x, y, x + w, y, z1, z2, n), ...zig(x, y + d, x + w, y + d, z1, z2, n)];
  const dir = "Đầu Bắc khu đất nhìn hướng Bắc Tây Bắc (340°), mặt sông nhìn Đông Đông Bắc (70°), đầu Nam nhìn Nam Đông Nam (160°), mặt Trần Phú nhìn Tây Tây Nam (250°).";
  const sunW = (extra = "") => W("Nắng và chói", `${dir} Mặt sông hứng nắng sáng mùa hè gần vuông góc nên dùng lam đứng; mặt Trần Phú hứng nắng chiều mùa đông nên làm tường đặc; đầu Nam có mái đua; đầu Bắc dùng kính lấy sáng tán xạ cho khu đọc.${extra}`);

  /* ---------- 12.1 · Halifax Central Library ---------- */
  I.push({
    id: "ch1", fam: "chong", code: "12.1", name: "Bốn tầng bước ra, tầng thượng vươn về quảng trường", rule: "Tiến dần, đua lớn có dàn",
    tag: "Bốn hộp đọc chồng lên nhau, mỗi tầng bước ra phía Bắc 4 m; tầng trên cùng vươn 14 m qua quảng trường Bắc như một phòng khách của thành phố",
    ref: { name: "Halifax Central Library", by: "Schmidt Hammer Lassen Architects và Fowler Bauld & Mitchell", year: "2014", place: "Halifax, Nova Scotia, Canada",
      award: "Governor General's Medal in Architecture 2016; Lieutenant Governor's Design Award of Merit in Architecture 2014",
      url: "https://en.wikipedia.org/wiki/Halifax_Central_Library",
      what: "Các khối kính xếp chồng theo chiều đứng, tầng trên cùng là một hộp lớn đua mạnh ra trên quảng trường lối vào, dùng dàn thép Vierendeel để đứng được. Từ phố nhìn lên thấy rõ chuyển động bước ra của các tầng.",
      take: "Mượn ý các tầng bước dần ra và tầng thượng đua lớn làm điểm nhìn. Đặt hướng đua về quảng trường Bắc của khu đất để mái đua thành mái che quảng trường sự kiện; các tầng dưới chỉ bước 2–4 m để dầm thường đỡ được, riêng tầng thượng có dàn cao một tầng." },
    story: "Bốn hộp đọc chồng lên nhau như bốn cuốn sách được rút ra dần khỏi giá: tầng 2 bước ra phía Bắc 4 m, tầng 3 bước thêm 4 m, tầng thượng vươn hẳn 14 m ra trên quảng trường Bắc. Dưới mũi đua là quảng trường sự kiện có mái che cao 13,5 m. Trong mũi đua là phòng đọc nhìn ra cửa sông và cầu Thuận Phước.",
    why: [W("Quy luật hình khối", "Tiến dần: mỗi tầng dịch về phía Bắc một bước cố định, tầng cuối bước dài nhất. Bốn hộp cùng chiều rộng, cùng màu nên đọc thành một khối đang chuyển động về phía quảng trường."),
      W("Khối chính – khối phụ", "Khối chính là chồng bốn hộp cao +18,45 m, khoảng 80% diện tích sàn. Ba khối phụ chỉ cao một tầng hoặc 7 m, màu đá tối: nhà sự kiện ở đầu Nam, nhà thiếu nhi và lưng kỹ thuật phía Tây."),
      sunW(" Mũi đua tầng thượng che nắng trưa cho quảng trường Bắc."),
      W("Gió và mưa", "Gió mùa hè Đông Nam vào từ đầu Nam, đi qua khoảng trống giữa nhà sự kiện và nhà thiếu nhi. Gió mưa Đông Bắc đập vào mặt sông; mặt sông có lam và các tầng trên đua ra che cho lối vào phía Bắc."),
      W("Công năng", "Tầng 1 là sảnh, kho, vệ sinh; tầng 2 là phòng chuyên đề và đọc mở; tầng 3 đọc yên tĩnh; tầng thượng là phòng đọc nhìn sông. Nhà sự kiện ở đầu Nam có lối riêng từ bãi xe, chạy ngoài giờ.")],
    kc: { he: "Khung bê tông lưới 8 m cho ba tầng dưới, cột thẳng một mạch. Tầng thượng là hộp thép có hai dàn Vierendeel cao một tầng ở hai mặt dài, dài 32 m, gối lên tầng 3 trên 18 m và đua 14 m. Hai lõi thang bê tông giữ ổn định.", nhip: "14 m (phần đua tầng thượng, có dàn)", cx: "14 m tầng thượng (dàn cao 4,5 m); các tầng dưới bước 2–4 m" },
    qa: [["Đua 14 m có đổ không?", "Phần gối lên tầng 3 dài 18 m, dài hơn phần đua 14 m, nên trọng lượng phía trong giữ phần ngoài như cái đòn. Hai dàn thép cao bằng cả tầng ở hai mặt dài làm việc như một cây cầu; hai lõi thang neo đầu dàn xuống móng."],
      ["Quảng trường dưới mũi đua có tối không?", "Mũi đua cao 13,5 m so với mặt quảng trường, ánh sáng vẫn lọt vào từ ba phía. Mái đua che nắng trưa và mưa nhẹ, quảng trường dùng được cả ngày."]],
    cut: "Bốn tấm foam trắng 9 × 15 cm, 10 × 14 cm, 10 × 16 cm, 8 × 16 cm, mỗi tấm dày 2,25 cm, dán lệch nhau 2 cm. Tầng thượng: dán thêm que balsa 2 mm chéo ở hai mặt dài để thấy dàn. Khối phụ: foam đen cao 2,25 cm, nhà sự kiện 3,5 cm.",
    roleOf: () => "p",
    lab: [[24, 24, 18.45, "Khối chính · Bốn tầng bước ra, tầng thượng đua 14 m", 1], [24, 12, 13.6, "Mũi đua che quảng trường Bắc"], [22, 46, 4.95, "Sảnh kính"],
      [18, 82, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [31, 81, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2], [9, 50, 4.95, "Khối phụ · Lưng kỹ thuật phía Tây", 2]],
    build() {
      const v = [
        F1(14, 40, 18, 14, 0, "glass", "A", fP, M), F1(14, 54, 8, 16, 0, "sheet", "C", fK, M), F1(22, 54, 10, 16, 0, "sheet", "E", fK, M),
        F1(12, 36, 20, 8, 1, "sheet", "D", fR, M), F1(12, 44, 20, 22, 1, "sheet", "B", fR, M),
        F1(14, 32, 20, 28, 2, "sheet", "B", fR, M),
        F1(16, 18, 16, 32, 3, "sheet", "B", { N: "kinh", E: "lam", S: "dua", W: "dac" }, M),
        B(22, 46, 4, 6, 0.45, 18.45, "stone", "X", { top: "stoneTop", ...M }), B(26, 52, 4, 6, 0.45, 18.45, "stone", "X", { top: "stoneTop", ...M }),
        hall(10, 76, 16, 12), low(26, 74, 10, 14, "stone", "B", fR), low(6, 40, 6, 14, "stone", "C", fD, { top: "stoneTop" }), low(6, 54, 6, 10, "stone", "E", fD, { top: "stoneTop" })];
      const st = [...grid([14, 22, 32], [40, 48, 56, 64, 70], 0.45, 9.45), ...grid([12], [36, 44, 52, 60, 66], 4.95, 9.45), ...grid([14, 24, 34], [32, 40, 48, 56, 60], 9.45, 13.95),
        ...truss2(16, 18, 16, 32, 13.95, 18.45, "y", 8), ...hallSt(10, 76, 16, 12), ...lowSt(26, 74, 10, 14, 1, 2), ...grid([6], [40, 48, 56, 64], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 12.2 · Deichman Bjørvika ---------- */
  const ch2c = [[12, 36], [19, 36], [19, 68], [17, 68], [12, 63]], ch2a = [[19, 36], [27, 36], [32, 41], [32, 52], [19, 52]], ch2e = [[19, 52], [32, 52], [32, 63], [27, 68], [19, 68]];
  I.push({
    id: "ch2", fam: "chong", code: "12.2", name: "Ba góc nhấc lên, mũi đọc vươn ra sông", rule: "Khối trừ ở chân, đua ở đỉnh",
    tag: "Khối đọc bốn tầng bị cắt vát ba góc ở tầng trệt thành ba lối vào; tầng 3 thò một mũi đọc dài 9,5 m ra phía sông, làm mái hiên cho lối vào từ bậc thang",
    ref: { name: "Deichman Bjørvika (Thư viện công cộng Oslo)", by: "Atelier Oslo và Lund Hagem", year: "2020", place: "Bjørvika, Oslo, Na Uy",
      award: "IFLA/Systematic Public Library of the Year 2021",
      url: "https://architizer.com/projects/deichman-library/",
      what: "Khối lớn đứng trên ba góc được nhấc lên thành ba lối vào bằng nhau nhìn về ba hướng; tầng trên đua ra tới khoảng 18 m trên lối vào chính. Ba khe sáng chéo nối ba lối vào lên mái.",
      take: "Mượn ba góc nhấc thành ba lối vào: góc Đông Bắc đón người từ quảng trường Bắc, góc Đông Nam đón người từ bậc thang Bạch Đằng, góc Tây Nam đón người từ bãi xe. Mũi đua thu về 9,5 m có dàn, quay ra sông để che mưa gió Đông Bắc cho lối vào." },
    story: "Tầng trệt là một khối kính bị vát ba góc, nên ba phía đều có lối vào rộng và có mái che sẵn bên trên. Ba tầng đọc phía trên là một khối nguyên, cao hơn hẳn mọi thứ xung quanh. Ở tầng 3, một mũi đọc dài thò ra phía sông, đầu mũi là chỗ ngồi đọc nhìn thẳng ra sông Hàn.",
    why: [W("Quy luật hình khối", "Khối trừ ở chân và khối cộng ở đỉnh: chân bị vát làm khối như đang nhón lên, đỉnh có mũi đua làm khối có hướng về phía sông. Hai thao tác ngược nhau giữ khối cân."),
      W("Khối chính – khối phụ", "Khối chính là khối đọc bốn tầng cao +18,45 m, khoảng 83% diện tích sàn. Hai khối phụ thấp và tối: nhà sự kiện mái đá ở đầu Bắc, nhà thiếu nhi mái cỏ ở đầu Nam."),
      sunW(" Các góc vát ở tầng trệt luôn nằm trong bóng tầng trên nên sảnh không bị nắng chiếu thẳng."),
      W("Gió và mưa", "Mũi đua tầng 3 quay ra sông, đúng hướng gió mưa Đông Bắc mùa đông, che cho góc vào Đông Bắc. Gió Đông Nam mùa hè vào góc vát Đông Nam rồi đi xuyên sảnh."),
      W("Công năng", "Ba lối vào gặp nhau ở sảnh giữa có quầy hướng dẫn. Phía Tây tầng trệt là kho và nghiệp vụ sát lối Tây; tầng 2 có phòng chuyên đề; tầng 3–4 là đọc, mũi đua là chỗ đọc nhìn sông.")],
    kc: { he: "Khung bê tông lưới 8 m, cột thẳng một mạch; ba góc vát là phần sàn tầng 2 đua ra 5 m trên dầm công xôn. Mũi đọc tầng 3 là hộp thép có hai dàn cao một tầng ở hai mặt dài, chạy sâu 10 m vào khối chính để cân phần đua 9,5 m.", nhip: "9,5 m (mũi đua, có dàn)", cx: "9,5 m mũi đọc tầng 3; 5 m ở ba góc vát" },
    qa: [["Mũi đua 9,5 m neo vào đâu?", "Dàn chạy suốt 19,5 m, trong đó 10 m nằm trong khối chính và gối lên hai hàng cột. Phần trong dài hơn phần ngoài nên cân được, giống đòn bẩy."],
      ["Vì sao vát ba góc mà không vát cả bốn?", "Góc Tây Bắc sát lối Tây là chỗ nhập sách và kho, không cần lối vào. Bỏ góc đó giữ cho kho kín và làm khối bất đối xứng, nhìn sinh động hơn."]],
    cut: "Tầng trệt: foam kính (mica) cắt hình bát giác thiếu một góc, 10 × 16 cm, cao 2,25 cm. Ba tầng trên: foam trắng 10 × 16 cm, tầng trên cùng 6 × 10 cm. Mũi đua: foam 4,75 × 7 cm, dán que chéo hai mặt. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[22, 52, 18.45, "Khối chính · Ba góc nhấc, mũi đọc vươn ra sông", 1], [38, 51, 13.95, "Mũi đọc đua 9,5 m"], [31, 38, 2.5, "Góc vào Đông Bắc"], [31, 66, 2.5, "Góc vào Đông Nam"],
      [16, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [22, 81, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2]],
    build() {
      const P1 = (pts, zone, c, fa) => ({ k: "poly", pts, z1: 0.45, zt: 4.95, c, zone, fa, fl: 1, ...M });
      const v = [P1(ch2c, "C", "sheet", fK), P1(ch2a, "A", "glass", fP), P1(ch2e, "E", "sheet", fK),
        F1(12, 36, 20, 8, 1, "sheet", "D", fR, M), F1(12, 44, 20, 24, 1, "sheet", "B", fR, M),
        F1(12, 36, 20, 32, 2, "sheet", "B", fR, M), F1(32, 44, 9.5, 14, 2, "sheet", "B", { N: "lam", E: "lam", S: "dua", W: "dac" }, M),
        F1(16, 36, 12, 20, 3, "sheet", "B", fR, M),
        B(19, 46, 4, 6, 0.45, 18.45, "stone", "X", { top: "stoneTop", ...M }),
        hall(8, 14, 16, 14), low(14, 74, 16, 14, "stone", "B", fR)];
      const st = [...grid([12, 19], [36, 44, 52, 60, 63], 0.45, 13.95), ...grid([27], [41, 52, 63], 0.45, 13.95), ...grid([32], [44, 52, 58], 4.95, 13.95),
        ...truss2(22, 44, 19.5, 14, 9.45, 13.95, "x", 6), ...grid([16, 28], [36, 46, 56], 13.95, 18.45), ...hallSt(8, 14, 16, 14), ...lowSt(14, 74, 16, 14)];
      return { v, st };
    }
  });

  /* ---------- 12.3 · New Museum ---------- */
  I.push({
    id: "ch3", fam: "chong", code: "12.3", name: "Sáu hộp lệch nhau quanh một lõi", rule: "Lệch có kiểm soát, xoay vòng lệch",
    tag: "Năm tầng hộp, mỗi tầng một kích thước, lệch 2–4 m sang một hướng khác nhau quanh lõi thang; mép lệch là khe lấy sáng và ban công",
    ref: { name: "New Museum (New Museum of Contemporary Art)", by: "SANAA (Kazuyo Sejima và Ryue Nishizawa), Gensler là kiến trúc sư thực hiện", year: "2007", place: "235 Bowery, New York, Hoa Kỳ",
      award: "",
      url: "https://www.britannica.com/place/New-Museum",
      what: "Một chồng hộp chữ nhật nhiều kích thước, mỗi hộp xê dịch lệch trục so với hộp trên và dưới, quanh một lõi giữa. Chỗ hộp trên lùi vào để lộ mái hộp dưới thành khe lấy sáng và sân thượng.",
      take: "Mượn cách lệch từng tầng quanh một lõi nhưng giới hạn mỗi bước lệch 2–4 m để dầm thường đỡ được. Mỗi mép lệch được dùng: mép quay ra sông và về đầu Nam làm ban công, mép quay về Bắc làm khe kính lấy sáng cho tầng dưới." },
    story: "Lõi thang đứng giữa, năm hộp xếp quanh nó như một chồng sách được đặt vội: tầng 2 lệch về Bắc và về sông, tầng 3 lệch về phía phố và về Nam, tầng 4 lệch về Bắc, tầng 5 là phòng đọc nhỏ trên đỉnh. Mép hộp dưới lộ ra thành ban công và khe kính, nên tầng nào cũng có chút trời riêng.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: mỗi tầng lệch một hướng khác, nhưng chỉ đúng 2 hoặc 4 m và luôn bám lõi. Nhìn có vẻ lộn xộn như bạn thích, nhưng cột và lõi vẫn thẳng."),
      W("Khối chính – khối phụ", "Khối chính là chồng năm hộp trắng cao +22,95 m, khoảng 76% diện tích sàn. Ba khối phụ thấp, màu đá: nhà sự kiện ở đầu Bắc, nhà thiếu nhi ở đầu Nam, lưng kho phía Tây."),
      sunW(" Khe kính ở mép lệch đều quay về Bắc nên ánh sáng vào là ánh sáng tán xạ."),
      W("Gió và mưa", "Ban công ở mép lệch phía Nam đón gió Đông Nam mùa hè. Mép lệch phía sông có lam đứng che mưa tạt Đông Bắc."),
      W("Công năng", "Tầng 1 sảnh và vệ sinh; tầng 2 phòng chuyên đề và đọc mở; tầng 3–4 đọc; tầng 5 phòng đọc yên tĩnh nhìn ra sông và cầu. Nhà sự kiện ở đầu Bắc có lối riêng từ quảng trường.")],
    kc: { he: "Lõi thang bê tông giữa nhà và khung bê tông lưới 8 m. Mỗi tầng lệch 2–4 m so với tầng dưới bằng dầm công xôn và dàn biên cao 1 m trong tường; cột ở mép hộp dưới tiếp tục lên đỡ hộp trên.", nhip: "8 m", cx: "4 m (mép lệch các tầng)" },
    qa: [["Lệch mỗi tầng một hướng có làm cột gãy khúc?", "Không. Lưới cột chính 8 m chạy thẳng từ móng lên; phần lệch 2–4 m là sàn đua ra khỏi hàng cột ngoài cùng, giống ban công lớn."],
      ["Khe kính ở mép lệch có dột?", "Khe kính làm dốc 5% về phía ngoài, có máng xối inox. Phần mái lộ ra phía Nam là ban công lát gỗ, thoát nước như sân thượng."]],
    cut: "Năm tấm foam trắng: 9 × 13 cm, 9 × 13 cm, 10 × 12 cm, 8 × 12 cm, 7 × 8 cm, dày 2,25 cm, dán lệch theo bản vẽ. Lõi: que vuông 2 × 3 cm cao 11,5 cm xuyên giữa. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[24, 52, 22.95, "Khối chính · Sáu hộp lệch quanh lõi", 1], [26, 37, 9.45, "Mép lệch: khe kính"], [22, 64, 13.95, "Ban công phía Nam"],
      [18, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [23, 79, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [9, 52, 4.95, "Khối phụ · Lưng kho phía Tây", 2]],
    build() {
      const v = [
        F1(14, 40, 18, 12, 0, "glass", "A", fP, M), F1(14, 52, 18, 14, 0, "sheet", "E", fK, M),
        F1(16, 36, 18, 8, 1, "sheet", "D", fR, M), F1(16, 44, 18, 18, 1, "sheet", "B", fR, M),
        F1(12, 42, 20, 24, 2, "sheet", "B", fR, M),
        F1(15, 38, 16, 24, 3, "sheet", "B", fR, M),
        F1(17, 44, 14, 16, 4, "sheet", "B", fR, M),
        B(21, 48, 5, 6, 0.45, 22.95, "stone", "X", { top: "stoneTop", ...M }),
        hall(10, 14, 16, 14), low(14, 72, 18, 14, "stone", "B", fR), low(6, 40, 6, 24, "stone", "C", fD, { top: "stoneTop" })];
      const st = [...grid([14, 22, 32], [40, 48, 56, 62], 0.45, 18.45), ...grid([16, 34], [36, 44], 4.95, 9.45), ...grid([12], [42, 50, 58, 66], 9.45, 13.95),
        ...grid([15, 31], [38, 46, 54, 62], 13.95, 18.45), ...grid([17, 31], [44, 52, 60], 18.45, 22.95), ...hallSt(10, 14, 16, 14), ...lowSt(14, 72, 18, 14), ...grid([6], [40, 48, 56, 64], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 12.4 · VitraHaus ---------- */
  const house = (v, x, y, w, d, k, zones, ax, rise, fa) => {
    // một "nhà" dài: thân hộp một tầng (có thể chia vùng) + mái hai dốc trên cùng
    for (const [zx, zy, zw, zd, zone, c] of zones) v.push(F1(zx, zy, zw, zd, k, c || "sheet", zone, fa, M));
    const z = 0.45 + 4.5 * (k + 1);
    v.push(GA(x, y, w, d, z, z + rise, "blkTop", ax, { ...M }));
  };
  const fNS = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fEW = { N: "kinh", E: "lam", S: "dua", W: "dac" };
  I.push({
    id: "ch4", fam: "chong", code: "12.4", name: "Năm nhà mái dốc gác chéo lên nhau", rule: "Chồng chéo, khối cài",
    tag: "Năm căn nhà dài mái hai dốc: hai căn nằm dọc ở dưới, hai căn nằm ngang gác lên, một căn nằm dọc trên cùng vươn ra hai đầu",
    ref: { name: "VitraHaus", by: "Herzog & de Meuron", year: "2010", place: "Vitra Campus, Weil am Rhein, Đức",
      award: "",
      url: "https://vitra.com/en-un/campus/architecture/architecture-vitrahaus",
      what: "Mười hai căn nhà dài mái hai dốc kiểu nhà truyền thống được xếp chồng, cài vào nhau thành năm tầng; các căn phía trên đua ra khỏi căn phía dưới tới khoảng 15 m. Chỉ đầu hồi được lắp kính.",
      take: "Mượn hình căn nhà mái dốc chồng chéo, nhưng chỉ chồng vuông góc 90° trên lưới để cột thẳng; căn nào đua quá 4,5 m thì thân nhà làm luôn dàn thép cao một tầng. Mái dốc gợi mái nhà phố cổ Hội An và nhà rường, thầy nhìn khối trắng vẫn thấy ngay ý." },
    story: "Năm căn nhà mái dốc giống hệt nhau về mặt cắt, chỉ khác chiều dài, được gác lên nhau như que diêm: hai căn dọc theo khu đất làm chân, hai căn ngang gác lên, căn trên cùng nằm dọc và vươn ra 8 m ở đầu Bắc. Đầu hồi mỗi căn là một ô kính lớn nhìn về một hướng: sông, quảng trường, phố.",
    why: [W("Quy luật hình khối", "Chồng chéo: các căn nằm vuông góc nhau theo từng tầng, mái căn dưới bị căn trên xuyên qua như các căn của VitraHaus. Lặp lại một mặt cắt nhà nên dù chồng lộn xộn vẫn thấy cùng một gia đình."),
      W("Khối chính – khối phụ", "Khối chính là cụm năm nhà mái dốc cao tới +17,95 m (đỉnh mái), khoảng 80% diện tích sàn. Ba khối phụ là hộp mái bằng, thấp, màu đá: nhà sự kiện ở đầu Bắc, lưng kho phía Tây, nhà thiếu nhi ở đầu Nam. Mái dốc chỉ có ở khối chính nên nhìn là phân biệt ngay."),
      sunW(" Đầu hồi quay ra sông có lam đứng, đầu hồi quay về phố là tường đặc."),
      W("Gió và mưa", "Mái dốc thoát mưa lớn mùa đông nhanh. Khoảng hở giữa hai căn chân mở về đầu Nam cho gió Đông Nam mùa hè lùa vào sân giữa."),
      W("Công năng", "Căn chân phía phố: sảnh, phòng học chuyên đề, vệ sinh; căn chân phía sông: cà phê và đọc báo; hai căn ngang tầng 2: đọc mở; căn trên cùng: phòng đọc yên tĩnh dưới mái dốc cao.")],
    kc: { he: "Mỗi căn là một ống khung thép: hai mặt dài là hai dàn cao một tầng, mái dốc là vì kèo. Căn trên gối lên căn dưới đúng tại các nút dàn, nên tải truyền thẳng xuống cột của căn chân. Căn chân là khung bê tông lưới 8 m.", nhip: "12 m (căn nằm ngang gác qua hai căn chân)", cx: "8 m (căn trên cùng, dàn cao một tầng); 5,5 m (căn ngang phía sông, có dàn)" },
    qa: [["Căn trên cùng vươn 8 m có dây treo không?", "Không cần dây. Hai mặt dài của căn là hai dàn thép cao 4,5 m, gối lên hai căn ngang bên dưới; phần vươn 8 m giống mút cầu dàn."],
      ["Mái dốc có làm khó chia phòng tầng trên?", "Mái dốc chỉ ở trên cùng mỗi căn, dưới mái là trần cao dần lên giữa nhà, rất hợp phòng đọc. Sàn vẫn phẳng."]],
    cut: "Năm thanh foam trắng tiết diện 5 × 2,25 cm, cắt dài 24 cm, 20 cm, 17 cm, 14 cm, 17 cm; mỗi thanh dán thêm mái tam giác cao 1,75 cm. Xếp chéo theo bản vẽ, cắt rãnh mái chỗ căn trên xuyên qua. Khối phụ: foam đen mái bằng.",
    roleOf: () => "p",
    lab: [[22, 44, 17.95, "Khối chính · Năm nhà mái dốc gác chéo", 1], [22, 36, 13.95, "Căn trên cùng vươn 8 m"], [39, 48, 9.45, "Đầu hồi nhìn sông"],
      [18, 18, 7.45, "Khối phụ · Nhà sự kiện mái bằng", 2], [9, 45, 4.95, "Khối phụ · Lưng kho phía Tây", 2], [21, 83, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const v = [];
      house(v, 12, 26, 10, 48, 0, [[12, 26, 10, 16, "A", "glass"], [12, 42, 10, 12, "D"], [12, 54, 10, 20, "E"]], "y", 3.5, fNS);
      house(v, 26, 34, 12, 40, 0, [[26, 34, 12, 12, "A", "glass"], [26, 46, 12, 28, "B"]], "y", 4, fNS);
      house(v, 8, 42, 33.5, 12, 1, [[8, 42, 33.5, 12, "B"]], "x", 3.5, fEW);
      house(v, 10, 62, 28, 11, 1, [[10, 62, 28, 11, "B"]], "x", 3.5, fEW);
      house(v, 16, 34, 12, 34, 2, [[16, 34, 12, 34, "B"]], "y", 4, fNS);
      v.push(hall(10, 12, 16, 12), low(6, 30, 6, 30, "stone", "C", fD, { top: "stoneTop" }), low(12, 78, 18, 10, "stone", "B", fR));
      const st = [...grid([12, 22], range(26, 74, 8), 0.45, 4.95), ...grid([26, 38], range(34, 74, 8), 0.45, 4.95),
        ...truss2(8, 42, 33.5, 12, 4.95, 9.45, "x", 8), ...truss2(10, 62, 28, 11, 4.95, 9.45, "x", 6), ...truss2(16, 34, 12, 34, 9.45, 13.95, "y", 8),
        ...hallSt(10, 12, 16, 12), ...grid([6], [30, 38, 46, 54, 60], 0.45, 4.95), ...lowSt(12, 78, 18, 10, 2, 1)];
      return { v, st };
    }
  });

  /* ---------- 12.5 · Asakusa Culture Tourist Information Center ---------- */
  // diềm mái dốc một bên quanh mép trên của một tầng (không tính sàn)
  const eave = (x, y, w, d, zt, side, out = 1.6, drop = 0.9) => {
    const E = { N: [[x - 0.6, y, zt], [x + w + 0.6, y, zt], [x + w + 0.6, y - out, zt - drop], [x - 0.6, y - out, zt - drop]],
      S: [[x - 0.6, y + d, zt], [x + w + 0.6, y + d, zt], [x + w + 0.6, y + d + out, zt - drop], [x - 0.6, y + d + out, zt - drop]],
      E: [[x + w, y - 0.6, zt], [x + w, y + d + 0.6, zt], [x + w + out, y + d + 0.6, zt - drop], [x + w + out, y - 0.6, zt - drop]],
      W: [[x, y - 0.6, zt], [x, y + d + 0.6, zt], [x - out, y + d + 0.6, zt - drop], [x - out, y - 0.6, zt - drop]] }[side];
    return S3(E, 0.18, "blkTop", "X", { ...M });
  };
  I.push({
    id: "ch5", fam: "chong", code: "12.5", name: "Tháp năm tầng mái chồng diềm dốc", rule: "Lặp lại, xen kẽ hướng",
    tag: "Năm tầng đọc chồng thẳng, mỗi tầng đội một vành mái dốc riêng, hướng dốc đổi luân phiên Bắc Nam rồi Đông Tây; trên cùng là mái hai dốc",
    ref: { name: "Asakusa Culture Tourist Information Center", by: "Kengo Kuma and Associates", year: "2012", place: "Asakusa, Tokyo, Nhật Bản, đối diện cổng Kaminarimon",
      award: "",
      url: "https://arquitecturaviva.com/works/asakusa-culture-tourist-information-center",
      what: "Một tòa nhà nhỏ như tám căn nhà một tầng chồng lên nhau; mỗi tầng có mái dốc riêng, có tầng mái hai dốc, có tầng mái một dốc, nên mặt đứng là một chồng đường mái lệch nhau. Khoảng trống dưới mái dốc được dùng cho phòng có trần cao.",
      take: "Mượn ý mỗi tầng là một căn nhà có mái riêng, chồng thành tháp như mái chồng diêm chùa Việt. Thân các tầng vẫn là hộp thẳng đứng để cột chạy suốt; chỉ vành mái dốc đua 1,6 m ở mép trên mỗi tầng, đổi hướng luân phiên cho mặt đứng sinh động." },
    story: "Một tháp đọc năm tầng đứng giữa khu đất, mỗi tầng đội một vành mái dốc như các lớp mái chùa. Tầng lẻ có mái dốc về Bắc và Nam, tầng chẵn dốc về sông và về phố, trên cùng là mái hai dốc. Từ bờ sông nhìn vào thấy năm lớp mái chồng lên nhau, mỗi lớp một hướng.",
    why: [W("Quy luật hình khối", "Lặp lại và xen kẽ: năm tầng giống nhau về mặt bằng, khác nhau ở hướng dốc của vành mái. Khối thân đơn giản, cái nghệ thuật nằm ở nhịp các đường mái."),
      W("Khối chính – khối phụ", "Khối chính là tháp năm tầng cao +22,95 m, mái tới khoảng +26,5 m, khoảng 80% diện tích sàn. Ba khối phụ thấp, mái bằng, màu đá: nhà sự kiện, nhà thiếu nhi và lưng kho, nằm sát đất quanh chân tháp."),
      sunW(" Vành mái dốc ở mỗi tầng còn là mái đua che nắng cho cửa kính ngay bên dưới."),
      W("Gió và mưa", "Vành mái dốc đua 1,6 m che mưa tạt mùa đông cho từng tầng. Khoảng trống giữa tháp và nhà thiếu nhi ở đầu Nam để gió Đông Nam đi vào sân."),
      W("Công năng", "Tầng 1 sảnh, cà phê, vệ sinh; tầng 2 phòng chuyên đề và đọc mở; tầng 3–5 đọc, tầng 5 dưới mái hai dốc là phòng đọc yên tĩnh trần cao. Thang máy và hai thang bộ trong lõi giữa.")],
    kc: { he: "Khung bê tông lưới 6 × 8 m, cột thẳng từ móng lên mái, lõi thang bê tông giữa nhà. Vành mái dốc là bản bê tông mỏng đua 1,6 m từ dầm biên mỗi tầng. Mái trên cùng là vì kèo thép hai dốc.", nhip: "9 m", cx: "1,6 m (vành mái dốc)" },
    qa: [["Tháp 5 tầng có quá cao so với đề?", "Đỉnh mái khoảng 26 m, thấp hơn nhiều nhà cao tầng dọc Trần Phú. Diện tích mỗi tầng nhỏ (432 m²) nên tổng sàn vẫn dưới 3.000 m², và nhờ xây cao mà sân đất trống rất rộng."],
      ["Vành mái dốc có làm vướng ánh sáng?", "Vành mái chỉ đua 1,6 m và dốc ra ngoài, ánh sáng xiên vẫn vào; nó chặn nắng trưa và mưa, giống mái hiên nhà phố."]],
    cut: "Năm tấm foam trắng 9 × 12 cm dày 2,25 cm chồng thẳng. Vành mái: bìa xám dày 1 mm cắt dải rộng 1 cm, gấp vát dán quanh mép trên từng tấm, đổi hướng luân phiên. Mái trên cùng: hai tấm bìa nghiêng. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[23, 50, 26.5, "Khối chính · Tháp năm tầng mái chồng", 1], [23, 36, 13.6, "Vành mái dốc đổi hướng mỗi tầng"],
      [18, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [23, 81, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [9, 52, 4.95, "Khối phụ · Lưng kho phía Tây", 2]],
    build() {
      const x = 14, y = 38, w = 18, d = 24;
      const v = [F1(x, y, w, 12, 0, "glass", "A", fP, M), F1(x, y + 12, w, 12, 0, "sheet", "E", fK, M),
        F1(x, y, w, 8, 1, "sheet", "D", fR, M), F1(x, y + 8, w, 16, 1, "sheet", "B", fR, M),
        F1(x, y, w, d, 2, "sheet", "B", fR, M), F1(x, y, w, d, 3, "sheet", "B", fR, M), F1(x, y, w, d, 4, "sheet", "B", fR, M),
        GA(x - 1, y - 1, w + 2, d + 2, 22.95, 26.45, "blkTop", "y", { ...M }),
        B(21, 47, 4, 6, 0.45, 22.95, "stone", "X", { top: "stoneTop", ...M })];
      for (let k = 0; k < 4; k++) { const zt = 0.45 + 4.5 * (k + 1); for (const s of k % 2 ? ["E", "W"] : ["N", "S"]) v.push(eave(x, y, w, d, zt, s)); }
      v.push(hall(10, 14, 16, 14), low(14, 74, 18, 14, "stone", "B", fR), low(6, 40, 6, 24, "stone", "C", fD, { top: "stoneTop" }));
      const st = [...grid([14, 20, 26, 32], [38, 46, 54, 62], 0.45, 22.95), ...hallSt(10, 14, 16, 14), ...lowSt(14, 74, 18, 14), ...grid([6], [40, 48, 56, 64], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 12.6 · LEGO House ---------- */
  I.push({
    id: "ch6", fam: "chong", code: "12.6", name: "Gạch đọc xếp bậc quanh quảng trường có mái", rule: "Xếp gạch so le, bậc thềm xoắn",
    tag: "Mười hai khối như những viên gạch xếp so le nửa viên quanh một quảng trường có mái; mái mỗi khối là một sân thượng màu, bậc lên dần tới viên gạch đỉnh",
    ref: { name: "LEGO House", by: "BIG (Bjarke Ingels Group)", year: "2017", place: "Billund, Đan Mạch",
      award: "",
      url: "https://en.wikipedia.org/wiki/Lego_House_(Billund)",
      what: "Hai mươi mốt khối như viên gạch LEGO xếp so le, ôm một quảng trường có mái ở giữa; mái các khối thành chín sân thượng sơn màu, người leo lên từ ngoài, trên cùng là một viên gạch đỉnh.",
      take: "Mượn cách xếp gạch so le nửa viên và các sân thượng bậc thang đi lên được. Thu về 12 khối trên lưới 8 m, mỗi khối lệch tối đa 4 m so với khối dưới; quảng trường giữa thành sảnh có mái của thư viện, sân thượng là chỗ đọc ngoài trời." },
    story: "Thư viện như một đống gạch đồ chơi xếp gọn: tầng trệt là bốn thanh gạch ôm một quảng trường giữa, tầng trên các viên gạch xếp lệch nửa viên, bắc qua quảng trường. Mái mỗi viên là một sân thượng màu khác nhau, nối với nhau bằng bậc ngoài trời, đi lòng vòng lên tới viên gạch đỉnh nhìn ra sông.",
    why: [W("Quy luật hình khối", "Xếp gạch so le: viên trên luôn nằm lệch nửa viên so với viên dưới, như cách xếp gạch xây. Nhìn tưởng tự do nhưng mọi viên nằm trên lưới 8 m, lệch đúng 4 m."),
      W("Khối chính – khối phụ", "Khối chính là đống gạch đọc cao +18,45 m, khoảng 93% diện tích sàn. Khối phụ duy nhất là nhà sự kiện thấp màu đá ở đầu Bắc, tách khỏi đống gạch bằng quảng trường Bắc."),
      sunW(" Sân thượng màu quay về Nam có mái đua của viên gạch bên trên che bớt nắng trưa."),
      W("Gió và mưa", "Quảng trường giữa có mái nhưng hở hai đầu Bắc Nam, gió Đông Nam mùa hè thổi xuyên qua. Gió mưa Đông Bắc đập vào thanh gạch phía sông, có lam và tường dày."),
      W("Công năng", "Thanh Bắc: sảnh và kho; thanh phía sông: cà phê và đọc báo; thanh phía phố: vệ sinh, kỹ thuật; thanh Nam: thiếu nhi. Các viên tầng 2–4 là đọc; viên Bắc tầng 2 là phòng chuyên đề.")],
    kc: { he: "Mỗi viên gạch là hộp bê tông có tường chịu lực ở hai đầu; viên trên gối lên tường của hai viên dưới, lệch 4 m. Viên bắc qua quảng trường dùng dầm cao 1,2 m nhịp 12 m. Cột và tường chạy thẳng theo lưới 8 m.", nhip: "12 m (viên bắc qua quảng trường)", cx: "4 m (nửa viên gạch)" },
    qa: [["Viên gạch lệch nửa viên có vững không?", "Viên trên luôn gối lên ít nhất hai viên dưới, phần lệch chỉ 4 m, như cách xếp gạch xây tường: so le làm khối liên kết chặt hơn."],
      ["Sân thượng màu có nóng?", "Mặt sân lát gạch men nhạt, có chậu cây và mái đua của viên trên che. Màu chỉ ở viền và bậc, đủ để đọc ra các viên khác nhau."]],
    cut: "Mười hai khối foam trắng 4 × 5 cm, 4 × 8 cm, 5 × 10 cm…, dày 2,25 cm, dán so le nửa viên. Mái mỗi khối dán giấy màu (xanh, vàng, đỏ, tím). Viên đỉnh 8 × 8 cm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[26, 50, 18.45, "Khối chính · Gạch đọc xếp bậc", 1], [24, 62, 2.5, "Quảng trường giữa có mái"], [35, 70, 9.45, "Sân thượng màu"],
      [16, 20, 7.45, "Khối phụ · Nhà sự kiện", 2]],
    build() {
      const t = (c, top) => ({ ...M, top });
      const v = [
        F1(8, 30, 16, 10, 0, "glass", "A", fP, t(0, "accent")), F1(24, 30, 16, 10, 0, "sheet", "C", fK, t(0, "gold")),
        F1(8, 40, 10, 28, 0, "sheet", "E", fD, t(0, "warn")), F1(30, 40, 10, 14, 0, "glass", "A", fP, t(0, "violet")), F1(30, 54, 10, 14, 0, "sheet", "B", fR, t(0, "accessC")),
        F1(8, 68, 12, 10, 0, "sheet", "C", fK, t(0, "gold")), F1(20, 68, 20, 10, 0, "sheet", "B", fR, t(0, "accent")),
        F1(12, 26, 20, 12, 1, "sheet", "D", fR, t(0, "warn")), F1(14, 46, 24, 10, 1, "sheet", "B", fR, t(0, "gold")), F1(28, 60, 12, 20, 1, "sheet", "B", fR, t(0, "violet")),
        F1(16, 32, 16, 20, 2, "sheet", "B", fR, t(0, "accent")), F1(20, 54, 16, 16, 2, "sheet", "B", fR, t(0, "warn")),
        F1(18, 42, 16, 16, 3, "sheet", "B", fR, t(0, "gold")),
        hall(8, 12, 16, 13, "stone")];
      const st = [...grid([8, 16, 24, 32, 40], [30, 40], 0.45, 4.95), ...grid([8, 18], [48, 56, 68], 0.45, 4.95), ...grid([30, 40], [48, 54, 62, 68], 0.45, 4.95), ...grid([8, 20, 30, 40], [78], 0.45, 4.95),
        ...posts(12, 26, 20, 12, 4.95, 9.45), ...posts(14, 46, 24, 10, 4.95, 9.45, 12), ...posts(28, 60, 12, 20, 4.95, 9.45),
        ...posts(16, 32, 16, 20, 9.45, 13.95), ...posts(20, 54, 16, 16, 9.45, 13.95), ...posts(18, 42, 16, 16, 13.95, 18.45), ...hallSt(8, 12, 16, 13)];
      return { v, st };
    }
  });

  /* ---------- 12.7 · Library of Birmingham ---------- */
  const oct = (cx, cy, r) => Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return [+(cx + r * Math.cos(a)).toFixed(3), +(cy + r * Math.sin(a)).toFixed(3)]; });
  I.push({
    id: "ch7", fam: "chong", code: "12.7", name: "Chân lùi, thân đua, vườn bậc và lồng đèn bát giác", rule: "Tương phản dưới nhẹ trên nặng, lùi dần lên đỉnh",
    tag: "Tầng trệt kính lùi sâu, tầng 2 là hộp lớn đua 8 m về quảng trường Bắc; các tầng trên lùi dần thành vườn bậc, đỉnh là lồng đèn đọc bát giác",
    ref: { name: "Library of Birmingham", by: "Mecanoo", year: "2013", place: "Centenary Square, Birmingham, Anh",
      award: "RIBA National Award 2014; Architects' Journal Building of the Year 2013; lọt vào chung khảo RIBA Stirling Prize",
      url: "https://www.mecanoo.nl/Projects/project/57",
      what: "Ba hộp chồng lên nhau, lùi dần lên đỉnh, phủ lớp lưới vòng kim loại; lối vào hai tầng nằm dưới một phần đua khoảng 11 m mở rộng quảng trường; các mái lùi là vườn trên cao, đỉnh là một phòng tròn mạ vàng.",
      take: "Mượn đế lùi vào và thân đua ra làm mái cho lối vào, rồi các tầng lùi dần thành vườn bậc. Rút phần đua về 8 m có dàn, đặt đỉnh là lồng đèn đọc bát giác thay phòng tròn để dễ làm mô hình." },
    story: "Đứng ở quảng trường Bắc nhìn lên: tầng trệt là một hộp kính lùi sâu vào trong, bên trên là hộp lớn tầng 2 vươn 8 m ra che lối vào. Từ đó các tầng lùi dần như bậc ruộng, mỗi bậc là một vườn cây đọc sách. Trên đỉnh là một lồng đèn bát giác màu vàng, ban đêm sáng như ngọn đèn đầu sông.",
    why: [W("Quy luật hình khối", "Tương phản dưới nhẹ trên nặng: chân kính nhỏ, thân lớn đua ra, rồi lùi dần lên đỉnh. Dáng như một kim tự tháp đặt ngược phần chân, nhìn rất có lực."),
      W("Khối chính – khối phụ", "Khối chính là chồng bốn tầng cùng lồng đèn cao +22,95 m, khoảng 79% diện tích sàn. Ba khối phụ thấp màu đá: nhà sự kiện ở đầu Nam, nhà thiếu nhi mái cỏ, lưng kho phía Tây."),
      sunW(" Phần đua 8 m che nắng cho sảnh kính; các vườn bậc có cây che nắng chiều cho phòng đọc."),
      W("Gió và mưa", "Vườn bậc quay về Nam đón gió Đông Nam mùa hè. Sảnh kính lùi sâu dưới phần đua nên mưa tạt Đông Bắc không vào tới cửa."),
      W("Công năng", "Tầng trệt: sảnh, cà phê, vệ sinh; tầng 2: phòng chuyên đề, kho sách, đọc mở; tầng 3–4: đọc; lồng đèn: phòng đọc tài liệu quý. Nhà sự kiện ở đầu Nam có lối riêng.")],
    kc: { he: "Khung bê tông lưới 8 m, cột thẳng một mạch qua bốn tầng. Tầng 2 là hộp có hai dàn thép cao một tầng ở hai mặt dài, gối lên cột của tầng trệt và đua 8 m về phía Bắc, 4 m về hai bên. Lồng đèn là khung thép bát giác trên lõi thang.", nhip: "8 m", cx: "8 m (tầng 2 về phía Bắc, có dàn)" },
    qa: [["Tầng 2 đua 8 m mà tầng trệt lại nhỏ, có lệch tải?", "Hai dàn cao một tầng chạy suốt 32 m của tầng 2, gối lên hai hàng cột trệt dài 22 m. Phần trên các tầng lùi vào giữa nên trọng tâm vẫn nằm trong chân."],
      ["Vườn bậc có thấm xuống phòng đọc?", "Mỗi vườn là sàn mái có lớp chống thấm, lớp thoát nước và đất 40 cm, thoát về máng ở mép. Cây chọn loại rễ nông."]],
    cut: "Tầng trệt: mica 8 × 11 cm cao 2,25 cm. Tầng 2: foam trắng 12 × 16 cm. Tầng 3: 11 × 14 cm; tầng 4: 8 × 9 cm; mái phủ bột cỏ. Lồng đèn: foam vàng cắt bát giác cạnh 2,3 cm, cao 2,25 cm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[24, 53, 22.95, "Khối chính · Chân lùi, thân đua, lồng đèn bát giác", 1], [24, 38, 9.45, "Thân đua 8 m che lối vào"], [33, 58, 13.95, "Vườn bậc"],
      [18, 82, 7.45, "Khối phụ · Nhà sự kiện", 2], [34, 79, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [9, 52, 4.95, "Khối phụ · Lưng kho phía Tây", 2]],
    build() {
      const v = [
        F1(16, 44, 16, 14, 0, "glass", "A", fP, M), F1(16, 58, 16, 8, 0, "sheet", "E", fK, M),
        F1(12, 36, 24, 10, 1, "sheet", "D", fR, { ...M, top: "grass" }), F1(12, 46, 8, 22, 1, "sheet", "C", fK, { ...M, top: "grass" }), F1(20, 46, 16, 22, 1, "sheet", "B", fR, { ...M, top: "grass" }),
        F1(13, 38, 22, 28, 2, "sheet", "B", fR, { ...M, top: "grass" }),
        F1(16, 44, 16, 18, 3, "sheet", "B", fR, { ...M, top: "grass" }),
        LO(oct(24, 53, 6), oct(24, 53, 6), 18.45, 22.95, "gold", "B", { fl: 1, top: "gold", ...M }),
        B(22, 50, 4, 6, 0.45, 18.45, "stone", "X", { top: "stoneTop", ...M }),
        hall(10, 76, 16, 12), low(28, 72, 12, 14, "stone", "B", fR), low(6, 40, 6, 14, "stone", "C", fD, { top: "stoneTop" }), low(6, 54, 6, 12, "stone", "E", fD, { top: "stoneTop" })];
      const st = [...grid([16, 24, 32], [44, 52, 60, 66], 0.45, 18.45), ...truss2(12, 36, 24, 32, 4.95, 9.45, "y", 8), ...grid([13, 35], [38, 46, 54, 62, 66], 9.45, 13.95),
        ...hallSt(10, 76, 16, 12), ...lowSt(28, 72, 12, 14, 1, 2), ...grid([6], [40, 48, 56, 64], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 12.8 · Odunpazarı Modern Museum ---------- */
  I.push({
    id: "ch8", fam: "chong", code: "12.8", name: "Phố hộp gỗ chồng nhô quanh giếng trời", rule: "Cụm lệch, cao dần vào tâm",
    tag: "Mười lăm hộp ốp gỗ to nhỏ khác nhau, tầng trên nhô ra 2 m như nhà phố cổ; cụm thấp ở mép, cao dần vào giữa, ôm một giếng trời bốn tầng",
    ref: { name: "Odunpazarı Modern Museum (OMM)", by: "Kengo Kuma and Associates", year: "2019", place: "Odunpazarı, Eskişehir, Thổ Nhĩ Kỳ",
      award: "International Project of the Year (trên 1 triệu bảng), Museums + Heritage Awards 2020",
      url: "https://www.architectmagazine.com/project-gallery/odunpazari-modern-museum_o/",
      what: "Các hộp gỗ nhiều kích thước xếp chồng, tầng trên nhô ra khỏi tầng dưới như những ngôi nhà gỗ thời Ottoman của khu phố cổ; khối thấp ở mép, cao dần vào giữa, quanh một giếng trời.",
      take: "Mượn cách nhô tầng trên như nhà phố cổ và cụm hộp cao dần vào tâm. Đặt trên lưới 2 m, mỗi lần nhô đúng 2 m để dầm gỗ hoặc thép đỡ được. Nhớ tới dãy nhà phố cổ Hội An bên sông, rất gần tinh thần Đà Nẵng." },
    story: "Thư viện như một góc phố cổ thu nhỏ: những hộp gỗ to nhỏ khác nhau chen nhau, tầng trên luôn nhô ra 2 m như ban công nhà phố. Ở mép cụm chỉ cao một, hai tầng cho vừa người đi bộ; vào giữa cao dần lên bốn tầng, ôm một giếng trời có mái kính. Đứng dưới giếng trời nhìn lên thấy các hộp chồng lệch như trong hẻm phố.",
    why: [W("Quy luật hình khối", "Cụm lệch, cao dần vào tâm: mỗi hộp là một căn nhà nhỏ, chồng lệch 2 m lên căn bên dưới. Không hộp nào giống hộp nào, nhưng tất cả cùng vật liệu gỗ và cùng lưới 2 m nên vẫn là một khối."),
      W("Khối chính – khối phụ", "Khối chính là cụm hộp gỗ cao +18,45 m, khoảng 86% diện tích sàn. Hai khối phụ hoàn toàn khác vật liệu: nhà sự kiện đá tối mái phẳng ở đầu Nam và nhà thiếu nhi đá thấp mái cỏ."),
      sunW(" Phần nhô 2 m của mỗi tầng che nắng cho cửa sổ tầng ngay dưới, như mái hiên nhà phố."),
      W("Gió và mưa", "Giếng trời giữa cụm có cửa chớp ở đỉnh, kéo khí nóng lên và thoát ra, gió Đông Nam vào từ khe giữa các hộp phía Nam. Các tầng nhô che mưa tạt cho tường gỗ bên dưới."),
      W("Công năng", "Tầng trệt: sảnh, cà phê, kho, vệ sinh chia thành các hộp nhỏ quanh giếng trời; tầng 2: phòng chuyên đề và đọc mở; tầng 3–4: đọc, hộp đỉnh là phòng đọc yên tĩnh có mái kính giếng trời.")],
    kc: { he: "Mỗi hộp là khung gỗ ghép (glulam) và sàn gỗ CLT, tầng trên nhô 2 m bằng dầm công xôn gỗ như nhà Ottoman và nhà phố cổ. Lõi thang bê tông ở giữa giữ ổn định. Mọi chỗ nhô đều 2 m, chỗ lệch nhất 4 m.", nhip: "8 m", cx: "2 m (mỗi tầng nhô); 4 m ở một hộp tầng 3" },
    qa: [["Nhà gỗ có chống cháy được không?", "Gỗ ghép tiết diện lớn cháy chậm và than hóa ở bề mặt, vẫn giữ được khả năng chịu lực theo thời gian thiết kế. Lõi thang bê tông là đường thoát hiểm; vẫn cần đối chiếu QCVN 06:2022/BXD."],
      ["Mười lăm hộp có làm mặt bằng rối?", "Các hộp nằm trên lưới 2 m và đều bám giếng trời, nên đi vòng quanh giếng trời là gặp mọi phòng. Mỗi hộp là một phòng hoặc một nhóm kệ sách rõ ràng."]],
    cut: "Mười lăm khối gỗ balsa hoặc foam dán giấy vân gỗ, cạnh 4–7 cm, dày 2,25 cm, dán chồng nhô 1 cm. Hộp đỉnh 7 × 7 cm có ô mica giếng trời. Khối phụ: foam đen, nhà sự kiện cao 3,5 cm.",
    roleOf: () => "p",
    lab: [[25, 51, 18.45, "Khối chính · Phố hộp gỗ chồng nhô", 1], [23, 52, 4.95, "Giếng trời bốn tầng"], [36, 38, 9.45, "Tầng trên nhô 2 m"],
      [16, 82, 7.45, "Khối phụ · Nhà sự kiện", 2], [32, 80, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2]],
    build() {
      const wd = (x, y, w, d, k, zone, fa = fR) => F1(x, y, w, d, k, "deck", zone, fa, { ...M, top: "deck" });
      const v = [
        wd(12, 34, 10, 14, 0, "A", fP), wd(22, 34, 12, 10, 0, "A", fP), wd(26, 44, 10, 14, 0, "E", fK), wd(12, 48, 8, 14, 0, "C", fK), wd(20, 58, 14, 10, 0, "E", fK), wd(12, 62, 8, 12, 0, "C", fK),
        wd(10, 32, 12, 16, 1, "D"), wd(24, 32, 12, 12, 1, "B"), wd(28, 44, 10, 16, 1, "B"), wd(10, 50, 10, 16, 1, "B"), wd(20, 60, 16, 10, 1, "B"),
        wd(14, 36, 12, 14, 2, "B"), wd(26, 40, 12, 12, 2, "B"), wd(16, 56, 14, 12, 2, "B"),
        wd(18, 44, 14, 14, 3, "B"),
        B(20, 48, 4, 6, 0.45, 18.45, "stone", "X", { top: "stoneTop", ...M }),
        hall(8, 76, 16, 13), low(26, 74, 12, 14, "stone", "B", fR)];
      const st = [...posts(12, 34, 10, 14, 0.45, 4.95), ...posts(22, 34, 12, 10, 0.45, 4.95), ...posts(26, 44, 10, 14, 0.45, 4.95), ...posts(12, 48, 8, 14, 0.45, 4.95), ...posts(20, 58, 14, 10, 0.45, 4.95), ...posts(12, 62, 8, 12, 0.45, 4.95),
        ...posts(10, 32, 12, 16, 4.95, 9.45), ...posts(24, 32, 12, 12, 4.95, 9.45), ...posts(28, 44, 10, 16, 4.95, 9.45), ...posts(10, 50, 10, 16, 4.95, 9.45), ...posts(20, 60, 16, 10, 4.95, 9.45),
        ...posts(14, 36, 12, 14, 9.45, 13.95), ...posts(26, 40, 12, 12, 9.45, 13.95), ...posts(16, 56, 14, 12, 9.45, 13.95), ...posts(18, 44, 14, 14, 13.95, 18.45),
        ...hallSt(8, 76, 16, 13), ...lowSt(26, 74, 12, 14)];
      return { v, st };
    }
  });
})(window.G3);
