# Suggestion

Horizontal scrollable list of suggestion chips/buttons for quick actions.

## Import

```tsx
import { Suggestions, Suggestion } from '@allsetlabs/forge/components/ai-elements/suggestion';
```

## Features

- **Horizontal Scroll**: Smooth scrolling for many suggestions
- **Pill-shaped Buttons**: Rounded full buttons with outline variant
- **Click Callbacks**: Pass suggestion text to onClick handler
- **Flexible Layout**: Uses flex-nowrap for single row display

## Basic Usage

```tsx
<Suggestions>
  <Suggestion suggestion="What is AI?" onClick={(text) => console.log(text)} />
  <Suggestion suggestion="Explain machine learning" onClick={(text) => console.log(text)} />
  <Suggestion suggestion="Show me examples" onClick={(text) => console.log(text)} />
</Suggestions>
```

**Visual:**

> Horizontal row of pill-shaped suggestion chips that scroll horizontally if they overflow.

## Props

### Suggestions

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### Suggestion

| Prop       | Type                         | Default   | Description                   |
| ---------- | ---------------------------- | --------- | ----------------------------- |
| suggestion | string                       | -         | Suggestion text (required)    |
| onClick    | (suggestion: string) => void | -         | Callback with suggestion text |
| variant    | ButtonVariant                | 'outline' | Button variant                |
| size       | ButtonSize                   | 'sm'      | Button size                   |
| className  | string                       | -         | Additional CSS classes        |

## Examples

### Example 1: Search Suggestions

```tsx
<Suggestions>
  <Suggestion suggestion="Latest news" onClick={(text) => performSearch(text)} />
  <Suggestion suggestion="Weather forecast" onClick={(text) => performSearch(text)} />
  <Suggestion suggestion="Sports scores" onClick={(text) => performSearch(text)} />
</Suggestions>
```

**Visual:**

> Three suggestion chips for quick search queries.

### Example 2: Chat Prompts

```tsx
const prompts = [
  'Tell me a joke',
  'Explain quantum physics',
  'Write a poem',
  'Help me debug code',
  'Create a recipe',
];

<Suggestions>
  {prompts.map((prompt) => (
    <Suggestion key={prompt} suggestion={prompt} onClick={(text) => sendMessage(text)} />
  ))}
</Suggestions>;
```

**Visual:**

> Multiple chat prompt chips in horizontal scrollable container.

### Example 3: Custom Styling

```tsx
<Suggestions>
  <Suggestion
    suggestion="Primary Action"
    variant="default"
    size="default"
    className="bg-primary text-white"
    onClick={handleAction}
  />
  <Suggestion suggestion="Secondary Action" variant="outline" onClick={handleAction} />
</Suggestions>
```

**Visual:**

> First suggestion with solid primary background, second with outline style.

### Example 4: With Icons

```tsx
<Suggestions>
  <Suggestion suggestion="Copy" onClick={handleCopy}>
    <CopyIcon className="mr-2 size-4" />
    Copy
  </Suggestion>
  <Suggestion suggestion="Share" onClick={handleShare}>
    <ShareIcon className="mr-2 size-4" />
    Share
  </Suggestion>
  <Suggestion suggestion="Delete" onClick={handleDelete}>
    <TrashIcon className="mr-2 size-4" />
    Delete
  </Suggestion>
</Suggestions>
```

**Visual:**

> Suggestion chips with icons on the left of text.

## Notes

- Hidden horizontal scrollbar for clean appearance
- Uses ScrollArea component with hidden ScrollBar
- Buttons are rounded-full for pill shape
- Default size is 'sm' for compact appearance
- Default variant is 'outline' for subtle appearance
- Click handler receives the suggestion text as argument
- Uses flex-nowrap to prevent wrapping
- Whitespace-nowrap to prevent text wrapping inside buttons
