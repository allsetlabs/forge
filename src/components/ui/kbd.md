# Kbd

A component for displaying keyboard shortcuts and hotkeys.

## Import

```tsx
import { Kbd } from '@allsetlabs/forge/components/ui/kbd';
```

## Features

- **Semantic HTML**: Uses `<kbd>` element for keyboard input semantics
- **Styled for Readability**: Monospace font with subtle border and background
- **Non-interactive**: Pointer events disabled by default
- **Unselectable**: Text selection prevented for clean UI
- **Flexible Layout**: Inline-flex for combining multiple keys

## Basic Usage

```tsx
<Kbd>Ctrl</Kbd>
```

## Props

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

Extends all `HTMLAttributes<HTMLElement>` props.

## Examples

### Single Key

```tsx
<Kbd>Enter</Kbd>
```

> Displays a single keyboard key

### Key Combination

```tsx
<div className="flex items-center gap-1">
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>C</Kbd>
</div>
```

> Shows a keyboard shortcut combination

### Multiple Keys with Gap

```tsx
<Kbd>
  <span>⌘</span>
  <span>K</span>
</Kbd>
```

> Multiple characters within one Kbd (uses internal gap-1)

### In Documentation

```tsx
<p>
  Press <Kbd>Esc</Kbd> to close the dialog.
</p>
```

> Inline within text content

### Command Palette Shortcut

```tsx
<div className="flex items-center justify-between">
  <span>Open command palette</span>
  <div className="flex items-center gap-1">
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>K</Kbd>
  </div>
</div>
```

> Common pattern for showing shortcuts in menus

### Platform-specific Shortcuts

```tsx
const isMac = navigator.platform.includes('Mac');

<div className="flex items-center gap-1">
  <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
  <span>+</span>
  <Kbd>S</Kbd>
</div>;
```

> Display different shortcuts based on platform

### Arrow Keys

```tsx
<div className="flex gap-2">
  <Kbd>↑</Kbd>
  <Kbd>↓</Kbd>
  <Kbd>←</Kbd>
  <Kbd>→</Kbd>
</div>
```

> Using Unicode arrow characters

### Function Keys

```tsx
<Kbd>F12</Kbd>
```

> Displaying function keys

### In Tooltip

```tsx
<Tooltip>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipContent>
    Save file <Kbd>Ctrl+S</Kbd>
  </TooltipContent>
</Tooltip>
```

> Show shortcut in tooltip

## Accessibility

- Uses semantic `<kbd>` element for keyboard input
- Screen readers announce content as keyboard input
- Non-interactive by default (`pointer-events-none`)
- Unselectable text prevents accidental selection
- Consider adding `aria-label` to parent when context isn't clear

## Notes

- Height is fixed at `h-5` (20px) for consistent appearance
- Font size is `text-[10px]` for compact display
- Uses `font-mono` for clear distinction from surrounding text
- Background is `bg-muted` with `border-border` outline
- Text color is `text-muted-foreground` for subtle appearance
- Border radius is `rounded` (0.25rem) for soft corners
- Internal padding is `px-1.5` with `gap-1` for multi-character content
- Opacity is set to `opacity-100` (can be overridden if needed)
- Common symbols: `⌘` (Cmd), `⌃` (Ctrl), `⌥` (Option), `⇧` (Shift), `↵` (Enter)
