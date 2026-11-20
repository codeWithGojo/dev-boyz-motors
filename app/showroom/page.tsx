'use client'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, SlidersHorizontal } from 'lucide-react'
import { cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'

const filterBrands=['Mercedes-AMG','Mercedes-Benz','Lexus','Toyota','Range Rover','Lamborghini','Tesla']
const conditions=['Brand new','Foreign used','Nigerian used']
const bodies=['SUV','Coupe','Sedan','Crossover','Hatchback','Pickup']

export default function Showroom(){return <Suspense fallback={<div className="section-wrap py-20">Loading showroom…</div>}><ShowroomContent/></Suspense>}
function ShowroomContent(){
 const sp=useSearchParams(); const initialBrand=sp.get('brand')||''; const initialCondition=sp.get('condition')||''
 const [brands,setBrands]=useState<string[]>(initialBrand?[initialBrand==='Mercedes-Benz'?'Mercedes-Benz':initialBrand]:[]); const [conds,setConds]=useState<string[]>(initialCondition?[initialCondition]:[]); const [body,setBody]=useState<string[]>([]); const [max,setMax]=useState(420000000); const [sort,setSort]=useState('newest'); const [mobileFilters,setMobileFilters]=useState(false)
 const result=useMemo(()=>{
  let list=cars.filter(c=>(!brands.length||brands.includes(c.brand))&&(!conds.length||conds.includes(c.condition))&&(!body.length||body.includes(c.bodyType))&&c.price<=max)
  list=[...list].sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:sort==='mileage'?a.mileage-b.mileage:b.year-a.year)
  return list
 },[brands,conds,body,max,sort])
 const toggle=(arr:string[],set:(v:string[])=>void,x:string)=>set(arr.includes(x)?arr.filter(v=>v!==x):[...arr,x])
 const clear=()=>{setBrands([]);setConds([]);setBody([]);setMax(420000000)}
 const chips=[...brands,...conds,...body,...(max<420000000?[`Up to ₦${Math.round(max/1000000)}M`]:[])]
 return <section className="section-wrap py-10 md:py-14">
   <div className="text-sm text-neutral-500">Home <span className="mx-2">/</span> <span className="font-semibold text-black">Showroom</span></div>
   <div className="mt-5 flex items-end justify-between gap-5"><h1 className="text-5xl font-black tracking-[-.05em] md:text-7xl">Showroom <span className="text-2xl font-normal tracking-normal text-neutral-500">{result.length} cars</span></h1><div className="flex items-center gap-3"><button className="pill-outline lg:hidden" onClick={()=>setMobileFilters(true)}><SlidersHorizontal size={16} className="mr-2"/>Filters</button><label className="flex items-center gap-3 text-sm text-neutral-500">Sort by <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-full bg-white px-5 py-3 font-semibold text-black outline-none"><option value="newest">Newest</option><option value="price-low">Price low → high</option><option value="price-high">Price high → low</option><option value="mileage">Mileage low → high</option></select></label></div></div>
   <div className="mt-9 grid gap-8 lg:grid-cols-[310px_1fr]">
    <aside className="hidden lg:block"><FilterPanel {...{brands,setBrands,conds,setConds,body,setBody,max,setMax,toggle,clear}}/></aside>
    <div><div className="mb-5 flex min-h-10 flex-wrap gap-2">{chips.map(ch=><button key={ch} onClick={()=>{if(brands.includes(ch))setBrands(brands.filter(x=>x!==ch));else if(conds.includes(ch))setConds(conds.filter(x=>x!==ch));else if(body.includes(ch))setBody(body.filter(x=>x!==ch));else setMax(420000000)}} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold ring-1 ring-black/5">{ch}<X size={13}/></button>)}</div>{result.length?<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{result.map(c=><CarCard key={c.id} car={c}/>)}</div>:<div className="rounded-[28px] bg-card p-12 text-center"><h2 className="text-2xl font-bold">No cars match those filters.</h2><button onClick={clear} className="pill-black mt-5">Clear filters</button></div>}</div>
   </div>
   {mobileFilters&&<div className="fixed inset-0 z-[70] bg-black/50 lg:hidden"><div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-auto rounded-t-[30px] bg-canvas p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">Filters</h2><button className="circle-btn" onClick={()=>setMobileFilters(false)}><X/></button></div><FilterPanel {...{brands,setBrands,conds,setConds,body,setBody,max,setMax,toggle,clear}}/><button className="pill-black mt-5 w-full" onClick={()=>setMobileFilters(false)}>Show {result.length} cars</button></div></div>}
  </section>
}
function FilterPanel(p:any){const count=(b:string)=>cars.filter(c=>c.brand===b).length;return <div className="rounded-[26px] bg-card p-6 ring-1 ring-black/[.05]"><div className="flex justify-between"><div className="eyebrow !text-neutral-600">BRAND</div><button onClick={p.clear} className="text-xs underline">Clear</button></div><div className="mt-4 space-y-3">{filterBrands.map(b=><label key={b} className="flex cursor-pointer items-center justify-between text-sm"><span className="flex items-center gap-3"><input type="checkbox" checked={p.brands.includes(b)} onChange={()=>p.toggle(p.brands,p.setBrands,b)} className="h-5 w-5 accent-black"/>{b}</span><span className="text-neutral-400">{count(b)}</span></label>)}</div><div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">CONDITION</div><div className="mt-3 flex flex-wrap gap-2">{conditions.map(c=><button key={c} onClick={()=>p.toggle(p.conds,p.setConds,c)} className={`rounded-full px-4 py-2 text-xs ring-1 ring-black/10 ${p.conds.includes(c)?'bg-black text-white':'bg-white'}`}>{c}</button>)}</div><div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">PRICE</div><input aria-label="Maximum price" className="mt-5 w-full accent-black" type="range" min="5000000" max="420000000" step="5000000" value={p.max} onChange={e=>p.setMax(Number(e.target.value))}/><div className="mt-2 flex justify-between text-xs font-semibold"><span>₦5M</span><span>₦{Math.round(p.max/1000000)}M</span></div><div className="my-6 h-px bg-black/10"/><div className="eyebrow !text-neutral-600">BODY TYPE</div><div className="mt-3 flex flex-wrap gap-2">{bodies.map(c=><button key={c} onClick={()=>p.toggle(p.body,p.setBody,c)} className={`rounded-full px-4 py-2 text-xs ring-1 ring-black/10 ${p.body.includes(c)?'bg-black text-white':'bg-white'}`}>{c}</button>)}</div></div>}
