/**
 * The JWT secret key used to sign and verify the JWT token.
 */
export const jwtSecret: Uint8Array = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
