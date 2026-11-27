/**
 * Finishes: complete palettes inspired by classic paint-and-leather pairings.
 * `body` and `trim` are the two swatch colours (paint and metal/leather);
 * the full palette lives in app/globals.css under [data-accent].
 * Ids are kept stable so visitors' saved choices still work.
 */
export const accents = [
  { id: 'bronze', name: 'Champagne & Onyx', body: '#16130F', trim: '#A8844C', canvas: '#F1EDE6', font: 'Bodoni Moda', fontVar: 'var(--font-bodoni)' },
  { id: 'emerald', name: 'Racing Green & Tan', body: '#102E23', trim: '#A16A38', canvas: '#ECEAE0', font: 'Cormorant Garamond', fontVar: 'var(--font-cormorant)' },
  { id: 'oxblood', name: 'Bordeaux & Rose Gold', body: '#401020', trim: '#AC6454', canvas: '#F3EBE8', font: 'Playfair Display', fontVar: 'var(--font-playfair)' },
  { id: 'sapphire', name: 'Midnight & Platinum', body: '#0E1A34', trim: '#9AA8C2', canvas: '#EAEDF2', font: 'Syne', fontVar: 'var(--font-syne)' },
] as const

export type Accent = (typeof accents)[number]['id']
export const isAccent = (value: unknown): value is Accent => accents.some(a => a.id === value)
export const accentById = (id: Accent) => accents.find(a => a.id === id) ?? accents[0]
