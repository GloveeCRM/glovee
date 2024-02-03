import PreviewSidebar from '@/components/admin/preview-sidebar'

export default function TemplatePreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="templatePreviewLayout" className="flex">
      <PreviewSidebar />
      <div className="h-[1200px] w-full p-[8px]">{children}</div>
    </div>
  )
}
