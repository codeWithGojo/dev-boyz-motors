import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Showroom', description: 'Browse luxury and foreign-used cars in Nigeria. Filter by brand, body, fuel, price and year.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
