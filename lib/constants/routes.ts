/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ['/', '/new-verification', '/create-new-organization']

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const AUTH_ROUTES = ['/login', '/signup', '/error', '/reset', '/new-password']

/**
 * The default redirect path after logging in as an admin
 * @type {string}
 */
export const DEFAULT_ORG_ADMIN_LOGIN_REDIRECT = '/admin'

/**
 * The default redirect path after logging in as a user
 * @type {string}
 */
export const DEFAULT_ORG_CLIENT_LOGIN_REDIRECT = '/applications'

/**
 * The default redirect path after logging in as a user to "org" organization
 * @type {string}
 */
export const DEFAULT_ORG_MANAGEMENT_LOGIN_REDIRECT = '/'

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
