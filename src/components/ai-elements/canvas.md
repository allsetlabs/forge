# Canvas

Interactive flow canvas for node-based visualizations using React Flow.

## Import

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
```

## Features

- **React Flow Integration**: Built on @xyflow/react
- **Pan and Zoom**: Scroll to pan, mouse wheel to zoom
- **Selection**: Drag to select multiple nodes
- **Delete Support**: Backspace/Delete keys to remove nodes
- **Auto Fit**: Automatically fits content in view
- **Custom Background**: Uses sidebar color from theme

## Basic Usage

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Background } from '@xyflow/react';

<Canvas nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
  <Background />
</Canvas>;
```

**Visual:**

> Interactive canvas with draggable nodes connected by edges. Grid background in sidebar color.

## Props

| Prop              | Type             | Default                   | Description                       |
| ----------------- | ---------------- | ------------------------- | --------------------------------- |
| nodes             | `Node[]`         | -                         | Array of node objects             |
| edges             | `Edge[]`         | -                         | Array of edge objects             |
| onNodesChange     | `function`       | -                         | Node change handler               |
| onEdgesChange     | `function`       | -                         | Edge change handler               |
| deleteKeyCode     | `string[]`       | `['Backspace', 'Delete']` | Keys to delete nodes              |
| fitView           | `boolean`        | `true`                    | Auto-fit content in view          |
| panOnDrag         | `boolean`        | `false`                   | Pan on drag (disabled by default) |
| panOnScroll       | `boolean`        | `true`                    | Pan on scroll                     |
| selectionOnDrag   | `boolean`        | `true`                    | Enable selection box on drag      |
| zoomOnDoubleClick | `boolean`        | `false`                   | Zoom on double click (disabled)   |
| ...props          | `ReactFlowProps` | -                         | All ReactFlow props               |

## Examples

### Example 1: Basic Flow

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Background } from '@xyflow/react';
import { useState } from 'react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Process' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'End' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

function FlowDiagram() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div style={{ height: 400 }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => applyNodeChanges(changes, setNodes)}
        onEdgesChange={(changes) => applyEdgeChanges(changes, setEdges)}
      >
        <Background />
      </Canvas>
    </div>
  );
}
```

**Visual:**

> Three connected nodes in vertical layout with grid background.

### Example 2: Agent Workflow Canvas

```tsx
import { Canvas } from '@allsetlabs/forge/components/ai-elements/canvas';
import { Background, Controls, MiniMap } from '@xyflow/react';

<div style={{ height: 600 }}>
  <Canvas
    nodes={agentNodes}
    edges={agentEdges}
    onNodesChange={handleNodesChange}
    onEdgesChange={handleEdgesChange}
  >
    <Background />
    <Controls />
    <MiniMap />
  </Canvas>
</div>;
```

**Visual:**

> Agent workflow with nodes, controls panel, and minimap overview.

### Example 3: Read-Only Flow

```tsx
<div style={{ height: 400 }}>
  <Canvas
    nodes={nodes}
    edges={edges}
    nodesDraggable={false}
    nodesConnectable={false}
    elementsSelectable={false}
    selectionOnDrag={false}
  >
    <Background />
  </Canvas>
</div>
```

**Visual:**

> Non-interactive flow diagram for display purposes only.

## Required Styles

Import React Flow styles in your app:

```tsx
import '@xyflow/react/dist/style.css';
```

## Notes

- Requires `@xyflow/react` package installed
- Canvas must have explicit height set on parent container
- Background color uses `var(--sidebar)` from theme
- Pan with scroll wheel, not drag (panOnDrag disabled)
- Selection box enabled by default (selectionOnDrag: true)
- Double-click zoom disabled for better UX
- Delete nodes with Backspace or Delete keys
- Auto-fits view on mount (fitView: true)
- Use with `Background`, `Controls`, `MiniMap` from @xyflow/react for enhanced features
