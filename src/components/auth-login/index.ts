/**
 * AuthLogin - Reusable OAuth login component
 *
 * Provides a generic OAuth login UI that wraps provider-specific login buttons.
 * The component manages loading and error states but delegates authentication
 * logic (API calls, context updates) to the consuming application.
 *
 * @example
 * ```tsx
 * import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
 *
 * <AuthLogin
 *   onSuccessLogin={(credential) => handleLogin(credential)}
 *   onError={(error) => console.error(error)}
 *   provider="google"
 * />
 * ```
 */
export { AuthLogin } from './auth-login';
export type { AuthLoginProps } from './auth-login';
