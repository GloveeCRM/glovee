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

  function createQuestionSetInSection(sectionId: string, newQuestionSet: TemplateQuestionSetType) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        if (section.id !== sectionId) return section

        const updatedQuestionSets = insertQuestionSetRecursively(
          section.questionSets || [],
          newQuestionSet
        )

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function insertQuestionSetRecursively(
    existingQuestionSets: TemplateQuestionSetType[],
    newQuestionSet: TemplateQuestionSetType
  ): TemplateQuestionSetType[] {
    // If the new question set has a parent ID, try to find the parent and insert the new question set into its children
    if (newQuestionSet.questionSetId) {
      return existingQuestionSets.map((existingQuestionSet) => {
        if (existingQuestionSet.id === newQuestionSet.questionSetId) {
          // Adjust positions for existing question sets if necessary
          const updatedChildQuestionSets = existingQuestionSet.questionSets
            ? [...existingQuestionSet.questionSets, newQuestionSet].sort(
                (a, b) => a.position - b.position
              )
            : [newQuestionSet]

          return { ...existingQuestionSet, questionSets: updatedChildQuestionSets }
        } else if (existingQuestionSet.questionSets) {
          // Recursively search for the parent question set
          return {
            ...existingQuestionSet,
            questionSets: insertQuestionSetRecursively(
              existingQuestionSet.questionSets,
              newQuestionSet
            ),
          }
        }
        return existingQuestionSet
      })
    } else {
      // If there is no parent ID, the new question set is being added to the top level
      return [...existingQuestionSets, newQuestionSet].sort((a, b) => a.position - b.position)
    }
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
