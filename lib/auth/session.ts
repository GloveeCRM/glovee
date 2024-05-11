'use server'

import { cookies } from 'next/headers'
import { generateJWT, parseJWT } from './jwt'
import { jwtExpirySeconds } from '../constants/jwt'

export async function setSession(token: string) {
  const jwtExpiryDate = new Date(Date.now() + jwtExpirySeconds * 1000)
  cookies().set('session', token, {
    expires: jwtExpiryDate,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<string | null> {
  const session = cookies().get('session')?.value
  if (!session) return null
  return session
}

export async function getSessionPayload() {
  const session = await getSession()
  if (!session) return null
  return await parseJWT(session)
}

export async function removeSession() {
  cookies().set('session', '', { expires: new Date(0) })
}

export async function updateSession() {
  const session = await getSession()
  if (!session) return

  const payload = await parseJWT(session)
  if (!payload) return

  const newToken = await generateJWT(payload)
  await setSession(newToken)
}
