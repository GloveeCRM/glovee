import { notFound } from 'next/navigation'

import { fetchTemplateById } from '@/lib/data/template'
import QuestionsEditBoard from '@/components/admin/template/edit/questions-edit-board'
import { QuestionsEditBoardSkeleton } from '@/components/skeletons'

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
    <div className="p-[4px]">
      <QuestionsEditBoard />
      <QuestionsEditBoardSkeleton />
    </div>
  )
}
