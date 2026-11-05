/* ================= Mặt bằng phát triển · 2.3 Khe gãy khúc ================= */
(function (G) {
  (G.plans5 = G.plans5 || []).push({
    id: "khe3", code: "2.3", name: "Khe gãy khúc",
    pick: "Hai khối chữ L cài vào nhau quanh một khe đèo gãy khúc: nhìn bất đối xứng, có chuyển động, nhưng mọi tường vuông góc và nằm trên lưới, nên mặt bằng gọn và kết cấu đơn giản. Khe đèo vừa là lối đi bộ công cộng từ sông xuyên ra Trần Phú, vừa là đường gió Đông Nam đi qua giữa nhà.",
    concept: "Khối chữ L phía Bắc là khu văn hóa mở ngoài giờ: cà phê, trưng bày kiêm tiền sảnh, phòng đa năng cao 9 m, chuyên đề, WC; tầng 2 là văn phòng và tài liệu địa phương. Khối chữ L phía Nam là thư viện: sảnh và quầy mượn trả ở chân dốc, đọc mở tầng 1–2, đọc yên tĩnh ở góc cao 3 tầng, thiếu nhi có vườn phía Nam, kho và nghiệp vụ dọc mặt Tây. Hai cửa chính mở ra sông ở hai bên chân dốc đèo; dốc đưa khách lên sân đèo tầng 2, nơi có phòng tra cứu và học nhóm.",
    adjust: [
      "Cửa chính của hai khối đặt ở mặt sông, hai bên chân dốc, vì 12 bậc dốc đèo chiếm hết chiều rộng khe.",
      "Bậc trên cùng của dốc đèo mở rộng thành chiếu nghỉ 2 m, nối sân đèo với cửa phụ của khối Bắc tầng 2.",
      "Thông tầng 6 × 7,6 m trên sảnh thư viện và 8 × 11 m trên phòng đọc tầng 1 phía sông, không tính sàn.",
      "Thêm đầu thang S trên mái cỏ khối Nam (4 × 7 m, sàn +9.450) để tầng 3 có lối thoát thứ hai qua sân mái.",
      "Dải mái lam kính rộng 2 m dọc mép sân đèo để đi giữa các nhà khi mưa; không tính diện tích sàn.",
      "Mặt Tây nhà học nhóm và kho sách mở cửa sổ hẹp có lam đứng; phần còn lại vẫn là tường đặc."
    ],
    levels: [
      {
        k: "t1", z: 0.45, title: "Tầng 1 · +0.450 · hai khối chữ L hai bên khe đèo",
        rooms: [
          // Nhà sự kiện cao 9 m
          { id: "D3a", c: "D3", n: "Kho cánh gà", g: "D", r: [6, 12, 2, 2.5], nz: -1, night: 1, ch: 3.6, to: [["D2", 0.9]] },
          { id: "D2", c: "D2", n: "Bục", g: "D", r: [8, 12, 10, 2.5], nz: 3, night: 1, ch: 8, to: [["D1", "o"]] },
          { id: "D3b", c: "D3", n: "Kho", g: "D", r: [18, 12, 2, 2.5], nz: -1, night: 1, ch: 3.6, to: [["D2", 0.9]] },
          { id: "D1", c: "D1", n: "Phòng đa năng cao 9 m", g: "D", r: [6, 14.5, 14, 12.85], nz: 3, night: 1, ch: 8.5, face: "N", seat: 120,
            ex: [["W", 1.8, "x", 0.5]], to: [["D3a", 1.2], ["HL1", 1.8, "", 0.25], ["HL1", 1.8, "", 0.8], ["A2b", 2.4, "", 0.45]] },
          { id: "D3c", c: "D3", n: "Kho ghế", g: "D", r: [6, 27.35, 3.8, 2.65], nz: -1, night: 1, ch: 3.6, to: [["HL1", 1.2], ["D1", 1.6]] },
          { id: "HL1", c: "HL1", n: "Hành lang sự kiện", g: "circ", r: [9.8, 27.35, 10.2, 2.65], nz: 2, night: 1, w: "rộng 2,65 m",
            ex: [["S", 2.4, "x", 0.6]], to: [["E5a", 1.2, "", 0.5], ["A2b", 1.8]] },
          // Nhà kính A, sau là nhà B tầng 2
          { id: "NE", c: "TNE", n: "Thang Bắc", g: "core", st: "u", r: [20, 12, 3.75, 7], nz: -1, ex: [["N", 1.2, "x", 0.5]], to: [["A2b", 1.2, "k"]] },
          { id: "A3", c: "A3", n: "Cà phê sách", g: "A", r: [23.75, 12, 6.25, 10.5], nz: 3, night: 1, ch: 3.6,
            ex: [["N", 1.8, "m", 0.5], ["E", 1.8, "x", 0.5]], to: [["A2a", "o"], ["A2b", 1.8]] },
          { id: "A2b", c: "A2", n: "Trưng bày · tiền sảnh sự kiện", g: "A", r: [20, 19, 3.75, 11], nz: 2, night: 1, ch: 3.6, v: 1, to: [["A2a", "o"]] },
          { id: "A2a", c: "A2", n: "Trưng bày", g: "A", r: [23.75, 22.5, 6.25, 7.5], nz: 2, night: 1, ch: 3.6, ex: [["E", 3, "m", 0.5]] },
          // Nhà Tây phía Bắc
          { id: "E5a", c: "E5", n: "WC công cộng", g: "E", r: [6, 30, 8, 4], nz: -1, night: 1, ch: 3.2, wc: "Nam · Nữ · NKT · dùng ngoài giờ" },
          { id: "D4", c: "D4", n: "Sinh hoạt chuyên đề", g: "D", r: [6, 34, 8, 9.5], nz: 2, night: 1, ch: 3.6, ex: [["E", 1.8, "x", 0.5]] },
          { id: "E4", c: "E4", n: "Kỹ thuật", g: "E", r: [6, 43.5, 8, 6.5], nz: -1, ch: 3.6, ex: [["W", 1.6, "s", 0.5]] },
          { id: "E3", c: "E3", n: "Bảo vệ", g: "E", r: [6, 50, 8, 2], nz: 1, night: 1, ch: 3.2, ex: [["S", 1.2, "s", 0.5]] },
          // Nhà góc 3 tầng (khối chính)
          { id: "HLm", c: "HL2", n: "Sảnh phụ ra khe", g: "circ", r: [20, 36, 2.45, 10.6], nz: 2, v: 1, w: "ra lối dưới sân đèo", ex: [["W", 1.2, "x", 0.3]], to: [["A1", "o"]] },
          { id: "A1", c: "A1", n: "Sảnh thư viện", g: "A", r: [22.45, 36, 7.55, 10.6], nz: 2, ch: 3.6, ex: [["E", 3, "m", 0.5]], to: [["A4", "o"], ["M", 1.6, "k"]] },
          { id: "M", c: "TM", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [20, 46.6, 5.6, 7], nz: -1, ex: [["W", 1.2, "x", 0.5]], to: [["B1a", 1.2]] },
          { id: "A4", c: "A4", n: "Gửi đồ, mượn trả", g: "A", r: [25.6, 46.6, 4.4, 7], nz: 2, ch: 3.6, to: [["B1a", 1.8, "k", 0.6]] },
          { id: "B1a", c: "B1", n: "Sách mới, báo", g: "B", r: [20, 53.6, 10, 4.4], nz: 1, ch: 3.6, to: [["B1e", "o"]] },
          // Thanh Nam: dịch vụ phía Tây
          { id: "HL9", c: "HL3", n: "Hành lang nghiệp vụ", g: "circ", r: [14, 58, 2, 26], nz: 1, v: 1, w: "rộng 2,0 m",
            ex: [["N", 1.2, "s", 0.5], ["S", 1.6, "s", 0.5]], to: [["E5c", 0.9], ["C1", 1.2], ["HL11", "o"], ["C4", 1.6], ["E6", 1.2], ["HL5", "o"], ["S", 1.2, "", 0.4]] },
          { id: "E5c", c: "E5", n: "WC tầng 1", g: "E", r: [6, 58, 8, 2.5], nz: -1, ch: 3.2, wc: "Thiếu nhi · Nữ · NKT" },
          { id: "C1", c: "C1", n: "Kho đóng", g: "C", r: [6, 60.5, 8, 15], nz: -1, ch: 3.6, to: [["HL11", 1.2]] },
          { id: "TS", c: "TS", n: "Tời", g: "core", st: "b", r: [6, 75.5, 2, 2], nz: -1 },
          { id: "HL11", c: "HL4", n: "Sảnh tời", g: "circ", r: [8, 75.5, 6, 2], nz: -1, to: [["C4", 1.2]] },
          { id: "C4", c: "C4", n: "Tiếp nhận sách", g: "C", r: [6, 77.5, 8, 4], nz: 1, ch: 3.6, ex: [["W", 2.4, "s", 0.5]] },
          { id: "E6", c: "E6", n: "Kho chung", g: "E", r: [6, 81.5, 8, 2.5], nz: -1, ch: 3.2 },
          // Thanh Nam: thư viện phía Đông
          { id: "S", c: "TS2", n: "Thang S", g: "core", st: "u", r: [16, 58, 4, 7], nz: -1, ex: [["N", 1.2, "x", 0.5]], to: [["HL5", 1.2], ["B1e", 1.2]] },
          { id: "B1e", c: "B1", n: "Đọc mở tầng 1 · thông tầng", g: "B", r: [20, 58, 10, 11], nz: 1, ch: 8, ex: [["E", 1.8, "x", 0.5]], to: [["HL5", "o"], ["B3a", 1.8, "", 0.4]] },
          { id: "HL5", c: "HL5", n: "Sảnh thiếu nhi", g: "circ", r: [16, 65, 4, 4], nz: 2, to: [["B3a", 1.8]] },
          { id: "B3a", c: "B3", n: "Thiếu nhi và gia đình", g: "B", r: [16, 69, 10.5, 15], nz: 3, ch: 3.6, ex: [["S", 1.8, "x", 0.4]], to: [["B3b", "o"], ["B", 1.2]] },
          { id: "B3b", c: "B3", n: "Góc truyện", g: "B", r: [26.5, 69, 3.5, 8], nz: 3, ch: 3.6, v: 1, ex: [["E", 1.8, "x", 0.5]] },
          { id: "B", c: "TB", n: "Thang B", g: "core", st: "u", r: [26.5, 77, 3.5, 7], nz: -1, ex: [["S", 1.2, "x", 0.5]] }
        ],
        out: [
          { r: [20, 30, 10, 6], t: "DỐC ĐÈO · 12 bậc lên sân đèo" },
          { r: [14, 30, 6, 22], t: "Lối đi dưới sân đèo", v: 1 },
          { r: [6, 52, 14, 6], t: "Cửa đèo Tây → Trần Phú" },
          { r: [16, 84, 14, 5], t: "Vườn thiếu nhi" }
        ],
        paths: [
          { k: "visitor", pts: [[39, 41], [31, 41], [27, 44], [27.8, 50], [27, 56], [25, 62]], t: "Khách đọc từ sông" },
          { k: "visitor", pts: [[24, 61], [22, 67], [18, 70]], t: "" },
          { k: "event", pts: [[39, 26.5], [31, 26.5], [25, 26], [21.8, 24]], t: "Khách sự kiện" },
          { k: "event", pts: [[2, 55], [17, 55], [17, 32]], t: "Người đi bộ dưới sân đèo" },
          { k: "book", pts: [[3, 96], [3, 79.5], [9, 79.5], [10, 76.5], [7.6, 76.5]], t: "Sách mới → tời" },
          { k: "staff", pts: [[15, 90], [15, 84], [15, 62]], t: "Nhân viên" }
        ],
        locks: "Ngoài giờ mở: khối chữ L phía Bắc (cà phê A3, trưng bày A2, phòng đa năng D1, chuyên đề D4, WC E5a, hành lang HL1) và lối đi trong khe. Khóa: cửa thang Bắc ở trưng bày, cửa thang máy và quầy A4 (cổng thư viện), cửa đọc tầng 1 ra sông, khu thiếu nhi, khu nghiệp vụ. Cửa khóa đều có thanh đẩy thoát nạn bên trong."
      },
      {
        k: "t2", z: 4.95, title: "Tầng 2 · +4.950 · sân đèo nối các nhà",
        rooms: [
          // Nhà B trên nhà kính A: văn phòng
          { id: "NE", c: "TNE", n: "Thang Bắc", g: "core", st: "u", r: [20, 12, 3.75, 7], nz: -1, to: [["E1", 1.2], ["C3", 1.2]] },
          { id: "C3", c: "C3", n: "Tài liệu địa phương", g: "C", r: [20, 19, 3.75, 11], nz: 0, ch: 3.6, v: 1, ex: [["S", 1.2, "x", 0.15]], to: [["E1", 1.2], ["E2", 1.0]] },
          { id: "E1", c: "E1", n: "Văn phòng", g: "E", r: [23.75, 12, 6.25, 12], nz: 1, ch: 3.6, to: [["E2", 1.2]] },
          { id: "E2", c: "E2", n: "Phòng nhân viên", g: "E", r: [23.75, 24, 6.25, 6], nz: 1, ch: 3.6 },
          // Nhà Tây trên nhà C: tra cứu và học nhóm mở ra sân đèo
          { id: "B5", c: "B5", n: "Tra cứu số", g: "B", r: [6, 30, 8, 12.4], nz: 2, ch: 3.6, ex: [["E", 1.8, "", 0.5]] },
          { id: "B4a", c: "B4", n: "Nhóm 1", g: "B", r: [6, 42.4, 8, 3.2], nz: 2, ch: 3.0, sm: 1, ex: [["E", 0.9, "", 0.5]] },
          { id: "B4b", c: "B4", n: "Nhóm 2", g: "B", r: [6, 45.6, 8, 3.2], nz: 2, ch: 3.0, sm: 1, ex: [["E", 0.9, "", 0.5]] },
          { id: "B4c", c: "B4", n: "Nhóm 3", g: "B", r: [6, 48.8, 8, 3.2], nz: 2, ch: 3.0, sm: 1, ex: [["E", 0.9, "", 0.5]] },
          // Nhà góc
          { id: "TT0", c: "TT", n: "Thông tầng sảnh", g: "void", r: [22.45, 36, 7.55, 6], nz: -1 },
          { id: "B1b", c: "B1", n: "Đọc nhìn sân đèo", g: "B", r: [20, 36, 2.45, 10.6], nz: 1, ch: 3.6, v: 1, ex: [["W", 1.8, "", 0.3]], to: [["B1b2", "o"], ["M", 1.2]] },
          { id: "B1b2", c: "B1", n: "Đọc mở", g: "B", r: [22.45, 42, 7.55, 4.6], nz: 1, ch: 3.6, to: [["B1c", "o"], ["M", 1.2]] },
          { id: "M", c: "TM", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [20, 46.6, 5.6, 7], nz: -1, ex: [["W", 1.2, "", 0.5]], to: [["B1d", 1.2]] },
          { id: "B1c", c: "B1", n: "Bàn đọc nhìn sông", g: "B", r: [25.6, 46.6, 4.4, 7], nz: 1, ch: 3.6, v: 1, to: [["B1d", "o"]] },
          { id: "B1d", c: "B1", n: "Đọc mở và kệ sách", g: "B", r: [20, 53.6, 10, 4.4], nz: 1, ch: 3.6, main: 1, to: [["B1g", "o"]] },
          // Thanh Nam tầng 2
          { id: "HL12", c: "HL6", n: "Hành lang Tây", g: "circ", r: [14, 58, 2, 26], nz: 1, v: 1, w: "rộng 2,0 m",
            ex: [["N", 1.2, "", 0.5]], to: [["E5d", 0.9], ["B4d", 0.9], ["B1j", 1.8], ["C2a", 1.2], ["C2b", 1.2], ["HL5b", "o"], ["S", 1.2, "", 0.4]] },
          { id: "E5d", c: "E5", n: "WC tầng 2", g: "E", r: [6, 58, 8, 2.5], nz: -1, ch: 3.2 },
          { id: "B4d", c: "B4", n: "Nhóm 4", g: "B", r: [6, 60.5, 8, 3.2], nz: 2, ch: 3.0, sm: 1 },
          { id: "B1j", c: "B1", n: "Kệ sách tham khảo", g: "B", r: [6, 63.7, 8, 11.8], nz: 1, ch: 3.6, kind: "ke" },
          { id: "TS", c: "TS", n: "Tời", g: "core", st: "b", r: [6, 75.5, 2, 2], nz: -1 },
          { id: "C2a", c: "C2", n: "Xử lý nghiệp vụ", g: "C", r: [8, 75.5, 6, 2], nz: 1, ch: 3.6, to: [["C2b", "o"]] },
          { id: "C2b", c: "C2", n: "Xử lý nghiệp vụ", g: "C", r: [6, 77.5, 8, 6.5], nz: 1, ch: 3.6 },
          { id: "S", c: "TS2", n: "Thang S", g: "core", st: "u", r: [16, 58, 4, 7], nz: -1, ex: [["N", 1.2, "", 0.5]], to: [["B1g", 1.2], ["HL5b", 1.2]] },
          { id: "B1g", c: "B1", n: "Cầu đọc bên thông tầng", g: "B", r: [20, 58, 2, 11], nz: 1, ch: 3.6, v: 1, to: [["B1h", "o"], ["HL5b", "o"]] },
          { id: "TT", c: "TT", n: "Thông tầng phòng đọc", g: "void", r: [22, 58, 8, 11], nz: -1 },
          { id: "HL5b", c: "HL7", n: "Sảnh thang S", g: "circ", r: [16, 65, 4, 4], nz: 1, to: [["B1h", "o"]] },
          { id: "B1h", c: "B1", n: "Đọc mở phía Nam", g: "B", r: [16, 69, 10.5, 10], nz: 1, ch: 3.6, to: [["B6", "o"], ["B1i", "o"], ["B", 1.2]] },
          { id: "B1i", c: "B1", n: "Bàn đọc nhìn sông", g: "B", r: [26.5, 69, 3.5, 8], nz: 1, ch: 3.6, v: 1 },
          { id: "B6", c: "B6", n: "Bậc đọc nhìn vườn", g: "B", r: [16, 79, 10.5, 5], nz: 2, ch: 3.6, steps: 5 },
          { id: "B", c: "TB", n: "Thang B", g: "core", st: "u", r: [26.5, 77, 3.5, 7], nz: -1 }
        ],
        out: [
          { r: [14, 30, 6, 28], t: "SÂN ĐÈO · mái trời", v: 1 },
          { r: [6, 52, 8, 6], t: "Sân đèo Tây" },
          { r: [20, 30, 10, 6], t: "Dốc đèo ↓" }
        ],
        paths: [
          { k: "visitor", pts: [[30, 33], [21, 33], [17, 37], [17, 49], [20.6, 49]], t: "Lên dốc đèo → sân đèo" },
          { k: "visitor", pts: [[17, 37], [14.5, 36]], t: "" },
          { k: "visitor", pts: [[21, 56], [21, 66], [20, 74]], t: "" },
          { k: "book", pts: [[7, 76.5], [10, 80], [15, 80], [15, 70], [13.5, 69.5]], t: "Tời → C2 → kệ" }
        ],
        locks: "Ngoài giờ sân đèo vẫn mở (lên bằng dốc đèo). Khóa các cửa từ sân đèo vào nhà: đọc B1b, thang máy, thang S, hành lang Tây, phòng tra cứu và học nhóm (có thể mở đến tối theo lịch). Văn phòng khóa riêng."
      },
      {
        k: "t3", z: 9.45, title: "Tầng 3 · +9.450 · đọc yên tĩnh ở góc cao nhất",
        envAdd: [[16, 58, 4, 7]],
        rooms: [
          { id: "M", c: "TM", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [20, 46.6, 5.6, 7], nz: -1, to: [["B2a", 1.2], ["B2c", 1.2]] },
          { id: "B2a", c: "B2", n: "Đọc yên tĩnh", g: "B", r: [20, 36, 10, 10.6], nz: 0, ch: 3.6, to: [["B2b", "o"]] },
          { id: "B2b", c: "B2", n: "Đọc yên tĩnh", g: "B", r: [25.6, 46.6, 4.4, 7], nz: 0, ch: 3.6, v: 1, to: [["B2c", "o"]] },
          { id: "B2c", c: "B2", n: "Đọc yên tĩnh", g: "B", r: [20, 53.6, 10, 2.4], nz: 0, ch: 3.6, to: [["HL8", 1.2]] },
          { id: "HL8", c: "HL8", n: "Sảnh ra sân mái", g: "circ", r: [20, 56, 10, 2], nz: 1, ex: [["S", 1.6, "x", 0.3]] },
          { id: "S", c: "TS2", n: "Đầu thang S", g: "core", st: "u", r: [16, 58, 4, 7], nz: -1, ex: [["E", 1.2, "x", 0.3]] }
        ],
        out: [{ r: [20, 58, 10, 26], t: "Sân mái cỏ khối Nam", v: 1 }, { r: [6, 65, 10, 19], t: "Mái cỏ" }],
        paths: [{ k: "visitor", pts: [[22.8, 52], [24, 46], [25, 40]], t: "Thang máy → đọc yên tĩnh" }],
        locks: "Ngoài giờ đóng. Cửa ra sân mái khóa từ ngoài, có thanh đẩy thoát nạn bên trong."
      }
    ]
  });
})(window.G3);
