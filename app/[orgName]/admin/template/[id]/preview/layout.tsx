import TemplatePreviewSidebar from '@/components/admin/template/preview/template-preview-sidebar'

export default async function TemplatePreviewLayout({
  params,
  children,
}: {
  params: { orgName: string; id: string }
  children: React.ReactNode
}) {
  const templateID = parseInt(params.id)
  return (
    <div id="templatePreviewLayout" className="flex">
      <TemplatePreviewSidebar templateID={templateID} />
      <div className="w-full p-[8px]">{children}</div>
    </div>
  )
}
