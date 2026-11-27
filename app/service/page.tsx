import { CalendarCheck, Car, Sparkles, Wrench } from 'lucide-react'
import { PageIntro } from '@/components/PageIntro'
import { EnquiryForm } from '@/components/EnquiryForm'

export const metadata = { title: 'Book a service', description: 'Collection, service and detailing for your car, booked in under a minute.' }

const steps = [
  [Car, 'We collect', 'From your home or office, anywhere in Lagos, Abuja or Port Harcourt.'],
  [Wrench, 'We service', 'Manufacturer schedules, genuine parts, and a video report of the work.'],
  [Sparkles, 'We return it detailed', 'Washed, vacuumed and protected, with the paperwork updated.'],
] as const

export default function ServicePage() {
  return <>
    <PageIntro eyebrow="Service & care" title="Looked after, properly." lead="Book collection, servicing or detailing. We confirm the time with you directly." />
    <section className="section-wrap grid items-start gap-10 py-14 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
      <ol className="space-y-6">
        {steps.map(([Icon, title, body], i) => <li key={title} className="flex gap-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-night text-bronze"><Icon size={20} /></span>
          <span><span className="font-display text-sm text-bronze">0{i + 1}</span><strong className="block font-display text-2xl font-medium">{title}</strong><span className="mt-1 block leading-7 text-muted">{body}</span></span>
        </li>)}
        <li className="flex items-center gap-3 rounded-2xl bg-card p-5 text-sm text-muted ring-1 ring-line/10"><CalendarCheck size={18} className="text-bronze" /> Typical turnaround: 24–48 hours.</li>
      </ol>
      <EnquiryForm kind="service" embedded />
    </section>
  </>
}
