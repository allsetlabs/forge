# OpenIn

Open prompts in various AI chat platforms (ChatGPT, Claude, Cursor, etc.).

## Import

```tsx
import {
  OpenIn,
  OpenInTrigger,
  OpenInContent,
  OpenInItem,
  OpenInLabel,
  OpenInSeparator,
  OpenInChatGPT,
  OpenInClaude,
  OpenInT3,
  OpenInScira,
  OpenInv0,
  OpenInCursor,
} from '@allsetlabs/forge/components/ai-elements/open-in-chat';
```

## Features

- **Multi-Platform**: Support for ChatGPT, Claude, Cursor, v0, T3 Chat, and Scira
- **Provider Icons**: SVG icons for each platform
- **Query Passing**: Automatically formats prompts for each platform's URL scheme
- **External Links**: Opens in new tabs with proper `rel` attributes
- **Dropdown Menu**: Organized platform selection interface

## Basic Usage

```tsx
<OpenIn query="Explain React hooks">
  <OpenInTrigger />
  <OpenInContent>
    <OpenInChatGPT />
    <OpenInClaude />
    <OpenInCursor />
  </OpenInContent>
</OpenIn>
```

**Visual:**

> Button labeled "Open in chat" that reveals a dropdown menu with ChatGPT, Claude, and Cursor options, each with their logo.

## Props

### OpenIn

| Prop  | Type     | Default | Description                       |
| ----- | -------- | ------- | --------------------------------- |
| query | `string` | -       | Prompt/query to pass to platforms |

## Examples

### Example 1: All Platforms

```tsx
<OpenIn query="Write a TypeScript function">
  <OpenInTrigger />
  <OpenInContent>
    <OpenInLabel>Chat Platforms</OpenInLabel>
    <OpenInChatGPT />
    <OpenInClaude />
    <OpenInT3 />
    <OpenInScira />
    <OpenInSeparator />
    <OpenInLabel>Code Editors</OpenInLabel>
    <OpenInCursor />
    <OpenInSeparator />
    <OpenInLabel>Design Tools</OpenInLabel>
    <OpenInv0 />
  </OpenInContent>
</OpenIn>
```

**Visual:**

> Organized dropdown menu with labeled sections for different platform categories.

### Example 2: Custom Trigger

```tsx
<OpenIn query="Debug this code">
  <OpenInTrigger>
    <Button variant="outline" size="sm">
      <ExternalLinkIcon className="mr-2 size-4" />
      Share with AI
    </Button>
  </OpenInTrigger>
  <OpenInContent>
    <OpenInChatGPT />
    <OpenInClaude />
  </OpenInContent>
</OpenIn>
```

**Visual:**

> Custom button with external link icon as the dropdown trigger.

### Example 3: Subset of Platforms

```tsx
<OpenIn query="Refactor this component">
  <OpenInTrigger />
  <OpenInContent>
    <OpenInChatGPT />
    <OpenInClaude />
  </OpenInContent>
</OpenIn>
```

**Visual:**

> Minimal dropdown showing only ChatGPT and Claude options.

### Example 4: With Custom Items

```tsx
<OpenIn query="Analyze this data">
  <OpenInTrigger />
  <OpenInContent>
    <OpenInChatGPT />
    <OpenInClaude />
    <OpenInSeparator />
    <OpenInItem asChild>
      <a href={customUrl} target="_blank" rel="noopener noreferrer">
        <CustomIcon className="mr-2 size-4" />
        Custom Platform
        <ExternalLinkIcon className="ml-auto size-4" />
      </a>
    </OpenInItem>
  </OpenInContent>
</OpenIn>
```

**Visual:**

> Dropdown with standard platforms plus a custom platform option.

## Notes

- **URL Formats**:
  - ChatGPT: `https://chatgpt.com/?hints=search&prompt={query}`
  - Claude: `https://claude.ai/new?q={query}`
  - Cursor: `https://cursor.com/link/prompt?text={query}`
  - T3 Chat: `https://t3.chat/new?q={query}`
  - Scira: `https://scira.ai/?q={query}`
  - v0: `https://v0.app?q={query}`
- All links open in new tab with `target="_blank"` and `rel="noopener noreferrer"`
- Provider icons are inline SVGs for optimal performance
- Icons include `<title>` tags for accessibility
- External link icon appears on the right of each item
- Default trigger shows "Open in chat" with chevron down icon
- Query is automatically URL-encoded when passed to platforms
- Each platform component is a dropdown menu item wrapped in an anchor tag
