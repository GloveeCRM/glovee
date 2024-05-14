import ClientApplicationSidebar from '@/components/client/client-application-sidebar'

interface ApplicationLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default function ApplicationLayout({ children, params }: Readonly<ApplicationLayoutProps>) {
  return (
    <div id="client-application-layout" className="flex overflow-hidden">
      <ClientApplicationSidebar applicationId={params.id} />
      <div className="flex-1 overflow-auto p-[8px]">{children}</div>
    </div>
  )
}
