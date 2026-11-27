'use client'
import { useState } from 'react'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Motion'
import { EnquiryForm } from '@/components/EnquiryForm'
import { events } from '@/lib/content'

const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function EventsPage() {
  const [rsvp, setRsvp] = useState<(typeof events)[number] | null>(null)
  return <>
    <PageIntro dark eyebrow="By invitation" title={<>Private <span className="italic text-white/70">evenings.</span></>} lead="Small gatherings for clients and friends of the house. Places are limited and confirmed personally." />
    <section className="section-wrap space-y-6 py-16">
      {events.map((e, i) => <Reveal key={e.id} delay={i * 100}>
        <article className="grid items-center gap-6 rounded-[28px] bg-card p-7 ring-1 ring-line/10 md:grid-cols-[180px_minmax(0,1fr)_auto] md:p-9">
          <div className="text-center md:text-left"><p className="font-display text-6xl leading-none">{new Date(`${e.date}T12:00:00Z`).getUTCDate()}</p><p className="mt-1 text-sm uppercase tracking-[.2em] text-muted">{new Date(`${e.date}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p></div>
          <div><h2 className="text-3xl">{e.title}</h2><p className="mt-2 max-w-xl leading-7 text-muted">{e.detail}</p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted"><span className="flex items-center gap-1.5"><MapPin size={14} />{e.place}</span><span className="flex items-center gap-1.5"><CalendarDays size={14} />{fmt(e.date)}</span><span className="flex items-center gap-1.5"><Users size={14} />{e.seats} guests</span></p></div>
          <button type="button" onClick={() => setRsvp(e)} className="pill-black">Request an invitation</button>
        </article>
      </Reveal>)}
      <p className="text-xs text-muted">Demo events for illustration.</p>
    </section>
    {rsvp && <EnquiryForm kind="event" initialMessage={`I'd like to request an invitation to “${rsvp.title}” on ${fmt(rsvp.date)}.`} onClose={() => setRsvp(null)} />}
  </>
}
