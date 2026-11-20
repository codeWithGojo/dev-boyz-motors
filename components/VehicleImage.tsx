'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { Car } from '@/data/cars'

/** An unavailable image becomes a neutral placeholder, never a photo of a different model. */
export function VehicleImage({car,index=0,priority=false,className='',sizes='(max-width: 768px) 100vw, 33vw'}:{car:Car;index?:number;priority?:boolean;className?:string;sizes?:string}){
 const [broken,setBroken]=useState<string>('')
 const reference=car.images[index] || car.images[0] || ''
 const fallback='/vehicle-placeholder.svg'
 const src=reference && reference!==broken ? reference : fallback
 return <Image src={src} alt={src===fallback?`Reference image unavailable for ${car.brand} ${car.model}`:`${car.year} ${car.brand} ${car.model} model reference photo, angle ${index+1}`} fill sizes={sizes} priority={priority} unoptimized={src.startsWith('https://thumb.wikimedia.org/')} className={`object-cover ${className}`} onError={()=>setBroken(reference)}/>
}
