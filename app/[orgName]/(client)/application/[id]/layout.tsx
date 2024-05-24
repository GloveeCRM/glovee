import ClientApplicationSidebar from '@/components/client/client-application-sidebar'

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
    <div id="client-application-layout" className="flex overflow-hidden">
      <ClientApplicationSidebar orgName={orgName} applicationID={applicationID} />
      <div className="flex-1 overflow-auto p-[8px]">{children}</div>
    </div>
  )
}
