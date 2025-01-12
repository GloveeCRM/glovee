import ClientSidebar from '@/components/client/client-sidebar'
import ClientDashboardSidebar from '@/components/client/dashboard/sidebar/client-dashboard-sidebar'

interface ClientLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default function ClientLayout({ children, params }: ClientLayoutProps) {
  const orgName = params.orgName

  return (
    <div id="client" className="flex overflow-hidden">
      <ClientDashboardSidebar orgName={orgName} collapsed={false} />
      <div className="max-h-screen flex-1 overflow-y-auto p-[8px]">{children}</div>
    </div>
  )
}
