'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'

export default function useQuestionActions() {
  const { template, setTemplate } = useTemplateEditContext()

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

  return { removeQuestionFromSection }
}
