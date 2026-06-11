# Dialog

Modal dialog component built on Radix UI with accessible focus management and animations.

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
  DialogOverlay,
} from '@allsetlabs/forge/components/ui/dialog';
```

## Features

- **Accessible**: Full keyboard navigation and ARIA support via Radix UI
- **Animated**: Smooth open/close animations with fade and zoom effects
- **Portal rendering**: Content renders in a portal to escape z-index issues
- **Focus management**: Traps focus within dialog when open
- **Close button**: Built-in close button with X icon

## Basic Usage

```tsx
<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>This is the dialog description explaining the purpose.</DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here.</p>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Visual:**

> A centered modal overlay with a semi-transparent black backdrop. The dialog box appears in the center with rounded corners, a white background, and a close button (X) in the top-right corner.

## Components

### Dialog

Root component that controls the open/closed state.

| Prop           | Type       | Default | Description                       |
| -------------- | ---------- | ------- | --------------------------------- |
| `open`         | `boolean`  | -       | Controlled open state             |
| `onOpenChange` | `function` | -       | Callback when open state changes  |
| `defaultOpen`  | `boolean`  | `false` | Initial open state (uncontrolled) |
| `modal`        | `boolean`  | `true`  | Whether to render as modal        |

### DialogTrigger

Button that opens the dialog. Can wrap any clickable element.

```tsx
<DialogTrigger asChild>
  <Button>Open Settings</Button>
</DialogTrigger>
```

### DialogContent

The dialog panel containing the content. Automatically includes overlay and close button.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |
| `children`  | `node`   | -       | Dialog content         |

### DialogHeader

Container for title and description with proper spacing.

```tsx
<DialogHeader>
  <DialogTitle>Edit Profile</DialogTitle>
  <DialogDescription>Make changes to your profile.</DialogDescription>
</DialogHeader>
```

### DialogFooter

Container for action buttons, aligned to the right on desktop.

```tsx
<DialogFooter>
  <DialogClose asChild>
    <Button variant="outline">Cancel</Button>
  </DialogClose>
  <Button>Save Changes</Button>
</DialogFooter>
```

### DialogTitle

Accessible title element. Required for screen readers.

### DialogDescription

Optional description text displayed below the title.

### DialogClose

Button that closes the dialog when clicked.

```tsx
<DialogClose asChild>
  <Button variant="ghost">Cancel</Button>
</DialogClose>
```

### DialogPortal

Portals content to document body. Used internally by DialogContent.

### DialogOverlay

Semi-transparent backdrop. Used internally by DialogContent.

## Examples

### Confirmation Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Visual:**

> A dialog with warning message, cancel button on the left, and red delete button on the right.

### Form Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john@example.com" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Visual:**

> A dialog with form fields for name and email, with a save button at the bottom.

### Controlled Dialog

```tsx
function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <p>This dialog's state is controlled externally.</p>
        <Button onClick={() => setOpen(false)}>Close programmatically</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Accessibility

- Focus is trapped within the dialog when open
- Pressing `Escape` closes the dialog
- Clicking outside the dialog closes it
- Screen readers announce the dialog title and description
- Close button has accessible label "Close"

## TypeScript

```tsx
import type { DialogProps } from '@radix-ui/react-dialog';

// DialogContent accepts all Radix DialogContentProps
interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string;
  children?: React.ReactNode;
}
```

## Notes

- Always include `DialogTitle` for accessibility
- Use `asChild` prop to render custom trigger/close buttons
- DialogContent automatically includes overlay and close button
- Use `DialogHeader` and `DialogFooter` for consistent layout
