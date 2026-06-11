# Sandbox

Collapsible container for displaying sandbox execution environments with tabbed content.

## Import

```tsx
import {
  Sandbox,
  SandboxHeader,
  SandboxContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
  SandboxTabContent,
} from '@allsetlabs/forge/components/ai-elements/sandbox';
```

## Features

- **Collapsible**: Built on Radix UI Collapsible with smooth animations
- **Tabbed Interface**: Integrated tabs for organizing sandbox content
- **Status Indicators**: Shows execution state with status badges
- **Composable**: Flexible sub-components for custom layouts

## Basic Usage

```tsx
<Sandbox defaultOpen>
  <SandboxHeader title="Python Sandbox" state="output-available" />
  <SandboxContent>
    <SandboxTabs defaultValue="output">
      <SandboxTabsBar>
        <SandboxTabsList>
          <SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
          <SandboxTabsTrigger value="logs">Logs</SandboxTabsTrigger>
        </SandboxTabsList>
      </SandboxTabsBar>
      <SandboxTabContent value="output">
        <pre>Hello, World!</pre>
      </SandboxTabContent>
      <SandboxTabContent value="logs">
        <pre>Execution completed in 234ms</pre>
      </SandboxTabContent>
    </SandboxTabs>
  </SandboxContent>
</Sandbox>
```

**Visual:**

> A bordered collapsible card with a header showing "Python Sandbox" with a status badge. When expanded, shows tabs for "Output" and "Logs" with content area below.

## Props

### Sandbox

| Prop         | Type                    | Default | Description                       |
| ------------ | ----------------------- | ------- | --------------------------------- |
| className    | string                  | -       | Additional CSS classes            |
| defaultOpen  | boolean                 | true    | Whether sandbox is initially open |
| open         | boolean                 | -       | Controlled open state             |
| onOpenChange | (open: boolean) => void | -       | Callback when open state changes  |

### SandboxHeader

| Prop      | Type                | Default | Description                |
| --------- | ------------------- | ------- | -------------------------- |
| title     | string              | -       | Sandbox title text         |
| state     | ToolUIPart['state'] | -       | Execution state (required) |
| className | string              | -       | Additional CSS classes     |

### SandboxContent

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### SandboxTabs

| Prop          | Type                    | Default | Description               |
| ------------- | ----------------------- | ------- | ------------------------- |
| defaultValue  | string                  | -       | Initially active tab      |
| value         | string                  | -       | Controlled active tab     |
| onValueChange | (value: string) => void | -       | Callback when tab changes |
| className     | string                  | -       | Additional CSS classes    |

### SandboxTabsTrigger

| Prop      | Type   | Default | Description               |
| --------- | ------ | ------- | ------------------------- |
| value     | string | -       | Tab identifier (required) |
| className | string | -       | Additional CSS classes    |

### SandboxTabContent

| Prop      | Type   | Default | Description               |
| --------- | ------ | ------- | ------------------------- |
| value     | string | -       | Tab identifier (required) |
| className | string | -       | Additional CSS classes    |

## Examples

### Example 1: Code Execution Sandbox

```tsx
<Sandbox>
  <SandboxHeader title="JavaScript Sandbox" state="input-streaming" />
  <SandboxContent>
    <SandboxTabs defaultValue="code">
      <SandboxTabsBar>
        <SandboxTabsList>
          <SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
          <SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
          <SandboxTabsTrigger value="console">Console</SandboxTabsTrigger>
        </SandboxTabsList>
      </SandboxTabsBar>
      <SandboxTabContent value="code">
        <CodeBlock code="console.log('Hello');" language="javascript" />
      </SandboxTabContent>
      <SandboxTabContent value="output">
        <Terminal output="Hello\n" />
      </SandboxTabContent>
      <SandboxTabContent value="console">
        <div className="text-muted-foreground p-4 text-sm">No errors</div>
      </SandboxTabContent>
    </SandboxTabs>
  </SandboxContent>
</Sandbox>
```

**Visual:**

> Multi-tab sandbox showing code editor, execution output, and console logs with smooth tab transitions.

### Example 2: Controlled State

```tsx
const [isOpen, setIsOpen] = useState(false);

<Sandbox open={isOpen} onOpenChange={setIsOpen}>
  <SandboxHeader title="Database Query" state="output-available" />
  <SandboxContent>
    <div className="p-4">
      <p>Query returned 42 results</p>
    </div>
  </SandboxContent>
</Sandbox>;
```

**Visual:**

> Externally controlled sandbox that opens/closes based on parent state.

## Notes

- The component uses Radix UI Collapsible for accessibility
- Status badges are imported from the `tool` component
- Default state is open (`defaultOpen={true}`)
- Smooth expand/collapse animations included
- Dark mode fully supported
