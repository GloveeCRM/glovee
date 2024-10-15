import { searchTemplates } from '@/lib/data/template'
import TemplateCard from './template-card'

interface TemplateCardWrapperProps {
  orgName: string
}

export default async function TemplateCardWrapper({ orgName }: TemplateCardWrapperProps) {
  const { formTemplates } = await searchTemplates({})

  return (
    <>
      {formTemplates && formTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-[8px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formTemplates.map((formTemplate) => (
            <TemplateCard
              orgName={orgName}
              key={formTemplate.id}
              formTemplateID={formTemplate.formTemplateID}
              formID={formTemplate.form?.formID || 0}
              title={formTemplate.form?.formName || ''}
              description={formTemplate.form?.formDescription || ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-n-500">No templates found</div>
      )}
    </>
  )
}
