import { jwtVerify } from 'jose'
import { jwtSecret } from '@/lib/constants/jwt'
import { JWTPayloadType } from '../types/jwt'

export async function parseJWT(token: string): Promise<JWTPayloadType | null> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret, { algorithms: ['HS256'] })
    return payload as JWTPayloadType
  } catch (error) {
    return null
  }
}
