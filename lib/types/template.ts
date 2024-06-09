import {
  QuestionType,
  BaseQuestionSettings,
  CheckboxQuestionSettings,
  RadioQuestionSettings,
  RadioQuestionType,
} from './qusetion'

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
  dependsOn?: any
  sectionID: number
  questionSetID?: number | null
  questionSets?: TemplateQuestionSetType[]
  questions?: QuestionType[]
}
