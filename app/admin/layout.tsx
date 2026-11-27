import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin (demo)', description: 'Demo inventory management.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
