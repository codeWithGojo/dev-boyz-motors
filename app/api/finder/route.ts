import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'
import { cars } from '@/data/cars'
import { rankCars, type QuizAnswers } from '@/lib/matcher'

export const runtime = 'nodejs'

const requestSchema = z.object({
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(1200) })).min(1).max(12),
})

const answerSchema = z.object({
  reply: z.string().describe('A short, friendly answer in 1-3 sentences. Plain text, no markdown.'),
  picks: z.array(z.object({
    id: z.string().describe('The car id from the inventory list'),
    reason: z.string().describe('One sentence on why this car fits the request'),
  })).max(3),
})

const inventory = cars.filter(c => c.availability !== 'Sold').map(c =>
  `id=${c.id} | ${c.year} ${c.brand} ${c.model} | ₦${(c.price / 1e6).toFixed(1)}M | ${c.condition} | ${c.bodyType} | ${c.fuel} | ${c.engine}, ${c.hp}hp, 0-100 ${c.zeroTo100}s | ${c.seats} seats | ${c.mileage.toLocaleString('en-NG')} km | ${c.colour}`).join('\n')

const system = `You are the car-finder assistant for DEV BOYZ MOTORS, a luxury car dealership in Nigeria (this website is a demo with sample inventory).
Recommend up to 3 cars ONLY from the inventory below, using their exact ids. Prices are in Nigerian naira (₦); "M" means million.
Respect the buyer's budget, seats, body style and fuel preferences. If nothing fits exactly, say so and suggest the closest options.
If the question is not about choosing a car, answer briefly and steer back to helping them choose; return no picks.
Never invent cars, prices, finance offers or availability that is not in the list.

INVENTORY:
${inventory}`

let client: Anthropic | null = null
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) return null
  client ??= new Anthropic()
  return client
}

/** Keyword-based fallback so the feature still works without an API key. */
function localAnswer(text: string) {
  const t = text.toLowerCase()
  const money = t.match(/(\d+(?:\.\d+)?)\s*(m|mil|million|b|bn|billion)\b/)
  const budget = money ? Number(money[1]) * (money[2].startsWith('b') ? 1e9 : 1e6) : 250e6
  const seats = Number(t.match(/(\d)\s*(?:seat|seater|people)/)?.[1] ?? (/(family|kids|children)/.test(t) ? 5 : 2))
  const answers: QuizAnswers = {
    budget,
    seats,
    use: /off.?road|village|rough|bad road|trip/.test(t) ? 'offroad' : /fast|speed|sport|quick|fun/.test(t) ? 'performance' : /family|kids|school/.test(t) ? 'family' : /status|boss|impress|wedding/.test(t) ? 'status' : 'city',
    style: /suv|jeep/.test(t) ? 'SUV' : /sedan|saloon/.test(t) ? 'Sedan' : /coupe|two.?door/.test(t) ? 'Coupe' : 'any',
    fuel: /electric|ev\b|tesla/.test(t) ? 'Electric' : /hybrid/.test(t) ? 'Hybrid' : 'any',
  }
  const matches = rankCars(cars, answers)
  return {
    reply: `Here are my top matches for around ₦${Math.round(budget / 1e6)}M. (Offline mode: add an ANTHROPIC_API_KEY to enable the full AI assistant.)`,
    picks: matches.map(m => ({ id: m.car.id, reason: m.reasons[0] ?? `${m.score}% match for your needs` })),
    mode: 'local' as const,
  }
}

export async function POST(request: Request) {
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Please type a question (up to 1,200 characters).' }, { status: 400 })
  const { messages } = parsed.data
  if (messages[0].role !== 'user') return NextResponse.json({ error: 'Conversation must start with a question.' }, { status: 400 })
  const latest = [...messages].reverse().find(m => m.role === 'user')!.content

  const anthropic = getClient()
  if (!anthropic) return NextResponse.json(localAnswer(latest))

  try {
    const response = await anthropic.beta.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 2000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system,
      messages,
      output_config: { effort: 'low', format: betaZodOutputFormat(answerSchema) },
    })
    if (response.stop_reason === 'refusal' || !response.parsed_output) return NextResponse.json(localAnswer(latest))
    const known = new Set(cars.map(c => c.id))
    const picks = response.parsed_output.picks.filter(p => known.has(p.id))
    return NextResponse.json({ reply: response.parsed_output.reply, picks, mode: 'ai' })
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return NextResponse.json({ ...localAnswer(latest), reply: 'The assistant is busy right now, so here are quick matches instead.' })
    if (error instanceof Anthropic.APIError) console.error('Finder API error', error.status, error.message)
    else console.error('Finder error', error)
    return NextResponse.json(localAnswer(latest))
  }
}
