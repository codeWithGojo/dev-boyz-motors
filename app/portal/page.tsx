'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BookOpen, CalendarClock, ChevronRight, FileText, Headphones, LogOut, ShieldCheck, Wrench } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { useToast } from '@/context/ToastContext'
import { readStore, writeStore } from '@/lib/storage'
import { VehicleImage } from '@/components/VehicleImage'
import { EnquiryTrigger } from '@/components/EnquiryForm'

const documents = ['Vehicle registration', 'Customs clearance certificate', 'Insurance certificate', 'Inspection report (160-point)', 'Warranty booklet']
const manual = [
  ['Getting started', 'Keys, seats, mirrors and your first drive.'],
  ['Driver assistance', 'Cruise control, lane keeping and the 360° camera.'],
  ['Comfort & climate', 'Massage, ventilation and four-zone climate.'],
  ['Care & maintenance', 'Service intervals, tyres and washing your car.'],
]

/** Owner's portal: a styled demo dashboard. There is no real account or login. */
export default function PortalPage() {
  const { cars } = useInventory()
  const { toast } = useToast()
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => setSignedIn(readStore('dbm-portal', false)), [])
  const enter = (v: boolean) => { setSignedIn(v); writeStore('dbm-portal', v) }
  const car = cars.find(c => c.id === '29') ?? cars[0]

  if (!signedIn) return <section className="hero-bg grid min-h-[calc(100svh-110px)] place-items-center px-4 py-16">
    <div className="w-full max-w-md animate-fade-up rounded-[30px] bg-card/90 p-8 text-center shadow-2xl ring-1 ring-line/10 backdrop-blur md:p-10">
      <div className="eyebrow">OWNERS</div>
      <h1 className="mt-3 text-4xl">Welcome home.</h1>
      <p className="mt-4 leading-7 text-muted">Your car’s documents, service history and concierge, in one place.</p>
      <button type="button" onClick={() => enter(true)} className="pill-black mt-8 w-full">Enter the demo owner’s portal</button>
      <p className="mt-4 text-xs text-muted">Demo only: no account or password needed, and nothing is sent anywhere.</p>
    </div>
  </section>

  return <section className="section-wrap py-12 md:py-16">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><div className="eyebrow">OWNER’S PORTAL</div><h1 className="mt-3 text-4xl md:text-5xl">Good evening, Mr Adebayo.</h1><p className="mt-2 text-sm text-muted">Demo owner profile</p></div>
      <button type="button" onClick={() => enter(false)} className="pill-outline gap-2"><LogOut size={15} /> Sign out</button>
    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      <article className="overflow-hidden rounded-[28px] bg-night text-white lg:col-span-2">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[260px]"><VehicleImage car={car} sizes="(max-width: 768px) 100vw, 40vw" /></div>
          <div className="p-7">
            <p className="eyebrow">YOUR CAR</p><h2 className="mt-2 text-3xl">{car.year} {car.model}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div><dt className="text-white/50">Odometer</dt><dd className="mt-1 font-display text-2xl">2,480 km</dd></div>
              <div><dt className="text-white/50">Warranty</dt><dd className="mt-1 font-display text-2xl">To 2029</dd></div>
              <div><dt className="text-white/50">Next service</dt><dd className="mt-1 font-display text-2xl">14 Mar</dd></div>
              <div><dt className="text-white/50">Plate</dt><dd className="mt-1 font-display text-2xl">LND-829-DB</dd></div>
            </dl>
            <Link href={`/cars/${car.slug}`} className="mt-6 inline-flex items-center gap-1 text-sm text-bronze">View specification <ChevronRight size={15} /></Link>
          </div>
        </div>
      </article>

      <article className="panel p-7">
        <Wrench className="text-bronze" />
        <h2 className="mt-4 text-2xl">Service</h2>
        <p className="mt-2 text-sm leading-6 text-muted">First annual service due in 107 days. We collect the car and return it detailed.</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-line/10"><div className="h-full w-[70%] rounded-full bg-bronze" /></div>
        <EnquiryTrigger kind="service" car={car} className="pill-black mt-6 w-full gap-2"><CalendarClock size={16} /> Book a service</EnquiryTrigger>
      </article>

      <article className="panel p-7">
        <FileText className="text-bronze" />
        <h2 className="mt-4 text-2xl">Documents</h2>
        <ul className="mt-4 divide-y divide-line/10">{documents.map(d => <li key={d}><button type="button" onClick={() => toast(`${d}: available in the full portal`)} className="flex w-full items-center justify-between py-3 text-left text-sm hover:text-bronze"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-bronze" />{d}</span><ChevronRight size={15} /></button></li>)}</ul>
      </article>

      <article className="panel p-7 lg:col-span-2">
        <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><BookOpen className="text-bronze" /><h2 className="text-2xl">Digital owner’s manual</h2></div><span className="rounded-full bg-bronze/15 px-3 py-1 text-xs text-bronze">Preview</span></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{manual.map(([title, body], i) => <button key={title} type="button" onClick={() => toast(`Chapter ${i + 1}: ${title} — full manual coming soon`)} className="rounded-2xl bg-surface p-5 text-left ring-1 ring-line/10 transition hover:ring-bronze">
          <span className="font-display text-3xl text-bronze">0{i + 1}</span><strong className="mt-2 block">{title}</strong><span className="mt-1 block text-sm text-muted">{body}</span>
        </button>)}</div>
      </article>

      <article className="panel p-7 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><Headphones className="text-bronze" /><div><h2 className="text-2xl">Concierge</h2><p className="text-sm text-muted">Airport collection, detailing, travel or anything else.</p></div></div>
          <EnquiryTrigger kind="general" className="pill-outline">Send a request</EnquiryTrigger></div>
      </article>
    </div>
  </section>
}
