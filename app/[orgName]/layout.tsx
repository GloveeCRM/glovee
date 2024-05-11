import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import '../globals.css'
import DragAndDropProvider from '@/contexts/drag-and-drop-context'
import OrgProvider from '@/contexts/org-context'
import { getSession, updateSession } from '@/lib/auth/session'
import AuthProvider from '@/contexts/auth-context'

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
  const session2 = await getSession()

  const orgName = params.orgName

  return (
    <AuthProvider token={session2}>
      <SessionProvider session={session}>
        <OrgProvider orgName={orgName}>
          <DragAndDropProvider>
            <html lang="en">
              <body id="skybound-crm" className="h-svh overflow-hidden">
                {children}
              </body>
            </html>
          </DragAndDropProvider>
        </OrgProvider>
      </SessionProvider>
    </AuthProvider>
  )
}
