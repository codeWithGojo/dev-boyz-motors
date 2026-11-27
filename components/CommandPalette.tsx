'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CarFront, CornerDownLeft, FileText, Search } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { compactMoney } from '@/data/cars'

const pages = [
  ['/', 'Home'], ['/showroom', 'Showroom'], ['/new-arrivals', 'New arrivals'], ['/brands', 'Brands'],
  ['/find-my-car', 'Find my car (quiz & AI)'], ['/compare', 'Compare cars'], ['/sell-your-car', 'Sell or trade in'],
  ['/financing', 'Financing calculator'], ['/garage', 'Saved vehicles'], ['/contact', 'Contact'], ['/about', 'About'], ['/owner', 'Meet the owner'], ['/build', 'Build & price'], ['/gallery', 'Virtual showroom'], ['/craftsmanship', 'Craftsmanship & heritage'], ['/accessories', 'Accessories'], ['/locations', 'Showrooms'], ['/service', 'Book a service'], ['/portal', 'Owner’s portal'], ['/innovation', 'Innovation'], ['/events', 'Private events'], ['/journal', 'Journal'],
  ['/insights', 'Insights dashboard (demo)'], ['/admin', 'Admin (demo)'],
] as const

type Item = { href: string; title: string; hint: string; kind: 'page' | 'car' }

export function openCommandPalette() { window.dispatchEvent(new Event('dbm:open-palette')) }

/** Ctrl/⌘ + K search across pages and cars. */
export function CommandPalette() {
  const router = useRouter()
  const { cars } = useInventory()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(v => !v) }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setOpen(true) }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('dbm:open-palette', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('dbm:open-palette', onOpen) }
  }, [])

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement
      setQuery(''); setActive(0)
      requestAnimationFrame(() => input.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      returnFocus.current?.focus?.()
    }
  }, [open])

  const items = useMemo<Item[]>(() => {
    const q = query.trim().toLowerCase()
    const all: Item[] = [
      ...pages.map(([href, title]) => ({ href, title, hint: 'Page', kind: 'page' as const })),
      ...cars.map(c => ({ href: `/cars/${c.slug}`, title: `${c.year} ${c.brand} ${c.model}`, hint: `${compactMoney(c.price)} · ${c.bodyType}`, kind: 'car' as const })),
    ]
    if (!q) return all.slice(0, 9)
    const words = q.split(/\s+/)
    return all.filter(item => words.every(w => `${item.title} ${item.hint}`.toLowerCase().includes(w))).slice(0, 12)
  }, [query, cars])

  const go = (item?: Item) => { if (!item) return; setOpen(false); router.push(item.href) }

  if (!open) return null
  return <div className="fixed inset-0 z-[130] flex items-start justify-center bg-black/55 p-4 pt-[12vh] backdrop-blur-sm" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false) }}>
    <div role="dialog" aria-modal="true" aria-label="Search the site" className="w-full max-w-xl animate-fade-up overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-line/10">
      <div className="flex items-center gap-3 border-b border-line/10 px-5">
        <Search size={18} className="text-muted" />
        <input ref={input} value={query} onChange={e => { setQuery(e.target.value); setActive(0) }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(items.length - 1, a + 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
            if (e.key === 'Enter') { e.preventDefault(); go(items[active]) }
            if (e.key === 'Escape') setOpen(false)
          }}
          role="combobox" aria-expanded="true" aria-controls="palette-results" aria-activedescendant={items[active] ? `palette-${active}` : undefined}
          placeholder="Search cars, brands or pages…" className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted" />
        <kbd className="rounded-md bg-line/[.07] px-2 py-1 text-[10px] font-semibold text-muted">ESC</kbd>
      </div>
      <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {items.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">No matches for “{query}”.</li>}
        {items.map((item, i) => <li key={item.href} id={`palette-${i}`} role="option" aria-selected={i === active}>
          <button type="button" onMouseEnter={() => setActive(i)} onClick={() => go(item)} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm ${i === active ? 'bg-ink text-canvas' : ''}`}>
            {item.kind === 'car' ? <CarFront size={17} className="shrink-0" /> : <FileText size={17} className="shrink-0" />}
            <span className="min-w-0 flex-1 truncate font-semibold">{item.title}</span>
            <span className={`shrink-0 text-xs ${i === active ? 'text-canvas/70' : 'text-muted'}`}>{item.hint}</span>
            {i === active && <CornerDownLeft size={14} className="shrink-0" />}
          </button>
        </li>)}
      </ul>
      <div className="flex gap-4 border-t border-line/10 px-5 py-3 text-[11px] text-muted"><span>↑↓ to move</span><span>↵ to open</span><span>Ctrl/⌘ K to toggle</span></div>
    </div>
  </div>
}
