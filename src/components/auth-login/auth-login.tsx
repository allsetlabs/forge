/**
 * AuthLogin Component
 *
 * A complete, reusable authentication login page that wraps OAuth providers.
 * Currently supports Google OAuth with extensibility for other providers.
 * Includes full page UI with customizable title and description.
 *
 * @example
 * ```tsx
 * import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
 *
 * function LoginPage() {
 *   const handleSuccess = async (credential: string) => {
 *     // Send credential to your backend
 *     const response = await authApi.login(credential);
 *     // Update your auth context
 *     login(response);
 *   };
 *
 *   const handleError = (error: Error) => {
 *     console.error('Login failed:', error);
 *   };
 *
 *   return (
 *     <AuthLogin
 *       title="Seekr"
 *       description="Your AI-powered resume builder"
 *       onSuccessLogin={handleSuccess}
 *       onError={handleError}
 *       provider="google"
 *     />
 *   );
 * }
 * ```
 */
import { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

/**
 * Props for the AuthLogin component
 */
export interface AuthLoginProps {
  /**
   * Callback function called when login is successful.
   * Receives the OAuth credential string that should be sent to your backend.
   *
   * @param credential - OAuth credential token from the provider
   */
  onSuccessLogin: (credential: string) => void;

  /**
   * Optional callback function called when an error occurs during login.
   *
   * @param error - Error object with details about the failure
   */
  onError?: (error: Error) => void;

  /**
   * OAuth provider to use for authentication.
   * Currently only 'google' is supported.
   * Future: 'github', 'microsoft'
   *
   * @default 'google'
   */
  provider?: 'google' | 'github' | 'microsoft';

  /**
   * Application title to display at the top of the login page
   *
   * @example "Seekr"
   */
  title: string;

  /**
   * Description text to display below the title
   *
   * @example "Your AI-powered resume builder"
   */
  description: string;
}

/**
 * AuthLogin Component
 *
 * Provides a complete, reusable OAuth login page with built-in error and loading states.
 * This component handles the OAuth provider interaction but delegates
 * API calls and auth state management to the consuming application.
 *
 * Features:
 * - Full login page UI with title and description
 * - OAuth provider integration (currently Google)
 * - Loading state management
 * - Error state display
 * - Custom Tailwind styling with dark mode support
 * - TypeScript strict mode compliance
 *
 * @param props - Component props
 * @returns Rendered login page component
 */
export function AuthLogin({
  onSuccessLogin,
  onError,
  provider = 'google',
  title,
  description,
}: AuthLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles successful OAuth response from the provider
   */
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      const err = new Error('No credential received from OAuth provider');
      setError(err.message);
      onError?.(err);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Pass credential to consuming application
      // The application is responsible for:
      // 1. Sending credential to backend for verification
      // 2. Updating auth context with user/token
      // 3. Handling navigation after login
      onSuccessLogin(credentialResponse.credential);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Login failed');
      console.error('OAuth login error:', error);
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OAuth provider errors
   */
  const handleGoogleError = () => {
    const err = new Error(`${provider} sign-in failed`);
    setError(err.message);
    onError?.(err);
  };

  // Currently only Google is supported
  // Future: Add GitHub, Microsoft providers
  if (provider !== 'google') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 p-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-destructive">
              Provider &ldquo;{provider}&rdquo; is not yet supported. Currently only
              &ldquo;google&rdquo; is available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground">Sign in to continue</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Use your Google account to get started
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
              />

              {isLoading && <p className="text-sm text-muted-foreground">Signing in...</p>}

              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
