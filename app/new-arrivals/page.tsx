import { cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'
export const metadata = { title:'New Arrivals' }
export default function NewArrivals(){const list=cars.filter(c=>c.newArrival||c.year>=2023);return <section className="section-wrap py-14"><div className="eyebrow">JUST ARRIVED</div><h1 className="mt-3 text-6xl font-black tracking-[-.05em]">New arrivals</h1><p className="mt-4 max-w-2xl text-neutral-600">Fresh inventory, inspected and documented before it reaches the showroom.</p><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{list.map(c=><CarCard key={c.id} car={c}/>)}</div></section>}
