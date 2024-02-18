import TemplatePreviewSidebar from '@/components/admin/template-preview-sidebar'

export default async function TemplatePreviewLayout({
  params,
  children,
}: {
  params: { domain: string; id: string }
  children: React.ReactNode
}) {
  return (
    <div id="templatePreviewLayout" className="flex">
      <TemplatePreviewSidebar templateId={params.id} />
      <div className="h-[1200px] w-full p-[8px]">{children}</div>
    </div>
  )
}
