'use client'

import { TemplateQuestion } from '@prisma/client'
import { useTemplateEditContext } from '@/contexts/template-edit-context'

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

  function createQuestionInQuestionSet(questionSetId: string, question: TemplateQuestion) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        if (!section.questionSets) return section

        const updatedQuestionSets = section.questionSets.map((questionSet) => {
          if (questionSet.id !== questionSetId) return questionSet
          const existingQuestions = questionSet.questions || []

          const updatedQuestions = existingQuestions.map((existingQuestion) => {
            if (existingQuestion.position >= question.position) {
              return { ...existingQuestion, position: existingQuestion.position + 1 }
            }
            return existingQuestion
          })

          updatedQuestions.splice(question.position, 0, question)

          return { ...questionSet, questions: updatedQuestions }
        })

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  function removeQuestionFromQuestionSet(questionId: string) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category

      const updatedSections = category.sections.map((section) => {
        if (!section.questionSets) return section

        const updatedQuestionSets = section.questionSets.map((questionSet) => {
          if (!questionSet.questions) return questionSet

          let removedQuestionPosition: number | null = null

          const filteredQuestions = questionSet.questions.filter((question) => {
            if (question.id === questionId) {
              removedQuestionPosition = question.position
              return false
            }
            return true
          })

          const updatedQuestions = filteredQuestions.map((question) => {
            if (removedQuestionPosition !== null && question.position > removedQuestionPosition) {
              return { ...question, position: question.position - 1 }
            }
            return question
          })

          return { ...questionSet, questions: updatedQuestions }
        })

        return { ...section, questionSets: updatedQuestionSets }
      })

      return { ...category, sections: updatedSections }
    })

    setTemplate({ ...template, categories: updatedCategories })
  }

  return {
    getQuestionById,
    getQuestionsInQuestionSet,
    createQuestionInQuestionSet,
    removeQuestionFromSection: removeQuestionFromQuestionSet,
  }
}
