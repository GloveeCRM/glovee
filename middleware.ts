import { NextRequest, NextResponse } from 'next/server'
import { UserRoleTypes } from './lib/types/user'
import {
  DEFAULT_ORG_ADMIN_LOGIN_REDIRECT,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  DEFAULT_ORG_CLIENT_LOGIN_REDIRECT,
  ADMIN_ROUTES_PREFIX,
} from '@/lib/constants/routes'
import { getCurrentOrgName } from './lib/utils/server'
import { getSessionPayload } from './lib/auth/session'

export async function middleware(request: NextRequest) {
  const session = await getSessionPayload()
  const isLoggedIn = !!session?.user
  const role = session?.user?.role
  const { nextUrl } = request
  const orgName = getCurrentOrgName()

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_ROUTES_PREFIX)

  const isOrgAdminOrOrgOwner = role === UserRoleTypes.ORG_ADMIN || role === UserRoleTypes.ORG_OWNER
  const isOrgClient = role === UserRoleTypes.ORG_CLIENT

  if (isApiAuthRoute) {
    const searchParams = request.nextUrl.searchParams.toString()
    const pathWithSearchParams = `${nextUrl.pathname}${searchParams ? `?${searchParams}` : ''}`
    const response = NextResponse.rewrite(new URL(`/${orgName}${pathWithSearchParams}`, nextUrl))
    return response
  } else if (isAuthRoute && isLoggedIn) {
    if (isOrgAdminOrOrgOwner) {
      return NextResponse.redirect(new URL(DEFAULT_ORG_ADMIN_LOGIN_REDIRECT, nextUrl))
    } else if (isOrgClient) {
      return NextResponse.redirect(new URL(DEFAULT_ORG_CLIENT_LOGIN_REDIRECT, nextUrl))
    } else {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  } else if (isAdminRoute && !isOrgAdminOrOrgOwner) {
    if (isOrgClient) {
      return NextResponse.redirect(new URL(DEFAULT_ORG_CLIENT_LOGIN_REDIRECT, nextUrl))
    } else {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
  } else if (!isPublicRoute && !isAdminRoute && isOrgAdminOrOrgOwner) {
    return NextResponse.redirect(new URL(DEFAULT_ORG_ADMIN_LOGIN_REDIRECT, nextUrl))
  } else if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  } else if (nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL(DEFAULT_ORG_ADMIN_LOGIN_REDIRECT, nextUrl))
  }

  if (orgName) {
    const searchParams = request.nextUrl.searchParams.toString()
    const pathWithSearchParams = `${nextUrl.pathname}${searchParams ? `?${searchParams}` : ''}`
    const response = NextResponse.rewrite(new URL(`/${orgName}${pathWithSearchParams}`, nextUrl))
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
