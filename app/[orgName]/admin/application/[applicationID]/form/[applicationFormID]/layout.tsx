import { ReactNode } from 'react'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'

import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface AdminApplicationFormLayoutParams {
  applicationID: string
  applicationFormID: string
}

interface AdminApplicationFormLayoutProps {
  children: ReactNode
  params: AdminApplicationFormLayoutParams
}

export default async function AdminApplicationFormLayout({
  children,
  params,
}: AdminApplicationFormLayoutProps) {
  const { applicationID, applicationFormID } = params
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  return (
    <FormContextProvider
      formID={applicationForm?.formID || 0}
      mode="view"
      includeAnswers={
        applicationForm?.status !== ApplicationFormStatusTypes.PENDING_CLIENT_SUBMISSION
      }
    >
      <div className="flex">
        <ApplicationFormSidebar
          showProgressIndicator={false}
          backURL={`/admin/application/${applicationIDNumeric}/forms`}
        />
        <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
      </div>
    </FormContextProvider>
  )
}
