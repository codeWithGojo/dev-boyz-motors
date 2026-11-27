import { z } from 'zod'

/** Shared by the enquiry form (inline validation) and /api/enquiries (server validation). */
export const enquiryKinds = ['viewing', 'testdrive', 'reserve', 'sell', 'source', 'service', 'event', 'general'] as const
export type EnquiryKind = (typeof enquiryKinds)[number]

/** Yesterday in UTC, as YYYY-MM-DD; allows for visitors in any time zone. */
export function earliestDate(now = new Date()) {
  const d = new Date(now)
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

const trimmed = (max: number) => z.string().trim().max(max)

export const enquirySchema = z.object({
  kind: z.enum(enquiryKinds),
  carId: trimmed(40).optional(),
  name: trimmed(100).min(2, 'Please enter your full name.'),
  phone: trimmed(22).refine(v => { const n = v.replace(/\D/g, '').length; return n >= 10 && n <= 15 }, 'Enter a phone number with 10–15 digits, e.g. +234 803 000 0000.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a preferred date.').refine(v => !Number.isNaN(Date.parse(`${v}T00:00:00Z`)), 'Choose a valid date.').refine(v => v >= earliestDate(), 'Choose today or a later date.'),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Choose a preferred time.'),
  message: trimmed(1500).min(10, 'Tell us a little more (at least 10 characters).'),
  description: trimmed(250).optional().default(''),
  website: z.string().optional(),
}).superRefine((value, ctx) => {
  if ((value.kind === 'sell' || value.kind === 'source' || value.kind === 'service') && value.description.length < 5) {
    ctx.addIssue({ code: 'custom', path: ['description'], message: 'Describe the vehicle (make, model, year…).' })
  }
})

export type EnquiryInput = z.input<typeof enquirySchema>
export type EnquiryField = 'name' | 'phone' | 'date' | 'time' | 'message' | 'description'

/** Field → first error message, for inline form errors. */
export function fieldErrors(input: unknown): Partial<Record<EnquiryField, string>> {
  const result = enquirySchema.safeParse(input)
  if (result.success) return {}
  const out: Partial<Record<EnquiryField, string>> = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as EnquiryField
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
