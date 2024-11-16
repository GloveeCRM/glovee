import { FileType } from './file'

export type BaseQuestionSettings = {}

export enum QuestionTypes {
  TEXT_INPUT = 'TEXT_INPUT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  DATE_INPUT = 'DATE_INPUT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DOCUMENT = 'DOCUMENT',
}

export type BaseQuestionType = {
  id: number
  type: QuestionTypes
  prompt: string
  position: number
  settings: BaseQuestionSettings
  helperText?: string
  answer?: BaseAnswerType
  questionSetID: number
  isRequired: boolean
}

type QuestionOptionType = {
  id: number
  questionID: number
  value: string
  position: number
}

export type BaseAnswerType = {
  id: number
  questionID: number
  isAcceptable: boolean
  text?: string
  date?: string
  optionIDs?: number[]
  files?: FileType[]
}

export function isTextInputQuestionType(
  question: BaseQuestionType
): question is TextInputQuestionType {
  return question?.type === QuestionTypes.TEXT_INPUT
}

export type TextInputQuestionSettings = BaseQuestionSettings & {
  placeholder: string
}

export type TextInputQuestionType = BaseQuestionType & {
  settings: TextInputQuestionSettings
}

export function isTextareaQuestionType(
  question: BaseQuestionType
): question is TextareaQuestionType {
  return question?.type === QuestionTypes.TEXTAREA
}

export type TextareaQuestionSettings = BaseQuestionSettings & {
  placeholder: string
  minimumLength: number | null
  maximumLength: number | null
}

export type TextareaQuestionType = BaseQuestionType & {
  settings: TextareaQuestionSettings
}

export function isSelectQuestionType(question: BaseQuestionType): question is SelectQuestionType {
  return question?.type === QuestionTypes.SELECT
}

export type SelectQuestionOptionType = {
  id: number
  position: number
  value: string
}

export type SelectQuestionSettings = BaseQuestionSettings & {
  options: SelectQuestionOptionType[]
  defaultOptionID: number
}

export type SelectQuestionType = BaseQuestionType & {
  settings: SelectQuestionSettings
  options: QuestionOptionType[]
}

export function isDateInputQuestionType(
  question: BaseQuestionType
): question is DateInputQuestionType {
  return question?.type === QuestionTypes.DATE_INPUT
}

export type DateInputQuestionSettings = BaseQuestionSettings & {
  minimumDate: string | null
  maximumDate: string | null
}

export type DateInputQuestionType = BaseQuestionType & {
  settings: DateInputQuestionSettings
}

export function isRadioQuestionType(question: BaseQuestionType): question is RadioQuestionType {
  return question?.type === QuestionTypes.RADIO
}

export type RadioQuestionOptionType = {
  id: number
  position: number
  value: string
}

export type RadioQuestionSettings = BaseQuestionSettings & {
  display: 'inline' | 'block'
  options: RadioQuestionOptionType[]
  defaultOptionID: number
}

export type RadioQuestionType = BaseQuestionType & {
  settings: RadioQuestionSettings
  options: QuestionOptionType[]
}

export function isCheckboxQuestionType(
  question: BaseQuestionType
): question is CheckboxQuestionType {
  return question?.type === QuestionTypes.CHECKBOX
}

export type CheckboxQuestionOptionType = {
  id: number
  position: number
  value: string
}

export type CheckboxQuestionSettings = BaseQuestionSettings & {
  display: 'inline' | 'block'
  options: CheckboxQuestionOptionType[]
  defaultOptionID: number
}

export type CheckboxQuestionType = BaseQuestionType & {
  settings: CheckboxQuestionSettings
  options: QuestionOptionType[]
}

export function isDocumentQuestionType(
  question: BaseQuestionType
): question is DocumentQuestionType {
  return question?.type === QuestionTypes.DOCUMENT
}

export type DocumentQuestionType = BaseQuestionType

export type QuestionType =
  | BaseQuestionType
  | TextInputQuestionType
  | TextareaQuestionType
  | SelectQuestionType
  | DateInputQuestionType
  | RadioQuestionType
  | CheckboxQuestionType
  | DocumentQuestionType
