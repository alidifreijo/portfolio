// Check · the design system can't be skipped.
//
// Runs before every build. Fails if the code uses a colour, font size,
// font family, radius, spacing or shadow that isn't a token, uses a blur or
// a gradient, uses a v2 legacy token, or if the component manifest and the
// system components disagree.
//
// Old pages (rebuilt in blocks 2-4) have a recorded debt in
// src/styles/system-debt.json: per file and rule, how many breaks they
// already had. A file may never go above its debt; a file that isn't listed
// must have none. When a page is rebuilt, run `npm run check:system -- --shrink`
// to lower its debt. The debt can only go down: --shrink refuses to raise it.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DEBT = 'src/styles/system-debt.json';
const MANIFEST = 'src/components/system/manifest.json';
const SYSTEM_DIR = 'src/components/system';
const SKIP = new Set(['src/styles/tokens.css', 'src/styles/legacy-tokens.css', 'src/styles/tokens.json']);
const args = process.argv.slice(2);
const shrink = args.includes('--shrink');
const init = args.includes('--init');

const tokensCss = readFileSync('src/styles/tokens.css', 'utf8');
const legacyCss = readFileSync('src/styles/legacy-tokens.css', 'utf8');
const names = (css) => new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const TOKENS = names(tokensCss);
const LEGACY = names(legacyCss);
for (const t of TOKENS) LEGACY.delete(t);

const FS = new Set(['--fs-display', '--fs-section', '--fs-chapter', '--fs-text', '--fs-label']);
const FONTS = new Set(['--font-serif', '--font-ui', '--font-body']);
const KEYWORDS = /^(inherit|initial|unset|currentColor|transparent|none|0|1em|100%|normal)$/i;

// ---------- the rules ----------
// Each rule gets one CSS declaration (prop, value) and says whether it breaks.
const usesOnly = (value, allowed) => {
  const vars = [...value.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
  const rest = value.replace(/var\([^()]*(\([^()]*\))*[^()]*\)/g, '').replace(/[\s,!]|important/g, '');
  return vars.length > 0 && vars.every((v) => allowed(v)) && rest === '';
};
const RULES = {
  color: {
    say: 'a colour that is not a token (use var(--ink), var(--paper), an agent pair…)',
    test: (p, v) => /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\bcolor-mix\(/i.test(v)
      || (/^(color|background(-color)?|border(-[a-z]+)*|outline(-color)?|fill|stroke|text-decoration(-color)?|caret-color|accent-color)$/.test(p)
        && /(^|[\s,(])(white|black|red|blue|green|yellow|orange|pink|purple|gray|grey|silver|navy|teal|cyan|magenta|lime|maroon|olive|aqua|fuchsia|brown|gold|beige|ivory)(?=$|[\s,)])/i.test(v.replace(/var\([^)]*\)/g, ''))),
  },
  'font-size': {
    say: 'a font size outside the five sizes (--fs-display, --fs-section, --fs-chapter, --fs-text, --fs-label)',
    test: (p, v) => p === 'font-size' && !KEYWORDS.test(v) && !usesOnly(v, (x) => FS.has(x)),
  },
  'font-family': {
    say: 'a font that is not one of the three families (--font-serif, --font-ui, --font-body)',
    test: (p, v) => (p === 'font-family' && !KEYWORDS.test(v) && !usesOnly(v, (x) => FONTS.has(x)))
      || (p === 'font' && !/^(inherit|unset|initial)$/.test(v) && !/var\(--font-(serif|ui|body)\)/.test(v)),
  },
  radius: {
    say: 'a radius that is not a token (--r-sm, --r-btn, --r-md, --r-pill)',
    test: (p, v) => /^border(-[a-z]+)*-radius$/.test(p) && !KEYWORDS.test(v) && !usesOnly(v, (x) => /^--r-/.test(x)),
  },
  spacing: {
    say: 'a padding, margin or gap in px that is not on the 4px scale (--s-1 … --s-8, --frame)',
    test: (p, v) => /^(padding|margin|gap|row-gap|column-gap)(-[a-z]+)*$/.test(p) && /(^|[\s(])([3-9]|\d{2,})(\.\d+)?px/.test(v),
  },
  shadow: {
    say: 'a shadow: only the agent card has one (var(--shadow-card))',
    test: (p, v) => (/^(box|text)-shadow$/.test(p) && !/^(none|var\(--shadow-card\))$/.test(v)) || /drop-shadow\(/.test(v),
  },
  blur: { say: 'a blur (not allowed in this identity)', test: (p, v) => /blur\(/.test(v) },
  gradient: { say: 'a gradient (not allowed in this identity)', test: (p, v) => /gradient\(/.test(v) },
  legacy: {
    say: 'a v2 legacy token (src/styles/legacy-tokens.css): use the v3 token instead',
    test: (p, v) => [...v.matchAll(/var\((--[\w-]+)/g)].some((m) => LEGACY.has(m[1])),
  },
};
// fonts that left the system can't come back, anywhere
const BANNED = [/DM Sans/i, /DM Mono/i, /Caveat/i, /@fontsource\/(dm-sans|dm-mono|caveat)/];

// ---------- read the code ----------
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk('src').filter((f) => /\.(astro|css)$/.test(f) && !SKIP.has(f));

// CSS from a file: <style> blocks and style="" attributes in .astro, all of a .css
function cssOf(file, text) {
  if (file.endsWith('.css')) return [{ css: text, offset: 0 }];
  const out = [];
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) out.push({ css: m[1], offset: m.index + m[0].indexOf(m[1]) });
  for (const m of text.matchAll(/style=(?:"([^"]*)"|\{`([^`]*)`\})/g)) { const c = m[1] ?? m[2]; out.push({ css: c, offset: m.index }); }
  return out;
}
const lineAt = (text, i) => text.slice(0, i).split('\n').length;

function scan(file) {
  const text = readFileSync(file, 'utf8');
  const hits = [];
  for (const re of BANNED) for (const m of text.matchAll(new RegExp(re, 'g'))) hits.push({ rule: 'banned-font', line: lineAt(text, m.index), src: m[0] });
  for (const { css, offset } of cssOf(file, text)) {
    const clean = css.replace(/\/\*[\s\S]*?\*\//g, (c) => ' '.repeat(c.length));
    for (const m of clean.matchAll(/([a-z-]+)\s*:\s*([^;{}]+?)\s*(?=;|}|$)/gim)) {
      const [, prop, value] = m;
      if (prop.startsWith('--')) continue; // a local variable: its use is what counts
      for (const [rule, r] of Object.entries(RULES)) {
        if (r.test(prop.toLowerCase(), value.trim())) hits.push({ rule, line: lineAt(text, offset + m.index), src: `${prop}: ${value.trim()}`.slice(0, 90) });
      }
    }
  }
  return hits;
}

const report = Object.fromEntries(files.map((f) => [f, scan(f)]));
const counts = Object.fromEntries(
  Object.entries(report).filter(([, h]) => h.length).map(([f, h]) => [f, h.reduce((a, x) => ((a[x.rule] = (a[x.rule] || 0) + 1), a), {})]),
);

// ---------- manifest ----------
const problems = [];
if (!existsSync(MANIFEST)) problems.push(`missing ${MANIFEST}`);
else {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const listed = new Set(manifest.components.map((c) => c.file));
  const onDisk = readdirSync(SYSTEM_DIR).filter((f) => f.endsWith('.astro')).map((f) => `${SYSTEM_DIR}/${f}`);
  for (const f of onDisk) if (!listed.has(f)) problems.push(`${f} is a system component but is not in the manifest`);
  for (const c of manifest.components) {
    if (!existsSync(c.file)) problems.push(`manifest lists ${c.file}, which does not exist`);
    for (const k of ['name', 'purpose', 'use', 'avoid', 'example']) if (!c[k]) problems.push(`manifest: ${c.name || c.file} has no "${k}"`);
  }
}
// system components carry no debt, ever
for (const f of Object.keys(counts)) if (f.startsWith(SYSTEM_DIR)) problems.push(`${f} breaks the system (system components can have no debt)`);

// ---------- compare with the debt ----------
const debt = existsSync(DEBT) ? JSON.parse(readFileSync(DEBT, 'utf8')).files : {};
if (init) {
  if (existsSync(DEBT)) { console.error(`✗ ${DEBT} already exists. The debt can only shrink: use --shrink.`); process.exit(1); }
  write(counts);
  console.log(`✓ recorded the debt of ${Object.keys(counts).length} old files in ${DEBT}`);
  process.exit(0);
}
const over = [];
for (const [f, c] of Object.entries(counts)) {
  for (const [rule, n] of Object.entries(c)) {
    const allowed = debt[f]?.[rule] || 0;
    if (n > allowed) over.push({ f, rule, n, allowed });
  }
}
function write(c) {
  const sorted = Object.fromEntries(Object.entries(c).sort(([a], [b]) => a.localeCompare(b)));
  const total = Object.values(sorted).reduce((a, r) => a + Object.values(r).reduce((x, y) => x + y, 0), 0);
  writeFileSync(DEBT, JSON.stringify({
    $about: 'Breaks of the design system in old pages, per file and rule. Generated by scripts/check-system.mjs. It can only go down: rebuild a page, then run npm run check:system -- --shrink.',
    total,
    files: sorted,
  }, null, 2) + '\n');
}

if (over.length || problems.length) {
  console.error('✗ design system check failed\n');
  for (const p of problems) console.error(`  · ${p}`);
  for (const { f, rule, n, allowed } of over) {
    console.error(`  · ${f}: ${n} × ${RULES[rule]?.say || 'DM Sans, DM Mono or Caveat (fonts that left the system)'}${allowed ? ` (allowed: ${allowed}, old debt)` : ''}`);
    for (const h of report[f].filter((h) => h.rule === rule).slice(0, 8)) console.error(`      line ${h.line}: ${h.src}`);
  }
  console.error('\n  Use the tokens in src/styles/tokens.css. Rules: DESIGN.md. Components: src/components/system/manifest.json.');
  if (shrink) console.error('  --shrink refused: the debt can only go down.');
  process.exit(1);
}
const before = Object.values(debt).reduce((a, r) => a + Object.values(r).reduce((x, y) => x + y, 0), 0);
const now = Object.values(counts).reduce((a, r) => a + Object.values(r).reduce((x, y) => x + y, 0), 0);
if (shrink) { write(counts); console.log(`✓ debt lowered: ${before} → ${now}`); }
else console.log(`✓ design system: no new breaks · old debt ${now}${now < before ? ` (recorded ${before}: run --shrink to lock it in)` : ''}`);
