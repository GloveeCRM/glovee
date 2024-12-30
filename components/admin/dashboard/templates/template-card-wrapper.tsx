import { searchFormTemplates } from '@/lib/data/form'

import TemplateCard from './template-card'

interface TemplateCardWrapperProps {
  searchQuery: string
}

export default async function TemplateCardWrapper({ searchQuery }: TemplateCardWrapperProps) {
  const { formTemplates } = await searchFormTemplates({ searchQuery })

  return (
    <>
      {formTemplates && formTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-[8px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formTemplates.map((formTemplate) => (
            <TemplateCard
              key={formTemplate.formTemplateID}
              formTemplateID={formTemplate.formTemplateID}
              formID={formTemplate.form?.formID || 0}
              title={formTemplate.templateName}
              description={formTemplate.form?.createdAt || ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-n-500">No templates found</div>
      )}
    </>
  )
}
