# FlipClock

Animated flip-style clock with real-time display or countdown functionality, featuring smooth 3D flip transitions.

## Import

```tsx
import FlipClock from '@allsetlabs/forge/components/ui/flip-clock';
```

## Features

- **Real-Time Clock**: Display current time with live updates
- **Countdown Timer**: Count down to a specific target date
- **Smooth Animations**: 3D flip transitions on digit changes
- **Multiple Sizes**: 4 size variants from compact to extra large
- **Color Variants**: 5 style variants matching your design system
- **Optional Days Display**: Show days for countdowns (auto, always, never)
- **Accessible**: ARIA live regions for screen reader updates
- **Performance Optimized**: Updates only when digits change

## Basic Usage

```tsx
<FlipClock />
```

**Visual:**

> A digital flip clock showing current time in HH:MM:SS format, with smooth 3D flip animation when digits change

## Props

| Prop         | Type                                                                | Default     | Description                                            |
| ------------ | ------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `countdown`  | `boolean`                                                           | `false`     | Enable countdown mode                                  |
| `targetDate` | `Date`                                                              | -           | Target date for countdown (required if countdown=true) |
| `showDays`   | `"auto" \| "always" \| "never"`                                     | `"auto"`    | Control days display in countdown mode                 |
| `size`       | `"sm" \| "md" \| "lg" \| "xl"`                                      | `"md"`      | Size of the clock digits                               |
| `variant`    | `"default" \| "secondary" \| "destructive" \| "outline" \| "muted"` | `"default"` | Color variant                                          |
| `className`  | `string`                                                            | -           | Additional CSS classes                                 |
| `...props`   | `React.HTMLAttributes<HTMLDivElement>`                              | -           | All standard div props                                 |

## Examples

### Example 1: Real-Time Clock

```tsx
<FlipClock size="lg" variant="default" />
```

**Visual:**

> Large digital clock displaying current time (e.g., 14:32:45) with primary color scheme, updates every second with flip animation

### Example 2: Countdown Timer

```tsx
const targetDate = new Date('2024-12-31T23:59:59');

<FlipClock countdown targetDate={targetDate} />;
```

**Visual:**

> Countdown showing days:hours:minutes:seconds until target date, days displayed automatically when > 0

### Example 3: Countdown with Always Show Days

```tsx
const launchDate = new Date('2024-06-15T00:00:00');

<FlipClock countdown targetDate={launchDate} showDays="always" size="xl" />;
```

**Visual:**

> Extra large countdown timer with days always visible (e.g., 045:12:34:56), perfect for product launch pages

### Example 4: Compact Clock for Sidebar

```tsx
<FlipClock size="sm" variant="secondary" />
```

**Visual:**

> Small clock (40px digits) with secondary color scheme, suitable for compact UI areas like dashboards

### Example 5: Destructive Countdown Alert

```tsx
const deadlineDate = new Date(Date.now() + 3600000); // 1 hour from now

<FlipClock countdown targetDate={deadlineDate} variant="destructive" showDays="never" />;
```

**Visual:**

> Red-themed countdown (HH:MM:SS only) emphasizing urgency, useful for deadline warnings or flash sales

## Sizes

### Small (sm)

```tsx
<FlipClock size="sm" />
```

**Visual:**

> Digit size: 40px width × 56px height, text: 3xl, spacing: 4px. Compact for tight spaces.

### Medium (md)

```tsx
<FlipClock size="md" />
```

**Visual:**

> Digit size: 56px width × 80px height, text: 5xl, spacing: 8px. Standard size for most use cases.

### Large (lg)

```tsx
<FlipClock size="lg" />
```

**Visual:**

> Digit size: 68px width × 96px height, text: 6xl, spacing: 8px. Prominent display for hero sections.

### Extra Large (xl)

```tsx
<FlipClock size="xl" />
```

**Visual:**

> Digit size: 88px width × 128px height, text: 8xl, spacing: 12px. Maximum impact for landing pages.

## Variants

### Default

```tsx
<FlipClock variant="default" />
```

**Visual:**

> Primary colored background with primary-foreground text, high contrast for readability

### Secondary

```tsx
<FlipClock variant="secondary" />
```

**Visual:**

> Secondary background with secondary-foreground text, subtle appearance for less emphasis

### Destructive

```tsx
<FlipClock variant="destructive" />
```

**Visual:**

> Destructive colored background, emphasizes urgency or critical countdowns

### Outline

```tsx
<FlipClock variant="outline" />
```

**Visual:**

> Bordered digits with background color, clean look that works on colored surfaces

### Muted

```tsx
<FlipClock variant="muted" />
```

**Visual:**

> Muted background with muted-foreground text, low-key appearance for ambient displays

## Accessibility

- Uses `aria-live="polite"` for screen reader updates
- Includes `sr-only` text with current time for assistive technologies
- Updates announced naturally without interrupting user flow
- High contrast ratios for all color variants
- No flashing or strobing effects that could trigger seizures

## TypeScript

```tsx
interface FlipClockProps extends HTMLAttributes<HTMLDivElement> {
  countdown?: boolean;
  targetDate?: Date;
  showDays?: 'auto' | 'always' | 'never';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'muted';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

## Notes

- Updates every 250ms to catch second changes immediately (optimized for performance)
- Only re-renders when digits actually change, not on every interval tick
- Countdown stops at zero (doesn't go negative)
- Days displayed with 3 digits (001, 045, 999)
- Hours, minutes, seconds padded to 2 digits (01, 23, 59)
- Uses CSS 3D transforms with backface-hidden for smooth flips
- Animation duration: 0.6s (0.3s top flip + 0.3s bottom flip)
- Center divider line creates realistic flip effect
- Font: Monospaced for consistent digit width
- Uses styled-jsx for injected keyframe animations (Next.js compatible)
- Countdown mode requires `targetDate` prop
- Real-time clock mode ignores `targetDate` and `showDays` props
- Performance: 250ms check interval prevents excessive re-renders
