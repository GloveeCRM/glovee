/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ['/']

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const AUTH_ROUTES = ['/login', '/register']

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_ADMIN_LOGIN_REDIRECT = '/admin'