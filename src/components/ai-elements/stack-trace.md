# StackTrace

Interactive stack trace viewer with collapsible header, copy functionality, and clickable file paths.

## Import

```tsx
import {
  StackTrace,
  StackTraceHeader,
  StackTraceError,
  StackTraceErrorType,
  StackTraceErrorMessage,
  StackTraceActions,
  StackTraceCopyButton,
  StackTraceExpandButton,
  StackTraceContent,
  StackTraceFrames,
} from '@allsetlabs/forge/components/ai-elements/stack-trace';
```

## Features

- **Automatic Parsing**: Parses standard JavaScript/Node.js stack traces
- **Clickable Paths**: Navigate to source files with line/column numbers
- **Internal Frame Filtering**: Option to hide node_modules and internal frames
- **Copy Trace**: Copy full stack trace to clipboard
- **Collapsible**: Show/hide stack frames with smooth animation
- **Error Detection**: Extracts error type and message

## Basic Usage

```tsx
<StackTrace
  trace="TypeError: Cannot read property 'foo' of undefined
    at Object.<anonymous> (/app/index.js:10:5)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)"
>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType />
      <StackTraceErrorMessage />
    </StackTraceError>
    <StackTraceActions>
      <StackTraceCopyButton />
      <StackTraceExpandButton />
    </StackTraceActions>
  </StackTraceHeader>
  <StackTraceContent>
    <StackTraceFrames />
  </StackTraceContent>
</StackTrace>
```

**Visual:**

> Bordered card with header showing error icon, "TypeError" in red, truncated message, copy and expand buttons. When expanded, shows clickable stack frames with file paths.

## Props

### StackTrace

| Prop            | Type                                                       | Default | Description                       |
| --------------- | ---------------------------------------------------------- | ------- | --------------------------------- |
| trace           | string                                                     | -       | Raw stack trace string (required) |
| open            | boolean                                                    | -       | Controlled open state             |
| defaultOpen     | boolean                                                    | false   | Initial open state                |
| onOpenChange    | (open: boolean) => void                                    | -       | Callback when open changes        |
| onFilePathClick | (filePath: string, line?: number, column?: number) => void | -       | Handle file path clicks           |
| className       | string                                                     | -       | Additional CSS classes            |

### StackTraceContent

| Prop      | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| maxHeight | number | 400     | Maximum height in pixels |
| className | string | -       | Additional CSS classes   |

### StackTraceFrames

| Prop               | Type    | Default | Description                       |
| ------------------ | ------- | ------- | --------------------------------- |
| showInternalFrames | boolean | true    | Show node_modules/internal frames |
| className          | string  | -       | Additional CSS classes            |

### StackTraceCopyButton

| Prop    | Type                   | Default | Description                         |
| ------- | ---------------------- | ------- | ----------------------------------- |
| onCopy  | () => void             | -       | Callback when copy succeeds         |
| onError | (error: Error) => void | -       | Callback when copy fails            |
| timeout | number                 | 2000    | Duration to show success state (ms) |

## Examples

### Example 1: With File Navigation

```tsx
<StackTrace
  trace={errorTrace}
  defaultOpen={false}
  onFilePathClick={(filePath, line, column) => {
    // Open in editor
    vscode.open(`${filePath}:${line}:${column}`);
  }}
>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType />
      <StackTraceErrorMessage />
    </StackTraceError>
    <StackTraceActions>
      <StackTraceCopyButton />
      <StackTraceExpandButton />
    </StackTraceActions>
  </StackTraceHeader>
  <StackTraceContent>
    <StackTraceFrames />
  </StackTraceContent>
</StackTrace>
```

**Visual:**

> Stack trace with clickable file paths that open in VS Code when clicked.

### Example 2: Hide Internal Frames

```tsx
<StackTrace trace={errorTrace} defaultOpen>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType />
      <StackTraceErrorMessage />
    </StackTraceError>
    <StackTraceActions>
      <StackTraceCopyButton />
      <StackTraceExpandButton />
    </StackTraceActions>
  </StackTraceHeader>
  <StackTraceContent>
    <StackTraceFrames showInternalFrames={false} />
  </StackTraceContent>
</StackTrace>
```

**Visual:**

> Stack trace showing only user code, filtering out node_modules and internal Node.js frames.

### Example 3: Custom Max Height

```tsx
<StackTrace trace={veryLongTrace}>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType />
      <StackTraceErrorMessage />
    </StackTraceError>
    <StackTraceActions>
      <StackTraceCopyButton />
      <StackTraceExpandButton />
    </StackTraceActions>
  </StackTraceHeader>
  <StackTraceContent maxHeight={600}>
    <StackTraceFrames />
  </StackTraceContent>
</StackTrace>
```

**Visual:**

> Taller scrollable stack trace container (600px max height).

### Example 4: Controlled State

```tsx
const [isOpen, setIsOpen] = useState(true);

<StackTrace trace={errorTrace} open={isOpen} onOpenChange={setIsOpen}>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType />
      <StackTraceErrorMessage />
    </StackTraceError>
    <StackTraceActions>
      <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'} Details</Button>
      <StackTraceCopyButton />
    </StackTraceActions>
  </StackTraceHeader>
  <StackTraceContent>
    <StackTraceFrames />
  </StackTraceContent>
</StackTrace>;
```

**Visual:**

> Externally controlled expand/collapse with custom toggle button.

## Notes

- Parses standard JavaScript/Node.js stack trace format
- Detects error type (e.g., TypeError, ReferenceError)
- Extracts file path, line number, and column number from each frame
- Internal frames (node_modules, node:, internal/) are dimmed
- File paths are clickable when `onFilePathClick` is provided
- Copy button shows checkmark for 2 seconds after successful copy
- Uses Radix UI Collapsible for accessibility
- Monospace font for stack frames
- Dark mode fully supported
