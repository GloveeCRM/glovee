import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditProvider from '@/contexts/template-edit-context'

interface templateEditLayoutProps {
  params: { orgName: string; id: string }
  children: React.ReactNode
}

export default function templateEditLayout({ params, children }: templateEditLayoutProps) {
  const templateId = params.id

  return (
    <div id="template-edit-layout" className="flex">
      <TemplateEditProvider templateId={templateId}>
        <TemplateEditSidebar templateId={templateId} />
        <div className="flex-1">{children}</div>
      </TemplateEditProvider>
    </div>
  )
}
