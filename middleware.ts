import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await NextAuth(authConfig).auth()

  const { nextUrl } = request
  const isLoggedIn = !!session

  let response = NextResponse.next()
  response.headers.set('pathname', nextUrl.pathname)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return response
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      response = NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return response
  }

  if (!isLoggedIn && !isPublicRoute) {
    response = NextResponse.redirect(new URL('/login', nextUrl))
  }

  return response
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
