import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { articles } from '@/lib/content'
import { cars, money } from '@/data/cars'
import { VehicleImage } from '@/components/VehicleImage'
import { ShareButton } from '@/components/ShareButton'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = articles.find(x => x.slug === slug)
  return a ? { title: a.title, description: a.dek } : { title: 'Article not found' }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const index = articles.findIndex(x => x.slug === slug)
  if (index < 0) notFound()
  const a = articles[index]
  const car = cars.find(c => c.id === a.carId)!
  const next = articles[(index + 1) % articles.length]

  return <article>
    <header className="relative overflow-hidden bg-night text-white">
      <div className="absolute inset-0 opacity-45"><div className="relative h-full w-full animate-ken-burns"><VehicleImage car={car} priority sizes="100vw" /></div></div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/20" />
      <div className="section-wrap relative pb-16 pt-28 md:pb-24 md:pt-40">
        <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowLeft size={15} /> The Journal</Link>
        <p className="eyebrow mt-8">{a.category} · {a.minutes} min read</p>
        <h1 className="mt-4 max-w-4xl animate-fade-up text-[clamp(2.6rem,6vw,5.5rem)]">{a.title}</h1>
        <p className="mt-5 max-w-2xl text-xl font-light text-white/75">{a.dek}</p>
      </div>
    </header>
    <div className="section-wrap grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-2xl">
        {a.body.map((p, i) => <p key={i} className={`mb-6 text-lg font-light leading-9 text-ink/85 ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[.85] first-letter:text-bronze' : ''}`}>{p}</p>)}
        <div className="mt-10 flex flex-wrap gap-3 border-t border-line/10 pt-8"><ShareButton title={a.title} text={a.dek} /></div>
      </div>
      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <Link href={`/cars/${car.slug}`} className="group block overflow-hidden rounded-[24px] bg-card ring-1 ring-line/10">
          <div className="relative aspect-[4/3] overflow-hidden"><VehicleImage car={car} sizes="320px" className="transition duration-700 group-hover:scale-105" /></div>
          <div className="p-5"><p className="eyebrow">Featured in this story</p><p className="mt-1 font-display text-xl">{car.year} {car.brand} {car.model}</p><p className="price mt-1 text-muted">{money(car.price)}</p></div>
        </Link>
        <Link href={`/journal/${next.slug}`} className="group block rounded-[24px] bg-night p-6 text-white"><p className="eyebrow">Read next</p><p className="mt-2 font-display text-2xl">{next.title}</p><span className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white">Continue <ArrowRight size={14} /></span></Link>
      </aside>
    </div>
  </article>
}
