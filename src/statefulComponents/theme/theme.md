# Theme

Complete dark mode theme management system with provider, context hook, and segmented toggle control.

## Import

```tsx
import { useThemeContext } from '@allsetlabs/forge/statefulComponents/theme/context';
import ThemeToggle from '@allsetlabs/forge/statefulComponents/theme/toggle';
```

## Provider Initialization

**ThemeProvider is automatically initialized in `InitializeForgeChunks`.**

You do **not** need to manually wrap your app with `ThemeProvider` - it's already included when you use `InitializeForgeChunks` at your app root.

## Features

- **Light, Dark & System Modes**: Full theme switching with three options
- **System Preference Detection**: Respects user's OS theme preference with `system` mode
- **LocalStorage Persistence**: Saves theme choice across sessions
- **Auto DOM Updates**: Automatically adds/removes 'dark' class on the target element
- **Segmented Toggle Component**: Pre-built 3-button segmented control for theme switching
- **Context Hook**: Access theme state anywhere in your app

## Basic Usage

```tsx
import ThemeToggle from '@allsetlabs/forge/statefulComponents/theme/toggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

**Visual:**

> Segmented control with three icon buttons (Sun / Moon / Monitor) inside a rounded-full bg-muted container. The active selection is highlighted with bg-primary and text-primary-foreground.

## Components

### ThemeProvider

Provider component that manages theme state and exposes context.

**Props:**

| Prop            | Type          | Description                                                            |
| --------------- | ------------- | ---------------------------------------------------------------------- |
| `children`      | `ReactNode`   | **Required**. App content                                              |
| `targetElement` | `HTMLElement` | **Required**. The target element where theme classes should be applied |

### ThemeToggle

Pre-built segmented control with three buttons for selecting light, dark, or system theme.

**Props:** None (uses theme context internally)

**Buttons:**

| Button  | Icon      | Sets Theme |
| ------- | --------- | ---------- |
| Sun     | `Sun`     | `'light'`  |
| Moon    | `Moon`    | `'dark'`   |
| Monitor | `Monitor` | `'system'` |

### useThemeContext

Hook to access theme state and controls.

**Returns:**

```tsx
{
  theme: 'light' | 'dark' | 'system',      // Current theme preference
  resolvedTheme: 'light' | 'dark',          // Actual resolved theme (system resolves to light or dark)
  setTheme: (theme: Theme) => void          // Function to set theme
}
```

## Examples

### Example 1: Using Toggle Button

```tsx
import ThemeToggle from '@allsetlabs/forge/statefulComponents/theme/toggle';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

**Visual:**

> Header with theme segmented control on the right. A pill-shaped bg-muted container holds three rounded-full icon buttons (Sun, Moon, Monitor). The active button is filled with bg-primary.

### Example 2: Using Theme Context

```tsx
import { useThemeContext } from '@allsetlabs/forge/statefulComponents/theme/context';

function ThemeIndicator() {
  const { theme, resolvedTheme } = useThemeContext();

  return (
    <div>
      <p>Preference: {theme}</p>
      <p>Resolved: {resolvedTheme}</p>
    </div>
  );
}
```

**Visual:**

> Component displays both the stored theme preference and the actual resolved theme (useful when preference is 'system').

### Example 3: Programmatic Theme Change

```tsx
import { useThemeContext } from '@allsetlabs/forge/statefulComponents/theme/context';

function Settings() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div>
      <p>Current: {theme}</p>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('system')}>System</Button>
    </div>
  );
}
```

**Visual:**

> Settings panel with current theme display and three buttons to switch themes programmatically.

### Example 4: Theme-Aware Component

```tsx
import { useThemeContext } from '@allsetlabs/forge/statefulComponents/theme/context';

function Logo() {
  const { resolvedTheme } = useThemeContext();

  return <img src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} alt="Logo" />;
}
```

**Visual:**

> Component that renders different logo based on the resolved theme. Uses `resolvedTheme` (not `theme`) so system preference is correctly handled.

### Example 5: Custom Segmented Theme Picker

```tsx
import { useThemeContext, Theme } from '@allsetlabs/forge/statefulComponents/theme/context';

const options: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

function CustomThemePicker() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={theme === option.value ? 'primary' : 'outline'}
          onClick={() => setTheme(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
```

**Visual:**

> Three text buttons (Light / Dark / System). The active selection uses the primary variant; others use outline.

## How It Works

### Initialization

1. On mount, checks `localStorage` for saved theme
2. If no saved theme, defaults to `'system'` and checks OS preference via `matchMedia('(prefers-color-scheme: dark)')`
3. Applies theme by adding/removing `'dark'` class on the target element

### Theme Change

1. User clicks a button in the segmented control
2. `setTheme()` updates state and writes to localStorage
3. Resolves the new effective theme (`'system'` resolves to `'light'` or `'dark'` based on OS)
4. Adds/removes `'dark'` class on the target element
5. All theme-aware CSS updates automatically

### System Theme Listener

When `theme` is `'system'`, the provider listens for `MediaQueryListEvent` changes on `prefers-color-scheme: dark` and reapplies the theme class automatically when the OS preference changes.

### LocalStorage Keys

- Key: `'theme'`
- Values: `'light'`, `'dark'`, or `'system'`

## ThemeToggle Details

**Visual:**

> Pill-shaped container (`rounded-full bg-muted p-0.5`) holding three `h-8 w-8 rounded-full` icon buttons side by side with `gap-0.5`.
>
> - **Light button**: Sun icon (`h-4 w-4`), `aria-label="Light theme"`
> - **Dark button**: Moon icon (`h-4 w-4`), `aria-label="Dark theme"`
> - **System button**: Monitor icon (`h-4 w-4`), `aria-label="System theme"`
>
> Active button: `bg-primary text-primary-foreground shadow-sm`
> Inactive button: `text-muted-foreground hover:bg-accent hover:text-accent-foreground`
> Focus ring: `focus:ring-2 focus:ring-ring`
> Each button has `aria-pressed` set to reflect active state.

## Accessibility

- Each button has a descriptive `aria-label` (`"Light theme"`, `"Dark theme"`, `"System theme"`)
- `aria-pressed` is set on each button to reflect active selection
- Focus ring (`focus:ring-2 focus:ring-ring`) on each button for keyboard navigation
- Respects system preference by default via `'system'` mode
- Theme preference persists across sessions
- Smooth `transition-all` on button state changes

## TypeScript

```tsx
type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  targetElement: HTMLElement | null;
}

// Usage
const { theme, resolvedTheme, setTheme } = useThemeContext();
```

## Notes

- ThemeProvider is **automatically initialized in `InitializeForgeChunks`** - no manual setup required
- `'dark'` class is added to the target element (typically `#forge-app-root`)
- Your Tailwind config should have `darkMode: 'class'`
- Theme persists in localStorage under key `'theme'`
- Default stored theme is `'system'`; resolves to OS preference or `'light'` if no preference
- ThemeToggle renders native `<button>` elements directly (not the shared Button component)
- Icons from `lucide-react` (`Sun`, `Moon`, `Monitor`), size `h-4 w-4`
- SSR-safe: checks for `window` before accessing browser APIs
- Context throws an error if used outside `ThemeProvider`
- Theme updates are immediate (no delay)
- Supports scoped theming: theme class applied to target element, not `document.documentElement`
