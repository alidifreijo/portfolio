// Makes the static preview build work from any folder (no server):
// rewrites root-absolute links to relative ones and adds .html to pages.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
const out = 'dist-static';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(out);
const pages = new Set(files.filter((f) => f.endsWith('.html')).map((f) => '/' + relative(out, f).replace(/\.html$/, '').replace(/index$/, '').replace(/\/$/, '')));
for (const f of files.filter((f) => /\.(html|css|js)$/.test(f))) {
  const depth = relative(out, dirname(f)).split('/').filter(Boolean).length;
  const pre = depth ? '../'.repeat(depth) : './';
  let s = readFileSync(f, 'utf8');
  s = s.replace(/(href|src|poster|content|data-src)=("|')\/(?!\/)([^"']*)\2/g, (m, a, q, p) => {
    const clean = '/' + p.replace(/\/$/, '');
    if (a === 'href' && (pages.has(clean) || clean === '/')) {
      const target = clean === '/' ? 'index.html' : clean.slice(1) + (pages.has(clean) && files.includes(join(out, clean.slice(1), 'index.html')) ? '/index.html' : '.html');
      return `${a}=${q}${pre}${target}${q}`;
    }
    return `${a}=${q}${pre}${p}${q}`;
  });
  s = s.replace(/url\((["']?)\/(?!\/)/g, (m, q) => `url(${q}${f.endsWith('.css') ? '../'.repeat(relative(out, dirname(f)).split('/').filter(Boolean).length) || './' : pre}`);
  writeFileSync(f, s);
}
console.log('relativized', files.length, 'files');
