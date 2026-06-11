# Message

Display chat messages with support for branching conversations, actions, and markdown rendering.

## Import

```tsx
import {
  Message,
  MessageContent,
  MessageActions,
  MessageAction,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
  MessageResponse,
  MessageToolbar,
} from '@allsetlabs/forge/components/ai-elements/message';
```

## Features

- **User/Assistant Roles**: Automatic styling based on message sender
- **Message Branching**: Support for multiple response branches with navigation
- **Markdown Rendering**: Full markdown support with code, math, and mermaid diagrams
- **Action Buttons**: Tooltips and icon buttons for message actions
- **CJK Support**: Proper rendering of Chinese, Japanese, and Korean text

## Basic Usage

```tsx
<Message from="user">
  <MessageContent>What is React?</MessageContent>
</Message>

<Message from="assistant">
  <MessageContent>
    <MessageResponse>
      React is a JavaScript library for building user interfaces.
    </MessageResponse>
  </MessageContent>
</Message>
```

**Visual:**

> User message appears on the right with secondary background. Assistant message on the left with rendered markdown.

## Props

### Message

| Prop | Type                    | Default | Description         |
| ---- | ----------------------- | ------- | ------------------- |
| from | `'user' \| 'assistant'` | -       | Message sender role |

### MessageAction

| Prop    | Type     | Default     | Description         |
| ------- | -------- | ----------- | ------------------- |
| tooltip | `string` | -           | Tooltip text        |
| label   | `string` | -           | Screen reader label |
| variant | `string` | `'ghost'`   | Button variant      |
| size    | `string` | `'icon-sm'` | Button size         |

### MessageBranch

| Prop           | Type                      | Default | Description            |
| -------------- | ------------------------- | ------- | ---------------------- |
| defaultBranch  | `number`                  | `0`     | Initial branch index   |
| onBranchChange | `(index: number) => void` | -       | Branch change callback |

## Examples

### Example 1: With Actions

```tsx
<Message from="assistant">
  <MessageContent>
    <MessageResponse>Here's the answer...</MessageResponse>
  </MessageContent>
  <MessageActions>
    <MessageAction tooltip="Copy" onClick={handleCopy}>
      <CopyIcon className="size-4" />
    </MessageAction>
    <MessageAction tooltip="Regenerate" onClick={handleRegenerate}>
      <RefreshIcon className="size-4" />
    </MessageAction>
  </MessageActions>
</Message>
```

**Visual:**

> Message with copy and regenerate icon buttons below the content.

### Example 2: Message Branches

```tsx
<Message from="assistant">
  <MessageBranch defaultBranch={0}>
    <MessageBranchSelector>
      <MessageBranchPrevious />
      <MessageBranchPage />
      <MessageBranchNext />
    </MessageBranchSelector>
    <MessageBranchContent>
      <MessageContent>
        <MessageResponse>First response variant</MessageResponse>
      </MessageContent>
      <MessageContent>
        <MessageResponse>Second response variant</MessageResponse>
      </MessageContent>
      <MessageContent>
        <MessageResponse>Third response variant</MessageResponse>
      </MessageContent>
    </MessageBranchContent>
  </MessageBranch>
</Message>
```

**Visual:**

> Message with navigation controls showing "1 of 3" and prev/next arrows to switch between responses.

### Example 3: With Toolbar

```tsx
<Message from="assistant">
  <MessageContent>
    <MessageResponse>Response text...</MessageResponse>
  </MessageContent>
  <MessageToolbar>
    <MessageActions>
      <MessageAction tooltip="Copy">
        <CopyIcon className="size-4" />
      </MessageAction>
    </MessageActions>
    <div className="text-muted-foreground text-xs">2 minutes ago</div>
  </MessageToolbar>
</Message>
```

**Visual:**

> Message with action buttons on the left and timestamp on the right of the toolbar.

### Example 4: Code Block with Syntax Highlighting

```tsx
<Message from="assistant">
  <MessageContent>
    <MessageResponse>
      {`Here's an example:

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\``}
    </MessageResponse>
  </MessageContent>
</Message>
```

**Visual:**

> Message containing a syntax-highlighted TypeScript code block.

### Example 5: Math Equations

```tsx
<Message from="assistant">
  <MessageContent>
    <MessageResponse>
      The quadratic formula is: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$
    </MessageResponse>
  </MessageContent>
</Message>
```

**Visual:**

> Message with beautifully rendered mathematical equation.

## Notes

- User messages are right-aligned with secondary background
- Assistant messages are left-aligned with plain text
- MessageResponse uses Streamdown for markdown rendering with plugins:
  - `@streamdown/code` - Syntax highlighting
  - `@streamdown/math` - LaTeX math rendering
  - `@streamdown/mermaid` - Mermaid diagram rendering
  - `@streamdown/cjk` - CJK text support
- MessageBranch automatically hides selector when only 1 branch exists
- MessageBranchPage shows "X of Y" format
- MessageAction buttons have icon-sm size by default
- Tooltip provider wraps action buttons when tooltip is provided
- Components use CSS group selectors (`.is-user`, `.is-assistant`) for conditional styling
