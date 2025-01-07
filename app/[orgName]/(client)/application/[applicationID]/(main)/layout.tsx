import { Suspense } from 'react'

import ApplicationUpdatesContainer from '@/components/application/application-updates-container'
import ClientApplicationSidebar from '@/components/client/application/client-application-sidebar'
import ApplicationUpdatesContainerSkeleton from '@/components/skeleton/admin/application-updates-container-skeleton'

interface ApplicationLayoutParams {
  applicationID: number
}

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: ApplicationLayoutParams
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  const { applicationID } = params

  return (
    <div id="client-application-layout" className="flex overflow-hidden">
      <ClientApplicationSidebar applicationID={applicationID} />
      <div className="h-screen flex-1 p-[8px]">{children}</div>
      <Suspense fallback={<ApplicationUpdatesContainerSkeleton />}>
        <ApplicationUpdatesContainer applicationID={applicationID} />
      </Suspense>
    </div>
  )
}
