import type { Car } from '@/data/cars'

export type QuizAnswers = {
  budget: number
  use: 'family' | 'city' | 'performance' | 'status' | 'offroad'
  seats: number
  style: 'any' | 'SUV' | 'Sedan' | 'Coupe'
  fuel: 'any' | 'Petrol' | 'Hybrid' | 'Electric'
}

export type Match = { car: Car; score: number; reasons: string[] }

/** Rule-based ranking used by the quiz, and as a fallback when the AI finder is unavailable. */
export function rankCars(cars: Car[], a: QuizAnswers, limit = 3): Match[] {
  return cars
    .filter(c => c.availability !== 'Sold')
    .map(car => {
      let score = 50
      const reasons: string[] = []
      if (car.price <= a.budget) { score += 20; reasons.push(`Within your ₦${Math.round(a.budget / 1e6)}M budget`) }
      else score -= Math.min(45, ((car.price - a.budget) / a.budget) * 60)
      if (car.seats >= a.seats) score += 8; else score -= 25
      if (a.style !== 'any') { if (car.bodyType === a.style || (a.style === 'SUV' && car.bodyType === 'Crossover')) { score += 12; reasons.push(`The ${car.bodyType.toLowerCase()} shape you wanted`) } else score -= 10 }
      if (a.fuel !== 'any') { if (car.fuel === a.fuel) { score += 10; reasons.push(`${car.fuel} as requested`) } else score -= 12 }
      if (a.use === 'family' && car.seats >= 5 && ['SUV', 'Crossover'].includes(car.bodyType)) { score += 12; reasons.push('Roomy and practical for family trips') }
      if (a.use === 'city' && car.hp < 350) { score += 10; reasons.push('Easy to live with in Lagos traffic') }
      if (a.use === 'performance') { score += Math.min(18, (car.hp - 250) / 20); if (car.zeroTo100 < 4.6) reasons.push(`Quick: 0–100 km/h in ${car.zeroTo100}s`) }
      if (a.use === 'status' && ['Rolls-Royce', 'Lamborghini', 'Range Rover', 'Mercedes-AMG'].includes(car.brand)) { score += 15; reasons.push('Serious road presence') }
      if (a.use === 'offroad' && (/Land Cruiser|GX|LX|G 63|Range Rover/.test(`${car.model} ${car.brand}`))) { score += 20; reasons.push('Built for rough roads and long trips') }
      if (car.condition === 'Brand new') reasons.push('Brand new, zero kilometres')
      return { car, score: Math.max(1, Math.min(99, Math.round(score))), reasons: reasons.slice(0, 3) }
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
}
