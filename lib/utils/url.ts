export function extractSubdomainFromHostname(hostname: string) {
  const parts = hostname.split('.')
  if (parts.length === 2 && parts[1].startsWith('localhost')) {
    return parts[0]
  } else if (parts.length >= 3 && parts[0] !== 'www') {
    return parts[0]
  }
  return null
}
