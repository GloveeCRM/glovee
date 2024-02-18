import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import '../globals.css'
import OrgSidebar from '@/components/org/org-sidebar'

export const metadata: Metadata = {
  title: 'Immigration CRM',
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body id="admin-app" className="">
          <div className="flex">
            <OrgSidebar />
            <div className="h-[1200px] w-full">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  )
}
