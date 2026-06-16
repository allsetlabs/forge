import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          className="cursor-pointer underline"
          href="https://github.com/shadcn"
          target="_blank"
          rel="noreferrer"
        >
          @shadcn
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">The React component library you&apos;ve been waiting for.</p>
            <div className="flex items-center pt-2">
              <span className="text-muted-foreground text-xs">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
