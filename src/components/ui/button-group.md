# ButtonGroup

Container component for grouping buttons with seamless borders, supporting horizontal and vertical orientations.

## Import

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@allsetlabs/forge/components/ui/button-group';
```

## Features

- **Flexible Orientation**: Horizontal (default) or vertical button layouts
- **Seamless Borders**: Adjacent buttons share borders for a unified appearance
- **Built-in Separators**: Visual dividers between button groups
- **Static Text Support**: Display non-interactive text alongside buttons
- **Focus Management**: Proper focus states with z-index stacking
- **Accessible**: Semantic `role="group"` for screen readers

## Basic Usage

```tsx
<ButtonGroup>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

**Visual:**

> Three buttons connected horizontally with shared borders, appearing as a single unified component with rounded corners on the outer edges only

## Props

### ButtonGroup

| Prop          | Type                          | Default        | Description                   |
| ------------- | ----------------------------- | -------------- | ----------------------------- |
| `orientation` | `"horizontal" \| "vertical"`  | `"horizontal"` | Layout direction of the group |
| `className`   | `string`                      | -              | Additional CSS classes        |
| `...props`    | `React.ComponentProps<'div'>` | -              | All standard div props        |

### ButtonGroupSeparator

| Prop          | Type                                     | Default      | Description                   |
| ------------- | ---------------------------------------- | ------------ | ----------------------------- |
| `orientation` | `"horizontal" \| "vertical"`             | `"vertical"` | Separator orientation         |
| `className`   | `string`                                 | -            | Additional CSS classes        |
| `...props`    | `React.ComponentProps<typeof Separator>` | -            | All Separator component props |

### ButtonGroupText

| Prop        | Type                          | Default | Description                           |
| ----------- | ----------------------------- | ------- | ------------------------------------- |
| `asChild`   | `boolean`                     | `false` | Render as child component (uses Slot) |
| `className` | `string`                      | -       | Additional CSS classes                |
| `...props`  | `React.ComponentProps<'div'>` | -       | All standard div props                |

## Examples

### Example 1: Horizontal Button Group

```tsx
<ButtonGroup orientation="horizontal">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

**Visual:**

> Three outline buttons arranged horizontally, sharing borders, with rounded corners only on the leftmost and rightmost edges

### Example 2: Vertical Button Group

```tsx
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>
```

**Visual:**

> Three outline buttons stacked vertically, sharing horizontal borders, with rounded corners only on top and bottom

### Example 3: Button Group with Separator

```tsx
<ButtonGroup>
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Cut</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Paste</Button>
</ButtonGroup>
```

**Visual:**

> Three buttons with a visible vertical line separator between "Cut" and "Paste", creating logical groupings within the button group

### Example 4: Button Group with Static Text

```tsx
<ButtonGroup>
  <ButtonGroupText>
    <span>Showing: </span>
  </ButtonGroupText>
  <Button variant="outline">All</Button>
  <Button variant="outline">Active</Button>
  <Button variant="outline">Archived</Button>
</ButtonGroup>
```

**Visual:**

> A text label "Showing:" followed by three selectable buttons, all unified in a single bordered group with consistent styling

### Example 5: Button Group with Icons

```tsx
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

<ButtonGroup>
  <Button variant="outline" size="icon">
    <AlignLeft className="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <AlignCenter className="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon">
    <AlignRight className="h-4 w-4" />
  </Button>
</ButtonGroup>;
```

**Visual:**

> Three square icon buttons (text alignment controls) seamlessly connected, commonly used for toolbar actions

## Accessibility

- Uses `role="group"` on container for semantic grouping
- Maintains proper focus order through button sequence
- Focus visible states use z-index to appear above adjacent buttons
- Works with keyboard navigation (Tab, Shift+Tab)
- Compatible with screen readers announcing button groups

## TypeScript

```tsx
interface ButtonGroupProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {
  orientation?: 'horizontal' | 'vertical';
}

interface ButtonGroupSeparatorProps extends React.ComponentProps<typeof Separator> {
  orientation?: 'vertical' | 'horizontal';
}

interface ButtonGroupTextProps extends React.ComponentProps<'div'> {
  asChild?: boolean;
}
```

## Notes

- Adjacent buttons automatically have shared borders (left/right for horizontal, top/bottom for vertical)
- Only the first and last buttons have rounded corners on outer edges
- Focus states use `z-10` to ensure focused button border appears above neighbors
- Works seamlessly with any Button variant (outline, ghost, default, etc.)
- Separator orientation defaults to `vertical` for horizontal groups
- ButtonGroupText can use `asChild` for polymorphic rendering
- Supports nested ButtonGroup components for complex layouts
- Automatically handles select elements and inputs when placed inside
