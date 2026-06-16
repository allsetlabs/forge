# ScrollArea

A custom scrollable area component built on Radix UI with styled scrollbars for consistent cross-browser appearance.

## Import

```tsx
import { ScrollArea, ScrollBar } from '@allsetlabs/forge/components/ui/scroll-area';
```

## Features

- **Custom Scrollbars**: Styled scrollbars that match your design system
- **Cross-Browser Consistent**: Same appearance across all browsers
- **Vertical & Horizontal**: Support for both scroll orientations
- **Smooth Transitions**: Animated scrollbar appearance on hover/scroll
- **Touch Support**: Touch-enabled scrolling with proper events

## Basic Usage

```tsx
<ScrollArea className="h-[200px] w-[350px] rounded-md border">
  <div className="p-4">{/* Your scrollable content */}</div>
</ScrollArea>
```

## Props

### ScrollArea

| Prop      | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| className | string    | -       | Additional CSS classes (set height here) |
| children  | ReactNode | -       | Content to make scrollable               |

> You must set a height constraint (e.g., `h-[200px]`) for scrolling to work

### ScrollBar

| Prop        | Type                       | Default    | Description            |
| ----------- | -------------------------- | ---------- | ---------------------- |
| orientation | 'vertical' \| 'horizontal' | 'vertical' | Scrollbar orientation  |
| className   | string                     | -          | Additional CSS classes |

> ScrollBar is automatically included in ScrollArea, but can be customized separately

## Examples

### Basic Vertical Scroll

```tsx
<ScrollArea className="border-border h-72 w-full rounded-md border p-4">
  <div className="space-y-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="text-sm">
        Item {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>
```

### Horizontal Scroll

```tsx
<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="bg-primary h-20 w-20 rounded-md" />
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Code Block Scroll

```tsx
<ScrollArea className="h-[350px] w-full rounded-md border">
  <pre className="p-4">
    <code>{codeContent}</code>
  </pre>
</ScrollArea>
```

### Image Gallery Scroll

```tsx
<ScrollArea className="w-full whitespace-nowrap rounded-lg border">
  <div className="flex w-max gap-4 p-4">
    {images.map((image) => (
      <img
        key={image.id}
        src={image.url}
        alt={image.alt}
        className="h-40 w-40 rounded-md object-cover"
      />
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Chat Message List

```tsx
<ScrollArea className="h-[600px] w-full rounded-lg border">
  <div className="space-y-4 p-4">
    {messages.map((message) => (
      <div key={message.id} className="bg-muted rounded-lg p-3">
        <p className="text-sm font-semibold">{message.author}</p>
        <p className="text-sm">{message.content}</p>
      </div>
    ))}
  </div>
</ScrollArea>
```

### Sidebar Navigation

```tsx
<ScrollArea className="h-screen w-64 rounded-none border-r">
  <div className="space-y-2 p-4">
    {navItems.map((item) => (
      <button
        key={item.id}
        className="hover:bg-accent w-full rounded-md px-3 py-2 text-left text-sm"
      >
        {item.label}
      </button>
    ))}
  </div>
</ScrollArea>
```

### Data Table with Horizontal Scroll

```tsx
<ScrollArea className="w-full whitespace-nowrap rounded-md border">
  <table className="w-full">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        {/* Many more columns */}
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.col1}</td>
          <td>{row.col2}</td>
          {/* More cells */}
        </tr>
      ))}
    </tbody>
  </table>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

## Accessibility

- Maintains native scroll behavior for keyboard navigation
- Scrollable with arrow keys when focused
- Supports Page Up/Page Down keys
- Home/End keys work as expected
- Mouse wheel scrolling works normally
- Touch gestures supported on mobile
- Focus management preserved for keyboard users

## Notes

- **Always set a height** on ScrollArea or it won't scroll (e.g., `h-[200px]`)
- Uses `overflow-hidden` on root and `overflow` on viewport for custom scrollbars
- Scrollbar thumb styled with `bg-border` for theme consistency
- Scrollbars have smooth color transitions
- For horizontal scroll, content must have `whitespace-nowrap` or fixed width
- `ScrollBar` is included by default (vertical), add explicitly for horizontal
- Corner element handles the intersection of vertical and horizontal scrollbars
- Viewport inherits border radius from parent
- Full dark mode support built-in
- Scrollbar width is 10px (2.5 Tailwind units)
