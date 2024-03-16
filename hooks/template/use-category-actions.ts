'use client'

import { v4 as uuidv4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useCategoryActions() {
  const { categories, setCategories } = useTemplateEditContext()

  function createCategoryInTemplate(templateId: string) {
    if (!categories) return

    const updatedCategories = [
      ...categories,
      {
        id: uuidv4(),
        title: 'Untitled Category',
        position: categories.length + 1,
        templateId: templateId,
        sections: [],
      },
    ]

    setCategories(updatedCategories)
  }

  function removeCategoryFromTemplate(categoryId: string) {
    if (!categories) return

    const updatedCategories = categories.filter((category) => category.id !== categoryId)

    setCategories(updatedCategories)
  }

  function updateCategoryTitle(categoryId: string, title: string) {
    if (!categories) return

    const updatedCategories = categories.map((category) => {
      if (category.id !== categoryId) return category

      return { ...category, title }
    })

    setCategories(updatedCategories)
  }

  return {
    createCategoryInTemplate,
    removeCategoryFromTemplate,
    updateCategoryTitle,
  }
}
