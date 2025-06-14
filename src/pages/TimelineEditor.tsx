import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Plus, FolderOpen, Save, Lightbulb, AudioLines, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Track, TimelineEvent } from "@/components/timeline/types";
import TimelineTrack from "@/components/timeline/TimelineTrack";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import Playhead from "@/components/timeline/Playhead";
import EventEditor from "@/components/timeline/EventEditor";

const TimelineEditor = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [pixelsPerSecond, setPixelsPerSecond] = useState(50);
  const [totalDuration, setTotalDuration] = useState(60); // in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [editingEventInfo, setEditingEventInfo] = useState<{ trackId: string; event: TimelineEvent } | null>(null);

  const animationFrameRef = useRef<number>();
  const activeEventsRef = useRef(new Set<string>());

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      setCurrentTime(prevTime => {
        const newTime = prevTime + deltaTime;
        if (newTime >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }
        return newTime;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, totalDuration]);

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

  const addTrack = (type: Track['type']) => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      type: type,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Track ${tracks.filter(t => t.type === type).length + 1}`,
      events: [
        { id: `evt-${Date.now()}-1`, name: 'Sample Event', start: 2, duration: 5 },
        { id: `evt-${Date.now()}-2`, name: 'Another Event', start: 10, duration: 8 },
      ]
    };
    setTracks(prevTracks => [...prevTracks, newTrack]);
  };

  const handleOpenEventEditor = (trackId: string, event: TimelineEvent) => {
    setEditingEventInfo({ trackId, event });
  };

  const handleCloseEventEditor = () => {
    setEditingEventInfo(null);
  };
  
  const handleSaveEvent = (trackId: string, updatedEvent: TimelineEvent) => {
    setTracks(prevTracks => 
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

  const handlePlayPause = () => {
    if (currentTime >= totalDuration) {
        setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
    
  const handleSkipForward = () => {
    setIsPlaying(false);
    setCurrentTime(totalDuration);
  };

  const formatTime = (timeInSeconds: number) => {
    const totalSeconds = Math.floor(timeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInSeconds - totalSeconds) * 100);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

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

              {/* Playback Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Playback Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={handleSkipBack}>
                      <SkipBack />
                    </Button>
                    <Button size="sm" onClick={handlePlayPause}>
                      {isPlaying ? <Pause /> : <Play />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSkipForward}>
                      <SkipForward />
                    </Button>
                    <div className="ml-4 text-sm text-muted-foreground font-mono w-32">
                      {formatTime(currentTime)} / {formatTime(totalDuration).split('.')[0]}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                        id="live-mode"
                        checked={isLiveMode}
                        onCheckedChange={setIsLiveMode}
                    />
                    <label
                        htmlFor="live-mode"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Live Mode
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline View */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Timeline: "Untitled Show"</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Track
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => addTrack('lighting')}>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        <span>Lighting</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addTrack('audio')}>
                        <AudioLines className="mr-2 h-4 w-4" />
                        <span>Audio</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => addTrack('effects')}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        <span>Effects</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
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
                                  onEventClick={handleOpenEventEditor}
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
