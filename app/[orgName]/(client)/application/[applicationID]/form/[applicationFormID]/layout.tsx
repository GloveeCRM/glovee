import { redirect } from 'next/navigation'

import { ApplicationFormStatusTypes } from '@/lib/types/form'
import { fetchApplicationForm } from '@/lib/data/form'
import ApplicationFormContextProvider from '@/contexts/application-form-context'

import ApplicationFormSidebar from '@/components/application/application-form-sidebar'

interface ApplicationFormLayoutParams {
  applicationID: number
  applicationFormID: number
}

interface ApplicationFormLayoutProps {
  children: React.ReactNode
  params: ApplicationFormLayoutParams
}

export default async function ApplicationFormLayout({
  children,
  params: { applicationFormID, applicationID },
}: Readonly<ApplicationFormLayoutProps>) {
  const { applicationForm } = await fetchApplicationForm({ applicationFormID })

  if (applicationForm?.status === ApplicationFormStatusTypes.CLIENT_SUBMITTED) {
    redirect(`/application/${applicationID}/submission/${applicationFormID}`)
  }

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
