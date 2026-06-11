# ChainOfThought

Display AI reasoning process with collapsible steps and search results.

## Import

```tsx
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  ChainOfThoughtSearchResults,
  ChainOfThoughtSearchResult,
  ChainOfThoughtImage,
} from '@allsetlabs/forge/components/ai-elements/chain-of-thought';
```

## Features

- **Collapsible**: Toggle visibility of reasoning steps
- **Status Tracking**: Active, complete, and pending states
- **Custom Icons**: Use any Lucide icon for steps
- **Search Results**: Display search results as badges
- **Images**: Show images with captions in reasoning
- **Animations**: Smooth slide-in animations for steps

## Basic Usage

```tsx
<ChainOfThought defaultOpen={false}>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep label="Analyzing question" status="complete" />
    <ChainOfThoughtStep label="Searching for information" status="active" />
  </ChainOfThoughtContent>
</ChainOfThought>
```

**Visual:**

> Collapsible section with brain icon header. Expandable to show reasoning steps with connection lines.

## Props

### ChainOfThought

| Prop         | Type       | Default | Description                |
| ------------ | ---------- | ------- | -------------------------- |
| open         | `boolean`  | -       | Controlled open state      |
| defaultOpen  | `boolean`  | `false` | Default open state         |
| onOpenChange | `function` | -       | Open state change callback |
| className    | `string`   | -       | Additional CSS classes     |

### ChainOfThoughtStep

| Prop        | Type                                      | Default      | Description            |
| ----------- | ----------------------------------------- | ------------ | ---------------------- |
| label       | `ReactNode`                               | -            | Step label (required)  |
| description | `ReactNode`                               | -            | Step description       |
| icon        | `LucideIcon`                              | `DotIcon`    | Icon for step          |
| status      | `'complete'` \| `'active'` \| `'pending'` | `'complete'` | Step status            |
| className   | `string`                                  | -            | Additional CSS classes |

### ChainOfThoughtImage

| Prop      | Type        | Default | Description            |
| --------- | ----------- | ------- | ---------------------- |
| caption   | `string`    | -       | Image caption          |
| className | `string`    | -       | Additional CSS classes |
| children  | `ReactNode` | -       | Image element          |

## Examples

### Example 1: Research Process

```tsx
import { Search, Database, FileText } from 'lucide-react';

<ChainOfThought defaultOpen={true}>
  <ChainOfThoughtHeader>Research Process</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={Search}
      label="Searching databases"
      description="Querying academic papers and articles"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>10 papers found</ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>5 articles found</ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>

    <ChainOfThoughtStep
      icon={Database}
      label="Analyzing data"
      description="Processing and filtering results"
      status="active"
    />

    <ChainOfThoughtStep icon={FileText} label="Generating summary" status="pending" />
  </ChainOfThoughtContent>
</ChainOfThought>;
```

**Visual:**

> Expanded reasoning with search icon steps showing complete, active, and pending states. Search results shown as secondary badges.

### Example 2: Image Analysis

```tsx
<ChainOfThought>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep label="Analyzing image content" status="complete">
      <ChainOfThoughtImage caption="Detected: Person, Car, Building">
        <img src="/analyzed-image.jpg" alt="Analysis" className="w-full" />
      </ChainOfThoughtImage>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>
```

**Visual:**

> Reasoning step with image preview in rounded container and caption below.

### Example 3: Multi-Step Search

```tsx
<ChainOfThought>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep label="Query formulation" status="complete">
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>machine learning</ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>neural networks</ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>AI applications</ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>

    <ChainOfThoughtStep
      label="Cross-referencing sources"
      description="Validating information across multiple databases"
      status="active"
    />
  </ChainOfThoughtContent>
</ChainOfThought>
```

**Visual:**

> Research steps with search term badges wrapped in results container.

### Example 4: Controlled State

```tsx
const [isOpen, setIsOpen] = useState(false);

<ChainOfThought open={isOpen} onOpenChange={setIsOpen}>
  <ChainOfThoughtHeader>
    <span>Analysis Steps</span>
  </ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep label="Step 1" status="complete" />
    <ChainOfThoughtStep label="Step 2" status="active" />
  </ChainOfThoughtContent>
</ChainOfThought>;
```

**Visual:**

> Controlled chain of thought with external state management.

## Status Styling

- **complete**: Muted foreground color
- **active**: Full foreground color (prominent)
- **pending**: Very muted foreground (50% opacity)

## Notes

- Header defaults to "Chain of Thought" with brain icon
- Steps show vertical connecting line between items
- All steps animate in with fade and slide effects
- Search results wrap and display as secondary badges
- Images limited to max height of 22rem (352px)
- All components memoized for performance
- Uses Radix UI Collapsible for accessibility
- Chevron icon rotates based on open/closed state
