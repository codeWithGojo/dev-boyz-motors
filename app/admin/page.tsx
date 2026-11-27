'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { RotateCcw, Search, Star } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { useToast } from '@/context/ToastContext'
import { money, type Availability } from '@/data/cars'
import { VehicleImage } from '@/components/VehicleImage'

const statuses: Availability[] = ['Available', 'Reserved', 'Sold']

export default function AdminPage() {
  const { cars, overrides, updateCar, resetInventory } = useInventory()
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const list = useMemo(() => cars.filter(c => `${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(query.toLowerCase())), [cars, query])
  const counts = statuses.map(s => [s, cars.filter(c => c.availability === s).length] as const)
  const stockValue = cars.filter(c => c.availability !== 'Sold').reduce((s, c) => s + c.price, 0)
  const edited = Object.keys(overrides).length

  return <section className="section-wrap py-12 md:py-16">
    <div className="rounded-2xl bg-bronze/15 px-4 py-3 text-sm text-ink ring-1 ring-bronze/30">Demo admin: changes are saved in this browser only and update the showroom, car pages and search instantly.</div>
    <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
      <div><div className="eyebrow">BACK OFFICE</div><h1 className="mt-2 text-4xl font-black tracking-[-.05em] md:text-6xl">Inventory</h1></div>
      <div className="flex gap-3"><Link href="/insights" className="pill-outline">View insights</Link><button type="button" disabled={!edited} onClick={() => { resetInventory(); toast('Inventory reset to defaults') }} className="pill-black gap-2 disabled:opacity-40"><RotateCcw size={15} /> Reset {edited ? `(${edited})` : ''}</button></div>
    </div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {counts.map(([s, n]) => <div key={s} className="panel p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted">{s}</p><p className="mt-2 text-3xl font-black">{n}</p></div>)}
      <div className="panel p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Stock value</p><p className="mt-2 text-2xl font-black">{money(stockValue)}</p></div>
    </div>
    <label className="relative mt-8 block max-w-sm"><span className="sr-only">Filter inventory</span><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter cars…" className="field rounded-full pl-11" /></label>
    <div className="mt-5 overflow-x-auto rounded-3xl ring-1 ring-line/10">
      <table className="w-full min-w-[820px] bg-card text-sm">
        <thead><tr className="text-left text-xs uppercase tracking-wider text-muted"><th className="p-4">Car</th><th className="p-4">Status</th><th className="p-4">Price (₦)</th><th className="p-4">Featured</th><th className="p-4"><span className="sr-only">Link</span></th></tr></thead>
        <tbody>{list.map(car => <tr key={car.id} className={`border-t border-line/10 ${overrides[car.id] ? 'bg-bronze/[.06]' : ''}`}>
          <td className="p-4"><div className="flex items-center gap-3"><span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg"><VehicleImage car={car} sizes="80px" /></span><span><strong className="block">{car.brand} {car.model}</strong><span className="text-xs text-muted">{car.year} · {car.condition}</span></span></div></td>
          <td className="p-4"><select aria-label={`Status of ${car.model}`} value={car.availability} onChange={e => { updateCar(car.id, { availability: e.target.value as Availability }); toast(`${car.model} marked ${e.target.value.toLowerCase()}`) }} className="field py-2 text-sm">{statuses.map(s => <option key={s}>{s}</option>)}</select></td>
          <td className="p-4"><PriceInput value={car.price} label={`Price of ${car.model}`} onCommit={price => { updateCar(car.id, { price }); toast(`${car.model} now ${money(price)}`) }} /></td>
          <td className="p-4"><button type="button" aria-pressed={Boolean(car.featured)} aria-label={`Feature ${car.model} on the home page`} onClick={() => updateCar(car.id, { featured: !car.featured })} className={`grid h-10 w-10 place-items-center rounded-full ring-1 transition ${car.featured ? 'bg-bronze text-white ring-bronze' : 'ring-line/15 text-muted'}`}><Star size={16} fill={car.featured ? 'currentColor' : 'none'} /></button></td>
          <td className="p-4"><Link href={`/cars/${car.slug}`} className="text-xs font-semibold underline">View</Link></td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>
}

function PriceInput({ value, label, onCommit }: { value: number; label: string; onCommit: (n: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null)
  const commit = () => {
    if (draft === null) return
    const n = Number(draft.replace(/[^\d]/g, ''))
    if (Number.isFinite(n) && n >= 1_000_000 && n !== value) onCommit(n)
    setDraft(null)
  }
  return <input aria-label={label} inputMode="numeric" value={draft ?? value.toLocaleString('en-NG')} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') setDraft(null) }} className="field w-40 py-2 text-sm font-semibold" />
}
