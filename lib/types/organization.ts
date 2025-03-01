import { FileType } from './file'

export type OrganizationType = {
  organizationID: string
  name: string
  orgName: string
  logoFile?: FileType
  createdAt: string
  updatedAt: string
}
