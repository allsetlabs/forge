# Attachments

Display file and source document attachments with preview, info, and remove functionality.

## Import

```tsx
import {
  Attachments,
  Attachment,
  AttachmentPreview,
  AttachmentInfo,
  AttachmentRemove,
  AttachmentHoverCard,
  AttachmentHoverCardTrigger,
  AttachmentHoverCardContent,
  AttachmentEmpty,
  getMediaCategory,
  getAttachmentLabel,
} from '@allsetlabs/forge/components/ai-elements/attachments';
```

## Features

- **Three Variants**: Grid, inline, and list display modes
- **Media Preview**: Image and video previews with fallback icons
- **Hover Cards**: Preview attachments on hover
- **Remove Support**: Optional remove button with callback
- **Type Detection**: Automatic media type categorization
- **Context-Aware**: Components share state via context

## Basic Usage

```tsx
<Attachments variant="grid">
  {files.map((file) => (
    <Attachment key={file.id} data={file} onRemove={() => handleRemove(file.id)}>
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  ))}
</Attachments>
```

**Visual:**

> Grid of 96x96px attachment thumbnails with preview images and hover-visible remove button.

## Props

### Attachments

| Prop      | Type                               | Default  | Description            |
| --------- | ---------------------------------- | -------- | ---------------------- |
| variant   | `'grid'` \| `'inline'` \| `'list'` | `'grid'` | Display variant        |
| className | `string`                           | -        | Additional CSS classes |

### Attachment

| Prop      | Type             | Default | Description                  |
| --------- | ---------------- | ------- | ---------------------------- |
| data      | `AttachmentData` | -       | File or source document data |
| onRemove  | `() => void`     | -       | Remove callback (optional)   |
| className | `string`         | -       | Additional CSS classes       |

### AttachmentPreview

| Prop         | Type        | Default | Description            |
| ------------ | ----------- | ------- | ---------------------- |
| fallbackIcon | `ReactNode` | -       | Custom fallback icon   |
| className    | `string`    | -       | Additional CSS classes |

### AttachmentInfo

| Prop          | Type      | Default | Description                |
| ------------- | --------- | ------- | -------------------------- |
| showMediaType | `boolean` | `false` | Show media type below name |
| className     | `string`  | -       | Additional CSS classes     |

### AttachmentRemove

| Prop      | Type     | Default    | Description            |
| --------- | -------- | ---------- | ---------------------- |
| label     | `string` | `'Remove'` | Accessibility label    |
| className | `string` | -          | Additional CSS classes |

## Examples

### Example 1: Grid Layout

```tsx
<Attachments variant="grid">
  {attachments.map((attachment) => (
    <Attachment key={attachment.id} data={attachment} onRemove={() => handleRemove(attachment.id)}>
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  ))}
</Attachments>
```

**Visual:**

> Grid of square thumbnails showing image previews or file icons. Remove button appears on hover.

### Example 2: Inline Layout

```tsx
<Attachments variant="inline">
  {attachments.map((attachment) => (
    <Attachment key={attachment.id} data={attachment} onRemove={() => handleRemove(attachment.id)}>
      <AttachmentPreview />
      <AttachmentInfo />
      <AttachmentRemove />
    </Attachment>
  ))}
</Attachments>
```

**Visual:**

> Horizontal row of pill-shaped attachments with small previews and filenames.

### Example 3: List Layout with Hover Card

```tsx
<Attachments variant="list">
  {attachments.map((attachment) => (
    <AttachmentHoverCard key={attachment.id}>
      <AttachmentHoverCardTrigger>
        <Attachment data={attachment} onRemove={() => handleRemove(attachment.id)}>
          <AttachmentPreview />
          <AttachmentInfo showMediaType />
          <AttachmentRemove />
        </Attachment>
      </AttachmentHoverCardTrigger>
      <AttachmentHoverCardContent>
        <img src={attachment.url} alt={attachment.filename} className="max-w-xs" />
      </AttachmentHoverCardContent>
    </AttachmentHoverCard>
  ))}
</Attachments>
```

**Visual:**

> Full-width list items with large icons, filename, media type, and remove button. Preview appears on hover.

### Example 4: Empty State

```tsx
<Attachments variant="grid">
  {attachments.length === 0 ? <AttachmentEmpty>No files attached</AttachmentEmpty> : null}
</Attachments>
```

**Visual:**

> Centered empty state message when no attachments present.

### Example 5: Using Utility Functions

```tsx
const category = getMediaCategory(attachment);
const label = getAttachmentLabel(attachment);

console.log(category); // 'image', 'video', 'audio', 'document', 'source', 'unknown'
console.log(label); // Filename or 'Image' fallback
```

## Types

```tsx
export type AttachmentData =
  | (FileUIPart & { id: string })
  | (SourceDocumentUIPart & { id: string });

export type AttachmentMediaCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'source'
  | 'unknown';

export type AttachmentVariant = 'grid' | 'inline' | 'list';
```

## Notes

- Grid variant: 96x96px square thumbnails
- Inline variant: 32px height pills with small icons
- List variant: Full-width rows with 48px icons
- Images and videos show previews; other types show category icons
- Remove button visibility controlled by variant (hover for grid/inline, always for list)
- Context automatically handles variant styling across children
- Supports both file attachments and source documents from AI SDK
