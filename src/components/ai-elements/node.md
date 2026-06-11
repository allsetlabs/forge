# Node

Flow diagram node component with connection handles for React Flow / XYFlow.

## Import

```tsx
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeDescription,
  NodeAction,
  NodeContent,
  NodeFooter,
} from '@allsetlabs/forge/components/ai-elements/node';
```

## Features

- **Connection Handles**: Target (left) and source (right) connection points
- **Card-Based Layout**: Built on Card component with header, content, and footer
- **Action Support**: Action buttons in the header
- **Flexible Structure**: Compose your own node layout using subcomponents

## Basic Usage

```tsx
<Node handles={{ target: true, source: true }}>
  <NodeHeader>
    <NodeTitle>Process Data</NodeTitle>
    <NodeDescription>Transform input to output</NodeDescription>
  </NodeHeader>
  <NodeContent>
    <p>Node content goes here</p>
  </NodeContent>
</Node>
```

**Visual:**

> A card-style node with a grey header, white content area, and connection handles on left and right edges.

## Props

### Node

| Prop      | Type                                   | Default | Description             |
| --------- | -------------------------------------- | ------- | ----------------------- |
| handles   | `{ target: boolean; source: boolean }` | -       | Show connection handles |
| className | `string`                               | -       | Additional CSS classes  |

## Examples

### Example 1: Input Node (Source Only)

```tsx
<Node handles={{ target: false, source: true }}>
  <NodeHeader>
    <NodeTitle>Data Source</NodeTitle>
  </NodeHeader>
  <NodeContent>
    <p>Provides input data</p>
  </NodeContent>
</Node>
```

**Visual:**

> Node with only a right-side (source) handle for output connections.

### Example 2: Output Node (Target Only)

```tsx
<Node handles={{ target: true, source: false }}>
  <NodeHeader>
    <NodeTitle>Final Output</NodeTitle>
  </NodeHeader>
  <NodeContent>
    <p>Receives processed data</p>
  </NodeContent>
</Node>
```

**Visual:**

> Node with only a left-side (target) handle for input connections.

### Example 3: With Action Button

```tsx
<Node handles={{ target: true, source: true }}>
  <NodeHeader>
    <NodeTitle>API Call</NodeTitle>
    <NodeDescription>Fetch external data</NodeDescription>
    <NodeAction>
      <Button size="icon-sm" variant="ghost">
        <SettingsIcon className="size-4" />
      </Button>
    </NodeAction>
  </NodeHeader>
  <NodeContent>
    <p>Configure API endpoint</p>
  </NodeContent>
</Node>
```

**Visual:**

> Node with a settings icon button in the top-right corner of the header.

### Example 4: With Footer

```tsx
<Node handles={{ target: true, source: true }}>
  <NodeHeader>
    <NodeTitle>Calculation</NodeTitle>
  </NodeHeader>
  <NodeContent>
    <p>x + y = z</p>
  </NodeContent>
  <NodeFooter>
    <span className="text-muted-foreground text-xs">Last run: 2 minutes ago</span>
  </NodeFooter>
</Node>
```

**Visual:**

> Node with grey footer section showing metadata.

### Example 5: Custom Styled Node

```tsx
<Node handles={{ target: true, source: true }} className="border-primary-500">
  <NodeHeader className="bg-primary-500 text-white">
    <NodeTitle>Important Step</NodeTitle>
  </NodeHeader>
  <NodeContent>
    <p>Critical processing node</p>
  </NodeContent>
</Node>
```

**Visual:**

> Node with primary color border and header to highlight importance.

## Notes

- Built on top of React Flow / XYFlow's `Handle` component
- Target handle positioned on left (`Position.Left`)
- Source handle positioned on right (`Position.Right`)
- Header and footer use secondary background color
- Header and footer have border separators
- Content section has default padding of `p-3`
- Node is relatively positioned for handle placement
- All subcomponents forward their props to underlying Card components
- Node container has `w-sm` default width and auto height
