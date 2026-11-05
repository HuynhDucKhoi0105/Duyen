
/* ================= Đợt 5 · Nhóm 13: Mái dốc, nền nâng, mái đi được (8 ý tưởng học từ công trình đạt giải) ================= */
/* Hướng thật: đầu Bắc khu đất nhìn 340°, mặt sông 70°, đầu Nam 160°, mặt Trần Phú 250°. */
(function (G) {
  const { B, PO, LO, S3, LN, col, grid, range, zig, inPoly } = G.K;
  const { Z, stack, cutX, cutY, colsIn } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  // mặt đứng theo hướng thật: mặt sông lam, mặt Trần Phú đặc, đầu Nam mái đua, đầu Bắc kính lấy sáng tán xạ
  const fR = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khu đọc
  const fP = { N: "lam", E: "lam", S: "dua", W: "dac" }; // sảnh, cà phê
  const fK = { N: "dac", E: "lam", S: "dac", W: "dac" }; // kho, phòng sự kiện
  const fD = { N: "dac", E: "dac", S: "dac", W: "dac" };
  // khối phụ: nhà sự kiện cao 7 m (dàn mái, không cột giữa) và nhà thấp một tầng
  const hall = (x, y, w, d, c, o = {}) => B(x, y, w, d, 0.45, 7.45, c, "D", { fa: fK, fl: 1, top: "grass", ...o });
  const low = (x, y, w, d, c, zone, fa, o = {}) => B(x, y, w, d, 0.45, 4.95, c, zone, { fa, fl: 1, ...o });
  const hallSt = (x, y, w, d) => { const ys = range(y, y + d, d / 2); return [...grid([x, x + w], ys, 0.45, 7.45), ...ys.flatMap(t => zig(x, t, x + w, t, 6.45, 7.45, 4))]; };
  const lowSt = (x, y, w, d, nx = 1, ny = 2) => grid(range(x, x + w, w / nx), range(y, y + d, d / ny), 0.45, 4.95);
  // sàn dùng được dưới mái dốc: lấy mẫu lưới 0,5 m; mỗi tầng 4,5 m chỉ tính chỗ còn cao thông thủy từ 2,6 m (cộng 0,3 m sàn, mái)
  function usable(pts, zt, z1 = 0.45, step = 0.5) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    let A = 0;
    for (let x = Math.min(...xs) + step / 2; x < Math.max(...xs); x += step) for (let y = Math.min(...ys) + step / 2; y < Math.max(...ys); y += step) {
      if (!inPoly(pts, x, y)) continue;
      const top = typeof zt === "function" ? zt(x, y) : zt;
      for (let z = z1; top - z >= 2.9; z += 4.5) A += step * step;
    }
    return Math.round(A);
  }
  // khối mái dốc: diện tích sàn tính theo phần cao đủ dùng, không tính phần sát mái quá thấp
  const SL = (pts, z1, zt, c, zone, o = {}) => { const a = usable(pts, zt, z1); return PO(pts, z1, zt, c, zone, a ? { fl: 1, footOverride: a, ...o } : { fl: 0, ...o }); };
  // mặt phẳng đi qua 3 điểm (x, y, z)
  const plane3 = (a, b, c) => { const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]], n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; return (x, y) => a[2] - (n[0] * (x - a[0]) + n[1] * (y - a[1])) / n[2]; };
  const ring = (cx, cy, r, n = 12) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(2 * Math.PI * i / n), cy + r * Math.sin(2 * Math.PI * i / n)]);
  const ref = (name, by, year, place, award, url, what, take) => ({ name, by, year, place, award, url, what, take });
  const I = G.ideas7;
  const sunW = "Mặt sông nhìn Đông Đông Bắc (70°): nắng sáng mùa hè chiếu gần vuông góc nên dùng lam đứng. Mặt Trần Phú nhìn Tây Tây Nam (250°): nắng chiều mùa đông chiếu thẳng nên đặc.";

  /* ---------- 13.1 · học từ Nhà hát Opera Oslo ---------- */
  I.push({
    id: "ma1", fam: "mai", code: "13.1", name: "Mái bậc dốc lên từ bờ sông", rule: "Mặt phẳng dốc liền mặt đất, một khối đứng xuyên qua", tag: "Cả mái nhà là một mặt bậc ngồi dốc từ bậc thang Bạch Đằng lên +13,95 m, tháp đọc bốn tầng xuyên qua mái",
    ref: ref("Nhà hát Opera Oslo", "Snøhetta", "2008", "Oslo, Na Uy", "Giải Mies van der Rohe (Giải Kiến trúc Đương đại Liên minh châu Âu) 2009", "https://www.domusweb.it/en/news/2010/08/19/europe-s-best-buildings-mies-van-der-rohe-award-2009.html",
      "Mái nhà là một mặt đá trắng dốc thoai thoải đi lên từ mặt nước, ai cũng tự do đi bộ lên được. Khối tháp sân khấu cao và đặc nhô lên giữa mặt dốc đó.",
      "Mượn ý mái nhà liền với mặt đất và là không gian công cộng. Ở đây mặt dốc đi lên từ mép bậc thang Bạch Đằng về phía Trần Phú, làm thành bậc ngồi lớn nhìn ra sông; tháp đọc bốn tầng đứng xuyên qua mái như tháp sân khấu ở Oslo."),
    story: "Người đi trên đường Bạch Đằng leo bậc thang cao 5,5 m lên khu đất rồi cứ thế đi tiếp lên mái nhà: mái là một mặt bậc ngồi trắng dốc dần lên tới +13,95 m ở phía Trần Phú. Dưới mặt dốc là khu đọc ba tầng, càng vào sâu càng cao. Giữa mái nhô lên tháp đọc bốn tầng, như tháp sân khấu của nhà hát Oslo. Chiều tối, mái bậc nằm trong bóng của chính nó, thành khán đài ngồi xem sông Hàn và cầu Rồng.",
    why: [W("Quy luật hình khối", "Tương phản nằm – đứng: một mặt phẳng nghiêng rất lớn và một khối hộp đứng cắm xuyên qua nó. Mặt dốc nối liền bậc thang Bạch Đằng nên nhìn từ sông, công trình như một phần của bờ sông được nâng lên."),
      W("Khối chính – khối phụ", "Khối chính là mặt bậc dốc cùng tháp đọc +18,45 m, chiếm khoảng bốn phần năm diện tích sàn. Bốn khối phụ đều thấp và tối màu: hai nhà kho, kỹ thuật đá sát Trần Phú, nhà sự kiện và phòng chuyên đề ở đầu Nam."),
      W("Nắng và chói", sunW + " Mái bậc nghiêng về phía sông nên chiều tối nằm trong bóng râm, ngồi được. Mép cao của mái ở phía Trần Phú là tường đặc chắn nắng chiều cho khu đọc bên dưới."),
      W("Gió và mưa", "Gió mùa hè Đông Nam vào từ đầu Nam, lùa qua khe giữa mái bậc và nhà sự kiện. Mưa gió mùa đông đập vào mặt sông, nhưng phía sông chỉ là chân bậc ngồi thấp và kín; lối vào đặt ở đầu Bắc và đầu Nam, nơi mép mái cao 5–9 m có mái đua. Nước trên mái chảy theo bậc xuống rãnh thu ở chân."),
      W("Công năng", "Tầng 1 dưới mái là sảnh, cà phê nhìn sông và đọc mở; tầng 2, 3 lùi dần theo mái thành các bậc đọc. Tháp đọc: tầng 1 là quầy hướng dẫn, ba tầng trên là đọc yên tĩnh. Nhà sự kiện ở đầu Nam có lối riêng từ bãi xe.")],
    kc: { he: "Mái bậc là sàn bê tông dốc gối lên lưới cột 6 × 8 m, cột thẳng từ móng lên mái. Tháp đọc là khung bê tông riêng có lõi thang. Phần mái bậc ngoài trời nối xuống bậc thang Bạch Đằng đặt trên nền đất đắp.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Mái dốc như vậy đi lại có an toàn không?", "Mái không phải đường dốc trơn mà là bậc ngồi: bậc cao 0,45 m, sâu 1 m, dốc khoảng 1:2. Đi lên bằng các dải bậc thường đặt xen giữa, có lan can ở mép cao. Người đi xe lăn lên mái bằng thang máy trong tháp đọc."],
      ["Mái chịu tải người đứng đông có được không?", "Mái là sàn bê tông như mọi sàn khác, tính tải người như khán đài, gối lên cột cách nhau 6 m theo chiều dốc. Nhịp ngắn nên không cần dầm lớn."],
      ["Dưới mái thấp ở phía sông dùng làm gì?", "Chỗ mái thấp dưới 3 m làm kho sách mở và chỗ ngồi đọc dưới thấp; phần thấp hơn 2,6 m không tính vào diện tích sàn."]],
    cut: "Mái bậc: một khối foam trắng cắt vát, cao 7 cm ở mép Tây xuống 1,4 cm ở mép Đông, dán giấy kẻ vạch bậc. Tháp đọc: foam trắng 6 × 8 × 9 cm. Khối phụ: foam đen cao 2,25 cm, nhà sự kiện cao 3,5 cm.",
    roleOf: () => "p",
    lab: [[18, 44, 18.45, "Khối chính · Mái bậc dốc và tháp đọc", 1], [31, 46, 4.6, "Mái bậc ngồi nhìn sông"], [9, 34, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [9, 58, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2], [20, 82, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [33.5, 83, 4.95, "Khối phụ · Phòng chuyên đề", 2]],
    build() {
      const f = x => 13.95 - (x - 12) * 0.4667; // mái cao +13,95 ở mép Tây, hạ dần về phía sông
      const U = [[12, 20], [36, 20], [36, 72], [12, 72], [12, 52], [24, 52], [24, 36], [12, 36]];
      const v = [SL(U, 0.45, x => f(x), "sheet", "B", { fa: fR, top: "pave", ...M }),
        PO([[36, 20], [41.2, 20], [41.2, 72], [36, 72]], 0, x => 2.75 - (x - 36) * 0.47, "sheet", "X", { top: "pave", ...M }),
        ...stack(12, 36, 12, 16, ["A", "B", "B", "B"], "sheet", fR, { ribs: 1.5, ...M }),
        low(6, 22, 6, 24, "stone", "C", fD, { top: "stoneTop" }), low(6, 46, 6, 24, "stone", "E", fD, { top: "stoneTop" }),
        hall(13, 75, 14, 14, "blk"), low(29, 77, 9, 12, "blk", "D", fK, { top: "grass" })];
      const segs = [];
      for (let x = 13.2; x < 41; x += 1.2) { const z = (x < 36 ? f(x) : 2.75 - (x - 36) * 0.47) + 0.03; if (x < 24) segs.push([[x, 20, z], [x, 36, z]], [[x, 52, z], [x, 72, z]]); else segs.push([[x, 20, z], [x, 72, z]]); }
      v.push(LN(segs, "ink"));
      const st = [...colsIn([U], [12, 18, 24, 30, 36], range(20, 72, 8), 0.45, x => f(x)), ...grid([12, 18, 24], [36, 44, 52], 0.45, 18.45),
        ...lowSt(6, 22, 6, 24), ...lowSt(6, 46, 6, 24), ...hallSt(13, 75, 14, 14), ...lowSt(29, 77, 9, 12)];
      return { v, st };
    }
  });

  /* ---------- 13.2 · học từ Thư viện Đại học Công nghệ Delft ---------- */
  I.push({
    id: "ma2", fam: "mai", code: "13.2", name: "Đồi cỏ có nón đọc", rule: "Mặt đất nâng lên, một vật thể đứng xuyên qua", tag: "Mái cỏ dốc từ bãi xe lên +9,45 m, một chiếc nón đọc thon cao +24,45 m cắm xuyên qua đồi",
    ref: ref("Thư viện Đại học Công nghệ Delft", "Mecanoo", "1997", "Delft, Hà Lan", "", "https://en.wikipedia.org/wiki/TU_Delft_Library",
      "Thư viện nằm dưới một mái cỏ nghiêng nối liền mặt đất, sinh viên ngồi và đi lại trên mái, mùa đông trượt tuyết. Một chiếc nón cao xuyên qua mái cỏ, bên trong là các tầng học nối bằng cầu thang xoắn.",
      "Mượn ý mặt đất được nhấc lên thành mái nhà và một vật thể đứng duy nhất làm điểm nhấn. Ở đây mái cỏ dốc từ đầu Nam (gần bãi xe) lên +9,45 m ở giữa khu đất rồi phẳng tới đầu Bắc; nón đọc năm tầng thon dần lên +24,45 m, đứng ngay trên sườn đồi."),
    story: "Từ bãi xe phía Nam, người đến thấy một ngọn đồi cỏ thoai thoải và một chiếc nón trắng cắm giữa sườn đồi. Có thể đi bộ lên đồi ngồi đọc dưới tán cây, hoặc vào nhà từ đầu Bắc. Dưới đồi là khu đọc lớn hai tầng; trong nón là năm tầng đọc yên tĩnh nhỏ dần lên cao, ánh sáng rọi xuống từ đỉnh nón.",
    why: [W("Quy luật hình khối", "Nền nâng và điểm nhấn: cả khối nhà là một mặt đất nhấc lên, chỉ có một vật thể đứng là nón đọc. Đồi nằm ngang, nón đứng thẳng; đồi màu cỏ, nón màu trắng, tương phản rõ."),
      W("Khối chính – khối phụ", "Khối chính là đồi cỏ cùng nón đọc +24,45 m. Ba khối phụ là các khối thấp, tối màu xếp dọc đường Trần Phú: nhà sự kiện +7,45 m, kho nghiệp vụ và khối vệ sinh kỹ thuật. Nón cao gấp hơn ba lần khối phụ cao nhất."),
      W("Nắng và chói", sunW + " Mái cỏ dày giữ mát cho khu đọc bên dưới. Nón đọc lấy sáng từ đỉnh và các khe đứng hướng Bắc, không có kính lớn quay về hướng Tây."),
      W("Gió và mưa", "Sườn đồi dốc về đầu Nam, đúng hướng gió mùa hè Đông Nam thổi vào; gió lướt qua mặt cỏ mát rồi lên nón, nón làm ống khói kéo khí nóng ra ở đỉnh. Mưa trên đồi chảy theo sườn xuống rãnh ở chân đồi phía Nam."),
      W("Công năng", "Khối đầu Bắc: tầng 1 là sảnh, quầy hướng dẫn; tầng 2 đọc mở. Dưới sườn đồi là đọc mở, tra cứu và kệ sách. Nón đọc là năm tầng đọc yên tĩnh. Dãy phụ dọc Trần Phú có lối riêng cho xe sách.")],
    kc: { he: "Dưới đồi là khung bê tông lưới 7,3 × 8 m, mái là sàn bê tông dốc phủ đất trồng cỏ dày 30 cm. Nón là vỏ bê tông dày 30 cm thon dần, có lõi thang xoắn ở giữa, đứng trên móng riêng.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Nón cao 24 m nghiêng tường có đứng vững không?", "Tường nón chỉ nghiêng khoảng 10°, và nghiêng vào trong nên trọng tâm luôn nằm trong chân nón. Vỏ bê tông hình nón cứng như một ống, lại có lõi thang ở giữa nối các sàn."],
      ["Mái cỏ dốc có đi lên được không?", "Sườn đồi dốc khoảng 1:5, đi trên cỏ được nhưng không làm đường cho xe lăn. Có một lối bậc chạy dọc sườn; người đi xe lăn lên mái phẳng ở đầu Bắc bằng thang máy."],
      ["Đất trên mái có nặng không?", "Lớp đất 30 cm nặng khoảng 0,6 tấn mỗi mét vuông, tương đương tải người đông. Sàn mái tính thêm tải này nên dày hơn sàn thường một chút."]],
    cut: "Đồi: foam trắng cắt vát, cao 4,5 cm ở đầu Bắc xuống 0 ở đầu Nam, phủ bột cỏ. Nón: giấy bìa trắng cuộn hình nón cụt, đáy Ø 7,5 cm, đỉnh Ø 3,2 cm, cao 12 cm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[29, 61, 24.45, "Khối chính · Đồi cỏ và nón đọc", 1], [29, 72, 3.5, "Sườn cỏ đi lên được"], [12, 28, 7.45, "Khối phụ · Nhà sự kiện", 2], [12, 48, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [12, 69, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2]],
    build() {
      const f = y => 9.45 - (y - 38) * (8.85 / 46); // sườn cỏ: +9,45 ở y = 38 xuống +0,6 ở y = 84
      const r0 = 7.5, r1 = 3.2, rz = z => r0 + (r1 - r0) * (z - 0.45) / 24;
      const coneA = Math.round([4.95, 9.45, 13.95, 18.45].reduce((s, z) => s + 3 * rz(z) ** 2, 0)); // tầng 2–5 trong nón (tầng 1 đã tính trong đồi)
      const lawn = [[18, 38], [40, 38], [40, 84], [18, 84]];
      const v = [B(18, 20, 22, 18, Z(0), Z(1), "sheet", "A", { fa: fP, fl: 1, ...M }), B(18, 20, 22, 18, Z(1), Z(2), "sheet", "B", { fa: fR, fl: 1, top: "grass", ...M }),
        SL(lawn, 0.45, (x, y) => f(y), "sheet", "B", { fa: fR, top: "grass", ...M }),
        LO(ring(29, 61, r0), ring(29, 61, r1), 0.45, 24.45, "sheet", "B", { fl: 1, footOverride: coneA, ...M }),
        hall(6, 20, 12, 16, "blk"), low(6, 38, 12, 20, "stone", "C", fD, { top: "stoneTop" }), low(6, 60, 12, 18, "stone", "E", fD, { top: "stoneTop" })];
      const xs = [18, 25.33, 32.67, 40];
      const st = [...grid(xs, [20, 29, 38], 0.45, 9.45), ...colsIn([lawn], xs, range(46, 70, 8), 0.45, (x, y) => f(y)), col(29, 61, 0.45, 24.45),
        ...hallSt(6, 20, 12, 16), ...lowSt(6, 38, 12, 20), ...lowSt(6, 60, 12, 18)];
      return { v, st };
    }
  });

  /* ---------- 13.3 · học từ Trung tâm học tập Rolex ---------- */
  I.push({
    id: "ma3", fam: "mai", code: "13.3", name: "Sàn gợn hai vòm, sân khoét", rule: "Một mặt sàn uốn sóng, nhịp lặp hai vòm", tag: "Một tầng đọc rộng uốn lên thành hai vòm cho người đi bên dưới, khoét hai sân trong",
    ref: ref("Trung tâm học tập Rolex, EPFL", "SANAA (Kazuyo Sejima, Ryue Nishizawa)", "2010", "Lausanne, Thụy Sĩ", "Phương án thắng cuộc thi thiết kế năm 2004", "https://www.archdaily.com/69958/rolex-learning-center-sanaa-epfl-press",
      "Một tòa nhà một tầng rất rộng, sàn và mái cùng uốn lượn như mặt đất gợn sóng. Chỗ sàn nâng lên thành vòm cho người đi bên dưới vào sảnh giữa nhà; nhiều sân trong khoét xuyên qua.",
      "Mượn ý một tầng duy nhất uốn sóng thay cho nhiều tầng chồng lên nhau. Ở đây dải nhà rộng 29 m uốn lên hai vòm: vòm Bắc là trần cao của phòng đa năng, vòm Nam nhấc cả sàn đọc lên cao 4,5 m để gió và người đi xuyên từ Trần Phú ra sông."),
    story: "Từ xa, khu đọc như một tấm thảm trắng được ai đó nhấc lên hai chỗ. Dưới vòm Nam là lối đi có mái che xuyên khu đất, nối đường Trần Phú với bậc thang Bạch Đằng. Bên trong là một mặt sàn liên tục: theo các bậc ngồi đọc ở sườn vòm đi lên là tới chỗ đọc trên đỉnh vòm, nhìn qua sân trong ra sông. Hai đầu nhà là hai thanh văn phòng hai tầng giữ cho tấm sóng ở giữa.",
    why: [W("Quy luật hình khối", "Nhịp lặp và uốn sóng: hai vòm không bằng nhau nối bằng một đoạn võng giữa. Mặt sàn và mái song song nên chiều cao trong nhà đều, chỉ cao độ thay đổi. Hai sân khoét làm tấm sóng thủng như vải ren."),
      W("Khối chính – khối phụ", "Khối chính là tấm sóng một tầng và hai thanh văn phòng hai đầu, chiếm gần chín phần mười diện tích sàn. Hai khối phụ là hai nhà đá thấp dọc Trần Phú, cao một tầng."),
      W("Nắng và chói", sunW + " Đầu Bắc là kính lấy sáng tán xạ; mép sàn ở hai sân có mái đua. Mái sóng che nắng cho lối đi dưới vòm."),
      W("Gió và mưa", "Vòm Nam để trống bên dưới, gió mùa hè Đông Nam vào từ đầu Nam lùa thẳng qua gầm vòm. Mưa trên mái sóng chảy về hai chỗ võng, nơi có máng thu nước dẫn xuống sân trong."),
      W("Công năng", "Thanh đầu Bắc: sảnh ở tầng 1, văn phòng tầng 2. Dưới vòm Bắc là phòng đa năng 120 chỗ, trần cao tới 9 m. Đoạn võng giữa là đọc mở và tra cứu; trên vòm Nam là đọc yên tĩnh. Thanh đầu Nam: tầng 2 là kho sách và nghiệp vụ.")],
    kc: { he: "Sàn và mái là hai bản bê tông uốn song song, đỡ bằng lưới cột 7 × 6 m. Dưới vòm Nam, cột đứng từ mặt đất lên đỡ sàn nâng, nhịp ngắn nên không cần dầm cao. Phòng đa năng dưới vòm Bắc không cột, mái vòm bê tông tự đỡ nhịp 12 m.", nhip: "12 m (vòm trên phòng đa năng)", cx: "Không" },
    qa: [["Sàn uốn sóng thì xe lăn đi được không?", "Khu đất chỉ dài 104 m nên sườn vòm khá dốc, đoạn dốc nhất khoảng 1:1,5. Vì vậy sàn ở sườn vòm làm thành bậc ngồi đọc và bậc thang, còn đỉnh vòm và đoạn võng giữa thì phẳng. Người đi xe lăn lên đỉnh vòm bằng thang máy đặt ở hai thanh văn phòng."],
      ["Vòm Nam nhấc sàn lên cao thì đỡ bằng gì?", "Bằng hàng cột 7 × 6 m đứng từ móng lên. Gầm vòm cao 4,5 m, cột lộ ra như một hiên rộng có mái che."],
      ["Làm sàn cong có đắt không?", "Đúc bê tông trên ván khuôn cong có đắt hơn sàn phẳng. Có thể làm sàn bậc thoải từng đoạn 3 m như mô hình này, chỉ mặt hoàn thiện làm cong."]],
    cut: "Cắt 24 dải foam trắng rộng 1,5 cm, dài 14,5 cm, dày 2,25 cm; kê các dải theo đường sóng (cao nhất 2,25 cm) trên que tre 2 mm. Hai thanh văn phòng: foam trắng 14,5 × 3 × 4,5 cm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[27, 64, 9.45, "Khối chính · Sàn gợn hai vòm", 1], [18, 30, 9.45, "Vòm trên phòng đa năng"], [30, 64, 2.5, "Gầm vòm, lối đi xuyên"], [31, 48.5, 4.95, "Sân trong"], [8.5, 34, 4.95, "Khối phụ · Kho", 2], [8.5, 66, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2]],
    build() {
      const bump = (y, c, h) => Math.abs(y - c) < h ? 0.5 * (1 + Math.cos(Math.PI * (y - c) / h)) : 0;
      const b = y => Math.max(bump(y, 30, 10), bump(y, 64, 11));
      const holes = [[27, 44, 35, 53], [16, 74, 23, 80]]; // hai sân khoét
      const v = [], st = [], zrAt = {};
      for (let y0 = 14; y0 < 86; y0 += 3) {
        const zf = 0.45 + 4.5 * b(y0 + 1.5), zr = zf + 4.5, hallRow = y0 >= 20 && y0 < 40;
        zrAt[y0] = zr;
        let segs = [[12, 41]];
        if (hallRow) { v.push(B(12, y0, 12, 3, 0.45, zr, "sheet", "D", { fa: fK, fl: 1, top: "sheet", ...M })); segs = [[24, 41]]; }
        for (const [hx1, hy1, hx2, hy2] of holes) if (y0 < hy2 && y0 + 3 > hy1) segs = segs.flatMap(([a, c]) => [[a, Math.min(c, hx1)], [Math.max(a, hx2), c]].filter(([p, q]) => q - p > 0.5));
        for (const [a, c] of segs) v.push(B(a, y0, c - a, 3, zf, zr, "sheet", y0 < 20 ? "A" : "B", { fa: fR, fl: 1, top: "sheet", ...M }));
      }
      v.push(B(12, 14, 29, 6, 4.95, 9.45, "sheet", "E", { fa: fP, fl: 1, ...M }), B(12, 80, 29, 6, 4.95, 9.45, "sheet", "C", { fa: fK, fl: 1, ...M }),
        low(6, 22, 5, 26, "stone", "C", fD, { top: "stoneTop" }), low(6, 52, 5, 28, "stone", "E", fD, { top: "stoneTop" }));
      // cột: lưới 7 × 6 m, đứng từ mặt đất lên mái; phòng đa năng không cột; sân khoét không cột
      for (let y = 14; y <= 86; y += 6) for (const x of [12, 19, 26, 33, 41]) {
        if (holes.some(([a, p, c, q]) => x > a && x < c && y > p && y < q)) continue;
        if (x < 24 && y > 20 && y < 40) continue;
        const zr = Math.max(zrAt[y] || 0, zrAt[y - 3] || 0, (y === 20 || y === 80) ? 9.45 : 0) || 9.45;
        st.push(col(x, y, 0, y <= 20 || y >= 80 ? 9.45 : zr));
      }
      st.push(...lowSt(6, 22, 5, 26), ...lowSt(6, 52, 5, 28));
      return { v, st };
    }
  });

  /* ---------- 13.4 · học từ Thư viện Quốc gia Qatar ---------- */
  I.push({
    id: "ma4", fam: "mai", code: "13.4", name: "Hộp đọc gấp chéo, hai góc nhấc lên", rule: "Gấp giấy: một nếp gấp chéo xuyên suốt", tag: "Hộp đọc hai tầng có mái gấp theo đường chéo, hai góc đối diện nhấc khỏi mặt đất làm lối vào",
    ref: ref("Thư viện Quốc gia Qatar", "OMA", "2017", "Doha, Qatar", "", "https://worldarchitecture.org/architecture-news/ehcfp/oma-created-single-reading-room-for-qatars-national-library-with-lifted-edged-corners.html",
      "Toàn bộ thư viện là một phòng đọc lớn trong một khối hộp. Các góc hộp được gấp lên khỏi mặt đất như hai tờ giấy kéo tách ra, tạo lối vào có bóng mát ở góc.",
      "Mượn ý gấp góc hộp như gấp giấy. Ở đây chỉ gấp theo một đường chéo từ góc Đông Bắc tới góc Tây Nam: hai góc trên đường chéo nhấc lên làm lối vào, mái gấp thành sống nhà chạy theo chính đường chéo đó, hai góc kia hạ thấp xuống."),
    story: "Nhìn từ quảng trường Bắc, hộp đọc trắng có một góc như bị ai đó lật lên: dưới góc lật là lối vào chính, có bóng mát. Đi vào trong, mái nhà cao dần về giữa theo một nếp gấp chéo, dưới nếp gấp là các bậc kệ sách lên tầng lửng. Góc đối diện ở phía Nam cũng nhấc lên, là lối vào từ bãi xe. Cả nhà đọc như một tờ giấy gấp một lần.",
    why: [W("Quy luật hình khối", "Một thao tác duy nhất là gấp theo đường chéo, nên khối vẫn rất gọn nhưng không còn là hộp chữ nhật. Hai góc nhấc ở chân và sống mái ở đỉnh nằm trên cùng một đường chéo, nhìn góc nào cũng thấy nếp gấp."),
      W("Khối chính – khối phụ", "Khối chính là hộp đọc gấp, cao +13,95 m ở sống mái, chiếm khoảng bốn phần năm diện tích sàn. Ba khối phụ thấp, tối màu: hai nhà đá dọc Trần Phú và nhà sự kiện ở đầu Nam."),
      W("Nắng và chói", sunW + " Hai góc nhấc lên tạo bóng mát ngay ở lối vào, giống cách Thư viện Qatar che nắng gắt. Mái gấp có khe kính dọc sống mái, sáng xuống giữa phòng đọc mà không chói."),
      W("Gió và mưa", "Góc nhấc phía Tây Nam đón gió mùa hè thổi vào từ đầu Nam. Góc nhấc phía Đông Bắc nằm ở phía sông, hứng gió mưa mùa đông, nên vách kính lối vào lùi sâu vào trong khoảng 5 m dưới phần nhấc, mưa tạt không vào tới cửa. Mái gấp thoát nước về hai góc thấp."),
      W("Công năng", "Tầng 1 phía Bắc là sảnh và quầy hướng dẫn, phía Nam là thiếu nhi và đọc mở. Tầng 2 là một phòng đọc lớn có các bậc kệ sách dâng lên tầng lửng dưới nếp gấp. Kho, nghiệp vụ và vệ sinh ở dãy đá dọc Trần Phú.")],
    kc: { he: "Khung bê tông lưới 7,3 × 8 m. Tường tầng 2 là bốn dàn thép cao một tầng chạy quanh hộp, đỡ phần sàn nằm trên hai góc nhấc. Mái gấp là hai mặt phẳng bê tông gặp nhau ở sống chéo, đỡ bằng dầm chéo.", nhip: "14 m (mái nhà sự kiện)", cx: "Khoảng 5 m ở hai góc nhấc, đỡ bằng dàn tường cao một tầng" },
    qa: [["Góc hộp nhấc lên thì tầng trên đứng bằng gì?", "Tầng 2 có bốn bức tường là dàn thép cao một tầng (4,5 m). Dàn gối lên các cột phía trong cách góc 7 m, đỡ phần góc chìa ra khoảng 5 m. Dàn cao một tầng thì đỡ được đoạn chìa dài như vậy."],
      ["Mái gấp có dột ở sống chéo không?", "Sống mái là chỗ cao nhất nên nước chảy xa khỏi sống về hai góc thấp. Khe kính đặt ở mặt đứng của nếp gấp, không nằm phẳng trên mái."]],
    cut: "Tầng 1: foam trắng 11 × 20 × 2,25 cm, cắt vát hai góc 3,5 cm. Tầng 2: foam trắng cùng kích thước, mặt trên cắt hai mặt nghiêng gặp nhau theo đường chéo (cao 4,5 cm ở sống, 2,25 cm ở hai góc thấp). Hai góc nhấc: bìa trắng gấp tam giác. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[25, 46, 13.95, "Khối chính · Hộp đọc gấp chéo", 1], [34.5, 27.5, 3, "Góc nhấc, lối vào Bắc"], [15.5, 64.5, 3, "Góc nhấc, lối vào Nam"], [9, 34, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [9, 58, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2], [21, 79, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2]],
    build() {
      const x1 = 14, x2 = 36, y1 = 26, y2 = 66, c = 7;
      const T1 = [[x1, y1], [x2 - c, y1], [x2, y1 + c], [x2, y2], [x1 + c, y2], [x1, y2 - c]];
      const L = Math.hypot(x2 - x1, y2 - y1), dist = (x, y) => Math.abs(-(x2 - x1) * (y - y1) - (y2 - y1) * (x - x2)) / L, dmax = dist(x1, y1);
      const roof = (x, y) => 13.95 - 4.5 * dist(x, y) / dmax; // sống mái chạy theo đường chéo Đông Bắc – Tây Nam
      const v = [PO(cutY(T1, y1, 46), 0.45, 4.95, "sheet", "A", { fa: fP, fl: 1, ...M }), PO(cutY(T1, 46, y2), 0.45, 4.95, "sheet", "B", { fa: fR, fl: 1, ...M }),
        SL([[x2, y1], [x2, y2], [x1, y2], [x1, y1]], 4.95, roof, "sheet", "B", { fa: fR, top: "sheet", ...M }),
        S3([[x2 - c, y1, 0.6], [x2, y1, 4.95], [x2, y1 + c, 0.6]], 0.3, "sheet", "X", M), S3([[x1 + c, y2, 0.6], [x1, y2, 4.95], [x1, y2 - c, 0.6]], 0.3, "sheet", "X", M),
        low(6, 26, 6, 20, "stone", "C", fD, { top: "stoneTop" }), low(6, 46, 6, 20, "stone", "E", fD, { top: "stoneTop" }), hall(14, 72, 14, 14, "blk")];
      const xs = [14, 21.33, 28.67, 36], ys = range(26, 66, 8);
      const st = [...colsIn([T1], xs, ys, 0.45, roof), ...zig(x1, y1, x2, y1, 4.95, 9.45, 6), ...zig(x2, y1, x2, y2, 4.95, 9.45, 10), ...zig(x1, y2, x2, y2, 4.95, 9.45, 6), ...zig(x1, y1, x1, y2, 4.95, 9.45, 10),
        ...lowSt(6, 26, 6, 20), ...lowSt(6, 46, 6, 20), ...hallSt(14, 72, 14, 14)];
      return { v, st };
    }
  });

  /* ---------- 13.5 · học từ Bảo tàng Lịch sử Ninh Ba ---------- */
  I.push({
    id: "ma5", fam: "mai", code: "13.5", name: "Đế đá chân xiên, ba đỉnh núi tách", rule: "Khối nặng bị cắt, đỉnh lệch nhau như dãy núi", tag: "Đế đá một tầng tường xiên đỡ ba khối đọc mái nghiêng ba hướng khác nhau, giữa là hai khe sân thượng",
    ref: ref("Bảo tàng Lịch sử Ninh Ba", "Vương Thụ, Amateur Architecture Studio", "2008", "Ninh Ba, Trung Quốc", "Phương án giải nhất cuộc thi thiết kế quốc tế", "https://www.archdaily.com/14623/ningbo-historic-museum-wang-shu-architect",
      "Một khối bê tông lớn đọc như mặt núi, tường phủ gạch ngói cũ thu gom từ các làng bị phá dỡ. Sân chính cắt suốt chiều cao khối nhà lên tới sân thượng trên mái.",
      "Mượn ý khối nặng như núi bị các khe sân cắt xuyên lên mái. Ở đây đế đá một tầng có tường hơi xiên vào trong; phía trên tách thành ba khối đọc, mỗi khối một mái nghiêng về một hướng như ba đỉnh núi lệch nhau. Hai khe giữa các đỉnh là sân thượng đọc ngoài trời."),
    story: "Nhìn từ sông Hàn, nhà như một dãy núi nhỏ: chân núi là đế đá xám nằm sát đất, phía trên là ba đỉnh gạch đỏ, đỉnh Bắc cao nhất dốc về phía sông, đỉnh giữa dốc về Trần Phú, đỉnh Nam dốc về phía Bắc. Giữa các đỉnh là hai khe sân thượng, đứng ở đó nhìn được cả sông lẫn phố. Vật liệu là gạch ngói cũ thu gom, nhắc tới những ngôi nhà cũ của Đà Nẵng.",
    why: [W("Quy luật hình khối", "Bất đối xứng có kiểm soát: ba đỉnh cùng bề ngang nhưng mái nghiêng ba hướng và cao khác nhau (+18,45, +16,45, +17,45 m). Chân đế nghiêng vào trong khoảng 11° làm khối có vẻ bám đất, nặng như núi."),
      W("Khối chính – khối phụ", "Khối chính là đế đá và ba đỉnh núi, chiếm khoảng chín phần mười diện tích sàn. Hai khối phụ là nhà sự kiện và phòng chuyên đề thấp, màu đen, đặt riêng ở đầu Nam."),
      W("Nắng và chói", sunW + " Mỗi đỉnh có mặt kính hướng Bắc lấy sáng tán xạ. Khe sân thượng có mái đua ở mép Nam của mỗi đỉnh nên trưa vẫn có bóng."),
      W("Gió và mưa", "Hai khe sân thượng chạy ngang nhà từ sông sang phố, gió mùa hè đi qua khe làm mát các tầng đọc hai bên. Mái nghiêng thoát nước nhanh về các khe, có máng thu."),
      W("Công năng", "Đế đá: phía Bắc là sảnh, phía giữa là kho, nghiệp vụ, phía Nam là vệ sinh, kỹ thuật và thiếu nhi. Ba đỉnh là ba khu đọc riêng: đọc mở, tra cứu, đọc yên tĩnh. Hai khe là sân đọc ngoài trời.")],
    kc: { he: "Khung bê tông lưới 6,7 × 8 m, cột chạy thẳng từ móng qua đế lên tới mái từng đỉnh. Tường đế là bê tông xây áp gạch ngói tái chế, nghiêng vào trong. Mái mỗi đỉnh là sàn bê tông phẳng đặt nghiêng.", nhip: "15 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Tường nghiêng có làm khó bố trí bên trong không?", "Tường chỉ nghiêng 0,9 m trên chiều cao 4,5 m, phần sát tường dùng làm kệ sách thấp và ghế ngồi. Cột và sàn vẫn thẳng đứng, chỉ lớp tường ngoài nghiêng."],
      ["Mái nghiêng có cần dầm đặc biệt không?", "Không. Mỗi mái là một mặt phẳng, dầm mái đặt nghiêng theo một hướng, cột dài ngắn khác nhau. Cách làm này giống mái dốc nhà thường."],
      ["Gạch ngói cũ lấy ở đâu?", "Thu gom từ các công trình cũ tháo dỡ ở Đà Nẵng, dùng làm lớp áo ngoài không chịu lực, như cách làm ở Ninh Ba."]],
    cut: "Đế: ba khối foam xám 11 × 8 × 2,25 cm, cắt vát cạnh ngoài 0,45 cm. Ba đỉnh: foam đỏ 10 × 6–7 cm, mặt trên cắt nghiêng (cao 3,25–6,75 cm). Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[24, 33, 18.45, "Khối chính · Đế đá và ba đỉnh núi", 1], [30, 41, 5.2, "Khe sân thượng"], [30, 57, 5.2, "Khe sân thượng"], [20.5, 83, 7.45, "Khối phụ · Nhà sự kiện", 2], [34, 83, 4.95, "Khối phụ · Phòng chuyên đề", 2]],
    build() {
      const x1 = 13, x2 = 35, ins = 0.9;
      const base = [[26, 42, "A"], [42, 58, "C"], [58, 74, "E"]].map(([ya, yb, zone], i) => LO([[x1, ya], [x2, ya], [x2, yb], [x1, yb]],
        [[x1 + ins, i === 0 ? ya + ins : ya], [x2 - ins, i === 0 ? ya + ins : ya], [x2 - ins, i === 2 ? yb - ins : yb], [x1 + ins, i === 2 ? yb - ins : yb]], 0.45, 4.95, "stone", zone, { fl: 1, top: "stoneTop", ...M }));
      const P1 = [[14, 27], [34, 27], [34, 39], [14, 39]], P2 = [[14, 43], [34, 43], [34, 55], [14, 55]], P3 = [[14, 59], [34, 59], [34, 73], [14, 73]];
      const f1 = plane3([14, 27, 18.45], [34, 27, 15.45], [14, 39, 14.95]), f2 = x => 11.45 + 5 * (x - 14) / 20, f3 = plane3([34, 59, 12.45], [14, 59, 14.95], [14, 73, 17.45]);
      const v = [...base, SL(P1, 4.95, f1, "ribbon", "B", { fa: fR, top: "ribbon", ...M }), SL(P2, 4.95, x => f2(x), "ribbon", "B", { fa: fR, top: "ribbon", ...M }), SL(P3, 4.95, f3, "ribbon", "B", { fa: fR, top: "ribbon", ...M }),
        hall(13, 77, 15, 12, "blk"), low(30, 78, 8, 11, "blk", "D", fK, { top: "grass" })];
      const xs = [14, 20.67, 27.33, 34];
      const st = [...colsIn([P1], xs, [27, 33, 39], 0.45, f1), ...colsIn([P2], xs, [43, 49, 55], 0.45, x => f2(x)), ...colsIn([P3], xs, [59, 66, 73], 0.45, f3), ...grid(xs, [41, 57], 0.45, 4.95),
        ...hallSt(13, 77, 15, 12), ...lowSt(30, 78, 8, 11)];
      return { v, st };
    }
  });

  /* ---------- 13.6 · học từ Bảo tàng Tirpitz ---------- */
  I.push({
    id: "ma6", fam: "mai", code: "13.6", name: "Bốn cánh dốc quanh sân, rãnh cắt chéo", rule: "Khối trừ: bốn rãnh cắt hội tụ về một sân", tag: "Bốn cánh nhà mái cỏ dốc lên về phía sân giữa, bị bốn rãnh chéo cắt rời, mỗi cánh cao một kiểu",
    ref: ref("Bảo tàng Tirpitz", "BIG (Bjarke Ingels Group)", "2017", "Blåvand, Đan Mạch", "AIA Institute Honor Award for Architecture 2019", "https://www.dezeen.com/2017/07/14/big-carves-linear-pattern-dunegerman-bunker-denmark/",
      "Bảo tàng gần như chìm trong cồn cát cạnh một boong-ke cũ: các lối đi được cắt thẳng vào cồn và hội tụ về một sân trung tâm. Từ ngoài chỉ thấy các mặt kính ở chỗ cắt và mái cát liền với đồi.",
      "Mượn ý các rãnh cắt vào khối đất hội tụ về sân giữa. Ở đây khối đất được nâng lên thành bốn cánh mái cỏ dốc dần về phía sân, giống một cái phễu lệch; bốn rãnh chéo từ bốn góc khu đất dẫn người vào sân."),
    story: "Đứng ở góc đường, người ta chỉ thấy những mái cỏ thấp và một rãnh mở ra phía trước. Đi theo rãnh, hai bên mái cỏ cao dần, tới sân giữa thì bốn bức tường kính cao vây quanh. Cánh Bắc cao nhất (+18,45 m), cánh Đông thấp nhất (+10,45 m) để sân nhìn ra sông. Mỗi rãnh là một lối vào: từ quảng trường, từ bãi xe, từ bậc thang Bạch Đằng và từ Trần Phú.",
    why: [W("Quy luật hình khối", "Khối trừ và hội tụ: bốn rãnh chéo cắt một khối đất thành bốn cánh, mọi đường đều dẫn về sân giữa. Bốn cánh dốc lên với bốn độ cao khác nhau nên nhìn lệch, nhưng mặt bằng đối xứng qua tâm sân."),
      W("Khối chính – khối phụ", "Khối chính là bốn cánh mái cỏ, đọc như một quả đồi bị cắt, chiếm gần chín phần mười sàn. Hai khối phụ là hai dãy đá thấp dọc Trần Phú chứa vệ sinh, kỹ thuật."),
      W("Nắng và chói", sunW + " Cánh Tây (phía Trần Phú) quay lưng đặc ra phố. Mặt kính lớn chỉ mở vào sân giữa, có mái đua sâu và bóng của chính các cánh che."),
      W("Gió và mưa", "Rãnh Đông Nam mở về phía gió mùa hè, đưa gió vào sân giữa rồi thoát lên trên. Cánh Đông thấp nên mùa đông gió mưa từ sông lướt qua mái cỏ, không đập vào kính sân."),
      W("Công năng", "Cánh Bắc: tầng 1 sảnh, các tầng trên đọc mở. Cánh Nam: phòng đa năng 120 chỗ dưới phần mái cao, phía ngoài là đọc thiếu nhi. Cánh Đông: đọc nhìn sông. Cánh Tây: kho, nghiệp vụ sát lối Tây.")],
    kc: { he: "Mỗi cánh là khung bê tông, sàn mái là bản bê tông dốc phủ đất trồng cỏ, gối lên lưới cột 7 × 7 m. Tường quanh sân là vách kính có khung thép. Phòng đa năng dưới cánh Nam không cột, mái đỡ bằng dầm bê tông nhịp tới 14 m.", nhip: "14 m (phòng đa năng)", cx: "Không" },
    qa: [["Rãnh cắt hẹp có tối và ngập nước không?", "Rãnh rộng 3,5–4 m, mở lên trời và dốc nhẹ ra ngoài 1%, nước chảy về hai đầu rãnh. Thành rãnh thấp ở phía ngoài (5 m) và cao dần vào trong nên lúc nào cũng có ánh sáng."],
      ["Mái cỏ dốc như vậy có giữ được đất không?", "Cánh Bắc dốc khoảng 1:2,3, cánh Nam 1:3, cánh Đông 1:2, cánh Tây dốc nhất, khoảng 1:1,2. Đất được giữ bằng lưới địa kỹ thuật và các gờ ngang, như mái cỏ dốc thường gặp. Mái không làm lối đi, chỉ có bậc nhỏ để bảo trì."]],
    cut: "Bốn cánh: foam trắng cắt vát, cao 2,5 cm ở mép ngoài lên 5–9 cm ở mép sân, phủ bột cỏ. Rãnh: chừa trống 1,75–2 cm. Khối phụ: foam đen thấp.",
    roleOf: () => "p",
    lab: [[26, 38, 16.5, "Khối chính · Bốn cánh dốc quanh sân", 1], [26, 50, 0.5, "Sân giữa"], [20, 30, 0.5, "Rãnh vào"], [8.5, 36, 4.95, "Khối phụ · Vệ sinh", 2], [8.5, 64, 4.95, "Khối phụ · Kỹ thuật", 2]],
    build() {
      const e = 5.45; // mép ngoài các cánh cao +5,45 m
      const N = [[16, 16], [36, 16], [28.5, 46], [23.5, 46]], S = [[36, 86], [16, 86], [23.5, 54], [28.5, 54]], E = [[40, 20], [40, 82], [30, 52.5], [30, 47.5]], Wg = [[12, 82], [12, 20], [22, 47.5], [22, 52.5]];
      const fN = (x, y) => e + (18.45 - e) * (y - 16) / 30, fS = (x, y) => e + (15.95 - e) * (86 - y) / 32, fE = x => e + (10.45 - e) * (40 - x) / 10, fW = x => e + (13.95 - e) * (x - 12) / 10;
      const g = { top: "grass" };
      const v = [SL(cutY(N, 16, 30), 0.45, fN, "sheet", "A", { fa: fP, ...g, ...M }), SL(cutY(N, 30, 46), 0.45, fN, "sheet", "B", { fa: fR, ...g, ...M }),
        SL(cutY(S, 74, 86), 0.45, fS, "sheet", "B", { fa: fR, ...g, ...M }), PO(cutY(S, 54, 74), 0.45, fS, "sheet", "D", { fa: fK, fl: 1, ...g, ...M }),
        SL(E, 0.45, x => fE(x), "sheet", "B", { fa: fR, ...g, ...M }), SL(Wg, 0.45, x => fW(x), "sheet", "C", { fa: fK, ...g, ...M }),
        low(6, 24, 5, 24, "stone", "E", fD, { top: "stoneTop" }), low(6, 52, 5, 24, "stone", "E", fD, { top: "stoneTop" })];
      const st = [...colsIn([N], [19, 26, 33], [16, 23, 30, 37, 44], 0.45, fN), ...colsIn([S], [19, 26, 33], [74, 80, 86], 0.45, fS), ...colsIn([E], [33, 40], range(24, 78, 7), 0.45, x => fE(x)), ...colsIn([Wg], [12, 19], range(24, 78, 7), 0.45, x => fW(x)),
        ...lowSt(6, 24, 5, 24), ...lowSt(6, 52, 5, 24)];
      return { v, st };
    }
  });

  /* ---------- 13.7 · học từ Thư viện thành phố Seinäjoki (Apila) ---------- */
  I.push({
    id: "ma7", fam: "mai", code: "13.7", name: "Ba lá mái gấp quanh sảnh kính", rule: "Cụm lá xoay quanh một tâm, mỗi lá nghiêng một hướng", tag: "Ba khối đọc mặt bằng đa giác, mỗi khối một mái nghiêng riêng, xòe quanh một sảnh kính thấp như ba lá cỏ",
    ref: ref("Thư viện thành phố Seinäjoki (Apila)", "JKMM Architects", "2012", "Seinäjoki, Phần Lan", "Vào chung kết Giải Finlandia cho Kiến trúc 2014; giải khuyến khích European Copper in Architecture Awards 2013", "https://www.arkkitehtuurinfinlandia.fi/en/finalists/seinajoki-main-library-apila",
      "Thư viện mới bọc đồng, gồm các khối có mái nghiêng nhiều mặt ghép lại; tên Apila nghĩa là cỏ ba lá. Nhà đặt cạnh thư viện cũ của Alvar Aalto và nối với nó bằng đường hầm.",
      "Mượn ý một cụm khối mái nghiêng bọc kim loại xếp như cỏ ba lá. Ở đây ba lá đọc có mặt bằng đa giác lệch, mỗi lá một mái nghiêng về một hướng (lá Bắc cao ở đầu Bắc, lá Đông cao ở góc sông, lá Tây cao ở phía Trần Phú), chụm vào một sảnh kính thấp ở giữa."),
    story: "Ba lá đọc màu đồng xòe ra từ một sảnh kính thấp. Lá Bắc dựng mái cao ở đầu Bắc, đón ánh sáng tán xạ qua khe kính lớn. Lá Đông vươn cao ở góc nhìn ra sông. Lá Tây dựng bức tường đặc cao về phía Trần Phú để chắn nắng chiều. Giữa các lá là những khe hẹp dẫn gió và người vào sảnh.",
    why: [W("Quy luật hình khối", "Xoay vòng quanh một tâm: ba lá có kích thước, hướng mái và độ cao khác nhau nhưng cùng vật liệu, cùng tụ về sảnh. Không có cạnh nào song song hoàn toàn với nhau, nhìn hơi tự do nhưng mỗi lá là một mặt phẳng nghiêng đơn giản."),
      W("Khối chính – khối phụ", "Khối chính là ba lá đọc bọc đồng cùng sảnh kính, chiếm phần lớn diện tích sàn. Ba khối phụ thấp, tối màu: hai nhà đá dọc Trần Phú và nhà sự kiện ở đầu Nam."),
      W("Nắng và chói", sunW + " Mép cao của lá Bắc quay về hướng Bắc Tây Bắc, lấy ánh sáng tán xạ. Lá Tây cao ở phía Trần Phú là tường đồng đặc."),
      W("Gió và mưa", "Khe giữa lá Đông và lá Tây mở về đầu Nam, dẫn gió mùa hè vào sảnh. Mái nghiêng thoát nước về phía thấp của từng lá, máng thu chạy dọc chân mái."),
      W("Công năng", "Sảnh kính là quầy hướng dẫn, cà phê và trưng bày. Lá Bắc là đọc mở hai, ba tầng. Lá Đông là đọc yên tĩnh nhìn sông. Lá Tây là thiếu nhi và học nhóm. Kho, nghiệp vụ và vệ sinh ở dãy đá dọc Trần Phú.")],
    kc: { he: "Mỗi lá là khung bê tông lưới khoảng 7 × 8 m, mái là sàn bê tông phẳng đặt nghiêng, ốp tấm đồng. Sảnh kính là khung thép nhẹ một tầng nối ba lá.", nhip: "14 m (mái nhà sự kiện)", cx: "Không" },
    qa: [["Mặt bằng đa giác có khó bố trí phòng không?", "Mỗi lá vẫn có một lưới cột vuông góc bên trong; chỉ mép ngoài cắt xiên. Góc nhọn ở mép dùng làm kệ sách, ghế ngồi cạnh cửa sổ."],
      ["Ốp đồng có nóng không?", "Tấm đồng là lớp vỏ ngoài, sau nó có khe thông gió và lớp cách nhiệt. Đồng để lâu chuyển màu nâu sẫm rồi xanh, không cần sơn."]],
    cut: "Ba lá: foam cam đồng cắt theo mặt bằng đa giác, mặt trên cắt nghiêng (cao 3–6,5 cm). Sảnh: mica trong 2,25 cm. Khối phụ: foam đen.",
    roleOf: () => "p",
    lab: [[22, 24, 12.95, "Khối chính · Ba lá mái gấp", 1], [36, 46, 11.9, "Lá Đông cao về phía sông"], [16, 56, 8.5, "Lá Tây, tường cao chắn nắng chiều"], [26, 41, 4.95, "Sảnh kính"], [9, 32, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [9, 57, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2], [19, 80, 7.45, "Khối phụ · Nhà sự kiện", 2]],
    build() {
      const LN_ = [[12, 16], [34, 16], [38, 28], [28, 38], [12, 36]];
      const NODE = [[12, 36], [28, 38], [38, 28], [40, 28], [40, 40], [31, 44], [12, 44]];
      const LE = [[31, 44], [40, 40], [40, 82], [32, 84], [27, 62]];
      const LW = [[12, 44], [25, 44], [23, 60], [26, 70], [12, 70]];
      const fN = plane3([12, 16, 12.95], [34, 16, 12.95], [28, 38, 8.45]), fE = plane3([40, 40, 11.95], [32, 84, 6.45], [27, 62, 7.45]), fW = x => 8.95 - (x - 12) * (3 / 14);
      const cu = { top: "ribbon" };
      const v = [SL(LN_, 0.45, fN, "ribbon", "B", { fa: fR, ...cu, ...M }), PO(NODE, 0.45, 4.95, "glass", "A", { fa: fP, fl: 1, ...M }), SL(LE, 0.45, fE, "ribbon", "B", { fa: fR, ...cu, ...M }), SL(LW, 0.45, x => fW(x), "ribbon", "B", { fa: fR, ...cu, ...M }),
        low(6, 22, 6, 20, "stone", "C", fD, { top: "stoneTop" }), low(6, 46, 6, 20, "stone", "E", fD, { top: "stoneTop" }), hall(12, 73, 14, 14, "blk")];
      const st = [...colsIn([LN_], [12, 19, 26, 33], [16, 24, 32], 0.45, fN), ...colsIn([LE], [33, 40], range(44, 80, 8), 0.45, fE), ...colsIn([LW], [12, 18, 24], [44, 52, 60, 68], 0.45, x => fW(x)),
        ...grid([12, 20, 28], [44], 0.45, 4.95), ...lowSt(6, 22, 6, 20), ...lowSt(6, 46, 6, 20), ...hallSt(12, 73, 14, 14)];
      return { v, st };
    }
  });

  /* ---------- 13.8 · học từ Bảo tàng nghệ thuật UCCA Dune ---------- */
  I.push({
    id: "ma8", fam: "mai", code: "13.8", name: "Đồi cát khoét hang, giếng trời tròn", rule: "Khối đất mềm, khoét hang bên trong", tag: "Cả nhà là một quả đồi mềm hai đỉnh, cao +11,95 m và khoảng +9 m, bên trong khoét hang đọc, hai giếng trời mở xuyên đồi",
    ref: ref("Bảo tàng nghệ thuật UCCA Dune", "OPEN Architecture", "2018", "Tần Hoàng Đảo, Trung Quốc", "ArchDaily Building of the Year 2019, hạng mục công trình văn hóa; AZ Awards 2019", "https://boty.archdaily.com/us/2019/candidates/121099/ucca-dune-art-museum-slash-open-architecture",
      "Bảo tàng nằm dưới một cồn cát tự nhiên bên bờ biển, phần lớn chìm trong cát. Các phòng trưng bày như những hang bê tông nối nhau, ánh sáng xuống qua các lỗ mở trên mặt cồn.",
      "Mượn ý một khối đất mềm có hang bên trong thay cho các hộp phòng. Ở đây cả khu đọc là một quả đồi hai đỉnh phủ màu cát, chiều cao thay đổi liên tục; dưới đỉnh cao là phòng đa năng, dưới đỉnh thấp là tầng lửng đọc; hai giếng trời khoét xuyên đồi lấy sáng và gió."),
    story: "Không có góc nhà, không có hộp: chỉ có một quả đồi màu cát nằm giữa phố Trần Phú và sông Hàn. Trẻ em leo lên sườn đồi thấp ở rìa, người lớn đi vào các cửa hang ở chân đồi. Bên trong, trần cong cao thấp khác nhau: chỗ cao nhất 11 m là phòng đa năng, chỗ thấp là góc đọc ấm cúng. Ánh sáng rơi xuống qua hai giếng trời tròn.",
    why: [W("Quy luật hình khối", "Khối mềm liền một mảnh: chiều cao thay đổi liên tục từ +3,95 m ở rìa lên +11,95 m ở đỉnh, không có cạnh gãy. Hai đỉnh lệch nhau về vị trí và độ cao nên nhìn tự nhiên như đồi cát thật."),
      W("Khối chính – khối phụ", "Khối chính là quả đồi, chiếm gần chín phần mười diện tích sàn. Hai khối phụ là hai dãy đá thấp, thẳng, tối màu dọc Trần Phú; dáng thẳng của chúng làm đồi càng mềm."),
      W("Nắng và chói", sunW + " Đồi gần như không có cửa sổ ở mặt Tây; ánh sáng vào chủ yếu qua hai giếng trời và các cửa hang mở về đầu Bắc và đầu Nam. Lớp vỏ dày giữ mát."),
      W("Gió và mưa", "Giếng trời làm ống thông gió: gió mùa hè vào từ cửa hang đầu Nam, khí nóng thoát lên giếng. Mưa trên vỏ đồi chảy xuống chân đồi, cửa hang phía sông có mái đua sâu."),
      W("Công năng", "Phần Bắc của đồi là sảnh và quầy hướng dẫn. Dưới đỉnh cao là phòng đa năng 120 chỗ, quanh đó là đọc mở. Dưới đỉnh thấp ở phía Nam có tầng lửng đọc yên tĩnh. Hai giếng trời là sân đọc ngoài trời.")],
    kc: { he: "Vỏ đồi là bê tông phun dày 25–30 cm trên khung thép cong, gối lên lưới cột 7 × 8 m bên trong. Phòng đa năng dưới đỉnh cao không cột, vỏ cong tự đỡ nhịp khoảng 11 m như một vòm.", nhip: "11 m (vỏ cong trên phòng đa năng)", cx: "Không" },
    qa: [["Vỏ cong làm bằng cách nào ở Việt Nam?", "Dựng khung thép cong theo các lát cắt, căng lưới thép rồi phun bê tông, giống cách làm mái vòm, hang nhân tạo ở khu du lịch. Mặt ngoài phủ sơn màu cát hoặc đá rửa."],
      ["Phòng đa năng dưới vỏ cong có cần cột không?", "Không. Vỏ cong hai chiều làm việc như vòm, đẩy lực xuống chân vỏ; chân vỏ đặt trên dầm móng và các cột quanh phòng."]],
    cut: "Đồi: xếp các lát foam dày 1 cm cắt theo đường đồng mức, chà nhám cho mềm, sơn màu cát; khoét hai giếng tròn. Khối phụ: foam đen thấp.",
    roleOf: () => "p",
    lab: [[24, 40, 11.95, "Khối chính · Đồi cát khoét hang", 1], [31, 68, 9, "Đỉnh thấp, tầng lửng đọc"], [30, 59.5, 5, "Giếng trời"], [8.5, 35, 4.95, "Khối phụ · Kho, nghiệp vụ", 2], [8.5, 69, 4.95, "Khối phụ · Vệ sinh, kỹ thuật", 2]],
    build() {
      const gs = (x, y, cx, cy, sx, sy) => Math.exp(-((x - cx) ** 2 / (2 * sx * sx) + (y - cy) ** 2 / (2 * sy * sy)));
      const f = (x, y) => 3.95 + 8 * gs(x, y, 24, 40, 8, 11) + 5 * gs(x, y, 31, 68, 6, 9); // đỉnh cao +11,95, đỉnh thấp khoảng +9
      const holes = [[26.5, 56, 33.5, 63], [15.5, 70, 19, 76]]; // hai giếng trời
      const v = [], st = [];
      for (let x0 = 12; x0 < 40; x0 += 3.5) {
        const x1 = x0 + 3.5, hs = holes.filter(([a, , c]) => a < x1 - 0.1 && c > x0 + 0.1);
        let ys = [[14, 88]];
        for (const [, p, , q] of hs) ys = ys.flatMap(([a, c]) => [[a, Math.min(c, p)], [Math.max(a, q), c]].filter(([s, t]) => t - s > 1));
        for (const [ya, yb] of ys) for (const [za, zb, zone] of [[ya, Math.min(yb, 30), "A"], [Math.max(ya, 30), Math.min(yb, 52), x0 >= 17 && x1 <= 32 ? "D" : "B"], [Math.max(ya, 52), yb, "B"]]) {
          if (zb - za < 1) continue;
          const pts = [];
          for (let y = za; y < zb - 0.01; y += 2) pts.push([x0, y]);
          pts.push([x0, zb]);
          for (let y = zb; y > za + 0.01; y -= 2) pts.push([x1, y]);
          pts.push([x1, za]);
          // phòng đa năng: một không gian cao, không tính tầng lửng phía trên
          v.push(zone === "D" ? PO(pts, 0.45, f, "pave", zone, { fa: fK, fl: 1, top: "pave", ...M }) : SL(pts, 0.45, f, "pave", zone, { fa: fR, top: "pave", ...M }));
        }
      }
      v.push(low(6, 20, 5, 30, "stone", "C", fD, { top: "stoneTop" }), low(6, 54, 5, 30, "stone", "E", fD, { top: "stoneTop" }));
      for (let y = 14; y <= 86; y += 8) for (const x of [12, 19, 26, 33, 40]) {
        if (holes.some(([a, p, c, q]) => x >= a && x <= c && y >= p && y <= q)) continue;
        if (x > 17 && x < 32 && y > 30 && y < 52) continue; // phòng đa năng không cột
        st.push(col(x, y, 0.45, f(x, y)));
      }
      st.push(...lowSt(6, 20, 5, 30), ...lowSt(6, 54, 5, 30));
      return { v, st };
    }
  });
})(window.G3);
