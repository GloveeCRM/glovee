'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useTemplateActions() {
  const { template, setTemplate } = useTemplateEditContext()

  function updateTemplateName(name: string) {
    if (!template) return

    setTemplate({ ...template, name })
  }

  function updateTemplateDescription(description: string) {
    if (!template) return

    setTemplate({ ...template, description })
  }

  return {
    updateTemplateName,
    updateTemplateDescription,
  }
}
