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
    // If the new question set has a parent ID, the logic for nesting inside a specific parent is applied
    if (newQuestionSet.questionSetId) {
      return existingQuestionSets.map((existingQuestionSet) => {
        if (existingQuestionSet.id === newQuestionSet.questionSetId) {
          // Here, you might adjust positions if necessary, before sorting
          let updatedChildQuestionSets = existingQuestionSet.questionSets
            ? [...existingQuestionSet.questionSets, newQuestionSet]
            : [newQuestionSet]

          updatedChildQuestionSets = updatePositions(updatedChildQuestionSets)

          return {
            ...existingQuestionSet,
            questionSets: updatedChildQuestionSets.sort((a, b) => a.position - b.position),
          }
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
      // Adjust positions of all question sets that come after the new question set's position
      const updatedExistingQuestionSets = existingQuestionSets.map((questionSet) => {
        if (questionSet.position >= newQuestionSet.position) {
          return { ...questionSet, position: questionSet.position + 1 }
        }
        return questionSet
      })

      // Then, add the new question set to the collection
      updatedExistingQuestionSets.push(newQuestionSet)

      // Finally, return the updated list, sorted by position
      return updatedExistingQuestionSets.sort((a, b) => a.position - b.position)
    }
  }

  function updatePositions(questionSets: TemplateQuestionSetType[]): TemplateQuestionSetType[] {
    return questionSets
      .sort((a, b) => a.position - b.position)
      .map((questionSet, index) => ({ ...questionSet, position: index }))
  }

  function removeQuestionSetFromSection(questionSetId: string) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        const updatedQuestionSets = removeQuestionSetRecursively(
          section.questionSets || [],
          questionSetId,
          null
        )

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeQuestionSetRecursively(
    existingQuestionSets: TemplateQuestionSetType[],
    questionSetIdToRemove: string,
    removedQuestionSetPosition: number | null
  ): TemplateQuestionSetType[] {
    // First pass to remove the question set and find the position of the removed question set
    let isRemoved = false
    let updatedQuestionSets = existingQuestionSets.reduce<TemplateQuestionSetType[]>(
      (acc, questionSet) => {
        if (questionSet.id === questionSetIdToRemove) {
          removedQuestionSetPosition = questionSet.position
          isRemoved = true
          return acc // Skip this question set
        }
        acc.push(questionSet)
        return acc
      },
      []
    )

    if (isRemoved && removedQuestionSetPosition !== null) {
      // Second pass to update positions if a question set was removed
      updatedQuestionSets = updatedQuestionSets.map((questionSet) => {
        if (removedQuestionSetPosition && questionSet.position > removedQuestionSetPosition) {
          return { ...questionSet, position: questionSet.position - 1 }
        } else if (questionSet.questionSets && questionSet.questionSets.length > 0) {
          // Recursively adjust positions in nested question sets
          return {
            ...questionSet,
            questionSets: removeQuestionSetRecursively(
              questionSet.questionSets,
              questionSetIdToRemove,
              removedQuestionSetPosition
            ),
          }
        }
        return questionSet
      })
    } else {
      // No question set was removed at this level, recursively try to remove from nested question sets
      updatedQuestionSets = existingQuestionSets.map((questionSet) => {
        if (questionSet.questionSets && questionSet.questionSets.length > 0) {
          return {
            ...questionSet,
            questionSets: removeQuestionSetRecursively(
              questionSet.questionSets,
              questionSetIdToRemove,
              null
            ),
          }
        }
        return questionSet
      })
    }

    return updatedQuestionSets
  }

  return {
    getQuestionSetById,
    getQuestionSetsInSection,
    createQuestionSetInSection,
    removeQuestionSetFromSection,
  }
}
