# ModelSelector

Select AI models with provider logos and searchable interface.

## Import

```tsx
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorDialog,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorShortcut,
  ModelSelectorSeparator,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
} from '@allsetlabs/forge/components/ai-elements/model-selector';
```

## Features

- **Provider Logos**: Automatic logo loading from models.dev
- **Searchable**: Filter models with command palette interface
- **Grouping**: Organize models by provider or category
- **Keyboard Shortcuts**: Display shortcuts for quick selection
- **Multi-Provider Support**: Shows logos for models from multiple providers

## Basic Usage

```tsx
<ModelSelector>
  <ModelSelectorTrigger>Select Model</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput placeholder="Search models..." />
    <ModelSelectorList>
      <ModelSelectorGroup heading="OpenAI">
        <ModelSelectorItem value="gpt-4">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

**Visual:**

> Button that opens a dialog with searchable model list showing provider logos.

## Props

### ModelSelectorContent

| Prop  | Type        | Default            | Description                       |
| ----- | ----------- | ------------------ | --------------------------------- |
| title | `ReactNode` | `'Model Selector'` | Dialog title (screen reader only) |

### ModelSelectorLogo

| Prop     | Type     | Default | Description                                       |
| -------- | -------- | ------- | ------------------------------------------------- |
| provider | `string` | -       | Provider identifier (e.g., 'openai', 'anthropic') |

### ModelSelectorItem

| Prop  | Type     | Default | Description            |
| ----- | -------- | ------- | ---------------------- |
| value | `string` | -       | Model identifier value |

### ModelSelectorGroup

| Prop    | Type     | Default | Description        |
| ------- | -------- | ------- | ------------------ |
| heading | `string` | -       | Group heading text |

## Examples

### Example 1: Multiple Providers

```tsx
<ModelSelector>
  <ModelSelectorTrigger>Choose Model</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput placeholder="Search models..." />
    <ModelSelectorList>
      <ModelSelectorGroup heading="OpenAI">
        <ModelSelectorItem value="gpt-4">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4</ModelSelectorName>
        </ModelSelectorItem>
        <ModelSelectorItem value="gpt-3.5-turbo">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-3.5 Turbo</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
      <ModelSelectorSeparator />
      <ModelSelectorGroup heading="Anthropic">
        <ModelSelectorItem value="claude-3">
          <ModelSelectorLogo provider="anthropic" />
          <ModelSelectorName>Claude 3</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

**Visual:**

> Model selector with grouped providers separated by dividers.

### Example 2: With Keyboard Shortcuts

```tsx
<ModelSelector>
  <ModelSelectorTrigger>Select Model</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>
      <ModelSelectorGroup heading="Quick Access">
        <ModelSelectorItem value="gpt-4">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4</ModelSelectorName>
          <ModelSelectorShortcut>⌘1</ModelSelectorShortcut>
        </ModelSelectorItem>
        <ModelSelectorItem value="claude-3">
          <ModelSelectorLogo provider="anthropic" />
          <ModelSelectorName>Claude 3</ModelSelectorName>
          <ModelSelectorShortcut>⌘2</ModelSelectorShortcut>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

**Visual:**

> Model list with keyboard shortcuts displayed on the right side.

### Example 3: Multi-Provider Models

```tsx
<ModelSelector>
  <ModelSelectorTrigger>Select Model</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>
      <ModelSelectorGroup heading="Available via Multiple Providers">
        <ModelSelectorItem value="llama-2">
          <ModelSelectorLogoGroup>
            <ModelSelectorLogo provider="llama" />
            <ModelSelectorLogo provider="huggingface" />
            <ModelSelectorLogo provider="togetherai" />
          </ModelSelectorLogoGroup>
          <ModelSelectorName>Llama 2</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

**Visual:**

> Model item with multiple overlapping provider logos showing availability.

### Example 4: With Empty State

```tsx
<ModelSelector>
  <ModelSelectorTrigger>Select Model</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput placeholder="Search models..." />
    <ModelSelectorList>
      <ModelSelectorEmpty>No models found. Try a different search term.</ModelSelectorEmpty>
      <ModelSelectorGroup heading="Popular">
        <ModelSelectorItem value="gpt-4">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

**Visual:**

> Shows custom empty state message when search yields no results.

## Notes

- Provider logos are loaded from `https://models.dev/logos/{provider}.svg`
- Logos use `dark:invert` for automatic dark mode support
- Provider type supports 40+ providers with autocomplete
- Use `ModelSelectorLogoGroup` for models available from multiple providers
- Logos in groups overlap with `-space-x-1` and have ring borders
- Dialog content has no border styling by default
- ModelSelectorName truncates long model names
- Search is case-insensitive and fuzzy-matched via Command component
- Dialog title is screen-reader only (sr-only) for accessibility
