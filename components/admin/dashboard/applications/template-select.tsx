import { FormInput, InputLabel } from '@/components/ui/inputs'
import { Select } from '@/components/ui/select'
import { Template } from '@prisma/client'

interface TemplateSelectProps {
  templates: Template[]
  errors?: string
}

export default function TemplateSelect({ templates, errors }: TemplateSelectProps) {
  const options = templates.map((template) => ({
    id: template.id,
    value: template.id,
    name: template.title,
  }))

  return (
    <div>
      <FormInput errors={errors} gap="sm">
        <InputLabel htmlFor="templateId">Select a template</InputLabel>
        <Select id="template" name="templateId" options={options} />
      </FormInput>
    </div>
  )
}
