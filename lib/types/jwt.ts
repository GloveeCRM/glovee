import { UserRole } from '@prisma/client'

type JWTUserType = {
  id: number
  role: UserRole
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
