import AdminSidebar from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="adminApp" className="flex">
      <AdminSidebar />
      <div className="h-[1200px] w-full p-[8px]">{children}</div>
    </div>
  )
}
