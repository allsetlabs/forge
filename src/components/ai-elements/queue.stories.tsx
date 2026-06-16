import type { Meta, StoryObj } from '@storybook/react-vite';
import { Queue, QueueList, QueueItem, QueueItemIndicator, QueueItemContent } from './queue';

const meta = {
  title: 'AI Elements/Queue',
  component: Queue,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Queue>
      <QueueList>
        <QueueItem>
          <div className="flex items-center gap-2">
            <QueueItemIndicator />
            <QueueItemContent>Process document</QueueItemContent>
          </div>
        </QueueItem>
        <QueueItem>
          <div className="flex items-center gap-2">
            <QueueItemIndicator />
            <QueueItemContent>Generate report</QueueItemContent>
          </div>
        </QueueItem>
        <QueueItem>
          <div className="flex items-center gap-2">
            <QueueItemIndicator completed />
            <QueueItemContent completed>Send email</QueueItemContent>
          </div>
        </QueueItem>
      </QueueList>
    </Queue>
  ),
};

export const Empty: Story = {
  render: () => (
    <Queue>
      <QueueList>
        <p className="text-muted-foreground p-4 text-center text-sm">No items in queue</p>
      </QueueList>
    </Queue>
  ),
};
