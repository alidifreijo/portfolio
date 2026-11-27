// Lupa · exploration for Block 4 (not product).
// Builds index.html from the real agents (src/content/agents, edited in Keystatic)
// and the real tokens (src/styles/tokens.css). Scene and skeleton come from the
// x-ray prototype (../2026-11-agentes-radiografia). Run from the repo root:
//   node exploraciones/2026-11-27-lupa/build.mjs
import { readFileSync, writeFileSync, readdirSync, copyFileSync } from 'node:fs';
import { parse } from '../../node_modules/yaml/dist/index.js';
const here = 'exploraciones/2026-11-27-lupa';
const proto = 'exploraciones/2026-11-agentes-radiografia';
const agents = readdirSync('src/content/agents').map((f) => parse(readFileSync(`src/content/agents/${f}`, 'utf8'))).sort((a, b) => a.n.localeCompare(b.n));
const tokens = readFileSync('src/styles/tokens.css', 'utf8').match(/:root \{[\s\S]*?\n\}/)[0];
// boxes of each toy in the 1440×900 scene, and where its glasses are (from the prototype)
const html = readFileSync(`${proto}/index.html`, 'utf8');
const geo = {};
for (const m of html.matchAll(/\{id:'(\w+)'[^\n]*?box:\[([\d,]+)\][\s\S]*?\['glasses',\[([\d,]+)\]/g)) geo[m[1]] = { box: m[2].split(',').map(Number), gl: m[3].split(',').map(Number) };
const toy = { systems: 'bob', research: 'cap', creative: 'bucket', ops: 'long', empathy: 'sprout', collab: 'messy' };
for (const f of ['notext2x.jpg', 'hero2x.jpg', 'skeleton.png', 'isi.woff2', 'sg5.woff2']) copyFileSync(`${proto}/${f}`, `${here}/${f}`);
copyFileSync('public/fonts/Satoshi-Variable.woff2', `${here}/satoshi.woff2`);
const data = agents.map((a) => ({ ...a, ...geo[toy[a.agent]] }));
writeFileSync(`${here}/agents.json`, JSON.stringify(data, null, 2));
const page = readFileSync(`${here}/template.html`, 'utf8').replace('/*TOKENS*/', tokens).replace('/*AGENTS*/', JSON.stringify(data));
writeFileSync(`${here}/index.html`, page);
console.log(`✓ lupa: ${data.length} agents → ${here}/index.html`);
