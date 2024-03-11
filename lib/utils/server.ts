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

export async function fetchCurrentOrgId() {
  'use server'
  const orgName = getCurrentOrgName()
  const org = await prisma.organization.findUnique({
    where: {
      orgName: orgName!,
    },
  })

  return org?.id
}
