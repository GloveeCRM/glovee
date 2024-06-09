'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { generateRandomID } from '@/lib/utils/id'

export default function useCategoryActions() {
  const { template, setTemplate } = useTemplateEditContext()
  const templateCategories = template?.categories || []

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
  }
}
