import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ExtensionAuthContext, ExtensionAuthContextType } from './context';
import { AuthUser } from '../../types/auth';

const MOCK_USER: AuthUser = {
  id: '1',
  email: 'user@example.com',
  name: 'Extension User',
};

function ExtensionAuthDemo() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const value: ExtensionAuthContextType = {
    user,
    token,
    isLoading: false,
    isAuthenticated: !!user && !!token,
    refreshAuth: async () => {
      setToken('mock-ext-token-123');
      setUser(MOCK_USER);
    },
  };

  return (
    <ExtensionAuthContext.Provider value={value}>
      <div className="flex flex-col items-start gap-4 p-4">
        <p className="text-muted-foreground text-sm">
          Extension Auth: <strong>{value.isAuthenticated ? 'Connected' : 'Not connected'}</strong>
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
            onClick={() => {
              setToken(null);
              setUser(null);
            }}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
            onClick={() => value.refreshAuth()}
          >
            Simulate Auth Sync
          </button>
        )}
      </div>
    </ExtensionAuthContext.Provider>
  );
}

const meta = {
  title: 'Stateful/ExtensionAuth',
  component: ExtensionAuthDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof ExtensionAuthDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
