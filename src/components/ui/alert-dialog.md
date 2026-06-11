# Alert Dialog

A modal dialog that interrupts the user with important content and expects a response.

## Import

```tsx
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@allsetlabs/forge/components/ui/alert-dialog';
```

## Features

- **Modal Overlay**: Full-screen dark overlay to focus attention
- **Centered Content**: Dialog centered on screen with smooth animations
- **Action Buttons**: Pre-styled action and cancel buttons
- **Keyboard Support**: ESC to close, Tab navigation
- **Focus Management**: Traps focus within dialog when open
- **Accessible**: Built on Radix UI with proper ARIA attributes

## Basic Usage

```tsx
<AlertDialog>
  <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Props

### AlertDialog

Based on `@radix-ui/react-alert-dialog` Root component:

| Prop         | Type     | Default | Description                       |
| ------------ | -------- | ------- | --------------------------------- |
| open         | boolean  | -       | Controlled open state             |
| onOpenChange | function | -       | Callback when open state changes  |
| defaultOpen  | boolean  | false   | Initial open state (uncontrolled) |

### AlertDialogPortal

Renders the dialog into a portal at the document root.

| Prop      | Type        | Default       | Description                     |
| --------- | ----------- | ------------- | ------------------------------- |
| container | HTMLElement | document.body | DOM element to portal into      |
| children  | ReactNode   | -             | Content to render in the portal |

### AlertDialogOverlay

Semi-transparent backdrop behind the dialog.

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### AlertDialogTrigger

| Prop     | Type      | Default | Description                                                |
| -------- | --------- | ------- | ---------------------------------------------------------- |
| children | ReactNode | -       | Element that triggers the dialog (e.g., button)            |
| asChild  | boolean   | false   | Merge props with child element instead of rendering button |

### AlertDialogContent

| Prop      | Type      | Default | Description                                |
| --------- | --------- | ------- | ------------------------------------------ |
| children  | ReactNode | -       | Dialog content (typically Header + Footer) |
| className | string    | -       | Additional CSS classes                     |

> Automatically includes the overlay and centers the dialog on screen.

### AlertDialogHeader

| Prop      | Type      | Default | Description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| children  | ReactNode | -       | Header content (typically Title + Description) |
| className | string    | -       | Additional CSS classes                         |

### AlertDialogFooter

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| children  | ReactNode | -       | Footer content (typically Cancel + Action buttons) |
| className | string    | -       | Additional CSS classes                             |

### AlertDialogTitle

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| children  | ReactNode | -       | Dialog title text      |
| className | string    | -       | Additional CSS classes |

### AlertDialogDescription

| Prop      | Type      | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| children  | ReactNode | -       | Dialog description text |
| className | string    | -       | Additional CSS classes  |

### AlertDialogAction

| Prop      | Type      | Default | Description                  |
| --------- | --------- | ------- | ---------------------------- |
| children  | ReactNode | -       | Button text                  |
| onClick   | function  | -       | Click handler for the action |
| className | string    | -       | Additional CSS classes       |

> Styled as a primary button. Automatically closes the dialog when clicked.

### AlertDialogCancel

| Prop      | Type      | Default | Description              |
| --------- | --------- | ------- | ------------------------ |
| children  | ReactNode | -       | Button text              |
| onClick   | function  | -       | Click handler for cancel |
| className | string    | -       | Additional CSS classes   |

> Styled as a secondary button. Automatically closes the dialog when clicked.

## Examples

### Destructive Action Confirmation

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <button className="text-destructive">Delete</button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this item?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete this item. You cannot undo this action.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Controlled Dialog

```tsx
const [open, setOpen] = useState(false);

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Session Expired</AlertDialogTitle>
      <AlertDialogDescription>
        Your session has expired. Please log in again.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={() => router.push('/login')}>Log In</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

### Custom Styled Action

```tsx
<AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>
    Delete Forever
  </AlertDialogAction>
</AlertDialogFooter>
```

## Accessibility

- Implements WAI-ARIA alert dialog pattern
- Focus trapped within dialog when open
- ESC key closes the dialog
- Focus returns to trigger element when closed
- Title and description properly associated with dialog
- Portal rendering prevents z-index issues

## Notes

- Overlay is semi-transparent black (`bg-black/80`)
- Dialog has entrance/exit animations (fade + zoom + slide)
- Maximum width is `max-w-lg` (32rem / 512px)
- Footer buttons are responsive (stacked on mobile, row on desktop)
- Uses custom `border`, `background`, `shadow` colors from theme
- Portal ensures dialog renders at document root to avoid z-index issues
