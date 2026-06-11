# Reasoning

Display AI reasoning process with collapsible content, auto-open during streaming, and duration tracking.

## Import

```tsx
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from '@allsetlabs/forge/components/ai-elements/reasoning';
```

## Features

- **Auto-Open/Close**: Opens during streaming, auto-closes 1s after completion
- **Duration Tracking**: Automatically calculates and displays thinking time
- **Markdown Support**: Full markdown rendering with code, math, mermaid
- **Shimmer Effect**: Animated "Thinking..." text during streaming
- **Controlled/Uncontrolled**: Support for both state management modes

## Basic Usage

```tsx
const [isStreaming, setIsStreaming] = useState(true);

<Reasoning isStreaming={isStreaming}>
  <ReasoningTrigger />
  <ReasoningContent>The reasoning process explanation...</ReasoningContent>
</Reasoning>;
```

**Visual:**

> Collapsed trigger showing "Thinking..." with brain icon. Expands to show reasoning markdown when clicked.

## Props

### Reasoning

| Prop         | Type                      | Default | Description                           |
| ------------ | ------------------------- | ------- | ------------------------------------- |
| isStreaming  | `boolean`                 | `false` | Show streaming UI and auto-open       |
| open         | `boolean`                 | -       | Controlled open state                 |
| defaultOpen  | `boolean`                 | -       | Default open state (or `isStreaming`) |
| onOpenChange | `(open: boolean) => void` | -       | Open state change callback            |
| duration     | `number`                  | -       | Thinking duration in seconds          |

### ReasoningTrigger

| Prop               | Type                                                     | Default | Description             |
| ------------------ | -------------------------------------------------------- | ------- | ----------------------- |
| getThinkingMessage | `(isStreaming: boolean, duration?: number) => ReactNode` | -       | Custom message renderer |

### ReasoningContent

| Prop     | Type     | Default | Description                |
| -------- | -------- | ------- | -------------------------- |
| children | `string` | -       | Markdown content to render |

## Examples

### Example 1: Streaming with Auto-Close

```tsx
const [isStreaming, setIsStreaming] = useState(true);
const [reasoning, setReasoning] = useState('Analyzing the problem...');

useEffect(() => {
  // Simulate streaming
  setTimeout(() => {
    setReasoning('Based on the analysis, I determined that...');
    setIsStreaming(false);
  }, 3000);
}, []);

<Reasoning isStreaming={isStreaming}>
  <ReasoningTrigger />
  <ReasoningContent>{reasoning}</ReasoningContent>
</Reasoning>;
```

**Visual:**

> Opens automatically during streaming with "Thinking..." shimmer. Closes 1 second after streaming stops.

### Example 2: With Duration Display

```tsx
<Reasoning duration={5}>
  <ReasoningTrigger />
  <ReasoningContent>After analyzing the code structure and dependencies...</ReasoningContent>
</Reasoning>
```

**Visual:**

> Trigger shows "Thought for 5 seconds" with brain icon and chevron.

### Example 3: Custom Thinking Message

```tsx
const customMessage = (isStreaming, duration) => {
  if (isStreaming) {
    return <Shimmer>Processing your request...</Shimmer>;
  }
  return duration ? <p>Analysis completed in {duration}s</p> : <p>Analysis complete</p>;
};

<Reasoning isStreaming={false} duration={3}>
  <ReasoningTrigger getThinkingMessage={customMessage} />
  <ReasoningContent>The analysis revealed...</ReasoningContent>
</Reasoning>;
```

**Visual:**

> Trigger shows "Analysis completed in 3s" instead of default message.

### Example 4: Controlled State

```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(!open)}>Toggle Reasoning</Button>
  <Reasoning open={open} onOpenChange={setOpen}>
    <ReasoningTrigger />
    <ReasoningContent>Detailed reasoning explanation...</ReasoningContent>
  </Reasoning>
</>;
```

**Visual:**

> External button controls the expand/collapse state.

### Example 5: Code in Reasoning

```tsx
<Reasoning duration={8}>
  <ReasoningTrigger />
  <ReasoningContent>
    {`I analyzed the code and found an issue:

\`\`\`typescript
// Before (incorrect)
const result = data.map(x => x.value);

// After (correct)
const result = data.filter(x => x.active).map(x => x.value);
\`\`\`

The filter step was missing.`}
  </ReasoningContent>
</Reasoning>
```

**Visual:**

> Reasoning with syntax-highlighted code blocks showing before/after comparison.

### Example 6: Prevent Auto-Open

```tsx
<Reasoning defaultOpen={false} isStreaming={true}>
  <ReasoningTrigger />
  <ReasoningContent>Reasoning content...</ReasoningContent>
</Reasoning>
```

**Visual:**

> Stays closed even during streaming because `defaultOpen={false}` explicitly set.

## Notes

- **Auto Behavior**:
  - Opens automatically when streaming starts (unless `defaultOpen={false}`)
  - Closes automatically 1 second after streaming stops
  - Auto-close only happens once per reasoning instance
- **Duration Calculation**:
  - Automatically tracks time from streaming start to end
  - Rounds up to nearest second
  - Can be controlled via `duration` prop
- **Default Messages**:
  - Streaming: "Thinking..." with shimmer effect
  - With duration: "Thought for X seconds"
  - No duration: "Thought for a few seconds"
- **Markdown Features** (via Streamdown):
  - Syntax highlighting (`@streamdown/code`)
  - Math equations (`@streamdown/math`)
  - Mermaid diagrams (`@streamdown/mermaid`)
  - CJK text support (`@streamdown/cjk`)
- Chevron icon rotates 180deg when open
- Trigger has muted foreground color with hover effect
- Content has slide-in/out animation
- Component is memoized for performance
- Uses `not-prose` class to prevent Tailwind Typography conflicts
