import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ImageProps } from './image';
import { Image } from './image';

const meta = {
  title: 'AI Elements/Image',
  component: Image,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Base64 encoded 1x1 transparent PNG
const sampleBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const defaultImageArgs: ImageProps = {
  base64: sampleBase64,
  uint8Array: new Uint8Array(),
  mediaType: 'image/png',
  alt: 'Generated image',
};

export const Default: Story = {
  args: defaultImageArgs,
};

export const WithCustomClass: Story = {
  args: {
    ...defaultImageArgs,
    alt: 'Custom styled image',
    className: 'border-2 border-primary',
  },
};

// Note: In a real scenario, the base64 would be a full image from AI generation
export const Placeholder: Story = {
  render: () => (
    <div className="bg-muted flex h-48 w-full items-center justify-center rounded-md border">
      <p className="text-muted-foreground text-sm">AI-generated image would appear here</p>
    </div>
  ),
};
