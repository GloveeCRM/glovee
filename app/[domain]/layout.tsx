import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body id="skyBoundCRM">{children}</body>
      </html>
    </SessionProvider>
  )
}
