# Breadcrumb

A navigation component that shows the current page's location within a hierarchical structure.

## Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@allsetlabs/forge/components/ui/breadcrumb';
```

## Features

- **Semantic Navigation**: Uses `<nav>` with `aria-label="breadcrumb"` for accessibility
- **Customizable Separators**: Default chevron separator or provide your own
- **Ellipsis Support**: Built-in component for truncating long breadcrumb trails
- **Router Integration**: Use `asChild` prop with React Router or Next.js Link
- **Current Page Indicator**: Dedicated component with proper ARIA attributes

## Basic Usage

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Props

### Breadcrumb

| Prop      | Type              | Default | Description                         |
| --------- | ----------------- | ------- | ----------------------------------- |
| separator | `React.ReactNode` | -       | Custom separator (currently unused) |
| className | `string`          | -       | Additional CSS classes              |

### BreadcrumbList

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as an ordered list (`<ol>`) with flex layout and gap spacing

### BreadcrumbItem

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as a list item (`<li>`) with inline flex layout

### BreadcrumbLink

| Prop      | Type      | Default | Description                                  |
| --------- | --------- | ------- | -------------------------------------------- |
| asChild   | `boolean` | `false` | Render as child component (for router links) |
| href      | `string`  | -       | Link destination                             |
| className | `string`  | -       | Additional CSS classes                       |

> Renders as `<a>` by default, or use `asChild` with Radix Slot for custom components

### BreadcrumbPage

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Renders as `<span>` with `aria-current="page"` and `aria-disabled="true"`

### BreadcrumbSeparator

| Prop      | Type              | Default            | Description              |
| --------- | ----------------- | ------------------ | ------------------------ |
| children  | `React.ReactNode` | `<ChevronRight />` | Custom separator content |
| className | `string`          | -                  | Additional CSS classes   |

> Renders as `<li>` with `role="presentation"` and `aria-hidden="true"`

### BreadcrumbEllipsis

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| className | `string` | -       | Additional CSS classes |

> Shows `<MoreHorizontal />` icon with screen reader text "More"

## Examples

### With React Router

```tsx
import { Link } from 'react-router-dom';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

### With Custom Separator

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Details</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Ellipsis

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/category">Category</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Long Breadcrumb Trail

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products/electronics/laptops">Laptops</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Accessibility

- Uses `<nav>` with `aria-label="breadcrumb"` for landmark navigation
- Ordered list (`<ol>`) provides semantic structure
- Current page has `aria-current="page"` and `aria-disabled="true"`
- Separators are hidden from screen readers with `aria-hidden="true"`
- Ellipsis includes screen reader text "More"
- Links have hover state with color transition

## Notes

- The list uses `text-sm` and `text-muted-foreground` for subtle appearance
- Gaps are responsive: `gap-1.5` on mobile, `gap-2.5` on small screens and up
- Links transition to `text-foreground` on hover
- Current page uses `font-normal` and `text-foreground` for emphasis
- Default separator is `<ChevronRight />` icon from lucide-react
- Separator icons are sized at `h-3.5 w-3.5`
