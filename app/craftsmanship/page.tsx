import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Motion'
import { heritage, materials } from '@/lib/content'

export const metadata = { title: 'Craftsmanship & heritage', description: 'The story of DEV BOYZ MOTORS and the materials and care behind every car.' }

export default function CraftsmanshipPage() {
  return <>
    <PageIntro eyebrow="Craftsmanship & heritage" title={<>Paperwork first.<br /><span className="italic text-ink/70">Then everything else.</span></>} lead="A dealership is only as good as the habits behind it. Ours began with one car and one rule, and the rule has never changed." />

    <section className="section-wrap py-20 md:py-28" aria-label="Our story">
      <ol className="relative border-l border-line/15 pl-8 md:pl-14">
        {heritage.map((h, i) => <Reveal as="li" key={h.year} delay={i * 80} className="relative pb-16 last:pb-0">
          <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-canvas bg-bronze md:-left-[65px]" aria-hidden="true" />
          <p className="font-display text-6xl text-bronze md:text-7xl">{h.year}</p>
          <h2 className="mt-3 text-3xl md:text-4xl">{h.title}</h2>
          <p className="mt-3 max-w-2xl text-lg font-light leading-8 text-ink/75">{h.body}</p>
        </Reveal>)}
      </ol>
    </section>

    <section className="bg-night py-20 text-white md:py-28" aria-labelledby="materials-title">
      <div className="section-wrap">
        <Reveal><div className="eyebrow">THE MATERIALS</div><h2 id="materials-title" className="mt-3 max-w-2xl text-4xl md:text-5xl">Five materials. No imitations.</h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {materials.map((m, i) => <Reveal key={m.id} delay={i * 90}>
            <figure className="group">
              <div className={`${m.texture} aspect-[3/4] overflow-hidden rounded-[22px] transition duration-700 group-hover:scale-[1.02]`} role="img" aria-label={`${m.name} close-up`} />
              <figcaption className="mt-4"><strong className="block font-display text-xl font-medium">{m.name}</strong><span className="mt-1 block text-sm leading-6 text-white/60">{m.note}</span></figcaption>
            </figure>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="section-wrap py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-3">
        {[['Inspected', '160-point inspection with paint-depth readings and a diagnostic scan on every car.'], ['Corrected', 'Paint correction, interior deep-clean and any repairs done in our own studio.'], ['Protected', 'Ceramic coating and a full documentation pack before handover.']].map(([title, body], i) => <Reveal key={title} delay={i * 120}>
          <p className="font-display text-5xl text-bronze">0{i + 1}</p><h3 className="mt-4 font-display text-2xl">{title}</h3><p className="mt-2 leading-7 text-muted">{body}</p>
        </Reveal>)}
      </div>
      <Reveal className="mt-16"><Link href="/build" className="pill-black gap-2">Commission your car <ArrowRight size={16} /></Link></Reveal>
    </section>
  </>
}
