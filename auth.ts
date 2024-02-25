import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { prisma } from '@/prisma/prisma'
import { fetchUserById } from '@/lib/data/user'
import { getAccountByUserId } from './lib/data/account'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    role: UserRole
    organizationId: string | null
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await fetchUserById(user.id)

      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ token, session }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth
        session.user.organizationId = token.organizationId
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await fetchUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.organizationId = existingUser.organizationId

      return token
    },
  },
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  ...authConfig,
})

export async function getAuthenticatedUser() {
  const session = await auth()
  return session?.user
}

export async function getAuthenticatedUserRole() {
  const session = await auth()
  return session?.user?.role
}
