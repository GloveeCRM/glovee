import { TemplateCategoryType, TemplateQuestionSetType, TemplateType } from '../types/template'

export function setTemplateOnLocalStorage(templateId: string, template: TemplateType) {
  localStorage.setItem(`template_${templateId}`, JSON.stringify(template))
}

export function getTemplateFromLocalStorage(templateId: string): TemplateType | null {
  const localTemplate = localStorage.getItem(`template_${templateId}`)
  return localTemplate ? JSON.parse(localTemplate) : null
}

export function formatTemplate(template: TemplateType): TemplateType {
  // Deep copy the template to avoid mutating the original data
  let formattedTemplate = JSON.parse(JSON.stringify(template))

  // Function to recursively nest question sets
  function nestQuestionSets(questionSets: TemplateQuestionSetType[]) {
    let nestedQuestionSets: TemplateQuestionSetType[] = []
    let questionSetMap: Record<string, TemplateQuestionSetType> = {}

    // Initialize the map and separate top-level question sets
    questionSets.forEach((qs) => {
      qs.questionSets = [] // Prepare for nesting
      questionSetMap[qs.id] = qs
      if (!qs.questionSetId) {
        nestedQuestionSets.push(qs)
      }
    })

    // Nest question sets
    questionSets.forEach((qs) => {
      if (!qs.questionSetId) return
      if (qs.questionSetId && questionSetMap[qs.questionSetId]) {
        questionSetMap[qs.questionSetId].questionSets?.push(qs)
      }
    })

    return nestedQuestionSets
  }

  // Apply the nesting to each section's question sets
  formattedTemplate.categories.forEach((category: TemplateCategoryType) => {
    if (!category.sections) return

    category.sections.forEach((section) => {
      if (!section.questionSets) return
      section.questionSets = nestQuestionSets(section.questionSets)
    })
  })

  return formattedTemplate
}
