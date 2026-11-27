import base64,sys
b=lambda f: base64.b64encode(open(f,'rb').read()).decode()
s=open('/home/claude/bob/template.html').read()
s=s.replace('__IMG__',b('/home/claude/bob/bob.webp')).replace('__PACK__',b('/home/claude/bob/pack.png')).replace('__BG__','0.7333,0.7176,0.6863')
open('/home/claude/bob/index.html','w').write(s)
# test variant: force a tilt + squash to check the deformation
t=s.replace("var idle = now - lastMove > 2500;","var idle = false; tgtX = 0.9; tgtY = -0.5;")
open('/home/claude/bob/test.html','w').write(t)
