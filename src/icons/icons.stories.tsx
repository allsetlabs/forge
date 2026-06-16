import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from './index';

const AllIconsComponent = () => <div />;

const meta = {
  title: 'Icons/All Icons',
  component: AllIconsComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof AllIconsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => {
    const iconEntries = Object.entries(Icons).filter(([name]) => name.startsWith('Icon'));

    return (
      <div className="grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {iconEntries.map(([name, IconComponent]) => (
          <div
            key={name}
            className="hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4"
          >
            <IconComponent className="text-foreground h-8 w-8" />
            <span className="text-muted-foreground break-all text-center text-xs">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
