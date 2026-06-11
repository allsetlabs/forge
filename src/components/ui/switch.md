# Switch

A toggle switch component built on Radix UI with smooth animations and accessible states.

## Import

```tsx
import { Switch } from '@allsetlabs/forge/components/ui/switch';
```

## Features

- **Smooth Animation**: Thumb slides smoothly between positions with transition
- **Accessibility**: Full keyboard support and proper ARIA attributes
- **Focus Ring**: Visible focus indicator with ring offset
- **Disabled State**: Visual disabled state with reduced opacity
- **Compact Design**: Small form factor (36x20 pixels) suitable for tight layouts

## Basic Usage

```tsx
<Switch id="airplane-mode" />
```

## Props

| Prop            | Type                       | Default | Description                                 |
| --------------- | -------------------------- | ------- | ------------------------------------------- |
| checked         | boolean                    | -       | Controlled checked state                    |
| defaultChecked  | boolean                    | -       | Default checked state for uncontrolled mode |
| onCheckedChange | (checked: boolean) => void | -       | Callback when checked state changes         |
| disabled        | boolean                    | false   | Disables the switch                         |
| required        | boolean                    | false   | Makes the switch required in a form         |
| name            | string                     | -       | Name attribute for form submission          |
| value           | string                     | 'on'    | Value attribute for form submission         |
| className       | string                     | -       | Additional CSS classes                      |

> Renders as a rounded pill shape with a circular thumb that slides horizontally when toggled

## Examples

### With Label

```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode" className="text-sm font-medium">
    Airplane Mode
  </label>
</div>
```

### Controlled Switch

```tsx
const [enabled, setEnabled] = useState(false);

<div className="flex items-center space-x-2">
  <Switch id="notifications" checked={enabled} onCheckedChange={setEnabled} />
  <label htmlFor="notifications">Enable notifications {enabled ? '(On)' : '(Off)'}</label>
</div>;
```

### Disabled Switch

```tsx
<div className="flex items-center space-x-2">
  <Switch id="premium-feature" disabled />
  <label htmlFor="premium-feature" className="text-muted-foreground text-sm">
    Premium Feature (Upgrade Required)
  </label>
</div>
```

### In Settings Form

```tsx
<form className="space-y-4">
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <label htmlFor="marketing" className="text-sm font-medium">
        Marketing Emails
      </label>
      <p className="text-muted-foreground text-sm">
        Receive emails about new products and features
      </p>
    </div>
    <Switch id="marketing" />
  </div>

  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <label htmlFor="security" className="text-sm font-medium">
        Security Alerts
      </label>
      <p className="text-muted-foreground text-sm">Receive emails about your account security</p>
    </div>
    <Switch id="security" defaultChecked />
  </div>
</form>
```

### With Callback

```tsx
<Switch
  onCheckedChange={(checked) => {
    console.log('Switch toggled:', checked);
    // Perform action, e.g., update user preferences
  }}
/>
```

## Accessibility

- Has proper `role="switch"` and ARIA attributes
- Keyboard accessible with Tab and Space
- Press Space or Enter to toggle state
- Focus ring visible for keyboard navigation with offset
- Works with associated labels via `id` and `htmlFor`
- Disabled state announced to screen readers
- Current state (checked/unchecked) announced to screen readers

## Notes

- Thumb uses `pointer-events-none` to prevent direct interaction
- Background color changes based on state: primary when checked, input when unchecked
- Thumb position controlled by `data-[state]` attribute with `translate-x-4` when checked
- Border width of 2px provides clear visual boundary
- Shadow on both root and thumb creates depth
- Full dark mode support built-in with theme colors
- Smooth transition on all color and transform changes
