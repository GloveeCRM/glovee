import FormTemplatePreviewSidebar from '@/components/admin/template/preview/form-template-preview-sidebar'
import FormTemplateEditProvider from '@/contexts/template-edit-context'

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

  return (
    <div id="form-template-preview-layout" className="flex">
      <FormTemplateEditProvider formTemplateID={formTemplateIDNumeric}>
        <FormTemplatePreviewSidebar formTemplateID={formTemplateIDNumeric} />
        <div className="w-full p-[8px]">{children}</div>
      </FormTemplateEditProvider>
    </div>
  )
}
