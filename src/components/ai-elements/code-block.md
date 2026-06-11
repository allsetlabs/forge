# CodeBlock

Syntax-highlighted code block with copy functionality and language selection.

## Import

```tsx
import {
  CodeBlock,
  CodeBlockContainer,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockFilename,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  highlightCode,
} from '@allsetlabs/forge/components/ai-elements/code-block';
```

## Features

- **Syntax Highlighting**: Powered by Shiki with GitHub themes
- **Line Numbers**: Optional line numbers with CSS counters
- **Copy to Clipboard**: Built-in copy button with success feedback
- **Language Selector**: Dropdown to change code language
- **Performance**: Async highlighting with caching and memoization
- **Dark Mode**: Automatic light/dark theme switching
- **Type Safe**: Full TypeScript support with BundledLanguage types

## Basic Usage

```tsx
<CodeBlock code="console.log('Hello World');" language="typescript" />
```

**Visual:**

> Code block with TypeScript syntax highlighting in bordered container.

## Props

### CodeBlock

| Prop            | Type              | Default | Description                |
| --------------- | ----------------- | ------- | -------------------------- |
| code            | `string`          | -       | Code to display (required) |
| language        | `BundledLanguage` | -       | Language for highlighting  |
| showLineNumbers | `boolean`         | `false` | Show line numbers          |
| className       | `string`          | -       | Additional CSS classes     |

### CodeBlockCopyButton

| Prop      | Type       | Default | Description               |
| --------- | ---------- | ------- | ------------------------- |
| onCopy    | `function` | -       | Copy success callback     |
| onError   | `function` | -       | Copy error callback       |
| timeout   | `number`   | `2000`  | Success icon timeout (ms) |
| className | `string`   | -       | Additional CSS classes    |

### CodeBlockLanguageSelector

| Prop          | Type                            | Default | Description              |
| ------------- | ------------------------------- | ------- | ------------------------ |
| value         | `string`                        | -       | Selected language        |
| onValueChange | `function`                      | -       | Language change callback |
| ...props      | `ComponentProps<typeof Select>` | -       | Select props             |

## Examples

### Example 1: Simple Code Block

```tsx
<CodeBlock
  code={`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
  language="typescript"
/>
```

**Visual:**

> TypeScript code with syntax highlighting, no header.

### Example 2: With Line Numbers

```tsx
<CodeBlock code={pythonCode} language="python" showLineNumbers />
```

**Visual:**

> Python code with line numbers in left gutter using muted color.

### Example 3: With Header and Copy Button

```tsx
<CodeBlockContainer language="typescript">
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockFilename>utils.ts</CodeBlockFilename>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent code={code} language="typescript" />
</CodeBlockContainer>
```

**Visual:**

> Code block with muted header showing filename and copy button that changes to checkmark on success.

### Example 4: With Language Selector

```tsx
const [language, setLanguage] = useState<BundledLanguage>('typescript');

<CodeBlockContainer language={language}>
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockLanguageSelector value={language} onValueChange={setLanguage}>
        <CodeBlockLanguageSelectorTrigger>
          <CodeBlockLanguageSelectorValue />
        </CodeBlockLanguageSelectorTrigger>
        <CodeBlockLanguageSelectorContent>
          <CodeBlockLanguageSelectorItem value="typescript">
            TypeScript
          </CodeBlockLanguageSelectorItem>
          <CodeBlockLanguageSelectorItem value="javascript">
            JavaScript
          </CodeBlockLanguageSelectorItem>
          <CodeBlockLanguageSelectorItem value="python">Python</CodeBlockLanguageSelectorItem>
        </CodeBlockLanguageSelectorContent>
      </CodeBlockLanguageSelector>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent code={code} language={language} showLineNumbers />
</CodeBlockContainer>;
```

**Visual:**

> Code block with language dropdown selector and line numbers. Copy button in header actions.

### Example 5: Custom Copy Callbacks

```tsx
<CodeBlock code={code} language="typescript">
  <CodeBlockHeader>
    <CodeBlockActions>
      <CodeBlockCopyButton
        onCopy={() => console.log('Code copied!')}
        onError={(error) => console.error('Copy failed:', error)}
        timeout={3000}
      />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>
```

**Visual:**

> Code block with custom copy success/error handling and 3-second timeout.

## Advanced Usage

### Manual Highlighting

```tsx
import { highlightCode } from '@allsetlabs/forge/components/ai-elements/code-block';

// Synchronous with callback for async result
const tokens = highlightCode(code, 'typescript', (result) => {
  console.log('Highlighted:', result);
});
```

### Custom Container Styling

```tsx
<CodeBlockContainer
  language="typescript"
  style={{
    containIntrinsicSize: 'auto 300px',
    contentVisibility: 'auto',
  }}
>
  <CodeBlockContent code={code} language="typescript" />
</CodeBlockContainer>
```

## Performance Features

- **Caching**: Highlighted tokens cached per code/language combination
- **Async Loading**: Syntax highlighting loads asynchronously without blocking
- **Raw Fallback**: Shows unstyled code immediately while highlighting loads
- **Memoization**: Components memoized to prevent unnecessary re-renders
- **Content Visibility**: Uses CSS content-visibility for large code blocks

## Supported Languages

All Shiki bundled languages are supported, including:

- `typescript`, `javascript`, `jsx`, `tsx`
- `python`, `java`, `go`, `rust`, `c`, `cpp`
- `json`, `yaml`, `toml`, `xml`, `html`, `css`
- `bash`, `shell`, `sql`, `graphql`, `markdown`
- And many more...

## Themes

- **Light**: `github-light`
- **Dark**: `github-dark`

Automatically switches based on system/app theme.

## Notes

- Uses Shiki for syntax highlighting (same as VS Code)
- Highlighting is cached and reused across components
- Line numbers use CSS counters for accessibility
- Copy button uses Clipboard API (requires HTTPS)
- Copy success icon shows for 2 seconds by default
- Code context shared via React context for copy button
- Font styles extracted from Shiki tokens (italic, bold, underline)
- Bitwise operations used for Shiki font style flags
- Empty lines render as single newline character
