const G = require("./t1_gen.js"); require("./t1_i1.js"); require("./t1_i2.js"); require("./t1_i3.js");
const TX = require("./t1_text.js"), fs = require("fs");
const order = ["N0", "N1", "N2", "N3"];
const out = order.map(id => { const I = G.IDEAS.find(q => q.id === id); return { ...I, ...TX[id] }; });
fs.writeFileSync(__dirname + "/t1_data.js", "/* Tab Gợi ý tầng 1: dữ liệu khối (sinh bởi t1_emit.js) */\n(function(){window.G3=window.G3||{};window.G3.T1IDEAS=" + JSON.stringify(out) + ";})();\n");
console.log("ok", out.length, out.map(o => o.code + ":" + o.blocks.length).join(" "));
