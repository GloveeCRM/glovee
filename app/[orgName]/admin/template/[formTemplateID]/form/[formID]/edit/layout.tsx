import TemplateEditProvider from '@/contexts/template-edit-context'
import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'

interface TemplateEditLayoutParams {
  orgName: string
  formID: number
  formTemplateID: number
}

interface TemplateEditLayoutProps {
  params: TemplateEditLayoutParams
  children: React.ReactNode
}

export default function TemplateEditLayout({ params, children }: TemplateEditLayoutProps) {
  const formID = Number(params.formID)
  const formTemplateID = Number(params.formTemplateID)
  const orgName = params.orgName

  return (
    <div id="template-edit-layout" className="flex">
      <TemplateEditProvider orgName={orgName} formID={formID} formTemplateID={formTemplateID}>
        <TemplateEditSidebar formTemplateID={formTemplateID} />
        <div className="h-svh w-full min-w-0 overflow-y-scroll bg-n-400">{children}</div>
        <TemplateEditToolbar />
      </TemplateEditProvider>
    </div>
  )
}
