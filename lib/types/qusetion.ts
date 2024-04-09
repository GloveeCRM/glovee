import { Question, TemplateQuestion, TemplateQuestionType } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'

type BaseSettings = JsonValue

export function isTextInputQuestionType(
  question: TemplateQuestion | Question
): question is TextInputQuestionType {
  return question.type === TemplateQuestionType.TEXT_INPUT
}

export type TextInputQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export function isTextareaQuestionType(
  question: TemplateQuestion | Question
): question is TextareaQuestionType {
  return question.type === TemplateQuestionType.TEXTAREA
}

export type TextareaQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export function isSelectQuestionType(
  question: TemplateQuestion | Question
): question is SelectQuestionType {
  return question.type === TemplateQuestionType.SELECT
}

export type SelectQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export function isDateInputQuestionType(
  question: TemplateQuestion | Question
): question is DateInputQuestionType {
  return question.type === TemplateQuestionType.DATE_INPUT
}

export type DateInputQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export function isRadioQuestionType(
  question: TemplateQuestion | Question
): question is RadioQuestionType {
  return question.type === TemplateQuestionType.RADIO
}

export type RadioQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings & {
    display: 'inline' | 'block'
    options: {
      position: number
      value: string
    }[]
  }
}

export function isCheckboxQuestionType(
  question: TemplateQuestion | Question
): question is CheckboxQuestionType {
  return question.type === TemplateQuestionType.CHECKBOX
}

export type CheckboxQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings & {
    display: 'inline' | 'block'
    options: {
      position: number
      value: string
    }[]
  }
}

export function isDocumentQuestionType(
  question: TemplateQuestion | Question
): question is DocumentQuestionType {
  return question.type === TemplateQuestionType.DOCUMENT
}

export type DocumentQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}
