import { ReactNode } from 'react'

import { ApplicationFormStatusTypes, FormQuestionModes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ApplicationFormProvider from '@/contexts/application-form-context'

import FormSidebar from '@/components/application/form-sidebar'

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

  if (!applicationForm) {
    return <div>Application form not found</div>
  }

  return (
    <ApplicationFormProvider applicationForm={applicationForm}>
      <FormContextProvider
        formID={applicationForm?.formID || 0}
        mode={FormQuestionModes.ANSWER_ONLY}
        includeAnswers={
          applicationForm?.status !== ApplicationFormStatusTypes.PENDING_CLIENT_SUBMISSION
        }
      >
        <div className="flex">
          <FormSidebar
            showProgressIndicator={false}
            backURL={`/admin/application/${applicationIDNumeric}/forms`}
            backButtonText="Back to Application"
          />
          <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
        </div>
      </FormContextProvider>
    </ApplicationFormProvider>
  )
}
