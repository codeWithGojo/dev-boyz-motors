'use client'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { Car, km, money } from '@/data/cars'
import { useShop } from '@/context/ShopContext'

export function CarCard({car}:{car:Car}){
 const {wishlist,toggleWishlist}=useShop(); const active=wishlist.includes(car.id)
 return <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] bg-card ring-1 ring-black/[.06] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
   <div className="relative aspect-[1.18/1] min-w-0 shrink-0 overflow-hidden bg-neutral-200"><img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"/><span className={`absolute left-3 top-3 max-w-[calc(100%-5rem)] rounded-full px-3 py-1.5 text-xs font-medium sm:left-4 sm:top-4 ${car.condition==='Brand new'?'bg-bronze text-white':'bg-black/80 text-white'}`}>{car.condition}</span><button type="button" aria-label="Toggle wishlist" onClick={()=>toggleWishlist(car.id)} className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm sm:right-4 sm:top-4 ${active?'text-red-500':''}`}><Heart size={18} fill={active?'currentColor':'none'}/></button></div>
   <div className="flex min-w-0 flex-1 flex-col p-5"><div className="eyebrow">{car.brand}</div><Link href={`/cars/${car.slug}`} className="mt-1 block break-words text-xl font-bold leading-snug tracking-tight">{car.model}</Link><p className="mt-auto flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 pt-6 text-sm text-neutral-500"><span>{car.year}</span><span aria-hidden="true">·</span><span>{km(car.mileage)}</span><span aria-hidden="true">·</span><span>{car.transmission}</span></p><div className="mt-5 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-3 border-t border-black/10 pt-5"><strong className="min-w-0 break-words text-lg font-bold tabular-nums sm:text-xl">{money(car.price)}</strong><Link href={`/cars/${car.slug}`} className="flex shrink-0 items-center gap-2 text-sm font-semibold">View <ArrowRight size={16} className="transition group-hover:translate-x-1"/></Link></div></div>
 </article>
}
