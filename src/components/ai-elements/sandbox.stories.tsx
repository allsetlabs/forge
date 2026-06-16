import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sandbox, SandboxHeader, SandboxContent } from './sandbox';

const meta = {
  title: 'AI Elements/Sandbox',
  component: Sandbox,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Sandbox>
      <SandboxHeader title="Preview" state="output-available" />
      <SandboxContent>
        <div className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground text-sm">Sandbox content preview</p>
        </div>
      </SandboxContent>
    </Sandbox>
  ),
};

export const Loading: Story = {
  render: () => (
    <Sandbox>
      <SandboxHeader title="Running code..." state="input-streaming" />
      <SandboxContent>
        <div className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </SandboxContent>
    </Sandbox>
  ),
};
