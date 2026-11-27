import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cars, money } from '@/data/cars'
import { site } from '@/lib/site'
import { CarDetailContent } from '@/components/CarDetailContent'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return cars.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = cars.find(c => c.slug === slug)
  if (!car) return { title: 'Vehicle not found' }
  const title = `${car.year} ${car.brand} ${car.model} · ${money(car.price)}`
  const description = `${car.year} ${car.brand} ${car.model}: ${car.engine}, ${car.hp} hp, ${car.condition.toLowerCase()}. Configure it, estimate running costs and book a viewing.`
  return { title, description, alternates: { canonical: `/cars/${car.slug}` }, openGraph: { title, description, type: 'website' } }
}

export default async function CarDetail({ params }: Props) {
  const { slug } = await params
  const car = cars.find(c => c.slug === slug)
  if (!car) notFound()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.year} ${car.brand} ${car.model}`,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    fuelType: car.fuel,
    bodyType: car.bodyType,
    color: car.colour,
    vehicleTransmission: car.transmission,
    seatingCapacity: car.seats,
    itemCondition: car.condition === 'Brand new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
    image: car.images,
    url: `${site.url}/cars/${car.slug}`,
    offers: { '@type': 'Offer', price: car.price, priceCurrency: 'NGN', availability: car.availability === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', seller: { '@type': 'AutoDealer', name: site.name } },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <CarDetailContent car={car} />
  </>
}
