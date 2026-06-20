# 0001 — Dialog Viewport Size Constraint

**Date**: 2026-06-20
**Status**: Accepted

## Context

The forge `DialogContent` base component used Tailwind classes `w-full max-w-lg sm:rounded-lg`, which allowed the dialog to expand to 100% viewport width on small screens. On mobile devices this produced a full-screen-takeover appearance — the modal filled the entire viewport with no visible gap from the screen edges, eliminating the visual separation between the modal and the dimmed background behind it.

## Decision

The `DialogContent` base class in `dialog.tsx` now enforces `max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-lg` as a library-wide constraint. Consumers may still override the maximum width at larger breakpoints (e.g. `sm:max-w-3xl`) but cannot accidentally exceed 90% of either viewport dimension without explicitly overriding the base class.

## Rationale

- A dialog that spans 100% width or height on mobile is visually indistinguishable from a full-screen route transition, which confuses users about the navigation state.
- The 90% cap is a single source of truth: all current and future consumers inherit it without needing per-component enforcement.
- `overflow-y-auto` is paired with `max-h-[90vh]` so that tall content scrolls within the modal rather than overflowing below the fold.
- The `rounded-lg` class was moved from the `sm:` breakpoint to the base class so that corners are always rounded, reinforcing the modal-not-full-screen affordance even on narrow viewports.

## Consequences

- All existing consumers of `DialogContent` silently gain the constraint; any consumer that previously relied on a dialog wider than 90vw or taller than 90vh will be cropped. A one-time audit of known consumers was performed (devbot's `ChatSessionSummaryModal` was updated to `sm:max-w-3xl`).
- Future consumers must use breakpoint-scoped overrides (e.g. `sm:max-w-xl`) to widen a dialog beyond the mobile default; they cannot exceed 90vw/90vh without overriding the base class directly.
- If a use case genuinely requires a full-viewport modal (e.g. an image lightbox), a separate `FullscreenDialog` variant should be introduced rather than removing this constraint from `DialogContent`.
