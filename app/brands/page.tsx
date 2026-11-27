import Link from 'next/link'
import { brands, cars } from '@/data/cars'
import { VehicleImage } from '@/components/VehicleImage'
import { Reveal } from '@/components/Motion'

export const metadata = { title: 'Brands', description: 'Mercedes-AMG, Lexus, Range Rover, Lamborghini, Toyota and Tesla at DEV BOYZ MOTORS.' }

export default function Brands() {
  const groups = brands.map(b => ({ b, count: cars.filter(c => c.brand === b).length, car: cars.find(c => c.brand === b)! }))
  return <section className="section-wrap py-14">
    <div className="eyebrow">OUR MARQUES</div>
    <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-6xl">Brands</h1>
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{groups.map((g, i) => <Reveal key={g.b} delay={(i % 3) * 100}>
      <Link href={`/showroom?brand=${encodeURIComponent(g.b)}`} data-cursor="Explore" className="group relative block aspect-[1.35/1] min-w-0 overflow-hidden rounded-[28px]">
        <VehicleImage car={g.car} className="transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white"><h2 className="text-3xl font-black">{g.b}</h2><p className="text-sm text-white/70">{g.count} {g.count === 1 ? 'car' : 'cars'} in stock</p></div>
      </Link>
    </Reveal>)}</div>
  </section>
}
