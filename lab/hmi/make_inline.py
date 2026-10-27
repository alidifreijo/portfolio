# hmi.html -> hmi-inline.html : every <img src="a/x.svg"> becomes inline <svg> so its paths can be drawn
import re, os
D = os.path.dirname(os.path.abspath(__file__))
s = open(f'{D}/hmi.html').read()
n = [0]
def rep(m):
    name, rest = m.group(1), m.group(2)
    n[0] += 1; p = f'i{n[0]}_'
    svg = open(f'{D}/a/{name}.svg').read()
    svg = re.sub(r'<\?xml[^>]*>', '', svg)
    ids = re.findall(r'id="([^"]+)"', svg)
    for i in sorted(set(ids), key=len, reverse=True):
        svg = svg.replace(f'id="{i}"', f'id="{p}{i}"').replace(f'url(#{i})', f'url(#{p}{i})').replace(f'href="#{i}"', f'href="#{p}{i}"')
    st = re.search(r'style="([^"]*)"', rest)
    extra = st.group(1) if st else ''
    svg = re.sub(r'<svg ', f'<svg class="inl" data-a="{name}" ', svg, count=1)
    svg = re.sub(r'(<svg[^>]*?) style="[^"]*"', r'\1', svg, count=1)
    svg = re.sub(r'(<svg[^>]*?) width="[^"]*" height="[^"]*"', r'\1', svg, count=1)
    if extra: svg = svg.replace('<svg ', f'<svg style="{extra}" ', 1)
    return svg
s = re.sub(r'<img src="a/(\w+)\.svg"([^>]*)>', rep, s)
s = s.replace('</style>', '.inl{display:block;width:100%;height:100%;overflow:visible}\n</style>', 1)
open(f'{D}/hmi-inline.html', 'w').write(s)
print('inlined', n[0])
