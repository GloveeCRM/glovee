'use client'

import { useAuthContext } from '@/contexts/auth-context'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { createFormSection } from '@/lib/actions/form'
import { generateRandomID } from '@/lib/utils/id'

export default function useSectionActions() {
  const { template, setTemplate, selectedCategoryID, setFormCategories, formCategories } =
    useTemplateEditContext()
  const templateCategories = template?.categories

  const { sessionUserID } = useAuthContext()

  async function createSection(categoryID: number) {
    if (!categoryID) return

    const categorySections = formCategories?.find(
      (category) => category.id === categoryID
    )?.sections

    const newFormSection = {
      sectionName: 'Untitled Section',
      sectionPosition: (categorySections?.length || 0) + 1,
      categoryID: categoryID,
    }

    const { formSection } = await createFormSection({
      userID: sessionUserID || 0,
      formSection: newFormSection,
    })
    if (formSection) {
      const updatedCategories = formCategories?.map((category) => {
        if (category.id !== categoryID) return category

        const updatedSections = [...(category.sections || []), formSection]

        return { ...category, sections: updatedSections }
      })

      if (updatedCategories) {
        setFormCategories(updatedCategories)
      } else {
        console.error('Failed to update form categories')
      }
    } else {
      console.error('Failed to create form section')
    }
  }

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
    createSection,
  }
}
