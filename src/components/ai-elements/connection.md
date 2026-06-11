# Connection

Connection line component for React Flow canvas with animated endpoint.

## Import

```tsx
import { Connection } from '@allsetlabs/forge/components/ai-elements/connection';
```

## Features

- **Bezier Curve**: Smooth curved connection line
- **Animated Endpoint**: Circle marker at connection end
- **Theme Integration**: Uses ring color from theme
- **React Flow Compatible**: Works as ConnectionLineComponent

## Basic Usage

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Connection } from '@allsetlabs/forge/components/ai-elements/connection';

<Canvas connectionLineComponent={Connection} nodes={nodes} edges={edges}>
  {/* Canvas content */}
</Canvas>;
```

**Visual:**

> Curved connection line from source to target with white circle at endpoint. Uses theme ring color.

## Props

This component is a `ConnectionLineComponent` from React Flow and receives props automatically:

| Prop  | Type     | Description                  |
| ----- | -------- | ---------------------------- |
| fromX | `number` | X coordinate of source point |
| fromY | `number` | Y coordinate of source point |
| toX   | `number` | X coordinate of target point |
| toY   | `number` | Y coordinate of target point |

## Examples

### Example 1: Basic Canvas with Connection Line

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Connection } from '@allsetlabs/forge/components/ai-elements/connection';
import { Background } from '@xyflow/react';

<Canvas
  connectionLineComponent={Connection}
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
>
  <Background />
</Canvas>;
```

**Visual:**

> Interactive canvas showing custom connection line when dragging to connect nodes.

### Example 2: Agent Workflow Canvas

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Connection } from '@allsetlabs/forge/components/ai-elements/connection';
import { Controls, MiniMap } from '@xyflow/react';

<div style={{ height: 600 }}>
  <Canvas
    connectionLineComponent={Connection}
    nodes={agentNodes}
    edges={agentEdges}
    onConnect={handleConnect}
  >
    <Controls />
    <MiniMap />
  </Canvas>
</div>;
```

**Visual:**

> Agent workflow canvas with custom connection lines and controls.

## Styling

The connection line uses:

- **Stroke**: `var(--color-ring)` (theme ring color)
- **Stroke Width**: 1px
- **Fill**: None (transparent)
- **Endpoint**: White circle (3px radius) with ring color stroke

## Path Calculation

The component calculates a Bezier curve path:

```typescript
const path = `M${fromX},${fromY} C ${fromX + (toX - fromX) * 0.5},${fromY} ${fromX + (toX - fromX) * 0.5},${toY} ${toX},${toY}`;
```

This creates a smooth curve with control points at the midpoint between source and target.

## Notes

- Only visible when actively connecting nodes (drag from handle)
- Uses SVG `<g>` group element for path and circle
- Animated class can be styled via CSS for additional effects
- Circle endpoint has white fill with ring color stroke
- Integrates with React Flow's connection system
- Half constant (0.5) used for Bezier curve control points
- Works with both standard and custom node types
