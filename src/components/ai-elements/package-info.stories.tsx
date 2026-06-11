import type { Meta, StoryObj } from '@storybook/react-vite';
import { PackageInfo } from './package-info';

const meta = {
  title: 'AI Elements/PackageInfo',
  component: PackageInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof PackageInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'react',
    currentVersion: '18.2.0',
    newVersion: '19.0.0',
    changeType: 'major',
  },
};

export const MinorUpdate: Story = {
  args: {
    name: '@allsetlabs/forge',
    currentVersion: '1.0.0',
    newVersion: '1.1.0',
    changeType: 'minor',
  },
};
