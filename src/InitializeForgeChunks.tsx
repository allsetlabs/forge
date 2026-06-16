import { ReactNode, useEffect, useState, useRef } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './statefulComponents/theme/provider';
import { AudioProvider } from './statefulComponents/audio/provider';
import { CursorProvider } from './statefulComponents/cursor/provider';
import { AuthProvider } from './statefulComponents/auth';
import { TooltipProvider } from './components/ui/tooltip';
import { useAuth } from './statefulComponents/auth/context';
import { AuthLogin } from './components/auth-login';
import { DataFetchWrapper } from './components/DataFetchWrapper';
import type { AuthTokenResponse } from './types/auth';
import './styles/index.css';

/**
 * Authentication configuration for InitializeForgeChunks.
 * If provided with onSuccess, enables authentication guard that shows login before app content.
 * If provided without onSuccess, sets up AuthProvider and GoogleOAuthProvider without guard.
 */
export interface AuthConfig {
  /** Google OAuth client ID (required for Google auth) */
  googleClientId: string;
  /**
   * Callback to handle successful OAuth credential.
   * Should send credential to backend and return AuthTokenResponse.
   * If not provided, AuthGuard is skipped but providers are still set up.
   */
  onSuccess?: (credential: string) => Promise<AuthTokenResponse>;
  /** Login page title (defaults to "Welcome") */
  loginTitle?: string;
  /** Login page description (defaults to "Sign in to continue") */
  loginDescription?: string;
  /**
   * Enable extension bridge mode to send postMessage events on login/logout.
   * Use this in web apps that need to sync auth state with browser extensions.
   * @default false
   */
  enableExtensionBridge?: boolean;
}

interface InitializeForgeChunksProps {
  children: ReactNode;
  /**
   * If true, applies ID "forge-app-root" to body element for full-page styling.
   * If false/undefined, applies ID to container div for scoped styling (Shadow DOM).
   * @default false
   */
  applyToBody?: boolean;
  /**
   * Optional authentication configuration.
   * If provided, shows login screen when user is not authenticated.
   * If not provided, renders children directly without authentication.
   */
  auth?: AuthConfig;
  /**
   * When true, initializes audio as muted (click sounds disabled by default).
   * User can still toggle audio on via the audio toggle.
   * @default false
   */
  defaultMuted?: boolean;
}

/**
 * InitializeForgeChunks - Unified provider for all component library contexts
 *
 * Wraps the application with all necessary context providers:
 * - ThemeProvider: Dark/light theme management
 * - AudioProvider: Application audio settings
 * - CursorProvider: Custom cursor state
 * - AuthProvider: Authentication state and methods (always included)
 * - GoogleOAuthProvider: Google OAuth (only when auth config provided)
 *
 * Authentication Behavior:
 * - If `auth` prop is NOT provided: Renders children directly (no authentication required)
 * - If `auth` prop IS provided: Shows AuthLogin when not authenticated, children when authenticated
 *
 * Applies ID "forge-app-root" based on applyToBody prop:
 * - applyToBody={true}: Applies ID to body element (regular web app with full-page styling)
 * - applyToBody={false}: Applies ID to container div (Shadow DOM/Chrome extension with scoped styling)
 *
 * @example
 * ```tsx
 * // WITHOUT authentication (portfolio, public pages)
 * <InitializeForgeChunks applyToBody>
 *   <PublicApp />
 * </InitializeForgeChunks>
 *
 * // WITH authentication (Seekr web app)
 * <InitializeForgeChunks
 *   applyToBody
 *   auth={{
 *     googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
 *     onGoogleLogin: authApi.googleLogin,
 *     loginTitle: "Seekr",
 *     loginDescription: "Your AI-powered resume builder"
 *   }}
 * >
 *   <AuthenticatedApp />
 * </InitializeForgeChunks>
 * ```
 */
export function InitializeForgeChunks({
  children,
  applyToBody = false,
  auth,
  defaultMuted = false,
}: InitializeForgeChunksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Set target element and apply ID based on applyToBody
  useEffect(() => {
    if (applyToBody) {
      // Apply ID to body element
      document.body.setAttribute('id', 'forge-app-root');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTargetElement(document.body);
    } else {
      // Use container ref
      setTargetElement(containerRef.current);
    }

    return () => {
      // Cleanup: remove ID from body if it was added
      if (applyToBody && document.body.id === 'forge-app-root') {
        document.body.removeAttribute('id');
      }
    };
  }, [applyToBody]);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={containerRef}
      {...(applyToBody ? {} : { id: 'forge-app-root' })}
    >
      <ThemeProvider targetElement={targetElement}>
        <AudioProvider defaultMuted={defaultMuted}>
          <CursorProvider targetElement={targetElement}>
            <TooltipProvider>
              {auth ? (
                <AuthProvider enableExtensionBridge={auth.enableExtensionBridge}>
                  <GoogleOAuthProvider clientId={auth.googleClientId}>
                    {auth.onSuccess ? (
                      <AuthGuard
                        onSuccess={auth.onSuccess}
                        loginTitle={auth.loginTitle ?? 'Welcome'}
                        loginDescription={auth.loginDescription ?? 'Sign in to continue'}
                      >
                        {children}
                      </AuthGuard>
                    ) : (
                      children
                    )}
                  </GoogleOAuthProvider>
                </AuthProvider>
              ) : (
                children
              )}
            </TooltipProvider>
          </CursorProvider>
        </AudioProvider>
      </ThemeProvider>
    </div>
  );
}

/**
 * AuthGuard - Internal component for conditional authentication rendering
 * Renders login screen when not authenticated, children when authenticated
 */
interface AuthGuardProps {
  children: ReactNode;
  onSuccess: (credential: string) => Promise<AuthTokenResponse>;
  loginTitle: string;
  loginDescription: string;
}

function AuthGuard({ children, onSuccess, loginTitle, loginDescription }: AuthGuardProps) {
  const { isLoading, isAuthenticated, login } = useAuth();

  const handleSuccessLogin = async (credential: string) => {
    try {
      const tokenResponse = await onSuccess(credential);
      login(tokenResponse);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <DataFetchWrapper
      isLoading={isLoading}
      className="bg-background min-h-screen"
      loadingMessage="Loading..."
    >
      {isAuthenticated ? (
        children
      ) : (
        <AuthLogin
          title={loginTitle}
          description={loginDescription}
          onSuccessLogin={handleSuccessLogin}
        />
      )}
    </DataFetchWrapper>
  );
}
