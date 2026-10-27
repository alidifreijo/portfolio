# Inline the four stripe svgs into hmi.html as one <path> per stripe, ordered along the shape
# (from the copper end at the bottom, following the chevron up), so levels light stripe by stripe.
import re, os, math
D = os.path.dirname(os.path.abspath(__file__))
p = f'{D}/hmi.html'; s = open(p).read()
TOK = re.compile(r'([MLHVCZmlhvcz])|(-?\d*\.?\d+(?:e-?\d+)?)')
def subpaths(d):
    out, cur, pts, cmd, nums = [], '', [], None, []
    toks = TOK.findall(d)
    # rebuild strings per subpath and collect points
    i = 0; X = Y = 0
    seq = []
    for c, n in toks:
        if c: seq.append(c)
        else: seq.append(float(n))
    j = 0; sub = None
    while j < len(seq):
        t = seq[j]
        if isinstance(t, str):
            cmd = t; j += 1
            if cmd in 'Mm':
                if sub: out.append(sub)
                sub = {'d': '', 'pts': []}
            if cmd in 'Zz': sub['d'] += 'Z'; continue
            sub['d'] += cmd
            continue
        # numbers for current cmd
        if cmd in 'ML':
            X, Y = seq[j], seq[j+1]; j += 2; sub['pts'].append((X, Y)); sub['d'] += f'{X:g} {Y:g} '
        elif cmd == 'H': X = seq[j]; j += 1; sub['pts'].append((X, Y)); sub['d'] += f'{X:g} '
        elif cmd == 'V': Y = seq[j]; j += 1; sub['pts'].append((X, Y)); sub['d'] += f'{Y:g} '
        elif cmd == 'C':
            a = seq[j:j+6]; j += 6; X, Y = a[4], a[5]; sub['pts'].append((X, Y)); sub['d'] += ' '.join(f'{v:g}' for v in a) + ' '
        else: raise SystemExit('unsupported ' + cmd)
    if sub: out.append(sub)
    return out
def chain(subs):
    for q in subs:
        q['c'] = (sum(x for x, _ in q['pts'])/len(q['pts']), sum(y for _, y in q['pts'])/len(q['pts']))
    left = subs[:]; start = max(left, key=lambda q: q['c'][1]); order = [start]; left.remove(start)
    while left:
        c = order[-1]['c']; nx = min(left, key=lambda q: (q['c'][0]-c[0])**2 + (q['c'][1]-c[1])**2)
        order.append(nx); left.remove(nx)
    return order
KEY = {'subtract': 'scale-l', 'subtract1': 'scale-r', 'intersect': 'lvl-l', 'intersect1': 'lvl-r'}
for name, key in KEY.items():
    tag = f'<img src="a/{name}.svg">'
    if tag not in s: print('already inlined', name); continue
    svg = open(f'{D}/a/{name}.svg').read()
    pre = f'st{key.replace("-", "")}_'
    for i in set(re.findall(r'id="([^"]+)"', svg)):
        svg = svg.replace(f'id="{i}"', f'id="{pre}{i}"').replace(f'url(#{i})', f'url(#{pre}{i})')
    m = re.search(r'<path id="[^"]*" d="([^"]+)"([^>]*)/>', svg)
    d, attrs = m.group(1), m.group(2)
    fill = re.search(r'fill="([^"]+)"', attrs).group(1)
    order = chain(subpaths(d))
    paths = ''.join(f'<path class="sp" data-cy="{q["c"][1]:.1f}" d="{q["d"].strip()}"/>' for q in order)
    vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
    defs = re.search(r'<defs>.*</defs>', svg, re.S); defs = defs.group(0) if defs else ''
    new = f'<svg class="inl" data-a="{name}" data-st="{key}" viewBox="{vb}" preserveAspectRatio="none" overflow="visible" fill="{fill}">{paths}{defs}</svg>'
    s = s.replace(tag, new, 1); print(name, len(order), 'stripes')
# the old clip-path level rules are no longer used
s = re.sub(r'\.scale\{clip-path[^\n]*\n\.lvl-l\{[^\n]*\n\.lvl-r\{[^\n]*\n', '', s)
if '.inl{' not in s: s = s.replace('</style>', '.inl{display:block;width:100%;height:100%;overflow:visible}\n</style>', 1)
open(p, 'w').write(s)
