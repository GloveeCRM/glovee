'use client'

import { FormTemplateType } from '@/lib/types/form'

import { TemplateInfoCardSkeleton } from '@/components/skeletons'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

interface TemplateInfoCardProps {
  formTemplate?: FormTemplateType
  editable?: boolean
}

export default function TemplateInfoCard({
  formTemplate,
  editable = false,
}: TemplateInfoCardProps) {
  if (!formTemplate) {
    return <TemplateInfoCardSkeleton />
  }

  return (
    <div className="rounded bg-n-600">
      <TemplateInfoCardTitle
        formTemplateID={formTemplate.formTemplateID}
        title={formTemplate.templateName || 'Untitled Template'}
        editable={editable}
      />
      <TemplateInfoCardDescription description={'No Description'} editable={editable} />
    </div>
  )
}
