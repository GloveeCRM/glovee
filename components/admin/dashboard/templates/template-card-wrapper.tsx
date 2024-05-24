import { searchTemplates } from '@/lib/data/template'
import CreateNewTemplateCard from './create-new-template-card'
import TemplateCard from './template-card'

interface TemplateCardWrapperProps {
  orgName: string
}

export default async function TemplateCardWrapper({ orgName }: TemplateCardWrapperProps) {
  const templates = await searchTemplates(orgName)

  return (
    <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* TODO: Temporarily disabled the ability to create a new template. Reactivate or remove. */}
      <CreateNewTemplateCard orgName={orgName} />
      {templates?.map((template) => (
        <TemplateCard
          orgName={orgName}
          key={template.id}
          id={template.id}
          title={template.name}
          description={template.description}
        />
      ))}
    </div>
  )
}
