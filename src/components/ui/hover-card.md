# Hover Card

A popup card that appears when hovering over an element, useful for previews and additional information.

## Import

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@allsetlabs/forge/components/ui/hover-card';
```

## Features

- **Hover Activation**: Opens on mouse hover with customizable delay
- **Rich Content**: Display any content including images, text, and links
- **Smart Positioning**: Automatically positions to stay within viewport
- **Smooth Animations**: Fade and zoom animations on open/close
- **Accessible**: Keyboard navigation and screen reader support
- **Touch Support**: Works on touch devices with tap interaction

## Basic Usage

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@allsetlabs/forge/components/ui/hover-card';

function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>
        <p>This is the hover card content.</p>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Props

### HoverCard

| Prop           | Type                      | Default | Description                                   |
| -------------- | ------------------------- | ------- | --------------------------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state                         |
| `defaultOpen`  | `boolean`                 | `false` | Uncontrolled default open state               |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes              |
| `openDelay`    | `number`                  | `700`   | Delay in ms before opening on hover           |
| `closeDelay`   | `number`                  | `300`   | Delay in ms before closing after mouse leaves |

### HoverCardTrigger

| Prop      | Type      | Default | Description                    |
| --------- | --------- | ------- | ------------------------------ |
| `asChild` | `boolean` | `false` | Merge props onto child element |

### HoverCardContent

| Prop               | Type                                      | Default    | Description                              |
| ------------------ | ----------------------------------------- | ---------- | ---------------------------------------- |
| `align`            | `'start' \| 'center' \| 'end'`            | `'center'` | Horizontal alignment relative to trigger |
| `side`             | `'top' \| 'right' \| 'bottom' \| 'left'`  | `'bottom'` | Preferred side to appear on              |
| `sideOffset`       | `number`                                  | `4`        | Distance in pixels from trigger          |
| `alignOffset`      | `number`                                  | `0`        | Offset from aligned position             |
| `avoidCollisions`  | `boolean`                                 | `true`     | Prevent collision with viewport edges    |
| `collisionPadding` | `number \| Partial<Record<Side, number>>` | `10`       | Padding from viewport edges              |

> Default width is 64 (256px), customizable via className.

## Examples

### User Profile Preview

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/user/jane" className="text-primary-500 font-medium hover:underline">
      @jane
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex space-x-4">
      <Avatar>
        <AvatarImage src="/avatars/jane.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@jane</h4>
        <p className="text-muted-foreground text-sm">Product designer and founder of Acme Inc.</p>
        <div className="flex items-center pt-2">
          <Calendar className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-muted-foreground text-xs">Joined December 2021</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Link Preview

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="https://example.com" className="text-primary-500 hover:underline">
      Read the documentation
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-96">
    <div className="space-y-2">
      <img src="/preview.jpg" alt="Preview" className="h-32 w-full rounded-md object-cover" />
      <div>
        <h4 className="font-semibold">Documentation</h4>
        <p className="text-muted-foreground text-sm">
          Comprehensive guides and API references to help you build with our platform.
        </p>
        <a
          href="https://example.com"
          className="text-primary-500 mt-2 inline-flex items-center text-xs"
        >
          example.com
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Custom Delay Times

```tsx
<HoverCard openDelay={300} closeDelay={100}>
  <HoverCardTrigger>Quick to open, quick to close</HoverCardTrigger>
  <HoverCardContent>
    <p>Opens after 300ms, closes after 100ms</p>
  </HoverCardContent>
</HoverCard>
```

### With Icons and Stats

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <button className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
      <Star className="h-4 w-4" />
      <span>1.2k</span>
    </button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Project Stars</h4>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>1,234 developers have starred this project</p>
        <p className="text-xs">Last starred 2 hours ago</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Positioned Above Trigger

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <button className="text-primary-500">
      Info
      <Info className="ml-1 inline h-4 w-4" />
    </button>
  </HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    <p className="text-sm">This information appears above the trigger element.</p>
  </HoverCardContent>
</HoverCard>
```

### Controlled State

```tsx
const [open, setOpen] = useState(false);

<HoverCard open={open} onOpenChange={setOpen}>
  <HoverCardTrigger onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    Controlled hover
  </HoverCardTrigger>
  <HoverCardContent>
    <p>Open state: {open ? 'Open' : 'Closed'}</p>
  </HoverCardContent>
</HoverCard>;
```

### Product Preview

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <div className="hover:border-primary-500 cursor-pointer rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
      <Package className="h-8 w-8" />
      <p className="mt-2 font-medium">Product Name</p>
    </div>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">Product Name</h4>
          <p className="text-muted-foreground text-sm">Premium Package</p>
        </div>
        <span className="text-primary-500 text-lg font-bold">$99</span>
      </div>
      <p className="text-muted-foreground text-sm">
        High-quality product with exceptional features and support.
      </p>
      <div className="flex gap-2 pt-2">
        <Badge>Popular</Badge>
        <Badge variant="outline">New</Badge>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Accessibility

- **Keyboard Navigation**: Escape to close
- **ARIA Attributes**: Proper labeling and description support
- **Screen Reader Support**: Content announced when opened
- **Focus Management**: Does not trap focus (allows interaction with page)
- **Hover Intent**: Delays prevent accidental triggering

## Notes

- Built on top of `@radix-ui/react-hover-card` for robust accessibility
- Default open delay is 700ms to prevent accidental triggers
- Content has fade-in/fade-out and zoom animations
- Automatically positions to avoid viewport edges
- Works on touch devices (opens on tap)
- Unlike Tooltip, HoverCard can contain interactive content
- Default width is 256px (w-64), but easily customizable
- Portal rendering ensures card appears above other content
- Side offset of 4px provides comfortable spacing from trigger
- Use for rich previews, user profiles, product details, etc.
- Not ideal for simple text hints (use Tooltip instead)
