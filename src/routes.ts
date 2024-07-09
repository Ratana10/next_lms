/**
 * An array of routes that are used for authentication
 * There routes will redirect logged in dashboard
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register"
]


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix 
 * are use for API authentication purpose
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"