# AuthLogin

Complete OAuth login page component with support for multiple providers and built-in loading/error states.

## Import

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import type { AuthLoginProps } from '@allsetlabs/forge/components/auth-login';
```

## Features

- **Full Login Page UI**: Complete login page with title, description, and OAuth buttons
- **OAuth Provider Support**: Google OAuth integration with extensible architecture for GitHub and Microsoft (future)
- **Loading State Management**: Automatic loading indicator while OAuth is processing
- **Error Handling**: Built-in error display with customizable error callback
- **Custom Colors**: Uses theme-aware custom Tailwind colors (`text-muted-foreground`, `text-destructive`)
- **Dark Mode Support**: Full dark mode compatibility via CSS variables
- **Callback Pattern**: Flexible callback-based architecture - component handles UI, consumer handles API/auth logic
- **TypeScript Strict**: Full TypeScript strict mode compliance with no `any` types
- **Accessibility**: Semantic HTML with proper ARIA labels and keyboard support

## Basic Usage

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';

function LoginPage() {
  const handleSuccess = async (credential: string) => {
    // Handle credential - send to your backend
    console.log('OAuth credential:', credential);
  };

  return (
    <AuthLogin
      title="My App"
      description="Sign in to your account"
      onSuccessLogin={handleSuccess}
    />
  );
}
```

**Visual:**

> Full-screen centered login page with app title at top, card containing "Sign in to continue" message and Google login button, loading state shows "Signing in..." message, error state displays error message in red below the button

## Props

| Prop             | Type                                  | Default    | Description                                                                                                                                  |
| ---------------- | ------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | `string`                              | Required   | Application title displayed at the top of the login page (e.g., "Seekr", "My App")                                                           |
| `description`    | `string`                              | Required   | Description text displayed below the title (e.g., "Your AI-powered resume builder")                                                          |
| `onSuccessLogin` | `(credential: string) => void`        | Required   | Callback function invoked when OAuth authentication succeeds. Receives the OAuth credential string that should be validated on your backend. |
| `onError`        | `(error: Error) => void`              | Optional   | Callback function invoked when OAuth authentication fails. Receives the error object for logging/display.                                    |
| `provider`       | `'google' \| 'github' \| 'microsoft'` | `'google'` | OAuth provider to use for authentication. Currently only 'google' is implemented and functional.                                             |

## Examples

### Example 1: Basic Google Login

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { authApi } from '../utils/api';

function LoginPage() {
  const { login } = useAuth();

  const handleSuccess = async (credential: string) => {
    try {
      // Send credential to backend for verification
      const tokenResponse = await authApi.googleLogin(credential);

      // Update auth context with user and token
      login(tokenResponse);

      // Navigation handled by route guard (useEffect watching isAuthenticated)
    } catch (error) {
      console.error('Backend login failed:', error);
    }
  };

  return (
    <AuthLogin
      title="Seekr"
      description="Your AI-powered resume builder"
      onSuccessLogin={handleSuccess}
    />
  );
}
```

**Visual:**

> Full-screen centered login page with "Seekr" as title, description below, card with "Sign in to continue" and Google button. On successful login, the button shows "Signing in..." while the credential is sent to the backend. After successful API response, user is redirected to dashboard.

### Example 2: Login with Error Handling

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { useToast } from '@allsetlabs/forge/hooks/use-toast';
import { authApi } from '../utils/api';

function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSuccess = async (credential: string) => {
    try {
      const tokenResponse = await authApi.googleLogin(credential);
      login(tokenResponse);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  const handleError = (error: Error) => {
    console.error('OAuth error:', error);
    showToast({
      type: 'error',
      title: 'Authentication Error',
      message: 'Failed to authenticate with Google. Please try again.',
    });
  };

  return (
    <AuthLogin
      title="My App"
      description="Sign in to your account"
      onSuccessLogin={handleSuccess}
      onError={handleError}
      provider="google"
    />
  );
}
```

**Visual:**

> Full login page with title and description. When OAuth fails, error message displays below Google button in red, and a toast notification appears at the top of the screen.

### Example 3: Login Modal with Custom Styling

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@allsetlabs/forge/components/ui/dialog';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { authApi } from '../utils/api';

function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login } = useAuth();

  const handleSuccess = async (credential: string) => {
    try {
      const tokenResponse = await authApi.googleLogin(credential);
      login(tokenResponse);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In to Your Account</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <AuthLogin onSuccessLogin={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Visual:**

> Modal dialog with title "Sign In to Your Account" and AuthLogin component. Modal can be closed by pressing Escape or clicking outside. Loading and error states are visible within the modal context.

### Example 4: Pre-Login Page with Other Options

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import { Button } from '@allsetlabs/forge/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@allsetlabs/forge/components/ui/card';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { Separator } from '@allsetlabs/forge/components/ui/separator';
import { authApi } from '../utils/api';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const handleSuccess = async (credential: string) => {
    const tokenResponse = await authApi.googleLogin(credential);
    login(tokenResponse);
  };

  const handleEmailLogin = async () => {
    // Handle email/password login
  };

  return (
    <div className="from-background to-muted/50 flex min-h-screen items-center justify-center bg-gradient-to-b">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthLogin onSuccessLogin={handleSuccess} />

          <Separator />

          <div className="space-y-2">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
            />
            <Button onClick={handleEmailLogin} className="w-full">
              Sign in with Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Visual:**

> Login page with card containing title "Welcome Back", Google OAuth login button, separator line, and email login input field with button. Google option appears first as primary OAuth method.

### Example 5: Integration with Route Guards

```tsx
import { AuthLogin } from '@allsetlabs/forge/components/auth-login';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authApi } from '../utils/api';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = async (credential: string) => {
    try {
      const tokenResponse = await authApi.googleLogin(credential);

      // After login completes, useEffect will redirect to /dashboard
      login(tokenResponse);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthLogin onSuccessLogin={handleSuccess} />
    </div>
  );
}
```

**Visual:**

> Login page that automatically redirects to dashboard after successful authentication. Loading state shows while credential is being validated on backend.

## Required Setup

### 1. GoogleOAuthProvider Configuration

The consuming module must wrap the application with `GoogleOAuthProvider` at the root level:

```tsx
// main.tsx or entry point
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@allsetlabs/forge/statefulComponents/auth';
import App from './App';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider storageKeys={{ token: 'app_auth_token', user: 'app_user' }}>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);
```

### 2. Environment Variables

Add to your `.env`:

```
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 3. Dependencies

Ensure your module has `@react-oauth/google` installed:

```bash
npm install @react-oauth/google
```

## Accessibility

- Uses semantic HTML button elements from Google's OAuth library
- Keyboard navigation: Tab to focus, Enter/Space to activate
- Loading state announces "Signing in..." message for screen readers
- Error messages are announced via semantic text elements
- Focus ring visible for keyboard users
- ARIA labels from Google OAuth component provide context

## TypeScript

```tsx
interface AuthLoginProps {
  /**
   * Application title to display at the top of the login page
   */
  title: string;

  /**
   * Description text to display below the title
   */
  description: string;

  /**
   * Callback invoked when OAuth authentication succeeds.
   * Receives the OAuth credential string that should be sent to your backend.
   */
  onSuccessLogin: (credential: string) => void;

  /**
   * Optional callback invoked when OAuth authentication fails.
   * Receives the error object for logging/display.
   */
  onError?: (error: Error) => void;

  /**
   * OAuth provider to use for authentication.
   * Currently only 'google' is fully supported.
   * Future: 'github', 'microsoft'
   *
   * @default 'google'
   */
  provider?: 'google' | 'github' | 'microsoft';
}
```

## Component Responsibility

### What AuthLogin DOES

- Renders Google OAuth button with proper styling
- Manages loading state during OAuth flow
- Manages error state and displays error messages
- Calls `onSuccessLogin(credential)` when OAuth succeeds
- Calls `onError(error)` when OAuth fails

### What AuthLogin DOES NOT do

- Does NOT make API calls to backend (consumer's responsibility)
- Does NOT update auth context or localStorage (consumer's responsibility)
- Does NOT handle navigation after login (consumer's responsibility)
- Does NOT persist tokens (consumer's responsibility)

This separation of concerns makes the component truly reusable across different modules with different authentication backends and flows.

## Usage Pattern

```
1. User clicks Google button in AuthLogin
   ↓
2. Google OAuth completes → credential returned to AuthLogin
   ↓
3. AuthLogin calls onSuccessLogin(credential)
   ↓
4. Consumer sends credential to their backend API
   ↓
5. Backend verifies credential and returns user + access_token
   ↓
6. Consumer calls login(tokenResponse) from useAuth()
   ↓
7. AuthProvider updates context and localStorage
   ↓
8. App redirects to authenticated route
```

## Notes

- The component handles the Google OAuth UI and credential retrieval only
- Consumer modules are responsible for backend API integration
- Different modules can use different backends (FastAPI, Node.js, etc.)
- The `provider` prop is extensible - GitHub and Microsoft can be added without breaking changes
- Loading state prevents multiple simultaneous login attempts
- Error messages are displayed inline for immediate user feedback
- Component uses custom theme colors for consistency across dark/light modes
- Uses `@react-oauth/google` peer dependency (must be installed by consuming module)

## Common Integration Patterns

### Pattern 1: Simple Single-Page App

```tsx
// In your login page component
const { login } = useAuth();

const handleSuccess = async (credential: string) => {
  const response = await api.post('/auth/google', { credential });
  login(response.data);
};

return <AuthLogin onSuccessLogin={handleSuccess} />;
```

### Pattern 2: Dashboard with User Profile

```tsx
// In your header/navbar component
import { Button } from '@allsetlabs/forge/components/ui/button';

const { user, logout } = useAuth();

return (
  <header>
    <h1>Welcome, {user?.name}</h1>
    <Button variant="ghost" onClick={logout}>
      Sign Out
    </Button>
  </header>
);
```

### Pattern 3: Protected Routes

```tsx
// Route guard component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
}

// In router config
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

## Related Components

- **Button**: Used by AuthLogin for styling and interaction
- **Card**: Common wrapper for login pages
- **Dialog**: Can be used to create login modals
- **useAuth**: Stateful hook for accessing auth context and methods
