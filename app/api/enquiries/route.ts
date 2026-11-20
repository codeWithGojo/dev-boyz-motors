import { NextResponse } from 'next/server'
import { cars } from '@/data/cars'
import { site, whatsappUrl } from '@/lib/site'
import type { EnquiryKind } from '@/components/EnquiryForm'

export const runtime='nodejs'
type Payload={kind:EnquiryKind;carId?:string;name:string;phone:string;date:string;time:string;message:string;description?:string;website?:string}
const kinds=['viewing','reserve','sell','source','general']
const attempts = new Map<string,{count:number;since:number}>()
const clean=(value:unknown,max:number)=>typeof value==='string'?value.trim().slice(0,max):''
const safe=(value:string)=>value.replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]||x))

export async function POST(request:Request){
 let input:Payload
 try{input=await request.json()}catch{return NextResponse.json({error:'Invalid form data.'},{status:400})}
 if(input.website)return NextResponse.json({ok:true,status:'accepted'}) // Honeypot; do not contact spammer
 const kind=clean(input.kind,20) as EnquiryKind
 const name=clean(input.name,100),phone=clean(input.phone,22),date=clean(input.date,10),time=clean(input.time,5),message=clean(input.message,1500),description=clean(input.description,250)
 const digits=phone.replace(/\D/g,'')
 const parsedDate=new Date(`${date}T${time||'00:00'}:00Z`)
 const now=new Date();now.setUTCDate(now.getUTCDate()-1)
 if(!kinds.includes(kind)||name.length<2||digits.length<10||digits.length>15||message.length<10||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time)||!Number.isFinite(parsedDate.valueOf())||parsedDate<now||((kind==='sell'||kind==='source')&&description.length<5))return NextResponse.json({error:'Please complete all fields with valid details.'},{status:400})
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
 const record=attempts.get(ip);const current=Date.now()
 if(record&&current-record.since<300000&&record.count>=5)return NextResponse.json({error:'Too many enquiries. Please try again shortly or contact us on WhatsApp.'},{status:429})
 attempts.set(ip,{count:record&&current-record.since<300000?record.count+1:1,since:record&&current-record.since<300000?record.since:current})
 if(attempts.size>500)attempts.clear()
 const car = cars.find(c=>c.id===clean(input.carId,40))
 const carText=car?`${car.year} ${car.brand} ${car.model} — ₦${car.price.toLocaleString('en-NG')} (${site.url}/cars/${car.slug})`:'Not specified'
 const heading={viewing:'Viewing request',reserve:'Reservation enquiry',sell:'Sell a vehicle',source:'Source a vehicle',general:'General enquiry'}[kind]
 const details=`${heading}\nName: ${name}\nPhone: ${phone}\nVehicle: ${carText}\nVehicle requirements: ${description||'N/A'}\nPreferred date: ${date}\nPreferred time: ${time}\nMessage: ${message}`
 const whatsapp=whatsappUrl(`Hello DEV BOYZ MOTORS.\n${details}`)
 const apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM_EMAIL,to=process.env.ENQUIRY_TO_EMAIL
 if(!apiKey||!from||!to)return NextResponse.json({status:'whatsapp',url:whatsapp})
 try{
  const lines=details.split('\n').map(line=>`<p style="margin:0 0 8px">${safe(line)}</p>`).join('')
  const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject:`DEV BOYZ MOTORS: ${heading}`,html:`<div style="font-family:Arial,sans-serif;color:#111;max-width:650px">${lines}</div>`,reply_to:undefined}),cache:'no-store'})
  if(!res.ok)throw Error('Resend provider unavailable')
  return NextResponse.json({ok:true,status:'sent'})
 }catch{return NextResponse.json({status:'whatsapp',url:whatsapp,warning:'Email delivery unavailable. Complete your enquiry on WhatsApp.'})}
}
