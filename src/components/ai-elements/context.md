# Context

Display model context usage with token counts and cost calculations.

## Import

```tsx
import {
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextContentFooter,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextCacheUsage,
} from '@allsetlabs/forge/components/ai-elements/context';
```

## Features

- **Token Tracking**: Display used vs max tokens with percentage
- **Cost Calculation**: Automatic cost calculation using tokenlens
- **Usage Breakdown**: Separate input, output, reasoning, and cache usage
- **Visual Progress**: Circular icon and progress bar
- **Hover Card**: Detailed breakdown on hover
- **AI SDK Integration**: Works with LanguageModelUsage types

## Basic Usage

```tsx
<Context usedTokens={5000} maxTokens={8000} modelId="gpt-4">
  <ContextTrigger />
  <ContextContent>
    <ContextContentHeader />
    <ContextContentBody>
      <ContextInputUsage />
      <ContextOutputUsage />
    </ContextContentBody>
    <ContextContentFooter />
  </ContextContent>
</Context>
```

**Visual:**

> Button showing "62.5%" with circular progress icon. Hover reveals card with token counts, progress bar, and cost breakdown.

## Props

### Context

| Prop       | Type                               | Default | Description                      |
| ---------- | ---------------------------------- | ------- | -------------------------------- |
| usedTokens | `number`                           | -       | Number of tokens used (required) |
| maxTokens  | `number`                           | -       | Maximum token limit (required)   |
| usage      | `LanguageModelUsage`               | -       | Detailed usage breakdown         |
| modelId    | `string`                           | -       | Model ID for cost calculation    |
| ...props   | `ComponentProps<typeof HoverCard>` | -       | HoverCard props                  |

### ContextTrigger

| Prop     | Type                            | Default | Description            |
| -------- | ------------------------------- | ------- | ---------------------- |
| children | `ReactNode`                     | -       | Custom trigger content |
| ...props | `ComponentProps<typeof Button>` | -       | Button props           |

## Examples

### Example 1: Complete Context Display

```tsx
<Context
  usedTokens={6500}
  maxTokens={8000}
  usage={{
    inputTokens: 4000,
    outputTokens: 2000,
    reasoningTokens: 500,
    cachedInputTokens: 1000,
  }}
  modelId="gpt-4-turbo"
>
  <ContextTrigger />
  <ContextContent>
    <ContextContentHeader />
    <ContextContentBody>
      <ContextInputUsage />
      <ContextOutputUsage />
      <ContextReasoningUsage />
      <ContextCacheUsage />
    </ContextContentBody>
    <ContextContentFooter />
  </ContextContent>
</Context>
```

**Visual:**

> Hover card showing 81.25% usage, 6.5K / 8K tokens, progress bar, breakdown of input/output/reasoning/cache tokens with costs, and total cost footer.

### Example 2: Simple Token Display

```tsx
<Context usedTokens={3000} maxTokens={4000}>
  <ContextTrigger />
  <ContextContent>
    <ContextContentHeader />
  </ContextContent>
</Context>
```

**Visual:**

> Minimal hover card showing only percentage, token count, and progress bar.

### Example 3: Custom Trigger

```tsx
<Context usedTokens={2000} maxTokens={8000} modelId="gpt-4">
  <ContextTrigger>
    <Button variant="outline">Token Usage</Button>
  </ContextTrigger>
  <ContextContent>
    <ContextContentHeader />
    <ContextContentBody>
      <ContextInputUsage />
      <ContextOutputUsage />
    </ContextContentBody>
    <ContextContentFooter />
  </ContextContent>
</Context>
```

**Visual:**

> Custom "Token Usage" button that reveals hover card with full breakdown.

### Example 4: Without Cost Calculation

```tsx
<Context usedTokens={1500} maxTokens={4000}>
  <ContextTrigger />
  <ContextContent>
    <ContextContentHeader />
    <ContextContentBody>
      <ContextInputUsage />
      <ContextOutputUsage />
    </ContextContentBody>
  </ContextContent>
</Context>
```

**Visual:**

> Context display without modelId shows $0.00 for costs (no calculation).

## Usage Components

Each usage component automatically:

- Shows token count with compact notation (e.g., "4K", "2.5K")
- Calculates and displays cost when modelId provided
- Hides when token count is 0
- Accepts custom children to override default display

```tsx
<ContextInputUsage />      // Input tokens with cost
<ContextOutputUsage />     // Output tokens with cost
<ContextReasoningUsage />  // Reasoning tokens with cost (if available)
<ContextCacheUsage />      // Cached tokens with cost (if available)
```

## Cost Calculation

Uses `tokenlens` library to calculate costs:

```tsx
import { getUsage } from 'tokenlens';

const cost = getUsage({
  modelId: 'gpt-4-turbo',
  usage: {
    input: 4000,
    output: 2000,
  },
}).costUSD?.totalUSD;
```

## Visual Components

### Circular Icon

Shows usage as circular progress indicator:

- Outer circle: 25% opacity (track)
- Inner circle: 70% opacity (progress)
- Stroke dasharray/offset for progress arc
- Rotated -90deg to start at top

### Progress Bar

Standard progress bar component:

- Shows percentage from 0-100%
- Uses muted background
- Primary color for filled portion

## Notes

- Default trigger shows percentage and circular icon
- Header shows percentage, token count, and progress bar
- Body shows individual usage breakdowns
- Footer shows total cost in USD
- All numbers formatted with Intl.NumberFormat
- Token counts use compact notation (K, M, B)
- Percentages shown with max 1 decimal place
- Costs formatted as USD currency
- Context shared via React context
- HoverCard opens/closes with 0ms delay
- Usage components return null when count is 0
- Requires tokenlens package for cost calculation
