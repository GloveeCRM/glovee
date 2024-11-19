import TemplateCardWrapper from '@/components/admin/dashboard/templates/template-card-wrapper'
import TemplatePageToolbar from '@/components/admin/dashboard/templates/template-page-toolbar'

export default async function TemplatesPage() {
  return (
    <div className="flex h-full flex-col gap-[20px] overflow-hidden">
      <TemplatePageToolbar />
      <TemplateCardWrapper />
    </div>
  )
}
