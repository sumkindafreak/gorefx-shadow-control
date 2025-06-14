
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Volume2, Mic, Upload, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

const AudioSync = () => {
  const audioFiles = [
    { name: "spooky_ambience.mp3", duration: "5:30", status: "Ready" },
    { name: "thunder_storm.wav", duration: "2:15", status: "Playing" },
    { name: "scream_effect.mp3", duration: "0:03", status: "Ready" },
    { name: "witch_cackle.wav", duration: "0:08", status: "Ready" },
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
                <h1 className="text-3xl font-bold font-spectral">Audio Sync</h1>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-700">
                    Synced
                  </Badge>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Audio
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Audio Control Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      Audio Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Master Volume</label>
                      <Slider defaultValue={[75]} max={100} step={1} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Effects Volume</label>
                      <Slider defaultValue={[60]} max={100} step={1} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ambient Volume</label>
                      <Slider defaultValue={[40]} max={100} step={1} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Auto-sync with Lights</span>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Motion Triggered Audio</span>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                {/* Audio Input */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="w-5 h-5" />
                      Audio Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border-2 border-dashed rounded">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm">Drop audio files here or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports MP3, WAV, FLAC
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Input Sensitivity</label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Live Audio Input</span>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audio Library */}
              <Card>
                <CardHeader>
                  <CardTitle>Audio Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {audioFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Volume2 className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={file.status === "Playing" ? "default" : "secondary"}>
                            {file.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {file.status === "Playing" ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sync Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Synchronization Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Audio Delay (ms)</label>
                      <Slider defaultValue={[50]} max={500} step={10} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Beat Detection Sensitivity</label>
                      <Slider defaultValue={[70]} max={100} step={1} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Auto-detect BPM</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Crossfade Between Tracks</span>
                    <Switch />
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

export default AudioSync;
