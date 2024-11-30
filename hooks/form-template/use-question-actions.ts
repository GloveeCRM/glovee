'use client'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { QuestionType } from '@/lib/types/qusetion'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import { FormQuestionType } from '@/lib/types/form'
import {
  createFormTemplateQuestion,
  deleteFormTemplateQuestion,
  updateFormTemplateQuestion,
} from '@/lib/actions/form'

interface CreateFormQuestionProps {
  newFormQuestion: Partial<FormQuestionType>
}

interface CreateFormQuestionResponse {
  error?: string
}

interface UpdateFormQuestionProps {
  updatedFormQuestion: Partial<FormQuestionType>
}

interface UpdateFormQuestionResponse {
  error?: string
}

interface DeleteFormQuestionProps {
  formQuestionID: number
}

interface DeleteFormQuestionResponse {
  error?: string
}

export default function useQuestionActions() {
  const { setSelectedFormSectionQuestions } = useFormTemplateEditContext()

  async function createFormQuestion({
    newFormQuestion,
  }: CreateFormQuestionProps): Promise<CreateFormQuestionResponse> {
    const { formQuestions, error } = await createFormTemplateQuestion({
      formQuestion: newFormQuestion,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function updateFormQuestion({
    updatedFormQuestion,
  }: UpdateFormQuestionProps): Promise<UpdateFormQuestionResponse> {
    const { formQuestions, error } = await updateFormTemplateQuestion({
      updatedFormQuestion,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function deleteFormQuestion({
    formQuestionID,
  }: DeleteFormQuestionProps): Promise<DeleteFormQuestionResponse> {
    const { formQuestions, error } = await deleteFormTemplateQuestion({
      formQuestionID,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  // function getTemplateQuestionByID(questionID: number) {
  //   if (!template || !template.categories) return null

  //   function searchQuestions(questionSets: TemplateQuestionSetType[]): QuestionType | null {
  //     for (const questionSet of questionSets) {
  //       for (const question of questionSet.questions || []) {
  //         if (question.id === questionID) return question
  //       }

  //       // Recursively search in nested question sets, if any
  //       if (questionSet.questionSets && questionSet.questionSets.length > 0) {
  //         const foundQuestion = searchQuestions(questionSet.questionSets)
  //         if (foundQuestion) return foundQuestion
  //       }
  //     }
  //     return null
  //   }

  //   for (const category of template.categories) {
  //     if (!category.sections) continue

  //     for (const section of category.sections) {
  //       if (!section.questionSets) continue

  //       const foundQuestion = searchQuestions(section.questionSets)
  //       if (foundQuestion) return foundQuestion
  //     }
  //   }

  //   return null
  // }

  // function getQuestionsInQuestionSet(questionSetID: number) {
  //   if (!template || !template.categories) return

  //   // Recursive helper function to search within nested question sets
  //   function searchQuestionSets(questionSets: TemplateQuestionSetType[]): QuestionType[] | null {
  //     for (const questionSet of questionSets) {
  //       // Base case: if the current question set matches, return its questions
  //       if (questionSet.id === questionSetID) return questionSet.questions || null

  //       // Recursive case: if the question set has nested question sets, search within them
  //       if (questionSet.questionSets && questionSet.questionSets.length > 0) {
  //         const foundQuestions = searchQuestionSets(questionSet.questionSets)
  //         if (foundQuestions) return foundQuestions // If questions are found in deeper layers, return them
  //       }
  //     }
  //     return null // Return null if no matching question set is found at any level
  //   }

  //   // Iterating through categories and sections to find and search within the question sets
  //   for (const category of template.categories) {
  //     if (!category.sections) continue

  //     for (const section of category.sections) {
  //       if (!section.questionSets) continue

  //       // Call the recursive helper function to search within this section's question sets
  //       const foundQuestions = searchQuestionSets(section.questionSets)
  //       if (foundQuestions) return foundQuestions // If the matching question set was found, return its questions
  //     }
  //   }

  //   return null // Return null if no matching question set is found in any section
  // }

  // function createQuestionInQuestionSet(questionSetID: number, newQuestion: QuestionType) {
  //   if (!template || !template.categories) return

  //   const updatedCategories = template.categories.map((category) => {
  //     if (!category.sections) return category

  //     const updatedSections = category.sections.map((section) => {
  //       const updatedQuestionSets = updateQuestionSetsWithNewQuestion(
  //         section.questionSets || [],
  //         questionSetID,
  //         newQuestion
  //       )

  //       return { ...section, questionSets: updatedQuestionSets }
  //     })

  //     return { ...category, sections: updatedSections }
  //   })

  //   setTemplate({ ...template, categories: updatedCategories })
  // }

  // function updateQuestionSetsWithNewQuestion(
  //   questionSets: TemplateQuestionSetType[],
  //   questionSetID: number,
  //   newQuestion: QuestionType
  // ): TemplateQuestionSetType[] {
  //   return questionSets.map((questionSet) => {
  //     // If this is the target question set
  //     if (questionSet.id === questionSetID) {
  //       // Adjust positions for existing questions if necessary
  //       const updatedQuestions = [...(questionSet.questions || []), newQuestion]
  //         .map((question, index, arr) => {
  //           // Increment positions of questions that come after the new question's position
  //           if (question.position >= newQuestion.position && question.id !== newQuestion.id) {
  //             return { ...question, position: question.position + 1 }
  //           }
  //           return question
  //         })
  //         .sort((a, b) => a.position - b.position) // Ensure questions are sorted by their position after adjustment

  //       // Add the new question in its specified position
  //       return { ...questionSet, questions: updatedQuestions }
  //     } else if (questionSet.questionSets && questionSet.questionSets.length > 0) {
  //       // Recursively search for the target question set in nested question sets
  //       return {
  //         ...questionSet,
  //         questionSets: updateQuestionSetsWithNewQuestion(
  //           questionSet.questionSets,
  //           questionSetID,
  //           newQuestion
  //         ),
  //       }
  //     }
  //     return questionSet
  //   })
  // }

  // function removeQuestionFromQuestionSet(questionID: number) {
  //   if (!template || !template.categories) return

  //   const updatedCategories = template.categories.map((category) => {
  //     if (!category.sections) return category

  //     const updatedSections = category.sections.map((section) => {
  //       const updatedQuestionSets = removeQuestionFromQuestionSetsRecursively(
  //         section.questionSets || [],
  //         questionID
  //       )

  //       return { ...section, questionSets: updatedQuestionSets }
  //     })

  //     return { ...category, sections: updatedSections }
  //   })

  //   setTemplate({ ...template, categories: updatedCategories })
  // }

  // function removeQuestionFromQuestionSetsRecursively(
  //   questionSets: TemplateQuestionSetType[],
  //   questionID: number
  // ) {
  //   return questionSets.map((questionSet) => {
  //     if (questionSet.questions) {
  //       let removedQuestionPosition: number | null = null

  //       // Filter out the question to be removed and capture its position
  //       const filteredQuestions = questionSet.questions.filter((question) => {
  //         if (question.id === questionID) {
  //           removedQuestionPosition = question.position
  //           return false // Remove this question
  //         }
  //         return true
  //       })

  //       // Adjust positions of remaining questions if necessary
  //       const updatedQuestions = filteredQuestions.map((question) => {
  //         if (removedQuestionPosition !== null && question.position > removedQuestionPosition) {
  //           return { ...question, position: question.position - 1 }
  //         }
  //         return question
  //       })

  //       questionSet = { ...questionSet, questions: updatedQuestions }
  //     }

  //     // Recursively handle nested question sets
  //     if (questionSet.questionSets) {
  //       questionSet = {
  //         ...questionSet,
  //         questionSets: removeQuestionFromQuestionSetsRecursively(
  //           questionSet.questionSets,
  //           questionID
  //         ),
  //       }
  //     }

  //     return questionSet
  //   })
  // }

  // function updateQuestion(updatedQuestion: QuestionType) {
  //   if (!template || !template.categories) return

  //   const updatedCategories = template.categories.map((category) => {
  //     if (!category.sections) return category

  //     const updatedSections = category.sections.map((section) => {
  //       const updatedQuestionSets =
  //         section.questionSets?.map((questionSet) => {
  //           return updateQuestionInQuestionSet(questionSet, updatedQuestion)
  //         }) || []

  //       return { ...section, questionSets: updatedQuestionSets }
  //     })

  //     return { ...category, sections: updatedSections }
  //   })

  //   setTemplate({ ...template, categories: updatedCategories })
  // }

  // function updateQuestionInQuestionSet(
  //   questionSet: TemplateQuestionSetType,
  //   updatedQuestion: QuestionType
  // ): TemplateQuestionSetType {
  //   // Update questions in the current question set
  //   const updatedQuestions =
  //     questionSet.questions?.map((question) => {
  //       if (question.id === updatedQuestion.id) {
  //         // Merge old question data with new updates
  //         return { ...question, ...updatedQuestion }
  //       }
  //       return question
  //     }) || []

  //   // Recursively update nested question sets if any
  //   const updatedNestedQuestionSets =
  //     questionSet.questionSets?.map((nestedQuestionSet) => {
  //       return updateQuestionInQuestionSet(nestedQuestionSet, updatedQuestion)
  //     }) || []

  //   return { ...questionSet, questions: updatedQuestions, questionSets: updatedNestedQuestionSets }
  // }

  return {
    createFormQuestion,
    deleteFormQuestion,
    updateFormQuestion,
    // getTemplateQuestionByID,
    // getQuestionsInQuestionSet,
    // createQuestionInQuestionSet,
    // removeQuestionFromQuestionSet,
    // updateQuestion,
  }
}
