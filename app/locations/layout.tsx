import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Showrooms', description: 'Private showrooms in Lagos, Abuja and Port Harcourt.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
