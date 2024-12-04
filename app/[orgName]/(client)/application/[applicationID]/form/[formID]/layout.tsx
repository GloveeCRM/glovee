import { redirect } from 'next/navigation'

import { FormStatusTypes } from '@/lib/types/form'
import { searchForms } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'
import { getSessionUserID } from '@/lib/auth/session'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    applicationID: string
    formID: string
  }
}

export default async function ApplicationLayout({
  children,
  params,
}: Readonly<ApplicationLayoutProps>) {
  const userID = await getSessionUserID()
  const formID = parseInt(params.formID)
  const applicationID = parseInt(params.applicationID)

  const { forms } = await searchForms({
    filters: { userID, formID, includeCategories: true, includeSections: true },
  })
  const form = forms?.[0]
  const categories = form?.categories || []

  // if (form?.status === FormStatusTypes.SUBMITTED) {
  //   redirect(`/application/${applicationID}/submission/${formID}`)
  // } else if (form?.status !== FormStatusTypes.CREATED) {
  //   redirect(`/application/${applicationID}/forms`)
  // }

  return (
    <FormContextProvider formID={formID}>
      <div id="client-form-layout" className="flex overflow-hidden">
        <ClientFormSidebar
          applicationID={applicationID}
          categories={categories}
          type="inProgress"
        />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </FormContextProvider>
  )
}
