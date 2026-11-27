import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New arrivals', description: 'The newest cars at DEV BOYZ MOTORS.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
