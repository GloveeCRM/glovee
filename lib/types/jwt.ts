import { UserRoleTypes, UserStatusTypes } from './user'

type JWTUserType = {
  userID: number
  role: UserRoleTypes
  email: string
  organizationID: number
  status: UserStatusTypes
}

type JWTOrganizationType = {
  organizationID: number
  orgName: string
}

export type JWTPayloadType = {
  exp: number
  tokenType: string
  user: JWTUserType
  organization: JWTOrganizationType
}
