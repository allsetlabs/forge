# Transcription

Interactive transcription viewer with segment highlighting and time-based seeking.

## Import

```tsx
import {
  Transcription,
  TranscriptionSegment,
} from '@allsetlabs/forge/components/ai-elements/transcription';
```

## Features

- **Time-based Highlighting**: Segments highlight based on current playback time
- **Seekable**: Click segments to jump to that timestamp
- **Render Props**: Flexible rendering with render prop pattern
- **Color States**: Past (muted), current (primary), future (dimmed)
- **AI SDK Integration**: Compatible with Vercel AI SDK transcription results

## Basic Usage

```tsx
const segments = [
  { startSecond: 0, endSecond: 2.5, text: 'Hello, welcome to our podcast.' },
  { startSecond: 2.5, endSecond: 5.0, text: 'Today we will discuss AI.' },
  { startSecond: 5.0, endSecond: 8.3, text: 'And its impact on society.' },
];

<Transcription segments={segments} currentTime={3.2} onSeek={(time) => audioPlayer.seek(time)}>
  {(segment, index) => <TranscriptionSegment key={index} segment={segment} index={index} />}
</Transcription>;
```

**Visual:**

> Text displayed inline with first segment muted (past), second segment highlighted in primary color (current), third segment dimmed (future).

## Props

### Transcription

| Prop        | Type                          | Default | Description                                |
| ----------- | ----------------------------- | ------- | ------------------------------------------ |
| segments    | TranscriptionSegment[]        | -       | Array of transcription segments (required) |
| currentTime | number                        | 0       | Current playback time in seconds           |
| onSeek      | (time: number) => void        | -       | Callback when segment is clicked           |
| className   | string                        | -       | Additional CSS classes                     |
| children    | (segment, index) => ReactNode | -       | Render prop for each segment (required)    |

### TranscriptionSegment (Type)

```typescript
interface TranscriptionSegment {
  startSecond: number;
  endSecond: number;
  text: string;
}
```

### TranscriptionSegment (Component)

| Prop      | Type                 | Default | Description              |
| --------- | -------------------- | ------- | ------------------------ |
| segment   | TranscriptionSegment | -       | Segment data (required)  |
| index     | number               | -       | Segment index (required) |
| className | string               | -       | Additional CSS classes   |

## Examples

### Example 1: With Audio Player

```tsx
const [currentTime, setCurrentTime] = useState(0);
const audioRef = useRef<HTMLAudioElement>(null);

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
  audio.addEventListener('timeupdate', handleTimeUpdate);

  return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
}, []);

<div>
  <audio ref={audioRef} src="/audio.mp3" controls />
  <Transcription
    segments={segments}
    currentTime={currentTime}
    onSeek={(time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    }}
  >
    {(segment, index) => <TranscriptionSegment segment={segment} index={index} />}
  </Transcription>
</div>;
```

**Visual:**

> Audio player controls above transcription text that highlights as audio plays, clickable to seek.

### Example 2: Custom Segment Rendering

```tsx
<Transcription segments={segments} currentTime={currentTime}>
  {(segment, index) => (
    <div
      key={index}
      className={cn(
        'inline-block rounded px-2 py-1',
        currentTime >= segment.startSecond && currentTime < segment.endSecond
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground'
      )}
    >
      <span className="font-mono text-xs">[{segment.startSecond}s]</span>
      <span className="ml-2">{segment.text}</span>
    </div>
  )}
</Transcription>
```

**Visual:**

> Custom-styled segments with timestamp prefixes and background colors.

### Example 3: Read-only (No Seeking)

```tsx
<Transcription segments={segments} currentTime={currentTime}>
  {(segment, index) => <TranscriptionSegment segment={segment} index={index} />}
</Transcription>
```

**Visual:**

> Transcription that highlights but doesn't allow seeking (cursor is default, not pointer).

### Example 4: With Line Breaks

```tsx
<Transcription segments={segments} currentTime={currentTime} onSeek={handleSeek}>
  {(segment, index) => (
    <>
      <TranscriptionSegment segment={segment} index={index} />
      {index < segments.length - 1 && segment.text.endsWith('.') && <br />}
    </>
  )}
</Transcription>
```

**Visual:**

> Transcription with line breaks after sentences for better readability.

## Notes

- Segments are filtered to remove empty text before rendering
- Current segment is highlighted with primary color
- Past segments use muted-foreground color
- Future segments use dimmed muted-foreground (60% opacity)
- Click behavior only enabled when `onSeek` is provided
- Uses Radix UI controllable state for currentTime
- Text wraps naturally using flexbox with gap
- Component uses context API to share state
- Empty segments are automatically filtered out
- Leading relaxed spacing for better readability
