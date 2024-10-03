import { UserType } from './user'

export type ApplicationType = {
  applicationID: number
  userID: number
  createdAt: string
  updatedAt: string
  createdBy: UserType
}
