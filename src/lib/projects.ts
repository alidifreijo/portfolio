import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Published projects, client work first, then explorations, by `order`. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => p.data.status === 'published');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const projectUrl = (p: Project) => `/work/${p.id}`;
