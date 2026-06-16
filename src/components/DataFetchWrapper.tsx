import { ReactNode } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

interface DataFetchWrapperProps {
  /** Loading state - shows loading spinner when true */
  isLoading: boolean;
  /** Error state - shows error message if truthy (can be string, Error, or boolean) */
  error?: string | Error | null;
  /** Empty state - shows empty message when true and not loading/error */
  isEmpty?: boolean;
  /** Children to render when data is successfully loaded */
  children: ReactNode;
  /** Optional className for the wrapper div */
  className?: string;
  /** Optional custom loading message */
  loadingMessage?: string;
  /** Optional custom empty message */
  emptyMessage?: string;
  /** Optional custom empty title */
  emptyTitle?: string;
  /** Optional icon to render in empty state (ReactNode) */
  emptyIcon?: ReactNode;
}

/**
 * DataFetchWrapper - Handles common data fetching states
 *
 * Renders different UI based on loading, error, and empty states.
 * Only renders children when data is successfully loaded.
 *
 * @example
 * ```tsx
 * <DataFetchWrapper isLoading={isLoading} error={error} isEmpty={!data?.length}>
 *   <YourComponent data={data} />
 * </DataFetchWrapper>
 * ```
 */
export function DataFetchWrapper({
  isLoading,
  error,
  isEmpty = false,
  children,
  className = '',
  loadingMessage = 'Loading...',
  emptyMessage = 'No data available',
  emptyTitle = 'No Data',
  emptyIcon,
}: DataFetchWrapperProps) {
  const wrapperClasses = `w-full ${className}`;

  // Loading state
  if (isLoading) {
    return (
      <div className={wrapperClasses}>
        <div className="flex h-full flex-col items-center justify-center py-12">
          <Loader2 className="text-primary mb-4 h-12 w-12 animate-spin" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'An error occurred';

    return (
      <div className={wrapperClasses}>
        <div className="border-destructive bg-destructive/10 rounded-lg border p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-destructive h-6 w-6 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="text-destructive-foreground text-sm font-semibold">Error</h3>
              <p className="text-destructive-foreground mt-1 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className={wrapperClasses}>
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
          <h3 className="text-foreground mb-2 text-lg font-semibold">{emptyTitle}</h3>
          <p className="text-muted-foreground text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Success state - render children
  return children;
}
