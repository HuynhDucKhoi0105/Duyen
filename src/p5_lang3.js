/* ================= Mặt bằng phát triển · 3.3 Làng sách · Hai sân xếp chong chóng ================= */
(function (G) {
  (G.plans5 = G.plans5 || []).push({
    id: "lang3", code: "3.3", name: "Hai sân xếp chong chóng",
    pick: "Khối nhiều nhà nhỏ trên lưới 4 m nên nhìn hơi lộn xộn mà vẫn có luật, đúng ý bạn. Mỗi nhà chỉ nhịp 8 m, không dầm chuyển, nên thầy dễ chấp nhận.",
    concept: "Đầu Bắc là khu mở ngoài giờ: nhà sự kiện, sảnh, cà phê, trưng bày, quanh sân Bắc. Giữa là nhà đọc ba tầng. Đầu Nam là thiếu nhi quanh sân Nam, kho và nghiệp vụ ở dãy phía Tây sát lối Tây. Khách vào từ sân vào giữa nhà sự kiện và sảnh, nhìn thẳng ra sông.",
    adjust: [
      "Nhà sự kiện mở mặt Nam ra hẻm có mái nối với sảnh; mặt Đông là cửa chính sự kiện.",
      "Nhà phía Tây cụm Bắc mở cửa sổ ra sân trong cho phòng chuyên đề tầng 2 (khối 3D đang để đặc bốn mặt).",
      "Đổi chức năng vài nhà so với màu khối 3D: nhà Tây cụm Nam thành kho và tiếp nhận ở tầng 1, văn phòng ở tầng 2; nhà Nam cụm Nam thành thang, kho và nghiệp vụ."
    ],
    levels: [
      {
        k: "t1", z: 0.45, title: "Tầng 1 · +0.450 · khu mở ngoài giờ ở Bắc, thiếu nhi và nghiệp vụ ở Nam",
        rooms: [
          // Nhà sự kiện
          { id: "D2", c: "D2", n: "Bục", g: "D", r: [10, 2, 2.5, 10], nz: 3, night: 1, ch: 6, to: [["D1", "o"]] },
          { id: "D1", c: "D1", n: "Phòng đa năng", g: "D", r: [12.5, 2, 19.5, 10], nz: 3, night: 1, ch: 6, face: "W", seat: 120, to: [["HL1", 1.8, "", 0.2], ["HL1", 1.8, "", 0.8]], ex: [["N", 1.8, "x", 0.25], ["N", 1.8, "x", 0.8]] },
          { id: "D3", c: "D3", n: "Kho sự kiện", g: "D", r: [10, 12, 5, 4], nz: -1, night: 1, ch: 3.6, to: [["HL1", 1.2]], ex: [["W", 1.6, "s"]] },
          { id: "HL1", c: "HL1", n: "Tiền sảnh sự kiện", g: "circ", r: [15, 12, 17, 4], nz: 3, night: 1, ex: [["E", 2.4, "m"], ["S", 2.4, "x", 0.3]] },
          // Cụm Bắc: cà phê, sảnh, trưng bày
          { id: "E5a", c: "E5", n: "WC công cộng", g: "E", r: [10, 18, 7, 4], nz: -1, night: 1, ch: 3, to: [["HL2", 1.2]], wc: "Nam · Nữ · NKT · mẹ và bé" },
          { id: "HL2", c: "HL2", n: "Sảnh WC, lối Tây", g: "circ", r: [10, 22, 7, 4], nz: 2, night: 1, to: [["A3", 1.2]], ex: [["W", 1.2, "x"]] },
          { id: "A3", c: "A3", n: "Cà phê sách", g: "A", r: [17, 18, 9, 8], nz: 3, night: 1, ch: 3.6, to: [["A1", "o"]], ex: [["N", 1.8, "x", 0.5], ["E", 1.8, "m", 0.25], ["S", 2.4, "s", 0.6]] },
          { id: "A1", c: "A1", n: "Sảnh đón tiếp", g: "A", r: [26, 22, 8, 10], nz: 3, night: 1, ch: 4.2, to: [["HL3", "o"], ["A4", "o"]], ex: [["N", 3, "m", 0.5], ["E", 2.4, "m", 0.45]] },
          { id: "HL3", c: "HL3", n: "Lối vào", g: "circ", r: [26, 32, 3, 6], nz: 2, night: 1, to: [["HL4", "o"]] },
          { id: "A4", c: "A4", n: "Gửi đồ, mượn trả", g: "A", r: [29, 32, 5, 6], nz: 2, ch: 3.6, to: [["HL3", "o"]] },
          { id: "A2", c: "A2", n: "Trưng bày", g: "A", r: [14, 38, 12, 8], nz: 2, night: 1, ch: 4.2, to: [["HL4", "o"], ["C3", 1.2, "k", 0.5]] },
          { id: "HL4", c: "HL4", n: "Sảnh trưng bày", g: "circ", r: [26, 38, 4, 8], nz: 2, night: 1, to: [["B5", 2.4, "k", 0.6]], ex: [["E", 1.8, "x"]] },
          // Nhà Tây cụm Bắc
          { id: "TN", c: "TN", n: "Thang Bắc", g: "core", st: "u", r: [6, 26, 8, 3.5], nz: -1, ex: [["W", 1.2, "x"], ["N", 1.2, "x", 0.25]] },
          { id: "E4", c: "E4", n: "Kỹ thuật", g: "E", r: [6, 29.5, 8, 7], nz: -1, ch: 3.6, ex: [["W", 1.8, "s"]] },
          { id: "C3", c: "C3", n: "Tài liệu địa phương", g: "C", r: [6, 36.5, 8, 5.5], nz: 0, ch: 3.6 },
          // Nhà đọc chính
          { id: "TW", c: "TW", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [8, 46, 6, 7], nz: -1, to: [["B1a", 1.6]], ex: [["W", 1.2, "x"]] },
          { id: "B1a", c: "B1", n: "Báo, tạp chí", g: "B", r: [8, 53, 6, 5], nz: 2, ch: 4.2, kind: "ke", to: [["B1h", "o"]] },
          { id: "B6", c: "B6", n: "Bậc đọc", g: "B", r: [14, 46, 6, 8.5], nz: 2, ch: 4.2, steps: 5, to: [["B5", "o"], ["B1h", "o"]] },
          { id: "B5", c: "B5", n: "Tra cứu số nhìn sông", g: "B", r: [20, 46, 12, 8.5], nz: 2, ch: 4.2, to: [["B1h", "o"]] },
          { id: "B1h", c: "B1", n: "Kệ sách mới", g: "B", r: [14, 54.5, 11, 3.5], nz: 2, ch: 4.2, kind: "ke", to: [["HL6", "o"], ["C1a", 1.2, "", 0.4], ["TSE", 1.2]] },
          { id: "TSE", c: "TSE", n: "Thang Đông Nam", g: "core", st: "u", r: [25, 54.5, 7, 3.5], nz: -1, ex: [["E", 1.2, "x"], ["S", 1.2, "x", 0.75]] },
          // Cụm Nam
          { id: "C1a", c: "C1", n: "Kho đóng", g: "C", r: [10, 58, 12, 8], nz: 0, ch: 3.6, to: [["C1b", "o"]] },
          { id: "HL6", c: "HL6", n: "Sảnh thiếu nhi", g: "circ", r: [22, 58, 4, 8], nz: 3, to: [["B3a", 1.8, "", 0.75]], ex: [["S", 1.8, "s"]] },
          { id: "B3a", c: "B3", n: "Thiếu nhi và gia đình", g: "B", r: [26, 62, 8, 12], nz: 3, ch: 3.6, to: [["B3b", "o"], ["E5c", 0.9]], ex: [["E", 1.8, "x", 0.4], ["W", 1.8, "s", 0.6]] },
          { id: "B3b", c: "B3", n: "", g: "B", r: [26, 74, 4, 4], nz: 3, to: [["B3c", "o"]] },
          { id: "E5c", c: "E5", n: "WC trẻ em", g: "E", r: [30, 74, 4, 4], nz: -1, wc: "WC trẻ em · thay tã" },
          { id: "B3c", c: "B3", n: "Góc kể chuyện", g: "B", r: [22, 78, 8, 8], nz: 3, ch: 3.6, ex: [["E", 1.2, "x"], ["N", 1.8, "s", 0.3]] },
          { id: "C4", c: "C4", n: "Tiếp nhận sách", g: "C", r: [6, 66, 4, 7.5], nz: 1, ch: 3.6, to: [["C1b", 1.6, "", 0.4], ["HL_S", 1.2]], ex: [["W", 2.4, "s", 0.4]] },
          { id: "C1b", c: "C1", n: "", g: "C", r: [10, 66, 4, 6], nz: 0, ch: 3.6 },
          { id: "E3", c: "E3", n: "Trực bảo vệ", g: "E", r: [6, 73.5, 4, 3.5], nz: 1, ch: 3, to: [["HL_S", 0.9]] },
          { id: "E6", c: "E6", n: "Kho chung", g: "E", r: [6, 77, 4, 5], nz: -1, ch: 3, to: [["HL_S", 0.9]] },
          { id: "HL_S", c: "HL_S", n: "Hành lang nghiệp vụ", g: "circ", r: [10, 72, 4, 10], nz: 1, to: [["TS", 1.2, "", 0.6]], ex: [["S", 1.2, "x"]] },
          { id: "TS", c: "TS", n: "Thang Nam + tời sách", g: "core", st: "u+b", r: [14, 78, 8, 5], nz: -1, to: [["HLNV", 1.2]] },
          { id: "HLNV", c: "HLNV", n: "Lối nhân viên", g: "circ", r: [14, 83, 8, 3], nz: 1, ex: [["S", 1.8, "s"], ["W", 1.2, "x"]] }
        ],
        out: [
          { r: [10, 16, 22, 2], t: "HẺM CÓ MÁI" }, { r: [26, 16, 8, 6], t: "SÂN VÀO" },
          { r: [14, 26, 12, 12], t: "SÂN BẮC" }, { r: [14, 66, 12, 12], t: "SÂN NAM · sân chơi" },
          { r: [34, 62, 6, 16], t: "vườn thiếu nhi", v: 1 }
        ],
        paths: [
          { k: "visitor", pts: [[40, 19], [30, 19], [30, 27], [27.5, 35], [27.5, 44], [27.5, 50]], t: "Khách đọc từ sông" },
          { k: "visitor", pts: [[27, 52], [23, 56.2], [23.5, 61], [27, 64]], t: "→ thiếu nhi" },
          { k: "event", pts: [[40, 14], [31, 14], [22, 14], [22, 10]], t: "Khách sự kiện" },
          { k: "event", pts: [[34, 17], [20, 17], [20, 20]], t: "" },
          { k: "book", pts: [[1.5, 70], [7, 70], [11.5, 73], [12, 79], [15.5, 81.3]], t: "Sách mới → tời" },
          { k: "staff", pts: [[27, 91], [17, 89], [16, 85], [16, 83.5]], t: "Nhân viên" }
        ],
        locks: "Ngoài giờ mở: hẻm, sân vào, nhà sự kiện, cà phê, sảnh, WC, trưng bày. Khóa: cổng từ giữa sảnh trưng bày và nhà đọc, cửa tài liệu địa phương, mượn trả. Thang Bắc có cửa ngoài để lên phòng chuyên đề."
      },
      {
        k: "t2", z: 4.95, title: "Tầng 2 · +4.950 · phòng chuyên đề, đọc mở, học nhóm, văn phòng",
        rooms: [
          { id: "TN", c: "TN", n: "Thang Bắc", g: "core", st: "u", r: [6, 26, 8, 3.5], nz: -1, to: [["D4", 1.2, "", 0.75]] },
          { id: "D4", c: "D4", n: "Sinh hoạt chuyên đề", g: "D", r: [6, 29.5, 8, 9.5], nz: 2, night: 1, ch: 3.6, seat: 24, to: [["HL7", 1.2, "", 0.75]] },
          { id: "HL7", c: "HL7", n: "Sảnh chuyên đề", g: "circ", r: [6, 39, 8, 3], nz: 2, night: 1, to: [["B1c", 1.2, "k"]] },
          { id: "B1c", c: "B1", n: "Đọc nhìn sân Bắc", g: "B", r: [14, 38, 16, 8], nz: 1, ch: 3.6, shelf: 0.35, to: [["B1d", "o"]] },
          { id: "TW", c: "TW", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [8, 46, 6, 7], nz: -1, to: [["B1d", 1.6, "", 0.6]] },
          { id: "E5b", c: "E5", n: "WC", g: "E", r: [8, 53, 6, 3], nz: -1, ch: 3, to: [["HL8", 1.2]] },
          { id: "HL8", c: "HL8", n: "Sảnh WC", g: "circ", r: [8, 56, 6, 2], nz: 2, to: [["B1e", "o"], ["B1i", "o"]] },
          { id: "B1d", c: "B1", n: "Đọc mở chính", g: "B", r: [14, 46, 18, 8.5], nz: 1, ch: 3.6, main: 1, shelf: 0.35, to: [["B1e", "o"]] },
          { id: "B1e", c: "B1", n: "Kệ dọc hành lang", g: "B", r: [14, 54.5, 11, 3.5], nz: 1, ch: 3.6, kind: "ke", to: [["TSE", 1.2], ["B4b", 0.9], ["B4c", 0.9], ["B4d", 0.9, "", 0.3]] },
          { id: "TSE", c: "TSE", n: "Thang Đông Nam", g: "core", st: "u", r: [25, 54.5, 7, 3.5], nz: -1 },
          { id: "B1i", c: "B1", n: "Góc đọc", g: "B", r: [10, 58, 4, 8], nz: 2, ch: 3.6, to: [["B4a", 0.9], ["E1", 1.2, "k"]] },
          { id: "B4a", c: "B4", n: "Nhóm 1", g: "B", r: [14, 58, 3, 8], nz: 2, ch: 3 },
          { id: "B4b", c: "B4", n: "Nhóm 2", g: "B", r: [17, 58, 3, 8], nz: 2, ch: 3 },
          { id: "B4c", c: "B4", n: "Nhóm 3", g: "B", r: [20, 58, 3, 8], nz: 2, ch: 3 },
          { id: "B4d", c: "B4", n: "Nhóm 4", g: "B", r: [23, 58, 3, 8], nz: 2, ch: 3 },
          { id: "E1", c: "E1", n: "Văn phòng", g: "E", r: [6, 66, 8, 10], nz: 1, ch: 3.4, to: [["HL_S4", 1.2]] },
          { id: "E2", c: "E2", n: "Phòng nhân viên", g: "E", r: [6, 76, 6, 6], nz: 1, ch: 3.4, to: [["HL_S4", 1.0]] },
          { id: "HL_S4", c: "HL_S4", n: "Hành lang", g: "circ", r: [12, 76, 2, 6], nz: 1, to: [["TS", 1.2]] },
          { id: "TS", c: "TS", n: "Thang Nam + tời sách", g: "core", st: "u+b", r: [14, 78, 8, 5], nz: -1, to: [["C2", 1.2], ["HL_S3", 1.2]] },
          { id: "C2", c: "C2", n: "Xử lý nghiệp vụ", g: "C", r: [22, 78, 8, 8], nz: 1, ch: 3.4 },
          { id: "HL_S3", c: "HL_S3", n: "Sảnh", g: "circ", r: [14, 83, 4, 3], nz: 1, to: [["E5d", 0.9]] },
          { id: "E5d", c: "E5", n: "WC nhân viên", g: "E", r: [18, 83, 4, 3], nz: -1, wc: "WC nhân viên" }
        ],
        out: [{ r: [10, 18, 16, 8], t: "mái cỏ" }, { r: [26, 22, 8, 16], t: "mái cỏ", v: 1 }, { r: [26, 62, 8, 16], t: "mái cỏ", v: 1 }],
        paths: [
          { k: "visitor", pts: [[11, 52], [17, 50], [22, 42], [26, 50], [20, 56], [15.5, 60]], t: "Lên thang chính → đọc → nhóm" },
          { k: "event", pts: [[10, 28.5], [10, 33]], t: "Chuyên đề ngoài giờ" },
          { k: "book", pts: [[15.5, 81.3], [23, 81], [26, 82]], t: "Tời → nghiệp vụ" }
        ],
        locks: "Ngoài giờ chỉ mở phòng chuyên đề, đi lên bằng thang Bắc. Khóa cửa giữa sảnh chuyên đề và phòng đọc, cửa văn phòng."
      },
      {
        k: "t3", z: 9.45, title: "Tầng 3 · +9.450 · đọc yên tĩnh trên cao nhất",
        rooms: [
          { id: "TW", c: "TW", n: "Thang chính + thang máy", g: "core", st: "u+l", r: [8, 46, 6, 7], nz: -1, to: [["B2", 1.2, "", 0.7], ["B1g", 1.2]] },
          { id: "B1g", c: "B1", n: "Kệ sách", g: "B", r: [8, 53, 6, 5], nz: 1, ch: 3.6, kind: "ke", to: [["B1f", "o"]] },
          { id: "B2", c: "B2", n: "Đọc yên tĩnh", g: "B", r: [14, 46, 18, 8.5], nz: 0, ch: 3.6, seat: 44, to: [["B1f", 1.6, "", 0.3]], ex: [["N", 1.8, "s", 0.5]] },
          { id: "B1f", c: "B1", n: "Bàn đọc dọc kính Nam", g: "B", r: [14, 54.5, 11, 3.5], nz: 1, ch: 3.6, to: [["TSE", 1.2]] },
          { id: "TSE", c: "TSE", n: "Thang Đông Nam", g: "core", st: "u", r: [25, 54.5, 7, 3.5], nz: -1 }
        ],
        out: [{ r: [14, 38, 16, 8], t: "SÂN MÁI ĐỌC · ra từ phòng đọc yên tĩnh" }],
        paths: [{ k: "visitor", pts: [[11, 51], [16, 50], [24, 50]], t: "" }],
        locks: "Ngoài giờ đóng."
      }
    ]
  });
})(window.G3);
