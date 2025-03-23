import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'

import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface ApplicationFormLayoutParams {
  applicationID: string
  applicationFormID: string
}

interface ApplicationFormLayoutProps {
  children: React.ReactNode
  params: ApplicationFormLayoutParams
}

export default async function ApplicationFormLayout({
  children,
  params,
}: Readonly<ApplicationFormLayoutProps>) {
  const { applicationFormID, applicationID } = params
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  if (applicationForm?.status === ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationID}/submission/${applicationFormID}`)
  }

  return (
    <FormContextProvider formID={applicationForm?.formID || 0} mode="edit" includeAnswers={true}>
      <div id="client-form-layout" className="flex overflow-hidden">
        <ApplicationFormSidebar
          showProgressIndicator={true}
          backURL={`/application/${applicationIDNumeric}/forms`}
        />
        <div className="h-svh flex-1">{children}</div>
      </div>
    </FormContextProvider>
  )
}
