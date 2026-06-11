# Checkpoint

Bookmark-style checkpoint trigger with optional tooltip.

## Import

```tsx
import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from '@allsetlabs/forge/components/ai-elements/checkpoint';
```

## Features

- **Icon Support**: Default bookmark icon or custom children
- **Tooltip**: Optional tooltip on trigger button
- **Separator**: Built-in horizontal separator
- **Flexible**: Composable components for custom layouts

## Basic Usage

```tsx
<Checkpoint>
  <CheckpointTrigger onClick={handleSave}>
    <CheckpointIcon />
  </CheckpointTrigger>
</Checkpoint>
```

**Visual:**

> Muted checkpoint with bookmark icon button and horizontal separator.

## Props

### Checkpoint

| Prop      | Type                             | Default | Description            |
| --------- | -------------------------------- | ------- | ---------------------- |
| className | `string`                         | -       | Additional CSS classes |
| ...props  | `HTMLAttributes<HTMLDivElement>` | -       | All div props          |

### CheckpointIcon

| Prop      | Type          | Default | Description                     |
| --------- | ------------- | ------- | ------------------------------- |
| className | `string`      | -       | Additional CSS classes          |
| children  | `ReactNode`   | -       | Custom icon (overrides default) |
| ...props  | `LucideProps` | -       | All Lucide icon props           |

### CheckpointTrigger

| Prop      | Type                            | Default   | Description            |
| --------- | ------------------------------- | --------- | ---------------------- |
| tooltip   | `string`                        | -         | Tooltip text           |
| variant   | `ButtonVariant`                 | `'ghost'` | Button variant         |
| size      | `ButtonSize`                    | `'sm'`    | Button size            |
| className | `string`                        | -         | Additional CSS classes |
| ...props  | `ComponentProps<typeof Button>` | -         | All Button props       |

## Examples

### Example 1: Simple Checkpoint

```tsx
<Checkpoint>
  <CheckpointTrigger onClick={handleCheckpoint}>
    <CheckpointIcon />
  </CheckpointTrigger>
</Checkpoint>
```

**Visual:**

> Bookmark icon button with separator, muted color scheme.

### Example 2: With Tooltip

```tsx
<Checkpoint>
  <CheckpointTrigger tooltip="Save checkpoint" onClick={handleSave}>
    <CheckpointIcon />
  </CheckpointTrigger>
</Checkpoint>
```

**Visual:**

> Checkpoint with hover tooltip showing "Save checkpoint" on the bookmark icon.

### Example 3: Custom Icon

```tsx
import { Flag } from 'lucide-react';

<Checkpoint>
  <CheckpointTrigger tooltip="Mark milestone" onClick={handleMilestone}>
    <CheckpointIcon>
      <Flag className="size-4" />
    </CheckpointIcon>
  </CheckpointTrigger>
</Checkpoint>;
```

**Visual:**

> Flag icon instead of bookmark, with milestone tooltip.

### Example 4: Multiple Checkpoints

```tsx
import { Bookmark, Flag, Star } from 'lucide-react';

<div className="flex items-center gap-2">
  <Checkpoint>
    <CheckpointTrigger tooltip="Bookmark" onClick={handleBookmark}>
      <Bookmark className="size-4" />
    </CheckpointTrigger>
  </Checkpoint>

  <Checkpoint>
    <CheckpointTrigger tooltip="Flag" onClick={handleFlag}>
      <Flag className="size-4" />
    </CheckpointTrigger>
  </Checkpoint>

  <Checkpoint>
    <CheckpointTrigger tooltip="Star" onClick={handleStar}>
      <Star className="size-4" />
    </CheckpointTrigger>
  </Checkpoint>
</div>;
```

**Visual:**

> Three checkpoint buttons in a row, each with different icon and tooltip.

### Example 5: Without Tooltip

```tsx
<Checkpoint>
  <CheckpointTrigger onClick={handleCheckpoint} aria-label="Save checkpoint">
    <CheckpointIcon />
  </CheckpointTrigger>
</Checkpoint>
```

**Visual:**

> Checkpoint without tooltip, using aria-label for accessibility instead.

## Notes

- Default icon is `BookmarkIcon` from lucide-react
- Icon shrink-0 prevents sizing issues in flex containers
- Separator automatically added after checkpoint
- Tooltip automatically wraps trigger when provided
- Tooltip alignment: `start`, side: `bottom`
- Button defaults to ghost variant and small size
- Text color: muted-foreground for subtle appearance
- CheckpointIcon children override default bookmark icon
