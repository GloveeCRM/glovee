import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'

interface templateEditLayoutProps {
  params: { orgName: string; id: string }
  children: React.ReactNode
}

export default function templateEditLayout({ params, children }: templateEditLayoutProps) {
  const templateId = params.id

  return (
    <div id="template-edit-layout" className="flex">
      <TemplateEditSidebar templateId={templateId} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
