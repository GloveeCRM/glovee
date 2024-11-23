'use client'

import { updateFormTemplate as updateFormTemplateRequest } from '@/lib/actions/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import { FormTemplateType } from '@/lib/types/form'

interface UpdateFormTemplateProps {
  formTemplateToUpdate: Partial<FormTemplateType>
}

interface UpdateFormTemplateResponse {
  error?: string
}

export default function useTemplateActions() {
  const { formTemplate, setFormTemplate } = useFormTemplateEditContext()

  async function updateFormTemplate({
    formTemplateToUpdate,
  }: UpdateFormTemplateProps): Promise<UpdateFormTemplateResponse> {
    const { formTemplate: updatedFormTemplate, error } = await updateFormTemplateRequest({
      formTemplate: { ...formTemplate, ...formTemplateToUpdate },
    })

    if (updatedFormTemplate) {
      setFormTemplate(updatedFormTemplate)
    }

    return { error }
  }

  return {
    updateFormTemplate,
  }
}
