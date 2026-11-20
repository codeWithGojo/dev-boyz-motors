import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ShopProvider } from '@/context/ShopContext'
import { Footer, GarageDrawer, SiteHeader } from '@/components/SiteChrome'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const inter = Inter({ subsets:['latin'] })

export const metadata: Metadata = {
  title: { default:'DEV BOYZ MOTORS | Luxury Cars in Nigeria', template:'%s | DEV BOYZ MOTORS' },
  description:'Explore luxury and foreign-used vehicle models with indicative Nigerian prices at DEV BOYZ MOTORS. Browse Mercedes-Benz, Lexus, Range Rover, Lamborghini, Toyota and more.',
  metadataBase: new URL('https://dev-boyz-motors.vercel.app'),
  openGraph:{ title:'DEV BOYZ MOTORS', description:'Browse vehicle model references and request a confirmed viewing in Nigeria.', type:'website' }
}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className={inter.className}><ShopProvider><SiteHeader/><main>{children}</main><Footer/><GarageDrawer/><WhatsAppButton/></ShopProvider></body></html>
}
