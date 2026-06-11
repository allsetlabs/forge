# Tool

Display AI tool invocations with status badges, input parameters, and output results.

## Import

```tsx
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from '@allsetlabs/forge/components/ai-elements/tool';
```

## Features

- **Status Badges**: Visual indicators for tool execution state
- **Collapsible**: Expand/collapse to show/hide details
- **Input Display**: Shows tool parameters as formatted JSON
- **Output Display**: Renders tool results (JSON, string, or React elements)
- **Error Handling**: Special styling for error states
- **AI SDK Integration**: Compatible with Vercel AI SDK ToolUIPart types

## Basic Usage

```tsx
<Tool defaultOpen>
  <ToolHeader type="tool-weather" state="output-available" title="Get Weather" />
  <ToolContent>
    <ToolInput input={{ city: 'San Francisco', units: 'celsius' }} />
    <ToolOutput output={{ temperature: 18, condition: 'Partly Cloudy' }} errorText={null} />
  </ToolContent>
</Tool>
```

**Visual:**

> Bordered collapsible card with "Get Weather" header showing green "Completed" badge. When expanded, shows input parameters and output result as formatted JSON.

## Props

### Tool

| Prop        | Type    | Default | Description            |
| ----------- | ------- | ------- | ---------------------- |
| defaultOpen | boolean | false   | Initial open state     |
| className   | string  | -       | Additional CSS classes |

### ToolHeader

| Prop      | Type              | Default | Description                       |
| --------- | ----------------- | ------- | --------------------------------- |
| title     | string            | -       | Custom tool title                 |
| type      | string            | -       | Tool type (e.g., 'tool-weather')  |
| state     | ToolPart['state'] | -       | Execution state (required)        |
| toolName  | string            | -       | Tool name (for dynamic-tool type) |
| className | string            | -       | Additional CSS classes            |

### ToolInput

| Prop      | Type              | Default | Description                      |
| --------- | ----------------- | ------- | -------------------------------- |
| input     | ToolPart['input'] | -       | Tool input parameters (required) |
| className | string            | -       | Additional CSS classes           |

### ToolOutput

| Prop      | Type                  | Default | Description                  |
| --------- | --------------------- | ------- | ---------------------------- |
| output    | ToolPart['output']    | -       | Tool output result           |
| errorText | ToolPart['errorText'] | -       | Error message if tool failed |
| className | string                | -       | Additional CSS classes       |

## Tool States

| State              | Badge             | Description                           |
| ------------------ | ----------------- | ------------------------------------- |
| input-streaming    | Pending           | Tool input is being streamed          |
| input-available    | Running           | Tool has received input, executing    |
| output-available   | Completed         | Tool execution completed successfully |
| output-error       | Error             | Tool execution failed                 |
| output-denied      | Denied            | Tool execution was denied             |
| approval-requested | Awaiting Approval | Tool waiting for user approval        |
| approval-responded | Responded         | User responded to approval request    |

## Examples

### Example 1: Web Search Tool

```tsx
<Tool>
  <ToolHeader type="tool-search" state="output-available" title="Web Search" />
  <ToolContent>
    <ToolInput input={{ query: 'latest AI news', maxResults: 5 }} />
    <ToolOutput
      output={[
        { title: 'AI Breakthrough...', url: 'https://...' },
        { title: 'New Model Released...', url: 'https://...' },
      ]}
      errorText={null}
    />
  </ToolContent>
</Tool>
```

**Visual:**

> Web search tool showing query parameters and array of search results.

### Example 2: Error State

```tsx
<Tool defaultOpen>
  <ToolHeader type="tool-database" state="output-error" title="Database Query" />
  <ToolContent>
    <ToolInput input={{ query: 'SELECT * FROM users' }} />
    <ToolOutput output={null} errorText="Connection timeout: Unable to reach database" />
  </ToolContent>
</Tool>
```

**Visual:**

> Database tool with red "Error" badge and error message in red background.

### Example 3: Awaiting Approval

```tsx
<Tool>
  <ToolHeader type="tool-file-write" state="approval-requested" title="Write File" />
  <ToolContent>
    <ToolInput input={{ path: '/etc/hosts', content: '127.0.0.1 localhost' }} />
    <div className="text-muted-foreground text-sm">
      This tool requires approval to modify system files.
    </div>
  </ToolContent>
</Tool>
```

**Visual:**

> File write tool with yellow "Awaiting Approval" badge and warning message.

### Example 4: Running Tool

```tsx
<Tool>
  <ToolHeader type="tool-code-execution" state="input-available" title="Execute Code" />
  <ToolContent>
    <ToolInput input={{ language: 'python', code: 'print("Hello")' }} />
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      <Spinner className="size-4" />
      Executing code...
    </div>
  </ToolContent>
</Tool>
```

**Visual:**

> Code execution tool with pulsing "Running" badge and spinner indicating in-progress execution.

### Example 5: Custom Output Rendering

```tsx
<Tool defaultOpen>
  <ToolHeader type="tool-weather" state="output-available" title="Weather Forecast" />
  <ToolContent>
    <ToolInput input={{ location: 'Tokyo' }} />
    <div className="space-y-2">
      <h4 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Result</h4>
      <div className="bg-muted/50 rounded-md p-4">
        <div className="flex items-center gap-3">
          <SunIcon className="size-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-muted-foreground text-sm">Sunny</p>
          </div>
        </div>
      </div>
    </div>
  </ToolContent>
</Tool>
```

**Visual:**

> Weather tool with custom-rendered output showing sun icon and temperature.

## Notes

- Tool names are derived from type (e.g., 'tool-weather' → 'weather')
- Input and output are displayed as syntax-highlighted JSON by default
- React elements can be passed as output for custom rendering
- Error text takes precedence over regular output
- Status badges have color-coded icons (green=success, red=error, yellow=pending, blue=info)
- Collapsible by default with smooth animations
- Dark mode fully supported
