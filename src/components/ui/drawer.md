# Drawer

A sliding panel that appears from the bottom of the screen, commonly used for mobile interfaces.

## Import

```tsx
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@allsetlabs/forge/components/ui/drawer';
```

## Features

- **Bottom Slide Animation**: Smooth slide-up animation from bottom
- **Drag to Close**: Pull down gesture to dismiss
- **Background Scaling**: Optional background content scaling effect
- **Overlay Backdrop**: Semi-transparent backdrop with blur
- **Responsive**: Works on both mobile and desktop
- **Accessible**: Full keyboard support and ARIA attributes
- **Handle Indicator**: Visual drag handle for pull-to-close

## Basic Usage

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@allsetlabs/forge/components/ui/drawer';
import { Button } from '@allsetlabs/forge/components/ui/button';

function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">Drawer content goes here.</div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Props

### Drawer

| Prop                    | Type                      | Default | Description                                |
| ----------------------- | ------------------------- | ------- | ------------------------------------------ |
| `open`                  | `boolean`                 | -       | Controlled open state                      |
| `defaultOpen`           | `boolean`                 | `false` | Uncontrolled default open state            |
| `onOpenChange`          | `(open: boolean) => void` | -       | Callback when open state changes           |
| `shouldScaleBackground` | `boolean`                 | `true`  | Scale background content when drawer opens |
| `modal`                 | `boolean`                 | `true`  | Whether drawer is modal (traps focus)      |

### DrawerTrigger

| Prop      | Type      | Default | Description                    |
| --------- | --------- | ------- | ------------------------------ |
| `asChild` | `boolean` | `false` | Merge props onto child element |

### DrawerContent

All standard div attributes. The content panel that slides up from bottom.

> Includes a visual drag handle (horizontal line) at the top automatically.

### DrawerHeader

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

> Styled with padding and grid layout. Centers text on small screens, left-aligns on larger screens.

### DrawerFooter

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

> Positioned at the bottom with auto margin-top. Vertical flex layout with gap.

### DrawerTitle

Heading for the drawer. Required for accessibility.

### DrawerDescription

Optional description text. Styled with muted foreground color.

### DrawerClose

Button to close the drawer. Use `asChild` to compose with custom buttons.

## Examples

### Complete Drawer with Header and Footer

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Settings</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Manage your account settings</DrawerDescription>
    </DrawerHeader>
    <div className="space-y-4 p-4">
      <div>
        <label className="text-sm font-medium">Notifications</label>
        <p className="text-muted-foreground text-sm">Enable push notifications</p>
      </div>
      <div>
        <label className="text-sm font-medium">Theme</label>
        <p className="text-muted-foreground text-sm">Choose your theme</p>
      </div>
    </div>
    <DrawerFooter>
      <Button>Save Changes</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Controlled Drawer

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button onClick={() => setOpen(true)}>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button
        variant="destructive"
        onClick={() => {
          handleDelete();
          setOpen(false);
        }}
      >
        Delete
      </Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>;
```

### Form in Drawer

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Add Item</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Add New Item</DrawerTitle>
      <DrawerDescription>Fill out the form below</DrawerDescription>
    </DrawerHeader>
    <form className="space-y-4 p-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" placeholder="Enter name" />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea id="description" placeholder="Enter description" />
      </div>
    </form>
    <DrawerFooter>
      <Button type="submit">Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Without Background Scaling

```tsx
<Drawer shouldScaleBackground={false}>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>No Background Scaling</DrawerTitle>
    </DrawerHeader>
    <div className="p-4">Background stays fixed when drawer opens.</div>
  </DrawerContent>
</Drawer>
```

### With Custom Close Button

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="relative p-4">
      <DrawerClose asChild>
        <Button variant="ghost" size="icon" className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </Button>
      </DrawerClose>
      <DrawerHeader>
        <DrawerTitle>Custom Close</DrawerTitle>
      </DrawerHeader>
      <div className="p-4">Content with custom positioned close button.</div>
    </div>
  </DrawerContent>
</Drawer>
```

### Scrollable Content

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>View Details</Button>
  </DrawerTrigger>
  <DrawerContent className="max-h-[80vh]">
    <DrawerHeader>
      <DrawerTitle>Long Content</DrawerTitle>
      <DrawerDescription>Scroll to see all content</DrawerDescription>
    </DrawerHeader>
    <div className="overflow-y-auto p-4">
      {Array.from({ length: 50 }).map((_, i) => (
        <p key={i} className="mb-2">
          Line {i + 1}
        </p>
      ))}
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Accessibility

- **Keyboard Navigation**: Escape to close, Tab to navigate within
- **ARIA Attributes**: Proper dialog role and labeling
- **Focus Management**: Traps focus within drawer when open, returns focus on close
- **Screen Reader Support**: Title and description properly announced
- **Drag Gesture**: Accessible via keyboard (Escape to close)

## Notes

- Built on top of `vaul` library for smooth drag gestures
- Drawer slides up from the bottom with rounded top corners
- Visual drag handle (horizontal line) automatically included at top
- Background scales down slightly when drawer opens (can be disabled)
- Overlay darkens background (80% black opacity)
- Portal rendering ensures drawer appears above other content
- Perfect for mobile-first designs and bottom sheets
- Works well for forms, confirmations, and detail views
- Can be dismissed by clicking overlay, dragging down, or pressing Escape
- Content has rounded top border and shadow for depth
