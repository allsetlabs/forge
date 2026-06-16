'use client';
/* eslint-disable react-refresh/only-export-components */

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface VideoRangeSliderProps {
  /** Total duration of the video in seconds */
  duration: number;
  /** Start time in seconds */
  startTime: number;
  /** End time in seconds */
  endTime: number;
  /** Thumbnail time in seconds */
  thumbnailTime: number;
  /** Minimum duration between start and end (default: 2 seconds) */
  minDuration?: number;
  /** Callback when start time changes */
  onStartChange: (time: number) => void;
  /** Callback when end time changes */
  onEndChange: (time: number) => void;
  /** Callback when thumbnail time changes */
  onThumbnailChange: (time: number) => void;
  /** Callback when user drags to seek video preview */
  onSeek?: (time: number) => void;
  /** Additional className for the container */
  className?: string;
  /** Whether the slider is disabled */
  disabled?: boolean;
}

/**
 * Formats seconds to display format with 2 decimal places
 * e.g., 215.5 seconds -> "215.50"
 */

export function formatTimeToMSS(seconds: number): string {
  return seconds.toFixed(2);
}

/**
 * Parses seconds string back to number
 * e.g., "215.50" -> 215.5 seconds
 */

export function parseMSSToSeconds(value: string): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

const VideoRangeSlider = React.forwardRef<HTMLDivElement, VideoRangeSliderProps>(
  (
    {
      duration,
      startTime,
      endTime,
      thumbnailTime,
      minDuration = 2,
      onStartChange,
      onEndChange,
      onThumbnailChange,
      onSeek,
      className,
      disabled = false,
    },
    ref
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = React.useState<'start' | 'end' | 'thumbnail' | null>(null);

    const getPositionFromTime = (time: number) => {
      if (duration <= 0) return 0;
      return (time / duration) * 100;
    };

    const getTimeFromPosition = (clientX: number) => {
      if (!trackRef.current || duration <= 0) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const position = (clientX - rect.left) / rect.width;
      const clampedPosition = Math.max(0, Math.min(1, position));
      return Math.round(clampedPosition * duration * 100) / 100; // Round to 2 decimal places
    };

    const handleMouseDown = (handle: 'start' | 'end' | 'thumbnail') => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(handle);
    };

    /* eslint-disable react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps */
    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!dragging || disabled) return;

        const time = getTimeFromPosition(e.clientX);

        if (dragging === 'start') {
          // Clamp start to valid range [0, duration - minDuration]
          const newStart = Math.max(0, Math.min(time, duration - minDuration));
          onStartChange(newStart);
          onSeek?.(newStart);
          // Push end forward if start would exceed the limit
          if (newStart + minDuration > endTime) {
            const newEnd = Math.min(newStart + minDuration, duration);
            onEndChange(newEnd);
            // Also adjust thumbnail if needed
            if (thumbnailTime > newEnd) {
              onThumbnailChange(newEnd);
            }
          }
          // Adjust thumbnail if it's now before start
          if (thumbnailTime < newStart) {
            onThumbnailChange(newStart);
          }
        } else if (dragging === 'end') {
          // Clamp end to valid range [minDuration, duration]
          const newEnd = Math.max(minDuration, Math.min(time, duration));
          onEndChange(newEnd);
          onSeek?.(newEnd);
          // Push start backward if end would go below the limit
          if (newEnd - minDuration < startTime) {
            const newStart = Math.max(0, newEnd - minDuration);
            onStartChange(newStart);
            // Also adjust thumbnail if needed
            if (thumbnailTime < newStart) {
              onThumbnailChange(newStart);
            }
          }
          // Adjust thumbnail if it's now after end
          if (thumbnailTime > newEnd) {
            onThumbnailChange(newEnd);
          }
        } else if (dragging === 'thumbnail') {
          // Thumbnail must stay between start and end
          const newThumbnail = Math.max(startTime, Math.min(time, endTime));
          onThumbnailChange(newThumbnail);
          onSeek?.(newThumbnail);
        }
      },
      [
        dragging,
        disabled,
        duration,
        startTime,
        endTime,
        thumbnailTime,
        minDuration,
        onStartChange,
        onSeek,
        onEndChange,
        onThumbnailChange,
      ]
    );
    /* eslint-enable react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps */

    const handleMouseUp = React.useCallback(() => {
      setDragging(null);
    }, []);

    React.useEffect(() => {
      if (dragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [dragging, handleMouseMove, handleMouseUp]);

    // Touch support
    const handleTouchStart = (handle: 'start' | 'end' | 'thumbnail') => (e: React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(handle);
    };

    /* eslint-disable react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps */
    const handleTouchMove = React.useCallback(
      (e: TouchEvent) => {
        if (!dragging || disabled || e.touches.length === 0) return;

        const time = getTimeFromPosition(e.touches[0].clientX);

        if (dragging === 'start') {
          // Clamp start to valid range [0, duration - minDuration]
          const newStart = Math.max(0, Math.min(time, duration - minDuration));
          onStartChange(newStart);
          onSeek?.(newStart);
          // Push end forward if start would exceed the limit
          if (newStart + minDuration > endTime) {
            const newEnd = Math.min(newStart + minDuration, duration);
            onEndChange(newEnd);
            if (thumbnailTime > newEnd) {
              onThumbnailChange(newEnd);
            }
          }
          if (thumbnailTime < newStart) {
            onThumbnailChange(newStart);
          }
        } else if (dragging === 'end') {
          // Clamp end to valid range [minDuration, duration]
          const newEnd = Math.max(minDuration, Math.min(time, duration));
          onEndChange(newEnd);
          onSeek?.(newEnd);
          // Push start backward if end would go below the limit
          if (newEnd - minDuration < startTime) {
            const newStart = Math.max(0, newEnd - minDuration);
            onStartChange(newStart);
            if (thumbnailTime < newStart) {
              onThumbnailChange(newStart);
            }
          }
          if (thumbnailTime > newEnd) {
            onThumbnailChange(newEnd);
          }
        } else if (dragging === 'thumbnail') {
          const newThumbnail = Math.max(startTime, Math.min(time, endTime));
          onThumbnailChange(newThumbnail);
          onSeek?.(newThumbnail);
        }
      },
      [
        dragging,
        disabled,
        duration,
        startTime,
        endTime,
        thumbnailTime,
        minDuration,
        onStartChange,
        onSeek,
        onEndChange,
        onThumbnailChange,
      ]
    );
    /* eslint-enable react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps */

    const handleTouchEnd = React.useCallback(() => {
      setDragging(null);
    }, []);

    React.useEffect(() => {
      if (dragging) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, [dragging, handleTouchMove, handleTouchEnd]);

    const startPos = getPositionFromTime(startTime);
    const endPos = getPositionFromTime(endTime);
    const thumbnailPos = getPositionFromTime(thumbnailTime);

    return (
      <div ref={ref} className={cn('w-full select-none', className)}>
        {/* Time labels */}
        <div className="text-muted-foreground mb-2 flex justify-between text-sm">
          <span>0.00</span>
          <span>{formatTimeToMSS(duration)}</span>
        </div>

        {/* Track container */}
        <div
          ref={trackRef}
          className={cn(
            'bg-muted relative h-10 rounded-md',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {/* Selected range background */}
          <div
            className="bg-primary/20 absolute top-0 h-full rounded-md"
            style={{
              left: `${startPos}%`,
              width: `${endPos - startPos}%`,
            }}
          />

          {/* Start handle */}
          <div
            className={cn(
              'absolute top-0 z-10 flex h-full w-4 -translate-x-1/2 cursor-ew-resize items-center justify-center',
              dragging === 'start' && 'z-30'
            )}
            style={{ left: `${startPos}%` }}
            onMouseDown={handleMouseDown('start')}
            onTouchStart={handleTouchStart('start')}
            role="slider"
            aria-label="Start time"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={startTime}
            tabIndex={disabled ? -1 : 0}
          >
            <div
              className={cn(
                'bg-primary h-full w-1 rounded-l-md transition-colors',
                dragging === 'start' && 'bg-primary/80 w-1.5'
              )}
            />
          </div>

          {/* End handle */}
          <div
            className={cn(
              'absolute top-0 z-10 flex h-full w-4 -translate-x-1/2 cursor-ew-resize items-center justify-center',
              dragging === 'end' && 'z-30'
            )}
            style={{ left: `${endPos}%` }}
            onMouseDown={handleMouseDown('end')}
            onTouchStart={handleTouchStart('end')}
            role="slider"
            aria-label="End time"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={endTime}
            tabIndex={disabled ? -1 : 0}
          >
            <div
              className={cn(
                'bg-primary h-full w-1 rounded-r-md transition-colors',
                dragging === 'end' && 'bg-primary/80 w-1.5'
              )}
            />
          </div>

          {/* Thumbnail handle (only moves between start and end) */}
          <div
            className={cn(
              'border-secondary bg-background absolute top-1/2 z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 shadow-md transition-transform',
              dragging === 'thumbnail' && 'scale-110 cursor-grabbing'
            )}
            style={{ left: `${thumbnailPos}%` }}
            onMouseDown={handleMouseDown('thumbnail')}
            onTouchStart={handleTouchStart('thumbnail')}
            role="slider"
            aria-label="Thumbnail time"
            aria-valuemin={startTime}
            aria-valuemax={endTime}
            aria-valuenow={thumbnailTime}
            tabIndex={disabled ? -1 : 0}
          >
            <div className="bg-secondary h-2 w-2 rounded-full" />
          </div>
        </div>

        {/* Current values display */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-muted/50 rounded-md px-2 py-1">
            <span className="text-muted-foreground block text-xs">Start</span>
            <span className="text-primary font-mono">{formatTimeToMSS(startTime)}</span>
          </div>
          <div className="bg-muted/50 rounded-md px-2 py-1">
            <span className="text-muted-foreground block text-xs">Thumbnail</span>
            <span className="text-foreground font-mono">{formatTimeToMSS(thumbnailTime)}</span>
          </div>
          <div className="bg-muted/50 rounded-md px-2 py-1">
            <span className="text-muted-foreground block text-xs">End</span>
            <span className="text-primary font-mono">{formatTimeToMSS(endTime)}</span>
          </div>
        </div>
      </div>
    );
  }
);
VideoRangeSlider.displayName = 'VideoRangeSlider';

export { VideoRangeSlider };
