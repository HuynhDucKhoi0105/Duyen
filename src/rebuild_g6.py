import os, re
SP=os.path.dirname(os.path.abspath(__file__))+'/'
F='/Users/khoihuynh/Documents/Duyên/so-do-phuong-an-mat-tien.html'
import subprocess, sys
six=sorted(f for f in os.listdir(SP) if re.match(r'^g[678]_.*\.js$', f) and f!='g6_kit.js' and (len(sys.argv)<2 or f in sys.argv[1:]))
files=['g3_ideas.js','g3_roles.js','g3_ideas2.js','g4a.js','g4b.js','g6_kit.js',*six,'g3_prep.js','g3_store.js','g3_edit.js','g3_viewer.js','p6_core.js',*sorted((f for f in os.listdir(SP) if re.match(r'^chot_.*\.js$', f)), key=lambda f: [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', f)]),'g3_mount.js','p5_core.js','p5_lang3.js','p5_khe3.js','p5_cau4.js','p5_view.js','p6_khoi.js','p6_view.js','x10_xep.js','x11_capnhat.js']
js='\n'.join(open(SP+f).read() for f in files)
s=open(F).read()
tag='<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>'
i=s.index(tag)+len(tag); j=s.index('</script>',i)
s=s[:i]+js+s[j:]
g4b='Phát triển 6 ý tưởng<small>29 khối, nắng, gió, mặt đứng</small></button>'
if 'role="tab" data-tab="g5"' not in s:
    i=s.index(g4b)+len(g4b); s=s[:i]+'\n    <button type="button" role="tab" data-tab="g5" aria-selected="false">3 khối chọn → mặt bằng<small>mặt bằng từng tầng, so với đề</small></button>'+s[i:]
if 'data-panel="g5" hidden' not in s:
    b='<div class="tab" data-panel="g4" hidden><div id="g4-host"></div></div>'
    i=s.index(b)+len(b); s=s[:i]+'\n<div class="tab" data-panel="g5" hidden><div id="g5-host"></div></div>'+s[i:]
if 'role="tab" data-tab="g6"' not in s:
    a='3 khối chọn → mặt bằng<small>mặt bằng từng tầng, so với đề</small></button>'
    i=s.index(a)+len(a); s=s[:i]+'\n    <button type="button" role="tab" data-tab="g6" aria-selected="false">Đợt mới: trụ nghiêng, treo so le<small>hộp bỏ vỏ, theo ảnh mẫu, tự xếp khối</small></button>'+s[i:]
if 'role="tab" data-tab="g7"' not in s:
    a='hộp bỏ vỏ, theo ảnh mẫu, tự xếp khối</small></button>'
    i=s.index(a)+len(a); s=s[:i]+'\n    <button type="button" role="tab" data-tab="g7" aria-selected="false">40 ý tưởng từ công trình đạt giải<small>khối nghệ thuật, có nguồn tham khảo</small></button>'+s[i:]
if 'role="tab" data-tab="g8"' not in s:
    a='khối nghệ thuật, có nguồn tham khảo</small></button>'
    i=s.index(a)+len(a); s=s[:i]+'\n    <button type="button" role="tab" data-tab="g8" aria-selected="false">Đợt 2–3 tầng<small>theo 9 ảnh mẫu và 6 phương án đã ghim</small></button>'+s[i:]
if 'data-panel="g6" hidden' not in s:
    b='<div class="tab" data-panel="g5" hidden><div id="g5-host"></div></div>'
    i=s.index(b)+len(b); s=s[:i]+'\n<div class="tab" data-panel="g6" hidden><div id="g6-host"></div></div>'+s[i:]
if 'data-panel="g8" hidden' not in s and 'data-panel="g7" hidden' in s:
    b='<div class="tab" data-panel="g7" hidden><div id="g7-host"></div></div>'
    i=s.index(b)+len(b); s=s[:i]+'\n<div class="tab" data-panel="g8" hidden><div id="g8-host"></div></div>'+s[i:]
if 'role="tab" data-tab="g9"' not in s:
    a='theo 9 ảnh mẫu và 6 phương án đã ghim</small></button>'
    i=s.index(a)+len(a); s=s[:i]+'\n    <button type="button" role="tab" data-tab="g9" aria-selected="false">Phương án chốt · mặt bằng<small>khe chéo 2.1: nội thất, cửa, giao thông, 4 tình huống</small></button>'+s[i:]
if 'data-panel="g9" hidden' not in s and 'data-panel="g8" hidden' in s:
    b='<div class="tab" data-panel="g8" hidden><div id="g8-host"></div></div>'
    i=s.index(b)+len(b); s=s[:i]+'\n<div class="tab" data-panel="g9" hidden><div id="g9p-host"></div><div id="g9-host" style="margin-top:48px"></div></div>'+s[i:]
if 'data-panel="g7" hidden' not in s:
    b='<div class="tab" data-panel="g6" hidden><div id="g6-host"></div></div>'
    i=s.index(b)+len(b); s=s[:i]+'\n<div class="tab" data-panel="g7" hidden><div id="g7-host"></div></div>'+s[i:]
# mũi tên Bắc ở các sơ đồ mặt bằng cũ xoay theo góc lệch
old='el("path", { d: `M${nx} ${ny - 14} L${nx + 7} ${ny + 7} L${nx} ${ny + 3} L${nx - 7} ${ny + 7} Z`, fill: "var(--ink)" }, lab);'
new='el("path", { d: `M${nx} ${ny - 14} L${nx + 7} ${ny + 7} L${nx} ${ny + 3} L${nx - 7} ${ny + 7} Z`, fill: "var(--ink)", transform: `rotate(${window.ARC_NORTH != null ? window.ARC_NORTH : 20} ${nx} ${ny})` }, lab);'
s=s.replace(old,new)
if 'window.ARC_NORTH=' not in s:
    k=s.index('<script>')
    s=s[:k]+'<script>try{window.ARC_NORTH=JSON.parse(localStorage.getItem("arc329.north")??"20")}catch(e){window.ARC_NORTH=20}</script>\n'+s[k:]
if 'role="tab" data-tab="g10"' not in s:
    a=s.index('role="tab" data-tab="g9"'); a=s.index('</button>',a)+len('</button>')
    s=s[:a]+'\n    <button type="button" role="tab" data-tab="g10" aria-selected="false">Tự xếp khối<small>20 khối A1–E6 theo diện tích đề, kéo thả, gửi Claude</small></button>'+s[a:]
if 'data-panel="g10" hidden' not in s:
    b='<div id="g9-host" style="margin-top:48px"></div></div>'
    i2=s.index(b)+len(b); s=s[:i2]+'\n<div class="tab" data-panel="g10" hidden><div id="x10-host"></div></div>'+s[i2:]
s=re.sub(r'Phương án chốt · mặt bằng<small>[^<]*</small>','Phương án chốt · mặt bằng<small>'+('S.1–S.16 khối vuông 2–3 tầng, cùng các đợt trước' if os.path.exists(SP+'chot_s16.js') else 'S.1–S.6 khối vuông 2–3 tầng, cùng các đợt trước' if os.path.exists(SP+'chot_s1.js') else 'khe Hải Vân, hộp xếp: nội thất, cửa, giao thông')+'</small>',s)
# tab "Yêu cầu của thầy": nội dung tĩnh từ yc_thay.html, thay lại mỗi lần dựng
if 'role="tab" data-tab="yc"' not in s:
    a=s.index('<button type="button" role="tab" data-tab="g9"')
    s=s[:a]+'<button type="button" role="tab" data-tab="yc" aria-selected="false">Yêu cầu của thầy<small>mình đang ghi nhớ gì, bạn soát giúp</small></button>\n    '+s[a:]
YC=open(SP+'yc_thay.html').read()
s=re.sub(r'\n<div class="tab" data-panel="yc" hidden>.*?<!--/yc--></div>','',s,flags=re.S)
b='<div class="tab" data-panel="g9" hidden>'
i3=s.index(b); s=s[:i3]+'<div class="tab" data-panel="yc" hidden>'+YC+'<!--/yc--></div>\n'+s[i3:]
# mã bản dựng: trang đang mở so với version.json trên web để báo "Tải lại"
import time, json, re as _re
BUILD=time.strftime('%Y%m%d-%H%M%S')
s=_re.sub(r'<script>window.ARC_BUILD="[^"]*"</script>\n','',s)
k=s.index('<script>'); s=s[:k]+'<script>window.ARC_BUILD="'+BUILD+'"</script>\n'+s[k:]
open(F,'w').write(s)
_R='/Users/khoihuynh/Documents/Duyên/arc329-thu-vien/'
if os.path.isdir(_R): open(_R+'version.json','w').write(json.dumps({'build':BUILD,'at':time.strftime('%Y-%m-%dT%H:%M:%S%z')}))
print('ok',len(s), 'files', len(files), six)
if os.environ.get('TEST'):
    open(SP+'_test.html','w').write('<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<script>/* chỉ bản thử: ô trình duyệt ẩn thì rAF không chạy */ if (location.search.includes("raf")) window.requestAnimationFrame = f => setTimeout(() => f(performance.now()), 30);</script>\n'+s)

# chép mã nguồn sang repo để GitHub luôn giữ bản mới nhất (thư mục nháp chỉ là tạm)
import shutil, glob
REPO='/Users/khoihuynh/Documents/Duyên/arc329-thu-vien/src/'
if os.path.isdir(REPO):
    for f in files+['rebuild_g6.py','check_p6.js','check_g6.js','syncheck.py','yc_thay.html']:
        if os.path.exists(SP+f): shutil.copy(SP+f, REPO+f)
    for f in glob.glob(REPO+'chot_*.js'):
        if not os.path.exists(SP+os.path.basename(f)): os.remove(f)
