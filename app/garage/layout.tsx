import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Saved vehicles', description: 'Your wishlist and garage.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
