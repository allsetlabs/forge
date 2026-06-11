# PromptInput

Advanced chat input with file attachments, drag-and-drop, paste support, and provider state management.

## Import

```tsx
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputSubmit,
  usePromptInputController,
  usePromptInputAttachments,
  useProviderAttachments,
} from '@allsetlabs/forge/components/ai-elements/prompt-input';
```

## Features

- **File Attachments**: Upload files via button, drag-and-drop, or paste
- **Global State Management**: Optional provider for cross-component state
- **Validation**: File type, size, and count limits
- **Auto-Submit**: Press Enter to submit (Shift+Enter for new line)
- **Backspace Delete**: Remove last attachment with backspace on empty textarea
- **Loading States**: Visual feedback during submission
- **Responsive**: Auto-resizing textarea with max height

## Basic Usage

```tsx
const handleSubmit = ({ text, files }) => {
  console.log('Text:', text);
  console.log('Files:', files);
};

<PromptInput onSubmit={handleSubmit}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>;
```

**Visual:**

> Text input with submit button. Press Enter to submit.

## Props

### PromptInput

| Prop            | Type                                                                       | Default | Description                            |
| --------------- | -------------------------------------------------------------------------- | ------- | -------------------------------------- |
| onSubmit        | `(message: PromptInputMessage, event: FormEvent) => void \| Promise<void>` | -       | Submit handler                         |
| accept          | `string`                                                                   | -       | Accepted file types (e.g., "image/\*") |
| multiple        | `boolean`                                                                  | -       | Allow multiple files                   |
| globalDrop      | `boolean`                                                                  | `false` | Accept drops anywhere on page          |
| syncHiddenInput | `boolean`                                                                  | `false` | Sync with hidden form input            |
| maxFiles        | `number`                                                                   | -       | Maximum file count                     |
| maxFileSize     | `number`                                                                   | -       | Maximum file size in bytes             |
| onError         | `(err: object) => void`                                                    | -       | Error handler                          |

### PromptInputSubmit

| Prop   | Type                                    | Default | Description             |
| ------ | --------------------------------------- | ------- | ----------------------- |
| status | `'submitted' \| 'streaming' \| 'error'` | -       | Submission status       |
| onStop | `() => void`                            | -       | Stop streaming callback |

### PromptInputButton

| Prop    | Type                                                                 | Default | Description           |
| ------- | -------------------------------------------------------------------- | ------- | --------------------- |
| tooltip | `string \| { content: ReactNode; shortcut?: string; side?: string }` | -       | Tooltip configuration |

## Examples

### Example 1: With File Attachments

```tsx
<PromptInput
  onSubmit={handleSubmit}
  accept="image/*"
  multiple
  maxFiles={5}
  maxFileSize={5 * 1024 * 1024} // 5MB
>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputButton tooltip="Attach files">
        <PaperclipIcon className="size-4" />
      </PromptInputButton>
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>
```

**Visual:**

> Input with paperclip button to attach images. Max 5 files, 5MB each.

### Example 2: With Provider (Global State)

```tsx
function App() {
  return (
    <PromptInputProvider initialInput="">
      <ChatInterface />
      <SidebarActions />
    </PromptInputProvider>
  );
}

function ChatInterface() {
  const { textInput, attachments } = usePromptInputController();

  return (
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputBody>
        <PromptInputTextarea />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  );
}

function SidebarActions() {
  const { openFileDialog } = useProviderAttachments();

  return <Button onClick={openFileDialog}>Add Files from Sidebar</Button>;
}
```

**Visual:**

> Multiple components share input state. Sidebar button can trigger file dialog.

### Example 3: With Action Menu

```tsx
<PromptInput onSubmit={handleSubmit} accept="image/*,video/*">
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputActionMenu>
        <PromptInputActionMenuTrigger />
        <PromptInputActionMenuContent>
          <PromptInputActionAddAttachments label="Add photos or videos" />
          <PromptInputActionMenuItem>
            <CameraIcon className="mr-2 size-4" />
            Take Photo
          </PromptInputActionMenuItem>
        </PromptInputActionMenuContent>
      </PromptInputActionMenu>
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>
```

**Visual:**

> Plus button opens menu with "Add photos or videos" and "Take Photo" options.

### Example 4: With Loading State

```tsx
const [status, setStatus] = useState<ChatStatus>();

const handleSubmit = async ({ text, files }) => {
  setStatus('submitted');
  await sendMessage(text, files);
  setStatus(undefined);
};

const handleStop = () => {
  stopGeneration();
  setStatus(undefined);
};

<PromptInput onSubmit={handleSubmit}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputSubmit status={status} onStop={handleStop} />
  </PromptInputFooter>
</PromptInput>;
```

**Visual:**

> Submit button shows spinner during submission, stop icon during streaming.

### Example 5: Error Handling

```tsx
const handleError = (err) => {
  if (err.code === 'max_files') {
    toast.error('Too many files selected');
  } else if (err.code === 'max_file_size') {
    toast.error('File size exceeds limit');
  } else if (err.code === 'accept') {
    toast.error('File type not accepted');
  }
};

<PromptInput
  onSubmit={handleSubmit}
  accept="image/*"
  maxFiles={3}
  maxFileSize={2 * 1024 * 1024}
  onError={handleError}
>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>;
```

**Visual:**

> Shows toast notifications when file validation fails.

## Notes

- **File Handling**:
  - Blob URLs automatically converted to data URLs before submission
  - File input is hidden, triggered programmatically
  - Supports drag-and-drop on form or globally
  - Paste detection extracts files from clipboard
- **Keyboard Shortcuts**:
  - Enter: Submit (unless composing or Shift held)
  - Shift+Enter: New line
  - Backspace (empty textarea): Remove last attachment
- **State Management**:
  - Use `PromptInputProvider` for global state across components
  - Without provider, state is local to PromptInput
  - Provider allows external components to open file dialog
- **Textarea Behavior**:
  - Auto-resizes with content (field-sizing-content)
  - Max height: 12rem (max-h-48)
  - Min height: 4rem (min-h-16)
- **Submit States**:
  - `submitted`: Shows spinner
  - `streaming`: Shows stop icon
  - `error`: Shows X icon
  - Default: Shows corner-down-left icon (Enter)
- **Validation**:
  - Files validated before adding to state
  - Size/type/count limits enforced
  - Invalid files trigger onError callback
- Form auto-resets on successful submission
- Async onSubmit supported with proper error handling
