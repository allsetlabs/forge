# InitializeForgeChunks

Setup component that initializes all necessary providers and styles for the component library.

## Import

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
```

## Overview

`InitializeForgeChunks` is a wrapper component that sets up all required context providers and imports global styles. This is the **required** first step when using the component library in your application.

**What it provides:**

- Theme management (dark/light mode)
- Audio feedback system
- Custom cursor functionality
- Authentication state management
- Global styles and CSS variables
- Optional Google OAuth integration with login guard

## Props

| Prop           | Type         | Default     | Description                                                                                                   |
| -------------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`  | Required    | Your application components to be wrapped                                                                     |
| `applyToBody`  | `boolean`    | `false`     | If true, applies root ID to body element (full-page). If false, applies to container div (Shadow DOM/scoped). |
| `auth`         | `AuthConfig` | `undefined` | Optional authentication configuration. If provided, shows login screen when not authenticated.                |
| `defaultMuted` | `boolean`    | `false`     | When true, initializes audio as muted (click sounds disabled by default). User can still toggle audio on.     |

### AuthConfig

| Property                | Type                                                 | Default                 | Description                                                                                          |
| ----------------------- | ---------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `googleClientId`        | `string`                                             | Required                | Google OAuth client ID                                                                               |
| `onSuccess`             | `(credential: string) => Promise<AuthTokenResponse>` | -                       | Callback to handle successful OAuth credential. If not provided, AuthGuard is skipped.               |
| `loginTitle`            | `string`                                             | `"Welcome"`             | Title displayed on login page                                                                        |
| `loginDescription`      | `string`                                             | `"Sign in to continue"` | Description text on login page                                                                       |
| `enableExtensionBridge` | `boolean`                                            | `false`                 | Enable extension bridge mode to send postMessage events on login/logout for Chrome extension syncing |

## Basic Usage

### Without Authentication (Public Apps)

For apps that don't require authentication:

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';

function App() {
  return (
    <InitializeForgeChunks applyToBody>
      <YourPublicApp />
    </InitializeForgeChunks>
  );
}
```

### With Authentication (Protected Apps)

For apps requiring Google OAuth authentication:

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
import { authApi } from './utils/api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <InitializeForgeChunks
      applyToBody
      auth={{
        googleClientId: GOOGLE_CLIENT_ID,
        onSuccess: authApi.googleLogin,
        loginTitle: 'My App',
        loginDescription: 'Sign in to get started',
      }}
    >
      <ProtectedApp />
    </InitializeForgeChunks>
  );
}
```

When `auth` is provided:

- Shows loading spinner while checking auth state
- Shows `AuthLogin` component if not authenticated
- Renders children only when authenticated

## What Gets Initialized

### 1. ThemeProvider

Provides dark/light theme management throughout your app. Access via `useThemeContext()` hook.

### 2. AudioProvider

Enables global audio feedback (click sounds, interactions). Access via `useAudioContext()` hook.

### 3. CursorProvider

Manages custom animated cursor state. Access via `useCursorContext()` hook.

### 4. TooltipProvider

Enables tooltip rendering for all components that use tooltips. Wraps children inside `CursorProvider`.

### 5. AuthProvider

Manages authentication state (user, token, isAuthenticated). Access via `useAuth()` hook.

### 6. GoogleOAuthProvider (when `auth` is provided)

Sets up Google OAuth context for `AuthLogin` component.

### 7. Global Styles

Automatically imports all necessary CSS including:

- Tailwind base, components, and utilities
- Theme CSS variables
- Custom animations
- Scrollbar and focus styling

## Examples

### Example 1: Portfolio/Public Website (No Auth)

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
import { Button } from '@allsetlabs/forge/components/ui/button';

function App() {
  return (
    <InitializeForgeChunks applyToBody>
      <div className="bg-background min-h-screen">
        <h1 className="text-foreground">My Portfolio</h1>
        <Button>View Projects</Button>
      </div>
    </InitializeForgeChunks>
  );
}

export default App;
```

### Example 2: Authenticated Web App (Seekr)

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authApi } from './utils/api';
import { Dashboard } from './pages/Dashboard';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

function App() {
  return (
    <InitializeForgeChunks
      applyToBody
      auth={{
        googleClientId: GOOGLE_CLIENT_ID,
        onSuccess: authApi.googleLogin,
        loginTitle: 'Seekr',
        loginDescription: 'Your AI-powered resume builder',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </InitializeForgeChunks>
  );
}
```

### Example 3: Chrome Extension (Scoped Styling)

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';

// For Chrome extensions, use applyToBody={false} for scoped styling
function ExtensionPopup() {
  return (
    <InitializeForgeChunks applyToBody={false}>
      <div className="bg-background w-80 p-4">
        <h1 className="text-foreground">Extension Popup</h1>
      </div>
    </InitializeForgeChunks>
  );
}
```

### Example 4: Accessing Auth Context

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';

function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function App() {
  return (
    <InitializeForgeChunks
      applyToBody
      auth={{
        googleClientId: 'your-client-id',
        onSuccess: async (credential) => {
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            body: JSON.stringify({ credential }),
          });
          return response.json();
        },
      }}
    >
      <UserProfile />
    </InitializeForgeChunks>
  );
}
```

## TypeScript

```tsx
import type { AuthTokenResponse } from '@allsetlabs/forge/types/auth';

interface AuthConfig {
  googleClientId: string;
  onSuccess?: (credential: string) => Promise<AuthTokenResponse>;
  loginTitle?: string;
  loginDescription?: string;
  enableExtensionBridge?: boolean;
}

interface InitializeForgeChunksProps {
  children: ReactNode;
  applyToBody?: boolean;
  auth?: AuthConfig;
  defaultMuted?: boolean;
}
```

## Authentication Flow

When `auth` prop is provided:

```
1. User visits app
   ↓
2. InitializeForgeChunks checks auth state
   ↓
3. If isLoading: Show loading spinner
   ↓
4. If !isAuthenticated: Show AuthLogin page
   ↓
5. User clicks "Sign in with Google"
   ↓
6. Google OAuth returns credential
   ↓
7. onSuccess(credential) called → Backend verifies → Returns AuthTokenResponse
   ↓
8. AuthProvider.login(tokenResponse) called
   ↓
9. Token stored in localStorage, isAuthenticated = true
   ↓
10. Children (app) rendered
```

## Notes

- **Required**: You must wrap your app with this component to use the library
- Place it at the root of your application, outside any routing
- Only use once per application (at the top level)
- All child components automatically have access to theme, audio, cursor, and auth contexts
- If `auth` is not provided, children render directly (no authentication required)
- `applyToBody={true}` for regular web apps, `applyToBody={false}` for Chrome extensions/Shadow DOM
- The `AuthTokenResponse` returned from `onSuccess` must include `access_token`, `token_type`, and `user` fields
