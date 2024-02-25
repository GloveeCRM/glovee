import { headers } from 'next/headers'

import { extractSubdomainFromHostname } from './url'

/**
 * Gets the current organization name from the hostname.
 * @returns {string} - The current organization name (subdomain).
 */
export function getCurrentOrgName() {
  const headersList = headers()
  const hostname = headersList.get('host')
  const subdomain = extractSubdomainFromHostname(hostname!) || ''
  return subdomain
}
