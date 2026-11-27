// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// PREVIEW=1 builds a plain static copy (no editor) that can be opened anywhere.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site: 'https://alidadiazdefreijo.vercel.app',
  integrations: preview ? [] : [react(), keystatic()],
  adapter: preview ? undefined : vercel(),
  build: { format: preview ? 'file' : 'directory', assets: preview ? 'assets' : '_astro' },
  outDir: preview ? './dist-static' : './dist',
  // Old Framer URLs keep working.
  redirects: {
    '/cupra': '/work/cupra',
    '/fintech': '/work/fintech',
    '/bank-platform': '/work/monexa',
    '/projecthmi': '/work/hmi',
    '/work/south': '/work/fintech',
    // Play / Work split (27 nov 2026): Ali's own webs moved to /play
    '/work/bank-platform': '/work/monexa',
    '/work/cut-scenes': '/play/cut-scenes',
    '/work/cutouts': '/play/cutouts',
  },
});
