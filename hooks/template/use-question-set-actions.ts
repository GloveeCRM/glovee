'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateQuestionSetType } from '@/lib/types/template'

export default function useQuestionSetActions() {
  const { template, setTemplate } = useTemplateEditContext()

  function getQuestionSetById(questionSetId: string) {
    if (!template || !template.categories) return

    for (const category of template.categories) {
      if (!category.sections) continue

      for (const section of category.sections) {
        if (!section.questionSets) continue

        for (const questionSet of section.questionSets) {
          if (questionSet.id === questionSetId) return questionSet
        }
      }
    }
  }

  function createQuestionSetInSection(sectionId: string, questionSet: TemplateQuestionSetType) {
    if (!template || !template.categories) return
    console.log('sectionId', sectionId)
    console.log('creating question set')

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category
      const updatedSections = category.sections.map((section) => {
        if (section.id !== sectionId) return section

        const updatedQuestionSets = [...(section.questionSets || []), questionSet]
        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeQuestionSetFromSection(questionSetId: string) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category
      const updatedSections = category.sections.map((section) => {
        if (!section.questionSets) return section
        const updatedQuestionSets = section.questionSets.filter(
          (questionSet) => questionSet.id !== questionSetId
        )

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    getQuestionSetById,
    createQuestionSetInSection,
    removeQuestionSetFromSection,
  }
}
