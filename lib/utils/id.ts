export function generateRandomId(): number {
  // Get the current Unix timestamp in seconds
  const now = Math.floor(Date.now() / 1000)

  // Get the last 9 digits of the timestamp
  const baseTime = now % 1000000000

  // Generate a random number between 0 and 99999
  const randomPart = Math.floor(Math.random() * 100000)

  // Combine the base time and random part to form the ID
  const baseId = baseTime * 100000 + randomPart

  return baseId
}
