import { headers } from 'next/headers'

import { extractSubdomainFromHostname } from './url'

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
