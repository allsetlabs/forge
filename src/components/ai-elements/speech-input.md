# SpeechInput

Voice input button with browser speech recognition and fallback to MediaRecorder.

## Import

```tsx
import { SpeechInput } from '@allsetlabs/forge/components/ai-elements/speech-input';
```

## Features

- **Browser Speech Recognition**: Uses Web Speech API (Chrome, Edge)
- **MediaRecorder Fallback**: Records audio for transcription in Firefox/Safari
- **Animated Pulse**: Visual feedback with pulsing rings during recording
- **Mode Detection**: Automatically detects available input method
- **Loading State**: Shows spinner while processing audio

## Basic Usage

```tsx
<SpeechInput
  onTranscriptionChange={(text) => console.log('Transcribed:', text)}
  onAudioRecorded={async (blob) => {
    // Send to transcription service
    const formData = new FormData();
    formData.append('audio', blob);
    const response = await fetch('/api/transcribe', { method: 'POST', body: formData });
    const { text } = await response.json();
    return text;
  }}
/>
```

**Visual:**

> Circular microphone button. When recording, shows animated pulsing red rings around it. Button turns red with square icon while recording.

## Props

| Prop                  | Type                                 | Default | Description                                 |
| --------------------- | ------------------------------------ | ------- | ------------------------------------------- |
| onTranscriptionChange | (text: string) => void               | -       | Callback with transcribed text              |
| onAudioRecorded       | (audioBlob: Blob) => Promise<string> | -       | Process recorded audio (MediaRecorder mode) |
| lang                  | string                               | 'en-US' | Language code for speech recognition        |
| className             | string                               | -       | Additional CSS classes                      |

## Examples

### Example 1: With OpenAI Whisper

```tsx
<SpeechInput
  onTranscriptionChange={(text) => setInputValue(text)}
  onAudioRecorded={async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${OPENAI_KEY}` },
      body: formData,
    });

    const { text } = await response.json();
    return text;
  }}
/>
```

**Visual:**

> Voice input integrated with OpenAI Whisper API for transcription fallback.

### Example 2: Different Language

```tsx
<SpeechInput lang="es-ES" onTranscriptionChange={(text) => handleSpanishInput(text)} />
```

**Visual:**

> Spanish language speech recognition (only works in speech recognition mode).

### Example 3: Custom Styling

```tsx
<SpeechInput
  className="size-12 bg-blue-500 hover:bg-blue-600"
  onTranscriptionChange={handleTranscription}
/>
```

**Visual:**

> Larger button with custom blue background color.

### Example 4: In a Form

```tsx
const [value, setValue] = useState('');

<div className="flex gap-2">
  <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type or speak..." />
  <SpeechInput onTranscriptionChange={(text) => setValue((prev) => prev + ' ' + text)} />
</div>;
```

**Visual:**

> Text input with voice input button beside it, transcription appends to input value.

## Notes

- **Chrome/Edge**: Uses Web Speech API natively (no server required)
- **Firefox/Safari**: Requires `onAudioRecorded` prop for transcription service
- Button is disabled if no input method is available
- Shows spinner while processing MediaRecorder audio
- Continuous recording in speech recognition mode (captures multiple phrases)
- Red pulsing animation with 3 concentric rings during recording
- Button color changes from primary to destructive when recording
- Automatically cleans up media streams and recognition instances
- Requires HTTPS for microphone access in production
