# Progress

A visual indicator showing the completion progress of a task.

## Import

```tsx
import { Progress } from '@allsetlabs/forge/components/ui/progress';
```

## Features

- **Percentage Display**: Shows progress from 0-100%
- **Smooth Transitions**: Animated fill when value changes
- **Accessible**: Built on Radix UI with proper ARIA attributes
- **Customizable**: Easy to style with custom colors and sizes
- **Determinate State**: Shows known progress (not indeterminate spinner)

## Basic Usage

```tsx
<Progress value={50} />
```

## Props

### Progress

| Prop      | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| value     | number | -       | Current progress value (0-100) |
| max       | number | 100     | Maximum value (typically 100)  |
| className | string | -       | Additional CSS classes         |

> Built on `@radix-ui/react-progress` component.

## Examples

### Basic Progress Bar

```tsx
<Progress value={33} />
```

### Progress with Label

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} />
</div>
```

### Custom Color Progress

```tsx
<Progress value={75} className="[&>div]:bg-green-500" />
```

### Large Progress Bar

```tsx
<Progress value={60} className="h-4" />
```

### Loading States

```tsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(timer);
        return 100;
      }
      return prev + 10;
    });
  }, 500);
  return () => clearInterval(timer);
}, []);

<div className="space-y-2">
  <Progress value={progress} />
  <p className="text-center text-sm">{progress < 100 ? 'Loading...' : 'Complete!'}</p>
</div>;
```

### Multi-Step Progress

```tsx
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 4;
const progress = (currentStep / totalSteps) * 100;

<div className="space-y-4">
  <div className="flex justify-between text-sm">
    <span>
      Step {currentStep} of {totalSteps}
    </span>
    <span>{Math.round(progress)}%</span>
  </div>
  <Progress value={progress} />
</div>;
```

### File Upload Progress

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <FileIcon />
      <span className="text-sm">document.pdf</span>
    </div>
    <span className="text-muted-foreground text-sm">{uploadProgress}%</span>
  </div>
  <Progress value={uploadProgress} />
</div>
```

### Thin Progress Bar

```tsx
<Progress value={80} className="h-1" />
```

## Accessibility

- Uses ARIA `progressbar` role
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` attributes set
- Screen readers announce current progress value
- Visual indicator for users who cannot perceive progress numerically

## Notes

- Default height is `h-2` (0.5rem / 8px)
- Default width is `w-full` (100%)
- Background is `bg-primary/20` (20% opacity primary color)
- Fill bar is `bg-primary` with smooth transition
- Fill bar uses CSS transform for performance (`translateX`)
- Value should be between 0 and 100 (or 0 and `max` if specified)
- Rounded corners with `rounded-full`
- Progress fills from left to right
- Use `[&>div]:bg-{color}` to customize indicator color
- For indeterminate progress (unknown duration), consider using a Spinner component instead
