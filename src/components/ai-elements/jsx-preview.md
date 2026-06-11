# JSXPreview

Render and preview JSX code dynamically with streaming support and error handling.

## Import

```tsx
import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
} from '@allsetlabs/forge/components/ai-elements/jsx-preview';
```

## Features

- **Dynamic JSX Rendering**: Parse and render JSX strings at runtime
- **Streaming Support**: Auto-complete incomplete JSX tags during streaming
- **Error Handling**: Display parsing/rendering errors gracefully
- **Custom Components**: Pass custom React components for rendering
- **Bindings Support**: Inject variables/functions into JSX scope

## Basic Usage

```tsx
<JSXPreview jsx="<div>Hello World</div>">
  <JSXPreviewContent />
  <JSXPreviewError />
</JSXPreview>
```

**Visual:**

> Renders "Hello World" in a div. Shows error message if JSX is invalid.

## Props

### JSXPreview

| Prop        | Type                     | Default | Description                          |
| ----------- | ------------------------ | ------- | ------------------------------------ |
| jsx         | `string`                 | -       | JSX code to render                   |
| isStreaming | `boolean`                | `false` | Auto-complete incomplete tags        |
| components  | `object`                 | -       | Custom components available in JSX   |
| bindings    | `object`                 | -       | Variables/functions available in JSX |
| onError     | `(error: Error) => void` | -       | Error callback                       |

### JSXPreviewError

| Prop     | Type                                         | Default | Description           |
| -------- | -------------------------------------------- | ------- | --------------------- |
| children | `ReactNode \| ((error: Error) => ReactNode)` | -       | Custom error renderer |

## Examples

### Example 1: With Custom Components

```tsx
const Button = ({ children }) => <button className="btn">{children}</button>;

<JSXPreview jsx="<Button>Click Me</Button>" components={{ Button }}>
  <JSXPreviewContent />
  <JSXPreviewError />
</JSXPreview>;
```

**Visual:**

> Renders a button with "Click Me" text using the custom Button component.

### Example 2: Streaming JSX

```tsx
const [jsx, setJsx] = useState('<div>Loading');
const [isStreaming, setIsStreaming] = useState(true);

// Simulate streaming
useEffect(() => {
  setTimeout(() => {
    setJsx('<div>Loading...</div>');
    setIsStreaming(false);
  }, 1000);
}, []);

<JSXPreview jsx={jsx} isStreaming={isStreaming}>
  <JSXPreviewContent />
  <JSXPreviewError />
</JSXPreview>;
```

**Visual:**

> Initially shows "Loading" with auto-completed closing tag. After 1s, shows "Loading..." fully rendered.

### Example 3: With Bindings

```tsx
const handleClick = () => alert('Clicked!');

<JSXPreview
  jsx="<button onClick={handleClick}>Click</button>"
  bindings={{ handleClick }}
  components={{ button: 'button' }}
>
  <JSXPreviewContent />
  <JSXPreviewError />
</JSXPreview>;
```

**Visual:**

> Button that triggers alert when clicked, using bound function.

### Example 4: Custom Error Display

```tsx
<JSXPreview jsx="<InvalidTag>">
  <JSXPreviewContent />
  <JSXPreviewError>
    {(error) => (
      <div className="custom-error">
        <h4>Rendering Failed</h4>
        <p>{error.message}</p>
      </div>
    )}
  </JSXPreviewError>
</JSXPreview>
```

**Visual:**

> Custom error UI with heading and error message instead of default error display.

### Example 5: Error Callback

```tsx
const handleError = (error) => {
  console.error('JSX error:', error);
  trackError(error);
};

<JSXPreview jsx="<BrokenComponent />" onError={handleError}>
  <JSXPreviewContent />
  <JSXPreviewError />
</JSXPreview>;
```

**Visual:**

> Logs error to console and tracking service when rendering fails.

## Notes

- Uses `react-jsx-parser` under the hood for JSX parsing
- Streaming mode auto-completes incomplete tags using stack-based algorithm
- Errors are tracked per JSX string to prevent duplicate error reports
- Error state automatically clears when JSX changes
- Default error display shows alert icon and error message
- Content renders without wrapper element (`renderInWrapper={false}`)
- Components must be explicitly passed via `components` prop to be available in JSX
- Bindings allow injecting variables, functions, and other values into JSX scope
