import type { Meta, StoryObj } from '@storybook/react-vite';
import { Package } from 'lucide-react';
import { DataFetchWrapper } from './DataFetchWrapper';

const meta = {
  title: 'Utility/DataFetchWrapper',
  component: DataFetchWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof DataFetchWrapper>;

export default meta;

export const Loading: StoryObj = {
  render: () => (
    <DataFetchWrapper isLoading={true} error={null}>
      <div>Data content</div>
    </DataFetchWrapper>
  ),
};

export const WithData: StoryObj = {
  render: () => (
    <DataFetchWrapper isLoading={false} error={null}>
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Successfully loaded data</h3>
        <p className="text-muted-foreground text-sm">This is your data content.</p>
      </div>
    </DataFetchWrapper>
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <DataFetchWrapper
      isLoading={false}
      error={null}
      isEmpty={true}
      emptyMessage="No items found"
      emptyTitle="No Items"
      emptyIcon={<Package className="text-muted-foreground h-12 w-12" />}
    >
      <div>Data content</div>
    </DataFetchWrapper>
  ),
};

export const Error: StoryObj = {
  render: () => (
    <DataFetchWrapper isLoading={false} error="Failed to fetch data. Please try again later.">
      <div>Data content</div>
    </DataFetchWrapper>
  ),
};
