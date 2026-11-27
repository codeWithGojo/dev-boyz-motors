'use client'
import { useMemo, useState } from 'react'
import { useInventory } from '@/context/InventoryContext'
import { CountUp, Reveal } from '@/components/Motion'
import { compactMoney } from '@/data/cars'

/** Deterministic pseudo-random numbers so the demo charts are stable between renders. */
function seeded(seed: number) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 } }

const ranges = { '7d': 7, '30d': 30, '90d': 90 } as const

export default function InsightsPage() {
  const { cars } = useInventory()
  const [range, setRange] = useState<keyof typeof ranges>('30d')
  const days = ranges[range]

  const data = useMemo(() => {
    const rand = seeded(42 + days)
    const daily = Array.from({ length: days }, (_, i) => {
      const weekend = (i % 7 === 5 || i % 7 === 6) ? 1.35 : 1
      const views = Math.round((380 + i * 3 + rand() * 160) * weekend)
      return { views, enquiries: Math.round(views * (0.035 + rand() * 0.02)) }
    })
    const perCar = cars.map(c => ({ car: c, views: Math.round((c.featured ? 900 : 300) * (days / 30) * (0.6 + rand())) })).sort((a, b) => b.views - a.views).slice(0, 6)
    const byBrand = [...new Set(cars.map(c => c.brand))].map(b => ({ brand: b, value: cars.filter(c => c.brand === b).length * (0.7 + rand() * 0.6) })).sort((a, b) => b.value - a.value)
    const sources = [['WhatsApp', 46], ['Instagram', 24], ['Google search', 18], ['Direct', 12]] as const
    return { daily, perCar, byBrand, sources }
  }, [cars, days])

  const totalViews = data.daily.reduce((s, d) => s + d.views, 0)
  const totalEnquiries = data.daily.reduce((s, d) => s + d.enquiries, 0)
  const sold = cars.filter(c => c.availability === 'Sold')

  return <section className="section-wrap py-12 md:py-16">
    <div className="rounded-2xl bg-bronze/15 px-4 py-3 text-sm ring-1 ring-bronze/30">Demo dashboard: traffic numbers are simulated. Stock and sales figures come from the live (admin-edited) inventory.</div>
    <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
      <div><div className="eyebrow">INSIGHTS</div><h1 className="mt-2 text-4xl font-black tracking-[-.05em] md:text-6xl">Performance</h1></div>
      <div role="group" aria-label="Date range" className="flex gap-1 rounded-2xl bg-card p-1 ring-1 ring-line/5">{(Object.keys(ranges) as (keyof typeof ranges)[]).map(r => <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${range === r ? 'bg-ink text-canvas' : 'text-muted'}`}>Last {r}</button>)}</div>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Page views" value={<CountUp key={`v${days}`} value={totalViews} format={n => Math.round(n).toLocaleString('en-NG')} />} delta="+12.4%" />
      <Kpi label="Enquiries" value={<CountUp key={`e${days}`} value={totalEnquiries} format={n => Math.round(n).toLocaleString('en-NG')} />} delta="+8.1%" />
      <Kpi label="Conversion" value={<CountUp key={`c${days}`} value={(totalEnquiries / totalViews) * 100} decimals={1} suffix="%" />} delta="+0.3 pts" />
      <Kpi label="Cars sold" value={<CountUp value={sold.length} />} delta={compactMoney(sold.reduce((s, c) => s + c.price, 0))} />
    </div>

    <Reveal className="panel mt-6 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold">Daily views &amp; enquiries</h2><div className="flex gap-4 text-xs text-muted"><span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-bronze" /> Views</span><span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-ink" /> Enquiries ×20</span></div></div>
      <LineChart key={days} series={[data.daily.map(d => d.views), data.daily.map(d => d.enquiries * 20)]} /></Reveal>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Reveal className="panel p-6"><h2 className="font-bold">Most viewed cars</h2><ul className="mt-5 space-y-4">{data.perCar.map(({ car, views }) => <li key={car.id}><div className="flex justify-between gap-3 text-sm"><span className="truncate">{car.brand} {car.model}</span><strong>{views.toLocaleString('en-NG')}</strong></div><div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-line/[.07]"><div className="h-full rounded-full bg-bronze transition-[width] duration-700" style={{ width: `${(views / data.perCar[0].views) * 100}%` }} /></div></li>)}</ul></Reveal>
      <Reveal className="panel p-6" delay={120}><h2 className="font-bold">Where enquiries come from</h2><Donut parts={data.sources.map(([label, value]) => ({ label, value }))} /></Reveal>
    </div>
    <Reveal className="panel mt-6 p-6"><h2 className="font-bold">Interest by brand</h2><div className="mt-6 flex h-48 items-end gap-3">{data.byBrand.map(b => <div key={b.brand} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="w-full rounded-t-xl bg-ink/80 transition-[height] duration-700" style={{ height: `${(b.value / data.byBrand[0].value) * 100}%` }} /><span className="text-center text-[11px] text-muted">{b.brand}</span></div>)}</div></Reveal>
  </section>
}

function Kpi({ label, value, delta }: { label: string; value: React.ReactNode; delta: string }) {
  return <div className="panel p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p><p className="mt-2 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{delta}</p></div>
}

function LineChart({ series }: { series: number[][] }) {
  const w = 800, h = 220, max = Math.max(...series.flat()) * 1.1
  const colours = ['rgb(var(--accent))', 'rgb(var(--ink))']
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${(i / (values.length - 1)) * w},${h - (v / max) * h}`).join(' ')
  return <svg viewBox={`0 0 ${w} ${h + 10}`} className="mt-6 w-full" role="img" aria-label="Line chart of daily views and enquiries">
    {[0.25, 0.5, 0.75].map(f => <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="currentColor" strokeOpacity=".08" />)}
    <path d={`${path(series[0])} L${w},${h} L0,${h} Z`} style={{ fill: 'rgb(var(--accent))', fillOpacity: .12 }} />
    {series.map((s, i) => <path key={i} d={path(s)} fill="none" strokeWidth="2.5" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="animate-draw" style={{ stroke: colours[i], animationDuration: '1.4s' }} />)}
  </svg>
}

function Donut({ parts }: { parts: { label: string; value: number }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0)
  const colours = ['#166c4a', 'rgb(var(--accent))', '#6b6b6b', '#c9c2b6']
  let offset = 0
  return <div className="mt-5 flex flex-wrap items-center gap-8">
    <svg viewBox="0 0 42 42" className="h-44 w-44 -rotate-90" role="img" aria-label="Donut chart of enquiry sources">{parts.map((p, i) => { const len = (p.value / total) * 100; const el = <circle key={p.label} cx="21" cy="21" r="15.915" fill="none" style={{ stroke: colours[i] }} strokeWidth="6" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={-offset} />; offset += len; return el })}</svg>
    <ul className="space-y-3 text-sm">{parts.map((p, i) => <li key={p.label} className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ background: colours[i] }} />{p.label}<strong className="ml-2">{p.value}%</strong></li>)}</ul>
  </div>
}
