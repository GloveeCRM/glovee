import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes, FormQuestionModes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ApplicationFormProvider from '@/contexts/application-form-context'

import FormSidebar from '@/components/application/form-sidebar'

interface ClientApplicationFormLayoutParams {
  applicationID: string
  applicationFormID: string
}

interface ClientApplicationFormLayoutProps {
  children: React.ReactNode
  params: ClientApplicationFormLayoutParams
}

export default async function ClientApplicationFormLayout({
  children,
  params,
}: Readonly<ClientApplicationFormLayoutProps>) {
  const { applicationFormID, applicationID } = params
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  if (!applicationForm) {
    return <div>Application form not found</div>
  }

  if (applicationForm.status === ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationID}/submission/${applicationFormID}`)
  }

  return (
    <ApplicationFormProvider applicationForm={applicationForm}>
      <FormContextProvider
        formID={applicationForm?.formID || 0}
        mode={FormQuestionModes.INTERACTIVE}
        includeAnswers={true}
      >
        <div id="client-form-layout" className="flex overflow-hidden">
          <FormSidebar
            showProgressIndicator={true}
            backURL={`/application/${applicationIDNumeric}/forms`}
            backButtonText="Back to Application"
          />
          <div className="h-svh flex-1">{children}</div>
        </div>
      </FormContextProvider>
    </ApplicationFormProvider>
  )
}
