
/* ================= Đợt 4 · 8. Cầu một trụ nghiêng: 5 biến thể phát triển từ 1.2 ================= */
/* Hướng thật lệch 20°: mặt sông (x = 41,5) nhìn Đông Đông Bắc, mặt phố Trần Phú nhìn Tây Tây Nam, đầu Nam nhìn Nam Đông Nam, đầu Bắc nhìn Bắc Tây Bắc. */
(function (G) {
  const { B, col, wall, seg, grid, range, zig } = G.K;
  const { FA, pylon, stays, cables } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I = G.ideas6;
  const fMain = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fLob = { N: "lam", E: "lam", S: "dua", W: "dac" }, fHall = { N: "dac", E: "lam", S: "dac", W: "dac" };
  const LV = k => 5.45 + 4.5 * k;
  // một tầng hộp đọc: khối chính, trắng, có lam
  const fl = (x, y, w, d, k, zone, fa = fMain) => B(x, y, w, d, LV(k), LV(k + 1), "sheet", zone, { fa, fl: 1, ...M });
  // khối phụ: một tầng, đá xám, mái cỏ
  const low = (x, y, w, d, zone, fa = FA.dac) => B(x, y, w, d, 0.45, 4.95, "stone", zone, { fa, fl: 1, top: "grass" });
  const hall = (x, y, w, d, fa = fHall) => B(x, y, w, d, 0.45, 6.95, "blk", "D", { fa, fl: 1, top: "grass" });
  const lobby = (x, y, w, d) => B(x, y, w, d, 0.45, 4.95, "glass", "A", { fa: fLob, fl: 1 });
  const core = (x, y, w, d, z2) => B(x, y, w, d, 0.45, z2, "stone", "X", { top: "stoneTop", ...M });
  const footing = (x, y) => B(x - 1.8, y - 2.2, 3.6, 4.4, 0, 0.45, "stone", "X", { top: "stoneTop", ...M });
  // điểm neo dọc một mép mái hộp: ax "y" giữ x cố định, ax "x" giữ y cố định
  const along = (fix, list, z, ax) => list.map(t => ax === "y" ? [fix, t, z] : [t, fix, z]);
  // nhà sự kiện: tường bao chịu lực, không cột giữa
  const shell = (x, y, w, d, z2) => [wall(x, y, w, 0.3, 0.45, z2), wall(x, y + d - 0.3, w, 0.3, 0.45, z2), wall(x, y, 0.3, d, 0.45, z2), wall(x + w - 0.3, y, 0.3, d, 0.45, z2)];
  const corners = (x, y, w, d, z1, z2) => grid([x, x + w], [y, y + d], z1, z2);

  /* ---------- 8.1 ---------- */
  I.push({
    id: "ng1", fam: "nghieng", code: "8.1", from: "1.2", name: "Trụ ngả Bắc, nhà sự kiện làm đối trọng", rule: "Bất đối xứng cân bằng (đòn gánh)",
    tag: "Trụ ngả về Bắc, dây néo vào mái nhà sự kiện nặng; hộp đọc 3 tầng treo đoạn giữa, hai đầu tựa lõi thang",
    story: "Giữ ý của phương án 1.2 và cầu Trần Thị Lý: một trụ bê tông ngả về phía Bắc, dây văng nửa quạt đỡ đoạn giữa của hộp đọc 3 tầng, hai đầu hộp tựa hai lõi thang. Khác 1.2, phía sau trụ có 4 dây néo kéo đỉnh trụ xuống mái nhà sự kiện. Nhà sự kiện thấp, tường và mái bê tông dày, làm cục đối trọng như đầu kia của đòn gánh.",
    why: [W("Quy luật hình khối", "Bất đối xứng cân bằng như đòn gánh: đầu Bắc là trụ cao mảnh và nhà sự kiện thấp nặng, đầu Nam là lõi thang đặc. Trụ ngả tạo hướng, hộp đọc nằm ngang giữ thăng bằng."),
      W("Khối chính – khối phụ", "Hộp đọc chiếm 70% sàn và 67% thể tích, đỉnh +18,95 m, cao gấp 2,7 lần khối phụ cao nhất (+6,95 m). Ba khối phụ chỉ một tầng, đá xám mái cỏ, nằm thấp dưới bóng hộp."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc, nắng sớm mùa hè chiếu gần thẳng góc nên hộp dùng lam đứng dày. Mặt phố Trần Phú nhìn Tây Tây Nam, nắng chiều mùa đông chiếu thẳng nên làm đặc. Đầu Bắc (Bắc Tây Bắc) kính trong lấy sáng tán xạ; đầu Nam (Nam Đông Nam) có mái đua."),
      W("Gió và mưa", "Gió Đông Nam mùa hè tới chủ yếu từ đầu Nam: gầm hộp cao 5 m mở về phía Nam cho gió lùa qua sảnh. Gió mùa Đông Bắc và mưa nay đập vào mặt sông, nên cửa sảnh phía sông nằm sâu dưới gầm hộp."),
      W("Công năng", "Nhà sự kiện ở đầu Bắc có cửa riêng ra quảng trường, chạy ngoài giờ không qua khu đọc. Sàn +5,45 của hộp: văn phòng và thiếu nhi gần thang máy; sàn +9,95: đọc mở; sàn +14,45: đọc yên tĩnh và phòng chuyên đề nhìn sông.")],
    kc: { he: "Hộp đọc 3 tầng: hai dàn thép cao 13,5 m ở hai mặt dọc, dầm sàn nhịp 16 m. Đoạn giữa hai lõi thang treo bằng 12 dây văng nửa quạt vào trụ bê tông ngả 9°, cao 38 m; hai đầu hộp tựa hai lõi thang bê tông, đầu Nam thêm hai cột. 4 dây néo sau neo vào tường và mái bê tông của nhà sự kiện.", nhip: "20 m giữa hai lõi thang, có dây văng đỡ thêm", cx: "4 m ở đầu Bắc qua lõi thang, dàn thép đỡ" },
    qa: [["Trụ nghiêng có đổ không?", "Không. Trụ ngả ra sau, về phía Bắc, ngược phía hộp đọc. Dây phía trước kéo đỉnh trụ về phía Nam, trọng lượng trụ ngả về Bắc kéo lại; 4 dây néo phía sau kéo đỉnh trụ xuống mái nhà sự kiện. Nhà sự kiện nặng, có móng cọc, như cục đá đè đầu đòn gánh."],
      ["Hộp 3 tầng có quá nặng cho một trụ?", "Trụ chỉ gánh đoạn giữa dài 20 m, hai đầu hộp tựa lõi thang. Mỗi mặt dọc hộp là một dàn thép cao 3 tầng nên rất cứng; dây chỉ cần neo ở mép mái, không cần neo từng tầng."]],
    cut: "Hộp đọc: 3 lớp foam trắng 8 × 20 × 2,25 cm. Trụ: que gỗ dài 19 cm, chân 0,8 × 1,3 cm vót còn 0,4 × 0,6 cm, cắm nghiêng 9° về phía Bắc. Nhà sự kiện: foam xám 12 × 6 × 3,25 cm. Sảnh: mica 7 × 9 × 2,25 cm. Dãy phía Tây: foam xám 3 × 24 × 2,25 cm. Hai lõi thang: foam xám 3 × 3 × 10 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[26, 58, 18.95, "Khối chính · Hộp đọc 3 tầng treo trên trụ nghiêng", 1], [26, 25.5, 38, "Trụ ngả Bắc 9°, cao 38 m"], [24, 19, 6.95, "Khối phụ · Nhà sự kiện, neo dây néo", 2], [30, 62, 4.95, "Khối phụ · Sảnh kính dưới gầm", 2], [9, 50, 4.95, "Khối phụ · Dãy kho, kỹ thuật phía Tây", 2]],
    build() {
      const P = pylon(26, 31.5, 0, 26, 25.5, 38, [1.6, 2.6], [0.8, 1.2], M);
      const v = [P, footing(26, 31.5),
        fl(18, 36, 16, 10, 0, "E"), fl(18, 46, 16, 30, 0, "B"), fl(18, 36, 16, 40, 1, "B"), fl(18, 36, 16, 30, 2, "B"), fl(18, 66, 16, 10, 2, "D"),
        core(15, 40, 6, 6, 20.45), core(15, 66, 6, 6, 20.45),
        hall(12, 13, 24, 12), lobby(19, 47, 14, 18), low(6, 34, 6, 28, "C"), low(6, 62, 6, 20, "E")];
      const ys = [48, 51, 54, 57, 60, 63];
      const cb = [...stays(P, 30, 37.5, along(18, ys, 18.95, "y"), [-0.35, 0]), ...stays(P, 30, 37.5, along(34, ys, 18.95, "y"), [0.35, 0]),
        ...stays(P, 34.5, 37.5, [[17, 15, 6.95], [17, 20, 6.95]], [-0.35, 0]), ...stays(P, 34.5, 37.5, [[35, 15, 6.95], [35, 20, 6.95]], [0.35, 0])];
      v.push(cables(cb));
      const st = [seg([26, 31.5, 0], [26, 25.5, 38]), ...cb, wall(15, 40, 6, 6, 0, 20.45), wall(15, 66, 6, 6, 0, 20.45),
        ...zig(18, 36, 18, 76, 5.45, 18.95, 8), ...zig(34, 36, 34, 76, 5.45, 18.95, 8), col(18, 76, 0.45, 5.45), col(34, 76, 0.45, 5.45),
        ...shell(12, 13, 24, 12, 6.95), ...corners(19, 47, 14, 18, 0.45, 4.95), ...grid([6, 12], range(34, 82, 8), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 8.2 ---------- */
  I.push({
    id: "ng2", fam: "nghieng", code: "8.2", from: "1.2", name: "Trụ ngả Nam, hộp vươn ra quảng trường", rule: "Hướng chuyển động ngược chiều",
    tag: "Trụ đứng trong vườn thiếu nhi phía Nam, ngả về Nam; hộp đọc 2 tầng dài 46 m vươn 4 m ra quảng trường Bắc",
    story: "Lật ngược phương án 1.2: trụ đứng trong vườn thiếu nhi phía Nam và ngả về phía Nam. Dây văng giữ nửa Nam của hộp đọc dài 46 m; đầu Bắc của hộp vươn qua lõi thang 4 m, nhô ra quảng trường làm mái đón khách. Dây néo sau neo xuống khối kho và kỹ thuật thấp ở cuối khu đất.",
    why: [W("Quy luật hình khối", "Hai hướng chuyển động ngược nhau: trụ ngả về Nam, hộp vươn về Bắc, như cần cẩu đang đưa hộp ra quảng trường. Hai lực ngược chiều giữ cho cả khối cân bằng."),
      W("Khối chính – khối phụ", "Hộp đọc dài 46 m chiếm 65% sàn và 63% thể tích, đỉnh +14,45 m, cao gấp 2 lần nhà sự kiện. Bốn khối phụ chỉ một tầng, đá xám mái cỏ, nằm bên dưới hoặc phía sau hộp."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc: hộp và sảnh dùng lam đứng. Mặt phố nhìn Tây Tây Nam: đặc, có nhà sự kiện và dãy kho che tầng 1. Đầu Bắc của hộp (Bắc Tây Bắc) kính trong nhìn quảng trường; đầu Nam có mái đua."),
      W("Gió và mưa", "Gió Đông Nam mùa hè tới từ đầu Nam, đi qua vườn thiếu nhi quanh chân trụ rồi lùa vào gầm hộp. Gió mùa Đông Bắc và mưa đập vào mặt sông: sảnh nằm dưới gầm hộp, cửa chính quay về quảng trường Bắc."),
      W("Công năng", "Nhà sự kiện ở góc Tây Bắc, cửa mở ra quảng trường, chạy ngoài giờ riêng. Sàn +5,45: phòng chuyên đề nhìn quảng trường ở đầu Bắc, đọc mở và khu thiếu nhi có thang xuống vườn; sàn +9,95: đọc yên tĩnh, học nhóm, tra cứu số. Kho và giao sách ở cuối khu đất, sát bãi xe.")],
    kc: { he: "Hộp đọc 2 tầng: hai dàn thép cao 9 m ở hai mặt dọc, dài 46 m. Nửa Nam treo bằng 12 dây văng nửa quạt vào trụ bê tông ngả 12°, cao 34 m; đầu Bắc và giữa hộp tựa hai lõi thang bê tông. 4 dây néo sau neo vào khối kho bê tông thấp ở cuối khu đất.", nhip: "26 m giữa hai lõi thang", cx: "4 m ở đầu Bắc, dàn thép cao 2 tầng" },
    qa: [["Trụ ngả về Nam có đổ về phía bãi xe không?", "Không. 12 dây văng phía trước kéo đỉnh trụ về phía Bắc, trọng lượng trụ ngả về Nam kéo ngược lại. Phần lực dư đi qua 4 dây néo xuống khối kho bê tông ở cuối khu đất; khối này nặng và có móng cọc, như cục đá chặn."],
      ["Đầu hộp nhô ra quảng trường có cần cột?", "Không. Đầu Bắc chỉ vươn 4 m qua lõi thang, nằm trong khả năng của dàn thép cao 9 m. Dưới đó cao 5 m, xe cứu hỏa vẫn vào quảng trường được."]],
    cut: "Hộp đọc: 2 lớp foam trắng 10 × 23 × 2,25 cm. Trụ: que gỗ dài 17,5 cm, chân 0,8 × 1,3 cm vót còn 0,4 × 0,6 cm, nghiêng 12° về phía Nam. Nhà sự kiện: foam xám 5,75 × 10 × 3,25 cm. Sảnh: mica 5,5 × 10 × 2,25 cm. Khối kho cuối đất: foam xám 14 × 6 × 2,25 cm. Dãy phía Tây: 3 × 16 × 2,25 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[28, 30, 14.45, "Khối chính · Hộp đọc vươn ra quảng trường", 1], [28, 69, 34, "Trụ ngả Nam 12°, cao 34 m"], [12, 24, 6.95, "Khối phụ · Nhà sự kiện", 2], [32, 40, 4.95, "Khối phụ · Sảnh kính", 2], [24, 82, 4.95, "Khối phụ · Kho, kỹ thuật, neo dây néo", 2], [9, 60, 4.95, "Khối phụ · Dãy phục vụ phía Tây", 2]],
    build() {
      const P = pylon(28, 62, 0, 28, 69, 34, [1.6, 2.6], [0.8, 1.2], M);
      const v = [P, footing(28, 62),
        fl(18, 8, 20, 10, 0, "D"), fl(18, 18, 20, 36, 0, "B"), fl(18, 8, 20, 46, 1, "B"),
        core(19, 12, 6, 6, 15.95), core(19, 44, 6, 6, 15.95),
        hall(6, 14, 11.5, 20), lobby(26, 24, 11, 20), low(6, 38, 6, 18, "C"), low(6, 56, 6, 14, "E"),
        low(10, 76, 14, 12, "C"), low(24, 76, 14, 12, "E", { N: "dac", E: "lam", S: "dua", W: "dac" })];
      const ys = [32, 36, 40, 44, 48, 52];
      const cb = [...stays(P, 26, 33.5, along(18, ys, 14.45, "y"), [-0.35, 0]), ...stays(P, 26, 33.5, along(38, ys, 14.45, "y"), [0.35, 0]),
        ...stays(P, 30.5, 33.5, [[18, 80, 4.95], [18, 85, 4.95]], [-0.35, 0]), ...stays(P, 30.5, 33.5, [[37, 80, 4.95], [37, 85, 4.95]], [0.35, 0])];
      v.push(cables(cb));
      const st = [seg([28, 62, 0], [28, 69, 34]), ...cb, wall(19, 12, 6, 6, 0, 15.95), wall(19, 44, 6, 6, 0, 15.95),
        ...zig(18, 8, 18, 54, 5.45, 14.45, 10), ...zig(38, 8, 38, 54, 5.45, 14.45, 10), col(18, 54, 0.45, 5.45), col(38, 54, 0.45, 5.45),
        ...shell(6, 14, 11.5, 20, 6.95), ...corners(26, 24, 11, 20, 0.45, 4.95), ...grid([6, 12], range(38, 70, 8), 0.45, 4.95), ...grid([10, 24, 38], [76, 88], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 8.3 ---------- */
  I.push({
    id: "ng3", fam: "nghieng", code: "8.3", from: "1.2", name: "Trụ giữa sân, hộp chữ L", rule: "Xoay vòng quanh một điểm",
    tag: "Trụ đứng giữa sân trong, ngả chéo về góc Tây Nam, treo mép trong của hộp đọc chữ L",
    story: "Hộp đọc gập thành chữ L ôm một sân trong. Trụ đứng giữa sân, ngả chéo về góc Tây Nam, xa cả hai cánh. Dây văng từ một đỉnh trụ xòe ra treo mép trong của hai cánh; mép ngoài tựa hàng cột dọc sông và dọc quảng trường. Ba dây néo sau kéo đỉnh trụ xuống dãy kho đá phía Tây.",
    why: [W("Quy luật hình khối", "Xoay vòng quanh một điểm: hai cánh hộp, nhà sự kiện và dãy kho xếp quanh trụ như cánh chong chóng. Trụ là tâm; mọi khối khác lệch về một phía của nó nên nhìn hơi lộn xộn mà vẫn có trật tự."),
      W("Khối chính – khối phụ", "Hộp chữ L chiếm 70% sàn và 68% thể tích, đỉnh +14,45 m, gấp 2 lần nhà sự kiện. Khối phụ một tầng, đá xám, nằm ở rìa khu đất, chừa sân trong rộng quanh chân trụ."),
      W("Nắng và chói", "Cánh dọc sông: mặt sông nhìn Đông Đông Bắc dùng lam đứng, hàng cột dưới mép sông tạo hiên sâu. Cánh Bắc: mặt Bắc Tây Bắc kính trong lấy sáng tán xạ. Mặt phố nhìn Tây Tây Nam là dãy kho đặc."),
      W("Gió và mưa", "Sân trong mở về phía Nam, đón gió Đông Nam mùa hè (tới chủ yếu từ đầu Nam). Gió mùa Đông Bắc và mưa từ phía sông bị cánh dọc sông chắn, sân trong khuất gió."),
      W("Công năng", "Cà phê dưới cánh Bắc mở ra quảng trường; sảnh dưới cánh dọc sông. Sân trong quanh chân trụ là vườn thiếu nhi, khuất xe và khuất gió. Nhà sự kiện ở góc Đông Nam, cửa riêng ra bậc thang Bạch Đằng. Kho và giao sách dọc lối Tây.")],
    kc: { he: "Mỗi cánh hộp 2 tầng có hai dàn thép cao 9 m ở hai mặt dọc. Mép trong của hai cánh treo bằng 10 dây văng vào trụ bê tông ngả 10°, cao 32 m; mép ngoài tựa hàng cột thép cách 8 m. Góc gập và đầu Nam tựa hai lõi thang. 3 dây néo sau neo vào tường dãy kho.", nhip: "16 m (dầm sàn từ hàng cột đến mép treo)", cx: "Không" },
    qa: [["Dây kéo về hai hướng, trụ có bị vặn không?", "Không. Bó dây cánh Bắc kéo về Bắc, bó dây cánh dọc sông kéo về Đông; hợp lực theo hướng Đông Bắc, đúng ngược hướng ngả của trụ (Tây Nam). Vì vậy trụ chủ yếu chịu nén dọc trục. 3 dây néo sau xuống dãy kho giữ thêm."],
      ["Trụ giữa sân có vướng chỗ thiếu nhi chơi?", "Chân trụ chỉ chiếm 3,6 × 4,4 m, làm luôn bồn cây và ghế ngồi. Trụ ngả về góc Tây Nam nên phần sân phía Đông Bắc rộng và thoáng."]],
    cut: "Cánh dọc sông: 2 lớp foam trắng 8 × 22 × 2,25 cm; cánh Bắc: 2 lớp 8 × 8 × 2,25 cm. Trụ: que gỗ vuông 0,9 cm vót còn 0,45 cm, dài 16 cm, nghiêng 10° về góc Tây Nam. Nhà sự kiện: foam xám 9 × 6,5 × 3,25 cm. Sảnh và cà phê: mica 5,75 × 9,75 và 6 × 5 cm, cao 2,25 cm. Dãy kho: foam xám 3 × 20 × 2,25 cm. Cột: que tre 2,5 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[32, 50, 14.45, "Khối chính · Hộp đọc chữ L", 1], [14, 54, 32, "Trụ giữa sân, ngả 10°"], [31, 80, 6.95, "Khối phụ · Nhà sự kiện", 2], [33, 54, 4.95, "Khối phụ · Sảnh kính", 2], [16, 32, 4.95, "Khối phụ · Cà phê dưới cánh Bắc", 2], [9, 70, 4.95, "Khối phụ · Dãy kho, neo dây néo", 2]],
    build() {
      const P = pylon(18, 50, 0, 14, 54, 32, [1.8, 1.8], [0.9, 0.9], M);
      const v = [P, footing(18, 50),
        fl(24, 24, 16, 10, 0, "D"), fl(24, 34, 16, 34, 0, "B"), fl(8, 24, 16, 16, 0, "E"), fl(24, 24, 16, 44, 1, "B"), fl(8, 24, 16, 16, 1, "B"),
        core(20, 38, 6, 6, 15.95), core(21, 60, 6, 6, 15.95),
        hall(22, 74, 18, 13, { N: "dac", E: "lam", S: "dua", W: "dac" }), lobby(26.5, 40, 11.5, 19.5), lobby(10, 27, 12, 10), low(6, 44, 6, 30, "C"), low(6, 74, 6, 10, "E")];
      const cb = [...stays(P, 24, 31, along(24, [45, 48.5, 52, 55.5, 59], 14.45, "y"), [0.45, 0]), ...stays(P, 24, 31, along(40, [9, 11.5, 14, 16.5, 19], 14.45, "x"), [0, -0.45]),
        ...stays(P, 27.5, 31, [[9, 66, 4.95], [9, 72, 4.95], [9, 78, 4.95]], [-0.45, 0.45])];
      v.push(cables(cb));
      const st = [seg([18, 50, 0], [14, 54, 32]), ...cb, wall(20, 38, 6, 6, 0, 15.95), wall(21, 60, 6, 6, 0, 15.95),
        ...zig(24, 24, 24, 68, 5.45, 14.45, 8), ...zig(40, 24, 40, 68, 5.45, 14.45, 8), ...zig(8, 24, 24, 24, 5.45, 14.45, 4), ...zig(8, 40, 24, 40, 5.45, 14.45, 4),
        ...range(24, 64, 8).map(y => col(40, y, 0.45, 5.45)), col(40, 68, 0.45, 5.45), col(8, 24, 0.45, 5.45), col(16, 24, 0.45, 5.45),
        ...shell(22, 74, 18, 13, 6.95), ...corners(26.5, 40, 11.5, 19.5, 0.45, 4.95), ...corners(10, 27, 12, 10, 0.45, 4.95), ...grid([6, 12], range(44, 84, 8), 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 8.4 ---------- */
  I.push({
    id: "ng4", fam: "nghieng", code: "8.4", from: "1.2", name: "Trụ ngả về phố, dây xòe qua mái", rule: "Tương phản trước – sau",
    tag: "Trụ mọc từ dãy đá phía Tây, ngả về Trần Phú; dây xòe qua mái giữ mép sông, gầm hộp phía sông không cột",
    story: "Trụ mọc lên từ dãy tường đá phía Tây, ngả nhẹ về phía Trần Phú. Từ đỉnh trụ, 14 sợi dây xòe như nan quạt qua mái hộp đọc, giữ cả mép sông của hộp. Nhờ vậy dọc mặt sông, dưới hộp không có cột nào: đứng ở bậc thang Bạch Đằng nhìn thấy cả sảnh. Đứng ở Trần Phú thì thấy trụ và dây trước, hộp phía sau.",
    why: [W("Quy luật hình khối", "Tương phản trước – sau: mặt phố là trụ đứng và tường đá đặc, nặng; mặt sông là hộp trắng nhẹ treo trên gầm thoáng. Một bên là nét thẳng đứng, một bên là khối nằm ngang."),
      W("Khối chính – khối phụ", "Hộp đọc chiếm 69% sàn và 66% thể tích, đỉnh +14,45 m, cao gấp 2 lần nhà sự kiện. Dãy đá phía Tây chỉ một tầng, làm chân cho trụ; nhà sự kiện và sảnh thấp, nằm khuất."),
      W("Nắng và chói", "Mặt phố nhìn Tây Tây Nam, nắng chiều mùa đông chiếu thẳng: dãy đá đặc che toàn bộ tầng 1, mặt Tây của hộp cũng đặc. Mặt sông nhìn Đông Đông Bắc: lam đứng dày, không kính trần. Đầu Bắc kính trong, đầu Nam mái đua."),
      W("Gió và mưa", "Gầm hộp không cột phía sông nên gió Đông Nam từ đầu Nam lùa thẳng qua sảnh. Mưa gió mùa Đông Bắc tạt vào mặt sông thì gầm hộp rộng 20 m che kín cửa sảnh."),
      W("Công năng", "Kho, nghiệp vụ, kỹ thuật nằm dọc dãy đá phía Tây, sát lối giao sách. Nhà sự kiện ở đầu Bắc, cửa ra quảng trường. Hộp đọc: sàn +5,45 có phòng chuyên đề, thiếu nhi và đọc mở; sàn +9,95 đọc yên tĩnh nhìn sông.")],
    kc: { he: "Trụ bê tông ngả 9° về phía Tây, cao 36 m, chân đúc liền với tường dày của dãy đá phía Tây; dãy này làm móng và đối trọng. 14 dây văng xòe qua mái giữ hai mép hộp; đầu Bắc và đầu Nam hộp tựa hai lõi thang phía Tây. Hai mặt dọc hộp là dàn thép cao 9 m.", nhip: "28 m giữa hai lõi thang, dây văng đỡ ở giữa", cx: "Không; mép sông treo bằng dây, không cột" },
    qa: [["Trụ ngả ra phố có đổ ra đường Trần Phú không?", "Không. Dây văng kéo đỉnh trụ về phía sông, trọng lượng trụ ngả về phía phố kéo ngược lại; hai lực gần cân nhau nên trụ chủ yếu chịu nén. Chân trụ đúc liền với tường dãy đá phía Tây, đặt trên móng cọc. Đỉnh trụ ở cao 36 m trên lối Tây, không cản xe."],
      ["Dây xòe qua mái có làm mái tối, khó dùng?", "Dây chỉ dày khoảng 10 cm và cách mái từ 6 đến 14 m. Mái hộp làm sân đọc ngoài trời thì dây thành một tấm lưới nhẹ phía trên, bóng đổ mảnh."]],
    cut: "Hộp đọc: 2 lớp foam trắng 10 × 23 × 2,25 cm. Trụ: que gỗ dài 18 cm, chân 0,8 × 1,3 cm vót còn 0,4 × 0,6 cm, nghiêng 9° về phía phố, cắm vào dãy đá. Dãy đá phía Tây: foam xám 3 × 27 × 2,25 cm. Nhà sự kiện: foam xám 10 × 6,5 × 3,25 cm. Sảnh: mica 6,5 × 10 × 2,25 cm. Dây: chỉ trắng, khâu xòe qua mái.",
    roleOf: () => "p",
    lab: [[27, 54, 14.45, "Khối chính · Hộp đọc nhìn sông, gầm không cột", 1], [5, 53, 36, "Trụ ngả về phố 9°, cao 36 m"], [22, 19, 6.95, "Khối phụ · Nhà sự kiện", 2], [28, 50, 4.95, "Khối phụ · Sảnh kính", 2], [9, 72, 4.95, "Khối phụ · Dãy đá phía Tây, chân trụ", 2]],
    build() {
      const P = pylon(11, 53, 0, 5, 53, 36, [1.6, 2.6], [0.8, 1.2], M);
      const v = [P,
        fl(16, 30, 20, 8, 0, "D"), fl(16, 38, 20, 38, 0, "B"), fl(16, 30, 20, 46, 1, "B"),
        core(14, 32, 6, 6, 15.95), core(14, 66, 6, 6, 15.95),
        hall(12, 13, 20, 13), lobby(21, 40, 13, 20), low(6, 30, 6, 26, "C"), low(6, 56, 6, 28, "E")];
      const cb = [...stays(P, 28, 35.5, along(16, [40, 43.5, 47, 50.5, 54, 57.5, 61, 64.5], 14.45, "y")), ...stays(P, 28, 35.5, along(36, [34, 42, 50, 58, 66, 74], 14.45, "y"), [0.3, 0])];
      v.push(cables(cb));
      const st = [seg([11, 53, 0], [5, 53, 36]), ...cb, wall(14, 32, 6, 6, 0, 15.95), wall(14, 66, 6, 6, 0, 15.95), wall(6, 30, 0.6, 54, 0.45, 4.95), wall(11.4, 30, 0.6, 54, 0.45, 4.95),
        ...zig(16, 30, 16, 76, 5.45, 14.45, 10), ...zig(36, 30, 36, 76, 5.45, 14.45, 10),
        ...shell(12, 13, 20, 13, 6.95), ...corners(21, 40, 13, 20, 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 8.5 ---------- */
  I.push({
    id: "ng5", fam: "nghieng", code: "8.5", from: "1.2", name: "Hộp nằm ngang, trụ ngả ra sông", rule: "Trục ngang cắt trục dọc",
    tag: "Hộp đọc 3 tầng nằm ngang khu đất, trụ ở mép sông ngả ra sông như cột buồm; hai mặt dài nhìn Bắc – Nam",
    story: "Xoay hộp đọc nằm ngang khu đất, chạy từ phía phố ra phía sông. Đầu phía phố tựa lõi thang đặc; đầu phía sông treo bằng dây văng vào một trụ đứng ngay mép bậc thang, ngả nhẹ ra sông như cột buồm. Hai mặt dài của hộp nhìn Bắc và Nam, hướng lấy sáng tốt nhất cho phòng đọc.",
    why: [W("Quy luật hình khối", "Trục ngang cắt trục dọc: khu đất dài theo bờ sông, hộp đọc lại nằm ngang, chĩa thẳng ra sông. Trụ đứng ở cuối trục như cột buồm; các khối phụ thấp xếp dọc khu đất phía sau."),
      W("Khối chính – khối phụ", "Hộp đọc 3 tầng chiếm 68% sàn và 65% thể tích, đỉnh +18,95 m, cao gấp 2,7 lần nhà sự kiện. Bốn khối phụ chỉ một tầng, đá xám mái cỏ."),
      W("Nắng và chói", "Mặt dài phía Bắc nhìn Bắc Tây Bắc: kính trong, ánh sáng tán xạ đều cho khu đọc. Mặt dài phía Nam nhìn Nam Đông Nam: mái đua mỗi tầng. Đầu hộp nhìn sông (Đông Đông Bắc) chỉ rộng 22 m, có lam đứng; đầu phía phố đặc."),
      W("Gió và mưa", "Gió Đông Nam mùa hè tới từ phía Nam, lùa qua sân giữa nhà sự kiện và nhà thiếu nhi rồi vào gầm hộp. Gió mùa Đông Bắc và mưa từ phía sông chỉ chạm đầu hẹp của hộp; gầm hộp làm hiên che lối vào từ bậc thang."),
      W("Công năng", "Lối chính từ bậc thang Bạch Đằng đi thẳng vào gầm hộp, ngay dưới chân trụ. Nhà thiếu nhi có vườn riêng phía Nam; nhà sự kiện giữa khu đất, có sân trước. Kho và kỹ thuật dọc mặt phố, giao sách từ lối Tây.")],
    kc: { he: "Hộp đọc 3 tầng dài 28 m: hai dàn thép cao 13,5 m ở hai mặt dài. Đầu phía phố tựa lõi thang bê tông 6 × 14 m; đầu phía sông treo bằng 12 dây văng nửa quạt vào trụ bê tông ngả 7° ra sông, cao 36 m. Lõi thang thứ hai nằm ở mặt Nam.", nhip: "22 m (dầm sàn giữa hai dàn), hộp dài 28 m", cx: "Không; đầu phía sông treo bằng dây" },
    qa: [["Trụ ngả ra sông có đổ xuống bậc thang không?", "Không. Toàn bộ dây văng kéo đỉnh trụ về phía phố; trụ ngả ra sông nên trọng lượng của nó kéo ngược lại, như người kéo dây thì ngả người ra sau. Chân trụ có móng cọc lớn dưới sân trước bậc thang."],
      ["Hộp ngắn nằm ngang có đủ chỗ đọc không?", "Ba tầng, mỗi tầng 616 m², tổng khoảng 1.850 m²: đủ toàn bộ khu đọc, phòng chuyên đề và văn phòng. Khu thiếu nhi tách ra nhà riêng ở phía Nam, gần vườn."]],
    cut: "Hộp đọc: 3 lớp foam trắng 14 × 11 × 2,25 cm. Trụ: que gỗ dài 18 cm, chân 0,8 × 1,3 cm vót còn 0,4 × 0,7 cm, nghiêng 7° ra phía sông. Lõi thang phía phố: foam xám 3 × 7 × 10 cm. Nhà sự kiện: foam xám 8 × 8 × 3,25 cm. Nhà thiếu nhi: 4 × 12 × 2,25 cm. Dãy kho: 3 × 18 × 2,25 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[20, 37, 18.95, "Khối chính · Hộp đọc nằm ngang, mặt dài nhìn Bắc – Nam", 1], [41, 37, 36, "Trụ ngả ra sông 7°, cao 36 m"], [22, 66, 6.95, "Khối phụ · Nhà sự kiện", 2], [22, 42, 4.95, "Khối phụ · Sảnh kính dưới gầm", 2], [36, 66, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [9, 70, 4.95, "Khối phụ · Dãy kho phía Tây", 2]],
    build() {
      const P = pylon(36.5, 37, 0, 41, 37, 36, [1.6, 2.6], [0.8, 1.4], M);
      const v = [P, footing(36.5, 37),
        fl(6, 26, 8, 22, 0, "E"), fl(14, 26, 20, 22, 0, "B"), fl(6, 26, 28, 22, 1, "B"), fl(6, 26, 20, 22, 2, "B"), fl(26, 26, 8, 22, 2, "D"),
        core(6, 30, 6, 14, 20.45), core(28, 44, 6, 6, 18.9),
        lobby(13.5, 29, 14, 16), hall(14, 58, 16, 16, { N: "dac", E: "dac", S: "dua", W: "dac" }), low(32, 54, 8, 24, "B", { N: "kinh", E: "lam", S: "dua", W: "dac" }),
        low(6, 50, 6, 22, "C"), low(6, 72, 6, 14, "E")];
      const xs = [10, 14, 18, 22, 26, 30];
      const cb = [...stays(P, 28, 35.5, along(26, xs, 18.95, "x"), [0, -0.5]), ...stays(P, 28, 35.5, along(48, xs, 18.95, "x"), [0, 0.5])];
      v.push(cables(cb));
      const st = [seg([36.5, 37, 0], [41, 37, 36]), ...cb, wall(6, 30, 6, 14, 0, 20.45), wall(28, 44, 6, 6, 0, 18.9),
        ...zig(6, 26, 34, 26, 5.45, 18.95, 7), ...zig(6, 48, 34, 48, 5.45, 18.95, 7),
        ...shell(14, 58, 16, 16, 6.95), ...corners(13.5, 29, 14, 16, 0.45, 4.95), ...grid([32, 40], range(54, 78, 8), 0.45, 4.95), ...grid([6, 12], range(50, 86, 9), 0.45, 4.95)];
      return { v, st };
    }
  });
})(window.G3);
