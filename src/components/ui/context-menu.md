# Context Menu

A menu triggered by right-clicking on an element, displaying context-specific actions.

## Import

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '@allsetlabs/forge/components/ui/context-menu';
```

## Features

- **Right-Click Activation**: Opens on right-click or context menu key
- **Nested Submenus**: Support for multi-level menu hierarchies
- **Checkbox Items**: Toggle-able menu items with visual indicators
- **Radio Groups**: Single-selection groups with radio indicators
- **Keyboard Shortcuts**: Display keyboard shortcuts alongside items
- **Accessible**: Full keyboard navigation and ARIA support
- **Portal Rendering**: Renders outside parent DOM hierarchy to avoid z-index issues

## Basic Usage

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from '@allsetlabs/forge/components/ui/context-menu';

function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Props

### ContextMenu

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when menu state changes  |
| `modal`        | `boolean`                 | `true`  | Whether to trap focus in the menu |

### ContextMenuItem

| Prop       | Type                     | Default | Description                                              |
| ---------- | ------------------------ | ------- | -------------------------------------------------------- |
| `inset`    | `boolean`                | `false` | Add left padding for alignment with checkbox/radio items |
| `disabled` | `boolean`                | `false` | Disable item interaction                                 |
| `onSelect` | `(event: Event) => void` | -       | Callback when item is selected                           |

### ContextMenuCheckboxItem

| Prop              | Type                         | Default | Description                         |
| ----------------- | ---------------------------- | ------- | ----------------------------------- |
| `checked`         | `boolean \| 'indeterminate'` | -       | Checked state                       |
| `onCheckedChange` | `(checked: boolean) => void` | -       | Callback when checked state changes |
| `disabled`        | `boolean`                    | `false` | Disable item interaction            |

### ContextMenuRadioItem

| Prop       | Type      | Default | Description               |
| ---------- | --------- | ------- | ------------------------- |
| `value`    | `string`  | -       | Value for this radio item |
| `disabled` | `boolean` | `false` | Disable item interaction  |

### ContextMenuRadioGroup

| Prop            | Type                      | Default | Description                     |
| --------------- | ------------------------- | ------- | ------------------------------- |
| `value`         | `string`                  | -       | Current selected value          |
| `onValueChange` | `(value: string) => void` | -       | Callback when selection changes |

### ContextMenuSubTrigger

| Prop       | Type      | Default | Description                    |
| ---------- | --------- | ------- | ------------------------------ |
| `inset`    | `boolean` | `false` | Add left padding for alignment |
| `disabled` | `boolean` | `false` | Disable submenu trigger        |

### ContextMenuLabel

| Prop    | Type      | Default | Description                    |
| ------- | --------- | ------- | ------------------------------ |
| `inset` | `boolean` | `false` | Add left padding for alignment |

## Examples

### Full-Featured Context Menu

```tsx
<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-neutral-200 dark:border-neutral-700">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem inset>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset>
      Reload
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar
      <ContextMenuShortcut>⌘B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuLabel>More Tools</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem inset>
      Save Page As...
      <ContextMenuShortcut>⌘S</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset>Create Shortcut...</ContextMenuItem>
    <ContextMenuItem inset>Name Window...</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### With Nested Submenus

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>New File</ContextMenuItem>
    <ContextMenuItem>New Folder</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Sort By</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Name</ContextMenuItem>
        <ContextMenuItem>Date Modified</ContextMenuItem>
        <ContextMenuItem>Size</ContextMenuItem>
        <ContextMenuItem>Type</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem>Properties</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### With Radio Groups

```tsx
const [view, setView] = useState('grid');

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>View</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value={view} onValueChange={setView}>
      <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
      <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
      <ContextMenuRadioItem value="columns">Column View</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>;
```

### With Checkbox Items

```tsx
const [showToolbar, setShowToolbar] = useState(true);
const [showSidebar, setShowSidebar] = useState(false);

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>View Options</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
      Show Toolbar
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
      Show Sidebar
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>;
```

### File Operations Example

```tsx
<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-700">
      <File className="h-8 w-8" />
      <p className="mt-2 text-sm">Document.pdf</p>
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <Eye className="mr-2 h-4 w-4" />
      Open
    </ContextMenuItem>
    <ContextMenuItem>
      <Download className="mr-2 h-4 w-4" />
      Download
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <Copy className="mr-2 h-4 w-4" />
      Copy
    </ContextMenuItem>
    <ContextMenuItem>
      <Scissors className="mr-2 h-4 w-4" />
      Cut
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-error-500">
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### With Icons and Shortcuts

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <FilePlus className="mr-2 h-4 w-4" />
      New File
      <ContextMenuShortcut>⌘N</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <FolderPlus className="mr-2 h-4 w-4" />
      New Folder
      <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <Copy className="mr-2 h-4 w-4" />
      Copy
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Clipboard className="mr-2 h-4 w-4" />
      Paste
      <ContextMenuShortcut>⌘V</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Accessibility

- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, Escape to close
- **Context Menu Key**: Opens via keyboard context menu key
- **ARIA Attributes**: Full menu pattern with proper roles and states
- **Screen Reader Support**: Announces menu items, checkboxes, radio states
- **Focus Management**: Maintains focus within menu, returns focus on close
- **Submenu Navigation**: Right arrow to open, left arrow to close

## Notes

- Built on top of `@radix-ui/react-context-menu` for robust accessibility
- Opens on right-click (contextmenu event) or long-press on touch devices
- Automatically positions to avoid viewport edges
- Use `inset` prop on items to align with checkbox/radio items
- ContextMenuShortcut is purely visual - implement keyboard handling separately
- Portal rendering ensures menu appears above other content
- Supports nested submenus to any depth
- Check/Radio indicators appear automatically when checked
- ChevronRight icon automatically added to submenu triggers
