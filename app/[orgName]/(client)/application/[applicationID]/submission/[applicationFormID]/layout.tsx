import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes, FormQuestionModes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ApplicationFormProvider from '@/contexts/application-form-context'

import FormSidebar from '@/components/application/form-sidebar'

interface ClientSubmissionLayoutParams {
  applicationID: string
  applicationFormID: string
}

interface ClientSubmissionLayoutProps {
  children: React.ReactNode
  params: ClientSubmissionLayoutParams
}

export default async function ClientSubmissionLayout({
  children,
  params,
}: Readonly<ClientSubmissionLayoutProps>) {
  const { applicationID, applicationFormID } = params
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  if (!applicationForm) {
    return <div>Application form not found</div>
  }

  if (applicationForm.status !== ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationIDNumeric}/form/${applicationFormIDNumeric}`)
  }

  return (
    <ApplicationFormProvider applicationForm={applicationForm}>
      <FormContextProvider
        formID={applicationForm?.formID || 0}
        mode={FormQuestionModes.ANSWER_ONLY}
        includeAnswers={true}
      >
        <div id="client-submission-layout" className="flex overflow-hidden">
          <FormSidebar
            showProgressIndicator={false}
            backURL={`/application/${applicationIDNumeric}/forms`}
            backButtonText="Back to Application"
          />
          <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
        </div>
      </FormContextProvider>
    </ApplicationFormProvider>
  )
}
