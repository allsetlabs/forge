# Spinner

A loading indicator with animated rotation.

## Import

```tsx
import { Spinner, spinnerVariants } from '@allsetlabs/forge/components/ui/spinner';
```

## Features

- **Size Variants**: Four size options (sm, default, lg, xl)
- **Animated**: Smooth continuous rotation with Tailwind's `animate-spin`
- **Accessible Color**: Uses `text-muted-foreground` for subtle appearance
- **SVG-based**: Scalable vector graphic for crisp rendering at any size
- **Customizable**: Supports all standard SVG attributes

## Basic Usage

```tsx
<Spinner />
```

## Props

| Prop      | Type                                | Default     | Description            |
| --------- | ----------------------------------- | ----------- | ---------------------- |
| size      | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Spinner size           |
| className | `string`                            | -           | Additional CSS classes |

Extends all `SVGAttributes<SVGSVGElement>` props (e.g., `stroke`, `strokeWidth`, `aria-label`).

## Variants

Defined via `spinnerVariants` CVA function:

| Variant | Size           |
| ------- | -------------- |
| sm      | h-3 w-3 (12px) |
| default | h-4 w-4 (16px) |
| lg      | h-6 w-6 (24px) |
| xl      | h-8 w-8 (32px) |

## Examples

### Default Spinner

```tsx
<Spinner />
```

> A 16px spinner with continuous rotation

### Small Spinner

```tsx
<Spinner size="sm" />
```

> A 12px spinner, useful for inline loading states

### Large Spinner

```tsx
<Spinner size="lg" />
```

> A 24px spinner for prominent loading states

### Extra Large Spinner

```tsx
<Spinner size="xl" />
```

> A 32px spinner for full-page loading states

### Custom Color

```tsx
<Spinner className="text-primary-500" />
```

> Override default `text-muted-foreground` with custom color

### With Label

```tsx
<div className="flex items-center gap-2">
  <Spinner />
  <span>Loading...</span>
</div>
```

> Combine with text for clear loading indication

### Centered Full Page

```tsx
<div className="flex min-h-screen items-center justify-center">
  <Spinner size="xl" />
</div>
```

> Full-page loading state

### In Button

```tsx
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>
```

> Loading state in button component

### Custom Stroke Width

```tsx
<Spinner strokeWidth={3} size="lg" />
```

> Thicker stroke for more prominent appearance

## Accessibility

- Uses SVG with `viewBox="0 0 24 24"` for proper scaling
- Inherits color from `currentColor` via `stroke="currentColor"`
- Add `aria-label` for screen readers when used without text:

```tsx
<Spinner aria-label="Loading content" />
```

## Notes

- Animation uses Tailwind's `animate-spin` class for continuous rotation
- Default color is `text-muted-foreground` for subtle appearance
- SVG path creates a partial circle (270° arc) for spinning effect
- Stroke attributes: `strokeWidth="2"`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- The `spinnerVariants` function can be used independently for custom spinner implementations
- Always provide context (text label or aria-label) when spinner is the only loading indicator
