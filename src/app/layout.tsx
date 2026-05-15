import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AdminShell } from '../components/layout/AdminShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'APICENTER Alumni Admin',
  description: 'Administrative portal for alumni operations across graduate exit, membership, document fulfillment, engagement, and privacy.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
