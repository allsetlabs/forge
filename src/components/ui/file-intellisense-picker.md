# File Intellisense Picker

A virtualized file picker component with keyboard navigation, filtering, and autocomplete support for file and directory selection.

## Import

```tsx
import {
  FileIntellisensePicker,
  FileIntellisenseItem,
  FileIntellisensePickerProps,
} from '@allsetlabs/forge/components/ui/file-intellisense-picker';
```

## Features

- **Virtualized Rendering**: Efficiently handles large file lists using TanStack Virtual
- **Keyboard Navigation**: Arrow keys to navigate, Enter/Tab to select, Escape to close
- **File Filtering**: Real-time filtering by file name (case-insensitive)
- **Loading States**: Shows loading indicator while fetching files
- **Icons**: File and folder icons from lucide-react
- **Mouse Support**: Hover to select, click to confirm selection

## Basic Usage

```tsx
import { useRef, useState } from 'react';
import {
  FileIntellisensePicker,
  FileIntellisenseItem,
  FileIntellisensePickerHandle,
} from '@allsetlabs/forge/components/ui/file-intellisense-picker';

export function FilePickerExample() {
  const pickerRef = useRef<FileIntellisensePickerHandle>(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileIntellisenseItem | null>(null);
  const [filter, setFilter] = useState('');

  const files: FileIntellisenseItem[] = [
    { id: '1', name: 'App.tsx', path: 'src/components/', type: 'file' },
    { id: '2', name: 'utils.ts', path: 'src/lib/', type: 'file' },
    { id: '3', name: 'components', path: 'src/', type: 'directory' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (pickerRef.current?.handleKeyDown(e)) {
      return;
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="text"
        placeholder="Search files..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
      />
      <FileIntellisensePicker
        ref={pickerRef}
        items={files}
        filter={filter}
        open={open}
        onSelect={(item) => {
          setSelectedFile(item);
          setOpen(false);
          setFilter('');
        }}
        onClose={() => {
          setOpen(false);
          setFilter('');
        }}
      />
      {selectedFile && <p>Selected: {selectedFile.name}</p>}
    </div>
  );
}
```

**Visual:**

> Displays a dropdown list below an input field. Shows file/folder icons with names and paths. Selected item is highlighted with accent background color. Loading state shows "Loading files..." text.

## Props

| Prop        | Type                                   | Default | Description                                     |
| ----------- | -------------------------------------- | ------- | ----------------------------------------------- |
| `items`     | `FileIntellisenseItem[]`               | -       | Array of files and directories to display       |
| `filter`    | `string`                               | `''`    | Current filter text for searching files         |
| `open`      | `boolean`                              | -       | Whether the picker dropdown is visible          |
| `loading`   | `boolean`                              | `false` | Whether files are being loaded                  |
| `onSelect`  | `(item: FileIntellisenseItem) => void` | -       | Called when user selects an item                |
| `onClose`   | `() => void`                           | -       | Called when user closes the picker (Escape key) |
| `className` | `string`                               | -       | Additional CSS classes for the container        |

## Types

```tsx
interface FileIntellisenseItem {
  id: string; // Unique identifier for the item
  name: string; // Display name (file or folder name)
  path: string; // File path relative to project root
  type: 'file' | 'directory'; // Item type
  size?: number; // Optional file size in bytes
}

interface FileIntellisensePickerProps {
  items: FileIntellisenseItem[];
  filter?: string;
  open: boolean;
  loading?: boolean;
  onSelect: (item: FileIntellisenseItem) => void;
  onClose?: () => void;
  className?: string;
}

interface FileIntellisensePickerHandle {
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
}
```

## Keyboard Navigation

The component supports keyboard navigation via the ref handle:

- **Arrow Down**: Move selection down (wraps to top)
- **Arrow Up**: Move selection up (wraps to bottom)
- **Enter/Tab**: Select the currently highlighted item
- **Escape**: Close the picker

Pass keyboard events to the ref's `handleKeyDown` method:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (pickerRef.current?.handleKeyDown(e)) {
    e.preventDefault();
  }
};
```

## Examples

### Basic File Selection

```tsx
const [open, setOpen] = useState(false);
const [filter, setFilter] = useState('');
const pickerRef = useRef<FileIntellisensePickerHandle>(null);

<FileIntellisensePicker
  items={files}
  filter={filter}
  open={open}
  onSelect={(file) => {
    console.log('Selected:', file.name);
    setOpen(false);
  }}
  onClose={() => setOpen(false)}
/>;
```

### With Loading State

```tsx
const [loading, setLoading] = useState(false);

<FileIntellisensePicker
  items={files}
  filter={filter}
  open={open}
  loading={loading}
  onSelect={(file) => console.log(file)}
/>;
```

### Custom Styling

```tsx
<FileIntellisensePicker
  items={files}
  filter={filter}
  open={open}
  className="max-h-80 w-80"
  onSelect={(file) => console.log(file)}
/>
```

## Accessibility

- Uses semantic button elements for list items
- Supports keyboard navigation (arrow keys, Enter, Escape)
- Hover states indicate interactive elements
- Loading and empty states provide user feedback
- File/folder icons enhance visual recognition

## Notes

- The picker uses virtualization to efficiently render large lists (1000s of items)
- Search filtering is case-insensitive
- Selected index resets to 0 when filter text changes
- Items are max-height of 240px with scrolling
- Icons render from `lucide-react` (FileText for files, Folder for directories)
- Supports mouse selection with hover preview
