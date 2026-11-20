'use client'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, SlidersHorizontal } from 'lucide-react'
import { cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'

const filterBrands=['Mercedes-AMG','Mercedes-Benz','Lexus','Toyota','Range Rover','Lamborghini','Tesla']
const conditions=['Brand new','Foreign used','Nigerian used']
const bodies=['SUV','Coupe','Sedan','Crossover','Hatchback','Pickup']
type FilterPanelProps={
 brands:string[]; setBrands:(v:string[])=>void
 conds:string[]; setConds:(v:string[])=>void
 body:string[]; setBody:(v:string[])=>void
 max:number; setMax:(v:number)=>void
 toggle:(arr:string[],set:(v:string[])=>void,x:string)=>void
 clear:()=>void
}

export default function Showroom(){return <Suspense fallback={<div className="section-wrap py-20">Loading showroom…</div>}><ShowroomContent/></Suspense>}
function ShowroomContent(){
 const sp=useSearchParams()
 const initialBrand=sp.get('brand')||''
 const initialCondition=sp.get('condition')||''
 const [brands,setBrands]=useState<string[]>(initialBrand?[initialBrand]:[])
 const [conds,setConds]=useState<string[]>(initialCondition?[initialCondition]:[])
 const [body,setBody]=useState<string[]>([])
 const [max,setMax]=useState(420000000)
 const [sort,setSort]=useState('newest')
 const [mobileFilters,setMobileFilters]=useState(false)
 useEffect(()=>{
  if(!mobileFilters)return
  const before=document.body.style.overflow
  document.body.style.overflow='hidden'
  const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMobileFilters(false)}
  document.addEventListener('keydown',close)
  return()=>{document.body.style.overflow=before;document.removeEventListener('keydown',close)}
 },[mobileFilters])
 const result=useMemo(()=>{
  let list=cars.filter(c=>(!brands.length||brands.includes(c.brand))&&(!conds.length||conds.includes(c.condition))&&(!body.length||body.includes(c.bodyType))&&c.price<=max)
  list=[...list].sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:sort==='mileage'?a.mileage-b.mileage:b.year-a.year)
  return list
 },[brands,conds,body,max,sort])
 const toggle=(arr:string[],set:(v:string[])=>void,x:string)=>set(arr.includes(x)?arr.filter(v=>v!==x):[...arr,x])
 const clear=()=>{setBrands([]);setConds([]);setBody([]);setMax(420000000)}
 const chips=[...brands,...conds,...body,...(max<420000000?[`Up to ₦${Math.round(max/1000000)}M`]:[])]
 const filterProps={brands,setBrands,conds,setConds,body,setBody,max,setMax,toggle,clear}
 return <section className="section-wrap py-10 md:py-14">
   <div className="text-sm text-neutral-500">Home <span className="mx-2">/</span> <span className="font-semibold text-black">Showroom</span></div>
   <div className="mt-5 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
     <h1 className="min-w-0 break-words text-[clamp(2.6rem,6.5vw,4.5rem)] font-black leading-tight tracking-[-.05em]">Showroom <span className="inline-block align-baseline text-xl font-normal tracking-normal text-neutral-500 sm:text-2xl">{result.length} cars</span></h1>
     <div className="flex min-w-0 flex-wrap items-center gap-3">
       <button type="button" className="pill-outline shrink-0 lg:hidden" onClick={()=>setMobileFilters(true)}><SlidersHorizontal size={16} className="mr-2 shrink-0"/>Filters</button>
       <label className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-neutral-500 sm:gap-3"><span className="shrink-0">Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)} className="min-w-0 max-w-full rounded-full bg-white px-4 py-3 font-semibold text-black outline-none sm:px-5"><option value="newest">Newest</option><option value="price-low">Price low → high</option><option value="price-high">Price high → low</option><option value="mileage">Mileage low → high</option></select></label>
     </div>
   </div>
   <div className="mt-9 grid min-w-0 gap-7 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)] xl:gap-8">
     <aside className="hidden min-w-0 lg:block"><FilterPanel {...filterProps}/></aside>
     <div className="min-w-0">
       <div className="mb-5 flex min-h-10 min-w-0 flex-wrap gap-2">{chips.map(ch=><button type="button" key={ch} onClick={()=>{if(brands.includes(ch))setBrands(brands.filter(x=>x!==ch));else if(conds.includes(ch))setConds(conds.filter(x=>x!==ch));else if(body.includes(ch))setBody(body.filter(x=>x!==ch));else setMax(420000000)}} className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-left text-xs font-semibold ring-1 ring-black/5"><span className="min-w-0 break-words">{ch}</span><X size={13} className="shrink-0"/></button>)}</div>
       {result.length?<div className="grid min-w-0 gap-5 sm:grid-cols-2 2xl:grid-cols-3">{result.map(c=><CarCard key={c.id} car={c}/>)}</div>:<div className="rounded-[28px] bg-card p-7 text-center sm:p-12"><h2 className="text-2xl font-bold">No cars match those filters.</h2><button type="button" onClick={clear} className="pill-black mt-5">Clear filters</button></div>}
     </div>
   </div>
   {mobileFilters&&<div className="fixed inset-0 z-[70] flex items-end bg-black/50 lg:hidden" role="presentation"><button type="button" aria-label="Close filters" onClick={()=>setMobileFilters(false)} className="absolute inset-0"/><div role="dialog" aria-modal="true" aria-label="Showroom filters" className="relative flex max-h-[calc(100dvh-1rem)] w-full min-w-0 flex-col overflow-hidden rounded-t-[30px] bg-canvas shadow-2xl"><div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/10 px-5 py-4"><h2 className="text-xl font-bold">Filters</h2><button type="button" aria-label="Close filters" className="circle-btn" onClick={()=>setMobileFilters(false)}><X/></button></div><div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5"><FilterPanel {...filterProps}/></div><div className="shrink-0 border-t border-black/10 bg-canvas p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"><button type="button" className="pill-black w-full" onClick={()=>setMobileFilters(false)}>Show {result.length} cars</button></div></div></div>}
  </section>
}
function FilterPanel(p:FilterPanelProps){
 const count=(b:string)=>cars.filter(c=>c.brand===b).length
 return <div className="min-w-0 rounded-[26px] bg-card p-5 ring-1 ring-black/[.05] sm:p-6">
   <div className="flex items-center justify-between gap-2"><div className="eyebrow !text-neutral-600">BRAND</div><button type="button" onClick={p.clear} className="text-xs underline">Clear</button></div>
   <div className="mt-4 space-y-3">{filterBrands.map(b=><label key={b} className="flex min-w-0 cursor-pointer items-center justify-between gap-3 text-sm"><span className="flex min-w-0 items-center gap-3"><input type="checkbox" checked={p.brands.includes(b)} onChange={()=>p.toggle(p.brands,p.setBrands,b)} className="h-5 w-5 shrink-0 accent-black"/><span className="min-w-0 break-words">{b}</span></span><span className="shrink-0 text-neutral-400">{count(b)}</span></label>)}</div>
   <div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">CONDITION</div><div className="mt-3 flex flex-wrap gap-2">{conditions.map(c=><button type="button" key={c} onClick={()=>p.toggle(p.conds,p.setConds,c)} className={`rounded-full px-4 py-2 text-xs ring-1 ring-black/10 ${p.conds.includes(c)?'bg-black text-white':'bg-white'}`}>{c}</button>)}</div>
   <div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">PRICE</div><input aria-label="Maximum price" className="mt-5 w-full accent-black" type="range" min="5000000" max="420000000" step="5000000" value={p.max} onChange={e=>p.setMax(Number(e.target.value))}/><div className="mt-2 flex flex-wrap justify-between gap-2 text-xs font-semibold"><span>₦5M</span><span>₦{Math.round(p.max/1000000)}M</span></div>
   <div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">BODY TYPE</div><div className="mt-3 flex flex-wrap gap-2">{bodies.map(c=><button type="button" key={c} onClick={()=>p.toggle(p.body,p.setBody,c)} className={`rounded-full px-4 py-2 text-xs ring-1 ring-black/10 ${p.body.includes(c)?'bg-black text-white':'bg-white'}`}>{c}</button>)}</div>
 </div>
}
