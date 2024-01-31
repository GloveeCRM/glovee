import EditSidebar from '@/components/admin/edit-sidebar'

export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="templateEditLayout" className="flex">
      <EditSidebar />
      <div className="h-[1200px] w-full p-[8px]">{children}</div>
    </div>
  )
}
