import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AudioContext, AudioContextType } from './context';
import { AudioToggle } from './toggle';

function AudioToggleWrapper() {
  const [isMuted, setIsMuted] = useState(false);

  const value: AudioContextType = {
    isMuted,
    toggleMute: () => setIsMuted((prev) => !prev),
  };

  return (
    <AudioContext.Provider value={value}>
      <div className="flex flex-col items-start gap-4">
        <AudioToggle />
        <p className="text-muted-foreground text-sm">
          Audio: <strong>{isMuted ? 'Muted' : 'Unmuted'}</strong>
        </p>
      </div>
    </AudioContext.Provider>
  );
}

const meta = {
  title: 'Stateful/AudioToggle',
  component: AudioToggleWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof AudioToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
