import { redirect } from 'next/navigation'

import { FormStatusTypes } from '@/lib/types/form'
import { searchForms } from '@/lib/data/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    applicationID: string
    applicationFormID: string
  }
}

export default async function ApplicationLayout({
  children,
  params,
}: Readonly<ApplicationLayoutProps>) {
  const applicationFormID = parseInt(params.applicationFormID)
  const applicationID = parseInt(params.applicationID)

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
    <ApplicationFormContextProvider applicationFormID={applicationFormID}>
      <div id="client-form-layout" className="flex overflow-hidden">
        <ClientFormSidebar applicationID={applicationID} type="in-progress" />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </ApplicationFormContextProvider>
  )
}
