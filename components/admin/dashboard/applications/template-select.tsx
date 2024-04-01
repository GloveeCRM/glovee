import { Template } from '@prisma/client'

interface TemplateSelectProps {
  templates: Template[]
  selectedTemplateId: string
  setSelectedTemplateId: (templateId: string) => void
}

export default function TemplateSelect({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
}: TemplateSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplateId(event.target.value)
  }
  return (
    <div>
      <label htmlFor="templateId" className="mb-[4px] block text-[14px] text-n-700">
        Choose a Template
      </label>
      <select
        name="templateId"
        id="templateId"
        className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]"
        onChange={handleChange}
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
    </div>
  )
}
