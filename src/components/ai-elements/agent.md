# Agent

Display AI agent configuration with tools, instructions, and output schema.

## Import

```tsx
import {
  Agent,
  AgentHeader,
  AgentContent,
  AgentInstructions,
  AgentTools,
  AgentTool,
  AgentOutput,
} from '@allsetlabs/forge/components/ai-elements/agent';
```

## Features

- **Model Display**: Show agent name and model with badge
- **Instructions**: Display agent instructions in muted container
- **Tools**: Collapsible accordion showing available tools with JSON schemas
- **Output Schema**: Display expected output format with syntax highlighting
- **Type-Safe**: Full TypeScript support with AI SDK types

## Basic Usage

```tsx
<Agent>
  <AgentHeader name="Research Agent" model="gpt-4" />
  <AgentContent>
    <AgentInstructions>
      You are a helpful research assistant that provides accurate information.
    </AgentInstructions>
  </AgentContent>
</Agent>
```

**Visual:**

> Bordered card with header showing bot icon, agent name "Research Agent", and model badge "gpt-4". Instructions displayed in muted background.

## Props

### Agent

| Prop      | Type                    | Default | Description            |
| --------- | ----------------------- | ------- | ---------------------- |
| className | `string`                | -       | Additional CSS classes |
| ...props  | `ComponentProps<'div'>` | -       | All div props          |

### AgentHeader

| Prop      | Type     | Default | Description            |
| --------- | -------- | ------- | ---------------------- |
| name      | `string` | -       | Agent name (required)  |
| model     | `string` | -       | Model name (optional)  |
| className | `string` | -       | Additional CSS classes |

### AgentInstructions

| Prop      | Type     | Default | Description                  |
| --------- | -------- | ------- | ---------------------------- |
| children  | `string` | -       | Instructions text (required) |
| className | `string` | -       | Additional CSS classes       |

### AgentTool

| Prop      | Type     | Default | Description                |
| --------- | -------- | ------- | -------------------------- |
| tool      | `Tool`   | -       | AI SDK Tool object         |
| value     | `string` | -       | Accordion value identifier |
| className | `string` | -       | Additional CSS classes     |

### AgentOutput

| Prop      | Type     | Default | Description              |
| --------- | -------- | ------- | ------------------------ |
| schema    | `string` | -       | TypeScript schema string |
| className | `string` | -       | Additional CSS classes   |

## Examples

### Example 1: Complete Agent with Tools

```tsx
import {
  Agent,
  AgentHeader,
  AgentContent,
  AgentInstructions,
  AgentTools,
  AgentTool,
} from '@allsetlabs/forge/components/ai-elements/agent';

const tools = [
  {
    name: 'searchWeb',
    description: 'Search the web for information',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
      },
    },
  },
];

<Agent>
  <AgentHeader name="Research Assistant" model="claude-3-opus" />
  <AgentContent>
    <AgentInstructions>
      You are a research assistant that helps find and summarize information.
    </AgentInstructions>
    <AgentTools type="multiple">
      {tools.map((tool, index) => (
        <AgentTool key={tool.name} tool={tool} value={`tool-${index}`} />
      ))}
    </AgentTools>
  </AgentContent>
</Agent>;
```

**Visual:**

> Agent card with header showing "Research Assistant" and model badge. Expandable accordion for each tool showing its JSON schema.

### Example 2: Agent with Output Schema

```tsx
<Agent>
  <AgentHeader name="Data Extractor" model="gpt-4-turbo" />
  <AgentContent>
    <AgentInstructions>Extract structured data from text.</AgentInstructions>
    <AgentOutput
      schema={`interface Output {
  name: string;
  email: string;
  phone?: string;
}`}
    />
  </AgentContent>
</Agent>
```

**Visual:**

> Agent card displaying instructions and TypeScript output schema with syntax highlighting.

## Notes

- Uses `BotIcon` from lucide-react for agent header
- Tool schemas support both `jsonSchema` and `inputSchema` properties
- Code blocks use syntax highlighting for JSON and TypeScript
- All components are memoized for performance
