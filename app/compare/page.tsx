'use client'
import Link from 'next/link'
import { Columns3, Plus, Trophy, X } from 'lucide-react'
import { useCarsByIds, useShop } from '@/context/ShopContext'
import { useInventory } from '@/context/InventoryContext'
import { km, money, type Car } from '@/data/cars'
import { defaultFinance, monthlyRepayment } from '@/lib/finance'
import { estimateCosts } from '@/components/CostOfOwnership'
import { VehicleImage } from '@/components/VehicleImage'
import { EmptyState } from '@/components/SiteChrome'

type Row = { label: string; value: (c: Car) => number | string; format?: (n: number) => string; best?: 'low' | 'high' }
const rows: Row[] = [
  { label: 'Price', value: c => c.price, format: money, best: 'low' },
  { label: 'Monthly (40% down, 48 mo)', value: c => monthlyRepayment({ price: c.price, ...defaultFinance }), format: money, best: 'low' },
  { label: 'Yearly running costs', value: c => estimateCosts(c, 15000, 1050).slice(0, 3).reduce((s, r) => s + r.value, 0), format: money, best: 'low' },
  { label: 'Year', value: c => c.year, format: String, best: 'high' },
  { label: 'Mileage', value: c => c.mileage, format: km, best: 'low' },
  { label: 'Horsepower', value: c => c.hp, format: n => `${n} hp`, best: 'high' },
  { label: '0–100 km/h', value: c => c.zeroTo100, format: n => `${n.toFixed(1)}s`, best: 'low' },
  { label: 'Top speed', value: c => c.topSpeed, format: n => `${n} km/h`, best: 'high' },
  { label: 'Seats', value: c => c.seats, format: String, best: 'high' },
  { label: 'Engine', value: c => c.engine },
  { label: 'Fuel', value: c => c.fuel },
  { label: 'Body', value: c => c.bodyType },
  { label: 'Condition', value: c => c.condition },
  { label: 'Colour', value: c => c.colour },
]

export default function ComparePage() {
  const { compare, toggleCompare, clearCompare } = useShop()
  const { cars: inventory } = useInventory()
  const cars = useCarsByIds(compare)
  const suggestions = inventory.filter(c => !compare.includes(c.id) && c.featured).slice(0, 4)

  return <section className="section-wrap py-12 md:py-20">
    <div className="eyebrow">SIDE BY SIDE</div>
    <div className="mt-3 flex flex-wrap items-end justify-between gap-4"><h1 className="text-5xl font-black tracking-[-.055em] md:text-7xl">Compare.</h1>{cars.length > 0 && <button type="button" onClick={clearCompare} className="text-sm underline">Clear comparison</button>}</div>
    <p className="mt-4 max-w-2xl text-muted">Pick up to three cars with the <Columns3 size={15} className="inline" /> button on any listing. The best value in each row is highlighted.</p>

    {cars.length === 0 ? <div className="mt-10"><EmptyState icon={<Columns3 size={26} />} title="Nothing to compare yet" body="Add two or three cars and we'll line them up: price, power, running costs and more." action={<Link href="/showroom" className="pill-black mt-5">Browse the showroom</Link>} /></div> : <>
      <div className="mt-10 overflow-x-auto rounded-3xl ring-1 ring-line/10">
        <table className="w-full min-w-[720px] border-collapse bg-card text-sm">
          <caption className="sr-only">Comparison of {cars.map(c => c.model).join(', ')}</caption>
          <thead><tr>
            <th scope="col" className="w-48 p-4 text-left align-bottom text-xs font-semibold uppercase tracking-wider text-muted">Specification</th>
            {cars.map(car => <th key={car.id} scope="col" className="p-4 text-left align-top font-normal">
              <div className="relative aspect-[1.4/1] overflow-hidden rounded-2xl bg-line/10"><VehicleImage car={car} sizes="300px" />
                <button type="button" onClick={() => toggleCompare(car.id)} aria-label={`Remove ${car.model}`} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-black shadow"><X size={15} /></button></div>
              <Link href={`/cars/${car.slug}`} className="mt-3 block text-base font-bold hover:underline">{car.year} {car.brand} {car.model}</Link>
            </th>)}
            {cars.length < 3 && <th scope="col" className="p-4 align-top"><Link href="/showroom" className="grid aspect-[1.4/1] place-items-center rounded-2xl border-2 border-dashed border-line/15 text-muted hover:border-bronze hover:text-bronze"><span className="flex flex-col items-center gap-2 text-xs font-semibold"><Plus /> Add a car</span></Link></th>}
          </tr></thead>
          <tbody>{rows.map(row => {
            const values = cars.map(row.value)
            const numeric = values.every(v => typeof v === 'number') && cars.length > 1 && row.best
            const target = numeric ? (row.best === 'low' ? Math.min(...values as number[]) : Math.max(...values as number[])) : null
            return <tr key={row.label} className="border-t border-line/10">
              <th scope="row" className="p-4 text-left font-medium text-muted">{row.label}</th>
              {values.map((v, i) => { const win = target !== null && v === target; return <td key={cars[i].id} className={`p-4 font-semibold ${win ? 'bg-bronze/10 text-ink' : ''}`}>
                <span className="inline-flex items-center gap-1.5">{typeof v === 'number' && row.format ? row.format(v) : v}{win && <Trophy size={14} className="text-bronze" aria-label="Best" />}</span>
              </td> })}
              {cars.length < 3 && <td />}
            </tr>
          })}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Running costs: fuel at 15,000 km a year, insurance and servicing estimates. Performance figures are approximate.</p>
    </>}

    {cars.length < 3 && suggestions.length > 0 && <div className="mt-14"><h2 className="text-xl font-bold">Popular picks to compare</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{suggestions.map(c => <button key={c.id} type="button" onClick={() => toggleCompare(c.id)} className="flex items-center gap-3 rounded-2xl bg-card p-3 text-left ring-1 ring-line/5 transition hover:ring-bronze">
        <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl"><VehicleImage car={c} sizes="100px" /></span>
        <span className="min-w-0"><strong className="block truncate text-sm">{c.brand} {c.model}</strong><span className="text-xs text-muted">{money(c.price)}</span></span><Plus size={16} className="ml-auto shrink-0 text-bronze" />
      </button>)}</div></div>}
  </section>
}
