
/* ================= Gắn hai bộ ý tưởng vào hai tab ================= */
(function (G) {
  if (!G || !G.mount) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  G.mount({
    key: "g3", host: "g3-host", tab: "g3", ideas: G.ideas,
    groups: [{ k: 1, t: "Đợt 1 · 10 ý tưởng mới và 10 ý tưởng làm lại" }, { k: 2, t: "Đợt 2 · 20 ý tưởng mới, không trùng các tab trước" }],
    grpOf: I => I.batch, code: (I, i) => String(i + 1).padStart(2, "0"), sub: I => I.nw ? "Ý tưởng mới" : "Làm lại cho đúng kết cấu", subNw: I => !!I.nw,
    kind: I => I.batch === 2 ? "Đợt 2" : I.nw ? "Đợt 1, mới" : "Đợt 1, làm lại",
    eyebrow: (I, i, n) => `Ý tưởng ${i + 1} / ${n} · đợt ${I.batch} · ${I.nw ? "ý tưởng mới" : "làm lại cho đúng kết cấu"}`,
    cmpTitle: "So sánh nhanh 40 ý tưởng",
    intro: rules => `<section>
  <p class="eyebrow">40 ý tưởng hình khối · xem 3D</p>
  <h2>40 ý tưởng khối có kết cấu hợp lý, xoay xem được mọi góc</h2>
  <p class="lede">Chồng sách đẹp ở ngoài, nhưng mỗi cuốn xoay một hướng nên cột tầng trên không rơi đúng xuống cột tầng dưới. Muốn đứng được phải thêm dầm chuyển và cột phụ, bên trong vừa chật vừa mất cái đẹp. Cả 40 ý tưởng dưới đây đều theo 4 nguyên tắc sau, và bạn có thể bật lớp kết cấu để tự kiểm tra từng ý tưởng. Mỗi ý tưởng ghi rõ khối chính (nhãn tím) và khối phụ (nhãn viền xanh); nút màu <b>Chính / phụ</b> tô riêng hai loại khối.</p>
  <div class="g3-rules">${rules.map(([h, p], i) => `<div class="sheet"><b class="n">Nguyên tắc ${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
  <p class="note">Cách xem: kéo để xoay, cuộn chuột hoặc chụm hai ngón để phóng to, chuột phải hoặc Shift + kéo để dời. Nút <b>Kết cấu</b> làm mờ các khối để thấy cột (màu đỏ), tường chịu lực và dàn. Thanh <b>Cắt ngang</b> cắt mô hình ở một cao độ để nhìn vào từng tầng. Số cột đứng bên trong nhà ở mỗi tầng được đếm tự động.</p>
</section>`
  });
  const FAMN = { cau: "Cầu dây văng", khe: "Khe Hải Vân", lang: "Làng sách", sen: "Đầm sen", hop: "Hộp lồng hộp", dieu: "Cánh diều", mix: "Kết hợp" };
  const cards = [
    ["Hướng khu đất", "Đề bài không cho sẵn hướng: mục 3 và 5.1 yêu cầu sinh viên tự khảo sát và ghi hướng trên bản vẽ. Theo số đo của bạn, trục dọc khu đất lệch khoảng 20° so với hướng Bắc: đường Bạch Đằng chạy Bắc lệch Tây, mặt sông nhìn về hướng Đông Đông Bắc (khoảng 70°), mặt Trần Phú nhìn Tây Tây Nam (khoảng 250°). Trong bài vẫn gọi tắt là đầu Bắc, mặt sông, đầu Nam, mặt Trần Phú. Góc lệch chỉnh được ở thanh Nắng; bóng đổ, gió và bảng mặt đứng tính lại theo góc đó."],
    ["Nắng", "Đà Nẵng ở vĩ độ khoảng 16° Bắc. Sáng hè mặt trời mọc ở khoảng 65°, chiếu gần vuông góc vào mặt sông; chiều đông mặt trời lặn ở khoảng 245°, chiếu gần vuông góc vào mặt Trần Phú. Vì vậy mặt Trần Phú đặc (kho, kỹ thuật, thang), mặt sông là kính có lam đứng, đầu Bắc lấy sáng tán xạ cho khu đọc, đầu Nam có mái đua. Đề bài mục 2 yêu cầu chỗ đọc và kho được bảo vệ khỏi nắng trực tiếp."],
    ["Gió và mưa", "Mùa hè (khoảng tháng 5–9) gió chủ đạo hướng Đông Nam; vì khu đất lệch 20°, gió này vào chủ yếu từ đầu Nam. Mùa đông (khoảng tháng 10–3) gió Đông Bắc lạnh, kèm mưa lớn, đập chủ yếu vào mặt sông. Vì vậy khe, sân, gầm nhà mở về đầu Nam; lối vào phía sông cần hiên sâu hoặc gầm che mưa tạt."],
    ["Bố trí chung", "Nhà sự kiện ở đầu Bắc, có lối riêng từ phố phía Bắc để chạy ngoài giờ. Sảnh, cà phê, trưng bày nhìn ra bậc thang phía Đông. Kho và nghiệp vụ ở phía Tây, gần đường Trần Phú và dốc giao nhận ở góc Tây Nam. Khu đọc ở tầng trên; thiếu nhi ở phía Nam có vườn."]
  ];
  const RULES = ["Đối xứng gương", "Đối xứng tâm", "Bất đối xứng cân bằng", "Lệch có kiểm soát trên lưới", "Lặp lại, nhịp, tiến dần", "Tương phản nặng – nhẹ, đặc – rỗng", "Chủ – phụ", "Khối trừ, khối cài"];
  G.mount({
    key: "g4", host: "g4-host", tab: "g4", ideas: G.ideas4,
    groups: Object.keys(FAMN).map((k, i) => ({ k, t: k === "mix" ? "7 · Kết hợp nhiều ý tưởng" : `${i + 1} · ${FAMN[k]} · 4 biến thể` })),
    grpOf: I => I.fam, code: I => I.code, sub: I => I.rule, subNw: I => I.fam === "mix",
    kind: I => FAMN[I.fam], eyebrow: I => `${FAMN[I.fam]} · ${I.code} · quy luật: ${I.rule.toLowerCase()}`,
    cmpTitle: "So sánh nhanh 29 hình khối",
    intro: () => `
<section>
  <p class="eyebrow">Phát triển 6 ý tưởng đã chọn · 29 hình khối</p>
  <h2>6 ý tưởng × 4 biến thể, và 5 phương án kết hợp</h2>
  <p class="lede">Sáu ý tưởng bạn chọn (Cầu dây văng, Khe Hải Vân, Làng sách bỏ mái chung, Đầm sen, Hộp lồng hộp, Cánh diều), mỗi ý tưởng phát triển thành 4 biến thể theo 4 quy luật bố cục khác nhau, cộng 5 phương án ghép đặc điểm của nhiều ý tưởng. Hình khối giữ đơn giản, không trang trí; sự sinh động đến từ cách xếp khối. Mỗi khối có mặt đứng xử lý theo hướng nắng thay vì kính trần toàn bộ.</p>
  <div class="g3-rules">${cards.map(([h, p]) => `<div class="sheet"><b class="n">Cơ sở</b><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
  <p class="note"><b>Quy luật hình khối dùng trong 29 phương án:</b> ${RULES.join(" · ")}. Mỗi phương án ghi rõ quy luật của nó ngay dưới tên.</p>
  <p class="note"><b>Công cụ mới trong trình xem:</b> thanh <b>Nắng</b> chọn ngày (21/3, 21/6, 22/12) và giờ để xem bóng đổ thật; nút <b>Gió</b> hiện hướng gió hai mùa; bảng <b>Mặt đứng theo hướng nắng</b> tính diện tích tường đặc, kính có lam, kính trần cho từng hướng. Mặt đứng có bốn loại: đặc, kính có lam đứng, kính có mái đua, kính trần. Số liệu khí hậu ở trên là thông tin chung, khi viết thuyết minh cần đối chiếu QCVN 02:2009/BXD.</p>
</section>`
  });

  /* ---------- Đợt 4: 18 khối mới ---------- */
  const FAM6 = { nghieng: "Cầu một trụ nghiêng", sole: "Hộp treo so le", hopmo: "Hộp trong hộp, bỏ vỏ ngoài", mau: "Theo ảnh mẫu bạn gửi" };
  const I6 = G.ideas6 || [];
  if (I6.length) {
    const cn = c => c.split(".").map(Number);
    I6.sort((a, b) => { const [a1, a2] = cn(a.code), [b1, b2] = cn(b.code); return a1 - b1 || a2 - b2; });
    const cnt = f => I6.filter(I => I.fam === f).length;
    const rules6 = [
      ["Khối chính phải thắng rõ", "Khối chính chiếm từ 55% sàn và 60% thể tích trở lên, đỉnh cao ít nhất 1,6 lần khối phụ cao nhất. Khối phụ ít (2–4 khối), thấp một tầng hoặc nửa chìm mái cỏ, vật liệu tối và nặng; khối chính sáng và nhẹ. Bảng số liệu dưới mô hình có dòng Chủ – phụ tự tính và báo đỏ khi chưa đạt."],
      ["Không có khối lơ lửng", "Khối nào trên cao cũng phải tựa lên khối dưới, cột, tường, hoặc được dây văng hay dàn thép giữ. Đua ra quá 4,5 m thì phải có dàn cao một tầng hoặc dây. Cột thẳng một mạch từ móng lên mái. Đã kiểm tra tự động từng phương án."],
      ["Trụ nghiêng tự cân", "Trụ nghiêng ra xa phía nhịp mà nó đỡ, giống cầu Trần Thị Lý: trọng lượng trụ cân với lực kéo của dây. Phía sau có dây néo xuống một khối thấp, nặng làm đối trọng; chân trụ đứng trên móng hoặc lõi bê tông, không đứng trên hộp nhẹ."],
      ["Dây gọn, trụ thon", "Bỏ trụ hộp đen 3 × 3 m và kiểu dây dồn về một điểm. Trụ thon dần lên đỉnh, sáng màu; dây xếp nửa quạt, neo rải đều trên 6–10 m đầu trụ: dây ngắn neo thấp, dây dài neo cao. Hộp vỏ ngoài của nhóm Hộp trong hộp được bỏ hẳn; các hộp bên trong thành mặt ngoài nên có lam, mái đua theo hướng nắng."]
    ];
    G.mount({
      key: "g6", host: "g6-host", tab: "g6", ideas: I6,
      groups: [{ k: "nghieng", t: `8 · Cầu một trụ nghiêng · ${cnt("nghieng")} biến thể từ 1.2` }, { k: "sole", t: `9 · Hộp treo so le · ${cnt("sole")} biến thể từ 1.3` }, { k: "hopmo", t: `10 · Hộp trong hộp, bỏ vỏ ngoài · ${cnt("hopmo")} biến thể từ 5.1–5.4` }, { k: "mau", t: `11 · Theo ảnh mẫu bạn gửi · ${cnt("mau")} biến thể` }].filter(g => cnt(g.k)),
      grpOf: I => I.fam, code: I => I.code, sub: I => I.rule, subNw: () => true, kind: I => FAM6[I.fam],
      eyebrow: I => `${FAM6[I.fam]} · ${I.code} · phát triển từ ${I.from} · quy luật: ${String(I.rule).toLowerCase()}`,
      cmpTitle: `So sánh nhanh ${I6.length} hình khối mới`,
      intro: () => `
<section>
  <p class="eyebrow">Đợt mới · ${I6.length} hình khối · theo ý bạn chọn</p>
  <h2>Cầu một trụ nghiêng, hộp treo so le, hộp trong hộp bỏ vỏ ngoài</h2>
  <p class="lede">${cnt("nghieng")} biến thể từ 1.2 Một trụ nghiêng và ${cnt("sole")} biến thể từ 1.3 Hai hộp treo so le (hai ý bạn thích vì bất đối xứng), cùng ${cnt("hopmo")} biến thể hộp trong hộp đã bỏ lớp vỏ ngoài (mỗi ý 5.1–5.4 hai biến thể)${cnt("mau") ? ` và ${cnt("mau")} biến thể theo hai ảnh mẫu bạn gửi (sàn chữ L so le có sân mái cỏ; hai khối hộp nối bằng các khối dốc)` : ""}. Tất cả theo hướng khu đất mới (lệch khoảng 20°) và bốn quy tắc dưới đây.</p>
  <div class="g3-rules">${rules6.map(([h, p], i) => `<div class="sheet"><b class="n">Quy tắc ${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
  <p class="note"><b>Mới trong trình xem:</b> nút <b>Ghim phương án này</b> cạnh tên (phương án đã ghim hiện ở nhóm Đã ghim đầu danh sách, ở mọi tab); nút <b>Sắp lại khối (kéo thả)</b> để dời, xoá, nhân đôi, xoay, thêm bớt tầng rồi lưu thành phương án của bạn; nút <b>Người, xe</b> hiện người 1,7 m, xe máy, ô tô, xe buýt để so tỉ lệ; thanh <b>Lệch Bắc</b> ở dòng Nắng.</p>
</section>`
    });
  }

  /* ---------- Đợt 5: 40 ý tưởng từ công trình đạt giải ---------- */
  const FAM7 = { chong: "Xếp chồng lệch, đua ra", mai: "Mái dốc, nền nâng, mái đi được", treo: "Treo, cầu, nhịp lớn", khoet: "Khoét, cài, xoay", vn: "Việt Nam, châu Á, bài thi đạt giải" };
  const I7 = G.ideas7 || [];
  if (I7.length) {
    const cn = c => c.split(".").map(Number);
    I7.sort((a, b) => { const [a1, a2] = cn(a.code), [b1, b2] = cn(b.code); return a1 - b1 || a2 - b2; });
    const cnt = f => I7.filter(I => I.fam === f).length, nums = { chong: 12, mai: 13, treo: 14, khoet: 15, vn: 16 };
    const rules7 = [
      ["Không còn là hộp chữ nhật", "Mỗi phương án có ít nhất một thao tác hình khối đọc được ngay trên mô hình trắng: đua, xoay, nghiêng, gấp, khoét, treo, bậc, vòm. Thầy nhìn khối thô vẫn thấy ý."],
      ["Học từ công trình có thật", "Mỗi ý tưởng ghi rõ công trình tham khảo, kiến trúc sư, năm, giải thưởng (nếu có) và đường dẫn nguồn. Chỉ mượn nguyên tắc sắp khối, không chép hình."],
      ["Vẫn đứng được", "Không khối nào lơ lửng; đua quá 4,5 m phải có dàn cao một tầng hoặc dây; cột thẳng một mạch. Khối chính chiếm từ 55% sàn, cao ít nhất 1,6 lần khối phụ."],
      ["Đúng khu đất và đề", "Tổng sàn dưới 3.000 m², đủ 5 nhóm chức năng, phòng đa năng 120 chỗ không cột. Hướng lệch 20°: mặt sông có lam, mặt Trần Phú đặc, gầm và sân mở về đầu Nam đón gió hè."]
    ];
    G.mount({
      key: "g7", host: "g7-host", tab: "g7", ideas: I7,
      groups: Object.keys(FAM7).filter(k => cnt(k)).map(k => ({ k, t: `${nums[k]} · ${FAM7[k]} · ${cnt(k)} ý tưởng` })),
      grpOf: I => I.fam, code: I => I.code, sub: I => I.ref ? `theo ${I.ref.name}` : I.rule, subNw: () => true, kind: I => FAM7[I.fam],
      eyebrow: I => `${FAM7[I.fam]} · ${I.code} · theo ${I.ref ? I.ref.name + " (" + I.ref.by + ", " + I.ref.year + ")" : ""}`,
      cmpTitle: `So sánh nhanh ${I7.length} ý tưởng`,
      intro: () => `
<section>
  <p class="eyebrow">Đợt 5 · ${I7.length} ý tưởng mới · học từ công trình và bài thi đạt giải</p>
  <h2>${I7.length} hình khối có nghệ thuật, mỗi cái học từ một công trình thật</h2>
  <p class="lede">Các ý tưởng trước nhiều cái vẫn là hộp chữ nhật xếp cạnh nhau. Đợt này đi tìm những công trình đoạt giải hoặc nổi tiếng nhờ cách sắp khối: xếp chồng lệch, mái dốc đi lên được, khối treo và cầu, khối khoét và cài, cùng vài công trình Việt Nam, châu Á và bài thi. Mỗi công trình được rút ra một nguyên tắc rồi đặt lại vào khu đất 46 Bạch Đằng, theo đúng đề và luật vật lý. Không trùng với 10 công trình đã dùng ở tab "10 ý tưởng từ công trình mẫu".</p>
  <div class="g3-rules">${rules7.map(([h, p], i) => `<div class="sheet"><b class="n">Quy tắc ${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
  <p class="note">Bấm vào một ý tưởng, phần dưới mô hình có thẻ <b>Công trình tham khảo</b> kèm đường dẫn nguồn. Nút <b>Ghim</b>, <b>Sắp lại khối</b>, <b>Người, xe</b>, <b>Tách tầng</b> dùng như các tab trước.</p>
</section>`
    });
  }

  /* ---------- Đợt 6: 2–3 tầng, theo 9 ảnh mẫu và 6 phương án đã ghim ---------- */
  const FAM8 = { anh: "Theo 9 ảnh mẫu bạn gửi", ghim: "Từ phương án bạn đã ghim", tu: "Tự sáng tạo theo ghi chú" };
  const I8 = G.ideas8 || [];
  if (I8.length) {
    const cn = c => c.split(".").map(Number);
    I8.sort((a, b) => { const [a1, a2] = cn(a.code), [b1, b2] = cn(b.code); return a1 - b1 || a2 - b2; });
    const cnt = f => I8.filter(I => I.fam === f).length;
    const rules8 = [
      ["Chỉ hình khối, 2–3 tầng", "Không vẽ lam, mái đua, nét kính. Phần lớn là 2 tầng, chỗ cao nhất tối đa 3 tầng (+14,45). Đẹp nhờ cách xếp khối."],
      ["Có cột dưới chỗ đua", "Phần nào đua quá 4 m đều có cột đỡ nhìn thấy được, đặt sẵn trong thiết kế. Không còn khối đua dài chỉ dựa vào dàn."],
      ["Đủ đề ngay từng nhóm", "A ≥ 311, B ≥ 1.277, C ≥ 299, D ≥ 345, E ≥ 322 m² ngay trong khối của nhóm đó; tổng ≤ 3.000 m²."],
      ["Sự kiện chạy riêng ngoài giờ", "Phòng đa năng, chuyên đề, cà phê, trưng bày và một cụm vệ sinh có lối vào riêng; khu đọc và kho khóa lại mà không chặn đường thoát nạn. Mỗi ý tưởng ghi rõ cách tách trong mục Ngoài giờ."]
    ];
    G.mount({
      key: "g8", host: "g8-host", tab: "g8", ideas: I8,
      groups: [{ k: "anh", t: `17 · ${FAM8.anh} · ${cnt("anh")} ý tưởng` }, { k: "ghim", t: `18 · ${FAM8.ghim} · ${cnt("ghim")} ý tưởng` }, { k: "tu", t: `19 · ${FAM8.tu} · ${cnt("tu")} ý tưởng` }].filter(g => cnt(g.k)),
      grpOf: I => I.fam, code: I => I.code, sub: I => I.from ? `từ ${I.from}` : I.rule, subNw: () => true, kind: I => FAM8[I.fam],
      eyebrow: I => `${FAM8[I.fam]} · ${I.code} · từ ${I.from || ""} · quy luật: ${String(I.rule).toLowerCase()}`,
      cmpTitle: `So sánh nhanh ${I8.length} ý tưởng 2–3 tầng`,
      intro: () => `
<section>
  <p class="eyebrow">Đợt 6 · ${I8.length} ý tưởng · thấp tầng, đủ đề, có cột chống</p>
  <h2>Phát triển từ 9 ảnh mẫu, 6 phương án đã ghim, và 10 ý tưởng tự sáng tạo</h2>
  <p class="lede">Mỗi ảnh mẫu thành một ý tưởng, mỗi phương án đã ghim thành một ý tưởng làm lại cho thấp tầng; nhóm 19 là 10 ý tưởng tự sáng tạo sau khi xem mẫu của người khác, mỗi ý ghi rõ đã học gì từ đâu. Tất cả theo file ghi chú đề bài và nguyên tắc <b>GHI-CHU-DE-BAI-VA-NGUYEN-TAC.md</b> trong thư mục đồ án.</p>
  <div class="g3-rules">${rules8.map(([h, p], i) => `<div class="sheet"><b class="n">Quy tắc ${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join("")}</div>
</section>`
    });
  }

  /* ---------- Phương án chốt: khối 3D sinh từ mặt bằng ---------- */
  const IC = (G.CHOT || []).map(p => p.idea).filter(Boolean);
  if (IC.length) G.mount({
    key: "g9", host: "g9-host", tab: "g9", ideas: IC,
    groups: [{ k: "xep", t: "Từ bản xếp khối của bạn (X.1 đúng y bản xếp; X.2–X.4 sửa giao thông và logic; X.5–X.6 sửa thêm, đủ diện tích đề)" }, { k: "vuong", t: "Xếp khối vuông, chữ nhật 2–3 tầng (thầy xác nhận: không cần cầu kỳ)" }, { k: "moi", t: "Đợt mới · kho sát thư viện, đi lại gọn (A.4–A.6, H.7–H.9)" }, { k: "khe", t: "Khe Hải Vân · sửa đủ góp ý của thầy" }, { k: "hop", t: "Hộp xếp chồng, không hộp bọc ngoài" }, { k: "chot", t: "Phương án đã chốt (A đã nộp mô hình)" }], grpOf: I => /^X\./.test(I.code) ? "xep" : /^S\./.test(I.code) ? "vuong" : /^(A\.[4-9]|H\.[7-9])/.test(I.code) ? "moi" : /^K/.test(I.code) ? "khe" : /^H/.test(I.code) ? "hop" : "chot", code: I => I.code, sub: I => `từ ${I.from}`, subNw: () => true, kind: () => "Phương án chốt",
    eyebrow: I => `Phương án chốt ${I.code} · phát triển từ ${I.from}`, cmpTitle: "Phương án chốt",
    intro: () => `<section><p class="eyebrow">Phương án chốt · khối 3D</p><h2>Khối sinh từ chính mặt bằng bên dưới</h2><p class="lede">Đường bao, cao độ sàn, mái dốc và vị trí lõi thang lấy trực tiếp từ dữ liệu mặt bằng, nên khối và mặt bằng luôn khớp. Thang bộ là khối cam, thang bộ có thang máy là khối tím, nhô cao hơn mái 1,6 m.</p></section>`
  });
})(window.G3);
