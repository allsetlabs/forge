import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext, Theme } from './context';
import { cn } from '../../lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light theme' },
    { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark theme' },
    { value: 'system', icon: <Monitor className="h-4 w-4" />, label: 'System theme' },
  ];

  return (
    <div className="bg-muted flex gap-0.5 rounded-full p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-all',
            'focus:ring-ring focus:outline-none focus:ring-2',
            theme === option.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          aria-label={option.label}
          aria-pressed={theme === option.value}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
