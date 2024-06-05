import TemplateEditProvider from '@/contexts/template-edit-context'
import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'
import TemplateEditTopbar from '@/components/admin/template/edit/template-edit-topbar'

interface TemplateEditLayoutParams {
  orgName: string
  id: number
}

interface TemplateEditLayoutProps {
  params: TemplateEditLayoutParams
  children: React.ReactNode
}

export default function templateEditLayout({ params, children }: TemplateEditLayoutProps) {
  const templateID = params.id
  const orgName = params.orgName

  return (
    <div id="template-edit-layout" className="flex">
      <TemplateEditProvider orgName={orgName} templateID={templateID}>
        <TemplateEditSidebar />
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
