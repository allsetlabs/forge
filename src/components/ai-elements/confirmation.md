# Confirmation

Display tool approval requests and responses with conditional rendering.

## Import

```tsx
import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from '@allsetlabs/forge/components/ai-elements/confirmation';
```

## Features

- **State-Based Rendering**: Shows different content based on approval state
- **Conditional Display**: Request, accepted, and rejected sections
- **Action Buttons**: Approve/reject buttons only shown when needed
- **AI SDK Integration**: Works with ToolUIPart approval types
- **Alert Styling**: Uses Alert component for consistent appearance

## Basic Usage

```tsx
<Confirmation approval={approval} state={state}>
  <ConfirmationTitle>Allow access to file system?</ConfirmationTitle>
  <ConfirmationRequest>
    <ConfirmationActions>
      <ConfirmationAction variant="default" onClick={handleApprove}>
        Approve
      </ConfirmationAction>
      <ConfirmationAction variant="outline" onClick={handleReject}>
        Reject
      </ConfirmationAction>
    </ConfirmationActions>
  </ConfirmationRequest>
  <ConfirmationAccepted>Access granted</ConfirmationAccepted>
  <ConfirmationRejected>Access denied</ConfirmationRejected>
</Confirmation>
```

**Visual:**

> Alert box showing title and approve/reject buttons when approval requested. Shows result message after decision.

## Props

### Confirmation

| Prop      | Type                  | Default | Description            |
| --------- | --------------------- | ------- | ---------------------- |
| approval  | `ToolUIPartApproval`  | -       | Approval state object  |
| state     | `ToolUIPart['state']` | -       | Current tool state     |
| className | `string`              | -       | Additional CSS classes |

### ConfirmationAction

| Prop      | Type                            | Default | Description            |
| --------- | ------------------------------- | ------- | ---------------------- |
| variant   | `ButtonVariant`                 | -       | Button variant         |
| className | `string`                        | -       | Additional CSS classes |
| ...props  | `ComponentProps<typeof Button>` | -       | All Button props       |

## Tool States

- `input-streaming`: Tool input being streamed (hidden)
- `input-available`: Tool input available (hidden)
- `approval-requested`: Waiting for user approval (shows request)
- `approval-responded`: User has responded (shows accepted/rejected)
- `output-denied`: Output denied (shows rejected)
- `output-available`: Output available (shows accepted)

## Examples

### Example 1: File System Access

```tsx
<Confirmation approval={approval} state="approval-requested">
  <ConfirmationTitle>Allow file system access?</ConfirmationTitle>
  <ConfirmationRequest>
    <p className="text-muted-foreground mb-2 text-sm">
      The agent wants to read and write files in your project directory.
    </p>
    <ConfirmationActions>
      <ConfirmationAction variant="default" onClick={handleApprove}>
        Allow
      </ConfirmationAction>
      <ConfirmationAction variant="outline" onClick={handleReject}>
        Deny
      </ConfirmationAction>
    </ConfirmationActions>
  </ConfirmationRequest>
  <ConfirmationAccepted>
    <p className="text-sm">File system access granted.</p>
  </ConfirmationAccepted>
  <ConfirmationRejected>
    <p className="text-destructive text-sm">File system access denied.</p>
  </ConfirmationRejected>
</Confirmation>
```

**Visual:**

> Alert with detailed description and allow/deny buttons. Shows grant/denial message after action.

### Example 2: API Call Approval

```tsx
const [approval, setApproval] = useState<ToolUIPartApproval>();
const [state, setState] = useState<ToolUIPart['state']>('approval-requested');

const handleApprove = () => {
  setApproval({ id: 'tool-1', approved: true });
  setState('approval-responded');
};

const handleReject = () => {
  setApproval({ id: 'tool-1', approved: false, reason: 'User declined' });
  setState('approval-responded');
};

<Confirmation approval={approval} state={state}>
  <ConfirmationTitle>Make external API call?</ConfirmationTitle>
  <ConfirmationRequest>
    <ConfirmationActions>
      <ConfirmationAction onClick={handleApprove}>Yes</ConfirmationAction>
      <ConfirmationAction variant="outline" onClick={handleReject}>
        No
      </ConfirmationAction>
    </ConfirmationActions>
  </ConfirmationRequest>
  <ConfirmationAccepted>API call approved</ConfirmationAccepted>
  <ConfirmationRejected>API call rejected: {approval?.reason}</ConfirmationRejected>
</Confirmation>;
```

**Visual:**

> Confirmation with yes/no buttons. Shows rejection reason if provided.

### Example 3: Database Access

```tsx
<Confirmation approval={approval} state={state}>
  <ConfirmationTitle>Execute database query?</ConfirmationTitle>
  <ConfirmationRequest>
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">The agent wants to run the following query:</p>
      <CodeBlock code="SELECT * FROM users WHERE admin = true" language="sql" />
      <ConfirmationActions>
        <ConfirmationAction variant="default" onClick={handleApprove}>
          Execute
        </ConfirmationAction>
        <ConfirmationAction variant="destructive" onClick={handleReject}>
          Cancel
        </ConfirmationAction>
      </ConfirmationActions>
    </div>
  </ConfirmationRequest>
  <ConfirmationAccepted>Query executed successfully</ConfirmationAccepted>
  <ConfirmationRejected>Query cancelled by user</ConfirmationRejected>
</Confirmation>
```

**Visual:**

> Alert showing SQL query preview with execute/cancel buttons (cancel is destructive variant).

## Approval Type

```tsx
type ToolUIPartApproval =
  | { id: string; approved?: never; reason?: never }
  | { id: string; approved: boolean; reason?: string }
  | { id: string; approved: true; reason?: string }
  | { id: string; approved: false; reason?: string }
  | undefined;
```

## Visibility Logic

- **Component**: Hidden when `approval` is undefined or state is `input-streaming`/`input-available`
- **ConfirmationRequest**: Only shown when state is `approval-requested`
- **ConfirmationAccepted**: Only shown when `approved: true` and state is `approval-responded`, `output-denied`, or `output-available`
- **ConfirmationRejected**: Only shown when `approved: false` and state is `approval-responded`, `output-denied`, or `output-available`
- **ConfirmationActions**: Only shown when state is `approval-requested`

## Notes

- Wraps Alert component for consistent styling
- Uses React context to share approval state with children
- ConfirmationRequest/Accepted/Rejected conditionally render based on state
- Actions automatically hidden after approval/rejection
- Button height fixed at `h-8` with small text (`text-sm`)
- Action buttons use `type="button"` to prevent form submission
- Title uses AlertDescription component (inline display)
- Actions self-align to end with gap spacing
