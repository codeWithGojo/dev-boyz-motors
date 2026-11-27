import Link from 'next/link'
import { ArrowRight, BatteryCharging, Leaf, Sun, Zap } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { CountUp, Reveal } from '@/components/Motion'
import { cars } from '@/data/cars'
import { CarCard } from '@/components/CarCard'

export const metadata = { title: 'Innovation & sustainability', description: 'Hybrids, EVs, battery health checks and lower-impact delivery at DEV BOYZ MOTORS.' }

const pillars = [
  [BatteryCharging, 'Battery health, certified', 'Every hybrid and electric car is tested for battery state-of-health before sale, and the report is yours.'],
  [Sun, 'Solar-ready charging', 'We install wallboxes paired with inverter and solar setups, so charging doesn’t depend on the grid.'],
  [Leaf, 'Lower-impact delivery', 'Enclosed, shared transport and offset emissions for every delivery outside Lagos.'],
  [Zap, 'Efficient by choice', 'Our showroom runs on solar during the day, and we recycle tyres, oil and batteries.'],
] as const

export default function InnovationPage() {
  const electrified = cars.filter(c => c.fuel !== 'Petrol')
  return <>
    <PageIntro dark eyebrow="Innovation & sustainability" title={<>Luxury that<br /><span className="italic text-white/70">looks ahead.</span></>} lead="Performance and responsibility don’t have to pull in different directions. Here’s how we’re bringing them together." />
    <section className="section-wrap grid gap-8 py-16 sm:grid-cols-3">
      <Reveal><p className="font-display text-6xl"><CountUp value={electrified.length} /></p><p className="mt-2 text-muted">Hybrid and electric cars in stock</p></Reveal>
      <Reveal delay={120}><p className="font-display text-6xl"><CountUp value={68} suffix="%" /></p><p className="mt-2 text-muted">Typical fuel saving for a self-charging hybrid in city traffic*</p></Reveal>
      <Reveal delay={240}><p className="font-display text-6xl"><CountUp value={100} suffix="%" /></p><p className="mt-2 text-muted">Of electrified cars battery-tested before sale</p></Reveal>
    </section>
    <section className="section-wrap grid gap-6 pb-16 md:grid-cols-2">
      {pillars.map(([Icon, title, body], i) => <Reveal key={title} delay={(i % 2) * 120}><div className="panel h-full p-8"><Icon className="text-bronze" size={28} /><h2 className="mt-5 text-3xl">{title}</h2><p className="mt-3 leading-7 text-muted">{body}</p></div></Reveal>)}
    </section>
    <section className="section-wrap pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl md:text-4xl">Electrified in the collection</h2><Link href="/showroom?fuel=Hybrid" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">See all <ArrowRight size={14} /></Link></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{electrified.map(c => <CarCard key={c.id} car={c} />)}</div>
      <p className="mt-6 text-xs text-muted">*Illustrative figure for demo purposes.</p>
    </section>
  </>
}
