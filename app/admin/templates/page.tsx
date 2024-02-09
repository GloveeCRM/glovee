import CreateNewTemplateCard from '@/components/admin/create-new-template-card'
import TemplateCard from '@/components/admin/template-card'
import TemplateCardWrapper from '@/components/admin/template-card-wrapper'
import { fetchTemplates } from '@/lib/data/template'

export default async function TemplatesPage() {
  const templates = await fetchTemplates()
  return (
    <div className="p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <TemplateCardWrapper templates={templates || []} />
    </div>
  )
}
