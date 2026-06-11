# Table

A responsive table component for displaying tabular data.

## Import

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@allsetlabs/forge/components/ui/table';
```

## Features

- **Responsive**: Horizontal scroll on overflow for small screens
- **Semantic HTML**: Uses proper table elements (thead, tbody, tfoot, th, td)
- **Row States**: Hover states and selected state support
- **Flexible Layout**: Caption and footer support
- **Checkbox Support**: Special styling for checkbox columns

## Basic Usage

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Props

### Table

| Prop      | Type      | Default | Description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| children  | ReactNode | -       | Table sections (Header, Body, Footer, Caption) |
| className | string    | -       | Additional CSS classes                         |

> Table is wrapped in a scrollable container by default.

### TableHeader

| Prop      | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| children  | ReactNode | -       | TableRow components with TableHead cells |
| className | string    | -       | Additional CSS classes                   |

### TableBody

| Prop      | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| children  | ReactNode | -       | TableRow components with TableCell cells |
| className | string    | -       | Additional CSS classes                   |

### TableFooter

| Prop      | Type      | Default | Description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| children  | ReactNode | -       | TableRow components (typically totals/summary) |
| className | string    | -       | Additional CSS classes                         |

> Footer has border-top and muted background by default.

### TableRow

| Prop       | Type         | Default | Description                         |
| ---------- | ------------ | ------- | ----------------------------------- |
| children   | ReactNode    | -       | TableHead or TableCell components   |
| className  | string       | -       | Additional CSS classes              |
| data-state | `"selected"` | -       | Selected state for row highlighting |

### TableHead

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| children  | ReactNode | -       | Header cell content    |
| className | string    | -       | Additional CSS classes |

> Uses muted foreground color and medium font weight.

### TableCell

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| children  | ReactNode | -       | Cell content           |
| className | string    | -       | Additional CSS classes |

### TableCaption

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| children  | ReactNode | -       | Caption text           |
| className | string    | -       | Additional CSS classes |

> Rendered below the table with muted text color.

## Examples

### Simple Data Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>jane@example.com</TableCell>
      <TableCell>User</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Table with Footer

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead className="text-right">Quantity</TableHead>
      <TableHead className="text-right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Widget A</TableCell>
      <TableCell className="text-right">5</TableCell>
      <TableCell className="text-right">$50.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Widget B</TableCell>
      <TableCell className="text-right">3</TableCell>
      <TableCell className="text-right">$30.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell className="text-right">8</TableCell>
      <TableCell className="text-right">$80.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Table with Selectable Rows

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox />
      </TableHead>
      <TableHead>Task</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell>
        <Checkbox checked />
      </TableCell>
      <TableCell>Complete project</TableCell>
      <TableCell>In Progress</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>Review code</TableCell>
      <TableCell>Pending</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Responsive Table with Right-Aligned Numbers

```tsx
<Table>
  <TableCaption>Sales report for Q4 2024</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Month</TableHead>
      <TableHead className="text-right">Revenue</TableHead>
      <TableHead className="text-right">Growth</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>October</TableCell>
      <TableCell className="text-right">$25,000</TableCell>
      <TableCell className="text-right">+12%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>November</TableCell>
      <TableCell className="text-right">$28,000</TableCell>
      <TableCell className="text-right">+15%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>December</TableCell>
      <TableCell className="text-right">$32,000</TableCell>
      <TableCell className="text-right">+18%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Accessibility

- Uses semantic HTML table elements
- Header cells use `<th>` instead of `<td>`
- Caption provides context for screen readers
- Row selection state properly indicated via `data-state`
- Horizontal scroll preserves content on mobile

## Notes

- Table container has `overflow-auto` for responsive scrolling
- All rows have bottom borders except the last row in body
- Rows have hover state (`hover:bg-muted/50`)
- Selected rows have background (`data-[state=selected]:bg-muted`)
- Checkbox columns have special spacing (no right padding)
- Caption appears below table with margin-top
- Footer has muted background and top border
- Text size is `text-sm` by default
- Headers are left-aligned by default (use `text-right` for numbers)
