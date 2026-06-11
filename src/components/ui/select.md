# Select

A customizable select dropdown component built on Radix UI with keyboard navigation and accessibility features.

## Import

```tsx
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@allsetlabs/forge/components/ui/select';
```

## Features

- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Space, and Escape
- **Accessibility**: ARIA compliant with proper roles and labels
- **Scroll Indicators**: Visual scroll buttons for long lists
- **Custom Styling**: Fully customizable with Tailwind classes
- **Portal Rendering**: Content rendered in a portal to avoid z-index issues
- **Animated**: Smooth fade and zoom animations on open/close
- **Item Indicator**: Check icon shows on selected item

## Basic Usage

```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

## Props

### Select (Root)

| Prop          | Type                    | Default | Description                         |
| ------------- | ----------------------- | ------- | ----------------------------------- |
| value         | string                  | -       | Controlled value                    |
| defaultValue  | string                  | -       | Default value for uncontrolled mode |
| onValueChange | (value: string) => void | -       | Callback when value changes         |
| open          | boolean                 | -       | Controlled open state               |
| defaultOpen   | boolean                 | -       | Default open state                  |
| onOpenChange  | (open: boolean) => void | -       | Callback when open state changes    |
| disabled      | boolean                 | false   | Disables the select                 |

### SelectTrigger

| Prop      | Type      | Default | Description                           |
| --------- | --------- | ------- | ------------------------------------- |
| className | string    | -       | Additional CSS classes                |
| children  | ReactNode | -       | Trigger content (usually SelectValue) |

> Displays as a rounded button with border, includes a chevron down icon on the right

### SelectContent

| Prop      | Type                       | Default  | Description                  |
| --------- | -------------------------- | -------- | ---------------------------- |
| className | string                     | -        | Additional CSS classes       |
| position  | 'popper' \| 'item-aligned' | 'popper' | Content positioning strategy |
| children  | ReactNode                  | -        | Select items and groups      |

> Rendered in a portal with max height of 96 (384px), includes scroll buttons automatically

### SelectItem

| Prop      | Type      | Default  | Description            |
| --------- | --------- | -------- | ---------------------- |
| value     | string    | required | The value of the item  |
| disabled  | boolean   | false    | Disables the item      |
| className | string    | -        | Additional CSS classes |
| children  | ReactNode | -        | Item content           |

> Shows check icon when selected, supports keyboard focus with accent background

### SelectLabel

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| className | string    | -       | Additional CSS classes |
| children  | ReactNode | -       | Label content          |

> Used within SelectGroup to label groups of items

### SelectSeparator

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

> Renders a horizontal line to separate items

## Examples

### With Groups and Labels

```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Controlled Select

```tsx
const [value, setValue] = useState('');

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>;
```

### With Disabled Items

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="disabled" disabled>
      Disabled (Premium Only)
    </SelectItem>
  </SelectContent>
</Select>
```

## Accessibility

- Root has `role="combobox"` and proper ARIA attributes
- Trigger is keyboard focusable with Tab
- Press Space or Enter to open dropdown
- Use Arrow keys to navigate items
- Press Enter to select focused item
- Press Escape to close dropdown
- Selected item is announced to screen readers
- Disabled items are marked with `aria-disabled`

## Notes

- Content is rendered in a portal to avoid parent overflow issues
- Scroll buttons automatically appear when content exceeds max height
- Position prop controls whether content aligns with trigger or selected item
- Uses custom colors from theme (border-input, bg-popover, etc.)
- Full dark mode support built-in
- Selected item shows check icon indicator
