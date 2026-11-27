import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Find my car', description: 'Take a 60-second quiz or ask our AI assistant to match you with the right car.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
