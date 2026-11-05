/* ================= Mặt bằng phát triển · 1.4 Lưng đặc phía Tây ================= */
(function (G) {
  (G.plans5 = G.plans5 || []).push({
    id: "cau4", code: "1.4", name: "Lưng đặc phía Tây",
    pick: "Khối trả lời rõ nhất chuyện nắng: mọi phòng phục vụ dồn vào lưng đá đặc phía Tây chặn nắng chiều, hộp đọc nhẹ treo về phía sông. Tương phản nặng – nhẹ dễ giải thích, mặt bằng thẳng, phân tầng rõ.",
    concept: "Lưng đá phía Tây là dãy phục vụ: kho, kỹ thuật, WC, văn phòng, nghiệp vụ, hai thang ở hai đầu. Khách vào từ phía sông qua sảnh kính dưới gầm hộp rồi lên hộp đọc bằng thang chính; nhà sự kiện và cà phê ở đầu Bắc, nhà thiếu nhi ở đầu Nam, đều mở ra quảng trường. Tầng 2 nối lưng đá với hộp bằng một cầu kính ngay dưới vây giữa.",
    adjust: [
      "Nâng sàn tầng 2 lưng đá từ +4.950 lên +5.450 cho bằng sàn hộp đọc, không cần bậc hay dốc; tầng 1 lưng đá cao 5,0 m (hợp với kho compact), tầng 2 còn 4,0 m.",
      "Thêm cầu kính 2 × 3 m ở tầng 2 (x 10–12, y 46,8–49,8), ngay dưới vây giữa, nối hành lang lưng đá với sảnh tầng 2 của hộp: +6 m².",
      "Thêm hộp cửa sổ 1,5 × 10 m nhô ra phía Đông ở tầng 2 lưng đá cho phòng chuyên đề D4, vì lưng đá rộng 6 m không kê đủ 24 chỗ: +15 m².",
      "Hai thang của hộp đọc đứng trong sảnh kính, ở góc Tây Bắc và Tây Nam, cách nhau 15 m (xa nhất có thể trong sảnh); gầm hộp vẫn không có cột.",
      "Mặt Đông tầng 1 lưng đá mở kính ở đoạn trưng bày A2; đoạn này nằm dưới bóng hộp đọc nên không chói. Các đoạn khác giữ tường đặc.",
      "Lưng đá tầng 2 lấy sáng bằng cửa mái hướng Bắc giữa các vây, vì mặt Tây đặc và mặt Đông chỉ cách hộp đọc 2 m.",
      "Sàn tầng 3 hộp đọc khoét lỗ thông tầng 4,2 × 7,2 m để bậc đọc B6 đi thẳng từ tầng 2 lên tầng 3."
    ],
    levels: [
      {
        k: "t1", z: 0.45, title: "Tầng 1 · +0.450 · lưng đá phục vụ, sảnh kính dưới gầm hộp, nhà sự kiện, nhà thiếu nhi",
        rooms: [
          // Nhà sự kiện (đầu Bắc)
          { id: "D2", c: "D2", n: "Bục trình bày", g: "D", r: [12, 6, 1.8, 14], nz: 3, night: 1, ch: 5.4, ex: [["W", 1.2, "s", 0.85]] },
          { id: "D1", c: "D1", n: "Phòng đa năng", g: "D", r: [13.8, 6, 11.95, 14], face: "W", seat: 120, nz: 3, night: 1, ch: 5.4,
            to: [["D2", "o"], ["A3", 1.8, "", 0.25], ["A3", 1.8, "", 0.75], ["HLev", 1.8]], ex: [["N", 1.8, "x", 0.3], ["S", 1.8, "x", 0.3]] },
          { id: "A3", c: "A3", n: "Cà phê sách", g: "A", r: [25.75, 6, 6.25, 11.2], nz: 3, night: 1, ch: 5.4, to: [["HLev", "o"]], ex: [["E", 2.4, "m", 0.5], ["N", 1.8, "x", 0.5]] },
          { id: "HLev", c: "HL1", n: "Tiền sảnh sự kiện", g: "circ", r: [25.75, 17.2, 6.25, 2.8], nz: 3, night: 1, w: "cửa sự kiện phía sông", ex: [["E", 1.8, "m"], ["S", 1.8, "x"]] },
          // Lưng đá (x 4–10)
          { id: "T3", c: "T3", n: "Thang Bắc + thang máy", g: "core", st: "u+l", r: [4, 14, 6, 7], nz: -1, night: 1, ex: [["N", 1.2, "x"], ["W", 1.2, "x"], ["E", 1.2, "x", 0.7]] },
          { id: "D3", c: "D3", n: "Kho sự kiện", g: "D", r: [4, 21, 6, 3.33], nz: -1, night: 1, ex: [["E", 1.8, "s"]] },
          { id: "E5a", c: "E5", n: "WC công cộng", g: "E", r: [4, 24.33, 6, 5], nz: -1, night: 1, ex: [["E", 1.8, "x"]] },
          { id: "E4", c: "E4", n: "Kỹ thuật", g: "E", r: [4, 29.33, 6, 9.67], nz: -1, ex: [["W", 1.8, "s"]] },
          { id: "A2", c: "A2", n: "Trưng bày dọc lưng đá", g: "A", r: [4, 39, 6, 15], nz: 2, night: 1, ch: 4.4, ex: [["E", 2.4, "x", 0.25], ["E", 2.4, "x", 0.75]] },
          { id: "C1", c: "C1", n: "Kho đóng", g: "C", r: [4, 54, 6, 20], nz: -1, ch: 4.4, to: [["C4", 1.2]] },
          { id: "C4", c: "C4", n: "Tiếp nhận sách", g: "C", r: [4, 74, 6, 5], nz: 1, to: [["T4", 1.2]], ex: [["W", 2.4, "s"]] },
          { id: "T4", c: "T4", n: "Thang Nam + tời sách", g: "core", st: "u+b", r: [4, 79, 6, 7], nz: -1, ex: [["S", 1.2, "x"], ["W", 1.2, "x", 0.7]] },
          // Sảnh kính dưới gầm hộp
          { id: "T1", c: "T1", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [16, 36, 3.6, 9.6], nz: -1, ex: [["W", 1.2, "x", 0.3]] },
          { id: "E6", c: "E6", n: "Kho chung, dụng cụ vệ sinh", g: "E", r: [16, 45.6, 3.6, 5.4], nz: -1, ex: [["W", 0.9, "s"]] },
          { id: "T2", c: "T2", n: "Thang Nam hộp đọc", g: "core", st: "u", r: [16, 51, 3.6, 7], nz: -1, ex: [["W", 1.2, "x"]] },
          { id: "A1", c: "A1", n: "Sảnh đón tiếp", g: "A", r: [19.6, 36, 4.8, 16.6], nz: 3, night: 1, ch: 4.2,
            to: [["T1", 1.8, "", 0.4], ["E6", 0.9], ["HLv", "o"], ["A4", "o"], ["HLn", "o"]], ex: [["N", 2.4, "m"]] },
          { id: "A4", c: "A4", n: "Gửi đồ, mượn trả", g: "A", r: [24.4, 36, 3.6, 8.8], nz: 2, to: [["HLv", "o"]] },
          { id: "HLv", c: "HL2", n: "Sảnh đệm cửa chính", g: "circ", r: [24.4, 44.8, 3.6, 9], nz: 3, night: 1, w: "cửa chính phía sông", to: [["E3", 0.9]], ex: [["E", 3.0, "m"]] },
          { id: "E3", c: "E3", n: "Trực bảo vệ", g: "E", r: [24.4, 53.8, 3.6, 4.2], nz: 1, night: 1 },
          { id: "HLn", c: "HL3", n: "Sảnh Nam", g: "circ", r: [19.6, 52.6, 4.8, 5.4], nz: 2, night: 1, w: "ra gầm hộp, sang thiếu nhi", to: [["T2", 1.2]], ex: [["S", 1.8, "x"]] },
          // Nhà thiếu nhi (đầu Nam)
          { id: "B3", c: "B3", n: "Thiếu nhi và gia đình", g: "B", r: [14, 74, 16, 11.25], nz: 3, ch: 4.0, to: [["E5c", 0.9, "", 0.2], ["HLk", 1.2, "", 0.7]], ex: [["N", 2.4, "m"], ["E", 1.8, "x"]] },
          { id: "E5c", c: "E5", n: "WC trẻ em", g: "E", r: [14, 85.25, 6, 2.75], nz: -1, wc: "WC trẻ em · thay tã · NKT" },
          { id: "HLk", c: "HLk", n: "Kho đồ chơi, xe đẩy", g: "circ", r: [20, 85.25, 10, 2.75], nz: 2, ex: [["S", 1.2, "s"], ["E", 1.2, "x"]] }
        ],
        out: [
          { r: [12, 0, 20, 6], t: "Quảng trường Bắc" },
          { r: [32, 6, 8, 11.2], t: "Hiên cà phê nhìn sông" },
          { r: [10, 20, 22, 12], t: "Sân giữa" },
          { r: [10, 32, 20, 36], t: "GẦM HỘP ĐỌC · quảng trường có mái, không cột" },
          { r: [30, 74, 8, 14], t: "Vườn thiếu nhi" }
        ],
        paths: [
          { k: "visitor", pts: [[40, 49], [28, 49], [26, 41], [21, 41], [19.8, 41]], t: "Khách đọc từ sông" },
          { k: "visitor", pts: [[22, 55], [22, 60], [22, 70], [22, 73.8]], t: "→ thiếu nhi" },
          { k: "event", pts: [[40, 12], [32, 12], [28, 12], [25.9, 12]], t: "Khách sự kiện qua cà phê" },
          { k: "event", pts: [[40, 18.6], [32, 18.6], [26, 18.6]], t: "" },
          { k: "book", pts: [[2, 96], [2, 76.5], [4, 76.5], [7, 78.8], [7, 80.5]], t: "Sách mới → C4 → tời" },
          { k: "staff", pts: [[-3, 17.5], [4, 17.5]], t: "Lối riêng lên D4 ngoài giờ" }
        ],
        locks: "Ngoài giờ mở: nhà sự kiện (D1, D2, cà phê), WC công cộng, trưng bày A2, sảnh A1 và thang Bắc lên phòng chuyên đề D4. Khóa: cửa thang chính và thang Nam ở tầng 2 (vào hộp đọc), kho C1, C4, kỹ thuật, quầy A4. Nhà thiếu nhi khóa riêng. Cửa khóa đều có thanh đẩy thoát nạn từ bên trong."
      },
      {
        k: "t2", z: 5.45, tol: 0.55, title: "Tầng 2 · +5.450 · hộp đọc tầng dưới, lưng đá văn phòng, cầu nối",
        envAdd: [[10, 46.8, 2, 3], [10, 21, 1.5, 10]],
        rooms: [
          // Lưng đá
          { id: "T3", c: "T3", n: "Thang Bắc + thang máy", g: "core", st: "u+l", r: [4, 14, 6, 7], nz: -1, night: 1, to: [["D4", 1.2, "", 0.4]] },
          { id: "D4", c: "D4", n: "Sinh hoạt chuyên đề", g: "D", r: [4, 21, 7.5, 10], nz: 2, night: 1, ch: 3.4, to: [["HLs", 1.2, "k"]] },
          { id: "HLs", c: "HL4", n: "Hành lang lưng đá", g: "circ", r: [8.2, 31, 1.8, 48], nz: 1, w: "rộng 1,8 m",
            to: [["E1", 1.2, "", 0.2], ["E2", 1.2, "", 0.5], ["C2", 1.2, "", 0.6], ["T4", 1.2], ["BR", "o"]] },
          { id: "E1", c: "E1", n: "Văn phòng", g: "E", r: [4, 31, 4.2, 20.21], nz: 1, ch: 3.4 },
          { id: "E2", c: "E2", n: "Phòng nhân viên", g: "E", r: [4, 51.21, 4.2, 10.1], nz: 1, ch: 3.4 },
          { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", g: "C", r: [4, 61.31, 4.2, 17.69], nz: 1, ch: 3.4, to: [["T4", 1.2]] },
          { id: "T4", c: "T4", n: "Thang Nam + tời sách", g: "core", st: "u+b", r: [4, 79, 6, 7], nz: -1 },
          { id: "BR", c: "BR", n: "Cầu nối", g: "circ", r: [10, 46.8, 2, 3], nz: 2, w: "cầu kính dưới vây giữa", to: [["HLw", "o"]] },
          // Hộp đọc
          { id: "B1a", c: "B1", n: "Đọc nhìn Bắc", g: "B", r: [12, 32, 18, 4], nz: 1, ch: 4.0, to: [["HLp", "o"], ["B1b", "o"]] },
          { id: "C3", c: "C3", n: "Tài liệu địa phương", g: "C", r: [12, 36, 4, 9.6], nz: 0, ch: 4.0, to: [["HLw", 1.2, "k"]] },
          { id: "T1", c: "T1", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [16, 36, 3.6, 9.6], nz: -1, to: [["HLw", 1.8]] },
          { id: "HLp", c: "HL5", n: "Phố sách", g: "circ", r: [19.6, 36, 2, 22], nz: 2, w: "rộng 2,0 m", to: [["B1b", "o"], ["B1c", "o"], ["HLw", "o"], ["B5", 1.2]] },
          { id: "B1b", c: "B1", n: "Đọc mở nhìn sông", g: "B", r: [21.6, 36, 8.4, 10], nz: 1, ch: 4.0, to: [["B6", "o"]] },
          { id: "HLw", c: "HL6", n: "Sảnh tầng 2", g: "circ", r: [12, 45.6, 7.6, 5.4], nz: 2, w: "đến từ thang chính và cầu nối", to: [["E5b", 1.2], ["T2", 1.2]] },
          { id: "E5b", c: "E5", n: "WC tầng 2", g: "E", r: [12, 51, 4, 7], nz: -1 },
          { id: "T2", c: "T2", n: "Thang Nam hộp đọc", g: "core", st: "u", r: [16, 51, 3.6, 7], nz: -1 },
          { id: "B1c", c: "B1", n: "Bàn bar bên bậc đọc", g: "B", r: [21.6, 46, 4.2, 12], nz: 1, ch: 4.0, to: [["B1d", "o"]] },
          { id: "B6", c: "B6", n: "Bậc đọc lên tầng 3", g: "B", r: [25.8, 46, 4.2, 12], nz: 2, steps: 10 },
          { id: "B5", c: "B5", n: "Tra cứu số", g: "B", r: [12, 58, 10.4, 10], nz: 1, ch: 4.0 },
          { id: "B1d", c: "B1", n: "Đọc mở phía Nam", g: "B", r: [22.4, 58, 7.6, 10], nz: 1, ch: 4.0 }
        ],
        out: [
          { r: [12, 6, 20, 14], t: "Mái nhà sự kiện" },
          { r: [14, 74, 16, 14], t: "Mái cỏ nhà thiếu nhi" }
        ],
        paths: [
          { k: "visitor", pts: [[17.8, 44], [17.8, 48], [20.6, 48], [20.6, 40], [25, 40]], t: "Thang chính → phố sách" },
          { k: "visitor", pts: [[27.9, 45.5], [27.9, 50], [27.9, 57.5]], t: "Bậc đọc lên tầng 3" },
          { k: "book", pts: [[7, 80], [6, 70], [9.1, 70], [9.1, 48.3], [11, 48.3], [14, 48.3], [20.6, 48.3], [20.6, 56]], t: "Sách qua cầu nối" },
          { k: "event", pts: [[7, 19], [7, 25]], t: "Ngoài giờ: thang Bắc → D4" }
        ],
        locks: "Ngoài giờ chỉ mở phòng chuyên đề D4, đi bằng thang Bắc có thang máy. Khóa cửa D4 ra hành lang lưng đá, cầu nối và toàn bộ hộp đọc."
      },
      {
        k: "t3", z: 9.95, title: "Tầng 3 · +9.950 · hộp đọc tầng trên: đọc yên tĩnh, học nhóm",
        rooms: [
          { id: "B2a", c: "B2", n: "Đọc yên tĩnh · dãy Bắc", g: "B", r: [12, 32, 18, 4], nz: 0, ch: 4.0, to: [["HLp3", 1.2], ["B2b", "o"]] },
          { id: "B1e", c: "B1", n: "Kệ sách", g: "B", kind: "ke", r: [12, 36, 4, 9.6], nz: 1, to: [["HLw3", "o"]] },
          { id: "T1", c: "T1", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [16, 36, 3.6, 9.6], nz: -1, to: [["HLw3", 1.8]] },
          { id: "HLp3", c: "HL7", n: "Phố sách tầng 3", g: "circ", r: [19.6, 36, 2, 22], nz: 1, w: "rộng 2,0 m", to: [["B2b", 1.2, "", 0.3], ["HLw3", "o"], ["B1g", "o"], ["B1h", "o"], ["B1i", "o"]] },
          { id: "B2b", c: "B2", n: "Đọc yên tĩnh nhìn sông", g: "B", r: [21.6, 36, 8.4, 12.2], nz: 0, ch: 4.0 },
          { id: "HLw3", c: "HL8", n: "Sảnh tầng 3", g: "circ", r: [12, 45.6, 7.6, 5.4], nz: 2, to: [["B1f", "o"], ["T2", 1.2]] },
          { id: "B1f", c: "B1", n: "Kệ sách", g: "B", kind: "ke", r: [12, 51, 4, 7], nz: 1 },
          { id: "T2", c: "T2", n: "Thang Nam hộp đọc", g: "core", st: "u", r: [16, 51, 3.6, 7], nz: -1, to: [["B1i", 1.2]] },
          { id: "B1g", c: "B1", n: "Bàn bar nhìn bậc đọc", g: "B", r: [21.6, 48.2, 8.4, 2.6], nz: 1, to: [["B1h", "o"]] },
          { id: "B1h", c: "B1", n: "Đọc bên lỗ thông tầng", g: "B", r: [21.6, 50.8, 4.2, 7.2], nz: 1, to: [["B1i", "o"]] },
          { id: "V", c: "TT", n: "Thông tầng bậc đọc", g: "void", r: [25.8, 50.8, 4.2, 7.2], nz: -1 },
          { id: "B1i", c: "B1", n: "Đọc linh hoạt · đầu bậc đọc", g: "B", r: [12, 58, 18, 4.44], nz: 2, ch: 4.0,
            to: [["B4a", 0.9], ["B4b", 0.9], ["B4c", 0.9], ["B4d", 0.9], ["B1f", "o"]] },
          { id: "B4a", c: "B4", n: "Nhóm 1", g: "B", r: [12, 62.44, 4.5, 5.56], nz: 2, ch: 3.0 },
          { id: "B4b", c: "B4", n: "Nhóm 2", g: "B", r: [16.5, 62.44, 4.5, 5.56], nz: 2, ch: 3.0 },
          { id: "B4c", c: "B4", n: "Nhóm 3", g: "B", r: [21, 62.44, 4.5, 5.56], nz: 2, ch: 3.0 },
          { id: "B4d", c: "B4", n: "Nhóm 4", g: "B", r: [25.5, 62.44, 4.5, 5.56], nz: 2, ch: 3.0 }
        ],
        out: [{ r: [4, 14, 6, 72], t: "Mái lưng đá · 3 vây neo dây" }],
        paths: [
          { k: "visitor", pts: [[27.9, 58.5], [24, 60], [14.25, 61.5], [14.25, 62.6]], t: "Từ bậc đọc → phòng nhóm" },
          { k: "visitor", pts: [[20.6, 46], [20.6, 40], [21.8, 40]], t: "→ đọc yên tĩnh" }
        ],
        locks: "Ngoài giờ đóng toàn bộ."
      }
    ]
  });
})(window.G3);
