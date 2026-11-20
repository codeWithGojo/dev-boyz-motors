'use client'
import Link from 'next/link'
import type { Car } from '@/data/cars'
import { money,km } from '@/data/cars'
import { Heart,ShoppingBag,MessageCircle,ArrowUpRight,CheckCircle2 } from 'lucide-react'
import { useShop } from '@/context/ShopContext'
import { whatsappUrl,vehicleMessage } from '@/lib/site'
import { FinanceCalculator } from './FinanceCalculator'
import { EnquiryTrigger } from './EnquiryForm'
import { CarGallery } from './CarGallery'
export function CarDetailContent({car}:{car:Car}){
 const {wishlist,toggleWishlist,garage,toggleGarage,setGarageOpen}=useShop()
 const liked=wishlist.includes(car.id),inGarage=garage.includes(car.id)
 return <div className="section-wrap py-10 md:py-14"><div className="text-xs text-neutral-500"><Link href="/">Home</Link> <span className="mx-2">/</span> <Link href="/showroom">Showroom</Link><span className="mx-2">/</span><strong className="text-black">{car.model}</strong></div>
 <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-12"><CarGallery car={car}/><div className="min-w-0"><div className="eyebrow">{car.brand} / {car.year}</div><h1 className="mt-3 break-words text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl md:text-6xl">{car.model}</h1><div className="mt-6 flex flex-wrap gap-2">{[car.condition,car.year,car.bodyType,car.transmission].map(item=><span key={item} className="rounded-full bg-white px-3.5 py-2 text-xs font-semibold ring-1 ring-black/5">{item}</span>)}</div><div className="my-7 h-px bg-black/10"/><div className="eyebrow">Indicative asking price</div><p className="mt-2 break-words text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{money(car.price)}</p><p className="mt-2 text-xs leading-5 text-neutral-500">Sample price. Contact us to confirm actual stock, price, duty status and documentation before making any payment.</p>
 <div className="mt-7 grid gap-3 sm:grid-cols-2"><EnquiryTrigger kind="reserve" car={car} className="pill-black gap-2"><CheckCircle2 size={17}/> Reserve this car</EnquiryTrigger><EnquiryTrigger kind="viewing" car={car} className="pill-outline">Book a viewing</EnquiryTrigger></div>
 <a className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#166c4a] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#11553a]" href={whatsappUrl(vehicleMessage(car,money))} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Enquire on WhatsApp <ArrowUpRight size={15}/></a>
 <div className="mt-4 grid gap-3 sm:grid-cols-2"><button type="button" onClick={()=>toggleWishlist(car.id)} aria-pressed={liked} className="pill-outline gap-2"><Heart size={17} fill={liked?'currentColor':'none'}/>{liked?'Saved to wishlist':'Save to wishlist'}</button><button type="button" onClick={()=>{if(!inGarage)toggleGarage(car.id);setGarageOpen(true)}} className="pill-outline gap-2"><ShoppingBag size={17}/>{inGarage?'Open garage':'Add to garage'}</button></div>
 <div className="mt-8 grid grid-cols-2 min-w-0 overflow-hidden rounded-3xl bg-card ring-1 ring-black/5">{[['Mileage',km(car.mileage)],['Engine',car.engine],['Transmission',car.transmission],['Fuel',car.fuel],['Body',car.bodyType],['Colour',car.colour]].map(([label,value],index)=><div key={label} className={`p-5 ${index%2===0?'border-r border-black/10':''} ${index<4?'border-b border-black/10':''}`}><div className="eyebrow !text-neutral-500">{label}</div><p className="mt-2 break-words text-sm font-bold">{value}</p></div>)}</div>
 <div className="mt-7"><FinanceCalculator initialPrice={car.price} compact/></div></div></div>
 <section className="mt-14 max-w-4xl"><div className="eyebrow">BUY WITH CLARITY</div><h2 className="mt-3 text-3xl font-bold tracking-tight">Before you commit</h2><p className="mt-4 text-neutral-600">Request the actual vehicle photographs, chassis number (VIN), vehicle history, inspection findings and a confirmed price. Reservations are enquiries only and do not create a payment obligation.</p></section></div>
}
