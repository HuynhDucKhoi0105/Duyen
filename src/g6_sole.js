
/* ================= Đợt 4 · 9. Hộp treo so le: 5 biến thể phát triển từ 1.3 ================= */
/* Hướng thật: mặt sông (x = 41,5) nhìn 70° Đông Đông Bắc, mặt Trần Phú nhìn 250° Tây Tây Nam, đầu Nam nhìn 160°, đầu Bắc nhìn 340°. */
(function (G) {
  const { B, col, wall, seg, grid, range, zig } = G.K;
  const { pylon, axisAt, stays, cables } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I = G.ideas6;
  const L = k => 0.95 + 4.5 * k; // sàn hộp treo: L(1) = +5,45 (tầng 2), L(2) = +9,95 ... (dàn đáy cao 0,5 m)
  const fDoc = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fCong = { N: "lam", E: "lam", S: "dua", W: "dac" }, fSu = { N: "dac", E: "lam", S: "dac", W: "dac" };
  const fDac = { N: "dac", E: "dac", S: "dac", W: "dac" }, fNhi = { N: "kinh", E: "lam", S: "dua", W: "dac" }, fCau = { N: "kinh", E: "lam", S: "kinh", W: "lam" };
  // hộp đọc treo: mỗi tầng một hộp, cùng màu trắng, bắt đầu ở sàn L(k)
  const hbox = (x, y, w, d, k, zones) => zones.map((zn, i) => B(x, y, w, d, L(k + i), L(k + i + 1), "sheet", zn, { fa: fDoc, fl: 1, ...M }));
  // hai mặt dọc của hộp là dàn thép cao hết hộp
  const truss = (x, y, w, d, k, n, ax) => ax === "x" ? [...zig(x, y, x + w, y, L(k), L(k + 2), n), ...zig(x, y + d, x + w, y + d, L(k), L(k + 2), n)] : [...zig(x, y, x, y + d, L(k), L(k + 2), n), ...zig(x + w, y, x + w, y + d, L(k), L(k + 2), n)];
  const core = (x, y, w, d, z2) => B(x, y, w, d, 0.45, z2, "stone", "X", { top: "stoneTop", ...M });
  const low = (x, y, w, d, c, zone, fa, o = {}) => B(x, y, w, d, 0.45, 4.95, c, zone, { fa, fl: 1, ...o });
  const hall = (x, y, w, d) => B(x, y, w, d, 0.45, 7.45, "blk", "D", { fa: fSu, fl: 1, top: "blkTop" });
  const near = (a, b) => Math.abs(a - b) < 0.01;
  // cột quanh chu vi khối thấp, bước khoảng s mét
  const perim = (x, y, w, d, z2, s = 6) => grid(range(x, x + w, w / Math.max(1, Math.round(w / s))), range(y, y + d, d / Math.max(1, Math.round(d / s))), 0.45, z2, (a, b) => near(a, x) || near(a, x + w) || near(b, y) || near(b, y + d));
  // dây hai mặt phẳng: neo trên hai mặt dọc x = const (hộp chạy Bắc–Nam) hoặc y = const (hộp chạy Đông–Tây)
  // dây cùng một phía trụ gom chung một bó nửa quạt: dây ngắn neo thấp, dây dài neo cao, mỗi dây một điểm neo riêng
  const fan = (P, zA, zB, pts, k) => { const a = axisAt(P, zA), lo = pts.filter(p => p[k] < a[k]), hi = pts.filter(p => p[k] >= a[k]), o = s => k ? [0, s] : [s, 0];
    return [...(lo.length ? stays(P, zA, zB, lo, o(-0.35)) : []), ...(hi.length ? stays(P, zA, zB, hi, o(0.35)) : [])]; };
  const fanX = (P, zA, zB, xs, ys, z) => fan(P, zA, zB, xs.flatMap(x => ys.map(y => [x, y, z])), 0);
  const fanY = (P, zA, zB, ys, xs, z) => fan(P, zA, zB, ys.flatMap(y => xs.map(x => [x, y, z])), 1);
  const axis = P => seg(axisAt(P, P.z1), axisAt(P, P.z2));

  /* ---------- 9.1 Ba hộp treo bậc thang ---------- */
  I.push({
    id: "sl1", fam: "sole", code: "9.1", from: "1.3", name: "Ba hộp treo bậc thang", rule: "Tiến dần, lệch có kiểm soát", tag: "Ba hộp đọc giống nhau, mỗi hộp lệch 6 m về phía sông và cao thêm 1 tầng, hai trụ dùng chung",
    story: "Ba hộp đọc cùng tiết diện 14 × 22 m nối thành chuỗi từ đầu Bắc xuống đầu Nam. Hộp sau dịch về phía sông đúng 6 m và cao hơn hộp trước đúng một tầng, nên đi dọc Bạch Đằng thấy chuỗi hộp leo dần như bậc thang. Giữa hai hộp là một trụ thon, dây văng hai phía đỡ đầu hộp trước và đầu hộp sau, như hai đĩa cân treo trên một đòn gánh.",
    why: [W("Quy luật hình khối", "Tiến dần: một hộp lặp lại ba lần, mỗi lần dịch đúng một bước lưới 6 m và lên đúng một tầng 4,5 m. Độ lệch đều nhau nên nhìn bất đối xứng mà vẫn có trật tự."),
      W("Khối chính – khối phụ", "Ba hộp trắng treo cao là khối chính: khoảng 2/3 diện tích sàn, đỉnh cao gấp 3 lần khối phụ. Bốn khối phụ chỉ một tầng (nhà sự kiện cao 7 m), ốp đá tối màu, nằm sát đất dưới bóng các hộp."),
      W("Nắng và chói", "Mặt sông nhìn hướng Đông Đông Bắc (70°), nắng sáng mùa hè chiếu gần vuông góc nên dùng lam đứng dày. Mặt Trần Phú nhìn Tây Tây Nam (250°), đón thẳng nắng chiều mùa đông, để đặc. Đầu Nam mỗi hộp (Nam Đông Nam) có mái đua; đầu Bắc (Bắc Tây Bắc) lắp kính lấy sáng tán xạ."),
      W("Gió và mưa", "Gió Đông Nam mùa hè thổi tới từ phía đầu Nam khu đất, lùa qua gầm ba hộp cao 5–14 m. Gió mùa Đông Bắc và mưa tạt đập vào mặt sông, nên sảnh lùi vào dưới gầm hộp giữa, có hiên sâu."),
      W("Công năng", "Hộp Bắc thấp nhất là đọc mở, gần sảnh; hộp giữa là đọc yên tĩnh; hộp Nam cao nhất có phòng đọc chuyên đề và văn phòng. Nhà sự kiện ở góc Đông Bắc, có lối riêng từ quảng trường Bắc, chạy ngoài giờ không qua khu đọc.")],
    kc: { he: "Mỗi hộp là hai dàn thép cao 2 tầng ở hai mặt dọc. Hộp Bắc tựa lõi thang Bắc, hộp Nam tựa lõi thang Nam; đầu còn lại treo bằng dây văng nửa quạt từ hai trụ bê tông thon đứng trong hai khe giữa các hộp. Hộp giữa treo cả hai đầu, mỗi trụ đỡ hai hộp ở hai phía nên lực kéo gần cân nhau.", nhip: "22 m mỗi hộp (dàn cao 9 m)", cx: "Không có phần đua lớn; đầu hộp treo dây" },
    qa: [["Trụ đỡ hai hộp ở hai bên, nếu một bên nặng hơn thì sao?", "Hai hộp hai bên trụ có cùng tiết diện nên lực kéo của dây gần bằng nhau. Phần chênh nhỏ do một hộp cao hơn được trụ bê tông chịu như cột chịu uốn, móng trụ là cọc khoan nhồi."],
      ["Hộp giữa chỉ treo bằng dây, có rung không?", "Hộp là dàn thép cao 9 m nên rất cứng, dây chỉ đỡ hai đầu. Hai cầu kính nối sang hai hộp bên cạnh giữ thêm theo phương ngang."],
      ["Người đi xe lăn lên hộp giữa thế nào?", "Đi thang máy ở lõi Bắc hoặc lõi Nam rồi qua cầu kính bằng phẳng; mỗi cầu nằm đúng cao độ sàn của hai hộp."]],
    cut: "Ba hộp foam trắng 7 × 11 × 4,5 cm, kê cao 2,7 – 5 – 7,2 cm. Hai trụ: que gỗ vót thon 1,3 → 0,7 cm, cao 13,5 và 15,75 cm. Dây: chỉ trắng. Khối phụ: foam đen cao 2,25 cm, nhà sự kiện 3,5 cm.",
    roleOf: () => "p",
    lab: [[21, 53, 18.95, "Khối chính · Ba hộp đọc treo bậc thang", 1], [32, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [29, 42, 4.95, "Khối phụ · Sảnh dưới gầm", 2], [9, 62, 4.95, "Khối phụ · Lưng kho sách", 2], [33, 78, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [17, 40, 27, "Trụ đỡ hai hộp"]],
    build() {
      const P1 = pylon(16.5, 40, 0, 16.5, 40, 27, [1.4, 2.6], [0.7, 1.3], M), P2 = pylon(22, 66, 0, 22, 66, 31.5, [1.4, 2.6], [0.7, 1.3], M);
      const v = [...hbox(8, 16, 14, 22, 1, ["B", "B"]), ...hbox(14, 42, 14, 22, 2, ["B", "B"]), ...hbox(20, 68, 14, 22, 3, ["B", "E"]),
        B(19.5, 38, 2.5, 4, L(2), L(3), "glass", "L", { fa: fCau, ...M }), B(24, 64, 3.5, 4, L(3), L(4), "glass", "L", { fa: fCau, ...M }),
        core(9, 16, 5, 6, L(3)), core(20, 82, 6, 6, L(5)), P1, P2,
        hall(24, 12, 16, 18), low(22, 34, 14, 16, "glass", "A", fCong), low(6, 44, 6, 38, "stone", "C", fDac, { top: "stoneTop" }), low(27, 70, 12, 16, "blk", "B", fNhi, { top: "grass" })];
      const cb = [...fanX(P1, 20, 26.5, [8, 22], [27, 29.5, 32, 34.5, 37], L(3)), ...fanX(P1, 20, 26.5, [14, 28], [43, 45.5, 48, 50.5, 53], L(4)),
        ...fanX(P2, 24.5, 31, [14, 28], [55, 57, 59, 61, 63], L(4)), ...fanX(P2, 24.5, 31, [20, 34], [69, 71.5, 74, 76.5, 79], L(5))];
      v.push(cables(cb));
      const st = [axis(P1), axis(P2), ...cb, wall(9, 16, 5, 6, 0.45, L(3)), wall(20, 82, 6, 6, 0.45, L(5)), col(22, 16, 0.45, L(1)), col(8, 22, 0.45, L(1)), col(34, 90, 0.45, L(3)),
        ...truss(8, 16, 14, 22, 1, 6), ...truss(14, 42, 14, 22, 2, 6), ...truss(20, 68, 14, 22, 3, 6),
        ...perim(24, 12, 16, 18, 7.45, 8), ...perim(22, 34, 14, 16, 4.95, 7), ...perim(6, 44, 6, 38, 4.95, 6), ...perim(27, 70, 12, 16, 4.95, 6)];
      return { v, st };
    }
  });

  /* ---------- 9.2 Hai hộp bắt chéo ---------- */
  I.push({
    id: "sl2", fam: "sole", code: "9.2", from: "1.3", name: "Hai hộp bắt chéo, nhà sự kiện làm đối trọng", rule: "Tương phản dọc – ngang", tag: "Hộp dọc tầng 2–3, hộp ngang tầng 4–5 gác lên trên; đầu hộp ngang vươn ra sông, treo dây từ trụ nghiêng",
    story: "Hộp dưới chạy dọc khu đất, hộp trên chạy ngang và gác lên hộp dưới thành chữ thập lệch. Đầu Đông của hộp trên vươn 10 m ra phía sông, được treo bằng dây văng từ một trụ thon nghiêng về phía Bắc. Dây néo phía sau của trụ neo xuống nhà sự kiện bê tông đặc, nên nhà sự kiện vừa là khối phụ vừa là đối trọng giữ trụ.",
    why: [W("Quy luật hình khối", "Tương phản phương: một hộp dọc nằm thấp, một hộp ngang nằm cao, hai hộp cùng chiều sâu 14–16 m và cùng vật liệu. Chỗ bắt chéo lệch về phía Nam và phía Tây nên hai cánh hộp trên dài ngắn khác nhau."),
      W("Khối chính – khối phụ", "Hai hộp bắt chéo là khối chính, chiếm khoảng 2/3 sàn, đỉnh ở +23,45 m. Khối phụ chỉ có bốn khối một tầng: nhà sự kiện, sảnh, lưng kho, nhà thiếu nhi; khối cao nhất là nhà sự kiện +7,45 m, thấp hơn một phần ba khối chính."),
      W("Nắng và chói", "Cánh Đông hộp trên nhìn ra sông hướng Đông Đông Bắc: mặt đầu hồi dùng lam đứng. Hai mặt dài của hộp trên nhìn Bắc Tây Bắc (kính lấy sáng tán xạ) và Nam Đông Nam (mái đua). Mặt Tây Tây Nam của hộp dưới đặc, chặn nắng chiều."),
      W("Gió và mưa", "Gầm hộp dưới cao 5 m để trống, gió Đông Nam từ đầu Nam khu đất lùa dọc gầm. Sảnh nằm dưới cánh hộp vươn ra sông, mái là đáy hộp cao 14 m nên mưa gió mùa Đông Bắc không tạt vào cửa."),
      W("Công năng", "Hộp dưới là đọc mở và tra cứu; hộp trên tầng 4 là đọc yên tĩnh nhìn sông, tầng 5 là văn phòng. Nhà sự kiện ở góc Đông Bắc mở ra quảng trường Bắc, dùng ngoài giờ độc lập.")],
    kc: { he: "Hộp dưới: hai dàn thép cao 2 tầng nhịp 12 m tựa lên 8 cột và 2 lõi. Hộp trên gác lên hộp dưới ở chỗ bắt chéo, hai mặt dài cũng là dàn thép; cánh Đông vươn 10 m treo bằng 10 dây văng. Trụ bê tông nghiêng 8° về phía Bắc, ra xa phần nó đỡ; 10 dây néo neo vào tường và mái bê tông của nhà sự kiện.", nhip: "16 m (chỗ bắt chéo)", cx: "10 m về phía sông, treo dây; 2 m về phía Tây, dầm thường" },
    qa: [["Trụ nghiêng có bị dây kéo đổ không?", "Dây phía trước kéo đỉnh trụ về phía Nam, dây néo phía sau kéo về phía Bắc xuống nhà sự kiện, trọng lượng trụ nghiêng về phía Bắc cũng chống lại dây phía trước. Ba lực cân nhau nên móng trụ chủ yếu chịu nén."],
      ["Nhà sự kiện có bị nhấc lên không?", "Nhà sự kiện là tường và mái bê tông dày, nặng hơn nhiều lần lực kéo của dây néo; móng nhà làm cọc chịu kéo ở bốn góc cho chắc."],
      ["Hộp trên đè lên hộp dưới có cần cột thêm?", "Không. Bốn góc chỗ bắt chéo trùng với nút dàn của hộp dưới, lực truyền thẳng xuống cột và lõi."]],
    cut: "Hộp dưới foam trắng 8 × 18 × 4,5 cm kê cao 2,7 cm; hộp trên 7 × 14 × 4,5 cm dán ngang lên trên. Trụ: que gỗ vót thon 1,3 → 0,7 cm dài 17 cm, cắm nghiêng 8°. Dây: chỉ trắng. Nhà sự kiện foam đen 8 × 9 × 3,5 cm.",
    roleOf: () => "p",
    lab: [[20, 51, 23.45, "Khối chính · Hai hộp đọc bắt chéo", 1], [33, 51, 23.45, "Cánh vươn ra sông 10 m"], [32, 18, 7.45, "Khối phụ · Nhà sự kiện, đối trọng của trụ", 2], [34, 50, 4.95, "Khối phụ · Sảnh dưới cánh hộp", 2], [9, 58, 4.95, "Khối phụ · Lưng kho sách", 2], [35, 71, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const P = pylon(35, 38, 0, 35, 33, 34, [2.6, 1.4], [1.3, 0.7], M);
      const v = [...hbox(12, 30, 16, 36, 1, ["B", "B"]), ...hbox(10, 44, 28, 14, 3, ["B", "E"]), core(12.5, 44, 5, 6, L(5)), core(22.5, 52, 5, 6, L(5)), P,
        hall(24, 12, 16, 18), low(28, 42, 12, 16, "glass", "A", fCong), low(6, 36, 6, 44, "stone", "C", fDac, { top: "stoneTop" }), low(30, 62, 10, 18, "blk", "B", fNhi, { top: "grass" })];
      const cb = [...fanY(P, 27, 33, [44, 58], [29, 31.5, 34, 36.5, 38], L(5)), ...fanY(P, 27, 33, [15, 21], [26, 29, 32, 35, 38], 7.45)];
      v.push(cables(cb));
      const st = [axis(P), ...cb, wall(12.5, 44, 5, 6, 0.45, L(5)), wall(22.5, 52, 5, 6, 0.45, L(5)), ...grid([12, 28], [30, 42, 54, 66], 0.45, L(1)),
        ...truss(12, 30, 16, 36, 1, 8), ...truss(10, 44, 28, 14, 3, 7, "x"),
        ...perim(24, 12, 16, 18, 7.45, 8), ...perim(28, 42, 12, 16, 4.95, 6), ...perim(6, 36, 6, 44, 4.95, 6), ...perim(30, 62, 10, 18, 4.95, 6)];
      return { v, st };
    }
  });

  /* ---------- 9.3 Chong chóng ba cánh quanh một lõi ---------- */
  I.push({
    id: "sl3", fam: "sole", code: "9.3", from: "1.3", name: "Chong chóng ba cánh", rule: "Cân bằng xoay vòng", tag: "Ba hộp đọc tỏa ra ba hướng quanh một lõi thang, mỗi cánh cao hơn cánh trước một tầng",
    story: "Ba hộp đọc tỏa ra từ một lõi thang ở giữa nhà như ba cánh chong chóng: cánh Bắc ở tầng 2–3, cánh sông ở tầng 3–4, cánh Nam ở tầng 4–5. Đầu trong mỗi cánh gối lên lõi, đầu ngoài treo bằng dây văng từ một trụ thon đứng sát lõi. Đi một vòng quanh nhà, các cánh như đang xoay và leo dần lên.",
    why: [W("Quy luật hình khối", "Cân bằng xoay vòng: ba cánh giống nhau về tiết diện, mỗi cánh xoay 90° và lên một tầng so với cánh trước. Không có trục đối xứng nhưng mọi cạnh vẫn nằm trên lưới, các cánh chỉ chạm mặt nhau, không chồng lên nhau."),
      W("Khối chính – khối phụ", "Ba cánh và lõi là khối chính, chiếm khoảng 2/3 sàn và cao tới +23,45 m. Khối phụ là bốn khối một tầng sát đất (nhà sự kiện +7,45 m), màu đá tối, đặt vào chỗ trống giữa các cánh."),
      W("Nắng và chói", "Cánh sông có đầu hồi nhìn Đông Đông Bắc, dùng lam đứng dày chặn nắng sáng mùa hè. Mặt Tây Tây Nam của cánh Bắc và cánh Nam đặc. Mặt nhìn Bắc Tây Bắc lắp kính lấy sáng tán xạ, mặt Nam Đông Nam có mái đua."),
      W("Gió và mưa", "Cánh Nam nằm cao nhất (gầm 14 m) nên gió Đông Nam từ đầu Nam thổi thẳng vào sân giữa ba cánh. Sảnh nằm dưới cánh sông, mái là đáy hộp nên mưa gió mùa Đông Bắc không tạt vào cửa."),
      W("Công năng", "Cánh Bắc là đọc mở và tra cứu, cánh sông là đọc yên tĩnh và văn phòng, cánh Nam là đọc chuyên đề và học nhóm. Lõi giữa có thang máy và thang bộ đến cả ba cánh nên đường đi ngắn.")],
    kc: { he: "Lõi bê tông 6 × 6 m cao 23 m ở giữa. Mỗi cánh là hộp dàn thép cao 2 tầng, đầu trong gối lên lõi, đầu ngoài treo bằng dây văng nửa quạt từ một trụ thon đứng sát mặt Tây của lõi. Ba cánh kéo trụ về ba hướng Bắc, Đông, Nam; dây néo phía Tây neo xuống lưng kho bê tông đặc để cân lại lực kéo về phía sông.", nhip: "24 m mỗi cánh (dàn cao 9 m)", cx: "Không, đầu ngoài treo dây" },
    qa: [["Ba cánh kéo trụ về ba phía, trụ có bị lệch không?", "Cánh Bắc và cánh Nam kéo ngược chiều nhau nên gần triệt tiêu. Lực kéo về phía sông của cánh Đông được cân bằng bằng 6 dây néo về phía Tây, neo vào lưng kho bê tông nặng."],
      ["Mỗi cánh chỉ có một đầu gối lên lõi, có đứng vững không?", "Đầu trong gối lên lõi bằng hai gối thép, đầu ngoài treo dây. Hộp là dàn cao 9 m nên không võng giữa nhịp."],
      ["Lõi duy nhất có đủ thoát hiểm không?", "Lõi có hai thang bộ riêng tách bằng tường chống cháy; mỗi cánh còn một thang thoát hiểm ngoài nhà bằng thép ở đầu ngoài, sẽ thể hiện ở bước mặt bằng."]],
    cut: "Ba hộp foam trắng 7 × 12 × 4,5 cm, kê cao 2,7 – 5 – 7,2 cm. Lõi foam xám 3 × 3 × 11,5 cm. Trụ: que gỗ vót thon 0,7 → 0,4 cm cao 17 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[24, 46, 23.45, "Khối chính · Ba cánh đọc quanh lõi", 1], [33, 21, 7.45, "Khối phụ · Nhà sự kiện", 2], [32, 44, 4.95, "Khối phụ · Sảnh dưới cánh sông", 2], [9, 60, 4.95, "Khối phụ · Lưng kho, đối trọng", 2], [27, 81, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [17, 45, 34, "Trụ"]],
    build() {
      const P = pylon(17, 45, 0, 17, 45, 34, [1.4, 1.4], [0.7, 0.7], M);
      const v = [...hbox(10, 18, 14, 24, 1, ["B", "B"]), ...hbox(24, 34, 16, 14, 2, ["B", "E"]), ...hbox(18, 48, 14, 24, 3, ["B", "B"]), core(18, 42, 6, 6, L(5)), P,
        hall(26, 12, 14, 18), low(26, 36, 12, 16, "glass", "A", fCong), low(6, 38, 6, 42, "stone", "C", fDac, { top: "stoneTop" }), B(6, 80, 6, 8, 0.45, 4.95, "stone", "E", { fa: fDac, fl: 1, top: "stoneTop" }), low(20, 74, 14, 14, "blk", "B", fNhi, { top: "grass" })];
      const cb = [...fanX(P, 26, 33, [10, 24], [19.5, 22.5, 25.5, 28.5, 31], L(3)), ...fanY(P, 28.5, 33.5, [34, 48], [32, 34, 36, 38, 39.5], L(4)), ...fanX(P, 26, 33, [18, 32], [61, 64, 67, 70, 71.5], L(5)),
        ...stays(P, 28, 33, [44, 47, 50, 53, 56, 59].map(y => [9, y, 4.95]), [-0.35, 0])];
      v.push(cables(cb));
      const st = [axis(P), ...cb, wall(18, 42, 6, 6, 0.45, L(5)), ...truss(10, 18, 14, 24, 1, 6), ...truss(24, 34, 16, 14, 2, 4, "x"), ...truss(18, 48, 14, 24, 3, 6),
        ...perim(26, 12, 14, 18, 7.45, 7), ...perim(26, 36, 12, 16, 4.95, 6), ...perim(6, 38, 6, 42, 4.95, 6), ...perim(6, 80, 6, 8, 4.95, 6), ...perim(20, 74, 14, 14, 4.95, 7)];
      return { v, st };
    }
  });

  /* ---------- 9.4 Hai hộp ngang qua sân Nam ---------- */
  I.push({
    id: "sl4", fam: "sole", code: "9.4", from: "1.3", name: "Hai hộp ngang qua sân gió", rule: "Lệch có kiểm soát, nhịp so le", tag: "Hai hộp đọc nằm ngang khu đất, lệch nhau 4 m và 1 tầng, chung một trụ đứng giữa sân",
    story: "Hai hộp đọc dài 28 m nằm ngang khu đất, kẹp giữa một sân rộng 18 m. Hộp Nam lệch 4 m về phía sông và cao hơn hộp Bắc một tầng. Giữa sân có một trụ thon, dây văng hai phía đỡ giữa nhịp của cả hai hộp. Gió mùa hè từ đầu Nam lùa dưới hộp Nam vào sân, lên qua khe giữa hai hộp.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát: hai hộp giống nhau, lệch nhau đúng 4 m theo phương ngang và đúng 1 tầng theo chiều cao. Trụ giữa sân là điểm nhấn đứng duy nhất, cân hai khối nằm."),
      W("Khối chính – khối phụ", "Hai hộp trắng là khối chính, chiếm khoảng 2/3 sàn, đỉnh +18,95 m. Khối phụ là bốn khối một tầng màu đá tối: nhà sự kiện +7,45 m, sảnh kính bên sân, lưng kho phía Tây và nhà thiếu nhi dưới bóng hộp Nam."),
      W("Nắng và chói", "Hai hộp nằm ngang nên mặt dài nhìn Bắc Tây Bắc (kính lấy sáng tán xạ, ít nắng) và Nam Đông Nam (mái đua mỗi tầng). Hai đầu hồi ngắn: đầu sông Đông Đông Bắc dùng lam đứng, đầu Trần Phú Tây Tây Nam để đặc. Đây là cách xoay hộp lợi nắng nhất."),
      W("Gió và mưa", "Hộp Nam có gầm cao 10 m, gió Đông Nam từ đầu Nam lùa qua gầm vào sân giữa. Mưa gió mùa Đông Bắc tạt vào đầu sông của hộp, chỗ chỉ có lam và tường, không có cửa vào."),
      W("Công năng", "Hộp Bắc là đọc mở và tra cứu, gần nhà sự kiện và quảng trường; hộp Nam là đọc yên tĩnh và văn phòng, xa ồn. Sân giữa là nơi đọc ngoài trời, sảnh kính mở ra sân và ra bậc thang Bạch Đằng.")],
    kc: { he: "Mỗi hộp là hai dàn thép cao 2 tầng nhịp 28 m, đầu Tây gối lên lõi thang, đầu Đông gối lên hai cột. Trụ bê tông thon đứng giữa sân, dây văng hai phía đỡ thêm giữa nhịp cả hai hộp, nên lực hai phía gần cân nhau.", nhip: "28 m mỗi hộp (dàn cao 9 m, có dây đỡ giữa nhịp)", cx: "Không" },
    qa: [["Trụ đứng giữa sân có bị hai hộp kéo lệch?", "Trụ đỡ hai hộp giống nhau ở hai phía, chiều dài dây gần bằng nhau nên lực kéo hai phía gần cân. Phần chênh do hộp Nam cao hơn rất nhỏ, trụ bê tông chịu được như cột."],
      ["Đặt hộp nằm ngang thì có đủ ánh sáng?", "Có. Mặt Bắc Tây Bắc dài 28 m lấy sáng tán xạ suốt ngày, mặt Nam Đông Nam có mái đua chặn nắng trưa; hộp chỉ sâu 16 m nên ánh sáng vào tới giữa."],
      ["Sân giữa có bị tối vì hai hộp che?", "Hộp Nam cao hơn và lệch ra sông nên nắng sáng vẫn vào sân từ phía Đông; buổi trưa mặt trời gần đỉnh đầu."]],
    cut: "Hai hộp foam trắng 8 × 14 × 4,5 cm, kê cao 2,7 và 5 cm. Trụ: que gỗ vót thon 1,3 → 0,7 cm cao 16,5 cm. Dây: chỉ trắng 20 sợi. Hai lõi foam xám.",
    roleOf: () => "p",
    lab: [[24, 68, 18.95, "Khối chính · Hai hộp đọc ngang so le", 1], [31, 18, 7.45, "Khối phụ · Nhà sự kiện", 2], [33, 51, 4.95, "Khối phụ · Sảnh mở ra sân", 2], [9, 65, 4.95, "Khối phụ · Lưng kho sách", 2], [28, 69, 4.95, "Khối phụ · Nhà thiếu nhi dưới hộp", 2], [22, 51, 1, "Sân gió"]],
    build() {
      const P = pylon(22, 51, 0, 22, 51, 33, [2.6, 1.4], [1.3, 0.7], M);
      const v = [...hbox(8, 26, 28, 16, 1, ["B", "B"]), ...hbox(12, 60, 28, 16, 2, ["B", "E"]), core(8, 30, 5, 8, L(3)), core(12, 64, 5, 8, L(4)), P,
        hall(22, 12, 18, 14), low(26, 44, 14, 14, "glass", "A", fCong), low(6, 44, 6, 42, "stone", "C", fDac, { top: "stoneTop" }), low(20, 62, 16, 14, "blk", "B", fNhi, { top: "grass" })];
      const cb = [...fanY(P, 25, 32, [26, 42], [13, 17.5, 22, 26.5, 31], L(3)), ...fanY(P, 25, 32, [60, 76], [17, 21.5, 26, 30.5, 35], L(4))];
      v.push(cables(cb));
      const st = [axis(P), ...cb, wall(8, 30, 5, 8, 0.45, L(3)), wall(12, 64, 5, 8, 0.45, L(4)), col(36, 26, 0.45, L(1)), col(36, 42, 0.45, L(1)), col(40, 60, 0.45, L(2)), col(40, 76, 0.45, L(2)),
        ...truss(8, 26, 28, 16, 1, 7, "x"), ...truss(12, 60, 28, 16, 2, 7, "x"),
        ...perim(22, 12, 18, 14, 7.45, 6), ...perim(26, 44, 14, 14, 4.95, 7), ...perim(6, 44, 6, 42, 4.95, 6), ...perim(20, 62, 16, 14, 4.95, 8)];
      return { v, st };
    }
  });

  /* ---------- 9.5 Hộp dài thấp, hộp ngắn cao ---------- */
  I.push({
    id: "sl5", fam: "sole", code: "9.5", from: "1.3", name: "Đòn cân: hộp dài thấp, hộp ngắn cao", rule: "Tương phản tỉ lệ, cân đòn", tag: "Một hộp dài ở tầng 2–3 và một hộp ngắn ở tầng 4–5, treo hai phía một trụ như hai đầu đòn cân",
    story: "Hộp dài nằm thấp chạy dọc phía Tây, hộp ngắn nằm cao lệch về phía sông ở nửa Nam. Một trụ thon đứng giữa hai hộp: dây phía Bắc đỡ đầu hộp dài, dây phía Nam đỡ đầu hộp ngắn. Hộp dài nặng hơn nhưng gần trụ, hộp ngắn nhẹ hơn nhưng xa trụ, hai bên cân nhau như hai đầu đòn cân.",
    why: [W("Quy luật hình khối", "Tương phản tỉ lệ: dài – ngắn, thấp – cao, gần phố – gần sông. Hai hộp cùng vật liệu, cùng chiều sâu 14–16 m nên vẫn là một gia đình; trụ đứng ở chỗ hai hộp gặp nhau là điểm tựa của đòn cân."),
      W("Khối chính – khối phụ", "Hai hộp treo là khối chính: khoảng 2/3 sàn, đỉnh +23,45 m. Khối phụ gồm bốn khối một tầng (nhà sự kiện +7,45 m) màu đá tối, nằm dưới gầm hoặc ở góc đất, không cạnh tranh với hai hộp."),
      W("Nắng và chói", "Hộp dài có mặt Tây Tây Nam đặc chắn nắng chiều cho cả nhà. Hộp ngắn nhìn ra sông hướng Đông Đông Bắc qua lam đứng dày. Đầu Bắc Tây Bắc lắp kính, đầu Nam Đông Nam có mái đua."),
      W("Gió và mưa", "Hộp ngắn nằm cao (gầm 14 m) ở nửa Nam, gió Đông Nam từ đầu Nam lùa qua gầm vào sảnh. Sảnh lùi vào giữa nhà, phía sông có hiên sâu dưới hộp ngắn che mưa gió mùa Đông Bắc."),
      W("Công năng", "Hộp dài là đọc mở, tra cứu và học nhóm, sát lưng kho để chuyển sách nhanh. Hộp ngắn là đọc yên tĩnh nhìn sông và văn phòng. Nhà sự kiện riêng ở góc Đông Bắc.")],
    kc: { he: "Hai hộp là dàn thép cao 2 tầng. Nửa Nam hộp dài tựa lõi thang và cột; nửa Bắc treo dây. Nửa Bắc hộp ngắn tựa lõi thang thứ hai và hai cột; nửa Nam treo dây. Một trụ bê tông thon đứng giữa hai hộp, dây hai phía cân nhau.", nhip: "21 m (nửa hộp dài treo dây)", cx: "12 m (nửa Nam hộp ngắn, treo dây)" },
    qa: [["Hai hộp khác nhau sao trụ lại cân?", "Lực dây phụ thuộc cả tải lẫn góc dây. Hộp dài nặng hơn nhưng dây ngắn, dốc; hộp ngắn nhẹ hơn nhưng nằm cao và xa hơn, dây thoải hơn nên lực ngang lớn hơn. Chọn chiều cao neo để lực ngang hai phía bằng nhau."],
      ["Có thể làm hai hộp bằng nhau cho dễ?", "Được, nhưng mất ý tương phản. Diện tích sàn hai hộp đúng bằng nhu cầu: khu đọc mở cần sàn rộng một tầng thấp, khu đọc yên tĩnh cần nhỏ và xa ồn."],
      ["Hộp ngắn cao 23 m có quá cao so với phố?", "Chỉ cao bằng nhà 6 tầng xung quanh, và lùi vào giữa khu đất 24 m so với Trần Phú."]],
    cut: "Hộp dài foam trắng 7 × 21 × 4,5 cm kê cao 2,7 cm; hộp ngắn 8 × 12 × 4,5 cm kê cao 7,2 cm. Trụ: que gỗ vót thon 0,7 → 0,4 cm cao 17 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[15, 24, 14.45, "Khối chính · Hộp dài thấp", 1], [32, 66, 23.45, "Khối chính · Hộp ngắn cao", 1], [32, 18, 7.45, "Khối phụ · Nhà sự kiện", 2], [31, 40, 4.95, "Khối phụ · Sảnh", 2], [9, 75, 4.95, "Khối phụ · Lưng kho sách", 2], [32, 82, 4.95, "Khối phụ · Nhà thiếu nhi", 2], [23, 45, 34, "Trụ cân"]],
    build() {
      const P = pylon(23, 45, 0, 23, 45, 34, [1.4, 2.6], [0.7, 1.3], M);
      const v = [...hbox(8, 18, 14, 42, 1, ["B", "B"]), ...hbox(24, 50, 16, 24, 3, ["B", "E"]), core(14, 52, 6, 6, L(3)), core(30, 50, 6, 6, L(5)), P,
        hall(24, 12, 16, 18), low(24, 32, 14, 16, "glass", "A", fCong), low(6, 36, 6, 50, "stone", "C", fDac, { top: "stoneTop" }), low(26, 76, 12, 12, "blk", "B", fNhi, { top: "grass" })];
      const cb = [...fanX(P, 26, 33, [8, 22], [20, 24, 28, 32, 36], L(3)), ...fanX(P, 26, 33, [24, 40], [62, 65, 68, 71, 73.5], L(5))];
      v.push(cables(cb));
      const st = [axis(P), ...cb, wall(14, 52, 6, 6, 0.45, L(3)), wall(30, 50, 6, 6, 0.45, L(5)), col(8, 60, 0.45, L(1)), col(22, 60, 0.45, L(1)), col(24, 50, 0.45, L(3)), col(40, 50, 0.45, L(3)),
        ...truss(8, 18, 14, 42, 1, 10), ...truss(24, 50, 16, 24, 3, 6),
        ...perim(24, 12, 16, 18, 7.45, 8), ...perim(24, 32, 14, 16, 4.95, 7), ...perim(6, 36, 6, 50, 4.95, 6), ...perim(26, 76, 12, 12, 4.95, 6)];
      return { v, st };
    }
  });
})(window.G3);
