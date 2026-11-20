'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Heart, Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { money } from '@/data/cars'
import { useGarageCars, useShop } from '@/context/ShopContext'

const links = [
  ['/showroom','Showroom'], ['/new-arrivals','New arrivals'], ['/brands','Brands'], ['/sell-your-car','Sell your car'], ['/financing','Financing'], ['/about','About']
]

export function Logo(){
  return <Link href="/" className="flex items-baseline gap-2 font-black tracking-[.22em] text-xl md:text-2xl"><span>DEV BOYZ</span><span className="text-[8px] font-semibold tracking-[.42em] text-neutral-500">MOTORS</span></Link>
}

export function SiteHeader(){
  const path = usePathname(); const {wishlist,garage,setGarageOpen}=useShop(); const [mobile,setMobile]=useState(false)
  return <>
    <div className="bg-[#111] px-4 py-3 text-center text-[11px] tracking-wide text-white/70">Nationwide delivery on every car <span className="mx-4 text-white/30">•</span> Every car inspected before listing <span className="mx-4 text-white/30">•</span> Pay in instalments available</div>
    <header className="sticky top-0 z-40 border-b border-black/5 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-8 lg:px-10">
        <Logo/>
        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {links.map(([href,label])=><Link key={href} href={href} className={`relative py-2 transition hover:text-black ${path===href?'text-black':'text-neutral-600'}`}>{label}{path===href&&<span className="absolute inset-x-0 bottom-0 h-px bg-black"/>}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/showroom" aria-label="Search" className="circle-btn"><Search size={18}/></Link>
          <button aria-label="Wishlist" className="circle-btn relative"><Heart size={18}/>{wishlist.length>0&&<Badge>{wishlist.length}</Badge>}</button>
          <button onClick={()=>setGarageOpen(true)} aria-label="Garage" className="circle-btn relative"><ShoppingBag size={18}/>{garage.length>0&&<Badge>{garage.length}</Badge>}</button>
          <Link href="/showroom" className="hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white sm:inline-flex">Book a viewing</Link>
          <button className="circle-btn lg:hidden" onClick={()=>setMobile(v=>!v)}>{mobile?<X size={18}/>:<Menu size={18}/>}</button>
        </div>
      </div>
      {mobile&&<div className="border-t border-black/5 bg-card px-5 py-4 lg:hidden">{links.map(([href,label])=><Link onClick={()=>setMobile(false)} key={href} href={href} className="block border-b border-black/5 py-3 text-sm">{label}</Link>)}</div>}
    </header>
  </>
}

function Badge({children}:{children:React.ReactNode}){ return <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] text-white">{children}</span> }

export function GarageDrawer(){
  const {garageOpen,setGarageOpen,removeGarage}=useShop(); const selected=useGarageCars(); const router=useRouter(); const total=selected.reduce((a,c)=>a+c.price,0)
  useEffect(()=>{ document.body.style.overflow=garageOpen?'hidden':''; return()=>{document.body.style.overflow=''} },[garageOpen])
  return <div className={`fixed inset-0 z-[80] ${garageOpen?'pointer-events-auto':'pointer-events-none'}`} aria-hidden={!garageOpen}>
    <button aria-label="Close garage" onClick={()=>setGarageOpen(false)} className={`absolute inset-0 bg-black/55 transition-opacity ${garageOpen?'opacity-100':'opacity-0'}`}/>
    <aside className={`absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-canvas shadow-2xl transition-transform duration-300 ${garageOpen?'translate-x-0':'translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-black/5 px-7 py-6"><h2 className="text-2xl font-bold">Your garage <span className="text-sm font-normal text-neutral-500">{selected.length} cars</span></h2><button className="circle-btn" onClick={()=>setGarageOpen(false)}><X size={20}/></button></div>
      <div className="flex-1 space-y-4 overflow-y-auto p-7">
        {selected.length===0?<div className="rounded-3xl bg-white p-8 text-neutral-500">Your garage is empty. Add a car from the showroom.</div>:selected.map(c=><div key={c.id} className="flex gap-4 rounded-3xl bg-white p-4 ring-1 ring-black/5"><img src={c.images[0]} alt="" className="h-24 w-32 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><div className="eyebrow">{c.brand}</div><h3 className="font-bold">{c.model}</h3><p className="text-xs text-neutral-500">{c.year} · {c.mileage.toLocaleString()} km · {c.condition}</p><p className="mt-2 font-bold">{money(c.price)}</p></div><button onClick={()=>removeGarage(c.id)} className="self-center text-xs underline">Remove</button></div>)}
        <div className="rounded-3xl border border-dashed border-black/20 bg-white/60 p-5 text-sm text-neutral-600">Reserve a car with a small deposit. It holds the car for 72 hours and comes off the final price.</div>
      </div>
      <div className="border-t border-black/5 bg-card p-7"><Summary label="Cars total" value={money(total)}/><Summary label="Reservation deposit" value="₦1,000,000"/><div className="my-4 h-px bg-black/10"/><Summary label="Pay today" value="₦1,000,000" strong/><button disabled={!selected.length} onClick={()=>{setGarageOpen(false);router.push('/checkout')}} className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-4 font-semibold text-white disabled:opacity-40">Continue to checkout <ArrowRight size={17}/></button></div>
    </aside>
  </div>
}

function Summary({label,value,strong=false}:{label:string,value:string,strong?:boolean}){return <div className={`flex items-center justify-between py-2 ${strong?'text-lg font-bold':'text-sm'}`}><span>{label}</span><span>{value}</span></div>}

export function Footer(){
  return <footer className="bg-[#111] px-5 py-16 text-white md:px-10"><div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-4"><div><Logo/><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">Luxury and foreign-used cars. Inspected and delivered across Nigeria.</p></div><FooterCol title="SHOWROOM" items={['Mercedes-Benz','Lexus','Toyota','Range Rover']}/><FooterCol title="COMPANY" items={['About us','Financing','Sell your car','Contact']}/><FooterCol title="VISIT" items={['Showroom open Mon–Sat','9:00am – 6:00pm','WhatsApp us anytime']}/></div></footer>
}
function FooterCol({title,items}:{title:string,items:string[]}){return <div><div className="eyebrow !text-white/45">{title}</div><div className="mt-4 space-y-3 text-sm text-white/65">{items.map(x=><div key={x}>{x}</div>)}</div></div>}
