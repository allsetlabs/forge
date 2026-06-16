import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from './toolbar';
import { Button } from '../ui/button';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

const meta = {
  title: 'AI Elements/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toolbar>
      <Button variant="ghost" size="icon-sm">
        <BoldIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon-sm">
        <ItalicIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon-sm">
        <UnderlineIcon className="size-4" />
      </Button>
    </Toolbar>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Toolbar>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon-sm">
          <BoldIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <ItalicIcon className="size-4" />
        </Button>
      </div>
      <div className="bg-border h-4 w-px" />
      <div className="flex gap-1">
        <Button variant="ghost" size="icon-sm">
          <UnderlineIcon className="size-4" />
        </Button>
      </div>
    </Toolbar>
  ),
};
