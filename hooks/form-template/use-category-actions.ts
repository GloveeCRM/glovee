'use client'

import { FormCategoryType } from '@/lib/types/form'
import {
  createFormTemplateCategory,
  deleteFormTemplateCategory,
  updateFormTemplateCategories,
} from '@/lib/actions/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

interface CreateFormCategoryProps {
  newFormCategory: Partial<FormCategoryType>
}

interface CreateFormCategoryResponse {
  error?: string
}

interface UpdateFormTemplateCategoriesProps {
  formCategoriesToUpdate: Partial<FormCategoryType>[]
}

interface UpdateFormTemplateCategoriesResponse {
  error?: string
}

interface DeleteFormTemplateCategoryProps {
  formCategoryID: number
}

interface DeleteFormTemplateCategoryResponse {
  error?: string
}

export default function useFormCategoryActions() {
  const { formCategories, setFormCategories, formTemplateID } = useFormTemplateEditContext()

  async function createFormCategory({
    newFormCategory,
  }: CreateFormCategoryProps): Promise<CreateFormCategoryResponse> {
    const { formCategory, error } = await createFormTemplateCategory({
      formTemplateID,
      categoryName: newFormCategory.categoryName || '',
      categoryPosition: newFormCategory.categoryPosition || 0,
    })
    if (formCategory && !error) {
      setFormCategories([...(formCategories || []), formCategory])
    }
    return { error }
  }

  async function updateFormCategories({
    formCategoriesToUpdate,
  }: UpdateFormTemplateCategoriesProps): Promise<UpdateFormTemplateCategoriesResponse> {
    const { formCategories, error } = await updateFormTemplateCategories({
      formCategories: formCategoriesToUpdate,
    })
    if (!error) {
      setFormCategories(formCategories || [])
    }
    return { error }
  }

  async function deleteFormCategory({
    formCategoryID,
  }: DeleteFormTemplateCategoryProps): Promise<DeleteFormTemplateCategoryResponse> {
    const { formCategories, error } = await deleteFormTemplateCategory({ formCategoryID })
    if (!error) {
      setFormCategories(formCategories || [])
    }
    return { error }
  }

  return {
    createFormCategory,
    updateFormCategories,
    deleteFormCategory,
  }
}
