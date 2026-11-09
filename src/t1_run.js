const G = require("./t1_gen.js"); for (const f of process.argv.slice(2)) require("./" + f);
for (const I of G.IDEAS) { const R = G.CHK.check(I); console.log("==", I.code, I.name); for (const o of R.out) console.log(o.ok ? " ok " : (o.hard ? " !! " : " ?? "), o.t); const s = R.sum; console.log("  ", Object.entries(s).map(([k, v]) => k + ":" + v.toFixed(0)).join(" ")); }
