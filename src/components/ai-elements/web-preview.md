# WebPreview

Embedded web browser preview with URL navigation and console output.

## Import

```tsx
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
  WebPreviewConsole,
} from '@allsetlabs/forge/components/ai-elements/web-preview';
```

## Features

- **URL Navigation**: Input field with Enter key support
- **Iframe Preview**: Sandboxed iframe for secure content display
- **Console Output**: Collapsible console showing logs, warnings, and errors
- **Navigation Buttons**: Back, forward, refresh, and custom actions
- **Context State**: Shared URL and console state via Context API

## Basic Usage

```tsx
<WebPreview defaultUrl="https://example.com">
  <WebPreviewNavigation>
    <WebPreviewUrl />
  </WebPreviewNavigation>
  <WebPreviewBody />
</WebPreview>
```

**Visual:**

> Card with navigation bar containing URL input, and iframe showing the loaded webpage.

## Props

### WebPreview

| Prop        | Type                  | Default | Description               |
| ----------- | --------------------- | ------- | ------------------------- |
| defaultUrl  | string                | ''      | Initial URL to load       |
| onUrlChange | (url: string) => void | -       | Callback when URL changes |
| className   | string                | -       | Additional CSS classes    |

### WebPreviewNavigationButton

| Prop     | Type       | Default | Description           |
| -------- | ---------- | ------- | --------------------- |
| tooltip  | string     | -       | Tooltip text on hover |
| onClick  | () => void | -       | Click handler         |
| disabled | boolean    | false   | Disabled state        |

### WebPreviewBody

| Prop      | Type      | Default | Description                 |
| --------- | --------- | ------- | --------------------------- |
| src       | string    | -       | Override URL from context   |
| loading   | ReactNode | -       | Loading indicator component |
| className | string    | -       | Additional CSS classes      |

### WebPreviewConsole

| Prop      | Type         | Default | Description               |
| --------- | ------------ | ------- | ------------------------- |
| logs      | ConsoleLog[] | []      | Array of console messages |
| className | string       | -       | Additional CSS classes    |

### ConsoleLog

```typescript
interface ConsoleLog {
  level: 'log' | 'warn' | 'error';
  message: string;
  timestamp: Date;
}
```

## Examples

### Example 1: With Navigation Buttons

```tsx
const iframeRef = useRef<HTMLIFrameElement>(null);

<WebPreview>
  <WebPreviewNavigation>
    <WebPreviewNavigationButton
      tooltip="Back"
      onClick={() => iframeRef.current?.contentWindow?.history.back()}
    >
      <ArrowLeftIcon className="size-4" />
    </WebPreviewNavigationButton>
    <WebPreviewNavigationButton
      tooltip="Forward"
      onClick={() => iframeRef.current?.contentWindow?.history.forward()}
    >
      <ArrowRightIcon className="size-4" />
    </WebPreviewNavigationButton>
    <WebPreviewNavigationButton
      tooltip="Refresh"
      onClick={() => iframeRef.current?.contentWindow?.location.reload()}
    >
      <RefreshCwIcon className="size-4" />
    </WebPreviewNavigationButton>
    <WebPreviewUrl />
  </WebPreviewNavigation>
  <WebPreviewBody ref={iframeRef} />
</WebPreview>;
```

**Visual:**

> Navigation bar with back, forward, refresh buttons and URL input.

### Example 2: With Console

```tsx
const [logs, setLogs] = useState<ConsoleLog[]>([]);

useEffect(() => {
  // Capture console messages from iframe
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === 'console') {
      setLogs((prev) => [
        ...prev,
        {
          level: event.data.level,
          message: event.data.message,
          timestamp: new Date(),
        },
      ]);
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);

<WebPreview>
  <WebPreviewNavigation>
    <WebPreviewUrl />
  </WebPreviewNavigation>
  <WebPreviewBody />
  <WebPreviewConsole logs={logs} />
</WebPreview>;
```

**Visual:**

> Preview with collapsible console panel at bottom showing timestamped log messages.

### Example 3: With Loading State

```tsx
const [loading, setLoading] = useState(true);

<WebPreview>
  <WebPreviewNavigation>
    <WebPreviewUrl />
  </WebPreviewNavigation>
  <WebPreviewBody
    onLoad={() => setLoading(false)}
    loading={
      loading && (
        <div className="bg-background absolute inset-0 flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
      )
    }
  />
</WebPreview>;
```

**Visual:**

> Spinner overlay while page loads, disappears when iframe finishes loading.

### Example 4: Custom URL Handler

```tsx
<WebPreview
  onUrlChange={(url) => {
    console.log('Navigating to:', url);
    // Track analytics, validate URL, etc.
  }}
>
  <WebPreviewNavigation>
    <WebPreviewUrl />
    <WebPreviewNavigationButton
      tooltip="Open in New Tab"
      onClick={() => {
        const { url } = useWebPreview();
        window.open(url, '_blank');
      }}
    >
      <ExternalLinkIcon className="size-4" />
    </WebPreviewNavigationButton>
  </WebPreviewNavigation>
  <WebPreviewBody />
</WebPreview>
```

**Visual:**

> Preview with external link button that opens current URL in new browser tab.

## Notes

- Iframe uses sandbox attribute for security:
  - `allow-scripts` - Allow JavaScript
  - `allow-same-origin` - Allow same-origin requests
  - `allow-forms` - Allow form submission
  - `allow-popups` - Allow popups
  - `allow-presentation` - Allow fullscreen
- Press Enter in URL input to navigate
- Console is collapsible with chevron icon indicator
- Console messages are color-coded: log (foreground), warn (yellow), error (red)
- Max console height is 48 (192px) with scroll
- Uses Context API for state management
- Navigation buttons use Tooltip component
- URL input syncs with context state bidirectionally
