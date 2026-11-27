import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Insights (demo)', description: 'Demo performance dashboard.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
