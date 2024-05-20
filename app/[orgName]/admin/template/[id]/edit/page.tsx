import { notFound } from 'next/navigation'

import { fetchTemplateById } from '@/lib/data/template'
import QuestionsEditBoard from '@/components/admin/template/edit/questions-edit-board'

interface TemplateEditPageProps {
  params: {
    id: string
  }
}

export default async function TemplateEditPage({ params }: TemplateEditPageProps) {
  const templateID = parseInt(params.id)
  const template = await fetchTemplateById(templateID)

  if (!template) {
    notFound()
  }

  return (
    <div className="p-[4px]">
      <QuestionsEditBoard />
    </div>
  )
}
