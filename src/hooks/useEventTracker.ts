
import { useEffect, useRef } from 'react';
import { Track } from '@/components/timeline/types';

interface UseEventTrackerProps {
  tracks: Track[];
  currentTime: number;
  isPlaying: boolean;
  isLiveMode: boolean;
}

export const useEventTracker = ({ tracks, currentTime, isPlaying, isLiveMode }: UseEventTrackerProps) => {
  const activeEventsRef = useRef(new Set<string>());

  useEffect(() => {
    if (!isLiveMode) {
      activeEventsRef.current.clear();
      return;
    }

    if (!isPlaying) {
      if (activeEventsRef.current.size > 0) {
        console.log("Playback paused. Active events stopping:", [...activeEventsRef.current]);
        activeEventsRef.current.clear();
      }
      return;
    }

    const newlyActive = new Set<string>();

    tracks.forEach(track => {
      track.events.forEach(event => {
        const eventEnd = event.start + event.duration;
        if (currentTime >= event.start && currentTime < eventEnd) {
          newlyActive.add(event.id);
          if (!activeEventsRef.current.has(event.id)) {
            console.log(`EVENT START: ${event.name} on ${track.type} track "${track.name}"`);
          }
        }
      });
    });
    
    activeEventsRef.current.forEach(oldEventId => {
      if (!newlyActive.has(oldEventId)) {
        const event = tracks.flatMap(t => t.events).find(e => e.id === oldEventId);
        if (event) {
            console.log(`EVENT END: ${event.name}`);
        }
      }
    });

    activeEventsRef.current = newlyActive;
  }, [currentTime, isPlaying, isLiveMode, tracks]);
};
