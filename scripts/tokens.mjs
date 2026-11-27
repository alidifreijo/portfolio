// Tokens · builds the code copies of the approved style.
//
// Source of truth: estilos/tokens.css (approved by Ali; changing a value
// there is a question of taste, so it needs her yes).
// Writes:
//   src/styles/tokens.css   the CSS variables every component uses
//   src/styles/tokens.json  the same tokens in the DTCG format, for agents and tools
// Run `npm run tokens` after changing estilos/tokens.css.
// `--check` changes nothing: it fails if the copies are out of date (the build uses it).
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'estilos/tokens.css';
const CSS_OUT = 'src/styles/tokens.css';
const JSON_OUT = 'src/styles/tokens.json';
const check = process.argv.includes('--check');

const src = readFileSync(SRC, 'utf8');
const root = src.match(/:root\s*\{([\s\S]*?)\n\}/);
if (!root) throw new Error(`${SRC}: no :root block`);

// Every `--name: value; /* note */` in :root, in order. Several can share a line.
const tokens = [];
for (const line of root[1].split('\n')) {
  const note = (line.match(/\/\*\s*(.*?)\s*\*\//) || [])[1] || '';
  const decl = line.replace(/\/\*.*?\*\//g, '');
  for (const m of decl.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) tokens.push({ name: m[1].slice(2), value: m[2].trim(), note });
}
const reduced = (src.match(/@media \(prefers-reduced-motion: reduce\)\s*\{\s*:root\s*\{([^}]*)\}/) || [])[1] || '';

// ---------- DTCG ----------
const hex2 = (n) => Math.round(n).toString(16).padStart(2, '0');
const toHex = (v) => {
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (!m) return v.toLowerCase();
  const a = m[4] === undefined ? '' : hex2(Number(m[4]) * 255);
  return `#${hex2(m[1])}${hex2(m[2])}${hex2(m[3])}${a}`;
};
const px = (v) => { const m = v.match(/^(-?[\d.]+)px$/); return m ? { value: Number(m[1]), unit: 'px' } : null; };
const ms = (v) => { const m = v.match(/^([\d.]+)ms$/); return m ? { value: Number(m[1]), unit: 'ms' } : null; };
// fluid sizes: the smallest value goes in $value, the real CSS in an extension
const dim = (v) => px(v) || { value: Number((v.match(/([\d.]+)px/) || [, 0])[1]), unit: 'px' };

function group(name) {
  if (/^font-/.test(name)) return ['fontFamily', name.replace(/^font-/, '')];
  if (/^(fs|lh|ls)-/.test(name)) return ['type', name];
  if (/^s-\d|^frame$/.test(name)) return ['space', name];
  if (/^r-/.test(name)) return ['radius', name.replace(/^r-/, '')];
  if (/^shadow-/.test(name)) return ['shadow', name.replace(/^shadow-/, '')];
  if (/^dur-/.test(name)) return ['duration', name.replace(/^dur-/, '')];
  if (/^ease-/.test(name)) return ['easing', name.replace(/^ease-/, '')];
  return ['color', name];
}
function entry({ name, value, note }) {
  const [g] = group(name);
  const css = `var(--${name})`;
  const base = { $description: note || undefined, $extensions: { 'portfolio.css': { variable: `--${name}`, use: css } } };
  if (g === 'color') return { $type: 'color', $value: toHex(value), ...base };
  if (g === 'fontFamily') return { $type: 'fontFamily', $value: value.split(',').map((f) => f.trim().replace(/^'|'$/g, '')), ...base };
  if (g === 'type') {
    if (/^fs-/.test(name)) { base.$extensions['portfolio.css'].value = value; return { $type: 'dimension', $value: dim(value), ...base }; }
    if (/^ls-/.test(name)) return { $type: 'dimension', $value: { value: parseFloat(value), unit: 'em' }, ...base };
    return { $type: 'number', $value: Number(value), ...base };
  }
  if (g === 'space' || g === 'radius') return { $type: 'dimension', $value: px(value), ...base };
  if (g === 'duration') return { $type: 'duration', $value: ms(value), ...base };
  if (g === 'easing') {
    const b = value.match(/cubic-bezier\(([^)]+)\)/);
    if (b) return { $type: 'cubicBezier', $value: b[1].split(',').map(Number), ...base };
    base.$extensions['portfolio.css'].value = value; // linear() springs have no DTCG type yet
    return { $type: 'string', $value: value, ...base };
  }
  base.$extensions['portfolio.css'].value = value;
  return { $type: 'shadow', $value: value, ...base };
}
const json = {
  $description: `Portfolio of Ali · style v3. GENERATED from ${SRC} by scripts/tokens.mjs. Do not edit: change ${SRC} (with Ali's yes) and run npm run tokens.`,
};
for (const t of tokens) {
  const [g, key] = group(t.name);
  (json[g] ||= {})[key] = entry(t);
}
// the six agents, as pairs: what a case or chip uses
const agents = tokens.filter((t) => tokens.some((o) => o.name === `on-${t.name}`)).map((t) => t.name);
json.agent = Object.fromEntries(agents.map((a) => [a, { $description: tokens.find((t) => t.name === a).note, bg: { $type: 'color', $value: `{color.${a}}` }, fg: { $type: 'color', $value: `{color.on-${a}}` } }]));
const jsonText = JSON.stringify(json, null, 2) + '\n';

// ---------- CSS ----------
const cssText = `/* ==========================================================================
   DESIGN TOKENS · style v3
   GENERATED from ${SRC} by scripts/tokens.mjs. Do not edit this file:
   change ${SRC} (with Ali's yes) and run \`npm run tokens\`.
   Same tokens, machine-readable: src/styles/tokens.json (DTCG).
   Rules in plain words: DESIGN.md.
   ========================================================================== */

/* Old pages still use some v2 names while they are rebuilt (blocks 2-4).
   They live apart and the build counts every use (scripts/check-system.mjs). */
@import './legacy-tokens.css';

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
  font-weight: 300 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-VariableItalic.woff2') format('woff2');
  font-weight: 300 900;
  font-style: italic;
  font-display: swap;
}

:root {${root[1]}
}

@media (prefers-reduced-motion: reduce) {
  :root {${reduced.trimEnd()} }
}
`;

const out = [[CSS_OUT, cssText], [JSON_OUT, jsonText]];
if (check) {
  const stale = out.filter(([f, t]) => { try { return readFileSync(f, 'utf8') !== t; } catch { return true; } }).map(([f]) => f);
  if (stale.length) {
    console.error(`✗ tokens: ${stale.join(', ')} out of date with ${SRC}. Run: npm run tokens`);
    process.exit(1);
  }
  console.log(`✓ tokens: code copies match ${SRC} (${tokens.length} tokens)`);
} else {
  for (const [f, t] of out) writeFileSync(f, t);
  console.log(`✓ tokens: ${tokens.length} tokens → ${CSS_OUT}, ${JSON_OUT}`);
}
