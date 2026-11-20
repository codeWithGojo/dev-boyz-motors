import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { EnquiryForm } from '@/components/EnquiryForm'
import { site, whatsappUrl } from '@/lib/site'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return <section className="section-wrap py-12 md:py-20">
    <div className="eyebrow">PRIVATE SALES ASSISTANCE</div>
    <h1 className="mt-3 max-w-4xl break-words text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl md:text-7xl">Let's find the right car for you.</h1>
    <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">Enquire about an available model, ask for actual stock photographs or arrange a private viewing. We confirm availability and the meeting location directly with you.</p>
    <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-start">
      <div className="min-w-0 space-y-4">
        <a href={whatsappUrl('Hello DEV BOYZ MOTORS. I would like to enquire about a vehicle.')} rel="noopener noreferrer" target="_blank" className="flex min-w-0 items-center gap-4 rounded-3xl bg-[#171717] p-5 text-white transition hover:bg-black sm:p-6"><MessageCircle size={24} className="shrink-0"/><span><strong className="block">Chat on WhatsApp</strong><span className="mt-1 block text-sm text-white/70">{site.phone}</span></span></a>
        <a href={`tel:${site.phone.replace(/[^+\d]/g,'')}`} className="flex items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-black/5 sm:p-6"><Phone className="shrink-0" size={22}/><span><strong className="block">Call us</strong><span className="mt-1 block text-sm text-neutral-500">{site.phone}</span></span></a>
        <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-black/5 sm:p-6"><Mail className="shrink-0" size={22}/><span className="min-w-0"><strong className="block">Email</strong><span className="mt-1 block break-all text-sm text-neutral-500">{site.email}</span></span></a>
        <div className="flex items-start gap-4 rounded-3xl bg-card p-5 ring-1 ring-black/5 sm:p-6"><Clock3 className="shrink-0" size={22}/><span><strong className="block">Opening hours</strong><span className="mt-1 block text-sm text-neutral-500">{site.hours}</span></span></div>
        <div className="flex items-start gap-4 rounded-3xl bg-card p-5 ring-1 ring-black/5 sm:p-6"><MapPin className="shrink-0" size={22}/><span><strong className="block">Showroom</strong><span className="mt-1 block text-sm leading-6 text-neutral-500">{site.address || 'Private viewing location shared when your appointment is confirmed.'}</span></span></div>
      </div>
      <EnquiryForm kind="general" embedded/>
    </div>
  </section>
}
