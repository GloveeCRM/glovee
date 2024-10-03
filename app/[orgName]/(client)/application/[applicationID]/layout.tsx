import { redirect } from 'next/navigation'

import { FormStatusTypes } from '@/lib/types/form'
import { fetchClientFormIncludingCategoriesAndSections } from '@/lib/data/form'
import FormContextProvider from '@/contexts/form-context'
import ClientFormSidebar from '@/components/client/client-form-sidebar'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    orgName: string
    id: string
  }
}

export default async function ApplicationLayout({
  children,
  params,
}: Readonly<ApplicationLayoutProps>) {
  // const orgName = params.orgName
  // const applicationID = parseInt(params.id)

  // const application = await fetchClientFormIncludingCategoriesAndSections(orgName, applicationID)
  // const categories = application?.categories || []

  // if (application?.status === FormStatusTypes.SUBMITTED) {
  //   redirect(`/submission/${applicationID}`)
  // } else if (application?.status !== FormStatusTypes.CREATED) {
  //   redirect(`/applications}`)
  // }

  return (
    // <FormContextProvider formID={applicationID}>
    //   <div id="client-application-layout" className="flex overflow-hidden">
    //     <ClientFormSidebar
    //       orgName={orgName}
    //       formID={applicationID}
    //       categories={categories}
    //       type="inProgress"
    //     />
    //     <div className="h-screen flex-1">{children}</div>
    //   </div>
    // </FormContextProvider>
    <div>{children}</div>
  )
}