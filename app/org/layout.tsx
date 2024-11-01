import type { Metadata } from 'next'
import { getSession, getSessionUserID } from '@/lib/auth/session'

import AuthProvider from '@/contexts/auth-context'
import OrgSidebar from '@/components/org/org-sidebar'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSession()
  const sessionUserID = await getSessionUserID()

  return (
    <AuthProvider accessToken={session} sessionUserID={sessionUserID}>
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
