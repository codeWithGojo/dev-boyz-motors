'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { Car } from '@/data/cars'

/** An unavailable image becomes a neutral placeholder, never a photo of a different model. */
export function VehicleImage({ car, index = 0, priority = false, className = '', sizes = '(max-width: 768px) 100vw, 33vw', draggable }: { car: Car; index?: number; priority?: boolean; className?: string; sizes?: string; draggable?: boolean }) {
  const [broken, setBroken] = useState('')
  const [loaded, setLoaded] = useState(false)
  const reference = car.images[index] || car.images[0] || ''
  const fallback = '/vehicle-placeholder.svg'
  const src = reference && reference !== broken ? reference : fallback
  return <>
    {!loaded && <span className="skeleton absolute inset-0 rounded-none" aria-hidden="true" />}
    <Image
      src={src}
      alt={src === fallback ? `Image unavailable for ${car.brand} ${car.model}` : `${car.year} ${car.brand} ${car.model}, photo ${index + 1}`}
      fill sizes={sizes} priority={priority} draggable={draggable}
      unoptimized={src.startsWith('https://thumb.wikimedia.org/')}
      className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setLoaded(true)}
      onError={() => { setBroken(reference); setLoaded(true) }}
    />
  </>
}
