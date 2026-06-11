# Timeline

Flexible timeline component with horizontal or vertical layouts, alternating or single-sided positioning, and customizable styling.

## Import

```tsx
import Timeline, {
  TimelineItem,
  TimelineItemDate,
  TimelineItemTitle,
  TimelineItemDescription,
  type TimelineProps,
  type TimelineItemProps,
} from '@allsetlabs/forge/components/ui/timeline';
```

## Features

- **Dual Orientation**: Horizontal or vertical timeline layouts
- **Alternating Mode**: Items alternate between sides of the timeline
- **Single-Sided Mode**: All items on one side (top/left or bottom/right)
- **Card-Based Design**: Optional card styling for timeline items
- **Color Variants**: 4 style variants (default, secondary, destructive, outline)
- **Hollow Dots**: Optional hollow center dots for visual variety
- **Responsive Spacing**: Customizable item spacing and widths
- **Accessible**: ARIA roles and semantic HTML structure
- **Date Formatting**: Built-in date formatting with Intl API

## Basic Usage

```tsx
<Timeline>
  <TimelineItem>
    <TimelineItemDate>2024-01-15</TimelineItemDate>
    <TimelineItemTitle>Project Launch</TimelineItemTitle>
    <TimelineItemDescription>Successfully launched the new product</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem>
    <TimelineItemDate>2024-02-20</TimelineItemDate>
    <TimelineItemTitle>Feature Release</TimelineItemTitle>
    <TimelineItemDescription>Added new analytics dashboard</TimelineItemDescription>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Horizontal timeline with alternating items above and below the center line, connected by dots and branches, cards contain dates, titles, and descriptions

## Props

### Timeline

| Prop               | Type                                   | Default        | Description                           |
| ------------------ | -------------------------------------- | -------------- | ------------------------------------- |
| `orientation`      | `"horizontal" \| "vertical"`           | `"horizontal"` | Layout direction                      |
| `alternating`      | `boolean`                              | `true`         | Alternate items between sides         |
| `alignment`        | `"top/left" \| "bottom/right"`         | `"top/left"`   | Side for single-sided mode            |
| `horizItemWidth`   | `number`                               | `220`          | Width of horizontal items (px)        |
| `horizItemSpacing` | `number`                               | `130`          | Horizontal spacing between items (px) |
| `vertItemSpacing`  | `number`                               | `130`          | Vertical spacing between items (px)   |
| `vertItemMaxWidth` | `number`                               | `350`          | Max width of vertical items (px)      |
| `noCards`          | `boolean`                              | `false`        | Remove card styling (flat design)     |
| `className`        | `string`                               | -              | Additional CSS classes                |
| `...props`         | `React.HTMLAttributes<HTMLDivElement>` | -              | All standard div props                |

### TimelineItem

| Prop        | Type                                                     | Default     | Description            |
| ----------- | -------------------------------------------------------- | ----------- | ---------------------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "outline"` | `"default"` | Color variant          |
| `hollow`    | `boolean`                                                | `false`     | Hollow center dot      |
| `className` | `string`                                                 | -           | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLLIElement>`                    | -           | All standard li props  |

### TimelineItemDate

| Prop        | Type                                    | Default  | Description                              |
| ----------- | --------------------------------------- | -------- | ---------------------------------------- |
| `children`  | `Date \| string`                        | Required | Date to display (auto-formatted if Date) |
| `className` | `string`                                | -        | Additional CSS classes                   |
| `...props`  | `React.HTMLAttributes<HTMLSpanElement>` | -        | All standard span props                  |

### TimelineItemTitle

| Prop        | Type                                       | Default  | Description            |
| ----------- | ------------------------------------------ | -------- | ---------------------- |
| `children`  | `React.ReactNode`                          | Required | Title content          |
| `className` | `string`                                   | -        | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLHeadingElement>` | -        | All standard h3 props  |

### TimelineItemDescription

| Prop        | Type                                         | Default  | Description            |
| ----------- | -------------------------------------------- | -------- | ---------------------- |
| `children`  | `React.ReactNode`                            | Required | Description content    |
| `className` | `string`                                     | -        | Additional CSS classes |
| `...props`  | `React.HTMLAttributes<HTMLParagraphElement>` | -        | All standard p props   |

## Examples

### Example 1: Vertical Timeline

```tsx
<Timeline orientation="vertical">
  <TimelineItem>
    <TimelineItemDate>{new Date('2024-01-01')}</TimelineItemDate>
    <TimelineItemTitle>Started Journey</TimelineItemTitle>
    <TimelineItemDescription>Began working on the project</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem variant="secondary">
    <TimelineItemDate>{new Date('2024-06-15')}</TimelineItemDate>
    <TimelineItemTitle>Mid-Year Review</TimelineItemTitle>
    <TimelineItemDescription>Evaluated progress and adjusted goals</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem variant="destructive">
    <TimelineItemDate>{new Date('2024-12-31')}</TimelineItemDate>
    <TimelineItemTitle>Year End</TimelineItemTitle>
    <TimelineItemDescription>Completed all major milestones</TimelineItemDescription>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Vertical timeline with items alternating left and right, color-coded by variant, dates auto-formatted as "1 Jan 2024"

### Example 2: Single-Sided Timeline (Left/Top)

```tsx
<Timeline alternating={false} alignment="top/left" orientation="horizontal">
  <TimelineItem>
    <TimelineItemDate>Q1 2024</TimelineItemDate>
    <TimelineItemTitle>Phase 1</TimelineItemTitle>
  </TimelineItem>
  <TimelineItem>
    <TimelineItemDate>Q2 2024</TimelineItemDate>
    <TimelineItemTitle>Phase 2</TimelineItemTitle>
  </TimelineItem>
  <TimelineItem>
    <TimelineItemDate>Q3 2024</TimelineItemDate>
    <TimelineItemTitle>Phase 3</TimelineItemTitle>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Horizontal timeline with all items positioned above the line, creating a clean single-row layout

### Example 3: Timeline Without Cards

```tsx
<Timeline noCards orientation="vertical">
  <TimelineItem>
    <TimelineItemDate>Today</TimelineItemDate>
    <TimelineItemTitle>Simple Event</TimelineItemTitle>
    <TimelineItemDescription>Minimal design without card backgrounds</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem>
    <TimelineItemDate>Tomorrow</TimelineItemDate>
    <TimelineItemTitle>Another Event</TimelineItemTitle>
    <TimelineItemDescription>Focus on content, not containers</TimelineItemDescription>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Flat timeline design without card shadows or borders, content connects directly to dots

### Example 4: Hollow Dots Timeline

```tsx
<Timeline>
  <TimelineItem hollow>
    <TimelineItemDate>Step 1</TimelineItemDate>
    <TimelineItemTitle>Planning</TimelineItemTitle>
  </TimelineItem>
  <TimelineItem hollow variant="secondary">
    <TimelineItemDate>Step 2</TimelineItemDate>
    <TimelineItemTitle>Execution</TimelineItemTitle>
  </TimelineItem>
  <TimelineItem hollow variant="destructive">
    <TimelineItemDate>Step 3</TimelineItemDate>
    <TimelineItemTitle>Review</TimelineItemTitle>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Timeline with hollow circular dots (donut-style), creating a lighter, more open appearance

### Example 5: Custom Spacing

```tsx
<Timeline orientation="vertical" vertItemSpacing={200} vertItemMaxWidth={400}>
  <TimelineItem>
    <TimelineItemDate>2024-01-01</TimelineItemDate>
    <TimelineItemTitle>Spacious Layout</TimelineItemTitle>
    <TimelineItemDescription>
      Wider spacing creates a more breathable design
    </TimelineItemDescription>
  </TimelineItem>
  <TimelineItem>
    <TimelineItemDate>2024-06-01</TimelineItemDate>
    <TimelineItemTitle>Generous Cards</TimelineItemTitle>
    <TimelineItemDescription>Larger max width accommodates more content</TimelineItemDescription>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Vertical timeline with increased spacing (200px) and wider cards (400px max), creating an airy, premium feel

### Example 6: Roadmap Timeline

```tsx
<Timeline orientation="horizontal" horizItemWidth={280} horizItemSpacing={150}>
  <TimelineItem variant="outline">
    <TimelineItemDate>Q1 2024</TimelineItemDate>
    <TimelineItemTitle>Research Phase</TimelineItemTitle>
    <TimelineItemDescription>Market analysis and user research</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem variant="default">
    <TimelineItemDate>Q2 2024</TimelineItemDate>
    <TimelineItemTitle>Development</TimelineItemTitle>
    <TimelineItemDescription>Build core features</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem variant="secondary">
    <TimelineItemDate>Q3 2024</TimelineItemDate>
    <TimelineItemTitle>Beta Testing</TimelineItemTitle>
    <TimelineItemDescription>User feedback and iteration</TimelineItemDescription>
  </TimelineItem>
  <TimelineItem variant="destructive">
    <TimelineItemDate>Q4 2024</TimelineItemDate>
    <TimelineItemTitle>Launch</TimelineItemTitle>
    <TimelineItemDescription>Public release and marketing</TimelineItemDescription>
  </TimelineItem>
</Timeline>
```

**Visual:**

> Horizontal roadmap with wider cards (280px), color progression showing project phases, alternating above/below

## Variants

### Default

```tsx
<TimelineItem variant="default">Content</TimelineItem>
```

**Visual:**

> Primary colored dot and branch, card with background and shadow

### Secondary

```tsx
<TimelineItem variant="secondary">Content</TimelineItem>
```

**Visual:**

> Secondary colored dot and branch, lighter card background

### Destructive

```tsx
<TimelineItem variant="destructive">Content</TimelineItem>
```

**Visual:**

> Destructive/red colored dot and branch, error-themed card styling

### Outline

```tsx
<TimelineItem variant="outline">Content</TimelineItem>
```

**Visual:**

> Border-colored dot and branch, outlined card with transparent background

## Accessibility

- Uses semantic HTML: `<div role="list">` and `<li role="listitem">`
- Timeline container has `aria-orientation` attribute
- Items include `aria-posinset` and `aria-setsize` for position info
- Maintains logical tab order through items
- Date elements use `<time datetime>` for machine-readable dates
- Sufficient color contrast for all variants
- Works with keyboard navigation

## TypeScript

```tsx
interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  alternating?: boolean;
  alignment?: 'top/left' | 'bottom/right';
  horizItemSpacing?: number;
  horizItemWidth?: number;
  vertItemSpacing?: number;
  vertItemMaxWidth?: number;
  orientation?: 'horizontal' | 'vertical';
  noCards?: boolean;
}

interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  hollow?: boolean;
}

interface TimelineItemDateProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: Date | string;
}
```

## Notes

- Timeline uses CSS Grid for precise layout control
- Dots positioned absolutely at center of timeline
- Branches connect dots to cards (4px width/height)
- Rounded endcaps on first/last line segments
- Horizontal padding calculated to prevent card overlap
- Vertical padding dynamically calculated based on card heights
- ResizeObserver ensures padding updates if card height changes
- Line thickness: 4px (muted background color)
- Dot size: 16px (4px border width)
- Date formatting uses Intl.DateTimeFormat (e.g., "15 Jan 2024")
- String dates displayed as-is (no formatting)
- Card transitions smooth on hover/interaction
- Works with any number of items (minimum 1)
- Snap scrolling enabled for horizontal overflow
- Alternating mode: even indices = before, odd indices = after
- Single-sided mode: all items on specified side
- noCards removes backgrounds but keeps layout structure
- Supports nested content in title/description components
