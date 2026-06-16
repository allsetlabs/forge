import type { Meta, StoryObj } from '@storybook/react-vite';
import { Connection } from './connection';

const meta = {
  title: 'AI Elements/Connection',
  component: Connection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Connection line component for ReactFlow. Used within Canvas/ReactFlow context.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Note: This component is meant to be used within ReactFlow/Canvas
// It cannot be demonstrated standalone without the ReactFlow context
export const Documentation: Story = {
  render: () => (
    <div className="bg-muted flex h-48 items-center justify-center rounded-md border p-4">
      <p className="text-muted-foreground text-center text-sm">
        Connection component is used as a connectionLineComponent in ReactFlow.
        <br />
        See Canvas stories for usage examples.
      </p>
    </div>
  ),
};
