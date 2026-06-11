# Queue

Display and manage task queues with collapsible sections, attachments, and status indicators.

## Import

```tsx
import {
  Queue,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
  QueueList,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
  QueueItemDescription,
  QueueItemActions,
  QueueItemAction,
  QueueItemAttachment,
  QueueItemImage,
  QueueItemFile,
} from '@allsetlabs/forge/components/ai-elements/queue';
```

## Features

- **Collapsible Sections**: Organize tasks into expandable groups
- **Status Indicators**: Visual dots for pending/completed states
- **Attachments**: Display images and file attachments
- **Actions**: Hover-revealed action buttons
- **Overflow Scrolling**: Scrollable list with max height

## Basic Usage

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={3} label="Pending Tasks" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Write documentation</QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Review pull request</QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Deploy to production</QueueItemContent>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Card with collapsible section showing "3 Pending Tasks" with chevron. Expanded list shows three tasks with status dots.

## Props

### QueueSection

| Prop        | Type      | Default | Description            |
| ----------- | --------- | ------- | ---------------------- |
| defaultOpen | `boolean` | `true`  | Initial expanded state |

### QueueSectionLabel

| Prop  | Type        | Default | Description                |
| ----- | ----------- | ------- | -------------------------- |
| count | `number`    | -       | Number of items in section |
| label | `string`    | -       | Section label text         |
| icon  | `ReactNode` | -       | Optional icon              |

### QueueItemIndicator

| Prop      | Type      | Default | Description          |
| --------- | --------- | ------- | -------------------- |
| completed | `boolean` | `false` | Show completed state |

### QueueItemContent

| Prop      | Type      | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| completed | `boolean` | `false` | Show strikethrough text |

### QueueItemDescription

| Prop      | Type      | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| completed | `boolean` | `false` | Show strikethrough text |

## Examples

### Example 1: With Completed Tasks

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={2} label="Completed" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator completed />
          <QueueItemContent completed>Fix bug #123</QueueItemContent>
        </QueueItem>
        <QueueItem>
          <QueueItemIndicator completed />
          <QueueItemContent completed>Update dependencies</QueueItemContent>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Completed tasks with strikethrough text and greyed-out indicators.

### Example 2: With Descriptions

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={1} label="In Progress" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Implement authentication</QueueItemContent>
          <QueueItemDescription>Add JWT-based auth with refresh tokens</QueueItemDescription>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Task with additional description text below the main content.

### Example 3: With Actions

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={2} label="Tasks" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Code review</QueueItemContent>
          <QueueItemActions>
            <QueueItemAction onClick={() => console.log('Edit')}>
              <EditIcon className="size-3" />
            </QueueItemAction>
            <QueueItemAction onClick={() => console.log('Delete')}>
              <TrashIcon className="size-3" />
            </QueueItemAction>
          </QueueItemActions>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Tasks with edit and delete buttons that appear on hover.

### Example 4: With Image Attachments

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={1} label="Design Tasks" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Review mockups</QueueItemContent>
          <QueueItemAttachment>
            <QueueItemImage src="/mockup1.png" alt="Mockup 1" />
            <QueueItemImage src="/mockup2.png" alt="Mockup 2" />
          </QueueItemAttachment>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Task with two thumbnail images displayed below.

### Example 5: With File Attachments

```tsx
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={1} label="Documentation" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Update README</QueueItemContent>
          <QueueItemAttachment>
            <QueueItemFile>installation.md</QueueItemFile>
            <QueueItemFile>configuration.md</QueueItemFile>
          </QueueItemAttachment>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Task with file badges showing paperclip icon and truncated filenames.

### Example 6: Multiple Sections

```tsx
<Queue>
  <QueueSection defaultOpen={true}>
    <QueueSectionTrigger>
      <QueueSectionLabel count={3} label="Pending" icon={<ClockIcon className="size-4" />} />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>{/* Pending tasks */}</QueueList>
    </QueueSectionContent>
  </QueueSection>

  <QueueSection defaultOpen={false}>
    <QueueSectionTrigger>
      <QueueSectionLabel count={5} label="Completed" icon={<CheckIcon className="size-4" />} />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>{/* Completed tasks */}</QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

**Visual:**

> Queue with two sections: "Pending" (open) with clock icon, "Completed" (closed) with check icon.

## Notes

- Queue container has card styling with border and rounded corners
- Sections are collapsible with chevron rotation animation
- Section triggers have muted background with hover effect
- Chevron rotates -90deg when closed, 0deg when open
- QueueList has max height of 10rem (max-h-40) with scrolling
- QueueItem has hover background effect
- Actions are hidden until item is hovered (opacity-0 to opacity-100)
- Indicators are small dots (size-2.5) with border
- Completed indicators are more transparent (muted-foreground/20)
- Item content truncates with line-clamp-1
- Item descriptions are smaller text (text-xs) with left margin
- Images are 32x32 pixels with rounded borders
- Files show paperclip icon with truncated filename (max-w-[100px])
- All text uses muted-foreground color for subtle appearance
