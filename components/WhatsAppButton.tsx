'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, MessageCircle, X } from 'lucide-react'
import { site, whatsappUrl } from '@/lib/site'

type Reply = { text: string; links?: { label: string; href: string; external?: boolean }[] }
type Message = { from: 'concierge' | 'you'; reply: Reply }

const topics: { ask: string; reply: Reply }[] = [
  { ask: 'Book a test drive', reply: { text: 'With pleasure. Pick any car and choose “Book a test drive” — we’ll bring it to you or prepare it at the showroom.', links: [{ label: 'Browse the showroom', href: '/showroom' }] } },
  { ask: 'Help me choose a car', reply: { text: 'Tell our car finder how you’ll use it and your budget, and it will shortlist the best matches.', links: [{ label: 'Open the car finder', href: '/find-my-car' }] } },
  { ask: 'Build & price', reply: { text: 'You can commission any car — paint, wheels, interior and packages — and see the price update as you go.', links: [{ label: 'Start a build', href: '/build' }] } },
  { ask: 'Where are you?', reply: { text: 'We have private spaces in Victoria Island, Maitama and Port Harcourt GRA. Visits are by appointment.', links: [{ label: 'See locations', href: '/locations' }] } },
  { ask: 'Speak to a person', reply: { text: `Of course. Our team replies on WhatsApp — ${site.hours.toLowerCase()}.`, links: [{ label: 'Chat on WhatsApp', href: whatsappUrl('Hello DEV BOYZ MOTORS, I would like to speak to someone.'), external: true }] } },
]

/** Concierge chat: a scripted assistant with quick replies, handing off to WhatsApp for a real person. */
export function WhatsAppButton() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ from: 'concierge', reply: { text: 'Good day. I’m your DEV BOYZ concierge. How may I help?' } }])
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }, [messages, typing])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ask = (topic: (typeof topics)[number]) => {
    if (typing) return
    setMessages(m => [...m, { from: 'you', reply: { text: topic.ask } }])
    setTyping(true)
    window.setTimeout(() => { setTyping(false); setMessages(m => [...m, { from: 'concierge', reply: topic.reply }]) }, 900)
  }

  if (path?.startsWith('/cars/')) return <ConciergeShell open={open} setOpen={setOpen} lifted>{panel()}</ConciergeShell>
  return <ConciergeShell open={open} setOpen={setOpen}>{panel()}</ConciergeShell>

  function panel() {
    return <>
      <div className="flex items-center gap-3 bg-night p-4 text-white">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-bronze font-display text-lg">D</span>
        <span className="min-w-0 flex-1"><strong className="block text-sm">DEV BOYZ Concierge</strong><span className="flex items-center gap-1.5 text-xs text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Typically replies instantly</span></span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><X size={17} /></button>
      </div>
      <div className="max-h-[48vh] min-h-[220px] space-y-3 overflow-y-auto bg-canvas p-4" aria-live="polite">
        {messages.map((m, i) => <div key={i} className={`flex animate-fade-up ${m.from === 'you' ? 'justify-end' : ''}`}>
          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${m.from === 'you' ? 'rounded-br-md bg-ink text-canvas' : 'rounded-bl-md bg-surface ring-1 ring-line/10'}`}>
            {m.reply.text}
            {m.reply.links?.map(l => l.external
              ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1 font-semibold text-bronze">{l.label} <ArrowUpRight size={13} /></a>
              : <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="mt-2 flex items-center gap-1 font-semibold text-bronze">{l.label} <ArrowUpRight size={13} /></Link>)}
          </div>
        </div>)}
        {typing && <div className="flex gap-1 px-2" aria-label="Concierge is typing">{[0, 1, 2].map(d => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
        <div ref={end} />
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line/10 bg-card p-3">
        {topics.map(t => <button key={t.ask} type="button" onClick={() => ask(t)} disabled={typing} className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium ring-1 ring-line/10 transition hover:ring-bronze disabled:opacity-50">{t.ask}</button>)}
      </div>
    </>
  }
}

function ConciergeShell({ open, setOpen, lifted = false, children }: { open: boolean; setOpen: (v: boolean) => void; lifted?: boolean; children: React.ReactNode }) {
  return <div className={`fixed right-4 z-[60] md:bottom-8 md:right-8 ${lifted ? 'bottom-24' : 'bottom-[max(1rem,env(safe-area-inset-bottom))]'}`}>
    {open && <div role="dialog" aria-label="Concierge chat" className="absolute bottom-16 right-0 w-[min(360px,calc(100vw-2rem))] animate-fade-up overflow-hidden rounded-3xl shadow-2xl ring-1 ring-line/10">{children}</div>}
    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close concierge chat' : 'Open concierge chat'} data-cursor="Chat"
      className="grid h-14 w-14 place-items-center rounded-full bg-night text-white shadow-xl shadow-black/25 transition hover:-translate-y-1" style={open ? undefined : { animation: 'concierge-pulse 2.8s infinite' }}>
      {open ? <X size={22} /> : <MessageCircle size={24} />}
    </button>
  </div>
}
