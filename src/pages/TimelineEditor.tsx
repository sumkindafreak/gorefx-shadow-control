
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

const TimelineEditor = () => {
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
                   <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Track
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResizablePanelGroup
                    direction="vertical"
                    className="min-h-[400px] rounded-lg border"
                  >
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Audio Track Area</span>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Lighting & Effects Area</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
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

