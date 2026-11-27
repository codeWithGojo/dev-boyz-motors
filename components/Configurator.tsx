'use client'
import { useState } from 'react'
import type { Car } from '@/data/cars'
import { money } from '@/data/cars'

export const paints = [
  { name: 'Obsidian Black', hex: '#15161a', price: 0 },
  { name: 'Polar White', hex: '#eceae6', price: 0 },
  { name: 'Selenite Grey', hex: '#7b7f84', price: 1_800_000 },
  { name: 'Bronze Metallic', hex: '#8a6a3d', price: 3_500_000 },
  { name: 'Rosso Corsa', hex: '#a3141c', price: 3_500_000 },
  { name: 'Lagos Blue', hex: '#1d3f73', price: 2_400_000 },
]
export const wheels = [
  { name: '20" Five-spoke', style: 'five', price: 0 },
  { name: '21" Multi-spoke', style: 'multi', price: 2_200_000 },
  { name: '22" Forged turbine', style: 'turbine', price: 4_800_000 },
] as const
export const calipers = [{ name: 'Black', hex: '#1b1b1b', price: 0 }, { name: 'Bronze', hex: '#b08d57', price: 650_000 }, { name: 'Red', hex: '#c81e1e', price: 650_000 }]

/** Paint, wheel and caliper configurator drawn as an SVG so every combination renders instantly. */
export function Configurator({ car }: { car: Car }) {
  const [paint, setPaint] = useState(paints[0])
  const [wheel, setWheel] = useState<(typeof wheels)[number]>(wheels[0])
  const [caliper, setCaliper] = useState(calipers[0])
  const suv = ['SUV', 'Crossover'].includes(car.bodyType)
  const extras = paint.price + wheel.price + caliper.price

  return <section aria-labelledby="config-title" className="panel overflow-hidden">
    <div className="p-6 md:p-8">
      <div className="eyebrow">CONFIGURATOR</div>
      <h2 id="config-title" className="mt-2 text-3xl font-bold tracking-tight">Make it yours</h2>
      <p className="mt-2 text-sm text-muted">Preview factory-style paint, wheels and calipers for the {car.model}. Illustration only.</p>
    </div>
    <div className="relative bg-gradient-to-b from-line/[.03] to-line/[.09] px-4 pb-6 pt-2">
      <CarSvg suv={suv} paint={paint.hex} wheel={wheel.style} caliper={caliper.hex} />
      <p className="text-center text-xs text-muted" aria-live="polite">{paint.name} · {wheel.name} · {caliper.name} calipers</p>
    </div>
    <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
      <Option title="Paint">
        <div className="flex flex-wrap gap-2.5">{paints.map(p => <button key={p.name} type="button" onClick={() => setPaint(p)} aria-pressed={paint.name === p.name} aria-label={`${p.name}${p.price ? `, plus ${money(p.price)}` : ''}`} title={p.name}
          className={`h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-card transition hover:scale-110 ${paint.name === p.name ? 'ring-bronze' : 'ring-line/10'}`} style={{ background: `radial-gradient(circle at 30% 30%, #ffffff55, ${p.hex} 55%)` }} />)}</div>
      </Option>
      <Option title="Wheels">
        <div className="space-y-2">{wheels.map(w => <Pick key={w.name} active={wheel.name === w.name} onClick={() => setWheel(w)} label={w.name} price={w.price} />)}</div>
      </Option>
      <Option title="Calipers">
        <div className="space-y-2">{calipers.map(c => <Pick key={c.name} active={caliper.name === c.name} onClick={() => setCaliper(c)} label={c.name} price={c.price} swatch={c.hex} />)}</div>
      </Option>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 px-6 py-5 md:px-8">
      <span className="text-sm text-muted">Options {money(extras)}</span>
      <strong className="text-lg">Total as configured {money(car.price + extras)}</strong>
    </div>
  </section>
}

function Option({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset><legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</legend>{children}</fieldset>
}
function Pick({ active, onClick, label, price, swatch }: { active: boolean; onClick: () => void; label: string; price: number; swatch?: string }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm ring-1 transition ${active ? 'bg-ink text-canvas ring-ink' : 'bg-surface ring-line/10 hover:ring-line/30'}`}>
    <span className="flex items-center gap-2">{swatch && <span className="h-3.5 w-3.5 rounded-full ring-1 ring-white/30" style={{ background: swatch }} />}{label}</span>
    <span className={`text-xs ${active ? 'text-canvas/70' : 'text-muted'}`}>{price ? `+${money(price)}` : 'Included'}</span>
  </button>
}

function Wheel({ cx, cy, style, caliper }: { cx: number; cy: number; style: string; caliper: string }) {
  const spokes = style === 'five' ? 5 : style === 'multi' ? 10 : 14
  return <g>
    <circle cx={cx} cy={cy} r="46" fill="#111" />
    <circle cx={cx} cy={cy} r="34" fill="#2a2a2a" />
    <path d={`M${cx + 22} ${cy - 14} a26 26 0 0 1 4 26`} stroke={caliper} strokeWidth="9" fill="none" strokeLinecap="round" />
    {Array.from({ length: spokes }, (_, i) => {
      const a = (i / spokes) * Math.PI * 2
      const w = style === 'five' ? 7 : style === 'multi' ? 3.5 : 2.2
      return <line key={i} x1={cx + Math.cos(a) * 7} y1={cy + Math.sin(a) * 7} x2={cx + Math.cos(a) * 32} y2={cy + Math.sin(a) * 32} stroke="#c9c9c9" strokeWidth={w} strokeLinecap="round" />
    })}
    <circle cx={cx} cy={cy} r="32" fill="none" stroke="#9a9a9a" strokeWidth="2" />
    <circle cx={cx} cy={cy} r="7" fill="#d8d8d8" />
  </g>
}

export function CarSvg({ suv, paint, wheel, caliper }: { suv: boolean; paint: string; wheel: string; caliper: string }) {
  const body = suv
    ? 'M70 250 q-6 -48 34 -62 l96 -18 q40 -54 110 -62 h170 q60 4 104 60 l80 14 q42 8 42 54 v20 q0 8 -10 8 h-616 q-10 0 -10 -14z'
    : 'M60 258 q-4 -40 40 -52 l110 -22 q50 -56 130 -62 h120 q70 6 120 64 l92 16 q38 8 38 46 v18 q0 8 -10 8 h-630 q-10 0 -10 -16z'
  const glass = suv
    ? 'M222 170 q36 -46 94 -50 h70 v52 z M402 120 h76 q44 4 80 52 h-156 z'
    : 'M232 182 q44 -48 106 -52 h50 v54 z M404 130 h56 q52 4 92 54 h-148 z'
  return <svg viewBox="0 0 760 330" className="mx-auto w-full max-w-2xl" role="img" aria-label="Configured car preview">
    <defs>
      <linearGradient id="paint-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".35" />
        <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".35" />
      </linearGradient>
    </defs>
    <ellipse cx="380" cy="300" rx="320" ry="14" fill="#000" opacity=".18" />
    <path d={body} fill={paint} style={{ transition: 'fill .5s ease' }} />
    <path d={body} fill="url(#paint-shade)" />
    <path d={glass} fill="#1d2630" opacity=".88" />
    <path d={suv ? 'M110 222 h560' : 'M104 228 h570'} stroke="#000" strokeOpacity=".15" strokeWidth="2" />
    <rect x={suv ? 668 : 676} y={suv ? 214 : 222} width="22" height="10" rx="4" fill="#fff6d8" />
    <rect x="70" y={suv ? 218 : 226} width="18" height="9" rx="4" fill="#b3261e" />
    <Wheel cx={suv ? 196 : 190} cy={262} style={wheel} caliper={caliper} />
    <Wheel cx={suv ? 572 : 582} cy={262} style={wheel} caliper={caliper} />
  </svg>
}
