export type TemplateType = {
  id: number
  organizationID: number
  name: string
  description?: string
  categories?: TemplateCategoryType[]
}

export type TemplateCategoryType = {
  id: number
  name: string
  position: number
  templateID: number
  sections?: TemplateSectionType[]
}

export type TemplateSectionType = {
  id: number
  name: string
  position: number
  categoryID: number
  questionSets?: TemplateQuestionSetType[]
}

export enum TemplateQuestionSetTypes {
  FLAT = 'FLAT',
  LOOP = 'LOOP',
  DEPENDS_ON = 'DEPENDS_ON',
}

export type TemplateQuestionSetType = {
  id: number
  type: TemplateQuestionSetTypes
  position: number
  dependsOn?: Record<string, any>
  sectionID: number
  questionSetID?: number | null
  questionSets?: TemplateQuestionSetType[]
  questions?: TemplateQuestionType[]
}

export enum TemplateQuestionTypes {
  TEXT_INPUT = 'TEXT_INPUT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  DATE_INPUT = 'DATE_INPUT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DOCUMENT = 'DOCUMENT',
}

export type BaseSettingsType = Record<string, any>

export type TemplateQuestionType = {
  id: number
  type: TemplateQuestionTypes
  prompt: string
  position: number
  helperText?: string
  settings?: BaseSettingsType
  questionSetId: number
}
