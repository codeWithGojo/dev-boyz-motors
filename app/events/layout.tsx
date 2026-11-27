import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Private events', description: 'Invitation-only evenings and driving days.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
