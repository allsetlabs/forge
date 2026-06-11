/**
 * Extension Auth module - Authentication context and provider for Chrome extensions
 *
 * Provides authentication state from chrome.storage.local for Chrome extensions.
 * Works in conjunction with the webapp's AuthProvider (with enableExtensionBridge)
 * and the authBridge content script to sync auth state between webapp and extension.
 *
 * Flow:
 * 1. User logs in on the webapp
 * 2. Webapp's AuthProvider sends postMessage with auth data
 * 3. Extension's authBridge content script receives message and stores in chrome.storage.local
 * 4. Extension's ExtensionAuthProvider reads from chrome.storage.local and provides to components
 *
 * @example
 * ```tsx
 * import { ExtensionAuthProvider, useExtensionAuth } from '@allsetlabs/forge/statefulComponents/extensionAuth';
 *
 * // Wrap your extension popup/page with ExtensionAuthProvider
 * function App() {
 *   return (
 *     <ExtensionAuthProvider>
 *       <PopupContent />
 *     </ExtensionAuthProvider>
 *   );
 * }
 *
 * // Use the hook in components
 * function PopupContent() {
 *   const { user, isAuthenticated, isLoading } = useExtensionAuth();
 *   // ...
 * }
 * ```
 */

export { ExtensionAuthContext, useExtensionAuth } from './context';
export type { ExtensionAuthContextType } from './context';
export { ExtensionAuthProvider } from './provider';
