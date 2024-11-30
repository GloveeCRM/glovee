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
  questions?: FormQuestionType[]
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

export enum FormQuestionTypes {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  DATE = 'date',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  FILE = 'file',
}

export type FormQuestionType = {
  formQuestionID: number
  formQuestionSetID: number
  formQuestionPrompt: string
  formQuestionType: FormQuestionTypes
  formQuestionPosition: number
  createdAt: string
  questionSettings: FormQuestionSettingsType
}

export type FormQuestionSettingsType = {
  formQuestionSettingsID: number
  formQuestionID: number
  helperText: string
  isRequired: boolean
  createdAt: string
}

export function isTextQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.TEXT
}

export function isTextareaQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.TEXTAREA
}

export function isSelectQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.SELECT
}

export function isDateQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.DATE
}

export function isRadioQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.RADIO
}

export function isCheckboxQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.CHECKBOX
}

export function isFileQuestionType(question: FormQuestionType) {
  return question.formQuestionType === FormQuestionTypes.FILE
}
