'use client'

import { FormTemplateInfoCardSkeleton } from '@/components/skeletons'
import FormTemplateInfoCardTitle from '@/components/admin/template/edit/template-info-card-title'
import { useFormTemplateEditContext } from '@/demo/form-template-builder/contexts/form-template-edit-context'

interface TemplateInfoCardProps {
  editable?: boolean
}

export default function TemplateInfoCard({ editable = false }: TemplateInfoCardProps) {
  const { formTemplate } = useFormTemplateEditContext()

  if (!formTemplate) {
    return <FormTemplateInfoCardSkeleton />
  }
  console

  return (
    <div className="rounded bg-neutral-700">
      <FormTemplateInfoCardTitle title={formTemplate.form.formName || 'Untitled Template'} />
    </div>
  )
}
