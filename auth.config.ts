import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { LoginSchema } from '@/lib/zod/schemas'
import { fetchUserByEmailAndOrgName } from '@/lib/data/user'
import { headers } from 'next/headers'
import { extractSubdomainFromHostname } from './lib/utils/url'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const headerList = headers()
          const hostname = headerList.get('host')
          const subdomain = extractSubdomainFromHostname(hostname!) || ''

          const user = await fetchUserByEmailAndOrgName(email, subdomain)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
