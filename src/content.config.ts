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
    accent: z.enum(['systems', 'research', 'creative', 'ops', 'empathy', 'collab']).default('systems'),
    lead: z.string().default(''),
    intro: z.string().default(''),
    teaser: z.string().default(''),
    cover: z.string().optional(),
    hero: z.string().optional(),
    object: z.string().optional(),
    introVideo: z.string().optional(),
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
    // Work (companies) cases: the facts of the row and the four chapters
    company: z.string().optional(),
    years: z.string().optional(),
    role: z.string().optional(),
    via: z.string().optional(),
    line: z.string().optional(),
    titles: z.object({ context: z.string().optional(), role: z.string().optional(), process: z.string().optional(), result: z.string().optional() }).default({}),
    context: z.string().optional(),
    roleText: z.string().optional(),
    process: z.string().optional(),
    result: z.string().optional(),
    // Play cases: numbered chapters, each with its text and material (the first one goes on the stage)
    chapters: z.array(z.object({
      title: z.string(),
      text: z.string().default(''),
      media: z.array(z.object({ src: z.string(), poster: z.string().optional(), width: z.number(), height: z.number(), alt: z.string(), caption: z.string().optional() })).default([]),
    })).default([]),
    media: z.array(z.object({
      src: z.string(), poster: z.string().optional(), width: z.number(), height: z.number(),
      alt: z.string(), caption: z.string().optional(),
      chapter: z.enum(['top', 'context', 'role', 'process', 'result']).default('process'),
    })).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pages' }),
  schema: z.any(),
});

// The six agents of the home (Bloque 4): one file per agent, in Keystatic.
const agents = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/agents' }),
  schema: z.object({
    n: z.string(),
    agent: z.enum(['systems', 'research', 'creative', 'ops', 'empathy', 'collab']),
    name: z.string(),
    character: z.string(),
    line: z.string(),
    quote: z.string(),
    good: z.string(),
    runs: z.string(),
    allergic: z.string(),
    battery: z.number().min(0).max(100),
    opens: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
  }),
});

export const collections = { projects, pages, agents };
