import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeContext, Theme, ThemeContextType } from './context';
import { ThemeToggle } from './toggle';

function ThemeToggleWrapper() {
  const [theme, setThemeState] = useState<Theme>('system');
  const resolvedTheme = theme === 'system' ? 'light' : theme;

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => setThemeState(newTheme),
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className="flex flex-col items-start gap-4">
        <ThemeToggle />
        <p className="text-muted-foreground text-sm">
          Current: <strong>{theme}</strong> (resolved: {resolvedTheme})
        </p>
      </div>
    </ThemeContext.Provider>
  );
}

const meta = {
  title: 'Stateful/ThemeToggle',
  component: ThemeToggleWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
