import FormTemplateEditProvider from '@/contexts/template-edit-context'
import TemplateEditSidebar from '@/components/admin/template/edit/template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'

interface TemplateEditLayoutParams {
  formTemplateID: number
}

interface TemplateEditLayoutProps {
  params: TemplateEditLayoutParams
  children: React.ReactNode
}

export default function TemplateEditLayout({ params, children }: TemplateEditLayoutProps) {
  const formTemplateID = Number(params.formTemplateID)

  return (
    <div id="template-edit-layout" className="flex">
      <FormTemplateEditProvider formTemplateID={formTemplateID}>
        <TemplateEditSidebar />
        <div className="h-svh w-full min-w-0 overflow-y-scroll bg-n-400">{children}</div>
        <TemplateEditToolbar />
      </FormTemplateEditProvider>
    </div>
  )
}
