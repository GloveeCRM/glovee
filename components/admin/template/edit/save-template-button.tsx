'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function SaveTemplateButton() {
  const { isTemplateChanged } = useTemplateEditContext()

  return (
    <button
      type="button"
      className="w-full rounded-md bg-n-500 py-[8px] text-n-100 disabled:bg-red-600"
      disabled={!isTemplateChanged}
    >
      Save
    </button>
  )
}
