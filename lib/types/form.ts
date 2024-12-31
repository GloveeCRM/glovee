import { FileType } from './file'
import { UserType } from './user'

export type FormTemplateType = {
  formTemplateID: number
  organizationID: number
  formID: number
  templateName: string
  templateDescription: string
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

export type ApplicationFormType = {
  applicationFormID: number
  applicationID: number
  organizationID: number
  formID: number
  createdBy: UserType
  createdAt: string
  form: FormType
}

export type FormType = {
  formID: number
  completionRate: number
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

export type FormQuestionDefaultOptionType = {
  formQuestionID: number
  formQuestionOptionID: number
}

export type FormQuestionType = {
  formQuestionID: number
  formQuestionSetID: number
  formQuestionPrompt: string
  formQuestionType: FormQuestionTypes
  formQuestionPosition: number
  createdAt: string
  formQuestionSettings: FormQuestionSettingsType
  formQuestionOptions: FormQuestionOptionType[]
  formQuestionDefaultOptions: FormQuestionDefaultOptionType[]
  answer?: FormAnswerType
}

export enum FormQuestionDisplayTypes {
  BLOCK = 'block',
  INLINE = 'inline',
}

export type FormQuestionSettingsType = {
  formQuestionSettingsID: number
  formQuestionID: number
  helperText: string
  isRequired: boolean
  placeholderText: string
  minimumLength: number
  maximumLength: number
  minimumDate: string
  maximumDate: string
  displayType: FormQuestionDisplayTypes
  createdAt: string
}

export type FormQuestionOptionType = {
  formQuestionOptionID: number
  formQuestionID: number
  optionText: string
  optionPosition: number
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

export type FormAnswerType = {
  formAnswerID: number
  formQuestionID: number
  answerText: string
  answerDate: string
  isAcceptable: boolean
  createdAt: string
  updatedAt: string
  answerFiles: Partial<FormAnswerFileType>[]
  answerOptions: Partial<FormAnswerOptionType>[]
}

export type FormAnswerOptionType = {
  formAnswerID: number
  formQuestionOptionID: number
  createdAt: string
}

export type FormAnswerFileType = {
  formAnswerID: number
  fileID: number
  createdAt: string
  file: FileType
}
