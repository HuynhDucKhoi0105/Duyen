
/* ================= Đợt 4 · Hộp trong hộp, bỏ vỏ ngoài: 8 biến thể (2 cho mỗi ý tưởng 5.1–5.4) ================= */
/* Hướng thật: đầu Bắc khu đất nhìn 340°, mặt sông 70°, đầu Nam 160°, mặt Trần Phú 250°. */
(function (G) {
  const { B, grid, range, zig } = G.K;
  const { F1 } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  // mặt đứng theo hướng thật: mặt sông lam, mặt Trần Phú đặc, đầu Nam mái đua, đầu Bắc kính lấy sáng tán xạ
  const fR = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khu đọc
  const fP = { N: "lam", E: "lam", S: "dua", W: "dac" }; // sảnh, cà phê
  const fK = { N: "dac", E: "lam", S: "dac", W: "dac" }; // kho, kỹ thuật, phòng sự kiện
  const fD = { N: "dac", E: "dac", S: "dac", W: "dac" };
  const fT = { N: "dac", E: "lam", S: "dua", W: "dac" }; // tường đá có khe cửa
  // khối phụ: nhà sự kiện cao 7 m (dàn mái, không cột giữa) và nhà thấp một tầng mái cỏ
  const hall = (x, y, w, d, c, o = {}) => B(x, y, w, d, 0.45, 7.45, c, "D", { fa: fK, fl: 1, top: "grass", ...o });
  const low = (x, y, w, d, c, zone, fa, o = {}) => B(x, y, w, d, 0.45, 4.95, c, zone, { fa, fl: 1, top: "grass", ...o });
  const hallSt = (x, y, w, d) => { const ys = range(y, y + d, d / 2); return [...grid([x, x + w], ys, 0.45, 7.45), ...ys.flatMap(t => zig(x, t, x + w, t, 6.45, 7.45, 4))]; };
  const lowSt = (x, y, w, d, nx = 2, ny = 2) => grid(range(x, x + w, w / nx), range(y, y + d, d / ny), 0.45, 4.95);
  const I = G.ideas6;
  const dir = "Đầu Bắc khu đất nhìn hướng Bắc Tây Bắc (340°), mặt sông nhìn Đông Đông Bắc (70°), đầu Nam nhìn Nam Đông Nam (160°), mặt Trần Phú nhìn Tây Tây Nam (250°).";

  /* ---------- 10.1 · từ 5.1 Vỏ lam ---------- */
  I.push({
    id: "hm1", fam: "hopmo", code: "10.1", from: "5.1", name: "Hộp lam, ba ngăn kéo màu", rule: "Khối cài, xuyên qua nhau", tag: "Hộp đọc ba tầng bọc lam, ba hộp màu trượt ra như ngăn kéo ở ba tầng, ba hướng",
    story: "Giữ từ 5.1 Vỏ lam: các hộp màu nằm trong một hộp lớn có lam. Bỏ lớp vỏ treo bên ngoài: hộp lớn giờ chính là khu đọc ba tầng, có sàn và cột thật. Ba hộp màu xuyên qua nó như ba ngăn kéo kéo dở: tầng 1 hộp vàng nhô 5 m ra phía sông làm cà phê, tầng 2 hộp xanh nhô 4 m ra hai đầu Bắc, Nam, tầng 3 hộp tím nhô 4 m ra hai mặt Đông, Tây. Nhìn từ ngoài vẫn đọc được ý hộp trong hộp, nhưng không còn lớp vỏ nào phải treo.",
    why: [W("Quy luật hình khối", "Khối cài: hộp lớn đứng yên, ba hộp nhỏ xuyên qua theo ba hướng khác nhau ở ba tầng. Mỗi ngăn kéo nhô đúng 4–5 m và nằm trên lưới cột 8 m, nên nhìn tự do nhưng vẫn có trật tự."),
      W("Khối chính – khối phụ", "Khối chính là hộp lam cao +13,95 m cùng ba ngăn kéo, chiếm khoảng 3/4 diện tích sàn. Bốn khối phụ chỉ cao một tầng, màu tối, mái cỏ: nhà sự kiện, phòng chuyên đề, nhà thiếu nhi và lưng kỹ thuật. Đứng ở đâu cũng thấy hộp lam là chính."),
      W("Nắng và chói", "Mặt sông nhìn Đông Đông Bắc (70°), nắng sáng mùa hè chiếu gần vuông góc nên mặt này và đầu các ngăn kéo đều có lam đứng. Mặt Trần Phú nhìn Tây Tây Nam (250°), hứng thẳng nắng chiều mùa đông nên đặc. Đầu Nam (160°) có mái đua; đầu Bắc (340°) dùng kính lấy sáng tán xạ cho khu đọc."),
      W("Gió và mưa", "Gió mùa hè Đông Nam thổi vào đầu Nam khu đất; khoảng trống giữa nhà thiếu nhi và hộp chính để mở cho gió vào. Gió mùa đông Đông Bắc kèm mưa đập chủ yếu vào mặt sông: ngăn kéo cà phê nhô ra và ngăn kéo tím phía trên che cho lối vào từ bờ sông."),
      W("Công năng", "Nhà sự kiện ở đầu Bắc có lối riêng từ quảng trường, chạy ngoài giờ. Tầng 1 hộp chính là sảnh, cà phê, kho và vệ sinh; tầng 2–3 là đọc; ngăn kéo tầng 3 là phòng đọc yên tĩnh. Thiếu nhi ở đầu Nam có vườn riêng.")],
    kc: { he: "Khung bê tông lưới 8 × 9 m, cột thẳng từ móng lên mái. Mỗi ngăn kéo là hộp khung thép chạy suốt chiều sâu hộp chính, gối lên các hàng dầm bên trong; phần nhô ra 4 m là dầm công xôn. Nhà sự kiện dùng dàn thép mái nhịp 14 m.", nhip: "14 m (mái nhà sự kiện)", cx: "4 m (ngăn kéo tầng 2 và tầng 3)" },
    qa: [["Ngăn kéo nhô 4 m có cần dây treo không?", "Không. Ngăn kéo chạy xuyên suốt hộp chính, gối lên 3–4 hàng cột bên trong; phần nhô 4 m chỉ khoảng 1/8 chiều dài ngăn kéo, dầm công xôn thường là đủ, như một ban công lớn."],
      ["Bỏ vỏ lam rồi thì lam ở đâu?", "Lam gắn thẳng vào mặt hộp đọc và đầu các ngăn kéo ở mặt sông. Không còn khung vỏ riêng nên tiết kiệm thép và dễ làm mô hình."]],
    cut: "Hộp chính: 3 lớp foam trắng 12 × 13,5 × 2,25 cm, khoét rãnh 4 cm cho ngăn kéo. Ngăn kéo: foam xanh 4 × 17,5 cm, foam tím 16 × 4 cm, foam vàng 10,5 × 4 cm, dày 2,25 cm. Khối phụ: foam đen cao 2,25 cm (nhà sự kiện 3,5 cm), phủ bột cỏ. Lam: que 2 mm.",
    roleOf: () => "p",
    lab: [[22, 54, 13.95, "Khối chính · Hộp lam, ba ngăn kéo màu", 1], [37, 46, 4.95, "Ngăn kéo cà phê nhô ra sông"], [22, 31.5, 9.45, "Ngăn kéo đọc nhô 4 m"], [36, 44, 13.95, "Ngăn kéo đọc yên tĩnh"],
      [17, 21, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [28, 22, 4.95, "Khối phụ · Phòng chuyên đề", 2], [21, 78, 4.95, "Khối phụ · Nhà thiếu nhi mái cỏ", 2], [8, 56, 4.95, "Khối phụ · Lưng kỹ thuật phía Tây", 2]],
    build() {
      const v = [
        F1(10, 34, 8, 27, 0, "sheet", "C", fK, M), F1(18, 34, 16, 8, 0, "sheet", "A", fP, M), F1(18, 42, 21, 8, 0, "gold", "A", fP, M), F1(18, 50, 16, 11, 0, "sheet", "E", fK, M),
        F1(10, 34, 8, 27, 1, "sheet", "B", fR, M), F1(26, 34, 8, 27, 1, "sheet", "B", fR, M), F1(18, 30, 8, 35, 1, "accent", "B", fR, M),
        F1(10, 34, 24, 6, 2, "sheet", "B", fR, M), F1(10, 48, 24, 13, 2, "sheet", "B", fR, M), F1(6, 40, 32, 8, 2, "violet", "B", fR, M),
        hall(10, 14, 14, 14, "blk"), low(24, 16, 8, 12, "blk", "D", fK), low(12, 70, 18, 16, "blk", "B", fR), low(6, 34, 4, 27, "stone", "E", fD, { top: "stoneTop" })];
      const st = [...grid([10, 18, 26, 34], [34, 43, 52, 61], 0.45, 13.95), ...grid([39], [42, 50], 0.45, 4.95), ...hallSt(10, 14, 14, 14), ...lowSt(24, 16, 8, 12, 1, 1), ...lowSt(12, 70, 18, 16), ...grid([6], [34, 43, 52, 61], 0.45, 4.95)];
      return { v, st };
    }
  });

  /* ---------- 10.2 · từ 5.1 Vỏ lam ---------- */
  I.push({
    id: "hm2", fam: "hopmo", code: "10.2", from: "5.1", name: "Sân lam ôm hộp đỏ", rule: "Bao và được bao", tag: "Hộp đọc chữ U ba tầng bọc lam, ôm một hộp đỏ thiếu nhi trong sân mở về phía Nam",
    story: "Giữ từ 5.1: hộp màu nằm bên trong hộp lam. Bỏ lớp vỏ: hộp lam được khoét một sân giữa mở về đầu Nam, và hộp đỏ đứng ngay trong sân đó. Hộp đỏ là phòng đọc thiếu nhi một tầng, xung quanh là sân chơi được ba cánh nhà che chắn. Đứng ở bãi xe phía Nam nhìn vào thấy rõ hộp nhỏ nằm trong lòng hộp lớn.",
    why: [W("Quy luật hình khối", "Bao và được bao: hộp lớn chữ U ôm hộp nhỏ, khoảng hở 2 m quanh hộp đỏ giữ cho hai hộp tách bạch. Ba cánh chữ U cùng cao, cùng lam nên đọc thành một khối."),
      W("Khối chính – khối phụ", "Khối chính là chữ U cao ba tầng, khoảng 84% diện tích sàn. Khối phụ: hộp đỏ thiếu nhi một tầng trong sân, nhà sự kiện mái cỏ và phòng chuyên đề thấp ở đầu Bắc. Hộp đỏ nhỏ và thấp nên làm điểm nhấn chứ không tranh với khối chính."),
      W("Nắng và chói", "Cánh Đông nhìn ra sông (70°): lam đứng chặn nắng sáng mùa hè. Cánh Tây nhìn Trần Phú (250°): tường đặc chặn nắng chiều mùa đông. Mặt quay vào sân dùng lam và mái đua. Mặt Bắc (340°) kính lấy sáng tán xạ cho khu đọc."),
      W("Gió và mưa", "Sân mở về đầu Nam, đúng phía gió mùa hè Đông Nam thổi vào, gió lùa qua sân lên các tầng đọc. Mùa đông gió mưa Đông Bắc đập vào mặt sông; sân nằm khuất sau cánh Đông nên trẻ em vẫn chơi được."),
      W("Công năng", "Thanh Bắc là sảnh và văn phòng; cánh Tây là kho, nghiệp vụ sát lối Tây; cánh Đông tầng 1 đọc báo nhìn sông; tầng 2–3 là đọc. Trẻ em chơi trong sân kín, phụ huynh ngồi đọc ở cánh nhà nhìn xuống.")],
    kc: { he: "Khung bê tông lưới 7 × 12 m, cột thẳng một mạch. Thanh Bắc dùng dầm nhịp 12 m qua chỗ mở sân. Hộp đỏ là khung thép nhẹ riêng, mái phẳng. Nhà sự kiện dùng dàn thép mái nhịp 14 m.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Sân giữa có tối và nóng không?", "Sân rộng 12 m, mở phía trên và phía Nam, nên nắng trưa vào được và gió Đông Nam thổi qua. Hộp đỏ chỉ cao 4,5 m, thấp hơn nhiều so với nhà xung quanh cao 13,5 m."],
      ["Hộp đỏ đứng thế nào?", "Đứng thẳng trên nền sân bằng 6 cột riêng, không dựa vào nhà chính, nên không cần dầm treo hay chi tiết đặc biệt nào."]],
    cut: "Chữ U: 3 lớp foam trắng 13 × 20 × 2,25 cm, khoét sân 6 × 13 cm. Hộp đỏ: foam đỏ 4 × 7 × 2,25 cm. Nhà sự kiện: foam đen 7 × 7 × 3,5 cm phủ bột cỏ. Lam: que 2 mm mỗi 7,5 mm.",
    roleOf: () => "p",
    lab: [[22, 33, 13.95, "Khối chính · Hộp lam chữ U ôm sân", 1], [22, 53, 4.95, "Khối phụ · Hộp đỏ đọc thiếu nhi giữa sân", 2], [16, 19, 7.45, "Khối phụ · Nhà sự kiện", 2], [27, 20, 4.95, "Khối phụ · Phòng chuyên đề", 2], [22, 64.5, 0.5, "Sân mở về phía Nam"]],
    build() {
      const fE = { N: "kinh", E: "lam", S: "dua", W: "lam" }, fWa = { N: "kinh", E: "lam", S: "dua", W: "dac" };
      const v = [
        F1(9, 26, 16, 14, 0, "sheet", "A", fP, M), F1(25, 26, 10, 14, 0, "sheet", "E", fK, M), F1(9, 40, 7, 26, 0, "sheet", "C", fK, M), F1(28, 40, 7, 26, 0, "sheet", "B", fE, M),
        F1(9, 26, 10, 14, 1, "sheet", "E", fK, M), F1(19, 26, 16, 14, 1, "sheet", "B", fR, M), F1(9, 40, 7, 26, 1, "sheet", "C", fK, M), F1(28, 40, 7, 26, 1, "sheet", "B", fE, M),
        F1(9, 26, 26, 14, 2, "sheet", "B", fR, M), F1(9, 40, 7, 26, 2, "sheet", "B", fWa, M), F1(28, 40, 7, 26, 2, "sheet", "B", fE, M),
        low(18, 46, 8, 14, "warn", "B", { N: "kinh", E: "lam", S: "dua", W: "lam" }, { top: "warn" }), hall(9, 12, 14, 14, "blk"), low(23, 14, 8, 12, "blk", "D", fK)];
      const st = [...grid([9, 16, 28, 35], [26, 33, 40, 48.67, 57.33, 66], 0.45, 13.95), ...lowSt(18, 46, 8, 14), ...hallSt(9, 12, 14, 14), ...lowSt(23, 14, 8, 12, 1, 1)];
      return { v, st };
    }
  });

  /* ---------- 10.3 · từ 5.2 Khung hở, hộp xuyên khung ---------- */
  I.push({
    id: "hm3", fam: "hopmo", code: "10.3", from: "5.2", name: "Ba tầng đọc kéo lệch", rule: "Lệch có kiểm soát trên lưới", tag: "Ba sàn đọc là ba hộp chồng lên nhau, tầng giữa trượt 4 m ra phía sông và phía Nam",
    story: "Giữ từ 5.2: lưới cột 8 m và các hộp lệch nhau giữa các tầng. Bỏ bộ khung lồng bao ngoài: chính ba sàn đọc là ba hộp. Tầng 1 và tầng 3 thẳng nhau, tầng 2 trượt 4 m về phía sông và 4 m về phía Nam như ngăn tủ đang mở. Phần nhô ra thành mái hiên cho tầng 1, phần lõm vào thành ban công cho tầng 3.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: chỉ tầng giữa lệch, lệch đúng nửa bước lưới (4 m) theo hai phương. Cột vẫn thẳng từ móng lên mái; chỗ tầng 2 lùi lại, cột lộ ra như hàng hiên."),
      W("Khối chính – khối phụ", "Khối chính là ba tầng đọc chồng lệch, khoảng 3/4 diện tích sàn, cao +13,95 m. Bốn khối phụ thấp một tầng ốp đá: nhà sự kiện, phòng chuyên đề, nhà thiếu nhi, lưng kỹ thuật. Không khối phụ nào cao quá nửa khối chính."),
      W("Nắng và chói", "Tầng 2 nhô 4 m về mặt sông (70°) làm mái che nắng sáng cho sảnh tầng 1; mặt nhô ra có lam đứng. Mặt Trần Phú (250°) đặc. Tầng 2 nhô về đầu Nam (160°) che nắng trưa cho mặt Nam tầng 1. Đầu Bắc (340°) kính cho khu đọc."),
      W("Gió và mưa", "Hiên dưới tầng 2 ở mặt sông là chỗ đứng tránh mưa khi gió Đông Bắc mùa đông thổi từ sông vào. Đầu Nam để trống, đón gió Đông Nam mùa hè vào sảnh."),
      W("Công năng", "Tầng 1: sảnh, cà phê nhìn sông, kho và văn phòng phía Tây. Tầng 2: đọc mở, nhô ra sông. Tầng 3: đọc yên tĩnh, có ban công ở phía Bắc và phía Tây chỗ tầng dưới lùi vào. Sự kiện ở đầu Bắc, thiếu nhi ở đầu Nam.")],
    kc: { he: "Khung bê tông lưới 8 × 7 m. Tầng 2 nhô 4 m bằng dầm công xôn trên hàng cột biên. Ở mặt Bắc và mặt Tây, cột tầng 3 đi xuyên qua hiên tầng 2 xuống móng, không có dầm chuyển.", nhip: "14 m (mái nhà sự kiện)", cx: "4 m (tầng 2)" },
    qa: [["Tầng 2 nhô ra hai phía có bị lật không?", "Không. Tầng 2 vẫn gối lên 15 cột của lưới, phần nhô chỉ 4 m mỗi phía. Tầng 3 đè lên giữa tầng 2 và kéo thẳng các cột xuống, càng giữ chắc thêm."],
      ["Cột lộ ra ở hiên tầng 2 có vướng?", "Hàng cột này nằm ở mép ban công, cách nhau 7–8 m, làm luôn chỗ gắn lan can và chậu cây."]],
    cut: "Ba tấm foam trắng 12 × 14 × 2,25 cm, tấm giữa dán lệch 2 cm về phía sông và 2 cm về phía Nam. Khối phụ: foam xám cao 2,25 cm (nhà sự kiện 3,5 cm). Cột hiên: que tre 3 mm.",
    roleOf: () => "p",
    lab: [[22, 44, 13.95, "Khối chính · Ba tầng đọc kéo lệch 4 m", 1], [36, 50, 9.45, "Tầng 2 nhô 4 m che hiên sông"], [17, 20, 7.45, "Khối phụ · Nhà sự kiện", 2], [28, 21, 4.95, "Khối phụ · Phòng chuyên đề", 2], [22, 75, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [9, 73, 4.95, "Khối phụ · Kỹ thuật, vệ sinh", 2]],
    build() {
      const v = [
        F1(22, 30, 12, 28, 0, "sheet", "A", fP, M), F1(10, 30, 12, 10, 0, "sheet", "E", fK, M), F1(10, 40, 12, 18, 0, "sheet", "C", fK, M),
        F1(14, 34, 24, 28, 1, "sheet", "B", fR, M), F1(10, 30, 24, 28, 2, "sheet", "B", fR, M),
        hall(10, 13, 14, 14, "stone", { top: "grass" }), low(24, 15, 8, 12, "stone", "D", fK), low(14, 68, 16, 14, "stone", "B", fR), low(6, 62, 6, 22, "stone", "E", fD)];
      const st = [...grid([10, 18, 26, 34], [30, 37, 44, 51, 58], 0.45, 13.95), ...hallSt(10, 13, 14, 14), ...lowSt(24, 15, 8, 12, 1, 1), ...lowSt(14, 68, 16, 14), ...lowSt(6, 62, 6, 22, 1, 2)];
      return { v, st };
    }
  });

  /* ---------- 10.4 · từ 5.2 Khung hở, hộp xuyên khung ---------- */
  I.push({
    id: "hm4", fam: "hopmo", code: "10.4", from: "5.2", name: "Thanh đỏ xuyên hộp", rule: "Tương phản ngang – đứng, khối xuyên", tag: "Một thanh sảnh đỏ một tầng xuyên qua chân hộp đọc, nối lối Tây ra bậc thang sông",
    story: "Giữ từ 5.2: hộp chui qua khung. Bỏ khung lồng: giờ một thanh hộp đỏ dài 34 m chui thẳng qua chân hộp đọc ba tầng, đầu Tây ló ra lối Tây, đầu Đông ló ra 6 m phía bậc thang sông. Bên trong thanh đỏ là sảnh, trưng bày và cà phê, như một con phố có mái đi xuyên qua thư viện.",
    why: [W("Quy luật hình khối", "Tương phản ngang – đứng: thanh đỏ dài, thấp, nằm ngang; hộp đọc vuông, cao, đứng. Thanh xuyên qua đúng chân hộp nên hai khối khóa vào nhau."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc ba tầng cao +13,95 m, khoảng 3/4 diện tích sàn. Thanh đỏ chỉ cao 4,5 m; nhà sự kiện, phòng chuyên đề và nhà kho cũng thấp một tầng. Màu đỏ chỉ dùng cho thanh xuyên, các khối phụ khác ốp đá."),
      W("Nắng và chói", "Mặt sông của hộp đọc (70°) lam đứng; đầu thanh đỏ phía sông có lam. Mặt Trần Phú (250°) đặc, đầu thanh phía Tây cũng có lam chặn nắng chiều mùa đông. Đầu Nam (160°) mái đua, đầu Bắc (340°) kính cho khu đọc."),
      W("Gió và mưa", "Thanh đỏ chạy Đông – Tây, mở hai đầu nên mùa hè mở cửa cho gió lùa. Mùa đông gió mưa Đông Bắc thổi vào đầu Đông của thanh; cửa ở đầu này lùi vào trong 2 m sau lớp lam."),
      W("Công năng", "Người đi từ lối Tây và từ bậc thang sông đều vào thẳng thanh sảnh. Hai bên thanh: phía Bắc là vệ sinh, văn phòng; phía Nam là kho nhỏ và góc thiếu nhi. Tầng 2–3 đọc. Kho sách chính ở khối phụ phía Nam, sát dốc giao sách.")],
    kc: { he: "Khung bê tông lưới 11 × 6–8 m, cột thẳng một mạch. Thanh đỏ là khung thép một tầng; đoạn nằm dưới hộp đọc chỉ là vách và trần, tải hộp đọc đi qua hai hàng cột ở hai mép thanh xuống móng.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Hộp đọc đè lên thanh đỏ, thanh có phải gánh tải?", "Không. Hai hàng cột của hộp đọc chạy dọc hai mép thanh, cách nhau 8 m; tải đi thẳng xuống móng, thanh đỏ chỉ là vách nhẹ đi giữa hai hàng cột."],
      ["Vì sao thanh ló ra phía sông 6 m?", "Để làm mái hiên và cửa vào từ bậc thang Bạch Đằng; người ở bờ sông nhìn thấy ngay lối vào màu đỏ."]],
    cut: "Hộp đọc: foam trắng 11 × 16 × 6,75 cm, khoét rãnh 4 × 2,25 cm ở chân. Thanh đỏ: foam đỏ 17 × 4 × 2,25 cm luồn qua rãnh. Khối phụ: foam xám cao 2,25 cm (nhà sự kiện 3,5 cm).",
    roleOf: () => "p",
    lab: [[23, 56, 13.95, "Khối chính · Hộp đọc ba tầng", 1], [38, 46, 4.95, "Khối phụ · Thanh sảnh đỏ xuyên hộp", 2], [19, 20, 7.45, "Khối phụ · Nhà sự kiện", 2], [30, 21, 4.95, "Khối phụ · Phòng chuyên đề", 2], [20, 72, 4.95, "Khối phụ · Kho sách, nghiệp vụ", 2]],
    build() {
      const v = [
        F1(12, 30, 22, 12, 0, "sheet", "E", fK, M), F1(12, 50, 10, 12, 0, "sheet", "C", fK, M), F1(22, 50, 12, 12, 0, "sheet", "B", fR, M),
        F1(12, 30, 22, 32, 1, "sheet", "B", fR, M), F1(12, 30, 22, 32, 2, "sheet", "B", fR, M),
        low(6, 42, 34, 8, "warn", "A", { N: "lam", E: "lam", S: "dua", W: "lam" }, { top: "warn" }),
        hall(12, 13, 14, 14, "stone"), low(26, 15, 8, 12, "stone", "D", fK), low(14, 66, 12, 12, "stone", "C", fK)];
      const st = [...grid([12, 23, 34], [30, 36, 42, 50, 56, 62], 0.45, 13.95), ...grid([6, 40], [42, 50], 0.45, 4.95), ...hallSt(12, 13, 14, 14), ...lowSt(26, 15, 8, 12, 1, 1), ...lowSt(14, 66, 12, 12)];
      return { v, st };
    }
  });

  /* ---------- 10.5 · từ 5.3 Hai vỏ lệch ---------- */
  I.push({
    id: "hm5", fam: "hopmo", code: "10.5", from: "5.3", name: "Hộp lớn ven sông, hộp nhỏ ven phố", rule: "Bất đối xứng cân bằng", tag: "Hộp đọc lớn lệch về góc sông – Nam, hộp sự kiện nhỏ lệch về góc phố – Bắc, nối bằng hiên kính thấp",
    story: "Giữ từ 5.3: một vỏ lớn, một vỏ nhỏ đặt lệch nhau, nối bằng cầu kính. Bỏ hai lớp vỏ: hai hộp bên trong trở thành nhà thật. Hộp đọc lớn ba tầng đứng ở góc Đông Nam nhìn sông; hộp sự kiện nhỏ màu đỏ đứng ở góc Tây Bắc gần phố. Cầu kính hạ xuống mặt đất thành một hiên kính một tầng nối hai hộp, không cần treo.",
    why: [W("Quy luật hình khối", "Bất đối xứng cân bằng: khối lớn ở một góc, khối nhỏ ở góc chéo đối diện, như hai đầu đòn gánh. Hiên kính thấp nằm giữa làm điểm tựa."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc trắng cao +13,95 m, khoảng 77% diện tích sàn. Khối phụ là hộp sự kiện đỏ cao 7 m, hiên kính và nhà thiếu nhi một tầng. Hộp chính cao gần gấp đôi khối phụ cao nhất."),
      W("Nắng và chói", "Mặt sông (70°) của hộp đọc lam đứng. Mặt Trần Phú (250°) là kho và vệ sinh, tường đặc. Hộp sự kiện đặc gần hết, chỉ mở lam về phía sông. Đầu Nam (160°) của hộp đọc có mái đua, đầu Bắc (340°) có kính cho khu đọc."),
      W("Gió và mưa", "Hộp đọc lùi lên giữa khu đất, chừa sân trống ở đầu Nam cho gió Đông Nam mùa hè. Hiên kính nằm khuất giữa hai hộp nên mùa đông gió mưa Đông Bắc từ sông không thổi thẳng vào cửa."),
      W("Công năng", "Nhà sự kiện ở đầu Bắc, cạnh quảng trường, chạy ngoài giờ độc lập. Hiên kính là sảnh chung. Hộp đọc: tầng 1 sảnh đọc, cà phê, kho; tầng 2–3 đọc. Thiếu nhi ở góc Tây Nam có vườn riêng.")],
    kc: { he: "Hộp đọc: khung bê tông lưới 10–12 × 7,5 m. Hộp sự kiện: tường bê tông chịu lực, dàn thép mái nhịp 16 m, không cột giữa. Hiên kính: khung thép nhẹ một tầng.", nhip: "16 m (mái hộp sự kiện)", cx: "Không" },
    qa: [["Cầu kính cũ bị bỏ, hai hộp nối thế nào?", "Nối ở tầng 1 bằng hiên kính dài 7 m. Đi trên mặt đất nên không cần dầm treo, người đi xe lăn đi thẳng không qua dốc."],
      ["Hộp sự kiện cao 7 m có cần cột giữa?", "Không. Phòng 16 × 18 m dùng dàn thép mái cao 1 m gác lên hai tường dọc, phòng đa năng trống hoàn toàn."]],
    cut: "Hộp đọc: foam trắng 11 × 15 × 6,75 cm. Hộp sự kiện: foam đỏ 8 × 9 × 3,5 cm. Hiên kính: mica 7 × 3,5 × 2,25 cm. Nhà thiếu nhi: foam xanh 6 × 8 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[27, 60, 13.95, "Khối chính · Hộp đọc lớn ven sông", 1], [14, 22, 7.45, "Khối phụ · Hộp sự kiện nhỏ ven phố", 2], [24, 34.5, 4.95, "Khối phụ · Hiên kính nối", 2], [14, 80, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const v = [
        F1(16, 38, 10, 30, 0, "sheet", "C", fK, M), F1(26, 38, 12, 16, 0, "sheet", "A", fP, M), F1(26, 54, 12, 14, 0, "sheet", "E", fK, M),
        F1(16, 38, 4, 30, 1, "sheet", "E", fK, M), F1(20, 38, 18, 30, 1, "sheet", "B", fR, M), F1(16, 38, 22, 30, 2, "sheet", "B", fR, M),
        hall(6, 13, 16, 18, "warn", { top: "warn" }), low(14, 31, 14, 7, "glass", "A", { N: "lam", E: "lam", S: "dua", W: "lam" }, { top: "glass" }), low(8, 72, 12, 16, "accessC", "B", fR)];
      const st = [...grid([16, 26, 38], [38, 45.5, 53, 60.5, 68], 0.45, 13.95), ...hallSt(6, 13, 16, 18), ...grid([14, 28], [31], 0.45, 4.95), ...lowSt(8, 72, 12, 16)];
      return { v, st };
    }
  });

  /* ---------- 10.6 · từ 5.3 Hai vỏ lệch ---------- */
  I.push({
    id: "hm6", fam: "hopmo", code: "10.6", from: "5.3", name: "Hai hộp màu cài hai góc chéo", rule: "Đối xứng tâm (xoay 180°)", tag: "Hộp đọc ba tầng bị hai hộp màu cài vào hai góc chéo: hộp đỏ sự kiện góc Đông Bắc, hộp xanh thiếu nhi góc Tây Nam",
    story: "Giữ từ 5.3: hai vỏ đặt lệch nhau. Bỏ vỏ: giờ là một hộp đọc lớn được khoét hai góc chéo ở tầng 1, và hai hộp màu cắm vào hai chỗ khoét đó rồi trồi ra ngoài. Xoay hình 180° quanh tâm nhà thì hộp đỏ và hộp xanh đổi chỗ cho nhau.",
    why: [W("Quy luật hình khối", "Đối xứng tâm: hộp đỏ và hộp xanh cùng kích thước mặt bằng, đặt đối nhau qua tâm hộp đọc. Tổng thể tĩnh nhưng bốn mặt đứng khác nhau, nhìn sinh động."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc trắng ba tầng, khoảng 78% diện tích sàn. Hai khối phụ màu chỉ cao 7 m và 4,5 m, cắm vào chân khối chính nên rõ là phần đi theo."),
      W("Nắng và chói", "Mặt sông (70°) lam đứng; hộp đỏ ở góc Đông Bắc gần như đặc vì là phòng hội thảo, chiếu phim. Mặt Trần Phú (250°) đặc. Hộp xanh thiếu nhi ở góc Tây Nam mở về phía Nam (160°) có mái đua."),
      W("Gió và mưa", "Hộp đỏ ở góc Đông Bắc chắn bớt gió mưa mùa đông thổi từ sông và từ phía Bắc vào sảnh. Hộp xanh ở góc Tây Nam chừa trống phía Đông Nam cho gió mùa hè vào sân thiếu nhi."),
      W("Công năng", "Sự kiện ở góc Bắc, gần quảng trường, có tiền sảnh riêng cài vào nhà. Thiếu nhi ở góc Nam, gần bãi xe đón con. Sảnh chính chạy xuyên giữa nhà từ lối Tây ra sông. Tầng 2–3 đọc.")],
    kc: { he: "Khung bê tông lưới 8 × 10 m, cột thẳng một mạch. Phần hộp đọc nằm trên hai chỗ khoét gối lên cột ở góc khoét, không có dầm chuyển. Hộp đỏ: dàn thép mái nhịp 14 m.", nhip: "14 m (mái hộp đỏ)", cx: "Không" },
    qa: [["Hộp đọc đè lên chỗ khoét có an toàn?", "Mỗi góc khoét rộng 8 × 10 m, đúng một ô lưới. Cột ở góc ô vẫn chạy thẳng từ mái xuống móng, đi xuyên qua hộp màu; hộp màu chỉ lấp vào ô trống."],
      ["Đối xứng tâm có cứng nhắc không?", "Hai hộp khác màu, khác công năng và khác chiều cao, nên chỉ đối xứng về vị trí; nhìn vẫn không đơn điệu."]],
    cut: "Hộp đọc: 3 lớp foam trắng 12 × 15 × 2,25 cm, lớp dưới khoét hai góc 4 × 5 cm. Hộp đỏ: foam đỏ 7 × 7 × 3,5 cm và 4 × 5 × 2,25 cm. Hộp xanh: foam xanh 7 × 7 × 2,25 cm và 4 × 5 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[22, 45, 13.95, "Khối chính · Hộp đọc ba tầng", 1], [29, 23, 7.45, "Khối phụ · Hộp đỏ sự kiện cài góc Đông Bắc", 2], [15, 67, 4.95, "Khối phụ · Hộp xanh thiếu nhi cài góc Tây Nam", 2]],
    build() {
      const v = [
        F1(10, 30, 16, 10, 0, "sheet", "C", fK, M), F1(10, 40, 24, 10, 0, "sheet", "A", fP, M), F1(18, 50, 16, 10, 0, "sheet", "E", fK, M),
        F1(10, 30, 6, 15, 1, "sheet", "C", fK, M), F1(10, 45, 6, 15, 1, "sheet", "E", fK, M), F1(16, 30, 18, 30, 1, "sheet", "B", fR, M), F1(10, 30, 24, 30, 2, "sheet", "B", fR, M),
        B(26, 30, 8, 10, 0.45, 4.95, "warn", "D", { fa: fK, fl: 1 }), hall(22, 16, 14, 14, "warn", { top: "warn" }),
        B(10, 50, 8, 10, 0.45, 4.95, "accessC", "B", { fa: fR, fl: 1 }), low(8, 60, 14, 14, "accessC", "B", fR)];
      const st = [...grid([10, 18, 26, 34], [30, 40, 50, 60], 0.45, 13.95), ...hallSt(22, 16, 14, 14), ...lowSt(8, 60, 14, 14)];
      return { v, st };
    }
  });

  /* ---------- 10.7 · từ 5.4 Vỏ đặc khoét ô ---------- */
  I.push({
    id: "hm7", fam: "hopmo", code: "10.7", from: "5.4", name: "Hộp đá khoét ô lộ hộp màu", rule: "Khối trừ, khoét nhiều ô nhỏ", tag: "Hộp đá ba tầng khoét ba ô sâu 4–6 m, mỗi ô lộ ra một hộp màu bên trong",
    story: "Giữ từ 5.4: tường đặc khoét ô để lộ hộp màu bên trong. Bỏ lớp vỏ tường đứng riêng: khối đá chính là nhà đọc ba tầng, và ô khoét là khoét thẳng vào khối nhà. Ô khoét mặt sông ở tầng 1 thành hiên vào, lộ hộp sảnh vàng. Ô khoét mặt Bắc cao hai tầng lộ hộp đọc xanh, lấy sáng tán xạ. Ô khoét góc Đông Nam ở tầng 3 thành sân thượng đọc sách.",
    why: [W("Quy luật hình khối", "Khối trừ: bắt đầu từ một hộp đá đặc, khoét ba ô ở ba mặt, mỗi ô sâu đúng nửa hoặc một ô lưới. Hộp màu nằm trong ô khoét nên ý hộp trong hộp vẫn còn."),
      W("Khối chính – khối phụ", "Khối chính là hộp đá ba tầng, khoảng 81% diện tích sàn. Khối phụ là ba nhà một tầng ốp gỗ, mái cỏ: nhà sự kiện, phòng chuyên đề, nhà thiếu nhi. Đá nặng với gỗ nhẹ, cao với thấp, nên chính phụ rất rõ."),
      W("Nắng và chói", "Mặt sông (70°) chỉ có cửa hẹp có lam; hộp sảnh lùi sâu 4 m trong hiên nên nắng sáng không chiếu tới. Mặt Trần Phú (250°) đặc. Ô khoét mặt Bắc (340°) lấy sáng tán xạ cho khu đọc. Đầu Nam (160°) có mái đua."),
      W("Gió và mưa", "Hiên khoét ở mặt sông là chỗ tránh mưa gió Đông Bắc mùa đông ngay ở cửa vào. Sân thượng khoét ở góc Đông Nam đón gió mùa hè Đông Nam cho tầng 3."),
      W("Công năng", "Sảnh vào từ hiên mặt sông và từ quảng trường Bắc. Tầng 1: sảnh, cà phê, kho, vệ sinh. Tầng 2–3: đọc; hộp xanh là phòng đọc yên tĩnh nhìn ra ô khoét Bắc. Sự kiện ở đầu Bắc, thiếu nhi ở đầu Nam.")],
    kc: { he: "Khung bê tông lưới 6 × 8 m, cột thẳng một mạch; phần đá là tường bao ốp đá. Chỗ khoét hiên tầng 1 có hàng cột ở mép, sàn tầng 2 đi qua bình thường. Nhà sự kiện: dàn mái nhịp 14 m.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Khoét ô thì kết cấu có bị hở?", "Ô khoét đúng theo ô lưới 6 × 8 m, cột ở mép ô vẫn chạy thẳng xuống móng. Khoét chỉ bỏ sàn và tường trong ô, không cắt cột hay dầm chính."],
      ["Hộp đá có nặng nề, tối không?", "Tường đá có khe cửa hẹp và lam ở mặt sông; ánh sáng chính vào từ ô khoét Bắc và sân thượng. Bên trong sáng đều mà không chói."]],
    cut: "Hộp đá: 3 lớp foam xám 12 × 16 × 2,25 cm, khoét ô bằng dao rọc giấy. Hộp màu: foam vàng 4 × 8 × 2,25 cm, foam xanh 6 × 4 × 4,5 cm, dán lùi vào ô. Khối phụ: bìa nâu cao 2,25 cm (nhà sự kiện 3,5 cm).",
    roleOf: () => "p",
    lab: [[22, 54, 13.95, "Khối chính · Hộp đá khoét ô", 1], [22, 36, 13.95, "Ô khoét Bắc lộ hộp đọc xanh"], [30, 46, 4.95, "Hiên khoét lộ hộp sảnh vàng"], [31, 57, 9.45, "Sân thượng khoét góc"],
      [19, 20, 7.45, "Khối phụ · Nhà sự kiện ốp gỗ", 2], [30, 21, 4.95, "Khối phụ · Phòng chuyên đề", 2], [21, 75, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const S = (x, y, w, d, k, zone, fa) => F1(x, y, w, d, k, "stone", zone, fa, { top: "stoneTop", ...M });
      const v = [
        S(10, 30, 12, 16, 0, "C", fK), S(10, 46, 12, 16, 0, "E", fK), S(22, 30, 12, 8, 0, "A", fP), F1(22, 38, 8, 16, 0, "gold", "A", fP, M), S(22, 54, 12, 8, 0, "A", fP),
        S(10, 30, 6, 16, 1, "E", fD), S(10, 46, 6, 16, 1, "C", fD), S(28, 30, 6, 32, 1, "B", fT), S(16, 42, 12, 20, 1, "B", fT),
        B(16, 34, 12, 8, 4.95, 13.95, "accent", "B", { fa: fR, fl: 2, ...M }),
        S(10, 30, 6, 32, 2, "B", fT), S(28, 30, 6, 20, 2, "B", fT), S(16, 42, 12, 20, 2, "B", fT),
        hall(12, 13, 14, 14, "deck"), low(26, 15, 8, 12, "deck", "D", fK), low(14, 68, 14, 14, "deck", "B", fR)];
      const st = [...grid([10, 16, 22, 28, 34], [30, 38, 46, 54, 62], 0.45, (x, y) => y < 33 && x > 17 && x < 27 ? 4.95 : x > 29 && y > 51 ? 9.45 : 13.95), ...hallSt(12, 13, 14, 14), ...lowSt(26, 15, 8, 12, 1, 1), ...lowSt(14, 68, 14, 14)];
      return { v, st };
    }
  });

  /* ---------- 10.8 · từ 5.4 Vỏ đặc khoét ô ---------- */
  I.push({
    id: "hm8", fam: "hopmo", code: "10.8", from: "5.4", name: "Cổng sông khoét sâu", rule: "Khối trừ, một nhát khoét lớn", tag: "Hộp đá ba tầng khoét một cổng cao hai tầng, sâu 10 m từ phía sông; trong lòng cổng là hộp sảnh vàng",
    story: "Giữ từ 5.4: khối đặc khoét ô lộ hộp màu. Lần này chỉ khoét một nhát lớn: một cổng rộng 8 m, cao 9 m, sâu 10 m ăn vào hộp đá từ phía sông. Cuối cổng là hộp sảnh vàng hai tầng. Người đi từ bậc thang Bạch Đằng nhìn thẳng vào cổng như nhìn vào một hang đá có ánh vàng bên trong.",
    why: [W("Quy luật hình khối", "Khối trừ một nhát: hộp đá giữ nguyên các mặt phẳng, chỉ có một ô khoét lớn ở giữa mặt sông. Ít chi tiết nhưng rõ, nhìn từ bờ sông bên kia vẫn nhận ra."),
      W("Khối chính – khối phụ", "Khối chính là hộp đá ba tầng, khoảng 81% diện tích sàn. Khối phụ là ba nhà gỗ một tầng mái cỏ. Cổng khoét làm khối chính có điểm nhấn riêng, không cần khối phụ nào cao lên."),
      W("Nắng và chói", "Mặt sông (70°) đón nắng sáng mùa hè gần vuông góc: mặt kính sảnh lùi sâu 10 m trong cổng nên luôn trong bóng râm; phần đá còn lại có lam. Mặt Trần Phú (250°) đặc. Đầu Bắc (340°) kính cho khu đọc tầng 2–3, đầu Nam (160°) mái đua."),
      W("Gió và mưa", "Cổng mở về phía sông là chỗ đứng tránh mưa khi gió Đông Bắc mùa đông thổi vào. Mùa hè gió Đông Nam đi vào cổng rồi qua sảnh khi mở cửa kính."),
      W("Công năng", "Cổng là lối vào chính từ bờ sông; sảnh vàng hai tầng có thang lên khu đọc. Tầng 1: trưng bày, vệ sinh, kho; tầng 2–3: đọc. Sự kiện ở đầu Bắc, thiếu nhi ở đầu Nam.")],
    kc: { he: "Khung bê tông lưới 6–10 × 8 m, cột thẳng một mạch. Tầng 3 đi qua phía trên cổng bằng dầm nhịp 8 m gối lên bốn cột ở bốn góc cổng. Không có dầm chuyển, không có công xôn.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Cổng cao 9 m, tầng 3 phía trên có bị võng?", "Tầng 3 vượt nhịp 8 m, bằng một ô lưới bình thường, gối lên bốn cột ở góc cổng chạy thẳng xuống móng."],
      ["Cổng sâu 10 m có làm sảnh tối?", "Cổng mở về phía Đông Đông Bắc nên buổi sáng sảnh sáng nhất; buổi chiều sảnh vẫn nhận ánh sáng phản xạ từ mặt sông qua cổng cao 9 m."]],
    cut: "Hộp đá: foam xám 12 × 16 × 6,75 cm, khoét rãnh 5 × 4 × 4,5 cm ở mặt sông. Hộp vàng: foam vàng 4 × 4 × 4,5 cm dán ở cuối rãnh. Khối phụ: bìa nâu cao 2,25 cm (nhà sự kiện 3,5 cm), phủ bột cỏ.",
    roleOf: () => "p",
    lab: [[18, 54, 13.95, "Khối chính · Hộp đá khoét cổng sông", 1], [31, 44, 9.45, "Cổng sâu 10 m, cao 2 tầng"], [20, 44, 9.45, "Hộp sảnh vàng trong lòng cổng"],
      [19, 20, 7.45, "Khối phụ · Nhà sự kiện ốp gỗ", 2], [30, 21, 4.95, "Khối phụ · Phòng chuyên đề", 2], [21, 75, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const S = (x, y, w, d, k, zone, fa) => F1(x, y, w, d, k, "stone", zone, fa, { top: "stoneTop", ...M });
      const fG = { N: "dac", E: "dua", S: "dac", W: "dac" };
      const v = [
        S(10, 30, 24, 10, 0, "A", fP), S(10, 48, 10, 14, 0, "C", fK), S(20, 48, 14, 14, 0, "E", fK), S(10, 40, 6, 8, 0, "E", fD), F1(16, 40, 8, 8, 0, "gold", "A", fG, M),
        S(10, 30, 24, 10, 1, "B", fR), S(10, 48, 24, 14, 1, "B", fT), S(10, 40, 6, 8, 1, "C", fD), F1(16, 40, 8, 8, 1, "gold", "B", fG, M),
        S(10, 30, 6, 12, 2, "C", fD), S(16, 30, 18, 12, 2, "B", fR), S(10, 42, 24, 20, 2, "B", fT),
        hall(12, 13, 14, 14, "deck"), low(26, 15, 8, 12, "deck", "D", fK), low(14, 68, 14, 14, "deck", "B", fR)];
      const st = [...grid([10, 16, 24, 34], [30, 40, 48, 55, 62], 0.45, 13.95), ...hallSt(12, 13, 14, 14), ...lowSt(26, 15, 8, 12, 1, 1), ...lowSt(14, 68, 14, 14)];
      return { v, st };
    }
  });
})(window.G3);
