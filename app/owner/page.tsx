import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Github, Globe, MapPin } from 'lucide-react'
import { Reveal } from '@/components/Motion'

export const metadata: Metadata = {
  title: 'Meet the owner',
  description: 'Imegu Favour Ewomazino, founder and owner of DEV BOYZ MOTORS, web and software developer from Ibadan, Nigeria.',
}

const owner = {
  name: 'Imegu Favour Ewomazino',
  role: 'Founder & Owner, DEV BOYZ MOTORS',
  location: 'Ibadan, Nigeria',
  portfolio: 'https://imegu.world',
  portrait: 'https://imegu.world/media/hero-graduation-900.webp',
  portfolioPreview: 'https://imegu.world/social-preview.png',
  links: [
    { label: 'Portfolio', handle: 'imegu.world', href: 'https://imegu.world', icon: Globe },
    { label: 'GitHub', handle: 'codeWithGojo', href: 'https://github.com/codeWithGojo', icon: Github },
    { label: 'X', handle: '@not_favour', href: 'https://x.com/not_favour', icon: null },
  ],
}

const principles = [
  ['Honest from the first click', 'Real documents, clear prices and a viewing before any money moves. The website should earn trust before the showroom does.'],
  ['Built, not bought', 'Every part of this site — the configurator, the AI car finder, the finance tools — was designed and engineered in-house.'],
  ['Made for Nigerian buyers', 'Naira pricing, WhatsApp-first enquiries, running costs at local fuel prices, and Pidgin when you want it.'],
]

export default function OwnerPage() {
  return <>
    <section className="relative overflow-hidden hero-bg">
      <div className="section-wrap grid items-end gap-10 pb-0 pt-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:pt-20">
        <div className="pb-14 md:pb-24">
          <div className="eyebrow animate-fade-up">Meet the owner</div>
          <h1 className="mt-5 animate-fade-up text-[clamp(2.8rem,7vw,6.5rem)] [animation-delay:120ms]">
            Imegu Favour<br /><span className="italic text-ink/70">Ewomazino</span>
          </h1>
          <p className="mt-6 animate-fade-up text-lg font-light text-ink/80 [animation-delay:240ms] md:text-xl">{owner.role}</p>
          <p className="mt-2 flex animate-fade-up items-center gap-2 text-sm text-muted [animation-delay:300ms]"><MapPin size={15} /> Web &amp; software developer · {owner.location}</p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:380ms]">
            <a href={owner.portfolio} target="_blank" rel="noopener noreferrer" className="pill-black gap-2">Visit imegu.world <ArrowUpRight size={16} /></a>
            <Link href="/contact" className="pill-outline">Contact the dealership</Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms]">
          <div className="pointer-events-none absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-bronze/20 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-[525/655] overflow-hidden rounded-t-[999px] ring-1 ring-black/5">
            <Image src={owner.portrait} alt="Imegu Favour Ewomazino in a graduation outfit" fill priority sizes="(max-width: 768px) 90vw, 448px" className="object-cover" />
          </div>
          <span className="absolute -left-2 bottom-10 rounded-full bg-night px-4 py-2 font-display text-sm text-white shadow-xl md:-left-8">Founder · DEV BOYZ</span>
        </div>
      </div>
    </section>

    <section className="section-wrap py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <div className="eyebrow">A note from the owner</div>
          <h2 className="mt-4 text-4xl md:text-5xl">“A great car deserves a buying experience to match.”</h2>
        </Reveal>
        <Reveal delay={120} className="space-y-5 text-lg font-light leading-8 text-ink/80">
          <p>I&apos;m a web and software developer from Ibadan, and I built DEV BOYZ MOTORS to show what buying a luxury car in Nigeria online should feel like: calm, transparent and genuinely helpful.</p>
          <p>Compare cars side by side, configure them, see what they really cost to run, or simply tell our assistant what you need. When you&apos;re ready, we&apos;ll meet you in person — with the paperwork in hand.</p>
          <p className="font-display text-2xl italic text-ink">— Favour</p>
        </Reveal>
      </div>
    </section>

    <section className="bg-night py-16 text-white md:py-24">
      <div className="section-wrap">
        <Reveal><div className="eyebrow">What guides the business</div></Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3">{principles.map(([title, body], i) => <Reveal key={title} delay={i * 120}>
          <p className="font-display text-5xl text-bronze">0{i + 1}</p>
          <h3 className="mt-5 font-display text-2xl font-medium">{title}</h3>
          <p className="mt-3 leading-7 text-white/65">{body}</p>
        </Reveal>)}</div>
      </div>
    </section>

    <section className="section-wrap py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <a href={owner.portfolio} target="_blank" rel="noopener noreferrer" data-cursor="Visit" className="group block overflow-hidden rounded-[28px] bg-card ring-1 ring-line/10 transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative aspect-[1200/630] overflow-hidden"><Image src={owner.portfolioPreview} alt="Preview of imegu.world, Favour Imegu's portfolio" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
            <div className="flex items-center justify-between gap-4 p-5"><span><strong className="block font-display text-xl font-medium">imegu.world</strong><span className="text-sm text-muted">Portfolio · websites, products &amp; business systems</span></span><ArrowUpRight className="shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
          </a>
        </Reveal>
        <Reveal delay={120}>
          <div className="eyebrow">Portfolio</div>
          <h2 className="mt-4 text-4xl md:text-5xl">More work by Favour</h2>
          <p className="mt-4 max-w-md text-lg font-light leading-8 text-ink/75">Websites, web apps and business systems — including Afri Index, an open Afrobeats ranking. See the full portfolio and get in touch for your own project.</p>
          <ul className="mt-8 divide-y divide-line/10 border-y border-line/10">{owner.links.map(l => <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4">
              <span className="flex items-center gap-3">{l.icon ? <l.icon size={18} className="text-bronze" /> : <span className="w-[18px] text-center font-bold text-bronze">𝕏</span>}<span className="text-muted">{l.label}</span></span>
              <span className="flex items-center gap-2 font-medium">{l.handle}<ArrowUpRight size={16} className="transition group-hover:translate-x-0.5" /></span>
            </a>
          </li>)}</ul>
        </Reveal>
      </div>
    </section>
  </>
}
