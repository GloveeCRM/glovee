import ClientApplicationSidebar from '@/components/client/client-application-sidebar'
import ApplicationContextProvider from '@/contexts/application-context'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    orgName: string
    id: string
  }
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  const orgName = params.orgName
  const applicationID = parseInt(params.id)

  return (
    <ApplicationContextProvider applicationID={applicationID}>
      <div id="client-application-layout" className="flex overflow-hidden">
        <ClientApplicationSidebar orgName={orgName} applicationID={applicationID} />
        <div className="h-screen flex-1 bg-n-450">{children}</div>
      </div>
    </ApplicationContextProvider>
  )
}
