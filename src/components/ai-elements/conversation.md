# Conversation

Scrollable conversation container with auto-scroll and download functionality.

## Import

```tsx
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  ConversationDownload,
  messagesToMarkdown,
} from '@allsetlabs/forge/components/ai-elements/conversation';
```

## Features

- **Auto-Scroll**: Automatically sticks to bottom when new messages arrive
- **Scroll to Bottom**: Button appears when scrolled up
- **Empty State**: Customizable empty state display
- **Download**: Export conversation as markdown
- **Smooth Scrolling**: Smooth scroll behavior on resize and new content
- **Accessibility**: Role="log" for screen readers

## Basic Usage

```tsx
<Conversation>
  <ConversationContent>
    {messages.map((message) => (
      <MessageComponent key={message.id} message={message} />
    ))}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
```

**Visual:**

> Scrollable conversation area that auto-sticks to bottom. Scroll-to-bottom button appears when scrolled up.

## Props

### Conversation

| Prop      | Type                                  | Default    | Description             |
| --------- | ------------------------------------- | ---------- | ----------------------- |
| initial   | `'smooth'` \| `'instant'` \| `'none'` | `'smooth'` | Initial scroll behavior |
| resize    | `'smooth'` \| `'instant'` \| `'none'` | `'smooth'` | Resize scroll behavior  |
| className | `string`                              | -          | Additional CSS classes  |

### ConversationEmptyState

| Prop        | Type        | Default                     | Description            |
| ----------- | ----------- | --------------------------- | ---------------------- |
| title       | `string`    | `'No messages yet'`         | Empty state title      |
| description | `string`    | `'Start a conversation...'` | Description text       |
| icon        | `ReactNode` | -                           | Optional icon          |
| className   | `string`    | -                           | Additional CSS classes |

### ConversationDownload

| Prop          | Type                    | Default             | Description              |
| ------------- | ----------------------- | ------------------- | ------------------------ |
| messages      | `ConversationMessage[]` | -                   | Messages to export       |
| filename      | `string`                | `'conversation.md'` | Download filename        |
| formatMessage | `function`              | Default formatter   | Custom message formatter |
| className     | `string`                | -                   | Additional CSS classes   |

## Examples

### Example 1: Basic Conversation

```tsx
<div style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
  <Conversation>
    <ConversationContent>
      {messages.length === 0 ? (
        <ConversationEmptyState />
      ) : (
        messages.map((msg) => <Message key={msg.id} {...msg} />)
      )}
    </ConversationContent>
    <ConversationScrollButton />
  </Conversation>
</div>
```

**Visual:**

> Full-height conversation with messages or empty state. Scroll button appears when not at bottom.

### Example 2: Custom Empty State

```tsx
import { MessageCircle } from 'lucide-react';

<Conversation>
  <ConversationContent>
    {messages.length === 0 ? (
      <ConversationEmptyState
        title="Start Chatting"
        description="Send a message to begin the conversation"
        icon={<MessageCircle className="size-12" />}
      />
    ) : (
      messages.map((msg) => <Message key={msg.id} {...msg} />)
    )}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>;
```

**Visual:**

> Empty state with large message icon, custom title and description centered in conversation area.

### Example 3: With Download

```tsx
const messages: ConversationMessage[] = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi! How can I help?' },
  { role: 'user', content: 'Tell me about AI' },
];

<div className="relative">
  <Conversation>
    <ConversationContent>
      {messages.map((msg, i) => (
        <Message key={i} {...msg} />
      ))}
    </ConversationContent>
    <ConversationScrollButton />
  </Conversation>
  <ConversationDownload messages={messages} filename="chat-2024-01-15.md" />
</div>;
```

**Visual:**

> Conversation with floating download button in top-right corner. Downloads conversation as markdown file.

### Example 4: Custom Message Format

```tsx
const formatMessage = (message: ConversationMessage, index: number) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${message.role}: ${message.content}`;
};

<ConversationDownload messages={messages} filename="chat.md" formatMessage={formatMessage} />;
```

**Visual:**

> Download creates markdown with timestamps for each message.

### Example 5: Instant Scroll Behavior

```tsx
<Conversation initial="instant" resize="instant">
  <ConversationContent>
    {messages.map((msg) => (
      <Message key={msg.id} {...msg} />
    ))}
  </ConversationContent>
</Conversation>
```

**Visual:**

> Conversation that scrolls instantly without animation.

## ConversationMessage Type

```tsx
interface ConversationMessage {
  role: 'user' | 'assistant' | 'system' | 'data' | 'tool';
  content: string;
}
```

## Download Format

Default markdown format:

```markdown
**User:** Hello

**Assistant:** Hi! How can I help?

**User:** Tell me about AI
```

## Scroll Behavior

- **initial**: How to scroll on mount
  - `'smooth'`: Smooth scroll animation
  - `'instant'`: Jump instantly
  - `'none'`: Don't scroll

- **resize**: How to scroll on resize
  - `'smooth'`: Smooth scroll animation (default)
  - `'instant'`: Jump instantly
  - `'none'`: Don't scroll

## Utilities

### messagesToMarkdown

```tsx
const markdown = messagesToMarkdown(messages, formatMessage);
// Returns full markdown string
```

## Notes

- Built on `use-stick-to-bottom` for auto-scroll behavior
- Conversation has `flex-1 overflow-y-hidden` for scroll container
- Content has `flex flex-col gap-8 p-4` for message spacing
- Scroll button appears at `bottom-4 left-[50%] translate-x-[-50%]`
- Download button appears at `top-4 right-4`
- Both buttons are circular with outline variant
- Scroll button uses `ArrowDownIcon`, download uses `DownloadIcon`
- Empty state centers content with `size-full flex flex-col items-center justify-center`
- Default empty state shows title in medium font, description in muted foreground
- Download creates blob URL, triggers download, then cleans up
- Role attribute set to "log" for accessibility
- Messages must have unique keys for React rendering
