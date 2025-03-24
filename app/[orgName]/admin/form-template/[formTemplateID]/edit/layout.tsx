import { searchFormTemplates } from '@/lib/data/form'
import FormTemplateEditProvider from '@/contexts/template-edit-context'
import FormContextProvider from '@/contexts/form-context'
import FormTemplateEditSidebar from '@/components/admin/template/edit/form-template-edit-sidebar'
import TemplateEditToolbar from '@/components/admin/template/edit/template-edit-toolbar'

interface TemplateEditLayoutParams {
  formTemplateID: string
}

interface TemplateEditLayoutProps {
  params: TemplateEditLayoutParams
  children: React.ReactNode
}

export default async function TemplateEditLayout({ params, children }: TemplateEditLayoutProps) {
  const { formTemplateID } = params
  const formTemplateIDNumeric = Number(formTemplateID)

  const { formTemplates } = await searchFormTemplates({
    filters: {
      formTemplateID: formTemplateIDNumeric,
    },
    limit: 1,
  })
  const formTemplate = formTemplates?.[0]

  return (
    <div id="form-template-edit-layout" className="flex">
      <FormTemplateEditProvider formTemplateID={formTemplateIDNumeric}>
        <FormContextProvider formID={formTemplate?.formID || 0} mode="view">
          <FormTemplateEditSidebar />
          <div className="h-svh w-full min-w-0 overflow-y-scroll bg-zinc-200">{children}</div>
          <TemplateEditToolbar />
        </FormContextProvider>
      </FormTemplateEditProvider>
    </div>
  )
}
