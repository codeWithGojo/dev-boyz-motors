import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return <section className="section-wrap grid min-h-[70vh] place-items-center py-16 text-center">
    <div>
      <svg viewBox="0 0 320 120" className="mx-auto w-full max-w-sm text-ink" aria-hidden="true">
        <path d="M10 100 H310" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" strokeDasharray="10 12" />
        <g className="animate-fade-up">
          <path d="M70 84 q8-28 40-30 l26-18 h54 l30 20 q34 2 40 28 v6 h-190z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="104" cy="92" r="12" fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="4" />
          <circle cx="222" cy="92" r="12" fill="none" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="4" />
        </g>
        <path d="M262 70 h40 M272 60 h30 M268 80 h26" style={{ stroke: 'rgb(var(--accent))' }} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      </svg>
      <div className="eyebrow mt-6">Error 404</div>
      <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-6xl">This car has left the showroom.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The page you wanted doesn&apos;t exist or has moved. Plenty of others are still parked inside.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/showroom" className="pill-black gap-2">Back to the showroom <ArrowRight size={16} /></Link>
        <Link href="/find-my-car" className="pill-outline gap-2"><Search size={16} /> Help me find a car</Link>
      </div>
    </div>
  </section>
}
