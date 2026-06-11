# Component Library (@allsetlabs/forge)

## Purpose

Shared React component library used by all frontend modules in this monorepo — the single source of UI components, styles, and design tokens.

## Mental Model

Built with React, TypeScript, Tailwind CSS, and shadcn/ui patterns. This is a library package — not a standalone application. No build step required; consumers import directly from source. Other modules install it as `"@allsetlabs/forge": "file:../forge"` (or `file:../../forge` for nested paths) and import via TypeScript path aliases.

## Where Things Go

```
src/
├── components/
│   ├── ui/                  # shadcn/ui primitives (Button, Dialog, Card, etc.)
│   ├── ai-elements/         # @ai-elements registry components (chat, code, terminal)
│   └── auth-login/          # Authentication/login components
├── statefulComponents/      # Components with internal state (auth, theme, audio, cursor)
├── hooks/                   # Custom React hooks
├── icons/                   # Custom icon components
├── lib/                     # Utilities (cn(), resume generator, etc.)
├── styles/                  # Global styles, CSS variables, theme system
├── types/                   # TypeScript type definitions
└── InitializeForgeChunks.tsx  # Required root wrapper — sets up providers and styles
```

Stack: React + TypeScript + Tailwind CSS v3 + shadcn/ui + Radix UI + CVA.

## Development Commands

- `make setup` — check system dependencies
- `make install` — install package dependencies
- `make start` — start Storybook on port 6006
- `npm run type-check` — verify TypeScript
- `npm run build-storybook` — verify Storybook build when component docs/stories change

## Current Capabilities

Stable and in active use across all modules. New components are added on demand as consuming modules need them.

## Testing Expectations

Run `npm run type-check` after code changes. For visual component changes, start Storybook with `make start`, inspect the affected component states, and check the browser console.

## Consuming Module Setup

**Install:** add `"@allsetlabs/forge": "file:../forge"` to `package.json`

**TypeScript paths** — add to `tsconfig.json`:
```json
{ "paths": { "@allsetlabs/forge/*": ["./node_modules/@allsetlabs/forge/src/*"] } }
```

**Tailwind config** — extend the library's base config:
```js
import baseConfig from '@allsetlabs/forge/tailwind.config';
export default { ...baseConfig };
```

**Root wrapper** — wrap app with `InitializeForgeChunks` (imports styles, initializes providers):
```tsx
import { InitializeForgeChunks } from '@allsetlabs/forge/InitializeForgeChunks';
```

**Import components:**
```tsx
import { Button } from '@allsetlabs/forge/components/ui/button';
```

## Adding New Components

1. Create `.tsx` in the appropriate directory
2. Create a co-located `.md` doc with usage examples
3. Add to `how_to_use_this_library.md` index
4. Follow shadcn/ui patterns: CVA for variants, Radix UI for headless behavior, `cn()` for class merging

**Install from registries:**
```bash
npx shadcn@latest add button                             # shadcn default
npx shadcn@latest add @ai-elements/message               # ai-elements
npx shadcn@latest add https://reactbits.dev/r/[name]    # ReactBits
npx shadcn@latest add https://ui.8starlabs.com/r/{name}.json  # 8StarLabs
```

After installing: convert to TypeScript, adapt imports to library path structure, ensure Tailwind compatibility, add docs.

## Styles and Theming

All colors and CSS variables are in `src/styles/`. See `src/styles/styles.md` for the full reference. Do not use default Tailwind colors — use only the CSS variables defined there.
