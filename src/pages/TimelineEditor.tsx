
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Timeline
                </Button>
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
                <CardHeader>
                  <CardTitle>Active Timeline: "Halloween Night Show"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Audio Track</span>
                        <Badge variant="secondary">5:30</Badge>
                      </div>
                      <div className="h-8 bg-blue-500/20 rounded relative">
                        <div className="absolute left-2 top-1 text-xs">Spooky_Ambience.mp3</div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Lighting Effects</span>
                        <Badge variant="secondary">Multiple</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="h-6 bg-yellow-500/20 rounded relative">
                          <div className="absolute left-2 top-0.5 text-xs">Front Strobes</div>
                        </div>
                        <div className="h-6 bg-red-500/20 rounded relative">
                          <div className="absolute left-2 top-0.5 text-xs">Red Wash</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Special Effects</span>
                        <Badge variant="secondary">3 Events</Badge>
                      </div>
                      <div className="h-6 bg-green-500/20 rounded relative">
                        <div className="absolute left-2 top-0.5 text-xs">Fog + Jump Scare</div>
                      </div>
                    </div>
                  </div>
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
