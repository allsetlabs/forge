# Types

TypeScript type definitions for the component library.

## Import

```tsx
// From the main types export (index.ts)
import type {
  AuthUser,
  AuthTokenResponse,
  AuthErrorResponse,
  AuthState,
  AuthProviderConfig,
  IAuthService,
} from '@allsetlabs/forge/types';

// Additional types available from auth.ts directly
import type {
  EmailLoginRequest,
  EmailSignupRequest,
  AuthMethod,
} from '@allsetlabs/forge/types/auth';
```

## Auth Types

### AuthUser

Generic user interface with extensible fields.

```tsx
interface AuthUser {
  id: string | number;
  email: string;
  name?: string;
  [key: string]: unknown; // Extensible
}

// Usage
const user: AuthUser = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe',
};

// Extended for provider-specific fields
interface GoogleAuthUser extends AuthUser {
  picture?: string;
  given_name?: string;
  family_name?: string;
}
```

### AuthTokenResponse

Response from authentication endpoints.

```tsx
interface AuthTokenResponse {
  access_token: string;
  token_type: string; // Usually "Bearer"
  user: AuthUser;
  expires_in?: number;
  [key: string]: unknown; // Extensible
}

// Usage
const response: AuthTokenResponse = {
  access_token: 'eyJhbGc...',
  token_type: 'Bearer',
  user: { id: '1', email: 'user@example.com' },
  expires_in: 3600,
};
```

### AuthErrorResponse

Consistent error handling structure.

```tsx
interface AuthErrorResponse {
  error: string;
  error_description?: string;
  error_uri?: string;
  [key: string]: unknown;
}

// Usage
const error: AuthErrorResponse = {
  error: 'invalid_credentials',
  error_description: 'The email or password is incorrect.',
};
```

### AuthState

Current authentication state for context.

```tsx
interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: AuthErrorResponse | null;
  isAuthenticated: boolean;
}

// Usage
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
};
```

### AuthProviderConfig

OAuth provider configuration.

```tsx
interface AuthProviderConfig {
  provider: string; // e.g., "google", "github"
  clientId: string;
  redirectUri?: string;
  scopes?: string[];
  [key: string]: unknown;
}

// Usage
const googleConfig: AuthProviderConfig = {
  provider: 'google',
  clientId: 'your-client-id.apps.googleusercontent.com',
  redirectUri: 'http://localhost:5173/callback',
  scopes: ['openid', 'email', 'profile'],
};
```

### IAuthService

Interface for authentication service implementations.

```tsx
interface IAuthService {
  authenticate(config: AuthProviderConfig): Promise<AuthTokenResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokenResponse>;
  getCurrentUser(): Promise<AuthUser | null>;
  isTokenValid(): boolean;
}
```

### EmailLoginRequest

Payload for email/password login.

```tsx
interface EmailLoginRequest {
  email: string;
  password: string;
}
```

### EmailSignupRequest

Payload for email/password signup.

```tsx
interface EmailSignupRequest {
  email: string;
  password: string;
  name: string;
}
```

### AuthMethod

Supported authentication methods.

```tsx
type AuthMethod = 'google' | 'email';
```

## Notes

- All auth types support extensibility via index signatures (`[key: string]: unknown`)
- Use these types as base interfaces and extend them for provider-specific fields
- Import types using `import type { ... }` for better tree-shaking
- Main types are exported from `@allsetlabs/forge/types` (index.ts)
- Additional types like `EmailLoginRequest`, `EmailSignupRequest`, and `AuthMethod` are available from `@allsetlabs/forge/types/auth`
