import { notFound } from 'next/navigation'

import { searchTemplates } from '@/lib/data/template'
import QuestionsEditBoard from '@/components/admin/template/edit/questions-edit-board'

interface TemplateEditPageProps {
  params: {
    orgName: string
    id: string
  }
}

export default async function TemplateEditPage({ params }: TemplateEditPageProps) {
  const templateID = parseInt(params.id)
  const orgName = params.orgName
  const templates = await searchTemplates({
    filters: {
      formTemplateID: templateID,
      includeCategories: false,
      includeSections: false,
    },
  })
  const template = templates.formTemplates?.[0]

  if (!template) {
    notFound()
  }

  return (
    <div className="p-[4px]">
      <QuestionsEditBoard />
    </div>
  )
}
