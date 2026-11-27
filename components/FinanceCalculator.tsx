'use client'
import { useState } from 'react'
import Link from 'next/link'
import { monthlyRepayment, defaultFinance } from '@/lib/finance'
import { money } from '@/data/cars'
import { AnimatedNumber } from './Motion'

type Props = { initialPrice?: number; compact?: boolean }

export function FinanceCalculator({ initialPrice = 150000000, compact = false }: Props) {
  const [price, setPrice] = useState(initialPrice)
  const [depositPercent, setDeposit] = useState(defaultFinance.depositPercent)
  const [apr, setApr] = useState(defaultFinance.apr)
  const [months, setMonths] = useState(defaultFinance.months)
  const monthly = monthlyRepayment({ price, depositPercent, apr, months })
  const deposit = price * depositPercent / 100
  const totalInterest = Math.max(0, monthly * months - (price - deposit))

  return <section aria-label="Vehicle finance calculator" className={`panel ${compact ? 'p-5 md:p-6' : 'p-6 md:p-9'}`}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><div className="eyebrow">FINANCE ESTIMATOR</div><h2 className={`mt-2 font-bold tracking-tight ${compact ? 'text-xl' : 'text-3xl'}`}>Plan your monthly payment</h2></div>
      <span className="rounded-full bg-canvas px-3 py-1.5 text-xs text-muted">Estimate</span>
    </div>
    {!compact && <label className="mt-7 block text-sm font-medium">Vehicle price <span className="mt-2 block text-2xl font-bold">{money(price)}</span><input type="range" min="5000000" max="2000000000" step="5000000" value={price} onChange={e => setPrice(Number(e.target.value))} aria-label="Vehicle price" className="mt-3 w-full accent-bronze" /></label>}
    <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <fieldset className="col-span-2 sm:col-span-1"><legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Deposit</legend><div className="flex gap-2">{[30, 40, 50].map(p => <button type="button" aria-pressed={depositPercent === p} key={p} onClick={() => setDeposit(p)} className={`flex-1 rounded-xl px-2 py-3 text-sm font-semibold ring-1 ring-line/10 transition ${depositPercent === p ? 'bg-ink text-canvas' : 'bg-surface'}`}>{p}%</button>)}</div></fieldset>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">Term<select value={months} onChange={e => setMonths(Number(e.target.value))} className="field mt-2 text-sm font-semibold normal-case">{[24, 36, 48, 60].map(n => <option key={n} value={n}>{n} months</option>)}</select></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted">Interest<select value={apr} onChange={e => setApr(Number(e.target.value))} className="field mt-2 text-sm font-semibold normal-case">{[12, 15, 18, 22, 26].map(n => <option key={n} value={n}>{n}% APR</option>)}</select></label>
    </div>
    <div className="mt-6 rounded-2xl bg-night p-6 text-white">
      <p className="text-xs uppercase tracking-[.2em] text-white/50">Estimated monthly repayment</p>
      <p aria-live="polite" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">₦<AnimatedNumber value={monthly} /> <span className="text-sm font-normal text-white/60">/ month</span></p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60"><span>Deposit: {money(deposit)}</span><span>Financed: {money(price - deposit)}</span><span>Total interest: {money(totalInterest)}</span></div>
    </div>
    <p className="mt-4 text-xs leading-5 text-muted">Reducing-balance estimate. Actual rates, fees and approval depend on the lender.</p>
    {compact && <Link href="/financing" className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">Explore finance options</Link>}
  </section>
}
