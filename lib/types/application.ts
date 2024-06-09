import {
  QuestionType,
  BaseQuestionSettings,
  CheckboxQuestionSettings,
  RadioQuestionSettings,
} from './qusetion'
import { UserType } from './user'

export type Applicant = {
  firstName: string
  lastName: string
  imageURL: string
}

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
  client: UserType
  role: ApplicationRoleTypes
  templateName: string
  applicant: Applicant
  status: ApplicationStatusTypes
  completionRate: number
  categories?: ApplicationCategoryType[]
}

export type ApplicationCategoryType = {
  id: number
  name: string
  position: number
  templateID: number
  completionRate: number
  sections?: ApplicationSectionType[]
}

export type ApplicationSectionType = {
  id: number
  name: string
  position: number
  categoryID: number
  completionRate: number
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
  dependsOn?: Record<string, any>
  sectionID: number
  questionSetID: number
  questionSets?: ApplicationQuestionSetType[]
  questions?: QuestionType[]
}
