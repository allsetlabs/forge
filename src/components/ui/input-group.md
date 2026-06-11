# InputGroup

Composite input component combining text inputs with addons, buttons, and labels for enhanced form controls.

## Import

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from '@allsetlabs/forge/components/ui/input-group';
```

## Features

- **Unified Design**: Seamlessly combines inputs with addons, buttons, and icons
- **Flexible Alignment**: Position addons inline (left/right) or block (top/bottom)
- **Integrated Buttons**: Action buttons styled to fit within the input group
- **Icon Support**: Display icons, badges, or static text alongside inputs
- **Focus States**: Coordinated focus rings across all child elements
- **Error States**: Visual error indication via `aria-invalid` attribute
- **Textarea Support**: Works with both single-line inputs and textareas
- **Accessible**: Proper ARIA roles and keyboard navigation

## Basic Usage

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>
```

**Visual:**

> A unified input field with a search icon on the left, shared border and focus state, appearing as a single cohesive component

## Props

### InputGroup

| Prop        | Type                          | Default | Description            |
| ----------- | ----------------------------- | ------- | ---------------------- |
| `className` | `string`                      | -       | Additional CSS classes |
| `...props`  | `React.ComponentProps<'div'>` | -       | All standard div props |

### InputGroupAddon

| Prop        | Type                                                             | Default          | Description            |
| ----------- | ---------------------------------------------------------------- | ---------------- | ---------------------- |
| `align`     | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Position of the addon  |
| `className` | `string`                                                         | -                | Additional CSS classes |
| `...props`  | `React.ComponentProps<'div'>`                                    | -                | All standard div props |

### InputGroupButton

| Prop        | Type                                     | Default    | Description                |
| ----------- | ---------------------------------------- | ---------- | -------------------------- |
| `size`      | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"`     | Button size within group   |
| `variant`   | Button variants                          | `"ghost"`  | Button style variant       |
| `type`      | `"button" \| "submit" \| "reset"`        | `"button"` | Button type                |
| `className` | `string`                                 | -          | Additional CSS classes     |
| `...props`  | `React.ComponentProps<typeof Button>`    | -          | All Button component props |

### InputGroupText

| Prop        | Type                           | Default | Description             |
| ----------- | ------------------------------ | ------- | ----------------------- |
| `className` | `string`                       | -       | Additional CSS classes  |
| `...props`  | `React.ComponentProps<'span'>` | -       | All standard span props |

### InputGroupInput

| Prop        | Type                            | Default | Description                                       |
| ----------- | ------------------------------- | ------- | ------------------------------------------------- |
| `className` | `string`                        | -       | Additional CSS classes                            |
| `...props`  | `React.ComponentProps<'input'>` | -       | All standard input props including `aria-invalid` |

### InputGroupTextarea

| Prop        | Type                               | Default | Description                 |
| ----------- | ---------------------------------- | ------- | --------------------------- |
| `className` | `string`                           | -       | Additional CSS classes      |
| `...props`  | `React.ComponentProps<'textarea'>` | -       | All standard textarea props |

## Examples

### Example 1: Search Input with Icon

```tsx
import { Search } from 'lucide-react';

<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
</InputGroup>;
```

**Visual:**

> Search icon on left, input field fills remaining space, single border with unified focus ring

### Example 2: Input with Action Button

```tsx
import { Send } from 'lucide-react';

<InputGroup>
  <InputGroupInput placeholder="Enter your email..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>
      <Send className="h-4 w-4" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>;
```

**Visual:**

> Text input with send button on right edge, button styled to blend seamlessly with input border

### Example 3: Currency Input

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="number" placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

**Visual:**

> Dollar sign on left, number input in center, "USD" label on right, all within single unified border

### Example 4: Textarea with Top Label

```tsx
<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>Description</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea rows={4} placeholder="Enter description..." />
</InputGroup>
```

**Visual:**

> Label positioned at top within border, textarea below with auto height, shared focus state

### Example 5: Error State Input

```tsx
import { AlertCircle } from 'lucide-react';

<InputGroup>
  <InputGroupInput placeholder="Username" aria-invalid={true} />
  <InputGroupAddon align="inline-end">
    <AlertCircle className="text-destructive h-4 w-4" />
  </InputGroupAddon>
</InputGroup>;
```

**Visual:**

> Input with red border indicating error, alert icon in destructive color on right, coordinated error styling

### Example 6: Input with Multiple Buttons

```tsx
import { Copy, ExternalLink } from 'lucide-react';

<InputGroup>
  <InputGroupInput placeholder="API Key" readOnly value="sk_test_123..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs">
      <Copy className="h-3.5 w-3.5" />
    </InputGroupButton>
    <InputGroupButton size="icon-xs">
      <ExternalLink className="h-3.5 w-3.5" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>;
```

**Visual:**

> Read-only API key input with two compact icon buttons on right (copy and open), buttons spaced with gap-2

### Example 7: Keyboard Shortcut Indicator

```tsx
import { Search } from 'lucide-react';
import { Kbd } from '@allsetlabs/forge/components/ui/kbd';

<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>;
```

**Visual:**

> Search input with icon on left and keyboard shortcut badge on right, showing ⌘K in styled kbd element

## Alignment Options

### inline-start

```tsx
<InputGroupAddon align="inline-start">Left</InputGroupAddon>
```

**Visual:**

> Content positioned on left side of input, inline with text flow

### inline-end

```tsx
<InputGroupAddon align="inline-end">Right</InputGroupAddon>
```

**Visual:**

> Content positioned on right side of input, inline with text flow

### block-start

```tsx
<InputGroupAddon align="block-start">Top</InputGroupAddon>
```

**Visual:**

> Content positioned above input field, spans full width

### block-end

```tsx
<InputGroupAddon align="block-end">Bottom</InputGroupAddon>
```

**Visual:**

> Content positioned below input field, spans full width

## Accessibility

- Uses `role="group"` for semantic grouping
- InputGroupAddon click focuses the input field automatically
- Focus state applies to entire group with coordinated ring
- Error states use `aria-invalid` attribute
- Icons should have descriptive labels when standalone
- Maintains proper tab order through components
- Screen readers announce addons and inputs correctly

## TypeScript

```tsx
interface InputGroupProps extends React.ComponentProps<'div'> {}

interface InputGroupAddonProps extends React.ComponentProps<'div'> {
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
}

interface InputGroupButtonProps extends Omit<React.ComponentProps<typeof Button>, 'size'> {
  size?: 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
}

interface InputGroupTextProps extends React.ComponentProps<'span'> {}

interface InputGroupInputProps extends React.ComponentProps<'input'> {}

interface InputGroupTextarea extends React.ComponentProps<'textarea'> {}
```

## Notes

- InputGroup automatically adjusts height for inputs vs textareas
- Focus ring applies to entire group, not individual elements
- Addon click handlers automatically focus the input (unless clicking a button)
- Button negative margins ensure perfect alignment with borders
- SVG icons auto-sized to 16px (h-4 w-4) within addons
- Error state via `aria-invalid={true}` on input/textarea
- Supports dark mode with adjusted background opacity
- InputGroupInput and InputGroupTextarea remove default borders/shadows
- Block-aligned addons span full width with adjusted padding
- Compatible with all Input and Textarea variants
- Can nest multiple buttons/text/icons in a single addon
- Uses `data-slot` attributes for internal targeting
