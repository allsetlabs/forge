# VoiceSelector

Dialog-based voice selection component with gender, accent, and age filtering.

## Import

```tsx
import {
  VoiceSelector,
  VoiceSelectorTrigger,
  VoiceSelectorContent,
  VoiceSelectorInput,
  VoiceSelectorList,
  VoiceSelectorEmpty,
  VoiceSelectorGroup,
  VoiceSelectorItem,
  VoiceSelectorName,
  VoiceSelectorGender,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorPreview,
} from '@allsetlabs/forge/components/ai-elements/voice-selector';
```

## Features

- **Searchable**: Filter voices by name, gender, accent, or age
- **Gender Icons**: Visual gender indicators (male, female, non-binary, etc.)
- **Accent Flags**: Country flags for accent visualization
- **Preview Button**: Play voice samples before selection
- **Keyboard Navigation**: Full keyboard support via Command component
- **Controlled/Uncontrolled**: Supports both modes

## Basic Usage

```tsx
const voices = [
  { id: 'voice1', name: 'Alice', gender: 'female', accent: 'american', age: 28 },
  { id: 'voice2', name: 'Bob', gender: 'male', accent: 'british', age: 35 },
  { id: 'voice3', name: 'Charlie', gender: 'non-binary', accent: 'australian', age: 24 },
];

<VoiceSelector value={selectedVoice} onValueChange={setSelectedVoice}>
  <VoiceSelectorTrigger asChild>
    <Button variant="outline">Select Voice</Button>
  </VoiceSelectorTrigger>
  <VoiceSelectorContent>
    <VoiceSelectorInput placeholder="Search voices..." />
    <VoiceSelectorList>
      <VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
      <VoiceSelectorGroup>
        {voices.map((voice) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <VoiceSelectorName>{voice.name}</VoiceSelectorName>
            <VoiceSelectorAttributes>
              <VoiceSelectorGender value={voice.gender} />
              <VoiceSelectorBullet />
              <VoiceSelectorAccent value={voice.accent} />
              <VoiceSelectorBullet />
              <VoiceSelectorAge>{voice.age}</VoiceSelectorAge>
            </VoiceSelectorAttributes>
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
    </VoiceSelectorList>
  </VoiceSelectorContent>
</VoiceSelector>;
```

**Visual:**

> Dialog with search input, list of voices showing name, gender icon, flag, and age. Clicking a voice selects it and closes the dialog.

## Props

### VoiceSelector

| Prop          | Type                    | Default | Description                       |
| ------------- | ----------------------- | ------- | --------------------------------- |
| value         | string                  | -       | Selected voice ID (controlled)    |
| defaultValue  | string                  | -       | Initial voice ID (uncontrolled)   |
| onValueChange | (value: string) => void | -       | Callback when selection changes   |
| open          | boolean                 | -       | Dialog open state (controlled)    |
| defaultOpen   | boolean                 | false   | Initial open state (uncontrolled) |
| onOpenChange  | (open: boolean) => void | -       | Callback when dialog opens/closes |

### VoiceSelectorGender

| Prop  | Type                                                                             | Default | Description |
| ----- | -------------------------------------------------------------------------------- | ------- | ----------- |
| value | 'male' \| 'female' \| 'transgender' \| 'androgyne' \| 'non-binary' \| 'intersex' | -       | Gender type |

### VoiceSelectorAccent

| Prop  | Type                                           | Default | Description        |
| ----- | ---------------------------------------------- | ------- | ------------------ |
| value | 'american' \| 'british' \| 'australian' \| ... | -       | Accent/nationality |

### VoiceSelectorPreview

| Prop    | Type       | Default | Description                       |
| ------- | ---------- | ------- | --------------------------------- |
| playing | boolean    | false   | Whether preview is playing        |
| loading | boolean    | false   | Whether preview is loading        |
| onPlay  | () => void | -       | Callback when play button clicked |

## Examples

### Example 1: With Voice Preview

```tsx
const [playingVoice, setPlayingVoice] = useState<string | null>(null);

<VoiceSelector value={selectedVoice} onValueChange={setSelectedVoice}>
  <VoiceSelectorTrigger asChild>
    <Button>Choose Voice</Button>
  </VoiceSelectorTrigger>
  <VoiceSelectorContent>
    <VoiceSelectorInput placeholder="Search..." />
    <VoiceSelectorList>
      <VoiceSelectorGroup>
        {voices.map((voice) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <VoiceSelectorName>{voice.name}</VoiceSelectorName>
            <VoiceSelectorPreview
              playing={playingVoice === voice.id}
              onPlay={() => {
                setPlayingVoice(voice.id);
                // Play audio sample
                playVoiceSample(voice.sampleUrl);
              }}
            />
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
    </VoiceSelectorList>
  </VoiceSelectorContent>
</VoiceSelector>;
```

**Visual:**

> Each voice has a play button that shows playing state with pause icon.

### Example 2: Grouped by Gender

```tsx
<VoiceSelector value={selectedVoice} onValueChange={setSelectedVoice}>
  <VoiceSelectorTrigger asChild>
    <Button>Select Voice</Button>
  </VoiceSelectorTrigger>
  <VoiceSelectorContent>
    <VoiceSelectorInput placeholder="Search..." />
    <VoiceSelectorList>
      <VoiceSelectorGroup heading="Male Voices">
        {maleVoices.map((voice) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <VoiceSelectorName>{voice.name}</VoiceSelectorName>
            <VoiceSelectorAttributes>
              <VoiceSelectorAccent value={voice.accent} />
            </VoiceSelectorAttributes>
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
      <VoiceSelectorSeparator />
      <VoiceSelectorGroup heading="Female Voices">
        {femaleVoices.map((voice) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <VoiceSelectorName>{voice.name}</VoiceSelectorName>
            <VoiceSelectorAttributes>
              <VoiceSelectorAccent value={voice.accent} />
            </VoiceSelectorAttributes>
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
    </VoiceSelectorList>
  </VoiceSelectorContent>
</VoiceSelector>
```

**Visual:**

> Voices grouped into sections with headings and separators.

### Example 3: With Description

```tsx
<VoiceSelector value={selectedVoice} onValueChange={setSelectedVoice}>
  <VoiceSelectorTrigger asChild>
    <Button>Voice Settings</Button>
  </VoiceSelectorTrigger>
  <VoiceSelectorContent>
    <VoiceSelectorInput placeholder="Search voices..." />
    <VoiceSelectorList>
      <VoiceSelectorGroup>
        {voices.map((voice) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <div className="flex flex-col gap-1">
              <VoiceSelectorName>{voice.name}</VoiceSelectorName>
              <VoiceSelectorDescription>{voice.description}</VoiceSelectorDescription>
              <VoiceSelectorAttributes>
                <VoiceSelectorGender value={voice.gender} />
                <VoiceSelectorBullet />
                <VoiceSelectorAccent value={voice.accent} />
              </VoiceSelectorAttributes>
            </div>
            <VoiceSelectorPreview onPlay={() => playVoice(voice.id)} />
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
    </VoiceSelectorList>
  </VoiceSelectorContent>
</VoiceSelector>
```

**Visual:**

> Each voice shows name, description text, attributes, and preview button in a multi-line layout.

### Example 4: Keyboard Shortcuts

```tsx
<VoiceSelector value={selectedVoice} onValueChange={setSelectedVoice}>
  <VoiceSelectorTrigger asChild>
    <Button>Select Voice</Button>
  </VoiceSelectorTrigger>
  <VoiceSelectorContent>
    <VoiceSelectorInput placeholder="Search..." />
    <VoiceSelectorList>
      <VoiceSelectorGroup>
        {voices.map((voice, index) => (
          <VoiceSelectorItem key={voice.id} value={voice.id}>
            <VoiceSelectorName>{voice.name}</VoiceSelectorName>
            <VoiceSelectorShortcut>⌘{index + 1}</VoiceSelectorShortcut>
          </VoiceSelectorItem>
        ))}
      </VoiceSelectorGroup>
    </VoiceSelectorList>
  </VoiceSelectorContent>
</VoiceSelector>
```

**Visual:**

> Voices with keyboard shortcuts (⌘1, ⌘2, etc.) shown on the right.

## Gender Icons

- **male**: Mars symbol (♂)
- **female**: Venus symbol (♀)
- **transgender**: Transgender symbol
- **androgyne**: Androgyne symbol
- **non-binary**: Non-binary symbol
- **intersex**: Intersex symbol

## Accent Flags

Supports 30+ accents with emoji flags including:

- American 🇺🇸, British 🇬🇧, Australian 🇦🇺
- Canadian 🇨🇦, Irish 🇮🇪, Scottish 🏴󠁧󠁢󠁳󠁣󠁴󠁿
- Spanish 🇪🇸, French 🇫🇷, German 🇩🇪
- And many more...

## Notes

- Built on Command component for search and keyboard navigation
- Uses Dialog component for modal presentation
- Controlled/uncontrolled via Radix UI hooks
- Preview button stops propagation to prevent item selection
- Gender icons use Lucide icons
- Accent flags use emoji
- Age is displayed in tabular-nums font for alignment
- Bullets use `&bull;` character for attribute separation
