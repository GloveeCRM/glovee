import { notFound } from 'next/navigation'

import { fetchTemplateById } from '@/lib/data/template'

interface TemplateEditPageProps {
  params: {
    id: string
  }
}

export default async function TemplateEditPage({ params }: TemplateEditPageProps) {
  const templateId = params.id
  const template = await fetchTemplateById(templateId)

  if (!template) {
    notFound()
  }

  return (
    <div>
      <p>{template.title}</p>
      <p>{template.description}</p>
    </div>
  )
}
