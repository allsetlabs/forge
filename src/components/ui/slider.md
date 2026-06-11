# Slider

An input control that allows users to select a value from a range by dragging a thumb along a track.

## Import

```tsx
import { Slider } from '@allsetlabs/forge/components/ui/slider';
```

## Features

- **Range Selection**: Select values from min to max range
- **Multiple Thumbs**: Support for multiple values
- **Keyboard Control**: Arrow keys for precise adjustment
- **Touch Support**: Works on mobile with touch gestures
- **Accessible**: Built on Radix UI with proper ARIA attributes
- **Visual Feedback**: Filled track shows selected range

## Basic Usage

```tsx
<Slider defaultValue={[50]} max={100} step={1} />
```

## Props

### Slider

Based on `@radix-ui/react-slider` component:

| Prop          | Type                         | Default        | Description                     |
| ------------- | ---------------------------- | -------------- | ------------------------------- |
| value         | number[]                     | -              | Controlled value(s)             |
| onValueChange | function                     | -              | Callback when value changes     |
| defaultValue  | number[]                     | `[0]`          | Initial value(s) (uncontrolled) |
| min           | number                       | 0              | Minimum value                   |
| max           | number                       | 100            | Maximum value                   |
| step          | number                       | 1              | Step increment                  |
| disabled      | boolean                      | false          | Disable the slider              |
| orientation   | `"horizontal" \| "vertical"` | `"horizontal"` | Slider orientation              |
| className     | string                       | -              | Additional CSS classes          |

> Value is always an array, even for single-thumb sliders.

## Examples

### Basic Slider

```tsx
const [value, setValue] = useState([50]);

<div className="space-y-2">
  <label>Volume: {value[0]}%</label>
  <Slider value={value} onValueChange={setValue} max={100} step={1} />
</div>;
```

### Range Slider (Two Thumbs)

```tsx
const [range, setRange] = useState([20, 80]);

<div className="space-y-2">
  <label>
    Price Range: ${range[0]} - ${range[1]}
  </label>
  <Slider value={range} onValueChange={setRange} max={100} step={1} />
</div>;
```

### Slider with Custom Step

```tsx
<Slider defaultValue={[5]} min={0} max={10} step={0.5} />
```

### Disabled Slider

```tsx
<Slider defaultValue={[50]} disabled />
```

### Slider with Marks

```tsx
const [value, setValue] = useState([50]);

<div className="space-y-4">
  <Slider value={value} onValueChange={setValue} max={100} step={25} />
  <div className="text-muted-foreground flex justify-between text-xs">
    <span>0</span>
    <span>25</span>
    <span>50</span>
    <span>75</span>
    <span>100</span>
  </div>
</div>;
```

### Temperature Control

```tsx
const [temp, setTemp] = useState([68]);

<div className="space-y-2">
  <div className="flex justify-between">
    <label>Temperature</label>
    <span className="text-sm">{temp[0]}°F</span>
  </div>
  <Slider value={temp} onValueChange={setTemp} min={60} max={80} step={1} />
</div>;
```

### Volume Control

```tsx
const [volume, setVolume] = useState([75]);

<div className="flex items-center gap-4">
  <VolumeIcon className="h-4 w-4" />
  <Slider value={volume} onValueChange={setVolume} max={100} step={5} className="flex-1" />
  <span className="w-12 text-sm">{volume[0]}%</span>
</div>;
```

### Zoom Control

```tsx
const [zoom, setZoom] = useState([100]);

<div className="space-y-2">
  <label>Zoom: {zoom[0]}%</label>
  <Slider value={zoom} onValueChange={setZoom} min={50} max={200} step={10} />
</div>;
```

## Accessibility

- Implements WAI-ARIA slider pattern
- Arrow keys adjust value (Left/Down decrease, Right/Up increase)
- Home/End keys jump to min/max values
- Page Up/Down for larger increments
- Focus visible indicator on keyboard focus
- Screen readers announce current value
- Touch-friendly thumb size for mobile

## Notes

- Track height is `h-1.5` (0.375rem / 6px)
- Thumb size is `h-4 w-4` (1rem / 16px)
- Track background is `bg-primary/20` (20% opacity)
- Filled range is `bg-primary`
- Thumb has border (`border-primary/50`) and background color
- Focus ring appears on keyboard focus
- Disabled state reduces opacity and prevents interaction
- Default width is `w-full` (100%)
- Orientation is horizontal by default
- For multiple thumbs, pass array with multiple values (e.g., `[20, 80]`)
- Thumb has shadow for depth
- Smooth transitions on value change
