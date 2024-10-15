'use client'

import { useAuthContext } from '@/contexts/auth-context'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { createFormCategory } from '@/lib/actions/form'
import { generateRandomID } from '@/lib/utils/id'

export default function useCategoryActions() {
  const { template, setTemplate, formCategories, setFormCategories } = useTemplateEditContext()
  const templateCategories = template?.categories || []

  const { sessionUserID } = useAuthContext()

  async function createCategory(formID: number) {
    if (!formID) return

    const newCategory = {
      categoryName: 'Untitled Category',
      categoryPosition: templateCategories.length + 1,
      formID: formID,
    }
    const { formCategory } = await createFormCategory({
      userID: sessionUserID || 0,
      formCategory: newCategory,
    })
    if (formCategory) {
      setFormCategories([...(formCategories || []), formCategory])
    } else {
      console.error('Failed to create form category')
    }
  }

  function createCategoryInTemplate(templateID: number) {
    if (!template) return

    const updatedCategories = [
      ...templateCategories,
      {
        id: generateRandomID(),
        name: 'Untitled Category',
        position: templateCategories.length + 1,
        templateID: templateID,
        sections: [],
      },
    ]

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeCategoryFromTemplate(categoryID: number) {
    if (!template) return

    const updatedCategories = templateCategories.filter((category) => category.id !== categoryID)

    setTemplate({ ...template, categories: updatedCategories })
  }

  function updateTemplateCategoryName(categoryID: number, name: string) {
    if (!template) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== categoryID) return category

      return { ...category, name }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    createCategoryInTemplate,
    removeCategoryFromTemplate,
    updateTemplateCategoryName,
    createCategory,
  }
}
