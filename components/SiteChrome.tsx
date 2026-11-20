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
  return <Link href="/" aria-label="DEV BOYZ MOTORS home" className="flex min-w-0 shrink-0 flex-col leading-tight font-black tracking-[.14em] sm:flex-row sm:items-baseline sm:gap-2 sm:tracking-[.18em]">
    <span className="text-[16px] sm:text-lg xl:text-xl">DEV BOYZ</span>
    <span className="text-[8px] font-semibold tracking-[.25em] text-neutral-500 sm:tracking-[.32em]">MOTORS</span>
  </Link>
}

export function SiteHeader(){
  const path = usePathname()
  const {wishlist,garage,setGarageOpen} = useShop()
  const [mobile,setMobile] = useState(false)
  useEffect(()=>setMobile(false),[path])
  return <>
    <div className="bg-[#111] px-4 py-2.5 text-center text-[11px] leading-5 tracking-wide text-white/70">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>Nationwide delivery on every car</span>
        <span>Every car inspected before listing</span>
        <span>Pay in instalments available</span>
      </div>
    </div>
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/95 backdrop-blur-xl">
      <div className="section-wrap flex min-h-[76px] items-center justify-between gap-3 py-3 sm:gap-5">
        <Logo/>
        <nav aria-label="Main navigation" className="hidden min-w-0 items-center gap-4 text-[13px] xl:flex 2xl:gap-7">
          {links.map(([href,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined} className={`relative whitespace-nowrap py-2 transition hover:text-black ${path===href?'text-black':'text-neutral-600'}`}>{label}{path===href&&<span className="absolute inset-x-0 bottom-0 h-px bg-black"/>}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link href="/showroom" aria-label="Search showroom" className="circle-btn hidden sm:grid"><Search size={18}/></Link>
          <button type="button" aria-label={`Wishlist, ${wishlist.length} saved cars`} className="circle-btn relative"><Heart size={18}/>{wishlist.length>0&&<Badge>{wishlist.length}</Badge>}</button>
          <button type="button" onClick={()=>setGarageOpen(true)} aria-label={`Garage, ${garage.length} cars`} className="circle-btn relative"><ShoppingBag size={18}/>{garage.length>0&&<Badge>{garage.length}</Badge>}</button>
          <Link href="/showroom" className="hidden whitespace-nowrap rounded-full bg-black px-5 py-3 text-sm font-semibold text-white lg:inline-flex xl:px-6">Book a viewing</Link>
          <button type="button" aria-label={mobile?'Close navigation':'Open navigation'} aria-controls="mobile-navigation" aria-expanded={mobile} className="circle-btn xl:hidden" onClick={()=>setMobile(v=>!v)}>{mobile?<X size={18}/>:<Menu size={18}/>}</button>
        </div>
      </div>
      {mobile&&<nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-black/5 bg-card px-5 py-3 xl:hidden">{links.map(([href,label])=><Link onClick={()=>setMobile(false)} key={href} href={href} className="block border-b border-black/5 py-3.5 text-sm">{label}</Link>)}</nav>}
    </header>
  </>
}

function Badge({children}:{children:React.ReactNode}){ return <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] text-white">{children}</span> }

export function GarageDrawer(){
  const {garageOpen,setGarageOpen,removeGarage}=useShop()
  const selected=useGarageCars()
  const router=useRouter()
  const total=selected.reduce((a,c)=>a+c.price,0)
  useEffect(()=>{ document.body.style.overflow=garageOpen?'hidden':''; return()=>{document.body.style.overflow=''} },[garageOpen])
  return <div className={`fixed inset-0 z-[80] ${garageOpen?'pointer-events-auto':'pointer-events-none'}`} aria-hidden={!garageOpen}>
    <button type="button" aria-label="Close garage" onClick={()=>setGarageOpen(false)} className={`absolute inset-0 bg-black/55 transition-opacity ${garageOpen?'opacity-100':'opacity-0'}`}/>
    <aside role="dialog" aria-modal={garageOpen} aria-label="Your garage" className={`absolute right-0 top-0 flex h-[100dvh] w-full max-w-[520px] min-w-0 flex-col bg-canvas shadow-2xl transition-transform duration-300 ${garageOpen?'translate-x-0':'translate-x-full'}`}>
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/5 px-4 py-5 sm:px-7 sm:py-6"><h2 className="min-w-0 text-xl font-bold sm:text-2xl">Your garage <span className="block text-sm font-normal text-neutral-500 sm:inline">{selected.length} cars</span></h2><button type="button" aria-label="Close garage" className="circle-btn" onClick={()=>setGarageOpen(false)}><X size={20}/></button></div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-7">
        {selected.length===0?<div className="rounded-3xl bg-white p-6 text-neutral-500 sm:p-8">Your garage is empty. Add a car from the showroom.</div>:selected.map(c=><div key={c.id} className="grid min-w-0 grid-cols-[90px_minmax(0,1fr)] gap-3 rounded-3xl bg-white p-3 ring-1 ring-black/5 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:gap-4 sm:p-4"><img src={c.images[0]} alt="" className="h-20 w-full rounded-2xl object-cover sm:h-24"/><div className="min-w-0"><div className="eyebrow">{c.brand}</div><h3 className="break-words font-bold">{c.model}</h3><p className="text-xs leading-5 text-neutral-500">{c.year} · {c.mileage.toLocaleString()} km · {c.condition}</p><p className="mt-2 break-words font-bold tabular-nums">{money(c.price)}</p></div><button type="button" onClick={()=>removeGarage(c.id)} className="col-span-2 justify-self-end text-xs underline sm:col-span-1 sm:self-center">Remove</button></div>)}
        <div className="rounded-3xl border border-dashed border-black/20 bg-white/60 p-4 text-sm leading-6 text-neutral-600 sm:p-5">Reserve a car with a small deposit. It holds the car for 72 hours and comes off the final price.</div>
      </div>
      <div className="max-h-[45dvh] shrink-0 overflow-y-auto border-t border-black/5 bg-card p-4 sm:p-7"><Summary label="Cars total" value={money(total)}/><Summary label="Reservation deposit" value="₦1,000,000"/><div className="my-4 h-px bg-black/10"/><Summary label="Pay today" value="₦1,000,000" strong/><button type="button" disabled={!selected.length} onClick={()=>{setGarageOpen(false);router.push('/checkout')}} className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-center font-semibold text-white disabled:opacity-40">Continue to checkout <ArrowRight size={17} className="shrink-0"/></button></div>
    </aside>
  </div>
}

function Summary({label,value,strong=false}:{label:string,value:string,strong?:boolean}){return <div className={`flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-2 ${strong?'text-lg font-bold':'text-sm'}`}><span className="min-w-0">{label}</span><span className="min-w-0 break-words text-right tabular-nums">{value}</span></div>}

export function Footer(){
  return <footer className="bg-[#111] px-5 py-16 text-white md:px-10"><div className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4"><div className="min-w-0"><Logo/><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">Luxury and foreign-used cars. Inspected and delivered across Nigeria.</p></div><FooterCol title="SHOWROOM" items={['Mercedes-Benz','Lexus','Toyota','Range Rover']}/><FooterCol title="COMPANY" items={['About us','Financing','Sell your car','Contact']}/><FooterCol title="VISIT" items={['Showroom open Mon–Sat','9:00am – 6:00pm','WhatsApp us anytime']}/></div></footer>
}
function FooterCol({title,items}:{title:string,items:string[]}){return <div className="min-w-0"><div className="eyebrow !text-white/45">{title}</div><div className="mt-4 space-y-3 text-sm leading-6 text-white/65">{items.map(x=><div key={x}>{x}</div>)}</div></div>}
