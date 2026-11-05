
/* ================= Đợt 6: 2–3 tầng theo ảnh mẫu 6–9 (hai hộp lệch, sàn đua trên tầng kính, thanh nằm trên hai thanh thấp, hai chữ L xoay) ================= */
(function (G) {
  const { B, col } = G.K;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I8 = G.ideas8 = G.ideas8 || [];
  const Z = k => 0.45 + 4.5 * k;
  const FD = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khối đọc
  const FS = { N: "dac", E: "lam", S: "dua", W: "dac" }; // khối kín
  const FG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // tầng kính, hộp kính
  // một tầng của một khối [x, y, rộng, sâu] ở tầng k
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // cột quanh chu vi khối, khoảng cách ≤ step, thẳng từ móng lên đỉnh
  function perim(x, y, w, d, z2, step = 8) {
    const o = [], nx = Math.max(1, Math.ceil(w / step)), ny = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= nx; i++) for (const yy of [y, y + d]) o.push(col(x + w * i / nx, yy, 0, z2));
    for (let j = 1; j < ny; j++) for (const xx of [x, x + w]) o.push(col(xx, y + d * j / ny, 0, z2));
    return o;
  }
  // cột chống nhìn thấy (0,6 × 0,6 m) dưới phần đua, có trong kết cấu
  const prop = (v, st, x, y, z2) => { v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, z2, "sheet", "X")); st.push(col(x, y, 0, z2)); };
  // tường thấp bao sân đọc ngoài trời
  const lowWall = (x, y, w, d, z1 = 0.45, z2 = 2.05) => B(x, y, w, d, z1, z2, "sheet", "X");

  /* ---------- 17.6: hai hộp lệch nối bằng dải kính, sân đọc tường thấp ---------- */
  I8.push({
    id: "an6", fam: "anh", code: "17.6", from: "ảnh 6", name: "Hai hộp lệch, dải kính giữa, sân đọc tường thấp", rule: "Lệch có kiểm soát, đặc – rỗng",
    tag: "Hai hộp trắng hai tầng lệch nhau về hai phía, nối bằng một dải kính; bên sông là sân đọc ngoài trời bao tường thấp",
    story: "Lấy từ ảnh 6: mô hình trắng có hai hộp lệch nhau, giữa là một dải kính dài, phía trước là sân đọc ngoài trời có tường thấp bao quanh. Ở đây hộp Bắc lệch về phía sông, ôm phòng đa năng và khu sự kiện; hộp Nam lệch về phía Trần Phú, ôm kho và khu đọc. Dải kính hai tầng nối hai hộp là sảnh chính. Góc giữa hộp Nam và bậc thang Bạch Đằng thành sân đọc ngoài trời, tường cao 1,6 m che gió và tiếng xe.",
    why: [W("Quy luật hình khối", "Hai hộp cùng chiều cao, cùng màu, lệch nhau 8 m theo phương ngang, nối bằng một dải kính thấp hơn về cảm giác vì trong suốt. Nhìn từ sông thấy rõ nhịp đặc – trong – đặc; tường thấp của sân đọc kéo đường nằm ngang xuống sát đất."),
      W("Khối chính – khối phụ", "Khối chính là hai hộp và dải kính nối, hai tầng, cao +9,45, chiếm gần hết sàn. Khối phụ là nhà tiếp nhận sách một tầng màu đá ở góc Tây Nam và sân đọc tường thấp, đều thấp hơn một nửa."),
      W("Nắng và chói", "Mặt Trần Phú (nhìn Tây Tây Nam, 250°) của hộp Nam đặc, chặn nắng chiều mùa đông. Mặt sông (Đông Đông Bắc, 70°) có lớp che nắng sáng. Dải kính nằm khuất giữa hai hộp nên ít nắng trực tiếp; đầu Bắc (340°) lấy sáng tán xạ cho phòng đọc tầng 2."),
      W("Gió và mưa", "Sân đọc mở về phía Nam đón gió Đông Nam mùa hè. Gió mùa đông kèm mưa đập vào mặt sông thì hộp Bắc chắn, sân đọc nằm sau tường thấp và trong bóng gió của hộp Bắc."),
      W("Công năng", "Hộp Bắc tầng 1: phòng đa năng cao hai tầng, phòng chuyên đề, cà phê, trưng bày, vệ sinh; tầng 2: đọc mở. Dải kính: sảnh, quầy thông tin, gửi đồ, mượn trả. Hộp Nam tầng 1: kho và nghiệp vụ sát lối Tây, văn phòng, thiếu nhi mở ra sân; tầng 2: đọc yên tĩnh, học nhóm, tra cứu số.")],
    kc: { he: "Khung bê tông lưới 6–8 m, cột thẳng từ móng lên mái. Phòng đa năng 18 × 12 m cao hai tầng, dầm mái nhịp 12 m, không cột giữa. Dải kính là khung thép nhẹ gác giữa hai hộp.", nhip: "12 m (phòng đa năng)", cx: "Không có phần đua" },
    qa: [["Dải kính nối hai hộp có tự đứng được không?", "Dải kính có cột riêng ở bốn góc và giữa hai cạnh dài, nhịp 12–14 m giữa hai hộp. Không có phần nào đua, tầng 2 của dải kính tựa thẳng lên tầng 1."],
      ["Sân đọc ngoài trời có ồn không?", "Tường thấp 1,6 m chặn tiếng xe trên Bạch Đằng ở tầm ngồi đọc; sân nằm xa phòng đa năng vì cách nhau cả dải kính và hộp Nam."]],
    cut: "Hai hộp: foam trắng 12 × 12 × 4,5 cm và 12 × 15 × 4,5 cm, lệch nhau 4 cm. Dải kính: mica 7 × 6 × 4,5 cm. Tường sân đọc: bìa trắng dày 1,5 mm cao 0,8 cm. Nhà tiếp nhận: foam xám 4 × 4 × 2,25 cm.",
    ngoaigio: "Ngoài giờ, khách sự kiện vào thẳng hộp Bắc từ quảng trường phía Bắc, dùng phòng đa năng, phòng chuyên đề, cà phê, trưng bày và cụm vệ sinh ngay trong hộp Bắc. Đường khóa là vách cửa kính giữa hộp Bắc và dải kính sảnh: khóa lại thì khu đọc, kho tách hẳn. Hộp Bắc có lối ra riêng về quảng trường và về phía sông nên khóa vách này không chặn đường thoát nạn của khu sự kiện, còn khu đọc thoát qua sảnh và hộp Nam.",
    roleOf: () => "p",
    lab: [[26, 30, 9.45, "Khối chính · Hai hộp lệch và dải kính nối", 1], [21, 44, 9.45, "Dải kính sảnh"], [10, 84, 4.95, "Khối phụ · Nhà tiếp nhận sách", 2], [35, 64, 2.05, "Khối phụ · Sân đọc tường thấp", 2], [23, 20, 9.45, "Phòng đa năng cao hai tầng"]],
    build() {
      const v = [], st = [];
      // hộp Bắc (lệch về phía sông): phòng đa năng cao hai tầng + khu sự kiện, tầng 2 đọc mở
      v.push(B(14, 14, 18, 12, Z(0), Z(2), "sheet", "D", { fa: FS, fl: 1, ...M }),
        fl(32, 14, 6, 12, 0, "sheet", "D", FS, M), fl(32, 14, 6, 12, 1, "sheet", "D", FD, M),
        fl(14, 26, 18, 12, 0, "sheet", "A", FD, M), fl(32, 26, 6, 12, 0, "sheet", "E", FS, M), fl(14, 26, 24, 12, 1, "sheet", "B", FD, M));
      // dải kính nối: sảnh tầng 1, đọc tầng 2
      v.push(fl(14, 38, 14, 12, 0, "glass", "A", FG, M), fl(14, 38, 14, 12, 1, "glass", "B", FG, M));
      // hộp Nam (lệch về phía Trần Phú): kho, văn phòng, thiếu nhi; tầng 2 đọc yên tĩnh
      v.push(fl(6, 50, 11, 30, 0, "sheet", "C", FS, M), fl(17, 50, 13, 14, 0, "sheet", "E", FS, M), fl(17, 64, 13, 16, 0, "sheet", "B", FD, M),
        fl(6, 50, 6, 12, 1, "sheet", "E", FS, M), fl(12, 50, 18, 12, 1, "sheet", "B", FD, M), fl(6, 62, 24, 18, 1, "sheet", "B", FD, M));
      // khối phụ: nhà tiếp nhận sách ở góc Tây Nam, sát lối Tây và chỗ giao nhận
      v.push(fl(6, 80, 8, 8, 0, "stone", "C", FS, { top: "stoneTop" }));
      // sân đọc ngoài trời bao tường thấp, nhìn ra sông
      v.push(lowWall(30, 52, 10, 0.3), lowWall(39.7, 52, 0.3, 24), lowWall(30, 75.7, 10, 0.3), B(30.3, 52.3, 9.4, 23.4, 0, 0.3, "deck", "X"));
      st.push(...perim(14, 14, 24, 24, Z(2)), ...perim(14, 38, 14, 12, Z(2), 7), ...perim(6, 50, 24, 30, Z(2)), ...perim(6, 80, 8, 8, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.7: sàn tầng 2 đua trên tầng kính, bậc thềm xuống sân mái tường thấp ---------- */
  I8.push({
    id: "an7", fam: "anh", code: "17.7", from: "ảnh 7", name: "Sàn đọc đua trên tầng kính, bậc xuống sân mái", rule: "Nặng trên – nhẹ dưới, bậc thềm",
    tag: "Tầng 2 đặc, rộng hơn tầng 1 kính lùi vào 4 m; đầu Nam bậc xuống một khối thấp có sân mái bao tường",
    story: "Lấy từ ảnh 7: mặt trước mô hình trắng có tầng trên đặc đua ra trên tầng dưới bằng kính, phía bên là các bậc thềm đi xuống một sân mái có tường thấp. Ở đây thanh đọc dài hai tầng chạy dọc khu đất; tầng 1 bằng kính lùi khỏi mặt sông 4 m thành hiên che mưa, tầng 2 đặc phủ lên trên. Đầu Bắc là phòng đa năng cao 7 m; đầu Nam thanh hạ xuống một khối một tầng có sân mái bao tường, rồi xuống sân đất.",
    why: [W("Quy luật hình khối", "Tương phản nặng – nhẹ: khối trắng đặc nằm trên tầng kính lùi sâu nên trông như nổi. Ba bậc cao độ +9,45 → +7,45 → +4,95 → mặt đất tạo nhịp đi xuống ở hai đầu."),
      W("Khối chính – khối phụ", "Khối chính là thanh đọc hai tầng cùng phòng đa năng, chiếm hơn 80% sàn. Khối phụ là khối sân mái phía Nam và khối chuyên đề, vệ sinh cạnh phòng đa năng, đều một tầng, màu đá."),
      W("Nắng và chói", "Tầng 1 kính lùi 4 m dưới sàn đua nên mặt sông (70°) không bị nắng sáng chiếu thẳng vào chỗ đọc. Tầng 2 mặt Trần Phú (250°) đặc. Đầu Nam (160°) được khối thấp và sân mái che bớt nắng trưa."),
      W("Gió và mưa", "Hiên sâu 4 m dọc mặt sông che mưa tạt gió mùa Đông Bắc cho lối vào phía sông. Gió Đông Nam mùa hè đi qua sân mái và sân đất ở đầu Nam vào sảnh."),
      W("Công năng", "Tầng 1: phòng đa năng ở đầu Bắc cạnh quảng trường, sảnh, cà phê, trưng bày ở tầng kính; kho và nghiệp vụ sát lối Tây; thiếu nhi nhìn ra sông. Tầng 2: toàn bộ khu đọc. Khối Nam: văn phòng, phòng nhân viên, kỹ thuật, vệ sinh; mái là sân đọc ngoài trời.")],
    kc: { he: "Khung bê tông lưới 6–8 m. Sàn tầng 2 đua 4 m về phía sông bằng dầm công xôn thường; ở góc Đông Nam, chỗ hai phía đua gặp nhau, có thêm hàng cột mảnh dọc mép sông. Phòng đa năng 20 × 14 m, dầm mái nhịp 14 m.", nhip: "14 m (phòng đa năng)", cx: "4 m dọc mặt sông, có hàng cột mảnh ở mép" },
    qa: [["Tầng 2 đua ra 4 m có cần cột không?", "4 m là mức dầm công xôn bê tông làm được. Dọc mép sông vẫn đặt một hàng cột mảnh cách nhau 12 m; ở góc Đông Nam, nơi sàn đua cả hai phía, có cột để không điểm nào cách chỗ tựa quá 4 m."],
      ["Sân mái khối Nam có thấm không?", "Sân mái có lớp chống thấm và lát gỗ trên đế, dốc 1–2% về rãnh sát tường thấp; tường cao 1,1 m làm lan can."]],
    cut: "Tầng 2: foam trắng 14 × 22 × 2,25 cm. Tầng 1 kính: mica 12 × 20 × 2,25 cm đặt lùi 2 cm khỏi mép sông. Phòng đa năng: foam 10 × 7 × 3,5 cm. Khối Nam: foam xám 11 × 8 × 2,25 cm, tường sân mái bìa 0,5 cm. Cột mép: que tre 2 mm.",
    ngoaigio: "Phòng đa năng và phòng chuyên đề có lối riêng từ quảng trường phía Bắc; cà phê và trưng bày nằm ngay đầu Bắc của tầng kính, cạnh phòng đa năng, có cụm vệ sinh trong khối nhỏ cạnh phòng. Đường khóa là vách kính ngang tầng 1 sau khu trưng bày và cửa thang lên tầng 2: khóa lại thì khu đọc, kho, khu thiếu nhi tách khỏi khu sự kiện. Khu sự kiện có cửa thoát ra quảng trường và ra hiên phía sông nên khóa vách không cắt tuyến thoát nạn.",
    roleOf: () => "p",
    lab: [[24, 46, 9.45, "Khối chính · Sàn đọc đua trên tầng kính", 1], [19, 20, 7.45, "Phòng đa năng"], [19, 78, 4.95, "Khối phụ · Khối Nam có sân mái tường thấp", 2], [34, 20, 4.95, "Khối phụ · Chuyên đề, vệ sinh", 2], [36, 40, 2.4, "Hiên kính lùi 4 m"]],
    build() {
      const v = [], st = [];
      // phòng đa năng (khối chính, cao 7 m, mái cỏ)
      v.push(B(10, 14, 20, 14, 0.45, 7.45, "sheet", "D", { fa: FS, fl: 1, top: "grass", ...M }));
      // khối phụ cạnh phòng đa năng: chuyên đề, vệ sinh ngoài giờ
      v.push(fl(30, 14, 8, 9, 0, "stone", "D", FS, { top: "stoneTop" }), fl(30, 23, 8, 5, 0, "stone", "E", FS, { top: "stoneTop" }));
      // tầng 1 kính lùi 4 m khỏi mép sông
      v.push(fl(10, 28, 24, 14, 0, "glass", "A", FG, M), fl(10, 42, 12, 26, 0, "sheet", "C", FS, M), fl(22, 42, 12, 26, 0, "glass", "B", FG, M));
      // tầng 2 đặc, đua 4 m về phía sông và 4 m về phía Nam
      v.push(fl(10, 28, 28, 44, 1, "sheet", "B", FD, M));
      // khối Nam một tầng, mái là sân đọc bao tường thấp
      v.push(fl(8, 68, 22, 16, 0, "stone", "E", FS, { top: "deck" }));
      v.push(lowWall(8, 83.75, 22, 0.25, Z(1), Z(1) + 1.1), lowWall(8, 72, 0.25, 11.75, Z(1), Z(1) + 1.1), lowWall(29.75, 72, 0.25, 11.75, Z(1), Z(1) + 1.1));
      // hàng cột mảnh dọc mép sông dưới sàn đua
      for (const y of [33, 45, 57, 71.4]) prop(v, st, 37.4, y, Z(1));
      st.push(...perim(10, 14, 20, 14, 7.45, 7), ...perim(30, 14, 8, 14, Z(1)), ...perim(10, 28, 24, 40, Z(2)), ...perim(8, 68, 22, 16, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.8: thanh đọc hai tầng nằm trên hai thanh thấp, lõi thang giữa sân ---------- */
  I8.push({
    id: "an8", fam: "anh", code: "17.8", from: "ảnh 8", name: "Thanh đọc gác lên hai thanh thấp, lõi thang giữa sân", rule: "Chồng ngang, gác cầu",
    tag: "Hai thanh một tầng chạy song song hai bên một sân hẹp; thanh đọc hai tầng gác ngang lên cả hai, có hai lõi thang đứng giữa sân; đầu Bắc là khối hội trường",
    story: "Lấy từ ảnh 8: mô hình trắng có một thanh dài nâng cao, gác qua các khối thấp, có lõi đứng và một khối hội trường lớn ở đầu. Ở đây hai thanh thấp chạy dọc khu đất, một bên sát Trần Phú, một bên nhìn ra sông, kẹp giữa một sân hẹp 8 m. Thanh đọc hai tầng gác lên mái cả hai thanh thấp, hai lõi thang đứng giữa sân. Khối hội trường đứng riêng ở đầu Bắc cạnh quảng trường.",
    why: [W("Quy luật hình khối", "Chồng ngang: khối trên rộng hơn khoảng hở bên dưới, gác hai đầu lên hai thanh thấp như cây cầu. Hai lõi thang đặc đứng giữa sân làm điểm nhấn đứng, cắt các đường nằm ngang."),
      W("Khối chính – khối phụ", "Khối chính là thanh đọc hai tầng cao +13,95 cùng khối hội trường ở đầu Bắc. Khối phụ là hai thanh thấp một tầng màu đá, cao +4,95, chưa bằng một nửa."),
      W("Nắng và chói", "Thanh thấp phía Trần Phú (250°) đặc, làm lưng che nắng chiều. Thanh đọc nằm cao, mặt sông (70°) có lớp che nắng sáng, đầu Bắc (340°) lấy sáng tán xạ. Sân hẹp giữa luôn có bóng của thanh đọc phía trên."),
      W("Gió và mưa", "Sân giữa mở thông về đầu Nam như một ống gió, đón gió Đông Nam mùa hè đi suốt chiều dài nhà. Mùa mưa, thanh đọc phía trên che phần lớn sân."),
      W("Công năng", "Thanh thấp phía Tây: văn phòng, vệ sinh, kho và nghiệp vụ sát lối Tây, giao nhận ở góc Tây Nam. Thanh thấp phía sông: sảnh, cà phê, trưng bày, thiếu nhi, phòng chuyên đề. Thanh đọc tầng 2 và 3: đọc mở, đọc yên tĩnh, học nhóm, tra cứu số.")],
    kc: { he: "Hai thanh thấp khung bê tông lưới 6 m. Thanh đọc gác lên hai hàng cột chạy thẳng từ móng qua hai thanh thấp, cộng hai lõi thang bê tông giữa sân. Khoảng hở giữa hai thanh thấp chỉ 8 m nên không điểm nào của thanh đọc cách chỗ tựa quá 4 m.", nhip: "14 m (hội trường); 8 m (qua sân)", cx: "Không có phần đua" },
    qa: [["Thanh đọc gác qua sân có nguy hiểm không?", "Không. Thanh đọc đè lên hai thanh thấp ở hai bên, giữa có hai lõi thang; nhịp qua sân chỉ 8 m, cột của thanh đọc chạy thẳng xuống móng qua hai thanh thấp."],
      ["Ba tầng có quá cao không?", "Chỉ thanh đọc là ba tầng (+13,95). Các khối còn lại một tầng; nhìn từ sông thấy rõ một thanh nằm trên hai đế thấp."]],
    cut: "Thanh đọc: 2 lớp foam trắng 10 × 18 × 2,25 cm. Hai thanh thấp: foam xám 6 × 23 × 2,25 cm. Lõi thang: foam đen 3 × 2,5 × 7 cm. Hội trường: foam trắng 13 × 7 × 3,5 cm.",
    ngoaigio: "Hội trường ở đầu Bắc có lối riêng từ quảng trường, có vệ sinh trong cùng khối. Cà phê, trưng bày ở đầu Bắc của thanh thấp phía sông, nối với hội trường bằng mái che qua khe 2 m; phòng chuyên đề ở cuối thanh đó, có cửa riêng ra sân. Đường khóa là cửa giữa khu trưng bày và khu thiếu nhi, cùng cửa hai lõi thang lên thanh đọc. Khu sự kiện thoát thẳng ra quảng trường và ra sân nên khóa các cửa này không chặn đường thoát.",
    roleOf: () => "p",
    lab: [[22, 52, 13.95, "Khối chính · Thanh đọc gác lên hai thanh thấp", 1], [18, 21, 7.45, "Hội trường"], [12, 70, 4.95, "Khối phụ · Thanh thấp phía Trần Phú", 2], [32, 66, 4.95, "Khối phụ · Thanh thấp phía sông", 2], [22, 43, 13.95, "Lõi thang"]],
    build() {
      const v = [], st = [];
      // hội trường ở đầu Bắc (khối chính) + vệ sinh, hỗ trợ ngoài giờ
      v.push(B(8, 14, 20, 14, 0.45, 7.45, "sheet", "D", { fa: FS, fl: 1, top: "grass", ...M }), fl(28, 14, 6, 14, 0, "sheet", "E", FS, M));
      // thanh thấp phía Trần Phú: văn phòng, vệ sinh, kho, nghiệp vụ
      v.push(fl(6, 30, 12, 25, 0, "stone", "E", FS, { top: "stoneTop" }), fl(6, 55, 12, 25, 0, "stone", "C", FS, { top: "stoneTop" }));
      // thanh thấp phía sông: sảnh, cà phê, trưng bày, thiếu nhi, chuyên đề
      v.push(fl(26, 30, 12, 26, 0, "stone", "A", FD, { top: "stoneTop" }), fl(26, 56, 12, 14, 0, "stone", "B", FD, { top: "stoneTop" }), fl(26, 70, 12, 6, 0, "stone", "D", FD, { top: "stoneTop" }));
      // thanh đọc hai tầng gác lên hai thanh thấp
      v.push(fl(12, 34, 20, 36, 1, "sheet", "B", FD, M), fl(12, 34, 20, 36, 2, "sheet", "B", FD, M));
      // hai lõi thang giữa sân
      v.push(B(19.5, 40, 5, 5, 0, Z(3) + 0.5, "stone", "X", { top: "stoneTop" }), B(19.5, 60, 5, 5, 0, Z(3) + 0.5, "stone", "X", { top: "stoneTop" }));
      st.push(...perim(8, 14, 20, 14, 7.45, 7), ...perim(6, 30, 12, 50, Z(1)), ...perim(26, 30, 12, 46, Z(1)));
      for (const x of [12, 16, 28, 32]) for (const y of [34, 40, 46, 52, 58, 64, 70]) st.push(col(x, y, 0, Z(3)));
      return { v, st };
    }
  });

  /* ---------- 17.9: hai chữ L xoay, tầng 2 trên hàng cột, mái cỏ tầng 1 ---------- */
  I8.push({
    id: "an9", fam: "anh", code: "17.9", from: "ảnh 9", name: "Hai chữ L xoay ngược, mái cỏ và hàng cột", rule: "Xoay vòng, khối cài",
    tag: "Tầng 1 là chữ L ôm góc Tây Bắc, tầng 2 là chữ L ngược ôm góc Đông Nam; chỗ hai chữ L không chồng nhau thành mái cỏ hoặc hiên cột",
    story: "Lấy từ ảnh 9: sơ đồ tách tầng có các sàn chữ L lệch nhau, mái lộ ra phủ cỏ, tầng trên đứng trên hàng cột quanh một sân. Ở đây chỉ hai tầng: chữ L tầng 1 ôm cạnh Trần Phú và đầu Bắc, chữ L tầng 2 xoay ngược ôm cạnh phía sông. Phần mái tầng 1 lộ ra phía Tây thành vườn mái cỏ; phần tầng 2 vươn qua lối đi phía Bắc đứng trên một hàng cột. Giữa hai chữ L là sân hẹp mở về phía Nam.",
    why: [W("Quy luật hình khối", "Hai chữ L xoay ngược nhau 180° chồng lên nhau, chỉ trùng ở hai góc. Nhìn mô hình thấy rõ hai lớp: lớp dưới thấp, mái cỏ; lớp trên trắng, vắt qua lối đi trên hàng cột."),
      W("Khối chính – khối phụ", "Khối chính là hai chữ L (đọc, sảnh, kho) cùng phòng đa năng, cao tới +9,45, chiếm hơn 80% sàn. Khối phụ là phòng chuyên đề và khối thiếu nhi một tầng màu đá, mái cỏ."),
      W("Nắng và chói", "Cạnh Trần Phú (250°) tầng 1 đặc, mái phủ cỏ giảm nóng. Tầng 2 nằm phía sông (70°), mặt sông có lớp che nắng sáng; đầu Bắc (340°) lấy sáng tán xạ. Sảnh kính tầng 1 nằm dưới chữ L tầng 2 nên được che."),
      W("Gió và mưa", "Sân giữa hai chữ L mở về đầu Nam đón gió Đông Nam mùa hè. Lối đi có mái dưới tầng 2 phía Bắc che mưa nối phòng đa năng với sảnh."),
      W("Công năng", "Chữ L tầng 1: phòng đa năng và chuyên đề ở đầu Bắc; dọc Trần Phú là văn phòng, vệ sinh, kho và nghiệp vụ, giao nhận ở góc Tây Nam. Sảnh, cà phê, trưng bày bằng kính dưới tầng 2. Thiếu nhi ở góc Đông Nam, mở ra sân. Chữ L tầng 2: toàn bộ khu đọc.")],
    kc: { he: "Khung bê tông lưới 6 m, cột thẳng từ móng lên mái. Phần tầng 2 vắt qua lối đi phía Bắc đứng trên một hàng 5 cột, mỗi điểm sàn cách cột gần nhất dưới 4 m. Phòng đa năng 20 × 14 m, dầm mái nhịp 14 m.", nhip: "14 m (phòng đa năng)", cx: "2 m (mép sân giữa)" },
    qa: [["Tầng 2 vắt qua lối đi có an toàn không?", "Dưới phần vắt qua có một hàng 5 cột cách nhau khoảng 4,5 m, nên đây là sàn trên cột, không phải sàn đua. Phần còn lại của tầng 2 nằm trên sảnh kính và khối thiếu nhi."],
      ["Mái cỏ tầng 1 có dột không?", "Mái cỏ có lớp chống thấm, lớp thoát nước và đất dày 30 cm, dốc 1–2% về máng sát tường; cỏ còn giúp mát tầng 1 phía Trần Phú."]],
    cut: "Chữ L tầng 1: foam xám cắt chữ L 7 × 26 cm và 10 × 7 cm, dày 2,25 cm, phủ giấy cỏ. Chữ L tầng 2: foam trắng 16 × 6 cm và 7 × 20,5 cm, dày 2,25 cm. Hàng cột: 5 que tre 3 mm. Sảnh: mica 6 × 13 × 2,25 cm.",
    ngoaigio: "Phòng đa năng, phòng chuyên đề ở đầu Bắc có lối riêng từ quảng trường; lối đi có mái dưới hàng cột dẫn sang cà phê, trưng bày ở sảnh kính và sang cụm vệ sinh ở đầu Bắc dải Trần Phú. Đường khóa là cửa giữa cụm vệ sinh với khu văn phòng, kho, cửa giữa sảnh với khu thiếu nhi và cửa thang lên tầng 2. Khu sự kiện thoát thẳng ra quảng trường và ra lối đi có mái nên các cửa khóa không nằm trên tuyến thoát.",
    roleOf: () => "p",
    lab: [[22, 33, 9.45, "Khối chính · Hai chữ L xoay ngược", 1], [18, 21, 7.45, "Phòng đa năng"], [13, 66, 4.95, "Mái cỏ tầng 1"], [33, 21, 4.95, "Khối phụ · Phòng chuyên đề", 2], [32, 70, 4.95, "Khối phụ · Khu thiếu nhi mở ra sân", 2], [29, 29.5, 2.4, "Hàng cột dưới tầng 2"]],
    build() {
      const v = [], st = [];
      // chữ L tầng 1: dải Trần Phú (vệ sinh, văn phòng; đọc linh hoạt; kho, nghiệp vụ), mái cỏ
      v.push(fl(6, 28, 14, 24, 0, "stone", "E", FS, { top: "grass", ...M }), fl(6, 52, 14, 6, 0, "stone", "B", FD, { top: "grass", ...M }), fl(6, 58, 14, 22, 0, "stone", "C", FS, { top: "grass", ...M }));
      // đầu Bắc: phòng đa năng (chính) và phòng chuyên đề (phụ)
      v.push(B(8, 14, 20, 14, 0.45, 7.45, "sheet", "D", { fa: FS, fl: 1, top: "grass", ...M }), fl(28, 14, 10, 14, 0, "stone", "D", FS, { top: "grass" }));
      // sảnh kính (cà phê, trưng bày) và khu thiếu nhi dưới chữ L tầng 2
      v.push(fl(26, 34, 12, 26, 0, "glass", "A", FG, M), fl(26, 60, 12, 20, 0, "stone", "B", FD, { top: "stoneTop" }));
      // chữ L tầng 2: cánh Bắc vắt qua lối đi, cánh sông
      v.push(fl(6, 28, 32, 12, 1, "sheet", "B", FD, M), fl(24, 40, 14, 41, 1, "sheet", "B", FD, M));
      // hàng cột dưới cánh Bắc tầng 2, chỗ không có khối bên dưới
      for (const x of [21, 25.5, 30, 34.5, 37.4]) prop(v, st, x, 29.5, Z(1));
      st.push(...perim(6, 28, 14, 52, Z(1), 6), ...perim(8, 14, 20, 14, 7.45, 7), ...perim(28, 14, 10, 14, Z(1)), ...perim(26, 34, 12, 46, Z(2), 6.5), ...perim(6, 28, 32, 12, Z(2), 6.4), ...perim(24, 40, 14, 41, Z(2), 7));
      return { v, st };
    }
  });
})(window.G3);
