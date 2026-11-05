
/* ================= Phát triển 6 ý tưởng đã chọn (phần 2: Đầm sen, Hộp lồng hộp, Cánh diều, 5 phương án kết hợp) ================= */
(function (G) {
  const { B, SH, FR, PO, S3, LN, col, wall, seg, grid, range, zig } = G.K;
  const { FA, Z, F1, stack, mast, segsOf, stepsLN, colsIn, house, cutX, cutY, pylon, cables, fan, pts, axisSeg } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I = G.ideas4;
  // lá sen: cột ở tâm + phễu ngược, cạnh s (m), đỉnh ở cao độ zt
  const lotus = (v, st, cx, cy, s, zt, o = {}) => { v.push(B(cx - 0.35, cy - 0.35, 0.7, 0.7, 0, zt - 2.2, "sheet", "X", o), FR(cx - 0.7, cy - 0.7, 1.4, 1.4, zt - 2.2, zt, s / 1.4, "grass", { top: "grassTop", ...o })); st.push(col(cx, cy, 0, zt - 2.2)); };
  // cánh diều: mặt yên ngựa [góc Tây Bắc, Đông Bắc, Đông Nam, Tây Nam]; chân ở hai góc thấp
  const kite = (v, st, x1, y1, x2, y2, zs, o = {}) => {
    v.push(S3([[x1, y1, zs[0]], [x2, y1, zs[1]], [x2, y2, zs[2]], [x1, y2, zs[3]]], 0.35, "ribbon", "X", { top: "lamp", ...o }));
    const P = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], lo = Math.min(...zs);
    zs.forEach((z, i) => { if (z < lo + 0.5) { v.push(B(P[i][0] - 0.3, P[i][1] - 0.3, 0.6, 0.6, 0, z - 0.35, "ink", "X", o)); st.push(col(P[i][0], P[i][1], 0, z - 0.35)); } });
  };
  const fShell = { N: "kinh", E: "lam", S: "dua", W: "dac" };

  /* ---------------- 4. ĐẦM SEN ---------------- */
  function senGrid(v, st, spec, zt, roomZ) {
    for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) {
      const x = 8 + 12 * c, y = 14 + 12 * r, s = spec[r][c], z = zt(r, c, s);
      if (s) { const fl = s[1]; v.push(...stack(x + 1, y + 1, 10, 10, Array(fl).fill(s[0]), "glass", { N: "kinh", E: "lam", S: "dua", W: c === 0 ? "dac" : "lam" }, M)); }
      else v.push(B(x + 0.5, y + 0.5, 11, 11, 0, 0.25, "water", "X", M));
      lotus(v, st, x + 6, y + 6, 12, z, M);
    }
  }
  I.push({
    id: "sen1", fam: "sen", code: "4.1", name: "Lưới đều 12 m", rule: "Đối xứng, lặp lại", tag: "12 lá sen trên lưới đều, hồ sen giữa nhà nhìn ra sông",
    story: "Mười hai lá sen 12 × 12 m xếp thành lưới đều hai hàng, mỗi lá đứng trên một cột, cao thấp đối xứng qua trục ngang giữa nhà: hai đầu thấp một tầng, giữa cao hai tầng. Hai ô giữa phía sông để trống làm hồ sen, mở ra bậc thang Bạch Đằng. Phía Tây là một lưng dịch vụ đặc, đầu Bắc là hộp sự kiện bằng đá.",
    why: [W("Quy luật hình khối", "Lặp lại một mô đun (lá sen 12 m) và đối xứng qua trục ngang: thấp – cao – hồ – hồ – cao – thấp. Trật tự rất rõ, phần sinh động là các lá sen cao thấp."), W("Nắng và chói", "Lá sen đua 1 m ra ngoài phòng kính và cao hơn mái phòng, che nắng trưa. Mặt Đông có lam đứng, mặt Bắc kính trần, mặt Tây là lưng dịch vụ đặc."), W("Gió và mưa", "Khe giữa các lá sen cho khí nóng thoát lên; hồ ở giữa phía sông làm mát gió Đông Nam trước khi vào nhà. Nước mưa theo lòng phễu xuống hồ."), W("Công năng", "Hộp sự kiện tách riêng ở đầu Bắc; khu đọc ở các phòng dưới lá sen; thiếu nhi ở đầu Nam có vườn.")],
    kc: { he: "12 cột nấm (cột có mũ loe hình phễu) lưới 12 × 12 m đỡ sàn không dầm tầng 2 và lá mái. Lưng dịch vụ là tường chịu lực; hộp sự kiện khung riêng nhịp 11 m.", nhip: "12 m", cx: "6 m từ tim cột (mũ phễu cao 2,2 m)" },
    qa: [["Mỗi phòng có một cột ở giữa, có vướng?", "Cột ở tâm phòng như thân sen; bàn đọc tròn đặt quanh cột, kệ tựa vào bốn mặt. Phòng cần trống như phòng đa năng đặt riêng trong hộp đá."]],
    cut: "12 lá sen: chóp ngược bìa, miệng 6 × 6 cm, cao 1,1 cm, trên que Ø 4 mm. Phòng: hộp mica 5 × 5 cm. Lưng dịch vụ: foam đen 2,5 × 24 cm.",
    roleOf: () => "p",
    lab: [[14, 30, 12.2, "Khối chính · Lưới 12 lá sen", 1], [20, 7, 6.45, "Khối phụ · Hộp sự kiện", 2], [4.5, 50, 9.45, "Khối phụ · Lưng dịch vụ", 2], [26, 50, 0.3, "Hồ sen giữa nhà"]],
    build() {
      const v = [], st = [];
      const spec = [[["A", 1], ["A", 1]], [["B", 2], ["B", 2]], [["B", 2], null], [["B", 2], null], [["B", 2], ["B", 2]], [["B", 1], ["B", 1]]];
      senGrid(v, st, spec, (r, c, s) => !s ? 9.6 : s[1] === 2 ? 12.2 : 7.6);
      v.push(B(8, 1, 24, 11, 0.45, 6.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" }), ...stack(2, 26, 5, 24, ["C", "C"], "stone", FA.dac), ...stack(2, 50, 5, 24, ["E", "E"], "stone", FA.dac));
      st.push(...grid([8, 20, 32], [1, 12], 0.45, 6.45), wall(2, 26, 0.25, 48, 0.45, 9.45), wall(6.75, 26, 0.25, 48, 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "sen2", fam: "sen", code: "4.2", name: "Lá sen tiến dần", rule: "Tiến dần", tag: "Lá sen thấp ở Nam, cao dần về Bắc như một làn sóng",
    story: "Cùng lưới 12 lá sen, nhưng mỗi hàng cao hơn hàng trước 1,2 m: thấp nhất ở đầu Nam (khu thiếu nhi), cao nhất ở đầu Bắc (khu đọc hai tầng). Nhìn từ bờ sông là một dải lá sen dâng dần lên như một làn sóng. Một ô hồ nằm ở giữa phía sông.",
    why: [W("Quy luật hình khối", "Tiến dần: cùng một mô đun, chiều cao tăng đều từng bước. Mắt người nhìn được dẫn từ thấp lên cao, từ khu thiếu nhi đến khu đọc chính."), W("Nắng và chói", "Lá thấp phía Nam che nắng trưa tốt cho khu thiếu nhi; lá cao phía Bắc để ánh sáng tán xạ vào khu đọc hai tầng. Mặt Tây là lưng đặc."), W("Gió và mưa", "Gió Đông Nam gặp các lá thấp trước rồi trượt lên theo dải lá cao dần, kéo khí nóng thoát ra phía Bắc."), W("Công năng", "Hộp sự kiện ở đầu Bắc thấp hơn lá sen bên cạnh; khu đọc yên tĩnh ở hàng cao nhất phía Bắc, xa khu thiếu nhi ồn ở đầu Nam.")],
    kc: { he: "12 cột nấm lưới 12 × 12 m, mỗi hàng cột cao hơn hàng trước 1,2 m. Lưng dịch vụ tường chịu lực; hộp sự kiện khung riêng.", nhip: "12 m", cx: "6 m từ tim cột (mũ phễu)" },
    qa: [["Mái cao thấp từng hàng có khó chống thấm?", "Mỗi lá sen là một mái độc lập thoát nước vào lòng phễu và xuống cột; khe giữa các lá là khe hở thông gió, không cần nối mái."]],
    cut: "Như phương án lưới đều, que cột cắt 6 chiều dài khác nhau từ 2,7 đến 5,7 cm.",
    roleOf: () => "p",
    lab: [[14, 18, 13.6, "Khối chính · Dải lá sen dâng dần", 1], [20, 7, 6.45, "Khối phụ · Hộp sự kiện", 2], [4.5, 50, 9.45, "Khối phụ · Lưng dịch vụ", 2], [26, 68, 0.3, "Hồ sen"]],
    build() {
      const v = [], st = [];
      const spec = [[["B", 2], ["B", 2]], [["B", 2], ["B", 2]], [["A", 1], ["A", 1]], [["B", 1], ["B", 1]], [["B", 1], null], [["B", 1], ["B", 1]]];
      senGrid(v, st, spec, r => 13.6 - 1.2 * r);
      v.push(B(8, 1, 24, 11, 0.45, 6.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" }), ...stack(2, 14, 5, 36, ["C", "C"], "stone", FA.dac), ...stack(2, 50, 5, 36, ["E", "E"], "stone", FA.dac));
      st.push(...grid([8, 20, 32], [1, 12], 0.45, 6.45), wall(2, 14, 0.25, 72, 0.45, 9.45), wall(6.75, 14, 0.25, 72, 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "sen3", fam: "sen", code: "4.3", name: "Cụm sen quanh hồ", rule: "Chủ – phụ theo kích thước", tag: "Lá sen lớn nhỏ quây quanh một hồ, lá lớn nhất là khu đọc chính",
    story: "Lá sen có ba cỡ: một lá lớn 18 m che khu đọc chính hai tầng, bốn lá vừa 14 m và ba lá nhỏ 12 m quây quanh một hồ sen ở giữa. Các lá đặt trên lưới 2 m nhưng không thẳng hàng, như sen mọc tự nhiên trong đầm. Lưng phía Tây là dãy kho và văn phòng đặc.",
    why: [W("Quy luật hình khối", "Chủ – phụ theo kích thước: lá lớn nhất là khối chính, các lá vừa và nhỏ là khối phụ; bố cục bất đối xứng quây quanh một tâm là hồ nước."), W("Nắng và chói", "Mỗi lá đua 1 m ngoài phòng kính. Phòng nằm sát lưng đặc phía Tây; mặt Đông dùng lam đứng, mặt Bắc kính trần."), W("Gió và mưa", "Hồ ở giữa mở về phía Đông Nam đón gió mùa hè, gió đi qua mặt nước mát rồi vào các phòng xung quanh."), W("Công năng", "Sảnh và cà phê ở hai lá phía Đông gần bậc thang; khu đọc chính ở lá lớn phía Bắc, đọc yên tĩnh ở phía Tây xa sông; thiếu nhi ở góc Đông Nam.")],
    kc: { he: "Mỗi lá sen là một cột nấm riêng; phòng dưới lá là khung nhẹ tựa vào cột và mép mũ. Lá lớn 18 m có 4 cột phụ ở góc phòng. Lưng phía Tây là tường chịu lực.", nhip: "16 m (phòng dưới lá lớn, có 4 cột phụ)", cx: "6–9 m từ tim cột (mũ phễu)" },
    qa: [["Lá to nhỏ lộn xộn có khó thi công?", "Chỉ có ba cỡ lá, mỗi cỡ một khuôn. Mọi tâm cột nằm trên lưới 2 m nên định vị dễ."]],
    cut: "3 cỡ chóp ngược: 9, 7, 6 cm. Hồ: giấy xanh 5 × 6,5 cm. Lưng phía Tây: foam đen 2 × 35 cm.",
    roleOf: () => "p",
    lab: [[20, 24, 13.5, "Khối chính · Lá sen lớn (khu đọc chính)", 1], [32, 44, 12.2, "Khối phụ · Lá sen vừa (sảnh, cà phê)", 2], [4, 50, 9.45, "Khối phụ · Lưng kho, văn phòng", 2], [21, 53, 0.3, "Hồ sen"], [20, 8, 6.45, "Khối phụ · Hộp sự kiện", 2]],
    build() {
      const v = [], st = [];
      const room = (x, y, s, zones, fa = FA.doc, o = {}) => v.push(...stack(x, y, s, s, zones, "glass", fa, o));
      room(12, 16, 16, ["B", "B"], FA.doc, M); lotus(v, st, 20, 24, 18, 13.5, M); st.push(...grid([12, 28], [16, 32], 0.45, 9.45));
      room(26, 38, 12, ["A", "B"]); lotus(v, st, 32, 44, 14, 12.2);
      room(10, 36, 10, ["A", "B"]); lotus(v, st, 15, 41, 12, 12.2);
      room(6, 52, 10, ["B", "B"]); lotus(v, st, 11, 57, 12, 12.2);
      room(27, 57, 10, ["B", "B"]); lotus(v, st, 32, 62, 12, 12.2);
      room(14, 66, 12, ["B", "B"]); lotus(v, st, 20, 72, 14, 12.2);
      room(26, 80, 12, ["B"], FA.nhi); lotus(v, st, 32, 86, 14, 7.6);
      v.push(B(16, 47, 10, 13, 0, 0.25, "water", "X"), B(8, 2, 24, 12, 0.45, 6.45, "stone", "D", { fa: FA.su, fl: 1, top: "stoneTop" }), ...stack(2, 20, 4, 35, ["C", "C"], "stone", FA.dac), ...stack(2, 55, 4, 35, ["E", "E"], "stone", FA.dac));
      st.push(...grid([8, 20, 32], [2, 14], 0.45, 6.45), wall(2, 20, 0.25, 70, 0.45, 9.45), wall(5.75, 20, 0.25, 70, 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "sen4", fam: "sen", code: "4.4", name: "Sen trên đế đặc", rule: "Tương phản nặng – nhẹ", tag: "Đế đá một tầng, trên mái là rừng lá sen che các phòng đọc kính",
    story: "Tầng 1 là một đế đá đặc chứa sự kiện, sảnh, kho, văn phòng và thiếu nhi. Trên mái đế là một đầm sen: mười lá sen che tám phòng đọc kính và hai ô vườn nước. Cột của lá sen chạy thẳng từ móng qua đế lên mái. Từ phố nhìn lên thấy một nền đá chắc nâng một rừng lá sen nhẹ.",
    why: [W("Quy luật hình khối", "Tương phản nặng – nhẹ: đế đá đặc, thấp, liền một khối đối lập với rừng lá sen mảnh, sáng, chia nhỏ ở trên. Hai lớp đọc rõ chức năng: dưới phục vụ, trên đọc sách."), W("Nắng và chói", "Đế đá có mặt Tây đặc, mặt Đông là hiên sâu có mái đua. Phòng đọc tầng 2 lùi vào dưới lá sen, có lam mặt Đông và kính trần mặt Bắc."), W("Gió và mưa", "Tầng 2 đứng trên cao, thoáng bốn phía, gió sông thổi qua các khe giữa phòng. Hai ô vườn nước trên mái làm mát và giữ nước mưa."), W("Công năng", "Toàn bộ khu ồn và khu hoạt động ngoài giờ ở tầng 1 trong đế; khu đọc ở tầng 2 yên tĩnh, tách hẳn khỏi sự kiện.")],
    kc: { he: "Lưới cột 12 × 12 m chạy từ móng lên: ở tầng 1 là khung bê tông của đế, ở tầng 2 là cột nấm đỡ lá sen. Sàn mái đế là sàn không dầm.", nhip: "12 m", cx: "6 m từ tim cột (mũ phễu)" },
    qa: [["Đế đá có làm tầng 1 tối?", "Mặt Đông của đế là hiên sâu có cửa kính lớn nhìn ra bậc thang; giữa đế có hai giếng trời ngay dưới hai ô vườn nước."]],
    cut: "Đế: foam đen 12 × 32 × 2,25 cm. Trên mái: 10 que cột và chóp ngược, 8 hộp mica 5 × 5 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[14, 30, 12.2, "Khối chính · Rừng lá sen trên mái", 1], [20, 24, 2.5, "Khối phụ · Đế đá tầng 1", 2], [26, 56, 5.2, "Vườn nước trên mái"]],
    build() {
      const v = [B(8, 18, 24, 14, 0.45, 4.95, "stone", "D", { fa: FA.su, top: "stoneTop" }), B(8, 32, 24, 10, 0.45, 4.95, "stone", "A", { fa: FA.cong, top: "stoneTop" }), B(8, 42, 12, 20, 0.45, 4.95, "stone", "C", { fa: FA.dac, top: "stoneTop" }), B(8, 62, 12, 20, 0.45, 4.95, "stone", "E", { fa: FA.dac, top: "stoneTop" }), B(20, 42, 12, 20, 0.45, 4.95, "stone", "B", { fa: FA.cong, top: "stoneTop" }), B(20, 62, 12, 20, 0.45, 4.95, "stone", "B", { fa: FA.nhi, top: "stoneTop" })];
      const st = grid([8, 20, 32], [18, 30, 42, 54, 66, 82], 0.45, 4.95);
      for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) {
        const x = 8 + 12 * c, y = 20 + 12 * r, pool = (r === 3 && c === 1) || (r === 1 && c === 1);
        if (pool) v.push(B(x + 1, y + 1, 10, 10, 4.95, 5.2, "water", "X", M));
        else v.push(B(x + 1, y + 1, 10, 10, 4.95, 9.45, "glass", "B", { fa: { N: "kinh", E: "lam", S: "dua", W: c === 0 ? "dac" : "lam" }, fl: 1, ...M }));
        lotus(v, st, x + 6, y + 6, 12, 12.2, M);
      }
      return { v, st };
    }
  });

  /* ---------------- 5. HỘP LỒNG HỘP ---------------- */
  // ruột chung: sàn mở và các hộp phòng (dùng lại cho nhiều biến thể)
  function hopInside(v, st, ox = 0) {
    const R = o => ({ fl: 1, ...o });
    v.push(B(10 + ox, 30, 14, 16, 0.45, 6.45, "warn", "D", R()), B(26 + ox, 30, 6, 10, 0.45, 3.95, "gold", "D", R()), B(24 + ox, 60, 8, 16, 0.45, 3.95, "violet", "C", R()), B(10 + ox, 62, 12, 12, 0.45, 3.95, "accessC", "E", R()),
      B(8 + ox, 20, 24, 10, 0.45, 0.6, "sheet", "A", R()), B(8 + ox, 46, 24, 30, 0.45, 0.6, "sheet", "B", R({ footOverride: 1344 - 240 - 224 - 60 - 128 - 144 })),
      B(8 + ox, 40, 24, 36, 4.95, 5.45, "sheet", "B", R({ footOverride: 864 - 90 - 144 })), B(9 + ox, 44, 9, 10, 5.45, 8.95, "grass", "E", R()), B(22 + ox, 48, 9, 16, 5.45, 8.95, "ribbon", "B", R()),
      B(11 + ox, 52, 14, 14, 9.45, 13.2, "accent", "B", R()), B(24 + ox, 24, 7, 12, 9.45, 12.45, "violet", "C", R()));
    for (const x of [14, 20, 26]) for (const y of [44, 52, 60, 68]) st.push(seg([x + ox, y, 13.45], [x + ox, y, 5.45]));
  }
  I.push({
    id: "hop1", fam: "hop", code: "5.1", name: "Vỏ lam", rule: "Trật tự bọc tự do", tag: "Vỏ hộp có lam đứng mặt Đông, tường đặc mặt Tây, bên trong các hộp màu",
    story: "Vỏ ngoài không còn là hộp kính trần: mặt Đông là kính sau một lớp lam đứng dày, mặt Tây là tường đặc, mặt Bắc kính trong lấy sáng tán xạ, mặt Nam có lam ngang mỗi tầng. Bên trong vẫn là các hộp phòng màu đặt trên sàn hoặc treo từ dàn mái, nhìn thấy mờ mờ qua lớp lam.",
    why: [W("Quy luật hình khối", "Trật tự bọc tự do: lớp vỏ vuông vức, nhịp lam đều đặn bao lấy các hộp bên trong đặt tự do. Hình khối ngoài thực dụng, sự sinh động nằm bên trong."), W("Nắng và chói", "Mỗi mặt vỏ xử lý theo hướng nắng: Đông lam đứng chặn nắng sáng thấp, Tây đặc chặn nắng chiều, Nam lam ngang, Bắc kính trần. Không còn mặt kính trần nào hướng Đông hay Tây."), W("Gió và mưa", "Khoảng giữa vỏ và các hộp là không gian đệm; cửa lật cao ở mặt Bắc và thấp ở mặt Đông tạo thông gió xuyên."), W("Công năng", "Hộp phòng đa năng ở tầng 1 đầu Bắc, gần cửa vào; khu đọc mở trên các sàn treo; hộp đọc yên tĩnh và kho treo ở tầng 3.")],
    kc: { he: "Khung thép: cột ở hai mép dài cách 7 m, dàn mái thép cao 2 m nhịp 24 m. Sàn tầng 2 và hai hộp tầng 3 treo bằng thanh thép từ dàn mái. Lam đứng gắn vào cột.", nhip: "24 m", cx: "Không" },
    qa: [["Lam có làm bên trong tối?", "Lam đứng cách nhau 1,5 m, sâu 0,6 m: nhìn thẳng vẫn thấy sông, chỉ chặn tia nắng xiên buổi sáng. Mặt Bắc kính trần bù ánh sáng."]],
    cut: "Vỏ: hộp mica 12 × 28 × 7,5 cm, mặt Tây dán bìa đặc, mặt Đông dán que 2 mm mỗi 7,5 mm. Bên trong: 8 khối foam màu.",
    roleOf: () => "p",
    lab: [[20, 48, 15.45, "Khối chính · Vỏ hộp có lam", 1], [17, 38, 6.45, "Khối phụ · Hộp phòng đa năng", 2], [18, 59, 13.2, "Khối phụ · Hộp đọc treo", 2], [32.6, 70, 10, "Lam đứng mặt Đông"]],
    build() {
      const v = [B(8, 20, 24, 56, 0.45, 15.45, "glass", "X", { env: true, op: 0.3, fa: fShell, c2: "blk", ...M })], st = [...grid([8, 32], range(20, 76, 7), 0.45, 15.45)];
      hopInside(v, st);
      for (const y of range(20, 76, 7)) st.push(...zig(8, y, 32, y, 13.45, 15.45, 8));
      return { v, st };
    }
  });

  I.push({
    id: "hop2", fam: "hop", code: "5.2", name: "Khung hở, hộp xuyên khung", rule: "Khung trật tự, hộp tự do", tag: "Khung lưới 8 m không vỏ, các hộp phòng nhô ra khỏi khung tối đa 4 m",
    story: "Bỏ hẳn lớp vỏ, chỉ giữ lại bộ khung lưới 8 m cao ba tầng. Các hộp phòng chọn ô trong khung, lệch nhau giữa các tầng; một số hộp nhô ra khỏi khung 4 m về phía sông hoặc phía phố. Khoảng trống giữa các hộp trong khung là sân, hiên và sân thượng đọc sách.",
    why: [W("Quy luật hình khối", "Khung trật tự – hộp tự do: lưới khung cố định làm nền, các hộp đặt so le tạo sự hơi hỗn loạn có kiểm soát; mọi hộp đều gối lên dầm khung, chỗ nhô ra không quá 4 m."), W("Nắng và chói", "Mỗi hộp có mặt Tây đặc, mặt Đông lam đứng, mặt Bắc kính trần, mặt Nam mái đua. Hộp tầng trên che nắng cho sân tầng dưới."), W("Gió và mưa", "Khung không vỏ nên gió đi xuyên qua mọi khoảng trống giữa các hộp; các hộp nhỏ đều thông gió hai mặt."), W("Công năng", "Hộp sự kiện và cà phê ở tầng 1 đầu Bắc; khu đọc ở các hộp tầng 2–3; khoảng trống trong khung là chỗ đọc ngoài trời có mái che.")],
    kc: { he: "Khung thép lưới 8 × 8 m cao 3 tầng, dầm ở mọi cao độ sàn. Hộp phòng là khung nhẹ gối lên dầm; phần nhô ra khỏi khung tối đa 4 m bằng dầm công xôn.", nhip: "8 m", cx: "4 m (hộp nhô khỏi khung)" },
    qa: [["Khung không vỏ có bị mưa tạt?", "Mưa chỉ vào các sân trong khung, vốn là không gian ngoài trời; các hộp phòng có vỏ riêng và mái đua. Mái khung trên cùng có tấm che ở các ô có người ngồi."]],
    cut: "Khung: que balsa 2 mm, lưới 4 cm, cao 7,5 cm. Hộp: 10 khối foam màu, một số khối dài thêm 2 cm thò ra ngoài khung.",
    roleOf: () => "p",
    lab: [[20, 48, 15, "Khối chính · Khung lưới 8 m", 1], [32, 26, 4.95, "Khối phụ · Hộp nhô ra phía sông", 2], [6, 52, 4.95, "Khối phụ · Hộp nhô ra phía phố", 2], [20, 30, 13.95, "Hộp đọc tầng 3"]],
    build() {
      const v = [], xs = [8, 16, 24, 32], ys = range(20, 76, 8);
      for (const x of xs) for (const y of ys) v.push(B(x - 0.25, y - 0.25, 0.5, 0.5, 0, 15, "sheet", "X", M));
      const fr = [];
      for (const z of [4.95, 9.45, 13.95, 15]) { for (const x of xs) fr.push([[x, 20, z], [x, 76, z]]); for (const y of ys) fr.push([[8, y, z], [32, y, z]]); }
      v.push(LN(fr, "ink", M));
      const box = (x, y, w, d, k, c, zone, fa = FA.doc) => v.push(F1(x, y, w, d, k, c, zone, fa));
      box(8, 20, 16, 16, 0, "warn", "D", FA.su); box(24, 20, 12, 16, 0, "gold", "A", FA.cong); box(16, 36, 16, 8, 0, "glass", "A", FA.cong); box(4, 44, 12, 16, 0, "violet", "C", FA.dac); box(16, 60, 16, 16, 0, "accessC", "B", FA.nhi);
      box(8, 36, 16, 16, 1, "ribbon", "B"); box(24, 44, 12, 16, 1, "grass", "B"); box(4, 60, 12, 16, 1, "violet", "E", FA.dac); box(16, 20, 16, 8, 1, "accent", "D");
      box(12, 24, 16, 16, 2, "accent", "B"); box(16, 52, 16, 16, 2, "ribbon", "B"); box(8, 68, 8, 8, 2, "violet", "E", FA.dac); box(28, 36, 8, 12, 2, "grass", "B");
      const st = [...grid(xs, ys, 0, 15), ...fr.map(([a, b]) => seg(a, b))];
      return { v, st };
    }
  });

  I.push({
    id: "hop3", fam: "hop", code: "5.3", name: "Hai vỏ lệch", rule: "Bất đối xứng cân bằng", tag: "Vỏ lớn khu đọc và vỏ nhỏ khu sự kiện lệch nhau, nối bằng cầu kính",
    story: "Thay một vỏ lớn là hai vỏ: vỏ lớn ba tầng ôm khu đọc, lệch về phía sông; vỏ nhỏ hai tầng ôm phòng đa năng và cà phê, lệch về phía phố ở đầu Bắc. Hai vỏ nối bằng một cầu kính tầng 2. Mỗi vỏ có tường đặc phía Tây, lam phía Đông; bên trong là các hộp phòng màu.",
    why: [W("Quy luật hình khối", "Bất đối xứng cân bằng: vỏ lớn cao lệch Đông cân với vỏ nhỏ thấp lệch Tây; khoảng sân giữa hai vỏ là điểm cân bằng, cũng là lối vào chính."), W("Nắng và chói", "Cả hai vỏ: Tây đặc, Đông lam đứng, Bắc kính trần, Nam lam ngang. Vỏ nhỏ che nắng chiều cho sân vào."), W("Gió và mưa", "Sân giữa hai vỏ mở về phía Đông Nam đón gió; vỏ nhỏ ở đầu Bắc chắn gió mùa Đông Bắc cho sân."), W("Công năng", "Vỏ nhỏ hoạt động ngoài giờ độc lập (sự kiện, cà phê, vệ sinh riêng); vỏ lớn là thư viện, đóng được hoàn toàn.")],
    kc: { he: "Mỗi vỏ là khung thép, dàn mái nhịp 20 m (vỏ lớn) và 20 m (vỏ nhỏ). Sàn tầng 2 vỏ lớn treo từ dàn mái và tựa vào cột biên. Cầu kính nhịp 6 m.", nhip: "20 m", cx: "Không" },
    qa: [["Hai vỏ có tốn kém hơn một vỏ?", "Tổng diện tích vỏ gần như nhau; đổi lại khu sự kiện vận hành ngoài giờ rất gọn và khu đọc yên tĩnh hơn."]],
    cut: "Vỏ lớn: hộp mica 10 × 23 × 7 cm; vỏ nhỏ: mica 10 × 10 × 4,75 cm. Hộp phòng: foam màu. Cầu: mica 4 × 3 cm.",
    roleOf: () => "p", encl: [[12, 34, 32, 80], [6, 8, 26, 28]],
    lab: [[22, 57, 14.45, "Khối chính · Vỏ lớn khu đọc", 1], [16, 18, 9.95, "Khối phụ · Vỏ nhỏ sự kiện", 2], [18, 31, 8.95, "Khối phụ · Cầu kính", 2]],
    build() {
      const R = o => ({ fl: 1, ...o });
      const v = [B(12, 34, 20, 46, 0.45, 14.45, "glass", "X", { env: true, op: 0.3, fa: fShell, c2: "blk", ...M }), B(6, 8, 20, 20, 0.45, 9.95, "glass", "X", { env: true, op: 0.3, fa: { N: "dac", E: "lam", S: "lam", W: "dac" }, c2: "blk" }),
        B(14, 28, 8, 6, 4.95, 8.95, "glass", "L", { fa: { E: "lam", W: "lam" } }),
        B(12, 34, 20, 10, 0.45, 0.6, "sheet", "A", R(M)), B(12, 44, 8, 30, 0.45, 3.95, "violet", "C", R(M)), B(12, 74, 20, 6, 0.45, 3.95, "accessC", "E", R(M)), B(20, 44, 12, 30, 0.45, 0.6, "sheet", "B", R(M)),
        B(12, 34, 20, 46, 4.95, 5.45, "sheet", "B", R({ ...M, footOverride: 920 - 120 - 160 })), B(13, 40, 10, 12, 5.45, 8.95, "grass", "E", R(M)), B(22, 60, 9, 16, 5.45, 8.95, "ribbon", "B", R(M)),
        B(14, 46, 14, 12, 9.45, 13.2, "accent", "B", R(M)), B(18, 64, 12, 12, 9.45, 13.2, "gold", "B", R(M)),
        B(7, 9, 13, 14, 0.45, 6.45, "warn", "D", R()), B(20, 9, 6, 18, 0.45, 3.95, "gold", "A", R()), B(7, 9, 13, 10, 6.45, 9.2, "ribbon", "D", R())];
      const st = [...grid([12, 32], range(34, 80, 7.67), 0.45, 14.45), ...grid([6, 26], [8, 18, 28], 0.45, 9.95)];
      for (const y of range(34, 80, 7.67)) st.push(...zig(12, y, 32, y, 12.45, 14.45, 6));
      return { v, st };
    }
  });

  I.push({
    id: "hop4", fam: "hop", code: "5.4", name: "Vỏ đặc khoét ô", rule: "Khối trừ (khoét)", tag: "Vỏ tường dày khoét những ô lớn, lộ ra các hộp màu bên trong",
    story: "Vỏ ngoài là bốn bức tường dày, khoét những ô lớn ở đúng chỗ cần ánh sáng và tầm nhìn: mặt Bắc khoét ô lớn lấy sáng tán xạ, mặt Đông khoét ba ô nhìn sông, mặt Tây chỉ có hai khe hẹp. Qua các ô thấy các hộp phòng màu bên trong; một hộp đọc nhô hẳn ra khỏi ô mặt Đông. Mái có một khe sáng ngang giữa nhà.",
    why: [W("Quy luật hình khối", "Khối trừ: bắt đầu từ một khối đặc rồi khoét bớt, mỗi ô khoét có lý do (ánh sáng, tầm nhìn, lối vào). Tương phản giữa vỏ đặc và các hộp màu lộ ra."), W("Nắng và chói", "Tường mặt Đông dày 1,2 m nên mỗi ô khoét là một hộc sâu che nắng sáng; mặt Tây gần như đặc; mặt Bắc ô lớn đón ánh sáng tán xạ; khe mái lấy sáng giữa nhà."), W("Gió và mưa", "Ô thấp mặt Đông và khe mái tạo thông gió đứng; tường dày giữ mát. Mưa tạt bị hộc sâu chặn lại."), W("Công năng", "Ô lớn tầng 1 mặt Đông là lối vào từ bậc thang; hộp phòng đa năng sát cửa vào phía Bắc; khu đọc ở các sàn trên.")],
    kc: { he: "Vỏ là tường bê tông chịu lực dày 0,6–1,2 m, đỡ dàn mái thép nhịp 24 m. Sàn tầng 2 và hộp tầng 3 treo từ dàn mái. Hộp đọc nhô ra 3 m qua ô khoét gối lên tường.", nhip: "24 m", cx: "3 m (hộp nhô qua ô)" },
    qa: [["Tường dày có nặng nề, khép kín?", "Ba ô lớn mặt Đông và ô mặt Bắc chiếm khoảng 40% diện tích hai mặt này; ban đêm các ô sáng lên như những ô cửa sổ lớn của thành phố."]],
    cut: "4 tấm foam dày 3–6 mm khoét ô (dao rọc giấy), dán thành hộp 12 × 28 × 7,5 cm. Bên trong: khối foam màu, một khối thò ra 1,5 cm qua ô mặt Đông.",
    roleOf: () => "p", encl: [[8.6, 20.6, 31.4, 75.4]],
    lab: [[20, 34, 15.45, "Khối chính · Vỏ tường dày khoét ô", 1], [34, 54, 9.95, "Khối phụ · Hộp đọc nhô qua ô", 2], [20, 20, 13.95, "Ô lấy sáng hướng Bắc"], [32.6, 30, 2.5, "Lối vào"]],
    build() {
      const wh = (ax, at, u1, u2, t, side, holes) => ({ k: "wallh", ax, at, u1, u2, z1: 0.45, z2: 15.45, t, side, holes, c: "blk", zone: "X", role: "m" });
      const v = [wh("x", 8, 20, 76, 0.6, "W", [{ u1: 34, u2: 35.5, z1: 5.5, z2: 13.5 }, { u1: 60, u2: 61.5, z1: 5.5, z2: 13.5 }]), wh("x", 31.4, 20, 76, 1.2, "E", [{ u1: 24, u2: 40, z1: 0.45, z2: 4.95 }, { u1: 46, u2: 62, z1: 5.45, z2: 13.95 }, { u1: 66, u2: 74, z1: 0.45, z2: 9.45 }]),
        wh("y", 20, 8, 32, 0.6, "N", [{ u1: 12, u2: 28, z1: 5.45, z2: 13.95 }]), wh("y", 75.4, 8, 32, 0.6, "S", [{ u1: 12, u2: 20, z1: 0.45, z2: 4.95 }, { u1: 22, u2: 30, z1: 9.95, z2: 13.95 }]),
        B(8, 20, 24, 24, 15.15, 15.45, "blk", "X", M), B(8, 48, 24, 28, 15.15, 15.45, "blk", "X", M),
        B(24, 48, 11, 12, 5.45, 9.95, "accent", "B", { fl: 1, fa: { E: "lam", N: "kinh", S: "dua" } })];
      const st = [...grid([8.3, 31.7], range(20, 76, 7), 0.45, 15.15)];
      hopInside(v, st);
      for (const y of range(20, 76, 7)) st.push(...zig(8.6, y, 31.4, y, 13.15, 15.15, 8));
      return { v, st };
    }
  });

  /* ---------------- 6. CÁNH DIỀU ---------------- */
  const body2 = (v, T1, T2, o = {}) => { for (const [x, y, w, d, z, c, fa] of T1) v.push(F1(x, y, w, d, 0, c, z, fa, o)); for (const [x, y, w, d, z, c, fa] of T2) v.push(F1(x, y, w, d, 1, c, z, fa, o)); };
  I.push({
    id: "dieu1", fam: "dieu", code: "6.1", name: "Ba diều đối xứng tâm", rule: "Đối xứng tâm (xoay 180°)", tag: "Diều giữa lớn và cao, hai diều đầu xoay ngược nhau",
    story: "Ba cánh diều mái yên ngựa trên một thân nhà hai tầng. Cánh giữa lớn và cao nhất, che khu đọc chính; hai cánh đầu nhỏ hơn và là ảnh xoay 180° của nhau qua tâm nhà. Thân nhà đơn giản: tầng 1 sự kiện, sảnh, kho, văn phòng; tầng 2 khu đọc. Mép cánh diều đua 2 m che nắng cho tường kính.",
    why: [W("Quy luật hình khối", "Đối xứng tâm: xoay mặt bằng 180° quanh tâm nhà thì hai diều đầu đổi chỗ cho nhau, diều giữa trùng với chính nó. Hình khối động nhưng vẫn cân bằng tuyệt đối."), W("Nắng và chói", "Mép diều đua 2 m ra ngoài thân nhà; mặt Đông thân nhà có lam đứng, mặt Tây đặc, mặt Bắc kính trần, mặt Nam mái đua từng tầng."), W("Gió và mưa", "Khe giữa các cánh diều và khoảng hở dưới mép diều cho khí nóng thoát; nước mưa dồn về hai góc thấp của mỗi diều, theo cột xuống bể."), W("Công năng", "Phòng đa năng cao hai tầng ở đầu Bắc dưới diều Bắc, lối vào riêng; khu đọc ở tầng 2 dưới diều giữa.")],
    kc: { he: "Mỗi cánh diều là vỏ yên ngựa tựa trên hai chân thấp đặt chéo và cột giữa kéo lên từ thân nhà. Thân nhà khung bê tông lưới 11 × 8 m.", nhip: "26 m (vỏ yên ngựa)", cx: "2 m mép vỏ" },
    qa: [["Đối xứng tâm khác gì đối xứng gương?", "Đối xứng gương thì hai nửa giống nhau như soi gương; đối xứng tâm thì phải xoay nửa này 180° mới trùng nửa kia, nên vừa cân bằng vừa có chuyển động."]],
    cut: "Thân: hộp foam 11 × 32 × 4,5 cm. 3 tấm bìa mỏng vặn: giữa 13 × 13 cm, hai đầu 13 × 11 cm, góc cao trên que 7–8 cm, góc thấp 5 cm.",
    roleOf: () => "p",
    lab: [[19, 50, 16.5, "Khối chính · Diều giữa và thân nhà", 1], [19, 20, 14.5, "Khối phụ · Diều Bắc", 2], [19, 80, 14.5, "Khối phụ · Diều Nam", 2], [19, 25, 4.95, "Phòng đa năng cao 2 tầng"]],
    build() {
      const v = [], st = [];
      v.push(B(8, 18, 22, 14, 0.45, 9.45, "sheet", "D", { fa: FA.su, fl: 1 }));
      body2(v, [[8, 32, 22, 10, "A", "glass", FA.cong], [8, 42, 10, 20, "C", "sheet", FA.dac], [8, 62, 10, 20, "E", "sheet", FA.dac], [18, 42, 12, 40, "B", "glass", FA.doc]], [[8, 32, 22, 50, "B", "glass", FA.doc]], M);
      kite(v, st, 6, 14, 32, 36, [10.2, 14.5, 10.2, 13]);
      kite(v, st, 6, 37, 32, 63, [10.5, 16.5, 10.5, 16.5], M);
      kite(v, st, 6, 64, 32, 86, [10.2, 13, 10.2, 14.5]);
      st.push(...grid([8, 19, 30], range(18, 82, 8), 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "dieu2", fam: "dieu", code: "6.2", name: "Đàn diều tiến dần", rule: "Tiến dần, xen kẽ", tag: "Năm diều cùng cỡ, xoay xen kẽ, góc cao tăng dần từ Nam lên Bắc",
    story: "Năm cánh diều giống nhau xếp liền nhau dọc nhà, cánh này xoay ngược cánh kia như đàn diều đang bay. Góc cao của mỗi cánh tăng dần từ đầu Nam (thấp, khu thiếu nhi) lên đầu Bắc (cao, phòng đa năng và khu đọc hai tầng). Thân nhà cũng bậc lên: phía Nam một tầng, phía Bắc hai tầng.",
    why: [W("Quy luật hình khối", "Lặp lại xen kẽ và tiến dần: một loại diều lặp năm lần, xoay ngược nhau từng cánh, chiều cao tăng đều. Nhịp điệu rõ, đọc được ngay từ bờ sông."), W("Nắng và chói", "Diều thấp ở phía Nam che nắng trưa cho khu thiếu nhi. Thân nhà: Tây đặc, Đông lam đứng, Bắc kính trần, Nam mái đua."), W("Gió và mưa", "Mép thấp của các diều xen kẽ tạo khe hở so le dọc mái, khí nóng thoát ra theo các khe. Nước mưa dồn về các góc thấp."), W("Công năng", "Đầu Bắc cao: phòng đa năng và khu đọc chính; đầu Nam thấp: thiếu nhi có vườn; giữa: sảnh nhìn ra bậc thang.")],
    kc: { he: "Năm vỏ yên ngựa cùng một khuôn, mỗi vỏ tựa trên hai chân thấp đặt chéo. Thân nhà khung bê tông lưới 8 × 6,5 m.", nhip: "26 m (vỏ yên ngựa)", cx: "2 m mép vỏ" },
    qa: [["Năm cánh giống nhau có đơn điệu?", "Mỗi cánh xoay ngược cánh bên cạnh và cao hơn cánh trước, nên nhìn từ mỗi góc lại thấy một hình mái khác."]],
    cut: "5 tấm bìa mỏng 13 × 6,5 cm, góc thấp trên que 5 cm, góc cao trên que 6–8 cm tăng dần. Thân nhà: 2 hộp foam bậc.",
    roleOf: () => "p",
    lab: [[19, 34, 15.2, "Khối chính · Đàn cánh diều trên thân 2 tầng", 1], [19, 75, 4.95, "Khối phụ · Thân thấp phía Nam (thiếu nhi)", 2], [19, 20, 9.45, "Khối phụ · Phòng đa năng cao 2 tầng", 2]],
    build() {
      const v = [], st = [];
      v.push(B(8, 14, 22, 13, 0.45, 9.45, "sheet", "D", { fa: FA.su, fl: 1 }));
      body2(v, [[8, 27, 22, 13, "A", "glass", FA.cong], [8, 40, 8, 26, "C", "sheet", FA.dac], [16, 40, 14, 26, "B", "glass", FA.doc]], [[8, 27, 22, 26, "B", "glass", FA.doc], [8, 53, 8, 13, "E", "sheet", FA.dac], [16, 53, 14, 13, "B", "glass", FA.doc]], M);
      body2(v, [[8, 66, 8, 16, "E", "sheet", FA.dac], [16, 66, 14, 16, "B", "sheet", FA.nhi]], []);
      for (let k = 0; k < 5; k++) {
        const y1 = 12 + 14 * k, hi = 16.5 - 1.3 * k, lo = k < 4 ? 10.2 : 5.7, zs = k % 2 ? [hi, lo, hi, lo] : [lo, hi, lo, hi];
        kite(v, st, 6, y1, 32, y1 + 13.8, zs, k < 4 ? M : {});
      }
      st.push(...grid([8, 16, 23, 30], range(14, 82, 6.8), 0.45, (x, y) => y < 66 ? 9.45 : 4.95));
      return { v, st };
    }
  });

  I.push({
    id: "dieu3", fam: "dieu", code: "6.3", name: "Diều trên ba khối lệch", rule: "Lệch có kiểm soát", tag: "Ba khối lệch nhau 4 m, mỗi khối một cánh diều riêng",
    story: "Ba khối nhà tách rời: khối Bắc thấp (sự kiện, cà phê), khối giữa hai tầng (sảnh và khu đọc chính), khối Nam hai tầng (thiếu nhi, văn phòng). Khối giữa lệch 4 m về phía sông so với hai khối đầu. Mỗi khối có một cánh diều riêng to nhỏ theo khối, nối nhau bằng hai hành lang kính.",
    why: [W("Quy luật hình khối", "Lệch có kiểm soát và chủ – phụ: ba khối lệch nhau đúng 4 m; khối giữa lớn nhất có cánh diều lớn và cao nhất, hai khối đầu nhỏ hơn."), W("Nắng và chói", "Mỗi khối: Tây đặc, Đông lam đứng, Bắc kính trần, Nam mái đua; mép diều đua 2 m che thêm. Khe giữa các khối có hành lang kính được diều che."), W("Gió và mưa", "Hai khe giữa ba khối chạy Đông–Tây dẫn gió sông vào; khối Bắc thấp chắn gió mùa Đông Bắc."), W("Công năng", "Ba khối là ba vùng ồn khác nhau: khối Bắc ồn (sự kiện, chạy ngoài giờ), khối giữa vừa, khối Nam có thiếu nhi ở tầng 1 và văn phòng ở tầng 2.")],
    kc: { he: "Ba khung bê tông độc lập lưới 7–11 × 8 m. Mỗi cánh diều tựa trên hai chân thấp và các cột của khối bên dưới.", nhip: "22 m (vỏ yên ngựa khối giữa)", cx: "2 m mép vỏ" },
    qa: [["Ba khối tách rời có làm đi lại xa?", "Hai hành lang kính ngắn 6 m nối ba khối ở tầng 1; tầng 2 khối giữa và khối Nam nối bằng cầu."]],
    cut: "3 hộp foam: 11 × 11 × 3 cm, 11 × 16 × 4,5 cm, 11 × 10 × 4,5 cm; 3 tấm bìa vặn to nhỏ khác nhau.",
    roleOf: () => "p",
    lab: [[21, 50, 16, "Khối chính · Khối giữa và diều lớn", 1], [17, 17, 10.5, "Khối phụ · Khối Bắc (sự kiện)", 2], [17, 82, 13.5, "Khối phụ · Khối Nam (thiếu nhi)", 2]],
    build() {
      const v = [], st = [];
      v.push(B(6, 6, 14, 22, 0.45, 6.45, "sheet", "D", { fa: FA.su, fl: 1 }), B(20, 6, 8, 22, 0.45, 6.45, "glass", "A", { fa: FA.cong, fl: 1 }));
      body2(v, [[20, 34, 12, 14, "A", "glass", FA.cong], [10, 34, 10, 32, "C", "sheet", FA.dac], [20, 48, 12, 18, "B", "glass", FA.doc]], [[10, 34, 22, 32, "B", "glass", FA.doc]], M);
      body2(v, [[12, 72, 16, 20, "B", "sheet", FA.nhi], [6, 72, 6, 20, "E", "sheet", FA.dac]], [[6, 72, 10, 20, "E", "sheet", FA.dac], [16, 72, 12, 20, "B", "glass", FA.doc]]);
      v.push(B(14, 28, 6, 6, 0.45, 4.95, "glass", "L", { fa: { E: "lam", W: "lam" } }), B(14, 66, 6, 6, 0.45, 4.95, "glass", "L", { fa: { E: "lam", W: "lam" } }));
      kite(v, st, 4, 4, 30, 30, [7, 10.5, 7, 9.5]);
      kite(v, st, 8, 32, 34, 68, [10.2, 16, 10.2, 15], M);
      kite(v, st, 4, 70, 30, 94, [10.2, 13.5, 10.2, 12.5]);
      st.push(...grid([6, 17, 28], [6, 17, 28], 0.45, 6.45), ...grid([10, 21, 32], [34, 42, 50, 58, 66], 0.45, 9.45), ...grid([6, 17, 28], [72, 82, 92], 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "dieu4", fam: "dieu", code: "6.4", name: "Một cánh diều lớn", rule: "Chủ – phụ rõ ràng", tag: "Một cánh diều lớn che khu đọc, các khối phụ mái bằng phủ cỏ",
    story: "Chỉ một cánh diều lớn 26 × 46 m che toàn bộ khu đọc hai tầng, hai góc thấp tì xuống đất ở góc Tây Bắc và Đông Nam, hai góc cao vươn lên 18 m. Xung quanh là các khối phụ thấp mái bằng phủ cỏ: nhà sự kiện ở Bắc, lưng dịch vụ ở Tây. Một hình mái duy nhất là dấu nhận diện của cả công trình.",
    why: [W("Quy luật hình khối", "Chủ – phụ rõ ràng: một khối chính duy nhất có hình mái đặc biệt, các khối phụ đơn giản, thấp, mái bằng để tôn khối chính lên."), W("Nắng và chói", "Cánh diều đua 2 m quanh khu đọc. Góc cao của diều quay về phía Đông Bắc (sông) và Tây Nam; góc thấp chặn nắng chiều ở phía Tây Bắc. Lưng dịch vụ phía Tây đặc."), W("Gió và mưa", "Hai góc cao mở ra cho gió Đông Nam vào dưới diều và khí nóng thoát ở góc cao đối diện. Nước mưa dồn về hai góc thấp."), W("Công năng", "Nhà sự kiện riêng ở Bắc chạy ngoài giờ; khu đọc mở và yên tĩnh chung dưới một mái lớn, chia theo tầng.")],
    kc: { he: "Vỏ yên ngựa thép lợp màng hoặc bê tông lưới thép, tựa trên hai chân thấp và 3 cột giữa. Thân nhà khung bê tông lưới 11 × 7 m.", nhip: "46 m (vỏ yên ngựa, có 3 cột giữa đỡ thêm)", cx: "2 m mép vỏ" },
    qa: [["Mái lớn như vậy có quá tốn?", "Mặt yên ngựa là mặt tạo từ đường thẳng, khung thép gồm các thanh thẳng giống nhau; một mái lớn thay cho mái của cả thân nhà."]],
    cut: "Thân nhà: foam 11 × 21 × 4,5 cm. Diều: bìa mỏng 13 × 23 cm vặn, góc cao trên que 9 cm. Khối phụ: foam phủ giấy cỏ.",
    roleOf: () => "p",
    lab: [[21, 51, 17.5, "Khối chính · Cánh diều lớn và khu đọc", 1], [19, 16, 6.45, "Khối phụ · Nhà sự kiện mái cỏ", 2], [7, 51, 9.45, "Khối phụ · Lưng dịch vụ", 2]],
    build() {
      const v = [], st = [];
      body2(v, [[10, 30, 22, 12, "A", "glass", FA.cong], [10, 42, 22, 30, "B", "glass", FA.doc]], [[10, 30, 22, 42, "B", "glass", FA.doc]], M);
      v.push(B(8, 8, 22, 16, 0.45, 6.45, "sheet", "D", { fa: FA.su, fl: 1, top: "grass" }), ...stack(4, 30, 6, 42, ["C", "E"], "stone", FA.dac, { top: "grass" }));
      kite(v, st, 8, 28, 34, 74, [10.2, 18, 10.2, 16.5], M);
      st.push(col(21, 40, 9.45, 13.9), col(21, 51, 9.45, 14.6), col(21, 62, 9.45, 15.2), ...grid([10, 21, 32], range(30, 72, 7), 0.45, 9.45), ...grid([8, 19, 30], [8, 24], 0.45, 6.45));
      return { v, st };
    }
  });

  /* ---------------- 7. KẾT HỢP ---------------- */
  I.push({
    id: "mix1", fam: "mix", code: "7.1", name: "Làng sen", rule: "Làng sách + Đầm sen", tag: "Xóm nhà mái bằng, lá sen che các hẻm và sân ngoài trời",
    story: "Giữ xóm tám nhà to nhỏ trên lưới 4 m của Làng sách, rồi đặt năm lá sen ở những chỗ ngoài trời: sân trước nhà sự kiện, quảng trường bậc thang, sân thiếu nhi và vườn phía Nam. Nhà là chỗ đọc kín, dưới lá sen là chỗ đọc ngoài trời có bóng mát, như đọc sách dưới tán cây.",
    why: [W("Quy luật hình khối", "Hai hệ chồng lên nhau: hệ nhà đặc trên lưới 4 m và hệ lá sen nhẹ đặt ở các khoảng trống. Lá sen chỉ đặt ở chỗ không có nhà cao, nên hai hệ không đụng nhau."), W("Nắng và chói", "Mỗi nhà: Tây đặc, Đông lam đứng, Bắc kính trần, Nam mái đua. Lá sen che nắng trưa cho các sân đọc ngoài trời."), W("Gió và mưa", "Hẻm 4 m chạy Đông–Tây đón gió sông; dưới lá sen gió vẫn lùa qua vì lá đứng trên một cột."), W("Công năng", "Như Làng sách: sự kiện và cà phê ở Bắc, kho phía Tây, thiếu nhi phía Nam; lá sen mở rộng chỗ đọc ra ngoài trời mà không tính vào diện tích sàn.")],
    kc: { he: "Nhà: khung bê tông nhỏ nhịp ≤ 16 m. Lá sen: cột nấm đứng riêng, móng riêng.", nhip: "16 m", cx: "5 m từ tim cột lá sen" },
    qa: [["Lá sen ngoài trời có tốn mà ít dùng?", "Mỗi lá là một chỗ đọc, cà phê hoặc sân chơi có bóng mát dùng cả ngày, kể cả ngoài giờ thư viện; chi phí bằng một mái hiên."]],
    cut: "Như Làng sách; thêm 5 chóp ngược bìa 5 cm trên que Ø 4 mm.",
    roleOf: () => "p",
    lab: [[24, 54, 13.95, "Khối chính · Nhà đọc 3 tầng", 1], [27, 25, 10, "Khối phụ · Lá sen trên sân", 2], [15, 14, 6.45, "Khối phụ · Nhà sự kiện", 2], [22, 74, 4.95, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const Hs = [[6, 6, 18, 16], [28, 10, 8, 12], [16, 28, 16, 12], [4, 26, 8, 24], [16, 44, 16, 20], [4, 56, 8, 20], [16, 68, 12, 12], [8, 84, 12, 12]];
      const v = [...house(6, 6, 18, 16, ["D"], "blk", FA.su, "flat", { h1: 6 }), ...house(28, 10, 8, 12, ["A"], "glass", FA.cong, "flat", { top: "grass" }), ...house(16, 28, 16, 12, ["A"], "glass", FA.cong, "flat", { top: "grass" }),
        ...house(4, 26, 8, 24, ["E", "E"], "blk", FA.dac), ...house(16, 44, 16, 20, ["B", "B", "B"], "sheet", FA.doc, "flat", { vo: M }), ...house(4, 56, 8, 20, ["C", "B"], "blk", FA.dac),
        ...house(16, 68, 12, 12, ["B"], "sheet", FA.nhi, "flat", { top: "grass" }), ...house(8, 84, 12, 12, ["C", "B"], "blk", FA.doc), B(12, 45, 4, 4, 4.95, 8.95, "glass", "L"), B(12, 58, 4, 4, 4.95, 8.95, "glass", "L")];
      const st = Hs.flatMap(([x, y, w, d], i) => grid([x, x + w], [y, y + d], 0.45, [6.45, 4.95, 4.95, 9.45, 13.95, 9.45, 4.95, 9.45][i]));
      for (const [cx, cy, s, zt] of [[27, 25, 10, 10], [34.5, 32, 8, 9], [36, 56, 8, 9], [34, 75, 10, 9], [28, 90, 10, 9]]) lotus(v, st, cx, cy, s, zt);
      return { v, st };
    }
  });

  I.push({
    id: "mix2", fam: "mix", code: "7.2", name: "Cầu qua khe", rule: "Khe Hải Vân + Cầu dây văng", tag: "Hai sườn đồi thấp, hộp đọc treo bắc ngang qua khe đèo",
    story: "Hai sườn đồi mái cỏ thấp tách nhau bởi khe đèo chéo đón gió Đông Nam, như phương án Khe Hải Vân. Phía trên, một hộp đọc treo bắc ngang qua khe, giữ bằng dây văng từ hai trụ đặt trên hai sườn. Đứng dưới khe nhìn lên thấy hộp đọc như cây cầu vắt qua đèo.",
    why: [W("Quy luật hình khối", "Tương phản ngang – đứng và nặng – nhẹ: hai sườn đồi nằm thấp, bám đất; hộp đọc nhẹ treo trên cao vắt ngang. Hướng của hộp (Bắc–Nam) cắt chéo hướng của khe."), W("Nắng và chói", "Hộp đọc: Đông lam đứng, Tây đặc, Bắc kính trần. Hai sườn đồi thấp có mái cỏ dày, mặt Tây đặc, mặt Đông lam."), W("Gió và mưa", "Khe chéo dẫn gió Đông Nam xuyên giữa nhà; hộp đọc nằm cao, thoáng gió bốn phía."), W("Công năng", "Sườn Bắc: sự kiện, sảnh, văn phòng; sườn Nam: kho, thiếu nhi, đọc mở; hộp treo: đọc yên tĩnh, xa mọi nguồn ồn.")],
    kc: { he: "Hai sườn: khung bê tông lưới 8 m. Hộp đọc: dàn thép cao 1 tầng nhịp 30 m qua khe, treo thêm bằng dây văng nửa quạt từ hai trụ bê tông thon cao 28 m. Hai trụ nghiêng ra hai đầu, ngược phía hộp, dây néo phía sau neo xuống mái bê tông của hai sườn đồi.", nhip: "30 m (hộp qua khe)", cx: "Không" },
    qa: [["Hộp treo cao có khó tiếp cận?", "Mỗi đầu hộp có một lõi thang máy và thang bộ mọc lên từ sườn đồi, ngay cạnh chân trụ; người đọc lên hộp từ cả hai phía."]],
    cut: "Hai khối foam hình thang cao 2,25–4,5 cm, phủ giấy cỏ. Hộp đọc: foam 8 × 15 × 2,25 cm. Hai trụ: que gỗ vót thon 0,7 → 0,35 cm cao 14 cm, cắm nghiêng ra hai đầu. Hai lõi thang: foam xám 2 × 2,25 × 9,25 cm. Dây: chỉ trắng.",
    roleOf: () => "p",
    lab: [[20, 51, 14.45, "Khối chính · Hộp đọc treo qua khe", 1], [12, 22, 9.45, "Khối phụ · Sườn Bắc", 2], [12, 74, 4.95, "Khối phụ · Sườn Nam", 2], [26, 54.5, 2, "Khe đèo"]],
    build() {
      const yN = x => 40 + (x - 6) * 16 / 24, yS = x => yN(x) + 6;
      const NM = [[8, 14], [30, 14], [30, yN(30)], [8, yN(8)]], SM = [[8, yS(8)], [30, yS(30)], [30, 84], [8, 84]];
      const fN = { N: "dac", E: "lam", S: "lam", W: "dac" }, fS = { N: "kinh", E: "lam", S: "dua", W: "dac" };
      const P1 = pylon(20, 26, 0, 20, 23, 28, [1.4, 2.4], [0.7, 1.2], M), P2 = pylon(20, 76, 0, 20, 79, 28, [1.4, 2.4], [0.7, 1.2], M);
      const v = [PO(cutY(NM, 14, 28), 0.45, 6.45, "blk", "D", { fa: fN, fl: 1, top: "grass" }), PO(cutX(cutY(NM, 28, 70), 16, 30), 0.45, 4.95, "glass", "A", { fa: fN, fl: 1 }), PO(cutX(cutY(NM, 28, 70), 8, 16), 0.45, 4.95, "blk", "E", { fa: fN, fl: 1 }),
        PO(cutX(cutY(NM, 28, 70), 8, 16), 4.95, 9.45, "blk", "E", { fa: fN, fl: 1, top: "grass" }), PO(cutX(cutY(NM, 28, 70), 16, 30), 4.95, 9.45, "blk", "B", { fa: fN, fl: 1, top: "grass" }),
        PO(cutX(SM, 8, 18), 0.45, 4.95, "blk", "C", { fa: fS, fl: 1, top: "grass" }), PO(cutX(SM, 18, 30), 0.45, 4.95, "sheet", "B", { fa: fS, fl: 1, top: "grass" }),
        B(12, 34, 16, 34, 9.95, 14.45, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), B(12, 34, 16, 34, 14.45, 18.95, "sheet", "B", { fa: FA.doc, fl: 1, ...M }), P1, P2, B(18, 29.5, 4, 4.5, 0.45, 18.95, "stone", "X", { top: "stoneTop", ...M }), B(18, 68, 4, 4.5, 0.45, 18.95, "stone", "X", { top: "stoneTop", ...M }),
        S3([[30, yN(30) + 0.3, 0.45], [30, yS(30) - 0.3, 0.45], [8, yS(8) - 0.3, 4.95], [8, yN(8) + 0.3, 4.95]], 0.3, "zCirc")];
      v.push(stepsLN([30, yN(30) + 3, 0.45], [8, yN(8) + 3, 4.95], [0, -2.7], [0, 2.7], 24));
      const cb = [...fan(P1, 21, 27.5, pts([12, 28], [35, 37.5, 40, 42.5, 45], 18.95), 0), ...fan(P1, 21, 27.5, pts([13, 17, 23, 27], [16], 6.45), 0),
        ...fan(P2, 21, 27.5, pts([12, 28], [57, 59.5, 62, 64.5, 67], 18.95), 0), ...fan(P2, 21, 27.5, pts([13, 17, 23, 27], [82], 4.95), 0)];
      v.push(cables(cb));
      const st = [axisSeg(P1), axisSeg(P2), wall(18, 29.5, 4, 4.5, 0.45, 18.95), wall(18, 68, 4, 4.5, 0.45, 18.95), ...cb, ...zig(12, 34, 12, 68, 9.95, 18.95, 6), ...zig(28, 34, 28, 68, 9.95, 18.95, 6), ...colsIn([NM, SM], [8, 16, 23, 30], range(14, 84, 8).concat([46, 52]), 0.45, (x, y) => y < yN(x) ? 9.45 : 4.95)];
      return { v, st };
    }
  });

  I.push({
    id: "mix3", fam: "mix", code: "7.3", name: "Diều trên làng", rule: "Làng sách + Cánh diều", tag: "Mỗi nhà trong xóm một cánh diều, xoay xen kẽ",
    story: "Xóm sáu ngôi nhà to nhỏ, mỗi nhà đội một cánh diều mái yên ngựa riêng, cánh này xoay ngược cánh kia. Nhà đọc chính cao nhất có cánh diều lớn nhất. Nhìn từ trên cao như một đàn diều đang hạ xuống xóm sách.",
    why: [W("Quy luật hình khối", "Lặp lại và biến tấu: một loại mái (diều) lặp trên sáu nhà khác kích thước, xoay xen kẽ; nhà chính có diều lớn và cao nhất làm điểm nhấn."), W("Nắng và chói", "Mỗi diều đua 1 m quanh nhà. Mặt Tây các nhà đặc, mặt Đông lam đứng, mặt Bắc kính trần, mặt Nam mái đua."), W("Gió và mưa", "Hẻm Đông–Tây giữa các nhà đón gió sông; dưới mép diều có khe thoát khí nóng. Nước mưa dồn về góc thấp, xuống hẻm."), W("Công năng", "Nhà sự kiện, cà phê ở Bắc; kho, văn phòng ở Tây; đọc chính ở giữa; thiếu nhi ở Nam có vườn.")],
    kc: { he: "Mỗi nhà khung bê tông nhỏ; mỗi diều là vỏ yên ngựa tựa lên 4 cột góc của nhà (góc thấp kéo dài xuống đất).", nhip: "18 m", cx: "1 m mép vỏ" },
    qa: [["Sáu cánh diều có quá rối?", "Chỉ hai hướng xoay xen kẽ và cùng một độ vặn; nhìn từ sông là một nhịp đều, nhà chính cao nhất ở giữa."]],
    cut: "6 hộp foam, 6 tấm bìa mỏng vặn đặt lên que ở 4 góc nhà, góc thấp và góc cao chênh 3–5 cm.",
    roleOf: () => "p",
    lab: [[24, 54, 19, "Khối chính · Nhà đọc và diều lớn", 1], [15, 14, 10.5, "Khối phụ · Nhà sự kiện", 2], [8, 38, 13, "Khối phụ · Nhà kho, văn phòng", 2], [22, 76, 9, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const v = [], st = [];
      const H = [[6, 6, 18, 16, ["D"], "blk", FA.su, { h1: 6 }, 0], [16, 28, 16, 12, ["A"], "glass", FA.cong, {}, 1], [4, 26, 8, 24, ["E", "E"], "blk", FA.dac, {}, 1], [16, 44, 16, 20, ["B", "B", "B"], "sheet", FA.doc, { vo: M }, 0], [4, 56, 8, 22, ["C", "B"], "blk", FA.dac, {}, 1], [16, 68, 14, 14, ["B"], "sheet", FA.nhi, {}, 1], [8, 84, 14, 12, ["C", "B"], "blk", FA.doc, {}, 0]];
      for (const [x, y, w, d, zs, c, fa, o, tw] of H) {
        v.push(...house(x, y, w, d, zs, c, fa, "flat", o));
        const top = o.h1 ? 0.45 + o.h1 : Z(zs.length), lo = top + 0.6, hi = top + (zs.length === 3 ? 5 : 3.2);
        kite(v, st, x - 1, y - 1, x + w + 1, y + d + 1, tw ? [hi, lo, hi, lo] : [lo, hi, lo, hi], zs.length === 3 ? M : {});
        st.push(...grid([x, x + w], [y, y + d], 0.45, top));
      }
      v.push(B(12, 45, 4, 4, 4.95, 8.95, "glass", "L"), B(12, 59, 4, 4, 4.95, 8.95, "glass", "L"));
      return { v, st };
    }
  });

  I.push({
    id: "mix4", fam: "mix", code: "7.4", name: "Hộp treo trong vỏ", rule: "Hộp lồng hộp + Cầu dây văng", tag: "Hai trụ xuyên mái, dây văng treo các hộp phòng trong vỏ lam",
    story: "Một vỏ hộp có lam đứng mặt Đông, tường đặc mặt Tây. Hai trụ bê tông xuyên qua mái vỏ, từ đỉnh trụ các bó dây văng đi vào bên trong treo hai hộp đọc ở hai cao độ khác nhau. Tầng 1 là một sàn mở liền mạch, không có cột ở giữa. Qua lớp lam người đi đường thấy hai hộp lơ lửng.",
    why: [W("Quy luật hình khối", "Lồng và treo: vỏ ngoài tĩnh, trật tự; bên trong hai hộp treo lệch tầng tạo chuyển động. Hai trụ nhô khỏi mái là dấu hiệu nhận ra từ xa."), W("Nắng và chói", "Vỏ: Đông lam đứng, Tây đặc, Bắc kính trần, Nam lam ngang. Hộp treo bên trong nằm trong bóng của vỏ, không cần che nắng thêm."), W("Gió và mưa", "Khoảng cao giữa các hộp và vỏ là ống khói tự nhiên: khí nóng lên đỉnh vỏ, thoát qua cửa mái quanh hai trụ."), W("Công năng", "Tầng 1 sàn mở cho sảnh, trưng bày, cà phê, thiếu nhi; phòng đa năng là hộp đặt sát cửa Bắc; hai hộp treo là khu đọc yên tĩnh và học nhóm.")],
    kc: { he: "Hai trụ bê tông thon (chân 1,4 × 2,4 m) cao 26 m, dây văng nửa quạt treo hộp đọc, sàn giữa và hộp mái cỏ; hộp học nhóm treo dưới hộp mái cỏ bằng thanh treo thép. Vỏ là khung thép nhẹ có dàn mái 24 m, tựa cột biên, không đỡ các hộp.", nhip: "24 m (vỏ), 20 m (hộp treo)", cx: "Không" },
    qa: [["Vì sao không cho hộp tựa lên sàn cho đơn giản?", "Treo hộp giải phóng toàn bộ tầng 1 khỏi cột, cho sảnh và khu công cộng một không gian liền mạch nhìn thẳng ra sông."]],
    cut: "Vỏ: hộp mica 12 × 31 × 8,5 cm. Hai trụ que gỗ vót thon 0,7 → 0,35 cm cao 13 cm xuyên mái. Hai hộp foam màu treo bằng chỉ.",
    roleOf: () => "p", encl: [[8, 18, 32, 80]],
    lab: [[20, 49, 17.45, "Khối chính · Vỏ lam và hai trụ", 1], [20, 32, 14.45, "Khối phụ · Hộp đọc treo cao", 2], [21, 64, 9.95, "Khối phụ · Hộp học nhóm treo thấp", 2], [17, 22, 6.45, "Khối phụ · Hộp phòng đa năng", 2]],
    build() {
      const R = o => ({ fl: 1, ...o });
      const P1 = pylon(20, 41.5, 0, 20, 41.5, 26, [1.4, 2.4], [0.7, 1.2], M), P2 = pylon(20, 55.5, 0, 20, 55.5, 26, [1.4, 2.4], [0.7, 1.2], M);
      const v = [B(8, 18, 24, 62, 0.45, 17.45, "glass", "X", { env: true, op: 0.3, fa: fShell, c2: "blk", ...M }), P1, P2,
        B(8, 18, 24, 15, 0.45, 0.6, "sheet", "A", R()), B(8, 33, 24, 47, 0.45, 0.6, "sheet", "B", R({ footOverride: 1488 - 360 - 196 - 198 - 180 - 50 })),
        B(10, 20, 14, 14, 0.45, 6.45, "warn", "D", R()), B(9, 60, 11, 18, 0.45, 4.45, "violet", "C", R()), B(21, 60, 10, 18, 0.45, 4.45, "accessC", "E", R()),
        B(26, 20, 5, 10, 0.45, 3.95, "gold", "D", R()),
        B(10, 26, 20, 14, 9.95, 14.45, "accent", "B", R()), B(12, 58, 18, 16, 5.45, 9.95, "ribbon", "B", R()), B(10, 58, 20, 16, 11.45, 15.95, "grass", "B", R()), B(12, 40, 18, 10, 9.95, 10.45, "sheet", "B", R())];
      const cb = [...fan(P1, 19, 25.5, pts([10, 30], [27, 29.5, 32, 34.5, 37], 14.45), 0), ...fan(P1, 19, 25.5, pts([12, 30], [44, 47, 49.5], 10.45), 0),
        ...fan(P2, 19, 25.5, pts([10, 30], [61, 64, 67, 70, 73], 15.95), 0), ...fan(P2, 19, 25.5, pts([12, 30], [45, 48], 10.45), 0)];
      v.push(cables(cb));
      const hg = pts([12, 30], [58, 66, 74], 9.95).map(p => seg(p, [p[0], p[1], 11.45]));
      v.push(LN(hg.map(s => [s.a, s.b])));
      const st = [wall(19.3, 40.3, 1.4, 2.4, 0, 26), wall(19.3, 54.3, 1.4, 2.4, 0, 26), ...cb, ...hg, ...grid([8, 32], range(18, 80, 7.75), 0.45, 17.45)];
      for (const y of range(18, 80, 7.75)) st.push(...zig(8, y, 32, y, 15.45, 17.45, 8));
      return { v, st };
    }
  });

  I.push({
    id: "mix5", fam: "mix", code: "7.5", name: "Thung lũng sen", rule: "Khe Hải Vân + Đầm sen", tag: "Hai cánh nhà mái nghiêng, thung lũng giữa phủ lá sen",
    story: "Hai cánh nhà dài mái nghiêng vào nhau như hai sườn núi, ở giữa là một thung lũng rộng 12 m chạy từ Bắc xuống Nam. Thung lũng không để trống mà phủ sáu lá sen, dưới lá là các phòng đọc kính một tầng và vườn nước. Khu đọc giữa thung lũng được hai cánh nhà che nắng sáng và chiều.",
    why: [W("Quy luật hình khối", "Đối xứng trục dọc và tương phản: hai cánh nhà đặc, mái nghiêng đối xứng làm khung; dải lá sen nhẹ, lặp đều nằm giữa làm trọng tâm."), W("Nắng và chói", "Hai cánh nhà che nắng sáng và chiều cho thung lũng; lá sen che nắng trưa. Mặt Tây cánh Tây đặc, mặt Đông cánh Đông lam đứng."), W("Gió và mưa", "Gió sông qua cánh Đông xuống thung lũng, khí nóng thoát qua khe giữa các lá sen. Nước mưa từ hai mái và lá sen đổ về vườn nước."), W("Công năng", "Cánh Đông: sự kiện, sảnh, thiếu nhi; cánh Tây: kho, văn phòng, đọc yên tĩnh; thung lũng: đọc mở dưới lá sen.")],
    kc: { he: "Hai cánh: khung bê tông nhịp 9 m, cột cách 8 m. Thung lũng: 6 cột nấm lưới 12 m đứng riêng.", nhip: "12 m", cx: "6 m từ tim cột lá sen" },
    qa: [["Thung lũng có kín gió, bí bách?", "Thung lũng mở hai đầu Bắc và Nam, giữa các lá sen có khe hở; gió và ánh sáng đi xuống được."]],
    cut: "Hai khối foam 4,5 × 32 cm, mặt trên vát vào giữa. 6 chóp ngược bìa 6 cm trên que, 4 hộp mica 5 × 5 × 2,25 cm.",
    roleOf: () => "p",
    lab: [[20, 50, 12.2, "Khối chính · Thung lũng lá sen", 1], [9, 50, 14, "Khối phụ · Cánh Tây", 2], [31, 50, 14, "Khối phụ · Cánh Đông", 2]],
    build() {
      const fW = { N: "dac", E: "lam", S: "dua", W: "dac" }, fE = { N: "kinh", E: "lam", S: "dua", W: "lam" };
      const v = [F1(5, 18, 9, 12, 0, "blk", "D", fW), F1(5, 30, 9, 18, 0, "blk", "E", fW), F1(5, 48, 9, 22, 0, "blk", "C", fW), F1(5, 70, 9, 12, 0, "blk", "E", fW), SH(5, 18, 9, 64, 4.95, 10.45, 14.45, "-x", "blk", "B", { fa: fW, fl: 1, top: "grass" }),
        SH(26, 18, 9, 22, 0.45, 10.45, 14.45, "+x", "sheet", "D", { fa: { ...fE, N: "dac" }, fl: 1, top: "grass" }), F1(26, 40, 9, 20, 0, "glass", "A", fE), F1(26, 60, 9, 22, 0, "sheet", "B", fE), SH(26, 40, 9, 42, 4.95, 10.45, 14.45, "+x", "sheet", "B", { fa: fE, fl: 1, top: "grass" })];
      const st = [...grid([5, 14], range(18, 82, 8), 0.45, x => x === 5 ? 14.45 : 10.45), ...grid([26, 35], range(18, 82, 8), 0.45, x => x === 26 ? 10.45 : 14.45)];
      for (let k = 0; k < 6; k++) {
        const y = 14 + 12 * k;
        if (k >= 1 && k <= 4) v.push(B(15, y + 1, 10, 10, 0.45, 4.95, "glass", k === 1 ? "A" : "B", { fa: { N: "kinh", E: "lam", S: "dua", W: "lam" }, fl: 1, ...M }));
        else v.push(B(15.5, y + 1.5, 9, 9, 0, 0.25, "water", "X", M));
        lotus(v, st, 20, y + 6, 12, 12.2, M);
      }
      return { v, st };
    }
  });
})(window.G3);
