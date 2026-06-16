import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextStaggerInview } from './text-stagger-inview';

const meta = {
  title: 'UI/TextStaggerInview',
  component: TextStaggerInview,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['default', 'left', 'right', 'top', 'bottom', 'z', 'blur'],
    },
    staggerValue: {
      control: { type: 'number', min: 0.01, max: 0.2, step: 0.01 },
    },
    staggerStart: {
      control: 'select',
      options: ['first', 'center', 'last'],
    },
  },
} satisfies Meta<typeof TextStaggerInview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stagger Text Inview Demo',
    className: 'text-4xl font-bold tracking-tight',
  },
};

export const BlurAnimation: Story = {
  args: {
    children: 'Blur Animation Effect',
    animation: 'blur',
    className: 'text-4xl font-bold tracking-tight',
    staggerValue: 0.03,
  },
};

export const LeftSlide: Story = {
  args: {
    children: 'Sliding From Left',
    animation: 'left',
    className: 'overflow-hidden text-3xl font-semibold',
  },
};

export const AllAnimations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['default', 'blur', 'left', 'right', 'top', 'bottom', 'z'] as const).map((anim) => (
        <div key={anim} className="overflow-hidden">
          <p className="text-muted-foreground mb-1 text-xs">{anim}</p>
          <TextStaggerInview
            animation={anim}
            className="text-2xl font-bold tracking-tight"
            staggerValue={0.03}
          >
            {`Animation: ${anim}`}
          </TextStaggerInview>
        </div>
      ))}
    </div>
  ),
};
