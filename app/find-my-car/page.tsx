'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Bot, RotateCcw, Send, Sparkles } from 'lucide-react'
import { useInventory } from '@/context/InventoryContext'
import { money } from '@/data/cars'
import { rankCars, type Match, type QuizAnswers } from '@/lib/matcher'
import { VehicleImage } from '@/components/VehicleImage'

type Step = { key: keyof QuizAnswers; question: string; options: { label: string; value: QuizAnswers[keyof QuizAnswers]; note?: string }[] }
const steps: Step[] = [
  { key: 'budget', question: 'What’s your budget?', options: [{ label: 'Up to ₦100M', value: 100e6 }, { label: 'Up to ₦175M', value: 175e6 }, { label: 'Up to ₦300M', value: 300e6 }, { label: 'Up to ₦600M', value: 600e6 }, { label: 'Sky’s the limit', value: 3e9 }] },
  { key: 'use', question: 'What will you mostly use it for?', options: [{ label: 'Family & school runs', value: 'family' }, { label: 'City driving', value: 'city' }, { label: 'Weekend thrills', value: 'performance' }, { label: 'Making an entrance', value: 'status' }, { label: 'Long trips & rough roads', value: 'offroad' }] },
  { key: 'seats', question: 'How many seats do you need?', options: [{ label: '2–4', value: 4 }, { label: '5', value: 5 }, { label: '7 or more', value: 7 }] },
  { key: 'style', question: 'Any preferred shape?', options: [{ label: 'SUV', value: 'SUV' }, { label: 'Sedan', value: 'Sedan' }, { label: 'Coupe', value: 'Coupe' }, { label: 'No preference', value: 'any' }] },
  { key: 'fuel', question: 'And what powers it?', options: [{ label: 'Petrol', value: 'Petrol' }, { label: 'Hybrid', value: 'Hybrid' }, { label: 'Electric', value: 'Electric' }, { label: 'Don’t mind', value: 'any' }] },
]

export default function FindMyCar() {
  const [tab, setTab] = useState<'quiz' | 'ai'>('quiz')
  return <section className="section-wrap py-12 md:py-20">
    <div className="eyebrow">FIND MY CAR</div>
    <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.05em] sm:text-6xl">Let’s find your perfect match.</h1>
    <div role="tablist" aria-label="Choose how to search" className="mt-8 inline-grid grid-cols-2 gap-1 rounded-2xl bg-card p-1.5 ring-1 ring-line/5">
      <button role="tab" type="button" aria-selected={tab === 'quiz'} onClick={() => setTab('quiz')} className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${tab === 'quiz' ? 'bg-ink text-canvas' : 'text-muted'}`}>60-second quiz</button>
      <button role="tab" type="button" aria-selected={tab === 'ai'} onClick={() => setTab('ai')} className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${tab === 'ai' ? 'bg-ink text-canvas' : 'text-muted'}`}><Sparkles size={15} /> Ask the AI</button>
    </div>
    <div className="mt-8" role="tabpanel">{tab === 'quiz' ? <Quiz /> : <AiFinder />}</div>
  </section>
}

function Quiz() {
  const { cars } = useInventory()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  const done = index >= steps.length
  const results = done ? rankCars(cars, answers as QuizAnswers) : []
  const step = steps[Math.min(index, steps.length - 1)]

  if (done) return <div>
    <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold">Your top matches</h2><button type="button" onClick={() => { setIndex(0); setAnswers({}) }} className="inline-flex items-center gap-2 text-sm font-semibold underline"><RotateCcw size={15} /> Start again</button></div>
    <div className="mt-6 grid gap-5 lg:grid-cols-3">{results.map((m, i) => <MatchCard key={m.car.id} match={m} rank={i + 1} />)}</div>
  </div>

  return <div className="panel max-w-3xl p-6 md:p-10">
    <div className="flex items-center justify-between text-xs font-semibold text-muted"><span>Question {index + 1} of {steps.length}</span>{index > 0 && <button type="button" onClick={() => setIndex(i => i - 1)} className="inline-flex items-center gap-1 underline"><ArrowLeft size={13} /> Back</button>}</div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/10"><div className="h-full rounded-full bg-bronze transition-[width] duration-500" style={{ width: `${(index / steps.length) * 100}%` }} /></div>
    <h2 key={step.key} className="mt-8 animate-fade-up text-3xl font-bold tracking-tight">{step.question}</h2>
    <div key={`${step.key}-o`} className="mt-6 grid animate-fade-up gap-3 sm:grid-cols-2">{step.options.map(option => <button key={option.label} type="button" onClick={() => { setAnswers(a => ({ ...a, [step.key]: option.value })); setIndex(i => i + 1) }}
      className={`group flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-left font-semibold ring-1 transition hover:-translate-y-0.5 hover:ring-bronze ${answers[step.key] === option.value ? 'ring-bronze' : 'ring-line/10'}`}>{option.label}<ArrowRight size={16} className="text-bronze opacity-0 transition group-hover:opacity-100" /></button>)}</div>
  </div>
}

function MatchCard({ match, rank }: { match: Match; rank: number }) {
  const { car, score, reasons } = match
  return <Link href={`/cars/${car.slug}`} data-cursor="View" className="group block animate-fade-up overflow-hidden rounded-[26px] bg-card ring-1 ring-line/5 transition hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${rank * 120}ms` }}>
    <div className="relative aspect-[1.5/1] overflow-hidden"><VehicleImage car={car} sizes="(max-width: 1024px) 100vw, 33vw" className="transition duration-700 group-hover:scale-105" />
      <span className="absolute left-4 top-4 rounded-full bg-night px-3 py-1.5 text-xs font-bold text-white">#{rank}</span>
      <span className="absolute right-4 top-4 rounded-full bg-bronze px-3 py-1.5 text-xs font-bold text-white">{score}% match</span></div>
    <div className="p-5"><div className="eyebrow">{car.brand}</div><h3 className="mt-1 text-xl font-bold">{car.year} {car.model}</h3><p className="mt-1 font-semibold">{money(car.price)}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-muted">{reasons.map(r => <li key={r} className="flex gap-2"><span className="text-bronze">✓</span>{r}</li>)}</ul></div>
  </Link>
}

type Msg = { role: 'user' | 'assistant'; content: string; picks?: { id: string; reason: string }[] }
const prompts = ['A 7-seater for family trips under ₦200M', 'Something fast and fun, budget ₦160M', 'An electric or hybrid SUV for Lagos traffic', 'What would impress at a wedding?']

function AiFinder() {
  const { cars } = useInventory()
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: 'Hi! Tell me your budget, how you’ll use the car and anything you love or hate — I’ll pick the best matches from our showroom.' }])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [messages, busy])

  async function ask(text: string) {
    const content = text.trim()
    if (!content || busy) return
    const history = [...messages, { role: 'user' as const, content }]
    setMessages(history); setInput(''); setBusy(true)
    try {
      const res = await fetch('/api/finder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(1).slice(-11).map(({ role, content }) => ({ role, content })) }) })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data) throw new Error(data?.error || 'Something went wrong.')
      setMessages(m => [...m, { role: 'assistant', content: data.reply, picks: data.picks }])
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: err instanceof Error ? err.message : 'Sorry, I couldn’t answer that. Try again?' }])
    } finally { setBusy(false) }
  }

  return <div className="panel flex max-w-3xl flex-col overflow-hidden">
    <div className="max-h-[60vh] min-h-[360px] space-y-5 overflow-y-auto p-5 md:p-7" aria-live="polite">
      {messages.map((m, i) => <div key={i} className={`flex animate-fade-up gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
        {m.role === 'assistant' && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bronze text-white"><Bot size={18} /></span>}
        <div className={`max-w-[85%] ${m.role === 'user' ? 'rounded-2xl rounded-br-md bg-ink px-4 py-3 text-canvas' : ''}`}>
          <p className="leading-7">{m.content}</p>
          {m.picks && m.picks.length > 0 && <div className="mt-3 space-y-2">{m.picks.map(p => { const car = cars.find(c => c.id === p.id); if (!car) return null; return <Link key={p.id} href={`/cars/${car.slug}`} className="flex items-center gap-3 rounded-2xl bg-surface p-2.5 ring-1 ring-line/10 transition hover:ring-bronze">
            <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl"><VehicleImage car={car} sizes="120px" /></span>
            <span className="min-w-0"><strong className="block text-sm">{car.year} {car.brand} {car.model} · {money(car.price)}</strong><span className="text-xs text-muted">{p.reason}</span></span>
          </Link> })}</div>}
        </div>
      </div>)}
      {busy && <div className="flex gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-bronze text-white"><Bot size={18} /></span><span className="flex items-center gap-1 rounded-2xl bg-line/[.06] px-4" aria-label="Thinking">{[0, 1, 2].map(d => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />)}</span></div>}
      <div ref={end} />
    </div>
    {messages.length === 1 && <div className="flex flex-wrap gap-2 px-5 pb-4 md:px-7">{prompts.map(p => <button key={p} type="button" onClick={() => ask(p)} className="rounded-full bg-surface px-3.5 py-2 text-xs font-semibold ring-1 ring-line/10 hover:ring-bronze">{p}</button>)}</div>}
    <form onSubmit={e => { e.preventDefault(); ask(input) }} className="flex gap-2 border-t border-line/10 p-3">
      <label className="sr-only" htmlFor="finder-input">Describe the car you want</label>
      <input id="finder-input" value={input} onChange={e => setInput(e.target.value)} maxLength={1200} placeholder="e.g. Comfortable SUV for Abuja–Kaduna trips, ₦150M" className="field rounded-full" />
      <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-canvas disabled:opacity-40"><Send size={18} /></button>
    </form>
    <p className="px-5 pb-4 text-[11px] text-muted md:px-7">Powered by Claude. Answers are suggestions from sample inventory; confirm details with our team.</p>
  </div>
}
