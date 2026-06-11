import type { Meta, StoryObj } from '@storybook/react-vite';
import { Snippet, SnippetText, SnippetInput, SnippetCopyButton } from './snippet';

const meta = {
  title: 'AI Elements/Snippet',
  component: Snippet,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Snippet code="npm install @allsetlabs/forge">
      <SnippetText>$</SnippetText>
      <SnippetInput />
      <SnippetCopyButton />
    </Snippet>
  ),
};

export const LongCommand: Story = {
  render: () => (
    <Snippet code="git clone https://github.com/user/repository.git && cd repository && npm install">
      <SnippetText>$</SnippetText>
      <SnippetInput />
      <SnippetCopyButton />
    </Snippet>
  ),
};

export const WithoutPrefix: Story = {
  render: () => (
    <Snippet code="API_KEY=your-secret-key-here">
      <SnippetInput />
      <SnippetCopyButton />
    </Snippet>
  ),
};

export const CustomPrefix: Story = {
  render: () => (
    <Snippet code="SELECT * FROM users WHERE active = true">
      <SnippetText>SQL</SnippetText>
      <SnippetInput />
      <SnippetCopyButton />
    </Snippet>
  ),
};
