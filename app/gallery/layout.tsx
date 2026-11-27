import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Virtual showroom', description: 'Walk the DEV BOYZ MOTORS showroom floor, full screen.' }

export default function Layout({ children }: { children: React.ReactNode }) { return children }
