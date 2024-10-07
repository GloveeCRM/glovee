import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { getSession, getSessionUserID } from '@/lib/auth/session'
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
  const sessionUserID = await getSessionUserID()
  const orgName = params.orgName

  return (
    <AuthProvider orgName={orgName} token={session} sessionUserID={sessionUserID}>
      <OrgProvider orgName={orgName}>
        <DragAndDropProvider>
          <html lang="en">
            <body id="glovee-crm" className="h-svh cursor-default overflow-hidden">
              {children}
              <Toaster
                toastOptions={{
                  style: {
                    background: '#333333',
                    color: '#fff',
                    borderRadius: '4px',
                    boxShadow: 'none',
                  },
                }}
              />
            </body>
          </html>
        </DragAndDropProvider>
      </OrgProvider>
    </AuthProvider>
  )
}
