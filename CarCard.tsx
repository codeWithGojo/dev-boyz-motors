'use client'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { Car, km, money } from '@/data/cars'
import { useShop } from '@/context/ShopContext'

export function CarCard({car}:{car:Car}){
 const {wishlist,toggleWishlist}=useShop(); const active=wishlist.includes(car.id)
 return <article className="group overflow-hidden rounded-[24px] bg-card ring-1 ring-black/[.06] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
   <div className="relative aspect-[1.18/1] overflow-hidden bg-neutral-200"><img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"/><span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium ${car.condition==='Brand new'?'bg-bronze text-white':'bg-black/80 text-white'}`}>{car.condition}</span><button aria-label="Toggle wishlist" onClick={()=>toggleWishlist(car.id)} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm ${active?'text-red-500':''}`}><Heart size={18} fill={active?'currentColor':'none'}/></button></div>
   <div className="p-5"><div className="eyebrow">{car.brand}</div><Link href={`/cars/${car.slug}`} className="mt-1 block text-xl font-bold tracking-tight">{car.model}</Link><p className="mt-6 text-sm text-neutral-500">{car.year} <span className="mx-2">·</span> {km(car.mileage)} <span className="mx-2">·</span> {car.transmission}</p><div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5"><strong className="text-xl">{money(car.price)}</strong><Link href={`/cars/${car.slug}`} className="flex items-center gap-2 text-sm font-semibold">View <ArrowRight size={16} className="transition group-hover:translate-x-1"/></Link></div></div>
 </article>
}
