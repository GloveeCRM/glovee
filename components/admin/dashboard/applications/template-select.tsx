import { Template } from '@prisma/client'

export default function TemplateSelect({ templates }: { templates: Template[] }) {
  return (
    <div>
      <label htmlFor="templateId" className="mb-[4px] block text-[14px] text-n-700">
        Choose a Template
      </label>
      <select
        name="templateId"
        id="templateId"
        className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
      >
        {templates?.map((template) => (
          <option key={template.id} value={template.id}>
            {template.title}
          </option>
        ))}
      </select>
    </div>
  )
}
