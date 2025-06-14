
import React from 'react';
import { TimelineEvent as TimelineEventType } from './types';
import { cn } from '@/lib/utils';

interface TimelineEventProps {
  event: TimelineEventType;
  pixelsPerSecond: number;
  trackType: 'audio' | 'lighting' | 'effects';
}

const eventColorClasses: Record<'audio' | 'lighting' | 'effects', string> = {
    lighting: 'bg-yellow-500/50 border-yellow-600 dark:bg-yellow-800/50 dark:border-yellow-700 hover:bg-yellow-500/70',
    audio: 'bg-blue-500/50 border-blue-600 dark:bg-blue-800/50 dark:border-blue-700 hover:bg-blue-500/70',
    effects: 'bg-purple-500/50 border-purple-600 dark:bg-purple-800/50 dark:border-purple-700 hover:bg-purple-500/70',
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, pixelsPerSecond, trackType }) => {
  const style = {
    left: `${event.start * pixelsPerSecond}px`,
    width: `${event.duration * pixelsPerSecond}px`,
  };

  return (
    <div
      style={style}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 h-4/5 rounded-md border text-white flex items-center px-2 cursor-pointer transition-colors",
        eventColorClasses[trackType]
      )}
      title={`${event.name} (Start: ${event.start}s, Duration: ${event.duration}s)`}
    >
      <span className="text-xs font-medium truncate pointer-events-none">{event.name}</span>
    </div>
  );
};

export default TimelineEvent;
