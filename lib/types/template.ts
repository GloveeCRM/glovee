import { FormType } from './form'
import { QuestionType } from './qusetion'
import { UserType } from './user'

export type FormTemplateType = {
  id: number
  name: string
  description?: string
  categories?: TemplateCategoryType[]
  formTemplateID: number
  organizationID: number
  createdBy: UserType
  createdAt: string
  updatedAt: string
  form?: FormType
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
  dependsOn?: number
  sectionID: number
  questionSetID?: number | null
  questionSets?: TemplateQuestionSetType[]
  questions?: QuestionType[]
}
