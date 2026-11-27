'use client'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCarsByIds, useGarageCars, useShop } from '@/context/ShopContext'
import { CarCard } from '@/components/CarCard'
import { EmptyState } from '@/components/SiteChrome'

export default function GaragePage() {
  const { wishlist, clearWishlist, garage, clearGarage } = useShop()
  const garageCars = useGarageCars()
  const liked = useCarsByIds(wishlist)
  return <div className="section-wrap py-12 md:py-20">
    <div className="eyebrow">YOUR COLLECTION</div>
    <h1 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-7xl">Saved vehicles.</h1>
    <p className="mt-5 max-w-2xl text-muted">Your shortlist is saved on this device. Nothing is purchased or reserved until you speak with our team.</p>
    <section className="mt-14" aria-labelledby="wishlist-title">
      <div className="flex items-center justify-between gap-4"><h2 id="wishlist-title" className="flex items-center gap-3 text-2xl font-bold"><Heart size={22} /> Wishlist <span className="text-base font-normal text-muted">{liked.length}</span></h2>{liked.length > 0 && <button type="button" onClick={clearWishlist} className="text-sm underline">Clear wishlist</button>}</div>
      {liked.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{liked.map(car => <CarCard key={car.id} car={car} />)}</div>
        : <div className="mt-6"><EmptyState icon={<Heart size={26} />} title="No favourites yet" body="Tap the heart on any car to keep it here for later." action={<Link className="pill-black mt-5" href="/showroom">Explore the showroom</Link>} /></div>}
    </section>
    <section className="mt-16" aria-labelledby="garage-title">
      <div className="flex items-center justify-between gap-4"><h2 id="garage-title" className="flex items-center gap-3 text-2xl font-bold"><ShoppingBag size={22} /> Garage <span className="text-base font-normal text-muted">{garageCars.length}</span></h2>{garage.length > 0 && <button type="button" onClick={clearGarage} className="text-sm underline">Clear garage</button>}</div>
      {garageCars.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{garageCars.map(car => <CarCard key={car.id} car={car} />)}</div>
        : <div className="mt-6"><EmptyState icon={<ShoppingBag size={26} />} title="Your garage is empty" body="Add cars to your garage from any car page to see the total and enquire about them together." action={<Link className="pill-black mt-5" href="/showroom">Find a car</Link>} /></div>}
    </section>
  </div>
}
