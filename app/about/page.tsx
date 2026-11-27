import Image from 'next/image'
import { CountUp, Reveal } from '@/components/Motion'
import { brands, cars } from '@/data/cars'

export const metadata = { title: 'About', description: 'DEV BOYZ MOTORS: good cars, honest dealing.' }

export default function About() {
  return <section className="section-wrap py-14 md:py-20">
    <div className="eyebrow">ABOUT DEV BOYZ MOTORS</div>
    <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr]">
      <h1 className="animate-fade-up text-4xl font-black leading-[1.02] tracking-[-.055em] sm:text-5xl md:text-7xl">Good cars.<br />Honest dealing.</h1>
      <p className="max-w-xl text-xl leading-8 text-muted">We help buyers across Nigeria find luxury and foreign-used cars with full paperwork, honest pricing and a viewing before any money changes hands.</p>
    </div>
    <div className="relative mt-14 aspect-[1.75/1] w-full overflow-hidden rounded-[30px]"><div className="absolute inset-0 animate-ken-burns"><Image src={cars[5].images[0]} alt="Range Rover Autobiography" fill sizes="100vw" unoptimized className="object-cover" /></div></div>
    <div className="mt-14 grid gap-8 sm:grid-cols-3">
      <Reveal><p className="text-5xl font-black"><CountUp value={cars.length} /></p><p className="mt-2 text-muted">Cars in the collection</p></Reveal>
      <Reveal delay={120}><p className="text-5xl font-black"><CountUp value={brands.length} /></p><p className="mt-2 text-muted">Brands we specialise in</p></Reveal>
      <Reveal delay={240}><p className="text-5xl font-black"><CountUp value={24} suffix="h" /></p><p className="mt-2 text-muted">Typical reply time</p></Reveal>
    </div>
    <p className="mt-12"><a href="/owner" className="pill-black">Meet the owner</a></p>
    <p className="mt-8 text-xs text-muted">This site is a demo project. Inventory, prices and testimonials are sample content.</p>
  </section>
}
