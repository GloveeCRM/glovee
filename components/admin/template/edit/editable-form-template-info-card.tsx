'use client'

import { useFormContext } from '@/contexts/form-context'

import FormTemplateInfoCardTitle from '@/components/admin/template/edit/form-template-info-card-title'
import FormTemplateInfoCardDescription from '@/components/admin/template/edit/form-template-info-card-description'
import { FormTemplateInfoCardSkeleton } from '@/components/skeletons'

export default function EditableFormTemplateInfoCard() {
  const { form } = useFormContext()

  if (!form) {
    return <FormTemplateInfoCardSkeleton />
  }

  return (
    <div className="flex flex-col gap-[6px] rounded bg-zinc-700 p-[8px]">
      <FormTemplateInfoCardTitle title={form.formName || 'Untitled Template'} />
      <FormTemplateInfoCardDescription description={form.formDescription} />
    </div>
  )
}
