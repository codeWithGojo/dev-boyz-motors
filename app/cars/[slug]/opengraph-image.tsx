import { ImageResponse } from 'next/og'
import { cars } from '@/data/cars'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'DEV BOYZ MOTORS vehicle'

export function generateStaticParams() { return cars.map(({ slug }) => ({ slug })) }

/** Link preview card for WhatsApp, X, LinkedIn etc.: photo, name, price. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const car = cars.find(c => c.slug === slug)
  const photo = car?.images[0]
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#141414', color: '#fff', fontFamily: 'sans-serif' }}>
      {photo && <img src={photo} alt="" width={720} height={630} style={{ width: 720, height: 630, objectFit: 'cover' }} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 6 }}>DEV BOYZ</div>
          <div style={{ fontSize: 14, letterSpacing: 10, color: '#B08D57' }}>MOTORS</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, color: '#B08D57', letterSpacing: 4 }}>{car ? `${car.brand.toUpperCase()} · ${car.year}` : ''}</div>
          <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05, marginTop: 12 }}>{car?.model ?? 'Luxury cars in Nigeria'}</div>
          <div style={{ fontSize: 36, fontWeight: 700, marginTop: 24 }}>{car ? `NGN ${car.price.toLocaleString('en-NG')}` : ''}</div>
          <div style={{ fontSize: 20, color: '#ffffff99', marginTop: 10 }}>{car ? `${car.hp} hp · ${car.zeroTo100}s 0–100 · ${car.condition}` : ''}</div>
        </div>
      </div>
    </div>,
    size,
  )
}
