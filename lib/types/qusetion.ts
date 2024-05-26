import { BaseSettingsType, TemplateQuestionType, TemplateQuestionTypes } from './template'
import { ApplicationQuestionType, ApplicationQuestionTypes } from './application'

export function isTextInputQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is TextInputQuestionType {
  return (
    question.type === TemplateQuestionTypes.TEXT_INPUT ||
    question.type === ApplicationQuestionTypes.TEXT_INPUT
  )
}

export type TextInputQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType
}

export function isTextareaQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is TextareaQuestionType {
  return (
    question.type === TemplateQuestionTypes.TEXTAREA ||
    question.type === ApplicationQuestionTypes.TEXTAREA
  )
}

export type TextareaQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType
}

export function isSelectQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is SelectQuestionType {
  return (
    question.type === TemplateQuestionTypes.SELECT ||
    question.type === ApplicationQuestionTypes.SELECT
  )
}

export type SelectQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType
}

export function isDateInputQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is DateInputQuestionType {
  return (
    question.type === TemplateQuestionTypes.DATE_INPUT ||
    question.type === ApplicationQuestionTypes.DATE_INPUT
  )
}

export type DateInputQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType
}

export function isRadioQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is RadioQuestionType {
  return (
    question.type === TemplateQuestionTypes.RADIO ||
    question.type === ApplicationQuestionTypes.RADIO
  )
}

export type RadioQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType & {
    display: 'inline' | 'block'
    options: {
      position: number
      value: string
    }[]
  }
}

export function isCheckboxQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is CheckboxQuestionType {
  return (
    question.type === TemplateQuestionTypes.CHECKBOX ||
    question.type === ApplicationQuestionTypes.CHECKBOX
  )
}

export type CheckboxQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType & {
    display: 'inline' | 'block'
    options: {
      position: number
      value: string
    }[]
  }
}

export function isDocumentQuestionType(
  question: TemplateQuestionType | ApplicationQuestionType
): question is DocumentQuestionType {
  return (
    question.type === TemplateQuestionTypes.DOCUMENT ||
    question.type === ApplicationQuestionTypes.DOCUMENT
  )
}

export type DocumentQuestionType = (TemplateQuestionType | ApplicationQuestionType) & {
  settings: BaseSettingsType
}
