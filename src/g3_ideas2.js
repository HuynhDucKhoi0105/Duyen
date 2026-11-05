
/* ================= Đợt 2: 20 ý tưởng mới ================= */
(function (G) {
  const { B, SH, G: GB, H, FR, V, PO, LO, S3, AR, LN, col, wall, seg, grid, range, zig, COV } = G.K;
  const circ = (cx, cy, r, n = 24) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(2 * Math.PI * i / n), cy + r * Math.sin(2 * Math.PI * i / n)]);
  const star = (cx, cy, ro, ri, n) => Array.from({ length: 2 * n }, (_, i) => { const r = i % 2 ? ri : ro, a = Math.PI * i / n - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  // đĩa tròn đứng (cửa sổ tròn): trục "x" thì mặt đĩa song song mặt đứng Đông–Tây
  const DS = (cx, cy, cz, r, ax, t, c, o = {}) => ({ k: "disc", cx, cy, cz, r, ax, t, c, zone: "X", x: ax === "x" ? cx - t / 2 : cx - r, y: ax === "x" ? cy - r : cy - t / 2, w: ax === "x" ? t : 2 * r, d: ax === "x" ? 2 * r : t, z1: cz - r, z2: cz + r, ...o });
  const segsOf = st => st.filter(s => s.t === "seg").map(s => [s.a, s.b]);
  const I = [];

  I.push({
    id: "thapgio", name: "Tháp gió làm mát", tag: "Năm tháp gió hút khí nóng, cũng là năm lõi cứng của nhà",
    story: "Đà Nẵng nóng ẩm gần như quanh năm. Phương án là một thân nhà đọc hai tầng mái cỏ, xuyên qua là năm tháp gió bê tông cao 16,5 m, vượt mái 7 m. Phần trên tháp sơn tối màu, bị nắng đốt nóng nên hút không khí nóng trong khu đọc lên và thải ra ngoài; gió sông mát vào qua cửa thấp ở mặt Đông. Năm tháp thẳng hàng nhìn từ bờ sông như năm cột mốc của thư viện.",
    why: [["Khí hậu", "Hiệu ứng ống khói giúp thông gió tự nhiên, giảm thời gian chạy điều hòa. Đây là cách làm mát của kiến trúc nhiệt đới, giải thích được bằng một mặt cắt."], ["Kết cấu là ý tưởng", "Mỗi tháp là một lõi bê tông chứa thang bộ hoặc ống kỹ thuật, chạy thẳng từ móng lên đỉnh, giữ cứng cả nhà khi có bão."], ["Hình ảnh", "Từ sông thấy một nhịp năm tháp đều nhau trên thân nhà dài nằm ngang; khối chính và khối phụ rất rõ."], ["Mô hình", "Một hộp dài và năm que vuông cắm xuyên qua. Cắt rất nhanh."]],
    kc: { he: "Khung bê tông lưới 7,5 × 7–8 m. Năm tháp gió là năm lõi bê tông 4 × 4 m (thang bộ, ống kỹ thuật) từ móng lên +16,5 m, làm luôn nhiệm vụ chịu gió bão.", nhip: "8 m", cx: "Không" },
    qa: [["Tháp gió có thật sự làm mát?", "Không khí nóng nhẹ nên nổi lên; đỉnh tháp được nắng làm nóng nên hút mạnh hơn. Đây là giải pháp thông gió tự nhiên quen thuộc ở vùng nhiệt đới. Khi lặng gió vẫn có quạt trần; điều hòa chỉ dùng cho kho sách và phòng máy."], ["Mưa có tạt vào tháp không?", "Đỉnh tháp có mái che đua ra, cửa lá sách chắn mưa xiên; chân tháp có máng thu nước."]],
    cut: "Thân: hộp foam 11 × 30 × 4,5 cm, dán giấy cỏ mặt trên. 5 tháp: que gỗ vuông 2 × 2 cm cao 8 cm cắm xuyên qua thân, đỉnh dán tấm bìa 2,6 × 2,6 cm. Hiên: mica 2,5 × 8 cm.",
    main: [[5.9, 17.9, 28.1, 78.1, 0, 9.6]], roleOf: v => v.c === "stone" ? "p" : null,
    lab: [[17, 50, 9.45, "Khối chính · Thân nhà đọc 2 tầng", 1], [17, 58, 16.95, "Khối phụ · 5 tháp gió (lõi thang)", 2], [30.5, 38, 4.45, "Khối phụ · Hiên đón gió sông", 2], [12, 25, 4.95, "Phòng đa năng"]],
    build() {
      const v = [B(6, 18, 22, 14, 0.45, 4.95, "sheet", "D", { ribs: 2 }), B(6, 32, 22, 12, 0.45, 4.95, "glass", "A", { op: 0.85, ribs: 2 }), B(6, 44, 10, 18, 0.45, 4.95, "sheet", "C", { ribs: 2 }), B(6, 62, 10, 16, 0.45, 4.95, "sheet", "E", { ribs: 2 }), B(16, 44, 12, 34, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }),
        B(6, 18, 22, 44, 4.95, 9.45, "sheet", "B", { ribs: 1.5, top: "grass" }), B(6, 62, 8, 16, 4.95, 9.45, "sheet", "E", { ribs: 1.5, top: "grass" }), B(14, 62, 14, 16, 4.95, 9.45, "sheet", "B", { ribs: 1.5, top: "grass" }), B(28, 30, 5, 16, 0.45, 4.45, "glass", "A", { op: 0.8 })];
      const ty = [22, 34, 46, 58, 70];
      for (const y of ty) v.push(B(15, y - 2, 4, 4, 0.45, 16.45, "stone", "X", { top: "stoneTop", bands: [14.2, 14.9, 15.6] }), B(14.4, y - 2.6, 5.2, 5.2, 16.45, 16.95, "stone", "X", { top: "stoneTop" }));
      const st = [...grid([6, 13, 21, 28], range(18, 78, 7.5), 0.45, 9.45), ...ty.map(y => wall(15, y - 2, 4, 4, 0.45, 16.45))];
      return { v, st };
    }
  });

  I.push({
    id: "damsen", name: "Đầm sen", tag: "Mười hai lá sen hình phễu, mỗi lá đứng trên một cột",
    story: "Mái công trình là mười hai \"lá sen\" hình phễu ngược, mỗi lá rộng 12 × 12 m đứng trên một cột duy nhất, cao thấp khác nhau như lá sen trong đầm. Dưới mỗi lá là một phòng kính; giữa các phòng có hai ô hồ sen để trống. Nước mưa chảy vào lòng phễu, theo ống trong cột xuống hồ. Phòng đa năng là một hộp đá riêng ở đầu Bắc.",
    why: [["Ý nghĩa", "Sen là quốc hoa, gắn với sự thanh khiết và học vấn. Rừng lá sen cao thấp là hình ảnh dễ nhớ từ bờ sông."], ["Kết cấu", "Cột nấm (cột có mũ loe) là kết cấu sàn không dầm dùng phổ biến. Mỗi lá sen là một ô 12 × 12 m tự đứng, lặp lại 12 lần."], ["Khí hậu", "Lá sen che nắng cho mặt kính, khe giữa các lá cho khí nóng thoát lên. Nước mưa được giữ lại cho hồ."], ["Mô hình", "Một chi tiết lặp 12 lần: que tròn và chóp ngược bằng bìa. Phòng kính là hộp mica."]],
    kc: { he: "12 cột bê tông có mũ loe hình phễu, lưới 12 × 12 m. Mũ cột đỡ sàn tầng 2 kiểu sàn không dầm và lá mái phễu cao 2,2 m. Hộp sự kiện là khung riêng nhịp 10 m.", nhip: "12 m", cx: "6 m tính từ tim cột (mũ phễu cao 2,2 m làm việc như một dầm cao)" },
    qa: [["Cột đứng giữa phòng có vướng không?", "Mỗi phòng 130 m² có một cột ở giữa, như thân sen. Bàn đọc tròn đặt quanh cột, kệ sách tựa vào bốn mặt kính. Phòng đa năng cần trống thì đặt riêng trong hộp đá không cột."], ["Hồ nước có làm ẩm sách?", "Hồ ở ngoài phòng và có lá sen che. Kho sách kín đặt ở ô tầng 2 có điều hòa, không đặt sát hồ."]],
    cut: "12 que tròn Ø 4 mm. 12 lá sen: chóp ngược bằng bìa, đáy 0,7 cm, miệng 6 × 6 cm, cao 1,1 cm. Phòng: hộp mica 5,7 × 5,7 cm cao 2,25 hoặc 4,5 cm. Hồ: giấy xanh nước.",
    main: [[6, 14, 30, 86, 0, 13]],
    lab: [[12, 56, 12.2, "Khối chính · Rừng lá sen 12 cột", 1], [19, 7, 6.45, "Khối phụ · Hộp sự kiện", 2], [33.5, 60, 0.3, "Khối phụ · Hồ phản chiếu", 2], [24, 44, 0.3, "Ô hồ sen giữa nhà"]],
    build() {
      const v = [], st = [];
      const S = { "0,0": ["A", 1], "1,0": ["A", 1], "0,1": ["B", 2], "1,1": ["B", 2], "0,2": ["B", 2], "1,2": null, "0,3": ["B", 2], "1,3": ["B", 2], "0,4": ["C", 2], "1,4": ["E", 2], "0,5": null, "1,5": ["B", 1] };
      for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) {
        const x = 6 + 12 * c, y = 14 + 12 * r, cx = x + 6, cy = y + 6, s = S[`${c},${r}`];
        const zt = !s ? 9 : s[1] === 2 ? 12.2 : 7.6;
        if (s) v.push(B(x + 0.3, y + 0.3, 11.4, 11.4, 0.45, 0.45 + 4.5 * s[1], "glass", s[0], { op: 0.8, ribs: 1.9, bands: s[1] === 2 ? [4.95] : undefined }));
        else v.push(B(x + 0.5, y + 0.5, 11, 11, 0, 0.25, "water", "X"));
        v.push(B(cx - 0.35, cy - 0.35, 0.7, 0.7, 0, zt - 2.2, "sheet", "X"), FR(cx - 0.7, cy - 0.7, 1.4, 1.4, zt - 2.2, zt, 8.6, "grass", { top: "grassTop" }));
        st.push(col(cx, cy, 0, zt - 2.2));
      }
      v.push(B(8, 2, 22, 10, 0.45, 6.45, "stone", "D", { top: "stoneTop" }), B(30.5, 14, 6, 72, 0, 0.25, "water", "X"));
      st.push(...grid([8, 19, 30], [2, 12], 0.45, 6.45));
      return { v, st };
    }
  });

  I.push({
    id: "bonggio", name: "Hộp gạch bông gió", tag: "Lớp gạch thông gió che nắng của kiến trúc hiện đại Việt Nam",
    story: "Các công trình hiện đại ở Đà Nẵng, Huế, Sài Gòn những năm 1960–1970 thường bọc mặt nhà bằng gạch bông gió: những viên gạch rỗng hoa văn vừa che nắng vừa cho gió lùa. Phương án là một hộp đọc sách hai tầng (tầng 3 một phần) bọc kín bằng một lớp gạch bông gió cách mặt kính 0,8 m. Tầng 1 bằng kính lùi vào 2 m nên cả hộp như đang nổi. Sau lớp gạch ở tầng 3 có một sân thượng đọc sách lộ thiên.",
    why: [["Ý nghĩa", "Gợi lại một ngôn ngữ kiến trúc hiện đại của chính Việt Nam, không phải phong cách nhập khẩu."], ["Khí hậu", "Lớp gạch rỗng che nắng trực tiếp lên kính nhưng vẫn thông gió, giảm chói cho khu đọc (mục 5.5)."], ["Từ ngoài nhìn vào", "Ban đêm đèn trong nhà xuyên qua hoa văn gạch, cả hộp như một chiếc đèn có hoa văn."], ["Mô hình", "Một hộp và bốn tấm bìa đục lỗ đều (hoặc giấy in hoa văn) dán cách ra 4 mm."]],
    kc: { he: "Khung bê tông lưới 9 × 7,3 m. Tầng 2–3 đua 2 m ra ngoài hàng cột tầng 1. Gạch bông gió xếp trong khung thép mảnh treo vào mép sàn từng tầng.", nhip: "9 m", cx: "2 m" },
    qa: [["Gạch bông gió có làm tối khu đọc?", "Gạch rỗng khoảng 40–50%. Ánh sáng vào là ánh sáng tán xạ, đều, rất hợp với phòng đọc. Mặt Bắc dùng mẫu gạch thưa hơn."], ["Tường gạch cao 9 m có đổ không?", "Gạch không tự đứng mà xếp trong khung thép ô 3 × 3 m, khung neo vào mép sàn từng tầng."]],
    cut: "Hộp kính 11 × 24 × 4,5 cm, tầng 1 lùi vào 1 cm. Vỏ: 4 tấm bìa 1 mm in hoặc đục lưới lỗ vuông 3 mm, dán lên khung que cách mặt hộp 4 mm. Hộp sự kiện: foam đen.",
    main: [[6.9, 22.9, 31.1, 73.1, 0, 14.5]],
    lab: [[19, 56, 13.95, "Khối chính · Hộp đọc bọc gạch bông gió", 1], [19, 16, 6.45, "Khối phụ · Hộp sự kiện đá", 2], [19, 76, 13.95, "Khối phụ · Tháp thang", 2], [19, 32, 9.75, "Sân thượng sau lớp gạch"]],
    build() {
      const v = [B(10, 26, 18, 12, 0.45, 4.95, "glass", "A", { op: 0.85, ribs: 2 }), B(10, 38, 8, 32, 0.45, 4.95, "glass", "C", { op: 0.85, ribs: 2 }), B(18, 38, 10, 16, 0.45, 4.95, "glass", "E", { op: 0.85, ribs: 2 }), B(18, 54, 10, 16, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }),
        B(8, 24, 22, 48, 4.95, 9.45, "glass", "B", { op: 0.85 }), B(8, 40, 22, 32, 9.45, 13.95, "glass", "B", { op: 0.85 }), B(8, 24, 22, 16, 9.45, 9.75, "deck", "X"),
        B(8, 10, 22, 12, 0.45, 6.45, "stone", "D", { top: "stoneTop", fl: 1 }), B(14, 73.5, 10, 5, 0.45, 13.95, "stone", "E", { top: "stoneTop" })];
      const sk = { ribs: 0.6, bands: range(5.55, 13.35, 0.6), op: 0.92, top: "lamp" };
      v.push(B(7, 23, 0.3, 50, 4.95, 13.95, "lamp", "X", sk), B(30.7, 23, 0.3, 50, 4.95, 13.95, "lamp", "X", sk), B(7.3, 23, 23.4, 0.3, 4.95, 13.95, "lamp", "X", sk), B(7.3, 72.7, 23.4, 0.3, 4.95, 13.95, "lamp", "X", sk));
      const st = [...grid([10, 19, 28], [26, 33.33, 40.67, 48, 55.33, 62.67, 70], 0.45, (x, y) => y >= 40 ? 13.95 : 9.45), ...grid([8, 19, 30], [10, 22], 0.45, 6.45)];
      return { v, st };
    }
  });

  I.push({
    id: "haidang", name: "Hải đăng tri thức", tag: "Tháp đọc sách 6 tầng như ngọn hải đăng bên sông Hàn",
    story: "Hải đăng Tiên Sa trên bán đảo Sơn Trà dẫn tàu vào cảng Đà Nẵng. Phương án đặt một tháp đọc sách vuông 12 × 12 m cao 6 tầng ở góc Đông Bắc, đỉnh tháp là phòng kính sáng đèn như ngọn hải đăng. Phần còn lại là một đế dài một tầng mái cỏ chứa phòng đa năng, sảnh, kho và khu đọc lớn. Từ cầu Rồng hay từ bên kia sông đều thấy ngọn tháp.",
    why: [["Ý nghĩa", "Hải đăng dẫn đường như sách dẫn đường tri thức. Thư viện có một dấu mốc nhìn thấy từ xa."], ["Hình khối", "Khối chính và khối phụ tương phản tối đa: một tháp đứng và một đế nằm."], ["Kết cấu", "Tháp có lõi bê tông ở giữa và cột biên thẳng từ móng lên đỉnh. Đế là khung lưới 8 m bình thường."], ["Khu đất", "Đế thấp mái cỏ giữ tầm nhìn từ phố Trần Phú ra sông, chỉ một góc nhà vươn cao."]],
    kc: { he: "Tháp: lõi bê tông 5 × 5 m ở giữa (thang máy, thang bộ) và 8 cột biên cách nhau 6 m, sàn nhịp 3,5 m từ lõi ra cột. Đế: khung bê tông lưới 6–8 × 8 m.", nhip: "8 m", cx: "Không" },
    qa: [["Tháp cao 32 m có được phép xây?", "Cần kiểm tra chiều cao khống chế của khu vực Bạch Đằng. Nếu bị giới hạn thì giảm tháp còn 4 tầng và đưa phần diện tích sang đế; hình ảnh tháp vẫn giữ."], ["Đọc sách trên tháp có bất tiện?", "Mỗi tầng tháp 144 m², hợp cho khu đọc yên tĩnh theo chủ đề. Thang máy trong lõi, mỗi tầng có ban công nhỏ nhìn sông."]],
    cut: "Tháp: hộp mica 6 × 6 × 13,5 cm, kẻ vạch sàn mỗi 2,25 cm, đỉnh là hộp mica vàng cao 2 cm. Đế: foam 13 × 36 × 2,25 cm dán giấy cỏ. Nhà chờ: mica 3 × 5 cm.",
    main: [[19.9, 13.9, 32.1, 26.1, 0, 33]],
    lab: [[26, 20, 32.05, "Khối chính · Tháp hải đăng 6 tầng", 1], [26, 20, 29.5, "Phòng đọc đèn trên đỉnh"], [14, 60, 4.95, "Khối phụ · Đế dài mái cỏ", 2], [35.5, 35, 4.45, "Khối phụ · Nhà chờ bến (sảnh)", 2]],
    build() {
      const v = [B(20, 14, 12, 12, 0.45, 27.45, "glass", "B", { op: 0.85, fl: 6, bands: [4.95, 9.45, 13.95, 18.45, 22.95], ribs: 2 }), B(21, 15, 10, 10, 27.45, 31.45, "lamp", "X", { ribs: 1.25 }), B(20.5, 14.5, 11, 11, 31.45, 32.05, "stone", "X", { top: "stoneTop" }),
        B(6, 14, 14, 18, 0.45, 4.95, "sheet", "D", { top: "grass" }), B(20, 26, 12, 14, 0.45, 4.95, "sheet", "A", { top: "grass" }), B(6, 32, 14, 8, 0.45, 4.95, "sheet", "A", { top: "grass" }),
        B(6, 40, 26, 24, 0.45, 4.95, "sheet", "B", { top: "grass", ribs: 2 }), B(6, 64, 12, 22, 0.45, 4.95, "sheet", "C", { top: "grass" }), B(18, 64, 14, 22, 0.45, 4.95, "sheet", "E", { top: "grass" }),
        B(32.5, 30, 6, 10, 0.45, 4.45, "glass", "A", { op: 0.8 })];
      const st = [wall(23.5, 17.5, 5, 5, 0.45, 31.45), ...grid([20, 26, 32], [14, 20, 26], 0.45, 27.45, (x, y) => !(x === 26 && y === 20)), ...grid([6, 13, 20, 26, 32], range(14, 86, 8), 0.45, 4.95, (x, y) => !(x >= 20 && y <= 26))];
      return { v, st };
    }
  });

  I.push({
    id: "khuevan", name: "Gác Khuê Văn", tag: "Gác đọc vuông trên bốn trụ, bốn cửa sổ tròn",
    story: "Khuê Văn Các ở Văn Miếu – Quốc Tử Giám là gác vuông đặt trên bốn trụ gạch, bốn mặt có cửa sổ tròn, biểu tượng của nền văn hiến Việt Nam. Phương án dựng một gác đọc sách 22 × 22 m hai tầng nâng trên bốn trụ, mỗi mặt gác có một ô cửa sổ tròn lớn. Dưới gác là sảnh kính mở ra một hồ nước như giếng Thiên Quang. Hai bên là nhà sự kiện (Bắc) và nhà thiếu nhi, nghiệp vụ (Nam), mái thấp hơn để gác nổi bật.",
    why: [["Ý nghĩa", "Khuê Văn Các là biểu tượng của học vấn, rất hợp với một thư viện; ai nhìn cũng nhận ra."], ["Hình khối", "Khối chính rõ ràng đặt trên trụ ở giữa, hai khối phụ thấp hai bên xếp thành một trục thẳng, không tạo chữ U."], ["Kết cấu", "Bốn mặt gác là bốn dàn thép cao 2 tầng nhịp 12 m giữa các trụ góc, nên gác đứng trên bốn trụ mà sảnh bên dưới không cần cột."], ["Không gian", "Sảnh dưới gác có mái che, mở về phía sông, người qua đường có thể ghé vào."]],
    kc: { he: "Bốn trụ góc là bốn lõi bê tông bọc gạch 5 × 5 m (thang bộ, thang máy, WC). Bốn mặt gác là dàn thép cao 9 m tựa lên trụ. Sàn gác dùng dầm thép nhịp 22 m. Hai nhà hai bên là khung bê tông lưới 10–11 m.", nhip: "22 m (dầm sàn gác), 12 m (dàn mặt gác)", cx: "Không" },
    qa: [["Bốn trụ có đỡ nổi gác 2 tầng?", "Mỗi trụ là một lõi bê tông 5 × 5 m, rất cứng. Bốn mặt gác làm việc như bốn dầm cao 9 m nên tải truyền thẳng về bốn góc."], ["Có phải sao chép Văn Miếu?", "Chỉ mượn bố cục gác vuông trên trụ và cửa sổ tròn. Vật liệu, tỉ lệ và mái là hiện đại; gác lớn gấp nhiều lần nguyên mẫu."]],
    cut: "Gác: hộp foam 11 × 11 × 4,5 cm, khoét 4 lỗ tròn Ø 3,2 cm dán mica vàng. 4 trụ: khối foam màu gạch 2,5 × 2,5 × 2,25 cm. Mái: chóp 4 tam giác bìa. Hai nhà bên: hộp và mái bìa.",
    main: [[7.5, 36.5, 30.5, 59.5, 0, 19]],
    lab: [[19, 48, 18.6, "Khối chính · Gác đọc trên 4 trụ", 1], [30.2, 48, 12.8, "Cửa sổ tròn"], [19, 19, 8.6, "Khối phụ · Nhà sự kiện, sảnh", 2], [19, 75, 12, "Khối phụ · Nhà thiếu nhi, nghiệp vụ", 2], [35, 48, 0.3, "Giếng Thiên Quang"]],
    build() {
      const v = [B(8, 37, 22, 22, 4.95, 13.95, "ribbon", "B", { bands: [9.45], ribs: 2.2 }), H(7, 36, 24, 24, 13.95, 18.6, "warn"),
        B(8, 37, 5, 5, 0.45, 4.95, "ribbon", "E"), B(25, 37, 5, 5, 0.45, 4.95, "ribbon", "E"), B(8, 54, 5, 5, 0.45, 4.95, "ribbon", "E"), B(25, 54, 5, 5, 0.45, 4.95, "ribbon", "E"),
        B(13, 42, 12, 12, 0.45, 4.95, "glass", "A", { op: 0.85 }),
        DS(30.15, 48, 9.45, 3.2, "x", 0.3, "lamp"), DS(7.85, 48, 9.45, 3.2, "x", 0.3, "lamp"), DS(19, 36.85, 9.45, 3.2, "y", 0.3, "lamp"), DS(19, 59.15, 9.45, 3.2, "y", 0.3, "lamp"),
        B(8, 12, 22, 14, 0.45, 6.45, "sheet", "D", { fl: 1 }), GB(7.5, 11.5, 23, 15, 6.45, 8.6, "warn", "x"), B(8, 26, 22, 8, 0.45, 4.95, "sheet", "A", { top: "grass" }),
        B(8, 62, 10, 26, 0.45, 4.95, "sheet", "C"), B(18, 62, 12, 26, 0.45, 4.95, "glass", "B", { op: 0.85 }), B(8, 62, 22, 13, 4.95, 9.45, "sheet", "E"), B(8, 75, 22, 13, 4.95, 9.45, "sheet", "B"), H(7.5, 61.5, 23, 27, 9.45, 12, "warn"),
        B(31, 40, 8, 16, 0, 0.25, "water", "X")];
      const st = [wall(8, 37, 5, 5, 0.45, 13.95), wall(25, 37, 5, 5, 0.45, 13.95), wall(8, 54, 5, 5, 0.45, 13.95), wall(25, 54, 5, 5, 0.45, 13.95),
        ...zig(8, 37, 30, 37, 4.95, 13.95, 4), ...zig(8, 59, 30, 59, 4.95, 13.95, 4), ...zig(8, 37, 8, 59, 4.95, 13.95, 4), ...zig(30, 37, 30, 59, 4.95, 13.95, 4),
        ...grid([8, 19, 30], [12, 26, 34], 0.45, (x, y) => y < 26 ? 6.45 : 4.95), ...grid([8, 18, 30], [62, 68.5, 75, 81.5, 88], 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "chosach", name: "Chợ sách mái chồng diêm", tag: "Hội chợ sách dưới mái hai tầng của nhà chợ",
    story: "Chợ là nơi người Đà Nẵng gặp nhau mỗi ngày, như chợ Hàn gần đó. Phương án là một hội trường dài 48 m kiểu nhà chợ: mái hai tầng (mái chồng diêm), giữa hai lớp mái là dải kính lấy sáng và thoát khí nóng. Bên trong, các sạp sách xếp thành dãy như sạp chợ; hai bên có hành lang tầng 2 nhìn xuống. Nhà sự kiện và nhà kho, hỗ trợ là hai nhà nhỏ ở hai đầu.",
    why: [["Ý nghĩa", "Thư viện như một phiên chợ sách: đông vui, ai cũng ghé vào được, đúng yêu cầu mời gọi người qua đường."], ["Khí hậu", "Mái chồng diêm là cách thông gió truyền thống của chợ và đình: khí nóng thoát qua khe giữa hai lớp mái."], ["Không gian", "Lòng nhà ở giữa cao gấp đôi, hai bên là hành lang tầng 2, một không gian lớn liền mạch, dễ định hướng."], ["Mô hình", "Thân là hộp, mái là hai khối vát và một lăng trụ tam giác nhỏ phía trên."]],
    kc: { he: "Khung bê tông 4 hàng cột cách 8 m theo phương ngang, 8 m theo phương dọc. Hai hàng cột giữa kéo lên đỡ mái trên. Vì kèo thép mái dưới nhịp 8 m.", nhip: "8 m", cx: "Mái đua 1 m" },
    qa: [["Hai hàng cột giữa có vướng?", "Hai hàng cột này là đường biên của lòng chợ cao gấp đôi, sạp sách xếp thẳng hàng giữa cột. Cách 8 m là khoảng cách quen thuộc của nhà chợ."], ["Đọc yên tĩnh ở đâu?", "Hành lang tầng 2 phía Tây (xa sông) là khu đọc yên tĩnh; phòng đọc kín đặt ở nhà phía Nam."]],
    cut: "Thân: hộp foam 12 × 24 × 4,5 cm. Mái dưới: 2 khối vát. Dải kính: mica cao 2 cm. Mái trên: lăng trụ tam giác 5 × 26 cm. Sạp sách: 6 khối màu nhỏ đặt bên trong.",
    main: [[6, 22, 32, 74, 0, 16]],
    lab: [[19, 48, 15.8, "Khối chính · Chợ sách mái chồng diêm", 1], [19, 34, 12.6, "Dải kính giữa hai lớp mái"], [19, 14, 9, "Khối phụ · Nhà sự kiện", 2], [19, 83, 12, "Khối phụ · Nhà kho, hỗ trợ", 2], [19, 52, 2.65, "Sạp sách"]],
    build() {
      const v = [B(7, 24, 24, 8, 0.45, 4.95, "deck", "A", { ribs: 2 }), B(7, 32, 24, 40, 0.45, 4.95, "deck", "B", { ribs: 2 }),
        B(7, 24, 8, 48, 4.95, 9.45, "deck", "B", { ribs: 2 }), B(23, 24, 8, 48, 4.95, 9.45, "deck", "B", { ribs: 2 }), B(15, 24, 8, 48, 4.95, 9.45, "glass", "X", { op: 0.3 }),
        SH(6, 23, 9, 50, 9.45, 9.75, 12.2, "+x", "warn", "X"), SH(23, 23, 9, 50, 9.45, 9.75, 12.2, "-x", "warn", "X"), B(15, 23.5, 8, 49, 9.45, 13.4, "glass", "X", { op: 0.7, ribs: 1.4 }), GB(14, 22, 10, 52, 13.4, 15.8, "warn", "y"),
        B(8, 8, 22, 13, 0.45, 6.45, "deck", "D", { fl: 1, ribs: 2.2 }), GB(7.5, 7.5, 23, 14, 6.45, 9, "warn", "x"),
        B(8, 75, 11, 16, 0.45, 9.45, "deck", "C", { bands: [4.95] }), B(19, 75, 11, 16, 0.45, 9.45, "deck", "E", { bands: [4.95] }), H(7.5, 74.5, 23, 17, 9.45, 12, "warn")];
      for (let k = 0; k < 6; k++) v.push(B(16, 34 + 6.2 * k, 6, 3.6, 0.45, 2.65, COV[k], "X", { top: "sheet" }));
      const st = [...grid([7, 15, 23, 31], range(24, 72, 8), 0.45, x => x === 15 || x === 23 ? 13.4 : 9.45), ...grid([8, 19, 30], [8, 21], 0.45, 6.45), ...grid([8, 19, 30], [75, 83, 91], 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "danda", name: "Đàn đá", tag: "Chín thanh nhà dài ngắn, cao thấp như phím đàn đá",
    story: "Đàn đá là nhạc cụ cổ của người Việt: những thanh đá dài ngắn khác nhau xếp song song, mỗi thanh một nốt. Phương án là chín thanh nhà rộng 6,4 m chạy theo hướng Đông–Tây, dài và cao khác nhau, giữa các thanh là khe kính 1,6 m. Nhìn từ sông thấy đầu các thanh so le như phím đàn; nhìn dọc phố thấy một giai điệu cao thấp. Bốn thanh cao nhất ở giữa là khu đọc chính.",
    why: [["Ý nghĩa", "Đàn đá là di sản âm nhạc Việt Nam; giai điệu cao thấp của khối tạo nhịp điệu cho cả mặt phố Bạch Đằng."], ["Kết cấu", "Mỗi thanh nhà là hai bức tường chịu lực cách nhau 6,4 m, sàn nhịp ngắn. Cả công trình không có cột nào đứng trong phòng."], ["Khí hậu", "Thanh nhà hẹp hướng Đông–Tây đón gió sông xuyên suốt, khe kính đưa ánh sáng vào giữa nhà."], ["Mô hình", "Chín thanh foam cùng tiết diện, chỉ khác chiều dài và chiều cao."]],
    kc: { he: "Tường bê tông chịu lực dọc hai cạnh dài của mỗi thanh, cách nhau 6,4 m. Riêng phòng đa năng gộp hai thanh đầu, bỏ tường giữa, dùng dầm thép 14,4 m.", nhip: "6,4 m (14,4 m ở phòng đa năng)", cx: "Không" },
    qa: [["Phòng rộng 6,4 m có quá hẹp?", "Một thanh đủ cho hai dãy kệ và một dãy bàn. Khu đọc lớn mở tường giữa hai thanh bằng các ô cửa rộng, nhìn xuyên qua khe kính."], ["Đi lại giữa các thanh thế nào?", "Khe kính ở đầu phía Tây là hành lang nối các thanh, có thang ở thanh thứ 4 và thứ 7."]],
    cut: "Chín thanh foam rộng 3,2 cm: dài 14, 12, 14, 13, 12, 14, 11, 9, 7 cm; cao 3,25, 2,25, 4,5, 6,75, 4,5, 4,5, 6,75, 4,5, 2,25 cm. Khe kính: mica 0,8 cm.",
    main: [[5.9, 35.9, 34.1, 66.5, 0, 14.5]],
    lab: [[17, 64, 13.95, "Khối chính · 4 thanh đàn cao (khu đọc)", 1], [17, 20, 6.95, "Khối phụ · Thanh sự kiện, sảnh", 2], [14, 79, 9.45, "Khối phụ · Thanh thiếu nhi, kho", 2], [10, 43, 4.6, "Khe kính nối các thanh"]],
    build() {
      const v = [], st = [];
      const BARS = [[28, ["D"], 6.5], [24, ["D"]], [28, ["A", "B"]], [26, ["A", "B", "B"]], [24, ["B", "B"]], [28, ["C", "B"]], [22, ["B", "B", "B"]], [18, ["E", "E"]], [14, ["C"]]];
      const tone = ["blk", "sheet", "blkTop"], nfl = BARS.map(b => b[1].length);
      BARS.forEach(([L, zs, hT], i) => {
        const y = 12 + 8 * i, top = hT ? 0.45 + hT : 0.45 + 4.5 * zs.length;
        zs.forEach((z, k) => { const z1 = 0.45 + 4.5 * k; v.push(B(6, y, L, 6.4, z1, hT && k === 0 ? top : z1 + 4.5, tone[i % 3], z, { top: "stoneTop", ribs: 1.6, fl: 1 })); });
        if (i !== 1) st.push(wall(6, y - 0.15, L, 0.3, 0.45, top));
        if (i !== 0) st.push(wall(6, y + 6.25, L, 0.3, 0.45, top));
        if (i > 1) { const fl = Math.min(nfl[i - 1], nfl[i]); v.push(B(6, y - 1.6, 8, 1.6, 0.45, 0.45 + 4.5 * fl, "glass", "L", { op: 0.7, fl })); }
      });
      v.push(B(6, 18.4, 24, 1.6, 0.45, 4.95, "glass", "D", { op: 0.7 }));
      for (const x of range(8, 28, 4)) st.push(seg([x, 12, 4.8], [x, 26.4, 4.8]));
      return { v, st };
    }
  });

  I.push({
    id: "trongdong", name: "Trống đồng", tag: "Khu đọc tròn như mặt trống đồng, ngôi sao giữa là giếng trời",
    story: "Trống đồng Đông Sơn như cuốn sách bằng đồng của người Việt cổ: mặt trống khắc ngôi sao ở giữa và các vành hoa văn kể chuyện giã gạo, đánh trống, chèo thuyền. Phương án là một khu đọc hình tròn đường kính 29 m, hai tầng, mái phẳng như mặt trống với ngôi sao 12 cánh là giếng trời kính. Thân trống bọc kim loại màu đồng có các vành ngang. Hai nhà chữ nhật ở hai đầu chứa sự kiện, sảnh và thiếu nhi, kho.",
    why: [["Ý nghĩa", "Trống đồng là biểu tượng văn hóa Việt Nam được biết đến rộng rãi, lại là một \"văn bản\" ghi lại đời sống người xưa."], ["Không gian", "Khu đọc tròn quanh giếng trời: ngồi đâu cũng hướng về trung tâm sáng, rất dễ định hướng."], ["Kết cấu", "Hai vòng cột (16 cột ngoài, 8 cột trong) và dầm hướng tâm 7 m; kết cấu tròn rất cứng khi có bão."], ["Mô hình", "Một trụ tròn foam cắt bằng dây nhiệt, ngôi sao bằng mica vàng dán lên mặt."]],
    kc: { he: "Hai vòng cột bê tông: vòng ngoài 16 cột bán kính 14,1 m sát vỏ, vòng trong 8 cột bán kính 7 m quanh giếng trời. Dầm hướng tâm nhịp 7 m. Hai nhà hai đầu là khung lưới 7 m.", nhip: "7 m", cx: "Mép mặt trống loe 0,9 m" },
    qa: [["Phòng tròn có khó xếp kệ?", "Kệ xếp theo vòng tròn đồng tâm hoặc theo tia hướng vào giếng trời. Phần cong chỉ ở vòng ngoài, đặt bàn đọc sát kính."], ["Thân trống bọc kim loại có nóng?", "Lớp kim loại là vỏ che nắng cách tường 0,6 m, có khe thông gió; cửa sổ là các dải kính giữa các vành."]],
    cut: "Trống: trụ foam Ø 14,5 cm cao 4,5 cm, dán giấy màu đồng, kẻ 3 vành. Mặt trống: đĩa bìa Ø 15,4 cm, ngôi sao 12 cánh bằng mica vàng. Hai nhà: hộp foam xám.",
    main: [[5.4, 35.4, 34.6, 64.6, 0, 12]],
    lab: [[12, 50, 10.9, "Khối chính · Trống đồng (khu đọc 2 tầng)", 1], [24, 47, 11.4, "Ngôi sao giếng trời"], [20, 18, 6.45, "Khối phụ · Nhà sự kiện, sảnh", 2], [20, 79, 9.45, "Khối phụ · Nhà thiếu nhi, kho", 2]],
    build() {
      const v = [PO(circ(20, 50, 14.5, 32), 0.45, 9.45, "gold", "B", { fl: 2, top: "lampTop" }), LO(circ(20, 50, 14.5, 32), circ(20, 50, 15.4, 32), 9.45, 10.6, "gold", "X"), PO(circ(20, 50, 15.4, 32), 10.6, 10.9, "gold", "X", { top: "lampTop" }), PO(star(20, 50, 6.5, 3.2, 12), 10.9, 11.4, "lamp", "X"),
        B(6, 12, 28, 12, 0.45, 6.45, "stone", "D", { fl: 1, top: "stoneTop" }), B(6, 24, 28, 9, 0.45, 4.95, "glass", "A", { op: 0.85 }),
        B(16, 33, 8, 3, 0.45, 4.95, "glass", "L", { op: 0.7 }), B(16, 64.5, 8, 5.5, 0.45, 4.95, "glass", "L", { op: 0.7 }),
        B(6, 70, 12, 18, 0.45, 4.95, "stone", "C", { top: "stoneTop" }), B(18, 70, 16, 18, 0.45, 4.95, "stone", "B", { top: "stoneTop" }), B(6, 70, 14, 18, 4.95, 9.45, "stone", "E", { top: "grass" }), B(20, 70, 14, 18, 4.95, 9.45, "stone", "B", { top: "grass" })];
      const ring = (r, z) => { const p = circ(20, 50, r, 48); return p.map((a, i) => [[...a, z], [...p[(i + 1) % p.length], z]]); };
      v.push(LN([...ring(14.55, 2.7), ...ring(14.55, 4.95), ...ring(14.55, 7.2)]));
      const st = [];
      for (let i = 0; i < 16; i++) { const a = 2 * Math.PI * i / 16; st.push(col(20 + 14.1 * Math.cos(a), 50 + 14.1 * Math.sin(a), 0.45, 10.6)); }
      for (let i = 0; i < 8; i++) { const a = 2 * Math.PI * i / 8 + Math.PI / 8; st.push(col(20 + 7 * Math.cos(a), 50 + 7 * Math.sin(a), 0.45, 10.6)); }
      st.push(...grid([6, 13, 20, 27, 34], [12, 24], 0.45, 6.45), ...grid([6, 13, 20, 27, 34], [33], 0.45, 4.95), ...grid([6, 13, 20, 27, 34], [70, 79, 88], 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "thung", name: "Thuyền thúng", tag: "Bốn chiếc thúng tròn nằm bên một thanh nhà đọc",
    story: "Trên bãi biển Mỹ Khê, Nam Ô, ngư dân Đà Nẵng úp những chiếc thuyền thúng tròn đan bằng tre. Phương án là một thanh nhà đọc hai tầng chạy dọc phía Trần Phú (khối chính); phía sông là bốn \"chiếc thúng\" tròn to nhỏ khác nhau, mái vòm thấp đan tre: thúng sự kiện, thúng cà phê, thúng thiếu nhi và thúng đọc ngoài. Mỗi thúng nối với thanh nhà bằng một cầu kính ngắn.",
    why: [["Ý nghĩa", "Thuyền thúng là hình ảnh riêng của biển miền Trung, gần gũi với người Đà Nẵng và du khách."], ["Hình khối", "Khối chính thẳng và dài, khối phụ tròn và thấp: tương phản rõ, nhìn từ sông thấy ngay bốn khối phụ."], ["Kết cấu", "Thanh nhà là khung bê tông thông thường. Mỗi thúng có một vòng cột ở mép và mái vòm tre hoặc thép nhẹ, không cột giữa."], ["Công năng", "Các khu ồn (sự kiện, cà phê, thiếu nhi) tách ra các thúng, khu đọc yên tĩnh ở trong thanh nhà."]],
    kc: { he: "Thanh nhà: khung bê tông lưới 7 × 8 m. Mỗi thúng: 8 cột thép quanh mép, mái vòm thấp bằng khung tre hoặc thép, nhịp 12–18 m.", nhip: "18 m (mái vòm thúng lớn nhất)", cx: "Mái thúng đua 0,5 m" },
    qa: [["Mái vòm tre có bền?", "Tre đã xử lý chống mối mọt làm lớp ngoài, bên dưới là khung thép và lớp chống thấm. Có thể dùng hoàn toàn thép nếu cần."], ["Bốn thúng có làm rối mặt sông?", "Bốn thúng cách đều nhau và cùng một ngôn ngữ, chỉ khác kích thước theo công năng, như những chiếc thúng trên bãi."]],
    cut: "Thanh nhà: hộp foam 7 × 36 × 4,5 cm. Thúng: trụ foam tròn Ø 6–9 cm cao 2–3 cm, mái là 3 lớp bìa tròn nhỏ dần (hoặc nửa quả bóng nhựa), dán giấy đan tre.",
    main: [[5.9, 13.9, 20.1, 86.1, 0, 10]],
    lab: [[13, 56, 9.45, "Khối chính · Thanh đọc 2 tầng", 1], [29.5, 24, 8, "Khối phụ · Thúng sự kiện", 2], [29, 44, 6.4, "Khối phụ · Thúng cà phê", 2], [28.5, 62, 6.4, "Khối phụ · Thúng thiếu nhi", 2], [29, 80, 6.4, "Khối phụ · Thúng đọc ngoài", 2]],
    build() {
      const v = [B(6, 14, 14, 12, 0.45, 4.95, "sheet", "A", { ribs: 2 }), B(6, 26, 14, 18, 0.45, 4.95, "sheet", "C", { ribs: 2 }), B(6, 44, 14, 42, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }), B(6, 14, 14, 58, 4.95, 9.45, "sheet", "B", { ribs: 1.4 }), B(6, 72, 14, 14, 4.95, 9.45, "sheet", "E", { ribs: 1.4 })];
      const st = grid([6, 13, 20], range(14, 86, 8), 0.45, 9.45);
      for (const [cx, cy, r, z, h] of [[29.5, 24, 9, "D", 5.95], [29, 44, 6.5, "A", 4.45], [28.5, 62, 7, "B", 4.45], [29, 80, 6, "B", 4.45]]) {
        v.push(PO(circ(cx, cy, r, 28), 0.45, h, "glass", z, { op: 0.8, fl: 1 }), LO(circ(cx, cy, r * 1.06, 28), circ(cx, cy, r * 0.86, 28), h, h + 0.8, "deck", "X"), LO(circ(cx, cy, r * 0.86, 28), circ(cx, cy, r * 0.55, 28), h + 0.8, h + 1.5, "deck", "X"), LO(circ(cx, cy, r * 0.55, 28), circ(cx, cy, r * 0.12, 28), h + 1.5, h + 1.9, "deck", "X"));
        v.push(B(20, cy - 1.5, cx - r - 20 + 0.6, 3, 0.45, 4.2, "glass", "L", { op: 0.7 }));
        for (let i = 0; i < 8; i++) { const a = 2 * Math.PI * i / 8; st.push(col(cx + (r - 0.4) * Math.cos(a), cy + (r - 0.4) * Math.sin(a), 0.45, h)); }
      }
      return { v, st };
    }
  });

  I.push({
    id: "ruongsach", name: "Rương sách mở nắp", tag: "Rương gỗ cất sách quý, nắp hé mở về phía sông",
    story: "Ngày xưa sách quý được cất trong những chiếc rương gỗ có nẹp và khóa đồng. Phương án là một chiếc rương gỗ lớn hai tầng, nắp rương là mái một dốc nghiêng lên về phía sông như đang hé mở. Khe hở dưới nắp là một dải kính lớn nhìn ra sông Hàn và cầu Rồng; bên dưới nắp là gác đọc tầng 3. Ổ khóa đồng trên mặt rương chính là sảnh vào.",
    why: [["Ý nghĩa", "Mở rương sách là mở kho tri thức cho mọi người; câu chuyện dễ kể với thầy và người xem."], ["Tầm nhìn", "Nắp mở về phía Đông: mặt cao nhất nhìn ra sông, đón nắng sáng dịu; lưng thấp quay về phía Trần Phú che nắng chiều."], ["Kết cấu", "Khung bê tông 3 hàng cột; mỗi hàng cao dần theo độ dốc của nắp, xà gồ thép nhịp 11 m."], ["Mô hình", "Một hộp, một khối vát kính và một tấm bìa nghiêng làm nắp. Ổ khóa là một khối nhỏ màu đồng."]],
    kc: { he: "Khung bê tông 3 hàng cột (x = 8, 19, 30 m) cách nhau 6,5 m. Cột hàng giữa và hàng Đông kéo lên đỡ nắp mái nghiêng. Nắp: xà gồ thép nhịp 11 m.", nhip: "11 m", cx: "Nắp mái đua 1 m" },
    qa: [["Mái một dốc có thoát nước tốt?", "Nước chảy về phía Tây (lưng rương), vào máng dọc và ống đứng trong tường. Mái dốc khoảng 12°, đủ cho tôn hoặc ngói phẳng."], ["Dải kính lớn hướng Đông có chói?", "Nắp đua 1 m và kính có lớp phủ giảm nắng; nắng sáng chỉ vào sâu vài mét lúc sớm."]],
    cut: "Thân rương: hộp foam 11 × 26 × 4,5 cm dán giấy vân gỗ, 4 nẹp góc giấy đen. Khối kính vát: mica. Nắp: bìa 2 mm 12 × 27 cm nghiêng từ 0,25 đến 2,9 cm. Ổ khóa: khối vàng 2 × 6 × 3 cm.",
    main: [[7, 21, 31, 75, 0, 16]],
    lab: [[19, 48, 13.3, "Khối chính · Rương gỗ mở nắp", 1], [30, 62, 14.5, "Khe kính dưới nắp nhìn sông"], [32, 48, 6.45, "Khối phụ · Hộp khóa (sảnh)", 2], [19, 83, 7, "Khối phụ · Nhà thiếu nhi", 2]],
    build() {
      const v = [B(8, 22, 22, 13, 0.45, 4.95, "deck", "D", { ribs: 1.1 }), B(8, 35, 22, 9, 0.45, 4.95, "deck", "A", { ribs: 1.1 }), B(8, 44, 10, 18, 0.45, 4.95, "deck", "C", { ribs: 1.1 }), B(8, 62, 10, 12, 0.45, 4.95, "deck", "E", { ribs: 1.1 }), B(18, 44, 12, 30, 0.45, 4.95, "deck", "B", { ribs: 1.1 }),
        B(8, 22, 22, 40, 4.95, 9.45, "deck", "B", { ribs: 1.1 }), B(8, 62, 10, 12, 4.95, 9.45, "deck", "E", { ribs: 1.1 }), B(18, 62, 12, 12, 4.95, 9.45, "deck", "B", { ribs: 1.1 }),
        SH(8, 22, 22, 52, 9.45, 9.45, 14.7, "+x", "glass", "X", { op: 0.55 }), S3([[7, 21, 9.95], [31, 21, 15.2], [31, 75, 15.2], [7, 75, 9.95]], 0.5, "ribbon"),
        B(23, 26, 7, 44, 9.45, 12.8, "deck", "B", { fl: 1 }),
        B(30, 42, 4, 12, 0.45, 6.45, "gold", "A", { fl: 1 }), B(33.6, 46, 0.6, 4, 3, 4.2, "ink", "X"),
        B(10, 78, 18, 10, 0.45, 4.95, "ribbon", "B"), GB(9.5, 77.5, 19, 11, 4.95, 7, "ribbon", "x")];
      for (const [x, y] of [[7.8, 21.8], [29.6, 21.8], [7.8, 73.6], [29.6, 73.6]]) v.push(B(x, y, 0.6, 0.6, 0.45, 9.45, "ink", "X"));
      const st = [...grid([8, 19, 30], range(22, 74, 6.5), 0.45, x => x === 8 ? 9.45 : x === 19 ? 12.1 : 14.7), ...grid([10, 19, 28], [78, 88], 0.45, 4.95)];
      return { v, st };
    }
  });

  I.push({
    id: "nuisach", name: "Nhà kính núi sách", tag: "Ngọn núi sách bậc thang đặt trong một nhà kính",
    story: "Phương án học từ Book Mountain (Spijkenisse, Hà Lan, MVRDV, 2012): một ngọn núi kệ sách bậc thang được bao trong vỏ kính. Ở đây núi sách có ba bậc thấp dần về phía sông, mặt mỗi bậc là một sân đọc, các bậc nối nhau bằng cầu thang lớn chạy trên sườn núi. Vỏ kính là mái một dốc, cao ở phía Trần Phú và thấp dần ra sông. Phòng đa năng là hộp riêng ở đầu Bắc.",
    why: [["Từ ngoài nhìn vào", "Qua lớp kính người ngoài thấy cả ngọn núi sách và người đang leo lên đọc, đúng yêu cầu mời gọi của thầy."], ["Không gian", "Bên trong là một không gian lớn liền mạch, đứng ở đâu cũng thấy sách."], ["Kết cấu", "Núi sách là khung bê tông, mỗi bậc lùi đúng một hàng cột (9 m) nên không cần dầm chuyển. Vỏ kính là khung thép riêng, xà mái tựa lên đầu cột của núi."], ["Khí hậu", "Mái kính có lá chắn nắng; khí nóng dồn lên đỉnh phía Tây và thoát qua cửa mái."]],
    kc: { he: "Núi sách: khung bê tông, cột ở x = 7, 16, 25, 31 m, cách nhau 6 m theo phương dọc; mỗi bậc lùi đúng một hàng cột. Vỏ kính: khung thép, xà mái tựa lên đầu cột của núi.", nhip: "9 m", cx: "Không" },
    qa: [["Nhà kính có quá nóng?", "Mái dùng kính Low-E có lá chắn nắng bên ngoài, đỉnh mái mở được để thoát nhiệt. Khu đọc chính nằm trên mặt các bậc, không sát mái."], ["Người đi xe lăn lên núi thế nào?", "Thang máy đặt ở phía Tây, dừng ở mỗi bậc; cầu thang lớn trên sườn là lối đi chính cho đa số người đọc."]],
    cut: "Núi: 3 lớp foam xếp lùi 4,5 cm về phía Tây (12 × 29, 9 × 24, 4,5 × 18 cm). Vỏ kính: mica dán thành khối một dốc, cao 9,75 cm ở phía Tây, 3 cm ở phía Đông.",
    main: [[6.9, 19.9, 31.1, 78.1, 0, 20]], roleOf: v => v.c === "lamp" ? "p" : null,
    lab: [[14, 30, 16.5, "Khối chính · Nhà kính núi sách", 1], [28, 48, 7, "Bậc lên núi sách"], [19, 11, 5.95, "Khối phụ · Hộp sự kiện", 2], [11, 48, 15.6, "Khối phụ · Chòi đỉnh núi", 2]],
    build() {
      const v = [B(7, 20, 24, 10, 0.45, 4.95, "deck", "A"), B(7, 30, 24, 34, 0.45, 4.95, "deck", "B", { ribs: 0.8 }), B(7, 64, 12, 14, 0.45, 4.95, "deck", "C"), B(19, 64, 12, 14, 0.45, 4.95, "deck", "E"),
        B(7, 26, 18, 48, 4.95, 9.45, "ribbon", "B", { ribs: 0.8 }), B(7, 32, 9, 36, 9.45, 13.95, "gold", "B", { ribs: 0.8 }), B(8, 44, 6, 8, 13.95, 15.6, "lamp", "X"),
        S3([[31, 46, 4.95], [31, 50, 4.95], [25, 50, 9.45], [25, 46, 9.45]], 0.3, "zCirc"), S3([[22, 56, 9.45], [22, 60, 9.45], [16, 60, 13.95], [16, 56, 13.95]], 0.3, "zCirc"),
        SH(7, 20, 24, 58, 0.45, 6.45, 19.95, "-x", "glass", "X", { op: 0.25, ribs: 3 }),
        B(8, 6, 22, 11, 0.45, 5.95, "sheet", "D", { fl: 1 })];
      const steps = []; for (let i = 0; i <= 10; i++) { steps.push([[31 - 0.6 * i, 46, 4.97 + 0.45 * i], [31 - 0.6 * i, 50, 4.97 + 0.45 * i]], [[22 - 0.6 * i, 56, 9.47 + 0.45 * i], [22 - 0.6 * i, 60, 9.47 + 0.45 * i]]); }
      v.push(LN(steps));
      const ys = range(20, 74, 6).concat([78]);
      const st = [...grid([7, 16, 25, 31], ys, 0.45, x => x === 7 ? 19.95 : x === 16 ? 14.9 : x === 25 ? 9.83 : 6.45), ...grid([8, 19, 30], [6, 17], 0.45, 5.95)];
      return { v, st };
    }
  });

  I.push({
    id: "tau", name: "Đoàn tàu sách", tag: "Bốn toa sách và một đầu máy dừng ở sân ga",
    story: "Đà Nẵng là ga lớn trên đường sắt Bắc – Nam, nơi tàu dừng trước khi vượt đèo Hải Vân. Phương án là một đoàn tàu sách: đầu máy là phòng đa năng, bốn toa hai tầng mái cong là các khu đọc theo chủ đề, nối nhau bằng ống nối tối màu. Song song với đoàn tàu là \"nhà ga\" dọc phía Trần Phú chứa sảnh, kho và phòng hỗ trợ; giữa tàu và ga là sân ga có mái che.",
    why: [["Ý nghĩa", "Mỗi toa là một chuyến đi vào một chủ đề sách; \"lên tàu đọc sách\" là câu chuyện dễ nhớ cho cả thiếu nhi và người lớn."], ["Hình khối", "Khối chính là đoàn tàu dài, khối phụ là nhà ga và mái sân ga: nhiều khối mà vẫn gọn."], ["Kết cấu", "Mỗi toa là một hộp khung thép 12 × 16 m đứng trên 6 cột, nhịp 12 m, trong toa không có cột."], ["Mô hình", "Năm hộp giống nhau, mái cong bằng bìa uốn, ống nối là khối đen nhỏ."]],
    kc: { he: "Mỗi toa: khung thép 12 × 16 m, 6 cột (4 góc và 2 giữa cạnh dài), dầm sàn nhịp 12 m. Nhà ga: khung bê tông lưới 8 × 8 m.", nhip: "12 m", cx: "Không" },
    qa: [["Toa rộng 12 m có giống toa tàu?", "Không chép đúng tỉ lệ toa tàu; chỉ giữ ý toa nối toa, mái cong, dải cửa sổ ngang và ống nối giữa các toa."], ["Đi từ toa này sang toa kia?", "Qua ống nối ở cả hai tầng, như đi trong tàu thật. Thang bộ và thang máy đặt trong nhà ga."]],
    cut: "5 hộp foam 6 × 8 × 4,5 cm (đầu máy cao 3,5 cm), mái cong: bìa uốn cao 0,9 cm. Ống nối: foam đen 3 × 1 × 4,1 cm. Nhà ga: hộp 4 × 36 × 4,5 cm, mái sân ga: dải bìa 2 cm.",
    main: [[17.9, 9.9, 30.1, 98.1, 0, 12]],
    lab: [[24, 56, 11.25, "Khối chính · Đoàn tàu 4 toa và đầu máy", 1], [24, 18, 9.45, "Đầu máy = phòng đa năng"], [10, 66, 9.45, "Khối phụ · Nhà ga (sảnh, kho, hỗ trợ)", 2], [16, 40, 5.9, "Khối phụ · Mái sân ga", 2]],
    build() {
      const v = [B(18, 10, 12, 16, 0.45, 7.45, "stone", "D", { fl: 1, top: "stoneTop", bands: [5.2] }), B(20, 10.5, 8, 6, 7.45, 9.45, "stone", "X", { top: "stoneTop" }),
        B(6, 14, 8, 14, 0.45, 4.95, "sheet", "D", { top: "grass" }), B(6, 28, 8, 20, 0.45, 4.95, "glass", "A", { op: 0.85 }), B(6, 48, 8, 20, 0.45, 4.95, "sheet", "C"), B(6, 68, 8, 18, 0.45, 4.95, "sheet", "E"),
        B(6, 14, 8, 18, 4.95, 9.45, "sheet", "E", { top: "grass" }), B(6, 32, 8, 14, 4.95, 9.45, "sheet", "C", { top: "grass" }), B(6, 46, 8, 40, 4.95, 9.45, "sheet", "B", { top: "grass" }),
        B(14, 14, 4, 72, 5.6, 5.9, "canopy", "X")];
      const st = [...grid([18, 30], [10, 18, 26], 0.45, 7.45), ...grid([6, 14], range(14, 86, 8), 0.45, 9.45)];
      [[28, "A", "B"], [46, "B", "B"], [64, "B", "B"], [82, "B", "B"]].forEach(([y, z1, z2], k) => {
        const c = k % 2 ? "accessC" : "violet";
        v.push(B(18, y, 12, 16, 0.45, 4.95, c, z1, { ribs: 2, bands: [3.4], top: "sheet" }), B(18, y, 12, 16, 4.95, 9.45, c, z2, { ribs: 2, bands: [7.9], top: "sheet" }), V(18, y, 12, 16, 9.45, 1.8, "y", "sheet"));
        v.push(B(21, y - 2, 6, 2, 0.45, 8.6, "stone", "L", { fl: 2 }));
        st.push(...grid([18, 30], [y, y + 8, y + 16], 0.45, 9.45));
      });
      return { v, st };
    }
  });

  I.push({
    id: "binhphong", name: "Bình phong bên sông", tag: "Bức bình phong dài 60 m che nắng sáng, cổng vòm dẫn vào",
    story: "Trong nhà vườn Huế và đình làng, trước cửa thường có bức bình phong: che tầm nhìn thẳng vào nhà, buộc lối đi rẽ quanh, tạo sự kín đáo. Phương án đặt một bức bình phong cao 11 m, dài 60 m phía bờ sông, có một cổng vòm và các ô cửa nhỏ. Phía sau bình phong là nhà đọc ba tầng yên tĩnh; giữa bình phong và bậc thang là bể nước phản chiếu.",
    why: [["Ý nghĩa", "Bình phong là yếu tố văn hóa đặc trưng của kiến trúc truyền thống miền Trung."], ["Khí hậu và âm thanh", "Bình phong chặn nắng sáng chiếu thẳng và bớt tiếng ồn từ đường Bạch Đằng cho khu đọc."], ["Từ ngoài nhìn vào", "Cổng vòm lớn cho người đi đường thấy một phần nhà đọc phía sau, gợi tò mò bước vào."], ["Mô hình", "Một tấm bìa dày khoét cổng vòm và ô cửa, một hộp nhà phía sau."]],
    kc: { he: "Nhà đọc: khung bê tông lưới 10 × 8 m. Bình phong: tường bê tông dày 1,2 m, giằng về nhà chính bằng các thanh thép mỗi 8 m ở cao độ sàn tầng 3.", nhip: "10 m", cx: "Không" },
    qa: [["Bình phong có che mất nhà?", "Bình phong chỉ cao 11 m, thấp hơn tầng 3; từ xa vẫn thấy tầng 3 kính phía sau. Che bớt phần thân là chủ ý để tạo sự tò mò."], ["Tường cao 11 m đứng một mình có an toàn?", "Tường không đứng một mình mà được giằng vào nhà chính mỗi 8 m bằng thanh thép, như bức bình phong có chân đỡ."]],
    cut: "Nhà: hộp foam 10 × 32 × 4,5 cm, tầng 3 kính 10 × 8 × 2,25 cm. Bình phong: bìa 5 mm 30 × 5,5 cm, khoét cổng vòm rộng 3 cm và 4 ô vuông 1 cm. Bể nước: giấy xanh.",
    main: [[7.9, 15.9, 28.1, 80.1, 0, 14]],
    lab: [[18, 48, 13.95, "Khối chính · Nhà đọc 3 tầng", 1], [32.6, 66, 11.45, "Khối phụ · Bức bình phong", 2], [37, 56, 0.3, "Khối phụ · Bể nước", 2], [32.6, 36, 9, "Cổng vòm"]],
    build() {
      const v = [B(8, 16, 20, 14, 0.45, 4.95, "sheet", "D", { ribs: 2 }), B(8, 30, 20, 12, 0.45, 4.95, "glass", "A", { op: 0.85, ribs: 2 }), B(8, 42, 8, 20, 0.45, 4.95, "sheet", "C", { ribs: 2 }), B(8, 62, 8, 18, 0.45, 4.95, "sheet", "E", { ribs: 2 }), B(16, 42, 12, 38, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }),
        B(8, 16, 20, 48, 4.95, 9.45, "sheet", "B", { ribs: 1.6 }), B(8, 64, 10, 16, 4.95, 9.45, "sheet", "C", { ribs: 1.6 }), B(18, 64, 10, 16, 4.95, 9.45, "sheet", "E", { ribs: 1.6 }),
        B(8, 40, 20, 16, 9.45, 13.95, "glass", "B", { op: 0.85, ribs: 1.5 }),
        AR(32, 18, 78, 0.45, 11.45, 1.2, [{ yc: 36, w: 6, hr: 5.5 }], "lamp", { holes: [50, 56, 62, 68].map(y => ({ y1: y, y2: y + 2, z1: 7, z2: 9 })) }),
        B(34.5, 20, 5, 56, 0, 0.25, "water", "X")];
      const ties = range(22, 78, 8).map(y => seg([28, y, 9.45], [32, y, 9.45]));
      v.push(LN(segsOf(ties)));
      const st = [...grid([8, 18, 28], range(16, 80, 8), 0.45, (x, y) => y >= 40 && y <= 56 ? 13.95 : 9.45), wall(32, 18, 1.2, 60, 0.45, 11.45), ...ties];
      return { v, st };
    }
  });

  I.push({
    id: "dienhai", name: "Thành Điện Hải", tag: "Tường thành gạch có bốn pháo đài góc, vọng lâu đọc sách trên mái",
    story: "Thành Điện Hải trên đường Trần Phú được xây đầu thế kỷ 19 theo kiểu thành Vauban, có các pháo đài góc nhọn, gắn với lịch sử bảo vệ Đà Nẵng. Phương án lấy hình ảnh đó: một khối hai tầng tường gạch, bốn góc là bốn pháo đài nhọn, mái là vườn cỏ với một vọng lâu kính đọc sách. Phía sông có hào nước và cầu vào cổng thành.",
    why: [["Ý nghĩa", "Kết nối với một di tích lịch sử ngay trên phố Trần Phú, đúng yêu cầu xét yếu tố lịch sử của khu đất."], ["Hình khối", "Mặt bằng pháo đài góc nhọn rất riêng, nhìn từ trên cao hay từ bên kia sông đều nhận ra."], ["Đời sống", "Mái là vườn đi dạo như trên mặt thành; bốn mũi pháo đài là bốn phòng đọc nhỏ nhìn bốn hướng."], ["Kết cấu", "Khung bê tông lưới 10 × 6,5 m; vọng lâu rộng đúng 2 nhịp nên cột chạy thẳng từ móng lên. Mũi pháo đài dùng tường chịu lực."]],
    kc: { he: "Khung bê tông lưới 10 × 6,5 m, vọng lâu rộng đúng 2 nhịp nên cột chạy thẳng từ móng lên. Bốn pháo đài là tường bê tông bọc gạch chịu lực.", nhip: "10 m", cx: "Không" },
    qa: [["Pháo đài nhọn có lãng phí diện tích?", "Mỗi mũi pháo đài 108 m² hai tầng, dùng làm phòng đọc nhỏ hoặc phòng họp có cửa sổ nhìn hai hướng."], ["Có nặng nề, khép kín quá không?", "Tường gạch có các khe cửa đứng, phía sông mở cổng lớn; mái là vườn công cộng có vọng lâu kính nhẹ nhàng."]],
    cut: "Thân: cắt foam theo mẫu hình chữ nhật có 4 mũi kim cương ở góc, xếp 2 lớp mỗi lớp 2,25 cm, dán giấy gạch. Vọng lâu: hộp mica 10 × 6,5 × 2 cm, mái 4 dốc bìa đỏ.",
    main: [[2.9, 15.9, 35.1, 80.1, 0, 9.5]],
    lab: [[19, 28, 9.45, "Khối chính · Tường thành, 4 pháo đài góc", 1], [19, 48, 16.5, "Khối phụ · Vọng lâu đọc sách", 2], [38, 30, 0.3, "Khối phụ · Hào nước", 2], [32, 76, 9.45, "Pháo đài góc"], [29.2, 47, 4, "Cổng thành"]],
    build() {
      const BS = [[[15, 22], [9, 16], [3, 22], [9, 28], [9, 22]], [[23, 22], [29, 16], [35, 22], [29, 28], [29, 22]], [[29, 68], [35, 74], [29, 80], [23, 74], [29, 74]], [[15, 74], [9, 80], [3, 74], [9, 68], [9, 74]]];
      const v = [...BS.map((p, i) => PO(p, 0.45, 9.45, "ribbon", ["D", "A", "E", "C"][i], { fl: 2, top: "grass" })),
        B(9, 22, 20, 14, 0.45, 4.95, "ribbon", "D", { ribs: 3 }), B(9, 36, 20, 10, 0.45, 4.95, "ribbon", "A", { ribs: 3 }), B(9, 46, 20, 28, 0.45, 4.95, "ribbon", "B", { ribs: 3 }),
        B(9, 22, 20, 36, 4.95, 9.45, "ribbon", "B", { ribs: 3, top: "grass" }), B(9, 58, 10, 16, 4.95, 9.45, "ribbon", "C", { ribs: 3, top: "grass" }), B(19, 58, 10, 16, 4.95, 9.45, "ribbon", "E", { ribs: 3, top: "grass" }),
        B(9, 41.5, 20, 13, 9.45, 13.45, "glass", "B", { op: 0.85, ribs: 2 }), H(8.5, 41, 21, 14, 13.45, 16.5, "warn"),
        B(28.8, 45, 0.4, 4, 0.45, 4, "stone", "X"), B(29, 45, 7, 4, 0.3, 0.6, "deck", "X"), B(36, 16, 4, 64, 0, 0.25, "water", "X")];
      const st = grid([9, 19, 29], range(22, 74, 6.5), 0.45, (x, y) => y >= 41.5 && y <= 54.5 ? 13.45 : 9.45);
      for (const p of BS) for (const [x, y] of p.slice(0, 4)) st.push(col(x, y, 0.45, 9.45));
      return { v, st };
    }
  });

  I.push({
    id: "canhdieu", name: "Cánh diều", tag: "Ba mái vỏ yên ngựa như ba cánh diều bay trên thân nhà kính",
    story: "Thả diều trên đồng, trên bãi biển là ký ức tuổi thơ của nhiều thế hệ người Việt. Mái công trình là ba tấm vỏ mỏng hình yên ngựa, mỗi tấm có hai góc thấp tì xuống chân cột và hai góc cao vươn lên như cánh diều đang bay; ba cánh xoay hướng xen kẽ nhau. Bên dưới là thân nhà kính hai tầng; phòng đa năng có một cánh diều con riêng ở đầu Bắc.",
    why: [["Ý nghĩa", "Cánh diều là tuổi thơ và ước mơ bay cao, hợp với một thư viện có khu thiếu nhi."], ["Kết cấu", "Mặt yên ngựa (hyperbolic paraboloid) tạo từ các đường thẳng, vỏ mỏng mà rất cứng; đây là kết cấu vỏ kinh điển."], ["Hình khối", "Ba cánh diều xen kẽ cao thấp tạo nhịp động cho mái, còn thân nhà bên dưới vẫn là hộp vuông vức dễ bố trí."], ["Mô hình", "Mỗi cánh diều là một tấm bìa mỏng bị vặn: hai góc dán thấp, hai góc dán cao."]],
    kc: { he: "Mái: 3 vỏ yên ngựa bằng bê tông lưới thép hoặc khung thép lợp màng, mỗi vỏ tựa trên 2 chân thấp đặt chéo nhau và 1 cột giữa kéo lên từ thân nhà. Thân nhà: khung bê tông lưới 11 × 7,5 m.", nhip: "26 m (vỏ yên ngựa)", cx: "Mép vỏ đua 2 m" },
    qa: [["Mái cong có khó thi công?", "Mặt yên ngựa tạo hoàn toàn bằng các thanh thẳng đặt nghiêng, nên cốp pha hoặc khung thép đều dùng thanh thẳng."], ["Nước mưa thoát thế nào?", "Nước chảy về hai góc thấp, theo ống trong chân cột xuống bể chứa."]],
    cut: "Thân: hộp mica 11 × 30 × 4,5 cm. 3 cánh diều: bìa 0,5 mm 13 × 11 cm, hai góc dán trên que cao 5 cm, hai góc trên que cao 7–8 cm để tấm bìa tự vặn.",
    main: [[5.9, 14.9, 32.1, 80.6, 0, 16]],
    lab: [[24, 26, 15, "Khối chính · 3 cánh diều mái yên ngựa", 1], [32, 36.5, 10.2, "Chân diều (điểm thấp)"], [19, 10, 9, "Khối phụ · Hộp sự kiện, cánh diều con", 2], [32, 26, 4.45, "Khối phụ · Hiên đón", 2]],
    build() {
      const v = [B(8, 18, 22, 12, 0.45, 4.95, "glass", "A", { op: 0.85, ribs: 2.2 }), B(8, 30, 10, 20, 0.45, 4.95, "sheet", "C"), B(8, 50, 10, 16, 0.45, 4.95, "sheet", "E"), B(18, 30, 12, 48, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }), B(8, 66, 10, 12, 0.45, 4.95, "sheet", "B"),
        B(8, 18, 22, 48, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 2 }), B(8, 66, 11, 12, 4.95, 9.45, "sheet", "E"), B(19, 66, 11, 12, 4.95, 9.45, "sheet", "C"),
        B(8, 5, 22, 11, 0.45, 5.95, "sheet", "D", { fl: 1 }), B(30, 22, 4, 8, 0.45, 4.45, "glass", "A", { op: 0.8 })];
      const st = grid([8, 19, 30], range(18, 78, 7.5), 0.45, 9.45);
      const K = [[15, 36.5, [10.2, 15.5, 10.2, 13.5], 25.5], [37, 58.5, [14, 10.2, 15.5, 10.2], 48], [59, 80.5, [10.2, 14.5, 10.2, 13], 70.5]];
      for (const [ya, yb, [a, b, c, d], ym] of K) {
        v.push(S3([[6, ya, a], [32, ya, b], [32, yb, c], [6, yb, d]], 0.35, "ribbon", "X", { top: "lamp" }));
        const lows = [[6, ya, a], [32, ya, b], [32, yb, c], [6, yb, d]].filter(p => p[2] < 11);
        for (const [x, y, z] of lows) { v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, z - 0.35, "ink", "X")); st.push(col(x, y, 0, z - 0.35)); }
        st.push(col(19, ym, 9.45, (a + b + c + d) / 4 - 0.35));
      }
      v.push(S3([[7, 3.5, 6.5], [31, 3.5, 9], [31, 17, 6.5], [7, 17, 8.5]], 0.3, "ribbon", "X", { top: "lamp" }));
      st.push(...grid([8, 19, 30], [5, 16], 0.45, 5.95));
      return { v, st };
    }
  });

  I.push({
    id: "hophop", name: "Hộp lồng hộp", tag: "Một hộp kính lớn, bên trong là những hộp phòng màu",
    story: "Như mở một hộp quà: bên ngoài là một hộp kính mờ lớn 24 × 56 m cao 15 m, bên trong là những hộp phòng màu đặt trên sàn hoặc treo lơ lửng ở các độ cao khác nhau. Giữa các hộp là sàn đọc mở và những khoảng thông tầng. Ban đêm hộp kính sáng lên, bóng các hộp màu in lên lớp vỏ.",
    why: [["Từ ngoài nhìn vào", "Người đi đường thấy cả bên trong: các hộp màu, cầu thang, người đọc, đúng yêu cầu thu hút của thầy."], ["Kết cấu", "Hộp ngoài là khung thép, trong nhà không có cột; dàn mái cao 2 m nhịp 24 m treo sàn tầng 2 và các hộp tầng 3."], ["Linh hoạt", "Các hộp bên trong là kết cấu nhẹ, sau này thay đổi được mà không đụng vào vỏ (mục 5.2)."], ["Mô hình", "Một hộp mica trong suốt và các khối foam màu; nhấc nắp lên là thấy hết."]],
    kc: { he: "Khung thép: cột ở hai mép dài cách 7 m, dàn mái thép cao 2 m nhịp 24 m. Sàn tầng 2 và hai hộp tầng 3 treo bằng thanh thép từ dàn mái.", nhip: "24 m", cx: "Không" },
    qa: [["Sàn treo có rung?", "Thanh treo cách nhau 6 m, sàn liên kết thêm vào cột biên. Đây là giải pháp đã dùng ở nhiều công trình nhịp lớn."], ["Hộp kính lớn có nóng?", "Vỏ dùng tấm polycarbonate mờ hai lớp hoặc kính mờ có lá chắn, ánh sáng tán xạ; khoảng giữa vỏ và các hộp được thông gió."]],
    cut: "Vỏ: hộp mica 12 × 28 × 7,5 cm, không dán nắp. Bên trong: 8 khối foam màu cỡ 3–7 cm; hộp treo dùng chỉ treo vào que ngang trên nắp.",
    roleOf: v => v.c === "glass" || v.z2 - v.z1 < 0.6 ? "m" : "p",
    lab: [[20, 48, 15.45, "Khối chính · Hộp kính lớn", 1], [17, 38, 6.45, "Khối phụ · Hộp phòng đa năng", 2], [18, 59, 13.2, "Khối phụ · Hộp đọc treo", 2], [27.5, 30, 12.45, "Khối phụ · Hộp kho treo", 2], [20, 24, 0.6, "Sàn mở"]],
    build() {
      const v = [B(8, 20, 24, 56, 0.45, 15.45, "glass", "X", { op: 0.25, ribs: 3.5, bands: [4.95, 9.45, 13.45] }),
        B(10, 30, 14, 16, 0.45, 6.45, "warn", "D", { fl: 1 }), B(26, 30, 6, 10, 0.45, 3.95, "gold", "D", { fl: 1 }), B(24, 60, 8, 16, 0.45, 3.95, "violet", "C", { fl: 1 }), B(10, 62, 12, 12, 0.45, 3.95, "accessC", "E", { fl: 1 }),
        B(8, 20, 24, 10, 0.45, 0.6, "sheet", "A", { fl: 1 }), B(8, 46, 24, 30, 0.45, 0.6, "sheet", "B", { fl: 1, footOverride: 1344 - 240 - 224 - 60 - 128 - 144 }),
        B(8, 40, 24, 36, 4.95, 5.45, "sheet", "B", { fl: 1, footOverride: 864 - 90 - 144 }), B(9, 44, 9, 10, 5.45, 8.95, "grass", "E", { fl: 1 }), B(22, 48, 9, 16, 5.45, 8.95, "ribbon", "B", { fl: 1 }),
        B(11, 52, 14, 14, 9.45, 13.2, "accent", "B", { fl: 1 }), B(24, 24, 7, 12, 9.45, 12.45, "violet", "C", { fl: 1 })];
      const st = grid([8, 32], range(20, 76, 7), 0.45, 15.45);
      for (const y of range(20, 76, 7)) st.push(...zig(8, y, 32, y, 13.45, 15.45, 8));
      for (const x of [14, 20, 26]) for (const y of [44, 52, 60, 68]) st.push(seg([x, y, 13.45], [x, y, 5.45]));
      for (const [x, y] of [[13, 54], [23, 64], [26, 26], [29, 34]]) st.push(seg([x, y, 13.45], [x, y, 12.5]));
      return { v, st };
    }
  });

  I.push({
    id: "canhbuom", name: "Mái cánh bướm", tag: "Ba nhà mái chữ V như cánh bướm, gom nước mưa vào bồn",
    story: "Mái cánh bướm là mái hình chữ V: hai mái dốc vào giữa, mép ngoài vểnh lên như đôi cánh. Phương án có ba nhà: nhà đọc lớn ở giữa (khối chính), nhà sự kiện ở Bắc và nhà thiếu nhi, kho ở Nam, cả ba có mái cánh bướm cao thấp khác nhau. Nước mưa dồn vào máng giữa mái, chảy vào một bồn nước kính đặt phía bờ sông.",
    why: [["Khí hậu", "Đà Nẵng mưa rất lớn vào mùa thu và nắng hạn vào mùa hè: mái chữ V gom nước mưa để tưới cây, rửa sân."], ["Ánh sáng", "Mép mái vểnh lên ở hai bên mở ra dải kính cao, ánh sáng vào sâu trong nhà đọc."], ["Hình khối", "Ba đôi cánh cao thấp tạo nhịp; khối chính lớn nhất và cao nhất phía sông."], ["Mô hình", "Mỗi mái là hai khối vát úp vào nhau. Bồn nước là ống mica."]],
    kc: { he: "Khung bê tông 3 hàng cột cách 12 m; hàng giữa đỡ dầm máng ở đáy chữ V, hai hàng biên cao theo độ dốc mái.", nhip: "12 m", cx: "Mái đua 1 m" },
    qa: [["Máng giữa mái có dễ tắc?", "Máng rộng 0,8 m, dốc 1% về phía bồn, có lưới chắn lá và cửa kiểm tra; có tràn khẩn cấp ra hai đầu nhà."], ["Hàng cột giữa có vướng?", "Hàng cột giữa đỡ máng mái, nằm giữa hai dãy kệ sách. Phòng đọc mỗi bên rộng 12 m không cột."]],
    cut: "3 hộp foam (12 × 18, 10 × 9,5, 10 × 9 cm). Mỗi mái: 2 khối vát úp đáy vào nhau, nhà chính cao 0,4 → 3,3 cm. Bồn: ống mica Ø 2,6 cm cao 4,3 cm.",
    main: [[6, 33, 32, 71, 0, 17]],
    lab: [[27, 52, 16, "Khối chính · Nhà đọc mái cánh bướm", 1], [19, 60, 10.2, "Máng nước giữa hai cánh"], [19, 18, 10.5, "Khối phụ · Nhà sự kiện", 2], [19, 83, 13, "Khối phụ · Nhà thiếu nhi, kho", 2], [36, 52, 8.9, "Khối phụ · Bồn nước mưa", 2]],
    build() {
      const v = [B(7, 34, 24, 8, 0.45, 4.95, "sheet", "A", { ribs: 2 }), B(7, 42, 24, 28, 0.45, 4.95, "glass", "B", { op: 0.85, ribs: 2 }), B(7, 34, 24, 36, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 2 }),
        SH(6, 33, 13, 38, 9.45, 10.2, 14.2, "-x", "ribbon", "X", { top: "lamp" }), SH(19, 33, 13, 38, 9.45, 10.2, 16, "+x", "ribbon", "X", { top: "lamp" }),
        B(9, 12, 20, 13, 0.45, 6.45, "sheet", "D", { fl: 1 }), B(9, 25, 20, 6, 0.45, 4.95, "glass", "A", { op: 0.85 }), SH(8, 11, 11, 21, 6.45, 7, 9.5, "-x", "ribbon", "X", { top: "lamp" }), SH(19, 11, 11, 21, 6.45, 7, 10.5, "+x", "ribbon", "X", { top: "lamp" }),
        B(9, 74, 12, 18, 0.45, 4.95, "sheet", "C"), B(21, 74, 8, 18, 0.45, 4.95, "glass", "B", { op: 0.85 }), B(9, 74, 14, 18, 4.95, 9.45, "sheet", "E"), B(23, 74, 6, 18, 4.95, 9.45, "sheet", "C"),
        SH(8, 73, 11, 20, 9.45, 10, 12.3, "-x", "ribbon", "X", { top: "lamp" }), SH(19, 73, 11, 20, 9.45, 10, 13, "+x", "ribbon", "X", { top: "lamp" }),
        B(15, 31, 8, 3, 0.45, 4.95, "glass", "L", { op: 0.7 }), B(15, 70, 8, 4, 0.45, 9.45, "glass", "L", { op: 0.7 }),
        PO(circ(36, 52, 2.6, 20), 0, 8.5, "water", "X", { op: 0.85 }), PO(circ(36, 52, 2.9, 20), 8.5, 8.9, "stone", "X"), LN([[[19, 52, 10.2], [33.4, 52, 8.6]]])];
      const st = [...grid([7, 19, 31], range(34, 70, 6), 0.45, x => x === 7 ? 13.9 : x === 19 ? 10.2 : 15.7), ...grid([9, 19, 29], [12, 25, 31], 0.45, 6.45), ...grid([9, 19, 29], [74, 83, 92], 0.45, 9.45)];
      return { v, st };
    }
  });

  I.push({
    id: "giaolo", name: "Giao lộ chữ thập", tag: "Thanh dọc phố và thanh ngang vươn ra sông bắt chéo nhau",
    story: "Khu đất là nơi giao nhau của hai trục: trục phố Bạch Đằng chạy dọc sông và trục từ phố Trần Phú đi ra sông. Phương án là hai thanh nhà bắt chéo: thanh dọc hai tầng chạy theo phố, thanh ngang một tầng đặt trên mái, vươn 11 m ra phía sông và 7 m về phía Trần Phú. Đầu thanh ngang là phòng đọc treo trên bậc thang, nhìn thẳng ra sông Hàn.",
    why: [["Ý nghĩa", "Thư viện là nơi các con đường tri thức giao nhau; hình chữ thập đọc được ngay trên mặt bằng và trên hình khối."], ["Tầm nhìn", "Đầu thanh ngang nhìn thẳng ra sông và cầu Rồng; từ dưới phố nhìn lên thấy người đang đọc."], ["Kết cấu", "Thanh ngang là dàn thép cao một tầng, neo vào hai lõi thang: đúng nguyên tắc đua xa thì phải có dàn."], ["Mô hình", "Hai hộp dài đặt chéo nhau và hai que vuông làm lõi."]],
    kc: { he: "Thanh dọc: khung bê tông lưới 8 × 7 m. Thanh ngang: dàn thép cao 4,5 m ở hai mặt dọc, tựa trên hàng cột x = 10 và 26 m, neo vào hai lõi bê tông.", nhip: "16 m (dàn qua thanh dọc)", cx: "11 m về phía sông, 7 m về phía Trần Phú (dàn cao 4,5 m)" },
    qa: [["Đua 12 m có an toàn?", "Phần đua là dàn thép cao 4,5 m, tỉ lệ đua/chiều cao khoảng 2,4. Đầu đua phía Tây 7 m giúp cân bằng, phần còn lại neo vào hai lõi thang."], ["Thanh ngang có đè lên khu đọc?", "Tải của thanh ngang đi vào hai hàng cột và hai lõi thang, không đặt lên sàn mái."]],
    cut: "Thanh dọc: foam 8 × 35 × 4,5 cm. Thanh ngang: foam 8 × 17 × 2,25 cm đặt chéo trên mái, kẻ đường chéo dàn hai mặt. Lõi: que vuông 1,5 cm cao 7,5 cm.",
    main: [[2.9, 15.9, 37.1, 86.1, 0, 16]], roleOf: v => v.c === "stone" ? "p" : null,
    lab: [[20, 48, 13.95, "Khối chính · Hai thanh chữ thập", 1], [35, 48, 13.95, "Thanh ngang vươn ra sông 11 m"], [18, 8, 6.45, "Khối phụ · Hộp sự kiện", 2], [11.5, 43, 15.45, "Khối phụ · Hai lõi thang neo dàn", 2]],
    build() {
      const v = [B(10, 16, 16, 12, 0.45, 4.95, "glass", "A", { op: 0.85 }), B(10, 28, 8, 24, 0.45, 4.95, "sheet", "C"), B(18, 28, 8, 24, 0.45, 4.95, "glass", "B", { op: 0.85 }), B(10, 52, 8, 14, 0.45, 4.95, "sheet", "D"), B(18, 52, 8, 14, 0.45, 4.95, "sheet", "E"), B(10, 66, 16, 20, 0.45, 4.95, "glass", "B", { op: 0.85 }),
        B(10, 16, 16, 54, 4.95, 9.45, "sheet", "B", { ribs: 2 }), B(10, 70, 16, 8, 4.95, 9.45, "sheet", "C"), B(10, 78, 16, 8, 4.95, 9.45, "sheet", "E"),
        B(3, 40, 34, 16, 9.45, 13.95, "ribbon", "B", { ribs: 2 }),
        B(8, 3, 20, 10, 0.45, 6.45, "stone", "D", { fl: 1, top: "stoneTop" }),
        B(10, 40, 3, 6, 0.45, 15.45, "stone", "X", { top: "stoneTop" }), B(23, 50, 3, 6, 0.45, 15.45, "stone", "X", { top: "stoneTop" })];
      const tr = [...zig(3, 40, 37, 40, 9.45, 13.95, 9), ...zig(3, 56, 37, 56, 9.45, 13.95, 9)];
      v.push(LN(segsOf(tr)));
      const st = [...grid([10, 18, 26], range(16, 86, 7), 0.45, (x, y) => y >= 40 && y <= 56 && x !== 18 ? 13.95 : 9.45), ...tr, wall(10, 40, 3, 6, 0.45, 15.45), wall(23, 50, 3, 6, 0.45, 15.45), ...grid([8, 18, 28], [3, 13], 0.45, 6.45)];
      return { v, st };
    }
  });

  I.push({
    id: "mucluc", name: "Tủ mục lục", tag: "Tủ gỗ mục lục thư viện, ngăn kéo kéo ra làm góc đọc",
    story: "Trước thời máy tính, mọi thư viện đều có tủ mục lục: những ngăn kéo gỗ nhỏ có tay nắm đồng, mỗi ngăn chứa thẻ của hàng trăm cuốn sách. Phương án là một chiếc tủ gỗ lớn ba tầng, mặt tủ chia ô như ngăn kéo; một số ngăn được kéo ra 1–4 m về phía sông và phía Trần Phú, mỗi ngăn là một góc đọc có kính ba mặt. Tay nắm đồng trên mỗi ngăn là chi tiết nhận diện.",
    why: [["Ý nghĩa", "Tủ mục lục là đồ vật biểu tượng nhất của thư viện, ai từng đến thư viện đều nhận ra."], ["Từ ngoài nhìn vào", "Mỗi ngăn kéo ra là một hộp kính có người ngồi đọc, nhìn từ phố thấy rõ."], ["Kết cấu", "Ngăn kéo đua tối đa 4 m bằng khung thép hàn vào dầm sàn, trong giới hạn của dầm thường. Tủ là khung bê tông lưới 8 × 7 m."], ["Mô hình", "Một hộp lớn kẻ ô và những hộp nhỏ cắm ra với độ dài khác nhau."]],
    kc: { he: "Khung bê tông lưới 8 × 7 m (ô ngăn kéo rộng 7 m). Mỗi ngăn kéo là hộp khung thép công xôn từ dầm sàn, dài nhất 4 m.", nhip: "8 m", cx: "4 m (ngăn kéo)" },
    qa: [["Ngăn kéo có bị nóng?", "Ngăn kéo phía Đông nhận nắng sáng, có kính Low-E và mái đua; ngăn phía Tây ngắn hơn, có lam đứng chắn nắng chiều."], ["Có phải chỉ để trang trí?", "Mỗi ngăn kéo là một phòng đọc nhỏ 6–26 m² cho 2–6 người, tính vào diện tích đọc linh hoạt."]],
    cut: "Tủ: hộp foam vân gỗ 8 × 28 × 6,75 cm, kẻ lưới ô 3,5 × 2,25 cm. Ngăn kéo: hộp foam vàng nhạt rộng 3,2 cm, dài 0,5–2 cm, cao 2 cm. Tay nắm: que đồng hoặc giấy vàng.",
    main: [[10.9, 19.9, 27.1, 76.1, 0, 14]],
    lab: [[19, 48, 13.95, "Khối chính · Tủ mục lục gỗ", 1], [30, 51, 7.2, "Khối phụ · Ngăn kéo phía sông (góc đọc)", 2], [8, 41, 9.15, "Khối phụ · Ngăn kéo phía Trần Phú", 2], [27.3, 37, 3, "Tay nắm đồng"]],
    build() {
      const v = [B(11, 20, 16, 16, 0.45, 4.95, "deck", "D", { ribs: 1 }), B(11, 36, 16, 8, 0.45, 4.95, "deck", "A", { ribs: 1 }), B(11, 44, 8, 16, 0.45, 4.95, "deck", "C", { ribs: 1 }), B(11, 60, 8, 16, 0.45, 4.95, "deck", "E", { ribs: 1 }), B(19, 44, 8, 32, 0.45, 4.95, "deck", "B", { ribs: 1 }),
        B(11, 20, 16, 56, 4.95, 9.45, "deck", "B", { ribs: 1 }),
        B(11, 28, 16, 12, 9.45, 13.95, "deck", "C", { ribs: 1 }), B(11, 40, 16, 12, 9.45, 13.95, "deck", "E", { ribs: 1 }), B(11, 52, 16, 16, 9.45, 13.95, "deck", "B", { ribs: 1 })];
      const E1 = [0, 2, 3.5, 0, 1.5, 4, 0, 2.5], E2 = [3, 0, 1.5, 4, 0, 2, 3.5, 0], W2 = [2, 0, 1.5, 0, 2.5, 0, 1, 0];
      const zT1 = ["D", "D", "A", "B", "B", "B", "B", "B"];
      const handle = (x, y, z) => v.push(B(x, y - 1, 0.3, 2, z - 0.15, z + 0.15, "gold", "X"));
      for (let i = 0; i < 8; i++) {
        const y = 20 + 7 * i, yc = y + 3.5;
        if (E1[i]) { v.push(B(27, y + 0.3, E1[i], 6.4, 0.75, 4.65, "lamp", zT1[i], { fl: 1, top: "sheet" })); handle(27 + E1[i], yc, 2.7); } else handle(27, yc, 2.7);
        if (E2[i]) { v.push(B(27, y + 0.3, E2[i], 6.4, 5.25, 9.15, "lamp", "B", { fl: 1, top: "sheet" })); handle(27 + E2[i], yc, 7.2); } else handle(27, yc, 7.2);
        if (W2[i]) { v.push(B(11 - W2[i], y + 0.3, W2[i], 6.4, 5.25, 9.15, "lamp", "B", { fl: 1, top: "sheet" })); handle(10.7 - W2[i], yc, 7.2); } else handle(10.7, yc, 7.2);
        if (y >= 28 && y < 68) handle(27, yc, 11.7);
      }
      const st = grid([11, 19, 27], range(20, 76, 7), 0.45, (x, y) => y >= 28 && y <= 68 ? 13.95 : 9.45);
      return { v, st };
    }
  });

  I.push({
    id: "khungthep", name: "Khung thép lộ", tag: "Kết cấu và ống kỹ thuật đưa ra ngoài, bên trong là sàn trống",
    story: "Trung tâm Pompidou (Paris, Renzo Piano và Richard Rogers, 1977) đưa toàn bộ khung thép, giằng chéo và ống kỹ thuật ra ngoài vỏ để bên trong là những sàn trống hoàn toàn; ống thang cuốn chạy chéo trên mặt tiền thành một con phố treo. Phương án là một hộp kính ba tầng trong khung thép lộ cách mặt kính 2 m; mặt sông có ống thang cuốn chéo từ quảng trường lên sân thượng, mặt Trần Phú là các ống kỹ thuật sơn màu.",
    why: [["Từ ngoài nhìn vào", "Ống thang cuốn chéo có người lên xuống là hình ảnh sống động nhất có thể có ở mặt tiền."], ["Kết cấu là ý tưởng", "Khung, giằng chéo, dàn sàn đều lộ ra; thầy hỏi \"đỡ thế nào\" thì câu trả lời nằm ngay trên mặt đứng."], ["Linh hoạt", "Sàn trong nhà nhịp 20 m không cột, thay đổi bố trí tự do (mục 5.2)."], ["Mô hình", "Hộp mica và que balsa làm khung, ống hút làm ống kỹ thuật màu."]],
    kc: { he: "Cột thép ở hai mép nhà và một lớp khung ngoài cách 2 m có giằng chéo chữ X. Dàn sàn thép cao 2 m nhịp 20 m, trong nhà không cột.", nhip: "20 m", cx: "Ống thang cuốn treo ngoài khung" },
    qa: [["Khác gì ý tưởng lưới kim cương (Seattle)?", "Seattle là lớp vỏ lưới chéo bọc các khối lệch nhau; ở đây là khung trực giao lộ ra ngoài, thang cuốn và ống kỹ thuật làm thành mặt tiền."], ["Thép lộ ngoài trời có bị gỉ gần sông?", "Dùng thép mạ kẽm nhúng nóng và sơn phủ chịu môi trường biển, kiểm tra định kỳ; chi tiết có thể thay từng phần."]],
    cut: "Hộp mica 10 × 23 × 6,75 cm. Khung: que balsa 2 mm, cột cao 7,6 cm, giằng chéo chữ X mỗi ô. Ống thang cuốn: ống mica dẹt 1,3 × 1,3 cm đặt chéo. Ống kỹ thuật: ống hút màu.",
    main: [[7.5, 23.5, 32.5, 70.5, 0, 16]],
    lab: [[20, 47, 13.95, "Khối chính · Hộp kính 3 tầng trong khung thép", 1], [33.9, 52, 11, "Khối phụ · Ống thang cuốn chéo", 2], [6.9, 40, 15.2, "Khối phụ · Ống kỹ thuật màu", 2], [32, 66, 7, "Giằng chéo chữ X"]],
    build() {
      const v = [B(10, 24, 20, 12, 0.45, 4.95, "glass", "D", { op: 0.85, ribs: 2 }), B(10, 36, 20, 10, 0.45, 4.95, "glass", "A", { op: 0.85, ribs: 2 }), B(10, 46, 10, 12, 0.45, 4.95, "glass", "C", { op: 0.85 }), B(10, 58, 10, 12, 0.45, 4.95, "glass", "E", { op: 0.85 }), B(20, 46, 10, 24, 0.45, 4.95, "glass", "B", { op: 0.85 }),
        B(10, 24, 20, 46, 4.95, 9.45, "glass", "B", { op: 0.85, ribs: 2 }), B(10, 24, 20, 26, 9.45, 13.95, "glass", "B", { op: 0.85, ribs: 2 }), B(10, 50, 10, 20, 9.45, 13.95, "glass", "C", { op: 0.85 }), B(20, 50, 10, 20, 9.45, 13.95, "glass", "E", { op: 0.85 })];
      const ys = [24, 31.67, 39.33, 47, 54.67, 62.33, 70];
      for (const x of [8, 32]) for (const y of ys) v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, 15.2, "sheet", "X"));
      const fr = [];
      for (const z of [4.95, 9.45, 13.95, 15.2]) for (const x of [8, 32]) fr.push([[x, 24, z], [x, 70, z]]);
      for (const z of [4.95, 9.45, 13.95]) for (const y of ys) fr.push([[8, y, z], [10, y, z]], [[30, y, z], [32, y, z]]);
      for (const x of [8, 32]) for (let i = 0; i < 6; i++) for (const [za, zb] of [[0.45, 4.95], [4.95, 9.45], [9.45, 13.95]]) fr.push([[x, ys[i], za], [x, ys[i + 1], zb]], [[x, ys[i + 1], za], [x, ys[i], zb]]);
      v.push(LN(fr));
      v.push(S3([[32.6, 26, 3.2], [35.2, 26, 3.2], [35.2, 68, 16.7], [32.6, 68, 16.7]], 2.7, "glass", "X", { op: 0.6 }), LN([[[33.9, 26, 0.6], [33.9, 68, 14.1]]]));
      const pc = ["accessC", "grass", "gold", "warn"];
      for (let i = 0; i < 8; i++) v.push(B(6.6, 26 + 5.6 * i, 0.7, 0.7, 0.45, 15.2, pc[i % 4], "X"));
      v.push(B(6.6, 25, 0.7, 46, 14.5, 15.2, "accessC", "X"));
      const st = [...grid([10, 30], ys, 0.45, 13.95), ...grid([8, 32], ys, 0, 15.2), ...fr.map(([a, b]) => seg(a, b))];
      for (const y of ys) for (const z of [4.95, 9.45, 13.95]) st.push(...zig(10, y, 30, y, z - 1.6, z - 0.1, 6));
      return { v, st };
    }
  });

  I.forEach(i => { i.batch = 2; i.nw = 1; });
  G.ideas.push(...I);
})(window.G3);
