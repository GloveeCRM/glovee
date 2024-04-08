import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import '../globals.css'
import DragAndDropProvider from '@/contexts/drag-and-drop-context'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <DragAndDropProvider>
        <html lang="en">
          <body id="skybound-crm" className="h-svh overflow-hidden">
            {children}
          </body>
        </html>
      </DragAndDropProvider>
    </SessionProvider>
  )
}
