
/* ================= Đợt 1: khối chính / khối phụ ================= */
/* main: vùng [x1, y1, x2, y2, z1, z2]; khối có tâm nằm trong vùng là khối chính, còn lại là khối phụ.
   roleOf: gán riêng khi vùng không tách được. lab: nhãn (1 = khối chính, 2 = khối phụ). extra: khối thêm. */
(function (G) {
  const { B, H } = G.K;
  const P = {
    rangcua: { main: [[5.5, 21, 30.5, 79, 4.9, 13]], lab: [[18, 50, 12.6, "Khối chính · Xưởng đọc mái răng cưa", 1], [18, 30, 12.2, "Kính mái hướng Bắc"], [29, 70, 2.5, "Khối phụ · Đế gạch tầng 1", 2], [35.5, 37, 11, "Khối phụ · Cổng cẩu", 2]] },
    chop: { main: [[6, 38, 30, 74, 0, 30]], lab: [[18, 56, 15, "Khối chính · Cụm nhà đọc 2 tầng", 1], [18, 20, 10.5, "Khối phụ · Nhà sự kiện", 2], [12, 32, 10, "Khối phụ · Nhà sảnh", 2], [18, 80, 15, "Khối phụ · Nhà thiếu nhi, hỗ trợ", 2], [24, 44, 0.5, "Sân giữa làng"]] },
    vom: { main: [[5.5, 29.9, 30.5, 78.5, 0, 14]], extra: [B(30, 33, 4, 10, 0.45, 4.45, "glass", "A", { op: 0.8 })], lab: [[18, 54, 13.3, "Khối chính · Nhà đọc dưới vòm", 1], [18, 22, 13.3, "Khối phụ · Phòng đa năng trần vòm", 2], [32, 38, 4.45, "Khối phụ · Sảnh kính", 2], [30, 66, 11.5, "Ô kính bán nguyệt nhìn sông"]] },
    ruong: { main: [[2.5, 12.5, 35.5, 83.5, 0, 20]], extra: [B(10, 2, 14, 9, 0.45, 4.45, "deck", "A"), H(9, 1, 16, 11, 4.45, 7.5, "warn"), B(12, 86, 14, 9, 0.45, 4.45, "deck", "B"), H(11, 85, 16, 11, 4.45, 7.5, "warn")], lab: [[19, 48, 17, "Khối chính · Mái rường 4 dốc", 1], [34, 60, 9.6, "Hiên sâu 5 m"], [19, 48, 11.5, "Gác đọc dưới mái"], [17, 6, 7.5, "Khối phụ · Nhà trà đầu hồi", 2], [19, 90, 7.5, "Khối phụ · Nhà đọc thiếu nhi", 2]] },
    guol: { roleOf: v => v.c === "glass" || v.k === "slab" || (v.y != null && v.y < 25) ? "p" : "m", lab: [[19, 57, 18.3, "Khối chính · Nhà sàn đọc sách", 1], [18, 14, 18, "Khối phụ · Nhà Gươl (phòng đa năng)", 2], [18, 41, 4.45, "Khối phụ · Hộp kính gầm sàn", 2], [24, 60, 1, "Gầm sàn: sân đọc ngoài trời"], [34, 50, 3, "Cầu thang lên sàn"]] },
    cau: { main: [[5.9, 23.9, 30.1, 76.1, 5.4, 14.6]], lab: [[18, 50, 14.6, "Khối chính · Hộp đọc treo", 1], [18, 30, 30, "Khối phụ · Hai trụ tháp", 2], [18, 51, 5, "Khối phụ · Phòng đa năng", 2], [18, 33, 5, "Khối phụ · Sảnh kính", 2], [24, 66, 0.5, "Quảng trường dưới gầm"]] },
    ban: { main: [[3.9, 17.9, 34.1, 82.1, 5.4, 10]], lab: [[19, 72, 9.95, "Khối chính · Mặt bàn đọc", 1], [18, 32, 3, "Khối phụ · Chân bàn (lõi thang)", 2], [14, 32, 13.5, "Khối phụ · Hai cuốn sách", 2], [19, 41, 4.95, "Khối phụ · Hộp kính dưới gầm", 2]] },
    haivan: { main: [[5.9, 41.5, 28.1, 86.1, 0, 15]], roleOf: v => v.zone === "L" || v.k === "slab" ? "p" : null, lab: [[17, 72, 13, "Khối chính · Sườn Nam (khu đọc)", 1], [17, 22, 13.5, "Khối phụ · Sườn Bắc (sự kiện, sảnh)", 2], [20, 44.5, 3.5, "Khối phụ · Khe đèo, bậc lên tầng 2", 2], [15, 42.5, 8.6, "Cầu kính"]] },
    amduong: { main: [[5.9, 13.9, 32.1, 86.1, 4.9, 14]], lab: [[25, 50, 13.95, "Khối chính · Chữ L kính (dương)", 1], [12, 50, 4.95, "Khối phụ · Chữ L đá (âm)", 2], [25, 44, 4.45, "Khối phụ · Hộp đèn sảnh", 2], [31, 46, 2.2, "Hiên cột thoáng"]] },
    phap: { main: [[7, 15, 31, 81, 0, 14]], lab: [[19, 48, 12.5, "Khối chính · Nhà mái ngói", 1], [33.4, 40, 5.6, "Khối phụ · Hành lang vòm 10 nhịp", 2], [19, 22, 5, "Phòng đa năng"]] },
    phohoi: { main: [[5, 26, 33, 75, 0, 15]], lab: [[20, 50, 12, "Khối chính · Dãy 8 nhà ống", 1], [19, 20, 7, "Khối phụ · Nhà sự kiện (gộp 2 nhà)", 2], [19, 82, 8, "Khối phụ · Nhà kho, hỗ trợ", 2], [32, 41, 3.5, "Mái hiên"]] },
    ke: { roleOf: v => v.zone === "X" ? "m" : "p", lab: [[28, 40, 9.95, "Khối chính · Khung kệ (tường chịu lực)", 1], [26, 58, 2.5, "Khối phụ · Các cuốn sách (phòng)", 2]] },
    o: { roleOf: v => v.z1 >= 9.4 || (v.z1 >= 4.9 && v.x > 23) ? "p" : "m", lab: [[26, 46, 9.45, "Khối chính · Lưới ô 8 × 8 m", 1], [32, 40, 7, "Khối phụ · Ô kéo ra 2 m", 2], [18, 56, 12.45, "Khối phụ · Chòi đọc trên mái", 2], [14, 22, 4.95, "Sự kiện 16 × 16 m không cột"]] },
    hop: { roleOf: v => v.w === 2.4 || v.zone === "D" ? "p" : "m", lab: [[18, 50, 9.95, "Khối chính · Hộp sách", 1], [32.4, 46.5, 7.6, "Khối phụ · 16 hộp đọc màu", 2], [18, 18, 4.95, "Khối phụ · Hộp sự kiện", 2]] },
    den: { main: [[3.9, 21, 34.1, 79, 4.9, 15]], lab: [[33, 50, 11, "Khối chính · Đèn lồng", 1], [30, 70, 2.4, "Khối phụ · Bệ đá", 2], [36, 64, 4.6, "Khối phụ · Đèn lồng con", 2], [19, 50, 14.6, "Nắp đèn, mái"]] },
    bac: { main: [[5.9, 13.9, 32.1, 84.1, 0, 4.9]], lab: [[27, 46, 2.7, "Khối chính · Bậc thứ nhất và khán đài", 1], [17, 62, 7.2, "Khối phụ · Tầng 2, khán đài thứ hai", 2], [11, 27, 12.45, "Khối phụ · Chòi ngắm sông", 2], [27, 46, 0.6, "Phòng đa năng dưới bậc"]] },
    ngu: { main: [[5.9, 43.9, 30.1, 68.1, 0, 20]], lab: [[10, 56, 17.5, "Khối chính · Núi Thủy", 1], [18, 18, 7.5, "Khối phụ · Núi Kim (sự kiện)", 2], [18, 34, 7.5, "Khối phụ · Núi Mộc (sảnh)", 2], [18, 76, 7.5, "Khối phụ · Núi Hỏa (thiếu nhi)", 2], [14, 88, 9, "Khối phụ · Núi Thổ", 2]] },
    cong: { main: [[5.9, 21.9, 34.1, 76.1, 4.9, 12]], lab: [[20, 40, 11.8, "Khối chính · Cầu đọc", 1], [18, 20, 4.95, "Khối phụ · Khối Bắc (sự kiện, sảnh)", 2], [18, 80, 4.95, "Khối phụ · Khối Nam (thiếu nhi)", 2], [34, 49, 7, "Dàn thép qua cổng"], [33, 49, 1.5, "Cổng sông Hàn"]] },
    lang: { roleOf: v => v.c === "canopy" ? "m" : "p", lab: [[30, 54, 13.6, "Khối chính · Mái đình", 1], [27, 55, 9.95, "Khối phụ · 6 ngôi nhà dưới mái", 2], [16, 55, 0.5, "Hẻm 4 m, cột mái"]] },
    vong: { main: [[5.9, 13.9, 34.1, 82.1, 0, 9.6]], extra: [B(34, 40, 5, 16, 0.45, 4.45, "glass", "A", { op: 0.8 }), B(16, 44, 8, 8, 9.45, 12.45, "lamp", "B", { fl: 1 })], lab: [[27, 48, 9.45, "Khối chính · Vòng mái xanh", 1], [36.5, 48, 4.45, "Khối phụ · Sảnh kính đón bậc thang", 2], [20, 48, 12.45, "Khối phụ · Chòi đỉnh mái", 2], [18, 66, 0.5, "Sân trong"], [20, 16, 2, "Mái dốc xuống đất"]] }
  };
  for (const I of G.ideas) if (P[I.id]) Object.assign(I, P[I.id]);
})(window.G3);
