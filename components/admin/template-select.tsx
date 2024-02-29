import { Template } from '@prisma/client'

export default function TemplateSelect({ templates }: { templates: Template[] }) {
  return (
    <div>
      <label htmlFor="templateId">Choose a template:</label>
      <select name="templateId" id="templateId">
        {templates?.map((template) => (
          <option key={template.id} value={template.id}>
            {template.title}
          </option>
        ))}
      </select>
    </div>
  )
}
