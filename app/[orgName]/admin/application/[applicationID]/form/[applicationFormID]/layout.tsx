import { ReactNode } from 'react'

import ApplicationFormContextProvider from '@/contexts/application-form-context'
import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface AdminApplicationFormLayoutParams {
  applicationID: string
  applicationFormID: string
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
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormIDNumeric} mode="view">
      <div className="flex">
        <ApplicationFormSidebar
          showProgressIndicator={false}
          backURL={`/admin/application/${applicationIDNumeric}/forms`}
        />
        <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
