import { UserType } from './user'

export type ApplicationType = {
  applicationID: number
  userID: number
  applicationName: string
  createdAt: string
  updatedAt: string
  owner: UserType
}

export type ApplicationUpdateType = {
  applicationUpdateID: number
  applicationID: number
  title: string
  description: string
  createdBy: UserType
  createdAt: string
}
