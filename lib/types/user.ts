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
