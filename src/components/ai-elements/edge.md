# Edge

Custom edge components for React Flow canvas with animated and temporary variants.

## Import

```tsx
import { Edge } from '@allsetlabs/forge/components/ai-elements/edge';
```

## Features

- **Animated Edge**: Bezier curve with moving circle animation
- **Temporary Edge**: Dashed line for temporary connections
- **React Flow Integration**: Works as custom edge types
- **Smart Handles**: Automatically calculates handle positions
- **Theme Support**: Uses theme colors for styling

## Basic Usage

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Edge } from '@allsetlabs/forge/components/ai-elements/edge';

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

<Canvas nodes={nodes} edges={edges} edgeTypes={edgeTypes}>
  {/* Canvas content */}
</Canvas>;
```

**Visual:**

> Canvas with custom edges: solid animated edges with moving circles, and dashed temporary edges.

## Edge Types

### Edge.Animated

Solid bezier curve with animated circle traveling along path.

**Props:**

| Prop      | Type     | Description           |
| --------- | -------- | --------------------- |
| id        | `string` | Edge ID               |
| source    | `string` | Source node ID        |
| target    | `string` | Target node ID        |
| markerEnd | `string` | Marker end definition |
| style     | `object` | Custom edge styles    |

### Edge.Temporary

Dashed line for temporary connections (drag preview).

**Props:**

| Prop           | Type       | Description            |
| -------------- | ---------- | ---------------------- |
| id             | `string`   | Edge ID                |
| sourceX        | `number`   | Source X coordinate    |
| sourceY        | `number`   | Source Y coordinate    |
| targetX        | `number`   | Target X coordinate    |
| targetY        | `number`   | Target Y coordinate    |
| sourcePosition | `Position` | Source handle position |
| targetPosition | `Position` | Target handle position |

## Examples

### Example 1: Basic Animated Edges

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Edge } from '@allsetlabs/forge/components/ai-elements/edge';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
];

const edges = [{ id: 'e1-2', source: '1', target: '2', type: 'animated' }];

const edgeTypes = {
  animated: Edge.Animated,
};

<Canvas nodes={nodes} edges={edges} edgeTypes={edgeTypes}>
  <Background />
  <Controls />
</Canvas>;
```

**Visual:**

> Two nodes connected by animated edge with circle moving along the path every 2 seconds.

### Example 2: Mixed Edge Types

```tsx
const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'animated' },
  { id: 'e2-3', source: '2', target: '3', type: 'temporary' },
  { id: 'e1-3', source: '1', target: '3', type: 'animated' },
];

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

<Canvas nodes={nodes} edges={edges} edgeTypes={edgeTypes}>
  <Background />
</Canvas>;
```

**Visual:**

> Canvas with both animated (solid) and temporary (dashed) edges between nodes.

### Example 3: Custom Connection Line

```tsx
import { Connection } from '@allsetlabs/forge/components/ai-elements/connection';

<Canvas
  nodes={nodes}
  edges={edges}
  edgeTypes={{ animated: Edge.Animated }}
  connectionLineComponent={Connection}
>
  <Background />
</Canvas>;
```

**Visual:**

> Animated edges for connections, custom connection line when dragging.

### Example 4: Agent Workflow

```tsx
const workflowNodes = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: 'process', position: { x: 200, y: 0 }, data: { label: 'Process' } },
  { id: 'end', position: { x: 400, y: 0 }, data: { label: 'End' } },
];

const workflowEdges = [
  { id: 'e-start-process', source: 'start', target: 'process', type: 'animated' },
  { id: 'e-process-end', source: 'process', target: 'end', type: 'animated' },
];

<Canvas nodes={workflowNodes} edges={workflowEdges} edgeTypes={{ animated: Edge.Animated }}>
  <Background />
  <Controls />
</Canvas>;
```

**Visual:**

> Linear workflow with animated data flow visualization.

## Animation Details

### Animated Edge

```tsx
<circle fill="var(--primary)" r="4">
  <animateMotion dur="2s" path={edgePath} repeatCount="indefinite" />
</circle>
```

- Circle radius: 4px
- Fill color: Primary theme color
- Animation duration: 2 seconds
- Repeats indefinitely

### Temporary Edge

```tsx
<BaseEdge path={edgePath} style={{ strokeDasharray: '5, 5' }} className="stroke-ring stroke-1" />
```

- Stroke: Ring theme color
- Stroke width: 1px
- Dash pattern: 5px dash, 5px gap

## Handle Position Calculation

The component automatically calculates handle positions:

```tsx
const getHandleCoordsByPosition = (node: InternalNode, handlePosition: Position) => {
  // Finds handle bounds by type (source/target) and position
  // Returns [x, y] coordinates with offsets applied
};
```

Supported positions:

- `Position.Left` (target handles)
- `Position.Right` (source handles)
- `Position.Top`
- `Position.Bottom`

## Notes

- Requires `@xyflow/react` package
- Animated edge uses SVG `<animateMotion>` for smooth animation
- Temporary edge uses simple bezier path (faster rendering)
- Animated edge uses full bezier path calculation
- Source handles default to `Position.Right`
- Target handles default to `Position.Left`
- Edge paths calculated with `getBezierPath` and `getSimpleBezierPath`
- Uses `useInternalNode` hook to access node positions
- Returns null if source or target node not found
- Both edge types work with React Flow's edge system
- Marker end support for arrows on edges
