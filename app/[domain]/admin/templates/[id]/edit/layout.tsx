import TemplateEditSidebar from '@/components/admin/template-edit-sidebar'

export default function TemplateLayout({
  params,
  children,
}: {
  params: { domain: string; id: string }
  children: React.ReactNode
}) {
  return (
    <div id="templateEditLayout" className="flex">
      <TemplateEditSidebar templateId={params.id} />
      <div className="w-full">{children}</div>
    </div>
  )
}
