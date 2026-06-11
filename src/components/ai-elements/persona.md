# Persona

Animated avatar component using Rive animations with state-based interactions.

## Import

```tsx
import { Persona } from '@allsetlabs/forge/components/ai-elements/persona';
```

## Features

- **State-Driven Animations**: Idle, listening, thinking, speaking, asleep states
- **Multiple Variants**: 6 pre-built personas (obsidian, command, glint, halo, mana, opal)
- **Auto Dark Mode**: Most variants adapt colors to theme automatically
- **Lifecycle Callbacks**: Hook into animation load, play, pause, stop events

## Basic Usage

```tsx
const [state, setState] = useState<PersonaState>('idle');

<Persona variant="obsidian" state={state} onReady={() => console.log('Persona ready')} />;
```

**Visual:**

> A 64x64 pixel animated avatar showing idle animation.

## Props

| Prop        | Type                                                               | Default      | Description                    |
| ----------- | ------------------------------------------------------------------ | ------------ | ------------------------------ |
| state       | `'idle' \| 'listening' \| 'thinking' \| 'speaking' \| 'asleep'`    | -            | Current animation state        |
| variant     | `'obsidian' \| 'command' \| 'glint' \| 'halo' \| 'mana' \| 'opal'` | `'obsidian'` | Persona visual style           |
| onLoad      | `(rive: Rive) => void`                                             | -            | Called when Rive file loads    |
| onLoadError | `(error: Error) => void`                                           | -            | Called on load error           |
| onReady     | `() => void`                                                       | -            | Called when animation is ready |
| onPause     | `(event: Event) => void`                                           | -            | Called when animation pauses   |
| onPlay      | `(event: Event) => void`                                           | -            | Called when animation plays    |
| onStop      | `(event: Event) => void`                                           | -            | Called when animation stops    |
| className   | `string`                                                           | -            | Additional CSS classes         |

## Examples

### Example 1: Voice Assistant States

```tsx
const [state, setState] = useState<PersonaState>('idle');

const startListening = () => setState('listening');
const startProcessing = () => setState('thinking');
const startSpeaking = () => setState('speaking');
const sleep = () => setState('asleep');

<div className="space-y-4">
  <Persona variant="command" state={state} />
  <div className="flex gap-2">
    <Button onClick={startListening}>Listen</Button>
    <Button onClick={startProcessing}>Think</Button>
    <Button onClick={startSpeaking}>Speak</Button>
    <Button onClick={sleep}>Sleep</Button>
  </div>
</div>;
```

**Visual:**

> Persona animation that changes based on button clicks (microphone pulsing, thinking spinner, speaking waves, sleeping z's).

### Example 2: Different Variants

```tsx
<div className="flex gap-4">
  <Persona variant="obsidian" state="idle" />
  <Persona variant="command" state="idle" />
  <Persona variant="glint" state="idle" />
  <Persona variant="halo" state="idle" />
  <Persona variant="mana" state="idle" />
  <Persona variant="opal" state="idle" />
</div>
```

**Visual:**

> Six different persona styles displayed side by side.

### Example 3: Custom Size

```tsx
<Persona variant="glint" state="thinking" className="size-32" />
```

**Visual:**

> Larger 128x128 pixel persona showing thinking animation.

### Example 4: With Load Handlers

```tsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

<Persona
  variant="halo"
  state="listening"
  onLoad={() => console.log('Loaded')}
  onReady={() => setLoading(false)}
  onLoadError={(err) => setError(err)}
/>;

{
  loading && <p>Loading persona...</p>;
}
{
  error && <p>Error: {error.message}</p>;
}
```

**Visual:**

> Shows loading state until persona is ready, or error if load fails.

### Example 5: Conversation Flow

```tsx
const [isListening, setIsListening] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);

const state = isSpeaking
  ? 'speaking'
  : isProcessing
    ? 'thinking'
    : isListening
      ? 'listening'
      : 'idle';

<Persona variant="obsidian" state={state} />;
```

**Visual:**

> Persona that automatically transitions through conversation states.

## Notes

- **Variant Details**:
  - `obsidian`: Dark crystal style, dynamic color
  - `command`: Command prompt style, dynamic color
  - `glint`: Sparkle effect, dynamic color
  - `halo`: Halo ring, dynamic color
  - `mana`: Energy orb, static color
  - `opal`: Simple orb, no model support
- **Dynamic Color**: Most variants (except mana/opal) adapt to dark mode:
  - Light mode: Black (RGB 0,0,0)
  - Dark mode: White (RGB 255,255,255)
- Animations use Rive state machine named "default"
- State machine inputs: `listening`, `thinking`, `speaking`, `asleep`
- Only one state can be active at a time
- Default size is `size-16` (64x64 pixels)
- Rive files hosted on Vercel blob storage
- Component memoized for performance
- Theme detection uses:
  1. `dark` class on `<html>`
  2. `prefers-color-scheme: dark` media query
