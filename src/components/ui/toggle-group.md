# Toggle Group

A set of two-state toggle buttons that can be toggled on or off, either as a single or multiple selection group.

## Import

```tsx
import { ToggleGroup, ToggleGroupItem } from '@allsetlabs/forge/components/ui/toggle-group';
```

## Features

- **Single or Multiple Selection**: Supports both single (`type="single"`) and multiple (`type="multiple"`) selection modes
- **Variant Inheritance**: Parent `ToggleGroup` can set variants that all child items inherit
- **Radix UI Powered**: Built on `@radix-ui/react-toggle-group` for accessibility
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Customizable Styling**: Inherits variants from toggle component (default, outline)

## Basic Usage

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```

## Props

### ToggleGroup

| Prop          | Type                                  | Default     | Description                  |
| ------------- | ------------------------------------- | ----------- | ---------------------------- |
| type          | `'single' \| 'multiple'`              | -           | Selection mode (required)    |
| value         | `string \| string[]`                  | -           | Controlled value             |
| defaultValue  | `string \| string[]`                  | -           | Default uncontrolled value   |
| onValueChange | `(value: string \| string[]) => void` | -           | Callback when value changes  |
| variant       | `'default' \| 'outline'`              | `'default'` | Visual variant for all items |
| size          | `'default' \| 'sm' \| 'lg'`           | `'default'` | Size for all items           |
| disabled      | `boolean`                             | `false`     | Disables all items           |
| className     | `string`                              | -           | Additional CSS classes       |

### ToggleGroupItem

| Prop      | Type                        | Default | Description                           |
| --------- | --------------------------- | ------- | ------------------------------------- |
| value     | `string`                    | -       | Unique value for this item (required) |
| disabled  | `boolean`                   | `false` | Disables this specific item           |
| variant   | `'default' \| 'outline'`    | -       | Override parent variant               |
| size      | `'default' \| 'sm' \| 'lg'` | -       | Override parent size                  |
| className | `string`                    | -       | Additional CSS classes                |
| children  | `React.ReactNode`           | -       | Item content                          |

## Variants

Inherits all variants from the `toggle` component:

- **default**: Solid background when active
- **outline**: Outlined border when active

Sizes:

- **default**: Standard size
- **sm**: Small size
- **lg**: Large size

## Examples

### Single Selection

```tsx
<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

### Multiple Selection

```tsx
<ToggleGroup type="multiple" defaultValue={['bold']}>
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

### Controlled with Variants

```tsx
const [alignment, setAlignment] = React.useState('left');

<ToggleGroup
  type="single"
  value={alignment}
  onValueChange={setAlignment}
  variant="outline"
  size="lg"
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>;
```

### Disabled State

```tsx
<ToggleGroup type="single" disabled>
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
</ToggleGroup>
```

## Accessibility

- Uses semantic `role="group"` for single selection
- Uses `role="group"` with `aria-multiselectable` for multiple selection
- Full keyboard navigation with arrow keys
- `aria-pressed` state on each toggle item
- Disabled items are properly announced to screen readers

## Notes

- The `ToggleGroup` uses React Context to pass `variant` and `size` to all child items
- Individual `ToggleGroupItem` components can override the parent's variant/size
- For single selection, `value` is a `string`; for multiple selection, it's `string[]`
- Items are displayed in a flex layout with 1-unit gap between them
