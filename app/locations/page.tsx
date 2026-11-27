'use client'
import { useState } from 'react'
import { Clock, MapPin, Navigation } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { EnquiryTrigger } from '@/components/EnquiryForm'
import { locations } from '@/lib/content'

export default function LocationsPage() {
  const [active, setActive] = useState<string>(locations[0].id)
  const place = locations.find(l => l.id === active)!
  const d = 0.012
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${place.lon - d * 1.6},${place.lat - d},${place.lon + d * 1.6},${place.lat + d}&layer=mapnik&marker=${place.lat},${place.lon}`

  return <>
    <PageIntro eyebrow="Showrooms" title="Find us." lead="Three private spaces across Nigeria. Visits are by appointment, so the car you want is ready, detailed and waiting." />
    <section className="section-wrap grid gap-8 py-14 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
      <ul className="space-y-3">
        {locations.map(l => <li key={l.id}>
          <button type="button" onClick={() => setActive(l.id)} aria-pressed={active === l.id} className={`w-full rounded-3xl p-6 text-left ring-1 transition ${active === l.id ? 'bg-night text-white ring-night' : 'bg-card ring-line/10 hover:ring-line/30'}`}>
            <span className={`eyebrow ${active === l.id ? '' : ''}`}>{l.city}</span>
            <span className="mt-2 block font-display text-2xl">{l.name}</span>
            <span className={`mt-3 flex items-start gap-2 text-sm ${active === l.id ? 'text-white/70' : 'text-muted'}`}><MapPin size={15} className="mt-0.5 shrink-0" />{l.address}</span>
            <span className={`mt-1 flex items-center gap-2 text-sm ${active === l.id ? 'text-white/70' : 'text-muted'}`}><Clock size={15} />{l.hours}</span>
          </button>
        </li>)}
        <li className="pt-2 text-xs text-muted">Demo locations for illustration.</li>
      </ul>
      <div className="overflow-hidden rounded-[28px] ring-1 ring-line/10">
        <iframe key={place.id} title={`Map of ${place.name}`} src={map} className="h-[420px] w-full border-0 grayscale-[.35] md:h-[520px]" loading="lazy" />
        <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-5">
          <span className="font-display text-xl">{place.name}</span>
          <div className="flex flex-wrap gap-2">
            <a href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=16/${place.lat}/${place.lon}`} target="_blank" rel="noopener noreferrer" className="pill-outline gap-2 py-2.5"><Navigation size={15} /> Directions</a>
            <EnquiryTrigger kind="viewing" className="pill-black py-2.5">Book a visit</EnquiryTrigger>
          </div>
        </div>
      </div>
    </section>
  </>
}
