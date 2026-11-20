'use client'
import Link from 'next/link'
import { ArrowUpRight, Heart } from 'lucide-react'
import type { Car } from '@/data/cars'
import { km, money } from '@/data/cars'
import { monthlyRepayment, defaultFinance } from '@/lib/finance'
import { useShop } from '@/context/ShopContext'
import { VehicleImage } from './VehicleImage'
export function CarCard({car,priority=false}:{car:Car;priority?:boolean}){
 const {wishlist,toggleWishlist}=useShop()
 const saved=wishlist.includes(car.id)
 return <article className="group min-w-0 overflow-hidden rounded-[26px] bg-card shadow-[0_5px_30px_rgba(0,0,0,.025)] ring-1 ring-black/[.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[.07]">
  <div className="relative aspect-[1.2/1] overflow-hidden bg-[#dedbd5]"><Link href={`/cars/${car.slug}`} aria-label={`View ${car.brand} ${car.model}`} className="absolute inset-0"><VehicleImage car={car} priority={priority} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="transition duration-700 group-hover:scale-105"/></Link><span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-black">Model reference photo</span><button type="button" aria-label={saved?`Remove ${car.model} from wishlist`:`Save ${car.model} to wishlist`} aria-pressed={saved} onClick={()=>toggleWishlist(car.id)} className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-bronze ${saved?'text-rose-600':'text-black'}`}><Heart size={18} fill={saved?'currentColor':'none'}/></button></div>
  <div className="p-5"><div className="eyebrow">{car.brand} · {car.condition}</div><Link href={`/cars/${car.slug}`} className="mt-2 block text-[1.3rem] font-bold leading-snug tracking-[-.025em] hover:underline underline-offset-4">{car.model}</Link><p className="mt-3 text-xs text-neutral-500">{car.year} <span className="mx-1.5">·</span> {km(car.mileage)} <span className="mx-1.5">·</span> {car.transmission}</p><div className="mt-5 border-t border-black/10 pt-5"><div className="flex min-w-0 flex-wrap items-center justify-between gap-2"><strong className="min-w-0 break-words text-lg tracking-tight sm:text-xl">{money(car.price)}</strong><Link href={`/cars/${car.slug}`} aria-label={`Details for ${car.model}`} className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"><ArrowUpRight size={17}/></Link></div><p className="mt-2 text-xs text-neutral-500">Est. {money(monthlyRepayment({price:car.price,...defaultFinance}))}/mo · 40% down, 48 months</p></div></div>
 </article>
}
