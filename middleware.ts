import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { DEFAULT_ADMIN_LOGIN_REDIRECT, AUTH_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await NextAuth(authConfig).auth()

  const { nextUrl } = request
  const isLoggedIn = !!session

  let response = NextResponse.next()
  response.headers.set('pathname', nextUrl.pathname)

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
  } else if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return response
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
