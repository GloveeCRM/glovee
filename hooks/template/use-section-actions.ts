'use client'

import { v4 as uuidv4 } from 'uuid'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useSectionActions() {
  const { categories, setCategories, selectedCategoryId } = useTemplateEditContext()

  function createSectionInCategory(categoryId: string) {
    if (!categories) return

    const updatedCategories = categories.map((category) => {
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

    setCategories(updatedCategories)
  }

  function removeSectionFromCategory(sectionId: string) {
    if (!categories) return

    const updatedCategories = categories.map((category) => {
      if (category.id !== selectedCategoryId) return category

      const updatedSections = (category.sections || []).filter(
        (section) => section.id !== sectionId
      )

      return { ...category, sections: updatedSections }
    })

    setCategories(updatedCategories)
  }

  function updateSectionTitle(sectionId: string, title: string) {
    if (!categories) return

    const updatedCategories = categories.map((category) => {
      if (category.id !== selectedCategoryId) return category

      const updatedSections = (category.sections || []).map((section) => {
        if (section.id !== sectionId) return section

        return { ...section, title }
      })

      return { ...category, sections: updatedSections }
    })

    setCategories(updatedCategories)
  }

  return {
    createSectionInCategory,
    removeSectionFromCategory,
    updateSectionTitle,
  }
}
