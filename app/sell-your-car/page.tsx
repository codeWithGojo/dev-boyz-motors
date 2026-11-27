'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Car, Gauge, ShieldCheck, Sparkles } from 'lucide-react'
import { EnquiryForm } from '@/components/EnquiryForm'
import { CountUp } from '@/components/Motion'
import { compactMoney } from '@/data/cars'

// Rough new-price anchors (₦) for the demo valuation model.
const makes: Record<string, number> = { Toyota: 70e6, Honda: 60e6, Lexus: 130e6, 'Mercedes-Benz': 140e6, 'Mercedes-AMG': 230e6, BMW: 140e6, 'Range Rover': 340e6, Audi: 120e6, Kia: 48e6, Hyundai: 48e6, Other: 60e6 }
const conditionFactor = { Excellent: 1, Good: 0.9, Fair: 0.78, 'Needs work': 0.6 } as const
type ConditionKey = keyof typeof conditionFactor

function estimate(make: string, year: number, mileage: number, condition: ConditionKey, tokunbo: boolean) {
  const age = Math.max(0, new Date().getFullYear() - year)
  const base = makes[make] ?? makes.Other
  const depreciation = Math.pow(0.86, age)
  const mileageFactor = Math.max(0.55, 1 - Math.max(0, mileage - age * 15000) / 400000)
  const mid = base * depreciation * mileageFactor * conditionFactor[condition] * (tokunbo ? 1.08 : 1)
  return { low: mid * 0.9, mid, high: mid * 1.1 }
}

export default function SellOrSource() {
  const [kind, setKind] = useState<'sell' | 'source'>('sell')
  return <section className="section-wrap py-12 md:py-20">
    <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
      <div className="min-w-0 lg:sticky lg:top-28">
        <div className="eyebrow">SELL, TRADE IN OR SOURCE</div>
        <h1 className="mt-3 break-words text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl md:text-7xl">Get a value in under a minute.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">Tell us about your car for an instant estimate, then book an inspection for a firm offer. Or switch to sourcing and we&apos;ll hunt down the exact model you want.</p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex gap-3"><Gauge className="shrink-0 text-bronze" size={20} /> Instant estimate from make, year, mileage and condition</li>
          <li className="flex gap-3"><ShieldCheck className="shrink-0 text-bronze" size={20} /> Free inspection and a firm offer within 24 hours</li>
          <li className="flex gap-3"><Car className="shrink-0 text-bronze" size={20} /> Put the value towards any car in the showroom</li>
        </ul>
      </div>
      <div className="min-w-0">
        <div role="group" aria-label="Choose enquiry type" className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-card p-2 ring-1 ring-line/5">
          <button type="button" onClick={() => setKind('sell')} aria-pressed={kind === 'sell'} className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${kind === 'sell' ? 'bg-ink text-canvas' : 'text-muted hover:bg-surface'}`}>Sell or trade in</button>
          <button type="button" onClick={() => setKind('source')} aria-pressed={kind === 'source'} className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${kind === 'source' ? 'bg-ink text-canvas' : 'text-muted hover:bg-surface'}`}>Source a car</button>
        </div>
        {kind === 'sell' ? <TradeIn /> : <EnquiryForm key="source" kind="source" embedded />}
      </div>
    </div>
  </section>
}

function TradeIn() {
  const year = new Date().getFullYear()
  const [step, setStep] = useState(0)
  const [make, setMake] = useState('Toyota')
  const [model, setModel] = useState('')
  const [carYear, setCarYear] = useState(year - 6)
  const [mileage, setMileage] = useState(80000)
  const [condition, setCondition] = useState<ConditionKey>('Good')
  const [tokunbo, setTokunbo] = useState(false)
  const value = estimate(make, carYear, mileage, condition, tokunbo)
  const summary = `${carYear} ${make} ${model || ''}`.replace(/\s+/g, ' ').trim() + `, ${mileage.toLocaleString('en-NG')} km, ${condition.toLowerCase()} condition${tokunbo ? ', foreign used' : ''}`
  const labels = ['Your car', 'Mileage & condition', 'Your estimate', 'Book inspection']

  return <div className="panel p-6 md:p-9">
    <ol className="flex gap-2" aria-label="Progress">{labels.map((l, i) => <li key={l} className="flex-1"><div className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? 'bg-bronze' : 'bg-line/10'}`} /><span className={`mt-2 hidden text-[11px] font-semibold sm:block ${i === step ? 'text-ink' : 'text-muted'}`}>{l}</span></li>)}</ol>

    {step === 0 && <div className="mt-8 animate-fade-up space-y-5">
      <h2 className="text-2xl font-bold">Which car are you selling?</h2>
      <label className="block text-sm font-medium">Make<select value={make} onChange={e => setMake(e.target.value)} className="field mt-2">{Object.keys(makes).map(m => <option key={m}>{m}</option>)}</select></label>
      <label className="block text-sm font-medium">Model <span className="font-normal text-muted">(optional)</span><input value={model} onChange={e => setModel(e.target.value)} maxLength={60} placeholder="e.g. Camry, RX 350, GLE 450" className="field mt-2" /></label>
      <label className="block text-sm font-medium">Year: <strong>{carYear}</strong><input type="range" min={year - 25} max={year} value={carYear} onChange={e => setCarYear(Number(e.target.value))} className="mt-3 w-full accent-bronze" /></label>
    </div>}

    {step === 1 && <div className="mt-8 animate-fade-up space-y-6">
      <h2 className="text-2xl font-bold">How has it been driven?</h2>
      <label className="block text-sm font-medium">Mileage: <strong>{mileage.toLocaleString('en-NG')} km</strong><input type="range" min={0} max={300000} step={5000} value={mileage} onChange={e => setMileage(Number(e.target.value))} className="mt-3 w-full accent-bronze" /></label>
      <fieldset><legend className="text-sm font-medium">Condition</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{(Object.keys(conditionFactor) as ConditionKey[]).map(c => <button key={c} type="button" aria-pressed={condition === c} onClick={() => setCondition(c)} className={`rounded-xl px-3 py-3 text-sm font-semibold ring-1 transition ${condition === c ? 'bg-ink text-canvas ring-ink' : 'bg-surface ring-line/10'}`}>{c}</button>)}</div></fieldset>
      <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={tokunbo} onChange={e => setTokunbo(e.target.checked)} className="h-4 w-4 accent-bronze" /> Foreign used (tokunbo), not yet registered in Nigeria</label>
    </div>}

    {step === 2 && <div className="mt-8 animate-fade-up text-center">
      <Sparkles className="mx-auto text-bronze" />
      <p className="mt-3 text-sm text-muted">Estimated value for your {summary}</p>
      <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">₦<CountUp value={value.low / 1e6} decimals={1} />M – ₦<CountUp value={value.high / 1e6} decimals={1} />M</p>
      <div className="mx-auto mt-6 max-w-md">
        <div className="relative h-3 rounded-full bg-gradient-to-r from-line/10 via-bronze to-line/10"><span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-pop-in rounded-full border-4 border-card bg-bronze shadow" /></div>
        <div className="mt-2 flex justify-between text-xs text-muted"><span>{compactMoney(value.low)}</span><strong className="text-ink">Most likely {compactMoney(value.mid)}</strong><span>{compactMoney(value.high)}</span></div>
      </div>
      <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-muted">Demo estimate based on age, mileage and condition. A free inspection gives you a firm offer.</p>
    </div>}

    {step === 3 && <div className="mt-6 animate-fade-up"><EnquiryForm kind="sell" embedded initialDescription={summary.slice(0, 250)} initialMessage={`I'd like an inspection and a firm offer. My online estimate was ${compactMoney(value.low)}–${compactMoney(value.high)}.`} /></div>}

    {step < 3 && <div className="mt-8 flex justify-between gap-3">
      <button type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)} className="pill-outline gap-2 disabled:invisible"><ArrowLeft size={16} /> Back</button>
      <button type="button" onClick={() => setStep(s => s + 1)} className="pill-black gap-2">{step === 1 ? 'See my estimate' : step === 2 ? 'Book a free inspection' : 'Continue'} <ArrowRight size={16} /></button>
    </div>}
    {step === 3 && <button type="button" onClick={() => setStep(2)} className="mt-4 inline-flex items-center gap-2 text-sm underline"><ArrowLeft size={14} /> Back to estimate</button>}
  </div>
}
