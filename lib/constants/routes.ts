/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
export const PUBLIC_ROUTES = ['/', '/email-verification', '/create-new-organization']

/**
 * An array of routes that are used for authentication.
 */
export const AUTH_ROUTES = ['/login', '/signup', '/error', '/forgot-password', '/set-new-password']

/**
 * The default redirect path after logging in as an admin.
 */
export const DEFAULT_ORG_ADMIN_LOGIN_REDIRECT = '/admin'

/**
 * The default redirect path after logging in as a user
 */
export const DEFAULT_ORG_CLIENT_LOGIN_REDIRECT = '/applications'

/**
 * The default redirect path after logging in as a user to "org" organization
 */
export const DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT = '/'

/**
 * The default redirect path after logging out
 */
export const DEFAULT_LOGOUT_REDIRECT = '/login'

/**
 * The admin routes prefix
 */
export const ADMIN_ROUTES_PREFIX = '/admin'
