import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'
import TemplateEditTopbar from '@/components/admin/template/edit/template-edit-topbar'
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
        <div className="min-w-0 flex-1">
          <TemplateEditTopbar />
          {children}
        </div>
        <TemplateEditToolbar />
      </TemplateEditProvider>
    </div>
  )
}
