export type UserType = {
  id: number
  organizationID: number
  firstName: string
  lastName: string
  email: string
  emailVerified: string
  avatarURL: string
  role: string
  status: UserStatusEnum
}

export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
