import { FormInput, InputLabel } from '@/components/ui/inputs'
import { Select } from '@/components/ui/select'
import { TemplateType } from '@/lib/types/template'

interface TemplateSelectProps {
  templates: TemplateType[]
  errors?: string
}

export default function TemplateSelect({ templates, errors }: TemplateSelectProps) {
  const options = templates.map((template) => ({
    id: template.id,
    value: template.id,
    name: template.name,
  }))

  return (
    <div>
      <FormInput errors={errors} gap="sm">
        <InputLabel htmlFor="templateId">Select a template</InputLabel>
        <Select id="template" name="templateID" options={options} />
      </FormInput>
    </div>
  )
}
