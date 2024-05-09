import { Application, Category, Question, QuestionSet, Section } from '@prisma/client'
import {
  CheckboxQuestionType,
  DateInputQuestionType,
  DocumentQuestionType,
  RadioQuestionType,
  SelectQuestionType,
  TextInputQuestionType,
  TextareaQuestionType,
} from './qusetion'

export type ApplicationType = Application & {
  categories?: ApplicationCategoryType[]
}

export type ApplicationCategoryType = Category & {
  sections?: ApplicationSectionType[]
}

export type ApplicationSectionType = Section & {
  questionSets?: ApplicationQuestionSetType[]
}

export type ApplicationQuestionSetType = QuestionSet & {
  questionSets?: ApplicationQuestionSetType[]
  questions?: ApplicationQuestionType[]
}

export type ApplicationQuestionType =
  | TextInputQuestionType
  | TextareaQuestionType
  | SelectQuestionType
  | DateInputQuestionType
  | RadioQuestionType
  | CheckboxQuestionType
  | DocumentQuestionType

export type ApplicationSummaryType = {
  id: string
  applicantFirstName: string
  applicantLastName: string
  role: string
  completionRate: number
  categories: { name: string; completionRate: number }[]
}
