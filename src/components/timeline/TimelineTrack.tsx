
import React from 'react';

export interface Track {
  id: string;
  type: 'audio' | 'lighting' | 'effects';
  name: string;
}

interface TimelineTrackProps {
  track: Track;
}

const TimelineTrack: React.FC<TimelineTrackProps> = ({ track }) => {
  return (
    <div className="h-full p-2">
      <div className="h-full w-full rounded-md border border-dashed flex items-center justify-start p-4">
        <span className="font-semibold text-sm capitalize">{track.type} Track: {track.name}</span>
      </div>
    </div>
  );
};

export default TimelineTrack;
