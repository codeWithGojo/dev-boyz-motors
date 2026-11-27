'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { money } from '@/data/cars'
import { VehicleImage } from './VehicleImage'
import { AccentPicker } from './AccentPicker'

/** Each attribute pill shows one flagship car. */
const slides = [
  { pill: 'Craftsmanship', id: '29', word: 'Phantom', tagline: 'Luxury Without Compromise' },
  { pill: 'Performance', id: '5', word: 'Urus', tagline: 'Performance Without Compromise' },
  { pill: 'Prestige', id: '13', word: 'G 63', tagline: 'Presence Without Compromise' },
  { pill: 'Elegance', id: '6', word: 'Autobiography', tagline: 'Elegance Without Compromise' },
  { pill: 'Comfort', id: '25', word: 'LS 500', tagline: 'Serenity Without Compromise' },
  { pill: 'Adventure', id: '27', word: 'Prado', tagline: 'Capability Without Compromise' },
  { pill: 'Technology', id: '28', word: 'Model Y', tagline: 'Innovation Without Compromise' },
]
const AUTOPLAY_MS = 6500
// Largest size the giant word may take; shorter words fill the width up to this.
const MAX_WORD = 'min(15vw, 240px)'
// Soft vignette plus a top fade so each photo melts into the backdrop behind the lettering.
const MASK = 'linear-gradient(to bottom, transparent 0%, #000 28%, #000 80%, transparent 100%), radial-gradient(ellipse 56% 62% at 50% 55%, #000 50%, transparent 100%)'
const STAGE_MASK: React.CSSProperties = { WebkitMaskImage: MASK, maskImage: MASK, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }

export function EditorialHero() {
  const { cars } = useInventory()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [calm, setCalm] = useState(false)
  const section = useRef<HTMLElement>(null)
  const pills = useRef<HTMLDivElement>(null)

  useEffect(() => { setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  useEffect(() => {
    if (paused || calm) return
    const id = window.setTimeout(() => setIndex(i => (i + 1) % slides.length), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, calm])

  // Keep the active pill visible in the scrolling row on phones.
  useEffect(() => {
    const row = pills.current
    const pill = row?.children[index] as HTMLElement | undefined
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: pill.offsetLeft - 16, behavior: calm ? "auto" : "smooth" })
  }, [index, calm])

  const items = slides.map(s => ({ ...s, car: cars.find(c => c.id === s.id)! })).filter(s => s.car)
  const active = items[index] ?? items[0]
  const { car } = active

  return <section ref={section} aria-roledescription="carousel" aria-label="Featured cars"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={e => { if (!section.current?.contains(e.relatedTarget as Node)) setPaused(false) }}
    className="relative overflow-hidden hero-bg">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_78%_18%,rgb(var(--accent)/.16),transparent_70%),radial-gradient(45%_40%_at_10%_90%,rgb(var(--night)/.10),transparent_70%)] transition-colors duration-700" aria-hidden="true" />
    <h1 className="sr-only">DEV BOYZ MOTORS: luxury cars in Nigeria</h1>
    <div className="section-wrap relative flex flex-col pb-10 pt-10 md:pt-14">

      {/* Brand + tagline / series */}
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
        <div key={`brand-${index}`} className="animate-fade-up">
          <p className="flex items-center gap-2 font-display text-[clamp(30px,3.6vw,54px)] font-medium leading-none tracking-[.03em] [font-variant:small-caps]">
            {car.brand}
            <Link href={`/cars/${car.slug}`} aria-label={`About the ${car.brand} ${car.model}`} className="text-ink/60 transition hover:text-bronze"><Info size={18} strokeWidth={1.5} /></Link>
          </p>
          <p className="mt-3 text-lg font-light text-ink/80 md:text-xl">{active.tagline}</p>
        </div>
        <p key={`series-${index}`} className="animate-fade-up font-display text-lg md:mt-24 md:text-2xl">{car.model} · {car.year}</p>
      </div>

      {/* Attribute pills: a scrolling row on phones, a column on larger screens */}
      <div ref={pills} role="tablist" aria-label="Choose a featured car" className="relative z-20 -mx-4 mt-6 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:absolute md:left-5 md:top-[13.5rem] md:mx-0 md:mt-0 md:flex-col md:overflow-visible md:px-0 lg:left-10">
        {items.map((s, i) => <button key={s.pill} type="button" role="tab" aria-selected={i === index} aria-controls="hero-stage" onClick={() => setIndex(i)}
          className={`relative shrink-0 overflow-hidden rounded-xl px-4 py-2.5 text-[15px] tracking-[.01em] transition md:w-40 md:text-base ${i === index ? 'bg-night text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,.6)]' : 'bg-surface/85 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_2px_6px_-2px_rgba(0,0,0,.25)] ring-1 ring-line/[.08] hover:bg-surface'}`}>
          {s.pill}
          {i === index && !paused && !calm && <span key={index} className="absolute bottom-0 left-0 h-[2px] bg-bronze" style={{ animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards` }} />}
        </button>)}
      </div>

      {/* Stage: giant model name behind the car */}
      <div id="hero-stage" role="tabpanel" aria-label={`${car.year} ${car.brand} ${car.model}`} className="relative mt-6 md:mt-4 md:pl-44 lg:pl-48">
        <div className="relative" style={{ height: `calc(${MAX_WORD} * .78)` }} aria-hidden="true">
          {items.map((s, i) => <span key={s.pill}
            className={`absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center font-display font-normal uppercase leading-[.78] text-ink transition-all duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] ${i === index ? 'opacity-100 [letter-spacing:-.01em]' : 'translate-y-4 opacity-0 [letter-spacing:.12em]'}`}
            style={{ fontSize: `min(${MAX_WORD}, calc(78vw / (${Math.max(4, s.word.length)} * var(--display-width))))` }}>{s.word}</span>)}
        </div>
        <div className="relative z-10 mx-auto aspect-[4/3] w-full max-w-[1100px] sm:aspect-[16/9]" style={{ marginTop: `calc(${MAX_WORD} * -.42)` }}>
          {items.map((s, i) => <Link key={s.pill} href={`/cars/${s.car.slug}`} data-cursor="Explore" tabIndex={i === index ? 0 : -1} aria-hidden={i !== index}
            className={`absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] ${i === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.04] opacity-0'}`}
            style={STAGE_MASK}>
            <div className="absolute inset-0" style={i === index && !calm ? { animation: `hero-drift ${AUTOPLAY_MS + 3000}ms ease-in-out infinite alternate` } : undefined}><VehicleImage car={s.car} priority={i === 0} sizes="(max-width: 768px) 100vw, 1100px" /></div>
          </Link>)}
          <div className="pointer-events-none absolute inset-x-[12%] bottom-[4%] h-6 rounded-[50%] bg-black/25 blur-xl" aria-hidden="true" />
        </div>
      </div>

      {/* Footer row: counter, price and actions */}
      <div className="relative z-20 mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-line/10 pt-6">
        <div className="flex flex-wrap items-center gap-6">
          <p className="font-display text-lg tabular-nums text-ink/70" aria-live="polite">
            <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
          </p>
          <div className="flex items-center gap-3"><span className="eyebrow !text-ink/55">Finish</span><AccentPicker /></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div><p className="eyebrow !text-ink/55">From</p><p key={`price-${index}`} className="price animate-fade-up text-2xl md:text-3xl">{money(car.price)}</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/cars/${car.slug}`} className="pill-black gap-2">Explore the {active.word} <ArrowRight size={16} /></Link>
            <Link href="/showroom" className="pill-outline">View the collection</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
}
