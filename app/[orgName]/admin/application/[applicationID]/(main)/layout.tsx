import AdminApplicationSidebar from '@/components/admin/application/admin-application-sidebar'

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
      <div className="h-screen flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
