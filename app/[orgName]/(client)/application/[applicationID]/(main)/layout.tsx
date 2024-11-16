import ApplicationUpdatesWrapper from '@/components/application/application-updates-wrapper'
import ClientApplicationSidebar from '@/components/client/application/client-application-sidebar'

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
      <ApplicationUpdatesWrapper applicationID={applicationID} />
    </div>
  )
}
