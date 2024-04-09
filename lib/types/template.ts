import { Template, TemplateCategory, TemplateQuestionSet, TemplateSection } from '@prisma/client'
import {
  CheckboxQuestionType,
  DateInputQuestionType,
  DocumentQuestionType,
  RadioQuestionType,
  SelectQuestionType,
  TextInputQuestionType,
  TextareaQuestionType,
} from './qusetion'

export type TemplateType = Template & {
  categories?: TemplateCategoryType[]
}

export type TemplateCategoryType = TemplateCategory & {
  sections?: TemplateSectionType[]
}

export type TemplateSectionType = TemplateSection & {
  questionSets?: TemplateQuestionSetType[]
}

export type TemplateQuestionSetType = TemplateQuestionSet & {
  questionSets?: TemplateQuestionSetType[]
  questions?: TemplateQuestionType[]
}

export type TemplateQuestionType =
  | TextInputQuestionType
  | TextareaQuestionType
  | SelectQuestionType
  | DateInputQuestionType
  | RadioQuestionType
  | CheckboxQuestionType
  | DocumentQuestionType
