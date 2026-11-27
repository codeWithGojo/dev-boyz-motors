'use client'
import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Bookmark, Check, Trash2 } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { useToast } from '@/context/ToastContext'
import { money } from '@/data/cars'
import { defaultFinance, monthlyRepayment } from '@/lib/finance'
import { interiorColours, materials, packages } from '@/lib/content'
import { readStore, writeStore } from '@/lib/storage'
import { CarSvg, calipers, paints, wheels } from '@/components/Configurator'
import { EnquiryForm } from '@/components/EnquiryForm'
import { ShareButton } from '@/components/ShareButton'
import { VehicleImage } from '@/components/VehicleImage'
import { AnimatedNumber } from '@/components/Motion'

const steps = ['Model', 'Exterior', 'Interior', 'Packages', 'Summary'] as const
type SavedBuild = { href: string; title: string; total: number; savedAt: number }

const pick = (v: string | null, max: number) => { const n = Number(v); return Number.isInteger(n) && n >= 0 && n < max ? n : 0 }

export default function BuildPage() {
  return <Suspense fallback={<div className="section-wrap py-20"><div className="skeleton h-96 rounded-3xl" /></div>}><Build /></Suspense>
}

function Build() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { cars } = useInventory()
  const { toast } = useToast()
  const available = cars.filter(c => c.availability !== 'Sold')

  // The whole configuration lives in the URL, so a build can be shared or bookmarked.
  const car = available.find(c => c.slug === params.get('car'))
  const step = car ? pick(params.get('step') ?? '1', steps.length) : 0
  const paint = paints[pick(params.get('p'), paints.length)]
  const wheel = wheels[pick(params.get('w'), wheels.length)]
  const caliper = calipers[pick(params.get('c'), calipers.length)]
  const interior = interiorColours[pick(params.get('i'), interiorColours.length)]
  const trim = materials.find(m => m.id === params.get('t') && m.id !== 'leather') ?? materials[1]
  const chosen = new Set((params.get('pk') ?? '').split(',').filter(id => packages.some(p => p.id === id)))

  const set = (patch: Record<string, string | number | null>) => {
    const next = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) v === null ? next.delete(k) : next.set(k, String(v))
    router.replace(`${pathname}?${next.toString()}`, { scroll: false })
  }
  const go = (s: number) => { set({ step: s }); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const options = paint.price + wheel.price + caliper.price + [...chosen].reduce((sum, id) => sum + (packages.find(p => p.id === id)?.price ?? 0), 0)
  const total = (car?.price ?? 0) + options
  const monthly = monthlyRepayment({ price: total, ...defaultFinance })
  const summary = car ? `${car.year} ${car.brand} ${car.model} — ${paint.name}, ${wheel.name} wheels, ${caliper.name} calipers, ${interior.name} leather with ${trim.name.toLowerCase()} trim${chosen.size ? `; packages: ${[...chosen].map(id => packages.find(p => p.id === id)!.name).join(', ')}` : ''}. Total ${money(total)}.` : ''

  const [saved, setSaved] = useState<SavedBuild[]>([])
  const [reserving, setReserving] = useState(false)
  useEffect(() => setSaved(readStore<SavedBuild[]>('dbm-builds', [])), [])
  const save = () => {
    if (!car) return
    const entry = { href: `${pathname}?${params.toString()}`, title: `${car.brand} ${car.model} · ${paint.name}`, total, savedAt: Date.now() }
    const next = [entry, ...saved.filter(b => b.href !== entry.href)].slice(0, 6)
    setSaved(next); writeStore('dbm-builds', next); toast('Build saved to this device')
  }
  const remove = (href: string) => { const next = saved.filter(b => b.href !== href); setSaved(next); writeStore('dbm-builds', next) }

  return <section className="section-wrap py-10 md:py-16">
    <div className="eyebrow">BUILD &amp; PRICE</div>
    <h1 className="mt-3 text-4xl md:text-6xl">{car ? `Your ${car.model}` : 'Commission your car'}</h1>

    <ol className="mt-8 grid grid-cols-5 gap-2" aria-label="Build steps">
      {steps.map((label, i) => <li key={label}>
        <button type="button" disabled={!car && i > 0} onClick={() => go(i)} aria-current={i === step ? 'step' : undefined} className="group w-full text-left disabled:cursor-not-allowed">
          <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-bronze' : 'bg-line/10'}`} />
          <span className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>{String(i + 1).padStart(2, '0')} · {label}</span>
        </button>
      </li>)}
    </ol>

    {step === 0 && <div className="mt-10 grid animate-fade-up gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {available.sort((a, b) => b.price - a.price).map(c => <button key={c.id} type="button" onClick={() => set({ car: c.slug, step: 1 })} data-cursor="Build" className={`group overflow-hidden rounded-[24px] bg-card text-left ring-1 transition hover:-translate-y-1 hover:shadow-xl ${car?.id === c.id ? 'ring-ink' : 'ring-line/10'}`}>
        <span className="relative block aspect-[1.6/1] overflow-hidden"><VehicleImage car={c} sizes="(max-width: 640px) 100vw, 33vw" className="transition duration-700 group-hover:scale-105" /></span>
        <span className="block p-5"><span className="eyebrow">{c.brand}</span><span className="mt-1 block font-display text-2xl">{c.model}</span><span className="price mt-2 block text-lg text-muted">From {money(c.price)}</span></span>
      </button>)}
    </div>}

    {car && step > 0 && <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
      <div className="min-w-0 animate-fade-up" key={step}>
        {step === 1 && <Panel title="Exterior" lead="Paint, wheels and brake calipers. Every combination is shown live.">
          <Group label="Paint">{paints.map((p, i) => <Swatch key={p.name} active={p.name === paint.name} onClick={() => set({ p: i })} colour={p.hex} label={p.name} price={p.price} />)}</Group>
          <Group label="Wheels">{wheels.map((w, i) => <Option key={w.name} active={w.name === wheel.name} onClick={() => set({ w: i })} label={w.name} price={w.price} />)}</Group>
          <Group label="Calipers">{calipers.map((c, i) => <Swatch key={c.name} active={c.name === caliper.name} onClick={() => set({ c: i })} colour={c.hex} label={c.name} price={c.price} />)}</Group>
        </Panel>}

        {step === 2 && <Panel title="Interior" lead="Choose the hide and the trim you’ll touch every day.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="tex-leather aspect-[4/3] rounded-3xl shadow-inner" style={{ ['--tone' as string]: interior.hex }} role="img" aria-label={`${interior.name} leather close-up`} />
            <div className={`${trim.texture} aspect-[4/3] rounded-3xl shadow-inner`} role="img" aria-label={`${trim.name} close-up`} />
          </div>
          <Group label="Leather">{interiorColours.map((c, i) => <Swatch key={c.name} active={c.name === interior.name} onClick={() => set({ i })} colour={c.hex} label={c.name} price={0} />)}</Group>
          <Group label="Trim">{materials.filter(m => m.id !== 'leather').map(m => <button key={m.id} type="button" onClick={() => set({ t: m.id })} aria-pressed={m.id === trim.id} className={`flex items-center gap-3 rounded-2xl p-2 pr-4 text-left text-sm ring-1 transition ${m.id === trim.id ? 'bg-surface ring-ink' : 'ring-line/10 hover:ring-line/30'}`}><span className={`${m.texture} h-10 w-10 shrink-0 rounded-xl`} /><span><strong className="block font-semibold">{m.name}</strong><span className="text-xs text-muted">{m.note}</span></span></button>)}</Group>
        </Panel>}

        {step === 3 && <Panel title="Packages" lead="Optional additions, fitted and certified before delivery.">
          <div className="grid gap-3 sm:grid-cols-2">{packages.map(p => { const on = chosen.has(p.id); return <button key={p.id} type="button" aria-pressed={on} onClick={() => { const next = new Set(chosen); on ? next.delete(p.id) : next.add(p.id); set({ pk: [...next].join(',') || null }) }}
            className={`flex gap-3 rounded-2xl p-4 text-left ring-1 transition ${on ? 'bg-surface ring-ink' : 'ring-line/10 hover:ring-line/30'}`}>
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? 'border-ink bg-ink text-canvas' : 'border-line/30'}`}>{on && <Check size={13} />}</span>
            <span><strong className="block text-sm">{p.name}</strong><span className="mt-1 block text-xs leading-5 text-muted">{p.detail}</span><span className="price mt-2 block text-sm">+{money(p.price)}</span></span>
          </button> })}</div>
        </Panel>}

        {step === 4 && <Panel title="Your commission" lead="Review your specification. Reserving holds a build slot; nothing is charged online.">
          <dl className="divide-y divide-line/10 rounded-2xl bg-surface px-5 ring-1 ring-line/10">
            <Row label={`${car.year} ${car.brand} ${car.model}`} value={money(car.price)} />
            <Row label={`Paint · ${paint.name}`} value={paint.price ? `+${money(paint.price)}` : 'Included'} />
            <Row label={`Wheels · ${wheel.name}`} value={wheel.price ? `+${money(wheel.price)}` : 'Included'} />
            <Row label={`Calipers · ${caliper.name}`} value={caliper.price ? `+${money(caliper.price)}` : 'Included'} />
            <Row label={`Interior · ${interior.name} leather, ${trim.name.toLowerCase()}`} value="Included" />
            {[...chosen].map(id => { const p = packages.find(x => x.id === id)!; return <Row key={id} label={p.name} value={`+${money(p.price)}`} /> })}
            <Row label="Total" value={money(total)} strong />
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setReserving(true)} className="pill-black gap-2">Reserve a build slot <ArrowRight size={16} /></button>
            <button type="button" onClick={save} className="pill-outline gap-2"><Bookmark size={16} /> Save build</button>
            <ShareButton title={`My ${car.brand} ${car.model}`} text={summary} />
          </div>
          {reserving && <EnquiryForm kind="reserve" car={car} initialMessage={summary.slice(0, 1400)} onClose={() => setReserving(false)} />}
        </Panel>}

        <div className="mt-8 flex justify-between gap-3">
          <button type="button" onClick={() => go(step - 1)} className="pill-outline gap-2"><ArrowLeft size={16} /> {step === 1 ? 'Change model' : 'Back'}</button>
          {step < 4 && <button type="button" onClick={() => go(step + 1)} className="pill-black gap-2">Continue to {steps[step + 1].toLowerCase()} <ArrowRight size={16} /></button>}
        </div>
      </div>

      {/* Live summary */}
      <aside className="panel overflow-hidden lg:sticky lg:top-28">
        <div className="hero-bg px-4 pt-6"><CarSvg suv={['SUV', 'Crossover'].includes(car.bodyType)} paint={paint.hex} wheel={wheel.style} caliper={caliper.hex} /></div>
        <div className="p-6">
          <p className="eyebrow">{car.brand}</p>
          <p className="mt-1 font-display text-2xl">{car.model}</p>
          <p className="mt-1 text-sm text-muted">{paint.name} · {interior.name} interior</p>
          <div className="mt-5 border-t border-line/10 pt-5">
            <p className="text-xs text-muted">Total as configured</p>
            <p className="price text-3xl">₦<AnimatedNumber value={total} /></p>
            <p className="mt-1 text-xs text-muted">or about {money(monthly)}/month with 40% down over 48 months</p>
          </div>
        </div>
      </aside>
    </div>}

    {saved.length > 0 && <div className="mt-16"><h2 className="text-2xl">Saved builds</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{saved.map(b => <li key={b.href} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-4 ring-1 ring-line/10">
        <Link href={b.href} className="min-w-0"><strong className="block truncate text-sm">{b.title}</strong><span className="price text-sm text-muted">{money(b.total)}</span></Link>
        <button type="button" aria-label={`Delete saved build ${b.title}`} onClick={() => remove(b.href)} className="circle-btn h-9 w-9"><Trash2 size={15} /></button>
      </li>)}</ul></div>}
  </section>
}

function Panel({ title, lead, children }: { title: string; lead: string; children: React.ReactNode }) {
  return <div><h2 className="text-3xl">{title}</h2><p className="mt-2 text-muted">{lead}</p><div className="mt-7 space-y-8">{children}</div></div>
}
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset><legend className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-muted">{label}</legend><div className="flex flex-wrap gap-3">{children}</div></fieldset>
}
function Swatch({ active, onClick, colour, label, price }: { active: boolean; onClick: () => void; colour: string; label: string; price: number }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm ring-1 transition ${active ? 'bg-surface ring-ink' : 'ring-line/10 hover:ring-line/30'}`}>
    <span className="h-8 w-8 rounded-full ring-1 ring-black/10" style={{ background: `radial-gradient(circle at 30% 30%, #ffffff40, ${colour} 60%)` }} />
    <span>{label}{price > 0 && <span className="ml-1.5 text-xs text-muted">+{money(price)}</span>}</span>
  </button>
}
function Option({ active, onClick, label, price }: { active: boolean; onClick: () => void; label: string; price: number }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`rounded-2xl px-4 py-3 text-sm ring-1 transition ${active ? 'bg-ink text-canvas ring-ink' : 'ring-line/10 hover:ring-line/30'}`}>{label}<span className={`ml-2 text-xs ${active ? 'text-canvas/70' : 'text-muted'}`}>{price ? `+${money(price)}` : 'Included'}</span></button>
}
function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between gap-4 py-3 text-sm ${strong ? 'text-base font-semibold' : ''}`}><dt className={strong ? '' : 'text-muted'}>{label}</dt><dd className={strong ? 'price text-xl' : ''}>{value}</dd></div>
}
