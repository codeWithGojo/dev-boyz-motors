'use client'
import Link from 'next/link'
import { ArrowRight, CalendarDays, FileSearch2, Handshake, MessageCircle, Quote, Sparkles, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CarCard } from '@/components/CarCard'
import { VehicleImage } from '@/components/VehicleImage'
import { EditorialHero } from '@/components/EditorialHero'
import { HeritageTeaser, JournalTeaser, LimitedEditions } from '@/components/HomeSections'
import { CountUp, Reveal } from '@/components/Motion'
import { brands, conditions, money, type Car } from '@/data/cars'
import { useInventory } from '@/context/InventoryContext'
import { useCarsByIds, useShop } from '@/context/ShopContext'
import { usePrefs } from '@/context/PreferencesContext'
import { whatsappUrl } from '@/lib/site'

// Demo content: fictional customers and lenders, clearly labelled on the page.
const testimonials = [
  { name: 'Tolu A.', city: 'Lekki, Lagos', car: 'Lexus RX 350', quote: 'They sent a walk-around video, the VIN and the customs papers before I paid a kobo. Handover took 20 minutes.' },
  { name: 'Chidi O.', city: 'Wuse II, Abuja', car: 'Mercedes-AMG C 63 S', quote: 'I compared three cars side by side on the site, booked a viewing on WhatsApp and drove home the same week.' },
  { name: 'Amaka E.', city: 'GRA, Port Harcourt', car: 'Toyota Land Cruiser Prado', quote: 'The finance estimate was spot on with what the bank offered. No surprises, no pressure.' },
]
const lenders = ['Northgate Finance', 'Coralstone Bank', 'Meridian Credit', 'Atlas Auto Capital', 'Harbourline MFB']

export default function Home() {
  const router = useRouter()
  const { t } = usePrefs()
  const { cars } = useInventory()
  const { recent } = useShop()
  const recentCars = useCarsByIds(recent).slice(0, 4)
  const [brand, setBrand] = useState(''), [model, setModel] = useState(''), [condition, setCondition] = useState(''), [max, setMax] = useState('')
  const availableModels = [...new Set(cars.filter(c => !brand || c.brand === brand).map(c => c.model))].sort()
  const featured = cars.filter(c => c.featured).slice(0, 4)
  const arrivals = cars.filter(c => c.newArrival).slice(0, 3)
  const search = () => {
    const query = new URLSearchParams()
    if (brand) query.set('brand', brand); if (model) query.set('model', model); if (condition) query.set('condition', condition); if (max) query.set('max', max)
    router.push(`/showroom?${query.toString()}`)
  }

  return <>
    <EditorialHero />
    <section className="section-wrap relative z-10 pb-12 pt-10" aria-label="Search and highlights">
      <div className="grid gap-6 border-b border-line/10 pb-10 sm:grid-cols-3">
        <Stat big={<CountUp value={cars.length} />} small="Hand-selected cars in the collection" />
        <Stat big={<CountUp value={186} />} small="Discerning buyers served*" />
        <Stat big={<CountUp value={4.9} decimals={1} suffix=" ★" />} small="Average client rating*" />
      </div>
      <div className="relative mt-10 rounded-[24px] bg-card p-4 shadow-xl shadow-black/5 ring-1 ring-line/5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
          <Select label="Brand" value={brand} options={brands} onChange={v => { setBrand(v); setModel('') }} />
          <Select label="Model" value={model} options={availableModels} onChange={setModel} />
          <Select label="Max price" value={max} options={['100000000', '200000000', '400000000', '700000000']} optionLabels={['₦100 million', '₦200 million', '₦400 million', '₦700 million']} onChange={setMax} />
          <Select label="Condition" value={condition} options={conditions} onChange={setCondition} />
          <button type="button" onClick={search} className="min-h-12 rounded-2xl bg-ink px-6 py-3.5 font-semibold text-canvas transition hover:opacity-90 sm:col-span-2 lg:col-span-1">{t('search.cta')}</button>
        </div>
      </div>
    </section>

    <section className="overflow-hidden border-y border-line/5 py-6" aria-label="Brands">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...brands, ...brands, ...brands].map((b, i) => <Link key={`${b}-${i}`} href={`/showroom?brand=${encodeURIComponent(b)}`} tabIndex={i >= brands.length ? -1 : undefined} aria-hidden={i >= brands.length || undefined} className="whitespace-nowrap text-lg font-black tracking-tight text-muted transition hover:text-bronze">{b}</Link>)}
      </div>
    </section>

    {recentCars.length > 0 && <section className="section-wrap pt-16"><SectionTitle eyebrow="PICK UP WHERE YOU LEFT OFF" title="Recently viewed" action="See your garage" href="/garage" />
      <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{recentCars.map(car => <CarCard key={car.id} car={car} />)}</div></section>}

    <section className="section-wrap py-16 md:py-20"><Reveal><SectionTitle eyebrow="CURATED MODELS" title="Hand-picked for you" action="Explore all models" href="/showroom" /></Reveal>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{featured.map((car, i) => <Reveal key={car.id} delay={i * 90}><CarCard car={car} /></Reveal>)}</div>
    </section>

    <section className="section-wrap pb-16">
      <Reveal className="grid gap-5 md:grid-cols-2">
        <Link href="/find-my-car" className="group relative overflow-hidden rounded-[30px] bg-night p-8 text-white md:p-10">
          <Sparkles className="text-bronze" /><h2 className="mt-5 text-3xl font-black tracking-tight">Not sure what to buy?</h2>
          <p className="mt-3 max-w-sm text-white/65">Answer five questions, or just describe what you need to our AI assistant, and get ranked matches from the showroom.</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold text-bronze">Find my car <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
        </Link>
        <Link href="/compare" className="group relative overflow-hidden rounded-[30px] bg-card p-8 ring-1 ring-line/5 md:p-10">
          <span className="text-bronze"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="5" height="16" rx="1" /><rect x="10" y="4" width="5" height="16" rx="1" /><rect x="17" y="4" width="4" height="16" rx="1" /></svg></span>
          <h2 className="mt-5 text-3xl font-black tracking-tight">Compare up to three cars</h2>
          <p className="mt-3 max-w-sm text-muted">Price, power, running costs and specs side by side, with the winner in each row highlighted.</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold">Start comparing <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
        </Link>
      </Reveal>
    </section>

    <LimitedEditions />
    <HeritageTeaser />

    <section className="bg-night py-16 text-white md:py-20"><div className="section-wrap">
      <Reveal><SectionTitle eyebrow="EXPLORE WHAT'S NEW" title="The latest in the collection" action="View new arrivals" href="/new-arrivals" dark /></Reveal>
      <div className="mt-9 grid gap-5 sm:grid-cols-3">{arrivals.map((car, i) => <Reveal key={car.id} delay={i * 120}><Link href={`/cars/${car.slug}`} data-cursor="View" className="group block min-w-0">
        <div className="relative aspect-[1.35/1] overflow-hidden rounded-3xl bg-neutral-800"><VehicleImage car={car} sizes="(max-width: 640px) 100vw, 33vw" className="transition duration-500 group-hover:scale-105" /></div>
        <h3 className="mt-4 break-words text-lg font-bold">{car.brand} {car.model}</h3><p className="mt-1 text-sm text-white/65">{car.year} · {money(car.price)}</p>
      </Link></Reveal>)}</div>
    </div></section>

    <section className="section-wrap py-16 md:py-20">
      <Reveal><div className="eyebrow">WHAT BUYERS SAY</div><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Trusted by drivers across Nigeria.</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{testimonials.map((item, i) => <Reveal key={item.name} delay={i * 120}><figure className="panel flex h-full flex-col p-7">
        <Quote className="text-bronze" size={28} />
        <div className="mt-4 flex gap-0.5 text-bronze" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, s) => <Star key={s} size={15} fill="currentColor" />)}</div>
        <blockquote className="mt-4 flex-1 leading-7">“{item.quote}”</blockquote>
        <figcaption className="mt-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-bronze/15 font-bold text-bronze">{item.name[0]}</span><span><strong className="block text-sm">{item.name}</strong><span className="text-xs text-muted">{item.city} · {item.car}</span></span></figcaption>
      </figure></Reveal>)}</div>
      <p className="mt-4 text-xs text-muted">*Demo content: testimonials, ratings and lender names on this page are fictional.</p>
    </section>

    <section className="border-y border-line/5 py-10" aria-label="Finance partners">
      <div className="section-wrap flex flex-wrap items-center justify-center gap-x-12 gap-y-4"><span className="eyebrow !text-muted">Finance partners (demo)</span>
        {lenders.map(l => <span key={l} className="text-lg font-black tracking-tight text-muted/70">{l}</span>)}</div>
    </section>

    <section className="section-wrap py-16 md:py-20">
      <Reveal><div className="eyebrow">BUY WITH CONFIDENCE</div><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">A considered, personal buying experience.</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Reveal><Feature icon={<FileSearch2 />} title="Full documentation" detail="Every car comes with its VIN, customs papers, a walk-around video and an inspection report." /></Reveal>
        <Reveal delay={120}><Feature icon={<CalendarDays />} title="View before you commit" detail="Book a private viewing and test drive at a time that suits you." /></Reveal>
        <Reveal delay={240}><Feature icon={<Handshake />} title="Clear terms" detail="Agree the final price, payment plan and handover date up front — no surprises." /></Reveal>
      </div>
    </section>

    <JournalTeaser />
    <section className="section-wrap pb-16"><Reveal><div className="flex flex-col gap-6 rounded-[30px] bg-bronze px-6 py-9 text-white sm:px-10 md:flex-row md:items-center md:justify-between">
      <div><div className="eyebrow !text-white/70">PERSONAL SOURCING</div><h2 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl">Can&apos;t find the one? We&apos;ll find it.</h2></div>
      <div className="flex flex-wrap gap-3"><Link href="/sell-your-car" className="inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 text-sm font-semibold text-white">Source or trade in <ArrowRight size={16} /></Link><a href={whatsappUrl('Hello DEV BOYZ MOTORS, please help me source a vehicle.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-3 text-sm font-semibold"><MessageCircle size={16} /> WhatsApp</a></div>
    </div></Reveal></section>
  </>
}

function Stat({ big, small }: { big: React.ReactNode; small: string }) { return <div className="min-w-0"><div className="font-display text-4xl sm:text-5xl">{big}</div><div className="mt-2 text-sm leading-5 text-muted">{small}</div></div> }
function Select({ label, value, options, optionLabels, onChange }: { label: string; value: string; options: readonly string[]; optionLabels?: string[]; onChange: (v: string) => void }) {
  return <label className="min-w-0 rounded-xl bg-surface px-4 py-3"><span className="eyebrow !text-muted">{label}</span><select value={value} onChange={e => onChange(e.target.value)} className="mt-1 block w-full min-w-0 bg-transparent text-sm font-semibold outline-none"><option value="">Any {label.toLowerCase()}</option>{options.map((option, i) => <option key={option} value={option}>{optionLabels?.[i] || option}</option>)}</select></label>
}
function SectionTitle({ eyebrow, title, action, href, dark = false }: { eyebrow: string; title: string; action: string; href: string; dark?: boolean }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="eyebrow">{eyebrow}</div><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2></div><Link href={href} className={`text-sm font-semibold underline underline-offset-4 ${dark ? 'text-white/80' : ''}`}>{action}</Link></div>
}
function Feature({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="panel h-full p-7"><div className="grid h-11 w-11 place-items-center rounded-xl bg-canvas text-bronze">{icon}</div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{detail}</p></div>
}
