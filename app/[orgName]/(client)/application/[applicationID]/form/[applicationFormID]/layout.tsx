import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { searchForms } from '@/lib/data/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'
import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface ApplicationLayoutParams {
  applicationID: number
  applicationFormID: number
}

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: ApplicationLayoutParams
}

export default async function ApplicationLayout({
  children,
  params: { applicationFormID, applicationID },
}: Readonly<ApplicationLayoutProps>) {
  // const { forms } = await searchForms({
  //   filters: { userID, applicationFormID, includeCategories: true, includeSections: true },
  // })
  // const form = forms?.[0]

  // if (form?.status === FormStatusTypes.SUBMITTED) {
  //   redirect(`/application/${applicationID}/submission/${formID}`)
  // } else if (form?.status !== FormStatusTypes.CREATED) {
  //   redirect(`/application/${applicationID}/forms`)
  // }

  return (
    <ApplicationFormContextProvider applicationFormID={applicationFormID} mode="edit">
      <div id="client-form-layout" className="flex overflow-hidden">
        <ApplicationFormSidebar
          showProgressIndicator={true}
          backURL={`/application/${applicationID}/forms`}
        />
        <div className="h-svh flex-1">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
