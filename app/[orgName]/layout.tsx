import type { Metadata } from 'next'

import '../globals.css'
import DragAndDropProvider from '@/contexts/drag-and-drop-context'
import OrgProvider from '@/contexts/org-context'
import { getSession } from '@/lib/auth/session'
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
  const session = await getSession()
  const orgName = params.orgName

  return (
    <AuthProvider orgName={orgName} token={session}>
      <OrgProvider orgName={orgName}>
        <DragAndDropProvider>
          <html lang="en">
            <body id="skybound-crm" className="h-svh overflow-hidden">
              {children}
            </body>
          </html>
        </DragAndDropProvider>
      </OrgProvider>
    </AuthProvider>
  )
}
