import { SignJWT, jwtVerify } from 'jose'
import { jwtSecret, jwtExpirySeconds } from '@/lib/constants/jwt'
import { JWTPayloadType } from '../types/jwt'

export async function generateJWT(payload: Record<string, any>): Promise<string> {
  const jwtExpiryDate = new Date(Date.now() + jwtExpirySeconds * 1000)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(jwtExpiryDate)
    .sign(jwtSecret)
}

export async function parseJWT(token: string): Promise<JWTPayloadType> {
  const { payload } = await jwtVerify(token, jwtSecret, { algorithms: ['HS256'] })
  return payload as JWTPayloadType
}
