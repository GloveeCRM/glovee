import FormTemplateEditProvider from '@/contexts/template-edit-context'
import FormTemplateEditSidebar from '@/components/admin/template/edit/form-template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'

interface TemplateEditLayoutParams {
  formTemplateID: string
}

interface TemplateEditLayoutProps {
  params: TemplateEditLayoutParams
  children: React.ReactNode
}

export default function TemplateEditLayout({ params, children }: TemplateEditLayoutProps) {
  const { formTemplateID } = params
  const formTemplateIDNumeric = Number(formTemplateID)

  return (
    <div id="form-template-edit-layout" className="flex">
      <FormTemplateEditProvider formTemplateID={formTemplateIDNumeric}>
        <FormTemplateEditSidebar />
        <div className="h-svh w-full min-w-0 overflow-y-scroll bg-zinc-200">{children}</div>
        <TemplateEditToolbar />
      </FormTemplateEditProvider>
    </div>
  )
}
