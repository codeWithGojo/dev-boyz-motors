import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ShopProvider } from '@/context/ShopContext'
import { Footer, GarageDrawer, SiteHeader } from '@/components/SiteChrome'

const inter = Inter({ subsets:['latin'] })

export const metadata: Metadata = {
  title: { default:'DEV BOYZ MOTORS | Luxury Cars in Nigeria', template:'%s | DEV BOYZ MOTORS' },
  description:'Shop inspected luxury, brand-new and foreign-used cars from DEV BOYZ MOTORS. Browse Mercedes-Benz, Lexus, Range Rover, Lamborghini, Toyota and more.',
  metadataBase: new URL('https://dev-boyz-motors.vercel.app'),
  openGraph:{ title:'DEV BOYZ MOTORS', description:'Luxury and foreign-used cars, inspected and delivered across Nigeria.', type:'website' }
}

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className={inter.className}><ShopProvider><SiteHeader/><main>{children}</main><Footer/><GarageDrawer/></ShopProvider></body></html>
}
