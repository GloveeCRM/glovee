import { UserType } from './user'

export type ApplicationType = {
  applicationID: number
  ownerID: number
  createdAt: string
  updatedAt: string
  createdBy: UserType
  owner: UserType
}
