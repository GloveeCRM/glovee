import type { Metadata } from 'next'
import { getSession } from '@/lib/auth/session'

import AuthProvider from '@/contexts/auth-context'
import OrgSidebar from '@/components/org/org-sidebar'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <AuthProvider token={session}>
      <html lang="en">
        <body id="admin-app" className="">
          <div className="flex">
            <OrgSidebar />
            <div className="w-full">{children}</div>
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
