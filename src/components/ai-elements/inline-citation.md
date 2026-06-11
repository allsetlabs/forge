# InlineCitation

Display inline source citations with hover cards showing detailed source information in a carousel.

## Import

```tsx
import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from '@allsetlabs/forge/components/ai-elements/inline-citation';
```

## Features

- **Inline Citations**: Clickable badges showing source hostnames
- **Hover Cards**: Preview source details on hover
- **Carousel Navigation**: Browse multiple sources with prev/next buttons
- **Source Metadata**: Display title, URL, description, and quotes
- **Multi-Source Support**: Show "+N" indicator for additional sources

## Basic Usage

```tsx
<InlineCitation>
  <InlineCitationText>According to research</InlineCitationText>
  <InlineCitationCard>
    <InlineCitationCardTrigger sources={['https://example.com']} />
    <InlineCitationCardBody>
      <InlineCitationSource
        title="Example Article"
        url="https://example.com"
        description="A detailed explanation..."
      />
    </InlineCitationCardBody>
  </InlineCitationCard>
</InlineCitation>
```

**Visual:**

> Text reading "According to research" followed by a badge showing "example.com" that reveals a hover card with source details.

## Props

### InlineCitationCardTrigger

| Prop    | Type       | Default | Description          |
| ------- | ---------- | ------- | -------------------- |
| sources | `string[]` | -       | Array of source URLs |

### InlineCitationSource

| Prop        | Type     | Default | Description        |
| ----------- | -------- | ------- | ------------------ |
| title       | `string` | -       | Source title       |
| url         | `string` | -       | Source URL         |
| description | `string` | -       | Source description |

## Examples

### Example 1: Multiple Sources with Carousel

```tsx
<InlineCitation>
  <InlineCitationText>Studies show that</InlineCitationText>
  <InlineCitationCard>
    <InlineCitationCardTrigger
      sources={['https://source1.com', 'https://source2.com', 'https://source3.com']}
    />
    <InlineCitationCardBody>
      <InlineCitationCarousel>
        <InlineCitationCarouselHeader>
          <InlineCitationCarouselPrev />
          <InlineCitationCarouselIndex />
          <InlineCitationCarouselNext />
        </InlineCitationCarouselHeader>
        <InlineCitationCarouselContent>
          <InlineCitationCarouselItem>
            <InlineCitationSource
              title="First Study"
              url="https://source1.com"
              description="First source description..."
            />
          </InlineCitationCarouselItem>
          <InlineCitationCarouselItem>
            <InlineCitationSource
              title="Second Study"
              url="https://source2.com"
              description="Second source description..."
            />
          </InlineCitationCarouselItem>
          <InlineCitationCarouselItem>
            <InlineCitationSource
              title="Third Study"
              url="https://source3.com"
              description="Third source description..."
            />
          </InlineCitationCarouselItem>
        </InlineCitationCarouselContent>
      </InlineCitationCarousel>
    </InlineCitationCardBody>
  </InlineCitationCard>
</InlineCitation>
```

**Visual:**

> Text with badge showing "source1.com +2". Hover card displays a carousel header with "1/3" counter and navigation arrows, showing source details.

### Example 2: With Quote

```tsx
<InlineCitation>
  <InlineCitationText>The study concluded</InlineCitationText>
  <InlineCitationCard>
    <InlineCitationCardTrigger sources={['https://journal.com']} />
    <InlineCitationCardBody>
      <InlineCitationSource
        title="Scientific Journal"
        url="https://journal.com/article"
        description="Research findings..."
      >
        <InlineCitationQuote>
          "The results demonstrate a significant correlation..."
        </InlineCitationQuote>
      </InlineCitationSource>
    </InlineCitationCardBody>
  </InlineCitationCard>
</InlineCitation>
```

**Visual:**

> Citation with hover card showing source info and an italicized, indented quote with a left border.

### Example 3: Custom Carousel Index

```tsx
<InlineCitationCarouselHeader>
  <InlineCitationCarouselPrev />
  <InlineCitationCarouselIndex>
    Source {current} of {total}
  </InlineCitationCarouselIndex>
  <InlineCitationCarouselNext />
</InlineCitationCarouselHeader>
```

**Visual:**

> Custom text displaying "Source 2 of 5" instead of "2/5".

## Notes

- Badge trigger shows first source hostname and "+N" for additional sources
- Hover cards have instant open/close (0ms delay)
- Carousel automatically tracks current index and total count
- Text with citation has hover effect (`group-hover:bg-accent`)
- Sources array must not be empty, displays "unknown" if no valid source
- Carousel navigation is keyboard accessible
- Quote component uses italic styling with left border
