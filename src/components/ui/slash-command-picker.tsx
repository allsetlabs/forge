import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../../lib/utils';

export interface SlashCommandItem {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface SlashCommandGroup {
  heading: string;
  items: SlashCommandItem[];
}

export interface SlashCommandPickerProps {
  groups: SlashCommandGroup[];
  filter?: string;
  open: boolean;
  onSelect: (item: SlashCommandItem) => void;
  onClose?: () => void;
  className?: string;
}

export interface SlashCommandPickerHandle {
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
}

interface FlatRow {
  kind: 'heading' | 'item';
  heading?: string;
  item?: SlashCommandItem;
  flatItemIndex?: number;
}

const ROW_HEIGHT = 32;
const HEADING_HEIGHT = 28;

export const SlashCommandPicker = React.forwardRef<
  SlashCommandPickerHandle,
  SlashCommandPickerProps
>(function SlashCommandPicker({ groups, filter = '', open, onSelect, onClose, className }, ref) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const filteredGroups = React.useMemo(() => {
    const lf = filter.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => item.name.toLowerCase().includes(lf)),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, filter]);

  const { flatRows, flatItems } = React.useMemo(() => {
    const rows: FlatRow[] = [];
    const items: SlashCommandItem[] = [];
    for (const group of filteredGroups) {
      rows.push({ kind: 'heading', heading: group.heading });
      for (const item of group.items) {
        rows.push({ kind: 'item', item, flatItemIndex: items.length });
        items.push(item);
      }
    }
    return { flatRows: rows, flatItems: items };
  }, [filteredGroups]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (idx) => (flatRows[idx]?.kind === 'heading' ? HEADING_HEIGHT : ROW_HEIGHT),
    overscan: 5,
  });

  // Scroll to selected item row
  React.useEffect(() => {
    const rowIdx = flatRows.findIndex(
      (r) => r.kind === 'item' && r.flatItemIndex === selectedIndex
    );
    if (rowIdx >= 0) {
      virtualizer.scrollToIndex(rowIdx, { align: 'auto' });
    }
  }, [selectedIndex, virtualizer, flatRows]);

  React.useImperativeHandle(
    ref,
    () => ({
      handleKeyDown: (e: React.KeyboardEvent) => {
        if (!open || flatItems.length === 0) return false;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % flatItems.length);
          return true;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
          return true;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          onSelect(flatItems[selectedIndex]);
          return true;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose?.();
          return true;
        }
        return false;
      },
    }),
    [open, flatItems, selectedIndex, onSelect, onClose]
  );

  if (!open || flatItems.length === 0) return null;

  return (
    <div
      className={cn(
        'border-border bg-popover absolute bottom-full left-0 z-50 mb-1 w-full overflow-hidden rounded-md border shadow-md',
        className
      )}
    >
      <div ref={scrollRef} className="max-h-[240px] overflow-y-auto p-1">
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const row = flatRows[virtualItem.index];
            if (row.kind === 'heading') {
              return (
                <div
                  key={`h-${row.heading}`}
                  className="text-muted-foreground absolute left-0 flex w-full items-center px-2 text-xs font-medium"
                  style={{
                    height: HEADING_HEIGHT,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {row.heading}
                </div>
              );
            }
            const item = row.item!;
            const isSelected = row.flatItemIndex === selectedIndex;
            return (
              <button
                key={item.id}
                data-selected={isSelected}
                className={cn(
                  'absolute left-0 flex w-full cursor-default items-center gap-2 overflow-hidden rounded-sm px-2 text-sm outline-none',
                  isSelected
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-accent/50'
                )}
                style={{
                  height: ROW_HEIGHT,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onMouseEnter={() => setSelectedIndex(row.flatItemIndex!)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(item);
                }}
              >
                <span className="flex-shrink-0 font-medium">/{item.name}</span>
                <span className="text-muted-foreground min-w-0 truncate text-xs">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
