import React, { useState, useCallback } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderOpen, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Track, TimelineEvent } from "@/components/timeline/types";
import EventEditor from "@/components/timeline/EventEditor";
import { usePlayback } from "@/hooks/usePlayback";
import { useEventTracker } from "@/hooks/useEventTracker";
import PlaybackControls from "@/components/timeline/PlaybackControls";
import TimelineHeader from "@/components/timeline/TimelineHeader";
import TimelineContainer from "@/components/timeline/TimelineContainer";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

const TimelineEditor = () => {
  const [history, setHistory] = useState<Track[][]>([[]]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const tracks = history[currentHistoryIndex];

  const [pixelsPerSecond] = useState(50);
  const [totalDuration, setTotalDuration] = useState(60); // in seconds
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [editingEventInfo, setEditingEventInfo] = useState<{ trackId: string; event: TimelineEvent } | null>(null);

  const {
    currentTime,
    isPlaying,
    handlePlayPause,
    skipToStart,
    skipToEnd,
  } = usePlayback({ totalDuration });

  useEventTracker({ tracks, currentTime, isPlaying, isLiveMode });

  const updateTracks = useCallback((updater: (prevTracks: Track[]) => Track[]) => {
    const newTracks = updater(history[currentHistoryIndex]);
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    setHistory([...newHistory, newTracks]);
    setCurrentHistoryIndex(newHistory.length);
  }, [history, currentHistoryIndex]);
  
  const addTrack = (type: Track['type']) => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      type: type,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Track ${tracks.filter(t => t.type === type).length + 1}`,
      events: []
    };
    updateTracks(prevTracks => [...prevTracks, newTrack]);
  };

  const handleAddEvent = (trackId: string) => {
    updateTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id === trackId) {
          const newEvent: TimelineEvent = {
            id: `evt-${Date.now()}`,
            name: 'New Event',
            start: 0,
            duration: 5,
            command: ''
          };
          // Automatically open editor for the new event
          setEditingEventInfo({ trackId, event: newEvent });
          return {
            ...track,
            events: [...track.events, newEvent]
          };
        }
        return track;
      })
    );
  };

  const handleOpenEventEditor = (trackId: string, event: TimelineEvent) => {
    setEditingEventInfo({ trackId, event });
  };

  const handleCloseEventEditor = () => {
    setEditingEventInfo(null);
  };
  
  const handleSaveEvent = (trackId: string, updatedEvent: TimelineEvent) => {
    updateTracks(prevTracks => 
      prevTracks.map(track => {
        if (track.id === trackId) {
          return {
            ...track,
            events: track.events.map(event => 
              event.id === updatedEvent.id ? updatedEvent : event
            ),
          };
        }
        return track;
      })
    );
    handleCloseEventEditor();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (delta.x === 0) return;

    const eventId = active.id as string;

    updateTracks(prevTracks => 
      prevTracks.map(track => {
        const eventIndex = track.events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
          return track;
        }
        
        const eventToMove = track.events[eventIndex];
        const newStart = eventToMove.start + delta.x / pixelsPerSecond;
        // Round to one decimal place
        const clampedStart = Math.round(newStart * 10) / 10;
        const finalStart = Math.max(0, Math.min(clampedStart, totalDuration - eventToMove.duration));

        const updatedEvents = [...track.events];
        updatedEvents[eventIndex] = { ...eventToMove, start: finalStart };

        return { ...track, events: updatedEvents };
      })
    );
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const canUndo = currentHistoryIndex > 0;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <main className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-spectral">Timeline Editor</h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Load Show
                  </Button>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Show
                  </Button>
                </div>
              </div>

              <PlaybackControls
                isPlaying={isPlaying}
                isLiveMode={isLiveMode}
                currentTime={currentTime}
                totalDuration={totalDuration}
                onPlayPause={handlePlayPause}
                onSkipBack={skipToStart}
                onSkipForward={skipToEnd}
                onLiveModeChange={setIsLiveMode}
                onTotalDurationChange={setTotalDuration}
              />

              <Card>
                <TimelineHeader 
                  onAddTrack={addTrack} 
                  onUndo={handleUndo}
                  canUndo={canUndo}
                />
                <CardContent>
                  <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis]}>
                    <TimelineContainer
                      tracks={tracks}
                      totalDuration={totalDuration}
                      pixelsPerSecond={pixelsPerSecond}
                      currentTime={currentTime}
                      onEventClick={handleOpenEventEditor}
                      onAddEvent={handleAddEvent}
                    />
                  </DndContext>
                </CardContent>
              </Card>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
      <EventEditor
        isOpen={!!editingEventInfo}
        onClose={handleCloseEventEditor}
        onSave={handleSaveEvent}
        eventInfo={editingEventInfo}
      />
    </SidebarProvider>
  );
};

export default TimelineEditor;
