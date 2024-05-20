'use client'

import { v4 as uuid4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { generateRandomId } from '@/lib/utils/id'

export default function useCategoryActions() {
  const { template, setTemplate } = useTemplateEditContext()
  const templateCategories = template?.categories || []

  function createCategoryInTemplate(templateID: number) {
    if (!template) return

    const updatedCategories = [
      ...templateCategories,
      {
        id: generateRandomId(),
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

  function updateCategoryTitle(categoryID: number, title: string) {
    if (!template) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== categoryID) return category

      return { ...category, title }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    createCategoryInTemplate,
    removeCategoryFromTemplate,
    updateCategoryTitle,
  }
}
