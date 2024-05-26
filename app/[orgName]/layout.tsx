import type { Metadata } from 'next'

import '@/app/globals.css'
import { getSession } from '@/lib/auth/session'
import OrgProvider from '@/contexts/org-context'
import AuthProvider from '@/contexts/auth-context'
import DragAndDropProvider from '@/contexts/drag-and-drop-context'

export const metadata: Metadata = {
  title: 'Glovee',
  description: '',
}

interface RootLayoutParams {
  orgName: string
}

interface RootLayoutProps {
  params: RootLayoutParams
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
            <body id="glovee-crm" className="h-svh overflow-hidden">
              {children}
            </body>
          </html>
        </DragAndDropProvider>
      </OrgProvider>
    </AuthProvider>
  )
}
