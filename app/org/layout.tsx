import type { Metadata } from 'next'
import { getSession, getSessionUserID } from '@/lib/auth/session'

import AuthProvider from '@/contexts/auth-context'
import OrgSidebar from '@/components/org/org-sidebar'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
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
  const sessionUserID = await getSessionUserID()

  return (
    <AuthProvider orgName={orgName} token={session} sessionUserID={sessionUserID}>
      <html lang="en">
        <body id="admin-app">
          <div className="flex">
            <OrgSidebar />
            <div className="w-full">{children}</div>
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
