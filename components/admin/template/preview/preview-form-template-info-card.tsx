'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

export default function PreviewFormTemplateInfoCard() {
  const { formTemplate } = useFormTemplateEditContext()

  if (!formTemplate) return <div>PreviewFormTemplateInfoCard</div>

  return (
    <div className="flex flex-col gap-[6px] rounded bg-zinc-700 p-[8px]">
      <span className="text-[12px] text-zinc-300">Form Name</span>
      <span className="text-[12px]">{formTemplate.form.formName}</span>
    </div>
  )
}
