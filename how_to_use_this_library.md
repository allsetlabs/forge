# @allsetlabs/forge Component Library

Complete documentation for the forge component library built with React, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install github:subbiah2806/component
```

**Peer Dependencies:** Requires React 19.2.0+ and Tailwind CSS 3.4.3+ (should already be in your project)

## Setup

### 1. Configure TypeScript

Add path mapping to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@allsetlabs/forge/*": ["./node_modules/@allsetlabs/forge/src/*"]
    }
  }
}
```

This enables clean imports like `import { Button } from '@allsetlabs/forge/components/ui/button'`.

### 2. Configure Tailwind

Use the library's tailwind configuration as your base config:

```js
// tailwind.config.js
import baseConfig from '@allsetlabs/forge/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  // Add your custom overrides here if needed
};
```

### 3. Initialize Forge Chunks (Required)

Wrap your root app component with `InitializeForgeChunks` to set up the library:

```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';

function App() {
  return (
    <InitializeForgeChunks>
      <YourApp />
    </InitializeForgeChunks>
  );
}
```

**Important:** `InitializeForgeChunks` automatically:

- Imports all necessary styles (`@allsetlabs/forge/styles`)
- Initializes **Providers** for statefulComponents

You **do not** need to manually wrap your app with these providers - they are already included!

## Component Documentation

### Setup & Configuration

- **[InitializeForgeChunks](./src/InitializeForgeChunks.md)** - Required wrapper component that sets up all providers and styles

### UI Components

Located in `@allsetlabs/forge/components/ui/`

- **[Accordion](./src/components/ui/accordion.md)** - Collapsible content sections with animated expand/collapse
- **[Alert](./src/components/ui/alert.md)** - Callout component for important messages with variant styles
- **[Alert Dialog](./src/components/ui/alert-dialog.md)** - Modal confirmation dialog for destructive or important actions
- **[Avatar](./src/components/ui/avatar.md)** - User avatar with image and fallback support
- **[Badge](./src/components/ui/badge.md)** - Compact label for status, categories, or metadata
- **[Breadcrumb](./src/components/ui/breadcrumb.md)** - Navigation breadcrumb trail with separator support
- **[Button](./src/components/ui/button.md)** - Versatile button with multiple variants, sizes, and polymorphic rendering
- **[Button Group](./src/components/ui/button-group.md)** - Grouped button container for related actions
- **[Card](./src/components/ui/card.md)** - Flexible container with semantic sub-components for structured layouts
- **[Carousel](./src/components/ui/carousel.md)** - Embla-based carousel/slider component with navigation controls
- **[Checkbox](./src/components/ui/checkbox.md)** - Accessible checkbox input built on Radix UI
- **[Collapsible](./src/components/ui/collapsible.md)** - Simple expand/collapse container for single sections
- **[Command](./src/components/ui/command.md)** - Command palette with search, groups, and keyboard navigation
- **[Context Menu](./src/components/ui/context-menu.md)** - Right-click context menu with items, checkboxes, and submenus
- **[Dialog](./src/components/ui/dialog.md)** - Modal dialog component built on Radix UI with accessible focus management
- **[Drawer](./src/components/ui/drawer.md)** - Mobile-friendly bottom sheet/drawer component
- **[Dropdown Menu](./src/components/ui/dropdown-menu.md)** - Versatile dropdown menu with items, checkboxes, radio groups, and nested submenus
- **[File Intellisense Picker](./src/components/ui/file-intellisense-picker.md)** - Virtualized file picker with keyboard navigation, filtering, and autocomplete support
- **[Flip Clock](./src/components/ui/flip-clock.md)** - Animated flip clock display for countdowns and time
- **[Form](./src/components/ui/form/form.md)** - Complete form management with React Hook Form integration
- **[Heatmap](./src/components/ui/heatmap.md)** - Data visualization heatmap grid component
- **[Hover Card](./src/components/ui/hover-card.md)** - Popup card shown on hover for preview content
- **[Input](./src/components/ui/input.md)** - Styled text input with consistent appearance
- **[Input Group](./src/components/ui/input-group.md)** - Input with prefix/suffix addons and icon support
- **[Kbd](./src/components/ui/kbd.md)** - Keyboard shortcut display component
- **[Label](./src/components/ui/label.md)** - Accessible form label built on Radix UI
- **[Navigation Menu](./src/components/ui/navigation-menu.md)** - Horizontal navigation menu with dropdown content
- **[Pagination](./src/components/ui/pagination.md)** - Page navigation with previous/next and page links
- **[Popover](./src/components/ui/popover.md)** - Floating overlay for filters, pickers, and rich content
- **[Progress](./src/components/ui/progress.md)** - Progress bar indicator for loading and completion states
- **[Radio Group](./src/components/ui/radio-group.md)** - Radio button group for exclusive option selection
- **[Scroll Area](./src/components/ui/scroll-area.md)** - Custom scrollbar area for long content and lists
- **[Select](./src/components/ui/select.md)** - Dropdown select input with search and group support
- **[Separator](./src/components/ui/separator.md)** - Visual divider for horizontal or vertical separation
- **[Sheet](./src/components/ui/sheet.md)** - Modal drawer/sheet with slide-in animations from four directions
- **[Slash Command Picker](./src/components/ui/slash-command-picker.md)** - Keyboard-navigable command picker for grouped slash commands with filtering
- **[Skeleton](./src/components/ui/skeleton.md)** - Loading placeholder with pulse animation
- **[Slider](./src/components/ui/slider.md)** - Range input slider for numeric value selection
- **[Sonner (Toast)](./src/components/ui/sonner.md)** - Toast notification system for feedback messages
- **[Spinner](./src/components/ui/spinner.md)** - Loading spinner with size variants
- **[Switch](./src/components/ui/switch.md)** - Toggle switch for on/off settings
- **[Table](./src/components/ui/table.md)** - Data table with header, body, footer, and cell sub-components
- **[Tabs](./src/components/ui/tabs.md)** - Tabbed content organization with trigger and content panels
- **[Text Stagger InView](./src/components/ui/text-stagger-inview.md)** - Animated text that staggers in on scroll/viewport entry
- **[Textarea](./src/components/ui/textarea.md)** - Multi-line text input component
- **[Timeline](./src/components/ui/timeline.md)** - Vertical timeline component for chronological events
- **[Toggle](./src/components/ui/toggle.md)** - Toggle button with pressed/unpressed state and variants
- **[Toggle Group](./src/components/ui/toggle-group.md)** - Grouped toggle buttons for multi-select or single-select
- **[Tooltip](./src/components/ui/tooltip.md)** - Popup component for informative text on hover/focus
- **[VideoRangeSlider](./src/components/ui/video-range-slider.md)** - Video trimming slider with start/end and thumbnail position controls

### AI Element Components

Located in `@allsetlabs/forge/components/ai-elements/` - Components from the [@ai-elements registry](https://elements.ai-sdk.dev) for building AI-powered interfaces.

- **[Agent](./src/components/ai-elements/agent.md)** - AI agent display component
- **[Artifact](./src/components/ai-elements/artifact.md)** - AI-generated artifact viewer
- **[Attachments](./src/components/ai-elements/attachments.md)** - File attachment display
- **[Audio Player](./src/components/ai-elements/audio-player.md)** - Audio playback component
- **[Canvas](./src/components/ai-elements/canvas.md)** - Drawing/canvas component
- **[Chain of Thought](./src/components/ai-elements/chain-of-thought.md)** - AI reasoning chain display
- **[Checkpoint](./src/components/ai-elements/checkpoint.md)** - Workflow checkpoint indicator
- **[Code Block](./src/components/ai-elements/code-block.md)** - Syntax-highlighted code display
- **[Commit](./src/components/ai-elements/commit.md)** - Git commit display component
- **[Confirmation](./src/components/ai-elements/confirmation.md)** - Action confirmation dialog
- **[Connection](./src/components/ai-elements/connection.md)** - Connection status indicator
- **[Context](./src/components/ai-elements/context.md)** - Context/memory display
- **[Controls](./src/components/ai-elements/controls.md)** - Playback/interaction controls
- **[Conversation](./src/components/ai-elements/conversation.md)** - Chat conversation container
- **[Edge](./src/components/ai-elements/edge.md)** - Graph edge connector
- **[Environment Variables](./src/components/ai-elements/environment-variables.md)** - Environment variable display
- **[File Tree](./src/components/ai-elements/file-tree.md)** - File system tree view
- **[Image](./src/components/ai-elements/image.md)** - Image display with AI context
- **[Inline Citation](./src/components/ai-elements/inline-citation.md)** - Inline source citation
- **[JSX Preview](./src/components/ai-elements/jsx-preview.md)** - Live JSX preview renderer
- **[Message](./src/components/ai-elements/message.md)** - Chat message component
- **[Mic Selector](./src/components/ai-elements/mic-selector.md)** - Microphone input selector
- **[Model Selector](./src/components/ai-elements/model-selector.md)** - AI model selector
- **[Node](./src/components/ai-elements/node.md)** - Graph node component
- **[Open in Chat](./src/components/ai-elements/open-in-chat.md)** - Open-in-chat action button
- **[Package Info](./src/components/ai-elements/package-info.md)** - Package information display
- **[Panel](./src/components/ai-elements/panel.md)** - Collapsible panel container
- **[Persona](./src/components/ai-elements/persona.md)** - AI persona display
- **[Plan](./src/components/ai-elements/plan.md)** - Task plan display
- **[Prompt Input](./src/components/ai-elements/prompt-input.md)** - AI prompt input field
- **[Queue](./src/components/ai-elements/queue.md)** - Task queue display
- **[Reasoning](./src/components/ai-elements/reasoning.md)** - AI reasoning display
- **[Sandbox](./src/components/ai-elements/sandbox.md)** - Code sandbox environment
- **[Schema Display](./src/components/ai-elements/schema-display.md)** - Data schema viewer
- **[Shimmer](./src/components/ai-elements/shimmer.md)** - Loading shimmer effect
- **[Snippet](./src/components/ai-elements/snippet.md)** - Code snippet display
- **[Sources](./src/components/ai-elements/sources.md)** - Source attribution list
- **[Speech Input](./src/components/ai-elements/speech-input.md)** - Voice input component
- **[Stack Trace](./src/components/ai-elements/stack-trace.md)** - Error stack trace display
- **[Suggestion](./src/components/ai-elements/suggestion.md)** - AI suggestion chip/card
- **[Task](./src/components/ai-elements/task.md)** - Task status display
- **[Terminal](./src/components/ai-elements/terminal.md)** - Terminal emulator component
- **[Test Results](./src/components/ai-elements/test-results.md)** - Test result display
- **[Tool](./src/components/ai-elements/tool.md)** - Tool invocation display
- **[Toolbar](./src/components/ai-elements/toolbar.md)** - Action toolbar
- **[Transcription](./src/components/ai-elements/transcription.md)** - Audio transcription display
- **[Voice Selector](./src/components/ai-elements/voice-selector.md)** - Voice output selector
- **[Web Preview](./src/components/ai-elements/web-preview.md)** - Web page preview component

### Stateful Components

Located in `@allsetlabs/forge/statefulComponents/`

- **[Auth](./src/statefulComponents/auth/auth.md)** - Authentication state management with user/token persistence and login/logout methods
- **[Audio](./src/statefulComponents/audio/audio.md)** - Global audio feedback system with click sounds and mute control
- **[Cursor](./src/statefulComponents/cursor/cursor.md)** - Custom animated cursor with hover effects and device detection
- **[ExtensionAuth](./src/statefulComponents/extensionAuth/extensionAuth.md)** - Chrome extension auth provider that reads from chrome.storage.local
- **[Theme](./src/statefulComponents/theme/theme.md)** - Dark mode theme management with provider, context, and toggle

### Auth Components

Located in `@allsetlabs/forge/components/auth-*/` - Work with the **Auth** stateful component for complete authentication flows.

- **[AuthLogin](./src/components/auth-login/auth-login.md)** - OAuth login component with support for Google and extensible architecture for other providers

### Utility Components

- **[DataFetchWrapper](./src/components/DataFetchWrapper.md)** - Smart wrapper for loading, error, and empty states
- **[BackgroundGradient](./src/components/BackgroundGradient.md)** - Animated floating gradient orbs background
- **[ErrorBoundary](./src/components/ErrorBoundary.md)** - React error boundary with fallback UI

### Icons

- **[Icons](./src/icons/icons.md)** - Collection of standardized SVG icons (navigation, contact, social, status, actions, loading)

### Hooks

- **[useStorage](./src/hooks/useStorage.md)** - Controlled/uncontrolled component pattern hook with fallback state

### Utilities

- **[Utility Functions](./src/lib/utils.md)** - Helper functions including `cn()` for class name merging
- **[Resume Generator](./src/lib/generateResume/generateResume.md)** - ATS-friendly resume generator for DOCX and PDF formats

### Types

- **[Types](./src/types/types.md)** - TypeScript type definitions for auth and other shared interfaces

### Styles

- **[Global Styles](./src/styles/styles.md)** - Theme system, CSS variables, custom animations, and utility classes

## TypeScript Support

All components are fully typed with TypeScript. Import types directly:

```tsx
import type { ButtonProps } from '@allsetlabs/forge/components/ui/button';
```

## Styling

Components use Tailwind CSS and support:

- Custom `className` prop for additional styles
- Full Tailwind utility classes

---

**Last Updated:** Auto-generated on commit
**Version:** 2.0.0
