
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Camera, Video, Download, Settings, Play, Pause, RotateCcw, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";

const Webcam = () => {
  const cameras = [
    { name: "Front Yard View", status: "Online", resolution: "1080p", fps: 30, recording: true },
    { name: "Entrance Monitor", status: "Online", resolution: "720p", fps: 24, recording: false },
    { name: "Side Yard Cam", status: "Offline", resolution: "1080p", fps: 30, recording: false },
    { name: "Porch Camera", status: "Online", resolution: "4K", fps: 60, recording: true },
  ];

  const recordings = [
    { name: "Halloween_Night_2024_19-30.mp4", duration: "5:28", size: "2.4 GB", date: "Today 7:30 PM" },
    { name: "Motion_Trigger_Front_Yard.mp4", duration: "0:45", size: "180 MB", date: "Today 6:45 PM" },
    { name: "Visitor_Reaction_Compilation.mp4", duration: "12:35", size: "3.8 GB", date: "Yesterday" },
  ];

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
                <h1 className="text-3xl font-bold font-spectral">Webcam Monitoring</h1>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-red-500/10 text-red-700">
                    <Video className="w-3 h-3 mr-1" />
                    Recording
                  </Badge>
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Camera Settings
                  </Button>
                </div>
              </div>

              {/* Live Camera Feeds */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Front Yard View</span>
                      <Badge variant="default">Live</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">Live Camera Feed</p>
                        <p className="text-xs opacity-50">1920x1080 @ 30fps</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Record
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="w-3 h-3 mr-1" />
                        Snapshot
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomIn className="w-3 h-3 mr-1" />
                        Zoom
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Porch Camera</span>
                      <Badge variant="destructive">Recording</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-black rounded mb-4 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">4K Camera Feed</p>
                        <p className="text-xs opacity-50">3840x2160 @ 60fps</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pause className="w-3 h-3 mr-1" />
                        Stop Recording
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="w-3 h-3 mr-1" />
                        Snapshot
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Camera Status Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Camera Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cameras.map((camera, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{camera.name}</h4>
                          <Badge variant={camera.status === "Online" ? "default" : "destructive"}>
                            {camera.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Resolution:</span> {camera.resolution}</p>
                          <p><span className="text-muted-foreground">FPS:</span> {camera.fps}</p>
                          <p><span className="text-muted-foreground">Recording:</span> {camera.recording ? "Yes" : "No"}</p>
                        </div>
                        <Button size="sm" className="w-full mt-3" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recording Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recording Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Motion Detection Recording</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Continuous Recording</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Audio Recording</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Motion Sensitivity</label>
                      <Slider defaultValue={[75]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recording Quality</label>
                      <Slider defaultValue={[80]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>

                {/* Storage Management */}
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage Used</span>
                        <span>156 GB / 500 GB</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '31%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-delete old recordings</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cloud backup</span>
                      <Switch />
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download All Recordings
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Recordings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recordings.map((recording, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{recording.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {recording.duration} • {recording.size} • {recording.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default Webcam;
