# Auth

Complete authentication state management system with provider, context hook, and token/user persistence.

## Import

```tsx
import { AuthProvider, useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import type { AuthUser, AuthTokenResponse } from '@allsetlabs/forge/types/auth';
```

## Provider Initialization

**AuthProvider is automatically initialized in `InitializeForgeChunks`.**

You do **not** need to manually wrap your app with `AuthProvider` - it's already included when you use `InitializeForgeChunks` at your app root.

## Features

- **User Authentication State Management**: Manage authenticated user state globally
- **Token Storage & Retrieval**: Secure token and user data persistence
- **LocalStorage Persistence**: Saves authentication data across sessions with configurable keys
- **SSR-Safe Initialization**: Checks for window before accessing localStorage
- **Login & Logout Methods**: Simple API for auth state changes
- **Automatic Authentication Status**: Computed `isAuthenticated` based on user and token presence
- **Loading State**: Track authentication loading status
- **Multi-Module Support**: Configurable storage keys for different modules

## Basic Usage

```tsx
import { AuthProvider } from '@allsetlabs/forge/statefulComponents/auth';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

```tsx
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <div>Welcome, {user?.name}!</div>;
}
```

## Components

### AuthProvider

Provider component that manages authentication state and exposes context.

**Props:**

| Prop                    | Type                            | Default                                    | Description                                                    |
| ----------------------- | ------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| `children`              | `ReactNode`                     | **Required**                               | App content                                                    |
| `storageKeys`           | `{token: string, user: string}` | `{token: 'auth_token', user: 'auth_user'}` | localStorage keys for token and user                           |
| `enableExtensionBridge` | `boolean`                       | `false`                                    | Enable postMessage events for Chrome extension content scripts |

### useAuth

Hook to access authentication state and controls.

**Returns:**

```tsx
{
  user: AuthUser | null,                           // Current user or null
  token: string | null,                            // Auth token or null
  isLoading: boolean,                              // Loading state
  isAuthenticated: boolean,                        // True if user and token both exist
  login: (tokenResponse: AuthTokenResponse) => void, // Method to update auth state
  logout: () => void                               // Method to clear auth state
}
```

## Examples

### Example 1: Basic Authentication Setup

```tsx
import { AuthProvider } from '@allsetlabs/forge/statefulComponents/auth';
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}
```

**Visual:**

> App automatically checks authentication state from localStorage on mount. If user is authenticated, shows Dashboard; otherwise shows LoginPage.

### Example 2: Custom Storage Keys

```tsx
import { AuthProvider } from '@allsetlabs/forge/statefulComponents/auth';

// For multi-module apps with different storage namespaces
function App() {
  return (
    <AuthProvider
      storageKeys={{
        token: 'seekr_extension_token',
        user: 'seekr_extension_user',
      }}
    >
      <YourApp />
    </AuthProvider>
  );
}
```

**Visual:**

> AuthProvider configured with custom storage keys. Useful when multiple modules need separate auth storage.

### Example 2.5: Extension Bridge Mode

```tsx
import { AuthProvider } from '@allsetlabs/forge/statefulComponents/auth';

// For web apps that need to sync auth with Chrome extension
function App() {
  return (
    <AuthProvider enableExtensionBridge>
      <YourApp />
    </AuthProvider>
  );
}
```

**Visual:**

> AuthProvider configured to send postMessage events on login/logout. The extension's authBridge content script listens for these messages and stores auth data in chrome.storage.local, enabling seamless auth sync between webapp and extension.

### Example 3: Login Integration

```tsx
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import type { AuthTokenResponse } from '@allsetlabs/forge/types/auth';

function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    login(response); // Automatically stores user and token
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button disabled={isLoading} type="submit">
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
```

**Visual:**

> Form with email and password inputs. On submit, calls API and passes response to `login()` method which automatically stores credentials.

### Example 4: Logout with Navigation

```tsx
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears user and token from state and localStorage
    navigate('/login');
  };

  return (
    <menu>
      <span>Logged in as {user?.name}</span>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </menu>
  );
}
```

**Visual:**

> Menu displays current user name and logout button. Clicking logout clears auth state and navigates to login page.

### Example 5: Protected Routes

```tsx
import { useAuth } from '@allsetlabs/forge/statefulComponents/auth';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>;
```

**Visual:**

> Protected route component that shows loading spinner while checking auth, redirects to login if not authenticated, or renders children if authenticated.

## How It Works

### Initialization

1. On mount, checks `localStorage` for saved token and user using configured storage keys
2. If found, restores `user` and `token` state
3. Sets `isLoading` to false after initialization
4. SSR-safe: checks for `window` existence before accessing localStorage

### Login Flow

1. Component receives `AuthTokenResponse` from API (contains user and token)
2. Calls `login(response)`
3. Extracts `user` and `token` from response
4. Updates component state
5. Saves to localStorage using configured keys
6. `isAuthenticated` automatically becomes true

### Logout Flow

1. Component calls `logout()`
2. Clears `user` and `token` from state
3. Removes entries from localStorage
4. `isAuthenticated` automatically becomes false
5. Navigation typically handles redirect to login

### LocalStorage Keys

- Default token key: `'auth_token'`
- Default user key: `'auth_user'`
- Both are configurable via AuthProvider props
- User is stored as JSON string (parsed on load)

## TypeScript

```tsx
interface AuthUser {
  id: string | number;
  email: string;
  name?: string;
  [key: string]: unknown;
}

interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
  expires_in?: number;
  [key: string]: unknown;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (tokenResponse: AuthTokenResponse) => void;
  logout: () => void;
}

// Usage
const { user, token, isLoading, isAuthenticated, login, logout } = useAuth();
```

## Notes

- AuthProvider is **automatically initialized in `InitializeForgeChunks`** - no manual setup required
- `useAuth` hook must be used within an AuthProvider subtree (throws error otherwise)
- localStorage keys are configurable per module/app via AuthProvider props
- `user` and `token` are stored separately in localStorage
- Both `user` (JSON) and `token` (string) are automatically serialized/deserialized
- `isAuthenticated` is computed as: `!!user && !!token` (both must be present)
- Automatically loads from localStorage on mount
- SSR-safe: checks for `window` before accessing localStorage
- Login response format: `{access_token: string, token_type: string, user: {id, email, name?}}`
- Logout immediately clears state and storage (no API call required, but component can add one)
- Token is typically stored as a string (JWT or session token)
- `isLoading` is only true during initial mount while checking localStorage
- No automatic token refresh - implement in your login API call
- Multiple modules can use different storage keys via `storageKeys` prop

## Accessibility

- Auth state changes don't require specific a11y handling
- Protected route components should show loading state to announce changes to screen readers
- Logout button should have clear label indicating the action
- Login form should properly label inputs with `<label>` elements or `aria-label`
- Error messages for failed login should be announced to screen readers
- `isAuthenticated` state changes may require focus management (e.g., redirect after logout)
