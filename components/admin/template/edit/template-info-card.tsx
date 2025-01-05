'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import { TemplateInfoCardSkeleton } from '@/components/skeletons'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

interface TemplateInfoCardProps {
  editable?: boolean
}

export default function TemplateInfoCard({ editable = false }: TemplateInfoCardProps) {
  const { formTemplate } = useFormTemplateEditContext()

  if (!formTemplate) {
    return <TemplateInfoCardSkeleton />
  }

  return (
    <div className="rounded bg-zinc-700 shadow-sm">
      <TemplateInfoCardTitle
        title={formTemplate.form.formName || 'Untitled Template'}
        editable={editable}
      />
      <TemplateInfoCardDescription
        description={formTemplate.form.formDescription}
        editable={editable}
      />
    </div>
  )
}
