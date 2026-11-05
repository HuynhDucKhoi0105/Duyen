
/* ================= Đợt 6: 2–3 tầng theo 5 ảnh mẫu đầu (ảnh 1–5 trong bộ ảnh bạn gửi) ================= */
(function (G) {
  const { B, SH, PO, col } = G.K;
  const { cutY } = G.K4;
  const M = { role: "m" };
  const W = (h, p) => [h, p];
  const I8 = G.ideas8 = G.ideas8 || [];
  const Z = k => 0.45 + 4.5 * k;
  const FD = { N: "kinh", E: "lam", S: "dua", W: "dac" }; // khối đọc
  const FS = { N: "dac", E: "lam", S: "dua", W: "dac" }; // khối kín, kho, sự kiện
  const FG = { N: "kinh", E: "lam", S: "dua", W: "lam" }; // hộp kính
  // một tầng của một khối chữ nhật ở tầng k
  const fl = (x, y, w, d, k, c, zone, fa, o = {}) => B(x, y, w, d, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // một tầng của một khối đa giác ở tầng k
  const pf = (pts, k, c, zone, fa, o = {}) => PO(pts, Z(k), Z(k + 1), c, zone, { fa, fl: 1, ...o });
  // cột quanh chu vi, khoảng cách ≤ step, thẳng từ móng lên đỉnh
  function perim(x, y, w, d, z2, step = 8) {
    const o = [], nx = Math.max(1, Math.ceil(w / step)), ny = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= nx; i++) for (const yy of [y, y + d]) o.push(col(x + w * i / nx, yy, 0, z2));
    for (let j = 1; j < ny; j++) for (const xx of [x, x + w]) o.push(col(xx, y + d * j / ny, 0, z2));
    return o;
  }
  // hàng cột dưới phần khối nâng hoặc đua: cột thật trong mô hình và trong kết cấu
  function pilotis(v, st, xs, ys, zTop) {
    for (const x of xs) for (const y of ys) { st.push(col(x, y, 0, zTop)); v.push(B(x - 0.3, y - 0.3, 0.6, 0.6, 0, zTop, "sheet", "X")); }
  }
  // tường thấp quanh sân đọc (không tính sàn)
  const wallLow = (x, y, w, d, h = 1.4) => B(x, y, w, d, 0.45, 0.45 + h, "sheet", "X");

  /* ---------- 17.1 · ảnh 1: các thanh dài, sàn tầng trên trượt lệch, tháp đọc ba tầng ---------- */
  I8.push({
    id: "an1", fam: "anh", code: "17.1", from: "ảnh 1", name: "Răng lược ba thanh, sàn trên trượt lệch", rule: "Lặp lại và trượt lệch trên lưới",
    tag: "Một sống lưng dài phía Tây, ba thanh ngắn mọc ngang ra sông như răng lược; sàn tầng 2 của thanh giữa trượt 4 m về phía sông, đầu Bắc có tháp đọc ba tầng",
    story: "Lấy từ ảnh 1, mô hình bìa nâu có nhiều thanh dài vuông góc nhau ôm các sân, tầng trên trượt lệch khỏi tầng dưới và có một khối xếp chồng cao hơn. Ở đây sống lưng hai tầng chạy dọc mặt Trần Phú, ba thanh ngắn mọc ra phía sông chia khoảng trống thành hai sân. Thanh giữa có tầng 2 trượt 4 m ra phía sông, tạo một mái hiên tự nhiên. Đầu Bắc của sống lưng lên thêm một tầng thành tháp đọc nhìn ra quảng trường. Nhà sự kiện là khối tối thấp đứng riêng ở góc quảng trường.",
    why: [W("Quy luật hình khối", "Lặp lại và trượt lệch: ba thanh ngắn cùng tiết diện mọc ra từ một sống lưng như răng lược, nhịp lặp đều; chỉ thanh giữa trượt tầng trên 4 m nên nhịp đều bị phá đúng một chỗ, đúng tinh thần ảnh 1. Tháp đọc ba tầng ở đầu Bắc là điểm nhấn duy nhất."),
      W("Khối chính – khối phụ", "Khối chính là sống lưng, tháp đọc và các thanh răng lược, chiếm khoảng 85% sàn, cao +13,95. Khối phụ là nhà sự kiện +7,45, phòng chuyên đề và cụm vệ sinh một tầng, đều tối màu và nằm thấp ở góc Đông Bắc."),
      W("Nắng và chói", "Sống lưng đặc hoàn toàn ở mặt Trần Phú nhìn Tây Tây Nam (250°), chặn nắng chiều. Các thanh răng lược quay đầu hồi ra sông nên mặt kính dài nhìn Bắc lệch Tây và Nam lệch Đông; mặt Nam có mái đua, phần trượt của thanh giữa che bóng cho sân."),
      W("Gió và mưa", "Hai sân mở hẳn về phía sông và đầu Nam, đón gió Đông Nam mùa hè. Gió Đông Bắc mùa đông bị nhà sự kiện và tháp đọc ở đầu Bắc chặn bớt; lối vào thư viện nằm dưới hiên của thanh giữa, tránh mưa tạt."),
      W("Công năng", "Đầu Bắc là cụm ngoài giờ: cà phê, trưng bày, nhà sự kiện, phòng chuyên đề, vệ sinh. Sống lưng tầng 1 có văn phòng, vệ sinh, kho và nghiệp vụ sát lối Tây; tầng 2 và tháp là phòng đọc. Thanh giữa là đọc mở, thanh Nam là khu thiếu nhi có sân riêng.")],
    kc: { he: "Khung bê tông lưới 6 × 6 m, cột thẳng từ móng lên mái. Tầng 2 thanh giữa trượt 4 m, phần trượt có thêm hai cột ở mép sân. Nhà sự kiện khung riêng, dàn mái thép nhịp 16 m.", nhip: "16 m (nhà sự kiện)", cx: "4 m (tầng 2 thanh giữa), có cột ở mép" },
    qa: [["Tầng 2 thanh giữa trượt ra 4 m có cần dầm lớn không?", "Không. Phần trượt chỉ 4 m, lại có thêm ba cột mảnh ở mép sân nên dầm thường là đủ; cột thẳng hàng với lưới 6 m của tầng dưới."],
      ["Ba thanh răng lược có làm khu đọc ồn không?", "Mỗi thanh một chức năng: thanh giữa đọc mở, thanh Nam thiếu nhi, khu đọc yên tĩnh ở tầng 2 sống lưng và tháp, xa nhà sự kiện ở đầu Bắc. Hai sân làm vùng đệm giữa các thanh."]],
    cut: "Sống lưng: foam 6 × 33 cm, 2 lớp cao 2,25 cm. Tháp: thêm 1 lớp 6 × 8 cm. Thanh giữa: 2 lớp 9 × 6 cm, lớp trên dời 2 cm. Thanh Nam: 1 lớp 8 × 6 cm. Nhà sự kiện: foam đen 8 × 8 × 3,5 cm. Cột: que tre 3 mm.",
    roleOf: () => "p",
    lab: [[12, 20, 13.95, "Khối chính · Sống lưng, tháp đọc và ba thanh răng lược", 1], [30, 20, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [34, 33, 4.95, "Khối phụ · Phòng chuyên đề", 2], [26, 32, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [38, 50, 4, "Tầng 2 trượt 4 m"]],
    ngoaigio: "Nhà sự kiện, phòng chuyên đề, cụm vệ sinh, cà phê và trưng bày gom ở đầu Bắc, mở thẳng ra quảng trường bằng lối vào riêng. Đường khóa ngoài giờ là một cửa kéo ở hành lang sống lưng tại y = 32, sau đó là văn phòng và khu đọc. Lối thoát của cụm sự kiện đi ra quảng trường và ra sân phía sông, không phải qua cửa khóa này.",
    build() {
      const v = [], st = [];
      // sống lưng phía Tây: tầng 1 cà phê, trưng bày / văn phòng, vệ sinh / kho, nghiệp vụ; tầng 2 đọc; đầu Bắc lên 3 tầng
      v.push(fl(6, 12, 16, 20, 0, "sheet", "A", FD, M), fl(6, 32, 12, 21, 0, "stone", "E", FS, M), fl(6, 53, 12, 25, 0, "stone", "C", FS, M),
        fl(6, 12, 12, 66, 1, "sheet", "B", FD, M), fl(6, 12, 12, 16, 2, "sheet", "B", FD, M));
      // thanh giữa: tầng 2 trượt 4 m về phía sông, có cột ở mép
      v.push(fl(18, 44, 18, 12, 0, "sheet", "B", FD, M), fl(22, 44, 18, 12, 1, "sheet", "B", FD, M));
      pilotis(v, st, [39.4], [44.6, 50, 55.4], Z(1));
      // thanh Nam một tầng: thiếu nhi
      v.push(fl(18, 66, 16, 12, 0, "sheet", "B", FD, M));
      // cụm ngoài giờ ở đầu Bắc
      v.push(B(22, 12, 16, 16, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }), fl(30, 28, 8, 12, 0, "blk", "D", FS), fl(22, 28, 8, 9, 0, "stone", "E", FS));
      st.push(...perim(6, 12, 12, 66, Z(2), 6), ...perim(6, 12, 12, 16, Z(3), 6), ...perim(18, 44, 18, 12, Z(1), 6), ...perim(22, 44, 14, 12, Z(2), 7), ...perim(18, 66, 16, 12, Z(1), 8), ...perim(22, 12, 16, 16, 7.45, 8), ...perim(30, 28, 8, 12, Z(1)), ...perim(22, 28, 8, 9, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.2 · ảnh 2: chuỗi thanh gấp chữ Z, đầu Bắc nâng trên hàng cột ---------- */
  I8.push({
    id: "an2", fam: "anh", code: "17.2", from: "ảnh 2", name: "Dải gấp chữ Z, đầu Bắc nhấc trên cột", rule: "Gấp khúc một dải, nhấc một đầu",
    tag: "Một dải khối hai tầng gấp hai lần thành chữ Z dọc khu đất; đoạn đầu Bắc nhấc lên hàng cột thành cổng có mái đón người từ quảng trường",
    story: "Lấy từ ảnh 2, mô hình nan gỗ trên đế đen: một dải khối gấp khúc liên tục, một đầu nhấc khỏi mặt đất trên hàng cột. Ở đây dải hai tầng đi từ góc Tây Nam lên, gấp sang phía sông rồi lại gấp lên đầu Bắc thành chữ Z. Đoạn cuối ở đầu Bắc nhấc tầng 2 ra 8 m trên hàng cột, phía dưới là cổng có mái của thư viện nhìn ra quảng trường. Cụm sự kiện là ba khối thấp đứng riêng ở góc Đông Nam, đón khách từ phía sông.",
    why: [W("Quy luật hình khối", "Gấp khúc một dải: cả công trình là một dải cùng tiết diện, gấp hai lần vuông góc nên đọc thành chữ Z từ trên cao. Đầu Bắc nhấc lên trên hàng cột tạo tương phản đặc ở mặt đất – rỗng ở cổng, đúng như đầu dải nâng trong ảnh 2. Hai chỗ gấp tạo hai sân lệch nhau, một mở về Bắc, một mở về Nam."),
      W("Khối chính – khối phụ", "Khối chính là cả dải chữ Z và nhà sự kiện nằm ở chân dải, chiếm khoảng 85% sàn, cao +9,45. Khối phụ là phòng chuyên đề, cà phê và cụm vệ sinh một tầng +4,95, tối màu, đứng tách khỏi dải."),
      W("Nắng và chói", "Đoạn dải phía Tây đặc ở mặt Trần Phú. Đoạn ngang quay mặt dài về Bắc lệch Tây và Nam lệch Đông, mặt Nam có mái đua. Đoạn đầu Bắc có mặt sông nhìn Đông Đông Bắc nên dùng lam, cổng nâng tạo bóng mát."),
      W("Gió và mưa", "Sân Nam mở về đầu Nam đón gió Đông Nam mùa hè. Cổng nâng ở đầu Bắc là chỗ đứng chờ tránh mưa khi gió mùa đông thổi từ sông. Gầm cổng thông thoáng, gió đi xuyên qua sân Bắc."),
      W("Công năng", "Đoạn Tây tầng 1 có văn phòng, vệ sinh, kho và nghiệp vụ sát lối Tây, giao nhận ở góc Tây Nam. Đoạn ngang tầng 1 là sảnh đón tiếp. Đoạn Bắc tầng 1 là đọc mở, tầng 2 cả dải là phòng đọc. Cụm sự kiện ở góc Đông Nam.")],
    kc: { he: "Khung bê tông lưới 6 m. Phần nhấc lên ở đầu Bắc đứng trên hàng cột 5,7 × 3,9 m, cột thẳng từ móng lên sàn. Nhà sự kiện khung riêng, dàn mái thép nhịp 16 m.", nhip: "16 m (nhà sự kiện)", cx: "Không: phần nhấc lên đứng trên hàng cột" },
    qa: [["Đầu Bắc nhấc lên 8 m có đổ không?", "Không treo hẫng: phía dưới có 9 cột xếp lưới 5,7 × 3,9 m, mỗi điểm sàn cách cột gần nhất dưới 4 m. Thực chất đó là một hiên cột hai tầng."],
      ["Dải chữ Z có làm đường đi dài không?", "Dải chỉ rộng 12 m nên đi dọc một hành lang là thấy hết. Thang và vệ sinh đặt ở hai chỗ gấp, nơi giao của hai đoạn, nên từ đâu cũng ngắn."]],
    cut: "Đoạn Tây: foam 6 × 23 cm, 2 lớp cao 2,25 cm. Đoạn ngang: 2 lớp 8 × 6 cm. Đoạn Bắc: tầng 1 6 × 10 cm, tầng 2 6 × 14 cm kê thêm 9 que tre 3 mm cao 2,25 cm. Nhà sự kiện: foam 8 × 8 × 3,5 cm. Khối phụ: foam đen cao 2,25 cm.",
    roleOf: () => "p",
    lab: [[30, 26, 9.45, "Khối chính · Dải gấp chữ Z", 1], [32, 78, 7.45, "Khối chính · Nhà sự kiện ở chân dải", 1], [35, 65, 4.95, "Khối phụ · Phòng chuyên đề", 2], [25, 62, 4.95, "Khối phụ · Cà phê, trưng bày", 2], [21, 74, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [30, 15, 2.2, "Cổng nhấc trên cột"]],
    ngoaigio: "Nhà sự kiện, phòng chuyên đề, cà phê, trưng bày và cụm vệ sinh nằm ở góc Đông Nam, khách vào từ bậc thang phía sông qua một sân riêng. Đường khóa ngoài giờ là cửa giữa cà phê và chân đoạn Tây của dải, còn thư viện có cổng riêng ở đầu Bắc. Hai cụm có lối thoát riêng ra sân, nên khóa thư viện không chặn đường ra của khách sự kiện.",
    build() {
      const v = [], st = [];
      // đoạn Tây: tầng 1 văn phòng, vệ sinh / kho, nghiệp vụ; tầng 2 đọc
      v.push(fl(6, 40, 12, 21, 0, "stone", "E", FS, M), fl(6, 61, 12, 25, 0, "stone", "C", FS, M), fl(6, 40, 12, 46, 1, "sheet", "B", FD, M));
      // đoạn ngang: sảnh / đọc
      v.push(fl(18, 40, 18, 12, 0, "sheet", "A", FD, M), fl(18, 40, 18, 12, 1, "sheet", "B", FD, M));
      // đoạn Bắc: tầng 1 đọc mở, tầng 2 vươn tới đầu Bắc trên hàng cột
      v.push(fl(24, 22, 12, 18, 0, "sheet", "B", FD, M), fl(24, 12, 12, 28, 1, "sheet", "B", FD, M));
      pilotis(v, st, [24.4, 30, 35.6], [12.4, 16.2, 20], Z(1));
      // cụm sự kiện ở góc Đông Nam: nhà sự kiện thuộc khối chính, ba khối phụ một tầng
      v.push(B(24, 70, 16, 16, 0.45, 7.45, "sheet", "D", { fa: FS, fl: 1, ...M }), fl(30, 60, 10, 10, 0, "blk", "D", FS), fl(20, 56, 10, 12, 0, "stone", "A", FS), fl(18, 68, 6, 12, 0, "stone", "E", FS));
      st.push(...perim(6, 40, 12, 46, Z(2), 6), ...perim(18, 40, 18, 12, Z(2), 6), ...perim(24, 22, 12, 18, Z(2), 6), ...perim(24, 70, 16, 16, 7.45, 8), ...perim(30, 60, 10, 10, Z(1)), ...perim(20, 56, 10, 12, Z(1)), ...perim(18, 68, 6, 12, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.3 · ảnh 3: hai thanh dài lệch góc, hộp kính kẹp giữa ---------- */
  const W3 = [[6, 12], [18, 12], [18, 64], [6, 64]];
  const E3 = [[24, 26], [38, 26], [38, 88], [30, 88]]; // mặt trong lệch góc ~5,5°
  I8.push({
    id: "an3", fam: "anh", code: "17.3", from: "ảnh 3", name: "Hai thanh mở góc, hộp kính kẹp giữa", rule: "Hai trục lệch góc, khe hẹp dần",
    tag: "Hai thanh hai tầng lệch nhau theo chiều dài, mặt trong thanh phía sông xiên nhẹ nên khe giữa hẹp dần; một hộp kính cao hai tầng kẹp vào khe làm sảnh chung",
    story: "Lấy từ ảnh 3, mô hình trắng có hai thanh dài chạy theo đường cong của phố, khoảng giữa đặt một hộp kính trồng cây. Khu đất thẳng nên ở đây giữ ý hai thanh không song song: thanh Tây thẳng, thanh phía sông có mặt trong xiên nhẹ, khe giữa rộng ở đầu Bắc rồi hẹp dần về phía Nam. Hộp kính cao hai tầng kẹp vào chỗ khe hẹp nhất, nối hai thanh, làm sảnh và trưng bày. Toàn bộ chỉ hai tầng.",
    why: [W("Quy luật hình khối", "Hai trục lệch góc: hai thanh cùng chiều cao, lệch nhau theo chiều dài 14 m và mở góc khoảng 5,5°. Khe giữa thay đổi bề rộng nên đi dọc khe thấy không gian co lại rồi mở ra. Hộp kính là khối khác chất liệu kẹp vào khe, như hộp kính trong ảnh 3."),
      W("Khối chính – khối phụ", "Khối chính là hai thanh, hộp kính và nhà sự kiện ở đầu Tây Nam, chiếm khoảng 85% sàn, cao +9,45. Khối phụ là phòng chuyên đề, cụm vệ sinh và quán cà phê một tầng +4,95, tối màu."),
      W("Nắng và chói", "Thanh Tây đặc ở mặt Trần Phú. Thanh phía sông có mặt ngoài nhìn Đông Đông Bắc dùng lam; mặt trong xiên quay về khe, chỉ nhận nắng sáng phản xạ. Hộp kính có lam ở hai mặt Đông và Tây, nằm trong bóng của hai thanh vào buổi chiều."),
      W("Gió và mưa", "Khe hẹp dần về phía Nam nên gió Đông Nam mùa hè vào khe bị dồn lại, thổi nhanh hơn qua sảnh kính. Hai thanh che khe khỏi mưa tạt từ sông."),
      W("Công năng", "Thanh Tây: tầng 1 văn phòng, kho và nghiệp vụ sát lối Tây; tầng 2 đọc yên tĩnh. Thanh phía sông: tầng 1 thiếu nhi và đọc mở, tầng 2 đọc mở, tra cứu. Hộp kính: sảnh, trưng bày. Nhà sự kiện ở góc Tây Nam có lối riêng từ phía Nam.")],
    kc: { he: "Khung bê tông lưới 6 m cho hai thanh; mặt trong xiên dùng cột xếp theo đường xiên, dầm vẫn vuông góc. Hộp kính khung thép mảnh nhịp 6 m. Nhà sự kiện khung riêng, dàn mái thép nhịp 16 m.", nhip: "16 m (nhà sự kiện)", cx: "Không" },
    qa: [["Mặt trong xiên có làm khó bố trí phòng không?", "Góc xiên chỉ khoảng 5,5°, mỗi 10 m mặt tường lùi chưa tới 1 m. Phần xiên rơi vào hành lang và chỗ ngồi sát cửa sổ, phòng phía trong vẫn vuông."],
      ["Hộp kính cao hai tầng có cột giữa không?", "Không. Hộp chỉ rộng 6 m, khung thép tựa lên hai thanh hai bên nên không cần cột ở giữa."]],
    cut: "Thanh Tây: foam 6 × 26 cm, 2 lớp cao 2,25 cm. Thanh phía sông: cắt hình thang 7 × 31 cm, cạnh trong xiên 3 cm, 2 lớp. Hộp kính: mica 3 × 10 × 4,5 cm. Nhà sự kiện: foam 8 × 8 × 3,5 cm. Khối phụ: foam đen cao 2,25 cm.",
    roleOf: () => "p",
    lab: [[12, 30, 9.45, "Khối chính · Hai thanh mở góc", 1], [21, 40, 9.45, "Hộp kính sảnh chung"], [14, 74, 7.45, "Khối chính · Nhà sự kiện", 1], [12, 85, 4.95, "Khối phụ · Phòng chuyên đề", 2], [25, 72, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [24, 60, 4.95, "Khối phụ · Cà phê sân trong", 2]],
    ngoaigio: "Nhà sự kiện, phòng chuyên đề, cụm vệ sinh và quán cà phê nằm ở nửa Nam, quây một sân nhỏ có lối vào riêng từ phía Nam. Đường khóa ngoài giờ là cửa ở đầu Nam của khe giữa hai thanh, ngăn sân sự kiện với sảnh kính và thanh đọc. Khách sự kiện thoát ra phía Nam và ra phía sông qua sân, không đi qua cửa đã khóa.",
    build() {
      const v = [], st = [];
      // thanh Tây: tầng 1 văn phòng / kho, nghiệp vụ; tầng 2 đọc
      v.push(pf(cutY(W3, 12, 34), 0, "stone", "E", FS, M), pf(cutY(W3, 34, 61), 0, "stone", "C", FS, M), pf(cutY(W3, 61, 64), 0, "stone", "B", FS, M), pf(W3, 1, "sheet", "B", FD, M));
      // thanh phía sông: tầng 1 sảnh phụ / thiếu nhi, đọc; tầng 2 đọc
      v.push(pf(cutY(E3, 26, 40), 0, "sheet", "A", FD, M), pf(cutY(E3, 40, 88), 0, "sheet", "B", FD, M), pf(cutY(E3, 26, 60), 1, "sheet", "B", FD, M));
      // hộp kính cao hai tầng kẹp giữa khe
      v.push(B(18, 30, 6, 20, 0.45, 9.45, "glass", "A", { fa: FG, fl: 1, ...M }));
      // cụm sự kiện ở nửa Nam
      v.push(B(6, 66, 16, 16, 0.45, 7.45, "sheet", "D", { fa: FS, fl: 1, ...M }), B(6, 82, 16, 6, 0.45, 4.95, "blk", "D", { fa: FS, fl: 1 }), B(22, 66, 5.5, 12, 0.45, 4.95, "stone", "E", { fa: FS, fl: 1 }), B(18, 54, 8, 8, 0.45, 4.95, "stone", "A", { fa: FS, fl: 1 }));
      st.push(...perim(6, 12, 12, 52, Z(2), 6), ...perim(30, 26, 8, 62, Z(2), 6), ...perim(18, 30, 6, 20, 9.45, 6), ...perim(6, 66, 16, 16, 7.45, 8), ...perim(6, 82, 16, 6, Z(1)), ...perim(22, 66, 5.5, 12, Z(1)), ...perim(18, 54, 8, 8, Z(1)));
      for (const y of [26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86]) st.push(col(24 + 6 * (y - 26) / 62, y, 0, y <= 60 ? Z(2) : Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.4 · ảnh 4: hai khối và khối nối cao hơn ôm sân chung ---------- */
  I8.push({
    id: "an4", fam: "anh", code: "17.4", from: "ảnh 4", name: "Hai nhà một cầu nối cao, sân chung ở giữa", rule: "Hai khối cân bằng, khối nối làm trục",
    tag: "Hai nhà hai tầng hai bên, giữa là một khối nối cao ba tầng lùi vào; sân chung nằm giữa hai nhà, mở về đầu Nam",
    story: "Lấy từ ảnh 4, mô hình bìa có hai khối nhà, một khối nối cao hơn đứng giữa và lùi vào, phía trước là sân chung có cây. Ở đây nhà Tây và nhà phía sông cùng hai tầng, khối nối ba tầng đứng ở phía Bắc giữa hai nhà, như cái bản lề. Sân chung nằm giữa hai nhà, mở về đầu Nam đón gió hè; nhà sự kiện là khối thấp đứng riêng ở góc Đông Nam, khép một phần sân.",
    why: [W("Quy luật hình khối", "Hai khối cân bằng, khối nối làm trục: hai nhà có kích thước khác nhau nhưng cùng chiều cao, khối nối cao hơn một tầng và lùi về phía Bắc, đúng thứ tự cao thấp trong ảnh 4. Sân chung là khoảng rỗng chính, các khối đứng quanh nó."),
      W("Khối chính – khối phụ", "Khối chính là hai nhà và khối nối, chiếm khoảng 85% sàn, cao +13,95 ở khối nối. Khối phụ là nhà sự kiện +7,45, phòng chuyên đề và cụm vệ sinh một tầng, tối màu, nằm ở góc Đông Nam."),
      W("Nắng và chói", "Nhà Tây đặc ở mặt Trần Phú nhìn Tây Tây Nam. Nhà phía sông có lam ở mặt nhìn Đông Đông Bắc. Khối nối cao ba tầng ở phía Bắc không che nắng sân vì sân nằm phía Nam của nó."),
      W("Gió và mưa", "Sân chung mở về đầu Nam, gió Đông Nam mùa hè vào thẳng sân. Khối nối và hai nhà chặn gió Đông Bắc mùa đông cho sân."),
      W("Công năng", "Khối nối tầng 1 là sảnh đón tiếp, tầng 2 và 3 là phòng đọc yên tĩnh. Nhà Tây: văn phòng, kho và nghiệp vụ ở tầng 1 sát lối Tây, đọc ở tầng 2. Nhà phía sông: cà phê, trưng bày, thiếu nhi ở tầng 1, đọc mở ở tầng 2.")],
    kc: { he: "Khung bê tông lưới 6–7 m, cột thẳng từ móng lên mái. Khối nối có hai vách thang chịu lực ở hai đầu. Nhà sự kiện khung riêng, dàn mái thép nhịp 16 m.", nhip: "16 m (nhà sự kiện)", cx: "Không" },
    qa: [["Khối nối cao hơn có cần thiết không?", "Có. Khối nối là chỗ người đến thấy đầu tiên từ quảng trường Bắc và chứa thang chung cho hai nhà; cao hơn một tầng để làm điểm nhận diện và tách phòng đọc yên tĩnh lên trên cùng."],
      ["Ba khối đứng riêng có lún lệch không?", "Mỗi khối có lưới cột riêng, chỗ tiếp giáp giữa khối nối và hai nhà có khe lún, nên lún khác nhau cũng không làm nứt."]],
    cut: "Nhà Tây: foam 6 × 30 cm, 2 lớp cao 2,25 cm. Nhà phía sông: 2 lớp 7 × 20 cm. Khối nối: 3 lớp 4 × 8 cm. Nhà sự kiện: foam đen 8 × 8 × 3,5 cm. Khối phụ: foam đen cao 2,25 cm.",
    roleOf: () => "p",
    lab: [[22, 34, 13.95, "Khối chính · Hai nhà và khối nối cao", 1], [32, 75, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [32, 86, 4.95, "Khối phụ · Phòng chuyên đề", 2], [21, 70, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [22, 55, 0.5, "Sân chung"]],
    ngoaigio: "Nhà sự kiện, phòng chuyên đề và cụm vệ sinh ở góc Đông Nam, nối với cà phê, trưng bày ở đầu Nam nhà phía sông; cả cụm mở ra sân chung và ra bậc thang phía sông. Đường khóa ngoài giờ là cửa giữa trưng bày và phần thiếu nhi trong nhà phía sông, cùng cửa sảnh khối nối. Khách sự kiện thoát ra sân và ra phía sông nên khóa thư viện không chặn đường thoát.",
    build() {
      const v = [], st = [];
      // nhà Tây: tầng 1 văn phòng, vệ sinh / kho, nghiệp vụ; tầng 2 đọc
      v.push(fl(6, 26, 12, 21, 0, "stone", "E", FS, M), fl(6, 47, 12, 25, 0, "stone", "C", FS, M), fl(6, 26, 12, 46, 1, "sheet", "B", FD, M));
      // nhà phía sông: tầng 1 thiếu nhi / cà phê, trưng bày; tầng 2 đọc
      v.push(fl(26, 26, 14, 20, 0, "sheet", "B", FD, M), fl(26, 46, 14, 16, 0, "sheet", "A", FD, M), fl(26, 26, 14, 36, 1, "sheet", "B", FD, M));
      // khối nối ba tầng lùi về Bắc
      v.push(fl(18, 18, 8, 16, 0, "sheet", "A", FD, M), fl(18, 18, 8, 16, 1, "sheet", "B", FD, M), fl(18, 18, 8, 16, 2, "sheet", "B", FD, M));
      // cụm sự kiện ở góc Đông Nam
      v.push(B(24, 66, 16, 16, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }), B(24, 82, 16, 6, 0.45, 4.95, "blk", "D", { fa: FS, fl: 1 }), B(18, 66, 6, 12, 0.45, 4.95, "stone", "E", { fa: FS, fl: 1 }));
      st.push(...perim(6, 26, 12, 46, Z(2), 6), ...perim(26, 26, 14, 36, Z(2), 6), ...perim(18, 18, 8, 16, Z(3), 8), ...perim(24, 66, 16, 16, 7.45, 8), ...perim(24, 82, 16, 6, Z(1)), ...perim(18, 66, 6, 12, Z(1)));
      return { v, st };
    }
  });

  /* ---------- 17.5 · ảnh 5: thanh dài mái một dốc, hộp vắt ngang nhô ra, sân đọc tường thấp ---------- */
  I8.push({
    id: "an5", fam: "anh", code: "17.5", from: "ảnh 5", name: "Mái nghiêng về sông, hộp đọc xuyên qua", rule: "Một mặt nghiêng cắt bởi một hộp vuông góc",
    tag: "Một thanh dài mái một dốc nghiêng hẳn về phía sông; một hộp đọc hai tầng xuyên ngang qua thanh, nhô 14 m về phía sông trên hàng cột; cạnh đó là sân đọc quây tường thấp",
    story: "Lấy từ ảnh 5, mô hình thư viện trắng: một thanh dài mái một dốc, một hộp vuông góc xuyên qua và nhô ra khỏi thanh, góc công trình có sân đọc quây tường thấp. Khác với 11.8 (mái dốc về hai đầu, hộp vươn 14 m), ở đây mái chỉ dốc một chiều: cao ở phía Trần Phú, thấp dần về phía sông, như một mặt nghiêng mở về sông. Hộp đọc nằm xuyên ngang ở tầng 2 và tầng 3, tầng 2 nhô 14 m về phía sông trên hàng cột, tầng 3 ngắn hơn nên hộp bậc xuống về phía sông. Nhà sự kiện đứng riêng ở đầu Bắc cạnh quảng trường.",
    why: [W("Quy luật hình khối", "Một mặt nghiêng cắt bởi một hộp vuông góc: mặt mái dốc một chiều cho thanh dài một hướng chuyển động rõ (xuống sông); hộp đọc vuông vức xuyên ngang phá mặt nghiêng đó, nhô ra ngoài. Sân đọc tường thấp là một khối âm, đối lập với hộp nhô."),
      W("Khối chính – khối phụ", "Khối chính là thanh mái dốc và hộp xuyên ngang, chiếm khoảng 85% sàn, cao +13,95 ở hộp. Khối phụ là nhà sự kiện +7,45, phòng chuyên đề và cụm vệ sinh một tầng ở đầu Bắc, tối màu."),
      W("Nắng và chói", "Mặt Trần Phú là phía cao của mái, tường đặc chặn nắng chiều. Mái dốc xuống phía sông nên mặt sông thấp, có lam. Hộp xuyên ngang nhô ra sông có mặt đầu hồi nhìn Đông Đông Bắc dùng lam sâu; phần dưới hộp là hiên râm."),
      W("Gió và mưa", "Mái một dốc thoát nước gọn về một máng phía sông. Hiên dưới hộp nhô ra và sân đọc mở về đầu Nam đón gió Đông Nam mùa hè. Tường thấp quây sân chặn gió lùa sát mặt đất."),
      W("Công năng", "Thanh dài tầng 1: sảnh, thiếu nhi, văn phòng, kho và nghiệp vụ sát lối Tây; tầng 2 dưới mái dốc là đọc mở, cao dần về phía Tây nên đặt kệ cao sát tường Tây. Hộp xuyên ngang tầng 2–3 là đọc yên tĩnh và học nhóm nhìn sông. Cà phê, trưng bày ở đầu Bắc thanh, sát nhà sự kiện và cụm vệ sinh ngoài giờ.")],
    kc: { he: "Thanh dài khung bê tông lưới 6 m, cột cao dần theo độ dốc mái. Hộp xuyên ngang tựa lên khung thanh dài, lên mái phòng chuyên đề và lên lưới cột khoảng 4,5 × 4,5 m ở phần nhô ra phía sông. Nhà sự kiện khung riêng, dàn mái thép nhịp 12 m.", nhip: "12 m (nhà sự kiện)", cx: "Không: phần hộp nhô ra đứng trên hàng cột" },
    qa: [["Hộp nhô ra 14 m có cột chống không?", "Có. Phần nhô ra đứng trên 9 cột xếp lưới khoảng 4,5 × 4,5 m chạy thẳng xuống móng, góc Bắc còn tựa lên mái phòng chuyên đề; mỗi điểm sàn cách chỗ tựa gần nhất dưới 4 m. Đầu phía Tây của hộp tựa lên khung thanh dài."],
      ["Tầng 2 dưới mái dốc có chỗ nào quá thấp không?", "Phía sông thấp nhất vẫn cao 4,5 m tính từ sàn tầng 2, phía Trần Phú cao 7,5 m, nên cả tầng dùng được; phía cao đặt kệ và gác lửng đọc."]],
    cut: "Thanh dài: tầng 1 foam 7 × 38 cm cao 2,25 cm, tầng 2 hai khối cắt vát cao 3,75 cm phía Tây xuống 2,25 cm phía sông. Hộp xuyên: lớp dưới foam 15 × 6 cm, lớp trên 11 × 6 cm, cao 2,25 cm mỗi lớp, kê 9 que tre 3 mm ở phần nhô. Nhà sự kiện: foam đen 5,5 × 10 × 3,5 cm. Tường sân: bìa 2 mm cao 0,7 cm.",
    roleOf: () => "p",
    lab: [[18, 46, 13.95, "Khối chính · Mái nghiêng và hộp đọc xuyên qua", 1], [35.5, 22, 7.45, "Khối phụ · Nhà sự kiện 120 chỗ", 2], [35.5, 38, 4.95, "Khối phụ · Phòng chuyên đề", 2], [26, 20, 4.95, "Khối phụ · Vệ sinh ngoài giờ", 2], [32, 48, 4.95, "Hộp nhô 14 m trên cột"], [34, 72, 1.9, "Sân đọc tường thấp"]],
    ngoaigio: "Nhà sự kiện, phòng chuyên đề và cụm vệ sinh ở đầu Bắc, cùng cà phê, trưng bày ở đầu Bắc của thanh dài, mở ra quảng trường bằng lối vào riêng. Đường khóa ngoài giờ là cửa ngang thanh dài giữa phần cà phê, trưng bày và sảnh thư viện, phía Nam cửa là khu đọc, văn phòng và kho. Lối thoát của cụm sự kiện đi thẳng ra quảng trường và ra phía sông, không qua cửa khóa.",
    build() {
      const v = [], st = [];
      // thanh dài tầng 1: cà phê, trưng bày / sảnh, thiếu nhi / văn phòng, vệ sinh / kho, nghiệp vụ
      v.push(fl(8, 12, 14, 23, 0, "sheet", "A", FD, M), fl(8, 35, 14, 17, 0, "sheet", "B", FD, M), fl(8, 52, 14, 14, 0, "stone", "E", FS, M), fl(8, 66, 14, 22, 0, "stone", "C", FS, M));
      // thanh dài tầng 2: mái một dốc, cao phía Trần Phú, thấp phía sông; bị hộp xuyên ngang cắt ở y 42–54
      v.push(SH(8, 12, 14, 30, Z(1), 9.45, 12.45, "-x", "sheet", "B", { fa: FD, fl: 1, ...M }), SH(8, 54, 14, 26, Z(1), 9.45, 12.45, "-x", "sheet", "B", { fa: FD, fl: 1, ...M }));
      // hộp xuyên ngang: tầng 2 dài 30 m nhô về phía sông trên hàng cột, tầng 3 ngắn hơn
      v.push(fl(6, 42, 30, 12, 1, "sheet", "B", FD, M), fl(6, 42, 22, 12, 2, "sheet", "B", FD, M));
      pilotis(v, st, [26.5, 31.2, 35.6], [44.6, 49.3, 53.6], Z(1));
      // cụm sự kiện ở đầu Bắc: nhà sự kiện, phòng chuyên đề, vệ sinh ngoài giờ
      v.push(B(30, 12, 11, 20, 0.45, 7.45, "blk", "D", { fa: FS, fl: 1 }), B(30, 32, 11, 12, 0.45, 4.95, "blk", "D", { fa: FS, fl: 1 }), B(22, 12, 8, 16, 0.45, 4.95, "stone", "E", { fa: FS, fl: 1 }));
      // sân đọc quây tường thấp ở phía sông, nửa Nam
      v.push(wallLow(28, 62, 12, 0.3), wallLow(28, 82, 12, 0.3), wallLow(39.7, 62, 0.3, 20.3));
      st.push(...perim(8, 12, 14, 76, Z(2), 6), ...perim(6, 42, 22, 12, Z(3), 8), ...perim(30, 12, 11, 20, 7.45, 6), ...perim(30, 32, 11, 12, Z(1)), ...perim(22, 12, 8, 16, Z(1)));
      return { v, st };
    }
  });
})(window.G3);
