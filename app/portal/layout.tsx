import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Owner’s portal (demo)', description: 'Documents, service and concierge for owners.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
