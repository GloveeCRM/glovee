/**
 * The JWT secret key used to sign and verify the JWT token.
 */
export const accessTokenSecret: Uint8Array = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
)
export const refreshTokenSecret: Uint8Array = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
)
