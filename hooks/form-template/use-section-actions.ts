'use client'

import { FormSectionType } from '@/lib/types/form'
import {
  createFormSection as createFormSectionRequest,
  updateFormTemplateSections,
  deleteFormTemplateSection,
} from '@/lib/actions/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

interface CreateFormSectionProps {
  newFormSection: Partial<FormSectionType>
}

interface CreateFormSectionResponse {
  error?: string
}

interface UpdateFormSectionsProps {
  formSectionsToUpdate: Partial<FormSectionType>[]
}

interface UpdateFormSectionsResponse {
  error?: string
}

interface DeleteFormSectionProps {
  formSectionID: number
}

interface DeleteFormSectionResponse {
  error?: string
}

export default function useFormSectionActions() {
  const { formSections, setFormSections } = useFormTemplateEditContext()

  async function createFormSection({
    newFormSection,
  }: CreateFormSectionProps): Promise<CreateFormSectionResponse> {
    const { formSection, error } = await createFormSectionRequest({
      formCategoryID: newFormSection.formCategoryID || 0,
      sectionName: newFormSection.sectionName || '',
      sectionPosition: newFormSection.sectionPosition || 0,
    })
    if (formSection && !error) {
      setFormSections([...(formSections || []), formSection])
    }
    return { error }
  }

  async function updateFormSections({
    formSectionsToUpdate,
  }: UpdateFormSectionsProps): Promise<UpdateFormSectionsResponse> {
    const { formSections, error } = await updateFormTemplateSections({
      formSections: formSectionsToUpdate,
    })
    if (!error) {
      setFormSections(formSections || [])
    }
    return { error }
  }

  async function deleteFormSection({
    formSectionID,
  }: DeleteFormSectionProps): Promise<DeleteFormSectionResponse> {
    const { formSections, error } = await deleteFormTemplateSection({
      formSectionID,
    })
    if (!error) {
      setFormSections(formSections || [])
    }
    return { error }
  }

  return {
    createFormSection,
    updateFormSections,
    deleteFormSection,
  }
}
