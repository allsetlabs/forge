# Shimmer

Animated text shimmer effect with gradient animation for loading states or emphasis.

## Import

```tsx
import { Shimmer } from '@allsetlabs/forge/components/ai-elements/shimmer';
```

## Features

- **Motion Animation**: Uses Framer Motion for smooth gradient animation
- **Customizable**: Control duration and spread of shimmer effect
- **Semantic Elements**: Render as any HTML element (p, span, div, etc.)
- **Performance**: Memoized with component caching

## Basic Usage

```tsx
<Shimmer>Loading content...</Shimmer>
```

**Visual:**

> Text with an animated gradient shimmer moving from right to left, creating a subtle loading effect.

## Props

| Prop      | Type        | Default | Description                   |
| --------- | ----------- | ------- | ----------------------------- |
| children  | string      | ''      | Text content to display       |
| as        | ElementType | 'p'     | HTML element to render as     |
| className | string      | -       | Additional CSS classes        |
| duration  | number      | 2       | Animation duration in seconds |
| spread    | number      | 2       | Gradient spread multiplier    |

## Examples

### Example 1: Loading Text

```tsx
<Shimmer>Generating response...</Shimmer>
```

**Visual:**

> "Generating response..." with shimmer animation indicating processing.

### Example 2: Custom Element and Duration

```tsx
<Shimmer as="span" duration={1.5} className="text-lg font-semibold">
  Processing
</Shimmer>
```

**Visual:**

> Inline span with faster shimmer animation (1.5s) and bold styling.

### Example 3: Wide Spread Effect

```tsx
<Shimmer spread={4} className="text-2xl">
  AI is thinking...
</Shimmer>
```

**Visual:**

> Large text with wider shimmer gradient spread for more dramatic effect.

### Example 4: Heading Element

```tsx
<Shimmer as="h2" className="text-3xl font-bold">
  Welcome
</Shimmer>
```

**Visual:**

> H2 heading with shimmer effect, useful for hero sections or emphasis.

## Notes

- The component uses `motion.create()` with component caching for performance
- Animation loops infinitely (`repeat: Infinity`)
- Gradient uses CSS custom properties (`--bg`, `--spread`)
- Background is clipped to text for shimmer effect
- Spread is calculated dynamically based on text length
- Component is memoized to prevent unnecessary re-renders
- Works with dark mode (uses `--color-muted-foreground`)
