import { NextResponse } from 'next/server'
import { cars } from '@/data/cars'
import { site, whatsappUrl } from '@/lib/site'
import { enquirySchema } from '@/lib/enquiry-schema'

export const runtime = 'nodejs'

const attempts = new Map<string, { count: number; since: number }>()
const WINDOW = 5 * 60 * 1000
const LIMIT = 5
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, x => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x] || x))

function rateLimited(ip: string) {
  const now = Date.now()
  for (const [key, record] of attempts) if (now - record.since > WINDOW) attempts.delete(key)
  const record = attempts.get(ip)
  if (record && record.count >= LIMIT) return true
  attempts.set(ip, record ? { ...record, count: record.count + 1 } : { count: 1, since: now })
  return false
}

export async function POST(request: Request) {
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 }) }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  if ((body as { website?: unknown }).website) return NextResponse.json({ ok: true, status: 'sent' }) // honeypot

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0] ?? 'form'), issue.message]))
    return NextResponse.json({ error: 'Please fix the highlighted fields.', fields }, { status: 400 })
  }
  const { kind, carId, name, phone, date, time, message, description } = parsed.data

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return NextResponse.json({ error: 'Too many enquiries. Please try again shortly or contact us on WhatsApp.' }, { status: 429 })

  const car = cars.find(c => c.id === carId)
  const carText = car ? `${car.year} ${car.brand} ${car.model} — ₦${car.price.toLocaleString('en-NG')} (${site.url}/cars/${car.slug})` : 'Not specified'
  const heading = { viewing: 'Viewing request', testdrive: 'Test drive request', reserve: 'Reservation enquiry', sell: 'Sell / trade-in', source: 'Source a vehicle', service: 'Service booking', event: 'Event invitation request', general: 'General enquiry' }[kind]
  const details = `${heading}\nName: ${name}\nPhone: ${phone}\nVehicle: ${carText}\nVehicle details: ${description || 'N/A'}\nPreferred date: ${date}\nPreferred time: ${time}\nMessage: ${message}`
  const whatsapp = whatsappUrl(`Hello DEV BOYZ MOTORS.\n${details}`)

  const apiKey = process.env.RESEND_API_KEY, from = process.env.RESEND_FROM_EMAIL, to = process.env.ENQUIRY_TO_EMAIL
  if (!apiKey || !from || !to) return NextResponse.json({ status: 'whatsapp', url: whatsapp })

  try {
    const lines = details.split('\n').map(line => `<p style="margin:0 0 8px">${escapeHtml(line)}</p>`).join('')
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject: `DEV BOYZ MOTORS: ${heading}`, html: `<div style="font-family:Arial,sans-serif;color:#111;max-width:650px">${lines}</div>` }),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Resend provider unavailable')
    return NextResponse.json({ ok: true, status: 'sent' })
  } catch {
    return NextResponse.json({ status: 'whatsapp', url: whatsapp, warning: 'Email delivery unavailable. Complete your enquiry on WhatsApp.' })
  }
}
