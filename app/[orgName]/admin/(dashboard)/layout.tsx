import AdminDashboardSidebar from '@/components/admin/dashboard/sidebar/admin-dashboard-sidebar'

interface AdminLayoutProps {
  params: { orgName: string }
  children: React.ReactNode
}

export default function AdminLayout({ children, params }: AdminLayoutProps) {
  const orgName = params.orgName

  return (
    <div id="dashboard" className="flex h-screen overflow-hidden">
      <AdminDashboardSidebar orgName={orgName} collapsed={false} />
      <div className="flex-1 overflow-auto p-[8px]">{children}</div>
    </div>
  )
}
