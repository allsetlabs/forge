# Panel

A positioned panel component for React Flow / XYFlow interfaces.

## Import

```tsx
import { Panel } from '@allsetlabs/forge/components/ai-elements/panel';
```

## Features

- **Positioned Overlay**: Overlay UI elements on flow diagrams
- **Card Styling**: Bordered, rounded panel with card background
- **Flexible Positioning**: Inherits React Flow Panel positioning props

## Basic Usage

```tsx
import { ReactFlow } from '@xyflow/react';

<ReactFlow>
  <Panel position="top-left">
    <Button>Zoom In</Button>
    <Button>Zoom Out</Button>
  </Panel>
</ReactFlow>;
```

**Visual:**

> Flow diagram with a panel containing zoom buttons in the top-left corner.

## Props

All props from `@xyflow/react`'s `Panel` component are supported, plus:

| Prop      | Type                                                                                              | Default | Description            |
| --------- | ------------------------------------------------------------------------------------------------- | ------- | ---------------------- |
| position  | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | -       | Panel position         |
| className | `string`                                                                                          | -       | Additional CSS classes |

## Examples

### Example 1: Top-Right Controls

```tsx
<ReactFlow>
  <Panel position="top-right">
    <div className="flex gap-2">
      <Button size="icon-sm">
        <ZoomInIcon className="size-4" />
      </Button>
      <Button size="icon-sm">
        <ZoomOutIcon className="size-4" />
      </Button>
      <Button size="icon-sm">
        <FitViewIcon className="size-4" />
      </Button>
    </div>
  </Panel>
</ReactFlow>
```

**Visual:**

> Three icon buttons arranged horizontally in the top-right corner.

### Example 2: Bottom-Center Legend

```tsx
<ReactFlow>
  <Panel position="bottom-center">
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-blue-500" />
        <span>Input</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-green-500" />
        <span>Output</span>
      </div>
    </div>
  </Panel>
</ReactFlow>
```

**Visual:**

> Legend panel centered at the bottom showing color-coded node types.

### Example 3: Top-Left Info Panel

```tsx
<ReactFlow>
  <Panel position="top-left">
    <div className="space-y-1">
      <h3 className="font-semibold">Workflow Status</h3>
      <p className="text-muted-foreground text-sm">5 nodes, 3 connections</p>
    </div>
  </Panel>
</ReactFlow>
```

**Visual:**

> Information panel in top-left showing workflow statistics.

### Example 4: Custom Styled Panel

```tsx
<ReactFlow>
  <Panel position="top-right" className="bg-primary-500 text-white">
    <div className="px-4 py-2">
      <p className="text-sm font-medium">Live Mode Active</p>
    </div>
  </Panel>
</ReactFlow>
```

**Visual:**

> Custom styled panel with primary background color.

## Notes

- Built on React Flow's `Panel` component from `@xyflow/react`
- Default styling includes:
  - `m-4`: 1rem margin
  - `rounded-md`: Rounded corners
  - `border`: Border
  - `bg-card`: Card background color
  - `p-1`: 0.25rem padding
- Position values correspond to React Flow's panel positioning system
- Panel automatically positions itself within the flow viewport
- Use with React Flow's `ReactFlow` component
- Can contain any React children (buttons, text, forms, etc.)
- Overflow is hidden by default
- Panel inherits dark mode styling from card background
