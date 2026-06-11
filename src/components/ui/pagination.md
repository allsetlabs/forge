# Pagination

A navigation component for dividing content across multiple pages.

## Import

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@allsetlabs/forge/components/ui/pagination';
```

## Features

- **Semantic Navigation**: Uses `<nav>` with `aria-label="pagination"` and `role="navigation"`
- **Active State**: Highlights current page with border and shadow
- **Accessible Controls**: Previous/Next buttons with proper ARIA labels
- **Ellipsis Support**: Built-in component for skipping page ranges
- **Hover States**: Interactive feedback with accent colors

## Basic Usage

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Props

### Pagination

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as `<nav>` with centered flex layout

### PaginationContent

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as `<ul>` with flex row layout and gap spacing

### PaginationItem

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as `<li>` for list structure

### PaginationLink

| Prop      | Type      | Default | Description                      |
| --------- | --------- | ------- | -------------------------------- |
| isActive  | `boolean` | `false` | Whether this is the current page |
| href      | `string`  | -       | Link destination                 |
| className | `string`  | -       | Additional CSS classes           |

> Renders as `<a>` with `aria-current="page"` when active

### PaginationPrevious

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| href      | `string` | -       | Link destination       |
| className | `string` | -       | Additional CSS classes |

> Extends `PaginationLink` with "Previous" text and left chevron icon

### PaginationNext

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| href      | `string` | -       | Link destination       |
| className | `string` | -       | Additional CSS classes |

> Extends `PaginationLink` with "Next" text and right chevron icon

### PaginationEllipsis

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Shows `<MoreHorizontal />` icon with screen reader text "More pages"

## Examples

### Full Pagination

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/4">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/5">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### With Ellipsis

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/4" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/5" isActive>
        5
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/6">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/20">20</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/6" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Controlled with State

```tsx
const [currentPage, setCurrentPage] = React.useState(1);
const totalPages = 10;

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(Math.max(1, currentPage - 1));
        }}
      />
    </PaginationItem>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          isActive={page === currentPage}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(page);
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(Math.min(totalPages, currentPage + 1));
        }}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

### Minimal (First/Last Only)

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        42
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">100</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Accessibility

- Uses `<nav>` with `role="navigation"` and `aria-label="pagination"`
- Active page has `aria-current="page"` for screen readers
- Previous/Next buttons have descriptive `aria-label` attributes
- Ellipsis is hidden from screen readers with `aria-hidden`
- All links have focus-visible ring for keyboard navigation
- Links meet minimum touch target size (h-9 = 36px)

## Notes

- Link height is fixed at `h-9` (36px) with minimum width `min-w-9`
- Active state adds border, background, and shadow for clear indication
- Hover state uses `bg-accent` and `text-accent-foreground`
- Previous button has left padding `pl-2.5`, Next has right padding `pr-2.5`
- Icons are sized at `h-4 w-4`
- Ellipsis centers the `<MoreHorizontal />` icon in a 9x9 container
- All transitions use `transition-colors` for smooth hover effects
