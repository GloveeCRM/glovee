import { searchTemplates } from '@/lib/data/template'
import TemplateCard from './template-card'

interface TemplateCardWrapperProps {
  orgName: string
}

export default async function TemplateCardWrapper({ orgName }: TemplateCardWrapperProps) {
  const templates = await searchTemplates(orgName)

  return (
    <>
      {templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 gap-[8px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard
              orgName={orgName}
              key={template.id}
              id={template.id}
              title={template.name}
              description={template.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-n-500">No templates found</div>
      )}
    </>
  )
}
