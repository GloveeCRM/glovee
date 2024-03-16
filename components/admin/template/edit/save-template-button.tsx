'use client'

import { useTransition } from 'react'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { updateFullTemplateById } from '@/lib/actions/template'
import { TemplateType } from '@/lib/types/template'

export default function SaveTemplateButton() {
  const { templateId, template, isTemplateChanged, setSavedTemplate } = useTemplateEditContext()
  const [isPending, startTransition] = useTransition()

  function saveTemplateChanges(templateId: string, template: TemplateType) {
    startTransition(() => {
      updateFullTemplateById(templateId, template).then(() => {
        setSavedTemplate(template)
      })
    })
  }

  function handleClickSave() {
    if (!template) return null
    saveTemplateChanges(templateId, template)
  }

  return (
    <button
      type="button"
      className={`w-full rounded-md bg-n-500 py-[8px] text-n-100 disabled:bg-red-600 ${isPending ? 'opacity-50' : ''}`}
      disabled={!isTemplateChanged}
      onClick={handleClickSave}
    >
      Save
    </button>
  )
}
