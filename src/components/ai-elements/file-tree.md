# FileTree

A hierarchical file and folder tree component with expand/collapse functionality and selection support.

## Import

```tsx
import {
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  FileTreeIcon,
  FileTreeName,
  FileTreeActions,
} from '@allsetlabs/forge/components/ai-elements/file-tree';
```

## Features

- **Collapsible Folders**: Expand and collapse folder nodes with chevron indicators
- **Selection State**: Track and highlight selected files/folders
- **Custom Icons**: Support for custom file and folder icons
- **Keyboard Navigation**: Full keyboard accessibility with tab and enter keys
- **Action Buttons**: Attach actions to files/folders without interfering with selection

## Basic Usage

```tsx
<FileTree>
  <FileTreeFolder path="/src" name="src">
    <FileTreeFile path="/src/app.tsx" name="app.tsx" />
    <FileTreeFile path="/src/index.tsx" name="index.tsx" />
  </FileTreeFolder>
</FileTree>
```

**Visual:**

> A bordered container with a folder labeled "src" that can be expanded to show two files: "app.tsx" and "index.tsx".

## Props

### FileTree

| Prop             | Type                              | Default     | Description                    |
| ---------------- | --------------------------------- | ----------- | ------------------------------ |
| expanded         | `Set<string>`                     | -           | Controlled expanded paths      |
| defaultExpanded  | `Set<string>`                     | `new Set()` | Default expanded paths         |
| selectedPath     | `string`                          | -           | Currently selected path        |
| onSelect         | `(path: string) => void`          | -           | Selection change callback      |
| onExpandedChange | `(expanded: Set<string>) => void` | -           | Expanded state change callback |

### FileTreeFolder

| Prop | Type     | Default | Description                   |
| ---- | -------- | ------- | ----------------------------- |
| path | `string` | -       | Unique folder path identifier |
| name | `string` | -       | Folder display name           |

### FileTreeFile

| Prop | Type        | Default | Description                 |
| ---- | ----------- | ------- | --------------------------- |
| path | `string`    | -       | Unique file path identifier |
| name | `string`    | -       | File display name           |
| icon | `ReactNode` | -       | Custom file icon            |

### FileTreeIcon

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

### FileTreeName

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

### FileTreeActions

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

## Examples

### Example 1: Controlled Selection

```tsx
const [selected, setSelected] = useState('/src/app.tsx');

<FileTree selectedPath={selected} onSelect={setSelected}>
  <FileTreeFolder path="/src" name="src">
    <FileTreeFile path="/src/app.tsx" name="app.tsx" />
    <FileTreeFile path="/src/index.tsx" name="index.tsx" />
  </FileTreeFolder>
</FileTree>;
```

**Visual:**

> File tree with "app.tsx" highlighted as selected.

### Example 2: Custom Icons

```tsx
<FileTree>
  <FileTreeFolder path="/components" name="components">
    <FileTreeFile
      path="/components/button.tsx"
      name="button.tsx"
      icon={<ComponentIcon className="size-4 text-blue-500" />}
    />
  </FileTreeFolder>
</FileTree>
```

**Visual:**

> File tree with custom blue component icon next to "button.tsx".

### Example 3: With Actions

```tsx
<FileTree>
  <FileTreeFolder path="/src" name="src">
    <FileTreeFile path="/src/app.tsx" name="app.tsx">
      <FileTreeIcon>
        <FileIcon className="size-4" />
      </FileTreeIcon>
      <FileTreeName>app.tsx</FileTreeName>
      <FileTreeActions>
        <Button size="icon-sm" variant="ghost">
          <MoreVerticalIcon className="size-3" />
        </Button>
      </FileTreeActions>
    </FileTreeFile>
  </FileTreeFolder>
</FileTree>
```

**Visual:**

> File tree with a three-dot menu button appearing on the right side of "app.tsx".

### Example 4: Default Expanded Folders

```tsx
<FileTree defaultExpanded={new Set(['/src', '/components'])}>
  <FileTreeFolder path="/src" name="src">
    <FileTreeFile path="/src/app.tsx" name="app.tsx" />
  </FileTreeFolder>
  <FileTreeFolder path="/components" name="components">
    <FileTreeFile path="/components/button.tsx" name="button.tsx" />
  </FileTreeFolder>
</FileTree>
```

**Visual:**

> File tree with both "src" and "components" folders expanded by default.

## Notes

- Paths must be unique across all files and folders
- Folder icons automatically switch between `FolderIcon` and `FolderOpenIcon` based on expanded state
- File items include a spacer for alignment with folder chevrons
- Actions stop click propagation to prevent selection when clicking action buttons
- Component is accessible with proper ARIA roles (`tree`, `treeitem`)
