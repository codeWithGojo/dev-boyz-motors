'use client'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { articles, limitedEditions, materials } from '@/lib/content'
import { money } from '@/data/cars'
import { Reveal } from './Motion'
import { VehicleImage } from './VehicleImage'

/** The Atelier Collection: limited, numbered specifications with allocation counters. */
export function LimitedEditions() {
  const { cars } = useInventory()
  return <section className="bg-night py-20 text-white md:py-28" aria-labelledby="atelier-title">
    <div className="section-wrap">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div><div className="eyebrow">THE ATELIER COLLECTION</div><h2 id="atelier-title" className="mt-3 max-w-2xl text-4xl md:text-6xl">Numbered. Never repeated.</h2></div>
        <p className="max-w-sm text-white/60">Bespoke specifications commissioned for Nigerian clients, built in tiny runs and allocated by invitation.</p>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {limitedEditions.map((ed, i) => { const car = cars.find(c => c.id === ed.carId); if (!car) return null; return <Reveal key={ed.name} delay={i * 120}>
          <Link href={`/build?car=${car.slug}&step=1`} data-cursor="Commission" className="group block overflow-hidden rounded-[28px] bg-white/[.04] ring-1 ring-white/10 transition hover:ring-bronze/60">
            <div className="relative aspect-[4/3] overflow-hidden">
              <VehicleImage car={car} sizes="(max-width: 1024px) 100vw, 33vw" className="transition duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-bronze px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em]">{ed.remaining} of {ed.total} remaining</span>
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-white/15 blur-2xl" style={{ animation: 'sheen 4.5s ease-in-out infinite', animationDelay: `${i * .8}s` }} />
            </div>
            <div className="p-7">
              <p className="eyebrow">{car.brand}</p>
              <h3 className="mt-2 font-display text-3xl">{ed.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{ed.detail}</p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="price text-lg">From {money(car.price * 1.18)}</span>
                <span className="inline-flex items-center gap-1 text-sm text-bronze">Commission <ArrowUpRight size={15} /></span>
              </div>
              <div className="mt-4 flex gap-1" aria-hidden="true">{Array.from({ length: ed.total }, (_, n) => <span key={n} className={`h-1 flex-1 rounded-full ${n < ed.total - ed.remaining ? 'bg-white/20' : 'bg-bronze'}`} />)}</div>
            </div>
          </Link>
        </Reveal> })}
      </div>
      <p className="mt-6 text-xs text-white/40">Demo editions for illustration.</p>
    </div>
  </section>
}

/** Heritage & craftsmanship teaser with material close-ups. */
export function HeritageTeaser() {
  return <section className="section-wrap py-20 md:py-28" aria-labelledby="heritage-title">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <div className="eyebrow">CRAFTSMANSHIP &amp; HERITAGE</div>
        <h2 id="heritage-title" className="mt-3 text-4xl md:text-6xl">Paperwork first. <span className="italic text-ink/60">Then everything else.</span></h2>
        <p className="mt-5 max-w-lg text-lg font-light leading-8 text-ink/75">Since our first car, every sale has started with the documents on the bonnet. Today every car is inspected, corrected and protected in our own studio before you see it.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/craftsmanship" className="pill-black gap-2">Our story <ArrowRight size={16} /></Link><Link href="/gallery" className="pill-outline">Walk the virtual showroom</Link></div>
      </Reveal>
      <Reveal delay={150} className="grid grid-cols-3 gap-3">
        {materials.slice(0, 3).map((m, i) => <div key={m.id} className={`${m.texture} rounded-[22px] ${i === 1 ? 'mt-10 aspect-[3/5]' : 'aspect-[3/4]'}`} role="img" aria-label={`${m.name} close-up`} />)}
      </Reveal>
    </div>
  </section>
}

/** Latest journal stories. */
export function JournalTeaser() {
  const { cars } = useInventory()
  return <section className="section-wrap pb-20" aria-labelledby="journal-title">
    <Reveal className="flex flex-wrap items-end justify-between gap-4"><div><div className="eyebrow">THE JOURNAL</div><h2 id="journal-title" className="mt-3 text-4xl">Stories worth the drive</h2></div><Link href="/journal" className="text-sm font-semibold underline underline-offset-4">All stories</Link></Reveal>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {articles.map((a, i) => { const car = cars.find(c => c.id === a.carId); return <Reveal key={a.slug} delay={i * 100}>
        <Link href={`/journal/${a.slug}`} data-cursor="Read" className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-line/10">{car && <VehicleImage car={car} sizes="(max-width: 768px) 100vw, 33vw" className="transition duration-700 group-hover:scale-105" />}</div>
          <p className="eyebrow mt-4">{a.category} · {a.minutes} min</p><h3 className="mt-2 font-display text-2xl leading-snug">{a.title}</h3>
        </Link>
      </Reveal> })}
    </div>
  </section>
}
