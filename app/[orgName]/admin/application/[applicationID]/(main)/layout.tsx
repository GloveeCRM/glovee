import { Suspense } from 'react'

import AdminApplicationTopbar from '@/components/admin/application/admin-application-topbar'
import AdminDashboardSidebar from '@/components/admin/dashboard/sidebar/admin-dashboard-sidebar'
import ApplicationUpdatesContainer from '@/components/application/application-updates-container'
import ApplicationUpdatesContainerSkeleton from '@/components/skeleton/admin/application-updates-container-skeleton'

interface ApplicationLayoutParams {
  applicationID: number
  orgName: string
}

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: ApplicationLayoutParams
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  const { applicationID, orgName } = params

  return (
    <div id="admin-application-layout" className="flex">
      <AdminDashboardSidebar orgName={orgName} collapsed={true} />
      <div className="flex flex-1 flex-col">
        <AdminApplicationTopbar applicationID={applicationID} />
        <div className="flex h-[calc(100vh-60px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-[8px]">{children}</div>
          <Suspense fallback={<ApplicationUpdatesContainerSkeleton />}>
            <ApplicationUpdatesContainer applicationID={applicationID} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
