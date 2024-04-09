import { headers } from 'next/headers'

import { extractSubdomainFromHostname } from './url'
import { prisma } from '@/prisma/prisma'

/**
 * Gets the current organization name from the hostname.
 */
export function getCurrentOrgName() {
  const headersList = headers()
  const hostname = headersList.get('host')
  if (!hostname) return null
  const subdomain = extractSubdomainFromHostname(hostname)
  return subdomain
}

export async function fetchCurrentOrgId(): Promise<string | null> {
  'use server'
  const orgName = getCurrentOrgName()
  if (!orgName) return null
  const org = await prisma.organization.findUnique({
    where: {
      orgName: orgName,
    },
  })
  if (!org) return null

  return org.id
}
