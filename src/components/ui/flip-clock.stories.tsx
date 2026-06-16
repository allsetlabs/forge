import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlipClock } from './flip-clock';

const meta = {
  title: 'UI/FlipClock',
  component: FlipClock,
  tags: ['autodocs'],
} satisfies Meta<typeof FlipClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    countdown: false,
  },
};

export const Small: Story = {
  args: {
    countdown: false,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    countdown: false,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    countdown: false,
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    countdown: false,
    size: 'xl',
  },
};

export const SecondaryVariant: Story = {
  args: {
    countdown: false,
    variant: 'secondary',
  },
};

export const DestructiveVariant: Story = {
  args: {
    countdown: false,
    variant: 'destructive',
  },
};

export const OutlineVariant: Story = {
  args: {
    countdown: false,
    variant: 'outline',
  },
};

export const MutedVariant: Story = {
  args: {
    countdown: false,
    variant: 'muted',
  },
};

export const CountdownMode: Story = {
  render: () => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);
    targetDate.setMinutes(targetDate.getMinutes() + 30);

    return <FlipClock countdown={true} targetDate={targetDate} />;
  },
};

export const CountdownWithDays: Story = {
  render: () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    targetDate.setHours(targetDate.getHours() + 12);

    return <FlipClock countdown={true} targetDate={targetDate} showDays="always" />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Default</p>
        <FlipClock countdown={false} variant="default" size="sm" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Secondary</p>
        <FlipClock countdown={false} variant="secondary" size="sm" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Destructive</p>
        <FlipClock countdown={false} variant="destructive" size="sm" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Outline</p>
        <FlipClock countdown={false} variant="outline" size="sm" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Muted</p>
        <FlipClock countdown={false} variant="muted" size="sm" />
      </div>
    </div>
  ),
};
