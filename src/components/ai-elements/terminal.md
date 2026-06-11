# Terminal

Terminal-style output display with ANSI color support, auto-scroll, and copy functionality.

## Import

```tsx
import {
  Terminal,
  TerminalHeader,
  TerminalTitle,
  TerminalStatus,
  TerminalActions,
  TerminalCopyButton,
  TerminalClearButton,
  TerminalContent,
} from '@allsetlabs/forge/components/ai-elements/terminal';
```

## Features

- **ANSI Colors**: Renders ANSI escape codes as colored text
- **Auto-scroll**: Automatically scrolls to bottom as output arrives
- **Streaming Support**: Shows cursor animation during streaming
- **Copy Output**: Copy full terminal output to clipboard
- **Clear Function**: Optional clear button to reset output
- **Dark Theme**: Terminal-style dark background with zinc colors

## Basic Usage

```tsx
<Terminal output="$ npm install\nInstalling packages...\n✓ Done in 2.3s" isStreaming={false} />
```

**Visual:**

> Dark terminal-style container with white text on dark zinc background, showing npm install output with green checkmark.

## Props

### Terminal

| Prop        | Type       | Default | Description                                     |
| ----------- | ---------- | ------- | ----------------------------------------------- |
| output      | string     | -       | Terminal output text (required)                 |
| isStreaming | boolean    | false   | Whether output is currently streaming           |
| autoScroll  | boolean    | true    | Auto-scroll to bottom on new output             |
| onClear     | () => void | -       | Callback to clear terminal (shows clear button) |
| className   | string     | -       | Additional CSS classes                          |

### TerminalCopyButton

| Prop    | Type                   | Default | Description                         |
| ------- | ---------------------- | ------- | ----------------------------------- |
| onCopy  | () => void             | -       | Callback when copy succeeds         |
| onError | (error: Error) => void | -       | Callback when copy fails            |
| timeout | number                 | 2000    | Duration to show success state (ms) |

### TerminalContent

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

## Examples

### Example 1: Command Output

```tsx
<Terminal
  output={`$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`}
/>
```

**Visual:**

> Terminal showing git status output with proper formatting.

### Example 2: Streaming Output

```tsx
const [output, setOutput] = useState('');
const [streaming, setStreaming] = useState(true);

<Terminal output={output} isStreaming={streaming} autoScroll={true} />;
```

**Visual:**

> Terminal with streaming output, showing cursor animation and shimmer effect in header.

### Example 3: With Clear Button

```tsx
const [output, setOutput] = useState('Initial output\n');

<Terminal output={output} onClear={() => setOutput('')} />;
```

**Visual:**

> Terminal with trash icon button in header that clears the output when clicked.

### Example 4: ANSI Color Output

```tsx
<Terminal
  output={`\x1b[32m✓\x1b[0m Success
\x1b[33m⚠\x1b[0m Warning
\x1b[31m✗\x1b[0m Error`}
/>
```

**Visual:**

> Terminal showing colored output: green checkmark, yellow warning triangle, red X.

### Example 5: Custom Layout

```tsx
<Terminal output={output} isStreaming={streaming}>
  <TerminalHeader>
    <TerminalTitle>
      <CodeIcon className="size-4" />
      Build Output
    </TerminalTitle>
    <div className="flex items-center gap-1">
      <TerminalStatus />
      <TerminalActions>
        <Button size="icon-sm" variant="ghost">
          <DownloadIcon className="size-3.5" />
        </Button>
        <TerminalCopyButton />
      </TerminalActions>
    </div>
  </TerminalHeader>
  <TerminalContent />
</Terminal>
```

**Visual:**

> Custom terminal with code icon, custom title, download button, and standard copy button.

## Notes

- Uses `ansi-to-react` for ANSI color rendering
- Background is `bg-zinc-950` for authentic terminal look
- Text is `text-zinc-100` for high contrast
- Streaming shows animated cursor (pulsing white bar)
- Auto-scroll uses `useEffect` to scroll on output changes
- Max height is `max-h-96` (384px) with overflow scroll
- Clear button only shows when `onClear` is provided
- Copy button shows checkmark for 2 seconds after copy
- Shimmer effect in status while streaming
- Monospace font for authentic terminal appearance
