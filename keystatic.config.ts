/**
 * KEYSTATIC · the visual editor at /keystatic.
 * Defines every field you can edit. Content is saved as YAML in
 * src/content, media in public/images. On the live site it saves straight
 * to GitHub, and Vercel publishes the change in about a minute.
 */
import { config, fields, collection, singleton } from '@keystatic/core';

const ACCENT_OPTIONS = [
  { label: 'Copper (cupra)', value: 'copper' },
  { label: 'Mint (south)', value: 'mint' },
  { label: 'Lime (monexa)', value: 'lime' },
  { label: 'Sky (hmi)', value: 'sky' },
  { label: 'Red (cut scenes)', value: 'red' },
  { label: 'Mat green (cutouts)', value: 'mat' },
  { label: 'Amber (silena)', value: 'amber' },
  { label: 'Cyan (contact)', value: 'cyan' },
];

/** Any image or video file. Stored under public/images/projects. */
const media = (label: string, description?: string) =>
  fields.file({ label, description, directory: 'public/images/projects', publicPath: '/images/projects/' });

const rich = (label: string, description = 'Use **double asterisks** for bold. Leave an empty line for a new paragraph.') =>
  fields.text({ label, multiline: true, description });

const head = {
  eyebrow: fields.text({ label: 'Eyebrow', description: 'Small text, top left of the card.' }),
  pill: fields.text({ label: 'Pill', description: 'Coloured tag, top right of the card.' }),
};

const caseItems = fields.array(fields.object({ title: fields.text({ label: 'Title' }), text: rich('Text') }), { label: 'Items', itemLabel: (p) => p.fields.title.value });

const blocks = fields.blocks(
  {
    // ---- Media and cards (the core set, used by every project) ----
    image: {
      label: 'Image',
      schema: fields.object({ src: media('Image'), alt: fields.text({ label: 'Description (alt text)' }) }),
    },
    video: {
      label: 'Video',
      schema: fields.object({ src: media('Video (.mp4)'), alt: fields.text({ label: 'Description' }) }),
    },
    split: {
      label: 'Image + text card',
      schema: fields.object({
        src: media('Image (leave empty for a full-width card)'),
        alt: fields.text({ label: 'Description' }),
        imageWidth: fields.integer({ label: 'Image width (%)', defaultValue: 45 }),
        height: fields.integer({ label: 'Height on desktop (px)', defaultValue: 373 }),
        label: fields.text({ label: 'Black tab on the image (optional)' }),
        tag: fields.text({ label: 'Tag (top right of the card)' }),
        style: fields.select({ label: 'Card style', options: [{ label: 'Compact (bold title + line)', value: 'compact' }, { label: 'Spaced (big titles)', value: 'spaced' }], defaultValue: 'compact' }),
        items: caseItems,
      }),
    },
    gallery: {
      label: 'Carousel',
      schema: fields.object({
        tab: fields.text({ label: 'Black tab (optional)' }),
        slides: fields.array(fields.object({ src: media('Image'), alt: fields.text({ label: 'Description' }) }), { label: 'Slides', itemLabel: (p) => p.fields.alt.value || 'Slide' }),
      }),
    },
    // ---- Story blocks (longer narrative: quotes, mockups, build log…) ----
    text: {
      label: 'Text',
      schema: fields.object({ ...head, body: rich('Text'), size: fields.select({ label: 'Size', options: [{ label: 'Body', value: 'body' }, { label: 'Lead (bigger)', value: 'lead' }], defaultValue: 'body' }) }),
    },
    quote: {
      label: 'Quote · the thread',
      schema: fields.object({ ...head, quote: fields.text({ label: 'Quote' }), body: rich('Text under the quote'), chips: fields.array(fields.text({ label: 'Chip' }), { label: 'Chips', itemLabel: (p) => p.value }) }),
    },
    list: {
      label: 'List · titles + text',
      schema: fields.object({
        ...head,
        columns: fields.integer({ label: 'Columns', defaultValue: 1, validation: { min: 1, max: 3 } }),
        items: fields.array(fields.object({ title: fields.text({ label: 'Title' }), text: rich('Text') }), { label: 'Items', itemLabel: (p) => p.fields.title.value }),
      }),
    },
    stats: {
      label: 'Stats · big numbers',
      schema: fields.object({ items: fields.array(fields.object({ value: fields.text({ label: 'Number' }), label: fields.text({ label: 'Label' }) }), { label: 'Stats', itemLabel: (p) => p.fields.value.value }) }),
    },
    media: {
      label: 'Image or video',
      schema: fields.object({ src: media('File'), alt: fields.text({ label: 'Description (alt text)' }), ratio: fields.text({ label: 'Ratio', defaultValue: '16/10', description: 'e.g. 16/10, 4/3, 1, 4/5' }), caption: fields.text({ label: 'Caption (optional)' }), label: fields.text({ label: 'Corner label (optional)' }) }),
    },
    mediaPair: {
      label: 'Two images or videos',
      schema: fields.object({
        ratio: fields.text({ label: 'Ratio', defaultValue: '4/5' }),
        a: fields.object({ src: media('Left'), alt: fields.text({ label: 'Left description' }), caption: fields.text({ label: 'Left caption' }) }),
        b: fields.object({ src: media('Right'), alt: fields.text({ label: 'Right description' }), caption: fields.text({ label: 'Right caption' }) }),
      }),
    },
    browser: {
      label: 'Mockup · browser',
      schema: fields.object({ src: media('Screenshot (16:10)'), alt: fields.text({ label: 'Description' }), url: fields.text({ label: 'URL shown in the bar' }), tint: fields.text({ label: 'Background colour (optional)', description: 'Hex, e.g. #F3D3CF' }) }),
    },
    phones: {
      label: 'Mockup · phones',
      schema: fields.object({
        tint: fields.text({ label: 'Background colour (optional)' }),
        screens: fields.array(fields.object({ src: media('Screenshot (390×844)'), alt: fields.text({ label: 'Description' }) }), { label: 'Screens (1 to 3)', itemLabel: (p) => p.fields.alt.value || 'Screen' }),
      }),
    },
    collection: {
      label: 'Collection · image grid',
      schema: fields.object({
        ...head,
        note: fields.text({ label: 'Note under the grid' }),
        items: fields.array(fields.object({ src: media('Image'), title: fields.text({ label: 'Title' }), year: fields.text({ label: 'Year' }), tag: fields.text({ label: 'Tag' }), line: fields.text({ label: 'Hover line' }) }), { label: 'Items', itemLabel: (p) => p.fields.title.value }),
      }),
    },
    videoCard: {
      label: 'Video card · flow or architecture',
      schema: fields.object({ src: media('Video'), caption: fields.text({ label: 'Caption' }), pill: fields.text({ label: 'Pill' }) }),
    },
    timeline: {
      label: 'Timeline · build log',
      schema: fields.object({
        ...head,
        intro: rich('Intro'),
        items: fields.array(fields.object({ time: fields.text({ label: 'Time' }), text: fields.text({ label: 'What happened' }), key: fields.checkbox({ label: 'Milestone' }) }), { label: 'Entries', itemLabel: (p) => `${p.fields.time.value} ${p.fields.text.value}` }),
        aside: fields.text({ label: 'Handwritten note (optional)' }),
      }),
    },
    details: {
      label: 'Details · small clips',
      schema: fields.object({
        ...head,
        items: fields.array(fields.object({ src: media('Clip or image'), title: fields.text({ label: 'Title' }), text: fields.text({ label: 'One line' }) }), { label: 'Details', itemLabel: (p) => p.fields.title.value }),
      }),
    },
  },
  { label: 'Content blocks' }
);

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'alidifreijo/portfolio' }
    : { kind: 'local' },
  ui: {
    brand: { name: 'álida · portfolio' },
    navigation: { Projects: ['projects'], Pages: ['home', 'about', 'work', 'contact'] },
  },
  collections: {
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'title',
      format: { data: 'yaml' },
      columns: ['kind', 'status'],
      schema: {
        title: fields.slug({ name: { label: 'Title', description: 'Lowercase, as it appears on the page.' } }),
        kind: fields.select({ label: 'Type', options: [{ label: 'Client case', value: 'client' }, { label: 'Exploration', value: 'exploration' }], defaultValue: 'client' }),
        status: fields.select({ label: 'Status', options: [{ label: 'Published', value: 'published' }, { label: 'Draft (hidden)', value: 'draft' }], defaultValue: 'draft' }),
        order: fields.integer({ label: 'Order', description: 'Lower numbers come first. Client work 1–9, explorations 10+.', defaultValue: 99 }),
        accent: fields.select({ label: 'Accent colour', options: ACCENT_OPTIONS, defaultValue: 'copper' }),
        lead: fields.text({ label: 'SEO description', description: 'One sentence for Google and link previews. Not shown on the page.' }),
        intro: rich('Intro', 'The text in the title card. **Bold** works.'),
        teaser: fields.text({ label: 'Teaser', description: 'One line for cards and the Next block.' }),
        cover: media('Cover (cards)', 'Vertical-friendly image, used on the work page and in Next.'),
        hero: media('Hero (left panel)', 'Image or video. Fills the sticky left panel.'),
        heroLabel: fields.text({ label: 'Hero label', description: 'Text in the black corner tab.' }),
        heroStyle: fields.select({ label: 'Hero style', options: [{ label: 'Fill the panel', value: 'cover' }, { label: 'Centred on a colour', value: 'contain' }, { label: 'Video inside a phone', value: 'phone' }], defaultValue: 'cover' }),
        heroBg: fields.text({ label: 'Hero background colour', description: 'Hex, e.g. #103429' }),
        heroFrame: media('Phone frame (phone style only)'),
        display: fields.text({ label: 'Title as shown', description: '**bold** works, e.g. **fintech** app' }),
        metaWidth: fields.integer({ label: 'Meta cards width (px)', defaultValue: 200 }),
        nextLabel: fields.text({ label: 'Label when shown as Next' }),
        nextImage: media('Image when shown as Next'),
        meta: fields.array(fields.object({ label: fields.text({ label: 'Label' }), value: fields.text({ label: 'Value' }) }), { label: 'Meta cards', itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}` }),
        links: fields.array(fields.object({ label: fields.text({ label: 'Label' }), url: fields.url({ label: 'URL' }) }), { label: 'Buttons', itemLabel: (p) => p.fields.label.value }),
        blocks,
      },
    }),
  },
  singletons: {
    home: singleton({
      label: 'Home',
      path: 'src/content/pages/home',
      format: { data: 'yaml' },
      schema: { name: fields.text({ label: 'Name tab' }), lead: fields.text({ label: 'Bold word' }), line: fields.text({ label: 'Line' }), sub: fields.text({ label: 'Second line' }) },
    }),
    work: singleton({
      label: 'Work',
      path: 'src/content/pages/work',
      format: { data: 'yaml' },
      schema: { title: fields.text({ label: 'Title' }), subtitle: fields.text({ label: 'Subtitle' }), intro: fields.text({ label: 'Intro', multiline: true }), explorationsTitle: fields.text({ label: 'Explorations title' }), explorationsIntro: fields.text({ label: 'Explorations intro', multiline: true }) },
    }),
    about: singleton({
      label: 'About',
      path: 'src/content/pages/about',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title' }),
        grabTitle: fields.text({ label: 'Left title' }),
        hobbiesLabel: fields.text({ label: 'Hobbies label' }),
        intro: rich('About text'),
        skills: fields.array(fields.object({ title: fields.text({ label: 'Title' }), tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }), filled: fields.checkbox({ label: 'Filled tags (black)' }), text: rich('Text') }), { label: 'Skills', itemLabel: (p) => p.fields.title.value }),
        teach: fields.array(fields.object({ years: fields.text({ label: 'Years' }), title: fields.text({ label: 'Title' }), place: fields.text({ label: 'Place' }) }), { label: 'Learn & teach', itemLabel: (p) => p.fields.title.value }),
        languages: fields.array(fields.object({ name: fields.text({ label: 'Language' }), level: fields.text({ label: 'Level' }) }), { label: 'Languages', itemLabel: (p) => p.fields.name.value }),
        experience: fields.array(fields.object({ years: fields.text({ label: 'Years' }), role: fields.text({ label: 'Role' }), company: fields.text({ label: 'Company' }), tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }), text: rich('Text') }), { label: 'Work experience', itemLabel: (p) => `${p.fields.years.value} · ${p.fields.role.value}` }),
      },
    }),
    contact: singleton({
      label: 'Contact',
      path: 'src/content/pages/contact',
      format: { data: 'yaml' },
      schema: {
        playTitle: fields.text({ label: 'Crossword title' }),
        talkTitle: fields.text({ label: 'Contact title' }),
        body: rich('Contact text'),
        cv: fields.file({ label: 'CV (PDF)', directory: 'public/cv', publicPath: '/cv/' }),
        links: fields.array(fields.object({ label: fields.text({ label: 'Label' }), url: fields.text({ label: 'URL or mailto:' }), icon: fields.select({ label: 'Icon', options: [{ label: 'Arrow', value: 'arrow' }, { label: 'LinkedIn', value: 'linkedin' }, { label: 'Email', value: 'mail' }, { label: 'Film', value: 'film' }], defaultValue: 'arrow' }) }), { label: 'Links', itemLabel: (p) => p.fields.label.value }),
        clues: fields.array(fields.text({ label: 'Clue' }), { label: 'Crossword clues (in order, 1 to 8)', itemLabel: (p) => p.value }),
      },
    }),
  },
});
