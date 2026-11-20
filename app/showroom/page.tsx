'use client'
import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { cars, money } from '@/data/cars'
import { CarCard } from '@/components/CarCard'

const brands=[...new Set(cars.map(c=>c.brand))].sort()
const conditions=['Brand new','Foreign used','Nigerian used']
const transmissions=[...new Set(cars.map(c=>c.transmission))].sort()
const maxPrice=420000000

export default function Showroom(){return <Suspense fallback={<div className="section-wrap py-16">Loading showroom…</div>}><ShowroomContent/></Suspense>}
function ShowroomContent(){
 const search=useSearchParams()
 const [brand,setBrand]=useState(search.get('brand')||'')
 const [model,setModel]=useState(search.get('model')||'')
 const [condition,setCondition]=useState(search.get('condition')||'')
 const [transmission,setTransmission]=useState('')
 const [max,setMax]=useState(Math.min(maxPrice,Math.max(5000000,Number(search.get('max')||maxPrice))))
 const [sort,setSort]=useState('newest')
 const [mobileFilters,setMobileFilters]=useState(false)
 const clear=()=>{setBrand('');setModel('');setCondition('');setTransmission('');setMax(maxPrice)}
 const models=[...new Set(cars.filter(c=>!brand||c.brand===brand).map(c=>c.model))].sort()
 const result=useMemo(()=>{
  const list=cars.filter(c=>(!brand||c.brand===brand)&&(!model||c.model===model)&&(!condition||c.condition===condition)&&(!transmission||c.transmission===transmission)&&c.price<=max)
  return [...list].sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:sort==='mileage'?a.mileage-b.mileage:b.year-a.year)
 },[brand,model,condition,transmission,max,sort])
 const filters=<div className="space-y-5 rounded-3xl bg-card p-5 ring-1 ring-black/5 sm:p-6">
  <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">Refine your search</h2><button type="button" className="text-xs font-semibold underline underline-offset-4" onClick={clear}>Reset</button></div>
  <Picker label="Brand" value={brand} onChange={v=>{setBrand(v);setModel('')}} options={brands}/>
  <Picker label="Model" value={models.includes(model)?model:''} onChange={setModel} options={models}/>
  <Picker label="Condition" value={condition} onChange={setCondition} options={conditions}/>
  <Picker label="Transmission" value={transmission} onChange={setTransmission} options={transmissions}/>
  <label className="block"><span className="eyebrow !text-neutral-500">Maximum price</span><span className="mt-2 block break-words font-bold">{money(max)}</span><input aria-label="Maximum price" type="range" min="5000000" max={maxPrice} step="5000000" value={max} onChange={e=>setMax(Number(e.target.value))} className="mt-4 w-full accent-black"/></label>
 </div>
 return <section className="section-wrap py-8 sm:py-10 md:py-14">
  <div className="text-xs text-neutral-500">Home / <strong className="text-black">Showroom</strong></div>
  <div className="mt-5 flex min-w-0 flex-col gap-5 md:flex-row md:items-end md:justify-between"><div className="min-w-0"><h1 className="break-words text-4xl font-black leading-tight tracking-[-.055em] sm:text-5xl md:text-7xl">Showroom.</h1><p className="mt-2 text-sm text-neutral-500">{result.length} model references · Sample prices, confirm actual stock</p></div><label className="flex max-w-full items-center gap-3 text-sm text-neutral-600">Sort by <select aria-label="Sort cars" value={sort} onChange={e=>setSort(e.target.value)} className="min-w-0 max-w-[190px] rounded-full bg-card px-3 py-3 font-semibold text-black ring-1 ring-black/5 sm:max-w-full"><option value="newest">Newest</option><option value="price-low">Price low to high</option><option value="price-high">Price high to low</option><option value="mileage">Lowest mileage</option></select></label></div>
  <div className="sticky top-[72px] z-30 -mx-4 mt-6 border-y border-black/5 bg-canvas/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 lg:hidden"><button type="button" onClick={()=>setMobileFilters(true)} className="pill-outline w-full gap-2 sm:w-auto"><SlidersHorizontal size={17}/> Filters & price</button></div>
  <div className="mt-6 grid min-w-0 items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]"><aside className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">{filters}</aside><div className="min-w-0">{result.length?<div className="grid min-w-0 gap-5 sm:grid-cols-2 2xl:grid-cols-3">{result.map(car=><CarCard key={car.id} car={car}/>)}</div>:<div className="rounded-3xl bg-card p-10 text-center"><p className="text-xl font-bold">No vehicles match those filters.</p><button type="button" className="pill-black mt-5" onClick={clear}>Clear filters</button></div>}</div></div>
  {mobileFilters&&<div className="fixed inset-0 z-[95] bg-black/55 lg:hidden" role="presentation"><div className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col rounded-t-[28px] bg-canvas shadow-2xl" role="dialog" aria-modal="true" aria-label="Showroom filters"><div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4"><h2 className="text-lg font-bold">Filter cars</h2><button aria-label="Close filters" type="button" onClick={()=>setMobileFilters(false)} className="circle-btn"><X size={20}/></button></div><div className="min-h-0 overflow-y-auto overscroll-contain p-4">{filters}</div><div className="shrink-0 border-t border-black/10 bg-canvas p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"><button type="button" onClick={()=>setMobileFilters(false)} className="pill-black w-full">Show {result.length} models</button></div></div></div>}
 </section>
}
function Picker({label,value,onChange,options}:{label:string;value:string;onChange:(value:string)=>void;options:string[]}){
 return <label className="block"><span className="eyebrow !text-neutral-500">{label}</span><select value={value} onChange={e=>onChange(e.target.value)} className="field mt-2 w-full min-w-0 text-sm"><option value="">Any {label.toLowerCase()}</option>{options.map(option=><option key={option} value={option}>{option}</option>)}</select></label>
}
