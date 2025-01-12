import { Suspense } from 'react'

import ApplicationUpdatesContainer from '@/components/application/application-updates-container'
import ClientApplicationSidebar from '@/components/client/application/client-application-sidebar'
import ApplicationUpdatesContainerSkeleton from '@/components/skeleton/admin/application-updates-container-skeleton'
import ClientDashboardSidebar from '@/components/client/dashboard/sidebar/client-dashboard-sidebar'
import ClientApplicationTopbar from '@/components/client/application/client-application-topbar'

interface ApplicationLayoutParams {
  orgName: string
  applicationID: number
}

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: ApplicationLayoutParams
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  const { orgName, applicationID } = params

  return (
    <div id="client-application-layout" className="flex">
      <ClientDashboardSidebar orgName={orgName} collapsed={true} />
      <div className="flex flex-1 flex-col">
        <ClientApplicationTopbar applicationID={applicationID} />
        <div className="flex h-[calc(100vh-100px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-[8px]">{children}</div>
          <Suspense fallback={<ApplicationUpdatesContainerSkeleton />}>
            <ApplicationUpdatesContainer applicationID={applicationID} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
