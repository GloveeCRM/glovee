import { QuestionType } from './qusetion'
import { UserType } from './user'

export type FormTemplateType = {
  formTemplateID: number
  organizationID: number
  formID: number
  templateName: string
  createdBy: UserType
  createdAt: string
  form: FormType
}

export enum FormStatusTypes {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
}

export enum FormRoleTypes {
  MAIN = 'MAIN',
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  OTHER = 'OTHER',
}

export type FormType = {
  formID: number
  createdBy: UserType
  createdAt: string
  categories?: FormCategoryType[]
}

export type FormCategoryType = {
  formCategoryID: number
  formID: number
  categoryName: string
  categoryPosition: number
  createdAt: string
  completionRate: number
  sections?: FormSectionType[]
}

export type FormSectionType = {
  formSectionID: number
  formCategoryID: number
  sectionName: string
  sectionPosition: number
  createdAt: string
  completionRate: number
  questionSets?: FormQuestionSetType[]
}

export enum FormQuestionSetTypes {
  STATIC = 'static',
  REPEATABLE = 'repeatable',
  CONDITIONAL = 'conditional',
}

export type FormQuestionSetType = {
  formQuestionSetID: number
  formSectionID: number
  parentFormQuestionSetID?: number
  formQuestionSetType: FormQuestionSetTypes
  formQuestionSetPosition: number
  dependsOnOptionID?: number
  createdAt: string
  questionSets?: FormQuestionSetType[]
  questions?: QuestionType[]
}

export function isStaticQuestionSetType(questionSet: FormQuestionSetType) {
  return questionSet.formQuestionSetType === FormQuestionSetTypes.STATIC
}

export function isRepeatableQuestionSetType(questionSet: FormQuestionSetType) {
  return questionSet.formQuestionSetType === FormQuestionSetTypes.REPEATABLE
}

export function isConditionalQuestionSetType(questionSet: FormQuestionSetType) {
  return questionSet.formQuestionSetType === FormQuestionSetTypes.CONDITIONAL
}
