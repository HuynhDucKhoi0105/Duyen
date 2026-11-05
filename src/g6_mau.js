
/* ================= Đợt 4: theo hai ảnh mẫu (sàn chữ L, chữ U xếp lùi bậc; hai hộp nối bằng dải dốc) ================= */
(function (G) {
  const { B, S3, col, range } = G.K;
  const { FA, F1 } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I6 = G.ideas6 = G.ideas6 || [];
  const FG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // hộp kính dưới gầm dốc
  // một tầng ghép từ các ô [x, y, rộng, sâu, nhóm]
  const plate = (rs, k, c, fa, o = {}) => rs.map(([x, y, w, d, z]) => F1(x, y, w, d, k, c, z, fa, o));
  // cột lưới: ở mọi điểm lưới nằm dưới một sàn, thẳng từ móng lên tới sàn cao nhất ở điểm đó
  function gridCols(bx, xs, ys) {
    const o = [];
    for (const x of xs) for (const y of ys) {
      const h = bx.filter(b => x >= b.x - 0.05 && x <= b.x + b.w + 0.05 && y >= b.y - 0.05 && y <= b.y + b.d + 0.05);
      if (h.length) o.push(col(x, y, 0, Math.max(...h.map(b => b.z2))));
    }
    return o;
  }
  const corners = b => [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.d], [b.x, b.y + b.d]].map(([x, y]) => col(x, y, 0, b.z2));
  // dải dốc: cạnh thấp a1–a2 (mặt trên cao za) lên cạnh cao b1–b2 (cao zb), dày t; bên trong là bậc đọc
  const bar = (a1, a2, b2, b1, za, zb, zone, t = 4.5, o = {}) => S3([[...a1, za], [...a2, za], [...b2, zb], [...b1, zb]], t, "sheet", zone, { fl: 1, ...M, ...o });
  // cột dưới dải dốc: cách đều dọc hai mép, chỉ ở chỗ đáy dải cao hơn 1,2 m
  function barCols(v, n) {
    const [a1, a2, b2, b1] = v.pts3, o = [];
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1);
      for (const [p, q] of [[a1, b1], [a2, b2]]) {
        const z = p[2] + (q[2] - p[2]) * t - v.t;
        if (z > 1.2) o.push(col(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, 0, z));
      }
    }
    return o;
  }

  /* ---------------- Ảnh 1: sàn chữ L, chữ U xếp lùi bậc, tầng nào cũng có sân thượng cỏ ---------------- */
  I6.push({
    id: "mu1", fam: "mau", code: "11.1", from: "ảnh 1", name: "Bậc thềm cỏ về phía Nam", rule: "Lùi bậc, tiến dần", tag: "Bốn sàn chữ U, chữ L lùi dần về góc Tây Bắc; sân thượng cỏ bậc xuống phía Nam và phía sông",
    story: "Lấy từ ảnh 1: bốn bản sàn chữ U, chữ L chồng lên nhau, tầng trên nhỏ hơn tầng dưới nên tầng nào cũng có một sân thượng cỏ. Tầng 1 là chữ U ôm một sân trong mở về đầu Nam; tầng 2 vắt qua một phần sân trên hàng cột, thành hiên có mái giống phần chân công trình trong ảnh. Các tầng trên lùi dần về góc Tây Bắc, nên nhìn từ bờ sông nhà như một ngọn đồi bậc thang.",
    why: [W("Quy luật hình khối", "Lùi bậc tiến dần: mỗi tầng là một chữ L nhỏ hơn tầng dưới một hoặc hai bước lưới 8 m. Bốn bản sàn đọc rõ khi bấm Tách tầng, giống sơ đồ trong ảnh. Không xoay, không lệch khỏi lưới."),
      W("Khối chính – khối phụ", "Khối chính là nhà bậc thềm 4 tầng, cao +18,45 m, khoảng 86% sàn, màu sáng, mái cỏ. Hai khối phụ thấp một tầng, ốp đá tối, đứng hai bên lối vào ở đầu Bắc: nhà sự kiện cao +7,45 m và quán cà phê cao +4,95 m."),
      W("Nắng và chói", "Mặt Trần Phú nhìn Tây Tây Nam là lưng kho đặc, chặn nắng chiều đông chiếu thẳng. Mặt sông nhìn Đông Đông Bắc có lam đứng chặn nắng sáng sớm. Sân thượng cỏ bậc xuống phía Nam và phía sông; mái đua mặt Nam che nắng trưa cho phòng đọc phía sau."),
      W("Gió và mưa", "Sân trong mở về đầu Nam đón gió Đông Nam mùa hè; các sân thượng cũng bậc xuống phía này nên gió lùa qua từng tầng. Hiên cột dưới tầng 2 là chỗ trú khi mưa gió mùa Đông Bắc tạt vào mặt sông."),
      W("Công năng", "Nhà sự kiện và cà phê mở ngoài giờ ở đầu Bắc. Tầng 1: sảnh ở cánh Bắc, kho và nghiệp vụ ở lưng Tây, đọc mở ở cánh sông. Tầng 2 đọc chính và phòng D4 nhìn sông; tầng 3, 4 đọc yên tĩnh, tầng nào cũng ra được sân thượng cỏ.")],
    kc: { he: "Khung bê tông lưới 8 × 8 m, cột thẳng từ móng lên mái. Tầng trên chỉ lùi vào so với tầng dưới nên không có dầm chuyển. Chỗ tầng 2 vắt qua sân trong đứng trên hàng cột giữa sân (hiên cột). Nhà sự kiện là khung riêng, vì kèo thép nhịp 16 m.", nhip: "16 m (nhà sự kiện); 8 m phần còn lại", cx: "Không" },
    qa: [["Sân thượng cỏ có nặng và có thấm không?", "Lớp đất trồng cỏ dày 0,3 m nặng khoảng 6 kN/m², sàn bê tông nhịp 8 m đỡ được. Dưới đất có màng chống thấm và lớp thoát nước, sàn dốc 1–2% về ống thu ở mép sân."], ["Hàng cột giữa sân có vướng không?", "Chỉ có một hàng cột cách nhau 8 m ở mép phần tầng 2 vắt qua sân; phần sân còn lại để trống. Hàng cột này làm luôn hiên che mưa."]],
    cut: "Mỗi tầng một tấm foam trắng dày 2,25 cm cắt chữ U hoặc chữ L theo lưới 4 cm, dán bột cỏ lên phần mặt lộ ra. Hai khối phụ: foam xám đen. Cột hiên: que tre 3 mm cao 2,25 cm.",
    roleOf: () => "p",
    lab: [[14, 36, 18.45, "Khối chính · Nhà bậc thềm 4 tầng", 1], [14, 20, 7.45, "Khối phụ · Nhà sự kiện", 2], [32, 18, 4.95, "Khối phụ · Cà phê ngoài giờ", 2], [22, 78, 0.5, "Sân trong mở về Nam"], [34, 56, 4.95, "Sân thượng cỏ"], [18, 58, 4.95, "Hiên cột dưới tầng 2"]],
    build() {
      const o = { ...M, top: "grass" };
      const T = [
        [[6, 28, 8, 24, "E"], [6, 52, 8, 32, "C"], [14, 28, 24, 8, "A"], [30, 36, 8, 32, "B"]],
        [[6, 28, 8, 8, "E"], [6, 36, 8, 8, "B"], [14, 28, 16, 16, "B"], [30, 28, 8, 16, "D"], [6, 44, 16, 24, "B"]],
        [[6, 28, 24, 8, "B"], [6, 36, 8, 24, "B"]],
        [[6, 28, 16, 8, "B"], [6, 36, 8, 16, "B"]]
      ];
      const main = T.flatMap((rs, k) => plate(rs, k, "sheet", FA.doc, o));
      const hall = B(6, 12, 16, 16, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const cafe = B(26, 12, 12, 12, 0.45, 4.95, "stone", "A", { fa: FA.cong, fl: 1, top: "grass" });
      const st = [...gridCols(main, [6, 14, 22, 30, 38], range(28, 84, 8)), ...corners(hall), ...corners(cafe)];
      return { v: [...main, hall, cafe], st };
    }
  });

  I6.push({
    id: "mu2", fam: "mau", code: "11.2", from: "ảnh 1", name: "Lõi vuông, cánh chữ L xoay vòng", rule: "Xoay vòng quanh một lõi", tag: "Lõi đọc 16 × 24 m cao 4 tầng; mỗi tầng một cánh chữ L sâu 4 m đổi sang góc khác, sân thượng cỏ xoay quanh nhà",
    story: "Lấy từ ảnh 1: mỗi tầng là một chữ L, các chữ L lệch nhau nên tầng nào cũng có sân thượng. Ở đây chữ L là phần cánh sâu 4 m bám quanh một lõi vuông đứng thẳng từ móng lên mái. Tầng 1 cánh ở góc Tây Bắc, tầng 2 ở góc Đông Bắc, tầng 3 ở góc Đông Nam, tầng 4 ở góc Tây Nam. Bấm Tách tầng sẽ thấy bốn bản sàn xoay vòng như chong chóng.",
    why: [W("Quy luật hình khối", "Xoay vòng quanh một lõi: lõi giữ trật tự, cánh chữ L đổi góc theo từng tầng tạo sự sinh động. Lệch nhưng vẫn trên lưới 8 m, mỗi cánh đúng nửa bước lưới (4 m)."),
      W("Khối chính – khối phụ", "Khối chính là lõi đọc 4 tầng cùng các cánh, cao +18,45 m, khoảng 79% sàn. Hai khối phụ thấp, ốp đá tối: lưng kho một tầng sát Trần Phú (+4,95 m) và nhà sự kiện ở đầu Bắc (+7,45 m)."),
      W("Nắng và chói", "Cánh sâu 4 m của tầng trên làm mái đua cho tầng dưới ở góc đó. Mặt sông nhìn Đông Đông Bắc dùng lam đứng; mặt Trần Phú có lưng kho đặc che nắng chiều đông ở tầng trệt, các tầng trên mặt này đặc."),
      W("Gió và mưa", "Sân thượng xoay quanh nhà nên mùa nào cũng có một sân khuất gió: mùa hè ngồi sân Đông Nam đón gió từ đầu Nam; mùa đông gió Đông Bắc tạt mặt sông thì dùng sân Tây Nam phía sau."),
      W("Công năng", "Tầng 1: sảnh và cà phê dưới cánh Bắc, WC và kỹ thuật ở cánh Tây nối với lưng kho. Tầng 2 có kho phụ và phòng D4. Tầng 3, 4 đọc yên tĩnh, mỗi tầng một sân thượng cỏ riêng.")],
    kc: { he: "Lõi là khung bê tông lưới 8 × 8 m, 12 cột thẳng từ móng lên mái. Cánh chữ L sâu 4 m là sàn công xôn từ dầm biên của lõi, không có cột riêng (cánh tầng 1 đặt trên nền). Nhà sự kiện là khung thép riêng nhịp 16 m.", nhip: "16 m (nhà sự kiện); 8 m (lõi)", cx: "4 m (cánh chữ L)" },
    qa: [["Cánh đua 4 m có võng, rung không?", "Dầm công xôn 4 m cao khoảng 0,6 m, neo vào nhịp 8 m bên trong lõi, phần bên trong dài gấp đôi phần đua. Đây là tỉ lệ thông thường, không cần dàn."], ["Sao không xoay cả khối cho đẹp hơn?", "Xoay cả khối thì cột tầng trên không rơi xuống cột tầng dưới. Ở đây chỉ cánh mỏng đổi góc, lõi đứng yên nên cột đi thẳng một mạch."]],
    cut: "Lõi: 4 tấm foam trắng 8 × 12 × 2,25 cm. Mỗi tầng một chữ L bằng foam trắng rộng 2 cm dán quanh lõi, đổi góc theo tầng; dán bột cỏ phần mái lộ ra. Khối phụ: foam xám đen.",
    roleOf: () => "p",
    lab: [[26, 48, 18.45, "Khối chính · Lõi vuông, cánh chữ L xoay", 1], [26, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [10, 52, 4.95, "Khối phụ · Lưng kho và kỹ thuật", 2], [16, 48, 4.95, "Sân thượng cỏ tầng 1"], [36, 48, 9.45, "Cánh đua 4 m"]],
    build() {
      const o = { ...M, top: "grass" };
      const core = [
        [[18, 36, 16, 12, "A"], [18, 48, 16, 12, "B"]],
        [[18, 36, 8, 8, "C"], [26, 36, 8, 8, "D"], [18, 44, 16, 16, "B"]],
        [[18, 36, 16, 24, "B"]],
        [[18, 36, 16, 24, "B"]]
      ];
      const wing = [
        [[14, 32, 20, 4, "A"], [14, 36, 4, 24, "E"]],
        [[18, 32, 20, 4, "B"], [34, 36, 4, 24, "B"]],
        [[34, 36, 4, 28, "B"], [18, 60, 16, 4, "B"]],
        [[14, 36, 4, 28, "B"], [18, 60, 16, 4, "B"]]
      ];
      const C = core.flatMap((rs, k) => plate(rs, k, "sheet", FA.doc, o)), Wg = wing.flatMap((rs, k) => plate(rs, k, "sheet", FA.doc, o));
      const spine = [B(6, 28, 8, 24, 0.45, 4.95, "stone", "E", { fa: FA.dac, fl: 1, top: "grass" }), B(6, 52, 8, 24, 0.45, 4.95, "stone", "C", { fa: FA.dac, fl: 1, top: "grass" })];
      const hall = B(18, 14, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = [...gridCols(C, [18, 26, 34], [36, 44, 52, 60]), ...corners(hall)];
      return { v: [...C, ...Wg, ...spine, hall], st };
    }
  });

  I6.push({
    id: "mu3", fam: "mau", code: "11.3", from: "ảnh 1", name: "Sàn vòng trên hàng cột", rule: "Nâng lên, dưới rỗng trên đặc", tag: "Tầng trệt gần như để trống thành hiên cột; sàn vòng tầng 2 ôm sân trong, tầng 3 mở chữ U về phía Nam, tầng 4 còn một thanh dài",
    story: "Lấy phần chân công trình trong ảnh 1: nhà đặt trên hàng cột quanh một sân trong, có cây và người đi lại bên dưới. Tầng trệt chỉ có lưng kho phía Trần Phú và sảnh kính ở góc Bắc, còn lại là hiên cột thông thoáng. Tầng 2 là một sàn vòng kín bốn phía ôm lấy sân, tầng 3 mở thành chữ U về phía Nam, tầng 4 còn một thanh dài ở đầu Bắc.",
    why: [W("Quy luật hình khối", "Nâng lên và thu dần: bản sàn lớn nhất ở tầng 2, các tầng trên thu lại theo bước lưới 8 m. Dưới rỗng (hàng cột), trên đặc, tương phản rõ."),
      W("Khối chính – khối phụ", "Khối chính là nhà sàn vòng 4 tầng, cao +18,45 m, khoảng 87% sàn. Hai khối phụ thấp ốp đá tối: nhà sự kiện ở đầu Bắc (+7,45 m) và nhà thiếu nhi một tầng trong vườn đầu Nam (+4,95 m)."),
      W("Nắng và chói", "Sàn vòng tầng 2 che bóng cho cả hiên cột bên dưới. Mặt sông nhìn Đông Đông Bắc dùng lam đứng, mặt Trần Phú đặc. Tầng 3 mở chữ U về đầu Nam có mái đua; sân thượng cỏ trên cánh sông dùng buổi chiều, khi nắng đã ở sau lưng nhà."),
      W("Gió và mưa", "Tầng trệt rỗng nên gió Đông Nam mùa hè thổi xuyên qua hiên cột và sân trong. Mưa gió mùa Đông Bắc tạt vào mặt sông thì người đi dưới hiên cột vẫn khô."),
      W("Công năng", "Hiên cột là sân chơi, chỗ đọc ngoài trời, chỗ chờ sự kiện. Tầng 2 vòng quanh sân là đọc mở, có kho phụ, phòng D4 và văn phòng; tầng 3, 4 đọc yên tĩnh. Nhà thiếu nhi riêng trong vườn, gần bãi xe đầu Nam.")],
    kc: { he: "Khung bê tông lưới 8 × 8 m, cột thẳng từ móng lên mái. Tầng trên chỉ thu vào, không vươn ra, nên không có dầm chuyển. Hàng cột tầng trệt chính là cột của khung, để lộ. Lưng kho và lõi thang bê tông làm vách cứng chịu gió.", nhip: "16 m (nhà sự kiện); 8 m phần còn lại", cx: "Không" },
    qa: [["Nhà đứng trên cột như vậy có yếu khi gió bão không?", "Lưng kho đặc phía Tây và lõi thang làm vách cứng chịu gió ngang; các cột chỉ đỡ tải đứng. Gió bão từ biển đập vào mặt sông được sàn tầng 2 truyền về các vách cứng này."], ["Sân trong có bị tối?", "Sân rộng 16 × 32 m; cạnh Nam và cạnh Đông chỉ cao 2 tầng, nên trưa nắng vẫn xuống tới đáy sân."]],
    cut: "Tầng 2: tấm foam trắng 16 × 24 cm khoét lỗ 8 × 16 cm làm sân. Tầng 3, 4 cắt chữ U và thanh dài, dán bột cỏ phần lộ ra. Cột tầng trệt: que tre 3 mm cao 2,25 cm cắm theo lưới 4 cm.",
    roleOf: () => "p",
    lab: [[22, 32, 18.45, "Khối chính · Sàn vòng trên hàng cột", 1], [14, 19, 7.45, "Khối phụ · Nhà sự kiện", 2], [30, 83, 4.95, "Khối phụ · Nhà thiếu nhi trong vườn", 2], [22, 52, 0.5, "Sân trong"], [26, 72, 0.5, "Hiên cột tầng trệt"], [34, 60, 9.45, "Sân thượng cỏ"]],
    build() {
      const o = { ...M, top: "grass" };
      const T = [
        [[6, 28, 8, 24, "E"], [6, 52, 8, 24, "C"], [22, 28, 16, 8, "A"], [30, 36, 8, 8, "A"]],
        [[6, 28, 8, 8, "E"], [14, 28, 16, 8, "B"], [30, 28, 8, 8, "A"], [6, 36, 8, 24, "B"], [6, 60, 8, 8, "D"], [6, 68, 8, 8, "C"], [14, 68, 24, 8, "B"], [30, 36, 8, 32, "B"]],
        [[6, 28, 32, 8, "B"], [6, 36, 8, 32, "B"], [30, 36, 8, 16, "B"]],
        [[6, 28, 32, 8, "B"]]
      ];
      const main = T.flatMap((rs, k) => plate(rs, k, "sheet", FA.doc, o));
      const hall = B(6, 12, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const kids = B(22, 78, 16, 10, 0.45, 4.95, "stone", "B", { fa: FA.nhi, fl: 1, top: "grass" });
      const st = [...gridCols(main, [6, 14, 22, 30, 38], range(28, 76, 8)), ...corners(hall), ...corners(kids)];
      return { v: [...main, hall, kids], st };
    }
  });

  /* ---------------- Ảnh 2: hai hộp đặc nối bằng những dải khối dốc, dưới gầm là sảnh kính ---------------- */
  I6.push({
    id: "mu4", fam: "mau", code: "11.4", from: "ảnh 2", name: "Hai hộp, hai dải bậc đọc", rule: "Nối hai khối bằng dải dốc", tag: "Hộp đọc 3 tầng ở đầu Nam và nhà sự kiện thấp ở đầu Bắc, nối bằng hai dải bậc đọc dốc lên tới mái hộp đọc",
    story: "Lấy từ ảnh 2: hai hộp đặc đứng hai đầu, giữa là những dải khối dài dốc lên, chân dải bắt đầu sát hộp này và đỉnh dải chạm mái hộp kia; dưới phần dốc cao là sảnh kính. Ở đây hộp lớn là nhà đọc 3 tầng ở đầu Nam, hộp nhỏ là nhà sự kiện ở đầu Bắc. Hai dải rộng 8 m dốc từ đất lên mái nhà đọc; trong dải là bậc ngồi đọc, mặt trên dải là mái dốc.",
    why: [W("Quy luật hình khối", "Nối hai khối bằng dải dốc: hai hộp vuông vức giữ trật tự, hai dải dốc dài ngắn khác nhau (32 m và 22 m) tạo chuyển động. Dải dài dốc thoải, dải ngắn dốc hơn, đặt lệch nhau trên lưới."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc cao +13,95 m cùng hai dải dốc chạm mái nó, đọc thành một cử chỉ, khoảng 83% sàn. Khối phụ thấp và tối: nhà sự kiện ốp đá (+7,45 m) và sảnh kính một tầng nằm khuất dưới gầm dốc."),
      W("Nắng và chói", "Hộp đọc: mặt Trần Phú đặc, mặt sông lam đứng, đầu Nam mái đua. Dải dốc chạy theo trục dọc khu đất nên hai mặt bên nhìn sông và nhìn Trần Phú: mặt nhìn sông dùng lam đứng, mặt nhìn Trần Phú gần như đặc."),
      W("Gió và mưa", "Khe 4 m giữa hai dải và sảnh kính dưới gầm thông về đầu Nam, đón gió Đông Nam mùa hè. Mưa gió mùa Đông Bắc tạt mặt sông thì lối vào dưới gầm dốc vẫn được che."),
      W("Công năng", "Từ quảng trường Bắc đi qua nhà sự kiện, vào sảnh dưới gầm dốc, rồi đi lên theo bậc đọc tới mái nhà đọc. Hộp đọc: tầng 1 kho, nghiệp vụ, thiếu nhi; tầng 2 đọc mở và phòng D4; tầng 3 đọc yên tĩnh.")],
    kc: { he: "Hộp đọc khung bê tông lưới 8 × 8 m. Mỗi dải dốc là bản bê tông gấp bậc tựa trên hai hàng cột dọc hai mép, cột càng lên cao càng dài; chân dải tựa trên đất, đỉnh dải gối lên dầm mái hộp đọc. Nhà sự kiện khung thép nhịp 16 m.", nhip: "16 m (nhà sự kiện); 8 m dưới dải dốc", cx: "Không" },
    qa: [["Dải dốc dài 32 m đứng được nhờ đâu?", "Không treo, không đua: dải nằm trên hai hàng cột cách nhau khoảng 8 m dọc hai mép. Chân dải tựa trên đất, đỉnh gối vào dầm mái hộp đọc."], ["Người xe lăn lên mái bằng cách nào?", "Bậc đọc dốc khoảng 1 : 3,5 để ngồi và đi bộ; người xe lăn đi thang máy trong hộp đọc lên tầng 3 và mái."]],
    cut: "Hộp đọc: foam trắng 12 × 12 × 6,75 cm, kẻ ô 1 cm. Mỗi dải dốc: tấm foam dày 2,25 cm, rộng 4 cm, dài 16 và 11 cm, kê nghiêng trên que cột. Nhà sự kiện: foam xám đen 8 × 7 × 3,5 cm. Sảnh dưới gầm: mica trong.",
    roleOf: () => "p",
    lab: [[18, 72, 13.95, "Khối chính · Hộp đọc và hai dải bậc đọc", 1], [14, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [18, 54, 4.95, "Khối phụ · Sảnh kính dưới gầm dốc", 2], [12, 40, 9.5, "Dải bậc đọc lên mái"]],
    build() {
      const o = { ...M, ribs: 2 };
      const box = [...plate([[6, 60, 8, 24, "C"], [14, 60, 8, 24, "E"], [22, 60, 8, 24, "B"]], 0, "sheet", FA.doc, o),
        ...plate([[6, 60, 8, 8, "C"], [6, 68, 8, 8, "E"], [6, 76, 8, 8, "D"], [14, 60, 16, 24, "B"]], 1, "sheet", FA.doc, o),
        ...plate([[6, 60, 24, 24, "B"]], 2, "sheet", FA.doc, o)];
      const bA = bar([8, 28], [16, 28], [16, 60], [8, 60], 4.95, 13.95, "B"), bB = bar([20, 38], [28, 38], [28, 60], [20, 60], 4.95, 13.95, "B");
      const lobby = B(8, 49, 20, 11, 0.45, 4.95, "glass", "A", { fa: FG, fl: 1 });
      const hall = B(6, 14, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = [...gridCols(box, [6, 14, 22, 30], [60, 68, 76, 84]), ...barCols(bA, 3), ...barCols(bB, 2), ...corners(hall)];
      return { v: [...box, bA, bB, lobby, hall], st };
    }
  });

  I6.push({
    id: "mu5", fam: "mau", code: "11.5", from: "ảnh 2", name: "Lưng cao, ba dải bậc nhìn sông", rule: "Lặp lại có biến tấu", tag: "Một hộp lưng hẹp 3 tầng sát Trần Phú, ba dải bậc đọc dốc từ phía sông lên tới mái nó, dưới gầm là sảnh kính",
    story: "Lấy từ ảnh 2 các dải dốc dài tựa lên mái một hộp đặc. Hộp ở đây là một lưng hẹp 10 m, cao 3 tầng, chạy dọc đường Trần Phú, chứa kho, nghiệp vụ, văn phòng và đọc yên tĩnh. Ba dải bậc đọc dốc từ phía sông lên tới mái hộp, như ba khán đài quay mặt ra sông Hàn. Giữa các dải là khe sáng, dưới phần cao của dải là sảnh kính và đọc mở.",
    why: [W("Quy luật hình khối", "Lặp lại có biến tấu: ba dải cùng dốc lên một mái, nhưng rộng 10 – 8 – 10 m và chân dải lệch nhau 2 m. Hộp lưng thẳng, dài, tĩnh; các dải dốc tạo nhịp."),
      W("Khối chính – khối phụ", "Khối chính là hộp lưng cùng ba dải bậc, khoảng 75% sàn, cao +13,95 m. Khối phụ: sảnh kính một tầng khuất dưới gầm và nhà sự kiện ốp đá ở đầu Bắc (+7,45 m), cả hai thấp hơn hẳn."),
      W("Nắng và chói", "Hộp lưng che toàn bộ nắng chiều từ phía Trần Phú (Tây Tây Nam). Bậc đọc quay về sông (Đông Đông Bắc) nên chỉ có nắng sáng sớm; đầu thấp của mỗi dải có lam đứng. Khe giữa các dải lấy sáng xuống sảnh."),
      W("Gió và mưa", "Khe giữa các dải mở về phía sông, gió Đông Nam mùa hè từ đầu Nam lùa qua gầm. Lối vào nằm sâu dưới gầm dốc nên mưa tạt từ mặt sông không vào tới sảnh."),
      W("Công năng", "Từ bậc thang Bạch Đằng đi thẳng vào sảnh dưới gầm. Ba dải là ba khu đọc: đọc báo, đọc mở, thiếu nhi kể chuyện. Hộp lưng: tầng 1 kho và nghiệp vụ, tầng 2 văn phòng và phòng D4, tầng 3 đọc yên tĩnh. Nhà sự kiện riêng ở đầu Bắc.")],
    kc: { he: "Hộp lưng: khung bê tông hai hàng cột, nhịp 10 m, có vách thang làm vách cứng. Mỗi dải là bản bê tông gấp bậc, tựa trên hàng cột dọc hai mép; đầu cao gối lên dầm biên hộp lưng, đầu thấp tựa trên đất.", nhip: "16 m (nhà sự kiện); 10 m (hộp lưng)", cx: "Không" },
    qa: [["Dải dốc gần 1 : 2,4 có đi được không?", "Bên trong là bậc ngồi kiểu khán đài: bậc cao 0,45 m, sâu 1,0 m, giữa có lối bậc thang bậc thấp. Người xe lăn đi thang máy trong hộp lưng, ra các chiếu nghỉ của dải."], ["Đỉnh dải tựa vào hộp lưng có đẩy hộp đổ về phía Tây không?", "Dải tựa trên cột suốt chiều dài, chỉ gối lên dầm hộp lưng chứ không đẩy ngang. Hộp lưng có vách thang bê tông chịu lực ngang."]],
    cut: "Hộp lưng: foam trắng 5 × 22 × 6,75 cm. Ba dải: tấm foam dày 2,25 cm rộng 5 – 4 – 5 cm, dài 11 – 10 – 11 cm, một đầu dán vào mép mái hộp lưng, đầu kia chạm đế. Sảnh: mica trong 5 × 20 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[11, 52, 13.95, "Khối chính · Hộp lưng và ba dải bậc nhìn sông", 1], [30, 19, 7.45, "Khối phụ · Nhà sự kiện", 2], [21, 43, 4.95, "Khối phụ · Sảnh kính dưới gầm dốc", 2], [30, 35, 8.5, "Bậc đọc nhìn sông"]],
    build() {
      const o = { ...M, ribs: 2 };
      const box = [...plate([[6, 30, 10, 16, "E"], [6, 46, 10, 28, "C"]], 0, "sheet", FA.doc, o),
        ...plate([[6, 30, 10, 12, "E"], [6, 42, 10, 8, "D"], [6, 50, 10, 24, "B"]], 1, "sheet", FA.doc, o),
        ...plate([[6, 30, 10, 44, "B"]], 2, "sheet", FA.doc, o)];
      const barX = (y1, y2, xa) => bar([xa, y1], [xa, y2], [16, y2], [16, y1], 4.95, 13.95, "B");
      const bs = [barX(30, 40, 38), barX(46, 54, 36), barX(60, 70, 38)];
      const lob = [B(16, 30, 10, 22, 0.45, 4.95, "glass", "A", { fa: FG, fl: 1 }), B(16, 52, 10, 18, 0.45, 4.95, "glass", "B", { fa: FG, fl: 1 })];
      const hall = B(22, 12, 16, 14, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = [...gridCols(box, [6, 16], range(30, 74, 8.8)), ...bs.flatMap(b => barCols(b, 2)), ...corners(hall)];
      return { v: [...box, ...bs, ...lob, hall], st };
    }
  });

  I6.push({
    id: "mu6", fam: "mau", code: "11.6", from: "ảnh 2", name: "Hai hộp chéo góc, hai dải dốc", rule: "Cân bằng theo đường chéo", tag: "Hộp đọc 4 tầng ở góc Đông Bắc, nhà sự kiện thấp ở góc Tây Nam, hai dải dốc chéo nối hai góc: dải lớn lên sân mái tầng 3, dải nhỏ vào tầng 2",
    story: "Lấy từ ảnh 2 hai dải khối dốc chéo, dài ngắn khác nhau, nối hai hộp đặt lệch nhau. Hộp đọc 4 tầng đứng ở góc Đông Bắc, sát quảng trường và bậc thang Bạch Đằng; nhà sự kiện thấp ở góc Tây Nam, gần bãi xe. Dải lớn dốc từ cửa nhà sự kiện lên sân mái tầng 3 của hộp đọc; dải nhỏ dốc thoải từ vườn vào thẳng tầng 2. Dưới gầm dải lớn là quán cà phê kính.",
    why: [W("Quy luật hình khối", "Cân bằng theo đường chéo: hộp cao ở một góc, hộp thấp ở góc đối diện, hai dải chéo nối chúng như hai nét song song dài ngắn khác nhau. Hai hộp và các cột vẫn theo lưới vuông."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc cao +18,45 m cùng hai dải dốc, khoảng 73% sàn. Ba khối phụ đều thấp và tối: nhà sự kiện (+7,45 m), lưng kho một tầng sát Trần Phú và quán cà phê kính dưới gầm dốc."),
      W("Nắng và chói", "Hộp đọc: mặt sông lam đứng, đầu Nam mái đua, mặt Trần Phú đặc. Dải dốc chạy chéo nên không mặt nào nhìn thẳng vào nắng sáng sớm hay nắng chiều đông."),
      W("Gió và mưa", "Khoảng giữa hai dải và vườn giữa nhà mở về đầu Nam, đón gió Đông Nam mùa hè. Hộp đọc cao ở góc Đông Bắc hứng gió mùa Đông Bắc, che cho vườn phía sau."),
      W("Công năng", "Hai lối vào: từ quảng trường Bắc vào thẳng sảnh hộp đọc; từ bãi xe đầu Nam qua nhà sự kiện rồi đi lên theo dải dốc. Lưng kho sát Trần Phú có lối giao sách riêng. Tầng 4 hộp đọc là đọc yên tĩnh.")],
    kc: { he: "Hộp đọc khung bê tông lưới 8 × 7 m. Hai dải dốc là bản bê tông gấp bậc tựa trên hai hàng cột dọc mép; đầu cao gối lên dầm sàn tầng 3 và tầng 2 của hộp đọc, đầu thấp tựa trên đất. Nhà sự kiện khung thép nhịp 14 m.", nhip: "14 m (nhà sự kiện); 8 m (hộp đọc)", cx: "Không" },
    qa: [["Dải dốc chéo thì cột có bị chéo theo không?", "Không. Cột vẫn đứng thẳng, chỉ đặt dọc hai mép dải; dải chỉ nghiêng theo chiều dài của nó. Mỗi cột dài ngắn khác nhau theo cao độ đáy dải."], ["Hai dải dốc bao nhiêu?", "Dải nhỏ lên 4,5 m trên khoảng 20 m, khoảng 1 : 4,5, đi bộ thoải. Dải lớn lên 9 m trên khoảng 26 m, bên trong là bậc ngồi đọc; người xe lăn dùng thang máy trong hộp đọc."]],
    cut: "Hộp đọc: foam trắng 8 × 14 × 6,75 cm, thêm hộp 8 × 7 × 2,25 cm ở tầng 4, kẻ ô 1 cm. Hai dải: tấm foam dày 2,25 cm cắt hình bình hành, dán nghiêng trên que cột. Nhà sự kiện và lưng kho: foam xám đen. Quán cà phê: mica trong.",
    roleOf: () => "p",
    lab: [[30, 23, 18.45, "Khối chính · Hộp đọc và hai dải dốc chéo", 1], [13, 75, 7.45, "Khối phụ · Nhà sự kiện", 2], [10, 40, 4.95, "Khối phụ · Lưng kho phía Trần Phú", 2], [20, 49, 4.95, "Khối phụ · Cà phê kính dưới gầm", 2], [30, 37, 13.95, "Sân mái nơi dải dốc lên tới"]],
    build() {
      const o = { ...M, ribs: 2 };
      const box = [...plate([[22, 16, 8, 14, "A"], [30, 16, 8, 14, "B"], [22, 30, 16, 14, "B"]], 0, "sheet", FA.doc, o),
        ...plate([[22, 16, 8, 7, "E"], [30, 16, 8, 7, "C"], [22, 23, 8, 7, "D"], [30, 23, 8, 7, "B"], [22, 30, 16, 14, "B"]], 1, "sheet", FA.doc, o),
        ...plate([[22, 16, 8, 7, "E"], [30, 16, 8, 7, "B"], [22, 23, 16, 7, "B"], [22, 30, 16, 14, "B"]], 2, "sheet", FA.doc, o),
        ...plate([[22, 16, 16, 14, "B"]], 3, "sheet", FA.doc, o)];
      const bA = bar([10, 66], [18, 66], [32, 44], [24, 44], 4.95, 13.95, "B"), bB = bar([24, 62], [29, 62], [38, 44], [33, 44], 4.95, 9.45, "B");
      const cafe = B(16, 44, 10, 11, 0.45, 4.95, "glass", "A", { fa: FG, fl: 1 });
      const spine = [B(6, 20, 8, 16, 0.45, 4.95, "stone", "E", { fa: FA.dac, fl: 1, top: "grass" }), B(6, 36, 8, 24, 0.45, 4.95, "stone", "C", { fa: FA.dac, fl: 1, top: "grass" })];
      const hall = B(6, 66, 14, 18, 0.45, 7.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" });
      const st = [...gridCols(box, [22, 30, 38], [16, 23, 30, 37, 44]), ...barCols(bA, 3), ...barCols(bB, 2), ...corners(hall)];
      return { v: [...box, bA, bB, cafe, ...spine, hall], st };
    }
  });
})(window.G3);
