/**
 * sitemap.xml · every public page, built from the same lists the site uses.
 * Not listed: /styleguide (a tool) and /404.
 */
import type { APIRoute } from 'astro';
import { getPlay, getWork, projectUrl } from '../lib/projects';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = site || new URL('https://portfolio-alidifreijo.vercel.app');
  const pages = ['/', '/play', '/work', '/about', '/contact', '/how-this-portfolio-is-built', '/library'];
  const cases = [...(await getPlay()), ...(await getWork())].map(projectUrl);
  const lastmod = new Date().toISOString().slice(0, 10); // the day of the build
  const urls = [...pages, ...cases].map((p) => `  <url><loc>${new URL(p, base).href}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
