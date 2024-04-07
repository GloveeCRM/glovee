import { Question, TemplateQuestion } from '@prisma/client'

type BaseSettings = any

export type TextInputQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export type TextareaQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export type SelectQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export type DateInputQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}

export type RadioQuestionType = (TemplateQuestion | Question) & {
  settings: {
    display: 'inline' | 'block'
    options: {
      position: number
      value: string
    }[]
  }
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

export type DocumentQuestionType = (TemplateQuestion | Question) & {
  settings: BaseSettings
}
