/** Shared helpers. */

/** Each case wears the colour of its agent (DECISIONES.md, 27 nov). Must match the agent pairs in tokens.css. */
export const ACCENTS = ['systems', 'research', 'creative', 'ops', 'empathy', 'collab'] as const;
export type Accent = (typeof ACCENTS)[number];

export const accentVars = (accent: string = 'systems') =>
  `--acc: var(--${accent}); --on-acc: var(--on-${accent});`;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

/**
 * Tiny formatter for text fields: **bold**, *italic* and blank lines as
 * paragraphs. Keeps editing in Keystatic simple (plain text, no editor).
 */
export function rich(text: string = '', paragraphs = true): string {
  const inline = (t: string) =>
    esc(t)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
      .replace(/\n/g, '<br>');
  if (!paragraphs) return inline(text.trim());
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => `<p>${inline(p.trim())}</p>`)
    .join('');
}

export const isVideo = (src?: string) => !!src && /\.(mp4|webm|mov)$/i.test(src);

/**
 * For serif titles (Instrument Serif): the important part goes in italics.
 * `**part**` or `*part*` → <em>part</em>. Everything else is escaped.
 */
export const emph = (text: string = '') =>
  esc(text.trim()).replace(/\*\*(.+?)\*\*|\*(.+?)\*/g, (_m, a, b) => `<em>${a ?? b}</em>`);
