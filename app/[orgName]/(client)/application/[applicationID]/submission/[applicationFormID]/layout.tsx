import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'

import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface SubmissionLayoutParams {
  applicationID: string
  applicationFormID: string
}

interface SubmissionLayoutProps {
  children: React.ReactNode
  params: SubmissionLayoutParams
}

export default async function SubmissionLayout({
  children,
  params,
}: Readonly<SubmissionLayoutProps>) {
  const { applicationID, applicationFormID } = params
  const applicationIDNumeric = Number(applicationID)
  const applicationFormIDNumeric = Number(applicationFormID)

  const { applicationForm } = await fetchApplicationForm({
    applicationFormID: applicationFormIDNumeric,
  })

  if (applicationForm?.status !== ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationIDNumeric}/form/${applicationFormIDNumeric}`)
  }

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormIDNumeric} mode="view">
      <div id="client-submission-layout" className="flex overflow-hidden">
        <ApplicationFormSidebar
          showProgressIndicator={false}
          backURL={`/application/${applicationIDNumeric}/forms`}
        />
        <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
