import { auth } from '@/auth'
import { fetchUserByEmail } from '../data/user'
import { User } from '@prisma/client'
import { generateVerificationToken } from '../token/tokens'
import { sendVerificationEmail } from '../mail/mail'

export async function currentUser() {
  const session = await auth()

  return session?.user
}

export async function currentRole() {
  const session = await auth()

  return session?.user?.role
}
