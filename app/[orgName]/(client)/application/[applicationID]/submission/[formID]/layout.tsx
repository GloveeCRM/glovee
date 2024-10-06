import { redirect } from 'next/navigation'

import { FormStatusTypes } from '@/lib/types/form'
import { getSessionUserID } from '@/lib/auth/session'
import { searchForms } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'

interface SubmissionLayoutProps {
  children: React.ReactNode
  params: {
    applicationID: string
    formID: string
  }
}

export default async function SubmissionLayout({
  children,
  params,
}: Readonly<SubmissionLayoutProps>) {
  const userID = await getSessionUserID()
  const formID = parseInt(params.formID)
  const applicationID = parseInt(params.applicationID)

  const { forms } = await searchForms({
    filters: { userID, formID, includeCategories: true, includeSections: true },
  })
  const form = forms?.[0]
  const categories = form?.categories || []

  if (form?.status === FormStatusTypes.CREATED) {
    redirect(`/application/${applicationID}/form/${formID}`)
  } else if (form?.status !== FormStatusTypes.SUBMITTED) {
    redirect(`/application/${applicationID}/forms`)
  }

  return (
    <FormContextProvider formID={formID}>
      <div id="client-submission-layout" className="flex overflow-hidden">
        <ClientFormSidebar applicationID={formID} categories={categories} type="submitted" />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </FormContextProvider>
  )
}
