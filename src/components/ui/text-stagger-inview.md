# TextStaggerInview

Animated text component that reveals words and characters with staggered timing when scrolling into view, powered by Framer Motion.

## Import

```tsx
import {
  TextStaggerInview,
  WordStagger,
  type TextStaggerInviewProps,
} from '@allsetlabs/forge/components/ui/text-stagger-inview';
```

## Features

- **Scroll-Triggered Animation**: Animates when element enters viewport
- **Staggered Timing**: Sequential word and character animations
- **8 Animation Variants**: Left, right, top, bottom, scale, blur, and default
- **Customizable Timing**: Control stagger delay and starting position
- **Polymorphic Rendering**: Render as any HTML element (span, h1, p, etc.)
- **Viewport Options**: Configure when animation triggers
- **Accessible**: Preserves text content for screen readers
- **Smooth Transitions**: Configurable easing functions

## Basic Usage

```tsx
<TextStaggerInview>Welcome to our website</TextStaggerInview>
```

**Visual:**

> Text "Welcome to our website" fades in word by word when scrolling into view, with each character within a word animating sequentially

## Props

| Prop           | Type                                                                   | Default                        | Description                                  |
| -------------- | ---------------------------------------------------------------------- | ------------------------------ | -------------------------------------------- |
| `animation`    | `"left" \| "right" \| "top" \| "bottom" \| "z" \| "blur" \| "default"` | `"default"`                    | Animation direction/style                    |
| `staggerValue` | `number`                                                               | `0.02`                         | Delay between character animations (seconds) |
| `staggerStart` | `"first" \| "last" \| "center" \| number`                              | `"first"`                      | Starting position for stagger effect         |
| `as`           | `React.ElementType`                                                    | `"span"`                       | HTML element to render as                    |
| `transition`   | Motion transition object                                               | `{ ease: "easeOut" }`          | Framer Motion transition config              |
| `viewport`     | `{ once?: boolean; amount?: number }`                                  | `{ once: true, amount: 0.25 }` | Viewport intersection options                |
| `className`    | `string`                                                               | -                              | Additional CSS classes                       |
| `children`     | `string`                                                               | Required                       | Text content to animate                      |
| `...props`     | HTMLMotionProps                                                        | -                              | All Framer Motion props                      |

## Animation Variants

### Left

```tsx
<TextStaggerInview animation="left">Slide from left</TextStaggerInview>
```

**Visual:**

> Characters slide in from the left (x: -100% to 0), fading in simultaneously

### Right

```tsx
<TextStaggerInview animation="right">Slide from right</TextStaggerInview>
```

**Visual:**

> Characters slide in from the right (x: 100% to 0), fading in simultaneously

### Top

```tsx
<TextStaggerInview animation="top">Drop from top</TextStaggerInview>
```

**Visual:**

> Characters drop from above (y: -100% to 0), fading in simultaneously

### Bottom

```tsx
<TextStaggerInview animation="bottom">Rise from bottom</TextStaggerInview>
```

**Visual:**

> Characters rise from below (y: 100% to 0), fading in simultaneously

### Z (Scale)

```tsx
<TextStaggerInview animation="z">Pop in</TextStaggerInview>
```

**Visual:**

> Characters scale from 0 to full size (scale: 0 to 1), fading in with a pop effect

### Blur

```tsx
<TextStaggerInview animation="blur">Blur reveal</TextStaggerInview>
```

**Visual:**

> Characters transition from blurred (blur(10px)) to sharp (blur(0px)), fading in smoothly

### Default

```tsx
<TextStaggerInview animation="default">Simple fade</TextStaggerInview>
```

**Visual:**

> Characters fade in from transparent to opaque with no movement

## Examples

### Example 1: Hero Heading

```tsx
<TextStaggerInview as="h1" animation="bottom" staggerValue={0.03} className="text-6xl font-bold">
  Building the Future
</TextStaggerInview>
```

**Visual:**

> Large bold heading with words rising from bottom, slightly slower stagger for dramatic effect

### Example 2: Subtitle with Blur Effect

```tsx
<TextStaggerInview
  as="p"
  animation="blur"
  staggerValue={0.015}
  className="text-muted-foreground text-xl"
>
  Innovative solutions for modern challenges
</TextStaggerInview>
```

**Visual:**

> Paragraph text coming into focus with blur-to-clear effect, faster stagger for smooth reading flow

### Example 3: Center-Out Animation

```tsx
<TextStaggerInview animation="z" staggerStart="center" staggerValue={0.025} className="text-4xl">
  Discover More
</TextStaggerInview>
```

**Visual:**

> Text popping in from center outward, creating an attention-grabbing effect perfect for CTAs

### Example 4: Custom Timing and Easing

```tsx
<TextStaggerInview
  animation="left"
  staggerValue={0.05}
  transition={{
    ease: 'easeInOut',
    duration: 0.8,
  }}
  className="text-2xl"
>
  Smooth Animations
</TextStaggerInview>
```

**Visual:**

> Slower, more deliberate animation with custom easing curve for refined motion

### Example 5: Repeated Trigger

```tsx
<TextStaggerInview
  animation="bottom"
  viewport={{
    once: false,
    amount: 0.5,
  }}
  className="text-3xl"
>
  Scroll to Animate
</TextStaggerInview>
```

**Visual:**

> Animation triggers every time element enters viewport (not just once), requires 50% visibility

### Example 6: Last-to-First Stagger

```tsx
<TextStaggerInview animation="top" staggerStart="last" className="text-2xl font-medium">
  Reverse Order Effect
</TextStaggerInview>
```

**Visual:**

> Characters animate from right to left (last word first), creating a reverse cascade effect

## Stagger Start Options

### first (Default)

```tsx
<TextStaggerInview staggerStart="first">Animate left to right</TextStaggerInview>
```

**Visual:**

> First character starts immediately, subsequent characters follow with delay

### last

```tsx
<TextStaggerInview staggerStart="last">Animate right to left</TextStaggerInview>
```

**Visual:**

> Last character starts immediately, animation proceeds backward

### center

```tsx
<TextStaggerInview staggerStart="center">Animate from center</TextStaggerInview>
```

**Visual:**

> Middle characters start first, animation spreads outward to edges

### Custom Number

```tsx
<TextStaggerInview staggerStart={5}>Start from 6th character</TextStaggerInview>
```

**Visual:**

> Animation begins at specified index (zero-based), spreads from that point

## Viewport Options

### Once (Default)

```tsx
<TextStaggerInview viewport={{ once: true }}>Animate once</TextStaggerInview>
```

**Visual:**

> Animation plays only on first scroll into view, then stays visible

### Repeating

```tsx
<TextStaggerInview viewport={{ once: false }}>Animate repeatedly</TextStaggerInview>
```

**Visual:**

> Animation triggers every time element enters viewport

### Amount Threshold

```tsx
<TextStaggerInview viewport={{ amount: 0.75 }}>75% visible trigger</TextStaggerInview>
```

**Visual:**

> Animation starts when 75% of element is visible (default: 25%)

## Accessibility

- Preserves full text content for screen readers
- No aria-hidden elements that hide text
- Maintains semantic HTML structure
- Works with keyboard navigation
- Does not interfere with text selection
- Respects reduced motion preferences (consider adding prefers-reduced-motion handling)

## TypeScript

```tsx
type AnimationT = 'left' | 'right' | 'top' | 'bottom' | 'z' | 'blur' | 'default';

interface TextStaggerInviewProps extends HTMLMotionProps<'span'> {
  staggerValue?: number;
  staggerStart?: 'first' | 'last' | 'center' | number;
  animation?: AnimationT;
  as?: React.ElementType;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  transition?: {
    ease?: string | number[];
    duration?: number;
    [key: string]: any;
  };
}

interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
  animation?: AnimationT;
}
```

## Notes

- Text must be a string (no JSX children)
- Splits text by spaces to create word boundaries
- Each word further splits into individual characters
- Characters wrapped in `inline-block` spans for animation
- Words wrapped in `text-nowrap` to prevent mid-word breaks
- Uses Framer Motion's `whileInView` for scroll-triggered animations
- Default stagger of 0.02s creates natural reading rhythm
- Viewport `amount: 0.25` means animation starts when 25% visible
- `motion.create()` enables polymorphic rendering with motion props
- Preserves spaces between words in final render
- Animation variants use `hidden` and `visible` states
- Can be nested within other motion components
- Performance: Animates many elements, use sparingly on long text
- Consider adding `prefers-reduced-motion` media query support
- Compatible with all Framer Motion transition props
