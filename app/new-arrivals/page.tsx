'use client'
import { CarCard } from '@/components/CarCard'
import { Reveal } from '@/components/Motion'
import { useInventory } from '@/context/InventoryContext'

export default function NewArrivals() {
  const { cars } = useInventory()
  const list = cars.filter(c => c.newArrival || c.year >= 2023).sort((a, b) => b.year - a.year)
  return <section className="section-wrap py-14">
    <div className="eyebrow">JUST ARRIVED</div>
    <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-6xl">New arrivals</h1>
    <p className="mt-4 max-w-2xl text-muted">The newest cars in the collection, from 2023 onwards.</p>
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{list.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 100}><CarCard car={c} /></Reveal>)}</div>
  </section>
}
