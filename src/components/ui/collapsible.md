# Collapsible

A component for showing and hiding content sections with smooth animations.

## Import

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@allsetlabs/forge/components/ui/collapsible';
```

## Features

- **Expandable/Collapsible Sections**: Toggle visibility of content with smooth animations
- **Controlled or Uncontrolled**: Can be used with or without external state management
- **Accessible**: Built on Radix UI with full keyboard navigation and screen reader support
- **Flexible Trigger**: Any element can be used as a trigger button

## Basic Usage

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@allsetlabs/forge/components/ui/collapsible';
import { Button } from '@allsetlabs/forge/components/ui/button';

function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Section</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4">This content can be shown or hidden.</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## Props

### Collapsible

| Prop           | Type                      | Default | Description                      |
| -------------- | ------------------------- | ------- | -------------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state            |
| `defaultOpen`  | `boolean`                 | `false` | Uncontrolled default open state  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes |
| `disabled`     | `boolean`                 | `false` | Prevents interaction when true   |

### CollapsibleTrigger

| Prop      | Type      | Default | Description                                                  |
| --------- | --------- | ------- | ------------------------------------------------------------ |
| `asChild` | `boolean` | `false` | Merge props onto child element instead of rendering a button |

### CollapsibleContent

| Prop         | Type      | Default | Description                              |
| ------------ | --------- | ------- | ---------------------------------------- |
| `forceMount` | `boolean` | `false` | Force mount the content even when closed |

## Examples

### Uncontrolled (Default)

```tsx
<Collapsible defaultOpen={false}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Show more details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4 text-sm text-neutral-700 dark:text-neutral-300">
      Additional details that can be collapsed.
    </div>
  </CollapsibleContent>
</Collapsible>
```

### Controlled with State

```tsx
const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center justify-between">
    <h4 className="text-sm font-semibold">Advanced Settings</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="sm">
        {isOpen ? 'Hide' : 'Show'}
      </Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>
    <div className="space-y-2 pt-4">
      <p className="text-sm">Setting 1</p>
      <p className="text-sm">Setting 2</p>
      <p className="text-sm">Setting 3</p>
    </div>
  </CollapsibleContent>
</Collapsible>;
```

### FAQ Section

```tsx
<div className="space-y-4">
  {faqs.map((faq) => (
    <Collapsible key={faq.id}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-neutral-200 p-4 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
        <span className="font-medium">{faq.question}</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 text-sm text-neutral-700 dark:text-neutral-300">{faq.answer}</div>
      </CollapsibleContent>
    </Collapsible>
  ))}
</div>
```

### Disabled State

```tsx
<Collapsible disabled>
  <CollapsibleTrigger asChild>
    <Button variant="outline" disabled>
      Cannot toggle
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>This content cannot be revealed.</CollapsibleContent>
</Collapsible>
```

## Accessibility

- **Keyboard Navigation**: Space/Enter to toggle, Tab to move between triggers
- **ARIA Attributes**: Automatically manages `aria-expanded` and `aria-controls`
- **Screen Reader Support**: Content state changes are announced
- **Focus Management**: Maintains logical focus order

## Notes

- Built on top of `@radix-ui/react-collapsible` for robust accessibility
- Content animates smoothly when expanding/collapsing
- Use `asChild` prop on trigger to compose with custom button components
- The trigger can be placed anywhere within the Collapsible component
- Multiple CollapsibleContent sections are supported per Collapsible
