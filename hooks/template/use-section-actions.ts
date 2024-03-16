'use client'

import { v4 as uuidv4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useSectionActions() {
  const { template, setTemplate, selectedCategoryId } = useTemplateEditContext()
  const templateCategories = template?.categories

  function createSectionInCategory(categoryId: string) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== categoryId) return category

      const updatedSections = [
        ...(category.sections || []),
        {
          id: uuidv4(),
          title: 'Untitled Section',
          position: (category.sections?.length || 0) + 1,
          categoryId: category.id,
          questionSets: [],
        },
      ]

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeSectionFromCategory(sectionId: string) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== selectedCategoryId) return category

      const updatedSections = (category.sections || []).filter(
        (section) => section.id !== sectionId
      )

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function updateSectionTitle(sectionId: string, title: string) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== selectedCategoryId) return category

      const updatedSections = (category.sections || []).map((section) => {
        if (section.id !== sectionId) return section

        return { ...section, title }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    createSectionInCategory,
    removeSectionFromCategory,
    updateSectionTitle,
  }
}
