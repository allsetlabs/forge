import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plan, PlanHeader, PlanTitle, PlanDescription, PlanContent, PlanTrigger } from './plan';

const meta = {
  title: 'AI Elements/Plan',
  component: Plan,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Plan defaultOpen>
      <PlanHeader>
        <PlanTitle>Implementation Plan</PlanTitle>
        <PlanDescription>Steps to complete the feature</PlanDescription>
      </PlanHeader>
      <PlanTrigger />
      <PlanContent>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>Analyze requirements</li>
          <li>Design architecture</li>
          <li>Implement features</li>
          <li>Write tests</li>
          <li>Deploy</li>
        </ul>
      </PlanContent>
    </Plan>
  ),
};

export const Streaming: Story = {
  render: () => (
    <Plan isStreaming defaultOpen>
      <PlanHeader>
        <PlanTitle>Generating Plan...</PlanTitle>
        <PlanDescription>AI is creating your plan</PlanDescription>
      </PlanHeader>
      <PlanContent>
        <p className="text-muted-foreground text-sm">Planning in progress...</p>
      </PlanContent>
    </Plan>
  ),
};
