import {
  Template,
  TemplateCategory,
  TemplateQuestionSet,
  TemplateSection,
  TemplateQuestion,
} from '@prisma/client'

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
  questions?: TemplateQuestionType[]
}

export type TemplateQuestionType = TemplateQuestion & {}
