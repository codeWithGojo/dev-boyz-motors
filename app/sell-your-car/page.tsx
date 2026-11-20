'use client'
import { useState } from 'react'
import { EnquiryForm } from '@/components/EnquiryForm'

export default function SellOrSource() {
 const [kind,setKind]=useState<'sell'|'source'>('source')
 return <section className="section-wrap py-12 md:py-20"><div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
  <div className="min-w-0"><div className="eyebrow">SELL OR SOURCE</div><h1 className="mt-3 break-words text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl md:text-7xl">Tell us what you're looking for.</h1><p className="mt-6 max-w-xl text-base leading-7 text-neutral-600">Want to sell your current vehicle or source a particular model? Share your requirements, budget and preferred contact details. We will discuss options with you directly.</p><p className="mt-5 text-sm leading-6 text-neutral-500">This is an enquiry, not an instant valuation or a promise of stock. No payment is taken.</p></div>
  <div className="min-w-0"><div role="group" aria-label="Choose enquiry type" className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-card p-2 ring-1 ring-black/5"><button type="button" onClick={()=>setKind('source')} aria-pressed={kind==='source'} className={`rounded-xl px-3 py-3 text-sm font-semibold ${kind==='source'?'bg-black text-white':'text-neutral-600 hover:bg-white'}`}>Source a car</button><button type="button" onClick={()=>setKind('sell')} aria-pressed={kind==='sell'} className={`rounded-xl px-3 py-3 text-sm font-semibold ${kind==='sell'?'bg-black text-white':'text-neutral-600 hover:bg-white'}`}>Sell a car</button></div><EnquiryForm key={kind} kind={kind} embedded/></div>
 </div></section>
}
