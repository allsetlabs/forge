import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AuthContext, AuthContextType } from './context';
import { AuthUser, AuthTokenResponse } from '../../types/auth';

const MOCK_USER: AuthUser = {
  id: '1',
  email: 'user@example.com',
  name: 'Test User',
};

const MOCK_TOKEN_RESPONSE: AuthTokenResponse = {
  access_token: 'mock-token-123',
  token_type: 'Bearer',
  user: MOCK_USER,
};

function AuthDemo() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const value: AuthContextType = {
    user,
    token,
    isLoading: false,
    isAuthenticated: !!user && !!token,
    login: (tokenResponse: AuthTokenResponse) => {
      setToken(tokenResponse.access_token);
      setUser(tokenResponse.user);
    },
    logout: () => {
      setToken(null);
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      <div className="flex flex-col items-start gap-4 p-4">
        <p className="text-muted-foreground text-sm">
          Authenticated: <strong>{value.isAuthenticated ? 'Yes' : 'No'}</strong>
        </p>
        {value.user && (
          <div className="text-sm">
            <p>Name: {value.user.name}</p>
            <p>Email: {value.user.email}</p>
          </div>
        )}
        {value.isAuthenticated ? (
          <button
            className="bg-destructive text-destructive-foreground rounded px-3 py-1.5 text-sm"
            onClick={value.logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
            onClick={() => value.login(MOCK_TOKEN_RESPONSE)}
          >
            Login
          </button>
        )}
      </div>
    </AuthContext.Provider>
  );
}

const meta = {
  title: 'Stateful/Auth',
  component: AuthDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof AuthDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
