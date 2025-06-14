import React from 'react';
import { Lightbulb, AudioLines, Wand2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Track, TimelineEvent as TimelineEventType } from './types';
import TimelineEvent from './TimelineEvent';
import { Button } from '@/components/ui/button';

interface TimelineTrackProps {
  track: Track;
  pixelsPerSecond: number;
  onEventClick: (trackId: string, event: TimelineEventType) => void;
  onAddEvent: (trackId: string) => void;
}

const trackTypeDetails: Record<Track['type'], { icon: React.ElementType; colorClasses: string; iconColor: string }> = {
    lighting: {
        icon: Lightbulb,
        colorClasses: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300',
        iconColor: 'text-yellow-500 dark:text-yellow-400',
    },
    audio: {
        icon: AudioLines,
        colorClasses: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300',
        iconColor: 'text-blue-500 dark:text-blue-400',
    },
    effects: {
        icon: Wand2,
        colorClasses: 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800/50 dark:text-purple-300',
        iconColor: 'text-purple-500 dark:text-purple-400',
    },
};

const TimelineTrack: React.FC<TimelineTrackProps> = ({ track, pixelsPerSecond, onEventClick, onAddEvent }) => {
  const details = trackTypeDetails[track.type];
  const Icon = details.icon;

  return (
    <div className="h-full p-2 grid grid-cols-[240px_1fr] gap-2">
      {/* Track Header */}
      <div className={cn(
          "h-full rounded-md border flex items-center justify-between p-4", 
          details.colorClasses
        )}>
        <div className='flex items-center truncate'>
            <Icon className={cn("w-5 h-5 mr-3 shrink-0", details.iconColor)} />
            <span className="font-semibold text-sm truncate">{track.name}</span>
        </div>
        <Button size="sm" variant="ghost" onClick={() => onAddEvent(track.id)} className="h-7 w-7 p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add event to {track.name}</span>
        </Button>
      </div>

      {/* Track Lane */}
      <div className="relative h-full bg-muted/30 rounded-md">
        {track.events.map(event => (
          <TimelineEvent
            key={event.id}
            event={event}
            pixelsPerSecond={pixelsPerSecond}
            trackType={track.type}
            onClick={() => onEventClick(track.id, event)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineTrack;
