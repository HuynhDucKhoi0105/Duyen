// Kiểm tra mặt bằng phương án chốt. Chạy: node check_p6.js [A|B]
const fs = require("fs");
global.window = {};
const dir = __dirname;
for (const f of ["g3_ideas.js", "g3_roles.js", "g3_ideas2.js", "g4a.js", "g4b.js", "g6_kit.js", "g3_prep.js"]) eval(fs.readFileSync(dir + "/" + f, "utf8"));
const html = fs.readFileSync("/Users/khoihuynh/Documents/Duyên/so-do-phuong-an-mat-tien.html", "utf8");
const D = eval("(" + html.slice(html.indexOf("const D = {") + 10, html.indexOf("/*END*/")).trim().replace(/;\s*$/, "") + ")");
window.G3.P5 = require(dir + "/p5_core.js");
const P6 = require(dir + "/p6_core.js");
// một file đang viết dở (của ý tưởng khác) không được làm hỏng lần kiểm tra này
for (const f of fs.readdirSync(dir).filter(f => /^chot_.*\.js$/.test(f)).sort()) { try { eval(fs.readFileSync(dir + "/" + f, "utf8")); } catch (e) { console.log(`  (bỏ qua ${f}: ${e.message})`); } }
const want = process.argv[2];
let bad = 0;
for (const plan of window.G3.CHOT) {
  if (want && plan.code !== want) continue;
  if (plan.idea) { const P = window.G3.prep(plan.idea); console.log(`  khối 3D: ${P.V.length} khối · sàn ${P.tot.toFixed(0)} m² · cao +${P.H.toFixed(1)} · chủ – phụ: chính ${Math.round(window.G3.hier(P).pa * 100)}% sàn · cột chống thêm ${P.props}`); }
  const R = P6.analyse(plan, D);
  console.log(`\n=== ${plan.code} · ${plan.name} · tổng sàn ${R.total.toFixed(0)} m² · sử dụng ${R.use.toFixed(0)} · giao thông ${R.circ.toFixed(0)}`);
  R.levels.forEach((M, i) => {
    console.log(`  ${M.k}: vỏ ${M.env.toFixed(0)} · phòng ${M.rooms.toFixed(0)} · thang bộ ${M.stairs} · xa nhất ${M.far.toFixed(1)} m (${M.farRoom}) · cửa ${M.doors.doors.length}`);
    for (const e of M.err) { console.log("    ✗", e); bad++; }
    for (const w of M.warn) console.log("    ·", w);
  });
  console.log("  Mã   đề   vẽ   lệch | chỗ đề/vẽ");
  for (const c of Object.keys(D.target)) {
    const t = D.target[c], v = R.byCode[c] || 0, p = (v - t) / t * 100;
    console.log(`  ${c.padEnd(4)} ${String(t).padStart(4)} ${v.toFixed(0).padStart(4)} ${(p >= 0 ? "+" : "") + p.toFixed(0).padStart(3)}% ${D.seats[c] ? `${D.seats[c]}/${R.seats[c] || 0}` : ""}${Math.abs(p) > 10 ? "  <--" : ""}`);
  }
  console.log("  Nhóm:", ["A", "B", "C", "D", "E"].map(z => `${z} ${Math.round(R.byZone[z] || 0)}`).join(" · "), "· người trực theo tình huống", JSON.stringify(R.staff));
  for (const e of R.err) { console.log("  ✗", e); bad++; }
  for (const w of R.warn) console.log("  ·", w);
  // diện tích từng phòng
  if (process.argv.includes("rooms")) for (const L of plan.levels) for (const z of L.rooms) console.log(`   ${L.k} ${z.id.padEnd(6)} ${String(z.c || "").padEnd(4)} ${z.a.toFixed(1).padStart(6)} m² ${z.furn ? z.furn.seats + " chỗ" : ""}`);
}
console.log(bad ? `\n${bad} lỗi` : "\nTất cả ổn");
