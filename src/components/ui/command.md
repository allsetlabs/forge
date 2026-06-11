# Command

A command palette component for search, navigation, and actions with keyboard shortcuts.

## Import

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@allsetlabs/forge/components/ui/command';
```

## Features

- **Fast Command Search**: Fuzzy search through commands and actions
- **Keyboard Navigation**: Full keyboard support with arrow keys and shortcuts
- **Dialog Mode**: Can be displayed as a modal dialog (⌘K style)
- **Grouped Commands**: Organize commands into logical groups
- **Empty State**: Built-in handling for no results
- **Shortcut Display**: Show keyboard shortcuts alongside commands
- **Accessible**: Full ARIA support and screen reader compatibility

## Basic Usage

```tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@allsetlabs/forge/components/ui/command';

function Example() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## Props

### Command

All standard HTML attributes plus:

| Prop            | Type                                        | Default        | Description                     |
| --------------- | ------------------------------------------- | -------------- | ------------------------------- |
| `value`         | `string`                                    | -              | Controlled selected value       |
| `onValueChange` | `(value: string) => void`                   | -              | Callback when selection changes |
| `filter`        | `(value: string, search: string) => number` | Built-in fuzzy | Custom filter function          |
| `shouldFilter`  | `boolean`                                   | `true`         | Enable/disable filtering        |
| `loop`          | `boolean`                                   | `false`        | Loop keyboard navigation        |

### CommandDialog

Extends Dialog props:

| Prop           | Type                      | Default | Description                        |
| -------------- | ------------------------- | ------- | ---------------------------------- |
| `open`         | `boolean`                 | -       | Control dialog visibility          |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when dialog state changes |
| `children`     | `React.ReactNode`         | -       | Command components                 |

### CommandInput

Standard input props plus:

| Prop            | Type                       | Default | Description                  |
| --------------- | -------------------------- | ------- | ---------------------------- |
| `placeholder`   | `string`                   | -       | Input placeholder text       |
| `value`         | `string`                   | -       | Controlled input value       |
| `onValueChange` | `(search: string) => void` | -       | Callback when search changes |

> Includes a search icon automatically

### CommandItem

| Prop       | Type                      | Default | Description                    |
| ---------- | ------------------------- | ------- | ------------------------------ |
| `value`    | `string`                  | -       | Item value for selection       |
| `onSelect` | `(value: string) => void` | -       | Callback when item is selected |
| `disabled` | `boolean`                 | `false` | Disable item interaction       |

## Examples

### Command Menu

```tsx
<Command className="rounded-lg border border-neutral-200 shadow-md dark:border-neutral-700">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <Smile className="mr-2 h-4 w-4" />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Command Dialog (⌘K Style)

```tsx
const [open, setOpen] = useState(false);

useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };
  document.addEventListener('keydown', down);
  return () => document.removeEventListener('keydown', down);
}, []);

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem onSelect={() => console.log('New file')}>
        <File className="mr-2 h-4 w-4" />
        New File
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem onSelect={() => console.log('Open')}>
        <FolderOpen className="mr-2 h-4 w-4" />
        Open
        <CommandShortcut>⌘O</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>;
```

### With Selection Handling

```tsx
const [selectedValue, setSelectedValue] = useState('');

<Command value={selectedValue} onValueChange={setSelectedValue}>
  <CommandInput placeholder="Search pages..." />
  <CommandList>
    <CommandGroup heading="Pages">
      <CommandItem
        value="home"
        onSelect={(value) => {
          setSelectedValue(value);
          navigate('/home');
        }}
      >
        Home
      </CommandItem>
      <CommandItem
        value="about"
        onSelect={(value) => {
          setSelectedValue(value);
          navigate('/about');
        }}
      >
        About
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>;
```

### Grouped with Separators

```tsx
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandGroup heading="Recent">
      <CommandItem>Dashboard</CommandItem>
      <CommandItem>Analytics</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Files">
      <CommandItem>Documents</CommandItem>
      <CommandItem>Downloads</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Preferences</CommandItem>
      <CommandItem>Account</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Custom Empty State

```tsx
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>
      <div className="flex flex-col items-center gap-2 py-6">
        <SearchX className="h-8 w-8 text-neutral-400" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          No results found. Try a different search.
        </p>
      </div>
    </CommandEmpty>
    <CommandGroup>
      <CommandItem>Item 1</CommandItem>
      <CommandItem>Item 2</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Accessibility

- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, Escape to close
- **ARIA Attributes**: Full combobox pattern with proper roles and states
- **Screen Reader Support**: Announces results count, selection changes, and groups
- **Focus Management**: Maintains focus within command palette
- **Type-ahead**: Start typing to filter results instantly

## Notes

- Built on top of `cmdk` library by Paco Coursey
- Includes fuzzy search by default (can be customized with `filter` prop)
- CommandList has a max height of 300px with scroll (customizable via className)
- CommandDialog renders Command in a modal Dialog component
- Search icon is automatically included in CommandInput
- CommandShortcut is purely visual - implement keyboard handling separately
- Use `loop` prop to enable circular keyboard navigation
- The component uses custom color tokens for full dark mode support
