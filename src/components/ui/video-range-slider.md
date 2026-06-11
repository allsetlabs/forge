# VideoRangeSlider

A specialized slider component for video trimming with start/end selection and thumbnail positioning.

## Features

- **Dual range handles** - Select start and end times for video trimming
- **Thumbnail marker** - Position thumbnail within the selected range
- **Decimal seconds format** - Display times as seconds with 2 decimal places (e.g., 215.50)
- **Minimum duration enforcement** - Configurable minimum clip length (default: 2 seconds)
- **Touch support** - Works on mobile devices
- **Live preview seeking** - Optional callback for video preview during dragging
- **Accessible** - ARIA attributes for screen readers

## Import

```tsx
import {
  VideoRangeSlider,
  formatTimeToMSS,
  parseMSSToSeconds,
} from '@allsetlabs/forge/components/ui/video-range-slider';
```

## Usage

```tsx
const [startTime, setStartTime] = useState(0);
const [endTime, setEndTime] = useState(10);
const [thumbnailTime, setThumbnailTime] = useState(5);

<VideoRangeSlider
  duration={120} // Video duration in seconds
  startTime={startTime}
  endTime={endTime}
  thumbnailTime={thumbnailTime}
  minDuration={2}
  onStartChange={setStartTime}
  onEndChange={setEndTime}
  onThumbnailChange={setThumbnailTime}
/>;
```

## Props

| Prop                | Type                     | Default | Description                                |
| ------------------- | ------------------------ | ------- | ------------------------------------------ |
| `duration`          | `number`                 | -       | Total video duration in seconds            |
| `startTime`         | `number`                 | -       | Current start time in seconds              |
| `endTime`           | `number`                 | -       | Current end time in seconds                |
| `thumbnailTime`     | `number`                 | -       | Current thumbnail time in seconds          |
| `minDuration`       | `number`                 | `2`     | Minimum duration between start and end     |
| `onStartChange`     | `(time: number) => void` | -       | Callback when start time changes           |
| `onEndChange`       | `(time: number) => void` | -       | Callback when end time changes             |
| `onThumbnailChange` | `(time: number) => void` | -       | Callback when thumbnail time changes       |
| `onSeek`            | `(time: number) => void` | -       | Callback for video preview during dragging |
| `className`         | `string`                 | -       | Additional CSS classes for container       |
| `disabled`          | `boolean`                | `false` | Whether the slider is disabled             |

## Helper Functions

### formatTimeToMSS

Formats seconds to a string with 2 decimal places.

```tsx
formatTimeToMSS(215.5); // Returns "215.50"
formatTimeToMSS(65); // Returns "65.00"
formatTimeToMSS(5.123); // Returns "5.12"
```

### parseMSSToSeconds

Parses a decimal seconds string back to a number.

```tsx
parseMSSToSeconds('215.50'); // Returns 215.5
parseMSSToSeconds('65.00'); // Returns 65
parseMSSToSeconds('invalid'); // Returns 0
```

## Behavior

1. **Start handle** - Can move from 0 to (endTime - minDuration)
2. **End handle** - Can move from (startTime + minDuration) to duration
3. **Thumbnail handle** - Can only move between startTime and endTime
4. **Auto-adjustment** - If start moves past thumbnail, thumbnail moves to start. If end moves before thumbnail, thumbnail moves to end.

## Styling

The component uses theme variables:

- `bg-muted` - Track background
- `bg-primary` - Start/end handle colors and selected range
- `bg-secondary` - Thumbnail handle color
- `text-muted-foreground` - Labels and helper text

## Accessibility

- All handles have `role="slider"` with proper ARIA attributes
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for each handle
- Keyboard focusable when not disabled
