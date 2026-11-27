'use client'
import { useEffect, useId, useState } from 'react'
import { X, ArrowUpRight, Check } from 'lucide-react'
import { money, type Car } from '@/data/cars'
import { site } from '@/lib/site'
import { fieldErrors, type EnquiryField, type EnquiryKind } from '@/lib/enquiry-schema'
import { useDialog } from '@/lib/useDialog'

export type { EnquiryKind }
export const enquiryLabels: Record<EnquiryKind, string> = { viewing: 'Book a viewing', testdrive: 'Book a test drive', reserve: 'Reserve this car', sell: 'Sell or trade in', source: 'Source a car', service: 'Book a service', event: 'Request an invitation', general: 'General enquiry' }

type Props = { kind: EnquiryKind; car?: Car; onClose?: () => void; embedded?: boolean; initialDescription?: string; initialMessage?: string }

export function EnquiryForm({ kind, car, onClose, embedded = false, initialDescription = '', initialMessage = '' }: Props) {
  const id = useId()
  const dialog = useDialog<HTMLDivElement>(!embedded, onClose)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [handoffUrl, setHandoffUrl] = useState('')
  const [values, setValues] = useState({ name: '', phone: '', date: '', time: '', message: initialMessage, description: initialDescription, website: '' })
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({})
  const [serverErrors, setServerErrors] = useState<Partial<Record<EnquiryField, string>>>({})
  // Computed after mount so statically built pages never keep a stale build-time date.
  const [today, setToday] = useState<string>()
  useEffect(() => setToday(new Date().toLocaleDateString('en-CA')), [])

  const payload = { kind, carId: car?.id, ...values }
  const errors = { ...fieldErrors(payload), ...serverErrors }
  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues(v => ({ ...v, [field]: e.target.value }))
    setServerErrors(s => ({ ...s, [field]: undefined }))
  }
  const blur = (field: EnquiryField) => () => setTouched(t => ({ ...t, [field]: true }))
  const show = (field: EnquiryField) => touched[field] ? errors[field] : undefined
  const needsDescription = kind === 'sell' || kind === 'source' || kind === 'service'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, phone: true, date: true, time: true, message: true, description: true })
    if (Object.values(fieldErrors(payload)).some(Boolean)) { setError('Please fix the highlighted fields.'); return }
    setError(''); setSaving(true)
    try {
      const res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const isJson = res.headers.get('content-type')?.includes('application/json')
      const data = isJson ? await res.json().catch(() => null) : null
      if (!data) throw new Error('Our server didn’t respond properly. Please try again or message us on WhatsApp.')
      if (data.status === 'whatsapp' && data.url) { setHandoffUrl(data.url); return }
      if (data.fields) setServerErrors(data.fields)
      if (!res.ok || !data.ok) throw new Error(data.error || 'Your enquiry could not be sent. Please try WhatsApp instead.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send. Please use WhatsApp directly.')
    } finally { setSaving(false) }
  }

  const form = <div ref={dialog} className="relative my-auto w-full min-w-0 max-w-[650px] rounded-[30px] bg-card p-6 shadow-2xl shadow-black/15 md:p-9" role={embedded ? undefined : 'dialog'} aria-modal={embedded ? undefined : true} aria-labelledby={id}>
    {onClose && <button type="button" onClick={onClose} aria-label="Close enquiry form" className="circle-btn absolute right-4 top-4 z-10"><X size={19} /></button>}
    {handoffUrl ? <div className="py-8 text-center" role="status">
      <SuccessMark />
      <h2 id={id} className="mt-5 text-2xl font-bold">Almost done — send it on WhatsApp</h2>
      <p className="mt-3 text-sm leading-6 text-muted">Your details are ready. Open WhatsApp and press Send to deliver your enquiry.</p>
      <a className="pill-black mt-6 gap-2" href={handoffUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp <ArrowUpRight size={16} /></a>
      <button type="button" className="mt-4 block w-full text-sm underline" onClick={() => setHandoffUrl('')}>Edit details</button>
    </div> : sent ? <div className="py-9 text-center" role="status">
      <SuccessMark />
      <h2 id={id} className="mt-5 text-3xl font-bold tracking-tight">Enquiry sent.</h2>
      <p className="mt-3 leading-7 text-muted">Thanks, {values.name.split(' ')[0]}. Our team will reply on {values.phone} shortly.</p>
      {onClose && <button type="button" onClick={onClose} className="pill-black mt-6">Done</button>}
    </div> : <>
      <div className="eyebrow">PERSONAL ASSISTANCE</div>
      <h2 id={id} className="mt-2 pr-10 text-3xl font-bold tracking-tight md:text-4xl">{enquiryLabels[kind]}</h2>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{car ? `${car.year} ${car.brand} ${car.model} · ${money(car.price)}` : 'Tell us what you need and we’ll take it from there.'}</p>
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={show('name')} valid={touched.name && !errors.name}>
            <input data-autofocus name="name" autoComplete="name" maxLength={100} value={values.name} onChange={set('name')} onBlur={blur('name')} placeholder="Your full name" className={`field mt-2 ${show('name') ? 'field-error' : ''}`} aria-invalid={Boolean(show('name'))} />
          </Field>
          <Field label="Phone / WhatsApp" error={show('phone')} valid={touched.phone && !errors.phone}>
            <input name="phone" inputMode="tel" type="tel" autoComplete="tel" maxLength={22} value={values.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+234 8..." className={`field mt-2 ${show('phone') ? 'field-error' : ''}`} aria-invalid={Boolean(show('phone'))} />
          </Field>
        </div>
        {needsDescription && <Field label="Vehicle details" error={show('description')} valid={touched.description && !errors.description}>
          <input name="description" value={values.description} onChange={set('description')} onBlur={blur('description')} maxLength={250} className={`field mt-2 ${show('description') ? 'field-error' : ''}`} placeholder={kind === 'sell' ? 'Make, model, year, mileage, condition' : kind === 'service' ? 'Your car: make, model, year and plate number' : 'Desired make, model, year and budget'} aria-invalid={Boolean(show('description'))} />
        </Field>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred date" error={show('date')} valid={touched.date && !errors.date}>
            <input name="date" type="date" min={today} value={values.date} onChange={set('date')} onBlur={blur('date')} className={`field mt-2 ${show('date') ? 'field-error' : ''}`} aria-invalid={Boolean(show('date'))} />
          </Field>
          <Field label="Preferred time" error={show('time')} valid={touched.time && !errors.time}>
            <input name="time" type="time" value={values.time} onChange={set('time')} onBlur={blur('time')} className={`field mt-2 ${show('time') ? 'field-error' : ''}`} aria-invalid={Boolean(show('time'))} />
          </Field>
        </div>
        <Field label="Message" error={show('message')} valid={touched.message && !errors.message} hint={`${values.message.trim().length}/1500`}>
          <textarea name="message" rows={3} maxLength={1500} value={values.message} onChange={set('message')} onBlur={blur('message')} placeholder="Ask about availability, documentation, delivery or your preferences…" className={`field mt-2 resize-y ${show('message') ? 'field-error' : ''}`} aria-invalid={Boolean(show('message'))} />
        </Field>
        <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
        {error && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</div>}
        <button type="submit" disabled={saving} className="pill-black w-full gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50">{saving ? <><Spinner /> Sending…</> : <>Send enquiry <ArrowUpRight size={16} /></>}</button>
        <p className="text-xs leading-5 text-muted">Nothing is reserved or charged until our team confirms it. Prefer to call? {site.phone}.</p>
      </form>
    </>}
  </div>

  if (embedded) return form
  return <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/65 p-3 py-8 backdrop-blur-sm sm:items-center md:p-6" onMouseDown={e => { if (e.target === e.currentTarget) onClose?.() }}>{form}</div>
}

function Field({ label, error, valid, hint, children }: { label: string; error?: string; valid?: boolean; hint?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium">
    <span className="flex items-center justify-between gap-2"><span>{label} <span aria-hidden="true" className="text-bronze">*</span></span>{valid ? <Check size={15} className="animate-pop-in text-emerald-600" aria-label="Looks good" /> : hint && <span className="text-xs font-normal text-muted">{hint}</span>}</span>
    {children}
    {error && <span role="alert" className="mt-1.5 block animate-fade-up text-xs text-red-600 dark:text-red-400">{error}</span>}
  </label>
}

function Spinner() { return <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> }

function SuccessMark() {
  return <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16 animate-pop-in" aria-hidden="true">
    <circle cx="26" cy="26" r="24" style={{ fill: 'rgb(var(--accent))', fillOpacity: .15, stroke: 'rgb(var(--accent))' }} strokeWidth="2" />
    <path d="M15 27 l7 7 l15 -16" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40" className="animate-draw" style={{ stroke: 'rgb(var(--accent))', animationDelay: '.25s' }} />
  </svg>
}

export function EnquiryTrigger({ kind, car, children, className = 'pill-black' }: { kind: EnquiryKind; car?: Car; children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)
  return <><button type="button" onClick={() => setOpen(true)} className={className}>{children}</button>{open && <EnquiryForm kind={kind} car={car} onClose={() => setOpen(false)} />}</>
}
