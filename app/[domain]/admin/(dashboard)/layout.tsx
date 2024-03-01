import AdminSidebar from '@/components/admin/admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div id="admin" className="flex">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
