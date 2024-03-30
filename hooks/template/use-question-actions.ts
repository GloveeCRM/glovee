'use client'

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

  function removeQuestionFromSection(questionId: string) {
    if (!template || !template.categories) return

    const updatedCategories = template.categories.map((category) => {
      if (!category.sections) return category
      const updatedSections = category.sections.map((section) => {
        if (!section.questionSets) return section
        const updatedQuestionSets = section.questionSets.map((questionSet) => {
          if (!questionSet.questions) return questionSet
          const updatedQuestions = questionSet.questions.filter(
            (question) => question.id !== questionId
          )

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
    removeQuestionFromSection,
  }
}
