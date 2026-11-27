'use client'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { brands, money } from '@/data/cars'
import { VehicleImage } from '@/components/VehicleImage'

/** Virtual showroom: a dark, full-bleed, drag-to-scroll gallery of every car. */
export default function GalleryPage() {
  const { cars } = useInventory()
  const [brand, setBrand] = useState('')
  const [index, setIndex] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const list = useMemo(() => cars.filter(c => !brand || c.brand === brand).sort((a, b) => b.price - a.price), [cars, brand])

  const scrollTo = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const centre = el.scrollLeft + el.clientWidth / 2
      let best = 0, dist = Infinity
      ;[...el.children].forEach((c, i) => { const d = Math.abs((c as HTMLElement).offsetLeft + (c as HTMLElement).offsetWidth / 2 - centre); if (d < dist) { dist = d; best = i } })
      setIndex(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [list])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') scrollTo(Math.min(list.length - 1, index + 1)); if (e.key === 'ArrowLeft') scrollTo(Math.max(0, index - 1)) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const current = list[index]
  return <section className="relative min-h-[calc(100svh-110px)] overflow-hidden bg-night py-12 text-white">
    <div className="section-wrap flex flex-wrap items-end justify-between gap-6">
      <div><div className="eyebrow">VIRTUAL SHOWROOM</div><h1 className="mt-3 text-4xl md:text-6xl">Walk the floor.</h1></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by brand">
        {['', ...brands].map(b => <button key={b || 'all'} type="button" aria-pressed={brand === b} onClick={() => { setBrand(b); setIndex(0); track.current?.scrollTo({ left: 0 }) }} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${brand === b ? 'bg-white text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>{b || 'All'}</button>)}
      </div>
    </div>

    <div ref={track} data-cursor="Drag" className="mt-10 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-[10vw] pb-6 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      onPointerDown={e => { if (e.pointerType === 'mouse' && track.current) drag.current = { x: e.clientX, left: track.current.scrollLeft } }}
      onPointerMove={e => { if (drag.current && track.current) track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x) }}
      onPointerUp={() => { drag.current = null }} onPointerLeave={() => { drag.current = null }}>
      {list.map((car, i) => <figure key={car.id} className={`relative aspect-[16/10] w-[80vw] max-w-[1000px] shrink-0 snap-center overflow-hidden rounded-[28px] transition duration-700 ${i === index ? 'opacity-100' : 'scale-[.92] opacity-40'}`}>
        <VehicleImage car={car} priority={i < 2} draggable={false} sizes="80vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <figcaption className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
          <span><span className="eyebrow">{car.brand} · {car.year}</span><span className="mt-1 block font-display text-3xl md:text-5xl">{car.model}</span></span>
          <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Step inside <ArrowUpRight size={15} /></Link>
        </figcaption>
      </figure>)}
    </div>

    <div className="section-wrap mt-6 flex flex-wrap items-center justify-between gap-4">
      <p className="font-display text-xl text-white/70"><span className="text-white">{String(index + 1).padStart(2, '0')}</span> / {String(list.length).padStart(2, '0')}{current && <span className="ml-4 price text-lg text-white/60">{money(current.price)}</span>}</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => scrollTo(Math.max(0, index - 1))} aria-label="Previous car" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20"><ArrowLeft size={18} /></button>
        <button type="button" onClick={() => scrollTo(Math.min(list.length - 1, index + 1))} aria-label="Next car" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20"><ArrowRight size={18} /></button>
      </div>
    </div>
  </section>
}
