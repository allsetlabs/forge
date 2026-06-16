# Task

Collapsible task display with nested items for showing search/analysis progress.

## Import

```tsx
import {
  Task,
  TaskTrigger,
  TaskContent,
  TaskItem,
  TaskItemFile,
} from '@allsetlabs/forge/components/ai-elements/task';
```

## Features

- **Collapsible**: Expand/collapse task details
- **Nested Items**: Display sub-tasks or file references
- **Visual Hierarchy**: Border-left indicator for nested content
- **Icon Support**: Built-in search icon for task trigger

## Basic Usage

```tsx
<Task>
  <TaskTrigger title="Searching codebase..." />
  <TaskContent>
    <TaskItem>Found 12 relevant files</TaskItem>
    <TaskItem>
      Analyzing <TaskItemFile>src/components/Button.tsx</TaskItemFile>
    </TaskItem>
    <TaskItem>
      Analyzing <TaskItemFile>src/utils/helpers.ts</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

**Visual:**

> Collapsible section with "Searching codebase..." and search icon. When expanded, shows nested list with border-left indicator and file badges.

## Props

### Task

| Prop        | Type    | Default | Description            |
| ----------- | ------- | ------- | ---------------------- |
| defaultOpen | boolean | true    | Initial open state     |
| className   | string  | -       | Additional CSS classes |

### TaskTrigger

| Prop      | Type      | Default | Description                |
| --------- | --------- | ------- | -------------------------- |
| title     | string    | -       | Task title text (required) |
| className | string    | -       | Additional CSS classes     |
| children  | ReactNode | -       | Custom trigger content     |

### TaskContent

| Prop      | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| className | string | -       | Additional CSS classes |

### TaskItem

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| className | string    | -       | Additional CSS classes |
| children  | ReactNode | -       | Item content           |

### TaskItemFile

| Prop      | Type      | Default | Description            |
| --------- | --------- | ------- | ---------------------- |
| className | string    | -       | Additional CSS classes |
| children  | ReactNode | -       | File name/path         |

## Examples

### Example 1: Multi-step Task

```tsx
<Task>
  <TaskTrigger title="Generating documentation..." />
  <TaskContent>
    <TaskItem>Reading source files</TaskItem>
    <TaskItem>Extracting function signatures</TaskItem>
    <TaskItem>Generating markdown</TaskItem>
    <TaskItem>
      Writing to <TaskItemFile>docs/api.md</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

**Visual:**

> Task showing sequential steps with final output file.

### Example 2: File Analysis

```tsx
<Task defaultOpen={false}>
  <TaskTrigger title="Analyzing dependencies" />
  <TaskContent>
    <TaskItem>
      Found unused dependency: <TaskItemFile>lodash</TaskItemFile>
    </TaskItem>
    <TaskItem>
      Outdated package: <TaskItemFile>react@17.0.2</TaskItemFile>
    </TaskItem>
    <TaskItem>
      Missing peer dependency: <TaskItemFile>typescript</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

**Visual:**

> Closed by default task showing dependency analysis results with file badges.

### Example 3: Custom Trigger

```tsx
<Task>
  <TaskTrigger title="Custom Task">
    <div className="flex items-center gap-2">
      <LoaderIcon className="size-4 animate-spin" />
      <p className="text-sm">Processing files...</p>
      <span className="text-muted-foreground text-xs">(3/10)</span>
      <ChevronDownIcon className="size-4" />
    </div>
  </TaskTrigger>
  <TaskContent>
    <TaskItem>
      Processing <TaskItemFile>file1.ts</TaskItemFile>
    </TaskItem>
    <TaskItem>
      Processing <TaskItemFile>file2.ts</TaskItemFile>
    </TaskItem>
    <TaskItem>
      Processing <TaskItemFile>file3.ts</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

**Visual:**

> Custom trigger with spinner, progress counter, and custom styling.

### Example 4: Nested Tasks

```tsx
<Task>
  <TaskTrigger title="Building project" />
  <TaskContent>
    <TaskItem>Compiling TypeScript</TaskItem>
    <TaskItem>
      Bundling with Vite
      <div className="ml-4 mt-2 space-y-2">
        <TaskItem>Optimizing imports</TaskItem>
        <TaskItem>Tree shaking</TaskItem>
        <TaskItem>Generating sourcemaps</TaskItem>
      </div>
    </TaskItem>
    <TaskItem>Build complete</TaskItem>
  </TaskContent>
</Task>
```

**Visual:**

> Task with nested sub-tasks showing build pipeline stages.

## Notes

- Default state is open (`defaultOpen={true}`)
- Uses Radix UI Collapsible for accessibility
- TaskContent has border-left indicator for visual hierarchy
- TaskItemFile renders as inline badge with secondary background
- Smooth expand/collapse animations
- Search icon included by default in trigger
- Chevron icon rotates on expand/collapse
- Text is muted-foreground for subtle appearance
