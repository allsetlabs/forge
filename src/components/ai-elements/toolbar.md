# Toolbar

React Flow node toolbar component for displaying actions near nodes.

## Import

```tsx
import { Toolbar } from '@allsetlabs/forge/components/ai-elements/toolbar';
```

## Features

- **React Flow Integration**: Built on @xyflow/react NodeToolbar
- **Positioned**: Automatically positioned relative to node (default: bottom)
- **Styled Container**: Bordered background with proper spacing
- **Flexible Layout**: Flexbox for horizontal button layout

## Basic Usage

```tsx
import { ReactFlow, Node } from '@xyflow/react';

const nodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
];

const CustomNode = ({ data }: { data: { label: string } }) => (
  <>
    <div>{data.label}</div>
    <Toolbar>
      <Button size="icon-sm" variant="ghost">
        <EditIcon className="size-4" />
      </Button>
      <Button size="icon-sm" variant="ghost">
        <DeleteIcon className="size-4" />
      </Button>
    </Toolbar>
  </>
);

<ReactFlow nodes={nodes} nodeTypes={{ custom: CustomNode }} />;
```

**Visual:**

> A small toolbar appears below the node with edit and delete icon buttons in a bordered container.

## Props

| Prop      | Type      | Default         | Description                         |
| --------- | --------- | --------------- | ----------------------------------- |
| position  | Position  | Position.Bottom | Toolbar position relative to node   |
| className | string    | -               | Additional CSS classes              |
| children  | ReactNode | -               | Toolbar content (typically buttons) |

## Position Options

- `Position.Top` - Above the node
- `Position.Right` - Right of the node
- `Position.Bottom` - Below the node (default)
- `Position.Left` - Left of the node

## Examples

### Example 1: Edit Actions

```tsx
<Toolbar>
  <Button size="icon-sm" variant="ghost" onClick={handleEdit}>
    <EditIcon className="size-4" />
  </Button>
  <Button size="icon-sm" variant="ghost" onClick={handleDuplicate}>
    <CopyIcon className="size-4" />
  </Button>
  <Button size="icon-sm" variant="ghost" onClick={handleDelete}>
    <TrashIcon className="size-4" />
  </Button>
</Toolbar>
```

**Visual:**

> Three icon buttons: edit, duplicate, and delete in a horizontal toolbar.

### Example 2: Top Position

```tsx
<Toolbar position={Position.Top}>
  <Button size="sm" variant="outline">
    Add Connection
  </Button>
</Toolbar>
```

**Visual:**

> Toolbar positioned above the node with text button.

### Example 3: With Badge

```tsx
<Toolbar>
  <div className="flex items-center gap-2 px-2">
    <Badge variant="secondary">Active</Badge>
    <Button size="icon-sm" variant="ghost">
      <MoreHorizontalIcon className="size-4" />
    </Button>
  </div>
</Toolbar>
```

**Visual:**

> Toolbar with status badge and more options button.

### Example 4: Conditional Toolbar

```tsx
const CustomNode = ({ data, selected }) => (
  <>
    <div>{data.label}</div>
    {selected && (
      <Toolbar>
        <Button size="icon-sm" variant="ghost">
          <SettingsIcon className="size-4" />
        </Button>
      </Toolbar>
    )}
  </>
);
```

**Visual:**

> Toolbar only appears when node is selected.

## Notes

- Requires React Flow context (must be used within ReactFlow component)
- Default position is bottom of the node
- Toolbar automatically adjusts position based on available space
- Use `size="icon-sm"` for compact icon buttons
- Toolbar has bordered background with slight padding
- Works with all React Flow node types
- Can contain any React components, not just buttons
