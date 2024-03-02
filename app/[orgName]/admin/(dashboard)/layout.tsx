import DashboardSidebar from '@/components/admin/dashboard/nav/dashboard-sidebar'

interface AdminLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default function AdminLayout({ children, params }: AdminLayoutProps) {
  const orgName = params.orgName

  return (
    <div id="dashboard" className="flex">
      <DashboardSidebar orgName={orgName} />
      <div className="flex-1 p-[8px]">{children}</div>
    </div>
  )
}
