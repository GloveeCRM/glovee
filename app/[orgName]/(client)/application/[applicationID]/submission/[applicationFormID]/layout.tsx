import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'

import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface SubmissionLayoutParams {
  applicationID: number
  applicationFormID: number
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

  const { applicationForm } = await fetchApplicationForm({ applicationFormID })

  if (applicationForm?.status !== ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationID}/form/${applicationFormID}`)
  }

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormID} mode="view">
      <div id="client-submission-layout" className="flex overflow-hidden">
        <ApplicationFormSidebar
          showProgressIndicator={false}
          backURL={`/application/${applicationID}/forms`}
        />
        <div className="h-svh min-w-0 flex-1 overflow-y-scroll">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
