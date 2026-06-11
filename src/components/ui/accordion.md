# Accordion

A vertically stacked set of expandable/collapsible content sections.

## Import

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@allsetlabs/forge/components/ui/accordion';
```

## Features

- **Collapsible Sections**: Expand and collapse content sections with smooth animations
- **Chevron Indicator**: Animated chevron icon rotates when sections open/close
- **Keyboard Navigation**: Full keyboard support via Radix UI primitives
- **Single or Multiple**: Can configure to allow one or multiple sections open at once
- **Accessible**: Built on Radix UI with ARIA attributes

## Basic Usage

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that you can customize.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Props

### Accordion

Based on `@radix-ui/react-accordion` Root component. Key props:

| Prop          | Type                     | Default | Description                                        |
| ------------- | ------------------------ | ------- | -------------------------------------------------- |
| type          | `"single" \| "multiple"` | -       | Whether one or multiple items can be open          |
| collapsible   | boolean                  | -       | Whether all items can be closed (single type only) |
| defaultValue  | string \| string[]       | -       | Initially open item(s)                             |
| value         | string \| string[]       | -       | Controlled open item(s)                            |
| onValueChange | function                 | -       | Callback when open items change                    |

### AccordionItem

| Prop      | Type    | Default | Description                     |
| --------- | ------- | ------- | ------------------------------- |
| value     | string  | -       | Unique identifier for this item |
| disabled  | boolean | false   | Whether this item is disabled   |
| className | string  | -       | Additional CSS classes          |

### AccordionTrigger

| Prop      | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| children  | ReactNode | -       | Content to display (e.g., question text) |
| className | string    | -       | Additional CSS classes                   |

> The trigger automatically includes a chevron icon that rotates when expanded.

### AccordionContent

| Prop      | Type      | Default | Description                                   |
| --------- | --------- | ------- | --------------------------------------------- |
| children  | ReactNode | -       | Content to show when expanded                 |
| className | string    | -       | Additional CSS classes (applied to inner div) |

## Examples

### Single Collapsible Accordion

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="faq-1">
    <AccordionTrigger>What is this component?</AccordionTrigger>
    <AccordionContent>A collapsible accordion built with Radix UI.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Open Items

```tsx
<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Section 3</AccordionTrigger>
    <AccordionContent>Content 3</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlled Accordion

```tsx
const [openItem, setOpenItem] = useState<string>('item-1');

<Accordion type="single" value={openItem} onValueChange={setOpenItem}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Controlled Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Controlled Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>;
```

## Accessibility

- Implements WAI-ARIA accordion pattern
- Full keyboard navigation (Space/Enter to toggle, Arrow keys to navigate)
- Screen reader announcements for state changes
- Focus management handled automatically
- Each item has proper ARIA attributes

## Notes

- Each `AccordionItem` must have a unique `value` prop
- The accordion uses `data-[state=open]` and `data-[state=closed]` attributes for animations
- Animations are defined in Tailwind config (`accordion-up`, `accordion-down`)
- Items have bottom borders by default (`border-border`)
- Chevron icon is from `lucide-react`
