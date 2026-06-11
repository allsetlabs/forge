# Checkbox

A checkbox component built on Radix UI with check indicator and accessible states.

## Import

```tsx
import { Checkbox } from '@allsetlabs/forge/components/ui/checkbox';
```

## Features

- **Check Indicator**: Animated check mark appears when checked
- **Accessibility**: Full keyboard support and ARIA attributes
- **Peer Styling**: Uses Tailwind peer utilities for label interactions
- **Focus Ring**: Visible focus indicator for keyboard navigation
- **Disabled State**: Visual disabled state with reduced opacity

## Basic Usage

```tsx
<Checkbox id="terms" />
```

## Props

| Prop            | Type                                          | Default | Description                                 |
| --------------- | --------------------------------------------- | ------- | ------------------------------------------- |
| checked         | boolean \| 'indeterminate'                    | -       | Controlled checked state                    |
| defaultChecked  | boolean                                       | -       | Default checked state for uncontrolled mode |
| onCheckedChange | (checked: boolean \| 'indeterminate') => void | -       | Callback when checked state changes         |
| disabled        | boolean                                       | false   | Disables the checkbox                       |
| required        | boolean                                       | false   | Makes the checkbox required in a form       |
| name            | string                                        | -       | Name attribute for form submission          |
| value           | string                                        | -       | Value attribute for form submission         |
| className       | string                                        | -       | Additional CSS classes                      |

> Renders as a 16x16 pixel square with rounded corners, check icon appears when checked

## Examples

### With Label

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label
    htmlFor="terms"
    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Accept terms and conditions
  </label>
</div>
```

### Controlled Checkbox

```tsx
const [checked, setChecked] = useState(false);

<div className="flex items-center space-x-2">
  <Checkbox id="newsletter" checked={checked} onCheckedChange={setChecked} />
  <label htmlFor="newsletter">Subscribe to newsletter</label>
</div>;
```

### Disabled Checkbox

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <label htmlFor="disabled" className="text-muted-foreground text-sm">
    This option is disabled
  </label>
</div>
```

### In a Form

```tsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div className="flex items-center space-x-2">
      <Checkbox id="option1" name="options" value="option1" />
      <label htmlFor="option1">Option 1</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="option2" name="options" value="option2" />
      <label htmlFor="option2">Option 2</label>
    </div>
    <button type="submit">Submit</button>
  </div>
</form>
```

### Indeterminate State

```tsx
const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

<Checkbox checked={checked} onCheckedChange={setChecked} />;
```

## Accessibility

- Has proper `role="checkbox"` and ARIA attributes
- Keyboard accessible with Tab and Space
- Press Space to toggle checked state
- Focus ring visible for keyboard navigation
- Works with associated labels via `id` and `htmlFor`
- Disabled state announced to screen readers
- Supports `aria-describedby` for additional context

## Notes

- Uses `peer` class for coordinating label styles based on checkbox state
- Check icon is from lucide-react library
- Supports checked, unchecked, and indeterminate states
- Shadow style provides subtle depth to the checkbox
- Full dark mode support with theme colors
- Primary color used for checked state background
