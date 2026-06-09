# Component Library (@allsetlabs/reusable)

## Goal

Shared React component library used by all frontend modules in this monorepo — the single source of UI components, styles, and design tokens.

## Description

Built with React, TypeScript, Tailwind CSS, and shadcn/ui patterns. This is a library package — not a standalone application. No build step required; consumers import directly from source. Other modules install it as `"@allsetlabs/reusable": "file:../forge"` (or `file:../../forge` for nested paths) and import via TypeScript path aliases.

## Architecture

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
└── InitializeReusableChunks.tsx  # Required root wrapper — sets up providers and styles
```

Stack: React + TypeScript + Tailwind CSS v3 + shadcn/ui + Radix UI + CVA.

## Progress

Stable and in active use across all modules. New components are added on demand as consuming modules need them.

## Consuming Module Setup

**Install:** add `"@allsetlabs/reusable": "file:../forge"` to `package.json`

**TypeScript paths** — add to `tsconfig.json`:
```json
{ "paths": { "@allsetlabs/reusable/*": ["./node_modules/@allsetlabs/reusable/src/*"] } }
```

**Tailwind config** — extend the library's base config:
```js
import baseConfig from '@allsetlabs/reusable/tailwind.config';
export default { ...baseConfig };
```

**Root wrapper** — wrap app with `InitializeReusableChunks` (imports styles, initializes providers):
```tsx
import { InitializeReusableChunks } from '@allsetlabs/reusable/InitializeReusableChunks';
```

**Import components:**
```tsx
import { Button } from '@allsetlabs/reusable/components/ui/button';
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
