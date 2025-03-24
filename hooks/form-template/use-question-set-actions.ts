'use client'

import { FormQuestionSetType } from '@/lib/types/form'
import { createFormTemplateQuestionSet, deleteFormTemplateQuestionSet } from '@/lib/actions/form'
import { useFormContext } from '@/contexts/form-context'

interface CreateFormQuestionSetProps {
  newFormQuestionSet: Partial<FormQuestionSetType>
}

interface CreateFormQuestionSetResponse {
  error?: string
}

interface DeleteFormQuestionSetProps {
  formQuestionSetID: number
}

interface DeleteFormQuestionSetResponse {
  error?: string
}

export default function useQuestionSetActions() {
  const { setSelectedFormSectionQuestionSets, setSelectedFormSectionQuestions } = useFormContext()

  async function createFormQuestionSet({
    newFormQuestionSet,
  }: CreateFormQuestionSetProps): Promise<CreateFormQuestionSetResponse> {
    const { formQuestionSets, formQuestions, error } = await createFormTemplateQuestionSet({
      formQuestionSet: newFormQuestionSet,
    })
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function deleteFormQuestionSet({
    formQuestionSetID,
  }: DeleteFormQuestionSetProps): Promise<DeleteFormQuestionSetResponse> {
    const { formQuestionSets, error } = await deleteFormTemplateQuestionSet({
      formQuestionSetID,
    })
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
    }
    return { error }
  }

  // function getQuestionSetById(
  //   questionSetID: number,
  //   questionSets: FormQuestionSetType[] | null = null
  // ): FormQuestionSetType | null {
  //   if (!template || !template.categories) return null

  //   // If this is the initial call, start with the top-level question sets
  //   if (!questionSets) {
  //     if (!template || !template.categories) return null // No template or categories, return null

  //     // Flatten to get all top-level question sets
  //     questionSets = template.categories.flatMap((category) =>
  //       category.sections ? category.sections.flatMap((section) => section.questionSets || []) : []
  //     )
  //   }

  //   for (const questionSet of questionSets) {
  //     if (questionSet.id === questionSetID) return questionSet

  //     // If the question set has nested question sets, search recursively
  //     if (questionSet.questionSets) {
  //       const foundQuestionSet: FormQuestionSetType | null = getQuestionSetById(
  //         questionSetID,
  //         questionSet.questionSets
  //       )
  //       if (foundQuestionSet) return foundQuestionSet
  //     }
  //   }

  //   return null
  // }

  // function getQuestionSetsInSection(sectionID: number) {
  //   if (!template || !template.categories) return

  //   for (const category of template.categories) {
  //     if (!category.sections) continue

  //     for (const section of category.sections) {
  //       if (section.id === sectionID) {
  //         if (!section.questionSets) return []
  //         return section.questionSets.filter((qs) => qs.questionSetID === null)
  //       }
  //     }
  //   }
  // }

  // function createQuestionSetInSection(sectionID: number, newQuestionSet: FormQuestionSetType) {
  //   if (!template || !template.categories) return

  //   const updatedCategories = template.categories.map((category) => {
  //     if (!category.sections) return category

  //     const updatedSections = category.sections.map((section) => {
  //       if (section.id !== sectionID) return section

  //       const updatedQuestionSets = insertQuestionSetRecursively(
  //         section.questionSets || [],
  //         newQuestionSet
  //       )

  //       return { ...section, questionSets: updatedQuestionSets }
  //     })

  //     return { ...category, sections: updatedSections }
  //   })

  //   setTemplate({ ...template, categories: updatedCategories })
  // }

  // async function createQuestionSet(newQuestionSet: FormQuestionSetType) {
  //   await createQuestionSetAndQuestions(sessionUserID || 0, newQuestionSet)
  // }

  // function insertQuestionSetRecursively(
  //   existingQuestionSets: FormQuestionSetType[],
  //   newQuestionSet: FormQuestionSetType
  // ): FormQuestionSetType[] {
  //   // If the new question set has a parent ID, the logic for nesting inside a specific parent is applied
  //   if (newQuestionSet.questionSetID) {
  //     return existingQuestionSets.map((existingQuestionSet) => {
  //       if (existingQuestionSet.id === newQuestionSet.questionSetID) {
  //         // Here, you might adjust positions if necessary, before sorting
  //         let updatedChildQuestionSets = existingQuestionSet.questionSets
  //           ? existingQuestionSet.questionSets.map((qs) => ({
  //               ...qs,
  //               position: qs.position >= newQuestionSet.position ? qs.position + 1 : qs.position,
  //             }))
  //           : []

  //         updatedChildQuestionSets.push(newQuestionSet)

  //         return {
  //           ...existingQuestionSet,
  //           questionSets: updatePositions(updatedChildQuestionSets), // Re-index positions cleanly
  //         }
  //       } else if (existingQuestionSet.questionSets) {
  //         // Recursively search for the parent question set
  //         return {
  //           ...existingQuestionSet,
  //           questionSets: insertQuestionSetRecursively(
  //             existingQuestionSet.questionSets,
  //             newQuestionSet
  //           ),
  //         }
  //       }
  //       return existingQuestionSet
  //     })
  //   } else {
  //     // Adjust positions of all question sets that come after the new question set's position
  //     const updatedExistingQuestionSets = existingQuestionSets.map((questionSet) => {
  //       if (questionSet.position >= newQuestionSet.position) {
  //         return { ...questionSet, position: questionSet.position + 1 }
  //       }
  //       return questionSet
  //     })

  //     // Then, add the new question set to the collection
  //     updatedExistingQuestionSets.push(newQuestionSet)

  //     // Finally, return the updated list, sorted by position
  //     return updatedExistingQuestionSets.sort((a, b) => a.position - b.position)
  //   }
  // }

  // function updatePositions(questionSets: FormQuestionSetType[]): FormQuestionSetType[] {
  //   return questionSets
  //     .sort((a, b) => a.position - b.position)
  //     .map((questionSet, index) => ({ ...questionSet, position: index }))
  // }

  // function removeQuestionSetFromSection(questionSetID: number) {
  //   if (!template || !template.categories) return

  //   const updatedCategories = template.categories.map((category) => {
  //     if (!category.sections) return category

  //     const updatedSections = category.sections.map((section) => {
  //       const updatedQuestionSets = removeQuestionSetRecursively(
  //         section.questionSets || [],
  //         questionSetID,
  //         null
  //       )

  //       return { ...section, questionSets: updatedQuestionSets }
  //     })

  //     return { ...category, sections: updatedSections }
  //   })

  //   setTemplate({ ...template, categories: updatedCategories })
  // }

  // function removeQuestionSetRecursively(
  //   existingQuestionSets: FormQuestionSetType[],
  //   questionSetIDToRemove: number,
  //   removedQuestionSetPosition: number | null = null // Default to null when not provided
  // ): FormQuestionSetType[] {
  //   let isRemoved = false
  //   let updatedQuestionSets = existingQuestionSets.reduce<FormQuestionSetType[]>(
  //     (acc, questionSet) => {
  //       if (questionSet.id === questionSetIDToRemove) {
  //         // Capture the position of the question set being removed
  //         removedQuestionSetPosition = questionSet.position
  //         isRemoved = true // Mark as removed, but don't add to accumulator
  //         return acc
  //       }
  //       acc.push(questionSet)
  //       return acc
  //     },
  //     []
  //   )

  //   if (isRemoved && removedQuestionSetPosition !== null) {
  //     // If a question set was removed, decrement positions of subsequent question sets
  //     updatedQuestionSets = updatedQuestionSets.map((questionSet) => {
  //       if (
  //         removedQuestionSetPosition !== null &&
  //         questionSet.position > removedQuestionSetPosition
  //       ) {
  //         // Decrement position by 1 for question sets after the removed one
  //         return { ...questionSet, position: questionSet.position - 1 }
  //       } else if (questionSet.questionSets && questionSet.questionSets.length > 0) {
  //         // Recursively adjust positions within nested question sets
  //         return {
  //           ...questionSet,
  //           questionSets: removeQuestionSetRecursively(
  //             questionSet.questionSets,
  //             questionSetIDToRemove,
  //             removedQuestionSetPosition
  //           ),
  //         }
  //       }
  //       return questionSet
  //     })
  //   } else if (!isRemoved) {
  //     // If no question set was removed at this level, try to remove from nested question sets
  //     updatedQuestionSets = existingQuestionSets.map((questionSet) => {
  //       if (questionSet.questionSets && questionSet.questionSets.length > 0) {
  //         return {
  //           ...questionSet,
  //           questionSets: removeQuestionSetRecursively(
  //             questionSet.questionSets,
  //             questionSetIDToRemove,
  //             null // Explicitly pass null to indicate no removal has been done yet
  //           ),
  //         }
  //       }
  //       return questionSet
  //     })
  //   }

  //   return updatedQuestionSets
  // }

  return {
    createFormQuestionSet,
    deleteFormQuestionSet,
    // createQuestionSet,
    // getQuestionSetById,
    // getQuestionSetsInSection,
    // createQuestionSetInSection,
    // removeQuestionSetFromSection,
  }
}
