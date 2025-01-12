import { ReactNode } from 'react'

import ApplicationFormContextProvider from '@/contexts/application-form-context'
import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface AdminApplicationFormLayoutParams {
  applicationID: number
  applicationFormID: number
}

interface AdminApplicationFormLayoutProps {
  children: ReactNode
  params: AdminApplicationFormLayoutParams
}

export default function AdminApplicationFormLayout({
  children,
  params,
}: AdminApplicationFormLayoutProps) {
  const { applicationID, applicationFormID } = params

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormID} mode="view">
      <div className="flex">
        <ApplicationFormSidebar applicationID={applicationID} showProgressIndicator={false} />
        <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
