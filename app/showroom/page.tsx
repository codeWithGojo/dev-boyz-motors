'use client'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { bodyTypes, brands, conditions, fuels, money } from '@/data/cars'
import { CarCard } from '@/components/CarCard'
import { EmptyState } from '@/components/SiteChrome'
import { AnimatedNumber } from '@/components/Motion'
import { useInventory } from '@/context/InventoryContext'
import { useDialog } from '@/lib/useDialog'
import ShowroomLoading from './loading'

const MAX_PRICE = 2_000_000_000
const MIN_PRICE = 5_000_000
const sorts = { newest: 'Newest', 'price-low': 'Price: low to high', 'price-high': 'Price: high to low', mileage: 'Lowest mileage', power: 'Most powerful' } as const
type Sort = keyof typeof sorts

/** Parse a number from the URL, falling back when it's missing or malformed. */
function num(value: string | null, fallback: number, min: number, max: number) {
  const n = Number(value)
  return value !== null && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback
}

export default function Showroom() { return <Suspense fallback={<ShowroomLoading />}><ShowroomContent /></Suspense> }

function ShowroomContent() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { cars } = useInventory()

  // Filters live in the URL, so links, refreshes and the back button keep them.
  const filters = {
    q: params.get('q') ?? '',
    brand: params.get('brand') ?? '',
    model: params.get('model') ?? '',
    condition: params.get('condition') ?? '',
    body: params.get('body') ?? '',
    fuel: params.get('fuel') ?? '',
    max: num(params.get('max'), MAX_PRICE, MIN_PRICE, MAX_PRICE),
    minYear: num(params.get('year'), 2010, 2010, 2025),
    sort: (params.get('sort') as Sort) in sorts ? params.get('sort') as Sort : 'newest',
    hideSold: params.get('sold') === 'hide',
  }
  const update = (patch: Record<string, string | number | null>) => {
    const next = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === '' ) next.delete(key)
      else next.set(key, String(value))
    }
    if (next.get('max') === String(MAX_PRICE)) next.delete('max')
    if (next.get('year') === '2010') next.delete('year')
    if (next.get('sort') === 'newest') next.delete('sort')
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  // Debounced free-text search box.
  const [text, setText] = useState(filters.q)
  useEffect(() => setText(filters.q), [filters.q])
  useEffect(() => {
    if (text === filters.q) return
    const id = setTimeout(() => update({ q: text }), 250)
    return () => clearTimeout(id)
  })

  const [mobileFilters, setMobileFilters] = useState(false)
  const sheet = useDialog<HTMLDivElement>(mobileFilters, () => setMobileFilters(false))
  const models = [...new Set(cars.filter(c => !filters.brand || c.brand === filters.brand).map(c => c.model))].sort()

  const result = useMemo(() => {
    const words = filters.q.toLowerCase().split(/\s+/).filter(Boolean)
    const list = cars.filter(c =>
      (!filters.brand || c.brand === filters.brand) && (!filters.model || c.model === filters.model) &&
      (!filters.condition || c.condition === filters.condition) && (!filters.body || c.bodyType === filters.body) &&
      (!filters.fuel || c.fuel === filters.fuel) && c.price <= filters.max && c.year >= filters.minYear &&
      (!filters.hideSold || c.availability !== 'Sold') &&
      words.every(w => `${c.brand} ${c.model} ${c.year} ${c.bodyType} ${c.colour} ${c.engine}`.toLowerCase().includes(w)))
    const by: Record<Sort, (a: typeof list[0], b: typeof list[0]) => number> = {
      newest: (a, b) => b.year - a.year, 'price-low': (a, b) => a.price - b.price, 'price-high': (a, b) => b.price - a.price,
      mileage: (a, b) => a.mileage - b.mileage, power: (a, b) => b.hp - a.hp,
    }
    return [...list].sort(by[filters.sort])
  }, [cars, filters.q, filters.brand, filters.model, filters.condition, filters.body, filters.fuel, filters.max, filters.minYear, filters.sort, filters.hideSold])

  const active = [
    filters.q && ['q', `“${filters.q}”`], filters.brand && ['brand', filters.brand], filters.model && ['model', filters.model],
    filters.condition && ['condition', filters.condition], filters.body && ['body', filters.body], filters.fuel && ['fuel', filters.fuel],
    filters.max < MAX_PRICE && ['max', `Under ${money(filters.max)}`], filters.minYear > 2010 && ['year', `${filters.minYear}+`], filters.hideSold && ['sold', 'Hide sold'],
  ].filter(Boolean) as [string, string][]
  const clear = () => { setText(''); router.replace(pathname, { scroll: false }) }

  const panel = <div className="space-y-5 rounded-3xl bg-card p-5 ring-1 ring-line/5 sm:p-6">
    <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Refine your search</h2><button type="button" className="text-xs font-semibold underline underline-offset-4" onClick={clear}>Reset</button></div>
    <Picker label="Brand" value={filters.brand} onChange={v => update({ brand: v, model: null })} options={brands} />
    <Picker label="Model" value={models.includes(filters.model) ? filters.model : ''} onChange={v => update({ model: v })} options={models} />
    <Picker label="Body type" value={filters.body} onChange={v => update({ body: v })} options={bodyTypes} />
    <Picker label="Condition" value={filters.condition} onChange={v => update({ condition: v })} options={conditions} />
    <Picker label="Fuel" value={filters.fuel} onChange={v => update({ fuel: v })} options={fuels} />
    <label className="block"><span className="eyebrow !text-muted">Maximum price</span><span className="mt-2 block break-words font-bold">{money(filters.max)}</span><input aria-label="Maximum price" type="range" min={MIN_PRICE} max={MAX_PRICE} step={5_000_000} value={filters.max} onChange={e => update({ max: e.target.value })} className="mt-4 w-full accent-bronze" /></label>
    <label className="block"><span className="eyebrow !text-muted">Year from</span><span className="mt-2 block font-bold">{filters.minYear}</span><input aria-label="Minimum year" type="range" min={2010} max={2025} step={1} value={filters.minYear} onChange={e => update({ year: e.target.value })} className="mt-4 w-full accent-bronze" /></label>
    <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={filters.hideSold} onChange={e => update({ sold: e.target.checked ? 'hide' : null })} className="h-4 w-4 accent-bronze" /> Hide sold cars</label>
  </div>

  return <section className="section-wrap py-8 sm:py-10 md:py-14">
    <nav aria-label="Breadcrumb" className="text-xs text-muted">Home / <strong className="text-ink">Showroom</strong></nav>
    <div className="mt-5 flex min-w-0 flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0"><h1 className="break-words text-4xl font-black leading-tight tracking-[-.055em] sm:text-5xl md:text-7xl">Showroom.</h1><p className="mt-2 text-sm text-muted" aria-live="polite"><strong className="text-ink"><AnimatedNumber value={result.length} /></strong> of {cars.length} cars match</p></div>
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block min-w-0 sm:w-72"><span className="sr-only">Search cars</span><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input type="search" value={text} onChange={e => setText(e.target.value)} placeholder="Search “black SUV”, “V8”…" className="field rounded-full pl-11" /></label>
        <label className="flex items-center gap-3 text-sm text-muted">Sort <select aria-label="Sort cars" value={filters.sort} onChange={e => update({ sort: e.target.value })} className="min-w-0 rounded-full bg-card px-3 py-3 font-semibold text-ink ring-1 ring-line/5">{Object.entries(sorts).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
      </div>
    </div>
    {active.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{active.map(([key, label]) => <button key={key} type="button" onClick={() => { if (key === 'q') setText(''); update({ [key]: null, ...(key === 'brand' ? { model: null } : {}) }) }} className="inline-flex animate-pop-in items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-canvas">{label} <X size={13} /></button>)}<button type="button" onClick={clear} className="text-xs font-semibold underline">Clear all</button></div>}
    <div className="sticky top-[72px] z-30 -mx-4 mt-6 border-y border-line/5 bg-canvas/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 lg:hidden"><button type="button" onClick={() => setMobileFilters(true)} className="pill-outline w-full gap-2 sm:w-auto"><SlidersHorizontal size={17} /> Filters{active.length ? ` (${active.length})` : ''}</button></div>
    <div className="mt-6 grid min-w-0 items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">{panel}</aside>
      <div className="min-w-0">{result.length
        ? <div className="grid min-w-0 gap-5 sm:grid-cols-2 2xl:grid-cols-3">{result.map(car => <CarCard key={car.id} car={car} />)}</div>
        : <EmptyState icon={<SearchX size={26} />} title="No cars match those filters" body="Try widening the price range or removing a filter — or ask us to source exactly what you want." action={<div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" className="pill-black" onClick={clear}>Clear filters</button><a href="/sell-your-car" className="pill-outline">Source a car</a></div>} />}
      </div>
    </div>
    {mobileFilters && <div className="fixed inset-0 z-[95] bg-black/55 lg:hidden" onMouseDown={e => { if (e.target === e.currentTarget) setMobileFilters(false) }}>
      <div ref={sheet} className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] animate-fade-up flex-col rounded-t-[28px] bg-canvas shadow-2xl" role="dialog" aria-modal="true" aria-label="Showroom filters">
        <div className="flex shrink-0 items-center justify-between border-b border-line/10 px-5 py-4"><h2 className="text-lg font-bold">Filter cars</h2><button aria-label="Close filters" type="button" onClick={() => setMobileFilters(false)} className="circle-btn"><X size={20} /></button></div>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-4">{panel}</div>
        <div className="shrink-0 border-t border-line/10 bg-canvas p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"><button type="button" onClick={() => setMobileFilters(false)} className="pill-black w-full">Show {result.length} cars</button></div>
      </div>
    </div>}
  </section>
}

function Picker({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return <label className="block"><span className="eyebrow !text-muted">{label}</span><select value={value} onChange={e => onChange(e.target.value)} className="field mt-2 w-full min-w-0 text-sm"><option value="">Any {label.toLowerCase()}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
}
