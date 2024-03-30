'use client'

import { v4 as uuidv4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useCategoryActions() {
  const { template, setTemplate } = useTemplateEditContext()
  const templateCategories = template?.categories || []

  function createCategoryInTemplate(templateId: string) {
    if (!template) return

    const updatedCategories = [
      ...templateCategories,
      {
        id: uuidv4(),
        title: 'Untitled Category',
        position: templateCategories.length + 1,
        templateId: templateId,
        sections: [],
      },
    ]

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeCategoryFromTemplate(categoryId: string) {
    if (!template) return

    const updatedCategories = templateCategories.filter((category) => category.id !== categoryId)

    setTemplate({ ...template, categories: updatedCategories })
  }

  function updateCategoryTitle(categoryId: string, title: string) {
    if (!template) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== categoryId) return category

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
