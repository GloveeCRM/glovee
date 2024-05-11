/**
 * Reads the JWT secret from the environment variables or sets a default value.
 */
export const jwtExpirySeconds = Number(process.env.NEXT_PUBLIC_JWT_EXP_SECONDS) || 60 * 60

/**
 * The JWT secret key used to sign and verify the JWT token.
 */
export const jwtSecret: Uint8Array = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
