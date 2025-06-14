
import React from 'react';
import { TimelineEvent as TimelineEventType } from './types';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface TimelineEventProps {
  event: TimelineEventType;
  pixelsPerSecond: number;
  trackType: 'audio' | 'lighting' | 'effects';
  onClick: () => void;
}

const eventColorClasses: Record<'audio' | 'lighting' | 'effects', string> = {
    lighting: 'bg-yellow-500/50 border-yellow-600 dark:bg-yellow-800/50 dark:border-yellow-700 hover:bg-yellow-500/70',
    audio: 'bg-blue-500/50 border-blue-600 dark:bg-blue-800/50 dark:border-blue-700 hover:bg-blue-500/70',
    effects: 'bg-purple-500/50 border-purple-600 dark:bg-purple-800/50 dark:border-purple-700 hover:bg-purple-500/70',
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, pixelsPerSecond, trackType, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${event.start * pixelsPerSecond}px`,
    width: `${event.duration * pixelsPerSecond}px`,
    height: '80%',
    transform: `translateY(-50%) ${transform ? CSS.Translate.toString(transform) : ''}`,
    zIndex: isDragging ? 20 : 10,
    touchAction: 'none',
  };
  
  const title = `${event.name} (Start: ${event.start}s, Duration: ${event.duration}s)${event.command ? `\nCommand: ${event.command}`: ''}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className={cn(
          "w-full h-full rounded-md border text-white flex items-center px-2 transition-colors",
          isDragging ? 'cursor-grabbing shadow-lg' : 'cursor-grab',
          eventColorClasses[trackType]
        )}
        title={title}
        onClick={onClick}
      >
        <span className="text-xs font-medium truncate pointer-events-none">{event.name}</span>
      </div>
    </div>
  );
};

export default TimelineEvent;
