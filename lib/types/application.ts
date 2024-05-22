export enum ApplicationStatusTypes {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
}

export enum ApplicationRoleTypes {
  MAIN = 'MAIN',
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  OTHER = 'OTHER',
}

export type ApplicationType = {
  id: number
  organizationID: number
  clientID: number
  role: ApplicationRoleTypes
  templateName: string
  applicantFirstName: string
  applicantLastName: string
  status: ApplicationStatusTypes
  categories?: ApplicationCategoryType[]
}

export type ApplicationCategoryType = {
  id: number
  name: string
  position: number
  templateID: number
  sections?: ApplicationSectionType[]
}

export type ApplicationSectionType = {
  id: number
  name: string
  position: number
  categoryID: number
  questionSets?: ApplicationQuestionSetType[]
}

export enum ApplicationQuestionSetTypes {
  FLAT = 'FLAT',
  LOOP = 'LOOP',
  DEPENDS_ON = 'DEPENDS_ON',
}

export type ApplicationQuestionSetType = {
  id: number
  type: ApplicationQuestionSetTypes
  position: number
  sectionID: number
  questionSetID: number
  questionSets?: ApplicationQuestionSetType[]
  questions?: ApplicationQuestionType[]
}

export enum ApplicationQuestionTypes {
  TEXT_INPUT = 'TEXT_INPUT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  DATE_INPUT = 'DATE_INPUT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DOCUMENT = 'DOCUMENT',
}

export type BaseSettings = Record<string, any>

export type ApplicationQuestionType = {
  id: number
  type: ApplicationQuestionTypes
  prompt: string
  position: number
  helperText?: string
  settings?: BaseSettings
  questionSetId: number
}

export type ApplicationSummaryType = {
  id: string
  applicantFirstName: string
  applicantLastName: string
  role: string
  status: string
  completionRate: number
  categories: { id: string; name: string; completionRate: number }[]
}
