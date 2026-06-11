# Avatar

A component to display user profile images with automatic fallback support.

## Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@allsetlabs/forge/components/ui/avatar';
```

## Features

- **Image Display**: Shows user profile image with proper aspect ratio
- **Automatic Fallback**: Shows fallback content (initials, icon) when image fails to load
- **Circular Shape**: Rounded-full styling by default
- **Flexible Sizing**: Easily customizable size with className
- **Accessible**: Built on Radix UI with proper image loading states

## Basic Usage

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>
```

## Props

### Avatar

| Prop      | Type      | Default | Description                                |
| --------- | --------- | ------- | ------------------------------------------ |
| children  | ReactNode | -       | AvatarImage and AvatarFallback components  |
| className | string    | -       | Additional CSS classes (useful for sizing) |

> Default size is `h-10 w-10` (2.5rem / 40px).

### AvatarImage

| Prop      | Type   | Default | Description                      |
| --------- | ------ | ------- | -------------------------------- |
| src       | string | -       | Image source URL                 |
| alt       | string | -       | Image alt text for accessibility |
| className | string | -       | Additional CSS classes           |

### AvatarFallback

| Prop      | Type      | Default | Description                             |
| --------- | --------- | ------- | --------------------------------------- |
| children  | ReactNode | -       | Fallback content (e.g., initials, icon) |
| className | string    | -       | Additional CSS classes                  |
| delayMs   | number    | -       | Delay before showing fallback (ms)      |

> Fallback is shown when image fails to load or while loading.

## Examples

### User Avatar with Initials

```tsx
<Avatar>
  <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Large Avatar

```tsx
<Avatar className="h-20 w-20">
  <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
  <AvatarFallback className="text-2xl">JD</AvatarFallback>
</Avatar>
```

### Small Avatar

```tsx
<Avatar className="h-6 w-6">
  <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
  <AvatarFallback className="text-xs">JD</AvatarFallback>
</Avatar>
```

### Icon Fallback

```tsx
import { User } from 'lucide-react';

<Avatar>
  <AvatarImage src="/avatars/user.jpg" alt="User" />
  <AvatarFallback>
    <User className="h-4 w-4" />
  </AvatarFallback>
</Avatar>;
```

### Delayed Fallback

```tsx
<Avatar>
  <AvatarImage src="/slow-loading-image.jpg" alt="User" />
  <AvatarFallback delayMs={600}>JD</AvatarFallback>
</Avatar>
```

### Avatar Group

```tsx
<div className="flex -space-x-2">
  <Avatar className="border-background border-2">
    <AvatarImage src="/avatars/user1.jpg" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-background border-2">
    <AvatarImage src="/avatars/user2.jpg" alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-background border-2">
    <AvatarImage src="/avatars/user3.jpg" alt="User 3" />
    <AvatarFallback>U3</AvatarFallback>
  </Avatar>
</div>
```

## Accessibility

- Image has proper `alt` attribute for screen readers
- Fallback provides text alternative when image unavailable
- Uses Radix UI image loading states for reliability
- Maintains aspect ratio to prevent layout shift

## Notes

- Avatar is circular by default (`rounded-full`)
- Image uses `aspect-square` to maintain 1:1 ratio
- Fallback has muted background color (`bg-muted`)
- Fallback content is centered with flexbox
- If image fails to load, fallback is shown automatically
- `delayMs` on fallback prevents flash of fallback during fast image loads
- Common sizes: `h-6 w-6` (small), `h-10 w-10` (default), `h-20 w-20` (large)
