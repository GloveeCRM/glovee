/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ['/', '/new-verification']

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const AUTH_ROUTES = ['/login', '/register', '/error', '/reset', '/new-password']

/**
 * The default redirect path after logging in as an admin
 * @type {string}
 */
export const DEFAULT_ADMIN_LOGIN_REDIRECT = '/admin'

/**
 * The default redirect path after logging in as a user
 * @type {string}
 */
export const DEFAULT_USER_LOGIN_REDIRECT = '/applications'

/**
 * The default redirect path after logging out
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = '/login'

/**
 * The admin routes prefix
 * @type {string}
 */
export const ADMIN_ROUTES_PREFIX = '/admin'
