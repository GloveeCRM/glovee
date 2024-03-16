import { TemplateType } from '../types/template'

export function setTemplateOnLocalStorage(templateId: string, template: TemplateType) {
  localStorage.setItem(`template_${templateId}`, JSON.stringify(template))
}

export function getTemplateFromLocalStorage(templateId: string): TemplateType | null {
  const localTemplate = localStorage.getItem(`template_${templateId}`)
  return localTemplate ? JSON.parse(localTemplate) : null
}
