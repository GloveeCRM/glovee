'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import { FormTemplateInfoCardSkeleton } from '@/components/skeletons'
import FormTemplateInfoCardTitle from './template-info-card-title'
import TemplateInfoCardDescription from './template-info-card-description'

export default function EditableFormTemplateInfoCard() {
  const { formTemplate } = useFormTemplateEditContext()

  if (!formTemplate) {
    return <FormTemplateInfoCardSkeleton />
  }

  return (
    <div className="flex flex-col gap-[6px] rounded bg-zinc-700 p-[8px]">
      <FormTemplateInfoCardTitle title={formTemplate.form.formName || 'Untitled Template'} />
      <TemplateInfoCardDescription description={formTemplate.form.formDescription} />
    </div>
  )
}
