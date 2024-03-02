import AdminSidebar from '@/components/admin/dashboard/nav/admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div id="dashboard" className="flex">
      <AdminSidebar />
      <div className="flex-1 p-[8px]">{children}</div>
    </div>
  )
}
