import { FileType } from './file'
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
  files?: FileType[]
  createdBy: UserType
  createdAt: string
}
