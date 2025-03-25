import { FormQuestionModes } from '@/lib/types/form'
import { searchFormTemplates } from '@/lib/data/form'
import FormTemplateEditProvider from '@/contexts/form-template-edit-context'
import FormContextProvider from '@/contexts/form-context'

import FormTemplateEditSidebar from '@/components/admin/template/edit/form-template-edit-sidebar'
import FormTemplateEditToolbar from '@/components/admin/template/edit/form-template-edit-toolbar'

interface FormTemplateEditLayoutParams {
  formTemplateID: string
}

interface FormTemplateEditLayoutProps {
  params: FormTemplateEditLayoutParams
  children: React.ReactNode
}

export default async function FormTemplateEditLayout({
  params,
  children,
}: FormTemplateEditLayoutProps) {
  const { formTemplateID } = params
  const formTemplateIDNumeric = Number(formTemplateID)

  const { formTemplates } = await searchFormTemplates({
    filters: {
      formTemplateID: formTemplateIDNumeric,
    },
    limit: 1,
  })
  const formTemplate = formTemplates?.[0]

  if (!formTemplate) {
    return <div>Form template not found</div>
  }

  return (
    <div id="form-template-edit-layout" className="flex">
      <FormTemplateEditProvider formTemplate={formTemplate}>
        <FormContextProvider formID={formTemplate.formID} mode={FormQuestionModes.READ_ONLY}>
          <FormTemplateEditSidebar />
          <div className="h-svh w-full min-w-0 overflow-y-scroll bg-zinc-200">{children}</div>
          <FormTemplateEditToolbar />
        </FormContextProvider>
      </FormTemplateEditProvider>
    </div>
  )
}
