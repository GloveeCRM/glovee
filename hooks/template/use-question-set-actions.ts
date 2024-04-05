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

  function getQuestionSetsInSection(sectionId: string) {
    if (!template || !template.categories) return

    for (const category of template.categories) {
      if (!category.sections) continue

      for (const section of category.sections) {
        if (section.id === sectionId) return section.questionSets
      }
    }
  }

  function createQuestionSetInSection(sectionId: string, questionSet: TemplateQuestionSetType) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category
      const updatedSections = category.sections.map((section) => {
        if (section.id !== sectionId) return section

        const existingQuestionSets = section.questionSets || []

        const updatedQuestionSets = existingQuestionSets.map((existingQuestionSet) => {
          if (existingQuestionSet.position >= questionSet.position) {
            return { ...existingQuestionSet, position: existingQuestionSet.position + 1 }
          }
          return existingQuestionSet
        })

        updatedQuestionSets.splice(questionSet.position, 0, questionSet)

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

        let removedQuestionSetPosition: number | null = null

        const filteredQuestionSets = section.questionSets.filter((questionSet) => {
          if (questionSet.id === questionSetId) {
            removedQuestionSetPosition = questionSet.position
            return false
          }
          return true
        })

        const updatedQuestionSets = filteredQuestionSets.map((questionSet) => {
          if (
            removedQuestionSetPosition !== null &&
            questionSet.position > removedQuestionSetPosition
          ) {
            return { ...questionSet, position: questionSet.position - 1 }
          }
          return questionSet
        })

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    getQuestionSetById,
    getQuestionSetsInSection,
    createQuestionSetInSection,
    removeQuestionSetFromSection,
  }
}
