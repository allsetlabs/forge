# Controls

Styled controls for React Flow canvas (zoom, fit view, etc.).

## Import

```tsx
import { Controls } from '@allsetlabs/forge/components/ai-elements/controls';
```

## Features

- **Zoom Controls**: Zoom in/out buttons
- **Fit View**: Button to fit all nodes in view
- **Interactive Mode**: Toggle between selection and panning
- **Custom Styling**: Themed to match design system
- **React Flow Integration**: Drop-in replacement for default Controls

## Basic Usage

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Controls } from '@allsetlabs/forge/components/ai-elements/controls';
import { Background } from '@xyflow/react';

<Canvas nodes={nodes} edges={edges}>
  <Background />
  <Controls />
</Canvas>;
```

**Visual:**

> Floating control panel in bottom-left corner with zoom in, zoom out, fit view, and lock buttons in vertical layout.

## Props

| Prop            | Type                                                                 | Default         | Description                  |
| --------------- | -------------------------------------------------------------------- | --------------- | ---------------------------- |
| showZoom        | `boolean`                                                            | `true`          | Show zoom in/out buttons     |
| showFitView     | `boolean`                                                            | `true`          | Show fit view button         |
| showInteractive | `boolean`                                                            | `true`          | Show interactive mode toggle |
| position        | `'top-left'` \| `'top-right'` \| `'bottom-left'` \| `'bottom-right'` | `'bottom-left'` | Controls position            |
| className       | `string`                                                             | -               | Additional CSS classes       |
| ...props        | `ComponentProps<typeof ControlsPrimitive>`                           | -               | All Controls props           |

## Examples

### Example 1: Full Controls

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Controls } from '@allsetlabs/forge/components/ai-elements/controls';
import { Background } from '@xyflow/react';

<Canvas nodes={nodes} edges={edges} onNodesChange={onNodesChange}>
  <Background />
  <Controls />
</Canvas>;
```

**Visual:**

> All control buttons visible: zoom in (+), zoom out (-), fit view, and interactive toggle (lock icon).

### Example 2: Zoom Only

```tsx
<Canvas nodes={nodes} edges={edges}>
  <Background />
  <Controls showFitView={false} showInteractive={false} />
</Canvas>
```

**Visual:**

> Controls panel showing only zoom in and zoom out buttons.

### Example 3: Different Position

```tsx
<Canvas nodes={nodes} edges={edges}>
  <Background />
  <Controls position="top-right" />
</Canvas>
```

**Visual:**

> Controls panel positioned in top-right corner instead of default bottom-left.

### Example 4: Minimal Controls

```tsx
<Canvas nodes={nodes} edges={edges}>
  <Background />
  <Controls showZoom={false} showInteractive={false} />
</Canvas>
```

**Visual:**

> Only fit view button visible.

## Styling

The Controls component applies custom styling:

```tsx
<Controls className="bg-card [&>button]:hover:bg-secondary! [&>button]:border-none! [&>button]:bg-transparent! gap-px overflow-hidden rounded-md border p-1 [&>button]:rounded-md" />
```

This creates:

- Rounded border container with card background
- No shadows (shadow-none!)
- Gap between buttons (gap-px)
- Transparent button backgrounds
- Secondary background on hover
- No button borders
- Rounded button corners

## Control Buttons

Default controls include:

1. **Zoom In (+)**: Increase zoom level
2. **Zoom Out (-)**: Decrease zoom level
3. **Fit View**: Auto-fit all nodes in viewport
4. **Interactive Toggle**: Switch between selection and pan modes

## Notes

- Wraps React Flow's `Controls` component with custom styling
- All buttons styled to match design system theme
- Uses card background for container
- Secondary background on hover for better visibility
- No border or shadow on container or buttons
- Integrates with Canvas zoom and pan functionality
- Position defaults to bottom-left corner
- Can be customized with all React Flow Controls props
- Requires @xyflow/react package
