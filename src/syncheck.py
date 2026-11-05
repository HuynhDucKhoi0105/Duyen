import re,subprocess,sys
s=open("/Users/khoihuynh/Documents/Duyên/so-do-phuong-an-mat-tien.html").read()
scripts=re.findall(r'<script>(.*?)</script>', s, re.S)
d='/tmp/claude-501/-Users-khoihuynh-Documents-Duy-n/e338e5b2-6d13-4c80-beee-6c4ff3e87ff4/scratchpad/'
bad=0
for i,sc in enumerate(scripts):
    open(d+'_sc.js','w').write(sc)
    r=subprocess.run(['node','-e',"new Function(require('fs').readFileSync('%s_sc.js','utf8'))"%d],capture_output=True,text=True)
    if r.returncode: bad+=1; print(i,len(sc),r.stderr[:400])
print(len(scripts),'scripts', 'bad',bad, 'chars',len(s))
