# Radio Group

A set of mutually exclusive radio buttons for selecting a single option from multiple choices.

## Import

```tsx
import { RadioGroup, RadioGroupItem } from '@allsetlabs/forge/components/ui/radio-group';
```

## Features

- **Single Selection**: Only one option can be selected at a time
- **Keyboard Navigation**: Arrow keys to navigate, Space to select
- **Visual Indicator**: Filled circle shows selected state
- **Accessible**: Built on Radix UI with proper ARIA attributes
- **Form Integration**: Works with form libraries and native forms

## Basic Usage

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
</RadioGroup>
```

## Props

### RadioGroup

Based on `@radix-ui/react-radio-group` Root component:

| Prop          | Type     | Default | Description                           |
| ------------- | -------- | ------- | ------------------------------------- |
| value         | string   | -       | Controlled selected value             |
| onValueChange | function | -       | Callback when selection changes       |
| defaultValue  | string   | -       | Initial selected value (uncontrolled) |
| disabled      | boolean  | false   | Disable all radio items               |
| required      | boolean  | false   | Whether selection is required         |
| name          | string   | -       | Form field name                       |
| className     | string   | -       | Additional CSS classes                |

### RadioGroupItem

| Prop      | Type    | Default | Description                  |
| --------- | ------- | ------- | ---------------------------- |
| value     | string  | -       | Unique value for this option |
| id        | string  | -       | ID for label association     |
| disabled  | boolean | false   | Disable this specific option |
| className | string  | -       | Additional CSS classes       |

> Items are laid out in a grid with `gap-2` by default.

## Examples

### Basic Radio Group

```tsx
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <label htmlFor="r1">Default</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <label htmlFor="r2">Comfortable</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <label htmlFor="r3">Compact</label>
  </div>
</RadioGroup>
```

### Controlled Radio Group

```tsx
const [size, setSize] = useState('medium');

<RadioGroup value={size} onValueChange={setSize}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="small" id="small" />
    <label htmlFor="small">Small</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" />
    <label htmlFor="medium">Medium</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="large" id="large" />
    <label htmlFor="large">Large</label>
  </div>
</RadioGroup>;
```

### Radio Group with Descriptions

```tsx
<RadioGroup defaultValue="card">
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="card" className="mt-1" />
    <div>
      <label htmlFor="card" className="font-medium">
        Credit Card
      </label>
      <p className="text-muted-foreground text-sm">Pay with your credit or debit card</p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
    <div>
      <label htmlFor="paypal" className="font-medium">
        PayPal
      </label>
      <p className="text-muted-foreground text-sm">Pay securely with your PayPal account</p>
    </div>
  </div>
</RadioGroup>
```

### Disabled Options

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="opt1" />
    <label htmlFor="opt1">Available Option</label>
  </div>
  <div className="flex items-center space-x-2 opacity-50">
    <RadioGroupItem value="option2" id="opt2" disabled />
    <label htmlFor="opt2">Disabled Option</label>
  </div>
</RadioGroup>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <RadioGroup name="subscription" defaultValue="free" required>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="free" id="free" />
      <label htmlFor="free">Free</label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="pro" id="pro" />
      <label htmlFor="pro">Pro - $9/month</label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="enterprise" id="enterprise" />
      <label htmlFor="enterprise">Enterprise</label>
    </div>
  </RadioGroup>
  <button type="submit">Continue</button>
</form>
```

### Horizontal Layout

```tsx
<RadioGroup defaultValue="yes" className="flex flex-row space-x-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="yes" id="yes" />
    <label htmlFor="yes">Yes</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="no" id="no" />
    <label htmlFor="no">No</label>
  </div>
</RadioGroup>
```

## Accessibility

- Implements WAI-ARIA radio group pattern
- Arrow keys navigate between options (Up/Down or Left/Right)
- Space key selects focused option
- Tab key moves focus to/from the group
- Only one radio item is tabbable at a time (roving tabindex)
- Labels associated with radio items via `htmlFor`/`id`
- Disabled state prevents interaction and is announced

## Notes

- Radio items are `h-4 w-4` (16px) by default
- Indicator (filled circle) is slightly smaller (`h-3.5 w-3.5`)
- Items use `border-primary` and `text-primary` colors
- Indicator is filled when selected (`fill-primary`)
- Focus ring appears on keyboard focus (`focus-visible:ring-1`)
- Disabled items have reduced opacity and no cursor
- Default grid layout with `gap-2` (0.5rem)
- Always provide labels for accessibility
- Each item needs unique `value` and `id` props
- Indicator icon is from `lucide-react` (Circle component)
