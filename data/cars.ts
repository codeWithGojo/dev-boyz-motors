import { referencePhotos } from './reference-photos'

export type Condition = 'Brand new' | 'Foreign used' | 'Nigerian used'
export type Availability = 'Available' | 'Reserved' | 'Sold'

export type Car = {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  condition: Condition
  price: number
  mileage: number
  transmission: string
  engine: string
  fuel: 'Petrol' | 'Hybrid' | 'Electric'
  bodyType: string
  colour: string
  availability: Availability
  featured?: boolean
  newArrival?: boolean
  /** Approximate manufacturer figures, for the demo's performance section. */
  hp: number
  zeroTo100: number
  topSpeed: number
  seats: number
  images: string[]
  photoSources: string[]
}

type Seed = Omit<Car, 'photoSources' | 'images' | 'availability' | 'transmission'> & { availability?: Availability }

const seedCars: Seed[] = [
  { id: '1', slug: 'mercedes-amg-gle-63-s-coupe-2024', brand: 'Mercedes-AMG', model: 'GLE 63 S Coupe', year: 2024, condition: 'Brand new', price: 395000000, mileage: 0, engine: '4.0L V8 Biturbo', fuel: 'Petrol', bodyType: 'SUV', colour: 'Selenite Grey', featured: true, newArrival: true, hp: 603, zeroTo100: 3.8, topSpeed: 280, seats: 5 },
  { id: '2', slug: 'mercedes-amg-glc-43-coupe-2024', brand: 'Mercedes-AMG', model: 'GLC 43 Coupe', year: 2024, condition: 'Brand new', price: 195000000, mileage: 0, engine: '2.0L Turbo Hybrid', fuel: 'Petrol', bodyType: 'Coupe', colour: 'White', featured: true, newArrival: true, hp: 416, zeroTo100: 4.8, topSpeed: 250, seats: 5 },
  { id: '3', slug: 'mercedes-amg-glc-63-s-coupe-2019', brand: 'Mercedes-AMG', model: 'GLC 63 S Coupe', year: 2019, condition: 'Foreign used', price: 135000000, mileage: 31200, engine: '4.0L V8 Biturbo', fuel: 'Petrol', bodyType: 'Coupe', colour: 'Graphite Grey', hp: 503, zeroTo100: 3.8, topSpeed: 280, seats: 5 },
  { id: '4', slug: 'mercedes-amg-gt-53-4-door-2020', brand: 'Mercedes-AMG', model: 'GT 53 4-Door', year: 2020, condition: 'Foreign used', price: 165000000, mileage: 27400, engine: '3.0L I6 Turbo', fuel: 'Petrol', bodyType: 'Coupe', colour: 'Obsidian Black', availability: 'Reserved', hp: 429, zeroTo100: 4.5, topSpeed: 285, seats: 4 },
  { id: '5', slug: 'lamborghini-urus-2022', brand: 'Lamborghini', model: 'Urus', year: 2022, condition: 'Foreign used', price: 620000000, mileage: 12700, engine: '4.0L V8 Biturbo', fuel: 'Petrol', bodyType: 'SUV', colour: 'Viola', featured: true, hp: 641, zeroTo100: 3.6, topSpeed: 305, seats: 5 },
  { id: '6', slug: 'range-rover-autobiography-2023', brand: 'Range Rover', model: 'Autobiography', year: 2023, condition: 'Foreign used', price: 480000000, mileage: 16900, engine: '4.4L V8', fuel: 'Petrol', bodyType: 'SUV', colour: 'Santorini Black', featured: true, hp: 523, zeroTo100: 4.6, topSpeed: 250, seats: 5 },
  { id: '7', slug: 'lexus-is-500-f-sport-performance-2023', brand: 'Lexus', model: 'IS 500 F Sport Performance', year: 2023, condition: 'Brand new', price: 150000000, mileage: 0, engine: '5.0L V8', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Molten Pearl', featured: true, hp: 472, zeroTo100: 4.6, topSpeed: 270, seats: 5 },
  { id: '8', slug: 'lexus-is-350-f-sport-2022-18200', brand: 'Lexus', model: 'IS 350 F Sport', year: 2022, condition: 'Foreign used', price: 92000000, mileage: 18200, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Caviar Black', hp: 311, zeroTo100: 5.6, topSpeed: 230, seats: 5 },
  { id: '9', slug: 'lexus-is-350-f-sport-2022-15600', brand: 'Lexus', model: 'IS 350 F Sport', year: 2022, condition: 'Foreign used', price: 95000000, mileage: 15600, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Cloudburst Grey', availability: 'Sold', hp: 311, zeroTo100: 5.6, topSpeed: 230, seats: 5 },
  { id: '10', slug: 'lexus-rx-350-2017', brand: 'Lexus', model: 'RX 350', year: 2017, condition: 'Foreign used', price: 58000000, mileage: 56100, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'SUV', colour: 'Black', hp: 295, zeroTo100: 7.7, topSpeed: 200, seats: 5 },
  { id: '11', slug: 'toyota-venza-v6-2011', brand: 'Toyota', model: 'Venza V6', year: 2011, condition: 'Nigerian used', price: 15500000, mileage: 101000, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'Crossover', colour: 'Black', hp: 268, zeroTo100: 7.0, topSpeed: 200, seats: 5 },
  { id: '12', slug: 'mercedes-amg-c-63-s-2021', brand: 'Mercedes-AMG', model: 'C 63 S', year: 2021, condition: 'Foreign used', price: 155000000, mileage: 22100, engine: '4.0L V8 Biturbo', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Black', hp: 503, zeroTo100: 3.9, topSpeed: 290, seats: 5 },
  { id: '13', slug: 'mercedes-amg-g-63-2022', brand: 'Mercedes-AMG', model: 'G 63 AMG', year: 2022, condition: 'Foreign used', price: 520000000, mileage: 8800, engine: '4.0L V8 Biturbo', fuel: 'Petrol', bodyType: 'SUV', colour: 'White', newArrival: true, hp: 577, zeroTo100: 4.5, topSpeed: 220, seats: 5 },
  { id: '14', slug: 'mercedes-amg-a45-s-2021', brand: 'Mercedes-AMG', model: 'A 45 S', year: 2021, condition: 'Foreign used', price: 120000000, mileage: 19800, engine: '2.0L Turbo', fuel: 'Petrol', bodyType: 'Hatchback', colour: 'Yellow', hp: 416, zeroTo100: 3.9, topSpeed: 270, seats: 5 },
  { id: '15', slug: 'mercedes-amg-cle-53-2024', brand: 'Mercedes-AMG', model: 'CLE 53 Coupe', year: 2024, condition: 'Brand new', price: 260000000, mileage: 0, engine: '3.0L I6 Turbo', fuel: 'Petrol', bodyType: 'Coupe', colour: 'Graphite Grey', newArrival: true, hp: 443, zeroTo100: 4.2, topSpeed: 250, seats: 4 },
  { id: '16', slug: 'mercedes-amg-cla-45-2022', brand: 'Mercedes-AMG', model: 'CLA 45 S', year: 2022, condition: 'Foreign used', price: 130000000, mileage: 17800, engine: '2.0L Turbo', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Red', hp: 416, zeroTo100: 4.0, topSpeed: 270, seats: 5 },
  { id: '17', slug: 'mercedes-benz-gla-250-e-2021', brand: 'Mercedes-Benz', model: 'GLA 250 e', year: 2021, condition: 'Foreign used', price: 88000000, mileage: 31000, engine: '1.3L Plug-in Hybrid', fuel: 'Hybrid', bodyType: 'SUV', colour: 'Silver', hp: 218, zeroTo100: 7.1, topSpeed: 220, seats: 5 },
  { id: '18', slug: 'mercedes-benz-c300-coupe-2020', brand: 'Mercedes-Benz', model: 'C 300 Coupé', year: 2020, condition: 'Foreign used', price: 78000000, mileage: 40800, engine: '2.0L Turbo', fuel: 'Petrol', bodyType: 'Coupe', colour: 'Black', hp: 255, zeroTo100: 5.9, topSpeed: 250, seats: 4 },
  { id: '19', slug: 'mercedes-benz-e350-2021', brand: 'Mercedes-Benz', model: 'E 350', year: 2021, condition: 'Foreign used', price: 105000000, mileage: 26500, engine: '2.0L Turbo', fuel: 'Petrol', bodyType: 'Sedan', colour: 'White', hp: 255, zeroTo100: 6.2, topSpeed: 250, seats: 5 },
  { id: '20', slug: 'lexus-gx-460-2020', brand: 'Lexus', model: 'GX 460', year: 2020, condition: 'Foreign used', price: 130000000, mileage: 39000, engine: '4.6L V8', fuel: 'Petrol', bodyType: 'SUV', colour: 'Pearl White', hp: 301, zeroTo100: 8.3, topSpeed: 180, seats: 7 },
  { id: '21', slug: 'lexus-lx-570-2019', brand: 'Lexus', model: 'LX 570', year: 2019, condition: 'Foreign used', price: 235000000, mileage: 47200, engine: '5.7L V8', fuel: 'Petrol', bodyType: 'SUV', colour: 'Black', hp: 383, zeroTo100: 7.7, topSpeed: 220, seats: 8 },
  { id: '22', slug: 'lexus-es-350-2021', brand: 'Lexus', model: 'ES 350', year: 2021, condition: 'Foreign used', price: 75000000, mileage: 28200, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Silver', hp: 302, zeroTo100: 6.6, topSpeed: 210, seats: 5 },
  { id: '23', slug: 'lexus-nx-350-2022', brand: 'Lexus', model: 'NX 350', year: 2022, condition: 'Foreign used', price: 110000000, mileage: 21400, engine: '2.4L Turbo', fuel: 'Petrol', bodyType: 'SUV', colour: 'White', hp: 275, zeroTo100: 6.6, topSpeed: 200, seats: 5 },
  { id: '24', slug: 'lexus-rc-350-2020', brand: 'Lexus', model: 'RC 350', year: 2020, condition: 'Foreign used', price: 85000000, mileage: 33500, engine: '3.5L V6', fuel: 'Petrol', bodyType: 'Coupe', colour: 'Blue', hp: 311, zeroTo100: 5.8, topSpeed: 230, seats: 4 },
  { id: '25', slug: 'lexus-ls-500-2020', brand: 'Lexus', model: 'LS 500', year: 2020, condition: 'Foreign used', price: 125000000, mileage: 29000, engine: '3.5L Twin Turbo V6', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Black', hp: 416, zeroTo100: 4.8, topSpeed: 250, seats: 5 },
  { id: '26', slug: 'lexus-ux-250h-2022', brand: 'Lexus', model: 'UX 250h', year: 2022, condition: 'Foreign used', price: 78000000, mileage: 17600, engine: '2.0L Hybrid', fuel: 'Hybrid', bodyType: 'Crossover', colour: 'Grey', hp: 181, zeroTo100: 8.5, topSpeed: 177, seats: 5 },
  { id: '27', slug: 'toyota-land-cruiser-prado-2021', brand: 'Toyota', model: 'Land Cruiser Prado', year: 2021, condition: 'Foreign used', price: 165000000, mileage: 34400, engine: '4.0L V6', fuel: 'Petrol', bodyType: 'SUV', colour: 'White', hp: 282, zeroTo100: 9.0, topSpeed: 175, seats: 7 },
  { id: '29', slug: 'rolls-royce-phantom-series-ii-2024', brand: 'Rolls-Royce', model: 'Phantom Series II', year: 2024, condition: 'Brand new', price: 1950000000, mileage: 0, engine: '6.75L V12 Twin-Turbo', fuel: 'Petrol', bodyType: 'Sedan', colour: 'Midnight Sapphire', featured: true, newArrival: true, hp: 563, zeroTo100: 5.4, topSpeed: 250, seats: 5 },
  { id: '28', slug: 'tesla-model-y-long-range-2022', brand: 'Tesla', model: 'Model Y Long Range', year: 2022, condition: 'Foreign used', price: 105000000, mileage: 22800, engine: 'Dual Motor Electric', fuel: 'Electric', bodyType: 'SUV', colour: 'Pearl White', hp: 384, zeroTo100: 5.0, topSpeed: 217, seats: 5 },
]

// Wikimedia only serves standard thumbnail widths; 960px works where 1024px returns HTTP 400.
const workingThumbnail = (url: string) => url
  .replace('https://upload.wikimedia.org/wikipedia/commons/thumb/', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/')
  .replace('/1024px-', '/960px-')

export const cars: Car[] = seedCars.map(car => {
  const gallery = referencePhotos[car.id] || []
  return {
    ...car,
    transmission: 'Automatic',
    availability: car.availability ?? 'Available',
    images: gallery.map(photo => workingThumbnail(photo.url)),
    photoSources: gallery.map(photo => photo.source),
  }
})

export const brands = [...new Set(cars.map(c => c.brand))].sort()
export const bodyTypes = [...new Set(cars.map(c => c.bodyType))].sort()
export const conditions: Condition[] = ['Brand new', 'Foreign used', 'Nigerian used']
export const fuels = ['Petrol', 'Hybrid', 'Electric'] as const

export const money = (n: number) => `₦${Math.round(n).toLocaleString('en-NG')}`
export const compactMoney = (n: number) => n >= 1e9 ? `₦${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `₦${Math.round(n / 1e6)}M` : money(n)
export const km = (n: number) => `${n.toLocaleString('en-NG')} km`

/** Similarity score used by "Similar cars" and the quiz fallback. */
export function similarCars(car: Car, list: Car[] = cars, count = 3) {
  return list
    .filter(c => c.id !== car.id)
    .map(c => ({ c, score: (c.brand === car.brand ? 2 : 0) + (c.bodyType === car.bodyType ? 3 : 0) - Math.abs(c.price - car.price) / 50_000_000 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.c)
}
