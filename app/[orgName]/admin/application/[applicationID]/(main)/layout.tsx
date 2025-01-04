import AdminApplicationClientCard from '@/components/admin/application/admin-application-client-card'
import AdminApplicationTopbar from '@/components/admin/application/admin-application-topbar'
import AdminDashboardSidebar from '@/components/admin/dashboard/sidebar/admin-dashboard-sidebar'
import ApplicationUpdatesContainer from '@/components/application/application-updates-container'

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
          <ApplicationUpdatesContainer applicationID={applicationID} />
        </div>
      </div>
    </div>
  )
}
