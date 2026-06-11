# Image

Display base64-encoded images from AI-generated image responses.

## Import

```tsx
import { Image } from '@allsetlabs/forge/components/ai-elements/image';
```

## Features

- **Base64 Support**: Automatically renders base64-encoded images as data URLs
- **Media Type Handling**: Supports various image media types (PNG, JPEG, WebP, etc.)
- **Responsive**: Auto-scales to container width while maintaining aspect ratio

## Basic Usage

```tsx
<Image base64="iVBORw0KGgoAAAANSUhEUgAAAAUA..." mediaType="image/png" alt="Generated landscape" />
```

**Visual:**

> A rounded image that fills the width of its container.

## Props

| Prop       | Type         | Default | Description                            |
| ---------- | ------------ | ------- | -------------------------------------- |
| base64     | `string`     | -       | Base64-encoded image data              |
| mediaType  | `string`     | -       | Image MIME type (e.g., "image/png")    |
| alt        | `string`     | -       | Alternative text for accessibility     |
| className  | `string`     | -       | Additional CSS classes                 |
| uint8Array | `Uint8Array` | -       | Raw image data (not used in rendering) |

## Examples

### Example 1: PNG Image

```tsx
<Image base64="iVBORw0KGgoAAAANSUhEUgAAAAUA..." mediaType="image/png" alt="AI-generated diagram" />
```

**Visual:**

> A rounded PNG image.

### Example 2: JPEG Photo

```tsx
<Image base64="/9j/4AAQSkZJRgABAQAAAQABAAD..." mediaType="image/jpeg" alt="AI-generated portrait" />
```

**Visual:**

> A rounded JPEG photograph.

### Example 3: Custom Styling

```tsx
<Image
  base64="iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  mediaType="image/png"
  alt="Thumbnail"
  className="size-32 object-cover"
/>
```

**Visual:**

> A small 32x32 pixel image with object-cover cropping.

## Notes

- The component constructs a data URL in format: `data:{mediaType};base64,{base64}`
- Images are automatically rounded with `rounded-md` class
- Default styling includes `h-auto` and `max-w-full` for responsive behavior
- The `uint8Array` prop is accepted but not used in rendering (for compatibility with `Experimental_GeneratedImage` type)
- Always provide meaningful `alt` text for accessibility
