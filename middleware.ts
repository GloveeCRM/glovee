import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import {
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  DEFAULT_CLIENT_LOGIN_REDIRECT,
  ADMIN_ROUTES_PREFIX,
} from '@/lib/constants/routes'
import { NextRequest, NextResponse } from 'next/server'
import { extractSubdomainFromHostname } from './lib/utils/url'
import { auth } from './auth'
import { UserRole } from '@prisma/client'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const role = session?.user?.role

  const { nextUrl } = request
  const hostname = request.headers.get('host')!
  const subdomain = extractSubdomainFromHostname(hostname)

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_ROUTES_PREFIX)

  if (isApiAuthRoute) {
    const searchParams = request.nextUrl.searchParams.toString()
    const pathWithSearchParams = `${nextUrl.pathname}${searchParams ? `?${searchParams}` : ''}`
    const response = NextResponse.rewrite(new URL(`/${subdomain}${pathWithSearchParams}`, nextUrl))
    return response
  } else if (isAuthRoute && isLoggedIn) {
    if (role === UserRole.ORG_ADMIN) {
      return NextResponse.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
    } else if (role === UserRole.ORG_CLIENT) {
      return NextResponse.redirect(new URL(DEFAULT_CLIENT_LOGIN_REDIRECT, nextUrl))
    } else {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  } else if (isAdminRoute && role !== UserRole.ORG_ADMIN) {
    if (role === UserRole.ORG_CLIENT) {
      return NextResponse.redirect(new URL(DEFAULT_CLIENT_LOGIN_REDIRECT, nextUrl))
    } else {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
  } else if (!isPublicRoute && !isAdminRoute && role === UserRole.ORG_ADMIN) {
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl))
  } else if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  if (subdomain) {
    const searchParams = request.nextUrl.searchParams.toString()
    const pathWithSearchParams = `${nextUrl.pathname}${searchParams ? `?${searchParams}` : ''}`
    const response = NextResponse.rewrite(new URL(`/${subdomain}${pathWithSearchParams}`, nextUrl))
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
