// Images · lighter, adaptive copies of the case images.
// For every JPG/PNG used in a case (public/images/f, public/images/projects),
// writes name-800.{avif,webp} and name-1600.{avif,webp} next to it (never
// larger than the original). VideoBlock picks them up by name.
// Run after adding images: npm run images. Skips files already done.
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const roots = ['public/images/f', 'public/images/projects'];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = roots.flatMap(walk).filter((f) => /\.(jpe?g|png)$/i.test(f) && !/\.poster\.jpg$|-\d+\.(avif|webp)$/.test(f));
let made = 0;
for (const f of files) {
  const base = f.replace(/\.(jpe?g|png)$/i, '');
  const { width } = await sharp(f).metadata();
  for (const w of [800, 1600]) {
    const size = Math.min(w, width);
    for (const fmt of ['avif', 'webp']) {
      const out = `${base}-${w}.${fmt}`;
      if (existsSync(out)) continue;
      await sharp(f).resize({ width: size, withoutEnlargement: true })[fmt]({ quality: fmt === 'avif' ? 55 : 78 }).toFile(out);
      made++;
    }
  }
}
console.log(`✓ images: ${files.length} originals, ${made} new copies`);
