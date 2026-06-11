# Slash Command Picker

Accessible keyboard-navigable command picker component for displaying grouped slash commands with filtering support.

## Import

```tsx
import {
  SlashCommandPicker,
  type SlashCommandItem,
  type SlashCommandGroup,
  type SlashCommandPickerProps,
} from '@allsetlabs/forge/components/ui/slash-command-picker';
```

## Features

- **Keyboard Navigation**: Arrow keys to navigate, Enter/Tab to select, Escape to close
- **Grouped Commands**: Organize commands into logical groups with headings
- **Filtering**: Built-in support for filtering commands by name
- **Imperative Handle**: Forward ref for external keyboard handling via `handleKeyDown`
- **Auto-scroll**: Automatically scrolls selected item into view
- **Mouse Support**: Click or hover to select items
- **Accessible**: Proper ARIA and semantic structure

## Basic Usage

```tsx
const groups: SlashCommandGroup[] = [
  {
    heading: 'Writing',
    items: [
      { id: '1', name: 'text', description: 'Insert plain text', type: 'text' },
      { id: '2', name: 'heading', description: 'Insert a heading', type: 'block' },
    ],
  },
  {
    heading: 'Content',
    items: [{ id: '3', name: 'image', description: 'Insert an image', type: 'media' }],
  },
];

<SlashCommandPicker
  groups={groups}
  open={true}
  onSelect={(item) => console.log('Selected:', item.name)}
/>;
```

**Visual:**

> A dropdown menu positioned above the cursor with grouped commands. Each group has a gray heading. Commands show as buttons with "/" prefix, name, and description. Selected item has accent background color.

## Props

| Prop        | Type                               | Default | Description                                              |
| ----------- | ---------------------------------- | ------- | -------------------------------------------------------- |
| `groups`    | `SlashCommandGroup[]`              | -       | Array of command groups with headings and items          |
| `filter`    | `string`                           | `''`    | Filter string to search command names (case-insensitive) |
| `open`      | `boolean`                          | -       | Whether the picker is visible                            |
| `onSelect`  | `(item: SlashCommandItem) => void` | -       | Callback fired when a command is selected                |
| `onClose`   | `() => void`                       | -       | Optional callback fired when Escape key is pressed       |
| `className` | `string`                           | -       | Additional CSS classes for the root element              |

## Types

```tsx
export interface SlashCommandItem {
  id: string; // Unique identifier for the command
  name: string; // Command name (displayed with "/" prefix)
  description: string; // Help text shown next to command name
  type: string; // Command type for categorization
}

export interface SlashCommandGroup {
  heading: string; // Group heading displayed above items
  items: SlashCommandItem[]; // Array of commands in this group
}

export interface SlashCommandPickerProps {
  groups: SlashCommandGroup[];
  filter?: string;
  open: boolean;
  onSelect: (item: SlashCommandItem) => void;
  onClose?: () => void;
  className?: string;
}

export interface SlashCommandPickerHandle {
  handleKeyDown: (e: React.KeyboardEvent) => boolean; // Returns true if event was handled
}
```

## Examples

### Example 1: Basic Command Picker

```tsx
const [open, setOpen] = useState(false);

const groups: SlashCommandGroup[] = [
  {
    heading: 'Actions',
    items: [
      { id: 'send', name: 'send', description: 'Send message', type: 'action' },
      { id: 'save', name: 'save', description: 'Save draft', type: 'action' },
    ],
  },
];

<SlashCommandPicker
  groups={groups}
  open={open}
  onSelect={(item) => {
    console.log('Selected:', item.name);
    setOpen(false);
  }}
  onClose={() => setOpen(false)}
/>;
```

**Visual:**

> Dropdown menu showing command options. Clicking a command closes the menu and logs the selection.

### Example 2: Filtered Command Picker

```tsx
const [open, setOpen] = useState(false);
const [filter, setFilter] = useState('');

const groups: SlashCommandGroup[] = [
  {
    heading: 'Blocks',
    items: [
      { id: 'heading1', name: 'heading', description: 'Large heading', type: 'block' },
      { id: 'heading2', name: 'subheading', description: 'Medium heading', type: 'block' },
      { id: 'paragraph', name: 'paragraph', description: 'Text paragraph', type: 'block' },
    ],
  },
];

<>
  <input
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    placeholder="Search commands..."
  />
  <SlashCommandPicker
    groups={groups}
    filter={filter}
    open={open}
    onSelect={(item) => {
      console.log('Selected:', item.name);
      setFilter('');
      setOpen(false);
    }}
  />
</>;
```

**Visual:**

> Text input for filtering commands. As user types "head", only "heading" and "subheading" remain visible in the picker dropdown.

### Example 3: With Imperative Keyboard Handling

```tsx
const pickerRef = useRef<SlashCommandPickerHandle>(null);
const [open, setOpen] = useState(false);

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === '/') {
    setOpen(true);
  } else if (open && pickerRef.current?.handleKeyDown(e)) {
    // Picker handled the event
  }
};

<>
  <input onKeyDown={handleKeyDown} />
  <SlashCommandPicker
    ref={pickerRef}
    groups={commandGroups}
    open={open}
    onSelect={(item) => {
      insertCommand(item.name);
      setOpen(false);
    }}
    onClose={() => setOpen(false)}
  />
</>;
```

**Visual:**

> Typing "/" in the input opens the command picker. Arrow keys navigate, Enter selects, Escape closes the picker.

### Example 4: DevBot Slash Commands

```tsx
const slashCommands: SlashCommandGroup[] = [
  {
    heading: 'AI Features',
    items: [
      { id: 'ask', name: 'ask', description: 'Ask Claude a question', type: 'ai' },
      { id: 'analyze', name: 'analyze', description: 'Analyze code', type: 'ai' },
      { id: 'refactor', name: 'refactor', description: 'Refactor code', type: 'ai' },
    ],
  },
  {
    heading: 'Navigation',
    items: [
      { id: 'go', name: 'go', description: 'Go to file/symbol', type: 'nav' },
      { id: 'help', name: 'help', description: 'Show help', type: 'nav' },
    ],
  },
];

<SlashCommandPicker
  groups={slashCommands}
  open={isCommandOpen}
  filter={commandFilter}
  onSelect={(item) => executeCommand(item.name)}
  onClose={() => setIsCommandOpen(false)}
/>;
```

**Visual:**

> Command picker with "AI Features" and "Navigation" groups. Each group shows related commands organized by category.

## Keyboard Navigation

| Key         | Behavior                                           |
| ----------- | -------------------------------------------------- |
| `ArrowDown` | Move selection to next command (wraps to first)    |
| `ArrowUp`   | Move selection to previous command (wraps to last) |
| `Enter`     | Select currently highlighted command               |
| `Tab`       | Select currently highlighted command               |
| `Escape`    | Close picker and call `onClose` callback           |

## Accessibility

- Uses semantic `<button>` elements for each command
- Keyboard accessible: Full navigation with arrow keys
- Selected item indicated with data attribute for styling
- Automatically scrolls selected item into view
- Supports mouse interaction (hover to select, click to confirm)
- Groups identified with semantic heading structure
- No ARIA roles needed - relies on semantic HTML

## TypeScript

```tsx
const pickerRef = useRef<SlashCommandPickerHandle>(null);

interface SlashCommandPickerHandle {
  // Call to process keyboard events externally
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
}
```

## Notes

- Returns `null` if `open` is false or no commands match the filter
- Auto-resets selection to first item when filter changes
- Max height 240px with scrollbar for overflow commands
- Selected item marked with `data-selected="true"` attribute
- Positioning uses absolute positioning - parent should have `position: relative`
- Group headings displayed above items with muted foreground color
- Item descriptions truncated with ellipsis if too long
- All commands in a group are flattened for keyboard navigation
- Pressing Enter or Tab on selected command triggers `onSelect`
