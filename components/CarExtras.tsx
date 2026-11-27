'use client'
import { useState } from 'react'
import { Plus, ScanLine, X } from 'lucide-react'
import type { Car } from '@/data/cars'
import { interiorColours, materials, techFeatures } from '@/lib/content'
import { useDialog } from '@/lib/useDialog'
import { VehicleImage } from './VehicleImage'

/** Interior & materials: large CSS close-ups of each material, with a leather colour picker. */
export function InteriorShowcase({ car }: { car: Car }) {
  const [active, setActive] = useState<(typeof materials)[number]['id']>('leather')
  const [tone, setTone] = useState<string>(interiorColours[1].hex)
  const material = materials.find(m => m.id === active)!

  return <section aria-labelledby="interior-title" className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
    <div className={`${material.texture} relative min-h-[320px] overflow-hidden rounded-[28px] shadow-inner transition-all duration-700 md:min-h-[460px]`} style={active === 'leather' || active === 'suede' ? { ['--tone' as string]: active === 'suede' ? '#2b2a2e' : tone } : undefined} role="img" aria-label={`${material.name} close-up`}>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute bottom-6 left-6 right-6 text-white"><span className="font-display text-3xl">{material.name}</span><span className="mt-1 block text-sm text-white/80">{material.note}</span></span>
    </div>
    <div className="flex flex-col justify-center">
      <div className="eyebrow">INTERIOR &amp; MATERIALS</div>
      <h2 id="interior-title" className="mt-3 text-4xl md:text-5xl">Made to be touched.</h2>
      <p className="mt-4 max-w-md leading-7 text-muted">Inside the {car.model}, every surface you reach for is real: leather, wood, metal and carbon, finished by hand. Choose one to see it up close.</p>
      <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Materials">
        {materials.map(m => <button key={m.id} type="button" role="tab" aria-selected={m.id === active} onClick={() => setActive(m.id)} className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm ring-1 transition ${m.id === active ? 'bg-ink text-canvas ring-ink' : 'ring-line/10 hover:ring-line/30'}`}>
          <span className={`${m.texture} h-7 w-7 rounded-full`} style={m.id === 'leather' ? { ['--tone' as string]: tone } : undefined} />{m.name.split(' ').slice(-1)[0]}
        </button>)}
      </div>
      {active === 'leather' && <div className="mt-6 flex animate-fade-up items-center gap-3"><span className="text-xs font-semibold uppercase tracking-[.2em] text-muted">Hide</span>
        {interiorColours.map(c => <button key={c.name} type="button" title={c.name} aria-label={`${c.name} leather`} aria-pressed={tone === c.hex} onClick={() => setTone(c.hex)} className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-canvas transition ${tone === c.hex ? 'ring-ink' : 'ring-transparent'}`} style={{ background: c.hex }} />)}
      </div>}
    </div>
  </section>
}

/** Interactive tech explainer: pulsing hotspots over the car with a detail card. */
export function TechHotspots({ car }: { car: Car }) {
  const [open, setOpen] = useState(0)
  const feature = techFeatures[open]
  return <section aria-labelledby="tech-title">
    <div className="eyebrow">TECHNOLOGY</div>
    <h2 id="tech-title" className="mt-3 text-4xl md:text-5xl">Intelligence, quietly applied.</h2>
    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,.6fr)]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-line/10">
        <VehicleImage car={car} index={Math.min(1, car.images.length - 1)} sizes="(max-width: 1024px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-black/20" />
        {techFeatures.map((f, i) => <button key={f.title} type="button" onClick={() => setOpen(i)} aria-pressed={open === i} aria-label={f.title} data-cursor="Explore"
          className={`absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition ${open === i ? 'scale-110 bg-bronze' : 'bg-white/25 backdrop-blur hover:bg-white/40'}`}
          style={{ left: `${f.x}%`, top: `${f.y}%`, animation: open === i ? undefined : 'concierge-pulse 2.4s infinite' }}><Plus size={18} className={open === i ? 'rotate-45 transition' : 'transition'} /></button>)}
      </div>
      <div key={open} className="animate-fade-up">
        <p className="font-display text-6xl text-bronze">0{open + 1}</p>
        <h3 className="mt-3 font-display text-3xl">{feature.title}</h3>
        <p className="mt-3 leading-7 text-muted">{feature.body}</p>
        <div className="mt-6 flex gap-2">{techFeatures.map((f, i) => <button key={f.title} type="button" aria-label={`Show ${f.title}`} onClick={() => setOpen(i)} className={`h-1.5 rounded-full transition-all ${open === i ? 'w-10 bg-ink' : 'w-5 bg-line/20'}`} />)}</div>
        <p className="mt-6 text-xs text-muted">Features vary by model and specification; confirm with our team.</p>
      </div>
    </div>
  </section>
}

/** "View in your driveway": a mock AR preview with a draggable, scalable car. */
export function ArPreviewButton({ car }: { car: Car }) {
  const [open, setOpen] = useState(false)
  return <>
    <button type="button" onClick={() => setOpen(true)} className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface px-2 py-3 text-xs font-semibold ring-1 ring-line/10 hover:ring-line/30"><ScanLine size={17} />In my driveway</button>
    {open && <ArPreview car={car} onClose={() => setOpen(false)} />}
  </>
}

function ArPreview({ car, onClose }: { car: Car; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(true, onClose)
  const [scale, setScale] = useState(1)
  const [x, setX] = useState(50)
  return <div className="fixed inset-0 z-[140] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Driveway preview" className="w-full max-w-4xl overflow-hidden rounded-[28px] bg-night text-white shadow-2xl">
      <div className="flex items-center justify-between p-4"><span className="flex items-center gap-2 text-sm"><ScanLine size={16} className="text-bronze" /> Driveway preview · {car.brand} {car.model}</span><button type="button" onClick={onClose} aria-label="Close preview" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={18} /></button></div>
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: 'linear-gradient(#9fb6c9 0%, #dfe6ea 42%, #b9b2a6 42.2%, #8f877b 100%)' }}>
        {/* house + gate */}
        <div className="absolute left-[6%] top-[14%] h-[30%] w-[38%] rounded-t-lg bg-[#e9e3d8] shadow-lg"><div className="absolute inset-x-[8%] top-[30%] h-[45%] rounded bg-[#52606b]/70" /></div>
        <div className="absolute right-[4%] top-[24%] h-[19%] w-[30%] bg-[repeating-linear-gradient(90deg,#3a3a3a_0_6px,transparent_6px_22px)] opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[repeating-linear-gradient(115deg,rgba(255,255,255,.05)_0_40px,rgba(0,0,0,.05)_40px_80px)]" />
        <div className="absolute bottom-[8%] aspect-[16/9] w-[56%] -translate-x-1/2 transition-[left,transform] duration-300" style={{ left: `${x}%`, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'bottom center', WebkitMaskImage: 'radial-gradient(ellipse 58% 62% at 50% 55%, #000 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse 58% 62% at 50% 55%, #000 55%, transparent 100%)' }}>
          <VehicleImage car={car} sizes="60vw" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-[11px] uppercase tracking-[.2em]">Preview</span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <label className="text-sm">Position<input type="range" min={25} max={75} value={x} onChange={e => setX(Number(e.target.value))} className="mt-2 w-full accent-bronze" /></label>
        <label className="text-sm">Size<input type="range" min={0.7} max={1.3} step={0.01} value={scale} onChange={e => setScale(Number(e.target.value))} className="mt-2 w-full accent-bronze" /></label>
        <p className="text-xs text-white/50 sm:col-span-2">A visual mock-up. Live camera AR on your phone is coming soon.</p>
      </div>
    </div>
  </div>
}
