# Commit

Display git commit information with collapsible file changes.

## Import

```tsx
import {
  Commit,
  CommitHeader,
  CommitHash,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitInfo,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitTimestamp,
  CommitActions,
  CommitCopyButton,
  CommitContent,
  CommitFiles,
  CommitFile,
  CommitFileInfo,
  CommitFileStatus,
  CommitFileIcon,
  CommitFilePath,
  CommitFileChanges,
  CommitFileAdditions,
  CommitFileDeletions,
} from '@allsetlabs/forge/components/ai-elements/commit';
```

## Features

- **Collapsible**: Expand to show file changes
- **File Status**: Color-coded added, modified, deleted, renamed
- **Copy Hash**: Copy commit hash to clipboard
- **Relative Time**: Automatic relative timestamps
- **Author Avatar**: Initials-based avatar
- **File Stats**: Show additions/deletions per file
- **Action Isolation**: Click events don't trigger collapse

## Basic Usage

```tsx
<Commit>
  <CommitHeader>
    <CommitInfo>
      <CommitMessage>Fix authentication bug</CommitMessage>
      <CommitMetadata>
        <CommitHash>a1b2c3d</CommitHash>
        <CommitSeparator />
        <CommitTimestamp date={new Date()} />
      </CommitMetadata>
    </CommitInfo>
  </CommitHeader>
</Commit>
```

**Visual:**

> Collapsible commit card with message, hash, and timestamp. Hover to reveal expand indicator.

## Props

### CommitHash

| Prop      | Type        | Default | Description            |
| --------- | ----------- | ------- | ---------------------- |
| children  | `ReactNode` | -       | Hash string            |
| className | `string`    | -       | Additional CSS classes |

### CommitTimestamp

| Prop      | Type        | Default | Description            |
| --------- | ----------- | ------- | ---------------------- |
| date      | `Date`      | -       | Commit date (required) |
| children  | `ReactNode` | -       | Custom formatted time  |
| className | `string`    | -       | Additional CSS classes |

### CommitAuthorAvatar

| Prop      | Type     | Default | Description                |
| --------- | -------- | ------- | -------------------------- |
| initials  | `string` | -       | Author initials (required) |
| className | `string` | -       | Additional CSS classes     |

### CommitCopyButton

| Prop      | Type       | Default | Description               |
| --------- | ---------- | ------- | ------------------------- |
| hash      | `string`   | -       | Hash to copy (required)   |
| onCopy    | `function` | -       | Copy success callback     |
| onError   | `function` | -       | Copy error callback       |
| timeout   | `number`   | `2000`  | Success icon timeout (ms) |
| className | `string`   | -       | Additional CSS classes    |

### CommitFileStatus

| Prop      | Type                                                    | Default | Description            |
| --------- | ------------------------------------------------------- | ------- | ---------------------- |
| status    | `'added'` \| `'modified'` \| `'deleted'` \| `'renamed'` | -       | File status            |
| children  | `ReactNode`                                             | -       | Custom label           |
| className | `string`                                                | -       | Additional CSS classes |

### CommitFileAdditions / CommitFileDeletions

| Prop      | Type        | Default | Description            |
| --------- | ----------- | ------- | ---------------------- |
| count     | `number`    | -       | Number of changes      |
| children  | `ReactNode` | -       | Custom display         |
| className | `string`    | -       | Additional CSS classes |

## Examples

### Example 1: Complete Commit

```tsx
<Commit>
  <CommitHeader>
    <CommitAuthor>
      <CommitAuthorAvatar initials="SC" />
    </CommitAuthor>
    <CommitInfo>
      <CommitMessage>feat: add dark mode support</CommitMessage>
      <CommitMetadata>
        <CommitHash>d4e5f6g</CommitHash>
        <CommitSeparator />
        <CommitTimestamp date={new Date('2024-01-15')} />
      </CommitMetadata>
    </CommitInfo>
    <CommitActions>
      <CommitCopyButton hash="d4e5f6g" />
    </CommitActions>
  </CommitHeader>
  <CommitContent>
    <CommitFiles>
      <CommitFile>
        <CommitFileInfo>
          <CommitFileStatus status="modified" />
          <CommitFileIcon />
          <CommitFilePath>src/theme.ts</CommitFilePath>
        </CommitFileInfo>
        <CommitFileChanges>
          <CommitFileAdditions count={25} />
          <CommitFileDeletions count={10} />
        </CommitFileChanges>
      </CommitFile>
      <CommitFile>
        <CommitFileInfo>
          <CommitFileStatus status="added" />
          <CommitFileIcon />
          <CommitFilePath>src/components/ThemeToggle.tsx</CommitFilePath>
        </CommitFileInfo>
        <CommitFileChanges>
          <CommitFileAdditions count={45} />
        </CommitFileChanges>
      </CommitFile>
    </CommitFiles>
  </CommitContent>
</Commit>
```

**Visual:**

> Collapsible commit with avatar, message, hash, timestamp, and copy button. Expands to show two files with status, icons, paths, and change counts.

### Example 2: File Status Colors

```tsx
<CommitFiles>
  <CommitFile>
    <CommitFileStatus status="added" />
    <CommitFilePath>new-file.ts</CommitFilePath>
  </CommitFile>
  <CommitFile>
    <CommitFileStatus status="modified" />
    <CommitFilePath>existing-file.ts</CommitFilePath>
  </CommitFile>
  <CommitFile>
    <CommitFileStatus status="deleted" />
    <CommitFilePath>old-file.ts</CommitFilePath>
  </CommitFile>
  <CommitFile>
    <CommitFileStatus status="renamed" />
    <CommitFilePath>renamed-file.ts</CommitFilePath>
  </CommitFile>
</CommitFiles>
```

**Visual:**

> File list showing: green "A" for added, yellow "M" for modified, red "D" for deleted, blue "R" for renamed.

### Example 3: Relative Timestamps

```tsx
<CommitMetadata>
  <CommitTimestamp date={new Date(Date.now() - 86400000)}>
    {/* Shows "yesterday" */}
  </CommitTimestamp>
  <CommitSeparator />
  <CommitTimestamp date={new Date(Date.now() - 7 * 86400000)}>
    {/* Shows "last week" */}
  </CommitTimestamp>
</CommitMetadata>
```

**Visual:**

> Timestamps automatically formatted as relative time (e.g., "yesterday", "2 days ago", "last week").

### Example 4: Copy with Callbacks

```tsx
<CommitActions>
  <CommitCopyButton
    hash="abc123def"
    onCopy={() => toast.success('Hash copied!')}
    onError={(error) => toast.error('Failed to copy')}
  />
</CommitActions>
```

**Visual:**

> Copy button that triggers toast notifications on success/error.

## Status Styles

- **added**: Green text (`text-green-600 dark:text-green-400`)
- **modified**: Yellow text (`text-yellow-600 dark:text-yellow-400`)
- **deleted**: Red text (`text-red-600 dark:text-red-400`)
- **renamed**: Blue text (`text-blue-600 dark:text-blue-400`)

## Status Labels

- **added**: "A"
- **modified**: "M"
- **deleted**: "D"
- **renamed**: "R"

## Notes

- Uses Radix UI Collapsible for accessibility
- Commit header is clickable to expand/collapse
- Actions use stopPropagation to prevent collapsing when clicked
- Relative time uses Intl.RelativeTimeFormat
- Copy button shows checkmark icon for 2 seconds after success
- File changes show + for additions, - for deletions
- Zero-count additions/deletions render as null (hidden)
- Avatar fallback shows initials in small text
- Separator defaults to bullet ("•") character
- All monospace text uses font-mono class
