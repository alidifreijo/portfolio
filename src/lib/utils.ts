/** Shared helpers. */

/** The accent options available to projects. Must match tokens.css. */
export const ACCENTS = ['copper', 'mint', 'lime', 'sky', 'red', 'mat', 'amber', 'cyan'] as const;
export type Accent = (typeof ACCENTS)[number];

export const accentVars = (accent: string = 'copper') =>
  `--acc: var(--acc-${accent}); --on-acc: var(--on-${accent});`;

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
