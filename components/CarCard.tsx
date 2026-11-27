'use client'
import Link from 'next/link'
import { ArrowUpRight, Columns3, Heart } from 'lucide-react'
import type { Car } from '@/data/cars'
import { km, money } from '@/data/cars'
import { monthlyRepayment, defaultFinance } from '@/lib/finance'
import { useShop } from '@/context/ShopContext'
import { usePrefs } from '@/context/PreferencesContext'
import { VehicleImage } from './VehicleImage'

export function StatusBadge({ status, className = '' }: { status: Car['availability']; className?: string }) {
  if (status === 'Available') return null
  const tone = status === 'Sold' ? 'bg-night text-white' : 'bg-bronze text-white'
  return <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] ${tone} ${className}`}>{status}</span>
}

export function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  const { wishlist, toggleWishlist, compare, toggleCompare } = useShop()
  const { t } = usePrefs()
  const saved = wishlist.includes(car.id)
  const comparing = compare.includes(car.id)
  const sold = car.availability === 'Sold'

  return <article data-testid="car-card" className="group min-w-0 overflow-hidden rounded-[26px] bg-card shadow-[0_5px_30px_rgba(0,0,0,.025)] ring-1 ring-line/[.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[.08]">
    <div className="relative aspect-[1.2/1] overflow-hidden bg-line/[.08]">
      <Link href={`/cars/${car.slug}`} aria-label={`View ${car.brand} ${car.model}`} data-cursor={t('card.view')} className="absolute inset-0">
        <VehicleImage car={car} priority={priority} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className={`transition duration-700 group-hover:scale-105 ${sold ? 'grayscale' : ''}`} />
      </Link>
      <StatusBadge status={car.availability} className="pointer-events-none absolute left-4 top-4" />
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button type="button" aria-label={saved ? `Remove ${car.model} from wishlist` : `Save ${car.model} to wishlist`} aria-pressed={saved} onClick={() => toggleWishlist(car.id)} className={`grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition active:scale-90 ${saved ? 'text-rose-600' : 'text-black'}`}><Heart size={18} fill={saved ? 'currentColor' : 'none'} className={saved ? 'animate-pop-in' : ''} /></button>
        <button type="button" aria-label={comparing ? `Remove ${car.model} from comparison` : `Compare ${car.model}`} aria-pressed={comparing} onClick={() => toggleCompare(car.id)} className={`grid h-11 w-11 place-items-center rounded-full shadow-md transition active:scale-90 ${comparing ? 'bg-bronze text-white' : 'bg-white text-black'}`}><Columns3 size={17} /></button>
      </div>
    </div>
    <div className="p-5">
      <div className="eyebrow">{car.brand} · {car.condition}</div>
      <Link href={`/cars/${car.slug}`} className="mt-2 block font-display text-[1.45rem] font-medium leading-snug underline-offset-4 hover:underline">{car.model}</Link>
      <p className="mt-3 text-xs text-muted">{car.year} <span className="mx-1.5">·</span> {km(car.mileage)} <span className="mx-1.5">·</span> {car.hp} hp</p>
      <div className="mt-5 border-t border-line/10 pt-5">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <strong className={`price min-w-0 break-words text-xl sm:text-[1.4rem] ${sold ? 'text-muted line-through' : ''}`}>{money(car.price)}</strong>
          <Link href={`/cars/${car.slug}`} aria-label={`Details for ${car.model}`} className="grid h-9 w-9 place-items-center rounded-full bg-ink text-canvas transition group-hover:rotate-45"><ArrowUpRight size={17} /></Link>
        </div>
        <p className="mt-2 text-xs text-muted">From {money(monthlyRepayment({ price: car.price, ...defaultFinance }))}/mo · 40% down, 48 months</p>
      </div>
    </div>
  </article>
}

export function CarCardSkeleton() {
  return <div className="overflow-hidden rounded-[26px] bg-card ring-1 ring-line/[.07]" aria-hidden="true">
    <div className="skeleton aspect-[1.2/1] rounded-none" />
    <div className="space-y-3 p-5"><div className="skeleton h-3 w-24" /><div className="skeleton h-6 w-3/4" /><div className="skeleton h-3 w-1/2" /><div className="skeleton mt-6 h-6 w-2/5" /></div>
  </div>
}
