# Alert

A flexible alert component for displaying important messages with optional variants and icon support.

## Import

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
} from '@allsetlabs/forge/components/ui/alert';
```

## Features

- **Multiple Variants**: Default and destructive styles using CVA
- **Icon Support**: Automatic spacing for icons with optimal positioning
- **Flexible Layout**: Title and description sub-components for structure
- **Accessible**: Proper `role="alert"` for screen readers
- **Customizable**: Export variants for custom styling

## Basic Usage

```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

## Props

### Alert

| Prop      | Type                       | Default   | Description                                               |
| --------- | -------------------------- | --------- | --------------------------------------------------------- |
| variant   | 'default' \| 'destructive' | 'default' | Visual style variant                                      |
| className | string                     | -         | Additional CSS classes                                    |
| children  | ReactNode                  | -         | Alert content (typically AlertTitle and AlertDescription) |

### AlertTitle

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| className | string    | -       | Additional CSS classes |
| children  | ReactNode | -       | Title text content     |

> Renders as an `<h5>` with medium font weight and tight line height

### AlertDescription

| Prop      | Type      | Default | Description              |
| --------- | --------- | ------- | ------------------------ |
| className | string    | -       | Additional CSS classes   |
| children  | ReactNode | -       | Description text content |

> Renders as a `<div>` with relaxed paragraph spacing

## Variants

### Default

```tsx
<Alert variant="default">
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>This is a default alert with standard styling.</AlertDescription>
</Alert>
```

> Standard appearance with neutral colors from theme

### Destructive

```tsx
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>
```

> Red-themed appearance for errors and warnings

## Examples

### With Icon

```tsx
import { Terminal } from 'lucide-react';

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>;
```

### Destructive with Icon

```tsx
import { AlertCircle } from 'lucide-react';

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>;
```

### Title Only

```tsx
<Alert>
  <AlertTitle>Quick notification</AlertTitle>
</Alert>
```

### Description Only

```tsx
<Alert>
  <AlertDescription>This is a simple alert with just a description.</AlertDescription>
</Alert>
```

### With Custom Styling

```tsx
<Alert className="border-primary">
  <AlertTitle>Custom Styled Alert</AlertTitle>
  <AlertDescription>This alert has a custom border color.</AlertDescription>
</Alert>
```

### Info Alert with Icon

```tsx
import { Info } from 'lucide-react';

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Pro Tip</AlertTitle>
  <AlertDescription>You can use keyboard shortcuts to navigate faster.</AlertDescription>
</Alert>;
```

### Success Alert Pattern

```tsx
import { CheckCircle2 } from 'lucide-react';

<Alert className="border-green-500 text-green-900 dark:text-green-400">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>;
```

### Warning Alert Pattern

```tsx
import { AlertTriangle } from 'lucide-react';

<Alert className="border-yellow-500 text-yellow-900 dark:text-yellow-400">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This action cannot be undone. Please proceed with caution.</AlertDescription>
</Alert>;
```

### Alert List

```tsx
<div className="space-y-4">
  <Alert>
    <AlertTitle>Update Available</AlertTitle>
    <AlertDescription>A new version is ready to install.</AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertTitle>Action Required</AlertTitle>
    <AlertDescription>Please verify your email address.</AlertDescription>
  </Alert>
</div>
```

## Accessibility

- Has `role="alert"` to announce content to screen readers
- Important messages are automatically announced when rendered
- Proper semantic structure with heading and description
- Icons are positioned for visual users but don't interfere with screen readers
- Color is not the only indicator (uses icons and text)

## Notes

- Icon positioning is automatic with special CSS selectors:
  - `[&>svg]` styles apply to direct SVG children
  - `[&>svg~*]` adds left padding to content after icons
  - `[&>svg+div]` adjusts vertical alignment of first div after icon
- AlertTitle uses `h5` for semantic structure but styled as paragraph
- AlertDescription uses `div` to allow nested elements like links or paragraphs
- `alertVariants` export allows creating custom alert variants with CVA
- Border uses theme color `border-border` for consistency
- Destructive variant uses `destructive` theme color with 50% opacity border
- Full dark mode support built-in
- Rounded corners with `rounded-lg`
- Padding of 12px (px-4 py-3) provides comfortable spacing
