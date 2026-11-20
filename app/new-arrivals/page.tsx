import { cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'
export const metadata = { title:'New Arrivals' }
export default function NewArrivals(){const list=cars.filter(c=>c.newArrival||c.year>=2023);return <section className="section-wrap py-14"><div className="eyebrow">JUST ARRIVED</div><h1 className="mt-3 break-words text-[clamp(2.5rem,5.5vw,3.75rem)] font-black leading-tight tracking-[-.05em]">New arrivals</h1><p className="mt-4 max-w-2xl text-neutral-600">Fresh inventory, inspected and documented before it reaches the showroom.</p><div className="mt-10 grid min-w-0 gap-5 sm:grid-cols-2 2xl:grid-cols-3">{list.map(c=><CarCard key={c.id} car={c}/>)}</div></section>}
