import AdminApplicationSidebar from '@/components/admin/application/admin-application-sidebar'
import ApplicationUpdatesWrapper from '@/components/application/application-updates-wrapper'

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
      <AdminApplicationSidebar applicationID={applicationID} />
      <div className="h-screen flex-1 overflow-y-auto p-[8px]">{children}</div>
      <ApplicationUpdatesWrapper applicationID={applicationID} />
    </div>
  )
}
