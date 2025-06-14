
import React from 'react';
import { Track, TimelineEvent } from './types';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import TimelineTrack from './TimelineTrack';
import Playhead from './Playhead';

interface TimelineContainerProps {
  tracks: Track[];
  totalDuration: number;
  pixelsPerSecond: number;
  currentTime: number;
  onEventClick: (trackId: string, event: TimelineEvent) => void;
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({
  tracks,
  totalDuration,
  pixelsPerSecond,
  currentTime,
  onEventClick
}) => {
  return (
    <>
      {tracks.length > 0 ? (
        <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
          <div
            className="relative"
            style={{ minWidth: `${totalDuration * pixelsPerSecond + 260}px` }}
          >
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[400px]"
            >
              {tracks.map((track, index) => (
                <React.Fragment key={track.id}>
                  <ResizablePanel defaultSize={20} minSize={15}>
                    <TimelineTrack
                      track={track}
                      pixelsPerSecond={pixelsPerSecond}
                      onEventClick={onEventClick}
                    />
                  </ResizablePanel>
                  {index < tracks.length - 1 && <ResizableHandle withHandle />}
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
            <Playhead currentTime={currentTime} pixelsPerSecond={pixelsPerSecond} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="space-y-4 text-center text-muted-foreground py-16 border-2 border-dashed rounded-lg">
          <p className="font-semibold">This timeline is empty.</p>
          <p className="text-sm">Click "Add Track" to add a new track to get started.</p>
        </div>
      )}
    </>
  );
};

export default TimelineContainer;
