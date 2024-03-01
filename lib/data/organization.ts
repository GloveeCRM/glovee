import { prisma } from '@/prisma/prisma'
import { Organization } from '@prisma/client'

/**
 * Fetches an organization by its OrgName.
 */
export async function fetchOrganizationByOrgName(orgName: string): Promise<Organization | null> {
  try {
    const organization = await prisma.organization.findUnique({
      where: { orgName },
    })
    return organization
  } catch {
    return null
  }
}
