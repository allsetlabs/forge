# Artifact

Container for displaying generated artifacts with header, actions, and content area.

## Import

```tsx
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactActions,
  ArtifactAction,
  ArtifactClose,
  ArtifactContent,
} from '@allsetlabs/forge/components/ai-elements/artifact';
```

## Features

- **Header with Actions**: Title, description, and action buttons
- **Tooltip Support**: Optional tooltips for action buttons
- **Flexible Layout**: Composable components for custom layouts
- **Icon Support**: Accepts Lucide icons for actions
- **Close Button**: Built-in close functionality with icon

## Basic Usage

```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Generated Chart</ArtifactTitle>
    <ArtifactClose onClick={handleClose} />
  </ArtifactHeader>
  <ArtifactContent>{/* Your artifact content */}</ArtifactContent>
</Artifact>
```

**Visual:**

> Rounded border card with muted header, title text, and close button. Content area with overflow scroll.

## Props

### Artifact

| Prop      | Type                             | Default | Description            |
| --------- | -------------------------------- | ------- | ---------------------- |
| className | `string`                         | -       | Additional CSS classes |
| ...props  | `HTMLAttributes<HTMLDivElement>` | -       | All div props          |

### ArtifactHeader

| Prop      | Type                             | Default | Description            |
| --------- | -------------------------------- | ------- | ---------------------- |
| className | `string`                         | -       | Additional CSS classes |
| ...props  | `HTMLAttributes<HTMLDivElement>` | -       | All div props          |

### ArtifactTitle

| Prop      | Type                                   | Default | Description            |
| --------- | -------------------------------------- | ------- | ---------------------- |
| className | `string`                               | -       | Additional CSS classes |
| ...props  | `HTMLAttributes<HTMLParagraphElement>` | -       | All p props            |

### ArtifactAction

| Prop      | Type         | Default   | Description               |
| --------- | ------------ | --------- | ------------------------- |
| tooltip   | `string`     | -         | Tooltip text              |
| label     | `string`     | -         | Accessibility label       |
| icon      | `LucideIcon` | -         | Icon component to display |
| size      | `'sm'`       | `'sm'`    | Button size               |
| variant   | `'ghost'`    | `'ghost'` | Button variant            |
| className | `string`     | -         | Additional CSS classes    |

### ArtifactClose

| Prop      | Type      | Default   | Description            |
| --------- | --------- | --------- | ---------------------- |
| size      | `'sm'`    | `'sm'`    | Button size            |
| variant   | `'ghost'` | `'ghost'` | Button variant         |
| className | `string`  | -         | Additional CSS classes |

## Examples

### Example 1: Artifact with Actions

```tsx
import { Copy, Download, Share } from 'lucide-react';

<Artifact>
  <ArtifactHeader>
    <div>
      <ArtifactTitle>Data Visualization</ArtifactTitle>
      <ArtifactDescription>Sales data from Q4 2024</ArtifactDescription>
    </div>
    <ArtifactActions>
      <ArtifactAction icon={Copy} tooltip="Copy to clipboard" onClick={handleCopy} />
      <ArtifactAction icon={Download} tooltip="Download" onClick={handleDownload} />
      <ArtifactAction icon={Share} tooltip="Share" onClick={handleShare} />
      <ArtifactClose onClick={handleClose} />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <ChartComponent data={salesData} />
  </ArtifactContent>
</Artifact>;
```

**Visual:**

> Artifact with title, description, three action buttons with tooltips, and close button. Chart displayed in content area.

### Example 2: Simple Code Artifact

```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>function.ts</ArtifactTitle>
    <ArtifactClose onClick={handleClose} />
  </ArtifactHeader>
  <ArtifactContent>
    <CodeBlock code={generatedCode} language="typescript" />
  </ArtifactContent>
</Artifact>
```

**Visual:**

> Artifact with filename title and close button. Code displayed with syntax highlighting.

### Example 3: Custom Actions

```tsx
<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Analysis Results</ArtifactTitle>
    <ArtifactActions>
      <ArtifactAction label="Regenerate" onClick={handleRegenerate}>
        <RefreshIcon className="size-4" />
      </ArtifactAction>
      <ArtifactClose />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent className="prose">
    <p>{analysisResults}</p>
  </ArtifactContent>
</Artifact>
```

**Visual:**

> Artifact with custom regenerate action and close button. Analysis text in content area.

## Notes

- Close button defaults to X icon if children not provided
- Action buttons are icon-only with sr-only labels for accessibility
- Tooltips automatically wrap action buttons when provided
- Content area has `flex-1 overflow-auto` for scrollable content
- Header has muted background for visual separation
