'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { generateRandomID } from '@/lib/utils/id'

export default function useSectionActions() {
  const { template, setTemplate, selectedCategoryID } = useTemplateEditContext()
  const templateCategories = template?.categories

  function createSectionInTemplateCategory(categoryID: number) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== categoryID) return category

      const updatedSections = [
        ...(category.sections || []),
        {
          id: generateRandomID(),
          name: 'Untitled Section',
          position: (category.sections?.length || 0) + 1,
          categoryID: category.id,
          questionSets: [],
        },
      ]

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeSectionFromTemplateCategory(sectionID: number) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== selectedCategoryID) return category

      const updatedSections = (category.sections || []).filter(
        (section) => section.id !== sectionID
      )

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function updateSectionName(sectionID: number, name: string) {
    if (!templateCategories) return

    const updatedCategories = templateCategories.map((category) => {
      if (category.id !== selectedCategoryID) return category

      const updatedSections = (category.sections || []).map((section) => {
        if (section.id !== sectionID) return section

        return { ...section, name }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    createSectionInTemplateCategory,
    removeSectionFromTemplateCategory,
    updateSectionName,
  }
}
