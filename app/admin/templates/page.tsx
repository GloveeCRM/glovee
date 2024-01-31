import CreateNewTemplateCard from '@/components/admin/create-new-template-card'
import TemplateCard from '@/components/admin/template-card'
import { fetchTemplates } from '@/lib/data/template'

export default function TemplatesPage() {
  const templates = fetchTemplates()
  return (
    <div className="p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateNewTemplateCard />
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            id={template.id}
          />
        ))}
      </div>
    </div>
  )
}
