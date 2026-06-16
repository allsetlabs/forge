import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CursorContext, CursorContextType } from './context';
import { CursorToggle } from './toggle';

function CursorToggleWrapper() {
  const [isEnabled, setIsEnabled] = useState(false);

  const value: CursorContextType = {
    isEnabled,
    toggleCursor: () => setIsEnabled((prev) => !prev),
    canUseCursor: true,
  };

  return (
    <CursorContext.Provider value={value}>
      <div className="flex flex-col items-start gap-4">
        <CursorToggle />
        <p className="text-muted-foreground text-sm">
          Custom cursor: <strong>{isEnabled ? 'Enabled' : 'Disabled'}</strong>
        </p>
      </div>
    </CursorContext.Provider>
  );
}

const meta = {
  title: 'Stateful/CursorToggle',
  component: CursorToggleWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof CursorToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
