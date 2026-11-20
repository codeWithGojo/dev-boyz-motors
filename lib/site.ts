/** All public dealership information is intentionally centralised here. */
export const site = {
  name: 'DEV BOYZ MOTORS',
  url: 'https://dev-boyz-motors.vercel.app',
  // Published Dev Boyz business number. Replace with a dedicated Motors number if different.
  whatsapp: (process.env.NEXT_PUBLIC_DEALERSHIP_WHATSAPP || '2347062723107').replace(/\D/g, ''),
  phone: process.env.NEXT_PUBLIC_DEALERSHIP_PHONE || '+234 706 272 3107',
  email: process.env.NEXT_PUBLIC_DEALERSHIP_EMAIL || 'imegufavour30@gmail.com',
  address: process.env.NEXT_PUBLIC_SHOWROOM_ADDRESS || '',
  hours: process.env.NEXT_PUBLIC_SHOWROOM_HOURS || 'Viewings by appointment',
  deliveredThisMonth: process.env.NEXT_PUBLIC_DELIVERIES_THIS_MONTH || '',
}
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}
export function vehicleMessage(car: { brand: string; model: string; year: number; price: number; slug: string }, money: (n:number)=>string) {
  return `Hello DEV BOYZ MOTORS. I'm interested in the ${car.year} ${car.brand} ${car.model} listed at ${money(car.price)}. Is this vehicle available? Can you share real stock photos, VIN/inspection details and viewing options? ${site.url}/cars/${car.slug}`
}
