import AdminSidebar from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="adminApp" className="flex">
      <AdminSidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
