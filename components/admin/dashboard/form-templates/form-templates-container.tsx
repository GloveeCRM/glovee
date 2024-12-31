import { RiLayout5Fill } from 'react-icons/ri'

import { searchFormTemplates } from '@/lib/data/form'

import FormTemplateCard from './form-template-card'

interface FormTemplatesContainerProps {
  searchQuery: string
}

export default async function FormTemplatesContainer({ searchQuery }: FormTemplatesContainerProps) {
  const { formTemplates } = await searchFormTemplates({ searchQuery })

  return (
    <>
      {formTemplates && formTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-[8px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formTemplates.map((formTemplate) => (
            <FormTemplateCard key={formTemplate.formTemplateID} formTemplate={formTemplate} />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-center text-[18px] text-zinc-500">No templates found</span>
          <RiLayout5Fill className="h-[300px] w-[300px] text-zinc-700/10" />
        </div>
      )}
    </>
  )
}
