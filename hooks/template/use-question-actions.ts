'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'

export default function useQuestionActions() {
  const { template, setTemplate } = useTemplateEditContext()

  function getQuestionById(questionId: string) {
    if (!template || !template.categories) return

    for (const category of template.categories) {
      if (!category.sections) continue

      for (const section of category.sections) {
        if (!section.questionSets) continue

        for (const questionSet of section.questionSets) {
          if (!questionSet.questions) continue

          for (const question of questionSet.questions) {
            if (question.id === questionId) return question
          }
        }
      }
    }
  }

  function getQuestionsInQuestionSet(questionSetId: string) {
    if (!template || !template.categories) return

    for (const category of template.categories) {
      if (!category.sections) continue

      for (const section of category.sections) {
        if (!section.questionSets) continue

        for (const questionSet of section.questionSets) {
          if (questionSet.id === questionSetId) return questionSet.questions
        }
      }
    }
  }

  function createQuestionInQuestionSet(questionSetId: string, newQuestion: TemplateQuestionType) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        const updatedQuestionSets = updateQuestionSetsWithNewQuestion(
          section.questionSets || [],
          questionSetId,
          newQuestion
        )

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function updateQuestionSetsWithNewQuestion(
    questionSets: TemplateQuestionSetType[],
    questionSetId: string,
    newQuestion: TemplateQuestionType
  ): TemplateQuestionSetType[] {
    return questionSets.map((questionSet) => {
      // If this is the target question set
      if (questionSet.id === questionSetId) {
        // Adjust positions for existing questions if necessary
        const updatedQuestions = [...(questionSet.questions || []), newQuestion]
          .map((question, index, arr) => {
            // Increment positions of questions that come after the new question's position
            if (question.position >= newQuestion.position && question.id !== newQuestion.id) {
              return { ...question, position: question.position + 1 }
            }
            return question
          })
          .sort((a, b) => a.position - b.position) // Ensure questions are sorted by their position after adjustment

        // Add the new question in its specified position
        return { ...questionSet, questions: updatedQuestions }
      } else if (questionSet.questionSets && questionSet.questionSets.length > 0) {
        // Recursively search for the target question set in nested question sets
        return {
          ...questionSet,
          questionSets: updateQuestionSetsWithNewQuestion(
            questionSet.questionSets,
            questionSetId,
            newQuestion
          ),
        }
      }
      return questionSet
    })
  }

  function removeQuestionFromQuestionSet(questionId: string) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        const updatedQuestionSets = removeQuestionFromQuestionSetsRecursively(
          section.questionSets || [],
          questionId
        )

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeQuestionFromQuestionSetsRecursively(
    questionSets: TemplateQuestionSetType[],
    questionId: string
  ) {
    return questionSets.map((questionSet) => {
      if (questionSet.questions) {
        let removedQuestionPosition: number | null = null

        // Filter out the question to be removed and capture its position
        const filteredQuestions = questionSet.questions.filter((question) => {
          if (question.id === questionId) {
            removedQuestionPosition = question.position
            return false // Remove this question
          }
          return true
        })

        // Adjust positions of remaining questions if necessary
        const updatedQuestions = filteredQuestions.map((question) => {
          if (removedQuestionPosition !== null && question.position > removedQuestionPosition) {
            return { ...question, position: question.position - 1 }
          }
          return question
        })

        questionSet = { ...questionSet, questions: updatedQuestions }
      }

      // Recursively handle nested question sets
      if (questionSet.questionSets) {
        questionSet = {
          ...questionSet,
          questionSets: removeQuestionFromQuestionSetsRecursively(
            questionSet.questionSets,
            questionId
          ),
        }
      }

      return questionSet
    })
  }

  return {
    getQuestionById,
    getQuestionsInQuestionSet,
    createQuestionInQuestionSet,
    removeQuestionFromSection: removeQuestionFromQuestionSet,
  }
}
