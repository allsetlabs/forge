# Sources

Collapsible list of sources with count badge for displaying reference materials.

## Import

```tsx
import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from '@allsetlabs/forge/components/ai-elements/sources';
```

## Features

- **Collapsible**: Show/hide sources list with smooth animation
- **Count Badge**: Display total number of sources
- **External Links**: Open sources in new tabs with `rel="noreferrer"`
- **Icon Support**: Built-in book icon for each source

## Basic Usage

```tsx
<Sources>
  <SourcesTrigger count={3} />
  <SourcesContent>
    <Source href="https://example.com" title="Example Source" />
    <Source href="https://docs.example.com" title="Documentation" />
    <Source href="https://blog.example.com" title="Blog Post" />
  </SourcesContent>
</Sources>
```

**Visual:**

> A collapsible section showing "Used 3 sources" with chevron icon. When expanded, displays list of clickable source links with book icons.

## Props

### Sources

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### SourcesTrigger

| Prop      | Type      | Default | Description                  |
| --------- | --------- | ------- | ---------------------------- |
| count     | number    | -       | Number of sources (required) |
| className | string    | -       | Additional CSS classes       |
| children  | ReactNode | -       | Custom trigger content       |

### SourcesContent

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### Source

| Prop     | Type      | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| href     | string    | -       | Source URL            |
| title    | string    | -       | Source title/name     |
| children | ReactNode | -       | Custom source content |

## Examples

### Example 1: Research Sources

```tsx
<Sources>
  <SourcesTrigger count={4} />
  <SourcesContent>
    <Source href="https://wikipedia.org/ai" title="Wikipedia: Artificial Intelligence" />
    <Source href="https://arxiv.org/paper123" title="Research Paper on ML" />
    <Source href="https://github.com/project" title="GitHub Repository" />
    <Source href="https://docs.framework.com" title="Framework Documentation" />
  </SourcesContent>
</Sources>
```

**Visual:**

> "Used 4 sources" trigger expanding to show 4 academic/technical sources with book icons.

### Example 2: Custom Trigger

```tsx
<Sources>
  <SourcesTrigger count={2}>
    <div className="flex items-center gap-2">
      <LinkIcon className="size-4" />
      <span>View {2} references</span>
      <ChevronDownIcon className="size-4" />
    </div>
  </SourcesTrigger>
  <SourcesContent>
    <Source href="https://ref1.com" title="Reference 1" />
    <Source href="https://ref2.com" title="Reference 2" />
  </SourcesContent>
</Sources>
```

**Visual:**

> Custom trigger with link icon and "View 2 references" text.

### Example 3: Custom Source Rendering

```tsx
<Sources>
  <SourcesTrigger count={2} />
  <SourcesContent>
    <Source href="https://article.com" title="News Article">
      <div className="flex items-center gap-2">
        <NewspaperIcon className="size-4" />
        <span className="font-medium">News Article</span>
        <ExternalLinkIcon className="text-muted-foreground size-3" />
      </div>
    </Source>
    <Source href="https://video.com" title="Tutorial Video">
      <div className="flex items-center gap-2">
        <VideoIcon className="size-4" />
        <span className="font-medium">Tutorial Video</span>
        <ExternalLinkIcon className="text-muted-foreground size-3" />
      </div>
    </Source>
  </SourcesContent>
</Sources>
```

**Visual:**

> Custom rendered sources with different icons for different media types.

## Notes

- All source links open in new tabs (`target="_blank"`)
- Uses `rel="noreferrer"` for security
- Text color is primary for brand consistency
- Smooth expand/collapse animations via Radix UI
- Sources are displayed as vertical list with gap spacing
- Component uses Collapsible from Radix UI for accessibility
