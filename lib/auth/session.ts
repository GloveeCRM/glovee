'use server'

import { cookies } from 'next/headers'

import { accessTokenSecret, refreshTokenSecret } from '@/lib/constants/jwt'
import { keysSnakeCaseToCamelCase } from '@/lib/utils/json'
import { parseJWT } from '@/lib/auth/jwt'

export async function setSession(token: string) {
  const payload = await parseJWT(token, accessTokenSecret)
  if (payload) {
    const jwtExpiryDate = new Date(payload.exp * 1000)
    cookies().set('session', token, {
      expires: jwtExpiryDate,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  } else {
    await removeSession()
  }
}

export async function getSession(): Promise<string | null> {
  const session = cookies().get('session')?.value
  if (!session) return null
  return session
}

export async function getSessionPayload() {
  const session = await getSession()
  if (!session) return null
  const payload = await parseJWT(session, accessTokenSecret)
  const camelCasePayload = keysSnakeCaseToCamelCase(payload)
  return camelCasePayload
}

export async function getSessionUserID(): Promise<number> {
  const payload = await getSessionPayload()
  return payload?.user?.userID || 0
}

export async function removeSession() {
  cookies().set('session', '', { expires: new Date(0) })
}

export async function setRefreshToken(token: string) {
  const payload = await parseJWT(token, refreshTokenSecret)

  if (payload) {
    const jwtExpiryDate = new Date(payload.exp * 1000)
    cookies().set('refreshToken', token, {
      expires: jwtExpiryDate,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  } else {
    console.error(
      'Error setting refresh token - Removing refresh token from cookies - Token or secret missing'
    )
    await removeRefreshToken()
  }
}

export async function getRefreshToken(): Promise<string | null> {
  const refreshToken = cookies().get('refreshToken')?.value
  return refreshToken || null
}

export async function removeRefreshToken() {
  cookies().set('refreshToken', '', { expires: new Date(0) })
}
