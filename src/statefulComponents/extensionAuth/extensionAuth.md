# Extension Auth

Authentication state management for Chrome extensions that reads auth data from `chrome.storage.local`.

## Import

```tsx
import {
  ExtensionAuthProvider,
  useExtensionAuth,
} from '@allsetlabs/forge/statefulComponents/extensionAuth';
import type { ExtensionAuthContextType } from '@allsetlabs/forge/statefulComponents/extensionAuth';
```

## Features

- **Chrome Storage Integration**: Reads auth state from `chrome.storage.local`
- **Real-time Updates**: Listens for storage changes and updates state automatically
- **Extension-Specific**: Designed specifically for Chrome extension popups and pages
- **Auth Bridge Compatible**: Works with webapp's `AuthProvider` (with `enableExtensionBridge`)
- **Loading State**: Tracks authentication loading status
- **Automatic Sync**: Detects when webapp logs in/out via content script bridge

## Basic Usage

```tsx
import {
  ExtensionAuthProvider,
  useExtensionAuth,
} from '@allsetlabs/forge/statefulComponents/extensionAuth';

// In extension popup or page
function App() {
  return (
    <ExtensionAuthProvider>
      <PopupContent />
    </ExtensionAuthProvider>
  );
}

function PopupContent() {
  const { user, isAuthenticated, isLoading } = useExtensionAuth();

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <LoginPrompt />;
  return <MainContent user={user} />;
}
```

**Visual:**

> Extension popup that shows loading spinner initially, then either a login prompt or main content based on authentication state from chrome.storage.local.

## Components

### ExtensionAuthProvider

Provider component that manages authentication state from `chrome.storage.local`.

**Props:**

| Prop       | Type        | Default      | Description |
| ---------- | ----------- | ------------ | ----------- |
| `children` | `ReactNode` | **Required** | App content |

### useExtensionAuth

Hook to access extension authentication state.

**Returns:**

```tsx
{
  user: AuthUser | null,          // Current user or null
  token: string | null,           // Auth token or null
  isLoading: boolean,             // Loading state
  isAuthenticated: boolean,       // True if user and token both exist
  refreshAuth: () => Promise<void> // Force refresh from storage
}
```

## Examples

### Example 1: Basic Extension Popup

```tsx
import {
  ExtensionAuthProvider,
  useExtensionAuth,
} from '@allsetlabs/forge/statefulComponents/extensionAuth';

function Popup() {
  return (
    <ExtensionAuthProvider>
      <PopupContent />
    </ExtensionAuthProvider>
  );
}

function PopupContent() {
  const { user, isAuthenticated, isLoading } = useExtensionAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>Please log in on the Seekr website to use this extension.</p>
        <a href="https://seekr.app/login" target="_blank">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

**Visual:**

> Extension popup shows loading state, then either login instructions with link to webapp, or welcome message with user info.

### Example 2: Content Script Page

```tsx
import {
  ExtensionAuthProvider,
  useExtensionAuth,
} from '@allsetlabs/forge/statefulComponents/extensionAuth';

function ContentScriptUI() {
  return (
    <ExtensionAuthProvider>
      <ActionPanel />
    </ExtensionAuthProvider>
  );
}

function ActionPanel() {
  const { isAuthenticated, token } = useExtensionAuth();

  const handleAction = async () => {
    if (!token) return;

    const response = await fetch('https://api.seekr.app/action', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle response
  };

  if (!isAuthenticated) {
    return null; // Hide panel when not logged in
  }

  return <button onClick={handleAction}>Perform Action</button>;
}
```

**Visual:**

> Content script UI that only renders when user is authenticated. Uses token for authenticated API calls.

### Example 3: Manual Refresh

```tsx
function SettingsPanel() {
  const { user, refreshAuth, isLoading } = useExtensionAuth();

  const handleRefresh = async () => {
    await refreshAuth();
  };

  return (
    <div>
      <p>Logged in as: {user?.email}</p>
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh Auth'}
      </button>
    </div>
  );
}
```

**Visual:**

> Settings panel with refresh button to manually re-read auth state from chrome.storage.local.

## How It Works

### Authentication Flow

1. User logs in on the webapp (using `AuthProvider` with `enableExtensionBridge`)
2. Webapp's `AuthProvider` sends `postMessage` with auth data
3. Extension's `authBridge` content script receives message
4. Content script stores data in `chrome.storage.local`
5. `ExtensionAuthProvider` detects storage change and updates state
6. Extension components re-render with authenticated state

### Storage Keys

- Token key: `'seekr_auth_token'`
- User key: `'seekr_auth_user'`

### Storage Change Listener

The provider automatically listens for `chrome.storage.onChanged` events. When the auth keys change, it reloads the state from storage.

## TypeScript

```tsx
interface ExtensionAuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}
```

## Notes

- Only works in Chrome extension context (requires `chrome.storage.local`)
- Gracefully handles missing `chrome.storage` API (returns null values)
- Automatically updates when storage changes (no manual polling needed)
- Use with webapp's `AuthProvider` with `enableExtensionBridge={true}` for seamless sync
- `refreshAuth()` can be called to manually re-read from storage
- `isLoading` is true during initial load and during refresh
- Does NOT handle login/logout - that happens on the webapp
- The extension is a consumer of auth state, not a producer

## Related

- **[Auth](../auth/auth.md)** - Webapp authentication provider (use with `enableExtensionBridge`)
- **[AuthLogin](../../components/auth-login/auth-login.md)** - OAuth login component

## Accessibility

- Loading states should be announced to screen readers
- Login prompts should have clear instructions and accessible links
- Token refresh button should indicate loading state
