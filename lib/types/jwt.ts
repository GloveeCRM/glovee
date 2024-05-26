import { UserRoleTypes } from './user'

type JWTUserType = {
  id: number
  role: UserRoleTypes
}

type JWTOrganizationType = {
  id: number
  orgName: string
}

export type JWTPayloadType = {
  exp: number
  tokenType: string
  user: JWTUserType
  organization: JWTOrganizationType
}
