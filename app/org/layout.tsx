import type { Metadata } from 'next'
import { getSession } from '@/lib/auth/session'

import AuthProvider from '@/contexts/auth-context'
import OrgSidebar from '@/components/org/org-sidebar'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const orgName = 'glovee'

  return (
    <AuthProvider orgName={orgName} token={session}>
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
