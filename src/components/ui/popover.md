# Popover

A floating panel that appears near a trigger element to display rich content.

## Import

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from '@allsetlabs/forge/components/ui/popover';
```

## Features

- **Flexible Positioning**: Auto-positions to avoid overflow (top, right, bottom, left)
- **Portal Rendering**: Renders in document root to avoid z-index issues
- **Smooth Animations**: Fade and zoom entrance/exit animations
- **Keyboard Support**: ESC to close, focus management
- **Non-Modal**: Clicking outside closes the popover
- **Accessible**: Built on Radix UI with proper ARIA attributes

## Basic Usage

```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    <p>This is a popover with some content.</p>
  </PopoverContent>
</Popover>
```

## Props

### Popover

Based on `@radix-ui/react-popover` Root component:

| Prop         | Type     | Default | Description                       |
| ------------ | -------- | ------- | --------------------------------- |
| open         | boolean  | -       | Controlled open state             |
| onOpenChange | function | -       | Callback when open state changes  |
| defaultOpen  | boolean  | false   | Initial open state (uncontrolled) |

### PopoverTrigger

| Prop     | Type      | Default | Description                                                |
| -------- | --------- | ------- | ---------------------------------------------------------- |
| children | ReactNode | -       | Element that triggers the popover                          |
| asChild  | boolean   | false   | Merge props with child element instead of rendering button |

### PopoverContent

| Prop        | Type                                     | Default    | Description                               |
| ----------- | ---------------------------------------- | ---------- | ----------------------------------------- |
| children    | ReactNode                                | -          | Popover content                           |
| className   | string                                   | -          | Additional CSS classes                    |
| align       | `"start" \| "center" \| "end"`           | `"center"` | Alignment relative to trigger             |
| side        | `"top" \| "right" \| "bottom" \| "left"` | -          | Preferred side (auto if not enough space) |
| sideOffset  | number                                   | 4          | Distance from trigger (px)                |
| alignOffset | number                                   | -          | Offset along the align axis (px)          |

> Default width is `w-72` (18rem / 288px).

### PopoverAnchor

| Prop     | Type      | Default | Description                                           |
| -------- | --------- | ------- | ----------------------------------------------------- |
| children | ReactNode | -       | Element to anchor popover to (alternative to trigger) |

## Examples

### Simple Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button>Show Info</button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium">Information</h4>
      <p className="text-muted-foreground text-sm">
        This is additional information displayed in a popover.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

### Popover with Custom Alignment

```tsx
<Popover>
  <PopoverTrigger>Settings</PopoverTrigger>
  <PopoverContent align="start" side="bottom" sideOffset={10}>
    <div className="space-y-2">
      <p className="text-sm font-medium">Settings</p>
      <div>...</div>
    </div>
  </PopoverContent>
</Popover>
```

### Controlled Popover

```tsx
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger>Toggle</PopoverTrigger>
  <PopoverContent>
    <button onClick={() => setOpen(false)}>Close</button>
  </PopoverContent>
</Popover>;
```

### Form in Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button>Add Task</button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="task-name" className="text-sm font-medium">
          Task Name
        </label>
        <input id="task-name" type="text" className="w-full rounded border px-3 py-2" />
      </div>
      <button type="submit" className="bg-primary w-full rounded px-4 py-2 text-white">
        Add Task
      </button>
    </form>
  </PopoverContent>
</Popover>
```

### Date Picker Popover

```tsx
import { Calendar } from '@allsetlabs/forge/components/ui/calendar';

<Popover>
  <PopoverTrigger asChild>
    <button>{date ? format(date, 'PPP') : 'Pick a date'}</button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>;
```

### Using PopoverAnchor

```tsx
<Popover>
  <PopoverAnchor>
    <div className="inline-block">Anchor element</div>
  </PopoverAnchor>
  <button onClick={() => setOpen(true)}>Open (separate trigger)</button>
  <PopoverContent>Content anchored to div above</PopoverContent>
</Popover>
```

## Accessibility

- ESC key closes the popover
- Focus returns to trigger when closed
- Tab navigation works within popover
- Clicking outside closes the popover
- Proper ARIA attributes for screen readers
- Portal rendering prevents focus trap issues

## Notes

- Content is rendered in a portal at document root
- Default width is `w-72` (can be overridden with `className`)
- Default padding is `p-4`
- Border uses custom `border-border` color
- Background uses `bg-popover` color
- Text uses `text-popover-foreground` color
- Shadow is `shadow-md`
- Animations include fade, zoom, and slide based on side
- Auto-positioning prevents popover from being cut off by viewport
- Use `asChild` on trigger to merge with custom elements (prevents wrapper div)
