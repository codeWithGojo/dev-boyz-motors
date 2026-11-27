'use client'
import { useMemo, useState } from 'react'
import { BriefcaseBusiness, Camera, Check, KeyRound, MessageCircle, PlugZap, Plus, Shield, Sparkles, Umbrella, Wine } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Motion'
import { accessories } from '@/lib/content'
import { money } from '@/data/cars'
import { whatsappUrl } from '@/lib/site'
import { useToast } from '@/context/ToastContext'

const icons = { Shield, KeyRound, BriefcaseBusiness, Umbrella, Camera, PlugZap, Sparkles, Wine }
const categories = ['All', ...new Set(accessories.map(a => a.category))]

export default function AccessoriesPage() {
  const { toast } = useToast()
  const [category, setCategory] = useState('All')
  const [picked, setPicked] = useState<string[]>([])
  const list = accessories.filter(a => category === 'All' || a.category === category)
  const chosen = useMemo(() => accessories.filter(a => picked.includes(a.id)), [picked])
  const total = chosen.reduce((s, a) => s + a.price, 0)
  const toggle = (id: string, name: string) => {
    const has = picked.includes(id)
    setPicked(p => has ? p.filter(x => x !== id) : [...p, id])
    toast(has ? `${name} removed` : `${name} added to your request`)
  }

  return <>
    <PageIntro eyebrow="Accessories & lifestyle" title="Finishing touches." lead="Fitted, gifted or simply kept in the boot. Each piece is chosen to match the cars we sell." />
    <section className="section-wrap py-14">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter accessories">{categories.map(c => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm transition ${category === c ? 'bg-ink text-canvas' : 'bg-card ring-1 ring-line/10 hover:ring-line/30'}`}>{c}</button>)}</div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a, i) => { const Icon = icons[a.icon]; const on = picked.includes(a.id); return <Reveal key={a.id} delay={(i % 4) * 80}>
          <article className="group overflow-hidden rounded-[24px] bg-card ring-1 ring-line/10 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative grid aspect-square place-items-center overflow-hidden" style={{ background: `radial-gradient(90% 80% at 30% 20%, #ffffff30, ${a.colour})` }}>
              <Icon size={72} strokeWidth={1} className="text-white/90 transition duration-700 group-hover:scale-110" />
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-white/20 blur-xl" style={{ animation: 'sheen 3.6s ease-in-out infinite', animationDelay: `${i * 0.4}s` }} />
            </div>
            <div className="p-5"><p className="eyebrow">{a.category}</p><h2 className="mt-1 !font-display text-xl">{a.name}</h2>
              <div className="mt-4 flex items-center justify-between"><span className="price text-lg">{money(a.price)}</span>
                <button type="button" onClick={() => toggle(a.id, a.name)} aria-pressed={on} aria-label={on ? `Remove ${a.name}` : `Add ${a.name}`} className={`grid h-10 w-10 place-items-center rounded-full transition ${on ? 'bg-bronze text-white' : 'bg-ink text-canvas'}`}>{on ? <Check size={17} /> : <Plus size={17} />}</button></div>
            </div>
          </article>
        </Reveal> })}
      </div>
    </section>
    {chosen.length > 0 && <div className="sticky bottom-4 z-40 mx-auto mb-10 flex w-[min(640px,calc(100%-2rem))] animate-fade-up items-center justify-between gap-4 rounded-full bg-night px-6 py-3 text-white shadow-2xl">
      <span className="text-sm">{chosen.length} {chosen.length === 1 ? 'item' : 'items'} · <span className="price">{money(total)}</span></span>
      <a href={whatsappUrl(`Hello DEV BOYZ MOTORS, I'd like these accessories: ${chosen.map(c => c.name).join(', ')} (total ${money(total)}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"><MessageCircle size={15} /> Request on WhatsApp</a>
    </div>}
  </>
}
