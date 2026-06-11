# Toggle

A two-state button that can be on or off, useful for boolean settings and toolbar actions.

## Import

```tsx
import { Toggle, toggleVariants } from '@allsetlabs/forge/components/ui/toggle';
```

## Features

- **Two States**: Clear on/off visual states
- **Flexible Variants**: Default and outline styles
- **Multiple Sizes**: Small, medium (default), and large sizes
- **Icon Support**: Optimized for icon buttons
- **Accessible**: Full keyboard support and ARIA attributes
- **Dark Mode**: Full dark mode support with custom colors

## Basic Usage

```tsx
import { Toggle } from '@allsetlabs/forge/components/ui/toggle';
import { Bold } from 'lucide-react';

function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
```

## Props

### Toggle

| Prop              | Type                         | Default     | Description                         |
| ----------------- | ---------------------------- | ----------- | ----------------------------------- |
| `pressed`         | `boolean`                    | -           | Controlled pressed state            |
| `defaultPressed`  | `boolean`                    | `false`     | Uncontrolled default pressed state  |
| `onPressedChange` | `(pressed: boolean) => void` | -           | Callback when pressed state changes |
| `disabled`        | `boolean`                    | `false`     | Disable toggle interaction          |
| `variant`         | `'default' \| 'outline'`     | `'default'` | Visual style variant                |
| `size`            | `'default' \| 'sm' \| 'lg'`  | `'default'` | Size of the toggle button           |

## Variants

### Variant Styles

| Variant   | Description                                   |
| --------- | --------------------------------------------- |
| `default` | Transparent background with muted hover state |
| `outline` | Border with shadow, accent hover state        |

### Sizes

| Size      | Height      | Padding       | Min Width |
| --------- | ----------- | ------------- | --------- |
| `sm`      | 32px (h-8)  | 6px (px-1.5)  | 32px      |
| `default` | 36px (h-9)  | 8px (px-2)    | 36px      |
| `lg`      | 40px (h-10) | 10px (px-2.5) | 40px      |

## Examples

### Text Formatting Toolbar

```tsx
const [bold, setBold] = useState(false);
const [italic, setItalic] = useState(false);
const [underline, setUnderline] = useState(false);

<div className="flex items-center gap-1">
  <Toggle pressed={bold} onPressedChange={setBold} aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </Toggle>
  <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </Toggle>
  <Toggle pressed={underline} onPressedChange={setUnderline} aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </Toggle>
</div>;
```

### With Text and Icon

```tsx
<Toggle aria-label="Toggle notifications">
  <Bell className="mr-2 h-4 w-4" />
  Notifications
</Toggle>
```

### Outline Variant

```tsx
<div className="flex gap-2">
  <Toggle variant="outline" aria-label="Toggle grid view">
    <Grid className="h-4 w-4" />
  </Toggle>
  <Toggle variant="outline" aria-label="Toggle list view">
    <List className="h-4 w-4" />
  </Toggle>
</div>
```

### Different Sizes

```tsx
<div className="flex items-center gap-2">
  <Toggle size="sm" aria-label="Small toggle">
    <Star className="h-4 w-4" />
  </Toggle>
  <Toggle size="default" aria-label="Default toggle">
    <Star className="h-4 w-4" />
  </Toggle>
  <Toggle size="lg" aria-label="Large toggle">
    <Star className="h-4 w-4" />
  </Toggle>
</div>
```

### Disabled State

```tsx
<Toggle disabled aria-label="Disabled toggle">
  <Lock className="h-4 w-4" />
</Toggle>
```

### Controlled Toggle

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<div className="space-y-2">
  <Toggle pressed={isEnabled} onPressedChange={setIsEnabled} aria-label="Toggle feature">
    <Settings className="h-4 w-4" />
    Feature {isEnabled ? 'Enabled' : 'Disabled'}
  </Toggle>
  <p className="text-muted-foreground text-sm">Status: {isEnabled ? 'On' : 'Off'}</p>
</div>;
```

### View Mode Selector

```tsx
const [view, setView] = useState<'grid' | 'list'>('grid');

<div className="flex gap-1 rounded-md border border-neutral-200 p-1 dark:border-neutral-700">
  <Toggle
    variant="outline"
    pressed={view === 'grid'}
    onPressedChange={() => setView('grid')}
    aria-label="Grid view"
  >
    <Grid className="h-4 w-4" />
  </Toggle>
  <Toggle
    variant="outline"
    pressed={view === 'list'}
    onPressedChange={() => setView('list')}
    aria-label="List view"
  >
    <List className="h-4 w-4" />
  </Toggle>
</div>;
```

### With Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </TooltipTrigger>
    <TooltipContent>
      <p>Bold (⌘B)</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Editor Toolbar Example

```tsx
const [formatting, setFormatting] = useState({
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
});

const toggleFormat = (format: keyof typeof formatting) => {
  setFormatting((prev) => ({ ...prev, [format]: !prev[format] }));
};

<div className="flex flex-wrap gap-1 rounded-md border border-neutral-200 p-2 dark:border-neutral-700">
  <Toggle
    pressed={formatting.bold}
    onPressedChange={() => toggleFormat('bold')}
    size="sm"
    aria-label="Toggle bold"
  >
    <Bold className="h-4 w-4" />
  </Toggle>
  <Toggle
    pressed={formatting.italic}
    onPressedChange={() => toggleFormat('italic')}
    size="sm"
    aria-label="Toggle italic"
  >
    <Italic className="h-4 w-4" />
  </Toggle>
  <Toggle
    pressed={formatting.underline}
    onPressedChange={() => toggleFormat('underline')}
    size="sm"
    aria-label="Toggle underline"
  >
    <Underline className="h-4 w-4" />
  </Toggle>
  <Toggle
    pressed={formatting.strikethrough}
    onPressedChange={() => toggleFormat('strikethrough')}
    size="sm"
    aria-label="Toggle strikethrough"
  >
    <Strikethrough className="h-4 w-4" />
  </Toggle>
</div>;
```

### Using toggleVariants Helper

```tsx
import { toggleVariants } from '@allsetlabs/forge/components/ui/toggle';

// Use variants in custom components
<button className={toggleVariants({ variant: 'outline', size: 'lg' })}>Custom Toggle</button>;
```

## Accessibility

- **Keyboard Navigation**: Space/Enter to toggle, Tab to move focus
- **ARIA Attributes**: `aria-pressed` reflects current state
- **Focus Visible**: Clear focus ring indicator
- **Screen Reader Support**: State changes announced to screen readers
- **Disabled State**: Proper disabled styling and prevention of interaction

## Notes

- Built on top of `@radix-ui/react-toggle` for robust accessibility
- Visual state differentiation with `data-[state=on]` attributes
- Pressed state shows accent background and foreground colors
- SVG icons automatically sized and styled via `[&_svg]` selectors
- Use `aria-label` for icon-only toggles (required for accessibility)
- Different from Checkbox - Toggle is for immediate actions, Checkbox for form data
- Can be used in toggle groups for mutually exclusive options
- Supports gap utility for spacing between icon and text
- Minimum width ensures consistent sizing for icon-only buttons
- `toggleVariants` exported for composition with other components
