/**
 * Auth module - Authentication context and provider
 *
 * Provides authentication state management for React applications
 * with configurable localStorage keys and type-safe context.
 *
 * @example
 * ```tsx
 * import { AuthProvider, useAuth } from '@allsetlabs/forge/statefulComponents/auth';
 *
 * // Wrap your app with AuthProvider
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // Use the hook in components
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   // ...
 * }
 * ```
 */

export { AuthContext, useAuth } from './context';
export type { AuthContextType } from './context';
export { AuthProvider } from './provider';
