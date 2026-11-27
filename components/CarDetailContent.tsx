'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import type { Car } from '@/data/cars'
import { money, km, similarCars } from '@/data/cars'
import { ArrowUpRight, CheckCircle2, Columns3, Gauge, Heart, MessageCircle, ShoppingBag, Timer, Users, Zap } from 'lucide-react'
import { useShop } from '@/context/ShopContext'
import { useInventory, useLiveCar } from '@/context/InventoryContext'
import { usePrefs } from '@/context/PreferencesContext'
import { whatsappUrl, vehicleMessage } from '@/lib/site'
import { FinanceCalculator } from './FinanceCalculator'
import { EnquiryTrigger } from './EnquiryForm'
import { CarGallery } from './CarGallery'
import { CarCard, StatusBadge } from './CarCard'
import { Configurator } from './Configurator'
import { EngineSound } from './EngineSound'
import { CostOfOwnership } from './CostOfOwnership'
import { ShareButton } from './ShareButton'
import { CountUp, Reveal } from './Motion'
import { VehicleImage } from './VehicleImage'
import { ArPreviewButton, InteriorShowcase, TechHotspots } from './CarExtras'

export function CarDetailContent({ car: staticCar }: { car: Car }) {
  const car = useLiveCar(staticCar)
  const { cars } = useInventory()
  const { t } = usePrefs()
  const { wishlist, toggleWishlist, garage, toggleGarage, setGarageOpen, compare, toggleCompare, markViewed } = useShop()
  const liked = wishlist.includes(car.id), inGarage = garage.includes(car.id), comparing = compare.includes(car.id)
  const sold = car.availability === 'Sold'
  useEffect(() => { markViewed(car.id) }, [car.id, markViewed])

  return <div>
    <div className="section-wrap py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/showroom">Showroom</Link><span className="mx-2">/</span><strong className="text-ink">{car.model}</strong></nav>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-12">
        <CarGallery car={car} />
        <div className="min-w-0 lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center gap-3"><span className="eyebrow">{car.brand} / {car.year}</span><StatusBadge status={car.availability} /></div>
          <h1 className="mt-3 break-words text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl md:text-6xl">{car.model}</h1>
          <div className="mt-6 flex flex-wrap gap-2">{[car.condition, car.bodyType, car.fuel, `${car.seats} seats`].map(item => <span key={item} className="rounded-full bg-surface px-3.5 py-2 text-xs font-semibold ring-1 ring-line/5">{item}</span>)}</div>
          <div className="my-7 h-px bg-line/10" />
          <div className="eyebrow">Asking price</div>
          <p className={`price mt-2 break-words text-3xl sm:text-4xl md:text-5xl ${sold ? 'text-muted line-through' : ''}`}>{money(car.price)}</p>
          {sold && <p className="mt-2 text-sm font-semibold text-bronze">This car has been sold — ask us to source a similar one.</p>}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <EnquiryTrigger kind={sold ? 'source' : 'reserve'} car={car} className="pill-black gap-2"><CheckCircle2 size={17} /> {sold ? 'Find me one like it' : t('cta.reserve')}</EnquiryTrigger>
            <EnquiryTrigger kind="testdrive" car={car} className="pill-outline">Book a test drive</EnquiryTrigger>
          </div>
          <Link href={`/build?car=${car.slug}&step=1`} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-bronze/50 px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-bronze hover:text-white">Build &amp; price yours <ArrowUpRight size={15} /></Link>
          <a className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#166c4a] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#11553a]" href={whatsappUrl(vehicleMessage(car, money))} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> {t('cta.whatsapp')} <ArrowUpRight size={15} /></a>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            <IconAction onClick={() => toggleWishlist(car.id)} pressed={liked} label={liked ? 'Saved' : 'Save'}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></IconAction>
            <IconAction onClick={() => { if (!inGarage) toggleGarage(car.id); setGarageOpen(true) }} label={inGarage ? 'Garage' : 'Garage +'}><ShoppingBag size={17} /></IconAction>
            <IconAction onClick={() => toggleCompare(car.id)} pressed={comparing} label="Compare"><Columns3 size={17} /></IconAction>
            <ShareButton title={`${car.year} ${car.brand} ${car.model}`} text={`${car.year} ${car.brand} ${car.model} — ${money(car.price)} at DEV BOYZ MOTORS`} className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface px-2 py-3 text-xs font-semibold ring-1 ring-line/10 hover:ring-line/30" />
            <ArPreviewButton car={car} />
          </div>
          <div className="mt-8 grid min-w-0 grid-cols-2 overflow-hidden rounded-3xl bg-card ring-1 ring-line/5">
            {[['Mileage', km(car.mileage)], ['Engine', car.engine], ['Transmission', car.transmission], ['Fuel', car.fuel], ['Body', car.bodyType], ['Colour', car.colour]].map(([label, value], index) => <div key={label} className={`p-5 ${index % 2 === 0 ? 'border-r border-line/10' : ''} ${index < 4 ? 'border-b border-line/10' : ''}`}><div className="eyebrow !text-muted">{label}</div><p className="mt-2 break-words text-sm font-bold">{value}</p></div>)}
          </div>
        </div>
      </div>
    </div>

    {/* Cinematic performance section */}
    <section className="relative overflow-hidden bg-night py-20 text-white md:py-28" aria-labelledby="perf-title">
      <div className="absolute inset-0 opacity-25"><div className="relative h-full w-full animate-ken-burns"><VehicleImage car={car} index={Math.min(1, car.images.length - 1)} sizes="100vw" /></div></div>
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
      <div className="section-wrap relative">
        <Reveal><div className="eyebrow">PERFORMANCE</div><h2 id="perf-title" className="mt-3 max-w-2xl text-4xl font-black tracking-[-.04em] md:text-6xl">{car.engine}. {car.hp} horsepower.</h2></Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}><Stat icon={<Timer />} value={<CountUp value={car.zeroTo100} decimals={1} suffix="s" />} label="0–100 km/h" /></Reveal>
          <Reveal delay={120}><Stat icon={<Zap />} value={<CountUp value={car.hp} />} label="Horsepower" /></Reveal>
          <Reveal delay={240}><Stat icon={<Gauge />} value={<CountUp value={car.topSpeed} suffix=" km/h" />} label="Top speed" /></Reveal>
          <Reveal delay={360}><Stat icon={<Users />} value={<CountUp value={car.seats} />} label="Seats" /></Reveal>
        </div>
        <Reveal className="mt-12 max-w-md"><EngineSound car={car} /></Reveal>
        <p className="mt-6 text-xs text-white/40">Approximate manufacturer figures.</p>
      </div>
    </section>

    <div className="section-wrap space-y-24 py-20">
      <Reveal><InteriorShowcase car={car} /></Reveal>
      <Reveal><TechHotspots car={car} /></Reveal>
    </div>

    <div className="section-wrap space-y-10 pb-16">
      <Reveal><Configurator car={car} /></Reveal>
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal><CostOfOwnership car={car} /></Reveal>
        <Reveal delay={120}><FinanceCalculator initialPrice={car.price} compact /></Reveal>
      </div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="eyebrow">YOU MAY ALSO LIKE</div><h2 className="mt-2 text-3xl font-bold tracking-tight">Similar cars</h2></div><Link href={`/showroom?body=${encodeURIComponent(car.bodyType)}`} className="text-sm font-semibold underline underline-offset-4">More {car.bodyType}s</Link></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similarCars(car, cars).map(c => <CarCard key={c.id} car={c} />)}</div>
      </Reveal>
    </div>

    {/* Sticky mobile action bar */}
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line/10 bg-canvas/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a href={whatsappUrl(vehicleMessage(car, money))} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#166c4a] py-3 text-sm font-semibold text-white"><MessageCircle size={17} /> WhatsApp</a>
      <EnquiryTrigger kind="viewing" car={car} className="pill-black flex-1 py-3">{t('cta.viewing')}</EnquiryTrigger>
    </div>
  </div>
}

function IconAction({ onClick, pressed, label, children }: { onClick: () => void; pressed?: boolean; label: string; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} aria-pressed={pressed} className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-xs font-semibold ring-1 transition active:scale-95 ${pressed ? 'bg-ink text-canvas ring-ink' : 'bg-surface ring-line/10 hover:ring-line/30'}`}>{children}{label}</button>
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return <div className="border-l border-white/15 pl-5"><span className="text-bronze">{icon}</span><p className="mt-4 text-4xl font-black tracking-tight md:text-5xl">{value}</p><p className="mt-1 text-sm text-white/60">{label}</p></div>
}
