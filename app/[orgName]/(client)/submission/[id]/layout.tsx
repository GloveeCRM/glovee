import { redirect } from 'next/navigation'

import { ApplicationStatusTypes } from '@/lib/types/application'
import { fetchClientApplicationIncludingCategoriesAndSections } from '@/lib/data/application'
import ApplicationContextProvider from '@/contexts/application-context'
import ClientApplicationSidebar from '@/components/client/client-application-sidebar'

interface SubmissionLayoutProps {
  children: React.ReactNode
  params: {
    orgName: string
    id: string
  }
}

export default async function SubmissionLayout({
  children,
  params,
}: Readonly<SubmissionLayoutProps>) {
  const orgName = params.orgName
  const applicationID = parseInt(params.id)

  const application = await fetchClientApplicationIncludingCategoriesAndSections(
    orgName,
    applicationID
  )
  const categories = application?.categories || []

  if (application?.status === ApplicationStatusTypes.CREATED) {
    redirect(`/application/${applicationID}`)
  } else if (application?.status !== ApplicationStatusTypes.SUBMITTED) {
    redirect(`/applications`)
  }

  return (
    <ApplicationContextProvider applicationID={applicationID}>
      <div id="client-application-layout" className="flex overflow-hidden">
        <ClientApplicationSidebar
          orgName={orgName}
          applicationID={applicationID}
          categories={categories}
        />
        <div className="h-screen flex-1">{children}</div>
      </div>
    </ApplicationContextProvider>
  )
}
