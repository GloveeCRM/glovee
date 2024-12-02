'use client'

import { FormTemplateType } from '@/lib/types/form'

import { TemplateInfoCardSkeleton } from '@/components/skeletons'
import TemplateInfoCardTitle from '@/components/admin/template/edit/template-info-card-title'
import { useFormTemplateEditContext } from '@/demo/form-template-builder/contexts/form-template-edit-context'

interface TemplateInfoCardProps {
  editable?: boolean
}

export default function TemplateInfoCard({ editable = false }: TemplateInfoCardProps) {
  const { formTemplate } = useFormTemplateEditContext()

  if (!formTemplate) {
    return <TemplateInfoCardSkeleton />
  }
  console

  return (
    <div className="rounded bg-n-600">
      <TemplateInfoCardTitle
        formTemplateID={formTemplate.formTemplateID}
        title={formTemplate.templateName || 'Untitled Template'}
        editable={editable}
      />
    </div>
  )
}
