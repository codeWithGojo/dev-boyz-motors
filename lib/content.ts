/** Editorial and demo content shared across pages. Everything here is sample content. */

export const materials = [
  { id: 'leather', name: 'Semi-aniline leather', note: 'Hand-selected hides, stitched at 7 stitches per inch.', texture: 'tex-leather' },
  { id: 'wood', name: 'Open-pore walnut', note: 'Book-matched veneers, oiled rather than lacquered.', texture: 'tex-wood' },
  { id: 'carbon', name: 'Forged carbon', note: 'Lightweight weave with a deep, glossy finish.', texture: 'tex-carbon' },
  { id: 'metal', name: 'Brushed aluminium', note: 'Machined switchgear with a cool, knurled touch.', texture: 'tex-metal' },
  { id: 'suede', name: 'Dinamica suede', note: 'Soft-touch microfibre for wheel rims and headliners.', texture: 'tex-suede' },
] as const

export const interiorColours = [
  { name: 'Ebony', hex: '#1d1a18' },
  { name: 'Saddle Tan', hex: '#8a5630' },
  { name: 'Ivory', hex: '#e8dfcf' },
  { name: 'Oxblood', hex: '#5a1a22' },
  { name: 'Navy', hex: '#1b2740' },
] as const

export const packages = [
  { id: 'armour', name: 'Discreet armour (B4)', detail: 'Ballistic glass and door panels, invisible from outside.', price: 95_000_000 },
  { id: 'rear', name: 'Executive rear suite', detail: 'Reclining massage seats, folding tables, rear cooler.', price: 18_000_000 },
  { id: 'starlight', name: 'Starlight headliner', detail: '1,340 fibre-optic stars hand-woven into the roof lining.', price: 12_500_000 },
  { id: 'ceramic', name: 'Ceramic paint protection', detail: 'Nine-year coating applied in our detailing studio.', price: 2_800_000 },
  { id: 'warranty', name: 'Extended warranty (3 yrs)', detail: 'Parts, labour and roadside assistance across Nigeria.', price: 9_500_000 },
  { id: 'chauffeur', name: 'Chauffeur training', detail: 'Two-day defensive and executive driving course.', price: 1_200_000 },
] as const

export const techFeatures = [
  { x: 30, y: 46, title: 'Matrix LED lighting', body: 'Adaptive beams shape themselves around oncoming traffic, so you can keep full-beam on unlit roads without dazzling anyone.' },
  { x: 52, y: 30, title: 'Panoramic glass roof', body: 'Electrochromic glass turns from clear to opaque at a touch, keeping the cabin cool in the midday sun.' },
  { x: 66, y: 52, title: 'Adaptive air suspension', body: 'Reads the road ahead and softens over potholes and speed bumps before you feel them.' },
  { x: 80, y: 40, title: '360° camera & sensors', body: 'A bird’s-eye view of the car makes tight Lagos car parks and gated compounds effortless.' },
] as const

export const limitedEditions = [
  { carId: '29', name: 'Phantom “Lagos Lagoon”', detail: 'Bespoke two-tone in lagoon blue over silver, with an embroidered skyline on the rear headrests.', total: 3, remaining: 1 },
  { carId: '5', name: 'Urus “Harmattan”', detail: 'Matte desert-sand paint, bronze forged wheels and tan Alcantara throughout.', total: 5, remaining: 2 },
  { carId: '13', name: 'G 63 “Night Market”', detail: 'Magno black, red-stitched interior and a numbered plaque on the dash.', total: 7, remaining: 4 },
] as const

export const heritage = [
  { year: '2014', title: 'A single car, a single promise', body: 'It started with one imported sedan, sold with every document laid out on the bonnet. That habit — paperwork first — became the business.' },
  { year: '2018', title: 'The detailing studio', body: 'We opened our own studio so every car could be inspected, corrected and protected before a client ever sees it.' },
  { year: '2021', title: 'Sourcing worldwide', body: 'Partnerships in Dubai, Houston and Rotterdam meant we could find specific specifications, not just what happened to be on the lot.' },
  { year: '2026', title: 'The online showroom', body: 'This website: configure, compare and reserve from anywhere, then meet us in person with the paperwork ready.' },
] as const

export const accessories = [
  { id: 'cover', name: 'Tailored indoor car cover', category: 'Protection', price: 650_000, icon: 'Shield', colour: '#5b5149' },
  { id: 'keycase', name: 'Leather key fob case', category: 'Leather goods', price: 85_000, icon: 'KeyRound', colour: '#8a5630' },
  { id: 'weekender', name: 'Weekender bag', category: 'Leather goods', price: 1_150_000, icon: 'BriefcaseBusiness', colour: '#3b2a22' },
  { id: 'umbrella', name: 'Door-mounted umbrella', category: 'Lifestyle', price: 240_000, icon: 'Umbrella', colour: '#1b2740' },
  { id: 'dashcam', name: '4K front & rear dashcam', category: 'Technology', price: 380_000, icon: 'Camera', colour: '#26323a' },
  { id: 'charger', name: 'Home wallbox charger', category: 'Technology', price: 1_900_000, icon: 'PlugZap', colour: '#2f4a3e' },
  { id: 'detailing', name: 'Detailing kit', category: 'Care', price: 160_000, icon: 'Sparkles', colour: '#6b5a3c' },
  { id: 'cooler', name: 'Rear-seat champagne cooler', category: 'Lifestyle', price: 520_000, icon: 'Wine', colour: '#4a1622' },
] as const

export const locations = [
  { id: 'vi', city: 'Lagos', name: 'Victoria Island Showroom', address: 'Adeola Odeku Street, Victoria Island, Lagos', hours: 'Mon–Sat · 9:00–18:00', lat: 6.4310, lon: 3.4220 },
  { id: 'abj', city: 'Abuja', name: 'Maitama Private Suite', address: 'Aguiyi Ironsi Street, Maitama, Abuja', hours: 'By appointment', lat: 9.0820, lon: 7.4950 },
  { id: 'ph', city: 'Port Harcourt', name: 'GRA Viewing Lounge', address: 'Tombia Street, GRA Phase 2, Port Harcourt', hours: 'Tue–Sat · 10:00–17:00', lat: 4.8240, lon: 7.0060 },
] as const

export const events = [
  { id: 'twilight', date: '2026-12-12', title: 'Twilight on the Lagoon', place: 'Victoria Island, Lagos', detail: 'An evening preview of the Atelier Collection with live highlife and canapés by the water.', seats: 40 },
  { id: 'track', date: '2027-01-24', title: 'Performance Day', place: 'Private circuit, Epe', detail: 'Instructor-led laps in the Urus and AMG line-up, followed by lunch in the paddock.', seats: 24 },
  { id: 'abuja', date: '2027-02-14', title: 'Maitama Salon', place: 'Maitama, Abuja', detail: 'An intimate Valentine’s viewing of grand tourers, with a sommelier-led tasting.', seats: 30 },
] as const

export type Article = { slug: string; title: string; dek: string; category: string; minutes: number; carId: string; body: string[] }
export const articles: Article[] = [
  {
    slug: 'buying-foreign-used-with-confidence',
    title: 'Buying foreign-used with confidence',
    dek: 'The five documents to see before any money changes hands.',
    category: 'Guides', minutes: 4, carId: '6',
    body: [
      'A foreign-used car can be the smartest purchase in Nigeria — lower mileage, better specification and a fraction of the new price. It can also be the riskiest. The difference is paperwork.',
      'Start with the VIN. It should match on the windscreen, the door pillar and every document you are shown. Run it through a history report for accidents, flood damage and recorded mileage.',
      'Next, the customs papers: the duty receipt and the clearance certificate. Together with the bill of lading, they prove the car entered the country legally and what was paid.',
      'Ask for an independent inspection — paint-depth readings, an OBD scan and a look underneath on a lift. A good dealer will welcome it.',
      'Finally, insist on seeing the car in person before paying anything. Photographs are a starting point, never a substitute.',
    ],
  },
  {
    slug: 'the-quiet-art-of-the-phantom',
    title: 'The quiet art of the Phantom',
    dek: 'Why the world’s most serene car is built around silence.',
    category: 'Craftsmanship', minutes: 5, carId: '29',
    body: [
      'Close the door of a Phantom and the city disappears. More than 130 kilograms of sound insulation, double-glazed windows and tyres with foam inside their walls combine to make one of the quietest cabins on the road.',
      'That silence is a stage for craft. The Gallery — a glass panel running the width of the dashboard — can hold anything from a painting to a sculpture commissioned for the owner.',
      'Even the clock is considered: an analogue face, set flush into the fascia, because some things should not need updating.',
      'In Lagos traffic, that calm is not a luxury. It is the whole point.',
    ],
  },
  {
    slug: 'hybrids-and-evs-in-lagos',
    title: 'Hybrids and EVs in Lagos: are we ready?',
    dek: 'Charging, heat and fuel prices — what owners are actually finding.',
    category: 'Innovation', minutes: 6, carId: '28',
    body: [
      'With petrol prices where they are, the maths of a hybrid or electric car has changed quickly. Owners covering 15,000 km a year are saving millions of naira in fuel alone.',
      'Charging is the honest question. Most owners charge at home overnight from a wallbox and an inverter or solar setup, topping up rarely if ever in public.',
      'Heat matters too. Modern batteries are actively cooled, and we test battery health on every electrified car before it reaches the showroom.',
      'For many buyers the sweet spot today is a self-charging hybrid — no plugs, noticeably lower fuel bills, and nothing new to learn.',
    ],
  },
]
