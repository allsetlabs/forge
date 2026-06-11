# useStorage

A controlled/uncontrolled component pattern hook that provides fallback state management.

## Import

```tsx
import { useStorage } from '@allsetlabs/forge/hooks/useStorage';
```

## Features

- **Controlled mode**: Uses parent-provided state and change handlers
- **Uncontrolled mode**: Falls back to internal state when parent props not provided
- **Partially controlled**: Mix of parent state with local change handling
- **Type-safe**: Full TypeScript support with generic types

## Basic Usage

### Uncontrolled (manages own state)

```tsx
const [value, setValue] = useStorage({}, 'default value');
```

**Visual:**

> Component manages its own internal state, starting with 'default value'.

### Controlled (parent manages state)

```tsx
const [value, setValue] = useStorage(
  {
    parentState: props.value,
    onParentStateChange: props.onChange,
  },
  'default'
);
```

**Visual:**

> Component reflects parent's state and delegates changes to parent.

### Partially controlled

```tsx
const [value, setValue] = useStorage(
  {
    parentState: props.value,
  },
  'default'
);
```

**Visual:**

> Uses parent's value but handles changes internally.

## Options

| Option                | Type                 | Default | Description                   |
| --------------------- | -------------------- | ------- | ----------------------------- |
| `parentState`         | `S`                  | -       | Parent-controlled state value |
| `onParentStateChange` | `(value: S) => void` | -       | Callback when state changes   |

## Return Value

Returns a tuple similar to `useState`:

```tsx
[currentValue: S, setValue: Dispatch<SetStateAction<S>>]
```

## Examples

### Building a Controlled Input Component

```tsx
interface ControlledInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

function ControlledInput({ value, onChange, defaultValue = '' }: ControlledInputProps) {
  const [inputValue, setInputValue] = useStorage(
    {
      parentState: value,
      onParentStateChange: onChange,
    },
    defaultValue
  );

  return <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
}

// Usage - uncontrolled
<ControlledInput defaultValue="hello" />;

// Usage - controlled
const [text, setText] = useState('hello');
<ControlledInput value={text} onChange={setText} />;
```

### Toggle Component

```tsx
interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
}

function Toggle({ pressed, onPressedChange, defaultPressed = false }: ToggleProps) {
  const [isPressed, setIsPressed] = useStorage(
    {
      parentState: pressed,
      onParentStateChange: onPressedChange,
    },
    defaultPressed
  );

  return (
    <button aria-pressed={isPressed} onClick={() => setIsPressed((prev) => !prev)}>
      {isPressed ? 'On' : 'Off'}
    </button>
  );
}
```

## TypeScript

```tsx
// With initial value - returns [S, Dispatch<SetStateAction<S>>]
function useStorage<S>(
  options: UseStorageOptions<S>,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];

// Without initial value - returns [S | undefined, Dispatch<SetStateAction<S | undefined>>]
function useStorage<S = undefined>(options: {
  parentState?: S;
  onParentStateChange?: (value: S | undefined) => void;
}): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

interface UseStorageOptions<S> {
  parentState?: S;
  onParentStateChange?: (value: S) => void;
}
```

## Notes

- Use this hook when building components that need to support both controlled and uncontrolled modes
- The hook follows React's standard controlled/uncontrolled component pattern
- If `parentState` is provided, it takes precedence over local state
- If `onParentStateChange` is provided, changes are delegated to parent instead of updating local state
