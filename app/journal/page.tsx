import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Motion'
import { VehicleImage } from '@/components/VehicleImage'
import { articles } from '@/lib/content'
import { cars } from '@/data/cars'

export const metadata = { title: 'Journal', description: 'Guides, craftsmanship and innovation stories from DEV BOYZ MOTORS.' }

export default function JournalPage() {
  const [lead, ...rest] = articles
  const carFor = (id: string) => cars.find(c => c.id === id)!
  return <>
    <PageIntro eyebrow="The Journal" title="Stories worth the drive." lead="Buying advice, the craft behind great cars, and where motoring in Nigeria is heading." />
    <section className="section-wrap py-14">
      <Reveal>
        <Link href={`/journal/${lead.slug}`} data-cursor="Read" className="group grid overflow-hidden rounded-[30px] bg-card ring-1 ring-line/10 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden"><VehicleImage car={carFor(lead.carId)} sizes="(max-width: 768px) 100vw, 50vw" className="transition duration-700 group-hover:scale-105" /></div>
          <div className="flex flex-col justify-center p-8 md:p-12"><p className="eyebrow">{lead.category} · {lead.minutes} min read</p><h2 className="mt-4 text-4xl md:text-5xl">{lead.title}</h2><p className="mt-4 text-lg font-light text-muted">{lead.dek}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">Read the story <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div>
        </Link>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {rest.map((a, i) => <Reveal key={a.slug} delay={i * 120}>
          <Link href={`/journal/${a.slug}`} data-cursor="Read" className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[26px]"><VehicleImage car={carFor(a.carId)} sizes="(max-width: 768px) 100vw, 50vw" className="transition duration-700 group-hover:scale-105" /></div>
            <p className="eyebrow mt-5">{a.category} · {a.minutes} min read</p><h2 className="mt-2 text-3xl">{a.title}</h2><p className="mt-2 text-muted">{a.dek}</p>
          </Link>
        </Reveal>)}
      </div>
    </section>
  </>
}
