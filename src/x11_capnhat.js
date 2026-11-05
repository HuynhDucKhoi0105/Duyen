/* ================= Báo có bản mới: trang đang mở tự kiểm tra version.json trên web, có bản mới thì hiện thanh "Tải lại" =================
   Mỗi lần dựng trang, rebuild_g6.py ghi mã bản (window.ARC_BUILD) vào trang và vào version.json của repo. Chỉ chạy khi trang mở từ web (Vercel),
   trên claude.ai trang tự nạp lại khi có phiên bản mới nên không cần. */
(function () {
  const mine = window.ARC_BUILD;
  if (!mine || !/^https?:$/.test(location.protocol) || /claude\.ai|claudeusercontent|localhost|127\.0\.0\.1/.test(location.hostname)) return;
  let shown = false;
  function bar(when) {
    if (shown) return; shown = true;
    const b = document.createElement("div");
    b.setAttribute("role", "status");
    b.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;display:flex;gap:12px;align-items:center;max-width:calc(100% - 32px);padding:10px 14px;border-radius:12px;background:var(--accent,#1f6f5c);color:#fff;font:14px/1.4 var(--body,system-ui);box-shadow:0 6px 24px rgba(0,0,0,.25)";
    b.innerHTML = `<span>Trang vừa được cập nhật${when ? " lúc " + when : ""}. Bản xếp khối của bạn vẫn được giữ.</span>`;
    const r = document.createElement("button"); r.type = "button"; r.textContent = "Tải lại";
    r.style.cssText = "font:inherit;font-weight:700;padding:6px 12px;border-radius:8px;border:0;background:#fff;color:var(--accent,#1f6f5c);cursor:pointer";
    r.onclick = () => location.reload();
    const x = document.createElement("button"); x.type = "button"; x.textContent = "×"; x.setAttribute("aria-label", "Đóng");
    x.style.cssText = "font:inherit;font-size:18px;padding:0 4px;border:0;background:none;color:#fff;cursor:pointer";
    x.onclick = () => b.remove();
    b.append(r, x); document.body.appendChild(b);
  }
  async function check() {
    try {
      const v = await (await fetch("version.json?t=" + Date.now(), { cache: "no-store" })).json();
      if (v && v.build && v.build !== mine) bar(v.at ? new Date(v.at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "");
    } catch (e) { /* mất mạng hoặc chưa có file: thử lại lần sau */ }
  }
  setInterval(check, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
  setTimeout(check, 5000);
})();
