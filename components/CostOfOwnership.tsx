'use client'
import { useState } from 'react'
import type { Car } from '@/data/cars'
import { compactMoney, money } from '@/data/cars'
import { defaultFinance, monthlyRepayment } from '@/lib/finance'

/** Rough annual running costs. Every assumption is shown and adjustable. */
export function estimateCosts(car: Car, kmPerYear: number, fuelPrice: number) {
  const electric = car.fuel === 'Electric'
  const litresPer100 = car.fuel === 'Hybrid' ? 4 + car.hp / 90 : 5.5 + car.hp / 55
  const energy = electric ? (kmPerYear / 100) * 18 * 250 : (kmPerYear / 100) * litresPer100 * fuelPrice
  const luxury = ['Rolls-Royce', 'Lamborghini', 'Range Rover', 'Mercedes-AMG'].includes(car.brand)
  const servicing = electric ? 450_000 : luxury ? 2_400_000 + car.hp * 1_500 : 1_100_000 + car.hp * 900
  const insurance = car.price * 0.035
  const finance = monthlyRepayment({ price: car.price, ...defaultFinance }) * 12
  return [
    { label: electric ? 'Charging' : 'Fuel', value: energy, colour: 'rgb(var(--accent))' },
    { label: 'Insurance (3.5%)', value: insurance, colour: 'rgb(var(--accent) / .7)' },
    { label: 'Servicing & tyres', value: servicing, colour: 'rgb(var(--accent) / .45)' },
    { label: 'Finance repayments', value: finance, colour: 'rgb(var(--ink) / .28)' },
  ]
}

export function CostOfOwnership({ car }: { car: Car }) {
  const [kmPerYear, setKm] = useState(15000)
  const [fuelPrice, setFuel] = useState(1050)
  const rows = estimateCosts(car, kmPerYear, fuelPrice)
  const total = rows.reduce((s, r) => s + r.value, 0)
  const max = Math.max(...rows.map(r => r.value))

  return <section aria-labelledby="cost-title" className="panel p-6 md:p-8">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><div className="eyebrow">COST OF OWNERSHIP</div><h2 id="cost-title" className="mt-2 text-3xl font-bold tracking-tight">What it really costs per year</h2></div>
      <div className="text-right"><p className="text-xs text-muted">Estimated yearly total</p><p className="text-2xl font-black">{money(total)}</p><p className="text-xs text-muted">≈ {money(total / 12)} / month</p></div>
    </div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium">Driving per year: <strong>{kmPerYear.toLocaleString('en-NG')} km</strong><input type="range" min={3000} max={40000} step={1000} value={kmPerYear} onChange={e => setKm(Number(e.target.value))} className="mt-3 w-full accent-bronze" /></label>
      {car.fuel !== 'Electric' && <label className="text-sm font-medium">Petrol price: <strong>₦{fuelPrice.toLocaleString('en-NG')}/litre</strong><input type="range" min={600} max={1800} step={25} value={fuelPrice} onChange={e => setFuel(Number(e.target.value))} className="mt-3 w-full accent-bronze" /></label>}
    </div>
    <div className="mt-7 space-y-4" role="list">
      {rows.map(row => <div key={row.label} role="listitem">
        <div className="flex justify-between gap-3 text-sm"><span>{row.label}</span><strong>{compactMoney(row.value)}</strong></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-line/[.07]"><div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${(row.value / max) * 100}%`, background: row.colour }} /></div>
      </div>)}
    </div>
    <div className="mt-6 flex h-4 overflow-hidden rounded-full" aria-hidden="true">{rows.map(r => <div key={r.label} className="transition-[width] duration-700" style={{ width: `${(r.value / total) * 100}%`, background: r.colour }} />)}</div>
    <p className="mt-4 text-xs leading-5 text-muted">Estimates only. Fuel use is based on engine power, insurance at 3.5% of value, finance at 40% down over 48 months at 18% APR. Charging assumes 18 kWh/100 km at ₦250/kWh.</p>
  </section>
}
