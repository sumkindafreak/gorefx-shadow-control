
import React, { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Plus, FolderOpen, Save } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import TimelineTrack, { Track } from "@/components/timeline/TimelineTrack";

const TimelineEditor = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const addTrack = () => {
    // For now, we only add lighting tracks. We can expand this later.
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      type: 'lighting',
      name: `New Lighting Track ${tracks.filter(t => t.type === 'lighting').length + 1}`
    };
    setTracks(prevTracks => [...prevTracks, newTrack]);
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
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <div className="ml-4 text-sm text-muted-foreground">
                      00:02:45 / 05:30:00
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline View */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Timeline: "Untitled Show"</CardTitle>
                   <Button variant="outline" onClick={addTrack}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Track
                  </Button>
                </CardHeader>
                <CardContent>
                  {tracks.length > 0 ? (
                    <ResizablePanelGroup
                      direction="vertical"
                      className="min-h-[400px] rounded-lg border"
                    >
                      {tracks.map((track, index) => (
                        <React.Fragment key={track.id}>
                          <ResizablePanel>
                            <TimelineTrack track={track} />
                          </ResizablePanel>
                          {index < tracks.length - 1 && <ResizableHandle withHandle />}
                        </React.Fragment>
                      ))}
                    </ResizablePanelGroup>
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
    </SidebarProvider>
  );
};

export default TimelineEditor;
