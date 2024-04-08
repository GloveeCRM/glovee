import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import '../globals.css'
import DragAndDropProvider from '@/contexts/drag-and-drop-context'
import OrgProvider from '@/contexts/org-context'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

interface RootLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default async function RootLayout({ params, children }: RootLayoutProps) {
  const session = await auth()

  const orgName = params.orgName

  return (
    <SessionProvider session={session}>
      <OrgProvider orgName={orgName}>
        <DragAndDropProvider>
          <html lang="en">
            <body id="skyBoundCRM">{children}</body>
          </html>
        </DragAndDropProvider>
      </OrgProvider>
    </SessionProvider>
  )
}
