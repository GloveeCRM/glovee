export type UserType = {
  id: number
  organizationID: number
  firstName: string
  lastName: string
  email: string
  emailVerified: string
  avatarURL: string
  role: string
  status: UserStatusTypes
}

export enum UserRoleTypes {
  G_OWNER = 'G_OWNER',
  G_ADMIN = 'G_ADMIN',
  ORG_OWNER = 'ORG_OWNER',
  ORG_ADMIN = 'ORG_ADMIN',
  ORG_CLIENT = 'ORG_CLIENT',
}

export enum UserStatusTypes {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
