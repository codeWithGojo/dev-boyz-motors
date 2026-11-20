import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cars,money } from '@/data/cars'
import { CarDetailContent } from '@/components/CarDetailContent'
type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return cars.map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const car=cars.find(c=>c.slug===slug);return {title:car?`${car.year} ${car.brand} ${car.model} · ${money(car.price)}`:'Vehicle not found',description:car?`Explore a ${car.year} ${car.brand} ${car.model}, its specifications, model reference photos and finance estimates. Request verified stock details before purchase.`:''}}
export default async function CarDetail({params}:Props){const {slug}=await params;const car=cars.find(c=>c.slug===slug);if(!car)notFound();return <CarDetailContent car={car}/>}
