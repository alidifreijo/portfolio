import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Content collections. The files themselves are edited in Keystatic
 * (/keystatic) and saved as YAML in src/content.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['client', 'exploration']).default('client'),
    status: z.enum(['published', 'draft']).default('published'),
    order: z.number().default(99),
    accent: z.string().default('copper'),
    lead: z.string().default(''),
    intro: z.string().default(''),
    teaser: z.string().default(''),
    cover: z.string(),
    hero: z.string(),
    heroLabel: z.string().optional(),
    heroStyle: z.enum(['cover', 'contain', 'phone']).default('cover'),
    heroBg: z.string().optional(),
    heroFrame: z.string().optional(),
    display: z.string().optional(),
    metaWidth: z.number().optional(),
    nextImage: z.string().optional(),
    nextLabel: z.string().optional(),
    meta: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    blocks: z.array(z.object({ discriminant: z.string(), value: z.any() })).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pages' }),
  schema: z.any(),
});

export const collections = { projects, pages };
