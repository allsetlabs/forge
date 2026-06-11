# Plan

Collapsible plan card component with streaming support and shimmer effects.

## Import

```tsx
import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanAction,
  PlanContent,
  PlanFooter,
  PlanTrigger,
} from '@allsetlabs/forge/components/ai-elements/plan';
```

## Features

- **Collapsible**: Expand/collapse plan details
- **Streaming Support**: Shimmer effect while plan is being generated
- **Card-Based Layout**: Clean header, content, and footer structure
- **Action Button**: Toggle visibility with chevron indicator

## Basic Usage

```tsx
<Plan>
  <PlanHeader>
    <PlanTitle>Build React App</PlanTitle>
    <PlanDescription>A step-by-step plan to create your application</PlanDescription>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <ol>
      <li>Set up project structure</li>
      <li>Install dependencies</li>
      <li>Create components</li>
    </ol>
  </PlanContent>
</Plan>
```

**Visual:**

> Card with title, description, and chevron button. Clicking chevron reveals ordered list of steps.

## Props

### Plan

| Prop        | Type      | Default | Description                              |
| ----------- | --------- | ------- | ---------------------------------------- |
| isStreaming | `boolean` | `false` | Show shimmer effect on title/description |

## Examples

### Example 1: Streaming Plan

```tsx
const [isStreaming, setIsStreaming] = useState(true);
const [plan, setPlan] = useState({ title: 'Creating plan', description: '' });

useEffect(() => {
  // Simulate streaming
  setTimeout(() => {
    setPlan({
      title: 'Build Authentication System',
      description: 'Implement secure user authentication',
    });
    setIsStreaming(false);
  }, 2000);
}, []);

<Plan isStreaming={isStreaming}>
  <PlanHeader>
    <PlanTitle>{plan.title}</PlanTitle>
    <PlanDescription>{plan.description}</PlanDescription>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <p>Plan steps will appear here...</p>
  </PlanContent>
</Plan>;
```

**Visual:**

> Title and description have animated shimmer effect while streaming, which stops when content is loaded.

### Example 2: With Footer

```tsx
<Plan>
  <PlanHeader>
    <PlanTitle>Database Migration</PlanTitle>
    <PlanDescription>Migrate to PostgreSQL</PlanDescription>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <ol>
      <li>Backup current data</li>
      <li>Set up PostgreSQL</li>
      <li>Migrate schema</li>
      <li>Import data</li>
    </ol>
  </PlanContent>
  <PlanFooter>
    <Button variant="outline" size="sm">
      Export Plan
    </Button>
  </PlanFooter>
</Plan>
```

**Visual:**

> Plan card with action button in footer for exporting the plan.

### Example 3: Controlled Collapse

```tsx
const [open, setOpen] = useState(false);

<Plan open={open} onOpenChange={setOpen}>
  <PlanHeader>
    <PlanTitle>Deployment Plan</PlanTitle>
    <PlanDescription>Deploy to production</PlanDescription>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <p>Deployment steps...</p>
  </PlanContent>
</Plan>

<Button onClick={() => setOpen(!open)}>
  {open ? 'Collapse' : 'Expand'} Plan
</Button>
```

**Visual:**

> External button controls the expand/collapse state.

### Example 4: Default Collapsed

```tsx
<Plan defaultOpen={false}>
  <PlanHeader>
    <PlanTitle>Optimization Plan</PlanTitle>
    <PlanDescription>Improve app performance</PlanDescription>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <p>Performance optimization steps...</p>
  </PlanContent>
</Plan>
```

**Visual:**

> Plan starts collapsed, user must click to expand.

## Notes

- Built on `Collapsible` component from radix-ui
- Title and description show shimmer animation when `isStreaming={true}`
- Shimmer uses the `Shimmer` component for animated gradient effect
- PlanTrigger shows chevrons-up-down icon
- PlanTrigger is icon-sized button with ghost variant
- PlanContent is wrapped in `CollapsibleContent` for animation
- Card has no shadow by default (`shadow-none`)
- PlanHeader uses flexbox to align title/description and action
- PlanFooter supports custom actions like export or share buttons
- All subcomponents use `data-slot` attributes for CSS targeting
- Description uses `text-balance` for better line wrapping
- PlanTrigger includes screen reader label "Toggle plan"
