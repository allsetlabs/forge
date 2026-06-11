# AudioPlayer

Customizable audio player with controls built on media-chrome.

## Import

```tsx
import {
  AudioPlayer,
  AudioPlayerElement,
  AudioPlayerControlBar,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerDurationDisplay,
  AudioPlayerMuteButton,
  AudioPlayerVolumeRange,
} from '@allsetlabs/forge/components/ai-elements/audio-player';
```

## Features

- **Media Controls**: Play, pause, seek, volume controls
- **Time Display**: Current time and duration
- **Seek Buttons**: Skip forward/backward by configurable offset
- **Custom Styling**: Themed to match design system
- **AI SDK Integration**: Supports speech result audio data
- **Keyboard Support**: Full keyboard navigation

## Basic Usage

```tsx
<AudioPlayer>
  <AudioPlayerElement src="/audio.mp3" />
  <AudioPlayerControlBar>
    <AudioPlayerPlayButton />
    <AudioPlayerTimeDisplay />
    <AudioPlayerTimeRange />
    <AudioPlayerDurationDisplay />
  </AudioPlayerControlBar>
</AudioPlayer>
```

**Visual:**

> Audio player with play button, time scrubber, and duration display in a horizontal control bar.

## Props

### AudioPlayer

| Prop      | Type                                     | Default | Description            |
| --------- | ---------------------------------------- | ------- | ---------------------- |
| style     | `CSSProperties`                          | -       | Custom CSS properties  |
| className | `string`                                 | -       | Additional CSS classes |
| ...props  | `ComponentProps<typeof MediaController>` | -       | MediaController props  |

### AudioPlayerElement

| Prop | Type                    | Default | Description                     |
| ---- | ----------------------- | ------- | ------------------------------- |
| src  | `string`                | -       | Audio source URL                |
| data | `SpeechResult['audio']` | -       | AI SDK speech result audio data |

### AudioPlayerSeekBackwardButton / AudioPlayerSeekForwardButton

| Prop       | Type     | Default | Description                  |
| ---------- | -------- | ------- | ---------------------------- |
| seekOffset | `number` | `10`    | Seconds to skip (default 10) |

## Examples

### Example 1: Full Featured Player

```tsx
<AudioPlayer>
  <AudioPlayerElement src="/audio.mp3" />
  <AudioPlayerControlBar>
    <AudioPlayerSeekBackwardButton seekOffset={15} />
    <AudioPlayerPlayButton />
    <AudioPlayerSeekForwardButton seekOffset={15} />
    <AudioPlayerTimeDisplay />
    <AudioPlayerTimeRange />
    <AudioPlayerDurationDisplay />
    <AudioPlayerMuteButton />
    <AudioPlayerVolumeRange />
  </AudioPlayerControlBar>
</AudioPlayer>
```

**Visual:**

> Complete audio player with seek buttons (15s), play/pause, time display, scrubber, mute, and volume slider.

### Example 2: Minimal Player

```tsx
<AudioPlayer>
  <AudioPlayerElement src="/audio.mp3" />
  <AudioPlayerControlBar>
    <AudioPlayerPlayButton />
    <AudioPlayerDurationDisplay />
  </AudioPlayerControlBar>
</AudioPlayer>
```

**Visual:**

> Simple player with only play button and total duration.

### Example 3: AI Speech Result

```tsx
import type { Experimental_SpeechResult } from 'ai';

const speechResult: Experimental_SpeechResult = {
  audio: {
    mediaType: 'audio/mp3',
    base64: '...',
  },
};

<AudioPlayer>
  <AudioPlayerElement data={speechResult.audio} />
  <AudioPlayerControlBar>
    <AudioPlayerPlayButton />
    <AudioPlayerTimeRange />
  </AudioPlayerControlBar>
</AudioPlayer>;
```

**Visual:**

> Audio player for AI-generated speech with play button and time scrubber.

### Example 4: Custom Seek Offsets

```tsx
<AudioPlayer>
  <AudioPlayerElement src="/podcast.mp3" />
  <AudioPlayerControlBar>
    <AudioPlayerSeekBackwardButton seekOffset={30} />
    <AudioPlayerPlayButton />
    <AudioPlayerSeekForwardButton seekOffset={30} />
    <AudioPlayerTimeDisplay />
    <AudioPlayerTimeRange />
    <AudioPlayerDurationDisplay />
  </AudioPlayerControlBar>
</AudioPlayer>
```

**Visual:**

> Podcast player with 30-second skip forward/back buttons.

## Styling

The AudioPlayer uses CSS custom properties for theming:

```tsx
<AudioPlayer
  style={{
    '--media-primary-color': 'var(--color-primary)',
    '--media-range-bar-color': 'var(--color-primary)',
    '--media-range-track-background': 'var(--color-secondary)',
    '--media-text-color': 'var(--color-foreground)',
  }}
>
  {/* ... */}
</AudioPlayer>
```

## Notes

- Built on `media-chrome/react` for web components
- Automatically inherits theme colors from design system
- All controls wrapped in ButtonGroup for consistent styling
- Time displays use tabular numbers for alignment
- Audio element requires `data-slot="media"` and `slot="media"` attributes
- Captions should be provided by consumer (oxlint disabled for media-has-caption)
- Supports both URL sources and base64-encoded audio data
