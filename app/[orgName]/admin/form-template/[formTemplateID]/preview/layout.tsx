import { FormQuestionModes } from '@/lib/types/form'
import { searchFormTemplates } from '@/lib/data/form'
import FormTemplateEditProvider from '@/contexts/form-template-edit-context'
import FormContextProvider from '@/contexts/form-context'

import FormSidebar from '@/components/application/form-sidebar'
interface TemplatePreviewLayoutParams {
  formTemplateID: string
}

interface TemplatePreviewLayoutProps {
  params: TemplatePreviewLayoutParams
  children: React.ReactNode
}

export default async function TemplatePreviewLayout({
  children,
  params,
}: TemplatePreviewLayoutProps) {
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
    <div id="form-template-preview-layout" className="flex">
      <FormTemplateEditProvider formTemplate={formTemplate}>
        <FormContextProvider formID={formTemplate.formID} mode={FormQuestionModes.READ_ONLY}>
          <FormSidebar
            showProgressIndicator={false}
            backURL={`/admin/form-templates`}
            backButtonText="Back"
          />
          <div className="h-svh flex-1">{children}</div>
        </FormContextProvider>
      </FormTemplateEditProvider>
    </div>
  )
}
