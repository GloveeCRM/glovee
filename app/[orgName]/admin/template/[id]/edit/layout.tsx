import TemplateEditProvider from '@/contexts/template-edit-context'
import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'
import TemplateEditTopbar from '@/components/admin/template/edit/template-edit-topbar'

interface templateEditLayoutProps {
  params: { orgName: string; id: string }
  children: React.ReactNode
}

export default function templateEditLayout({ params, children }: templateEditLayoutProps) {
  const templateID = parseInt(params.id)

  return (
    <div id="template-edit-layout" className="flex">
      <TemplateEditProvider templateID={templateID}>
        <TemplateEditSidebar templateID={templateID} />
        <div className="h-svh w-full min-w-0 overflow-y-scroll bg-n-400">
          <div className="sticky top-0 z-10">
            <TemplateEditTopbar />
          </div>
          {children}
        </div>
        <TemplateEditToolbar />
      </TemplateEditProvider>
    </div>
  )
}
