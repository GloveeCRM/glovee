import { FormInput, InputLabel } from '@/components/ui/inputs'
import { Template } from '@prisma/client'

interface TemplateSelectProps {
  templates: Template[]
  errors?: string
}

export default function TemplateSelect({ templates, errors }: TemplateSelectProps) {
  return (
    <div>
      <FormInput errors={errors}>
        <InputLabel htmlFor="templateId">Choose a template</InputLabel>
        {/* TODO: add select ui component */}
        <select
          name="templateId"
          id="template"
          className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]"
          defaultValue=""
        >
          <option value="" disabled>
            --Select--
          </option>
          {templates?.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
      </FormInput>
    </div>
  )
}
