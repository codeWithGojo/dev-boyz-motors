'use client'
import { useEffect, useId, useState } from 'react'
import { X, ArrowUpRight, Send } from 'lucide-react'
import { money, type Car } from '@/data/cars'
import { site } from '@/lib/site'

export type EnquiryKind = 'viewing'|'reserve'|'sell'|'source'|'general'
export const enquiryLabels:Record<EnquiryKind,string> = {viewing:'Book a viewing',reserve:'Reserve this car',sell:'Sell your car',source:'Source a car',general:'General enquiry'}
export function EnquiryForm({kind,car,onClose,embedded=false}:{kind:EnquiryKind;car?:Car;onClose?:()=>void;embedded?:boolean}){
 const id=useId();const [saving,setSaving]=useState(false);const [error,setError]=useState('');const [sent,setSent]=useState(false);const [handoffUrl,setHandoffUrl]=useState('');const [name,setName]=useState('');const [phone,setPhone]=useState('');const [date,setDate]=useState('');const [time,setTime]=useState('');const [message,setMessage]=useState('');const [description,setDescription]=useState('');const [website,setWebsite]=useState('')
 useEffect(()=>{if(embedded)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose?.()};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[embedded,onClose])
 const today=new Date().toLocaleDateString('en-CA')
 async function submit(e:React.FormEvent){
  e.preventDefault();setError('');setSaving(true)
  try{
   const res=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,carId:car?.id,name,phone,date,time,message,description,website})})
   const data=await res.json()
   if(data.status==='whatsapp'&&data.url){setHandoffUrl(data.url);return}
   if(!res.ok||!data.ok)throw new Error(data.error||'Your enquiry could not be sent. Please try WhatsApp instead.')
   setSent(true)
  }catch(err){setError(err instanceof Error?err.message:'Unable to send. Please use WhatsApp directly.')}
  finally{setSaving(false)}
 }
 const form=<div className="relative my-auto w-full min-w-0 max-w-[650px] rounded-[30px] bg-card p-6 shadow-2xl shadow-black/15 md:p-9" role={embedded?undefined:'dialog'} aria-modal={embedded?undefined:true} aria-labelledby={id}>
  {onClose&&<button type="button" onClick={onClose} aria-label="Close enquiry form" className="circle-btn absolute right-4 top-4 z-10"><X size={19}/></button>}
  {handoffUrl?<div className="py-8 text-center" role="status"><h2 id={id} className="text-2xl font-bold">Complete your enquiry in WhatsApp</h2><p className="mt-3 text-sm leading-6 text-neutral-600">Your details are prepared. Tap below to open WhatsApp and press Send there. Your enquiry has not been submitted yet.</p><a className="pill-black mt-6" href={handoffUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp to send <ArrowUpRight size={16}/></a><button type="button" className="mt-4 block w-full text-sm underline" onClick={()=>setHandoffUrl('')}>Edit details</button></div>:sent?<div className="py-9 text-center" role="status"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9eee8] text-[#165a38]"><Send/></div><h2 id={id} className="mt-5 text-3xl font-bold tracking-tight">Enquiry sent.</h2><p className="mt-3 leading-7 text-neutral-600">Your enquiry has been sent to our inbox. Please keep a copy of your details and contact us if you need a faster response.</p>{onClose&&<button type="button" onClick={onClose} className="pill-black mt-6">Done</button>}</div>:<>
   <div className="eyebrow">PERSONAL ASSISTANCE</div><h2 id={id} className="mt-2 pr-10 text-3xl font-bold tracking-tight md:text-4xl">{enquiryLabels[kind]}</h2>
   <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-600">{car?`${car.year} ${car.brand} ${car.model} · ${money(car.price)}`:'Tell us what you need. We will discuss the next steps with you directly.'}</p>
   <form onSubmit={submit} className="mt-6 space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name <span aria-hidden="true">*</span><input name="name" required autoComplete="name" maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" className="field mt-2"/></label><label className="text-sm font-medium">Phone / WhatsApp <span aria-hidden="true">*</span><input name="phone" required inputMode="tel" type="tel" autoComplete="tel" maxLength={22} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+234 8..." className="field mt-2"/></label></div>
    {(kind==='sell'||kind==='source')&&<label className="block text-sm font-medium">Vehicle details <span aria-hidden="true">*</span><input value={description} onChange={e=>setDescription(e.target.value)} required maxLength={250} className="field mt-2" placeholder={kind==='sell'?'Make, model, year, mileage, condition':'Desired make, model, year and budget'}/></label>}
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Preferred date <span aria-hidden="true">*</span><input type="date" required min={today} value={date} onChange={e=>setDate(e.target.value)} className="field mt-2"/></label><label className="text-sm font-medium">Preferred time <span aria-hidden="true">*</span><input type="time" required value={time} onChange={e=>setTime(e.target.value)} className="field mt-2"/></label></div>
    <label className="block text-sm font-medium">Message <span aria-hidden="true">*</span><textarea required rows={3} minLength={10} maxLength={1500} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask about availability, documentation, delivery or your preferences…" className="field mt-2 resize-y"/></label>
    <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
    {error&&<div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
    <button type="submit" disabled={saving} className="pill-black w-full gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50">{saving?'Preparing enquiry…':'Send enquiry'} <ArrowUpRight size={16}/></button>
    <p className="text-xs leading-5 text-neutral-500">Without email delivery enabled, submitting opens WhatsApp with your completed enquiry for you to send. Nothing is reserved or charged until our team confirms it. Contact: {site.phone}.</p>
   </form>
  </>}
 </div>
 if(embedded)return form
 return <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/65 p-3 py-8 sm:items-center backdrop-blur-sm md:p-6" onMouseDown={e=>{if(e.target===e.currentTarget)onClose?.()}}>{form}</div>
}
export function EnquiryTrigger({kind,car,children,className='pill-black'}:{kind:EnquiryKind;car?:Car;children:React.ReactNode;className?:string}){const[open,setOpen]=useState(false);return <><button type="button" onClick={()=>setOpen(true)} className={className}>{children}</button>{open&&<EnquiryForm kind={kind} car={car} onClose={()=>setOpen(false)}/>}</>}
