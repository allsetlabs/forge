# Heatmap

Interactive activity heatmap component displaying time-series data with customizable colors, tooltips, and display modes.

## Import

```tsx
import Heatmap, {
  type HeatmapData,
  type HeatmapValue,
} from '@allsetlabs/forge/components/ui/heatmap';
```

## Features

- **Color Modes**: Discrete color scales or interpolated gradients
- **Display Styles**: Square cells or proportional bubbles
- **Interactive Tooltips**: Hover for date and value details
- **Flexible Dates**: Display any date range with automatic week alignment
- **Customizable Labels**: Month labels and days of week indicators
- **Custom Functions**: Override date and value display formats
- **Interpolation Options**: Linear, square root, or logarithmic scaling
- **Accessible**: Keyboard navigation and ARIA labels

## Basic Usage

```tsx
const data: HeatmapData = [
  { date: '2024-01-01', value: 5 },
  { date: '2024-01-02', value: 3 },
  { date: '2024-01-03', value: 8 },
];

<Heatmap
  data={data}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  colorMode="discrete"
/>;
```

**Visual:**

> A GitHub-style activity heatmap showing the full year, with green color intensity indicating activity levels, Monday/Wednesday/Friday labels on left

## Props

### Common Props

| Prop                   | Type                                          | Default     | Description                        |
| ---------------------- | --------------------------------------------- | ----------- | ---------------------------------- |
| `data`                 | `HeatmapData`                                 | Required    | Array of date-value pairs          |
| `startDate`            | `Date`                                        | Required    | First date to display              |
| `endDate`              | `Date`                                        | Required    | Last date to display               |
| `cellSize`             | `number`                                      | `20`        | Size of each cell in pixels        |
| `gap`                  | `number`                                      | `4`         | Gap between cells in pixels        |
| `daysOfTheWeek`        | `"all" \| "MWF" \| "none" \| "single letter"` | `"MWF"`     | Days of week label display         |
| `displayStyle`         | `"squares" \| "bubbles"`                      | `"squares"` | Cell rendering style               |
| `dateDisplayFunction`  | `(date: Date) => ReactNode`                   | -           | Custom date formatting in tooltip  |
| `valueDisplayFunction` | `(value: number) => ReactNode`                | -           | Custom value formatting in tooltip |
| `className`            | `string`                                      | -           | Additional CSS classes             |

### Discrete Color Mode Props

| Prop             | Type                                                         | Default           | Description                         |
| ---------------- | ------------------------------------------------------------ | ----------------- | ----------------------------------- |
| `colorMode`      | `"discrete"`                                                 | Required          | Use discrete color scale            |
| `colorScale`     | `string[]`                                                   | 5 shades of green | Array of hex colors for scale       |
| `customColorMap` | `(value: number, max: number, colorCount: number) => number` | Linear mapping    | Custom value-to-color index mapping |

### Interpolate Color Mode Props

| Prop            | Type                          | Default     | Description                      |
| --------------- | ----------------------------- | ----------- | -------------------------------- |
| `colorMode`     | `"interpolate"`               | Required    | Use color interpolation          |
| `minColor`      | `string`                      | `"#aceebb"` | Hex color for zero/minimum value |
| `maxColor`      | `string`                      | `"#116329"` | Hex color for maximum value      |
| `interpolation` | `"linear" \| "sqrt" \| "log"` | `"linear"`  | Interpolation algorithm          |

## Examples

### Example 1: GitHub-Style Contribution Graph

```tsx
const contributionData: HeatmapData = [
  { date: '2024-01-01', value: 2 },
  { date: '2024-01-02', value: 5 },
  { date: '2024-01-03', value: 0 },
  // ... more data
];

<Heatmap
  data={contributionData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  colorMode="discrete"
  daysOfTheWeek="MWF"
  cellSize={12}
  gap={3}
/>;
```

**Visual:**

> Year-long contribution graph with green color intensity, MWF day labels, compact cells, similar to GitHub's activity view

### Example 2: Bubble Heatmap with Custom Colors

```tsx
const activityData: HeatmapData = [
  { date: '2024-06-01', value: 10 },
  { date: '2024-06-02', value: 25 },
  { date: '2024-06-03', value: 5 },
];

<Heatmap
  data={activityData}
  startDate={new Date('2024-06-01')}
  endDate={new Date('2024-06-30')}
  colorMode="discrete"
  colorScale={['#eff6ff', '#bfdbfe', '#60a5fa', '#2563eb', '#1e40af']}
  displayStyle="bubbles"
  cellSize={24}
/>;
```

**Visual:**

> Month view with blue-themed bubbles, larger bubbles for higher values, creating a visually proportional representation

### Example 3: Interpolated Gradient Heatmap

```tsx
const temperatureData: HeatmapData = [
  { date: '2024-01-01', value: 32 },
  { date: '2024-01-02', value: 45 },
  { date: '2024-01-03', value: 78 },
];

<Heatmap
  data={temperatureData}
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-01-31')}
  colorMode="interpolate"
  minColor="#dbeafe"
  maxColor="#dc2626"
  interpolation="linear"
  daysOfTheWeek="all"
/>;
```

**Visual:**

> Temperature heatmap transitioning from blue (cold) to red (hot) with smooth color gradients, all days labeled

### Example 4: Logarithmic Scale for Exponential Data

```tsx
const exponentialData: HeatmapData = [
  { date: '2024-03-01', value: 1 },
  { date: '2024-03-02', value: 10 },
  { date: '2024-03-03', value: 100 },
  { date: '2024-03-04', value: 1000 },
];

<Heatmap
  data={exponentialData}
  startDate={new Date('2024-03-01')}
  endDate={new Date('2024-03-31')}
  colorMode="interpolate"
  interpolation="log"
  minColor="#f0fdf4"
  maxColor="#166534"
/>;
```

**Visual:**

> Logarithmic color scaling prevents extreme values from dominating, shows relative differences better for exponential growth data

### Example 5: Custom Tooltip Formatting

```tsx
const salesData: HeatmapData = [
  { date: '2024-05-01', value: 1250 },
  { date: '2024-05-02', value: 890 },
];

<Heatmap
  data={salesData}
  startDate={new Date('2024-05-01')}
  endDate={new Date('2024-05-31')}
  colorMode="discrete"
  dateDisplayFunction={(date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
  valueDisplayFunction={(value) => `$${value.toLocaleString()}`}
  cellSize={20}
  daysOfTheWeek="single letter"
/>;
```

**Visual:**

> Sales heatmap with custom tooltips showing "Wed, May 1" and "$1,250", single-letter day labels (S, M, T, W, T, F, S)

## Display Styles

### Squares

```tsx
<Heatmap
  data={data}
  startDate={startDate}
  endDate={endDate}
  colorMode="discrete"
  displayStyle="squares"
/>
```

**Visual:**

> Uniform square cells, all same size, color intensity indicates value

### Bubbles

```tsx
<Heatmap
  data={data}
  startDate={startDate}
  endDate={endDate}
  colorMode="discrete"
  displayStyle="bubbles"
/>
```

**Visual:**

> Circular cells with size proportional to value (30% to 100% of cellSize), creates visual weight based on magnitude

## Days of Week Options

### All

```tsx
<Heatmap daysOfTheWeek="all" /* ... */ />
```

**Visual:**

> Full day names: Sun, Mon, Tue, Wed, Thu, Fri, Sat

### MWF (Default)

```tsx
<Heatmap daysOfTheWeek="MWF" /* ... */ />
```

**Visual:**

> Only Mon, Wed, Fri labeled, others blank for cleaner look

### Single Letter

```tsx
<Heatmap daysOfTheWeek="single letter" /* ... */ />
```

**Visual:**

> Single letters: S, M, T, W, T, F, S (most compact)

### None

```tsx
<Heatmap daysOfTheWeek="none" /* ... */ />
```

**Visual:**

> No day labels, maximum space for cells

## Accessibility

- Uses `role="grid"` for semantic structure
- Each cell has `aria-label` with date and value
- Keyboard navigation support (Tab to focus cells)
- Tooltips accessible via keyboard focus
- Month labels use muted foreground for hierarchy
- High contrast mode compatible

## TypeScript

```tsx
type HeatmapValue = {
  date: string; // YYYY-MM-DD format
  value: number;
};

type HeatmapData = HeatmapValue[];

type InterpolationModes = 'linear' | 'sqrt' | 'log';

// Discrete mode
type DiscreteProps = {
  colorMode: 'discrete';
  colorScale?: string[];
  customColorMap?: (value: number, max: number, colorCount: number) => number;
};

// Interpolate mode
type InterpolateProps = {
  colorMode: 'interpolate';
  maxColor?: string;
  minColor?: string;
  interpolation?: InterpolationModes;
};
```

## Notes

- Dates must be in `YYYY-MM-DD` format in data array
- Automatically pads to Sunday start for week alignment
- Month labels appear at top, only when month changes
- Default discrete colors: 5 shades of green (#f0fdf4 to #166534)
- Zero values always use minimum color regardless of scale
- Bubble size range: 30% to 100% of `cellSize`
- Custom color maps receive normalized value (0 to max) and should return color index
- Interpolation modes:
  - `linear`: Direct proportional mapping
  - `sqrt`: Square root (emphasizes mid-range values)
  - `log`: Logarithmic (handles exponential data)
- Grid uses CSS Grid with dynamic columns based on week count
- Tooltips provided by Tooltip component (requires TooltipProvider)
- Missing dates in data array default to value: 0
- End date is inclusive (displayed on heatmap)
- Works with any date range (days, months, years)
