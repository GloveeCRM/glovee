'use client'

import { FormType } from '@/lib/types/form'
import { updateForm as updateFormRequest } from '@/lib/actions/form'
import { useFormContext } from '@/contexts/form-context'

interface UpdateFormProps {
  formToUpdate: Partial<FormType>
}

interface UpdateFormResponse {
  error?: string
}

export default function useFormActions() {
  const { form, setForm } = useFormContext()

  async function updateForm({ formToUpdate }: UpdateFormProps): Promise<UpdateFormResponse> {
    const { form: updatedForm, error } = await updateFormRequest({
      form: { ...form, ...formToUpdate },
    })

    if (updatedForm) {
      setForm(updatedForm)
    }

    return { error }
  }

  return {
    updateForm,
  }
}
