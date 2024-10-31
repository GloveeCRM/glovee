import { QuestionType } from './qusetion'
import { TemplateQuestionSetType, TemplateQuestionSetTypes } from './template'
import { UserType } from './user'

export type Applicant = {
  firstName: string
  lastName: string
  imageURL: string
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

export type FormType = {
  id: number
  applicationID: number
  organizationID: number
  client: UserType
  role: FormRoleTypes
  applicant: Applicant
  status: FormStatusTypes
  completionRate: number
  categories?: FormCategoryType[]
  formID: number
  formName: string
  formDescription: string
  formStatus: FormStatusTypes
  createdBy: UserType
  createdAt: string
  updatedAt: string
}

export type FormCategoryType = {
  id: number
  name: string
  position: number
  completionRate: number
  sections?: FormSectionType[]
  categoryID: number
  formID: number
  categoryName: string
  categoryPosition: number
}

export type FormSectionType = {
  id: number
  name: string
  position: number
  categoryID: number
  completionRate: number
  questionSets?: FormQuestionSetType[]
  sectionID: number
  sectionName: string
  sectionPosition: number
}

export enum FormQuestionSetTypes {
  FLAT = 'FLAT',
  LOOP = 'LOOP',
  DEPENDS_ON = 'DEPENDS_ON',
}

export type FormQuestionSetType = {
  id: number
  type: FormQuestionSetTypes
  position: number
  dependsOn?: number
  sectionID: number
  questionSetID?: number
  questionSets?: FormQuestionSetType[]
  questions?: QuestionType[]
}

export function isFlatQuestionSetType(questionSet: FormQuestionSetType | TemplateQuestionSetType) {
  return (
    questionSet.type === FormQuestionSetTypes.FLAT ||
    questionSet.type === TemplateQuestionSetTypes.FLAT
  )
}

export function isLoopQuestionSetType(questionSet: FormQuestionSetType | TemplateQuestionSetType) {
  return (
    questionSet.type === FormQuestionSetTypes.LOOP ||
    questionSet.type === TemplateQuestionSetTypes.LOOP
  )
}

export function isDependsOnQuestionSetType(
  questionSet: FormQuestionSetType | TemplateQuestionSetType
) {
  return (
    questionSet.type === FormQuestionSetTypes.DEPENDS_ON ||
    questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON
  )
}
