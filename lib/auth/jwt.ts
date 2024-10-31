import { jwtVerify } from 'jose'

import { JWTPayloadType } from '@/lib/types/jwt'

export async function parseJWT(token: string, secret: Uint8Array): Promise<JWTPayloadType | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return payload as JWTPayloadType
  } catch (error) {
    return null
  }
}
