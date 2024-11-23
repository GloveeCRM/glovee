'use client'

import { FormTemplateType } from '@/lib/types/form'

import { TemplateInfoCardSkeleton } from '@/components/skeletons'
import TemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

interface TemplateInfoCardProps {
  editable?: boolean
}

export default function TemplateInfoCard({ editable = false }: TemplateInfoCardProps) {
  const { formTemplate } = useFormTemplateEditContext()

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
