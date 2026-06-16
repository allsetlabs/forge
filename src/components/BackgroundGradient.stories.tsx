import type { Meta, StoryObj } from '@storybook/react-vite';
import { BackgroundGradient } from './BackgroundGradient';

const meta = {
  title: 'Utility/BackgroundGradient',
  component: BackgroundGradient,
  tags: ['autodocs'],
} satisfies Meta<typeof BackgroundGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <BackgroundGradient orbCount={3} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="bg-card/80 rounded-lg border p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold">Background Gradient</h1>
          <p className="text-muted-foreground">Animated floating gradient orbs in the background</p>
        </div>
      </div>
    </div>
  ),
};
