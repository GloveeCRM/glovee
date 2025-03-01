import { FileType } from './file'

export type UserType = {
  userID: number
  organizationID: number
  email: string
  firstName: string
  lastName: string
  role: string
  status: UserStatusTypes
  profilePictureFile?: FileType
  createdAt: string
  updatedAt: string
}

export enum UserRoleTypes {
  G_OWNER = 'g_owner',
  G_ADMIN = 'g_admin',
  ORG_OWNER = 'org_owner',
  ORG_ADMIN = 'org_admin',
  ORG_CLIENT = 'org_client',
}

export enum UserStatusTypes {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
