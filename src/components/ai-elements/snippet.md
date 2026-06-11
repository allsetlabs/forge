# Snippet

Display code snippets with copy-to-clipboard functionality in an input-like format.

## Import

```tsx
import {
  Snippet,
  SnippetAddon,
  SnippetText,
  SnippetInput,
  SnippetCopyButton,
} from '@allsetlabs/forge/components/ai-elements/snippet';
```

## Features

- **Copy Functionality**: Built-in copy-to-clipboard with success feedback
- **Read-only Input**: Uses InputGroup for familiar input appearance
- **Monospace Font**: Optimized for code display
- **Context API**: Shared code state across sub-components

## Basic Usage

```tsx
<Snippet code="npm install @allsetlabs/forge">
  <SnippetInput />
  <SnippetCopyButton />
</Snippet>
```

**Visual:**

> An input-style box with monospace text showing the npm install command and a copy icon button on the right.

## Props

### Snippet

| Prop      | Type   | Default | Description                       |
| --------- | ------ | ------- | --------------------------------- |
| code      | string | -       | Code string to display (required) |
| className | string | -       | Additional CSS classes            |

### SnippetText

| Prop      | Type      | Default | Description                |
| --------- | --------- | ------- | -------------------------- |
| className | string    | -       | Additional CSS classes     |
| children  | ReactNode | -       | Text content (e.g., label) |

### SnippetCopyButton

| Prop      | Type                   | Default | Description                         |
| --------- | ---------------------- | ------- | ----------------------------------- |
| onCopy    | () => void             | -       | Callback when copy succeeds         |
| onError   | (error: Error) => void | -       | Callback when copy fails            |
| timeout   | number                 | 2000    | Duration to show success state (ms) |
| className | string                 | -       | Additional CSS classes              |

## Examples

### Example 1: With Label

```tsx
<Snippet code="git clone https://github.com/user/repo.git">
  <SnippetText>Clone:</SnippetText>
  <SnippetInput />
  <SnippetCopyButton />
</Snippet>
```

**Visual:**

> Input group with "Clone:" label on left, git command in center, and copy button on right.

### Example 2: API Key Display

```tsx
<Snippet code="sk_live_51H8T2eF3xT2eF3xT2eF3xT2eF3x">
  <SnippetAddon>
    <KeyIcon className="size-4" />
  </SnippetAddon>
  <SnippetInput />
  <SnippetCopyButton />
</Snippet>
```

**Visual:**

> Input with key icon addon, masked API key, and copy button.

### Example 3: With Callbacks

```tsx
<Snippet code="docker run -p 3000:3000 myapp">
  <SnippetInput />
  <SnippetCopyButton
    onCopy={() => console.log('Copied!')}
    onError={(error) => console.error('Failed:', error)}
    timeout={3000}
  />
</Snippet>
```

**Visual:**

> Docker command with custom copy behavior and 3-second success state.

### Example 4: Custom Styling

```tsx
<Snippet code="curl -X GET https://api.example.com/data" className="max-w-2xl">
  <SnippetInput className="text-xs" />
  <SnippetCopyButton className="text-primary" />
</Snippet>
```

**Visual:**

> Compact snippet with smaller text and custom button color.

## Notes

- Built on top of InputGroup component
- Copy button shows checkmark icon for 2 seconds after successful copy
- Input is always read-only
- Uses Clipboard API (requires HTTPS in production)
- Handles clipboard errors gracefully via `onError` callback
- Timeout is cleared on component unmount
- Context ensures code state is shared across all sub-components
