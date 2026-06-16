import type { Meta, StoryObj } from '@storybook/react-vite';
import { Edge } from './edge';

const meta = {
  title: 'AI Elements/Edge',
  component: Edge.Animated,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Edge components for ReactFlow. Includes Animated and Temporary edge types. Used within Canvas/ReactFlow context.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Note: These components are meant to be used within ReactFlow/Canvas
// They cannot be demonstrated standalone without the ReactFlow context
export const Documentation: Story = {
  render: () => (
    <div className="bg-muted flex h-48 flex-col items-center justify-center gap-4 rounded-md border p-4">
      <p className="text-muted-foreground text-center text-sm">
        Edge components are used in ReactFlow to connect nodes.
        <br />
        Available types: Edge.Animated, Edge.Temporary
        <br />
        See Canvas stories for usage examples.
      </p>
    </div>
  ),
};
