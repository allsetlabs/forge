# EnvironmentVariables

Display and manage environment variables with visibility toggle and copy functionality.

## Import

```tsx
import {
  EnvironmentVariables,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariablesContent,
  EnvironmentVariable,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableValue,
  EnvironmentVariableCopyButton,
  EnvironmentVariableRequired,
} from '@allsetlabs/forge/components/ai-elements/environment-variables';
```

## Features

- **Value Masking**: Toggle to show/hide sensitive values
- **Copy Functionality**: Copy name, value, or export format
- **Required Badge**: Indicate required variables
- **Grouped Display**: Group related variables together
- **Controlled/Uncontrolled**: Support both modes
- **Context-Based**: Share state across all children

## Basic Usage

```tsx
<EnvironmentVariables>
  <EnvironmentVariablesHeader>
    <EnvironmentVariablesTitle />
    <EnvironmentVariablesToggle />
  </EnvironmentVariablesHeader>
  <EnvironmentVariablesContent>
    <EnvironmentVariable name="API_KEY" value="sk-abc123xyz" />
    <EnvironmentVariable name="DATABASE_URL" value="postgresql://..." />
  </EnvironmentVariablesContent>
</EnvironmentVariables>
```

**Visual:**

> Bordered card with header showing "Environment Variables" title and eye toggle. Variables listed with names and masked values (dots).

## Props

### EnvironmentVariables

| Prop               | Type       | Default | Description                       |
| ------------------ | ---------- | ------- | --------------------------------- |
| showValues         | `boolean`  | -       | Controlled show state             |
| defaultShowValues  | `boolean`  | `false` | Default show state (uncontrolled) |
| onShowValuesChange | `function` | -       | Show state change callback        |
| className          | `string`   | -       | Additional CSS classes            |

### EnvironmentVariable

| Prop      | Type     | Default | Description               |
| --------- | -------- | ------- | ------------------------- |
| name      | `string` | -       | Variable name (required)  |
| value     | `string` | -       | Variable value (required) |
| className | `string` | -       | Additional CSS classes    |

### EnvironmentVariableCopyButton

| Prop       | Type                                | Default   | Description            |
| ---------- | ----------------------------------- | --------- | ---------------------- |
| copyFormat | `'name'` \| `'value'` \| `'export'` | `'value'` | What to copy           |
| onCopy     | `function`                          | -         | Copy success callback  |
| onError    | `function`                          | -         | Copy error callback    |
| timeout    | `number`                            | `2000`    | Success icon timeout   |
| className  | `string`                            | -         | Additional CSS classes |

## Examples

### Example 1: Complete Setup

```tsx
<EnvironmentVariables defaultShowValues={false}>
  <EnvironmentVariablesHeader>
    <EnvironmentVariablesTitle>API Configuration</EnvironmentVariablesTitle>
    <EnvironmentVariablesToggle />
  </EnvironmentVariablesHeader>
  <EnvironmentVariablesContent>
    <EnvironmentVariable name="API_KEY" value="sk-1234567890abcdef">
      <div className="flex items-center gap-2">
        <EnvironmentVariableName />
        <EnvironmentVariableRequired />
      </div>
      <EnvironmentVariableGroup>
        <EnvironmentVariableValue />
        <EnvironmentVariableCopyButton copyFormat="value" />
      </EnvironmentVariableGroup>
    </EnvironmentVariable>

    <EnvironmentVariable name="API_URL" value="https://api.example.com">
      <div className="flex items-center gap-2">
        <EnvironmentVariableName />
      </div>
      <EnvironmentVariableGroup>
        <EnvironmentVariableValue />
        <EnvironmentVariableCopyButton copyFormat="value" />
      </EnvironmentVariableGroup>
    </EnvironmentVariable>
  </EnvironmentVariablesContent>
</EnvironmentVariables>
```

**Visual:**

> Environment variables list with required badge on API_KEY. Eye toggle switches between masked dots and actual values. Copy buttons for each value.

### Example 2: Export Format Copy

```tsx
<EnvironmentVariable name="DATABASE_URL" value="postgresql://localhost:5432/db">
  <EnvironmentVariableGroup>
    <EnvironmentVariableName />
  </EnvironmentVariableGroup>
  <EnvironmentVariableGroup>
    <EnvironmentVariableValue />
    <EnvironmentVariableCopyButton copyFormat="export" />
  </EnvironmentVariableGroup>
</EnvironmentVariable>
```

**Visual:**

> Copy button copies: `export DATABASE_URL="postgresql://localhost:5432/db"`

### Example 3: Controlled State

```tsx
const [showValues, setShowValues] = useState(false);

<EnvironmentVariables showValues={showValues} onShowValuesChange={setShowValues}>
  <EnvironmentVariablesHeader>
    <EnvironmentVariablesTitle />
    <EnvironmentVariablesToggle />
  </EnvironmentVariablesHeader>
  <EnvironmentVariablesContent>
    <EnvironmentVariable name="SECRET" value="super-secret-value" />
  </EnvironmentVariablesContent>
</EnvironmentVariables>

<Button onClick={() => setShowValues(!showValues)}>
  Toggle from Outside
</Button>
```

**Visual:**

> Environment variables with external button to control visibility.

### Example 4: Copy with Callbacks

```tsx
<EnvironmentVariableCopyButton
  copyFormat="value"
  onCopy={() => toast.success('Copied to clipboard!')}
  onError={(error) => toast.error(`Failed: ${error.message}`)}
  timeout={3000}
/>
```

**Visual:**

> Copy button with toast notifications and 3-second success timeout.

### Example 5: Simple List

```tsx
const envVars = [
  { name: 'NODE_ENV', value: 'production' },
  { name: 'PORT', value: '3000' },
  { name: 'API_KEY', value: 'sk-abc123' },
];

<EnvironmentVariables>
  <EnvironmentVariablesHeader>
    <EnvironmentVariablesTitle />
    <EnvironmentVariablesToggle />
  </EnvironmentVariablesHeader>
  <EnvironmentVariablesContent>
    {envVars.map((env) => (
      <EnvironmentVariable key={env.name} name={env.name} value={env.value} />
    ))}
  </EnvironmentVariablesContent>
</EnvironmentVariables>;
```

**Visual:**

> Simple list rendering environment variables from array.

## Copy Formats

- **name**: Copies just the variable name
- **value**: Copies just the variable value
- **export**: Copies as shell export statement

```tsx
// copyFormat="name"
API_KEY

// copyFormat="value"
sk-1234567890abcdef

// copyFormat="export"
export API_KEY="sk-1234567890abcdef"
```

## Value Masking

When `showValues` is false:

- Values displayed as dots: `••••••••••••••••••••`
- Maximum 20 dots regardless of actual length
- Text is not selectable (`select-none`)

When `showValues` is true:

- Full value displayed
- Text is selectable

## Context Structure

```tsx
// EnvironmentVariablesContext
{
  showValues: boolean;
  setShowValues: (show: boolean) => void;
}

// EnvironmentVariableContext
{
  name: string;
  value: string;
}
```

## Notes

- Toggle uses Switch component with eye/eye-off icons
- Header has border-bottom separator
- Content uses divider between items (`divide-y`)
- Default title is "Environment Variables"
- Copy button shows checkmark icon for 2 seconds after success
- Copy uses Clipboard API (requires HTTPS in production)
- Variable name and value use monospace font (`font-mono`)
- Values shown in muted foreground color
- Required badge uses secondary variant
- All context values memoized for performance
- Supports both controlled and uncontrolled modes
- Toggle has aria-label for accessibility
