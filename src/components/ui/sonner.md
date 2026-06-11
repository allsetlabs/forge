# Toaster (Sonner)

A toast notification component built on Sonner library with theme-aware styling for displaying temporary messages.

## Import

```tsx
import { Toaster } from '@allsetlabs/forge/components/ui/sonner';
```

## Features

- **Theme Integrated**: Automatically uses your app's color scheme
- **Multiple Types**: Success, error, warning, info, and default toasts
- **Action Buttons**: Support for action and cancel buttons
- **Auto Dismiss**: Configurable auto-dismiss timing
- **Rich Content**: Support for descriptions and custom content
- **Stacking**: Multiple toasts stack nicely
- **Animations**: Smooth enter/exit animations

## Basic Usage

```tsx
// 1. Add Toaster to your app root (once)
import { Toaster } from '@allsetlabs/forge/components/ui/sonner';

function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster />
    </>
  );
}

// 2. Use toast function anywhere in your app
import { toast } from 'sonner';

function MyComponent() {
  return <button onClick={() => toast('Hello World')}>Show Toast</button>;
}
```

## Props

### Toaster

| Prop          | Type                                                                                            | Default        | Description                     |
| ------------- | ----------------------------------------------------------------------------------------------- | -------------- | ------------------------------- |
| position      | 'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' | 'bottom-right' | Toast position on screen        |
| expand        | boolean                                                                                         | false          | Whether toasts expand on hover  |
| richColors    | boolean                                                                                         | false          | Use rich colors for toast types |
| closeButton   | boolean                                                                                         | false          | Show close button on toasts     |
| duration      | number                                                                                          | 4000           | Default duration in ms          |
| visibleToasts | number                                                                                          | 3              | Max visible toasts              |

> Toaster component only needs to be added once to your app root

## Toast Function API

The `toast` function from 'sonner' provides multiple methods:

```tsx
import { toast } from 'sonner';

// Basic toast
toast('Message here');

// Toast types
toast.success('Success message');
toast.error('Error message');
toast.warning('Warning message');
toast.info('Info message');

// With description
toast('Title', {
  description: 'Additional details here',
});

// With action button
toast('Event created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
  },
});

// Custom duration
toast('Quick message', { duration: 2000 });

// Persistent (no auto-dismiss)
toast('Important', { duration: Infinity });
```

## Examples

### Basic Toast

```tsx
<button onClick={() => toast('Hello World')}>Show Toast</button>
```

### Success Toast

```tsx
<button onClick={() => toast.success('Profile updated successfully')}>Save Profile</button>
```

### Error Toast

```tsx
<button onClick={() => toast.error('Failed to save changes')}>Trigger Error</button>
```

### Toast with Description

```tsx
<button
  onClick={() =>
    toast('New message received', {
      description: 'From John Doe: "Hey, are you available?"',
    })
  }
>
  Simulate Message
</button>
```

### Toast with Action

```tsx
<button
  onClick={() =>
    toast('File deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Restoring file...');
          toast.success('File restored');
        },
      },
    })
  }
>
  Delete File
</button>
```

### Promise Toast

```tsx
<button
  onClick={() => {
    toast.promise(
      fetch('/api/data').then((res) => res.json()),
      {
        loading: 'Loading...',
        success: 'Data loaded successfully',
        error: 'Failed to load data',
      }
    );
  }}
>
  Load Data
</button>
```

### Custom Duration

```tsx
// Quick toast (2 seconds)
<button onClick={() => toast('Quick message', { duration: 2000 })}>
  Quick Toast
</button>

// Persistent toast (must be dismissed manually)
<button onClick={() => toast('Read this carefully', { duration: Infinity })}>
  Persistent Toast
</button>
```

### Loading State

```tsx
const handleAsyncAction = async () => {
  const toastId = toast.loading('Processing...');

  try {
    await someAsyncOperation();
    toast.success('Operation completed', { id: toastId });
  } catch (error) {
    toast.error('Operation failed', { id: toastId });
  }
};

<button onClick={handleAsyncAction}>Process</button>;
```

### Custom Position

```tsx
function App() {
  return (
    <>
      {/* Your app */}
      <Toaster position="top-center" />
    </>
  );
}
```

### With Close Button

```tsx
function App() {
  return (
    <>
      {/* Your app */}
      <Toaster closeButton />
    </>
  );
}
```

### Rich Colors Mode

```tsx
function App() {
  return (
    <>
      {/* Your app */}
      <Toaster richColors />
    </>
  );
}
```

## Accessibility

- Toasts are announced to screen readers via ARIA live regions
- Proper `role="status"` for notifications
- Keyboard accessible dismiss actions
- Focus management for action buttons
- Respects prefers-reduced-motion for animations

## Notes

- Only one `<Toaster />` component needed per app (add to root)
- Import `toast` function from 'sonner' package, not from component file
- Toasts automatically stack when multiple are shown
- Custom styling uses CSS class names for theme integration:
  - `group-[.toaster]:bg-background` for toast background
  - `group-[.toaster]:text-foreground` for toast text
  - `group-[.toaster]:border-border` for toast border
- Action button uses primary colors
- Cancel button uses muted colors
- Full dark mode support through theme classes
- Toast IDs can be used to update existing toasts
- Duration of 0 or Infinity creates persistent toasts
- Default duration is 4000ms (4 seconds)
- Position can be customized per Toaster instance
