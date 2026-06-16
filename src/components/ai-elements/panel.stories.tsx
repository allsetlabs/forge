import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas } from './canvas';
import { Panel } from './panel';

const meta = {
  title: 'AI Elements/Panel',
  component: Panel,
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-96 w-full">
      <Canvas>
        <Panel position="top-left">
          <div className="bg-background rounded-md border p-2">
            <p className="text-sm">Top Left Panel</p>
          </div>
        </Panel>
        <Panel position="top-right">
          <div className="bg-background rounded-md border p-2">
            <p className="text-sm">Top Right Panel</p>
          </div>
        </Panel>
      </Canvas>
    </div>
  ),
};
