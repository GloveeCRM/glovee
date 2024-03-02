import DashboardSidebar from '@/components/admin/dashboard/nav/dashboard-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div id="dashboard" className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-[8px]">{children}</div>
    </div>
  )
}
