import type { Preview, Renderer } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { themes } from 'storybook/theming';

import '../src/styles/index.css';

const DARK_BG = 'oklch(0.1689 0.0226 264.2966)';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    a11y: {
      test: 'todo',
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals?.theme === 'dark';
      const isStory = context.viewMode === 'story';

      return (
        <div
          id="forge-app-root"
          style={{
            ...(isStory && { minHeight: '100vh', minWidth: '100vw' }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isStory ? undefined : '2rem',
            backgroundColor: isDark ? DARK_BG : '#fff',
          }}
        >
          <Story />
        </div>
      );
    },
    withThemeByClassName<Renderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: '#forge-app-root',
    }),
  ],
};

export default preview;
