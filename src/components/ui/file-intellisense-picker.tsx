import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../../lib/utils';
import { FileText, Folder } from 'lucide-react';

export interface FileIntellisenseItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
}

export interface FileIntellisensePickerProps {
  items: FileIntellisenseItem[];
  filter?: string;
  open: boolean;
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onSelect: (item: FileIntellisenseItem) => void;
  onClose?: () => void;
  onLoadMore?: () => void;
  className?: string;
}

export interface FileIntellisensePickerHandle {
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
}

const ITEM_HEIGHT = 32;

export const FileIntellisensePicker = React.forwardRef<
  FileIntellisensePickerHandle,
  FileIntellisensePickerProps
>(function FileIntellisensePicker(
  {
    items,
    filter = '',
    open,
    loading = false,
    loadingMore = false,
    hasMore = false,
    onSelect,
    onClose,
    onLoadMore,
    className,
  },
  ref
) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  React.useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      virtualizer.scrollToIndex(selectedIndex, { align: 'auto' });
    }
  }, [selectedIndex, virtualizer, items.length]);

  // Detect scroll near bottom to trigger load more
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || !onLoadMore || !hasMore || loadingMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight - scrollTop - clientHeight < ITEM_HEIGHT * 3) {
        onLoadMore();
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, hasMore, loadingMore]);

  React.useImperativeHandle(
    ref,
    () => ({
      handleKeyDown: (e: React.KeyboardEvent) => {
        if (!open || items.length === 0) return false;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + items.length) % items.length);
          return true;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          onSelect(items[selectedIndex]);
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
    [open, items, selectedIndex, onSelect, onClose]
  );

  if (!open || (items.length === 0 && !loading)) return null;

  return (
    <div
      className={cn(
        'border-border bg-popover absolute bottom-full left-0 z-50 mb-1 w-full overflow-hidden rounded-md border shadow-md',
        className
      )}
    >
      <div ref={scrollRef} className="max-h-[240px] overflow-y-auto p-1">
        {loading ? (
          <div className="flex items-center justify-center px-2 py-4">
            <span className="text-muted-foreground text-xs">Loading files...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center px-2 py-4">
            <span className="text-muted-foreground text-xs">No files found</span>
          </div>
        ) : (
          <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const item = items[virtualItem.index];
              const isSelected = virtualItem.index === selectedIndex;
              const isFile = item.type === 'file';
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
                    height: ITEM_HEIGHT,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect(item);
                  }}
                >
                  {isFile ? (
                    <FileText className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Folder className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="min-w-0 truncate font-medium">@{item.path}</span>
                </button>
              );
            })}
          </div>
        )}
        {loadingMore && (
          <div className="flex items-center justify-center px-2 py-2">
            <span className="text-muted-foreground text-xs">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
});
