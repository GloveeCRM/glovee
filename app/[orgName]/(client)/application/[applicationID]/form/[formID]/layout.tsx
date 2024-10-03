import { redirect } from 'next/navigation'

import { FormStatusTypes } from '@/lib/types/form'
import { fetchClientFormIncludingCategoriesAndSections } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    orgName: string
    applicationID: string
    formID: string
  }
}

export default async function ApplicationLayout({
  children,
  params,
}: Readonly<ApplicationLayoutProps>) {
  const orgName = params.orgName
  const formID = parseInt(params.formID)
  const applicationID = parseInt(params.applicationID)

  const form = await fetchClientFormIncludingCategoriesAndSections(orgName, formID)
  const categories = form?.categories || []

  if (form?.status === FormStatusTypes.SUBMITTED) {
    redirect(`/application/${applicationID}/submission/${formID}`)
  } else if (form?.status !== FormStatusTypes.CREATED) {
    redirect(`/application/${applicationID}/forms`)
  }

  return (
    <FormContextProvider formID={formID}>
      <div id="client-application-layout" className="flex overflow-hidden">
        <ClientFormSidebar
          orgName={orgName}
          applicationID={applicationID}
          formID={formID}
          categories={categories}
          type="inProgress"
        />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </FormContextProvider>
  )
}
