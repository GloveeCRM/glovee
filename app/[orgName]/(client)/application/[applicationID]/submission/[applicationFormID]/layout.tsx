import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'

interface SubmissionLayoutProps {
  children: React.ReactNode
  params: {
    applicationID: string
    applicationFormID: string
  }
}

export default async function SubmissionLayout({
  children,
  params,
}: Readonly<SubmissionLayoutProps>) {
  const applicationFormID = parseInt(params.applicationFormID)
  const applicationID = parseInt(params.applicationID)

  // const { forms } = await searchForms({
  //   filters: { userID, formID, includeCategories: true, includeSections: true },
  // })
  // const form = forms?.[0]
  // const categories = form?.categories || []

  // if (form?.status === FormStatusTypes.CREATED) {
  //   redirect(`/application/${applicationID}/form/${formID}`)
  // } else if (form?.status !== FormStatusTypes.SUBMITTED) {
  //   redirect(`/application/${applicationID}/forms`)
  // }

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormID} mode="view">
      <div id="client-submission-layout" className="flex overflow-hidden">
        <ClientFormSidebar applicationID={applicationID} type="submitted" />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
